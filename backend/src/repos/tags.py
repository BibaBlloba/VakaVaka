from pydantic import BaseModel
from sqlalchemy import insert, select
from sqlalchemy.orm import selectinload

from repos.mappers.mappers import TagsDataMapper
from src.models.tags import TagsOrm
from src.repos.base import BaseRepository


class TagsRepository(BaseRepository):
    model = TagsOrm
    mapper = TagsDataMapper

    async def add_bulk(self, data: list[BaseModel]):
        tags = [item.model_dump().get("title") for item in data]
        get_current_tags = select(self.model.title).filter(self.model.title.in_(tags))
        current_tags = await self.session.execute(get_current_tags)
        current_tags = current_tags.scalars().all()

        tags_to_create = list(set(tags) - set(current_tags))
        tags_to_insert = [{"title": tag} for tag in tags_to_create]

        if not tags_to_create:
            return {"status": "ok"}

        stmt = insert(self.model).values(tags_to_insert)
        result = await self.session.execute(stmt)
        return {"status": "ok"}
