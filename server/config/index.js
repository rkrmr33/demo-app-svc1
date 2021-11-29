const packagejson = require('../../package.json');

module.exports = {
    version: packagejson.version,
    service: packagejson.name,
    port: parseInt(process.env.PORT, 10) || 8081,
};
