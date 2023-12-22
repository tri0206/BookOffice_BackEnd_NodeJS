'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Readers', [{
            name: 'Đoàn Thị Thanh Hạnh',
            email: 'admin@gmail.com',
            password: '123456',
            typeRole: 'ROLE',
            keyRole: 'R1',  //R1:admin R2:reader
            createdAt: new Date(),
            updatedAt: new Date(),
        }], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Readers', null, {});
    },
};
