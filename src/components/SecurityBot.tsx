import React, { useState, useEffect } from 'react';
import { Bot, MessageSquare, Zap, AlertCircle } from 'lucide-react';
import { SecurityStatus } from '../App';

interface SecurityBotProps {
  securityStatus: SecurityStatus;
}

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  type: 'bot' | 'alert' | 'status';
}

const SecurityBot: React.FC<SecurityBotProps> = ({ securityStatus }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Security Bot initialized. All systems operational.',
      timestamp: new Date(),
      type: 'bot'
    }
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const botResponses = [
    "Vault perimeter secure. No anomalies detected.",
    "Biometric scanners are functioning within normal parameters.",
    "Access logs reviewed. All entries authorized.",
    "Environmental sensors indicate optimal conditions.",
    "Security protocols are active and monitoring.",
    "Threat assessment complete. Status: Nominal.",
    "Backup systems tested and ready for deployment.",
    "Communication channels encrypted and secure."
  ];

  const addBotMessage = (text: string, type: 'bot' | 'alert' | 'status' = 'bot') => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          text,
          timestamp: new Date(),
          type
        }
      ]);
      setIsTyping(false);
    }, 1500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
        addBotMessage(randomResponse);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (securityStatus.threatLevel === 'high') {
      addBotMessage('🚨 ALERT: Emergency lockdown activated. Enhanced security protocols engaged.', 'alert');
    } else if (!securityStatus.vaultLocked) {
      addBotMessage('ℹ️ STATUS: Vault access granted. Monitoring active session.', 'status');
    }
  }, [securityStatus.vaultLocked, securityStatus.threatLevel]);

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="relative">
          <Bot className="h-8 w-8 text-blue-400" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Security Bot</h3>
          <p className="text-sm text-blue-200">AI-Powered Monitoring</p>
        </div>
      </div>

      <div className="h-80 overflow-y-auto space-y-3 mb-4 pr-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-3 rounded-lg ${
              message.type === 'bot' ? 'bg-blue-900/30 border border-blue-700/30' :
              message.type === 'alert' ? 'bg-red-900/30 border border-red-700/30' :
              'bg-yellow-900/30 border border-yellow-700/30'
            }`}
          >
            <div className="flex items-start space-x-2">
              {message.type === 'bot' ? (
                <Bot className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
              ) : message.type === 'alert' ? (
                <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
              ) : (
                <Zap className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              )}
              <div className="flex-1">
                <p className="text-sm text-white leading-relaxed">{message.text}</p>
                <p className="text-xs text-slate-400 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="p-3 rounded-lg bg-blue-900/30 border border-blue-700/30">
            <div className="flex items-center space-x-2">
              <Bot className="h-4 w-4 text-blue-400" />
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-4 w-4 text-slate-400" />
          <span className="text-xs text-slate-400">Active Monitoring</span>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          securityStatus.threatLevel === 'low' ? 'bg-green-900/50 text-green-300' :
          securityStatus.threatLevel === 'medium' ? 'bg-yellow-900/50 text-yellow-300' :
          'bg-red-900/50 text-red-300'
        }`}>
          {securityStatus.threatLevel.toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default SecurityBot;