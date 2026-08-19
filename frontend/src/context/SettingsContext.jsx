import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/client';

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const refetch = async () => {
    try {
      const { data } = await api.get('/settings');
      setSettings(data);
    } catch (err) {
      console.error('Failed to load site settings:', err);
    }
  };

  useEffect(() => {
    setLoading(true);
    refetch().finally(() => setLoading(false));
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading, refetch }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
