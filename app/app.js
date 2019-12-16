'use struct'
//WEB服务
const web_service = require('../services/web_service/web_service');
//MYSQL服务
const sql_service = require('../services/mysql_service/mysql_service');
//LOG服务
const log_service = require('../services/log_service/log');
//
async function main() {
    //
    return new Promise((resolve, reject) => {
        try {
            let startT = Date.now();
            //
            console.log('启动 log service');
            log_service.init();
            console.log('log service 已启动', Date.now() - startT, 'ms [', startT = Date.now(), ']');
            console.log('启动 web service...');
            web_service.init();
            console.log('web service 已启动', Date.now() - startT, 'ms [', startT = Date.now(), ']');
            console.log('启动 sql service...');
            sql_service.init();
            console.log('sql service 已启动', Date.now() - startT, 'ms [', startT = Date.now(), ']');
            //
            resolve();
        } catch (e) {
            reject(e);
            throw e;
        }
    });
};

const t = Date.now();
console.log('服务器启动中……');
main().then(async () => {
    console.log('服务器启动完成, 耗时', Date.now() - t, '毫秒');
    let ret = await sql_service.test_sql();
    console.log(ret);
    console.log(web_service.getInstance().app);
    //
}).catch(() => {
    console.log('服务器启动失败');
});


