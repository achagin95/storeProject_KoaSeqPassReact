
const db = require('../../db/index')
const config = require('../../lib/config')
const User = db.users
const Goods = db.goods
const jwtDecode = require('jwt-decode')

exports.getAllGoods = async function (ctx) {


    try {
        const count = await Goods.count()
        if (count === 0) {
            //return ctx.body = 'Store is empty'
            return ctx.body = { message: 'Store is empty'}
            
        }
        ctx.set('x-total-count', count)
        console.log(count)
        const goods = await Goods.findAll()

        ctx.body = goods
    } catch (error) {
        ctx.status = error.status
        ctx.body = JSON.stringify(error.message)
    }


    //const { query } = ctx
    //const { skip, limit } = query
    //delete query.skip
    //delete query.limit

    //const q = 'users' in query ?
    //{ user: { $in: query.users.split(',') } } : query
    // ctx.set('x-total-count', await Post.countDocuments(q))
    // ctx.body = await Post
    //     .find(q)
    //     .sort({ createdDate: -1 })
    //     .skip(+skip)
    //     .limit(+limit)

    // const q = 'goods' in query ?
    // { goods: {$in: query.goods.split(',') } } : query
    //скорее всего $in идет от монгуса, проверить позже через построчный дебаг
    // возможно сделать придется по своему
    //ctx.set('x-total-count', await )
}

exports.getGoodById = async function (ctx) {

    try {
        const { id } = ctx.params
        const id2 = ctx.request.body.id
        const good = await Goods.findByPk(id)
        if (!good) {
            ctx.throw(404, 'not found')
        }

        ctx.body = good
    } catch (error) {
        ctx.status = error.status
        ctx.body = JSON.stringify(error.message)
    }
}

exports.createGood = async function(ctx) {
    try {
        const jwt = ctx.header.authorization.split(' ')[1]
        console.log(jwt)
        const decoded = jwtDecode(jwt)
        if (decoded.role !== 1) {
            ctx.throw(400, 'access rights error.')
        }
        const {goodname, goodprice, goodcount} = ctx.request.body
        if (!goodname) {
            ctx.throw(400, 'bad name')
        }
        if (!goodcount) {
            ctx.throw(400,'bad count')
        }
        if (!goodprice) {
            ctx.throw(400,'bad price')
        }
        const findOne = await Goods.findOne({
            where: {
                goodname: `${goodname}`
            }
        })

        if (findOne) {
            ctx.throw(400, "duplicate good's name")
        }
        
        const newGood = Goods.build({
            goodname: `${goodname}`,
            goodprice,
            goodcount
        })

        await newGood.save()
        ctx.status = 201

        ctx.body = {
            success: true,
            goodnsme: newGood.goodname,
            goodprice: newGood.goodprice,
            goodcount: newGood.goodcount
        }

    } catch (error) {
        ctx.status = error.status
        ctx.body = JSON.stringify(error.message)
    }
}

exports.deleteGoodById = async function(ctx) {
    try {
        //проверки не добавлял, т.к. в любом случай если промах по ИД,
        // то удаляем промах))
        const {_id} = ctx.params
        
        const role = ctx.state.user.role
        
        if (role !== 1) {
            ctx.throw(401, "Access error")
        }
        await Goods.destroy({
            where: {
                id: `${_id}`
            }
        })

        ctx.body = {
            deleted: true
        }
        //const user = ctx.state.user позже проверить
    } catch (error) {
        ctx.status = error.status
        ctx.body = JSON.stringify(error.message)
    }
}