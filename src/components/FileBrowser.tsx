import { useState, useRef } from 'react';
import { RefreshCw, Download, Share2, Upload, X } from 'lucide-react';

interface FileItem {
  name: string;
  path: string;
  size: number;
  modified: number;
}

export function FileBrowser() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'preview' | 'upload'>('list');
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/files');
      const data = await res.json();
      setFiles(data);
    } catch (e) {
      alert('Error: ' + e);
    }
    setLoading(false);
  };

  const readFile = async (path: string) => {
    try {
      const res = await fetch(`/api/file/${path}`);
      const data = await res.json();
      setContent(data.content || '');
      setSelectedFile(path);
      setViewMode('preview');
    } catch (e) {
      alert('Error: ' + e);
    }
  };

  const downloadFile = async (path: string) => {
    try {
      const res = await fetch(`/api/file/${path}`);
      const data = await res.json();
      const blob = new Blob([data.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = path.split('/').pop() || 'file';
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert('Error: ' + e);
    }
  };

  const copyLink = (path: string) => {
    const link = `${window.location.origin}/api/file/${path}`;
    navigator.clipboard?.writeText(link) ||
      (() => { const t = document.createElement('textarea'); t.value = link; document.body.appendChild(t); t.select(); document.execCommand('copy'); document.body.removeChild(t); })();
    alert(`Ссылка скопирована:\n${link}`);
  };

  const shareFile = async (path: string) => {
    const link = `${window.location.origin}/api/file/${path}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: `File: ${path}`,
          text: `Download: ${link}`,
          url: link
        });
      } else {
        copyLink(path);
      }
    } catch (e) {
      alert('Error: ' + e);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadStatus('Загружаю...');
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.status === 'ok') {
        setUploadStatus('✓ Загружено в /Sync - роится на всех серверах!');
        setTimeout(() => {
          setViewMode('list');
          setUploadStatus('');
        }, 2000);
      } else {
        setUploadStatus('Ошибка: ' + data.error);
      }
    } catch (e) {
      setUploadStatus('Ошибка: ' + e);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-mono text-emerald">Files</h2>
        <div className="flex gap-2">
          <button
            onClick={() => { setViewMode('upload'); fileInputRef.current?.click(); }}
            className="p-2 bg-white/5 rounded"
          >
            <Upload size={16} />
          </button>
          <button
            onClick={fetchFiles}
            disabled={loading}
            className="p-2 bg-white/5 rounded"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        onChange={handleUpload}
        className="hidden"
      />

      {viewMode === 'list' && (
        <>
          {files.length === 0 && (
            <button onClick={fetchFiles} className="w-full p-4 bg-emerald text-dark rounded">
              Load Files from ~/.qwen
            </button>
          )}
          
          {files.length > 0 && (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {files.map((f) => (
                <div key={f.path} className="glass-panel rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm truncate flex-1">{f.name}</span>
                    <span className="text-xs text-gray-400 ml-2">{(f.size / 1024).toFixed(0)}KB</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => readFile(f.path)}
                      className="flex-1 py-1 px-2 bg-emerald/50 text-emerald rounded text-xs"
                    >
                      View
                    </button>
                    <button
                      onClick={() => downloadFile(f.path)}
                      className="p-1 bg-white/5 rounded"
                    >
                      <Download size={14} />
                    </button>
                    <button
                      onClick={() => shareFile(f.path)}
                      className="p-1 bg-white/5 rounded"
                    >
                      <Share2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {viewMode === 'preview' && selectedFile && (
        <div className="glass-panel rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-sm truncate">{selectedFile}</span>
            <button
              onClick={() => setViewMode('list')}
              className="p-1"
            >
              <X size={16} />
            </button>
          </div>
          <div className="flex gap-2 mb-2">
            <button
              onClick={() => {
                const path = selectedFile;
                fetch(`/api/file/${path}`).then(r => r.json()).then(data => {
                  const blob = new Blob([data.content], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = path.split('/').pop() || 'file';
                  a.click();
                });
              }}
              className="flex-1 py-2 bg-emerald text-dark rounded text-xs"
            >
              Download
            </button>
            <button
              onClick={() => copyLink(selectedFile)}
              className="flex-1 py-2 bg-white/10 rounded text-xs"
            >
              Copy Link
            </button>
          </div>
          <pre className="text-xs bg-black/30 p-3 rounded max-h-64 overflow-y-auto whitespace-pre-wrap break-words">
            {content || 'Loading...'}
          </pre>
        </div>
      )}

      {viewMode === 'upload' && uploadStatus && (
        <div className="glass-panel rounded-lg p-4 text-center">
          <p>{uploadStatus}</p>
          <p className="text-xs text-gray-400 mt-2">Файл появится на всех серверах (Warsaw, Florida, RF-Proxy) через 1-2 минуты</p>
        </div>
      )}
    </div>
  );
}