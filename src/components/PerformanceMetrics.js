import React from 'react';
import { Activity, Zap, Gauge } from 'lucide-react';

const PerformanceMetrics = ({ data }) => {
  if (!data) return null;

  const CPUCore = ({ index, usage }) => (
    <div className="bg-gray-800 border-2 border-cyan-400 rounded-lg p-3 shadow-lg shadow-cyan-400/10">
      <div className="flex justify-between items-center mb-2">
        <span className="font-mono text-cyan-400 text-xs font-bold">CORE-{index.toString().padStart(2, '0')}</span>
        <span className="font-mono text-white text-xs font-bold">{usage.toFixed(1)}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${
            usage > 80 ? 'bg-gradient-to-r from-red-400 to-orange-500' :
            usage > 60 ? 'bg-gradient-to-r from-yellow-400 to-orange-400' :
            'bg-gradient-to-r from-cyan-400 to-blue-500'
          }`}
          style={{ width: `${usage}%` }}
        ></div>
      </div>
    </div>
  );

  const memoryUsagePercent = (data.memory.used / data.memory.total) * 100;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-mono font-bold text-cyan-400 mb-4 tracking-wider text-glow-cyan neon-pulse">TELEMETRY ANALYSIS</h2>
      
      {/* Memory Usage */}
      <div className="border-2 border-cyan-400 bg-gray-800 bg-opacity-30 rounded-lg p-4 border-glow">
        <div className="flex items-center space-x-3 mb-4">
          <Activity className="w-5 h-5 text-cyan-400" />
          <h3 className="font-mono text-cyan-400 font-bold tracking-wider text-sm text-shadow-glow">MEMORY SUBSYSTEM STATUS</h3>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="font-mono text-white text-sm font-bold">ACTIVE MEMORY</span>
            <span className="font-mono text-cyan-400 font-bold">{memoryUsagePercent.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
            <div
              className={`h-4 rounded-full transition-all duration-1000 ${
                memoryUsagePercent > 80 ? 'bg-gradient-to-r from-red-500 to-orange-500' :
                memoryUsagePercent > 60 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                'bg-gradient-to-r from-cyan-400 to-blue-500'
              }`}
              style={{ width: `${memoryUsagePercent}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-xs font-mono text-gray-400">
            <span>USED: {data.memory.used.toFixed(1)}GB</span>
            <span>TOTAL: {data.memory.total}GB</span>
          </div>
        </div>
      </div>

      {/* CPU Cores */}
      <div className="border-2 border-cyan-400 bg-gray-800 bg-opacity-30 rounded-lg p-4 border-glow">
        <div className="flex items-center space-x-3 mb-4">
          <Zap className="w-5 h-5 text-cyan-400" />
          <h3 className="font-mono text-cyan-400 font-bold tracking-wider text-sm text-shadow-glow">PROCESSOR CORE UTILIZATION</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.cpu.usage.map((usage, index) => (
            <CPUCore key={index} index={index} usage={usage} />
          ))}
        </div>
      </div>

      {/* System Performance Summary */}
      <div className="border-2 border-cyan-400 bg-gray-800 bg-opacity-30 rounded-lg p-4 border-glow">
        <div className="flex items-center space-x-3 mb-4">
          <Gauge className="w-5 h-5 text-cyan-400" />
          <h3 className="font-mono text-cyan-400 font-bold tracking-wider text-sm text-shadow-glow">OPERATIONAL STATUS</h3>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-xl font-mono font-bold text-green-400 mb-1">OPTIMAL</div>
            <div className="text-xs font-mono text-gray-400">PERFORMANCE</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-mono font-bold text-cyan-400 mb-1">STABLE</div>
            <div className="text-xs font-mono text-gray-400">THERMAL</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-mono font-bold text-blue-400 mb-1">NOMINAL</div>
            <div className="text-xs font-mono text-gray-400">VOLTAGE</div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-center">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="font-mono text-xs text-green-400 font-bold tracking-wider">ALL SUBSYSTEMS OPERATIONAL</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
