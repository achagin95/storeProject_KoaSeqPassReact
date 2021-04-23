const Router = require('koa-router')
const passport = require('koa-passport')

const router = new Router().prefix("/api") //может добавть .prefix("/api")
const bcrypt = require('bcryptjs')

const db = require('../db/index')
const User = db.users


const authFunc = require('./functions/auth')
const storeFunc = require('./functions/storeFunc')

//авторизация
router.post('/register', async function (ctx) {
    try {
        await authFunc.reg(ctx)
    } catch (error) {
        ctx.status = 500
        ctx.body = 'Server error'
    }
})

router.post('/login', async function (ctx) {
    try {
        //console.log(ctx)
        await authFunc.login(ctx)
    } catch (error) {
        //ctx.body = error.message || 'Server error'
        ctx.body = JSON.stringify(error.message)
        ctx.status = error.status || 500
        // ctx.status = 500
        // ctx.body = 'Server error'
    }
})

//общие функции в магазине (показать товары, показать инфо о товаре)

//показать все товары (доступно для незалогиненых пользователей)
router.get('/', async (ctx) => {
    try {
        ctx.body='it works'
        await storeFunc.getAllGoods(ctx)
    } catch (error) {
        ctx.status = 500
        ctx.body = 'Server error'
    }
})

//показать товар детально (доступно для незалогиненых пользователей)
router.get('/:id', async (ctx) => {
    try {
        await storeFunc.getGoodById(ctx)
    } catch (error) {
        ctx.status = 500
        ctx.body = 'Server error'
    }
})

//удаление товара по id
router.delete('/:_id', async(ctx) => {
    //позже добавить passport.authenticate('jwt', {session:false})
    //так же добавить проверку на наличие роли админа
    try {
        //await storeFunc.deleteGoodById(ctx.params)
        await storeFunc.deleteGoodById(ctx)
    } catch (error) {
        ctx.status = 500
        ctx.body = 'Server error'
    }
})

//добавление товара
router.post('/create', passport.authenticate('jwt', {session: false}), async (ctx) => {
    //так же позже добавить проверку на авторизованный токен
    // плюс проверку на роль пользователя

    try {
        await storeFunc.createGood(ctx)
    } catch (error) {
        ctx.status = 500
        ctx.body = 'Server error'
    }
})


module.exports = router