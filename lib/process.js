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

function subProcess(processId, subProcess, seq, inputData, workflow){
	var deferred = Q.defer();
	var completed = [];
	var result = {
		complete: false,
		data: []
	};
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
            "message": ""
        }
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
			step(processId, subProcess._id, subProcessModel, subProcess.steps[0], 0, formDef, inputData, workflow).then(function(result){
				if (result.complete) {
					var success = util.success('Sub-Process completed successfully.', result.res);
					deferred.resolve(success);
				} else {
					var error = util.error('WF019');
					deferred.reject(error);
				}
			}).fail(function(err){
				deferred.reject(err);
			}); 
			// var success = util.success('Sub-Process completed successfully.', subProcessModel);
			// deferred.resolve(success);
		} else {
			var error = util.error('WF011');
			deferred.reject(error);
		}
	}).fail(function(err){
		deferred.reject(err);
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

function step(processId, subProcessId, subProcessModel, step, seq, formDef, inputData, workflow){
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
	subProcessModel.step.id = step._id;
	subProcessModel.step.seq = seq;
	subProcessModel.step.status = step._setInstanceStatusTo;
	subProcessModel.step.message = step._setStatusMsgTo;
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
						// console.log(step._id + ' transition ' + counter + ' starting.');
						transition(processId, subProcessId, step._id, step.actions[0].transitions[counter]._id, subProcessModel, workflow).then(function(result){
							// console.log('Transition step completed successfully.');
							var success = util.success('Transition step completed successfully.', subProcessModel);
							deferred.resolve(success);
						}).fail(function(err){
							deferred.reject(err);
							loop.break();
						});	
						loop.next();
					});
				} else {
					// console.log('No transitions specified in this step.');
					var success = util.success('No transitions specified in this step.', subProcessModel);
					deferred.resolve(success);
				}
			});
		}).fail(function(err){
			deferred.reject(err);
		}); 
		// var success = util.success('Action completed successfully.', result);
		// deferred.resolve(success);
	} else if (step.task !== undefined) {
		var success = util.success('Task awaiting user action.', subProcessModel);
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
	// console.log(actions);
	util.syncLoop(actions.length, function(loop){
		var counter = loop.iteration();
		// console.log(counter);
		// console.log(actions.length);
		// console.log(actions[counter]);
		action(actions[counter], counter, formDef, workflow).then(function(data){			
			// Check if all pre-requisites completed successfully.
			// console.log(actions[counter]._id + ' completed.') ;
			completed.push(data.complete);
			result.data.push(data.res);
			loop.next();
		}).fail(function(err){
			deferred.reject(err);
			loop.break();
		});
	}, function(){
		// console.log('Loop done function called.');
		if (completed.every(Boolean)) {
			// console.log('Actions completed successfully.');
			result.completed = true;
			var success = util.success('Actions completed successfully.', result);
			deferred.resolve(success);
		} else {
			// console.log('Actions failed.');
			result.completed = false;
			var err = util.error('Actions failed.', result);
			deferred.reject(success);
		}
	});
	return deferred.promise;
};

function action(action, counter, formDef, workflow){
	var deferred = Q.defer();
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
				deferred.resolve(success);
			}).fail(function(err){
				deferred.reject(err);
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
				deferred.resolve(success);
			}).fail(function(err){
				deferred.reject(err);
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
				deferred.resolve(success);
			}).fail(function(err){
				deferred.reject(err);
			});
			break;
		default:
			var error = util.error('WF020');
			deferred.reject(error);
	}
	return deferred.promise;
};

function task(task){
	return 'Implementation pending..';
};

function transition(processId, subProcessId, stepId, transitionId, subProcessModel, workflow){
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
				step(processId, subProcessId, subProcessModel, nextStep, stepSeq, {}, {}, workflow).then(function(result){
					// console.log(result);
					var success = util.success('Step transition completed successfully.', result.res);
					deferred.resolve(success);
				}).fail(function(err){
					deferred.reject(err.stack);
				});
			} else {
				if (transition[0]._stop === true) {
					var success = util.success('All Step transitions have completed successfully.', result.res);
					deferred.resolve(success);
				}
			}
			break;
		case 'user':
			if (transition[0].goTo._type === 'nextStep') {
				// console.log(transition[0].goTo._type);
				step(processId, subProcessId, subProcessModel, nextStep, stepSeq, {}, {}, workflow).then(function(result){
					// console.log(result);
					var success = util.success('Step transition completed successfully.', result.res);
					deferred.resolve(success);
				}).fail(function(err){
					deferred.reject(err.stack);
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
				step(processId, subProcessId, subProcessModel, goToStep[0], goToStepSeq, {}, {}, workflow).then(function(result){
					// console.log(result);
					var success = util.success('Step transition completed successfully.', result.res);
					deferred.resolve(success);
				}).fail(function(err){
					deferred.reject(err.stack);
				});
			} else {
				if (transition[0]._stop === true) {
					var success = util.success('All Step transitions have completed successfully.', result.res);
					deferred.resolve(success);
				}
			}
			break;
		default:
			if (transition[0]._stop === true) {
				var success = util.success('All Step transitions have completed successfully.', result.res);
				deferred.resolve(success);
			} else {
				var error = util.error('WF005');
				deferred.reject(error);
			}
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