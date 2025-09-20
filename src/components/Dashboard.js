import React, { useState, useEffect } from 'react';
import SystemInfo from './SystemInfo';
import PerformanceMetrics from './PerformanceMetrics';
import NetworkInfo from './NetworkInfo';
import ExportControls from './ExportControls';
import { Monitor, Cpu, HardDrive, Wifi } from 'lucide-react';

const Dashboard = () => {
  const [systemData, setSystemData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const initializeSystem = async () => {
      try {
        const data = await gatherSystemInfo();
        setSystemData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to gather system info:', error);
        setIsLoading(false);
      }
    };

    initializeSystem();

    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Update system metrics every 2 seconds
    const metricsInterval = setInterval(async () => {
      if (!isLoading) {
        try {
          const data = await gatherSystemInfo();
          setSystemData(data);
        } catch (error) {
          console.error('Failed to update system info:', error);
        }
      }
    }, 2000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(metricsInterval);
    };
  }, [isLoading]);

  const gatherSystemInfo = async () => {
    // CPU Information
    const cpuCores = navigator.hardwareConcurrency || 4;
    const cpuUsage = Array.from({ length: cpuCores }, () => Math.random() * 100);
    const cpuTemp = 35 + Math.random() * 30; // Simulated temperature 35-65°C
    const cpuFreq = 2.4 + Math.random() * 1.6; // Simulated frequency 2.4-4.0 GHz

    // Memory Information
    const deviceMemory = navigator.deviceMemory || 8;
    const memoryUsed = Math.random() * deviceMemory;
    const memoryPressure = memoryUsed / deviceMemory;
    
    // GPU Information
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    const debugInfo = gl ? gl.getExtension('WEBGL_debug_renderer_info') : null;
    const vendor = debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : 'Unknown';
    const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'Unknown';
    const gpuMemory = Math.floor(Math.random() * 8 + 2); // Simulated GPU memory 2-10GB

    // Screen Information
    const screen = {
      width: window.screen.width,
      height: window.screen.height,
      colorDepth: window.screen.colorDepth,
      refreshRate: window.screen.refreshRate || 60,
    };

    // Browser Information
    const userAgent = navigator.userAgent;
    let browserName = 'Unknown';
    let browserVersion = 'Unknown';
    let browserEngine = 'Unknown';

    if (userAgent.includes('Chrome')) {
      browserName = 'Chrome';
      browserVersion = userAgent.match(/Chrome\/([0-9.]+)/)?.[1] || 'Unknown';
      browserEngine = 'Blink';
    } else if (userAgent.includes('Firefox')) {
      browserName = 'Firefox';
      browserVersion = userAgent.match(/Firefox\/([0-9.]+)/)?.[1] || 'Unknown';
      browserEngine = 'Gecko';
    } else if (userAgent.includes('Safari')) {
      browserName = 'Safari';
      browserVersion = userAgent.match(/Version\/([0-9.]+)/)?.[1] || 'Unknown';
      browserEngine = 'WebKit';
    }

    // Network Information
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const networkInfo = {
      type: connection?.effectiveType || 'unknown',
      downlink: connection?.downlink || 0,
      rtt: connection?.rtt || 0,
      effectiveType: connection?.effectiveType || 'unknown',
    };

    // System Information
    const systemInfo = {
      uptime: performance.now(),
      timestamp: Date.now(),
      sessionId: Math.random().toString(36).substring(2, 15),
    };

    return {
      cpu: {
        cores: cpuCores,
        usage: cpuUsage,
        temperature: cpuTemp,
        frequency: cpuFreq,
      },
      memory: {
        total: deviceMemory,
        used: memoryUsed,
        available: deviceMemory - memoryUsed,
        pressure: memoryPressure,
      },
      gpu: {
        vendor: vendor,
        renderer: renderer,
        memory: gpuMemory,
      },
      screen,
      browser: {
        name: browserName,
        version: browserVersion,
        userAgent,
        engine: browserEngine,
      },
      network: networkInfo,
      system: systemInfo,
    };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 bg-grid flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-20 h-20 border-4 border-cyan-400 border-t-transparent rounded-full mx-auto mb-6 shadow-lg shadow-cyan-400/50"></div>
          <p className="text-cyan-400 text-2xl font-mono font-bold tracking-wider text-shadow-glow">INITIALIZING DIAGNOSTIC PROTOCOLS...</p>
          <p className="text-gray-400 text-sm font-mono mt-2">SCANNING HARDWARE SUBSYSTEMS</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 bg-grid-glow text-white p-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-mono font-bold text-cyan-400 mb-2 text-glow-cyan neon-pulse">
              ENGINEERING WORKSTATION DIAGNOSTICS
            </h1>
            <p className="text-gray-400 font-mono text-shadow-glow">ADVANCED HARDWARE TELEMETRY SYSTEM v2.1.0</p>
          </div>
          <div className="text-right">
            <p className="text-cyan-400 font-mono text-xl font-bold text-glow-cyan neon-flicker">
              {currentTime.toLocaleTimeString('en-US', { hour12: false })}
            </p>
            <p className="text-gray-400 font-mono text-sm text-shadow-glow">
              {currentTime.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: '2-digit', 
                day: '2-digit' 
              })}
            </p>
            <p className="text-gray-500 font-mono text-xs text-shadow-glow">
              SESSION: {systemData?.system.sessionId.toUpperCase()}
            </p>
          </div>
        </div>
        
        {/* Status Bar */}
        <div className="border-2 border-cyan-400 bg-gray-800 bg-opacity-50 rounded-lg p-4 border-glow-strong glow-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse text-glow-green"></div>
                <span className="font-mono text-sm font-bold text-glow-green">SYSTEM NOMINAL</span>
              </div>
              <div className="flex items-center space-x-2">
                <Monitor className="w-4 h-4 text-cyan-400" />
                <span className="font-mono text-sm text-shadow-glow">{systemData?.screen.width}x{systemData?.screen.height}@{systemData?.screen.refreshRate}Hz</span>
              </div>
              <div className="flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span className="font-mono text-sm text-shadow-glow">{systemData?.cpu.cores}C/{systemData?.cpu.cores * 2}T @ {systemData?.cpu.frequency.toFixed(1)}GHz</span>
              </div>
              <div className="flex items-center space-x-2">
                <HardDrive className="w-4 h-4 text-cyan-400" />
                <span className="font-mono text-sm text-shadow-glow">{systemData?.memory.total}GB DDR4</span>
              </div>
              <div className="flex items-center space-x-2">
                <Wifi className="w-4 h-4 text-cyan-400" />
                <span className="font-mono text-sm text-shadow-glow">{systemData?.network.effectiveType.toUpperCase()}</span>
              </div>
            </div>
            <ExportControls />
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Information */}
        <div className="lg:col-span-1">
          <SystemInfo data={systemData} />
        </div>

        {/* Performance Metrics */}
        <div className="lg:col-span-1">
          <PerformanceMetrics data={systemData} />
        </div>

        {/* Network Information */}
        <div className="lg:col-span-1">
          <NetworkInfo data={systemData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
