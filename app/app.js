'use struct'
//demo koa web service
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const session = require('koa-session');
//用户自定义中间件
const middleWare = require('./middleware');

const app = new Koa();
const router = Router();

app.keys = ['7E24107E2C629C2E83AA049F7CA1F173'];
const CONFIG = {
    key: 'koa:sess',            // 返给浏览器 cookie 的key 默认是 'kao:sess'
    maxAge: 7 * 86400000,       // cookie的过期时间 maxAge in ms (default is 1 days)
    autoCommit: true,           // (boolean) 自动给客户端下发cookie 并设置session
    overwrite: true,            // 是否可以覆盖之前同名的cookie    (默认default true)
    httpOnly: true,             // cookie是否只有服务器端可以访问 httpOnly or not (default true)
    signed: true,               // 签名默认true
    rolling: false,             // 在每次响应时强制设置session标识符cookie，到期时被重置设置过期倒计时。（默认为false）
    renew: false,               // 当session快过期时更新session，这样就可以始终保持用户登录 默认是false
};
app.use(session(CONFIG, app));

//跨域访问组件
app.use(cors());
//使用ctx.body解析中间件
app.use(bodyParser());
//用户中间件
app.use(middleWare);
//路由组件
app.use(router.routes());
app.use(router.allowedMethods());

//在线调试 http 请求 http://www.ojit.com/httptest
//登录
router.get('/login', async ctx => {
    const query = ctx.query;
    if(query.account == 'admin' && query.password == '123456'){
        ctx.session.account = query.account;
        ctx.body = '登录成功';
    }else{
        ctx.body = '账号或密码错误';
    }
});
router.post('/login', async ctx => {
    const query = ctx.request.body;
    if(query.account == 'admin' && query.password == '123456'){
        ctx.session.account = query.account;
        ctx.body = '登录成功';
    }else{
        ctx.body = '账号或密码错误';
    }
});

//主页
router.get('/home', async ctx=>{
    ctx.body = '主页';
});

//退出登录
router.get('/exit', async ctx=>{
    ctx.session = null;
    ctx.body = '退出登录成功';
});

//请求
router.get('/ok', async ctx => {
    console.log('GET请求的数据', ctx.query.ok);
    ctx.body = 'Hello Router' + ctx.query.ok;
});

router.post('/ok', async ctx => {
    const postData = ctx.request.body
    console.log('POST请求的数据', postData);
    ctx.body = 'success';
});
//请求


app.on('error', (err, ctx) => {
    console.error('错误', ctx, err.stack);
});
app.listen(3001);

//demo mysql service
const db = require('./mysql/mysql');
db.init({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'x5_game_db',
    port: 3306
});
db.query(`select * from t_message`, null, async (err, ret) => {
    console.log('数据库执行结果：', err, ret);
});
//


