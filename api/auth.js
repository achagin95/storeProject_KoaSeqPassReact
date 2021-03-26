const db = require('../db/index')
const User = db.users

exports.register = (email, password, name, err) => new Promise(async (res, rej) => {
    try {
        if (err) {
            res({
                success: false,
                message: err
            })
            return
        }

        const newUser = User.build({
            username: `${name}`,
            email: `${email}`,
            pass: `${password}`,
            role: 0,
            money: 0,
        })

        await newUser.save()

        res({
            success: true,
            username: `${newUser.username}`,
            userEmail: `${newUser.email}`
        })
    } catch (error) {
        rej(error)
    }
})

exports.login = (user) => new Promise(async (res, rej) => {
    
    try {
        
        res({
            success: true,
            jwt: 111,
            email: user.email,
            name: user.name,
            role: user.role,
            budget: user.money
        })

    } catch (error) {
        rej(error)
    }
})