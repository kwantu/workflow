'use strict';

var util = require('utility');
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
  * Count an array of items
  *
  * @param {Array} arr - the array data
  *
  * @example ''
  *
  * @return ''
  *
  */
 function count(arr){
   if (arr !== undefined) {
    return arr.length;
  } else {
    return 0;
  }

 };

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
function preRequisites(prerequisites, _WFInstance) {
	return new Promise(function(resolve, reject) {
		// Uncomment below section when ready to implement
		var completed = [];
		try {
			util.syncLoop(prerequisites.length, function(loop){
				var counter = loop.iteration();
				preRequisite(prerequisites[counter], _WFInstance).then(function(data){
					// Check if all pre-requisites completed successfully.
					completed.push(true);
					loop.next();
				}, function(err){
					completed.push(false);
					loop.break();
					reject(err);
				});
			}, function(){
				if (completed.every(Boolean)) {
					var success = util.success('Pre-requisites completed successfully.', {});
					resolve(success);
				} else {
					var error = util.error('WFPreRequisiteError', 'Not all pre-requisites passed.');
					reject(error);
				}
			});
		} catch (err) {
			reject(err);
		}
	});
};

/**
 * Process pre-requisite, execute the pre-requisite condition.
 *
 * @param {object} prerequisite - the pre-requisite config data
 * @param {object} _WFInstance - the workflow constructor instance
 *
 * @example
 * Process.preRequisite(config, counter, instance, doc);
 *
 * @return ''
 *
 */
function preRequisite(prerequisite, _WFInstance){
	return new Promise(function(resolve, reject) {
		switch(prerequisite._type) {
			// TODO: Add the call to the relevant methods based on the _type attribute. Should call the generic action() method.
			case 'processInstances':
				try {

					var id = prerequisite._parameter;
					var _filter = prerequisite._filter;
					var subjectCount='';
					if(_filter != undefined){
						var _filterOperator = _filter._operator;
						var xpathOperator = '';
						switch (_filterOperator) {
							case 'greaterThan':
								xpathOperator = 'gt';
								break;
							case 'lessThan':
								xpathOperator = 'lt';
								break;
							case 'greaterThanEqual':
								xpathOperator = 'ge';
								break;
							case 'lessThanEqual':
								xpathOperator = 'le';
								break;
							case 'equalTo':
								xpathOperator = 'eq';
								break;
							case 'notEqualTo':
								xpathOperator = 'ne';
								break;
						}
						var _filterElement = _filter._element;
						var _filterElement = _filterElement.split('.').join('/');
						var _filterValue = _filter._value;
						var innerXpath = "/"+_filterElement+"[. eq '"+ _filterValue+"']";
						var fullPath = "count(/subprocesses[id eq '"+id+"']"+innerXpath+")";
						subjectCount = JSON.xpath(fullPath, _WFInstance,{})[0];

					} else {
						subjectCount = JSON.xpath("count(/subprocesses[id eq '"+id+"'])",_WFInstance,{})[0];	
					}
					var compare = util.compare(subjectCount, prerequisite._operator, parseInt(prerequisite._value));
					if (compare) {
						var success = util.success('Pre-requisites passed.', {});
						resolve(success);
					} else {
						var message = '';
						prerequisite.message.i18n.filter(function(item){
							if (item._lang == 'en') {
								message = item.value;
								var error = util.error('WFPreRequisiteError', message);
								reject(error);
							}
						});
					}
				} catch(err) {
					reject(err);
				}
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
 * @param {object} _WFInstance - the current workflow constructor instance
 *
 * @example ''
 *
 * @return ''
 *
 */
function preActions(preActions, _WFInstance){
	return new Promise(function(resolve, reject) {
		var completed = [];
		try {
			util.syncLoop(preActions.length, function(loop){
				var counter = loop.iteration();
				action(preActions[counter], _WFInstance).then(function(data){
					// Check if all pre-requisites completed successfully.
					completed.push(true);
					loop.next();
				}, function(err){
					completed.push(false);
					loop.break();
					reject(err);
				});
			}, function(){
				if (completed.every(Boolean)) {
					var success = util.success('Pre-actions completed successfully.', {});
					resolve(success);
				} else {
					var error = util.error('WFPreRequisiteError', 'Not all pre-actions passed.');
					reject(error);
				}
			});
		} catch (err) {
			reject(err);
		}
	});
};

/**
 * Workflow get sub-process data.
 *
 * @param {string} id - the subProcess config id
 * @param {object} _WFInstance - the current workflow constructor instance
 *
 * @example ""
 *
 * @return ""
 *
 */
function getSubProcess(id, _WFInstance){
	if (_WFInstance.subprocesses == undefined) {
		return [];
	} else {
		_WFInstance.subprocesses.filter(function(subProcess){
			if (subProcess.id == id) {
				return subProcess;
			}
		});
	}

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
function subProcess(processId, processSeq, subProcessId, subProcessSeq, data, _WFInstance){
	// Get the current process subProcess instance
	// var subProcessSeq = 1;
	var subProcess = [];
	var processConf = [];
	var subProcessConf = [];
	console.log('data====');
	console.log(data);
	_WFInstance.instance.processes.filter(function(objProcess){
		if (objProcess.id == processId && objProcess.seq == processSeq) {
			var spLength = objProcess.subProcesses.length;
			objProcess.subProcesses.filter(function(objSubProcess){
				if (objSubProcess.id == subProcessId && objSubProcess.seq == subProcessSeq) {
					var uuid = objSubProcess.uuid;
					_WFInstance.subprocesses.filter(function(subProcessItem){
						if (subProcessItem._id == uuid) {
							subProcess = subProcessItem;
						}
					})
				}
			})
		}
	})
	// Get the current subProcess configuration
	_WFInstance.config.processes.filter(function(processConfig){
		if (processConfig._id == processId) {
			processConf = processConfig;
			processConfig.subProcesses.filter(function(subProcessConfig){
				if (subProcessConfig._id == subProcessId) {
					subProcessConf = subProcessConfig;
				}
			})
		}
	})
	// if (subProcess.length !== 0) {
	// 	subProcessSeq = subProcess.length + 1;
	// }
	// The default subProcess model
	var subProcessObjectId = _WFInstance.profile + ':' + _WFInstance.app + ':' + processId + ':' + processSeq + ':' + subProcessId + ':' + subProcessSeq;
	var model = {
		_id: subProcessObjectId,
		id: subProcessId,
		type: 'workflowInstanceSubProcess',
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
		step: {},
		channels:[
	    	"community_"+app.SCOPE.communityId ,
	    	"profile_"+ app.SCOPE.profileId ,
	    	"application_"+app.SCOPE.applicationId,
	    	"community_"+ app.SCOPE.communityId+"_application_"+app.SCOPE.applicationId
	    ]
	};
	_WFInstance.subprocesses.push(model);
	// Return a promise
	return new Promise(function(resolve, reject) {
		// Catch all uncaught errors
		try {
			// 1. Process the pre-actions
			var preActionsConf = processConf.preActions;
			preActions(preActionsConf, _WFInstance).then(function(result){
				// 2. Process the pre-requisites
				var prerequisiteConf = processConf.prerequisites;
				preRequisites(prerequisiteConf, _WFInstance).then(function(result){
					// 3. Initiate the subProcess
					var initiateConf = subProcessConf.initiate;
					initiate(initiateConf, subProcess, data).then(function(result){
						//Update the subProcess model
						model.initiated = result.data.initiated;
						console.log('result.data.dates');
						console.log(result.data.dates);
						model.dates = result.data.dates;
						// Execute the first step
						var stepId = subProcessConf.steps[0]._id;
						var transitionId = subProcessConf.steps[0].transitions[0]._id;
						var stepSeq = 1;
						step(processId, processSeq, subProcessId, subProcessSeq, stepId, stepSeq, data, _WFInstance)
						.then(function(result){
							model.step = result.data;
							// Update the indicator sections of the subProcess

							indicators(subProcessConf.indicators, _WFInstance, model._id).then(function(result){
								
								model.indicators = result.data;
								// Execute the transitions, if auto
								transition(processId, processSeq, subProcessId, subProcessSeq, stepId, transitionId, data, _WFInstance).then(function(result){
									// Update the subProcess step data
									var transResult = result;
									model.step = result.data;
									// 4. Process the post-actions
									var postActionsConf = processConf.postActions;
									postActions(postActionsConf, _WFInstance).then(function(result){
										var success = util.success(transResult.message, model);
					          resolve(success);
									}, function(err){
										reject(err);
									})
				        }, function(err){
				          reject(err);
				        });
							}, function(err){
								reject(err);
							})
						}, function(err){
							reject(err);
						})
					}, function(err){
						_WFInstance.subprocesses = _WFInstance.subprocesses.filter(function( obj ) {
							return !(obj._id == subProcessObjectId);
						});
						reject(err);
					})
				}, function(err){
					_WFInstance.subprocesses = _WFInstance.subprocesses.filter(function( obj ) {
						return !(obj._id == subProcessObjectId);
					});
					reject(err);
				})
			}, function(err){
				_WFInstance.subprocesses = _WFInstance.subprocesses.filter(function( obj ) {
						return !(obj._id == subProcessObjectId);
				});
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
function initiate(initiate, subProcess, data){
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
		var init = function(){
			switch(initiate._type) {
				case 'user':
					// If the subProcess initiation is user defined then
					result.dates.created = data.createdDate;
					if (initiate.dates.valid._type == 'userSelected' || initiate.dates.valid._type == 'autoSelected') {
						if (data.validDate !== undefined) {
							result.dates.valid = data.validDate;
						} else {
							util.warn('WFInitiateError', 'No valid date passed in - {data.validDate}');
						}
					}
					if (initiate.dates.due._type == 'userSelected' || initiate.dates.valid._type == 'autoSelected') {
						if (data.dueDate !== undefined) {
							result.dates.due = data.dueDate;
						} else {
							util.warn('WFInitiateError', 'No due date passed in - {data.dueDate}');
						}
					}
					result.initiated = true;
					var success = util.success('Sub-Process initiate completed successfully.', result);
					resolve(success);
					break;
				case 'auto':
				// If the subProcess initiation is user defined then
				result.dates.created = data.createdDate;
				if (initiate.dates.valid._type == 'userSelected' || initiate.dates.valid._type == 'autoSelected') {
					if (data.validDate !== undefined) {
						result.dates.valid = data.validDate;
					} else {
						util.warn('WFInitiateError', 'No valid date passed in - {data.validDate}');
					}
				}
				if (initiate.dates.due._type == 'userSelected' || initiate.dates.due._type == 'autoSelected') {
					if (data.dueDate !== undefined) {
						result.dates.due = data.dueDate;
					} else {
						util.warn('WFInitiateError', 'No due date passed in - {data.dueDate}');
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
		}
		if (subProcess.complete == undefined) {
			init();
		} else if (!subProcess.complete) {
			if (initiate.parallelInstances) {
				init();
			} else {
				var error = util.error('WFInitiateError', 'Sub-process: ' + subProcess.id + ' still active and parallel instances are not allowed.');
				reject(error);
			}
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
 * @param {object} data - the user input data
 * @param {object} _WFInstance - the current _WFInstance constructor instance
 *
 * @example ''
 *
 * @return ''
 *
 */
function step(processId, processSeq, subProcessId, subProcessSeq, stepId, stepSeq, data, _WFInstance){


	// Default step model
	var model = {
		id: '',
		seq: '',
		status: '',
		message: '',
		assignedTo: {
			userId: '',
			name: ''
		},
		comment: ''
	};
	var subProcess = {};
	var uuid = '';
	var instSubProcess;
	var step = {};
	var transitionId = '';
	return new Promise(function(resolve, reject) {
		try {
			//Get the current subProcess instance data

		
			
			_WFInstance.instance.processes.filter(function(objProcess){

				
				if (objProcess.id == processId && objProcess.seq == processSeq) {
					objProcess.subProcesses.filter(function(objSubProcess){
				
						if (objSubProcess.id == subProcessId && objSubProcess.seq == subProcessSeq) {
							uuid = objSubProcess.uuid;
				
						}
					})
				}
			})
			_WFInstance.subprocesses.filter(function(subProcessItem){
				if (subProcessItem._id == uuid) {
					instSubProcess = subProcessItem;
				}
			})
			_WFInstance.config.processes.filter(function(objProcess){
				if (objProcess._id == processId) {
					objProcess.subProcesses.filter(function(objSubProcess){
						if (objSubProcess._id == subProcessId) {
							subProcess = objSubProcess;
							objSubProcess.steps.filter(function(objStep){
								if (objStep._id == stepId) {
									step = objStep;
								}
							})
						}
					})
				}
			});
			// Update the sub-process step data
			model.id = stepId;
			model.seq = stepSeq;
			model.status = step._setInstanceStatusTo;
			model.message = step._setStatusMsgTo;
			//model.assignedTo.userId = data.userId !== undefined ? data.userId : '';
			//model.assignedTo.name = data.name !== undefined ? data.name : '';
			model.comment = data.comment !== undefined ? data.comment : '';
			// Update the indicator documents process step data
			//comso.log('instSubProcess===');
			//comso.log(instSubProcess);
			var indicators = instSubProcess !== undefined ? instSubProcess.indicators : [];
			indicatorDocs(processId, indicators, model, _WFInstance).then(function(result){
				// If actions are specified, execute them
				var createdID = _WFInstance.profile + ':' + _WFInstance.app + ':' + processId + ':' + processSeq + ':' + subProcessId + ':' + subProcessSeq;
				uuid = createdID;

				if (step.actions[0] !== undefined) {
					actions(step.actions, processId, processSeq, subProcessId, subProcessSeq, subProcess, model, _WFInstance, data, uuid)
					.then(function(result){
						// Execute the transitions, if auto
						
						var success = util.success('Actions completed successfully.', model);
						
						resolve(success);
					}, function(err){
						reject(err);
					})
				// Else tasks are sprecified, execute them
				} else if (step.task !== undefined) {
					// Make assignments
					task(step.task, createdID).then(function(result){
						// do task success handling
						console.log('task done.........');
					},function(err){
						reject(err);
					});

					var success = util.success('Task awaiting user action.', model);
					resolve(success);
				}
			}, function(err){
				reject(err);
			})
		} catch(err) {
    	reject(err);
    }
	});
};

/**
 * Process indicator updates
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
function indicators(indicators, _WFInstance, spuuid){
	var model = [];
	return new Promise(function(resolve, reject) {
		try {
			// Update the indicator sections of the subProcess
				
				var array = JSON.xpath("indicators[fn:count(./workflows/processes[subProcessUUID eq '"+ spuuid +"']) gt 0]",_WFInstance, {});
				for (var j = 0; j < array.length; j++) {
					var indicator = array[j];
					var indicatorModel = {
						id: '',
						instances: []
					}
					var instanceModel = {
						uuid: '',
						title: '',
						key: '',
						seq: 1
					}
					indicatorModel.id = indicator.category.term;
					instanceModel.uuid = indicator._id;
					instanceModel.title = indicator.title;
					instanceModel.key = '';
					instanceModel.seq = indicator.model.pending.seq; // indicator seq number here which is getting updated.
					indicatorModel.instances.push(instanceModel);
					model.push(indicatorModel);
				}
			
			
			var success = util.success('Process indicator model updated.', model);
			resolve(success);
		} catch(err) {
			reject(err);
		}
	})
};

/**
 * Process assign user
 *
 * @param {string} processId - the Workflow config / definition process id
 * @param {number} processSeq - the Workflow instance process seq
 * @param {string} subProcessId - the Workflow config / definition sub-process id
 * @param {number} subProcessSeq - the Workflow instance sub-process seq
 * @param {string} stepId - the Workflow config / definition step id
 * @param {string} transitionId - the Workflow config / definition transition id
 * @param {object} user - the user to assign to
 * @param {object} _WFInstance - the current workflow constructor instance
 *
 * @example ''
 *
 * @return ''
 *
 */
function assignUser(processId, processSeq, subProcessId, subProcessSeq, user, _WFInstance){
	return new Promise(function(resolve, reject) {
		try {
			var uuid = '';
			// Get the current subProcess instance data
			_WFInstance.instance.processes.filter(function(objProcess){
				if (objProcess.id == processId && objProcess.seq == processSeq) {
					objProcess.subProcesses.filter(function(objSubProcess){
						if (objSubProcess.id == subProcessId && objSubProcess.seq == subProcessSeq) {
							uuid = objSubProcess.uuid;
						}
					})
				}
			})
			_WFInstance.subprocesses.filter(function(subProcessItem){
				if (subProcessItem._id == uuid) {
					// Set the user details
					subProcessItem.step.assignedTo.userId = user.id;
					subProcessItem.step.assignedTo.name = user.name;
					// Update the indicators user details
					var indicators = subProcessItem.indicators;
					for (var i = 0; i < indicators.length; i++) {
						var indicator = indicators[i];
						for (var j = 0; j < indicator.instances.length; j++) {
							var instance = indicator.instances[j];
							for (var k = 0; k < _WFInstance.indicators.length; k++) {
								var doc = _WFInstance.indicators[k];
								if (instance.uuid == doc._id) {
									doc.workflows.filter(function(workflow){
										if (workflow.id == _WFInstance.config._id) {
											workflow.processes.filter(function(processItem){
												if (processItem.id == processId) {
													// Update the user id and name in the document
													processItem.step.assignedTo.userId = user.id;
													processItem.step.assignedTo.name = user.name;
												}
											})
										}
									})
								}
							}
						}
					}
					var success = util.success('User assigned successfully. UserId: "' + user.id + '", Name: "' + user.name + '"', subProcessItem);
					resolve(success);
				}
			})
		} catch(err){
			reject(err);
		}
	});
};
/**
 * Process indicator document updates
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
function indicatorDocs(processId, indicators, step, _WFInstance){
	return new Promise(function(resolve, reject) {
		try {
			//comso.log(' indicatorDocs function --------------');
			//comso.log('processId');
			//comso.log(processId);
			//comso.log('indicators');
			//comso.log(indicators);
			//comso.log('step');
			//comso.log(step);
			//comso.log('_WFInstance');
			//comso.log(_WFInstance);

			// Update the indicator sections of the subProcess
			if (indicators == undefined){
				var error = util.error('WFIndicatorsUpdate', 'Indicators parameter is required. - Value: ' + indicators)
				reject(err);
			} else {
				for (var i = 0; i < indicators.length; i++) {
					//comso.log('-->>>>>> First If consition');
					var indicator = indicators[i];
					for (var j = 0; j < indicator.instances.length; j++) {
						//comso.log('-->>>>>> Second If consition');
						var instance = indicator.instances[j];
						for (var k = 0; k < _WFInstance.indicators.length; k++) {
							//comso.log('-->>>>>> Third If consition');
							var doc = _WFInstance.indicators[k];
							if (instance.uuid == doc._id) {
								//comso.log('-->>>>>> Fourth If consition');
								doc.workflows.filter(function(workflow){
									if (workflow.id == _WFInstance.config._id) {
										//comso.log('-->>>>>> Fifth If consition');

										

										workflow.processes.filter(function(processItem){

											console.log('processItem.id==='+ processItem.id);
											console.log('processId===='+processId);


											if (processItem.id == processId) {
												console.log('-->>>>>> Sixth If consition');
												processItem.step.id = step.id;
												processItem.step.seq = step.seq;
												processItem.step.status = step.status;
												processItem.step.message = step.message;
												processItem.step.assignedTo.userId = step.assignedTo.userId;
												processItem.step.assignedTo.name = step.assignedTo.name;
												processItem.step.comment = step.comment !== undefined ? step.comment : '';
											}
										})
									}
								})
							}
						}
					}
				}
				var success = util.success('Indicator documents workflow process model updated.', _WFInstance);
				//comso.log('indicatorDocs function ENDS--------------');
				resolve(success);
			}
		} catch(err) {
			reject(err);
		}
	})
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
function actions(actions, processId, processSeq, subProcessId, subProcessSeq, subProcess, step, _WFInstance, data, uuid){
	var arrActions = [];
	return new Promise(function(resolve, reject) {
		util.syncLoop(actions.length, function(loop){
			var counter = loop.iteration();
			action(actions[counter], processId, processSeq, subProcessId, subProcessSeq, subProcess, step, _WFInstance, data, uuid)
			.then(function(result){
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
function action(action, processId, processSeq, subProcessId, subProcessSeq, subProcess, step, _WFInstance, data, uuid){
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
		args.length = 0;
		for (var i = 0; i < action._args.length; i++) {
			var arg = action._args[i];
			switch(arg) {
				case 'processId':
					args.push(processId);
					break;
				case 'processSeq':
					args.push(processSeq);
					break;
				case 'subProcessId':
					args.push(subProcessId);
					break;
				case 'subProcessSeq':
					args.push(subProcessSeq);
					break;
				case 'subProcess':
					args.push(subProcess);
					break;
				case 'step':
					args.push(step);
					break;
				case 'action':
					args.push(action);
					break;
				// Add the required parameters to the args array

				default:
					args = [];
			}
		}
		args.push(_WFInstance);
		args.push(data.createType);
		args.push(uuid);
		args.push(data.baseUUID);
		
		if (action._id == 'form.create') {
			form.create(args).then(function(result){
				
				resolve(result.data);
			}, function(err){
				reject(err);
			});
		} else if (action._id == 'form.authorise') {
			form.authorise(args).then(function(result){
				resolve(result.data);
			}, function(err){
				reject(err);
			});
		} else if (action._id == 'form.close') {
			form.close(args).then(function(result){
				resolve(result.data);
			}, function(err){
				reject(err);
			});
		} else {
			var error = util.error('WFActionError', 'Method: ' + action_id + ' not defined.');
			reject(error);
		}
		// if (context == 'form') {
		// 	form[method](args).then(function(result){
		// 		resolve(result.data);
		// 	}, function(err){
		// 		reject(err);
		// 	});
		// } else {
		// 	var error = util.error('WFActionError', 'Module: ' + context + ' not defined.');
		// 	reject(error);
		// }
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
function task(task, spuuid){


	return new Promise(function(resolve, reject) {


		var list = [];

		if(task.assign.profileRole != undefined){
			
			var assignType = 'profileRole';
			var profileId = '';
			if(task.assign.profileRole.profile =='current'){
				profileId = app.SCOPE.profileId;
			} // else condition to come here

			var role = task.assign.profileRole.role;

			var channels = JSON.xpath("/subprocesses[_id eq '"+ spuuid +"']/channels",app.SCOPE.workflow,{});

			var finalMsg = processWorkflowMessage(NOTIFICATION_USER_MSG_ACCEPT, spuuid)
			
			var notficationRequest = { 		  
			  "source":"remote",
	          "type": "notificationRequest",
			  "_id": spuuid+":notificationRequest",
	          "channels": channels, 
	          "message": finalMsg,
	          "messageType": "info",
	          "createdDateTime": moment().format(),
	          "senderUserId":LOCAL_SETTINGS.SUBSCRIPTIONS.userId,
			  "receiver": {
					"value":[
						{
							"type":"role",
							"name":role,
							"profileId":profileId
						}
					]
				}
			}

			dao.upsert(notficationRequest).done(function(data){
				console.log(data);
			}).fail(function(err){
				console.log(err);
			});
			resolve('Notifications request submitted.');

		} else if(task.assign.swimlane!= undefined){
			resolve('swimlane');
			console.log('Swimlane implementation !!');
		}

	});

	
};

/**
 * Process transition
 *
 * @param {string} processId - the Workflow config / definition process id
 * @param {number} processSeq - the Workflow instance process seq
 * @param {string} subProcessId - the Workflow config / definition sub-process id
 * @param {number} subProcessSeq - the Workflow instance sub-process seq
 * @param {string} stepId - the Workflow config / definition step id
 * @param {string} transitionId - the Workflow config / definition transition id
 * @param {object} data - any additional data passed in as key value pairs
 * @param {object} _WFInstance - the current workflow constructor instance
 *
 * @example ''
 *
 * @return ''
 *
 */
function transition(processId, processSeq, subProcessId, subProcessSeq, stepId, transitionId, data, _WFInstance){
	return new Promise(function(resolve, reject) {
		try {
			var stepSeq = 0;
			var nextStepId = '';
			var nextStepSeq = 0;
			var subProcess = [];
			var currentProcess = _WFInstance.config.processes.filter(function(objProcess){
				if (objProcess._id == processId) {
					return objProcess;
				}
			});
			var currentSubProcess = currentProcess[0].subProcesses.filter(function(objSubProcess){
				if (objSubProcess._id == subProcessId) {
					return objSubProcess;
				}
			});
			var currentStep = currentSubProcess[0].steps.filter(function(objStep){
				if (objStep._id == stepId) {
					return objStep;
				}
			});
			var transition = currentStep[0].transitions.filter(function(objTransition){
				if (objTransition._id == transitionId) {
					return objTransition;
				}
			});
			for (var i = 0; i < currentSubProcess[0].steps.length; i++){
				if (currentSubProcess[0].steps[i]._id == stepId) {
					stepSeq = parseInt(currentSubProcess[0].steps[i]._seq);
				}
			}
			currentSubProcess[0].steps.filter(function(stepItem){
				nextStepSeq = stepSeq + 1;
				if (parseInt(stepItem._seq) == nextStepSeq) {
					nextStepId = stepItem._id;
				}
			})
			_WFInstance.instance.processes.filter(function(objProcess){
				if (objProcess.id == processId && objProcess.seq == processSeq) {
					objProcess.subProcesses.filter(function(objSubProcess){
						if (objSubProcess.id == subProcessId && objSubProcess.seq == subProcessSeq) {
							var uuid = objSubProcess.uuid;
							// subProcess = objSubProcess;
							_WFInstance.subprocesses.filter(function(subProcessItem){
								if (subProcessItem._id == uuid) {
									subProcess = subProcessItem;
								}
							})
						}
					})
				}
			});
			var maxSteps = currentSubProcess[0].steps.length;
			switch(transition[0]._type) {
				case 'auto':
					if (transition[0].goTo._type == 'nextStep') {
						step(processId, processSeq, subProcessId, subProcessSeq, nextStepId, nextStepSeq, data, _WFInstance).then(function(result){
							if (nextStepSeq == maxSteps) {
								var success = util.success('All Step transitions have completed successfully.', { subProcessComplete: true, step: result.data });
								resolve(success);
							} else {
								var success = util.success('Step transition completed successfully.', result.data);
								resolve(success);
							}
							var success = util.success('Step transition completed successfully.', result.data);
							resolve(success);
						}, function(err){
							reject(err);
						});
					}
					break;
				case 'user':
					if (transition[0].goTo._type == 'nextStep') {
						step(processId, processSeq, subProcessId, subProcessSeq, nextStepId, nextStepSeq, data, _WFInstance).then(function(result){
							if (nextStepSeq == maxSteps) {
								var success = util.success('All Step transitions have completed successfully.', { subProcessComplete: true, step: result.data });
								resolve(success);
							} else {
								var success = util.success('Step transition completed successfully.', result.data);
								resolve(success);
							}
							var success = util.success('Step transition completed successfully.', result.data);
							resolve(success);
						}, function(err){
							reject(err);
						});
					} else if (transition[0].goTo._type == 'stepId') {
						var goToStepId = transition[0].goTo._stepId;
						var goToStepSeq = 1;
						currentSubProcess[0].steps.filter(function(stepItem){
							if (stepItem._id == goToStepId) {
								goToStepSeq = parseInt(stepItem._seq);
							}
						})
						step(processId, processSeq, subProcessId, subProcessSeq, goToStepId, goToStepSeq, data, _WFInstance).then(function(result){
							if (goToStepSeq == maxSteps) {
								var success = util.success('All Step transitions have completed successfully.', { subProcessComplete: true, step: result.data });
								resolve(success);
							} else {
								var success = util.success('Step transition completed successfully.', result.data);
								resolve(success);
							}
							var success = util.success('Step transition completed successfully.', result.data);
							resolve(success);
						}, function(err){
							reject(err);
						});
					}
					break;
				default:
					var error = util.error('WFTransitionError','Transition type: ' + transition[0]._type + ' not defined.');
					reject(error);
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
function postActions(postActions, _WFInstance){
	return new Promise(function(resolve, reject) {
		var completed = [];
		try {
			util.syncLoop(postActions.length, function(loop){
				var counter = loop.iteration();
				action(postActions[counter], _WFInstance).then(function(data){
					// Check if all pre-requisites completed successfully.
					completed.push(true);
					loop.next();
				}, function(err){
					completed.push(false);
					loop.break();
					reject(err);
				});
			}, function(){
				if (completed.every(Boolean)) {
					var success = util.success('Post-actions completed successfully.', {});
					resolve(success);
				} else {
					var error = util.error('WFPreActionsError', 'Not all post-actions passed.');
					reject(error);
				}
			});
		} catch (err) {
			reject(err);
		}
	});
};



/*
function sendNotifications(usersList, spuuid){

  // get users list 
  // sen notifications to users y adding channels to them
 
  var channelArray = [];

  for(i=0;i<usersList.length; i++){
    channelArray.push("user_"+usersList[i].id);
  }

  
  assignToUsers(processWorkflowMessage(NOTIFICATION_USER_MSG_ACCEPT, spuuid), channelArray);



};*/

/*function assignToUsers(message, channelArray){

     var channels = channelArray;
     
     var notification =  { 
          "_id": generateUUID(),
          "channels":channels,
          "message": message,
          "messageType": "info",
          "createdDateTime": moment().format(),
          "read": false,
          "readDateTime": "",
          "type": "notification",
          "senderUserId": LOCAL_SETTINGS.SUBSCRIPTIONS.userId
       };
       console.log(notification);
       dao.upsert(notification);

  };*/

function processWorkflowMessage(message, spuuid){ 

    var replacedMsg = message;

    if(replacedMsg.indexOf('#INSTANCE_LABEL') !== -1){
        var val = JSON.xpath("/instance/processes/subProcesses[uuid eq '"+ app.processUUID +"']/label",app.SCOPE.workflow,{})[0];
        replacedMsg = replacedMsg.replace('#INSTANCE_LABEL', val);
       
    }

    if(replacedMsg.indexOf('#USER_NAME') !== -1){
        var val = JSON.xpath("/subprocesses[_id eq '"+ app.processUUID+"']/step/assignedTo/name",app.SCOPE.workflow,{})[0];
        replacedMsg = replacedMsg.replace('#USER_NAME', val);

    }

    if(replacedMsg.indexOf('#PROFILE_TITLE') !== -1){
        var val =  app.profile.title;
        replacedMsg = replacedMsg.replace('#PROFILE_TITLE', val);

    }

    if(replacedMsg.indexOf('#PROFILE_TYPE') !== -1){
        var val =  app.SCOPE.APP_CONFIG.name;
        replacedMsg = replacedMsg.replace('#PROFILE_TYPE', val);

    }

    if(replacedMsg.indexOf('#VAR_SPUUID') !== -1){
        var val =  spuuid;
        replacedMsg = replacedMsg.replace('#VAR_SPUUID', val);

    }
   

    return replacedMsg;
  };


module.exports = {

 	preRequisites: preRequisites,
 	preActions: preActions,
 	subProcess: subProcess,
	indicatorDocs: indicatorDocs,
 	task: task,
 	transition: transition,
	assignUser: assignUser

}
