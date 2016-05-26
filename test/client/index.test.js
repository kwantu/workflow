'use strict';

var should = chai.should();
var expect = chai.expect;

// Get the test workflow configuration file
var config = {
	"_id": "mangaungProject",
	"_version": "1.0",
	"type": "workflowConfig",
	"title": {
		"name": {
			"i18n": {
				"_lang": "en",
				"value": "Mangagung project workflow"
			}
		},
		"description": {
			"i18n": {
				"_lang": "en",
				"value": "Mangagung project workflow used to manage housing development."
			}
		}
	},
	"identification": {
		"documentation": {
			"i18n": {
				"_lang": "",
				"value": ""
			}
		},
		"upgradeInformation": {
			"i18n": {
				"_lang": "",
				"value": ""
			}
		}
	},
	"variables": {
		"variable": [{
			"_id": "",
			"_dataType": "",
			"_sessionVar": "",
			"_default": "",
			"_value": ""
		}]
	},
	"roles": {
		"role": [{
			"_id": "",
			"_level": "",
			"name": {
				"i18n": {
					"_lang": "",
					"value": ""
				}
			},
			"roleMappings": {
				"roleMapping": {
					"_applicationId": "",
					"_roleId": ""
				}
			},
			"requiredRoles": {
				"requiredRole": {
					"_applicationId": "",
					"_roleId": ""
				}
			}
		}]
	},
	"processes": [{
		"_id": "registration",
		"_seq": "1",
		"name": {
			"i18n": {
				"_lang": "en",
				"value": "Register a project"
			}
		},
		"help": {
			"i18n": {
				"_lang": "en",
				"value": "Register a new project"
			}
		},
		"variables": [{
			"_id": "",
			"_dataType": "",
			"_sessionVar": "",
			"_default": "",
			"_value": ""
		}],
		"prerequisites": [{
			"_seq": "1",
			"_type": "count",
			"_subject": "monthlyProgress.instance",
			"_operator": "equalTo",
			"_value": "0",
			"message": {
				"i18n": {
					"_lang": "en",
					"value": "The project registration form can't be edited once the monthly progress process has been initiated."
				}
			}
		}],
		"preActions": [{
			"_seq": "",
			"_type": "",
			"funct": {
				"module": "",
				"method": "",
				"params": {
					"param": []
				}
			},
			"rest": {
				"hostId": "",
				"service": "",
				"APIKey": "",
				"format": "",
				"collection": "",
				"endpoint": "",
				"params": {
					"param": []
				}
			}
		}],
		"subProcesses": [{
			"_id": "spRegistration",
			"_seq": "1",
			"name": {
				"i18n": {
					"_lang": "en",
					"value": "Project Registration Form"
				}
			},
			"help": {
				"i18n": {
					"_lang": "en",
					"value": "Register a new project"
				}
			},
			"initiate": {
				"_type": "user",
				"maxInstances": "-1",
				"action": {
					"_type": "button",
					"label": "Create"
				},
				"dates": {
					"valid": {
						"_type": "userSelected",
						"message": {
							"i18n": {
								"_lang": "en",
								"value": "Please select a valid date i.e. the monthly date that the data captured is valid for."
							}
						}
					},
					"due": {
						"_type": "userSelected",
						"message": {
							"i18n": {
								"_lang": "en",
								"value": "Please select a due date i.e. the actual date that the data needs to be captured and authorised by."
							}
						}
					}
				}
			},
			"indicators": [{
				"_id": "projectDetail",
				"maxInstances": "1",
				"name": {
					"i18n": {
						"_lang": "en",
						"value": "Project Details"
					}
				}
			}, {
				"_id": "projectLocation",
				"maxInstances": "-1",
				"name": {
					"i18n": {
						"_lang": "en",
						"value": "Project Locations"
					}
				}
			}, {
				"_id": "developerDetail",
				"maxInstances": "1",
				"name": {
					"i18n": {
						"_lang": "en",
						"value": "Developer Details"
					}
				}
			}],
			"steps": [{
				"_id": "createForm",
				"_seq": "1",
				"_setInstanceStatusTo": "Created",
				"_setStatusMsgTo": "Form created",
				"name": {
					"i18n": {
						"_lang": "en",
						"value": "Create the registration form."
					}
				},
				"prerequisites": [{
					"_seq": "",
					"_type": "",
					"_operator": "",
					"_subject": "",
					"_value": "",
					"message": {
						"i18n": {
							"_lang": "en",
							"value": ""
						}
					}
				}],
				"actions": [{
					"_id": "createForm",
					"_seq": "1",
					"_type": "newSequence",
					"transitions": [{
						"_id": "createForm",
						"_type": "auto",
						"name": {
							"i18n": {
								"_lang": "en",
								"value": ""
							}
						},
						"goTo": {
							"_type": "nextStep",
							"_stepId": ""
						},
						"_stop": false
					}]
				}]
			}, {
				"_id": "captureForm",
				"_seq": "2",
				"_setInstanceStatusTo": "InProgress",
				"_setStatusMsgTo": "User assigned and data capture in progress",
				"name": {
					"i18n": {
						"_lang": "en",
						"value": "Capture"
					}
				},
				"prerequisites": [{
					"_seq": "1",
					"_type": "readyToSubmit",
					"_subject": "indicators.complete",
					"_operator": "equalTo",
					"_value": "true",
					"message": {
						"i18n": {
							"_lang": "en",
							"value": "All form indicators have to be marked as complete before submission."
						}
					}
				}],
				"actions": [],
				"task": {
					"assign": {
						"profileRole": {
							"profile": "current",
							"role": "capturer"
						},
						"default": ""
					},
					"work": {
						"action": "editForm"
					},
					"transitions": [{
						"_id": "submitForm",
						"_type": "user",
						"name": {
							"i18n": {
								"_lang": "en",
								"value": "Submit"
							}
						},
						"goTo": {
							"_type": "nextStep",
							"_stepId": ""
						},
						"_stop": false
					}]
				}
			}, {
				"_id": "authoriseForm",
				"_seq": "3",
				"_setInstanceStatusTo": "awaitingAuthorisation",
				"_setStatusMsgTo": "Form data submitted, user assigned and form data under review",
				"name": {
					"i18n": {
						"_lang": "en",
						"value": "Review the registration form data."
					}
				},
				"prerequisites": [{
					"_seq": "1",
					"_type": "checkRole",
					"_subject": "profileRole",
					"_operator": "equalTo",
					"_value": "authoriser",
					"message": {
						"i18n": {
							"_lang": "en",
							"value": "You have to be an authoriser on the project to approve the form data that has been captured or refer back for further editing."
						}
					}
				}],
				"actions": [],
				"task": {
					"assign": {
						"profileRole": {
							"profile": "current",
							"role": "authoriser"
						},
						"default": ""
					},
					"work": {
						"action": "editForm"
					},
					"transitions": [{
						"_id": "authoriseForm",
						"_type": "user",
						"name": {
							"i18n": {
								"_lang": "en",
								"value": "Authorise"
							}
						},
						"goTo": {
							"_type": "nextStep",
							"_stepId": ""
						},
						"_stop": false
					}, {
						"_id": "revertForm",
						"_type": "user",
						"name": {
							"i18n": {
								"_lang": "en",
								"value": "Refer Back"
							}
						},
						"goTo": {
							"_type": "stepId",
							"_stepId": "captureForm"
						},
						"_stop": false
					}]
				}
			}, {
				"_id": "closeForm",
				"_seq": "5",
				"_setInstanceStatusTo": "Complete",
				"_setStatusMsgTo": "Form locked",
				"name": {
					"i18n": {
						"_lang": "en",
						"value": "Close the registration form."
					}
				},
				"actions": [{
					"_seq": "1",
					"_type": "internal",
					"funct": {
						"module": "form",
						"method": "authorise"
					},
					"transition": [{
						"_type": "auto",
						"name": {
							"i18n": {
								"_lang": "en",
								"value": ""
							}
						},
						"goTo": {
							"_type": "",
							"_stepId": ""
						},
						"_stop": true
					}]
				}]
			}]
		}],
		"postActions": {}
	}]
};

// Create the workflow constrctor instance
var workflow = new Workflow('1234', '5678', config);

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
			workflow.create().then(function(data){
				expect(data).to.be.an('object');
				expect(data.complete).to.equal(true);
				expect(data.message).to.equal('Workflow processes instance created successfully.');
				expect(workflow.instance).to.be.an('object');
				expect(workflow.instance._id).to.equal(workflow.profile + ':processes');
				expect(workflow.instance.version).to.equal(workflow.config.version);
			}).should.notify(done);
		})
	});
	// Test the initialize method
	describe('- Method: initialize(): Create the first process instance', function(){
		it('Should return a success block and update the processes instance data.', function(done){
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
					expect(instance.uuid).to.equal(workflow.profile + ':' + workflow.app + ':' +id + ':0');
					expect(instance.key).to.equal('');
					expect(instance.seq).to.equal(1);
					expect(instance.status).to.equal('NotStarted');
					expect(instance.lastUpdated).to.equal(inputData.createdDate);
					expect(instance.complete).to.equal(false);
				}
			}).should.notify(done);
		})
	});
	// Test the saveIndicator method
	describe('- Method: saveIndicator()', function(){
		it('Should return ')

	});
	// Test the transition method
	describe('- Method: transition()', function(){
		it('Should return a success message and update the processes instance data.', function(done){
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
			}).should.notify(done);	
		})

	});
});

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
					expect(instance.uuid).to.equal(workflow.profile + ':' + workflow.app + ':' +id + ':0');
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
			}).should.notify(done);	
		})
	});
	describe('- Step 5. User ( authoriser ) reviews the form indicators data and refers it back to the captures, with a message, to fix data capture errors.', function(){
		it('Should return ')
		// Onclick of form 'Refer back' button: workflow.transition('revertForm')

	});
	describe('- Step 6. User ( capturer ) re-opens the workflow sub process form interface, updates the required data and marks each indicator as complete.', function(){
		it('Should return ')
		// Onclick of each form indicator tick icon: workflow.saveIndicator(indicatorId, indicatorSeq, docId)

	});
	describe('- Step 7. User ( capturer ) clicks on the workflow form UI submit button.', function(){
		it('Should return ')
		// Onclick of form 'Submit' button: workflow.transition('submitForm')

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





























