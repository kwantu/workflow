'use strict';

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
 * @return Success / error message with the newly created workflow processes
 * instance data.
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
            "message": ""
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

function step(processId, subProcessId, subProcessModel, step, seq, formDef, inputData, workflow){
	return new Promise(function(resolve, reject) {
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
			action(actions[counter], counter, formDef, workflow).then(function(data){			
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

function action(action, counter, formDef, workflow){
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

function task(task){
	return 'Implementation pending..';
};

function transition(processId, subProcessId, stepId, transitionId, subProcessModel, workflow){
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
					step(processId, subProcessId, subProcessModel, nextStep, stepSeq, {}, {}, workflow).then(function(result){
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
					step(processId, subProcessId, subProcessModel, nextStep, stepSeq, {}, {}, workflow).then(function(result){
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
					step(processId, subProcessId, subProcessModel, goToStep[0], goToStepSeq, {}, {}, workflow).then(function(result){
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

function postActions(){
	return 'Implementation pending..';
};

function func(){
	return 'Implementation pending..';
};

module.exports = { 

 	preRequisites: preRequisites,
 	preActions: preActions,
 	subProcess: subProcess,
 	task: task,
 	transition: transition

}