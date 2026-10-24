from typing import Literal
from pydantic import BaseModel, Field

Language = Literal["te", "hi", "ta", "kn", "ml", "mr", "bn", "en"]

class TranslateRequest(BaseModel):
    text: str = Field(min_length=1, max_length=5000)
    lang: Language
    user_id: int | None = None

class ExplainRequest(BaseModel):
    text: str = Field(min_length=1, max_length=12000)
    lang: Language
    user_id: int | None = None

class ScamRequest(BaseModel):
    text: str = Field(min_length=1, max_length=12000)
    lang: Language
    user_id: int | None = None

class SpeechRequest(BaseModel):
    text: str = Field(min_length=1, max_length=6000)
    lang: Language
    rate: float = Field(default=0.75, ge=0.75, le=1.0)

