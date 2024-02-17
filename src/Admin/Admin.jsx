
import React, { useState, useEffect } from "react";
import axios from "axios";

// Creamos el componente Admin
function Admin() {
  // Definimos el estado de los productos
  const [products, setProducts] = useState([]);

  // Definimos el estado del filtro de búsqueda
  const [filter, setFilter] = useState("");

  // Definimos el estado del formulario
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    category: "",
    image: "",
  });

  // Definimos la función para obtener los productos del servidor
  const getProducts = () => {
    // Hacemos una petición GET al servidor con el filtro de búsqueda
    axios
      .get(`http://localhost:3001/products?filter=${filter}`)
      .then((res) => setProducts(res.data)) // Actualizamos el estado de los productos con la respuesta
      .catch((err) => console.error(err)); // Mostramos el error en la consola
  };

  // Definimos la función para crear un nuevo producto en el servidor
  const createProduct = () => {
    // Hacemos una petición POST al servidor con los datos del formulario
    axios
      .post("http://localhost:3001/products", form)
      .then((res) => {
        setProducts([...products, res.data]); // Añadimos el nuevo producto al estado de los productos
        resetForm(); // Reseteamos el formulario
      })
      .catch((err) => console.error(err)); // Mostramos el error en la consola
  };

  // Definimos la función para actualizar un producto existente en el servidor
  const updateProduct = (id) => {
    // Hacemos una petición PUT al servidor con el id del producto y los datos del formulario
    axios
      .put(`http://localhost:3001/products/${id}`, form)
      .then((res) => {
        setProducts(
          products.map((product) =>
            product._id === id ? res.data : product
          )
        ); // Actualizamos el producto en el estado de los productos
        resetForm(); // Reseteamos el formulario
      })
      .catch((err) => console.error(err)); // Mostramos el error en la consola
  };

  // Definimos la función para eliminar un producto existente en el servidor
  const deleteProduct = (id) => {
    // Hacemos una petición DELETE al servidor con el id del producto
    axios
      .delete(`http://localhost:3001/products/${id}`)
      .then((res) => {
        setProducts(products.filter((product) => product._id !== id)); // Eliminamos el producto del estado de los productos
      })
      .catch((err) => console.error(err)); // Mostramos el error en la consola
  };

  // Definimos la función para resetear el formulario
  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      category: "",
      image: "",
    });
  };

  // Definimos la función para manejar el cambio de valor de los campos del formulario
  const handleChange = (e) => {
    // Obtenemos el nombre y el valor del campo que cambió
    const { name, value } = e.target;

    // Actualizamos el estado del formulario con el nuevo valor
    setForm({
      ...form,
      [name]: value,
    });
  };

  // Definimos la función para manejar el envío del formulario
  const handleSubmit = (e) => {
    // Evitamos el comportamiento por defecto del formulario
    e.preventDefault();


    // Comprobamos si el formulario tiene un id, lo que significa que estamos actualizando un producto existente
    if (form._id) {
      // Llamamos a la función para actualizar el producto con el id del formulario
      updateProduct(form._id);
    } else {
      // Llamamos a la función para crear un nuevo producto
      createProduct();
    }
  };

  // Definimos la función para editar un producto existente
  const editProduct = (product) => {
    // Actualizamos el estado del formulario con los datos del producto
    setForm(product);
  };

  // Usamos el efecto para obtener los productos cuando el componente se monta o cuando el filtro cambia
  useEffect(() => {
    getProducts();
  }, [filter]);

  // Retornamos el JSX del componente
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Gestión de inventario</h1>
      <div className="flex justify-center items-center mb-4">
        <label className="mr-2" htmlFor="filter">
          Buscar por nombre, categoría o descripción:
        </label>
        <input
          className="border border-gray-400 p-2 rounded"
          type="text"
          id="filter"
          name="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Nombre</th>
              <th className="py-3 px-6 text-left">Descripción</th>
              <th className="py-3 px-6 text-center">Precio</th>
              <th className="py-3 px-6 text-center">Cantidad</th>
              <th className="py-3 px-6 text-center">Categoría</th>
              <th className="py-3 px-6 text-center">Imagen</th>
              <th className="py-3 px-6 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {products.map((product) => (
              <tr
                className="border-b border-gray-200 hover:bg-gray-100"
                key={product._id}
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="font-medium">{product.name}</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-left">
                  <div className="flex items-center">
                    <span>{product.description}</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  <span>${product.price}</span>
                </td>
                <td className="py-3 px-6 text-center">
                  <span>{product.quantity}</span>
                </td>
                <td className="py-3 px-6 text-center">
                  <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                    {product.category}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  <img
                    className="w-16 h-16 object-cover rounded"
                    src={product.image}
                    alt={product.name}
                  />
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <div
                      className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer"
                      onClick={() => editProduct(product)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </div>
                    <div
                      className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer"
                      onClick={() => deleteProduct(product._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center mt-4">
        <form className="w-full max-w-lg" onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="name"
              >
                Nombre
              </label>
              <input
                className="Appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="description"
              >
                Descripción
              </label>
              <input
                className="Appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="description"
                name="description"
                type="text"
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="price"
              >
                Precio
              </label>
              <input
                className="Appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="price"
                name="price"
                type="number"
                min="0"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="quantity"
              >
                Cantidad
              </label>
              <input
                className="Appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="quantity"
                name="quantity"
                type="number"
                min="0"
                value={form.quantity}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="category"
              >
                Categoría
              </label>
              <input
                className="Appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white // Código del frontend (continuación)

                focus:border-gray-500"
                id="category"
                name="category"
                type="text"
                value={form.category}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="image"
              >
                URL de la imagen
              </label>
              <input
                className="Appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="image"
                name="image"
                type="url"
                value={form.image}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                {form._id ? "Actualizar" : "Crear"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Admin;