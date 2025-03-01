import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Carousel, Button, Form } from "react-bootstrap";
import Header from "../../components/Header";

function Home() {
  const brands = [
    { src: "/argenta.png", alt: "Argenta" },
    { src: "/danfoss.png", alt: "Danfoss" },
    { src: "/logo_mcool.png", alt: "Mcool" },
    { src: "/midea.png", alt: "Midea" },
    { src: "/weingaung.png", alt: "Weingaung" },
  ];

  const categories = [
    { title: "Refrigeración", image: "https://images.unsplash.com/photo-1574169208507-84376144848b", link: "/productos/refrigeracion" },
    { title: "Climatización", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b", link: "/productos/climatizacion" },
    { title: "Productos Completos", image: "https://images.pexels.com/photos/896102/pexels-photo-896102.jpeg", link: "/productos/productos_completos" },
  ];

  return (
    <div>
      <Header />

      <Container fluid className="bg-gradient py-5 text-white text-center">
        <Carousel variant="dark" className="mt-4">
          {brands.map((brand, index) => (
            <Carousel.Item key={index}>
              <div className="d-flex justify-content-center align-items-center" style={{ height: "150px" }}>
                <img
                  className="img-fluid px-8"
                  src={brand.src}
                  alt={brand.alt}
                  style={{ 
                    maxWidth: "200px", 
                    height: "auto", 
                    transition: "transform 0.3s ease, filter 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.1)"; 
                    e.target.style.filter = "brightness(0) invert(0)"; 
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                    e.target.style.filter = "brightness(0) invert(1)";
                  }}
                />
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>

      <Container fluid className="bg-gradient py-5 text-center" style={{ backgroundColor: "#004080" }}>
        <h1 className="text-white mb-4 fw-bold display-4">Bienvenido a Nuestro Catálogo</h1>
        <Row className="justify-content-center gap-4">
          {categories.map((category, index) => (
            <Col key={index} md={3} sm={6} xs={12}>
              <Link to={category.link} className="text-decoration-none">
                <Card className="category-card text-white border-0 rounded-4 shadow-lg">
                  <Card.Img src={category.image} alt={category.title} className="category-img" />
                  <Card.ImgOverlay className="d-flex align-items-center justify-content-center bg-dark bg-opacity-50">
                    <Card.Title className="fw-bold fs-3">{category.title}</Card.Title>
                  </Card.ImgOverlay>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>

      <Container className="my-5">
        <Row>
          <Col md={6} className="bg-dark text-white p-5 rounded-start shadow-lg">
            <h2 className="fw-bold mb-4 display-5">CONTÁCTANOS</h2>
            <h3 className="mb-4">Contacto desde Sitio Web Friorgias.cl</h3>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nombre completo / Empresa *</Form.Label>
                <Form.Control type="text" required className="rounded-3 border-0 shadow-sm" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Dirección de E-mail *</Form.Label>
                <Form.Control type="email" required className="rounded-3 border-0 shadow-sm" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Mensaje *</Form.Label>
                <Form.Control as="textarea" rows={3} required className="rounded-3 border-0 shadow-sm" />
              </Form.Group>
              <Button variant="outline-light" type="submit" className="rounded-3 shadow-sm">
                Enviar Consultas
              </Button>
            </Form>
          </Col>
          <Col md={6} className="bg-secondary text-white p-5 rounded-end shadow-lg">
            <h3 className="fw-bold mb-4 display-5">Ubicación Casa Matriz</h3>
            <p className="mb-4">Nueva de Valdes 944</p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.967654396783!2d-70.6488546848008!3d-33.42888098078088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c5a6e5e5e5e5%3A0x5e5e5e5e5e5e5e5e!2sNueva%20de%20Valdes%20944%2C%20Santiago%2C%20Chile!5e0!3m2!1ses!2scl!4v1620000000000!5m2!1ses!2scl"
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: "12px" }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </Col>
        </Row>
      </Container>


      <footer className="bg-dark text-white py-4 text-center">
        <p className="mb-0">© 2023 Refrigeración y Climatización. Todos los derechos reservados.</p>
      </footer>

      <style>
        {`
          .category-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            position: relative;
            overflow: hidden;
          }
          .category-card:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
          }
          .category-img {
            height: 200px;
            object-fit: cover;
            opacity: 0.8;
          }
          .category-card:hover .category-img {
            opacity: 1;
          }
        `}
      </style>
    </div>
  );
}

export default Home;