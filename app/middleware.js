module.exports = async function (ctx, next) {
    //条件 TODO:
    if(false){
        console.warn('无效操作');
        ctx.body = 'Invalid request';
    }
    else{
        console.debug('响应', ctx.request.url);
        let d = Date.now();
        await next();
        console.debug('响应', ctx.request.url, '耗时:', Date.now() - d, '毫秒');
    }
};
