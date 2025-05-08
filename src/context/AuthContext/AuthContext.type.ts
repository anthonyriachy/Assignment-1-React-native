export type AuthContextType = {
    user: any;
    setUser: (user: any) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    logout: () => void;
    isLoading: boolean;
};
