// React/Next Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Library Imports

// Data/Functions/Images Imports

// Component Imports
import { Nav } from "@/assets/components/global/All/Nav";

// Style Imports
import "../assets/styles/modules/Dashboard/Dashboard.module.css";

export default function Dashboard() {
  const router = useRouter();

  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [notes, setNotes] = useState([]);

  return (
    <div id="PAGE">
      <Nav />

      <div id="PAGE_CNT"></div>
    </div>
  );
}
