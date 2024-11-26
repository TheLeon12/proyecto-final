# introducion a  mi proyecto 
>Juego de memoria 

>Estes es un proyecto final para la univercidad que consta de un juego de memoria 

# Herramientas utilizadas 

> Visual Estudio Code 
>XXAMPP

# Lenguajes de programacion utilizados 

>HTML
>CSS
>JavaScript
>Sql

# Requerimientos 

>Es necesario tener el XAMPP Y crear la siguiente base de datos y tabla

CREATE DATABASE registroDB;
USE registroDB;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    contraseña VARCHAR(255)
);


