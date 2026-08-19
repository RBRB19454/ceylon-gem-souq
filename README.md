# Ceylon Gem Souq — Sri Lankan Gem Showcase Platform

Bilingual (English/Arabic) MERN marketplace connecting Sri Lankan gem owners with
Middle Eastern buyers. Booking/inquiry model — the platform never processes payment;
buyer and seller finalize the deal off-platform once a booking is accepted. The
Administrator verifies listings and records commission on completed deals.

## Folder structure

```
ceylon-gem-souq/
├── backend/    Express + MongoDB (Mongoose) REST API
└── frontend/   React (Vite) client
```

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/ceylon-gem-souq
JWT_SECRET=<a long random string>
NODE_ENV=development
```

Get `MONGO_URI` from a free MongoDB Atlas cluster (recommended: pick a region close to
your buyers, e.g. Middle East / Europe) — https://www.mongodb.com/cloud/atlas/register

Run it:
```bash
npm run dev      # nodemon, auto-restarts on changes
# or
npm start
```

The API will be live at `http://localhost:5000`. Test it: `GET /` should return
`{ "message": "Ceylon Gem Souq API is running" }`.

### API overview

| Area | Route | Access |
|---|---|---|
| Auth | `POST /api/auth/register` | public (role: buyer/owner) |
| Auth | `POST /api/auth/login` | public |
| Auth | `GET /api/auth/me` | logged in |
| Listings | `GET /api/listings` | public (approved only, filters: `gemType`, `minPrice`, `maxPrice`) |
| Listings | `GET /api/listings/:id` | public |
| Listings | `POST /api/listings` | owner |
| Listings | `GET /api/listings/mine` | owner |
| Listings | `PUT /api/listings/:id` | owner (own listing) |
| Listings | `GET /api/listings/admin/all` | admin |
| Listings | `PUT /api/listings/:id/review` | admin — body `{ status: "approved" \| "rejected" }` |
| Bookings | `POST /api/bookings` | buyer — body `{ listingId, message }` |
| Bookings | `PUT /api/bookings/:id/respond` | owner — body `{ status: "accepted" \| "declined" }` |
| Bookings | `GET /api/bookings/mine` | buyer or owner |
| Bookings | `GET /api/bookings/admin/all` | admin |
| Commissions | `POST /api/commissions/complete` | admin — body `{ bookingId, buyerCommission, ownerCommission, currency }` |
| Commissions | `GET /api/commissions` | admin |
| Users | `GET /api/users` | admin |
| Users | `PUT /api/users/:id/verify` | admin |

There is currently no self-registration route for `admin` — create the first admin
account by registering as a normal user, then flipping `role` to `"admin"` directly in
the `users` collection in MongoDB Atlas (or write a one-off seed script).

## 2. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env
```

`.env`:
```
VITE_API_URL=http://localhost:5000/api
```

Run it:
```bash
npm run dev
```

Open `http://localhost:3000`. Register as a Buyer or Gem Owner, log in, and:
- **Owner** → "My Dashboard": add a listing, respond to booking requests.
- **Buyer** → "Listings": browse approved gems, request a booking.
- **Admin** (after manually setting your role) → "Admin": approve/reject listings,
  mark accepted bookings as completed and record commission.

## What's already built

- JWT auth with role-based access (admin / owner / buyer), password hashing (bcrypt)
- Mongoose models for Users, Listings, Bookings, Commissions, Notifications
- Full booking lifecycle: request → accept/decline → complete (with commission)
- Commission completion uses a **MongoDB transaction** so the booking status and the
  commission record are written together, or not at all
- Bilingual toggle (English/Arabic) with `dir="rtl"` switching on the `<html>` tag
- Basic responsive layout, ready to restyle to the final Ceylon Gem Souq brand
  (navy `#0B1E3D` / gold `#E4C56B` are already used as placeholders)

## What's intentionally left for you to build next

- Real Arabic translations (currently only the language *toggle* exists — page text is
  still English-only; wire up an i18n library like `react-i18next` or `i18next` and add
  an `ar` string file)
- Image upload for listings (currently `images` is just a string array — you'll want
  Cloudinary, S3, or similar)
- Email/in-app notifications (the `Notification` model exists but nothing writes to it yet)
- Admin self-registration / seeding a first admin account
- Visual design pass to match the Ceylon Gem Souq brand and the reference sites
  (Gem Hill, Wijaya Gems, The Natural Gem)
- Deployment (Render/Railway/Fly.io for the API, Vercel/Netlify for the frontend,
  MongoDB Atlas for the database)

## Notes on the database choice

MongoDB was kept as agreed in the original proposal (MERN stack). Multi-document ACID
transactions (used in the commission-completion endpoint) have been supported since
MongoDB 4.0, so the "can I trust it for a real international transaction record" concern
is handled at the code level, not just a promise — see
`backend/src/controllers/commissionController.js`.
