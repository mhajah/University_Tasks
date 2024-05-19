import React, { createContext, useContext, useState, useCallback } from 'react';

interface Data {
  data: Object[];
  links: Object;
  meta: Object;
}

interface DataContextType {
  potions: Data;
  getPotions: () => Promise<void>;
  loading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export function usePotions() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("usePotions must be used within a DataProvider");
  }
  return context;
}

interface PotionsProviderProps {
  children: React.ReactNode;
  dataKind: string;
}

export function DataProvider({ children, dataKind }: PotionsProviderProps) {
  const [potions, setPotions] = useState({ data: [], links: {}, meta: {} });
  const [loading, setLoading] = useState(false);

  const getPotions = useCallback(async () => {
    setLoading(true);
    await delay(3000);
    const response = await fetch(`https://api.potterdb.com/v1/${dataKind}`);
    const data = await response.json();
    setPotions(data);
    setLoading(false);
  }, []);

  return (
    <DataContext.Provider value={{ potions, getPotions, loading }}>
      {children}
    </DataContext.Provider>
  );
}
