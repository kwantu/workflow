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

// Require the Workflow class 
var Workflow = require("../../index.js");

// Get the test workflow configuration file
var filePath = path.join(__dirname, '../mangaungProject.json');
var config = fs.readFileSync(filePath, { encoding: 'utf-8' });

// Create the workflow constrctor instance
var workflow = new Workflow('1234', '5678', config);

// Workflow: Test case #1
describe('# Test Case (No1): Mangaung project workflow.', function(){
	var profileId = '1234'
	var appId = '5678'
	var workflow = new Workflow(profileId, appId, config);
	describe('- Step 1. User clicks on create button of the profile indicator form, a post action calls the workflow.create() method.', function(){
		it('Should update the workflow instance id, version and have an empty processes array.', function(done){
			// On postAction of indicator: workflow.create()
			workflow.create().then(function(data){
				expect(data).to.be.an('object');
				expect(data.complete).to.equal(true);
				expect(data.message).to.equal('Workflow processes instance created successfully.');
				expect(workflow.instance).to.be.an('object');
				expect(workflow.instance._id).to.equal(workflow.profile + ':processes');
				expect(workflow.instance.version).to.equal(workflow.config.version);
				expect(workflow.instance.processes.length).to.equal(0);
			}).should.notify(done);
		})
	});
	describe('- Step 2. User ( capturer ) navigates to the profile forms tab and clicks on the create button of the registration sub process.', function(){
		it('Should update the workflow instance with a new processes instance.', function(done){
			// Onclick of create button: workflow.initialize(processId, inputData)
			var processId = workflow.config.processes[0]._id;
			var inputData = {
				createdDate: moment().format('YYYY-MM-DD'),
				validDate: '2016-06-30',
				dueDate: '2016-07-31',
				userId: '9012',
				name: 'Brent Gordon'
			}
			workflow.initialize(processId, inputData).then(function(data){
				expect(data).to.be.an('object');
				expect(data.complete).to.equal(true);
				expect(data.message).to.equal('Process: ' + processId + ' initialized successfully.');
				expect(workflow.instance).to.be.an('object');
				expect(workflow.instance._id).to.equal(workflow.profile + ':processes');
				expect(workflow.instance.version).to.equal(workflow.config.version);
				// Process instance data checks
				expect(workflow.instance.processes[0].id).to.equal(workflow.config.processes[0]._id);
				expect(workflow.instance.processes[0].seq).to.equal(1);
				// Sub-process instance data checks
				expect(workflow.instance.processes[0].subProcesses[0].id).to.equal(workflow.config.processes[0].subProcesses[0]._id);
				expect(workflow.instance.processes[0].subProcesses[0].seq).to.equal(1);
				expect(workflow.instance.processes[0].subProcesses[0].initiated).to.equal(true);
				expect(workflow.instance.processes[0].subProcesses[0].dates.created).to.equal(inputData.createdDate);
				expect(workflow.instance.processes[0].subProcesses[0].dates.valid).to.equal(inputData.validDate);
				expect(workflow.instance.processes[0].subProcesses[0].dates.due).to.equal(inputData.dueDate);
				expect(workflow.instance.processes[0].subProcesses[0].complete).to.equal(false);
				// Step updates
				expect(workflow.instance.processes[0].subProcesses[0].status).to.equal('InProgress');
				expect(workflow.instance.processes[0].subProcesses[0].message).to.equal('User assigned and data capture in progress');
				// Form indicators data checks
				for (var i = 0; i < workflow.config.processes[0].subProcesses[0].indicators.length; i++) {
					var indicator = workflow.config.processes[0].subProcesses[0].indicators[i];
					var id = indicator._id;
					expect(workflow.instance.processes[0].subProcesses[0].indicators[i].id).to.equal(id);
					// Check the instance data
					var instance = workflow.instance.processes[0].subProcesses[0].indicators[i].instances[0];
					expect(instance.uuid).to.equal(workflow.profile + ':' + workflow.app + ':' + id + ':0');
					expect(instance.key).to.equal('');
					expect(instance.seq).to.equal(1);
					expect(instance.status).to.equal('NotStarted');
					expect(instance.lastUpdated).to.equal(inputData.createdDate);
					expect(instance.complete).to.equal(false);
					// Check the indicator docuemnt process data
					// workflow.form.indicators.filter(function(indicatorDocument){
					// 	if (indicatorDocument._id === instance.uuid) {
					// 		expect(indicatorDocument._id).to.equal(instance.uuid);
					// 		expect(indicatorDocument.processes[0].configId).to.equal(workflow.config._id);
					// 		expect(indicatorDocument.processes[0].instanceId).to.equal(workflow.profile + ':' + workflow.config._id + ':processes');
					// 		expect(indicatorDocument.processes[0].processId).to.equal(processId);
					// 		expect(indicatorDocument.processes[0].subProcessId).to.equal(workflow.config.processes[0].subProcesses[0]._id);
					// 		expect(indicatorDocument.processes[0].stepId).to.equal(workflow.config.processes[0].subProcesses[0].steps[1]._id);
					// 		expect(indicatorDocument.processes[0].assignedTo.userId).to.equal(inputData.userId);
					// 		expect(indicatorDocument.processes[0].assignedTo.name).to.equal(inputData.name);
					// 		expect(indicatorDocument.processes[0].token).to.equal('');
					// 		expect(indicatorDocument.processes[0].status).to.equal('InProgress');
					// 		expect(indicatorDocument.processes[0].statusMsg).to.equal('User assigned and data capture in progress');
					// 		expect(indicatorDocument.processes[0].lastUpdated).to.equal(today);
					// 		expect(indicatorDocument.processes[0].dueDate).to.equal(inputData.dueDate);
					// 	}
					// });
				}
			}).should.notify(done);
		})
	});
	describe('- Step 3. User ( capturer ) opens the workflow sub process form interface, captures all data and marks each indicator as complete.', function(){
		it('Should return ')
		// Onclick of each form indicator tick icon: workflow.saveIndicator(indicatorId, indicatorSeq, docId)
		
	});
	describe('- Step 4. User ( capturer ) clicks on the workflow form UI submit button.', function(){
		it('Should return a success message and update the processes instance and related indicator sets.', function(done){
			// Onclick of form 'Submit' button: workflow.transition('submitForm')
			var processId = workflow.config.processes[0]._id;
			var subProcessId = workflow.config.processes[0].subProcesses[0]._id;
			var stepId = 'captureForm';
			var transitionId = 'submitForm';
			var subProcessModel = workflow.instance.processes[0].subProcesses[0];
			var nextStep = workflow.config.processes[0].subProcesses[0].steps[2];
			var inputData = {
				createdDate: moment().format('YYYY-MM-DD'),
				validDate: '2016-06-30',
				dueDate: '2016-07-31',
				userId: '9012',
				name: 'Brent Gordon'
			}
			workflow.transition(processId, subProcessId, stepId, transitionId, subProcessModel, nextStep, workflow).then(function(data){
				expect(data).to.be.an('object');
				expect(data.complete).to.equal(true);
				expect(data.message).to.equal('Workflow transitioned to the next step successfully.');
				expect(workflow.instance).to.be.an('object');
				expect(workflow.instance._id).to.equal(workflow.profile + ':processes');
				expect(workflow.instance.version).to.equal(workflow.config.version);
				// Process instance data checks
				expect(workflow.instance.processes[0].id).to.equal(workflow.config.processes[0]._id);
				expect(workflow.instance.processes[0].seq).to.equal(1);
				// Sub-process instance data checks
				expect(workflow.instance.processes[0].subProcesses[0].id).to.equal(workflow.config.processes[0].subProcesses[0]._id);
				expect(workflow.instance.processes[0].subProcesses[0].seq).to.equal(1);
				expect(workflow.instance.processes[0].subProcesses[0].initiated).to.equal(true);
				expect(workflow.instance.processes[0].subProcesses[0].dates.created).to.equal(inputData.createdDate);
				expect(workflow.instance.processes[0].subProcesses[0].dates.valid).to.equal(inputData.validDate);
				expect(workflow.instance.processes[0].subProcesses[0].dates.due).to.equal(inputData.dueDate);
				expect(workflow.instance.processes[0].subProcesses[0].complete).to.equal(false);
				// Step updates
				expect(workflow.instance.processes[0].subProcesses[0].status).to.equal('awaitingAuthorisation');
				expect(workflow.instance.processes[0].subProcesses[0].message).to.equal('Form data submitted, user assigned and form data under review');
				// Indicator set object updates - processes section

			}).should.notify(done);	
		})
	});
	describe('- Step 5. User ( authoriser ) reviews the form indicators data and refers it back to the captures, with a message, to fix data capture errors.', function(){
		it('Should transition the workflow back to the data capture step (InProgress) as well as the indicator set processes section.', function(done){
			// Onclick of form 'Refer back' button: workflow.transition('revertForm')
			var processId = workflow.config.processes[0]._id;
			var subProcessId = workflow.config.processes[0].subProcesses[0]._id;
			var stepId = 'authoriseForm';
			var transitionId = 'revertForm';
			var subProcessModel = workflow.instance.processes[0].subProcesses[0];
			var nextStep = workflow.config.processes[0].subProcesses[0].steps[3];
			var inputData = {
				createdDate: moment().format('YYYY-MM-DD'),
				validDate: '2016-06-30',
				dueDate: '2016-07-31',
				userId: '9012',
				name: 'Brent Gordon'
			}
			workflow.transition(processId, subProcessId, stepId, transitionId, subProcessModel, nextStep, workflow).then(function(data){
				expect(data).to.be.an('object');
				expect(data.complete).to.equal(true);
				expect(data.message).to.equal('Workflow transitioned to the next step successfully.');
				expect(workflow.instance).to.be.an('object');
				expect(workflow.instance._id).to.equal(workflow.profile + ':processes');
				expect(workflow.instance.version).to.equal(workflow.config.version);
				// Process instance data checks
				expect(workflow.instance.processes[0].id).to.equal(workflow.config.processes[0]._id);
				expect(workflow.instance.processes[0].seq).to.equal(1);
				// Sub-process instance data checks
				expect(workflow.instance.processes[0].subProcesses[0].id).to.equal(workflow.config.processes[0].subProcesses[0]._id);
				expect(workflow.instance.processes[0].subProcesses[0].seq).to.equal(1);
				expect(workflow.instance.processes[0].subProcesses[0].initiated).to.equal(true);
				expect(workflow.instance.processes[0].subProcesses[0].dates.created).to.equal(inputData.createdDate);
				expect(workflow.instance.processes[0].subProcesses[0].dates.valid).to.equal(inputData.validDate);
				expect(workflow.instance.processes[0].subProcesses[0].dates.due).to.equal(inputData.dueDate);
				expect(workflow.instance.processes[0].subProcesses[0].complete).to.equal(false);
				// Step updates
				expect(workflow.instance.processes[0].subProcesses[0].status).to.equal('InProgress');
				expect(workflow.instance.processes[0].subProcesses[0].message).to.equal('User assigned and data capture in progress');
				// Indicator set object updates - processes section

			}).should.notify(done);	
		});
	});
	describe('- Step 6. User ( capturer ) re-opens the workflow sub process form interface, updates the required data and marks each indicator as complete.', function(){
		it('Should return ')
		// Onclick of each form indicator tick icon: workflow.saveIndicator(indicatorId, indicatorSeq, docId)

	});
	describe('- Step 7. User ( capturer ) clicks on the workflow form UI submit button.', function(){
		it('Should return a success message and update the processes instance and related indicator sets.', function(done){
			// Onclick of form 'Submit' button: workflow.transition('submitForm')
			var processId = workflow.config.processes[0]._id;
			var subProcessId = workflow.config.processes[0].subProcesses[0]._id;
			var stepId = 'captureForm';
			var transitionId = 'submitForm';
			var subProcessModel = workflow.instance.processes[0].subProcesses[0];
			var nextStep = workflow.config.processes[0].subProcesses[0].steps[2];
			var inputData = {
				createdDate: moment().format('YYYY-MM-DD'),
				validDate: '2016-06-30',
				dueDate: '2016-07-31',
				userId: '9012',
				name: 'Brent Gordon'
			}
			workflow.transition(processId, subProcessId, stepId, transitionId, subProcessModel, nextStep, workflow).then(function(data){
				expect(data).to.be.an('object');
				expect(data.complete).to.equal(true);
				expect(data.message).to.equal('Workflow transitioned to the next step successfully.');
				expect(workflow.instance).to.be.an('object');
				expect(workflow.instance._id).to.equal(workflow.profile + ':processes');
				expect(workflow.instance.version).to.equal(workflow.config.version);
				// Process instance data checks
				expect(workflow.instance.processes[0].id).to.equal(workflow.config.processes[0]._id);
				expect(workflow.instance.processes[0].seq).to.equal(1);
				// Sub-process instance data checks
				expect(workflow.instance.processes[0].subProcesses[0].id).to.equal(workflow.config.processes[0].subProcesses[0]._id);
				expect(workflow.instance.processes[0].subProcesses[0].seq).to.equal(1);
				expect(workflow.instance.processes[0].subProcesses[0].initiated).to.equal(true);
				expect(workflow.instance.processes[0].subProcesses[0].dates.created).to.equal(inputData.createdDate);
				expect(workflow.instance.processes[0].subProcesses[0].dates.valid).to.equal(inputData.validDate);
				expect(workflow.instance.processes[0].subProcesses[0].dates.due).to.equal(inputData.dueDate);
				expect(workflow.instance.processes[0].subProcesses[0].complete).to.equal(false);
				// Step updates
				expect(workflow.instance.processes[0].subProcesses[0].status).to.equal('awaitingAuthorisation');
				expect(workflow.instance.processes[0].subProcesses[0].message).to.equal('Form data submitted, user assigned and form data under review');
				// Indicator set object updates - processes section

			}).should.notify(done);	
		})
	});
	describe('- Step 7. User ( authoriser ) reviews the form indicators data, is happy with it and authorises the form data.', function(){
		it('Should return ')
		// Onclick of form 'Authorise' button: workflow.transition('authoriseForm')

	});
	describe('- Step 8. User ( capturer ) navigates to the profile forms tab and clicks on the create button to create an updated version of the registration form.', function(){
		it('Should return a newly created processes file with the relevant data.')
		// Onclick of create button: workflow.initialize(processId)

	});
	describe('- Step 9. User ( capturer ) opens the workflow sub process form interface, captures all data and marks each indicator as complete.', function(){
		it('Should return ')
		// Onclick of each form indicator tick icon: workflow.saveIndicator(indicatorId, indicatorSeq, docId)
	});
	describe('- Step 10. User ( capturer ) clicks on the workflow form UI submit button.', function(){
		it('Should return ')
		// Onclick of form 'Submit' button: workflow.transition('submitForm')

	});
	describe('- Step 11. User ( authoriser ) reviews the latest form indicators data, is happy with it and authorises the form data.', function(){
		it('Should return ')
		// Onclick of form 'Authorise' button: workflow.transition('authoriseForm')

	});
})





























