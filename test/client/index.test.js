'use strict';

var should = chai.should();
var expect = chai.expect;

// Get the test workflow configuration file
var config = {}

// Create the workflow constrctor instance
var workflow = new Workflow('1234', config);

// Workflow module test
describe('# Module: Workflow', function(){
	// Test the new Workflow constructor method
	describe('- new Workflow() instance', function(){
		it('Should return the passed in profile id and configuration object / file.', function(done){
			expect(workflow.profile).to.equal('1234');
			expect(workflow.config).to.be.an('object');
			expect(workflow.config._id).to.equal('1234:mangaungProject');
			done();
		})
	});
	// Test the create method
	describe('- Method: create()', function(){
		it('Should return a success block with the newly created process instance file.', function(done){
			workflow.create().then(function(data){
				expect(data).to.be.an('object');
				expect(data.complete).to.equal(true);
				expect(data.message).to.equal('Workflow processes instance created successfully.');
				expect(data.res).to.be.an('object');
				expect(data.res._id).to.equal(workflow.profile + ':' + workflow.config._id + ':processes');
				expect(data.res._version).to.equal(workflow.config._version);
			}).should.notify(done);
		})
	});
	// Test the process method
	describe('- Method: process()', function(){
		it('Should return a success block with the updated processes instance file.', function(done){
			var processId = 'registration';
			workflow.process(processId).then(function(data){
				expect(data).to.be.an('object');
				expect(data.complete).to.equal(true);
				expect(data.message).to.equal('Process: ' + processId + ' completed successfully.');
				expect(data.res).to.be.an('object');
				expect(data.res._id).to.equal(workflow.profile + ':' + workflow.config._id + ':processes');
				expect(data.res._version).to.equal(workflow.config._version);
			}).should.notify(done);
		})
	});
	// Test the subProcess method
	describe('- Method: subProcess()', function(){
		it('Should return ')

	});
	// Test the step method
	describe('- Method: step()', function(){
		it('Should return ')

	});
	// Test the assign method
	describe('- Method: assign()', function(){
		it('Should return ')

	});
	// Test the transition method
	describe('- Method: transition()', function(){
		it('Should return ')

	});
	// Test the close method
	describe('- Method: close()', function(){
		it('Should return ')

	});
});

// Workflow: Test case #1
describe('# Test Case (No1): Mangaung project workflow.', function(){
	// Test the close method
	describe('- Method: create()', function(){
		it('Should return ')

	});
})





























