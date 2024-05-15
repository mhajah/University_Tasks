import React, { createContext, useContext, useState, useCallback } from 'react';

interface PotionData {
    data: Object[];
    links: Object;
    meta: Object;
}
  
interface PotionContextType {
    potions: PotionData;
    getPotions: () => Promise<void>;
    loading: boolean;
}
  
const PotionContext = createContext<PotionContextType | undefined>(undefined);
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export function usePotions() {
    const context = useContext(PotionContext);
    if (!context) {
      throw new Error("usePotions must be used within a PotionsProvider");
    }
    return context;
}

export function PotionsProvider({ children }: { children: React.ReactNode }) {
  const [potions, setPotions] = useState({ data: [], links: {}, meta: {} });
  const [loading, setLoading] = useState(false);

  const getPotions = useCallback(async () => {
    setLoading(true);
    await delay(3000);
    const response = await fetch(`https://api.potterdb.com/v1/potions?page[number]=1`);
    const data = await response.json();
    setPotions(data);
    setLoading(false);
  }, []);

  return (
    <PotionContext.Provider value={{ potions, getPotions, loading }}>
      {children}
    </PotionContext.Provider>
  );
}
