from schemas.roles import Role
from schemas.tags import Tag, TagsVacancies
from schemas.users import User, UsersRoles
from schemas.vacancies import Vacancy
from src.models.roles import RolesOrm
from src.models.tags import TagsOrm
from src.models.users import UsersOrm, UsersRolesOrm
from src.models.vacancies import *
from src.repos.mappers.base import DataMapper


class TagsDataMapper(DataMapper):
    db_model = TagsOrm
    schema = Tag


class VacanciesDataMapper(DataMapper):
    db_model = VacanciesOrm
    schema = Vacancy


class UsersDataMapper(DataMapper):
    db_model = UsersOrm
    schema = User


class TagsVacanciesDataMapper(DataMapper):
    db_model = TagsVacanciesOrm
    schema = TagsVacancies


class RolesDataMapper(DataMapper):
    db_model = RolesOrm
    schema = Role


class UsersRolesDataMapper(DataMapper):
    db_model = UsersRolesOrm
    schema = UsersRoles
