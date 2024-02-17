import React from "react";

// Creamos el componente Product
function Product({ product, closeProduct }) {
  // Retornamos el JSX del componente
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg max-w-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={closeProduct}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img
              className="w-full h-full object-cover rounded"
              src={product.image}
              alt={product.name}
            />
          </div>
          <div className="md:w-1/2 md:pl-4">
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-gray-600 mb-2">
              Precio: <span className="text-purple-600">${product.price}</span>
            </p>
            <p className="text-gray-600 mb-2">
              Cantidad:{" "}
              <span className="text-purple-600">{product.quantity}</span>
            </p>
            <p className="text-gray-600 mb-2">
              Categoría:{" "}
              <span className="text-purple-600">{product.category}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
