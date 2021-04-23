const Sequelize = require('sequelize')
const { DataTypes } = require('sequelize')

module.exports = function (sequelize) {
    return sequelize.define('goods', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        goodname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        goodprice: {
            type: DataTypes.DECIMAL(11, 2),
            allowNull: false
        },
        goodcount: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
        //проще сделать отдельно Таблицу с картинками привязанными к ИД товара
        //,
        // goodImage: {
        //     //сохранение картинки на сам сервер, а в базу данных сохранение пути к картинки
        //     type: Sequelize.STRING,
        //     allowNull: false
        // }
    }, {
        timestamps: false
        //чтобы не сохранялась дата создания..
    })
}