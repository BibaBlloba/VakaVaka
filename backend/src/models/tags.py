from typing import List

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.database import Base


class TagsOrm(Base):
    __tablename__ = 'tags'

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(30), unique=True)
    vacancies: Mapped[List['VacanciesOrm']] = relationship(
        back_populates='tags',
        secondary='tags_vacancies',
    )
