import express from "express";
import homeController from "../controller/homeController";
import readerController from "../controller/readerController";
import authorController from "../controller/authorController";
import bookController from "../controller/bookController";
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/register', homeController.getRegister);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.post('/post-register', homeController.postRegister);
    router.get('/', (req, res) => {
        return res.send('Hello world ')
    });
    //Login
    router.post('/api/login', readerController.handleLoging);

    //Reader
    router.get('/api/get-all-readers', readerController.handleGetAllReaders);
    router.post('/api/create-new-reader', readerController.handleCreateNewReader);
    router.put('/api/edit-reader', readerController.handleEditReader);
    router.delete('/api/delete-reader', readerController.handleDeleteReader)

    //Author
    router.get('/api/get-all-author', authorController.handleGetAllAuthors);
    router.post('/api/create-new-author', authorController.handleCreateNewAuthor);
    router.put('/api/edit-author', authorController.handleEditAuthor);
    router.delete('/api/delete-author', authorController.handleDeleteAuthor)


    //Book
    router.post('/api/create-new-book', bookController.handleCreateNewBook);
    router.get('/api/get-all-books', bookController.handleGetAllBooks);
    router.put('/api/edit-book', bookController.handleEditBook);
    router.delete('/api/delete-book', bookController.handleDeleteBook)

    return app.use("/", router);
}

module.exports = initWebRoutes;