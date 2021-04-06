const Joi = require('joi')

const booksValidator = () => {
  
  const bookSchema = Joi.object({

    title: Joi.string()
      .pattern(new RegExp('^[A-Z0-9 ]+$', 'i'))
      .min(3)
      .max(30)
      .required(),
  
    author: Joi.string()
      .pattern(new RegExp('^[A-Za-z ]+$', 'i'))
      .min(3)
      .max(15)
      .required(),
  
    genre: Joi.string()
      .pattern(new RegExp('^[A-Za-z ]+$', 'i'))
      .min(3)
      .max(10)
      .required(),
  
    read: Joi.boolean()
      .required()
  })
  
  const querySchema = Joi.object({

    title: Joi.string()
      .min(3)
      .max(30),
  
    author: Joi.string()
      .min(3)
      .max(15),
  
    genre: Joi.string()
      .min(3)
      .max(10),

    read: Joi.boolean()
  })

  const bookByIdSchema = Joi.object({
    
    bookId: Joi.string()
      .alphanum()
      .min(24)
      .max(24)
      .required()
  })

  return {bookSchema, querySchema, bookByIdSchema}

}

module.exports = booksValidator

