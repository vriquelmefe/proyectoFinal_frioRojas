import pkg from "pg";
import bcrypt from "bcryptjs";

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

const registrarUsuario = async (nombre, email, password, rol) => {
  try {
    const passwordEncriptada = bcrypt.hashSync(password);
    password = passwordEncriptada;
    const consulta = `insert into usuarios (nombre,email,rol,password) values($1,$2,$3,$4 )`;
    //console.log(password);
    const { rows, rowCount } = await pool.query(consulta, [
      nombre,
      email,
      rol,
      password,
    ]);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
};
const usuarioExiste = async (email) => {
  try {
    const consulta = `select * from usuarios where email = $1`;
    const { rows, rowCount } = await pool.query(consulta, [email]);
    if (rowCount) {
      throw { message: "Usuario Ya Existe" };
    }
  } catch (error) {
    res.json(error);
  }
};
const verificarUsuario = async (email, password) => {
  try {
    const consulta = `select * from usuarios where email = $1`;
    const values = [email];
    const { rows, rowCount } = await pool.query(consulta, values);
    if (rowCount === 0) {
      throw { code: 401, message: "Usuario no Existe" };
    }
    const usuario = rows[0];
    const { password: passwordEncriptada } = usuario;

    const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada);

    if (!passwordEsCorrecta)
      throw { code: 401, message: "contraseña incorrecta" };
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
    if (!id) {
      consulta = "select * from publicaciones";
      const { rows, rowCount } = await pool.query(consulta);
    }
    if (id) {
      consulta = `select * from publicaciones where id = $1`;
      const { rows, rowCount } = await pool.query(consulta, [id]);
    }
    if (!rowCount) {
      throw { message: "error al cargar informacion", code: 404 };
    }
    return rows;
  } catch (error) {
    throw error;
  }
};

const obtenerFavoritos = async (email) => {
  try {
    consulta = `select * from favoritos where email = $1`;
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
    consulta = `select * from ventas where email = $1`;
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
    consulta = `insert into articulos(nombre, descripcion, precio, stock, url) values ($1, $2, $3, $4, $5)`;
    const { rows, rowCount } = await pool.query(consulta, [
      nombre,
      descripcion,
      precio,
      stock,
      url,
    ]);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
};

const registarPublicacion = async (idProducto, idVendedor) => {
  try {
    consulta = `insert into publicacion (id_producto, id_vendedor) values($1, $2)`;
    const { rows, rowCount } = await pool.query(consulta, [
      idProducto,
      idVendedor,
    ]);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
};

const registrarVenta = async (idPublicacion, idComprador, precio) => {
  try {
    consulta = `insert into ventas(id_publicacion, id_comprador, precio_producto values($1, $2, $3))`;
    const { rows, rowCount } = await pool.query(consulta, [
      idPublicacion,
      idComprador,
      precio,
    ]);
  } catch (error) {
    res.status(error.code || 500).send(error);
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
};
