from typing import List

from pydantic import BaseModel


class TokenInfo(BaseModel):
    access_token: str
    refresh_token: str


class TokenRoles(BaseModel):
    roles: List[str] = []
