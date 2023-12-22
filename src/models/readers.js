module.exports = (sequelize, DataTypes) => {
    const Reader = sequelize.define('Reader', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        typeRole: {
            type: DataTypes.STRING
        },
        keyRole: {
            type: DataTypes.STRING
        }
    });


    return Reader;
};
