from pydantic import BaseModel
from sqlalchemy import insert, select

from repos.mappers.mappers import UsersRolesDataMapper
from src.models.users import UsersRolesOrm
from src.repos.base import BaseRepository


class UserRolesRepository(BaseRepository):
    model = UsersRolesOrm
    mapper = UsersRolesDataMapper
