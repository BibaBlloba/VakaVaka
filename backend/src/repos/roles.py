from src.models.roles import RolesOrm
from src.repos.base import BaseRepository
from src.repos.mappers.mappers import RolesDataMapper


class RolesRepository(BaseRepository):
    model = RolesOrm
    mapper = RolesDataMapper
