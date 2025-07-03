import React, { createContext, useContext, useState, useEffect } from 'react';

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  balance: string;
  network: string;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isLoading: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState('0.0');
  const [network, setNetwork] = useState('Sepolia Testnet');
  const [isLoading, setIsLoading] = useState(false);

  const connectWallet = async () => {
    setIsLoading(true);
    
    // Simulate wallet connection delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock wallet connection
    setIsConnected(true);
    setAddress('0x742d35C6cf3e2c8e1234567890abcdef12345678');
    setBalance('2.5');
    setNetwork('Sepolia Testnet');
    setIsLoading(false);
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress(null);
    setBalance('0.0');
  };

  useEffect(() => {
    // Check if wallet was previously connected (mock)
    const wasConnected = localStorage.getItem('walletConnected');
    if (wasConnected === 'true') {
      setIsConnected(true);
      setAddress('0x742d35C6cf3e2c8e1234567890abcdef12345678');
      setBalance('2.5');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('walletConnected', isConnected.toString());
  }, [isConnected]);

  return (
    <WalletContext.Provider value={{
      isConnected,
      address,
      balance,
      network,
      connectWallet,
      disconnectWallet,
      isLoading
    }}>
      {children}
    </WalletContext.Provider>
  );
};