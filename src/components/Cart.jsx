import { useCart } from "../contexts/CartContext.jsx";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Cart = () => {
  const { carrito, eliminarDelCarrito, obtenerTotalProductos } = useCart();

  if (carrito.length === 0) {
    return <Container className="my-5">El carrito está vacío.</Container>;
  }

  const handleEliminarDelCarrito = (id) => {
    eliminarDelCarrito(id);
  };

  return (
    <Container className="my-5">
      <h2 className="text-center">Carrito de Compras</h2>
      <Row className="justify-content-center">
        {carrito.map((producto) => (
          <Col key={producto.id} md={4} className="mb-4">
            <Card className="card-custom text-center">
              <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} />
              <Card.Body>
                <Card.Title>{producto.nombre}</Card.Title>
                <Card.Text>{producto.precio}</Card.Text>
                <Button variant="danger" onClick={() => handleEliminarDelCarrito(producto.id)}>
                  Eliminar
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="text-center mt-4">
        <h4>Total: {obtenerTotalProductos()}</h4>
      </div>
    </Container>
  );
};

export default Cart;
