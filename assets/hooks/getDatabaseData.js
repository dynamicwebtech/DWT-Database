/**
 *
 *  This is the getDatabaseData hook
 *
 */

import { useState, useEffect } from "react";

import { fetchClients } from "../functions/async/fetchers/fetchClients";
import { fetchProjects } from "../functions/async/fetchers/fetchProjects";
import { fetchUsers } from "../functions/async/fetchers/fetchUsers";
import { fetchNotes } from "../functions/async/fetchers/fetchNotes";

const getDatabaseData = () => {
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchClients("/api/clients/getClients", setClients);
    fetchProjects("/api/projects/getProjects", setProjects);
    fetchUsers("/api/users/getUsers", setUsers);
    fetchNotes("/api/notes/getNotes", setNotes);
  }, []);

  return { clients, projects, users, notes };
};

export default getDatabaseData;
