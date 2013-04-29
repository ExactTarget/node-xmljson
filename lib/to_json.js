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

		data = applyStructureChanges(data);

		if (Object.keys(data)[0] === 'data') {
			data = data.data;
		}

		return callback(null, data);
	});
};

function applyStructureChanges(data) {
	var newArray, newObject, i;

	if (typeof data === 'object' && data !== null) {
		if (Object.keys(data).length === 2 && (data._ != null || data.item != null) && data.$ && data.$.type != null) {
			// this is a value with a specified data type.  return the data as appropriate type.
			switch (data.$.type) {
				case 'array':
					newArray = [];
					for (i = 0; i < data['item'].length; i++) {
						newArray[i] = applyStructureChanges(data['item'][i]);
					}
					return newArray;
				case 'num':
					return Number(data._).valueOf();
				case 'bool':
					return data._ === 'true';
				case 'null':
					return null;
				default:
					return data._;
			}
		} else {
			// this is another type of object.  process its contents normally
			newObject = {};
			for (var key in data) {
				newObject[key] = applyStructureChanges(data[key]);
			}
			return newObject;
		}
	} else {
		return data;
	}
}