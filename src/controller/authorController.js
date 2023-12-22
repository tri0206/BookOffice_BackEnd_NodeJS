import authorService from "../service/authorService"


let handleGetAllAuthors = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            author: []
        })
    }
    let authors = await authorService.getAllAuthors(id);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        authors
    })
}

let handleCreateNewAuthor = async (req, res) => {
    let message = await authorService.createNewAuthor(req.body);
    return res.status(200).json(message);
}
let handleDeleteAuthor = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters"
        })
    }
    let message = await authorService.deleteAuthor(req.body.id);
    return res.status(200).json(message);
}

let handleEditAuthor = async (req, res) => {
    let data = req.body;
    let message = await authorService.updateAuthorData(data);
    return res.status(200).json(message)

}
module.exports = {
    handleGetAllAuthors: handleGetAllAuthors,
    handleCreateNewAuthor: handleCreateNewAuthor,
    handleDeleteAuthor: handleDeleteAuthor,
    handleEditAuthor: handleEditAuthor,

}