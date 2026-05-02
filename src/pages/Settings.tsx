import { Moon, Sun, Bell, BellOff, Clock } from 'lucide-react';
import { useState } from 'react';

export default function Settings() {
  const [localSettings, setLocalSettings] = useState({
    theme: 'dark',
    refresh_interval: 60,
    notifications: true,
  });

  return (
    <div className="max-w-2xl space-y-6">
      <div className="glass-panel rounded-lg p-6">
        <h2 className="text-xl font-mono text-emerald mb-4">Настройки дашборда</h2>
        
        <div className="space-y-4">
          {/* Тема */}
          <div className="flex items-center justify-between py-3 border-b border-white/10">
            <div>
              <p className="font-mono">Тема</p>
              <p className="text-xs text-gray-400">Цветовая схема</p>
            </div>
            <button
              onClick={() => setLocalSettings(s => ({ ...s, theme: s.theme === 'dark' ? 'light' : 'dark' }))}
              className="p-2 bg-white/5 rounded-lg hover:bg-white/10"
            >
              {localSettings.theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>

          {/* Интервал обновления */}
          <div className="flex items-center justify-between py-3 border-b border-white/10">
            <div>
              <p className="font-mono">Обновление</p>
              <p className="text-xs text-gray-400">Интервал в секундах</p>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-gray-400" />
              <input
                type="number"
                value={localSettings.refresh_interval}
                onChange={e => setLocalSettings(s => ({ ...s, refresh_interval: +e.target.value }))}
                className="w-20 px-2 py-1 bg-white/5 rounded font-mono text-right"
              />
            </div>
          </div>

          {/* Уведомления */}
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-mono">Уведомления</p>
              <p className="text-xs text-gray-400">Звуковые оповещения</p>
            </div>
            <button
              onClick={() => setLocalSettings(s => ({ ...s, notifications: !s.notifications }))}
              className={`p-2 rounded-lg ${localSettings.notifications ? 'bg-success/20' : 'bg-white/5'}`}
            >
              {localSettings.notifications ? <Bell size={20} className="text-success" /> : <BellOff size={20} />}
            </button>
          </div>
        </div>

        <button className="mt-6 w-full py-2 bg-emerald text-dark font-mono rounded hover:bg-emerald/80">
          Сохранить настройки
        </button>
      </div>
    </div>
  );
}