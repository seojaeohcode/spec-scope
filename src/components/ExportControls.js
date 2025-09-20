import React, { useState } from 'react';
import { Camera, Download, Share2, FileText } from 'lucide-react';

const ExportControls = () => {
  const [isExporting, setIsExporting] = useState(false);

  const exportFullSnapshot = async () => {
    setIsExporting(true);
    
    try {
      // Use html2canvas to capture the entire dashboard
      const html2canvas = (await import('html2canvas')).default;
      const dashboardElement = document.querySelector('#root');
      
      if (dashboardElement) {
        const canvas = await html2canvas(dashboardElement, {
          backgroundColor: '#111827',
          scale: 2,
          useCORS: true,
          allowTaint: true,
          width: dashboardElement.scrollWidth,
          height: dashboardElement.scrollHeight,
        });
        
        // Convert to blob and download
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            a.href = url;
            a.download = `engineering-workstation-diagnostics-${timestamp}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }
        }, 'image/png', 1.0);
      }
    } catch (error) {
      console.error('Export failed:', error);
      alert('스냅샷 생성에 실패했습니다. 브라우저 보안 설정을 확인해주세요.');
    }
    
    setTimeout(() => setIsExporting(false), 2000);
  };

  const exportSystemReport = async () => {
    try {
      const jsPDF = (await import('jspdf')).default;
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(20);
      doc.text('ENGINEERING WORKSTATION DIAGNOSTICS', 20, 30);
      
      // Add timestamp (Korean locale)
      doc.setFontSize(12);
      const timestamp = new Date().toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      doc.text(`Generated: ${timestamp}`, 20, 45);
      
      // Add system information
      doc.setFontSize(14);
      doc.text('SYSTEM SPECIFICATIONS:', 20, 65);
      
      doc.setFontSize(10);
      
      // Parse browser info for better formatting
      const userAgent = navigator.userAgent;
      let browserName = 'Unknown';
      let browserVersion = 'Unknown';
      
      if (userAgent.includes('Chrome')) {
        browserName = 'Chrome';
        browserVersion = userAgent.match(/Chrome\/([0-9.]+)/)?.[1] || 'Unknown';
      } else if (userAgent.includes('Firefox')) {
        browserName = 'Firefox';
        browserVersion = userAgent.match(/Firefox\/([0-9.]+)/)?.[1] || 'Unknown';
      } else if (userAgent.includes('Safari')) {
        browserName = 'Safari';
        browserVersion = userAgent.match(/Version\/([0-9.]+)/)?.[1] || 'Unknown';
      } else if (userAgent.includes('Edg')) {
        browserName = 'Edge';
        browserVersion = userAgent.match(/Edg\/([0-9.]+)/)?.[1] || 'Unknown';
      }
      
      const specs = [
        `CPU Cores: ${navigator.hardwareConcurrency || 'Unknown'}`,
        `Screen Resolution: ${window.screen.width}x${window.screen.height}`,
        `Color Depth: ${window.screen.colorDepth}-bit`,
        `Browser: ${browserName} ${browserVersion}`,
        `Platform: ${navigator.platform}`,
        `Language: ${navigator.language}`,
        `Online Status: ${navigator.onLine ? 'Connected' : 'Offline'}`,
        `Cookies Enabled: ${navigator.cookieEnabled ? 'Yes' : 'No'}`,
      ];
      
      specs.forEach((spec, index) => {
        doc.text(spec, 20, 80 + (index * 10));
      });
      
      // Add additional system info
      doc.setFontSize(14);
      doc.text('DETAILED INFORMATION:', 20, 170);
      
      doc.setFontSize(10);
      const detailedSpecs = [
        `User Agent: ${userAgent}`,
        `Memory: ${navigator.deviceMemory || 'Unknown'}GB`,
        `Cores: ${navigator.hardwareConcurrency || 'Unknown'}`,
        `Touch Support: ${navigator.maxTouchPoints > 0 ? 'Yes' : 'No'}`,
        `Do Not Track: ${navigator.doNotTrack || 'Unknown'}`,
      ];
      
      detailedSpecs.forEach((spec, index) => {
        // Split long lines
        const lines = doc.splitTextToSize(spec, 170);
        lines.forEach((line, lineIndex) => {
          doc.text(line, 20, 185 + (index * 10) + (lineIndex * 5));
        });
      });
      
      // Save the PDF
      doc.save(`system-diagnostics-report-${Date.now()}.pdf`);
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('PDF 리포트 생성에 실패했습니다.');
    }
  };
  
  const shareSnapshot = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Engineering Workstation Diagnostics',
          text: `System Specs: ${window.screen.width}x${window.screen.height} display, ${navigator.hardwareConcurrency || 'Unknown'} CPU cores, ${navigator.platform}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Share failed:', error);
      }
    } else {
      // Fallback: copy to clipboard
      const specs = `Engineering Workstation Diagnostics\nSystem Specs: ${window.screen.width}x${window.screen.height} display, ${navigator.hardwareConcurrency || 'Unknown'} CPU cores, ${navigator.platform}`;
      navigator.clipboard.writeText(specs);
      alert('시스템 사양이 클립보드에 복사되었습니다!');
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={exportFullSnapshot}
        disabled={isExporting}
        className="flex items-center space-x-2 px-4 py-2 border-2 border-cyan-400 text-cyan-400 font-mono text-xs font-bold rounded-lg hover:bg-cyan-400 hover:text-gray-900 transition-all duration-300 disabled:opacity-50 shadow-lg shadow-cyan-400/20"
      >
        {isExporting ? (
          <>
            <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full"></div>
            <span>CAPTURING...</span>
          </>
        ) : (
          <>
            <Camera className="w-4 h-4" />
            <span>FULL CAPTURE</span>
          </>
        )}
      </button>
      
      <button
        onClick={exportSystemReport}
        className="flex items-center space-x-2 px-4 py-2 border-2 border-cyan-400 text-cyan-400 font-mono text-xs font-bold rounded-lg hover:bg-cyan-400 hover:text-gray-900 transition-all duration-300 shadow-lg shadow-cyan-400/20"
      >
        <FileText className="w-4 h-4" />
        <span>PDF REPORT</span>
      </button>
      
      <button
        onClick={shareSnapshot}
        className="flex items-center space-x-2 px-4 py-2 border-2 border-cyan-400 text-cyan-400 font-mono text-xs font-bold rounded-lg hover:bg-cyan-400 hover:text-gray-900 transition-all duration-300 shadow-lg shadow-cyan-400/20"
      >
        <Share2 className="w-4 h-4" />
        <span>TRANSMIT</span>
      </button>
    </div>
  );
};

export default ExportControls;
