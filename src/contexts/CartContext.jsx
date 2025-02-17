/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from 'react';

const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);


  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => [...prevCarrito, producto]);
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter((producto) => producto.id !== id));
  };

  const obtenerTotalProductos = () => {
    return carrito.length;
  };

  const obtenerTotalPrecio = () => {
    return carrito.reduce((total, producto) => total + parseFloat(producto.precio.replace("$", "").replace(".", "")), 0).toLocaleString("es-AR", { style: "currency", currency: "ARS" });
  };

  return (
    <CartContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, obtenerTotalProductos, obtenerTotalPrecio }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
