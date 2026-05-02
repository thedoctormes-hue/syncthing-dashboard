import { RefreshCw } from 'lucide-react';

interface FolderListProps {
  folders: any;
  config: any;
}

const API_BASE = '/api/syncthing';

export function FolderList({ folders, config }: FolderListProps) {
  const handleRescan = async (folderID: string) => {
    try {
      const res = await fetch(`${API_BASE}/db/scan?folder=${folderID}`, { method: 'POST' });
      if (res.ok) alert(`Rescan started for ${folderID}`);
    } catch (e) {
      alert('Error: ' + e);
    }
  };

  if (!folders || Object.keys(folders).length === 0) {
    return (
      <div className="glass-panel rounded-lg p-4">
        <p className="text-gray-400">Нет данных о папках</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-mono text-emerald">Папки синхронизации</h2>
      {Object.entries(folders).map(([folderID, data]: [string, any]) => {
        const folderConfig = config?.folders?.find((f: any) => f.id === folderID);
        
        return (
          <div key={folderID} className="glass-panel rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-sm">{folderConfig?.label || folderID}</span>
              <span className="text-xs text-gray-400">{folderConfig?.path}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className={data.lastScan ? 'text-success' : 'text-warning'}>
                {data.lastScan ? 'Синхронизировано' : 'Ожидание'}
              </span>
              <button
                onClick={() => handleRescan(folderID)}
                className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded hover:bg-white/10"
              >
                <RefreshCw size={12} />
                Rescan
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}