import "./App.css";
import Context from "./contexts/Context";
import useDeveloper from "./hooks/useDeveloper";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./views/home";
import Navigation from "./components/Navigation.jsx";
import Register from "./views/register";
import Login from "./views/login";
import Productos from "./components/Productos.jsx"; 
import ProductDetail from "./components/ProductDetail.jsx";
import Cart from "./components/Cart.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";

function App() {
  const globalState = useDeveloper();

  return (
    <Context.Provider value={globalState}>
      <CartProvider> 
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/productos/:categoria" element={<Productos />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
         </CartProvider>
    </Context.Provider>
  );
}

export default App;
