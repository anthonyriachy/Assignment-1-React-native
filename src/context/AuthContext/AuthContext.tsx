import { createContext, useState } from 'react';
import { AuthContextType } from './AuthContext.type';


const AuthContext = createContext<AuthContextType | null>(null);


const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const logout = ()=>{
        setUser(null);
        setIsAuthenticated(false);
    };
    return <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated,logout }}>
            {children}
        </AuthContext.Provider>;
};



export {AuthContextProvider,AuthContext};
