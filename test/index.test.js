'use strict';

/** Require the test framework modules */
var chai = require("chai");
var should = chai.should();
var expect = chai.expect;
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

/** Require the Workflow class */
var Workflow = require("../index.js");

// Workflow module test
describe('# Module: Workflow', function(){
	// Test the workflow instance intantiation
	describe('- Method: new Workflow', function(){
		it('Should return the passed in profile id and configuration object / file.', function(done){
			var workflow = new Workflow('1234', {});
			expect(workflow.profile).to.equal('1234');
			// expect(workflow.config).to.equal({});
			done();
		})
	});
	// Test the initiate method
	describe('- Method: init', function(){
		it('Should return a success block and store the newly created process instance file.')
	});
});
