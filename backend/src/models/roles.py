from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.database import Base


class RolesOrm(Base):
    __tablename__ = "roles"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(unique=True)
    users: Mapped[list["UsersOrm"] | None] = relationship(
        back_populates="roles",
        secondary="users_roles",
        cascade="all",
    )
