const Router = require('koa-router')
const router = new Router()
const bcrypt = require('bcryptjs')

const db = require('../db/index')
const User = db.users


const authFunc = require('./functions/auth')

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
        await authFunc.login(ctx)
    } catch (error) {
        ctx.status = 500
        ctx.body = 'Server error'
    }
})


// router.post('/register', async function (ctx) {
//     try {

//         const { email, password, name } = ctx.request.body

//         if (!ctx.checkBody('email').isEmail().goOn) {
//             ctx.throw(400, 'Bad email')
//         }

//         if (!ctx.checkBody('name').optional().len(2, 20).goOn) {
//             ctx.throw(400, 'Bad name')
//         }

//         if (!ctx.checkBody('password').notEmpty().len(6).md5().goOn) {
//             ctx.throw(400, 'Bad password')
//         }
//         const checkFindOne = await User.findOne({ where: { email: `${email}` } });
//         if (checkFindOne) {
//             ctx.throw(400, 'Duplicate email')
//         }

//         const hashedPass = await bcrypt.hash(password, 12)

//         const newUser = User.build({
//             username: `${name}`,
//             email: `${email}`,
//             pass: `${hashedPass}`,
//             role: 0,
//             money: 0,
//         })

//         await newUser.save()

//         ctx.body = {
//             success: true,
//             username: newUser.username,
//             userEmail: newUser.email
//         }

//     } catch (error) {
//         ctx.status = error.status
//         ctx.body = JSON.stringify(error.message)
//     }

// })

// router.post('/login', async function (ctx) {
//     try {

//         const { email, password } = ctx.request.body

//         if (!ctx.checkBody('email').isEmail().goOn) {
//             ctx.throw(400, ' Bad email ')
//         }

//         if (!ctx.checkBody('password').notEmpty().len(1).md5().goOn) {
//             ctx.throw(400, ' enter password ')
//         }

//         const findOne = await User.findOne({ where: { email: `${email}` } });
//         if (!findOne) {
//             ctx.throw(400, { message: `email not found`, succes: false })
//         }

//         const isMatch = await bcrypt.compare(password, findOne.pass)
//         if (!isMatch) {
//             ctx.throw(400, { message: `bad password`, succes: false })
//         }

//         //const result = await AuthModule.login(findOne)
//         //ctx.body = result
//         ctx.body = {
//             success: true,
//             jwt: 111,
//             email: findOne.email,
//             name: findOne.name,
//             role: findOne.role,
//             budget: findOne.money
//         }

//     } catch (error) {
//         ctx.status = error.status
//         //ctx.body = JSON.stringify(error.message)
//         ctx.body = error.message
//     }

// })

router.get('/', async (ctx) => {
    ctx.body = 'it works'
})

module.exports = router