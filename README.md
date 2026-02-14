# Advanced Auth Monorepo

این پروژه به‌صورت **Monorepo** ساخته شده و شامل:

- `apps/api`: بکند Node.js/TypeScript با احراز هویت پیشرفته و اتصال به Supabase
- `apps/web`: اسکفولد فرانت‌اند (فعلا خالی)

## Quick start

```bash
npm install
cp apps/api/.env.example apps/api/.env
npm run dev:api
```

## API (Auth Wrapper روی Supabase)

بکند این پروژه خودش JWT و Refresh Token مستقل صادر می‌کند اما برای مدیریت کاربر و Session پایه از Supabase Auth استفاده می‌کند.

### Endpoint ها

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/resend-confirmation`
- `POST /api/v1/auth/verify-email`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/me`
- `GET /api/v1/health`

### رفتار توکن

- Access Token به‌صورت JWT در پاسخ JSON برمی‌گردد.
- Refresh Token به‌صورت Cookie با `HttpOnly` و `SameSite=Strict` ست می‌شود.
- Session های Refresh در جدول `public.auth_sessions` ذخیره و روی refresh روتیت می‌شوند.

## Supabase SQL migration

فایل migration:

- `apps/api/supabase/migrations/001_auth_sessions.sql`
- `apps/api/supabase/migrations/002_profiles.sql`

این migration را در Supabase SQL Editor اجرا کنید.
