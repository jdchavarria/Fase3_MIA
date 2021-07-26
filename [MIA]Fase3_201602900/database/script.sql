CREATE TABLE usuario(
id INTEGER generated by default as identity primary key,
username varchar2(40) unique not null,
clave varchar2(30) not null,
nombre varchar2(40),
apellido varchar2(40),
correo varchar2(60),
telefono INTEGER,
fotografia varchar2(255),
genero varchar2(1),
fecha_nacimiento date,
fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
direccion varchar2(200),
estado number(1,0),
tipo INTEGER,
credito INTEGER,
ganancia INTEGER
);

CREATE TABLE categoria(
id INTEGER generated by default as identity primary key,
nombre varchar2(60),
descripcion varchar2(255),
usua INTEGER,
padre INTEGER,
FOREIGN KEY (usua) REFERENCES usuario(id) ON DELETE CASCADE,
FOREIGN KEY (padre) REFERENCES categoria(id) ON DELETE CASCADE
);


CREATE TABLE producto(
id INTEGER generated by default as identity primary key,
imagen varchar2(255),
descripcion varchar2(255),
precio INTEGER,
fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
cantidad INTEGER,
color varchar2(100),
cat INTEGER,
FOREIGN KEY (cat) REFERENCES categoria(id) ON DELETE CASCADE
);



