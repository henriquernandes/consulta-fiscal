import LoginModal from "@/Components/LoginModal/LoginModal";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

export default function Dashboard() {
  const [LoginModalOpen, setLoginModalOpen] = useState(false);

  const toggleLoginModal = () => {
    setLoginModalOpen(!LoginModalOpen);
  };

  return (
    <>
      <h1>div</h1>
    </>
  );
}
