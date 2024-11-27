# Juego de memoria

## Descripción  
Este es mi proyecto final de la materia de Paginas web de la univercidad.

## Instalación  
1. Clona el repositorio:  
   ```bash  
   git clone https://github.com/TheLeon12/proyecto-final

   cd nombre-del-repo  proyecto-final

   npm install  



## Uso  
Para ejecutar el proyecto necesitaras tener Xampp instalado con la opcion de Apache y MySql activos, y crear la base de datos:

CREATE DATABASE registroDB;
USE registroDB;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    contraseña VARCHAR(255)
);

luego utiliza el siguiente comando:  
```bash  
npm start  

## instalacion 
npm install express body-parser mysql2
npm init -y
npm install express

# para correr el servidor 

node server.js
