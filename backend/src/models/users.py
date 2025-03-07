from datetime import datetime

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.database import Base
from src.utils.time_utils import lazy_utc_now


class UsersOrm(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    login: Mapped[str] = mapped_column(String(50), unique=True)
    hashed_password: Mapped[str] = mapped_column()
    first_name: Mapped[str] = mapped_column(String(20))
    last_name: Mapped[str] = mapped_column(String(20))
    age: Mapped[int] = mapped_column()
    # resume_id: Mapped[int] = mapped_column(ForeignKey())
    phone_number: Mapped[str] = mapped_column(String(20), unique=True)
    email: Mapped[str] = mapped_column(String(20), unique=True)
    is_admin: Mapped[bool] = mapped_column(default=False)
    created_at: Mapped[datetime] = mapped_column(default=lazy_utc_now)
    vacancies: Mapped[list["VacanciesOrm"]] = relationship(
        back_populates="users",
        secondary="users_vacancies",
        cascade="all",
    )
