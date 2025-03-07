from repos.mappers.mappers import VacanciesDataMapper
from src.models.vacancies import VacanciesOrm
from src.repos.base import BaseRepository


class VacanciesRepository(BaseRepository):
    model = VacanciesOrm
    mapper = VacanciesDataMapper
