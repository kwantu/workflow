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

        createCommunity: function(_def, _WFInstance) {

            return new Promise(function(resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.communityId;
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                var uuid = JSON.xpath("/indicators[category/term eq 'Community']/_id", _WFInstance, {})[0];
                var action = {
                    "createCommunity": {
                        "newCommunityId": _WFInstance.profile,
                        "indicatorUUID": {
                            "Community": uuid
                        }
                    }
                };
                workerObject.action = action;
                worker.send(workerObject).then(function(workerSuccess) {

                    var success = util.success('Worker processed successfully.', workerSuccess);
                    resolve(success);

                }, function(workerFail) {
                    reject(workerFail);
                });
            });
        },
        userJoinCommunity: function(_def, _WFInstance) {

            return new Promise(function(resolve, reject) {

            });

        },
        releaseAdoptedApplication: function(_def, _WFInstance) {

            return new Promise(function(resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.communityId;
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;

                var uuidReleaseAdoptedApplication = JSON.xpath("/indicators[category/term eq 'ReleaseAdoptedApplication']/_id", _WFInstance, {})[0];

                var action = {
                    "releaseAdoptedApplication": {
                        "communityId": _WFInstance.profile,
                        "indicatorUUID": {
                            "ReleaseAdoptedApplication": uuidReleaseAdoptedApplication
                        }
                    }
                };
                workerObject.action = action;
                worker.send(workerObject).then(function(workerSuccess) {

                    var success = util.success('Worker processes successfully.', workerSuccess);
                    resolve(success);

                }, function(workerFail) {
                    reject(workerFail);
                });
            });
        }

    }

})();

var application = (function() {

    return {

        createAppDefinition: function(_def, _WFInstance) {

            return new Promise(function(resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.communityId;
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;

                var uuid = JSON.xpath("/indicators[category/term eq 'Application']/_id", _WFInstance, {})[0];
                var action = {
                    "createApplication": {
                        "newApplicationId": _WFInstance.profile,
                        "indicatorUUID": {
                            "Application": uuid
                        }
                    }
                };
                workerObject.action = action;
                worker.send(workerObject).then(function(workerSuccess) {

                    var success = util.success('Worker processes successfully.', workerSuccess);
                    resolve(success);

                }, function(workerFail) {
                    reject(workerFail);
                });
            });

        },

        buildApplication: function(_def, _WFInstance) {

            return new Promise(function(resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.communityId;
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;

                var uuidPublishApplication = JSON.xpath("/indicators[category/term eq 'PublishApplication']/_id", _WFInstance, {})[0];
                var uuidApplicationDefinition = JSON.xpath("/indicators[category/term eq 'ApplicationDefinition']/_id", _WFInstance, {})[0];
                var uuidRoles = JSON.xpath("/indicators[category/term eq 'Roles']/_id", _WFInstance, {})[0];
                var uuidApplication = JSON.xpath("/indicators[category/term eq 'Application']/_id", _WFInstance, {})[0];

                var action = {
                    "buildApplication": {
                        "applicationId": _WFInstance.profile,
                        "indicatorUUID": {
                            "PublishApplication": uuidPublishApplication,
                            "ApplicationDefinition": uuidApplicationDefinition,
                            "Roles": uuidRoles,
                            "Application": uuidApplication
                        }
                    }
                };
                workerObject.action = action;
                worker.send(workerObject).then(function(workerSuccess) {

                    var success = util.success('Worker processes successfully.', workerSuccess);
                    resolve(success);

                }, function(workerFail) {
                    reject(workerFail);
                });
            });

        },

        applicationAdoption: function(_def, _WFInstance) {

            return new Promise(function(resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.communityId;
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;

                var uuidAdoption = JSON.xpath("/indicators[category/term eq 'Adoption']/_id", _WFInstance, {})[0];
                var uuidPublishApplication = JSON.xpath("/indicators[category/term eq 'PublishApplication']/_id", _WFInstance, {})[0];
                var uuidApplication = JSON.xpath("/indicators[category/term eq 'Application']/_id", _WFInstance, {})[0];

                var action = {
                    "adoptApplication": {
                        "applicationId": _WFInstance.profile,
                        "indicatorUUID": {
                            "Adoption": uuidAdoption,
                            "PublishApplication": uuidPublishApplication,
                            "Application": uuidApplication
                        }
                    }
                };
                workerObject.action = action;
                worker.send(workerObject).then(function(workerSuccess) {

                    var success = util.success('Worker processes successfully.', workerSuccess);
                    resolve(success);

                }, function(workerFail) {
                    reject(workerFail);
                });
            });

        }
    }

})();


var worker = (function() {


    return {

        getWorkerWrapper: function() {

            var wrapper = {
                "source": "remote",
                "type": "workerObject",
                "_id": "",
                "channels": [],
                "communityId": "",
                "applicationId": "",
                "message": "",
                "messageType": "info",
                "createdDateTime": "",
                "senderUserId": "",
                "notification": {

                },
                "action": {

                }
            };

            return wrapper;

        },
        send: function(workerObject) {

            return new Promise(function(resolve, reject) {

                console.log('Submitting Worker Object to server');
                console.log(workerObject);
                dao.save(workerObject).done(function(workerResponse) {
                    resolve(workerResponse);
                }).fail(function(err) {
                    console.log('Error submitting worker response !!' + err);
                    reject(err);
                })


            });

        }
    }

})();

module.exports = {

    community: community,
    application: application,
    worker: worker

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
            var methodPossibleItems = ["form", "indicator", "profile", "subProcessInstance", "step", "community", "application", "user", "sdo"];
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
                    var communityPossibleItems = ["createCommunity", "releaseAdoptedApplication", "userJoinCommunity"];
                    switch (propertyExists(action.method.community, communityPossibleItems)) {

                        case 'createCommunity':
                            return actionsModule.community.createCommunity(action.method.community.createCommunity, _WFInstance).then(function(result) {
                                resolve(result.data);
                            }, function(err) {
                                reject(err);
                            });

                        case 'releaseAdoptedApplication':
                            return actionsModule.community.releaseAdoptedApplication(action.method.community.releaseAdoptedApplication, _WFInstance).then(function(result) {
                                resolve(result.data);
                            }, function(err) {
                                reject(err);
                            });

                        case 'userJoinCommunity':
                            return actionsModule.community.userJoinCommunity(action.method.community.userJoinCommunity, _WFInstance).then(function(result) {
                                resolve(result.data);
                            }, function(err) {
                                reject(err);
                            });

                        default:
                            reject("No method found from implemented list.");
                            break;
                    }
                    break;
                case 'application':
                    var applicationPossibleItems = ["createAppDefinition", "buildApplication", "applicationAdoption"];
                    switch (propertyExists(action.method.application, applicationPossibleItems)) {

                        case 'createAppDefinition':
                            return actionsModule.application.createAppDefinition(action.method.application.createAppDefinition, _WFInstance).then(function(result) {
                                resolve(result.data);
                            }, function(err) {
                                reject(err);
                            });

                        case 'buildApplication':
                            return actionsModule.application.buildApplication(action.method.application.buildApplication, _WFInstance).then(function(result) {
                                resolve(result.data);
                            }, function(err) {
                                reject(err);
                            });

                        case 'applicationAdoption':
                            return actionsModule.application.applicationAdoption(action.method.application.applicationAdoption, _WFInstance).then(function(result) {
                                resolve(result.data);
                            }, function(err) {
                                reject(err);
                            });

                        default:
                            reject("No method found from implemented list.");
                            break;
                    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VzZXJzL0hhc2FuL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImluZGV4LmpzIiwibGliL2FjdGlvbnMuanMiLCJsaWIvZm9ybS5qcyIsImxpYi9pbnRlcmZhY2UuanMiLCJsaWIvcHJvY2Vzcy5qcyIsIm5vZGVfbW9kdWxlcy91dGlsaXR5L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3a0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbFJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcG5CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNThDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBQcm9jZXNzID0gcmVxdWlyZSgnLi9saWIvcHJvY2VzcycpO1xyXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWxpdHknKTtcclxudmFyIHVzZXJJbnRlcmZhY2UgPSByZXF1aXJlKCcuL2xpYi9pbnRlcmZhY2UnKTtcclxuXHJcbi8qZ2xvYmFscyAqL1xyXG5cclxuLyoqXHJcbiAqIEEgbmV3IFdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlIGNvbnRhaW5zIHRoZSByZWZlcmVuY2UgdG8gdGhlIGFwcGxpY2F0aW9uXHJcbiAqIGFuZCBhc3NvY2lhdGVkIHByb2ZpbGUgd2hpY2ggaXQgcmVxdWlyZXMgYXMgdGhlIGZpcnN0IHR3byBwYXJhbWV0ZXJzLiBJdCBhbHNvXHJcbiAqIHJlcXVpcmVzIGEgd29ya2Zsb3cgY29uZmlndXJhdGlvbiwgYXMgdGhlIHRoaXJkIHBhcmFtZXRlciwgd2hpY2ggaXMgdXNlZCB0b1xyXG4gKiBkZXNjaWJlIHRoZSB3b3JrZmxvdyBwcm9jZXNzZXMuIElmIGEgd29ya2Zsb3cgaW5zdGFuY2UgZXhpc3RzIHlvdSBjYW4gcGFzcyBpdFxyXG4gKiBpbiBhcyB0aGUgZm91cnRoIHBhcmFtZXRlciB3aGljaCBpdCB3aWxsIHRoZW4gdXNlLCBlbHNlIGNyZWF0ZSBhIG5ldyBvbmUuXHJcbiAqXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvZmlsZSAtIFRoZSBjdXJyZW50IHByb2ZpbGUgaWRcclxuICogQHBhcmFtIHtzdHJpbmd9IGFwcCAtIFRoZSBhc3NvY2lhdGVkIGFwcGxpY2F0aW9uIGlkXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgLSBUaGUgYXBwbGljYXRpb24gd29ya2Zsb3cgY29uZmlndXJhdGlvbiAvIGRlZmluaXRpb25cclxuICogQHBhcmFtIHtPYmplY3R9IFtpbnN0YW5jZV0gLSBBbiBleGlzdGluZyBhcHBsaWNhdGlvbiBwcm9maWxlIHdvcmtmbG93IGluc3RhbmNlIGJhc2VkXHJcbiAqIG9uIHRoZSBkZWZpbml0aW9uXHJcbiAqXHJcbiAqIEBhdXRob3IgQnJlbnQgR29yZG9uXHJcbiAqIEB2ZXJzaW9uIDAuMS4wXHJcbiAqXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBjb25maWcgPSB7ICdfaWQnOiAnYWJjMTIzJyB9O1xyXG4gKiB2YXIgaW5zdGFuY2UgPSB7ICdfaWQnOiAnaW5zdGFuY2VfYWJjMTIzJyB9O1xyXG4gKiAvLyBJZiB0aGVyZSBpc24ndCBhbiBleGlzdGluZyBpbnN0YW5jZVxyXG4gKiB2YXIgd29ya2Zsb3cgPSBuZXcgV29ya2Zsb3coJzEyMzQnLCAnNTY3OCcsIGNvbmZpZyk7XHJcbiAqIC8vIElmIHRoZXJlIGlzIGFuIGV4aXN0aW5nIGluc3RhbmNlXHJcbiAqIHZhciB3b3JrZmxvdyA9IG5ldyBXb3JrZmxvdygnMTIzNCcsICc1Njc4JywgY29uZmlnLCBpbnN0YW5jZSk7XHJcbiAqXHJcbiAqIEByZXR1cm4ge09iamVjdH0gbmV3IFdvcmtmbG93IG9iamVjdFxyXG4gKlxyXG4gKiBAdGhyb3dzIEVycm9yOiBBIHByb2ZpbGUgaWQgaXMgcmVxdWlyZWRcclxuICogQHRocm93cyBFcnJvcjogQW4gYXBwIGlkIGlzIHJlcXVpcmVkXHJcbiAqIEB0aHJvd3MgRXJyb3I6IEEgd29ya2Zsb3cgY29uZmlndXJhdGlvbiBpcyByZXF1aXJlZFxyXG4gKlxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIFdvcmtmbG93KHByb2ZpbGUsIGNvbW11bml0eUlkLCBhcHAsIGNvbmZpZyl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcclxuXHQvLyBDb21tdW5pdHkgSUQgdmFsaWRhdGlvbiBjaGVja3NcclxuXHRpZiAoY29tbXVuaXR5SWQgPT0gJycgfHwgY29tbXVuaXR5SWQgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhyb3cgdXRpbC5lcnJvcignUGFyYW1SZXF1aXJlZCcsICdBIGNvbW11bml0eSBpZCBpcyByZXF1aXJlZC4nKTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mKGNvbW11bml0eUlkKSAhPT0gJ3N0cmluZycpIHtcclxuICAgIFx0dGhyb3cgbmV3IEVycm9yKCdUaGUgY29tbXVuaXR5IGlkIG11c3QgYmUgYSBqYXZhc2NyaXB0IHN0cmluZy4nKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICBcdF90aGlzLmNvbW11bml0eUlkID0gY29tbXVuaXR5SWQgfHwgJyc7XHJcbiAgICB9XHJcblxyXG5cdC8vIFByb2ZpbGUgSUQgdmFsaWRhdGlvbiBjaGVja3NcclxuXHRpZiAocHJvZmlsZSA9PSAnJyB8fCBwcm9maWxlID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRocm93IHV0aWwuZXJyb3IoJ1BhcmFtUmVxdWlyZWQnLCAnQSBwcm9maWxlIGlkIGlzIHJlcXVpcmVkLicpO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YocHJvZmlsZSkgIT09ICdzdHJpbmcnKSB7XHJcbiAgICBcdHRocm93IG5ldyBFcnJvcignVGhlIHByb2ZpbGUgaWQgbXVzdCBiZSBhIGphdmFzY3JpcHQgc3RyaW5nLicpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgIFx0X3RoaXMucHJvZmlsZSA9IHByb2ZpbGUgfHwgJyc7XHJcbiAgICB9XHJcbiAgICAvLyBBcHAgSUQgdmFsaWRhdGlvbiBjaGVja3NcclxuXHRpZiAoYXBwID09ICcnIHx8IGFwcCA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aHJvdyB1dGlsLmVycm9yKCdQYXJhbVJlcXVpcmVkJywgJ0FuIGFwcCBpZCBpcyByZXF1aXJlZC4nKTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mKGFwcCkgIT09ICdzdHJpbmcnKSB7XHJcbiAgICBcdHRocm93IG5ldyBFcnJvcignVGhlIGFwcCBpZCBtdXN0IGJlIGEgamF2YXNjcmlwdCBzdHJpbmcuJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgXHRfdGhpcy5hcHAgPSBhcHAgfHwgJyc7XHJcbiAgICB9XHJcbiAgICAvLyBXb3JrZmxvdyBjb25maWd1cmF0aW9uIHZhbGlkYXRpb24gY2hlY2tzXHJcbiAgICBpZiAoY29uZmlnID09ICcnIHx8IGNvbmZpZyA9PSB1bmRlZmluZWQpIHtcclxuICAgIFx0dGhyb3cgdXRpbC5lcnJvcignUGFyYW1SZXF1aXJlZCcsICdBIHdvcmtmbG93IGNvbmZpZ3VyYXRpb24gaXMgcmVxdWlyZWQuJyk7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZihjb25maWcpICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIF90aGlzLmNvbmZpZyA9IEpTT04ucGFyc2UoY29uZmlnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICBcdF90aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgIH1cclxuXHQgICAgLy8gV29ya2Zsb3cgaW5zdGFuY2UgdmFsaWRhdGlvbiBjaGVja3NcclxuXHQgICAgX3RoaXMuaW5zdGFuY2U7XHJcblx0XHQvLyBXb3JrZmxvdyBzdWItcHJvY2Vzc2VzIHZhbGlkYXRpb24gY2hlY2tzXHJcblx0XHRfdGhpcy5zdWJwcm9jZXNzZXMgPSBbXTtcclxuXHRcdC8vIFdvcmtmbG93IGluZGljYXRvcnMgcGxhY2UgaG9sZGVyXHJcblx0XHRfdGhpcy5pbmRpY2F0b3JzID0gW107XHJcblx0XHQvLyBXb3JrZmxvdyBzdWItcHJvY2VzcyBzdGVwIGhpc3RvcnkgcGxhY2UgaG9sZGVyXHJcblx0XHRfdGhpcy5oaXN0b3J5ID0gW107XHJcblxyXG59XHJcblxyXG4vKipcclxuICogV29ya2Zsb3cgZ2V0IHByb2ZpbGUgaWQuXHJcbiAqXHJcbiAqIEBleGFtcGxlIFwiXCJcclxuICpcclxuICogQHJldHVybiBcIlwiXHJcbiAqXHJcbiAqL1xyXG5Xb3JrZmxvdy5wcm90b3R5cGUuZ2V0UHJvZmlsZSA9IGZ1bmN0aW9uKCl7XHJcblx0cmV0dXJuIHRoaXMucHJvZmlsZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXb3JrZmxvdyBnZXQgYXBwIGlkLlxyXG4gKlxyXG4gKiBAZXhhbXBsZSBcIlwiXHJcbiAqXHJcbiAqIEByZXR1cm4gXCJcIlxyXG4gKlxyXG4gKi9cclxuV29ya2Zsb3cucHJvdG90eXBlLmdldEFwcCA9IGZ1bmN0aW9uKCl7XHJcblx0cmV0dXJuIHRoaXMuYXBwO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdvcmtmbG93IGdldCBjb25maWcuXHJcbiAqXHJcbiAqIEBleGFtcGxlIFwiXCJcclxuICpcclxuICogQHJldHVybiBcIlwiXHJcbiAqXHJcbiAqL1xyXG5Xb3JrZmxvdy5wcm90b3R5cGUuZ2V0Q29uZmlnID0gZnVuY3Rpb24oKXtcclxuXHRyZXR1cm4gdGhpcy5jb25maWc7XHJcbn07XHJcblxyXG4vKipcclxuICogV29ya2Zsb3cgZ2V0IGluc3RhbmNlLlxyXG4gKlxyXG4gKiBAZXhhbXBsZSBcIlwiXHJcbiAqXHJcbiAqIEByZXR1cm4gXCJcIlxyXG4gKlxyXG4gKi9cclxuV29ya2Zsb3cucHJvdG90eXBlLmdldEluc3RhbmNlID0gZnVuY3Rpb24oKXtcclxuXHRyZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXb3JrZmxvdyBzZXQgdGhlIGluc3RhbmNlIGRhdGEuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC0gdGhlIHdvcmtmbG93IHByb2Nlc3MgaW5zdGFuY2UgZGF0YVxyXG4gKlxyXG4gKiBAZXhhbXBsZSBcIlwiXHJcbiAqXHJcbiAqIEByZXR1cm4gXCJcIlxyXG4gKlxyXG4gKi9cclxuV29ya2Zsb3cucHJvdG90eXBlLnNldEluc3RhbmNlID0gZnVuY3Rpb24oZGF0YSl7XHJcblx0dGhpcy5pbnN0YW5jZSA9IGRhdGE7XHJcbn07XHJcblxyXG4vKipcclxuICogV29ya2Zsb3cgZ2V0IHN1Yi1wcm9jZXNzZXMgZGF0YS5cclxuICpcclxuICogQGV4YW1wbGUgXCJcIlxyXG4gKlxyXG4gKiBAcmV0dXJuIFwiXCJcclxuICpcclxuICovXHJcbldvcmtmbG93LnByb3RvdHlwZS5nZXRTdWJQcm9jZXNzZXMgPSBmdW5jdGlvbigpe1xyXG5cdHJldHVybiB0aGlzLnN1YnByb2Nlc3NlcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXb3JrZmxvdyBzZXQgdGhlIHN1Yi1wcm9jZXNzZXMgZGF0YS5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSB0aGUgd29ya2Zsb3cgcHJvY2VzcyBpbnN0YW5jZSBkYXRhXHJcbiAqXHJcbiAqIEBleGFtcGxlIFwiXCJcclxuICpcclxuICogQHJldHVybiBcIlwiXHJcbiAqXHJcbiAqL1xyXG5Xb3JrZmxvdy5wcm90b3R5cGUuc2V0U3ViUHJvY2Vzc2VzID0gZnVuY3Rpb24oZGF0YSl7XHJcblx0dGhpcy5zdWJwcm9jZXNzZXMgPSBkYXRhO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdvcmtmbG93IGdldCBpbmRpY2F0b3Igc2V0IGRhdGEuXHJcbiAqXHJcbiAqIEBleGFtcGxlIFwiXCJcclxuICpcclxuICogQHJldHVybiBcIlwiXHJcbiAqXHJcbiAqL1xyXG5Xb3JrZmxvdy5wcm90b3R5cGUuZ2V0SW5kaWNhdG9ycyA9IGZ1bmN0aW9uKCl7XHJcblx0cmV0dXJuIHRoaXMuaW5kaWNhdG9ycztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXb3JrZmxvdyBzZXQgdGhlIGluZGljYXRvciBzZXQgZGF0YS5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSB0aGUgd29ya2Zsb3cgcHJvY2VzcyBpbnN0YW5jZSBkYXRhXHJcbiAqXHJcbiAqIEBleGFtcGxlIFwiXCJcclxuICpcclxuICogQHJldHVybiBcIlwiXHJcbiAqXHJcbiAqL1xyXG5Xb3JrZmxvdy5wcm90b3R5cGUuc2V0SW5kaWNhdG9ycyA9IGZ1bmN0aW9uKGRhdGEpe1xyXG5cdHRoaXMuaW5kaWNhdG9ycyA9IGRhdGE7XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0IHRoZSB2YXJpYWJsZSB2YWx1ZS5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHByb2Nlc3MgaWRcclxuICogQHBhcmFtIHtudW1iZXJ9IHByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2UgcHJvY2VzcyBzZXFcclxuICogQHBhcmFtIHtzdHJpbmd9IHN1YlByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN1Yi1wcm9jZXNzIGlkXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdWJQcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHN1Yi1wcm9jZXNzIHNlcVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RlcElkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3RlcCBpZFxyXG4gKiBAcGFyYW0ge09iamVjdH0gdmFyaWFibGUgLSB0aGUgV29ya2Zsb3cgdmFyaWFibGUgb2JqZWN0XHJcbiAqXHJcbiAqIEBleGFtcGxlICcnXHJcbiAqXHJcbiAqIEByZXR1cm4gJydcclxuICpcclxuICovXHJcbi8vIFdvcmtmbG93LnByb3RvdHlwZS5zZXRWYXJpYWJsZSA9IGZ1bmN0aW9uKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdGVwSWQsIHZhcmlhYmxlKXtcclxuLy8gXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG4vLyBcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuLy8gXHRcdHRyeSB7XHJcbi8vIFx0XHRcdFByb2Nlc3MuZ2V0VmFyaWFibGUocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwgdmFyaWFibGUpLnRoZW4oZnVuY2lvbihyZXN1bHQpe1xyXG4vLyBcdFx0XHRcdHJlc29sdmUocmVzdWx0LmRhdGEpO1xyXG4vLyBcdFx0XHR9LCBmdW5jdGlvbihlcnIpe1xyXG4vLyBcdFx0XHRcdHJlamVjdChlcnIpO1xyXG4vLyBcdFx0XHR9KVxyXG4vLyBcdFx0fSBjYXRjaCAoZXJyKSB7XHJcbi8vIFx0XHRcdHJlamVjdChlcnIpO1xyXG4vLyBcdFx0fVxyXG4vLyBcdH0pO1xyXG4vLyB9O1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgdmFyaWFibGUgdmFsdWUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBwcm9jZXNzIGlkXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHByb2Nlc3Mgc2VxXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdWJQcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdWItcHJvY2VzcyBpZFxyXG4gKiBAcGFyYW0ge251bWJlcn0gc3ViUHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBzdWItcHJvY2VzcyBzZXFcclxuICogQHBhcmFtIHtzdHJpbmd9IHN0ZXBJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN0ZXAgaWRcclxuICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIHRoZSBXb3JrZmxvdyB2YXJpYWJsZSBpZFxyXG4gKlxyXG4gKiBAZXhhbXBsZSAnJ1xyXG4gKlxyXG4gKiBAcmV0dXJuICcnXHJcbiAqXHJcbiAqL1xyXG4vLyBXb3JrZmxvdy5wcm90b3R5cGUuZ2V0VmFyaWFibGUgPSBmdW5jdGlvbihwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3RlcElkLCBrZXkpe1xyXG4vLyBcdHZhciBfdGhpcyA9IHRoaXM7XHJcbi8vIFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4vLyBcdFx0dHJ5IHtcclxuLy8gXHRcdFx0UHJvY2Vzcy5zZXRWYXJpYWJsZShwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3RlcElkLCBrZXkpLnRoZW4oZnVuY2lvbihyZXN1bHQpe1xyXG4vLyBcdFx0XHRcdHJlc29sdmUocmVzdWx0LmRhdGEpO1xyXG4vLyBcdFx0XHR9LCBmdW5jdGlvbihlcnIpe1xyXG4vLyBcdFx0XHRcdHJlamVjdChlcnIpO1xyXG4vLyBcdFx0XHR9KVxyXG4vLyBcdFx0fSBjYXRjaCAoZXJyKSB7XHJcbi8vIFx0XHRcdHJlamVjdChlcnIpO1xyXG4vLyBcdFx0fVxyXG4vLyBcdH0pO1xyXG4vLyB9O1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgbWV0aG9kIGNyZWF0ZXMgYSBuZXcgd29ya2Zsb3cgcHJvY2VzcyBpLmUuIGl0IGNyZWF0ZXMgYSB3b3JrZmxvdyBwcm9jZXNzZXMgaW5zdGFuY2VcclxuICogb2JqZWN0IHdpdGggdGhlIG1pbmltdW0gcmVxdWlyZWQgZGF0YS4gVGhpcyBpbnN0YW5jZSBjYW4gYmUgcmVmZXJlbmNlZCBpbiB0aGUgZm9sbG93aW5nXHJcbiAqIHdheSwgc2VlIGV4YW1wbGUgYmVsb3cuXHJcbiAqXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBjb25maWcgPSB7ICdfaWQnOiAnYWJjMTIzJyB9O1xyXG4gKiB2YXIgd29ya2Zsb3cgPSBuZXcgV29ya2Zsb3coJzEyMzQnLCAnNTY3OCcsIGNvbmZpZyk7XHJcbiAqIHdvcmtmbG93LmNyZWF0ZSgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcclxuICpcdGNvbnNvbGUubG9nKHJlc3VsdC5tZXNzYWdlKTtcclxuICpcdC8vIFRoZSBmb2xsb3dpbmcgcHJvcGVydGllcyBjYW4gbm93IGJlIGFjY2Vzc2VkXHJcbiAqIFx0dmFyIHByb2ZpbGUgPSB3b3JrZmxvdy5wcm9maWxlO1xyXG4gKiBcdHZhciBhcHAgPSB3b3JrZmxvdy5hcHA7XHJcbiAqIFx0dmFyIGNvbmZpZyA9IHdvcmtmbG93LmNvbmZpZztcclxuICpcdC8vIE9uIHN1Y2Nlc3MgeW91IGNhbiBhY2Nlc3MgdGhlIGluc3RhbmNlIHRoZSBmb2xsb3dpbmcgd2F5XHJcbiAqXHR2YXIgaW5zdGFuY2UgPSB3b3JrZmxvdy5pbnN0YW5jZTtcclxuICogfSwgZnVuY3Rpb24oZXJyb3Ipe1xyXG4gKlx0Y29uc29sZS5sb2coZXJyb3IpO1xyXG4gKiB9KTtcclxuICpcclxuICogQHJldHVybiB7T2JqZWN0fSBuZXcgV29ya2Zsb3cgaW5zdGFuY2Ugd2l0aCB1cGRhdGVkIGluc3RhbmNlIGRhdGEuXHJcbiAqXHJcbiAqL1xyXG5Xb3JrZmxvdy5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGlmIChfdGhpcy5pbnN0YW5jZSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0dmFyIHdhcm4gPSB1dGlsLndhcm4oJ0luc3RhbmNlIGFscmVhZHkgZXhpc3RzLicsIF90aGlzKVxyXG5cdFx0XHRcdHJlc29sdmUod2Fybik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Ly8gQ3JlYXRlIHRoZSB3b3JrZmxvdyBwcm9jZXNzZXMgaW5zdGFuY2Ugb2JqZWN0XHJcblx0XHRcdFx0dmFyIG1vZGVsID0ge1xyXG5cdFx0XHRcdCAgICBfaWQ6ICcnLFxyXG5cdFx0XHRcdCAgICB2ZXJzaW9uOiAnJyxcclxuXHRcdFx0XHQgICAgdHlwZTogJ3dvcmtmbG93SW5zdGFuY2UnLFxyXG5cdFx0XHRcdCAgICBwcm9jZXNzZXM6IFtdLFxyXG5cdFx0XHRcdCAgICBjaGFubmVsczpbXHJcblx0XHRcdFx0ICAgIFx0XCJjb21tdW5pdHlfXCIrYXBwLlNDT1BFLmNvbW11bml0eUlkICxcclxuXHRcdFx0XHQgICAgXHRcInByb2ZpbGVfXCIrIGFwcC5TQ09QRS5wcm9maWxlSWQgLFxyXG5cdFx0XHRcdCAgICBcdFwiYXBwbGljYXRpb25fXCIrYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQsXHJcblx0XHRcdFx0ICAgIFx0XCJjb21tdW5pdHlfXCIrYXBwLlNDT1BFLmNvbW11bml0eUlkK1wiX2FwcGxpY2F0aW9uX1wiK2FwcC5TQ09QRS5hcHBsaWNhdGlvbklkXHJcblx0XHRcdFx0ICAgIF1cclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRcdG1vZGVsLl9pZCA9IF90aGlzLnByb2ZpbGUgKyAnOnByb2Nlc3Nlcyc7XHJcblx0XHRcdFx0bW9kZWwudmVyc2lvbiA9IF90aGlzLmNvbmZpZy52ZXJzaW9uO1xyXG5cdFx0XHRcdF90aGlzLmluc3RhbmNlID0gbW9kZWw7XHJcblx0XHRcdFx0dmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1dvcmtmbG93IHByb2Nlc3NlcyBpbnN0YW5jZSBjcmVhdGVkIHN1Y2Nlc3NmdWxseS4nLCBfdGhpcyk7XHJcblx0XHRcdFx0cmVzb2x2ZShzdWNjZXNzKTtcclxuXHJcblx0XHRcdH1cclxuXHRcdH0gY2F0Y2ggKGVycikge1xyXG5cdFx0XHRyZWplY3QoZXJyKTtcclxuXHRcdH1cclxuXHR9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXb3JrZmxvdyBpbml0aWFsaXNlLCB0aGlzIGZ1bmN0aW9uIGV4ZWN1dGVzIGEgcHJvY2VzcyB3aXRoaW4gYSB3b3JrZmxvd1xyXG4gKiBjb25maWd1cmF0aW9uLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIHByb2Nlc3MgaWQgdG8gcHJvY2Vzc1xyXG4gKiBAcGFyYW0ge29iamVjdH0gW2RhdGFdIC0gdGhlIGlucHV0IGRhdGEgdG8gcHJvY2Vzc1xyXG4gKlxyXG4gKiBAZXhhbXBsZVxyXG4gKiBXb3JrZmxvdy5pbml0aWFsaXNlKCdwcm9jZXNzSWQnLCB7IHZhbGlkRGF0ZTogJ2RhdGUnIH0pO1xyXG4gKlxyXG4gKiBAcmV0dXJuIFwiXCJcclxuICpcclxuICovXHJcbldvcmtmbG93LnByb3RvdHlwZS5pbml0aWFsaXNlID0gZnVuY3Rpb24ocHJvY2Vzc0lkLCBkYXRhKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdHZhciBjb25maWdQcm9jZXNzID0gW107XHJcblx0XHRcdC8vIENoZWNrIHRoZSBwYXNzZWQgaW4gcGFyYW1ldGVyc1xyXG5cdFx0XHRpZiAocHJvY2Vzc0lkICE9PSAnJyAmJiBwcm9jZXNzSWQgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdC8vIEdldCB0aGUgY3VycmVudCBwcm9jZXNzIGNvbmZpZ1xyXG5cdFx0XHRcdGNvbmZpZ1Byb2Nlc3MgPSBfdGhpcy5jb25maWcucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmpQcm9jZXNzKXtcclxuXHRcdFx0XHRcdGlmIChvYmpQcm9jZXNzLl9pZCA9PSBwcm9jZXNzSWQpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIG9ialByb2Nlc3M7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0aWYgKGNvbmZpZ1Byb2Nlc3NbMF0uX2lkID09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0dmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZDb25maWdFcnJvcicsICdObyB2YWxpZCBwcm9jZXNzIGRlZmluaXRpb24gZm91bmQgd2l0aCBwcm9jZXNzIGlkOiAnICsgcHJvY2Vzc0lkKTtcclxuXHRcdFx0XHRcdHJlamVjdChlcnJvcik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGNvbmZpZ1Byb2Nlc3MucHVzaChfdGhpcy5jb25maWcucHJvY2Vzc2VzWzBdKTtcclxuXHRcdFx0XHRwcm9jZXNzSWQgPSBfdGhpcy5jb25maWcucHJvY2Vzc2VzWzBdLl9pZDtcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyBHZXQgdGhlIGN1cnJlbnQgbGlzdCBvZiBwcm9jZXNzIGluc3RhbmNlc1xyXG5cdFx0XHQvLyB2YXIgcHJvY2Vzc1NlcSA9IDE7XHJcblx0XHRcdHZhciBjdXJyZW50UHJvY2VzcyA9IFtdO1xyXG5cdFx0XHRfdGhpcy5pbnN0YW5jZS5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHByb2Nlc3NJdGVtKXtcclxuXHRcdFx0XHRpZiAocHJvY2Vzc0l0ZW0uaWQgPT0gcHJvY2Vzc0lkKSB7XHJcblx0XHRcdFx0XHRjdXJyZW50UHJvY2Vzcy5wdXNoKHByb2Nlc3NJdGVtKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0XHR2YXIgcHJvY2Vzc1NlcSA9IGN1cnJlbnRQcm9jZXNzLmxlbmd0aCArIDE7XHJcblx0XHRcdC8vIHZhciBuZXh0U2VxID0gcHJvY2Vzc1NlcSArIDE7XHJcblx0XHRcdC8vIFB1c2ggdGhlIHByb2Nlc3Mgb2JqZWN0IGludG8gdGhlIGFycmF5XHJcblx0XHRcdHZhciBwcm9jZXNzTW9kZWwgPSB7XHJcblx0XHRcdFx0aWQ6ICcnLFxyXG5cdFx0XHRcdHNlcTogJycsXHJcblx0XHRcdFx0c3ViUHJvY2Vzc2VzOiBbXSxcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyAxLiBVcGRhdGUgdGhlIHByb2Nlc3MgaWQgYW5kIHNlcVxyXG5cdFx0XHRwcm9jZXNzTW9kZWwuaWQgPSBwcm9jZXNzSWQ7XHJcblx0XHRcdHByb2Nlc3NNb2RlbC5zZXEgPSBwcm9jZXNzU2VxO1xyXG5cdFx0XHRfdGhpcy5pbnN0YW5jZS5wcm9jZXNzZXMucHVzaChwcm9jZXNzTW9kZWwpO1xyXG5cdFx0XHQvLyBQYXJhbWV0ZXJzXHJcblx0XHRcdHZhciBzdWJQcm9jZXNzSWQgPSBjb25maWdQcm9jZXNzWzBdLnN1YlByb2Nlc3Nlc1swXS5faWQ7XHJcblx0XHRcdHZhciBzdWJQcm9jZXNzU2VxID0gMTtcclxuXHRcdFx0X3RoaXMuaW5zdGFuY2UucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihwcm9jZXNzSXRlbSl7XHJcblx0XHRcdFx0aWYgKHByb2Nlc3NJdGVtLmlkID09IHByb2Nlc3NJZCAmJiBwcm9jZXNzSXRlbS5zZXEgPT0gcHJvY2Vzc1NlcSkge1xyXG5cdFx0XHRcdFx0c3ViUHJvY2Vzc1NlcSA9IHByb2Nlc3NJdGVtLnN1YlByb2Nlc3Nlcy5sZW5ndGggKyAxXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0XHQvLyBDYWxsIHRoZSBzdWJwcm9jZXNzIG1ldGhvZFxyXG5cdFx0XHRcclxuXHRcdFx0XHJcblxyXG5cdFx0XHRQcm9jZXNzLnN1YlByb2Nlc3MocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIGRhdGEsIF90aGlzKS50aGVuKGZ1bmN0aW9uKHN1YlByb2Nlc3Mpe1xyXG5cdFx0XHRcdC8vIEdlbmVyYXRlIHRoZSB1dWlkXHJcblx0XHRcdFx0XHJcblxyXG5cdFx0XHRcdHZhciB1dWlkID0gX3RoaXMucHJvZmlsZSArICc6JyArIF90aGlzLmFwcCArICc6JyArIHByb2Nlc3NJZCArICc6JyArIHByb2Nlc3NTZXEgKyAnOicgKyBzdWJQcm9jZXNzSWQgKyAnOicgKyBzdWJQcm9jZXNzU2VxO1xyXG5cdFx0XHRcdHZhciBsYWJlbCA9IGRhdGEubGFiZWw7XHJcblx0XHRcdFx0Ly8gQnVpbGQgdGhlIHN1Yi1wcm9jZXNzIHJlZmVyZW5jZSBvYmplY3RcclxuXHJcblx0XHRcdFx0Ly9UT0RPOiBDaGFuZ2UgcmVxdWlyZWQgdG8gbW92ZSBpc0FjdGl2ZSB0byBzdWJQcm9jZXNzIGZpbGUuUmVtb3ZlIGZyb20gaGVyZVxyXG5cclxuXHJcblx0XHRcdFx0dmFyIHN1YlByb2Nlc3NSZWYgPSB7XHJcblx0XHRcdFx0XHRpZDogc3ViUHJvY2Vzc0lkLFxyXG5cdFx0XHRcdFx0c2VxOiBzdWJQcm9jZXNzU2VxLFxyXG5cdFx0XHRcdFx0dXVpZDogdXVpZCxcclxuXHRcdFx0XHRcdGxhYmVsOmxhYmVsXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vIEFkZCB0aGUgcmVmZXJlbmNlIHRvIHRoZSBwcm9jZXNzIG1vZGVsXHJcblx0XHRcdFx0cHJvY2Vzc01vZGVsLnN1YlByb2Nlc3Nlcy5wdXNoKHN1YlByb2Nlc3NSZWYpO1xyXG5cdFx0XHRcdC8vIEFkZCB0aGUgc3ViUHJvY2VzcyBtb2RlbCB0byB0aGUgc3VicHJvY2Vzc2VzIGFycmF5XHJcblx0XHRcdFx0Ly9fdGhpcy5zdWJwcm9jZXNzZXMucHVzaChzdWJQcm9jZXNzLmRhdGEpO1xyXG5cdFx0XHRcdC8vIF90aGlzLmluc3RhbmNlLnByb2Nlc3Nlcy5wdXNoKHByb2Nlc3NNb2RlbCk7XHJcblx0XHRcdFx0Zm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IF90aGlzLmluc3RhbmNlLnByb2Nlc3Nlcy5sZW5ndGg7IGluZGV4Kyspe1xyXG5cdFx0XHRcdFx0dmFyIHByb2Nlc3NJdGVtID0gX3RoaXMuaW5zdGFuY2UucHJvY2Vzc2VzW2luZGV4XTtcclxuXHRcdFx0XHRcdGlmIChwcm9jZXNzSXRlbS5pZCA9PSBwcm9jZXNzSWQgJiYgcHJvY2Vzc0l0ZW0uc2VxID09IHByb2Nlc3NTZXEpIHtcclxuXHRcdFx0XHRcdFx0Ly8gUmVtb3ZlIHRoZSBjdXJyZW50IHByb2Nlc3MgZnJvbSB0aGUgYXJyYXkgYW5kIGFkZCB0aGUgdXBkYXRlZCBwcm9jZXNzTW9kZWxcclxuXHRcdFx0XHRcdFx0X3RoaXMuaW5zdGFuY2UucHJvY2Vzc2VzLnNwbGljZShpbmRleCwgMSwgcHJvY2Vzc01vZGVsKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cdFxyXG5cdFx0XHRcdC8vIFByb2Nlc3MgdGhlIGluZGljYXRvciBkb2N1bWVudHMgd29ya2Zsb3cgcHJvY2Vzc2VzIHVwZGF0ZXNcclxuXHRcdFx0XHR2YXIgaW5kaWNhdG9ycyA9IHN1YlByb2Nlc3MuZGF0YS5pbmRpY2F0b3JzO1xyXG5cdFx0XHRcdHZhciBzdGVwID0gc3ViUHJvY2Vzcy5kYXRhLnN0ZXA7XHJcblx0XHRcdFx0UHJvY2Vzcy5pbmRpY2F0b3JEb2NzKHByb2Nlc3NJZCwgaW5kaWNhdG9ycywgc3RlcCwgX3RoaXMpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcclxuXHRcdFx0XHRcdHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdQcm9jZXNzOiAnICsgX3RoaXMuY29uZmlnLnByb2Nlc3Nlc1swXS5faWQgKyAnIGluaXRpYWxpemVkIHN1Y2Nlc3NmdWxseS4nLCBfdGhpcyk7XHJcblx0XHRcdFx0XHRyZXNvbHZlKHN1Y2Nlc3MpO1xyXG5cdFx0XHRcdH0sIGZ1bmN0aW9uKGVycil7XHJcblx0XHRcdFx0XHRyZWplY3QoZXJyKTtcclxuXHRcdFx0XHR9KVxyXG5cclxuXHJcblx0XHRcdFx0XHJcblxyXG5cclxuXHJcblxyXG5cdFx0XHR9LCBmdW5jdGlvbihlcnIpe1xyXG5cdFx0XHRcdF90aGlzLmluc3RhbmNlLnByb2Nlc3NlcyA9IF90aGlzLmluc3RhbmNlLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24oIG9iaiApIHtcclxuXHRcdFx0XHRcdHJldHVybiAhKG9iai5pZCA9PSBwcm9jZXNzSWQgJiYgb2JqLnNlcSA9PSBwcm9jZXNzU2VxKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhlcnIpO1xyXG5cdFx0XHRcdHJlamVjdChlcnIpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0gY2F0Y2goZXJyKSB7XHJcblx0XHRcdHJlamVjdChlcnIpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdvcmtmbG93IHRyYW5zaXRpb24gdG8gdGhlIG5leHQgc3RlcC4gVGhpcyBtb3ZlcyB0aGUgd29ya2Zsb3cgZnJvbSB0aGUgY3VycmVudCBwcm9jZXNzLFxyXG4gKiBzdWItcHJvY2VzcyBzdGVwIHRvIHRoZSBuZXh0IG9uZSBhcyBzcGVjaWZpZWQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBwcm9jZXNzIGlkXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHByb2Nlc3Mgc2VxXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdWJQcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdWItcHJvY2VzcyBpZFxyXG4gKiBAcGFyYW0ge251bWJlcn0gc3ViUHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBzdWItcHJvY2VzcyBzZXFcclxuICogQHBhcmFtIHtzdHJpbmd9IHN0ZXBJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN0ZXAgaWRcclxuICogQHBhcmFtIHtzdHJpbmd9IHRyYW5zaXRpb25JZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHRyYW5zaXRpb24gaWRcclxuICogQHBhcmFtIHtvYmplY3R9IGRhdGEgLSBhbnkgYWRkaXRpb25hbCBkYXRhIHBhc3NlZCBpbiBhcyBrZXkgdmFsdWUgcGFpcnNcclxuICpcclxuICogQGV4YW1wbGVcclxuICogV29ya2Zsb3cudHJhbnNpdGlvbigncHJvY2Vzc0lkJywgMSwgJ3N1YlByb2Nlc3NJZCcsIDEsICdzdGVwSWQnLCAndHJhbnNpdGlvbklkJywgeyBrZXk6ICcnLCB2YWx1ZTogJycgfSk7XHJcbiAqXHJcbiAqIEByZXR1cm4gXCJcIlxyXG4gKlxyXG4gKi9cclxuV29ya2Zsb3cucHJvdG90eXBlLnRyYW5zaXRpb24gPSBmdW5jdGlvbihwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3RlcElkLCB0cmFuc2l0aW9uSWQsIGRhdGEpe1xyXG5cdC8vIFJlLWFzc2lnbiB0aGlzXHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRQcm9jZXNzLnRyYW5zaXRpb24ocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwgdHJhbnNpdGlvbklkLCBkYXRhLCBfdGhpcykudGhlbihmdW5jdGlvbihyZXN1bHQpe1xyXG5cclxuXHRcdFx0XHRcclxuXHRcdFx0XHQvLyBVcGRhdGUgdGhlIGN1cnJlbnQgc3ViLXByb2Nlc3Mgc3RlcCBkYXRhXHJcblx0XHRcdFx0dmFyIHVwZGF0ZSA9IGZ1bmN0aW9uKHR5cGUpe1xyXG5cdFx0XHRcdFx0X3RoaXMuaW5zdGFuY2UucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihwcm9jZXNzSXRlbSl7XHJcblx0XHRcdFx0XHRcdGlmIChwcm9jZXNzSXRlbS5pZCA9PSBwcm9jZXNzSWQgJiYgcHJvY2Vzc0l0ZW0uc2VxID09IHByb2Nlc3NTZXEpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdFx0cHJvY2Vzc0l0ZW0uc3ViUHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihzdWJQcm9jZXNzSXRlbSl7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoc3ViUHJvY2Vzc0l0ZW0uaWQgPT0gc3ViUHJvY2Vzc0lkICYmIHN1YlByb2Nlc3NJdGVtLnNlcSA9PSBzdWJQcm9jZXNzU2VxKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0X3RoaXMuc3VicHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihzdWJQcm9jZXNzT2JqKXtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoc3ViUHJvY2Vzc09iai5faWQgPT0gc3ViUHJvY2Vzc0l0ZW0udXVpZCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAodHlwZSA9PSAnc3RlcCcpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN1YlByb2Nlc3NPYmouc3RlcCA9IHJlc3VsdC5kYXRhO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcyhyZXN1bHQubWVzc2FnZSwgc3ViUHJvY2Vzc09iaik7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmVzb2x2ZShzdWNjZXNzKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAodHlwZSA9PSAnc3RlcENvbXBsZXRlJykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdWJQcm9jZXNzT2JqLnN0ZXAgPSByZXN1bHQuZGF0YS5zdGVwO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdWJQcm9jZXNzT2JqLmNvbXBsZXRlID0gdHJ1ZVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcyhyZXN1bHQubWVzc2FnZSwgc3ViUHJvY2Vzc09iaik7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXNvbHZlKHN1Y2Nlc3MpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAocmVzdWx0LmRhdGEuc3ViUHJvY2Vzc0NvbXBsZXRlKSB7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdHVwZGF0ZSgnc3RlcENvbXBsZXRlJyk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0dXBkYXRlKCdzdGVwJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LCBmdW5jdGlvbihlcnIpe1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdHJlamVjdChlcnIpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0gY2F0Y2goZXJyKSB7XHJcblx0XHRcdFxyXG5cdFx0XHRyZWplY3QoZXJyKTtcclxuXHRcdH1cclxuXHR9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXb3JrZmxvdyBhc3NpZ24gdXNlci5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHByb2Nlc3MgaWRcclxuICogQHBhcmFtIHtudW1iZXJ9IHByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2UgcHJvY2VzcyBzZXFcclxuICogQHBhcmFtIHtzdHJpbmd9IHN1YlByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN1Yi1wcm9jZXNzIGlkXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdWJQcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHN1Yi1wcm9jZXNzIHNlcVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RlcElkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3RlcCBpZFxyXG4gKiBAcGFyYW0ge29iamVjdH0gdXNlciAtIHRoZSB1c2VyIGlkIGFuZCBuYW1lIGRhdGFcclxuICpcclxuICogQGV4YW1wbGUgXCJcIlxyXG4gKlxyXG4gKiBAcmV0dXJuIFwiXCJcclxuICpcclxuICovXHJcbldvcmtmbG93LnByb3RvdHlwZS5hc3NpZ25Vc2VyID0gZnVuY3Rpb24ocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHVzZXIpe1xyXG5cdC8vIFJlLWFzc2lnbiB0aGUgV29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2UgYXMgX3RoaXNcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdFByb2Nlc3MuYXNzaWduVXNlcihwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgdXNlciwgX3RoaXMpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcclxuXHRcdFx0XHRyZXNvbHZlKHJlc3VsdCk7XHJcblx0XHRcdH0sIGZ1bmN0aW9uKGVycil7XHJcblx0XHRcdFx0cmVqZWN0KGVycik7XHJcblx0XHRcdH0pXHJcblx0XHR9IGNhdGNoKGVycikge1xyXG5cdFx0XHRyZWplY3QoZXJyKTtcclxuXHRcdH1cclxuXHR9KVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdvcmtmbG93IHRhc2ssIHRoaXMgbWV0aG9kIGV4ZWN1dGVzIGEgc3BlY2lmaWMgdGFzay5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NJZCAtIHRoZSBwcm9jZXNzIGlkIHRvIHByb2Nlc3NcclxuICogQHBhcmFtIHtvYmplY3R9IGlucHV0RGF0YSAtIHRoZSBpbnB1dCBkYXRhIHRvIHByb2Nlc3NcclxuICpcclxuICogQGV4YW1wbGVcclxuICogV29ya2Zsb3cuaW5pdGlhbGl6ZSgncHJvY2Vzc0lkJywgeyB2YWxpZERhdGU6ICdkYXRlJyB9KTtcclxuICpcclxuICogQHJldHVybiBcIlwiXHJcbiAqXHJcbiAqL1xyXG5Xb3JrZmxvdy5wcm90b3R5cGUudWkgPSBmdW5jdGlvbigpe1xyXG5cdC8vIFJlLWFzc2lnbiB0aGUgV29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2UgYXMgX3RoaXNcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHJldHVybiB7XHJcblx0XHRnZXRQcm9jZXNzOiBmdW5jdGlvbihwcm9jZXNzSWQsIGxhbmcpe1xyXG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdHVzZXJJbnRlcmZhY2UuZ2V0UHJvY2Vzcyhwcm9jZXNzSWQsIGxhbmcsIF90aGlzKS50aGVuKGZ1bmN0aW9uKG1vZGVsKXtcclxuXHRcdFx0XHRcdFx0cmVzb2x2ZShtb2RlbCk7XHJcblx0XHRcdFx0XHR9LCBmdW5jdGlvbihlcnIpe1xyXG5cdFx0XHRcdFx0XHRyZWplY3QoZXJyKTtcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0fSBjYXRjaChlcnIpIHtcclxuXHRcdFx0XHRcdHJlamVjdChlcnIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHR9XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFdvcmtmbG93O1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWxpdHknKTtcclxuXHJcbi8qKlxyXG4gKiBBY3Rpb25zIE1vZHVsZVxyXG4gKlxyXG4gKiBAbW9kdWxlIGxpYi9hY3Rpb25zXHJcbiAqIEBhdXRob3IgSGFzYW4gQWJiYXNcclxuICogQHZlcnNpb24gMi4wLjBcclxuICogQGRlc2NyaXB0aW9uIHRlc3QgZGVzY3JpcHRpb25cclxuICogQGNvcHlyaWdodCBLd2FudHUgTHRkIFJTQSAyMDA5LTIwMTUuXHJcbiAqXHJcbiAqL1xyXG5cclxuXHJcbnZhciBjb21tdW5pdHkgPSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuXHJcbiAgICAgICAgY3JlYXRlQ29tbXVuaXR5OiBmdW5jdGlvbihfZGVmLCBfV0ZJbnN0YW5jZSkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5faWQgPSBnZW5lcmF0ZVVVSUQoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5jb21tdW5pdHlJZDtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbmV3IERhdGUoKS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xyXG4gICAgICAgICAgICAgICAgdmFyIHV1aWQgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnQ29tbXVuaXR5J10vX2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY3JlYXRlQ29tbXVuaXR5XCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJuZXdDb21tdW5pdHlJZFwiOiBfV0ZJbnN0YW5jZS5wcm9maWxlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImluZGljYXRvclVVSURcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJDb21tdW5pdHlcIjogdXVpZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hY3Rpb24gPSBhY3Rpb247XHJcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24od29ya2VyU3VjY2Vzcykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya2VyIHByb2Nlc3NlZCBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbih3b3JrZXJGYWlsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdvcmtlckZhaWwpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdXNlckpvaW5Db21tdW5pdHk6IGZ1bmN0aW9uKF9kZWYsIF9XRkluc3RhbmNlKSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZWxlYXNlQWRvcHRlZEFwcGxpY2F0aW9uOiBmdW5jdGlvbihfZGVmLCBfV0ZJbnN0YW5jZSkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5faWQgPSBnZW5lcmF0ZVVVSUQoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5jb21tdW5pdHlJZDtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbmV3IERhdGUoKS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB1dWlkUmVsZWFzZUFkb3B0ZWRBcHBsaWNhdGlvbiA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdSZWxlYXNlQWRvcHRlZEFwcGxpY2F0aW9uJ10vX2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICBcInJlbGVhc2VBZG9wdGVkQXBwbGljYXRpb25cIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbW11bml0eUlkXCI6IF9XRkluc3RhbmNlLnByb2ZpbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5kaWNhdG9yVVVJRFwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJlbGVhc2VBZG9wdGVkQXBwbGljYXRpb25cIjogdXVpZFJlbGVhc2VBZG9wdGVkQXBwbGljYXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uKHdvcmtlclN1Y2Nlc3MpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1dvcmtlciBwcm9jZXNzZXMgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24od29ya2VyRmFpbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh3b3JrZXJGYWlsKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSkoKTtcclxuXHJcbnZhciBhcHBsaWNhdGlvbiA9IChmdW5jdGlvbigpIHtcclxuXHJcbiAgICByZXR1cm4ge1xyXG5cclxuICAgICAgICBjcmVhdGVBcHBEZWZpbml0aW9uOiBmdW5jdGlvbihfZGVmLCBfV0ZJbnN0YW5jZSkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5faWQgPSBnZW5lcmF0ZVVVSUQoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5jb21tdW5pdHlJZDtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbmV3IERhdGUoKS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB1dWlkID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ0FwcGxpY2F0aW9uJ10vX2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY3JlYXRlQXBwbGljYXRpb25cIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm5ld0FwcGxpY2F0aW9uSWRcIjogX1dGSW5zdGFuY2UucHJvZmlsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbmRpY2F0b3JVVUlEXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQXBwbGljYXRpb25cIjogdXVpZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hY3Rpb24gPSBhY3Rpb247XHJcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24od29ya2VyU3VjY2Vzcykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya2VyIHByb2Nlc3NlcyBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbih3b3JrZXJGYWlsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdvcmtlckZhaWwpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBidWlsZEFwcGxpY2F0aW9uOiBmdW5jdGlvbihfZGVmLCBfV0ZJbnN0YW5jZSkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5faWQgPSBnZW5lcmF0ZVVVSUQoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5jb21tdW5pdHlJZDtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbmV3IERhdGUoKS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB1dWlkUHVibGlzaEFwcGxpY2F0aW9uID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ1B1Ymxpc2hBcHBsaWNhdGlvbiddL19pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG4gICAgICAgICAgICAgICAgdmFyIHV1aWRBcHBsaWNhdGlvbkRlZmluaXRpb24gPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnQXBwbGljYXRpb25EZWZpbml0aW9uJ10vX2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcbiAgICAgICAgICAgICAgICB2YXIgdXVpZFJvbGVzID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ1JvbGVzJ10vX2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcbiAgICAgICAgICAgICAgICB2YXIgdXVpZEFwcGxpY2F0aW9uID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ0FwcGxpY2F0aW9uJ10vX2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICBcImJ1aWxkQXBwbGljYXRpb25cIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFwcGxpY2F0aW9uSWRcIjogX1dGSW5zdGFuY2UucHJvZmlsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbmRpY2F0b3JVVUlEXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUHVibGlzaEFwcGxpY2F0aW9uXCI6IHV1aWRQdWJsaXNoQXBwbGljYXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkFwcGxpY2F0aW9uRGVmaW5pdGlvblwiOiB1dWlkQXBwbGljYXRpb25EZWZpbml0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSb2xlc1wiOiB1dWlkUm9sZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkFwcGxpY2F0aW9uXCI6IHV1aWRBcHBsaWNhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hY3Rpb24gPSBhY3Rpb247XHJcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24od29ya2VyU3VjY2Vzcykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya2VyIHByb2Nlc3NlcyBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbih3b3JrZXJGYWlsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdvcmtlckZhaWwpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBhcHBsaWNhdGlvbkFkb3B0aW9uOiBmdW5jdGlvbihfZGVmLCBfV0ZJbnN0YW5jZSkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5faWQgPSBnZW5lcmF0ZVVVSUQoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5jb21tdW5pdHlJZDtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbmV3IERhdGUoKS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB1dWlkQWRvcHRpb24gPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnQWRvcHRpb24nXS9faWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICAgICAgICAgIHZhciB1dWlkUHVibGlzaEFwcGxpY2F0aW9uID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ1B1Ymxpc2hBcHBsaWNhdGlvbiddL19pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG4gICAgICAgICAgICAgICAgdmFyIHV1aWRBcHBsaWNhdGlvbiA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdBcHBsaWNhdGlvbiddL19pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJhZG9wdEFwcGxpY2F0aW9uXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHBsaWNhdGlvbklkXCI6IF9XRkluc3RhbmNlLnByb2ZpbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5kaWNhdG9yVVVJRFwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkFkb3B0aW9uXCI6IHV1aWRBZG9wdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUHVibGlzaEFwcGxpY2F0aW9uXCI6IHV1aWRQdWJsaXNoQXBwbGljYXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkFwcGxpY2F0aW9uXCI6IHV1aWRBcHBsaWNhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hY3Rpb24gPSBhY3Rpb247XHJcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24od29ya2VyU3VjY2Vzcykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya2VyIHByb2Nlc3NlcyBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbih3b3JrZXJGYWlsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdvcmtlckZhaWwpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KSgpO1xyXG5cclxuXHJcbnZhciB3b3JrZXIgPSAoZnVuY3Rpb24oKSB7XHJcblxyXG5cclxuICAgIHJldHVybiB7XHJcblxyXG4gICAgICAgIGdldFdvcmtlcldyYXBwZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHdyYXBwZXIgPSB7XHJcbiAgICAgICAgICAgICAgICBcInNvdXJjZVwiOiBcInJlbW90ZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwid29ya2VyT2JqZWN0XCIsXHJcbiAgICAgICAgICAgICAgICBcIl9pZFwiOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgXCJjaGFubmVsc1wiOiBbXSxcclxuICAgICAgICAgICAgICAgIFwiY29tbXVuaXR5SWRcIjogXCJcIixcclxuICAgICAgICAgICAgICAgIFwiYXBwbGljYXRpb25JZFwiOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBcIm1lc3NhZ2VUeXBlXCI6IFwiaW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgXCJjcmVhdGVkRGF0ZVRpbWVcIjogXCJcIixcclxuICAgICAgICAgICAgICAgIFwic2VuZGVyVXNlcklkXCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdGlmaWNhdGlvblwiOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwiYWN0aW9uXCI6IHtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gd3JhcHBlcjtcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZW5kOiBmdW5jdGlvbih3b3JrZXJPYmplY3QpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU3VibWl0dGluZyBXb3JrZXIgT2JqZWN0IHRvIHNlcnZlcicpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cod29ya2VyT2JqZWN0KTtcclxuICAgICAgICAgICAgICAgIGRhby5zYXZlKHdvcmtlck9iamVjdCkuZG9uZShmdW5jdGlvbih3b3JrZXJSZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUod29ya2VyUmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgfSkuZmFpbChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3Igc3VibWl0dGluZyB3b3JrZXIgcmVzcG9uc2UgISEnICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pKCk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgICBjb21tdW5pdHk6IGNvbW11bml0eSxcclxuICAgIGFwcGxpY2F0aW9uOiBhcHBsaWNhdGlvbixcclxuICAgIHdvcmtlcjogd29ya2VyXHJcblxyXG59IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy92YXIgZ2F0ZWtlZXBlciA9IHJlcXVpcmUoJy4uL2Jvd2VyX2NvbXBvbmVudHMvZ2F0ZWtlZXBlcicpO1xyXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWxpdHknKTtcclxuXHJcbi8vIHZhciB1dWlkID0gcmVxdWlyZSgnbm9kZS11dWlkJyk7XHJcblxyXG52YXIgZ2F0ZWtlZXBlciA9IG5ldyBHSygpO1xyXG5cclxuLyoqXHJcbiAqIEZvcm0gTW9kdWxlXHJcbiAqXHJcbiAqIEBtb2R1bGUgbGliL2Zvcm1cclxuICogQGF1dGhvciBCcmVudCBHb3Jkb25cclxuICogQHZlcnNpb24gMi4wLjBcclxuICogQGRlc2NyaXB0aW9uIHRlc3QgZGVzY3JpcHRpb25cclxuICogQGNvcHlyaWdodCBLd2FudHUgTHRkIFJTQSAyMDA5LTIwMTUuXHJcbiAqXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlKGFyZ3MpIHtcclxuXHJcbiAgICB2YXIgcHJvY2Vzc0lkID0gYXJnc1swXSB8fCAnJztcclxuXHJcbiAgICB2YXIgc3ViUHJvY2VzcyA9IGFyZ3NbMV0gfHwge307XHJcblxyXG4gICAgdmFyIHN0ZXAgPSBhcmdzWzJdIHx8IHt9O1xyXG5cclxuICAgIHZhciBhY3Rpb24gPSBhcmdzWzNdIHx8IHt9O1xyXG5cclxuICAgIHZhciBfV0ZJbnN0YW5jZSA9IGFyZ3NbNl0gfHwge307XHJcblxyXG4gICAgdmFyIGRhdGEgPSBhcmdzWzZdIHx8IHt9O1xyXG5cclxuICAgIHZhciBpbmRpY2F0b3JzID0gc3ViUHJvY2Vzcy5pbmRpY2F0b3JzIHx8IFtdO1xyXG5cclxuICAgIHZhciByZXN1bHQgPSBbXTtcclxuXHJcbiAgICB2YXIgaW5kaWNhdG9yVHlwZSA9IGFjdGlvbi5fdHlwZTtcclxuXHJcbiAgICB2YXIgcHJvY2Vzc1NlcSA9IGFyZ3NbNF0gfHwgJyc7XHJcblxyXG4gICAgdmFyIHN1YlByb2Nlc3NTZXEgPSBhcmdzWzVdIHx8ICcnO1xyXG5cclxuICAgIHZhciBjcmVhdGVUeXBlID0gYXJnc1s3XSB8fCAnJztcclxuXHJcbiAgICB2YXIgc3ViUHJvY2Vzc0lkID0gc3ViUHJvY2Vzcy5faWQ7XHJcblxyXG4gICAgdmFyIHV1aWQgPSBhcmdzWzhdIHx8ICcnO1xyXG5cclxuICAgIHZhciBiYXNlVVVJRCA9IGFyZ3NbOV0gfHwgJyc7XHJcblxyXG4gICAgdmFyIHByb2ZpbGUgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xyXG5cclxuXHJcblxyXG4gICAgdmFyIGlucHV0RGF0YSA9IGFyZ3NbMTBdIHx8IHt9O1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICB2YXIgdG9Qcm9jZXNzID0gaW5kaWNhdG9ycy5sZW5ndGg7XHJcblxyXG4gICAgICAgIHZhciBmb3JtQ3JlYXRlRm4gPSBmdW5jdGlvbihpZCwgaW5kaWNhdG9yVHlwZSwgaW5kaWNhdG9ySWQsIHZhbGlkRGF0ZSwgaW5zdGFudGlhdGVTb3VyY2UpIHtcclxuXHJcbiAgICAgICAgICAgIGdhdGVrZWVwZXIuaW5zdGFudGlhdGUoaWQsIGluZGljYXRvclR5cGUsIGluZGljYXRvcklkLCBfV0ZJbnN0YW5jZS5wcm9maWxlLCB2YWxpZERhdGUpLnRoZW4oZnVuY3Rpb24oZG9jQXJyYXkpIHtcclxuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgaW5kaWNhdG9yIHdvcmtmbG93IHByb2Nlc3NlcyBzZWN0aW9uXHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkb2NBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmplY3QgPSBkb2NBcnJheVtpXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIW9iamVjdC5tb2RlbC5faWQuZW5kc1dpdGgoJzphcHByb3ZlZCcpICYmICFvYmplY3QubW9kZWwuX2lkLmVuZHNXaXRoKCc6cmVqZWN0ZWQnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHdvcmtmbG93T2JqID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBfV0ZJbnN0YW5jZS5jb25maWcuX2lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbnN0YW5jZVwiOiBfV0ZJbnN0YW5jZS5pbnN0YW5jZS5faWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb2Nlc3Nlc1wiOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogcHJvY2Vzc0lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3ViUHJvY2Vzc0lkXCI6IHN1YlByb2Nlc3MuX2lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3ViUHJvY2Vzc1VVSURcIjogdXVpZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0ZXBcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IHN0ZXAuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VxXCI6IHN0ZXAuc2VxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0YXJ0RGF0ZVwiOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0YXR1c1wiOiBzdGVwLnN0YXR1cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IHN0ZXAubWVzc2FnZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhc3NpZ25lZFRvXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlcklkXCI6IHN0ZXAuYXNzaWduZWRUby51c2VySWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogc3RlcC5hc3NpZ25lZFRvLm5hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21tZW50XCI6IHN0ZXAuY29tbWVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21wbGV0ZVwiOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJlbmREYXRlXCI6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uLnNldFdvcmtmbG93TGFiZWxJblRpdGxlICE9IHVuZGVmaW5lZCAmJiBhY3Rpb24uc2V0V29ya2Zsb3dMYWJlbEluVGl0bGUgIT0gJycgJiYgYWN0aW9uLnNldFdvcmtmbG93TGFiZWxJblRpdGxlID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdC5tb2RlbC50aXRsZSA9IGlucHV0RGF0YS5sYWJlbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGlvbi5zZXREcmFmdCAhPSB1bmRlZmluZWQgJiYgYWN0aW9uLnNldERyYWZ0ICE9ICcnICYmIGFjdGlvbi5zZXREcmFmdCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3QubW9kZWwuY29udHJvbC5kcmFmdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3QubW9kZWwud29ya2Zsb3dzLnB1c2god29ya2Zsb3dPYmopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWFpbklkID0gb2JqZWN0Lm1vZGVsLl9pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcGVyc2lzdCB2aWEgZ2sgc28gdGhhdCBpdCBpcyBzYXZlIGluIGNvdWNoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhdGVrZWVwZXIucGVyc2lzdChkb2NBcnJheSkudGhlbihmdW5jdGlvbihzYXZlZEFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3VzaW5nIHNhbWUgaWQgY2FsbCBpbml0aWFsaXNlRGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jYWxsIGNvZGUgdG8gc2V0IHRvIHNldEluc3RhbmNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYW8uZ2V0KG1haW5JZCkuZG9uZShmdW5jdGlvbihkYXRhKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yTW9kZWwgPSBrby5tYXBwaW5nLmZyb21KUyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGVmYXVsdE1vZGVsXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2V0SWRcIjogaW5kaWNhdG9ySWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYXRla2VlcGVyLmluc3RhbnRpYXRlRGF0YShtYWluSWQsIGluc3RhbnRpYXRlU291cmNlLCBpbmRpY2F0b3JNb2RlbCwgZGF0YS5tb2RlbC5wZW5kaW5nLnNlcSkudGhlbihmdW5jdGlvbihkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVswXS5zdGF0dXMgPT0gXCIyMDBcIikge1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uLnNldFdvcmtmbG93TGFiZWxJbkZpZWxkICE9IHVuZGVmaW5lZCAmJiBhY3Rpb24uc2V0V29ya2Zsb3dMYWJlbEluRmllbGQgIT0gJycgJiYgbWFpbklkID09IHByb2ZpbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGF0aCA9IFwiZGF0YVswXS5tb2RlbC5tb2RlbC5wZW5kaW5nLmRhdGEuXCIgKyBhY3Rpb24uc2V0V29ya2Zsb3dMYWJlbEluRmllbGQgKyBcIj0nXCIgKyBpbnB1dERhdGEubGFiZWwgKyBcIidcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmFsKHBhdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhdGVrZWVwZXIucGVyc2lzdChkYXRhKS50aGVuKGZ1bmN0aW9uKHNhdmVkQXJyYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYW8uZ2V0KG1haW5JZCkuZG9uZShmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnB1c2goZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b1Byb2Nlc3MtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b1Byb2Nlc3MgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5LicsIF9XRkluc3RhbmNlLmluZGljYXRvcnMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvdW5kID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yID0gX1dGSW5zdGFuY2UuaW5kaWNhdG9yc1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGljYXRvci5faWQgPT0gZGF0YS5faWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGN1cnJlbnQgaXRlbSBmcm9tIHRoZSBhcnJheSBhbmQgYWRkIHRoZSB1cGRhdGVkIHByb2Nlc3NNb2RlbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9Qcm9jZXNzLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b1Byb2Nlc3MgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gY3JlYXRlZCBzdWNjZXNzZnVsbHkuJywgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvdW5kID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5wdXNoKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b1Byb2Nlc3MtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9Qcm9jZXNzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gY3JlYXRlZCBzdWNjZXNzZnVsbHkuJywgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuZmFpbChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmFpbHVyZSA9IHV0aWwuc3VjY2VzcygnMSBHYXRla2VlcGVyIGluaXRpYWxpc2F0aW9uIGZhaWxlZCB3aXRoIGluaXRpYWxpc2VEYXRhIG1lc3NhZ2UgJyArIGVyclswXS5tZXNzYWdlLCB7fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChmYWlsdXJlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmYWlsdXJlID0gdXRpbC5zdWNjZXNzKCcyIEdhdGVrZWVwZXIgaW5pdGlhbGlzYXRpb24gZmFpbGVkIHdpdGggaW5pdGlhbGlzZURhdGEgbWVzc2FnZSAnICsgZXJyWzBdLm1lc3NhZ2UsIHt9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFpbHVyZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmYWlsdXJlID0gdXRpbC5zdWNjZXNzKCczIEdhdGVrZWVwZXIgaW5pdGlhbGlzYXRpb24gZmFpbGVkIHdpdGggaW5pdGlhbGlzZURhdGEgbWVzc2FnZSAnICsgZXJyWzBdLm1lc3NhZ2UsIHt9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChmYWlsdXJlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmYWlsdXJlID0gdXRpbC5zdWNjZXNzKCc0IEdhdGVrZWVwZXIgaW5pdGlhbGlzYXRpb24gZmFpbGVkIHdpdGggaW5pdGlhbGlzZURhdGEgbWVzc2FnZSAnICsgZXJyWzBdLm1lc3NhZ2UsIHt9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGZhaWx1cmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuZmFpbChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZhaWx1cmUgPSB1dGlsLnN1Y2Nlc3MoJzUgR2F0ZWtlZXBlciBpbml0aWFsaXNhdGlvbiBmYWlsZWQgd2l0aCBpbml0aWFsaXNlRGF0YSBtZXNzYWdlICcgKyBlcnJbMF0ubWVzc2FnZSwge30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChmYWlsdXJlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZhaWx1cmUgPSB1dGlsLnN1Y2Nlc3MoJzYgR2F0ZWtlZXBlciBpbml0aWFsaXNhdGlvbiBmYWlsZWQgd2l0aCBpbml0aWFsaXNlRGF0YSBtZXNzYWdlICcgKyBlcnJbMF0ubWVzc2FnZSwge30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGZhaWx1cmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL3BlcnNpc3QgLSBzYXZlXHJcbiAgICAgICAgICAgICAgICAvL2xvb3Agb24gd29ya2Zsb3cgYXJyYXkgYW5kIGNoZWNrIGZvciA0IGNvbmRpdGlvbnMgYW5kIHNwbGljZSBhbmQgdXBkYXRlXHJcbiAgICAgICAgICAgICAgICAvLyBHb3QgdG8gdGhlIG5leHQgcHJvY2VzcyBpdGVtXHJcblxyXG4gICAgICAgICAgICAgICAgLyp2YXIgd29ya2Zsb3dzID0gZG9jLndvcmtmbG93cztcclxuICAgICAgICAgICAgICAgIHdvcmtmbG93cy5pZCA9IF9XRkluc3RhbmNlLmNvbmZpZy5faWQ7XHJcbiAgICAgICAgICAgICAgICB3b3JrZmxvd3MuaW5zdGFuY2UgPSBfV0ZJbnN0YW5jZS5pbnN0YW5jZS5faWQ7XHJcbiAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnB1c2goZG9jKTtcclxuICAgICAgICAgICAgICAgIGxvb3AubmV4dCgpOyovXHJcblxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHZhciB0b0FkZFByb2Nlc3MgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgX1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9XRkluc3RhbmNlLmluc3RhbmNlLnByb2Nlc3Nlc1tpXS5zdWJQcm9jZXNzZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b0FkZFByb2Nlc3MucHVzaChfV0ZJbnN0YW5jZS5pbnN0YW5jZS5wcm9jZXNzZXNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluc3RhbmNlLnByb2Nlc3NlcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzID0gdG9BZGRQcm9jZXNzO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdG9BZGRTdWJQcm9jZXNzID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXNbaV0uaW5kaWNhdG9ycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvQWRkU3ViUHJvY2Vzcy5wdXNoKF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzID0gW107XHJcbiAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMgPSB0b0FkZFN1YlByb2Nlc3M7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgIHZhciBmYWlsdXJlID0gdXRpbC5zdWNjZXNzKCc3IEdhdGVrZWVwZXIgaW5pdGlhbGlzYXRpb24gZmFpbGVkIHdpdGggaW5pdGlhbGlzZURhdGEgbWVzc2FnZSAnICsgZXJyWzBdLm1lc3NhZ2UsIHt9KTtcclxuICAgICAgICAgICAgICAgIHJlamVjdChmYWlsdXJlKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBpbnN0YW50aWF0ZVNvdXJjZSA9ICdmcm9tRGVmaW5pdGlvbic7XHJcbiAgICAgICAgZm9yICh2YXIgY291bnRlciA9IDA7IGNvdW50ZXIgPCBpbmRpY2F0b3JzLmxlbmd0aDsgY291bnRlcisrKSB7XHJcbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JJZCA9IGluZGljYXRvcnNbY291bnRlcl0uX2lkO1xyXG4gICAgICAgICAgICB2YXIgaW5kaWNhdG9yTmFtZSA9IHV0aWwuZ2V0TmFtZShpbmRpY2F0b3JzW2NvdW50ZXJdLm5hbWUsICdlbicpO1xyXG4gICAgICAgICAgICB2YXIgaW5pdFR5cGUgPSBpbmRpY2F0b3JzW2NvdW50ZXJdLl90eXBlO1xyXG5cclxuICAgICAgICAgICAgdmFyIGlkID0gJyc7XHJcbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JEb2MgPSB7fTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpbml0VHlwZSA9PSAnbmV3SW5zdGFuY2UnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGJhc2VVVUlEICE9IHVuZGVmaW5lZCAmJiBiYXNlVVVJRCAhPSAnJyAmJiBiYXNlVVVJRC5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBleGlzdGluZ1VVSUQgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgYmFzZVVVSUQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ1wiICsgaW5kaWNhdG9ySWQgKyBcIiddL2luc3RhbmNlc1sxXS91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgaWQgPSBleGlzdGluZ1VVSUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdFR5cGUgPSAnbmV3U2VxdWVuY2UnO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyB1cGRhdGUgcHJvY2Vzc2VzIGJsb2NrIHRvIG5vdCBkaXNwbGF5IHRoZSBvbGRlciBpbnN0YW5jZSBiYXNlZCBvbiBiYXNlVVVJRFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL1RPRE86IENoYW5nZSByZXF1aXJlZCB0byBtb3ZlIGlzQWN0aXZlIHRvIHN1YlByb2Nlc3MgZmlsZS5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3AgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgYmFzZVVVSUQgKyBcIiddXCIsIGFwcC5TQ09QRS53b3JrZmxvdywge30pWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIHNwLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGluc3RhbnRpYXRlIG5ldyBzZXEgd2l0aCBwcmV2aW91cyBhdXRob3Jpc2VkIGRhdGFcclxuICAgICAgICAgICAgICAgICAgICBpbnN0YW50aWF0ZVNvdXJjZSA9ICdmcm9tQXV0aG9yaXNlZCc7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1YlByb2Nlc3MuaXNQcm9maWxlICE9IHVuZGVmaW5lZCAmJiBzdWJQcm9jZXNzLmlzUHJvZmlsZSAmJiBjb3VudGVyID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQgPSBwcm9maWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkID0gaW5kaWNhdG9ySWQgKyAnLScgKyBnZW5lcmF0ZVVVSUQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgc3BMYXN0VXVpZCA9IEpTT04ueHBhdGgoXCIvaW5zdGFuY2UvcHJvY2Vzc2VzW2lkIGVxICdcIiArIHByb2Nlc3NJZCArIFwiJyBhbmQgc3ViUHJvY2Vzc2VzL2lkIGVxICdcIiArIHN1YlByb2Nlc3NJZCArIFwiJ11bMV0vc3ViUHJvY2Vzc2VzL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICAgICAgICAgIHZhciBpbmRJZCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzcExhc3RVdWlkICsgXCInXS9pbmRpY2F0b3JzW2lkIGVxICdcIiArIGluZGljYXRvcklkICsgXCInXS9pbnN0YW5jZXMvdXVpZFwiLCBhcHAuU0NPUEUud29ya2Zsb3csIHt9KVswXTtcclxuICAgICAgICAgICAgICAgIGlmIChzcExhc3RVdWlkID09ICcnIHx8IHNwTGFzdFV1aWQgPT0gdW5kZWZpbmVkIHx8IGluZElkID09ICcnIHx8IGluZElkID09IHVuZGVmaW5lZCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3ViUHJvY2Vzcy5pc1Byb2ZpbGUgIT0gdW5kZWZpbmVkICYmIHN1YlByb2Nlc3MuaXNQcm9maWxlICYmIGNvdW50ZXIgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZCA9IHByb2ZpbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQgPSBpbmRpY2F0b3JJZCArICctJyArIGdlbmVyYXRlVVVJRCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZCA9IGluZElkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChiYXNlVVVJRCAhPSB1bmRlZmluZWQgJiYgYmFzZVVVSUQgIT0gJycgJiYgYmFzZVVVSUQubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL1RPRE86IENoYW5nZSByZXF1aXJlZCB0byBtb3ZlIGlzQWN0aXZlIHRvIHN1YlByb2Nlc3MgZmlsZS5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNwID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIGJhc2VVVUlEICsgXCInXVwiLCBhcHAuU0NPUEUud29ya2Zsb3csIHt9KVswXTtcclxuICAgICAgICAgICAgICAgICAgICBzcC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBpbnN0YW50aWF0ZVNvdXJjZSA9ICdmcm9tQXV0aG9yaXNlZCc7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFRPRE86IFJlcGxhY2Ugd2l0aCB0aGUgZ2F0ZWtlZXBlciBwcm9taXNlIGNhbGwsIHJldHVybiB0aGUgb2JqZWN0LCB1cGRhdGUgdGhlIGluZGljYXRvclxyXG4gICAgICAgICAgICAvLyBkb2N1bWVudCB3b3JrZmxvdyBwcm9jZXNzZXMgZGF0YSBhbmQgdXBkYXRlIHRoZSB3b3JrZmxvdyBjbGFzcyBpbmRpY2F0b3JzIGFycmF5LlxyXG4gICAgICAgICAgICBmb3JtQ3JlYXRlRm4oaWQsIGluaXRUeXBlLCBpbmRpY2F0b3JJZCwgJycsIGluc3RhbnRpYXRlU291cmNlKTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGluZGljYXRvciBzZXQgc2F2ZWQgc3VjY2Vzc2Z1bGx5LicsIHJlc3VsdCk7XHJcbiAgICAgICAgLy8gcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gc2V0SW5zdGFuY2VUaXRsZShhcmdzKSB7XHJcblxyXG4gICAgdmFyIF9XRkluc3RhbmNlID0gYXJnc1swXSB8fCB7fTtcclxuICAgIHZhciB1dWlkID0gYXJnc1syXSB8fCAnJztcclxuICAgIHZhciBkYXRhID0gYXJnc1s0XSB8fCB7fTtcclxuICAgIHZhciB0aXRsZSA9IGRhdGEubGFiZWw7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICB2YXIgc3ViUHJvY2Vzc0luc3RhbmNlID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcbiAgICAgICAgdmFyIGluZGljYXRvckluc3RhbmNlcyA9IHN1YlByb2Nlc3NJbnN0YW5jZS5pbmRpY2F0b3JzO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluZGljYXRvckluc3RhbmNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgaW5kaWNhdG9yVVVJRCA9IGluZGljYXRvckluc3RhbmNlc1tpXS5pbnN0YW5jZXNbMF0udXVpZDtcclxuICAgICAgICAgICAgdmFyIGluZGljYXRvckluc3RhbmNlID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW19pZCBlcSAnXCIgKyBpbmRpY2F0b3JVVUlEICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG4gICAgICAgICAgICBpbmRpY2F0b3JJbnN0YW5jZS50aXRsZSA9IGluZGljYXRvckluc3RhbmNlc1tpXS5pZCArJyAnK3RpdGxlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJlc29sdmUoXCJTZXQgVGl0bGUgU3VjY2Vzc1wiLCBpbmRpY2F0b3JJbnN0YW5jZXMpO1xyXG5cclxuICAgIH0pO1xyXG5cclxufTtcclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZVByb2ZpbGUoYXJncykge1xyXG5cclxuICAgIHZhciBfV0ZJbnN0YW5jZSA9IGFyZ3NbMF0gfHwge307XHJcbiAgICB2YXIgcHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB7XHJcbiAgICAgICAgICAgIFwic291cmNlXCI6IFwicmVtb3RlXCIsXHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcIndvcmtlck9iamVjdFwiLFxyXG4gICAgICAgICAgICBcIl9pZFwiOiBnZW5lcmF0ZVVVSUQoKSxcclxuICAgICAgICAgICAgXCJjaGFubmVsc1wiOiBbXSxcclxuICAgICAgICAgICAgXCJjb21tdW5pdHlJZFwiOiBhcHAuU0NPUEUuY29tbXVuaXR5SWQsXHJcbiAgICAgICAgICAgIFwiYXBwbGljYXRpb25JZFwiOiBhcHAuU0NPUEUuYXBwbGljYXRpb25JZCxcclxuICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiXCIsXHJcbiAgICAgICAgICAgIFwibWVzc2FnZVR5cGVcIjogXCJpbmZvXCIsXHJcbiAgICAgICAgICAgIFwiY3JlYXRlZERhdGVUaW1lXCI6IG1vbWVudCgpLmZvcm1hdCgpLFxyXG4gICAgICAgICAgICBcInNlbmRlclVzZXJJZFwiOiBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZCxcclxuICAgICAgICAgICAgXCJub3RpZmljYXRpb25cIjoge1xyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwcm9maWxlXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWN0aW9uXCI6IFwiZGVsZXRlUHJvZmlsZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJwcm9maWxlSWRcIjogcHJvZmlsZUlkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2cod29ya2VyT2JqZWN0KTtcclxuICAgICAgICBkYW8udXBzZXJ0KHdvcmtlck9iamVjdCkuZG9uZShmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV29ya2VyIE9iamVjdCBzdWJtaXR0ZWQgZm9yIHByb2ZpbGUoXCIgKyBwcm9maWxlSWQgKyBcIikgZGVsZXRpb24uXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICByZWplY3QoZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgIH0pO1xyXG5cclxuXHJcbn07XHJcblxyXG5cclxuZnVuY3Rpb24gY3JlYXRlUHJvZmlsZShhcmdzKSB7XHJcblxyXG5cclxuXHJcbiAgICB2YXIgX1dGSW5zdGFuY2UgPSBhcmdzWzFdIHx8IHt9O1xyXG5cclxuICAgIHZhciBjb21tdW5pdHlJZCA9IF9XRkluc3RhbmNlLmNvbW11bml0eUlkO1xyXG4gICAgdmFyIHByb2ZpbGVJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICBsaWJyYXJ5LmNyZWF0ZVByb2ZpbGVEb2N1bWVudHMoY29tbXVuaXR5SWQsIHByb2ZpbGVJZCkuZG9uZShmdW5jdGlvbihkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnRm9ybSBjcmVhdGVkIHN1Y2Nlc3NmdWxseS4nLCBkYXRhKTtcclxuICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuXHJcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbihlcnIpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgdmFyIGZhaWx1cmUgPSB1dGlsLnN1Y2Nlc3MoJ0VSUk9SOiBQcm9maWxlIGNyZWF0aW9uIGZhaWxlZCcgKyBlcnJbMF0ubWVzc2FnZSwge30pO1xyXG4gICAgICAgICAgICByZWplY3QoZmFpbHVyZSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gc2V0RHJhZnQoYXJncykge1xyXG5cclxuXHJcblxyXG4gICAgdmFyIF9XRkluc3RhbmNlID0gYXJnc1swXSB8fCB7fTtcclxuICAgIHZhciBjb21tdW5pdHlJZCA9IF9XRkluc3RhbmNlLmNvbW11bml0eUlkO1xyXG4gICAgdmFyIHByb2ZpbGVJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XHJcbiAgICB2YXIgdXVpZCA9IGFyZ3NbMl0gfHwgJyc7XHJcblxyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgdmFyIHN1YlByb2Nlc3NJbnN0YW5jZSA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG4gICAgICAgIHZhciBpbmRpY2F0b3JJbnN0YW5jZXMgPSBzdWJQcm9jZXNzSW5zdGFuY2UuaW5kaWNhdG9ycztcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbmRpY2F0b3JJbnN0YW5jZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGluZGljYXRvclVVSUQgPSBpbmRpY2F0b3JJbnN0YW5jZXNbaV0uaW5zdGFuY2VzWzBdLnV1aWQ7XHJcbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JJbnN0YW5jZSA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tfaWQgZXEgJ1wiICsgaW5kaWNhdG9yVVVJRCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICAgICAgaW5kaWNhdG9ySW5zdGFuY2UuY29udHJvbC5kcmFmdCA9IHRydWU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmVzb2x2ZShcIlNldCBEcmFmdCBTdWNjZXNzXCIsIGluZGljYXRvckluc3RhbmNlcyk7XHJcblxyXG4gICAgfSk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBzZXRVbkRyYWZ0KGFyZ3MpIHtcclxuXHJcbiAgICB2YXIgX1dGSW5zdGFuY2UgPSBhcmdzWzBdIHx8IHt9O1xyXG4gICAgdmFyIGNvbW11bml0eUlkID0gX1dGSW5zdGFuY2UuY29tbXVuaXR5SWQ7XHJcbiAgICB2YXIgcHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcclxuICAgIHZhciB1dWlkID0gYXJnc1syXSB8fCAnJztcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgIHZhciBzdWJQcm9jZXNzSW5zdGFuY2UgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICB2YXIgaW5kaWNhdG9ySW5zdGFuY2VzID0gc3ViUHJvY2Vzc0luc3RhbmNlLmluZGljYXRvcnM7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5kaWNhdG9ySW5zdGFuY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JVVUlEID0gaW5kaWNhdG9ySW5zdGFuY2VzW2ldLmluc3RhbmNlc1swXS51dWlkO1xyXG4gICAgICAgICAgICB2YXIgaW5kaWNhdG9ySW5zdGFuY2UgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbX2lkIGVxICdcIiArIGluZGljYXRvclVVSUQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcbiAgICAgICAgICAgIGluZGljYXRvckluc3RhbmNlLmNvbnRyb2wuZHJhZnQgPSBmYWxzZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXNvbHZlKFwiU2V0IERyYWZ0IFN1Y2Nlc3NcIiwgaW5kaWNhdG9ySW5zdGFuY2VzKTtcclxuXHJcbiAgICB9KTtcclxufTtcclxuXHJcblxyXG5cclxuZnVuY3Rpb24gc2F2ZShpbmRpY2F0b3IpIHtcclxuICAgIHZhciBjb21wbGV0ZWQgPSBbXTtcclxuICAgIHZhciByZXN1bHQgPSB7XHJcbiAgICAgICAgY29tcGxldGU6IHRydWUsXHJcbiAgICAgICAgZGF0YTogW11cclxuICAgIH07XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gaW5kaWNhdG9yIHNldCBzYXZlZCBzdWNjZXNzZnVsbHkuJywgcmVzdWx0KTtcclxuICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBzdWJtaXQoZm9ybSkge1xyXG4gICAgdmFyIGNvbXBsZXRlZCA9IFtdO1xyXG4gICAgdmFyIHJlc3VsdCA9IHtcclxuICAgICAgICBjb21wbGV0ZTogdHJ1ZSxcclxuICAgICAgICBkYXRhOiBbXVxyXG4gICAgfTtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnRm9ybSBzdWJtaXR0ZWQgc3VjY2Vzc2Z1bGx5LicsIHJlc3VsdCk7XHJcbiAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gYXV0aG9yaXNlKGZvcm0pIHtcclxuICAgIHZhciBjb21wbGV0ZWQgPSBbXTtcclxuICAgIHZhciByZXN1bHQgPSB7XHJcbiAgICAgICAgY29tcGxldGU6IHRydWUsXHJcbiAgICAgICAgZGF0YTogW11cclxuICAgIH07XHJcblxyXG4gICAgdmFyIHByb2Nlc3NJZCA9IGZvcm1bMF0gfHwgJyc7XHJcblxyXG4gICAgdmFyIHN1YlByb2Nlc3MgPSBmb3JtWzFdIHx8IHt9O1xyXG5cclxuICAgIHZhciBzdWJQcm9jZXNzSWQgPSBzdWJQcm9jZXNzLl9pZDtcclxuXHJcbiAgICB2YXIgcHJvY2Vzc1NlcSA9IGZvcm1bMl0gfHwgJyc7XHJcblxyXG4gICAgdmFyIHN1YlByb2Nlc3NTZXEgPSBmb3JtWzNdIHx8ICcnO1xyXG5cclxuICAgIHZhciBfV0ZJbnN0YW5jZSA9IGZvcm1bNF0gfHwge307XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICB2YXIgc3ViUHJvY2Vzc1VVSUQgPSBKU09OLnhwYXRoKFwiL3Byb2Nlc3Nlc1tpZCBlcSAnXCIgKyBwcm9jZXNzSWQgKyBcIicgYW5kIHNlcSBlcSAnXCIgKyBwcm9jZXNzU2VxICsgXCInXS9zdWJQcm9jZXNzZXNbaWQgZXEgJ1wiICsgc3ViUHJvY2Vzc0lkICsgXCInIGFuZCBzZXEgZXEgJ1wiICsgc3ViUHJvY2Vzc1NlcSArIFwiJ10vdXVpZFwiLCBfV0ZJbnN0YW5jZS5pbnN0YW5jZSwge30pWzBdO1xyXG4gICAgICAgIHZhciBzcEluZGljYXRvcnMgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3ViUHJvY2Vzc1VVSUQgKyBcIiddL2luZGljYXRvcnMvaW5zdGFuY2VzL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KTtcclxuICAgICAgICB2YXIgaXRlbXNUb1Byb2Nlc3MgPSBzcEluZGljYXRvcnMubGVuZ3RoO1xyXG4gICAgICAgIHZhciB1cGRhdGVkT2JqZWN0c0FycmF5ID0gW107XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXNUb1Byb2Nlc3M7IGkrKykge1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBnYXRla2VlcGVyLmF1dGhvcmlzZShzcEluZGljYXRvcnNbaV0pLnRoZW4oZnVuY3Rpb24oYXV0aG9yaXNlZFJldHVybikge1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBnYXRla2VlcGVyLnBlcnNpc3QoYXV0aG9yaXNlZFJldHVybikudGhlbihmdW5jdGlvbihzYXZlZEFycmF5KSB7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgdXVpZFNhdmVkSW5kaWNhdG9yID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCBzYXZlZEFycmF5Lmxlbmd0aDsgYysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc2F2ZWRBcnJheVtjXS5pZC5lbmRzV2l0aCgnOmFwcHJvdmVkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV1aWRTYXZlZEluZGljYXRvciA9IHNhdmVkQXJyYXlbY10uaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZGFvLmdldCh1dWlkU2F2ZWRJbmRpY2F0b3IpLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5wdXNoKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNUb1Byb2Nlc3MtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1RvUHJvY2VzcyA9PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGF1dGhvcmlzZWQgc3VjY2Vzc2Z1bGx5LicsIHVwZGF0ZWRPYmplY3RzQXJyYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm91bmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3IgPSBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzW2luZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kaWNhdG9yLl9pZCA9PSBkYXRhLl9pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgY3VycmVudCBpdGVtIGZyb20gdGhlIGFycmF5IGFuZCBhZGQgdGhlIHVwZGF0ZWQgcHJvY2Vzc01vZGVsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5wdXNoKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1RvUHJvY2Vzcy0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbXNUb1Byb2Nlc3MgPT0gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGF1dGhvcmlzZWQgc3VjY2Vzc2Z1bGx5LicsIHVwZGF0ZWRPYmplY3RzQXJyYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3VuZCA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNUb1Byb2Nlc3MtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbXNUb1Byb2Nlc3MgPT0gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gYXV0aG9yaXNlZCBzdWNjZXNzZnVsbHkuJywgdXBkYXRlZE9iamVjdHNBcnJheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLmZhaWwoZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtc1RvUHJvY2Vzcy0tO1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1zVG9Qcm9jZXNzID09IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gYXV0aG9yaXNlZCBzdWNjZXNzZnVsbHkuJywgdXBkYXRlZE9iamVjdHNBcnJheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH0pO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gY2xvc2UoZm9ybSkge1xyXG4gICAgdmFyIGNvbXBsZXRlZCA9IFtdO1xyXG4gICAgdmFyIHJlc3VsdCA9IHtcclxuICAgICAgICBjb21wbGV0ZTogdHJ1ZSxcclxuICAgICAgICBkYXRhOiBbXVxyXG4gICAgfTtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnRm9ybSBjbG9zZWQgc3VjY2Vzc2Z1bGx5LicsIHJlc3VsdCk7XHJcbiAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gICAgY3JlYXRlOiBjcmVhdGUsXHJcbiAgICBzYXZlOiBzYXZlLFxyXG4gICAgc3VibWl0OiBzdWJtaXQsXHJcbiAgICBhdXRob3Jpc2U6IGF1dGhvcmlzZSxcclxuICAgIGNsb3NlOiBjbG9zZSxcclxuICAgIHNldERyYWZ0OiBzZXREcmFmdCxcclxuICAgIHNldFVuRHJhZnQ6IHNldFVuRHJhZnQsXHJcbiAgICBjcmVhdGVQcm9maWxlOiBjcmVhdGVQcm9maWxlLFxyXG4gICAgc2V0SW5zdGFuY2VUaXRsZTogc2V0SW5zdGFuY2VUaXRsZSxcclxuICAgIGRlbGV0ZVByb2ZpbGU6IGRlbGV0ZVByb2ZpbGVcclxuXHJcbn0iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWxpdHknKTtcclxuXHJcbi8qKlxyXG4gKiBVc2VyIEludGVyZmFjZSBNb2R1bGVcclxuICpcclxuICogQG1vZHVsZSBsaWIvdWlcclxuICogQGF1dGhvciBCcmVudCBHb3Jkb25cclxuICogQHZlcnNpb24gMC4xLjBcclxuICogQGRlc2NyaXB0aW9uIHRlc3QgZGVzY3JpcHRpb25cclxuICpcclxuICovXHJcblxyXG4gLyoqXHJcbiAgKiBHZXQgYWxsIHByb2Nlc3Mgc3ViLXByb2Nlc3NlcyB1c2VyIGludGVyZmFjZSBkYXRhXHJcbiAgKlxyXG4gICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHByb2Nlc3MgaWRcclxuICAqIEBwYXJhbSB7c3RyaW5nfSBsYW5nIC0gdGhlIHVzZXIgcHJlZmZlcmVkIGxhbmdhdWdlXHJcbiAgKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxyXG4gICpcclxuICAqIEBleGFtcGxlICcnXHJcbiAgKlxyXG4gICogQHJldHVybiAnJ1xyXG4gICpcclxuICAqL1xyXG4gZnVuY3Rpb24gZ2V0UHJvY2Vzcyhwcm9jZXNzSWQsIGxhbmcsIF9XRkluc3RhbmNlKXtcclxuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICB2YXIgcHJvY2Vzc01vZGVsID0gW107XHJcbiAgICAgIHZhciBwcm9jZXNzSW5zdGFuY2UgPSBbXTtcclxuICAgIFx0X1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihwcm9jZXNzSXRlbSl7XHJcbiAgICBcdFx0aWYgKHByb2Nlc3NJdGVtLmlkID09IHByb2Nlc3NJZCkge1xyXG4gICAgXHRcdFx0cHJvY2Vzc0luc3RhbmNlID0gcHJvY2Vzc0l0ZW07XHJcbiAgICBcdFx0fVxyXG4gICAgXHR9KVxyXG4gICAgICAvLyBjb25zb2xlLmxvZyhwcm9jZXNzSW5zdGFuY2Uuc3ViUHJvY2Vzc2VzLmxlbmd0aCk7XHJcbiAgICAgIHV0aWwuc3luY0xvb3AocHJvY2Vzc0luc3RhbmNlLnN1YlByb2Nlc3Nlcy5sZW5ndGgsIGZ1bmN0aW9uKGxvb3Ape1xyXG4gIFx0XHRcdHZhciBjb3VudGVyID0gbG9vcC5pdGVyYXRpb24oKTtcclxuICAgICAgICB2YXIgcHJvY2Vzc1NlcSA9IHByb2Nlc3NJbnN0YW5jZS5zZXE7XHJcbiAgICAgICAgdmFyIHN1YlByb2Nlc3NJZCA9IHByb2Nlc3NJbnN0YW5jZS5zdWJQcm9jZXNzZXNbY291bnRlcl0uaWQ7XHJcbiAgICAgICAgdmFyIHN1YlByb2Nlc3NTZXEgPSBwcm9jZXNzSW5zdGFuY2Uuc3ViUHJvY2Vzc2VzW2NvdW50ZXJdLnNlcTtcclxuICAgICAgICBnZXRTdWJQcm9jZXNzKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBsYW5nLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihtb2RlbCl7XHJcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhtb2RlbCk7XHJcbiAgICAgICAgICBwcm9jZXNzTW9kZWwucHVzaChtb2RlbCk7XHJcbiAgICAgICAgICBsb29wLm5leHQoKTtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHByb2Nlc3NNb2RlbCk7XHJcbiAgXHRcdFx0fSwgZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHByb2Nlc3NNb2RlbCk7XHJcbiAgXHRcdFx0XHRsb29wLmJyZWFrKCk7XHJcbiAgXHRcdFx0XHRyZWplY3QoZXJyKTtcclxuICBcdFx0XHR9KTtcclxuICBcdFx0fSwgZnVuY3Rpb24oKXtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhwcm9jZXNzTW9kZWwpO1xyXG4gIFx0XHRcdHJlc29sdmUocHJvY2Vzc01vZGVsKTtcclxuICBcdFx0fSk7XHJcbiAgICB9IGNhdGNoKGVycil7XHJcbiAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgfVxyXG4gIH0pXHJcbn07XHJcblxyXG4gLyoqXHJcbiAgKiBHZXQgU3ViUHJvY2VzcyB1c2VyIGludGVyZmFjZSBkYXRhXHJcbiAgKlxyXG4gICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHByb2Nlc3MgaWRcclxuICAqIEBwYXJhbSB7bnVtYmVyfSBwcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHByb2Nlc3Mgc2VxXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gc3ViUHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3ViLXByb2Nlc3MgaWRcclxuICAqIEBwYXJhbSB7bnVtYmVyfSBzdWJQcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHN1Yi1wcm9jZXNzIHNlcVxyXG4gICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcclxuICAqXHJcbiAgKiBAZXhhbXBsZSAnJ1xyXG4gICpcclxuICAqIEByZXR1cm4gJydcclxuICAqXHJcbiAgKi9cclxuZnVuY3Rpb24gZ2V0U3ViUHJvY2Vzcyhwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgbGFuZywgX1dGSW5zdGFuY2Upe1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHZhciBtb2RlbCA9IHtcclxuICAgICAgICBpZDogJycsXHJcbiAgICAgICAgc2VxOiAnJyxcclxuICAgICAgICBuYW1lOiAnJyxcclxuICAgICAgICBoZWxwOiAnJyxcclxuICAgICAgICBkYXRlczogJycsXHJcbiAgICAgICAgc3RlcDogJydcclxuICAgICAgfTtcclxuICAgICAgdmFyIHN1YlByb2Nlc3MgPSBbXTtcclxuICAgIFx0dmFyIHN1YlByb2Nlc3NDb25mID0gW107XHJcbiAgICBcdF9XRkluc3RhbmNlLmluc3RhbmNlLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ocHJvY2Vzc0l0ZW0pe1xyXG4gICAgXHRcdGlmIChwcm9jZXNzSXRlbS5pZCA9PSBwcm9jZXNzSWQgJiYgcHJvY2Vzc0l0ZW0uc2VxID09IHByb2Nlc3NTZXEpIHtcclxuICAgIFx0XHRcdHZhciBzcExlbmd0aCA9IHByb2Nlc3NJdGVtLnN1YlByb2Nlc3Nlcy5sZW5ndGg7XHJcbiAgICBcdFx0XHRwcm9jZXNzSXRlbS5zdWJQcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHN1YlByb2Nlc3NJdGVtKXtcclxuICAgIFx0XHRcdFx0aWYgKHN1YlByb2Nlc3NJdGVtLmlkID09IHN1YlByb2Nlc3NJZCAmJiBzdWJQcm9jZXNzSXRlbS5zZXEgPT0gc3ViUHJvY2Vzc1NlcSAmJiBzdWJQcm9jZXNzSXRlbS5jb21wbGV0ZSA9PSBmYWxzZSkge1xyXG4gICAgXHRcdFx0XHRcdHN1YlByb2Nlc3MgPSBzdWJQcm9jZXNzSXRlbTtcclxuICAgIFx0XHRcdFx0fVxyXG4gICAgXHRcdFx0fSlcclxuICAgIFx0XHR9XHJcbiAgICBcdH0pXHJcbiAgICBcdC8vIEdldCB0aGUgY3VycmVudCBzdWJQcm9jZXNzIGNvbmZpZ3VyYXRpb25cclxuICAgIFx0X1dGSW5zdGFuY2UuY29uZmlnLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ocHJvY2Vzc0NvbmZpZyl7XHJcbiAgICBcdFx0aWYgKHByb2Nlc3NDb25maWcuX2lkID09IHByb2Nlc3NJZCkge1xyXG4gICAgXHRcdFx0cHJvY2Vzc0NvbmZpZy5zdWJQcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHN1YlByb2Nlc3NDb25maWcpe1xyXG4gICAgXHRcdFx0XHRpZiAoc3ViUHJvY2Vzc0NvbmZpZy5faWQgPT0gc3ViUHJvY2Vzc0lkKSB7XHJcbiAgICBcdFx0XHRcdFx0c3ViUHJvY2Vzc0NvbmYgPSBzdWJQcm9jZXNzQ29uZmlnO1xyXG4gICAgXHRcdFx0XHR9XHJcbiAgICBcdFx0XHR9KVxyXG4gICAgXHRcdH1cclxuICAgIFx0fSlcclxuICAgICAgLy8gVXBkYXRlIHRoZSBtb2RlbFxyXG4gICAgICBtb2RlbC5pZCA9IHN1YlByb2Nlc3NDb25mLl9pZDtcclxuICAgICAgbW9kZWwuc2VxID0gc3ViUHJvY2Vzcy5zZXE7XHJcbiAgICAgIG1vZGVsLm5hbWUgPSB1dGlsLmdldE5hbWUoc3ViUHJvY2Vzc0NvbmYubmFtZSwgbGFuZyk7XHJcbiAgICAgIG1vZGVsLmhlbHAgPSB1dGlsLmdldE5hbWUoc3ViUHJvY2Vzc0NvbmYuaGVscCwgbGFuZyk7XHJcbiAgICAgIG1vZGVsLmRhdGVzID0gc3ViUHJvY2Vzcy5kYXRlcztcclxuICAgICAgbW9kZWwuc3RlcCA9IHN1YlByb2Nlc3Muc3RlcDtcclxuICAgICAgcmVzb2x2ZShtb2RlbCk7XHJcbiAgICB9IGNhdGNoKGVycikge1xyXG4gICAgICByZWplY3QoZXJyKTtcclxuICAgIH1cclxuICB9KVxyXG59O1xyXG5cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gcHJlcGFyZU5vdGlmaWNhdGlvblNjcmVlbigpe1xyXG5cclxuICBcIlwiXHJcbn07XHJcblxyXG4gbW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gIGdldFByb2Nlc3M6IGdldFByb2Nlc3NcclxuXHJcbiB9XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbGl0eScpO1xyXG52YXIgYWN0aW9uc01vZHVsZSA9IHJlcXVpcmUoJy4vYWN0aW9ucycpO1xyXG52YXIgZm9ybSA9IHJlcXVpcmUoJy4vZm9ybScpO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBQcm9jZXNzIE1vZHVsZVxyXG4gKlxyXG4gKiBAbW9kdWxlIGxpYi9wcm9jZXNzXHJcbiAqIEBhdXRob3IgQnJlbnQgR29yZG9uXHJcbiAqIEB2ZXJzaW9uIDAuMS4wXHJcbiAqIEBkZXNjcmlwdGlvbiB0ZXN0IGRlc2NyaXB0aW9uXHJcbiAqXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIENvdW50IGFuIGFycmF5IG9mIGl0ZW1zXHJcbiAqXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciAtIHRoZSBhcnJheSBkYXRhXHJcbiAqXHJcbiAqIEBleGFtcGxlICcnXHJcbiAqXHJcbiAqIEByZXR1cm4gJydcclxuICpcclxuICovXHJcbmZ1bmN0aW9uIGNvdW50KGFycikge1xyXG4gICAgaWYgKGFyciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIGFyci5sZW5ndGg7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxufTtcclxuXHJcbi8qKlxyXG4gKiBQcm9jZXNzIHByZS1yZXF1aXNpdGVzXHJcbiAqXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBwcmVyZXF1aXNpdGVzIC0gdGhlIHByZS1yZXF1aXNpdGVzIGNvbmZpZyBkYXRhXHJcbiAqXHJcbiAqIEBleGFtcGxlICcnXHJcbiAqXHJcbiAqIEByZXR1cm4gJydcclxuICpcclxuICovXHJcbmZ1bmN0aW9uIHByZVJlcXVpc2l0ZXMocHJlcmVxdWlzaXRlcywgX1dGSW5zdGFuY2UpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAvLyBVbmNvbW1lbnQgYmVsb3cgc2VjdGlvbiB3aGVuIHJlYWR5IHRvIGltcGxlbWVudFxyXG4gICAgICAgIHZhciBjb21wbGV0ZWQgPSBbXTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB1dGlsLnN5bmNMb29wKHByZXJlcXVpc2l0ZXMubGVuZ3RoLCBmdW5jdGlvbihsb29wKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY291bnRlciA9IGxvb3AuaXRlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBwcmVSZXF1aXNpdGUocHJlcmVxdWlzaXRlc1tjb3VudGVyXSwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGFsbCBwcmUtcmVxdWlzaXRlcyBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlZC5wdXNoKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvb3AubmV4dCgpO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVkLnB1c2goZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvb3AuYnJlYWsoKTtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZWQuZXZlcnkoQm9vbGVhbikpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnUHJlLXJlcXVpc2l0ZXMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCB7fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZQcmVSZXF1aXNpdGVFcnJvcicsICdOb3QgYWxsIHByZS1yZXF1aXNpdGVzIHBhc3NlZC4nKTtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUHJvY2VzcyBwcmUtcmVxdWlzaXRlLCBleGVjdXRlIHRoZSBwcmUtcmVxdWlzaXRlIGNvbmRpdGlvbi5cclxuICpcclxuICogQHBhcmFtIHtvYmplY3R9IHByZXJlcXVpc2l0ZSAtIHRoZSBwcmUtcmVxdWlzaXRlIGNvbmZpZyBkYXRhXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxyXG4gKlxyXG4gKiBAZXhhbXBsZVxyXG4gKiBQcm9jZXNzLnByZVJlcXVpc2l0ZShjb25maWcsIGNvdW50ZXIsIGluc3RhbmNlLCBkb2MpO1xyXG4gKlxyXG4gKiBAcmV0dXJuICcnXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiBwcmVSZXF1aXNpdGUocHJlcmVxdWlzaXRlLCBfV0ZJbnN0YW5jZSkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHN3aXRjaCAocHJlcmVxdWlzaXRlLl90eXBlKSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IEFkZCB0aGUgY2FsbCB0byB0aGUgcmVsZXZhbnQgbWV0aG9kcyBiYXNlZCBvbiB0aGUgX3R5cGUgYXR0cmlidXRlLiBTaG91bGQgY2FsbCB0aGUgZ2VuZXJpYyBhY3Rpb24oKSBtZXRob2QuXHJcbiAgICAgICAgICAgIGNhc2UgJ3Byb2Nlc3NJbnN0YW5jZXMnOlxyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlkID0gcHJlcmVxdWlzaXRlLl9wYXJhbWV0ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9maWx0ZXIgPSBwcmVyZXF1aXNpdGUuX2ZpbHRlcjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3ViamVjdENvdW50ID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9maWx0ZXIgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfZmlsdGVyT3BlcmF0b3IgPSBfZmlsdGVyLl9vcGVyYXRvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHhwYXRoT3BlcmF0b3IgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfZmlsdGVyT3BlcmF0b3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2dyZWF0ZXJUaGFuJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4cGF0aE9wZXJhdG9yID0gJ2d0JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2xlc3NUaGFuJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4cGF0aE9wZXJhdG9yID0gJ2x0JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2dyZWF0ZXJUaGFuRXF1YWwnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhwYXRoT3BlcmF0b3IgPSAnZ2UnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbGVzc1RoYW5FcXVhbCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeHBhdGhPcGVyYXRvciA9ICdsZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdlcXVhbFRvJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4cGF0aE9wZXJhdG9yID0gJ2VxJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ25vdEVxdWFsVG8nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhwYXRoT3BlcmF0b3IgPSAnbmUnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfZmlsdGVyRWxlbWVudCA9IF9maWx0ZXIuX2VsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfZmlsdGVyRWxlbWVudCA9IF9maWx0ZXJFbGVtZW50LnNwbGl0KCcuJykuam9pbignLycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2ZpbHRlclZhbHVlID0gX2ZpbHRlci5fdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbm5lclhwYXRoID0gXCIvXCIgKyBfZmlsdGVyRWxlbWVudCArIFwiWy4gZXEgJ1wiICsgX2ZpbHRlclZhbHVlICsgXCInXVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZnVsbFBhdGggPSBcImNvdW50KC9zdWJwcm9jZXNzZXNbaWQgZXEgJ1wiICsgaWQgKyBcIiddXCIgKyBpbm5lclhwYXRoICsgXCIpXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YmplY3RDb3VudCA9IEpTT04ueHBhdGgoZnVsbFBhdGgsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YmplY3RDb3VudCA9IEpTT04ueHBhdGgoXCJjb3VudCgvc3VicHJvY2Vzc2VzW2lkIGVxICdcIiArIGlkICsgXCInXSlcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBhcmUgPSB1dGlsLmNvbXBhcmUoc3ViamVjdENvdW50LCBwcmVyZXF1aXNpdGUuX29wZXJhdG9yLCBwYXJzZUludChwcmVyZXF1aXNpdGUuX3ZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBhcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1ByZS1yZXF1aXNpdGVzIHBhc3NlZC4nLCB7fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJlcmVxdWlzaXRlLm1lc3NhZ2UuaTE4bi5maWx0ZXIoZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uX2xhbmcgPT0gJ2VuJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBpdGVtLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGUHJlUmVxdWlzaXRlRXJyb3InLCBtZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGUHJlUmVxdWlzaXRlRXJyb3InLCAnUHJlLXJlcXVpc2l0ZSB0eXBlOiAnICsgcHJlcmVxdWlzaXRlLl90eXBlICsgJyBub3QgZGVmaW5lZC4nKTtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUHJvY2VzcyBwcmUtYWN0aW9uc3NcclxuICpcclxuICogQHBhcmFtIHtvYmplY3R9IHByZUFjdGlvbnMgLSB0aGUgcHJlLWFjdGlvbnMgY29uZmlnIGRhdGFcclxuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcclxuICpcclxuICogQGV4YW1wbGUgJydcclxuICpcclxuICogQHJldHVybiAnJ1xyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gcHJlQWN0aW9ucyhwcmVBY3Rpb25zLCBfV0ZJbnN0YW5jZSkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHZhciBjb21wbGV0ZWQgPSBbXTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB1dGlsLnN5bmNMb29wKHByZUFjdGlvbnMubGVuZ3RoLCBmdW5jdGlvbihsb29wKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY291bnRlciA9IGxvb3AuaXRlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb24ocHJlQWN0aW9uc1tjb3VudGVyXSwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGFsbCBwcmUtcmVxdWlzaXRlcyBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlZC5wdXNoKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvb3AubmV4dCgpO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVkLnB1c2goZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvb3AuYnJlYWsoKTtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZWQuZXZlcnkoQm9vbGVhbikpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnUHJlLWFjdGlvbnMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCB7fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZQcmVSZXF1aXNpdGVFcnJvcicsICdOb3QgYWxsIHByZS1hY3Rpb25zIHBhc3NlZC4nKTtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogV29ya2Zsb3cgZ2V0IHN1Yi1wcm9jZXNzIGRhdGEuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIHRoZSBzdWJQcm9jZXNzIGNvbmZpZyBpZFxyXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxyXG4gKlxyXG4gKiBAZXhhbXBsZSBcIlwiXHJcbiAqXHJcbiAqIEByZXR1cm4gXCJcIlxyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0U3ViUHJvY2VzcyhpZCwgX1dGSW5zdGFuY2UpIHtcclxuICAgIGlmIChfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHN1YlByb2Nlc3MpIHtcclxuICAgICAgICAgICAgaWYgKHN1YlByb2Nlc3MuaWQgPT0gaWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdWJQcm9jZXNzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFByb2Nlc3Mgc3ViLXByb2Nlc3NcclxuICpcclxuICogQHBhcmFtIHtvYmplY3R9IHByb2Nlc3MgLSB0aGUgY3VycmVudCBwcm9jZXNzIGlkIGFuZCBzZXFcclxuICogQHBhcmFtIHtvYmplY3R9IHN1YlByb2Nlc3MgLSB0aGUgc3ViLXByb2Nlc3MgaWQgYW5kIHNlcVxyXG4gKiBAcGFyYW0ge29iamVjdH0gZGF0YSAtIHRoZSB1c2VyIGlucHV0IGRhdGFcclxuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcclxuICpcclxuICogQGV4YW1wbGUgJydcclxuICpcclxuICogQHJldHVybiAnJ1xyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gc3ViUHJvY2Vzcyhwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgZGF0YSwgX1dGSW5zdGFuY2UpIHtcclxuICAgIC8vIEdldCB0aGUgY3VycmVudCBwcm9jZXNzIHN1YlByb2Nlc3MgaW5zdGFuY2VcclxuICAgIC8vIHZhciBzdWJQcm9jZXNzU2VxID0gMTtcclxuICAgIHZhciBzdWJQcm9jZXNzID0gW107XHJcbiAgICB2YXIgcHJvY2Vzc0NvbmYgPSBbXTtcclxuICAgIHZhciBzdWJQcm9jZXNzQ29uZiA9IFtdO1xyXG4gICAgX1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmpQcm9jZXNzKSB7XHJcbiAgICAgICAgICAgIGlmIChvYmpQcm9jZXNzLmlkID09IHByb2Nlc3NJZCAmJiBvYmpQcm9jZXNzLnNlcSA9PSBwcm9jZXNzU2VxKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3BMZW5ndGggPSBvYmpQcm9jZXNzLnN1YlByb2Nlc3Nlcy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBvYmpQcm9jZXNzLnN1YlByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqU3ViUHJvY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmpTdWJQcm9jZXNzLmlkID09IHN1YlByb2Nlc3NJZCAmJiBvYmpTdWJQcm9jZXNzLnNlcSA9PSBzdWJQcm9jZXNzU2VxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1dWlkID0gb2JqU3ViUHJvY2Vzcy51dWlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHN1YlByb2Nlc3NJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3ViUHJvY2Vzc0l0ZW0uX2lkID09IHV1aWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzID0gc3ViUHJvY2Vzc0l0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy8gR2V0IHRoZSBjdXJyZW50IHN1YlByb2Nlc3MgY29uZmlndXJhdGlvblxyXG4gICAgX1dGSW5zdGFuY2UuY29uZmlnLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ocHJvY2Vzc0NvbmZpZykge1xyXG4gICAgICAgICAgICBpZiAocHJvY2Vzc0NvbmZpZy5faWQgPT0gcHJvY2Vzc0lkKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9jZXNzQ29uZiA9IHByb2Nlc3NDb25maWc7XHJcbiAgICAgICAgICAgICAgICBwcm9jZXNzQ29uZmlnLnN1YlByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24oc3ViUHJvY2Vzc0NvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdWJQcm9jZXNzQ29uZmlnLl9pZCA9PSBzdWJQcm9jZXNzSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc0NvbmYgPSBzdWJQcm9jZXNzQ29uZmlnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vIGlmIChzdWJQcm9jZXNzLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgIC8vIFx0c3ViUHJvY2Vzc1NlcSA9IHN1YlByb2Nlc3MubGVuZ3RoICsgMTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gVGhlIGRlZmF1bHQgc3ViUHJvY2VzcyBtb2RlbFxyXG5cclxuICAgIC8vVE9ETzogQ2hhbmdlIHJlcXVpcmVkIHRvIG1vdmUgaXNBY3RpdmUgdG8gc3ViUHJvY2VzcyBmaWxlLkhlcmVcclxuXHJcbiAgICB2YXIgZ3JvdXBLZXkgPSAnJztcclxuICAgIHZhciBiYXNlVVVJRCA9IGRhdGEuYmFzZVVVSUQ7XHJcbiAgICBpZiAoYmFzZVVVSUQgIT0gdW5kZWZpbmVkICYmIGJhc2VVVUlEICE9ICcnICYmIGJhc2VVVUlELmxlbmd0aCA+IDApIHtcclxuICAgICAgICB2YXIgcHJldmlvdXNPYmplY3QgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgYmFzZVVVSUQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcbiAgICAgICAgZ3JvdXBLZXkgPSBwcmV2aW91c09iamVjdC5ncm91cEtleTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZ3JvdXBLZXkgPSBnZW5lcmF0ZVVVSUQoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgdmFyIHN1YlByb2Nlc3NPYmplY3RJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGUgKyAnOicgKyBfV0ZJbnN0YW5jZS5hcHAgKyAnOicgKyBwcm9jZXNzSWQgKyAnOicgKyBwcm9jZXNzU2VxICsgJzonICsgc3ViUHJvY2Vzc0lkICsgJzonICsgc3ViUHJvY2Vzc1NlcTtcclxuICAgIHZhciBtb2RlbCA9IHtcclxuICAgICAgICBfaWQ6IHN1YlByb2Nlc3NPYmplY3RJZCxcclxuICAgICAgICBpZDogc3ViUHJvY2Vzc0lkLFxyXG4gICAgICAgIHR5cGU6ICd3b3JrZmxvd0luc3RhbmNlU3ViUHJvY2VzcycsXHJcbiAgICAgICAgc2VxOiBzdWJQcm9jZXNzU2VxLFxyXG4gICAgICAgIGluaXRpYXRlZDogZmFsc2UsXHJcbiAgICAgICAgZGF0ZXM6IHtcclxuICAgICAgICAgICAgY3JlYXRlZDogJycsXHJcbiAgICAgICAgICAgIHZhbGlkOiAnJyxcclxuICAgICAgICAgICAgZHVlOiAnJyxcclxuICAgICAgICAgICAgY2xvc2VkOiAnJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcGxldGU6IGZhbHNlLFxyXG4gICAgICAgIGluZGljYXRvcnM6IFtdLFxyXG4gICAgICAgIHN0ZXA6IHt9LFxyXG4gICAgICAgIGFjdGl2ZTogdHJ1ZSxcclxuICAgICAgICBncm91cEtleTogZ3JvdXBLZXksXHJcbiAgICAgICAgY2hhbm5lbHM6IFtcclxuICAgICAgICAgICAgXCJjb21tdW5pdHlfXCIgKyBhcHAuU0NPUEUuY29tbXVuaXR5SWQsXHJcbiAgICAgICAgICAgIFwicHJvZmlsZV9cIiArIGFwcC5TQ09QRS5wcm9maWxlSWQsXHJcbiAgICAgICAgICAgIFwiYXBwbGljYXRpb25fXCIgKyBhcHAuU0NPUEUuYXBwbGljYXRpb25JZCxcclxuICAgICAgICAgICAgXCJjb21tdW5pdHlfXCIgKyBhcHAuU0NPUEUuY29tbXVuaXR5SWQgKyBcIl9hcHBsaWNhdGlvbl9cIiArIGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkXHJcbiAgICAgICAgXVxyXG4gICAgfTtcclxuICAgIF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlcy5wdXNoKG1vZGVsKTtcclxuICAgIC8vIFJldHVybiBhIHByb21pc2VcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAvLyBDYXRjaCBhbGwgdW5jYXVnaHQgZXJyb3JzXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gMS4gUHJvY2VzcyB0aGUgcHJlLWFjdGlvbnNcclxuICAgICAgICAgICAgdmFyIHByZUFjdGlvbnNDb25mID0gcHJvY2Vzc0NvbmYucHJlQWN0aW9ucztcclxuICAgICAgICAgICAgcHJlQWN0aW9ucyhwcmVBY3Rpb25zQ29uZiwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAvLyAyLiBQcm9jZXNzIHRoZSBwcmUtcmVxdWlzaXRlc1xyXG4gICAgICAgICAgICAgICAgdmFyIHByZXJlcXVpc2l0ZUNvbmYgPSBwcm9jZXNzQ29uZi5wcmVyZXF1aXNpdGVzO1xyXG4gICAgICAgICAgICAgICAgcHJlUmVxdWlzaXRlcyhwcmVyZXF1aXNpdGVDb25mLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAzLiBJbml0aWF0ZSB0aGUgc3ViUHJvY2Vzc1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbml0aWF0ZUNvbmYgPSBzdWJQcm9jZXNzQ29uZi5pbml0aWF0ZTtcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWF0ZShpbml0aWF0ZUNvbmYsIHN1YlByb2Nlc3MsIGRhdGEpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vVXBkYXRlIHRoZSBzdWJQcm9jZXNzIG1vZGVsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLmluaXRpYXRlZCA9IHJlc3VsdC5kYXRhLmluaXRpYXRlZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuZGF0ZXMgPSByZXN1bHQuZGF0YS5kYXRlcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRXhlY3V0ZSB0aGUgZmlyc3Qgc3RlcFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RlcElkID0gc3ViUHJvY2Vzc0NvbmYuc3RlcHNbMF0uX2lkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHJhbnNpdGlvbklkID0gc3ViUHJvY2Vzc0NvbmYuc3RlcHNbMF0udHJhbnNpdGlvbnNbMF0uX2lkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RlcFNlcSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXAocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwgc3RlcFNlcSwgZGF0YSwgX1dGSW5zdGFuY2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5zdGVwID0gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBpbmRpY2F0b3Igc2VjdGlvbnMgb2YgdGhlIHN1YlByb2Nlc3NcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kaWNhdG9ycyhzdWJQcm9jZXNzQ29uZi5pbmRpY2F0b3JzLCBfV0ZJbnN0YW5jZSwgbW9kZWwuX2lkKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuaW5kaWNhdG9ycyA9IHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBFeGVjdXRlIHRoZSB0cmFuc2l0aW9ucywgaWYgYXV0b1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdGVwSWQsIHRyYW5zaXRpb25JZCwgZGF0YSwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIHN1YlByb2Nlc3Mgc3RlcCBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHJhbnNSZXN1bHQgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5zdGVwID0gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA0LiBQcm9jZXNzIHRoZSBwb3N0LWFjdGlvbnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwb3N0QWN0aW9uc0NvbmYgPSBwcm9jZXNzQ29uZi5wb3N0QWN0aW9ucztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc3RBY3Rpb25zKHBvc3RBY3Rpb25zQ29uZiwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3ModHJhbnNSZXN1bHQubWVzc2FnZSwgbW9kZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMgPSBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEob2JqLl9pZCA9PSBzdWJQcm9jZXNzT2JqZWN0SWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLnN1YnByb2Nlc3NlcyA9IF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhKG9iai5faWQgPT0gc3ViUHJvY2Vzc09iamVjdElkKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzID0gX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIShvYmouX2lkID09IHN1YlByb2Nlc3NPYmplY3RJZCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBQcm9jZXNzIGluaXRpYXRlXHJcbiAqXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBpbml0aWF0ZSAtIHRoZSBpbml0aWF0ZSBjb25maWcgZGF0YVxyXG4gKiBAcGFyYW0ge29iamVjdH0gZGF0YSAtIHRoZSB1c2VyIGlucHV0IGRhdGFcclxuICpcclxuICogQGV4YW1wbGUgJydcclxuICpcclxuICogQHJldHVybiAnJ1xyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gaW5pdGlhdGUoaW5pdGlhdGUsIHN1YlByb2Nlc3MsIGRhdGEpIHtcclxuICAgIHZhciBjb21wbGV0ZWQgPSBbXTtcclxuICAgIHZhciByZXN1bHQgPSB7XHJcbiAgICAgICAgaW5pdGlhdGVkOiBmYWxzZSxcclxuICAgICAgICBkYXRlczoge1xyXG4gICAgICAgICAgICBjcmVhdGVkOiAnJyxcclxuICAgICAgICAgICAgdmFsaWQ6ICcnLFxyXG4gICAgICAgICAgICBkdWU6ICcnLFxyXG4gICAgICAgICAgICBjbG9zZWQ6ICcnXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChpbml0aWF0ZS5fdHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAndXNlcic6XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIHN1YlByb2Nlc3MgaW5pdGlhdGlvbiBpcyB1c2VyIGRlZmluZWQgdGhlblxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5kYXRlcy5jcmVhdGVkID0gZGF0YS5jcmVhdGVkRGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5pdGlhdGUuZGF0ZXMudmFsaWQuX3R5cGUgPT0gJ3VzZXJTZWxlY3RlZCcgfHwgaW5pdGlhdGUuZGF0ZXMudmFsaWQuX3R5cGUgPT0gJ2F1dG9TZWxlY3RlZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEudmFsaWREYXRlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5kYXRlcy52YWxpZCA9IGRhdGEudmFsaWREYXRlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC53YXJuKCdXRkluaXRpYXRlRXJyb3InLCAnTm8gdmFsaWQgZGF0ZSBwYXNzZWQgaW4gLSB7ZGF0YS52YWxpZERhdGV9Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluaXRpYXRlLmRhdGVzLmR1ZS5fdHlwZSA9PSAndXNlclNlbGVjdGVkJyB8fCBpbml0aWF0ZS5kYXRlcy52YWxpZC5fdHlwZSA9PSAnYXV0b1NlbGVjdGVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5kdWVEYXRlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5kYXRlcy5kdWUgPSBkYXRhLmR1ZURhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlsLndhcm4oJ1dGSW5pdGlhdGVFcnJvcicsICdObyBkdWUgZGF0ZSBwYXNzZWQgaW4gLSB7ZGF0YS5kdWVEYXRlfScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5pbml0aWF0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdTdWItUHJvY2VzcyBpbml0aWF0ZSBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2F1dG8nOlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBzdWJQcm9jZXNzIGluaXRpYXRpb24gaXMgdXNlciBkZWZpbmVkIHRoZW5cclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQuZGF0ZXMuY3JlYXRlZCA9IGRhdGEuY3JlYXRlZERhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluaXRpYXRlLmRhdGVzLnZhbGlkLl90eXBlID09ICd1c2VyU2VsZWN0ZWQnIHx8IGluaXRpYXRlLmRhdGVzLnZhbGlkLl90eXBlID09ICdhdXRvU2VsZWN0ZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnZhbGlkRGF0ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZGF0ZXMudmFsaWQgPSBkYXRhLnZhbGlkRGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwud2FybignV0ZJbml0aWF0ZUVycm9yJywgJ05vIHZhbGlkIGRhdGUgcGFzc2VkIGluIC0ge2RhdGEudmFsaWREYXRlfScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbml0aWF0ZS5kYXRlcy5kdWUuX3R5cGUgPT0gJ3VzZXJTZWxlY3RlZCcgfHwgaW5pdGlhdGUuZGF0ZXMuZHVlLl90eXBlID09ICdhdXRvU2VsZWN0ZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmR1ZURhdGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmRhdGVzLmR1ZSA9IGRhdGEuZHVlRGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwud2FybignV0ZJbml0aWF0ZUVycm9yJywgJ05vIGR1ZSBkYXRlIHBhc3NlZCBpbiAtIHtkYXRhLmR1ZURhdGV9Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmluaXRpYXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1N1Yi1Qcm9jZXNzIGluaXRpYXRlIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywgcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRkluaXRpYXRlRXJyb3InLCAnSW5pdGlhdGUgdHlwZTogJyArIGluaXRpYXRlLl90eXBlICsgJyBub3QgZGVmaW5lZC4nKTtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdWJQcm9jZXNzLmNvbXBsZXRlID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpbml0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICghc3ViUHJvY2Vzcy5jb21wbGV0ZSkge1xyXG4gICAgICAgICAgICBpZiAoaW5pdGlhdGUucGFyYWxsZWxJbnN0YW5jZXMpIHtcclxuICAgICAgICAgICAgICAgIGluaXQoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGSW5pdGlhdGVFcnJvcicsICdTdWItcHJvY2VzczogJyArIHN1YlByb2Nlc3MuaWQgKyAnIHN0aWxsIGFjdGl2ZSBhbmQgcGFyYWxsZWwgaW5zdGFuY2VzIGFyZSBub3QgYWxsb3dlZC4nKTtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUHJvY2VzcyBzdGVwXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9jZXNzSWQgLSB0aGUgY3VycmVudCBwcm9jZXNzIGlkXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdWJQcm9jZXNzSWQgLSB0aGUgY3VycmVudCBzdWItcHJvY2VzcyBpZFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RlcElkIC0gdGhlIGN1cnJlbnQgc3ViLXByb2Nlc3Mgc3RlcCBpZFxyXG4gKiBAcGFyYW0ge251bWJlcn0gc3RlcFNlcSAtIHRoZSBjdXJyZW50IHN1Yi1wcm9jZXNzIHN0ZXAgaW5zdGFuY2UgY291bnRlciAvIHNlcXVlbmNlXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIC0gdGhlIHVzZXIgaW5wdXQgZGF0YVxyXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCBfV0ZJbnN0YW5jZSBjb25zdHJ1Y3RvciBpbnN0YW5jZVxyXG4gKlxyXG4gKiBAZXhhbXBsZSAnJ1xyXG4gKlxyXG4gKiBAcmV0dXJuICcnXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiBzdGVwKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdGVwSWQsIHN0ZXBTZXEsIGRhdGEsIF9XRkluc3RhbmNlKSB7XHJcblxyXG5cclxuICAgIC8vIERlZmF1bHQgc3RlcCBtb2RlbFxyXG4gICAgdmFyIG1vZGVsID0ge1xyXG4gICAgICAgIGlkOiAnJyxcclxuICAgICAgICBzZXE6ICcnLFxyXG4gICAgICAgIHN0YXR1czogJycsXHJcbiAgICAgICAgbWVzc2FnZTogJycsXHJcbiAgICAgICAgYXNzaWduZWRUbzoge1xyXG4gICAgICAgICAgICB1c2VySWQ6ICcnLFxyXG4gICAgICAgICAgICBuYW1lOiAnJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXNzaWdubWVudDoge30sXHJcbiAgICAgICAgY29tbWVudDogJydcclxuICAgIH07XHJcbiAgICB2YXIgc3ViUHJvY2VzcyA9IHt9O1xyXG4gICAgdmFyIHV1aWQgPSAnJztcclxuICAgIHZhciBpbnN0U3ViUHJvY2VzcztcclxuICAgIHZhciBzdGVwID0ge307XHJcbiAgICB2YXIgdHJhbnNpdGlvbklkID0gJyc7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy9HZXQgdGhlIGN1cnJlbnQgc3ViUHJvY2VzcyBpbnN0YW5jZSBkYXRhXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIF9XRkluc3RhbmNlLmluc3RhbmNlLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqUHJvY2Vzcykge1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAob2JqUHJvY2Vzcy5pZCA9PSBwcm9jZXNzSWQgJiYgb2JqUHJvY2Vzcy5zZXEgPT0gcHJvY2Vzc1NlcSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9ialByb2Nlc3Muc3ViUHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmpTdWJQcm9jZXNzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqU3ViUHJvY2Vzcy5pZCA9PSBzdWJQcm9jZXNzSWQgJiYgb2JqU3ViUHJvY2Vzcy5zZXEgPT0gc3ViUHJvY2Vzc1NlcSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXVpZCA9IG9ialN1YlByb2Nlc3MudXVpZDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHN1YlByb2Nlc3NJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3ViUHJvY2Vzc0l0ZW0uX2lkID09IHV1aWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnN0U3ViUHJvY2VzcyA9IHN1YlByb2Nlc3NJdGVtO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBfV0ZJbnN0YW5jZS5jb25maWcucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmpQcm9jZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqUHJvY2Vzcy5faWQgPT0gcHJvY2Vzc0lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqUHJvY2Vzcy5zdWJQcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKG9ialN1YlByb2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9ialN1YlByb2Nlc3MuX2lkID09IHN1YlByb2Nlc3NJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2VzcyA9IG9ialN1YlByb2Nlc3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmpTdWJQcm9jZXNzLnN0ZXBzLmZpbHRlcihmdW5jdGlvbihvYmpTdGVwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9ialN0ZXAuX2lkID09IHN0ZXBJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwID0gb2JqU3RlcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgc3ViLXByb2Nlc3Mgc3RlcCBkYXRhXHJcbiAgICAgICAgICAgIG1vZGVsLmlkID0gc3RlcElkO1xyXG4gICAgICAgICAgICBtb2RlbC5zZXEgPSBzdGVwU2VxO1xyXG4gICAgICAgICAgICBtb2RlbC5zdGF0dXMgPSBzdGVwLl9zZXRJbnN0YW5jZVN0YXR1c1RvO1xyXG4gICAgICAgICAgICBtb2RlbC5tZXNzYWdlID0gc3RlcC5fc2V0U3RhdHVzTXNnVG87XHJcbiAgICAgICAgICAgIC8vbW9kZWwuYXNzaWduZWRUby51c2VySWQgPSBkYXRhLnVzZXJJZCAhPT0gdW5kZWZpbmVkID8gZGF0YS51c2VySWQgOiAnJztcclxuICAgICAgICAgICAgLy9tb2RlbC5hc3NpZ25lZFRvLm5hbWUgPSBkYXRhLm5hbWUgIT09IHVuZGVmaW5lZCA/IGRhdGEubmFtZSA6ICcnO1xyXG4gICAgICAgICAgICBtb2RlbC5jb21tZW50ID0gZGF0YS5jb21tZW50ICE9PSB1bmRlZmluZWQgPyBkYXRhLmNvbW1lbnQgOiAnJztcclxuICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBpbmRpY2F0b3IgZG9jdW1lbnRzIHByb2Nlc3Mgc3RlcCBkYXRhXHJcbiAgICAgICAgICAgIC8vY29tc28ubG9nKCdpbnN0U3ViUHJvY2Vzcz09PScpO1xyXG4gICAgICAgICAgICAvL2NvbXNvLmxvZyhpbnN0U3ViUHJvY2Vzcyk7XHJcbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JzID0gaW5zdFN1YlByb2Nlc3MgIT09IHVuZGVmaW5lZCA/IGluc3RTdWJQcm9jZXNzLmluZGljYXRvcnMgOiBbXTtcclxuICAgICAgICAgICAgaW5kaWNhdG9yRG9jcyhwcm9jZXNzSWQsIGluZGljYXRvcnMsIG1vZGVsLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIC8vIElmIGFjdGlvbnMgYXJlIHNwZWNpZmllZCwgZXhlY3V0ZSB0aGVtXHJcbiAgICAgICAgICAgICAgICB2YXIgY3JlYXRlZElEID0gX1dGSW5zdGFuY2UucHJvZmlsZSArICc6JyArIF9XRkluc3RhbmNlLmFwcCArICc6JyArIHByb2Nlc3NJZCArICc6JyArIHByb2Nlc3NTZXEgKyAnOicgKyBzdWJQcm9jZXNzSWQgKyAnOicgKyBzdWJQcm9jZXNzU2VxO1xyXG4gICAgICAgICAgICAgICAgdXVpZCA9IGNyZWF0ZWRJRDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc3RlcC5hY3Rpb25zWzBdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb25zKHN0ZXAuYWN0aW9ucywgcHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN1YlByb2Nlc3MsIG1vZGVsLCBfV0ZJbnN0YW5jZSwgZGF0YSwgdXVpZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBFeGVjdXRlIHRoZSB0cmFuc2l0aW9ucywgaWYgYXV0b1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdBY3Rpb25zIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywgbW9kZWwpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEVsc2UgdGFza3MgYXJlIHNwcmVjaWZpZWQsIGV4ZWN1dGUgdGhlbVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdGVwLnRhc2sgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIE1ha2UgYXNzaWdubWVudHNcclxuICAgICAgICAgICAgICAgICAgICB0YXNrKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3RlcC50YXNrLCBjcmVhdGVkSUQsIG1vZGVsKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBkbyB0YXNrIHN1Y2Nlc3MgaGFuZGxpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1Rhc2sgY29tcGxldGUuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdUYXNrIGF3YWl0aW5nIHVzZXIgYWN0aW9uLicsIG1vZGVsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUHJvY2VzcyBpbmRpY2F0b3IgdXBkYXRlc1xyXG4gKlxyXG4gKiBAcGFyYW0ge29iamVjdH0gYWN0aW9ucyAtIHRoZSBhY3Rpb25zIGNvbmZpZyBkYXRhXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBzdWJQcm9jZXNzIC0gdGhlIGN1cnJlbnQgc3ViLXByb2Nlc3MgZm9ybSBjb25maWcgZGF0YVxyXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxyXG4gKlxyXG4gKiBAZXhhbXBsZSAnJ1xyXG4gKlxyXG4gKiBAcmV0dXJuICcnXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiBpbmRpY2F0b3JzKGluZGljYXRvcnMsIF9XRkluc3RhbmNlLCBzcHV1aWQpIHtcclxuICAgIHZhciBtb2RlbCA9IFtdO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgaW5kaWNhdG9yIHNlY3Rpb25zIG9mIHRoZSBzdWJQcm9jZXNzXHJcblxyXG4gICAgICAgICAgICB2YXIgYXJyYXkgPSBKU09OLnhwYXRoKFwiaW5kaWNhdG9yc1tmbjpjb3VudCguL3dvcmtmbG93cy9wcm9jZXNzZXNbc3ViUHJvY2Vzc1VVSUQgZXEgJ1wiICsgc3B1dWlkICsgXCInXSkgZ3QgMF1cIiwgX1dGSW5zdGFuY2UsIHt9KTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBhcnJheS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZGljYXRvciA9IGFycmF5W2pdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZGljYXRvck1vZGVsID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZXM6IFtdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5zdGFuY2VNb2RlbCA9IHtcclxuICAgICAgICAgICAgICAgICAgICB1dWlkOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJycsXHJcbiAgICAgICAgICAgICAgICAgICAga2V5OiAnJyxcclxuICAgICAgICAgICAgICAgICAgICBzZXE6IDFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGluZGljYXRvck1vZGVsLmlkID0gaW5kaWNhdG9yLmNhdGVnb3J5LnRlcm07XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZU1vZGVsLnV1aWQgPSBpbmRpY2F0b3IuX2lkO1xyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2VNb2RlbC50aXRsZSA9IGluZGljYXRvci50aXRsZTtcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlTW9kZWwua2V5ID0gJyc7XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZU1vZGVsLnNlcSA9IGluZGljYXRvci5tb2RlbC5wZW5kaW5nLnNlcTsgLy8gaW5kaWNhdG9yIHNlcSBudW1iZXIgaGVyZSB3aGljaCBpcyBnZXR0aW5nIHVwZGF0ZWQuXHJcbiAgICAgICAgICAgICAgICBpbmRpY2F0b3JNb2RlbC5pbnN0YW5jZXMucHVzaChpbnN0YW5jZU1vZGVsKTtcclxuICAgICAgICAgICAgICAgIG1vZGVsLnB1c2goaW5kaWNhdG9yTW9kZWwpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1Byb2Nlc3MgaW5kaWNhdG9yIG1vZGVsIHVwZGF0ZWQuJywgbW9kZWwpO1xyXG4gICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFByb2Nlc3MgYXNzaWduIHVzZXJcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHByb2Nlc3MgaWRcclxuICogQHBhcmFtIHtudW1iZXJ9IHByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2UgcHJvY2VzcyBzZXFcclxuICogQHBhcmFtIHtzdHJpbmd9IHN1YlByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN1Yi1wcm9jZXNzIGlkXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdWJQcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHN1Yi1wcm9jZXNzIHNlcVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RlcElkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3RlcCBpZFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdHJhbnNpdGlvbklkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gdHJhbnNpdGlvbiBpZFxyXG4gKiBAcGFyYW0ge29iamVjdH0gdXNlciAtIHRoZSB1c2VyIHRvIGFzc2lnbiB0b1xyXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxyXG4gKlxyXG4gKiBAZXhhbXBsZSAnJ1xyXG4gKlxyXG4gKiBAcmV0dXJuICcnXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiBhc3NpZ25Vc2VyKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCB1c2VyLCBfV0ZJbnN0YW5jZSkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHZhciB1dWlkID0gJyc7XHJcbiAgICAgICAgICAgIC8vIEdldCB0aGUgY3VycmVudCBzdWJQcm9jZXNzIGluc3RhbmNlIGRhdGFcclxuICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmpQcm9jZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqUHJvY2Vzcy5pZCA9PSBwcm9jZXNzSWQgJiYgb2JqUHJvY2Vzcy5zZXEgPT0gcHJvY2Vzc1NlcSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9ialByb2Nlc3Muc3ViUHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmpTdWJQcm9jZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmpTdWJQcm9jZXNzLmlkID09IHN1YlByb2Nlc3NJZCAmJiBvYmpTdWJQcm9jZXNzLnNlcSA9PSBzdWJQcm9jZXNzU2VxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dWlkID0gb2JqU3ViUHJvY2Vzcy51dWlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihzdWJQcm9jZXNzSXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN1YlByb2Nlc3NJdGVtLl9pZCA9PSB1dWlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0IHRoZSB1c2VyIGRldGFpbHNcclxuICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzSXRlbS5zdGVwLmFzc2lnbmVkVG8udXNlcklkID0gdXNlci5pZDtcclxuICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzSXRlbS5zdGVwLmFzc2lnbmVkVG8ubmFtZSA9IHVzZXIubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGluZGljYXRvcnMgdXNlciBkZXRhaWxzXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvcnMgPSBzdWJQcm9jZXNzSXRlbS5pbmRpY2F0b3JzO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5kaWNhdG9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yID0gaW5kaWNhdG9yc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBpbmRpY2F0b3IuaW5zdGFuY2VzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSBpbmRpY2F0b3IuaW5zdGFuY2VzW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRvYyA9IF9XRkluc3RhbmNlLmluZGljYXRvcnNba107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlLnV1aWQgPT0gZG9jLl9pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2Mud29ya2Zsb3dzLmZpbHRlcihmdW5jdGlvbih3b3JrZmxvdykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdvcmtmbG93LmlkID09IF9XRkluc3RhbmNlLmNvbmZpZy5faWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3b3JrZmxvdy5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHByb2Nlc3NJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzSXRlbS5pZCA9PSBwcm9jZXNzSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgdXNlciBpZCBhbmQgbmFtZSBpbiB0aGUgZG9jdW1lbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NJdGVtLnN0ZXAuYXNzaWduZWRUby51c2VySWQgPSB1c2VyLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0l0ZW0uc3RlcC5hc3NpZ25lZFRvLm5hbWUgPSB1c2VyLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnVXNlciBhc3NpZ25lZCBzdWNjZXNzZnVsbHkuIFVzZXJJZDogXCInICsgdXNlci5pZCArICdcIiwgTmFtZTogXCInICsgdXNlci5uYW1lICsgJ1wiJywgc3ViUHJvY2Vzc0l0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG4vKipcclxuICogUHJvY2VzcyBpbmRpY2F0b3IgZG9jdW1lbnQgdXBkYXRlc1xyXG4gKlxyXG4gKiBAcGFyYW0ge29iamVjdH0gYWN0aW9ucyAtIHRoZSBhY3Rpb25zIGNvbmZpZyBkYXRhXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBzdWJQcm9jZXNzIC0gdGhlIGN1cnJlbnQgc3ViLXByb2Nlc3MgZm9ybSBjb25maWcgZGF0YVxyXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxyXG4gKlxyXG4gKiBAZXhhbXBsZSAnJ1xyXG4gKlxyXG4gKiBAcmV0dXJuICcnXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiBpbmRpY2F0b3JEb2NzKHByb2Nlc3NJZCwgaW5kaWNhdG9ycywgc3RlcCwgX1dGSW5zdGFuY2UpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGluZGljYXRvciBzZWN0aW9ucyBvZiB0aGUgc3ViUHJvY2Vzc1xyXG4gICAgICAgICAgICBpZiAoaW5kaWNhdG9ycyA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGSW5kaWNhdG9yc1VwZGF0ZScsICdJbmRpY2F0b3JzIHBhcmFtZXRlciBpcyByZXF1aXJlZC4gLSBWYWx1ZTogJyArIGluZGljYXRvcnMpXHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5kaWNhdG9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29tc28ubG9nKCctLT4+Pj4+PiBGaXJzdCBJZiBjb25zaXRpb24nKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yID0gaW5kaWNhdG9yc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGluZGljYXRvci5pbnN0YW5jZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb21zby5sb2coJy0tPj4+Pj4+IFNlY29uZCBJZiBjb25zaXRpb24nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gaW5kaWNhdG9yLmluc3RhbmNlc1tqXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbXNvLmxvZygnLS0+Pj4+Pj4gVGhpcmQgSWYgY29uc2l0aW9uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZG9jID0gX1dGSW5zdGFuY2UuaW5kaWNhdG9yc1trXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZS51dWlkID09IGRvYy5faWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbXNvLmxvZygnLS0+Pj4+Pj4gRm91cnRoIElmIGNvbnNpdGlvbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvYy53b3JrZmxvd3MuZmlsdGVyKGZ1bmN0aW9uKHdvcmtmbG93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3b3JrZmxvdy5pZCA9PSBfV0ZJbnN0YW5jZS5jb25maWcuX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbXNvLmxvZygnLS0+Pj4+Pj4gRmlmdGggSWYgY29uc2l0aW9uJyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3b3JrZmxvdy5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHByb2Nlc3NJdGVtKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzSXRlbS5pZCA9PSBwcm9jZXNzSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0l0ZW0uc3RlcC5pZCA9IHN0ZXAuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NJdGVtLnN0ZXAuc2VxID0gc3RlcC5zZXE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NJdGVtLnN0ZXAuc3RhdHVzID0gc3RlcC5zdGF0dXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NJdGVtLnN0ZXAubWVzc2FnZSA9IHN0ZXAubWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0l0ZW0uc3RlcC5hc3NpZ25lZFRvLnVzZXJJZCA9IHN0ZXAuYXNzaWduZWRUby51c2VySWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NJdGVtLnN0ZXAuYXNzaWduZWRUby5uYW1lID0gc3RlcC5hc3NpZ25lZFRvLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NJdGVtLnN0ZXAuY29tbWVudCA9IHN0ZXAuY29tbWVudCAhPT0gdW5kZWZpbmVkID8gc3RlcC5jb21tZW50IDogJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnSW5kaWNhdG9yIGRvY3VtZW50cyB3b3JrZmxvdyBwcm9jZXNzIG1vZGVsIHVwZGF0ZWQuJywgX1dGSW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgLy9jb21zby5sb2coJ2luZGljYXRvckRvY3MgZnVuY3Rpb24gRU5EUy0tLS0tLS0tLS0tLS0tJyk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn07XHJcblxyXG4vKipcclxuICogUHJvY2VzcyBhY3Rpb25zXHJcbiAqXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBhY3Rpb25zIC0gdGhlIGFjdGlvbnMgY29uZmlnIGRhdGFcclxuICogQHBhcmFtIHtvYmplY3R9IHN1YlByb2Nlc3MgLSB0aGUgY3VycmVudCBzdWItcHJvY2VzcyBmb3JtIGNvbmZpZyBkYXRhXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXHJcbiAqXHJcbiAqIEBleGFtcGxlICcnXHJcbiAqXHJcbiAqIEByZXR1cm4gJydcclxuICpcclxuICovXHJcbmZ1bmN0aW9uIGFjdGlvbnMoYWN0aW9ucywgcHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN1YlByb2Nlc3MsIHN0ZXAsIF9XRkluc3RhbmNlLCBkYXRhLCB1dWlkKSB7XHJcbiAgICB2YXIgYXJyQWN0aW9ucyA9IFtdO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHV0aWwuc3luY0xvb3AoYWN0aW9ucy5sZW5ndGgsIGZ1bmN0aW9uKGxvb3ApIHtcclxuICAgICAgICAgICAgdmFyIGNvdW50ZXIgPSBsb29wLml0ZXJhdGlvbigpO1xyXG4gICAgICAgICAgICBhY3Rpb24oYWN0aW9uc1tjb3VudGVyXSwgcHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN1YlByb2Nlc3MsIHN0ZXAsIF9XRkluc3RhbmNlLCBkYXRhLCB1dWlkKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJldEFjdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGFjdGlvbnNbY291bnRlcl0uX2lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXE6IGNvdW50ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHJlc3VsdFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyQWN0aW9ucy5wdXNoKHJldEFjdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9vcC5uZXh0KCk7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBsb29wLmJyZWFrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gT24gY29tcGxldGlvbiBvZiB0aGUgbG9vcFxyXG5cclxuICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0FjdGlvbnMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCBhcnJBY3Rpb25zKTtcclxuXHJcbiAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBQcm9jZXNzIGFjdGlvblxyXG4gKlxyXG4gKiBAcGFyYW0ge29iamVjdH0gYWN0aW9uIC0gdGhlIGFjdGlvbiBjb25maWcgZGF0YVxyXG4gKiBAcGFyYW0ge29iamVjdH0gc3ViUHJvY2VzcyAtIHRoZSBjdXJyZW50IHN1Yi1wcm9jZXNzIGZvcm0gY29uZmlnIGRhdGFcclxuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcclxuICpcclxuICogQGV4YW1wbGUgJydcclxuICpcclxuICogQHJldHVybiAnJ1xyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gYWN0aW9uKGFjdGlvbiwgcHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN1YlByb2Nlc3MsIHN0ZXAsIF9XRkluc3RhbmNlLCBkYXRhLCB1dWlkKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24ubWV0aG9kICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB2YXIgbWV0aG9kUG9zc2libGVJdGVtcyA9IFtcImZvcm1cIiwgXCJpbmRpY2F0b3JcIiwgXCJwcm9maWxlXCIsIFwic3ViUHJvY2Vzc0luc3RhbmNlXCIsIFwic3RlcFwiLCBcImNvbW11bml0eVwiLCBcImFwcGxpY2F0aW9uXCIsIFwidXNlclwiLCBcInNkb1wiXTtcclxuICAgICAgICAgICAgc3dpdGNoIChwcm9wZXJ0eUV4aXN0cyhhY3Rpb24ubWV0aG9kLCBtZXRob2RQb3NzaWJsZUl0ZW1zKSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnZm9ybSc6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdpbmRpY2F0b3InOlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAncHJvZmlsZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdzdWJQcm9jZXNzSW5zdGFuY2UnOlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnc3RlcCc6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdjb21tdW5pdHknOlxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb21tdW5pdHlQb3NzaWJsZUl0ZW1zID0gW1wiY3JlYXRlQ29tbXVuaXR5XCIsIFwicmVsZWFzZUFkb3B0ZWRBcHBsaWNhdGlvblwiLCBcInVzZXJKb2luQ29tbXVuaXR5XCJdO1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocHJvcGVydHlFeGlzdHMoYWN0aW9uLm1ldGhvZC5jb21tdW5pdHksIGNvbW11bml0eVBvc3NpYmxlSXRlbXMpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjcmVhdGVDb21tdW5pdHknOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUuY29tbXVuaXR5LmNyZWF0ZUNvbW11bml0eShhY3Rpb24ubWV0aG9kLmNvbW11bml0eS5jcmVhdGVDb21tdW5pdHksIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlbGVhc2VBZG9wdGVkQXBwbGljYXRpb24nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUuY29tbXVuaXR5LnJlbGVhc2VBZG9wdGVkQXBwbGljYXRpb24oYWN0aW9uLm1ldGhvZC5jb21tdW5pdHkucmVsZWFzZUFkb3B0ZWRBcHBsaWNhdGlvbiwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAndXNlckpvaW5Db21tdW5pdHknOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUuY29tbXVuaXR5LnVzZXJKb2luQ29tbXVuaXR5KGFjdGlvbi5tZXRob2QuY29tbXVuaXR5LnVzZXJKb2luQ29tbXVuaXR5LCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdhcHBsaWNhdGlvbic6XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFwcGxpY2F0aW9uUG9zc2libGVJdGVtcyA9IFtcImNyZWF0ZUFwcERlZmluaXRpb25cIiwgXCJidWlsZEFwcGxpY2F0aW9uXCIsIFwiYXBwbGljYXRpb25BZG9wdGlvblwiXTtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5RXhpc3RzKGFjdGlvbi5tZXRob2QuYXBwbGljYXRpb24sIGFwcGxpY2F0aW9uUG9zc2libGVJdGVtcykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NyZWF0ZUFwcERlZmluaXRpb24nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUuYXBwbGljYXRpb24uY3JlYXRlQXBwRGVmaW5pdGlvbihhY3Rpb24ubWV0aG9kLmFwcGxpY2F0aW9uLmNyZWF0ZUFwcERlZmluaXRpb24sIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2J1aWxkQXBwbGljYXRpb24nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUuYXBwbGljYXRpb24uYnVpbGRBcHBsaWNhdGlvbihhY3Rpb24ubWV0aG9kLmFwcGxpY2F0aW9uLmJ1aWxkQXBwbGljYXRpb24sIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2FwcGxpY2F0aW9uQWRvcHRpb24nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUuYXBwbGljYXRpb24uYXBwbGljYXRpb25BZG9wdGlvbihhY3Rpb24ubWV0aG9kLmFwcGxpY2F0aW9uLmFwcGxpY2F0aW9uQWRvcHRpb24sIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJObyBtZXRob2QgZm91bmQgZnJvbSBpbXBsZW1lbnRlZCBsaXN0LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICd1c2VyJzpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3Nkbyc6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChcIk5vIG1ldGhvZCBmb3VuZCBmcm9tIGltcGxlbWVudGVkIGxpc3QuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBhcmdzID0gW107XHJcbiAgICAgICAgICAgIHZhciBjb250ZXh0ID0gJ2dsb2JhbCc7XHJcbiAgICAgICAgICAgIHZhciBtZXRob2QgPSAnJztcclxuICAgICAgICAgICAgaWYgKGFjdGlvbi5faWQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dCA9IGFjdGlvbi5faWQuc3BsaXQoXCIuXCIpWzBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChhY3Rpb24uX2lkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZCA9IGFjdGlvbi5faWQuc3BsaXQoXCIuXCIpWzFdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFyZ3MubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhY3Rpb24uX2FyZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBhcmcgPSBhY3Rpb24uX2FyZ3NbaV07XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGFyZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3Byb2Nlc3NJZCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChwcm9jZXNzSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdwcm9jZXNzU2VxJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHByb2Nlc3NTZXEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdzdWJQcm9jZXNzSWQnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goc3ViUHJvY2Vzc0lkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3ViUHJvY2Vzc1NlcSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChzdWJQcm9jZXNzU2VxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3ViUHJvY2Vzcyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChzdWJQcm9jZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3RlcCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChzdGVwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYWN0aW9uJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGFjdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIHJlcXVpcmVkIHBhcmFtZXRlcnMgdG8gdGhlIGFyZ3MgYXJyYXlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFyZ3MucHVzaChfV0ZJbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmNyZWF0ZVR5cGUpO1xyXG4gICAgICAgICAgICBhcmdzLnB1c2godXVpZCk7XHJcbiAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmJhc2VVVUlEKTtcclxuICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGlmIChhY3Rpb24uX2lkID09ICdmb3JtLmNyZWF0ZScpIHtcclxuICAgICAgICAgICAgICAgIGZvcm0uY3JlYXRlKGFyZ3MpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24uX2lkID09ICdmb3JtLmF1dGhvcmlzZScpIHtcclxuICAgICAgICAgICAgICAgIGZvcm0uYXV0aG9yaXNlKGFyZ3MpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbi5faWQgPT0gJ2Zvcm0uY2xvc2UnKSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtLmNsb3NlKGFyZ3MpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbi5faWQgPT0gJ2Zvcm0uc2V0RHJhZnQnKSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtLnNldERyYWZ0KGFyZ3MpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbi5faWQgPT0gJ2Zvcm0uc2V0VW5EcmFmdCcpIHtcclxuICAgICAgICAgICAgICAgIGZvcm0uc2V0VW5EcmFmdChhcmdzKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24uX2lkID09ICdmb3JtLmNyZWF0ZVByb2ZpbGUnKSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtLmNyZWF0ZVByb2ZpbGUoYXJncykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uLl9pZCA9PSAnZm9ybS5zZXRJbnN0YW5jZVRpdGxlJykge1xyXG4gICAgICAgICAgICAgICAgZm9ybS5zZXRJbnN0YW5jZVRpdGxlKGFyZ3MpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbi5faWQgPT0gJ3Byb2ZpbGUuZGVsZXRlJykge1xyXG4gICAgICAgICAgICAgICAgZm9ybS5kZWxldGVQcm9maWxlKGFyZ3MpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZBY3Rpb25FcnJvcicsICdNZXRob2Q6ICcgKyBhY3Rpb25faWQgKyAnIG5vdCBkZWZpbmVkLicpO1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBpZiAoY29udGV4dCA9PSAnZm9ybScpIHtcclxuICAgICAgICAgICAgLy8gXHRmb3JtW21ldGhvZF0oYXJncykudGhlbihmdW5jdGlvbihyZXN1bHQpe1xyXG4gICAgICAgICAgICAvLyBcdFx0cmVzb2x2ZShyZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgICAgIC8vIFx0fSwgZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgICAgLy8gXHRcdHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAvLyBcdH0pO1xyXG4gICAgICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBcdHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGQWN0aW9uRXJyb3InLCAnTW9kdWxlOiAnICsgY29udGV4dCArICcgbm90IGRlZmluZWQuJyk7XHJcbiAgICAgICAgICAgIC8vIFx0cmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBQcm9jZXNzIHRhc2tzXHJcbiAqXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSB0YXNrIC0gdGhlIHRhc2sgY29uZmlnIGRhdGFcclxuICogQHBhcmFtIHtvYmplY3R9IGlucHV0RGF0YSAtIHRoZSB1c2VyIGlucHV0IGRhdGFcclxuICpcclxuICogQGV4YW1wbGUgJydcclxuICpcclxuICogQHJldHVybiAnJ1xyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gdGFzayhzdWJwcm9jZXNzSUQsIHN1YnByb2Nlc3NTRVEsIHRhc2ssIHNwdXVpZCwgbW9kZWwpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgdmFyIGxpc3QgPSBbXTtcclxuICAgICAgICBpZiAodGFzay5hc3NpZ24ucHJvZmlsZVJvbGUgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHZhciBhc3NpZ25UeXBlID0gJ3Byb2ZpbGVSb2xlJztcclxuICAgICAgICAgICAgdmFyIHByb2ZpbGVJZCA9IGFwcC5TQ09QRS53b3JrZmxvdy5wcm9maWxlO1xyXG4gICAgICAgICAgICB2YXIgaWQgPSAnJztcclxuICAgICAgICAgICAgaWYgKHRhc2suYXNzaWduLnByb2ZpbGVSb2xlLnByb2ZpbGUgPT0gJ2N1cnJlbnQnKSB7XHJcbiAgICAgICAgICAgICAgICBpZCA9IGFwcC5TQ09QRS53b3JrZmxvdy5wcm9maWxlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhc2suYXNzaWduLnByb2ZpbGVSb2xlLnByb2ZpbGUgPT0gJ2NvbW11bml0eScpIHtcclxuICAgICAgICAgICAgICAgIGlkID0gYXBwLlNDT1BFLmNvbW11bml0eUlkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciByb2xlID0gdGFzay5hc3NpZ24ucHJvZmlsZVJvbGUucm9sZTtcclxuXHJcbiAgICAgICAgICAgIGxpYnJhcnkuZ2V0VXNlcnNMaXN0QnlSb2xlKGlkLCByb2xlKS50aGVuKGZ1bmN0aW9uKGxpc3QpIHtcclxuICAgICAgICAgICAgICAgIGlmIChsaXN0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsaXN0Lmxlbmd0aCA+IDEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFzc2lnbiB0byB1c2VycyBzZW5kIG5vdGlmaWNhdGlvbnNcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIHByT2JqZWN0ID0gSlNPTi54cGF0aChcIi9pbnN0YW5jZS9wcm9jZXNzZXNbc3ViUHJvY2Vzc2VzL3V1aWQgZXEgJ1wiKyBzcHV1aWQgK1wiJ11cIixhcHAuU0NPUEUud29ya2Zsb3cse30pWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3BPYmplY3QgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXVwiLCBhcHAuU0NPUEUud29ya2Zsb3csIHt9KVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNoYW5uZWxzID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHNwdXVpZCArIFwiJ10vY2hhbm5lbHNcIiwgYXBwLlNDT1BFLndvcmtmbG93LCB7fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaW5hbE1zZyA9IHByb2Nlc3NXb3JrZmxvd01lc3NhZ2UoTk9USUZJQ0FUSU9OX1VTRVJfTVNHX0FDQ0VQVCwgc3B1dWlkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm9jZXNzSWQgPSBzcE9iamVjdC5pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb2Nlc3NTZXEgPSBzcE9iamVjdC5zZXE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIHN1YnByb2Nlc3NJRCA9IHByT2JqZWN0LmlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciBzdWJwcm9jZXNzU0VRID0gcHJPYmplY3Quc2VxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VicHJvY2Vzc1VVSUQgPSBzcHV1aWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm9jZXNzX1ZhbGlkRGF0ZSA9IHNwT2JqZWN0LmRhdGVzLnZhbGlkO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbmZpZ1Byb2Nlc3MgPSBKU09OLnhwYXRoKFwiL2NvbmZpZy9wcm9jZXNzZXNbX2lkIGVxICdcIiArIHN1YnByb2Nlc3NJRCArIFwiJ11cIiwgYXBwLlNDT1BFLndvcmtmbG93LCB7fSlbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb25maWdTdWJQcm9jZXNzID0gSlNPTi54cGF0aChcIi9zdWJQcm9jZXNzZXNbX2lkIGVxICdcIiArIHByb2Nlc3NJZCArIFwiJ11cIiwgY29uZmlnUHJvY2Vzcywge30pWzBdO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGVwU2VxID0gc3BPYmplY3Quc3RlcC5zZXEgKyAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvY2Vzc19DdXJyZW50U3RlcE5hbWUgPSBKU09OLnhwYXRoKFwiL3N0ZXBzW19zZXEgZXEgJ1wiICsgc3RlcFNlcSArIFwiJ10vbmFtZS9pMThuWzFdL3ZhbHVlXCIsIGNvbmZpZ1N1YlByb2Nlc3MsIHt9KVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb2Nlc3NOYW1lID0gY29uZmlnU3ViUHJvY2Vzcy5uYW1lLmkxOG5bMF0udmFsdWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbm90ZmljYXRpb25SZXF1ZXN0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzb3VyY2VcIjogXCJyZW1vdGVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIm5vdGlmaWNhdGlvblJlcXVlc3RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiX2lkXCI6IHNwdXVpZCArIFwiOm5vdGlmaWNhdGlvblJlcXVlc3RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hhbm5lbHNcIjogY2hhbm5lbHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbW11bml0eUlkXCI6IGFwcC5TQ09QRS5jb21tdW5pdHlJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXBwbGljYXRpb25JZFwiOiBhcHAuU0NPUEUuYXBwbGljYXRpb25JZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBmaW5hbE1zZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVR5cGVcIjogXCJpbmZvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZWREYXRlVGltZVwiOiBtb21lbnQoKS5mb3JtYXQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VuZGVyVXNlcklkXCI6IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3Rpb25zXCI6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBcIlZpZXdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZ1bmN0aW9uXCI6IFwiYXBwLm9wZW5TdWJwcm9jZXNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJhbXNcIjogW3Byb2ZpbGVJZCwgcHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBwcm9jZXNzTmFtZSwgc3VicHJvY2Vzc0lELCBzdWJwcm9jZXNzU0VRLCBzdWJwcm9jZXNzVVVJRCwgcHJvY2Vzc19WYWxpZERhdGUsIHByb2Nlc3NfQ3VycmVudFN0ZXBOYW1lXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJlY2VpdmVyXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInJvbGVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IHJvbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZmlsZUlkXCI6IGlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGFvLnVwc2VydChub3RmaWNhdGlvblJlcXVlc3QpLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmZhaWwoZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIHNwT2JqZWN0ID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIisgc3B1dWlkICtcIiddXCIsYXBwLlNDT1BFLndvcmtmbG93LCB7fSlbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhc3NpZ25tZW50ID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YXNrLmFzc2lnbi5hc3NpZ25tZW50ICE9IHVuZGVmaW5lZCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhc3NpZ25tZW50ID0gbW9kZWwuYXNzaWdubWVudDsgLy9KU09OLnhwYXRoKFwiL3N0ZXAvYXNzaWdubWVudFwiLHNwT2JqZWN0LHt9KVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhY2NlcHQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaG93XCI6IHRhc2suYXNzaWduLmFzc2lnbm1lbnQuYWNjZXB0LnNob3csXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBfZ2V0TmFtZSh0YXNrLmFzc2lnbi5hc3NpZ25tZW50LmFjY2VwdC5sYWJlbC5pMThuLCAnZW4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQuYWNjZXB0ID0gYWNjZXB0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5tZXNzYWdlID0gX2dldE5hbWUodGFzay5hc3NpZ24uYXNzaWdubWVudC5tZXNzYWdlLmkxOG4sICdlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlamVjdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNob3dcIjogdGFzay5hc3NpZ24uYXNzaWdubWVudC5yZWplY3Quc2hvdyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IF9nZXROYW1lKHRhc2suYXNzaWduLmFzc2lnbm1lbnQucmVqZWN0LmxhYmVsLmkxOG4sICdlbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5yZWplY3QgPSByZWplY3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxlSWRcIjogcHJvZmlsZUlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicm9sZUlkXCI6IHJvbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwicm9sZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQucHJvZmlsZVJvbGVJZCA9IGlkO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCdOb3RpZmljYXRpb25zIHJlcXVlc3Qgc3VibWl0dGVkIGZvciBhY2NlcHRhbmNlLicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxpc3QubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9hdXRvIGFzc2lnblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdXNlcklkID0gbGlzdFswXS5pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVzZXJuYW1lID0gbGlzdFswXS5uYW1lO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgc3BPYmplY3QgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiKyBzcHV1aWQgK1wiJ11cIixhcHAuU0NPUEUud29ya2Zsb3csIHt9KVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFzc2lnbmVlID0gbW9kZWwuYXNzaWduZWRUbzsgLy9KU09OLnhwYXRoKFwiL3N0ZXAvYXNzaWduZWRUb1wiLHNwT2JqZWN0LHt9KVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduZWUubmFtZSA9IHVzZXJuYW1lICsgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduZWUudXNlcklkID0gdXNlcklkICsgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgnQXNzaWduZWQgdG8gdGhlIG9ubHkgdXNlciBpbiByb2xlLicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB1c2UgZGVmYXVsdCB1c2VyXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFzay5hc3NpZ24uZGVmYXVsdCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1c2VySWQgPSB0YXNrLmFzc2lnbi5kZWZhdWx0LnVzZXJJZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1c2VybmFtZSA9IHRhc2suYXNzaWduLmRlZmF1bHQudXNlck5hbWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgc3BPYmplY3QgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiKyBzcHV1aWQgK1wiJ11cIixhcHAuU0NPUEUud29ya2Zsb3csIHt9KVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhc3NpZ25lZSA9IG1vZGVsLmFzc2lnbmVkVG87IC8vIEpTT04ueHBhdGgoXCIvc3RlcC9hc3NpZ25lZFRvXCIsc3BPYmplY3Qse30pWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduZWUubmFtZSA9IHVzZXJuYW1lICsgXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVlLnVzZXJJZCA9IHVzZXJJZCArIFwiXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgnQXNzaWduZWQgdG8gZGVmYXVsdCB1c2VyJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBpbiBhc3NpZ25tZW50LiBEZWZhdWx0IHVzZXIgbm90IHNwZWNpZmllZC4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCgnRXJyb3IgaW4gYXNzaWdubWVudC4gRGVmYXVsdCB1c2VyIG5vdCBzcGVjaWZpZWQuJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgaW4gZ2V0VXNlcnNMaXN0QnlSb2xlIHVuZGVmaW5lZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBpbiBnZXRVc2Vyc0xpc3RCeVJvbGUnKTtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRhc2suYXNzaWduLnN3aW1sYW5lICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXNvbHZlKCdzd2ltbGFuZScpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU3dpbWxhbmUgaW1wbGVtZW50YXRpb24gISEnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG5cclxufTtcclxuXHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiBQcm9jZXNzIHRyYW5zaXRpb25cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHByb2Nlc3MgaWRcclxuICogQHBhcmFtIHtudW1iZXJ9IHByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2UgcHJvY2VzcyBzZXFcclxuICogQHBhcmFtIHtzdHJpbmd9IHN1YlByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN1Yi1wcm9jZXNzIGlkXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdWJQcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHN1Yi1wcm9jZXNzIHNlcVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RlcElkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3RlcCBpZFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdHJhbnNpdGlvbklkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gdHJhbnNpdGlvbiBpZFxyXG4gKiBAcGFyYW0ge29iamVjdH0gZGF0YSAtIGFueSBhZGRpdGlvbmFsIGRhdGEgcGFzc2VkIGluIGFzIGtleSB2YWx1ZSBwYWlyc1xyXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxyXG4gKlxyXG4gKiBAZXhhbXBsZSAnJ1xyXG4gKlxyXG4gKiBAcmV0dXJuICcnXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiB0cmFuc2l0aW9uKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdGVwSWQsIHRyYW5zaXRpb25JZCwgZGF0YSwgX1dGSW5zdGFuY2UpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YXIgc3RlcFNlcSA9IDA7XHJcbiAgICAgICAgICAgIHZhciBuZXh0U3RlcElkID0gJyc7XHJcbiAgICAgICAgICAgIHZhciBuZXh0U3RlcFNlcSA9IDA7XHJcbiAgICAgICAgICAgIHZhciBzdWJQcm9jZXNzID0gW107XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50UHJvY2VzcyA9IF9XRkluc3RhbmNlLmNvbmZpZy5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKG9ialByb2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmpQcm9jZXNzLl9pZCA9PSBwcm9jZXNzSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqUHJvY2VzcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50U3ViUHJvY2VzcyA9IGN1cnJlbnRQcm9jZXNzWzBdLnN1YlByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqU3ViUHJvY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9ialN1YlByb2Nlc3MuX2lkID09IHN1YlByb2Nlc3NJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmpTdWJQcm9jZXNzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRTdGVwID0gY3VycmVudFN1YlByb2Nlc3NbMF0uc3RlcHMuZmlsdGVyKGZ1bmN0aW9uKG9ialN0ZXApIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmpTdGVwLl9pZCA9PSBzdGVwSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqU3RlcDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZhciB0cmFuc2l0aW9uID0gY3VycmVudFN0ZXBbMF0udHJhbnNpdGlvbnMuZmlsdGVyKGZ1bmN0aW9uKG9ialRyYW5zaXRpb24pIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmpUcmFuc2l0aW9uLl9pZCA9PSB0cmFuc2l0aW9uSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqVHJhbnNpdGlvbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY3VycmVudFN1YlByb2Nlc3NbMF0uc3RlcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50U3ViUHJvY2Vzc1swXS5zdGVwc1tpXS5faWQgPT0gc3RlcElkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RlcFNlcSA9IHBhcnNlSW50KGN1cnJlbnRTdWJQcm9jZXNzWzBdLnN0ZXBzW2ldLl9zZXEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGN1cnJlbnRTdWJQcm9jZXNzWzBdLnN0ZXBzLmZpbHRlcihmdW5jdGlvbihzdGVwSXRlbSkge1xyXG4gICAgICAgICAgICAgICAgbmV4dFN0ZXBTZXEgPSBzdGVwU2VxICsgMTtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChzdGVwSXRlbS5fc2VxKSA9PSBuZXh0U3RlcFNlcSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHRTdGVwSWQgPSBzdGVwSXRlbS5faWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIF9XRkluc3RhbmNlLmluc3RhbmNlLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqUHJvY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9ialByb2Nlc3MuaWQgPT0gcHJvY2Vzc0lkICYmIG9ialByb2Nlc3Muc2VxID09IHByb2Nlc3NTZXEpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmpQcm9jZXNzLnN1YlByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqU3ViUHJvY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqU3ViUHJvY2Vzcy5pZCA9PSBzdWJQcm9jZXNzSWQgJiYgb2JqU3ViUHJvY2Vzcy5zZXEgPT0gc3ViUHJvY2Vzc1NlcSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHV1aWQgPSBvYmpTdWJQcm9jZXNzLnV1aWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzdWJQcm9jZXNzID0gb2JqU3ViUHJvY2VzcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24oc3ViUHJvY2Vzc0l0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3ViUHJvY2Vzc0l0ZW0uX2lkID09IHV1aWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2VzcyA9IHN1YlByb2Nlc3NJdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIG1heFN0ZXBzID0gY3VycmVudFN1YlByb2Nlc3NbMF0uc3RlcHMubGVuZ3RoO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRyYW5zaXRpb25bMF0uX3R5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2F1dG8nOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0cmFuc2l0aW9uWzBdLmdvVG8uX3R5cGUgPT0gJ25leHRTdGVwJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBuZXh0U3RlcElkLCBuZXh0U3RlcFNlcSwgZGF0YSwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFN0ZXBTZXEgPT0gbWF4U3RlcHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnQWxsIFN0ZXAgdHJhbnNpdGlvbnMgaGF2ZSBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc0NvbXBsZXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwOiByZXN1bHQuZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdTdGVwIHRyYW5zaXRpb24gY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCByZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3VzZXInOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0cmFuc2l0aW9uWzBdLmdvVG8uX3R5cGUgPT0gJ25leHRTdGVwJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBuZXh0U3RlcElkLCBuZXh0U3RlcFNlcSwgZGF0YSwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFN0ZXBTZXEgPT0gbWF4U3RlcHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnQWxsIFN0ZXAgdHJhbnNpdGlvbnMgaGF2ZSBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc0NvbXBsZXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwOiByZXN1bHQuZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdTdGVwIHRyYW5zaXRpb24gY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCByZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHJhbnNpdGlvblswXS5nb1RvLl90eXBlID09ICdzdGVwSWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBnb1RvU3RlcElkID0gdHJhbnNpdGlvblswXS5nb1RvLl9zdGVwSWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBnb1RvU3RlcFNlcSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdWJQcm9jZXNzWzBdLnN0ZXBzLmZpbHRlcihmdW5jdGlvbihzdGVwSXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0ZXBJdGVtLl9pZCA9PSBnb1RvU3RlcElkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ29Ub1N0ZXBTZXEgPSBwYXJzZUludChzdGVwSXRlbS5fc2VxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcChwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgZ29Ub1N0ZXBJZCwgZ29Ub1N0ZXBTZXEsIGRhdGEsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdvVG9TdGVwU2VxID09IG1heFN0ZXBzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0FsbCBTdGVwIHRyYW5zaXRpb25zIGhhdmUgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NDb21wbGV0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcDogcmVzdWx0LmRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnU3RlcCB0cmFuc2l0aW9uIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywgcmVzdWx0LmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGVHJhbnNpdGlvbkVycm9yJywgJ1RyYW5zaXRpb24gdHlwZTogJyArIHRyYW5zaXRpb25bMF0uX3R5cGUgKyAnIG5vdCBkZWZpbmVkLicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUHJvY2VzcyBwb3N0QWN0aW9uc1xyXG4gKlxyXG4gKiBAcGFyYW0ge29iamVjdH0gcG9zdEFjdGlvbnMgLSB0aGUgcG9zdEFjdGlvbnMgY29uZmlnIGRhdGFcclxuICpcclxuICogQGV4YW1wbGUgJydcclxuICpcclxuICogQHJldHVybiAnJ1xyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gcG9zdEFjdGlvbnMocG9zdEFjdGlvbnMsIF9XRkluc3RhbmNlKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgdmFyIGNvbXBsZXRlZCA9IFtdO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHV0aWwuc3luY0xvb3AocG9zdEFjdGlvbnMubGVuZ3RoLCBmdW5jdGlvbihsb29wKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY291bnRlciA9IGxvb3AuaXRlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb24ocG9zdEFjdGlvbnNbY291bnRlcl0sIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBhbGwgcHJlLXJlcXVpc2l0ZXMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS5cclxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQucHVzaCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBsb29wLm5leHQoKTtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlZC5wdXNoKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBsb29wLmJyZWFrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29tcGxldGVkLmV2ZXJ5KEJvb2xlYW4pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1Bvc3QtYWN0aW9ucyBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHt9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRlByZUFjdGlvbnNFcnJvcicsICdOb3QgYWxsIHBvc3QtYWN0aW9ucyBwYXNzZWQuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cclxuXHJcblxyXG4vKlxyXG5mdW5jdGlvbiBzZW5kTm90aWZpY2F0aW9ucyh1c2Vyc0xpc3QsIHNwdXVpZCl7XHJcblxyXG4gIC8vIGdldCB1c2VycyBsaXN0IFxyXG4gIC8vIHNlbiBub3RpZmljYXRpb25zIHRvIHVzZXJzIHkgYWRkaW5nIGNoYW5uZWxzIHRvIHRoZW1cclxuIFxyXG4gIHZhciBjaGFubmVsQXJyYXkgPSBbXTtcclxuXHJcbiAgZm9yKGk9MDtpPHVzZXJzTGlzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICBjaGFubmVsQXJyYXkucHVzaChcInVzZXJfXCIrdXNlcnNMaXN0W2ldLmlkKTtcclxuICB9XHJcblxyXG4gIFxyXG4gIGFzc2lnblRvVXNlcnMocHJvY2Vzc1dvcmtmbG93TWVzc2FnZShOT1RJRklDQVRJT05fVVNFUl9NU0dfQUNDRVBULCBzcHV1aWQpLCBjaGFubmVsQXJyYXkpO1xyXG5cclxuXHJcblxyXG59OyovXHJcblxyXG4vKmZ1bmN0aW9uIGFzc2lnblRvVXNlcnMobWVzc2FnZSwgY2hhbm5lbEFycmF5KXtcclxuXHJcbiAgICAgdmFyIGNoYW5uZWxzID0gY2hhbm5lbEFycmF5O1xyXG4gICAgIFxyXG4gICAgIHZhciBub3RpZmljYXRpb24gPSAgeyBcclxuICAgICAgICAgIFwiX2lkXCI6IGdlbmVyYXRlVVVJRCgpLFxyXG4gICAgICAgICAgXCJjaGFubmVsc1wiOmNoYW5uZWxzLFxyXG4gICAgICAgICAgXCJtZXNzYWdlXCI6IG1lc3NhZ2UsXHJcbiAgICAgICAgICBcIm1lc3NhZ2VUeXBlXCI6IFwiaW5mb1wiLFxyXG4gICAgICAgICAgXCJjcmVhdGVkRGF0ZVRpbWVcIjogbW9tZW50KCkuZm9ybWF0KCksXHJcbiAgICAgICAgICBcInJlYWRcIjogZmFsc2UsXHJcbiAgICAgICAgICBcInJlYWREYXRlVGltZVwiOiBcIlwiLFxyXG4gICAgICAgICAgXCJ0eXBlXCI6IFwibm90aWZpY2F0aW9uXCIsXHJcbiAgICAgICAgICBcInNlbmRlclVzZXJJZFwiOiBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZFxyXG4gICAgICAgfTtcclxuICAgICAgIGNvbnNvbGUubG9nKG5vdGlmaWNhdGlvbik7XHJcbiAgICAgICBkYW8udXBzZXJ0KG5vdGlmaWNhdGlvbik7XHJcblxyXG4gIH07Ki9cclxuXHJcbmZ1bmN0aW9uIHByb2Nlc3NXb3JrZmxvd01lc3NhZ2UobWVzc2FnZSwgc3B1dWlkKSB7XHJcblxyXG4gICAgdmFyIHJlcGxhY2VkTXNnID0gbWVzc2FnZTtcclxuXHJcbiAgICBpZiAocmVwbGFjZWRNc2cuaW5kZXhPZignI0lOU1RBTkNFX0xBQkVMJykgIT09IC0xKSB7XHJcbiAgICAgICAgdmFyIHZhbCA9IEpTT04ueHBhdGgoXCIvaW5zdGFuY2UvcHJvY2Vzc2VzL3N1YlByb2Nlc3Nlc1t1dWlkIGVxICdcIiArIHNwdXVpZCArIFwiJ10vbGFiZWxcIiwgYXBwLlNDT1BFLndvcmtmbG93LCB7fSlbMF07XHJcbiAgICAgICAgcmVwbGFjZWRNc2cgPSByZXBsYWNlZE1zZy5yZXBsYWNlKCcjSU5TVEFOQ0VfTEFCRUwnLCB2YWwpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBpZiAocmVwbGFjZWRNc2cuaW5kZXhPZignI1VTRVJfTkFNRScpICE9PSAtMSkge1xyXG4gICAgICAgIHZhciB2YWwgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXS9zdGVwL2Fzc2lnbmVkVG8vbmFtZVwiLCBhcHAuU0NPUEUud29ya2Zsb3csIHt9KVswXTtcclxuICAgICAgICByZXBsYWNlZE1zZyA9IHJlcGxhY2VkTXNnLnJlcGxhY2UoJyNVU0VSX05BTUUnLCB2YWwpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBpZiAocmVwbGFjZWRNc2cuaW5kZXhPZignI1BST0ZJTEVfVElUTEUnKSAhPT0gLTEpIHtcclxuICAgICAgICB2YXIgdmFsID0gYXBwLnByb2ZpbGUudGl0bGU7XHJcbiAgICAgICAgcmVwbGFjZWRNc2cgPSByZXBsYWNlZE1zZy5yZXBsYWNlKCcjUFJPRklMRV9USVRMRScsIHZhbCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGlmIChyZXBsYWNlZE1zZy5pbmRleE9mKCcjUFJPRklMRV9UWVBFJykgIT09IC0xKSB7XHJcbiAgICAgICAgdmFyIHZhbCA9IGFwcC5TQ09QRS5BUFBfQ09ORklHLm5hbWU7XHJcbiAgICAgICAgcmVwbGFjZWRNc2cgPSByZXBsYWNlZE1zZy5yZXBsYWNlKCcjUFJPRklMRV9UWVBFJywgdmFsKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJlcGxhY2VkTXNnLmluZGV4T2YoJyNWQVJfU1BVVUlEJykgIT09IC0xKSB7XHJcbiAgICAgICAgdmFyIHZhbCA9IHNwdXVpZDtcclxuICAgICAgICByZXBsYWNlZE1zZyA9IHJlcGxhY2VkTXNnLnJlcGxhY2UoJyNWQVJfU1BVVUlEJywgdmFsKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHJldHVybiByZXBsYWNlZE1zZztcclxufTtcclxuXHJcbmZ1bmN0aW9uIF9nZXROYW1lKGFyciwgbGFuZykge1xyXG4gICAgaWYgKGFyciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGFycltpXS5fbGFuZyA9PT0gbGFuZykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFycltpXS52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcblxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cclxuICAgIHByZVJlcXVpc2l0ZXM6IHByZVJlcXVpc2l0ZXMsXHJcbiAgICBwcmVBY3Rpb25zOiBwcmVBY3Rpb25zLFxyXG4gICAgc3ViUHJvY2Vzczogc3ViUHJvY2VzcyxcclxuICAgIGluZGljYXRvckRvY3M6IGluZGljYXRvckRvY3MsXHJcbiAgICB0YXNrOiB0YXNrLFxyXG4gICAgdHJhbnNpdGlvbjogdHJhbnNpdGlvbixcclxuICAgIGFzc2lnblVzZXI6IGFzc2lnblVzZXJcclxuXHJcbn0iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuICogVXRpbGl0eSBNb2R1bGVcclxuICpcclxuICogQG1vZHVsZSBsaWIvdXRpbFxyXG4gKlxyXG4gKiBAYXV0aG9yIEJyZW50IEdvcmRvblxyXG4gKiBAdmVyc2lvbiAwLjEuMFxyXG4gKlxyXG4gKiBAZGVzY3JpcHRpb25cclxuICogV29ya2Zsb3cgdXRpbGl0eSBtb2R1bGUgdXNlZCB0byBmb3JtYXQgdGhlIHJldHVybiBhbmQgZXJyb3Igb2JqZWN0cywgYW5kXHJcbiAqIGNvbnRhaW5zIHNvbWUgb3RoZXIgdXRpbGl0eSBmdW5jdGlvbnMgc3VjaCBhcyBhIHN5bmMgbG9vcCBhbmQgY29tcGFyZS5cclxuICpcclxuICovXHJcblxyXG4vKipcclxuICogU3VjY2VzcyBibG9jayByZXR1cm4gb2JqZWN0LCBjb250YWlucyBhIG1lc3NhZ2UgYW5kIG9wdGlvbmFsIGRhdGEgb2JqZWN0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIHRoZSBzdWNjZXNzIG1lc3NhZ2VcclxuICogQHBhcmFtIHtzdHJpbmd8T2JqZWN0fSBbZGF0YV0gLSB0aGUgc3VjY2VzcyByZXR1cm5lZCBkYXRhXHJcbiAqXHJcbiAqIEBleGFtcGxlXHJcbiAqIC8vIFJldHVybiBzdWNjZXNzIHdpdGhvdXQgYSBkYXRhIGJsb2NrXHJcbiAqIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdTdWNjZXNzIG1lc3NhZ2UgZ29lcyBoZXJlLi4uJyk7XHJcbiAqXHJcbiAqIEByZXR1cm4ge09iamVjdH0gLSB3aXRoIG1lc3NhZ2UgYW5kIGRhdGEgcHJvcGVydGllc1xyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gc3VjY2VzcyhtZXNzYWdlLCBkYXRhKXtcclxuXHRyZXR1cm4ge1xyXG5cdFx0bWVzc2FnZTogbWVzc2FnZSxcclxuXHRcdGRhdGE6IGRhdGFcclxuXHR9O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdhcm5pbmcgYmxvY2sgcmV0dXJuIG9iamVjdCwgY29udGFpbnMgYSBtZXNzYWdlIGFuZCBvcHRpb25hbCBkYXRhIG9iamVjdC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSB0aGUgd2FybmluZyBtZXNzYWdlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfE9iamVjdH0gW2RhdGFdIC0gdGhlIHJldHVybmVkIGRhdGFcclxuICpcclxuICogQGV4YW1wbGVcclxuICogLy8gUmV0dXJuIHN1Y2Nlc3Mgd2l0aG91dCBhIGRhdGEgYmxvY2tcclxuICogdmFyIHN1Y2Nlc3MgPSB1dGlsLndhcm4oJ1dhcm5pbmcgbWVzc2FnZSBnb2VzIGhlcmUuLi4nKTtcclxuICpcclxuICogQHJldHVybiB7T2JqZWN0fSB3aXRoIG1lc3NhZ2UgYW5kIGRhdGEgcHJvcGVydGllcywgYW5kIGxvZ3MgdGhlIHdhcm5pbmcgdG8gdGhlIGNvbnNvbGUuXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiB3YXJuKG1lc3NhZ2UsIGRhdGEpe1xyXG5cdGNvbnNvbGUud2FybihkYXRhKTtcclxuXHRyZXR1cm4ge1xyXG5cdFx0d2FybmluZzogbWVzc2FnZSxcclxuXHRcdGRhdGE6IGRhdGFcclxuXHR9O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEVycm9yIGJsb2NrIEpTIGVycm9yIG9iamVjdCwgY29udGFpbnMgYSBjb2RlIGFuZCBtZXNzYWdlIGZvciB0aGUgZXJyb3IuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb2RlIC0gdGhlIGVycm9yIGNvZGVcclxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSB0aGUgZXJyb3IgbWVzc2FnZVxyXG4gKlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgc3VjY2VzcyA9IHV0aWwuZXJyb3IoJ0Vycm9yMDAxJywnRXJyb3IgbWVzc2FnZSBnb2VzIGhlcmUuLi4nKTtcclxuICpcclxuICogQHJldHVybiB7T2JqZWN0fSB3aXRoIGEgY29kZSBhbmQgbWVzc2FnZSBwcm9wZXJ0aWVzLlxyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gZXJyb3IoY29kZSwgbWVzc2FnZSl7XHJcblx0dmFyIGVyciA9IG5ldyBFcnJvcignJyk7XHJcblx0ZXJyLm5hbWUgPSBjb2RlO1xyXG5cdGVyci5tZXNzYWdlID0gbWVzc2FnZTtcclxuXHRyZXR1cm4gZXJyO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEEgbG9vcCB3aGljaCBjYW4gbG9vcCBYIGFtb3VudCBvZiB0aW1lcywgd2hpY2ggY2FycmllcyBvdXRcclxuICogYXN5bmNocm9ub3VzIGNvZGUsIGJ1dCB3YWl0cyBmb3IgdGhhdCBjb2RlIHRvIGNvbXBsZXRlIGJlZm9yZSBsb29waW5nLlxyXG4gKlxyXG4gKiBAcGFyYW0ge251bWJlcn0gaXRlcmF0aW9ucyAtIHRoZSBudW1iZXIgb2YgaXRlcmF0aW9ucyB0byBjYXJyeSBvdXRcclxuICogQHBhcmFtIHtmdW5jdGlvbn0gcHJvY2VzcyAtIHRoZSBjb2RlL2Z1bmN0aW9uIHdlJ3JlIHJ1bm5pbmcgZm9yIGV2ZXJ5XHJcbiAqIGl0ZXJhdGlvblxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBleGl0IC0gYW4gb3B0aW9uYWwgY2FsbGJhY2sgdG8gY2Fycnkgb3V0IG9uY2UgdGhlIGxvb3BcclxuICogaGFzIGNvbXBsZXRlZFxyXG4gKlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB1dGlsLnN5bmNMb29wKDUsIGZ1bmN0aW9uKGxvb3Ape1xyXG4gKiBcdHZhciBjb3VudGVyID0gbG9vcC5pdGVyYXRpb24oKTtcclxuICogXHQvLyBBZGQgYXN5bmMgY2FsbHMgaGVyZS4uXHJcbiAqXHJcbiAqIH0sIGZ1bmN0aW9uKCl7XHJcbiAqIFx0Ly8gT24gY29tcGxldGUgcGVyZm9ybSBhY3Rpb25zIGhlcmUuLi5cclxuICpcclxuICogfSk7XHJcbiAqXHJcbiAqIEByZXR1cm4ge09iamVjdH0gdGhlIGxvb3AgY29udHJvbCBvYmplY3QuXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiBzeW5jTG9vcChpdGVyYXRpb25zLCBwcm9jZXNzLCBleGl0KXtcclxuICAgIHZhciBpbmRleCA9IDAsXHJcbiAgICAgICAgZG9uZSA9IGZhbHNlLFxyXG4gICAgICAgIHNob3VsZEV4aXQgPSBmYWxzZTtcclxuICAgIHZhciBsb29wID0ge1xyXG4gICAgICAgIG5leHQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYoZG9uZSl7XHJcbiAgICAgICAgICAgICAgICBpZihzaG91bGRFeGl0ICYmIGV4aXQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBleGl0KCk7IC8vIEV4aXQgaWYgd2UncmUgZG9uZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIElmIHdlJ3JlIG5vdCBmaW5pc2hlZFxyXG4gICAgICAgICAgICBpZihpbmRleCA8IGl0ZXJhdGlvbnMpe1xyXG4gICAgICAgICAgICAgICAgaW5kZXgrKzsgLy8gSW5jcmVtZW50IG91ciBpbmRleFxyXG4gICAgICAgICAgICAgICAgcHJvY2Vzcyhsb29wKTsgLy8gUnVuIG91ciBwcm9jZXNzLCBwYXNzIGluIHRoZSBsb29wXHJcbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSB3ZSdyZSBkb25lXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkb25lID0gdHJ1ZTsgLy8gTWFrZSBzdXJlIHdlIHNheSB3ZSdyZSBkb25lXHJcbiAgICAgICAgICAgICAgICBpZihleGl0KSBleGl0KCk7IC8vIENhbGwgdGhlIGNhbGxiYWNrIG9uIGV4aXRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaXRlcmF0aW9uOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybiBpbmRleCAtIDE7IC8vIFJldHVybiB0aGUgbG9vcCBudW1iZXIgd2UncmUgb25cclxuICAgICAgICB9LFxyXG4gICAgICAgIGJyZWFrOmZ1bmN0aW9uKGVuZCl7XHJcbiAgICAgICAgICAgIGRvbmUgPSB0cnVlOyAvLyBFbmQgdGhlIGxvb3BcclxuICAgICAgICAgICAgc2hvdWxkRXhpdCA9IGVuZDsgLy8gUGFzc2luZyBlbmQgYXMgdHJ1ZSBtZWFucyB3ZSBzdGlsbCBjYWxsIHRoZSBleGl0IGNhbGxiYWNrXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGxvb3AubmV4dCgpO1xyXG4gICAgcmV0dXJuIGxvb3A7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBjb21wYXJlKHN1YmplY3QsIG9wZXJhdG9yLCB2YWx1ZSkge1xyXG4gIFx0c3dpdGNoIChvcGVyYXRvcikge1xyXG4gIFx0XHRjYXNlICdncmVhdGVyVGhhbic6XHJcblx0XHRcdHJldHVybiBzdWJqZWN0ID4gdmFsdWU7XHJcblx0XHRjYXNlICdsZXNzVGhhbic6XHJcblx0XHRcdHJldHVybiBzdWJqZWN0IDwgdmFsdWU7XHJcblx0XHRjYXNlICdncmVhdGVyVGhhbkVxdWFsJzpcclxuXHRcdFx0cmV0dXJuIHN1YmplY3QgPj0gdmFsdWU7XHJcblx0XHRjYXNlICdsZXNzVGhhbkVxdWFsJzpcclxuXHRcdFx0cmV0dXJuIHN1YmplY3QgPD0gdmFsdWU7XHJcblx0XHRjYXNlICdlcXVhbFRvJzpcclxuXHRcdFx0cmV0dXJuIHN1YmplY3QgPT09IHZhbHVlO1xyXG5cdFx0Y2FzZSAnbm90RXF1YWxUbyc6XHJcblx0XHRcdHJldHVybiBzdWJqZWN0ICE9PSB2YWx1ZTtcclxuICBcdH1cclxufTtcclxuXHJcbmZ1bmN0aW9uIGdldE5hbWUoYXJyLCBsYW5nKXtcclxuXHRpZiAoYXJyICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aCA7IGkrKykge1xyXG5cdFx0XHRpZiAoYXJyW2ldLmkxOG4uX2xhbmcgPT09IGxhbmcpIHtcclxuXHRcdFx0XHRyZXR1cm4gYXJyW2ldLmkxOG4udmFsdWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cclxuIFx0c3VjY2Vzczogc3VjY2VzcyxcclxuIFx0d2Fybjogd2FybixcclxuIFx0ZXJyb3I6IGVycm9yLFxyXG4gXHRzeW5jTG9vcDogc3luY0xvb3AsXHJcbiBcdGNvbXBhcmU6IGNvbXBhcmUsXHJcblx0Z2V0TmFtZTogZ2V0TmFtZVxyXG5cclxuIH1cclxuIl19
