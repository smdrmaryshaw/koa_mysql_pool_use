const mysql = require('./mysql/mysql');
const sqlConfig = require('../../configs/sql_config');
exports.init = function () {
    mysql.init(sqlConfig('mysql'));
    mysql._init_ed_ = true;
};

async function promiseBackCall(sql, args) {
    return new Promise((resolve, reject) => {
        if (mysql._init_ed_) {
            mysql.query(sql, args, (err, ret) => {
                if (err) {
                    console.error('数据库错误语句', sql, args);
                }
                resolve({err, ret});
            });
        } else {
            resolve(new Error('数据库未初始化'), null);
        }
    });
};

exports.test_sql = async function () {
    let sql = `select * from t_message`;
    return promiseBackCall(sql, null);
};
