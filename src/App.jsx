import "./App.css";
import Context from "./contexts/Context";
import useDeveloper from "./hooks/useDeveloper";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./views/home";
import Navigation from "./components/Navigation.tsx";
import Register from "./views/register/index.tsx";
import Login from "./views/login/index.tsx";
import Header from "./components/Header";

function App() {
  const globalState = useDeveloper();

  return (
    <Context.Provider value={globalState}>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route element={<Header />}>
          <Route path="/" element={<Home />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}
export default App;
