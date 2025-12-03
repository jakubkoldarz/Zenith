import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { UserDto } from "../types/userDto";
import api from "../api";

interface AuthContextType {
    user: UserDto | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserDto | null>(null);

    const login = (token: string) => {
        localStorage.setItem("authToken", token);
        checkUserStatus();
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        setUser(null);
    };

    const checkUserStatus = async () => {
        try {
            const { data } = await api.get<UserDto>("/auth/me");
            setUser(data);
        } catch (error) {
            setUser(null);
        }
    };

    useEffect(() => {
        checkUserStatus();
    }, []);

    const value = {
        user,
        isAuthenticated: !!user,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
