import json
import os
import time
from google import genai
from google.genai import types

MODEL = os.getenv("GEMINI_MODEL", "gemini-3.1-flash-lite")
TIMEOUT_MS = int(os.getenv("GEMINI_TIMEOUT_MS", "90000"))

class AIConfigurationError(Exception):
    pass

def generate_json(prompt: str, schema: dict) -> dict:
    response = _generate(prompt, schema)
    if not response.text:
        raise ValueError("Empty AI response")
    return json.loads(response.text)

def _generate(contents, schema=None):
    key = os.getenv("GEMINI_API_KEY")
    if not key:
        raise AIConfigurationError("Missing Gemini key")
    client = genai.Client(api_key=key, http_options=types.HttpOptions(timeout=TIMEOUT_MS))
    config = {"response_mime_type": "application/json", "response_schema": schema} if schema else None
    for attempt in range(3):
        try:
            return client.models.generate_content(model=MODEL, contents=contents, config=config)
        except Exception as exc:
            status = getattr(exc, "code", None) or getattr(exc, "status_code", None)
            if status not in (500, 502, 503, 504) or attempt == 2:
                raise
            time.sleep(0.5 * (2 ** attempt))
