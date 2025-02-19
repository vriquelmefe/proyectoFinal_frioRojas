Create Database frioRojas;
\c friorojas;

create table usuarios( 
	id_usuario serial PRIMARY key, 
	nombre varchar(50)not NULL, 
	email varchar(50)not null UNIQUE,
	rol varchar(20)not null, 
	password text not null );

create table articulos(
	id_producto serial primary key,
	nombre_articulo varchar(50) not null, 
	descripcion text not null, 
	precio decimal(10,2) not null CHECK (precio >= 0), 
	stock int not null CHECK (stock >= 0), 
	url varchar(255) not null
	);	
	
create table publicacion(
	id_publicacion serial primary key,
	id_producto int not null,
	id_vendedor int not null,
	FOREIGN key (id_producto) references articulos(id_producto) on delete cascade,
	FOREIGN key (id_vendedor) references usuarios(id_usuario) on delete cascade
);

create table favoritos(
	id_usuario int not null,
	id_publicacion int not null,
	FOREIGN key (id_usuario) references usuarios(id_usuario) on delete cascade,
	FOREIGN key (id_publicacion)references publicacion(id_publicacion) on delete cascade,
	PRIMARY KEY (id_usuario, id_publicacion)
);

create table ventas(
	id_venta serial primary key,
	id_publicacion int not null,
	id_comprador int not null,
	precio_producto decimal(10,2) not null check (precio_producto>=0),
	FOREIGN KEY (id_publicacion) REFERENCES publicacion(id_publicacion),
	FOREIGN key (id_comprador) REFERENCES usuarios(id_usuario) on delete cascade
);