import db from '../models/index'




let getAllBooks = (bookId) => {
    return new Promise(async (resolve, reject) => {

        try {
            let books = '';
            if (bookId === 'ALL') {
                books = await db.Book.findAll({
                    include: {
                        model: db.Author,
                        attributes: ['name']
                    }
                });
            }
            if (bookId && bookId !== 'ALL') {
                books = db.Book.findOne({
                    where: { id: bookId },
                    include: {
                        model: db.Author,
                        attributes: ['name']
                    }
                })
            }
            resolve(books)
        } catch (error) {
            reject(error)
        }
    })
}


let createNewBook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Book.create({
                title: data.title,
                genre: data.genre,
                publication_date: data.publication_date,
                description: data.description,
                idAuthor: data.idAuthor,
                bookImg: data.bookImg
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

let deleteBook = (bookId) => {
    return new Promise(async (resolve, reject) => {
        let foundBook = await db.Book.findOne({
            where: { id: bookId }
        })
        if (!foundBook) {
            resolve({
                errCode: 2,
                message: `The Book isn't exist`
            })
        }
        // if (Book) {

        //     await Book.detroy();
        // }
        await db.Book.destroy({
            where: { id: bookId }
        })
        resolve({
            errCode: 0,
            message: 'deleted'
        })
    })
}
let updateBookData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }
            let book = await db.Book.findOne({
                where: { id: data.id },
                raw: false
            })
            if (book) {

                book.title = data.title;
                book.genre = data.genre;
                book.publication_date = data.publication_date;
                book.description = data.description;
                book.idAuthor = data.idAuthor;
                book.bookImg = data.bookImg;
                await book.save();

                resolve({
                    errCode: 0,
                    message: 'Update succeeds'
                })

            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Book not found'
                });

            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    getAllBooks: getAllBooks,
    createNewBook: createNewBook,
    deleteBook: deleteBook,
    updateBookData: updateBookData,

}