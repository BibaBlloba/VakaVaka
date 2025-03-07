from repos.mappers.mappers import TagsDataMapper
from src.models.tags import TagsOrm
from src.repos.base import BaseRepository


class TagsRepository(BaseRepository):
    model = TagsOrm
    mapper = TagsDataMapper
