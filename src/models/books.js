// models/book.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Book extends Model {
        static associate(models) {
            // Define associations here
            Book.belongsTo(models.Author, {
                foreignKey: 'idAuthor',
                onDelete: 'CASCADE',
            });
        }
    }
    Book.init(
        {
            title: DataTypes.STRING,
            genre: DataTypes.STRING,
            publication_date: DataTypes.DATE,
            description: DataTypes.TEXT,
            idAuthor: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            bookImg: {
                type: DataTypes.STRING,
                allowNull: true,
            }
        },
        {
            sequelize,
            modelName: 'Book',
        }
    );
    return Book;
};
