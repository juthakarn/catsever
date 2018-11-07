import Sequelize from 'sequelize'
exports const sequelize = new Sequelize('catserver', 'root', 'isylzjkoot', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}, () => {
    console.log('databaseconnected')
};
