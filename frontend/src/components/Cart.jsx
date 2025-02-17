import { useCart } from "../contexts/CartContext.jsx";
import { Container, Row, Col, Button } from "react-bootstrap";

const Cart = () => {
  const { carrito, eliminarDelCarrito, actualizarCantidad, obtenerTotalPrecio } = useCart();

  if (carrito.length === 0) {
    return <Container className="my-5">El carrito está vacío.</Container>;
  }

  const handleEliminarDelCarrito = (id) => {
    eliminarDelCarrito(id); 
  };

  const handleIncrementar = (id) => {
  
    actualizarCantidad(id, 1);
  };

  const handleDecrementar = (id) => {
    actualizarCantidad(id, -1);
  };

  return (
    <Container className="my-5">
      <h2 className="text-center">Carrito de Compras</h2>
      <Row className="justify-content-center">
        {carrito.map((producto) => (
          <Col key={producto.id} md={12} className="mb-4">
            <div className="d-flex align-items-center mb-3">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                style={{ width: '50px', height: '50px', marginRight: '10px' }}
              />
              <div className="flex-grow-1">
                <div>{producto.nombre}</div>
                <div>
                  <span>{producto.precio}</span> x <span>{producto.cantidad}</span>
                </div>
                <div className="d-flex align-items-center">
                  <Button variant="secondary" onClick={() => handleDecrementar(producto.id)}>-</Button>
                  <span className="mx-2">{producto.cantidad}</span>
                  <Button variant="secondary" onClick={() => handleIncrementar(producto.id)}>+</Button>
                </div>
              </div>
              <Button variant="danger" onClick={() => handleEliminarDelCarrito(producto.id)}>
                Eliminar
              </Button>
            </div>
          </Col>
        ))}
      </Row>
      <div className="text-center mt-4">
        <h4>Total: {obtenerTotalPrecio()}</h4>
      </div>
    </Container>
  );
};

export default Cart;
