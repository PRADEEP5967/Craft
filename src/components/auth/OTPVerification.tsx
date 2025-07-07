
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, ArrowLeft } from 'lucide-react';

interface OTPVerificationProps {
  email: string;
  onBack: () => void;
}

export const OTPVerification: React.FC<OTPVerificationProps> = ({ email, onBack }) => {
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  
  const { verifyOTP, isLoading, error, clearError } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    if (otp.length !== 6) {
      return;
    }
    
    await verifyOTP(email, otp);
  };

  const handleResendOTP = () => {
    setTimeLeft(300);
    setOtp('');
    // In a real app, this would trigger a new OTP
    console.log('Resending OTP to:', email);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Mail className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
        <CardDescription>
          We've sent a 6-digit code to<br />
          <span className="font-medium text-foreground">{email}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Enter the 6-digit code sent to your email
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="text-center text-sm text-muted-foreground">
            {timeLeft > 0 ? (
              <p>Code expires in {formatTime(timeLeft)}</p>
            ) : (
              <p className="text-destructive">Code has expired</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || otp.length !== 6 || timeLeft === 0}
          >
            {isLoading ? 'Verifying...' : 'Verify Email'}
          </Button>
        </form>

        <div className="mt-6 space-y-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Didn't receive the code?{' '}
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={timeLeft > 240} // Allow resend after 1 minute
                className="text-primary hover:underline font-medium disabled:text-muted-foreground disabled:no-underline"
              >
                Resend
              </button>
            </p>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to signup
            </button>
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            <strong>Demo Note:</strong> Use code <span className="font-mono font-bold">123456</span> to verify
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
