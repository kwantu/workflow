'use strict';

var Q = require('q');
var moment = require('moment');

var util = require('./utility');
var form = require('./form');

/**
 * Process Module
 *
 * @module lib/process
 * @author Brent Gordon
 * @version 2.0.0
 * @description 
 * @copyright Kwantu Ltd RSA 2009-2015.
 *
 */

function state(workflow, processId, subProcessId){
	var processIndex;
	var subProcessIndex;
	var currentProcessId;
	var currentSubProcessId;
	var processSeq;
	var subProcessSeq;
	if (processInstance !== undefined) {
		var processInstance = workflow.instance.processes.filter(function(objProcess){
			if (objProcess._id === processId) {
				return objProcess;
			}
		});
		processIndex = processInstance.length - 1;
		currentProcessId = workflow.instance.processes[processIndex].id;
		processSeq = workflow.instance.processes[processIndex].seq;
	} else {
		processInstance = [];
		processIndex = 0;
		currentProcessId = processId;
		processSeq = 1;
	}
	if (processInstance.subProcesses !== undefined) {
		var subProcessInstance = processInstance.subProcesses.filter(function(objProcess){
			if (objProcess._id === subProcessId) {
				return objProcess;
			}
		});
		subProcessIndex = subProcessInstance.length - 1;
		currentSubProcessId = workflow.instance.processes[processIndex].subProcesses[subProcessIndex].id;
		subProcessSeq = workflow.instance.processes[processIndex].subProcesses[subProcessIndex].seq;
	} else {
		subProcessInstance = [];
		subProcessIndex = 0;
		currentSubProcessId = subProcessId;
		subProcessSeq = 1;
	}
	var data = {
		profileId: workflow.profile,
		configId: workflow.config._id,
		processId: currentProcessId,
		processIndex: processIndex,
		processSeq: processSeq,
		subProcessId: currentSubProcessId,
		subProcessIndex: subProcessIndex,
		subProcessSeq: subProcessSeq
	}
	return data;
};

function preRequisites(prerequisites) {
	var deferred = Q.defer();
	var completed = [];
	var result = {
		complete: false,
		data: []
	};
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
	// 	}).fail(function(err){
	// 		loop.break();
	// 		deferred.reject(err);
	// 	});
	// });
	var success = util.success('Pre-requisites completed successfully.', result);
	deferred.resolve(success);
	return deferred.promise;
};

/** 
 * Workflow pre-requisite, execute the pre-requisite condition.
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
 * Workflow.preRequisite(config, counter, instance, doc);
 *
 * @return Success / error message with the newly created workflow processes
 * instance data.
 *
 */
function preRequisite(prerequisite, counter, workflow){
	var deferred = Q.defer();
	switch(prerequisite._type) {
		case 'mock':
			// Used for mock testing
			if (util.compare(prerequisite._subject, prerequisite._operator, prerequisite._value)) {
				var data = {};
				var success = util.success('Mock successfull.', data);
				deferred.resolve(success);
			} else {
				// console.warn('Pre-requisite ' + counter + ' not met.');
				var error = util.error('WF006');
				deferred.reject(error);
			}
			break;
		// TODO: Add the call to the relevant methods based on the _type 
		// attribute.
		case 'count':
			// TODO: Add code logic here...
			var data = {};
			var success = util.success('Mock count successfull.', data);
			deferred.resolve(success);
			break;
		default:
			var error = util.error('WF005');
			deferred.reject(error);
	}
	return deferred.promise;
};

function preActions(preActions, workflow){
	var deferred = Q.defer();
	var completed = [];
	var result = {
		complete: false,
		data: []
	};
	var success = util.success('Pre-actions completed successfully.', result);
	deferred.resolve(success);
	return deferred.promise;
};

function subProcess(processId, subProcess, inputData, workflow){
	var deferred = Q.defer();
	var completed = [];
	var result = {
		complete: false,
		data: []
	};
	var subProcessModel = {
		"id": subProcess._id, 
		"seq": 1, 
		"initiated": false,
		"status": "",
		"message": "",
		"dates": {
			"created": "",
			"valid": "",
			"due": "",
			"submitted": "",
			"authorised": "",
			"closed": ""
		},
		"complete": false,
		"indicators": []
	};
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
			step(processId, subProcess._id, subProcessModel, subProcess.steps[0], subProcess.steps[1], formDef, inputData, workflow).then(function(result){
				if (result.complete) {
					var success = util.success('Sub-Process completed successfully.', result.res);
					deferred.resolve(success);
				} else {
					var error = util.error('WF019');
					deferred.reject(error);
				}
			}).fail(function(err){
				deferred.reject(err.stack);
			}); 
			// var success = util.success('Sub-Process completed successfully.', subProcessModel);
			// deferred.resolve(success);
		} else {
			var error = util.error('WF011');
			deferred.reject(error);
		}
	}).fail(function(err){
		deferred.reject(err.stack);
	});
	return deferred.promise;
};

function initiate(initiate, inputData){
	var deferred = Q.defer();
	var completed = [];
	var result = {
		complete: false
	};
	switch(initiate._type) {
		case 'user':
			// If the subProcess initiation is user defined then
			result.createdDate = inputData.createdDate;
			if (initiate.dates.valid._type === 'userSelected') {
				if (inputData.validDate !== undefined) {
					result.validDate = inputData.validDate;
				} else {
					var error = util.error('WF0013');
					deferred.reject(error);
				}
			}
			if (initiate.dates.due._type === 'userSelected') {
				if (inputData.dueDate !== undefined) {
					result.dueDate = inputData.dueDate;
				} else {
					var error = util.error('WF0020');
					deferred.reject(error);
				}
			}
			result.complete = true;
			var success = util.success('Sub-Process initiate completed successfully.', result);
			deferred.resolve(success);
			break;
		default:
			var error = util.error('WF016');
			deferred.reject(error);
	}
	return deferred.promise;
};

function step(processId, subProcessId, subProcessModel, step, nextStep, formDef, inputData, workflow){
	var deferred = Q.defer();
	var completed = [];
	var result = {
		complete: true,
		step: {
			id: '',
			seq: '',
			status: '',
			message: ''
		},
		data: {}
	};
	// console.log(step);
	// Set the status and status message
	subProcessModel.status = step._setInstanceStatusTo;
	subProcessModel.message = step._setStatusMsgTo;

	result.step.id = step._id;
	result.step.seq = step._seq;
	// result.step.status = step._setInstanceStatusTo;
	// result.step.message = step._setStatusMsgTo;
	
	if (step.actions[0] !== undefined) {
		actions(step.actions, formDef, workflow).then(function(data){
			// Set the processes values for all the indicator sets
			var processModel = {
				"configId": workflow.config._id, 
	            "instanceId": workflow.instance._id,
	            "processId": processId,
	            "subProcessId": subProcessId,
	            "stepId": step._id,
	            "assignedTo": {
	                "userId": inputData.userId,
	                "name": inputData.name
	            },
	            "token": "",
	            "status": step._setInstanceStatusTo,
	            "statusMsg": step._setStatusMsgTo,
	            "lastUpdated": inputData.createdDate,
	            "dueDate": inputData.dueDate
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
							"seq": 1, 
							"status": "NotStarted", 
							"lastUpdated": inputData.createdDate,
							"complete": false                  
						}
					]
				};
				subProcessModel.indicators.push(indicatorModel);
				// Update the indicator documents processes section
				data.res.data[0].form.indicators[counter].processes.push(processModel);
				loop.next();
			}, function(){
				// Check if it should automatically transition to the next step
				util.syncLoop(step.actions[0].transitions.length, function(loop){
					var counter = loop.iteration();
					// console.log(step._id);
					transition(processId, subProcessId, step._id, step.actions[0].transitions[counter]._id, subProcessModel, nextStep, workflow).then(function(result){
						var success = util.success('Actions completed successfully.', subProcessModel);
						deferred.resolve(success);
					}).fail(function(err){
						deferred.reject(err.stack);
					});	
					loop.next();
				});
			});
		}).fail(function(err){
			deferred.reject(err.stack);
		}); 
		// var success = util.success('Action completed successfully.', result);
		// deferred.resolve(success);
	} else if (step.task !== undefined) {
		var success = util.success('Actions completed successfully.', subProcessModel);
		deferred.resolve(success);
	} else {
		var error = util.error('WF013');
		deferred.reject(error);
	}
	return deferred.promise;
};

function actions(actions, formDef, workflow){
	var deferred = Q.defer();
	var completed = [];
	var result = {
		completed: true,
		data: []
	};
	util.syncLoop(actions.length, function(loop){
		var counter = loop.iteration();
		action(actions[counter], counter, formDef, workflow).then(function(data){			
			// Check if all pre-requisites completed successfully.
			if (actions.length !== counter) {
				completed.push(data.complete);
				result.data.push(data.res);
				if (completed.every(Boolean)) {
					result.completed = true;
					var success = util.success('Action completed successfully.', result);
					deferred.resolve(success);
				}
			} else {
				completed.push(data.complete);
				result.data.push(data.res);
				loop.next();
			}
		}).fail(function(err){
			loop.break();
			deferred.reject(err);
		});
	});
	return deferred.promise;
};

function action(action, counter, formDef, workflow){
	var deferred = Q.defer();
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
				deferred.resolve(success);
			}).fail(function(err){
				deferred.reject(err);
			});
			break;
		// case 'saveIndicator':
			
		// 	break;
		// case 'submitForm':
			
		// 	break;
		// case 'authoriseForm':
			
		// 	break;
		// case 'closeForm':
			
		// 	break;
		default:
			var error = util.error('WF020');
			deferred.reject(error);
	}
	return deferred.promise;
};

function task(task){
	return 'Implementation pending..';
};

function transition(processId, subProcessId, stepId, transitionId, subProcessModel, nextStep, workflow){
	var deferred = Q.defer();
	var completed = [];
	var result = {
		complete: false,
		data: []
	};
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
	// console.log(transition)
	switch(transition[0]._type) {
		case 'auto':
			if (transition[0].goTo._type === 'nextStep') {
				// console.log(transition[0].goTo._type);
				step(processId, subProcessId, subProcessModel, nextStep, {}, {}, {}, workflow).then(function(result){
					// console.log(result);
					var success = util.success('Step transition completed successfully.', result.res);
					deferred.resolve(success);
				}).fail(function(err){
					deferred.reject(err.stack);
				});
			}
			break;
		case 'user':
			if (transition[0].goTo._type === 'nextStep') {
				// console.log(transition[0].goTo._type);
				step(processId, subProcessId, subProcessModel, nextStep, {}, {}, {}, workflow).then(function(result){
					// console.log(result);
					var success = util.success('Step transition completed successfully.', result.res);
					deferred.resolve(success);
				}).fail(function(err){
					deferred.reject(err.stack);
				});
			}
			break;
		default:
			var error = util.error('WF005');
			deferred.reject(error);
	}
	return deferred.promise;
};

function postActions(){
	return 'Implementation pending..';
};

function func(){
	return 'Implementation pending..';
};

module.exports = { 

 	state: state,
 	preRequisites: preRequisites,
 	preActions: preActions,
 	subProcess: subProcess,
 	transition: transition

}