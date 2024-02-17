import React, { useState } from "react";
import axios from "axios";

function User({ user }) {
  // Definimos el estado para guardar los datos editables del usuario
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);

  // Manejamos el cambio de los inputs
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Manejamos el envío del formulario para actualizar el usuario
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:3001/api/users/${user._id}`, {
        firstName,
        lastName,
        email,
        password,
      })
      .then((response) => {
        alert("Usuario actualizado con éxito");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Manejamos el botón para eliminar el usuario
  const handleDelete = () => {
    axios
      .delete(`http://localhost:3001/api/users/${user._id}`)
      .then((response) => {
        alert("Usuario eliminado con éxito");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="User bg-white shadow-lg p-4 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Datos del usuario
      </h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName" className="block text-gray-600 mb-1">
          Nombre:
        </label>
        <input
          id="firstName"
          type="text"
          value={firstName}
          onChange={handleFirstNameChange}
          required
          className="border border-gray-300 rounded px-2 py-1 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label htmlFor="lastName" className="block text-gray-600 mb-1">
          Apellido:
        </label>
        <input
          id="lastName"
          type="text"
          value={lastName}
          onChange={handleLastNameChange}
          required
          className="border border-gray-300 rounded px-2 py-1 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label htmlFor="email" className="block text-gray-600 mb-1">
          Email:
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
          className="border border-gray-300 rounded px-2 py-1 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label htmlFor="password" className="block text-gray-600 mb-1">
          Contraseña:
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
          className="border border-gray-300 rounded px-2 py-1 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 py-1 px-3 rounded text-white font-semibold hover:bg-blue-600 transition duration-300"
        >
          Actualizar
        </button>
      </form>
      <button
        onClick={handleDelete}
        className="bg-red-500 py-1 px-3 rounded text-white font-semibold hover:bg-red-600 transition duration-300 mt-2"
      >
        Eliminar
      </button>
    </div>
  );
}

export default User;


