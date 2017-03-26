(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Workflow = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Process = require('./lib/process');
var util = require('utility');
var userInterface = require('./lib/interface');
var helper = require('./lib/helper');


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

function Workflow(profile, communityId, app, config) {
    var _this = this;

    // Community ID validation checks
    if (communityId == '' || communityId == undefined) {
        throw util.error('ParamRequired', 'A community id is required.');
    } else if (typeof (communityId) !== 'string') {
        throw new Error('The community id must be a javascript string.');
    } else {
        _this.communityId = communityId || '';
    }

    // Profile ID validation checks
    if (profile == '' || profile == undefined) {
        throw util.error('ParamRequired', 'A profile id is required.');
    } else if (typeof (profile) !== 'string') {
        throw new Error('The profile id must be a javascript string.');
    } else {
        _this.profile = profile || '';
    }

    // App ID validation checks
    if (app == '' || app == undefined) {
        throw util.error('ParamRequired', 'An app id is required.');
    } else if (typeof (app) !== 'string') {
        throw new Error('The app id must be a javascript string.');
    } else {
        _this.app = app || '';
    }

    // Workflow configuration validation checks
    if (config == '' || config == undefined) {
        throw util.error('ParamRequired', 'A workflow configuration is required.');
    } else if (typeof (config) !== 'object') {
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
    

}

/**
 * Workflow get profile id.
 *
 * @example ""
 *
 * @return ""
 *
 */
Workflow.prototype.getProfile = function () {
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
Workflow.prototype.getApp = function () {
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
Workflow.prototype.getConfig = function () {
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

Workflow.prototype.getInstance = function () {
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
Workflow.prototype.setInstance = function (data) {
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
Workflow.prototype.getSubProcesses = function () {
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
Workflow.prototype.setSubProcesses = function (data) {
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
Workflow.prototype.getIndicators = function () {
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
Workflow.prototype.setIndicators = function (data) {
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

Workflow.prototype.create = function () {
    var _this = this;
    return new Promise(function (resolve, reject) {
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
                    channels: [
                        "community_" + app.SCOPE.getCommunityId(),
                        "profile_" + app.SCOPE.profileId,
                        "application_" + app.SCOPE.applicationId,
                        "community_" + app.SCOPE.getCommunityId() + "_application_" + app.SCOPE.applicationId
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
Workflow.prototype.initialise = function (processId, data, subprofileId) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        try {
            var configProcess = [];
            // Check the passed in parameters
            if (processId !== '' && processId !== undefined) {
                // Get the current process config
                configProcess = _this.config.processes.filter(function (objProcess) {
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
            _this.instance.processes.filter(function (processItem) {
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
                subProcesses: []
            }

            // 1. Update the process id and seq
            processModel.id = processId;
            processModel.seq = processSeq;
            _this.instance.processes.push(processModel);
            // Parameters
            var subProcessId = configProcess[0].subProcesses[0]._id;
            var subProcessSeq = 1;
            _this.instance.processes.filter(function (processItem) {
                if (processItem.id == processId && processItem.seq == processSeq) {
                    subProcessSeq = processItem.subProcesses.length + 1
                }

            })
            // Call the subprocess method

            Process.subProcess(processId, processSeq, subProcessId, subProcessSeq, data, _this).then(function (subProcess) {
                // Generate the uuid

                var uuid = subProcess.data._id; //_this.profile + ':' + _this.app + ':' + processId + ':' + processSeq + ':' + subProcessId + ':' + subProcessSeq;
                var label = data.label;
                // Build the sub-process reference object
                
                //TODO: Change required to move isActive to subProcess file.Remove from here
                var subProcessRef = {
                    id: subProcessId,
                    subprofileId: subprofileId,
                    seq: subProcessSeq,
                    uuid: uuid,
                    label: label
                }

                // Add the reference to the process model
                processModel.subProcesses.push(subProcessRef);
                // Add the subProcess model to the subprocesses array
                //_this.subprocesses.push(subProcess.data);
                // _this.instance.processes.push(processModel);
                for (var index = 0; index < _this.instance.processes.length; index++) {
                    var processItem = _this.instance.processes[index];
                    if (processItem.id == processId && processItem.seq == processSeq) {
                        // Remove the current process from the array and add the updated processModel
                        _this.instance.processes.splice(index, 1, processModel)
                    }

                }

                // Process the indicator documents workflow processes updates
                var indicators = subProcess.data.indicators;
                var step = subProcess.data.step;
                Process.indicatorDocs(processId, indicators, step, _this).then(function (result) {
                    var success = util.success('Process: ' + _this.config.processes[0]._id + ' initialized successfully.', subProcessRef);
                    resolve(success);
                }, function (err) {
                    reject(err);
                });

            }, function (err) {
                _this.instance.processes = _this.instance.processes.filter(function (obj) {
                    return !(obj.id == processId && obj.seq == processSeq);
                });
                console.log(err);
                reject(err);
            });
        } catch (err) {
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
Workflow.prototype.transition = function (processId, processSeq, subProcessId, subProcessSeq, stepId, transitionId, data, spuuid) {
    // Re-assign this
    var _this = this;
    return new Promise(function (resolve, reject) {
        try {
            var model = JSON.xpath("/subprocesses[_id eq '" + spuuid + "']/step/data", app.SCOPE.workflow, {})[0];
            var stepObject = JSON.xpath("/processes[_id eq '" + processId + "']/subProcesses[_id eq '" + subProcessId + "']/steps[_id eq '" + stepId + "']", _this.config, {})[0];


            // Update the current sub-process step data
            var update = function (type, result) {
                _this.instance.processes.filter(function (processItem) {
                    if (processItem.id == processId && processItem.seq == processSeq) {

                        processItem.subProcesses.filter(function (subProcessItem) {
                            if (subProcessItem.id == subProcessId && subProcessItem.seq == subProcessSeq) {

                                _this.subprocesses.filter(function (subProcessObj) {
                                    if (subProcessObj._id == subProcessItem.uuid) {

                                        if (type == 'step') {

                                            subProcessObj.step = result.data.step;
                                            var success = util.success(result.message, subProcessObj);

                                            resolve(success);
                                        } else if (type == 'stepComplete') {

                                            subProcessObj.step = result.data.step;
                                            subProcessObj.complete = true
                                            var success = util.success(result.message, subProcessObj.step);

                                            resolve(success);
                                        }

                                    }

                                })
                            }

                        })
                    }

                })
            }


            if (stepObject.function.task.postActions != undefined) {


                var postActions = stepObject.function.task.postActions;
                Process.postActions(postActions, _this).then(function (success) {
                     
                     
                     
             



                    Process.transition(processId, processSeq, subProcessId, subProcessSeq, stepId, transitionId, data, _this, spuuid, model).then(function (result) {

                        if (result.data.subProcessComplete) {

                            update('stepComplete', result);
                        } else {

                            update('step', result);
                        }

                    }, function (err) {

                        reject(err);
                    });

                }, function (err) {

                    reject(err);

                });


            } else {


                Process.transition(processId, processSeq, subProcessId, subProcessSeq, stepId, transitionId, data, _this, spuuid, model).then(function (result) {

                    if (result.data.subProcessComplete) {

                        update('stepComplete', result);
                    } else {

                        update('step', result);
                    }

                }, function (err) {

                    reject(err);
                });

            }

        } catch (err) {

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
Workflow.prototype.assignUser = function (processId, processSeq, subProcessId, subProcessSeq, user) {
    // Re-assign the Workflow constructor instance as _this
    var _this = this;
    return new Promise(function (resolve, reject) {
        try {
            Process.assignUser(processId, processSeq, subProcessId, subProcessSeq, user, _this).then(function (result) {
                resolve(result);
            }, function (err) {
                reject(err);
            })
        } catch (err) {
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
Workflow.prototype.ui = function () {
    // Re-assign the Workflow constructor instance as _this
    var _this = this;
    return {
        getProcess: function (processId, lang) {
            return new Promise(function (resolve, reject) {
                try {
                    userInterface.getProcess(processId, lang, _this).then(function (model) {
                        resolve(model);
                    }, function (err) {
                        reject(err);
                    })
                } catch (err) {
                    reject(err);
                }

            })
        }

    }

};

/**
 * Workflow task, this method executes a specific task.
 *
 * @param {object} data - the process id to process
 * @param {object} _WFInstance - the input data to process
 * * @param {string} uuid - the input data to process
 *
 * @example
 * Workflow.getNodeValue(data, _WFInstance, uuid);
 *
 * @return ""
 *
 */

Workflow.prototype.getNodeValue = function (data, uuid) {
    // Re-assign the Workflow constructor instance as _this
    var _this = this;
    return new Promise(function (resolve, reject) {
        try {
            helper.getNodeValue(data, _this, uuid).then(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        } catch (err) {
            reject(err);
        }

    })
};

/**
 * Workflow task, this method executes a specific task.
 *
 * @param {object} data - the process id to process
 * @param {object} _WFInstance - the input data to process
 *
 * @example
 * Workflow.takeAssignment(spuuid, _WFInstance);
 *
 * @return ""
 *
 */

Workflow.prototype.takeAssignment = function (spuuid) {
    // Re-assign the Workflow constructor instance as _this
    var _this = this;

    return new Promise(function (resolve, reject) {

        try {

            //Assignment are executing here
            
            var spObject = JSON.xpath("/subprocesses[_id eq '" + spuuid + "']", _this, {})[0];
            var assignee = JSON.xpath("/step/assignedTo", spObject, {})[0];
            assignee.name = LOCAL_SETTINGS.SUBSCRIPTIONS.username + "";
            assignee.userId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId + "";

            //fetch preWorkActions here 

            var processId = JSON.xpath("/instance/processes[subProcesses/uuid eq '" + spuuid + "']/id", _this, {})[0];
            var subProcessId = JSON.xpath("/instance/processes/subProcesses[uuid eq '" + spuuid + "']/id", _this, {})[0];
            var stepId = JSON.xpath("/subprocesses[_id eq '" + spuuid + "']/step/id", _this, {})[0];
            var stepObject = JSON.xpath("/processes[_id eq '" + processId + "']/subProcesses[_id eq '" + subProcessId + "']/steps[_id eq '" + stepId + "']", _this.config, {})[0];

            if (stepObject.function.task.preWorkActions != undefined) {

                var preWorkActions = stepObject.function.task.preWorkActions;
                Process.preWorkActions(preWorkActions, _this).then(function (success) {

                    resolve(_this);

                }, function (err) {

                    reject(err);

                });

            } else {

                resolve(_this);

            }

        } catch (err) {

            reject(err);

        }

    });
};



module.exports = Workflow;
},{"./lib/helper":4,"./lib/interface":5,"./lib/process":7,"utility":8}],2:[function(require,module,exports){
'use strict';

var util = require('utility');
var nodeValue = require('./nodeValue');
var form = require('./form');
var helper = require('./helper');

var gatekeeper = new GK();

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

/**
 *  Form Module actions needs to be moved here.
 *  This actions module will be cental place to hold all functions.
 *  
 */

var community = (function () {

    return {

        createCommunity: function (_def, uuid, _WFInstance) {

            return new Promise(function (resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                var uuidCommunity = JSON.xpath("/indicators[category/term eq 'Community']/_id", _WFInstance, {})[0];
                var action = {
                    "createCommunity": {
                        "newCommunityId": _WFInstance.profile,
                        "indicatorUUID": {
                            "Community": uuidCommunity
                        }

                    }

                };

                workerObject.action = action;
                worker.send(workerObject).then(function (workerSuccess) {

                    var success = util.success('Worker processed successfully.', workerSuccess);
                    resolve(success);

                }, function (workerFail) {
                    reject(workerFail);
                });
            });
        },
        userJoinCommunity: function (_def, uuid, _WFInstance) {

            return new Promise(function (resolve, reject) {

            });

        },
        releaseAdoptedApplication: function (_def, uuid, _WFInstance) {

            return new Promise(function (resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;

                var uuidReleaseAdoptedApplication = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq 'adoptedApplication']/instances[1]/uuid", _WFInstance, {})[0];

                var action = {
                    "releaseAdoptedApplication": {
                        "communityId": _WFInstance.profile,
                        "indicatorUUID": {
                            "adoptedApplication": uuidReleaseAdoptedApplication
                        }

                    }

                };

                workerObject.action = action;
                worker.send(workerObject).then(function (workerSuccess) {

                    var success = util.success('Worker processes successfully.', workerSuccess);
                    resolve(success);

                }, function (workerFail) {
                    reject(workerFail);
                });
            });
        }

    }

})();

var application = (function () {

    return {

        createAppDefinition: function (_def, uuid, _WFInstance) {

            return new Promise(function (resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;

                var uuidApplication = JSON.xpath("/indicators[category/term eq 'Application']/_id", _WFInstance, {})[0];
                var action = {
                    "createApplication": {
                        "newApplicationId": _WFInstance.profile,
                        "indicatorUUID": {
                            "Application": uuidApplication
                        }

                    }

                };

                workerObject.action = action;
                worker.send(workerObject).then(function (workerSuccess) {

                    var success = util.success('Worker processes successfully.', workerSuccess);
                    resolve(success);

                }, function (workerFail) {
                    reject(workerFail);
                });
            });

        },

        buildApplication: function (_def, uuid, _WFInstance) {

            return new Promise(function (resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;

                var uuidPublishApplication = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq 'PublishApplication']/instances[1]/uuid", _WFInstance, {})[0];

                var uuidApplicationDefinition = JSON.xpath("/indicators[category/term eq 'ApplicationDefinition']/_id", _WFInstance, {})[0];
                var uuidRoles = JSON.xpath("/indicators[category/term eq 'Roles']/_id", _WFInstance, {})[0];
                var uuidApplication = JSON.xpath("/indicators[category/term eq 'Application']/_id", _WFInstance, {})[0];
                var uuidAppPermissions = JSON.xpath("/indicators[category/term eq 'AppPermissions']/_id", _WFInstance, {})[0];

                var action = {
                    "buildApplication": {
                        "applicationId": _WFInstance.profile,
                        "indicatorUUID": {
                            "PublishApplication": uuidPublishApplication,
                            "ApplicationDefinition": uuidApplicationDefinition,
                            "Roles": uuidRoles,
                            "Application": uuidApplication,
                            "AppPermissions": uuidAppPermissions
                        }

                    }

                };

                workerObject.action = action;
                worker.send(workerObject).then(function (workerSuccess) {

                    var success = util.success('Worker processes successfully.', workerSuccess);
                    resolve(success);

                }, function (workerFail) {
                    reject(workerFail);
                });
            });

        },

        applicationAdoption: function (_def, uuid, _WFInstance) {

            return new Promise(function (resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;

                var uuidAdoption = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq 'Adoption']/instances[1]/uuid", _WFInstance, {})[0];

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
                worker.send(workerObject).then(function (workerSuccess) {

                    var success = util.success('Worker processes successfully.', workerSuccess);
                    resolve(success);

                }, function (workerFail) {
                    reject(workerFail);
                });
            });

        },

        createTaxonomy: function (_def, uuid, _WFInstance) {

            return new Promise(function (resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;

                var taxonomyUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq 'Taxonomy']/instances[1]/uuid", _WFInstance, {})[0];

                var action = {
                    "createTaxonomy": {
                        "taxonomyUUID": taxonomyUUID
                    }

                };

                workerObject.action = action;
                worker.send(workerObject).then(function (workerSuccess) {

                    var success = util.success('Worker processes successfully.', workerSuccess);
                    resolve(success);

                }, function (workerFail) {
                    reject(workerFail);
                });
            });

        }

    }

})();

var worker = (function () {

    return {

        getWorkerWrapper: function () {

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
                "action": {

                }

            };

            return wrapper;

        },
        send: function (workerObject) {

            return new Promise(function (resolve, reject) {

                console.log('Submitting Worker Object to server');
                console.log(workerObject);
                dao.save(workerObject).done(function (workerResponse) {
                    resolve(workerResponse);
                }).fail(function (err) {
                    console.log('Error submitting worker response !!' + err);
                    reject(err);
                })

            });

        }

    }

})();

var performance = (function () {

    return {

        create: function (_def, uuid, _WFInstance) {

            return new Promise(function (resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;

                var uuidCommunity = JSON.xpath("/indicators[category/term eq 'plan']/_id", _WFInstance, {})[0];
                var action = {
                    "createPlan": {
                        "planUUID": uuidCommunity
                    }

                };

                workerObject.action = action;
                worker.send(workerObject).then(function (workerSuccess) {

                    var success = util.success('Worker processed successfully.', workerSuccess);
                    resolve(success);

                }, function (workerFail) {
                    reject(workerFail);
                });
            });
        },

        configureNode: function (_def, uuid, _WFInstance) {

            return new Promise(function (resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;

                var uuidNodeInSubProcess = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq 'node']/instances[1]/uuid", _WFInstance, {})[0];

                var action = {
                    "configureNode": {
                        "nodeUUID": uuidNodeInSubProcess
                    }

                };

                workerObject.action = action;
                worker.send(workerObject).then(function (workerSuccess) {

                    var success = util.success('Worker processed successfully.', workerSuccess);
                    resolve(success);

                }, function (workerFail) {
                    reject(workerFail);
                });
            });
        },
        unlockPeriod: function (_def, uuid, _WFInstance) {

            return new Promise(function (resolve, reject) {

                var subprocessObject = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];

                // message from step : TODO 

                var entryUUID = JSON.xpath("/indicators[id eq '" + PERIOD_SET_ID + "']/instances/uuid", subprocessObject, {})[0];
                var enddate = subprocessObject.dates.valid;

                library.unlockPeriod(entryUUID, enddate).then(function (data) {

                    var uuidSavedIndicator = data.id;

                    dao.get(uuidSavedIndicator).done(function (data) {

                        for (var index = 0; index < _WFInstance.indicators.length; index++) {
                            var indicator = _WFInstance.indicators[index];
                            if (indicator._id == data._id) {
                                _WFInstance.indicators.splice(index, 1);
                                _WFInstance.indicators.push(data);
                                var success = util.success('Unlock period.', data);
                                resolve(success);


                            }

                        }

                    }).fail(function (err) {
                        console.error(err);
                        reject(err);
                    });


                }, function (error) {
                    reject(error);
                });






            });
        },

        setModelStatus: function (_def, uuid, _WFInstance) {

            return new Promise(function (resolve, reject) {


                var subprocessObject = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];
                var entryUUID = JSON.xpath("/indicators[id eq '" + PERIOD_SET_ID + "']/instances/uuid", subprocessObject, {})[0];
                var enddate = subprocessObject.dates.valid;

                var statusi18nLabel = JSON.xpath("/label", _def , {})[0];
                var status = helper.getLanguageMessage(statusi18nLabel);


                library.setPeriodStatus(entryUUID, enddate, status).then(function (data) {

                    var uuidSavedIndicator = data.id;
                   
                    //below section will be uncommented and returned indicator model will be refreshed and udpated to workflow object . Uncomment below code once satinder is done with the function.

                    
                    dao.get(uuidSavedIndicator).done(function (data) {

                        for (var index = 0; index < _WFInstance.indicators.length; index++) {
                            var indicator = _WFInstance.indicators[index];
                            if (indicator._id == data._id) {
                                _WFInstance.indicators.splice(index, 1);
                                _WFInstance.indicators.push(data);
                                var success = util.success('setModelStatus', data);
                                resolve(success);


                            }

                        }

                    }).fail(function (err) {
                        console.error(err);
                        reject(err);
                    }); 


                }, function (error) {
                    reject(error);
                });






            });
        },

       
        lockPerformanceModel: function (_def, uuid, _WFInstance) {

            return new Promise(function (resolve, reject) {

                var subprocessObject = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];

                var entryUUID = JSON.xpath("/indicators[id eq '" + PERFORMANCE_SET_ID + "']/instances/uuid", subprocessObject, {})[0];
                var enddate = subprocessObject.dates.valid;

                library.lockPerformanceModel(entryUUID, enddate).then(function (data) {

                    var uuidSavedIndicator = data.id;

                    dao.get(uuidSavedIndicator).done(function (data) {

                        for (var index = 0; index < _WFInstance.indicators.length; index++) {
                            var indicator = _WFInstance.indicators[index];
                            if (indicator._id == data._id) {
                                _WFInstance.indicators.splice(index, 1);
                                _WFInstance.indicators.push(data);
                                var success = util.success('Lock performance model.', data);
                                resolve(success);


                            }

                        }

                    }).fail(function (err) {
                        console.error(err);
                        reject(err);
                    });


                }, function (error) {
                    reject(error);
                });






            });
        }

    }

})();

var sdo = (function () {

    return {

        create: function (_def, uuid, _WFInstance) {

            return new Promise(function (resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;

                var sdoUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq 'SDO']/instances[1]/uuid", _WFInstance, {})[0];

                var action = {
                    "createSDO": {
                        "sdoUUID": sdoUUID
                    }

                };

                workerObject.action = action;
                worker.send(workerObject).then(function (workerSuccess) {

                    var success = util.success('Worker processes successfully.', workerSuccess);
                    resolve(success);

                }, function (workerFail) {
                    reject(workerFail);
                });
            });

        }

    }

})();

var taxonomy = (function () {

    return {

        create: function (_def, uuid, _WFInstance) {

            return new Promise(function (resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;

                var taxonomyUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq 'Taxonomy']/instances[1]/uuid", _WFInstance, {})[0];

                var action = {
                    "createTaxonomy": {
                        "taxonomyUUID": taxonomyUUID
                    }

                };

                workerObject.action = action;
                worker.send(workerObject).then(function (workerSuccess) {

                    var success = util.success('Worker processes successfully.', workerSuccess);
                    resolve(success);

                }, function (workerFail) {
                    reject(workerFail);
                });
            });

        }

    }

})();

var subProcessInstance = (function () {

    return {

        setTitle: function (_def, uuid, dataValue, _WFInstance) {

            return new Promise(function (resolve, reject) {

                var spProcessObject = JSON.xpath("/instance/processes/subProcesses[uuid eq '" + uuid + "']", app.SCOPE.workflow, {})[0];
                spProcessObject.label = dataValue;

                var itemsToProcess = 1;
                var stuff = [];
                var obj = {};

                obj.model = _WFInstance.instance;
                stuff.push(obj);
                var success = util.success('Subprocess setTitle success.', _WFInstance.instance);
                resolve(success);
            });

        },

        setValidDate: function (_def, uuid, dataValue, _WFInstance) {

            return new Promise(function (resolve, reject) {

                var spProcessObject = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", app.SCOPE.workflow, {})[0];
                spProcessObject.dates.valid = dataValue;

                var itemsToProcess = 1;
                var stuff = [];
                var obj = {};

                obj.model = spProcessObject;
                stuff.push(obj);

                var success = util.success('valid date set.', _WFInstance.subprocesses);
                resolve(success);
            });

        }

    }

})();

var variables = (function () {

    return {

        setVariable: function (setVariable, _WFInstance, uuid) {

            return new Promise(function (resolve, reject) {

                helper.getNodeValue(setVariable.data, _WFInstance, uuid).then(function (dataValue) {


                    var scope = setVariable.scope;
                    var variableName = setVariable.name;
                    var variableType = setVariable.variableType;

                    var validDate = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/dates/valid", _WFInstance, {})[0];

                    switch (scope) {
                        case 'profile':

                            var profileId = _WFInstance.profile;
                            var profileVariableFileName = profileId + ':variables';
                            dao.get(profileVariableFileName).done(function (file) {

                                if (variableType == 'periodic') {

                                    // TODO: Overwrite the existing variable in case where same variable is assigned at multiple steps.

                                    var processObj = JSON.xpath("/instance/processes[subProcesses/uuid eq '" + uuid + "']", _WFInstance, {})[0];
                                    var seq = processObj.seq;
                                    var obj = {
                                        "subProcessUUID": uuid,
                                        "user": {
                                            "userName": LOCAL_SETTINGS.SUBSCRIPTIONS.username,
                                            "userId": LOCAL_SETTINGS.SUBSCRIPTIONS.userProfileId
                                        },
                                        "seq": seq,
                                        "validDate": validDate,
                                        "value": dataValue
                                    }

                                    if(file[variableName] != undefined){
                                        eval('file.' + variableName + '.push(obj)');
                                    } else {
                                        file[variableName] = [obj];
                                    }   

                                } else {
                                    file[variableName] = dataValue;
                                }

                                dao.upsert(file).done(function (data) {
                                    resolve("Variable set successfully");
                                }).fail(function (error) {
                                    reject("Failed to set Variable");
                                });

                            }).fail(function (error) {

                                var file = {
                                    "_id": profileVariableFileName
                                }
                                file.channels = app.profile.channels;

                                if (variableType == 'periodic') {
                                    var processObj = JSON.xpath("/instance/processes[subProcesses/uuid eq '" + uuid + "']", _WFInstance, {})[0];
                                    var seq = processObj.seq;
                                    file[variableName] = [{
                                        "subProcessUUID": uuid,
                                        "user": {
                                            "userName": LOCAL_SETTINGS.SUBSCRIPTIONS.username,
                                            "userId": LOCAL_SETTINGS.SUBSCRIPTIONS.userProfileId
                                        },
                                        "seq": seq,
                                        "validDate": validDate,
                                        "value": dataValue
                                    }];
                                } else {
                                    file[variableName] = dataValue;
                                }

                                dao.upsert(file).done(function (data) {
                                    resolve("Variable set successfully");
                                }).fail(function (error) {
                                    reject("Failed to set Variable");
                                });

                            });



                            break;
                        case 'subProcessInstance':

                            resolve("not implemented");

                            break;
                        case 'step':

                            resolve("not implemented");

                            break;
                        default:
                            break;
                    }

                }, function (err) {
                    reject("getNodeValue value not found.");
                });



            });

        }

    }

})();



var notification = (function () {

    return {

        email: function (email, _WFInstance, uuid) {

            return new Promise(function (resolve, reject) {
                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;

                var fromObject = {};
                fromObject.emailAddress = NOTIFICATION_FROM_ADDRESS;
                fromObject.name = NOTIFICATION_FROM_NAME;

                var getList = function (email) {

                    return new Promise(function (resolve, reject) {

                        var toArray = [];

                        if (email.recipients.role != undefined) {

                            var role = email.recipients.role.roleId;
                            var id = '';

                            if (email.recipients.role.profile == 'current') {
                                id = _WFInstance.profile;
                            } else if (email.recipients.role.profile == 'community') {
                                id = app.SCOPE.getCommunityId();
                            }

                            library.getUsersListByRole(id, role).then(function (list) {
                                if (list != undefined && list.length > 0) {
                                    for (i = 0; i < list.length; i++) {
                                        toArray.push({
                                            "name": list[i].name,
                                            "id": list[i].id
                                        });
                                    }
                                    resolve(toArray);

                                } else {
                                    reject("ERROR: No users found in role list");
                                }
                            }, function (error) {
                                reject("ERROR: Cannot fetch users from role. Exiting.");
                            });

                        } else if (email.recipients.assignedTo != undefined) {
                            toArray.push({
                                "name": "",
                                "id": assignedTo
                            });
                            resolve(toArray);
                        }

                    });



                };

                var ccArray = [];
                var bccArray = [];
                var heading = email.heading;
                var message = {

                };

                if (email.message.plain != undefined) {

                    message.plain = email.message.plain;

                } else if (email.message.rtf != undefined) {

                    message.rtf = {}

                    if (email.message.rtf.markup != undefined) {

                        message.rtf.markup = email.message.rtf.markup;

                    } else if (email.message.rtf.template != undefined) {

                        // Not implemented

                    }

                }



                var action = {
                    "notification": {
                        "email": {

                        }
                    }

                };

                getList(email).then(function (toArray) {

                    action.notification.email.from = fromObject;
                    action.notification.email.to = toArray;
                    action.notification.email.cc = ccArray;
                    action.notification.email.bcc = bccArray;
                    action.notification.email.heading = heading;
                    action.notification.email.message = message;
                    workerObject.action = action;
                    worker.send(workerObject).then(function (workerSuccess) {
                        console.log(workerObject);
                        var success = util.success('Notification Email Worker processes successfully.', workerSuccess);
                        resolve(success);

                    }, function (workerFail) {
                        reject(workerFail);
                    });

                }, function (error) {
                    reject(error);
                });

            });

        },
        sms: function (sms, _WFInstance, uuid) {

            return new Promise(function (resolve, reject) {

            });

        },
        pushAPI: function (pushAPI, _WFInstance, uuid) {

            return new Promise(function (resolve, reject) {

            });

        }


    }

})();

module.exports = {

    community: community,
    application: application,
    performance: performance,
    worker: worker,
    sdo: sdo,
    taxonomy: taxonomy,
    subProcessInstance: subProcessInstance,
    variables: variables,
    notification: notification
}
},{"./form":3,"./helper":4,"./nodeValue":6,"utility":8}],3:[function(require,module,exports){
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

    var formCreateType = action.method.form.create;

    var formType = action.method.form.type;

    var paramObject = {

        "formCreateType": formCreateType,
        "formType": formType

    }

    return new Promise(function(resolve, reject) {
        var toProcess = indicators.length;

        var subprocessType = JSON.xpath("/config/processes/subProcesses[_id eq '" + subProcessId + "']/type", _WFInstance, {})[0];

        var formCreateFn = function(indicatorType, indicatorId, validDate, instantiateSource) {

            gatekeeper.instantiate(baseUUID, indicatorType, indicatorId, _WFInstance.profile, validDate, subProcessId, subprocessType).then(function(docArray) {
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
                                gatekeeper.instantiateData(mainId, instantiateSource, indicatorModel, data.model.pending.seq, paramObject).then(function(data) {
                                    if (data[0].status == "200") {

                                        if (action.setWorkflowLabelInField != undefined && action.setWorkflowLabelInField != '') {
                                            var assignmentSetId = action.setWorkflowLabelInField.split(".")[0];
                                            if (assignmentSetId == indicatorId) {
                                                console.log(data[0]);
                                                var path = "data[0].model.model.pending.data." + action.setWorkflowLabelInField + "='" + inputData.label + "'";
                                                eval(path);
                                            }

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
            });
        };

        var instantiateSource = FROM_DEFINITION;

        for (var counter = 0; counter < indicators.length; counter++) {
            var indicatorId = indicators[counter]._id;
            var indicatorName = util.getName(indicators[counter].name, 'en');

            var source = indicators[counter].initiateData;

            var initType = '';
            if (subProcess.instanceType.newSequence != undefined) {
                initType = INSTANCE_TYPE_NEW_SEQ;
            } else if (subProcess.instanceType.newInstance != undefined) {
                initType = INSTANCE_TYPE_NEW_INS;
            }

            var indicatorDoc = {};
            if (baseUUID != undefined && baseUUID != '' && baseUUID.length > 0) {

                var sp = JSON.xpath("/subprocesses[_id eq '" + baseUUID + "']", _WFInstance, {})[0];
                
                if(subProcess.periodType.periodic == undefined){
                    sp.active = false;
                }
                
                
                
                instantiateSource = FROM_AUTHORISED;

            } else {
                var cardinality = JSON.xpath("/indicators[setId eq '" + indicatorId + "']/cardinality", app.SCOPE.APP_CONFIG, {})[0];

                if (initType == INSTANCE_TYPE_NEW_INS) {

                    if (cardinality == INDICATOR_CARDINALITY_SINGLE) {

                        var existingUUID = JSON.xpath("/indicators[category/term eq '" + indicatorId + "']/_id", _WFInstance, {});

                        if (existingUUID.length > 0) {
                            instantiateSource = FROM_AUTHORISED;
                        } else {
                            instantiateSource = FROM_DEFINITION;
                        }


                    } else {

                        instantiateSource = FROM_DEFINITION;

                    }



                } else {

                    if (cardinality == INDICATOR_CARDINALITY_SINGLE) {

                        var existingUUID = JSON.xpath("/indicators[category/term eq '" + indicatorId + "']/_id", app.SCOPE.workflow, {});

                        if (existingUUID.length > 0) {
                            instantiateSource = FROM_AUTHORISED;
                        } else {
                            instantiateSource = FROM_DEFINITION;
                        }

                    } else {

                        var path = "/indicators[category/term eq '" + indicatorId + "']/_id";
                        if (subprocessType == PROCESS_TYPE_SUBPROFILE) {
                            path = "/indicators[category/term eq '" + indicatorId + "' and id = /subprocesses[id = '" + subProcessId + "' and id = /instance/processes/subProcesses[subprofileId eq '" + app.profile.subprofileId + "']/uuid]/indicators/instances/uuid]/_id";
                        }
                        var existingUUID = JSON.xpath(path, _WFInstance, {});

                        if (existingUUID.length > 0) {
                            instantiateSource = FROM_AUTHORISED;
                        } else {
                            instantiateSource = FROM_DEFINITION;
                        }

                    }



                }


            }

            formCreateFn(initType, indicatorId, '', instantiateSource);
        }

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
            indicatorInstance.title = indicatorInstances[i].id + ' ' + title;
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
            "communityId": app.SCOPE.getCommunityId(),
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

function updateIndicator(args) {

    var _WFInstance = args[0] || {};

    var uuid = args[1] || '';
    var path = args[2] || '';
    var dataValue = args[3] || '';

    return new Promise(function(resolve, reject) {

        var subProcessInstance = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];
        var indicatorInstances = subProcessInstance.indicators;
        var setId = path.split(".", 1)[0];
        var indicatorUUID = JSON.xpath("/*[id eq '" + setId + "']/instances/uuid", indicatorInstances, {})[0];
        var indObject = JSON.xpath("/indicators[_id eq '" + indicatorUUID + "']", _WFInstance, {})[0];
        var expr = 'indObject.model.pending.data.' + path + ' = "' + dataValue + '"';
        eval(expr);
        var itemsToProcess = 1;
        var stuff = [];
        var obj = {};

        obj.model = indObject;
        stuff.push(obj);

        gatekeeper.persist(stuff).then(function(savedArray) {

            var uuidSavedIndicator = '';
            for (var c = 0; c < savedArray.length; c++) {
                if (!savedArray[c].id.endsWith(':approved')) {
                    uuidSavedIndicator = savedArray[c].id;
                }

            }

            dao.get(uuidSavedIndicator)
                .done(function(data) {
                    if (_WFInstance.indicators.length == 0) {
                        _WFInstance.indicators.push(data);
                        itemsToProcess--;
                        if (itemsToProcess == 0) {

                            var success = util.success('Indicator updated.', stuff);
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

                                    var success = util.success('Indicator updated.', stuff);
                                    resolve(success);
                                }

                            }

                        }

                        if (found == false) {
                            _WFInstance.indicators.push(data);

                            itemsToProcess--;
                            if (itemsToProcess == 0) {

                                var success = util.success('Indicator updated.', stuff);
                                resolve(success);
                            }

                        }

                    }

                }).fail(function(err) {
                    console.error(err);
                });

        }, function(error) {
            console.error(error);
        });

    });
};

function markUpdateIndicator(args) {

    var _WFInstance = args[0] || {};

    var uuid = args[1] || '';
    var status = args[2] || '';
    var indicatorSetId = args[3] || '';

    return new Promise(function(resolve, reject) {

        var indObject = JSON.xpath("/indicators[category/term eq '" + indicatorSetId + "']", _WFInstance, {})[0];
        indObject.model.pending.status = status;

        var itemsToProcess = 1;
        var stuff = [];
        var obj = {};

        obj.model = indObject;
        stuff.push(obj);

        gatekeeper.persist(stuff).then(function(savedArray) {

            var uuidSavedIndicator = '';
            for (var c = 0; c < savedArray.length; c++) {
                if (!savedArray[c].id.endsWith(':approved')) {
                    uuidSavedIndicator = savedArray[c].id;
                }

            }

            dao.get(uuidSavedIndicator)
                .done(function(data) {
                    if (_WFInstance.indicators.length == 0) {
                        _WFInstance.indicators.push(data);
                        itemsToProcess--;
                        if (itemsToProcess == 0) {

                            var success = util.success('Indicator updated.', stuff);
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

                                    var success = util.success('Indicator updated.', stuff);
                                    resolve(success);
                                }

                            }

                        }

                        if (found == false) {
                            _WFInstance.indicators.push(data);

                            itemsToProcess--;
                            if (itemsToProcess == 0) {

                                var success = util.success('Indicator updated.', stuff);
                                resolve(success);
                            }

                        }

                    }

                }).fail(function(err) {
                    console.error(err);
                });

        }, function(error) {
            console.error(error);
        });

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
    deleteProfile: deleteProfile,
    updateIndicator: updateIndicator,
    markUpdateIndicator: markUpdateIndicator

}
},{"utility":8}],4:[function(require,module,exports){
'use strict';


function getLanguageMessage(message) {

    var language = service.getLanguage();
    var res = eval("message.i18n." + language);
    return res;

};

function getNodeValue(data, _WFInstance, uuid) {

    return new Promise(function(resolve, reject) {

        if (data.value != undefined) {        
                    
            var inputDataType = data.value.datatype.dataType;
            var inputValue = data.value.data;

            if(inputDataType == 'number' ){
                resolve(Number(inputValue));
            } else if(inputDataType == 'string') {
                resolve(inputValue);
            } else if(inputDataType == 'integer'){
                resolve(parseInt(inputValue));
            } else if(inputDataType == 'decimal'){
                resolve(parseFloat(inputValue));
            } else if(inputDataType == 'date' || inputDataType == 'dateTime' ){
                resolve(inputValue);
            } else {
                // In case data type not matched
                resolve(inputValue);
            }

        } else if (data.indicatorUUID != undefined) {

            reject("ERROR: Unimplemented value type found.");

        } else if (data.indicator != undefined) {

            var indicatorUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + data.indicator.indicatorSetId + "']/instances/uuid", _WFInstance, {})[0];
            var indObject = JSON.xpath("/indicators[_id eq '" + indicatorUUID + "']", _WFInstance, {})[0];
            var xpath = '/model/pending/data/' + data.indicator.indicatorSetId + '/' + data.indicator.elementId;

            var seq = JSON.xpath("count(/subprocesses[_id eq '" + uuid + "']/preceding-sibling::node()[id = /subprocesses[_id eq '" + uuid + "']/id])", _WFInstance, {})[0] + 1;
            var subprocessType = JSON.xpath("/config/processes/subProcesses[_id eq /subprocesses[_id eq '" + uuid + "']/id]/type", _WFInstance, {})[0];

            if (subprocessType == PROCESS_TYPE_SUBPROFILE) {
                seq = JSON.xpath("count(/subprocesses[_id eq '" + uuid + "']/preceding-sibling::node()[id = /subprocesses[_id eq '" + uuid + "']/id and _id = /subprocesses[_id = /instance/processes/subProcesses[subprofileId eq '" + app.profile.subprofileId + "']/uuid]/_id])", _WFInstance, {})[0] + 1;
            }

            var replacedPath = replaceAll(xpath, '#SEQUENCE#', seq);

            var validDate = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/dates/valid", _WFInstance, {})[0];
            var concatValidDate = "'" + validDate + "'";
            var newPath = replaceAll(replacedPath, '#END_DATE#', concatValidDate);
            var dotReplaced = replaceAll(newPath, '[.]', '/');
            var retValue = JSON.xpath(dotReplaced, indObject, {})[0];

            resolve(retValue);

        } else if (data.system != undefined) {

            resolve("ERROR: Unimplemented system type found.");

        } else if (data.variable != undefined) {

            if (data.variable.profile != undefined) {

                var variableName = data.variable.profile;

                var profileId = _WFInstance.profile;
                var profileVariableFileName = profileId + ':variables';

                dao.get(profileVariableFileName).done(function(file) {

                    var obj = eval('file.' + variableName);

                    if (typeof obj == 'object') {

                        var seq = JSON.xpath("count(/subprocesses[_id eq '" + uuid + "']/preceding-sibling::node()[id = /subprocesses[_id eq '" + uuid + "']/id])", _WFInstance, {})[0] + 1;
                        var subprocessType = JSON.xpath("/config/processes/subProcesses[_id eq /subprocesses[_id eq '" + uuid + "']/id]/type", _WFInstance, {})[0];
                        if (subprocessType == PROCESS_TYPE_SUBPROFILE) {
                            seq = JSON.xpath("count(/subprocesses[_id eq '" + uuid + "']/preceding-sibling::node()[id = /subprocesses[_id eq '" + uuid + "']/id and _id = /subprocesses[_id = /instance/processes/subProcesses[subprofileId eq '" + app.profile.subprofileId + "']/uuid]/_id])", _WFInstance, {})[0] + 1;
                        }

                        var valuePath = "/" + variableName + "[seq eq '" + seq + "']/value";
                        var retValue = JSON.xpath(valuePath, file, {})[0];
                        resolve(retValue);



                    } else if (typeof obj == 'string') {

                        resolve(obj);

                    }

                }).fail(function(error) {

                    reject("ERROR: Profile variables not found");

                });

            } else {
                reject("ERROR: Unimplemented profile type found.");
            }

        }

    });



};


function replaceAll(txt, replace, with_this) {
    if (typeof txt.replace != 'function') {
        console.log(replace + ' ' + with_this);
        console.log(txt);
    }
    return txt.replace(new RegExp(replace, 'g'), with_this);
}


module.exports = {

    getLanguageMessage: getLanguageMessage,
    getNodeValue: getNodeValue

}
},{}],5:[function(require,module,exports){
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

},{"utility":8}],6:[function(require,module,exports){
'use strict';


function get() {

    return new Promise(function(resolve, reject) {

    });

};

module.exports = {

    get: get

}
},{}],7:[function(require,module,exports){
'use strict';

var util = require('utility');
var actionsModule = require('./actions');
var helper = require('./helper');
var form = require('./form');

/**
 * Process Module
 *
 * @module lib/process
 * @author Hasan Abbas
 * @version 0.2.1
 * @description Workflow implementation changed as per new schema implementation
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
function preRequisites(prerequisites, _WFInstance, spuuid) {
    return new Promise(function (resolve, reject) {
        // Uncomment below section when ready to implement
        var completed = [];
        try {
            util.syncLoop(prerequisites.length, function (loop) {
                var counter = loop.iteration();
                preRequisite(prerequisites[counter], _WFInstance, spuuid).then(function (data) {
                    // Check if all pre-requisites completed successfully.
                    completed.push(true);
                    loop.next();
                }, function (err) {
                    completed.push(false);
                    loop.break();
                    reject(err);
                });
            }, function () {
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
function preRequisite(prerequisite, _WFInstance, spuuid) {
    return new Promise(function (resolve, reject) {

       

        if (prerequisite.check.numberProcessInstances != undefined) {

            var numberProcessInstances = prerequisite.check.numberProcessInstances;
            var _filterOperator = numberProcessInstances.operator;
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

            var _subprocessId = numberProcessInstances.subProcessId;
            var _filterElement = "step/status";
            var _filterValue = numberProcessInstances.type;
            var innerXpath = "/" + _filterElement + "[. eq '" + _filterValue + "']";

            var fullPath = "count(/subprocesses[id eq '" + _subprocessId + "']" + innerXpath + ")";

            var prereqProcessType = JSON.xpath("/config/processes/subProcesses[_id eq '" + _subprocessId + "']/type", _WFInstance, {})[0];
            if (app.profile.subprofileId != undefined && app.profile.subprofileId != '' && prereqProcessType != undefined && prereqProcessType == PROCESS_TYPE_SUBPROFILE) {
                fullPath = "count(/subprocesses[id eq '" + _subprocessId + "' and _id = /instance/processes/subProcesses[subprofileId eq '" + app.profile.subprofileId + "']/uuid]" + innerXpath + ")";
            }
           
            var subjectCount = JSON.xpath(fullPath, _WFInstance, {})[0];
            var countValue = prerequisite.check.numberProcessInstances.count;
            var compare = util.compare(subjectCount, prerequisite.check.numberProcessInstances.operator, parseInt(countValue));


            if (compare) {
                var success = util.success('Pre-requisites passed.', {});
                resolve(success);
            } else {

                var message = helper.getLanguageMessage(prerequisite.message);
                var error = util.error('WFPreRequisiteError', message);
                reject(error);
            }


        } else if (prerequisite.check.variable != undefined) {

            var scope = prerequisite.check.variable.scope;
            
            if(scope  == "profile"){
                
                var profileId = _WFInstance.profile;
                var profileVariableFileName = profileId + ':variables';

                dao.get(profileVariableFileName).done(function(file) {

                    var variableName = prerequisite.check.variable.name;
                    var obj = eval('file.' + variableName);
                    var subjectValueCalculated;

                    if (typeof obj == 'object') {

                        var seq = JSON.xpath("count(/subprocesses[_id eq '" + spuuid + "']/preceding-sibling::node()[id = /subprocesses[_id eq '" + spuuid + "']/id])", _WFInstance, {})[0] + 1;
                        var subprocessType = JSON.xpath("/config/processes/subProcesses[_id eq /subprocesses[_id eq '" + spuuid + "']/id]/type", _WFInstance, {})[0];
                        if (subprocessType == PROCESS_TYPE_SUBPROFILE) {
                            seq = JSON.xpath("count(/subprocesses[_id eq '" + spuuid + "']/preceding-sibling::node()[id = /subprocesses[_id eq '" + spuuid + "']/id and _id = /subprocesses[_id = /instance/processes/subProcesses[subprofileId eq '" + app.profile.subprofileId + "']/uuid]/_id])", _WFInstance, {})[0] + 1;
                        }
                        var valuePath = "/" + variableName + "[seq eq '" + seq + "']/value";
                        subjectValueCalculated = JSON.xpath(valuePath, file, {})[0];

                    } else if (typeof obj == 'string') {

                        subjectValueCalculated = obj;

                    }


                    var inputValue = prerequisite.check.variable.value.data;
                    var inputDataType = prerequisite.check.variable.value.dataType.dataType;
                    
                    var finalValue;
                    if(inputDataType == 'number' ){
                        finalValue = Number(inputValue);
                    } else if(inputDataType == 'string') {
                        finalValue = inputValue;
                    } else if(inputDataType == 'integer'){
                        finalValue = parseInt(inputValue);
                    } else if(inputDataType == 'decimal'){
                        finalValue = parseFloat(inputValue);
                    } else if(inputDataType == 'date' || inputDataType == 'dateTime' ){
                        finalValue = inputValue;
                    }

                    var compare = util.compare(subjectValueCalculated, prerequisite.check.variable.operator, finalValue);
                    if (compare) {
                        var success = util.success('Variable Pre-requisites passed.', {});
                        resolve(success);
                    } else {

                        var message = helper.getLanguageMessage(prerequisite.message);
                        var error = util.error('WFPreRequisiteError', message);
                        reject(error);
                    }
                }).fail(function(error) {

                    reject("ERROR: Profile variables not found");

                });

            } else {
                reject("ERROR: Scope '"+ scope +"' not implemented in pre-requisites");
            }
        } else {

            var error = util.error('WFPreRequisiteError', 'Pre-requisite type not defined.');
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
    return new Promise(function (resolve, reject) {
        var completed = [];
        try {
            util.syncLoop(preActions.length, function (loop) {
                var counter = loop.iteration();
                //TODO HASAN
                //action(actions[counter], processId, processSeq, subProcessId, subProcessSeq, subProcess, step, _WFInstance, data, uuid)

                action(preActions[counter],"","","","",{}, {},_WFInstance, {}, app.SCOPE.processUUID).then(function (data) {
                    // Check if all pre-requisites completed successfully.
                    completed.push(true);
                    loop.next();
                }, function (err) {
                    completed.push(false);
                    loop.break();
                    reject(err);
                });
            }, function () {
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
        _WFInstance.subprocesses.filter(function (subProcess) {
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
    _WFInstance.instance.processes.filter(function (objProcess) {
        if (objProcess.id == processId && objProcess.seq == processSeq) {
            var spLength = objProcess.subProcesses.length;
            objProcess.subProcesses.filter(function (objSubProcess) {
                if (objSubProcess.id == subProcessId && objSubProcess.seq == subProcessSeq) {
                    var uuid = objSubProcess.uuid;
                    _WFInstance.subprocesses.filter(function (subProcessItem) {
                        if (subProcessItem._id == uuid) {
                            subProcess = subProcessItem;
                        }

                    })
                }

            })
        }

    });
    // Get the current subProcess configuration
    _WFInstance.config.processes.filter(function (processConfig) {
        if (processConfig._id == processId) {
            processConf = processConfig;
            processConfig.subProcesses.filter(function (subProcessConfig) {
                if (subProcessConfig._id == subProcessId) {
                    subProcessConf = subProcessConfig;
                }

            })
        }

    });

    //TODO: Change required to move isActive to subProcess file.Here
    var groupKey = '';
    var baseUUID = data.baseUUID;
    if (baseUUID != undefined && baseUUID != '' && baseUUID.length > 0) {
        var previousObject = JSON.xpath("/subprocesses[_id eq '" + baseUUID + "']", _WFInstance, {})[0];
        groupKey = previousObject.groupKey;
    } else {
        groupKey = generateUUID();
    }

    var subProcessObjectId = generateUUID();
    var model = {
        _id: subProcessObjectId,
        id: subProcessId,
        type: 'workflowInstanceSubProcess',
        seq: subProcessSeq,
        initiated: false,
        dates: {
            created: '',
            valid: '',
            start: '',
            due: '',
            closed: ''
        },
        complete: false,
        indicators: [],
        step: {},
        active: true,
        groupKey: groupKey,
        channels: [
            "community_" + app.SCOPE.getCommunityId(),
            "profile_" + app.SCOPE.profileId,
            "application_" + app.SCOPE.applicationId,
            "community_" + app.SCOPE.getCommunityId() + "_application_" + app.SCOPE.applicationId
        ],
        history: []
    };

    _WFInstance.subprocesses.push(model);
    // Return a promise
    return new Promise(function (resolve, reject) {
        // Catch all uncaught errors
        try {
            // 1. Process the pre-actions
            var preActionsConf = processConf.preActions;
            //action(actions[counter], processId, processSeq, subProcessId, subProcessSeq, subProcess, step, _WFInstance, data, uuid)
            preActions(preActionsConf, _WFInstance).then(function (result) {
                // 2. Process the pre-requisites
                var prerequisiteConf = processConf.prerequisites;
                preRequisites(prerequisiteConf, _WFInstance, subProcessObjectId).then(function (result) {
                    // 3. Initiate the subProcess
                    var initiateConf = subProcessConf.initiate;
                    initiate(initiateConf, subProcess, data).then(function (result) {
                        //Update the subProcess model
                        model.initiated = result.data.initiated;
                        model.dates = result.data.dates;
                        // Execute the first step
                        var stepId = subProcessConf.steps[0]._id;
                        var transitionId = subProcessConf.steps[0].transition[0]._id;
                        var stepSeq = 1;
                        step(processId, processSeq, subProcessId, subProcessSeq, stepId, stepSeq, data, _WFInstance, subProcessObjectId)
                            .then(function (result) {
                                model.step = result.data;
                                indicators(subProcessConf.indicators, _WFInstance, model._id).then(function (result1) {
                                    model.indicators = result1.data;
                                    // Execute the transitions, if auto
                                    //Subprocess postActions removed from here as they should be executed at the end of the subProcess, means at last step after transition, just before finish.

                                     // Can add history object here in case for first step, i.e initialisation
                                    // model.history.push(result.data);


                                    var success = util.success(result1.message, model);
                                    resolve(success);


                                }, function (err) {
                                    reject(err);
                                })
                            }, function (err) {
                                reject(err);
                            })
                    }, function (err) {
                        _WFInstance.subprocesses = _WFInstance.subprocesses.filter(function (obj) {
                            return !(obj._id == subProcessObjectId);
                        });
                        reject(err);
                    })
                }, function (err) {
                    _WFInstance.subprocesses = _WFInstance.subprocesses.filter(function (obj) {
                        return !(obj._id == subProcessObjectId);
                    });
                    reject(err);
                })
            }, function (err) {
                _WFInstance.subprocesses = _WFInstance.subprocesses.filter(function (obj) {
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
            start: '',
            due: '',
            closed: ''
        }

    };

    return new Promise(function (resolve, reject) {
        var init = function () {

            if (initiate.user != undefined) {
                result.dates.created = data.createdDate;
                if (initiate.user.validDate._type == 'userSelected' || initiate.user.validDate._type == 'autoSelected') {
                    if (data.validDate !== undefined) {
                        result.dates.valid = data.validDate;
                    } else {
                        util.warn('WFInitiateError', 'No valid date passed in - {data.validDate}');
                    }

                }

                if (initiate.user.dueDate._type == 'userSelected' || initiate.user.dueDate._type == 'autoSelected') {
                    if (data.dueDate !== undefined) {
                        result.dates.due = data.dueDate;
                    } else {
                        util.warn('WFInitiateError', 'No due date passed in - {data.dueDate}');
                    }

                }

                result.dates.start = data.firstDate;



                result.initiated = true;
                var success = util.success('Sub-Process initiate completed successfully.', result);
                resolve(success);

            } else if (initiate.auto != undefined) {

                /*
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
                resolve(success);*/

            } else {

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
function step(processId, processSeq, subProcessId, subProcessSeq, stepId, stepSeq, data, _WFInstance, spuuid) {

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
    return new Promise(function (resolve, reject) {
        try {
            //Get the current subProcess instance data
            _WFInstance.instance.processes.filter(function (objProcess) {
                if (objProcess.id == processId && objProcess.seq == processSeq) {
                    objProcess.subProcesses.filter(function (objSubProcess) {
                        if (objSubProcess.id == subProcessId && objSubProcess.seq == subProcessSeq) {
                            uuid = objSubProcess.uuid;
                        }

                    })
                }

            })
            _WFInstance.subprocesses.filter(function (subProcessItem) {
                if (subProcessItem._id == uuid) {
                    instSubProcess = subProcessItem;
                }

            })
            _WFInstance.config.processes.filter(function (objProcess) {
                if (objProcess._id == processId) {
                    objProcess.subProcesses.filter(function (objSubProcess) {
                        if (objSubProcess._id == subProcessId) {
                            subProcess = objSubProcess;
                            objSubProcess.steps.filter(function (objStep) {
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

            var instanceStatus = '';
            if (step.setInstanceStatusTo.NotStarted != undefined) {
                instanceStatus = "NotStarted";
            } else if (step.setInstanceStatusTo.Created != undefined) {
                instanceStatus = "Created";
            } else if (step.setInstanceStatusTo.InProgress != undefined) {
                instanceStatus = "InProgress";
            } else if (step.setInstanceStatusTo.Submitted != undefined) {
                instanceStatus = "Submitted";
            } else if (step.setInstanceStatusTo.Complete != undefined) {
                instanceStatus = "Complete";
            }

            var language = service.getLanguage();

            model.status = instanceStatus;
            model.message = eval("step.setInstanceStatusTo." + instanceStatus + ".label.i18n." + language);
            model.comment = data.comment !== undefined ? data.comment : '';
            var indicators = instSubProcess !== undefined ? instSubProcess.indicators : [];
            indicatorDocs(processId, indicators, model, _WFInstance).then(function (result) {
                uuid = spuuid;

                if (step.function.actions != undefined) {
                    actions(step.function.actions, processId, processSeq, subProcessId, subProcessSeq, subProcess, model, _WFInstance, data, spuuid)
                        .then(function (result) {

                            // Add set object to subprocess history object

                           
                          //  var spinstanceObject = JSON.xpath("/subprocesses[_id eq '"+ spuuid +"']", _WFInstance, {})[0];
                         //   spinstanceObject.history.push(model);



                            // Execute the transitions, if auto
                            var transitionId = step.transition[0]._id;
                            transition(processId, processSeq, subProcessId, subProcessSeq, stepId, transitionId, data, _WFInstance, spuuid, model).then(function (result) {
                                var success = util.success('Transition completed successfully.', result.data.step);

                                resolve(success);

                            }, function (err) {
                                reject(err);
                            });

                        }, function (err) {
                            reject(err);
                        })
                    // Else tasks are sprecified, execute them
                } else if (step.function.task != undefined) {
                    // Make assignments
                    task(processId, processSeq, step.function.task, spuuid, model).then(function (result) {

                        // Add set object to subprocess history object

                        
                        var success = util.success('Task awaiting user action.', model);
                        resolve(success);
                    }, function (err) {
                        reject(err);
                    });

                }

            }, function (err) {
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
    return new Promise(function (resolve, reject) {
        try {
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
    return new Promise(function (resolve, reject) {
        try {
            var uuid = '';
            // Get the current subProcess instance data
            _WFInstance.instance.processes.filter(function (objProcess) {
                if (objProcess.id == processId && objProcess.seq == processSeq) {
                    objProcess.subProcesses.filter(function (objSubProcess) {
                        if (objSubProcess.id == subProcessId && objSubProcess.seq == subProcessSeq) {
                            uuid = objSubProcess.uuid;
                        }

                    });
                }

            });
            _WFInstance.subprocesses.filter(function (subProcessItem) {
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
                                    doc.workflows.filter(function (workflow) {
                                        if (workflow.id == _WFInstance.config._id) {
                                            workflow.processes.filter(function (processItem) {
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
    return new Promise(function (resolve, reject) {
        try {
            // Update the indicator sections of the subProcess
            if (indicators == undefined) {
                var error = util.error('WFIndicatorsUpdate', 'Indicators parameter is required. - Value: ' + indicators)
                reject(err);
            } else {
                for (var i = 0; i < indicators.length; i++) {
                    var indicator = indicators[i];
                    for (var j = 0; j < indicator.instances.length; j++) {
                        var instance = indicator.instances[j];
                        for (var k = 0; k < _WFInstance.indicators.length; k++) {
                            var doc = _WFInstance.indicators[k];
                            if (instance.uuid == doc._id) {
                                doc.workflows.filter(function (workflow) {
                                    if (workflow.id == _WFInstance.config._id) {
                                        workflow.processes.filter(function (processItem) {
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
    return new Promise(function (resolve, reject) {
        util.syncLoop(actions.length, function (loop) {
            var counter = loop.iteration();
            action(actions[counter], processId, processSeq, subProcessId, subProcessSeq, subProcess, step, _WFInstance, data, uuid)
                .then(function (result) {
                    var retAction = {
                        id: actions[counter]._id,
                        seq: counter,
                        data: result
                    };

                    arrActions.push(retAction);
                    loop.next();
                }, function (err) {
                    loop.break();
                    reject(err);
                });
        }, function () {
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
    return new Promise(function (resolve, reject) {

        if (action.method != undefined) {
            var methodPossibleItems = ["form", "indicator", "profile", "subProcessInstance", "step", "community", "application", "user", "sdo", "performance", "taxonomy", "variables", "notification"];
            switch (propertyExists(action.method, methodPossibleItems)) {
                case 'form':
                    if (action.method.form.create != undefined) {

                        var args = [];
                        args.push(processId);
                        args.push(subProcess);
                        args.push(step);
                        args.push(action);
                        args.push(processSeq);
                        args.push(subProcessSeq);

                        args.push(_WFInstance);
                        args.push(data.createType);
                        args.push(uuid);
                        args.push(data.baseUUID);
                        args.push(data);

                        form.create(args).then(function (result) {
                            resolve(result.data);
                        }, function (err) {
                            reject(err);
                        });

                    } else if (action.method.form.authorise != undefined) {

                        var args = [];
                        args.push(processId);
                        args.push(subProcess);
                        args.push(processSeq);
                        args.push(subProcessSeq);
                        args.push(_WFInstance);
                        args.push(data.createType);
                        args.push(uuid);
                        args.push(data.baseUUID);
                        args.push(data);
                        form.authorise(args).then(function (result) {
                            resolve(result.data);
                        }, function (err) {
                            reject(err);
                        });

                    } else if (action.method.form.undraft != undefined) {
                        var args = [];
                        args.push(_WFInstance);
                        args.push(data.createType);
                        args.push(uuid);
                        args.push(data.baseUUID);
                        args.push(data);
                        form.setUnDraft(args).then(function (result) {
                            resolve(result.data);
                        }, function (err) {
                            reject(err);
                        });

                    } else if (action.method.form.draft != undefined) {
                        var args = [];
                        args.push(_WFInstance);
                        args.push(data.createType);
                        args.push(uuid);
                        args.push(data.baseUUID);
                        args.push(data);
                        form.setDraft(args).then(function (result) {
                            resolve(result.data);
                        }, function (err) {
                            reject(err);
                        });

                    } else if (action.method.form.close != undefined) {

                        var args = [];
                        args.push(subProcess.indicators);
                        args.push(_WFInstance);
                        args.push(data.createType);
                        args.push(uuid);
                        args.push(data.baseUUID);
                        args.push(data);
                        form.close(args).then(function (result) {
                            resolve(result.data);
                        }, function (err) {
                            reject(err);
                        });

                    }

                    break;
                case 'indicator':
                    if (action.method.indicator.create != undefined) {

                    } else if (action.method.indicator.instantiate != undefined) {

                    } else if (action.method.indicator.setValue != undefined) {

                        var path = action.method.indicator.setValue.path;

                        helper.getNodeValue(action.method.indicator.setValue.data, _WFInstance, uuid).then(function (dataValue) {

                            var args = [];
                            args.push(_WFInstance);
                            args.push(uuid);
                            args.push(path);
                            args.push(dataValue);

                            form.updateIndicator(args).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });

                        }, function (err) {
                            reject(err);
                        });


                    } else if (action.method.indicator.updateStatus != undefined) {

                        var indicatorSetId = action.method.indicator.indicatorSetId;
                        var args = [];
                        args.push(_WFInstance);
                        args.push(uuid);

                        if (action.method.indicator.updateStatus != undefined) {
                            var status = action.method.indicator.updateStatus;
                            args.push(status);
                            args.push(indicatorSetId);
                            // Keep indicator functions in indiator file istead of form file.
                            form.markUpdateIndicator(args).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });

                        } else {
                            resolve("Action indicator sub type not found.");
                        }

                    }

                    break;
                case 'profile':
                    if (action.method.profile.create != undefined) {

                        var args = [];
                        args.push(processId);
                        args.push(_WFInstance);
                        args.push(data.createType);
                        args.push(uuid);
                        args.push(data.baseUUID);
                        args.push(data);
                        form.createProfile(args).then(function (result) {
                            resolve(result.data);
                        }, function (err) {
                            reject(err);
                        });

                    } else if (action.method.profile.X != undefined) {

                    }

                    break;
                case 'subProcessInstance':
                    var spPossibleItems = ["instantiate", "authorise", "close", "setVariable", "setStatusTo", "setStatusMsgTo", "setTitle", "setValidDate"];
                    switch (propertyExists(action.method.subProcessInstance, spPossibleItems)) {

                        case 'setTitle':
                            helper.getNodeValue(action.method.subProcessInstance.setTitle, _WFInstance, uuid).then(function (dataValue) {

                                actionsModule.subProcessInstance.setTitle(action.method.subProcessInstance.setTitle, uuid, dataValue, _WFInstance).then(function (result) {
                                    resolve(result.data);
                                }, function (err) {
                                    reject(err);
                                });

                            }, function (err) {
                                reject(err);
                            });

                            //update subprocess label in workflow instance process object: TODO
                            break;

                        case 'setValidDate':
                            helper.getNodeValue(action.method.subProcessInstance.setValidDate, _WFInstance, uuid).then(function (dataValue) {
                                actionsModule.subProcessInstance.setValidDate(action.method.subProcessInstance.setValidDate, uuid, dataValue, _WFInstance).then(function (result) {
                                    resolve(result.data);
                                }, function (err) {
                                    reject(err);
                                });
                            }, function (err) {
                                reject(err);
                            });

                            //update subprocess label in workflow instance process object: TODO
                            break;

                        default:
                            reject("No method found from implemented list in subprocess action.");
                            break;
                    }

                    break;
                case 'step':
                    break;
                case 'community':
                    var communityPossibleItems = ["createCommunity", "releaseAdoptedApplication", "userJoinCommunity"];
                    switch (propertyExists(action.method.community, communityPossibleItems)) {

                        case 'createCommunity':
                            return actionsModule.community.createCommunity(action.method.community.createCommunity, uuid, _WFInstance).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });

                        case 'releaseAdoptedApplication':
                            return actionsModule.community.releaseAdoptedApplication(action.method.community.releaseAdoptedApplication, uuid, _WFInstance).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });

                        case 'userJoinCommunity':
                            return actionsModule.community.userJoinCommunity(action.method.community.userJoinCommunity, uuid, _WFInstance).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
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
                            return actionsModule.application.createAppDefinition(action.method.application.createAppDefinition, uuid, _WFInstance).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });

                        case 'buildApplication':
                            return actionsModule.application.buildApplication(action.method.application.buildApplication, uuid, _WFInstance).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });

                        case 'applicationAdoption':
                            return actionsModule.application.applicationAdoption(action.method.application.applicationAdoption, uuid, _WFInstance).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
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
                    var sdoPossibleItems = ["create"];
                    switch (propertyExists(action.method.sdo, sdoPossibleItems)) {

                        case 'create':
                            return actionsModule.sdo.create(action.method.sdo.create, uuid, _WFInstance).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });

                        default:
                            reject("No method found from implemented list.");
                            break;
                    }

                    break;

                case 'performance':
                    var performancePossibleItems = ["create", "configureNode", "unlockPeriod", "lockPerformanceModel", "setModelStatus"];
                    switch (propertyExists(action.method.performance, performancePossibleItems)) {

                        case 'create':
                            return actionsModule.performance.create(action.method.performance.create, uuid, _WFInstance).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });
                        case 'configureNode':
                            return actionsModule.performance.configureNode(action.method.performance.configureNode, uuid, _WFInstance).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });
                        case 'unlockPeriod':
                            return actionsModule.performance.unlockPeriod(action.method.performance.unlockPeriod, uuid, _WFInstance).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });
                        case 'setModelStatus':
                            return actionsModule.performance.setModelStatus(action.method.performance.setModelStatus, uuid, _WFInstance).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });
                        case 'lockPerformanceModel':
                            return actionsModule.performance.lockPerformanceModel(action.method.performance.lockPerformanceModel, uuid, _WFInstance).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });


                        default:
                            reject("No method found from implemented list.");
                            break;
                    }

                    break;

                case 'taxonomy':
                    var taxonomyPossibleItems = ["create"];
                    switch (propertyExists(action.method.taxonomy, taxonomyPossibleItems)) {

                        case 'create':
                            return actionsModule.taxonomy.create(action.method.taxonomy.create, uuid, _WFInstance).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });

                        default:
                            reject("No method found from implemented list.");
                            break;
                    }

                    break;
                case 'variables':
                    var variablesPossibleItems = ["setVariable"];
                    switch (propertyExists(action.method.variables, variablesPossibleItems)) {

                        case 'setVariable':

                            return actionsModule.variables.setVariable(action.method.variables.setVariable, _WFInstance, uuid).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });

                        default:
                            reject("No method found from implemented list.");
                            break;
                    }

                    break;
                case 'notification':
                    var notificationPossibleItems = ["email", "sms", "pushAPI"];
                    switch (propertyExists(action.method.notification, notificationPossibleItems)) {

                        case 'email':

                            return actionsModule.notification.email(action.method.notification.email, _WFInstance, uuid).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });

                        case 'sms':
                            reject("SMS functionality not implemented");
                            break;

                        case 'pushAPI':
                            reject("pushAPI functionality not implemented");
                            break;

                        default:
                            reject("No method found from implemented list.");
                            break;
                    }

                    break;


                default:
                    reject("method not defined in configuration");
                    break;
            }

        } else {
            reject("No method found from implemented list.");

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

    return new Promise(function (resolve, reject) {

        var _WFInstance = app.SCOPE.workflow;
        var preActionsConf = task.preActions;
        preActions(preActionsConf, _WFInstance).then(function (preActionResult) {

            var list = [];
            if (task.assign.role != undefined) {
                var assignType = 'profileRole';
                var profileId = _WFInstance.profile;
                var id = '';
                if (task.assign.role.profile == 'current') {
                    id = _WFInstance.profile;
                } else if (task.assign.role.profile == 'community') {
                    id = app.SCOPE.getCommunityId();
                }

                var role = task.assign.role.roleId;

                library.getUsersListByRole(id, role).then(function (list) {
                    if (list != undefined) {



                        if (list.length > 1) {


                            // New requirement here will automatically assign the step to current user if this user falls under the provided group.
                            // RULE INTRODUCED ON 16-MARCH-2017
                            // If current user lies within the specified role, it will be automatically assigned to that user.
                            
                            var isCurrentUserExistInGivenRole = false;

                            var rolesObject = library.getCurrentUserRoles();

                            if (id == app.SCOPE.getCommunityId()) {
                                var isCurrentUserRole = rolesObject.community.indexOf(role);
                                if (isCurrentUserRole > -1) {
                                    
                                    isCurrentUserExistInGivenRole = true;
                                } else {
                                    isCurrentUserExistInGivenRole = false;
                                }
                            }
                            else {
                                var isCurrentUserRole = rolesObject.profile.indexOf(role);
                                var isCurrentUserImplicitRole = rolesObject.implicit.indexOf(role);
                                if ((isCurrentUserRole > -1 || isCurrentUserImplicitRole > -1)) {
                                   
                                    isCurrentUserExistInGivenRole = true;
                                } else {

                                    isCurrentUserExistInGivenRole = false;

                                }
                            }

                            if (isCurrentUserExistInGivenRole){

                                var assignee = model.assignedTo;
                                assignee.name = LOCAL_SETTINGS.SUBSCRIPTIONS.username + "";
                                assignee.userId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId + "";

                            }



                            var assignment = '';
                            if (task.assign.assignment != undefined) {

                                var assignment = model.assignment;
                                var accept = {
                                    "show": task.assign.assignment.accept.show,
                                    "label": _getNameByLang(task.assign.assignment.accept.label.i18n)
                                };

                                assignment.accept = accept;
                                assignment.message = _getNameByLang(task.assign.assignment.message.i18n);
                                var reject = {
                                    "show": task.assign.assignment.reject.show,
                                    "label": _getNameByLang(task.assign.assignment.reject.label.i18n)
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
                            if (isCurrentUserExistInGivenRole) {
                                //Fire Pre-workActions here

                                var processId = JSON.xpath("/instance/processes[subProcesses/uuid eq '" + spuuid + "']/id", _WFInstance, {})[0];
                                var subProcessId = JSON.xpath("/instance/processes/subProcesses[uuid eq '" + spuuid + "']/id", _WFInstance, {})[0];
                                var stepId = JSON.xpath("/subprocesses[_id eq '" + spuuid + "']/step/id", _WFInstance, {})[0];
                                var stepObject = JSON.xpath("/processes[_id eq '" + processId + "']/subProcesses[_id eq '" + subProcessId + "']/steps[_id eq '" + stepId + "']", _WFInstance.config, {})[0];


                                if (task.preWorkActions != undefined) {

                                    var preWorkActionsObj = task.preWorkActions;
                                    preWorkActions(preWorkActionsObj, _WFInstance).then(function (success) {
                                        resolve('Assignment is made. Pre work actions found and executed ');
                                    }, function (err) {
                                        reject(err);
                                    });

                                } else {
                                    resolve('Assignment is made. No pre work actions found. ');
                                }

                            } else {

                                resolve('Notifications request submitted for acceptance.');

                            }
                            

                        } else if (list.length == 1) {
                            // Implement here preWorkAction as this is automatically assigned in case of 1 user and will not go trough acceptance function.

                            var userId = list[0].id;
                            var username = list[0].name;
                            var assignee = model.assignedTo;
                            assignee.name = username + "";
                            assignee.userId = userId + "";

                            var assignment = '';
                            if (task.assign.assignment != undefined) {

                                var assignment = model.assignment;
                                var accept = {
                                    "show": task.assign.assignment.accept.show,
                                    "label": _getNameByLang(task.assign.assignment.accept.label.i18n)
                                };

                                assignment.accept = accept;
                                assignment.message = _getNameByLang(task.assign.assignment.message.i18n);
                                var reject = {
                                    "show": task.assign.assignment.reject.show,
                                    "label": _getNameByLang(task.assign.assignment.reject.label.i18n)
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
                                //Fire Pre-workActions here

                                var processId = JSON.xpath("/instance/processes[subProcesses/uuid eq '" + spuuid + "']/id", _WFInstance, {})[0];
                                var subProcessId = JSON.xpath("/instance/processes/subProcesses[uuid eq '" + spuuid + "']/id", _WFInstance, {})[0];
                                var stepId = JSON.xpath("/subprocesses[_id eq '" + spuuid + "']/step/id", _WFInstance, {})[0];
                                var stepObject = JSON.xpath("/processes[_id eq '" + processId + "']/subProcesses[_id eq '" + subProcessId + "']/steps[_id eq '" + stepId + "']", _WFInstance.config, {})[0];

                                if (task.preWorkActions != undefined) {

                                    var preWorkActionsObj = task.preWorkActions;
                                    preWorkActions(preWorkActionsObj, _WFInstance).then(function (success) {
                                         resolve('Assigned to the only user in role. Pre work actions executed');
                                    }, function (err) {
                                        reject(err);
                                    });

                                } else {
                                    resolve('Assigned to the only user in role. No pre work actions found.');
                                }

                        } else {

                            var assignee = model.assignedTo;
                            assignee.name = "";
                            assignee.userId = "";

                            var assignment = '';
                            if (task.assign.assignment != undefined) {

                                var assignment = model.assignment;
                                var accept = {
                                    "show": task.assign.assignment.accept.show,
                                    "label": _getNameByLang(task.assign.assignment.accept.label.i18n)
                                };

                                assignment.accept = accept;
                                assignment.message = _getNameByLang(task.assign.assignment.message.i18n);
                                var reject = {
                                    "show": task.assign.assignment.reject.show,
                                    "label": _getNameByLang(task.assign.assignment.reject.label.i18n)
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
                            //Will be fired from TakeAssignment path
                            resolve("No users found in list. Assigning blank ");

                        }

                    } else {
                        console.log('Error in getUsersListByRole undefined');
                        reject(err);
                    }

                }, function (err) {
                    console.log('Error in getUsersListByRole');
                    reject(err);
                });
            } else if (task.assign.swimlane != undefined) {
                resolve('swimlane');
                console.log('Swimlane implementation !!');
            }


        }, function (err) {

            reject(err);

        });




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
function transition(processId, processSeq, subProcessId, subProcessSeq, stepId, transitionId, data, _WFInstance, spuuid, model) {
    return new Promise(function (resolve, reject) {
        try {
            var stepSeq = 0;
            var nextStepId = '';
            var nextStepSeq = 0;
            var subProcess = [];
            var currentProcess = _WFInstance.config.processes.filter(function (objProcess) {
                if (objProcess._id == processId) {
                    return objProcess;
                }

            });
            var currentSubProcess = currentProcess[0].subProcesses.filter(function (objSubProcess) {
                if (objSubProcess._id == subProcessId) {
                    return objSubProcess;
                }

            });
            var currentStep = currentSubProcess[0].steps.filter(function (objStep) {
                if (objStep._id == stepId) {
                    return objStep;
                }

            });
            var transition = currentStep[0].transition.filter(function (objTransition) {
                if (objTransition._id == transitionId) {
                    return objTransition;
                }

            });
            for (var i = 0; i < currentSubProcess[0].steps.length; i++) {
                if (currentSubProcess[0].steps[i]._id == stepId) {
                    stepSeq = parseInt(currentSubProcess[0].steps[i]._seq);
                }

            }

            currentSubProcess[0].steps.filter(function (stepItem) {
                nextStepSeq = stepSeq + 1;
                if (parseInt(stepItem._seq) == nextStepSeq) {
                    nextStepId = stepItem._id;
                }

            })
            _WFInstance.instance.processes.filter(function (objProcess) {
                if (objProcess.id == processId && objProcess.seq == processSeq) {
                    objProcess.subProcesses.filter(function (objSubProcess) {
                        if (objSubProcess.id == subProcessId && objSubProcess.seq == subProcessSeq) {
                            var uuid = objSubProcess.uuid;
                            spuuid = uuid;
                            _WFInstance.subprocesses.filter(function (subProcessItem) {
                                if (subProcessItem._id == uuid) {
                                    subProcess = subProcessItem;
                                }

                            })
                        }

                    })
                }

            });
            var maxSteps = currentSubProcess[0].steps.length;

                
                var spinstanceObject = JSON.xpath("/subprocesses[_id eq '"+ spuuid +"']", _WFInstance, {})[0];
                var spInstanceStepObject = JSON.xpath("/subprocesses[_id eq '"+ spuuid +"']/step", _WFInstance, {})[0];

                // Adding step Object in subprocess history From second step. As first step is added at subProcess() function 
                if (spinstanceObject.history == undefined) {
                    spinstanceObject.history = [];
                }
                if(model != undefined && Object.keys(model).length > 0){
                    spinstanceObject.history.push(model);
                } else {
                    spinstanceObject.history.push(spInstanceStepObject);
                }


                //spinstanceObject.history.push(model);
                
                if (transition[0].transitionAction.goToStep != undefined) {

                    var nextSeq = parseInt(currentStep[0]._seq) + parseInt(transition[0].transitionAction.goToStep.default);
                    var nextId = '';
                    currentSubProcess[0].steps.filter(function (stepItem) {

                        if (parseInt(stepItem._seq) == nextStepSeq) {
                            nextId = stepItem._id;
                        }

                    });

                    step(processId, processSeq, subProcessId, subProcessSeq, nextId, nextSeq, data, _WFInstance, spuuid).then(function (result) {
                        if (nextSeq == maxSteps) {
                            var success = util.success('All Step transitions have completed successfully.', {
                                subProcessComplete: true,
                                step: result.data
                            });
                            resolve(success);
                        } else {

                            var success = util.success('Step transition completed successfully.', {
                                subProcessComplete: false,
                                step: result.data
                            });
                            resolve(success);

                        }

                    }, function (err) {
                        reject(err);
                    });

                } else if (transition[0].transitionAction.goToStepId != undefined) {

                    var goToStepId = transition[0].transitionAction.goToStepId.stepId;
                    var goToStepSeq = 1;

                    currentSubProcess[0].steps.filter(function (stepItem) {
                        if (stepItem._id == goToStepId) {
                            goToStepSeq = parseInt(stepItem._seq);
                        }

                    });

                    step(processId, processSeq, subProcessId, subProcessSeq, goToStepId, goToStepSeq, data, _WFInstance, spuuid).then(function (result) {
                        if (goToStepSeq == maxSteps) {

                            var success = util.success('All Step transitions have completed successfully.', {
                                subProcessComplete: true,
                                step: result.data
                            });
                            resolve(success);

                        } else {

                            var success = util.success('Step transition completed successfully.', {
                                subProcessComplete: false,
                                step: result.data
                            });
                            resolve(success);

                        }

                    }, function (err) {
                        reject(err);
                    });
                } else if (transition[0].transitionAction.stop != undefined) {

                    // As this is the last step (where stop is defied) , subProcess postActions should come here.

                    var postActionsConf = currentProcess[0].postActions;
                    postActions(postActionsConf, _WFInstance).then(function (result) {

                        var success = util.success('Step transition completed successfully.Workflow stopped.', {
                            subProcessComplete: true,
                            step: model
                        });
                        resolve(success);

                    }, function (err) {
                        reject(err);
                    });

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
    return new Promise(function (resolve, reject) {
        var completed = [];
        try {
            util.syncLoop(postActions.length, function (loop) {
                var counter = loop.iteration();
                action(postActions[counter],"","","","",{}, {},_WFInstance, {}, app.SCOPE.processUUID).then(function (data) {
                    // Check if all pre-requisites completed successfully.
                    completed.push(true);
                    loop.next();
                }, function (err) {
                    completed.push(false);
                    loop.break();
                    reject(err);
                });
            }, function () {
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

function _getNameByLang(obj) {
    var lang = service.getLanguage();
    var expr = 'obj.' + lang;
    return eval(expr);
};





/**
 * Process preWorkActions
 *
 * @param {object} preWorkActions - the preWorkActions config data
 *
 * @example ''
 *
 * @return ''
 *
 */

function preWorkActions(preWorkActions, _WFInstance) {
    return new Promise(function (resolve, reject) {
        var completed = [];
        try {
            util.syncLoop(preWorkActions.length, function (loop) {
                var counter = loop.iteration();
                action(preWorkActions[counter],"","","","",{}, {},_WFInstance, {}, app.SCOPE.processUUID).then(function (data) {
                    // Check if all pre-requisites completed successfully.
                    completed.push(true);
                    loop.next();
                }, function (err) {
                    completed.push(false);
                    loop.break();
                    reject(err);
                });
            }, function () {
                if (completed.every(Boolean)) {
                    var success = util.success('PreWork-actions completed successfully.', {});
                    resolve(success);
                } else {
                    var error = util.error('WFPreActionsError', 'Not all pre-work-actions passed.');
                    reject(error);
                }

            });
        } catch (err) {
            reject(err);
        }

    });
};


module.exports = {

    preRequisites: preRequisites,
    preActions: preActions,
    postActions: postActions,
    preWorkActions: preWorkActions,
    subProcess: subProcess,
    indicatorDocs: indicatorDocs,
    task: task,
    transition: transition,
    assignUser: assignUser

}
},{"./actions":2,"./form":3,"./helper":4,"utility":8}],8:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsImxpYi9hY3Rpb25zLmpzIiwibGliL2Zvcm0uanMiLCJsaWIvaGVscGVyLmpzIiwibGliL2ludGVyZmFjZS5qcyIsImxpYi9ub2RlVmFsdWUuanMiLCJsaWIvcHJvY2Vzcy5qcyIsIm5vZGVfbW9kdWxlcy91dGlsaXR5L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1dUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsOEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdnpCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5OURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUHJvY2VzcyA9IHJlcXVpcmUoJy4vbGliL3Byb2Nlc3MnKTtcbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbGl0eScpO1xudmFyIHVzZXJJbnRlcmZhY2UgPSByZXF1aXJlKCcuL2xpYi9pbnRlcmZhY2UnKTtcbnZhciBoZWxwZXIgPSByZXF1aXJlKCcuL2xpYi9oZWxwZXInKTtcblxuXG4vKmdsb2JhbHMgKi9cblxuLyoqXG4gKiBBIG5ldyBXb3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZSBjb250YWlucyB0aGUgcmVmZXJlbmNlIHRvIHRoZSBhcHBsaWNhdGlvblxuICogYW5kIGFzc29jaWF0ZWQgcHJvZmlsZSB3aGljaCBpdCByZXF1aXJlcyBhcyB0aGUgZmlyc3QgdHdvIHBhcmFtZXRlcnMuIEl0IGFsc29cbiAqIHJlcXVpcmVzIGEgd29ya2Zsb3cgY29uZmlndXJhdGlvbiwgYXMgdGhlIHRoaXJkIHBhcmFtZXRlciwgd2hpY2ggaXMgdXNlZCB0b1xuICogZGVzY2liZSB0aGUgd29ya2Zsb3cgcHJvY2Vzc2VzLiBJZiBhIHdvcmtmbG93IGluc3RhbmNlIGV4aXN0cyB5b3UgY2FuIHBhc3MgaXRcbiAqIGluIGFzIHRoZSBmb3VydGggcGFyYW1ldGVyIHdoaWNoIGl0IHdpbGwgdGhlbiB1c2UsIGVsc2UgY3JlYXRlIGEgbmV3IG9uZS5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvZmlsZSAtIFRoZSBjdXJyZW50IHByb2ZpbGUgaWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBhcHAgLSBUaGUgYXNzb2NpYXRlZCBhcHBsaWNhdGlvbiBpZFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyAtIFRoZSBhcHBsaWNhdGlvbiB3b3JrZmxvdyBjb25maWd1cmF0aW9uIC8gZGVmaW5pdGlvblxuICogQHBhcmFtIHtPYmplY3R9IFtpbnN0YW5jZV0gLSBBbiBleGlzdGluZyBhcHBsaWNhdGlvbiBwcm9maWxlIHdvcmtmbG93IGluc3RhbmNlIGJhc2VkXG4gKiBvbiB0aGUgZGVmaW5pdGlvblxuICpcbiAqIEBhdXRob3IgQnJlbnQgR29yZG9uXG4gKiBAdmVyc2lvbiAwLjEuMFxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgY29uZmlnID0geyAnX2lkJzogJ2FiYzEyMycgfTtcblxuICogdmFyIGluc3RhbmNlID0geyAnX2lkJzogJ2luc3RhbmNlX2FiYzEyMycgfTtcblxuICogLy8gSWYgdGhlcmUgaXNuJ3QgYW4gZXhpc3RpbmcgaW5zdGFuY2VcbiAqIHZhciB3b3JrZmxvdyA9IG5ldyBXb3JrZmxvdygnMTIzNCcsICc1Njc4JywgY29uZmlnKTtcbiAqIC8vIElmIHRoZXJlIGlzIGFuIGV4aXN0aW5nIGluc3RhbmNlXG4gKiB2YXIgd29ya2Zsb3cgPSBuZXcgV29ya2Zsb3coJzEyMzQnLCAnNTY3OCcsIGNvbmZpZywgaW5zdGFuY2UpO1xuICpcbiAqIEByZXR1cm4ge09iamVjdH0gbmV3IFdvcmtmbG93IG9iamVjdFxuICpcbiAqIEB0aHJvd3MgRXJyb3I6IEEgcHJvZmlsZSBpZCBpcyByZXF1aXJlZFxuICogQHRocm93cyBFcnJvcjogQW4gYXBwIGlkIGlzIHJlcXVpcmVkXG4gKiBAdGhyb3dzIEVycm9yOiBBIHdvcmtmbG93IGNvbmZpZ3VyYXRpb24gaXMgcmVxdWlyZWRcbiAqXG4gKi9cblxuZnVuY3Rpb24gV29ya2Zsb3cocHJvZmlsZSwgY29tbXVuaXR5SWQsIGFwcCwgY29uZmlnKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIC8vIENvbW11bml0eSBJRCB2YWxpZGF0aW9uIGNoZWNrc1xuICAgIGlmIChjb21tdW5pdHlJZCA9PSAnJyB8fCBjb21tdW5pdHlJZCA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgdXRpbC5lcnJvcignUGFyYW1SZXF1aXJlZCcsICdBIGNvbW11bml0eSBpZCBpcyByZXF1aXJlZC4nKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiAoY29tbXVuaXR5SWQpICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBjb21tdW5pdHkgaWQgbXVzdCBiZSBhIGphdmFzY3JpcHQgc3RyaW5nLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIF90aGlzLmNvbW11bml0eUlkID0gY29tbXVuaXR5SWQgfHwgJyc7XG4gICAgfVxuXG4gICAgLy8gUHJvZmlsZSBJRCB2YWxpZGF0aW9uIGNoZWNrc1xuICAgIGlmIChwcm9maWxlID09ICcnIHx8IHByb2ZpbGUgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IHV0aWwuZXJyb3IoJ1BhcmFtUmVxdWlyZWQnLCAnQSBwcm9maWxlIGlkIGlzIHJlcXVpcmVkLicpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIChwcm9maWxlKSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgcHJvZmlsZSBpZCBtdXN0IGJlIGEgamF2YXNjcmlwdCBzdHJpbmcuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgX3RoaXMucHJvZmlsZSA9IHByb2ZpbGUgfHwgJyc7XG4gICAgfVxuXG4gICAgLy8gQXBwIElEIHZhbGlkYXRpb24gY2hlY2tzXG4gICAgaWYgKGFwcCA9PSAnJyB8fCBhcHAgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IHV0aWwuZXJyb3IoJ1BhcmFtUmVxdWlyZWQnLCAnQW4gYXBwIGlkIGlzIHJlcXVpcmVkLicpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIChhcHApICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBhcHAgaWQgbXVzdCBiZSBhIGphdmFzY3JpcHQgc3RyaW5nLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIF90aGlzLmFwcCA9IGFwcCB8fCAnJztcbiAgICB9XG5cbiAgICAvLyBXb3JrZmxvdyBjb25maWd1cmF0aW9uIHZhbGlkYXRpb24gY2hlY2tzXG4gICAgaWYgKGNvbmZpZyA9PSAnJyB8fCBjb25maWcgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IHV0aWwuZXJyb3IoJ1BhcmFtUmVxdWlyZWQnLCAnQSB3b3JrZmxvdyBjb25maWd1cmF0aW9uIGlzIHJlcXVpcmVkLicpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIChjb25maWcpICE9PSAnb2JqZWN0Jykge1xuICAgICAgICBfdGhpcy5jb25maWcgPSBKU09OLnBhcnNlKGNvbmZpZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgX3RoaXMuY29uZmlnID0gY29uZmlnO1xuICAgIH1cblxuICAgIC8vIFdvcmtmbG93IGluc3RhbmNlIHZhbGlkYXRpb24gY2hlY2tzXG4gICAgX3RoaXMuaW5zdGFuY2U7XG4gICAgLy8gV29ya2Zsb3cgc3ViLXByb2Nlc3NlcyB2YWxpZGF0aW9uIGNoZWNrc1xuICAgIF90aGlzLnN1YnByb2Nlc3NlcyA9IFtdO1xuICAgIC8vIFdvcmtmbG93IGluZGljYXRvcnMgcGxhY2UgaG9sZGVyXG4gICAgX3RoaXMuaW5kaWNhdG9ycyA9IFtdO1xuICAgIFxuXG59XG5cbi8qKlxuICogV29ya2Zsb3cgZ2V0IHByb2ZpbGUgaWQuXG4gKlxuICogQGV4YW1wbGUgXCJcIlxuICpcbiAqIEByZXR1cm4gXCJcIlxuICpcbiAqL1xuV29ya2Zsb3cucHJvdG90eXBlLmdldFByb2ZpbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvZmlsZTtcbn07XG5cbi8qKlxuICogV29ya2Zsb3cgZ2V0IGFwcCBpZC5cbiAqXG4gKiBAZXhhbXBsZSBcIlwiXG4gKlxuICogQHJldHVybiBcIlwiXG4gKlxuICovXG5Xb3JrZmxvdy5wcm90b3R5cGUuZ2V0QXBwID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmFwcDtcbn07XG5cbi8qKlxuICogV29ya2Zsb3cgZ2V0IGNvbmZpZy5cbiAqXG4gKiBAZXhhbXBsZSBcIlwiXG4gKlxuICogQHJldHVybiBcIlwiXG4gKlxuICovXG5Xb3JrZmxvdy5wcm90b3R5cGUuZ2V0Q29uZmlnID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZztcbn07XG5cbi8qKlxuICogV29ya2Zsb3cgZ2V0IGluc3RhbmNlLlxuICpcbiAqIEBleGFtcGxlIFwiXCJcbiAqXG4gKiBAcmV0dXJuIFwiXCJcbiAqXG4gKi9cblxuV29ya2Zsb3cucHJvdG90eXBlLmdldEluc3RhbmNlID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xufTtcblxuLyoqXG4gKiBXb3JrZmxvdyBzZXQgdGhlIGluc3RhbmNlIGRhdGEuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSB0aGUgd29ya2Zsb3cgcHJvY2VzcyBpbnN0YW5jZSBkYXRhXG4gKlxuICogQGV4YW1wbGUgXCJcIlxuICpcbiAqIEByZXR1cm4gXCJcIlxuICpcbiAqL1xuV29ya2Zsb3cucHJvdG90eXBlLnNldEluc3RhbmNlID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICB0aGlzLmluc3RhbmNlID0gZGF0YTtcbn07XG5cbi8qKlxuICogV29ya2Zsb3cgZ2V0IHN1Yi1wcm9jZXNzZXMgZGF0YS5cbiAqXG4gKiBAZXhhbXBsZSBcIlwiXG4gKlxuICogQHJldHVybiBcIlwiXG4gKlxuICovXG5Xb3JrZmxvdy5wcm90b3R5cGUuZ2V0U3ViUHJvY2Vzc2VzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnN1YnByb2Nlc3Nlcztcbn07XG5cbi8qKlxuICogV29ya2Zsb3cgc2V0IHRoZSBzdWItcHJvY2Vzc2VzIGRhdGEuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSB0aGUgd29ya2Zsb3cgcHJvY2VzcyBpbnN0YW5jZSBkYXRhXG4gKlxuICogQGV4YW1wbGUgXCJcIlxuICpcbiAqIEByZXR1cm4gXCJcIlxuICpcbiAqL1xuV29ya2Zsb3cucHJvdG90eXBlLnNldFN1YlByb2Nlc3NlcyA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdGhpcy5zdWJwcm9jZXNzZXMgPSBkYXRhO1xufTtcblxuLyoqXG4gKiBXb3JrZmxvdyBnZXQgaW5kaWNhdG9yIHNldCBkYXRhLlxuICpcbiAqIEBleGFtcGxlIFwiXCJcbiAqXG4gKiBAcmV0dXJuIFwiXCJcbiAqXG4gKi9cbldvcmtmbG93LnByb3RvdHlwZS5nZXRJbmRpY2F0b3JzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmluZGljYXRvcnM7XG59O1xuXG4vKipcbiAqIFdvcmtmbG93IHNldCB0aGUgaW5kaWNhdG9yIHNldCBkYXRhLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC0gdGhlIHdvcmtmbG93IHByb2Nlc3MgaW5zdGFuY2UgZGF0YVxuICpcbiAqIEBleGFtcGxlIFwiXCJcbiAqXG4gKiBAcmV0dXJuIFwiXCJcbiAqXG4gKi9cbldvcmtmbG93LnByb3RvdHlwZS5zZXRJbmRpY2F0b3JzID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICB0aGlzLmluZGljYXRvcnMgPSBkYXRhO1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIHZhcmlhYmxlIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBwcm9jZXNzIGlkXG4gKiBAcGFyYW0ge251bWJlcn0gcHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBwcm9jZXNzIHNlcVxuICogQHBhcmFtIHtzdHJpbmd9IHN1YlByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN1Yi1wcm9jZXNzIGlkXG4gKiBAcGFyYW0ge251bWJlcn0gc3ViUHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBzdWItcHJvY2VzcyBzZXFcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdGVwSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdGVwIGlkXG4gKiBAcGFyYW0ge09iamVjdH0gdmFyaWFibGUgLSB0aGUgV29ya2Zsb3cgdmFyaWFibGUgb2JqZWN0XG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG4vLyBXb3JrZmxvdy5wcm90b3R5cGUuc2V0VmFyaWFibGUgPSBmdW5jdGlvbihwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3RlcElkLCB2YXJpYWJsZSl7XG4vLyBcdHZhciBfdGhpcyA9IHRoaXM7XG4vLyBcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbi8vIFx0XHR0cnkge1xuLy8gXHRcdFx0UHJvY2Vzcy5nZXRWYXJpYWJsZShwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3RlcElkLCB2YXJpYWJsZSkudGhlbihmdW5jaW9uKHJlc3VsdCl7XG4vLyBcdFx0XHRcdHJlc29sdmUocmVzdWx0LmRhdGEpO1xuLy8gXHRcdFx0fSwgZnVuY3Rpb24oZXJyKXtcbi8vIFx0XHRcdFx0cmVqZWN0KGVycik7XG4vLyBcdFx0XHR9KVxuLy8gXHRcdH0gY2F0Y2ggKGVycikge1xuLy8gXHRcdFx0cmVqZWN0KGVycik7XG4vLyBcdFx0fVxuXG4vLyBcdH0pO1xuLy8gfTtcblxuLyoqXG4gKiBHZXQgdGhlIHZhcmlhYmxlIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBwcm9jZXNzIGlkXG4gKiBAcGFyYW0ge251bWJlcn0gcHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBwcm9jZXNzIHNlcVxuICogQHBhcmFtIHtzdHJpbmd9IHN1YlByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN1Yi1wcm9jZXNzIGlkXG4gKiBAcGFyYW0ge251bWJlcn0gc3ViUHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBzdWItcHJvY2VzcyBzZXFcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdGVwSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdGVwIGlkXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gdGhlIFdvcmtmbG93IHZhcmlhYmxlIGlkXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG4vLyBXb3JrZmxvdy5wcm90b3R5cGUuZ2V0VmFyaWFibGUgPSBmdW5jdGlvbihwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3RlcElkLCBrZXkpe1xuLy8gXHR2YXIgX3RoaXMgPSB0aGlzO1xuLy8gXHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4vLyBcdFx0dHJ5IHtcbi8vIFx0XHRcdFByb2Nlc3Muc2V0VmFyaWFibGUocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwga2V5KS50aGVuKGZ1bmNpb24ocmVzdWx0KXtcbi8vIFx0XHRcdFx0cmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4vLyBcdFx0XHR9LCBmdW5jdGlvbihlcnIpe1xuLy8gXHRcdFx0XHRyZWplY3QoZXJyKTtcbi8vIFx0XHRcdH0pXG4vLyBcdFx0fSBjYXRjaCAoZXJyKSB7XG4vLyBcdFx0XHRyZWplY3QoZXJyKTtcbi8vIFx0XHR9XG5cbi8vIFx0fSk7XG4vLyB9O1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGNyZWF0ZXMgYSBuZXcgd29ya2Zsb3cgcHJvY2VzcyBpLmUuIGl0IGNyZWF0ZXMgYSB3b3JrZmxvdyBwcm9jZXNzZXMgaW5zdGFuY2VcbiAqIG9iamVjdCB3aXRoIHRoZSBtaW5pbXVtIHJlcXVpcmVkIGRhdGEuIFRoaXMgaW5zdGFuY2UgY2FuIGJlIHJlZmVyZW5jZWQgaW4gdGhlIGZvbGxvd2luZ1xuICogd2F5LCBzZWUgZXhhbXBsZSBiZWxvdy5cbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIGNvbmZpZyA9IHsgJ19pZCc6ICdhYmMxMjMnIH07XG5cbiAqIHZhciB3b3JrZmxvdyA9IG5ldyBXb3JrZmxvdygnMTIzNCcsICc1Njc4JywgY29uZmlnKTtcbiAqIHdvcmtmbG93LmNyZWF0ZSgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAqXHRjb25zb2xlLmxvZyhyZXN1bHQubWVzc2FnZSk7XG4gKlx0Ly8gVGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzIGNhbiBub3cgYmUgYWNjZXNzZWRcbiAqIFx0dmFyIHByb2ZpbGUgPSB3b3JrZmxvdy5wcm9maWxlO1xuICogXHR2YXIgYXBwID0gd29ya2Zsb3cuYXBwO1xuICogXHR2YXIgY29uZmlnID0gd29ya2Zsb3cuY29uZmlnO1xuICpcdC8vIE9uIHN1Y2Nlc3MgeW91IGNhbiBhY2Nlc3MgdGhlIGluc3RhbmNlIHRoZSBmb2xsb3dpbmcgd2F5XG4gKlx0dmFyIGluc3RhbmNlID0gd29ya2Zsb3cuaW5zdGFuY2U7XG4gKiB9LCBmdW5jdGlvbihlcnJvcil7XG4gKlx0Y29uc29sZS5sb2coZXJyb3IpO1xuICogfSk7XG4gKlxuICogQHJldHVybiB7T2JqZWN0fSBuZXcgV29ya2Zsb3cgaW5zdGFuY2Ugd2l0aCB1cGRhdGVkIGluc3RhbmNlIGRhdGEuXG4gKlxuICovXG5cbldvcmtmbG93LnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKF90aGlzLmluc3RhbmNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgd2FybiA9IHV0aWwud2FybignSW5zdGFuY2UgYWxyZWFkeSBleGlzdHMuJywgX3RoaXMpXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh3YXJuKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSB3b3JrZmxvdyBwcm9jZXNzZXMgaW5zdGFuY2Ugb2JqZWN0XG4gICAgICAgICAgICAgICAgdmFyIG1vZGVsID0ge1xuICAgICAgICAgICAgICAgICAgICBfaWQ6ICcnLFxuICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3dvcmtmbG93SW5zdGFuY2UnLFxuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzZXM6IFtdLFxuICAgICAgICAgICAgICAgICAgICBjaGFubmVsczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21tdW5pdHlfXCIgKyBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZmlsZV9cIiArIGFwcC5TQ09QRS5wcm9maWxlSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFwcGxpY2F0aW9uX1wiICsgYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbW11bml0eV9cIiArIGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpICsgXCJfYXBwbGljYXRpb25fXCIgKyBhcHAuU0NPUEUuYXBwbGljYXRpb25JZFxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIG1vZGVsLl9pZCA9IF90aGlzLnByb2ZpbGUgKyAnOnByb2Nlc3Nlcyc7XG4gICAgICAgICAgICAgICAgbW9kZWwudmVyc2lvbiA9IF90aGlzLmNvbmZpZy52ZXJzaW9uO1xuICAgICAgICAgICAgICAgIF90aGlzLmluc3RhbmNlID0gbW9kZWw7XG4gICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1dvcmtmbG93IHByb2Nlc3NlcyBpbnN0YW5jZSBjcmVhdGVkIHN1Y2Nlc3NmdWxseS4nLCBfdGhpcyk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cblxuICAgIH0pO1xufTtcblxuLyoqXG4gKiBXb3JrZmxvdyBpbml0aWFsaXNlLCB0aGlzIGZ1bmN0aW9uIGV4ZWN1dGVzIGEgcHJvY2VzcyB3aXRoaW4gYSB3b3JrZmxvd1xuICogY29uZmlndXJhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIHByb2Nlc3MgaWQgdG8gcHJvY2Vzc1xuICogQHBhcmFtIHtvYmplY3R9IFtkYXRhXSAtIHRoZSBpbnB1dCBkYXRhIHRvIHByb2Nlc3NcbiAqXG4gKiBAZXhhbXBsZVxuICogV29ya2Zsb3cuaW5pdGlhbGlzZSgncHJvY2Vzc0lkJywgeyB2YWxpZERhdGU6ICdkYXRlJyB9KTtcbiAqXG4gKiBAcmV0dXJuIFwiXCJcbiAqXG4gKi9cbldvcmtmbG93LnByb3RvdHlwZS5pbml0aWFsaXNlID0gZnVuY3Rpb24gKHByb2Nlc3NJZCwgZGF0YSwgc3VicHJvZmlsZUlkKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIGNvbmZpZ1Byb2Nlc3MgPSBbXTtcbiAgICAgICAgICAgIC8vIENoZWNrIHRoZSBwYXNzZWQgaW4gcGFyYW1ldGVyc1xuICAgICAgICAgICAgaWYgKHByb2Nlc3NJZCAhPT0gJycgJiYgcHJvY2Vzc0lkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBHZXQgdGhlIGN1cnJlbnQgcHJvY2VzcyBjb25maWdcbiAgICAgICAgICAgICAgICBjb25maWdQcm9jZXNzID0gX3RoaXMuY29uZmlnLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKG9ialByb2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9ialByb2Nlc3MuX2lkID09IHByb2Nlc3NJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9ialByb2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChjb25maWdQcm9jZXNzWzBdLl9pZCA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZDb25maWdFcnJvcicsICdObyB2YWxpZCBwcm9jZXNzIGRlZmluaXRpb24gZm91bmQgd2l0aCBwcm9jZXNzIGlkOiAnICsgcHJvY2Vzc0lkKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uZmlnUHJvY2Vzcy5wdXNoKF90aGlzLmNvbmZpZy5wcm9jZXNzZXNbMF0pO1xuICAgICAgICAgICAgICAgIHByb2Nlc3NJZCA9IF90aGlzLmNvbmZpZy5wcm9jZXNzZXNbMF0uX2lkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBHZXQgdGhlIGN1cnJlbnQgbGlzdCBvZiBwcm9jZXNzIGluc3RhbmNlc1xuICAgICAgICAgICAgLy8gdmFyIHByb2Nlc3NTZXEgPSAxO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRQcm9jZXNzID0gW107XG4gICAgICAgICAgICBfdGhpcy5pbnN0YW5jZS5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChwcm9jZXNzSXRlbSkge1xuICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzSXRlbS5pZCA9PSBwcm9jZXNzSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFByb2Nlc3MucHVzaChwcm9jZXNzSXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBwcm9jZXNzU2VxID0gY3VycmVudFByb2Nlc3MubGVuZ3RoICsgMTtcbiAgICAgICAgICAgIC8vIHZhciBuZXh0U2VxID0gcHJvY2Vzc1NlcSArIDE7XG4gICAgICAgICAgICAvLyBQdXNoIHRoZSBwcm9jZXNzIG9iamVjdCBpbnRvIHRoZSBhcnJheVxuICAgICAgICAgICAgdmFyIHByb2Nlc3NNb2RlbCA9IHtcbiAgICAgICAgICAgICAgICBpZDogJycsXG4gICAgICAgICAgICAgICAgc2VxOiAnJyxcbiAgICAgICAgICAgICAgICBzdWJQcm9jZXNzZXM6IFtdXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIDEuIFVwZGF0ZSB0aGUgcHJvY2VzcyBpZCBhbmQgc2VxXG4gICAgICAgICAgICBwcm9jZXNzTW9kZWwuaWQgPSBwcm9jZXNzSWQ7XG4gICAgICAgICAgICBwcm9jZXNzTW9kZWwuc2VxID0gcHJvY2Vzc1NlcTtcbiAgICAgICAgICAgIF90aGlzLmluc3RhbmNlLnByb2Nlc3Nlcy5wdXNoKHByb2Nlc3NNb2RlbCk7XG4gICAgICAgICAgICAvLyBQYXJhbWV0ZXJzXG4gICAgICAgICAgICB2YXIgc3ViUHJvY2Vzc0lkID0gY29uZmlnUHJvY2Vzc1swXS5zdWJQcm9jZXNzZXNbMF0uX2lkO1xuICAgICAgICAgICAgdmFyIHN1YlByb2Nlc3NTZXEgPSAxO1xuICAgICAgICAgICAgX3RoaXMuaW5zdGFuY2UucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbiAocHJvY2Vzc0l0ZW0pIHtcbiAgICAgICAgICAgICAgICBpZiAocHJvY2Vzc0l0ZW0uaWQgPT0gcHJvY2Vzc0lkICYmIHByb2Nlc3NJdGVtLnNlcSA9PSBwcm9jZXNzU2VxKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NTZXEgPSBwcm9jZXNzSXRlbS5zdWJQcm9jZXNzZXMubGVuZ3RoICsgMVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC8vIENhbGwgdGhlIHN1YnByb2Nlc3MgbWV0aG9kXG5cbiAgICAgICAgICAgIFByb2Nlc3Muc3ViUHJvY2Vzcyhwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgZGF0YSwgX3RoaXMpLnRoZW4oZnVuY3Rpb24gKHN1YlByb2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAvLyBHZW5lcmF0ZSB0aGUgdXVpZFxuXG4gICAgICAgICAgICAgICAgdmFyIHV1aWQgPSBzdWJQcm9jZXNzLmRhdGEuX2lkOyAvL190aGlzLnByb2ZpbGUgKyAnOicgKyBfdGhpcy5hcHAgKyAnOicgKyBwcm9jZXNzSWQgKyAnOicgKyBwcm9jZXNzU2VxICsgJzonICsgc3ViUHJvY2Vzc0lkICsgJzonICsgc3ViUHJvY2Vzc1NlcTtcbiAgICAgICAgICAgICAgICB2YXIgbGFiZWwgPSBkYXRhLmxhYmVsO1xuICAgICAgICAgICAgICAgIC8vIEJ1aWxkIHRoZSBzdWItcHJvY2VzcyByZWZlcmVuY2Ugb2JqZWN0XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy9UT0RPOiBDaGFuZ2UgcmVxdWlyZWQgdG8gbW92ZSBpc0FjdGl2ZSB0byBzdWJQcm9jZXNzIGZpbGUuUmVtb3ZlIGZyb20gaGVyZVxuICAgICAgICAgICAgICAgIHZhciBzdWJQcm9jZXNzUmVmID0ge1xuICAgICAgICAgICAgICAgICAgICBpZDogc3ViUHJvY2Vzc0lkLFxuICAgICAgICAgICAgICAgICAgICBzdWJwcm9maWxlSWQ6IHN1YnByb2ZpbGVJZCxcbiAgICAgICAgICAgICAgICAgICAgc2VxOiBzdWJQcm9jZXNzU2VxLFxuICAgICAgICAgICAgICAgICAgICB1dWlkOiB1dWlkLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogbGFiZWxcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIHJlZmVyZW5jZSB0byB0aGUgcHJvY2VzcyBtb2RlbFxuICAgICAgICAgICAgICAgIHByb2Nlc3NNb2RlbC5zdWJQcm9jZXNzZXMucHVzaChzdWJQcm9jZXNzUmVmKTtcbiAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIHN1YlByb2Nlc3MgbW9kZWwgdG8gdGhlIHN1YnByb2Nlc3NlcyBhcnJheVxuICAgICAgICAgICAgICAgIC8vX3RoaXMuc3VicHJvY2Vzc2VzLnB1c2goc3ViUHJvY2Vzcy5kYXRhKTtcbiAgICAgICAgICAgICAgICAvLyBfdGhpcy5pbnN0YW5jZS5wcm9jZXNzZXMucHVzaChwcm9jZXNzTW9kZWwpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBfdGhpcy5pbnN0YW5jZS5wcm9jZXNzZXMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwcm9jZXNzSXRlbSA9IF90aGlzLmluc3RhbmNlLnByb2Nlc3Nlc1tpbmRleF07XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzSXRlbS5pZCA9PSBwcm9jZXNzSWQgJiYgcHJvY2Vzc0l0ZW0uc2VxID09IHByb2Nlc3NTZXEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgY3VycmVudCBwcm9jZXNzIGZyb20gdGhlIGFycmF5IGFuZCBhZGQgdGhlIHVwZGF0ZWQgcHJvY2Vzc01vZGVsXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5pbnN0YW5jZS5wcm9jZXNzZXMuc3BsaWNlKGluZGV4LCAxLCBwcm9jZXNzTW9kZWwpXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIFByb2Nlc3MgdGhlIGluZGljYXRvciBkb2N1bWVudHMgd29ya2Zsb3cgcHJvY2Vzc2VzIHVwZGF0ZXNcbiAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9ycyA9IHN1YlByb2Nlc3MuZGF0YS5pbmRpY2F0b3JzO1xuICAgICAgICAgICAgICAgIHZhciBzdGVwID0gc3ViUHJvY2Vzcy5kYXRhLnN0ZXA7XG4gICAgICAgICAgICAgICAgUHJvY2Vzcy5pbmRpY2F0b3JEb2NzKHByb2Nlc3NJZCwgaW5kaWNhdG9ycywgc3RlcCwgX3RoaXMpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnUHJvY2VzczogJyArIF90aGlzLmNvbmZpZy5wcm9jZXNzZXNbMF0uX2lkICsgJyBpbml0aWFsaXplZCBzdWNjZXNzZnVsbHkuJywgc3ViUHJvY2Vzc1JlZik7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIF90aGlzLmluc3RhbmNlLnByb2Nlc3NlcyA9IF90aGlzLmluc3RhbmNlLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIShvYmouaWQgPT0gcHJvY2Vzc0lkICYmIG9iai5zZXEgPT0gcHJvY2Vzc1NlcSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG5cbiAgICB9KTtcbn07XG5cbi8qKlxuICogV29ya2Zsb3cgdHJhbnNpdGlvbiB0byB0aGUgbmV4dCBzdGVwLiBUaGlzIG1vdmVzIHRoZSB3b3JrZmxvdyBmcm9tIHRoZSBjdXJyZW50IHByb2Nlc3MsXG4gKiBzdWItcHJvY2VzcyBzdGVwIHRvIHRoZSBuZXh0IG9uZSBhcyBzcGVjaWZpZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHByb2Nlc3MgaWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBwcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHByb2Nlc3Mgc2VxXG4gKiBAcGFyYW0ge3N0cmluZ30gc3ViUHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3ViLXByb2Nlc3MgaWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdWJQcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHN1Yi1wcm9jZXNzIHNlcVxuICogQHBhcmFtIHtzdHJpbmd9IHN0ZXBJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN0ZXAgaWQgXG4gKiBAcGFyYW0ge3N0cmluZ30gdHJhbnNpdGlvbklkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gdHJhbnNpdGlvbiBpZFxuICogQHBhcmFtIHtvYmplY3R9IGRhdGEgLSBhbnkgYWRkaXRpb25hbCBkYXRhIHBhc3NlZCBpbiBhcyBrZXkgdmFsdWUgcGFpcnNcbiAqXG4gKiBAZXhhbXBsZVxuICogV29ya2Zsb3cudHJhbnNpdGlvbigncHJvY2Vzc0lkJywgMSwgJ3N1YlByb2Nlc3NJZCcsIDEsICdzdGVwSWQnLCAndHJhbnNpdGlvbklkJywgeyBrZXk6ICcnLCB2YWx1ZTogJycgfSk7XG4gKlxuICogQHJldHVybiBcIlwiXG4gKlxuICovXG5Xb3JrZmxvdy5wcm90b3R5cGUudHJhbnNpdGlvbiA9IGZ1bmN0aW9uIChwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3RlcElkLCB0cmFuc2l0aW9uSWQsIGRhdGEsIHNwdXVpZCkge1xuICAgIC8vIFJlLWFzc2lnbiB0aGlzXG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIG1vZGVsID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHNwdXVpZCArIFwiJ10vc3RlcC9kYXRhXCIsIGFwcC5TQ09QRS53b3JrZmxvdywge30pWzBdO1xuICAgICAgICAgICAgdmFyIHN0ZXBPYmplY3QgPSBKU09OLnhwYXRoKFwiL3Byb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgcHJvY2Vzc0lkICsgXCInXS9zdWJQcm9jZXNzZXNbX2lkIGVxICdcIiArIHN1YlByb2Nlc3NJZCArIFwiJ10vc3RlcHNbX2lkIGVxICdcIiArIHN0ZXBJZCArIFwiJ11cIiwgX3RoaXMuY29uZmlnLCB7fSlbMF07XG5cblxuICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBjdXJyZW50IHN1Yi1wcm9jZXNzIHN0ZXAgZGF0YVxuICAgICAgICAgICAgdmFyIHVwZGF0ZSA9IGZ1bmN0aW9uICh0eXBlLCByZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5pbnN0YW5jZS5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChwcm9jZXNzSXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvY2Vzc0l0ZW0uaWQgPT0gcHJvY2Vzc0lkICYmIHByb2Nlc3NJdGVtLnNlcSA9PSBwcm9jZXNzU2VxKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NJdGVtLnN1YlByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKHN1YlByb2Nlc3NJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1YlByb2Nlc3NJdGVtLmlkID09IHN1YlByb2Nlc3NJZCAmJiBzdWJQcm9jZXNzSXRlbS5zZXEgPT0gc3ViUHJvY2Vzc1NlcSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnN1YnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKHN1YlByb2Nlc3NPYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWJQcm9jZXNzT2JqLl9pZCA9PSBzdWJQcm9jZXNzSXRlbS51dWlkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PSAnc3RlcCcpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzT2JqLnN0ZXAgPSByZXN1bHQuZGF0YS5zdGVwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcyhyZXN1bHQubWVzc2FnZSwgc3ViUHJvY2Vzc09iaik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gJ3N0ZXBDb21wbGV0ZScpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzT2JqLnN0ZXAgPSByZXN1bHQuZGF0YS5zdGVwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzT2JqLmNvbXBsZXRlID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcyhyZXN1bHQubWVzc2FnZSwgc3ViUHJvY2Vzc09iai5zdGVwKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGlmIChzdGVwT2JqZWN0LmZ1bmN0aW9uLnRhc2sucG9zdEFjdGlvbnMgIT0gdW5kZWZpbmVkKSB7XG5cblxuICAgICAgICAgICAgICAgIHZhciBwb3N0QWN0aW9ucyA9IHN0ZXBPYmplY3QuZnVuY3Rpb24udGFzay5wb3N0QWN0aW9ucztcbiAgICAgICAgICAgICAgICBQcm9jZXNzLnBvc3RBY3Rpb25zKHBvc3RBY3Rpb25zLCBfdGhpcykudGhlbihmdW5jdGlvbiAoc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgIFxuXG5cblxuICAgICAgICAgICAgICAgICAgICBQcm9jZXNzLnRyYW5zaXRpb24ocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwgdHJhbnNpdGlvbklkLCBkYXRhLCBfdGhpcywgc3B1dWlkLCBtb2RlbCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YS5zdWJQcm9jZXNzQ29tcGxldGUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZSgnc3RlcENvbXBsZXRlJywgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGUoJ3N0ZXAnLCByZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuXG4gICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuXG4gICAgICAgICAgICAgICAgUHJvY2Vzcy50cmFuc2l0aW9uKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdGVwSWQsIHRyYW5zaXRpb25JZCwgZGF0YSwgX3RoaXMsIHNwdXVpZCwgbW9kZWwpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YS5zdWJQcm9jZXNzQ29tcGxldGUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlKCdzdGVwQ29tcGxldGUnLCByZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGUoJ3N0ZXAnLCByZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcblxuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cblxuICAgIH0pO1xufTtcblxuLyoqXG4gKiBXb3JrZmxvdyBhc3NpZ24gdXNlci5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gcHJvY2VzcyBpZFxuICogQHBhcmFtIHtudW1iZXJ9IHByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2UgcHJvY2VzcyBzZXFcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdWJQcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdWItcHJvY2VzcyBpZFxuICogQHBhcmFtIHtudW1iZXJ9IHN1YlByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2Ugc3ViLXByb2Nlc3Mgc2VxXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RlcElkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3RlcCBpZFxuICogQHBhcmFtIHtvYmplY3R9IHVzZXIgLSB0aGUgdXNlciBpZCBhbmQgbmFtZSBkYXRhXG4gKlxuICogQGV4YW1wbGUgXCJcIlxuICpcbiAqIEByZXR1cm4gXCJcIlxuICpcbiAqL1xuV29ya2Zsb3cucHJvdG90eXBlLmFzc2lnblVzZXIgPSBmdW5jdGlvbiAocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHVzZXIpIHtcbiAgICAvLyBSZS1hc3NpZ24gdGhlIFdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlIGFzIF90aGlzXG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgUHJvY2Vzcy5hc3NpZ25Vc2VyKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCB1c2VyLCBfdGhpcykudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgfSlcbn07XG5cbi8qKlxuICogV29ya2Zsb3cgdGFzaywgdGhpcyBtZXRob2QgZXhlY3V0ZXMgYSBzcGVjaWZpYyB0YXNrLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9jZXNzSWQgLSB0aGUgcHJvY2VzcyBpZCB0byBwcm9jZXNzXG4gKiBAcGFyYW0ge29iamVjdH0gaW5wdXREYXRhIC0gdGhlIGlucHV0IGRhdGEgdG8gcHJvY2Vzc1xuICpcbiAqIEBleGFtcGxlXG4gKiBXb3JrZmxvdy5pbml0aWFsaXplKCdwcm9jZXNzSWQnLCB7IHZhbGlkRGF0ZTogJ2RhdGUnIH0pO1xuICpcbiAqIEByZXR1cm4gXCJcIlxuICpcbiAqL1xuV29ya2Zsb3cucHJvdG90eXBlLnVpID0gZnVuY3Rpb24gKCkge1xuICAgIC8vIFJlLWFzc2lnbiB0aGUgV29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2UgYXMgX3RoaXNcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldFByb2Nlc3M6IGZ1bmN0aW9uIChwcm9jZXNzSWQsIGxhbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdXNlckludGVyZmFjZS5nZXRQcm9jZXNzKHByb2Nlc3NJZCwgbGFuZywgX3RoaXMpLnRoZW4oZnVuY3Rpb24gKG1vZGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG1vZGVsKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgfVxuXG59O1xuXG4vKipcbiAqIFdvcmtmbG93IHRhc2ssIHRoaXMgbWV0aG9kIGV4ZWN1dGVzIGEgc3BlY2lmaWMgdGFzay5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gZGF0YSAtIHRoZSBwcm9jZXNzIGlkIHRvIHByb2Nlc3NcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBpbnB1dCBkYXRhIHRvIHByb2Nlc3NcbiAqICogQHBhcmFtIHtzdHJpbmd9IHV1aWQgLSB0aGUgaW5wdXQgZGF0YSB0byBwcm9jZXNzXG4gKlxuICogQGV4YW1wbGVcbiAqIFdvcmtmbG93LmdldE5vZGVWYWx1ZShkYXRhLCBfV0ZJbnN0YW5jZSwgdXVpZCk7XG4gKlxuICogQHJldHVybiBcIlwiXG4gKlxuICovXG5cbldvcmtmbG93LnByb3RvdHlwZS5nZXROb2RlVmFsdWUgPSBmdW5jdGlvbiAoZGF0YSwgdXVpZCkge1xuICAgIC8vIFJlLWFzc2lnbiB0aGUgV29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2UgYXMgX3RoaXNcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBoZWxwZXIuZ2V0Tm9kZVZhbHVlKGRhdGEsIF90aGlzLCB1dWlkKS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgfSlcbn07XG5cbi8qKlxuICogV29ya2Zsb3cgdGFzaywgdGhpcyBtZXRob2QgZXhlY3V0ZXMgYSBzcGVjaWZpYyB0YXNrLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIC0gdGhlIHByb2Nlc3MgaWQgdG8gcHJvY2Vzc1xuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGlucHV0IGRhdGEgdG8gcHJvY2Vzc1xuICpcbiAqIEBleGFtcGxlXG4gKiBXb3JrZmxvdy50YWtlQXNzaWdubWVudChzcHV1aWQsIF9XRkluc3RhbmNlKTtcbiAqXG4gKiBAcmV0dXJuIFwiXCJcbiAqXG4gKi9cblxuV29ya2Zsb3cucHJvdG90eXBlLnRha2VBc3NpZ25tZW50ID0gZnVuY3Rpb24gKHNwdXVpZCkge1xuICAgIC8vIFJlLWFzc2lnbiB0aGUgV29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2UgYXMgX3RoaXNcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAvL0Fzc2lnbm1lbnQgYXJlIGV4ZWN1dGluZyBoZXJlXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBzcE9iamVjdCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddXCIsIF90aGlzLCB7fSlbMF07XG4gICAgICAgICAgICB2YXIgYXNzaWduZWUgPSBKU09OLnhwYXRoKFwiL3N0ZXAvYXNzaWduZWRUb1wiLCBzcE9iamVjdCwge30pWzBdO1xuICAgICAgICAgICAgYXNzaWduZWUubmFtZSA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcm5hbWUgKyBcIlwiO1xuICAgICAgICAgICAgYXNzaWduZWUudXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQgKyBcIlwiO1xuXG4gICAgICAgICAgICAvL2ZldGNoIHByZVdvcmtBY3Rpb25zIGhlcmUgXG5cbiAgICAgICAgICAgIHZhciBwcm9jZXNzSWQgPSBKU09OLnhwYXRoKFwiL2luc3RhbmNlL3Byb2Nlc3Nlc1tzdWJQcm9jZXNzZXMvdXVpZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL2lkXCIsIF90aGlzLCB7fSlbMF07XG4gICAgICAgICAgICB2YXIgc3ViUHJvY2Vzc0lkID0gSlNPTi54cGF0aChcIi9pbnN0YW5jZS9wcm9jZXNzZXMvc3ViUHJvY2Vzc2VzW3V1aWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXS9pZFwiLCBfdGhpcywge30pWzBdO1xuICAgICAgICAgICAgdmFyIHN0ZXBJZCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL3N0ZXAvaWRcIiwgX3RoaXMsIHt9KVswXTtcbiAgICAgICAgICAgIHZhciBzdGVwT2JqZWN0ID0gSlNPTi54cGF0aChcIi9wcm9jZXNzZXNbX2lkIGVxICdcIiArIHByb2Nlc3NJZCArIFwiJ10vc3ViUHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzdWJQcm9jZXNzSWQgKyBcIiddL3N0ZXBzW19pZCBlcSAnXCIgKyBzdGVwSWQgKyBcIiddXCIsIF90aGlzLmNvbmZpZywge30pWzBdO1xuXG4gICAgICAgICAgICBpZiAoc3RlcE9iamVjdC5mdW5jdGlvbi50YXNrLnByZVdvcmtBY3Rpb25zICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHByZVdvcmtBY3Rpb25zID0gc3RlcE9iamVjdC5mdW5jdGlvbi50YXNrLnByZVdvcmtBY3Rpb25zO1xuICAgICAgICAgICAgICAgIFByb2Nlc3MucHJlV29ya0FjdGlvbnMocHJlV29ya0FjdGlvbnMsIF90aGlzKS50aGVuKGZ1bmN0aW9uIChzdWNjZXNzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShfdGhpcyk7XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHJlc29sdmUoX3RoaXMpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG5cbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuXG4gICAgICAgIH1cblxuICAgIH0pO1xufTtcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gV29ya2Zsb3c7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWxpdHknKTtcbnZhciBub2RlVmFsdWUgPSByZXF1aXJlKCcuL25vZGVWYWx1ZScpO1xudmFyIGZvcm0gPSByZXF1aXJlKCcuL2Zvcm0nKTtcbnZhciBoZWxwZXIgPSByZXF1aXJlKCcuL2hlbHBlcicpO1xuXG52YXIgZ2F0ZWtlZXBlciA9IG5ldyBHSygpO1xuXG4vKipcbiAqIEFjdGlvbnMgTW9kdWxlXG4gKlxuICogQG1vZHVsZSBsaWIvYWN0aW9uc1xuICogQGF1dGhvciBIYXNhbiBBYmJhc1xuICogQHZlcnNpb24gMi4wLjBcbiAqIEBkZXNjcmlwdGlvbiB0ZXN0IGRlc2NyaXB0aW9uXG4gKiBAY29weXJpZ2h0IEt3YW50dSBMdGQgUlNBIDIwMDktMjAxNS5cbiAqXG4gKi9cblxuLyoqXG4gKiAgRm9ybSBNb2R1bGUgYWN0aW9ucyBuZWVkcyB0byBiZSBtb3ZlZCBoZXJlLlxuICogIFRoaXMgYWN0aW9ucyBtb2R1bGUgd2lsbCBiZSBjZW50YWwgcGxhY2UgdG8gaG9sZCBhbGwgZnVuY3Rpb25zLlxuICogIFxuICovXG5cbnZhciBjb21tdW5pdHkgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICBjcmVhdGVDb21tdW5pdHk6IGZ1bmN0aW9uIChfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IHdvcmtlci5nZXRXb3JrZXJXcmFwcGVyKCk7XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbmV3IERhdGUoKS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZW5kZXJVc2VySWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZDtcbiAgICAgICAgICAgICAgICB2YXIgdXVpZENvbW11bml0eSA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdDb21tdW5pdHknXS9faWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZUNvbW11bml0eVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcIm5ld0NvbW11bml0eUlkXCI6IF9XRkluc3RhbmNlLnByb2ZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImluZGljYXRvclVVSURcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQ29tbXVuaXR5XCI6IHV1aWRDb21tdW5pdHlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24gKHdvcmtlclN1Y2Nlc3MpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya2VyIHByb2Nlc3NlZCBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAod29ya2VyRmFpbCkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgdXNlckpvaW5Db21tdW5pdHk6IGZ1bmN0aW9uIChfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9LFxuICAgICAgICByZWxlYXNlQWRvcHRlZEFwcGxpY2F0aW9uOiBmdW5jdGlvbiAoX2RlZiwgdXVpZCwgX1dGSW5zdGFuY2UpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG5ldyBEYXRlKCkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2VuZGVyVXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XG5cbiAgICAgICAgICAgICAgICB2YXIgdXVpZFJlbGVhc2VBZG9wdGVkQXBwbGljYXRpb24gPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnYWRvcHRlZEFwcGxpY2F0aW9uJ10vaW5zdGFuY2VzWzFdL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcblxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIFwicmVsZWFzZUFkb3B0ZWRBcHBsaWNhdGlvblwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbW11bml0eUlkXCI6IF9XRkluc3RhbmNlLnByb2ZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImluZGljYXRvclVVSURcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWRvcHRlZEFwcGxpY2F0aW9uXCI6IHV1aWRSZWxlYXNlQWRvcHRlZEFwcGxpY2F0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hY3Rpb24gPSBhY3Rpb247XG4gICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uICh3b3JrZXJTdWNjZXNzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1dvcmtlciBwcm9jZXNzZXMgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHdvcmtlckZhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdvcmtlckZhaWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH1cblxufSkoKTtcblxudmFyIGFwcGxpY2F0aW9uID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgY3JlYXRlQXBwRGVmaW5pdGlvbjogZnVuY3Rpb24gKF9kZWYsIHV1aWQsIF9XRkluc3RhbmNlKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5faWQgPSBnZW5lcmF0ZVVVSUQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY29tbXVuaXR5SWQgPSBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYXBwbGljYXRpb25JZCA9IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jcmVhdGVkRGF0ZVRpbWUgPSBuZXcgRGF0ZSgpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xuXG4gICAgICAgICAgICAgICAgdmFyIHV1aWRBcHBsaWNhdGlvbiA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdBcHBsaWNhdGlvbiddL19pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIFwiY3JlYXRlQXBwbGljYXRpb25cIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJuZXdBcHBsaWNhdGlvbklkXCI6IF9XRkluc3RhbmNlLnByb2ZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImluZGljYXRvclVVSURcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQXBwbGljYXRpb25cIjogdXVpZEFwcGxpY2F0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hY3Rpb24gPSBhY3Rpb247XG4gICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uICh3b3JrZXJTdWNjZXNzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1dvcmtlciBwcm9jZXNzZXMgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHdvcmtlckZhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdvcmtlckZhaWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICBidWlsZEFwcGxpY2F0aW9uOiBmdW5jdGlvbiAoX2RlZiwgdXVpZCwgX1dGSW5zdGFuY2UpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG5ldyBEYXRlKCkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2VuZGVyVXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XG5cbiAgICAgICAgICAgICAgICB2YXIgdXVpZFB1Ymxpc2hBcHBsaWNhdGlvbiA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pbmRpY2F0b3JzW2lkIGVxICdQdWJsaXNoQXBwbGljYXRpb24nXS9pbnN0YW5jZXNbMV0vdXVpZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuXG4gICAgICAgICAgICAgICAgdmFyIHV1aWRBcHBsaWNhdGlvbkRlZmluaXRpb24gPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnQXBwbGljYXRpb25EZWZpbml0aW9uJ10vX2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgdmFyIHV1aWRSb2xlcyA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdSb2xlcyddL19pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgIHZhciB1dWlkQXBwbGljYXRpb24gPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnQXBwbGljYXRpb24nXS9faWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICB2YXIgdXVpZEFwcFBlcm1pc3Npb25zID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ0FwcFBlcm1pc3Npb25zJ10vX2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG5cbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICBcImJ1aWxkQXBwbGljYXRpb25cIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHBsaWNhdGlvbklkXCI6IF9XRkluc3RhbmNlLnByb2ZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImluZGljYXRvclVVSURcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUHVibGlzaEFwcGxpY2F0aW9uXCI6IHV1aWRQdWJsaXNoQXBwbGljYXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBcHBsaWNhdGlvbkRlZmluaXRpb25cIjogdXVpZEFwcGxpY2F0aW9uRGVmaW5pdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJvbGVzXCI6IHV1aWRSb2xlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkFwcGxpY2F0aW9uXCI6IHV1aWRBcHBsaWNhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkFwcFBlcm1pc3Npb25zXCI6IHV1aWRBcHBQZXJtaXNzaW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbiAod29ya2VyU3VjY2Vzcykge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdXb3JrZXIgcHJvY2Vzc2VzIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICh3b3JrZXJGYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh3b3JrZXJGYWlsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgYXBwbGljYXRpb25BZG9wdGlvbjogZnVuY3Rpb24gKF9kZWYsIHV1aWQsIF9XRkluc3RhbmNlKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5faWQgPSBnZW5lcmF0ZVVVSUQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY29tbXVuaXR5SWQgPSBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYXBwbGljYXRpb25JZCA9IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jcmVhdGVkRGF0ZVRpbWUgPSBuZXcgRGF0ZSgpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xuXG4gICAgICAgICAgICAgICAgdmFyIHV1aWRBZG9wdGlvbiA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pbmRpY2F0b3JzW2lkIGVxICdBZG9wdGlvbiddL2luc3RhbmNlc1sxXS91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG5cbiAgICAgICAgICAgICAgICB2YXIgdXVpZFB1Ymxpc2hBcHBsaWNhdGlvbiA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdQdWJsaXNoQXBwbGljYXRpb24nXS9faWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICB2YXIgdXVpZEFwcGxpY2F0aW9uID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ0FwcGxpY2F0aW9uJ10vX2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG5cbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICBcImFkb3B0QXBwbGljYXRpb25cIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHBsaWNhdGlvbklkXCI6IF9XRkluc3RhbmNlLnByb2ZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImluZGljYXRvclVVSURcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQWRvcHRpb25cIjogdXVpZEFkb3B0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUHVibGlzaEFwcGxpY2F0aW9uXCI6IHV1aWRQdWJsaXNoQXBwbGljYXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBcHBsaWNhdGlvblwiOiB1dWlkQXBwbGljYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24gKHdvcmtlclN1Y2Nlc3MpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya2VyIHByb2Nlc3NlcyBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAod29ya2VyRmFpbCkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZVRheG9ub215OiBmdW5jdGlvbiAoX2RlZiwgdXVpZCwgX1dGSW5zdGFuY2UpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG5ldyBEYXRlKCkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2VuZGVyVXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XG5cbiAgICAgICAgICAgICAgICB2YXIgdGF4b25vbXlVVUlEID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ1RheG9ub215J10vaW5zdGFuY2VzWzFdL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcblxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIFwiY3JlYXRlVGF4b25vbXlcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YXhvbm9teVVVSURcIjogdGF4b25vbXlVVUlEXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbiAod29ya2VyU3VjY2Vzcykge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdXb3JrZXIgcHJvY2Vzc2VzIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICh3b3JrZXJGYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh3b3JrZXJGYWlsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxufSkoKTtcblxudmFyIHdvcmtlciA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIGdldFdvcmtlcldyYXBwZXI6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgdmFyIHdyYXBwZXIgPSB7XG4gICAgICAgICAgICAgICAgXCJzb3VyY2VcIjogXCJyZW1vdGVcIixcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ3b3JrZXJPYmplY3RcIixcbiAgICAgICAgICAgICAgICBcIl9pZFwiOiBcIlwiLFxuICAgICAgICAgICAgICAgIFwiY2hhbm5lbHNcIjogW10sXG4gICAgICAgICAgICAgICAgXCJjb21tdW5pdHlJZFwiOiBcIlwiLFxuICAgICAgICAgICAgICAgIFwiYXBwbGljYXRpb25JZFwiOiBcIlwiLFxuICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIlwiLFxuICAgICAgICAgICAgICAgIFwibWVzc2FnZVR5cGVcIjogXCJpbmZvXCIsXG4gICAgICAgICAgICAgICAgXCJjcmVhdGVkRGF0ZVRpbWVcIjogXCJcIixcbiAgICAgICAgICAgICAgICBcInNlbmRlclVzZXJJZFwiOiBcIlwiLFxuICAgICAgICAgICAgICAgIFwiYWN0aW9uXCI6IHtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIHdyYXBwZXI7XG5cbiAgICAgICAgfSxcbiAgICAgICAgc2VuZDogZnVuY3Rpb24gKHdvcmtlck9iamVjdCkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1N1Ym1pdHRpbmcgV29ya2VyIE9iamVjdCB0byBzZXJ2ZXInKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh3b3JrZXJPYmplY3QpO1xuICAgICAgICAgICAgICAgIGRhby5zYXZlKHdvcmtlck9iamVjdCkuZG9uZShmdW5jdGlvbiAod29ya2VyUmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh3b3JrZXJSZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBzdWJtaXR0aW5nIHdvcmtlciByZXNwb25zZSAhIScgKyBlcnIpO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbn0pKCk7XG5cbnZhciBwZXJmb3JtYW5jZSA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIGNyZWF0ZTogZnVuY3Rpb24gKF9kZWYsIHV1aWQsIF9XRkluc3RhbmNlKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5faWQgPSBnZW5lcmF0ZVVVSUQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY29tbXVuaXR5SWQgPSBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYXBwbGljYXRpb25JZCA9IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jcmVhdGVkRGF0ZVRpbWUgPSBuZXcgRGF0ZSgpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xuXG4gICAgICAgICAgICAgICAgdmFyIHV1aWRDb21tdW5pdHkgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAncGxhbiddL19pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIFwiY3JlYXRlUGxhblwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInBsYW5VVUlEXCI6IHV1aWRDb21tdW5pdHlcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hY3Rpb24gPSBhY3Rpb247XG4gICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uICh3b3JrZXJTdWNjZXNzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1dvcmtlciBwcm9jZXNzZWQgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHdvcmtlckZhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdvcmtlckZhaWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgY29uZmlndXJlTm9kZTogZnVuY3Rpb24gKF9kZWYsIHV1aWQsIF9XRkluc3RhbmNlKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5faWQgPSBnZW5lcmF0ZVVVSUQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY29tbXVuaXR5SWQgPSBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYXBwbGljYXRpb25JZCA9IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jcmVhdGVkRGF0ZVRpbWUgPSBuZXcgRGF0ZSgpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xuXG4gICAgICAgICAgICAgICAgdmFyIHV1aWROb2RlSW5TdWJQcm9jZXNzID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ25vZGUnXS9pbnN0YW5jZXNbMV0vdXVpZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb25maWd1cmVOb2RlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibm9kZVVVSURcIjogdXVpZE5vZGVJblN1YlByb2Nlc3NcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hY3Rpb24gPSBhY3Rpb247XG4gICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uICh3b3JrZXJTdWNjZXNzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1dvcmtlciBwcm9jZXNzZWQgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHdvcmtlckZhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdvcmtlckZhaWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHVubG9ja1BlcmlvZDogZnVuY3Rpb24gKF9kZWYsIHV1aWQsIF9XRkluc3RhbmNlKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgc3VicHJvY2Vzc09iamVjdCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuXG4gICAgICAgICAgICAgICAgLy8gbWVzc2FnZSBmcm9tIHN0ZXAgOiBUT0RPIFxuXG4gICAgICAgICAgICAgICAgdmFyIGVudHJ5VVVJRCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tpZCBlcSAnXCIgKyBQRVJJT0RfU0VUX0lEICsgXCInXS9pbnN0YW5jZXMvdXVpZFwiLCBzdWJwcm9jZXNzT2JqZWN0LCB7fSlbMF07XG4gICAgICAgICAgICAgICAgdmFyIGVuZGRhdGUgPSBzdWJwcm9jZXNzT2JqZWN0LmRhdGVzLnZhbGlkO1xuXG4gICAgICAgICAgICAgICAgbGlicmFyeS51bmxvY2tQZXJpb2QoZW50cnlVVUlELCBlbmRkYXRlKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHV1aWRTYXZlZEluZGljYXRvciA9IGRhdGEuaWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgZGFvLmdldCh1dWlkU2F2ZWRJbmRpY2F0b3IpLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IF9XRkluc3RhbmNlLmluZGljYXRvcnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvciA9IF9XRkluc3RhbmNlLmluZGljYXRvcnNbaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRpY2F0b3IuX2lkID09IGRhdGEuX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5wdXNoKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnVW5sb2NrIHBlcmlvZC4nLCBkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG5cblxuXG5cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0TW9kZWxTdGF0dXM6IGZ1bmN0aW9uIChfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgc3VicHJvY2Vzc09iamVjdCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgIHZhciBlbnRyeVVVSUQgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbaWQgZXEgJ1wiICsgUEVSSU9EX1NFVF9JRCArIFwiJ10vaW5zdGFuY2VzL3V1aWRcIiwgc3VicHJvY2Vzc09iamVjdCwge30pWzBdO1xuICAgICAgICAgICAgICAgIHZhciBlbmRkYXRlID0gc3VicHJvY2Vzc09iamVjdC5kYXRlcy52YWxpZDtcblxuICAgICAgICAgICAgICAgIHZhciBzdGF0dXNpMThuTGFiZWwgPSBKU09OLnhwYXRoKFwiL2xhYmVsXCIsIF9kZWYgLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgdmFyIHN0YXR1cyA9IGhlbHBlci5nZXRMYW5ndWFnZU1lc3NhZ2Uoc3RhdHVzaTE4bkxhYmVsKTtcblxuXG4gICAgICAgICAgICAgICAgbGlicmFyeS5zZXRQZXJpb2RTdGF0dXMoZW50cnlVVUlELCBlbmRkYXRlLCBzdGF0dXMpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgdXVpZFNhdmVkSW5kaWNhdG9yID0gZGF0YS5pZDtcbiAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgLy9iZWxvdyBzZWN0aW9uIHdpbGwgYmUgdW5jb21tZW50ZWQgYW5kIHJldHVybmVkIGluZGljYXRvciBtb2RlbCB3aWxsIGJlIHJlZnJlc2hlZCBhbmQgdWRwYXRlZCB0byB3b3JrZmxvdyBvYmplY3QgLiBVbmNvbW1lbnQgYmVsb3cgY29kZSBvbmNlIHNhdGluZGVyIGlzIGRvbmUgd2l0aCB0aGUgZnVuY3Rpb24uXG5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGRhby5nZXQodXVpZFNhdmVkSW5kaWNhdG9yKS5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3IgPSBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kaWNhdG9yLl9pZCA9PSBkYXRhLl9pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ3NldE1vZGVsU3RhdHVzJywgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0pLmZhaWwoZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIH0pOyBcblxuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG5cblxuXG5cblxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgIFxuICAgICAgICBsb2NrUGVyZm9ybWFuY2VNb2RlbDogZnVuY3Rpb24gKF9kZWYsIHV1aWQsIF9XRkluc3RhbmNlKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgc3VicHJvY2Vzc09iamVjdCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuXG4gICAgICAgICAgICAgICAgdmFyIGVudHJ5VVVJRCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tpZCBlcSAnXCIgKyBQRVJGT1JNQU5DRV9TRVRfSUQgKyBcIiddL2luc3RhbmNlcy91dWlkXCIsIHN1YnByb2Nlc3NPYmplY3QsIHt9KVswXTtcbiAgICAgICAgICAgICAgICB2YXIgZW5kZGF0ZSA9IHN1YnByb2Nlc3NPYmplY3QuZGF0ZXMudmFsaWQ7XG5cbiAgICAgICAgICAgICAgICBsaWJyYXJ5LmxvY2tQZXJmb3JtYW5jZU1vZGVsKGVudHJ5VVVJRCwgZW5kZGF0ZSkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciB1dWlkU2F2ZWRJbmRpY2F0b3IgPSBkYXRhLmlkO1xuXG4gICAgICAgICAgICAgICAgICAgIGRhby5nZXQodXVpZFNhdmVkSW5kaWNhdG9yKS5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3IgPSBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kaWNhdG9yLl9pZCA9PSBkYXRhLl9pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0xvY2sgcGVyZm9ybWFuY2UgbW9kZWwuJywgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0pLmZhaWwoZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuXG5cblxuXG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn0pKCk7XG5cbnZhciBzZG8gPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uIChfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IHdvcmtlci5nZXRXb3JrZXJXcmFwcGVyKCk7XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbmV3IERhdGUoKS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZW5kZXJVc2VySWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZDtcblxuICAgICAgICAgICAgICAgIHZhciBzZG9VVUlEID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ1NETyddL2luc3RhbmNlc1sxXS91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG5cbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZVNET1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInNkb1VVSURcIjogc2RvVVVJRFxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24gKHdvcmtlclN1Y2Nlc3MpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya2VyIHByb2Nlc3NlcyBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAod29ya2VyRmFpbCkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbn0pKCk7XG5cbnZhciB0YXhvbm9teSA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIGNyZWF0ZTogZnVuY3Rpb24gKF9kZWYsIHV1aWQsIF9XRkluc3RhbmNlKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5faWQgPSBnZW5lcmF0ZVVVSUQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY29tbXVuaXR5SWQgPSBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYXBwbGljYXRpb25JZCA9IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jcmVhdGVkRGF0ZVRpbWUgPSBuZXcgRGF0ZSgpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xuXG4gICAgICAgICAgICAgICAgdmFyIHRheG9ub215VVVJRCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pbmRpY2F0b3JzW2lkIGVxICdUYXhvbm9teSddL2luc3RhbmNlc1sxXS91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG5cbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZVRheG9ub215XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGF4b25vbXlVVUlEXCI6IHRheG9ub215VVVJRFxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24gKHdvcmtlclN1Y2Nlc3MpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya2VyIHByb2Nlc3NlcyBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAod29ya2VyRmFpbCkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbn0pKCk7XG5cbnZhciBzdWJQcm9jZXNzSW5zdGFuY2UgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICBzZXRUaXRsZTogZnVuY3Rpb24gKF9kZWYsIHV1aWQsIGRhdGFWYWx1ZSwgX1dGSW5zdGFuY2UpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgICAgIHZhciBzcFByb2Nlc3NPYmplY3QgPSBKU09OLnhwYXRoKFwiL2luc3RhbmNlL3Byb2Nlc3Nlcy9zdWJQcm9jZXNzZXNbdXVpZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBhcHAuU0NPUEUud29ya2Zsb3csIHt9KVswXTtcbiAgICAgICAgICAgICAgICBzcFByb2Nlc3NPYmplY3QubGFiZWwgPSBkYXRhVmFsdWU7XG5cbiAgICAgICAgICAgICAgICB2YXIgaXRlbXNUb1Byb2Nlc3MgPSAxO1xuICAgICAgICAgICAgICAgIHZhciBzdHVmZiA9IFtdO1xuICAgICAgICAgICAgICAgIHZhciBvYmogPSB7fTtcblxuICAgICAgICAgICAgICAgIG9iai5tb2RlbCA9IF9XRkluc3RhbmNlLmluc3RhbmNlO1xuICAgICAgICAgICAgICAgIHN0dWZmLnB1c2gob2JqKTtcbiAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnU3VicHJvY2VzcyBzZXRUaXRsZSBzdWNjZXNzLicsIF9XRkluc3RhbmNlLmluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICBzZXRWYWxpZERhdGU6IGZ1bmN0aW9uIChfZGVmLCB1dWlkLCBkYXRhVmFsdWUsIF9XRkluc3RhbmNlKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgc3BQcm9jZXNzT2JqZWN0ID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddXCIsIGFwcC5TQ09QRS53b3JrZmxvdywge30pWzBdO1xuICAgICAgICAgICAgICAgIHNwUHJvY2Vzc09iamVjdC5kYXRlcy52YWxpZCA9IGRhdGFWYWx1ZTtcblxuICAgICAgICAgICAgICAgIHZhciBpdGVtc1RvUHJvY2VzcyA9IDE7XG4gICAgICAgICAgICAgICAgdmFyIHN0dWZmID0gW107XG4gICAgICAgICAgICAgICAgdmFyIG9iaiA9IHt9O1xuXG4gICAgICAgICAgICAgICAgb2JqLm1vZGVsID0gc3BQcm9jZXNzT2JqZWN0O1xuICAgICAgICAgICAgICAgIHN0dWZmLnB1c2gob2JqKTtcblxuICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCd2YWxpZCBkYXRlIHNldC4nLCBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbn0pKCk7XG5cbnZhciB2YXJpYWJsZXMgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICBzZXRWYXJpYWJsZTogZnVuY3Rpb24gKHNldFZhcmlhYmxlLCBfV0ZJbnN0YW5jZSwgdXVpZCkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICAgICAgaGVscGVyLmdldE5vZGVWYWx1ZShzZXRWYXJpYWJsZS5kYXRhLCBfV0ZJbnN0YW5jZSwgdXVpZCkudGhlbihmdW5jdGlvbiAoZGF0YVZhbHVlKSB7XG5cblxuICAgICAgICAgICAgICAgICAgICB2YXIgc2NvcGUgPSBzZXRWYXJpYWJsZS5zY29wZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhcmlhYmxlTmFtZSA9IHNldFZhcmlhYmxlLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YXJpYWJsZVR5cGUgPSBzZXRWYXJpYWJsZS52YXJpYWJsZVR5cGU7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbGlkRGF0ZSA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9kYXRlcy92YWxpZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoc2NvcGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3Byb2ZpbGUnOlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb2ZpbGVJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb2ZpbGVWYXJpYWJsZUZpbGVOYW1lID0gcHJvZmlsZUlkICsgJzp2YXJpYWJsZXMnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhby5nZXQocHJvZmlsZVZhcmlhYmxlRmlsZU5hbWUpLmRvbmUoZnVuY3Rpb24gKGZpbGUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFyaWFibGVUeXBlID09ICdwZXJpb2RpYycpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogT3ZlcndyaXRlIHRoZSBleGlzdGluZyB2YXJpYWJsZSBpbiBjYXNlIHdoZXJlIHNhbWUgdmFyaWFibGUgaXMgYXNzaWduZWQgYXQgbXVsdGlwbGUgc3RlcHMuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm9jZXNzT2JqID0gSlNPTi54cGF0aChcIi9pbnN0YW5jZS9wcm9jZXNzZXNbc3ViUHJvY2Vzc2VzL3V1aWQgZXEgJ1wiICsgdXVpZCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZXEgPSBwcm9jZXNzT2JqLnNlcTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJQcm9jZXNzVVVJRFwiOiB1dWlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlclwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlck5hbWVcIjogTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VybmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VySWRcIjogTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VyUHJvZmlsZUlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlcVwiOiBzZXEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWxpZERhdGVcIjogdmFsaWREYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZGF0YVZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGZpbGVbdmFyaWFibGVOYW1lXSAhPSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2YWwoJ2ZpbGUuJyArIHZhcmlhYmxlTmFtZSArICcucHVzaChvYmopJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVbdmFyaWFibGVOYW1lXSA9IFtvYmpdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlW3ZhcmlhYmxlTmFtZV0gPSBkYXRhVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYW8udXBzZXJ0KGZpbGUpLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoXCJWYXJpYWJsZSBzZXQgc3VjY2Vzc2Z1bGx5XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiRmFpbGVkIHRvIHNldCBWYXJpYWJsZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uIChlcnJvcikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaWxlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJfaWRcIjogcHJvZmlsZVZhcmlhYmxlRmlsZU5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlLmNoYW5uZWxzID0gYXBwLnByb2ZpbGUuY2hhbm5lbHM7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhcmlhYmxlVHlwZSA9PSAncGVyaW9kaWMnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvY2Vzc09iaiA9IEpTT04ueHBhdGgoXCIvaW5zdGFuY2UvcHJvY2Vzc2VzW3N1YlByb2Nlc3Nlcy91dWlkIGVxICdcIiArIHV1aWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VxID0gcHJvY2Vzc09iai5zZXE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlW3ZhcmlhYmxlTmFtZV0gPSBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3ViUHJvY2Vzc1VVSURcIjogdXVpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVzZXJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVzZXJOYW1lXCI6IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlcklkXCI6IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlclByb2ZpbGVJZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZXFcIjogc2VxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsaWREYXRlXCI6IHZhbGlkRGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGRhdGFWYWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlW3ZhcmlhYmxlTmFtZV0gPSBkYXRhVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYW8udXBzZXJ0KGZpbGUpLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoXCJWYXJpYWJsZSBzZXQgc3VjY2Vzc2Z1bGx5XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiRmFpbGVkIHRvIHNldCBWYXJpYWJsZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N1YlByb2Nlc3NJbnN0YW5jZSc6XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKFwibm90IGltcGxlbWVudGVkXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzdGVwJzpcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoXCJub3QgaW1wbGVtZW50ZWRcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiZ2V0Tm9kZVZhbHVlIHZhbHVlIG5vdCBmb3VuZC5cIik7XG4gICAgICAgICAgICAgICAgfSk7XG5cblxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbn0pKCk7XG5cblxuXG52YXIgbm90aWZpY2F0aW9uID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgZW1haWw6IGZ1bmN0aW9uIChlbWFpbCwgX1dGSW5zdGFuY2UsIHV1aWQpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5faWQgPSBnZW5lcmF0ZVVVSUQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY29tbXVuaXR5SWQgPSBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYXBwbGljYXRpb25JZCA9IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jcmVhdGVkRGF0ZVRpbWUgPSBuZXcgRGF0ZSgpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xuXG4gICAgICAgICAgICAgICAgdmFyIGZyb21PYmplY3QgPSB7fTtcbiAgICAgICAgICAgICAgICBmcm9tT2JqZWN0LmVtYWlsQWRkcmVzcyA9IE5PVElGSUNBVElPTl9GUk9NX0FERFJFU1M7XG4gICAgICAgICAgICAgICAgZnJvbU9iamVjdC5uYW1lID0gTk9USUZJQ0FUSU9OX0ZST01fTkFNRTtcblxuICAgICAgICAgICAgICAgIHZhciBnZXRMaXN0ID0gZnVuY3Rpb24gKGVtYWlsKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRvQXJyYXkgPSBbXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVtYWlsLnJlY2lwaWVudHMucm9sZSAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb2xlID0gZW1haWwucmVjaXBpZW50cy5yb2xlLnJvbGVJZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaWQgPSAnJztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbWFpbC5yZWNpcGllbnRzLnJvbGUucHJvZmlsZSA9PSAnY3VycmVudCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZW1haWwucmVjaXBpZW50cy5yb2xlLnByb2ZpbGUgPT0gJ2NvbW11bml0eScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQgPSBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWJyYXJ5LmdldFVzZXJzTGlzdEJ5Um9sZShpZCwgcm9sZSkudGhlbihmdW5jdGlvbiAobGlzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGlzdCAhPSB1bmRlZmluZWQgJiYgbGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvQXJyYXkucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBsaXN0W2ldLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogbGlzdFtpXS5pZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0b0FycmF5KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiRVJST1I6IE5vIHVzZXJzIGZvdW5kIGluIHJvbGUgbGlzdFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJFUlJPUjogQ2Fubm90IGZldGNoIHVzZXJzIGZyb20gcm9sZS4gRXhpdGluZy5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZW1haWwucmVjaXBpZW50cy5hc3NpZ25lZFRvICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvQXJyYXkucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IGFzc2lnbmVkVG9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRvQXJyYXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cblxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB2YXIgY2NBcnJheSA9IFtdO1xuICAgICAgICAgICAgICAgIHZhciBiY2NBcnJheSA9IFtdO1xuICAgICAgICAgICAgICAgIHZhciBoZWFkaW5nID0gZW1haWwuaGVhZGluZztcbiAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IHtcblxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZiAoZW1haWwubWVzc2FnZS5wbGFpbiAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLnBsYWluID0gZW1haWwubWVzc2FnZS5wbGFpbjtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZW1haWwubWVzc2FnZS5ydGYgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5ydGYgPSB7fVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbWFpbC5tZXNzYWdlLnJ0Zi5tYXJrdXAgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UucnRmLm1hcmt1cCA9IGVtYWlsLm1lc3NhZ2UucnRmLm1hcmt1cDtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVtYWlsLm1lc3NhZ2UucnRmLnRlbXBsYXRlICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBOb3QgaW1wbGVtZW50ZWRcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cblxuXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJub3RpZmljYXRpb25cIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJlbWFpbFwiOiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGdldExpc3QoZW1haWwpLnRoZW4oZnVuY3Rpb24gKHRvQXJyYXkpIHtcblxuICAgICAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmVtYWlsLmZyb20gPSBmcm9tT2JqZWN0O1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmVtYWlsLnRvID0gdG9BcnJheTtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5lbWFpbC5jYyA9IGNjQXJyYXk7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24uZW1haWwuYmNjID0gYmNjQXJyYXk7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24uZW1haWwuaGVhZGluZyA9IGhlYWRpbmc7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24uZW1haWwubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hY3Rpb24gPSBhY3Rpb247XG4gICAgICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbiAod29ya2VyU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cod29ya2VyT2JqZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdOb3RpZmljYXRpb24gRW1haWwgV29ya2VyIHByb2Nlc3NlcyBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICh3b3JrZXJGYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sXG4gICAgICAgIHNtczogZnVuY3Rpb24gKHNtcywgX1dGSW5zdGFuY2UsIHV1aWQpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSxcbiAgICAgICAgcHVzaEFQSTogZnVuY3Rpb24gKHB1c2hBUEksIF9XRkluc3RhbmNlLCB1dWlkKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG59KSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICAgIGNvbW11bml0eTogY29tbXVuaXR5LFxuICAgIGFwcGxpY2F0aW9uOiBhcHBsaWNhdGlvbixcbiAgICBwZXJmb3JtYW5jZTogcGVyZm9ybWFuY2UsXG4gICAgd29ya2VyOiB3b3JrZXIsXG4gICAgc2RvOiBzZG8sXG4gICAgdGF4b25vbXk6IHRheG9ub215LFxuICAgIHN1YlByb2Nlc3NJbnN0YW5jZTogc3ViUHJvY2Vzc0luc3RhbmNlLFxuICAgIHZhcmlhYmxlczogdmFyaWFibGVzLFxuICAgIG5vdGlmaWNhdGlvbjogbm90aWZpY2F0aW9uXG59IiwiJ3VzZSBzdHJpY3QnO1xuXG4vL3ZhciBnYXRla2VlcGVyID0gcmVxdWlyZSgnLi4vYm93ZXJfY29tcG9uZW50cy9nYXRla2VlcGVyJyk7XG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWxpdHknKTtcblxuLy8gdmFyIHV1aWQgPSByZXF1aXJlKCdub2RlLXV1aWQnKTtcblxudmFyIGdhdGVrZWVwZXIgPSBuZXcgR0soKTtcblxuLyoqXG4gKiBGb3JtIE1vZHVsZVxuICpcbiAqIEBtb2R1bGUgbGliL2Zvcm1cbiAqIEBhdXRob3IgQnJlbnQgR29yZG9uXG4gKiBAdmVyc2lvbiAyLjAuMFxuICogQGRlc2NyaXB0aW9uIHRlc3QgZGVzY3JpcHRpb25cbiAqIEBjb3B5cmlnaHQgS3dhbnR1IEx0ZCBSU0EgMjAwOS0yMDE1LlxuICpcbiAqL1xuXG5mdW5jdGlvbiBjcmVhdGUoYXJncykge1xuXG4gICAgdmFyIHByb2Nlc3NJZCA9IGFyZ3NbMF0gfHwgJyc7XG5cbiAgICB2YXIgc3ViUHJvY2VzcyA9IGFyZ3NbMV0gfHwge307XG5cbiAgICB2YXIgc3RlcCA9IGFyZ3NbMl0gfHwge307XG5cbiAgICB2YXIgYWN0aW9uID0gYXJnc1szXSB8fCB7fTtcblxuICAgIHZhciBfV0ZJbnN0YW5jZSA9IGFyZ3NbNl0gfHwge307XG5cbiAgICB2YXIgZGF0YSA9IGFyZ3NbNl0gfHwge307XG5cbiAgICB2YXIgaW5kaWNhdG9ycyA9IHN1YlByb2Nlc3MuaW5kaWNhdG9ycyB8fCBbXTtcblxuICAgIHZhciByZXN1bHQgPSBbXTtcblxuICAgIHZhciBpbmRpY2F0b3JUeXBlID0gYWN0aW9uLl90eXBlO1xuXG4gICAgdmFyIHByb2Nlc3NTZXEgPSBhcmdzWzRdIHx8ICcnO1xuXG4gICAgdmFyIHN1YlByb2Nlc3NTZXEgPSBhcmdzWzVdIHx8ICcnO1xuXG4gICAgdmFyIGNyZWF0ZVR5cGUgPSBhcmdzWzddIHx8ICcnO1xuXG4gICAgdmFyIHN1YlByb2Nlc3NJZCA9IHN1YlByb2Nlc3MuX2lkO1xuXG4gICAgdmFyIHV1aWQgPSBhcmdzWzhdIHx8ICcnO1xuXG4gICAgdmFyIGJhc2VVVUlEID0gYXJnc1s5XSB8fCAnJztcblxuICAgIHZhciBwcm9maWxlID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcblxuICAgIHZhciBpbnB1dERhdGEgPSBhcmdzWzEwXSB8fCB7fTtcblxuICAgIHZhciBmb3JtQ3JlYXRlVHlwZSA9IGFjdGlvbi5tZXRob2QuZm9ybS5jcmVhdGU7XG5cbiAgICB2YXIgZm9ybVR5cGUgPSBhY3Rpb24ubWV0aG9kLmZvcm0udHlwZTtcblxuICAgIHZhciBwYXJhbU9iamVjdCA9IHtcblxuICAgICAgICBcImZvcm1DcmVhdGVUeXBlXCI6IGZvcm1DcmVhdGVUeXBlLFxuICAgICAgICBcImZvcm1UeXBlXCI6IGZvcm1UeXBlXG5cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciB0b1Byb2Nlc3MgPSBpbmRpY2F0b3JzLmxlbmd0aDtcblxuICAgICAgICB2YXIgc3VicHJvY2Vzc1R5cGUgPSBKU09OLnhwYXRoKFwiL2NvbmZpZy9wcm9jZXNzZXMvc3ViUHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzdWJQcm9jZXNzSWQgKyBcIiddL3R5cGVcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcblxuICAgICAgICB2YXIgZm9ybUNyZWF0ZUZuID0gZnVuY3Rpb24oaW5kaWNhdG9yVHlwZSwgaW5kaWNhdG9ySWQsIHZhbGlkRGF0ZSwgaW5zdGFudGlhdGVTb3VyY2UpIHtcblxuICAgICAgICAgICAgZ2F0ZWtlZXBlci5pbnN0YW50aWF0ZShiYXNlVVVJRCwgaW5kaWNhdG9yVHlwZSwgaW5kaWNhdG9ySWQsIF9XRkluc3RhbmNlLnByb2ZpbGUsIHZhbGlkRGF0ZSwgc3ViUHJvY2Vzc0lkLCBzdWJwcm9jZXNzVHlwZSkudGhlbihmdW5jdGlvbihkb2NBcnJheSkge1xuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgaW5kaWNhdG9yIHdvcmtmbG93IHByb2Nlc3NlcyBzZWN0aW9uXG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRvY0FycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmplY3QgPSBkb2NBcnJheVtpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvYmplY3QubW9kZWwuX2lkLmVuZHNXaXRoKCc6YXBwcm92ZWQnKSAmJiAhb2JqZWN0Lm1vZGVsLl9pZC5lbmRzV2l0aCgnOnJlamVjdGVkJykpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHdvcmtmbG93T2JqID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogX1dGSW5zdGFuY2UuY29uZmlnLl9pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImluc3RhbmNlXCI6IF9XRkluc3RhbmNlLmluc3RhbmNlLl9pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb2Nlc3Nlc1wiOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IHByb2Nlc3NJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJQcm9jZXNzSWRcIjogc3ViUHJvY2Vzcy5faWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3ViUHJvY2Vzc1VVSURcIjogdXVpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdGVwXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogc3RlcC5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VxXCI6IHN0ZXAuc2VxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdGFydERhdGVcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3RhdHVzXCI6IHN0ZXAuc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IHN0ZXAubWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXNzaWduZWRUb1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VySWRcIjogc3RlcC5hc3NpZ25lZFRvLnVzZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogc3RlcC5hc3NpZ25lZFRvLm5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbW1lbnRcIjogc3RlcC5jb21tZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21wbGV0ZVwiOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZW5kRGF0ZVwiOiBcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24uc2V0V29ya2Zsb3dMYWJlbEluVGl0bGUgIT0gdW5kZWZpbmVkICYmIGFjdGlvbi5zZXRXb3JrZmxvd0xhYmVsSW5UaXRsZSAhPSAnJyAmJiBhY3Rpb24uc2V0V29ya2Zsb3dMYWJlbEluVGl0bGUgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdC5tb2RlbC50aXRsZSA9IGlucHV0RGF0YS5sYWJlbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGlvbi5zZXREcmFmdCAhPSB1bmRlZmluZWQgJiYgYWN0aW9uLnNldERyYWZ0ICE9ICcnICYmIGFjdGlvbi5zZXREcmFmdCA9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0Lm1vZGVsLmNvbnRyb2wuZHJhZnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3QubW9kZWwud29ya2Zsb3dzLnB1c2god29ya2Zsb3dPYmopO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1haW5JZCA9IG9iamVjdC5tb2RlbC5faWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwZXJzaXN0IHZpYSBnayBzbyB0aGF0IGl0IGlzIHNhdmUgaW4gY291Y2hcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhdGVrZWVwZXIucGVyc2lzdChkb2NBcnJheSkudGhlbihmdW5jdGlvbihzYXZlZEFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy91c2luZyBzYW1lIGlkIGNhbGwgaW5pdGlhbGlzZURhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NhbGwgY29kZSB0byBzZXQgdG8gc2V0SW5zdGFuY2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYW8uZ2V0KG1haW5JZCkuZG9uZShmdW5jdGlvbihkYXRhKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvck1vZGVsID0ga28ubWFwcGluZy5mcm9tSlMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkZWZhdWx0TW9kZWxcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2V0SWRcIjogaW5kaWNhdG9ySWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2F0ZWtlZXBlci5pbnN0YW50aWF0ZURhdGEobWFpbklkLCBpbnN0YW50aWF0ZVNvdXJjZSwgaW5kaWNhdG9yTW9kZWwsIGRhdGEubW9kZWwucGVuZGluZy5zZXEsIHBhcmFtT2JqZWN0KS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhWzBdLnN0YXR1cyA9PSBcIjIwMFwiKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uLnNldFdvcmtmbG93TGFiZWxJbkZpZWxkICE9IHVuZGVmaW5lZCAmJiBhY3Rpb24uc2V0V29ya2Zsb3dMYWJlbEluRmllbGQgIT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFzc2lnbm1lbnRTZXRJZCA9IGFjdGlvbi5zZXRXb3JrZmxvd0xhYmVsSW5GaWVsZC5zcGxpdChcIi5cIilbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhc3NpZ25tZW50U2V0SWQgPT0gaW5kaWNhdG9ySWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGFbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhdGggPSBcImRhdGFbMF0ubW9kZWwubW9kZWwucGVuZGluZy5kYXRhLlwiICsgYWN0aW9uLnNldFdvcmtmbG93TGFiZWxJbkZpZWxkICsgXCI9J1wiICsgaW5wdXREYXRhLmxhYmVsICsgXCInXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmFsKHBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYXRla2VlcGVyLnBlcnNpc3QoZGF0YSkudGhlbihmdW5jdGlvbihzYXZlZEFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhby5nZXQobWFpbklkKS5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5wdXNoKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvUHJvY2Vzcy0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b1Byb2Nlc3MgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnRm9ybSBjcmVhdGVkIHN1Y2Nlc3NmdWxseS4nLCBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvciA9IF9XRkluc3RhbmNlLmluZGljYXRvcnNbaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kaWNhdG9yLl9pZCA9PSBkYXRhLl9pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBjdXJyZW50IGl0ZW0gZnJvbSB0aGUgYXJyYXkgYW5kIGFkZCB0aGUgdXBkYXRlZCBwcm9jZXNzTW9kZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvUHJvY2Vzcy0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRvUHJvY2VzcyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gY3JlYXRlZCBzdWNjZXNzZnVsbHkuJywgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm91bmQgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5wdXNoKGRhdGEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvUHJvY2Vzcy0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9Qcm9jZXNzID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5LicsIF9XRkluc3RhbmNlLmluZGljYXRvcnMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZhaWx1cmUgPSB1dGlsLnN1Y2Nlc3MoJzEgR2F0ZWtlZXBlciBpbml0aWFsaXNhdGlvbiBmYWlsZWQgd2l0aCBpbml0aWFsaXNlRGF0YSBtZXNzYWdlICcgKyBlcnJbMF0ubWVzc2FnZSwge30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGZhaWx1cmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmYWlsdXJlID0gdXRpbC5zdWNjZXNzKCcyIEdhdGVrZWVwZXIgaW5pdGlhbGlzYXRpb24gZmFpbGVkIHdpdGggaW5pdGlhbGlzZURhdGEgbWVzc2FnZSAnICsgZXJyWzBdLm1lc3NhZ2UsIHt9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGZhaWx1cmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmYWlsdXJlID0gdXRpbC5zdWNjZXNzKCczIEdhdGVrZWVwZXIgaW5pdGlhbGlzYXRpb24gZmFpbGVkIHdpdGggaW5pdGlhbGlzZURhdGEgbWVzc2FnZSAnICsgZXJyWzBdLm1lc3NhZ2UsIHt9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFpbHVyZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmFpbHVyZSA9IHV0aWwuc3VjY2VzcygnNCBHYXRla2VlcGVyIGluaXRpYWxpc2F0aW9uIGZhaWxlZCB3aXRoIGluaXRpYWxpc2VEYXRhIG1lc3NhZ2UgJyArIGVyclswXS5tZXNzYWdlLCB7fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFpbHVyZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuZmFpbChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmFpbHVyZSA9IHV0aWwuc3VjY2VzcygnNSBHYXRla2VlcGVyIGluaXRpYWxpc2F0aW9uIGZhaWxlZCB3aXRoIGluaXRpYWxpc2VEYXRhIG1lc3NhZ2UgJyArIGVyclswXS5tZXNzYWdlLCB7fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChmYWlsdXJlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmYWlsdXJlID0gdXRpbC5zdWNjZXNzKCc2IEdhdGVrZWVwZXIgaW5pdGlhbGlzYXRpb24gZmFpbGVkIHdpdGggaW5pdGlhbGlzZURhdGEgbWVzc2FnZSAnICsgZXJyWzBdLm1lc3NhZ2UsIHt9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFpbHVyZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcblxuICAgICAgICAgICAgICAgIHZhciB0b0FkZFByb2Nlc3MgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IF9XRkluc3RhbmNlLmluc3RhbmNlLnByb2Nlc3Nlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoX1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzW2ldLnN1YlByb2Nlc3Nlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b0FkZFByb2Nlc3MucHVzaChfV0ZJbnN0YW5jZS5pbnN0YW5jZS5wcm9jZXNzZXNbaV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbnN0YW5jZS5wcm9jZXNzZXMgPSBbXTtcbiAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbnN0YW5jZS5wcm9jZXNzZXMgPSB0b0FkZFByb2Nlc3M7XG5cbiAgICAgICAgICAgICAgICB2YXIgdG9BZGRTdWJQcm9jZXNzID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlc1tpXS5pbmRpY2F0b3JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvQWRkU3ViUHJvY2Vzcy5wdXNoKF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLnN1YnByb2Nlc3NlcyA9IFtdO1xuICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLnN1YnByb2Nlc3NlcyA9IHRvQWRkU3ViUHJvY2VzcztcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB2YXIgZmFpbHVyZSA9IHV0aWwuc3VjY2VzcygnNyBHYXRla2VlcGVyIGluaXRpYWxpc2F0aW9uIGZhaWxlZCB3aXRoIGluaXRpYWxpc2VEYXRhIG1lc3NhZ2UgJyArIGVyclswXS5tZXNzYWdlLCB7fSk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGZhaWx1cmUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGluc3RhbnRpYXRlU291cmNlID0gRlJPTV9ERUZJTklUSU9OO1xuXG4gICAgICAgIGZvciAodmFyIGNvdW50ZXIgPSAwOyBjb3VudGVyIDwgaW5kaWNhdG9ycy5sZW5ndGg7IGNvdW50ZXIrKykge1xuICAgICAgICAgICAgdmFyIGluZGljYXRvcklkID0gaW5kaWNhdG9yc1tjb3VudGVyXS5faWQ7XG4gICAgICAgICAgICB2YXIgaW5kaWNhdG9yTmFtZSA9IHV0aWwuZ2V0TmFtZShpbmRpY2F0b3JzW2NvdW50ZXJdLm5hbWUsICdlbicpO1xuXG4gICAgICAgICAgICB2YXIgc291cmNlID0gaW5kaWNhdG9yc1tjb3VudGVyXS5pbml0aWF0ZURhdGE7XG5cbiAgICAgICAgICAgIHZhciBpbml0VHlwZSA9ICcnO1xuICAgICAgICAgICAgaWYgKHN1YlByb2Nlc3MuaW5zdGFuY2VUeXBlLm5ld1NlcXVlbmNlICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGluaXRUeXBlID0gSU5TVEFOQ0VfVFlQRV9ORVdfU0VRO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdWJQcm9jZXNzLmluc3RhbmNlVHlwZS5uZXdJbnN0YW5jZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpbml0VHlwZSA9IElOU1RBTkNFX1RZUEVfTkVXX0lOUztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGluZGljYXRvckRvYyA9IHt9O1xuICAgICAgICAgICAgaWYgKGJhc2VVVUlEICE9IHVuZGVmaW5lZCAmJiBiYXNlVVVJRCAhPSAnJyAmJiBiYXNlVVVJRC5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgc3AgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgYmFzZVVVSUQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYoc3ViUHJvY2Vzcy5wZXJpb2RUeXBlLnBlcmlvZGljID09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgIHNwLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpbnN0YW50aWF0ZVNvdXJjZSA9IEZST01fQVVUSE9SSVNFRDtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgY2FyZGluYWxpdHkgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbc2V0SWQgZXEgJ1wiICsgaW5kaWNhdG9ySWQgKyBcIiddL2NhcmRpbmFsaXR5XCIsIGFwcC5TQ09QRS5BUFBfQ09ORklHLCB7fSlbMF07XG5cbiAgICAgICAgICAgICAgICBpZiAoaW5pdFR5cGUgPT0gSU5TVEFOQ0VfVFlQRV9ORVdfSU5TKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhcmRpbmFsaXR5ID09IElORElDQVRPUl9DQVJESU5BTElUWV9TSU5HTEUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGV4aXN0aW5nVVVJRCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdcIiArIGluZGljYXRvcklkICsgXCInXS9faWRcIiwgX1dGSW5zdGFuY2UsIHt9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV4aXN0aW5nVVVJRC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFudGlhdGVTb3VyY2UgPSBGUk9NX0FVVEhPUklTRUQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbnRpYXRlU291cmNlID0gRlJPTV9ERUZJTklUSU9OO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFudGlhdGVTb3VyY2UgPSBGUk9NX0RFRklOSVRJT047XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhcmRpbmFsaXR5ID09IElORElDQVRPUl9DQVJESU5BTElUWV9TSU5HTEUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGV4aXN0aW5nVVVJRCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdcIiArIGluZGljYXRvcklkICsgXCInXS9faWRcIiwgYXBwLlNDT1BFLndvcmtmbG93LCB7fSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChleGlzdGluZ1VVSUQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbnRpYXRlU291cmNlID0gRlJPTV9BVVRIT1JJU0VEO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW50aWF0ZVNvdXJjZSA9IEZST01fREVGSU5JVElPTjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGF0aCA9IFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnXCIgKyBpbmRpY2F0b3JJZCArIFwiJ10vX2lkXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3VicHJvY2Vzc1R5cGUgPT0gUFJPQ0VTU19UWVBFX1NVQlBST0ZJTEUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoID0gXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdcIiArIGluZGljYXRvcklkICsgXCInIGFuZCBpZCA9IC9zdWJwcm9jZXNzZXNbaWQgPSAnXCIgKyBzdWJQcm9jZXNzSWQgKyBcIicgYW5kIGlkID0gL2luc3RhbmNlL3Byb2Nlc3Nlcy9zdWJQcm9jZXNzZXNbc3VicHJvZmlsZUlkIGVxICdcIiArIGFwcC5wcm9maWxlLnN1YnByb2ZpbGVJZCArIFwiJ10vdXVpZF0vaW5kaWNhdG9ycy9pbnN0YW5jZXMvdXVpZF0vX2lkXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXhpc3RpbmdVVUlEID0gSlNPTi54cGF0aChwYXRoLCBfV0ZJbnN0YW5jZSwge30pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmdVVUlELmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW50aWF0ZVNvdXJjZSA9IEZST01fQVVUSE9SSVNFRDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFudGlhdGVTb3VyY2UgPSBGUk9NX0RFRklOSVRJT047XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cblxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvcm1DcmVhdGVGbihpbml0VHlwZSwgaW5kaWNhdG9ySWQsICcnLCBpbnN0YW50aWF0ZVNvdXJjZSk7XG4gICAgICAgIH1cblxuICAgIH0pO1xufTtcblxuZnVuY3Rpb24gc2V0SW5zdGFuY2VUaXRsZShhcmdzKSB7XG5cbiAgICB2YXIgX1dGSW5zdGFuY2UgPSBhcmdzWzBdIHx8IHt9O1xuXG4gICAgdmFyIHV1aWQgPSBhcmdzWzJdIHx8ICcnO1xuICAgIHZhciBkYXRhID0gYXJnc1s0XSB8fCB7fTtcblxuICAgIHZhciB0aXRsZSA9IGRhdGEubGFiZWw7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgdmFyIHN1YlByb2Nlc3NJbnN0YW5jZSA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICB2YXIgaW5kaWNhdG9ySW5zdGFuY2VzID0gc3ViUHJvY2Vzc0luc3RhbmNlLmluZGljYXRvcnM7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbmRpY2F0b3JJbnN0YW5jZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JVVUlEID0gaW5kaWNhdG9ySW5zdGFuY2VzW2ldLmluc3RhbmNlc1swXS51dWlkO1xuICAgICAgICAgICAgdmFyIGluZGljYXRvckluc3RhbmNlID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW19pZCBlcSAnXCIgKyBpbmRpY2F0b3JVVUlEICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgaW5kaWNhdG9ySW5zdGFuY2UudGl0bGUgPSBpbmRpY2F0b3JJbnN0YW5jZXNbaV0uaWQgKyAnICcgKyB0aXRsZTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXNvbHZlKFwiU2V0IFRpdGxlIFN1Y2Nlc3NcIiwgaW5kaWNhdG9ySW5zdGFuY2VzKTtcblxuICAgIH0pO1xuXG59O1xuXG5mdW5jdGlvbiBkZWxldGVQcm9maWxlKGFyZ3MpIHtcblxuICAgIHZhciBfV0ZJbnN0YW5jZSA9IGFyZ3NbMF0gfHwge307XG5cbiAgICB2YXIgcHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0ge1xuICAgICAgICAgICAgXCJzb3VyY2VcIjogXCJyZW1vdGVcIixcbiAgICAgICAgICAgIFwidHlwZVwiOiBcIndvcmtlck9iamVjdFwiLFxuICAgICAgICAgICAgXCJfaWRcIjogZ2VuZXJhdGVVVUlEKCksXG4gICAgICAgICAgICBcImNoYW5uZWxzXCI6IFtdLFxuICAgICAgICAgICAgXCJjb21tdW5pdHlJZFwiOiBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKSxcbiAgICAgICAgICAgIFwiYXBwbGljYXRpb25JZFwiOiBhcHAuU0NPUEUuYXBwbGljYXRpb25JZCxcbiAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIlwiLFxuICAgICAgICAgICAgXCJtZXNzYWdlVHlwZVwiOiBcImluZm9cIixcbiAgICAgICAgICAgIFwiY3JlYXRlZERhdGVUaW1lXCI6IG1vbWVudCgpLmZvcm1hdCgpLFxuICAgICAgICAgICAgXCJzZW5kZXJVc2VySWRcIjogTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQsXG4gICAgICAgICAgICBcIm5vdGlmaWNhdGlvblwiOiB7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInByb2ZpbGVcIjoge1xuICAgICAgICAgICAgICAgIFwiYWN0aW9uXCI6IFwiZGVsZXRlUHJvZmlsZVwiLFxuICAgICAgICAgICAgICAgIFwicHJvZmlsZUlkXCI6IHByb2ZpbGVJZFxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZyh3b3JrZXJPYmplY3QpO1xuICAgICAgICBkYW8udXBzZXJ0KHdvcmtlck9iamVjdCkuZG9uZShmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIldvcmtlciBPYmplY3Qgc3VibWl0dGVkIGZvciBwcm9maWxlKFwiICsgcHJvZmlsZUlkICsgXCIpIGRlbGV0aW9uLlwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICByZWplY3QoZGF0YSk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVByb2ZpbGUoYXJncykge1xuXG4gICAgdmFyIF9XRkluc3RhbmNlID0gYXJnc1sxXSB8fCB7fTtcblxuICAgIHZhciBjb21tdW5pdHlJZCA9IF9XRkluc3RhbmNlLmNvbW11bml0eUlkO1xuICAgIHZhciBwcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgIGxpYnJhcnkuY3JlYXRlUHJvZmlsZURvY3VtZW50cyhjb21tdW5pdHlJZCwgcHJvZmlsZUlkKS5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcblxuICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gY3JlYXRlZCBzdWNjZXNzZnVsbHkuJywgZGF0YSk7XG4gICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgIH0pLmZhaWwoZnVuY3Rpb24oZXJyKSB7XG5cbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIHZhciBmYWlsdXJlID0gdXRpbC5zdWNjZXNzKCdFUlJPUjogUHJvZmlsZSBjcmVhdGlvbiBmYWlsZWQnICsgZXJyWzBdLm1lc3NhZ2UsIHt9KTtcbiAgICAgICAgICAgIHJlamVjdChmYWlsdXJlKTtcblxuICAgICAgICB9KTtcblxuICAgIH0pO1xufTtcblxuZnVuY3Rpb24gc2V0RHJhZnQoYXJncykge1xuXG4gICAgdmFyIF9XRkluc3RhbmNlID0gYXJnc1swXSB8fCB7fTtcblxuICAgIHZhciBjb21tdW5pdHlJZCA9IF9XRkluc3RhbmNlLmNvbW11bml0eUlkO1xuICAgIHZhciBwcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xuICAgIHZhciB1dWlkID0gYXJnc1syXSB8fCAnJztcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICB2YXIgc3ViUHJvY2Vzc0luc3RhbmNlID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgIHZhciBpbmRpY2F0b3JJbnN0YW5jZXMgPSBzdWJQcm9jZXNzSW5zdGFuY2UuaW5kaWNhdG9ycztcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluZGljYXRvckluc3RhbmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGluZGljYXRvclVVSUQgPSBpbmRpY2F0b3JJbnN0YW5jZXNbaV0uaW5zdGFuY2VzWzBdLnV1aWQ7XG4gICAgICAgICAgICB2YXIgaW5kaWNhdG9ySW5zdGFuY2UgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbX2lkIGVxICdcIiArIGluZGljYXRvclVVSUQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICBpbmRpY2F0b3JJbnN0YW5jZS5jb250cm9sLmRyYWZ0ID0gdHJ1ZTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXNvbHZlKFwiU2V0IERyYWZ0IFN1Y2Nlc3NcIiwgaW5kaWNhdG9ySW5zdGFuY2VzKTtcblxuICAgIH0pO1xufTtcblxuZnVuY3Rpb24gc2V0VW5EcmFmdChhcmdzKSB7XG5cbiAgICB2YXIgX1dGSW5zdGFuY2UgPSBhcmdzWzBdIHx8IHt9O1xuXG4gICAgdmFyIGNvbW11bml0eUlkID0gX1dGSW5zdGFuY2UuY29tbXVuaXR5SWQ7XG4gICAgdmFyIHByb2ZpbGVJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XG4gICAgdmFyIHV1aWQgPSBhcmdzWzJdIHx8ICcnO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgIHZhciBzdWJQcm9jZXNzSW5zdGFuY2UgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgdmFyIGluZGljYXRvckluc3RhbmNlcyA9IHN1YlByb2Nlc3NJbnN0YW5jZS5pbmRpY2F0b3JzO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5kaWNhdG9ySW5zdGFuY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgaW5kaWNhdG9yVVVJRCA9IGluZGljYXRvckluc3RhbmNlc1tpXS5pbnN0YW5jZXNbMF0udXVpZDtcbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JJbnN0YW5jZSA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tfaWQgZXEgJ1wiICsgaW5kaWNhdG9yVVVJRCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgIGluZGljYXRvckluc3RhbmNlLmNvbnRyb2wuZHJhZnQgPSBmYWxzZTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXNvbHZlKFwiU2V0IERyYWZ0IFN1Y2Nlc3NcIiwgaW5kaWNhdG9ySW5zdGFuY2VzKTtcblxuICAgIH0pO1xufTtcblxuZnVuY3Rpb24gc2F2ZShpbmRpY2F0b3IpIHtcbiAgICB2YXIgY29tcGxldGVkID0gW107XG4gICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgY29tcGxldGU6IHRydWUsXG4gICAgICAgIGRhdGE6IFtdXG4gICAgfTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gaW5kaWNhdG9yIHNldCBzYXZlZCBzdWNjZXNzZnVsbHkuJywgcmVzdWx0KTtcbiAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICB9KTtcbn07XG5cbmZ1bmN0aW9uIHN1Ym1pdChmb3JtKSB7XG4gICAgdmFyIGNvbXBsZXRlZCA9IFtdO1xuICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgIGNvbXBsZXRlOiB0cnVlLFxuICAgICAgICBkYXRhOiBbXVxuICAgIH07XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIHN1Ym1pdHRlZCBzdWNjZXNzZnVsbHkuJywgcmVzdWx0KTtcbiAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICB9KTtcbn07XG5cbmZ1bmN0aW9uIGF1dGhvcmlzZShmb3JtKSB7XG4gICAgdmFyIGNvbXBsZXRlZCA9IFtdO1xuICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgIGNvbXBsZXRlOiB0cnVlLFxuICAgICAgICBkYXRhOiBbXVxuICAgIH07XG5cbiAgICB2YXIgcHJvY2Vzc0lkID0gZm9ybVswXSB8fCAnJztcblxuICAgIHZhciBzdWJQcm9jZXNzID0gZm9ybVsxXSB8fCB7fTtcblxuICAgIHZhciBzdWJQcm9jZXNzSWQgPSBzdWJQcm9jZXNzLl9pZDtcblxuICAgIHZhciBwcm9jZXNzU2VxID0gZm9ybVsyXSB8fCAnJztcblxuICAgIHZhciBzdWJQcm9jZXNzU2VxID0gZm9ybVszXSB8fCAnJztcblxuICAgIHZhciBfV0ZJbnN0YW5jZSA9IGZvcm1bNF0gfHwge307XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgdmFyIHN1YlByb2Nlc3NVVUlEID0gSlNPTi54cGF0aChcIi9wcm9jZXNzZXNbaWQgZXEgJ1wiICsgcHJvY2Vzc0lkICsgXCInIGFuZCBzZXEgZXEgJ1wiICsgcHJvY2Vzc1NlcSArIFwiJ10vc3ViUHJvY2Vzc2VzW2lkIGVxICdcIiArIHN1YlByb2Nlc3NJZCArIFwiJyBhbmQgc2VxIGVxICdcIiArIHN1YlByb2Nlc3NTZXEgKyBcIiddL3V1aWRcIiwgX1dGSW5zdGFuY2UuaW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgdmFyIHNwSW5kaWNhdG9ycyA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzdWJQcm9jZXNzVVVJRCArIFwiJ10vaW5kaWNhdG9ycy9pbnN0YW5jZXMvdXVpZFwiLCBfV0ZJbnN0YW5jZSwge30pO1xuICAgICAgICB2YXIgaXRlbXNUb1Byb2Nlc3MgPSBzcEluZGljYXRvcnMubGVuZ3RoO1xuICAgICAgICB2YXIgdXBkYXRlZE9iamVjdHNBcnJheSA9IFtdO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXNUb1Byb2Nlc3M7IGkrKykge1xuXG4gICAgICAgICAgICBnYXRla2VlcGVyLmF1dGhvcmlzZShzcEluZGljYXRvcnNbaV0pLnRoZW4oZnVuY3Rpb24oYXV0aG9yaXNlZFJldHVybikge1xuXG4gICAgICAgICAgICAgICAgZ2F0ZWtlZXBlci5wZXJzaXN0KGF1dGhvcmlzZWRSZXR1cm4pLnRoZW4oZnVuY3Rpb24oc2F2ZWRBcnJheSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciB1dWlkU2F2ZWRJbmRpY2F0b3IgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCBzYXZlZEFycmF5Lmxlbmd0aDsgYysrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNhdmVkQXJyYXlbY10uaWQuZW5kc1dpdGgoJzphcHByb3ZlZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXVpZFNhdmVkSW5kaWNhdG9yID0gc2F2ZWRBcnJheVtjXS5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZGFvLmdldCh1dWlkU2F2ZWRJbmRpY2F0b3IpLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9XRkluc3RhbmNlLmluZGljYXRvcnMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNUb1Byb2Nlc3MtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbXNUb1Byb2Nlc3MgPT0gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGF1dGhvcmlzZWQgc3VjY2Vzc2Z1bGx5LicsIHVwZGF0ZWRPYmplY3RzQXJyYXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvciA9IF9XRkluc3RhbmNlLmluZGljYXRvcnNbaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kaWNhdG9yLl9pZCA9PSBkYXRhLl9pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBjdXJyZW50IGl0ZW0gZnJvbSB0aGUgYXJyYXkgYW5kIGFkZCB0aGUgdXBkYXRlZCBwcm9jZXNzTW9kZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zVG9Qcm9jZXNzLS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbXNUb1Byb2Nlc3MgPT0gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gYXV0aG9yaXNlZCBzdWNjZXNzZnVsbHkuJywgdXBkYXRlZE9iamVjdHNBcnJheSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm91bmQgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5wdXNoKGRhdGEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zVG9Qcm9jZXNzLS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1RvUHJvY2VzcyA9PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGF1dGhvcmlzZWQgc3VjY2Vzc2Z1bGx5LicsIHVwZGF0ZWRPYmplY3RzQXJyYXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSkuZmFpbChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaXRlbXNUb1Byb2Nlc3MtLTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbXNUb1Byb2Nlc3MgPT0gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGF1dGhvcmlzZWQgc3VjY2Vzc2Z1bGx5LicsIHVwZGF0ZWRPYmplY3RzQXJyYXkpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgfSk7XG59O1xuXG5mdW5jdGlvbiBjbG9zZShmb3JtKSB7XG4gICAgdmFyIGNvbXBsZXRlZCA9IFtdO1xuICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgIGNvbXBsZXRlOiB0cnVlLFxuICAgICAgICBkYXRhOiBbXVxuICAgIH07XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGNsb3NlZCBzdWNjZXNzZnVsbHkuJywgcmVzdWx0KTtcbiAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICB9KTtcbn07XG5cbmZ1bmN0aW9uIHVwZGF0ZUluZGljYXRvcihhcmdzKSB7XG5cbiAgICB2YXIgX1dGSW5zdGFuY2UgPSBhcmdzWzBdIHx8IHt9O1xuXG4gICAgdmFyIHV1aWQgPSBhcmdzWzFdIHx8ICcnO1xuICAgIHZhciBwYXRoID0gYXJnc1syXSB8fCAnJztcbiAgICB2YXIgZGF0YVZhbHVlID0gYXJnc1szXSB8fCAnJztcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICB2YXIgc3ViUHJvY2Vzc0luc3RhbmNlID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgIHZhciBpbmRpY2F0b3JJbnN0YW5jZXMgPSBzdWJQcm9jZXNzSW5zdGFuY2UuaW5kaWNhdG9ycztcbiAgICAgICAgdmFyIHNldElkID0gcGF0aC5zcGxpdChcIi5cIiwgMSlbMF07XG4gICAgICAgIHZhciBpbmRpY2F0b3JVVUlEID0gSlNPTi54cGF0aChcIi8qW2lkIGVxICdcIiArIHNldElkICsgXCInXS9pbnN0YW5jZXMvdXVpZFwiLCBpbmRpY2F0b3JJbnN0YW5jZXMsIHt9KVswXTtcbiAgICAgICAgdmFyIGluZE9iamVjdCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tfaWQgZXEgJ1wiICsgaW5kaWNhdG9yVVVJRCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgdmFyIGV4cHIgPSAnaW5kT2JqZWN0Lm1vZGVsLnBlbmRpbmcuZGF0YS4nICsgcGF0aCArICcgPSBcIicgKyBkYXRhVmFsdWUgKyAnXCInO1xuICAgICAgICBldmFsKGV4cHIpO1xuICAgICAgICB2YXIgaXRlbXNUb1Byb2Nlc3MgPSAxO1xuICAgICAgICB2YXIgc3R1ZmYgPSBbXTtcbiAgICAgICAgdmFyIG9iaiA9IHt9O1xuXG4gICAgICAgIG9iai5tb2RlbCA9IGluZE9iamVjdDtcbiAgICAgICAgc3R1ZmYucHVzaChvYmopO1xuXG4gICAgICAgIGdhdGVrZWVwZXIucGVyc2lzdChzdHVmZikudGhlbihmdW5jdGlvbihzYXZlZEFycmF5KSB7XG5cbiAgICAgICAgICAgIHZhciB1dWlkU2F2ZWRJbmRpY2F0b3IgPSAnJztcbiAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgc2F2ZWRBcnJheS5sZW5ndGg7IGMrKykge1xuICAgICAgICAgICAgICAgIGlmICghc2F2ZWRBcnJheVtjXS5pZC5lbmRzV2l0aCgnOmFwcHJvdmVkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgdXVpZFNhdmVkSW5kaWNhdG9yID0gc2F2ZWRBcnJheVtjXS5pZDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGFvLmdldCh1dWlkU2F2ZWRJbmRpY2F0b3IpXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5wdXNoKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNUb1Byb2Nlc3MtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1RvUHJvY2VzcyA9PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnSW5kaWNhdG9yIHVwZGF0ZWQuJywgc3R1ZmYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3VuZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IF9XRkluc3RhbmNlLmluZGljYXRvcnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvciA9IF9XRkluc3RhbmNlLmluZGljYXRvcnNbaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRpY2F0b3IuX2lkID09IGRhdGEuX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBjdXJyZW50IGl0ZW0gZnJvbSB0aGUgYXJyYXkgYW5kIGFkZCB0aGUgdXBkYXRlZCBwcm9jZXNzTW9kZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zVG9Qcm9jZXNzLS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1RvUHJvY2VzcyA9PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdJbmRpY2F0b3IgdXBkYXRlZC4nLCBzdHVmZik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvdW5kID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5wdXNoKGRhdGEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNUb1Byb2Nlc3MtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbXNUb1Byb2Nlc3MgPT0gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdJbmRpY2F0b3IgdXBkYXRlZC4nLCBzdHVmZik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSkuZmFpbChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcbn07XG5cbmZ1bmN0aW9uIG1hcmtVcGRhdGVJbmRpY2F0b3IoYXJncykge1xuXG4gICAgdmFyIF9XRkluc3RhbmNlID0gYXJnc1swXSB8fCB7fTtcblxuICAgIHZhciB1dWlkID0gYXJnc1sxXSB8fCAnJztcbiAgICB2YXIgc3RhdHVzID0gYXJnc1syXSB8fCAnJztcbiAgICB2YXIgaW5kaWNhdG9yU2V0SWQgPSBhcmdzWzNdIHx8ICcnO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgIHZhciBpbmRPYmplY3QgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnXCIgKyBpbmRpY2F0b3JTZXRJZCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgaW5kT2JqZWN0Lm1vZGVsLnBlbmRpbmcuc3RhdHVzID0gc3RhdHVzO1xuXG4gICAgICAgIHZhciBpdGVtc1RvUHJvY2VzcyA9IDE7XG4gICAgICAgIHZhciBzdHVmZiA9IFtdO1xuICAgICAgICB2YXIgb2JqID0ge307XG5cbiAgICAgICAgb2JqLm1vZGVsID0gaW5kT2JqZWN0O1xuICAgICAgICBzdHVmZi5wdXNoKG9iaik7XG5cbiAgICAgICAgZ2F0ZWtlZXBlci5wZXJzaXN0KHN0dWZmKS50aGVuKGZ1bmN0aW9uKHNhdmVkQXJyYXkpIHtcblxuICAgICAgICAgICAgdmFyIHV1aWRTYXZlZEluZGljYXRvciA9ICcnO1xuICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCBzYXZlZEFycmF5Lmxlbmd0aDsgYysrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFzYXZlZEFycmF5W2NdLmlkLmVuZHNXaXRoKCc6YXBwcm92ZWQnKSkge1xuICAgICAgICAgICAgICAgICAgICB1dWlkU2F2ZWRJbmRpY2F0b3IgPSBzYXZlZEFycmF5W2NdLmlkO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkYW8uZ2V0KHV1aWRTYXZlZEluZGljYXRvcilcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1RvUHJvY2Vzcy0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zVG9Qcm9jZXNzID09IDApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdJbmRpY2F0b3IgdXBkYXRlZC4nLCBzdHVmZik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yID0gX1dGSW5zdGFuY2UuaW5kaWNhdG9yc1tpbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGljYXRvci5faWQgPT0gZGF0YS5faWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGN1cnJlbnQgaXRlbSBmcm9tIHRoZSBhcnJheSBhbmQgYWRkIHRoZSB1cGRhdGVkIHByb2Nlc3NNb2RlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNUb1Byb2Nlc3MtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zVG9Qcm9jZXNzID09IDApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0luZGljYXRvciB1cGRhdGVkLicsIHN0dWZmKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm91bmQgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnB1c2goZGF0YSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1RvUHJvY2Vzcy0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1RvUHJvY2VzcyA9PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0luZGljYXRvciB1cGRhdGVkLicsIHN0dWZmKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgICBjcmVhdGU6IGNyZWF0ZSxcbiAgICBzYXZlOiBzYXZlLFxuICAgIHN1Ym1pdDogc3VibWl0LFxuICAgIGF1dGhvcmlzZTogYXV0aG9yaXNlLFxuICAgIGNsb3NlOiBjbG9zZSxcbiAgICBzZXREcmFmdDogc2V0RHJhZnQsXG4gICAgc2V0VW5EcmFmdDogc2V0VW5EcmFmdCxcbiAgICBjcmVhdGVQcm9maWxlOiBjcmVhdGVQcm9maWxlLFxuICAgIHNldEluc3RhbmNlVGl0bGU6IHNldEluc3RhbmNlVGl0bGUsXG4gICAgZGVsZXRlUHJvZmlsZTogZGVsZXRlUHJvZmlsZSxcbiAgICB1cGRhdGVJbmRpY2F0b3I6IHVwZGF0ZUluZGljYXRvcixcbiAgICBtYXJrVXBkYXRlSW5kaWNhdG9yOiBtYXJrVXBkYXRlSW5kaWNhdG9yXG5cbn0iLCIndXNlIHN0cmljdCc7XG5cblxuZnVuY3Rpb24gZ2V0TGFuZ3VhZ2VNZXNzYWdlKG1lc3NhZ2UpIHtcblxuICAgIHZhciBsYW5ndWFnZSA9IHNlcnZpY2UuZ2V0TGFuZ3VhZ2UoKTtcbiAgICB2YXIgcmVzID0gZXZhbChcIm1lc3NhZ2UuaTE4bi5cIiArIGxhbmd1YWdlKTtcbiAgICByZXR1cm4gcmVzO1xuXG59O1xuXG5mdW5jdGlvbiBnZXROb2RlVmFsdWUoZGF0YSwgX1dGSW5zdGFuY2UsIHV1aWQpIHtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICBpZiAoZGF0YS52YWx1ZSAhPSB1bmRlZmluZWQpIHsgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBpbnB1dERhdGFUeXBlID0gZGF0YS52YWx1ZS5kYXRhdHlwZS5kYXRhVHlwZTtcbiAgICAgICAgICAgIHZhciBpbnB1dFZhbHVlID0gZGF0YS52YWx1ZS5kYXRhO1xuXG4gICAgICAgICAgICBpZihpbnB1dERhdGFUeXBlID09ICdudW1iZXInICl7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShOdW1iZXIoaW5wdXRWYWx1ZSkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKGlucHV0RGF0YVR5cGUgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGlucHV0VmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKGlucHV0RGF0YVR5cGUgPT0gJ2ludGVnZXInKXtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHBhcnNlSW50KGlucHV0VmFsdWUpKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihpbnB1dERhdGFUeXBlID09ICdkZWNpbWFsJyl7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShwYXJzZUZsb2F0KGlucHV0VmFsdWUpKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihpbnB1dERhdGFUeXBlID09ICdkYXRlJyB8fCBpbnB1dERhdGFUeXBlID09ICdkYXRlVGltZScgKXtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGlucHV0VmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBJbiBjYXNlIGRhdGEgdHlwZSBub3QgbWF0Y2hlZFxuICAgICAgICAgICAgICAgIHJlc29sdmUoaW5wdXRWYWx1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmIChkYXRhLmluZGljYXRvclVVSUQgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgIHJlamVjdChcIkVSUk9SOiBVbmltcGxlbWVudGVkIHZhbHVlIHR5cGUgZm91bmQuXCIpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS5pbmRpY2F0b3IgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JVVUlEID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ1wiICsgZGF0YS5pbmRpY2F0b3IuaW5kaWNhdG9yU2V0SWQgKyBcIiddL2luc3RhbmNlcy91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICB2YXIgaW5kT2JqZWN0ID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW19pZCBlcSAnXCIgKyBpbmRpY2F0b3JVVUlEICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgdmFyIHhwYXRoID0gJy9tb2RlbC9wZW5kaW5nL2RhdGEvJyArIGRhdGEuaW5kaWNhdG9yLmluZGljYXRvclNldElkICsgJy8nICsgZGF0YS5pbmRpY2F0b3IuZWxlbWVudElkO1xuXG4gICAgICAgICAgICB2YXIgc2VxID0gSlNPTi54cGF0aChcImNvdW50KC9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL3ByZWNlZGluZy1zaWJsaW5nOjpub2RlKClbaWQgPSAvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pZF0pXCIsIF9XRkluc3RhbmNlLCB7fSlbMF0gKyAxO1xuICAgICAgICAgICAgdmFyIHN1YnByb2Nlc3NUeXBlID0gSlNPTi54cGF0aChcIi9jb25maWcvcHJvY2Vzc2VzL3N1YlByb2Nlc3Nlc1tfaWQgZXEgL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaWRdL3R5cGVcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcblxuICAgICAgICAgICAgaWYgKHN1YnByb2Nlc3NUeXBlID09IFBST0NFU1NfVFlQRV9TVUJQUk9GSUxFKSB7XG4gICAgICAgICAgICAgICAgc2VxID0gSlNPTi54cGF0aChcImNvdW50KC9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL3ByZWNlZGluZy1zaWJsaW5nOjpub2RlKClbaWQgPSAvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pZCBhbmQgX2lkID0gL3N1YnByb2Nlc3Nlc1tfaWQgPSAvaW5zdGFuY2UvcHJvY2Vzc2VzL3N1YlByb2Nlc3Nlc1tzdWJwcm9maWxlSWQgZXEgJ1wiICsgYXBwLnByb2ZpbGUuc3VicHJvZmlsZUlkICsgXCInXS91dWlkXS9faWRdKVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdICsgMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHJlcGxhY2VkUGF0aCA9IHJlcGxhY2VBbGwoeHBhdGgsICcjU0VRVUVOQ0UjJywgc2VxKTtcblxuICAgICAgICAgICAgdmFyIHZhbGlkRGF0ZSA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9kYXRlcy92YWxpZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgdmFyIGNvbmNhdFZhbGlkRGF0ZSA9IFwiJ1wiICsgdmFsaWREYXRlICsgXCInXCI7XG4gICAgICAgICAgICB2YXIgbmV3UGF0aCA9IHJlcGxhY2VBbGwocmVwbGFjZWRQYXRoLCAnI0VORF9EQVRFIycsIGNvbmNhdFZhbGlkRGF0ZSk7XG4gICAgICAgICAgICB2YXIgZG90UmVwbGFjZWQgPSByZXBsYWNlQWxsKG5ld1BhdGgsICdbLl0nLCAnLycpO1xuICAgICAgICAgICAgdmFyIHJldFZhbHVlID0gSlNPTi54cGF0aChkb3RSZXBsYWNlZCwgaW5kT2JqZWN0LCB7fSlbMF07XG5cbiAgICAgICAgICAgIHJlc29sdmUocmV0VmFsdWUpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS5zeXN0ZW0gIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgIHJlc29sdmUoXCJFUlJPUjogVW5pbXBsZW1lbnRlZCBzeXN0ZW0gdHlwZSBmb3VuZC5cIik7XG5cbiAgICAgICAgfSBlbHNlIGlmIChkYXRhLnZhcmlhYmxlICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICBpZiAoZGF0YS52YXJpYWJsZS5wcm9maWxlICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHZhcmlhYmxlTmFtZSA9IGRhdGEudmFyaWFibGUucHJvZmlsZTtcblxuICAgICAgICAgICAgICAgIHZhciBwcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xuICAgICAgICAgICAgICAgIHZhciBwcm9maWxlVmFyaWFibGVGaWxlTmFtZSA9IHByb2ZpbGVJZCArICc6dmFyaWFibGVzJztcblxuICAgICAgICAgICAgICAgIGRhby5nZXQocHJvZmlsZVZhcmlhYmxlRmlsZU5hbWUpLmRvbmUoZnVuY3Rpb24oZmlsZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSBldmFsKCdmaWxlLicgKyB2YXJpYWJsZU5hbWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqID09ICdvYmplY3QnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZXEgPSBKU09OLnhwYXRoKFwiY291bnQoL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vcHJlY2VkaW5nLXNpYmxpbmc6Om5vZGUoKVtpZCA9IC9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2lkXSlcIiwgX1dGSW5zdGFuY2UsIHt9KVswXSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VicHJvY2Vzc1R5cGUgPSBKU09OLnhwYXRoKFwiL2NvbmZpZy9wcm9jZXNzZXMvc3ViUHJvY2Vzc2VzW19pZCBlcSAvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pZF0vdHlwZVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1YnByb2Nlc3NUeXBlID09IFBST0NFU1NfVFlQRV9TVUJQUk9GSUxFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VxID0gSlNPTi54cGF0aChcImNvdW50KC9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL3ByZWNlZGluZy1zaWJsaW5nOjpub2RlKClbaWQgPSAvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pZCBhbmQgX2lkID0gL3N1YnByb2Nlc3Nlc1tfaWQgPSAvaW5zdGFuY2UvcHJvY2Vzc2VzL3N1YlByb2Nlc3Nlc1tzdWJwcm9maWxlSWQgZXEgJ1wiICsgYXBwLnByb2ZpbGUuc3VicHJvZmlsZUlkICsgXCInXS91dWlkXS9faWRdKVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlUGF0aCA9IFwiL1wiICsgdmFyaWFibGVOYW1lICsgXCJbc2VxIGVxICdcIiArIHNlcSArIFwiJ10vdmFsdWVcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXRWYWx1ZSA9IEpTT04ueHBhdGgodmFsdWVQYXRoLCBmaWxlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJldFZhbHVlKTtcblxuXG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqID09ICdzdHJpbmcnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUob2JqKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uKGVycm9yKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiRVJST1I6IFByb2ZpbGUgdmFyaWFibGVzIG5vdCBmb3VuZFwiKTtcblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlamVjdChcIkVSUk9SOiBVbmltcGxlbWVudGVkIHByb2ZpbGUgdHlwZSBmb3VuZC5cIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfSk7XG5cblxuXG59O1xuXG5cbmZ1bmN0aW9uIHJlcGxhY2VBbGwodHh0LCByZXBsYWNlLCB3aXRoX3RoaXMpIHtcbiAgICBpZiAodHlwZW9mIHR4dC5yZXBsYWNlICE9ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY29uc29sZS5sb2cocmVwbGFjZSArICcgJyArIHdpdGhfdGhpcyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHR4dCk7XG4gICAgfVxuICAgIHJldHVybiB0eHQucmVwbGFjZShuZXcgUmVnRXhwKHJlcGxhY2UsICdnJyksIHdpdGhfdGhpcyk7XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgICBnZXRMYW5ndWFnZU1lc3NhZ2U6IGdldExhbmd1YWdlTWVzc2FnZSxcbiAgICBnZXROb2RlVmFsdWU6IGdldE5vZGVWYWx1ZVxuXG59IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWxpdHknKTtcblxuLyoqXG4gKiBVc2VyIEludGVyZmFjZSBNb2R1bGVcbiAqXG4gKiBAbW9kdWxlIGxpYi91aVxuICogQGF1dGhvciBCcmVudCBHb3Jkb25cbiAqIEB2ZXJzaW9uIDAuMS4wXG4gKiBAZGVzY3JpcHRpb24gdGVzdCBkZXNjcmlwdGlvblxuICpcbiAqL1xuXG4gLyoqXG4gICogR2V0IGFsbCBwcm9jZXNzIHN1Yi1wcm9jZXNzZXMgdXNlciBpbnRlcmZhY2UgZGF0YVxuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHByb2Nlc3MgaWRcbiAgKiBAcGFyYW0ge3N0cmluZ30gbGFuZyAtIHRoZSB1c2VyIHByZWZmZXJlZCBsYW5nYXVnZVxuICAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXG4gICpcbiAgKiBAZXhhbXBsZSAnJ1xuICAqXG4gICogQHJldHVybiAnJ1xuICAqXG4gICovXG4gZnVuY3Rpb24gZ2V0UHJvY2Vzcyhwcm9jZXNzSWQsIGxhbmcsIF9XRkluc3RhbmNlKXtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgIHRyeSB7XG4gICAgICB2YXIgcHJvY2Vzc01vZGVsID0gW107XG4gICAgICB2YXIgcHJvY2Vzc0luc3RhbmNlID0gW107XG4gICAgXHRfV0ZJbnN0YW5jZS5pbnN0YW5jZS5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHByb2Nlc3NJdGVtKXtcbiAgICBcdFx0aWYgKHByb2Nlc3NJdGVtLmlkID09IHByb2Nlc3NJZCkge1xuICAgIFx0XHRcdHByb2Nlc3NJbnN0YW5jZSA9IHByb2Nlc3NJdGVtO1xuICAgIFx0XHR9XG4gICAgXHR9KVxuICAgICAgLy8gY29uc29sZS5sb2cocHJvY2Vzc0luc3RhbmNlLnN1YlByb2Nlc3Nlcy5sZW5ndGgpO1xuICAgICAgdXRpbC5zeW5jTG9vcChwcm9jZXNzSW5zdGFuY2Uuc3ViUHJvY2Vzc2VzLmxlbmd0aCwgZnVuY3Rpb24obG9vcCl7XG4gIFx0XHRcdHZhciBjb3VudGVyID0gbG9vcC5pdGVyYXRpb24oKTtcbiAgICAgICAgdmFyIHByb2Nlc3NTZXEgPSBwcm9jZXNzSW5zdGFuY2Uuc2VxO1xuICAgICAgICB2YXIgc3ViUHJvY2Vzc0lkID0gcHJvY2Vzc0luc3RhbmNlLnN1YlByb2Nlc3Nlc1tjb3VudGVyXS5pZDtcbiAgICAgICAgdmFyIHN1YlByb2Nlc3NTZXEgPSBwcm9jZXNzSW5zdGFuY2Uuc3ViUHJvY2Vzc2VzW2NvdW50ZXJdLnNlcTtcbiAgICAgICAgZ2V0U3ViUHJvY2Vzcyhwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgbGFuZywgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24obW9kZWwpe1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG1vZGVsKTtcbiAgICAgICAgICBwcm9jZXNzTW9kZWwucHVzaChtb2RlbCk7XG4gICAgICAgICAgbG9vcC5uZXh0KCk7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2cocHJvY2Vzc01vZGVsKTtcbiAgXHRcdFx0fSwgZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhwcm9jZXNzTW9kZWwpO1xuICBcdFx0XHRcdGxvb3AuYnJlYWsoKTtcbiAgXHRcdFx0XHRyZWplY3QoZXJyKTtcbiAgXHRcdFx0fSk7XG4gIFx0XHR9LCBmdW5jdGlvbigpe1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhwcm9jZXNzTW9kZWwpO1xuICBcdFx0XHRyZXNvbHZlKHByb2Nlc3NNb2RlbCk7XG4gIFx0XHR9KTtcbiAgICB9IGNhdGNoKGVycil7XG4gICAgICByZWplY3QoZXJyKTtcbiAgICB9XG4gIH0pXG59O1xuXG4gLyoqXG4gICogR2V0IFN1YlByb2Nlc3MgdXNlciBpbnRlcmZhY2UgZGF0YVxuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHByb2Nlc3MgaWRcbiAgKiBAcGFyYW0ge251bWJlcn0gcHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBwcm9jZXNzIHNlcVxuICAqIEBwYXJhbSB7c3RyaW5nfSBzdWJQcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdWItcHJvY2VzcyBpZFxuICAqIEBwYXJhbSB7bnVtYmVyfSBzdWJQcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHN1Yi1wcm9jZXNzIHNlcVxuICAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXG4gICpcbiAgKiBAZXhhbXBsZSAnJ1xuICAqXG4gICogQHJldHVybiAnJ1xuICAqXG4gICovXG5mdW5jdGlvbiBnZXRTdWJQcm9jZXNzKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBsYW5nLCBfV0ZJbnN0YW5jZSl7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICB0cnkge1xuICAgICAgdmFyIG1vZGVsID0ge1xuICAgICAgICBpZDogJycsXG4gICAgICAgIHNlcTogJycsXG4gICAgICAgIG5hbWU6ICcnLFxuICAgICAgICBoZWxwOiAnJyxcbiAgICAgICAgZGF0ZXM6ICcnLFxuICAgICAgICBzdGVwOiAnJ1xuICAgICAgfTtcbiAgICAgIHZhciBzdWJQcm9jZXNzID0gW107XG4gICAgXHR2YXIgc3ViUHJvY2Vzc0NvbmYgPSBbXTtcbiAgICBcdF9XRkluc3RhbmNlLmluc3RhbmNlLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ocHJvY2Vzc0l0ZW0pe1xuICAgIFx0XHRpZiAocHJvY2Vzc0l0ZW0uaWQgPT0gcHJvY2Vzc0lkICYmIHByb2Nlc3NJdGVtLnNlcSA9PSBwcm9jZXNzU2VxKSB7XG4gICAgXHRcdFx0dmFyIHNwTGVuZ3RoID0gcHJvY2Vzc0l0ZW0uc3ViUHJvY2Vzc2VzLmxlbmd0aDtcbiAgICBcdFx0XHRwcm9jZXNzSXRlbS5zdWJQcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHN1YlByb2Nlc3NJdGVtKXtcbiAgICBcdFx0XHRcdGlmIChzdWJQcm9jZXNzSXRlbS5pZCA9PSBzdWJQcm9jZXNzSWQgJiYgc3ViUHJvY2Vzc0l0ZW0uc2VxID09IHN1YlByb2Nlc3NTZXEgJiYgc3ViUHJvY2Vzc0l0ZW0uY29tcGxldGUgPT0gZmFsc2UpIHtcbiAgICBcdFx0XHRcdFx0c3ViUHJvY2VzcyA9IHN1YlByb2Nlc3NJdGVtO1xuICAgIFx0XHRcdFx0fVxuICAgIFx0XHRcdH0pXG4gICAgXHRcdH1cbiAgICBcdH0pXG4gICAgXHQvLyBHZXQgdGhlIGN1cnJlbnQgc3ViUHJvY2VzcyBjb25maWd1cmF0aW9uXG4gICAgXHRfV0ZJbnN0YW5jZS5jb25maWcucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihwcm9jZXNzQ29uZmlnKXtcbiAgICBcdFx0aWYgKHByb2Nlc3NDb25maWcuX2lkID09IHByb2Nlc3NJZCkge1xuICAgIFx0XHRcdHByb2Nlc3NDb25maWcuc3ViUHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihzdWJQcm9jZXNzQ29uZmlnKXtcbiAgICBcdFx0XHRcdGlmIChzdWJQcm9jZXNzQ29uZmlnLl9pZCA9PSBzdWJQcm9jZXNzSWQpIHtcbiAgICBcdFx0XHRcdFx0c3ViUHJvY2Vzc0NvbmYgPSBzdWJQcm9jZXNzQ29uZmlnO1xuICAgIFx0XHRcdFx0fVxuICAgIFx0XHRcdH0pXG4gICAgXHRcdH1cbiAgICBcdH0pXG4gICAgICAvLyBVcGRhdGUgdGhlIG1vZGVsXG4gICAgICBtb2RlbC5pZCA9IHN1YlByb2Nlc3NDb25mLl9pZDtcbiAgICAgIG1vZGVsLnNlcSA9IHN1YlByb2Nlc3Muc2VxO1xuICAgICAgbW9kZWwubmFtZSA9IHV0aWwuZ2V0TmFtZShzdWJQcm9jZXNzQ29uZi5uYW1lLCBsYW5nKTtcbiAgICAgIG1vZGVsLmhlbHAgPSB1dGlsLmdldE5hbWUoc3ViUHJvY2Vzc0NvbmYuaGVscCwgbGFuZyk7XG4gICAgICBtb2RlbC5kYXRlcyA9IHN1YlByb2Nlc3MuZGF0ZXM7XG4gICAgICBtb2RlbC5zdGVwID0gc3ViUHJvY2Vzcy5zdGVwO1xuICAgICAgcmVzb2x2ZShtb2RlbCk7XG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgIHJlamVjdChlcnIpO1xuICAgIH1cbiAgfSlcbn07XG5cblxuXG5cbmZ1bmN0aW9uIHByZXBhcmVOb3RpZmljYXRpb25TY3JlZW4oKXtcblxuICBcIlwiXG59O1xuXG4gbW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgZ2V0UHJvY2VzczogZ2V0UHJvY2Vzc1xuXG4gfVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5cbmZ1bmN0aW9uIGdldCgpIHtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblxuICAgIH0pO1xuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICAgIGdldDogZ2V0XG5cbn0iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbGl0eScpO1xudmFyIGFjdGlvbnNNb2R1bGUgPSByZXF1aXJlKCcuL2FjdGlvbnMnKTtcbnZhciBoZWxwZXIgPSByZXF1aXJlKCcuL2hlbHBlcicpO1xudmFyIGZvcm0gPSByZXF1aXJlKCcuL2Zvcm0nKTtcblxuLyoqXG4gKiBQcm9jZXNzIE1vZHVsZVxuICpcbiAqIEBtb2R1bGUgbGliL3Byb2Nlc3NcbiAqIEBhdXRob3IgSGFzYW4gQWJiYXNcbiAqIEB2ZXJzaW9uIDAuMi4xXG4gKiBAZGVzY3JpcHRpb24gV29ya2Zsb3cgaW1wbGVtZW50YXRpb24gY2hhbmdlZCBhcyBwZXIgbmV3IHNjaGVtYSBpbXBsZW1lbnRhdGlvblxuICpcbiAqL1xuXG4vKipcbiAqIENvdW50IGFuIGFycmF5IG9mIGl0ZW1zXG4gKlxuICogQHBhcmFtIHtBcnJheX0gYXJyIC0gdGhlIGFycmF5IGRhdGFcbiAqXG4gKiBAZXhhbXBsZSAnJ1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cbmZ1bmN0aW9uIGNvdW50KGFycikge1xuICAgIGlmIChhcnIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gYXJyLmxlbmd0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbn07XG5cbi8qKlxuICogUHJvY2VzcyBwcmUtcmVxdWlzaXRlc1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBwcmVyZXF1aXNpdGVzIC0gdGhlIHByZS1yZXF1aXNpdGVzIGNvbmZpZyBkYXRhXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiBwcmVSZXF1aXNpdGVzKHByZXJlcXVpc2l0ZXMsIF9XRkluc3RhbmNlLCBzcHV1aWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAvLyBVbmNvbW1lbnQgYmVsb3cgc2VjdGlvbiB3aGVuIHJlYWR5IHRvIGltcGxlbWVudFxuICAgICAgICB2YXIgY29tcGxldGVkID0gW107XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB1dGlsLnN5bmNMb29wKHByZXJlcXVpc2l0ZXMubGVuZ3RoLCBmdW5jdGlvbiAobG9vcCkge1xuICAgICAgICAgICAgICAgIHZhciBjb3VudGVyID0gbG9vcC5pdGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICBwcmVSZXF1aXNpdGUocHJlcmVxdWlzaXRlc1tjb3VudGVyXSwgX1dGSW5zdGFuY2UsIHNwdXVpZCkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBhbGwgcHJlLXJlcXVpc2l0ZXMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS5cbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVkLnB1c2godHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGxvb3AubmV4dCgpO1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVkLnB1c2goZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBsb29wLmJyZWFrKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZWQuZXZlcnkoQm9vbGVhbikpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1ByZS1yZXF1aXNpdGVzIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywge30pO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGUHJlUmVxdWlzaXRlRXJyb3InLCAnTm90IGFsbCBwcmUtcmVxdWlzaXRlcyBwYXNzZWQuJyk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFByb2Nlc3MgcHJlLXJlcXVpc2l0ZSwgZXhlY3V0ZSB0aGUgcHJlLXJlcXVpc2l0ZSBjb25kaXRpb24uXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHByZXJlcXVpc2l0ZSAtIHRoZSBwcmUtcmVxdWlzaXRlIGNvbmZpZyBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcbiAqXG4gKiBAZXhhbXBsZVxuICogUHJvY2Vzcy5wcmVSZXF1aXNpdGUoY29uZmlnLCBjb3VudGVyLCBpbnN0YW5jZSwgZG9jKTtcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiBwcmVSZXF1aXNpdGUocHJlcmVxdWlzaXRlLCBfV0ZJbnN0YW5jZSwgc3B1dWlkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgIFxuXG4gICAgICAgIGlmIChwcmVyZXF1aXNpdGUuY2hlY2subnVtYmVyUHJvY2Vzc0luc3RhbmNlcyAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgdmFyIG51bWJlclByb2Nlc3NJbnN0YW5jZXMgPSBwcmVyZXF1aXNpdGUuY2hlY2subnVtYmVyUHJvY2Vzc0luc3RhbmNlcztcbiAgICAgICAgICAgIHZhciBfZmlsdGVyT3BlcmF0b3IgPSBudW1iZXJQcm9jZXNzSW5zdGFuY2VzLm9wZXJhdG9yO1xuICAgICAgICAgICAgdmFyIHhwYXRoT3BlcmF0b3IgPSAnJztcbiAgICAgICAgICAgIHN3aXRjaCAoX2ZpbHRlck9wZXJhdG9yKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnZ3JlYXRlclRoYW4nOlxuICAgICAgICAgICAgICAgICAgICB4cGF0aE9wZXJhdG9yID0gJ2d0JztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbGVzc1RoYW4nOlxuICAgICAgICAgICAgICAgICAgICB4cGF0aE9wZXJhdG9yID0gJ2x0JztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZ3JlYXRlclRoYW5FcXVhbCc6XG4gICAgICAgICAgICAgICAgICAgIHhwYXRoT3BlcmF0b3IgPSAnZ2UnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdsZXNzVGhhbkVxdWFsJzpcbiAgICAgICAgICAgICAgICAgICAgeHBhdGhPcGVyYXRvciA9ICdsZSc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2VxdWFsVG8nOlxuICAgICAgICAgICAgICAgICAgICB4cGF0aE9wZXJhdG9yID0gJ2VxJztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbm90RXF1YWxUbyc6XG4gICAgICAgICAgICAgICAgICAgIHhwYXRoT3BlcmF0b3IgPSAnbmUnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIF9zdWJwcm9jZXNzSWQgPSBudW1iZXJQcm9jZXNzSW5zdGFuY2VzLnN1YlByb2Nlc3NJZDtcbiAgICAgICAgICAgIHZhciBfZmlsdGVyRWxlbWVudCA9IFwic3RlcC9zdGF0dXNcIjtcbiAgICAgICAgICAgIHZhciBfZmlsdGVyVmFsdWUgPSBudW1iZXJQcm9jZXNzSW5zdGFuY2VzLnR5cGU7XG4gICAgICAgICAgICB2YXIgaW5uZXJYcGF0aCA9IFwiL1wiICsgX2ZpbHRlckVsZW1lbnQgKyBcIlsuIGVxICdcIiArIF9maWx0ZXJWYWx1ZSArIFwiJ11cIjtcblxuICAgICAgICAgICAgdmFyIGZ1bGxQYXRoID0gXCJjb3VudCgvc3VicHJvY2Vzc2VzW2lkIGVxICdcIiArIF9zdWJwcm9jZXNzSWQgKyBcIiddXCIgKyBpbm5lclhwYXRoICsgXCIpXCI7XG5cbiAgICAgICAgICAgIHZhciBwcmVyZXFQcm9jZXNzVHlwZSA9IEpTT04ueHBhdGgoXCIvY29uZmlnL3Byb2Nlc3Nlcy9zdWJQcm9jZXNzZXNbX2lkIGVxICdcIiArIF9zdWJwcm9jZXNzSWQgKyBcIiddL3R5cGVcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgIGlmIChhcHAucHJvZmlsZS5zdWJwcm9maWxlSWQgIT0gdW5kZWZpbmVkICYmIGFwcC5wcm9maWxlLnN1YnByb2ZpbGVJZCAhPSAnJyAmJiBwcmVyZXFQcm9jZXNzVHlwZSAhPSB1bmRlZmluZWQgJiYgcHJlcmVxUHJvY2Vzc1R5cGUgPT0gUFJPQ0VTU19UWVBFX1NVQlBST0ZJTEUpIHtcbiAgICAgICAgICAgICAgICBmdWxsUGF0aCA9IFwiY291bnQoL3N1YnByb2Nlc3Nlc1tpZCBlcSAnXCIgKyBfc3VicHJvY2Vzc0lkICsgXCInIGFuZCBfaWQgPSAvaW5zdGFuY2UvcHJvY2Vzc2VzL3N1YlByb2Nlc3Nlc1tzdWJwcm9maWxlSWQgZXEgJ1wiICsgYXBwLnByb2ZpbGUuc3VicHJvZmlsZUlkICsgXCInXS91dWlkXVwiICsgaW5uZXJYcGF0aCArIFwiKVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBzdWJqZWN0Q291bnQgPSBKU09OLnhwYXRoKGZ1bGxQYXRoLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgdmFyIGNvdW50VmFsdWUgPSBwcmVyZXF1aXNpdGUuY2hlY2subnVtYmVyUHJvY2Vzc0luc3RhbmNlcy5jb3VudDtcbiAgICAgICAgICAgIHZhciBjb21wYXJlID0gdXRpbC5jb21wYXJlKHN1YmplY3RDb3VudCwgcHJlcmVxdWlzaXRlLmNoZWNrLm51bWJlclByb2Nlc3NJbnN0YW5jZXMub3BlcmF0b3IsIHBhcnNlSW50KGNvdW50VmFsdWUpKTtcblxuXG4gICAgICAgICAgICBpZiAoY29tcGFyZSkge1xuICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdQcmUtcmVxdWlzaXRlcyBwYXNzZWQuJywge30pO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBoZWxwZXIuZ2V0TGFuZ3VhZ2VNZXNzYWdlKHByZXJlcXVpc2l0ZS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRlByZVJlcXVpc2l0ZUVycm9yJywgbWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH0gZWxzZSBpZiAocHJlcmVxdWlzaXRlLmNoZWNrLnZhcmlhYmxlICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICB2YXIgc2NvcGUgPSBwcmVyZXF1aXNpdGUuY2hlY2sudmFyaWFibGUuc2NvcGU7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKHNjb3BlICA9PSBcInByb2ZpbGVcIil7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFyIHByb2ZpbGVJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XG4gICAgICAgICAgICAgICAgdmFyIHByb2ZpbGVWYXJpYWJsZUZpbGVOYW1lID0gcHJvZmlsZUlkICsgJzp2YXJpYWJsZXMnO1xuXG4gICAgICAgICAgICAgICAgZGFvLmdldChwcm9maWxlVmFyaWFibGVGaWxlTmFtZSkuZG9uZShmdW5jdGlvbihmaWxlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhcmlhYmxlTmFtZSA9IHByZXJlcXVpc2l0ZS5jaGVjay52YXJpYWJsZS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0gZXZhbCgnZmlsZS4nICsgdmFyaWFibGVOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1YmplY3RWYWx1ZUNhbGN1bGF0ZWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmogPT0gJ29iamVjdCcpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlcSA9IEpTT04ueHBhdGgoXCJjb3VudCgvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL3ByZWNlZGluZy1zaWJsaW5nOjpub2RlKClbaWQgPSAvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL2lkXSlcIiwgX1dGSW5zdGFuY2UsIHt9KVswXSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VicHJvY2Vzc1R5cGUgPSBKU09OLnhwYXRoKFwiL2NvbmZpZy9wcm9jZXNzZXMvc3ViUHJvY2Vzc2VzW19pZCBlcSAvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL2lkXS90eXBlXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3VicHJvY2Vzc1R5cGUgPT0gUFJPQ0VTU19UWVBFX1NVQlBST0ZJTEUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXEgPSBKU09OLnhwYXRoKFwiY291bnQoL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXS9wcmVjZWRpbmctc2libGluZzo6bm9kZSgpW2lkID0gL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXS9pZCBhbmQgX2lkID0gL3N1YnByb2Nlc3Nlc1tfaWQgPSAvaW5zdGFuY2UvcHJvY2Vzc2VzL3N1YlByb2Nlc3Nlc1tzdWJwcm9maWxlSWQgZXEgJ1wiICsgYXBwLnByb2ZpbGUuc3VicHJvZmlsZUlkICsgXCInXS91dWlkXS9faWRdKVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZVBhdGggPSBcIi9cIiArIHZhcmlhYmxlTmFtZSArIFwiW3NlcSBlcSAnXCIgKyBzZXEgKyBcIiddL3ZhbHVlXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJqZWN0VmFsdWVDYWxjdWxhdGVkID0gSlNPTi54cGF0aCh2YWx1ZVBhdGgsIGZpbGUsIHt9KVswXTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvYmogPT0gJ3N0cmluZycpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc3ViamVjdFZhbHVlQ2FsY3VsYXRlZCA9IG9iajtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICB2YXIgaW5wdXRWYWx1ZSA9IHByZXJlcXVpc2l0ZS5jaGVjay52YXJpYWJsZS52YWx1ZS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5wdXREYXRhVHlwZSA9IHByZXJlcXVpc2l0ZS5jaGVjay52YXJpYWJsZS52YWx1ZS5kYXRhVHlwZS5kYXRhVHlwZTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHZhciBmaW5hbFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBpZihpbnB1dERhdGFUeXBlID09ICdudW1iZXInICl7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5hbFZhbHVlID0gTnVtYmVyKGlucHV0VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoaW5wdXREYXRhVHlwZSA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxWYWx1ZSA9IGlucHV0VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihpbnB1dERhdGFUeXBlID09ICdpbnRlZ2VyJyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5hbFZhbHVlID0gcGFyc2VJbnQoaW5wdXRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihpbnB1dERhdGFUeXBlID09ICdkZWNpbWFsJyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5hbFZhbHVlID0gcGFyc2VGbG9hdChpbnB1dFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKGlucHV0RGF0YVR5cGUgPT0gJ2RhdGUnIHx8IGlucHV0RGF0YVR5cGUgPT0gJ2RhdGVUaW1lJyApe1xuICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxWYWx1ZSA9IGlucHV0VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB2YXIgY29tcGFyZSA9IHV0aWwuY29tcGFyZShzdWJqZWN0VmFsdWVDYWxjdWxhdGVkLCBwcmVyZXF1aXNpdGUuY2hlY2sudmFyaWFibGUub3BlcmF0b3IsIGZpbmFsVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29tcGFyZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1ZhcmlhYmxlIFByZS1yZXF1aXNpdGVzIHBhc3NlZC4nLCB7fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGhlbHBlci5nZXRMYW5ndWFnZU1lc3NhZ2UocHJlcmVxdWlzaXRlLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZQcmVSZXF1aXNpdGVFcnJvcicsIG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLmZhaWwoZnVuY3Rpb24oZXJyb3IpIHtcblxuICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJFUlJPUjogUHJvZmlsZSB2YXJpYWJsZXMgbm90IGZvdW5kXCIpO1xuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KFwiRVJST1I6IFNjb3BlICdcIisgc2NvcGUgK1wiJyBub3QgaW1wbGVtZW50ZWQgaW4gcHJlLXJlcXVpc2l0ZXNcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGUHJlUmVxdWlzaXRlRXJyb3InLCAnUHJlLXJlcXVpc2l0ZSB0eXBlIG5vdCBkZWZpbmVkLicpO1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcblxuICAgICAgICB9XG5cbiAgICAgICBcblxuICAgIH0pO1xufTtcblxuLyoqXG4gKiBQcm9jZXNzIHByZS1hY3Rpb25zc1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBwcmVBY3Rpb25zIC0gdGhlIHByZS1hY3Rpb25zIGNvbmZpZyBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuZnVuY3Rpb24gcHJlQWN0aW9ucyhwcmVBY3Rpb25zLCBfV0ZJbnN0YW5jZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciBjb21wbGV0ZWQgPSBbXTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHV0aWwuc3luY0xvb3AocHJlQWN0aW9ucy5sZW5ndGgsIGZ1bmN0aW9uIChsb29wKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvdW50ZXIgPSBsb29wLml0ZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgIC8vVE9ETyBIQVNBTlxuICAgICAgICAgICAgICAgIC8vYWN0aW9uKGFjdGlvbnNbY291bnRlcl0sIHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdWJQcm9jZXNzLCBzdGVwLCBfV0ZJbnN0YW5jZSwgZGF0YSwgdXVpZClcblxuICAgICAgICAgICAgICAgIGFjdGlvbihwcmVBY3Rpb25zW2NvdW50ZXJdLFwiXCIsXCJcIixcIlwiLFwiXCIse30sIHt9LF9XRkluc3RhbmNlLCB7fSwgYXBwLlNDT1BFLnByb2Nlc3NVVUlEKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGFsbCBwcmUtcmVxdWlzaXRlcyBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LlxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQucHVzaCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgbG9vcC5uZXh0KCk7XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQucHVzaChmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGxvb3AuYnJlYWsoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbXBsZXRlZC5ldmVyeShCb29sZWFuKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnUHJlLWFjdGlvbnMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCB7fSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZQcmVSZXF1aXNpdGVFcnJvcicsICdOb3QgYWxsIHByZS1hY3Rpb25zIHBhc3NlZC4nKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG5cbiAgICB9KTtcbn07XG5cbi8qKlxuICogV29ya2Zsb3cgZ2V0IHN1Yi1wcm9jZXNzIGRhdGEuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGlkIC0gdGhlIHN1YlByb2Nlc3MgY29uZmlnIGlkXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxuICpcbiAqIEBleGFtcGxlIFwiXCJcbiAqXG4gKiBAcmV0dXJuIFwiXCJcbiAqXG4gKi9cbmZ1bmN0aW9uIGdldFN1YlByb2Nlc3MoaWQsIF9XRkluc3RhbmNlKSB7XG4gICAgaWYgKF9XRkluc3RhbmNlLnN1YnByb2Nlc3NlcyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKHN1YlByb2Nlc3MpIHtcbiAgICAgICAgICAgIGlmIChzdWJQcm9jZXNzLmlkID09IGlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1YlByb2Nlc3M7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG4gICAgfVxuXG59O1xuXG4vKipcbiAqIFByb2Nlc3Mgc3ViLXByb2Nlc3NcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gcHJvY2VzcyAtIHRoZSBjdXJyZW50IHByb2Nlc3MgaWQgYW5kIHNlcVxuICogQHBhcmFtIHtvYmplY3R9IHN1YlByb2Nlc3MgLSB0aGUgc3ViLXByb2Nlc3MgaWQgYW5kIHNlcVxuICogQHBhcmFtIHtvYmplY3R9IGRhdGEgLSB0aGUgdXNlciBpbnB1dCBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuZnVuY3Rpb24gc3ViUHJvY2Vzcyhwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgZGF0YSwgX1dGSW5zdGFuY2UpIHtcbiAgICAvLyBHZXQgdGhlIGN1cnJlbnQgcHJvY2VzcyBzdWJQcm9jZXNzIGluc3RhbmNlXG4gICAgLy8gdmFyIHN1YlByb2Nlc3NTZXEgPSAxO1xuICAgIHZhciBzdWJQcm9jZXNzID0gW107XG4gICAgdmFyIHByb2Nlc3NDb25mID0gW107XG4gICAgdmFyIHN1YlByb2Nlc3NDb25mID0gW107XG4gICAgX1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbiAob2JqUHJvY2Vzcykge1xuICAgICAgICBpZiAob2JqUHJvY2Vzcy5pZCA9PSBwcm9jZXNzSWQgJiYgb2JqUHJvY2Vzcy5zZXEgPT0gcHJvY2Vzc1NlcSkge1xuICAgICAgICAgICAgdmFyIHNwTGVuZ3RoID0gb2JqUHJvY2Vzcy5zdWJQcm9jZXNzZXMubGVuZ3RoO1xuICAgICAgICAgICAgb2JqUHJvY2Vzcy5zdWJQcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChvYmpTdWJQcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9ialN1YlByb2Nlc3MuaWQgPT0gc3ViUHJvY2Vzc0lkICYmIG9ialN1YlByb2Nlc3Muc2VxID09IHN1YlByb2Nlc3NTZXEpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHV1aWQgPSBvYmpTdWJQcm9jZXNzLnV1aWQ7XG4gICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKHN1YlByb2Nlc3NJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3ViUHJvY2Vzc0l0ZW0uX2lkID09IHV1aWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzID0gc3ViUHJvY2Vzc0l0ZW07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgIH0pO1xuICAgIC8vIEdldCB0aGUgY3VycmVudCBzdWJQcm9jZXNzIGNvbmZpZ3VyYXRpb25cbiAgICBfV0ZJbnN0YW5jZS5jb25maWcucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbiAocHJvY2Vzc0NvbmZpZykge1xuICAgICAgICBpZiAocHJvY2Vzc0NvbmZpZy5faWQgPT0gcHJvY2Vzc0lkKSB7XG4gICAgICAgICAgICBwcm9jZXNzQ29uZiA9IHByb2Nlc3NDb25maWc7XG4gICAgICAgICAgICBwcm9jZXNzQ29uZmlnLnN1YlByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKHN1YlByb2Nlc3NDb25maWcpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3ViUHJvY2Vzc0NvbmZpZy5faWQgPT0gc3ViUHJvY2Vzc0lkKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NDb25mID0gc3ViUHJvY2Vzc0NvbmZpZztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgLy9UT0RPOiBDaGFuZ2UgcmVxdWlyZWQgdG8gbW92ZSBpc0FjdGl2ZSB0byBzdWJQcm9jZXNzIGZpbGUuSGVyZVxuICAgIHZhciBncm91cEtleSA9ICcnO1xuICAgIHZhciBiYXNlVVVJRCA9IGRhdGEuYmFzZVVVSUQ7XG4gICAgaWYgKGJhc2VVVUlEICE9IHVuZGVmaW5lZCAmJiBiYXNlVVVJRCAhPSAnJyAmJiBiYXNlVVVJRC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhciBwcmV2aW91c09iamVjdCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBiYXNlVVVJRCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgZ3JvdXBLZXkgPSBwcmV2aW91c09iamVjdC5ncm91cEtleTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBncm91cEtleSA9IGdlbmVyYXRlVVVJRCgpO1xuICAgIH1cblxuICAgIHZhciBzdWJQcm9jZXNzT2JqZWN0SWQgPSBnZW5lcmF0ZVVVSUQoKTtcbiAgICB2YXIgbW9kZWwgPSB7XG4gICAgICAgIF9pZDogc3ViUHJvY2Vzc09iamVjdElkLFxuICAgICAgICBpZDogc3ViUHJvY2Vzc0lkLFxuICAgICAgICB0eXBlOiAnd29ya2Zsb3dJbnN0YW5jZVN1YlByb2Nlc3MnLFxuICAgICAgICBzZXE6IHN1YlByb2Nlc3NTZXEsXG4gICAgICAgIGluaXRpYXRlZDogZmFsc2UsXG4gICAgICAgIGRhdGVzOiB7XG4gICAgICAgICAgICBjcmVhdGVkOiAnJyxcbiAgICAgICAgICAgIHZhbGlkOiAnJyxcbiAgICAgICAgICAgIHN0YXJ0OiAnJyxcbiAgICAgICAgICAgIGR1ZTogJycsXG4gICAgICAgICAgICBjbG9zZWQ6ICcnXG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBsZXRlOiBmYWxzZSxcbiAgICAgICAgaW5kaWNhdG9yczogW10sXG4gICAgICAgIHN0ZXA6IHt9LFxuICAgICAgICBhY3RpdmU6IHRydWUsXG4gICAgICAgIGdyb3VwS2V5OiBncm91cEtleSxcbiAgICAgICAgY2hhbm5lbHM6IFtcbiAgICAgICAgICAgIFwiY29tbXVuaXR5X1wiICsgYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCksXG4gICAgICAgICAgICBcInByb2ZpbGVfXCIgKyBhcHAuU0NPUEUucHJvZmlsZUlkLFxuICAgICAgICAgICAgXCJhcHBsaWNhdGlvbl9cIiArIGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkLFxuICAgICAgICAgICAgXCJjb21tdW5pdHlfXCIgKyBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKSArIFwiX2FwcGxpY2F0aW9uX1wiICsgYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWRcbiAgICAgICAgXSxcbiAgICAgICAgaGlzdG9yeTogW11cbiAgICB9O1xuXG4gICAgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzLnB1c2gobW9kZWwpO1xuICAgIC8vIFJldHVybiBhIHByb21pc2VcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAvLyBDYXRjaCBhbGwgdW5jYXVnaHQgZXJyb3JzXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyAxLiBQcm9jZXNzIHRoZSBwcmUtYWN0aW9uc1xuICAgICAgICAgICAgdmFyIHByZUFjdGlvbnNDb25mID0gcHJvY2Vzc0NvbmYucHJlQWN0aW9ucztcbiAgICAgICAgICAgIC8vYWN0aW9uKGFjdGlvbnNbY291bnRlcl0sIHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdWJQcm9jZXNzLCBzdGVwLCBfV0ZJbnN0YW5jZSwgZGF0YSwgdXVpZClcbiAgICAgICAgICAgIHByZUFjdGlvbnMocHJlQWN0aW9uc0NvbmYsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAvLyAyLiBQcm9jZXNzIHRoZSBwcmUtcmVxdWlzaXRlc1xuICAgICAgICAgICAgICAgIHZhciBwcmVyZXF1aXNpdGVDb25mID0gcHJvY2Vzc0NvbmYucHJlcmVxdWlzaXRlcztcbiAgICAgICAgICAgICAgICBwcmVSZXF1aXNpdGVzKHByZXJlcXVpc2l0ZUNvbmYsIF9XRkluc3RhbmNlLCBzdWJQcm9jZXNzT2JqZWN0SWQpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAvLyAzLiBJbml0aWF0ZSB0aGUgc3ViUHJvY2Vzc1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5pdGlhdGVDb25mID0gc3ViUHJvY2Vzc0NvbmYuaW5pdGlhdGU7XG4gICAgICAgICAgICAgICAgICAgIGluaXRpYXRlKGluaXRpYXRlQ29uZiwgc3ViUHJvY2VzcywgZGF0YSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL1VwZGF0ZSB0aGUgc3ViUHJvY2VzcyBtb2RlbFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuaW5pdGlhdGVkID0gcmVzdWx0LmRhdGEuaW5pdGlhdGVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuZGF0ZXMgPSByZXN1bHQuZGF0YS5kYXRlcztcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEV4ZWN1dGUgdGhlIGZpcnN0IHN0ZXBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGVwSWQgPSBzdWJQcm9jZXNzQ29uZi5zdGVwc1swXS5faWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHJhbnNpdGlvbklkID0gc3ViUHJvY2Vzc0NvbmYuc3RlcHNbMF0udHJhbnNpdGlvblswXS5faWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RlcFNlcSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdGVwSWQsIHN0ZXBTZXEsIGRhdGEsIF9XRkluc3RhbmNlLCBzdWJQcm9jZXNzT2JqZWN0SWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5zdGVwID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGljYXRvcnMoc3ViUHJvY2Vzc0NvbmYuaW5kaWNhdG9ycywgX1dGSW5zdGFuY2UsIG1vZGVsLl9pZCkudGhlbihmdW5jdGlvbiAocmVzdWx0MSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuaW5kaWNhdG9ycyA9IHJlc3VsdDEuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEV4ZWN1dGUgdGhlIHRyYW5zaXRpb25zLCBpZiBhdXRvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1N1YnByb2Nlc3MgcG9zdEFjdGlvbnMgcmVtb3ZlZCBmcm9tIGhlcmUgYXMgdGhleSBzaG91bGQgYmUgZXhlY3V0ZWQgYXQgdGhlIGVuZCBvZiB0aGUgc3ViUHJvY2VzcywgbWVhbnMgYXQgbGFzdCBzdGVwIGFmdGVyIHRyYW5zaXRpb24sIGp1c3QgYmVmb3JlIGZpbmlzaC5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENhbiBhZGQgaGlzdG9yeSBvYmplY3QgaGVyZSBpbiBjYXNlIGZvciBmaXJzdCBzdGVwLCBpLmUgaW5pdGlhbGlzYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1vZGVsLmhpc3RvcnkucHVzaChyZXN1bHQuZGF0YSk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MocmVzdWx0MS5tZXNzYWdlLCBtb2RlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMgPSBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gIShvYmouX2lkID09IHN1YlByb2Nlc3NPYmplY3RJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzID0gX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gIShvYmouX2lkID09IHN1YlByb2Nlc3NPYmplY3RJZCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLnN1YnByb2Nlc3NlcyA9IF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIShvYmouX2lkID09IHN1YlByb2Nlc3NPYmplY3RJZCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG5cbiAgICB9KTtcbn07XG5cbi8qKlxuICogUHJvY2VzcyBpbml0aWF0ZVxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBpbml0aWF0ZSAtIHRoZSBpbml0aWF0ZSBjb25maWcgZGF0YVxuICogQHBhcmFtIHtvYmplY3R9IGRhdGEgLSB0aGUgdXNlciBpbnB1dCBkYXRhXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiBpbml0aWF0ZShpbml0aWF0ZSwgc3ViUHJvY2VzcywgZGF0YSkge1xuICAgIHZhciBjb21wbGV0ZWQgPSBbXTtcbiAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgICBpbml0aWF0ZWQ6IGZhbHNlLFxuICAgICAgICBkYXRlczoge1xuICAgICAgICAgICAgY3JlYXRlZDogJycsXG4gICAgICAgICAgICB2YWxpZDogJycsXG4gICAgICAgICAgICBzdGFydDogJycsXG4gICAgICAgICAgICBkdWU6ICcnLFxuICAgICAgICAgICAgY2xvc2VkOiAnJ1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGlmIChpbml0aWF0ZS51c2VyICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5kYXRlcy5jcmVhdGVkID0gZGF0YS5jcmVhdGVkRGF0ZTtcbiAgICAgICAgICAgICAgICBpZiAoaW5pdGlhdGUudXNlci52YWxpZERhdGUuX3R5cGUgPT0gJ3VzZXJTZWxlY3RlZCcgfHwgaW5pdGlhdGUudXNlci52YWxpZERhdGUuX3R5cGUgPT0gJ2F1dG9TZWxlY3RlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEudmFsaWREYXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5kYXRlcy52YWxpZCA9IGRhdGEudmFsaWREYXRlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC53YXJuKCdXRkluaXRpYXRlRXJyb3InLCAnTm8gdmFsaWQgZGF0ZSBwYXNzZWQgaW4gLSB7ZGF0YS52YWxpZERhdGV9Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChpbml0aWF0ZS51c2VyLmR1ZURhdGUuX3R5cGUgPT0gJ3VzZXJTZWxlY3RlZCcgfHwgaW5pdGlhdGUudXNlci5kdWVEYXRlLl90eXBlID09ICdhdXRvU2VsZWN0ZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmR1ZURhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmRhdGVzLmR1ZSA9IGRhdGEuZHVlRGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwud2FybignV0ZJbml0aWF0ZUVycm9yJywgJ05vIGR1ZSBkYXRlIHBhc3NlZCBpbiAtIHtkYXRhLmR1ZURhdGV9Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlc3VsdC5kYXRlcy5zdGFydCA9IGRhdGEuZmlyc3REYXRlO1xuXG5cblxuICAgICAgICAgICAgICAgIHJlc3VsdC5pbml0aWF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdTdWItUHJvY2VzcyBpbml0aWF0ZSBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChpbml0aWF0ZS5hdXRvICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICByZXN1bHQuZGF0ZXMuY3JlYXRlZCA9IGRhdGEuY3JlYXRlZERhdGU7XG5cbiAgICAgICAgICAgICAgICBpZiAoaW5pdGlhdGUuZGF0ZXMudmFsaWQuX3R5cGUgPT0gJ3VzZXJTZWxlY3RlZCcgfHwgaW5pdGlhdGUuZGF0ZXMudmFsaWQuX3R5cGUgPT0gJ2F1dG9TZWxlY3RlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEudmFsaWREYXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5kYXRlcy52YWxpZCA9IGRhdGEudmFsaWREYXRlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC53YXJuKCdXRkluaXRpYXRlRXJyb3InLCAnTm8gdmFsaWQgZGF0ZSBwYXNzZWQgaW4gLSB7ZGF0YS52YWxpZERhdGV9Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChpbml0aWF0ZS5kYXRlcy5kdWUuX3R5cGUgPT0gJ3VzZXJTZWxlY3RlZCcgfHwgaW5pdGlhdGUuZGF0ZXMuZHVlLl90eXBlID09ICdhdXRvU2VsZWN0ZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmR1ZURhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmRhdGVzLmR1ZSA9IGRhdGEuZHVlRGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwud2FybignV0ZJbml0aWF0ZUVycm9yJywgJ05vIGR1ZSBkYXRlIHBhc3NlZCBpbiAtIHtkYXRhLmR1ZURhdGV9Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlc3VsdC5pbml0aWF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdTdWItUHJvY2VzcyBpbml0aWF0ZSBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTsqL1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgdmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZJbml0aWF0ZUVycm9yJywgJ0luaXRpYXRlIHR5cGU6ICcgKyBpbml0aWF0ZS5fdHlwZSArICcgbm90IGRlZmluZWQuJyk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3ViUHJvY2Vzcy5jb21wbGV0ZSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGluaXQoKTtcbiAgICAgICAgfSBlbHNlIGlmICghc3ViUHJvY2Vzcy5jb21wbGV0ZSkge1xuICAgICAgICAgICAgaWYgKGluaXRpYXRlLnBhcmFsbGVsSW5zdGFuY2VzKSB7XG4gICAgICAgICAgICAgICAgaW5pdCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRkluaXRpYXRlRXJyb3InLCAnU3ViLXByb2Nlc3M6ICcgKyBzdWJQcm9jZXNzLmlkICsgJyBzdGlsbCBhY3RpdmUgYW5kIHBhcmFsbGVsIGluc3RhbmNlcyBhcmUgbm90IGFsbG93ZWQuJyk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9KTtcbn07XG5cbi8qKlxuICogUHJvY2VzcyBzdGVwXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NJZCAtIHRoZSBjdXJyZW50IHByb2Nlc3MgaWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdWJQcm9jZXNzSWQgLSB0aGUgY3VycmVudCBzdWItcHJvY2VzcyBpZFxuICogQHBhcmFtIHtzdHJpbmd9IHN0ZXBJZCAtIHRoZSBjdXJyZW50IHN1Yi1wcm9jZXNzIHN0ZXAgaWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGVwU2VxIC0gdGhlIGN1cnJlbnQgc3ViLXByb2Nlc3Mgc3RlcCBpbnN0YW5jZSBjb3VudGVyIC8gc2VxdWVuY2VcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIC0gdGhlIHVzZXIgaW5wdXQgZGF0YVxuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgX1dGSW5zdGFuY2UgY29uc3RydWN0b3IgaW5zdGFuY2VcbiAqXG4gKiBAZXhhbXBsZSAnJ1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cbmZ1bmN0aW9uIHN0ZXAocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwgc3RlcFNlcSwgZGF0YSwgX1dGSW5zdGFuY2UsIHNwdXVpZCkge1xuXG4gICAgLy8gRGVmYXVsdCBzdGVwIG1vZGVsXG4gICAgdmFyIG1vZGVsID0ge1xuICAgICAgICBpZDogJycsXG4gICAgICAgIHNlcTogJycsXG4gICAgICAgIHN0YXR1czogJycsXG4gICAgICAgIG1lc3NhZ2U6ICcnLFxuICAgICAgICBhc3NpZ25lZFRvOiB7XG4gICAgICAgICAgICB1c2VySWQ6ICcnLFxuICAgICAgICAgICAgbmFtZTogJydcbiAgICAgICAgfSxcbiAgICAgICAgYXNzaWdubWVudDoge30sXG4gICAgICAgIGNvbW1lbnQ6ICcnXG4gICAgfTtcblxuICAgIHZhciBzdWJQcm9jZXNzID0ge307XG5cbiAgICB2YXIgdXVpZCA9ICcnO1xuICAgIHZhciBpbnN0U3ViUHJvY2VzcztcbiAgICB2YXIgc3RlcCA9IHt9O1xuXG4gICAgdmFyIHRyYW5zaXRpb25JZCA9ICcnO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvL0dldCB0aGUgY3VycmVudCBzdWJQcm9jZXNzIGluc3RhbmNlIGRhdGFcbiAgICAgICAgICAgIF9XRkluc3RhbmNlLmluc3RhbmNlLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKG9ialByb2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBpZiAob2JqUHJvY2Vzcy5pZCA9PSBwcm9jZXNzSWQgJiYgb2JqUHJvY2Vzcy5zZXEgPT0gcHJvY2Vzc1NlcSkge1xuICAgICAgICAgICAgICAgICAgICBvYmpQcm9jZXNzLnN1YlByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKG9ialN1YlByb2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmpTdWJQcm9jZXNzLmlkID09IHN1YlByb2Nlc3NJZCAmJiBvYmpTdWJQcm9jZXNzLnNlcSA9PSBzdWJQcm9jZXNzU2VxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXVpZCA9IG9ialN1YlByb2Nlc3MudXVpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKHN1YlByb2Nlc3NJdGVtKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN1YlByb2Nlc3NJdGVtLl9pZCA9PSB1dWlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGluc3RTdWJQcm9jZXNzID0gc3ViUHJvY2Vzc0l0ZW07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgX1dGSW5zdGFuY2UuY29uZmlnLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKG9ialByb2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBpZiAob2JqUHJvY2Vzcy5faWQgPT0gcHJvY2Vzc0lkKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ialByb2Nlc3Muc3ViUHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbiAob2JqU3ViUHJvY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9ialN1YlByb2Nlc3MuX2lkID09IHN1YlByb2Nlc3NJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3MgPSBvYmpTdWJQcm9jZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ialN1YlByb2Nlc3Muc3RlcHMuZmlsdGVyKGZ1bmN0aW9uIChvYmpTdGVwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmpTdGVwLl9pZCA9PSBzdGVwSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXAgPSBvYmpTdGVwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgc3ViLXByb2Nlc3Mgc3RlcCBkYXRhXG4gICAgICAgICAgICBtb2RlbC5pZCA9IHN0ZXBJZDtcbiAgICAgICAgICAgIG1vZGVsLnNlcSA9IHN0ZXBTZXE7XG5cbiAgICAgICAgICAgIHZhciBpbnN0YW5jZVN0YXR1cyA9ICcnO1xuICAgICAgICAgICAgaWYgKHN0ZXAuc2V0SW5zdGFuY2VTdGF0dXNUby5Ob3RTdGFydGVkICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlU3RhdHVzID0gXCJOb3RTdGFydGVkXCI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0ZXAuc2V0SW5zdGFuY2VTdGF0dXNUby5DcmVhdGVkICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlU3RhdHVzID0gXCJDcmVhdGVkXCI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0ZXAuc2V0SW5zdGFuY2VTdGF0dXNUby5JblByb2dyZXNzICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlU3RhdHVzID0gXCJJblByb2dyZXNzXCI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0ZXAuc2V0SW5zdGFuY2VTdGF0dXNUby5TdWJtaXR0ZWQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VTdGF0dXMgPSBcIlN1Ym1pdHRlZFwiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGVwLnNldEluc3RhbmNlU3RhdHVzVG8uQ29tcGxldGUgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VTdGF0dXMgPSBcIkNvbXBsZXRlXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBsYW5ndWFnZSA9IHNlcnZpY2UuZ2V0TGFuZ3VhZ2UoKTtcblxuICAgICAgICAgICAgbW9kZWwuc3RhdHVzID0gaW5zdGFuY2VTdGF0dXM7XG4gICAgICAgICAgICBtb2RlbC5tZXNzYWdlID0gZXZhbChcInN0ZXAuc2V0SW5zdGFuY2VTdGF0dXNUby5cIiArIGluc3RhbmNlU3RhdHVzICsgXCIubGFiZWwuaTE4bi5cIiArIGxhbmd1YWdlKTtcbiAgICAgICAgICAgIG1vZGVsLmNvbW1lbnQgPSBkYXRhLmNvbW1lbnQgIT09IHVuZGVmaW5lZCA/IGRhdGEuY29tbWVudCA6ICcnO1xuICAgICAgICAgICAgdmFyIGluZGljYXRvcnMgPSBpbnN0U3ViUHJvY2VzcyAhPT0gdW5kZWZpbmVkID8gaW5zdFN1YlByb2Nlc3MuaW5kaWNhdG9ycyA6IFtdO1xuICAgICAgICAgICAgaW5kaWNhdG9yRG9jcyhwcm9jZXNzSWQsIGluZGljYXRvcnMsIG1vZGVsLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgdXVpZCA9IHNwdXVpZDtcblxuICAgICAgICAgICAgICAgIGlmIChzdGVwLmZ1bmN0aW9uLmFjdGlvbnMgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbnMoc3RlcC5mdW5jdGlvbi5hY3Rpb25zLCBwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3ViUHJvY2VzcywgbW9kZWwsIF9XRkluc3RhbmNlLCBkYXRhLCBzcHV1aWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgc2V0IG9iamVjdCB0byBzdWJwcm9jZXNzIGhpc3Rvcnkgb2JqZWN0XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgdmFyIHNwaW5zdGFuY2VPYmplY3QgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiKyBzcHV1aWQgK1wiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIHNwaW5zdGFuY2VPYmplY3QuaGlzdG9yeS5wdXNoKG1vZGVsKTtcblxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBFeGVjdXRlIHRoZSB0cmFuc2l0aW9ucywgaWYgYXV0b1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0cmFuc2l0aW9uSWQgPSBzdGVwLnRyYW5zaXRpb25bMF0uX2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb24ocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwgdHJhbnNpdGlvbklkLCBkYXRhLCBfV0ZJbnN0YW5jZSwgc3B1dWlkLCBtb2RlbCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdUcmFuc2l0aW9uIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywgcmVzdWx0LmRhdGEuc3RlcCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC8vIEVsc2UgdGFza3MgYXJlIHNwcmVjaWZpZWQsIGV4ZWN1dGUgdGhlbVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RlcC5mdW5jdGlvbi50YXNrICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBNYWtlIGFzc2lnbm1lbnRzXG4gICAgICAgICAgICAgICAgICAgIHRhc2socHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdGVwLmZ1bmN0aW9uLnRhc2ssIHNwdXVpZCwgbW9kZWwpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgc2V0IG9iamVjdCB0byBzdWJwcm9jZXNzIGhpc3Rvcnkgb2JqZWN0XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1Rhc2sgYXdhaXRpbmcgdXNlciBhY3Rpb24uJywgbW9kZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG5cbiAgICB9KTtcbn07XG5cbi8qKlxuICogUHJvY2VzcyBpbmRpY2F0b3IgdXBkYXRlc1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBhY3Rpb25zIC0gdGhlIGFjdGlvbnMgY29uZmlnIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBzdWJQcm9jZXNzIC0gdGhlIGN1cnJlbnQgc3ViLXByb2Nlc3MgZm9ybSBjb25maWcgZGF0YVxuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcbiAqXG4gKiBAZXhhbXBsZSAnJ1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cbmZ1bmN0aW9uIGluZGljYXRvcnMoaW5kaWNhdG9ycywgX1dGSW5zdGFuY2UsIHNwdXVpZCkge1xuICAgIHZhciBtb2RlbCA9IFtdO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgYXJyYXkgPSBKU09OLnhwYXRoKFwiaW5kaWNhdG9yc1tmbjpjb3VudCguL3dvcmtmbG93cy9wcm9jZXNzZXNbc3ViUHJvY2Vzc1VVSUQgZXEgJ1wiICsgc3B1dWlkICsgXCInXSkgZ3QgMF1cIiwgX1dGSW5zdGFuY2UsIHt9KTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgYXJyYXkubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yID0gYXJyYXlbal07XG4gICAgICAgICAgICAgICAgdmFyIGluZGljYXRvck1vZGVsID0ge1xuICAgICAgICAgICAgICAgICAgICBpZDogJycsXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlczogW11cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgaW5zdGFuY2VNb2RlbCA9IHtcbiAgICAgICAgICAgICAgICAgICAgdXVpZDogJycsXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnJyxcbiAgICAgICAgICAgICAgICAgICAga2V5OiAnJyxcbiAgICAgICAgICAgICAgICAgICAgc2VxOiAxXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaW5kaWNhdG9yTW9kZWwuaWQgPSBpbmRpY2F0b3IuY2F0ZWdvcnkudGVybTtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZU1vZGVsLnV1aWQgPSBpbmRpY2F0b3IuX2lkO1xuICAgICAgICAgICAgICAgIGluc3RhbmNlTW9kZWwudGl0bGUgPSBpbmRpY2F0b3IudGl0bGU7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VNb2RlbC5rZXkgPSAnJztcbiAgICAgICAgICAgICAgICBpbnN0YW5jZU1vZGVsLnNlcSA9IGluZGljYXRvci5tb2RlbC5wZW5kaW5nLnNlcTsgLy8gaW5kaWNhdG9yIHNlcSBudW1iZXIgaGVyZSB3aGljaCBpcyBnZXR0aW5nIHVwZGF0ZWQuXG4gICAgICAgICAgICAgICAgaW5kaWNhdG9yTW9kZWwuaW5zdGFuY2VzLnB1c2goaW5zdGFuY2VNb2RlbCk7XG4gICAgICAgICAgICAgICAgbW9kZWwucHVzaChpbmRpY2F0b3JNb2RlbCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdQcm9jZXNzIGluZGljYXRvciBtb2RlbCB1cGRhdGVkLicsIG1vZGVsKTtcbiAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cblxuICAgIH0pXG59O1xuXG4vKipcbiAqIFByb2Nlc3MgYXNzaWduIHVzZXJcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gcHJvY2VzcyBpZFxuICogQHBhcmFtIHtudW1iZXJ9IHByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2UgcHJvY2VzcyBzZXFcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdWJQcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdWItcHJvY2VzcyBpZFxuICogQHBhcmFtIHtudW1iZXJ9IHN1YlByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2Ugc3ViLXByb2Nlc3Mgc2VxXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RlcElkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3RlcCBpZFxuICogQHBhcmFtIHtzdHJpbmd9IHRyYW5zaXRpb25JZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHRyYW5zaXRpb24gaWRcbiAqIEBwYXJhbSB7b2JqZWN0fSB1c2VyIC0gdGhlIHVzZXIgdG8gYXNzaWduIHRvXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuZnVuY3Rpb24gYXNzaWduVXNlcihwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgdXNlciwgX1dGSW5zdGFuY2UpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIHV1aWQgPSAnJztcbiAgICAgICAgICAgIC8vIEdldCB0aGUgY3VycmVudCBzdWJQcm9jZXNzIGluc3RhbmNlIGRhdGFcbiAgICAgICAgICAgIF9XRkluc3RhbmNlLmluc3RhbmNlLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKG9ialByb2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBpZiAob2JqUHJvY2Vzcy5pZCA9PSBwcm9jZXNzSWQgJiYgb2JqUHJvY2Vzcy5zZXEgPT0gcHJvY2Vzc1NlcSkge1xuICAgICAgICAgICAgICAgICAgICBvYmpQcm9jZXNzLnN1YlByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKG9ialN1YlByb2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmpTdWJQcm9jZXNzLmlkID09IHN1YlByb2Nlc3NJZCAmJiBvYmpTdWJQcm9jZXNzLnNlcSA9PSBzdWJQcm9jZXNzU2VxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXVpZCA9IG9ialN1YlByb2Nlc3MudXVpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbiAoc3ViUHJvY2Vzc0l0ZW0pIHtcbiAgICAgICAgICAgICAgICBpZiAoc3ViUHJvY2Vzc0l0ZW0uX2lkID09IHV1aWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0IHRoZSB1c2VyIGRldGFpbHNcbiAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc0l0ZW0uc3RlcC5hc3NpZ25lZFRvLnVzZXJJZCA9IHVzZXIuaWQ7XG4gICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NJdGVtLnN0ZXAuYXNzaWduZWRUby5uYW1lID0gdXNlci5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGluZGljYXRvcnMgdXNlciBkZXRhaWxzXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3JzID0gc3ViUHJvY2Vzc0l0ZW0uaW5kaWNhdG9ycztcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbmRpY2F0b3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yID0gaW5kaWNhdG9yc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaW5kaWNhdG9yLmluc3RhbmNlcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IGluZGljYXRvci5pbnN0YW5jZXNbal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkb2MgPSBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzW2tdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2UudXVpZCA9PSBkb2MuX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2Mud29ya2Zsb3dzLmZpbHRlcihmdW5jdGlvbiAod29ya2Zsb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod29ya2Zsb3cuaWQgPT0gX1dGSW5zdGFuY2UuY29uZmlnLl9pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3b3JrZmxvdy5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChwcm9jZXNzSXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb2Nlc3NJdGVtLmlkID09IHByb2Nlc3NJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgdXNlciBpZCBhbmQgbmFtZSBpbiB0aGUgZG9jdW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzSXRlbS5zdGVwLmFzc2lnbmVkVG8udXNlcklkID0gdXNlci5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzSXRlbS5zdGVwLmFzc2lnbmVkVG8ubmFtZSA9IHVzZXIubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdVc2VyIGFzc2lnbmVkIHN1Y2Nlc3NmdWxseS4gVXNlcklkOiBcIicgKyB1c2VyLmlkICsgJ1wiLCBOYW1lOiBcIicgKyB1c2VyLm5hbWUgKyAnXCInLCBzdWJQcm9jZXNzSXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG5cbiAgICB9KTtcbn07XG5cbi8qKlxuICogUHJvY2VzcyBpbmRpY2F0b3IgZG9jdW1lbnQgdXBkYXRlc1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBhY3Rpb25zIC0gdGhlIGFjdGlvbnMgY29uZmlnIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBzdWJQcm9jZXNzIC0gdGhlIGN1cnJlbnQgc3ViLXByb2Nlc3MgZm9ybSBjb25maWcgZGF0YVxuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcbiAqXG4gKiBAZXhhbXBsZSAnJ1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cbmZ1bmN0aW9uIGluZGljYXRvckRvY3MocHJvY2Vzc0lkLCBpbmRpY2F0b3JzLCBzdGVwLCBfV0ZJbnN0YW5jZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGluZGljYXRvciBzZWN0aW9ucyBvZiB0aGUgc3ViUHJvY2Vzc1xuICAgICAgICAgICAgaWYgKGluZGljYXRvcnMgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZJbmRpY2F0b3JzVXBkYXRlJywgJ0luZGljYXRvcnMgcGFyYW1ldGVyIGlzIHJlcXVpcmVkLiAtIFZhbHVlOiAnICsgaW5kaWNhdG9ycylcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbmRpY2F0b3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3IgPSBpbmRpY2F0b3JzW2ldO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGluZGljYXRvci5pbnN0YW5jZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IGluZGljYXRvci5pbnN0YW5jZXNbal07XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IF9XRkluc3RhbmNlLmluZGljYXRvcnMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZG9jID0gX1dGSW5zdGFuY2UuaW5kaWNhdG9yc1trXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2UudXVpZCA9PSBkb2MuX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvYy53b3JrZmxvd3MuZmlsdGVyKGZ1bmN0aW9uICh3b3JrZmxvdykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdvcmtmbG93LmlkID09IF9XRkluc3RhbmNlLmNvbmZpZy5faWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3b3JrZmxvdy5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChwcm9jZXNzSXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvY2Vzc0l0ZW0uaWQgPT0gcHJvY2Vzc0lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzSXRlbS5zdGVwLmlkID0gc3RlcC5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NJdGVtLnN0ZXAuc2VxID0gc3RlcC5zZXE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzSXRlbS5zdGVwLnN0YXR1cyA9IHN0ZXAuc3RhdHVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0l0ZW0uc3RlcC5tZXNzYWdlID0gc3RlcC5tZXNzYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0l0ZW0uc3RlcC5hc3NpZ25lZFRvLnVzZXJJZCA9IHN0ZXAuYXNzaWduZWRUby51c2VySWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzSXRlbS5zdGVwLmFzc2lnbmVkVG8ubmFtZSA9IHN0ZXAuYXNzaWduZWRUby5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0l0ZW0uc3RlcC5jb21tZW50ID0gc3RlcC5jb21tZW50ICE9PSB1bmRlZmluZWQgPyBzdGVwLmNvbW1lbnQgOiAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdJbmRpY2F0b3IgZG9jdW1lbnRzIHdvcmtmbG93IHByb2Nlc3MgbW9kZWwgdXBkYXRlZC4nLCBfV0ZJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG5cbiAgICB9KVxufTtcblxuLyoqXG4gKiBQcm9jZXNzIGFjdGlvbnNcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gYWN0aW9ucyAtIHRoZSBhY3Rpb25zIGNvbmZpZyBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gc3ViUHJvY2VzcyAtIHRoZSBjdXJyZW50IHN1Yi1wcm9jZXNzIGZvcm0gY29uZmlnIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiBhY3Rpb25zKGFjdGlvbnMsIHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdWJQcm9jZXNzLCBzdGVwLCBfV0ZJbnN0YW5jZSwgZGF0YSwgdXVpZCkge1xuICAgIHZhciBhcnJBY3Rpb25zID0gW107XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdXRpbC5zeW5jTG9vcChhY3Rpb25zLmxlbmd0aCwgZnVuY3Rpb24gKGxvb3ApIHtcbiAgICAgICAgICAgIHZhciBjb3VudGVyID0gbG9vcC5pdGVyYXRpb24oKTtcbiAgICAgICAgICAgIGFjdGlvbihhY3Rpb25zW2NvdW50ZXJdLCBwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3ViUHJvY2Vzcywgc3RlcCwgX1dGSW5zdGFuY2UsIGRhdGEsIHV1aWQpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmV0QWN0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGFjdGlvbnNbY291bnRlcl0uX2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VxOiBjb3VudGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogcmVzdWx0XG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgYXJyQWN0aW9ucy5wdXNoKHJldEFjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGxvb3AubmV4dCgpO1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9vcC5icmVhaygpO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0FjdGlvbnMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCBhcnJBY3Rpb25zKTtcbiAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcblxuLyoqXG4gKiBQcm9jZXNzIGFjdGlvblxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBhY3Rpb24gLSB0aGUgYWN0aW9uIGNvbmZpZyBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gc3ViUHJvY2VzcyAtIHRoZSBjdXJyZW50IHN1Yi1wcm9jZXNzIGZvcm0gY29uZmlnIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiBhY3Rpb24oYWN0aW9uLCBwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3ViUHJvY2Vzcywgc3RlcCwgX1dGSW5zdGFuY2UsIGRhdGEsIHV1aWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgIGlmIChhY3Rpb24ubWV0aG9kICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdmFyIG1ldGhvZFBvc3NpYmxlSXRlbXMgPSBbXCJmb3JtXCIsIFwiaW5kaWNhdG9yXCIsIFwicHJvZmlsZVwiLCBcInN1YlByb2Nlc3NJbnN0YW5jZVwiLCBcInN0ZXBcIiwgXCJjb21tdW5pdHlcIiwgXCJhcHBsaWNhdGlvblwiLCBcInVzZXJcIiwgXCJzZG9cIiwgXCJwZXJmb3JtYW5jZVwiLCBcInRheG9ub215XCIsIFwidmFyaWFibGVzXCIsIFwibm90aWZpY2F0aW9uXCJdO1xuICAgICAgICAgICAgc3dpdGNoIChwcm9wZXJ0eUV4aXN0cyhhY3Rpb24ubWV0aG9kLCBtZXRob2RQb3NzaWJsZUl0ZW1zKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2Zvcm0nOlxuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uLm1ldGhvZC5mb3JtLmNyZWF0ZSAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChwcm9jZXNzSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHN1YlByb2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHN0ZXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGFjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2gocHJvY2Vzc1NlcSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goc3ViUHJvY2Vzc1NlcSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChfV0ZJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YS5jcmVhdGVUeXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh1dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmJhc2VVVUlEKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5jcmVhdGUoYXJncykudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbi5tZXRob2QuZm9ybS5hdXRob3Jpc2UgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2gocHJvY2Vzc0lkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChzdWJQcm9jZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChwcm9jZXNzU2VxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChzdWJQcm9jZXNzU2VxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChfV0ZJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YS5jcmVhdGVUeXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh1dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmJhc2VVVUlEKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uYXV0aG9yaXNlKGFyZ3MpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24ubWV0aG9kLmZvcm0udW5kcmFmdCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goX1dGSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEuY3JlYXRlVHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2godXVpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YS5iYXNlVVVJRCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLnNldFVuRHJhZnQoYXJncykudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbi5tZXRob2QuZm9ybS5kcmFmdCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goX1dGSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEuY3JlYXRlVHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2godXVpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YS5iYXNlVVVJRCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLnNldERyYWZ0KGFyZ3MpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24ubWV0aG9kLmZvcm0uY2xvc2UgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goc3ViUHJvY2Vzcy5pbmRpY2F0b3JzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChfV0ZJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YS5jcmVhdGVUeXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh1dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmJhc2VVVUlEKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uY2xvc2UoYXJncykudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnaW5kaWNhdG9yJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGlvbi5tZXRob2QuaW5kaWNhdG9yLmNyZWF0ZSAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbi5tZXRob2QuaW5kaWNhdG9yLmluc3RhbnRpYXRlICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uLm1ldGhvZC5pbmRpY2F0b3Iuc2V0VmFsdWUgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXRoID0gYWN0aW9uLm1ldGhvZC5pbmRpY2F0b3Iuc2V0VmFsdWUucGF0aDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaGVscGVyLmdldE5vZGVWYWx1ZShhY3Rpb24ubWV0aG9kLmluZGljYXRvci5zZXRWYWx1ZS5kYXRhLCBfV0ZJbnN0YW5jZSwgdXVpZCkudGhlbihmdW5jdGlvbiAoZGF0YVZhbHVlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChfV0ZJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHV1aWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChwYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YVZhbHVlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0udXBkYXRlSW5kaWNhdG9yKGFyZ3MpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uLm1ldGhvZC5pbmRpY2F0b3IudXBkYXRlU3RhdHVzICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yU2V0SWQgPSBhY3Rpb24ubWV0aG9kLmluZGljYXRvci5pbmRpY2F0b3JTZXRJZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goX1dGSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHV1aWQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uLm1ldGhvZC5pbmRpY2F0b3IudXBkYXRlU3RhdHVzICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGF0dXMgPSBhY3Rpb24ubWV0aG9kLmluZGljYXRvci51cGRhdGVTdGF0dXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHN0YXR1cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGluZGljYXRvclNldElkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBLZWVwIGluZGljYXRvciBmdW5jdGlvbnMgaW4gaW5kaWF0b3IgZmlsZSBpc3RlYWQgb2YgZm9ybSBmaWxlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0ubWFya1VwZGF0ZUluZGljYXRvcihhcmdzKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKFwiQWN0aW9uIGluZGljYXRvciBzdWIgdHlwZSBub3QgZm91bmQuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdwcm9maWxlJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGlvbi5tZXRob2QucHJvZmlsZS5jcmVhdGUgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2gocHJvY2Vzc0lkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChfV0ZJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YS5jcmVhdGVUeXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh1dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmJhc2VVVUlEKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uY3JlYXRlUHJvZmlsZShhcmdzKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uLm1ldGhvZC5wcm9maWxlLlggIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3N1YlByb2Nlc3NJbnN0YW5jZSc6XG4gICAgICAgICAgICAgICAgICAgIHZhciBzcFBvc3NpYmxlSXRlbXMgPSBbXCJpbnN0YW50aWF0ZVwiLCBcImF1dGhvcmlzZVwiLCBcImNsb3NlXCIsIFwic2V0VmFyaWFibGVcIiwgXCJzZXRTdGF0dXNUb1wiLCBcInNldFN0YXR1c01zZ1RvXCIsIFwic2V0VGl0bGVcIiwgXCJzZXRWYWxpZERhdGVcIl07XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocHJvcGVydHlFeGlzdHMoYWN0aW9uLm1ldGhvZC5zdWJQcm9jZXNzSW5zdGFuY2UsIHNwUG9zc2libGVJdGVtcykpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc2V0VGl0bGUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlbHBlci5nZXROb2RlVmFsdWUoYWN0aW9uLm1ldGhvZC5zdWJQcm9jZXNzSW5zdGFuY2Uuc2V0VGl0bGUsIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uIChkYXRhVmFsdWUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25zTW9kdWxlLnN1YlByb2Nlc3NJbnN0YW5jZS5zZXRUaXRsZShhY3Rpb24ubWV0aG9kLnN1YlByb2Nlc3NJbnN0YW5jZS5zZXRUaXRsZSwgdXVpZCwgZGF0YVZhbHVlLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdXBkYXRlIHN1YnByb2Nlc3MgbGFiZWwgaW4gd29ya2Zsb3cgaW5zdGFuY2UgcHJvY2VzcyBvYmplY3Q6IFRPRE9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc2V0VmFsaWREYXRlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWxwZXIuZ2V0Tm9kZVZhbHVlKGFjdGlvbi5tZXRob2Quc3ViUHJvY2Vzc0luc3RhbmNlLnNldFZhbGlkRGF0ZSwgX1dGSW5zdGFuY2UsIHV1aWQpLnRoZW4oZnVuY3Rpb24gKGRhdGFWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25zTW9kdWxlLnN1YlByb2Nlc3NJbnN0YW5jZS5zZXRWYWxpZERhdGUoYWN0aW9uLm1ldGhvZC5zdWJQcm9jZXNzSW5zdGFuY2Uuc2V0VmFsaWREYXRlLCB1dWlkLCBkYXRhVmFsdWUsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdXBkYXRlIHN1YnByb2Nlc3MgbGFiZWwgaW4gd29ya2Zsb3cgaW5zdGFuY2UgcHJvY2VzcyBvYmplY3Q6IFRPRE9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJObyBtZXRob2QgZm91bmQgZnJvbSBpbXBsZW1lbnRlZCBsaXN0IGluIHN1YnByb2Nlc3MgYWN0aW9uLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3N0ZXAnOlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdjb21tdW5pdHknOlxuICAgICAgICAgICAgICAgICAgICB2YXIgY29tbXVuaXR5UG9zc2libGVJdGVtcyA9IFtcImNyZWF0ZUNvbW11bml0eVwiLCBcInJlbGVhc2VBZG9wdGVkQXBwbGljYXRpb25cIiwgXCJ1c2VySm9pbkNvbW11bml0eVwiXTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChwcm9wZXJ0eUV4aXN0cyhhY3Rpb24ubWV0aG9kLmNvbW11bml0eSwgY29tbXVuaXR5UG9zc2libGVJdGVtcykpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnY3JlYXRlQ29tbXVuaXR5JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5jb21tdW5pdHkuY3JlYXRlQ29tbXVuaXR5KGFjdGlvbi5tZXRob2QuY29tbXVuaXR5LmNyZWF0ZUNvbW11bml0eSwgdXVpZCwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdyZWxlYXNlQWRvcHRlZEFwcGxpY2F0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5jb21tdW5pdHkucmVsZWFzZUFkb3B0ZWRBcHBsaWNhdGlvbihhY3Rpb24ubWV0aG9kLmNvbW11bml0eS5yZWxlYXNlQWRvcHRlZEFwcGxpY2F0aW9uLCB1dWlkLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3VzZXJKb2luQ29tbXVuaXR5JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5jb21tdW5pdHkudXNlckpvaW5Db21tdW5pdHkoYWN0aW9uLm1ldGhvZC5jb21tdW5pdHkudXNlckpvaW5Db21tdW5pdHksIHV1aWQsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJObyBtZXRob2QgZm91bmQgZnJvbSBpbXBsZW1lbnRlZCBsaXN0LlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2FwcGxpY2F0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFwcGxpY2F0aW9uUG9zc2libGVJdGVtcyA9IFtcImNyZWF0ZUFwcERlZmluaXRpb25cIiwgXCJidWlsZEFwcGxpY2F0aW9uXCIsIFwiYXBwbGljYXRpb25BZG9wdGlvblwiXTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChwcm9wZXJ0eUV4aXN0cyhhY3Rpb24ubWV0aG9kLmFwcGxpY2F0aW9uLCBhcHBsaWNhdGlvblBvc3NpYmxlSXRlbXMpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NyZWF0ZUFwcERlZmluaXRpb24nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25zTW9kdWxlLmFwcGxpY2F0aW9uLmNyZWF0ZUFwcERlZmluaXRpb24oYWN0aW9uLm1ldGhvZC5hcHBsaWNhdGlvbi5jcmVhdGVBcHBEZWZpbml0aW9uLCB1dWlkLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2J1aWxkQXBwbGljYXRpb24nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25zTW9kdWxlLmFwcGxpY2F0aW9uLmJ1aWxkQXBwbGljYXRpb24oYWN0aW9uLm1ldGhvZC5hcHBsaWNhdGlvbi5idWlsZEFwcGxpY2F0aW9uLCB1dWlkLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2FwcGxpY2F0aW9uQWRvcHRpb24nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25zTW9kdWxlLmFwcGxpY2F0aW9uLmFwcGxpY2F0aW9uQWRvcHRpb24oYWN0aW9uLm1ldGhvZC5hcHBsaWNhdGlvbi5hcHBsaWNhdGlvbkFkb3B0aW9uLCB1dWlkLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3VzZXInOlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdzZG8nOlxuICAgICAgICAgICAgICAgICAgICB2YXIgc2RvUG9zc2libGVJdGVtcyA9IFtcImNyZWF0ZVwiXTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChwcm9wZXJ0eUV4aXN0cyhhY3Rpb24ubWV0aG9kLnNkbywgc2RvUG9zc2libGVJdGVtcykpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnY3JlYXRlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5zZG8uY3JlYXRlKGFjdGlvbi5tZXRob2Quc2RvLmNyZWF0ZSwgdXVpZCwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChcIk5vIG1ldGhvZCBmb3VuZCBmcm9tIGltcGxlbWVudGVkIGxpc3QuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdwZXJmb3JtYW5jZSc6XG4gICAgICAgICAgICAgICAgICAgIHZhciBwZXJmb3JtYW5jZVBvc3NpYmxlSXRlbXMgPSBbXCJjcmVhdGVcIiwgXCJjb25maWd1cmVOb2RlXCIsIFwidW5sb2NrUGVyaW9kXCIsIFwibG9ja1BlcmZvcm1hbmNlTW9kZWxcIiwgXCJzZXRNb2RlbFN0YXR1c1wiXTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChwcm9wZXJ0eUV4aXN0cyhhY3Rpb24ubWV0aG9kLnBlcmZvcm1hbmNlLCBwZXJmb3JtYW5jZVBvc3NpYmxlSXRlbXMpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NyZWF0ZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUucGVyZm9ybWFuY2UuY3JlYXRlKGFjdGlvbi5tZXRob2QucGVyZm9ybWFuY2UuY3JlYXRlLCB1dWlkLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjb25maWd1cmVOb2RlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5wZXJmb3JtYW5jZS5jb25maWd1cmVOb2RlKGFjdGlvbi5tZXRob2QucGVyZm9ybWFuY2UuY29uZmlndXJlTm9kZSwgdXVpZCwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAndW5sb2NrUGVyaW9kJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5wZXJmb3JtYW5jZS51bmxvY2tQZXJpb2QoYWN0aW9uLm1ldGhvZC5wZXJmb3JtYW5jZS51bmxvY2tQZXJpb2QsIHV1aWQsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3NldE1vZGVsU3RhdHVzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5wZXJmb3JtYW5jZS5zZXRNb2RlbFN0YXR1cyhhY3Rpb24ubWV0aG9kLnBlcmZvcm1hbmNlLnNldE1vZGVsU3RhdHVzLCB1dWlkLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdsb2NrUGVyZm9ybWFuY2VNb2RlbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUucGVyZm9ybWFuY2UubG9ja1BlcmZvcm1hbmNlTW9kZWwoYWN0aW9uLm1ldGhvZC5wZXJmb3JtYW5jZS5sb2NrUGVyZm9ybWFuY2VNb2RlbCwgdXVpZCwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3RheG9ub215JzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRheG9ub215UG9zc2libGVJdGVtcyA9IFtcImNyZWF0ZVwiXTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChwcm9wZXJ0eUV4aXN0cyhhY3Rpb24ubWV0aG9kLnRheG9ub215LCB0YXhvbm9teVBvc3NpYmxlSXRlbXMpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NyZWF0ZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUudGF4b25vbXkuY3JlYXRlKGFjdGlvbi5tZXRob2QudGF4b25vbXkuY3JlYXRlLCB1dWlkLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd2YXJpYWJsZXMnOlxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFyaWFibGVzUG9zc2libGVJdGVtcyA9IFtcInNldFZhcmlhYmxlXCJdO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5RXhpc3RzKGFjdGlvbi5tZXRob2QudmFyaWFibGVzLCB2YXJpYWJsZXNQb3NzaWJsZUl0ZW1zKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzZXRWYXJpYWJsZSc6XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS52YXJpYWJsZXMuc2V0VmFyaWFibGUoYWN0aW9uLm1ldGhvZC52YXJpYWJsZXMuc2V0VmFyaWFibGUsIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJObyBtZXRob2QgZm91bmQgZnJvbSBpbXBsZW1lbnRlZCBsaXN0LlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ25vdGlmaWNhdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIHZhciBub3RpZmljYXRpb25Qb3NzaWJsZUl0ZW1zID0gW1wiZW1haWxcIiwgXCJzbXNcIiwgXCJwdXNoQVBJXCJdO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5RXhpc3RzKGFjdGlvbi5tZXRob2Qubm90aWZpY2F0aW9uLCBub3RpZmljYXRpb25Qb3NzaWJsZUl0ZW1zKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdlbWFpbCc6XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5ub3RpZmljYXRpb24uZW1haWwoYWN0aW9uLm1ldGhvZC5ub3RpZmljYXRpb24uZW1haWwsIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc21zJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJTTVMgZnVuY3Rpb25hbGl0eSBub3QgaW1wbGVtZW50ZWRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3B1c2hBUEknOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChcInB1c2hBUEkgZnVuY3Rpb25hbGl0eSBub3QgaW1wbGVtZW50ZWRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwibWV0aG9kIG5vdCBkZWZpbmVkIGluIGNvbmZpZ3VyYXRpb25cIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWplY3QoXCJObyBtZXRob2QgZm91bmQgZnJvbSBpbXBsZW1lbnRlZCBsaXN0LlwiKTtcblxuICAgICAgICB9XG5cbiAgICB9KTtcbn07XG5cbi8qKlxuICogUHJvY2VzcyB0YXNrc1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSB0YXNrIC0gdGhlIHRhc2sgY29uZmlnIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dERhdGEgLSB0aGUgdXNlciBpbnB1dCBkYXRhXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiB0YXNrKHN1YnByb2Nlc3NJRCwgc3VicHJvY2Vzc1NFUSwgdGFzaywgc3B1dWlkLCBtb2RlbCkge1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICB2YXIgX1dGSW5zdGFuY2UgPSBhcHAuU0NPUEUud29ya2Zsb3c7XG4gICAgICAgIHZhciBwcmVBY3Rpb25zQ29uZiA9IHRhc2sucHJlQWN0aW9ucztcbiAgICAgICAgcHJlQWN0aW9ucyhwcmVBY3Rpb25zQ29uZiwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24gKHByZUFjdGlvblJlc3VsdCkge1xuXG4gICAgICAgICAgICB2YXIgbGlzdCA9IFtdO1xuICAgICAgICAgICAgaWYgKHRhc2suYXNzaWduLnJvbGUgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFzc2lnblR5cGUgPSAncHJvZmlsZVJvbGUnO1xuICAgICAgICAgICAgICAgIHZhciBwcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xuICAgICAgICAgICAgICAgIHZhciBpZCA9ICcnO1xuICAgICAgICAgICAgICAgIGlmICh0YXNrLmFzc2lnbi5yb2xlLnByb2ZpbGUgPT0gJ2N1cnJlbnQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRhc2suYXNzaWduLnJvbGUucHJvZmlsZSA9PSAnY29tbXVuaXR5Jykge1xuICAgICAgICAgICAgICAgICAgICBpZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciByb2xlID0gdGFzay5hc3NpZ24ucm9sZS5yb2xlSWQ7XG5cbiAgICAgICAgICAgICAgICBsaWJyYXJ5LmdldFVzZXJzTGlzdEJ5Um9sZShpZCwgcm9sZSkudGhlbihmdW5jdGlvbiAobGlzdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdCAhPSB1bmRlZmluZWQpIHtcblxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsaXN0Lmxlbmd0aCA+IDEpIHtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTmV3IHJlcXVpcmVtZW50IGhlcmUgd2lsbCBhdXRvbWF0aWNhbGx5IGFzc2lnbiB0aGUgc3RlcCB0byBjdXJyZW50IHVzZXIgaWYgdGhpcyB1c2VyIGZhbGxzIHVuZGVyIHRoZSBwcm92aWRlZCBncm91cC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSVUxFIElOVFJPRFVDRUQgT04gMTYtTUFSQ0gtMjAxN1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIGN1cnJlbnQgdXNlciBsaWVzIHdpdGhpbiB0aGUgc3BlY2lmaWVkIHJvbGUsIGl0IHdpbGwgYmUgYXV0b21hdGljYWxseSBhc3NpZ25lZCB0byB0aGF0IHVzZXIuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlzQ3VycmVudFVzZXJFeGlzdEluR2l2ZW5Sb2xlID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm9sZXNPYmplY3QgPSBsaWJyYXJ5LmdldEN1cnJlbnRVc2VyUm9sZXMoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpZCA9PSBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXNDdXJyZW50VXNlclJvbGUgPSByb2xlc09iamVjdC5jb21tdW5pdHkuaW5kZXhPZihyb2xlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzQ3VycmVudFVzZXJSb2xlID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDdXJyZW50VXNlckV4aXN0SW5HaXZlblJvbGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDdXJyZW50VXNlckV4aXN0SW5HaXZlblJvbGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlzQ3VycmVudFVzZXJSb2xlID0gcm9sZXNPYmplY3QucHJvZmlsZS5pbmRleE9mKHJvbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXNDdXJyZW50VXNlckltcGxpY2l0Um9sZSA9IHJvbGVzT2JqZWN0LmltcGxpY2l0LmluZGV4T2Yocm9sZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoaXNDdXJyZW50VXNlclJvbGUgPiAtMSB8fCBpc0N1cnJlbnRVc2VySW1wbGljaXRSb2xlID4gLTEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDdXJyZW50VXNlckV4aXN0SW5HaXZlblJvbGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0N1cnJlbnRVc2VyRXhpc3RJbkdpdmVuUm9sZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNDdXJyZW50VXNlckV4aXN0SW5HaXZlblJvbGUpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhc3NpZ25lZSA9IG1vZGVsLmFzc2lnbmVkVG87XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVlLm5hbWUgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJuYW1lICsgXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduZWUudXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQgKyBcIlwiO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhc3NpZ25tZW50ID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhc2suYXNzaWduLmFzc2lnbm1lbnQgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFzc2lnbm1lbnQgPSBtb2RlbC5hc3NpZ25tZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWNjZXB0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaG93XCI6IHRhc2suYXNzaWduLmFzc2lnbm1lbnQuYWNjZXB0LnNob3csXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IF9nZXROYW1lQnlMYW5nKHRhc2suYXNzaWduLmFzc2lnbm1lbnQuYWNjZXB0LmxhYmVsLmkxOG4pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5hY2NlcHQgPSBhY2NlcHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQubWVzc2FnZSA9IF9nZXROYW1lQnlMYW5nKHRhc2suYXNzaWduLmFzc2lnbm1lbnQubWVzc2FnZS5pMThuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlamVjdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2hvd1wiOiB0YXNrLmFzc2lnbi5hc3NpZ25tZW50LnJlamVjdC5zaG93LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBfZ2V0TmFtZUJ5TGFuZyh0YXNrLmFzc2lnbi5hc3NpZ25tZW50LnJlamVjdC5sYWJlbC5pMThuKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQucmVqZWN0ID0gcmVqZWN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb2ZpbGVJZFwiOiBwcm9maWxlSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJvbGVJZFwiOiByb2xlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwicm9sZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50LnByb2ZpbGVSb2xlSWQgPSBpZDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNDdXJyZW50VXNlckV4aXN0SW5HaXZlblJvbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9GaXJlIFByZS13b3JrQWN0aW9ucyBoZXJlXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb2Nlc3NJZCA9IEpTT04ueHBhdGgoXCIvaW5zdGFuY2UvcHJvY2Vzc2VzW3N1YlByb2Nlc3Nlcy91dWlkIGVxICdcIiArIHNwdXVpZCArIFwiJ10vaWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1YlByb2Nlc3NJZCA9IEpTT04ueHBhdGgoXCIvaW5zdGFuY2UvcHJvY2Vzc2VzL3N1YlByb2Nlc3Nlc1t1dWlkIGVxICdcIiArIHNwdXVpZCArIFwiJ10vaWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0ZXBJZCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL3N0ZXAvaWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0ZXBPYmplY3QgPSBKU09OLnhwYXRoKFwiL3Byb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgcHJvY2Vzc0lkICsgXCInXS9zdWJQcm9jZXNzZXNbX2lkIGVxICdcIiArIHN1YlByb2Nlc3NJZCArIFwiJ10vc3RlcHNbX2lkIGVxICdcIiArIHN0ZXBJZCArIFwiJ11cIiwgX1dGSW5zdGFuY2UuY29uZmlnLCB7fSlbMF07XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFzay5wcmVXb3JrQWN0aW9ucyAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByZVdvcmtBY3Rpb25zT2JqID0gdGFzay5wcmVXb3JrQWN0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZVdvcmtBY3Rpb25zKHByZVdvcmtBY3Rpb25zT2JqLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbiAoc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoJ0Fzc2lnbm1lbnQgaXMgbWFkZS4gUHJlIHdvcmsgYWN0aW9ucyBmb3VuZCBhbmQgZXhlY3V0ZWQgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgnQXNzaWdubWVudCBpcyBtYWRlLiBObyBwcmUgd29yayBhY3Rpb25zIGZvdW5kLiAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCdOb3RpZmljYXRpb25zIHJlcXVlc3Qgc3VibWl0dGVkIGZvciBhY2NlcHRhbmNlLicpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxpc3QubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJbXBsZW1lbnQgaGVyZSBwcmVXb3JrQWN0aW9uIGFzIHRoaXMgaXMgYXV0b21hdGljYWxseSBhc3NpZ25lZCBpbiBjYXNlIG9mIDEgdXNlciBhbmQgd2lsbCBub3QgZ28gdHJvdWdoIGFjY2VwdGFuY2UgZnVuY3Rpb24uXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdXNlcklkID0gbGlzdFswXS5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdXNlcm5hbWUgPSBsaXN0WzBdLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFzc2lnbmVlID0gbW9kZWwuYXNzaWduZWRUbztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25lZS5uYW1lID0gdXNlcm5hbWUgKyBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVlLnVzZXJJZCA9IHVzZXJJZCArIFwiXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXNzaWdubWVudCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YXNrLmFzc2lnbi5hc3NpZ25tZW50ICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhc3NpZ25tZW50ID0gbW9kZWwuYXNzaWdubWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjY2VwdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2hvd1wiOiB0YXNrLmFzc2lnbi5hc3NpZ25tZW50LmFjY2VwdC5zaG93LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBfZ2V0TmFtZUJ5TGFuZyh0YXNrLmFzc2lnbi5hc3NpZ25tZW50LmFjY2VwdC5sYWJlbC5pMThuKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQuYWNjZXB0ID0gYWNjZXB0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50Lm1lc3NhZ2UgPSBfZ2V0TmFtZUJ5TGFuZyh0YXNrLmFzc2lnbi5hc3NpZ25tZW50Lm1lc3NhZ2UuaTE4bik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWplY3QgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNob3dcIjogdGFzay5hc3NpZ24uYXNzaWdubWVudC5yZWplY3Quc2hvdyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogX2dldE5hbWVCeUxhbmcodGFzay5hc3NpZ24uYXNzaWdubWVudC5yZWplY3QubGFiZWwuaTE4bilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50LnJlamVjdCA9IHJlamVjdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxlSWRcIjogcHJvZmlsZUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyb2xlSWRcIjogcm9sZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInJvbGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5wcm9maWxlUm9sZUlkID0gaWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vRmlyZSBQcmUtd29ya0FjdGlvbnMgaGVyZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm9jZXNzSWQgPSBKU09OLnhwYXRoKFwiL2luc3RhbmNlL3Byb2Nlc3Nlc1tzdWJQcm9jZXNzZXMvdXVpZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWJQcm9jZXNzSWQgPSBKU09OLnhwYXRoKFwiL2luc3RhbmNlL3Byb2Nlc3Nlcy9zdWJQcm9jZXNzZXNbdXVpZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGVwSWQgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXS9zdGVwL2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGVwT2JqZWN0ID0gSlNPTi54cGF0aChcIi9wcm9jZXNzZXNbX2lkIGVxICdcIiArIHByb2Nlc3NJZCArIFwiJ10vc3ViUHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzdWJQcm9jZXNzSWQgKyBcIiddL3N0ZXBzW19pZCBlcSAnXCIgKyBzdGVwSWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLmNvbmZpZywge30pWzBdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YXNrLnByZVdvcmtBY3Rpb25zICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJlV29ya0FjdGlvbnNPYmogPSB0YXNrLnByZVdvcmtBY3Rpb25zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlV29ya0FjdGlvbnMocHJlV29ya0FjdGlvbnNPYmosIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uIChzdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoJ0Fzc2lnbmVkIHRvIHRoZSBvbmx5IHVzZXIgaW4gcm9sZS4gUHJlIHdvcmsgYWN0aW9ucyBleGVjdXRlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoJ0Fzc2lnbmVkIHRvIHRoZSBvbmx5IHVzZXIgaW4gcm9sZS4gTm8gcHJlIHdvcmsgYWN0aW9ucyBmb3VuZC4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFzc2lnbmVlID0gbW9kZWwuYXNzaWduZWRUbztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25lZS5uYW1lID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25lZS51c2VySWQgPSBcIlwiO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFzc2lnbm1lbnQgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFzay5hc3NpZ24uYXNzaWdubWVudCAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXNzaWdubWVudCA9IG1vZGVsLmFzc2lnbm1lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhY2NlcHQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNob3dcIjogdGFzay5hc3NpZ24uYXNzaWdubWVudC5hY2NlcHQuc2hvdyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogX2dldE5hbWVCeUxhbmcodGFzay5hc3NpZ24uYXNzaWdubWVudC5hY2NlcHQubGFiZWwuaTE4bilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50LmFjY2VwdCA9IGFjY2VwdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5tZXNzYWdlID0gX2dldE5hbWVCeUxhbmcodGFzay5hc3NpZ24uYXNzaWdubWVudC5tZXNzYWdlLmkxOG4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVqZWN0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaG93XCI6IHRhc2suYXNzaWduLmFzc2lnbm1lbnQucmVqZWN0LnNob3csXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IF9nZXROYW1lQnlMYW5nKHRhc2suYXNzaWduLmFzc2lnbm1lbnQucmVqZWN0LmxhYmVsLmkxOG4pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5yZWplY3QgPSByZWplY3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZmlsZUlkXCI6IHByb2ZpbGVJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicm9sZUlkXCI6IHJvbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJyb2xlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50LnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQucHJvZmlsZVJvbGVJZCA9IGlkO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vV2lsbCBiZSBmaXJlZCBmcm9tIFRha2VBc3NpZ25tZW50IHBhdGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKFwiTm8gdXNlcnMgZm91bmQgaW4gbGlzdC4gQXNzaWduaW5nIGJsYW5rIFwiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgaW4gZ2V0VXNlcnNMaXN0QnlSb2xlIHVuZGVmaW5lZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIGluIGdldFVzZXJzTGlzdEJ5Um9sZScpO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFzay5hc3NpZ24uc3dpbWxhbmUgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgnc3dpbWxhbmUnKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU3dpbWxhbmUgaW1wbGVtZW50YXRpb24gISEnKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcblxuICAgICAgICAgICAgcmVqZWN0KGVycik7XG5cbiAgICAgICAgfSk7XG5cblxuXG5cbiAgICB9KTtcblxufTtcblxuLyoqXG4gKiBQcm9jZXNzIHRyYW5zaXRpb25cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gcHJvY2VzcyBpZFxuICogQHBhcmFtIHtudW1iZXJ9IHByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2UgcHJvY2VzcyBzZXFcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdWJQcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdWItcHJvY2VzcyBpZFxuICogQHBhcmFtIHtudW1iZXJ9IHN1YlByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2Ugc3ViLXByb2Nlc3Mgc2VxXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RlcElkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3RlcCBpZFxuICogQHBhcmFtIHtzdHJpbmd9IHRyYW5zaXRpb25JZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHRyYW5zaXRpb24gaWRcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIC0gYW55IGFkZGl0aW9uYWwgZGF0YSBwYXNzZWQgaW4gYXMga2V5IHZhbHVlIHBhaXJzXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuZnVuY3Rpb24gdHJhbnNpdGlvbihwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3RlcElkLCB0cmFuc2l0aW9uSWQsIGRhdGEsIF9XRkluc3RhbmNlLCBzcHV1aWQsIG1vZGVsKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciBzdGVwU2VxID0gMDtcbiAgICAgICAgICAgIHZhciBuZXh0U3RlcElkID0gJyc7XG4gICAgICAgICAgICB2YXIgbmV4dFN0ZXBTZXEgPSAwO1xuICAgICAgICAgICAgdmFyIHN1YlByb2Nlc3MgPSBbXTtcbiAgICAgICAgICAgIHZhciBjdXJyZW50UHJvY2VzcyA9IF9XRkluc3RhbmNlLmNvbmZpZy5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChvYmpQcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9ialByb2Nlc3MuX2lkID09IHByb2Nlc3NJZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqUHJvY2VzcztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRTdWJQcm9jZXNzID0gY3VycmVudFByb2Nlc3NbMF0uc3ViUHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbiAob2JqU3ViUHJvY2Vzcykge1xuICAgICAgICAgICAgICAgIGlmIChvYmpTdWJQcm9jZXNzLl9pZCA9PSBzdWJQcm9jZXNzSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9ialN1YlByb2Nlc3M7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBjdXJyZW50U3RlcCA9IGN1cnJlbnRTdWJQcm9jZXNzWzBdLnN0ZXBzLmZpbHRlcihmdW5jdGlvbiAob2JqU3RlcCkge1xuICAgICAgICAgICAgICAgIGlmIChvYmpTdGVwLl9pZCA9PSBzdGVwSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9ialN0ZXA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciB0cmFuc2l0aW9uID0gY3VycmVudFN0ZXBbMF0udHJhbnNpdGlvbi5maWx0ZXIoZnVuY3Rpb24gKG9ialRyYW5zaXRpb24pIHtcbiAgICAgICAgICAgICAgICBpZiAob2JqVHJhbnNpdGlvbi5faWQgPT0gdHJhbnNpdGlvbklkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmpUcmFuc2l0aW9uO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGN1cnJlbnRTdWJQcm9jZXNzWzBdLnN0ZXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRTdWJQcm9jZXNzWzBdLnN0ZXBzW2ldLl9pZCA9PSBzdGVwSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RlcFNlcSA9IHBhcnNlSW50KGN1cnJlbnRTdWJQcm9jZXNzWzBdLnN0ZXBzW2ldLl9zZXEpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjdXJyZW50U3ViUHJvY2Vzc1swXS5zdGVwcy5maWx0ZXIoZnVuY3Rpb24gKHN0ZXBJdGVtKSB7XG4gICAgICAgICAgICAgICAgbmV4dFN0ZXBTZXEgPSBzdGVwU2VxICsgMTtcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQoc3RlcEl0ZW0uX3NlcSkgPT0gbmV4dFN0ZXBTZXEpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dFN0ZXBJZCA9IHN0ZXBJdGVtLl9pZDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbnN0YW5jZS5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChvYmpQcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9ialByb2Nlc3MuaWQgPT0gcHJvY2Vzc0lkICYmIG9ialByb2Nlc3Muc2VxID09IHByb2Nlc3NTZXEpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqUHJvY2Vzcy5zdWJQcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChvYmpTdWJQcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqU3ViUHJvY2Vzcy5pZCA9PSBzdWJQcm9jZXNzSWQgJiYgb2JqU3ViUHJvY2Vzcy5zZXEgPT0gc3ViUHJvY2Vzc1NlcSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1dWlkID0gb2JqU3ViUHJvY2Vzcy51dWlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwdXVpZCA9IHV1aWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbiAoc3ViUHJvY2Vzc0l0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1YlByb2Nlc3NJdGVtLl9pZCA9PSB1dWlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzID0gc3ViUHJvY2Vzc0l0ZW07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIG1heFN0ZXBzID0gY3VycmVudFN1YlByb2Nlc3NbMF0uc3RlcHMubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFyIHNwaW5zdGFuY2VPYmplY3QgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiKyBzcHV1aWQgK1wiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICB2YXIgc3BJbnN0YW5jZVN0ZXBPYmplY3QgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiKyBzcHV1aWQgK1wiJ10vc3RlcFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuXG4gICAgICAgICAgICAgICAgLy8gQWRkaW5nIHN0ZXAgT2JqZWN0IGluIHN1YnByb2Nlc3MgaGlzdG9yeSBGcm9tIHNlY29uZCBzdGVwLiBBcyBmaXJzdCBzdGVwIGlzIGFkZGVkIGF0IHN1YlByb2Nlc3MoKSBmdW5jdGlvbiBcbiAgICAgICAgICAgICAgICBpZiAoc3BpbnN0YW5jZU9iamVjdC5oaXN0b3J5ID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBzcGluc3RhbmNlT2JqZWN0Lmhpc3RvcnkgPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYobW9kZWwgIT0gdW5kZWZpbmVkICYmIE9iamVjdC5rZXlzKG1vZGVsKS5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgc3BpbnN0YW5jZU9iamVjdC5oaXN0b3J5LnB1c2gobW9kZWwpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNwaW5zdGFuY2VPYmplY3QuaGlzdG9yeS5wdXNoKHNwSW5zdGFuY2VTdGVwT2JqZWN0KTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8vc3BpbnN0YW5jZU9iamVjdC5oaXN0b3J5LnB1c2gobW9kZWwpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICh0cmFuc2l0aW9uWzBdLnRyYW5zaXRpb25BY3Rpb24uZ29Ub1N0ZXAgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIG5leHRTZXEgPSBwYXJzZUludChjdXJyZW50U3RlcFswXS5fc2VxKSArIHBhcnNlSW50KHRyYW5zaXRpb25bMF0udHJhbnNpdGlvbkFjdGlvbi5nb1RvU3RlcC5kZWZhdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5leHRJZCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3ViUHJvY2Vzc1swXS5zdGVwcy5maWx0ZXIoZnVuY3Rpb24gKHN0ZXBJdGVtKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChzdGVwSXRlbS5fc2VxKSA9PSBuZXh0U3RlcFNlcSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRJZCA9IHN0ZXBJdGVtLl9pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBzdGVwKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBuZXh0SWQsIG5leHRTZXEsIGRhdGEsIF9XRkluc3RhbmNlLCBzcHV1aWQpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRTZXEgPT0gbWF4U3RlcHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnQWxsIFN0ZXAgdHJhbnNpdGlvbnMgaGF2ZSBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc0NvbXBsZXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwOiByZXN1bHQuZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1N0ZXAgdHJhbnNpdGlvbiBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc0NvbXBsZXRlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcDogcmVzdWx0LmRhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0cmFuc2l0aW9uWzBdLnRyYW5zaXRpb25BY3Rpb24uZ29Ub1N0ZXBJZCAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgZ29Ub1N0ZXBJZCA9IHRyYW5zaXRpb25bMF0udHJhbnNpdGlvbkFjdGlvbi5nb1RvU3RlcElkLnN0ZXBJZDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGdvVG9TdGVwU2VxID0gMTtcblxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3ViUHJvY2Vzc1swXS5zdGVwcy5maWx0ZXIoZnVuY3Rpb24gKHN0ZXBJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RlcEl0ZW0uX2lkID09IGdvVG9TdGVwSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnb1RvU3RlcFNlcSA9IHBhcnNlSW50KHN0ZXBJdGVtLl9zZXEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHN0ZXAocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIGdvVG9TdGVwSWQsIGdvVG9TdGVwU2VxLCBkYXRhLCBfV0ZJbnN0YW5jZSwgc3B1dWlkKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnb1RvU3RlcFNlcSA9PSBtYXhTdGVwcykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0FsbCBTdGVwIHRyYW5zaXRpb25zIGhhdmUgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NDb21wbGV0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcDogcmVzdWx0LmRhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1N0ZXAgdHJhbnNpdGlvbiBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc0NvbXBsZXRlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcDogcmVzdWx0LmRhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHJhbnNpdGlvblswXS50cmFuc2l0aW9uQWN0aW9uLnN0b3AgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQXMgdGhpcyBpcyB0aGUgbGFzdCBzdGVwICh3aGVyZSBzdG9wIGlzIGRlZmllZCkgLCBzdWJQcm9jZXNzIHBvc3RBY3Rpb25zIHNob3VsZCBjb21lIGhlcmUuXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvc3RBY3Rpb25zQ29uZiA9IGN1cnJlbnRQcm9jZXNzWzBdLnBvc3RBY3Rpb25zO1xuICAgICAgICAgICAgICAgICAgICBwb3N0QWN0aW9ucyhwb3N0QWN0aW9uc0NvbmYsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1N0ZXAgdHJhbnNpdGlvbiBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LldvcmtmbG93IHN0b3BwZWQuJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NDb21wbGV0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwOiBtb2RlbFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG5cbiAgICB9KTtcbn07XG5cbi8qKlxuICogUHJvY2VzcyBwb3N0QWN0aW9uc1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBwb3N0QWN0aW9ucyAtIHRoZSBwb3N0QWN0aW9ucyBjb25maWcgZGF0YVxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuZnVuY3Rpb24gcG9zdEFjdGlvbnMocG9zdEFjdGlvbnMsIF9XRkluc3RhbmNlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIGNvbXBsZXRlZCA9IFtdO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdXRpbC5zeW5jTG9vcChwb3N0QWN0aW9ucy5sZW5ndGgsIGZ1bmN0aW9uIChsb29wKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvdW50ZXIgPSBsb29wLml0ZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgIGFjdGlvbihwb3N0QWN0aW9uc1tjb3VudGVyXSxcIlwiLFwiXCIsXCJcIixcIlwiLHt9LCB7fSxfV0ZJbnN0YW5jZSwge30sIGFwcC5TQ09QRS5wcm9jZXNzVVVJRCkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBhbGwgcHJlLXJlcXVpc2l0ZXMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS5cbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVkLnB1c2godHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGxvb3AubmV4dCgpO1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVkLnB1c2goZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBsb29wLmJyZWFrKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZWQuZXZlcnkoQm9vbGVhbikpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1Bvc3QtYWN0aW9ucyBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHt9KTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRlByZUFjdGlvbnNFcnJvcicsICdOb3QgYWxsIHBvc3QtYWN0aW9ucyBwYXNzZWQuJyk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG59O1xuXG4vKlxuZnVuY3Rpb24gc2VuZE5vdGlmaWNhdGlvbnModXNlcnNMaXN0LCBzcHV1aWQpe1xuXG4gIC8vIGdldCB1c2VycyBsaXN0IFxuICAvLyBzZW4gbm90aWZpY2F0aW9ucyB0byB1c2VycyB5IGFkZGluZyBjaGFubmVscyB0byB0aGVtXG5cbiAgdmFyIGNoYW5uZWxBcnJheSA9IFtdO1xuXG4gIGZvcihpPTA7aTx1c2Vyc0xpc3QubGVuZ3RoOyBpKyspe1xuICAgIGNoYW5uZWxBcnJheS5wdXNoKFwidXNlcl9cIit1c2Vyc0xpc3RbaV0uaWQpO1xuICB9XG5cbiAgYXNzaWduVG9Vc2Vycyhwcm9jZXNzV29ya2Zsb3dNZXNzYWdlKE5PVElGSUNBVElPTl9VU0VSX01TR19BQ0NFUFQsIHNwdXVpZCksIGNoYW5uZWxBcnJheSk7XG5cbn07Ki9cblxuLypmdW5jdGlvbiBhc3NpZ25Ub1VzZXJzKG1lc3NhZ2UsIGNoYW5uZWxBcnJheSl7XG5cbiAgICAgdmFyIGNoYW5uZWxzID0gY2hhbm5lbEFycmF5O1xuXG4gICAgIHZhciBub3RpZmljYXRpb24gPSAgeyBcbiAgICAgICAgICBcIl9pZFwiOiBnZW5lcmF0ZVVVSUQoKSxcbiAgICAgICAgICBcImNoYW5uZWxzXCI6Y2hhbm5lbHMsXG4gICAgICAgICAgXCJtZXNzYWdlXCI6IG1lc3NhZ2UsXG4gICAgICAgICAgXCJtZXNzYWdlVHlwZVwiOiBcImluZm9cIixcbiAgICAgICAgICBcImNyZWF0ZWREYXRlVGltZVwiOiBtb21lbnQoKS5mb3JtYXQoKSxcbiAgICAgICAgICBcInJlYWRcIjogZmFsc2UsXG4gICAgICAgICAgXCJyZWFkRGF0ZVRpbWVcIjogXCJcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJub3RpZmljYXRpb25cIixcbiAgICAgICAgICBcInNlbmRlclVzZXJJZFwiOiBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZFxuICAgICAgIH07XG5cbiAgICAgICBjb25zb2xlLmxvZyhub3RpZmljYXRpb24pO1xuICAgICAgIGRhby51cHNlcnQobm90aWZpY2F0aW9uKTtcblxuICB9OyovXG5cbmZ1bmN0aW9uIHByb2Nlc3NXb3JrZmxvd01lc3NhZ2UobWVzc2FnZSwgc3B1dWlkKSB7XG5cbiAgICB2YXIgcmVwbGFjZWRNc2cgPSBtZXNzYWdlO1xuXG4gICAgaWYgKHJlcGxhY2VkTXNnLmluZGV4T2YoJyNJTlNUQU5DRV9MQUJFTCcpICE9PSAtMSkge1xuICAgICAgICB2YXIgdmFsID0gSlNPTi54cGF0aChcIi9pbnN0YW5jZS9wcm9jZXNzZXMvc3ViUHJvY2Vzc2VzW3V1aWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXS9sYWJlbFwiLCBhcHAuU0NPUEUud29ya2Zsb3csIHt9KVswXTtcbiAgICAgICAgcmVwbGFjZWRNc2cgPSByZXBsYWNlZE1zZy5yZXBsYWNlKCcjSU5TVEFOQ0VfTEFCRUwnLCB2YWwpO1xuXG4gICAgfVxuXG4gICAgaWYgKHJlcGxhY2VkTXNnLmluZGV4T2YoJyNVU0VSX05BTUUnKSAhPT0gLTEpIHtcbiAgICAgICAgdmFyIHZhbCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL3N0ZXAvYXNzaWduZWRUby9uYW1lXCIsIGFwcC5TQ09QRS53b3JrZmxvdywge30pWzBdO1xuICAgICAgICByZXBsYWNlZE1zZyA9IHJlcGxhY2VkTXNnLnJlcGxhY2UoJyNVU0VSX05BTUUnLCB2YWwpO1xuXG4gICAgfVxuXG4gICAgaWYgKHJlcGxhY2VkTXNnLmluZGV4T2YoJyNQUk9GSUxFX1RJVExFJykgIT09IC0xKSB7XG4gICAgICAgIHZhciB2YWwgPSBhcHAucHJvZmlsZS50aXRsZTtcbiAgICAgICAgcmVwbGFjZWRNc2cgPSByZXBsYWNlZE1zZy5yZXBsYWNlKCcjUFJPRklMRV9USVRMRScsIHZhbCk7XG5cbiAgICB9XG5cbiAgICBpZiAocmVwbGFjZWRNc2cuaW5kZXhPZignI1BST0ZJTEVfVFlQRScpICE9PSAtMSkge1xuICAgICAgICB2YXIgdmFsID0gYXBwLlNDT1BFLkFQUF9DT05GSUcubmFtZTtcbiAgICAgICAgcmVwbGFjZWRNc2cgPSByZXBsYWNlZE1zZy5yZXBsYWNlKCcjUFJPRklMRV9UWVBFJywgdmFsKTtcblxuICAgIH1cblxuICAgIGlmIChyZXBsYWNlZE1zZy5pbmRleE9mKCcjVkFSX1NQVVVJRCcpICE9PSAtMSkge1xuICAgICAgICB2YXIgdmFsID0gc3B1dWlkO1xuICAgICAgICByZXBsYWNlZE1zZyA9IHJlcGxhY2VkTXNnLnJlcGxhY2UoJyNWQVJfU1BVVUlEJywgdmFsKTtcblxuICAgIH1cblxuICAgIHJldHVybiByZXBsYWNlZE1zZztcbn07XG5cbmZ1bmN0aW9uIF9nZXROYW1lKGFyciwgbGFuZykge1xuICAgIGlmIChhcnIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGFycltpXS5fbGFuZyA9PT0gbGFuZykge1xuICAgICAgICAgICAgICAgIHJldHVybiBhcnJbaV0udmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG59O1xuXG5mdW5jdGlvbiBfZ2V0TmFtZUJ5TGFuZyhvYmopIHtcbiAgICB2YXIgbGFuZyA9IHNlcnZpY2UuZ2V0TGFuZ3VhZ2UoKTtcbiAgICB2YXIgZXhwciA9ICdvYmouJyArIGxhbmc7XG4gICAgcmV0dXJuIGV2YWwoZXhwcik7XG59O1xuXG5cblxuXG5cbi8qKlxuICogUHJvY2VzcyBwcmVXb3JrQWN0aW9uc1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBwcmVXb3JrQWN0aW9ucyAtIHRoZSBwcmVXb3JrQWN0aW9ucyBjb25maWcgZGF0YVxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuXG5mdW5jdGlvbiBwcmVXb3JrQWN0aW9ucyhwcmVXb3JrQWN0aW9ucywgX1dGSW5zdGFuY2UpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgY29tcGxldGVkID0gW107XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB1dGlsLnN5bmNMb29wKHByZVdvcmtBY3Rpb25zLmxlbmd0aCwgZnVuY3Rpb24gKGxvb3ApIHtcbiAgICAgICAgICAgICAgICB2YXIgY291bnRlciA9IGxvb3AuaXRlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgYWN0aW9uKHByZVdvcmtBY3Rpb25zW2NvdW50ZXJdLFwiXCIsXCJcIixcIlwiLFwiXCIse30sIHt9LF9XRkluc3RhbmNlLCB7fSwgYXBwLlNDT1BFLnByb2Nlc3NVVUlEKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGFsbCBwcmUtcmVxdWlzaXRlcyBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LlxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQucHVzaCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgbG9vcC5uZXh0KCk7XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQucHVzaChmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGxvb3AuYnJlYWsoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbXBsZXRlZC5ldmVyeShCb29sZWFuKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnUHJlV29yay1hY3Rpb25zIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywge30pO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGUHJlQWN0aW9uc0Vycm9yJywgJ05vdCBhbGwgcHJlLXdvcmstYWN0aW9ucyBwYXNzZWQuJyk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gICAgcHJlUmVxdWlzaXRlczogcHJlUmVxdWlzaXRlcyxcbiAgICBwcmVBY3Rpb25zOiBwcmVBY3Rpb25zLFxuICAgIHBvc3RBY3Rpb25zOiBwb3N0QWN0aW9ucyxcbiAgICBwcmVXb3JrQWN0aW9uczogcHJlV29ya0FjdGlvbnMsXG4gICAgc3ViUHJvY2Vzczogc3ViUHJvY2VzcyxcbiAgICBpbmRpY2F0b3JEb2NzOiBpbmRpY2F0b3JEb2NzLFxuICAgIHRhc2s6IHRhc2ssXG4gICAgdHJhbnNpdGlvbjogdHJhbnNpdGlvbixcbiAgICBhc3NpZ25Vc2VyOiBhc3NpZ25Vc2VyXG5cbn0iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXRpbGl0eSBNb2R1bGVcbiAqXG4gKiBAbW9kdWxlIGxpYi91dGlsXG4gKlxuICogQGF1dGhvciBCcmVudCBHb3Jkb25cbiAqIEB2ZXJzaW9uIDAuMS4wXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBXb3JrZmxvdyB1dGlsaXR5IG1vZHVsZSB1c2VkIHRvIGZvcm1hdCB0aGUgcmV0dXJuIGFuZCBlcnJvciBvYmplY3RzLCBhbmRcbiAqIGNvbnRhaW5zIHNvbWUgb3RoZXIgdXRpbGl0eSBmdW5jdGlvbnMgc3VjaCBhcyBhIHN5bmMgbG9vcCBhbmQgY29tcGFyZS5cbiAqXG4gKi9cblxuLyoqXG4gKiBTdWNjZXNzIGJsb2NrIHJldHVybiBvYmplY3QsIGNvbnRhaW5zIGEgbWVzc2FnZSBhbmQgb3B0aW9uYWwgZGF0YSBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSB0aGUgc3VjY2VzcyBtZXNzYWdlXG4gKiBAcGFyYW0ge3N0cmluZ3xPYmplY3R9IFtkYXRhXSAtIHRoZSBzdWNjZXNzIHJldHVybmVkIGRhdGFcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gUmV0dXJuIHN1Y2Nlc3Mgd2l0aG91dCBhIGRhdGEgYmxvY2tcbiAqIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdTdWNjZXNzIG1lc3NhZ2UgZ29lcyBoZXJlLi4uJyk7XG4gKlxuICogQHJldHVybiB7T2JqZWN0fSAtIHdpdGggbWVzc2FnZSBhbmQgZGF0YSBwcm9wZXJ0aWVzXG4gKlxuICovXG5mdW5jdGlvbiBzdWNjZXNzKG1lc3NhZ2UsIGRhdGEpe1xuXHRyZXR1cm4ge1xuXHRcdG1lc3NhZ2U6IG1lc3NhZ2UsXG5cdFx0ZGF0YTogZGF0YVxuXHR9O1xufTtcblxuLyoqXG4gKiBXYXJuaW5nIGJsb2NrIHJldHVybiBvYmplY3QsIGNvbnRhaW5zIGEgbWVzc2FnZSBhbmQgb3B0aW9uYWwgZGF0YSBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSB0aGUgd2FybmluZyBtZXNzYWdlXG4gKiBAcGFyYW0ge3N0cmluZ3xPYmplY3R9IFtkYXRhXSAtIHRoZSByZXR1cm5lZCBkYXRhXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFJldHVybiBzdWNjZXNzIHdpdGhvdXQgYSBkYXRhIGJsb2NrXG4gKiB2YXIgc3VjY2VzcyA9IHV0aWwud2FybignV2FybmluZyBtZXNzYWdlIGdvZXMgaGVyZS4uLicpO1xuICpcbiAqIEByZXR1cm4ge09iamVjdH0gd2l0aCBtZXNzYWdlIGFuZCBkYXRhIHByb3BlcnRpZXMsIGFuZCBsb2dzIHRoZSB3YXJuaW5nIHRvIHRoZSBjb25zb2xlLlxuICpcbiAqL1xuZnVuY3Rpb24gd2FybihtZXNzYWdlLCBkYXRhKXtcblx0Y29uc29sZS53YXJuKGRhdGEpO1xuXHRyZXR1cm4ge1xuXHRcdHdhcm5pbmc6IG1lc3NhZ2UsXG5cdFx0ZGF0YTogZGF0YVxuXHR9O1xufTtcblxuLyoqXG4gKiBFcnJvciBibG9jayBKUyBlcnJvciBvYmplY3QsIGNvbnRhaW5zIGEgY29kZSBhbmQgbWVzc2FnZSBmb3IgdGhlIGVycm9yLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb2RlIC0gdGhlIGVycm9yIGNvZGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gdGhlIGVycm9yIG1lc3NhZ2VcbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIHN1Y2Nlc3MgPSB1dGlsLmVycm9yKCdFcnJvcjAwMScsJ0Vycm9yIG1lc3NhZ2UgZ29lcyBoZXJlLi4uJyk7XG4gKlxuICogQHJldHVybiB7T2JqZWN0fSB3aXRoIGEgY29kZSBhbmQgbWVzc2FnZSBwcm9wZXJ0aWVzLlxuICpcbiAqL1xuZnVuY3Rpb24gZXJyb3IoY29kZSwgbWVzc2FnZSl7XG5cdHZhciBlcnIgPSBuZXcgRXJyb3IoJycpO1xuXHRlcnIubmFtZSA9IGNvZGU7XG5cdGVyci5tZXNzYWdlID0gbWVzc2FnZTtcblx0cmV0dXJuIGVycjtcbn07XG5cbi8qKlxuICogQSBsb29wIHdoaWNoIGNhbiBsb29wIFggYW1vdW50IG9mIHRpbWVzLCB3aGljaCBjYXJyaWVzIG91dFxuICogYXN5bmNocm9ub3VzIGNvZGUsIGJ1dCB3YWl0cyBmb3IgdGhhdCBjb2RlIHRvIGNvbXBsZXRlIGJlZm9yZSBsb29waW5nLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBpdGVyYXRpb25zIC0gdGhlIG51bWJlciBvZiBpdGVyYXRpb25zIHRvIGNhcnJ5IG91dFxuICogQHBhcmFtIHtmdW5jdGlvbn0gcHJvY2VzcyAtIHRoZSBjb2RlL2Z1bmN0aW9uIHdlJ3JlIHJ1bm5pbmcgZm9yIGV2ZXJ5XG4gKiBpdGVyYXRpb25cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGV4aXQgLSBhbiBvcHRpb25hbCBjYWxsYmFjayB0byBjYXJyeSBvdXQgb25jZSB0aGUgbG9vcFxuICogaGFzIGNvbXBsZXRlZFxuICpcbiAqIEBleGFtcGxlXG4gKiB1dGlsLnN5bmNMb29wKDUsIGZ1bmN0aW9uKGxvb3Ape1xuICogXHR2YXIgY291bnRlciA9IGxvb3AuaXRlcmF0aW9uKCk7XG4gKiBcdC8vIEFkZCBhc3luYyBjYWxscyBoZXJlLi5cbiAqXG4gKiB9LCBmdW5jdGlvbigpe1xuICogXHQvLyBPbiBjb21wbGV0ZSBwZXJmb3JtIGFjdGlvbnMgaGVyZS4uLlxuICpcbiAqIH0pO1xuICpcbiAqIEByZXR1cm4ge09iamVjdH0gdGhlIGxvb3AgY29udHJvbCBvYmplY3QuXG4gKlxuICovXG5mdW5jdGlvbiBzeW5jTG9vcChpdGVyYXRpb25zLCBwcm9jZXNzLCBleGl0KXtcbiAgICB2YXIgaW5kZXggPSAwLFxuICAgICAgICBkb25lID0gZmFsc2UsXG4gICAgICAgIHNob3VsZEV4aXQgPSBmYWxzZTtcbiAgICB2YXIgbG9vcCA9IHtcbiAgICAgICAgbmV4dDpmdW5jdGlvbigpe1xuICAgICAgICAgICAgaWYoZG9uZSl7XG4gICAgICAgICAgICAgICAgaWYoc2hvdWxkRXhpdCAmJiBleGl0KXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV4aXQoKTsgLy8gRXhpdCBpZiB3ZSdyZSBkb25lXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSWYgd2UncmUgbm90IGZpbmlzaGVkXG4gICAgICAgICAgICBpZihpbmRleCA8IGl0ZXJhdGlvbnMpe1xuICAgICAgICAgICAgICAgIGluZGV4Kys7IC8vIEluY3JlbWVudCBvdXIgaW5kZXhcbiAgICAgICAgICAgICAgICBwcm9jZXNzKGxvb3ApOyAvLyBSdW4gb3VyIHByb2Nlc3MsIHBhc3MgaW4gdGhlIGxvb3BcbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSB3ZSdyZSBkb25lXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlOyAvLyBNYWtlIHN1cmUgd2Ugc2F5IHdlJ3JlIGRvbmVcbiAgICAgICAgICAgICAgICBpZihleGl0KSBleGl0KCk7IC8vIENhbGwgdGhlIGNhbGxiYWNrIG9uIGV4aXRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaXRlcmF0aW9uOmZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gaW5kZXggLSAxOyAvLyBSZXR1cm4gdGhlIGxvb3AgbnVtYmVyIHdlJ3JlIG9uXG4gICAgICAgIH0sXG4gICAgICAgIGJyZWFrOmZ1bmN0aW9uKGVuZCl7XG4gICAgICAgICAgICBkb25lID0gdHJ1ZTsgLy8gRW5kIHRoZSBsb29wXG4gICAgICAgICAgICBzaG91bGRFeGl0ID0gZW5kOyAvLyBQYXNzaW5nIGVuZCBhcyB0cnVlIG1lYW5zIHdlIHN0aWxsIGNhbGwgdGhlIGV4aXQgY2FsbGJhY2tcbiAgICAgICAgfVxuICAgIH07XG4gICAgbG9vcC5uZXh0KCk7XG4gICAgcmV0dXJuIGxvb3A7XG59O1xuXG5mdW5jdGlvbiBjb21wYXJlKHN1YmplY3QsIG9wZXJhdG9yLCB2YWx1ZSkge1xuICBcdHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgXHRcdGNhc2UgJ2dyZWF0ZXJUaGFuJzpcblx0XHRcdHJldHVybiBzdWJqZWN0ID4gdmFsdWU7XG5cdFx0Y2FzZSAnbGVzc1RoYW4nOlxuXHRcdFx0cmV0dXJuIHN1YmplY3QgPCB2YWx1ZTtcblx0XHRjYXNlICdncmVhdGVyVGhhbkVxdWFsJzpcblx0XHRcdHJldHVybiBzdWJqZWN0ID49IHZhbHVlO1xuXHRcdGNhc2UgJ2xlc3NUaGFuRXF1YWwnOlxuXHRcdFx0cmV0dXJuIHN1YmplY3QgPD0gdmFsdWU7XG5cdFx0Y2FzZSAnZXF1YWxUbyc6XG5cdFx0XHRyZXR1cm4gc3ViamVjdCA9PT0gdmFsdWU7XG5cdFx0Y2FzZSAnbm90RXF1YWxUbyc6XG5cdFx0XHRyZXR1cm4gc3ViamVjdCAhPT0gdmFsdWU7XG4gIFx0fVxufTtcblxuZnVuY3Rpb24gZ2V0TmFtZShhcnIsIGxhbmcpe1xuXHRpZiAoYXJyICE9PSB1bmRlZmluZWQpIHtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGggOyBpKyspIHtcblx0XHRcdGlmIChhcnJbaV0uaTE4bi5fbGFuZyA9PT0gbGFuZykge1xuXHRcdFx0XHRyZXR1cm4gYXJyW2ldLmkxOG4udmFsdWU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gXHRzdWNjZXNzOiBzdWNjZXNzLFxuIFx0d2Fybjogd2FybixcbiBcdGVycm9yOiBlcnJvcixcbiBcdHN5bmNMb29wOiBzeW5jTG9vcCxcbiBcdGNvbXBhcmU6IGNvbXBhcmUsXG5cdGdldE5hbWU6IGdldE5hbWVcblxuIH1cbiJdfQ==
