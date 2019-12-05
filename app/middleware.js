module.exports = async function (ctx, next) {
    //ignore favicon
    if (ctx.path === '/favicon.ico') return;
    //条件 TODO:
    if (!ctx.session.account && !ctx.request.url.includes('/login')) {
        console.warn('无效请求');
        ctx.body = '会话过期 请重新登录';
    } else {
        let str = ctx.request.method == 'get' ? ctx.request.query : ctx.request.body;
        console.debug('响应', str);
        let d = Date.now();
        await next();
        console.debug('响应', str, '耗时:', Date.now() - d, '毫秒');
    }
};
