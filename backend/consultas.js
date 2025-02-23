import pkg from "pg";
import bcrypt from "bcryptjs";
const { Pool } = pkg;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "123456",
  database: "friorojas",
  allowExitOnIdle: true,
});

export const registroUsuario = async (nombre, email, rol, password) => {
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

export const loginUsuario = async (email, password) => {
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

export const obtenerUsuario = async (email) => {
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

export const usuarioExiste = async (email) => {
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
export const verificarUsuario = async (email, password) => {
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
export const obtenerPublicaciones = async (id) => {
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

export const obtenerFavoritos = async (email) => {
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
export const obtenerVentas = async (email) => {
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

export const registrarArticulo = async (nombre, descripcion, precio, stock, url) => {
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

export const registarPublicacion = async (idProducto, idVendedor) => {
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

export const registrarVenta = async (idPublicacion, idComprador, precio) => {
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
