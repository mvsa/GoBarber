import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextState {
  // eslint-disable-next-line @typescript-eslint/ban-types
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState); // hack para quando preciso passa o valor inicial como vazio

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Gobarber:token');
    const user = localStorage.getItem('@Gobarber:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password });

    const { token } = response.data;
    const user = response.data.userWithoutPassword;

    localStorage.setItem('@Gobarber:token', token);
    localStorage.setItem('@Gobarber:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Gobarber:token');
    localStorage.removeItem('@Gobarber:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextState {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('UseAuth must be used within an AuthProvider');
  }

  return context;
}
