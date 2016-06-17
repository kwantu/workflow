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
// Create the workflow constrctor instance
var profileId = '1234'
var appId = '5678'
// Get the test workflow configuration file
var filePath = path.join(__dirname, '../mangaungProject.json');
var config = fs.readFileSync(filePath, { encoding: 'utf-8' });
var workflow = new Workflow(profileId, appId, config);

// Workflow: Test case #1
describe('# TEST CASE: PROJECT WORKFLOW', function(){
	
	describe('- STEP 1. User (capturer/authoriser) navigates to the project app dashboard and creates a new profile.', function(){
		it('Should create a new workflow instance.', function(done){
			// Call the workflow create method and check the data
			workflow.create().then(function(data){
				expect(data).to.be.an('object');
				expect(data.message).to.equal('Workflow processes instance created successfully.');
				expect(workflow.instance).to.be.an('object');
				expect(workflow.instance._id).to.equal(workflow.profile + ':processes');
				expect(workflow.instance.version).to.equal(workflow.config.version);
				expect(workflow.instance.processes.length).to.equal(0);
			}).should.notify(done);
		});
		it('Should initialise the first process, sub-process, step and associated indicator set documents.', function(done){
			// Get the first process id
			var processId = workflow.config.processes[0]._id;
			// Get the input data from the form
			var inputData = {
				createdDate: moment().format('YYYY-MM-DD'),
				validDate: '2016-06-30',
				dueDate: '2016-07-31',
				userId: '9012',
				name: 'Brent Gordon'
			};
			// Call the workflow initialize method and check the data
			workflow.initialise(processId, inputData).then(function(data){
				expect(data).to.be.an('object');
				expect(data.message).to.equal('Process: ' + processId + ' initialized successfully.');
				expect(workflow.instance).to.be.an('object');
				expect(workflow.instance._id).to.equal(workflow.profile + ':processes');
				expect(workflow.instance.version).to.equal(workflow.config.version);
				// Workflow process instance data checks
				expect(workflow.instance.processes[0].id).to.equal(workflow.config.processes[0]._id);
				expect(workflow.instance.processes[0].seq).to.equal(1);
				// Workflow sub-process instance data checks
				expect(workflow.instance.processes[0].subProcesses[0].id).to.equal(workflow.config.processes[0].subProcesses[0]._id);
				expect(workflow.instance.processes[0].subProcesses[0].seq).to.equal(1);
				expect(workflow.instance.processes[0].subProcesses[0].initiated).to.equal(true);
				expect(workflow.instance.processes[0].subProcesses[0].dates.created).to.equal(inputData.createdDate);
				expect(workflow.instance.processes[0].subProcesses[0].dates.valid).to.equal(inputData.validDate);
				expect(workflow.instance.processes[0].subProcesses[0].dates.due).to.equal(inputData.dueDate);
				expect(workflow.instance.processes[0].subProcesses[0].complete).to.equal(false);
				// Workflow step instance data checks
				expect(workflow.instance.processes[0].subProcesses[0].step.status).to.equal('InProgress');
				expect(workflow.instance.processes[0].subProcesses[0].step.message).to.equal('User assigned and data capture in progress');
				expect(workflow.instance.processes[0].subProcesses[0].step.assignedTo.userId).to.equal(inputData.userId);
				expect(workflow.instance.processes[0].subProcesses[0].step.assignedTo.name).to.equal(inputData.name);
				// Form indicator instance/s data checks
				for (var i = 0; i < workflow.config.processes[0].subProcesses[0].indicators.length; i++) {
					var indicator = workflow.config.processes[0].subProcesses[0].indicators[i];
					var id = indicator._id;
					
					// Check the workflow sub-process indicator instance/s data
					
					// Check the indicator instance/s processes data

				}
			}).should.notify(done);
		});
	});

	describe('- STEP 2. User (capturer) navigates to profile process page, opens the "Register a project" process, captures, saves the indicator set/s data.', function(){
		it('Should update the associated indicator set instance/s step complete status.')
		// Onclick of each form indicator tick icon: workflow.task()
		
	});

	describe('- STEP 3. User (capturer) submits the data for authorisation.', function(){
		it('Should transition to the next step.', function(done){
			// Onclick of form 'Submit' button: workflow.transition('submitForm')
			var processId = workflow.config.processes[0]._id;
			var subProcessId = workflow.config.processes[0].subProcesses[0]._id;
			var stepId = 'captureForm';
			var transitionId = 'submitForm';
			var inputData = {
				startDate: '',
				endDate: '',
				userId: '9012',
				name: 'Brent Gordon'
			}
			workflow.transition(processId, subProcessId, stepId, transitionId, inputData).then(function(data){
				expect(data).to.be.an('object');
				expect(data.message).to.equal('Workflow transitioned to the next step successfully.');
				// Step updates
				expect(workflow.instance.processes[0].subProcesses[0].step.status).to.equal('submitted');
				expect(workflow.instance.processes[0].subProcesses[0].step.message).to.equal('Form data submitted, user assigned and form data under review');
				expect(workflow.instance.processes[0].subProcesses[0].step.assignedTo.userId).to.equal(inputData.userId);
				expect(workflow.instance.processes[0].subProcesses[0].step.assignedTo.name).to.equal(inputData.name);
				// Indicator set object updates - processes section

			}).should.notify(done);	
		})
	});

	describe('- STEP 5. User (authoriser) reviews the form indicators data and refers it back with a message.', function(){
		it('Should transition the workflow back to the data capture step ( captureForm ).', function(done){
			// Onclick of form 'Refer back' button: workflow.transition('revertForm')
			var processId = workflow.config.processes[0]._id;
			var subProcessId = workflow.config.processes[0].subProcesses[0]._id;
			var stepId = 'authoriseForm';
			var transitionId = 'revertForm';
			var inputData = {
				startDate: '',
				endDate: '',
				userId: '9012',
				name: 'Brent Gordon'
			}
			workflow.transition(processId, subProcessId, stepId, transitionId, inputData).then(function(data){
				expect(data).to.be.an('object');
				expect(data.message).to.equal('Workflow transitioned to the next step successfully.');
				// Step updates
				expect(workflow.instance.processes[0].subProcesses[0].step.status).to.equal('InProgress');
				expect(workflow.instance.processes[0].subProcesses[0].step.message).to.equal('User assigned and data capture in progress');
				expect(workflow.instance.processes[0].subProcesses[0].step.assignedTo.userId).to.equal(inputData.userId);
				expect(workflow.instance.processes[0].subProcesses[0].step.assignedTo.name).to.equal(inputData.name);
				// Indicator set object updates - processes section

			}).should.notify(done);	
		});
	});

	describe('- STEP 6. User (capturer) updates the form indicator data and marks each indicator as complete.', function(){
		it('Should update the associated indicator set instance/s step complete status.')
		// Onclick of each form indicator tick icon: workflow.saveIndicator(indicatorId, indicatorSeq, docId)

	});

	describe('- STEP 7. User (capturer) re-submits the data for authorisation.', function(){
		it('Should transition to the next step.', function(done){
			// Onclick of form 'Submit' button: workflow.transition('submitForm')
			var processId = workflow.config.processes[0]._id;
			var subProcessId = workflow.config.processes[0].subProcesses[0]._id;
			var stepId = 'captureForm';
			var transitionId = 'submitForm';
			var inputData = {
				startDate: '',
				endDate: '',
				userId: '9012',
				name: 'Brent Gordon'
			}
			workflow.transition(processId, subProcessId, stepId, transitionId, inputData).then(function(data){
				expect(data).to.be.an('object');
				expect(data.message).to.equal('Workflow transitioned to the next step successfully.');
				// Step updates
				expect(workflow.instance.processes[0].subProcesses[0].step.status).to.equal('submitted');
				expect(workflow.instance.processes[0].subProcesses[0].step.message).to.equal('Form data submitted, user assigned and form data under review');
				expect(workflow.instance.processes[0].subProcesses[0].step.assignedTo.userId).to.equal(inputData.userId);
				expect(workflow.instance.processes[0].subProcesses[0].step.assignedTo.name).to.equal(inputData.name);
				// Indicator set object updates - processes section

			}).should.notify(done);	
		})
	});

	describe('- STEP 8. User (authoriser) reviews the updated form indicator data and authorises it.', function(){
		it('Should transition the workflow to the next step and close the form.', function(done){
			// Onclick of form 'Authorise' button: workflow.transition('authoriseForm')
			var processId = workflow.config.processes[0]._id;
			var subProcessId = workflow.config.processes[0].subProcesses[0]._id;
			var stepId = 'authoriseForm';
			var transitionId = 'authoriseForm';
			var inputData = {
				startDate: '',
				endDate: '',
				userId: '9012',
				name: 'Brent Gordon'
			}
			workflow.transition(processId, subProcessId, stepId, transitionId, inputData).then(function(data){
				expect(data).to.be.an('object');
				expect(data.message).to.equal('Workflow transitioned to the next step successfully.');
				// Step updates
				expect(workflow.instance.processes[0].subProcesses[0].step.status).to.equal('Complete');
				expect(workflow.instance.processes[0].subProcesses[0].step.message).to.equal('Form locked');
				expect(workflow.instance.processes[0].subProcesses[0].step.assignedTo.userId).to.equal(inputData.userId);
				expect(workflow.instance.processes[0].subProcesses[0].step.assignedTo.name).to.equal(inputData.name);
				// Indicator set object updates - processes section

			}).should.notify(done);	
		})		
	});

	describe('- STEP 9. User (capturer/authoriser) navigates to the existing profile forms tab and creates another version of the registration form / process.', function(){
		it('Should initialise a second instance of the first process, sub-process, step and associated indicator set documents.', function(done){
			// Get the first process id
			var processId = workflow.config.processes[0]._id;
			// Get the input data from the form
			var inputData = {
				createdDate: '2016-07-01',
				validDate: '2016-07-31',
				dueDate: '2016-08-30',
				userId: '9012',
				name: 'Brent Gordon'
			};
			// Call the workflow initialize method and check the data
			workflow.initialise(processId, inputData).then(function(data){
				expect(data).to.be.an('object');
				expect(data.message).to.equal('Process: ' + processId + ' initialized successfully.');
				expect(workflow.instance).to.be.an('object');
				expect(workflow.instance._id).to.equal(workflow.profile + ':processes');
				expect(workflow.instance.version).to.equal(workflow.config.version);
				// Workflow process instance data checks
				expect(workflow.instance.processes[1].id).to.equal(workflow.config.processes[0]._id);
				expect(workflow.instance.processes[1].seq).to.equal(2);
				// Workflow sub-process instance data checks
				expect(workflow.instance.processes[1].subProcesses[0].id).to.equal(workflow.config.processes[0].subProcesses[0]._id);
				expect(workflow.instance.processes[1].subProcesses[0].seq).to.equal(1);
				expect(workflow.instance.processes[1].subProcesses[0].initiated).to.equal(true);
				expect(workflow.instance.processes[1].subProcesses[0].dates.created).to.equal(inputData.createdDate);
				expect(workflow.instance.processes[1].subProcesses[0].dates.valid).to.equal(inputData.validDate);
				expect(workflow.instance.processes[1].subProcesses[0].dates.due).to.equal(inputData.dueDate);
				expect(workflow.instance.processes[1].subProcesses[0].complete).to.equal(false);
				// Workflow step instance data checks
				expect(workflow.instance.processes[1].subProcesses[0].step.status).to.equal('InProgress');
				expect(workflow.instance.processes[1].subProcesses[0].step.message).to.equal('User assigned and data capture in progress');
				expect(workflow.instance.processes[1].subProcesses[0].step.assignedTo.userId).to.equal('9012');
				expect(workflow.instance.processes[1].subProcesses[0].step.assignedTo.name).to.equal('Brent Gordon');
				// Form indicator instance/s data checks
				for (var i = 0; i < workflow.config.processes[1].subProcesses[0].indicators.length; i++) {
					var indicator = workflow.config.processes[1].subProcesses[0].indicators[i];
					var id = indicator._id;
					
					// Check the workflow sub-process indicator instance/s data
					
					// Check the indicator instance/s processes data

				}
			}).should.notify(done);
		})
	});

	describe('- STEP 10. User (capturer) opens the latest "Register a project" process, captures and saves the data of the indicator set/s and marks them as complete.', function(){
		it('Should update the associated indicator set instance/s step complete status.')
		// Onclick of each form indicator tick icon: workflow.task()
	});

	describe('- STEP 11. User (capturer) submits the data for authorisation.', function(){
		it('Should transition to the next step.', function(done){
			// Onclick of form 'Submit' button: workflow.transition('submitForm')
			var processId = workflow.config.processes[0]._id;
			var subProcessId = workflow.config.processes[0].subProcesses[0]._id;
			var stepId = 'captureForm';
			var transitionId = 'submitForm';
			var inputData = {
				startDate: '',
				endDate: '',
				userId: '9012',
				name: 'Brent Gordon'
			}
			workflow.transition(processId, subProcessId, stepId, transitionId, inputData).then(function(data){
				expect(data).to.be.an('object');
				expect(data.message).to.equal('Workflow transitioned to the next step successfully.');
				// Step updates
				expect(workflow.instance.processes[1].subProcesses[0].step.status).to.equal('submitted');
				expect(workflow.instance.processes[1].subProcesses[0].step.message).to.equal('Form data submitted, user assigned and form data under review');
				expect(workflow.instance.processes[1].subProcesses[0].step.assignedTo.userId).to.equal(inputData.userId);
				expect(workflow.instance.processes[1].subProcesses[0].step.assignedTo.name).to.equal(inputData.name);
				// Indicator set object updates - processes section

			}).should.notify(done);	
		})
	});

	describe('- STEP 12. User (authoriser) reviews the updated form indicator data and authorises it.', function(){
		it('Should transition the workflow to the next step and close the form.', function(done){
			// Onclick of form 'Authorise' button: workflow.transition('authoriseForm')
			var processId = workflow.config.processes[0]._id;
			var subProcessId = workflow.config.processes[0].subProcesses[0]._id;
			var stepId = 'authoriseForm';
			var transitionId = 'authoriseForm';
			var inputData = {
				startDate: '',
				endDate: '',
				userId: '9012',
				name: 'Brent Gordon'
			}
			workflow.transition(processId, subProcessId, stepId, transitionId, inputData).then(function(data){
				expect(data).to.be.an('object');
				expect(data.message).to.equal('Workflow transitioned to the next step successfully.');
				// Step updates
				expect(workflow.instance.processes[1].subProcesses[0].step.status).to.equal('Complete');
				expect(workflow.instance.processes[1].subProcesses[0].step.message).to.equal('Form locked');
				expect(workflow.instance.processes[1].subProcesses[0].step.assignedTo.userId).to.equal(inputData.userId);
				expect(workflow.instance.processes[1].subProcesses[0].step.assignedTo.name).to.equal(inputData.name);
				// Indicator set object updates - processes section

			}).should.notify(done);	
		})
	});

	describe('- STEP 13. ', function(){
		it('Should ')

	});

	describe('- STEP 14. ', function(){
		it('Should ')

	});

	describe('- STEP 15. ', function(){
		it('Should ')

	});

	describe('- STEP 16. ', function(){
		it('Should ')

	});

	describe('- STEP 17. ', function(){
		it('Should ')

	});

	describe('- STEP 18. ', function(){
		it('Should ')

	});

})





























