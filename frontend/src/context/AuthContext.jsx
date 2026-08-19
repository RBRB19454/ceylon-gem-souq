import { createContext, useContext, useState } from 'react';
import api from '../api/client';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('cgs_user');
    return stored ? JSON.parse(stored) : null;
  });

  const persist = (data) => {
    setUser(data);
    localStorage.setItem('cgs_user', JSON.stringify(data));
    localStorage.setItem('cgs_token', data.token);
  };

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    persist(data);
    return data;
  };

  const register = async (payload) => {
    const { data } = await api.post('/auth/register', payload);
    persist(data);
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cgs_user');
    localStorage.removeItem('cgs_token');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
