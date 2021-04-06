const express = require('express')
const validator = require('express-joi-validation').createValidator()
const booksValidator = require('../validators/booksValidator.js')
const booksController = require('../controllers/booksController.js')

const routes = (Book) =>{
  const bookRouter = express.Router()
  const controller = booksController(Book)
  const validation = booksValidator()
  
  bookRouter.route('/books')
    .post(validator.body(validation.bookSchema), 
      controller.postBook)

    .get(validator.query(validation.querySchema), 
      controller.getBooks)
  
  bookRouter.route('/books/:bookId')
    .get(validator.params(validation.bookByIdSchema), 
      controller.getBookId)

    .put(validator.params(validation.bookByIdSchema), 
      validator.body(validation.querySchema), 
      controller.putBookId) 

    .delete(validator.params(validation.bookByIdSchema), 
      controller.deleteBookId)

  bookRouter.route('/books/title/:bookTitle') 
    .get(validator.query(validation.querySchema), 
      controller.getBookTitle)

  bookRouter.route('/books/author/:bookAuthor') 
    .get(validator.query(validation.querySchema),
      controller.getBookAuthor)

  return bookRouter
}

module.exports = routes