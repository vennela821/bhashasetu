# BhashaSetu

An elder-friendly multilingual digital safety assistant. The React/Vite UI uses a FastAPI service for Gemini-powered translation, message explanation, scam risk assessment, and image reading. Gemini credentials are read only by the server.

## Run locally (PowerShell)

Backend, from the repository root:

```powershell
cd server
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
# Keep the existing server\.env if it already has your settings.
# Otherwise copy .env.example to .env and add GEMINI_API_KEY there.
uvicorn app.main:app --reload --port 8000
```

Frontend, in another terminal from the repository root:

```powershell
npm install
npm run dev
```

The Vite development server forwards `/api` requests to `http://localhost:8000`. For a deployed frontend, set `VITE_API_BASE_URL` to the backend origin. On the backend, set `FRONTEND_ORIGINS` to the exact deployed frontend origin(s), `GEMINI_API_KEY`, and optionally `DATABASE_URL`, `GEMINI_MODEL`, `GEMINI_TTS_MODEL`, `GEMINI_TIMEOUT_MS`, and `MAX_UPLOAD_MB`. The default text model is `gemini-3.1-flash-lite`; the speech endpoint uses `gemini-3.8-flash-lite-tts`. Do not place Gemini secrets in any `VITE_*` variable. `.env` is ignored by Git.

API docs are available at `/docs`; `/api/health` reports whether the server has a Gemini key configured.

## Deployment

Deployment templates are included in `vercel.json` and `render.yaml`.

1. Push this repository to GitHub.
2. Import it into Vercel as a Vite project and deploy once to get its public URL.
3. In Render, create a Blueprint from the repository and provide `GEMINI_API_KEY` and the exact Vercel origin (for example, `https://your-project.vercel.app`) for `FRONTEND_ORIGINS`. Wait for the backend health check at `/api/health` to pass.
4. In Vercel Project Settings → Environment Variables, set `VITE_API_BASE_URL` to the Render backend origin (for example, `https://bhashasetu-api.onrender.com`), then redeploy the frontend.
5. Confirm `/api/health` returns `status: ok` and `ai_configured: true`, then try translation, scam checking, document reading, and the **Listen** button.

The provided Render blueprint uses the free service plan for a demo. Free services can sleep while idle and have ephemeral storage; this project does not currently save user requests, but its SQLite file is not durable on that plan. Free service limits also make it unsuitable for production-critical use. Review the provider plan and Gemini API quotas/billing before a public launch. Keep the Gemini key only in Render's backend environment settings.

## Implemented flows

- `/api/translate`: regional-language speech text to casual and formal English. Requests and responses are not persisted.
- `/api/transcribe-audio`: transcribes short browser microphone recordings in the selected language through Gemini audio understanding.
- `/api/scam-check`: risk level and score, reasons, patterns, next steps, native-language explanation, and disclaimer. Requests and responses are not persisted.
- `/api/explain-message`: colloquial explanation and explicit amount/date/status/action extraction.
- `/api/speech`: server-generated audio for the complete translated explanation and extracted action details, independent of locally installed browser voices.
- `/api/read-document`: bounded JPEG/PNG/WEBP upload to Gemini image understanding; null fields are preferred to guessed facts.
- SQLite models are present, and WAL is enabled, but user records and private message logs are not currently exposed or written by the API.

## Future roadmap

- Consent-based family contact management and safety-alert records after account authentication and per-user access controls are implemented.
- Optional verified WhatsApp alert delivery after provider integration and user review.
- Live camera capture for bill and prescription scanning.

## Important limits before production

This is a hackathon application scaffold, not a production-secure deployment. It currently has no authentication, user onboarding/profile API, per-user authorization, rate limits, abuse controls, retention/deletion tools, security monitoring, or migration framework. HTTPS, database backups, provider quotas, and secret management must be configured at deployment.

Gemini output can be wrong. The scam score is a model assessment, not a guarantee; users should verify suspicious messages through official bank channels and never share OTPs. Prescription image summaries must not be treated as medical advice. Voice input needs microphone permission, a secure browser context (HTTPS or localhost), and a working backend connection. Voice transcription and audio playback use Gemini API quota/billing. Login UI is informational; no account system is configured. This is a website, not a browser extension or installable app.

The local backend environment exists in this workspace, but Python dependencies and an external AI request must be checked locally. Hosting provider credentials are not configured here, and this task does not deploy the application.
