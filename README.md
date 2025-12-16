# StatClippy - Personal Stats Dashboard

A modern, cross-platform web application that provides a centralized dashboard to track your digital activity across different platforms like music streaming, gaming, social media, and more.

![StatClippy Dashboard](https://api.dicebear.com/7.x/shapes/svg?seed=statclippy)

## Architecture

This project consists of two parts:
- **Frontend** (`/`) - React dashboard that displays stats
- **Backend** (`/server`) - Express.js API server with SQLite database and admin GUI

## Features

### 🎵 Music Stats (Spotify)
- Track listening habits and total listening time
- View favorite artists and most-played songs
- Analyze genre preferences with interactive charts
- See recently played tracks

### 🎮 Gaming Insights (Steam)
- Analyze playtime across all games
- Track achievements and completion rates
- View game rankings and performance metrics
- Genre breakdown visualization

### 💻 Developer Stats (GitHub)
- Track contributions and commit history
- View repository statistics and stars
- Monitor coding streaks
- Language breakdown analysis

### ♟️ Chess Stats (Chess.com)
- Track ratings across different time controls
- View win/loss/draw statistics
- Analyze opening preferences and performance
- Monitor rating progress over time

### 📊 Data Visualization
- Interactive charts and graphs powered by Recharts
- Beautiful, responsive design with dark theme
- Real-time data updates

### 📄 Custom Reports & Sharing
- Generate personalized activity reports
- Filter by platform and time range
- Share highlights with friends on social media

## Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: TailwindCSS
- **Routing**: React Router v6
- **Charts**: Recharts
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge, date-fns

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/personal-stat-clippy.git
cd personal-stat-clippy
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd server
npm install
cd ..
```

4. Copy the environment file:
```bash
cp .env.example .env
```

### Running the Application

**Option 1: Run both servers (recommended)**

Terminal 1 - Start the backend server:
```bash
cd server
npm run dev
```
Backend runs at `http://localhost:3001`
Admin GUI at `http://localhost:3001/admin`

Terminal 2 - Start the frontend:
```bash
npm run dev
```
Frontend runs at `http://localhost:5173`

**Option 2: Frontend only (uses mock data)**
```bash
npm run dev
```

### Admin GUI

Access the backend admin panel at `http://localhost:3001/admin` to:
- View and edit all stats manually
- Configure API credentials for each service
- Trigger manual syncs
- Monitor activity

## Project Structure

```
├── src/                      # Frontend React app
│   ├── components/
│   │   ├── charts/           # Chart components (Area, Bar, Line, Pie)
│   │   ├── ui/               # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── Layout.jsx
│   │   └── Sidebar.jsx
│   ├── data/
│   │   └── mockData.js       # Fallback mock data
│   ├── hooks/
│   │   └── useStats.js       # API hooks with fallback
│   ├── lib/
│   │   └── utils.js
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── MusicStats.jsx
│   │   ├── GamingStats.jsx
│   │   ├── DevStats.jsx
│   │   ├── ChessStats.jsx
│   │   ├── Reports.jsx
│   │   └── Settings.jsx
│   ├── services/
│   │   └── api.js            # API service layer
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── server/                   # Backend Express server
│   ├── data/
│   │   └── stats.db          # SQLite database (auto-created)
│   ├── public/
│   │   └── admin.html        # Admin GUI
│   ├── index.js              # Server entry point
│   └── package.json
│
├── package.json              # Frontend dependencies
├── .env.example              # Environment template
└── README.md
```

## API Integration

This project currently uses mock data to demonstrate the UI. To connect real APIs:

### Spotify
1. Create an app at [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Add your Client ID and Secret to environment variables
3. Implement OAuth 2.0 flow for user authentication

### Steam
1. Get an API key from [Steam Web API](https://steamcommunity.com/dev/apikey)
2. Use the Steam Web API to fetch user data

### GitHub
1. Create a GitHub OAuth App or use Personal Access Token
2. Use the [GitHub REST API](https://docs.github.com/en/rest) for data

### Chess.com
1. Use the public [Chess.com API](https://www.chess.com/news/view/published-data-api)
2. No authentication required for public data

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id
VITE_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
VITE_STEAM_API_KEY=your_steam_api_key
VITE_GITHUB_TOKEN=your_github_token
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Recharts](https://recharts.org/) for beautiful charts
- [Lucide](https://lucide.dev/) for icons
- [TailwindCSS](https://tailwindcss.com/) for styling
- [Vite](https://vitejs.dev/) for blazing fast development
