import React, { useState, useEffect } from 'react';
import VaultInterface from './components/VaultInterface';
import SecurityBot from './components/SecurityBot';
import AuthenticationPanel from './components/AuthenticationPanel';
import StatusMonitor from './components/StatusMonitor';
import AccessLogs from './components/AccessLogs';

export interface SecurityStatus {
  vaultLocked: boolean;
  accessLevel: 'none' | 'limited' | 'full';
  threatLevel: 'low' | 'medium' | 'high';
  lastAccess: Date;
  activeSessions: number;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [securityStatus, setSecurityStatus] = useState<SecurityStatus>({
    vaultLocked: true,
    accessLevel: 'none',
    threatLevel: 'low',
    lastAccess: new Date(),
    activeSessions: 0
  });

  const [accessLogs, setAccessLogs] = useState([
    { id: '1', timestamp: new Date(Date.now() - 3600000), action: 'Vault Access', user: 'Admin', status: 'Success' },
    { id: '2', timestamp: new Date(Date.now() - 7200000), action: 'Security Check', user: 'System', status: 'Complete' },
    { id: '3', timestamp: new Date(Date.now() - 10800000), action: 'Authentication', user: 'Guard-01', status: 'Success' }
  ]);

  const handleAuthentication = (success: boolean) => {
    setIsAuthenticated(success);
    if (success) {
      setSecurityStatus(prev => ({
        ...prev,
        accessLevel: 'full',
        activeSessions: prev.activeSessions + 1,
        lastAccess: new Date()
      }));
      
      setAccessLogs(prev => [
        { id: Date.now().toString(), timestamp: new Date(), action: 'Login', user: 'Authorized User', status: 'Success' },
        ...prev
      ]);
    }
  };

  const handleVaultToggle = () => {
    setSecurityStatus(prev => {
      const newStatus = {
        ...prev,
        vaultLocked: !prev.vaultLocked,
        lastAccess: new Date()
      };
      
      setAccessLogs(prevLogs => [
        { 
          id: Date.now().toString(), 
          timestamp: new Date(), 
          action: newStatus.vaultLocked ? 'Vault Locked' : 'Vault Opened', 
          user: 'Authorized User', 
          status: 'Success' 
        },
        ...prevLogs
      ]);
      
      return newStatus;
    });
  };

  const handleEmergencyLockdown = () => {
    setSecurityStatus(prev => ({
      ...prev,
      vaultLocked: true,
      threatLevel: 'high',
      lastAccess: new Date()
    }));
    
    setAccessLogs(prev => [
      { id: Date.now().toString(), timestamp: new Date(), action: 'Emergency Lockdown', user: 'Security System', status: 'Activated' },
      ...prev
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
      
      {!isAuthenticated ? (
        <AuthenticationPanel onAuthenticate={handleAuthentication} />
      ) : (
        <div className="relative z-10 p-6">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
              Vault Security Command Center
            </h1>
            <p className="text-blue-200">Advanced Security Management System</p>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
              <VaultInterface 
                securityStatus={securityStatus}
                onVaultToggle={handleVaultToggle}
                onEmergencyLockdown={handleEmergencyLockdown}
              />
              <StatusMonitor securityStatus={securityStatus} />
            </div>
            
            <div className="space-y-6">
              <SecurityBot securityStatus={securityStatus} />
              <AccessLogs logs={accessLogs} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;