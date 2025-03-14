from fastapi import HTTPException
from pydantic import BaseModel, EmailStr
from sqlalchemy import insert, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import selectinload

from repos.mappers.mappers import UsersDataMapper
from src.models.users import UsersOrm
from src.repos.base import BaseRepository


class UsersRepository(BaseRepository):
    model = UsersOrm
    mapper = UsersDataMapper

    async def get_uesr_with_hashedPwd(
        self,
        id: str | None = None,
        password: str | None = None,
        email: EmailStr | None = None,
        login: str | None = None,
    ):
        if email:
            query = (
                select(self.model)
                .options(selectinload(self.model.roles))
                .filter_by(email=email)
            )
        elif id:
            query = (
                select(self.model)
                .options(selectinload(self.model.roles))
                .filter_by(id=id)
            )
        else:
            query = (
                select(self.model)
                .options(selectinload(self.model.roles))
                .filter_by(login=login)
            )
        result = await self.session.execute(query)
        return result.scalars().one_or_none()

    async def add(self, data: BaseModel):
        add_data_stmt = (
            insert(self.model)
            .options(selectinload(self.model.roles))
            .values(**data.model_dump())
            .returning(self.model)
        )
        try:
            result = await self.session.execute(add_data_stmt)
        except IntegrityError:
            raise HTTPException(401, "Пользователь уже зарегестрирован.")

        model = result.scalars().one()
        return self.mapper.map_to_domain_entity(model)

    async def get_one_or_none(self, **filter_by):
        query = (
            select(self.model)
            .options(selectinload(self.model.roles))
            .filter_by(**filter_by)
        )
        result = await self.session.execute(query)
        res = result.scalars().one_or_none()
        if res is None:
            return None
        return self.mapper.map_to_domain_entity(res)

    async def get_filtered(self, **filter_by):
        query = (
            select(self.model)
            .options(selectinload(self.model.roles))
            .filter_by(**filter_by)
        )
        result = await self.session.execute(query)
        return [
            self.mapper.map_to_domain_entity(model) for model in result.scalars().all()
        ]
