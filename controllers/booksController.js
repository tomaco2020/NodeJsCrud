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
      const newBook = await Book.findOne({title : req.body.title})
      
      if (!newBook){
        const book = new Book(req.body)
        await book.save()
        return res.status(201).json(book)
      } else{
        return res.status(202)
        .json({message: newBook.title + ' - the existing Book'})
      }
      
    } catch (error) {
      throw error
    }
  }

  const getBookId = async (req , res) => {
    try {
      const {params} = req
      const response = await Book.findById(params.bookId)

      if (!response){
        return res.status(202).json({message:'The book does not exist'})
      }

      return res.json(response)
    } catch (error) {
      throw error
    }
  }

  const getBookTitle = async (req , res) => {
    try {
      const {params} = req
      const response = await Book.find({title : params.bookTitle})

      return res.json(response)
      
    } catch (error) {
      throw error
    }
  }

  const getBookAuthor = async (req , res) => {
    try {
      const {params} = req
      const response = await Book.find({author : params.bookAuthor})

      return res.json(response)
     
    } catch (error) {
      throw error
    }
  }

  const putBookId = async(req , res) => {
    try {
      const {params , body} = req

      const response = await Book.updateOne({
        _id: params.bookId
      }, {
        $set: {
          title: body.title,
          author: body.author,
          genre: body.genre,
          read: body.read
        }
      })

      if(response.n==0){
        return res.status(404).json({message:'Cant update - the book does not exist'}) 
      }
      
      return res.status(202).json(response)

    } catch (error) {
      throw error
    } 
  }

  const deleteBookId = async (req , res) => {
    try {
      const {params} = req
      
      const response = await Book.findByIdAndDelete(params.bookId)

      if (!response){
        return res.status(404).json({message:'The book does not exist'})
      }
      
      return res.status(202).json({message:'The book has been delete successfully'})
      
    } catch (error) {
      throw error
    }
  }

  return {getBooks, postBook, getBookId, getBookTitle, getBookAuthor, putBookId, deleteBookId}
}

module.exports = booksController