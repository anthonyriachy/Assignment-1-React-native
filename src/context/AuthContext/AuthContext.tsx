import { createContext, useState, useEffect } from 'react';
import { AuthContextType } from './AuthContext.type';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('user');
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const fetchStoredUser = async () => {
        try {
            setIsLoading(true);
            const storedUser = await AsyncStorage.getItem('user');
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error('Error fetching stored user:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStoredUser();
    }, []);

    return (
        <AuthContext.Provider 
            value={{ 
                user, 
                setUser, 
                isAuthenticated, 
                setIsAuthenticated, 
                logout,
                isLoading 
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContextProvider, AuthContext };
