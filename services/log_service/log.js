const log4js = require('log4js');
const log4jsConfig =require('../../configs/log4js_config');
module.exports = {
    init: function (category) {
        if(!category) category = 'default';
        log4js.configure(log4jsConfig);
        const logger = log4js.getLogger(category);
        log4jsConfig.consoleLogChange(logger);
    }
};
