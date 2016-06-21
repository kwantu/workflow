'use strict';

var util = require('./utility');
var form = require('./form');

/**
 * Process Module
 *
 * @module lib/process
 * @author Brent Gordon
 * @version 0.1.0
 * @description test description
 *
 */

/**
 * Process pre-requisites
 *
 * @param {object} prerequisites - the pre-requisites config data
 *
 * @example ''
 *
 * @return ''
 *
 */
function preRequisites(prerequisites) {
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
		var success = util.success('Pre-requisites completed successfully.', {});
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
 * @return ''
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
 * @example ''
 *
 * @return ''
 *
 */
function preActions(preActions, workflow){
	return new Promise(function(resolve, reject) {
		// Add function logic here...

		var success = util.success('Pre-actions completed successfully.', {});
		resolve(success);
	});
};

/**
 * Process sub-process
 *
 * @param {string} processId - the current process id
 * @param {object} subProcess - the sub-process config data
 * @param {number} seq - the current sub-process instance counter / sequence
 * @param {object} data - the user input data
 * @param {object} workflow - the current workflow constructor instance
 *
 * @example ''
 *
 * @return ''
 *
 */
function subProcess(processId, subProcess, seq, data, workflow){
	return new Promise(function(resolve, reject) {
		// The default subProcess model
		var subProcessModel = {
			id: subProcess._id,
			seq: seq,
			initiated: false,
			dates: {
	            created: '',
	            valid: '',
	            due: '',
	            closed: ''
	        },
	        complete: false,
	        indicators: [],
	        step: {}
		};
		try {
			// Initiate the sub-process
			initiate(subProcess.initiate, data).then(function(result){
				subProcessModel.initiated = true;
				subProcessModel.dates.created = result.data.createdDate;
				subProcessModel.dates.valid = result.data.validDate;
				subProcessModel.dates.due = result.data.dueDate;
				// Update the workflow process subProcess data
				var processSeq = workflow.instance.processes.length;
				workflow.instance.processes.filter(function(objProcess){
					if (objProcess.id === processId && objProcess.seq === processSeq) {
						objProcess.subProcesses.push(subProcessModel);
					}
				});
				// Process the first step and any subsequent 'auto' step
				var formDef = {
					id: subProcess._id,
					name: subProcess.name.i18n.value,
					indicators: subProcess.indicators
				}
				step(processId, subProcess._id, subProcess.steps[0]._id, 0, formDef, data, workflow).then(function(result){
					var success = util.success('Sub-Process completed successfully.', workflow.instance);
					resolve(success);
				}, function(err){
					reject(err);
				});
			}, function(err){
				reject(err);
			});
		} catch(err){
			reject(err);
		}
	});
};

/**
 * Process initiate
 *
 * @param {object} initiate - the initiate config data
 * @param {object} data - the user input data
 *
 * @example ''
 *
 * @return ''
 *
 */
function initiate(initiate, data){
	var completed = [];
	var result = {
		complete: false
	};
	return new Promise(function(resolve, reject) {
		switch(initiate._type) {
			case 'user':
				// If the subProcess initiation is user defined then
				result.createdDate = data.createdDate;
				if (initiate.dates.valid._type === 'userSelected') {
					if (data.validDate !== undefined) {
						result.validDate = data.validDate;
					} else {
						var error = util.error('WFInitiateError', 'No valid date passed in - {inputData.validDate}');
						reject(error);
					}
				}
				if (initiate.dates.due._type === 'userSelected') {
					if (data.dueDate !== undefined) {
						result.dueDate = data.dueDate;
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
 * @param {string} stepId - the current sub-process step id
 * @param {number} stepSeq - the current sub-process step instance counter / sequence
 * @param {object} formDef - the current sub-process form config data
 * @param {object} inputData - the user input data
 * @param {object} workflow - the current workflow constructor instance
 *
 * @example ''
 *
 * @return ''
 *
 */
function step(processId, subProcessId, stepId, stepSeq, formDef, inputData, workflow){
	return new Promise(function(resolve, reject) {
		// Default step model
		var stepModel = {
	        id: '',
	        seq: '',
	        status: '',
	        message: '',
	        assignedTo: {
	            userId: '',
	            name: ''
	        }
	    };
		try {
			// Get the current step
			var step = {};
			workflow.config.processes.filter(function(objProcess){
				if (objProcess._id === processId) {
					objProcess.subProcesses.filter(function(objSubProcess){
						if (objSubProcess._id === subProcessId) {
							objSubProcess.steps.filter(function(objStep){
								if (objStep._id === stepId) {
									step = objStep;
								}
							})
						}
					})
				}
			});
			// Update the sub-process step data
			stepModel.id = stepId;
			stepModel.seq = stepSeq;
			stepModel.status = step._setInstanceStatusTo;
			stepModel.message = step._setStatusMsgTo;
			stepModel.assignedTo.userId = inputData.userId;
			stepModel.assignedTo.name = inputData.name;
			// Update the current process, subProcess step data
			var processSeq = workflow.instance.processes.length;
			workflow.instance.processes.filter(function(objProcess){
				if (objProcess.id === processId && objProcess.seq === processSeq) {
					var subProcessSeq = objProcess.subProcesses.length;
					objProcess.subProcesses.filter(function(objSubProcess){
						if (objSubProcess.id === subProcessId && objSubProcess.seq === subProcessSeq) {
							objSubProcess.step = stepModel;
						}
					})
				}
			});
			// If actions are sprecified, execute them
			if (step.actions[0] !== undefined) {
				actions(step.actions, formDef, workflow).then(function(data){
					// The document process.step model
				    var documentStepModel = {
		                id: stepId,
		                seq: stepSeq,
		                startDate: inputData.createdDate,
		                status: step._setInstanceStatusTo,
		                message: step._setStatusMsgTo,
		                assignedTo: {
		                    userId: inputData.userId,
		            		name: inputData.name
		                },
		                comment: inputData.comment,
		                complete: false,
		                endDate: ''
			        };
					util.syncLoop(data.res.data[0].form.indicators.length, function(loop){
						var counter = loop.iteration();
						// Update the processes instance model, inidcators section
						var indicatorModel = {
							id: data.res.data[0].form.indicators[counter].category.term,
							instances: [
								{
									uuid: data.res.data[0].form.indicators[counter]._id,
									key: '',
									seq: 1
								}
							]
						};
						// Update the indicator set documents workflow.processes.step data

						loop.next();
					}, function(){
						// Check if it should automatically transition to the next step
						if (step.actions[0].transitions.length !== 0) {
							util.syncLoop(step.actions[0].transitions.length, function(loop){
								var counter = loop.iteration();
								transition(processId, subProcessId, stepId, step.actions[0].transitions[counter]._id, inputData, workflow).then(function(result){
									var success = util.success('Transition step completed successfully.', {});
									resolve(success);
								}, function(err){
									reject(err);
									loop.break();
								});
								loop.next();
							});
						} else {
							var success = util.success('No transitions specified in this step.', {});
							resolve(success);
						}
					});
				}, function(err){
					reject(err);
				});
			} else if (step.task !== undefined) {
				var success = util.success('Task awaiting user action.', {});
				resolve(success);
			}
		} catch(err) {
	    	reject(err);
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
 * @example ''
 *
 * @return ''
 *
 */
function actions(actions, formDef, workflow){
	var completed = [];
	var result = {
		completed: true,
		data: []
	};
	return new Promise(function(resolve, reject) {
		util.syncLoop(actions.length, function(loop){
			var counter = loop.iteration();
			action(actions[counter], formDef, workflow).then(function(data){
				completed.push(data.complete);
				result.data.push(data.res);
				loop.next();
			}, function(err){
				reject(err);
				loop.break();
			});
		}, function(){
			if (completed.every(Boolean)) {
				result.completed = true;
				var success = util.success('Actions completed successfully.', result);
				resolve(success);
			} else {
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
 * @example ''
 *
 * @return ''
 *
 */
function action(action, params, workflow){
	return new Promise(function(resolve, reject) {
		switch(action._id) {
			case 'createForm':
				form.create(params, workflow).then(function(result){
					var data = {
						transitions: [],
						form: {
							id: params.id,
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
				form.authorise(params, workflow).then(function(result){
					var data = {
						transitions: [],
						form: {
							id: params.id,
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
				form.close(params, workflow).then(function(result){
					var data = {
						transitions: [],
						form: {
							id: params.id,
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
 * @example ''
 *
 * @return ''
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
 * @param {object} data - the user input data
 * @param {object} workflow - the current workflow constructor instance
 *
 * @example ''
 *
 * @return ''
 *
 */
function transition(processId, subProcessId, stepId, transitionId, data, workflow){
	return new Promise(function(resolve, reject) {
		try {
			var stepSeq = 0;
			var nextStepId = '';
			var transition = {};
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
			for (var i = 0; i < currentSubProcess[0].steps.length; i++){
				if (currentSubProcess[0].steps[i]._id === stepId) {
					stepSeq = i;
				}
			}
			for (var i = 0; i < currentSubProcess[0].steps.length; i++){
				var nextStepSeq = stepSeq + 1;
				if (i === nextStepSeq) {
					nextStepId = currentSubProcess[0].steps[i]._id;
				}
			}
			switch(transition[0]._type) {
				case 'auto':
					if (transition[0].goTo._type === 'nextStep') {
						step(processId, subProcessId, nextStepId, stepSeq, {}, data, workflow).then(function(result){
							var success = util.success('Step transition completed successfully.', result.data);
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
						step(processId, subProcessId, nextStepId, stepSeq, {}, data, workflow).then(function(result){
							var success = util.success('Step transition completed successfully.', result.data);
							resolve(success);
						}, function(err){
							reject(err);
						});
					} else if (transition[0].goTo._type === 'stepId') {
						var goToStepId = transition[0].goTo._stepId;
						var goToStepSeq = 1;
						for (var i = 0; i < currentSubProcess[0].steps.length; i++){
							if (currentSubProcess[0].steps[i]._id === goToStepId) {
								goToStepSeq = i + 1;
							}
						}
						step(processId, subProcessId, goToStepId, goToStepSeq, {}, data, workflow).then(function(result){
							var success = util.success('Step transition completed successfully.', result.data);
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
						var error = util.error('WF005','');
						reject(error);
					}
			}
		} catch(err){
			reject(err);
		}
	});
};

/**
 * Process postActions
 *
 * @param {object} postActions - the postActions config data
 *
 * @example ''
 *
 * @return ''
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
