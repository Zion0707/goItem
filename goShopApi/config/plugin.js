'use strict';

// had enabled by egg
// exports.static = true;

//允许跨域请求
exports.cors = {
    enable: true,
    package: 'egg-cors'
};
//mysql
exports.mysql = {
	enabled : true,
	package : 'egg-mysql'
}