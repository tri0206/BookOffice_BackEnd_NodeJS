import db from '../models/index';
import bcrypt from 'bcryptjs'
const salt = bcrypt.genSaltSync(10);
let createNewUser = async (data) => {

    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashReaderPassword(data.password)
            await db.Reader.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                name: data.name
            })

            resolve('ok create a new user succeed!');
        } catch (e) {
            reject(e);
        }
    })
}
let hashReaderPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error)
        }
    })
}
let getAllUser = () => {
    return new Promise((resolve, reject) => {
        try {
            let users = db.Reader.findAll({
                raw: true
            });
            resolve(users)
        } catch (error) {
            reject(error)
        }
    });
}
module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
}