import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserType = 'donor' | 'requester' | 'verifier' | 'admin';

interface User {
  id: string;
  email: string;
  name: string;
  userType: UserType;
  walletAddress?: string;
  reputation: number;
  avatar: string;
  joinedAt: string;
  verified: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: SignupData) => Promise<boolean>;
  logout: () => void;
  updateUserType: (userType: UserType) => void;
  isLoading: boolean;
}

interface SignupData {
  email: string;
  password: string;
  name: string;
  userType: UserType;
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

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock successful login
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      userType: 'donor',
      walletAddress: '0x742d35C6cf3e2c8e1234567890abcdef12345678',
      reputation: 4.8,
      avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`,
      joinedAt: '2024-12-15',
      verified: true
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    setIsLoading(false);
    return true;
  };

  const signup = async (userData: SignupData): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock successful signup
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      name: userData.name,
      userType: userData.userType,
      reputation: 0,
      avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`,
      joinedAt: new Date().toISOString().split('T')[0],
      verified: false
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUserType = (userType: UserType) => {
    if (user) {
      const updatedUser = { ...user, userType };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      signup,
      logout,
      updateUserType,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};