import { useState } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";

const Favorites = () => {
  const [favorites, setFavorites] = useState([
    { id: 1, name: "Válvula de expansión", price: 30 },
    { id: 2, name: "Evaporador", price: 80 },
  ]);

  const removeFavorite = (id) => {
    setFavorites(favorites.filter((item) => item.id !== id));
  };

  return (
    <Card className="shadow">
      <Card.Header className="bg-dark text-white">
        <h4>Mis Favoritos</h4>
      </Card.Header>
      <Card.Body>
        <ListGroup>
          {favorites.map((item) => (
            <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
              <div>
                <h6>{item.name}</h6>
                <small>Precio: ${item.price}</small>
              </div>
              <Button variant="danger" size="sm" onClick={() => removeFavorite(item.id)}>
                Eliminar
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
      <Card.Footer>
        <small>{favorites.length} productos en favoritos</small>
      </Card.Footer>
    </Card>
  );
};

export default Favorites;