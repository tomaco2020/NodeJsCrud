const express = require('express')
const booksController = require('../controllers/booksController.js')

const routes = (Book) =>{
  const bookRouter = express.Router()
  const controller = booksController(Book)
  bookRouter.route('/books') 
 
  //endpoint de GET que busca todos los documents
  .get(controller.getBooks)

  //endpoint de POST (create) crea un recurso en este caso un nuevo registro en la BD
  .post(controller.postBook)

  //endpoint de GET (read)que pasa por parametro el Id para buscarlo
  bookRouter.route('/books/:bookId') 
  .get(controller.getBookId)

  //update que pasa por parametro el Id para buscarlo
  .put(controller.putBookId) 

  .delete(controller.deleteBookId)

    return bookRouter
}

module.exports = routes //no va con parentesis por q referencia la funcion nada mas