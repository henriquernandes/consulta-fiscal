import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { headerData } from "../../data/landing.json";
import { useMutation } from "react-query";
import { entrar } from "@/services/requests/auth/entrar";
import { toast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { redirect } from "@tanstack/react-router";
import { useAuth } from "@/context/AuthContext";

type Props = {};

function LoginModal({}: Props) {
  const [loginForm, setLoginForm] = useState({
    user: "",
    password: "",
  });
  const auth = useAuth();

  const { mutate, isLoading } = useMutation(entrar, {
    onSuccess: (data) => {
      auth.entrar(data);
      toast({
        title: "Sucesso!",
        description: "Login efetuado com sucesso!",
      });
      redirect({
        to: "/dashboard",
      });
    },
    onError: (res: AxiosError) => {
      toast({
        title: "Verifique os dados de acesso!",
        description: res.message,
        variant: "destructive",
      });
    },
  });

  const handleLogin = () => {
    mutate(loginForm);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-6 py-4 flex items-center justify-center gap-2 rounded-full bg-gray-900 text-white transition-colors hover:bg-gray-800 font-medium hover:text-white">
          {headerData.login.label}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Entrar na sua conta</DialogTitle>
          <DialogDescription>
            Preencha seus dados para acessar sua conta.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="user" className="text-right">
              Usuário
            </Label>
            <Input
              id="user"
              type="user"
              name="user"
              className="col-span-3"
              placeholder="Seu usuário"
              required
              value={loginForm.user}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="senha" className="text-right">
              Senha
            </Label>
            <Input
              id="senha"
              name="password"
              type="password"
              required
              className="col-span-3"
              placeholder="Sua senha"
              value={loginForm.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleLogin} isLoading={isLoading}>
            Entrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default LoginModal;
