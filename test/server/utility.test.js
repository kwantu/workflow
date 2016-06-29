'use strict';

var path = require("path");
var fs = require("fs");
var moment = require("moment");

// Require the test framework modules
var chai = require("chai");
var should = chai.should();
var expect = chai.expect;
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

// Require the utility module
var util = require("../../lib/utility.js");

// Utility module test
describe('# Module: lib/utility', function(){
	// Test the new success method
	describe('- success', function(){
		it('Should return the passed in message and returned data.', function(){
			var message = 'Success message goes here...';
			var data = 'test data';
			var dataObject = { 'prop1': 'prop1Data' };
			var success1 = util.success(message, data);
			var success2 = util.success(message, dataObject);
			// Test the first success object
			expect(success1).to.be.an('object');
			expect(success1.message).to.equal(message);
			expect(success1.data).to.equal(data);
			// Test the first success object
			expect(success2).to.be.an('object');
			expect(success2.message).to.equal(message);
			expect(success2.data.prop1).to.equal(dataObject.prop1);
		})
	});
});
