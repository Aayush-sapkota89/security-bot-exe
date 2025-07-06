import React from 'react';
import { Clock, User, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface AccessLog {
  id: string;
  timestamp: Date;
  action: string;
  user: string;
  status: string;
}

interface AccessLogsProps {
  logs: AccessLog[];
}

const AccessLogs: React.FC<AccessLogsProps> = ({ logs }) => {
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'failed':
      case 'denied':
        return <XCircle className="h-4 w-4 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      default:
        return <CheckCircle className="h-4 w-4 text-blue-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'success':
      case 'complete':
        return 'text-green-300 bg-green-900/30 border-green-700/50';
      case 'failed':
      case 'denied':
        return 'text-red-300 bg-red-900/30 border-red-700/50';
      case 'warning':
        return 'text-yellow-300 bg-yellow-900/30 border-yellow-700/50';
      default:
        return 'text-blue-300 bg-blue-900/30 border-blue-700/50';
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Clock className="h-7 w-7 text-blue-400" />
        <h3 className="text-xl font-bold text-white">Access Logs</h3>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {logs.map((log) => (
          <div 
            key={log.id}
            className={`p-4 rounded-lg border transition-all duration-200 hover:scale-[1.02] ${getStatusColor(log.status)}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                {getStatusIcon(log.status)}
                <h4 className="font-medium text-white text-sm">{log.action}</h4>
              </div>
              <span className="text-xs text-slate-400">
                {log.timestamp.toLocaleTimeString()}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <User className="h-3 w-3 text-slate-400" />
                <span className="text-xs text-slate-300">{log.user}</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                log.status.toLowerCase() === 'success' || log.status.toLowerCase() === 'complete'
                  ? 'bg-green-800/50 text-green-200'
                  : log.status.toLowerCase() === 'failed' || log.status.toLowerCase() === 'denied'
                  ? 'bg-red-800/50 text-red-200'
                  : log.status.toLowerCase() === 'activated'
                  ? 'bg-orange-800/50 text-orange-200'
                  : 'bg-blue-800/50 text-blue-200'
              }`}>
                {log.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-700/50">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Total Entries: {logs.length}</span>
          <span className="text-slate-400">
            Last Updated: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AccessLogs;