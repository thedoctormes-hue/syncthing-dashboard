import { Upload, Share2, Download, FileText, Folder } from 'lucide-react';
import { useApi } from '../hooks/useApi';

export default function Files() {
  const { data: inbox } = useApi<{ files: any[], total: number }>('/api/files/inbox');
  const { data: outbox } = useApi<{ files: any[], total: number }>('/api/files/outbox');

  const FileItem = ({ name, size, time }: { name: string; size: string; time: string }) => (
    <div className="glass-panel rounded-lg p-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <FileText size={20} className="text-emerald" />
        <div>
          <p className="font-mono text-sm">{name}</p>
          <p className="text-xs text-gray-400">{size} • {time}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="p-1 hover:bg-white/10 rounded"><Download size={16} /></button>
        <button className="p-1 hover:bg-white/10 rounded"><Share2 size={16} /></button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Загрузка */}
      <div>
        <h2 className="text-lg font-mono text-emerald mb-3 flex items-center gap-2">
          <Upload size={18} /> Загрузить файл
        </h2>
        <div className="glass-panel rounded-lg p-8 border-2 border-dashed border-white/20 text-center">
          <input
            type="file"
            className="hidden"
            id="file-upload"
            onChange={(e) => console.log('upload:', e.target.files)}
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Upload size={48} className="mx-auto mb-2 text-gray-400" />
            <p className="text-gray-400">Нажмите или перетащите файл</p>
          </label>
        </div>
      </div>

      {/* Inbox/Outbox */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-mono text-emerald mb-3 flex items-center gap-2">
            <Folder size={16} /> Inbox ({inbox?.total ?? 0})
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {(inbox?.files || []).map((f: any) => (
              <FileItem key={f.name} name={f.name} size={f.size} time={f.time} />
            )) ?? <p className="text-gray-400 text-sm">Пусто</p>}
          </div>
        </div>

        <div>
          <h3 className="font-mono text-emerald mb-3 flex items-center gap-2">
            <Folder size={16} /> Outbox ({outbox?.total ?? 0})
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {(outbox?.files || []).map((f: any) => (
              <FileItem key={f.name} name={f.name} size={f.size} time={f.time} />
            )) ?? <p className="text-gray-400 text-sm">Пусто</p>}
          </div>
        </div>
      </div>
    </div>
  );
}