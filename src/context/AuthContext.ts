import { createContext } from 'react';

interface AuthContextState {
  name: string;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState); // hack para quando preciso passa o valor inicial como vazio

export default AuthContext;
