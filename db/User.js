const Sequelize = require('sequelize')
const { DataTypes } = require('sequelize')

module.exports = function (sequelize) {
    return sequelize.define('users', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        pass: {
            type: Sequelize.STRING,
            allowNull: false
        },
        role: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        money: {
            type: DataTypes.DECIMAL(11, 2),
            allowNull: false
        }
    }, {
        timestamps: false
        //чтобы не сохранялась дата создания..
    })
}