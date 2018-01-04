'use strict';

module.exports = appInfo => {
  	const config = exports = {};

	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + '_1513515019480_2135';

	// add your config here
	config.middleware = [];

	config.security = {
        csrf: {
            enable: false,
            ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
        },
        domainWhiteList: ['http://127.0.0.1:7001'],
    }

  	config.mysql = {
	    client: {
	        host: '127.0.0.1',
	        port: '3306',
	        user: 'root',
	        password: '19920707',
	        // password: 'Zion',
	        database: 'goShop',
	    },
	    app: true,
	    agent: false,
	}

	config.cors = {
        origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
        credentials: true
    }

  return config;
};
