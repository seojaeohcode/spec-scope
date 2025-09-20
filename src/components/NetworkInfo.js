import React from 'react';
import { Wifi, Globe, Download } from 'lucide-react';

const NetworkInfo = ({ data }) => {
  if (!data) return null;

  const getConnectionQuality = (type) => {
    switch (type) {
      case '4g':
        return { quality: 'EXCELLENT', color: 'text-green-400', signal: 5 };
      case '3g':
        return { quality: 'GOOD', color: 'text-yellow-400', signal: 3 };
      case '2g':
        return { quality: 'POOR', color: 'text-red-400', signal: 1 };
      default:
        return { quality: 'UNKNOWN', color: 'text-gray-400', signal: 0 };
    }
  };

  const connection = getConnectionQuality(data.network.type);
  const signalBars = Array.from({ length: 5 }, (_, i) => i < connection.signal);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-mono font-bold text-cyan-400 mb-4 tracking-wider text-glow-cyan neon-pulse">NETWORK DIAGNOSTICS</h2>
      
      {/* Connection Status */}
      <div className="border-2 border-cyan-400 bg-gray-800 bg-opacity-30 rounded-lg p-4 border-glow">
        <div className="flex items-center space-x-3 mb-4">
          <Wifi className="w-5 h-5 text-cyan-400" />
          <h3 className="font-mono text-cyan-400 font-bold tracking-wider text-sm text-shadow-glow">NETWORK INTERFACE STATUS</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-mono text-gray-400 text-xs">CONNECTION TYPE:</span>
            <span className="font-mono text-white uppercase font-bold text-xs">{data.network.effectiveType || 'UNKNOWN'}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="font-mono text-gray-400 text-xs">SIGNAL QUALITY:</span>
            <span className={`font-mono font-bold text-xs ${connection.color}`}>{connection.quality}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="font-mono text-gray-400 text-xs">SIGNAL STRENGTH:</span>
            <div className="flex space-x-1">
              {signalBars.map((active, index) => (
                <div
                  key={index}
                  className={`w-2 h-4 rounded ${
                    active ? 'bg-cyan-400' : 'bg-gray-600'
                  }`}
                  style={{ height: `${(index + 1) * 4 + 8}px` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Network Performance */}
      <div className="border-2 border-cyan-400 bg-gray-800 bg-opacity-30 rounded-lg p-4 border-glow">
        <div className="flex items-center space-x-3 mb-4">
          <Download className="w-5 h-5 text-cyan-400" />
          <h3 className="font-mono text-cyan-400 font-bold tracking-wider text-sm text-shadow-glow">BANDWIDTH ANALYSIS</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-mono text-gray-400 text-xs">DOWNLINK CAPACITY:</span>
            <span className="font-mono text-white font-bold text-xs">{data.network.downlink || 'N/A'} Mbps</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="font-mono text-gray-400 text-xs">ROUND TRIP TIME:</span>
            <span className="font-mono text-white font-bold text-xs">{data.network.rtt || 'N/A'} ms</span>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between mb-2">
              <span className="font-mono text-gray-400 text-xs">LATENCY STATUS</span>
              <span className="font-mono text-cyan-400 font-bold text-xs">
                {data.network.rtt < 50 ? 'EXCELLENT' : 
                 data.network.rtt < 100 ? 'GOOD' : 
                 data.network.rtt < 200 ? 'FAIR' : 'POOR'}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  data.network.rtt < 50 ? 'bg-green-400' :
                  data.network.rtt < 100 ? 'bg-yellow-400' :
                  data.network.rtt < 200 ? 'bg-orange-400' : 'bg-red-400'
                }`}
                style={{ width: `${Math.min(100, (200 - data.network.rtt) / 2)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Browser Capabilities */}
      <div className="border-2 border-cyan-400 bg-gray-800 bg-opacity-30 rounded-lg p-4 border-glow">
        <div className="flex items-center space-x-3 mb-4">
          <Globe className="w-5 h-5 text-cyan-400" />
          <h3 className="font-mono text-cyan-400 font-bold tracking-wider text-sm text-shadow-glow">RUNTIME CAPABILITIES</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className={`text-lg font-mono font-bold ${
              'serviceWorker' in navigator ? 'text-green-400' : 'text-red-400'
            } mb-1`}>
              {('serviceWorker' in navigator) ? 'ENABLED' : 'DISABLED'}
            </div>
            <div className="text-xs font-mono text-gray-400">SERVICE WORKERS</div>
          </div>
          
          <div className="text-center">
            <div className={`text-lg font-mono font-bold ${
              'geolocation' in navigator ? 'text-green-400' : 'text-red-400'
            } mb-1`}>
              {('geolocation' in navigator) ? 'ENABLED' : 'DISABLED'}
            </div>
            <div className="text-xs font-mono text-gray-400">GEOLOCATION</div>
          </div>
          
          <div className="text-center">
            <div className={`text-lg font-mono font-bold ${
              'localStorage' in window ? 'text-green-400' : 'text-red-400'
            } mb-1`}>
              {('localStorage' in window) ? 'ENABLED' : 'DISABLED'}
            </div>
            <div className="text-xs font-mono text-gray-400">LOCAL STORAGE</div>
          </div>
          
          <div className="text-center">
            <div className={`text-lg font-mono font-bold ${
              'WebSocket' in window ? 'text-green-400' : 'text-red-400'
            } mb-1`}>
              {('WebSocket' in window) ? 'ENABLED' : 'DISABLED'}
            </div>
            <div className="text-xs font-mono text-gray-400">WEBSOCKETS</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkInfo;
