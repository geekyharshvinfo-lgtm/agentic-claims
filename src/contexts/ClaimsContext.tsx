import { createContext, useContext, useState, ReactNode } from 'react';
import { sampleClaims as initialClaims } from '../data/sampleClaims';
import { Claim } from '../types';

interface ClaimsContextType {
  claims: Claim[];
  addClaim: (claim: Claim) => void;
  updateClaim: (id: string, updates: Partial<Claim>) => void;
  deleteClaim: (id: string) => void;
}

const ClaimsContext = createContext<ClaimsContextType | undefined>(undefined);

export function ClaimsProvider({ children }: { children: ReactNode }) {
  const [claims, setClaims] = useState<Claim[]>(initialClaims);

  const addClaim = (claim: Claim) => {
    setClaims(prev => [claim, ...prev]); // Add new claim at the beginning
  };

  const updateClaim = (id: string, updates: Partial<Claim>) => {
    setClaims(prev =>
      prev.map(claim => (claim.id === id ? { ...claim, ...updates } : claim))
    );
  };

  const deleteClaim = (id: string) => {
    setClaims(prev => prev.filter(claim => claim.id !== id));
  };

  return (
    <ClaimsContext.Provider value={{ claims, addClaim, updateClaim, deleteClaim }}>
      {children}
    </ClaimsContext.Provider>
  );
}

export function useClaims() {
  const context = useContext(ClaimsContext);
  if (context === undefined) {
    throw new Error('useClaims must be used within a ClaimsProvider');
  }
  return context;
}
