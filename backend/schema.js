//get Usuarios
response = {
  type: "object",
  properties: {
    usuario: {
      type: "object",
      properties: {
        nombre: {
          type: "string",
        },
        correo: {
          type: "string",
          format: "email",
        },
        rol: {
          type: "string",
        },
      },
      required: ["nombre", "correo", "rol"],
    },
  },
  required: ["usuario"],
};

// get publicaciones
response = {
  type: "object",
  properties: {
    publicaciones: {
      type: "array",
    },
  },
  required: ["publicaciones"],
};

//get Ventas:id
//get favoritos:id
// get publicaciones:id

// post Login
request = payload = {
  type: "object",
  properties: {
    nombre: {
      type: "string",
    },
    clave: {
      type: "string",
    },
  },
  required: ["nombre", "clave"],
};

response = {
  type: "object",
  required: ["token", "user"],
  properties: {
    token: {
      type: "string",
    },
    user: {
      type: "object",
      required: ["email"],
      properties: {
        email: {
          type: "string",
        },
      },
    },
  },
};

//post register
request = payload = {
  type: "object",
  properties: {
    nombre: {
      type: "string",
    },
    email: {
      type: "string",
    },
    clave: {
      type: "string",
    },
    rol: {
      type: "string",
    },
  },
  required: ["nombre", "email", "clave", "rol"],
};

response = {
  type: "object",
  properties: {
    token: {
      type: "string",
    },
    email: {
      type: "string",
    },
  },
  required: ["token", "email"],
};

//post articulos
request = payload = {
  type: "object",
  properties: {
    nombre: {
      type: "string",
    },
    Descripcion: {
      type: "string",
    },
    Precio: {
      type: "string",
    },
    Stock: {
      type: "string",
    },
    Url: {
      type: "string",
    },
  },
  required: ["nombre", "Descripcion", "Precio", "Stock", "Url"],
};
Header = {
  type: "object",
  properties: {
    Authorization: {
      type: "string",
    },
    "Content-Type": {
      type: "string",
    },
  },
  required: ["Authorization", "Content-Type"],
};
response = {
  type: "object",
  properties: {
    message: {
      type: "string",
      const: "Producto registrado con exito",
    },
  },
  required: ["message"],
};

//post publicacion
request = payload = {
  type: "object",
  properties: {
    id_producto: {
      type: "string",
    },
    id_vendedor: {
      type: "string",
    },
  },
  required: ["id_producto", "id_vendedor"],
};
header = {
  type: "object",
  properties: {
    Authorization: {
      type: "string",
    },
    "Content-Type": {
      type: "string",
    },
  },
  required: ["Authorization", "Content-Type"],
};
response = {
  type: "object",
  properties: {
    id_producto: { type: "number" },
    id_vendedor: { type: "number" },
    id_publicacion: { type: "number" },
  },
  required: ["id_producto", "id_vendedor", "id_publicacion"],
};

//post ventas
request = payload = {
  type: "object",
  properties: {
    id_publicacion: {
      type: "string",
    },
    id_comprador: {
      type: "string",
    },
    precioCompra: {
      type: "string",
    },
  },
  required: ["id_publicacion", "id_comprador", "precioCompra"],
};
header = {
  type: "object",
  properties: {
    Authorization: {
      type: "string",
    },
    "Content-Type": {
      type: "string",
    },
  },
  required: ["Authorization", "Content-Type"],
};
response = {
  type: "object",
  properties: {
    message: {
      type: "string",
      const: "Venta registrada con éxito",
    },
  },
  required: ["message"],
};
