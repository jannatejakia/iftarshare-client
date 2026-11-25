# IftarShare

A community platform where people organise, join and track Iftar, Sehri and food-distribution events during Ramadan.

**Live site:** https://iftarshare-client.vercel.app

**API:** https://iftarshare-server.vercel.app

## Features
- Create, update and delete your own distribution events (future dates only)
- Browse upcoming events, filtered by type and searchable by location
- Join an event in one click, with capacity limits
- Joined Events page sorted by date
- Email/password and Google login with BetterAuth, JWT-protected API
- Light and dark theme toggle

## Tech stack
Next.js (App Router), TypeScript, Tailwind CSS, DaisyUI, BetterAuth, Express, MongoDB

## Run locally
```bash
cp .env.example .env.local   # then fill in the values
npm install
npm run dev
```

Google login is displayed only when `NEXT_PUBLIC_GOOGLE_LOGIN_ENABLED=true` and the server has matching Google OAuth credentials configured.

For production Google OAuth, use `https://iftarshare-client.vercel.app` as the authorized origin and `https://iftarshare-client.vercel.app/api/auth/callback/google` as the authorized redirect URI.

Server repo: https://github.com/jannatejakia/iftarshare-server
