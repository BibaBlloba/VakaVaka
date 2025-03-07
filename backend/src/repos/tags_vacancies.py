from src.models.vacancies import TagsVacanciesOrm
from src.repos.base import BaseRepository
from src.repos.mappers.mappers import TagsVacanciesDataMapper


class TagsVacanciesRepository(BaseRepository):
    model = TagsVacanciesOrm
    mapper = TagsVacanciesDataMapper
