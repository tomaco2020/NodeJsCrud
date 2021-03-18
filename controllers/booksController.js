const booksController = (Book) =>{

  const getBooks = async (req , res) => {
    try {
      const {query} = req
      const response = await Book.find(query)
      return res.json(response)
    } catch (error) {
      throw error
    }
  }

  const postBook = async (req , res) => {
    try {
      const book = new Book(req.body)
  
      await book.save()//guarda en la base de datos
      return res.status(201).json(book)//nos retorna el estado 201 que corresponde al registro fue Creado
      
    } catch (error) {
      throw error
    }
  }

  const getBookId = async (req , res) => {
    try {
      const {params} = req
      const response = await Book.findById(params.bookId)
      return res.json(response)
     
    } catch (error) {
      throw error
    }
  }

  const putBookId = async(req , res) => {
    try {
      const {params , body} = req
      //const {body} = req
  
      const response = await Book.updateOne({
        _id: params.bookId
      }, {
        $set: {
          title: body.title,
          genre: body.genre,
          author: body.author,
          read: body.read
        }
      })
      return res.status(202).json(response) //ejecuta el update y lo devuelve, y le paso el estado del update
    } catch (error) {
      throw error
    } 
  }

  const deleteBookId = async (req , res) => {
    try {
      const {params} = req
      console.log(params)
      await Book.findByIdAndDelete(params.bookId)
      return res.status(202).json({message:'The book has been delete successfully'})
      
    } catch (error) {
      throw error
    }
  }

  return {getBooks, postBook, getBookId, putBookId, deleteBookId}
}

module.exports = booksController