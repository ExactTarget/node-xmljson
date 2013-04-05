var to_json = require('../lib').to_json;
var to_xml = require('../lib').to_xml;

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports['module basics'] = {
	'initializes': function (test) {
		test.expect(2);
		test.equal(typeof to_json, 'function', 'should be a function');
		test.equal(typeof to_xml, 'function', 'should be a function');
		test.done();
	}
};

exports['translates between json and xml'] = {

	'handles a simple dictionary': function (test) {
		test.expect(2);

		var staticXml = '' +
			'<dictionary>' +
				'<prop1>val1</prop1>' +
				'<prop2>val2</prop2>' +
				'<prop3>val3</prop3>' +
			'</dictionary>';

		var staticJson = '' +
			'{' +
				'"prop1":"val1",' +
				'"prop2":"val2",' +
				'"prop3":"val3"' +
			'}';

		to_json(staticXml, function (error, data) {
			test.ifError(error);
			test.equal(JSON.stringify(data), staticJson, 'rendered JSON should be correct');
			test.done();
		});
	}

};
