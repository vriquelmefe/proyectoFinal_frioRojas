import "./App.css";
import Context from "./contexts/Context";
import useDeveloper from "./hooks/useDeveloper";
import { BrowserRouter, Routes, Route } from "react-router-dom";

<<<<<<< HEAD
import './App.css'
import Context from './contexts/Context'
import useDeveloper from './hooks/useDeveloper'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './views/home'
import Navigation from './components/Navigation.jsx'
import Register from './views/register/index.jsx'
import Login from './views/login/index.jsx'
import Header from './components/Header'
=======
import Home from "./views/home";
import Navigation from "./components/Navigation.tsx";
import Register from "./views/register/index.tsx";
import Login from "./views/login/index.tsx";
import Header from "./components/Header";
>>>>>>> 19a15352ca79d654d8ab59f0c68b137756e9ea6f

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
