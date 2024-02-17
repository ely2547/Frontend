import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "./Product";

// Establecer el número de productos por página
const PRODUCTS_PER_PAGE = 10;

function Products() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  // Agregar un estado para la página actual
  const [currentPage, setCurrentPage] = useState(1);

  const getProducts = () => {
    axios
      .get(`http://localhost:3001/products?filter=${filter}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  };

  const selectProduct = (product) => {
    setSelectedProduct(product);
  };

  const closeProduct = () => {
    setSelectedProduct(null);
  };

  // Crear una función para cambiar la página actual
  const changePage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getProducts();
  }, [filter]);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  // Filtrar los productos según la página actual y la cantidad
const paginatedProducts = products
.filter((product) => product.quantity > 0) // Solo mostrar los productos con cantidad mayor que 0
.slice(
  (currentPage - 1) * PRODUCTS_PER_PAGE,
  currentPage * PRODUCTS_PER_PAGE
);


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Inventario</h1>
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
              <th className="py-3 px-6 text-center">Ver</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {paginatedProducts.map((product) => (
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
                      onClick={() => selectProduct(product)}
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
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7 1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
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
      {selectedProduct && (
        <Product product={selectedProduct} closeProduct={closeProduct} />
      )}
      {/* Barra de navegación para cambiar de página */}
      <div className="flex justify-center items-center mt-4">
        <nav className="flex flex-row">
          {/* Botón para ir a la primera página si no es la actual */}
          {currentPage > 1 && (
            <button
              className="border border-gray-400 p-2 rounded mr-2"
              onClick={() => changePage(1)}
            >
              Primera
            </button>
          )}
          {/* Botón para ir a la página anterior si no es la primera */}
          {currentPage > 1 && (
            <button
              className="border border-gray-400 p-2 rounded mr-2"
              onClick={() => changePage(currentPage - 1)}
            >
              Anterior
            </button>
          )}
          {/* Mostrar el número de la página actual */}
          <span className="border border-gray-400 p-2 rounded mr-2">
            Página {currentPage} de {totalPages}
          </span>
          {/* Mostrar un botón para ir a la página siguiente si no es la última */}
          {currentPage < totalPages && (
            <button
              className="border border-gray-400 p-2 rounded mr-2"
              onClick={() => changePage(currentPage + 1)}
            >
              Siguiente
            </button>
          )}
          {/* Mostrar un botón para ir a la última página si no es la actual */}
          {currentPage < totalPages && (
            <button
              className="border border-gray-400 p-2 rounded mr-2"
              onClick={() => changePage(totalPages)}
            >
              Última
            </button>
          )}
        </nav>
      </div>
    </div>
  );
}

export default Products;
