import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Card, Pagination, Button } from "react-bootstrap";
import { useState } from "react";
import productosData from "../data/data";
import { useCart } from "../contexts/CartContext";

const Productos = () => {
  const { categoria } = useParams();
  const productos = productosData[categoria] || [];
  const productosPorPagina = 6;
  const [paginaActual, setPaginaActual] = useState(1);
  const navigate = useNavigate();
  const { favoritos, toggleFavorito } = useCart();

  const totalPaginas = Math.ceil(productos.length / productosPorPagina);
  const productosPaginados = productos.slice(
    (paginaActual - 1) * productosPorPagina,
    paginaActual * productosPorPagina
  );

  const manejarPagina = (pagina) => {
    setPaginaActual(pagina);
  };

  const verDetalle = (id) => {
    navigate(`/producto/${id}`);
  };

  return (
    <Container className="my-8">
      <h2 className="text-center">Productos - {categoria.replace("-", " ")}</h2>
      <Row className="justify-content-center">
        {productosPaginados.length > 0 ? (
          productosPaginados.map((producto) => (
            <Col key={producto.id} md={4} className="mb-4">
              <Card className="card-custom text-center">
                <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} />
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <Card.Title>{producto.nombre}</Card.Title>
                    <Button
                      variant="link"
                      className="favorito-btn"
                      onClick={() => toggleFavorito(producto.id)}
                    >
                      {favoritos[producto.id] ? "❤️" : "🤍"}
                    </Button>
                  </div>
                  <Card.Text>{producto.precio}</Card.Text>
                  <Button variant="primary" onClick={() => verDetalle(producto.id)}>
                    Ver Detalle
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">No hay productos en esta categoría.</p>
        )}
      </Row>

      <Pagination className="justify-content-center">
        <Pagination.Prev
          onClick={() => manejarPagina(paginaActual - 1)}
          disabled={paginaActual === 1}
        />
        {[...Array(totalPaginas)].map((_, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === paginaActual}
            onClick={() => manejarPagina(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => manejarPagina(paginaActual + 1)}
          disabled={paginaActual === totalPaginas}
        />
      </Pagination>
    </Container>
  );
};

export default Productos;
