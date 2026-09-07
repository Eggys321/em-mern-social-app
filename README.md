# EM — Social App

A full-stack social feed: sign up, follow people, post updates (with photos), like and comment, and manage your profile.

- **`client/`** — React 18 + Vite single-page app (React Router, React Query, React Hook Form + Yup, Bootstrap).
- **`server/`** — Express + Mongoose REST API (JWT auth, Cloudinary image hosting, Nodemailer password-reset emails).

## Getting started

### Server
```bash
cd server
npm install
cp .env.example .env   # fill in your own Mongo/JWT/Cloudinary/SMTP values
npm run dev
```

### Client
```bash
cd client
npm install
npm run dev
```

By default the client talks to the deployed API (`https://em-mern-social-app.onrender.com/api/v1`). To point it at a local server instead, copy `client/.env.example` to `client/.env` and set `VITE_API_URL=http://localhost:5782/api/v1` (or whatever port your local server runs on).

## Project structure

```
client/src/
  api/          single fetch wrapper every request goes through (client.js)
  api-free bits: pages/ (routes), layouts/, components/, auth/, context/, hooks/, utils/, styles/
server/
  routes/, controllers/, model/, middleware/, config/, helper/
```

## Scripts

| | client | server |
|---|---|---|
| dev | `npm run dev` | `npm run dev` |
| build | `npm run build` | — |
| lint | `npm run lint` | — |

## Deployment

- Client: Vercel (`client/vercel.json` rewrites all routes to `index.html` for client-side routing).
- Server: Render.
