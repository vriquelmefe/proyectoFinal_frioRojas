import { useParams } from 'react-router-dom';
import { Container, Card, Button, Row, Col, Alert } from 'react-bootstrap';
import productosData from '../data/data';
import { useCart } from '../contexts/CartContext.jsx'; 
import { useState, useEffect } from 'react';

const ProductDetail = () => {
  const { id } = useParams();
  const producto = Object.values(productosData)
    .flat()
    .find((p) => p.id === parseInt(id));

  const { carrito, agregarAlCarrito } = useCart();
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const productoEnCarrito = carrito.find(item => item.id === producto?.id);
    if (productoEnCarrito) {
      setCantidad(productoEnCarrito.cantidad);
    }
  }, [carrito, producto]);

  const handleAgregarCarrito = () => {
    const productoConCantidad = { ...producto, cantidad };
    agregarAlCarrito(productoConCantidad);
  
    setMensaje(`${producto.nombre} agregado al carrito!`);
    setTimeout(() => setMensaje(""), 3000);
  };
  
  if (!producto) {
    return <Container className="my-5">Producto no encontrado.</Container>;
  }

  return (
    <Container className="my-5">
      <Row>
        <Col sm={8}>
          <Card className="text-center">
            <Card.Img
              variant="top"
              src={producto.imagen}
              alt={producto.nombre}
              style={{ maxWidth: '300px', margin: '0 auto' }}
            />
            <Card.Body>
              <Card.Title>{producto.nombre}</Card.Title>
              <Card.Text>{producto.descripcion}</Card.Text>
              <Card.Text className="fw-bold">{producto.precio}</Card.Text>

              <div className="d-flex align-items-center">
                <Button variant="primary" onClick={handleAgregarCarrito} className="ms-3">
                  Agregar al Carrito
                </Button>
              </div>
            </Card.Body>
          </Card>

          {mensaje && (
            <Alert variant="success" className="mt-3">
              {mensaje}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
