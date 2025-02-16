import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
const app = express();
import {
  obtenerUsuario,
  registrarUsuario,
  verificarUsuario,
  usuarioExiste,
  obtenerPublicaciones,
  obtenerFavoritos,
  obtenerVentas,
  registrarArticulo,
  registarPublicacion,
  registrarVenta,
} from "./consultas";
const port = 3000;

app.use(cors());
app.use(express.json());

//get usuario
app.get("/usuario", async (req, res) => {
  try {
    const autorization = req.header("Authorization");
    if (!autorization) {
      return res.status(401).json({ message: "No se proporcionó un token" });
    }
    const token = autorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token no válido" });
    }
    //console.log("Token Actual", autorization);

    const verify = jwt.verify(token, "desafioLatam");

    const { email } = verify;

    const usuario = await obtenerUsuario(email);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.send(usuario);
    /*res.json({
      usuario: {
        nombre: "blabla",
        correo: "blablabla.com",
        rol: "algo",
      },
    });*/
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "Error interno del servidor" });
  }
});

// get publicaciones
app.get("/publicaciones", async (req, res) => {
  const publicaciones = await obtenerPublicaciones;

  if (!publicaciones) {
    return res.status(404).json({ message: "No se encuentran Publicaciones" });
  }
  //console.log("datos en get", datosUsuario);
  res.send(publicaciones);
  /*res.json({publicaciones: [],});*/
});

// get publicaciones:id
app.get("/publicaciones/:id", async (req, res) => {
  const { id } = req.params;
  const publicaciones = await obtenerPublicaciones(id);

  if (!publicaciones) {
    return res.status(404).json({ message: "No se encuentran Publicaciones" });
  }
  //console.log("datos en get", datosUsuario);
  res.send(publicaciones);
  /*res.json({
    publicaciones: [
      {
        idProducto: "12345678",
        idVendedor: "1234",
        idPublicacion: "4321",
      },
    ],
  });*/
});

//get favoritos
app.get("/favoritos", async (req, res) => {
  try {
    const autorization = req.header("Authorization");
    if (!autorization) {
      return res.status(401).json({ message: "No se proporcionó un token" });
    }
    const token = autorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token no válido" });
    }
    //console.log("Token Actual", autorization);

    const verify = jwt.verify(token, "desafioLatam");

    const { email } = verify;

    const favoritos = await obtenerFavoritos(email);
    if (!favoritos) {
      return res
        .status(404)
        .json({ message: "No se encuentran favoritos registrados" });
    }

    res.send(favoritos);

    /* res.json({
      publicaciones: [
        {
          idProducto: "12345678",
          idVendedor: "1234",
          idPublicacion: "4321",
        },
      ],
    });*/
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "Error interno del servidor" });
  }
});

//get Ventas
app.get("/ventas", async (req, res) => {
  try {
    const autorization = req.header("Authorization");
    if (!autorization) {
      return res.status(401).json({ message: "No se proporcionó un token" });
    }
    const token = autorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token no válido" });
    }
    //console.log("Token Actual", autorization);

    const verify = jwt.verify(token, "desafioLatam");

    const { email } = verify;

    const ventas = await obtenerVentas(email);
    if (!ventas) {
      return res
        .status(404)
        .json({ message: "No se encuentran Compras registradas" });
    }

    res.send(ventas);
    /*res.json({
      ventas: [
        {
          idComprador: "1234",
          idPublicacion: "4321",
          precioProducto: "1000",
        },
      ],
    });*/
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "Error interno del servidor" });
  }
});

//post login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Credenciales faltantes" });
    }
    const usuario = await verificarUsuario(email, password);

    const token = jwt.sign({ email: usuario.email }, "desafioLatam", {
      expiresIn: 10,
    });
    //console.log("Usuario autenticado:", token);
    res.json({ token, email });
    /*res.json({
      token: "blablablablabla",
      email: "uncorreo",
    });*/
  } catch (error) {
    res.status(error.code || 500).json({ error });
  }
});

//post register
app.post("/register", async (req, res) => {
  try {
    const { nombre, email, rol, password } = req.body;

    if (await usuarioExiste(email)) console.log("El usuario ya existe");
    else {
      await registrarUsuario(nombre, email, rol, password);
      const token = jwt.sign({ email: usuario.email }, "desafioLatam", {
        expiresIn: 10,
      });
      //console.log("Usuario autenticado:", token);
      res.json({ token, email });
    }

    /*res.json({
        token: "blablablablabla",
        email: "uncorreo",
      });*/
  } catch (error) {
    res.status(error.code || 500).json({ error });
  }
});

//post articulos
app.post("/articulos", async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, url } = req.body;
    await registrarArticulo(nombre, descripcion, precio, stock, url);
    res.json({
      message: "Producto registrado con exito",
    });
  } catch (error) {
    res.status(error.code || 500).json({ error });
  }
});

//post publicacion
app.post("/publicacion", async (req, res) => {
  try {
    const { idProducto, idVendedor } = req.body;
    await registarPublicacion(idProducto, idVendedor);
    res.json({
      message: "Publicacion registrada con exito",
    });
    /*res.json({
      id_producto: 1234,
      id_vendedor: 1234,
      id_publicacion: 4321,
    });*/
  } catch (error) {
    res.status(error.code || 500).json({ error });
  }
});

//post ventas
app.post("/ventas", async (req, res) => {
  try {
    const { idPublicacion, idComprador, precio } = req.body;
    await registrarVenta(idPublicacion, idComprador, precio);
    res.json({
      message: "Venta registrado con exito",
    });
  } catch (error) {
    res.status(error.code || 500).json({ error });
  }
});

app.listen(port, console.log(`Servido Corriendo en puerto ${port}`));
