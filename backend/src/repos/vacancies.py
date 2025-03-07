from pydantic import BaseModel
from sqlalchemy import insert, select

from repos.mappers.mappers import VacanciesDataMapper
from src.models.vacancies import VacanciesOrm
from src.repos.base import BaseRepository


class VacanciesRepository(BaseRepository):
    model = VacanciesOrm
    mapper = VacanciesDataMapper

    async def get_filtered(self, **filter_by):
        query = select(self.model).filter_by(**filter_by)
        result = await self.session.execute(query)
        return [
            self.mapper.map_to_domain_entity(model) for model in result.scalars().all()
        ]

    async def add(self, data: BaseModel):
        add_data_stmt = (
            insert(self.model).values(**data.model_dump()).returning(self.model)
        )
        result = await self.session.execute(add_data_stmt)
        model = result.scalars().one()
        return self.mapper.map_to_domain_entity(model)
