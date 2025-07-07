
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  authMethod: 'email' | 'google';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  verifyOTP: (email: string, otp: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('noteapp_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const clearError = () => setError(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      const storedUsers = JSON.parse(localStorage.getItem('noteapp_users') || '[]');
      const foundUser = storedUsers.find((u: any) => u.email === email && u.password === password);
      
      if (!foundUser) {
        setError('Invalid email or password');
        return false;
      }

      const userData: User = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        authMethod: 'email'
      };

      setUser(userData);
      localStorage.setItem('noteapp_user', JSON.stringify(userData));
      return true;
    } catch (err) {
      setError('Login failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate Google OAuth
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const userData: User = {
        id: 'google_' + Date.now(),
        email: 'user@gmail.com',
        name: 'Google User',
        authMethod: 'google'
      };

      setUser(userData);
      localStorage.setItem('noteapp_user', JSON.stringify(userData));
      return true;
    } catch (err) {
      setError('Google login failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const storedUsers = JSON.parse(localStorage.getItem('noteapp_users') || '[]');
      if (storedUsers.find((u: any) => u.email === email)) {
        setError('User already exists with this email');
        return false;
      }

      // Store pending verification
      const pendingUser = { email, password, name, id: 'user_' + Date.now() };
      localStorage.setItem('noteapp_pending_user', JSON.stringify(pendingUser));
      
      return true;
    } catch (err) {
      setError('Signup failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (email: string, otp: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (otp !== '123456') {
        setError('Invalid OTP. Use 123456 for demo.');
        return false;
      }

      const pendingUser = JSON.parse(localStorage.getItem('noteapp_pending_user') || '{}');
      if (pendingUser.email !== email) {
        setError('Verification failed');
        return false;
      }

      // Save user
      const storedUsers = JSON.parse(localStorage.getItem('noteapp_users') || '[]');
      storedUsers.push(pendingUser);
      localStorage.setItem('noteapp_users', JSON.stringify(storedUsers));
      localStorage.removeItem('noteapp_pending_user');

      const userData: User = {
        id: pendingUser.id,
        email: pendingUser.email,
        name: pendingUser.name,
        authMethod: 'email'
      };

      setUser(userData);
      localStorage.setItem('noteapp_user', JSON.stringify(userData));
      return true;
    } catch (err) {
      setError('OTP verification failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('noteapp_user');
  };

  const value = {
    user,
    login,
    loginWithGoogle,
    signup,
    verifyOTP,
    logout,
    isLoading,
    error,
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
