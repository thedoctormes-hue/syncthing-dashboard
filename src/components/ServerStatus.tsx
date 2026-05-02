import { Wifi, WifiOff, Clock, Activity } from 'lucide-react';

interface ServerStatusProps {
  connections: any;
  status: any;
  allServers: any;
}

const DEVICE_NAMES: Record<string, string> = {
  'TSRGEAU-CIU5PH4-TVM2KAE-RIDGVPC-VJZVNRZ-QHUKD2R-JHLCNQB-A3VJMQU': 'warsaw',
  'UD6TZSA-O7E7I5U-TWYGMQD-FDWXMZK-WHIP64M-ND72I2T-5XCWFYR-FYKAGA4': 'florida',
  'W2RCJNY-VZLN6OT-76O5NDU-BKWKI2H-2MUMGAF-QET6GMV-53HI7HU-EE5TLAE': 'rf-proxy'
};

export function ServerStatus({ connections, status, allServers }: ServerStatusProps) {
  const devices = connections || {};
  const uptime = status?.uptime || 0;

  const allDevices = status?.myID ? {
    ...devices,
    [status.myID]: {
      connected: true,
      address: 'local',
      at: new Date(Date.now() - uptime * 1000).toISOString()
    }
  } : devices;

  if (!Object.keys(allDevices).length) {
    return (
      <div className="glass-panel rounded-lg p-4">
        <p className="text-gray-400">Загрузка статуса...</p>
      </div>
    );
  }

  const handleDeviceClick = (deviceID: string) => {
    const serverData = allServers?.[deviceID === status?.myID ? 'warsaw' : 
                                    DEVICE_NAMES[deviceID]];
    const info = [
      `Device: ${deviceID}`,
      `Memory: ${serverData ? (serverData.alloc / 1024 / 1024).toFixed(1) + ' MB' : 'N/A'}`,
      `Goroutines: ${serverData?.goroutines || 'N/A'}`
    ].join('\n');
    alert(info);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-mono text-emerald">Сервера</h2>
        <span className="text-xs text-gray-400 flex items-center gap-1">
          <Clock size={12} /> Uptime: {Math.floor(uptime / 3600)}h {Math.floor((uptime % 3600) / 60)}m
        </span>
      </div>
      {Object.entries(allDevices).map(([deviceID, conn]: [string, any]) => {
        const name = DEVICE_NAMES[deviceID] || deviceID.substring(0, 8);
        const online = conn.connected;
        const contactTime = conn.at ? new Date(conn.at).toLocaleTimeString() : 'N/A';
        const serverData = allServers?.[name as keyof typeof allServers];
        
        return (
          <div 
            key={deviceID} 
            className="glass-panel rounded-lg p-3 cursor-pointer hover:bg-white/10 transition"
            onClick={() => handleDeviceClick(deviceID)}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-sm">{name}</span>
              <div className="flex items-center gap-2">
                {online ? (
                  <Wifi size={16} className="text-success" />
                ) : (
                  <WifiOff size={16} className="text-warning" />
                )}
                <span className={`text-xs ${online ? 'text-success' : 'text-warning'}`}>
                  {online ? 'online' : 'offline'}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="text-gray-400">
                <Activity size={12} className="inline mr-1" />
                {contactTime}
              </div>
              <div className="text-gray-400">
                Mem: {serverData ? (serverData.alloc / 1024 / 1024).toFixed(1) + 'MB' : 'N/A'}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}