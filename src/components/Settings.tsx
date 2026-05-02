import { useState } from 'react';
import { Wifi, Bell } from 'lucide-react';

interface SettingsProps {
  config: any;
}

export function Settings({ config }: SettingsProps) {
  const [wifiOnly, setWifiOnly] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [telegramToken, setTelegramToken] = useState('');

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-mono text-emerald">Настройки</h2>

      <div className="glass-panel rounded-lg p-3 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wifi size={16} />
            <span className="text-sm">WiFi-only режим</span>
          </div>
          <label className="relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none">
            <input
              type="checkbox"
              checked={wifiOnly}
              onChange={(e) => setWifiOnly(e.target.checked)}
              className="sr-only"
            />
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${wifiOnly ? 'translate-x-4' : 'translate-x-0'}`} />
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell size={16} />
            <span className="text-sm">Push уведомления</span>
          </div>
          <label className="relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none">
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="sr-only"
            />
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${notifications ? 'translate-x-4' : 'translate-x-0'}`} />
          </label>
        </div>

        <div className="border-t border-white/10 pt-3">
          <label className="block text-xs text-gray-400 mb-1">Telegram Bot Token</label>
          <input
            type="password"
            value={telegramToken}
            onChange={(e) => setTelegramToken(e.target.value)}
            placeholder="123456789:ABCdef..."
            className="w-full bg-black/30 border border-white/10 rounded px-2 py-1 font-mono text-sm"
          />
        </div>

        <div className="border-t border-white/10 pt-3">
          <h3 className="text-xs font-mono text-pink mb-2">Selective Sync</h3>
          {config?.folders?.map((folder: any) => (
            <div key={folder.id} className="flex items-center justify-between py-1">
              <span className="text-sm">{folder.label || folder.id}</span>
              <span className="text-xs text-emerald">Все устройства</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}