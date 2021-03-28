
const db = require('../../db/index')

//создать базу данных для товаров и импортировать ее вместо юера
//const User = db.users


exports.getAllGoods = async function (ctx) {
    const { query } = ctx
    const { skip, limit } = query
    delete query.skip
    delete query.limit

    //const q = 'users' in query ?
    //{ user: { $in: query.users.split(',') } } : query
    // ctx.set('x-total-count', await Post.countDocuments(q))
    // ctx.body = await Post
    //     .find(q)
    //     .sort({ createdDate: -1 })
    //     .skip(+skip)
    //     .limit(+limit)

    const q = 'goods' in query ?
    { goods: {$in: query.goods.split(',') } } : query
    //скорее всего $in идет от монгуса, проверить позже через построчный дебаг
    // возможно сделать придется по своему

    

}