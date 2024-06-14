// React/Next Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Library Imports

// Data/Functions/Images Imports

// Component Imports

// Style Imports
import "../assets/styles/modules/Users/Users.module.css";

export default function Users() {
  const router = useRouter();

  const [users, setUsers] = useState([]);

  return (
    <div id="PAGE">
      <div id="PAGE_CNT"></div>
    </div>
  );
}
