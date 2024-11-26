const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

// Crear aplicación de Express
const app = express();

// Habilitar CORS y configurar body-parser
app.use(cors());
app.use(bodyParser.json());

// Configurar la conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'registroDB'
});

// Conectar a la base de datos
db.connect(err => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL');
});

// Ruta para registrar un nuevo usuario
app.post('/registrar', (req, res) => {
    const { nombre, apellido, email, contraseña } = req.body;

    const checkQuery = 'SELECT * FROM usuarios WHERE email = ?';
    db.query(checkQuery, [email], (err, result) => {
        if (err) {
            console.error('Error al verificar el usuario:', err);
            return res.status(500).json({ message: 'Error al verificar el usuario' });
        }

        if (result.length > 0) {
            return res.status(400).json({ message: 'Este correo ya está registrado' });
        }

        const insertQuery = 'INSERT INTO usuarios (nombre, apellido, email, contraseña) VALUES (?, ?, ?, ?)';
        db.query(insertQuery, [nombre, apellido, email, contraseña], (err, result) => {
            if (err) {
                console.error('Error al insertar datos:', err);
                return res.status(500).json({ message: 'Error al registrar el usuario' });
            }
            res.status(200).json({ message: 'Usuario registrado correctamente' });
        });
    });
});

// Ruta para iniciar sesión
app.post('/login', (req, res) => {
    const { email, contraseña } = req.body;

    const query = 'SELECT * FROM usuarios WHERE email = ? AND contraseña = ?';
    db.query(query, [email, contraseña], (err, result) => {
        if (err) {
            console.error('Error al verificar el inicio de sesión:', err);
            return res.status(500).json({ message: 'Error en el servidor' });
        }

        if (result.length > 0) {
            const user = result[0];  // Asumiendo que el primer resultado es el usuario correcto
            res.status(200).json({ 
                message: 'Inicio de sesión exitoso',
                user: { nombre: user.nombre }  // Enviar el nombre del usuario
            });
        } else {
            res.status(401).json({ message: 'Correo o contraseña incorrectos' });
        }
    });
});


// Puerto: 4000
const port = 4000;
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
