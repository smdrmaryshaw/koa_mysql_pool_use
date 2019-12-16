const sql_info = {
    mysql: {
        host: '127.0.0.1',
        user: 'root',
        password: '123456',
        database: 'x5_game_db',
        port: 3306
    }
}

module.exports = function (sql_type) {
    if(String(sql_type)){
        return sql_info[sql_type];
    }
    throw new Error('不支持的数据库类型'+sql_type);
}
