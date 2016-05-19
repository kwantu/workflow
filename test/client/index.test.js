'use strict';

var should = chai.should();
var expect = chai.expect;

// Get the test workflow configuration file
var config = {
	"_id": "1234:mangaungProject",
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
		"initiate": {
			"_type": "user",
			"maxInstances": "-1",
			"action": {
				"_type": "button",
				"label": "Register a new project"
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
			"form": {
				"_id": "frmRegistration",
				"name": {
					"i18n": {
						"_lang": "en",
						"value": "Registration Form"
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
				}]
			},
			"steps": [{
				"_id": "createForm",
				"_seq": "1",
				"_setStatusTo": "Created",
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
					"_seq": "1",
					"_type": "internal",
					"funct": {
						"module": "form",
						"method": "create"
					},
					"transitions": [{
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
				"_setStatusTo": "InProgress",
				"_setStatusMsgTo": "User assigned and data capture in progress",
				"name": {
					"i18n": {
						"_lang": "en",
						"value": "Capture the registration form data."
					}
				},
				"prerequisites": [{
					"_seq": "1",
					"_type": "checkRole",
					"_subject": "profileRole",
					"_operator": "equalTo",
					"_value": "capturer",
					"message": {
						"i18n": {
							"_lang": "en",
							"value": "You have to be a data capturer on the project to open the form for editing."
						}
					}
				}],
				"actions": [{
					"_seq": "1",
					"_type": "internal",
					"funct": {
						"module": "form",
						"method": "open"
					},
					"transitions": [{
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
				}]
			}, {
				"_id": "submitForm",
				"_seq": "3",
				"_setStatusTo": "Submitted",
				"_setStatusMsgTo": "Form data submitted",
				"name": {
					"i18n": {
						"_lang": "en",
						"value": "Submit the registration form."
					}
				},
				"prerequisites": [{
					"_seq": "1",
					"_type": "every",
					"_subject": "indicatorInstance.complete",
					"_operator": "eqaulTo",
					"_value": "true",
					"message": {
						"i18n": {
							"_lang": "en",
							"value": "All form sections need to be marked as complete before form submission."
						}
					}
				}],
				"actions": [{
					"_seq": "1",
					"_type": "internal",
					"funct": {
						"module": "form",
						"method": "submit"
					},
					"transitions": [{
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
				"_id": "reviewForm",
				"_seq": "4",
				"_setStatusTo": "underReview",
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
				"actions": [{
					"_seq": "1",
					"_type": "internal",
					"funct": {
						"module": "form",
						"method": "open"
					},
					"transitions": [{
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
				}]
			}, {
				"_id": "closeForm",
				"_seq": "5",
				"_setStatusTo": "Completed",
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
						"method": "close"
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
}

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





























