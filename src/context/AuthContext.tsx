import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types/UserType";
import {
  getUsuarioAtual,
  setUsuarioAtual,
  isUsuarioLogado,
} from "@/utils/user";
import { logout } from "@/services/requests/auth/logout";

export interface AuthContextType {
  user: User | null;
  entrar: (user: User) => void;
  sair: () => void;
  isLogado: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(getUsuarioAtual());
  const [isLogado, setIsLogado] = useState<boolean>(!!getUsuarioAtual());

  const entrar = (user: User) => {
    setUsuarioAtual(user);
    setUser(user);
    setIsLogado(true);
  };

  const logoutUser = () => {
    logout();
    localStorage.removeItem("user");
    setUser(null);
    setIsLogado(false);
  };

  return (
    <AuthContext.Provider value={{ user, entrar, sair: logoutUser, isLogado }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth só pode ser usado dentro de um AuthProvider");

  return context;
};
