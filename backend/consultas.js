import bcrypt from "bcryptjs";
import pkg from "pg";
const { Pool } = pkg;
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "Pnuevo987",
  database: "frioRojas",
  allowExitOnIdle: true,
});

const obtenerUsuario = async (email) => {
  try {
    const consulta = `select * from usuarios where email = $1`;
    const { rows, rowCount } = await pool.query(consulta, [email]);

    if (!rowCount) {
      throw { message: "error al cargar informacion", code: 404 };
    }
    return rows;
  } catch (error) {
    throw error;
  }
};

const registrarUsuario = async (nombre, email, rol, password) => {
  try {
    const passwordEncriptada = bcrypt.hashSync(password, 10);
    password = passwordEncriptada;
    const consulta = `insert into usuarios (nombre,email,rol,password) values($1,$2,$3,$4 ) returning id_usuario,nombre,email,rol`;

    const { rows, rowCount } = await pool.query(consulta, [
      nombre,
      email,
      rol,
      password,
    ]);

    return rows[0];
  } catch (error) {
    throw error;
  }
};
const usuarioExiste = async (email) => {
  try {
    const consulta = "select * from usuarios where email = $1";

    const { rowCount } = await pool.query(consulta, [email]);

    return rowCount > 0;
  } catch (error) {
    //    console.error("aqui", error);
    throw new Error(error);
  }
};
const verificarUsuario = async (email, password) => {
  try {
    const consulta = `select * from usuarios where email = $1`;

    const { rows, rowCount } = await pool.query(consulta, [email]);
    if (rowCount === 0) {
      const error = new Error("Usuario no Existe");
      error.code = 401;
      throw error;
    }
    const usuario = rows[0];

    const { password: passwordEncriptada } = usuario;

    const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada);

    if (!passwordEsCorrecta) {
      const error = new Error("Contraseña incorrecta");
      error.code = 401;
      throw error;
    }

    return usuario;
  } catch (error) {
    console.error("Error verificando usuario:", error);
    if (error.code && error.message) {
      throw error;
    } else {
      throw { code: 500, message: "Error interno del servidor" };
    }
  }
};
const obtenerPublicaciones = async (id) => {
  try {
    let consulta, valores;

    if (!id) {
      consulta = "select * from publicacion";
      valores = [];
    } else {
      consulta = `select * from publicacion where id_publicacion = $1`;
      valores = [id];
    }
    const { rows, rowCount } = await pool.query(consulta, valores);
    if (!rowCount) {
      throw { message: "error al cargar informacion", code: 404 };
    }
    return rows;
  } catch (error) {
    console.error("Error al obtener publicaciones:", error);
    throw error;
  }
};

const obtenerFavoritos = async (email) => {
  try {
    const consulta = `select * from favoritos where id_usuario =(select id_usuario from usuarios where email = $1)`;
    const { rows, rowCount } = await pool.query(consulta, [email]);

    if (!rowCount) {
      throw { message: "error al cargar informacion", code: 404 };
    }
    return rows;
  } catch (error) {
    throw error;
  }
};
const obtenerVentas = async (email) => {
  try {
    const consulta = `select * from ventas where email = $1`;
    const { rows, rowCount } = await pool.query(consulta, [email]);

    if (!rowCount) {
      throw { message: "error al cargar informacion", code: 404 };
    }
    return rows;
  } catch (error) {
    throw error;
  }
};

const registrarArticulo = async (nombre, descripcion, precio, stock, url) => {
  try {
    console.log(nombre, descripcion, precio, stock, url);
    const consulta = `insert into articulos(nombre_articulo, descripcion, precio, stock, url) values ($1, $2, $3, $4, $5)`;
    const { rows, rowCount } = await pool.query(consulta, [
      nombre,
      descripcion,
      precio,
      stock,
      url,
    ]);
    console.log(rows, rowCount);
  } catch (error) {
    console.error("Login error:", error);
    res.status(error.code || 500).json({ error: error.message });
  }
};

const registarPublicacion = async (idProducto, idVendedor) => {
  try {
    //console.log(idProducto, idVendedor);
    const consulta = `insert into publicacion (id_producto, id_vendedor) values($1, $2)`;
    const { rows, rowCount } = await pool.query(consulta, [
      idProducto,
      idVendedor,
    ]);

    if (rowCount === 0) {
      const error = new Error("No se pudo registrar la publicación");
      error.code = 400;
      throw error;
    }
  } catch (error) {
    console.error("Error al registrar publicación:", error);
    throw error;
  }
};

const usuarioActual = async (email) => {
  try {
    const consulta = "select id_usuario from usuarios where email = $1";
    const { rows, rowCount } = await pool.query(consulta, [email]);

    if (rowCount === 0) {
      throw new Error("Usuario no encontrado");
    }

    return rows[0].id_usuario;
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    throw error;
  }
};

const registrarVenta = async (idPublicacion, idComprador, precio) => {
  try {
    const consulta = `insert into ventas(id_publicacion, id_comprador, precio_producto) values($1, $2, $3)`;
    const { rows, rowCount } = await pool.query(consulta, [
      idPublicacion,
      idComprador,
      precio,
    ]);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
};
const precioActual = async (idPublicacion) => {
  try {
    const consulta =
      "select precio from articulos where id_producto = (select id_producto from publicacion where id_publicacion= $1)";
    const { rows, rowCount } = await pool.query(consulta, [idPublicacion]);

    if (rowCount === 0) {
      throw new Error("producto no encontrado");
    }

    return rows[0].precio;
  } catch (error) {
    console.error("Error al obtener producto:", error);
    throw error;
  }
};

const obtenerArticulos = async (id) => {
  try {
    let consulta, valores;
    if (!id) {
      consulta = "select * from articulos";
      valores = [];
    } else {
      consulta = "select * from articulos where id_producto=$1";
      valores = [id];
    }
    const { rows, rowCount } = await pool.query(consulta, valores);
    return rows;
  } catch (error) {
    console.error("Error al obtener producto:", error);
    throw error;
  }
};

const registrarFavorito = async (idComprador, idPublicacion) => {
  try {
    const consulta =
      "insert into favoritos(id_usuario, id_publicacion)values($1, $2)";
    const { rows, rowCount } = await pool.query(consulta, [
      idComprador,
      idPublicacion,
    ]);
  } catch (error) {
    console.error("Error al Registrar Favoritos:", error);
    throw error;
  }
};

export {
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
  usuarioActual,
  precioActual,
  obtenerArticulos,
  registrarFavorito,
};
