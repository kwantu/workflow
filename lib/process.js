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
			// TODO: Add the call to the relevant methods based on the _type attribute. Should call the generic action() method.
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
 * @param {object} process - the current process id and seq
 * @param {object} subProcess - the sub-process id and seq
 * @param {object} data - the user input data
 * @param {object} _WFInstance - the current workflow constructor instance
 *
 * @example ''
 *
 * @return ''
 *
 */
function subProcess(processId, processSeq, subProcessId, data, _WFInstance){
	// Get the current process subProcess instance
	var subProcessSeq = 1;
	var subProcess = [];
	var subProcessConf = [];
	_WFInstance.instance.processes.filter(function(process){
		if (process.id === processId && process.seq === processSeq) {
			process.subProcesses.filter(function(subProcess){
				if (subProcess.id === subProcessId) {
					subProcess = subProcess;
				}
			})
		}
	})
	// Get the current subProcess configuration
	_WFInstance.config.processes.filter(function(processConfig){
		if (processConfig._id === processId) {
			var result = [];
			processConfig.subProcesses.filter(function(subProcessConfig){
				if (subProcessConfig._id === subProcessId) {
					subProcessConf = subProcessConfig;
				}
			})
		}
	})
	if (subProcess.length !== 0) {
		subProcessSeq = subProcess.length + 1;
	}
	// The default subProcess model
	var model = {
		id: subProcessId,
		seq: subProcessSeq,
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
	// Return a promise
	return new Promise(function(resolve, reject) {
		// Catch all uncaught errors
		try {
			// 1. Initiate the subProcess
			var initiateConf = subProcessConf.initiate;
			initiate(initiateConf, data).then(function(result){
				//Update the subProcess model
				model.initiated = result.data.initiated;
				model.dates = result.data.dates;
				// Execute the first step
				var stepId = subProcessConf.steps[0]._id;
				var transitionId = subProcessConf.steps[0].transitions[0]._id;
				var stepSeq = 1;
				// console.log(stepId);
				step(processId, subProcessId, stepId, stepSeq, data, _WFInstance).then(function(result){
					// Execute the transitions, if auto
					transition(processId, subProcessId, stepId, transitionId, data, _WFInstance).then(function(result){
						console.log(result);
						// Update the subProcess step data
						model.step = result.data;
	          var success = util.success(result.message, model);
	          resolve(success);
	        }, function(err){
	          reject(err);
	        });
					// var success = util.success(result.message, model);
					// resolve(success);
				}, function(err){
					reject(err);
				})
			}, function(err){
				reject(err);
			})
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
		initiated: false,
		dates: {
			created: '',
			valid: '',
			due: '',
			closed: ''
		}
	};
	return new Promise(function(resolve, reject) {
		switch(initiate._type) {
			case 'user':
				// If the subProcess initiation is user defined then
				result.dates.created = data.createdDate;
				if (initiate.dates.valid._type === 'userSelected') {
					if (data.validDate !== undefined) {
						result.dates.valid = data.validDate;
					} else {
						var error = util.error('WFInitiateError', 'No valid date passed in - {inputData.validDate}');
						reject(error);
					}
				}
				if (initiate.dates.due._type === 'userSelected') {
					if (data.dueDate !== undefined) {
						result.dates.due = data.dueDate;
					} else {
						var error = util.error('WFInitiateError', 'No due date passed in - {inputData.dueDate}');
						reject(error);
					}
				}
				result.initiated = true;
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
 * @param {object} inputData - the user input data
 * @param {object} workflow - the current workflow constructor instance
 *
 * @example ''
 *
 * @return ''
 *
 */
function step(processId, subProcessId, stepId, stepSeq, inputData, _WFInstance){
	// Default step model
	var model = {
		id: '',
		seq: '',
		status: '',
		message: '',
		assignedTo: {
			userId: '',
			name: ''
		}
	};
	var subProcess = {};
	var step = {};
	var transitionId = '';
	return new Promise(function(resolve, reject) {
		try {
			// Get the current step
			_WFInstance.config.processes.filter(function(objProcess){
				if (objProcess._id === processId) {
					objProcess.subProcesses.filter(function(objSubProcess){
						if (objSubProcess._id === subProcessId) {
							subProcess = objSubProcess;
							objSubProcess.steps.filter(function(objStep){
								if (objStep._id === stepId) {
									console.log(objStep);
									step = objStep;
								}
							})
						}
					})
				}
			});
			// var transitionId = step.transitions[0]._id;
			// Update the sub-process step data
			model.id = stepId;
			model.seq = stepSeq;
			model.status = step._setInstanceStatusTo;
			model.message = step._setStatusMsgTo;
			model.assignedTo.userId = inputData.userId;
			model.assignedTo.name = inputData.name;
			// If actions are sprecified, execute them
			if (step.actions[0] !== undefined) {
				actions(step.actions, subProcess, _WFInstance).then(function(result){
					// Execute the transitions, if auto
					var success = util.success('Actions completed successfully.', model);
					resolve(success);
				}, function(err){
					reject(err);
				})
			// Else tasks are sprecified, execute them
			} else if (step.task !== undefined) {
				var success = util.success('Task awaiting user action.', model);
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
 * @param {object} subProcess - the current sub-process form config data
 * @param {object} _WFInstance - the current workflow constructor instance
 *
 * @example ''
 *
 * @return ''
 *
 */
function actions(actions, subProcess, _WFInstance){
	var arrActions = [];
	return new Promise(function(resolve, reject) {
		util.syncLoop(actions.length, function(loop){
			var counter = loop.iteration();
			action(actions[counter], subProcess, _WFInstance).then(function(result){
				var retAction = { id: actions[counter]._id, seq: counter, data: result };
				arrActions.push(retAction);
				loop.next();
			}, function(err){
				loop.break();
				reject(err);
			});
		}, function(){
			// On completion of the loop
			var success = util.success('Actions completed successfully.', arrActions);
			resolve(success);
		});
	});
};

/**
 * Process action
 *
 * @param {object} action - the action config data
 * @param {object} subProcess - the current sub-process form config data
 * @param {object} _WFInstance - the current workflow constructor instance
 *
 * @example ''
 *
 * @return ''
 *
 */
function action(action, subProcess, _WFInstance){
	return new Promise(function(resolve, reject) {
		var args = [];
		var context = 'global';
		var method = '';
		if (action._id !== undefined) {
			context = action._id.split(".")[0];
		}
		if (action._id !== undefined) {
			method = action._id.split(".")[1];
		}
		for (var i = 0; i < action._args.length; i++) {
			var arg = action._args[i];
			switch(arg) {
				case 'subProcess.indicators':
					// Add the required parameters to the args array
					args.push(subProcess.indicators);
					args.push(_WFInstance);
					break;
				default:
					args = [];
			}
		}
		if (context === 'form') {
			form[method](args).then(function(result){
				resolve(result.data);
			}, function(err){
				reject(err);
			});
		} else {
			var error = util.error('WFActionError', 'Module: ' + context + ' not defined.');
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
			var subProcess = [];
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
			var transition = currentStep[0].transitions.filter(function(objTransition){
				if (objTransition._id === transitionId) {
					return objTransition;
				}
			});
			console.log(transition);
			// if (currentStep[0].actions[0] !== undefined) {
			// 	transition = currentStep[0].actions[0].transitions.filter(function(objTransition){
			// 		if (objTransition._id === transitionId) {
			// 			return objTransition;
			// 		}
			// 	});
			// } else {
			// 	transition = currentStep[0].task.transitions.filter(function(objTransition){
			// 		if (objTransition._id === transitionId) {
			// 			return objTransition;
			// 		}
			// 	});
			// }
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
			workflow.instance.processes.filter(function(objProcess){
				if (objProcess.id === processId) {
					console.log(objProcess);
					objProcess.subProcesses.filter(function(objSubProcess){
						console.log(objProcess);
						if (objSubProcess.id === subProcessId) {
							subProcess = objSubProcess;
						}
					})
				}
			});
			switch(transition[0]._type) {
				case 'auto':
					if (transition[0].goTo._type === 'nextStep') {
						step(processId, subProcessId, nextStepId, stepSeq, data, workflow).then(function(result){
							var success = util.success('Step transition completed successfully.', result.data);
							resolve(success);
						}, function(err){
							reject(err);
						});
					} else {
						if (transition[0]._stop === true) {
							var success = util.success('All Step transitions have completed successfully.');
							resolve(success);
						}
					}
					break;
				case 'user':
					if (transition[0].goTo._type === 'nextStep') {
						step(processId, subProcessId, nextStepId, stepSeq, data, workflow).then(function(result){
							console.log(result.data);
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
						step(processId, subProcessId, goToStepId, goToStepSeq, data, workflow).then(function(result){
							var success = util.success('Step transition completed successfully.', result.data);
							resolve(success);
						}, function(err){
							reject(err);
						});
					} else {
						if (transition[0]._stop === true) {
							var success = util.success('All Step transitions have completed successfully.');
							resolve(success);
						}
					}
					break;
				default:
					if (transition[0]._stop === true) {
						var success = util.success('All Step transitions have completed successfully.');
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
