import bookService from "../service/bookService"


let handleGetAllBooks = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            book: []
        })
    }
    let books = await bookService.getAllBooks(id);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        books
    })
}

let handleCreateNewBook = async (req, res) => {
    let message = await bookService.createNewBook(req.body);
    return res.status(200).json(message);
}
let handleDeleteBook = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters"
        })
    }
    let message = await bookService.deleteBook(req.body.id);
    return res.status(200).json(message);
}

let handleEditBook = async (req, res) => {
    let data = req.body;
    let message = await bookService.updateBookData(data);
    return res.status(200).json(message)

}
module.exports = {
    handleGetAllBooks: handleGetAllBooks,
    handleCreateNewBook: handleCreateNewBook,
    handleDeleteBook: handleDeleteBook,
    handleEditBook: handleEditBook,

}