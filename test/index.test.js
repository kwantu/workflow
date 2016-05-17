'use strict';

var fs = require('fs');
var path = require('path');

/** Require the test framework modules */
var chai = require("chai");
var should = chai.should();
var expect = chai.expect;
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

/** Require the Workflow class */
var Workflow = require("../index.js");

// Get the test workflow configuration file
var file = path.join(__dirname, '1234:mangaungProject.json');
var config = fs.readFileSync(file, 'utf8');

// Workflow module test
describe('# Module: Workflow', function(){
	// Test the workflow instance intantiation
	describe('- new Workflow instance', function(){
		it('Should return the passed in profile id and configuration object / file.', function(done){
			var workflow = new Workflow('1234', config);
			expect(workflow.profile).to.equal('1234');
			expect(workflow.config).to.be.an('object');
			expect(workflow.config._id).to.equal('1234:mangaungProject');
			done();
		})
	});
	// Test the initiate method
	describe('- Method: create', function(){
		it('Should return a success block with the newly created process instance file.', function(done){
			var workflow = new Workflow('1234', config);
			workflow.create().then(function(data){
				expect(data.complete).to.equal(true);
				expect(data.res).to.be.an('object');
			}).should.notify(done);
		})
	});
});
