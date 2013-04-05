/*
 * rerender
 * https://github.com/ExactTarget/node-rerender
 *
 * Copyright (c) 2013 ExactTarget
 * Licensed under the MIT license.
 */

var parse = require('xml2js').parseString;

module.exports = function (xml, callback) {
	return parse(xml, { explicitArray: false }, function (error, data) {
		if (error) return callback(error);

		if (Object.keys(data)[0] === 'dictionary') {
			data = data.dictionary;
		}

		return callback(null, data);
	});
};
