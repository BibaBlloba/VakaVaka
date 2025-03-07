from pydantic import BaseModel
from sqlalchemy import func, insert, select
from sqlalchemy.orm import selectinload

from repos.mappers.mappers import VacanciesDataMapper
from src.models.vacancies import VacanciesOrm
from src.repos.base import BaseRepository


class VacanciesRepository(BaseRepository):
    model = VacanciesOrm
    mapper = VacanciesDataMapper

    async def get_filtered(
        self,
        limit: int,
        offset: int,
        title: str | None = None,
        min_price: int | None = None,
        max_price: int | None = None,
        **filter_by,
    ):
        query = (
            select(self.model)
            .options(selectinload(self.model.tags))
            .filter_by(**filter_by)
            .limit(limit)
            .offset(offset)
        )

        if title:
            query = query.filter(
                func.lower(self.model.title).contains(title.strip().lower())
            )

        if min_price:
            query = query.filter(self.model.price >= min_price)

        if max_price:
            query = query.filter(self.model.price <= max_price)

        result = await self.session.execute(query)
        return [
            self.mapper.map_to_domain_entity(model) for model in result.scalars().all()
        ]

    async def add(self, data: BaseModel):
        add_data_stmt = (
            insert(self.model)
            .options(selectinload(self.model.tags))
            .values(**data.model_dump())
            .returning(self.model)
        )
        result = await self.session.execute(add_data_stmt)
        model = result.scalars().one()
        return self.mapper.map_to_domain_entity(model)
