import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import type IUserPayload from '../interface/IUserPayload'
import type IAuthResponse from '../interface/IAuthResponse';
import type { ReactNode } from 'react';

interface AuthContextType {
    user: IUserPayload | null;
    isAuthenticated: boolean;
    login: (authData: IAuthResponse) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {

    const [user, setUser] = useState<IUserPayload | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('ssmup_token');

        if (token) {
            try {
                const decoded = jwtDecode<IUserPayload>(token);

                const currentTime = Date.now() / 1000;

                if (decoded.exp > currentTime) {
                    setUser(decoded);
                } else {
                    localStorage.removeItem('ssmup_token');
                    setUser(null);
                }
            } catch (error) {
                localStorage.removeItem('ssmup_token');
                setUser(null);
            }
            
        }else {
            console.log("⚪ Nenhum token encontrado.");
        }
        setIsLoading(false);
    }, []);

    const login = (authData: IAuthResponse) => {
        localStorage.setItem('ssmup_token', authData.token);
        const decoded = jwtDecode<IUserPayload>(authData.token);
        setUser(decoded);
    };

    const logout = () => {
        localStorage.removeItem('ssmup_token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}