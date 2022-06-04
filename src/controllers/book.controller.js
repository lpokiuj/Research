const books = require('../models/book.model');

const nanoid = require("nanoid").nanoid;

module.exports = {

    createBook: (req, res) => {
        // Error
        const errorMSG = {};
        if (!req.body.name) {
            errorMSG.status = "fail";
            errorMSG.message = "Gagal menambahkan buku. Mohon isi nama buku";
            return res.status(400).json(errorMSG);
        }

        const book = {
            id: nanoid(),
            name: req.body.name,
            year: req.body.year,
            author: req.body.author,
            summary: req.body.summary,
            insertedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        books.push(book);
        const sendData = {
            status: "success",
            message: "Buku berhasil ditambahkan",
            data: {
                bookId: book.id,
            },
        };

        return res.status(201).send(sendData);
    },

    getAll: (req, res) => {    
        const sendMSG = {
            status: "success",
            data: {
                books: books,
            },
        };
    
        return res.status(200).send(sendMSG);
    },

    getByID: (req, res) => {
    
        const book = books.find((c) => {
            return c.id === req.params.id;
        });
    
        if (book) {
            return res.status(200).json({
                status: "success",
                data: { book: book },
            });
        } else {
            return res.status(404).json({
                status: "fail",
                message: "Buku tidak ditemukan",
            });
        }
    },

    updateBook: (req, res) => {
        // Error not found (404)
        const book = books.find((c) => {
            return c.id === req.params.id;
        });
    
        if (!book) {
            return res.status(404).json({
                status: "fail",
                message: "Gagal memperbarui buku. Id tidak ditemukan",
            });
        }
    
        // Error fail (400)
        const errorMSG = {};
        if (!req.body.name) {
            errorMSG.status = "fail";
            errorMSG.message = "Gagal memperbarui buku. Mohon isi nama buku";
            return res.status(400).json(errorMSG);
        }
    
        // Success
        for (let i = 0; i < books.length; i++) {
            if (req.params.id === books[i].id) {
                books[i].name = req.body.name;
                books[i].year = req.body.year;
                books[i].author = req.body.author;
                books[i].summary = req.body.summary;
                books[i].updatedAt = new Date().toISOString();
            }
        }
        return res.status(200).json({
            status: "success",
            message: "Buku berhasil diperbarui",
        });
    },

    deleteBook: (req, res) => {
        const book = books.find((c) => {
            return c.id === req.params.id;
        });
    
        if (!book) {
            return res.status(404).json({
                status: "fail",
                message: "Buku gagal dihapus. Id tidak ditemukan",
            });
        }
    
        const index = books.indexOf(book);
        books.splice(index, 1);
    
        return res.status(200).json({
            status: "success",
            message: "Buku berhasil dihapus",
        });
    }

}