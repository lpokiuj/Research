const Book = require('../models/book.model');

module.exports = {

    createBook: async (req, res) => {
        const errorMSG = {};
        if (!req.body.name) {
            errorMSG.status = "fail";
            errorMSG.message = "Gagal menambahkan buku. Mohon isi nama buku";
            return res.status(400).json(errorMSG);
        }

        const book = new Book({
            name: req.body.name,
            year: req.body.year,
            author: req.body.author,
            summary: req.body.summary,
        });

        await book.save(book);
        const sendData = {
            status: "success",
            message: "Buku berhasil ditambahkan",
            data: {
                bookId: book.id,
            },
        };

        return res.status(201).send(sendData);
    },

    getAll: async (req, res) => {
        const bookList = await Book.find({});    
        const sendMSG = {
            status: "success",
            data: {
                books: bookList,
            },
        };
    
        return res.status(200).send(sendMSG);
    },

    getByID: async (req, res) => {
    
        const book = await books.findByID(req.params.id).exec();    
    
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

    updateBook: async (req, res) => {
        const book = await Book.findByID(req.params.id).exec();   
    
        if (!book) {
            return res.status(404).json({
                status: "fail",
                message: "Gagal memperbarui buku. Id tidak ditemukan",
            });
        }

        const errorMSG = {};
        if (!req.body.name) {
            errorMSG.status = "fail";
            errorMSG.message = "Gagal memperbarui buku. Mohon isi nama buku";
            return res.status(400).json(errorMSG);
        }
    
        book.name = req.body.name;
        book.year = req.body.year;
        book.author = req.body.author;
        book.summary = req.body.summary;
        book.updatedAt = new Date().toISOString();
        await book.save();

        return res.status(200).json({
            status: "success",
            message: "Buku berhasil diperbarui",
        });
    },

    deleteBook: async (req, res) => {
        const book = Book.find((c) => {
            return c.id === req.params.id;
        });
    
        if (!book) {
            return res.status(404).json({
                status: "fail",
                message: "Buku gagal dihapus. Id tidak ditemukan",
            });
        }
    
        await Book.deleteOne({ _id: req.params.id });
        return res.status(200).json({
            status: "success",
            message: "Buku berhasil dihapus",
        });
    }

}