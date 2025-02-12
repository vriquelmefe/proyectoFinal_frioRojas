import express from "express";
import cors from "cors";
//import jwt from "jsonwebtoken";
const app = express();

const port = 3000;

//get usuarios:id
app.get("/usuarios/:id", async (req, res) => {
  res.json({
    usuario: {
      nombre: "blabla",
      correo: "blablabla.com",
      rol: "algo",
    },
  });
});

// get publicaciones
app.get("/publicaciones", async (req, res) => {
  res.json({
    publicaciones: [],
  });
});

// get publicaciones:id
app.get("/publicaciones/:id", async (req, res) => {
  res.json({
    publicaciones: [
      {
        idProducto: "12345678",
        idVendedor: "1234",
        idPublicacion: "4321",
      },
    ],
  });
});

//get favoritos:id
app.get("/favoritos/:id", async (req, res) => {
  res.json({
    publicaciones: [
      {
        idProducto: "12345678",
        idVendedor: "1234",
        idPublicacion: "4321",
      },
    ],
  });
});

//get Ventas:id
app.get("/ventas/:id", async (req, res) => {
  res.json({
    ventas: [
      {
        idComprador: "1234",
        idPublicacion: "4321",
        precioProducto: "1000",
      },
    ],
  });
});

//post login
app.post("/login", async (req, res) => {
  res.json({
    token: "blablablablabla",
    email: "uncorreo",
  });
});

//post register
app.post("/register", async (req, res) => {
  res.json({
    token: "blablablablabla",
    email: "uncorreo",
  });
});

//post articulos
app.post("/articulos", async (req, res) => {
  res.json({
    message: "Producto registrado con exito",
  });
});

//post publicacion
app.post("/publicacion", async (req, res) => {
  res.json({
    id_producto: 1234,
    id_vendedor: 1234,
    id_publicacion: 4321,
  });
});

//post ventas
app.post("/ventas", async (req, res) => {
  res.json({
    message: "Venta registrado con exito",
  });
});

app.listen(port, console.log(`Servido Corriendo en puerto ${port}`));
