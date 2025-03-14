import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useCart } from "../contexts/CartContext";
//import productosData from "../data/data";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Context } from "../contexts/Context";

const Favorites = () => {
  const { token } = useContext(Context); 
  const apiUrl = import.meta.env.VITE_API_URL
  const { favoritos, toggleFavorito } = useCart();
  const [productosFavoritos, setProductosFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavoritos = async () => {
      if (!token) {
        setError("No estás autenticado. Por favor, inicia sesión.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);

        const response = await fetch(`${apiUrl}favoritos`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al cargar los favoritos");
        }

        const productos = await response.json();
        setProductosFavoritos(productos);
        //console.log(productos);
      } catch (error) {
        console.error("Error al cargar favoritos:", error);
        setError("No se pudieron cargar los productos favoritos.");
      } finally {
        setLoading(false);
      }
    };
    fetchFavoritos();
  }, [token]);

  if (loading) return <p className="text-center">Cargando favoritos...</p>;
  if (error) return <p className="text-center">{error}</p>;

  console.log("Favoritos almacenados:", favoritos);

  /*const productosFavoritos = Object.keys(favoritos)
    .filter((id) => favoritos[id])
    .map((id) => {
      for (let categoria in productosData) {
        const producto = productosData[categoria].find(
          (p) => p.id === parseInt(id)
        );
        if (producto) return producto;
      }
      return null;
    })
    .filter(Boolean);*/

  return (
    <Container className="my-8">
      <h2 className="text-center">Productos Favoritos</h2>
      <Row className="justify-content-center">
        {productosFavoritos.length > 0 ? (
          productosFavoritos.map((producto) => (
            <Col key={producto.id_producto} md={4} className="mb-4">
              <Card className="card-custom text-center">
                <Card.Img
                  variant="top"
                  src={producto.url}
                  alt={producto.nombre_articulo}
                />
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <Card.Title>{producto.nombre_articulo}</Card.Title>
                    <Button
                      variant="link"
                      className="favorito-btn"
                      onClick={() => toggleFavorito(producto.id_producto)}
                    >
                      ❤️
                    </Button>
                  </div>
                  <Card.Text>{producto.precio}</Card.Text>
                  <Card.Text>{producto.descripcion}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() =>
                      navigate(`/producto/${producto.id_producto}`)
                    }
                  >
                    Ver Detalle
                  </Button>
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
