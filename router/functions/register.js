const Register = require("../../api/auth")

module.exports = async function (ctx) {
    try {
        let e=''
        const {email, password, name} = ctx.request.body
        console.log(ctx.request.body)
        if (!ctx.checkBody('email').isEmail('Bad email').goOn) {
            e='Bad email'
            const result = await Register.register(email, password,name, e)
            ctx.body=result
            ctx.status = 400
            return
        }
 
        const checkname= ctx.checkBody('name').optional().len(2,20,'are you kidding?')
        const checkPass = ctx.checkBody('password').notEmpty().len(3,20).md5()

        const result = await Register.register(email, password,name,e)
        ctx.body = result
    } catch (error) {
        //console.log('err', error)
        ctx.status = 500
        //ctx.body = JSON.stringify(error)
        const result = await Register.register('','','', error)
        ctx.body = result
        //позже исправить текст ошибки
    }
}