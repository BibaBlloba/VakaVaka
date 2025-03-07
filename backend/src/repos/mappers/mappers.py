from schemas.tags import Tag, TagsVacancies
from schemas.users import User
from schemas.vacancies import Vacancy
from src.models.tags import TagsOrm
from src.models.users import UsersOrm
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
