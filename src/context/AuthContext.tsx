import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types/UserType";
import { getUsuarioLocalStorage, setUsuarioLocalStorage } from "@/utils/user";
import { logout } from "@/services/requests/auth/logout";
import { validarUsuario } from "@/services/requests/auth/validarUsuario";
import { router } from "@/main";

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
  const [user, setUser] = useState<User | null>(getUsuarioLocalStorage());
  const isLogado = !!user;

  const entrar = (user: User) => {
    setUsuarioLocalStorage(user);
    setUser(user);
  };

  const logoutUser = () => {
    logout();
    setUser(null);
    setUsuarioLocalStorage(null);
  };

  useEffect(() => {
    validarUsuario().then((res) => {
      if (res) {
        entrar(res);
      } else {
        setUser(null);
        setUsuarioLocalStorage(null);
        router.navigate({ to: "/" });
      }
    });
  }, []);

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
