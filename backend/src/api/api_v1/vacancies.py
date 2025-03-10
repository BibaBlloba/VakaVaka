from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi_cache.decorator import cache
from sqlalchemy.exc import IntegrityError

from api.api_v1.dependencies import (
    AdminRequired,
    DbDep,
    PaginationDap,
    UserIdDap,
    has_role,
)
from schemas.tags import TagsVacanciesAdd
from schemas.vacancies import VacancyAdd, VacancyAddRequest, VacancyPatchRequest
from src.init import redis_manager

router = APIRouter(prefix="/vacancies", tags=["Vacancies"])


@router.get("")
@cache(namespace="vacancies", expire=100)
async def get_vacancies(
    db: DbDep,
    pagination: PaginationDap,
    title: str | None = Query(None),
    min_price: int | None = Query(None),
    max_price: int | None = Query(None),
):
    per_page = pagination.per_page or 5
    return await db.vacancies.get_filtered(
        limit=per_page,
        offset=per_page * (pagination.page - 1),
        title=title,
        min_price=min_price,
        max_price=max_price,
    )


@router.get("/{id}")
async def get_vacancy_by_id(
    id: int,
    db: DbDep,
    pagination: PaginationDap,
):
    per_page = pagination.per_page or 5
    return await db.vacancies.get_filtered(
        id=id,
        limit=per_page,
        offset=per_page * (pagination.page - 1),
    )


@router.get("{vacancy_id}/tags")
async def get_tags(
    db: DbDep,
    pagination: PaginationDap,
    vacancy_id: int,
):
    # TODO: доделать получение тегов по id
    return await db.tags.get_filtered(id=vacancy_id)


@router.post("")
async def create_vacancy(
    db: DbDep,
    user_id: UserIdDap,
    data: VacancyAddRequest,
    organization=Depends(has_role("organization")),
):

    _vacancy_data = VacancyAdd(**data.model_dump())
    result = await db.vacancies.add(_vacancy_data)

    tags_vacancies_data = [
        TagsVacanciesAdd(vacancy_id=result.id, tag_id=t_id) for t_id in data.tags
    ]
    if tags_vacancies_data:
        try:
            await db.tags_vacancies.add_bulk(tags_vacancies_data)
        except IntegrityError:
            raise HTTPException(400, detail="tags not found")

    await redis_manager.clear_namespace("vacancies")

    await db.commit()
    return result


@router.patch("/{id}")
async def patch_vacancy(
    id: int,
    db: DbDep,
    admin: AdminRequired,
    data: VacancyPatchRequest,
):
    await db.vacancies.edit(exclude_unset=True, data=data, id=id)
    await db.commit()
