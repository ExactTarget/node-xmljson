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
		test.expect(4);

		var staticXml = '' +
			'<data>' +
				'<prop1>val1</prop1>' +
				'<prop2>val2</prop2>' +
				'<prop3>val3</prop3>' +
			'</data>';

		var staticJson = '' +
			'{' +
				'"prop1":"val1",' +
				'"prop2":"val2",' +
				'"prop3":"val3"' +
			'}';

		to_json(staticXml, function (error, data) {
			test.ifError(error);
			var json = JSON.stringify(data);
			test.equal(json, staticJson, 'rendered JSON should be correct');

			to_xml(json, function (error, xml) {
				test.ifError(error);
				test.equal(xml, staticXml, 'rendered XML should be correct');
				test.done();
			});
		});
	},

	'handles a nested dictionary': function (test) {
		test.expect(4);

		var staticXml = '' +
			'<data>' +
				'<obj1>' +
					'<objProp1>objVal1</objProp1>' +
				'</obj1>' +
				'<obj2>' +
					'<objProp2>objVal2</objProp2>' +
				'</obj2>' +
				'<obj3>' +
					'<objProp3>objVal3</objProp3>' +
				'</obj3>' +
			'</data>';

		var staticJson = '' +
			'{' +
				'"obj1":{"objProp1":"objVal1"},' +
				'"obj2":{"objProp2":"objVal2"},' +
				'"obj3":{"objProp3":"objVal3"}' +
			'}';

		to_json(staticXml, function (error, data) {
			test.ifError(error);
			var json = JSON.stringify(data);
			test.equal(json, staticJson, 'rendered JSON should be correct');

			to_xml(json, function (error, xml) {
				test.ifError(error);
				test.equal(xml, staticXml, 'rendered XML should be correct');
				test.done();
			});
		});
	},

	'handles an array': function (test) {
		test.expect(4);

		var staticXml = '' +
			'<data>' +
				'<array1>' +
					'<item>string 1</item>' +
					'<item>string 2</item>' +
					'<item>string 3</item>' +
				'</array1>' +
			'</data>';

		var staticJson = '' +
			'{' +
				'"array1":[' +
					'"string 1",' +
					'"string 2",' +
					'"string 3"' +
				']' +
			'}';

		to_json(staticXml, function (error, data) {
			test.ifError(error);
			var json = JSON.stringify(data);
			test.equal(json, staticJson, 'rendered JSON should be correct');

			to_xml(json, function (error, xml) {
				test.ifError(error);
				test.equal(xml, staticXml, 'rendered XML should be correct');
				test.done();
			});
		});
	},

	'handles an array of dictionaries': function (test) {
		test.expect(4);

		var staticXml = '' +
			'<data>' +
				'<array1>' +
					'<item>' +
						'<objProp1>objVal1</objProp1>' +
					'</item>' +
					'<item>' +
						'<objProp2>objVal2</objProp2>' +
					'</item>' +
					'<item>' +
						'<objProp3>objVal3</objProp3>' +
					'</item>' +
				'</array1>' +
			'</data>';

		var staticJson = '' +
			'{' +
				'"array1":[' +
					'{"objProp1":"objVal1"},' +
					'{"objProp2":"objVal2"},' +
					'{"objProp3":"objVal3"}' +
				']' +
			'}';

		to_json(staticXml, function (error, data) {
			test.ifError(error);
			var json = JSON.stringify(data);
			test.equal(json, staticJson, 'rendered JSON should be correct');

			to_xml(json, function (error, xml) {
				test.ifError(error);
				test.equal(xml, staticXml, 'rendered XML should be correct');
				test.done();
			});
		});
	},

	'handles a number value': function (test) {
		test.expect(4);

		var staticXml = '' +
			'<data>' +
				'<prop1>val1</prop1>' +
				'<prop2 type="num">3</prop2>' +
				'<prop3>val3</prop3>' +
			'</data>';

		var staticJson = '' +
			'{' +
				'"prop1":"val1",' +
				'"prop2":3,' +
				'"prop3":"val3"' +
			'}';

		to_json(staticXml, function (error, data) {
			test.ifError(error);
			var json = JSON.stringify(data);
			test.equal(json, staticJson, 'rendered JSON should be correct');

			to_xml(json, function (error, xml) {
				test.ifError(error);
				test.equal(xml, staticXml, 'rendered XML should be correct');
				test.done();
			});
		});
	},

	'handles a true value': function (test) {
		test.expect(4);

		var staticXml = '' +
			'<data>' +
				'<prop1>val1</prop1>' +
				'<prop2 type="bool">true</prop2>' +
				'<prop3>val3</prop3>' +
			'</data>';

		var staticJson = '' +
			'{' +
				'"prop1":"val1",' +
				'"prop2":true,' +
				'"prop3":"val3"' +
			'}';

		to_json(staticXml, function (error, data) {
			test.ifError(error);
			var json = JSON.stringify(data);
			test.equal(json, staticJson, 'rendered JSON should be correct');

			to_xml(json, function (error, xml) {
				test.ifError(error);
				test.equal(xml, staticXml, 'rendered XML should be correct');
				test.done();
			});
		});
	},

	'handles a false value': function (test) {
		test.expect(4);

		var staticXml = '' +
			'<data>' +
				'<prop1>val1</prop1>' +
				'<prop2 type="bool">false</prop2>' +
				'<prop3>val3</prop3>' +
			'</data>';

		var staticJson = '' +
			'{' +
				'"prop1":"val1",' +
				'"prop2":false,' +
				'"prop3":"val3"' +
			'}';

		to_json(staticXml, function (error, data) {
			test.ifError(error);
			var json = JSON.stringify(data);
			test.equal(json, staticJson, 'rendered JSON should be correct');

			to_xml(json, function (error, xml) {
				test.ifError(error);
				test.equal(xml, staticXml, 'rendered XML should be correct');
				test.done();
			});
		});
	},

	'handles a null value': function (test) {
		test.expect(4);

		var staticXml = '' +
			'<data>' +
				'<prop1>val1</prop1>' +
				'<prop2 type="null">null</prop2>' +
				'<prop3>val3</prop3>' +
			'</data>';

		var staticJson = '' +
			'{' +
				'"prop1":"val1",' +
				'"prop2":null,' +
				'"prop3":"val3"' +
			'}';

		to_json(staticXml, function (error, data) {
			test.ifError(error);
			var json = JSON.stringify(data);
			test.equal(json, staticJson, 'rendered JSON should be correct');

			to_xml(json, function (error, xml) {
				test.ifError(error);
				test.equal(xml, staticXml, 'rendered XML should be correct');
				test.done();
			});
		});
	}

};
