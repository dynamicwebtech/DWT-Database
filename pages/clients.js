// React/Next Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Library Imports

// Data/Functions/Images Imports

// Component Imports

// Style Imports
import "../assets/styles/modules/Clients/Clients.module.css";

export default function Clients() {
  const router = useRouter();

  const [clients, setClients] = useState([]);

  return (
    <div id="PAGE">
      <div id="PAGE_CNT"></div>
    </div>
  );
}
