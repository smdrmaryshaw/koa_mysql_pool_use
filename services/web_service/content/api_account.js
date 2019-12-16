//
const api_route_info = require('../../../configs/api_config');
module.exports = function (router) {
    const api = api_route_info("api_account");
    //登录
    router.get(api + 'login', async ctx => {
        const query = ctx.query;
        if (query.account == 'admin' && query.password == '123456') {
            ctx.session.account = query.account;
            ctx.body = 'get 登录成功';
        } else {
            ctx.body = 'get 账号或密码错误';
        }
    });
    router.post(api + 'login', async ctx => {
        const query = ctx.request.body;
        if (query.account == 'admin' && query.password == '123456') {
            ctx.session.account = query.account;
            ctx.body = 'post 登录成功';
        } else {
            ctx.body = 'post 账号或密码错误';
        }
    });

    //主页
    router.get(api + 'home', async ctx => {
        ctx.body = '主页';
    });

    //退出登录
    router.get(api + 'exit', async ctx => {
        ctx.session = null;
        ctx.body = '退出登录成功';
    });

    //请求
    router.get(api + 'ok', async ctx => {
        console.log('GET请求的数据', ctx.query.ok);
        ctx.body = 'Hello Router' + ctx.query.ok;
    });
    router.post(api + 'ok', async ctx => {
        const postData = ctx.request.body
        console.log('POST请求的数据', postData);
        ctx.body = 'success';
    });
};
