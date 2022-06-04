const { Router } = require('express');

const bookController = require('../controllers/book.controller');

const router = Router();

router.post('/', bookController.createBook);
router.get('/', bookController.getAll);
router.get('/:id', bookController.getByID);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;