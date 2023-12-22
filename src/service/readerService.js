import db from '../models/index'
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

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
let handleReaderLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let readerData = {};
            let isExist = await checkReaderEmail(email);
            if (isExist) {
                let reader = await db.Reader.findOne({
                    attributes: ['email', 'password'],
                    where: { email: email },
                    raw: true,
                });
                if (reader) {
                    let check = await bcrypt.compare(password, reader.password);
                    if (check) {
                        readerData.errCode = 0;
                        readerData.errMessage = 'Ok';
                        readerData.reader = reader;
                    } else {
                        readerData.errCode = 3;
                        readerData.errMessage = 'Wrong password!';
                    }
                } else {
                    readerData.errCode = 2;
                    readerData.errMessage = 'Reader not found';
                }

            } else {
                readerData.errCode = 1;
                readerData.errMessage = `Your Email isn't exist in your system. Please try other email!`
            }
            resolve(readerData)
        } catch (error) {
            reject(error)
        }
    })
}

let checkReaderEmail = (readerEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let reader = await db.Reader.findOne({
                where: { email: readerEmail }
            })
            if (reader) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}


let getAllReaders = (readerId) => {
    return new Promise(async (resolve, reject) => {

        try {
            let readers = '';
            if (readerId == 'ALL') {
                readers = await db.Reader.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (readerId && readerId !== 'ALL') {
                readers = db.Reader.findOne({
                    where: { id: readerId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(readers)
        } catch (error) {
            reject(error)
        }
    })
}


let createNewReader = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //check email is exist
            let check = await checkReaderEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is alreader in used, please try another email'
                })
            }
            else {

                let hashPasswordFromBcrypt = await hashReaderPassword(data.password)
                await db.Reader.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    name: data.name
                })
                resolve({
                    errCode: 0,
                    message: 'Done!!'
                })
            }


        } catch (error) {
            resolve({
                errCode: 3,
                message: 'Ok'
            })
        }
    })
}

let deleteReader = (readerId) => {
    return new Promise(async (resolve, reject) => {
        let foundReader = await db.Reader.findOne({
            where: { id: readerId }
        })
        if (!foundReader) {
            resolve({
                errCode: 2,
                message: `The reader isn't exist`
            })
        }
        // if (reader) {

        //     await reader.detroy();
        // }
        await db.Reader.destroy({
            where: { id: readerId }
        })
        resolve({
            errCode: 0,
            message: 'deleted'
        })
    })
}
let updateReaderData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }
            let reader = await db.Reader.findOne({
                where: { id: data.id },
                raw: false
            })
            if (reader) {

                reader.name = data.name;
                await reader.save();

                resolve({
                    errCode: 0,
                    message: 'Update succeeds'
                })

            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Reader not found'
                });

            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    handleReaderLogin: handleReaderLogin,
    getAllReaders: getAllReaders,
    createNewReader: createNewReader,
    deleteReader: deleteReader,
    updateReaderData: updateReaderData,

}