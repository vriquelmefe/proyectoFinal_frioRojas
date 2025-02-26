const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const {
  registroUsuario,
  loginUsuario,
  obtenerUsuario,
  obtenerPublicaciones,
  obtenerPublicacionPorId,
  ingresarArticulo,
  obtenerArticulos,
  ingresarPublicacion,
  obtenerArticuloPorId,
  ingresarVenta,
  obtenerVentas,
  obtenerVentasPorId,
  ingresarFavorito,
  obtenerFavoritosPorId,
} = require("./consultas.js");

const PORT = 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.listen(PORT, console.log("SERVIDOR OK 👍, CORRIENDO EN EL PUERTO:", PORT));

// Registro de usuario
app.post("/register", async (req, res) => {
  const { nombre, email, rol, password } = req.body;
  try {
    await registroUsuario(nombre, email, rol, password);
    res.status(200).send("Usuario registrado con éxito");
  } catch (error) {
    res.status(500).send("No se pudo registrar el usuario");
  }
});

// Login de usuario
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    await loginUsuario(email, password);
    const token = jwt.sign({ email }, "az_AZ", { expiresIn: "1h" });
    res.send({ token });
  } catch (error) {
    res.status(error.code).send(error);
  }
});

// Obtener un usuario
app.get("/usuarios", async (req, res) => {
  const Authorization = req.header("Authorization");
  const token = Authorization.split("Bearer ")[1];
  const { email } = jwt.verify(token, "az_AZ");
  const user = await obtenerUsuario(email);
  res.send(user);
});

// Ingresa una publicación
app.post("/publicaciones", async (req, res) => {
  const { id_producto, id_usuario } = req.body;
  try {
    await ingresarPublicacion(id_producto, id_usuario);
    res.status(200).send("Publicación ingresada con éxito");
  } catch (error) {
    res.status(500).send("No se pudo ingresar la publicación");
  }
});

// Obtener publicaciones
app.get("/publicaciones", async (req, res) => {
  try {
    const publicaciones = await obtenerPublicaciones();
    res.status(200).json(publicaciones);
  } catch (err) {
    res.status(500).send("Error al obtener las publicaciones");
  }
});

// Obtener una publicación por ID
app.get("/publicaciones/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const publicacion = await obtenerPublicacionPorId(id);
    if (publicacion) {
      res.status(200).json(publicacion);
    } else {
      res.status(404).json({ error: "Publicación no encontrada" });
    }
  } catch (err) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ingresar articulos
app.post("/productos", async (req, res) => {
  const { titulo_nombre, descripcion, precio, stock, url_imagen } = req.body;
  try {
    await ingresarArticulo(
      titulo_nombre,
      descripcion,
      precio,
      stock,
      url_imagen
    );
    res.status(200).send("Articulo ingresado con éxito");
  } catch (error) {
    res.status(500).send("No se pudo ingresar el articulo");
  }
});

// Obtener articulos
app.get("/productos", async (req, res) => {
  try {
    const articulos = await obtenerArticulos();
    res.status(200).json(articulos);
  } catch (err) {
    res.status(500).send("Error al obtener los articulos");
  }
});

// Obtener un articulo por ID
app.get("/productos/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const articulo = await obtenerArticuloPorId(id);
    if (articulo) {
      res.status(200).json(articulo);
    } else {
      res.status(404).json({ error: "Articulo no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ingresar ventas
app.post("/ventas", async (req, res) => {
  const { id_publicacion, id_usuario_comprador } = req.body;
  try {
    await ingresarVenta(id_publicacion, id_usuario_comprador);
    res.status(200).send("Venta ingresada con éxito");
  } catch (error) {
    res.status(500).send("No se pudo ingresar la venta");
  }
});

// Obtener ventas
app.get("/ventas", async (req, res) => {
  try {
    const ventas = await obtenerVentas();
    res.status(200).json(ventas);
  } catch (err) {
    res.status(500).send("Error al obtener las ventas");
  }
});

// Obtener ventas por ID
app.get("/ventas/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const venta = await obtenerVentasPorId(id);
    if (venta) {
      res.status(200).json(venta);
    } else {
      res.status(404).json({ error: "Venta no encontrada" });
    }
  } catch (err) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ingresa favoritos
app.post("/favoritos", async (req, res) => {
  const { id_usuario, id_publicacion } = req.body;
  try {
    await ingresarFavorito(id_usuario, id_publicacion);
    res.status(200).send("Favorito ingresado con éxito");
  } catch (error) {
    res.status(500).send("No se pudo ingresar el favorito");
  }
});

// Obtener favoritos por ID
app.get("/favoritos/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const favorito = await obtenerFavoritosPorId(id);
    if (favorito) {
      res.status(200).json(favorito);
    } else {
      res.status(404).json({ error: "Favorito no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = app;
