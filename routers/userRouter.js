const express = require('express')
//const Joi = require('joi')
const validator = require('express-joi-validation').createValidator()
const usersValidator = require('../validators/usersValidator.js')
const usersController = require('../controllers/usersController.js')

const routes = (User) =>{
  const userRouter = express.Router()
  const controller = usersController(User)
  const validation = usersValidator()

  userRouter.route('/users')
  .get(validator.query(validation.querySchema), controller.getUsers)
  .post(validator.body(validation.userSchema), controller.postUser)

  userRouter.route('/users/:userId') 
  .get(validator.params(validation.userByIdSchema), controller.getUserId)
  .put(validator.params(validation.userByIdSchema), validator.body(validation.querySchema), controller.putUserId) 
  .delete(validator.params(validation.userByIdSchema), controller.deleteUserId)

  userRouter.route('/users/userName/:userName') 
  .get(validator.params(validation.querySchema), controller.getUserName)

  userRouter.route('/login')
  .post(validator.body(validation.userLogin), controller.userLogin)

  return userRouter
}

module.exports = routes