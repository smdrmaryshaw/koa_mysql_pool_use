//对应js文件前缀名称 为键
const api_route_info = {
    'api_account': '/',
};
module.exports = function (name) {
    if(String(name)){
        return api_route_info[name];
    }
    throw new Error('#9 错误的文件名前缀'+name);
};
