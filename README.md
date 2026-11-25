# IftarShare

A community platform where people organise, join and track Iftar, Sehri and food-distribution events during Ramadan.

**Live site:** https://iftarshare-client.vercel.app

**API:** https://iftarshare-server.vercel.app

## Features
- Create, update and delete your own distribution events (future dates only)
- Browse upcoming events in a grid
- Join an event while logged in
- Joined Events page sorted by date
- Email/password and Google login with BetterAuth, JWT-protected API
- Light and dark theme toggle
- Static community event gallery

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

The newsletter form validates email and shows a frontend submit confirmation. It does not store addresses or send email.

## Images

Local images use CC0 or public-domain releases that do not require attribution. They illustrate independent community activities, not events hosted by IftarShare.

Source records: [iftar image (CC0)](https://commons.wikimedia.org/wiki/File:বাংলাদেশের_মসজিদে_আয়োজিত_ইফতার.jpg), [water supplies (public domain)](https://commons.wikimedia.org/wiki/File:Aid_arrives_for_victims_of_Tropical_Cyclone_Sidr_DVIDS66410.jpg), [community relief (public domain)](https://commons.wikimedia.org/wiki/File:Tropical_Cyclone_Relief_Operation,_Bangladesh_DVIDS72094.jpg), [food supplies (public domain)](https://commons.wikimedia.org/wiki/File:US_Navy_071203-N-1831S-159_Boxes_of_relief_supplies_are_piled_near_Bangladeshi_citizens_affected_by_Tropical_Cyclone_Sidr.jpg).
