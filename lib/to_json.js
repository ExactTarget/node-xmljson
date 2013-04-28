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
		if (Array.isArray(data)) {
			// this is an array. process its contents
			newArray = [];
			for (i = 0; i < data.length; i++) {
				newArray[i] = applyStructureChanges(data[i]);
			}
			return newArray;
		} else {
			if (Object.keys(data).length === 1 && Object.keys(data)[0] === 'item' && Array.isArray(data['item'])) {
				// this is an object with a single key 'item' containing an array.  convert it to a basic array.
				newArray = [];
				for (i = 0; i < data['item'].length; i++) {
					newArray[i] = applyStructureChanges(data['item'][i]);
				}
				return newArray;
			} else if (Object.keys(data).length === 2 && data._ != null && data.$ && data.$.type != null) {
				// this is a value with a specified data type.  return the data as appropriate type.
				switch (data.$.type) {
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
		}
	} else {
		return data;
	}
}