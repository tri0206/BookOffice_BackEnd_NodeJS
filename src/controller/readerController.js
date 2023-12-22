import readerService from "../service/readerService"

let handleLoging = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }
    let readerData = await readerService.handleReaderLogin(email, password)

    return res.status(200).json({
        errCode: readerData.errCode,
        message: readerData.errMessage,
        reader: readerData.reader ? readerData.reader : {}
    })
}
let handleGetAllReaders = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            reader: []
        })
    }
    let readers = await readerService.getAllReaders(id);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        readers
    })
}

let handleCreateNewReader = async (req, res) => {
    let message = await readerService.createNewReader(req.body);
    return res.status(200).json(message);
}
let handleDeleteReader = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters"
        })
    }
    let message = await readerService.deleteReader(req.body.id);
    return res.status(200).json(message);
}

let handleEditReader = async (req, res) => {
    let data = req.body;
    let message = await readerService.updateReaderData(data);
    return res.status(200).json(message)

}
module.exports = {
    handleLoging: handleLoging,
    handleGetAllReaders: handleGetAllReaders,
    handleCreateNewReader: handleCreateNewReader,
    handleDeleteReader: handleDeleteReader,
    handleEditReader: handleEditReader,

}