//const Register = require("../../api/auth")
//const Router = require('koa-router')
//const router = new Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const db = require('../../db/index')
const config = require('../../lib/config')
const User = db.users


exports.reg = async function (ctx) {
    try {

        const { email, password, name } = ctx.request.body

        if (!ctx.checkBody('email').isEmail().goOn) {
            ctx.throw(400, 'Bad email')
        }

        if (!ctx.checkBody('name').optional().len(2, 20).goOn) {
            ctx.throw(400, 'Bad name')
        }

        if (!ctx.checkBody('password').notEmpty().len(6).md5().goOn) {
            ctx.throw(400, 'Bad password')
        }
        const checkFindOne = await User.findOne({ where: { email: `${email}` } });
        if (checkFindOne) {
            ctx.throw(400, 'Duplicate email')
        }

        const hashedPass = await bcrypt.hash(password, 12)

        const newUser = User.build({
            username: `${name}`,
            email: `${email}`,
            pass: `${hashedPass}`,
            role: 0,
            money: 0,
        })

        await newUser.save()

        ctx.status = 201

        ctx.body = {
            success: true,
            username: newUser.username,
            userEmail: newUser.email
        }

    } catch (error) {
        ctx.status = error.status
        ctx.body = JSON.stringify(error.message)
    }
}

exports.login = async function (ctx) {
    try {

        const { email, password } = ctx.request.body

        if (!ctx.checkBody('email').isEmail().goOn) {
            ctx.throw(400, ' Bad email ')
        }

        if (!ctx.checkBody('password').notEmpty().len(1).md5().goOn) {
            ctx.throw(400, ' enter password ')
        }

        const findOne = await User.findOne({ where: { email: `${email}` } });
        if (!findOne) {
            ctx.throw(400, { message: `email not found`, succes: false })
        }

        const isMatch = await bcrypt.compare(password, findOne.pass)
        if (!isMatch) {
            ctx.throw(400, { message: `bad password`, succes: false })
        }

        const payload = {
            id: findOne.id,
            email: findOne.email,
            name: findOne.name,
            role: findOne.role,
            budget: findOne.money
        }

        //expiresIn: срок годности токена в миллисекундах
        const token = jwt.sign(payload, config.secret, {expiresIn: 3600*24})
        ctx.body = { token: `Bearer ${token}`}
        // ctx.body = {
        //     success: true,
        //     jwt: 111,
        //     email: findOne.email,
        //     name: findOne.name,
        //     role: findOne.role,
        //     budget: findOne.money
        // }

    } catch (error) {
        throw error
        // ctx.body = error.message
        // ctx.status = error.status
    }
}