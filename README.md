# IftarShare

A community platform where people organise, join and track Iftar, Sehri and food-distribution events during Ramadan.

**Live site:** https://iftarshare-client.vercel.app

**API:** https://iftarshare-server.vercel.app

## Features
- Create, update and delete your own distribution events (future dates only)
- Browse upcoming events, filtered by type and searchable by location
- Join an event as a volunteer, with limits set by the organiser
- Joined Events page sorted by date
- Email/password and Google login with BetterAuth, JWT-protected API
- Light and dark theme toggle
- Bangladesh-time event dates and local community photographs with attribution

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

The newsletter section is design-only, as specified in the assignment. It does not collect email addresses.

## Community photographs

Photographs are documentary images of independent initiatives, not events hosted by IftarShare. The originals are stored in `public/images`; layouts crop them for display. Author, source and license links appear beside each image.

- `chawkbazar-iftar.jpg`: [Iftar at Chawkbajar Shahi Mosque 12](https://commons.wikimedia.org/wiki/File:Iftar_at_Chawkbajar_Shahi_Mosque_12.jpg), Wasiul Bahar, CC BY-SA 4.0.
- `community-iftar.jpg`: [Iftar at Chawkbajar Shahi Mosque 25](https://commons.wikimedia.org/wiki/File:Iftar_at_Chawkbajar_Shahi_Mosque_25.jpg), Wasiul Bahar, CC BY-SA 4.0.
- `iftar-preparation.jpg`: [Iftar at Chawkbajar Shahi Mosque 29](https://commons.wikimedia.org/wiki/File:Iftar_at_Chawkbajar_Shahi_Mosque_29.jpg), Wasiul Bahar, CC BY-SA 4.0.
- `food-distribution.jpg`: [Al Manahil food distribution, 28 October 2020](https://commons.wikimedia.org/wiki/File:Al_Manahil_food_distribution_28_October_2020.jpg), Al Manahil Welfare Foundation Bangladesh (uploaded by Owais Al Qarni), CC BY 3.0.

Licenses: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) and [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/).
