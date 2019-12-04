'use struct'
//demo koa web service
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
//用户自定义中间件
const middleWare = require('./middleware');

const app = new Koa();
const router = Router();

//跨域访问组件
app.use(cors());
//使用ctx.body解析中间件
app.use(bodyParser());
//用户中间件
app.use(middleWare);
//路由组件
app.use(router.routes()).use(router.allowedMethods());

router.get('/ok', async ctx => {
    console.log('GET请求的数据', ctx.query.ok);
    ctx.body = 'Hello Router' + ctx.query.ok;
});

router.post('/ok', async ctx => {
    const postData = ctx.request.body
    console.log('POST请求的数据', postData);
    ctx.body = 'success';
});

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
db.query(`select * from t_users`, null, async(err, ret)=>{
    console.log('数据库执行结果：', err, ret);
});
//


