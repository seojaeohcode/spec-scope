import React from 'react';
import { Monitor, Cpu, HardDrive, Smartphone } from 'lucide-react';

const SystemInfo = ({ data }) => {
  if (!data) return null;

  const InfoCard = ({ icon, title, value, subvalue }) => (
    <div className="border-2 border-cyan-400 bg-gray-800 bg-opacity-30 rounded-lg p-4 hover:bg-opacity-50 transition-all duration-300 border-glow hover:border-glow-strong">
      <div className="flex items-center space-x-3 mb-2">
        {icon}
        <h3 className="font-mono text-cyan-400 font-bold text-sm tracking-wider text-shadow-glow">{title}</h3>
      </div>
      <p className="font-mono text-white text-lg font-bold text-shadow-glow">{value}</p>
      {subvalue && <p className="font-mono text-gray-400 text-xs text-shadow-glow">{subvalue}</p>}
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-mono font-bold text-cyan-400 mb-4 tracking-wider text-glow-cyan neon-pulse">HARDWARE CONFIGURATION</h2>
      
      <div className="space-y-4">
        <InfoCard
          icon={<Cpu className="w-5 h-5 text-cyan-400" />}
          title="CENTRAL PROCESSING UNIT"
          value={`${data.cpu.cores}C/${data.cpu.cores * 2}T @ ${data.cpu.frequency.toFixed(1)}GHz`}
          subvalue={`Temperature: ${data.cpu.temperature.toFixed(1)}°C | Utilization: ${(data.cpu.usage.reduce((a, b) => a + b, 0) / data.cpu.cores).toFixed(1)}%`}
        />

        <InfoCard
          icon={<HardDrive className="w-5 h-5 text-cyan-400" />}
          title="SYSTEM MEMORY MODULE"
          value={`${data.memory.total}GB DDR4-3200`}
          subvalue={`Active: ${data.memory.used.toFixed(1)}GB | Available: ${data.memory.available.toFixed(1)}GB | Pressure: ${(data.memory.pressure * 100).toFixed(1)}%`}
        />

        <InfoCard
          icon={<Monitor className="w-5 h-5 text-cyan-400" />}
          title="DISPLAY SUBSYSTEM"
          value={`${data.screen.width}×${data.screen.height}@${data.screen.refreshRate}Hz`}
          subvalue={`Color Depth: ${data.screen.colorDepth}-bit | Aspect Ratio: ${(data.screen.width/data.screen.height).toFixed(2)}:1`}
        />

        <InfoCard
          icon={<Smartphone className="w-5 h-5 text-cyan-400" />}
          title="GRAPHICS PROCESSING UNIT"
          value={`${data.gpu.vendor} ${data.gpu.memory}GB VRAM`}
          subvalue={data.gpu.renderer.length > 45 ? 
            data.gpu.renderer.substring(0, 45) + '...' : 
            data.gpu.renderer}
        />

        <div className="border-2 border-cyan-400 bg-gray-800 bg-opacity-30 rounded-lg p-4 shadow-lg shadow-cyan-400/10">
          <h3 className="font-mono text-cyan-400 font-bold mb-3 tracking-wider text-sm">RUNTIME ENVIRONMENT</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-mono text-gray-400 text-xs">ENGINE:</span>
              <span className="font-mono text-white text-xs font-bold">{data.browser.engine}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-mono text-gray-400 text-xs">BROWSER:</span>
              <span className="font-mono text-white text-xs font-bold">{data.browser.name} v{data.browser.version}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-mono text-gray-400 text-xs">PLATFORM:</span>
              <span className="font-mono text-white text-xs font-bold">{navigator.platform}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-mono text-gray-400 text-xs">LOCALE:</span>
              <span className="font-mono text-white text-xs font-bold">{navigator.language.toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-mono text-gray-400 text-xs">UPTIME:</span>
              <span className="font-mono text-white text-xs font-bold">{Math.floor(data.system.uptime / 1000)}s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemInfo;
