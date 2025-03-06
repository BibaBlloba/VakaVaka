from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from database import Base


class TagsOrm(Base):
    __tablename__ = "vacancies"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(30), unique=True)
