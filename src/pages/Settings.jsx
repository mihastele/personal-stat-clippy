import { useState } from 'react'
import { User, Bell, Shield, Palette, Link2, Music, Gamepad2, Github, Trophy, Check, X, ExternalLink } from 'lucide-react'

const connectedServices = [
  { id: 'spotify', name: 'Spotify', icon: Music, color: 'text-green-400 bg-green-500/10', connected: true },
  { id: 'steam', name: 'Steam', icon: Gamepad2, color: 'text-blue-400 bg-blue-500/10', connected: true },
  { id: 'github', name: 'GitHub', icon: Github, color: 'text-purple-400 bg-purple-500/10', connected: true },
  { id: 'chess', name: 'Chess.com', icon: Trophy, color: 'text-amber-400 bg-amber-500/10', connected: true },
]

export default function Settings() {
  const [notifications, setNotifications] = useState({
    weeklyReport: true,
    milestones: true,
    newFeatures: false,
    marketing: false,
  })

  const [privacy, setPrivacy] = useState({
    publicProfile: true,
    shareStats: true,
    showActivity: false,
  })

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Settings</h1>
        <p className="text-dark-400">Manage your account and preferences</p>
      </div>

      {/* Profile Section */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-5 h-5 text-primary-400" />
          <h2 className="text-lg font-semibold text-white">Profile</h2>
        </div>
        
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-dark-400 mb-2">Display Name</label>
                <input
                  type="text"
                  defaultValue="Alex Johnson"
                  className="w-full px-4 py-2.5 bg-dark-800 border border-dark-700 rounded-xl text-white focus:outline-none focus:border-primary-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm text-dark-400 mb-2">Username</label>
                <input
                  type="text"
                  defaultValue="alexj"
                  className="w-full px-4 py-2.5 bg-dark-800 border border-dark-700 rounded-xl text-white focus:outline-none focus:border-primary-500 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-dark-400 mb-2">Email</label>
              <input
                type="email"
                defaultValue="alex@example.com"
                className="w-full px-4 py-2.5 bg-dark-800 border border-dark-700 rounded-xl text-white focus:outline-none focus:border-primary-500 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Connected Services */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <Link2 className="w-5 h-5 text-primary-400" />
          <h2 className="text-lg font-semibold text-white">Connected Services</h2>
        </div>
        
        <div className="space-y-3">
          {connectedServices.map((service) => (
            <div key={service.id} className="flex items-center justify-between p-4 bg-dark-800/50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${service.color}`}>
                  <service.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-white">{service.name}</p>
                  <p className="text-sm text-dark-400">
                    {service.connected ? 'Connected' : 'Not connected'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {service.connected && (
                  <span className="flex items-center gap-1 text-sm text-green-400">
                    <Check className="w-4 h-4" />
                    Active
                  </span>
                )}
                <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  service.connected 
                    ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                    : 'bg-primary-500 text-white hover:bg-primary-600'
                }`}>
                  {service.connected ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <p className="mt-4 text-sm text-dark-400">
          Connect more services to get comprehensive insights about your digital activity.
        </p>
      </div>

      {/* Notifications */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-5 h-5 text-primary-400" />
          <h2 className="text-lg font-semibold text-white">Notifications</h2>
        </div>
        
        <div className="space-y-4">
          {[
            { key: 'weeklyReport', label: 'Weekly Report', description: 'Get a summary of your activity every week' },
            { key: 'milestones', label: 'Milestones', description: 'Notifications when you reach new milestones' },
            { key: 'newFeatures', label: 'New Features', description: 'Updates about new features and improvements' },
            { key: 'marketing', label: 'Marketing', description: 'Promotional content and offers' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-dark-800/50 rounded-xl">
              <div>
                <p className="font-medium text-white">{item.label}</p>
                <p className="text-sm text-dark-400">{item.description}</p>
              </div>
              <button
                onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                className={`relative w-12 h-6 rounded-full transition-all ${
                  notifications[item.key] ? 'bg-primary-500' : 'bg-dark-700'
                }`}
              >
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                  notifications[item.key] ? 'left-7' : 'left-1'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-5 h-5 text-primary-400" />
          <h2 className="text-lg font-semibold text-white">Privacy</h2>
        </div>
        
        <div className="space-y-4">
          {[
            { key: 'publicProfile', label: 'Public Profile', description: 'Allow others to view your profile' },
            { key: 'shareStats', label: 'Share Stats', description: 'Allow sharing of your stats in reports' },
            { key: 'showActivity', label: 'Show Activity', description: 'Display your recent activity publicly' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-dark-800/50 rounded-xl">
              <div>
                <p className="font-medium text-white">{item.label}</p>
                <p className="text-sm text-dark-400">{item.description}</p>
              </div>
              <button
                onClick={() => setPrivacy(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                className={`relative w-12 h-6 rounded-full transition-all ${
                  privacy[item.key] ? 'bg-primary-500' : 'bg-dark-700'
                }`}
              >
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                  privacy[item.key] ? 'left-7' : 'left-1'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="glass-card p-6 border-red-500/20">
        <h2 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h2>
        <div className="flex items-center justify-between p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
          <div>
            <p className="font-medium text-white">Delete Account</p>
            <p className="text-sm text-dark-400">Permanently delete your account and all data</p>
          </div>
          <button className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg font-medium hover:bg-red-500/20 transition-all">
            Delete Account
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-4">
        <button className="btn-secondary">Cancel</button>
        <button className="btn-primary">Save Changes</button>
      </div>
    </div>
  )
}
