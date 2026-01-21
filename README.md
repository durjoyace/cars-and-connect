# Cars & Connection

A turbo-charged social playground for car lovers where real car culture meets pop nostalgia. Daily challenges, authentic car data, and a community that respects both the Fast & Furious fan and the registry nerd.

![Cars & Connection](https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200)

## Features

- **Daily Challenges**: Gran Turismo tributes, Top Gear budget challenges, Doug DeMuro oddball hunts, and more
- **Real Car Data**: VINs, auction histories, provenance timelines, and collector stats
- **Social Unlocks**: Bring friends, unlock features - from sticker packs to VIP garage themes
- **Pop Culture Mode**: Toggle between movie trivia, retro aesthetics, and serious collector mode
- **Themed Garages**: Build "Seinfeld's Porsches", "Tokyo Drift Tuners", or "Radwood Legends"

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: SQLite with Prisma ORM
- **Auth**: NextAuth.js
- **Styling**: Tailwind CSS
- **State**: Zustand

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/durjoyace/cars-and-connect.git
cd cars-and-connect
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Generate Prisma client and push schema:
```bash
npm run db:generate
npm run db:push
```

5. Seed the database:
```bash
npm run db:seed
```

6. Start the development server:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

## Demo Account

After seeding the database, you can log in with:
- **Email**: demo@carsandconnection.com
- **Password**: demo123

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (app)/             # Authenticated app routes
│   │   ├── dashboard/     # Main dashboard
│   │   ├── challenges/    # Challenge listings
│   │   ├── garage/        # User garages
│   │   ├── invite/        # Invite system
│   │   └── profile/       # User profile & settings
│   ├── api/               # API routes
│   └── auth/              # Authentication pages
├── components/            # React components
│   ├── ui/                # Base UI components
│   ├── challenges/        # Challenge-related components
│   ├── garage/            # Garage-related components
│   └── layout/            # Layout components
├── lib/                   # Utilities and configurations
├── store/                 # Zustand store
├── types/                 # TypeScript types
└── data/                  # Static data and seed data
```

## Challenge Themes

- 🏁 **Gran Turismo**: Classic racing game nostalgia
- 🔥 **Fast & Furious**: Movie car culture
- 🇬🇧 **Top Gear**: British automotive wit
- 🤓 **Doug DeMuro**: Quirks and features deep dives
- 📼 **Radwood**: 80s/90s aesthetic appreciation
- 🔨 **BaT Auctions**: Collector market focus

## Display Modes

Toggle between three display modes to customize your experience:

- **Pop Culture**: Movie references, stickers, neon themes
- **Balanced**: Best of both worlds (default)
- **Collector**: Data, provenance, auction histories

## License

MIT

## Credits

Built with love for car enthusiasts everywhere. Inspired by the best of car culture - from Gran Turismo to Bring a Trailer.
