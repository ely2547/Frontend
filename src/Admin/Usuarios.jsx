import React, { useState, useEffect } from "react";
import axios from "axios";
import User from "./User";

function Usuarios() {
  // Definimos el estado para guardar los usuarios y el usuario seleccionado
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(users[0]);

  // Obtenemos los usuarios del API
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users")
      .then((response) => {
        setUsers(response.data);
        setSelectedUser(null); 
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Manejamos el cambio de usuario seleccionado
  const handleChange = (event) => {
    const userId = event.target.value;
    if (userId) {
      axios
        .get(`http://localhost:3001/api/users/${userId}`)
        .then((response) => {
          setSelectedUser(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setSelectedUser(null);
    }
  };

  return (
    <div className="Usuarios bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Gestión de usuarios
      </h1>
      <p className="text-lg text-gray-700 mb-2">
        Selecciona un usuario de la lista para ver sus datos
      </p>
      <select
        className="border border-gray-300 rounded px-4 py-2 mb-4"
        onChange={handleChange}
      >
        <option value="">-- Ninguno --</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.firstName}
          </option>
        ))}
      </select>
      {selectedUser && <User user={selectedUser} />}
    </div>
  );
}

export default Usuarios;
