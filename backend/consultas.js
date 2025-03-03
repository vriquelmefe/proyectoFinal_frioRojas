const { Pool } = require("pg");
const bcrypt = require("bcryptjs");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "password",
  port: 5433,
  database: "friorojas",
  allowExitOnIdle: true,
});

// Registro de usuario
const registroUsuario = async (nombre, email, rol, password) => {
  try {
    const passwordEncriptada = bcrypt.hashSync(password);
    password = passwordEncriptada;
    const consulta = `INSERT INTO usuarios (nombre, email, rol, password) VALUES ($1, $2, $3, $4)`;
    const valores = [nombre, email, rol, passwordEncriptada];
    await pool.query(consulta, valores);
  } catch (error) {
    throw { code: 500, status: "No se pudo registrar el usuario" };
  }
};

// Login de usuario
const loginUsuario = async (email, password) => {
  const values = [email];
  const consulta = "SELECT * FROM usuarios WHERE email = $1";
  const {
    rows: [usuario],
  } = await pool.query(consulta, values);
  const { password: passwordEncriptada } = usuario;
  const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada);
  if (!passwordEsCorrecta) {
    throw { code: 401, message: "Email o contraseña incorrecta" };
  }
};

// Obtener un usuario
const obtenerUsuario = async (email) => {
  const values = [email];
  const consulta = "SELECT * FROM usuarios WHERE email = $1";
  const { rows } = await pool.query(consulta, values);
  return rows[0];
};

// Ingresa una publicación
const ingresarPublicacion = async (id_producto, id_usuario) => {
  try {
    const consulta = `INSERT INTO publicaciones (id_producto, id_usuario) VALUES ($1, $2)`;
    const valores = [id_producto, id_usuario];
    await pool.query(consulta, valores);
  } catch (error) {
    throw { code: 500, status: "No se pudo ingresar la publicación" };
  }
};

// Obtener publicaciones
const obtenerPublicaciones = async () => {
  try {
    const result = await pool.query("SELECT * FROM publicaciones");
    return result.rows;
  } catch (err) {
    console.error("Error en la consulta:", err);
    throw err;
  }
};

// Obtener una publicación por ID
const obtenerPublicacionPorId = async (id) => {
  try {
    const values = [id];
    const consulta = "SELECT * FROM publicaciones WHERE id = $1";
    const result = await pool.query(consulta, values);
    return result.rows[0];
  } catch (err) {
    console.error("Error en la consulta:", err);
    throw err;
  }
};

// Ingresar articulo
const ingresarArticulo = async (
  titulo_nombre,
  descripcion,
  precio,
  stock,
  url_imagen
) => {
  try {
    const consulta = `INSERT INTO articulos (titulo_nombre, descripcion, precio, stock, url_imagen) VALUES ($1, $2, $3, $4, $5)`;
    const valores = [titulo_nombre, descripcion, precio, stock, url_imagen];
    await pool.query(consulta, valores);
  } catch (error) {
    throw { code: 500, status: "No se pudo ingresar el artículo" };
  }
};

// Obtener articulos
const obtenerArticulos = async () => {
  try {
    const result = await pool.query("SELECT * FROM articulos");
    return result.rows;
  } catch (err) {
    console.error("Error en la consulta:", err);
    throw err;
  }
};

// Obtener un articulo por ID
const obtenerArticuloPorId = async (id) => {
  try {
    const values = [id];
    const consulta = "SELECT * FROM articulos WHERE id_producto = $1";
    const result = await pool.query(consulta, values);
    return result.rows[0];
  } catch (err) {
    console.error("Error en la consulta:", err);
    throw err;
  }
};

// Ingresar venta
const ingresarVenta = async (id_publicacion, id_usuario_comprador) => {
  try {
    const consulta = `INSERT INTO ventas (id_publicacion, id_usuario_comprador) VALUES ($1, $2)`;
    const valores = [id_publicacion, id_usuario_comprador];
    await pool.query(consulta, valores);
  } catch (error) {
    throw { code: 500, status: "No se pudo ingresar la venta" };
  }
};

// Obtener ventas
const obtenerVentas = async () => {
  try {
    const result = await pool.query("SELECT * FROM ventas");
    return result.rows;
  } catch (err) {
    console.error("Error en la consulta:", err);
    throw err;
  }
};

// Obtener ventas por id
const obtenerVentasPorId = async (id) => {
  try {
    const values = [id];
    const consulta = "SELECT * FROM ventas WHERE id_venta = $1";
    const result = await pool.query(consulta, values);
    return result.rows[0];
  } catch (err) {
    console.error("Error en la consulta:", err);
    throw err;
  }
};

// Ingresar favorito
const ingresarFavorito = async (id_usuario, id_publicacion) => {
  try {
    const consulta = `INSERT INTO favoritos (id_usuario, id_publicacion) VALUES ($1, $2)`;
    const valores = [id_usuario, id_publicacion];
    await pool.query(consulta, valores);
  } catch (error) {
    throw { code: 500, status: "No se pudo ingresar el favorito" };
  }
};

// Obtener favoritos por id
const obtenerFavoritosPorId = async (id) => {
  try {
    const values = [id];
    const consulta = "SELECT * FROM favoritos WHERE id_usuario = $1";
    const result = await pool.query(consulta, values);
    return result.rows;
  } catch (err) {
    console.error("Error en la consulta:", err);
    throw err;
  }
};

module.exports = {
  registroUsuario,
  loginUsuario,
  obtenerUsuario,
  ingresarPublicacion,
  obtenerPublicaciones,
  obtenerPublicacionPorId,
  ingresarArticulo,
  obtenerArticulos,
  obtenerArticuloPorId,
  ingresarVenta,
  obtenerVentas,
  obtenerVentasPorId,
  ingresarFavorito,
  obtenerFavoritosPorId,
};
