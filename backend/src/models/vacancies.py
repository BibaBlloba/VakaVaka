from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column

from database import Base


class VacationsOrm(Base):
    __tablename__ = "vacancies"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(300))
    short_description: Mapped[str] = mapped_column(String(1000))
    full_description: Mapped[str] = mapped_column(String(10000))
    price: Mapped[int] = mapped_column()
    location: Mapped[str] = mapped_column(String(100))
    # tags: Mapped[str] = mapped_column(unique=True)
