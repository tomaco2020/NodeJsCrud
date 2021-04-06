const Joi = require('joi')

const usersValidator = () => {
  const userSchema = Joi.object({

    firstName: Joi.string()
      .pattern(new RegExp('^[A-Za-z ]+$', 'i'))
      .min(3)
      .max(10)
      .required(),

    lastName: Joi.string()
      .pattern(new RegExp('^[A-Za-z ]+$', 'i'))
      .min(3)
      .max(10)
      .required(),

    userName: Joi.string()
      .alphanum()
      .min(3)
      .max(10),

    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .alphanum()
      .min(3)
      .max(30)
      .required(),

    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),

    address: Joi.string()
      .min(3)
      .max(30)
      .required(),

    phone: Joi.string()
      .pattern(new RegExp('^[+]?[0-9]{10,15}$'))
      .min(10)
      .max(15)
      .required(),

    dateOfBirth: Joi.date()
      .required() 

  })

  const querySchema = Joi.object({

      firstName: Joi.string()
      .pattern(new RegExp('^[A-Za-z ]+$', 'i'))
      .min(3)
      .max(10),
      

      lastName: Joi.string()
        .pattern(new RegExp('^[A-Za-z ]+$', 'i'))
        .min(3)
        .max(10),

      userName: Joi.string()
        .alphanum()
        .min(3)
        .max(10),

      password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .alphanum()
        .min(3)
        .max(30),

      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

      address: Joi.string()
        .min(3)
        .max(30),

      phone: Joi.string()
        .pattern(new RegExp('^[+]?[0-9]{10,15}$'))
        .min(10)
        .max(15),

      dateOfBirth: Joi.date()

    })

    const userByIdSchema = Joi.object({
      
      userId: Joi.string()
        .alphanum()
        .min(24)
        .max(24)
        .required()
    })

    const userLogin = Joi.object({
      
      userName: Joi.string()
        .alphanum()
        .min(3)
        .max(10)
        .required(),

      password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .min(3)
        .max(10)
        .required(),
  })

  return {userSchema, querySchema, userByIdSchema, userLogin}

}

module.exports = usersValidator

