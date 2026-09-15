# Room Rent Application

Full-stack room rental platform for discovering rooms, managing listings, reserving accommodation, and processing payments. The application supports three roles: users, owners, and administrators.

## Product Capabilities

- Public room discovery with filtering, detail views, and cursor-based pagination
- User registration, login, JWT sessions, and role-based authorization
- Favorites for signed-in users
- Room creation, image upload, editing, and deletion for owners and administrators
- Booking confirmation, cancellation, and booking history
- Razorpay order creation and signature verification
- Automatic expiry of abandoned payment reservations
- Owner booking visibility and an administrator dashboard
- Redis-backed room-list caching and short-lived distributed locks
- Helmet security headers, CORS restrictions, request validation, and rate limiting

## Architecture

The system is organized as two independently runnable applications backed by PostgreSQL and Redis.

```mermaid
flowchart LR
	Browser[React + Vite SPA] -->|Axios REST requests| API[Express API]
	API --> Auth[JWT auth and role middleware]
	API --> Controllers[Controllers]
	Controllers --> Validation[Zod validation]
	Controllers --> PostgreSQL[(PostgreSQL)]
	Controllers --> Redis[(Redis cache and locks)]
	Controllers --> Cloudinary[Cloudinary image storage]
	Controllers --> Razorpay[Razorpay payments]
```

### Request flow

1. React pages and API modules send requests to the `/api` route group.
2. Express applies security headers, CORS, JSON limits, and global rate limiting.
3. Route-specific middleware validates request bodies, authenticates bearer tokens, and checks roles.
4. Controllers coordinate business operations and persistence.
5. PostgreSQL stores users, rooms, bookings, favorites, and payment orders.
6. Redis caches room lists and provides short-lived locks for concurrent operations.

### Backend layers

| Layer | Location | Responsibility |
| --- | --- | --- |
| Bootstrap | `backend/src/server.js` | Starts Express, PostgreSQL, Redis, cleanup jobs, and graceful shutdown |
| Routes | `backend/src/routes/` | Defines HTTP endpoints and middleware composition |
| Controllers | `backend/src/controllers/` | Handles authentication, rooms, bookings, payments, and administration |
| Middleware | `backend/src/middlewares/` | Authentication, roles, validation, uploads, rate limits, and error handling |
| Services | `backend/src/services/` | Cross-cutting workflows such as payment reservation expiry |
| Configuration | `backend/src/config/` | PostgreSQL-adjacent integrations and external service clients |
| Database | `backend/src/db/`, `backend/db/migrations/` | Connection, migrations, and optional MongoDB export import |

### Frontend layers

| Layer | Location | Responsibility |
| --- | --- | --- |
| Application shell | `frontend/src/App.jsx` | Router, layout, protected routes, and notifications |
| Pages | `frontend/src/pages/` | User-facing screens for discovery, booking, owner tools, and administration |
| Components | `frontend/src/components/` | Reusable forms, cards, navigation, loading, and access-control UI |
| API clients | `frontend/src/api/` | Axios calls grouped by authentication, rooms, bookings, payments, and admin features |
| State and hooks | `frontend/src/context/`, `frontend/src/hooks/` | Shared application state and data-fetching behavior |
| Utilities | `frontend/src/utils/` | Axios configuration and local authentication helpers |

## Data Model and Invariants

PostgreSQL is the system of record. The migration history is in `backend/db/migrations/`.

- `users` stores accounts and one of `user`, `owner`, or `admin` roles.
- `rooms` stores listing details, media URLs, availability, and ownership.
- `bookings` links users to rooms and tracks move-in date, payment, and booking status.
- `favorites` provides a unique user-to-room relationship.
- `payment_orders` tracks Razorpay orders, expiry, verification, and consumption.
- Foreign keys protect relationships and cascade or restrict deletes where appropriate.
- A partial unique index prevents a user from having more than one confirmed booking.
- Room list queries are indexed by creation time, location, availability, price, and cursor fields.

Payment orders expire after 15 minutes by default. The backend releases expired reservations at startup and then checks them every 60 seconds.

## Repository Layout

```text
room-rent-app/
├── backend/
│   ├── data/                 # Optional MongoDB export files for migration
│   ├── db/migrations/        # Ordered PostgreSQL schema migrations
│   └── src/
│       ├── config/           # Redis, Razorpay, and Cloudinary clients
│       ├── controllers/      # HTTP request handlers
│       ├── db/               # Database connection and import tooling
│       ├── middlewares/      # Auth, validation, uploads, limits, errors
│       ├── repositories/     # Data-access helpers
│       ├── routes/           # REST route definitions
│       ├── services/         # Business workflows and background cleanup
│       └── validation/       # Zod schemas
├── frontend/
│   └── src/
│       ├── api/              # REST clients
│       ├── components/       # Shared UI
│       ├── context/          # Global state
│       ├── hooks/            # Reusable data hooks
│       ├── pages/            # Routed screens
│       └── utils/            # Client utilities
└── README.md
```

## Technology Stack

### Frontend

- React 18 and React Router
- Vite
- Tailwind CSS and PostCSS
- Axios
- Framer Motion, Swiper, React Toastify, and SweetAlert2
- Headless UI, Heroicons, Lucide, and React Icons

### Backend and infrastructure

- Node.js with Express 5 using ECMAScript modules
- PostgreSQL using `pg`
- Redis using the `redis` client
- JWT and `bcryptjs` for authentication
- Zod for request validation
- Cloudinary and Multer for image uploads
- Razorpay for payment orders and verification
- Helmet, CORS, and `express-rate-limit` for API hardening

## Prerequisites

- Node.js and npm
- PostgreSQL 15 or later
- Redis 6 or later
- Cloudinary credentials for image uploads
- Razorpay credentials for payment flows

## Configuration

Create `backend/.env` locally. Never commit this file or real credentials.

```env
PORT=5000
DATABASE_URL=postgresql://postgres:password@localhost:5432/roomapp
PGSSL=false
PG_POOL_MAX=20
PG_STATEMENT_TIMEOUT_MS=10000
PG_LOCK_TIMEOUT_MS=5000
CLIENT_URL=http://localhost:5173
REDIS_URL=redis://localhost:6379
JWT_SECRET=replace-with-a-long-random-secret

CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

The frontend uses `VITE_API_URL` as its Axios base URL and defaults to `http://localhost:5000`. Because API modules include the `/api` prefix, a local frontend can use:

```env
VITE_API_URL=http://localhost:5000
```

## Local Development

### Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### Create the schema

Create an empty PostgreSQL database named `roomapp`, configure `DATABASE_URL`, and run:

```bash
cd backend
npm run db:migrate
```

Migrations are recorded in `schema_migrations` and are safe to rerun. Start Redis before starting the API.

### Start the services

In separate terminals:

```bash
cd backend
npm run dev
```

```bash
cd frontend
npm run dev
```

The API is available at `http://localhost:5000`; the Vite application is available at `http://localhost:5173`.

## Optional MongoDB Import

The repository includes an importer for legacy MongoDB exports. Export `users`, `rooms`, `bookings`, and `favorites` as JSON or NDJSON into `backend/data/`, initialize an empty PostgreSQL database, run the migrations, then execute:

```bash
cd backend
npm run db:import-mongo -- data
```

The importer maps MongoDB object IDs to PostgreSQL UUIDs and preserves relationships. Run it only against a database that does not already contain application data.

## API Surface

All endpoints are under `/api`.

| Area | Endpoints | Access |
| --- | --- | --- |
| Health | `GET /health`, `GET /test` | Public |
| Auth | `POST /register`, `POST /login` | Public |
| Rooms | `GET /rooms`, `GET /rooms/:id` | Public |
| Room management | `POST /rooms`, `PUT /rooms/:id`, `DELETE /rooms/:id`, `GET /myRooms` | Owner or admin |
| Favorites | `POST /favoriteRoom/:id`, `GET /favoriteRooms` | User |
| Bookings | `POST /confirm`, `GET /myBooking`, `DELETE /cancel/:id` | User; admin can confirm |
| Owner bookings | `GET /booking`, `DELETE /cancelBookings/:id` | Owner or admin |
| Payments | `POST /create-order`, `POST /verify` | User |
| Administration | `GET /admin/dashboard`, `GET /admin/management`, user/room deletion, booking cancellation | Admin |

Authentication uses a bearer token:

```http
Authorization: Bearer <jwt>
```

## Quality Checks

```bash
cd frontend
npm run lint
npm run build
```

The backend currently provides development, production start, migration, and MongoDB import scripts:

```bash
cd backend
npm run dev
npm start
npm run db:migrate
npm run db:import-mongo -- data
```

## License

ISC. See the package metadata for project ownership and repository information.
