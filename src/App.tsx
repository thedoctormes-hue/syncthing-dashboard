import { useState } from 'react';
import Monitoring from './pages/Monitoring';
import LabMap from './pages/LabMap';
import Files from './pages/Files';
import SettingsPage from './pages/Settings';
import { Activity, Shield, Folder, Settings } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'monitoring' | 'lab' | 'files' | 'settings'>('monitoring');

  const tabs = [
    { id: 'monitoring', label: 'Мониторинг', icon: Activity },
    { id: 'lab', label: 'Лаборатория', icon: Shield },
    { id: 'files', label: 'Файлы', icon: Folder },
    { id: 'settings', label: 'Настройки', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-dark text-white">
      {/* Header */}
      <header className="border-b border-white/10 p-4">
        <h1 className="text-xl font-mono text-emerald">OS Lab Dashboard</h1>
        <p className="text-xs text-gray-400">DoctorM&Ai Laboratory</p>
      </header>

      {/* Navigation */}
      <nav className="flex gap-2 p-2 border-b border-white/10 overflow-x-auto">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
            className={`px-4 py-2 rounded font-mono text-sm flex items-center gap-2 ${
              activeTab === id ? 'bg-emerald text-dark' : 'bg-white/5'
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </nav>

      {/* Content */}
      <main className="p-4">
        {activeTab === 'monitoring' && <Monitoring />}
        {activeTab === 'lab' && <LabMap />}
        {activeTab === 'files' && <Files />}
        {activeTab === 'settings' && <SettingsPage />}
      </main>
    </div>
  );
}