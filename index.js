const Koa = require('koa')
//const config = require('config')
const config = require('./lib/config')
const Sequelize = require('sequelize')
const koaBody = require('koa-body')

const router = require('./router/router')

const db = require('./db')
//const PORT = config.get('port') || 5500
const PORT = config.port || 5500

const app = new Koa()
const User = db.users
require('koa-validate')(app)

app.use(koaBody())
app.use(router.routes()) //эта и след строчки описаны в документации
app.use(router.allowedMethods()) //koa-router что так нужно подключать

// app.use(async context => {
//     context.body='hw'
// })

app.listen(PORT, () => {
    console.log(`App has been started on port ${PORT}`)
})