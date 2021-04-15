const Sequelize = require('sequelize')

const sequelize = new Sequelize('ttstoreproject', 'root', 'test', {
    dialect: "mysql",
    host: "localhost"
})

const User = require('./User')(sequelize)
const Goods = require('./Goods')(sequelize)

module.exports = {
    sequelize: sequelize,
    users: User,
    goods: Goods
}

//ниже проверка, что все установлено верно)) 
// const f =  async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// }
// f()