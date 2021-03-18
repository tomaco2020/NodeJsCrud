const express = require('express')
const usersController = require('../controllers/usersController.js')

const routes = (User) =>{
  const userRouter = express.Router()
  const controller = usersController(User)

  userRouter.route('/users') 
 
  //endpoint de GET que busca todos los documents
  .get(controller.getUsers)

  //endpoint de POST (create) crea un recurso en este caso un nuevo registro en la BD
  .post(controller.postUser)

  //endpoint de GET (read)que pasa por parametro el Id para buscarlo
  userRouter.route('/users/:userId') 
  .get(controller.getUserId)

  //update que pasa por parametro el Id para buscarlo
  .put(controller.putUserId) 

  .delete(controller.deleteUserId)

  userRouter.route('/login')
  .post(controller.postLogin)

    return userRouter
}

module.exports = routes //no va con parentesis por q referencia la funcion nada mas