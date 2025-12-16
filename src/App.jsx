import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import MusicStats from './pages/MusicStats'
import GamingStats from './pages/GamingStats'
import DevStats from './pages/DevStats'
import ChessStats from './pages/ChessStats'
import Reports from './pages/Reports'
import Settings from './pages/Settings'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="music" element={<MusicStats />} />
        <Route path="gaming" element={<GamingStats />} />
        <Route path="dev" element={<DevStats />} />
        <Route path="chess" element={<ChessStats />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default App
