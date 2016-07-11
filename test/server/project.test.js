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

var processId = 'registration';
var subProcessId = 'spRegistration'

// Test function to replicate the dao save functionality
function saveFile(filename, data){
	var filePath = path.join(__dirname, '../data/' + filename + '.json');
	fs.writeFile(filePath, JSON.stringify(data), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log('File: "' + filename + '" saved.');
	});
};

// Workflow: Test case #1
describe('# TEST CASE: PROJECT WORKFLOW', function(){

	describe('- STEP 1. User (capturer/authoriser) navigates to the project app dashboard and creates a new profile.', function(){
		// Get the input data from the form
		var data = {
			createdDate: moment().format('YYYY-MM-DD'),
			validDate: '2016-06-30',
			dueDate: '2016-07-31',
			userId: '9012',
			name: 'Brent Gordon',
			comment: ''
		};

		it('Should create a new workflow instance.', function(done){
			workflow.create().then(function(result){
				expect(result).to.be.an('object');
				expect(result.message).to.equal('Workflow processes instance created successfully.');
				expect(workflow.instance).to.be.an('object');
				expect(workflow.instance._id).to.equal(workflow.profile + ':processes');
				expect(workflow.instance.version).to.equal(workflow.config.version);
				expect(workflow.instance.processes.length).to.equal(0);
				// Save file
				// saveFile(workflow.profile + ':processes', workflow.instance);
			}).should.notify(done);
		});

		it('Should initialise the first process, sub-process, step and associated indicator set documents.', function(done){
			var currentStep = {};
			workflow.initialise(processId, data).then(function(result){
				expect(result).to.be.an('object');
				expect(result.message).to.equal('Process: ' + processId + ' initialized successfully.');
				expect(workflow.instance).to.be.an('object');
				expect(workflow.instance._id).to.equal(workflow.profile + ':processes');
				expect(workflow.instance.version).to.equal(workflow.config.version);
				// Save file for testing
				// saveFile(workflow.profile + ':processes', workflow.instance);
				workflow.instance.processes.filter(function(processItem){
					if (processItem.id === processId && processItem.seq === 1) {
						// Workflow process instance data checks
						expect(processItem.id).to.equal(workflow.config.processes[0]._id);
						expect(processItem.seq).to.equal(1);
						processItem.subProcesses.filter(function(subProcessItem){
							if (subProcessItem.id === subProcessId && subProcessItem.seq === 1) {
								workflow.subprocesses.filter(function(subProcessObj){
									if (subProcessObj._id === subProcessItem.uuid) {
										// Workflow sub-process instance data checks
										expect(subProcessObj.id).to.equal(workflow.config.processes[0].subProcesses[0]._id);
										expect(subProcessObj.seq).to.equal(1);
										expect(subProcessObj.initiated).to.equal(true);
										expect(subProcessObj.dates.created).to.equal(data.createdDate);
										expect(subProcessObj.dates.valid).to.equal(data.validDate);
										expect(subProcessObj.dates.due).to.equal(data.dueDate);
										expect(subProcessObj.complete).to.equal(false);
										// Workflow sub-process indicators data checks
										workflow.config.processes.filter(function(confProcessItem){
											if (confProcessItem._id === processId){
												confProcessItem.subProcesses.filter(function(confSubProcessItem){
													if (confSubProcessItem._id === subProcessId) {
														var indicators = confSubProcessItem.indicators;
														for (var i = 0; i < indicators.length; i++) {
															var indicatorId = indicators[i]._id;
															for (var j = 0; j < subProcessObj.indicators.length; j++) {
																var indicator = subProcessObj.indicators[j];
																if (indicator.id === indicatorId) {
																	expect(indicator.id).to.equal(indicatorId);
																	var instances = indicator.instances;
																	for (var k = 0; k < instances.length; k++) {
																		var instance = instances[k];
																		expect(instance.uuid).to.equal(workflow.profile + ':' + workflow.app + ':' + indicatorId + ':0');
																		expect(instance.key).to.equal('');
																		expect(instance.seq).to.equal(1);
																	}
																}
															}
														}
													}
												})
											}
										})
										// Workflow step instance data checks
										currentStep = subProcessObj.step
										expect(currentStep.id).to.equal('captureForm');
										expect(currentStep.seq).to.equal(2);
										expect(currentStep.status).to.equal('InProgress');
										expect(currentStep.message).to.equal('User assigned and data capture in progress');
										expect(currentStep.assignedTo.userId).to.equal(data.userId);
										expect(currentStep.assignedTo.name).to.equal(data.name);
										expect(currentStep.comment).to.equal(data.comment);
										// Save for testing
										// saveFile(subProcessObj._id, subProcessObj);
										var indicators = subProcessObj.indicators;
										for (var i = 0; i < indicators.length; i++) {
											var indicatorId = indicators[i].id;
											for (var j = 0; j < indicators[i].instances.length; j++) {
												var uuid = indicators[i].instances[j].uuid;
												workflow.indicators.filter(function(indicator){
													if (uuid === indicator._id) {
														expect(indicator._id).to.equal(workflow.profile + ':' + workflow.app + ':' + indicatorId + ':0');
														expect(indicator.title).to.equal(indicator.category.label);
														expect(indicator.category.term).to.equal(indicator.category.term);
														expect(indicator.category.label).to.equal(indicator.category.label);
														// Check the indicator workflow processes section
														var workflows = indicator.workflows;
														workflows.filter(function(wfInstance){
															if (wfInstance.id === workflow.config._id) {
																expect(wfInstance.id).to.equal(workflow.config._id);
																expect(wfInstance.instance).to.equal(workflow.profile + ':processes');
																wfInstance.processes.filter(function(processItem){
																	expect(processItem.id).to.equal(processId);
																	expect(processItem.subProcessId).to.equal(subProcessId);
																	// Check the step data
																	expect(processItem.step.id).to.equal(currentStep.id);
																	expect(processItem.step.seq).to.equal(currentStep.seq);
																	expect(processItem.step.status).to.equal(currentStep.status);
																	expect(processItem.step.message).to.equal(currentStep.message);
																	expect(processItem.step.assignedTo.userId).to.equal(currentStep.assignedTo.userId);
																	expect(processItem.step.assignedTo.name).to.equal(currentStep.assignedTo.name);
																	// saveFile(uuid, indicator);
																})
															}
														})
													}
												})
											}
										}
									}
								})
							}
						})
					}
				})
			}).should.notify(done);
		});

	});

	describe('- STEP 2. User (capturer) navigates to profile process page, opens the "Register a project" process, captures, saves the indicator set/s data.', function(){
		it('Should update the associated indicator set instance/s step complete status.')
		// Onclick of each form indicator tick icon: workflow.task()

	});

	describe('- STEP 3. User (capturer) submits the data for authorisation.', function(){
		it('Should transition to the next step.', function(done){
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
			var currentStep = {};
			workflow.transition(processId, processSeq, subProcessId, subProcessSeq, stepId, transitionId, data).then(function(result){
				expect(result).to.be.an('object');
				expect(result.message).to.equal('Step transition completed successfully.');
				// Test the step updates to the workflow processes file
				workflow.instance.processes.filter(function(processItem){
					if (processItem.id === processId && processItem.seq === processSeq) {
						processItem.subProcesses.filter(function(subProcessItem){
							if (subProcessItem.id === subProcessId && subProcessItem.seq === subProcessSeq) {
								workflow.subprocesses.filter(function(subProcessObj){
									if (subProcessObj._id === subProcessItem.uuid) {
										expect(subProcessObj.step.id).to.equal('authoriseForm');
										expect(subProcessObj.step.seq).to.equal(3);
										expect(subProcessObj.step.status).to.equal('submitted');
										expect(subProcessObj.step.message).to.equal('Form data submitted, user assigned and form data under review');
										expect(subProcessObj.step.assignedTo.userId).to.equal(data.userId);
										expect(subProcessObj.step.assignedTo.name).to.equal(data.name);
										expect(subProcessObj.step.comment).to.equal(data.comment);
										currentStep = subProcessObj.step;
									}
								})
							}
						})
					}
				})
				// Test the updates to the indicator documents workflow processes section
				workflow.config.processes.filter(function(processItem){
					if (processItem._id === processId) {
						processItem.subProcesses.filter(function(subProcessItem){
							if (subProcessItem._id === subProcessId) {
								var indicators = subProcessItem.indicators;
								for (var i = 0; i < indicators.length; i++) {
									var indicatorId = indicators[i]._id;
									workflow.indicators.filter(function(indicator){
										if (indicatorId === indicator.category.term) {
											var workflows = indicator.workflows;
											workflows.filter(function(wfInstance){
												if (wfInstance.id === workflow.config._id) {
													wfInstance.processes.filter(function(processItem){
														// Check the step data
														expect(processItem.step.id).to.equal('authoriseForm');
														expect(processItem.step.seq).to.equal(3);
														expect(processItem.step.status).to.equal('submitted');
														expect(processItem.step.message).to.equal('Form data submitted, user assigned and form data under review');
														expect(processItem.step.assignedTo.userId).to.equal(data.userId);
														expect(processItem.step.assignedTo.name).to.equal(data.name);
													})
												}
											})
										}
									})
								}
							}
						})
					}
				})
			}).should.notify(done);
		})
	});

	describe('- STEP 4. User (authoriser) reviews the form indicators data and refers it back with a message.', function(){
		it('Should transition the workflow back to the data capture step ( captureForm ).', function(done){
			var processSeq = 1;
			var subProcessSeq = 1;
			var stepId = 'authoriseForm';
			var transitionId = 'revertForm';
			var data = {
				createdDate: '',
				endDate: '',
				userId: '9012',
				name: 'Brent Gordon',
				comment: 'Please fix the errors in the project details form.'
			}
			var currentStep = {};
			workflow.transition(processId, processSeq, subProcessId, subProcessSeq, stepId, transitionId, data).then(function(result){
				expect(result).to.be.an('object');
				expect(result.message).to.equal('Step transition completed successfully.');
				// Step updates
				workflow.instance.processes.filter(function(processItem){
					if (processItem.id === processId && processItem.seq === processSeq) {
						processItem.subProcesses.filter(function(subProcessItem){
							if (subProcessItem.id === subProcessId && subProcessItem.seq === subProcessSeq) {
								workflow.subprocesses.filter(function(subProcessObj){
									if (subProcessObj._id === subProcessItem.uuid) {
										expect(subProcessObj.step.id).to.equal('captureForm');
										expect(subProcessObj.step.seq).to.equal(2);
										expect(subProcessObj.step.status).to.equal('InProgress');
										expect(subProcessObj.step.message).to.equal('User assigned and data capture in progress');
										expect(subProcessObj.step.assignedTo.userId).to.equal(data.userId);
										expect(subProcessObj.step.assignedTo.name).to.equal(data.name);
										expect(subProcessObj.step.comment).to.equal(data.comment);
										currentStep = subProcessObj.step;
									}
								})
							}
						})
					}
				})
				// Test the updates to the indicator documents workflow processes section
				workflow.config.processes.filter(function(processItem){
					if (processItem._id === processId) {
						processItem.subProcesses.filter(function(subProcessItem){
							if (subProcessItem._id === subProcessId) {
								var indicators = subProcessItem.indicators;
								for (var i = 0; i < indicators.length; i++) {
									var indicatorId = indicators[i]._id;
									workflow.indicators.filter(function(indicator){
										if (indicatorId === indicator.category.term) {
											var workflows = indicator.workflows;
											workflows.filter(function(wfInstance){
												if (wfInstance.id === workflow.config._id) {
													wfInstance.processes.filter(function(processItem){
														// Check the step data
														expect(processItem.step.id).to.equal('captureForm');
														expect(processItem.step.seq).to.equal(2);
														expect(processItem.step.status).to.equal('InProgress');
														expect(processItem.step.message).to.equal('User assigned and data capture in progress');
														expect(processItem.step.assignedTo.userId).to.equal(data.userId);
														expect(processItem.step.assignedTo.name).to.equal(data.name);
													})
												}
											})
										}
									})
								}
							}
						})
					}
				})
			}).should.notify(done);
		})
	});

	describe('- STEP 5. User (capturer) updates the form indicator data and marks each indicator as complete.', function(){
		it('Should update the associated indicator set instance/s step complete status.')
		// Onclick of each form indicator tick icon: workflow.saveIndicator(indicatorId, indicatorSeq, docId)

	});

	describe('- STEP 6. User (capturer) re-submits the data for authorisation.', function(){
		it('Should transition to the next step.', function(done){
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
			var currentStep = {};
			workflow.transition(processId, processSeq, subProcessId, subProcessSeq, stepId, transitionId, data).then(function(result){
				expect(result).to.be.an('object');
				expect(result.message).to.equal('Step transition completed successfully.');
				// Step updates
				workflow.instance.processes.filter(function(processItem){
					if (processItem.id === processId && processItem.seq === processSeq) {
						processItem.subProcesses.filter(function(subProcessItem){
							if (subProcessItem.id === subProcessId && subProcessItem.seq === subProcessSeq) {
								workflow.subprocesses.filter(function(subProcessObj){
									if (subProcessObj._id === subProcessItem.uuid) {
										expect(subProcessObj.step.id).to.equal('authoriseForm');
										expect(subProcessObj.step.seq).to.equal(3);
										expect(subProcessObj.step.status).to.equal('submitted');
										expect(subProcessObj.step.message).to.equal('Form data submitted, user assigned and form data under review');
										expect(subProcessObj.step.assignedTo.userId).to.equal(data.userId);
										expect(subProcessObj.step.assignedTo.name).to.equal(data.name);
										expect(subProcessObj.step.comment).to.equal(data.comment);
										currentStep = subProcessObj.step;
									}
								})
							}
						})
					}
				})
				// Test the updates to the indicator documents workflow processes section
				workflow.config.processes.filter(function(processItem){
					if (processItem._id === processId) {
						processItem.subProcesses.filter(function(subProcessItem){
							if (subProcessItem._id === subProcessId) {
								var indicators = subProcessItem.indicators;
								for (var i = 0; i < indicators.length; i++) {
									var indicatorId = indicators[i]._id;
									workflow.indicators.filter(function(indicator){
										if (indicatorId === indicator.category.term) {
											var workflows = indicator.workflows;
											workflows.filter(function(wfInstance){
												if (wfInstance.id === workflow.config._id) {
													wfInstance.processes.filter(function(processItem){
														// Check the step data
														expect(processItem.step.id).to.equal('authoriseForm');
														expect(processItem.step.seq).to.equal(3);
														expect(processItem.step.status).to.equal('submitted');
														expect(processItem.step.message).to.equal('Form data submitted, user assigned and form data under review');
														expect(processItem.step.assignedTo.userId).to.equal(data.userId);
														expect(processItem.step.assignedTo.name).to.equal(data.name);
													})
												}
											})
										}
									})
								}
							}
						})
					}
				})
			}).should.notify(done);
		})
	});

	describe('- STEP 8. User (authoriser) reviews the updated form indicator data and authorises it.', function(){
		it('Should transition the workflow to the next step and close the form.', function(done){
			var processSeq = 1;
			var subProcessSeq = 1;
			var stepId = 'authoriseForm';
			var transitionId = 'authoriseForm';
			var data = {
				createdDate: '',
				endDate: '',
				userId: '9012',
				name: 'Brent Gordon',
				comment: ''
			}
			var currentStep = {};
			workflow.transition(processId, processSeq, subProcessId, subProcessSeq, stepId, transitionId, data).then(function(result){
				expect(result).to.be.an('object');
				expect(result.message).to.equal('All Step transitions have completed successfully.');
				// Step updates
				workflow.instance.processes.filter(function(processItem){
					if (processItem.id === processId && processItem.seq === processSeq) {
						processItem.subProcesses.filter(function(subProcessItem){
							if (subProcessItem.id === subProcessId && subProcessItem.seq === subProcessSeq) {
								workflow.subprocesses.filter(function(subProcessObj){
									if (subProcessObj._id === subProcessItem.uuid) {
										expect(subProcessObj.complete).to.equal(true);
										expect(subProcessObj.step.id).to.equal('closeForm');
										expect(subProcessObj.step.seq).to.equal(4);
										expect(subProcessObj.step.status).to.equal('Complete');
										expect(subProcessObj.step.message).to.equal('Form locked');
										expect(subProcessObj.step.assignedTo.userId).to.equal(data.userId);
										expect(subProcessObj.step.assignedTo.name).to.equal(data.name);
										expect(subProcessObj.step.comment).to.equal(data.comment);
										currentStep = subProcessObj.step;
									}
								})
							}
						})
					}
				})
				// Test the updates to the indicator documents workflow processes section
				workflow.config.processes.filter(function(processItem){
					if (processItem._id === processId) {
						processItem.subProcesses.filter(function(subProcessItem){
							if (subProcessItem._id === subProcessId) {
								var indicators = subProcessItem.indicators;
								for (var i = 0; i < indicators.length; i++) {
									var indicatorId = indicators[i]._id;
									workflow.indicators.filter(function(indicator){
										if (indicatorId === indicator.category.term) {
											var workflows = indicator.workflows;
											workflows.filter(function(wfInstance){
												if (wfInstance.id === workflow.config._id) {
													wfInstance.processes.filter(function(processItem){
														// Check the step data
														expect(processItem.step.id).to.equal('closeForm');
														expect(processItem.step.seq).to.equal(4);
														expect(processItem.step.status).to.equal('Complete');
														expect(processItem.step.message).to.equal('Form locked');
														expect(processItem.step.assignedTo.userId).to.equal(data.userId);
														expect(processItem.step.assignedTo.name).to.equal(data.name);
													})
												}
											})
										}
									})
								}
							}
						})
					}
				})
			}).should.notify(done);
		})
	});

	describe('- STEP 9. User (capturer/authoriser) navigates to the existing profile forms tab and creates another version of the registration form / process.', function(){
		it('Should initialise a second instance of the first process, sub-process, step and associated indicator set documents.', function(done){
			// Initialise the Workflow instance with the existing processes instance file
			// Get the input data from the form
			var data = {
				createdDate: moment().format('YYYY-MM-DD'),
				validDate: '2016-06-30',
				dueDate: '2016-07-31',
				userId: '9012',
				name: 'Brent Gordon',
				comment: ''
			};
			var currentStep = {};
			workflow.initialise(processId, data).then(function(result){
				expect(result).to.be.an('object');
				expect(result.message).to.equal('Process: ' + processId + ' initialized successfully.');
				expect(workflow.instance).to.be.an('object');
				expect(workflow.instance._id).to.equal(workflow.profile + ':processes');
				expect(workflow.instance.version).to.equal(workflow.config.version);
				// Save file for testing
				// saveFile(workflow.profile + ':processes', workflow.instance);
				workflow.instance.processes.filter(function(processItem){
					if (processItem.id === processId && processItem.seq === 2) {
						// Workflow process instance data checks
						expect(processItem.id).to.equal(workflow.config.processes[0]._id);
						expect(processItem.seq).to.equal(2);
						processItem.subProcesses.filter(function(subProcessItem){
							if (subProcessItem.id === subProcessId && subProcessItem.seq === 1) {
								workflow.subprocesses.filter(function(subProcessObj){
									if (subProcessObj._id === subProcessItem.uuid) {
										// Workflow sub-process instance data checks
										expect(subProcessObj.id).to.equal(workflow.config.processes[0].subProcesses[0]._id);
										expect(subProcessObj.seq).to.equal(1);
										expect(subProcessObj.initiated).to.equal(true);
										expect(subProcessObj.dates.created).to.equal(data.createdDate);
										expect(subProcessObj.dates.valid).to.equal(data.validDate);
										expect(subProcessObj.dates.due).to.equal(data.dueDate);
										expect(subProcessObj.complete).to.equal(false);
										// Workflow sub-process indicators data checks
										workflow.config.processes.filter(function(confProcessItem){
											if (confProcessItem._id === processId){
												confProcessItem.subProcesses.filter(function(confSubProcessItem){
													if (confSubProcessItem._id === subProcessId) {
														var indicators = confSubProcessItem.indicators;
														for (var i = 0; i < indicators.length; i++) {
															var indicatorId = indicators[i]._id;
															for (var j = 0; j < subProcessObj.indicators.length; j++) {
																var indicator = subProcessObj.indicators[j];
																if (indicator.id === indicatorId) {
																	expect(indicator.id).to.equal(indicatorId);
																	var instances = indicator.instances;
																	for (var k = 0; k < instances.length; k++) {
																		var instance = instances[k];
																		expect(instance.uuid).to.equal(workflow.profile + ':' + workflow.app + ':' + indicatorId + ':0');
																		expect(instance.key).to.equal('');
																		expect(instance.seq).to.equal(1);
																	}
																}
															}
														}
													}
												})
											}
										})
										// Workflow step instance data checks
										currentStep = subProcessObj.step
										expect(currentStep.id).to.equal('captureForm');
										expect(currentStep.seq).to.equal(2);
										expect(currentStep.status).to.equal('InProgress');
										expect(currentStep.message).to.equal('User assigned and data capture in progress');
										expect(currentStep.assignedTo.userId).to.equal(data.userId);
										expect(currentStep.assignedTo.name).to.equal(data.name);
										expect(currentStep.comment).to.equal(data.comment);
										// Save for testing
										// saveFile(subProcessObj._id, subProcessObj);
										// Form indicator instance/s data checks
										var indicators = subProcessObj.indicators;
										for (var i = 0; i < indicators.length; i++) {
											var indicatorId = indicators[i].id;
											for (var j = 0; j < indicators[i].instances.length; j++) {
												var uuid = indicators[i].instances[j].uuid;
												workflow.indicators.filter(function(indicator){
													if (uuid === indicator._id) {
														expect(indicator._id).to.equal(workflow.profile + ':' + workflow.app + ':' + indicatorId + ':0');
														expect(indicator.title).to.equal(indicator.category.label);
														expect(indicator.category.term).to.equal(indicator.category.term);
														expect(indicator.category.label).to.equal(indicator.category.label);
														// Check the indicator workflow processes section
														var workflows = indicator.workflows;
														workflows.filter(function(wfInstance){
															if (wfInstance.id === workflow.config._id) {
																expect(wfInstance.id).to.equal(workflow.config._id);
																expect(wfInstance.instance).to.equal(workflow.profile + ':processes');
																wfInstance.processes.filter(function(processItem){
																	expect(processItem.id).to.equal(processId);
																	expect(processItem.subProcessId).to.equal(subProcessId);
																	// Check the step data
																	expect(processItem.step.id).to.equal(currentStep.id);
																	expect(processItem.step.seq).to.equal(currentStep.seq);
																	expect(processItem.step.status).to.equal(currentStep.status);
																	expect(processItem.step.message).to.equal(currentStep.message);
																	expect(processItem.step.assignedTo.userId).to.equal(currentStep.assignedTo.userId);
																	expect(processItem.step.assignedTo.name).to.equal(currentStep.assignedTo.name);
																	// saveFile(uuid, indicator);
																})
															}
														})
													}
												})
											}
										}
									}
								})
							}
						})
					}
				})
			}).should.notify(done);
		})
	});

	describe('- STEP 10. User (capturer) opens the latest "Register a project" process, captures and saves the data of the indicator set/s and marks them as complete.', function(){
		it('Should update the associated indicator set instance/s step complete status.')
	});

	describe('- STEP 11. User (capturer) submits the data for authorisation.', function(){
		it('Should transition to the next step.', function(done){
			var processSeq = 2;
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
			var currentStep = {};
			workflow.transition(processId, processSeq, subProcessId, subProcessSeq, stepId, transitionId, data).then(function(result){
				expect(result).to.be.an('object');
				expect(result.message).to.equal('Step transition completed successfully.');
				// Step updates
				workflow.instance.processes.filter(function(processItem){
					if (processItem.id === processId && processItem.seq === processSeq) {
						processItem.subProcesses.filter(function(subProcessItem){
							if (subProcessItem.id === subProcessId && subProcessItem.seq === subProcessSeq) {
								workflow.subprocesses.filter(function(subProcessObj){
									if (subProcessObj._id === subProcessItem.uuid) {
										expect(subProcessObj.step.id).to.equal('authoriseForm');
										expect(subProcessObj.step.seq).to.equal(3);
										expect(subProcessObj.step.status).to.equal('submitted');
										expect(subProcessObj.step.message).to.equal('Form data submitted, user assigned and form data under review');
										expect(subProcessObj.step.assignedTo.userId).to.equal(data.userId);
										expect(subProcessObj.step.assignedTo.name).to.equal(data.name);
										expect(subProcessObj.step.comment).to.equal(data.comment);
										currentStep = subProcessObj.step;
									}
								})
							}
						})
					}
				})
				// Test the updates to the indicator documents workflow processes section
				workflow.config.processes.filter(function(processItem){
					if (processItem._id === processId) {
						processItem.subProcesses.filter(function(subProcessItem){
							if (subProcessItem._id === subProcessId) {
								var indicators = subProcessItem.indicators;
								for (var i = 0; i < indicators.length; i++) {
									var indicatorId = indicators[i]._id;
									workflow.indicators.filter(function(indicator){
										if (indicatorId === indicator.category.term) {
											var workflows = indicator.workflows;
											workflows.filter(function(wfInstance){
												if (wfInstance.id === workflow.config._id) {
													wfInstance.processes.filter(function(processItem){
														// Check the step data
														expect(processItem.step.id).to.equal('authoriseForm');
														expect(processItem.step.seq).to.equal(3);
														expect(processItem.step.status).to.equal('submitted');
														expect(processItem.step.message).to.equal('Form data submitted, user assigned and form data under review');
														expect(processItem.step.assignedTo.userId).to.equal(data.userId);
														expect(processItem.step.assignedTo.name).to.equal(data.name);
													})
												}
											})
										}
									})
								}
							}
						})
					}
				})
			}).should.notify(done);
		})
	});

	describe('- STEP 12. User (authoriser) reviews the updated form indicator data and authorises it.', function(){
		it('Should transition the workflow to the next step and close the form.', function(done){
			var processSeq = 2;
			var subProcessSeq = 1;
			var stepId = 'authoriseForm';
			var transitionId = 'authoriseForm';
			var data = {
				createdDate: '',
				endDate: '',
				userId: '9012',
				name: 'Brent Gordon',
				comment: ''
			}
			var currentStep = {};
			workflow.transition(processId, processSeq, subProcessId, subProcessSeq, stepId, transitionId, data).then(function(result){
				expect(result).to.be.an('object');
				expect(result.message).to.equal('All Step transitions have completed successfully.');
				// Step updates
				workflow.instance.processes.filter(function(processItem){
					if (processItem.id === processId && processItem.seq === processSeq) {
						processItem.subProcesses.filter(function(subProcessItem){
							if (subProcessItem.id === subProcessId && subProcessItem.seq === subProcessSeq) {
								workflow.subprocesses.filter(function(subProcessObj){
									if (subProcessObj._id === subProcessItem.uuid) {
										expect(subProcessObj.complete).to.equal(true);
										expect(subProcessObj.step.id).to.equal('closeForm');
										expect(subProcessObj.step.seq).to.equal(4);
										expect(subProcessObj.step.status).to.equal('Complete');
										expect(subProcessObj.step.message).to.equal('Form locked');
										expect(subProcessObj.step.assignedTo.userId).to.equal(data.userId);
										expect(subProcessObj.step.assignedTo.name).to.equal(data.name);
										expect(subProcessObj.step.comment).to.equal(data.comment);
										currentStep = subProcessObj.step;
									}
								})
							}
						})
					}
				})
				// Test the updates to the indicator documents workflow processes section
				workflow.config.processes.filter(function(processItem){
					if (processItem._id === processId) {
						processItem.subProcesses.filter(function(subProcessItem){
							if (subProcessItem._id === subProcessId) {
								var indicators = subProcessItem.indicators;
								for (var i = 0; i < indicators.length; i++) {
									var indicatorId = indicators[i]._id;
									workflow.indicators.filter(function(indicator){
										if (indicatorId === indicator.category.term) {
											var workflows = indicator.workflows;
											workflows.filter(function(wfInstance){
												if (wfInstance.id === workflow.config._id) {
													wfInstance.processes.filter(function(processItem){
														// Check the step data
														expect(processItem.step.id).to.equal('closeForm');
														expect(processItem.step.seq).to.equal(4);
														expect(processItem.step.status).to.equal('Complete');
														expect(processItem.step.message).to.equal('Form locked');
														expect(processItem.step.assignedTo.userId).to.equal(data.userId);
														expect(processItem.step.assignedTo.name).to.equal(data.name);
													})
												}
											})
										}
									})
								}
							}
						})
					}
				})
			}).should.notify(done);
		})
	});

})
