import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useCart } from '../contexts/CartContext.jsx';

function Navigation() {
  const { obtenerTotalPrecio } = useCart(); 
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false); 
  };

  return (
    <Navbar data-bs-theme="dark" className='navegacion navigationBar'>
      <Container>
        <Link to="/" className='text-decoration-none'>
          <Navbar.Brand>
            <img
              alt="Logo Frio Rojas"
              src={'logo.png'}
              width="120"
              height="120"
              className="d-inline-block align-top p-2"
            />
          </Navbar.Brand>
        </Link>

        <Nav className="me-auto my-4 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
          <Link to="/" className='pt-2'>
            <Button variant="outline-info" className="text-white"> Inicio</Button>
          </Link>

          {isLoggedIn ? (
            <>
              <Link to="/register" className='mx-3 pt-2'>
                <Button variant="outline-info" className="text-white">🔒 Registro</Button>
              </Link>
              <Link to="/" className='mx-3 pt-2'>
                <Button
                  variant="outline-info"
                  className="text-white"
                  onClick={handleLogout}
                >
                  🔒 Cerrar sesión
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className='mx-3 pt-2'>
                <Button
                  variant="outline-info"
                  className="text-white"
                >
                  🔐 Iniciar sesión
                </Button>
              </Link>
              <Link to="/register" className='pt-2'>
                <Button variant="outline-info" className="text-white">🔐 Registrarse</Button>
              </Link>
            </>
          )}
        </Nav>

        <Nav className='justify-content-end ms-auto'>
          <Link to="/cart">
            <Button variant="outline-info" className='text-white'>
              🛒 Total: {obtenerTotalPrecio()}
            </Button>
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navigation;
