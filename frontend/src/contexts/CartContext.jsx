/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [favoritos, setFavoritos] = useState(() => {
    try {
      const favoritosGuardados = localStorage.getItem("favoritos");
      return favoritosGuardados ? JSON.parse(favoritosGuardados) : {};
    } catch (error) {
      console.error("Error cargando favoritos:", error);
      return {};
    }
  });
  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  const agregarAlCarrito = (producto) => {
    const productoExistente = carrito.find((item) => item.id === producto.id);

    if (productoExistente) {
      setCarrito((prevCarrito) =>
        prevCarrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + producto.cantidad }
            : item
        )
      );
    } else {
      setCarrito((prevCarrito) => [...prevCarrito, { ...producto, cantidad: producto.cantidad || 1 }]);
    }
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter((producto) => producto.id !== id));
  };

  const obtenerTotalProductos = () => {
    return carrito.reduce((total, producto) => total + producto.cantidad, 0);
  };

  const obtenerTotalPrecio = () => {
    const total = carrito.reduce((total, producto) => {
      const precioNumerico = parseFloat(producto.precio.replace(/\./g, "").replace(/[^0-9.-]+/g, ""));
      const cantidad = producto.cantidad || 1;
      return total + (precioNumerico * cantidad);
    }, 0);
    return total.toLocaleString("es-CL", { style: "currency", currency: "CLP" });
  };

  const actualizarCantidad = (id, incremento) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((producto) =>
        producto.id === id
          ? { ...producto, cantidad: Math.max(1, producto.cantidad + incremento) } 
          : producto
      )
    );
  };

  const toggleFavorito = (id) => {
    setFavoritos((prevFavoritos) => {
      const nuevoEstado = { ...prevFavoritos, [id]: !prevFavoritos[id] };
      console.log("Favoritos actualizados:", nuevoEstado);
      return nuevoEstado;
    });
  };
  

  return (
    <CartContext.Provider value={{ 
      carrito, 
      agregarAlCarrito, 
      actualizarCantidad, 
      eliminarDelCarrito, 
      obtenerTotalProductos, 
      obtenerTotalPrecio, 
      favoritos,  
      toggleFavorito 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
