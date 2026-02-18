# JWT Auth + CRUD Monorepo (Supabase Wrapper)

This repository is a full-stack monorepo that demonstrates:

- **JWT-based authentication** (access + refresh token flow)
- A **simple protected CRUD API** for posts (plus likes/bookmarks)
- An **Express backend that wraps Supabase** for user/session data and persistence
- A **React frontend** for auth flow and post management

The backend is not a thin proxy. It manages its own auth flow and JWT tokens, while using Supabase as the underlying auth/data platform.

---

## Project Structure

```text
.
├── apps/
│   ├── api/   # Express + TypeScript API (JWT auth, Supabase wrapper, CRUD)
│   └── web/   # React + Vite frontend (Auth UI + Posts UI)
├── package.json
└── README.md
```

---

## Tech Stack

### Backend (`apps/api`)

- **Node.js + Express + TypeScript**
- **Supabase (`@supabase/supabase-js`)** as auth/data provider
- **JWT (`jose`)** for access/refresh tokens
- **Zod** for request validation
- **Helmet, CORS, Rate Limit, Cookie Parser** for API security and HTTP handling

### Frontend (`apps/web`)

- **React + TypeScript + Vite**
- **Chakra UI** for component system and styling
- **React Hook Form + Zod** for form state and validation
- **TanStack Query** for server-state fetching/mutations
- **Axios** for API communication
- **React Router** for routing
- **Zustand** for lightweight client state

### Monorepo Tooling

- **npm workspaces**
- **npm-run-all** for parallel dev scripts

---

## Core Features

### 1) Authentication (JWT)

- Register, login, refresh, logout
- Email confirmation flow (send/resend/verify)
- `GET /auth/me` endpoint for current user info
- Access token returned in JSON response
- Refresh token stored in **HttpOnly cookie**
- Refresh sessions are persisted and rotated (server-side)

### 2) Protected CRUD (Posts)

After login, authenticated users can:

- List posts
- Create a new post
- Update a post
- Delete a post
- Like posts
- Bookmark posts
- List liked and bookmarked posts

---

## API Endpoints

Assuming default `API_PREFIX=/api/v1`:

### Auth

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/check-email`
- `POST /api/v1/auth/resend-confirmation`
- `POST /api/v1/auth/verify-email`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/me`

### Health

- `GET /api/v1/health`

### Posts (Protected)

- `GET /api/v1/posts`
- `POST /api/v1/posts`
- `PUT /api/v1/posts/:postId`
- `DELETE /api/v1/posts/:postId`
- `POST /api/v1/posts/:postId/likes`
- `POST /api/v1/posts/:postId/bookmarks`
- `GET /api/v1/posts/likes`
- `GET /api/v1/posts/bookmarks`

---

## Getting Started

## Prerequisites

- **Node.js 18+** (recommended)
- **npm 9+**
- A **Supabase project**

### 1) Install dependencies

From repository root:

```bash
npm install
```

### 2) Configure environment variables

Copy backend env template:

```bash
cp apps/api/.env.example apps/api/.env
```

Then update values in `apps/api/.env`:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ACCESS_TOKEN_SECRET`
- `REFRESH_TOKEN_SECRET`
- Optional cookie/CORS/domain values for your local/production setup

### 3) Run Supabase SQL migrations

Run SQL files in your Supabase SQL Editor:

- `apps/api/supabase/migrations/001_auth_sessions.sql`
- `apps/api/supabase/migrations/002_profiles.sql`
- `apps/api/supabase/migrations/003_posts_likes_bookmarks.sql`

### 4) Start development servers

From repository root:

```bash
npm run dev
```

This runs both API and web app concurrently.

Or start each app separately:

```bash
npm run dev:api
npm run dev:web
```

### 5) Open the app

- Frontend: `http://localhost:5173`
- API: `http://localhost:3000` (default)

---

## Build, Lint, and Typecheck

From repository root:

```bash
npm run build
npm run lint
npm run typecheck
```

---

## Notes

- In development, CORS allows configured origins and localhost variants.
- Refresh token transport is cookie-based (`HttpOnly`) for better security.
- This repo is a solid starter for role-based or permission-based systems on top of JWT auth and Supabase-backed persistence.
