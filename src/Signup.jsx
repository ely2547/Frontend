import { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      await axios.post('http://localhost:3001/api/register', {
        firstName,
        lastName,
        email,
        password,
      });

      alert('Usuario registrado exitosamente');
    } catch (error) {
      console.error(error);
      alert('Ocurrió un error al registrar el usuario');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-8 bg-gradient-to-r from-indigo-100 to-indigo-200 shadow-xl rounded-xl"
    >
      <h1 className="text-4xl font-bold text-center text-indigo-900 mb-8">
        Registrarse
      </h1>
      <div className="flex flex-col mb-4">
        <label htmlFor="firstName" className="text-gray-800 font-semibold">
          Nombre
        </label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          className="border border-gray-300 p-2 mt-1 focus:outline-none focus:ring focus:ring-indigo-300 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="lastName" className="text-gray-800 font-semibold">
          Apellido
        </label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          className="border border-gray-300 p-2 mt-1 focus:outline-none focus:ring focus:ring-indigo-300 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="email" className="text-gray-800 font-semibold">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="border border-gray-300 p-2 mt-1 focus:outline-none focus:ring focus:ring-indigo-300 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="password" className="text-gray-800 font-semibold">
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="border border-gray-300 p-2 mt-1 focus:outline-none focus:ring focus:ring-indigo-300 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
        />
      </div>
      <div className="flex flex-col mb-6">
        <label htmlFor="confirmPassword" className="text-gray-800 font-semibold">
          Confirmar contraseña
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          className="border border-gray-300 p-2 mt-1 focus:outline-none focus:ring focus:ring-indigo-300 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold rounded-lg shadow-md focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-110"
      >
        Registrarse
      </button>
    </form>
  );
};

export default Signup;


