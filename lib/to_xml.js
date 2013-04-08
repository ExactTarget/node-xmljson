/*
 * rerender
 * https://github.com/ExactTarget/node-rerender
 *
 * Copyright (c) 2013 ExactTarget
 * Licensed under the MIT license.
 */

var xmlbuilder = require('xmlbuilder');

module.exports = function (json, callback) {
	try {
		var builder = xmlbuilder.create().begin('data');
		buildXml(JSON.parse(json), builder);
		callback(null, builder.end({ pretty: false, indent: '', newline: '' }));
	} catch (error) {
		callback(error);
	}
};

function buildXml(data, builder) {
	if (typeof data === 'object' && data !== null) {
		if (Array.isArray(data)) {
			for (var i = 0; i < data.length; i++) {
				buildXml(data[i], builder.ele('item'));
			}
		} else {
			for (var key in data) {
				buildXml(data[key], builder.ele(key));
			}
		}
	} else {
		builder.txt(data);
	}
}
