const usersController = (User) =>{

  const getUsers = async (req , res) => {
    try {
      const {query} = req
      const response = await User.find(query)
      return res.json(response)
      
    } catch (error) {
      throw error
    }
  }

  const postUser = async (req , res) => {
    try {
      const {body} = req

      const newUserName = () =>{
          const firstName = body.firstName
          const lastName = body.lastName
          const dateOfBirth = body.dateOfBirth
          const year = new Date (dateOfBirth)
          const newYear = year.getFullYear()
          console.log(newYear)

          if (firstName && lastName){
            const firstNameCharAt = firstName.charAt(0)

            const newUserName = firstNameCharAt+lastName+newYear.toString()
            return newUserName.toLowerCase()
          }
          else {
            if (firstName == ""){
              return res.status(400).json({message:'UserName NO puede ser creado, falta firstName'})
            }
            if (lastName == ""){
              return res.status(400).json({message:'UserName NO puede ser creado, falta lastName'})
            }
          }
      }

      const userObject = {
        firstName : body.firstName,
        lastName : body.lastName,
        userName: newUserName(),
        password: body.password, 
        email: body.email,
        address: body.address,
        phone: body.phone,
        dateOfBirth: body.dateOfBirth
      }

      const user = new User(userObject)
  
      await user.save()//guarda en la base de datos
      return res.status(201).json(user)//nos retorna el estado 201 que corresponde al registro fue Creado
      
    } catch (error) {
      throw error
    }
  }

  const getUserId = async (req , res) => {
    try {
      const {params} = req
      const response = await User.findById(params.userId)
      return res.json(response)
     
    } catch (error) {
      throw error
    }
  }

  const putUserId = async(req , res) => {
    try {
      const {params , body} = req
      //const {body} = req

        const newUserName = () =>{
        const firstName = body.firstName
        const lastName = body.lastName
        const dateOfBirth = body.dateOfBirth
        const year = new Date (dateOfBirth)
        const newYear = year.getFullYear()
        console.log(newYear)
        

        if (firstName && lastName){
          const firstNameCharAt = firstName.charAt(0)

          const newUserName = firstNameCharAt+lastName+newYear.toString()
          return newUserName.toLowerCase()
        }
        else {
          if (firstName == ""){
            return res.status(400).json({message:'UserName NO puede ser creado, falta firstName'})
          }
          if (lastName == ""){
            return res.status(400).json({message:'UserName NO puede ser creado, falta lastName'})
          }
        }
      }
  
      const response = await User.updateOne({
        _id: params.userId
      }, {
        $set: {
          firstName: body.firstName,
          lastName: body.lastName,
          userName: newUserName(),
          password: body.password,
          email: body.email,
          address: body.address,
          phone: body.phone,
          dateOfBirth: body.dateOfBirth 

        }
      })
      return res.status(202).json(response) //ejecuta el update y lo devuelve, y le paso el estado del update
    } catch (error) {
      throw error
    } 
  }

  const deleteUserId = async (req , res) => {
    try {
      const {params} = req
      console.log(params)
      await User.findByIdAndDelete(params.userId)
      return res.status(202).json({message:'The user has been delete successfully'})
      
    } catch (error) {
      throw error
    }
  }

  const postLogin = async (req , res) => {
    try {
      const {body} = req //req pide el body que le paso por postman, en este caso userName y Password
      console.log('body:',body)
      const foundUser = await User.findOne({"userName" : body.userName})//devuelve a foundUser el user que busca segun el userName del body
      console.log('fondUser:',foundUser)
      if (foundUser != null){
        
        if (foundUser.password == body.password){
          return res.status(202).json({message: 'OK'}) 
        }
        else{
          return res.status(202).json({message: 'Invalid Credentials'})
        }
      }
      else{
        return res.status(202).json({message: 'User does not exist'})
      }
      
    } catch (error) {
      throw error
    }
  }

  return {getUsers, postUser, getUserId, putUserId, deleteUserId, postLogin}
}

module.exports = usersController