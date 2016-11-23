(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Workflow = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Process = require('./lib/process');
var util = require('utility');
var userInterface = require('./lib/interface');

/*globals */

/**
 * A new Workflow constructor instance contains the reference to the application
 * and associated profile which it requires as the first two parameters. It also
 * requires a workflow configuration, as the third parameter, which is used to
 * descibe the workflow processes. If a workflow instance exists you can pass it
 * in as the fourth parameter which it will then use, else create a new one.
 *
 * @constructor
 *
 * @param {string} profile - The current profile id
 * @param {string} app - The associated application id
 * @param {Object} config - The application workflow configuration / definition
 * @param {Object} [instance] - An existing application profile workflow instance based
 * on the definition
 *
 * @author Brent Gordon
 * @version 0.1.0
 *
 * @example
 * var config = { '_id': 'abc123' };
 * var instance = { '_id': 'instance_abc123' };
 * // If there isn't an existing instance
 * var workflow = new Workflow('1234', '5678', config);
 * // If there is an existing instance
 * var workflow = new Workflow('1234', '5678', config, instance);
 *
 * @return {Object} new Workflow object
 *
 * @throws Error: A profile id is required
 * @throws Error: An app id is required
 * @throws Error: A workflow configuration is required
 *
 */

function Workflow(profile, communityId, app, config){
	var _this = this;
	
	// Community ID validation checks
	if (communityId == '' || communityId == undefined) {
        throw util.error('ParamRequired', 'A community id is required.');
    } else if (typeof(communityId) !== 'string') {
    	throw new Error('The community id must be a javascript string.');
    } else {
    	_this.communityId = communityId || '';
    }

	// Profile ID validation checks
	if (profile == '' || profile == undefined) {
        throw util.error('ParamRequired', 'A profile id is required.');
    } else if (typeof(profile) !== 'string') {
    	throw new Error('The profile id must be a javascript string.');
    } else {
    	_this.profile = profile || '';
    }
    // App ID validation checks
	if (app == '' || app == undefined) {
        throw util.error('ParamRequired', 'An app id is required.');
    } else if (typeof(app) !== 'string') {
    	throw new Error('The app id must be a javascript string.');
    } else {
    	_this.app = app || '';
    }
    // Workflow configuration validation checks
    if (config == '' || config == undefined) {
    	throw util.error('ParamRequired', 'A workflow configuration is required.');
    } else if (typeof(config) !== 'object') {
        _this.config = JSON.parse(config);
    } else {
    	_this.config = config;
    }
	    // Workflow instance validation checks
	    _this.instance;
		// Workflow sub-processes validation checks
		_this.subprocesses = [];
		// Workflow indicators place holder
		_this.indicators = [];
		// Workflow sub-process step history place holder
		_this.history = [];

}

/**
 * Workflow get profile id.
 *
 * @example ""
 *
 * @return ""
 *
 */
Workflow.prototype.getProfile = function(){
	return this.profile;
};

/**
 * Workflow get app id.
 *
 * @example ""
 *
 * @return ""
 *
 */
Workflow.prototype.getApp = function(){
	return this.app;
};

/**
 * Workflow get config.
 *
 * @example ""
 *
 * @return ""
 *
 */
Workflow.prototype.getConfig = function(){
	return this.config;
};

/**
 * Workflow get instance.
 *
 * @example ""
 *
 * @return ""
 *
 */
Workflow.prototype.getInstance = function(){
	return this.instance;
};

/**
 * Workflow set the instance data.
 *
 * @param {Object} data - the workflow process instance data
 *
 * @example ""
 *
 * @return ""
 *
 */
Workflow.prototype.setInstance = function(data){
	this.instance = data;
};

/**
 * Workflow get sub-processes data.
 *
 * @example ""
 *
 * @return ""
 *
 */
Workflow.prototype.getSubProcesses = function(){
	return this.subprocesses;
};

/**
 * Workflow set the sub-processes data.
 *
 * @param {Object} data - the workflow process instance data
 *
 * @example ""
 *
 * @return ""
 *
 */
Workflow.prototype.setSubProcesses = function(data){
	this.subprocesses = data;
};

/**
 * Workflow get indicator set data.
 *
 * @example ""
 *
 * @return ""
 *
 */
Workflow.prototype.getIndicators = function(){
	return this.indicators;
};

/**
 * Workflow set the indicator set data.
 *
 * @param {Object} data - the workflow process instance data
 *
 * @example ""
 *
 * @return ""
 *
 */
Workflow.prototype.setIndicators = function(data){
	this.indicators = data;
};

/**
 * Set the variable value.
 *
 * @param {string} processId - the Workflow config / definition process id
 * @param {number} processSeq - the Workflow instance process seq
 * @param {string} subProcessId - the Workflow config / definition sub-process id
 * @param {number} subProcessSeq - the Workflow instance sub-process seq
 * @param {string} stepId - the Workflow config / definition step id
 * @param {Object} variable - the Workflow variable object
 *
 * @example ''
 *
 * @return ''
 *
 */
// Workflow.prototype.setVariable = function(processId, processSeq, subProcessId, subProcessSeq, stepId, variable){
// 	var _this = this;
// 	return new Promise(function(resolve, reject) {
// 		try {
// 			Process.getVariable(processId, processSeq, subProcessId, subProcessSeq, stepId, variable).then(funcion(result){
// 				resolve(result.data);
// 			}, function(err){
// 				reject(err);
// 			})
// 		} catch (err) {
// 			reject(err);
// 		}
// 	});
// };

/**
 * Get the variable value.
 *
 * @param {string} processId - the Workflow config / definition process id
 * @param {number} processSeq - the Workflow instance process seq
 * @param {string} subProcessId - the Workflow config / definition sub-process id
 * @param {number} subProcessSeq - the Workflow instance sub-process seq
 * @param {string} stepId - the Workflow config / definition step id
 * @param {string} key - the Workflow variable id
 *
 * @example ''
 *
 * @return ''
 *
 */
// Workflow.prototype.getVariable = function(processId, processSeq, subProcessId, subProcessSeq, stepId, key){
// 	var _this = this;
// 	return new Promise(function(resolve, reject) {
// 		try {
// 			Process.setVariable(processId, processSeq, subProcessId, subProcessSeq, stepId, key).then(funcion(result){
// 				resolve(result.data);
// 			}, function(err){
// 				reject(err);
// 			})
// 		} catch (err) {
// 			reject(err);
// 		}
// 	});
// };

/**
 * This method creates a new workflow process i.e. it creates a workflow processes instance
 * object with the minimum required data. This instance can be referenced in the following
 * way, see example below.
 *
 * @example
 * var config = { '_id': 'abc123' };
 * var workflow = new Workflow('1234', '5678', config);
 * workflow.create().then(function(result){
 *	console.log(result.message);
 *	// The following properties can now be accessed
 * 	var profile = workflow.profile;
 * 	var app = workflow.app;
 * 	var config = workflow.config;
 *	// On success you can access the instance the following way
 *	var instance = workflow.instance;
 * }, function(error){
 *	console.log(error);
 * });
 *
 * @return {Object} new Workflow instance with updated instance data.
 *
 */
Workflow.prototype.create = function(){
	var _this = this;
	return new Promise(function(resolve, reject) {
		try {
			if (_this.instance !== undefined) {
				var warn = util.warn('Instance already exists.', _this)
				resolve(warn);
			} else {
				// Create the workflow processes instance object
				var model = {
				    _id: '',
				    version: '',
				    type: 'workflowInstance',
				    processes: [],
				    channels:[
				    	"community_"+app.SCOPE.communityId ,
				    	"profile_"+ app.SCOPE.profileId ,
				    	"application_"+app.SCOPE.applicationId,
				    	"community_"+app.SCOPE.communityId+"_application_"+app.SCOPE.applicationId
				    ]
				};
				model._id = _this.profile + ':processes';
				model.version = _this.config.version;
				_this.instance = model;
				var success = util.success('Workflow processes instance created successfully.', _this);
				resolve(success);

			}
		} catch (err) {
			reject(err);
		}
	});
};

/**
 * Workflow initialise, this function executes a process within a workflow
 * configuration.
 *
 * @param {string} processId - the process id to process
 * @param {object} [data] - the input data to process
 *
 * @example
 * Workflow.initialise('processId', { validDate: 'date' });
 *
 * @return ""
 *
 */
Workflow.prototype.initialise = function(processId, data){
	var _this = this;
	return new Promise(function(resolve, reject) {
		try {
			var configProcess = [];
			// Check the passed in parameters
			if (processId !== '' && processId !== undefined) {
				// Get the current process config
				configProcess = _this.config.processes.filter(function(objProcess){
					if (objProcess._id == processId) {
						return objProcess;
					}
				});
				if (configProcess[0]._id == undefined) {
					var error = util.error('WFConfigError', 'No valid process definition found with process id: ' + processId);
					reject(error);
				}
			} else {
				configProcess.push(_this.config.processes[0]);
				processId = _this.config.processes[0]._id;
			}
			// Get the current list of process instances
			// var processSeq = 1;
			var currentProcess = [];
			_this.instance.processes.filter(function(processItem){
				if (processItem.id == processId) {
					currentProcess.push(processItem);
				}
			});
			var processSeq = currentProcess.length + 1;
			// var nextSeq = processSeq + 1;
			// Push the process object into the array
			var processModel = {
				id: '',
				seq: '',
				subProcesses: [],
			}
			// 1. Update the process id and seq
			processModel.id = processId;
			processModel.seq = processSeq;
			_this.instance.processes.push(processModel);
			// Parameters
			var subProcessId = configProcess[0].subProcesses[0]._id;
			var subProcessSeq = 1;
			_this.instance.processes.filter(function(processItem){
				if (processItem.id == processId && processItem.seq == processSeq) {
					subProcessSeq = processItem.subProcesses.length + 1
				}
			})
			// Call the subprocess method
			
			

			Process.subProcess(processId, processSeq, subProcessId, subProcessSeq, data, _this).then(function(subProcess){
				// Generate the uuid
				

				var uuid = _this.profile + ':' + _this.app + ':' + processId + ':' + processSeq + ':' + subProcessId + ':' + subProcessSeq;
				var label = data.label;
				// Build the sub-process reference object

				//TODO: Change required to move isActive to subProcess file.Remove from here


				var subProcessRef = {
					id: subProcessId,
					seq: subProcessSeq,
					uuid: uuid,
					label:label
				}
				// Add the reference to the process model
				processModel.subProcesses.push(subProcessRef);
				// Add the subProcess model to the subprocesses array
				//_this.subprocesses.push(subProcess.data);
				// _this.instance.processes.push(processModel);
				for (var index = 0; index < _this.instance.processes.length; index++){
					var processItem = _this.instance.processes[index];
					if (processItem.id == processId && processItem.seq == processSeq) {
						// Remove the current process from the array and add the updated processModel
						_this.instance.processes.splice(index, 1, processModel)
					}
				}	
				// Process the indicator documents workflow processes updates
				var indicators = subProcess.data.indicators;
				var step = subProcess.data.step;
				Process.indicatorDocs(processId, indicators, step, _this).then(function(result){
					var success = util.success('Process: ' + _this.config.processes[0]._id + ' initialized successfully.', _this);
					resolve(success);
				}, function(err){
					reject(err);
				})


				




			}, function(err){
				_this.instance.processes = _this.instance.processes.filter(function( obj ) {
					return !(obj.id == processId && obj.seq == processSeq);
				});
				console.log(err);
				reject(err);
			});
		} catch(err) {
			reject(err);
		}
	});
};

/**
 * Workflow transition to the next step. This moves the workflow from the current process,
 * sub-process step to the next one as specified.
 *
 * @param {string} processId - the Workflow config / definition process id
 * @param {number} processSeq - the Workflow instance process seq
 * @param {string} subProcessId - the Workflow config / definition sub-process id
 * @param {number} subProcessSeq - the Workflow instance sub-process seq
 * @param {string} stepId - the Workflow config / definition step id
 * @param {string} transitionId - the Workflow config / definition transition id
 * @param {object} data - any additional data passed in as key value pairs
 *
 * @example
 * Workflow.transition('processId', 1, 'subProcessId', 1, 'stepId', 'transitionId', { key: '', value: '' });
 *
 * @return ""
 *
 */
Workflow.prototype.transition = function(processId, processSeq, subProcessId, subProcessSeq, stepId, transitionId, data){
	// Re-assign this
	var _this = this;
	return new Promise(function(resolve, reject) {
		try {
			Process.transition(processId, processSeq, subProcessId, subProcessSeq, stepId, transitionId, data, _this).then(function(result){

				
				// Update the current sub-process step data
				var update = function(type){
					_this.instance.processes.filter(function(processItem){
						if (processItem.id == processId && processItem.seq == processSeq) {

							
							processItem.subProcesses.filter(function(subProcessItem){
								if (subProcessItem.id == subProcessId && subProcessItem.seq == subProcessSeq) {
									

									_this.subprocesses.filter(function(subProcessObj){
										if (subProcessObj._id == subProcessItem.uuid) {
											
											if (type == 'step') {

												subProcessObj.step = result.data;
												var success = util.success(result.message, subProcessObj);
												

												resolve(success);
											} else if (type == 'stepComplete') {
												subProcessObj.step = result.data.step;
												subProcessObj.complete = true
												var success = util.success(result.message, subProcessObj);
												
												resolve(success);
											}
										}
									})
								}
							})
						}
					})
				}
				if (result.data.subProcessComplete) {
					
					update('stepComplete');
				} else {
					
					update('step');
				}
			}, function(err){
				
				reject(err);
			});
		} catch(err) {
			
			reject(err);
		}
	});
};

/**
 * Workflow assign user.
 *
 * @param {string} processId - the Workflow config / definition process id
 * @param {number} processSeq - the Workflow instance process seq
 * @param {string} subProcessId - the Workflow config / definition sub-process id
 * @param {number} subProcessSeq - the Workflow instance sub-process seq
 * @param {string} stepId - the Workflow config / definition step id
 * @param {object} user - the user id and name data
 *
 * @example ""
 *
 * @return ""
 *
 */
Workflow.prototype.assignUser = function(processId, processSeq, subProcessId, subProcessSeq, user){
	// Re-assign the Workflow constructor instance as _this
	var _this = this;
	return new Promise(function(resolve, reject) {
		try {
			Process.assignUser(processId, processSeq, subProcessId, subProcessSeq, user, _this).then(function(result){
				resolve(result);
			}, function(err){
				reject(err);
			})
		} catch(err) {
			reject(err);
		}
	})
};

/**
 * Workflow task, this method executes a specific task.
 *
 * @param {string} processId - the process id to process
 * @param {object} inputData - the input data to process
 *
 * @example
 * Workflow.initialize('processId', { validDate: 'date' });
 *
 * @return ""
 *
 */
Workflow.prototype.ui = function(){
	// Re-assign the Workflow constructor instance as _this
	var _this = this;
	return {
		getProcess: function(processId, lang){
			return new Promise(function(resolve, reject) {
				try {
					userInterface.getProcess(processId, lang, _this).then(function(model){
						resolve(model);
					}, function(err){
						reject(err);
					})
				} catch(err) {
					reject(err);
				}
			})
		}
	}
};




module.exports = Workflow;

},{"./lib/interface":4,"./lib/process":5,"utility":6}],2:[function(require,module,exports){
'use strict';

var util = require('utility');
/**
 * Actions Module
 *
 * @module lib/actions
 * @author Hasan Abbas
 * @version 2.0.0
 * @description test description
 * @copyright Kwantu Ltd RSA 2009-2015.
 *
 */


var community = (function() {


    return {

        createCommunity: function(param1) {

            return new Promise(function(resolve, reject) {
                resolve(param1);
            });

        },
        setVariable: function(param1) {

            return new Promise(function(resolve, reject) {

            });

        },
        userJoinCommunity: function(param1) {

            return new Promise(function(resolve, reject) {

            });

        }



    }

})();

module.exports = {

    community: community

}
},{"utility":6}],3:[function(require,module,exports){
'use strict';

//var gatekeeper = require('../bower_components/gatekeeper');
var util = require('utility');

// var uuid = require('node-uuid');

var gatekeeper = new GK();

/**
 * Form Module
 *
 * @module lib/form
 * @author Brent Gordon
 * @version 2.0.0
 * @description test description
 * @copyright Kwantu Ltd RSA 2009-2015.
 *
 */

function create(args) {

    var processId = args[0] || '';

    var subProcess = args[1] || {};

    var step = args[2] || {};

    var action = args[3] || {};

    var _WFInstance = args[6] || {};

    var data = args[6] || {};

    var indicators = subProcess.indicators || [];

    var result = [];

    var indicatorType = action._type;

    var processSeq = args[4] || '';

    var subProcessSeq = args[5] || '';

    var createType = args[7] || '';

    var subProcessId = subProcess._id;

    var uuid = args[8] || '';

    var baseUUID = args[9] || '';

    var profile = _WFInstance.profile;



    var inputData = args[10] || {};

    return new Promise(function(resolve, reject) {
        var toProcess = indicators.length;

        var formCreateFn = function(id, indicatorType, indicatorId, validDate, instantiateSource) {

            gatekeeper.instantiate(id, indicatorType, indicatorId, _WFInstance.profile, validDate).then(function(docArray) {
                // Update the indicator workflow processes section

                for (var i = 0; i < docArray.length; i++) {
                    var object = docArray[i];
                    if (!object.model._id.endsWith(':approved') && !object.model._id.endsWith(':rejected')) {

                        var workflowObj = {
                            "id": _WFInstance.config._id,
                            "instance": _WFInstance.instance._id,
                            "processes": [{
                                "id": processId,
                                "subProcessId": subProcess._id,
                                "subProcessUUID": uuid,
                                "step": {
                                    "id": step.id,
                                    "seq": step.seq,
                                    "startDate": "",
                                    "status": step.status,
                                    "message": step.message,
                                    "assignedTo": {
                                        "userId": step.assignedTo.userId,
                                        "name": step.assignedTo.name
                                    },
                                    "comment": step.comment,
                                    "complete": false,
                                    "endDate": ""
                                }
                            }]
                        }

                        if (action.setWorkflowLabelInTitle != undefined && action.setWorkflowLabelInTitle != '' && action.setWorkflowLabelInTitle == true) {
                            object.model.title = inputData.label;
                        }

                        if (action.setDraft != undefined && action.setDraft != '' && action.setDraft == true) {
                            object.model.control.draft = true;
                        }





                        object.model.workflows.push(workflowObj);
                        var mainId = object.model._id;
                        // persist via gk so that it is save in couch
                        gatekeeper.persist(docArray).then(function(savedArray) {
                            //using same id call initialiseData
                            //call code to set to setInstance
                            dao.get(mainId).done(function(data) {


                                var indicatorModel = ko.mapping.fromJS({
                                    "defaultModel": {
                                        "setId": indicatorId
                                    }
                                });

                                gatekeeper.instantiateData(mainId, instantiateSource, indicatorModel, data.model.pending.seq).then(function(data) {

                                    if (data[0].status == "200") {


                                        if (action.setWorkflowLabelInField != undefined && action.setWorkflowLabelInField != '' && mainId == profile) {
                                            console.log(data[0]);
                                            var path = "data[0].model.model.pending.data." + action.setWorkflowLabelInField + "='" + inputData.label + "'";
                                            eval(path);
                                        }

                                        gatekeeper.persist(data).then(function(savedArray) {
                                            dao.get(mainId).done(function(data) {
                                                if (_WFInstance.indicators.length == 0) {
                                                    _WFInstance.indicators.push(data);
                                                    toProcess--;
                                                    if (toProcess == 0) {
                                                        var success = util.success('Form created successfully.', _WFInstance.indicators);

                                                        resolve(success);
                                                    }
                                                } else {
                                                    var found = false;
                                                    for (var index = 0; index < _WFInstance.indicators.length; index++) {
                                                        var indicator = _WFInstance.indicators[index];
                                                        if (indicator._id == data._id) {
                                                            found = true;
                                                            // Remove the current item from the array and add the updated processModel
                                                            _WFInstance.indicators.splice(index, 1);
                                                            _WFInstance.indicators.push(data);
                                                            toProcess--;
                                                            if (toProcess == 0) {
                                                                var success = util.success('Form created successfully.', _WFInstance.indicators);
                                                                resolve(success);
                                                            }
                                                        }
                                                    }
                                                    if (found == false) {
                                                        _WFInstance.indicators.push(data);

                                                        toProcess--;
                                                        if (toProcess == 0) {
                                                            var success = util.success('Form created successfully.', _WFInstance.indicators);

                                                            resolve(success);
                                                        }

                                                    }
                                                }

                                            }).fail(function(err) {
                                                console.error(err);
                                                var failure = util.success('1 Gatekeeper initialisation failed with initialiseData message ' + err[0].message, {});
                                                reject(failure);
                                            });


                                        }, function(err) {
                                            console.error(err);
                                            var failure = util.success('2 Gatekeeper initialisation failed with initialiseData message ' + err[0].message, {});
                                            reject(failure);
                                        });



                                    } else {
                                        var failure = util.success('3 Gatekeeper initialisation failed with initialiseData message ' + err[0].message, {});
                                        reject(failure);
                                    }


                                }, function(err) {
                                    var failure = util.success('4 Gatekeeper initialisation failed with initialiseData message ' + err[0].message, {});
                                    reject(failure);
                                });



                            }).fail(function(err) {
                                console.error(err);
                                var failure = util.success('5 Gatekeeper initialisation failed with initialiseData message ' + err[0].message, {});
                                reject(failure);
                            })
                        }, function(err) {
                            console.error(err);
                            var failure = util.success('6 Gatekeeper initialisation failed with initialiseData message ' + err[0].message, {});
                            reject(failure);
                        });
                    }
                }
                //persist - save
                //loop on workflow array and check for 4 conditions and splice and update
                // Got to the next process item

                /*var workflows = doc.workflows;
                workflows.id = _WFInstance.config._id;
                workflows.instance = _WFInstance.instance._id;
                _WFInstance.indicators.push(doc);
                loop.next();*/

            }, function(err) {



                var toAddProcess = [];
                for (var i = 0; i < _WFInstance.instance.processes.length; i++) {
                    if (_WFInstance.instance.processes[i].subProcesses.length > 0) {
                        toAddProcess.push(_WFInstance.instance.processes[i]);
                    }
                }
                _WFInstance.instance.processes = [];
                _WFInstance.instance.processes = toAddProcess;


                var toAddSubProcess = [];
                for (var i = 0; i < _WFInstance.subprocesses.length; i++) {
                    if (_WFInstance.subprocesses[i].indicators.length > 0) {
                        toAddSubProcess.push(_WFInstance.subprocesses[i]);
                    }
                }
                _WFInstance.subprocesses = [];
                _WFInstance.subprocesses = toAddSubProcess;


                console.error(err);
                var failure = util.success('7 Gatekeeper initialisation failed with initialiseData message ' + err[0].message, {});
                reject(failure);
            })
        }

        var instantiateSource = 'fromDefinition';
        for (var counter = 0; counter < indicators.length; counter++) {
            var indicatorId = indicators[counter]._id;
            var indicatorName = util.getName(indicators[counter].name, 'en');
            var initType = indicators[counter]._type;

            var id = '';
            var indicatorDoc = {};

            if (initType == 'newInstance') {

                if (baseUUID != undefined && baseUUID != '' && baseUUID.length > 0) {

                    var existingUUID = JSON.xpath("/subprocesses[_id eq '" + baseUUID + "']/indicators[id eq '" + indicatorId + "']/instances[1]/uuid", _WFInstance, {})[0];
                    id = existingUUID;
                    initType = 'newSequence';

                    // update processes block to not display the older instance based on baseUUID

                    //TODO: Change required to move isActive to subProcess file.
                    var sp = JSON.xpath("/subprocesses[_id eq '" + baseUUID + "']", app.SCOPE.workflow, {})[0];
                    sp.active = false;
                    // instantiate new seq with previous authorised data
                    instantiateSource = 'fromAuthorised';

                } else {

                    if (subProcess.isProfile != undefined && subProcess.isProfile && counter == 0) {
                        id = profile;
                    } else {
                        id = indicatorId + '-' + generateUUID();
                    }
                }


            } else {

                var spLastUuid = JSON.xpath("/instance/processes[id eq '" + processId + "' and subProcesses/id eq '" + subProcessId + "'][1]/subProcesses/uuid", _WFInstance, {})[0];
                var indId = JSON.xpath("/subprocesses[_id eq '" + spLastUuid + "']/indicators[id eq '" + indicatorId + "']/instances/uuid", app.SCOPE.workflow, {})[0];
                if (spLastUuid == '' || spLastUuid == undefined || indId == '' || indId == undefined) {

                    if (subProcess.isProfile != undefined && subProcess.isProfile && counter == 0) {
                        id = profile;
                    } else {
                        id = indicatorId + '-' + generateUUID();
                    }

                } else {

                    id = indId;
                }

                if (baseUUID != undefined && baseUUID != '' && baseUUID.length > 0) {

                    //TODO: Change required to move isActive to subProcess file.

                    var sp = JSON.xpath("/subprocesses[_id eq '" + baseUUID + "']", app.SCOPE.workflow, {})[0];
                    sp.active = false;
                    instantiateSource = 'fromAuthorised';

                }



            }
            // TODO: Replace with the gatekeeper promise call, return the object, update the indicator
            // document workflow processes data and update the workflow class indicators array.
            formCreateFn(id, initType, indicatorId, '', instantiateSource);


        }


        // var success = util.success('Form indicator set saved successfully.', result);
        // resolve(success);
    });
};

function setInstanceTitle(args) {

    var _WFInstance = args[0] || {};
    var uuid = args[2] || '';
    var data = args[4] || {};
    var title = data.label;

    return new Promise(function(resolve, reject) {

        var subProcessInstance = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];
        var indicatorInstances = subProcessInstance.indicators;

        for (var i = 0; i < indicatorInstances.length; i++) {
            var indicatorUUID = indicatorInstances[i].instances[0].uuid;
            var indicatorInstance = JSON.xpath("/indicators[_id eq '" + indicatorUUID + "']", _WFInstance, {})[0];
            indicatorInstance.title = indicatorInstances[i].id +' '+title;
        };

        resolve("Set Title Success", indicatorInstances);

    });

};

function deleteProfile(args) {

    var _WFInstance = args[0] || {};
    var profileId = _WFInstance.profile;

    return new Promise(function(resolve, reject) {

        var workerObject = {
            "source": "remote",
            "type": "workerObject",
            "_id": generateUUID(),
            "channels": [],
            "communityId": app.SCOPE.communityId,
            "applicationId": app.SCOPE.applicationId,
            "message": "",
            "messageType": "info",
            "createdDateTime": moment().format(),
            "senderUserId": LOCAL_SETTINGS.SUBSCRIPTIONS.userId,
            "notification": {

            },
            "profile": {
                "action": "deleteProfile",
                "profileId": profileId
            }
        }
        console.log(workerObject);
        dao.upsert(workerObject).done(function(data) {
            console.log("Worker Object submitted for profile(" + profileId + ") deletion.");
            console.log(data);
            resolve(data);
        }).fail(function(err) {
            console.log(err);
            reject(data);
        });


    });


};


function createProfile(args) {



    var _WFInstance = args[1] || {};

    var communityId = _WFInstance.communityId;
    var profileId = _WFInstance.profile;

    return new Promise(function(resolve, reject) {

        library.createProfileDocuments(communityId, profileId).done(function(data) {

            var success = util.success('Form created successfully.', data);
            resolve(success);

        }).fail(function(err) {

            console.error(err);
            var failure = util.success('ERROR: Profile creation failed' + err[0].message, {});
            reject(failure);

        });

    });
};

function setDraft(args) {



    var _WFInstance = args[0] || {};
    var communityId = _WFInstance.communityId;
    var profileId = _WFInstance.profile;
    var uuid = args[2] || '';


    return new Promise(function(resolve, reject) {

        var subProcessInstance = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];
        var indicatorInstances = subProcessInstance.indicators;

        for (var i = 0; i < indicatorInstances.length; i++) {
            var indicatorUUID = indicatorInstances[i].instances[0].uuid;
            var indicatorInstance = JSON.xpath("/indicators[_id eq '" + indicatorUUID + "']", _WFInstance, {})[0];
            indicatorInstance.control.draft = true;
        };

        resolve("Set Draft Success", indicatorInstances);

    });
};

function setUnDraft(args) {

    var _WFInstance = args[0] || {};
    var communityId = _WFInstance.communityId;
    var profileId = _WFInstance.profile;
    var uuid = args[2] || '';

    return new Promise(function(resolve, reject) {

        var subProcessInstance = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];
        var indicatorInstances = subProcessInstance.indicators;

        for (var i = 0; i < indicatorInstances.length; i++) {
            var indicatorUUID = indicatorInstances[i].instances[0].uuid;
            var indicatorInstance = JSON.xpath("/indicators[_id eq '" + indicatorUUID + "']", _WFInstance, {})[0];
            indicatorInstance.control.draft = false;
        };

        resolve("Set Draft Success", indicatorInstances);

    });
};



function save(indicator) {
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

function submit(form) {
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

function authorise(form) {
    var completed = [];
    var result = {
        complete: true,
        data: []
    };

    var processId = form[0] || '';

    var subProcess = form[1] || {};

    var subProcessId = subProcess._id;

    var processSeq = form[2] || '';

    var subProcessSeq = form[3] || '';

    var _WFInstance = form[4] || {};

    return new Promise(function(resolve, reject) {

        var subProcessUUID = JSON.xpath("/processes[id eq '" + processId + "' and seq eq '" + processSeq + "']/subProcesses[id eq '" + subProcessId + "' and seq eq '" + subProcessSeq + "']/uuid", _WFInstance.instance, {})[0];
        var spIndicators = JSON.xpath("/subprocesses[_id eq '" + subProcessUUID + "']/indicators/instances/uuid", _WFInstance, {});
        var itemsToProcess = spIndicators.length;
        var updatedObjectsArray = [];

        for (var i = 0; i < itemsToProcess; i++) {



            gatekeeper.authorise(spIndicators[i]).then(function(authorisedReturn) {


                gatekeeper.persist(authorisedReturn).then(function(savedArray) {


                    var uuidSavedIndicator = '';
                    for (var c = 0; c < savedArray.length; c++) {
                        if (!savedArray[c].id.endsWith(':approved')) {
                            uuidSavedIndicator = savedArray[c].id;
                        }
                    }
                    dao.get(uuidSavedIndicator).done(function(data) {
                        if (_WFInstance.indicators.length == 0) {
                            _WFInstance.indicators.push(data);
                            itemsToProcess--;
                            if (itemsToProcess == 0) {

                                var success = util.success('Form authorised successfully.', updatedObjectsArray);
                                resolve(success);
                            }
                        } else {
                            var found = false;
                            for (var index = 0; index < _WFInstance.indicators.length; index++) {
                                var indicator = _WFInstance.indicators[index];
                                if (indicator._id == data._id) {
                                    found = true;
                                    // Remove the current item from the array and add the updated processModel
                                    _WFInstance.indicators.splice(index, 1);
                                    _WFInstance.indicators.push(data);
                                    itemsToProcess--;
                                    if (itemsToProcess == 0) {

                                        var success = util.success('Form authorised successfully.', updatedObjectsArray);
                                        resolve(success);
                                    }
                                }
                            }
                            if (found == false) {
                                _WFInstance.indicators.push(data);

                                itemsToProcess--;
                                if (itemsToProcess == 0) {

                                    var success = util.success('Form authorised successfully.', updatedObjectsArray);
                                    resolve(success);
                                }

                            }
                        }
                    }).fail(function(err) {
                        console.error(err);
                    });

                }, function(error) {
                    console.error(err);
                });


            }, function(error) {
                itemsToProcess--;
                if (itemsToProcess == 0) {

                    var success = util.success('Form authorised successfully.', updatedObjectsArray);
                    resolve(success);
                }
            });


        }


    });
};

function close(form) {
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
    close: close,
    setDraft: setDraft,
    setUnDraft: setUnDraft,
    createProfile: createProfile,
    setInstanceTitle: setInstanceTitle,
    deleteProfile: deleteProfile

}
},{"utility":6}],4:[function(require,module,exports){
'use strict';

var util = require('utility');

/**
 * User Interface Module
 *
 * @module lib/ui
 * @author Brent Gordon
 * @version 0.1.0
 * @description test description
 *
 */

 /**
  * Get all process sub-processes user interface data
  *
  * @param {string} processId - the Workflow config / definition process id
  * @param {string} lang - the user preffered langauge
  * @param {object} _WFInstance - the current workflow constructor instance
  *
  * @example ''
  *
  * @return ''
  *
  */
 function getProcess(processId, lang, _WFInstance){
  return new Promise(function(resolve, reject) {
    try {
      var processModel = [];
      var processInstance = [];
    	_WFInstance.instance.processes.filter(function(processItem){
    		if (processItem.id == processId) {
    			processInstance = processItem;
    		}
    	})
      // console.log(processInstance.subProcesses.length);
      util.syncLoop(processInstance.subProcesses.length, function(loop){
  			var counter = loop.iteration();
        var processSeq = processInstance.seq;
        var subProcessId = processInstance.subProcesses[counter].id;
        var subProcessSeq = processInstance.subProcesses[counter].seq;
        getSubProcess(processId, processSeq, subProcessId, subProcessSeq, lang, _WFInstance).then(function(model){
          // console.log(model);
          processModel.push(model);
          loop.next();
          // console.log(processModel);
  			}, function(err){
          // console.log(processModel);
  				loop.break();
  				reject(err);
  			});
  		}, function(){
        // console.log(processModel);
  			resolve(processModel);
  		});
    } catch(err){
      reject(err);
    }
  })
};

 /**
  * Get SubProcess user interface data
  *
  * @param {string} processId - the Workflow config / definition process id
  * @param {number} processSeq - the Workflow instance process seq
  * @param {string} subProcessId - the Workflow config / definition sub-process id
  * @param {number} subProcessSeq - the Workflow instance sub-process seq
  * @param {object} _WFInstance - the current workflow constructor instance
  *
  * @example ''
  *
  * @return ''
  *
  */
function getSubProcess(processId, processSeq, subProcessId, subProcessSeq, lang, _WFInstance){
  return new Promise(function(resolve, reject) {
    try {
      var model = {
        id: '',
        seq: '',
        name: '',
        help: '',
        dates: '',
        step: ''
      };
      var subProcess = [];
    	var subProcessConf = [];
    	_WFInstance.instance.processes.filter(function(processItem){
    		if (processItem.id == processId && processItem.seq == processSeq) {
    			var spLength = processItem.subProcesses.length;
    			processItem.subProcesses.filter(function(subProcessItem){
    				if (subProcessItem.id == subProcessId && subProcessItem.seq == subProcessSeq && subProcessItem.complete == false) {
    					subProcess = subProcessItem;
    				}
    			})
    		}
    	})
    	// Get the current subProcess configuration
    	_WFInstance.config.processes.filter(function(processConfig){
    		if (processConfig._id == processId) {
    			processConfig.subProcesses.filter(function(subProcessConfig){
    				if (subProcessConfig._id == subProcessId) {
    					subProcessConf = subProcessConfig;
    				}
    			})
    		}
    	})
      // Update the model
      model.id = subProcessConf._id;
      model.seq = subProcess.seq;
      model.name = util.getName(subProcessConf.name, lang);
      model.help = util.getName(subProcessConf.help, lang);
      model.dates = subProcess.dates;
      model.step = subProcess.step;
      resolve(model);
    } catch(err) {
      reject(err);
    }
  })
};




function prepareNotificationScreen(){

  ""
};

 module.exports = {

  getProcess: getProcess

 }

},{"utility":6}],5:[function(require,module,exports){
'use strict';

var util = require('utility');
var actionsModule = require('./actions');
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
function count(arr) {
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
            util.syncLoop(prerequisites.length, function(loop) {
                var counter = loop.iteration();
                preRequisite(prerequisites[counter], _WFInstance).then(function(data) {
                    // Check if all pre-requisites completed successfully.
                    completed.push(true);
                    loop.next();
                }, function(err) {
                    completed.push(false);
                    loop.break();
                    reject(err);
                });
            }, function() {
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
function preRequisite(prerequisite, _WFInstance) {
    return new Promise(function(resolve, reject) {
        switch (prerequisite._type) {
            // TODO: Add the call to the relevant methods based on the _type attribute. Should call the generic action() method.
            case 'processInstances':
                try {

                    var id = prerequisite._parameter;
                    var _filter = prerequisite._filter;
                    var subjectCount = '';
                    if (_filter != undefined) {
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
                        var innerXpath = "/" + _filterElement + "[. eq '" + _filterValue + "']";
                        var fullPath = "count(/subprocesses[id eq '" + id + "']" + innerXpath + ")";
                        subjectCount = JSON.xpath(fullPath, _WFInstance, {})[0];

                    } else {
                        subjectCount = JSON.xpath("count(/subprocesses[id eq '" + id + "'])", _WFInstance, {})[0];
                    }
                    var compare = util.compare(subjectCount, prerequisite._operator, parseInt(prerequisite._value));
                    if (compare) {
                        var success = util.success('Pre-requisites passed.', {});
                        resolve(success);
                    } else {
                        var message = '';
                        prerequisite.message.i18n.filter(function(item) {
                            if (item._lang == 'en') {
                                message = item.value;
                                var error = util.error('WFPreRequisiteError', message);
                                reject(error);
                            }
                        });
                    }
                } catch (err) {
                    reject(err);
                }
            default:
                var error = util.error('WFPreRequisiteError', 'Pre-requisite type: ' + prerequisite._type + ' not defined.');
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
function preActions(preActions, _WFInstance) {
    return new Promise(function(resolve, reject) {
        var completed = [];
        try {
            util.syncLoop(preActions.length, function(loop) {
                var counter = loop.iteration();
                action(preActions[counter], _WFInstance).then(function(data) {
                    // Check if all pre-requisites completed successfully.
                    completed.push(true);
                    loop.next();
                }, function(err) {
                    completed.push(false);
                    loop.break();
                    reject(err);
                });
            }, function() {
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
function getSubProcess(id, _WFInstance) {
    if (_WFInstance.subprocesses == undefined) {
        return [];
    } else {
        _WFInstance.subprocesses.filter(function(subProcess) {
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
function subProcess(processId, processSeq, subProcessId, subProcessSeq, data, _WFInstance) {
    // Get the current process subProcess instance
    // var subProcessSeq = 1;
    var subProcess = [];
    var processConf = [];
    var subProcessConf = [];
    _WFInstance.instance.processes.filter(function(objProcess) {
            if (objProcess.id == processId && objProcess.seq == processSeq) {
                var spLength = objProcess.subProcesses.length;
                objProcess.subProcesses.filter(function(objSubProcess) {
                    if (objSubProcess.id == subProcessId && objSubProcess.seq == subProcessSeq) {
                        var uuid = objSubProcess.uuid;
                        _WFInstance.subprocesses.filter(function(subProcessItem) {
                            if (subProcessItem._id == uuid) {
                                subProcess = subProcessItem;
                            }
                        })
                    }
                })
            }
        })
        // Get the current subProcess configuration
    _WFInstance.config.processes.filter(function(processConfig) {
            if (processConfig._id == processId) {
                processConf = processConfig;
                processConfig.subProcesses.filter(function(subProcessConfig) {
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

    //TODO: Change required to move isActive to subProcess file.Here

    var groupKey = '';
    var baseUUID = data.baseUUID;
    if (baseUUID != undefined && baseUUID != '' && baseUUID.length > 0) {
        var previousObject = JSON.xpath("/subprocesses[_id eq '" + baseUUID + "']", _WFInstance, {})[0];
        groupKey = previousObject.groupKey;
    } else {
        groupKey = generateUUID();
    }


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
        active: true,
        groupKey: groupKey,
        channels: [
            "community_" + app.SCOPE.communityId,
            "profile_" + app.SCOPE.profileId,
            "application_" + app.SCOPE.applicationId,
            "community_" + app.SCOPE.communityId + "_application_" + app.SCOPE.applicationId
        ]
    };
    _WFInstance.subprocesses.push(model);
    // Return a promise
    return new Promise(function(resolve, reject) {
        // Catch all uncaught errors
        try {
            // 1. Process the pre-actions
            var preActionsConf = processConf.preActions;
            preActions(preActionsConf, _WFInstance).then(function(result) {
                // 2. Process the pre-requisites
                var prerequisiteConf = processConf.prerequisites;
                preRequisites(prerequisiteConf, _WFInstance).then(function(result) {
                    // 3. Initiate the subProcess
                    var initiateConf = subProcessConf.initiate;
                    initiate(initiateConf, subProcess, data).then(function(result) {
                        //Update the subProcess model
                        model.initiated = result.data.initiated;
                        model.dates = result.data.dates;
                        // Execute the first step
                        var stepId = subProcessConf.steps[0]._id;
                        var transitionId = subProcessConf.steps[0].transitions[0]._id;
                        var stepSeq = 1;
                        step(processId, processSeq, subProcessId, subProcessSeq, stepId, stepSeq, data, _WFInstance)
                            .then(function(result) {
                                model.step = result.data;
                                // Update the indicator sections of the subProcess

                                indicators(subProcessConf.indicators, _WFInstance, model._id).then(function(result) {

                                    model.indicators = result.data;
                                    // Execute the transitions, if auto
                                    transition(processId, processSeq, subProcessId, subProcessSeq, stepId, transitionId, data, _WFInstance).then(function(result) {
                                        // Update the subProcess step data
                                        var transResult = result;
                                        model.step = result.data;
                                        // 4. Process the post-actions
                                        var postActionsConf = processConf.postActions;
                                        postActions(postActionsConf, _WFInstance).then(function(result) {
                                            var success = util.success(transResult.message, model);
                                            resolve(success);
                                        }, function(err) {
                                            reject(err);
                                        })
                                    }, function(err) {
                                        reject(err);
                                    });
                                }, function(err) {
                                    reject(err);
                                })
                            }, function(err) {
                                reject(err);
                            })
                    }, function(err) {
                        _WFInstance.subprocesses = _WFInstance.subprocesses.filter(function(obj) {
                            return !(obj._id == subProcessObjectId);
                        });
                        reject(err);
                    })
                }, function(err) {
                    _WFInstance.subprocesses = _WFInstance.subprocesses.filter(function(obj) {
                        return !(obj._id == subProcessObjectId);
                    });
                    reject(err);
                })
            }, function(err) {
                _WFInstance.subprocesses = _WFInstance.subprocesses.filter(function(obj) {
                    return !(obj._id == subProcessObjectId);
                });
                reject(err);
            })
        } catch (err) {
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
function initiate(initiate, subProcess, data) {
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
        var init = function() {
            switch (initiate._type) {
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
function step(processId, processSeq, subProcessId, subProcessSeq, stepId, stepSeq, data, _WFInstance) {


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
        assignment: {},
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



            _WFInstance.instance.processes.filter(function(objProcess) {


                if (objProcess.id == processId && objProcess.seq == processSeq) {
                    objProcess.subProcesses.filter(function(objSubProcess) {

                        if (objSubProcess.id == subProcessId && objSubProcess.seq == subProcessSeq) {
                            uuid = objSubProcess.uuid;

                        }
                    })
                }
            })
            _WFInstance.subprocesses.filter(function(subProcessItem) {
                if (subProcessItem._id == uuid) {
                    instSubProcess = subProcessItem;
                }
            })
            _WFInstance.config.processes.filter(function(objProcess) {
                if (objProcess._id == processId) {
                    objProcess.subProcesses.filter(function(objSubProcess) {
                        if (objSubProcess._id == subProcessId) {
                            subProcess = objSubProcess;
                            objSubProcess.steps.filter(function(objStep) {
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
            indicatorDocs(processId, indicators, model, _WFInstance).then(function(result) {
                // If actions are specified, execute them
                var createdID = _WFInstance.profile + ':' + _WFInstance.app + ':' + processId + ':' + processSeq + ':' + subProcessId + ':' + subProcessSeq;
                uuid = createdID;

                if (step.actions[0] !== undefined) {
                    actions(step.actions, processId, processSeq, subProcessId, subProcessSeq, subProcess, model, _WFInstance, data, uuid)
                        .then(function(result) {
                            // Execute the transitions, if auto

                            var success = util.success('Actions completed successfully.', model);

                            resolve(success);
                        }, function(err) {
                            reject(err);
                        })
                        // Else tasks are sprecified, execute them
                } else if (step.task !== undefined) {
                    // Make assignments
                    task(processId, processSeq, step.task, createdID, model).then(function(result) {
                        // do task success handling
                        console.log('Task complete.');
                        var success = util.success('Task awaiting user action.', model);
                        resolve(success);
                    }, function(err) {
                        reject(err);
                    });


                }
            }, function(err) {
                reject(err);
            })
        } catch (err) {
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
function indicators(indicators, _WFInstance, spuuid) {
    var model = [];
    return new Promise(function(resolve, reject) {
        try {
            // Update the indicator sections of the subProcess

            var array = JSON.xpath("indicators[fn:count(./workflows/processes[subProcessUUID eq '" + spuuid + "']) gt 0]", _WFInstance, {});
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
        } catch (err) {
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
function assignUser(processId, processSeq, subProcessId, subProcessSeq, user, _WFInstance) {
    return new Promise(function(resolve, reject) {
        try {
            var uuid = '';
            // Get the current subProcess instance data
            _WFInstance.instance.processes.filter(function(objProcess) {
                if (objProcess.id == processId && objProcess.seq == processSeq) {
                    objProcess.subProcesses.filter(function(objSubProcess) {
                        if (objSubProcess.id == subProcessId && objSubProcess.seq == subProcessSeq) {
                            uuid = objSubProcess.uuid;
                        }
                    })
                }
            })
            _WFInstance.subprocesses.filter(function(subProcessItem) {
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
                                    doc.workflows.filter(function(workflow) {
                                        if (workflow.id == _WFInstance.config._id) {
                                            workflow.processes.filter(function(processItem) {
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
        } catch (err) {
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
function indicatorDocs(processId, indicators, step, _WFInstance) {
    return new Promise(function(resolve, reject) {
        try {
            // Update the indicator sections of the subProcess
            if (indicators == undefined) {
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
                                doc.workflows.filter(function(workflow) {
                                    if (workflow.id == _WFInstance.config._id) {
                                        //comso.log('-->>>>>> Fifth If consition');



                                        workflow.processes.filter(function(processItem) {

                                            if (processItem.id == processId) {
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
        } catch (err) {
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
function actions(actions, processId, processSeq, subProcessId, subProcessSeq, subProcess, step, _WFInstance, data, uuid) {
    var arrActions = [];
    return new Promise(function(resolve, reject) {
        util.syncLoop(actions.length, function(loop) {
            var counter = loop.iteration();
            action(actions[counter], processId, processSeq, subProcessId, subProcessSeq, subProcess, step, _WFInstance, data, uuid)
                .then(function(result) {
                    var retAction = {
                        id: actions[counter]._id,
                        seq: counter,
                        data: result
                    };
                    arrActions.push(retAction);
                    loop.next();
                }, function(err) {
                    loop.break();
                    reject(err);
                });
        }, function() {
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
function action(action, processId, processSeq, subProcessId, subProcessSeq, subProcess, step, _WFInstance, data, uuid) {
    return new Promise(function(resolve, reject) {

        if (action.method != undefined) {
            var methodPossibleItems = ["form", "indicator", "profile", "subProcessInstance", "step", "community", "applicationDefinition", "applicationAdoption", "user", "sdo"];
            switch (propertyExists(action.method, methodPossibleItems)) {
                case 'form':
                    break;
                case 'indicator':
                    break;
                case 'profile':
                    break;
                case 'subProcessInstance':
                    break;
                case 'step':
                    break;
                case 'community':
                    var communityPossibleItems = ["setVariable", "createCommunity", "userJoinCommunity"];
                    switch (propertyExists(action.method.community, communityPossibleItems)) {
                        case 'setVariable':
                            //
                            break;
                        case 'createCommunity':
                            return actionsModule.community.createCommunity("test123");

                        case 'userJoinCommunity':
                            //
                            break;
                        default:
                            reject("No method found from implemented list.");
                            break;
                    }
                    break;
                case 'applicationDefinition':
                    break;
                case 'applicationAdoption':
                    break;
                case 'user':
                    break;
                case 'sdo':
                    break;
                default:
                    reject("No method found from implemented list.");
                    break;
            }



        } else {

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
                switch (arg) {
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
            args.push(data);


            if (action._id == 'form.create') {
                form.create(args).then(function(result) {

                    resolve(result.data);
                }, function(err) {
                    reject(err);
                });
            } else if (action._id == 'form.authorise') {
                form.authorise(args).then(function(result) {
                    resolve(result.data);
                }, function(err) {
                    reject(err);
                });
            } else if (action._id == 'form.close') {
                form.close(args).then(function(result) {
                    resolve(result.data);
                }, function(err) {
                    reject(err);
                });
            } else if (action._id == 'form.setDraft') {
                form.setDraft(args).then(function(result) {
                    resolve(result.data);
                }, function(err) {
                    reject(err);
                });
            } else if (action._id == 'form.setUnDraft') {
                form.setUnDraft(args).then(function(result) {
                    resolve(result.data);
                }, function(err) {
                    reject(err);
                });
            } else if (action._id == 'form.createProfile') {
                form.createProfile(args).then(function(result) {
                    resolve(result.data);
                }, function(err) {
                    reject(err);
                });
            } else if (action._id == 'form.setInstanceTitle') {
                form.setInstanceTitle(args).then(function(result) {
                    resolve(result.data);
                }, function(err) {
                    reject(err);
                });
            } else if (action._id == 'profile.delete') {
                form.deleteProfile(args).then(function(result) {
                    resolve(result.data);
                }, function(err) {
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

        }
    });
};

/**
 * Process tasks
 *
 * @param {object} task - the task config data
 * @param {object} inputData - the user input data
 *
 * @example ''
 *
 * @return ''
 *
 */
function task(subprocessID, subprocessSEQ, task, spuuid, model) {

    return new Promise(function(resolve, reject) {
        var list = [];
        if (task.assign.profileRole != undefined) {
            var assignType = 'profileRole';
            var profileId = app.SCOPE.workflow.profile;
            var id = '';
            if (task.assign.profileRole.profile == 'current') {
                id = app.SCOPE.workflow.profile;
            } else if (task.assign.profileRole.profile == 'community') {
                id = app.SCOPE.communityId;
            }
            var role = task.assign.profileRole.role;

            library.getUsersListByRole(id, role).then(function(list) {
                if (list != undefined) {
                    if (list.length > 1) {

                        // assign to users send notifications

                        //var prObject = JSON.xpath("/instance/processes[subProcesses/uuid eq '"+ spuuid +"']",app.SCOPE.workflow,{})[0];
                        var spObject = JSON.xpath("/subprocesses[_id eq '" + spuuid + "']", app.SCOPE.workflow, {})[0];
                        var channels = JSON.xpath("/subprocesses[_id eq '" + spuuid + "']/channels", app.SCOPE.workflow, {});
                        var finalMsg = processWorkflowMessage(NOTIFICATION_USER_MSG_ACCEPT, spuuid);

                        var processId = spObject.id;
                        var processSeq = spObject.seq;
                        //var subprocessID = prObject.id;
                        //var subprocessSEQ = prObject.seq;
                        var subprocessUUID = spuuid;
                        var process_ValidDate = spObject.dates.valid;

                        var configProcess = JSON.xpath("/config/processes[_id eq '" + subprocessID + "']", app.SCOPE.workflow, {})[0];
                        var configSubProcess = JSON.xpath("/subProcesses[_id eq '" + processId + "']", configProcess, {})[0];


                        var stepSeq = spObject.step.seq + 0;
                        var process_CurrentStepName = JSON.xpath("/steps[_seq eq '" + stepSeq + "']/name/i18n[1]/value", configSubProcess, {})[0];
                        var processName = configSubProcess.name.i18n[0].value;

                        var notficationRequest = {
                            "source": "remote",
                            "type": "notificationRequest",
                            "_id": spuuid + ":notificationRequest",
                            "channels": channels,
                            "communityId": app.SCOPE.communityId,
                            "applicationId": app.SCOPE.applicationId,
                            "message": finalMsg,
                            "messageType": "info",
                            "createdDateTime": moment().format(),
                            "senderUserId": LOCAL_SETTINGS.SUBSCRIPTIONS.userId,
                            "actions": [{
                                "label": "View",
                                "function": "app.openSubprocess",
                                "params": [profileId, processId, processSeq, processName, subprocessID, subprocessSEQ, subprocessUUID, process_ValidDate, process_CurrentStepName]
                            }],
                            "receiver": {
                                "value": [{
                                    "type": "role",
                                    "name": role,
                                    "profileId": id
                                }]
                            }
                        }

                        dao.upsert(notficationRequest).done(function(data) {
                            console.log(data);
                        }).fail(function(err) {
                            console.log(err);
                        });

                        //var spObject = JSON.xpath("/subprocesses[_id eq '"+ spuuid +"']",app.SCOPE.workflow, {})[0];
                        var assignment = '';
                        if (task.assign.assignment != undefined) {

                            var assignment = model.assignment; //JSON.xpath("/step/assignment",spObject,{})[0];
                            var accept = {
                                "show": task.assign.assignment.accept.show,
                                "label": _getName(task.assign.assignment.accept.label.i18n, 'en')
                            };
                            assignment.accept = accept;
                            assignment.message = _getName(task.assign.assignment.message.i18n, 'en');
                            var reject = {
                                "show": task.assign.assignment.reject.show,
                                "label": _getName(task.assign.assignment.reject.label.i18n, 'en')
                            };
                            assignment.reject = reject;
                            var value = {
                                "profileId": profileId,
                                "roleId": role,
                                "type": "role"
                            };

                            assignment.value = value;
                            assignment.profileRoleId = id;

                        }
                        resolve('Notifications request submitted for acceptance.');

                    } else if (list.length == 1) {
                        //auto assign
                        var userId = list[0].id;
                        var username = list[0].name;

                        //var spObject = JSON.xpath("/subprocesses[_id eq '"+ spuuid +"']",app.SCOPE.workflow, {})[0];
                        var assignee = model.assignedTo; //JSON.xpath("/step/assignedTo",spObject,{})[0];
                        assignee.name = username + "";
                        assignee.userId = userId + "";
                        resolve('Assigned to the only user in role.');

                    } else {
                        // use default user

                        if (task.assign.default != undefined) {
                            var userId = task.assign.default.userId;
                            var username = task.assign.default.userName;

                            //var spObject = JSON.xpath("/subprocesses[_id eq '"+ spuuid +"']",app.SCOPE.workflow, {})[0];
                            var assignee = model.assignedTo; // JSON.xpath("/step/assignedTo",spObject,{})[0];
                            assignee.name = username + "";
                            assignee.userId = userId + "";

                            resolve('Assigned to default user');

                        } else {

                            console.log('Error in assignment. Default user not specified.');
                            reject('Error in assignment. Default user not specified.');

                        }
                    }
                } else {
                    console.log('Error in getUsersListByRole undefined');
                    reject(err);
                }
            }, function(err) {
                console.log('Error in getUsersListByRole');
                reject(err);
            });
        } else if (task.assign.swimlane != undefined) {
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
function transition(processId, processSeq, subProcessId, subProcessSeq, stepId, transitionId, data, _WFInstance) {
    return new Promise(function(resolve, reject) {
        try {
            var stepSeq = 0;
            var nextStepId = '';
            var nextStepSeq = 0;
            var subProcess = [];
            var currentProcess = _WFInstance.config.processes.filter(function(objProcess) {
                if (objProcess._id == processId) {
                    return objProcess;
                }
            });
            var currentSubProcess = currentProcess[0].subProcesses.filter(function(objSubProcess) {
                if (objSubProcess._id == subProcessId) {
                    return objSubProcess;
                }
            });
            var currentStep = currentSubProcess[0].steps.filter(function(objStep) {
                if (objStep._id == stepId) {
                    return objStep;
                }
            });
            var transition = currentStep[0].transitions.filter(function(objTransition) {
                if (objTransition._id == transitionId) {
                    return objTransition;
                }
            });
            for (var i = 0; i < currentSubProcess[0].steps.length; i++) {
                if (currentSubProcess[0].steps[i]._id == stepId) {
                    stepSeq = parseInt(currentSubProcess[0].steps[i]._seq);
                }
            }
            currentSubProcess[0].steps.filter(function(stepItem) {
                nextStepSeq = stepSeq + 1;
                if (parseInt(stepItem._seq) == nextStepSeq) {
                    nextStepId = stepItem._id;
                }
            })
            _WFInstance.instance.processes.filter(function(objProcess) {
                if (objProcess.id == processId && objProcess.seq == processSeq) {
                    objProcess.subProcesses.filter(function(objSubProcess) {
                        if (objSubProcess.id == subProcessId && objSubProcess.seq == subProcessSeq) {
                            var uuid = objSubProcess.uuid;
                            // subProcess = objSubProcess;
                            _WFInstance.subprocesses.filter(function(subProcessItem) {
                                if (subProcessItem._id == uuid) {
                                    subProcess = subProcessItem;
                                }
                            })
                        }
                    })
                }
            });
            var maxSteps = currentSubProcess[0].steps.length;
            switch (transition[0]._type) {
                case 'auto':
                    if (transition[0].goTo._type == 'nextStep') {
                        step(processId, processSeq, subProcessId, subProcessSeq, nextStepId, nextStepSeq, data, _WFInstance).then(function(result) {
                            if (nextStepSeq == maxSteps) {
                                var success = util.success('All Step transitions have completed successfully.', {
                                    subProcessComplete: true,
                                    step: result.data
                                });
                                resolve(success);
                            } else {
                                var success = util.success('Step transition completed successfully.', result.data);
                                resolve(success);
                            }

                        }, function(err) {
                            reject(err);
                        });
                    }
                    break;
                case 'user':
                    if (transition[0].goTo._type == 'nextStep') {
                        step(processId, processSeq, subProcessId, subProcessSeq, nextStepId, nextStepSeq, data, _WFInstance).then(function(result) {
                            if (nextStepSeq == maxSteps) {
                                var success = util.success('All Step transitions have completed successfully.', {
                                    subProcessComplete: true,
                                    step: result.data
                                });
                                resolve(success);
                            } else {
                                var success = util.success('Step transition completed successfully.', result.data);
                                resolve(success);
                            }

                        }, function(err) {
                            reject(err);
                        });
                    } else if (transition[0].goTo._type == 'stepId') {
                        var goToStepId = transition[0].goTo._stepId;
                        var goToStepSeq = 1;
                        currentSubProcess[0].steps.filter(function(stepItem) {
                            if (stepItem._id == goToStepId) {
                                goToStepSeq = parseInt(stepItem._seq);
                            }
                        })
                        step(processId, processSeq, subProcessId, subProcessSeq, goToStepId, goToStepSeq, data, _WFInstance).then(function(result) {
                            if (goToStepSeq == maxSteps) {
                                var success = util.success('All Step transitions have completed successfully.', {
                                    subProcessComplete: true,
                                    step: result.data
                                });
                                resolve(success);
                            } else {
                                var success = util.success('Step transition completed successfully.', result.data);
                                resolve(success);
                            }

                        }, function(err) {
                            reject(err);
                        });
                    }
                    break;
                default:
                    var error = util.error('WFTransitionError', 'Transition type: ' + transition[0]._type + ' not defined.');
                    reject(error);
            }
        } catch (err) {
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
function postActions(postActions, _WFInstance) {
    return new Promise(function(resolve, reject) {
        var completed = [];
        try {
            util.syncLoop(postActions.length, function(loop) {
                var counter = loop.iteration();
                action(postActions[counter], _WFInstance).then(function(data) {
                    // Check if all pre-requisites completed successfully.
                    completed.push(true);
                    loop.next();
                }, function(err) {
                    completed.push(false);
                    loop.break();
                    reject(err);
                });
            }, function() {
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

function processWorkflowMessage(message, spuuid) {

    var replacedMsg = message;

    if (replacedMsg.indexOf('#INSTANCE_LABEL') !== -1) {
        var val = JSON.xpath("/instance/processes/subProcesses[uuid eq '" + spuuid + "']/label", app.SCOPE.workflow, {})[0];
        replacedMsg = replacedMsg.replace('#INSTANCE_LABEL', val);

    }

    if (replacedMsg.indexOf('#USER_NAME') !== -1) {
        var val = JSON.xpath("/subprocesses[_id eq '" + spuuid + "']/step/assignedTo/name", app.SCOPE.workflow, {})[0];
        replacedMsg = replacedMsg.replace('#USER_NAME', val);

    }

    if (replacedMsg.indexOf('#PROFILE_TITLE') !== -1) {
        var val = app.profile.title;
        replacedMsg = replacedMsg.replace('#PROFILE_TITLE', val);

    }

    if (replacedMsg.indexOf('#PROFILE_TYPE') !== -1) {
        var val = app.SCOPE.APP_CONFIG.name;
        replacedMsg = replacedMsg.replace('#PROFILE_TYPE', val);

    }

    if (replacedMsg.indexOf('#VAR_SPUUID') !== -1) {
        var val = spuuid;
        replacedMsg = replacedMsg.replace('#VAR_SPUUID', val);

    }


    return replacedMsg;
};

function _getName(arr, lang) {
    if (arr !== undefined) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i]._lang === lang) {
                return arr[i].value;
            }
        }
    }
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
},{"./actions":2,"./form":3,"utility":6}],6:[function(require,module,exports){
'use strict';

/**
 * Utility Module
 *
 * @module lib/util
 *
 * @author Brent Gordon
 * @version 0.1.0
 *
 * @description
 * Workflow utility module used to format the return and error objects, and
 * contains some other utility functions such as a sync loop and compare.
 *
 */

/**
 * Success block return object, contains a message and optional data object.
 *
 * @param {string} message - the success message
 * @param {string|Object} [data] - the success returned data
 *
 * @example
 * // Return success without a data block
 * var success = util.success('Success message goes here...');
 *
 * @return {Object} - with message and data properties
 *
 */
function success(message, data){
	return {
		message: message,
		data: data
	};
};

/**
 * Warning block return object, contains a message and optional data object.
 *
 * @param {string} message - the warning message
 * @param {string|Object} [data] - the returned data
 *
 * @example
 * // Return success without a data block
 * var success = util.warn('Warning message goes here...');
 *
 * @return {Object} with message and data properties, and logs the warning to the console.
 *
 */
function warn(message, data){
	console.warn(data);
	return {
		warning: message,
		data: data
	};
};

/**
 * Error block JS error object, contains a code and message for the error.
 *
 * @param {string} code - the error code
 * @param {string} message - the error message
 *
 * @example
 * var success = util.error('Error001','Error message goes here...');
 *
 * @return {Object} with a code and message properties.
 *
 */
function error(code, message){
	var err = new Error('');
	err.name = code;
	err.message = message;
	return err;
};

/**
 * A loop which can loop X amount of times, which carries out
 * asynchronous code, but waits for that code to complete before looping.
 *
 * @param {number} iterations - the number of iterations to carry out
 * @param {function} process - the code/function we're running for every
 * iteration
 * @param {function} exit - an optional callback to carry out once the loop
 * has completed
 *
 * @example
 * util.syncLoop(5, function(loop){
 * 	var counter = loop.iteration();
 * 	// Add async calls here..
 *
 * }, function(){
 * 	// On complete perform actions here...
 *
 * });
 *
 * @return {Object} the loop control object.
 *
 */
function syncLoop(iterations, process, exit){
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
};

function compare(subject, operator, value) {
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
};

function getName(arr, lang){
	if (arr !== undefined) {
		for (var i = 0; i < arr.length ; i++) {
			if (arr[i].i18n._lang === lang) {
				return arr[i].i18n.value;
			}
		}
	}
}

module.exports = {

 	success: success,
 	warn: warn,
 	error: error,
 	syncLoop: syncLoop,
 	compare: compare,
	getName: getName

 }

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VzZXJzL0hhc2FuL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImluZGV4LmpzIiwibGliL2FjdGlvbnMuanMiLCJsaWIvZm9ybS5qcyIsImxpYi9pbnRlcmZhY2UuanMiLCJsaWIvcHJvY2Vzcy5qcyIsIm5vZGVfbW9kdWxlcy91dGlsaXR5L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3a0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcG5CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3A2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgUHJvY2VzcyA9IHJlcXVpcmUoJy4vbGliL3Byb2Nlc3MnKTtcclxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsaXR5Jyk7XHJcbnZhciB1c2VySW50ZXJmYWNlID0gcmVxdWlyZSgnLi9saWIvaW50ZXJmYWNlJyk7XHJcblxyXG4vKmdsb2JhbHMgKi9cclxuXHJcbi8qKlxyXG4gKiBBIG5ldyBXb3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZSBjb250YWlucyB0aGUgcmVmZXJlbmNlIHRvIHRoZSBhcHBsaWNhdGlvblxyXG4gKiBhbmQgYXNzb2NpYXRlZCBwcm9maWxlIHdoaWNoIGl0IHJlcXVpcmVzIGFzIHRoZSBmaXJzdCB0d28gcGFyYW1ldGVycy4gSXQgYWxzb1xyXG4gKiByZXF1aXJlcyBhIHdvcmtmbG93IGNvbmZpZ3VyYXRpb24sIGFzIHRoZSB0aGlyZCBwYXJhbWV0ZXIsIHdoaWNoIGlzIHVzZWQgdG9cclxuICogZGVzY2liZSB0aGUgd29ya2Zsb3cgcHJvY2Vzc2VzLiBJZiBhIHdvcmtmbG93IGluc3RhbmNlIGV4aXN0cyB5b3UgY2FuIHBhc3MgaXRcclxuICogaW4gYXMgdGhlIGZvdXJ0aCBwYXJhbWV0ZXIgd2hpY2ggaXQgd2lsbCB0aGVuIHVzZSwgZWxzZSBjcmVhdGUgYSBuZXcgb25lLlxyXG4gKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHByb2ZpbGUgLSBUaGUgY3VycmVudCBwcm9maWxlIGlkXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBhcHAgLSBUaGUgYXNzb2NpYXRlZCBhcHBsaWNhdGlvbiBpZFxyXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIC0gVGhlIGFwcGxpY2F0aW9uIHdvcmtmbG93IGNvbmZpZ3VyYXRpb24gLyBkZWZpbml0aW9uXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbaW5zdGFuY2VdIC0gQW4gZXhpc3RpbmcgYXBwbGljYXRpb24gcHJvZmlsZSB3b3JrZmxvdyBpbnN0YW5jZSBiYXNlZFxyXG4gKiBvbiB0aGUgZGVmaW5pdGlvblxyXG4gKlxyXG4gKiBAYXV0aG9yIEJyZW50IEdvcmRvblxyXG4gKiBAdmVyc2lvbiAwLjEuMFxyXG4gKlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgY29uZmlnID0geyAnX2lkJzogJ2FiYzEyMycgfTtcclxuICogdmFyIGluc3RhbmNlID0geyAnX2lkJzogJ2luc3RhbmNlX2FiYzEyMycgfTtcclxuICogLy8gSWYgdGhlcmUgaXNuJ3QgYW4gZXhpc3RpbmcgaW5zdGFuY2VcclxuICogdmFyIHdvcmtmbG93ID0gbmV3IFdvcmtmbG93KCcxMjM0JywgJzU2NzgnLCBjb25maWcpO1xyXG4gKiAvLyBJZiB0aGVyZSBpcyBhbiBleGlzdGluZyBpbnN0YW5jZVxyXG4gKiB2YXIgd29ya2Zsb3cgPSBuZXcgV29ya2Zsb3coJzEyMzQnLCAnNTY3OCcsIGNvbmZpZywgaW5zdGFuY2UpO1xyXG4gKlxyXG4gKiBAcmV0dXJuIHtPYmplY3R9IG5ldyBXb3JrZmxvdyBvYmplY3RcclxuICpcclxuICogQHRocm93cyBFcnJvcjogQSBwcm9maWxlIGlkIGlzIHJlcXVpcmVkXHJcbiAqIEB0aHJvd3MgRXJyb3I6IEFuIGFwcCBpZCBpcyByZXF1aXJlZFxyXG4gKiBAdGhyb3dzIEVycm9yOiBBIHdvcmtmbG93IGNvbmZpZ3VyYXRpb24gaXMgcmVxdWlyZWRcclxuICpcclxuICovXHJcblxyXG5mdW5jdGlvbiBXb3JrZmxvdyhwcm9maWxlLCBjb21tdW5pdHlJZCwgYXBwLCBjb25maWcpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHJcblx0Ly8gQ29tbXVuaXR5IElEIHZhbGlkYXRpb24gY2hlY2tzXHJcblx0aWYgKGNvbW11bml0eUlkID09ICcnIHx8IGNvbW11bml0eUlkID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRocm93IHV0aWwuZXJyb3IoJ1BhcmFtUmVxdWlyZWQnLCAnQSBjb21tdW5pdHkgaWQgaXMgcmVxdWlyZWQuJyk7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZihjb21tdW5pdHlJZCkgIT09ICdzdHJpbmcnKSB7XHJcbiAgICBcdHRocm93IG5ldyBFcnJvcignVGhlIGNvbW11bml0eSBpZCBtdXN0IGJlIGEgamF2YXNjcmlwdCBzdHJpbmcuJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgXHRfdGhpcy5jb21tdW5pdHlJZCA9IGNvbW11bml0eUlkIHx8ICcnO1xyXG4gICAgfVxyXG5cclxuXHQvLyBQcm9maWxlIElEIHZhbGlkYXRpb24gY2hlY2tzXHJcblx0aWYgKHByb2ZpbGUgPT0gJycgfHwgcHJvZmlsZSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aHJvdyB1dGlsLmVycm9yKCdQYXJhbVJlcXVpcmVkJywgJ0EgcHJvZmlsZSBpZCBpcyByZXF1aXJlZC4nKTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mKHByb2ZpbGUpICE9PSAnc3RyaW5nJykge1xyXG4gICAgXHR0aHJvdyBuZXcgRXJyb3IoJ1RoZSBwcm9maWxlIGlkIG11c3QgYmUgYSBqYXZhc2NyaXB0IHN0cmluZy4nKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICBcdF90aGlzLnByb2ZpbGUgPSBwcm9maWxlIHx8ICcnO1xyXG4gICAgfVxyXG4gICAgLy8gQXBwIElEIHZhbGlkYXRpb24gY2hlY2tzXHJcblx0aWYgKGFwcCA9PSAnJyB8fCBhcHAgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhyb3cgdXRpbC5lcnJvcignUGFyYW1SZXF1aXJlZCcsICdBbiBhcHAgaWQgaXMgcmVxdWlyZWQuJyk7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZihhcHApICE9PSAnc3RyaW5nJykge1xyXG4gICAgXHR0aHJvdyBuZXcgRXJyb3IoJ1RoZSBhcHAgaWQgbXVzdCBiZSBhIGphdmFzY3JpcHQgc3RyaW5nLicpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgIFx0X3RoaXMuYXBwID0gYXBwIHx8ICcnO1xyXG4gICAgfVxyXG4gICAgLy8gV29ya2Zsb3cgY29uZmlndXJhdGlvbiB2YWxpZGF0aW9uIGNoZWNrc1xyXG4gICAgaWYgKGNvbmZpZyA9PSAnJyB8fCBjb25maWcgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBcdHRocm93IHV0aWwuZXJyb3IoJ1BhcmFtUmVxdWlyZWQnLCAnQSB3b3JrZmxvdyBjb25maWd1cmF0aW9uIGlzIHJlcXVpcmVkLicpO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YoY29uZmlnKSAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICBfdGhpcy5jb25maWcgPSBKU09OLnBhcnNlKGNvbmZpZyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgXHRfdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICB9XHJcblx0ICAgIC8vIFdvcmtmbG93IGluc3RhbmNlIHZhbGlkYXRpb24gY2hlY2tzXHJcblx0ICAgIF90aGlzLmluc3RhbmNlO1xyXG5cdFx0Ly8gV29ya2Zsb3cgc3ViLXByb2Nlc3NlcyB2YWxpZGF0aW9uIGNoZWNrc1xyXG5cdFx0X3RoaXMuc3VicHJvY2Vzc2VzID0gW107XHJcblx0XHQvLyBXb3JrZmxvdyBpbmRpY2F0b3JzIHBsYWNlIGhvbGRlclxyXG5cdFx0X3RoaXMuaW5kaWNhdG9ycyA9IFtdO1xyXG5cdFx0Ly8gV29ya2Zsb3cgc3ViLXByb2Nlc3Mgc3RlcCBoaXN0b3J5IHBsYWNlIGhvbGRlclxyXG5cdFx0X3RoaXMuaGlzdG9yeSA9IFtdO1xyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIFdvcmtmbG93IGdldCBwcm9maWxlIGlkLlxyXG4gKlxyXG4gKiBAZXhhbXBsZSBcIlwiXHJcbiAqXHJcbiAqIEByZXR1cm4gXCJcIlxyXG4gKlxyXG4gKi9cclxuV29ya2Zsb3cucHJvdG90eXBlLmdldFByb2ZpbGUgPSBmdW5jdGlvbigpe1xyXG5cdHJldHVybiB0aGlzLnByb2ZpbGU7XHJcbn07XHJcblxyXG4vKipcclxuICogV29ya2Zsb3cgZ2V0IGFwcCBpZC5cclxuICpcclxuICogQGV4YW1wbGUgXCJcIlxyXG4gKlxyXG4gKiBAcmV0dXJuIFwiXCJcclxuICpcclxuICovXHJcbldvcmtmbG93LnByb3RvdHlwZS5nZXRBcHAgPSBmdW5jdGlvbigpe1xyXG5cdHJldHVybiB0aGlzLmFwcDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXb3JrZmxvdyBnZXQgY29uZmlnLlxyXG4gKlxyXG4gKiBAZXhhbXBsZSBcIlwiXHJcbiAqXHJcbiAqIEByZXR1cm4gXCJcIlxyXG4gKlxyXG4gKi9cclxuV29ya2Zsb3cucHJvdG90eXBlLmdldENvbmZpZyA9IGZ1bmN0aW9uKCl7XHJcblx0cmV0dXJuIHRoaXMuY29uZmlnO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdvcmtmbG93IGdldCBpbnN0YW5jZS5cclxuICpcclxuICogQGV4YW1wbGUgXCJcIlxyXG4gKlxyXG4gKiBAcmV0dXJuIFwiXCJcclxuICpcclxuICovXHJcbldvcmtmbG93LnByb3RvdHlwZS5nZXRJbnN0YW5jZSA9IGZ1bmN0aW9uKCl7XHJcblx0cmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbn07XHJcblxyXG4vKipcclxuICogV29ya2Zsb3cgc2V0IHRoZSBpbnN0YW5jZSBkYXRhLlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIHRoZSB3b3JrZmxvdyBwcm9jZXNzIGluc3RhbmNlIGRhdGFcclxuICpcclxuICogQGV4YW1wbGUgXCJcIlxyXG4gKlxyXG4gKiBAcmV0dXJuIFwiXCJcclxuICpcclxuICovXHJcbldvcmtmbG93LnByb3RvdHlwZS5zZXRJbnN0YW5jZSA9IGZ1bmN0aW9uKGRhdGEpe1xyXG5cdHRoaXMuaW5zdGFuY2UgPSBkYXRhO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdvcmtmbG93IGdldCBzdWItcHJvY2Vzc2VzIGRhdGEuXHJcbiAqXHJcbiAqIEBleGFtcGxlIFwiXCJcclxuICpcclxuICogQHJldHVybiBcIlwiXHJcbiAqXHJcbiAqL1xyXG5Xb3JrZmxvdy5wcm90b3R5cGUuZ2V0U3ViUHJvY2Vzc2VzID0gZnVuY3Rpb24oKXtcclxuXHRyZXR1cm4gdGhpcy5zdWJwcm9jZXNzZXM7XHJcbn07XHJcblxyXG4vKipcclxuICogV29ya2Zsb3cgc2V0IHRoZSBzdWItcHJvY2Vzc2VzIGRhdGEuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC0gdGhlIHdvcmtmbG93IHByb2Nlc3MgaW5zdGFuY2UgZGF0YVxyXG4gKlxyXG4gKiBAZXhhbXBsZSBcIlwiXHJcbiAqXHJcbiAqIEByZXR1cm4gXCJcIlxyXG4gKlxyXG4gKi9cclxuV29ya2Zsb3cucHJvdG90eXBlLnNldFN1YlByb2Nlc3NlcyA9IGZ1bmN0aW9uKGRhdGEpe1xyXG5cdHRoaXMuc3VicHJvY2Vzc2VzID0gZGF0YTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXb3JrZmxvdyBnZXQgaW5kaWNhdG9yIHNldCBkYXRhLlxyXG4gKlxyXG4gKiBAZXhhbXBsZSBcIlwiXHJcbiAqXHJcbiAqIEByZXR1cm4gXCJcIlxyXG4gKlxyXG4gKi9cclxuV29ya2Zsb3cucHJvdG90eXBlLmdldEluZGljYXRvcnMgPSBmdW5jdGlvbigpe1xyXG5cdHJldHVybiB0aGlzLmluZGljYXRvcnM7XHJcbn07XHJcblxyXG4vKipcclxuICogV29ya2Zsb3cgc2V0IHRoZSBpbmRpY2F0b3Igc2V0IGRhdGEuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC0gdGhlIHdvcmtmbG93IHByb2Nlc3MgaW5zdGFuY2UgZGF0YVxyXG4gKlxyXG4gKiBAZXhhbXBsZSBcIlwiXHJcbiAqXHJcbiAqIEByZXR1cm4gXCJcIlxyXG4gKlxyXG4gKi9cclxuV29ya2Zsb3cucHJvdG90eXBlLnNldEluZGljYXRvcnMgPSBmdW5jdGlvbihkYXRhKXtcclxuXHR0aGlzLmluZGljYXRvcnMgPSBkYXRhO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgdmFyaWFibGUgdmFsdWUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBwcm9jZXNzIGlkXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHByb2Nlc3Mgc2VxXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdWJQcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdWItcHJvY2VzcyBpZFxyXG4gKiBAcGFyYW0ge251bWJlcn0gc3ViUHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBzdWItcHJvY2VzcyBzZXFcclxuICogQHBhcmFtIHtzdHJpbmd9IHN0ZXBJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN0ZXAgaWRcclxuICogQHBhcmFtIHtPYmplY3R9IHZhcmlhYmxlIC0gdGhlIFdvcmtmbG93IHZhcmlhYmxlIG9iamVjdFxyXG4gKlxyXG4gKiBAZXhhbXBsZSAnJ1xyXG4gKlxyXG4gKiBAcmV0dXJuICcnXHJcbiAqXHJcbiAqL1xyXG4vLyBXb3JrZmxvdy5wcm90b3R5cGUuc2V0VmFyaWFibGUgPSBmdW5jdGlvbihwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3RlcElkLCB2YXJpYWJsZSl7XHJcbi8vIFx0dmFyIF90aGlzID0gdGhpcztcclxuLy8gXHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbi8vIFx0XHR0cnkge1xyXG4vLyBcdFx0XHRQcm9jZXNzLmdldFZhcmlhYmxlKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdGVwSWQsIHZhcmlhYmxlKS50aGVuKGZ1bmNpb24ocmVzdWx0KXtcclxuLy8gXHRcdFx0XHRyZXNvbHZlKHJlc3VsdC5kYXRhKTtcclxuLy8gXHRcdFx0fSwgZnVuY3Rpb24oZXJyKXtcclxuLy8gXHRcdFx0XHRyZWplY3QoZXJyKTtcclxuLy8gXHRcdFx0fSlcclxuLy8gXHRcdH0gY2F0Y2ggKGVycikge1xyXG4vLyBcdFx0XHRyZWplY3QoZXJyKTtcclxuLy8gXHRcdH1cclxuLy8gXHR9KTtcclxuLy8gfTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIHZhcmlhYmxlIHZhbHVlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gcHJvY2VzcyBpZFxyXG4gKiBAcGFyYW0ge251bWJlcn0gcHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBwcm9jZXNzIHNlcVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3ViUHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3ViLXByb2Nlc3MgaWRcclxuICogQHBhcmFtIHtudW1iZXJ9IHN1YlByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2Ugc3ViLXByb2Nlc3Mgc2VxXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdGVwSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdGVwIGlkXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSB0aGUgV29ya2Zsb3cgdmFyaWFibGUgaWRcclxuICpcclxuICogQGV4YW1wbGUgJydcclxuICpcclxuICogQHJldHVybiAnJ1xyXG4gKlxyXG4gKi9cclxuLy8gV29ya2Zsb3cucHJvdG90eXBlLmdldFZhcmlhYmxlID0gZnVuY3Rpb24ocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwga2V5KXtcclxuLy8gXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG4vLyBcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuLy8gXHRcdHRyeSB7XHJcbi8vIFx0XHRcdFByb2Nlc3Muc2V0VmFyaWFibGUocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwga2V5KS50aGVuKGZ1bmNpb24ocmVzdWx0KXtcclxuLy8gXHRcdFx0XHRyZXNvbHZlKHJlc3VsdC5kYXRhKTtcclxuLy8gXHRcdFx0fSwgZnVuY3Rpb24oZXJyKXtcclxuLy8gXHRcdFx0XHRyZWplY3QoZXJyKTtcclxuLy8gXHRcdFx0fSlcclxuLy8gXHRcdH0gY2F0Y2ggKGVycikge1xyXG4vLyBcdFx0XHRyZWplY3QoZXJyKTtcclxuLy8gXHRcdH1cclxuLy8gXHR9KTtcclxuLy8gfTtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIG1ldGhvZCBjcmVhdGVzIGEgbmV3IHdvcmtmbG93IHByb2Nlc3MgaS5lLiBpdCBjcmVhdGVzIGEgd29ya2Zsb3cgcHJvY2Vzc2VzIGluc3RhbmNlXHJcbiAqIG9iamVjdCB3aXRoIHRoZSBtaW5pbXVtIHJlcXVpcmVkIGRhdGEuIFRoaXMgaW5zdGFuY2UgY2FuIGJlIHJlZmVyZW5jZWQgaW4gdGhlIGZvbGxvd2luZ1xyXG4gKiB3YXksIHNlZSBleGFtcGxlIGJlbG93LlxyXG4gKlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgY29uZmlnID0geyAnX2lkJzogJ2FiYzEyMycgfTtcclxuICogdmFyIHdvcmtmbG93ID0gbmV3IFdvcmtmbG93KCcxMjM0JywgJzU2NzgnLCBjb25maWcpO1xyXG4gKiB3b3JrZmxvdy5jcmVhdGUoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XHJcbiAqXHRjb25zb2xlLmxvZyhyZXN1bHQubWVzc2FnZSk7XHJcbiAqXHQvLyBUaGUgZm9sbG93aW5nIHByb3BlcnRpZXMgY2FuIG5vdyBiZSBhY2Nlc3NlZFxyXG4gKiBcdHZhciBwcm9maWxlID0gd29ya2Zsb3cucHJvZmlsZTtcclxuICogXHR2YXIgYXBwID0gd29ya2Zsb3cuYXBwO1xyXG4gKiBcdHZhciBjb25maWcgPSB3b3JrZmxvdy5jb25maWc7XHJcbiAqXHQvLyBPbiBzdWNjZXNzIHlvdSBjYW4gYWNjZXNzIHRoZSBpbnN0YW5jZSB0aGUgZm9sbG93aW5nIHdheVxyXG4gKlx0dmFyIGluc3RhbmNlID0gd29ya2Zsb3cuaW5zdGFuY2U7XHJcbiAqIH0sIGZ1bmN0aW9uKGVycm9yKXtcclxuICpcdGNvbnNvbGUubG9nKGVycm9yKTtcclxuICogfSk7XHJcbiAqXHJcbiAqIEByZXR1cm4ge09iamVjdH0gbmV3IFdvcmtmbG93IGluc3RhbmNlIHdpdGggdXBkYXRlZCBpbnN0YW5jZSBkYXRhLlxyXG4gKlxyXG4gKi9cclxuV29ya2Zsb3cucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRpZiAoX3RoaXMuaW5zdGFuY2UgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdHZhciB3YXJuID0gdXRpbC53YXJuKCdJbnN0YW5jZSBhbHJlYWR5IGV4aXN0cy4nLCBfdGhpcylcclxuXHRcdFx0XHRyZXNvbHZlKHdhcm4pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdC8vIENyZWF0ZSB0aGUgd29ya2Zsb3cgcHJvY2Vzc2VzIGluc3RhbmNlIG9iamVjdFxyXG5cdFx0XHRcdHZhciBtb2RlbCA9IHtcclxuXHRcdFx0XHQgICAgX2lkOiAnJyxcclxuXHRcdFx0XHQgICAgdmVyc2lvbjogJycsXHJcblx0XHRcdFx0ICAgIHR5cGU6ICd3b3JrZmxvd0luc3RhbmNlJyxcclxuXHRcdFx0XHQgICAgcHJvY2Vzc2VzOiBbXSxcclxuXHRcdFx0XHQgICAgY2hhbm5lbHM6W1xyXG5cdFx0XHRcdCAgICBcdFwiY29tbXVuaXR5X1wiK2FwcC5TQ09QRS5jb21tdW5pdHlJZCAsXHJcblx0XHRcdFx0ICAgIFx0XCJwcm9maWxlX1wiKyBhcHAuU0NPUEUucHJvZmlsZUlkICxcclxuXHRcdFx0XHQgICAgXHRcImFwcGxpY2F0aW9uX1wiK2FwcC5TQ09QRS5hcHBsaWNhdGlvbklkLFxyXG5cdFx0XHRcdCAgICBcdFwiY29tbXVuaXR5X1wiK2FwcC5TQ09QRS5jb21tdW5pdHlJZCtcIl9hcHBsaWNhdGlvbl9cIithcHAuU0NPUEUuYXBwbGljYXRpb25JZFxyXG5cdFx0XHRcdCAgICBdXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHRtb2RlbC5faWQgPSBfdGhpcy5wcm9maWxlICsgJzpwcm9jZXNzZXMnO1xyXG5cdFx0XHRcdG1vZGVsLnZlcnNpb24gPSBfdGhpcy5jb25maWcudmVyc2lvbjtcclxuXHRcdFx0XHRfdGhpcy5pbnN0YW5jZSA9IG1vZGVsO1xyXG5cdFx0XHRcdHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdXb3JrZmxvdyBwcm9jZXNzZXMgaW5zdGFuY2UgY3JlYXRlZCBzdWNjZXNzZnVsbHkuJywgX3RoaXMpO1xyXG5cdFx0XHRcdHJlc29sdmUoc3VjY2Vzcyk7XHJcblxyXG5cdFx0XHR9XHJcblx0XHR9IGNhdGNoIChlcnIpIHtcclxuXHRcdFx0cmVqZWN0KGVycik7XHJcblx0XHR9XHJcblx0fSk7XHJcbn07XHJcblxyXG4vKipcclxuICogV29ya2Zsb3cgaW5pdGlhbGlzZSwgdGhpcyBmdW5jdGlvbiBleGVjdXRlcyBhIHByb2Nlc3Mgd2l0aGluIGEgd29ya2Zsb3dcclxuICogY29uZmlndXJhdGlvbi5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NJZCAtIHRoZSBwcm9jZXNzIGlkIHRvIHByb2Nlc3NcclxuICogQHBhcmFtIHtvYmplY3R9IFtkYXRhXSAtIHRoZSBpbnB1dCBkYXRhIHRvIHByb2Nlc3NcclxuICpcclxuICogQGV4YW1wbGVcclxuICogV29ya2Zsb3cuaW5pdGlhbGlzZSgncHJvY2Vzc0lkJywgeyB2YWxpZERhdGU6ICdkYXRlJyB9KTtcclxuICpcclxuICogQHJldHVybiBcIlwiXHJcbiAqXHJcbiAqL1xyXG5Xb3JrZmxvdy5wcm90b3R5cGUuaW5pdGlhbGlzZSA9IGZ1bmN0aW9uKHByb2Nlc3NJZCwgZGF0YSl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHR2YXIgY29uZmlnUHJvY2VzcyA9IFtdO1xyXG5cdFx0XHQvLyBDaGVjayB0aGUgcGFzc2VkIGluIHBhcmFtZXRlcnNcclxuXHRcdFx0aWYgKHByb2Nlc3NJZCAhPT0gJycgJiYgcHJvY2Vzc0lkICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHQvLyBHZXQgdGhlIGN1cnJlbnQgcHJvY2VzcyBjb25maWdcclxuXHRcdFx0XHRjb25maWdQcm9jZXNzID0gX3RoaXMuY29uZmlnLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqUHJvY2Vzcyl7XHJcblx0XHRcdFx0XHRpZiAob2JqUHJvY2Vzcy5faWQgPT0gcHJvY2Vzc0lkKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBvYmpQcm9jZXNzO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdGlmIChjb25maWdQcm9jZXNzWzBdLl9pZCA9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRcdHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGQ29uZmlnRXJyb3InLCAnTm8gdmFsaWQgcHJvY2VzcyBkZWZpbml0aW9uIGZvdW5kIHdpdGggcHJvY2VzcyBpZDogJyArIHByb2Nlc3NJZCk7XHJcblx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRjb25maWdQcm9jZXNzLnB1c2goX3RoaXMuY29uZmlnLnByb2Nlc3Nlc1swXSk7XHJcblx0XHRcdFx0cHJvY2Vzc0lkID0gX3RoaXMuY29uZmlnLnByb2Nlc3Nlc1swXS5faWQ7XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gR2V0IHRoZSBjdXJyZW50IGxpc3Qgb2YgcHJvY2VzcyBpbnN0YW5jZXNcclxuXHRcdFx0Ly8gdmFyIHByb2Nlc3NTZXEgPSAxO1xyXG5cdFx0XHR2YXIgY3VycmVudFByb2Nlc3MgPSBbXTtcclxuXHRcdFx0X3RoaXMuaW5zdGFuY2UucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihwcm9jZXNzSXRlbSl7XHJcblx0XHRcdFx0aWYgKHByb2Nlc3NJdGVtLmlkID09IHByb2Nlc3NJZCkge1xyXG5cdFx0XHRcdFx0Y3VycmVudFByb2Nlc3MucHVzaChwcm9jZXNzSXRlbSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0dmFyIHByb2Nlc3NTZXEgPSBjdXJyZW50UHJvY2Vzcy5sZW5ndGggKyAxO1xyXG5cdFx0XHQvLyB2YXIgbmV4dFNlcSA9IHByb2Nlc3NTZXEgKyAxO1xyXG5cdFx0XHQvLyBQdXNoIHRoZSBwcm9jZXNzIG9iamVjdCBpbnRvIHRoZSBhcnJheVxyXG5cdFx0XHR2YXIgcHJvY2Vzc01vZGVsID0ge1xyXG5cdFx0XHRcdGlkOiAnJyxcclxuXHRcdFx0XHRzZXE6ICcnLFxyXG5cdFx0XHRcdHN1YlByb2Nlc3NlczogW10sXHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gMS4gVXBkYXRlIHRoZSBwcm9jZXNzIGlkIGFuZCBzZXFcclxuXHRcdFx0cHJvY2Vzc01vZGVsLmlkID0gcHJvY2Vzc0lkO1xyXG5cdFx0XHRwcm9jZXNzTW9kZWwuc2VxID0gcHJvY2Vzc1NlcTtcclxuXHRcdFx0X3RoaXMuaW5zdGFuY2UucHJvY2Vzc2VzLnB1c2gocHJvY2Vzc01vZGVsKTtcclxuXHRcdFx0Ly8gUGFyYW1ldGVyc1xyXG5cdFx0XHR2YXIgc3ViUHJvY2Vzc0lkID0gY29uZmlnUHJvY2Vzc1swXS5zdWJQcm9jZXNzZXNbMF0uX2lkO1xyXG5cdFx0XHR2YXIgc3ViUHJvY2Vzc1NlcSA9IDE7XHJcblx0XHRcdF90aGlzLmluc3RhbmNlLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ocHJvY2Vzc0l0ZW0pe1xyXG5cdFx0XHRcdGlmIChwcm9jZXNzSXRlbS5pZCA9PSBwcm9jZXNzSWQgJiYgcHJvY2Vzc0l0ZW0uc2VxID09IHByb2Nlc3NTZXEpIHtcclxuXHRcdFx0XHRcdHN1YlByb2Nlc3NTZXEgPSBwcm9jZXNzSXRlbS5zdWJQcm9jZXNzZXMubGVuZ3RoICsgMVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdFx0Ly8gQ2FsbCB0aGUgc3VicHJvY2VzcyBtZXRob2RcclxuXHRcdFx0XHJcblx0XHRcdFxyXG5cclxuXHRcdFx0UHJvY2Vzcy5zdWJQcm9jZXNzKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBkYXRhLCBfdGhpcykudGhlbihmdW5jdGlvbihzdWJQcm9jZXNzKXtcclxuXHRcdFx0XHQvLyBHZW5lcmF0ZSB0aGUgdXVpZFxyXG5cdFx0XHRcdFxyXG5cclxuXHRcdFx0XHR2YXIgdXVpZCA9IF90aGlzLnByb2ZpbGUgKyAnOicgKyBfdGhpcy5hcHAgKyAnOicgKyBwcm9jZXNzSWQgKyAnOicgKyBwcm9jZXNzU2VxICsgJzonICsgc3ViUHJvY2Vzc0lkICsgJzonICsgc3ViUHJvY2Vzc1NlcTtcclxuXHRcdFx0XHR2YXIgbGFiZWwgPSBkYXRhLmxhYmVsO1xyXG5cdFx0XHRcdC8vIEJ1aWxkIHRoZSBzdWItcHJvY2VzcyByZWZlcmVuY2Ugb2JqZWN0XHJcblxyXG5cdFx0XHRcdC8vVE9ETzogQ2hhbmdlIHJlcXVpcmVkIHRvIG1vdmUgaXNBY3RpdmUgdG8gc3ViUHJvY2VzcyBmaWxlLlJlbW92ZSBmcm9tIGhlcmVcclxuXHJcblxyXG5cdFx0XHRcdHZhciBzdWJQcm9jZXNzUmVmID0ge1xyXG5cdFx0XHRcdFx0aWQ6IHN1YlByb2Nlc3NJZCxcclxuXHRcdFx0XHRcdHNlcTogc3ViUHJvY2Vzc1NlcSxcclxuXHRcdFx0XHRcdHV1aWQ6IHV1aWQsXHJcblx0XHRcdFx0XHRsYWJlbDpsYWJlbFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBBZGQgdGhlIHJlZmVyZW5jZSB0byB0aGUgcHJvY2VzcyBtb2RlbFxyXG5cdFx0XHRcdHByb2Nlc3NNb2RlbC5zdWJQcm9jZXNzZXMucHVzaChzdWJQcm9jZXNzUmVmKTtcclxuXHRcdFx0XHQvLyBBZGQgdGhlIHN1YlByb2Nlc3MgbW9kZWwgdG8gdGhlIHN1YnByb2Nlc3NlcyBhcnJheVxyXG5cdFx0XHRcdC8vX3RoaXMuc3VicHJvY2Vzc2VzLnB1c2goc3ViUHJvY2Vzcy5kYXRhKTtcclxuXHRcdFx0XHQvLyBfdGhpcy5pbnN0YW5jZS5wcm9jZXNzZXMucHVzaChwcm9jZXNzTW9kZWwpO1xyXG5cdFx0XHRcdGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBfdGhpcy5pbnN0YW5jZS5wcm9jZXNzZXMubGVuZ3RoOyBpbmRleCsrKXtcclxuXHRcdFx0XHRcdHZhciBwcm9jZXNzSXRlbSA9IF90aGlzLmluc3RhbmNlLnByb2Nlc3Nlc1tpbmRleF07XHJcblx0XHRcdFx0XHRpZiAocHJvY2Vzc0l0ZW0uaWQgPT0gcHJvY2Vzc0lkICYmIHByb2Nlc3NJdGVtLnNlcSA9PSBwcm9jZXNzU2VxKSB7XHJcblx0XHRcdFx0XHRcdC8vIFJlbW92ZSB0aGUgY3VycmVudCBwcm9jZXNzIGZyb20gdGhlIGFycmF5IGFuZCBhZGQgdGhlIHVwZGF0ZWQgcHJvY2Vzc01vZGVsXHJcblx0XHRcdFx0XHRcdF90aGlzLmluc3RhbmNlLnByb2Nlc3Nlcy5zcGxpY2UoaW5kZXgsIDEsIHByb2Nlc3NNb2RlbClcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHRcclxuXHRcdFx0XHQvLyBQcm9jZXNzIHRoZSBpbmRpY2F0b3IgZG9jdW1lbnRzIHdvcmtmbG93IHByb2Nlc3NlcyB1cGRhdGVzXHJcblx0XHRcdFx0dmFyIGluZGljYXRvcnMgPSBzdWJQcm9jZXNzLmRhdGEuaW5kaWNhdG9ycztcclxuXHRcdFx0XHR2YXIgc3RlcCA9IHN1YlByb2Nlc3MuZGF0YS5zdGVwO1xyXG5cdFx0XHRcdFByb2Nlc3MuaW5kaWNhdG9yRG9jcyhwcm9jZXNzSWQsIGluZGljYXRvcnMsIHN0ZXAsIF90aGlzKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XHJcblx0XHRcdFx0XHR2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnUHJvY2VzczogJyArIF90aGlzLmNvbmZpZy5wcm9jZXNzZXNbMF0uX2lkICsgJyBpbml0aWFsaXplZCBzdWNjZXNzZnVsbHkuJywgX3RoaXMpO1xyXG5cdFx0XHRcdFx0cmVzb2x2ZShzdWNjZXNzKTtcclxuXHRcdFx0XHR9LCBmdW5jdGlvbihlcnIpe1xyXG5cdFx0XHRcdFx0cmVqZWN0KGVycik7XHJcblx0XHRcdFx0fSlcclxuXHJcblxyXG5cdFx0XHRcdFxyXG5cclxuXHJcblxyXG5cclxuXHRcdFx0fSwgZnVuY3Rpb24oZXJyKXtcclxuXHRcdFx0XHRfdGhpcy5pbnN0YW5jZS5wcm9jZXNzZXMgPSBfdGhpcy5pbnN0YW5jZS5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKCBvYmogKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gIShvYmouaWQgPT0gcHJvY2Vzc0lkICYmIG9iai5zZXEgPT0gcHJvY2Vzc1NlcSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZXJyKTtcclxuXHRcdFx0XHRyZWplY3QoZXJyKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9IGNhdGNoKGVycikge1xyXG5cdFx0XHRyZWplY3QoZXJyKTtcclxuXHRcdH1cclxuXHR9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXb3JrZmxvdyB0cmFuc2l0aW9uIHRvIHRoZSBuZXh0IHN0ZXAuIFRoaXMgbW92ZXMgdGhlIHdvcmtmbG93IGZyb20gdGhlIGN1cnJlbnQgcHJvY2VzcyxcclxuICogc3ViLXByb2Nlc3Mgc3RlcCB0byB0aGUgbmV4dCBvbmUgYXMgc3BlY2lmaWVkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gcHJvY2VzcyBpZFxyXG4gKiBAcGFyYW0ge251bWJlcn0gcHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBwcm9jZXNzIHNlcVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3ViUHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3ViLXByb2Nlc3MgaWRcclxuICogQHBhcmFtIHtudW1iZXJ9IHN1YlByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2Ugc3ViLXByb2Nlc3Mgc2VxXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdGVwSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdGVwIGlkXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0cmFuc2l0aW9uSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiB0cmFuc2l0aW9uIGlkXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIC0gYW55IGFkZGl0aW9uYWwgZGF0YSBwYXNzZWQgaW4gYXMga2V5IHZhbHVlIHBhaXJzXHJcbiAqXHJcbiAqIEBleGFtcGxlXHJcbiAqIFdvcmtmbG93LnRyYW5zaXRpb24oJ3Byb2Nlc3NJZCcsIDEsICdzdWJQcm9jZXNzSWQnLCAxLCAnc3RlcElkJywgJ3RyYW5zaXRpb25JZCcsIHsga2V5OiAnJywgdmFsdWU6ICcnIH0pO1xyXG4gKlxyXG4gKiBAcmV0dXJuIFwiXCJcclxuICpcclxuICovXHJcbldvcmtmbG93LnByb3RvdHlwZS50cmFuc2l0aW9uID0gZnVuY3Rpb24ocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwgdHJhbnNpdGlvbklkLCBkYXRhKXtcclxuXHQvLyBSZS1hc3NpZ24gdGhpc1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0UHJvY2Vzcy50cmFuc2l0aW9uKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdGVwSWQsIHRyYW5zaXRpb25JZCwgZGF0YSwgX3RoaXMpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcclxuXHJcblx0XHRcdFx0XHJcblx0XHRcdFx0Ly8gVXBkYXRlIHRoZSBjdXJyZW50IHN1Yi1wcm9jZXNzIHN0ZXAgZGF0YVxyXG5cdFx0XHRcdHZhciB1cGRhdGUgPSBmdW5jdGlvbih0eXBlKXtcclxuXHRcdFx0XHRcdF90aGlzLmluc3RhbmNlLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ocHJvY2Vzc0l0ZW0pe1xyXG5cdFx0XHRcdFx0XHRpZiAocHJvY2Vzc0l0ZW0uaWQgPT0gcHJvY2Vzc0lkICYmIHByb2Nlc3NJdGVtLnNlcSA9PSBwcm9jZXNzU2VxKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHRcdHByb2Nlc3NJdGVtLnN1YlByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24oc3ViUHJvY2Vzc0l0ZW0pe1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKHN1YlByb2Nlc3NJdGVtLmlkID09IHN1YlByb2Nlc3NJZCAmJiBzdWJQcm9jZXNzSXRlbS5zZXEgPT0gc3ViUHJvY2Vzc1NlcSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdF90aGlzLnN1YnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24oc3ViUHJvY2Vzc09iail7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKHN1YlByb2Nlc3NPYmouX2lkID09IHN1YlByb2Nlc3NJdGVtLnV1aWQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKHR5cGUgPT0gJ3N0ZXAnKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdWJQcm9jZXNzT2JqLnN0ZXAgPSByZXN1bHQuZGF0YTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MocmVzdWx0Lm1lc3NhZ2UsIHN1YlByb2Nlc3NPYmopO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJlc29sdmUoc3VjY2Vzcyk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKHR5cGUgPT0gJ3N0ZXBDb21wbGV0ZScpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3ViUHJvY2Vzc09iai5zdGVwID0gcmVzdWx0LmRhdGEuc3RlcDtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3ViUHJvY2Vzc09iai5jb21wbGV0ZSA9IHRydWVcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MocmVzdWx0Lm1lc3NhZ2UsIHN1YlByb2Nlc3NPYmopO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmVzb2x2ZShzdWNjZXNzKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKHJlc3VsdC5kYXRhLnN1YlByb2Nlc3NDb21wbGV0ZSkge1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHR1cGRhdGUoJ3N0ZXBDb21wbGV0ZScpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdHVwZGF0ZSgnc3RlcCcpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSwgZnVuY3Rpb24oZXJyKXtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRyZWplY3QoZXJyKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9IGNhdGNoKGVycikge1xyXG5cdFx0XHRcclxuXHRcdFx0cmVqZWN0KGVycik7XHJcblx0XHR9XHJcblx0fSk7XHJcbn07XHJcblxyXG4vKipcclxuICogV29ya2Zsb3cgYXNzaWduIHVzZXIuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBwcm9jZXNzIGlkXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHByb2Nlc3Mgc2VxXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdWJQcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdWItcHJvY2VzcyBpZFxyXG4gKiBAcGFyYW0ge251bWJlcn0gc3ViUHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBzdWItcHJvY2VzcyBzZXFcclxuICogQHBhcmFtIHtzdHJpbmd9IHN0ZXBJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN0ZXAgaWRcclxuICogQHBhcmFtIHtvYmplY3R9IHVzZXIgLSB0aGUgdXNlciBpZCBhbmQgbmFtZSBkYXRhXHJcbiAqXHJcbiAqIEBleGFtcGxlIFwiXCJcclxuICpcclxuICogQHJldHVybiBcIlwiXHJcbiAqXHJcbiAqL1xyXG5Xb3JrZmxvdy5wcm90b3R5cGUuYXNzaWduVXNlciA9IGZ1bmN0aW9uKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCB1c2VyKXtcclxuXHQvLyBSZS1hc3NpZ24gdGhlIFdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlIGFzIF90aGlzXHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRQcm9jZXNzLmFzc2lnblVzZXIocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHVzZXIsIF90aGlzKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XHJcblx0XHRcdFx0cmVzb2x2ZShyZXN1bHQpO1xyXG5cdFx0XHR9LCBmdW5jdGlvbihlcnIpe1xyXG5cdFx0XHRcdHJlamVjdChlcnIpO1xyXG5cdFx0XHR9KVxyXG5cdFx0fSBjYXRjaChlcnIpIHtcclxuXHRcdFx0cmVqZWN0KGVycik7XHJcblx0XHR9XHJcblx0fSlcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXb3JrZmxvdyB0YXNrLCB0aGlzIG1ldGhvZCBleGVjdXRlcyBhIHNwZWNpZmljIHRhc2suXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9jZXNzSWQgLSB0aGUgcHJvY2VzcyBpZCB0byBwcm9jZXNzXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dERhdGEgLSB0aGUgaW5wdXQgZGF0YSB0byBwcm9jZXNzXHJcbiAqXHJcbiAqIEBleGFtcGxlXHJcbiAqIFdvcmtmbG93LmluaXRpYWxpemUoJ3Byb2Nlc3NJZCcsIHsgdmFsaWREYXRlOiAnZGF0ZScgfSk7XHJcbiAqXHJcbiAqIEByZXR1cm4gXCJcIlxyXG4gKlxyXG4gKi9cclxuV29ya2Zsb3cucHJvdG90eXBlLnVpID0gZnVuY3Rpb24oKXtcclxuXHQvLyBSZS1hc3NpZ24gdGhlIFdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlIGFzIF90aGlzXHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHRyZXR1cm4ge1xyXG5cdFx0Z2V0UHJvY2VzczogZnVuY3Rpb24ocHJvY2Vzc0lkLCBsYW5nKXtcclxuXHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHR1c2VySW50ZXJmYWNlLmdldFByb2Nlc3MocHJvY2Vzc0lkLCBsYW5nLCBfdGhpcykudGhlbihmdW5jdGlvbihtb2RlbCl7XHJcblx0XHRcdFx0XHRcdHJlc29sdmUobW9kZWwpO1xyXG5cdFx0XHRcdFx0fSwgZnVuY3Rpb24oZXJyKXtcclxuXHRcdFx0XHRcdFx0cmVqZWN0KGVycik7XHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdH0gY2F0Y2goZXJyKSB7XHJcblx0XHRcdFx0XHRyZWplY3QoZXJyKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG5cclxuXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBXb3JrZmxvdztcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsaXR5Jyk7XHJcbi8qKlxyXG4gKiBBY3Rpb25zIE1vZHVsZVxyXG4gKlxyXG4gKiBAbW9kdWxlIGxpYi9hY3Rpb25zXHJcbiAqIEBhdXRob3IgSGFzYW4gQWJiYXNcclxuICogQHZlcnNpb24gMi4wLjBcclxuICogQGRlc2NyaXB0aW9uIHRlc3QgZGVzY3JpcHRpb25cclxuICogQGNvcHlyaWdodCBLd2FudHUgTHRkIFJTQSAyMDA5LTIwMTUuXHJcbiAqXHJcbiAqL1xyXG5cclxuXHJcbnZhciBjb21tdW5pdHkgPSAoZnVuY3Rpb24oKSB7XHJcblxyXG5cclxuICAgIHJldHVybiB7XHJcblxyXG4gICAgICAgIGNyZWF0ZUNvbW11bml0eTogZnVuY3Rpb24ocGFyYW0xKSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHBhcmFtMSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldFZhcmlhYmxlOiBmdW5jdGlvbihwYXJhbTEpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHVzZXJKb2luQ29tbXVuaXR5OiBmdW5jdGlvbihwYXJhbTEpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICB9XHJcblxyXG59KSgpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gICAgY29tbXVuaXR5OiBjb21tdW5pdHlcclxuXHJcbn0iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vL3ZhciBnYXRla2VlcGVyID0gcmVxdWlyZSgnLi4vYm93ZXJfY29tcG9uZW50cy9nYXRla2VlcGVyJyk7XHJcbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbGl0eScpO1xyXG5cclxuLy8gdmFyIHV1aWQgPSByZXF1aXJlKCdub2RlLXV1aWQnKTtcclxuXHJcbnZhciBnYXRla2VlcGVyID0gbmV3IEdLKCk7XHJcblxyXG4vKipcclxuICogRm9ybSBNb2R1bGVcclxuICpcclxuICogQG1vZHVsZSBsaWIvZm9ybVxyXG4gKiBAYXV0aG9yIEJyZW50IEdvcmRvblxyXG4gKiBAdmVyc2lvbiAyLjAuMFxyXG4gKiBAZGVzY3JpcHRpb24gdGVzdCBkZXNjcmlwdGlvblxyXG4gKiBAY29weXJpZ2h0IEt3YW50dSBMdGQgUlNBIDIwMDktMjAxNS5cclxuICpcclxuICovXHJcblxyXG5mdW5jdGlvbiBjcmVhdGUoYXJncykge1xyXG5cclxuICAgIHZhciBwcm9jZXNzSWQgPSBhcmdzWzBdIHx8ICcnO1xyXG5cclxuICAgIHZhciBzdWJQcm9jZXNzID0gYXJnc1sxXSB8fCB7fTtcclxuXHJcbiAgICB2YXIgc3RlcCA9IGFyZ3NbMl0gfHwge307XHJcblxyXG4gICAgdmFyIGFjdGlvbiA9IGFyZ3NbM10gfHwge307XHJcblxyXG4gICAgdmFyIF9XRkluc3RhbmNlID0gYXJnc1s2XSB8fCB7fTtcclxuXHJcbiAgICB2YXIgZGF0YSA9IGFyZ3NbNl0gfHwge307XHJcblxyXG4gICAgdmFyIGluZGljYXRvcnMgPSBzdWJQcm9jZXNzLmluZGljYXRvcnMgfHwgW107XHJcblxyXG4gICAgdmFyIHJlc3VsdCA9IFtdO1xyXG5cclxuICAgIHZhciBpbmRpY2F0b3JUeXBlID0gYWN0aW9uLl90eXBlO1xyXG5cclxuICAgIHZhciBwcm9jZXNzU2VxID0gYXJnc1s0XSB8fCAnJztcclxuXHJcbiAgICB2YXIgc3ViUHJvY2Vzc1NlcSA9IGFyZ3NbNV0gfHwgJyc7XHJcblxyXG4gICAgdmFyIGNyZWF0ZVR5cGUgPSBhcmdzWzddIHx8ICcnO1xyXG5cclxuICAgIHZhciBzdWJQcm9jZXNzSWQgPSBzdWJQcm9jZXNzLl9pZDtcclxuXHJcbiAgICB2YXIgdXVpZCA9IGFyZ3NbOF0gfHwgJyc7XHJcblxyXG4gICAgdmFyIGJhc2VVVUlEID0gYXJnc1s5XSB8fCAnJztcclxuXHJcbiAgICB2YXIgcHJvZmlsZSA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XHJcblxyXG5cclxuXHJcbiAgICB2YXIgaW5wdXREYXRhID0gYXJnc1sxMF0gfHwge307XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHZhciB0b1Byb2Nlc3MgPSBpbmRpY2F0b3JzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgdmFyIGZvcm1DcmVhdGVGbiA9IGZ1bmN0aW9uKGlkLCBpbmRpY2F0b3JUeXBlLCBpbmRpY2F0b3JJZCwgdmFsaWREYXRlLCBpbnN0YW50aWF0ZVNvdXJjZSkge1xyXG5cclxuICAgICAgICAgICAgZ2F0ZWtlZXBlci5pbnN0YW50aWF0ZShpZCwgaW5kaWNhdG9yVHlwZSwgaW5kaWNhdG9ySWQsIF9XRkluc3RhbmNlLnByb2ZpbGUsIHZhbGlkRGF0ZSkudGhlbihmdW5jdGlvbihkb2NBcnJheSkge1xyXG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBpbmRpY2F0b3Igd29ya2Zsb3cgcHJvY2Vzc2VzIHNlY3Rpb25cclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRvY0FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9iamVjdCA9IGRvY0FycmF5W2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghb2JqZWN0Lm1vZGVsLl9pZC5lbmRzV2l0aCgnOmFwcHJvdmVkJykgJiYgIW9iamVjdC5tb2RlbC5faWQuZW5kc1dpdGgoJzpyZWplY3RlZCcpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgd29ya2Zsb3dPYmogPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IF9XRkluc3RhbmNlLmNvbmZpZy5faWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImluc3RhbmNlXCI6IF9XRkluc3RhbmNlLmluc3RhbmNlLl9pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvY2Vzc2VzXCI6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBwcm9jZXNzSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJQcm9jZXNzSWRcIjogc3ViUHJvY2Vzcy5faWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJQcm9jZXNzVVVJRFwiOiB1dWlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3RlcFwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogc3RlcC5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZXFcIjogc3RlcC5zZXEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3RhcnREYXRlXCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3RhdHVzXCI6IHN0ZXAuc3RhdHVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogc3RlcC5tZXNzYWdlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFzc2lnbmVkVG9cIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VySWRcIjogc3RlcC5hc3NpZ25lZFRvLnVzZXJJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBzdGVwLmFzc2lnbmVkVG8ubmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbW1lbnRcIjogc3RlcC5jb21tZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbXBsZXRlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImVuZERhdGVcIjogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24uc2V0V29ya2Zsb3dMYWJlbEluVGl0bGUgIT0gdW5kZWZpbmVkICYmIGFjdGlvbi5zZXRXb3JrZmxvd0xhYmVsSW5UaXRsZSAhPSAnJyAmJiBhY3Rpb24uc2V0V29ya2Zsb3dMYWJlbEluVGl0bGUgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0Lm1vZGVsLnRpdGxlID0gaW5wdXREYXRhLmxhYmVsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uLnNldERyYWZ0ICE9IHVuZGVmaW5lZCAmJiBhY3Rpb24uc2V0RHJhZnQgIT0gJycgJiYgYWN0aW9uLnNldERyYWZ0ID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdC5tb2RlbC5jb250cm9sLmRyYWZ0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdC5tb2RlbC53b3JrZmxvd3MucHVzaCh3b3JrZmxvd09iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYWluSWQgPSBvYmplY3QubW9kZWwuX2lkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwZXJzaXN0IHZpYSBnayBzbyB0aGF0IGl0IGlzIHNhdmUgaW4gY291Y2hcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2F0ZWtlZXBlci5wZXJzaXN0KGRvY0FycmF5KS50aGVuKGZ1bmN0aW9uKHNhdmVkQXJyYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdXNpbmcgc2FtZSBpZCBjYWxsIGluaXRpYWxpc2VEYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NhbGwgY29kZSB0byBzZXQgdG8gc2V0SW5zdGFuY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhby5nZXQobWFpbklkKS5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3JNb2RlbCA9IGtvLm1hcHBpbmcuZnJvbUpTKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkZWZhdWx0TW9kZWxcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZXRJZFwiOiBpbmRpY2F0b3JJZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhdGVrZWVwZXIuaW5zdGFudGlhdGVEYXRhKG1haW5JZCwgaW5zdGFudGlhdGVTb3VyY2UsIGluZGljYXRvck1vZGVsLCBkYXRhLm1vZGVsLnBlbmRpbmcuc2VxKS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhWzBdLnN0YXR1cyA9PSBcIjIwMFwiKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24uc2V0V29ya2Zsb3dMYWJlbEluRmllbGQgIT0gdW5kZWZpbmVkICYmIGFjdGlvbi5zZXRXb3JrZmxvd0xhYmVsSW5GaWVsZCAhPSAnJyAmJiBtYWluSWQgPT0gcHJvZmlsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGFbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXRoID0gXCJkYXRhWzBdLm1vZGVsLm1vZGVsLnBlbmRpbmcuZGF0YS5cIiArIGFjdGlvbi5zZXRXb3JrZmxvd0xhYmVsSW5GaWVsZCArIFwiPSdcIiArIGlucHV0RGF0YS5sYWJlbCArIFwiJ1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2YWwocGF0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2F0ZWtlZXBlci5wZXJzaXN0KGRhdGEpLnRoZW4oZnVuY3Rpb24oc2F2ZWRBcnJheSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhby5nZXQobWFpbklkKS5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9XRkluc3RhbmNlLmluZGljYXRvcnMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvUHJvY2Vzcy0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRvUHJvY2VzcyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gY3JlYXRlZCBzdWNjZXNzZnVsbHkuJywgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm91bmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3IgPSBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzW2luZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kaWNhdG9yLl9pZCA9PSBkYXRhLl9pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgY3VycmVudCBpdGVtIGZyb20gdGhlIGFycmF5IGFuZCBhZGQgdGhlIHVwZGF0ZWQgcHJvY2Vzc01vZGVsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5wdXNoKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b1Byb2Nlc3MtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRvUHJvY2VzcyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnRm9ybSBjcmVhdGVkIHN1Y2Nlc3NmdWxseS4nLCBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm91bmQgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnB1c2goZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvUHJvY2Vzcy0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b1Byb2Nlc3MgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnRm9ybSBjcmVhdGVkIHN1Y2Nlc3NmdWxseS4nLCBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmYWlsdXJlID0gdXRpbC5zdWNjZXNzKCcxIEdhdGVrZWVwZXIgaW5pdGlhbGlzYXRpb24gZmFpbGVkIHdpdGggaW5pdGlhbGlzZURhdGEgbWVzc2FnZSAnICsgZXJyWzBdLm1lc3NhZ2UsIHt9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGZhaWx1cmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZhaWx1cmUgPSB1dGlsLnN1Y2Nlc3MoJzIgR2F0ZWtlZXBlciBpbml0aWFsaXNhdGlvbiBmYWlsZWQgd2l0aCBpbml0aWFsaXNlRGF0YSBtZXNzYWdlICcgKyBlcnJbMF0ubWVzc2FnZSwge30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChmYWlsdXJlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZhaWx1cmUgPSB1dGlsLnN1Y2Nlc3MoJzMgR2F0ZWtlZXBlciBpbml0aWFsaXNhdGlvbiBmYWlsZWQgd2l0aCBpbml0aWFsaXNlRGF0YSBtZXNzYWdlICcgKyBlcnJbMF0ubWVzc2FnZSwge30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGZhaWx1cmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZhaWx1cmUgPSB1dGlsLnN1Y2Nlc3MoJzQgR2F0ZWtlZXBlciBpbml0aWFsaXNhdGlvbiBmYWlsZWQgd2l0aCBpbml0aWFsaXNlRGF0YSBtZXNzYWdlICcgKyBlcnJbMF0ubWVzc2FnZSwge30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFpbHVyZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmFpbHVyZSA9IHV0aWwuc3VjY2VzcygnNSBHYXRla2VlcGVyIGluaXRpYWxpc2F0aW9uIGZhaWxlZCB3aXRoIGluaXRpYWxpc2VEYXRhIG1lc3NhZ2UgJyArIGVyclswXS5tZXNzYWdlLCB7fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGZhaWx1cmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmFpbHVyZSA9IHV0aWwuc3VjY2VzcygnNiBHYXRla2VlcGVyIGluaXRpYWxpc2F0aW9uIGZhaWxlZCB3aXRoIGluaXRpYWxpc2VEYXRhIG1lc3NhZ2UgJyArIGVyclswXS5tZXNzYWdlLCB7fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFpbHVyZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vcGVyc2lzdCAtIHNhdmVcclxuICAgICAgICAgICAgICAgIC8vbG9vcCBvbiB3b3JrZmxvdyBhcnJheSBhbmQgY2hlY2sgZm9yIDQgY29uZGl0aW9ucyBhbmQgc3BsaWNlIGFuZCB1cGRhdGVcclxuICAgICAgICAgICAgICAgIC8vIEdvdCB0byB0aGUgbmV4dCBwcm9jZXNzIGl0ZW1cclxuXHJcbiAgICAgICAgICAgICAgICAvKnZhciB3b3JrZmxvd3MgPSBkb2Mud29ya2Zsb3dzO1xyXG4gICAgICAgICAgICAgICAgd29ya2Zsb3dzLmlkID0gX1dGSW5zdGFuY2UuY29uZmlnLl9pZDtcclxuICAgICAgICAgICAgICAgIHdvcmtmbG93cy5pbnN0YW5jZSA9IF9XRkluc3RhbmNlLmluc3RhbmNlLl9pZDtcclxuICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkb2MpO1xyXG4gICAgICAgICAgICAgICAgbG9vcC5uZXh0KCk7Ki9cclxuXHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHRvQWRkUHJvY2VzcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfV0ZJbnN0YW5jZS5pbnN0YW5jZS5wcm9jZXNzZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzW2ldLnN1YlByb2Nlc3Nlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvQWRkUHJvY2Vzcy5wdXNoKF9XRkluc3RhbmNlLmluc3RhbmNlLnByb2Nlc3Nlc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzID0gW107XHJcbiAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbnN0YW5jZS5wcm9jZXNzZXMgPSB0b0FkZFByb2Nlc3M7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHZhciB0b0FkZFN1YlByb2Nlc3MgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlc1tpXS5pbmRpY2F0b3JzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9BZGRTdWJQcm9jZXNzLnB1c2goX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMgPSBbXTtcclxuICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLnN1YnByb2Nlc3NlcyA9IHRvQWRkU3ViUHJvY2VzcztcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGZhaWx1cmUgPSB1dGlsLnN1Y2Nlc3MoJzcgR2F0ZWtlZXBlciBpbml0aWFsaXNhdGlvbiBmYWlsZWQgd2l0aCBpbml0aWFsaXNlRGF0YSBtZXNzYWdlICcgKyBlcnJbMF0ubWVzc2FnZSwge30pO1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGZhaWx1cmUpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGluc3RhbnRpYXRlU291cmNlID0gJ2Zyb21EZWZpbml0aW9uJztcclxuICAgICAgICBmb3IgKHZhciBjb3VudGVyID0gMDsgY291bnRlciA8IGluZGljYXRvcnMubGVuZ3RoOyBjb3VudGVyKyspIHtcclxuICAgICAgICAgICAgdmFyIGluZGljYXRvcklkID0gaW5kaWNhdG9yc1tjb3VudGVyXS5faWQ7XHJcbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JOYW1lID0gdXRpbC5nZXROYW1lKGluZGljYXRvcnNbY291bnRlcl0ubmFtZSwgJ2VuJyk7XHJcbiAgICAgICAgICAgIHZhciBpbml0VHlwZSA9IGluZGljYXRvcnNbY291bnRlcl0uX3R5cGU7XHJcblxyXG4gICAgICAgICAgICB2YXIgaWQgPSAnJztcclxuICAgICAgICAgICAgdmFyIGluZGljYXRvckRvYyA9IHt9O1xyXG5cclxuICAgICAgICAgICAgaWYgKGluaXRUeXBlID09ICduZXdJbnN0YW5jZScpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYmFzZVVVSUQgIT0gdW5kZWZpbmVkICYmIGJhc2VVVUlEICE9ICcnICYmIGJhc2VVVUlELmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV4aXN0aW5nVVVJRCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBiYXNlVVVJRCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnXCIgKyBpbmRpY2F0b3JJZCArIFwiJ10vaW5zdGFuY2VzWzFdL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICAgICAgICAgICAgICBpZCA9IGV4aXN0aW5nVVVJRDtcclxuICAgICAgICAgICAgICAgICAgICBpbml0VHlwZSA9ICduZXdTZXF1ZW5jZSc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBwcm9jZXNzZXMgYmxvY2sgdG8gbm90IGRpc3BsYXkgdGhlIG9sZGVyIGluc3RhbmNlIGJhc2VkIG9uIGJhc2VVVUlEXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vVE9ETzogQ2hhbmdlIHJlcXVpcmVkIHRvIG1vdmUgaXNBY3RpdmUgdG8gc3ViUHJvY2VzcyBmaWxlLlxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzcCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBiYXNlVVVJRCArIFwiJ11cIiwgYXBwLlNDT1BFLndvcmtmbG93LCB7fSlbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgc3AuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaW5zdGFudGlhdGUgbmV3IHNlcSB3aXRoIHByZXZpb3VzIGF1dGhvcmlzZWQgZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbnRpYXRlU291cmNlID0gJ2Zyb21BdXRob3Jpc2VkJztcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3ViUHJvY2Vzcy5pc1Byb2ZpbGUgIT0gdW5kZWZpbmVkICYmIHN1YlByb2Nlc3MuaXNQcm9maWxlICYmIGNvdW50ZXIgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZCA9IHByb2ZpbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQgPSBpbmRpY2F0b3JJZCArICctJyArIGdlbmVyYXRlVVVJRCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBzcExhc3RVdWlkID0gSlNPTi54cGF0aChcIi9pbnN0YW5jZS9wcm9jZXNzZXNbaWQgZXEgJ1wiICsgcHJvY2Vzc0lkICsgXCInIGFuZCBzdWJQcm9jZXNzZXMvaWQgZXEgJ1wiICsgc3ViUHJvY2Vzc0lkICsgXCInXVsxXS9zdWJQcm9jZXNzZXMvdXVpZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZElkID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHNwTGFzdFV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ1wiICsgaW5kaWNhdG9ySWQgKyBcIiddL2luc3RhbmNlcy91dWlkXCIsIGFwcC5TQ09QRS53b3JrZmxvdywge30pWzBdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNwTGFzdFV1aWQgPT0gJycgfHwgc3BMYXN0VXVpZCA9PSB1bmRlZmluZWQgfHwgaW5kSWQgPT0gJycgfHwgaW5kSWQgPT0gdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdWJQcm9jZXNzLmlzUHJvZmlsZSAhPSB1bmRlZmluZWQgJiYgc3ViUHJvY2Vzcy5pc1Byb2ZpbGUgJiYgY291bnRlciA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkID0gcHJvZmlsZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZCA9IGluZGljYXRvcklkICsgJy0nICsgZ2VuZXJhdGVVVUlEKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlkID0gaW5kSWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGJhc2VVVUlEICE9IHVuZGVmaW5lZCAmJiBiYXNlVVVJRCAhPSAnJyAmJiBiYXNlVVVJRC5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vVE9ETzogQ2hhbmdlIHJlcXVpcmVkIHRvIG1vdmUgaXNBY3RpdmUgdG8gc3ViUHJvY2VzcyBmaWxlLlxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3AgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgYmFzZVVVSUQgKyBcIiddXCIsIGFwcC5TQ09QRS53b3JrZmxvdywge30pWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIHNwLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbnRpYXRlU291cmNlID0gJ2Zyb21BdXRob3Jpc2VkJztcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gVE9ETzogUmVwbGFjZSB3aXRoIHRoZSBnYXRla2VlcGVyIHByb21pc2UgY2FsbCwgcmV0dXJuIHRoZSBvYmplY3QsIHVwZGF0ZSB0aGUgaW5kaWNhdG9yXHJcbiAgICAgICAgICAgIC8vIGRvY3VtZW50IHdvcmtmbG93IHByb2Nlc3NlcyBkYXRhIGFuZCB1cGRhdGUgdGhlIHdvcmtmbG93IGNsYXNzIGluZGljYXRvcnMgYXJyYXkuXHJcbiAgICAgICAgICAgIGZvcm1DcmVhdGVGbihpZCwgaW5pdFR5cGUsIGluZGljYXRvcklkLCAnJywgaW5zdGFudGlhdGVTb3VyY2UpO1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy8gdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gaW5kaWNhdG9yIHNldCBzYXZlZCBzdWNjZXNzZnVsbHkuJywgcmVzdWx0KTtcclxuICAgICAgICAvLyByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBzZXRJbnN0YW5jZVRpdGxlKGFyZ3MpIHtcclxuXHJcbiAgICB2YXIgX1dGSW5zdGFuY2UgPSBhcmdzWzBdIHx8IHt9O1xyXG4gICAgdmFyIHV1aWQgPSBhcmdzWzJdIHx8ICcnO1xyXG4gICAgdmFyIGRhdGEgPSBhcmdzWzRdIHx8IHt9O1xyXG4gICAgdmFyIHRpdGxlID0gZGF0YS5sYWJlbDtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgIHZhciBzdWJQcm9jZXNzSW5zdGFuY2UgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICB2YXIgaW5kaWNhdG9ySW5zdGFuY2VzID0gc3ViUHJvY2Vzc0luc3RhbmNlLmluZGljYXRvcnM7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5kaWNhdG9ySW5zdGFuY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JVVUlEID0gaW5kaWNhdG9ySW5zdGFuY2VzW2ldLmluc3RhbmNlc1swXS51dWlkO1xyXG4gICAgICAgICAgICB2YXIgaW5kaWNhdG9ySW5zdGFuY2UgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbX2lkIGVxICdcIiArIGluZGljYXRvclVVSUQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcbiAgICAgICAgICAgIGluZGljYXRvckluc3RhbmNlLnRpdGxlID0gaW5kaWNhdG9ySW5zdGFuY2VzW2ldLmlkICsnICcrdGl0bGU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmVzb2x2ZShcIlNldCBUaXRsZSBTdWNjZXNzXCIsIGluZGljYXRvckluc3RhbmNlcyk7XHJcblxyXG4gICAgfSk7XHJcblxyXG59O1xyXG5cclxuZnVuY3Rpb24gZGVsZXRlUHJvZmlsZShhcmdzKSB7XHJcblxyXG4gICAgdmFyIF9XRkluc3RhbmNlID0gYXJnc1swXSB8fCB7fTtcclxuICAgIHZhciBwcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IHtcclxuICAgICAgICAgICAgXCJzb3VyY2VcIjogXCJyZW1vdGVcIixcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwid29ya2VyT2JqZWN0XCIsXHJcbiAgICAgICAgICAgIFwiX2lkXCI6IGdlbmVyYXRlVVVJRCgpLFxyXG4gICAgICAgICAgICBcImNoYW5uZWxzXCI6IFtdLFxyXG4gICAgICAgICAgICBcImNvbW11bml0eUlkXCI6IGFwcC5TQ09QRS5jb21tdW5pdHlJZCxcclxuICAgICAgICAgICAgXCJhcHBsaWNhdGlvbklkXCI6IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkLFxyXG4gICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJcIixcclxuICAgICAgICAgICAgXCJtZXNzYWdlVHlwZVwiOiBcImluZm9cIixcclxuICAgICAgICAgICAgXCJjcmVhdGVkRGF0ZVRpbWVcIjogbW9tZW50KCkuZm9ybWF0KCksXHJcbiAgICAgICAgICAgIFwic2VuZGVyVXNlcklkXCI6IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkLFxyXG4gICAgICAgICAgICBcIm5vdGlmaWNhdGlvblwiOiB7XHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInByb2ZpbGVcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhY3Rpb25cIjogXCJkZWxldGVQcm9maWxlXCIsXHJcbiAgICAgICAgICAgICAgICBcInByb2ZpbGVJZFwiOiBwcm9maWxlSWRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyh3b3JrZXJPYmplY3QpO1xyXG4gICAgICAgIGRhby51cHNlcnQod29ya2VyT2JqZWN0KS5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJXb3JrZXIgT2JqZWN0IHN1Ym1pdHRlZCBmb3IgcHJvZmlsZShcIiArIHByb2ZpbGVJZCArIFwiKSBkZWxldGlvbi5cIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgIH0pLmZhaWwoZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgIHJlamVjdChkYXRhKTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgfSk7XHJcblxyXG5cclxufTtcclxuXHJcblxyXG5mdW5jdGlvbiBjcmVhdGVQcm9maWxlKGFyZ3MpIHtcclxuXHJcblxyXG5cclxuICAgIHZhciBfV0ZJbnN0YW5jZSA9IGFyZ3NbMV0gfHwge307XHJcblxyXG4gICAgdmFyIGNvbW11bml0eUlkID0gX1dGSW5zdGFuY2UuY29tbXVuaXR5SWQ7XHJcbiAgICB2YXIgcHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgIGxpYnJhcnkuY3JlYXRlUHJvZmlsZURvY3VtZW50cyhjb21tdW5pdHlJZCwgcHJvZmlsZUlkKS5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5LicsIGRhdGEpO1xyXG4gICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG5cclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uKGVycikge1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICB2YXIgZmFpbHVyZSA9IHV0aWwuc3VjY2VzcygnRVJST1I6IFByb2ZpbGUgY3JlYXRpb24gZmFpbGVkJyArIGVyclswXS5tZXNzYWdlLCB7fSk7XHJcbiAgICAgICAgICAgIHJlamVjdChmYWlsdXJlKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBzZXREcmFmdChhcmdzKSB7XHJcblxyXG5cclxuXHJcbiAgICB2YXIgX1dGSW5zdGFuY2UgPSBhcmdzWzBdIHx8IHt9O1xyXG4gICAgdmFyIGNvbW11bml0eUlkID0gX1dGSW5zdGFuY2UuY29tbXVuaXR5SWQ7XHJcbiAgICB2YXIgcHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcclxuICAgIHZhciB1dWlkID0gYXJnc1syXSB8fCAnJztcclxuXHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICB2YXIgc3ViUHJvY2Vzc0luc3RhbmNlID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcbiAgICAgICAgdmFyIGluZGljYXRvckluc3RhbmNlcyA9IHN1YlByb2Nlc3NJbnN0YW5jZS5pbmRpY2F0b3JzO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluZGljYXRvckluc3RhbmNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgaW5kaWNhdG9yVVVJRCA9IGluZGljYXRvckluc3RhbmNlc1tpXS5pbnN0YW5jZXNbMF0udXVpZDtcclxuICAgICAgICAgICAgdmFyIGluZGljYXRvckluc3RhbmNlID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW19pZCBlcSAnXCIgKyBpbmRpY2F0b3JVVUlEICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG4gICAgICAgICAgICBpbmRpY2F0b3JJbnN0YW5jZS5jb250cm9sLmRyYWZ0ID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXNvbHZlKFwiU2V0IERyYWZ0IFN1Y2Nlc3NcIiwgaW5kaWNhdG9ySW5zdGFuY2VzKTtcclxuXHJcbiAgICB9KTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIHNldFVuRHJhZnQoYXJncykge1xyXG5cclxuICAgIHZhciBfV0ZJbnN0YW5jZSA9IGFyZ3NbMF0gfHwge307XHJcbiAgICB2YXIgY29tbXVuaXR5SWQgPSBfV0ZJbnN0YW5jZS5jb21tdW5pdHlJZDtcclxuICAgIHZhciBwcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xyXG4gICAgdmFyIHV1aWQgPSBhcmdzWzJdIHx8ICcnO1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgdmFyIHN1YlByb2Nlc3NJbnN0YW5jZSA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG4gICAgICAgIHZhciBpbmRpY2F0b3JJbnN0YW5jZXMgPSBzdWJQcm9jZXNzSW5zdGFuY2UuaW5kaWNhdG9ycztcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbmRpY2F0b3JJbnN0YW5jZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGluZGljYXRvclVVSUQgPSBpbmRpY2F0b3JJbnN0YW5jZXNbaV0uaW5zdGFuY2VzWzBdLnV1aWQ7XHJcbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JJbnN0YW5jZSA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tfaWQgZXEgJ1wiICsgaW5kaWNhdG9yVVVJRCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICAgICAgaW5kaWNhdG9ySW5zdGFuY2UuY29udHJvbC5kcmFmdCA9IGZhbHNlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJlc29sdmUoXCJTZXQgRHJhZnQgU3VjY2Vzc1wiLCBpbmRpY2F0b3JJbnN0YW5jZXMpO1xyXG5cclxuICAgIH0pO1xyXG59O1xyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBzYXZlKGluZGljYXRvcikge1xyXG4gICAgdmFyIGNvbXBsZXRlZCA9IFtdO1xyXG4gICAgdmFyIHJlc3VsdCA9IHtcclxuICAgICAgICBjb21wbGV0ZTogdHJ1ZSxcclxuICAgICAgICBkYXRhOiBbXVxyXG4gICAgfTtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnRm9ybSBpbmRpY2F0b3Igc2V0IHNhdmVkIHN1Y2Nlc3NmdWxseS4nLCByZXN1bHQpO1xyXG4gICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIHN1Ym1pdChmb3JtKSB7XHJcbiAgICB2YXIgY29tcGxldGVkID0gW107XHJcbiAgICB2YXIgcmVzdWx0ID0ge1xyXG4gICAgICAgIGNvbXBsZXRlOiB0cnVlLFxyXG4gICAgICAgIGRhdGE6IFtdXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIHN1Ym1pdHRlZCBzdWNjZXNzZnVsbHkuJywgcmVzdWx0KTtcclxuICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBhdXRob3Jpc2UoZm9ybSkge1xyXG4gICAgdmFyIGNvbXBsZXRlZCA9IFtdO1xyXG4gICAgdmFyIHJlc3VsdCA9IHtcclxuICAgICAgICBjb21wbGV0ZTogdHJ1ZSxcclxuICAgICAgICBkYXRhOiBbXVxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgcHJvY2Vzc0lkID0gZm9ybVswXSB8fCAnJztcclxuXHJcbiAgICB2YXIgc3ViUHJvY2VzcyA9IGZvcm1bMV0gfHwge307XHJcblxyXG4gICAgdmFyIHN1YlByb2Nlc3NJZCA9IHN1YlByb2Nlc3MuX2lkO1xyXG5cclxuICAgIHZhciBwcm9jZXNzU2VxID0gZm9ybVsyXSB8fCAnJztcclxuXHJcbiAgICB2YXIgc3ViUHJvY2Vzc1NlcSA9IGZvcm1bM10gfHwgJyc7XHJcblxyXG4gICAgdmFyIF9XRkluc3RhbmNlID0gZm9ybVs0XSB8fCB7fTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgIHZhciBzdWJQcm9jZXNzVVVJRCA9IEpTT04ueHBhdGgoXCIvcHJvY2Vzc2VzW2lkIGVxICdcIiArIHByb2Nlc3NJZCArIFwiJyBhbmQgc2VxIGVxICdcIiArIHByb2Nlc3NTZXEgKyBcIiddL3N1YlByb2Nlc3Nlc1tpZCBlcSAnXCIgKyBzdWJQcm9jZXNzSWQgKyBcIicgYW5kIHNlcSBlcSAnXCIgKyBzdWJQcm9jZXNzU2VxICsgXCInXS91dWlkXCIsIF9XRkluc3RhbmNlLmluc3RhbmNlLCB7fSlbMF07XHJcbiAgICAgICAgdmFyIHNwSW5kaWNhdG9ycyA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzdWJQcm9jZXNzVVVJRCArIFwiJ10vaW5kaWNhdG9ycy9pbnN0YW5jZXMvdXVpZFwiLCBfV0ZJbnN0YW5jZSwge30pO1xyXG4gICAgICAgIHZhciBpdGVtc1RvUHJvY2VzcyA9IHNwSW5kaWNhdG9ycy5sZW5ndGg7XHJcbiAgICAgICAgdmFyIHVwZGF0ZWRPYmplY3RzQXJyYXkgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtc1RvUHJvY2VzczsgaSsrKSB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGdhdGVrZWVwZXIuYXV0aG9yaXNlKHNwSW5kaWNhdG9yc1tpXSkudGhlbihmdW5jdGlvbihhdXRob3Jpc2VkUmV0dXJuKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGdhdGVrZWVwZXIucGVyc2lzdChhdXRob3Jpc2VkUmV0dXJuKS50aGVuKGZ1bmN0aW9uKHNhdmVkQXJyYXkpIHtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB1dWlkU2F2ZWRJbmRpY2F0b3IgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IHNhdmVkQXJyYXkubGVuZ3RoOyBjKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzYXZlZEFycmF5W2NdLmlkLmVuZHNXaXRoKCc6YXBwcm92ZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXVpZFNhdmVkSW5kaWNhdG9yID0gc2F2ZWRBcnJheVtjXS5pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBkYW8uZ2V0KHV1aWRTYXZlZEluZGljYXRvcikuZG9uZShmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnB1c2goZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1RvUHJvY2Vzcy0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zVG9Qcm9jZXNzID09IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gYXV0aG9yaXNlZCBzdWNjZXNzZnVsbHkuJywgdXBkYXRlZE9iamVjdHNBcnJheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3VuZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IF9XRkluc3RhbmNlLmluZGljYXRvcnMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvciA9IF9XRkluc3RhbmNlLmluZGljYXRvcnNbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRpY2F0b3IuX2lkID09IGRhdGEuX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBjdXJyZW50IGl0ZW0gZnJvbSB0aGUgYXJyYXkgYW5kIGFkZCB0aGUgdXBkYXRlZCBwcm9jZXNzTW9kZWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnB1c2goZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zVG9Qcm9jZXNzLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1RvUHJvY2VzcyA9PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gYXV0aG9yaXNlZCBzdWNjZXNzZnVsbHkuJywgdXBkYXRlZE9iamVjdHNBcnJheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvdW5kID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5wdXNoKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1RvUHJvY2Vzcy0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1RvUHJvY2VzcyA9PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnRm9ybSBhdXRob3Jpc2VkIHN1Y2Nlc3NmdWxseS4nLCB1cGRhdGVkT2JqZWN0c0FycmF5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuZmFpbChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1zVG9Qcm9jZXNzLS07XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbXNUb1Byb2Nlc3MgPT0gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnRm9ybSBhdXRob3Jpc2VkIHN1Y2Nlc3NmdWxseS4nLCB1cGRhdGVkT2JqZWN0c0FycmF5KTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfSk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBjbG9zZShmb3JtKSB7XHJcbiAgICB2YXIgY29tcGxldGVkID0gW107XHJcbiAgICB2YXIgcmVzdWx0ID0ge1xyXG4gICAgICAgIGNvbXBsZXRlOiB0cnVlLFxyXG4gICAgICAgIGRhdGE6IFtdXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGNsb3NlZCBzdWNjZXNzZnVsbHkuJywgcmVzdWx0KTtcclxuICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgICBjcmVhdGU6IGNyZWF0ZSxcclxuICAgIHNhdmU6IHNhdmUsXHJcbiAgICBzdWJtaXQ6IHN1Ym1pdCxcclxuICAgIGF1dGhvcmlzZTogYXV0aG9yaXNlLFxyXG4gICAgY2xvc2U6IGNsb3NlLFxyXG4gICAgc2V0RHJhZnQ6IHNldERyYWZ0LFxyXG4gICAgc2V0VW5EcmFmdDogc2V0VW5EcmFmdCxcclxuICAgIGNyZWF0ZVByb2ZpbGU6IGNyZWF0ZVByb2ZpbGUsXHJcbiAgICBzZXRJbnN0YW5jZVRpdGxlOiBzZXRJbnN0YW5jZVRpdGxlLFxyXG4gICAgZGVsZXRlUHJvZmlsZTogZGVsZXRlUHJvZmlsZVxyXG5cclxufSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbGl0eScpO1xyXG5cclxuLyoqXHJcbiAqIFVzZXIgSW50ZXJmYWNlIE1vZHVsZVxyXG4gKlxyXG4gKiBAbW9kdWxlIGxpYi91aVxyXG4gKiBAYXV0aG9yIEJyZW50IEdvcmRvblxyXG4gKiBAdmVyc2lvbiAwLjEuMFxyXG4gKiBAZGVzY3JpcHRpb24gdGVzdCBkZXNjcmlwdGlvblxyXG4gKlxyXG4gKi9cclxuXHJcbiAvKipcclxuICAqIEdldCBhbGwgcHJvY2VzcyBzdWItcHJvY2Vzc2VzIHVzZXIgaW50ZXJmYWNlIGRhdGFcclxuICAqXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gcHJvY2VzcyBpZFxyXG4gICogQHBhcmFtIHtzdHJpbmd9IGxhbmcgLSB0aGUgdXNlciBwcmVmZmVyZWQgbGFuZ2F1Z2VcclxuICAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXHJcbiAgKlxyXG4gICogQGV4YW1wbGUgJydcclxuICAqXHJcbiAgKiBAcmV0dXJuICcnXHJcbiAgKlxyXG4gICovXHJcbiBmdW5jdGlvbiBnZXRQcm9jZXNzKHByb2Nlc3NJZCwgbGFuZywgX1dGSW5zdGFuY2Upe1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHZhciBwcm9jZXNzTW9kZWwgPSBbXTtcclxuICAgICAgdmFyIHByb2Nlc3NJbnN0YW5jZSA9IFtdO1xyXG4gICAgXHRfV0ZJbnN0YW5jZS5pbnN0YW5jZS5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHByb2Nlc3NJdGVtKXtcclxuICAgIFx0XHRpZiAocHJvY2Vzc0l0ZW0uaWQgPT0gcHJvY2Vzc0lkKSB7XHJcbiAgICBcdFx0XHRwcm9jZXNzSW5zdGFuY2UgPSBwcm9jZXNzSXRlbTtcclxuICAgIFx0XHR9XHJcbiAgICBcdH0pXHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKHByb2Nlc3NJbnN0YW5jZS5zdWJQcm9jZXNzZXMubGVuZ3RoKTtcclxuICAgICAgdXRpbC5zeW5jTG9vcChwcm9jZXNzSW5zdGFuY2Uuc3ViUHJvY2Vzc2VzLmxlbmd0aCwgZnVuY3Rpb24obG9vcCl7XHJcbiAgXHRcdFx0dmFyIGNvdW50ZXIgPSBsb29wLml0ZXJhdGlvbigpO1xyXG4gICAgICAgIHZhciBwcm9jZXNzU2VxID0gcHJvY2Vzc0luc3RhbmNlLnNlcTtcclxuICAgICAgICB2YXIgc3ViUHJvY2Vzc0lkID0gcHJvY2Vzc0luc3RhbmNlLnN1YlByb2Nlc3Nlc1tjb3VudGVyXS5pZDtcclxuICAgICAgICB2YXIgc3ViUHJvY2Vzc1NlcSA9IHByb2Nlc3NJbnN0YW5jZS5zdWJQcm9jZXNzZXNbY291bnRlcl0uc2VxO1xyXG4gICAgICAgIGdldFN1YlByb2Nlc3MocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIGxhbmcsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKG1vZGVsKXtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG1vZGVsKTtcclxuICAgICAgICAgIHByb2Nlc3NNb2RlbC5wdXNoKG1vZGVsKTtcclxuICAgICAgICAgIGxvb3AubmV4dCgpO1xyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2cocHJvY2Vzc01vZGVsKTtcclxuICBcdFx0XHR9LCBmdW5jdGlvbihlcnIpe1xyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2cocHJvY2Vzc01vZGVsKTtcclxuICBcdFx0XHRcdGxvb3AuYnJlYWsoKTtcclxuICBcdFx0XHRcdHJlamVjdChlcnIpO1xyXG4gIFx0XHRcdH0pO1xyXG4gIFx0XHR9LCBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHByb2Nlc3NNb2RlbCk7XHJcbiAgXHRcdFx0cmVzb2x2ZShwcm9jZXNzTW9kZWwpO1xyXG4gIFx0XHR9KTtcclxuICAgIH0gY2F0Y2goZXJyKXtcclxuICAgICAgcmVqZWN0KGVycik7XHJcbiAgICB9XHJcbiAgfSlcclxufTtcclxuXHJcbiAvKipcclxuICAqIEdldCBTdWJQcm9jZXNzIHVzZXIgaW50ZXJmYWNlIGRhdGFcclxuICAqXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gcHJvY2VzcyBpZFxyXG4gICogQHBhcmFtIHtudW1iZXJ9IHByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2UgcHJvY2VzcyBzZXFcclxuICAqIEBwYXJhbSB7c3RyaW5nfSBzdWJQcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdWItcHJvY2VzcyBpZFxyXG4gICogQHBhcmFtIHtudW1iZXJ9IHN1YlByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2Ugc3ViLXByb2Nlc3Mgc2VxXHJcbiAgKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxyXG4gICpcclxuICAqIEBleGFtcGxlICcnXHJcbiAgKlxyXG4gICogQHJldHVybiAnJ1xyXG4gICpcclxuICAqL1xyXG5mdW5jdGlvbiBnZXRTdWJQcm9jZXNzKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBsYW5nLCBfV0ZJbnN0YW5jZSl7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgdmFyIG1vZGVsID0ge1xyXG4gICAgICAgIGlkOiAnJyxcclxuICAgICAgICBzZXE6ICcnLFxyXG4gICAgICAgIG5hbWU6ICcnLFxyXG4gICAgICAgIGhlbHA6ICcnLFxyXG4gICAgICAgIGRhdGVzOiAnJyxcclxuICAgICAgICBzdGVwOiAnJ1xyXG4gICAgICB9O1xyXG4gICAgICB2YXIgc3ViUHJvY2VzcyA9IFtdO1xyXG4gICAgXHR2YXIgc3ViUHJvY2Vzc0NvbmYgPSBbXTtcclxuICAgIFx0X1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihwcm9jZXNzSXRlbSl7XHJcbiAgICBcdFx0aWYgKHByb2Nlc3NJdGVtLmlkID09IHByb2Nlc3NJZCAmJiBwcm9jZXNzSXRlbS5zZXEgPT0gcHJvY2Vzc1NlcSkge1xyXG4gICAgXHRcdFx0dmFyIHNwTGVuZ3RoID0gcHJvY2Vzc0l0ZW0uc3ViUHJvY2Vzc2VzLmxlbmd0aDtcclxuICAgIFx0XHRcdHByb2Nlc3NJdGVtLnN1YlByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24oc3ViUHJvY2Vzc0l0ZW0pe1xyXG4gICAgXHRcdFx0XHRpZiAoc3ViUHJvY2Vzc0l0ZW0uaWQgPT0gc3ViUHJvY2Vzc0lkICYmIHN1YlByb2Nlc3NJdGVtLnNlcSA9PSBzdWJQcm9jZXNzU2VxICYmIHN1YlByb2Nlc3NJdGVtLmNvbXBsZXRlID09IGZhbHNlKSB7XHJcbiAgICBcdFx0XHRcdFx0c3ViUHJvY2VzcyA9IHN1YlByb2Nlc3NJdGVtO1xyXG4gICAgXHRcdFx0XHR9XHJcbiAgICBcdFx0XHR9KVxyXG4gICAgXHRcdH1cclxuICAgIFx0fSlcclxuICAgIFx0Ly8gR2V0IHRoZSBjdXJyZW50IHN1YlByb2Nlc3MgY29uZmlndXJhdGlvblxyXG4gICAgXHRfV0ZJbnN0YW5jZS5jb25maWcucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihwcm9jZXNzQ29uZmlnKXtcclxuICAgIFx0XHRpZiAocHJvY2Vzc0NvbmZpZy5faWQgPT0gcHJvY2Vzc0lkKSB7XHJcbiAgICBcdFx0XHRwcm9jZXNzQ29uZmlnLnN1YlByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24oc3ViUHJvY2Vzc0NvbmZpZyl7XHJcbiAgICBcdFx0XHRcdGlmIChzdWJQcm9jZXNzQ29uZmlnLl9pZCA9PSBzdWJQcm9jZXNzSWQpIHtcclxuICAgIFx0XHRcdFx0XHRzdWJQcm9jZXNzQ29uZiA9IHN1YlByb2Nlc3NDb25maWc7XHJcbiAgICBcdFx0XHRcdH1cclxuICAgIFx0XHRcdH0pXHJcbiAgICBcdFx0fVxyXG4gICAgXHR9KVxyXG4gICAgICAvLyBVcGRhdGUgdGhlIG1vZGVsXHJcbiAgICAgIG1vZGVsLmlkID0gc3ViUHJvY2Vzc0NvbmYuX2lkO1xyXG4gICAgICBtb2RlbC5zZXEgPSBzdWJQcm9jZXNzLnNlcTtcclxuICAgICAgbW9kZWwubmFtZSA9IHV0aWwuZ2V0TmFtZShzdWJQcm9jZXNzQ29uZi5uYW1lLCBsYW5nKTtcclxuICAgICAgbW9kZWwuaGVscCA9IHV0aWwuZ2V0TmFtZShzdWJQcm9jZXNzQ29uZi5oZWxwLCBsYW5nKTtcclxuICAgICAgbW9kZWwuZGF0ZXMgPSBzdWJQcm9jZXNzLmRhdGVzO1xyXG4gICAgICBtb2RlbC5zdGVwID0gc3ViUHJvY2Vzcy5zdGVwO1xyXG4gICAgICByZXNvbHZlKG1vZGVsKTtcclxuICAgIH0gY2F0Y2goZXJyKSB7XHJcbiAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgfVxyXG4gIH0pXHJcbn07XHJcblxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBwcmVwYXJlTm90aWZpY2F0aW9uU2NyZWVuKCl7XHJcblxyXG4gIFwiXCJcclxufTtcclxuXHJcbiBtb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgZ2V0UHJvY2VzczogZ2V0UHJvY2Vzc1xyXG5cclxuIH1cclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsaXR5Jyk7XHJcbnZhciBhY3Rpb25zTW9kdWxlID0gcmVxdWlyZSgnLi9hY3Rpb25zJyk7XHJcbnZhciBmb3JtID0gcmVxdWlyZSgnLi9mb3JtJyk7XHJcblxyXG5cclxuLyoqXHJcbiAqIFByb2Nlc3MgTW9kdWxlXHJcbiAqXHJcbiAqIEBtb2R1bGUgbGliL3Byb2Nlc3NcclxuICogQGF1dGhvciBCcmVudCBHb3Jkb25cclxuICogQHZlcnNpb24gMC4xLjBcclxuICogQGRlc2NyaXB0aW9uIHRlc3QgZGVzY3JpcHRpb25cclxuICpcclxuICovXHJcblxyXG4vKipcclxuICogQ291bnQgYW4gYXJyYXkgb2YgaXRlbXNcclxuICpcclxuICogQHBhcmFtIHtBcnJheX0gYXJyIC0gdGhlIGFycmF5IGRhdGFcclxuICpcclxuICogQGV4YW1wbGUgJydcclxuICpcclxuICogQHJldHVybiAnJ1xyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gY291bnQoYXJyKSB7XHJcbiAgICBpZiAoYXJyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gYXJyLmxlbmd0aDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFByb2Nlc3MgcHJlLXJlcXVpc2l0ZXNcclxuICpcclxuICogQHBhcmFtIHtvYmplY3R9IHByZXJlcXVpc2l0ZXMgLSB0aGUgcHJlLXJlcXVpc2l0ZXMgY29uZmlnIGRhdGFcclxuICpcclxuICogQGV4YW1wbGUgJydcclxuICpcclxuICogQHJldHVybiAnJ1xyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gcHJlUmVxdWlzaXRlcyhwcmVyZXF1aXNpdGVzLCBfV0ZJbnN0YW5jZSkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIC8vIFVuY29tbWVudCBiZWxvdyBzZWN0aW9uIHdoZW4gcmVhZHkgdG8gaW1wbGVtZW50XHJcbiAgICAgICAgdmFyIGNvbXBsZXRlZCA9IFtdO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHV0aWwuc3luY0xvb3AocHJlcmVxdWlzaXRlcy5sZW5ndGgsIGZ1bmN0aW9uKGxvb3ApIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb3VudGVyID0gbG9vcC5pdGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIHByZVJlcXVpc2l0ZShwcmVyZXF1aXNpdGVzW2NvdW50ZXJdLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgYWxsIHByZS1yZXF1aXNpdGVzIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuXHJcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVkLnB1c2godHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9vcC5uZXh0KCk7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQucHVzaChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9vcC5icmVhaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBsZXRlZC5ldmVyeShCb29sZWFuKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdQcmUtcmVxdWlzaXRlcyBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHt9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRlByZVJlcXVpc2l0ZUVycm9yJywgJ05vdCBhbGwgcHJlLXJlcXVpc2l0ZXMgcGFzc2VkLicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBQcm9jZXNzIHByZS1yZXF1aXNpdGUsIGV4ZWN1dGUgdGhlIHByZS1yZXF1aXNpdGUgY29uZGl0aW9uLlxyXG4gKlxyXG4gKiBAcGFyYW0ge29iamVjdH0gcHJlcmVxdWlzaXRlIC0gdGhlIHByZS1yZXF1aXNpdGUgY29uZmlnIGRhdGFcclxuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXHJcbiAqXHJcbiAqIEBleGFtcGxlXHJcbiAqIFByb2Nlc3MucHJlUmVxdWlzaXRlKGNvbmZpZywgY291bnRlciwgaW5zdGFuY2UsIGRvYyk7XHJcbiAqXHJcbiAqIEByZXR1cm4gJydcclxuICpcclxuICovXHJcbmZ1bmN0aW9uIHByZVJlcXVpc2l0ZShwcmVyZXF1aXNpdGUsIF9XRkluc3RhbmNlKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgc3dpdGNoIChwcmVyZXF1aXNpdGUuX3R5cGUpIHtcclxuICAgICAgICAgICAgLy8gVE9ETzogQWRkIHRoZSBjYWxsIHRvIHRoZSByZWxldmFudCBtZXRob2RzIGJhc2VkIG9uIHRoZSBfdHlwZSBhdHRyaWJ1dGUuIFNob3VsZCBjYWxsIHRoZSBnZW5lcmljIGFjdGlvbigpIG1ldGhvZC5cclxuICAgICAgICAgICAgY2FzZSAncHJvY2Vzc0luc3RhbmNlcyc6XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgaWQgPSBwcmVyZXF1aXNpdGUuX3BhcmFtZXRlcjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2ZpbHRlciA9IHByZXJlcXVpc2l0ZS5fZmlsdGVyO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWJqZWN0Q291bnQgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX2ZpbHRlciAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9maWx0ZXJPcGVyYXRvciA9IF9maWx0ZXIuX29wZXJhdG9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgeHBhdGhPcGVyYXRvciA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9maWx0ZXJPcGVyYXRvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZ3JlYXRlclRoYW4nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhwYXRoT3BlcmF0b3IgPSAnZ3QnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbGVzc1RoYW4nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhwYXRoT3BlcmF0b3IgPSAnbHQnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZ3JlYXRlclRoYW5FcXVhbCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeHBhdGhPcGVyYXRvciA9ICdnZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdsZXNzVGhhbkVxdWFsJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4cGF0aE9wZXJhdG9yID0gJ2xlJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2VxdWFsVG8nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhwYXRoT3BlcmF0b3IgPSAnZXEnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbm90RXF1YWxUbyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeHBhdGhPcGVyYXRvciA9ICduZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9maWx0ZXJFbGVtZW50ID0gX2ZpbHRlci5fZWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9maWx0ZXJFbGVtZW50ID0gX2ZpbHRlckVsZW1lbnQuc3BsaXQoJy4nKS5qb2luKCcvJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfZmlsdGVyVmFsdWUgPSBfZmlsdGVyLl92YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlubmVyWHBhdGggPSBcIi9cIiArIF9maWx0ZXJFbGVtZW50ICsgXCJbLiBlcSAnXCIgKyBfZmlsdGVyVmFsdWUgKyBcIiddXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmdWxsUGF0aCA9IFwiY291bnQoL3N1YnByb2Nlc3Nlc1tpZCBlcSAnXCIgKyBpZCArIFwiJ11cIiArIGlubmVyWHBhdGggKyBcIilcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3ViamVjdENvdW50ID0gSlNPTi54cGF0aChmdWxsUGF0aCwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3ViamVjdENvdW50ID0gSlNPTi54cGF0aChcImNvdW50KC9zdWJwcm9jZXNzZXNbaWQgZXEgJ1wiICsgaWQgKyBcIiddKVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29tcGFyZSA9IHV0aWwuY29tcGFyZShzdWJqZWN0Q291bnQsIHByZXJlcXVpc2l0ZS5fb3BlcmF0b3IsIHBhcnNlSW50KHByZXJlcXVpc2l0ZS5fdmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29tcGFyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnUHJlLXJlcXVpc2l0ZXMgcGFzc2VkLicsIHt9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVyZXF1aXNpdGUubWVzc2FnZS5pMThuLmZpbHRlcihmdW5jdGlvbihpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5fbGFuZyA9PSAnZW4nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IGl0ZW0udmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZQcmVSZXF1aXNpdGVFcnJvcicsIG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZQcmVSZXF1aXNpdGVFcnJvcicsICdQcmUtcmVxdWlzaXRlIHR5cGU6ICcgKyBwcmVyZXF1aXNpdGUuX3R5cGUgKyAnIG5vdCBkZWZpbmVkLicpO1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBQcm9jZXNzIHByZS1hY3Rpb25zc1xyXG4gKlxyXG4gKiBAcGFyYW0ge29iamVjdH0gcHJlQWN0aW9ucyAtIHRoZSBwcmUtYWN0aW9ucyBjb25maWcgZGF0YVxyXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxyXG4gKlxyXG4gKiBAZXhhbXBsZSAnJ1xyXG4gKlxyXG4gKiBAcmV0dXJuICcnXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiBwcmVBY3Rpb25zKHByZUFjdGlvbnMsIF9XRkluc3RhbmNlKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgdmFyIGNvbXBsZXRlZCA9IFtdO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHV0aWwuc3luY0xvb3AocHJlQWN0aW9ucy5sZW5ndGgsIGZ1bmN0aW9uKGxvb3ApIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb3VudGVyID0gbG9vcC5pdGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGFjdGlvbihwcmVBY3Rpb25zW2NvdW50ZXJdLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgYWxsIHByZS1yZXF1aXNpdGVzIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuXHJcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVkLnB1c2godHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9vcC5uZXh0KCk7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQucHVzaChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9vcC5icmVhaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBsZXRlZC5ldmVyeShCb29sZWFuKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdQcmUtYWN0aW9ucyBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHt9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRlByZVJlcXVpc2l0ZUVycm9yJywgJ05vdCBhbGwgcHJlLWFjdGlvbnMgcGFzc2VkLicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXb3JrZmxvdyBnZXQgc3ViLXByb2Nlc3MgZGF0YS5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGlkIC0gdGhlIHN1YlByb2Nlc3MgY29uZmlnIGlkXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXHJcbiAqXHJcbiAqIEBleGFtcGxlIFwiXCJcclxuICpcclxuICogQHJldHVybiBcIlwiXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRTdWJQcm9jZXNzKGlkLCBfV0ZJbnN0YW5jZSkge1xyXG4gICAgaWYgKF9XRkluc3RhbmNlLnN1YnByb2Nlc3NlcyA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24oc3ViUHJvY2Vzcykge1xyXG4gICAgICAgICAgICBpZiAoc3ViUHJvY2Vzcy5pZCA9PSBpZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1YlByb2Nlc3M7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn07XHJcblxyXG4vKipcclxuICogUHJvY2VzcyBzdWItcHJvY2Vzc1xyXG4gKlxyXG4gKiBAcGFyYW0ge29iamVjdH0gcHJvY2VzcyAtIHRoZSBjdXJyZW50IHByb2Nlc3MgaWQgYW5kIHNlcVxyXG4gKiBAcGFyYW0ge29iamVjdH0gc3ViUHJvY2VzcyAtIHRoZSBzdWItcHJvY2VzcyBpZCBhbmQgc2VxXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIC0gdGhlIHVzZXIgaW5wdXQgZGF0YVxyXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxyXG4gKlxyXG4gKiBAZXhhbXBsZSAnJ1xyXG4gKlxyXG4gKiBAcmV0dXJuICcnXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiBzdWJQcm9jZXNzKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBkYXRhLCBfV0ZJbnN0YW5jZSkge1xyXG4gICAgLy8gR2V0IHRoZSBjdXJyZW50IHByb2Nlc3Mgc3ViUHJvY2VzcyBpbnN0YW5jZVxyXG4gICAgLy8gdmFyIHN1YlByb2Nlc3NTZXEgPSAxO1xyXG4gICAgdmFyIHN1YlByb2Nlc3MgPSBbXTtcclxuICAgIHZhciBwcm9jZXNzQ29uZiA9IFtdO1xyXG4gICAgdmFyIHN1YlByb2Nlc3NDb25mID0gW107XHJcbiAgICBfV0ZJbnN0YW5jZS5pbnN0YW5jZS5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKG9ialByb2Nlc3MpIHtcclxuICAgICAgICAgICAgaWYgKG9ialByb2Nlc3MuaWQgPT0gcHJvY2Vzc0lkICYmIG9ialByb2Nlc3Muc2VxID09IHByb2Nlc3NTZXEpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzcExlbmd0aCA9IG9ialByb2Nlc3Muc3ViUHJvY2Vzc2VzLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIG9ialByb2Nlc3Muc3ViUHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmpTdWJQcm9jZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9ialN1YlByb2Nlc3MuaWQgPT0gc3ViUHJvY2Vzc0lkICYmIG9ialN1YlByb2Nlc3Muc2VxID09IHN1YlByb2Nlc3NTZXEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHV1aWQgPSBvYmpTdWJQcm9jZXNzLnV1aWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24oc3ViUHJvY2Vzc0l0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWJQcm9jZXNzSXRlbS5faWQgPT0gdXVpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3MgPSBzdWJQcm9jZXNzSXRlbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyBHZXQgdGhlIGN1cnJlbnQgc3ViUHJvY2VzcyBjb25maWd1cmF0aW9uXHJcbiAgICBfV0ZJbnN0YW5jZS5jb25maWcucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihwcm9jZXNzQ29uZmlnKSB7XHJcbiAgICAgICAgICAgIGlmIChwcm9jZXNzQ29uZmlnLl9pZCA9PSBwcm9jZXNzSWQpIHtcclxuICAgICAgICAgICAgICAgIHByb2Nlc3NDb25mID0gcHJvY2Vzc0NvbmZpZztcclxuICAgICAgICAgICAgICAgIHByb2Nlc3NDb25maWcuc3ViUHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihzdWJQcm9jZXNzQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1YlByb2Nlc3NDb25maWcuX2lkID09IHN1YlByb2Nlc3NJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzQ29uZiA9IHN1YlByb2Nlc3NDb25maWc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy8gaWYgKHN1YlByb2Nlc3MubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgLy8gXHRzdWJQcm9jZXNzU2VxID0gc3ViUHJvY2Vzcy5sZW5ndGggKyAxO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBUaGUgZGVmYXVsdCBzdWJQcm9jZXNzIG1vZGVsXHJcblxyXG4gICAgLy9UT0RPOiBDaGFuZ2UgcmVxdWlyZWQgdG8gbW92ZSBpc0FjdGl2ZSB0byBzdWJQcm9jZXNzIGZpbGUuSGVyZVxyXG5cclxuICAgIHZhciBncm91cEtleSA9ICcnO1xyXG4gICAgdmFyIGJhc2VVVUlEID0gZGF0YS5iYXNlVVVJRDtcclxuICAgIGlmIChiYXNlVVVJRCAhPSB1bmRlZmluZWQgJiYgYmFzZVVVSUQgIT0gJycgJiYgYmFzZVVVSUQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHZhciBwcmV2aW91c09iamVjdCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBiYXNlVVVJRCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICBncm91cEtleSA9IHByZXZpb3VzT2JqZWN0Lmdyb3VwS2V5O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBncm91cEtleSA9IGdlbmVyYXRlVVVJRCgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICB2YXIgc3ViUHJvY2Vzc09iamVjdElkID0gX1dGSW5zdGFuY2UucHJvZmlsZSArICc6JyArIF9XRkluc3RhbmNlLmFwcCArICc6JyArIHByb2Nlc3NJZCArICc6JyArIHByb2Nlc3NTZXEgKyAnOicgKyBzdWJQcm9jZXNzSWQgKyAnOicgKyBzdWJQcm9jZXNzU2VxO1xyXG4gICAgdmFyIG1vZGVsID0ge1xyXG4gICAgICAgIF9pZDogc3ViUHJvY2Vzc09iamVjdElkLFxyXG4gICAgICAgIGlkOiBzdWJQcm9jZXNzSWQsXHJcbiAgICAgICAgdHlwZTogJ3dvcmtmbG93SW5zdGFuY2VTdWJQcm9jZXNzJyxcclxuICAgICAgICBzZXE6IHN1YlByb2Nlc3NTZXEsXHJcbiAgICAgICAgaW5pdGlhdGVkOiBmYWxzZSxcclxuICAgICAgICBkYXRlczoge1xyXG4gICAgICAgICAgICBjcmVhdGVkOiAnJyxcclxuICAgICAgICAgICAgdmFsaWQ6ICcnLFxyXG4gICAgICAgICAgICBkdWU6ICcnLFxyXG4gICAgICAgICAgICBjbG9zZWQ6ICcnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wbGV0ZTogZmFsc2UsXHJcbiAgICAgICAgaW5kaWNhdG9yczogW10sXHJcbiAgICAgICAgc3RlcDoge30sXHJcbiAgICAgICAgYWN0aXZlOiB0cnVlLFxyXG4gICAgICAgIGdyb3VwS2V5OiBncm91cEtleSxcclxuICAgICAgICBjaGFubmVsczogW1xyXG4gICAgICAgICAgICBcImNvbW11bml0eV9cIiArIGFwcC5TQ09QRS5jb21tdW5pdHlJZCxcclxuICAgICAgICAgICAgXCJwcm9maWxlX1wiICsgYXBwLlNDT1BFLnByb2ZpbGVJZCxcclxuICAgICAgICAgICAgXCJhcHBsaWNhdGlvbl9cIiArIGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkLFxyXG4gICAgICAgICAgICBcImNvbW11bml0eV9cIiArIGFwcC5TQ09QRS5jb21tdW5pdHlJZCArIFwiX2FwcGxpY2F0aW9uX1wiICsgYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWRcclxuICAgICAgICBdXHJcbiAgICB9O1xyXG4gICAgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzLnB1c2gobW9kZWwpO1xyXG4gICAgLy8gUmV0dXJuIGEgcHJvbWlzZVxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIC8vIENhdGNoIGFsbCB1bmNhdWdodCBlcnJvcnNcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyAxLiBQcm9jZXNzIHRoZSBwcmUtYWN0aW9uc1xyXG4gICAgICAgICAgICB2YXIgcHJlQWN0aW9uc0NvbmYgPSBwcm9jZXNzQ29uZi5wcmVBY3Rpb25zO1xyXG4gICAgICAgICAgICBwcmVBY3Rpb25zKHByZUFjdGlvbnNDb25mLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIC8vIDIuIFByb2Nlc3MgdGhlIHByZS1yZXF1aXNpdGVzXHJcbiAgICAgICAgICAgICAgICB2YXIgcHJlcmVxdWlzaXRlQ29uZiA9IHByb2Nlc3NDb25mLnByZXJlcXVpc2l0ZXM7XHJcbiAgICAgICAgICAgICAgICBwcmVSZXF1aXNpdGVzKHByZXJlcXVpc2l0ZUNvbmYsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIDMuIEluaXRpYXRlIHRoZSBzdWJQcm9jZXNzXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluaXRpYXRlQ29uZiA9IHN1YlByb2Nlc3NDb25mLmluaXRpYXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYXRlKGluaXRpYXRlQ29uZiwgc3ViUHJvY2VzcywgZGF0YSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9VcGRhdGUgdGhlIHN1YlByb2Nlc3MgbW9kZWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuaW5pdGlhdGVkID0gcmVzdWx0LmRhdGEuaW5pdGlhdGVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5kYXRlcyA9IHJlc3VsdC5kYXRhLmRhdGVzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBFeGVjdXRlIHRoZSBmaXJzdCBzdGVwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGVwSWQgPSBzdWJQcm9jZXNzQ29uZi5zdGVwc1swXS5faWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0cmFuc2l0aW9uSWQgPSBzdWJQcm9jZXNzQ29uZi5zdGVwc1swXS50cmFuc2l0aW9uc1swXS5faWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGVwU2VxID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcChwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3RlcElkLCBzdGVwU2VxLCBkYXRhLCBfV0ZJbnN0YW5jZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLnN0ZXAgPSByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGluZGljYXRvciBzZWN0aW9ucyBvZiB0aGUgc3ViUHJvY2Vzc1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRpY2F0b3JzKHN1YlByb2Nlc3NDb25mLmluZGljYXRvcnMsIF9XRkluc3RhbmNlLCBtb2RlbC5faWQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5pbmRpY2F0b3JzID0gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEV4ZWN1dGUgdGhlIHRyYW5zaXRpb25zLCBpZiBhdXRvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb24ocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwgdHJhbnNpdGlvbklkLCBkYXRhLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgc3ViUHJvY2VzcyBzdGVwIGRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0cmFuc1Jlc3VsdCA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLnN0ZXAgPSByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDQuIFByb2Nlc3MgdGhlIHBvc3QtYWN0aW9uc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBvc3RBY3Rpb25zQ29uZiA9IHByb2Nlc3NDb25mLnBvc3RBY3Rpb25zO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zdEFjdGlvbnMocG9zdEFjdGlvbnNDb25mLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2Vzcyh0cmFuc1Jlc3VsdC5tZXNzYWdlLCBtb2RlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLnN1YnByb2Nlc3NlcyA9IF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gIShvYmouX2lkID09IHN1YlByb2Nlc3NPYmplY3RJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzID0gX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEob2JqLl9pZCA9PSBzdWJQcm9jZXNzT2JqZWN0SWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMgPSBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhKG9iai5faWQgPT0gc3ViUHJvY2Vzc09iamVjdElkKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFByb2Nlc3MgaW5pdGlhdGVcclxuICpcclxuICogQHBhcmFtIHtvYmplY3R9IGluaXRpYXRlIC0gdGhlIGluaXRpYXRlIGNvbmZpZyBkYXRhXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIC0gdGhlIHVzZXIgaW5wdXQgZGF0YVxyXG4gKlxyXG4gKiBAZXhhbXBsZSAnJ1xyXG4gKlxyXG4gKiBAcmV0dXJuICcnXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiBpbml0aWF0ZShpbml0aWF0ZSwgc3ViUHJvY2VzcywgZGF0YSkge1xyXG4gICAgdmFyIGNvbXBsZXRlZCA9IFtdO1xyXG4gICAgdmFyIHJlc3VsdCA9IHtcclxuICAgICAgICBpbml0aWF0ZWQ6IGZhbHNlLFxyXG4gICAgICAgIGRhdGVzOiB7XHJcbiAgICAgICAgICAgIGNyZWF0ZWQ6ICcnLFxyXG4gICAgICAgICAgICB2YWxpZDogJycsXHJcbiAgICAgICAgICAgIGR1ZTogJycsXHJcbiAgICAgICAgICAgIGNsb3NlZDogJydcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGluaXRpYXRlLl90eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICd1c2VyJzpcclxuICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUgc3ViUHJvY2VzcyBpbml0aWF0aW9uIGlzIHVzZXIgZGVmaW5lZCB0aGVuXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmRhdGVzLmNyZWF0ZWQgPSBkYXRhLmNyZWF0ZWREYXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbml0aWF0ZS5kYXRlcy52YWxpZC5fdHlwZSA9PSAndXNlclNlbGVjdGVkJyB8fCBpbml0aWF0ZS5kYXRlcy52YWxpZC5fdHlwZSA9PSAnYXV0b1NlbGVjdGVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS52YWxpZERhdGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmRhdGVzLnZhbGlkID0gZGF0YS52YWxpZERhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlsLndhcm4oJ1dGSW5pdGlhdGVFcnJvcicsICdObyB2YWxpZCBkYXRlIHBhc3NlZCBpbiAtIHtkYXRhLnZhbGlkRGF0ZX0nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5pdGlhdGUuZGF0ZXMuZHVlLl90eXBlID09ICd1c2VyU2VsZWN0ZWQnIHx8IGluaXRpYXRlLmRhdGVzLnZhbGlkLl90eXBlID09ICdhdXRvU2VsZWN0ZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmR1ZURhdGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmRhdGVzLmR1ZSA9IGRhdGEuZHVlRGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwud2FybignV0ZJbml0aWF0ZUVycm9yJywgJ05vIGR1ZSBkYXRlIHBhc3NlZCBpbiAtIHtkYXRhLmR1ZURhdGV9Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmluaXRpYXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1N1Yi1Qcm9jZXNzIGluaXRpYXRlIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywgcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnYXV0byc6XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIHN1YlByb2Nlc3MgaW5pdGlhdGlvbiBpcyB1c2VyIGRlZmluZWQgdGhlblxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5kYXRlcy5jcmVhdGVkID0gZGF0YS5jcmVhdGVkRGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5pdGlhdGUuZGF0ZXMudmFsaWQuX3R5cGUgPT0gJ3VzZXJTZWxlY3RlZCcgfHwgaW5pdGlhdGUuZGF0ZXMudmFsaWQuX3R5cGUgPT0gJ2F1dG9TZWxlY3RlZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEudmFsaWREYXRlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5kYXRlcy52YWxpZCA9IGRhdGEudmFsaWREYXRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC53YXJuKCdXRkluaXRpYXRlRXJyb3InLCAnTm8gdmFsaWQgZGF0ZSBwYXNzZWQgaW4gLSB7ZGF0YS52YWxpZERhdGV9Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluaXRpYXRlLmRhdGVzLmR1ZS5fdHlwZSA9PSAndXNlclNlbGVjdGVkJyB8fCBpbml0aWF0ZS5kYXRlcy5kdWUuX3R5cGUgPT0gJ2F1dG9TZWxlY3RlZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuZHVlRGF0ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZGF0ZXMuZHVlID0gZGF0YS5kdWVEYXRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC53YXJuKCdXRkluaXRpYXRlRXJyb3InLCAnTm8gZHVlIGRhdGUgcGFzc2VkIGluIC0ge2RhdGEuZHVlRGF0ZX0nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQuaW5pdGlhdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnU3ViLVByb2Nlc3MgaW5pdGlhdGUgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGSW5pdGlhdGVFcnJvcicsICdJbml0aWF0ZSB0eXBlOiAnICsgaW5pdGlhdGUuX3R5cGUgKyAnIG5vdCBkZWZpbmVkLicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHN1YlByb2Nlc3MuY29tcGxldGUgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGluaXQoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCFzdWJQcm9jZXNzLmNvbXBsZXRlKSB7XHJcbiAgICAgICAgICAgIGlmIChpbml0aWF0ZS5wYXJhbGxlbEluc3RhbmNlcykge1xyXG4gICAgICAgICAgICAgICAgaW5pdCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZJbml0aWF0ZUVycm9yJywgJ1N1Yi1wcm9jZXNzOiAnICsgc3ViUHJvY2Vzcy5pZCArICcgc3RpbGwgYWN0aXZlIGFuZCBwYXJhbGxlbCBpbnN0YW5jZXMgYXJlIG5vdCBhbGxvd2VkLicpO1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBQcm9jZXNzIHN0ZXBcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NJZCAtIHRoZSBjdXJyZW50IHByb2Nlc3MgaWRcclxuICogQHBhcmFtIHtzdHJpbmd9IHN1YlByb2Nlc3NJZCAtIHRoZSBjdXJyZW50IHN1Yi1wcm9jZXNzIGlkXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdGVwSWQgLSB0aGUgY3VycmVudCBzdWItcHJvY2VzcyBzdGVwIGlkXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGVwU2VxIC0gdGhlIGN1cnJlbnQgc3ViLXByb2Nlc3Mgc3RlcCBpbnN0YW5jZSBjb3VudGVyIC8gc2VxdWVuY2VcclxuICogQHBhcmFtIHtvYmplY3R9IGRhdGEgLSB0aGUgdXNlciBpbnB1dCBkYXRhXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IF9XRkluc3RhbmNlIGNvbnN0cnVjdG9yIGluc3RhbmNlXHJcbiAqXHJcbiAqIEBleGFtcGxlICcnXHJcbiAqXHJcbiAqIEByZXR1cm4gJydcclxuICpcclxuICovXHJcbmZ1bmN0aW9uIHN0ZXAocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwgc3RlcFNlcSwgZGF0YSwgX1dGSW5zdGFuY2UpIHtcclxuXHJcblxyXG4gICAgLy8gRGVmYXVsdCBzdGVwIG1vZGVsXHJcbiAgICB2YXIgbW9kZWwgPSB7XHJcbiAgICAgICAgaWQ6ICcnLFxyXG4gICAgICAgIHNlcTogJycsXHJcbiAgICAgICAgc3RhdHVzOiAnJyxcclxuICAgICAgICBtZXNzYWdlOiAnJyxcclxuICAgICAgICBhc3NpZ25lZFRvOiB7XHJcbiAgICAgICAgICAgIHVzZXJJZDogJycsXHJcbiAgICAgICAgICAgIG5hbWU6ICcnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhc3NpZ25tZW50OiB7fSxcclxuICAgICAgICBjb21tZW50OiAnJ1xyXG4gICAgfTtcclxuICAgIHZhciBzdWJQcm9jZXNzID0ge307XHJcbiAgICB2YXIgdXVpZCA9ICcnO1xyXG4gICAgdmFyIGluc3RTdWJQcm9jZXNzO1xyXG4gICAgdmFyIHN0ZXAgPSB7fTtcclxuICAgIHZhciB0cmFuc2l0aW9uSWQgPSAnJztcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvL0dldCB0aGUgY3VycmVudCBzdWJQcm9jZXNzIGluc3RhbmNlIGRhdGFcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmpQcm9jZXNzKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChvYmpQcm9jZXNzLmlkID09IHByb2Nlc3NJZCAmJiBvYmpQcm9jZXNzLnNlcSA9PSBwcm9jZXNzU2VxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqUHJvY2Vzcy5zdWJQcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKG9ialN1YlByb2Nlc3MpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmpTdWJQcm9jZXNzLmlkID09IHN1YlByb2Nlc3NJZCAmJiBvYmpTdWJQcm9jZXNzLnNlcSA9PSBzdWJQcm9jZXNzU2VxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dWlkID0gb2JqU3ViUHJvY2Vzcy51dWlkO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24oc3ViUHJvY2Vzc0l0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdWJQcm9jZXNzSXRlbS5faWQgPT0gdXVpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluc3RTdWJQcm9jZXNzID0gc3ViUHJvY2Vzc0l0ZW07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIF9XRkluc3RhbmNlLmNvbmZpZy5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKG9ialByb2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmpQcm9jZXNzLl9pZCA9PSBwcm9jZXNzSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmpQcm9jZXNzLnN1YlByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqU3ViUHJvY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqU3ViUHJvY2Vzcy5faWQgPT0gc3ViUHJvY2Vzc0lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzID0gb2JqU3ViUHJvY2VzcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ialN1YlByb2Nlc3Muc3RlcHMuZmlsdGVyKGZ1bmN0aW9uKG9ialN0ZXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqU3RlcC5faWQgPT0gc3RlcElkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXAgPSBvYmpTdGVwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBzdWItcHJvY2VzcyBzdGVwIGRhdGFcclxuICAgICAgICAgICAgbW9kZWwuaWQgPSBzdGVwSWQ7XHJcbiAgICAgICAgICAgIG1vZGVsLnNlcSA9IHN0ZXBTZXE7XHJcbiAgICAgICAgICAgIG1vZGVsLnN0YXR1cyA9IHN0ZXAuX3NldEluc3RhbmNlU3RhdHVzVG87XHJcbiAgICAgICAgICAgIG1vZGVsLm1lc3NhZ2UgPSBzdGVwLl9zZXRTdGF0dXNNc2dUbztcclxuICAgICAgICAgICAgLy9tb2RlbC5hc3NpZ25lZFRvLnVzZXJJZCA9IGRhdGEudXNlcklkICE9PSB1bmRlZmluZWQgPyBkYXRhLnVzZXJJZCA6ICcnO1xyXG4gICAgICAgICAgICAvL21vZGVsLmFzc2lnbmVkVG8ubmFtZSA9IGRhdGEubmFtZSAhPT0gdW5kZWZpbmVkID8gZGF0YS5uYW1lIDogJyc7XHJcbiAgICAgICAgICAgIG1vZGVsLmNvbW1lbnQgPSBkYXRhLmNvbW1lbnQgIT09IHVuZGVmaW5lZCA/IGRhdGEuY29tbWVudCA6ICcnO1xyXG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGluZGljYXRvciBkb2N1bWVudHMgcHJvY2VzcyBzdGVwIGRhdGFcclxuICAgICAgICAgICAgLy9jb21zby5sb2coJ2luc3RTdWJQcm9jZXNzPT09Jyk7XHJcbiAgICAgICAgICAgIC8vY29tc28ubG9nKGluc3RTdWJQcm9jZXNzKTtcclxuICAgICAgICAgICAgdmFyIGluZGljYXRvcnMgPSBpbnN0U3ViUHJvY2VzcyAhPT0gdW5kZWZpbmVkID8gaW5zdFN1YlByb2Nlc3MuaW5kaWNhdG9ycyA6IFtdO1xyXG4gICAgICAgICAgICBpbmRpY2F0b3JEb2NzKHByb2Nlc3NJZCwgaW5kaWNhdG9ycywgbW9kZWwsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgLy8gSWYgYWN0aW9ucyBhcmUgc3BlY2lmaWVkLCBleGVjdXRlIHRoZW1cclxuICAgICAgICAgICAgICAgIHZhciBjcmVhdGVkSUQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlICsgJzonICsgX1dGSW5zdGFuY2UuYXBwICsgJzonICsgcHJvY2Vzc0lkICsgJzonICsgcHJvY2Vzc1NlcSArICc6JyArIHN1YlByb2Nlc3NJZCArICc6JyArIHN1YlByb2Nlc3NTZXE7XHJcbiAgICAgICAgICAgICAgICB1dWlkID0gY3JlYXRlZElEO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzdGVwLmFjdGlvbnNbMF0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbnMoc3RlcC5hY3Rpb25zLCBwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3ViUHJvY2VzcywgbW9kZWwsIF9XRkluc3RhbmNlLCBkYXRhLCB1dWlkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEV4ZWN1dGUgdGhlIHRyYW5zaXRpb25zLCBpZiBhdXRvXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0FjdGlvbnMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCBtb2RlbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRWxzZSB0YXNrcyBhcmUgc3ByZWNpZmllZCwgZXhlY3V0ZSB0aGVtXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0ZXAudGFzayAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTWFrZSBhc3NpZ25tZW50c1xyXG4gICAgICAgICAgICAgICAgICAgIHRhc2socHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdGVwLnRhc2ssIGNyZWF0ZWRJRCwgbW9kZWwpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRvIHRhc2sgc3VjY2VzcyBoYW5kbGluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVGFzayBjb21wbGV0ZS4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1Rhc2sgYXdhaXRpbmcgdXNlciBhY3Rpb24uJywgbW9kZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBQcm9jZXNzIGluZGljYXRvciB1cGRhdGVzXHJcbiAqXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBhY3Rpb25zIC0gdGhlIGFjdGlvbnMgY29uZmlnIGRhdGFcclxuICogQHBhcmFtIHtvYmplY3R9IHN1YlByb2Nlc3MgLSB0aGUgY3VycmVudCBzdWItcHJvY2VzcyBmb3JtIGNvbmZpZyBkYXRhXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXHJcbiAqXHJcbiAqIEBleGFtcGxlICcnXHJcbiAqXHJcbiAqIEByZXR1cm4gJydcclxuICpcclxuICovXHJcbmZ1bmN0aW9uIGluZGljYXRvcnMoaW5kaWNhdG9ycywgX1dGSW5zdGFuY2UsIHNwdXVpZCkge1xyXG4gICAgdmFyIG1vZGVsID0gW107XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBpbmRpY2F0b3Igc2VjdGlvbnMgb2YgdGhlIHN1YlByb2Nlc3NcclxuXHJcbiAgICAgICAgICAgIHZhciBhcnJheSA9IEpTT04ueHBhdGgoXCJpbmRpY2F0b3JzW2ZuOmNvdW50KC4vd29ya2Zsb3dzL3Byb2Nlc3Nlc1tzdWJQcm9jZXNzVVVJRCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddKSBndCAwXVwiLCBfV0ZJbnN0YW5jZSwge30pO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGFycmF5Lmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yID0gYXJyYXlbal07XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yTW9kZWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlczogW11cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBpbnN0YW5jZU1vZGVsID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHV1aWQ6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICBrZXk6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcTogMVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaW5kaWNhdG9yTW9kZWwuaWQgPSBpbmRpY2F0b3IuY2F0ZWdvcnkudGVybTtcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlTW9kZWwudXVpZCA9IGluZGljYXRvci5faWQ7XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZU1vZGVsLnRpdGxlID0gaW5kaWNhdG9yLnRpdGxlO1xyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2VNb2RlbC5rZXkgPSAnJztcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlTW9kZWwuc2VxID0gaW5kaWNhdG9yLm1vZGVsLnBlbmRpbmcuc2VxOyAvLyBpbmRpY2F0b3Igc2VxIG51bWJlciBoZXJlIHdoaWNoIGlzIGdldHRpbmcgdXBkYXRlZC5cclxuICAgICAgICAgICAgICAgIGluZGljYXRvck1vZGVsLmluc3RhbmNlcy5wdXNoKGluc3RhbmNlTW9kZWwpO1xyXG4gICAgICAgICAgICAgICAgbW9kZWwucHVzaChpbmRpY2F0b3JNb2RlbCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnUHJvY2VzcyBpbmRpY2F0b3IgbW9kZWwgdXBkYXRlZC4nLCBtb2RlbCk7XHJcbiAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn07XHJcblxyXG4vKipcclxuICogUHJvY2VzcyBhc3NpZ24gdXNlclxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gcHJvY2VzcyBpZFxyXG4gKiBAcGFyYW0ge251bWJlcn0gcHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBwcm9jZXNzIHNlcVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3ViUHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3ViLXByb2Nlc3MgaWRcclxuICogQHBhcmFtIHtudW1iZXJ9IHN1YlByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2Ugc3ViLXByb2Nlc3Mgc2VxXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdGVwSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdGVwIGlkXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0cmFuc2l0aW9uSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiB0cmFuc2l0aW9uIGlkXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSB1c2VyIC0gdGhlIHVzZXIgdG8gYXNzaWduIHRvXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXHJcbiAqXHJcbiAqIEBleGFtcGxlICcnXHJcbiAqXHJcbiAqIEByZXR1cm4gJydcclxuICpcclxuICovXHJcbmZ1bmN0aW9uIGFzc2lnblVzZXIocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHVzZXIsIF9XRkluc3RhbmNlKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIHV1aWQgPSAnJztcclxuICAgICAgICAgICAgLy8gR2V0IHRoZSBjdXJyZW50IHN1YlByb2Nlc3MgaW5zdGFuY2UgZGF0YVxyXG4gICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbnN0YW5jZS5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKG9ialByb2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmpQcm9jZXNzLmlkID09IHByb2Nlc3NJZCAmJiBvYmpQcm9jZXNzLnNlcSA9PSBwcm9jZXNzU2VxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqUHJvY2Vzcy5zdWJQcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKG9ialN1YlByb2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9ialN1YlByb2Nlc3MuaWQgPT0gc3ViUHJvY2Vzc0lkICYmIG9ialN1YlByb2Nlc3Muc2VxID09IHN1YlByb2Nlc3NTZXEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV1aWQgPSBvYmpTdWJQcm9jZXNzLnV1aWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHN1YlByb2Nlc3NJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3ViUHJvY2Vzc0l0ZW0uX2lkID09IHV1aWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBTZXQgdGhlIHVzZXIgZGV0YWlsc1xyXG4gICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NJdGVtLnN0ZXAuYXNzaWduZWRUby51c2VySWQgPSB1c2VyLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NJdGVtLnN0ZXAuYXNzaWduZWRUby5uYW1lID0gdXNlci5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgaW5kaWNhdG9ycyB1c2VyIGRldGFpbHNcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9ycyA9IHN1YlByb2Nlc3NJdGVtLmluZGljYXRvcnM7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbmRpY2F0b3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3IgPSBpbmRpY2F0b3JzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGluZGljYXRvci5pbnN0YW5jZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IGluZGljYXRvci5pbnN0YW5jZXNbal07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IF9XRkluc3RhbmNlLmluZGljYXRvcnMubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZG9jID0gX1dGSW5zdGFuY2UuaW5kaWNhdG9yc1trXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2UudXVpZCA9PSBkb2MuX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvYy53b3JrZmxvd3MuZmlsdGVyKGZ1bmN0aW9uKHdvcmtmbG93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod29ya2Zsb3cuaWQgPT0gX1dGSW5zdGFuY2UuY29uZmlnLl9pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtmbG93LnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ocHJvY2Vzc0l0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb2Nlc3NJdGVtLmlkID09IHByb2Nlc3NJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSB1c2VyIGlkIGFuZCBuYW1lIGluIHRoZSBkb2N1bWVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0l0ZW0uc3RlcC5hc3NpZ25lZFRvLnVzZXJJZCA9IHVzZXIuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzSXRlbS5zdGVwLmFzc2lnbmVkVG8ubmFtZSA9IHVzZXIubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdVc2VyIGFzc2lnbmVkIHN1Y2Nlc3NmdWxseS4gVXNlcklkOiBcIicgKyB1c2VyLmlkICsgJ1wiLCBOYW1lOiBcIicgKyB1c2VyLm5hbWUgKyAnXCInLCBzdWJQcm9jZXNzSXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcbi8qKlxyXG4gKiBQcm9jZXNzIGluZGljYXRvciBkb2N1bWVudCB1cGRhdGVzXHJcbiAqXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBhY3Rpb25zIC0gdGhlIGFjdGlvbnMgY29uZmlnIGRhdGFcclxuICogQHBhcmFtIHtvYmplY3R9IHN1YlByb2Nlc3MgLSB0aGUgY3VycmVudCBzdWItcHJvY2VzcyBmb3JtIGNvbmZpZyBkYXRhXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXHJcbiAqXHJcbiAqIEBleGFtcGxlICcnXHJcbiAqXHJcbiAqIEByZXR1cm4gJydcclxuICpcclxuICovXHJcbmZ1bmN0aW9uIGluZGljYXRvckRvY3MocHJvY2Vzc0lkLCBpbmRpY2F0b3JzLCBzdGVwLCBfV0ZJbnN0YW5jZSkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgaW5kaWNhdG9yIHNlY3Rpb25zIG9mIHRoZSBzdWJQcm9jZXNzXHJcbiAgICAgICAgICAgIGlmIChpbmRpY2F0b3JzID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZJbmRpY2F0b3JzVXBkYXRlJywgJ0luZGljYXRvcnMgcGFyYW1ldGVyIGlzIHJlcXVpcmVkLiAtIFZhbHVlOiAnICsgaW5kaWNhdG9ycylcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbmRpY2F0b3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb21zby5sb2coJy0tPj4+Pj4+IEZpcnN0IElmIGNvbnNpdGlvbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3IgPSBpbmRpY2F0b3JzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaW5kaWNhdG9yLmluc3RhbmNlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbXNvLmxvZygnLS0+Pj4+Pj4gU2Vjb25kIElmIGNvbnNpdGlvbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSBpbmRpY2F0b3IuaW5zdGFuY2VzW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IF9XRkluc3RhbmNlLmluZGljYXRvcnMubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29tc28ubG9nKCctLT4+Pj4+PiBUaGlyZCBJZiBjb25zaXRpb24nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkb2MgPSBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzW2tdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlLnV1aWQgPT0gZG9jLl9pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29tc28ubG9nKCctLT4+Pj4+PiBGb3VydGggSWYgY29uc2l0aW9uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jLndvcmtmbG93cy5maWx0ZXIoZnVuY3Rpb24od29ya2Zsb3cpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdvcmtmbG93LmlkID09IF9XRkluc3RhbmNlLmNvbmZpZy5faWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29tc28ubG9nKCctLT4+Pj4+PiBGaWZ0aCBJZiBjb25zaXRpb24nKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtmbG93LnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ocHJvY2Vzc0l0ZW0pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb2Nlc3NJdGVtLmlkID09IHByb2Nlc3NJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzSXRlbS5zdGVwLmlkID0gc3RlcC5pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0l0ZW0uc3RlcC5zZXEgPSBzdGVwLnNlcTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0l0ZW0uc3RlcC5zdGF0dXMgPSBzdGVwLnN0YXR1cztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0l0ZW0uc3RlcC5tZXNzYWdlID0gc3RlcC5tZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzSXRlbS5zdGVwLmFzc2lnbmVkVG8udXNlcklkID0gc3RlcC5hc3NpZ25lZFRvLnVzZXJJZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0l0ZW0uc3RlcC5hc3NpZ25lZFRvLm5hbWUgPSBzdGVwLmFzc2lnbmVkVG8ubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0l0ZW0uc3RlcC5jb21tZW50ID0gc3RlcC5jb21tZW50ICE9PSB1bmRlZmluZWQgPyBzdGVwLmNvbW1lbnQgOiAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdJbmRpY2F0b3IgZG9jdW1lbnRzIHdvcmtmbG93IHByb2Nlc3MgbW9kZWwgdXBkYXRlZC4nLCBfV0ZJbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbXNvLmxvZygnaW5kaWNhdG9yRG9jcyBmdW5jdGlvbiBFTkRTLS0tLS0tLS0tLS0tLS0nKTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufTtcclxuXHJcbi8qKlxyXG4gKiBQcm9jZXNzIGFjdGlvbnNcclxuICpcclxuICogQHBhcmFtIHtvYmplY3R9IGFjdGlvbnMgLSB0aGUgYWN0aW9ucyBjb25maWcgZGF0YVxyXG4gKiBAcGFyYW0ge29iamVjdH0gc3ViUHJvY2VzcyAtIHRoZSBjdXJyZW50IHN1Yi1wcm9jZXNzIGZvcm0gY29uZmlnIGRhdGFcclxuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcclxuICpcclxuICogQGV4YW1wbGUgJydcclxuICpcclxuICogQHJldHVybiAnJ1xyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gYWN0aW9ucyhhY3Rpb25zLCBwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3ViUHJvY2Vzcywgc3RlcCwgX1dGSW5zdGFuY2UsIGRhdGEsIHV1aWQpIHtcclxuICAgIHZhciBhcnJBY3Rpb25zID0gW107XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgdXRpbC5zeW5jTG9vcChhY3Rpb25zLmxlbmd0aCwgZnVuY3Rpb24obG9vcCkge1xyXG4gICAgICAgICAgICB2YXIgY291bnRlciA9IGxvb3AuaXRlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgIGFjdGlvbihhY3Rpb25zW2NvdW50ZXJdLCBwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3ViUHJvY2Vzcywgc3RlcCwgX1dGSW5zdGFuY2UsIGRhdGEsIHV1aWQpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmV0QWN0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogYWN0aW9uc1tjb3VudGVyXS5faWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcTogY291bnRlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogcmVzdWx0XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBhcnJBY3Rpb25zLnB1c2gocmV0QWN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICBsb29wLm5leHQoKTtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvb3AuYnJlYWsoKTtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyBPbiBjb21wbGV0aW9uIG9mIHRoZSBsb29wXHJcblxyXG4gICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnQWN0aW9ucyBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIGFyckFjdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFByb2Nlc3MgYWN0aW9uXHJcbiAqXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBhY3Rpb24gLSB0aGUgYWN0aW9uIGNvbmZpZyBkYXRhXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBzdWJQcm9jZXNzIC0gdGhlIGN1cnJlbnQgc3ViLXByb2Nlc3MgZm9ybSBjb25maWcgZGF0YVxyXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxyXG4gKlxyXG4gKiBAZXhhbXBsZSAnJ1xyXG4gKlxyXG4gKiBAcmV0dXJuICcnXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiBhY3Rpb24oYWN0aW9uLCBwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3ViUHJvY2Vzcywgc3RlcCwgX1dGSW5zdGFuY2UsIGRhdGEsIHV1aWQpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi5tZXRob2QgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHZhciBtZXRob2RQb3NzaWJsZUl0ZW1zID0gW1wiZm9ybVwiLCBcImluZGljYXRvclwiLCBcInByb2ZpbGVcIiwgXCJzdWJQcm9jZXNzSW5zdGFuY2VcIiwgXCJzdGVwXCIsIFwiY29tbXVuaXR5XCIsIFwiYXBwbGljYXRpb25EZWZpbml0aW9uXCIsIFwiYXBwbGljYXRpb25BZG9wdGlvblwiLCBcInVzZXJcIiwgXCJzZG9cIl07XHJcbiAgICAgICAgICAgIHN3aXRjaCAocHJvcGVydHlFeGlzdHMoYWN0aW9uLm1ldGhvZCwgbWV0aG9kUG9zc2libGVJdGVtcykpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2Zvcm0nOlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnaW5kaWNhdG9yJzpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3Byb2ZpbGUnOlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnc3ViUHJvY2Vzc0luc3RhbmNlJzpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3N0ZXAnOlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnY29tbXVuaXR5JzpcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29tbXVuaXR5UG9zc2libGVJdGVtcyA9IFtcInNldFZhcmlhYmxlXCIsIFwiY3JlYXRlQ29tbXVuaXR5XCIsIFwidXNlckpvaW5Db21tdW5pdHlcIl07XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChwcm9wZXJ0eUV4aXN0cyhhY3Rpb24ubWV0aG9kLmNvbW11bml0eSwgY29tbXVuaXR5UG9zc2libGVJdGVtcykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc2V0VmFyaWFibGUnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjcmVhdGVDb21tdW5pdHknOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUuY29tbXVuaXR5LmNyZWF0ZUNvbW11bml0eShcInRlc3QxMjNcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd1c2VySm9pbkNvbW11bml0eSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJObyBtZXRob2QgZm91bmQgZnJvbSBpbXBsZW1lbnRlZCBsaXN0LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2FwcGxpY2F0aW9uRGVmaW5pdGlvbic6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdhcHBsaWNhdGlvbkFkb3B0aW9uJzpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3VzZXInOlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnc2RvJzpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcclxuICAgICAgICAgICAgdmFyIGNvbnRleHQgPSAnZ2xvYmFsJztcclxuICAgICAgICAgICAgdmFyIG1ldGhvZCA9ICcnO1xyXG4gICAgICAgICAgICBpZiAoYWN0aW9uLl9pZCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0ID0gYWN0aW9uLl9pZC5zcGxpdChcIi5cIilbMF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGFjdGlvbi5faWQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kID0gYWN0aW9uLl9pZC5zcGxpdChcIi5cIilbMV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYXJncy5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFjdGlvbi5fYXJncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGFyZyA9IGFjdGlvbi5fYXJnc1tpXTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoYXJnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncHJvY2Vzc0lkJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHByb2Nlc3NJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3Byb2Nlc3NTZXEnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2gocHJvY2Vzc1NlcSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N1YlByb2Nlc3NJZCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChzdWJQcm9jZXNzSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdzdWJQcm9jZXNzU2VxJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHN1YlByb2Nlc3NTZXEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdzdWJQcm9jZXNzJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHN1YlByb2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdzdGVwJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHN0ZXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdhY3Rpb24nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goYWN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUgcmVxdWlyZWQgcGFyYW1ldGVycyB0byB0aGUgYXJncyBhcnJheVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzID0gW107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYXJncy5wdXNoKF9XRkluc3RhbmNlKTtcclxuICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEuY3JlYXRlVHlwZSk7XHJcbiAgICAgICAgICAgIGFyZ3MucHVzaCh1dWlkKTtcclxuICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEuYmFzZVVVSUQpO1xyXG4gICAgICAgICAgICBhcmdzLnB1c2goZGF0YSk7XHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKGFjdGlvbi5faWQgPT0gJ2Zvcm0uY3JlYXRlJykge1xyXG4gICAgICAgICAgICAgICAgZm9ybS5jcmVhdGUoYXJncykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbi5faWQgPT0gJ2Zvcm0uYXV0aG9yaXNlJykge1xyXG4gICAgICAgICAgICAgICAgZm9ybS5hdXRob3Jpc2UoYXJncykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uLl9pZCA9PSAnZm9ybS5jbG9zZScpIHtcclxuICAgICAgICAgICAgICAgIGZvcm0uY2xvc2UoYXJncykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uLl9pZCA9PSAnZm9ybS5zZXREcmFmdCcpIHtcclxuICAgICAgICAgICAgICAgIGZvcm0uc2V0RHJhZnQoYXJncykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uLl9pZCA9PSAnZm9ybS5zZXRVbkRyYWZ0Jykge1xyXG4gICAgICAgICAgICAgICAgZm9ybS5zZXRVbkRyYWZ0KGFyZ3MpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbi5faWQgPT0gJ2Zvcm0uY3JlYXRlUHJvZmlsZScpIHtcclxuICAgICAgICAgICAgICAgIGZvcm0uY3JlYXRlUHJvZmlsZShhcmdzKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24uX2lkID09ICdmb3JtLnNldEluc3RhbmNlVGl0bGUnKSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtLnNldEluc3RhbmNlVGl0bGUoYXJncykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uLl9pZCA9PSAncHJvZmlsZS5kZWxldGUnKSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtLmRlbGV0ZVByb2ZpbGUoYXJncykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRkFjdGlvbkVycm9yJywgJ01ldGhvZDogJyArIGFjdGlvbl9pZCArICcgbm90IGRlZmluZWQuJyk7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGlmIChjb250ZXh0ID09ICdmb3JtJykge1xyXG4gICAgICAgICAgICAvLyBcdGZvcm1bbWV0aG9kXShhcmdzKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XHJcbiAgICAgICAgICAgIC8vIFx0XHRyZXNvbHZlKHJlc3VsdC5kYXRhKTtcclxuICAgICAgICAgICAgLy8gXHR9LCBmdW5jdGlvbihlcnIpe1xyXG4gICAgICAgICAgICAvLyBcdFx0cmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgIC8vIFx0fSk7XHJcbiAgICAgICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFx0dmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZBY3Rpb25FcnJvcicsICdNb2R1bGU6ICcgKyBjb250ZXh0ICsgJyBub3QgZGVmaW5lZC4nKTtcclxuICAgICAgICAgICAgLy8gXHRyZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFByb2Nlc3MgdGFza3NcclxuICpcclxuICogQHBhcmFtIHtvYmplY3R9IHRhc2sgLSB0aGUgdGFzayBjb25maWcgZGF0YVxyXG4gKiBAcGFyYW0ge29iamVjdH0gaW5wdXREYXRhIC0gdGhlIHVzZXIgaW5wdXQgZGF0YVxyXG4gKlxyXG4gKiBAZXhhbXBsZSAnJ1xyXG4gKlxyXG4gKiBAcmV0dXJuICcnXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiB0YXNrKHN1YnByb2Nlc3NJRCwgc3VicHJvY2Vzc1NFUSwgdGFzaywgc3B1dWlkLCBtb2RlbCkge1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICB2YXIgbGlzdCA9IFtdO1xyXG4gICAgICAgIGlmICh0YXNrLmFzc2lnbi5wcm9maWxlUm9sZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdmFyIGFzc2lnblR5cGUgPSAncHJvZmlsZVJvbGUnO1xyXG4gICAgICAgICAgICB2YXIgcHJvZmlsZUlkID0gYXBwLlNDT1BFLndvcmtmbG93LnByb2ZpbGU7XHJcbiAgICAgICAgICAgIHZhciBpZCA9ICcnO1xyXG4gICAgICAgICAgICBpZiAodGFzay5hc3NpZ24ucHJvZmlsZVJvbGUucHJvZmlsZSA9PSAnY3VycmVudCcpIHtcclxuICAgICAgICAgICAgICAgIGlkID0gYXBwLlNDT1BFLndvcmtmbG93LnByb2ZpbGU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFzay5hc3NpZ24ucHJvZmlsZVJvbGUucHJvZmlsZSA9PSAnY29tbXVuaXR5Jykge1xyXG4gICAgICAgICAgICAgICAgaWQgPSBhcHAuU0NPUEUuY29tbXVuaXR5SWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHJvbGUgPSB0YXNrLmFzc2lnbi5wcm9maWxlUm9sZS5yb2xlO1xyXG5cclxuICAgICAgICAgICAgbGlicmFyeS5nZXRVc2Vyc0xpc3RCeVJvbGUoaWQsIHJvbGUpLnRoZW4oZnVuY3Rpb24obGlzdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpc3QgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3QubGVuZ3RoID4gMSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYXNzaWduIHRvIHVzZXJzIHNlbmQgbm90aWZpY2F0aW9uc1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgcHJPYmplY3QgPSBKU09OLnhwYXRoKFwiL2luc3RhbmNlL3Byb2Nlc3Nlc1tzdWJQcm9jZXNzZXMvdXVpZCBlcSAnXCIrIHNwdXVpZCArXCInXVwiLGFwcC5TQ09QRS53b3JrZmxvdyx7fSlbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzcE9iamVjdCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddXCIsIGFwcC5TQ09QRS53b3JrZmxvdywge30pWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2hhbm5lbHMgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXS9jaGFubmVsc1wiLCBhcHAuU0NPUEUud29ya2Zsb3csIHt9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpbmFsTXNnID0gcHJvY2Vzc1dvcmtmbG93TWVzc2FnZShOT1RJRklDQVRJT05fVVNFUl9NU0dfQUNDRVBULCBzcHV1aWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb2Nlc3NJZCA9IHNwT2JqZWN0LmlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvY2Vzc1NlcSA9IHNwT2JqZWN0LnNlcTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgc3VicHJvY2Vzc0lEID0gcHJPYmplY3QuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIHN1YnByb2Nlc3NTRVEgPSBwck9iamVjdC5zZXE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWJwcm9jZXNzVVVJRCA9IHNwdXVpZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb2Nlc3NfVmFsaWREYXRlID0gc3BPYmplY3QuZGF0ZXMudmFsaWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29uZmlnUHJvY2VzcyA9IEpTT04ueHBhdGgoXCIvY29uZmlnL3Byb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3VicHJvY2Vzc0lEICsgXCInXVwiLCBhcHAuU0NPUEUud29ya2Zsb3csIHt9KVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbmZpZ1N1YlByb2Nlc3MgPSBKU09OLnhwYXRoKFwiL3N1YlByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgcHJvY2Vzc0lkICsgXCInXVwiLCBjb25maWdQcm9jZXNzLCB7fSlbMF07XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0ZXBTZXEgPSBzcE9iamVjdC5zdGVwLnNlcSArIDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm9jZXNzX0N1cnJlbnRTdGVwTmFtZSA9IEpTT04ueHBhdGgoXCIvc3RlcHNbX3NlcSBlcSAnXCIgKyBzdGVwU2VxICsgXCInXS9uYW1lL2kxOG5bMV0vdmFsdWVcIiwgY29uZmlnU3ViUHJvY2Vzcywge30pWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvY2Vzc05hbWUgPSBjb25maWdTdWJQcm9jZXNzLm5hbWUuaTE4blswXS52YWx1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBub3RmaWNhdGlvblJlcXVlc3QgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNvdXJjZVwiOiBcInJlbW90ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwibm90aWZpY2F0aW9uUmVxdWVzdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJfaWRcIjogc3B1dWlkICsgXCI6bm90aWZpY2F0aW9uUmVxdWVzdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGFubmVsc1wiOiBjaGFubmVscyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tbXVuaXR5SWRcIjogYXBwLlNDT1BFLmNvbW11bml0eUlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHBsaWNhdGlvbklkXCI6IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IGZpbmFsTXNnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlVHlwZVwiOiBcImluZm9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY3JlYXRlZERhdGVUaW1lXCI6IG1vbWVudCgpLmZvcm1hdCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZW5kZXJVc2VySWRcIjogTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFjdGlvbnNcIjogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IFwiVmlld1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZnVuY3Rpb25cIjogXCJhcHAub3BlblN1YnByb2Nlc3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmFtc1wiOiBbcHJvZmlsZUlkLCBwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHByb2Nlc3NOYW1lLCBzdWJwcm9jZXNzSUQsIHN1YnByb2Nlc3NTRVEsIHN1YnByb2Nlc3NVVUlELCBwcm9jZXNzX1ZhbGlkRGF0ZSwgcHJvY2Vzc19DdXJyZW50U3RlcE5hbWVdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVjZWl2ZXJcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwicm9sZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogcm9sZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxlSWRcIjogaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYW8udXBzZXJ0KG5vdGZpY2F0aW9uUmVxdWVzdCkuZG9uZShmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuZmFpbChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgc3BPYmplY3QgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiKyBzcHV1aWQgK1wiJ11cIixhcHAuU0NPUEUud29ya2Zsb3csIHt9KVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFzc2lnbm1lbnQgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhc2suYXNzaWduLmFzc2lnbm1lbnQgIT0gdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFzc2lnbm1lbnQgPSBtb2RlbC5hc3NpZ25tZW50OyAvL0pTT04ueHBhdGgoXCIvc3RlcC9hc3NpZ25tZW50XCIsc3BPYmplY3Qse30pWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjY2VwdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNob3dcIjogdGFzay5hc3NpZ24uYXNzaWdubWVudC5hY2NlcHQuc2hvdyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IF9nZXROYW1lKHRhc2suYXNzaWduLmFzc2lnbm1lbnQuYWNjZXB0LmxhYmVsLmkxOG4sICdlbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5hY2NlcHQgPSBhY2NlcHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50Lm1lc3NhZ2UgPSBfZ2V0TmFtZSh0YXNrLmFzc2lnbi5hc3NpZ25tZW50Lm1lc3NhZ2UuaTE4biwgJ2VuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVqZWN0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2hvd1wiOiB0YXNrLmFzc2lnbi5hc3NpZ25tZW50LnJlamVjdC5zaG93LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogX2dldE5hbWUodGFzay5hc3NpZ24uYXNzaWdubWVudC5yZWplY3QubGFiZWwuaTE4biwgJ2VuJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50LnJlamVjdCA9IHJlamVjdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb2ZpbGVJZFwiOiBwcm9maWxlSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyb2xlSWRcIjogcm9sZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJyb2xlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5wcm9maWxlUm9sZUlkID0gaWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoJ05vdGlmaWNhdGlvbnMgcmVxdWVzdCBzdWJtaXR0ZWQgZm9yIGFjY2VwdGFuY2UuJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobGlzdC5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2F1dG8gYXNzaWduXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1c2VySWQgPSBsaXN0WzBdLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdXNlcm5hbWUgPSBsaXN0WzBdLm5hbWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciBzcE9iamVjdCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIrIHNwdXVpZCArXCInXVwiLGFwcC5TQ09QRS53b3JrZmxvdywge30pWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXNzaWduZWUgPSBtb2RlbC5hc3NpZ25lZFRvOyAvL0pTT04ueHBhdGgoXCIvc3RlcC9hc3NpZ25lZFRvXCIsc3BPYmplY3Qse30pWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25lZS5uYW1lID0gdXNlcm5hbWUgKyBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25lZS51c2VySWQgPSB1c2VySWQgKyBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCdBc3NpZ25lZCB0byB0aGUgb25seSB1c2VyIGluIHJvbGUuJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVzZSBkZWZhdWx0IHVzZXJcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YXNrLmFzc2lnbi5kZWZhdWx0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVzZXJJZCA9IHRhc2suYXNzaWduLmRlZmF1bHQudXNlcklkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVzZXJuYW1lID0gdGFzay5hc3NpZ24uZGVmYXVsdC51c2VyTmFtZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciBzcE9iamVjdCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIrIHNwdXVpZCArXCInXVwiLGFwcC5TQ09QRS53b3JrZmxvdywge30pWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFzc2lnbmVlID0gbW9kZWwuYXNzaWduZWRUbzsgLy8gSlNPTi54cGF0aChcIi9zdGVwL2Fzc2lnbmVkVG9cIixzcE9iamVjdCx7fSlbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25lZS5uYW1lID0gdXNlcm5hbWUgKyBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduZWUudXNlcklkID0gdXNlcklkICsgXCJcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCdBc3NpZ25lZCB0byBkZWZhdWx0IHVzZXInKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIGluIGFzc2lnbm1lbnQuIERlZmF1bHQgdXNlciBub3Qgc3BlY2lmaWVkLicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCdFcnJvciBpbiBhc3NpZ25tZW50LiBEZWZhdWx0IHVzZXIgbm90IHNwZWNpZmllZC4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBpbiBnZXRVc2Vyc0xpc3RCeVJvbGUgdW5kZWZpbmVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIGluIGdldFVzZXJzTGlzdEJ5Um9sZScpO1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGFzay5hc3NpZ24uc3dpbWxhbmUgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoJ3N3aW1sYW5lJyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTd2ltbGFuZSBpbXBsZW1lbnRhdGlvbiAhIScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcblxyXG59O1xyXG5cclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIFByb2Nlc3MgdHJhbnNpdGlvblxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gcHJvY2VzcyBpZFxyXG4gKiBAcGFyYW0ge251bWJlcn0gcHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBwcm9jZXNzIHNlcVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3ViUHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3ViLXByb2Nlc3MgaWRcclxuICogQHBhcmFtIHtudW1iZXJ9IHN1YlByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2Ugc3ViLXByb2Nlc3Mgc2VxXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdGVwSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdGVwIGlkXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0cmFuc2l0aW9uSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiB0cmFuc2l0aW9uIGlkXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIC0gYW55IGFkZGl0aW9uYWwgZGF0YSBwYXNzZWQgaW4gYXMga2V5IHZhbHVlIHBhaXJzXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXHJcbiAqXHJcbiAqIEBleGFtcGxlICcnXHJcbiAqXHJcbiAqIEByZXR1cm4gJydcclxuICpcclxuICovXHJcbmZ1bmN0aW9uIHRyYW5zaXRpb24ocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwgdHJhbnNpdGlvbklkLCBkYXRhLCBfV0ZJbnN0YW5jZSkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHZhciBzdGVwU2VxID0gMDtcclxuICAgICAgICAgICAgdmFyIG5leHRTdGVwSWQgPSAnJztcclxuICAgICAgICAgICAgdmFyIG5leHRTdGVwU2VxID0gMDtcclxuICAgICAgICAgICAgdmFyIHN1YlByb2Nlc3MgPSBbXTtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRQcm9jZXNzID0gX1dGSW5zdGFuY2UuY29uZmlnLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqUHJvY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9ialByb2Nlc3MuX2lkID09IHByb2Nlc3NJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmpQcm9jZXNzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRTdWJQcm9jZXNzID0gY3VycmVudFByb2Nlc3NbMF0uc3ViUHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmpTdWJQcm9jZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqU3ViUHJvY2Vzcy5faWQgPT0gc3ViUHJvY2Vzc0lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9ialN1YlByb2Nlc3M7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudFN0ZXAgPSBjdXJyZW50U3ViUHJvY2Vzc1swXS5zdGVwcy5maWx0ZXIoZnVuY3Rpb24ob2JqU3RlcCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9ialN0ZXAuX2lkID09IHN0ZXBJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmpTdGVwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIHRyYW5zaXRpb24gPSBjdXJyZW50U3RlcFswXS50cmFuc2l0aW9ucy5maWx0ZXIoZnVuY3Rpb24ob2JqVHJhbnNpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9ialRyYW5zaXRpb24uX2lkID09IHRyYW5zaXRpb25JZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmpUcmFuc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjdXJyZW50U3ViUHJvY2Vzc1swXS5zdGVwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRTdWJQcm9jZXNzWzBdLnN0ZXBzW2ldLl9pZCA9PSBzdGVwSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGVwU2VxID0gcGFyc2VJbnQoY3VycmVudFN1YlByb2Nlc3NbMF0uc3RlcHNbaV0uX3NlcSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3VycmVudFN1YlByb2Nlc3NbMF0uc3RlcHMuZmlsdGVyKGZ1bmN0aW9uKHN0ZXBJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBuZXh0U3RlcFNlcSA9IHN0ZXBTZXEgKyAxO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KHN0ZXBJdGVtLl9zZXEpID09IG5leHRTdGVwU2VxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dFN0ZXBJZCA9IHN0ZXBJdGVtLl9pZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmpQcm9jZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqUHJvY2Vzcy5pZCA9PSBwcm9jZXNzSWQgJiYgb2JqUHJvY2Vzcy5zZXEgPT0gcHJvY2Vzc1NlcSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9ialByb2Nlc3Muc3ViUHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmpTdWJQcm9jZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmpTdWJQcm9jZXNzLmlkID09IHN1YlByb2Nlc3NJZCAmJiBvYmpTdWJQcm9jZXNzLnNlcSA9PSBzdWJQcm9jZXNzU2VxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdXVpZCA9IG9ialN1YlByb2Nlc3MudXVpZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHN1YlByb2Nlc3MgPSBvYmpTdWJQcm9jZXNzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihzdWJQcm9jZXNzSXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWJQcm9jZXNzSXRlbS5faWQgPT0gdXVpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzID0gc3ViUHJvY2Vzc0l0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB2YXIgbWF4U3RlcHMgPSBjdXJyZW50U3ViUHJvY2Vzc1swXS5zdGVwcy5sZW5ndGg7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodHJhbnNpdGlvblswXS5fdHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnYXV0byc6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRyYW5zaXRpb25bMF0uZ29Uby5fdHlwZSA9PSAnbmV4dFN0ZXAnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXAocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIG5leHRTdGVwSWQsIG5leHRTdGVwU2VxLCBkYXRhLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0U3RlcFNlcSA9PSBtYXhTdGVwcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdBbGwgU3RlcCB0cmFuc2l0aW9ucyBoYXZlIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzQ29tcGxldGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXA6IHJlc3VsdC5kYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1N0ZXAgdHJhbnNpdGlvbiBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHJlc3VsdC5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAndXNlcic6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRyYW5zaXRpb25bMF0uZ29Uby5fdHlwZSA9PSAnbmV4dFN0ZXAnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXAocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIG5leHRTdGVwSWQsIG5leHRTdGVwU2VxLCBkYXRhLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0U3RlcFNlcSA9PSBtYXhTdGVwcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdBbGwgU3RlcCB0cmFuc2l0aW9ucyBoYXZlIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzQ29tcGxldGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXA6IHJlc3VsdC5kYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1N0ZXAgdHJhbnNpdGlvbiBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHJlc3VsdC5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0cmFuc2l0aW9uWzBdLmdvVG8uX3R5cGUgPT0gJ3N0ZXBJZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdvVG9TdGVwSWQgPSB0cmFuc2l0aW9uWzBdLmdvVG8uX3N0ZXBJZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdvVG9TdGVwU2VxID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFN1YlByb2Nlc3NbMF0uc3RlcHMuZmlsdGVyKGZ1bmN0aW9uKHN0ZXBJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RlcEl0ZW0uX2lkID09IGdvVG9TdGVwSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnb1RvU3RlcFNlcSA9IHBhcnNlSW50KHN0ZXBJdGVtLl9zZXEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBnb1RvU3RlcElkLCBnb1RvU3RlcFNlcSwgZGF0YSwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ29Ub1N0ZXBTZXEgPT0gbWF4U3RlcHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnQWxsIFN0ZXAgdHJhbnNpdGlvbnMgaGF2ZSBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc0NvbXBsZXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwOiByZXN1bHQuZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdTdGVwIHRyYW5zaXRpb24gY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCByZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZUcmFuc2l0aW9uRXJyb3InLCAnVHJhbnNpdGlvbiB0eXBlOiAnICsgdHJhbnNpdGlvblswXS5fdHlwZSArICcgbm90IGRlZmluZWQuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBQcm9jZXNzIHBvc3RBY3Rpb25zXHJcbiAqXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBwb3N0QWN0aW9ucyAtIHRoZSBwb3N0QWN0aW9ucyBjb25maWcgZGF0YVxyXG4gKlxyXG4gKiBAZXhhbXBsZSAnJ1xyXG4gKlxyXG4gKiBAcmV0dXJuICcnXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiBwb3N0QWN0aW9ucyhwb3N0QWN0aW9ucywgX1dGSW5zdGFuY2UpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICB2YXIgY29tcGxldGVkID0gW107XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdXRpbC5zeW5jTG9vcChwb3N0QWN0aW9ucy5sZW5ndGgsIGZ1bmN0aW9uKGxvb3ApIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb3VudGVyID0gbG9vcC5pdGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGFjdGlvbihwb3N0QWN0aW9uc1tjb3VudGVyXSwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGFsbCBwcmUtcmVxdWlzaXRlcyBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlZC5wdXNoKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvb3AubmV4dCgpO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVkLnB1c2goZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvb3AuYnJlYWsoKTtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZWQuZXZlcnkoQm9vbGVhbikpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnUG9zdC1hY3Rpb25zIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywge30pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGUHJlQWN0aW9uc0Vycm9yJywgJ05vdCBhbGwgcG9zdC1hY3Rpb25zIHBhc3NlZC4nKTtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG5cclxuXHJcbi8qXHJcbmZ1bmN0aW9uIHNlbmROb3RpZmljYXRpb25zKHVzZXJzTGlzdCwgc3B1dWlkKXtcclxuXHJcbiAgLy8gZ2V0IHVzZXJzIGxpc3QgXHJcbiAgLy8gc2VuIG5vdGlmaWNhdGlvbnMgdG8gdXNlcnMgeSBhZGRpbmcgY2hhbm5lbHMgdG8gdGhlbVxyXG4gXHJcbiAgdmFyIGNoYW5uZWxBcnJheSA9IFtdO1xyXG5cclxuICBmb3IoaT0wO2k8dXNlcnNMaXN0Lmxlbmd0aDsgaSsrKXtcclxuICAgIGNoYW5uZWxBcnJheS5wdXNoKFwidXNlcl9cIit1c2Vyc0xpc3RbaV0uaWQpO1xyXG4gIH1cclxuXHJcbiAgXHJcbiAgYXNzaWduVG9Vc2Vycyhwcm9jZXNzV29ya2Zsb3dNZXNzYWdlKE5PVElGSUNBVElPTl9VU0VSX01TR19BQ0NFUFQsIHNwdXVpZCksIGNoYW5uZWxBcnJheSk7XHJcblxyXG5cclxuXHJcbn07Ki9cclxuXHJcbi8qZnVuY3Rpb24gYXNzaWduVG9Vc2VycyhtZXNzYWdlLCBjaGFubmVsQXJyYXkpe1xyXG5cclxuICAgICB2YXIgY2hhbm5lbHMgPSBjaGFubmVsQXJyYXk7XHJcbiAgICAgXHJcbiAgICAgdmFyIG5vdGlmaWNhdGlvbiA9ICB7IFxyXG4gICAgICAgICAgXCJfaWRcIjogZ2VuZXJhdGVVVUlEKCksXHJcbiAgICAgICAgICBcImNoYW5uZWxzXCI6Y2hhbm5lbHMsXHJcbiAgICAgICAgICBcIm1lc3NhZ2VcIjogbWVzc2FnZSxcclxuICAgICAgICAgIFwibWVzc2FnZVR5cGVcIjogXCJpbmZvXCIsXHJcbiAgICAgICAgICBcImNyZWF0ZWREYXRlVGltZVwiOiBtb21lbnQoKS5mb3JtYXQoKSxcclxuICAgICAgICAgIFwicmVhZFwiOiBmYWxzZSxcclxuICAgICAgICAgIFwicmVhZERhdGVUaW1lXCI6IFwiXCIsXHJcbiAgICAgICAgICBcInR5cGVcIjogXCJub3RpZmljYXRpb25cIixcclxuICAgICAgICAgIFwic2VuZGVyVXNlcklkXCI6IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkXHJcbiAgICAgICB9O1xyXG4gICAgICAgY29uc29sZS5sb2cobm90aWZpY2F0aW9uKTtcclxuICAgICAgIGRhby51cHNlcnQobm90aWZpY2F0aW9uKTtcclxuXHJcbiAgfTsqL1xyXG5cclxuZnVuY3Rpb24gcHJvY2Vzc1dvcmtmbG93TWVzc2FnZShtZXNzYWdlLCBzcHV1aWQpIHtcclxuXHJcbiAgICB2YXIgcmVwbGFjZWRNc2cgPSBtZXNzYWdlO1xyXG5cclxuICAgIGlmIChyZXBsYWNlZE1zZy5pbmRleE9mKCcjSU5TVEFOQ0VfTEFCRUwnKSAhPT0gLTEpIHtcclxuICAgICAgICB2YXIgdmFsID0gSlNPTi54cGF0aChcIi9pbnN0YW5jZS9wcm9jZXNzZXMvc3ViUHJvY2Vzc2VzW3V1aWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXS9sYWJlbFwiLCBhcHAuU0NPUEUud29ya2Zsb3csIHt9KVswXTtcclxuICAgICAgICByZXBsYWNlZE1zZyA9IHJlcGxhY2VkTXNnLnJlcGxhY2UoJyNJTlNUQU5DRV9MQUJFTCcsIHZhbCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGlmIChyZXBsYWNlZE1zZy5pbmRleE9mKCcjVVNFUl9OQU1FJykgIT09IC0xKSB7XHJcbiAgICAgICAgdmFyIHZhbCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL3N0ZXAvYXNzaWduZWRUby9uYW1lXCIsIGFwcC5TQ09QRS53b3JrZmxvdywge30pWzBdO1xyXG4gICAgICAgIHJlcGxhY2VkTXNnID0gcmVwbGFjZWRNc2cucmVwbGFjZSgnI1VTRVJfTkFNRScsIHZhbCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGlmIChyZXBsYWNlZE1zZy5pbmRleE9mKCcjUFJPRklMRV9USVRMRScpICE9PSAtMSkge1xyXG4gICAgICAgIHZhciB2YWwgPSBhcHAucHJvZmlsZS50aXRsZTtcclxuICAgICAgICByZXBsYWNlZE1zZyA9IHJlcGxhY2VkTXNnLnJlcGxhY2UoJyNQUk9GSUxFX1RJVExFJywgdmFsKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJlcGxhY2VkTXNnLmluZGV4T2YoJyNQUk9GSUxFX1RZUEUnKSAhPT0gLTEpIHtcclxuICAgICAgICB2YXIgdmFsID0gYXBwLlNDT1BFLkFQUF9DT05GSUcubmFtZTtcclxuICAgICAgICByZXBsYWNlZE1zZyA9IHJlcGxhY2VkTXNnLnJlcGxhY2UoJyNQUk9GSUxFX1RZUEUnLCB2YWwpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBpZiAocmVwbGFjZWRNc2cuaW5kZXhPZignI1ZBUl9TUFVVSUQnKSAhPT0gLTEpIHtcclxuICAgICAgICB2YXIgdmFsID0gc3B1dWlkO1xyXG4gICAgICAgIHJlcGxhY2VkTXNnID0gcmVwbGFjZWRNc2cucmVwbGFjZSgnI1ZBUl9TUFVVSUQnLCB2YWwpO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgcmV0dXJuIHJlcGxhY2VkTXNnO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gX2dldE5hbWUoYXJyLCBsYW5nKSB7XHJcbiAgICBpZiAoYXJyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoYXJyW2ldLl9sYW5nID09PSBsYW5nKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYXJyW2ldLnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gICAgcHJlUmVxdWlzaXRlczogcHJlUmVxdWlzaXRlcyxcclxuICAgIHByZUFjdGlvbnM6IHByZUFjdGlvbnMsXHJcbiAgICBzdWJQcm9jZXNzOiBzdWJQcm9jZXNzLFxyXG4gICAgaW5kaWNhdG9yRG9jczogaW5kaWNhdG9yRG9jcyxcclxuICAgIHRhc2s6IHRhc2ssXHJcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2l0aW9uLFxyXG4gICAgYXNzaWduVXNlcjogYXNzaWduVXNlclxyXG5cclxufSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBVdGlsaXR5IE1vZHVsZVxyXG4gKlxyXG4gKiBAbW9kdWxlIGxpYi91dGlsXHJcbiAqXHJcbiAqIEBhdXRob3IgQnJlbnQgR29yZG9uXHJcbiAqIEB2ZXJzaW9uIDAuMS4wXHJcbiAqXHJcbiAqIEBkZXNjcmlwdGlvblxyXG4gKiBXb3JrZmxvdyB1dGlsaXR5IG1vZHVsZSB1c2VkIHRvIGZvcm1hdCB0aGUgcmV0dXJuIGFuZCBlcnJvciBvYmplY3RzLCBhbmRcclxuICogY29udGFpbnMgc29tZSBvdGhlciB1dGlsaXR5IGZ1bmN0aW9ucyBzdWNoIGFzIGEgc3luYyBsb29wIGFuZCBjb21wYXJlLlxyXG4gKlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBTdWNjZXNzIGJsb2NrIHJldHVybiBvYmplY3QsIGNvbnRhaW5zIGEgbWVzc2FnZSBhbmQgb3B0aW9uYWwgZGF0YSBvYmplY3QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gdGhlIHN1Y2Nlc3MgbWVzc2FnZVxyXG4gKiBAcGFyYW0ge3N0cmluZ3xPYmplY3R9IFtkYXRhXSAtIHRoZSBzdWNjZXNzIHJldHVybmVkIGRhdGFcclxuICpcclxuICogQGV4YW1wbGVcclxuICogLy8gUmV0dXJuIHN1Y2Nlc3Mgd2l0aG91dCBhIGRhdGEgYmxvY2tcclxuICogdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1N1Y2Nlc3MgbWVzc2FnZSBnb2VzIGhlcmUuLi4nKTtcclxuICpcclxuICogQHJldHVybiB7T2JqZWN0fSAtIHdpdGggbWVzc2FnZSBhbmQgZGF0YSBwcm9wZXJ0aWVzXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiBzdWNjZXNzKG1lc3NhZ2UsIGRhdGEpe1xyXG5cdHJldHVybiB7XHJcblx0XHRtZXNzYWdlOiBtZXNzYWdlLFxyXG5cdFx0ZGF0YTogZGF0YVxyXG5cdH07XHJcbn07XHJcblxyXG4vKipcclxuICogV2FybmluZyBibG9jayByZXR1cm4gb2JqZWN0LCBjb250YWlucyBhIG1lc3NhZ2UgYW5kIG9wdGlvbmFsIGRhdGEgb2JqZWN0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIHRoZSB3YXJuaW5nIG1lc3NhZ2VcclxuICogQHBhcmFtIHtzdHJpbmd8T2JqZWN0fSBbZGF0YV0gLSB0aGUgcmV0dXJuZWQgZGF0YVxyXG4gKlxyXG4gKiBAZXhhbXBsZVxyXG4gKiAvLyBSZXR1cm4gc3VjY2VzcyB3aXRob3V0IGEgZGF0YSBibG9ja1xyXG4gKiB2YXIgc3VjY2VzcyA9IHV0aWwud2FybignV2FybmluZyBtZXNzYWdlIGdvZXMgaGVyZS4uLicpO1xyXG4gKlxyXG4gKiBAcmV0dXJuIHtPYmplY3R9IHdpdGggbWVzc2FnZSBhbmQgZGF0YSBwcm9wZXJ0aWVzLCBhbmQgbG9ncyB0aGUgd2FybmluZyB0byB0aGUgY29uc29sZS5cclxuICpcclxuICovXHJcbmZ1bmN0aW9uIHdhcm4obWVzc2FnZSwgZGF0YSl7XHJcblx0Y29uc29sZS53YXJuKGRhdGEpO1xyXG5cdHJldHVybiB7XHJcblx0XHR3YXJuaW5nOiBtZXNzYWdlLFxyXG5cdFx0ZGF0YTogZGF0YVxyXG5cdH07XHJcbn07XHJcblxyXG4vKipcclxuICogRXJyb3IgYmxvY2sgSlMgZXJyb3Igb2JqZWN0LCBjb250YWlucyBhIGNvZGUgYW5kIG1lc3NhZ2UgZm9yIHRoZSBlcnJvci5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGNvZGUgLSB0aGUgZXJyb3IgY29kZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIHRoZSBlcnJvciBtZXNzYWdlXHJcbiAqXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBzdWNjZXNzID0gdXRpbC5lcnJvcignRXJyb3IwMDEnLCdFcnJvciBtZXNzYWdlIGdvZXMgaGVyZS4uLicpO1xyXG4gKlxyXG4gKiBAcmV0dXJuIHtPYmplY3R9IHdpdGggYSBjb2RlIGFuZCBtZXNzYWdlIHByb3BlcnRpZXMuXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiBlcnJvcihjb2RlLCBtZXNzYWdlKXtcclxuXHR2YXIgZXJyID0gbmV3IEVycm9yKCcnKTtcclxuXHRlcnIubmFtZSA9IGNvZGU7XHJcblx0ZXJyLm1lc3NhZ2UgPSBtZXNzYWdlO1xyXG5cdHJldHVybiBlcnI7XHJcbn07XHJcblxyXG4vKipcclxuICogQSBsb29wIHdoaWNoIGNhbiBsb29wIFggYW1vdW50IG9mIHRpbWVzLCB3aGljaCBjYXJyaWVzIG91dFxyXG4gKiBhc3luY2hyb25vdXMgY29kZSwgYnV0IHdhaXRzIGZvciB0aGF0IGNvZGUgdG8gY29tcGxldGUgYmVmb3JlIGxvb3BpbmcuXHJcbiAqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBpdGVyYXRpb25zIC0gdGhlIG51bWJlciBvZiBpdGVyYXRpb25zIHRvIGNhcnJ5IG91dFxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBwcm9jZXNzIC0gdGhlIGNvZGUvZnVuY3Rpb24gd2UncmUgcnVubmluZyBmb3IgZXZlcnlcclxuICogaXRlcmF0aW9uXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGV4aXQgLSBhbiBvcHRpb25hbCBjYWxsYmFjayB0byBjYXJyeSBvdXQgb25jZSB0aGUgbG9vcFxyXG4gKiBoYXMgY29tcGxldGVkXHJcbiAqXHJcbiAqIEBleGFtcGxlXHJcbiAqIHV0aWwuc3luY0xvb3AoNSwgZnVuY3Rpb24obG9vcCl7XHJcbiAqIFx0dmFyIGNvdW50ZXIgPSBsb29wLml0ZXJhdGlvbigpO1xyXG4gKiBcdC8vIEFkZCBhc3luYyBjYWxscyBoZXJlLi5cclxuICpcclxuICogfSwgZnVuY3Rpb24oKXtcclxuICogXHQvLyBPbiBjb21wbGV0ZSBwZXJmb3JtIGFjdGlvbnMgaGVyZS4uLlxyXG4gKlxyXG4gKiB9KTtcclxuICpcclxuICogQHJldHVybiB7T2JqZWN0fSB0aGUgbG9vcCBjb250cm9sIG9iamVjdC5cclxuICpcclxuICovXHJcbmZ1bmN0aW9uIHN5bmNMb29wKGl0ZXJhdGlvbnMsIHByb2Nlc3MsIGV4aXQpe1xyXG4gICAgdmFyIGluZGV4ID0gMCxcclxuICAgICAgICBkb25lID0gZmFsc2UsXHJcbiAgICAgICAgc2hvdWxkRXhpdCA9IGZhbHNlO1xyXG4gICAgdmFyIGxvb3AgPSB7XHJcbiAgICAgICAgbmV4dDpmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZihkb25lKXtcclxuICAgICAgICAgICAgICAgIGlmKHNob3VsZEV4aXQgJiYgZXhpdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV4aXQoKTsgLy8gRXhpdCBpZiB3ZSdyZSBkb25lXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gSWYgd2UncmUgbm90IGZpbmlzaGVkXHJcbiAgICAgICAgICAgIGlmKGluZGV4IDwgaXRlcmF0aW9ucyl7XHJcbiAgICAgICAgICAgICAgICBpbmRleCsrOyAvLyBJbmNyZW1lbnQgb3VyIGluZGV4XHJcbiAgICAgICAgICAgICAgICBwcm9jZXNzKGxvb3ApOyAvLyBSdW4gb3VyIHByb2Nlc3MsIHBhc3MgaW4gdGhlIGxvb3BcclxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIHdlJ3JlIGRvbmVcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlOyAvLyBNYWtlIHN1cmUgd2Ugc2F5IHdlJ3JlIGRvbmVcclxuICAgICAgICAgICAgICAgIGlmKGV4aXQpIGV4aXQoKTsgLy8gQ2FsbCB0aGUgY2FsbGJhY2sgb24gZXhpdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpdGVyYXRpb246ZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIGluZGV4IC0gMTsgLy8gUmV0dXJuIHRoZSBsb29wIG51bWJlciB3ZSdyZSBvblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYnJlYWs6ZnVuY3Rpb24oZW5kKXtcclxuICAgICAgICAgICAgZG9uZSA9IHRydWU7IC8vIEVuZCB0aGUgbG9vcFxyXG4gICAgICAgICAgICBzaG91bGRFeGl0ID0gZW5kOyAvLyBQYXNzaW5nIGVuZCBhcyB0cnVlIG1lYW5zIHdlIHN0aWxsIGNhbGwgdGhlIGV4aXQgY2FsbGJhY2tcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgbG9vcC5uZXh0KCk7XHJcbiAgICByZXR1cm4gbG9vcDtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGNvbXBhcmUoc3ViamVjdCwgb3BlcmF0b3IsIHZhbHVlKSB7XHJcbiAgXHRzd2l0Y2ggKG9wZXJhdG9yKSB7XHJcbiAgXHRcdGNhc2UgJ2dyZWF0ZXJUaGFuJzpcclxuXHRcdFx0cmV0dXJuIHN1YmplY3QgPiB2YWx1ZTtcclxuXHRcdGNhc2UgJ2xlc3NUaGFuJzpcclxuXHRcdFx0cmV0dXJuIHN1YmplY3QgPCB2YWx1ZTtcclxuXHRcdGNhc2UgJ2dyZWF0ZXJUaGFuRXF1YWwnOlxyXG5cdFx0XHRyZXR1cm4gc3ViamVjdCA+PSB2YWx1ZTtcclxuXHRcdGNhc2UgJ2xlc3NUaGFuRXF1YWwnOlxyXG5cdFx0XHRyZXR1cm4gc3ViamVjdCA8PSB2YWx1ZTtcclxuXHRcdGNhc2UgJ2VxdWFsVG8nOlxyXG5cdFx0XHRyZXR1cm4gc3ViamVjdCA9PT0gdmFsdWU7XHJcblx0XHRjYXNlICdub3RFcXVhbFRvJzpcclxuXHRcdFx0cmV0dXJuIHN1YmplY3QgIT09IHZhbHVlO1xyXG4gIFx0fVxyXG59O1xyXG5cclxuZnVuY3Rpb24gZ2V0TmFtZShhcnIsIGxhbmcpe1xyXG5cdGlmIChhcnIgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoIDsgaSsrKSB7XHJcblx0XHRcdGlmIChhcnJbaV0uaTE4bi5fbGFuZyA9PT0gbGFuZykge1xyXG5cdFx0XHRcdHJldHVybiBhcnJbaV0uaTE4bi52YWx1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gXHRzdWNjZXNzOiBzdWNjZXNzLFxyXG4gXHR3YXJuOiB3YXJuLFxyXG4gXHRlcnJvcjogZXJyb3IsXHJcbiBcdHN5bmNMb29wOiBzeW5jTG9vcCxcclxuIFx0Y29tcGFyZTogY29tcGFyZSxcclxuXHRnZXROYW1lOiBnZXROYW1lXHJcblxyXG4gfVxyXG4iXX0=
