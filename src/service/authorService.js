import db from '../models/index'




let getAllAuthors = (authorId) => {
    return new Promise(async (resolve, reject) => {

        try {
            let authors = '';
            if (authorId === 'ALL') {
                authors = await db.Author.findAll();
            }
            if (authorId && authorId !== 'ALL') {
                authors = db.Author.findOne({
                    where: { id: authorId }
                })
            }
            resolve(authors)
        } catch (error) {
            reject(error)
        }
    })
}


let createNewAuthor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Author.create({
                name: data.name,
                birth_date: data.birth_date,
                nationality: data.nationality
            })
            resolve({
                errCode: 0,
                message: 'Done!!'
            })


        } catch (error) {
            resolve({
                errCode: 3,
                message: 'Ok'
            })
        }
    })
}

let deleteAuthor = (authorId) => {
    return new Promise(async (resolve, reject) => {
        let foundAuthor = await db.Author.findOne({
            where: { id: authorId }
        })
        if (!foundAuthor) {
            resolve({
                errCode: 2,
                message: `The author isn't exist`
            })
        }
        // if (author) {

        //     await author.detroy();
        // }
        await db.Author.destroy({
            where: { id: authorId }
        })
        resolve({
            errCode: 0,
            message: 'deleted'
        })
    })
}
let updateAuthorData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }
            let author = await db.Author.findOne({
                where: { id: data.id },
                raw: false
            })
            if (author) {

                author.name = data.name;
                author.birth_date = data.birth_date;
                author.nationality = data.nationality
                await author.save();

                resolve({
                    errCode: 0,
                    message: 'Update succeeds'
                })

            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'author not found'
                });

            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    getAllAuthors: getAllAuthors,
    createNewAuthor: createNewAuthor,
    deleteAuthor: deleteAuthor,
    updateAuthorData: updateAuthorData,

}