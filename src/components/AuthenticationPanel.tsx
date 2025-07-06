import React, { useState } from 'react';
import { Fingerprint, Eye, Mic, Shield, CheckCircle, AlertCircle } from 'lucide-react';

interface AuthenticationPanelProps {
  onAuthenticate: (success: boolean) => void;
}

const AuthenticationPanel: React.FC<AuthenticationPanelProps> = ({ onAuthenticate }) => {
  const [step, setStep] = useState(1);
  const [biometricScanning, setBiometricScanning] = useState(false);
  const [voiceScanning, setVoiceScanning] = useState(false);
  const [retinalScanning, setRetinalScanning] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authSteps, setAuthSteps] = useState({
    biometric: false,
    retinal: false,
    voice: false,
    passcode: false
  });

  const handleBiometricScan = () => {
    setBiometricScanning(true);
    setTimeout(() => {
      setBiometricScanning(false);
      setAuthSteps(prev => ({ ...prev, biometric: true }));
      setStep(2);
    }, 3000);
  };

  const handleRetinalScan = () => {
    setRetinalScanning(true);
    setTimeout(() => {
      setRetinalScanning(false);
      setAuthSteps(prev => ({ ...prev, retinal: true }));
      setStep(3);
    }, 2500);
  };

  const handleVoiceScan = () => {
    setVoiceScanning(true);
    setTimeout(() => {
      setVoiceScanning(false);
      setAuthSteps(prev => ({ ...prev, voice: true }));
      setStep(4);
    }, 2000);
  };

  const handlePasscodeSubmit = () => {
    if (passcode === '2025') {
      setAuthSteps(prev => ({ ...prev, passcode: true }));
      setTimeout(() => {
        onAuthenticate(true);
      }, 1000);
    } else {
      setPasscode('');
      alert('Invalid passcode. Try "2025"');
    }
  };

  const allAuthComplete = Object.values(authSteps).every(Boolean);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-slate-800/90 backdrop-blur-sm rounded-3xl border border-slate-700/50 p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <Shield className="h-16 w-16 text-blue-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Vault Access</h1>
          <p className="text-slate-300">Multi-Factor Authentication Required</p>
        </div>

        <div className="space-y-6">
          {/* Authentication Steps Progress */}
          <div className="grid grid-cols-4 gap-2 mb-8">
            {[
              { key: 'biometric', icon: Fingerprint },
              { key: 'retinal', icon: Eye },
              { key: 'voice', icon: Mic },
              { key: 'passcode', icon: Shield }
            ].map(({ key, icon: Icon }, index) => (
              <div
                key={key}
                className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                  authSteps[key as keyof typeof authSteps]
                    ? 'border-green-400 bg-green-400/20'
                    : step > index + 1
                    ? 'border-slate-600 bg-slate-700/50'
                    : step === index + 1
                    ? 'border-blue-400 bg-blue-400/20'
                    : 'border-slate-700 bg-slate-800/50'
                }`}
              >
                <Icon className={`h-6 w-6 mx-auto ${
                  authSteps[key as keyof typeof authSteps]
                    ? 'text-green-400'
                    : step === index + 1
                    ? 'text-blue-400'
                    : 'text-slate-500'
                }`} />
              </div>
            ))}
          </div>

          {/* Step 1: Biometric Scan */}
          {step === 1 && (
            <div className="text-center">
              <div className={`w-32 h-32 mx-auto rounded-full border-4 mb-6 flex items-center justify-center transition-all duration-300 ${
                biometricScanning 
                  ? 'border-blue-400 bg-blue-400/20 animate-pulse' 
                  : 'border-slate-600 bg-slate-700/50'
              }`}>
                <Fingerprint className={`h-16 w-16 ${biometricScanning ? 'text-blue-400' : 'text-slate-400'}`} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Biometric Scan</h3>
              <p className="text-slate-400 mb-6">Place your finger on the scanner</p>
              <button
                onClick={handleBiometricScan}
                disabled={biometricScanning}
                className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50"
              >
                {biometricScanning ? 'Scanning...' : 'Start Biometric Scan'}
              </button>
            </div>
          )}

          {/* Step 2: Retinal Scan */}
          {step === 2 && (
            <div className="text-center">
              <div className={`w-32 h-32 mx-auto rounded-full border-4 mb-6 flex items-center justify-center transition-all duration-300 ${
                retinalScanning 
                  ? 'border-green-400 bg-green-400/20 animate-pulse' 
                  : 'border-slate-600 bg-slate-700/50'
              }`}>
                <Eye className={`h-16 w-16 ${retinalScanning ? 'text-green-400' : 'text-slate-400'}`} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Retinal Scan</h3>
              <p className="text-slate-400 mb-6">Look directly into the scanner</p>
              <button
                onClick={handleRetinalScan}
                disabled={retinalScanning}
                className="w-full py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50"
              >
                {retinalScanning ? 'Scanning...' : 'Start Retinal Scan'}
              </button>
            </div>
          )}

          {/* Step 3: Voice Recognition */}
          {step === 3 && (
            <div className="text-center">
              <div className={`w-32 h-32 mx-auto rounded-full border-4 mb-6 flex items-center justify-center transition-all duration-300 ${
                voiceScanning 
                  ? 'border-yellow-400 bg-yellow-400/20 animate-pulse' 
                  : 'border-slate-600 bg-slate-700/50'
              }`}>
                <Mic className={`h-16 w-16 ${voiceScanning ? 'text-yellow-400' : 'text-slate-400'}`} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Voice Recognition</h3>
              <p className="text-slate-400 mb-6">Speak your passphrase clearly</p>
              <button
                onClick={handleVoiceScan}
                disabled={voiceScanning}
                className="w-full py-3 px-6 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50"
              >
                {voiceScanning ? 'Listening...' : 'Start Voice Recognition'}
              </button>
            </div>
          )}

          {/* Step 4: Passcode Entry */}
          {step === 4 && (
            <div className="text-center">
              <div className="w-32 h-32 mx-auto rounded-full border-4 border-slate-600 bg-slate-700/50 mb-6 flex items-center justify-center">
                <Shield className="h-16 w-16 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Security Passcode</h3>
              <p className="text-slate-400 mb-6">Enter your 4-digit access code</p>
              <div className="space-y-4">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  maxLength={4}
                  className="w-full py-3 px-4 bg-slate-900/50 border border-slate-600 rounded-lg text-white text-center text-2xl tracking-widest focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••"
                />
                <button
                  onClick={handlePasscodeSubmit}
                  disabled={passcode.length !== 4}
                  className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50"
                >
                  Verify Access
                </button>
                <p className="text-xs text-slate-500">Hint: Try "2025"</p>
              </div>
            </div>
          )}

          {allAuthComplete && (
            <div className="text-center p-4 bg-green-900/30 border border-green-700/50 rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <p className="text-green-300 font-semibold">Authentication Complete</p>
              <p className="text-green-400 text-sm">Granting vault access...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPanel;