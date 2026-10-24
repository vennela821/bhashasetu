from datetime import datetime, timezone
from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, JSON, String, Text
from sqlalchemy.orm import Mapped, mapped_column
from .database import Base

def now_utc():
    return datetime.now(timezone.utc)

class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    username: Mapped[str] = mapped_column(String(120), default="Guest")
    preferred_lang: Mapped[str] = mapped_column(String(8), default="te")
    high_contrast: Mapped[bool] = mapped_column(Boolean, default=False)
    speech_rate: Mapped[float] = mapped_column(default=0.75)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now_utc)

class TranslationLog(Base):
    __tablename__ = "translation_logs"
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int | None] = mapped_column(ForeignKey("users.id"), nullable=True)
    lang: Mapped[str] = mapped_column(String(8))
    spoken_text: Mapped[str] = mapped_column(Text)
    casual_english: Mapped[str] = mapped_column(Text)
    formal_english: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now_utc)

class ScamScanLog(Base):
    __tablename__ = "scam_scan_logs"
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int | None] = mapped_column(ForeignKey("users.id"), nullable=True)
    lang: Mapped[str] = mapped_column(String(8))
    input_message: Mapped[str] = mapped_column(Text)
    risk_level: Mapped[str] = mapped_column(String(12))
    risk_score: Mapped[int] = mapped_column(Integer)
    patterns: Mapped[list] = mapped_column(JSON, default=list)
    next_steps: Mapped[list] = mapped_column(JSON, default=list)
    explanation: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now_utc)

