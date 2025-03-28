from datetime import date, datetime
from typing import List

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.database import Base
from src.utils.time_utils import lazy_utc_now


class VacanciesOrm(Base):
    __tablename__ = 'vacancies'

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(300))
    short_description: Mapped[str] = mapped_column(String(1000))
    full_description: Mapped[str] = mapped_column(String(10000))
    price: Mapped[bool] = mapped_column()
    min_price: Mapped[int | None] = mapped_column()
    max_price: Mapped[int | None] = mapped_column()
    location: Mapped[str] = mapped_column(String(100))
    created_at: Mapped[datetime] = mapped_column(default=lazy_utc_now)
    tags: Mapped[List['TagsOrm'] | None] = relationship(
        back_populates='vacancies',
        secondary='tags_vacancies',
        cascade='all',
    )
    users: Mapped[List['UsersOrm'] | None] = relationship(
        back_populates='vacancies',
        secondary='users_vacancies',
        cascade='all',
    )


class TagsVacanciesOrm(Base):
    __tablename__ = 'tags_vacancies'

    id: Mapped[int] = mapped_column(primary_key=True)
    tag_id: Mapped[int] = mapped_column(ForeignKey('tags.id'))
    vacancy_id: Mapped[int] = mapped_column(ForeignKey(VacanciesOrm.id))


class UsersVacanciesOrm(Base):
    __tablename__ = 'users_vacancies'

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'))
    vacancy_id: Mapped[int] = mapped_column(ForeignKey(VacanciesOrm.id))
