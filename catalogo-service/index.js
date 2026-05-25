const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

// Arreglo en memoria (simulando base de datos)
const libros = [
    { id: 1, titulo: "Harry Potter y la piedra filosofal", autor: "J.K. Rowling", precio: 320, stock: 15 },
    { id: 2, titulo: "El señor de los anillos", autor: "J.R.R. Tolkien", precio: 450, stock: 7 },
    { id: 3, titulo: "1984", autor: "George Orwell", precio: 180, stock: 20 },
    { id: 4, titulo: "El principito", autor: "Antoine de Saint-Exupéry", precio: 120, stock: 25 },
    { id: 5, titulo: "Dune", autor: "Frank Herbert", precio: 380, stock: 6 }
];

// Endpoint GET /api/libros/:id
app.get('/api/libros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const libro = libros.find(l => l.id === id);

    if (libro) {
        res.status(200).json(libro);
    } else {
        res.status(404).json({ error: "Libro no encontrado" });
    }
});

// Endpoint para actualizar stock (útil para el servicio de órdenes)
app.patch('/api/libros/:id/stock', (req, res) => {
    const id = parseInt(req.params.id);
    const { cantidad } = req.body;
    const libro = libros.find(l => l.id === id);

    if (!libro) {
        return res.status(404).json({ error: "Libro no encontrado" });
    }

    if (libro.stock < cantidad) {
        return res.status(400).json({ error: "Stock insuficiente" });
    }

    libro.stock -= cantidad;
    res.status(200).json({ mensaje: "Stock actualizado", nuevoStock: libro.stock });
});

app.listen(PORT, () => {
    console.log(`Servicio de Catálogo ejecutándose en http://localhost:${PORT}`);
});

module.exports = app; // Para pruebas y Vercel
