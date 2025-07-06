import React, { useState, useEffect } from 'react';
import { Shield, Lock, Unlock, AlertTriangle, Eye, Settings } from 'lucide-react';
import { SecurityStatus } from '../App';

interface VaultInterfaceProps {
  securityStatus: SecurityStatus;
  onVaultToggle: () => void;
  onEmergencyLockdown: () => void;
}

const VaultInterface: React.FC<VaultInterfaceProps> = ({ 
  securityStatus, 
  onVaultToggle, 
  onEmergencyLockdown 
}) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleVaultToggle = async () => {
    setIsOpening(true);
    setTimeout(() => {
      onVaultToggle();
      setIsOpening(false);
    }, 2000);
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <Shield className="h-8 w-8 text-blue-400" />
          <h2 className="text-2xl font-bold text-white">Vault Control</h2>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            securityStatus.threatLevel === 'low' ? 'bg-green-400' :
            securityStatus.threatLevel === 'medium' ? 'bg-yellow-400' :
            'bg-red-400'
          } animate-pulse`} />
          <span className="text-sm text-slate-300 capitalize">
            {securityStatus.threatLevel} Threat Level
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="relative">
            <div className={`w-48 h-48 mx-auto rounded-full border-8 transition-all duration-2000 ${
              securityStatus.vaultLocked 
                ? 'border-red-400 bg-red-500/20' 
                : 'border-green-400 bg-green-500/20'
            } ${isOpening ? 'animate-pulse' : ''}`}>
              <div className="flex items-center justify-center h-full">
                {isOpening ? (
                  <div className="animate-spin">
                    <Settings className="h-16 w-16 text-blue-400" />
                  </div>
                ) : securityStatus.vaultLocked ? (
                  <Lock className="h-16 w-16 text-red-400" />
                ) : (
                  <Unlock className="h-16 w-16 text-green-400" />
                )}
              </div>
            </div>
            
            <div className="absolute inset-0 rounded-full">
              <div className={`w-full h-full rounded-full border-2 border-dashed transition-all duration-1000 ${
                securityStatus.vaultLocked ? 'border-red-300/30' : 'border-green-300/30'
              } animate-spin-slow`} />
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg font-semibold text-white mb-2">
              Vault Status: {securityStatus.vaultLocked ? 'SECURED' : 'ACCESSIBLE'}
            </p>
            <p className="text-sm text-slate-400">
              Access Level: {securityStatus.accessLevel.toUpperCase()}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleVaultToggle}
            disabled={isOpening}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 ${
              securityStatus.vaultLocked
                ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
            } focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105`}
          >
            {isOpening ? (
              <span className="flex items-center justify-center space-x-2">
                <Settings className="h-5 w-5 animate-spin" />
                <span>Processing...</span>
              </span>
            ) : securityStatus.vaultLocked ? (
              <span className="flex items-center justify-center space-x-2">
                <Unlock className="h-5 w-5" />
                <span>Unlock Vault</span>
              </span>
            ) : (
              <span className="flex items-center justify-center space-x-2">
                <Lock className="h-5 w-5" />
                <span>Lock Vault</span>
              </span>
            )}
          </button>

          <button
            onClick={onEmergencyLockdown}
            className="w-full py-4 px-6 rounded-xl font-semibold text-white bg-red-700 hover:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-300 transform hover:scale-105"
          >
            <span className="flex items-center justify-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>Emergency Lockdown</span>
            </span>
          </button>

          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600/50">
            <div className="flex items-center space-x-2 mb-3">
              <Eye className="h-5 w-5 text-blue-400" />
              <span className="text-sm font-medium text-white">Security Metrics</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Active Sessions:</span>
                <span className="text-white font-medium">{securityStatus.activeSessions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Last Access:</span>
                <span className="text-white font-medium">
                  {securityStatus.lastAccess.toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultInterface;