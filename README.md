# StatClippy - Personal Stats Dashboard

A modern, cross-platform web application that provides a centralized dashboard to track your digital activity across different platforms like music streaming, gaming, social media, and more.

![StatClippy Dashboard](https://api.dicebear.com/7.x/shapes/svg?seed=statclippy)

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

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── charts/          # Chart components (Area, Bar, Line, Pie)
│   ├── ui/              # Reusable UI components
│   ├── Header.jsx       # App header with search
│   ├── Layout.jsx       # Main layout wrapper
│   └── Sidebar.jsx      # Navigation sidebar
├── data/
│   └── mockData.js      # Mock data for all platforms
├── lib/
│   └── utils.js         # Utility functions
├── pages/
│   ├── Dashboard.jsx    # Main dashboard overview
│   ├── MusicStats.jsx   # Spotify statistics
│   ├── GamingStats.jsx  # Steam/gaming statistics
│   ├── DevStats.jsx     # GitHub statistics
│   ├── ChessStats.jsx   # Chess.com statistics
│   ├── Reports.jsx      # Report generation
│   └── Settings.jsx     # User settings
├── App.jsx              # Main app with routing
├── main.jsx             # App entry point
└── index.css            # Global styles
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
