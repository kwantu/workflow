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
// describe('# Module: Workflow', function(){
// 	// Test the new Workflow constructor method
// 	describe('- new Workflow() object instance', function(){
// 		it('Should return the passed in profile id and workflow configuration data.', function(done){
// 			expect(workflow.profile).to.equal('1234');
// 			expect(workflow.config).to.be.an('object');
// 			expect(workflow.config._id).to.equal('mangaungProject');
// 			done();
// 		})
// 	});
// 	// Test the create method
// 	describe('- Method: create(): Create a new workflow instance', function(){
// 		it('Should return a success block with the newly created process instance data.', function(done){
// 			workflow.create().then(function(result){
// 				expect(result).to.be.an('object');
// 				expect(result.message).to.equal('Workflow processes instance created successfully.');
// 				expect(workflow.instance).to.be.an('object');
// 				expect(workflow.instance._id).to.equal(workflow.profile + ':processes');
// 				expect(workflow.instance.version).to.equal(workflow.config.version);
// 				expect(workflow.instance.processes.length).to.equal(0);
// 			}).should.notify(done);
// 		})
// 	});
// 	// Test the initialize method
// 	describe('- Method: initialise(): Create the first process instance', function(){
// 		it('Should return a success block and update the processes instance data.', function(done){
// 			// var processId = workflow.config.processes[0]._id;
// 			var data = {
// 				createdDate: moment().format('YYYY-MM-DD'),
// 				validDate: '2016-06-30',
// 				dueDate: '2016-07-31',
// 				userId: '9012',
// 				name: 'Brent Gordon',
// 				comment: ''
// 			}
// 			workflow.initialise(processId, data).then(function(result){
// 				var currentStep = {};
// 				expect(result).to.be.an('object');
// 				expect(result.message).to.equal('Process: ' + processId + ' initialized successfully.');
// 				expect(workflow.instance).to.be.an('object');
// 				expect(workflow.instance._id).to.equal(workflow.profile + ':processes');
// 				expect(workflow.instance.version).to.equal(workflow.config.version);
// 				workflow.instance.processes.filter(function(processItem){
// 					if (processItem.id === processId && processItem.seq === 1) {
// 						// Workflow process instance data checks
// 						expect(processItem.id).to.equal(workflow.config.processes[0]._id);
// 						expect(processItem.seq).to.equal(1);
// 						processItem.subProcesses.filter(function(subProcessItem){
// 							if (subProcessItem.id === subProcessId && subProcessItem.seq === 1) {
// 								// Workflow sub-process instance data checks
// 								expect(subProcessItem.id).to.equal(workflow.config.processes[0].subProcesses[0]._id);
// 								expect(subProcessItem.seq).to.equal(1);
// 								expect(subProcessItem.initiated).to.equal(true);
// 								expect(subProcessItem.dates.created).to.equal(data.createdDate);
// 								expect(subProcessItem.dates.valid).to.equal(data.validDate);
// 								expect(subProcessItem.dates.due).to.equal(data.dueDate);
// 								expect(subProcessItem.complete).to.equal(false);
// 								// Workflow sub-process indicators data checks
// 								workflow.config.processes.filter(function(confProcessItem){
// 									if (confProcessItem._id === processId){
// 										confProcessItem.subProcesses.filter(function(confSubProcessItem){
// 											if (confSubProcessItem._id === subProcessId) {
// 												var indicators = confSubProcessItem.indicators;
// 												for (var i = 0; i < indicators.length; i++) {
// 													var indicatorId = indicators[i]._id;
// 													for (var j = 0; j < subProcessItem.indicators.length; j++) {
// 														var indicator = subProcessItem.indicators[j];
// 														if (indicator.id === indicatorId) {
// 															expect(indicator.id).to.equal(indicatorId);
// 															var instances = indicator.instances;
// 															for (var k = 0; k < instances.length; k++) {
// 																var instance = instances[k];
// 																expect(instance.uuid).to.equal(workflow.profile + ':' + workflow.app + ':' + indicatorId + ':0');
// 																// expect(indicator.title).to.equal();
// 																expect(instance.key).to.equal('');
// 																expect(instance.seq).to.equal(1);
// 															}
// 														}
// 													}
// 												}
// 											}
// 										})
// 									}
// 								})
// 								// Workflow step instance data checks
// 								currentStep = subProcessItem.step
// 								expect(currentStep.id).to.equal('captureForm');
// 								expect(currentStep.seq).to.equal(2);
// 								expect(currentStep.status).to.equal('InProgress');
// 								expect(currentStep.message).to.equal('User assigned and data capture in progress');
// 								expect(currentStep.assignedTo.userId).to.equal(data.userId);
// 								expect(currentStep.assignedTo.name).to.equal(data.name);
// 								expect(currentStep.comment).to.equal(data.comment);
// 							}
// 						})
// 					}
// 					// Form indicator instance/s data checks
// 					workflow.config.processes.filter(function(processItem){
// 						if (processItem._id === processId) {
// 							// console.log(processId);
// 							processItem.subProcesses.filter(function(subProcessItem){
// 								// console.log(processId);
// 								if (subProcessItem._id === subProcessId) {
// 									var indicators = subProcessItem.indicators;
// 									for (var i = 0; i < indicators.length; i++) {
// 										var indicatorId = indicators[i]._id;
// 										// console.log(indicatorId);
// 										workflow.indicators.filter(function(indicator){
// 											if (indicatorId === indicator.category.term) {
// 												expect(indicator._id).to.equal(workflow.profile + ':' + workflow.app + ':' + indicatorId + ':0');
// 												expect(indicator.title).to.equal(indicator.category.label);
// 												expect(indicator.category.term).to.equal(indicator.category.term);
// 												expect(indicator.category.label).to.equal(indicator.category.label);
// 												// Check the indicator workflow processes section
// 												var workflows = indicator.workflows;
// 												// console.log(workflows);
// 												workflows.filter(function(wfInstance){
// 													if (wfInstance.id === workflow.config._id) {
// 														// console.log(wfInstance);
// 														expect(wfInstance.id).to.equal(workflow.config._id);
// 														expect(wfInstance.instance).to.equal(workflow.profile + ':processes');
// 														wfInstance.processes.filter(function(processItem){
// 															expect(processItem.id).to.equal(processId);
// 															expect(processItem.subProcessId).to.equal(subProcessId);
// 															// Check the step data
// 															expect(processItem.step.id).to.equal(currentStep.id);
// 															expect(processItem.step.seq).to.equal(currentStep.seq);
// 															expect(processItem.step.status).to.equal(currentStep.status);
// 															expect(processItem.step.message).to.equal(currentStep.message);
// 															expect(processItem.step.assignedTo.userId).to.equal(currentStep.assignedTo.userId);
// 															expect(processItem.step.assignedTo.name).to.equal(currentStep.assignedTo.name);
// 														})
// 													}
// 												})
// 											}
// 										})
// 									}
// 								}
// 							})
// 						}
// 					})
// 				})
// 			}).should.notify(done);
// 		})
// 	});
// 	// Test the transition method
// 	describe('- Method: transition()', function(){
// 		it('Should return a success message and update the processes instance data.', function(done){
// 			var processSeq = 1;
// 			var subProcessSeq = 1;
// 			var stepId = 'captureForm';
// 			var transitionId = 'submitForm';
// 			var data = {
// 				createdDate: '',
// 				endDate: '',
// 				userId: '9012',
// 				name: 'Brent Gordon',
// 				comment: ''
// 			}
// 			var currentStep = {};
// 			workflow.transition(processId, processSeq, subProcessId, subProcessSeq, stepId, transitionId, data).then(function(result){
// 				expect(result).to.be.an('object');
// 				expect(result.message).to.equal('Step transition completed successfully.');
// 				// Test the step updates to the workflow processes file
// 				workflow.instance.processes.filter(function(processItem){
// 					if (processItem.id === processId && processItem.seq === processSeq) {
// 						processItem.subProcesses.filter(function(subProcessItem){
// 							if (subProcessItem.id === subProcessId && subProcessItem.seq === subProcessSeq) {
// 								expect(subProcessItem.step.id).to.equal('authoriseForm');
// 								expect(subProcessItem.step.seq).to.equal(3);
// 								expect(subProcessItem.step.status).to.equal('submitted');
// 								expect(subProcessItem.step.message).to.equal('Form data submitted, user assigned and form data under review');
// 								expect(subProcessItem.step.assignedTo.userId).to.equal(data.userId);
// 								expect(subProcessItem.step.assignedTo.name).to.equal(data.name);
// 								expect(subProcessItem.step.comment).to.equal(data.comment);
// 								currentStep = subProcessItem.step;
// 							}
// 						})
// 					}
// 				})
// 				// Test the updates to the indicator documents workflow processes section
// 				workflow.config.processes.filter(function(processItem){
// 					if (processItem._id === processId) {
// 						processItem.subProcesses.filter(function(subProcessItem){
// 							if (subProcessItem._id === subProcessId) {
// 								var indicators = subProcessItem.indicators;
// 								for (var i = 0; i < indicators.length; i++) {
// 									var indicatorId = indicators[i]._id;
// 									workflow.indicators.filter(function(indicator){
// 										if (indicatorId === indicator.category.term) {
// 											var workflows = indicator.workflows;
// 											workflows.filter(function(wfInstance){
// 												if (wfInstance.id === workflow.config._id) {
// 													wfInstance.processes.filter(function(processItem){
// 														// Check the step data
// 														expect(processItem.step.id).to.equal('authoriseForm');
// 														expect(processItem.step.seq).to.equal(3);
// 														expect(processItem.step.status).to.equal('submitted');
// 														expect(processItem.step.message).to.equal('Form data submitted, user assigned and form data under review');
// 														expect(processItem.step.assignedTo.userId).to.equal(data.userId);
// 														expect(processItem.step.assignedTo.name).to.equal(data.name);
// 													})
// 												}
// 											})
// 										}
// 									})
// 								}
// 							}
// 						})
// 					}
// 				})
// 			}).should.notify(done);
// 		})
// 	});
//
// 	// Test the saveIndicator method
// 	describe('- Method: ui.getProcess()', function(){
// 		it('Should return the correct data model.', function(done){
// 			workflow.ui().getProcess(processId, 'en').then(function(data){
// 				// console.log(data);
// 			}).should.notify(done);
// 		})
// 	});
//
// });
