const Router = require('koa-router')
const router = new Router()

const db = require('../db/index')
const User = db.users


const Register = require("../api/auth")

//ниже функция для сокращения кода, пока что вернул полотно
//const registerFunc = require('./functions/register')
// router.post('/register', async function (ctx) {
//     try {
//         await registerFunc(ctx)
//     } catch (error) {
//     }
// })
//учесть, что позже код поменялся и добавилось много нового (просто скопировать)
//из метода пост/регистер в ту функцию
//вместо модуль.экспортс сделать просто экспортс.Имяфункции (как в auth.js)

router.post('/register', async function (ctx) {
    try {
        let e=''
        const {email, password, name} = ctx.request.body
        console.log(ctx.request.body)
        if (!ctx.checkBody('email').isEmail().goOn) {
            e='Bad email'
            //const result = await Register.register(email, password,name, e)
            //ctx.body=result
            ctx.status = 400
            //return
        }
 
        if(!ctx.checkBody('name').optional().len(2,20).goOn) {
            e='bad name'
            ctx.status = 400
        }

        if (!ctx.checkBody('password').notEmpty().len(6).md5().goOn) {
            e='bad password'
            ctx.status = 400
        }
        const checkFindOne = await User.findOne({ where: { email: `${email}` } });
        if (checkFindOne) {
            e='duplicate email'
            ctx.status = 400
        }

        const result = await Register.register(email, password,name,e)
        ctx.body = result

    } catch (error) {
        console.log('err', error)
        ctx.status = 500
        ctx.body = JSON.stringify(error)
        
    }
    
})

router.get('/', async(ctx) => {
    ctx.body = 'it works'
})

module.exports = router