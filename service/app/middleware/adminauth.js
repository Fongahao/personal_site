module.exports = options => {
    return async function adminauth(ctx, next) {
        console.log(options, next.toString(), 'options')
        console.log(ctx.originalUrl, '123456')
        console.log(ctx.session, 'ctx.session.openId)')
        if (ctx.session.openId) {
            await next()
        } else {
            ctx.body = { data: "没有登录" };
        }
    }
}