const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');

router.get('/', booksController.getAllBooks);
router.get('/:id', booksController.getBookById);
router.get('/search', booksController.getBooksByCharacter);
router.get('/genres', booksController.getAllGenres);
router.get('/characters', booksController.getAllCharacters);
router.post('/', booksController.addBook);
router.delete('/:id', booksController.deleteBook);
router.put('/:id', booksController.updateBook);

module.exports = router;