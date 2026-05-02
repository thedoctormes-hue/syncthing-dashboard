import { useApi } from '../hooks/useApi';
import { RefreshCw, DollarSign, Globe, RotateCw } from 'lucide-react';
import { useState } from 'react';

interface ServerData {
  cpu: number;
  ram: number;
  disk: number;
  ping: string;
  uptime?: number;
}

interface Services {
  services: string[];
}

export default function Monitoring() {
  const { data: servers } = useApi<Record<string, ServerData>>('/api/monitoring/servers');
  const { data: services, refetch: refetchServices } = useApi<Services>('/api/monitoring/services');
  const { data: orBalance } = useApi<{ balance: string }>('/api/or/balance');
  const { data: hosting } = useApi<any>('/api/hosting/hetzner');
  const { data: domains } = useApi<any>('/api/domains/status');
  const [restarting, setRestarting] = useState<string | null>(null);

  const restartService = async (service: string) => {
    setRestarting(service);
    try {
      await fetch(`/api/monitoring/services/${service}/restart`, { method: 'POST' });
      setTimeout(() => refetchServices(), 1000);
    } catch (e) {
      console.error('Restart failed:', e);
    } finally {
      setRestarting(null);
    }
  };

  const ServerCard = ({ name, data }: { name: string; data?: ServerData }) => (
    <div className="glass-panel rounded-lg p-4">
      <h3 className="font-mono text-sm text-emerald mb-3">{name.toUpperCase()}</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">CPU</span>
          <span className="font-mono">{data?.cpu ?? 0}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">RAM</span>
          <span className="font-mono">{data?.ram ?? 0}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Disk</span>
          <span className="font-mono">{data?.disk ?? 0}%</span>
        </div>
        <div className="flex justify-between pt-2 border-t border-white/10">
          <span className="text-gray-400">Ping</span>
          <span className="font-mono text-xs">{data?.ping ?? 'N/A'}</span>
        </div>
        {data?.uptime && (
          <div className="flex justify-between">
            <span className="text-gray-400">Uptime</span>
            <span className="font-mono text-xs">{Math.floor(data.uptime / 86400)}d</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Сервера */}
      <div>
        <h2 className="text-lg font-mono text-emerald mb-3 flex items-center gap-2">
          <RefreshCw size={18} /> Серверы
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {servers && Object.entries(servers).map(([name, data]) => (
            <ServerCard key={name} name={name} data={data} />
          ))}
        </div>
      </div>

      {/* Сервисы с кнопкой restart */}
      <div>
        <h2 className="text-lg font-mono text-emerald mb-3">Сервисы</h2>
        <div className="glass-panel rounded-lg p-4">
          <div className="flex flex-wrap gap-2">
            {(services?.services || []).map(s => (
              <button
                key={s}
                onClick={() => restartService(s)}
                disabled={restarting === s}
                className="px-2 py-1 bg-success/20 text-success text-xs font-mono rounded hover:bg-success/30 disabled:opacity-50"
              >
                {restarting === s ? <RotateCw className="animate-spin" size={12} /> : s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Балансы */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-panel rounded-lg p-4">
          <h3 className="font-mono text-sm text-emerald mb-2 flex items-center gap-2">
            <DollarSign size={16} /> OpenRouter
          </h3>
          <p className="font-mono text-2xl">{orBalance?.balance ?? 'N/A'}</p>
        </div>
        <div className="glass-panel rounded-lg p-4">
          <h3 className="font-mono text-sm text-emerald mb-2 flex items-center gap-2">
            <Globe size={16} /> Хостинг
          </h3>
          <div className="space-y-1 text-sm">
            <p>Hetzner: {hosting?.hetzner?.balance ?? 'N/A'}</p>
            <p>Timeweb: {hosting?.timeweb?.balance ?? 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Домены */}
      <div>
        <h2 className="text-lg font-mono text-emerald mb-3">Домены & SSL</h2>
        <div className="glass-panel rounded-lg p-4">
          {(domains && Object.entries(domains) || []).map(([domain, info]: [string, any]) => (
            <div key={domain} className="flex justify-between py-1">
              <span className="font-mono">{domain}</span>
              <span className={`text-xs px-2 py-0.5 rounded ${
                info.ssl === 'valid' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
              }`}>
                {info.ssl} до {info.expires}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}