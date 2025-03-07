from fastapi import APIRouter

from api.api_v1.dependencies import AdminRequired, DbDep
from schemas.tags import TagAdd

router = APIRouter(prefix="/tags", tags=["Tags"])


@router.get("")
async def get_all_tags(db: DbDep):
    return await db.tags.get_all()


@router.post("")
async def add_tag(
    admin: AdminRequired,
    db: DbDep,
    data: list[TagAdd],
):
    result = await db.tags.add_bulk(data)
    await db.commit()
    return result
