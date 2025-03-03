import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useCart } from "../contexts/CartContext";
import productosData from "../data/data";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const { favoritos, toggleFavorito } = useCart();
  const navigate = useNavigate();

  console.log("Favoritos almacenados:", favoritos);

  const productosFavoritos = Object.keys(favoritos)
    .filter((id) => favoritos[id])
    .map((id) => {
      for (let categoria in productosData) {
        const producto = productosData[categoria].find((p) => p.id === parseInt(id));
        if (producto) return producto;
      }
      return null;
    })
    .filter(Boolean);

  return (
    <Container className="my-8">
      <h2 className="text-center">Productos Favoritos</h2>
      <Row className="justify-content-center">
        {productosFavoritos.length > 0 ? (
          productosFavoritos.map((producto) => (
            <Col key={producto.id} md={4} className="mb-4">
              <Card className="border border-gray shadow text-center">
                <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} />
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <Card.Title>{producto.nombre}</Card.Title>
                    <Button variant="link" className="favorito-btn" onClick={() => toggleFavorito(producto.id)}>
                      ❤️
                    </Button>
                  </div>
                  <Card.Text>{producto.precio}</Card.Text>
                  <Button variant="primary" onClick={() => navigate(`/producto/${producto.id}`)}>Ver Detalle</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">No tienes productos favoritos.</p>
        )}
      </Row>
    </Container>
  );
};

export default Favorites;
