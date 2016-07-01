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

// Require the Workflow constructor / class
var Workflow = require("../../index.js");

// Get the test workflow configuration file
var filePath = path.join(__dirname, '../mangaungProject.json');
var config = fs.readFileSync(filePath, { encoding: 'utf-8' });

// Create the workflow constrctor instance
var workflow = new Workflow('1234', '5678', config);

var processId = 'registration';
var subProcessId = 'spRegistration'

// Workflow module test
describe('# Module: Workflow', function(){
	// Test the new Workflow constructor method
	describe('- new Workflow() object instance', function(){
		it('Should return the passed in profile id and workflow configuration data.', function(done){
			expect(workflow.profile).to.equal('1234');
			expect(workflow.config).to.be.an('object');
			expect(workflow.config._id).to.equal('mangaungProject');
			done();
		})
	});
	// Test the create method
	describe('- Method: create(): Create a new workflow instance', function(){
		it('Should return a success block with the newly created process instance data.', function(done){
			workflow.create().then(function(result){
				expect(result).to.be.an('object');
				expect(result.message).to.equal('Workflow processes instance created successfully.');
				expect(workflow.instance).to.be.an('object');
				expect(workflow.instance._id).to.equal(workflow.profile + ':processes');
				expect(workflow.instance.version).to.equal(workflow.config.version);
				expect(workflow.instance.processes.length).to.equal(0);
			}).should.notify(done);
		})
	});
	// Test the initialize method
	describe('- Method: initialise(): Create the first process instance', function(){
		it('Should return a success block and update the processes instance data.', function(done){
			var processId = workflow.config.processes[0]._id;
			var data = {
				createdDate: moment().format('YYYY-MM-DD'),
				validDate: '2016-06-30',
				dueDate: '2016-07-31',
				userId: '9012',
				name: 'Brent Gordon',
				comment: ''
			}
			workflow.initialise(processId, data).then(function(result){
				expect(result).to.be.an('object');
				expect(result.message).to.equal('Process: ' + processId + ' initialized successfully.');
				expect(workflow.instance).to.be.an('object');
				expect(workflow.instance._id).to.equal(workflow.profile + ':processes');
				expect(workflow.instance.version).to.equal(workflow.config.version);
				workflow.instance.processes.filter(function(processItem){
				if (processItem.id === processId && processItem.seq === 1) {
						// Workflow process instance data checks
						expect(processItem.id).to.equal(workflow.config.processes[0]._id);
						expect(processItem.seq).to.equal(1);
						processItem.subProcesses.filter(function(subProcessItem){
							if (subProcessItem.id === subProcessId && subProcessItem.seq === 1) {
								// Workflow sub-process instance data checks
								expect(subProcessItem.id).to.equal(workflow.config.processes[0].subProcesses[0]._id);
								expect(subProcessItem.seq).to.equal(1);
								expect(subProcessItem.initiated).to.equal(true);
								expect(subProcessItem.dates.created).to.equal(data.createdDate);
								expect(subProcessItem.dates.valid).to.equal(data.validDate);
								expect(subProcessItem.dates.due).to.equal(data.dueDate);
								expect(subProcessItem.complete).to.equal(false);
								// Workflow step instance data checks
								expect(subProcessItem.step.id).to.equal('captureForm');
								expect(subProcessItem.step.seq).to.equal(2);
								expect(subProcessItem.step.status).to.equal('InProgress');
								expect(subProcessItem.step.message).to.equal('User assigned and data capture in progress');
								expect(subProcessItem.step.assignedTo.userId).to.equal(data.userId);
								expect(subProcessItem.step.assignedTo.name).to.equal(data.name);
								expect(subProcessItem.step.comment).to.equal(data.comment);
								// // Form indicator instance/s data checks
								// for (var i = 0; i < workflow.config.processes[0].subProcesses[0].indicators.length; i++) {
								// 	var indicator = workflow.config.processes[0].subProcesses[0].indicators[i];
								// 	var id = indicator._id;
								//
								// 	// Check the workflow sub-process indicator instance/s data
								//
								// 	// Check the indicator instance/s processes data
								//
								// }
							}
						})
					}
				})
			}).should.notify(done);
		})
	});
	// Test the saveIndicator method
	describe('- Method: task()', function(){
		it('Should return ')

	});
	// Test the transition method
	describe('- Method: transition()', function(){
		it('Should return a success message and update the processes instance data.', function(done){
			var processSeq = 1;
			var subProcessSeq = 1;
			var stepId = 'captureForm';
			var transitionId = 'submitForm';
			var data = {
				createdDate: '',
				endDate: '',
				userId: '9012',
				name: 'Brent Gordon',
				comment: ''
			}
			workflow.transition(processId, processSeq, subProcessId, subProcessSeq, stepId, transitionId, data).then(function(result){
				expect(result).to.be.an('object');
				expect(result.message).to.equal('Step transition completed successfully.');
				// Step updates
				workflow.instance.processes.filter(function(processItem){
					if (processItem.id === processId && processItem.seq === processSeq) {
						processItem.subProcesses.filter(function(subProcessItem){
							if (subProcessItem.id === subProcessId && subProcessItem.seq === subProcessSeq) {
								expect(subProcessItem.step.id).to.equal('authoriseForm');
								expect(subProcessItem.step.seq).to.equal(3);
								expect(subProcessItem.step.status).to.equal('submitted');
								expect(subProcessItem.step.message).to.equal('Form data submitted, user assigned and form data under review');
								expect(subProcessItem.step.assignedTo.userId).to.equal(data.userId);
								expect(subProcessItem.step.assignedTo.name).to.equal(data.name);
								expect(subProcessItem.step.comment).to.equal(data.comment);
							}
						})
					}
				})
			}).should.notify(done);
		})
	});
});
