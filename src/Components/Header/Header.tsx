import { useEffect, useRef, useState } from "react";
import { headerData } from "../../data/landing.json";
import { Link } from "@tanstack/react-router";
import LoginModal from "../LoginModal/LoginModal";
import { useAuth } from "@/context/AuthContext";
import { Button } from "../ui/button";

type Props = {};

function Header({}: Props) {
  const navbarRef = useRef<HTMLDivElement>(null);
  const auth = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const navbar = navbarRef.current;
      if (!navbar) return;

      if (window.scrollY >= 20) {
        navbar.classList.remove("border-b-transparent");
        navbar.classList.remove("bg-transparent");
        navbar.classList.add("border-b");
        navbar.classList.add("border-b-slate-300");
        navbar.classList.add("bg-white");
      } else {
        navbar.classList.remove("border-b");
        navbar.classList.remove("border-b-slate-300");
        navbar.classList.remove("bg-white");
        navbar.classList.add("border-b-transparent");
        navbar.classList.add("bg-transparent");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      id="navbar"
      className="w-full transition duration-300 justify-center fixed h-20 z-50 hidden md:flex"
      ref={navbarRef}
    >
      <nav
        aria-label="Main Navigation"
        className="flex flex-row items-center w-3/4"
      >
        <div className="text-nowrap">
          <Link to="/">Consulta Fiscal</Link>
        </div>
        <ul className="flex flex-row w-full justify-center gap-x-14">
          {headerData.links.map((item, i) => (
            <li key={i} className="text-lg hover:scale-110 hover:opacity-80">
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
        <div className="float-right">
          {auth.isLogado ? (
            <Link to="/dashboard">
              <Button className="px-6 py-4 flex items-center justify-center gap-2 rounded-full bg-gray-900 text-white transition-colors hover:bg-gray-800 font-medium hover:text-white">
                Acessar Dashboard
              </Button>
            </Link>
          ) : (
            <LoginModal />
          )}
        </div>
        <span></span>
      </nav>
    </header>
  );
}

export default Header;
