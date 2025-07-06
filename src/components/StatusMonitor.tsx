import React from 'react';
import { Activity, Thermometer, Zap, Wifi, HardDrive, Cpu } from 'lucide-react';
import { SecurityStatus } from '../App';

interface StatusMonitorProps {
  securityStatus: SecurityStatus;
}

const StatusMonitor: React.FC<StatusMonitorProps> = ({ securityStatus }) => {
  const systemMetrics = [
    { 
      icon: Cpu, 
      label: 'CPU Usage', 
      value: '23%', 
      status: 'optimal',
      color: 'text-green-400' 
    },
    { 
      icon: HardDrive, 
      label: 'Storage', 
      value: '67%', 
      status: 'normal',
      color: 'text-blue-400' 
    },
    { 
      icon: Thermometer, 
      label: 'Temperature', 
      value: '72°F', 
      status: 'optimal',
      color: 'text-green-400' 
    },
    { 
      icon: Wifi, 
      label: 'Network', 
      value: '99.9%', 
      status: 'excellent',
      color: 'text-green-400' 
    },
    { 
      icon: Zap, 
      label: 'Power', 
      value: '100%', 
      status: 'stable',
      color: 'text-green-400' 
    },
    { 
      icon: Activity, 
      label: 'System Health', 
      value: '98%', 
      status: 'excellent',
      color: 'text-green-400' 
    }
  ];

  const securityChecks = [
    { name: 'Perimeter Sensors', status: 'active', lastCheck: '2 min ago' },
    { name: 'Motion Detection', status: 'active', lastCheck: '1 min ago' },
    { name: 'Access Controls', status: 'operational', lastCheck: '30 sec ago' },
    { name: 'Backup Systems', status: 'standby', lastCheck: '5 min ago' },
    { name: 'Communication Links', status: 'secure', lastCheck: '15 sec ago' },
    { name: 'Environmental Controls', status: 'nominal', lastCheck: '3 min ago' }
  ];

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
        <Activity className="h-7 w-7 text-blue-400" />
        <span>System Status Monitor</span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Metrics */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">System Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            {systemMetrics.map((metric, index) => (
              <div 
                key={index}
                className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50"
              >
                <div className="flex items-center justify-between mb-2">
                  <metric.icon className={`h-5 w-5 ${metric.color}`} />
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    metric.status === 'optimal' || metric.status === 'excellent' 
                      ? 'bg-green-900/50 text-green-300'
                      : metric.status === 'normal' || metric.status === 'stable'
                      ? 'bg-blue-900/50 text-blue-300'
                      : 'bg-yellow-900/50 text-yellow-300'
                  }`}>
                    {metric.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-1">{metric.label}</p>
                <p className="text-lg font-bold text-white">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Security Checks */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Security Systems</h3>
          <div className="space-y-3">
            {securityChecks.map((check, index) => (
              <div 
                key={index}
                className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/50 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-white">{check.name}</p>
                  <p className="text-xs text-slate-400">{check.lastCheck}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    check.status === 'active' || check.status === 'operational' || check.status === 'secure'
                      ? 'bg-green-400'
                      : check.status === 'standby' || check.status === 'nominal'
                      ? 'bg-blue-400'
                      : 'bg-yellow-400'
                  } animate-pulse`} />
                  <span className={`text-xs font-medium capitalize ${
                    check.status === 'active' || check.status === 'operational' || check.status === 'secure'
                      ? 'text-green-300'
                      : check.status === 'standby' || check.status === 'nominal'
                      ? 'text-blue-300'
                      : 'text-yellow-300'
                  }`}>
                    {check.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overall Status Bar */}
      <div className="mt-6 p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-white">Overall Security Status</span>
          <span className={`text-sm font-bold ${
            securityStatus.threatLevel === 'low' 
              ? 'text-green-400' 
              : securityStatus.threatLevel === 'medium' 
              ? 'text-yellow-400' 
              : 'text-red-400'
          }`}>
            {securityStatus.threatLevel === 'low' ? 'SECURE' : 
             securityStatus.threatLevel === 'medium' ? 'CAUTION' : 'ALERT'}
          </span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${
              securityStatus.threatLevel === 'low' 
                ? 'w-full bg-green-400' 
                : securityStatus.threatLevel === 'medium' 
                ? 'w-2/3 bg-yellow-400' 
                : 'w-1/3 bg-red-400'
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default StatusMonitor;