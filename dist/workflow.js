(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Workflow = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Process = require('./lib/process');

var util = require('./lib/utility');
var models = require('./lib/models');

/*globals */

/** 
 * Kwantu workflow engine
 *
 * @constructor
 * @param {string} profile - Profile UUID
 * @param {Object} [config] - Workflow configuration
 * 	@param {string} config._id 
 *	Workflow configuration / definition ID
 * @param {Object} [instance] - Workflow instance
 * 	@param {string} instance._id 
 *	Workflow instance ID
 * @author Brent Gordon
 * @version 0.1.0
 *
 * @example new Workflow('1234', {})
 * 
 *
 * @return {Object} new Workflow object
 *
 * @throws "ERROR: Message"
 *
 */

function Workflow(profile, app, config, instance){
	//
	var _this = this;
	// Profile ID validation checks
	if (profile === '' || profile === undefined) {
        throw new Error('A profile id is required.');
    } else if (typeof(profile) !== 'string') {
    	throw new Error('The profile id must be a javascript string.');
    } else {
    	_this.profile = profile || '';
    }
    // App ID validation checks
	if (app === '' || app === undefined) {
        throw new Error('An app id is required.');
    } else if (typeof(app) !== 'string') {
    	throw new Error('The app id must be a javascript string.');
    } else {
    	_this.app = app || '';
    }
    // Workflow configuration validation checks
    if (config === '' || config === undefined) {
    	throw new Error('A workflow configuration is required.');
    } else if (typeof(config) !== 'object') {
        _this.config = JSON.parse(config);
    } else {
    	_this.config = config;
    }
    // Workflow instance validation checks
    _this.instance = instance;
}

/** 
 * Create a new workflow process.
 *
 * @example 
 * Workflow.create();
 *
 * @return Success / error message with the newly created workflow processes
 * instance data.
 *
 */
Workflow.prototype.create = function(){
	//
	var _this = this;
	// Use the native es6 Promise constructor
	return new Promise(function(resolve, reject) {
		if (_this.instance !== undefined) {
			var warn = util.warn('Instance already exists.', _this.instance)
			resolve(warn);
		} else {
			// Create the workflow processes instance object
			var model = models.instance();
			model._id = _this.profile + ':processes';
			model.version = _this.config.version;
			// Update the processes and subProcesses sections with defaults
			// model.processes[0].id = _this.config.processes[0]._id;
			// model.processes[0].seq = 1;
			_this.instance = model;
			var success = util.success('Workflow processes instance created successfully.', _this.instance);
			resolve(success);
		}
	});
};

/** 
 * Workflow initialize, this function executes a process within a workflow
 * configuration.
 *
 * @param {string} processId - the process id to process
 * @param {object} inputData - the input data to process
 *
 * @example 
 * Workflow.initialize('processId', { validDate: 'date' });
 *
 * @return 
 * { complete: true, message: 'Process: 'processId' initialized successfully.', res: undefined }
 *
 */
Workflow.prototype.initialize = function(processId, inputData){
	// Re-assign this 
	var _this = this;
	return new Promise(function(resolve, reject) {
		var configProcess = [];
		// Check the passed in parameters
		if (processId !== '' && processId !== undefined) {
			// Get the current process config
			configProcess = _this.config.processes.filter(function(objProcess){
				if (objProcess._id === processId) {
					return objProcess;
				}
			});
			if (configProcess[0]._id === undefined) {
				var error = util.error('WFConfigError', 'No valid process definition found with process id: ' + processId);
				reject(error);
			}
		} else {
			configProcess.push(_this.config.processes[0]);
			processId = _this.config.processes[0]._id;
		}
		// Get the current list of process instances
		var processSeq = 1;
		var currentProcess = [];
		currentProcess = _this.instance.processes.filter(function(objProcess){
			if (objProcess.id === processId) {
				return objProcess;
			}
		});
		var currentSeq = currentProcess.length;
		var nextSeq = currentSeq + 1;
		// Push the process object into the array
		var processModel = {
			"id": "", 
	      	"seq": "", 
	      	"subProcesses": []
		}
		// 1. Update the process id and seq
		processModel.id = processId;
		processModel.seq = nextSeq;
		_this.instance.processes.push(processModel);
		// 2. Complete all the process prerequisites
		Process.preRequisites(configProcess[0].prerequisites, _this).then(function(result){
			// Check if all pre-requisites were met
			if (result.complete === true) {
				// 3. Complete all the process pre-actions
				Process.preActions(configProcess[0].preActions, _this).then(function(result){
					// Check if all pre-actions were met
					if (result.complete) {
						// 4. Initialise the first sub-process
						Process.subProcess(processId, configProcess[0].subProcesses[0], 1, inputData, _this).then(function(result){
							// Check if sub-process initialisation was successfull
							if (result.complete) {
								// 5. Update the subProcess section details in the processes model
								var subProcessModel = result.res;
								// _this.instance.processes[processIndex].subProcesses.push(subProcessModel);
								_this.instance.processes.filter(function(objProcess){
									if (objProcess.id === processId) {
										objProcess.subProcesses.push(subProcessModel);
									}
								});
								var success = util.success('Process: ' + _this.config.processes[0]._id + ' initialized successfully.');
								resolve(success);
							} else {
								var error = util.error('WFSubProcessError','Process initialisation failed.');
								reject(error);
							}
						}, function(err){
							reject(err);
						});
					} else {
						var error = util.error('WFPreActionsError', 'Process pre-actions execution failed.');
						reject(error);
					}
				}, function(err){
					reject(err);
				});
			} else {
				var error = util.error('WFPreRequisitesError', 'Process pre-requisites execution failed.');
				reject(error);
			}
		}, function(err){
			reject(err);
		});
	});
};

Workflow.prototype.task = function(type, params){
	// Re-assign this 
	var _this = this;
	return new Promise(function(resolve, reject) {
		if (type === 'indicator.markComplete') {
			resolve('Success');
		} else {
			reject('Error');
		}
	});
};

Workflow.prototype.transition = function(processId, subProcessId, stepId, transitionId, subProcessModel, inputData, workflow){
	// Re-assign this 
	var _this = this;
	// Use the native es6 Promise constructor
	return new Promise(function(resolve, reject) {
		Process.transition(processId, subProcessId, stepId, transitionId, subProcessModel, inputData, workflow).then(function(result){
			var success = util.success('Workflow transitioned to the next step successfully.', subProcessModel);
			resolve(success);
		}, function(err){
			reject(err);
		});	
	});
};

module.exports = Workflow;


















},{"./lib/models":3,"./lib/process":4,"./lib/utility":5}],2:[function(require,module,exports){
'use strict';

var util = require('./utility');

/**
 * Form Module
 *
 * @module lib/form
 * @author Brent Gordon
 * @version 2.0.0
 * @description 
 * @copyright Kwantu Ltd RSA 2009-2015.
 *
 */

function create(formDef, workflow){
	var indicators = [];
	return new Promise(function(resolve, reject) {
		util.syncLoop(formDef.indicators.length, function(loop){
			var counter = loop.iteration();
			var indicatorId = formDef.indicators[counter]._id;
			var indicatorName = formDef.indicators[counter].name.i18n.value;
			// Comment out for testing
			// var indicator = {};
			// library.createIndicatorInstance(indicatorId, workflow.profile).done(function(data){
			// 	indicator = data;
			// 	indicators.push(indicator);
			// 	loop.next();
			// }).fail(function(err){
			// 	console.log(err);
			// });
			var uuid = workflow.profile + ':' + workflow.app + ':' + indicatorId + ':0'; // replace this with gatekeeper call and return the uuid
			var indicator = {
				_id: uuid,
				category: {
					term: indicatorId,
					label: indicatorName
				},
				"processes": []
			};
			indicators.push(indicator);
			loop.next();
		}, function(){
		    // console.log('done');
		    var success = util.success('Form created successfully.', indicators);
			resolve(success);
		});
	});
};

function save(indicator){
	var completed = [];
	var result = {
		complete: true,
		data: []
	};
	return new Promise(function(resolve, reject) {
		var success = util.success('Form indicator set saved successfully.', result);
		resolve(success);
	});
};

function submit(form){
	var completed = [];
	var result = {
		complete: true,
		data: []
	};
	return new Promise(function(resolve, reject) {
		var success = util.success('Form submitted successfully.', result);
		resolve(success);
	});
};

function authorise(form){
	var completed = [];
	var result = {
		complete: true,
		data: []
	};
	return new Promise(function(resolve, reject) {
		var success = util.success('Form authorised successfully.', result);
		resolve(success);
	});
};

function close(form){
	var completed = [];
	var result = {
		complete: true,
		data: []
	};
	return new Promise(function(resolve, reject) {
		var success = util.success('Form closed successfully.', result);
		resolve(success);
	});
};

module.exports = { 

 	create: create,
 	save: save,
 	submit: submit,
 	authorise: authorise,
 	close: close

}

},{"./utility":5}],3:[function(require,module,exports){
'use strict';

var util = require('./utility');

/**
 * Model Module
 *
 * @module lib/model
 * @author Brent Gordon
 * @version 0.1.0
 * @description 
 * @copyright Kwantu Ltd RSA 2009-2015.
 *
 */

function instance(){
	var model = {
	    "_id": "",
	    "version": "",
	    "type": "workflowInstance",
	    "processes": []
	};
	return model;
};

function configuration(){
	var model = {
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
				// Not allowed to create another instance if there is one open
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
						"_seq": "1",
						"_type": "internal",
						"funct": {
							"module": "form",
							"method": "create",
							"type": "newSequence" 
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
	return model;
};

function process(){
	var model = {
        "configId": "", 
        "instanceId": "",
        "processId": "",
        "subProcessId": "",
        "stepId": "",
        "assignedTo": {
            "userId": "",
            "name": ""
        },
        "token": "",
        "status": "",
        "statusMsg": "",
        "lastUpdated": "",
        "dueDate": ""
    }
    return model;
};

module.exports = { 

 	configuration: configuration, 
 	instance: instance, 
 	process: process

}
},{"./utility":5}],4:[function(require,module,exports){
'use strict';

var util = require('./utility');
var form = require('./form');

/**
 * Process Module
 *
 * @module lib/process
 * @author Brent Gordon
 * @version 0.1.0
 * @description 
 * @copyright Kwantu Ltd RSA 2009-2015.
 *
 */

/** 
 * Process pre-requisites
 *
 * @param {object} prerequisites - the pre-requisites config data
 *
 * @example 
 *
 * @return 
 *
 */
function preRequisites(prerequisites) {
	var completed = [];
	var result = {
		complete: false,
		data: []
	};
	return new Promise(function(resolve, reject) {
		// Uncomment below section when ready to implement
		// util.syncLoop(prerequisites.length, function(loop){
		// 	var counter = loop.iteration();
		// 	preRequisite(prerequisites[counter], counter).then(function(data){			
		// 		// Check if all pre-requisites completed successfully.
		// 		completed.push(data.complete);
		// 		result.data.push(data);
		// 		if (completed.every(Boolean)) {
		// 			result.completed = true;
		// 			loop.next();
		// 			var success = util.success('Pre-requisites completed successfully.', result);
		// 			deferred.resolve(success);
		// 		} else {
		// 			loop.break();
		// 			var error = util.error('WF007');
		// 			deferred.reject(error);
		// 		}
		// 	}, function(err){
		// 		loop.break();
		// 		deferred.reject(err);
		// 	});
		// });
		var success = util.success('Pre-requisites completed successfully.', result);
		resolve(success);
	});
};

/** 
 * Process pre-requisite, execute the pre-requisite condition.
 *
 * @param {object} prerequisite - the pre-requisite config data
 * @param {number} counter - the pre-requisite count / number
 * @param {object} workflow - the workflow constructor instance
 *
 * @example 
 * var config = {
 *	    "_seq": "",
 *	    "_type": "",
 *		"_subject": "",
 *	    "_operator": "",
 *	    "_value": "",
 *	    "_reference": "",
 *	    "message": {
 *	    	"i18n": {
 *	    		"_lang": "en",
 *	    		"value": ""
 *	    	}
 *	    }
 *	};
 * Process.preRequisite(config, counter, instance, doc);
 *
 * @return 
 *
 */
function preRequisite(prerequisite, counter, workflow){
	return new Promise(function(resolve, reject) {
		switch(prerequisite._type) {
			// TODO: Add the call to the relevant methods based on the _type 
			// attribute.
			case 'count':
				// TODO: Add code logic here...
				var data = {};
				var success = util.success('Mock count successfull.', data);
				resolve(success);
				break;
			default:
				var error = util.error('WFPreRequisiteError','Pre-requisite type: ' + prerequisite._type + ' not defined.');
				reject(error);
		}
	});
};

/** 
 * Process pre-actionss
 *
 * @param {object} preActions - the pre-actions config data
 * @param {object} workflow - the current workflow constructor instance
 *
 * @example 
 *
 * @return 
 *
 */
function preActions(preActions, workflow){
	var completed = [];
	var result = {
		complete: false,
		data: []
	};
	return new Promise(function(resolve, reject) {
		// Add function logic here...

		var success = util.success('Pre-actions completed successfully.', result);
		resolve(success);
	});
};

/** 
 * Process sub-process
 *
 * @param {string} processId - the current process id
 * @param {object} subProcess - the sub-process config data
 * @param {number} seq - the current sub-process instance counter / sequence
 * @param {object} inputData - the user input data
 * @param {object} workflow - the current workflow constructor instance
 *
 * @example 
 *
 * @return 
 *
 */
function subProcess(processId, subProcess, seq, inputData, workflow){
	// The default subProcess model
	var subProcessModel = {
		"id": subProcess._id, 
		"seq": seq, 
		"initiated": false,
		"dates": {
            "created": "",
            "valid": "",
            "due": "",
            "closed": ""
        },
        "complete": false,
        "indicators": [],
        "step": {
            "id": "",
            "seq": "",
            "status": "",
            "message": "",
            "assignedTo": {
                "userId": "",
                "name": ""
            }
        }
	};
	return new Promise(function(resolve, reject) {
		// Initiate the sub-process
		initiate(subProcess.initiate, inputData).then(function(result){
			if (result.complete) {
				subProcessModel.initiated = true;
				subProcessModel.dates.created = result.res.createdDate;
				subProcessModel.dates.valid = result.res.validDate;
				subProcessModel.dates.due = result.res.dueDate;
				// Process the first step and any subsequent 'auto' step
				var formDef = {
					id: subProcess._id,
					name: subProcess.name.i18n.value,
					indicators: subProcess.indicators
				}
				step(processId, subProcess._id, subProcessModel, subProcess.steps[0], 0, formDef, inputData, workflow).then(function(result){
					if (result.complete) {
						var success = util.success('Sub-Process completed successfully.', result.res);
						resolve(success);
					} else {
						var error = util.error('WFStepError', 'Step ' + subProcess.steps[0]._id + 'was not completed successfully.');
						reject(error);
					}
				}, function(err){
					reject(err);
				}); 
			} else {
				var error = util.error('WFSubProcessError', 'Sub-process: ' + subProcess._id+ ' not initiated successfully.');
				reject(error);
			}
		}, function(err){
			reject(err);
		});
	});
};

/** 
 * Process initiate
 *
 * @param {object} initiate - the initiate config data
 * @param {object} inputData - the user input data
 *
 * @example 
 *
 * @return 
 *
 */
function initiate(initiate, inputData){
	var completed = [];
	var result = {
		complete: false
	};
	return new Promise(function(resolve, reject) {
		switch(initiate._type) {
			case 'user':
				// If the subProcess initiation is user defined then
				result.createdDate = inputData.createdDate;
				if (initiate.dates.valid._type === 'userSelected') {
					if (inputData.validDate !== undefined) {
						result.validDate = inputData.validDate;
					} else {
						var error = util.error('WFInitiateError', 'No valid date passed in - {inputData.validDate}');
						reject(error);
					}
				}
				if (initiate.dates.due._type === 'userSelected') {
					if (inputData.dueDate !== undefined) {
						result.dueDate = inputData.dueDate;
					} else {
						var error = util.error('WFInitiateError', 'No due date passed in - {inputData.dueDate}');
						reject(error);
					}
				}
				result.complete = true;
				var success = util.success('Sub-Process initiate completed successfully.', result);
				resolve(success);
				break;
			default:
				var error = util.error('WFInitiateError', 'Initiate type: ' + initiate._type + ' not defined.');
				reject(error);
		}
	});
};

/** 
 * Process step
 *
 * @param {string} processId - the current process id
 * @param {string} subProcessId - the current sub-process id
 * @param {object} subProcessModel - the current sub-process model instance data
 * @param {object} step - the current sub-process config data
 * @param {number} seq - the current sub-process step instance counter / sequence
 * @param {object} formDef - the current sub-process form config data
 * @param {object} inputData - the user input data
 * @param {object} workflow - the current workflow constructor instance
 *
 * @example 
 *
 * @return 
 *
 */
function step(processId, subProcessId, subProcessModel, step, seq, formDef, inputData, workflow){
	return new Promise(function(resolve, reject) {
		// console.log(step);
		// Update the sub-process step data
		subProcessModel.step.id = step._id;
		subProcessModel.step.seq = seq;
		subProcessModel.step.status = step._setInstanceStatusTo;
		subProcessModel.step.message = step._setStatusMsgTo;
		subProcessModel.step.message = step._setStatusMsgTo;
		subProcessModel.step.assignedTo.userId = inputData.userId;
		subProcessModel.step.assignedTo.name = inputData.name;
		// If actions are sprecified, execute them
		if (step.actions[0] !== undefined) {
			actions(step.actions, formDef, workflow).then(function(data){
				// The document process.step model
			    var documentStepModel = {
	                "id": step._id,
	                "seq": seq,
	                "startDate": inputData.createdDate,
	                "status": step._setInstanceStatusTo,
	                "message": step._setStatusMsgTo,
	                "assignedTo": {
	                    "userId": inputData.userId,
	            		"name": inputData.name
	                },
	                "comment": inputData.comment,
	                "complete": false,
	                "endDate": ""
		        };
				util.syncLoop(data.res.data[0].form.indicators.length, function(loop){
					var counter = loop.iteration();
					// Update the processes instance model, inidcators section
					var indicatorModel = {
						"id": data.res.data[0].form.indicators[counter].category.term, 
						"instances": [
							{
								"uuid": data.res.data[0].form.indicators[counter]._id, 
								"key": "", 
								"seq": 1                 
							}
						]
					};
					// Update the indicator set documents workflow.processes.step data

					loop.next();
				}, function(){
					// Check if it should automatically transition to the next step
					// console.log('Subprocess indicators updated successfully.');
					if (step.actions[0].transitions.length !== 0) {
						util.syncLoop(step.actions[0].transitions.length, function(loop){
							var counter = loop.iteration();
							transition(processId, subProcessId, step._id, step.actions[0].transitions[counter]._id, subProcessModel, inputData, workflow).then(function(result){
								var success = util.success('Transition step completed successfully.', subProcessModel);
								resolve(success);
							}).fail(function(err){
								reject(err);
								loop.break();
							});	
							loop.next();
						});
					} else {
						// console.log('No transitions specified in this step.');
						var success = util.success('No transitions specified in this step.', subProcessModel);
						resolve(success);
					}
				});
			}, function(err){
				reject(err);
			}); 
			// var success = util.success('Action completed successfully.', result);
			// deferred.resolve(success);
		} else if (step.task !== undefined) {
			var success = util.success('Task awaiting user action.', subProcessModel);
			resolve(success);
		} else {
			var error = util.error('WF013');
			reject(error);
		}
	});
};

/** 
 * Process actions
 *
 * @param {object} actions - the actions config data
 * @param {object} formDef - the current sub-process form config data
 * @param {object} workflow - the current workflow constructor instance
 *
 * @example 
 *
 * @return 
 *
 */
function actions(actions, formDef, workflow){
	var completed = [];
	var result = {
		completed: true,
		data: []
	};
	return new Promise(function(resolve, reject) {
		// console.log(actions);
		util.syncLoop(actions.length, function(loop){
			var counter = loop.iteration();
			// console.log(counter);
			// console.log(actions.length);
			// console.log(actions[counter]);
			action(actions[counter], formDef, workflow).then(function(data){			
				// Check if all pre-requisites completed successfully.
				// console.log(actions[counter]._id + ' completed.') ;
				completed.push(data.complete);
				result.data.push(data.res);
				loop.next();
			}, function(err){
				reject(err);
				loop.break();
			});
		}, function(){
			// console.log('Loop done function called.');
			if (completed.every(Boolean)) {
				// console.log('Actions completed successfully.');
				result.completed = true;
				var success = util.success('Actions completed successfully.', result);
				resolve(success);
			} else {
				// console.log('Actions failed.');
				result.completed = false;
				var err = util.error('WFActionsError','Action/s for sub-process: ' + formDef.id + ' did not complete succeffully.');
				reject(success);
			}
		});
	});
};

/** 
 * Process action
 *
 * @param {object} action - the action config data
 * @param {object} formDef - the current sub-process form config data
 * @param {object} workflow - the current workflow constructor instance
 *
 * @example 
 *
 * @return 
 *
 */
function action(action, formDef, workflow){
	return new Promise(function(resolve, reject) {
		// console.log(action);
		switch(action._id) {
			case 'createForm':
				form.create(formDef, workflow).then(function(result){	
					var data = {
						transitions: [],
						form: {
							id: formDef.id,
							indicators: []
						}
					}
					data.transitions = action.transitions;
					data.form.indicators = result.res;
					var success = util.success(result.message, data);
					resolve(success);
				}, function(err){
					reject(err);
				});
				break;
			// case 'saveIndicator':
				
			// 	break;
			// case 'submitForm':
				
			// 	break;
			case 'authoriseForm':
				// console.log('Calling authoriseForm action');
				form.authorise(formDef, workflow).then(function(result){	
					var data = {
						transitions: [],
						form: {
							id: formDef.id,
							indicators: []
						}
					}
					data.transitions = action.transitions;
					// data.form.indicators = result.res;
					var success = util.success(result.message, data);
					resolve(success);
				}, function(err){
					reject(err);
				});
				break;
			case 'closeForm':
				// console.log('Calling closeForm action');
				form.close(formDef, workflow).then(function(result){	
					var data = {
						transitions: [],
						form: {
							id: formDef.id,
							indicators: []
						}
					}
					data.transitions = action.transitions;
					// data.form.indicators = result.res;
					var success = util.success(result.message, data);
					resolve(success);
				}, function(err){
					reject(err);
				});
				break;
			default:
				var error = util.error('WFActionError', 'Action defined with id: ' + action._id + ' not found.');
				reject(error);
		}
	});
};

/** 
 * Process task
 *
 * @param {object} task - the task config data
 * @param {object} inputData - the user input data
 *
 * @example 
 *
 * @return 
 *
 */
function task(task){
	return 'Implementation pending..';
};

/** 
 * Process transition
 *
 * @param {string} processId - the current process id
 * @param {string} subProcessId - the current sub-process id
 * @param {string} stepId - the current sub-process step id
 * @param {string} stepId - the current sub-process step transition id
 * @param {object} subProcessModel - the current sub-process model instance data
 * @param {object} inputData - the user input data
 * @param {object} workflow - the current workflow constructor instance
 *
 * @example 
 *
 * @return 
 *
 */
function transition(processId, subProcessId, stepId, transitionId, subProcessModel, inputData, workflow){
	return new Promise(function(resolve, reject) {
		var currentProcess = workflow.config.processes.filter(function(objProcess){
			if (objProcess._id === processId) {
				return objProcess;
			}
		});
		var currentSubProcess = currentProcess[0].subProcesses.filter(function(objSubProcess){
			if (objSubProcess._id === subProcessId) {
				return objSubProcess;
			}
		});
		var currentStep = currentSubProcess[0].steps.filter(function(objStep){
			if (objStep._id === stepId) {
				return objStep;
			}
		});
		var transition = {};
		if (currentStep[0].actions[0] !== undefined) {
			transition = currentStep[0].actions[0].transitions.filter(function(objTransition){
				if (objTransition._id === transitionId) {
					return objTransition;
				}
			});
		} else {
			transition = currentStep[0].task.transitions.filter(function(objTransition){
				if (objTransition._id === transitionId) {
					return objTransition;
				}
			});
		}
		var stepSeq = 0;
		for (var i = 0; i < currentSubProcess[0].steps.length; i++){
			if (currentSubProcess[0].steps[i]._id === stepId) {
				stepSeq = i;
			}
		}
		var nextStep = {};
		for (var i = 0; i < currentSubProcess[0].steps.length; i++){
			var nextStepSeq = stepSeq + 1;
			if (i === nextStepSeq) {
				nextStep = currentSubProcess[0].steps[i];
			}
		}
		// console.log(transition)
		switch(transition[0]._type) {
			case 'auto':
				if (transition[0].goTo._type === 'nextStep') {
					// console.log(transition[0].goTo._type);
					step(processId, subProcessId, subProcessModel, nextStep, stepSeq, {}, inputData, workflow).then(function(result){
						// console.log(result);
						var success = util.success('Step transition completed successfully.', result.res);
						resolve(success);
					}, function(err){
						reject(err);
					});
				} else {
					if (transition[0]._stop === true) {
						var success = util.success('All Step transitions have completed successfully.', {});
						resolve(success);
					}
				}
				break;
			case 'user':
				if (transition[0].goTo._type === 'nextStep') {
					// console.log(transition[0].goTo._type);
					step(processId, subProcessId, subProcessModel, nextStep, stepSeq, {}, inputData, workflow).then(function(result){
						// console.log(result);
						var success = util.success('Step transition completed successfully.', result.res);
						resolve(success);
					}, function(err){
						reject(err);
					});
				} else if (transition[0].goTo._type === 'stepId') {
					var goToStepId = transition[0].goTo._stepId;
					var goToStep = currentSubProcess[0].steps.filter(function(objStep){
						if (objStep._id === goToStepId) {
							return objStep;
						}
					});
					var goToStepSeq = 1;
					for (var i = 0; i < currentSubProcess[0].steps.length; i++){
						if (currentSubProcess[0].steps[i]._id === goToStepId) {
							goToStepSeq = i + 1;
						}
					}
					step(processId, subProcessId, subProcessModel, goToStep[0], goToStepSeq, {}, inputData, workflow).then(function(result){
						// console.log(result);
						var success = util.success('Step transition completed successfully.', result.res);
						resolve(success);
					}, function(err){
						reject(err);
					});
				} else {
					if (transition[0]._stop === true) {
						var success = util.success('All Step transitions have completed successfully.', {});
						resolve(success);
					}
				}
				break;
			default:
				if (transition[0]._stop === true) {
					var success = util.success('All Step transitions have completed successfully.', {});
					resolve(success);
				} else {
					var error = util.error('WF005');
					reject(error);
				}
		}
	});
};

/** 
 * Process postActions
 *
 * @param {object} postActions - the postActions config data
 *
 * @example 
 *
 * @return 
 *
 */
function postActions(postActions){
	return 'Implementation pending..';
};

module.exports = { 

 	preRequisites: preRequisites,
 	preActions: preActions,
 	subProcess: subProcess,
 	task: task,
 	transition: transition

}
},{"./form":2,"./utility":5}],5:[function(require,module,exports){
'use strict';

/**
 * Utility Module
 *
 * @module modules/util
 * @author Brent Gordon
 * @version 2.0.0
 * @description 
 * @copyright Kwantu Ltd RSA 2009-2015.
 *
 */

 module.exports = { 

 	success: function(message, res){
		var data = {
			complete: true,
			message: message,
			res: res
		}
		return data;
	},

	warn: function(message, res){
		var data = {
			complete: true,
			warning: message,
			res: res
		}
		console.warn(data);
		return data;
	},

	error: function(code, message){
		var err = new Error('');
		err.name = code;
		err.message = message;
		return err;
	},

 	syncLoop: function(iterations, process, exit){  
	    var index = 0,
	        done = false,
	        shouldExit = false;
	    var loop = {
	        next:function(){
	            if(done){
	                if(shouldExit && exit){
	                    return exit(); // Exit if we're done
	                }
	            }
	            // If we're not finished
	            if(index < iterations){
	                index++; // Increment our index
	                process(loop); // Run our process, pass in the loop
	            // Otherwise we're done
	            } else {
	                done = true; // Make sure we say we're done
	                if(exit) exit(); // Call the callback on exit
	            }
	        },
	        iteration:function(){
	            return index - 1; // Return the loop number we're on
	        },
	        break:function(end){
	            done = true; // End the loop
	            shouldExit = end; // Passing end as true means we still call the exit callback
	        }
	    };
	    loop.next();
	    return loop;
	},

	compare: function(subject, operator, value) {
	  	switch (operator) {
	  		case 'greaterThan':   	 
				return subject > value;
			case 'lessThan':   		 
				return subject < value;
			case 'greaterThanEqual': 
				return subject >= value;
			case 'lessThanEqual':  	 
				return subject <= value;
			case 'equalTo': 		 
				return subject === value;
			case 'notEqualTo': 		 
				return subject !== value;
	  	}
	}
	
 }
},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImluZGV4LmpzIiwibGliL2Zvcm0uanMiLCJsaWIvbW9kZWxzLmpzIiwibGliL3Byb2Nlc3MuanMiLCJsaWIvdXRpbGl0eS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDalBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BjQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbnZhciBQcm9jZXNzID0gcmVxdWlyZSgnLi9saWIvcHJvY2VzcycpO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vbGliL3V0aWxpdHknKTtcbnZhciBtb2RlbHMgPSByZXF1aXJlKCcuL2xpYi9tb2RlbHMnKTtcblxuLypnbG9iYWxzICovXG5cbi8qKiBcbiAqIEt3YW50dSB3b3JrZmxvdyBlbmdpbmVcbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9maWxlIC0gUHJvZmlsZSBVVUlEXG4gKiBAcGFyYW0ge09iamVjdH0gW2NvbmZpZ10gLSBXb3JrZmxvdyBjb25maWd1cmF0aW9uXG4gKiBcdEBwYXJhbSB7c3RyaW5nfSBjb25maWcuX2lkIFxuICpcdFdvcmtmbG93IGNvbmZpZ3VyYXRpb24gLyBkZWZpbml0aW9uIElEXG4gKiBAcGFyYW0ge09iamVjdH0gW2luc3RhbmNlXSAtIFdvcmtmbG93IGluc3RhbmNlXG4gKiBcdEBwYXJhbSB7c3RyaW5nfSBpbnN0YW5jZS5faWQgXG4gKlx0V29ya2Zsb3cgaW5zdGFuY2UgSURcbiAqIEBhdXRob3IgQnJlbnQgR29yZG9uXG4gKiBAdmVyc2lvbiAwLjEuMFxuICpcbiAqIEBleGFtcGxlIG5ldyBXb3JrZmxvdygnMTIzNCcsIHt9KVxuICogXG4gKlxuICogQHJldHVybiB7T2JqZWN0fSBuZXcgV29ya2Zsb3cgb2JqZWN0XG4gKlxuICogQHRocm93cyBcIkVSUk9SOiBNZXNzYWdlXCJcbiAqXG4gKi9cblxuZnVuY3Rpb24gV29ya2Zsb3cocHJvZmlsZSwgYXBwLCBjb25maWcsIGluc3RhbmNlKXtcblx0Ly9cblx0dmFyIF90aGlzID0gdGhpcztcblx0Ly8gUHJvZmlsZSBJRCB2YWxpZGF0aW9uIGNoZWNrc1xuXHRpZiAocHJvZmlsZSA9PT0gJycgfHwgcHJvZmlsZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQSBwcm9maWxlIGlkIGlzIHJlcXVpcmVkLicpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mKHByb2ZpbGUpICE9PSAnc3RyaW5nJykge1xuICAgIFx0dGhyb3cgbmV3IEVycm9yKCdUaGUgcHJvZmlsZSBpZCBtdXN0IGJlIGEgamF2YXNjcmlwdCBzdHJpbmcuJyk7XG4gICAgfSBlbHNlIHtcbiAgICBcdF90aGlzLnByb2ZpbGUgPSBwcm9maWxlIHx8ICcnO1xuICAgIH1cbiAgICAvLyBBcHAgSUQgdmFsaWRhdGlvbiBjaGVja3Ncblx0aWYgKGFwcCA9PT0gJycgfHwgYXBwID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbiBhcHAgaWQgaXMgcmVxdWlyZWQuJyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YoYXBwKSAhPT0gJ3N0cmluZycpIHtcbiAgICBcdHRocm93IG5ldyBFcnJvcignVGhlIGFwcCBpZCBtdXN0IGJlIGEgamF2YXNjcmlwdCBzdHJpbmcuJyk7XG4gICAgfSBlbHNlIHtcbiAgICBcdF90aGlzLmFwcCA9IGFwcCB8fCAnJztcbiAgICB9XG4gICAgLy8gV29ya2Zsb3cgY29uZmlndXJhdGlvbiB2YWxpZGF0aW9uIGNoZWNrc1xuICAgIGlmIChjb25maWcgPT09ICcnIHx8IGNvbmZpZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgXHR0aHJvdyBuZXcgRXJyb3IoJ0Egd29ya2Zsb3cgY29uZmlndXJhdGlvbiBpcyByZXF1aXJlZC4nKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZihjb25maWcpICE9PSAnb2JqZWN0Jykge1xuICAgICAgICBfdGhpcy5jb25maWcgPSBKU09OLnBhcnNlKGNvbmZpZyk7XG4gICAgfSBlbHNlIHtcbiAgICBcdF90aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICB9XG4gICAgLy8gV29ya2Zsb3cgaW5zdGFuY2UgdmFsaWRhdGlvbiBjaGVja3NcbiAgICBfdGhpcy5pbnN0YW5jZSA9IGluc3RhbmNlO1xufVxuXG4vKiogXG4gKiBDcmVhdGUgYSBuZXcgd29ya2Zsb3cgcHJvY2Vzcy5cbiAqXG4gKiBAZXhhbXBsZSBcbiAqIFdvcmtmbG93LmNyZWF0ZSgpO1xuICpcbiAqIEByZXR1cm4gU3VjY2VzcyAvIGVycm9yIG1lc3NhZ2Ugd2l0aCB0aGUgbmV3bHkgY3JlYXRlZCB3b3JrZmxvdyBwcm9jZXNzZXNcbiAqIGluc3RhbmNlIGRhdGEuXG4gKlxuICovXG5Xb3JrZmxvdy5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24oKXtcblx0Ly9cblx0dmFyIF90aGlzID0gdGhpcztcblx0Ly8gVXNlIHRoZSBuYXRpdmUgZXM2IFByb21pc2UgY29uc3RydWN0b3Jcblx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdGlmIChfdGhpcy5pbnN0YW5jZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR2YXIgd2FybiA9IHV0aWwud2FybignSW5zdGFuY2UgYWxyZWFkeSBleGlzdHMuJywgX3RoaXMuaW5zdGFuY2UpXG5cdFx0XHRyZXNvbHZlKHdhcm4pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBDcmVhdGUgdGhlIHdvcmtmbG93IHByb2Nlc3NlcyBpbnN0YW5jZSBvYmplY3Rcblx0XHRcdHZhciBtb2RlbCA9IG1vZGVscy5pbnN0YW5jZSgpO1xuXHRcdFx0bW9kZWwuX2lkID0gX3RoaXMucHJvZmlsZSArICc6cHJvY2Vzc2VzJztcblx0XHRcdG1vZGVsLnZlcnNpb24gPSBfdGhpcy5jb25maWcudmVyc2lvbjtcblx0XHRcdC8vIFVwZGF0ZSB0aGUgcHJvY2Vzc2VzIGFuZCBzdWJQcm9jZXNzZXMgc2VjdGlvbnMgd2l0aCBkZWZhdWx0c1xuXHRcdFx0Ly8gbW9kZWwucHJvY2Vzc2VzWzBdLmlkID0gX3RoaXMuY29uZmlnLnByb2Nlc3Nlc1swXS5faWQ7XG5cdFx0XHQvLyBtb2RlbC5wcm9jZXNzZXNbMF0uc2VxID0gMTtcblx0XHRcdF90aGlzLmluc3RhbmNlID0gbW9kZWw7XG5cdFx0XHR2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya2Zsb3cgcHJvY2Vzc2VzIGluc3RhbmNlIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5LicsIF90aGlzLmluc3RhbmNlKTtcblx0XHRcdHJlc29sdmUoc3VjY2Vzcyk7XG5cdFx0fVxuXHR9KTtcbn07XG5cbi8qKiBcbiAqIFdvcmtmbG93IGluaXRpYWxpemUsIHRoaXMgZnVuY3Rpb24gZXhlY3V0ZXMgYSBwcm9jZXNzIHdpdGhpbiBhIHdvcmtmbG93XG4gKiBjb25maWd1cmF0aW9uLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9jZXNzSWQgLSB0aGUgcHJvY2VzcyBpZCB0byBwcm9jZXNzXG4gKiBAcGFyYW0ge29iamVjdH0gaW5wdXREYXRhIC0gdGhlIGlucHV0IGRhdGEgdG8gcHJvY2Vzc1xuICpcbiAqIEBleGFtcGxlIFxuICogV29ya2Zsb3cuaW5pdGlhbGl6ZSgncHJvY2Vzc0lkJywgeyB2YWxpZERhdGU6ICdkYXRlJyB9KTtcbiAqXG4gKiBAcmV0dXJuIFxuICogeyBjb21wbGV0ZTogdHJ1ZSwgbWVzc2FnZTogJ1Byb2Nlc3M6ICdwcm9jZXNzSWQnIGluaXRpYWxpemVkIHN1Y2Nlc3NmdWxseS4nLCByZXM6IHVuZGVmaW5lZCB9XG4gKlxuICovXG5Xb3JrZmxvdy5wcm90b3R5cGUuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKHByb2Nlc3NJZCwgaW5wdXREYXRhKXtcblx0Ly8gUmUtYXNzaWduIHRoaXMgXG5cdHZhciBfdGhpcyA9IHRoaXM7XG5cdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHR2YXIgY29uZmlnUHJvY2VzcyA9IFtdO1xuXHRcdC8vIENoZWNrIHRoZSBwYXNzZWQgaW4gcGFyYW1ldGVyc1xuXHRcdGlmIChwcm9jZXNzSWQgIT09ICcnICYmIHByb2Nlc3NJZCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHQvLyBHZXQgdGhlIGN1cnJlbnQgcHJvY2VzcyBjb25maWdcblx0XHRcdGNvbmZpZ1Byb2Nlc3MgPSBfdGhpcy5jb25maWcucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmpQcm9jZXNzKXtcblx0XHRcdFx0aWYgKG9ialByb2Nlc3MuX2lkID09PSBwcm9jZXNzSWQpIHtcblx0XHRcdFx0XHRyZXR1cm4gb2JqUHJvY2Vzcztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRpZiAoY29uZmlnUHJvY2Vzc1swXS5faWQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHR2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRkNvbmZpZ0Vycm9yJywgJ05vIHZhbGlkIHByb2Nlc3MgZGVmaW5pdGlvbiBmb3VuZCB3aXRoIHByb2Nlc3MgaWQ6ICcgKyBwcm9jZXNzSWQpO1xuXHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25maWdQcm9jZXNzLnB1c2goX3RoaXMuY29uZmlnLnByb2Nlc3Nlc1swXSk7XG5cdFx0XHRwcm9jZXNzSWQgPSBfdGhpcy5jb25maWcucHJvY2Vzc2VzWzBdLl9pZDtcblx0XHR9XG5cdFx0Ly8gR2V0IHRoZSBjdXJyZW50IGxpc3Qgb2YgcHJvY2VzcyBpbnN0YW5jZXNcblx0XHR2YXIgcHJvY2Vzc1NlcSA9IDE7XG5cdFx0dmFyIGN1cnJlbnRQcm9jZXNzID0gW107XG5cdFx0Y3VycmVudFByb2Nlc3MgPSBfdGhpcy5pbnN0YW5jZS5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKG9ialByb2Nlc3Mpe1xuXHRcdFx0aWYgKG9ialByb2Nlc3MuaWQgPT09IHByb2Nlc3NJZCkge1xuXHRcdFx0XHRyZXR1cm4gb2JqUHJvY2Vzcztcblx0XHRcdH1cblx0XHR9KTtcblx0XHR2YXIgY3VycmVudFNlcSA9IGN1cnJlbnRQcm9jZXNzLmxlbmd0aDtcblx0XHR2YXIgbmV4dFNlcSA9IGN1cnJlbnRTZXEgKyAxO1xuXHRcdC8vIFB1c2ggdGhlIHByb2Nlc3Mgb2JqZWN0IGludG8gdGhlIGFycmF5XG5cdFx0dmFyIHByb2Nlc3NNb2RlbCA9IHtcblx0XHRcdFwiaWRcIjogXCJcIiwgXG5cdCAgICAgIFx0XCJzZXFcIjogXCJcIiwgXG5cdCAgICAgIFx0XCJzdWJQcm9jZXNzZXNcIjogW11cblx0XHR9XG5cdFx0Ly8gMS4gVXBkYXRlIHRoZSBwcm9jZXNzIGlkIGFuZCBzZXFcblx0XHRwcm9jZXNzTW9kZWwuaWQgPSBwcm9jZXNzSWQ7XG5cdFx0cHJvY2Vzc01vZGVsLnNlcSA9IG5leHRTZXE7XG5cdFx0X3RoaXMuaW5zdGFuY2UucHJvY2Vzc2VzLnB1c2gocHJvY2Vzc01vZGVsKTtcblx0XHQvLyAyLiBDb21wbGV0ZSBhbGwgdGhlIHByb2Nlc3MgcHJlcmVxdWlzaXRlc1xuXHRcdFByb2Nlc3MucHJlUmVxdWlzaXRlcyhjb25maWdQcm9jZXNzWzBdLnByZXJlcXVpc2l0ZXMsIF90aGlzKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG5cdFx0XHQvLyBDaGVjayBpZiBhbGwgcHJlLXJlcXVpc2l0ZXMgd2VyZSBtZXRcblx0XHRcdGlmIChyZXN1bHQuY29tcGxldGUgPT09IHRydWUpIHtcblx0XHRcdFx0Ly8gMy4gQ29tcGxldGUgYWxsIHRoZSBwcm9jZXNzIHByZS1hY3Rpb25zXG5cdFx0XHRcdFByb2Nlc3MucHJlQWN0aW9ucyhjb25maWdQcm9jZXNzWzBdLnByZUFjdGlvbnMsIF90aGlzKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG5cdFx0XHRcdFx0Ly8gQ2hlY2sgaWYgYWxsIHByZS1hY3Rpb25zIHdlcmUgbWV0XG5cdFx0XHRcdFx0aWYgKHJlc3VsdC5jb21wbGV0ZSkge1xuXHRcdFx0XHRcdFx0Ly8gNC4gSW5pdGlhbGlzZSB0aGUgZmlyc3Qgc3ViLXByb2Nlc3Ncblx0XHRcdFx0XHRcdFByb2Nlc3Muc3ViUHJvY2Vzcyhwcm9jZXNzSWQsIGNvbmZpZ1Byb2Nlc3NbMF0uc3ViUHJvY2Vzc2VzWzBdLCAxLCBpbnB1dERhdGEsIF90aGlzKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG5cdFx0XHRcdFx0XHRcdC8vIENoZWNrIGlmIHN1Yi1wcm9jZXNzIGluaXRpYWxpc2F0aW9uIHdhcyBzdWNjZXNzZnVsbFxuXHRcdFx0XHRcdFx0XHRpZiAocmVzdWx0LmNvbXBsZXRlKSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gNS4gVXBkYXRlIHRoZSBzdWJQcm9jZXNzIHNlY3Rpb24gZGV0YWlscyBpbiB0aGUgcHJvY2Vzc2VzIG1vZGVsXG5cdFx0XHRcdFx0XHRcdFx0dmFyIHN1YlByb2Nlc3NNb2RlbCA9IHJlc3VsdC5yZXM7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gX3RoaXMuaW5zdGFuY2UucHJvY2Vzc2VzW3Byb2Nlc3NJbmRleF0uc3ViUHJvY2Vzc2VzLnB1c2goc3ViUHJvY2Vzc01vZGVsKTtcblx0XHRcdFx0XHRcdFx0XHRfdGhpcy5pbnN0YW5jZS5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKG9ialByb2Nlc3Mpe1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKG9ialByb2Nlc3MuaWQgPT09IHByb2Nlc3NJZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRvYmpQcm9jZXNzLnN1YlByb2Nlc3Nlcy5wdXNoKHN1YlByb2Nlc3NNb2RlbCk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1Byb2Nlc3M6ICcgKyBfdGhpcy5jb25maWcucHJvY2Vzc2VzWzBdLl9pZCArICcgaW5pdGlhbGl6ZWQgc3VjY2Vzc2Z1bGx5LicpO1xuXHRcdFx0XHRcdFx0XHRcdHJlc29sdmUoc3VjY2Vzcyk7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZTdWJQcm9jZXNzRXJyb3InLCdQcm9jZXNzIGluaXRpYWxpc2F0aW9uIGZhaWxlZC4nKTtcblx0XHRcdFx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9LCBmdW5jdGlvbihlcnIpe1xuXHRcdFx0XHRcdFx0XHRyZWplY3QoZXJyKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRlByZUFjdGlvbnNFcnJvcicsICdQcm9jZXNzIHByZS1hY3Rpb25zIGV4ZWN1dGlvbiBmYWlsZWQuJyk7XG5cdFx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSwgZnVuY3Rpb24oZXJyKXtcblx0XHRcdFx0XHRyZWplY3QoZXJyKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRlByZVJlcXVpc2l0ZXNFcnJvcicsICdQcm9jZXNzIHByZS1yZXF1aXNpdGVzIGV4ZWN1dGlvbiBmYWlsZWQuJyk7XG5cdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHR9XG5cdFx0fSwgZnVuY3Rpb24oZXJyKXtcblx0XHRcdHJlamVjdChlcnIpO1xuXHRcdH0pO1xuXHR9KTtcbn07XG5cbldvcmtmbG93LnByb3RvdHlwZS50YXNrID0gZnVuY3Rpb24odHlwZSwgcGFyYW1zKXtcblx0Ly8gUmUtYXNzaWduIHRoaXMgXG5cdHZhciBfdGhpcyA9IHRoaXM7XG5cdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRpZiAodHlwZSA9PT0gJ2luZGljYXRvci5tYXJrQ29tcGxldGUnKSB7XG5cdFx0XHRyZXNvbHZlKCdTdWNjZXNzJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlamVjdCgnRXJyb3InKTtcblx0XHR9XG5cdH0pO1xufTtcblxuV29ya2Zsb3cucHJvdG90eXBlLnRyYW5zaXRpb24gPSBmdW5jdGlvbihwcm9jZXNzSWQsIHN1YlByb2Nlc3NJZCwgc3RlcElkLCB0cmFuc2l0aW9uSWQsIHN1YlByb2Nlc3NNb2RlbCwgaW5wdXREYXRhLCB3b3JrZmxvdyl7XG5cdC8vIFJlLWFzc2lnbiB0aGlzIFxuXHR2YXIgX3RoaXMgPSB0aGlzO1xuXHQvLyBVc2UgdGhlIG5hdGl2ZSBlczYgUHJvbWlzZSBjb25zdHJ1Y3RvclxuXHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0UHJvY2Vzcy50cmFuc2l0aW9uKHByb2Nlc3NJZCwgc3ViUHJvY2Vzc0lkLCBzdGVwSWQsIHRyYW5zaXRpb25JZCwgc3ViUHJvY2Vzc01vZGVsLCBpbnB1dERhdGEsIHdvcmtmbG93KS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG5cdFx0XHR2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya2Zsb3cgdHJhbnNpdGlvbmVkIHRvIHRoZSBuZXh0IHN0ZXAgc3VjY2Vzc2Z1bGx5LicsIHN1YlByb2Nlc3NNb2RlbCk7XG5cdFx0XHRyZXNvbHZlKHN1Y2Nlc3MpO1xuXHRcdH0sIGZ1bmN0aW9uKGVycil7XG5cdFx0XHRyZWplY3QoZXJyKTtcblx0XHR9KTtcdFxuXHR9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gV29ya2Zsb3c7XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbGl0eScpO1xuXG4vKipcbiAqIEZvcm0gTW9kdWxlXG4gKlxuICogQG1vZHVsZSBsaWIvZm9ybVxuICogQGF1dGhvciBCcmVudCBHb3Jkb25cbiAqIEB2ZXJzaW9uIDIuMC4wXG4gKiBAZGVzY3JpcHRpb24gXG4gKiBAY29weXJpZ2h0IEt3YW50dSBMdGQgUlNBIDIwMDktMjAxNS5cbiAqXG4gKi9cblxuZnVuY3Rpb24gY3JlYXRlKGZvcm1EZWYsIHdvcmtmbG93KXtcblx0dmFyIGluZGljYXRvcnMgPSBbXTtcblx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdHV0aWwuc3luY0xvb3AoZm9ybURlZi5pbmRpY2F0b3JzLmxlbmd0aCwgZnVuY3Rpb24obG9vcCl7XG5cdFx0XHR2YXIgY291bnRlciA9IGxvb3AuaXRlcmF0aW9uKCk7XG5cdFx0XHR2YXIgaW5kaWNhdG9ySWQgPSBmb3JtRGVmLmluZGljYXRvcnNbY291bnRlcl0uX2lkO1xuXHRcdFx0dmFyIGluZGljYXRvck5hbWUgPSBmb3JtRGVmLmluZGljYXRvcnNbY291bnRlcl0ubmFtZS5pMThuLnZhbHVlO1xuXHRcdFx0Ly8gQ29tbWVudCBvdXQgZm9yIHRlc3Rpbmdcblx0XHRcdC8vIHZhciBpbmRpY2F0b3IgPSB7fTtcblx0XHRcdC8vIGxpYnJhcnkuY3JlYXRlSW5kaWNhdG9ySW5zdGFuY2UoaW5kaWNhdG9ySWQsIHdvcmtmbG93LnByb2ZpbGUpLmRvbmUoZnVuY3Rpb24oZGF0YSl7XG5cdFx0XHQvLyBcdGluZGljYXRvciA9IGRhdGE7XG5cdFx0XHQvLyBcdGluZGljYXRvcnMucHVzaChpbmRpY2F0b3IpO1xuXHRcdFx0Ly8gXHRsb29wLm5leHQoKTtcblx0XHRcdC8vIH0pLmZhaWwoZnVuY3Rpb24oZXJyKXtcblx0XHRcdC8vIFx0Y29uc29sZS5sb2coZXJyKTtcblx0XHRcdC8vIH0pO1xuXHRcdFx0dmFyIHV1aWQgPSB3b3JrZmxvdy5wcm9maWxlICsgJzonICsgd29ya2Zsb3cuYXBwICsgJzonICsgaW5kaWNhdG9ySWQgKyAnOjAnOyAvLyByZXBsYWNlIHRoaXMgd2l0aCBnYXRla2VlcGVyIGNhbGwgYW5kIHJldHVybiB0aGUgdXVpZFxuXHRcdFx0dmFyIGluZGljYXRvciA9IHtcblx0XHRcdFx0X2lkOiB1dWlkLFxuXHRcdFx0XHRjYXRlZ29yeToge1xuXHRcdFx0XHRcdHRlcm06IGluZGljYXRvcklkLFxuXHRcdFx0XHRcdGxhYmVsOiBpbmRpY2F0b3JOYW1lXG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwicHJvY2Vzc2VzXCI6IFtdXG5cdFx0XHR9O1xuXHRcdFx0aW5kaWNhdG9ycy5wdXNoKGluZGljYXRvcik7XG5cdFx0XHRsb29wLm5leHQoKTtcblx0XHR9LCBmdW5jdGlvbigpe1xuXHRcdCAgICAvLyBjb25zb2xlLmxvZygnZG9uZScpO1xuXHRcdCAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnRm9ybSBjcmVhdGVkIHN1Y2Nlc3NmdWxseS4nLCBpbmRpY2F0b3JzKTtcblx0XHRcdHJlc29sdmUoc3VjY2Vzcyk7XG5cdFx0fSk7XG5cdH0pO1xufTtcblxuZnVuY3Rpb24gc2F2ZShpbmRpY2F0b3Ipe1xuXHR2YXIgY29tcGxldGVkID0gW107XG5cdHZhciByZXN1bHQgPSB7XG5cdFx0Y29tcGxldGU6IHRydWUsXG5cdFx0ZGF0YTogW11cblx0fTtcblx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGluZGljYXRvciBzZXQgc2F2ZWQgc3VjY2Vzc2Z1bGx5LicsIHJlc3VsdCk7XG5cdFx0cmVzb2x2ZShzdWNjZXNzKTtcblx0fSk7XG59O1xuXG5mdW5jdGlvbiBzdWJtaXQoZm9ybSl7XG5cdHZhciBjb21wbGV0ZWQgPSBbXTtcblx0dmFyIHJlc3VsdCA9IHtcblx0XHRjb21wbGV0ZTogdHJ1ZSxcblx0XHRkYXRhOiBbXVxuXHR9O1xuXHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0dmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gc3VibWl0dGVkIHN1Y2Nlc3NmdWxseS4nLCByZXN1bHQpO1xuXHRcdHJlc29sdmUoc3VjY2Vzcyk7XG5cdH0pO1xufTtcblxuZnVuY3Rpb24gYXV0aG9yaXNlKGZvcm0pe1xuXHR2YXIgY29tcGxldGVkID0gW107XG5cdHZhciByZXN1bHQgPSB7XG5cdFx0Y29tcGxldGU6IHRydWUsXG5cdFx0ZGF0YTogW11cblx0fTtcblx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGF1dGhvcmlzZWQgc3VjY2Vzc2Z1bGx5LicsIHJlc3VsdCk7XG5cdFx0cmVzb2x2ZShzdWNjZXNzKTtcblx0fSk7XG59O1xuXG5mdW5jdGlvbiBjbG9zZShmb3JtKXtcblx0dmFyIGNvbXBsZXRlZCA9IFtdO1xuXHR2YXIgcmVzdWx0ID0ge1xuXHRcdGNvbXBsZXRlOiB0cnVlLFxuXHRcdGRhdGE6IFtdXG5cdH07XG5cdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHR2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnRm9ybSBjbG9zZWQgc3VjY2Vzc2Z1bGx5LicsIHJlc3VsdCk7XG5cdFx0cmVzb2x2ZShzdWNjZXNzKTtcblx0fSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgXG5cbiBcdGNyZWF0ZTogY3JlYXRlLFxuIFx0c2F2ZTogc2F2ZSxcbiBcdHN1Ym1pdDogc3VibWl0LFxuIFx0YXV0aG9yaXNlOiBhdXRob3Jpc2UsXG4gXHRjbG9zZTogY2xvc2VcblxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbGl0eScpO1xuXG4vKipcbiAqIE1vZGVsIE1vZHVsZVxuICpcbiAqIEBtb2R1bGUgbGliL21vZGVsXG4gKiBAYXV0aG9yIEJyZW50IEdvcmRvblxuICogQHZlcnNpb24gMC4xLjBcbiAqIEBkZXNjcmlwdGlvbiBcbiAqIEBjb3B5cmlnaHQgS3dhbnR1IEx0ZCBSU0EgMjAwOS0yMDE1LlxuICpcbiAqL1xuXG5mdW5jdGlvbiBpbnN0YW5jZSgpe1xuXHR2YXIgbW9kZWwgPSB7XG5cdCAgICBcIl9pZFwiOiBcIlwiLFxuXHQgICAgXCJ2ZXJzaW9uXCI6IFwiXCIsXG5cdCAgICBcInR5cGVcIjogXCJ3b3JrZmxvd0luc3RhbmNlXCIsXG5cdCAgICBcInByb2Nlc3Nlc1wiOiBbXVxuXHR9O1xuXHRyZXR1cm4gbW9kZWw7XG59O1xuXG5mdW5jdGlvbiBjb25maWd1cmF0aW9uKCl7XG5cdHZhciBtb2RlbCA9IHtcblx0XHRcIl9pZFwiOiBcIjEyMzQ6bWFuZ2F1bmdQcm9qZWN0XCIsXG5cdFx0XCJfdmVyc2lvblwiOiBcIjEuMFwiLFxuXHRcdFwidHlwZVwiOiBcIndvcmtmbG93Q29uZmlnXCIsXG5cdFx0XCJ0aXRsZVwiOiB7XG5cdFx0XHRcIm5hbWVcIjoge1xuXHRcdFx0XHRcImkxOG5cIjoge1xuXHRcdFx0XHRcdFwiX2xhbmdcIjogXCJlblwiLFxuXHRcdFx0XHRcdFwidmFsdWVcIjogXCJNYW5nYWd1bmcgcHJvamVjdCB3b3JrZmxvd1wiXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRcImRlc2NyaXB0aW9uXCI6IHtcblx0XHRcdFx0XCJpMThuXCI6IHtcblx0XHRcdFx0XHRcIl9sYW5nXCI6IFwiZW5cIixcblx0XHRcdFx0XHRcInZhbHVlXCI6IFwiTWFuZ2FndW5nIHByb2plY3Qgd29ya2Zsb3cgdXNlZCB0byBtYW5hZ2UgaG91c2luZyBkZXZlbG9wbWVudC5cIlxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRcImlkZW50aWZpY2F0aW9uXCI6IHtcblx0XHRcdFwiZG9jdW1lbnRhdGlvblwiOiB7XG5cdFx0XHRcdFwiaTE4blwiOiB7XG5cdFx0XHRcdFx0XCJfbGFuZ1wiOiBcIlwiLFxuXHRcdFx0XHRcdFwidmFsdWVcIjogXCJcIlxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0XCJ1cGdyYWRlSW5mb3JtYXRpb25cIjoge1xuXHRcdFx0XHRcImkxOG5cIjoge1xuXHRcdFx0XHRcdFwiX2xhbmdcIjogXCJcIixcblx0XHRcdFx0XHRcInZhbHVlXCI6IFwiXCJcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0XCJ2YXJpYWJsZXNcIjoge1xuXHRcdFx0XCJ2YXJpYWJsZVwiOiBbe1xuXHRcdFx0XHRcIl9pZFwiOiBcIlwiLFxuXHRcdFx0XHRcIl9kYXRhVHlwZVwiOiBcIlwiLFxuXHRcdFx0XHRcIl9zZXNzaW9uVmFyXCI6IFwiXCIsXG5cdFx0XHRcdFwiX2RlZmF1bHRcIjogXCJcIixcblx0XHRcdFx0XCJfdmFsdWVcIjogXCJcIlxuXHRcdFx0fV1cblx0XHR9LFxuXHRcdFwicm9sZXNcIjoge1xuXHRcdFx0XCJyb2xlXCI6IFt7XG5cdFx0XHRcdFwiX2lkXCI6IFwiXCIsXG5cdFx0XHRcdFwiX2xldmVsXCI6IFwiXCIsXG5cdFx0XHRcdFwibmFtZVwiOiB7XG5cdFx0XHRcdFx0XCJpMThuXCI6IHtcblx0XHRcdFx0XHRcdFwiX2xhbmdcIjogXCJcIixcblx0XHRcdFx0XHRcdFwidmFsdWVcIjogXCJcIlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0XCJyb2xlTWFwcGluZ3NcIjoge1xuXHRcdFx0XHRcdFwicm9sZU1hcHBpbmdcIjoge1xuXHRcdFx0XHRcdFx0XCJfYXBwbGljYXRpb25JZFwiOiBcIlwiLFxuXHRcdFx0XHRcdFx0XCJfcm9sZUlkXCI6IFwiXCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwicmVxdWlyZWRSb2xlc1wiOiB7XG5cdFx0XHRcdFx0XCJyZXF1aXJlZFJvbGVcIjoge1xuXHRcdFx0XHRcdFx0XCJfYXBwbGljYXRpb25JZFwiOiBcIlwiLFxuXHRcdFx0XHRcdFx0XCJfcm9sZUlkXCI6IFwiXCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1dXG5cdFx0fSxcblx0XHRcInByb2Nlc3Nlc1wiOiBbe1xuXHRcdFx0XCJfaWRcIjogXCJyZWdpc3RyYXRpb25cIixcblx0XHRcdFwiX3NlcVwiOiBcIjFcIixcblx0XHRcdFwibmFtZVwiOiB7XG5cdFx0XHRcdFwiaTE4blwiOiB7XG5cdFx0XHRcdFx0XCJfbGFuZ1wiOiBcImVuXCIsXG5cdFx0XHRcdFx0XCJ2YWx1ZVwiOiBcIlJlZ2lzdGVyIGEgcHJvamVjdFwiXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRcImhlbHBcIjoge1xuXHRcdFx0XHRcImkxOG5cIjoge1xuXHRcdFx0XHRcdFwiX2xhbmdcIjogXCJlblwiLFxuXHRcdFx0XHRcdFwidmFsdWVcIjogXCJSZWdpc3RlciBhIG5ldyBwcm9qZWN0XCJcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdFwidmFyaWFibGVzXCI6IFt7XG5cdFx0XHRcdFwiX2lkXCI6IFwiXCIsXG5cdFx0XHRcdFwiX2RhdGFUeXBlXCI6IFwiXCIsXG5cdFx0XHRcdFwiX3Nlc3Npb25WYXJcIjogXCJcIixcblx0XHRcdFx0XCJfZGVmYXVsdFwiOiBcIlwiLFxuXHRcdFx0XHRcIl92YWx1ZVwiOiBcIlwiXG5cdFx0XHR9XSxcblx0XHRcdFwicHJlcmVxdWlzaXRlc1wiOiBbe1xuXHRcdFx0XHRcIl9zZXFcIjogXCIxXCIsXG5cdFx0XHRcdFwiX3R5cGVcIjogXCJjb3VudFwiLFxuXHRcdFx0XHRcIl9zdWJqZWN0XCI6IFwibW9udGhseVByb2dyZXNzLmluc3RhbmNlXCIsXG5cdFx0XHRcdFwiX29wZXJhdG9yXCI6IFwiZXF1YWxUb1wiLFxuXHRcdFx0XHRcIl92YWx1ZVwiOiBcIjBcIixcblx0XHRcdFx0XCJtZXNzYWdlXCI6IHtcblx0XHRcdFx0XHRcImkxOG5cIjoge1xuXHRcdFx0XHRcdFx0XCJfbGFuZ1wiOiBcImVuXCIsXG5cdFx0XHRcdFx0XHRcInZhbHVlXCI6IFwiVGhlIHByb2plY3QgcmVnaXN0cmF0aW9uIGZvcm0gY2FuJ3QgYmUgZWRpdGVkIG9uY2UgdGhlIG1vbnRobHkgcHJvZ3Jlc3MgcHJvY2VzcyBoYXMgYmVlbiBpbml0aWF0ZWQuXCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gTm90IGFsbG93ZWQgdG8gY3JlYXRlIGFub3RoZXIgaW5zdGFuY2UgaWYgdGhlcmUgaXMgb25lIG9wZW5cblx0XHRcdH1dLFxuXHRcdFx0XCJwcmVBY3Rpb25zXCI6IFt7XG5cdFx0XHRcdFwiX3NlcVwiOiBcIlwiLFxuXHRcdFx0XHRcIl90eXBlXCI6IFwiXCIsXG5cdFx0XHRcdFwiZnVuY3RcIjoge1xuXHRcdFx0XHRcdFwibW9kdWxlXCI6IFwiXCIsXG5cdFx0XHRcdFx0XCJtZXRob2RcIjogXCJcIixcblx0XHRcdFx0XHRcInBhcmFtc1wiOiB7XG5cdFx0XHRcdFx0XHRcInBhcmFtXCI6IFtdXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcInJlc3RcIjoge1xuXHRcdFx0XHRcdFwiaG9zdElkXCI6IFwiXCIsXG5cdFx0XHRcdFx0XCJzZXJ2aWNlXCI6IFwiXCIsXG5cdFx0XHRcdFx0XCJBUElLZXlcIjogXCJcIixcblx0XHRcdFx0XHRcImZvcm1hdFwiOiBcIlwiLFxuXHRcdFx0XHRcdFwiY29sbGVjdGlvblwiOiBcIlwiLFxuXHRcdFx0XHRcdFwiZW5kcG9pbnRcIjogXCJcIixcblx0XHRcdFx0XHRcInBhcmFtc1wiOiB7XG5cdFx0XHRcdFx0XHRcInBhcmFtXCI6IFtdXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XSxcblx0XHRcdFwic3ViUHJvY2Vzc2VzXCI6IFt7XG5cdFx0XHRcdFwiX2lkXCI6IFwic3BSZWdpc3RyYXRpb25cIixcblx0XHRcdFx0XCJfc2VxXCI6IFwiMVwiLFxuXHRcdFx0XHRcIm5hbWVcIjoge1xuXHRcdFx0XHRcdFwiaTE4blwiOiB7XG5cdFx0XHRcdFx0XHRcIl9sYW5nXCI6IFwiZW5cIixcblx0XHRcdFx0XHRcdFwidmFsdWVcIjogXCJQcm9qZWN0IFJlZ2lzdHJhdGlvbiBGb3JtXCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwiaGVscFwiOiB7XG5cdFx0XHRcdFx0XCJpMThuXCI6IHtcblx0XHRcdFx0XHRcdFwiX2xhbmdcIjogXCJlblwiLFxuXHRcdFx0XHRcdFx0XCJ2YWx1ZVwiOiBcIlJlZ2lzdGVyIGEgbmV3IHByb2plY3RcIlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0XCJpbml0aWF0ZVwiOiB7XG5cdFx0XHRcdFx0XCJfdHlwZVwiOiBcInVzZXJcIixcblx0XHRcdFx0XHRcIm1heEluc3RhbmNlc1wiOiBcIi0xXCIsXG5cdFx0XHRcdFx0XCJhY3Rpb25cIjoge1xuXHRcdFx0XHRcdFx0XCJfdHlwZVwiOiBcImJ1dHRvblwiLFxuXHRcdFx0XHRcdFx0XCJsYWJlbFwiOiBcIkNyZWF0ZVwiXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcImRhdGVzXCI6IHtcblx0XHRcdFx0XHRcdFwidmFsaWRcIjoge1xuXHRcdFx0XHRcdFx0XHRcIl90eXBlXCI6IFwidXNlclNlbGVjdGVkXCIsXG5cdFx0XHRcdFx0XHRcdFwibWVzc2FnZVwiOiB7XG5cdFx0XHRcdFx0XHRcdFx0XCJpMThuXCI6IHtcblx0XHRcdFx0XHRcdFx0XHRcdFwiX2xhbmdcIjogXCJlblwiLFxuXHRcdFx0XHRcdFx0XHRcdFx0XCJ2YWx1ZVwiOiBcIlBsZWFzZSBzZWxlY3QgYSB2YWxpZCBkYXRlIGkuZS4gdGhlIG1vbnRobHkgZGF0ZSB0aGF0IHRoZSBkYXRhIGNhcHR1cmVkIGlzIHZhbGlkIGZvci5cIlxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFwiZHVlXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJfdHlwZVwiOiBcInVzZXJTZWxlY3RlZFwiLFxuXHRcdFx0XHRcdFx0XHRcIm1lc3NhZ2VcIjoge1xuXHRcdFx0XHRcdFx0XHRcdFwiaTE4blwiOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcIl9sYW5nXCI6IFwiZW5cIixcblx0XHRcdFx0XHRcdFx0XHRcdFwidmFsdWVcIjogXCJQbGVhc2Ugc2VsZWN0IGEgZHVlIGRhdGUgaS5lLiB0aGUgYWN0dWFsIGRhdGUgdGhhdCB0aGUgZGF0YSBuZWVkcyB0byBiZSBjYXB0dXJlZCBhbmQgYXV0aG9yaXNlZCBieS5cIlxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0XCJpbmRpY2F0b3JzXCI6IFt7XG5cdFx0XHRcdFx0XCJfaWRcIjogXCJwcm9qZWN0RGV0YWlsXCIsXG5cdFx0XHRcdFx0XCJtYXhJbnN0YW5jZXNcIjogXCIxXCIsXG5cdFx0XHRcdFx0XCJuYW1lXCI6IHtcblx0XHRcdFx0XHRcdFwiaTE4blwiOiB7XG5cdFx0XHRcdFx0XHRcdFwiX2xhbmdcIjogXCJlblwiLFxuXHRcdFx0XHRcdFx0XHRcInZhbHVlXCI6IFwiUHJvamVjdCBEZXRhaWxzXCJcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sIHtcblx0XHRcdFx0XHRcIl9pZFwiOiBcInByb2plY3RMb2NhdGlvblwiLFxuXHRcdFx0XHRcdFwibWF4SW5zdGFuY2VzXCI6IFwiLTFcIixcblx0XHRcdFx0XHRcIm5hbWVcIjoge1xuXHRcdFx0XHRcdFx0XCJpMThuXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJfbGFuZ1wiOiBcImVuXCIsXG5cdFx0XHRcdFx0XHRcdFwidmFsdWVcIjogXCJQcm9qZWN0IExvY2F0aW9uc1wiXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LCB7XG5cdFx0XHRcdFx0XCJfaWRcIjogXCJkZXZlbG9wZXJEZXRhaWxcIixcblx0XHRcdFx0XHRcIm1heEluc3RhbmNlc1wiOiBcIjFcIixcblx0XHRcdFx0XHRcIm5hbWVcIjoge1xuXHRcdFx0XHRcdFx0XCJpMThuXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJfbGFuZ1wiOiBcImVuXCIsXG5cdFx0XHRcdFx0XHRcdFwidmFsdWVcIjogXCJEZXZlbG9wZXIgRGV0YWlsc1wiXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XSxcblx0XHRcdFx0XCJzdGVwc1wiOiBbe1xuXHRcdFx0XHRcdFwiX2lkXCI6IFwiY3JlYXRlRm9ybVwiLFxuXHRcdFx0XHRcdFwiX3NlcVwiOiBcIjFcIixcblx0XHRcdFx0XHRcIl9zZXRJbnN0YW5jZVN0YXR1c1RvXCI6IFwiQ3JlYXRlZFwiLFxuXHRcdFx0XHRcdFwiX3NldFN0YXR1c01zZ1RvXCI6IFwiRm9ybSBjcmVhdGVkXCIsXG5cdFx0XHRcdFx0XCJuYW1lXCI6IHtcblx0XHRcdFx0XHRcdFwiaTE4blwiOiB7XG5cdFx0XHRcdFx0XHRcdFwiX2xhbmdcIjogXCJlblwiLFxuXHRcdFx0XHRcdFx0XHRcInZhbHVlXCI6IFwiQ3JlYXRlIHRoZSByZWdpc3RyYXRpb24gZm9ybS5cIlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XCJwcmVyZXF1aXNpdGVzXCI6IFt7XG5cdFx0XHRcdFx0XHRcIl9zZXFcIjogXCJcIixcblx0XHRcdFx0XHRcdFwiX3R5cGVcIjogXCJcIixcblx0XHRcdFx0XHRcdFwiX29wZXJhdG9yXCI6IFwiXCIsXG5cdFx0XHRcdFx0XHRcIl9zdWJqZWN0XCI6IFwiXCIsXG5cdFx0XHRcdFx0XHRcIl92YWx1ZVwiOiBcIlwiLFxuXHRcdFx0XHRcdFx0XCJtZXNzYWdlXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJpMThuXCI6IHtcblx0XHRcdFx0XHRcdFx0XHRcIl9sYW5nXCI6IFwiZW5cIixcblx0XHRcdFx0XHRcdFx0XHRcInZhbHVlXCI6IFwiXCJcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1dLFxuXHRcdFx0XHRcdFwiYWN0aW9uc1wiOiBbe1xuXHRcdFx0XHRcdFx0XCJfc2VxXCI6IFwiMVwiLFxuXHRcdFx0XHRcdFx0XCJfdHlwZVwiOiBcImludGVybmFsXCIsXG5cdFx0XHRcdFx0XHRcImZ1bmN0XCI6IHtcblx0XHRcdFx0XHRcdFx0XCJtb2R1bGVcIjogXCJmb3JtXCIsXG5cdFx0XHRcdFx0XHRcdFwibWV0aG9kXCI6IFwiY3JlYXRlXCIsXG5cdFx0XHRcdFx0XHRcdFwidHlwZVwiOiBcIm5ld1NlcXVlbmNlXCIgXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XCJ0cmFuc2l0aW9uc1wiOiBbe1xuXHRcdFx0XHRcdFx0XHRcIl90eXBlXCI6IFwiYXV0b1wiLFxuXHRcdFx0XHRcdFx0XHRcIm5hbWVcIjoge1xuXHRcdFx0XHRcdFx0XHRcdFwiaTE4blwiOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcIl9sYW5nXCI6IFwiZW5cIixcblx0XHRcdFx0XHRcdFx0XHRcdFwidmFsdWVcIjogXCJcIlxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XCJnb1RvXCI6IHtcblx0XHRcdFx0XHRcdFx0XHRcIl90eXBlXCI6IFwibmV4dFN0ZXBcIixcblx0XHRcdFx0XHRcdFx0XHRcIl9zdGVwSWRcIjogXCJcIlxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRcIl9zdG9wXCI6IGZhbHNlXG5cdFx0XHRcdFx0XHR9XVxuXHRcdFx0XHRcdH1dXG5cdFx0XHRcdH0sIHtcblx0XHRcdFx0XHRcIl9pZFwiOiBcImNhcHR1cmVGb3JtXCIsXG5cdFx0XHRcdFx0XCJfc2VxXCI6IFwiMlwiLFxuXHRcdFx0XHRcdFwiX3NldFN0YXR1c1RvXCI6IFwiSW5Qcm9ncmVzc1wiLFxuXHRcdFx0XHRcdFwiX3NldFN0YXR1c01zZ1RvXCI6IFwiVXNlciBhc3NpZ25lZCBhbmQgZGF0YSBjYXB0dXJlIGluIHByb2dyZXNzXCIsXG5cdFx0XHRcdFx0XCJuYW1lXCI6IHtcblx0XHRcdFx0XHRcdFwiaTE4blwiOiB7XG5cdFx0XHRcdFx0XHRcdFwiX2xhbmdcIjogXCJlblwiLFxuXHRcdFx0XHRcdFx0XHRcInZhbHVlXCI6IFwiQ2FwdHVyZVwiXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcInByZXJlcXVpc2l0ZXNcIjogW3tcblx0XHRcdFx0XHRcdFwiX3NlcVwiOiBcIjFcIixcblx0XHRcdFx0XHRcdFwiX3R5cGVcIjogXCJyZWFkeVRvU3VibWl0XCIsXG5cdFx0XHRcdFx0XHRcIl9zdWJqZWN0XCI6IFwiaW5kaWNhdG9ycy5jb21wbGV0ZVwiLFxuXHRcdFx0XHRcdFx0XCJfb3BlcmF0b3JcIjogXCJlcXVhbFRvXCIsXG5cdFx0XHRcdFx0XHRcIl92YWx1ZVwiOiBcInRydWVcIixcblx0XHRcdFx0XHRcdFwibWVzc2FnZVwiOiB7XG5cdFx0XHRcdFx0XHRcdFwiaTE4blwiOiB7XG5cdFx0XHRcdFx0XHRcdFx0XCJfbGFuZ1wiOiBcImVuXCIsXG5cdFx0XHRcdFx0XHRcdFx0XCJ2YWx1ZVwiOiBcIkFsbCBmb3JtIGluZGljYXRvcnMgaGF2ZSB0byBiZSBtYXJrZWQgYXMgY29tcGxldGUgYmVmb3JlIHN1Ym1pc3Npb24uXCJcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1dLFxuXHRcdFx0XHRcdFwiYWN0aW9uc1wiOiBbXSxcblx0XHRcdFx0XHRcInRhc2tcIjoge1xuXHRcdFx0XHRcdFx0XCJhc3NpZ25cIjoge1xuXHRcdFx0XHRcdFx0XHRcInByb2ZpbGVSb2xlXCI6IHtcblx0XHRcdFx0XHRcdFx0XHRcInByb2ZpbGVcIjogXCJjdXJyZW50XCIsXG5cdFx0XHRcdFx0XHRcdFx0XCJyb2xlXCI6IFwiY2FwdHVyZXJcIlxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRcImRlZmF1bHRcIjogXCJcIlxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFwid29ya1wiOiB7XG5cdFx0XHRcdFx0XHRcdFwiYWN0aW9uXCI6IFwiZWRpdEZvcm1cIlxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFwidHJhbnNpdGlvbnNcIjogW3tcblx0XHRcdFx0XHRcdFx0XCJfaWRcIjogXCJzdWJtaXRGb3JtXCIsXG5cdFx0XHRcdFx0XHRcdFwiX3R5cGVcIjogXCJ1c2VyXCIsXG5cdFx0XHRcdFx0XHRcdFwibmFtZVwiOiB7XG5cdFx0XHRcdFx0XHRcdFx0XCJpMThuXCI6IHtcblx0XHRcdFx0XHRcdFx0XHRcdFwiX2xhbmdcIjogXCJlblwiLFxuXHRcdFx0XHRcdFx0XHRcdFx0XCJ2YWx1ZVwiOiBcIlN1Ym1pdFwiXG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRcImdvVG9cIjoge1xuXHRcdFx0XHRcdFx0XHRcdFwiX3R5cGVcIjogXCJuZXh0U3RlcFwiLFxuXHRcdFx0XHRcdFx0XHRcdFwiX3N0ZXBJZFwiOiBcIlwiXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdFwiX3N0b3BcIjogZmFsc2Vcblx0XHRcdFx0XHRcdH1dXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LCB7XG5cdFx0XHRcdFx0XCJfaWRcIjogXCJhdXRob3Jpc2VGb3JtXCIsXG5cdFx0XHRcdFx0XCJfc2VxXCI6IFwiM1wiLFxuXHRcdFx0XHRcdFwiX3NldEluc3RhbmNlU3RhdHVzVG9cIjogXCJhd2FpdGluZ0F1dGhvcmlzYXRpb25cIixcblx0XHRcdFx0XHRcIl9zZXRTdGF0dXNNc2dUb1wiOiBcIkZvcm0gZGF0YSBzdWJtaXR0ZWQsIHVzZXIgYXNzaWduZWQgYW5kIGZvcm0gZGF0YSB1bmRlciByZXZpZXdcIixcblx0XHRcdFx0XHRcIm5hbWVcIjoge1xuXHRcdFx0XHRcdFx0XCJpMThuXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJfbGFuZ1wiOiBcImVuXCIsXG5cdFx0XHRcdFx0XHRcdFwidmFsdWVcIjogXCJSZXZpZXcgdGhlIHJlZ2lzdHJhdGlvbiBmb3JtIGRhdGEuXCJcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFwicHJlcmVxdWlzaXRlc1wiOiBbe1xuXHRcdFx0XHRcdFx0XCJfc2VxXCI6IFwiMVwiLFxuXHRcdFx0XHRcdFx0XCJfdHlwZVwiOiBcImNoZWNrUm9sZVwiLFxuXHRcdFx0XHRcdFx0XCJfc3ViamVjdFwiOiBcInByb2ZpbGVSb2xlXCIsXG5cdFx0XHRcdFx0XHRcIl9vcGVyYXRvclwiOiBcImVxdWFsVG9cIixcblx0XHRcdFx0XHRcdFwiX3ZhbHVlXCI6IFwiYXV0aG9yaXNlclwiLFxuXHRcdFx0XHRcdFx0XCJtZXNzYWdlXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJpMThuXCI6IHtcblx0XHRcdFx0XHRcdFx0XHRcIl9sYW5nXCI6IFwiZW5cIixcblx0XHRcdFx0XHRcdFx0XHRcInZhbHVlXCI6IFwiWW91IGhhdmUgdG8gYmUgYW4gYXV0aG9yaXNlciBvbiB0aGUgcHJvamVjdCB0byBhcHByb3ZlIHRoZSBmb3JtIGRhdGEgdGhhdCBoYXMgYmVlbiBjYXB0dXJlZCBvciByZWZlciBiYWNrIGZvciBmdXJ0aGVyIGVkaXRpbmcuXCJcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1dLFxuXHRcdFx0XHRcdFwiYWN0aW9uc1wiOiBbXSxcblx0XHRcdFx0XHRcInRhc2tcIjoge1xuXHRcdFx0XHRcdFx0XCJhc3NpZ25cIjoge1xuXHRcdFx0XHRcdFx0XHRcInByb2ZpbGVSb2xlXCI6IHtcblx0XHRcdFx0XHRcdFx0XHRcInByb2ZpbGVcIjogXCJjdXJyZW50XCIsXG5cdFx0XHRcdFx0XHRcdFx0XCJyb2xlXCI6IFwiYXV0aG9yaXNlclwiXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdFwiZGVmYXVsdFwiOiBcIlwiXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XCJ3b3JrXCI6IHtcblx0XHRcdFx0XHRcdFx0XCJhY3Rpb25cIjogXCJlZGl0Rm9ybVwiXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XCJ0cmFuc2l0aW9uc1wiOiBbe1xuXHRcdFx0XHRcdFx0XHRcIl9pZFwiOiBcImF1dGhvcmlzZUZvcm1cIixcblx0XHRcdFx0XHRcdFx0XCJfdHlwZVwiOiBcInVzZXJcIixcblx0XHRcdFx0XHRcdFx0XCJuYW1lXCI6IHtcblx0XHRcdFx0XHRcdFx0XHRcImkxOG5cIjoge1xuXHRcdFx0XHRcdFx0XHRcdFx0XCJfbGFuZ1wiOiBcImVuXCIsXG5cdFx0XHRcdFx0XHRcdFx0XHRcInZhbHVlXCI6IFwiQXV0aG9yaXNlXCJcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdFwiZ29Ub1wiOiB7XG5cdFx0XHRcdFx0XHRcdFx0XCJfdHlwZVwiOiBcIm5leHRTdGVwXCIsXG5cdFx0XHRcdFx0XHRcdFx0XCJfc3RlcElkXCI6IFwiXCJcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XCJfc3RvcFwiOiBmYWxzZVxuXHRcdFx0XHRcdFx0fSwge1xuXHRcdFx0XHRcdFx0XHRcIl9pZFwiOiBcInJldmVydEZvcm1cIixcblx0XHRcdFx0XHRcdFx0XCJfdHlwZVwiOiBcInVzZXJcIixcblx0XHRcdFx0XHRcdFx0XCJuYW1lXCI6IHtcblx0XHRcdFx0XHRcdFx0XHRcImkxOG5cIjoge1xuXHRcdFx0XHRcdFx0XHRcdFx0XCJfbGFuZ1wiOiBcImVuXCIsXG5cdFx0XHRcdFx0XHRcdFx0XHRcInZhbHVlXCI6IFwiUmVmZXIgQmFja1wiXG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRcImdvVG9cIjoge1xuXHRcdFx0XHRcdFx0XHRcdFwiX3R5cGVcIjogXCJzdGVwSWRcIixcblx0XHRcdFx0XHRcdFx0XHRcIl9zdGVwSWRcIjogXCJjYXB0dXJlRm9ybVwiXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdFwiX3N0b3BcIjogZmFsc2Vcblx0XHRcdFx0XHRcdH1dXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LCB7XG5cdFx0XHRcdFx0XCJfaWRcIjogXCJjbG9zZUZvcm1cIixcblx0XHRcdFx0XHRcIl9zZXFcIjogXCI1XCIsXG5cdFx0XHRcdFx0XCJfc2V0SW5zdGFuY2VTdGF0dXNUb1wiOiBcIkNvbXBsZXRlXCIsXG5cdFx0XHRcdFx0XCJfc2V0U3RhdHVzTXNnVG9cIjogXCJGb3JtIGxvY2tlZFwiLFxuXHRcdFx0XHRcdFwibmFtZVwiOiB7XG5cdFx0XHRcdFx0XHRcImkxOG5cIjoge1xuXHRcdFx0XHRcdFx0XHRcIl9sYW5nXCI6IFwiZW5cIixcblx0XHRcdFx0XHRcdFx0XCJ2YWx1ZVwiOiBcIkNsb3NlIHRoZSByZWdpc3RyYXRpb24gZm9ybS5cIlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XCJhY3Rpb25zXCI6IFt7XG5cdFx0XHRcdFx0XHRcIl9zZXFcIjogXCIxXCIsXG5cdFx0XHRcdFx0XHRcIl90eXBlXCI6IFwiaW50ZXJuYWxcIixcblx0XHRcdFx0XHRcdFwiZnVuY3RcIjoge1xuXHRcdFx0XHRcdFx0XHRcIm1vZHVsZVwiOiBcImZvcm1cIixcblx0XHRcdFx0XHRcdFx0XCJtZXRob2RcIjogXCJhdXRob3Jpc2VcIlxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFwidHJhbnNpdGlvblwiOiBbe1xuXHRcdFx0XHRcdFx0XHRcIl90eXBlXCI6IFwiYXV0b1wiLFxuXHRcdFx0XHRcdFx0XHRcIm5hbWVcIjoge1xuXHRcdFx0XHRcdFx0XHRcdFwiaTE4blwiOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcIl9sYW5nXCI6IFwiZW5cIixcblx0XHRcdFx0XHRcdFx0XHRcdFwidmFsdWVcIjogXCJcIlxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XCJnb1RvXCI6IHtcblx0XHRcdFx0XHRcdFx0XHRcIl90eXBlXCI6IFwiXCIsXG5cdFx0XHRcdFx0XHRcdFx0XCJfc3RlcElkXCI6IFwiXCJcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XCJfc3RvcFwiOiB0cnVlXG5cdFx0XHRcdFx0XHR9XVxuXHRcdFx0XHRcdH1dXG5cdFx0XHRcdH1dXG5cdFx0XHR9XSxcblx0XHRcdFwicG9zdEFjdGlvbnNcIjoge31cblx0XHR9XVxuXHR9O1xuXHRyZXR1cm4gbW9kZWw7XG59O1xuXG5mdW5jdGlvbiBwcm9jZXNzKCl7XG5cdHZhciBtb2RlbCA9IHtcbiAgICAgICAgXCJjb25maWdJZFwiOiBcIlwiLCBcbiAgICAgICAgXCJpbnN0YW5jZUlkXCI6IFwiXCIsXG4gICAgICAgIFwicHJvY2Vzc0lkXCI6IFwiXCIsXG4gICAgICAgIFwic3ViUHJvY2Vzc0lkXCI6IFwiXCIsXG4gICAgICAgIFwic3RlcElkXCI6IFwiXCIsXG4gICAgICAgIFwiYXNzaWduZWRUb1wiOiB7XG4gICAgICAgICAgICBcInVzZXJJZFwiOiBcIlwiLFxuICAgICAgICAgICAgXCJuYW1lXCI6IFwiXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJ0b2tlblwiOiBcIlwiLFxuICAgICAgICBcInN0YXR1c1wiOiBcIlwiLFxuICAgICAgICBcInN0YXR1c01zZ1wiOiBcIlwiLFxuICAgICAgICBcImxhc3RVcGRhdGVkXCI6IFwiXCIsXG4gICAgICAgIFwiZHVlRGF0ZVwiOiBcIlwiXG4gICAgfVxuICAgIHJldHVybiBtb2RlbDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0geyBcblxuIFx0Y29uZmlndXJhdGlvbjogY29uZmlndXJhdGlvbiwgXG4gXHRpbnN0YW5jZTogaW5zdGFuY2UsIFxuIFx0cHJvY2VzczogcHJvY2Vzc1xuXG59IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbGl0eScpO1xudmFyIGZvcm0gPSByZXF1aXJlKCcuL2Zvcm0nKTtcblxuLyoqXG4gKiBQcm9jZXNzIE1vZHVsZVxuICpcbiAqIEBtb2R1bGUgbGliL3Byb2Nlc3NcbiAqIEBhdXRob3IgQnJlbnQgR29yZG9uXG4gKiBAdmVyc2lvbiAwLjEuMFxuICogQGRlc2NyaXB0aW9uIFxuICogQGNvcHlyaWdodCBLd2FudHUgTHRkIFJTQSAyMDA5LTIwMTUuXG4gKlxuICovXG5cbi8qKiBcbiAqIFByb2Nlc3MgcHJlLXJlcXVpc2l0ZXNcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gcHJlcmVxdWlzaXRlcyAtIHRoZSBwcmUtcmVxdWlzaXRlcyBjb25maWcgZGF0YVxuICpcbiAqIEBleGFtcGxlIFxuICpcbiAqIEByZXR1cm4gXG4gKlxuICovXG5mdW5jdGlvbiBwcmVSZXF1aXNpdGVzKHByZXJlcXVpc2l0ZXMpIHtcblx0dmFyIGNvbXBsZXRlZCA9IFtdO1xuXHR2YXIgcmVzdWx0ID0ge1xuXHRcdGNvbXBsZXRlOiBmYWxzZSxcblx0XHRkYXRhOiBbXVxuXHR9O1xuXHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0Ly8gVW5jb21tZW50IGJlbG93IHNlY3Rpb24gd2hlbiByZWFkeSB0byBpbXBsZW1lbnRcblx0XHQvLyB1dGlsLnN5bmNMb29wKHByZXJlcXVpc2l0ZXMubGVuZ3RoLCBmdW5jdGlvbihsb29wKXtcblx0XHQvLyBcdHZhciBjb3VudGVyID0gbG9vcC5pdGVyYXRpb24oKTtcblx0XHQvLyBcdHByZVJlcXVpc2l0ZShwcmVyZXF1aXNpdGVzW2NvdW50ZXJdLCBjb3VudGVyKS50aGVuKGZ1bmN0aW9uKGRhdGEpe1x0XHRcdFxuXHRcdC8vIFx0XHQvLyBDaGVjayBpZiBhbGwgcHJlLXJlcXVpc2l0ZXMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS5cblx0XHQvLyBcdFx0Y29tcGxldGVkLnB1c2goZGF0YS5jb21wbGV0ZSk7XG5cdFx0Ly8gXHRcdHJlc3VsdC5kYXRhLnB1c2goZGF0YSk7XG5cdFx0Ly8gXHRcdGlmIChjb21wbGV0ZWQuZXZlcnkoQm9vbGVhbikpIHtcblx0XHQvLyBcdFx0XHRyZXN1bHQuY29tcGxldGVkID0gdHJ1ZTtcblx0XHQvLyBcdFx0XHRsb29wLm5leHQoKTtcblx0XHQvLyBcdFx0XHR2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnUHJlLXJlcXVpc2l0ZXMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCByZXN1bHQpO1xuXHRcdC8vIFx0XHRcdGRlZmVycmVkLnJlc29sdmUoc3VjY2Vzcyk7XG5cdFx0Ly8gXHRcdH0gZWxzZSB7XG5cdFx0Ly8gXHRcdFx0bG9vcC5icmVhaygpO1xuXHRcdC8vIFx0XHRcdHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGMDA3Jyk7XG5cdFx0Ly8gXHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycm9yKTtcblx0XHQvLyBcdFx0fVxuXHRcdC8vIFx0fSwgZnVuY3Rpb24oZXJyKXtcblx0XHQvLyBcdFx0bG9vcC5icmVhaygpO1xuXHRcdC8vIFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyKTtcblx0XHQvLyBcdH0pO1xuXHRcdC8vIH0pO1xuXHRcdHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdQcmUtcmVxdWlzaXRlcyBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHJlc3VsdCk7XG5cdFx0cmVzb2x2ZShzdWNjZXNzKTtcblx0fSk7XG59O1xuXG4vKiogXG4gKiBQcm9jZXNzIHByZS1yZXF1aXNpdGUsIGV4ZWN1dGUgdGhlIHByZS1yZXF1aXNpdGUgY29uZGl0aW9uLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBwcmVyZXF1aXNpdGUgLSB0aGUgcHJlLXJlcXVpc2l0ZSBjb25maWcgZGF0YVxuICogQHBhcmFtIHtudW1iZXJ9IGNvdW50ZXIgLSB0aGUgcHJlLXJlcXVpc2l0ZSBjb3VudCAvIG51bWJlclxuICogQHBhcmFtIHtvYmplY3R9IHdvcmtmbG93IC0gdGhlIHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXG4gKlxuICogQGV4YW1wbGUgXG4gKiB2YXIgY29uZmlnID0ge1xuICpcdCAgICBcIl9zZXFcIjogXCJcIixcbiAqXHQgICAgXCJfdHlwZVwiOiBcIlwiLFxuICpcdFx0XCJfc3ViamVjdFwiOiBcIlwiLFxuICpcdCAgICBcIl9vcGVyYXRvclwiOiBcIlwiLFxuICpcdCAgICBcIl92YWx1ZVwiOiBcIlwiLFxuICpcdCAgICBcIl9yZWZlcmVuY2VcIjogXCJcIixcbiAqXHQgICAgXCJtZXNzYWdlXCI6IHtcbiAqXHQgICAgXHRcImkxOG5cIjoge1xuICpcdCAgICBcdFx0XCJfbGFuZ1wiOiBcImVuXCIsXG4gKlx0ICAgIFx0XHRcInZhbHVlXCI6IFwiXCJcbiAqXHQgICAgXHR9XG4gKlx0ICAgIH1cbiAqXHR9O1xuICogUHJvY2Vzcy5wcmVSZXF1aXNpdGUoY29uZmlnLCBjb3VudGVyLCBpbnN0YW5jZSwgZG9jKTtcbiAqXG4gKiBAcmV0dXJuIFxuICpcbiAqL1xuZnVuY3Rpb24gcHJlUmVxdWlzaXRlKHByZXJlcXVpc2l0ZSwgY291bnRlciwgd29ya2Zsb3cpe1xuXHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0c3dpdGNoKHByZXJlcXVpc2l0ZS5fdHlwZSkge1xuXHRcdFx0Ly8gVE9ETzogQWRkIHRoZSBjYWxsIHRvIHRoZSByZWxldmFudCBtZXRob2RzIGJhc2VkIG9uIHRoZSBfdHlwZSBcblx0XHRcdC8vIGF0dHJpYnV0ZS5cblx0XHRcdGNhc2UgJ2NvdW50Jzpcblx0XHRcdFx0Ly8gVE9ETzogQWRkIGNvZGUgbG9naWMgaGVyZS4uLlxuXHRcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXHRcdFx0XHR2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnTW9jayBjb3VudCBzdWNjZXNzZnVsbC4nLCBkYXRhKTtcblx0XHRcdFx0cmVzb2x2ZShzdWNjZXNzKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHR2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRlByZVJlcXVpc2l0ZUVycm9yJywnUHJlLXJlcXVpc2l0ZSB0eXBlOiAnICsgcHJlcmVxdWlzaXRlLl90eXBlICsgJyBub3QgZGVmaW5lZC4nKTtcblx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHR9XG5cdH0pO1xufTtcblxuLyoqIFxuICogUHJvY2VzcyBwcmUtYWN0aW9uc3NcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gcHJlQWN0aW9ucyAtIHRoZSBwcmUtYWN0aW9ucyBjb25maWcgZGF0YVxuICogQHBhcmFtIHtvYmplY3R9IHdvcmtmbG93IC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcbiAqXG4gKiBAZXhhbXBsZSBcbiAqXG4gKiBAcmV0dXJuIFxuICpcbiAqL1xuZnVuY3Rpb24gcHJlQWN0aW9ucyhwcmVBY3Rpb25zLCB3b3JrZmxvdyl7XG5cdHZhciBjb21wbGV0ZWQgPSBbXTtcblx0dmFyIHJlc3VsdCA9IHtcblx0XHRjb21wbGV0ZTogZmFsc2UsXG5cdFx0ZGF0YTogW11cblx0fTtcblx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdC8vIEFkZCBmdW5jdGlvbiBsb2dpYyBoZXJlLi4uXG5cblx0XHR2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnUHJlLWFjdGlvbnMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCByZXN1bHQpO1xuXHRcdHJlc29sdmUoc3VjY2Vzcyk7XG5cdH0pO1xufTtcblxuLyoqIFxuICogUHJvY2VzcyBzdWItcHJvY2Vzc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9jZXNzSWQgLSB0aGUgY3VycmVudCBwcm9jZXNzIGlkXG4gKiBAcGFyYW0ge29iamVjdH0gc3ViUHJvY2VzcyAtIHRoZSBzdWItcHJvY2VzcyBjb25maWcgZGF0YVxuICogQHBhcmFtIHtudW1iZXJ9IHNlcSAtIHRoZSBjdXJyZW50IHN1Yi1wcm9jZXNzIGluc3RhbmNlIGNvdW50ZXIgLyBzZXF1ZW5jZVxuICogQHBhcmFtIHtvYmplY3R9IGlucHV0RGF0YSAtIHRoZSB1c2VyIGlucHV0IGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSB3b3JrZmxvdyAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXG4gKlxuICogQGV4YW1wbGUgXG4gKlxuICogQHJldHVybiBcbiAqXG4gKi9cbmZ1bmN0aW9uIHN1YlByb2Nlc3MocHJvY2Vzc0lkLCBzdWJQcm9jZXNzLCBzZXEsIGlucHV0RGF0YSwgd29ya2Zsb3cpe1xuXHQvLyBUaGUgZGVmYXVsdCBzdWJQcm9jZXNzIG1vZGVsXG5cdHZhciBzdWJQcm9jZXNzTW9kZWwgPSB7XG5cdFx0XCJpZFwiOiBzdWJQcm9jZXNzLl9pZCwgXG5cdFx0XCJzZXFcIjogc2VxLCBcblx0XHRcImluaXRpYXRlZFwiOiBmYWxzZSxcblx0XHRcImRhdGVzXCI6IHtcbiAgICAgICAgICAgIFwiY3JlYXRlZFwiOiBcIlwiLFxuICAgICAgICAgICAgXCJ2YWxpZFwiOiBcIlwiLFxuICAgICAgICAgICAgXCJkdWVcIjogXCJcIixcbiAgICAgICAgICAgIFwiY2xvc2VkXCI6IFwiXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJjb21wbGV0ZVwiOiBmYWxzZSxcbiAgICAgICAgXCJpbmRpY2F0b3JzXCI6IFtdLFxuICAgICAgICBcInN0ZXBcIjoge1xuICAgICAgICAgICAgXCJpZFwiOiBcIlwiLFxuICAgICAgICAgICAgXCJzZXFcIjogXCJcIixcbiAgICAgICAgICAgIFwic3RhdHVzXCI6IFwiXCIsXG4gICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJcIixcbiAgICAgICAgICAgIFwiYXNzaWduZWRUb1wiOiB7XG4gICAgICAgICAgICAgICAgXCJ1c2VySWRcIjogXCJcIixcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cdH07XG5cdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHQvLyBJbml0aWF0ZSB0aGUgc3ViLXByb2Nlc3Ncblx0XHRpbml0aWF0ZShzdWJQcm9jZXNzLmluaXRpYXRlLCBpbnB1dERhdGEpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcblx0XHRcdGlmIChyZXN1bHQuY29tcGxldGUpIHtcblx0XHRcdFx0c3ViUHJvY2Vzc01vZGVsLmluaXRpYXRlZCA9IHRydWU7XG5cdFx0XHRcdHN1YlByb2Nlc3NNb2RlbC5kYXRlcy5jcmVhdGVkID0gcmVzdWx0LnJlcy5jcmVhdGVkRGF0ZTtcblx0XHRcdFx0c3ViUHJvY2Vzc01vZGVsLmRhdGVzLnZhbGlkID0gcmVzdWx0LnJlcy52YWxpZERhdGU7XG5cdFx0XHRcdHN1YlByb2Nlc3NNb2RlbC5kYXRlcy5kdWUgPSByZXN1bHQucmVzLmR1ZURhdGU7XG5cdFx0XHRcdC8vIFByb2Nlc3MgdGhlIGZpcnN0IHN0ZXAgYW5kIGFueSBzdWJzZXF1ZW50ICdhdXRvJyBzdGVwXG5cdFx0XHRcdHZhciBmb3JtRGVmID0ge1xuXHRcdFx0XHRcdGlkOiBzdWJQcm9jZXNzLl9pZCxcblx0XHRcdFx0XHRuYW1lOiBzdWJQcm9jZXNzLm5hbWUuaTE4bi52YWx1ZSxcblx0XHRcdFx0XHRpbmRpY2F0b3JzOiBzdWJQcm9jZXNzLmluZGljYXRvcnNcblx0XHRcdFx0fVxuXHRcdFx0XHRzdGVwKHByb2Nlc3NJZCwgc3ViUHJvY2Vzcy5faWQsIHN1YlByb2Nlc3NNb2RlbCwgc3ViUHJvY2Vzcy5zdGVwc1swXSwgMCwgZm9ybURlZiwgaW5wdXREYXRhLCB3b3JrZmxvdykudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuXHRcdFx0XHRcdGlmIChyZXN1bHQuY29tcGxldGUpIHtcblx0XHRcdFx0XHRcdHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdTdWItUHJvY2VzcyBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHJlc3VsdC5yZXMpO1xuXHRcdFx0XHRcdFx0cmVzb2x2ZShzdWNjZXNzKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZTdGVwRXJyb3InLCAnU3RlcCAnICsgc3ViUHJvY2Vzcy5zdGVwc1swXS5faWQgKyAnd2FzIG5vdCBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicpO1xuXHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sIGZ1bmN0aW9uKGVycil7XG5cdFx0XHRcdFx0cmVqZWN0KGVycik7XG5cdFx0XHRcdH0pOyBcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGU3ViUHJvY2Vzc0Vycm9yJywgJ1N1Yi1wcm9jZXNzOiAnICsgc3ViUHJvY2Vzcy5faWQrICcgbm90IGluaXRpYXRlZCBzdWNjZXNzZnVsbHkuJyk7XG5cdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHR9XG5cdFx0fSwgZnVuY3Rpb24oZXJyKXtcblx0XHRcdHJlamVjdChlcnIpO1xuXHRcdH0pO1xuXHR9KTtcbn07XG5cbi8qKiBcbiAqIFByb2Nlc3MgaW5pdGlhdGVcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gaW5pdGlhdGUgLSB0aGUgaW5pdGlhdGUgY29uZmlnIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dERhdGEgLSB0aGUgdXNlciBpbnB1dCBkYXRhXG4gKlxuICogQGV4YW1wbGUgXG4gKlxuICogQHJldHVybiBcbiAqXG4gKi9cbmZ1bmN0aW9uIGluaXRpYXRlKGluaXRpYXRlLCBpbnB1dERhdGEpe1xuXHR2YXIgY29tcGxldGVkID0gW107XG5cdHZhciByZXN1bHQgPSB7XG5cdFx0Y29tcGxldGU6IGZhbHNlXG5cdH07XG5cdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRzd2l0Y2goaW5pdGlhdGUuX3R5cGUpIHtcblx0XHRcdGNhc2UgJ3VzZXInOlxuXHRcdFx0XHQvLyBJZiB0aGUgc3ViUHJvY2VzcyBpbml0aWF0aW9uIGlzIHVzZXIgZGVmaW5lZCB0aGVuXG5cdFx0XHRcdHJlc3VsdC5jcmVhdGVkRGF0ZSA9IGlucHV0RGF0YS5jcmVhdGVkRGF0ZTtcblx0XHRcdFx0aWYgKGluaXRpYXRlLmRhdGVzLnZhbGlkLl90eXBlID09PSAndXNlclNlbGVjdGVkJykge1xuXHRcdFx0XHRcdGlmIChpbnB1dERhdGEudmFsaWREYXRlICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdHJlc3VsdC52YWxpZERhdGUgPSBpbnB1dERhdGEudmFsaWREYXRlO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRkluaXRpYXRlRXJyb3InLCAnTm8gdmFsaWQgZGF0ZSBwYXNzZWQgaW4gLSB7aW5wdXREYXRhLnZhbGlkRGF0ZX0nKTtcblx0XHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChpbml0aWF0ZS5kYXRlcy5kdWUuX3R5cGUgPT09ICd1c2VyU2VsZWN0ZWQnKSB7XG5cdFx0XHRcdFx0aWYgKGlucHV0RGF0YS5kdWVEYXRlICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdHJlc3VsdC5kdWVEYXRlID0gaW5wdXREYXRhLmR1ZURhdGU7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGSW5pdGlhdGVFcnJvcicsICdObyBkdWUgZGF0ZSBwYXNzZWQgaW4gLSB7aW5wdXREYXRhLmR1ZURhdGV9Jyk7XG5cdFx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXN1bHQuY29tcGxldGUgPSB0cnVlO1xuXHRcdFx0XHR2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnU3ViLVByb2Nlc3MgaW5pdGlhdGUgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCByZXN1bHQpO1xuXHRcdFx0XHRyZXNvbHZlKHN1Y2Nlc3MpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGSW5pdGlhdGVFcnJvcicsICdJbml0aWF0ZSB0eXBlOiAnICsgaW5pdGlhdGUuX3R5cGUgKyAnIG5vdCBkZWZpbmVkLicpO1xuXHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdH1cblx0fSk7XG59O1xuXG4vKiogXG4gKiBQcm9jZXNzIHN0ZXBcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIGN1cnJlbnQgcHJvY2VzcyBpZFxuICogQHBhcmFtIHtzdHJpbmd9IHN1YlByb2Nlc3NJZCAtIHRoZSBjdXJyZW50IHN1Yi1wcm9jZXNzIGlkXG4gKiBAcGFyYW0ge29iamVjdH0gc3ViUHJvY2Vzc01vZGVsIC0gdGhlIGN1cnJlbnQgc3ViLXByb2Nlc3MgbW9kZWwgaW5zdGFuY2UgZGF0YVxuICogQHBhcmFtIHtvYmplY3R9IHN0ZXAgLSB0aGUgY3VycmVudCBzdWItcHJvY2VzcyBjb25maWcgZGF0YVxuICogQHBhcmFtIHtudW1iZXJ9IHNlcSAtIHRoZSBjdXJyZW50IHN1Yi1wcm9jZXNzIHN0ZXAgaW5zdGFuY2UgY291bnRlciAvIHNlcXVlbmNlXG4gKiBAcGFyYW0ge29iamVjdH0gZm9ybURlZiAtIHRoZSBjdXJyZW50IHN1Yi1wcm9jZXNzIGZvcm0gY29uZmlnIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dERhdGEgLSB0aGUgdXNlciBpbnB1dCBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gd29ya2Zsb3cgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxuICpcbiAqIEBleGFtcGxlIFxuICpcbiAqIEByZXR1cm4gXG4gKlxuICovXG5mdW5jdGlvbiBzdGVwKHByb2Nlc3NJZCwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzTW9kZWwsIHN0ZXAsIHNlcSwgZm9ybURlZiwgaW5wdXREYXRhLCB3b3JrZmxvdyl7XG5cdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHQvLyBjb25zb2xlLmxvZyhzdGVwKTtcblx0XHQvLyBVcGRhdGUgdGhlIHN1Yi1wcm9jZXNzIHN0ZXAgZGF0YVxuXHRcdHN1YlByb2Nlc3NNb2RlbC5zdGVwLmlkID0gc3RlcC5faWQ7XG5cdFx0c3ViUHJvY2Vzc01vZGVsLnN0ZXAuc2VxID0gc2VxO1xuXHRcdHN1YlByb2Nlc3NNb2RlbC5zdGVwLnN0YXR1cyA9IHN0ZXAuX3NldEluc3RhbmNlU3RhdHVzVG87XG5cdFx0c3ViUHJvY2Vzc01vZGVsLnN0ZXAubWVzc2FnZSA9IHN0ZXAuX3NldFN0YXR1c01zZ1RvO1xuXHRcdHN1YlByb2Nlc3NNb2RlbC5zdGVwLm1lc3NhZ2UgPSBzdGVwLl9zZXRTdGF0dXNNc2dUbztcblx0XHRzdWJQcm9jZXNzTW9kZWwuc3RlcC5hc3NpZ25lZFRvLnVzZXJJZCA9IGlucHV0RGF0YS51c2VySWQ7XG5cdFx0c3ViUHJvY2Vzc01vZGVsLnN0ZXAuYXNzaWduZWRUby5uYW1lID0gaW5wdXREYXRhLm5hbWU7XG5cdFx0Ly8gSWYgYWN0aW9ucyBhcmUgc3ByZWNpZmllZCwgZXhlY3V0ZSB0aGVtXG5cdFx0aWYgKHN0ZXAuYWN0aW9uc1swXSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRhY3Rpb25zKHN0ZXAuYWN0aW9ucywgZm9ybURlZiwgd29ya2Zsb3cpLnRoZW4oZnVuY3Rpb24oZGF0YSl7XG5cdFx0XHRcdC8vIFRoZSBkb2N1bWVudCBwcm9jZXNzLnN0ZXAgbW9kZWxcblx0XHRcdCAgICB2YXIgZG9jdW1lbnRTdGVwTW9kZWwgPSB7XG5cdCAgICAgICAgICAgICAgICBcImlkXCI6IHN0ZXAuX2lkLFxuXHQgICAgICAgICAgICAgICAgXCJzZXFcIjogc2VxLFxuXHQgICAgICAgICAgICAgICAgXCJzdGFydERhdGVcIjogaW5wdXREYXRhLmNyZWF0ZWREYXRlLFxuXHQgICAgICAgICAgICAgICAgXCJzdGF0dXNcIjogc3RlcC5fc2V0SW5zdGFuY2VTdGF0dXNUbyxcblx0ICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBzdGVwLl9zZXRTdGF0dXNNc2dUbyxcblx0ICAgICAgICAgICAgICAgIFwiYXNzaWduZWRUb1wiOiB7XG5cdCAgICAgICAgICAgICAgICAgICAgXCJ1c2VySWRcIjogaW5wdXREYXRhLnVzZXJJZCxcblx0ICAgICAgICAgICAgXHRcdFwibmFtZVwiOiBpbnB1dERhdGEubmFtZVxuXHQgICAgICAgICAgICAgICAgfSxcblx0ICAgICAgICAgICAgICAgIFwiY29tbWVudFwiOiBpbnB1dERhdGEuY29tbWVudCxcblx0ICAgICAgICAgICAgICAgIFwiY29tcGxldGVcIjogZmFsc2UsXG5cdCAgICAgICAgICAgICAgICBcImVuZERhdGVcIjogXCJcIlxuXHRcdCAgICAgICAgfTtcblx0XHRcdFx0dXRpbC5zeW5jTG9vcChkYXRhLnJlcy5kYXRhWzBdLmZvcm0uaW5kaWNhdG9ycy5sZW5ndGgsIGZ1bmN0aW9uKGxvb3Ape1xuXHRcdFx0XHRcdHZhciBjb3VudGVyID0gbG9vcC5pdGVyYXRpb24oKTtcblx0XHRcdFx0XHQvLyBVcGRhdGUgdGhlIHByb2Nlc3NlcyBpbnN0YW5jZSBtb2RlbCwgaW5pZGNhdG9ycyBzZWN0aW9uXG5cdFx0XHRcdFx0dmFyIGluZGljYXRvck1vZGVsID0ge1xuXHRcdFx0XHRcdFx0XCJpZFwiOiBkYXRhLnJlcy5kYXRhWzBdLmZvcm0uaW5kaWNhdG9yc1tjb3VudGVyXS5jYXRlZ29yeS50ZXJtLCBcblx0XHRcdFx0XHRcdFwiaW5zdGFuY2VzXCI6IFtcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdFwidXVpZFwiOiBkYXRhLnJlcy5kYXRhWzBdLmZvcm0uaW5kaWNhdG9yc1tjb3VudGVyXS5faWQsIFxuXHRcdFx0XHRcdFx0XHRcdFwia2V5XCI6IFwiXCIsIFxuXHRcdFx0XHRcdFx0XHRcdFwic2VxXCI6IDEgICAgICAgICAgICAgICAgIFxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRdXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHQvLyBVcGRhdGUgdGhlIGluZGljYXRvciBzZXQgZG9jdW1lbnRzIHdvcmtmbG93LnByb2Nlc3Nlcy5zdGVwIGRhdGFcblxuXHRcdFx0XHRcdGxvb3AubmV4dCgpO1xuXHRcdFx0XHR9LCBmdW5jdGlvbigpe1xuXHRcdFx0XHRcdC8vIENoZWNrIGlmIGl0IHNob3VsZCBhdXRvbWF0aWNhbGx5IHRyYW5zaXRpb24gdG8gdGhlIG5leHQgc3RlcFxuXHRcdFx0XHRcdC8vIGNvbnNvbGUubG9nKCdTdWJwcm9jZXNzIGluZGljYXRvcnMgdXBkYXRlZCBzdWNjZXNzZnVsbHkuJyk7XG5cdFx0XHRcdFx0aWYgKHN0ZXAuYWN0aW9uc1swXS50cmFuc2l0aW9ucy5sZW5ndGggIT09IDApIHtcblx0XHRcdFx0XHRcdHV0aWwuc3luY0xvb3Aoc3RlcC5hY3Rpb25zWzBdLnRyYW5zaXRpb25zLmxlbmd0aCwgZnVuY3Rpb24obG9vcCl7XG5cdFx0XHRcdFx0XHRcdHZhciBjb3VudGVyID0gbG9vcC5pdGVyYXRpb24oKTtcblx0XHRcdFx0XHRcdFx0dHJhbnNpdGlvbihwcm9jZXNzSWQsIHN1YlByb2Nlc3NJZCwgc3RlcC5faWQsIHN0ZXAuYWN0aW9uc1swXS50cmFuc2l0aW9uc1tjb3VudGVyXS5faWQsIHN1YlByb2Nlc3NNb2RlbCwgaW5wdXREYXRhLCB3b3JrZmxvdykudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuXHRcdFx0XHRcdFx0XHRcdHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdUcmFuc2l0aW9uIHN0ZXAgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCBzdWJQcm9jZXNzTW9kZWwpO1xuXHRcdFx0XHRcdFx0XHRcdHJlc29sdmUoc3VjY2Vzcyk7XG5cdFx0XHRcdFx0XHRcdH0pLmZhaWwoZnVuY3Rpb24oZXJyKXtcblx0XHRcdFx0XHRcdFx0XHRyZWplY3QoZXJyKTtcblx0XHRcdFx0XHRcdFx0XHRsb29wLmJyZWFrKCk7XG5cdFx0XHRcdFx0XHRcdH0pO1x0XG5cdFx0XHRcdFx0XHRcdGxvb3AubmV4dCgpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdC8vIGNvbnNvbGUubG9nKCdObyB0cmFuc2l0aW9ucyBzcGVjaWZpZWQgaW4gdGhpcyBzdGVwLicpO1xuXHRcdFx0XHRcdFx0dmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ05vIHRyYW5zaXRpb25zIHNwZWNpZmllZCBpbiB0aGlzIHN0ZXAuJywgc3ViUHJvY2Vzc01vZGVsKTtcblx0XHRcdFx0XHRcdHJlc29sdmUoc3VjY2Vzcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH0sIGZ1bmN0aW9uKGVycil7XG5cdFx0XHRcdHJlamVjdChlcnIpO1xuXHRcdFx0fSk7IFxuXHRcdFx0Ly8gdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0FjdGlvbiBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHJlc3VsdCk7XG5cdFx0XHQvLyBkZWZlcnJlZC5yZXNvbHZlKHN1Y2Nlc3MpO1xuXHRcdH0gZWxzZSBpZiAoc3RlcC50YXNrICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdUYXNrIGF3YWl0aW5nIHVzZXIgYWN0aW9uLicsIHN1YlByb2Nlc3NNb2RlbCk7XG5cdFx0XHRyZXNvbHZlKHN1Y2Nlc3MpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRjAxMycpO1xuXHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHR9XG5cdH0pO1xufTtcblxuLyoqIFxuICogUHJvY2VzcyBhY3Rpb25zXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGFjdGlvbnMgLSB0aGUgYWN0aW9ucyBjb25maWcgZGF0YVxuICogQHBhcmFtIHtvYmplY3R9IGZvcm1EZWYgLSB0aGUgY3VycmVudCBzdWItcHJvY2VzcyBmb3JtIGNvbmZpZyBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gd29ya2Zsb3cgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxuICpcbiAqIEBleGFtcGxlIFxuICpcbiAqIEByZXR1cm4gXG4gKlxuICovXG5mdW5jdGlvbiBhY3Rpb25zKGFjdGlvbnMsIGZvcm1EZWYsIHdvcmtmbG93KXtcblx0dmFyIGNvbXBsZXRlZCA9IFtdO1xuXHR2YXIgcmVzdWx0ID0ge1xuXHRcdGNvbXBsZXRlZDogdHJ1ZSxcblx0XHRkYXRhOiBbXVxuXHR9O1xuXHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0Ly8gY29uc29sZS5sb2coYWN0aW9ucyk7XG5cdFx0dXRpbC5zeW5jTG9vcChhY3Rpb25zLmxlbmd0aCwgZnVuY3Rpb24obG9vcCl7XG5cdFx0XHR2YXIgY291bnRlciA9IGxvb3AuaXRlcmF0aW9uKCk7XG5cdFx0XHQvLyBjb25zb2xlLmxvZyhjb3VudGVyKTtcblx0XHRcdC8vIGNvbnNvbGUubG9nKGFjdGlvbnMubGVuZ3RoKTtcblx0XHRcdC8vIGNvbnNvbGUubG9nKGFjdGlvbnNbY291bnRlcl0pO1xuXHRcdFx0YWN0aW9uKGFjdGlvbnNbY291bnRlcl0sIGZvcm1EZWYsIHdvcmtmbG93KS50aGVuKGZ1bmN0aW9uKGRhdGEpe1x0XHRcdFxuXHRcdFx0XHQvLyBDaGVjayBpZiBhbGwgcHJlLXJlcXVpc2l0ZXMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS5cblx0XHRcdFx0Ly8gY29uc29sZS5sb2coYWN0aW9uc1tjb3VudGVyXS5faWQgKyAnIGNvbXBsZXRlZC4nKSA7XG5cdFx0XHRcdGNvbXBsZXRlZC5wdXNoKGRhdGEuY29tcGxldGUpO1xuXHRcdFx0XHRyZXN1bHQuZGF0YS5wdXNoKGRhdGEucmVzKTtcblx0XHRcdFx0bG9vcC5uZXh0KCk7XG5cdFx0XHR9LCBmdW5jdGlvbihlcnIpe1xuXHRcdFx0XHRyZWplY3QoZXJyKTtcblx0XHRcdFx0bG9vcC5icmVhaygpO1xuXHRcdFx0fSk7XG5cdFx0fSwgZnVuY3Rpb24oKXtcblx0XHRcdC8vIGNvbnNvbGUubG9nKCdMb29wIGRvbmUgZnVuY3Rpb24gY2FsbGVkLicpO1xuXHRcdFx0aWYgKGNvbXBsZXRlZC5ldmVyeShCb29sZWFuKSkge1xuXHRcdFx0XHQvLyBjb25zb2xlLmxvZygnQWN0aW9ucyBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicpO1xuXHRcdFx0XHRyZXN1bHQuY29tcGxldGVkID0gdHJ1ZTtcblx0XHRcdFx0dmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0FjdGlvbnMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCByZXN1bHQpO1xuXHRcdFx0XHRyZXNvbHZlKHN1Y2Nlc3MpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gY29uc29sZS5sb2coJ0FjdGlvbnMgZmFpbGVkLicpO1xuXHRcdFx0XHRyZXN1bHQuY29tcGxldGVkID0gZmFsc2U7XG5cdFx0XHRcdHZhciBlcnIgPSB1dGlsLmVycm9yKCdXRkFjdGlvbnNFcnJvcicsJ0FjdGlvbi9zIGZvciBzdWItcHJvY2VzczogJyArIGZvcm1EZWYuaWQgKyAnIGRpZCBub3QgY29tcGxldGUgc3VjY2VmZnVsbHkuJyk7XG5cdFx0XHRcdHJlamVjdChzdWNjZXNzKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG59O1xuXG4vKiogXG4gKiBQcm9jZXNzIGFjdGlvblxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBhY3Rpb24gLSB0aGUgYWN0aW9uIGNvbmZpZyBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gZm9ybURlZiAtIHRoZSBjdXJyZW50IHN1Yi1wcm9jZXNzIGZvcm0gY29uZmlnIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSB3b3JrZmxvdyAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXG4gKlxuICogQGV4YW1wbGUgXG4gKlxuICogQHJldHVybiBcbiAqXG4gKi9cbmZ1bmN0aW9uIGFjdGlvbihhY3Rpb24sIGZvcm1EZWYsIHdvcmtmbG93KXtcblx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdC8vIGNvbnNvbGUubG9nKGFjdGlvbik7XG5cdFx0c3dpdGNoKGFjdGlvbi5faWQpIHtcblx0XHRcdGNhc2UgJ2NyZWF0ZUZvcm0nOlxuXHRcdFx0XHRmb3JtLmNyZWF0ZShmb3JtRGVmLCB3b3JrZmxvdykudGhlbihmdW5jdGlvbihyZXN1bHQpe1x0XG5cdFx0XHRcdFx0dmFyIGRhdGEgPSB7XG5cdFx0XHRcdFx0XHR0cmFuc2l0aW9uczogW10sXG5cdFx0XHRcdFx0XHRmb3JtOiB7XG5cdFx0XHRcdFx0XHRcdGlkOiBmb3JtRGVmLmlkLFxuXHRcdFx0XHRcdFx0XHRpbmRpY2F0b3JzOiBbXVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRkYXRhLnRyYW5zaXRpb25zID0gYWN0aW9uLnRyYW5zaXRpb25zO1xuXHRcdFx0XHRcdGRhdGEuZm9ybS5pbmRpY2F0b3JzID0gcmVzdWx0LnJlcztcblx0XHRcdFx0XHR2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcyhyZXN1bHQubWVzc2FnZSwgZGF0YSk7XG5cdFx0XHRcdFx0cmVzb2x2ZShzdWNjZXNzKTtcblx0XHRcdFx0fSwgZnVuY3Rpb24oZXJyKXtcblx0XHRcdFx0XHRyZWplY3QoZXJyKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Ly8gY2FzZSAnc2F2ZUluZGljYXRvcic6XG5cdFx0XHRcdFxuXHRcdFx0Ly8gXHRicmVhaztcblx0XHRcdC8vIGNhc2UgJ3N1Ym1pdEZvcm0nOlxuXHRcdFx0XHRcblx0XHRcdC8vIFx0YnJlYWs7XG5cdFx0XHRjYXNlICdhdXRob3Jpc2VGb3JtJzpcblx0XHRcdFx0Ly8gY29uc29sZS5sb2coJ0NhbGxpbmcgYXV0aG9yaXNlRm9ybSBhY3Rpb24nKTtcblx0XHRcdFx0Zm9ybS5hdXRob3Jpc2UoZm9ybURlZiwgd29ya2Zsb3cpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcdFxuXHRcdFx0XHRcdHZhciBkYXRhID0ge1xuXHRcdFx0XHRcdFx0dHJhbnNpdGlvbnM6IFtdLFxuXHRcdFx0XHRcdFx0Zm9ybToge1xuXHRcdFx0XHRcdFx0XHRpZDogZm9ybURlZi5pZCxcblx0XHRcdFx0XHRcdFx0aW5kaWNhdG9yczogW11cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZGF0YS50cmFuc2l0aW9ucyA9IGFjdGlvbi50cmFuc2l0aW9ucztcblx0XHRcdFx0XHQvLyBkYXRhLmZvcm0uaW5kaWNhdG9ycyA9IHJlc3VsdC5yZXM7XG5cdFx0XHRcdFx0dmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MocmVzdWx0Lm1lc3NhZ2UsIGRhdGEpO1xuXHRcdFx0XHRcdHJlc29sdmUoc3VjY2Vzcyk7XG5cdFx0XHRcdH0sIGZ1bmN0aW9uKGVycil7XG5cdFx0XHRcdFx0cmVqZWN0KGVycik7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ2Nsb3NlRm9ybSc6XG5cdFx0XHRcdC8vIGNvbnNvbGUubG9nKCdDYWxsaW5nIGNsb3NlRm9ybSBhY3Rpb24nKTtcblx0XHRcdFx0Zm9ybS5jbG9zZShmb3JtRGVmLCB3b3JrZmxvdykudGhlbihmdW5jdGlvbihyZXN1bHQpe1x0XG5cdFx0XHRcdFx0dmFyIGRhdGEgPSB7XG5cdFx0XHRcdFx0XHR0cmFuc2l0aW9uczogW10sXG5cdFx0XHRcdFx0XHRmb3JtOiB7XG5cdFx0XHRcdFx0XHRcdGlkOiBmb3JtRGVmLmlkLFxuXHRcdFx0XHRcdFx0XHRpbmRpY2F0b3JzOiBbXVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRkYXRhLnRyYW5zaXRpb25zID0gYWN0aW9uLnRyYW5zaXRpb25zO1xuXHRcdFx0XHRcdC8vIGRhdGEuZm9ybS5pbmRpY2F0b3JzID0gcmVzdWx0LnJlcztcblx0XHRcdFx0XHR2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcyhyZXN1bHQubWVzc2FnZSwgZGF0YSk7XG5cdFx0XHRcdFx0cmVzb2x2ZShzdWNjZXNzKTtcblx0XHRcdFx0fSwgZnVuY3Rpb24oZXJyKXtcblx0XHRcdFx0XHRyZWplY3QoZXJyKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0dmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZBY3Rpb25FcnJvcicsICdBY3Rpb24gZGVmaW5lZCB3aXRoIGlkOiAnICsgYWN0aW9uLl9pZCArICcgbm90IGZvdW5kLicpO1xuXHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdH1cblx0fSk7XG59O1xuXG4vKiogXG4gKiBQcm9jZXNzIHRhc2tcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdGFzayAtIHRoZSB0YXNrIGNvbmZpZyBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gaW5wdXREYXRhIC0gdGhlIHVzZXIgaW5wdXQgZGF0YVxuICpcbiAqIEBleGFtcGxlIFxuICpcbiAqIEByZXR1cm4gXG4gKlxuICovXG5mdW5jdGlvbiB0YXNrKHRhc2spe1xuXHRyZXR1cm4gJ0ltcGxlbWVudGF0aW9uIHBlbmRpbmcuLic7XG59O1xuXG4vKiogXG4gKiBQcm9jZXNzIHRyYW5zaXRpb25cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIGN1cnJlbnQgcHJvY2VzcyBpZFxuICogQHBhcmFtIHtzdHJpbmd9IHN1YlByb2Nlc3NJZCAtIHRoZSBjdXJyZW50IHN1Yi1wcm9jZXNzIGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RlcElkIC0gdGhlIGN1cnJlbnQgc3ViLXByb2Nlc3Mgc3RlcCBpZFxuICogQHBhcmFtIHtzdHJpbmd9IHN0ZXBJZCAtIHRoZSBjdXJyZW50IHN1Yi1wcm9jZXNzIHN0ZXAgdHJhbnNpdGlvbiBpZFxuICogQHBhcmFtIHtvYmplY3R9IHN1YlByb2Nlc3NNb2RlbCAtIHRoZSBjdXJyZW50IHN1Yi1wcm9jZXNzIG1vZGVsIGluc3RhbmNlIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dERhdGEgLSB0aGUgdXNlciBpbnB1dCBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gd29ya2Zsb3cgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxuICpcbiAqIEBleGFtcGxlIFxuICpcbiAqIEByZXR1cm4gXG4gKlxuICovXG5mdW5jdGlvbiB0cmFuc2l0aW9uKHByb2Nlc3NJZCwgc3ViUHJvY2Vzc0lkLCBzdGVwSWQsIHRyYW5zaXRpb25JZCwgc3ViUHJvY2Vzc01vZGVsLCBpbnB1dERhdGEsIHdvcmtmbG93KXtcblx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdHZhciBjdXJyZW50UHJvY2VzcyA9IHdvcmtmbG93LmNvbmZpZy5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKG9ialByb2Nlc3Mpe1xuXHRcdFx0aWYgKG9ialByb2Nlc3MuX2lkID09PSBwcm9jZXNzSWQpIHtcblx0XHRcdFx0cmV0dXJuIG9ialByb2Nlc3M7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dmFyIGN1cnJlbnRTdWJQcm9jZXNzID0gY3VycmVudFByb2Nlc3NbMF0uc3ViUHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmpTdWJQcm9jZXNzKXtcblx0XHRcdGlmIChvYmpTdWJQcm9jZXNzLl9pZCA9PT0gc3ViUHJvY2Vzc0lkKSB7XG5cdFx0XHRcdHJldHVybiBvYmpTdWJQcm9jZXNzO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHZhciBjdXJyZW50U3RlcCA9IGN1cnJlbnRTdWJQcm9jZXNzWzBdLnN0ZXBzLmZpbHRlcihmdW5jdGlvbihvYmpTdGVwKXtcblx0XHRcdGlmIChvYmpTdGVwLl9pZCA9PT0gc3RlcElkKSB7XG5cdFx0XHRcdHJldHVybiBvYmpTdGVwO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHZhciB0cmFuc2l0aW9uID0ge307XG5cdFx0aWYgKGN1cnJlbnRTdGVwWzBdLmFjdGlvbnNbMF0gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dHJhbnNpdGlvbiA9IGN1cnJlbnRTdGVwWzBdLmFjdGlvbnNbMF0udHJhbnNpdGlvbnMuZmlsdGVyKGZ1bmN0aW9uKG9ialRyYW5zaXRpb24pe1xuXHRcdFx0XHRpZiAob2JqVHJhbnNpdGlvbi5faWQgPT09IHRyYW5zaXRpb25JZCkge1xuXHRcdFx0XHRcdHJldHVybiBvYmpUcmFuc2l0aW9uO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dHJhbnNpdGlvbiA9IGN1cnJlbnRTdGVwWzBdLnRhc2sudHJhbnNpdGlvbnMuZmlsdGVyKGZ1bmN0aW9uKG9ialRyYW5zaXRpb24pe1xuXHRcdFx0XHRpZiAob2JqVHJhbnNpdGlvbi5faWQgPT09IHRyYW5zaXRpb25JZCkge1xuXHRcdFx0XHRcdHJldHVybiBvYmpUcmFuc2l0aW9uO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0dmFyIHN0ZXBTZXEgPSAwO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY3VycmVudFN1YlByb2Nlc3NbMF0uc3RlcHMubGVuZ3RoOyBpKyspe1xuXHRcdFx0aWYgKGN1cnJlbnRTdWJQcm9jZXNzWzBdLnN0ZXBzW2ldLl9pZCA9PT0gc3RlcElkKSB7XG5cdFx0XHRcdHN0ZXBTZXEgPSBpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR2YXIgbmV4dFN0ZXAgPSB7fTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGN1cnJlbnRTdWJQcm9jZXNzWzBdLnN0ZXBzLmxlbmd0aDsgaSsrKXtcblx0XHRcdHZhciBuZXh0U3RlcFNlcSA9IHN0ZXBTZXEgKyAxO1xuXHRcdFx0aWYgKGkgPT09IG5leHRTdGVwU2VxKSB7XG5cdFx0XHRcdG5leHRTdGVwID0gY3VycmVudFN1YlByb2Nlc3NbMF0uc3RlcHNbaV07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdC8vIGNvbnNvbGUubG9nKHRyYW5zaXRpb24pXG5cdFx0c3dpdGNoKHRyYW5zaXRpb25bMF0uX3R5cGUpIHtcblx0XHRcdGNhc2UgJ2F1dG8nOlxuXHRcdFx0XHRpZiAodHJhbnNpdGlvblswXS5nb1RvLl90eXBlID09PSAnbmV4dFN0ZXAnKSB7XG5cdFx0XHRcdFx0Ly8gY29uc29sZS5sb2codHJhbnNpdGlvblswXS5nb1RvLl90eXBlKTtcblx0XHRcdFx0XHRzdGVwKHByb2Nlc3NJZCwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzTW9kZWwsIG5leHRTdGVwLCBzdGVwU2VxLCB7fSwgaW5wdXREYXRhLCB3b3JrZmxvdykudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuXHRcdFx0XHRcdFx0Ly8gY29uc29sZS5sb2cocmVzdWx0KTtcblx0XHRcdFx0XHRcdHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdTdGVwIHRyYW5zaXRpb24gY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCByZXN1bHQucmVzKTtcblx0XHRcdFx0XHRcdHJlc29sdmUoc3VjY2Vzcyk7XG5cdFx0XHRcdFx0fSwgZnVuY3Rpb24oZXJyKXtcblx0XHRcdFx0XHRcdHJlamVjdChlcnIpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGlmICh0cmFuc2l0aW9uWzBdLl9zdG9wID09PSB0cnVlKSB7XG5cdFx0XHRcdFx0XHR2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnQWxsIFN0ZXAgdHJhbnNpdGlvbnMgaGF2ZSBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHt9KTtcblx0XHRcdFx0XHRcdHJlc29sdmUoc3VjY2Vzcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAndXNlcic6XG5cdFx0XHRcdGlmICh0cmFuc2l0aW9uWzBdLmdvVG8uX3R5cGUgPT09ICduZXh0U3RlcCcpIHtcblx0XHRcdFx0XHQvLyBjb25zb2xlLmxvZyh0cmFuc2l0aW9uWzBdLmdvVG8uX3R5cGUpO1xuXHRcdFx0XHRcdHN0ZXAocHJvY2Vzc0lkLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NNb2RlbCwgbmV4dFN0ZXAsIHN0ZXBTZXEsIHt9LCBpbnB1dERhdGEsIHdvcmtmbG93KS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG5cdFx0XHRcdFx0XHQvLyBjb25zb2xlLmxvZyhyZXN1bHQpO1xuXHRcdFx0XHRcdFx0dmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1N0ZXAgdHJhbnNpdGlvbiBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHJlc3VsdC5yZXMpO1xuXHRcdFx0XHRcdFx0cmVzb2x2ZShzdWNjZXNzKTtcblx0XHRcdFx0XHR9LCBmdW5jdGlvbihlcnIpe1xuXHRcdFx0XHRcdFx0cmVqZWN0KGVycik7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0gZWxzZSBpZiAodHJhbnNpdGlvblswXS5nb1RvLl90eXBlID09PSAnc3RlcElkJykge1xuXHRcdFx0XHRcdHZhciBnb1RvU3RlcElkID0gdHJhbnNpdGlvblswXS5nb1RvLl9zdGVwSWQ7XG5cdFx0XHRcdFx0dmFyIGdvVG9TdGVwID0gY3VycmVudFN1YlByb2Nlc3NbMF0uc3RlcHMuZmlsdGVyKGZ1bmN0aW9uKG9ialN0ZXApe1xuXHRcdFx0XHRcdFx0aWYgKG9ialN0ZXAuX2lkID09PSBnb1RvU3RlcElkKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBvYmpTdGVwO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHZhciBnb1RvU3RlcFNlcSA9IDE7XG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjdXJyZW50U3ViUHJvY2Vzc1swXS5zdGVwcy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdFx0XHRpZiAoY3VycmVudFN1YlByb2Nlc3NbMF0uc3RlcHNbaV0uX2lkID09PSBnb1RvU3RlcElkKSB7XG5cdFx0XHRcdFx0XHRcdGdvVG9TdGVwU2VxID0gaSArIDE7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHN0ZXAocHJvY2Vzc0lkLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NNb2RlbCwgZ29Ub1N0ZXBbMF0sIGdvVG9TdGVwU2VxLCB7fSwgaW5wdXREYXRhLCB3b3JrZmxvdykudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuXHRcdFx0XHRcdFx0Ly8gY29uc29sZS5sb2cocmVzdWx0KTtcblx0XHRcdFx0XHRcdHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdTdGVwIHRyYW5zaXRpb24gY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCByZXN1bHQucmVzKTtcblx0XHRcdFx0XHRcdHJlc29sdmUoc3VjY2Vzcyk7XG5cdFx0XHRcdFx0fSwgZnVuY3Rpb24oZXJyKXtcblx0XHRcdFx0XHRcdHJlamVjdChlcnIpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGlmICh0cmFuc2l0aW9uWzBdLl9zdG9wID09PSB0cnVlKSB7XG5cdFx0XHRcdFx0XHR2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnQWxsIFN0ZXAgdHJhbnNpdGlvbnMgaGF2ZSBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHt9KTtcblx0XHRcdFx0XHRcdHJlc29sdmUoc3VjY2Vzcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0aWYgKHRyYW5zaXRpb25bMF0uX3N0b3AgPT09IHRydWUpIHtcblx0XHRcdFx0XHR2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnQWxsIFN0ZXAgdHJhbnNpdGlvbnMgaGF2ZSBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHt9KTtcblx0XHRcdFx0XHRyZXNvbHZlKHN1Y2Nlc3MpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGMDA1Jyk7XG5cdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0fVxuXHRcdH1cblx0fSk7XG59O1xuXG4vKiogXG4gKiBQcm9jZXNzIHBvc3RBY3Rpb25zXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHBvc3RBY3Rpb25zIC0gdGhlIHBvc3RBY3Rpb25zIGNvbmZpZyBkYXRhXG4gKlxuICogQGV4YW1wbGUgXG4gKlxuICogQHJldHVybiBcbiAqXG4gKi9cbmZ1bmN0aW9uIHBvc3RBY3Rpb25zKHBvc3RBY3Rpb25zKXtcblx0cmV0dXJuICdJbXBsZW1lbnRhdGlvbiBwZW5kaW5nLi4nO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7IFxuXG4gXHRwcmVSZXF1aXNpdGVzOiBwcmVSZXF1aXNpdGVzLFxuIFx0cHJlQWN0aW9uczogcHJlQWN0aW9ucyxcbiBcdHN1YlByb2Nlc3M6IHN1YlByb2Nlc3MsXG4gXHR0YXNrOiB0YXNrLFxuIFx0dHJhbnNpdGlvbjogdHJhbnNpdGlvblxuXG59IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFV0aWxpdHkgTW9kdWxlXG4gKlxuICogQG1vZHVsZSBtb2R1bGVzL3V0aWxcbiAqIEBhdXRob3IgQnJlbnQgR29yZG9uXG4gKiBAdmVyc2lvbiAyLjAuMFxuICogQGRlc2NyaXB0aW9uIFxuICogQGNvcHlyaWdodCBLd2FudHUgTHRkIFJTQSAyMDA5LTIwMTUuXG4gKlxuICovXG5cbiBtb2R1bGUuZXhwb3J0cyA9IHsgXG5cbiBcdHN1Y2Nlc3M6IGZ1bmN0aW9uKG1lc3NhZ2UsIHJlcyl7XG5cdFx0dmFyIGRhdGEgPSB7XG5cdFx0XHRjb21wbGV0ZTogdHJ1ZSxcblx0XHRcdG1lc3NhZ2U6IG1lc3NhZ2UsXG5cdFx0XHRyZXM6IHJlc1xuXHRcdH1cblx0XHRyZXR1cm4gZGF0YTtcblx0fSxcblxuXHR3YXJuOiBmdW5jdGlvbihtZXNzYWdlLCByZXMpe1xuXHRcdHZhciBkYXRhID0ge1xuXHRcdFx0Y29tcGxldGU6IHRydWUsXG5cdFx0XHR3YXJuaW5nOiBtZXNzYWdlLFxuXHRcdFx0cmVzOiByZXNcblx0XHR9XG5cdFx0Y29uc29sZS53YXJuKGRhdGEpO1xuXHRcdHJldHVybiBkYXRhO1xuXHR9LFxuXG5cdGVycm9yOiBmdW5jdGlvbihjb2RlLCBtZXNzYWdlKXtcblx0XHR2YXIgZXJyID0gbmV3IEVycm9yKCcnKTtcblx0XHRlcnIubmFtZSA9IGNvZGU7XG5cdFx0ZXJyLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXHRcdHJldHVybiBlcnI7XG5cdH0sXG5cbiBcdHN5bmNMb29wOiBmdW5jdGlvbihpdGVyYXRpb25zLCBwcm9jZXNzLCBleGl0KXsgIFxuXHQgICAgdmFyIGluZGV4ID0gMCxcblx0ICAgICAgICBkb25lID0gZmFsc2UsXG5cdCAgICAgICAgc2hvdWxkRXhpdCA9IGZhbHNlO1xuXHQgICAgdmFyIGxvb3AgPSB7XG5cdCAgICAgICAgbmV4dDpmdW5jdGlvbigpe1xuXHQgICAgICAgICAgICBpZihkb25lKXtcblx0ICAgICAgICAgICAgICAgIGlmKHNob3VsZEV4aXQgJiYgZXhpdCl7XG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV4aXQoKTsgLy8gRXhpdCBpZiB3ZSdyZSBkb25lXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgLy8gSWYgd2UncmUgbm90IGZpbmlzaGVkXG5cdCAgICAgICAgICAgIGlmKGluZGV4IDwgaXRlcmF0aW9ucyl7XG5cdCAgICAgICAgICAgICAgICBpbmRleCsrOyAvLyBJbmNyZW1lbnQgb3VyIGluZGV4XG5cdCAgICAgICAgICAgICAgICBwcm9jZXNzKGxvb3ApOyAvLyBSdW4gb3VyIHByb2Nlc3MsIHBhc3MgaW4gdGhlIGxvb3Bcblx0ICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIHdlJ3JlIGRvbmVcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlOyAvLyBNYWtlIHN1cmUgd2Ugc2F5IHdlJ3JlIGRvbmVcblx0ICAgICAgICAgICAgICAgIGlmKGV4aXQpIGV4aXQoKTsgLy8gQ2FsbCB0aGUgY2FsbGJhY2sgb24gZXhpdFxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSxcblx0ICAgICAgICBpdGVyYXRpb246ZnVuY3Rpb24oKXtcblx0ICAgICAgICAgICAgcmV0dXJuIGluZGV4IC0gMTsgLy8gUmV0dXJuIHRoZSBsb29wIG51bWJlciB3ZSdyZSBvblxuXHQgICAgICAgIH0sXG5cdCAgICAgICAgYnJlYWs6ZnVuY3Rpb24oZW5kKXtcblx0ICAgICAgICAgICAgZG9uZSA9IHRydWU7IC8vIEVuZCB0aGUgbG9vcFxuXHQgICAgICAgICAgICBzaG91bGRFeGl0ID0gZW5kOyAvLyBQYXNzaW5nIGVuZCBhcyB0cnVlIG1lYW5zIHdlIHN0aWxsIGNhbGwgdGhlIGV4aXQgY2FsbGJhY2tcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXHQgICAgbG9vcC5uZXh0KCk7XG5cdCAgICByZXR1cm4gbG9vcDtcblx0fSxcblxuXHRjb21wYXJlOiBmdW5jdGlvbihzdWJqZWN0LCBvcGVyYXRvciwgdmFsdWUpIHtcblx0ICBcdHN3aXRjaCAob3BlcmF0b3IpIHtcblx0ICBcdFx0Y2FzZSAnZ3JlYXRlclRoYW4nOiAgIFx0IFxuXHRcdFx0XHRyZXR1cm4gc3ViamVjdCA+IHZhbHVlO1xuXHRcdFx0Y2FzZSAnbGVzc1RoYW4nOiAgIFx0XHQgXG5cdFx0XHRcdHJldHVybiBzdWJqZWN0IDwgdmFsdWU7XG5cdFx0XHRjYXNlICdncmVhdGVyVGhhbkVxdWFsJzogXG5cdFx0XHRcdHJldHVybiBzdWJqZWN0ID49IHZhbHVlO1xuXHRcdFx0Y2FzZSAnbGVzc1RoYW5FcXVhbCc6ICBcdCBcblx0XHRcdFx0cmV0dXJuIHN1YmplY3QgPD0gdmFsdWU7XG5cdFx0XHRjYXNlICdlcXVhbFRvJzogXHRcdCBcblx0XHRcdFx0cmV0dXJuIHN1YmplY3QgPT09IHZhbHVlO1xuXHRcdFx0Y2FzZSAnbm90RXF1YWxUbyc6IFx0XHQgXG5cdFx0XHRcdHJldHVybiBzdWJqZWN0ICE9PSB2YWx1ZTtcblx0ICBcdH1cblx0fVxuXHRcbiB9Il19
