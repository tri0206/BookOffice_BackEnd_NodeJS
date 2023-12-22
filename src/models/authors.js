module.exports = (sequelize, DataTypes) => {
    const Author = sequelize.define('Author', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        birth_date: {
            type: DataTypes.DATE,
        },
        nationality: {
            type: DataTypes.STRING,
        },
    });
    return Author;
};
