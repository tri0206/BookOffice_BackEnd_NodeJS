import db from '../models/index';
import CRUDService from '../service/CRUDService';
let getHomePage = async (req, res) => {
    try {
        let data = await db.Reader.findAll();
        return res.render('homePage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (error) {
        console.log(error);
    }
}

let getRegister = (req, res) => {
    return res.render('register.ejs');
}
let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    console.log('...................');
    console.log(data);
    return res.render('test.ejs')
}
let postRegister = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message)
    return res.send('post register from server')
}
module.exports = {
    getHomePage: getHomePage,
    getRegister: getRegister,
    postRegister: postRegister,
    displayGetCRUD: displayGetCRUD,
}