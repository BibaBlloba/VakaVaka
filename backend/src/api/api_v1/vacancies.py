from fastapi import APIRouter, HTTPException
from sqlalchemy.exc import IntegrityError

from api.api_v1.dependencies import DbDep, UserIdDap
from schemas.tags import TagsVacanciesAdd
from schemas.vacancies import VacancyAdd, VacancyAddRequest

router = APIRouter(prefix="/vacancies", tags=["Vacancies"])


@router.get("")
async def get_vacancies(db: DbDep):
    return await db.vacancies.get_filtered()


@router.post("")
async def create_vacancy(
    db: DbDep,
    user_id: UserIdDap,
    data: VacancyAddRequest,
):

    _vacancy_data = VacancyAdd(**data.model_dump())
    result = await db.vacancies.add(_vacancy_data)

    tags_vacancies_data = [
        TagsVacanciesAdd(vacancy_id=result.id, tag_id=t_id) for t_id in data.tags
    ]
    try:
        await db.tags_vacancies.add_bulk(tags_vacancies_data)
    except IntegrityError:
        raise HTTPException(400, detail="tags not found")

    await db.commit()
