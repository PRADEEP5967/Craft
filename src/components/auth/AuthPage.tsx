
import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { OTPVerification } from './OTPVerification';

type AuthView = 'login' | 'signup' | 'otp';

export const AuthPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<AuthView>('login');
  const [otpEmail, setOtpEmail] = useState('');

  const handleSwitchToSignup = () => setCurrentView('signup');
  const handleSwitchToLogin = () => setCurrentView('login');
  const handleSwitchToOTP = (email: string) => {
    setOtpEmail(email);
    setCurrentView('otp');
  };
  const handleBackFromOTP = () => setCurrentView('signup');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {currentView === 'login' && (
          <LoginForm onSwitchToSignup={handleSwitchToSignup} />
        )}
        {currentView === 'signup' && (
          <SignupForm 
            onSwitchToLogin={handleSwitchToLogin}
            onSwitchToOTP={handleSwitchToOTP}
          />
        )}
        {currentView === 'otp' && (
          <OTPVerification 
            email={otpEmail}
            onBack={handleBackFromOTP}
          />
        )}
      </div>
    </div>
  );
};
