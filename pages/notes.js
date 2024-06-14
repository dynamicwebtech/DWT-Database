// React/Next Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Library Imports

// Data/Functions/Images Imports

// Component Imports

// Style Imports
import "../assets/styles/modules/Notes/Notes.module.css";

export default function Notes() {
  const router = useRouter();

  const [notes, setNotes] = useState([]);

  return (
    <div id="PAGE">
      <div id="PAGE_CNT"></div>
    </div>
  );
}
