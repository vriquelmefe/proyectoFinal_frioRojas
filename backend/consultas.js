import bcrypt from "bcryptjs";
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
  allowExitOnIdle: true,
});

const obtenerUsuario = async (email) => {
  try {
    const consulta = `select nombre,email,rol from usuarios where email = $1`;
    const { rows, rowCount } = await pool.query(consulta, [email]);

    if (!rowCount) {
      throw { message: "error al cargar informacion", code: 404 };
    }
    return rows;
  } catch (error) {
    throw error;
  }
};

const obtenerUsuarioId = async (id) => {
  try {
    const consulta = `select nombre,email from usuarios where id_usuario = $1`;
    //console.log(consulta, id);
    const { rows, rowCount } = await pool.query(consulta, [id]);
    //console.log(rowCount, rows);
    if (!rowCount) {
      throw { message: "error al cargar informacion", code: 404 };
    }
    //console.log(rows);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

const registrarUsuario = async (nombre, email, password) => {
  try {
    const passwordEncriptada = bcrypt.hashSync(password, 10);
    password = passwordEncriptada;
    const consulta = `insert into usuarios (nombre,email,rol,password) values($1,$2,$3,$4 ) returning id_usuario,nombre,email`;

    const { rows, rowCount } = await pool.query(consulta, [
      nombre,
      email,
      "usuario",
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
      error.code = 404;
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

const loginUsuario = async (email, password) => {
  const values = [email];
  const consulta = "SELECT * FROM usuarios WHERE email = $1";
  try {
    const {
      rows: [usuario],
    } = await pool.query(consulta, values);
    if (!usuario) {
      throw { code: 404, message: "Usuario no encontrado" };
    }
    const { password: passwordEncriptada } = usuario;
    const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada);
    if (!passwordEsCorrecta) {
      throw { code: 401, message: "Email o contraseña incorrecta" };
    }
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      throw { code: 500, message: "Error de conexión a la base de datos" };
    }
    throw error;
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
    const consulta = `select * from ventas where id_comprador=(select id_usuario from usuarios where email = $1)`;
    const { rows, rowCount } = await pool.query(consulta, [email]);

    // console.log(rows);
    if (!rowCount) {
      throw { message: "error al cargar informacion", code: 404 };
    }
    return rows;
  } catch (error) {
    throw error;
  }
};

const registrarArticulo = async (
  title,
  description,
  price,
  stock,
  image,
  categoria
) => {
  try {
    //console.log(nombre, descripcion, precio, stock, url);
    const consulta = `insert into articulos(nombre_articulo, descripcion, precio, stock, url,categoria) values ($1, $2, $3, $4, $5, $6)`;
    const { rows, rowCount } = await pool.query(consulta, [
      title,
      description,
      price,
      stock,
      image,
      categoria,
    ]);
    // console.log(rows, rowCount);
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

const registrarVenta = async (idComprador, total) => {
  try {
    //console.log(idComprador, total);
    const consulta = `insert into ventas( id_comprador,total_compra ) values($1, $2) returning id_venta`;
    const { rows, rowCount } = await pool.query(consulta, [idComprador, total]);

    if (rowCount === 0) {
      throw new Error("No se pudo insertar la venta.");
    }

    const idVenta = rows[0].id_venta;
    //console.log("Venta registrada con id:", idVenta);

    return idVenta;
  } catch (error) {
    console.log("exploto aqui");
    res.status(error.code || 500).send(error);
  }
};

const registrarDetalleVenta = async (
  id_venta,
  id_producto,
  cantidad,
  precio
) => {
  try {
    //console.log("En consulta", id_producto, idComprador, cantidad, precio);
    const consulta = `insert into detalle_venta( id_venta,id_producto,precio_producto,cantidad ) values($1, $2, $3,$4)`;
    const { rows, rowCount } = await pool.query(consulta, [
      id_venta,
      id_producto,
      precio,
      cantidad,
    ]);
    //console.log(rows);
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

const obtenerArticulosCategoria = async (categoria) => {
  try {
    const consulta = `select * from articulos where categoria = $1`;
    const { rows, rowCount } = await pool.query(consulta, [categoria]);
    //console.log(rows);
    return rows;
  } catch (error) {
    console.error("Error al obtener producto:", error);
    throw error;
  }
};

const obtenerArticuloPublicacion = async (id) => {
  try {
    //console.log(id);
    const consulta = `select * from articulos where id_producto = (select id_producto from publicacion where id_publicacion= $1)`;
    //console.log(consulta, id);

    const { rows, rowCount } = await pool.query(consulta, [id]);
    //console.log(rows);
    return rows[0];
  } catch (error) {
    console.error("Error al obtener producto:", error);
    throw error;
  }
};
const obtenerArticuloVentas = async (id) => {
  try {
    //console.log(id);
    const consulta = `select * from articulos where id_producto = (select id_producto from publicacion where id_publicacion= $1)`;

    const { rows, rowCount } = await pool.query(consulta, [id]);

    return rows[0];
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
const obtenerCategorias = async () => {
  try {
    const { rows, rowCount } = await pool.query(
      "SELECT categoria, MIN(id_producto) AS id_producto FROM articulos GROUP BY categoria;"
    );

    return rows;
  } catch (error) {
    console.error("Error al obtener categorias", error);
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
  obtenerUsuarioId,
  obtenerArticuloPublicacion,
  obtenerArticuloVentas,
  obtenerArticulosCategoria,
  obtenerCategorias,
  registrarDetalleVenta,
  loginUsuario,
};
