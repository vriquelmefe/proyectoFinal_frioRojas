import { useParams } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import productosData from '../data/data';
import { useCart } from '../contexts/CartContext.jsx'; 
import { useState } from 'react';

const ProductDetail = () => {
  const { id } = useParams();
  const producto = Object.values(productosData)
    .flat()
    .find((p) => p.id === parseInt(id));

  const { agregarAlCarrito } = useCart();
  const [cantidad, setCantidad] = useState(1); 

  const handleAgregarCarrito = () => {
    const productoConCantidad = { ...producto, cantidad };
    agregarAlCarrito(productoConCantidad);
    alert(`${producto.nombre} agregado al carrito!`);
  };

  if (!producto) {
    return <Container className="my-5">Producto no encontrado.</Container>;
  }

  return (
    <Container className="my-5">
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
          <div>
            <input
              type="number"
              min="1"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              style={{ width: '60px', marginRight: '10px' }}
            />
            <Button variant="primary" onClick={handleAgregarCarrito}>
              Agregar al Carrito
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductDetail;
