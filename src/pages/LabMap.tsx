import { useApi } from '../hooks/useApi';
import { Bot, Shield, FileCode, Activity } from 'lucide-react';

interface LabEntity {
  name: string;
  status: string;
  users?: number;
  clients?: number;
}

export default function LabMap() {
  const { data } = useApi<{ bots: LabEntity[], vpn: LabEntity[], protocols: LabEntity[] }>('/api/labmap/entities');

  const EntityCard = ({ entity, icon, metric }: { entity: LabEntity; icon: React.ReactNode; metric?: string }) => (
    <div className="glass-panel rounded-lg p-4 hover:bg-white/10 transition cursor-pointer">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-mono font-medium">{entity.name}</span>
        </div>
        <span className={`w-2 h-2 rounded-full ${
          entity.status === 'active' ? 'bg-success animate-pulse' : 'bg-warning'
        }`} />
      </div>
      {metric && <p className="text-xs text-gray-400">{metric}</p>}
      <div className="mt-2 text-xs">
        <span className={`px-2 py-0.5 rounded ${
          entity.status === 'active' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
        }`}>
          {entity.status}
        </span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Боты */}
      <section>
        <h2 className="text-lg font-mono text-emerald mb-3 flex items-center gap-2">
          <Bot size={18} /> Боты
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(data?.bots || []).map(bot => (
            <EntityCard key={bot.name} entity={bot} icon={<Bot size={16} className="text-pink" />} metric={`Пользователи: ${bot.users ?? 0}`} />
          ))}
        </div>
      </section>

      {/* VPN система */}
      <section>
        <h2 className="text-lg font-mono text-emerald mb-3 flex items-center gap-2">
          <Shield size={18} /> VPN система
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(data?.vpn || []).map(server => (
            <EntityCard key={server.name} entity={server} icon={<Shield size={16} className="text-blue" />} metric={`Клиенты: ${server.clients ?? 0}`} />
          ))}
        </div>
      </section>

      {/* Протоколы/инструменты */}
      <section>
        <h2 className="text-lg font-mono text-emerald mb-3 flex items-center gap-2">
          <FileCode size={18} /> Протоколы и инструменты
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(data?.protocols || []).map(proto => (
            <EntityCard key={proto.name} entity={proto} icon={<Activity size={16} className="text-warning" />} />
          ))}
        </div>
      </section>
    </div>
  );
}