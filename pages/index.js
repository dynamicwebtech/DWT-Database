// React/Next Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Library Imports

// Data/Functions/Images Imports

// Component Imports
import { Nav } from "@/assets/components/global/All/Nav";
import { LoginWindow } from "@/assets/components/pages/Index/LoginWindow";
import { ResetPasswordWindow } from "@/assets/components/pages/Index/Password/ResetPasswordWindow";

// Style Imports
import "../assets/styles/modules/Index/Index.module.css";

export default function Home() {
  const router = useRouter();

  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [notes, setNotes] = useState([]);

  const [resetPasswordMode, setResetPasswordMode] = useState(false);

  useEffect(() => {
    if (window.location.hash.includes("#resetPassword")) {
      setResetPasswordMode(true);
    }
  }, []);

  return (
    <div id="PAGE">
      <Nav />

      <div id="PAGE_CNT">
        <LoginWindow users={users} />

        {resetPasswordMode && <ResetPasswordWindow />}
      </div>
    </div>
  );
}
