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

                model._id = "_local/"+_this.profile + ':processes:local';
                //model._id = _this.profile + ':processes';
                
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

            Process.subProcess(processId, processSeq, subProcessId, subProcessSeq, subprofileId, data, _this).then(function (subProcess) {
                // Generate the uuid

                var uuid = subProcess.data._id; //_this.profile + ':' + _this.app + ':' + processId + ':' + processSeq + ':' + subProcessId + ':' + subProcessSeq;
               
                // Build the sub-process reference object
                
                var groupKey = subProcess.data.groupKey;
                //TODO: Change required to move isActive to subProcess file.Remove from here
                var subProcessRef = {
                    id: subProcessId,
                    subprofileId: subprofileId,
                    seq: subProcessSeq,
                    uuid: uuid,
                    groupKey: groupKey

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

                    dao.get(uuidSavedIndicator).then(function (data) {

                        for (var index = 0; index < _WFInstance.indicators.length; index++) {
                            var indicator = _WFInstance.indicators[index];
                            if (indicator._id == data._id) {
                                _WFInstance.indicators.splice(index, 1);
                                _WFInstance.indicators.push(data);
                                var success = util.success('Unlock period.', data);
                                resolve(success);


                            }

                        }

                    }).catch(function (err) {
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

                    
                    dao.get(uuidSavedIndicator).then(function (data) {

                        for (var index = 0; index < _WFInstance.indicators.length; index++) {
                            var indicator = _WFInstance.indicators[index];
                            if (indicator._id == data._id) {
                                _WFInstance.indicators.splice(index, 1);
                                _WFInstance.indicators.push(data);
                                var success = util.success('setModelStatus', data);
                                resolve(success);


                            }

                        }

                    }).catch(function (err) {
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

                    dao.get(uuidSavedIndicator).then(function (data) {

                        for (var index = 0; index < _WFInstance.indicators.length; index++) {
                            var indicator = _WFInstance.indicators[index];
                            if (indicator._id == data._id) {
                                _WFInstance.indicators.splice(index, 1);
                                _WFInstance.indicators.push(data);
                                var success = util.success('Lock performance model.', data);
                                resolve(success);


                            }

                        }

                    }).catch(function (err) {
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

        },
        
        enrollCourse: function (_def, uuid, _WFInstance) {

            return new Promise(function (resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;

                var enrollmentUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq 'NTIPcourseEnrollmentTDMP']/instances[1]/uuid", _WFInstance, {})[0];

                var action = {
                    "enrollCourse": {
                        "courseUUID": enrollmentUUID
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

                var spProcessObject = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", app.SCOPE.workflow, {})[0];
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
                            dao.get(profileVariableFileName).then(function (file) {

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

                                dao.upsert(file).then(function (data) {
                                    resolve("Variable set successfully");
                                }).catch(function (error) {
                                    reject("Failed to set Variable");
                                });

                            }).catch(function (error) {

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

                                dao.upsert(file).then(function (data) {
                                    resolve("Variable set successfully");
                                }).catch(function (error) {
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

                       
                        case 'subProfileSubProcessInstance':

                            var subProfileId = app.profile.subprofileId;
                            var subProfileVariableFileName = subProfileId + ':variables';
                            dao.get(subProfileVariableFileName).then(function (file) {

                                if (variableType == 'periodic') {

                                    var part = library.getSubprofileSubprocessIds();
                                    var seq = JSON.xpath("count(/subprocesses[_id eq '" + uuid + "']/preceding-sibling::node()[id = /subprocesses[_id eq '" + uuid + "']/id and _id = /subprocesses[_id = "+part+"]/_id])", _WFInstance, {})[0] + 1;                   


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

                                dao.upsert(file).then(function (data) {
                                    resolve("Variable at subprofile set successfully");
                                }).catch(function (error) {
                                    reject("Failed to set Variable at subprofile");
                                });

                            }).catch(function (error) {

                                var file = {
                                    "_id": subProfileVariableFileName
                                }
                                file.channels = app.profile.channels;

                                if (variableType == 'periodic') {
                                    //var processObj = JSON.xpath("/instance/processes[subProcesses/uuid eq '" + uuid + "']", _WFInstance, {})[0];
                                    //var seq = processObj.seq;

                                    //var seq = JSON.xpath("count(/subprocesses[_id eq '" + uuid + "']/preceding-sibling::node()[id = /subprocesses[_id eq '" + uuid + "']/id and id = /subprocesses[_id = /instance/processes/subProcesses[subprofileId eq '" + subProfileId + "']/uuid]/_id])", _WFInstance, {})[0] + 1;
                                    var part = library.getSubprofileSubprocessIds();
                                    var seq = JSON.xpath("count(/subprocesses[_id eq '" + uuid + "']/preceding-sibling::node()[id = /subprocesses[_id eq '" + uuid + "']/id and _id = /subprocesses[_id = "+part+"]/_id])", _WFInstance, {})[0] + 1;                   



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

                                dao.upsert(file).then(function (data) {
                                    resolve("Variable at subprofile set successfully");
                                }).catch(function (error) {
                                    reject("Failed to set Variable at subprofile");
                                });
                                

                            });

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

        sendNotificationWorker: function (notification, _WFInstance, uuid) {

            return new Promise(function (resolve, reject) {


                var getRecipients = function(notification) {

                    return new Promise(function (resolve, reject) {
                        var recipients = {};
                        if(notification.recipients.role != undefined){

                            recipients.role = notification.recipients.role;
                            resolve(recipients);

                        } else if(notification.recipients.profileRole != undefined) {

                            recipients.profileRole = {};
                            recipients.profileRole.role = notification.recipients.profileRole.role;
                            recipients.profileRole.profile = notification.recipients.profileRole.profile;
                            resolve(recipients);
                            
                        } else if(notification.recipients.subProfileRole != undefined) {

                            recipients.subProfileRole = {};
                            recipients.subProfileRole.role = notification.recipients.subProfileRole.role;
                            recipients.subProfileRole.subProfileCategory = notification.recipients.subProfileRole.subProfileCategory;
                            recipients.subProfileRole.profile = notification.recipients.subProfileRole.profile;
                            resolve(recipients);

                        } else if(notification.recipients.function != undefined){

                            recipients.function = {};
                            recipients.function.users = {};

                            helper.getNodeValue(notification.recipients.function.users, _WFInstance, uuid).then(function (dataValue) {

                                recipients.function.users =  dataValue;
                                resolve(recipients);

                            }, function (err) {
                                rej(err);
                            });
                            
                            
                                                 

                        }
                    });
                }

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.messageType = "notification";
                
                var subProfileId = JSON.xpath("/subprocesses[_id eq '"+ uuid +"']/meta-data/subprofileId", _WFInstance ,{})[0];

                var action = {
                    "notification": {
                        "message": {

                        },
                        "messageType":"",
                        "meta-data": {
                            "applicationId": _WFInstance.app,
                            "communityId": _WFInstance.communityId,
                            "profileId": _WFInstance.profile,
                            "subProcessUUID": uuid,
                            "subProfileId": subProfileId
                        },
                        "notificationType":"",
                        "priority":"",
                        "recipients": {

                        },
                        "keys":{
                            "profile":{
                                "name": "",
                                "id":""
                            },
                            "community":{
                                "name":"",
                                "id":""
                            },
                            "application":{
                                "name":"",
                                "id":""
                            },
                            "currentUser":{
                                "name":"",
                                "id":""
                            },
                            "subProcess":{
                                "name":"",
                                "id":""
                            }
                        }
                    }
                };

                /**
                * 
                Keys message 
                */

                action.notification.keys.profile.name = app.profile.title;
                action.notification.keys.profile.id = app.profile._id;

                action.notification.keys.community.name = app.getNameByLang(LOCAL_SETTINGS.COMMUNITY_CONFIG.communityName);
                action.notification.keys.community.id = LOCAL_SETTINGS.COMMUNITY_CONFIG.communityId;

                var application = JSON.xpath("/applications[appId eq '" + app.SCOPE.applicationId + "']", LOCAL_SETTINGS.COMMUNITY_CONFIG, {})[0];

                action.notification.keys.application.name = app.getNameByLang(application.name);
                action.notification.keys.application.id = application.appId;

                action.notification.keys.currentUser.name = LOCAL_SETTINGS.SESSION.firstName + " " + LOCAL_SETTINGS.SESSION.lastName;
                action.notification.keys.currentUser.id = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;


                action.notification.keys.subProcess.name = JSON.xpath("/subprocesses[_id eq '"+ uuid +"']/label", _WFInstance , {})[0];
                action.notification.keys.subProcess.id = uuid;

                /**
                * 
                Worker message 
                */
                action.notification.message.default = notification.message.default;
                action.notification.message.title = notification.message.title;

                if(notification.message.rtf != undefined){
                    action.notification.message.rtf = {};
                    if(notification.message.rtf.template!= undefined){
                        action.notification.message.rtf.template = notification.message.rtf.template;
                    } else if (notification.message.rtf.markup!= undefined){
                        action.notification.message.rtf.markup = notification.message.rtf.markup;
                    }
                }
                /**
                * 
                Worker messageType 
                */
                action.notification.messageType = notification.messageType;
                /**
                * 
                Worker notificationType 
                */
                action.notification.notificationType = notification.notificationType;
                /**
                * 
                Worker priority 
                */
                action.notification.priority = notification.priority;
                /**
                * 
                Worker notificationAction if exists 
                */

                if(notification.notificationAction != undefined){

                    action.notification.notificationAction = {};
                    action.notification.notificationAction.label = notification.notificationAction.label;
                    if(notification.notificationAction.action.URI != undefined){
                         
                         action.notification.notificationAction.action = {};
                         action.notification.notificationAction.action.URI = notification.notificationAction.action.URI;
                         
                    } else if(notification.notificationAction.action.goto != undefined) {
                         
                         action.notification.notificationAction.action = {};
                         action.notification.notificationAction.action.goto = notification.notificationAction.action.goto;

                    }
                }
               


                 /**
                * 
                Worker recipients
                */
                
                getRecipients(notification).then(function(recipient){
                    action.notification.recipients = recipient;
                    workerObject.action = action;
                    worker.send(workerObject).then(function (workerSuccess) {
                        console.log(workerObject);
                        var success = util.success('Notification Worker processes successfully.', workerSuccess);
                        resolve(success);

                    }, function (workerFail) {
                        resolve(workerFail);
                    });


                }).catch(function(err){

                    console.log("Notification - getRecipients failed with error "+ err);
                    reject(err);


                });
               
            });

        }


    }

})();


var report = (function () {

    return {




        createPerformanceReport: function (performanceReportObject, _WFInstance, uuid) {

            return new Promise(function (resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;

                var workplanSetId = performanceReportObject.workplanSetId;
                var configSetId = performanceReportObject.configSetId;


                // workplanSetId scope is profile
                // configSetId scope is subprocesses
                
                var workplanUUID = JSON.xpath("/indicators[category/term eq '"+ workplanSetId +"']/_id",app.SCOPE.workflow, {})[0];
                var configUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '"+ configSetId +"']/instances[1]/uuid", _WFInstance, {})[0];

                
                var action = {
                    "createPerformanceReport": {
                        "workplanUUID": workplanUUID,
                        "configUUID": configUUID,
                        "profilId": _WFInstance.profile   
                    }
                };

                workerObject.action = action;
                worker.send(workerObject).then(function (workerSuccess) {

                    var success = util.success('WorkplanReport Worker processed successfully.', workerSuccess);
                    resolve(success);

                }, function (workerFail) {
                    reject(workerFail);
                });
            });

        },

        createReport: function (createReport, _WFInstance, uuid) {

            return new Promise(function (resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;

                
                var performanceReportDefinition = JSON.xpath("/indicators[category/term eq 'PerformanceReportDefinition']/_id", _WFInstance, {})[0];
                var reportingSDO = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq 'reportingSDO']/instances[1]/uuid", _WFInstance, {})[0];

                
                var action = {
                    "createReport": {
                        "performanceReportDefinition": performanceReportDefinition,
                        "reportingSDO": reportingSDO,
                        "profilId": _WFInstance.profile   
                    }
                };

                workerObject.action = action;
                worker.send(workerObject).then(function (workerSuccess) {

                    var success = util.success('Reprot Worker processed successfully.', workerSuccess);
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
                dao.save(workerObject).then(function (workerResponse) {
                    resolve(workerResponse);
                }).catch(function (err) {
                    console.log('Error submitting worker response !!' + err);
                    reject(err);
                })

            });

        },

        sendWorker: function (workerConfig, _WFInstance, uuid) {

            return new Promise(function (resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;

                var processGetNodeValue = function(paramBlock, seq, paramName){
                    
                    return new Promise(function(res, rej){

                        helper.getNodeValue(paramBlock, _WFInstance, uuid).then(function (dataValue) {

                           res({
                            "seq":seq,
                            "paramName":paramName,
                            "dataValue":dataValue
                           });

                        }, function (err) {
                            rej(err);
                        });


                    });

                };
                var processParams = function(configParam) {

                    return new Promise(function(res, rej){
                        var parametersArray = [];
                        var itemsToProcess = configParam.length;
                        for(var i=0; i<configParam.length; i++){
                            var paramBlock = configParam[i].parameterValue;
                            var seq = configParam[i].seq;
                            var paramName = configParam[i].parameterName;
                            
                            var paramValue = processGetNodeValue(paramBlock, seq, paramName).then(function(response){

                                parametersArray.push({
                                    "seq": response.seq,
                                    "paramName": response.paramName, 
                                    "paramValue": response.dataValue
                                })

                                itemsToProcess--;
                                if (itemsToProcess == 0) {
                                    parametersArray.push({
                                        "seq": itemsToProcess+1,
                                        "paramName": "communityId", 
                                        "paramValue": _WFInstance.communityId
                                    });

                                    parametersArray.push({
                                        "seq": itemsToProcess+2,
                                        "paramName": "applicationId", 
                                        "paramValue": _WFInstance.app
                                    });

                                    parametersArray.push({
                                        "seq": itemsToProcess+3,
                                        "paramName": "profileId", 
                                        "paramValue": _WFInstance.profile
                                    });

                                    parametersArray.push({
                                        "seq": itemsToProcess+4,
                                        "paramName": "subProcessUUID", 
                                        "paramValue": uuid
                                    });

                                    res(parametersArray);
                                }
                            },function(err){
                                itemsToProcess--;
                                if (itemsToProcess == 0) {
                                    parametersArray.push({
                                        "seq": itemsToProcess+1,
                                        "paramName": "communityId", 
                                        "paramValue": _WFInstance.communityId
                                    });

                                    parametersArray.push({
                                        "seq": itemsToProcess+2,
                                        "paramName": "applicationId", 
                                        "paramValue": _WFInstance.app
                                    });

                                    parametersArray.push({
                                        "seq": itemsToProcess+3,
                                        "paramName": "profileId", 
                                        "paramValue": _WFInstance.profile
                                    });

                                    parametersArray.push({
                                        "seq": itemsToProcess+4,
                                        "paramName": "subProcessUUID", 
                                        "paramValue": uuid
                                    });
                                    
                                    res(parametersArray);
                                }
                            })

                            
                        }
                    });
                };

                

                //Create subprocess message file

                var spMessages = uuid + ":Messages"
                dao.get(spMessages).then(function(spMessageObject){
                    
                    console.log("Subprocess message object found.");
                    
                        var pendingSubmissionObject = {
                        "message":{
                            "i18n":{
                                "_id":"",
                                "en": "Server request is pending"
                            }
                        },
                        "type":"info"
                        };
                        spMessageObject.messages = [];
                        spMessageObject.messages.push(pendingSubmissionObject);
                        dao.save(spMessageObject).then(function (spMessageObjectSuccess) {

                        console.log(spMessageObjectSuccess);

                        }).catch(function (spMessageObjectSuccessFail) {
                        console.log(spMessageObjectSuccessFail);

                        });

                }).catch(function(error){

                        var spMessageObject = {
                            "type": "subProcessMessage",
                            "_id": spMessages,
                            "channels": [
                                "community_" + app.SCOPE.getCommunityId(),
                                "profile_" + app.SCOPE.profileId,
                                "application_" + app.SCOPE.applicationId,
                                "community_" + app.SCOPE.getCommunityId() + "_application_" + app.SCOPE.applicationId
                            ],
                            "communityId": app.SCOPE.getCommunityId(),
                            "applicationId": app.SCOPE.applicationId,
                            "createdDateTime": new Date().toString(),
                            "senderUserId": LOCAL_SETTINGS.SUBSCRIPTIONS.userId,
                            "messages": []
                        };
                        var pendingSubmissionObject = {
                        "message":{
                            "i18n":{
                                "_id":"",
                                "en": "Server request is pending"
                            }
                        },
                        "type":"info"
                        };
                        spMessageObject.messages.push(pendingSubmissionObject);

                        dao.save(spMessageObject).then(function (spMessageObjectSuccess) {

                        console.log(spMessageObjectSuccess);

                        }).catch(function (spMessageObjectSuccessFail) {
                        console.log(spMessageObjectSuccessFail);

                        });
                
                });
                var type = null;
                if(workerConfig.rest != undefined){
               
                    var configParam = workerConfig.rest.parameters;
                    processParams(configParam).then(function(paramsArray){
                        var action={
                            "sendWorker":{
                                "rest":{

                                }
                            }
                        };
                        action.sendWorker.rest.uri = workerConfig.rest.uri;
                        action.sendWorker.rest.profilId = _WFInstance.profile;
                        action.sendWorker.rest.parameters = paramsArray;

                        workerObject.action = action;
                        worker.send(workerObject).then(function (workerSuccess) {
                            var success = util.success('Worker Rest processed successfully.', workerSuccess);
                            resolve(success);

                        }, function (workerFail) {
                            reject(workerFail);
                        });

                    },function(err){
                        console.log("parameter creation failed. Abording worker object");
                    });

               } else if(workerConfig.functional != undefined) {

                   var configParam = workerConfig.functional.parameters;
                   processParams(configParam).then(function(paramsArray){
                        var action={
                            "sendWorker":{
                                "functional":{

                                }
                            }
                        };
                        action.sendWorker.functional.methodName = workerConfig.functional.methodName;
                        action.sendWorker.functional.profilId = _WFInstance.profile;
                        action.sendWorker.functional.parameters = paramsArray;

                        workerObject.action = action;
                        worker.send(workerObject).then(function (workerSuccess) {
                            var success = util.success('Worker Functional processed successfully.', workerSuccess);
                            resolve(success);

                        }, function (workerFail) {
                            reject(workerFail);
                        });

                    },function(err){
                        console.log("parameter creation failed. Abording worker object");
                    });
               }
                
            });

        },

        executeLocal: function (workerConfig, _WFInstance, uuid) {

            return new Promise(function (resolve, reject) {

              

                var processGetNodeValue = function(paramBlock, seq, dataType){
                    
                    return new Promise(function(res, rej){

                        helper.getNodeValue(paramBlock, _WFInstance, uuid).then(function (dataValue) {

                           res({
                            "seq": seq,
                            "dataType": dataType,
                            "dataValue": dataValue
                           });

                        }, function (err) {
                            rej(err);
                        });


                    });

                };

                var processParams = function(configParam) {

                    return new Promise(function(res, rej){
                        var parametersArray = [];
                        var itemsToProcess = configParam.length;
                        for(var i=0; i<configParam.length; i++){
                            var paramBlock = configParam[i].parameterValue;
                            var seq = configParam[i].seq;
                            var dataType = configParam[i].dataType.dataType;
                            var paramValue = processGetNodeValue(paramBlock, seq, dataType).then(function(response){

                                parametersArray.push({
                                    "seq": response.seq,
                                    "dataType": response.dataType, 
                                    "paramValue": response.dataValue
                                })

                                itemsToProcess--;
                                if (itemsToProcess == 0) {
                                    res(parametersArray);
                                }
                            },function(err){
                                itemsToProcess--;
                                if (itemsToProcess == 0) {
                                    res(parametersArray);
                                }
                            })

                            
                        }
                    });
                };

                var fixParamType = function(paramValue, dataType){

                    switch (dataType) {
                        case "string":
                        case "date":
                        case "dateTime":
                            return "'" + paramValue + "'";
                            break;
                        case "number":
                        case "decimal":
                            return  paramValue;
                            break;
                        default:
                            break;
                    }

                };

                var methodName = workerConfig.methodName;
                var configParam = workerConfig.parameters;
                processParams(configParam).then(function(paramsArray){
                   
                    var pList = '';
                    for(var i =0; i< paramsArray.length-1; i++){
                        pList = pList + fixParamType(paramsArray[i].paramValue,paramsArray[i].dataType) + ',';
                    }
                    pList = pList + fixParamType(paramsArray[i].paramValue, paramsArray[i].dataType)
                    
                    var callbackSuccess = function() { 
                        return resolve("Function '"+ methodName + "' executed. Response success.");
                    };
                    var callbackFailure = function() { 
                        return reject("Function '"+ methodName + "' executed. Response failed.");
                    };    
                    
                    var func = methodName+'('+ pList +',callbackSuccess, callbackFailure)';
                    eval(func);
                    

                },function(err){
                    console.log("parameter creation failed. Abording worker object");
                    reject(err);
                });

               
                
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
    notification: notification,
    report:report
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
                            dao.get(mainId).then(function(data) {

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
                                            dao.get(mainId).then(function(data) {
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

                                            }).catch(function(err) {
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

                            }).catch(function(err) {
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

                    if(baseUUID != uuid){
                        sp.active = false;
                    }
            
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


                        var path = "/indicators[category/term eq '" + indicatorId + "' and id = /subprocesses[id = '" + subProcessId + "']/indicators/instances/uuid]/_id";
                        var part = library.getSubprofileSubprocessIds();
                        if (subprocessType == PROCESS_TYPE_SUBPROFILE) {
                            path = "/indicators[category/term eq '" + indicatorId + "' and id = /subprocesses[id = '" + subProcessId + "' and id = "+part+"]/indicators/instances/uuid]/_id";
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
        dao.upsert(workerObject).then(function(data) {
            console.log("Worker Object submitted for profile(" + profileId + ") deletion.");
            console.log(data);
            resolve(data);
        }).catch(function(err) {
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

        library.createProfileDocuments(communityId, profileId).then(function(data) {

            var success = util.success('Form created successfully.', data);
            resolve(success);

        }).catch(function(err) {

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

                    dao.get(uuidSavedIndicator).then(function(data) {
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

                    }).catch(function(err) {
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
                .then(function(data) {
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

                }).catch(function(err) {
                    console.error(err);
                });

        }, function(error) {
            console.error(error);
        });

    });
};


function updateIndicatorWrapper(args) {

    var _WFInstance = args[0] || {};

    var uuid = args[1] || '';
    var path = args[2] || '';
    var dataValue = args[3] || '';
    var indicatorSetId = args[4] || '';

    return new Promise(function(resolve, reject) {

        var subProcessInstance = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];
        var indicatorInstances = subProcessInstance.indicators;
        
        var indicatorUUID = JSON.xpath("/*[id eq '" + indicatorSetId + "']/instances/uuid", indicatorInstances, {})[0];
        var indObject = JSON.xpath("/indicators[_id eq '" + indicatorUUID + "']", _WFInstance, {})[0];
        var expr = 'indObject.' + path + ' = "' + dataValue + '"';
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
                .then(function(data) {
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

                }).catch(function(err) {
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

        var indObject = JSON.xpath("/indicators[workflows/processes/subProcessUUID = '"+ uuid +"' and category/term = '"+ indicatorSetId +"']", _WFInstance ,{})[0];

        /*
        var indObject = '';
        var indUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '"+ indicatorSetId +"' ]/instances[1]/uuid", _WFInstance ,{})[0];
        
        if(indUUID != undefined){
             indObject = JSON.xpath("/indicators[_id eq '" + indUUID + "']", _WFInstance ,{})[0];
        } else {
             indObject = JSON.xpath("/indicators[category/term eq '" + indicatorSetId + "']", _WFInstance, {})[0];
        }*/
        
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
                .then(function(data) {
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

                }).catch(function(err) {
                    console.error(err);
                });

        }, function(error) {
            console.error(error);
        });

    });
};


function setStatus(args) {


    // Currently setting status to subprocess instance. it should update some field in appProfile or whatever indicator the profile has.
    var _WFInstance = args[0] || {};
    var uuid = args[1] || '';
    var status = args[2] || '';

    return new Promise(function(resolve, reject) {

        var subProcessInstance = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];
        subProcessInstance.step.message = status;

        resolve("Set profile status Success", subProcessInstance);

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
    markUpdateIndicator: markUpdateIndicator,
    updateIndicatorWrapper: updateIndicatorWrapper

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
                    
            var inputDataType = 'string';

            if(data.value.datatype.dataType != undefined){
                inputDataType = data.value.datatype.dataType;
            } else {
                inputDataType = data.value.datatype;
            } 

            
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

            // A change is required to make sure proper scope is identified.
            var indicatorUUID = null;
            
            var subprocess = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];
            if(subprocess.indicators.length == 0){

                indicatorUUID = JSON.xpath("/indicators[category/term eq '"+ data.indicatorUUID.indicatorSetId +"']/_id", _WFInstance , {})[0];
                
            } else {

                 indicatorUUID = JSON.xpath("/indicators[id eq '" + data.indicatorUUID.indicatorSetId + "']/instances/uuid", subprocess, {})[0];
                 if(indicatorUUID == undefined){
                    indicatorUUID = JSON.xpath("/indicators[category/term eq '"+ data.indicatorUUID.indicatorSetId +"']/_id",_WFInstance,{})[0];
                 }
            }



            resolve(indicatorUUID);

        } else if (data.indicator != undefined) {

            var indicatorUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + data.indicator.indicatorSetId + "']/instances/uuid", _WFInstance, {})[0];
            var indObject = JSON.xpath("/indicators[_id eq '" + indicatorUUID + "']", _WFInstance, {})[0];
            var xpath = '/model/pending/data/' + data.indicator.indicatorSetId + '/' + data.indicator.elementId;

            var seq = JSON.xpath("count(/subprocesses[_id eq '" + uuid + "']/preceding-sibling::node()[id = /subprocesses[_id eq '" + uuid + "']/id])", _WFInstance, {})[0] + 1;
            var subprocessType = JSON.xpath("/config/processes/subProcesses[_id eq /subprocesses[_id eq '" + uuid + "']/id]/type", _WFInstance, {})[0];
            var part = library.getSubprofileSubprocessIds();

            if (subprocessType == PROCESS_TYPE_SUBPROFILE) {
                seq = JSON.xpath("count(/subprocesses[_id eq '" + uuid + "']/preceding-sibling::node()[id = /subprocesses[_id eq '" + uuid + "']/id and _id = /subprocesses[_id = "+part+"]/_id])", _WFInstance, {})[0] + 1;
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

            /**
             * 
             * Taken out of schema
             * 
                        "subProcessInstance": {
                            "type": "string",
                            "description": "value of the variable subProcessInstance variable current subprocessInstance"
                        },
                        "step": {
                            "type": "string",
                            "description": "value of the variable in the current step"
                        },
                        "subProcessId": {
                            "type": "string",
                            "description": "value of the current applicaiton ID"
                        }
             * 
             * 
             * 
             */
            if (data.variable.profile != undefined) {

                var variableName = data.variable.profile;

                var profileId = _WFInstance.profile;
                var profileVariableFileName = profileId + ':variables';

                dao.get(profileVariableFileName).then(function(file) {

                    var obj = eval('file.' + variableName);

                    if (typeof obj == 'object') {

                        var seq = JSON.xpath("count(/subprocesses[_id eq '" + uuid + "']/preceding-sibling::node()[id = /subprocesses[_id eq '" + uuid + "']/id])", _WFInstance, {})[0] + 1;
                        var subprocessType = JSON.xpath("/config/processes/subProcesses[_id eq /subprocesses[_id eq '" + uuid + "']/id]/type", _WFInstance, {})[0];
                        var part = library.getSubprofileSubprocessIds();

                        if (subprocessType == PROCESS_TYPE_SUBPROFILE) {
                            seq = JSON.xpath("count(/subprocesses[_id eq '" + uuid + "']/preceding-sibling::node()[id = /subprocesses[_id eq '" + uuid + "']/id and _id = /subprocesses[_id = "+part+"]/_id])", _WFInstance, {})[0] + 1;
                        }

                        var valuePath = "/" + variableName + "[seq eq '" + seq + "']/value";
                        var retValue = JSON.xpath(valuePath, file, {})[0];
                        resolve(retValue);



                    } else if (typeof obj == 'string') {

                        resolve(obj);

                    }

                }).catch(function(error) {

                    reject("ERROR: Profile variables not found");

                });

            } else {
                reject("ERROR: Unimplemented profile type found.");
            }

        } else if (data.indicatorWrapper != undefined) {

            var indicatorSet = data.indicatorWrapper.indicatorSetId;
            var indicatorUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + indicatorSet + "']/instances/uuid", _WFInstance, {})[0];
            var indObject = JSON.xpath("/indicators[_id eq '" + indicatorUUID + "']", _WFInstance, {})[0];
            var elementpath = replaceAll(data.indicatorWrapper.path,"[.]","/")
            var xpath = '/'+elementpath
            var value = JSON.xpath(xpath, indObject, {})[0];
            resolve(value);

        } else if (data.calculated != undefined) {


            var value = '';
            var separator = data.calculated.separator;

            for(var i = 0; i < data.calculated.elements.length - 1; i++){
                 
                 var elements = data.calculated.elements;
                 
                 var possibleItems = ["elementProperty","constantValue","elementWrapper","currentDate","randomDigits", "profileObjectElement","profileObjectWrapper","currentFinancialYear"];
                    switch (propertyExists(elements[i], possibleItems)) {

                        case 'elementProperty':
                            var indicatorSet = elements[i].elementProperty.indicatorSetId;
                            var indicatorUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + indicatorSet + "']/instances/uuid", _WFInstance, {})[0];
                            var indObject = JSON.xpath("/indicators[_id eq '" + indicatorUUID + "']", _WFInstance, {})[0];
                            var elementpath = replaceAll(elements[i].elementProperty.elementId,"[.]","/")
                            var xpath = '/model/pending/data/'+ indicatorSet +'/' + elementpath;
                            var itemValue = JSON.xpath(xpath, indObject, {})[0];
                            value = value + itemValue + separator;
                            break;


                        case 'constantValue':

                            var itemValue = elements[i].constantValue.value;
                            value = value + itemValue+separator;
                            break;

                        case 'elementWrapper':
                            var indicatorSet = elements[i].elementWrapper.indicatorSetId;
                            var indicatorUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + indicatorSet + "']/instances/uuid", _WFInstance, {})[0];
                            var indObject = JSON.xpath("/indicators[_id eq '" + indicatorUUID + "']", _WFInstance, {})[0];
                            var elementpath = replaceAll(elements[i].elementWrapper.elementId,"[.]","/")
                            var xpath = '/' + elementpath;
                            var itemValue = JSON.xpath(xpath, indObject, {})[0];
                            value = value + itemValue+separator;
                            break;


                        case 'currentDate':

                            value = value + formatDate(new Date())+separator;
                             break;

                        case 'randomDigits':
                           var digits = elements[i].randomDigits.digits;
                           var random = Math.random();
                           var exp = Math.pow(10, digits);
                           var intPart =  (random * exp) ^ 0
                           value = value + intPart+separator;
                            break;

                        case 'profileObjectElement':
                        
                            var indicatorSet = elements[i].profileObjectElement.indicatorSetId;
                            var indObject = JSON.xpath("/indicators[category/term eq 'appProfile']",app.SCOPE.workflow,{})[0];
                            var elementpath = replaceAll(elements[i].profileObjectElement.elementId,"[.]","/")
                            var xpath = '/model/pending/data/'+ indicatorSet +'/' + elementpath;
                            var itemValue = JSON.xpath(xpath, indObject, {})[0];
                            value = value + itemValue+separator;
                            break;

                        case 'profileObjectWrapper':
                        
                            var indicatorSet = elements[i].profileObjectWrapper.indicatorSetId;
                            var indObject = JSON.xpath("/indicators[category/term eq 'appProfile']",app.SCOPE.workflow,{})[0];
                            var elementpath = replaceAll(elements[i].profileObjectWrapper.wrapperElementId,"[.]","/")
                            var xpath = '/' + elementpath;
                            var itemValue = JSON.xpath(xpath, indObject, {})[0];
                            value = value + itemValue+separator;
                            break;
                       case 'currentFinancialYear':
                            
                            var startDate = elements[i].currentFinancialYear.startDate;
                            var startMonth = elements[i].currentFinancialYear.startMonth;
                            var financialYear = new Date().getFullYear() + "-" + startMonth + "-" + startDate;
                            value = value + financialYear + separator;
                             break;
                            

                        default:
                            reject("No method found from implemented list.");
                            break;
                    }

            }

                 var i = data.calculated.elements.length - 1;
                 var elements = data.calculated.elements;

                    var possibleItems = ["elementProperty","constantValue","elementWrapper","currentDate","randomDigits", "profileObjectElement","profileObjectWrapper","currentFinancialYear"];
                    switch (propertyExists(elements[i], possibleItems)) {

                        case 'elementProperty':
                            var indicatorSet = elements[i].elementProperty.indicatorSetId;
                            var indicatorUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + indicatorSet + "']/instances/uuid", _WFInstance, {})[0];
                            var indObject = JSON.xpath("/indicators[_id eq '" + indicatorUUID + "']", _WFInstance, {})[0];
                            var elementpath = replaceAll(elements[i].elementProperty.elementId,"[.]","/")
                            var xpath = '/model/pending/data/'+ indicatorSet +'/' + elementpath;
                            var itemValue = JSON.xpath(xpath, indObject, {})[0];
                            value = value + itemValue ;
                            break;


                        case 'constantValue':

                            var itemValue = elements[i].constantValue.value;
                            value = value + itemValue;
                            break;

                        case 'elementWrapper':
                            var indicatorSet = elements[i].elementWrapper.indicatorSetId;
                            var indicatorUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + indicatorSet + "']/instances/uuid", _WFInstance, {})[0];
                            var indObject = JSON.xpath("/indicators[_id eq '" + indicatorUUID + "']", _WFInstance, {})[0];
                            var elementpath = replaceAll(elements[i].elementWrapper.elementId,"[.]","/")
                            var xpath = '/' + elementpath;
                            var itemValue = JSON.xpath(xpath, indObject, {})[0];
                            value = value + itemValue;
                            break;


                        case 'currentDate':

                            value = value + formatDate(new Date());
                             break;

                        case 'randomDigits':
                           var digits = elements[i].randomDigits.digits;
                           var random = Math.random();
                           var exp = Math.pow(10, digits);
                           var intPart =  (random * exp) ^ 0
                           value = value + intPart;
                            break;

                        case 'profileObjectElement':
                        
                            var indicatorSet = elements[i].profileObjectElement.indicatorSetId;
                            var indObject = JSON.xpath("/indicators[category/term eq 'appProfile']",app.SCOPE.workflow,{})[0];
                            var elementpath = replaceAll(elements[i].profileObjectElement.elementId,"[.]","/")
                            var xpath = '/model/pending/data/'+ indicatorSet +'/' + elementpath;
                            var itemValue = JSON.xpath(xpath, indObject, {})[0];
                            value = value + itemValue;
                            break;

                        case 'profileObjectWrapper':
                        
                            var indicatorSet = elements[i].profileObjectWrapper.indicatorSetId;
                            var indObject = JSON.xpath("/indicators[category/term eq 'appProfile']",app.SCOPE.workflow,{})[0];
                            var elementpath = replaceAll(elements[i].profileObjectWrapper.wrapperElementId,"[.]","/")
                            var xpath = '/' + elementpath;
                            var itemValue = JSON.xpath(xpath, indObject, {})[0];
                            value = value + itemValue;
                            break;
                       
                        case 'currentFinancialYear':
                            
                            var startDate = elements[i].currentFinancialYear.startDate;
                            var startMonth = elements[i].currentFinancialYear.startMonth;
                            var financialYear = new Date().getFullYear() + "-" + startMonth + "-" + startDate;
                            value = value + financialYear;
                             break;

                        default:
                            reject("No method found from implemented list.");
                            break;
                    }




            resolve(value);
        
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

function formatDate(date) {
  
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + '-' + monthIndex + '-' + year;
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
            var part = library.getSubprofileSubprocessIds();

            if (app.profile.subprofileId != undefined && app.profile.subprofileId != '' && prereqProcessType != undefined && prereqProcessType == PROCESS_TYPE_SUBPROFILE) {
                fullPath = "count(/subprocesses[id eq '" + _subprocessId + "' and _id = "+part+"]" + innerXpath + ")";
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
            var fileName = '';
            
            if(scope  == "profile"){
                
                var profileId = _WFInstance.profile;
                fileName = profileId + ':variables';

            } else if (scope  == "subProfileSubProcessInstance") {

                var subProfileId = app.profile.subprofileId;
                fileName = subProfileId + ':variables';

            } else {
                reject("ERROR: Scope '"+ scope +"' not implemented in pre-requisites");
            }

            dao.get(fileName).then(function(file) {

                var variableName = prerequisite.check.variable.name;
                var obj = eval('file.' + variableName);
                var subjectValueCalculated;

                if (typeof obj == 'object') {

                    var seq = JSON.xpath("count(/subprocesses[_id eq '" + spuuid + "']/preceding-sibling::node()[id = /subprocesses[_id eq '" + spuuid + "']/id])", _WFInstance, {})[0] + 1;
                    var subprocessType = JSON.xpath("/config/processes/subProcesses[_id eq /subprocesses[_id eq '" + spuuid + "']/id]/type", _WFInstance, {})[0];
                    var part = library.getSubprofileSubprocessIds();
                    if (subprocessType == PROCESS_TYPE_SUBPROFILE) {
                        seq = JSON.xpath("count(/subprocesses[_id eq '" + spuuid + "']/preceding-sibling::node()[id = /subprocesses[_id eq '" + spuuid + "']/id and _id = /subprocesses[_id = "+part+"]/_id])", _WFInstance, {})[0] + 1;
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
            }).catch(function(error) {

                var message = helper.getLanguageMessage(prerequisite.message);
                var error = util.error('WFPreRequisiteError:', message);
                reject(error);

            });

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
function preActions(preActions, _WFInstance, spuuid) {
    return new Promise(function (resolve, reject) {
        var completed = [];
        try {
            var subProcessConfigObject = JSON.xpath("/processes[_id eq '"+app.processID+"']/subProcesses[_id eq '"+ app.processId+"']", _WFInstance.config , {})[0];
            var stepObject = JSON.xpath("/subprocesses[_id eq '"+ app.SCOPE.processUUID +"']/step",_WFInstance, {})[0];
            util.syncLoop(preActions.length, function (loop) {
                var counter = loop.iteration();
                action(preActions[counter], app.processID, app.processSEQ, app.processId, app.processSeq, subProcessConfigObject, stepObject ,_WFInstance, {}, spuuid).then(function (data) {
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
function subProcess(processId, processSeq, subProcessId, subProcessSeq, subprofileId, data, _WFInstance) {
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
    
    var countSubprocessInContext = JSON.xpath("count(/processes/subProcesses[groupKey eq '"+ groupKey +"'])", _WFInstance.instance ,{})[0];
    var label = data.label;
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
        label: label,
        channels: [
            "community_" + app.SCOPE.getCommunityId(),
            "profile_" + app.SCOPE.profileId,
            "application_" + app.SCOPE.applicationId,
            "community_" + app.SCOPE.getCommunityId() + "_application_" + app.SCOPE.applicationId
        ],
        history: [],
        //meta information added for server side conflict management and merger
        "meta-data": {
            applicationId: app.SCOPE.applicationId,
            communityId: app.SCOPE.getCommunityId(),
            profileId: app.SCOPE.profileId,
            subprofileId: subprofileId == undefined? '': subprofileId,
            processConfigId: processId,
            subProcessConfigId: subProcessId,
            subProcessInsSeq: countSubprocessInContext + 1
        }
    };

    _WFInstance.subprocesses.push(model);
    // Return a promise
    return new Promise(function (resolve, reject) {
        // Catch all uncaught errors
        try {
            // 1. Process the pre-actions
            var preActionsConf = processConf.preActions;
            //action(actions[counter], processId, processSeq, subProcessId, subProcessSeq, subProcess, step, _WFInstance, data, uuid)
            preActions(preActionsConf, _WFInstance, subProcessObjectId).then(function (result) {
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
        key: generateUUID(),
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

            var updateSPIndicatorObject = function(indicators, _WFInstance){

                if(indicators.length > 0){

                    for(var i=0 ; i < indicators.length; i++){
                        var indicatorObject  = indicators[i];
                        var uuid = indicatorObject.instances[0].uuid;
                        var udpatedSeq = JSON.xpath("/indicators[_id eq '"+ uuid +"']/model/pending/seq", _WFInstance, {})[0];
                        indicatorObject.instances[0].seq = udpatedSeq;
                    }

                }
            };
            
            indicatorDocs(processId, indicators, model, _WFInstance).then(function (result) {
                uuid = spuuid;

                if (step.function.actions != undefined) {
                    actions(step.function.actions, processId, processSeq, subProcessId, subProcessSeq, subProcess, model, _WFInstance, data, spuuid)
                        .then(function (result) {
                            updateSPIndicatorObject(indicators, _WFInstance);
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
                 
                } else if (step.function.task != undefined) {
                    // Make assignments
                    task(processId, processSeq, step.function.task, spuuid, model).then(function (result) {

                        updateSPIndicatorObject(indicators, _WFInstance);
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
                    seq: 1,
                    rev: ''
                }

                indicatorModel.id = indicator.category.term;
                instanceModel.uuid = indicator._id;
                instanceModel.rev = indicator._rev;
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
            var methodPossibleItems = ["form", "indicator", "profile", "subProcessInstance", "step", "community", "application", "user", "sdo", "performance", "taxonomy", "variables", "notification","report","worker"];
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

                    } else if (action.method.form.authoriseAndCreateNewSeq != undefined) {

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
                            
                             // Create new sequence

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
                            args.push(uuid);
                            args.push(data);

                            form.create(args).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });



                            //Ed creation of new sequence



                        }, function (err) {
                            reject(err);
                        });

                    } 

                    break;
                case 'indicator':
                    if (action.method.indicator.create != undefined) {

                        resolve("Not implemented");

                    } else if (action.method.indicator.instantiate != undefined) {

                        resolve("Not implemented");

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

                    } else if (action.method.indicator.setWrapperElement != undefined) {

                        var path = action.method.indicator.setWrapperElement.path;
                        var indicatorSetId = action.method.indicator.setWrapperElement.indicatorSetId;

                        helper.getNodeValue(action.method.indicator.setWrapperElement.data, _WFInstance, uuid).then(function (dataValue) {

                            var args = [];
                            args.push(_WFInstance);
                            args.push(uuid);
                            args.push(path);
                            args.push(dataValue);
                            args.push(indicatorSetId);

                            form.updateIndicatorWrapper(args).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });

                        }, function (err) {
                            reject(err);
                        });


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

                    } else if (action.method.profile.setStatusTo != undefined) {

                            var args = [];
                            var status = action.method.profile.setStatusTo;
                            
                            args.push(_WFInstance);
                            args.push(uuid);
                            args.push(status);
                           
                            form.setStatus(args).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });

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
                    var sdoPossibleItems = ["create","enrollCourse"];
                    switch (propertyExists(action.method.sdo, sdoPossibleItems)) {

                        case 'create':
                            return actionsModule.sdo.create(action.method.sdo.create, uuid, _WFInstance).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });
                        case 'enrollCourse':
                            return actionsModule.sdo.enrollCourse(action.method.sdo.enrollCourse, uuid, _WFInstance).then(function (result) {
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
                    
                    return actionsModule.notification.sendNotificationWorker(action.method.notification, _WFInstance, uuid).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });
                    break;
                    
                case 'report':
                    var reportPossibleItems = ["createPerformanceReport","createReport"];
                    switch (propertyExists(action.method.report, reportPossibleItems)) {

                        case 'createPerformanceReport':

                            return actionsModule.report.createPerformanceReport(action.method.report.createPerformanceReport, _WFInstance, uuid).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });

                        case 'createReport':
                            return actionsModule.report.createReport(action.method.report.createReport, _WFInstance, uuid ).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });
                     

                        default:
                            reject("No method found from implemented list.");
                            break;
                    }

                    break;

                 case 'worker':
                    var workerPossibleItems = ["sendWorker", "executeLocal"];
                    switch (propertyExists(action.method.worker, workerPossibleItems)) {

                        case 'sendWorker':

                            return actionsModule.worker.sendWorker(action.method.worker.sendWorker, _WFInstance, uuid).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });
                        
                        case 'executeLocal':

                            return actionsModule.worker.executeLocal(action.method.worker.executeLocal, _WFInstance, uuid).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });

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
        preActions(preActionsConf, _WFInstance, spuuid).then(function (preActionResult) {

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
                            
                            var isCurrentUserRole1 = rolesObject.profile.indexOf(role);
                            var isCurrentUserRole2 = rolesObject.community.indexOf(role);
                            var isCurrentUserRole3 = rolesObject.implicit.indexOf(role);
                            var isCurrentUserRole4 = rolesObject.adoption.indexOf(role);
                            var isCurrentUserRole5 = rolesObject.subprofile.indexOf(role);

                            if(isCurrentUserRole1 > -1 || isCurrentUserRole2 > -1 || isCurrentUserRole3 > -1 || isCurrentUserRole4 > -1 || isCurrentUserRole5 > -1){
                                isCurrentUserExistInGivenRole = true;
                            } else {
                                isCurrentUserExistInGivenRole = false;
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




            var pushIndicatorToModel = function(model){

                // In both  the cases the list is differnet that needs to be made same.

                var indicatorList = JSON.xpath("/subprocesses[_id eq '"+ spuuid +"']/indicators", _WFInstance ,{});
                var isFirst = false;
                if(indicatorList == undefined || indicatorList.length == 0){
                    isFirst = true;
                    indicatorList = JSON.xpath("/indicators[workflows/processes[subProcessUUID eq '"+ spuuid +"']]", _WFInstance ,{});
                }
                if(model.indicators == undefined){
                   model.indicators = [];
                }
                for (var j = 0; j < indicatorList.length; j++) {
                    
                    if(isFirst){

                        var uuid = indicatorList[j]._id;
                        var rev = JSON.xpath("/indicators[_id eq '"+ uuid +"']/_rev" , _WFInstance, {})[0];
                        var seq = indicatorList[j].model.pending.seq;
                        var status = indicatorList[j].model.pending.status;
                        var indObject = {
                            uuid: uuid,
                            rev: rev,
                            seq: seq,
                            status: status
                        }
                        model.indicators.push(indObject);

                    } else {
    
                        var uuid = indicatorList[j].instances[0].uuid;
                        var rev = JSON.xpath("/indicators[_id eq '"+ uuid +"']/_rev" , _WFInstance, {})[0];
                        var seq = JSON.xpath("/indicators[_id eq '"+ uuid +"']/model/pending/seq",_WFInstance,{})[0];
                        var status = JSON.xpath("/indicators[_id eq '"+ uuid +"']/model/pending/status",_WFInstance,{})[0];
                        var indObject = {
                            uuid: uuid,
                            rev: rev,
                            seq: seq,
                            status: status
                        }
                        model.indicators.push(indObject);
                        
                    }   
                }
                return model;
            }
            
                                

            

            if(model != undefined && Object.keys(model).length > 0){
                var indModelInStep = indModelInStep = pushIndicatorToModel(model);
                spinstanceObject.history.push(indModelInStep);
            } else {
                var indModelInStep = indModelInStep = pushIndicatorToModel(spInstanceStepObject);
                spinstanceObject.history.push(indModelInStep);
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

            var subProcessConfigObject = JSON.xpath("/config/processes[_id eq '"+app.processID+"']/subProcesses[_id eq '"+ app.processId+"']", _WFInstance , {})[0];
            var stepObject = JSON.xpath("/subprocesses[_id eq '"+ app.SCOPE.processUUID +"']/step",_WFInstance, {})[0];
            
            util.syncLoop(postActions.length, function (loop) {
                var counter = loop.iteration();
                action(postActions[counter], app.processID, app.processSEQ, app.processId, app.processSeq, subProcessConfigObject, stepObject,_WFInstance, {}, app.SCOPE.processUUID).then(function (data) {
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
    return library.getNameByLang(obj);
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
            var subProcessConfigObject = JSON.xpath("/config/processes[_id eq '"+app.processID+"']/subProcesses[_id eq '"+ app.processId+"']", _WFInstance , {})[0];
            var stepObject = JSON.xpath("/subprocesses[_id eq '"+ app.SCOPE.processUUID +"']/step",_WFInstance, {})[0];
            util.syncLoop(preWorkActions.length, function (loop) {
                var counter = loop.iteration();
                action(preWorkActions[counter], app.processID, app.processSEQ, app.processId, app.processSeq, subProcessConfigObject, stepObject ,_WFInstance, {}, app.SCOPE.processUUID).then(function (data) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsImxpYi9hY3Rpb25zLmpzIiwibGliL2Zvcm0uanMiLCJsaWIvaGVscGVyLmpzIiwibGliL2ludGVyZmFjZS5qcyIsImxpYi9ub2RlVmFsdWUuanMiLCJsaWIvcHJvY2Vzcy5qcyIsIm5vZGVfbW9kdWxlcy91dGlsaXR5L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2h2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0WEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL3FFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxudmFyIFByb2Nlc3MgPSByZXF1aXJlKCcuL2xpYi9wcm9jZXNzJyk7XG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWxpdHknKTtcbnZhciB1c2VySW50ZXJmYWNlID0gcmVxdWlyZSgnLi9saWIvaW50ZXJmYWNlJyk7XG52YXIgaGVscGVyID0gcmVxdWlyZSgnLi9saWIvaGVscGVyJyk7XG5cblxuLypnbG9iYWxzICovXG5cbi8qKlxuICogQSBuZXcgV29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2UgY29udGFpbnMgdGhlIHJlZmVyZW5jZSB0byB0aGUgYXBwbGljYXRpb25cbiAqIGFuZCBhc3NvY2lhdGVkIHByb2ZpbGUgd2hpY2ggaXQgcmVxdWlyZXMgYXMgdGhlIGZpcnN0IHR3byBwYXJhbWV0ZXJzLiBJdCBhbHNvXG4gKiByZXF1aXJlcyBhIHdvcmtmbG93IGNvbmZpZ3VyYXRpb24sIGFzIHRoZSB0aGlyZCBwYXJhbWV0ZXIsIHdoaWNoIGlzIHVzZWQgdG9cbiAqIGRlc2NpYmUgdGhlIHdvcmtmbG93IHByb2Nlc3Nlcy4gSWYgYSB3b3JrZmxvdyBpbnN0YW5jZSBleGlzdHMgeW91IGNhbiBwYXNzIGl0XG4gKiBpbiBhcyB0aGUgZm91cnRoIHBhcmFtZXRlciB3aGljaCBpdCB3aWxsIHRoZW4gdXNlLCBlbHNlIGNyZWF0ZSBhIG5ldyBvbmUuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHByb2ZpbGUgLSBUaGUgY3VycmVudCBwcm9maWxlIGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gYXBwIC0gVGhlIGFzc29jaWF0ZWQgYXBwbGljYXRpb24gaWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgLSBUaGUgYXBwbGljYXRpb24gd29ya2Zsb3cgY29uZmlndXJhdGlvbiAvIGRlZmluaXRpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBbaW5zdGFuY2VdIC0gQW4gZXhpc3RpbmcgYXBwbGljYXRpb24gcHJvZmlsZSB3b3JrZmxvdyBpbnN0YW5jZSBiYXNlZFxuICogb24gdGhlIGRlZmluaXRpb25cbiAqXG4gKiBAYXV0aG9yIEJyZW50IEdvcmRvblxuICogQHZlcnNpb24gMC4xLjBcbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIGNvbmZpZyA9IHsgJ19pZCc6ICdhYmMxMjMnIH07XG5cbiAqIHZhciBpbnN0YW5jZSA9IHsgJ19pZCc6ICdpbnN0YW5jZV9hYmMxMjMnIH07XG5cbiAqIC8vIElmIHRoZXJlIGlzbid0IGFuIGV4aXN0aW5nIGluc3RhbmNlXG4gKiB2YXIgd29ya2Zsb3cgPSBuZXcgV29ya2Zsb3coJzEyMzQnLCAnNTY3OCcsIGNvbmZpZyk7XG4gKiAvLyBJZiB0aGVyZSBpcyBhbiBleGlzdGluZyBpbnN0YW5jZVxuICogdmFyIHdvcmtmbG93ID0gbmV3IFdvcmtmbG93KCcxMjM0JywgJzU2NzgnLCBjb25maWcsIGluc3RhbmNlKTtcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IG5ldyBXb3JrZmxvdyBvYmplY3RcbiAqXG4gKiBAdGhyb3dzIEVycm9yOiBBIHByb2ZpbGUgaWQgaXMgcmVxdWlyZWRcbiAqIEB0aHJvd3MgRXJyb3I6IEFuIGFwcCBpZCBpcyByZXF1aXJlZFxuICogQHRocm93cyBFcnJvcjogQSB3b3JrZmxvdyBjb25maWd1cmF0aW9uIGlzIHJlcXVpcmVkXG4gKlxuICovXG5cbmZ1bmN0aW9uIFdvcmtmbG93KHByb2ZpbGUsIGNvbW11bml0eUlkLCBhcHAsIGNvbmZpZykge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAvLyBDb21tdW5pdHkgSUQgdmFsaWRhdGlvbiBjaGVja3NcbiAgICBpZiAoY29tbXVuaXR5SWQgPT0gJycgfHwgY29tbXVuaXR5SWQgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IHV0aWwuZXJyb3IoJ1BhcmFtUmVxdWlyZWQnLCAnQSBjb21tdW5pdHkgaWQgaXMgcmVxdWlyZWQuJyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgKGNvbW11bml0eUlkKSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgY29tbXVuaXR5IGlkIG11c3QgYmUgYSBqYXZhc2NyaXB0IHN0cmluZy4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBfdGhpcy5jb21tdW5pdHlJZCA9IGNvbW11bml0eUlkIHx8ICcnO1xuICAgIH1cblxuICAgIC8vIFByb2ZpbGUgSUQgdmFsaWRhdGlvbiBjaGVja3NcbiAgICBpZiAocHJvZmlsZSA9PSAnJyB8fCBwcm9maWxlID09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyB1dGlsLmVycm9yKCdQYXJhbVJlcXVpcmVkJywgJ0EgcHJvZmlsZSBpZCBpcyByZXF1aXJlZC4nKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiAocHJvZmlsZSkgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHByb2ZpbGUgaWQgbXVzdCBiZSBhIGphdmFzY3JpcHQgc3RyaW5nLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIF90aGlzLnByb2ZpbGUgPSBwcm9maWxlIHx8ICcnO1xuICAgIH1cblxuICAgIC8vIEFwcCBJRCB2YWxpZGF0aW9uIGNoZWNrc1xuICAgIGlmIChhcHAgPT0gJycgfHwgYXBwID09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyB1dGlsLmVycm9yKCdQYXJhbVJlcXVpcmVkJywgJ0FuIGFwcCBpZCBpcyByZXF1aXJlZC4nKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiAoYXBwKSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgYXBwIGlkIG11c3QgYmUgYSBqYXZhc2NyaXB0IHN0cmluZy4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBfdGhpcy5hcHAgPSBhcHAgfHwgJyc7XG4gICAgfVxuXG4gICAgLy8gV29ya2Zsb3cgY29uZmlndXJhdGlvbiB2YWxpZGF0aW9uIGNoZWNrc1xuICAgIGlmIChjb25maWcgPT0gJycgfHwgY29uZmlnID09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyB1dGlsLmVycm9yKCdQYXJhbVJlcXVpcmVkJywgJ0Egd29ya2Zsb3cgY29uZmlndXJhdGlvbiBpcyByZXF1aXJlZC4nKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiAoY29uZmlnKSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgX3RoaXMuY29uZmlnID0gSlNPTi5wYXJzZShjb25maWcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIF90aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICB9XG5cbiAgICAvLyBXb3JrZmxvdyBpbnN0YW5jZSB2YWxpZGF0aW9uIGNoZWNrc1xuICAgIF90aGlzLmluc3RhbmNlO1xuICAgIC8vIFdvcmtmbG93IHN1Yi1wcm9jZXNzZXMgdmFsaWRhdGlvbiBjaGVja3NcbiAgICBfdGhpcy5zdWJwcm9jZXNzZXMgPSBbXTtcbiAgICAvLyBXb3JrZmxvdyBpbmRpY2F0b3JzIHBsYWNlIGhvbGRlclxuICAgIF90aGlzLmluZGljYXRvcnMgPSBbXTtcbiAgICBcblxufVxuXG4vKipcbiAqIFdvcmtmbG93IGdldCBwcm9maWxlIGlkLlxuICpcbiAqIEBleGFtcGxlIFwiXCJcbiAqXG4gKiBAcmV0dXJuIFwiXCJcbiAqXG4gKi9cbldvcmtmbG93LnByb3RvdHlwZS5nZXRQcm9maWxlID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnByb2ZpbGU7XG59O1xuXG4vKipcbiAqIFdvcmtmbG93IGdldCBhcHAgaWQuXG4gKlxuICogQGV4YW1wbGUgXCJcIlxuICpcbiAqIEByZXR1cm4gXCJcIlxuICpcbiAqL1xuV29ya2Zsb3cucHJvdG90eXBlLmdldEFwcCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5hcHA7XG59O1xuXG4vKipcbiAqIFdvcmtmbG93IGdldCBjb25maWcuXG4gKlxuICogQGV4YW1wbGUgXCJcIlxuICpcbiAqIEByZXR1cm4gXCJcIlxuICpcbiAqL1xuV29ya2Zsb3cucHJvdG90eXBlLmdldENvbmZpZyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWc7XG59O1xuXG4vKipcbiAqIFdvcmtmbG93IGdldCBpbnN0YW5jZS5cbiAqXG4gKiBAZXhhbXBsZSBcIlwiXG4gKlxuICogQHJldHVybiBcIlwiXG4gKlxuICovXG5cbldvcmtmbG93LnByb3RvdHlwZS5nZXRJbnN0YW5jZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbn07XG5cbi8qKlxuICogV29ya2Zsb3cgc2V0IHRoZSBpbnN0YW5jZSBkYXRhLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC0gdGhlIHdvcmtmbG93IHByb2Nlc3MgaW5zdGFuY2UgZGF0YVxuICpcbiAqIEBleGFtcGxlIFwiXCJcbiAqXG4gKiBAcmV0dXJuIFwiXCJcbiAqXG4gKi9cbldvcmtmbG93LnByb3RvdHlwZS5zZXRJbnN0YW5jZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdGhpcy5pbnN0YW5jZSA9IGRhdGE7XG59O1xuXG4vKipcbiAqIFdvcmtmbG93IGdldCBzdWItcHJvY2Vzc2VzIGRhdGEuXG4gKlxuICogQGV4YW1wbGUgXCJcIlxuICpcbiAqIEByZXR1cm4gXCJcIlxuICpcbiAqL1xuV29ya2Zsb3cucHJvdG90eXBlLmdldFN1YlByb2Nlc3NlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zdWJwcm9jZXNzZXM7XG59O1xuXG4vKipcbiAqIFdvcmtmbG93IHNldCB0aGUgc3ViLXByb2Nlc3NlcyBkYXRhLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC0gdGhlIHdvcmtmbG93IHByb2Nlc3MgaW5zdGFuY2UgZGF0YVxuICpcbiAqIEBleGFtcGxlIFwiXCJcbiAqXG4gKiBAcmV0dXJuIFwiXCJcbiAqXG4gKi9cbldvcmtmbG93LnByb3RvdHlwZS5zZXRTdWJQcm9jZXNzZXMgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHRoaXMuc3VicHJvY2Vzc2VzID0gZGF0YTtcbn07XG5cbi8qKlxuICogV29ya2Zsb3cgZ2V0IGluZGljYXRvciBzZXQgZGF0YS5cbiAqXG4gKiBAZXhhbXBsZSBcIlwiXG4gKlxuICogQHJldHVybiBcIlwiXG4gKlxuICovXG5Xb3JrZmxvdy5wcm90b3R5cGUuZ2V0SW5kaWNhdG9ycyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5pbmRpY2F0b3JzO1xufTtcblxuLyoqXG4gKiBXb3JrZmxvdyBzZXQgdGhlIGluZGljYXRvciBzZXQgZGF0YS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIHRoZSB3b3JrZmxvdyBwcm9jZXNzIGluc3RhbmNlIGRhdGFcbiAqXG4gKiBAZXhhbXBsZSBcIlwiXG4gKlxuICogQHJldHVybiBcIlwiXG4gKlxuICovXG5Xb3JrZmxvdy5wcm90b3R5cGUuc2V0SW5kaWNhdG9ycyA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdGhpcy5pbmRpY2F0b3JzID0gZGF0YTtcbn07XG5cbi8qKlxuICogU2V0IHRoZSB2YXJpYWJsZSB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gcHJvY2VzcyBpZFxuICogQHBhcmFtIHtudW1iZXJ9IHByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2UgcHJvY2VzcyBzZXFcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdWJQcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdWItcHJvY2VzcyBpZFxuICogQHBhcmFtIHtudW1iZXJ9IHN1YlByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2Ugc3ViLXByb2Nlc3Mgc2VxXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RlcElkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3RlcCBpZFxuICogQHBhcmFtIHtPYmplY3R9IHZhcmlhYmxlIC0gdGhlIFdvcmtmbG93IHZhcmlhYmxlIG9iamVjdFxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuLy8gV29ya2Zsb3cucHJvdG90eXBlLnNldFZhcmlhYmxlID0gZnVuY3Rpb24ocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwgdmFyaWFibGUpe1xuLy8gXHR2YXIgX3RoaXMgPSB0aGlzO1xuLy8gXHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4vLyBcdFx0dHJ5IHtcbi8vIFx0XHRcdFByb2Nlc3MuZ2V0VmFyaWFibGUocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwgdmFyaWFibGUpLnRoZW4oZnVuY2lvbihyZXN1bHQpe1xuLy8gXHRcdFx0XHRyZXNvbHZlKHJlc3VsdC5kYXRhKTtcbi8vIFx0XHRcdH0sIGZ1bmN0aW9uKGVycil7XG4vLyBcdFx0XHRcdHJlamVjdChlcnIpO1xuLy8gXHRcdFx0fSlcbi8vIFx0XHR9IGNhdGNoIChlcnIpIHtcbi8vIFx0XHRcdHJlamVjdChlcnIpO1xuLy8gXHRcdH1cblxuLy8gXHR9KTtcbi8vIH07XG5cbi8qKlxuICogR2V0IHRoZSB2YXJpYWJsZSB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gcHJvY2VzcyBpZFxuICogQHBhcmFtIHtudW1iZXJ9IHByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2UgcHJvY2VzcyBzZXFcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdWJQcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdWItcHJvY2VzcyBpZFxuICogQHBhcmFtIHtudW1iZXJ9IHN1YlByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2Ugc3ViLXByb2Nlc3Mgc2VxXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RlcElkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3RlcCBpZFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIHRoZSBXb3JrZmxvdyB2YXJpYWJsZSBpZFxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuLy8gV29ya2Zsb3cucHJvdG90eXBlLmdldFZhcmlhYmxlID0gZnVuY3Rpb24ocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwga2V5KXtcbi8vIFx0dmFyIF90aGlzID0gdGhpcztcbi8vIFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuLy8gXHRcdHRyeSB7XG4vLyBcdFx0XHRQcm9jZXNzLnNldFZhcmlhYmxlKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdGVwSWQsIGtleSkudGhlbihmdW5jaW9uKHJlc3VsdCl7XG4vLyBcdFx0XHRcdHJlc29sdmUocmVzdWx0LmRhdGEpO1xuLy8gXHRcdFx0fSwgZnVuY3Rpb24oZXJyKXtcbi8vIFx0XHRcdFx0cmVqZWN0KGVycik7XG4vLyBcdFx0XHR9KVxuLy8gXHRcdH0gY2F0Y2ggKGVycikge1xuLy8gXHRcdFx0cmVqZWN0KGVycik7XG4vLyBcdFx0fVxuXG4vLyBcdH0pO1xuLy8gfTtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBjcmVhdGVzIGEgbmV3IHdvcmtmbG93IHByb2Nlc3MgaS5lLiBpdCBjcmVhdGVzIGEgd29ya2Zsb3cgcHJvY2Vzc2VzIGluc3RhbmNlXG4gKiBvYmplY3Qgd2l0aCB0aGUgbWluaW11bSByZXF1aXJlZCBkYXRhLiBUaGlzIGluc3RhbmNlIGNhbiBiZSByZWZlcmVuY2VkIGluIHRoZSBmb2xsb3dpbmdcbiAqIHdheSwgc2VlIGV4YW1wbGUgYmVsb3cuXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBjb25maWcgPSB7ICdfaWQnOiAnYWJjMTIzJyB9O1xuXG4gKiB2YXIgd29ya2Zsb3cgPSBuZXcgV29ya2Zsb3coJzEyMzQnLCAnNTY3OCcsIGNvbmZpZyk7XG4gKiB3b3JrZmxvdy5jcmVhdGUoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gKlx0Y29uc29sZS5sb2cocmVzdWx0Lm1lc3NhZ2UpO1xuICpcdC8vIFRoZSBmb2xsb3dpbmcgcHJvcGVydGllcyBjYW4gbm93IGJlIGFjY2Vzc2VkXG4gKiBcdHZhciBwcm9maWxlID0gd29ya2Zsb3cucHJvZmlsZTtcbiAqIFx0dmFyIGFwcCA9IHdvcmtmbG93LmFwcDtcbiAqIFx0dmFyIGNvbmZpZyA9IHdvcmtmbG93LmNvbmZpZztcbiAqXHQvLyBPbiBzdWNjZXNzIHlvdSBjYW4gYWNjZXNzIHRoZSBpbnN0YW5jZSB0aGUgZm9sbG93aW5nIHdheVxuICpcdHZhciBpbnN0YW5jZSA9IHdvcmtmbG93Lmluc3RhbmNlO1xuICogfSwgZnVuY3Rpb24oZXJyb3Ipe1xuICpcdGNvbnNvbGUubG9nKGVycm9yKTtcbiAqIH0pO1xuICpcbiAqIEByZXR1cm4ge09iamVjdH0gbmV3IFdvcmtmbG93IGluc3RhbmNlIHdpdGggdXBkYXRlZCBpbnN0YW5jZSBkYXRhLlxuICpcbiAqL1xuXG5Xb3JrZmxvdy5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChfdGhpcy5pbnN0YW5jZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdmFyIHdhcm4gPSB1dGlsLndhcm4oJ0luc3RhbmNlIGFscmVhZHkgZXhpc3RzLicsIF90aGlzKVxuICAgICAgICAgICAgICAgIHJlc29sdmUod2Fybik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgd29ya2Zsb3cgcHJvY2Vzc2VzIGluc3RhbmNlIG9iamVjdFxuICAgICAgICAgICAgICAgIHZhciBtb2RlbCA9IHtcbiAgICAgICAgICAgICAgICAgICAgX2lkOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgdmVyc2lvbjogJycsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICd3b3JrZmxvd0luc3RhbmNlJyxcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc2VzOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgY2hhbm5lbHM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tbXVuaXR5X1wiICsgYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBcInByb2ZpbGVfXCIgKyBhcHAuU0NPUEUucHJvZmlsZUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHBsaWNhdGlvbl9cIiArIGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21tdW5pdHlfXCIgKyBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKSArIFwiX2FwcGxpY2F0aW9uX1wiICsgYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWRcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBtb2RlbC5faWQgPSBcIl9sb2NhbC9cIitfdGhpcy5wcm9maWxlICsgJzpwcm9jZXNzZXM6bG9jYWwnO1xuICAgICAgICAgICAgICAgIC8vbW9kZWwuX2lkID0gX3RoaXMucHJvZmlsZSArICc6cHJvY2Vzc2VzJztcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBtb2RlbC52ZXJzaW9uID0gX3RoaXMuY29uZmlnLnZlcnNpb247XG4gICAgICAgICAgICAgICAgX3RoaXMuaW5zdGFuY2UgPSBtb2RlbDtcbiAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya2Zsb3cgcHJvY2Vzc2VzIGluc3RhbmNlIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5LicsIF90aGlzKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFdvcmtmbG93IGluaXRpYWxpc2UsIHRoaXMgZnVuY3Rpb24gZXhlY3V0ZXMgYSBwcm9jZXNzIHdpdGhpbiBhIHdvcmtmbG93XG4gKiBjb25maWd1cmF0aW9uLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9jZXNzSWQgLSB0aGUgcHJvY2VzcyBpZCB0byBwcm9jZXNzXG4gKiBAcGFyYW0ge29iamVjdH0gW2RhdGFdIC0gdGhlIGlucHV0IGRhdGEgdG8gcHJvY2Vzc1xuICpcbiAqIEBleGFtcGxlXG4gKiBXb3JrZmxvdy5pbml0aWFsaXNlKCdwcm9jZXNzSWQnLCB7IHZhbGlkRGF0ZTogJ2RhdGUnIH0pO1xuICpcbiAqIEByZXR1cm4gXCJcIlxuICpcbiAqL1xuV29ya2Zsb3cucHJvdG90eXBlLmluaXRpYWxpc2UgPSBmdW5jdGlvbiAocHJvY2Vzc0lkLCBkYXRhLCBzdWJwcm9maWxlSWQpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgY29uZmlnUHJvY2VzcyA9IFtdO1xuICAgICAgICAgICAgLy8gQ2hlY2sgdGhlIHBhc3NlZCBpbiBwYXJhbWV0ZXJzXG4gICAgICAgICAgICBpZiAocHJvY2Vzc0lkICE9PSAnJyAmJiBwcm9jZXNzSWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIC8vIEdldCB0aGUgY3VycmVudCBwcm9jZXNzIGNvbmZpZ1xuICAgICAgICAgICAgICAgIGNvbmZpZ1Byb2Nlc3MgPSBfdGhpcy5jb25maWcucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbiAob2JqUHJvY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAob2JqUHJvY2Vzcy5faWQgPT0gcHJvY2Vzc0lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqUHJvY2VzcztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ1Byb2Nlc3NbMF0uX2lkID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRkNvbmZpZ0Vycm9yJywgJ05vIHZhbGlkIHByb2Nlc3MgZGVmaW5pdGlvbiBmb3VuZCB3aXRoIHByb2Nlc3MgaWQ6ICcgKyBwcm9jZXNzSWQpO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25maWdQcm9jZXNzLnB1c2goX3RoaXMuY29uZmlnLnByb2Nlc3Nlc1swXSk7XG4gICAgICAgICAgICAgICAgcHJvY2Vzc0lkID0gX3RoaXMuY29uZmlnLnByb2Nlc3Nlc1swXS5faWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEdldCB0aGUgY3VycmVudCBsaXN0IG9mIHByb2Nlc3MgaW5zdGFuY2VzXG4gICAgICAgICAgICAvLyB2YXIgcHJvY2Vzc1NlcSA9IDE7XG4gICAgICAgICAgICB2YXIgY3VycmVudFByb2Nlc3MgPSBbXTtcbiAgICAgICAgICAgIF90aGlzLmluc3RhbmNlLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKHByb2Nlc3NJdGVtKSB7XG4gICAgICAgICAgICAgICAgaWYgKHByb2Nlc3NJdGVtLmlkID09IHByb2Nlc3NJZCkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UHJvY2Vzcy5wdXNoKHByb2Nlc3NJdGVtKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIHByb2Nlc3NTZXEgPSBjdXJyZW50UHJvY2Vzcy5sZW5ndGggKyAxO1xuICAgICAgICAgICAgLy8gdmFyIG5leHRTZXEgPSBwcm9jZXNzU2VxICsgMTtcbiAgICAgICAgICAgIC8vIFB1c2ggdGhlIHByb2Nlc3Mgb2JqZWN0IGludG8gdGhlIGFycmF5XG4gICAgICAgICAgICB2YXIgcHJvY2Vzc01vZGVsID0ge1xuICAgICAgICAgICAgICAgIGlkOiAnJyxcbiAgICAgICAgICAgICAgICBzZXE6ICcnLFxuICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NlczogW11cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gMS4gVXBkYXRlIHRoZSBwcm9jZXNzIGlkIGFuZCBzZXFcbiAgICAgICAgICAgIHByb2Nlc3NNb2RlbC5pZCA9IHByb2Nlc3NJZDtcbiAgICAgICAgICAgIHByb2Nlc3NNb2RlbC5zZXEgPSBwcm9jZXNzU2VxO1xuICAgICAgICAgICAgX3RoaXMuaW5zdGFuY2UucHJvY2Vzc2VzLnB1c2gocHJvY2Vzc01vZGVsKTtcbiAgICAgICAgICAgIC8vIFBhcmFtZXRlcnNcbiAgICAgICAgICAgIHZhciBzdWJQcm9jZXNzSWQgPSBjb25maWdQcm9jZXNzWzBdLnN1YlByb2Nlc3Nlc1swXS5faWQ7XG4gICAgICAgICAgICB2YXIgc3ViUHJvY2Vzc1NlcSA9IDE7XG4gICAgICAgICAgICBfdGhpcy5pbnN0YW5jZS5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChwcm9jZXNzSXRlbSkge1xuICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzSXRlbS5pZCA9PSBwcm9jZXNzSWQgJiYgcHJvY2Vzc0l0ZW0uc2VxID09IHByb2Nlc3NTZXEpIHtcbiAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc1NlcSA9IHByb2Nlc3NJdGVtLnN1YlByb2Nlc3Nlcy5sZW5ndGggKyAxXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLy8gQ2FsbCB0aGUgc3VicHJvY2VzcyBtZXRob2RcblxuICAgICAgICAgICAgUHJvY2Vzcy5zdWJQcm9jZXNzKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdWJwcm9maWxlSWQsIGRhdGEsIF90aGlzKS50aGVuKGZ1bmN0aW9uIChzdWJQcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgLy8gR2VuZXJhdGUgdGhlIHV1aWRcblxuICAgICAgICAgICAgICAgIHZhciB1dWlkID0gc3ViUHJvY2Vzcy5kYXRhLl9pZDsgLy9fdGhpcy5wcm9maWxlICsgJzonICsgX3RoaXMuYXBwICsgJzonICsgcHJvY2Vzc0lkICsgJzonICsgcHJvY2Vzc1NlcSArICc6JyArIHN1YlByb2Nlc3NJZCArICc6JyArIHN1YlByb2Nlc3NTZXE7XG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBCdWlsZCB0aGUgc3ViLXByb2Nlc3MgcmVmZXJlbmNlIG9iamVjdFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHZhciBncm91cEtleSA9IHN1YlByb2Nlc3MuZGF0YS5ncm91cEtleTtcbiAgICAgICAgICAgICAgICAvL1RPRE86IENoYW5nZSByZXF1aXJlZCB0byBtb3ZlIGlzQWN0aXZlIHRvIHN1YlByb2Nlc3MgZmlsZS5SZW1vdmUgZnJvbSBoZXJlXG4gICAgICAgICAgICAgICAgdmFyIHN1YlByb2Nlc3NSZWYgPSB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBzdWJQcm9jZXNzSWQsXG4gICAgICAgICAgICAgICAgICAgIHN1YnByb2ZpbGVJZDogc3VicHJvZmlsZUlkLFxuICAgICAgICAgICAgICAgICAgICBzZXE6IHN1YlByb2Nlc3NTZXEsXG4gICAgICAgICAgICAgICAgICAgIHV1aWQ6IHV1aWQsXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwS2V5OiBncm91cEtleVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gQWRkIHRoZSByZWZlcmVuY2UgdG8gdGhlIHByb2Nlc3MgbW9kZWxcbiAgICAgICAgICAgICAgICBwcm9jZXNzTW9kZWwuc3ViUHJvY2Vzc2VzLnB1c2goc3ViUHJvY2Vzc1JlZik7XG4gICAgICAgICAgICAgICAgLy8gQWRkIHRoZSBzdWJQcm9jZXNzIG1vZGVsIHRvIHRoZSBzdWJwcm9jZXNzZXMgYXJyYXlcbiAgICAgICAgICAgICAgICAvL190aGlzLnN1YnByb2Nlc3Nlcy5wdXNoKHN1YlByb2Nlc3MuZGF0YSk7XG4gICAgICAgICAgICAgICAgLy8gX3RoaXMuaW5zdGFuY2UucHJvY2Vzc2VzLnB1c2gocHJvY2Vzc01vZGVsKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgX3RoaXMuaW5zdGFuY2UucHJvY2Vzc2VzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHJvY2Vzc0l0ZW0gPSBfdGhpcy5pbnN0YW5jZS5wcm9jZXNzZXNbaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvY2Vzc0l0ZW0uaWQgPT0gcHJvY2Vzc0lkICYmIHByb2Nlc3NJdGVtLnNlcSA9PSBwcm9jZXNzU2VxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGN1cnJlbnQgcHJvY2VzcyBmcm9tIHRoZSBhcnJheSBhbmQgYWRkIHRoZSB1cGRhdGVkIHByb2Nlc3NNb2RlbFxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuaW5zdGFuY2UucHJvY2Vzc2VzLnNwbGljZShpbmRleCwgMSwgcHJvY2Vzc01vZGVsKVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBQcm9jZXNzIHRoZSBpbmRpY2F0b3IgZG9jdW1lbnRzIHdvcmtmbG93IHByb2Nlc3NlcyB1cGRhdGVzXG4gICAgICAgICAgICAgICAgdmFyIGluZGljYXRvcnMgPSBzdWJQcm9jZXNzLmRhdGEuaW5kaWNhdG9ycztcbiAgICAgICAgICAgICAgICB2YXIgc3RlcCA9IHN1YlByb2Nlc3MuZGF0YS5zdGVwO1xuICAgICAgICAgICAgICAgIFByb2Nlc3MuaW5kaWNhdG9yRG9jcyhwcm9jZXNzSWQsIGluZGljYXRvcnMsIHN0ZXAsIF90aGlzKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1Byb2Nlc3M6ICcgKyBfdGhpcy5jb25maWcucHJvY2Vzc2VzWzBdLl9pZCArICcgaW5pdGlhbGl6ZWQgc3VjY2Vzc2Z1bGx5LicsIHN1YlByb2Nlc3NSZWYpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5pbnN0YW5jZS5wcm9jZXNzZXMgPSBfdGhpcy5pbnN0YW5jZS5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEob2JqLmlkID09IHByb2Nlc3NJZCAmJiBvYmouc2VxID09IHByb2Nlc3NTZXEpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFdvcmtmbG93IHRyYW5zaXRpb24gdG8gdGhlIG5leHQgc3RlcC4gVGhpcyBtb3ZlcyB0aGUgd29ya2Zsb3cgZnJvbSB0aGUgY3VycmVudCBwcm9jZXNzLFxuICogc3ViLXByb2Nlc3Mgc3RlcCB0byB0aGUgbmV4dCBvbmUgYXMgc3BlY2lmaWVkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBwcm9jZXNzIGlkXG4gKiBAcGFyYW0ge251bWJlcn0gcHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBwcm9jZXNzIHNlcVxuICogQHBhcmFtIHtzdHJpbmd9IHN1YlByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN1Yi1wcm9jZXNzIGlkXG4gKiBAcGFyYW0ge251bWJlcn0gc3ViUHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBzdWItcHJvY2VzcyBzZXFcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdGVwSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdGVwIGlkIFxuICogQHBhcmFtIHtzdHJpbmd9IHRyYW5zaXRpb25JZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHRyYW5zaXRpb24gaWRcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIC0gYW55IGFkZGl0aW9uYWwgZGF0YSBwYXNzZWQgaW4gYXMga2V5IHZhbHVlIHBhaXJzXG4gKlxuICogQGV4YW1wbGVcbiAqIFdvcmtmbG93LnRyYW5zaXRpb24oJ3Byb2Nlc3NJZCcsIDEsICdzdWJQcm9jZXNzSWQnLCAxLCAnc3RlcElkJywgJ3RyYW5zaXRpb25JZCcsIHsga2V5OiAnJywgdmFsdWU6ICcnIH0pO1xuICpcbiAqIEByZXR1cm4gXCJcIlxuICpcbiAqL1xuV29ya2Zsb3cucHJvdG90eXBlLnRyYW5zaXRpb24gPSBmdW5jdGlvbiAocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwgdHJhbnNpdGlvbklkLCBkYXRhLCBzcHV1aWQpIHtcbiAgICAvLyBSZS1hc3NpZ24gdGhpc1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciBtb2RlbCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL3N0ZXAvZGF0YVwiLCBhcHAuU0NPUEUud29ya2Zsb3csIHt9KVswXTtcbiAgICAgICAgICAgIHZhciBzdGVwT2JqZWN0ID0gSlNPTi54cGF0aChcIi9wcm9jZXNzZXNbX2lkIGVxICdcIiArIHByb2Nlc3NJZCArIFwiJ10vc3ViUHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzdWJQcm9jZXNzSWQgKyBcIiddL3N0ZXBzW19pZCBlcSAnXCIgKyBzdGVwSWQgKyBcIiddXCIsIF90aGlzLmNvbmZpZywge30pWzBdO1xuXG5cbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgY3VycmVudCBzdWItcHJvY2VzcyBzdGVwIGRhdGFcbiAgICAgICAgICAgIHZhciB1cGRhdGUgPSBmdW5jdGlvbiAodHlwZSwgcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuaW5zdGFuY2UucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbiAocHJvY2Vzc0l0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb2Nlc3NJdGVtLmlkID09IHByb2Nlc3NJZCAmJiBwcm9jZXNzSXRlbS5zZXEgPT0gcHJvY2Vzc1NlcSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzSXRlbS5zdWJQcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChzdWJQcm9jZXNzSXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWJQcm9jZXNzSXRlbS5pZCA9PSBzdWJQcm9jZXNzSWQgJiYgc3ViUHJvY2Vzc0l0ZW0uc2VxID09IHN1YlByb2Nlc3NTZXEpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5zdWJwcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChzdWJQcm9jZXNzT2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3ViUHJvY2Vzc09iai5faWQgPT0gc3ViUHJvY2Vzc0l0ZW0udXVpZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT0gJ3N0ZXAnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc09iai5zdGVwID0gcmVzdWx0LmRhdGEuc3RlcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MocmVzdWx0Lm1lc3NhZ2UsIHN1YlByb2Nlc3NPYmopO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09ICdzdGVwQ29tcGxldGUnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc09iai5zdGVwID0gcmVzdWx0LmRhdGEuc3RlcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc09iai5jb21wbGV0ZSA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MocmVzdWx0Lm1lc3NhZ2UsIHN1YlByb2Nlc3NPYmouc3RlcCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBpZiAoc3RlcE9iamVjdC5mdW5jdGlvbi50YXNrLnBvc3RBY3Rpb25zICE9IHVuZGVmaW5lZCkge1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgcG9zdEFjdGlvbnMgPSBzdGVwT2JqZWN0LmZ1bmN0aW9uLnRhc2sucG9zdEFjdGlvbnM7XG4gICAgICAgICAgICAgICAgUHJvY2Vzcy5wb3N0QWN0aW9ucyhwb3N0QWN0aW9ucywgX3RoaXMpLnRoZW4oZnVuY3Rpb24gKHN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICBcblxuXG5cbiAgICAgICAgICAgICAgICAgICAgUHJvY2Vzcy50cmFuc2l0aW9uKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdGVwSWQsIHRyYW5zaXRpb25JZCwgZGF0YSwgX3RoaXMsIHNwdXVpZCwgbW9kZWwpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRhdGEuc3ViUHJvY2Vzc0NvbXBsZXRlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGUoJ3N0ZXBDb21wbGV0ZScsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlKCdzdGVwJywgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcblxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcblxuICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cblxuICAgICAgICAgICAgICAgIFByb2Nlc3MudHJhbnNpdGlvbihwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3RlcElkLCB0cmFuc2l0aW9uSWQsIGRhdGEsIF90aGlzLCBzcHV1aWQsIG1vZGVsKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRhdGEuc3ViUHJvY2Vzc0NvbXBsZXRlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZSgnc3RlcENvbXBsZXRlJywgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlKCdzdGVwJywgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG5cbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG5cbiAgICB9KTtcbn07XG5cbi8qKlxuICogV29ya2Zsb3cgYXNzaWduIHVzZXIuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHByb2Nlc3MgaWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBwcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHByb2Nlc3Mgc2VxXG4gKiBAcGFyYW0ge3N0cmluZ30gc3ViUHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3ViLXByb2Nlc3MgaWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdWJQcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHN1Yi1wcm9jZXNzIHNlcVxuICogQHBhcmFtIHtzdHJpbmd9IHN0ZXBJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN0ZXAgaWRcbiAqIEBwYXJhbSB7b2JqZWN0fSB1c2VyIC0gdGhlIHVzZXIgaWQgYW5kIG5hbWUgZGF0YVxuICpcbiAqIEBleGFtcGxlIFwiXCJcbiAqXG4gKiBAcmV0dXJuIFwiXCJcbiAqXG4gKi9cbldvcmtmbG93LnByb3RvdHlwZS5hc3NpZ25Vc2VyID0gZnVuY3Rpb24gKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCB1c2VyKSB7XG4gICAgLy8gUmUtYXNzaWduIHRoZSBXb3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZSBhcyBfdGhpc1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIFByb2Nlc3MuYXNzaWduVXNlcihwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgdXNlciwgX3RoaXMpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cblxuICAgIH0pXG59O1xuXG4vKipcbiAqIFdvcmtmbG93IHRhc2ssIHRoaXMgbWV0aG9kIGV4ZWN1dGVzIGEgc3BlY2lmaWMgdGFzay5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIHByb2Nlc3MgaWQgdG8gcHJvY2Vzc1xuICogQHBhcmFtIHtvYmplY3R9IGlucHV0RGF0YSAtIHRoZSBpbnB1dCBkYXRhIHRvIHByb2Nlc3NcbiAqXG4gKiBAZXhhbXBsZVxuICogV29ya2Zsb3cuaW5pdGlhbGl6ZSgncHJvY2Vzc0lkJywgeyB2YWxpZERhdGU6ICdkYXRlJyB9KTtcbiAqXG4gKiBAcmV0dXJuIFwiXCJcbiAqXG4gKi9cbldvcmtmbG93LnByb3RvdHlwZS51aSA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBSZS1hc3NpZ24gdGhlIFdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlIGFzIF90aGlzXG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRQcm9jZXNzOiBmdW5jdGlvbiAocHJvY2Vzc0lkLCBsYW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJbnRlcmZhY2UuZ2V0UHJvY2Vzcyhwcm9jZXNzSWQsIGxhbmcsIF90aGlzKS50aGVuKGZ1bmN0aW9uIChtb2RlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShtb2RlbCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgIH1cblxufTtcblxuLyoqXG4gKiBXb3JrZmxvdyB0YXNrLCB0aGlzIG1ldGhvZCBleGVjdXRlcyBhIHNwZWNpZmljIHRhc2suXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGRhdGEgLSB0aGUgcHJvY2VzcyBpZCB0byBwcm9jZXNzXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgaW5wdXQgZGF0YSB0byBwcm9jZXNzXG4gKiAqIEBwYXJhbSB7c3RyaW5nfSB1dWlkIC0gdGhlIGlucHV0IGRhdGEgdG8gcHJvY2Vzc1xuICpcbiAqIEBleGFtcGxlXG4gKiBXb3JrZmxvdy5nZXROb2RlVmFsdWUoZGF0YSwgX1dGSW5zdGFuY2UsIHV1aWQpO1xuICpcbiAqIEByZXR1cm4gXCJcIlxuICpcbiAqL1xuXG5Xb3JrZmxvdy5wcm90b3R5cGUuZ2V0Tm9kZVZhbHVlID0gZnVuY3Rpb24gKGRhdGEsIHV1aWQpIHtcbiAgICAvLyBSZS1hc3NpZ24gdGhlIFdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlIGFzIF90aGlzXG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaGVscGVyLmdldE5vZGVWYWx1ZShkYXRhLCBfdGhpcywgdXVpZCkudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMpO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cblxuICAgIH0pXG59O1xuXG4vKipcbiAqIFdvcmtmbG93IHRhc2ssIHRoaXMgbWV0aG9kIGV4ZWN1dGVzIGEgc3BlY2lmaWMgdGFzay5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gZGF0YSAtIHRoZSBwcm9jZXNzIGlkIHRvIHByb2Nlc3NcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBpbnB1dCBkYXRhIHRvIHByb2Nlc3NcbiAqXG4gKiBAZXhhbXBsZVxuICogV29ya2Zsb3cudGFrZUFzc2lnbm1lbnQoc3B1dWlkLCBfV0ZJbnN0YW5jZSk7XG4gKlxuICogQHJldHVybiBcIlwiXG4gKlxuICovXG5cbldvcmtmbG93LnByb3RvdHlwZS50YWtlQXNzaWdubWVudCA9IGZ1bmN0aW9uIChzcHV1aWQpIHtcbiAgICAvLyBSZS1hc3NpZ24gdGhlIFdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlIGFzIF90aGlzXG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgLy9Bc3NpZ25tZW50IGFyZSBleGVjdXRpbmcgaGVyZVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgc3BPYmplY3QgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXVwiLCBfdGhpcywge30pWzBdO1xuICAgICAgICAgICAgdmFyIGFzc2lnbmVlID0gSlNPTi54cGF0aChcIi9zdGVwL2Fzc2lnbmVkVG9cIiwgc3BPYmplY3QsIHt9KVswXTtcbiAgICAgICAgICAgIGFzc2lnbmVlLm5hbWUgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJuYW1lICsgXCJcIjtcbiAgICAgICAgICAgIGFzc2lnbmVlLnVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkICsgXCJcIjtcblxuICAgICAgICAgICAgLy9mZXRjaCBwcmVXb3JrQWN0aW9ucyBoZXJlIFxuXG4gICAgICAgICAgICB2YXIgcHJvY2Vzc0lkID0gSlNPTi54cGF0aChcIi9pbnN0YW5jZS9wcm9jZXNzZXNbc3ViUHJvY2Vzc2VzL3V1aWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXS9pZFwiLCBfdGhpcywge30pWzBdO1xuICAgICAgICAgICAgdmFyIHN1YlByb2Nlc3NJZCA9IEpTT04ueHBhdGgoXCIvaW5zdGFuY2UvcHJvY2Vzc2VzL3N1YlByb2Nlc3Nlc1t1dWlkIGVxICdcIiArIHNwdXVpZCArIFwiJ10vaWRcIiwgX3RoaXMsIHt9KVswXTtcbiAgICAgICAgICAgIHZhciBzdGVwSWQgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXS9zdGVwL2lkXCIsIF90aGlzLCB7fSlbMF07XG4gICAgICAgICAgICB2YXIgc3RlcE9iamVjdCA9IEpTT04ueHBhdGgoXCIvcHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBwcm9jZXNzSWQgKyBcIiddL3N1YlByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3ViUHJvY2Vzc0lkICsgXCInXS9zdGVwc1tfaWQgZXEgJ1wiICsgc3RlcElkICsgXCInXVwiLCBfdGhpcy5jb25maWcsIHt9KVswXTtcblxuICAgICAgICAgICAgaWYgKHN0ZXBPYmplY3QuZnVuY3Rpb24udGFzay5wcmVXb3JrQWN0aW9ucyAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgIHZhciBwcmVXb3JrQWN0aW9ucyA9IHN0ZXBPYmplY3QuZnVuY3Rpb24udGFzay5wcmVXb3JrQWN0aW9ucztcbiAgICAgICAgICAgICAgICBQcm9jZXNzLnByZVdvcmtBY3Rpb25zKHByZVdvcmtBY3Rpb25zLCBfdGhpcykudGhlbihmdW5jdGlvbiAoc3VjY2Vzcykge1xuXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoX3RoaXMpO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICByZXNvbHZlKF90aGlzKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuXG4gICAgICAgICAgICByZWplY3QoZXJyKTtcblxuICAgICAgICB9XG5cbiAgICB9KTtcbn07XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IFdvcmtmbG93OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsaXR5Jyk7XG52YXIgbm9kZVZhbHVlID0gcmVxdWlyZSgnLi9ub2RlVmFsdWUnKTtcbnZhciBmb3JtID0gcmVxdWlyZSgnLi9mb3JtJyk7XG52YXIgaGVscGVyID0gcmVxdWlyZSgnLi9oZWxwZXInKTtcblxudmFyIGdhdGVrZWVwZXIgPSBuZXcgR0soKTtcblxuLyoqXG4gKiBBY3Rpb25zIE1vZHVsZVxuICpcbiAqIEBtb2R1bGUgbGliL2FjdGlvbnNcbiAqIEBhdXRob3IgSGFzYW4gQWJiYXNcbiAqIEB2ZXJzaW9uIDIuMC4wXG4gKiBAZGVzY3JpcHRpb24gdGVzdCBkZXNjcmlwdGlvblxuICogQGNvcHlyaWdodCBLd2FudHUgTHRkIFJTQSAyMDA5LTIwMTUuXG4gKlxuICovXG5cbi8qKlxuICogIEZvcm0gTW9kdWxlIGFjdGlvbnMgbmVlZHMgdG8gYmUgbW92ZWQgaGVyZS5cbiAqICBUaGlzIGFjdGlvbnMgbW9kdWxlIHdpbGwgYmUgY2VudGFsIHBsYWNlIHRvIGhvbGQgYWxsIGZ1bmN0aW9ucy5cbiAqICBcbiAqL1xuXG52YXIgY29tbXVuaXR5ID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgY3JlYXRlQ29tbXVuaXR5OiBmdW5jdGlvbiAoX2RlZiwgdXVpZCwgX1dGSW5zdGFuY2UpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG5ldyBEYXRlKCkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2VuZGVyVXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XG4gICAgICAgICAgICAgICAgdmFyIHV1aWRDb21tdW5pdHkgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnQ29tbXVuaXR5J10vX2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVDb21tdW5pdHlcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJuZXdDb21tdW5pdHlJZFwiOiBfV0ZJbnN0YW5jZS5wcm9maWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbmRpY2F0b3JVVUlEXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkNvbW11bml0eVwiOiB1dWlkQ29tbXVuaXR5XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hY3Rpb24gPSBhY3Rpb247XG4gICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uICh3b3JrZXJTdWNjZXNzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1dvcmtlciBwcm9jZXNzZWQgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHdvcmtlckZhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdvcmtlckZhaWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHVzZXJKb2luQ29tbXVuaXR5OiBmdW5jdGlvbiAoX2RlZiwgdXVpZCwgX1dGSW5zdGFuY2UpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSxcbiAgICAgICAgcmVsZWFzZUFkb3B0ZWRBcHBsaWNhdGlvbjogZnVuY3Rpb24gKF9kZWYsIHV1aWQsIF9XRkluc3RhbmNlKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5faWQgPSBnZW5lcmF0ZVVVSUQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY29tbXVuaXR5SWQgPSBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYXBwbGljYXRpb25JZCA9IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jcmVhdGVkRGF0ZVRpbWUgPSBuZXcgRGF0ZSgpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xuXG4gICAgICAgICAgICAgICAgdmFyIHV1aWRSZWxlYXNlQWRvcHRlZEFwcGxpY2F0aW9uID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ2Fkb3B0ZWRBcHBsaWNhdGlvbiddL2luc3RhbmNlc1sxXS91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG5cbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICBcInJlbGVhc2VBZG9wdGVkQXBwbGljYXRpb25cIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21tdW5pdHlJZFwiOiBfV0ZJbnN0YW5jZS5wcm9maWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbmRpY2F0b3JVVUlEXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFkb3B0ZWRBcHBsaWNhdGlvblwiOiB1dWlkUmVsZWFzZUFkb3B0ZWRBcHBsaWNhdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbiAod29ya2VyU3VjY2Vzcykge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdXb3JrZXIgcHJvY2Vzc2VzIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICh3b3JrZXJGYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh3b3JrZXJGYWlsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn0pKCk7XG5cbnZhciBhcHBsaWNhdGlvbiA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIGNyZWF0ZUFwcERlZmluaXRpb246IGZ1bmN0aW9uIChfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IHdvcmtlci5nZXRXb3JrZXJXcmFwcGVyKCk7XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbmV3IERhdGUoKS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZW5kZXJVc2VySWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZDtcblxuICAgICAgICAgICAgICAgIHZhciB1dWlkQXBwbGljYXRpb24gPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnQXBwbGljYXRpb24nXS9faWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZUFwcGxpY2F0aW9uXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibmV3QXBwbGljYXRpb25JZFwiOiBfV0ZJbnN0YW5jZS5wcm9maWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbmRpY2F0b3JVVUlEXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkFwcGxpY2F0aW9uXCI6IHV1aWRBcHBsaWNhdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbiAod29ya2VyU3VjY2Vzcykge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdXb3JrZXIgcHJvY2Vzc2VzIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICh3b3JrZXJGYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh3b3JrZXJGYWlsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgYnVpbGRBcHBsaWNhdGlvbjogZnVuY3Rpb24gKF9kZWYsIHV1aWQsIF9XRkluc3RhbmNlKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5faWQgPSBnZW5lcmF0ZVVVSUQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY29tbXVuaXR5SWQgPSBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYXBwbGljYXRpb25JZCA9IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jcmVhdGVkRGF0ZVRpbWUgPSBuZXcgRGF0ZSgpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xuXG4gICAgICAgICAgICAgICAgdmFyIHV1aWRQdWJsaXNoQXBwbGljYXRpb24gPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnUHVibGlzaEFwcGxpY2F0aW9uJ10vaW5zdGFuY2VzWzFdL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcblxuICAgICAgICAgICAgICAgIHZhciB1dWlkQXBwbGljYXRpb25EZWZpbml0aW9uID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ0FwcGxpY2F0aW9uRGVmaW5pdGlvbiddL19pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgIHZhciB1dWlkUm9sZXMgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnUm9sZXMnXS9faWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICB2YXIgdXVpZEFwcGxpY2F0aW9uID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ0FwcGxpY2F0aW9uJ10vX2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgdmFyIHV1aWRBcHBQZXJtaXNzaW9ucyA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdBcHBQZXJtaXNzaW9ucyddL19pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJidWlsZEFwcGxpY2F0aW9uXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYXBwbGljYXRpb25JZFwiOiBfV0ZJbnN0YW5jZS5wcm9maWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbmRpY2F0b3JVVUlEXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlB1Ymxpc2hBcHBsaWNhdGlvblwiOiB1dWlkUHVibGlzaEFwcGxpY2F0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQXBwbGljYXRpb25EZWZpbml0aW9uXCI6IHV1aWRBcHBsaWNhdGlvbkRlZmluaXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSb2xlc1wiOiB1dWlkUm9sZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBcHBsaWNhdGlvblwiOiB1dWlkQXBwbGljYXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBcHBQZXJtaXNzaW9uc1wiOiB1dWlkQXBwUGVybWlzc2lvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24gKHdvcmtlclN1Y2Nlc3MpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya2VyIHByb2Nlc3NlcyBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAod29ya2VyRmFpbCkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIGFwcGxpY2F0aW9uQWRvcHRpb246IGZ1bmN0aW9uIChfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IHdvcmtlci5nZXRXb3JrZXJXcmFwcGVyKCk7XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbmV3IERhdGUoKS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZW5kZXJVc2VySWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZDtcblxuICAgICAgICAgICAgICAgIHZhciB1dWlkQWRvcHRpb24gPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnQWRvcHRpb24nXS9pbnN0YW5jZXNbMV0vdXVpZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuXG4gICAgICAgICAgICAgICAgdmFyIHV1aWRQdWJsaXNoQXBwbGljYXRpb24gPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnUHVibGlzaEFwcGxpY2F0aW9uJ10vX2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgdmFyIHV1aWRBcHBsaWNhdGlvbiA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdBcHBsaWNhdGlvbiddL19pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJhZG9wdEFwcGxpY2F0aW9uXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYXBwbGljYXRpb25JZFwiOiBfV0ZJbnN0YW5jZS5wcm9maWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbmRpY2F0b3JVVUlEXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkFkb3B0aW9uXCI6IHV1aWRBZG9wdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlB1Ymxpc2hBcHBsaWNhdGlvblwiOiB1dWlkUHVibGlzaEFwcGxpY2F0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQXBwbGljYXRpb25cIjogdXVpZEFwcGxpY2F0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hY3Rpb24gPSBhY3Rpb247XG4gICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uICh3b3JrZXJTdWNjZXNzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1dvcmtlciBwcm9jZXNzZXMgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHdvcmtlckZhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdvcmtlckZhaWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICBjcmVhdGVUYXhvbm9teTogZnVuY3Rpb24gKF9kZWYsIHV1aWQsIF9XRkluc3RhbmNlKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5faWQgPSBnZW5lcmF0ZVVVSUQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY29tbXVuaXR5SWQgPSBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYXBwbGljYXRpb25JZCA9IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jcmVhdGVkRGF0ZVRpbWUgPSBuZXcgRGF0ZSgpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xuXG4gICAgICAgICAgICAgICAgdmFyIHRheG9ub215VVVJRCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pbmRpY2F0b3JzW2lkIGVxICdUYXhvbm9teSddL2luc3RhbmNlc1sxXS91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG5cbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZVRheG9ub215XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGF4b25vbXlVVUlEXCI6IHRheG9ub215VVVJRFxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24gKHdvcmtlclN1Y2Nlc3MpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya2VyIHByb2Nlc3NlcyBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAod29ya2VyRmFpbCkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbn0pKCk7XG5cblxuXG52YXIgcGVyZm9ybWFuY2UgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uIChfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IHdvcmtlci5nZXRXb3JrZXJXcmFwcGVyKCk7XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbmV3IERhdGUoKS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZW5kZXJVc2VySWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZDtcblxuICAgICAgICAgICAgICAgIHZhciB1dWlkQ29tbXVuaXR5ID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ3BsYW4nXS9faWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZVBsYW5cIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJwbGFuVVVJRFwiOiB1dWlkQ29tbXVuaXR5XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbiAod29ya2VyU3VjY2Vzcykge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdXb3JrZXIgcHJvY2Vzc2VkIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICh3b3JrZXJGYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh3b3JrZXJGYWlsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNvbmZpZ3VyZU5vZGU6IGZ1bmN0aW9uIChfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IHdvcmtlci5nZXRXb3JrZXJXcmFwcGVyKCk7XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbmV3IERhdGUoKS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZW5kZXJVc2VySWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZDtcblxuICAgICAgICAgICAgICAgIHZhciB1dWlkTm9kZUluU3ViUHJvY2VzcyA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pbmRpY2F0b3JzW2lkIGVxICdub2RlJ10vaW5zdGFuY2VzWzFdL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcblxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29uZmlndXJlTm9kZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcIm5vZGVVVUlEXCI6IHV1aWROb2RlSW5TdWJQcm9jZXNzXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbiAod29ya2VyU3VjY2Vzcykge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdXb3JrZXIgcHJvY2Vzc2VkIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICh3b3JrZXJGYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh3b3JrZXJGYWlsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICB1bmxvY2tQZXJpb2Q6IGZ1bmN0aW9uIChfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHN1YnByb2Nlc3NPYmplY3QgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcblxuICAgICAgICAgICAgICAgIC8vIG1lc3NhZ2UgZnJvbSBzdGVwIDogVE9ETyBcblxuICAgICAgICAgICAgICAgIHZhciBlbnRyeVVVSUQgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbaWQgZXEgJ1wiICsgUEVSSU9EX1NFVF9JRCArIFwiJ10vaW5zdGFuY2VzL3V1aWRcIiwgc3VicHJvY2Vzc09iamVjdCwge30pWzBdO1xuICAgICAgICAgICAgICAgIHZhciBlbmRkYXRlID0gc3VicHJvY2Vzc09iamVjdC5kYXRlcy52YWxpZDtcblxuICAgICAgICAgICAgICAgIGxpYnJhcnkudW5sb2NrUGVyaW9kKGVudHJ5VVVJRCwgZW5kZGF0ZSkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciB1dWlkU2F2ZWRJbmRpY2F0b3IgPSBkYXRhLmlkO1xuXG4gICAgICAgICAgICAgICAgICAgIGRhby5nZXQodXVpZFNhdmVkSW5kaWNhdG9yKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3IgPSBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kaWNhdG9yLl9pZCA9PSBkYXRhLl9pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1VubG9jayBwZXJpb2QuJywgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG5cblxuXG5cblxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXRNb2RlbFN0YXR1czogZnVuY3Rpb24gKF9kZWYsIHV1aWQsIF9XRkluc3RhbmNlKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cblxuICAgICAgICAgICAgICAgIHZhciBzdWJwcm9jZXNzT2JqZWN0ID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgdmFyIGVudHJ5VVVJRCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tpZCBlcSAnXCIgKyBQRVJJT0RfU0VUX0lEICsgXCInXS9pbnN0YW5jZXMvdXVpZFwiLCBzdWJwcm9jZXNzT2JqZWN0LCB7fSlbMF07XG4gICAgICAgICAgICAgICAgdmFyIGVuZGRhdGUgPSBzdWJwcm9jZXNzT2JqZWN0LmRhdGVzLnZhbGlkO1xuXG4gICAgICAgICAgICAgICAgdmFyIHN0YXR1c2kxOG5MYWJlbCA9IEpTT04ueHBhdGgoXCIvbGFiZWxcIiwgX2RlZiAsIHt9KVswXTtcbiAgICAgICAgICAgICAgICB2YXIgc3RhdHVzID0gaGVscGVyLmdldExhbmd1YWdlTWVzc2FnZShzdGF0dXNpMThuTGFiZWwpO1xuXG5cbiAgICAgICAgICAgICAgICBsaWJyYXJ5LnNldFBlcmlvZFN0YXR1cyhlbnRyeVVVSUQsIGVuZGRhdGUsIHN0YXR1cykudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciB1dWlkU2F2ZWRJbmRpY2F0b3IgPSBkYXRhLmlkO1xuICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAvL2JlbG93IHNlY3Rpb24gd2lsbCBiZSB1bmNvbW1lbnRlZCBhbmQgcmV0dXJuZWQgaW5kaWNhdG9yIG1vZGVsIHdpbGwgYmUgcmVmcmVzaGVkIGFuZCB1ZHBhdGVkIHRvIHdvcmtmbG93IG9iamVjdCAuIFVuY29tbWVudCBiZWxvdyBjb2RlIG9uY2Ugc2F0aW5kZXIgaXMgZG9uZSB3aXRoIHRoZSBmdW5jdGlvbi5cblxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgZGFvLmdldCh1dWlkU2F2ZWRJbmRpY2F0b3IpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IF9XRkluc3RhbmNlLmluZGljYXRvcnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvciA9IF9XRkluc3RhbmNlLmluZGljYXRvcnNbaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRpY2F0b3IuX2lkID09IGRhdGEuX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5wdXNoKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2Vzcygnc2V0TW9kZWxTdGF0dXMnLCBkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIH0pOyBcblxuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG5cblxuXG5cblxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgIFxuICAgICAgICBsb2NrUGVyZm9ybWFuY2VNb2RlbDogZnVuY3Rpb24gKF9kZWYsIHV1aWQsIF9XRkluc3RhbmNlKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgc3VicHJvY2Vzc09iamVjdCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuXG4gICAgICAgICAgICAgICAgdmFyIGVudHJ5VVVJRCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tpZCBlcSAnXCIgKyBQRVJGT1JNQU5DRV9TRVRfSUQgKyBcIiddL2luc3RhbmNlcy91dWlkXCIsIHN1YnByb2Nlc3NPYmplY3QsIHt9KVswXTtcbiAgICAgICAgICAgICAgICB2YXIgZW5kZGF0ZSA9IHN1YnByb2Nlc3NPYmplY3QuZGF0ZXMudmFsaWQ7XG5cbiAgICAgICAgICAgICAgICBsaWJyYXJ5LmxvY2tQZXJmb3JtYW5jZU1vZGVsKGVudHJ5VVVJRCwgZW5kZGF0ZSkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciB1dWlkU2F2ZWRJbmRpY2F0b3IgPSBkYXRhLmlkO1xuXG4gICAgICAgICAgICAgICAgICAgIGRhby5nZXQodXVpZFNhdmVkSW5kaWNhdG9yKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3IgPSBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kaWNhdG9yLl9pZCA9PSBkYXRhLl9pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0xvY2sgcGVyZm9ybWFuY2UgbW9kZWwuJywgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG5cblxuXG5cblxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59KSgpO1xuXG52YXIgc2RvID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgY3JlYXRlOiBmdW5jdGlvbiAoX2RlZiwgdXVpZCwgX1dGSW5zdGFuY2UpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG5ldyBEYXRlKCkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2VuZGVyVXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XG5cbiAgICAgICAgICAgICAgICB2YXIgc2RvVVVJRCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pbmRpY2F0b3JzW2lkIGVxICdTRE8nXS9pbnN0YW5jZXNbMV0vdXVpZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVTRE9cIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJzZG9VVUlEXCI6IHNkb1VVSURcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hY3Rpb24gPSBhY3Rpb247XG4gICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uICh3b3JrZXJTdWNjZXNzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1dvcmtlciBwcm9jZXNzZXMgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHdvcmtlckZhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdvcmtlckZhaWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgIGVucm9sbENvdXJzZTogZnVuY3Rpb24gKF9kZWYsIHV1aWQsIF9XRkluc3RhbmNlKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5faWQgPSBnZW5lcmF0ZVVVSUQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY29tbXVuaXR5SWQgPSBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYXBwbGljYXRpb25JZCA9IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jcmVhdGVkRGF0ZVRpbWUgPSBuZXcgRGF0ZSgpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xuXG4gICAgICAgICAgICAgICAgdmFyIGVucm9sbG1lbnRVVUlEID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ05USVBjb3Vyc2VFbnJvbGxtZW50VERNUCddL2luc3RhbmNlc1sxXS91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG5cbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICBcImVucm9sbENvdXJzZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvdXJzZVVVSURcIjogZW5yb2xsbWVudFVVSURcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hY3Rpb24gPSBhY3Rpb247XG4gICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uICh3b3JrZXJTdWNjZXNzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1dvcmtlciBwcm9jZXNzZXMgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHdvcmtlckZhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdvcmtlckZhaWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG59KSgpO1xuXG52YXIgdGF4b25vbXkgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uIChfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IHdvcmtlci5nZXRXb3JrZXJXcmFwcGVyKCk7XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbmV3IERhdGUoKS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZW5kZXJVc2VySWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZDtcblxuICAgICAgICAgICAgICAgIHZhciB0YXhvbm9teVVVSUQgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnVGF4b25vbXknXS9pbnN0YW5jZXNbMV0vdXVpZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVUYXhvbm9teVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInRheG9ub215VVVJRFwiOiB0YXhvbm9teVVVSURcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hY3Rpb24gPSBhY3Rpb247XG4gICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uICh3b3JrZXJTdWNjZXNzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1dvcmtlciBwcm9jZXNzZXMgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHdvcmtlckZhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdvcmtlckZhaWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG59KSgpO1xuXG52YXIgc3ViUHJvY2Vzc0luc3RhbmNlID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgc2V0VGl0bGU6IGZ1bmN0aW9uIChfZGVmLCB1dWlkLCBkYXRhVmFsdWUsIF9XRkluc3RhbmNlKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgc3BQcm9jZXNzT2JqZWN0ID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddXCIsIGFwcC5TQ09QRS53b3JrZmxvdywge30pWzBdO1xuICAgICAgICAgICAgICAgIHNwUHJvY2Vzc09iamVjdC5sYWJlbCA9IGRhdGFWYWx1ZTtcblxuICAgICAgICAgICAgICAgIHZhciBpdGVtc1RvUHJvY2VzcyA9IDE7XG4gICAgICAgICAgICAgICAgdmFyIHN0dWZmID0gW107XG4gICAgICAgICAgICAgICAgdmFyIG9iaiA9IHt9O1xuXG4gICAgICAgICAgICAgICAgb2JqLm1vZGVsID0gX1dGSW5zdGFuY2UuaW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgc3R1ZmYucHVzaChvYmopO1xuICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdTdWJwcm9jZXNzIHNldFRpdGxlIHN1Y2Nlc3MuJywgX1dGSW5zdGFuY2UuaW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIHNldFZhbGlkRGF0ZTogZnVuY3Rpb24gKF9kZWYsIHV1aWQsIGRhdGFWYWx1ZSwgX1dGSW5zdGFuY2UpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgICAgIHZhciBzcFByb2Nlc3NPYmplY3QgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ11cIiwgYXBwLlNDT1BFLndvcmtmbG93LCB7fSlbMF07XG4gICAgICAgICAgICAgICAgc3BQcm9jZXNzT2JqZWN0LmRhdGVzLnZhbGlkID0gZGF0YVZhbHVlO1xuXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW1zVG9Qcm9jZXNzID0gMTtcbiAgICAgICAgICAgICAgICB2YXIgc3R1ZmYgPSBbXTtcbiAgICAgICAgICAgICAgICB2YXIgb2JqID0ge307XG5cbiAgICAgICAgICAgICAgICBvYmoubW9kZWwgPSBzcFByb2Nlc3NPYmplY3Q7XG4gICAgICAgICAgICAgICAgc3R1ZmYucHVzaChvYmopO1xuXG4gICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ3ZhbGlkIGRhdGUgc2V0LicsIF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlcyk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxufSkoKTtcblxudmFyIHZhcmlhYmxlcyA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIHNldFZhcmlhYmxlOiBmdW5jdGlvbiAoc2V0VmFyaWFibGUsIF9XRkluc3RhbmNlLCB1dWlkKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICBoZWxwZXIuZ2V0Tm9kZVZhbHVlKHNldFZhcmlhYmxlLmRhdGEsIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uIChkYXRhVmFsdWUpIHtcblxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzY29wZSA9IHNldFZhcmlhYmxlLnNjb3BlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmFyaWFibGVOYW1lID0gc2V0VmFyaWFibGUubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhcmlhYmxlVHlwZSA9IHNldFZhcmlhYmxlLnZhcmlhYmxlVHlwZTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsaWREYXRlID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2RhdGVzL3ZhbGlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG5cbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChzY29wZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncHJvZmlsZSc6XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvZmlsZVZhcmlhYmxlRmlsZU5hbWUgPSBwcm9maWxlSWQgKyAnOnZhcmlhYmxlcyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGFvLmdldChwcm9maWxlVmFyaWFibGVGaWxlTmFtZSkudGhlbihmdW5jdGlvbiAoZmlsZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YXJpYWJsZVR5cGUgPT0gJ3BlcmlvZGljJykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBPdmVyd3JpdGUgdGhlIGV4aXN0aW5nIHZhcmlhYmxlIGluIGNhc2Ugd2hlcmUgc2FtZSB2YXJpYWJsZSBpcyBhc3NpZ25lZCBhdCBtdWx0aXBsZSBzdGVwcy5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb2Nlc3NPYmogPSBKU09OLnhwYXRoKFwiL2luc3RhbmNlL3Byb2Nlc3Nlc1tzdWJQcm9jZXNzZXMvdXVpZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlcSA9IHByb2Nlc3NPYmouc2VxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9iaiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN1YlByb2Nlc3NVVUlEXCI6IHV1aWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VyTmFtZVwiOiBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVzZXJJZFwiOiBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJQcm9maWxlSWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VxXCI6IHNlcSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbGlkRGF0ZVwiOiB2YWxpZERhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBkYXRhVmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZmlsZVt2YXJpYWJsZU5hbWVdICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZhbCgnZmlsZS4nICsgdmFyaWFibGVOYW1lICsgJy5wdXNoKG9iaiknKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZVt2YXJpYWJsZU5hbWVdID0gW29ial07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVbdmFyaWFibGVOYW1lXSA9IGRhdGFWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhby51cHNlcnQoZmlsZSkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShcIlZhcmlhYmxlIHNldCBzdWNjZXNzZnVsbHlcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiRmFpbGVkIHRvIHNldCBWYXJpYWJsZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlsZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiX2lkXCI6IHByb2ZpbGVWYXJpYWJsZUZpbGVOYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZS5jaGFubmVscyA9IGFwcC5wcm9maWxlLmNoYW5uZWxzO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YXJpYWJsZVR5cGUgPT0gJ3BlcmlvZGljJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb2Nlc3NPYmogPSBKU09OLnhwYXRoKFwiL2luc3RhbmNlL3Byb2Nlc3Nlc1tzdWJQcm9jZXNzZXMvdXVpZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlcSA9IHByb2Nlc3NPYmouc2VxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZVt2YXJpYWJsZU5hbWVdID0gW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN1YlByb2Nlc3NVVUlEXCI6IHV1aWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VyTmFtZVwiOiBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVzZXJJZFwiOiBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJQcm9maWxlSWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VxXCI6IHNlcSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbGlkRGF0ZVwiOiB2YWxpZERhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBkYXRhVmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZVt2YXJpYWJsZU5hbWVdID0gZGF0YVZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGFvLnVwc2VydChmaWxlKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKFwiVmFyaWFibGUgc2V0IHN1Y2Nlc3NmdWxseVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJGYWlsZWQgdG8gc2V0IFZhcmlhYmxlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3ViUHJvY2Vzc0luc3RhbmNlJzpcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoXCJub3QgaW1wbGVtZW50ZWRcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N0ZXAnOlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShcIm5vdCBpbXBsZW1lbnRlZFwiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3ViUHJvZmlsZVN1YlByb2Nlc3NJbnN0YW5jZSc6XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3ViUHJvZmlsZUlkID0gYXBwLnByb2ZpbGUuc3VicHJvZmlsZUlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWJQcm9maWxlVmFyaWFibGVGaWxlTmFtZSA9IHN1YlByb2ZpbGVJZCArICc6dmFyaWFibGVzJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYW8uZ2V0KHN1YlByb2ZpbGVWYXJpYWJsZUZpbGVOYW1lKS50aGVuKGZ1bmN0aW9uIChmaWxlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhcmlhYmxlVHlwZSA9PSAncGVyaW9kaWMnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJ0ID0gbGlicmFyeS5nZXRTdWJwcm9maWxlU3VicHJvY2Vzc0lkcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlcSA9IEpTT04ueHBhdGgoXCJjb3VudCgvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9wcmVjZWRpbmctc2libGluZzo6bm9kZSgpW2lkID0gL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaWQgYW5kIF9pZCA9IC9zdWJwcm9jZXNzZXNbX2lkID0gXCIrcGFydCtcIl0vX2lkXSlcIiwgX1dGSW5zdGFuY2UsIHt9KVswXSArIDE7ICAgICAgICAgICAgICAgICAgIFxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJQcm9jZXNzVVVJRFwiOiB1dWlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlclwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlck5hbWVcIjogTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VybmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VySWRcIjogTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VyUHJvZmlsZUlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlcVwiOiBzZXEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWxpZERhdGVcIjogdmFsaWREYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZGF0YVZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGZpbGVbdmFyaWFibGVOYW1lXSAhPSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2YWwoJ2ZpbGUuJyArIHZhcmlhYmxlTmFtZSArICcucHVzaChvYmopJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVbdmFyaWFibGVOYW1lXSA9IFtvYmpdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlW3ZhcmlhYmxlTmFtZV0gPSBkYXRhVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYW8udXBzZXJ0KGZpbGUpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoXCJWYXJpYWJsZSBhdCBzdWJwcm9maWxlIHNldCBzdWNjZXNzZnVsbHlcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiRmFpbGVkIHRvIHNldCBWYXJpYWJsZSBhdCBzdWJwcm9maWxlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaWxlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJfaWRcIjogc3ViUHJvZmlsZVZhcmlhYmxlRmlsZU5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlLmNoYW5uZWxzID0gYXBwLnByb2ZpbGUuY2hhbm5lbHM7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhcmlhYmxlVHlwZSA9PSAncGVyaW9kaWMnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciBwcm9jZXNzT2JqID0gSlNPTi54cGF0aChcIi9pbnN0YW5jZS9wcm9jZXNzZXNbc3ViUHJvY2Vzc2VzL3V1aWQgZXEgJ1wiICsgdXVpZCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIHNlcSA9IHByb2Nlc3NPYmouc2VxO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciBzZXEgPSBKU09OLnhwYXRoKFwiY291bnQoL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vcHJlY2VkaW5nLXNpYmxpbmc6Om5vZGUoKVtpZCA9IC9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2lkIGFuZCBpZCA9IC9zdWJwcm9jZXNzZXNbX2lkID0gL2luc3RhbmNlL3Byb2Nlc3Nlcy9zdWJQcm9jZXNzZXNbc3VicHJvZmlsZUlkIGVxICdcIiArIHN1YlByb2ZpbGVJZCArIFwiJ10vdXVpZF0vX2lkXSlcIiwgX1dGSW5zdGFuY2UsIHt9KVswXSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFydCA9IGxpYnJhcnkuZ2V0U3VicHJvZmlsZVN1YnByb2Nlc3NJZHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZXEgPSBKU09OLnhwYXRoKFwiY291bnQoL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vcHJlY2VkaW5nLXNpYmxpbmc6Om5vZGUoKVtpZCA9IC9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2lkIGFuZCBfaWQgPSAvc3VicHJvY2Vzc2VzW19pZCA9IFwiK3BhcnQrXCJdL19pZF0pXCIsIF9XRkluc3RhbmNlLCB7fSlbMF0gKyAxOyAgICAgICAgICAgICAgICAgICBcblxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVbdmFyaWFibGVOYW1lXSA9IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJQcm9jZXNzVVVJRFwiOiB1dWlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlclwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlck5hbWVcIjogTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VybmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VySWRcIjogTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VyUHJvZmlsZUlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlcVwiOiBzZXEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWxpZERhdGVcIjogdmFsaWREYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZGF0YVZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVbdmFyaWFibGVOYW1lXSA9IGRhdGFWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhby51cHNlcnQoZmlsZSkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShcIlZhcmlhYmxlIGF0IHN1YnByb2ZpbGUgc2V0IHN1Y2Nlc3NmdWxseVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJGYWlsZWQgdG8gc2V0IFZhcmlhYmxlIGF0IHN1YnByb2ZpbGVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChcImdldE5vZGVWYWx1ZSB2YWx1ZSBub3QgZm91bmQuXCIpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG5cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG59KSgpO1xuXG52YXIgbm90aWZpY2F0aW9uID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgc2VuZE5vdGlmaWNhdGlvbldvcmtlcjogZnVuY3Rpb24gKG5vdGlmaWNhdGlvbiwgX1dGSW5zdGFuY2UsIHV1aWQpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuXG4gICAgICAgICAgICAgICAgdmFyIGdldFJlY2lwaWVudHMgPSBmdW5jdGlvbihub3RpZmljYXRpb24pIHtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlY2lwaWVudHMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5vdGlmaWNhdGlvbi5yZWNpcGllbnRzLnJvbGUgIT0gdW5kZWZpbmVkKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY2lwaWVudHMucm9sZSA9IG5vdGlmaWNhdGlvbi5yZWNpcGllbnRzLnJvbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZWNpcGllbnRzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKG5vdGlmaWNhdGlvbi5yZWNpcGllbnRzLnByb2ZpbGVSb2xlICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjaXBpZW50cy5wcm9maWxlUm9sZSA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY2lwaWVudHMucHJvZmlsZVJvbGUucm9sZSA9IG5vdGlmaWNhdGlvbi5yZWNpcGllbnRzLnByb2ZpbGVSb2xlLnJvbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjaXBpZW50cy5wcm9maWxlUm9sZS5wcm9maWxlID0gbm90aWZpY2F0aW9uLnJlY2lwaWVudHMucHJvZmlsZVJvbGUucHJvZmlsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlY2lwaWVudHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKG5vdGlmaWNhdGlvbi5yZWNpcGllbnRzLnN1YlByb2ZpbGVSb2xlICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjaXBpZW50cy5zdWJQcm9maWxlUm9sZSA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY2lwaWVudHMuc3ViUHJvZmlsZVJvbGUucm9sZSA9IG5vdGlmaWNhdGlvbi5yZWNpcGllbnRzLnN1YlByb2ZpbGVSb2xlLnJvbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjaXBpZW50cy5zdWJQcm9maWxlUm9sZS5zdWJQcm9maWxlQ2F0ZWdvcnkgPSBub3RpZmljYXRpb24ucmVjaXBpZW50cy5zdWJQcm9maWxlUm9sZS5zdWJQcm9maWxlQ2F0ZWdvcnk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjaXBpZW50cy5zdWJQcm9maWxlUm9sZS5wcm9maWxlID0gbm90aWZpY2F0aW9uLnJlY2lwaWVudHMuc3ViUHJvZmlsZVJvbGUucHJvZmlsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlY2lwaWVudHMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYobm90aWZpY2F0aW9uLnJlY2lwaWVudHMuZnVuY3Rpb24gIT0gdW5kZWZpbmVkKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY2lwaWVudHMuZnVuY3Rpb24gPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNpcGllbnRzLmZ1bmN0aW9uLnVzZXJzID0ge307XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWxwZXIuZ2V0Tm9kZVZhbHVlKG5vdGlmaWNhdGlvbi5yZWNpcGllbnRzLmZ1bmN0aW9uLnVzZXJzLCBfV0ZJbnN0YW5jZSwgdXVpZCkudGhlbihmdW5jdGlvbiAoZGF0YVZhbHVlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjaXBpZW50cy5mdW5jdGlvbi51c2VycyA9ICBkYXRhVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVjaXBpZW50cyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlaihlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG5ldyBEYXRlKCkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2VuZGVyVXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Lm1lc3NhZ2VUeXBlID0gXCJub3RpZmljYXRpb25cIjtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB2YXIgc3ViUHJvZmlsZUlkID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIisgdXVpZCArXCInXS9tZXRhLWRhdGEvc3VicHJvZmlsZUlkXCIsIF9XRkluc3RhbmNlICx7fSlbMF07XG5cbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICBcIm5vdGlmaWNhdGlvblwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjoge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlVHlwZVwiOlwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm1ldGEtZGF0YVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHBsaWNhdGlvbklkXCI6IF9XRkluc3RhbmNlLmFwcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbW11bml0eUlkXCI6IF9XRkluc3RhbmNlLmNvbW11bml0eUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZmlsZUlkXCI6IF9XRkluc3RhbmNlLnByb2ZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJQcm9jZXNzVVVJRFwiOiB1dWlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3ViUHJvZmlsZUlkXCI6IHN1YlByb2ZpbGVJZFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibm90aWZpY2F0aW9uVHlwZVwiOlwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6XCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmVjaXBpZW50c1wiOiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcImtleXNcIjp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxlXCI6e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOlwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tbXVuaXR5XCI6e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6XCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHBsaWNhdGlvblwiOntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOlwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY3VycmVudFVzZXJcIjp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjpcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN1YlByb2Nlc3NcIjp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjpcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICogXG4gICAgICAgICAgICAgICAgS2V5cyBtZXNzYWdlIFxuICAgICAgICAgICAgICAgICovXG5cbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMucHJvZmlsZS5uYW1lID0gYXBwLnByb2ZpbGUudGl0bGU7XG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLnByb2ZpbGUuaWQgPSBhcHAucHJvZmlsZS5faWQ7XG5cbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMuY29tbXVuaXR5Lm5hbWUgPSBhcHAuZ2V0TmFtZUJ5TGFuZyhMT0NBTF9TRVRUSU5HUy5DT01NVU5JVFlfQ09ORklHLmNvbW11bml0eU5hbWUpO1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5jb21tdW5pdHkuaWQgPSBMT0NBTF9TRVRUSU5HUy5DT01NVU5JVFlfQ09ORklHLmNvbW11bml0eUlkO1xuXG4gICAgICAgICAgICAgICAgdmFyIGFwcGxpY2F0aW9uID0gSlNPTi54cGF0aChcIi9hcHBsaWNhdGlvbnNbYXBwSWQgZXEgJ1wiICsgYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQgKyBcIiddXCIsIExPQ0FMX1NFVFRJTkdTLkNPTU1VTklUWV9DT05GSUcsIHt9KVswXTtcblxuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5hcHBsaWNhdGlvbi5uYW1lID0gYXBwLmdldE5hbWVCeUxhbmcoYXBwbGljYXRpb24ubmFtZSk7XG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLmFwcGxpY2F0aW9uLmlkID0gYXBwbGljYXRpb24uYXBwSWQ7XG5cbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMuY3VycmVudFVzZXIubmFtZSA9IExPQ0FMX1NFVFRJTkdTLlNFU1NJT04uZmlyc3ROYW1lICsgXCIgXCIgKyBMT0NBTF9TRVRUSU5HUy5TRVNTSU9OLmxhc3ROYW1lO1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5jdXJyZW50VXNlci5pZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xuXG5cbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMuc3ViUHJvY2Vzcy5uYW1lID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIisgdXVpZCArXCInXS9sYWJlbFwiLCBfV0ZJbnN0YW5jZSAsIHt9KVswXTtcbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMuc3ViUHJvY2Vzcy5pZCA9IHV1aWQ7XG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAqIFxuICAgICAgICAgICAgICAgIFdvcmtlciBtZXNzYWdlIFxuICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5tZXNzYWdlLmRlZmF1bHQgPSBub3RpZmljYXRpb24ubWVzc2FnZS5kZWZhdWx0O1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubWVzc2FnZS50aXRsZSA9IG5vdGlmaWNhdGlvbi5tZXNzYWdlLnRpdGxlO1xuXG4gICAgICAgICAgICAgICAgaWYobm90aWZpY2F0aW9uLm1lc3NhZ2UucnRmICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubWVzc2FnZS5ydGYgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgaWYobm90aWZpY2F0aW9uLm1lc3NhZ2UucnRmLnRlbXBsYXRlIT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubWVzc2FnZS5ydGYudGVtcGxhdGUgPSBub3RpZmljYXRpb24ubWVzc2FnZS5ydGYudGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobm90aWZpY2F0aW9uLm1lc3NhZ2UucnRmLm1hcmt1cCE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm1lc3NhZ2UucnRmLm1hcmt1cCA9IG5vdGlmaWNhdGlvbi5tZXNzYWdlLnJ0Zi5tYXJrdXA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgKiBcbiAgICAgICAgICAgICAgICBXb3JrZXIgbWVzc2FnZVR5cGUgXG4gICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm1lc3NhZ2VUeXBlID0gbm90aWZpY2F0aW9uLm1lc3NhZ2VUeXBlO1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICogXG4gICAgICAgICAgICAgICAgV29ya2VyIG5vdGlmaWNhdGlvblR5cGUgXG4gICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvblR5cGUgPSBub3RpZmljYXRpb24ubm90aWZpY2F0aW9uVHlwZTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAqIFxuICAgICAgICAgICAgICAgIFdvcmtlciBwcmlvcml0eSBcbiAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ucHJpb3JpdHkgPSBub3RpZmljYXRpb24ucHJpb3JpdHk7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgKiBcbiAgICAgICAgICAgICAgICBXb3JrZXIgbm90aWZpY2F0aW9uQWN0aW9uIGlmIGV4aXN0cyBcbiAgICAgICAgICAgICAgICAqL1xuXG4gICAgICAgICAgICAgICAgaWYobm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbkFjdGlvbiAhPSB1bmRlZmluZWQpe1xuXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubm90aWZpY2F0aW9uQWN0aW9uID0ge307XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubm90aWZpY2F0aW9uQWN0aW9uLmxhYmVsID0gbm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbkFjdGlvbi5sYWJlbDtcbiAgICAgICAgICAgICAgICAgICAgaWYobm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbkFjdGlvbi5hY3Rpb24uVVJJICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uLlVSSSA9IG5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uLlVSSTtcbiAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKG5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uLmdvdG8gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uLmdvdG8gPSBub3RpZmljYXRpb24ubm90aWZpY2F0aW9uQWN0aW9uLmFjdGlvbi5nb3RvO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICBcblxuXG4gICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICogXG4gICAgICAgICAgICAgICAgV29ya2VyIHJlY2lwaWVudHNcbiAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGdldFJlY2lwaWVudHMobm90aWZpY2F0aW9uKS50aGVuKGZ1bmN0aW9uKHJlY2lwaWVudCl7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ucmVjaXBpZW50cyA9IHJlY2lwaWVudDtcbiAgICAgICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uICh3b3JrZXJTdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh3b3JrZXJPYmplY3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ05vdGlmaWNhdGlvbiBXb3JrZXIgcHJvY2Vzc2VzIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHdvcmtlckZhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUod29ya2VyRmFpbCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpe1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm90aWZpY2F0aW9uIC0gZ2V0UmVjaXBpZW50cyBmYWlsZWQgd2l0aCBlcnJvciBcIisgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG5cblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cblxuICAgIH1cblxufSkoKTtcblxuXG52YXIgcmVwb3J0ID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIHJldHVybiB7XG5cblxuXG5cbiAgICAgICAgY3JlYXRlUGVyZm9ybWFuY2VSZXBvcnQ6IGZ1bmN0aW9uIChwZXJmb3JtYW5jZVJlcG9ydE9iamVjdCwgX1dGSW5zdGFuY2UsIHV1aWQpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG5ldyBEYXRlKCkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2VuZGVyVXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XG5cbiAgICAgICAgICAgICAgICB2YXIgd29ya3BsYW5TZXRJZCA9IHBlcmZvcm1hbmNlUmVwb3J0T2JqZWN0LndvcmtwbGFuU2V0SWQ7XG4gICAgICAgICAgICAgICAgdmFyIGNvbmZpZ1NldElkID0gcGVyZm9ybWFuY2VSZXBvcnRPYmplY3QuY29uZmlnU2V0SWQ7XG5cblxuICAgICAgICAgICAgICAgIC8vIHdvcmtwbGFuU2V0SWQgc2NvcGUgaXMgcHJvZmlsZVxuICAgICAgICAgICAgICAgIC8vIGNvbmZpZ1NldElkIHNjb3BlIGlzIHN1YnByb2Nlc3Nlc1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHZhciB3b3JrcGxhblVVSUQgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnXCIrIHdvcmtwbGFuU2V0SWQgK1wiJ10vX2lkXCIsYXBwLlNDT1BFLndvcmtmbG93LCB7fSlbMF07XG4gICAgICAgICAgICAgICAgdmFyIGNvbmZpZ1VVSUQgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnXCIrIGNvbmZpZ1NldElkICtcIiddL2luc3RhbmNlc1sxXS91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZVBlcmZvcm1hbmNlUmVwb3J0XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwid29ya3BsYW5VVUlEXCI6IHdvcmtwbGFuVVVJRCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29uZmlnVVVJRFwiOiBjb25maWdVVUlELFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxJZFwiOiBfV0ZJbnN0YW5jZS5wcm9maWxlICAgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24gKHdvcmtlclN1Y2Nlc3MpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya3BsYW5SZXBvcnQgV29ya2VyIHByb2Nlc3NlZCBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAod29ya2VyRmFpbCkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZVJlcG9ydDogZnVuY3Rpb24gKGNyZWF0ZVJlcG9ydCwgX1dGSW5zdGFuY2UsIHV1aWQpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG5ldyBEYXRlKCkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2VuZGVyVXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XG5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB2YXIgcGVyZm9ybWFuY2VSZXBvcnREZWZpbml0aW9uID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ1BlcmZvcm1hbmNlUmVwb3J0RGVmaW5pdGlvbiddL19pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgIHZhciByZXBvcnRpbmdTRE8gPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAncmVwb3J0aW5nU0RPJ10vaW5zdGFuY2VzWzFdL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcblxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIFwiY3JlYXRlUmVwb3J0XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGVyZm9ybWFuY2VSZXBvcnREZWZpbml0aW9uXCI6IHBlcmZvcm1hbmNlUmVwb3J0RGVmaW5pdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmVwb3J0aW5nU0RPXCI6IHJlcG9ydGluZ1NETyxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZmlsSWRcIjogX1dGSW5zdGFuY2UucHJvZmlsZSAgIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hY3Rpb24gPSBhY3Rpb247XG4gICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uICh3b3JrZXJTdWNjZXNzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1JlcHJvdCBXb3JrZXIgcHJvY2Vzc2VkIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICh3b3JrZXJGYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh3b3JrZXJGYWlsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG59KSgpO1xuXG52YXIgd29ya2VyID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgZ2V0V29ya2VyV3JhcHBlcjogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICB2YXIgd3JhcHBlciA9IHtcbiAgICAgICAgICAgICAgICBcInNvdXJjZVwiOiBcInJlbW90ZVwiLFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIndvcmtlck9iamVjdFwiLFxuICAgICAgICAgICAgICAgIFwiX2lkXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgXCJjaGFubmVsc1wiOiBbXSxcbiAgICAgICAgICAgICAgICBcImNvbW11bml0eUlkXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgXCJhcHBsaWNhdGlvbklkXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgXCJtZXNzYWdlVHlwZVwiOiBcImluZm9cIixcbiAgICAgICAgICAgICAgICBcImNyZWF0ZWREYXRlVGltZVwiOiBcIlwiLFxuICAgICAgICAgICAgICAgIFwic2VuZGVyVXNlcklkXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgXCJhY3Rpb25cIjoge1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXR1cm4gd3JhcHBlcjtcblxuICAgICAgICB9LFxuICAgICAgICBzZW5kOiBmdW5jdGlvbiAod29ya2VyT2JqZWN0KSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU3VibWl0dGluZyBXb3JrZXIgT2JqZWN0IHRvIHNlcnZlcicpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHdvcmtlck9iamVjdCk7XG4gICAgICAgICAgICAgICAgZGFvLnNhdmUod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uICh3b3JrZXJSZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHdvcmtlclJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBzdWJtaXR0aW5nIHdvcmtlciByZXNwb25zZSAhIScgKyBlcnIpO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIHNlbmRXb3JrZXI6IGZ1bmN0aW9uICh3b3JrZXJDb25maWcsIF9XRkluc3RhbmNlLCB1dWlkKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5faWQgPSBnZW5lcmF0ZVVVSUQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY29tbXVuaXR5SWQgPSBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYXBwbGljYXRpb25JZCA9IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jcmVhdGVkRGF0ZVRpbWUgPSBuZXcgRGF0ZSgpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xuXG4gICAgICAgICAgICAgICAgdmFyIHByb2Nlc3NHZXROb2RlVmFsdWUgPSBmdW5jdGlvbihwYXJhbUJsb2NrLCBzZXEsIHBhcmFtTmFtZSl7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzLCByZWope1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWxwZXIuZ2V0Tm9kZVZhbHVlKHBhcmFtQmxvY2ssIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uIChkYXRhVmFsdWUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlcVwiOnNlcSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmFtTmFtZVwiOnBhcmFtTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRhdGFWYWx1ZVwiOmRhdGFWYWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWooZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHZhciBwcm9jZXNzUGFyYW1zID0gZnVuY3Rpb24oY29uZmlnUGFyYW0pIHtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzLCByZWope1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmFtZXRlcnNBcnJheSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW1zVG9Qcm9jZXNzID0gY29uZmlnUGFyYW0ubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBpPTA7IGk8Y29uZmlnUGFyYW0ubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJhbUJsb2NrID0gY29uZmlnUGFyYW1baV0ucGFyYW1ldGVyVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlcSA9IGNvbmZpZ1BhcmFtW2ldLnNlcTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFyYW1OYW1lID0gY29uZmlnUGFyYW1baV0ucGFyYW1ldGVyTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFyYW1WYWx1ZSA9IHByb2Nlc3NHZXROb2RlVmFsdWUocGFyYW1CbG9jaywgc2VxLCBwYXJhbU5hbWUpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnNBcnJheS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VxXCI6IHJlc3BvbnNlLnNlcSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFyYW1OYW1lXCI6IHJlc3BvbnNlLnBhcmFtTmFtZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmFtVmFsdWVcIjogcmVzcG9uc2UuZGF0YVZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNUb1Byb2Nlc3MtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zVG9Qcm9jZXNzID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnNBcnJheS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlcVwiOiBpdGVtc1RvUHJvY2VzcysxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFyYW1OYW1lXCI6IFwiY29tbXVuaXR5SWRcIiwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJhbVZhbHVlXCI6IF9XRkluc3RhbmNlLmNvbW11bml0eUlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVyc0FycmF5LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VxXCI6IGl0ZW1zVG9Qcm9jZXNzKzIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJhbU5hbWVcIjogXCJhcHBsaWNhdGlvbklkXCIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFyYW1WYWx1ZVwiOiBfV0ZJbnN0YW5jZS5hcHBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzQXJyYXkucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZXFcIjogaXRlbXNUb1Byb2Nlc3MrMyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmFtTmFtZVwiOiBcInByb2ZpbGVJZFwiLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmFtVmFsdWVcIjogX1dGSW5zdGFuY2UucHJvZmlsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnNBcnJheS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlcVwiOiBpdGVtc1RvUHJvY2Vzcys0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFyYW1OYW1lXCI6IFwic3ViUHJvY2Vzc1VVSURcIiwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJhbVZhbHVlXCI6IHV1aWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMocGFyYW1ldGVyc0FycmF5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNUb1Byb2Nlc3MtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zVG9Qcm9jZXNzID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnNBcnJheS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlcVwiOiBpdGVtc1RvUHJvY2VzcysxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFyYW1OYW1lXCI6IFwiY29tbXVuaXR5SWRcIiwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJhbVZhbHVlXCI6IF9XRkluc3RhbmNlLmNvbW11bml0eUlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVyc0FycmF5LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VxXCI6IGl0ZW1zVG9Qcm9jZXNzKzIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJhbU5hbWVcIjogXCJhcHBsaWNhdGlvbklkXCIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFyYW1WYWx1ZVwiOiBfV0ZJbnN0YW5jZS5hcHBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzQXJyYXkucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZXFcIjogaXRlbXNUb1Byb2Nlc3MrMyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmFtTmFtZVwiOiBcInByb2ZpbGVJZFwiLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmFtVmFsdWVcIjogX1dGSW5zdGFuY2UucHJvZmlsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnNBcnJheS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlcVwiOiBpdGVtc1RvUHJvY2Vzcys0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFyYW1OYW1lXCI6IFwic3ViUHJvY2Vzc1VVSURcIiwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJhbVZhbHVlXCI6IHV1aWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMocGFyYW1ldGVyc0FycmF5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgLy9DcmVhdGUgc3VicHJvY2VzcyBtZXNzYWdlIGZpbGVcblxuICAgICAgICAgICAgICAgIHZhciBzcE1lc3NhZ2VzID0gdXVpZCArIFwiOk1lc3NhZ2VzXCJcbiAgICAgICAgICAgICAgICBkYW8uZ2V0KHNwTWVzc2FnZXMpLnRoZW4oZnVuY3Rpb24oc3BNZXNzYWdlT2JqZWN0KXtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3VicHJvY2VzcyBtZXNzYWdlIG9iamVjdCBmb3VuZC5cIik7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBlbmRpbmdTdWJtaXNzaW9uT2JqZWN0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaTE4blwiOntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJfaWRcIjpcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImVuXCI6IFwiU2VydmVyIHJlcXVlc3QgaXMgcGVuZGluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOlwiaW5mb1wiXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgc3BNZXNzYWdlT2JqZWN0Lm1lc3NhZ2VzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBzcE1lc3NhZ2VPYmplY3QubWVzc2FnZXMucHVzaChwZW5kaW5nU3VibWlzc2lvbk9iamVjdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYW8uc2F2ZShzcE1lc3NhZ2VPYmplY3QpLnRoZW4oZnVuY3Rpb24gKHNwTWVzc2FnZU9iamVjdFN1Y2Nlc3MpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc3BNZXNzYWdlT2JqZWN0U3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChzcE1lc3NhZ2VPYmplY3RTdWNjZXNzRmFpbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc3BNZXNzYWdlT2JqZWN0U3VjY2Vzc0ZhaWwpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNwTWVzc2FnZU9iamVjdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdWJQcm9jZXNzTWVzc2FnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiX2lkXCI6IHNwTWVzc2FnZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGFubmVsc1wiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tbXVuaXR5X1wiICsgYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZmlsZV9cIiArIGFwcC5TQ09QRS5wcm9maWxlSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXBwbGljYXRpb25fXCIgKyBhcHAuU0NPUEUuYXBwbGljYXRpb25JZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21tdW5pdHlfXCIgKyBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKSArIFwiX2FwcGxpY2F0aW9uX1wiICsgYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tbXVuaXR5SWRcIjogYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHBsaWNhdGlvbklkXCI6IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY3JlYXRlZERhdGVUaW1lXCI6IG5ldyBEYXRlKCkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlbmRlclVzZXJJZFwiOiBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VzXCI6IFtdXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBlbmRpbmdTdWJtaXNzaW9uT2JqZWN0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaTE4blwiOntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJfaWRcIjpcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImVuXCI6IFwiU2VydmVyIHJlcXVlc3QgaXMgcGVuZGluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOlwiaW5mb1wiXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgc3BNZXNzYWdlT2JqZWN0Lm1lc3NhZ2VzLnB1c2gocGVuZGluZ1N1Ym1pc3Npb25PYmplY3QpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBkYW8uc2F2ZShzcE1lc3NhZ2VPYmplY3QpLnRoZW4oZnVuY3Rpb24gKHNwTWVzc2FnZU9iamVjdFN1Y2Nlc3MpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc3BNZXNzYWdlT2JqZWN0U3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChzcE1lc3NhZ2VPYmplY3RTdWNjZXNzRmFpbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc3BNZXNzYWdlT2JqZWN0U3VjY2Vzc0ZhaWwpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYod29ya2VyQ29uZmlnLnJlc3QgIT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB2YXIgY29uZmlnUGFyYW0gPSB3b3JrZXJDb25maWcucmVzdC5wYXJhbWV0ZXJzO1xuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzUGFyYW1zKGNvbmZpZ1BhcmFtKS50aGVuKGZ1bmN0aW9uKHBhcmFtc0FycmF5KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhY3Rpb249e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VuZFdvcmtlclwiOntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZXN0XCI6e1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLnNlbmRXb3JrZXIucmVzdC51cmkgPSB3b3JrZXJDb25maWcucmVzdC51cmk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24uc2VuZFdvcmtlci5yZXN0LnByb2ZpbElkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5zZW5kV29ya2VyLnJlc3QucGFyYW1ldGVycyA9IHBhcmFtc0FycmF5O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uICh3b3JrZXJTdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1dvcmtlciBSZXN0IHByb2Nlc3NlZCBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHdvcmtlckZhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB9LGZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInBhcmFtZXRlciBjcmVhdGlvbiBmYWlsZWQuIEFib3JkaW5nIHdvcmtlciBvYmplY3RcIik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICB9IGVsc2UgaWYod29ya2VyQ29uZmlnLmZ1bmN0aW9uYWwgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICB2YXIgY29uZmlnUGFyYW0gPSB3b3JrZXJDb25maWcuZnVuY3Rpb25hbC5wYXJhbWV0ZXJzO1xuICAgICAgICAgICAgICAgICAgIHByb2Nlc3NQYXJhbXMoY29uZmlnUGFyYW0pLnRoZW4oZnVuY3Rpb24ocGFyYW1zQXJyYXkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGlvbj17XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZW5kV29ya2VyXCI6e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZ1bmN0aW9uYWxcIjp7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24uc2VuZFdvcmtlci5mdW5jdGlvbmFsLm1ldGhvZE5hbWUgPSB3b3JrZXJDb25maWcuZnVuY3Rpb25hbC5tZXRob2ROYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLnNlbmRXb3JrZXIuZnVuY3Rpb25hbC5wcm9maWxJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24uc2VuZFdvcmtlci5mdW5jdGlvbmFsLnBhcmFtZXRlcnMgPSBwYXJhbXNBcnJheTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbiAod29ya2VyU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdXb3JrZXIgRnVuY3Rpb25hbCBwcm9jZXNzZWQgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICh3b3JrZXJGYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdvcmtlckZhaWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSxmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwYXJhbWV0ZXIgY3JlYXRpb24gZmFpbGVkLiBBYm9yZGluZyB3b3JrZXIgb2JqZWN0XCIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZXhlY3V0ZUxvY2FsOiBmdW5jdGlvbiAod29ya2VyQ29uZmlnLCBfV0ZJbnN0YW5jZSwgdXVpZCkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgdmFyIHByb2Nlc3NHZXROb2RlVmFsdWUgPSBmdW5jdGlvbihwYXJhbUJsb2NrLCBzZXEsIGRhdGFUeXBlKXtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXMsIHJlail7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGhlbHBlci5nZXROb2RlVmFsdWUocGFyYW1CbG9jaywgX1dGSW5zdGFuY2UsIHV1aWQpLnRoZW4oZnVuY3Rpb24gKGRhdGFWYWx1ZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICByZXMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VxXCI6IHNlcSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRhdGFUeXBlXCI6IGRhdGFUeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YVZhbHVlXCI6IGRhdGFWYWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWooZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgdmFyIHByb2Nlc3NQYXJhbXMgPSBmdW5jdGlvbihjb25maWdQYXJhbSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXMsIHJlail7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFyYW1ldGVyc0FycmF5ID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbXNUb1Byb2Nlc3MgPSBjb25maWdQYXJhbS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGk9MDsgaTxjb25maWdQYXJhbS5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmFtQmxvY2sgPSBjb25maWdQYXJhbVtpXS5wYXJhbWV0ZXJWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VxID0gY29uZmlnUGFyYW1baV0uc2VxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRhVHlwZSA9IGNvbmZpZ1BhcmFtW2ldLmRhdGFUeXBlLmRhdGFUeXBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJhbVZhbHVlID0gcHJvY2Vzc0dldE5vZGVWYWx1ZShwYXJhbUJsb2NrLCBzZXEsIGRhdGFUeXBlKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzQXJyYXkucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlcVwiOiByZXNwb25zZS5zZXEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRhdGFUeXBlXCI6IHJlc3BvbnNlLmRhdGFUeXBlLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFyYW1WYWx1ZVwiOiByZXNwb25zZS5kYXRhVmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1RvUHJvY2Vzcy0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbXNUb1Byb2Nlc3MgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzKHBhcmFtZXRlcnNBcnJheSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LGZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zVG9Qcm9jZXNzLS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1RvUHJvY2VzcyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMocGFyYW1ldGVyc0FycmF5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHZhciBmaXhQYXJhbVR5cGUgPSBmdW5jdGlvbihwYXJhbVZhbHVlLCBkYXRhVHlwZSl7XG5cbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChkYXRhVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInN0cmluZ1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImRhdGVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJkYXRlVGltZVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIidcIiArIHBhcmFtVmFsdWUgKyBcIidcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJudW1iZXJcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJkZWNpbWFsXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICBwYXJhbVZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHZhciBtZXRob2ROYW1lID0gd29ya2VyQ29uZmlnLm1ldGhvZE5hbWU7XG4gICAgICAgICAgICAgICAgdmFyIGNvbmZpZ1BhcmFtID0gd29ya2VyQ29uZmlnLnBhcmFtZXRlcnM7XG4gICAgICAgICAgICAgICAgcHJvY2Vzc1BhcmFtcyhjb25maWdQYXJhbSkudGhlbihmdW5jdGlvbihwYXJhbXNBcnJheSl7XG4gICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHZhciBwTGlzdCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGkgPTA7IGk8IHBhcmFtc0FycmF5Lmxlbmd0aC0xOyBpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgcExpc3QgPSBwTGlzdCArIGZpeFBhcmFtVHlwZShwYXJhbXNBcnJheVtpXS5wYXJhbVZhbHVlLHBhcmFtc0FycmF5W2ldLmRhdGFUeXBlKSArICcsJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwTGlzdCA9IHBMaXN0ICsgZml4UGFyYW1UeXBlKHBhcmFtc0FycmF5W2ldLnBhcmFtVmFsdWUsIHBhcmFtc0FycmF5W2ldLmRhdGFUeXBlKVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNhbGxiYWNrU3VjY2VzcyA9IGZ1bmN0aW9uKCkgeyBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKFwiRnVuY3Rpb24gJ1wiKyBtZXRob2ROYW1lICsgXCInIGV4ZWN1dGVkLiBSZXNwb25zZSBzdWNjZXNzLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNhbGxiYWNrRmFpbHVyZSA9IGZ1bmN0aW9uKCkgeyBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoXCJGdW5jdGlvbiAnXCIrIG1ldGhvZE5hbWUgKyBcIicgZXhlY3V0ZWQuIFJlc3BvbnNlIGZhaWxlZC5cIik7XG4gICAgICAgICAgICAgICAgICAgIH07ICAgIFxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZ1bmMgPSBtZXRob2ROYW1lKycoJysgcExpc3QgKycsY2FsbGJhY2tTdWNjZXNzLCBjYWxsYmFja0ZhaWx1cmUpJztcbiAgICAgICAgICAgICAgICAgICAgZXZhbChmdW5jKTtcbiAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICB9LGZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGFyYW1ldGVyIGNyZWF0aW9uIGZhaWxlZC4gQWJvcmRpbmcgd29ya2VyIG9iamVjdFwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG59KSgpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gICAgY29tbXVuaXR5OiBjb21tdW5pdHksXG4gICAgYXBwbGljYXRpb246IGFwcGxpY2F0aW9uLFxuICAgIHBlcmZvcm1hbmNlOiBwZXJmb3JtYW5jZSxcbiAgICB3b3JrZXI6IHdvcmtlcixcbiAgICBzZG86IHNkbyxcbiAgICB0YXhvbm9teTogdGF4b25vbXksXG4gICAgc3ViUHJvY2Vzc0luc3RhbmNlOiBzdWJQcm9jZXNzSW5zdGFuY2UsXG4gICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgbm90aWZpY2F0aW9uOiBub3RpZmljYXRpb24sXG4gICAgcmVwb3J0OnJlcG9ydFxufSIsIid1c2Ugc3RyaWN0JztcblxuLy92YXIgZ2F0ZWtlZXBlciA9IHJlcXVpcmUoJy4uL2Jvd2VyX2NvbXBvbmVudHMvZ2F0ZWtlZXBlcicpO1xudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsaXR5Jyk7XG5cbi8vIHZhciB1dWlkID0gcmVxdWlyZSgnbm9kZS11dWlkJyk7XG5cbnZhciBnYXRla2VlcGVyID0gbmV3IEdLKCk7XG5cbi8qKlxuICogRm9ybSBNb2R1bGVcbiAqXG4gKiBAbW9kdWxlIGxpYi9mb3JtXG4gKiBAYXV0aG9yIEJyZW50IEdvcmRvblxuICogQHZlcnNpb24gMi4wLjBcbiAqIEBkZXNjcmlwdGlvbiB0ZXN0IGRlc2NyaXB0aW9uXG4gKiBAY29weXJpZ2h0IEt3YW50dSBMdGQgUlNBIDIwMDktMjAxNS5cbiAqXG4gKi9cblxuZnVuY3Rpb24gY3JlYXRlKGFyZ3MpIHtcblxuICAgIHZhciBwcm9jZXNzSWQgPSBhcmdzWzBdIHx8ICcnO1xuXG4gICAgdmFyIHN1YlByb2Nlc3MgPSBhcmdzWzFdIHx8IHt9O1xuXG4gICAgdmFyIHN0ZXAgPSBhcmdzWzJdIHx8IHt9O1xuXG4gICAgdmFyIGFjdGlvbiA9IGFyZ3NbM10gfHwge307XG5cbiAgICB2YXIgX1dGSW5zdGFuY2UgPSBhcmdzWzZdIHx8IHt9O1xuXG4gICAgdmFyIGRhdGEgPSBhcmdzWzZdIHx8IHt9O1xuXG4gICAgdmFyIGluZGljYXRvcnMgPSBzdWJQcm9jZXNzLmluZGljYXRvcnMgfHwgW107XG5cbiAgICB2YXIgcmVzdWx0ID0gW107XG5cbiAgICB2YXIgaW5kaWNhdG9yVHlwZSA9IGFjdGlvbi5fdHlwZTtcblxuICAgIHZhciBwcm9jZXNzU2VxID0gYXJnc1s0XSB8fCAnJztcblxuICAgIHZhciBzdWJQcm9jZXNzU2VxID0gYXJnc1s1XSB8fCAnJztcblxuICAgIHZhciBjcmVhdGVUeXBlID0gYXJnc1s3XSB8fCAnJztcblxuICAgIHZhciBzdWJQcm9jZXNzSWQgPSBzdWJQcm9jZXNzLl9pZDtcblxuICAgIHZhciB1dWlkID0gYXJnc1s4XSB8fCAnJztcblxuICAgIHZhciBiYXNlVVVJRCA9IGFyZ3NbOV0gfHwgJyc7XG5cbiAgICB2YXIgcHJvZmlsZSA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XG5cbiAgICB2YXIgaW5wdXREYXRhID0gYXJnc1sxMF0gfHwge307XG5cbiAgICB2YXIgZm9ybUNyZWF0ZVR5cGUgPSBhY3Rpb24ubWV0aG9kLmZvcm0uY3JlYXRlO1xuXG4gICAgdmFyIGZvcm1UeXBlID0gYWN0aW9uLm1ldGhvZC5mb3JtLnR5cGU7XG5cbiAgICB2YXIgcGFyYW1PYmplY3QgPSB7XG5cbiAgICAgICAgXCJmb3JtQ3JlYXRlVHlwZVwiOiBmb3JtQ3JlYXRlVHlwZSxcbiAgICAgICAgXCJmb3JtVHlwZVwiOiBmb3JtVHlwZVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgdG9Qcm9jZXNzID0gaW5kaWNhdG9ycy5sZW5ndGg7XG5cbiAgICAgICAgdmFyIHN1YnByb2Nlc3NUeXBlID0gSlNPTi54cGF0aChcIi9jb25maWcvcHJvY2Vzc2VzL3N1YlByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3ViUHJvY2Vzc0lkICsgXCInXS90eXBlXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG5cbiAgICAgICAgdmFyIGZvcm1DcmVhdGVGbiA9IGZ1bmN0aW9uKGluZGljYXRvclR5cGUsIGluZGljYXRvcklkLCB2YWxpZERhdGUsIGluc3RhbnRpYXRlU291cmNlKSB7XG5cbiAgICAgICAgICAgIGdhdGVrZWVwZXIuaW5zdGFudGlhdGUoYmFzZVVVSUQsIGluZGljYXRvclR5cGUsIGluZGljYXRvcklkLCBfV0ZJbnN0YW5jZS5wcm9maWxlLCB2YWxpZERhdGUsIHN1YlByb2Nlc3NJZCwgc3VicHJvY2Vzc1R5cGUpLnRoZW4oZnVuY3Rpb24oZG9jQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGluZGljYXRvciB3b3JrZmxvdyBwcm9jZXNzZXMgc2VjdGlvblxuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkb2NBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgb2JqZWN0ID0gZG9jQXJyYXlbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmICghb2JqZWN0Lm1vZGVsLl9pZC5lbmRzV2l0aCgnOmFwcHJvdmVkJykgJiYgIW9iamVjdC5tb2RlbC5faWQuZW5kc1dpdGgoJzpyZWplY3RlZCcpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3b3JrZmxvd09iaiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IF9XRkluc3RhbmNlLmNvbmZpZy5faWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbnN0YW5jZVwiOiBfV0ZJbnN0YW5jZS5pbnN0YW5jZS5faWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9jZXNzZXNcIjogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBwcm9jZXNzSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3ViUHJvY2Vzc0lkXCI6IHN1YlByb2Nlc3MuX2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN1YlByb2Nlc3NVVUlEXCI6IHV1aWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3RlcFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IHN0ZXAuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlcVwiOiBzdGVwLnNlcSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3RhcnREYXRlXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0YXR1c1wiOiBzdGVwLnN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBzdGVwLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFzc2lnbmVkVG9cIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlcklkXCI6IHN0ZXAuYXNzaWduZWRUby51c2VySWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IHN0ZXAuYXNzaWduZWRUby5uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21tZW50XCI6IHN0ZXAuY29tbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tcGxldGVcIjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImVuZERhdGVcIjogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uLnNldFdvcmtmbG93TGFiZWxJblRpdGxlICE9IHVuZGVmaW5lZCAmJiBhY3Rpb24uc2V0V29ya2Zsb3dMYWJlbEluVGl0bGUgIT0gJycgJiYgYWN0aW9uLnNldFdvcmtmbG93TGFiZWxJblRpdGxlID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3QubW9kZWwudGl0bGUgPSBpbnB1dERhdGEubGFiZWw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24uc2V0RHJhZnQgIT0gdW5kZWZpbmVkICYmIGFjdGlvbi5zZXREcmFmdCAhPSAnJyAmJiBhY3Rpb24uc2V0RHJhZnQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdC5tb2RlbC5jb250cm9sLmRyYWZ0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0Lm1vZGVsLndvcmtmbG93cy5wdXNoKHdvcmtmbG93T2JqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYWluSWQgPSBvYmplY3QubW9kZWwuX2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcGVyc2lzdCB2aWEgZ2sgc28gdGhhdCBpdCBpcyBzYXZlIGluIGNvdWNoXG4gICAgICAgICAgICAgICAgICAgICAgICBnYXRla2VlcGVyLnBlcnNpc3QoZG9jQXJyYXkpLnRoZW4oZnVuY3Rpb24oc2F2ZWRBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdXNpbmcgc2FtZSBpZCBjYWxsIGluaXRpYWxpc2VEYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jYWxsIGNvZGUgdG8gc2V0IHRvIHNldEluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGFvLmdldChtYWluSWQpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3JNb2RlbCA9IGtvLm1hcHBpbmcuZnJvbUpTKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGVmYXVsdE1vZGVsXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNldElkXCI6IGluZGljYXRvcklkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhdGVrZWVwZXIuaW5zdGFudGlhdGVEYXRhKG1haW5JZCwgaW5zdGFudGlhdGVTb3VyY2UsIGluZGljYXRvck1vZGVsLCBkYXRhLm1vZGVsLnBlbmRpbmcuc2VxLCBwYXJhbU9iamVjdCkudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVswXS5zdGF0dXMgPT0gXCIyMDBcIikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGlvbi5zZXRXb3JrZmxvd0xhYmVsSW5GaWVsZCAhPSB1bmRlZmluZWQgJiYgYWN0aW9uLnNldFdvcmtmbG93TGFiZWxJbkZpZWxkICE9ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhc3NpZ25tZW50U2V0SWQgPSBhY3Rpb24uc2V0V29ya2Zsb3dMYWJlbEluRmllbGQuc3BsaXQoXCIuXCIpWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXNzaWdubWVudFNldElkID09IGluZGljYXRvcklkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXRoID0gXCJkYXRhWzBdLm1vZGVsLm1vZGVsLnBlbmRpbmcuZGF0YS5cIiArIGFjdGlvbi5zZXRXb3JrZmxvd0xhYmVsSW5GaWVsZCArIFwiPSdcIiArIGlucHV0RGF0YS5sYWJlbCArIFwiJ1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZhbChwYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2F0ZWtlZXBlci5wZXJzaXN0KGRhdGEpLnRoZW4oZnVuY3Rpb24oc2F2ZWRBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYW8uZ2V0KG1haW5JZCkudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b1Byb2Nlc3MtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9Qcm9jZXNzID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gY3JlYXRlZCBzdWNjZXNzZnVsbHkuJywgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IF9XRkluc3RhbmNlLmluZGljYXRvcnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3IgPSBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGljYXRvci5faWQgPT0gZGF0YS5faWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgY3VycmVudCBpdGVtIGZyb20gdGhlIGFycmF5IGFuZCBhZGQgdGhlIHVwZGF0ZWQgcHJvY2Vzc01vZGVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b1Byb2Nlc3MtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b1Byb2Nlc3MgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5LicsIF9XRkluc3RhbmNlLmluZGljYXRvcnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvdW5kID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b1Byb2Nlc3MtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRvUHJvY2VzcyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnRm9ybSBjcmVhdGVkIHN1Y2Nlc3NmdWxseS4nLCBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmFpbHVyZSA9IHV0aWwuc3VjY2VzcygnMSBHYXRla2VlcGVyIGluaXRpYWxpc2F0aW9uIGZhaWxlZCB3aXRoIGluaXRpYWxpc2VEYXRhIG1lc3NhZ2UgJyArIGVyclswXS5tZXNzYWdlLCB7fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFpbHVyZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZhaWx1cmUgPSB1dGlsLnN1Y2Nlc3MoJzIgR2F0ZWtlZXBlciBpbml0aWFsaXNhdGlvbiBmYWlsZWQgd2l0aCBpbml0aWFsaXNlRGF0YSBtZXNzYWdlICcgKyBlcnJbMF0ubWVzc2FnZSwge30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFpbHVyZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZhaWx1cmUgPSB1dGlsLnN1Y2Nlc3MoJzMgR2F0ZWtlZXBlciBpbml0aWFsaXNhdGlvbiBmYWlsZWQgd2l0aCBpbml0aWFsaXNlRGF0YSBtZXNzYWdlICcgKyBlcnJbMF0ubWVzc2FnZSwge30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChmYWlsdXJlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmYWlsdXJlID0gdXRpbC5zdWNjZXNzKCc0IEdhdGVrZWVwZXIgaW5pdGlhbGlzYXRpb24gZmFpbGVkIHdpdGggaW5pdGlhbGlzZURhdGEgbWVzc2FnZSAnICsgZXJyWzBdLm1lc3NhZ2UsIHt9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChmYWlsdXJlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmFpbHVyZSA9IHV0aWwuc3VjY2VzcygnNSBHYXRla2VlcGVyIGluaXRpYWxpc2F0aW9uIGZhaWxlZCB3aXRoIGluaXRpYWxpc2VEYXRhIG1lc3NhZ2UgJyArIGVyclswXS5tZXNzYWdlLCB7fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChmYWlsdXJlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmYWlsdXJlID0gdXRpbC5zdWNjZXNzKCc2IEdhdGVrZWVwZXIgaW5pdGlhbGlzYXRpb24gZmFpbGVkIHdpdGggaW5pdGlhbGlzZURhdGEgbWVzc2FnZSAnICsgZXJyWzBdLm1lc3NhZ2UsIHt9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFpbHVyZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcblxuICAgICAgICAgICAgICAgIHZhciB0b0FkZFByb2Nlc3MgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IF9XRkluc3RhbmNlLmluc3RhbmNlLnByb2Nlc3Nlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoX1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzW2ldLnN1YlByb2Nlc3Nlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b0FkZFByb2Nlc3MucHVzaChfV0ZJbnN0YW5jZS5pbnN0YW5jZS5wcm9jZXNzZXNbaV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbnN0YW5jZS5wcm9jZXNzZXMgPSBbXTtcbiAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbnN0YW5jZS5wcm9jZXNzZXMgPSB0b0FkZFByb2Nlc3M7XG5cbiAgICAgICAgICAgICAgICB2YXIgdG9BZGRTdWJQcm9jZXNzID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlc1tpXS5pbmRpY2F0b3JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvQWRkU3ViUHJvY2Vzcy5wdXNoKF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLnN1YnByb2Nlc3NlcyA9IFtdO1xuICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLnN1YnByb2Nlc3NlcyA9IHRvQWRkU3ViUHJvY2VzcztcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB2YXIgZmFpbHVyZSA9IHV0aWwuc3VjY2VzcygnNyBHYXRla2VlcGVyIGluaXRpYWxpc2F0aW9uIGZhaWxlZCB3aXRoIGluaXRpYWxpc2VEYXRhIG1lc3NhZ2UgJyArIGVyclswXS5tZXNzYWdlLCB7fSk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGZhaWx1cmUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGluc3RhbnRpYXRlU291cmNlID0gRlJPTV9ERUZJTklUSU9OO1xuXG4gICAgICAgIGZvciAodmFyIGNvdW50ZXIgPSAwOyBjb3VudGVyIDwgaW5kaWNhdG9ycy5sZW5ndGg7IGNvdW50ZXIrKykge1xuICAgICAgICAgICAgdmFyIGluZGljYXRvcklkID0gaW5kaWNhdG9yc1tjb3VudGVyXS5faWQ7XG4gICAgICAgICAgICB2YXIgaW5kaWNhdG9yTmFtZSA9IHV0aWwuZ2V0TmFtZShpbmRpY2F0b3JzW2NvdW50ZXJdLm5hbWUsICdlbicpO1xuXG4gICAgICAgICAgICB2YXIgc291cmNlID0gaW5kaWNhdG9yc1tjb3VudGVyXS5pbml0aWF0ZURhdGE7XG5cbiAgICAgICAgICAgIHZhciBpbml0VHlwZSA9ICcnO1xuICAgICAgICAgICAgaWYgKHN1YlByb2Nlc3MuaW5zdGFuY2VUeXBlLm5ld1NlcXVlbmNlICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGluaXRUeXBlID0gSU5TVEFOQ0VfVFlQRV9ORVdfU0VRO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdWJQcm9jZXNzLmluc3RhbmNlVHlwZS5uZXdJbnN0YW5jZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpbml0VHlwZSA9IElOU1RBTkNFX1RZUEVfTkVXX0lOUztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGluZGljYXRvckRvYyA9IHt9O1xuICAgICAgICAgICAgaWYgKGJhc2VVVUlEICE9IHVuZGVmaW5lZCAmJiBiYXNlVVVJRCAhPSAnJyAmJiBiYXNlVVVJRC5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgc3AgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgYmFzZVVVSUQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYoc3ViUHJvY2Vzcy5wZXJpb2RUeXBlLnBlcmlvZGljID09IHVuZGVmaW5lZCl7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoYmFzZVVVSUQgIT0gdXVpZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGluc3RhbnRpYXRlU291cmNlID0gRlJPTV9BVVRIT1JJU0VEO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBjYXJkaW5hbGl0eSA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tzZXRJZCBlcSAnXCIgKyBpbmRpY2F0b3JJZCArIFwiJ10vY2FyZGluYWxpdHlcIiwgYXBwLlNDT1BFLkFQUF9DT05GSUcsIHt9KVswXTtcblxuICAgICAgICAgICAgICAgIGlmIChpbml0VHlwZSA9PSBJTlNUQU5DRV9UWVBFX05FV19JTlMpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY2FyZGluYWxpdHkgPT0gSU5ESUNBVE9SX0NBUkRJTkFMSVRZX1NJTkdMRSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXhpc3RpbmdVVUlEID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ1wiICsgaW5kaWNhdG9ySWQgKyBcIiddL19pZFwiLCBfV0ZJbnN0YW5jZSwge30pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmdVVUlELmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW50aWF0ZVNvdXJjZSA9IEZST01fQVVUSE9SSVNFRDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFudGlhdGVTb3VyY2UgPSBGUk9NX0RFRklOSVRJT047XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW50aWF0ZVNvdXJjZSA9IEZST01fREVGSU5JVElPTjtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cblxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY2FyZGluYWxpdHkgPT0gSU5ESUNBVE9SX0NBUkRJTkFMSVRZX1NJTkdMRSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXhpc3RpbmdVVUlEID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ1wiICsgaW5kaWNhdG9ySWQgKyBcIiddL19pZFwiLCBhcHAuU0NPUEUud29ya2Zsb3csIHt9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV4aXN0aW5nVVVJRC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFudGlhdGVTb3VyY2UgPSBGUk9NX0FVVEhPUklTRUQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbnRpYXRlU291cmNlID0gRlJPTV9ERUZJTklUSU9OO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhdGggPSBcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ1wiICsgaW5kaWNhdG9ySWQgKyBcIicgYW5kIGlkID0gL3N1YnByb2Nlc3Nlc1tpZCA9ICdcIiArIHN1YlByb2Nlc3NJZCArIFwiJ10vaW5kaWNhdG9ycy9pbnN0YW5jZXMvdXVpZF0vX2lkXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFydCA9IGxpYnJhcnkuZ2V0U3VicHJvZmlsZVN1YnByb2Nlc3NJZHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWJwcm9jZXNzVHlwZSA9PSBQUk9DRVNTX1RZUEVfU1VCUFJPRklMRSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGggPSBcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ1wiICsgaW5kaWNhdG9ySWQgKyBcIicgYW5kIGlkID0gL3N1YnByb2Nlc3Nlc1tpZCA9ICdcIiArIHN1YlByb2Nlc3NJZCArIFwiJyBhbmQgaWQgPSBcIitwYXJ0K1wiXS9pbmRpY2F0b3JzL2luc3RhbmNlcy91dWlkXS9faWRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBleGlzdGluZ1VVSUQgPSBKU09OLnhwYXRoKHBhdGgsIF9XRkluc3RhbmNlLCB7fSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChleGlzdGluZ1VVSUQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbnRpYXRlU291cmNlID0gRlJPTV9BVVRIT1JJU0VEO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW50aWF0ZVNvdXJjZSA9IEZST01fREVGSU5JVElPTjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG5cblxuXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9ybUNyZWF0ZUZuKGluaXRUeXBlLCBpbmRpY2F0b3JJZCwgJycsIGluc3RhbnRpYXRlU291cmNlKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG59O1xuXG5mdW5jdGlvbiBzZXRJbnN0YW5jZVRpdGxlKGFyZ3MpIHtcblxuICAgIHZhciBfV0ZJbnN0YW5jZSA9IGFyZ3NbMF0gfHwge307XG5cbiAgICB2YXIgdXVpZCA9IGFyZ3NbMl0gfHwgJyc7XG4gICAgdmFyIGRhdGEgPSBhcmdzWzRdIHx8IHt9O1xuXG4gICAgdmFyIHRpdGxlID0gZGF0YS5sYWJlbDtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICB2YXIgc3ViUHJvY2Vzc0luc3RhbmNlID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgIHZhciBpbmRpY2F0b3JJbnN0YW5jZXMgPSBzdWJQcm9jZXNzSW5zdGFuY2UuaW5kaWNhdG9ycztcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluZGljYXRvckluc3RhbmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGluZGljYXRvclVVSUQgPSBpbmRpY2F0b3JJbnN0YW5jZXNbaV0uaW5zdGFuY2VzWzBdLnV1aWQ7XG4gICAgICAgICAgICB2YXIgaW5kaWNhdG9ySW5zdGFuY2UgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbX2lkIGVxICdcIiArIGluZGljYXRvclVVSUQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICBpbmRpY2F0b3JJbnN0YW5jZS50aXRsZSA9IGluZGljYXRvckluc3RhbmNlc1tpXS5pZCArICcgJyArIHRpdGxlO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlc29sdmUoXCJTZXQgVGl0bGUgU3VjY2Vzc1wiLCBpbmRpY2F0b3JJbnN0YW5jZXMpO1xuXG4gICAgfSk7XG5cbn07XG5cbmZ1bmN0aW9uIGRlbGV0ZVByb2ZpbGUoYXJncykge1xuXG4gICAgdmFyIF9XRkluc3RhbmNlID0gYXJnc1swXSB8fCB7fTtcblxuICAgIHZhciBwcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB7XG4gICAgICAgICAgICBcInNvdXJjZVwiOiBcInJlbW90ZVwiLFxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwid29ya2VyT2JqZWN0XCIsXG4gICAgICAgICAgICBcIl9pZFwiOiBnZW5lcmF0ZVVVSUQoKSxcbiAgICAgICAgICAgIFwiY2hhbm5lbHNcIjogW10sXG4gICAgICAgICAgICBcImNvbW11bml0eUlkXCI6IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpLFxuICAgICAgICAgICAgXCJhcHBsaWNhdGlvbklkXCI6IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkLFxuICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiXCIsXG4gICAgICAgICAgICBcIm1lc3NhZ2VUeXBlXCI6IFwiaW5mb1wiLFxuICAgICAgICAgICAgXCJjcmVhdGVkRGF0ZVRpbWVcIjogbW9tZW50KCkuZm9ybWF0KCksXG4gICAgICAgICAgICBcInNlbmRlclVzZXJJZFwiOiBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZCxcbiAgICAgICAgICAgIFwibm90aWZpY2F0aW9uXCI6IHtcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicHJvZmlsZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJhY3Rpb25cIjogXCJkZWxldGVQcm9maWxlXCIsXG4gICAgICAgICAgICAgICAgXCJwcm9maWxlSWRcIjogcHJvZmlsZUlkXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKHdvcmtlck9iamVjdCk7XG4gICAgICAgIGRhby51cHNlcnQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV29ya2VyIE9iamVjdCBzdWJtaXR0ZWQgZm9yIHByb2ZpbGUoXCIgKyBwcm9maWxlSWQgKyBcIikgZGVsZXRpb24uXCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICByZWplY3QoZGF0YSk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVByb2ZpbGUoYXJncykge1xuXG4gICAgdmFyIF9XRkluc3RhbmNlID0gYXJnc1sxXSB8fCB7fTtcblxuICAgIHZhciBjb21tdW5pdHlJZCA9IF9XRkluc3RhbmNlLmNvbW11bml0eUlkO1xuICAgIHZhciBwcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgIGxpYnJhcnkuY3JlYXRlUHJvZmlsZURvY3VtZW50cyhjb21tdW5pdHlJZCwgcHJvZmlsZUlkKS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcblxuICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gY3JlYXRlZCBzdWNjZXNzZnVsbHkuJywgZGF0YSk7XG4gICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICB2YXIgZmFpbHVyZSA9IHV0aWwuc3VjY2VzcygnRVJST1I6IFByb2ZpbGUgY3JlYXRpb24gZmFpbGVkJyArIGVyclswXS5tZXNzYWdlLCB7fSk7XG4gICAgICAgICAgICByZWplY3QoZmFpbHVyZSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICB9KTtcbn07XG5cbmZ1bmN0aW9uIHNldERyYWZ0KGFyZ3MpIHtcblxuICAgIHZhciBfV0ZJbnN0YW5jZSA9IGFyZ3NbMF0gfHwge307XG5cbiAgICB2YXIgY29tbXVuaXR5SWQgPSBfV0ZJbnN0YW5jZS5jb21tdW5pdHlJZDtcbiAgICB2YXIgcHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcbiAgICB2YXIgdXVpZCA9IGFyZ3NbMl0gfHwgJyc7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgdmFyIHN1YlByb2Nlc3NJbnN0YW5jZSA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICB2YXIgaW5kaWNhdG9ySW5zdGFuY2VzID0gc3ViUHJvY2Vzc0luc3RhbmNlLmluZGljYXRvcnM7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbmRpY2F0b3JJbnN0YW5jZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JVVUlEID0gaW5kaWNhdG9ySW5zdGFuY2VzW2ldLmluc3RhbmNlc1swXS51dWlkO1xuICAgICAgICAgICAgdmFyIGluZGljYXRvckluc3RhbmNlID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW19pZCBlcSAnXCIgKyBpbmRpY2F0b3JVVUlEICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgaW5kaWNhdG9ySW5zdGFuY2UuY29udHJvbC5kcmFmdCA9IHRydWU7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVzb2x2ZShcIlNldCBEcmFmdCBTdWNjZXNzXCIsIGluZGljYXRvckluc3RhbmNlcyk7XG5cbiAgICB9KTtcbn07XG5cbmZ1bmN0aW9uIHNldFVuRHJhZnQoYXJncykge1xuXG4gICAgdmFyIF9XRkluc3RhbmNlID0gYXJnc1swXSB8fCB7fTtcblxuICAgIHZhciBjb21tdW5pdHlJZCA9IF9XRkluc3RhbmNlLmNvbW11bml0eUlkO1xuICAgIHZhciBwcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xuICAgIHZhciB1dWlkID0gYXJnc1syXSB8fCAnJztcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICB2YXIgc3ViUHJvY2Vzc0luc3RhbmNlID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgIHZhciBpbmRpY2F0b3JJbnN0YW5jZXMgPSBzdWJQcm9jZXNzSW5zdGFuY2UuaW5kaWNhdG9ycztcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluZGljYXRvckluc3RhbmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGluZGljYXRvclVVSUQgPSBpbmRpY2F0b3JJbnN0YW5jZXNbaV0uaW5zdGFuY2VzWzBdLnV1aWQ7XG4gICAgICAgICAgICB2YXIgaW5kaWNhdG9ySW5zdGFuY2UgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbX2lkIGVxICdcIiArIGluZGljYXRvclVVSUQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICBpbmRpY2F0b3JJbnN0YW5jZS5jb250cm9sLmRyYWZ0ID0gZmFsc2U7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVzb2x2ZShcIlNldCBEcmFmdCBTdWNjZXNzXCIsIGluZGljYXRvckluc3RhbmNlcyk7XG5cbiAgICB9KTtcbn07XG5cbmZ1bmN0aW9uIHNhdmUoaW5kaWNhdG9yKSB7XG4gICAgdmFyIGNvbXBsZXRlZCA9IFtdO1xuICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgIGNvbXBsZXRlOiB0cnVlLFxuICAgICAgICBkYXRhOiBbXVxuICAgIH07XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGluZGljYXRvciBzZXQgc2F2ZWQgc3VjY2Vzc2Z1bGx5LicsIHJlc3VsdCk7XG4gICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgfSk7XG59O1xuXG5mdW5jdGlvbiBzdWJtaXQoZm9ybSkge1xuICAgIHZhciBjb21wbGV0ZWQgPSBbXTtcbiAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgICBjb21wbGV0ZTogdHJ1ZSxcbiAgICAgICAgZGF0YTogW11cbiAgICB9O1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnRm9ybSBzdWJtaXR0ZWQgc3VjY2Vzc2Z1bGx5LicsIHJlc3VsdCk7XG4gICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgfSk7XG59O1xuXG5mdW5jdGlvbiBhdXRob3Jpc2UoZm9ybSkge1xuICAgIHZhciBjb21wbGV0ZWQgPSBbXTtcbiAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgICBjb21wbGV0ZTogdHJ1ZSxcbiAgICAgICAgZGF0YTogW11cbiAgICB9O1xuXG4gICAgdmFyIHByb2Nlc3NJZCA9IGZvcm1bMF0gfHwgJyc7XG5cbiAgICB2YXIgc3ViUHJvY2VzcyA9IGZvcm1bMV0gfHwge307XG5cbiAgICB2YXIgc3ViUHJvY2Vzc0lkID0gc3ViUHJvY2Vzcy5faWQ7XG5cbiAgICB2YXIgcHJvY2Vzc1NlcSA9IGZvcm1bMl0gfHwgJyc7XG5cbiAgICB2YXIgc3ViUHJvY2Vzc1NlcSA9IGZvcm1bM10gfHwgJyc7XG5cbiAgICB2YXIgX1dGSW5zdGFuY2UgPSBmb3JtWzRdIHx8IHt9O1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgIHZhciBzdWJQcm9jZXNzVVVJRCA9IEpTT04ueHBhdGgoXCIvcHJvY2Vzc2VzW2lkIGVxICdcIiArIHByb2Nlc3NJZCArIFwiJyBhbmQgc2VxIGVxICdcIiArIHByb2Nlc3NTZXEgKyBcIiddL3N1YlByb2Nlc3Nlc1tpZCBlcSAnXCIgKyBzdWJQcm9jZXNzSWQgKyBcIicgYW5kIHNlcSBlcSAnXCIgKyBzdWJQcm9jZXNzU2VxICsgXCInXS91dWlkXCIsIF9XRkluc3RhbmNlLmluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgIHZhciBzcEluZGljYXRvcnMgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3ViUHJvY2Vzc1VVSUQgKyBcIiddL2luZGljYXRvcnMvaW5zdGFuY2VzL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KTtcbiAgICAgICAgdmFyIGl0ZW1zVG9Qcm9jZXNzID0gc3BJbmRpY2F0b3JzLmxlbmd0aDtcbiAgICAgICAgdmFyIHVwZGF0ZWRPYmplY3RzQXJyYXkgPSBbXTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW1zVG9Qcm9jZXNzOyBpKyspIHtcblxuICAgICAgICAgICAgZ2F0ZWtlZXBlci5hdXRob3Jpc2Uoc3BJbmRpY2F0b3JzW2ldKS50aGVuKGZ1bmN0aW9uKGF1dGhvcmlzZWRSZXR1cm4pIHtcblxuICAgICAgICAgICAgICAgIGdhdGVrZWVwZXIucGVyc2lzdChhdXRob3Jpc2VkUmV0dXJuKS50aGVuKGZ1bmN0aW9uKHNhdmVkQXJyYXkpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgdXVpZFNhdmVkSW5kaWNhdG9yID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgc2F2ZWRBcnJheS5sZW5ndGg7IGMrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzYXZlZEFycmF5W2NdLmlkLmVuZHNXaXRoKCc6YXBwcm92ZWQnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV1aWRTYXZlZEluZGljYXRvciA9IHNhdmVkQXJyYXlbY10uaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGRhby5nZXQodXVpZFNhdmVkSW5kaWNhdG9yKS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5wdXNoKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zVG9Qcm9jZXNzLS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zVG9Qcm9jZXNzID09IDApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnRm9ybSBhdXRob3Jpc2VkIHN1Y2Nlc3NmdWxseS4nLCB1cGRhdGVkT2JqZWN0c0FycmF5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IF9XRkluc3RhbmNlLmluZGljYXRvcnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3IgPSBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGljYXRvci5faWQgPT0gZGF0YS5faWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgY3VycmVudCBpdGVtIGZyb20gdGhlIGFycmF5IGFuZCBhZGQgdGhlIHVwZGF0ZWQgcHJvY2Vzc01vZGVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1RvUHJvY2Vzcy0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zVG9Qcm9jZXNzID09IDApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGF1dGhvcmlzZWQgc3VjY2Vzc2Z1bGx5LicsIHVwZGF0ZWRPYmplY3RzQXJyYXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvdW5kID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1RvUHJvY2Vzcy0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbXNUb1Byb2Nlc3MgPT0gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnRm9ybSBhdXRob3Jpc2VkIHN1Y2Nlc3NmdWxseS4nLCB1cGRhdGVkT2JqZWN0c0FycmF5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpdGVtc1RvUHJvY2Vzcy0tO1xuICAgICAgICAgICAgICAgIGlmIChpdGVtc1RvUHJvY2VzcyA9PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gYXV0aG9yaXNlZCBzdWNjZXNzZnVsbHkuJywgdXBkYXRlZE9iamVjdHNBcnJheSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9KTtcbn07XG5cbmZ1bmN0aW9uIGNsb3NlKGZvcm0pIHtcbiAgICB2YXIgY29tcGxldGVkID0gW107XG4gICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgY29tcGxldGU6IHRydWUsXG4gICAgICAgIGRhdGE6IFtdXG4gICAgfTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gY2xvc2VkIHN1Y2Nlc3NmdWxseS4nLCByZXN1bHQpO1xuICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgIH0pO1xufTtcblxuXG5cbmZ1bmN0aW9uIHVwZGF0ZUluZGljYXRvcihhcmdzKSB7XG5cbiAgICB2YXIgX1dGSW5zdGFuY2UgPSBhcmdzWzBdIHx8IHt9O1xuXG4gICAgdmFyIHV1aWQgPSBhcmdzWzFdIHx8ICcnO1xuICAgIHZhciBwYXRoID0gYXJnc1syXSB8fCAnJztcbiAgICB2YXIgZGF0YVZhbHVlID0gYXJnc1szXSB8fCAnJztcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICB2YXIgc3ViUHJvY2Vzc0luc3RhbmNlID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgIHZhciBpbmRpY2F0b3JJbnN0YW5jZXMgPSBzdWJQcm9jZXNzSW5zdGFuY2UuaW5kaWNhdG9ycztcbiAgICAgICAgdmFyIHNldElkID0gcGF0aC5zcGxpdChcIi5cIiwgMSlbMF07XG4gICAgICAgIHZhciBpbmRpY2F0b3JVVUlEID0gSlNPTi54cGF0aChcIi8qW2lkIGVxICdcIiArIHNldElkICsgXCInXS9pbnN0YW5jZXMvdXVpZFwiLCBpbmRpY2F0b3JJbnN0YW5jZXMsIHt9KVswXTtcbiAgICAgICAgdmFyIGluZE9iamVjdCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tfaWQgZXEgJ1wiICsgaW5kaWNhdG9yVVVJRCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgdmFyIGV4cHIgPSAnaW5kT2JqZWN0Lm1vZGVsLnBlbmRpbmcuZGF0YS4nICsgcGF0aCArICcgPSBcIicgKyBkYXRhVmFsdWUgKyAnXCInO1xuICAgICAgICBldmFsKGV4cHIpO1xuICAgICAgICB2YXIgaXRlbXNUb1Byb2Nlc3MgPSAxO1xuICAgICAgICB2YXIgc3R1ZmYgPSBbXTtcbiAgICAgICAgdmFyIG9iaiA9IHt9O1xuXG4gICAgICAgIG9iai5tb2RlbCA9IGluZE9iamVjdDtcbiAgICAgICAgc3R1ZmYucHVzaChvYmopO1xuXG4gICAgICAgIGdhdGVrZWVwZXIucGVyc2lzdChzdHVmZikudGhlbihmdW5jdGlvbihzYXZlZEFycmF5KSB7XG5cbiAgICAgICAgICAgIHZhciB1dWlkU2F2ZWRJbmRpY2F0b3IgPSAnJztcbiAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgc2F2ZWRBcnJheS5sZW5ndGg7IGMrKykge1xuICAgICAgICAgICAgICAgIGlmICghc2F2ZWRBcnJheVtjXS5pZC5lbmRzV2l0aCgnOmFwcHJvdmVkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgdXVpZFNhdmVkSW5kaWNhdG9yID0gc2F2ZWRBcnJheVtjXS5pZDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGFvLmdldCh1dWlkU2F2ZWRJbmRpY2F0b3IpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5wdXNoKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNUb1Byb2Nlc3MtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1RvUHJvY2VzcyA9PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnSW5kaWNhdG9yIHVwZGF0ZWQuJywgc3R1ZmYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3VuZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IF9XRkluc3RhbmNlLmluZGljYXRvcnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvciA9IF9XRkluc3RhbmNlLmluZGljYXRvcnNbaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRpY2F0b3IuX2lkID09IGRhdGEuX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBjdXJyZW50IGl0ZW0gZnJvbSB0aGUgYXJyYXkgYW5kIGFkZCB0aGUgdXBkYXRlZCBwcm9jZXNzTW9kZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zVG9Qcm9jZXNzLS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1RvUHJvY2VzcyA9PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdJbmRpY2F0b3IgdXBkYXRlZC4nLCBzdHVmZik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvdW5kID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5wdXNoKGRhdGEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNUb1Byb2Nlc3MtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbXNUb1Byb2Nlc3MgPT0gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdJbmRpY2F0b3IgdXBkYXRlZC4nLCBzdHVmZik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG59O1xuXG5cbmZ1bmN0aW9uIHVwZGF0ZUluZGljYXRvcldyYXBwZXIoYXJncykge1xuXG4gICAgdmFyIF9XRkluc3RhbmNlID0gYXJnc1swXSB8fCB7fTtcblxuICAgIHZhciB1dWlkID0gYXJnc1sxXSB8fCAnJztcbiAgICB2YXIgcGF0aCA9IGFyZ3NbMl0gfHwgJyc7XG4gICAgdmFyIGRhdGFWYWx1ZSA9IGFyZ3NbM10gfHwgJyc7XG4gICAgdmFyIGluZGljYXRvclNldElkID0gYXJnc1s0XSB8fCAnJztcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICB2YXIgc3ViUHJvY2Vzc0luc3RhbmNlID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgIHZhciBpbmRpY2F0b3JJbnN0YW5jZXMgPSBzdWJQcm9jZXNzSW5zdGFuY2UuaW5kaWNhdG9ycztcbiAgICAgICAgXG4gICAgICAgIHZhciBpbmRpY2F0b3JVVUlEID0gSlNPTi54cGF0aChcIi8qW2lkIGVxICdcIiArIGluZGljYXRvclNldElkICsgXCInXS9pbnN0YW5jZXMvdXVpZFwiLCBpbmRpY2F0b3JJbnN0YW5jZXMsIHt9KVswXTtcbiAgICAgICAgdmFyIGluZE9iamVjdCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tfaWQgZXEgJ1wiICsgaW5kaWNhdG9yVVVJRCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgdmFyIGV4cHIgPSAnaW5kT2JqZWN0LicgKyBwYXRoICsgJyA9IFwiJyArIGRhdGFWYWx1ZSArICdcIic7XG4gICAgICAgIGV2YWwoZXhwcik7XG4gICAgICAgIHZhciBpdGVtc1RvUHJvY2VzcyA9IDE7XG4gICAgICAgIHZhciBzdHVmZiA9IFtdO1xuICAgICAgICB2YXIgb2JqID0ge307XG5cbiAgICAgICAgb2JqLm1vZGVsID0gaW5kT2JqZWN0O1xuICAgICAgICBzdHVmZi5wdXNoKG9iaik7XG5cbiAgICAgICAgZ2F0ZWtlZXBlci5wZXJzaXN0KHN0dWZmKS50aGVuKGZ1bmN0aW9uKHNhdmVkQXJyYXkpIHtcblxuICAgICAgICAgICAgdmFyIHV1aWRTYXZlZEluZGljYXRvciA9ICcnO1xuICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCBzYXZlZEFycmF5Lmxlbmd0aDsgYysrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFzYXZlZEFycmF5W2NdLmlkLmVuZHNXaXRoKCc6YXBwcm92ZWQnKSkge1xuICAgICAgICAgICAgICAgICAgICB1dWlkU2F2ZWRJbmRpY2F0b3IgPSBzYXZlZEFycmF5W2NdLmlkO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkYW8uZ2V0KHV1aWRTYXZlZEluZGljYXRvcilcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1RvUHJvY2Vzcy0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zVG9Qcm9jZXNzID09IDApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdJbmRpY2F0b3IgdXBkYXRlZC4nLCBzdHVmZik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yID0gX1dGSW5zdGFuY2UuaW5kaWNhdG9yc1tpbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGljYXRvci5faWQgPT0gZGF0YS5faWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGN1cnJlbnQgaXRlbSBmcm9tIHRoZSBhcnJheSBhbmQgYWRkIHRoZSB1cGRhdGVkIHByb2Nlc3NNb2RlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNUb1Byb2Nlc3MtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zVG9Qcm9jZXNzID09IDApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0luZGljYXRvciB1cGRhdGVkLicsIHN0dWZmKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm91bmQgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnB1c2goZGF0YSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1RvUHJvY2Vzcy0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1RvUHJvY2VzcyA9PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0luZGljYXRvciB1cGRhdGVkLicsIHN0dWZmKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcbn07XG5cbmZ1bmN0aW9uIG1hcmtVcGRhdGVJbmRpY2F0b3IoYXJncykge1xuXG4gICAgdmFyIF9XRkluc3RhbmNlID0gYXJnc1swXSB8fCB7fTtcblxuICAgIHZhciB1dWlkID0gYXJnc1sxXSB8fCAnJztcbiAgICB2YXIgc3RhdHVzID0gYXJnc1syXSB8fCAnJztcbiAgICB2YXIgaW5kaWNhdG9yU2V0SWQgPSBhcmdzWzNdIHx8ICcnO1xuICAgIFxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICB2YXIgaW5kT2JqZWN0ID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW3dvcmtmbG93cy9wcm9jZXNzZXMvc3ViUHJvY2Vzc1VVSUQgPSAnXCIrIHV1aWQgK1wiJyBhbmQgY2F0ZWdvcnkvdGVybSA9ICdcIisgaW5kaWNhdG9yU2V0SWQgK1wiJ11cIiwgX1dGSW5zdGFuY2UgLHt9KVswXTtcblxuICAgICAgICAvKlxuICAgICAgICB2YXIgaW5kT2JqZWN0ID0gJyc7XG4gICAgICAgIHZhciBpbmRVVUlEID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ1wiKyBpbmRpY2F0b3JTZXRJZCArXCInIF0vaW5zdGFuY2VzWzFdL3V1aWRcIiwgX1dGSW5zdGFuY2UgLHt9KVswXTtcbiAgICAgICAgXG4gICAgICAgIGlmKGluZFVVSUQgIT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICBpbmRPYmplY3QgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbX2lkIGVxICdcIiArIGluZFVVSUQgKyBcIiddXCIsIF9XRkluc3RhbmNlICx7fSlbMF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgaW5kT2JqZWN0ID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ1wiICsgaW5kaWNhdG9yU2V0SWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgIH0qL1xuICAgICAgICBcbiAgICAgICAgaW5kT2JqZWN0Lm1vZGVsLnBlbmRpbmcuc3RhdHVzID0gc3RhdHVzO1xuXG4gICAgICAgIHZhciBpdGVtc1RvUHJvY2VzcyA9IDE7XG4gICAgICAgIHZhciBzdHVmZiA9IFtdO1xuICAgICAgICB2YXIgb2JqID0ge307XG5cbiAgICAgICAgb2JqLm1vZGVsID0gaW5kT2JqZWN0O1xuICAgICAgICBzdHVmZi5wdXNoKG9iaik7XG5cbiAgICAgICAgZ2F0ZWtlZXBlci5wZXJzaXN0KHN0dWZmKS50aGVuKGZ1bmN0aW9uKHNhdmVkQXJyYXkpIHtcblxuICAgICAgICAgICAgdmFyIHV1aWRTYXZlZEluZGljYXRvciA9ICcnO1xuICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCBzYXZlZEFycmF5Lmxlbmd0aDsgYysrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFzYXZlZEFycmF5W2NdLmlkLmVuZHNXaXRoKCc6YXBwcm92ZWQnKSkge1xuICAgICAgICAgICAgICAgICAgICB1dWlkU2F2ZWRJbmRpY2F0b3IgPSBzYXZlZEFycmF5W2NdLmlkO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkYW8uZ2V0KHV1aWRTYXZlZEluZGljYXRvcilcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1RvUHJvY2Vzcy0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zVG9Qcm9jZXNzID09IDApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdJbmRpY2F0b3IgdXBkYXRlZC4nLCBzdHVmZik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yID0gX1dGSW5zdGFuY2UuaW5kaWNhdG9yc1tpbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGljYXRvci5faWQgPT0gZGF0YS5faWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGN1cnJlbnQgaXRlbSBmcm9tIHRoZSBhcnJheSBhbmQgYWRkIHRoZSB1cGRhdGVkIHByb2Nlc3NNb2RlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNUb1Byb2Nlc3MtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zVG9Qcm9jZXNzID09IDApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0luZGljYXRvciB1cGRhdGVkLicsIHN0dWZmKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm91bmQgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnB1c2goZGF0YSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1RvUHJvY2Vzcy0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1RvUHJvY2VzcyA9PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0luZGljYXRvciB1cGRhdGVkLicsIHN0dWZmKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcbn07XG5cblxuZnVuY3Rpb24gc2V0U3RhdHVzKGFyZ3MpIHtcblxuXG4gICAgLy8gQ3VycmVudGx5IHNldHRpbmcgc3RhdHVzIHRvIHN1YnByb2Nlc3MgaW5zdGFuY2UuIGl0IHNob3VsZCB1cGRhdGUgc29tZSBmaWVsZCBpbiBhcHBQcm9maWxlIG9yIHdoYXRldmVyIGluZGljYXRvciB0aGUgcHJvZmlsZSBoYXMuXG4gICAgdmFyIF9XRkluc3RhbmNlID0gYXJnc1swXSB8fCB7fTtcbiAgICB2YXIgdXVpZCA9IGFyZ3NbMV0gfHwgJyc7XG4gICAgdmFyIHN0YXR1cyA9IGFyZ3NbMl0gfHwgJyc7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgdmFyIHN1YlByb2Nlc3NJbnN0YW5jZSA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICBzdWJQcm9jZXNzSW5zdGFuY2Uuc3RlcC5tZXNzYWdlID0gc3RhdHVzO1xuXG4gICAgICAgIHJlc29sdmUoXCJTZXQgcHJvZmlsZSBzdGF0dXMgU3VjY2Vzc1wiLCBzdWJQcm9jZXNzSW5zdGFuY2UpO1xuXG4gICAgfSk7XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gICAgY3JlYXRlOiBjcmVhdGUsXG4gICAgc2F2ZTogc2F2ZSxcbiAgICBzdWJtaXQ6IHN1Ym1pdCxcbiAgICBhdXRob3Jpc2U6IGF1dGhvcmlzZSxcbiAgICBjbG9zZTogY2xvc2UsXG4gICAgc2V0RHJhZnQ6IHNldERyYWZ0LFxuICAgIHNldFVuRHJhZnQ6IHNldFVuRHJhZnQsXG4gICAgY3JlYXRlUHJvZmlsZTogY3JlYXRlUHJvZmlsZSxcbiAgICBzZXRJbnN0YW5jZVRpdGxlOiBzZXRJbnN0YW5jZVRpdGxlLFxuICAgIGRlbGV0ZVByb2ZpbGU6IGRlbGV0ZVByb2ZpbGUsXG4gICAgdXBkYXRlSW5kaWNhdG9yOiB1cGRhdGVJbmRpY2F0b3IsXG4gICAgbWFya1VwZGF0ZUluZGljYXRvcjogbWFya1VwZGF0ZUluZGljYXRvcixcbiAgICB1cGRhdGVJbmRpY2F0b3JXcmFwcGVyOiB1cGRhdGVJbmRpY2F0b3JXcmFwcGVyXG5cbn0iLCIndXNlIHN0cmljdCc7XG5cblxuZnVuY3Rpb24gZ2V0TGFuZ3VhZ2VNZXNzYWdlKG1lc3NhZ2UpIHtcblxuICAgIHZhciBsYW5ndWFnZSA9IHNlcnZpY2UuZ2V0TGFuZ3VhZ2UoKTtcbiAgICB2YXIgcmVzID0gZXZhbChcIm1lc3NhZ2UuaTE4bi5cIiArIGxhbmd1YWdlKTtcbiAgICByZXR1cm4gcmVzO1xuXG59O1xuXG5mdW5jdGlvbiBnZXROb2RlVmFsdWUoZGF0YSwgX1dGSW5zdGFuY2UsIHV1aWQpIHtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICBpZiAoZGF0YS52YWx1ZSAhPSB1bmRlZmluZWQpIHsgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBpbnB1dERhdGFUeXBlID0gJ3N0cmluZyc7XG5cbiAgICAgICAgICAgIGlmKGRhdGEudmFsdWUuZGF0YXR5cGUuZGF0YVR5cGUgIT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFUeXBlID0gZGF0YS52YWx1ZS5kYXRhdHlwZS5kYXRhVHlwZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5wdXREYXRhVHlwZSA9IGRhdGEudmFsdWUuZGF0YXR5cGU7XG4gICAgICAgICAgICB9IFxuXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBpbnB1dFZhbHVlID0gZGF0YS52YWx1ZS5kYXRhO1xuXG4gICAgICAgICAgICBpZihpbnB1dERhdGFUeXBlID09ICdudW1iZXInICl7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShOdW1iZXIoaW5wdXRWYWx1ZSkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKGlucHV0RGF0YVR5cGUgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGlucHV0VmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKGlucHV0RGF0YVR5cGUgPT0gJ2ludGVnZXInKXtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHBhcnNlSW50KGlucHV0VmFsdWUpKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihpbnB1dERhdGFUeXBlID09ICdkZWNpbWFsJyl7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShwYXJzZUZsb2F0KGlucHV0VmFsdWUpKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihpbnB1dERhdGFUeXBlID09ICdkYXRlJyB8fCBpbnB1dERhdGFUeXBlID09ICdkYXRlVGltZScgKXtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGlucHV0VmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBJbiBjYXNlIGRhdGEgdHlwZSBub3QgbWF0Y2hlZFxuICAgICAgICAgICAgICAgIHJlc29sdmUoaW5wdXRWYWx1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmIChkYXRhLmluZGljYXRvclVVSUQgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgIC8vIEEgY2hhbmdlIGlzIHJlcXVpcmVkIHRvIG1ha2Ugc3VyZSBwcm9wZXIgc2NvcGUgaXMgaWRlbnRpZmllZC5cbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JVVUlEID0gbnVsbDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHN1YnByb2Nlc3MgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgIGlmKHN1YnByb2Nlc3MuaW5kaWNhdG9ycy5sZW5ndGggPT0gMCl7XG5cbiAgICAgICAgICAgICAgICBpbmRpY2F0b3JVVUlEID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ1wiKyBkYXRhLmluZGljYXRvclVVSUQuaW5kaWNhdG9yU2V0SWQgK1wiJ10vX2lkXCIsIF9XRkluc3RhbmNlICwge30pWzBdO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICBpbmRpY2F0b3JVVUlEID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2lkIGVxICdcIiArIGRhdGEuaW5kaWNhdG9yVVVJRC5pbmRpY2F0b3JTZXRJZCArIFwiJ10vaW5zdGFuY2VzL3V1aWRcIiwgc3VicHJvY2Vzcywge30pWzBdO1xuICAgICAgICAgICAgICAgICBpZihpbmRpY2F0b3JVVUlEID09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgIGluZGljYXRvclVVSUQgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnXCIrIGRhdGEuaW5kaWNhdG9yVVVJRC5pbmRpY2F0b3JTZXRJZCArXCInXS9faWRcIixfV0ZJbnN0YW5jZSx7fSlbMF07XG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuXG5cbiAgICAgICAgICAgIHJlc29sdmUoaW5kaWNhdG9yVVVJRCk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChkYXRhLmluZGljYXRvciAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgdmFyIGluZGljYXRvclVVSUQgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnXCIgKyBkYXRhLmluZGljYXRvci5pbmRpY2F0b3JTZXRJZCArIFwiJ10vaW5zdGFuY2VzL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgIHZhciBpbmRPYmplY3QgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbX2lkIGVxICdcIiArIGluZGljYXRvclVVSUQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICB2YXIgeHBhdGggPSAnL21vZGVsL3BlbmRpbmcvZGF0YS8nICsgZGF0YS5pbmRpY2F0b3IuaW5kaWNhdG9yU2V0SWQgKyAnLycgKyBkYXRhLmluZGljYXRvci5lbGVtZW50SWQ7XG5cbiAgICAgICAgICAgIHZhciBzZXEgPSBKU09OLnhwYXRoKFwiY291bnQoL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vcHJlY2VkaW5nLXNpYmxpbmc6Om5vZGUoKVtpZCA9IC9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2lkXSlcIiwgX1dGSW5zdGFuY2UsIHt9KVswXSArIDE7XG4gICAgICAgICAgICB2YXIgc3VicHJvY2Vzc1R5cGUgPSBKU09OLnhwYXRoKFwiL2NvbmZpZy9wcm9jZXNzZXMvc3ViUHJvY2Vzc2VzW19pZCBlcSAvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pZF0vdHlwZVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgdmFyIHBhcnQgPSBsaWJyYXJ5LmdldFN1YnByb2ZpbGVTdWJwcm9jZXNzSWRzKCk7XG5cbiAgICAgICAgICAgIGlmIChzdWJwcm9jZXNzVHlwZSA9PSBQUk9DRVNTX1RZUEVfU1VCUFJPRklMRSkge1xuICAgICAgICAgICAgICAgIHNlcSA9IEpTT04ueHBhdGgoXCJjb3VudCgvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9wcmVjZWRpbmctc2libGluZzo6bm9kZSgpW2lkID0gL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaWQgYW5kIF9pZCA9IC9zdWJwcm9jZXNzZXNbX2lkID0gXCIrcGFydCtcIl0vX2lkXSlcIiwgX1dGSW5zdGFuY2UsIHt9KVswXSArIDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciByZXBsYWNlZFBhdGggPSByZXBsYWNlQWxsKHhwYXRoLCAnI1NFUVVFTkNFIycsIHNlcSk7XG5cbiAgICAgICAgICAgIHZhciB2YWxpZERhdGUgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vZGF0ZXMvdmFsaWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgIHZhciBjb25jYXRWYWxpZERhdGUgPSBcIidcIiArIHZhbGlkRGF0ZSArIFwiJ1wiO1xuICAgICAgICAgICAgdmFyIG5ld1BhdGggPSByZXBsYWNlQWxsKHJlcGxhY2VkUGF0aCwgJyNFTkRfREFURSMnLCBjb25jYXRWYWxpZERhdGUpO1xuICAgICAgICAgICAgdmFyIGRvdFJlcGxhY2VkID0gcmVwbGFjZUFsbChuZXdQYXRoLCAnWy5dJywgJy8nKTtcbiAgICAgICAgICAgIHZhciByZXRWYWx1ZSA9IEpTT04ueHBhdGgoZG90UmVwbGFjZWQsIGluZE9iamVjdCwge30pWzBdO1xuXG4gICAgICAgICAgICByZXNvbHZlKHJldFZhbHVlKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGRhdGEuc3lzdGVtICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICByZXNvbHZlKFwiRVJST1I6IFVuaW1wbGVtZW50ZWQgc3lzdGVtIHR5cGUgZm91bmQuXCIpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS52YXJpYWJsZSAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBcbiAgICAgICAgICAgICAqIFRha2VuIG91dCBvZiBzY2hlbWFcbiAgICAgICAgICAgICAqIFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJQcm9jZXNzSW5zdGFuY2VcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCJ2YWx1ZSBvZiB0aGUgdmFyaWFibGUgc3ViUHJvY2Vzc0luc3RhbmNlIHZhcmlhYmxlIGN1cnJlbnQgc3VicHJvY2Vzc0luc3RhbmNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcInN0ZXBcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCJ2YWx1ZSBvZiB0aGUgdmFyaWFibGUgaW4gdGhlIGN1cnJlbnQgc3RlcFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJQcm9jZXNzSWRcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCJ2YWx1ZSBvZiB0aGUgY3VycmVudCBhcHBsaWNhaXRvbiBJRFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgKiBcbiAgICAgICAgICAgICAqIFxuICAgICAgICAgICAgICogXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmIChkYXRhLnZhcmlhYmxlLnByb2ZpbGUgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgdmFyaWFibGVOYW1lID0gZGF0YS52YXJpYWJsZS5wcm9maWxlO1xuXG4gICAgICAgICAgICAgICAgdmFyIHByb2ZpbGVJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XG4gICAgICAgICAgICAgICAgdmFyIHByb2ZpbGVWYXJpYWJsZUZpbGVOYW1lID0gcHJvZmlsZUlkICsgJzp2YXJpYWJsZXMnO1xuXG4gICAgICAgICAgICAgICAgZGFvLmdldChwcm9maWxlVmFyaWFibGVGaWxlTmFtZSkudGhlbihmdW5jdGlvbihmaWxlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIG9iaiA9IGV2YWwoJ2ZpbGUuJyArIHZhcmlhYmxlTmFtZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmogPT0gJ29iamVjdCcpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlcSA9IEpTT04ueHBhdGgoXCJjb3VudCgvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9wcmVjZWRpbmctc2libGluZzo6bm9kZSgpW2lkID0gL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaWRdKVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWJwcm9jZXNzVHlwZSA9IEpTT04ueHBhdGgoXCIvY29uZmlnL3Byb2Nlc3Nlcy9zdWJQcm9jZXNzZXNbX2lkIGVxIC9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2lkXS90eXBlXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFydCA9IGxpYnJhcnkuZ2V0U3VicHJvZmlsZVN1YnByb2Nlc3NJZHMoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1YnByb2Nlc3NUeXBlID09IFBST0NFU1NfVFlQRV9TVUJQUk9GSUxFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VxID0gSlNPTi54cGF0aChcImNvdW50KC9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL3ByZWNlZGluZy1zaWJsaW5nOjpub2RlKClbaWQgPSAvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pZCBhbmQgX2lkID0gL3N1YnByb2Nlc3Nlc1tfaWQgPSBcIitwYXJ0K1wiXS9faWRdKVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlUGF0aCA9IFwiL1wiICsgdmFyaWFibGVOYW1lICsgXCJbc2VxIGVxICdcIiArIHNlcSArIFwiJ10vdmFsdWVcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXRWYWx1ZSA9IEpTT04ueHBhdGgodmFsdWVQYXRoLCBmaWxlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJldFZhbHVlKTtcblxuXG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqID09ICdzdHJpbmcnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUob2JqKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xuXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChcIkVSUk9SOiBQcm9maWxlIHZhcmlhYmxlcyBub3QgZm91bmRcIik7XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWplY3QoXCJFUlJPUjogVW5pbXBsZW1lbnRlZCBwcm9maWxlIHR5cGUgZm91bmQuXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS5pbmRpY2F0b3JXcmFwcGVyICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICB2YXIgaW5kaWNhdG9yU2V0ID0gZGF0YS5pbmRpY2F0b3JXcmFwcGVyLmluZGljYXRvclNldElkO1xuICAgICAgICAgICAgdmFyIGluZGljYXRvclVVSUQgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnXCIgKyBpbmRpY2F0b3JTZXQgKyBcIiddL2luc3RhbmNlcy91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICB2YXIgaW5kT2JqZWN0ID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW19pZCBlcSAnXCIgKyBpbmRpY2F0b3JVVUlEICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgdmFyIGVsZW1lbnRwYXRoID0gcmVwbGFjZUFsbChkYXRhLmluZGljYXRvcldyYXBwZXIucGF0aCxcIlsuXVwiLFwiL1wiKVxuICAgICAgICAgICAgdmFyIHhwYXRoID0gJy8nK2VsZW1lbnRwYXRoXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBKU09OLnhwYXRoKHhwYXRoLCBpbmRPYmplY3QsIHt9KVswXTtcbiAgICAgICAgICAgIHJlc29sdmUodmFsdWUpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS5jYWxjdWxhdGVkICE9IHVuZGVmaW5lZCkge1xuXG5cbiAgICAgICAgICAgIHZhciB2YWx1ZSA9ICcnO1xuICAgICAgICAgICAgdmFyIHNlcGFyYXRvciA9IGRhdGEuY2FsY3VsYXRlZC5zZXBhcmF0b3I7XG5cbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBkYXRhLmNhbGN1bGF0ZWQuZWxlbWVudHMubGVuZ3RoIC0gMTsgaSsrKXtcbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgIHZhciBlbGVtZW50cyA9IGRhdGEuY2FsY3VsYXRlZC5lbGVtZW50cztcbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgIHZhciBwb3NzaWJsZUl0ZW1zID0gW1wiZWxlbWVudFByb3BlcnR5XCIsXCJjb25zdGFudFZhbHVlXCIsXCJlbGVtZW50V3JhcHBlclwiLFwiY3VycmVudERhdGVcIixcInJhbmRvbURpZ2l0c1wiLCBcInByb2ZpbGVPYmplY3RFbGVtZW50XCIsXCJwcm9maWxlT2JqZWN0V3JhcHBlclwiLFwiY3VycmVudEZpbmFuY2lhbFllYXJcIl07XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocHJvcGVydHlFeGlzdHMoZWxlbWVudHNbaV0sIHBvc3NpYmxlSXRlbXMpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2VsZW1lbnRQcm9wZXJ0eSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvclNldCA9IGVsZW1lbnRzW2ldLmVsZW1lbnRQcm9wZXJ0eS5pbmRpY2F0b3JTZXRJZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yVVVJRCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pbmRpY2F0b3JzW2lkIGVxICdcIiArIGluZGljYXRvclNldCArIFwiJ10vaW5zdGFuY2VzL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kT2JqZWN0ID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW19pZCBlcSAnXCIgKyBpbmRpY2F0b3JVVUlEICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50cGF0aCA9IHJlcGxhY2VBbGwoZWxlbWVudHNbaV0uZWxlbWVudFByb3BlcnR5LmVsZW1lbnRJZCxcIlsuXVwiLFwiL1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB4cGF0aCA9ICcvbW9kZWwvcGVuZGluZy9kYXRhLycrIGluZGljYXRvclNldCArJy8nICsgZWxlbWVudHBhdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW1WYWx1ZSA9IEpTT04ueHBhdGgoeHBhdGgsIGluZE9iamVjdCwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgKyBpdGVtVmFsdWUgKyBzZXBhcmF0b3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnY29uc3RhbnRWYWx1ZSc6XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbVZhbHVlID0gZWxlbWVudHNbaV0uY29uc3RhbnRWYWx1ZS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlICsgaXRlbVZhbHVlK3NlcGFyYXRvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZWxlbWVudFdyYXBwZXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3JTZXQgPSBlbGVtZW50c1tpXS5lbGVtZW50V3JhcHBlci5pbmRpY2F0b3JTZXRJZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yVVVJRCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pbmRpY2F0b3JzW2lkIGVxICdcIiArIGluZGljYXRvclNldCArIFwiJ10vaW5zdGFuY2VzL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kT2JqZWN0ID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW19pZCBlcSAnXCIgKyBpbmRpY2F0b3JVVUlEICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50cGF0aCA9IHJlcGxhY2VBbGwoZWxlbWVudHNbaV0uZWxlbWVudFdyYXBwZXIuZWxlbWVudElkLFwiWy5dXCIsXCIvXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHhwYXRoID0gJy8nICsgZWxlbWVudHBhdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW1WYWx1ZSA9IEpTT04ueHBhdGgoeHBhdGgsIGluZE9iamVjdCwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgKyBpdGVtVmFsdWUrc2VwYXJhdG9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2N1cnJlbnREYXRlJzpcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgKyBmb3JtYXREYXRlKG5ldyBEYXRlKCkpK3NlcGFyYXRvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JhbmRvbURpZ2l0cyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGlnaXRzID0gZWxlbWVudHNbaV0ucmFuZG9tRGlnaXRzLmRpZ2l0cztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYW5kb20gPSBNYXRoLnJhbmRvbSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGV4cCA9IE1hdGgucG93KDEwLCBkaWdpdHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGludFBhcnQgPSAgKHJhbmRvbSAqIGV4cCkgXiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlICsgaW50UGFydCtzZXBhcmF0b3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3Byb2ZpbGVPYmplY3RFbGVtZW50JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3JTZXQgPSBlbGVtZW50c1tpXS5wcm9maWxlT2JqZWN0RWxlbWVudC5pbmRpY2F0b3JTZXRJZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kT2JqZWN0ID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ2FwcFByb2ZpbGUnXVwiLGFwcC5TQ09QRS53b3JrZmxvdyx7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRwYXRoID0gcmVwbGFjZUFsbChlbGVtZW50c1tpXS5wcm9maWxlT2JqZWN0RWxlbWVudC5lbGVtZW50SWQsXCJbLl1cIixcIi9cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgeHBhdGggPSAnL21vZGVsL3BlbmRpbmcvZGF0YS8nKyBpbmRpY2F0b3JTZXQgKycvJyArIGVsZW1lbnRwYXRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpdGVtVmFsdWUgPSBKU09OLnhwYXRoKHhwYXRoLCBpbmRPYmplY3QsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlICsgaXRlbVZhbHVlK3NlcGFyYXRvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncHJvZmlsZU9iamVjdFdyYXBwZXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvclNldCA9IGVsZW1lbnRzW2ldLnByb2ZpbGVPYmplY3RXcmFwcGVyLmluZGljYXRvclNldElkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRPYmplY3QgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnYXBwUHJvZmlsZSddXCIsYXBwLlNDT1BFLndvcmtmbG93LHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbWVudHBhdGggPSByZXBsYWNlQWxsKGVsZW1lbnRzW2ldLnByb2ZpbGVPYmplY3RXcmFwcGVyLndyYXBwZXJFbGVtZW50SWQsXCJbLl1cIixcIi9cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgeHBhdGggPSAnLycgKyBlbGVtZW50cGF0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbVZhbHVlID0gSlNPTi54cGF0aCh4cGF0aCwgaW5kT2JqZWN0LCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSArIGl0ZW1WYWx1ZStzZXBhcmF0b3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2N1cnJlbnRGaW5hbmNpYWxZZWFyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RhcnREYXRlID0gZWxlbWVudHNbaV0uY3VycmVudEZpbmFuY2lhbFllYXIuc3RhcnREYXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGFydE1vbnRoID0gZWxlbWVudHNbaV0uY3VycmVudEZpbmFuY2lhbFllYXIuc3RhcnRNb250aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmluYW5jaWFsWWVhciA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSArIFwiLVwiICsgc3RhcnRNb250aCArIFwiLVwiICsgc3RhcnREYXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgKyBmaW5hbmNpYWxZZWFyICsgc2VwYXJhdG9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJObyBtZXRob2QgZm91bmQgZnJvbSBpbXBsZW1lbnRlZCBsaXN0LlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgdmFyIGkgPSBkYXRhLmNhbGN1bGF0ZWQuZWxlbWVudHMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRzID0gZGF0YS5jYWxjdWxhdGVkLmVsZW1lbnRzO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3NzaWJsZUl0ZW1zID0gW1wiZWxlbWVudFByb3BlcnR5XCIsXCJjb25zdGFudFZhbHVlXCIsXCJlbGVtZW50V3JhcHBlclwiLFwiY3VycmVudERhdGVcIixcInJhbmRvbURpZ2l0c1wiLCBcInByb2ZpbGVPYmplY3RFbGVtZW50XCIsXCJwcm9maWxlT2JqZWN0V3JhcHBlclwiLFwiY3VycmVudEZpbmFuY2lhbFllYXJcIl07XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocHJvcGVydHlFeGlzdHMoZWxlbWVudHNbaV0sIHBvc3NpYmxlSXRlbXMpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2VsZW1lbnRQcm9wZXJ0eSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvclNldCA9IGVsZW1lbnRzW2ldLmVsZW1lbnRQcm9wZXJ0eS5pbmRpY2F0b3JTZXRJZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yVVVJRCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pbmRpY2F0b3JzW2lkIGVxICdcIiArIGluZGljYXRvclNldCArIFwiJ10vaW5zdGFuY2VzL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kT2JqZWN0ID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW19pZCBlcSAnXCIgKyBpbmRpY2F0b3JVVUlEICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50cGF0aCA9IHJlcGxhY2VBbGwoZWxlbWVudHNbaV0uZWxlbWVudFByb3BlcnR5LmVsZW1lbnRJZCxcIlsuXVwiLFwiL1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB4cGF0aCA9ICcvbW9kZWwvcGVuZGluZy9kYXRhLycrIGluZGljYXRvclNldCArJy8nICsgZWxlbWVudHBhdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW1WYWx1ZSA9IEpTT04ueHBhdGgoeHBhdGgsIGluZE9iamVjdCwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgKyBpdGVtVmFsdWUgO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NvbnN0YW50VmFsdWUnOlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW1WYWx1ZSA9IGVsZW1lbnRzW2ldLmNvbnN0YW50VmFsdWUudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSArIGl0ZW1WYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZWxlbWVudFdyYXBwZXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3JTZXQgPSBlbGVtZW50c1tpXS5lbGVtZW50V3JhcHBlci5pbmRpY2F0b3JTZXRJZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yVVVJRCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pbmRpY2F0b3JzW2lkIGVxICdcIiArIGluZGljYXRvclNldCArIFwiJ10vaW5zdGFuY2VzL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kT2JqZWN0ID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW19pZCBlcSAnXCIgKyBpbmRpY2F0b3JVVUlEICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50cGF0aCA9IHJlcGxhY2VBbGwoZWxlbWVudHNbaV0uZWxlbWVudFdyYXBwZXIuZWxlbWVudElkLFwiWy5dXCIsXCIvXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHhwYXRoID0gJy8nICsgZWxlbWVudHBhdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW1WYWx1ZSA9IEpTT04ueHBhdGgoeHBhdGgsIGluZE9iamVjdCwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgKyBpdGVtVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnY3VycmVudERhdGUnOlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSArIGZvcm1hdERhdGUobmV3IERhdGUoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdyYW5kb21EaWdpdHMnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRpZ2l0cyA9IGVsZW1lbnRzW2ldLnJhbmRvbURpZ2l0cy5kaWdpdHM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFuZG9tID0gTWF0aC5yYW5kb20oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBleHAgPSBNYXRoLnBvdygxMCwgZGlnaXRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbnRQYXJ0ID0gIChyYW5kb20gKiBleHApIF4gMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSArIGludFBhcnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3Byb2ZpbGVPYmplY3RFbGVtZW50JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3JTZXQgPSBlbGVtZW50c1tpXS5wcm9maWxlT2JqZWN0RWxlbWVudC5pbmRpY2F0b3JTZXRJZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kT2JqZWN0ID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ2FwcFByb2ZpbGUnXVwiLGFwcC5TQ09QRS53b3JrZmxvdyx7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRwYXRoID0gcmVwbGFjZUFsbChlbGVtZW50c1tpXS5wcm9maWxlT2JqZWN0RWxlbWVudC5lbGVtZW50SWQsXCJbLl1cIixcIi9cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgeHBhdGggPSAnL21vZGVsL3BlbmRpbmcvZGF0YS8nKyBpbmRpY2F0b3JTZXQgKycvJyArIGVsZW1lbnRwYXRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpdGVtVmFsdWUgPSBKU09OLnhwYXRoKHhwYXRoLCBpbmRPYmplY3QsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlICsgaXRlbVZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdwcm9maWxlT2JqZWN0V3JhcHBlcic6XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yU2V0ID0gZWxlbWVudHNbaV0ucHJvZmlsZU9iamVjdFdyYXBwZXIuaW5kaWNhdG9yU2V0SWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZE9iamVjdCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdhcHBQcm9maWxlJ11cIixhcHAuU0NPUEUud29ya2Zsb3cse30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50cGF0aCA9IHJlcGxhY2VBbGwoZWxlbWVudHNbaV0ucHJvZmlsZU9iamVjdFdyYXBwZXIud3JhcHBlckVsZW1lbnRJZCxcIlsuXVwiLFwiL1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB4cGF0aCA9ICcvJyArIGVsZW1lbnRwYXRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpdGVtVmFsdWUgPSBKU09OLnhwYXRoKHhwYXRoLCBpbmRPYmplY3QsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlICsgaXRlbVZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2N1cnJlbnRGaW5hbmNpYWxZZWFyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RhcnREYXRlID0gZWxlbWVudHNbaV0uY3VycmVudEZpbmFuY2lhbFllYXIuc3RhcnREYXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGFydE1vbnRoID0gZWxlbWVudHNbaV0uY3VycmVudEZpbmFuY2lhbFllYXIuc3RhcnRNb250aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmluYW5jaWFsWWVhciA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSArIFwiLVwiICsgc3RhcnRNb250aCArIFwiLVwiICsgc3RhcnREYXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgKyBmaW5hbmNpYWxZZWFyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJObyBtZXRob2QgZm91bmQgZnJvbSBpbXBsZW1lbnRlZCBsaXN0LlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cblxuXG4gICAgICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG5cblxufTtcblxuXG5mdW5jdGlvbiByZXBsYWNlQWxsKHR4dCwgcmVwbGFjZSwgd2l0aF90aGlzKSB7XG4gICAgaWYgKHR5cGVvZiB0eHQucmVwbGFjZSAhPSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcGxhY2UgKyAnICcgKyB3aXRoX3RoaXMpO1xuICAgICAgICBjb25zb2xlLmxvZyh0eHQpO1xuICAgIH1cbiAgICByZXR1cm4gdHh0LnJlcGxhY2UobmV3IFJlZ0V4cChyZXBsYWNlLCAnZycpLCB3aXRoX3RoaXMpO1xufVxuXG5mdW5jdGlvbiBmb3JtYXREYXRlKGRhdGUpIHtcbiAgXG4gIHZhciBkYXkgPSBkYXRlLmdldERhdGUoKTtcbiAgdmFyIG1vbnRoSW5kZXggPSBkYXRlLmdldE1vbnRoKCk7XG4gIHZhciB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuXG4gIHJldHVybiBkYXkgKyAnLScgKyBtb250aEluZGV4ICsgJy0nICsgeWVhcjtcbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICAgIGdldExhbmd1YWdlTWVzc2FnZTogZ2V0TGFuZ3VhZ2VNZXNzYWdlLFxuICAgIGdldE5vZGVWYWx1ZTogZ2V0Tm9kZVZhbHVlXG5cbn0iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbGl0eScpO1xuXG4vKipcbiAqIFVzZXIgSW50ZXJmYWNlIE1vZHVsZVxuICpcbiAqIEBtb2R1bGUgbGliL3VpXG4gKiBAYXV0aG9yIEJyZW50IEdvcmRvblxuICogQHZlcnNpb24gMC4xLjBcbiAqIEBkZXNjcmlwdGlvbiB0ZXN0IGRlc2NyaXB0aW9uXG4gKlxuICovXG5cbiAvKipcbiAgKiBHZXQgYWxsIHByb2Nlc3Mgc3ViLXByb2Nlc3NlcyB1c2VyIGludGVyZmFjZSBkYXRhXG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gcHJvY2VzcyBpZFxuICAqIEBwYXJhbSB7c3RyaW5nfSBsYW5nIC0gdGhlIHVzZXIgcHJlZmZlcmVkIGxhbmdhdWdlXG4gICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcbiAgKlxuICAqIEBleGFtcGxlICcnXG4gICpcbiAgKiBAcmV0dXJuICcnXG4gICpcbiAgKi9cbiBmdW5jdGlvbiBnZXRQcm9jZXNzKHByb2Nlc3NJZCwgbGFuZywgX1dGSW5zdGFuY2Upe1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBwcm9jZXNzTW9kZWwgPSBbXTtcbiAgICAgIHZhciBwcm9jZXNzSW5zdGFuY2UgPSBbXTtcbiAgICBcdF9XRkluc3RhbmNlLmluc3RhbmNlLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ocHJvY2Vzc0l0ZW0pe1xuICAgIFx0XHRpZiAocHJvY2Vzc0l0ZW0uaWQgPT0gcHJvY2Vzc0lkKSB7XG4gICAgXHRcdFx0cHJvY2Vzc0luc3RhbmNlID0gcHJvY2Vzc0l0ZW07XG4gICAgXHRcdH1cbiAgICBcdH0pXG4gICAgICAvLyBjb25zb2xlLmxvZyhwcm9jZXNzSW5zdGFuY2Uuc3ViUHJvY2Vzc2VzLmxlbmd0aCk7XG4gICAgICB1dGlsLnN5bmNMb29wKHByb2Nlc3NJbnN0YW5jZS5zdWJQcm9jZXNzZXMubGVuZ3RoLCBmdW5jdGlvbihsb29wKXtcbiAgXHRcdFx0dmFyIGNvdW50ZXIgPSBsb29wLml0ZXJhdGlvbigpO1xuICAgICAgICB2YXIgcHJvY2Vzc1NlcSA9IHByb2Nlc3NJbnN0YW5jZS5zZXE7XG4gICAgICAgIHZhciBzdWJQcm9jZXNzSWQgPSBwcm9jZXNzSW5zdGFuY2Uuc3ViUHJvY2Vzc2VzW2NvdW50ZXJdLmlkO1xuICAgICAgICB2YXIgc3ViUHJvY2Vzc1NlcSA9IHByb2Nlc3NJbnN0YW5jZS5zdWJQcm9jZXNzZXNbY291bnRlcl0uc2VxO1xuICAgICAgICBnZXRTdWJQcm9jZXNzKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBsYW5nLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihtb2RlbCl7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2cobW9kZWwpO1xuICAgICAgICAgIHByb2Nlc3NNb2RlbC5wdXNoKG1vZGVsKTtcbiAgICAgICAgICBsb29wLm5leHQoKTtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhwcm9jZXNzTW9kZWwpO1xuICBcdFx0XHR9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHByb2Nlc3NNb2RlbCk7XG4gIFx0XHRcdFx0bG9vcC5icmVhaygpO1xuICBcdFx0XHRcdHJlamVjdChlcnIpO1xuICBcdFx0XHR9KTtcbiAgXHRcdH0sIGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHByb2Nlc3NNb2RlbCk7XG4gIFx0XHRcdHJlc29sdmUocHJvY2Vzc01vZGVsKTtcbiAgXHRcdH0pO1xuICAgIH0gY2F0Y2goZXJyKXtcbiAgICAgIHJlamVjdChlcnIpO1xuICAgIH1cbiAgfSlcbn07XG5cbiAvKipcbiAgKiBHZXQgU3ViUHJvY2VzcyB1c2VyIGludGVyZmFjZSBkYXRhXG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gcHJvY2VzcyBpZFxuICAqIEBwYXJhbSB7bnVtYmVyfSBwcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHByb2Nlc3Mgc2VxXG4gICogQHBhcmFtIHtzdHJpbmd9IHN1YlByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN1Yi1wcm9jZXNzIGlkXG4gICogQHBhcmFtIHtudW1iZXJ9IHN1YlByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2Ugc3ViLXByb2Nlc3Mgc2VxXG4gICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcbiAgKlxuICAqIEBleGFtcGxlICcnXG4gICpcbiAgKiBAcmV0dXJuICcnXG4gICpcbiAgKi9cbmZ1bmN0aW9uIGdldFN1YlByb2Nlc3MocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIGxhbmcsIF9XRkluc3RhbmNlKXtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgIHRyeSB7XG4gICAgICB2YXIgbW9kZWwgPSB7XG4gICAgICAgIGlkOiAnJyxcbiAgICAgICAgc2VxOiAnJyxcbiAgICAgICAgbmFtZTogJycsXG4gICAgICAgIGhlbHA6ICcnLFxuICAgICAgICBkYXRlczogJycsXG4gICAgICAgIHN0ZXA6ICcnXG4gICAgICB9O1xuICAgICAgdmFyIHN1YlByb2Nlc3MgPSBbXTtcbiAgICBcdHZhciBzdWJQcm9jZXNzQ29uZiA9IFtdO1xuICAgIFx0X1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihwcm9jZXNzSXRlbSl7XG4gICAgXHRcdGlmIChwcm9jZXNzSXRlbS5pZCA9PSBwcm9jZXNzSWQgJiYgcHJvY2Vzc0l0ZW0uc2VxID09IHByb2Nlc3NTZXEpIHtcbiAgICBcdFx0XHR2YXIgc3BMZW5ndGggPSBwcm9jZXNzSXRlbS5zdWJQcm9jZXNzZXMubGVuZ3RoO1xuICAgIFx0XHRcdHByb2Nlc3NJdGVtLnN1YlByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24oc3ViUHJvY2Vzc0l0ZW0pe1xuICAgIFx0XHRcdFx0aWYgKHN1YlByb2Nlc3NJdGVtLmlkID09IHN1YlByb2Nlc3NJZCAmJiBzdWJQcm9jZXNzSXRlbS5zZXEgPT0gc3ViUHJvY2Vzc1NlcSAmJiBzdWJQcm9jZXNzSXRlbS5jb21wbGV0ZSA9PSBmYWxzZSkge1xuICAgIFx0XHRcdFx0XHRzdWJQcm9jZXNzID0gc3ViUHJvY2Vzc0l0ZW07XG4gICAgXHRcdFx0XHR9XG4gICAgXHRcdFx0fSlcbiAgICBcdFx0fVxuICAgIFx0fSlcbiAgICBcdC8vIEdldCB0aGUgY3VycmVudCBzdWJQcm9jZXNzIGNvbmZpZ3VyYXRpb25cbiAgICBcdF9XRkluc3RhbmNlLmNvbmZpZy5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHByb2Nlc3NDb25maWcpe1xuICAgIFx0XHRpZiAocHJvY2Vzc0NvbmZpZy5faWQgPT0gcHJvY2Vzc0lkKSB7XG4gICAgXHRcdFx0cHJvY2Vzc0NvbmZpZy5zdWJQcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHN1YlByb2Nlc3NDb25maWcpe1xuICAgIFx0XHRcdFx0aWYgKHN1YlByb2Nlc3NDb25maWcuX2lkID09IHN1YlByb2Nlc3NJZCkge1xuICAgIFx0XHRcdFx0XHRzdWJQcm9jZXNzQ29uZiA9IHN1YlByb2Nlc3NDb25maWc7XG4gICAgXHRcdFx0XHR9XG4gICAgXHRcdFx0fSlcbiAgICBcdFx0fVxuICAgIFx0fSlcbiAgICAgIC8vIFVwZGF0ZSB0aGUgbW9kZWxcbiAgICAgIG1vZGVsLmlkID0gc3ViUHJvY2Vzc0NvbmYuX2lkO1xuICAgICAgbW9kZWwuc2VxID0gc3ViUHJvY2Vzcy5zZXE7XG4gICAgICBtb2RlbC5uYW1lID0gdXRpbC5nZXROYW1lKHN1YlByb2Nlc3NDb25mLm5hbWUsIGxhbmcpO1xuICAgICAgbW9kZWwuaGVscCA9IHV0aWwuZ2V0TmFtZShzdWJQcm9jZXNzQ29uZi5oZWxwLCBsYW5nKTtcbiAgICAgIG1vZGVsLmRhdGVzID0gc3ViUHJvY2Vzcy5kYXRlcztcbiAgICAgIG1vZGVsLnN0ZXAgPSBzdWJQcm9jZXNzLnN0ZXA7XG4gICAgICByZXNvbHZlKG1vZGVsKTtcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgcmVqZWN0KGVycik7XG4gICAgfVxuICB9KVxufTtcblxuXG5cblxuZnVuY3Rpb24gcHJlcGFyZU5vdGlmaWNhdGlvblNjcmVlbigpe1xuXG4gIFwiXCJcbn07XG5cbiBtb2R1bGUuZXhwb3J0cyA9IHtcblxuICBnZXRQcm9jZXNzOiBnZXRQcm9jZXNzXG5cbiB9XG4iLCIndXNlIHN0cmljdCc7XG5cblxuZnVuY3Rpb24gZ2V0KCkge1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgfSk7XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gICAgZ2V0OiBnZXRcblxufSIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsaXR5Jyk7XG52YXIgYWN0aW9uc01vZHVsZSA9IHJlcXVpcmUoJy4vYWN0aW9ucycpO1xudmFyIGhlbHBlciA9IHJlcXVpcmUoJy4vaGVscGVyJyk7XG52YXIgZm9ybSA9IHJlcXVpcmUoJy4vZm9ybScpO1xuXG4vKipcbiAqIFByb2Nlc3MgTW9kdWxlXG4gKlxuICogQG1vZHVsZSBsaWIvcHJvY2Vzc1xuICogQGF1dGhvciBIYXNhbiBBYmJhc1xuICogQHZlcnNpb24gMC4yLjFcbiAqIEBkZXNjcmlwdGlvbiBXb3JrZmxvdyBpbXBsZW1lbnRhdGlvbiBjaGFuZ2VkIGFzIHBlciBuZXcgc2NoZW1hIGltcGxlbWVudGF0aW9uXG4gKlxuICovXG5cbi8qKlxuICogQ291bnQgYW4gYXJyYXkgb2YgaXRlbXNcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgLSB0aGUgYXJyYXkgZGF0YVxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuZnVuY3Rpb24gY291bnQoYXJyKSB7XG4gICAgaWYgKGFyciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBhcnIubGVuZ3RoO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxufTtcblxuLyoqXG4gKiBQcm9jZXNzIHByZS1yZXF1aXNpdGVzXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHByZXJlcXVpc2l0ZXMgLSB0aGUgcHJlLXJlcXVpc2l0ZXMgY29uZmlnIGRhdGFcbiAqXG4gKiBAZXhhbXBsZSAnJ1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cbmZ1bmN0aW9uIHByZVJlcXVpc2l0ZXMocHJlcmVxdWlzaXRlcywgX1dGSW5zdGFuY2UsIHNwdXVpZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIC8vIFVuY29tbWVudCBiZWxvdyBzZWN0aW9uIHdoZW4gcmVhZHkgdG8gaW1wbGVtZW50XG4gICAgICAgIHZhciBjb21wbGV0ZWQgPSBbXTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHV0aWwuc3luY0xvb3AocHJlcmVxdWlzaXRlcy5sZW5ndGgsIGZ1bmN0aW9uIChsb29wKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvdW50ZXIgPSBsb29wLml0ZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgIHByZVJlcXVpc2l0ZShwcmVyZXF1aXNpdGVzW2NvdW50ZXJdLCBfV0ZJbnN0YW5jZSwgc3B1dWlkKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGFsbCBwcmUtcmVxdWlzaXRlcyBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LlxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQucHVzaCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgbG9vcC5uZXh0KCk7XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQucHVzaChmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGxvb3AuYnJlYWsoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbXBsZXRlZC5ldmVyeShCb29sZWFuKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnUHJlLXJlcXVpc2l0ZXMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCB7fSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZQcmVSZXF1aXNpdGVFcnJvcicsICdOb3QgYWxsIHByZS1yZXF1aXNpdGVzIHBhc3NlZC4nKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG5cbiAgICB9KTtcbn07XG5cbi8qKlxuICogUHJvY2VzcyBwcmUtcmVxdWlzaXRlLCBleGVjdXRlIHRoZSBwcmUtcmVxdWlzaXRlIGNvbmRpdGlvbi5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gcHJlcmVxdWlzaXRlIC0gdGhlIHByZS1yZXF1aXNpdGUgY29uZmlnIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxuICpcbiAqIEBleGFtcGxlXG4gKiBQcm9jZXNzLnByZVJlcXVpc2l0ZShjb25maWcsIGNvdW50ZXIsIGluc3RhbmNlLCBkb2MpO1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cbmZ1bmN0aW9uIHByZVJlcXVpc2l0ZShwcmVyZXF1aXNpdGUsIF9XRkluc3RhbmNlLCBzcHV1aWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgXG5cbiAgICAgICAgaWYgKHByZXJlcXVpc2l0ZS5jaGVjay5udW1iZXJQcm9jZXNzSW5zdGFuY2VzICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICB2YXIgbnVtYmVyUHJvY2Vzc0luc3RhbmNlcyA9IHByZXJlcXVpc2l0ZS5jaGVjay5udW1iZXJQcm9jZXNzSW5zdGFuY2VzO1xuICAgICAgICAgICAgdmFyIF9maWx0ZXJPcGVyYXRvciA9IG51bWJlclByb2Nlc3NJbnN0YW5jZXMub3BlcmF0b3I7XG4gICAgICAgICAgICB2YXIgeHBhdGhPcGVyYXRvciA9ICcnO1xuICAgICAgICAgICAgc3dpdGNoIChfZmlsdGVyT3BlcmF0b3IpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdncmVhdGVyVGhhbic6XG4gICAgICAgICAgICAgICAgICAgIHhwYXRoT3BlcmF0b3IgPSAnZ3QnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdsZXNzVGhhbic6XG4gICAgICAgICAgICAgICAgICAgIHhwYXRoT3BlcmF0b3IgPSAnbHQnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdncmVhdGVyVGhhbkVxdWFsJzpcbiAgICAgICAgICAgICAgICAgICAgeHBhdGhPcGVyYXRvciA9ICdnZSc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2xlc3NUaGFuRXF1YWwnOlxuICAgICAgICAgICAgICAgICAgICB4cGF0aE9wZXJhdG9yID0gJ2xlJztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZXF1YWxUbyc6XG4gICAgICAgICAgICAgICAgICAgIHhwYXRoT3BlcmF0b3IgPSAnZXEnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdub3RFcXVhbFRvJzpcbiAgICAgICAgICAgICAgICAgICAgeHBhdGhPcGVyYXRvciA9ICduZSc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgX3N1YnByb2Nlc3NJZCA9IG51bWJlclByb2Nlc3NJbnN0YW5jZXMuc3ViUHJvY2Vzc0lkO1xuICAgICAgICAgICAgdmFyIF9maWx0ZXJFbGVtZW50ID0gXCJzdGVwL3N0YXR1c1wiO1xuICAgICAgICAgICAgdmFyIF9maWx0ZXJWYWx1ZSA9IG51bWJlclByb2Nlc3NJbnN0YW5jZXMudHlwZTtcbiAgICAgICAgICAgIHZhciBpbm5lclhwYXRoID0gXCIvXCIgKyBfZmlsdGVyRWxlbWVudCArIFwiWy4gZXEgJ1wiICsgX2ZpbHRlclZhbHVlICsgXCInXVwiO1xuXG4gICAgICAgICAgICB2YXIgZnVsbFBhdGggPSBcImNvdW50KC9zdWJwcm9jZXNzZXNbaWQgZXEgJ1wiICsgX3N1YnByb2Nlc3NJZCArIFwiJ11cIiArIGlubmVyWHBhdGggKyBcIilcIjtcblxuICAgICAgICAgICAgdmFyIHByZXJlcVByb2Nlc3NUeXBlID0gSlNPTi54cGF0aChcIi9jb25maWcvcHJvY2Vzc2VzL3N1YlByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgX3N1YnByb2Nlc3NJZCArIFwiJ10vdHlwZVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgdmFyIHBhcnQgPSBsaWJyYXJ5LmdldFN1YnByb2ZpbGVTdWJwcm9jZXNzSWRzKCk7XG5cbiAgICAgICAgICAgIGlmIChhcHAucHJvZmlsZS5zdWJwcm9maWxlSWQgIT0gdW5kZWZpbmVkICYmIGFwcC5wcm9maWxlLnN1YnByb2ZpbGVJZCAhPSAnJyAmJiBwcmVyZXFQcm9jZXNzVHlwZSAhPSB1bmRlZmluZWQgJiYgcHJlcmVxUHJvY2Vzc1R5cGUgPT0gUFJPQ0VTU19UWVBFX1NVQlBST0ZJTEUpIHtcbiAgICAgICAgICAgICAgICBmdWxsUGF0aCA9IFwiY291bnQoL3N1YnByb2Nlc3Nlc1tpZCBlcSAnXCIgKyBfc3VicHJvY2Vzc0lkICsgXCInIGFuZCBfaWQgPSBcIitwYXJ0K1wiXVwiICsgaW5uZXJYcGF0aCArIFwiKVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBzdWJqZWN0Q291bnQgPSBKU09OLnhwYXRoKGZ1bGxQYXRoLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgdmFyIGNvdW50VmFsdWUgPSBwcmVyZXF1aXNpdGUuY2hlY2subnVtYmVyUHJvY2Vzc0luc3RhbmNlcy5jb3VudDtcbiAgICAgICAgICAgIHZhciBjb21wYXJlID0gdXRpbC5jb21wYXJlKHN1YmplY3RDb3VudCwgcHJlcmVxdWlzaXRlLmNoZWNrLm51bWJlclByb2Nlc3NJbnN0YW5jZXMub3BlcmF0b3IsIHBhcnNlSW50KGNvdW50VmFsdWUpKTtcblxuXG4gICAgICAgICAgICBpZiAoY29tcGFyZSkge1xuICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdQcmUtcmVxdWlzaXRlcyBwYXNzZWQuJywge30pO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBoZWxwZXIuZ2V0TGFuZ3VhZ2VNZXNzYWdlKHByZXJlcXVpc2l0ZS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRlByZVJlcXVpc2l0ZUVycm9yJywgbWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH0gZWxzZSBpZiAocHJlcmVxdWlzaXRlLmNoZWNrLnZhcmlhYmxlICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICB2YXIgc2NvcGUgPSBwcmVyZXF1aXNpdGUuY2hlY2sudmFyaWFibGUuc2NvcGU7XG4gICAgICAgICAgICB2YXIgZmlsZU5hbWUgPSAnJztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoc2NvcGUgID09IFwicHJvZmlsZVwiKXtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB2YXIgcHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcbiAgICAgICAgICAgICAgICBmaWxlTmFtZSA9IHByb2ZpbGVJZCArICc6dmFyaWFibGVzJztcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChzY29wZSAgPT0gXCJzdWJQcm9maWxlU3ViUHJvY2Vzc0luc3RhbmNlXCIpIHtcblxuICAgICAgICAgICAgICAgIHZhciBzdWJQcm9maWxlSWQgPSBhcHAucHJvZmlsZS5zdWJwcm9maWxlSWQ7XG4gICAgICAgICAgICAgICAgZmlsZU5hbWUgPSBzdWJQcm9maWxlSWQgKyAnOnZhcmlhYmxlcyc7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KFwiRVJST1I6IFNjb3BlICdcIisgc2NvcGUgK1wiJyBub3QgaW1wbGVtZW50ZWQgaW4gcHJlLXJlcXVpc2l0ZXNcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRhby5nZXQoZmlsZU5hbWUpLnRoZW4oZnVuY3Rpb24oZmlsZSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHZhcmlhYmxlTmFtZSA9IHByZXJlcXVpc2l0ZS5jaGVjay52YXJpYWJsZS5uYW1lO1xuICAgICAgICAgICAgICAgIHZhciBvYmogPSBldmFsKCdmaWxlLicgKyB2YXJpYWJsZU5hbWUpO1xuICAgICAgICAgICAgICAgIHZhciBzdWJqZWN0VmFsdWVDYWxjdWxhdGVkO1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmogPT0gJ29iamVjdCcpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VxID0gSlNPTi54cGF0aChcImNvdW50KC9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHNwdXVpZCArIFwiJ10vcHJlY2VkaW5nLXNpYmxpbmc6Om5vZGUoKVtpZCA9IC9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHNwdXVpZCArIFwiJ10vaWRdKVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdICsgMTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1YnByb2Nlc3NUeXBlID0gSlNPTi54cGF0aChcIi9jb25maWcvcHJvY2Vzc2VzL3N1YlByb2Nlc3Nlc1tfaWQgZXEgL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXS9pZF0vdHlwZVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGFydCA9IGxpYnJhcnkuZ2V0U3VicHJvZmlsZVN1YnByb2Nlc3NJZHMoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1YnByb2Nlc3NUeXBlID09IFBST0NFU1NfVFlQRV9TVUJQUk9GSUxFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXEgPSBKU09OLnhwYXRoKFwiY291bnQoL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXS9wcmVjZWRpbmctc2libGluZzo6bm9kZSgpW2lkID0gL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXS9pZCBhbmQgX2lkID0gL3N1YnByb2Nlc3Nlc1tfaWQgPSBcIitwYXJ0K1wiXS9faWRdKVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdICsgMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWVQYXRoID0gXCIvXCIgKyB2YXJpYWJsZU5hbWUgKyBcIltzZXEgZXEgJ1wiICsgc2VxICsgXCInXS92YWx1ZVwiO1xuICAgICAgICAgICAgICAgICAgICBzdWJqZWN0VmFsdWVDYWxjdWxhdGVkID0gSlNPTi54cGF0aCh2YWx1ZVBhdGgsIGZpbGUsIHt9KVswXTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9iaiA9PSAnc3RyaW5nJykge1xuXG4gICAgICAgICAgICAgICAgICAgIHN1YmplY3RWYWx1ZUNhbGN1bGF0ZWQgPSBvYmo7XG5cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIHZhciBpbnB1dFZhbHVlID0gcHJlcmVxdWlzaXRlLmNoZWNrLnZhcmlhYmxlLnZhbHVlLmRhdGE7XG4gICAgICAgICAgICAgICAgdmFyIGlucHV0RGF0YVR5cGUgPSBwcmVyZXF1aXNpdGUuY2hlY2sudmFyaWFibGUudmFsdWUuZGF0YVR5cGUuZGF0YVR5cGU7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFyIGZpbmFsVmFsdWU7XG4gICAgICAgICAgICAgICAgaWYoaW5wdXREYXRhVHlwZSA9PSAnbnVtYmVyJyApe1xuICAgICAgICAgICAgICAgICAgICBmaW5hbFZhbHVlID0gTnVtYmVyKGlucHV0VmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihpbnB1dERhdGFUeXBlID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbmFsVmFsdWUgPSBpbnB1dFZhbHVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihpbnB1dERhdGFUeXBlID09ICdpbnRlZ2VyJyl7XG4gICAgICAgICAgICAgICAgICAgIGZpbmFsVmFsdWUgPSBwYXJzZUludChpbnB1dFZhbHVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoaW5wdXREYXRhVHlwZSA9PSAnZGVjaW1hbCcpe1xuICAgICAgICAgICAgICAgICAgICBmaW5hbFZhbHVlID0gcGFyc2VGbG9hdChpbnB1dFZhbHVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoaW5wdXREYXRhVHlwZSA9PSAnZGF0ZScgfHwgaW5wdXREYXRhVHlwZSA9PSAnZGF0ZVRpbWUnICl7XG4gICAgICAgICAgICAgICAgICAgIGZpbmFsVmFsdWUgPSBpbnB1dFZhbHVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBjb21wYXJlID0gdXRpbC5jb21wYXJlKHN1YmplY3RWYWx1ZUNhbGN1bGF0ZWQsIHByZXJlcXVpc2l0ZS5jaGVjay52YXJpYWJsZS5vcGVyYXRvciwgZmluYWxWYWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbXBhcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1ZhcmlhYmxlIFByZS1yZXF1aXNpdGVzIHBhc3NlZC4nLCB7fSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGhlbHBlci5nZXRMYW5ndWFnZU1lc3NhZ2UocHJlcmVxdWlzaXRlLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRlByZVJlcXVpc2l0ZUVycm9yJywgbWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcblxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gaGVscGVyLmdldExhbmd1YWdlTWVzc2FnZShwcmVyZXF1aXNpdGUubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgdmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZQcmVSZXF1aXNpdGVFcnJvcjonLCBtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICB2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRlByZVJlcXVpc2l0ZUVycm9yJywgJ1ByZS1yZXF1aXNpdGUgdHlwZSBub3QgZGVmaW5lZC4nKTtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG5cbiAgICAgICAgfVxuXG4gICAgICAgXG5cbiAgICB9KTtcbn07XG5cbi8qKlxuICogUHJvY2VzcyBwcmUtYWN0aW9uc3NcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gcHJlQWN0aW9ucyAtIHRoZSBwcmUtYWN0aW9ucyBjb25maWcgZGF0YVxuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcbiAqXG4gKiBAZXhhbXBsZSAnJ1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cbmZ1bmN0aW9uIHByZUFjdGlvbnMocHJlQWN0aW9ucywgX1dGSW5zdGFuY2UsIHNwdXVpZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciBjb21wbGV0ZWQgPSBbXTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciBzdWJQcm9jZXNzQ29uZmlnT2JqZWN0ID0gSlNPTi54cGF0aChcIi9wcm9jZXNzZXNbX2lkIGVxICdcIithcHAucHJvY2Vzc0lEK1wiJ10vc3ViUHJvY2Vzc2VzW19pZCBlcSAnXCIrIGFwcC5wcm9jZXNzSWQrXCInXVwiLCBfV0ZJbnN0YW5jZS5jb25maWcgLCB7fSlbMF07XG4gICAgICAgICAgICB2YXIgc3RlcE9iamVjdCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIrIGFwcC5TQ09QRS5wcm9jZXNzVVVJRCArXCInXS9zdGVwXCIsX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgIHV0aWwuc3luY0xvb3AocHJlQWN0aW9ucy5sZW5ndGgsIGZ1bmN0aW9uIChsb29wKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvdW50ZXIgPSBsb29wLml0ZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgIGFjdGlvbihwcmVBY3Rpb25zW2NvdW50ZXJdLCBhcHAucHJvY2Vzc0lELCBhcHAucHJvY2Vzc1NFUSwgYXBwLnByb2Nlc3NJZCwgYXBwLnByb2Nlc3NTZXEsIHN1YlByb2Nlc3NDb25maWdPYmplY3QsIHN0ZXBPYmplY3QgLF9XRkluc3RhbmNlLCB7fSwgc3B1dWlkKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGFsbCBwcmUtcmVxdWlzaXRlcyBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LlxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQucHVzaCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgbG9vcC5uZXh0KCk7XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQucHVzaChmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGxvb3AuYnJlYWsoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbXBsZXRlZC5ldmVyeShCb29sZWFuKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnUHJlLWFjdGlvbnMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCB7fSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZQcmVSZXF1aXNpdGVFcnJvcicsICdOb3QgYWxsIHByZS1hY3Rpb25zIHBhc3NlZC4nKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG5cbiAgICB9KTtcbn07XG5cbi8qKlxuICogV29ya2Zsb3cgZ2V0IHN1Yi1wcm9jZXNzIGRhdGEuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGlkIC0gdGhlIHN1YlByb2Nlc3MgY29uZmlnIGlkXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxuICpcbiAqIEBleGFtcGxlIFwiXCJcbiAqXG4gKiBAcmV0dXJuIFwiXCJcbiAqXG4gKi9cbmZ1bmN0aW9uIGdldFN1YlByb2Nlc3MoaWQsIF9XRkluc3RhbmNlKSB7XG4gICAgaWYgKF9XRkluc3RhbmNlLnN1YnByb2Nlc3NlcyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKHN1YlByb2Nlc3MpIHtcbiAgICAgICAgICAgIGlmIChzdWJQcm9jZXNzLmlkID09IGlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1YlByb2Nlc3M7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG4gICAgfVxuXG59O1xuXG4vKipcbiAqIFByb2Nlc3Mgc3ViLXByb2Nlc3NcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gcHJvY2VzcyAtIHRoZSBjdXJyZW50IHByb2Nlc3MgaWQgYW5kIHNlcVxuICogQHBhcmFtIHtvYmplY3R9IHN1YlByb2Nlc3MgLSB0aGUgc3ViLXByb2Nlc3MgaWQgYW5kIHNlcVxuICogQHBhcmFtIHtvYmplY3R9IGRhdGEgLSB0aGUgdXNlciBpbnB1dCBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuZnVuY3Rpb24gc3ViUHJvY2Vzcyhwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3VicHJvZmlsZUlkLCBkYXRhLCBfV0ZJbnN0YW5jZSkge1xuICAgIC8vIEdldCB0aGUgY3VycmVudCBwcm9jZXNzIHN1YlByb2Nlc3MgaW5zdGFuY2VcbiAgICAvLyB2YXIgc3ViUHJvY2Vzc1NlcSA9IDE7XG4gICAgdmFyIHN1YlByb2Nlc3MgPSBbXTtcbiAgICB2YXIgcHJvY2Vzc0NvbmYgPSBbXTtcbiAgICB2YXIgc3ViUHJvY2Vzc0NvbmYgPSBbXTtcbiAgICBfV0ZJbnN0YW5jZS5pbnN0YW5jZS5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChvYmpQcm9jZXNzKSB7XG4gICAgICAgIGlmIChvYmpQcm9jZXNzLmlkID09IHByb2Nlc3NJZCAmJiBvYmpQcm9jZXNzLnNlcSA9PSBwcm9jZXNzU2VxKSB7XG4gICAgICAgICAgICB2YXIgc3BMZW5ndGggPSBvYmpQcm9jZXNzLnN1YlByb2Nlc3Nlcy5sZW5ndGg7XG4gICAgICAgICAgICBvYmpQcm9jZXNzLnN1YlByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKG9ialN1YlByb2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBpZiAob2JqU3ViUHJvY2Vzcy5pZCA9PSBzdWJQcm9jZXNzSWQgJiYgb2JqU3ViUHJvY2Vzcy5zZXEgPT0gc3ViUHJvY2Vzc1NlcSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdXVpZCA9IG9ialN1YlByb2Nlc3MudXVpZDtcbiAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbiAoc3ViUHJvY2Vzc0l0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWJQcm9jZXNzSXRlbS5faWQgPT0gdXVpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3MgPSBzdWJQcm9jZXNzSXRlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgfSk7XG4gICAgLy8gR2V0IHRoZSBjdXJyZW50IHN1YlByb2Nlc3MgY29uZmlndXJhdGlvblxuICAgIF9XRkluc3RhbmNlLmNvbmZpZy5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChwcm9jZXNzQ29uZmlnKSB7XG4gICAgICAgIGlmIChwcm9jZXNzQ29uZmlnLl9pZCA9PSBwcm9jZXNzSWQpIHtcbiAgICAgICAgICAgIHByb2Nlc3NDb25mID0gcHJvY2Vzc0NvbmZpZztcbiAgICAgICAgICAgIHByb2Nlc3NDb25maWcuc3ViUHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbiAoc3ViUHJvY2Vzc0NvbmZpZykge1xuICAgICAgICAgICAgICAgIGlmIChzdWJQcm9jZXNzQ29uZmlnLl9pZCA9PSBzdWJQcm9jZXNzSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc0NvbmYgPSBzdWJQcm9jZXNzQ29uZmlnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICAvL1RPRE86IENoYW5nZSByZXF1aXJlZCB0byBtb3ZlIGlzQWN0aXZlIHRvIHN1YlByb2Nlc3MgZmlsZS5IZXJlXG4gICAgdmFyIGdyb3VwS2V5ID0gJyc7XG4gICAgdmFyIGJhc2VVVUlEID0gZGF0YS5iYXNlVVVJRDtcbiAgICBpZiAoYmFzZVVVSUQgIT0gdW5kZWZpbmVkICYmIGJhc2VVVUlEICE9ICcnICYmIGJhc2VVVUlELmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIHByZXZpb3VzT2JqZWN0ID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIGJhc2VVVUlEICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICBncm91cEtleSA9IHByZXZpb3VzT2JqZWN0Lmdyb3VwS2V5O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGdyb3VwS2V5ID0gZ2VuZXJhdGVVVUlEKCk7XG4gICAgfVxuICAgIFxuICAgIHZhciBjb3VudFN1YnByb2Nlc3NJbkNvbnRleHQgPSBKU09OLnhwYXRoKFwiY291bnQoL3Byb2Nlc3Nlcy9zdWJQcm9jZXNzZXNbZ3JvdXBLZXkgZXEgJ1wiKyBncm91cEtleSArXCInXSlcIiwgX1dGSW5zdGFuY2UuaW5zdGFuY2UgLHt9KVswXTtcbiAgICB2YXIgbGFiZWwgPSBkYXRhLmxhYmVsO1xuICAgIHZhciBzdWJQcm9jZXNzT2JqZWN0SWQgPSBnZW5lcmF0ZVVVSUQoKTtcbiAgICB2YXIgbW9kZWwgPSB7XG4gICAgICAgIF9pZDogc3ViUHJvY2Vzc09iamVjdElkLFxuICAgICAgICBpZDogc3ViUHJvY2Vzc0lkLFxuICAgICAgICB0eXBlOiAnd29ya2Zsb3dJbnN0YW5jZVN1YlByb2Nlc3MnLFxuICAgICAgICBzZXE6IHN1YlByb2Nlc3NTZXEsXG4gICAgICAgIGluaXRpYXRlZDogZmFsc2UsXG4gICAgICAgIGRhdGVzOiB7XG4gICAgICAgICAgICBjcmVhdGVkOiAnJyxcbiAgICAgICAgICAgIHZhbGlkOiAnJyxcbiAgICAgICAgICAgIHN0YXJ0OiAnJyxcbiAgICAgICAgICAgIGR1ZTogJycsXG4gICAgICAgICAgICBjbG9zZWQ6ICcnXG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBsZXRlOiBmYWxzZSxcbiAgICAgICAgaW5kaWNhdG9yczogW10sXG4gICAgICAgIHN0ZXA6IHt9LFxuICAgICAgICBhY3RpdmU6IHRydWUsXG4gICAgICAgIGdyb3VwS2V5OiBncm91cEtleSxcbiAgICAgICAgbGFiZWw6IGxhYmVsLFxuICAgICAgICBjaGFubmVsczogW1xuICAgICAgICAgICAgXCJjb21tdW5pdHlfXCIgKyBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKSxcbiAgICAgICAgICAgIFwicHJvZmlsZV9cIiArIGFwcC5TQ09QRS5wcm9maWxlSWQsXG4gICAgICAgICAgICBcImFwcGxpY2F0aW9uX1wiICsgYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQsXG4gICAgICAgICAgICBcImNvbW11bml0eV9cIiArIGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpICsgXCJfYXBwbGljYXRpb25fXCIgKyBhcHAuU0NPUEUuYXBwbGljYXRpb25JZFxuICAgICAgICBdLFxuICAgICAgICBoaXN0b3J5OiBbXSxcbiAgICAgICAgLy9tZXRhIGluZm9ybWF0aW9uIGFkZGVkIGZvciBzZXJ2ZXIgc2lkZSBjb25mbGljdCBtYW5hZ2VtZW50IGFuZCBtZXJnZXJcbiAgICAgICAgXCJtZXRhLWRhdGFcIjoge1xuICAgICAgICAgICAgYXBwbGljYXRpb25JZDogYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQsXG4gICAgICAgICAgICBjb21tdW5pdHlJZDogYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCksXG4gICAgICAgICAgICBwcm9maWxlSWQ6IGFwcC5TQ09QRS5wcm9maWxlSWQsXG4gICAgICAgICAgICBzdWJwcm9maWxlSWQ6IHN1YnByb2ZpbGVJZCA9PSB1bmRlZmluZWQ/ICcnOiBzdWJwcm9maWxlSWQsXG4gICAgICAgICAgICBwcm9jZXNzQ29uZmlnSWQ6IHByb2Nlc3NJZCxcbiAgICAgICAgICAgIHN1YlByb2Nlc3NDb25maWdJZDogc3ViUHJvY2Vzc0lkLFxuICAgICAgICAgICAgc3ViUHJvY2Vzc0luc1NlcTogY291bnRTdWJwcm9jZXNzSW5Db250ZXh0ICsgMVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlcy5wdXNoKG1vZGVsKTtcbiAgICAvLyBSZXR1cm4gYSBwcm9taXNlXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgLy8gQ2F0Y2ggYWxsIHVuY2F1Z2h0IGVycm9yc1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gMS4gUHJvY2VzcyB0aGUgcHJlLWFjdGlvbnNcbiAgICAgICAgICAgIHZhciBwcmVBY3Rpb25zQ29uZiA9IHByb2Nlc3NDb25mLnByZUFjdGlvbnM7XG4gICAgICAgICAgICAvL2FjdGlvbihhY3Rpb25zW2NvdW50ZXJdLCBwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3ViUHJvY2Vzcywgc3RlcCwgX1dGSW5zdGFuY2UsIGRhdGEsIHV1aWQpXG4gICAgICAgICAgICBwcmVBY3Rpb25zKHByZUFjdGlvbnNDb25mLCBfV0ZJbnN0YW5jZSwgc3ViUHJvY2Vzc09iamVjdElkKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAvLyAyLiBQcm9jZXNzIHRoZSBwcmUtcmVxdWlzaXRlc1xuICAgICAgICAgICAgICAgIHZhciBwcmVyZXF1aXNpdGVDb25mID0gcHJvY2Vzc0NvbmYucHJlcmVxdWlzaXRlcztcbiAgICAgICAgICAgICAgICBwcmVSZXF1aXNpdGVzKHByZXJlcXVpc2l0ZUNvbmYsIF9XRkluc3RhbmNlLCBzdWJQcm9jZXNzT2JqZWN0SWQpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAvLyAzLiBJbml0aWF0ZSB0aGUgc3ViUHJvY2Vzc1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5pdGlhdGVDb25mID0gc3ViUHJvY2Vzc0NvbmYuaW5pdGlhdGU7XG4gICAgICAgICAgICAgICAgICAgIGluaXRpYXRlKGluaXRpYXRlQ29uZiwgc3ViUHJvY2VzcywgZGF0YSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL1VwZGF0ZSB0aGUgc3ViUHJvY2VzcyBtb2RlbFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuaW5pdGlhdGVkID0gcmVzdWx0LmRhdGEuaW5pdGlhdGVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuZGF0ZXMgPSByZXN1bHQuZGF0YS5kYXRlcztcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEV4ZWN1dGUgdGhlIGZpcnN0IHN0ZXBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGVwSWQgPSBzdWJQcm9jZXNzQ29uZi5zdGVwc1swXS5faWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHJhbnNpdGlvbklkID0gc3ViUHJvY2Vzc0NvbmYuc3RlcHNbMF0udHJhbnNpdGlvblswXS5faWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RlcFNlcSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdGVwSWQsIHN0ZXBTZXEsIGRhdGEsIF9XRkluc3RhbmNlLCBzdWJQcm9jZXNzT2JqZWN0SWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5zdGVwID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGljYXRvcnMoc3ViUHJvY2Vzc0NvbmYuaW5kaWNhdG9ycywgX1dGSW5zdGFuY2UsIG1vZGVsLl9pZCkudGhlbihmdW5jdGlvbiAocmVzdWx0MSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuaW5kaWNhdG9ycyA9IHJlc3VsdDEuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEV4ZWN1dGUgdGhlIHRyYW5zaXRpb25zLCBpZiBhdXRvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1N1YnByb2Nlc3MgcG9zdEFjdGlvbnMgcmVtb3ZlZCBmcm9tIGhlcmUgYXMgdGhleSBzaG91bGQgYmUgZXhlY3V0ZWQgYXQgdGhlIGVuZCBvZiB0aGUgc3ViUHJvY2VzcywgbWVhbnMgYXQgbGFzdCBzdGVwIGFmdGVyIHRyYW5zaXRpb24sIGp1c3QgYmVmb3JlIGZpbmlzaC5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENhbiBhZGQgaGlzdG9yeSBvYmplY3QgaGVyZSBpbiBjYXNlIGZvciBmaXJzdCBzdGVwLCBpLmUgaW5pdGlhbGlzYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1vZGVsLmhpc3RvcnkucHVzaChyZXN1bHQuZGF0YSk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MocmVzdWx0MS5tZXNzYWdlLCBtb2RlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMgPSBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gIShvYmouX2lkID09IHN1YlByb2Nlc3NPYmplY3RJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzID0gX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gIShvYmouX2lkID09IHN1YlByb2Nlc3NPYmplY3RJZCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLnN1YnByb2Nlc3NlcyA9IF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIShvYmouX2lkID09IHN1YlByb2Nlc3NPYmplY3RJZCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG5cbiAgICB9KTtcbn07XG5cbi8qKlxuICogUHJvY2VzcyBpbml0aWF0ZVxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBpbml0aWF0ZSAtIHRoZSBpbml0aWF0ZSBjb25maWcgZGF0YVxuICogQHBhcmFtIHtvYmplY3R9IGRhdGEgLSB0aGUgdXNlciBpbnB1dCBkYXRhXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiBpbml0aWF0ZShpbml0aWF0ZSwgc3ViUHJvY2VzcywgZGF0YSkge1xuICAgIHZhciBjb21wbGV0ZWQgPSBbXTtcbiAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgICBpbml0aWF0ZWQ6IGZhbHNlLFxuICAgICAgICBkYXRlczoge1xuICAgICAgICAgICAgY3JlYXRlZDogJycsXG4gICAgICAgICAgICB2YWxpZDogJycsXG4gICAgICAgICAgICBzdGFydDogJycsXG4gICAgICAgICAgICBkdWU6ICcnLFxuICAgICAgICAgICAgY2xvc2VkOiAnJ1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGlmIChpbml0aWF0ZS51c2VyICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5kYXRlcy5jcmVhdGVkID0gZGF0YS5jcmVhdGVkRGF0ZTtcbiAgICAgICAgICAgICAgICBpZiAoaW5pdGlhdGUudXNlci52YWxpZERhdGUuX3R5cGUgPT0gJ3VzZXJTZWxlY3RlZCcgfHwgaW5pdGlhdGUudXNlci52YWxpZERhdGUuX3R5cGUgPT0gJ2F1dG9TZWxlY3RlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEudmFsaWREYXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5kYXRlcy52YWxpZCA9IGRhdGEudmFsaWREYXRlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC53YXJuKCdXRkluaXRpYXRlRXJyb3InLCAnTm8gdmFsaWQgZGF0ZSBwYXNzZWQgaW4gLSB7ZGF0YS52YWxpZERhdGV9Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChpbml0aWF0ZS51c2VyLmR1ZURhdGUuX3R5cGUgPT0gJ3VzZXJTZWxlY3RlZCcgfHwgaW5pdGlhdGUudXNlci5kdWVEYXRlLl90eXBlID09ICdhdXRvU2VsZWN0ZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmR1ZURhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmRhdGVzLmR1ZSA9IGRhdGEuZHVlRGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwud2FybignV0ZJbml0aWF0ZUVycm9yJywgJ05vIGR1ZSBkYXRlIHBhc3NlZCBpbiAtIHtkYXRhLmR1ZURhdGV9Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlc3VsdC5kYXRlcy5zdGFydCA9IGRhdGEuZmlyc3REYXRlO1xuXG5cblxuICAgICAgICAgICAgICAgIHJlc3VsdC5pbml0aWF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdTdWItUHJvY2VzcyBpbml0aWF0ZSBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChpbml0aWF0ZS5hdXRvICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICByZXN1bHQuZGF0ZXMuY3JlYXRlZCA9IGRhdGEuY3JlYXRlZERhdGU7XG5cbiAgICAgICAgICAgICAgICBpZiAoaW5pdGlhdGUuZGF0ZXMudmFsaWQuX3R5cGUgPT0gJ3VzZXJTZWxlY3RlZCcgfHwgaW5pdGlhdGUuZGF0ZXMudmFsaWQuX3R5cGUgPT0gJ2F1dG9TZWxlY3RlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEudmFsaWREYXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5kYXRlcy52YWxpZCA9IGRhdGEudmFsaWREYXRlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC53YXJuKCdXRkluaXRpYXRlRXJyb3InLCAnTm8gdmFsaWQgZGF0ZSBwYXNzZWQgaW4gLSB7ZGF0YS52YWxpZERhdGV9Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChpbml0aWF0ZS5kYXRlcy5kdWUuX3R5cGUgPT0gJ3VzZXJTZWxlY3RlZCcgfHwgaW5pdGlhdGUuZGF0ZXMuZHVlLl90eXBlID09ICdhdXRvU2VsZWN0ZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmR1ZURhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmRhdGVzLmR1ZSA9IGRhdGEuZHVlRGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwud2FybignV0ZJbml0aWF0ZUVycm9yJywgJ05vIGR1ZSBkYXRlIHBhc3NlZCBpbiAtIHtkYXRhLmR1ZURhdGV9Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlc3VsdC5pbml0aWF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdTdWItUHJvY2VzcyBpbml0aWF0ZSBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTsqL1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgdmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZJbml0aWF0ZUVycm9yJywgJ0luaXRpYXRlIHR5cGU6ICcgKyBpbml0aWF0ZS5fdHlwZSArICcgbm90IGRlZmluZWQuJyk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3ViUHJvY2Vzcy5jb21wbGV0ZSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGluaXQoKTtcbiAgICAgICAgfSBlbHNlIGlmICghc3ViUHJvY2Vzcy5jb21wbGV0ZSkge1xuICAgICAgICAgICAgaWYgKGluaXRpYXRlLnBhcmFsbGVsSW5zdGFuY2VzKSB7XG4gICAgICAgICAgICAgICAgaW5pdCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRkluaXRpYXRlRXJyb3InLCAnU3ViLXByb2Nlc3M6ICcgKyBzdWJQcm9jZXNzLmlkICsgJyBzdGlsbCBhY3RpdmUgYW5kIHBhcmFsbGVsIGluc3RhbmNlcyBhcmUgbm90IGFsbG93ZWQuJyk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9KTtcbn07XG5cbi8qKlxuICogUHJvY2VzcyBzdGVwXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NJZCAtIHRoZSBjdXJyZW50IHByb2Nlc3MgaWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdWJQcm9jZXNzSWQgLSB0aGUgY3VycmVudCBzdWItcHJvY2VzcyBpZFxuICogQHBhcmFtIHtzdHJpbmd9IHN0ZXBJZCAtIHRoZSBjdXJyZW50IHN1Yi1wcm9jZXNzIHN0ZXAgaWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGVwU2VxIC0gdGhlIGN1cnJlbnQgc3ViLXByb2Nlc3Mgc3RlcCBpbnN0YW5jZSBjb3VudGVyIC8gc2VxdWVuY2VcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIC0gdGhlIHVzZXIgaW5wdXQgZGF0YVxuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgX1dGSW5zdGFuY2UgY29uc3RydWN0b3IgaW5zdGFuY2VcbiAqXG4gKiBAZXhhbXBsZSAnJ1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cbmZ1bmN0aW9uIHN0ZXAocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwgc3RlcFNlcSwgZGF0YSwgX1dGSW5zdGFuY2UsIHNwdXVpZCkge1xuXG4gICAgLy8gRGVmYXVsdCBzdGVwIG1vZGVsXG4gICAgdmFyIG1vZGVsID0ge1xuICAgICAgICBrZXk6IGdlbmVyYXRlVVVJRCgpLFxuICAgICAgICBpZDogJycsXG4gICAgICAgIHNlcTogJycsXG4gICAgICAgIHN0YXR1czogJycsXG4gICAgICAgIG1lc3NhZ2U6ICcnLFxuICAgICAgICBhc3NpZ25lZFRvOiB7XG4gICAgICAgICAgICB1c2VySWQ6ICcnLFxuICAgICAgICAgICAgbmFtZTogJydcbiAgICAgICAgfSxcbiAgICAgICAgYXNzaWdubWVudDoge30sXG4gICAgICAgIGNvbW1lbnQ6ICcnXG4gICAgfTtcblxuICAgIHZhciBzdWJQcm9jZXNzID0ge307XG5cbiAgICB2YXIgdXVpZCA9ICcnO1xuICAgIHZhciBpbnN0U3ViUHJvY2VzcztcbiAgICB2YXIgc3RlcCA9IHt9O1xuXG4gICAgdmFyIHRyYW5zaXRpb25JZCA9ICcnO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvL0dldCB0aGUgY3VycmVudCBzdWJQcm9jZXNzIGluc3RhbmNlIGRhdGFcbiAgICAgICAgICAgIF9XRkluc3RhbmNlLmluc3RhbmNlLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKG9ialByb2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBpZiAob2JqUHJvY2Vzcy5pZCA9PSBwcm9jZXNzSWQgJiYgb2JqUHJvY2Vzcy5zZXEgPT0gcHJvY2Vzc1NlcSkge1xuICAgICAgICAgICAgICAgICAgICBvYmpQcm9jZXNzLnN1YlByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKG9ialN1YlByb2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmpTdWJQcm9jZXNzLmlkID09IHN1YlByb2Nlc3NJZCAmJiBvYmpTdWJQcm9jZXNzLnNlcSA9PSBzdWJQcm9jZXNzU2VxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXVpZCA9IG9ialN1YlByb2Nlc3MudXVpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKHN1YlByb2Nlc3NJdGVtKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN1YlByb2Nlc3NJdGVtLl9pZCA9PSB1dWlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGluc3RTdWJQcm9jZXNzID0gc3ViUHJvY2Vzc0l0ZW07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgX1dGSW5zdGFuY2UuY29uZmlnLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKG9ialByb2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBpZiAob2JqUHJvY2Vzcy5faWQgPT0gcHJvY2Vzc0lkKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ialByb2Nlc3Muc3ViUHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbiAob2JqU3ViUHJvY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9ialN1YlByb2Nlc3MuX2lkID09IHN1YlByb2Nlc3NJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3MgPSBvYmpTdWJQcm9jZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ialN1YlByb2Nlc3Muc3RlcHMuZmlsdGVyKGZ1bmN0aW9uIChvYmpTdGVwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmpTdGVwLl9pZCA9PSBzdGVwSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXAgPSBvYmpTdGVwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgc3ViLXByb2Nlc3Mgc3RlcCBkYXRhXG4gICAgICAgICAgICBtb2RlbC5pZCA9IHN0ZXBJZDtcbiAgICAgICAgICAgIG1vZGVsLnNlcSA9IHN0ZXBTZXE7XG5cbiAgICAgICAgICAgIHZhciBpbnN0YW5jZVN0YXR1cyA9ICcnO1xuICAgICAgICAgICAgaWYgKHN0ZXAuc2V0SW5zdGFuY2VTdGF0dXNUby5Ob3RTdGFydGVkICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlU3RhdHVzID0gXCJOb3RTdGFydGVkXCI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0ZXAuc2V0SW5zdGFuY2VTdGF0dXNUby5DcmVhdGVkICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlU3RhdHVzID0gXCJDcmVhdGVkXCI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0ZXAuc2V0SW5zdGFuY2VTdGF0dXNUby5JblByb2dyZXNzICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlU3RhdHVzID0gXCJJblByb2dyZXNzXCI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0ZXAuc2V0SW5zdGFuY2VTdGF0dXNUby5TdWJtaXR0ZWQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VTdGF0dXMgPSBcIlN1Ym1pdHRlZFwiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGVwLnNldEluc3RhbmNlU3RhdHVzVG8uQ29tcGxldGUgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VTdGF0dXMgPSBcIkNvbXBsZXRlXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBsYW5ndWFnZSA9IHNlcnZpY2UuZ2V0TGFuZ3VhZ2UoKTtcblxuICAgICAgICAgICAgbW9kZWwuc3RhdHVzID0gaW5zdGFuY2VTdGF0dXM7XG4gICAgICAgICAgICBtb2RlbC5tZXNzYWdlID0gZXZhbChcInN0ZXAuc2V0SW5zdGFuY2VTdGF0dXNUby5cIiArIGluc3RhbmNlU3RhdHVzICsgXCIubGFiZWwuaTE4bi5cIiArIGxhbmd1YWdlKTtcbiAgICAgICAgICAgIG1vZGVsLmNvbW1lbnQgPSBkYXRhLmNvbW1lbnQgIT09IHVuZGVmaW5lZCA/IGRhdGEuY29tbWVudCA6ICcnO1xuICAgICAgICAgICAgdmFyIGluZGljYXRvcnMgPSBpbnN0U3ViUHJvY2VzcyAhPT0gdW5kZWZpbmVkID8gaW5zdFN1YlByb2Nlc3MuaW5kaWNhdG9ycyA6IFtdO1xuXG4gICAgICAgICAgICB2YXIgdXBkYXRlU1BJbmRpY2F0b3JPYmplY3QgPSBmdW5jdGlvbihpbmRpY2F0b3JzLCBfV0ZJbnN0YW5jZSl7XG5cbiAgICAgICAgICAgICAgICBpZihpbmRpY2F0b3JzLmxlbmd0aCA+IDApe1xuXG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIgaT0wIDsgaSA8IGluZGljYXRvcnMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvck9iamVjdCAgPSBpbmRpY2F0b3JzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHV1aWQgPSBpbmRpY2F0b3JPYmplY3QuaW5zdGFuY2VzWzBdLnV1aWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdWRwYXRlZFNlcSA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tfaWQgZXEgJ1wiKyB1dWlkICtcIiddL21vZGVsL3BlbmRpbmcvc2VxXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRpY2F0b3JPYmplY3QuaW5zdGFuY2VzWzBdLnNlcSA9IHVkcGF0ZWRTZXE7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGluZGljYXRvckRvY3MocHJvY2Vzc0lkLCBpbmRpY2F0b3JzLCBtb2RlbCwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHV1aWQgPSBzcHV1aWQ7XG5cbiAgICAgICAgICAgICAgICBpZiAoc3RlcC5mdW5jdGlvbi5hY3Rpb25zICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb25zKHN0ZXAuZnVuY3Rpb24uYWN0aW9ucywgcHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN1YlByb2Nlc3MsIG1vZGVsLCBfV0ZJbnN0YW5jZSwgZGF0YSwgc3B1dWlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVNQSW5kaWNhdG9yT2JqZWN0KGluZGljYXRvcnMsIF9XRkluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHJhbnNpdGlvbklkID0gc3RlcC50cmFuc2l0aW9uWzBdLl9pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdGVwSWQsIHRyYW5zaXRpb25JZCwgZGF0YSwgX1dGSW5zdGFuY2UsIHNwdXVpZCwgbW9kZWwpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnVHJhbnNpdGlvbiBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHJlc3VsdC5kYXRhLnN0ZXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0ZXAuZnVuY3Rpb24udGFzayAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTWFrZSBhc3NpZ25tZW50c1xuICAgICAgICAgICAgICAgICAgICB0YXNrKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3RlcC5mdW5jdGlvbi50YXNrLCBzcHV1aWQsIG1vZGVsKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlU1BJbmRpY2F0b3JPYmplY3QoaW5kaWNhdG9ycywgX1dGSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1Rhc2sgYXdhaXRpbmcgdXNlciBhY3Rpb24uJywgbW9kZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG5cbiAgICB9KTtcbn07XG5cbi8qKlxuICogUHJvY2VzcyBpbmRpY2F0b3IgdXBkYXRlc1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBhY3Rpb25zIC0gdGhlIGFjdGlvbnMgY29uZmlnIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBzdWJQcm9jZXNzIC0gdGhlIGN1cnJlbnQgc3ViLXByb2Nlc3MgZm9ybSBjb25maWcgZGF0YVxuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcbiAqXG4gKiBAZXhhbXBsZSAnJ1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cbmZ1bmN0aW9uIGluZGljYXRvcnMoaW5kaWNhdG9ycywgX1dGSW5zdGFuY2UsIHNwdXVpZCkge1xuICAgIHZhciBtb2RlbCA9IFtdO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgYXJyYXkgPSBKU09OLnhwYXRoKFwiaW5kaWNhdG9yc1tmbjpjb3VudCguL3dvcmtmbG93cy9wcm9jZXNzZXNbc3ViUHJvY2Vzc1VVSUQgZXEgJ1wiICsgc3B1dWlkICsgXCInXSkgZ3QgMF1cIiwgX1dGSW5zdGFuY2UsIHt9KTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgYXJyYXkubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yID0gYXJyYXlbal07XG4gICAgICAgICAgICAgICAgdmFyIGluZGljYXRvck1vZGVsID0ge1xuICAgICAgICAgICAgICAgICAgICBpZDogJycsXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlczogW11cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgaW5zdGFuY2VNb2RlbCA9IHtcbiAgICAgICAgICAgICAgICAgICAgdXVpZDogJycsXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnJyxcbiAgICAgICAgICAgICAgICAgICAga2V5OiAnJyxcbiAgICAgICAgICAgICAgICAgICAgc2VxOiAxLFxuICAgICAgICAgICAgICAgICAgICByZXY6ICcnXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaW5kaWNhdG9yTW9kZWwuaWQgPSBpbmRpY2F0b3IuY2F0ZWdvcnkudGVybTtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZU1vZGVsLnV1aWQgPSBpbmRpY2F0b3IuX2lkO1xuICAgICAgICAgICAgICAgIGluc3RhbmNlTW9kZWwucmV2ID0gaW5kaWNhdG9yLl9yZXY7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VNb2RlbC50aXRsZSA9IGluZGljYXRvci50aXRsZTtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZU1vZGVsLmtleSA9ICcnO1xuICAgICAgICAgICAgICAgIGluc3RhbmNlTW9kZWwuc2VxID0gaW5kaWNhdG9yLm1vZGVsLnBlbmRpbmcuc2VxOyAvLyBpbmRpY2F0b3Igc2VxIG51bWJlciBoZXJlIHdoaWNoIGlzIGdldHRpbmcgdXBkYXRlZC5cbiAgICAgICAgICAgICAgICBpbmRpY2F0b3JNb2RlbC5pbnN0YW5jZXMucHVzaChpbnN0YW5jZU1vZGVsKTtcbiAgICAgICAgICAgICAgICBtb2RlbC5wdXNoKGluZGljYXRvck1vZGVsKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1Byb2Nlc3MgaW5kaWNhdG9yIG1vZGVsIHVwZGF0ZWQuJywgbW9kZWwpO1xuICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgfSlcbn07XG5cbi8qKlxuICogUHJvY2VzcyBhc3NpZ24gdXNlclxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBwcm9jZXNzIGlkXG4gKiBAcGFyYW0ge251bWJlcn0gcHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBwcm9jZXNzIHNlcVxuICogQHBhcmFtIHtzdHJpbmd9IHN1YlByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN1Yi1wcm9jZXNzIGlkXG4gKiBAcGFyYW0ge251bWJlcn0gc3ViUHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBzdWItcHJvY2VzcyBzZXFcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdGVwSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdGVwIGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gdHJhbnNpdGlvbklkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gdHJhbnNpdGlvbiBpZFxuICogQHBhcmFtIHtvYmplY3R9IHVzZXIgLSB0aGUgdXNlciB0byBhc3NpZ24gdG9cbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiBhc3NpZ25Vc2VyKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCB1c2VyLCBfV0ZJbnN0YW5jZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgdXVpZCA9ICcnO1xuICAgICAgICAgICAgLy8gR2V0IHRoZSBjdXJyZW50IHN1YlByb2Nlc3MgaW5zdGFuY2UgZGF0YVxuICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbiAob2JqUHJvY2Vzcykge1xuICAgICAgICAgICAgICAgIGlmIChvYmpQcm9jZXNzLmlkID09IHByb2Nlc3NJZCAmJiBvYmpQcm9jZXNzLnNlcSA9PSBwcm9jZXNzU2VxKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ialByb2Nlc3Muc3ViUHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbiAob2JqU3ViUHJvY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9ialN1YlByb2Nlc3MuaWQgPT0gc3ViUHJvY2Vzc0lkICYmIG9ialN1YlByb2Nlc3Muc2VxID09IHN1YlByb2Nlc3NTZXEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dWlkID0gb2JqU3ViUHJvY2Vzcy51dWlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChzdWJQcm9jZXNzSXRlbSkge1xuICAgICAgICAgICAgICAgIGlmIChzdWJQcm9jZXNzSXRlbS5faWQgPT0gdXVpZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBTZXQgdGhlIHVzZXIgZGV0YWlsc1xuICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzSXRlbS5zdGVwLmFzc2lnbmVkVG8udXNlcklkID0gdXNlci5pZDtcbiAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc0l0ZW0uc3RlcC5hc3NpZ25lZFRvLm5hbWUgPSB1c2VyLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgaW5kaWNhdG9ycyB1c2VyIGRldGFpbHNcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvcnMgPSBzdWJQcm9jZXNzSXRlbS5pbmRpY2F0b3JzO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluZGljYXRvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3IgPSBpbmRpY2F0b3JzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBpbmRpY2F0b3IuaW5zdGFuY2VzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gaW5kaWNhdG9yLmluc3RhbmNlc1tqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IF9XRkluc3RhbmNlLmluZGljYXRvcnMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRvYyA9IF9XRkluc3RhbmNlLmluZGljYXRvcnNba107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZS51dWlkID09IGRvYy5faWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvYy53b3JrZmxvd3MuZmlsdGVyKGZ1bmN0aW9uICh3b3JrZmxvdykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3b3JrZmxvdy5pZCA9PSBfV0ZJbnN0YW5jZS5jb25maWcuX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtmbG93LnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKHByb2Nlc3NJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvY2Vzc0l0ZW0uaWQgPT0gcHJvY2Vzc0lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSB1c2VyIGlkIGFuZCBuYW1lIGluIHRoZSBkb2N1bWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NJdGVtLnN0ZXAuYXNzaWduZWRUby51c2VySWQgPSB1c2VyLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NJdGVtLnN0ZXAuYXNzaWduZWRUby5uYW1lID0gdXNlci5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1VzZXIgYXNzaWduZWQgc3VjY2Vzc2Z1bGx5LiBVc2VySWQ6IFwiJyArIHVzZXIuaWQgKyAnXCIsIE5hbWU6IFwiJyArIHVzZXIubmFtZSArICdcIicsIHN1YlByb2Nlc3NJdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cblxuICAgIH0pO1xufTtcblxuLyoqXG4gKiBQcm9jZXNzIGluZGljYXRvciBkb2N1bWVudCB1cGRhdGVzXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGFjdGlvbnMgLSB0aGUgYWN0aW9ucyBjb25maWcgZGF0YVxuICogQHBhcmFtIHtvYmplY3R9IHN1YlByb2Nlc3MgLSB0aGUgY3VycmVudCBzdWItcHJvY2VzcyBmb3JtIGNvbmZpZyBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuZnVuY3Rpb24gaW5kaWNhdG9yRG9jcyhwcm9jZXNzSWQsIGluZGljYXRvcnMsIHN0ZXAsIF9XRkluc3RhbmNlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgaW5kaWNhdG9yIHNlY3Rpb25zIG9mIHRoZSBzdWJQcm9jZXNzXG4gICAgICAgICAgICBpZiAoaW5kaWNhdG9ycyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRkluZGljYXRvcnNVcGRhdGUnLCAnSW5kaWNhdG9ycyBwYXJhbWV0ZXIgaXMgcmVxdWlyZWQuIC0gVmFsdWU6ICcgKyBpbmRpY2F0b3JzKVxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluZGljYXRvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvciA9IGluZGljYXRvcnNbaV07XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaW5kaWNhdG9yLmluc3RhbmNlcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gaW5kaWNhdG9yLmluc3RhbmNlc1tqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkb2MgPSBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzW2tdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZS51dWlkID09IGRvYy5faWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jLndvcmtmbG93cy5maWx0ZXIoZnVuY3Rpb24gKHdvcmtmbG93KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod29ya2Zsb3cuaWQgPT0gX1dGSW5zdGFuY2UuY29uZmlnLl9pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtmbG93LnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKHByb2Nlc3NJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzSXRlbS5pZCA9PSBwcm9jZXNzSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NJdGVtLnN0ZXAuaWQgPSBzdGVwLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0l0ZW0uc3RlcC5zZXEgPSBzdGVwLnNlcTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NJdGVtLnN0ZXAuc3RhdHVzID0gc3RlcC5zdGF0dXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzSXRlbS5zdGVwLm1lc3NhZ2UgPSBzdGVwLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzSXRlbS5zdGVwLmFzc2lnbmVkVG8udXNlcklkID0gc3RlcC5hc3NpZ25lZFRvLnVzZXJJZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NJdGVtLnN0ZXAuYXNzaWduZWRUby5uYW1lID0gc3RlcC5hc3NpZ25lZFRvLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzSXRlbS5zdGVwLmNvbW1lbnQgPSBzdGVwLmNvbW1lbnQgIT09IHVuZGVmaW5lZCA/IHN0ZXAuY29tbWVudCA6ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0luZGljYXRvciBkb2N1bWVudHMgd29ya2Zsb3cgcHJvY2VzcyBtb2RlbCB1cGRhdGVkLicsIF9XRkluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cblxuICAgIH0pXG59O1xuXG4vKipcbiAqIFByb2Nlc3MgYWN0aW9uc1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBhY3Rpb25zIC0gdGhlIGFjdGlvbnMgY29uZmlnIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBzdWJQcm9jZXNzIC0gdGhlIGN1cnJlbnQgc3ViLXByb2Nlc3MgZm9ybSBjb25maWcgZGF0YVxuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcbiAqXG4gKiBAZXhhbXBsZSAnJ1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cbmZ1bmN0aW9uIGFjdGlvbnMoYWN0aW9ucywgcHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN1YlByb2Nlc3MsIHN0ZXAsIF9XRkluc3RhbmNlLCBkYXRhLCB1dWlkKSB7XG4gICAgdmFyIGFyckFjdGlvbnMgPSBbXTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB1dGlsLnN5bmNMb29wKGFjdGlvbnMubGVuZ3RoLCBmdW5jdGlvbiAobG9vcCkge1xuICAgICAgICAgICAgdmFyIGNvdW50ZXIgPSBsb29wLml0ZXJhdGlvbigpO1xuICAgICAgICAgICAgYWN0aW9uKGFjdGlvbnNbY291bnRlcl0sIHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdWJQcm9jZXNzLCBzdGVwLCBfV0ZJbnN0YW5jZSwgZGF0YSwgdXVpZClcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXRBY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogYWN0aW9uc1tjb3VudGVyXS5faWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXE6IGNvdW50ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiByZXN1bHRcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICBhcnJBY3Rpb25zLnB1c2gocmV0QWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgbG9vcC5uZXh0KCk7XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBsb29wLmJyZWFrKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnQWN0aW9ucyBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIGFyckFjdGlvbnMpO1xuICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFByb2Nlc3MgYWN0aW9uXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGFjdGlvbiAtIHRoZSBhY3Rpb24gY29uZmlnIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBzdWJQcm9jZXNzIC0gdGhlIGN1cnJlbnQgc3ViLXByb2Nlc3MgZm9ybSBjb25maWcgZGF0YVxuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcbiAqXG4gKiBAZXhhbXBsZSAnJ1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cbmZ1bmN0aW9uIGFjdGlvbihhY3Rpb24sIHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdWJQcm9jZXNzLCBzdGVwLCBfV0ZJbnN0YW5jZSwgZGF0YSwgdXVpZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgaWYgKGFjdGlvbi5tZXRob2QgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YXIgbWV0aG9kUG9zc2libGVJdGVtcyA9IFtcImZvcm1cIiwgXCJpbmRpY2F0b3JcIiwgXCJwcm9maWxlXCIsIFwic3ViUHJvY2Vzc0luc3RhbmNlXCIsIFwic3RlcFwiLCBcImNvbW11bml0eVwiLCBcImFwcGxpY2F0aW9uXCIsIFwidXNlclwiLCBcInNkb1wiLCBcInBlcmZvcm1hbmNlXCIsIFwidGF4b25vbXlcIiwgXCJ2YXJpYWJsZXNcIiwgXCJub3RpZmljYXRpb25cIixcInJlcG9ydFwiLFwid29ya2VyXCJdO1xuICAgICAgICAgICAgc3dpdGNoIChwcm9wZXJ0eUV4aXN0cyhhY3Rpb24ubWV0aG9kLCBtZXRob2RQb3NzaWJsZUl0ZW1zKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2Zvcm0nOlxuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uLm1ldGhvZC5mb3JtLmNyZWF0ZSAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChwcm9jZXNzSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHN1YlByb2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHN0ZXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGFjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2gocHJvY2Vzc1NlcSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goc3ViUHJvY2Vzc1NlcSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChfV0ZJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YS5jcmVhdGVUeXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh1dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmJhc2VVVUlEKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5jcmVhdGUoYXJncykudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbi5tZXRob2QuZm9ybS5hdXRob3Jpc2UgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2gocHJvY2Vzc0lkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChzdWJQcm9jZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChwcm9jZXNzU2VxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChzdWJQcm9jZXNzU2VxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChfV0ZJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YS5jcmVhdGVUeXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh1dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmJhc2VVVUlEKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uYXV0aG9yaXNlKGFyZ3MpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24ubWV0aG9kLmZvcm0udW5kcmFmdCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goX1dGSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEuY3JlYXRlVHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2godXVpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YS5iYXNlVVVJRCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLnNldFVuRHJhZnQoYXJncykudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbi5tZXRob2QuZm9ybS5kcmFmdCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goX1dGSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEuY3JlYXRlVHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2godXVpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YS5iYXNlVVVJRCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLnNldERyYWZ0KGFyZ3MpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24ubWV0aG9kLmZvcm0uY2xvc2UgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goc3ViUHJvY2Vzcy5pbmRpY2F0b3JzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChfV0ZJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YS5jcmVhdGVUeXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh1dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmJhc2VVVUlEKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uY2xvc2UoYXJncykudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbi5tZXRob2QuZm9ybS5hdXRob3Jpc2VBbmRDcmVhdGVOZXdTZXEgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2gocHJvY2Vzc0lkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChzdWJQcm9jZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChwcm9jZXNzU2VxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChzdWJQcm9jZXNzU2VxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChfV0ZJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YS5jcmVhdGVUeXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh1dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmJhc2VVVUlEKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uYXV0aG9yaXNlKGFyZ3MpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBDcmVhdGUgbmV3IHNlcXVlbmNlXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChwcm9jZXNzSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChzdWJQcm9jZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goc3RlcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGFjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHByb2Nlc3NTZXEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChzdWJQcm9jZXNzU2VxKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChfV0ZJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEuY3JlYXRlVHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHV1aWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh1dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmNyZWF0ZShhcmdzKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0VkIGNyZWF0aW9uIG9mIG5ldyBzZXF1ZW5jZVxuXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBcblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdpbmRpY2F0b3InOlxuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uLm1ldGhvZC5pbmRpY2F0b3IuY3JlYXRlICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKFwiTm90IGltcGxlbWVudGVkXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uLm1ldGhvZC5pbmRpY2F0b3IuaW5zdGFudGlhdGUgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoXCJOb3QgaW1wbGVtZW50ZWRcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24ubWV0aG9kLmluZGljYXRvci5zZXRWYWx1ZSAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhdGggPSBhY3Rpb24ubWV0aG9kLmluZGljYXRvci5zZXRWYWx1ZS5wYXRoO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWxwZXIuZ2V0Tm9kZVZhbHVlKGFjdGlvbi5tZXRob2QuaW5kaWNhdG9yLnNldFZhbHVlLmRhdGEsIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uIChkYXRhVmFsdWUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKF9XRkluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2godXVpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhVmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS51cGRhdGVJbmRpY2F0b3IoYXJncykudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24ubWV0aG9kLmluZGljYXRvci51cGRhdGVTdGF0dXMgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3JTZXRJZCA9IGFjdGlvbi5tZXRob2QuaW5kaWNhdG9yLmluZGljYXRvclNldElkO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChfV0ZJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2godXVpZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24ubWV0aG9kLmluZGljYXRvci51cGRhdGVTdGF0dXMgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXR1cyA9IGFjdGlvbi5tZXRob2QuaW5kaWNhdG9yLnVwZGF0ZVN0YXR1cztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goc3RhdHVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goaW5kaWNhdG9yU2V0SWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEtlZXAgaW5kaWNhdG9yIGZ1bmN0aW9ucyBpbiBpbmRpYXRvciBmaWxlIGlzdGVhZCBvZiBmb3JtIGZpbGUuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5tYXJrVXBkYXRlSW5kaWNhdG9yKGFyZ3MpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoXCJBY3Rpb24gaW5kaWNhdG9yIHN1YiB0eXBlIG5vdCBmb3VuZC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24ubWV0aG9kLmluZGljYXRvci5zZXRXcmFwcGVyRWxlbWVudCAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhdGggPSBhY3Rpb24ubWV0aG9kLmluZGljYXRvci5zZXRXcmFwcGVyRWxlbWVudC5wYXRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvclNldElkID0gYWN0aW9uLm1ldGhvZC5pbmRpY2F0b3Iuc2V0V3JhcHBlckVsZW1lbnQuaW5kaWNhdG9yU2V0SWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGhlbHBlci5nZXROb2RlVmFsdWUoYWN0aW9uLm1ldGhvZC5pbmRpY2F0b3Iuc2V0V3JhcHBlckVsZW1lbnQuZGF0YSwgX1dGSW5zdGFuY2UsIHV1aWQpLnRoZW4oZnVuY3Rpb24gKGRhdGFWYWx1ZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goX1dGSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh1dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2gocGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGFWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGluZGljYXRvclNldElkKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0udXBkYXRlSW5kaWNhdG9yV3JhcHBlcihhcmdzKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncHJvZmlsZSc6XG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24ubWV0aG9kLnByb2ZpbGUuY3JlYXRlICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHByb2Nlc3NJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goX1dGSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEuY3JlYXRlVHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2godXVpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YS5iYXNlVVVJRCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmNyZWF0ZVByb2ZpbGUoYXJncykudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbi5tZXRob2QucHJvZmlsZS5zZXRTdGF0dXNUbyAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXR1cyA9IGFjdGlvbi5tZXRob2QucHJvZmlsZS5zZXRTdGF0dXNUbztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goX1dGSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh1dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goc3RhdHVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uc2V0U3RhdHVzKGFyZ3MpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdzdWJQcm9jZXNzSW5zdGFuY2UnOlxuICAgICAgICAgICAgICAgICAgICB2YXIgc3BQb3NzaWJsZUl0ZW1zID0gW1wiaW5zdGFudGlhdGVcIiwgXCJhdXRob3Jpc2VcIiwgXCJjbG9zZVwiLCBcInNldFZhcmlhYmxlXCIsIFwic2V0U3RhdHVzVG9cIiwgXCJzZXRTdGF0dXNNc2dUb1wiLCBcInNldFRpdGxlXCIsIFwic2V0VmFsaWREYXRlXCJdO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5RXhpc3RzKGFjdGlvbi5tZXRob2Quc3ViUHJvY2Vzc0luc3RhbmNlLCBzcFBvc3NpYmxlSXRlbXMpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3NldFRpdGxlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWxwZXIuZ2V0Tm9kZVZhbHVlKGFjdGlvbi5tZXRob2Quc3ViUHJvY2Vzc0luc3RhbmNlLnNldFRpdGxlLCBfV0ZJbnN0YW5jZSwgdXVpZCkudGhlbihmdW5jdGlvbiAoZGF0YVZhbHVlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uc01vZHVsZS5zdWJQcm9jZXNzSW5zdGFuY2Uuc2V0VGl0bGUoYWN0aW9uLm1ldGhvZC5zdWJQcm9jZXNzSW5zdGFuY2Uuc2V0VGl0bGUsIHV1aWQsIGRhdGFWYWx1ZSwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3VwZGF0ZSBzdWJwcm9jZXNzIGxhYmVsIGluIHdvcmtmbG93IGluc3RhbmNlIHByb2Nlc3Mgb2JqZWN0OiBUT0RPXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3NldFZhbGlkRGF0ZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVscGVyLmdldE5vZGVWYWx1ZShhY3Rpb24ubWV0aG9kLnN1YlByb2Nlc3NJbnN0YW5jZS5zZXRWYWxpZERhdGUsIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uIChkYXRhVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uc01vZHVsZS5zdWJQcm9jZXNzSW5zdGFuY2Uuc2V0VmFsaWREYXRlKGFjdGlvbi5tZXRob2Quc3ViUHJvY2Vzc0luc3RhbmNlLnNldFZhbGlkRGF0ZSwgdXVpZCwgZGF0YVZhbHVlLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3VwZGF0ZSBzdWJwcm9jZXNzIGxhYmVsIGluIHdvcmtmbG93IGluc3RhbmNlIHByb2Nlc3Mgb2JqZWN0OiBUT0RPXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdCBpbiBzdWJwcm9jZXNzIGFjdGlvbi5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdzdGVwJzpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnY29tbXVuaXR5JzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbW11bml0eVBvc3NpYmxlSXRlbXMgPSBbXCJjcmVhdGVDb21tdW5pdHlcIiwgXCJyZWxlYXNlQWRvcHRlZEFwcGxpY2F0aW9uXCIsIFwidXNlckpvaW5Db21tdW5pdHlcIl07XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocHJvcGVydHlFeGlzdHMoYWN0aW9uLm1ldGhvZC5jb21tdW5pdHksIGNvbW11bml0eVBvc3NpYmxlSXRlbXMpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NyZWF0ZUNvbW11bml0eSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUuY29tbXVuaXR5LmNyZWF0ZUNvbW11bml0eShhY3Rpb24ubWV0aG9kLmNvbW11bml0eS5jcmVhdGVDb21tdW5pdHksIHV1aWQsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncmVsZWFzZUFkb3B0ZWRBcHBsaWNhdGlvbic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUuY29tbXVuaXR5LnJlbGVhc2VBZG9wdGVkQXBwbGljYXRpb24oYWN0aW9uLm1ldGhvZC5jb21tdW5pdHkucmVsZWFzZUFkb3B0ZWRBcHBsaWNhdGlvbiwgdXVpZCwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd1c2VySm9pbkNvbW11bml0eSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUuY29tbXVuaXR5LnVzZXJKb2luQ29tbXVuaXR5KGFjdGlvbi5tZXRob2QuY29tbXVuaXR5LnVzZXJKb2luQ29tbXVuaXR5LCB1dWlkLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdhcHBsaWNhdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIHZhciBhcHBsaWNhdGlvblBvc3NpYmxlSXRlbXMgPSBbXCJjcmVhdGVBcHBEZWZpbml0aW9uXCIsIFwiYnVpbGRBcHBsaWNhdGlvblwiLCBcImFwcGxpY2F0aW9uQWRvcHRpb25cIl07XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocHJvcGVydHlFeGlzdHMoYWN0aW9uLm1ldGhvZC5hcHBsaWNhdGlvbiwgYXBwbGljYXRpb25Qb3NzaWJsZUl0ZW1zKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjcmVhdGVBcHBEZWZpbml0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5hcHBsaWNhdGlvbi5jcmVhdGVBcHBEZWZpbml0aW9uKGFjdGlvbi5tZXRob2QuYXBwbGljYXRpb24uY3JlYXRlQXBwRGVmaW5pdGlvbiwgdXVpZCwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdidWlsZEFwcGxpY2F0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5hcHBsaWNhdGlvbi5idWlsZEFwcGxpY2F0aW9uKGFjdGlvbi5tZXRob2QuYXBwbGljYXRpb24uYnVpbGRBcHBsaWNhdGlvbiwgdXVpZCwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdhcHBsaWNhdGlvbkFkb3B0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5hcHBsaWNhdGlvbi5hcHBsaWNhdGlvbkFkb3B0aW9uKGFjdGlvbi5tZXRob2QuYXBwbGljYXRpb24uYXBwbGljYXRpb25BZG9wdGlvbiwgdXVpZCwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChcIk5vIG1ldGhvZCBmb3VuZCBmcm9tIGltcGxlbWVudGVkIGxpc3QuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICd1c2VyJzpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnc2RvJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNkb1Bvc3NpYmxlSXRlbXMgPSBbXCJjcmVhdGVcIixcImVucm9sbENvdXJzZVwiXTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChwcm9wZXJ0eUV4aXN0cyhhY3Rpb24ubWV0aG9kLnNkbywgc2RvUG9zc2libGVJdGVtcykpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnY3JlYXRlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5zZG8uY3JlYXRlKGFjdGlvbi5tZXRob2Quc2RvLmNyZWF0ZSwgdXVpZCwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZW5yb2xsQ291cnNlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5zZG8uZW5yb2xsQ291cnNlKGFjdGlvbi5tZXRob2Quc2RvLmVucm9sbENvdXJzZSwgdXVpZCwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChcIk5vIG1ldGhvZCBmb3VuZCBmcm9tIGltcGxlbWVudGVkIGxpc3QuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdwZXJmb3JtYW5jZSc6XG4gICAgICAgICAgICAgICAgICAgIHZhciBwZXJmb3JtYW5jZVBvc3NpYmxlSXRlbXMgPSBbXCJjcmVhdGVcIiwgXCJjb25maWd1cmVOb2RlXCIsIFwidW5sb2NrUGVyaW9kXCIsIFwibG9ja1BlcmZvcm1hbmNlTW9kZWxcIiwgXCJzZXRNb2RlbFN0YXR1c1wiXTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChwcm9wZXJ0eUV4aXN0cyhhY3Rpb24ubWV0aG9kLnBlcmZvcm1hbmNlLCBwZXJmb3JtYW5jZVBvc3NpYmxlSXRlbXMpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NyZWF0ZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUucGVyZm9ybWFuY2UuY3JlYXRlKGFjdGlvbi5tZXRob2QucGVyZm9ybWFuY2UuY3JlYXRlLCB1dWlkLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjb25maWd1cmVOb2RlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5wZXJmb3JtYW5jZS5jb25maWd1cmVOb2RlKGFjdGlvbi5tZXRob2QucGVyZm9ybWFuY2UuY29uZmlndXJlTm9kZSwgdXVpZCwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAndW5sb2NrUGVyaW9kJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5wZXJmb3JtYW5jZS51bmxvY2tQZXJpb2QoYWN0aW9uLm1ldGhvZC5wZXJmb3JtYW5jZS51bmxvY2tQZXJpb2QsIHV1aWQsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3NldE1vZGVsU3RhdHVzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5wZXJmb3JtYW5jZS5zZXRNb2RlbFN0YXR1cyhhY3Rpb24ubWV0aG9kLnBlcmZvcm1hbmNlLnNldE1vZGVsU3RhdHVzLCB1dWlkLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdsb2NrUGVyZm9ybWFuY2VNb2RlbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUucGVyZm9ybWFuY2UubG9ja1BlcmZvcm1hbmNlTW9kZWwoYWN0aW9uLm1ldGhvZC5wZXJmb3JtYW5jZS5sb2NrUGVyZm9ybWFuY2VNb2RlbCwgdXVpZCwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3RheG9ub215JzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRheG9ub215UG9zc2libGVJdGVtcyA9IFtcImNyZWF0ZVwiXTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChwcm9wZXJ0eUV4aXN0cyhhY3Rpb24ubWV0aG9kLnRheG9ub215LCB0YXhvbm9teVBvc3NpYmxlSXRlbXMpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NyZWF0ZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUudGF4b25vbXkuY3JlYXRlKGFjdGlvbi5tZXRob2QudGF4b25vbXkuY3JlYXRlLCB1dWlkLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd2YXJpYWJsZXMnOlxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFyaWFibGVzUG9zc2libGVJdGVtcyA9IFtcInNldFZhcmlhYmxlXCJdO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5RXhpc3RzKGFjdGlvbi5tZXRob2QudmFyaWFibGVzLCB2YXJpYWJsZXNQb3NzaWJsZUl0ZW1zKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzZXRWYXJpYWJsZSc6XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS52YXJpYWJsZXMuc2V0VmFyaWFibGUoYWN0aW9uLm1ldGhvZC52YXJpYWJsZXMuc2V0VmFyaWFibGUsIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJObyBtZXRob2QgZm91bmQgZnJvbSBpbXBsZW1lbnRlZCBsaXN0LlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ25vdGlmaWNhdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5ub3RpZmljYXRpb24uc2VuZE5vdGlmaWNhdGlvbldvcmtlcihhY3Rpb24ubWV0aG9kLm5vdGlmaWNhdGlvbiwgX1dGSW5zdGFuY2UsIHV1aWQpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY2FzZSAncmVwb3J0JzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlcG9ydFBvc3NpYmxlSXRlbXMgPSBbXCJjcmVhdGVQZXJmb3JtYW5jZVJlcG9ydFwiLFwiY3JlYXRlUmVwb3J0XCJdO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5RXhpc3RzKGFjdGlvbi5tZXRob2QucmVwb3J0LCByZXBvcnRQb3NzaWJsZUl0ZW1zKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjcmVhdGVQZXJmb3JtYW5jZVJlcG9ydCc6XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5yZXBvcnQuY3JlYXRlUGVyZm9ybWFuY2VSZXBvcnQoYWN0aW9uLm1ldGhvZC5yZXBvcnQuY3JlYXRlUGVyZm9ybWFuY2VSZXBvcnQsIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnY3JlYXRlUmVwb3J0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5yZXBvcnQuY3JlYXRlUmVwb3J0KGFjdGlvbi5tZXRob2QucmVwb3J0LmNyZWF0ZVJlcG9ydCwgX1dGSW5zdGFuY2UsIHV1aWQgKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChcIk5vIG1ldGhvZCBmb3VuZCBmcm9tIGltcGxlbWVudGVkIGxpc3QuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgY2FzZSAnd29ya2VyJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIHdvcmtlclBvc3NpYmxlSXRlbXMgPSBbXCJzZW5kV29ya2VyXCIsIFwiZXhlY3V0ZUxvY2FsXCJdO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5RXhpc3RzKGFjdGlvbi5tZXRob2Qud29ya2VyLCB3b3JrZXJQb3NzaWJsZUl0ZW1zKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzZW5kV29ya2VyJzpcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25zTW9kdWxlLndvcmtlci5zZW5kV29ya2VyKGFjdGlvbi5tZXRob2Qud29ya2VyLnNlbmRXb3JrZXIsIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZXhlY3V0ZUxvY2FsJzpcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25zTW9kdWxlLndvcmtlci5leGVjdXRlTG9jYWwoYWN0aW9uLm1ldGhvZC53b3JrZXIuZXhlY3V0ZUxvY2FsLCBfV0ZJbnN0YW5jZSwgdXVpZCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwibWV0aG9kIG5vdCBkZWZpbmVkIGluIGNvbmZpZ3VyYXRpb25cIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWplY3QoXCJObyBtZXRob2QgZm91bmQgZnJvbSBpbXBsZW1lbnRlZCBsaXN0LlwiKTtcblxuICAgICAgICB9XG5cbiAgICB9KTtcbn07XG5cbi8qKlxuICogUHJvY2VzcyB0YXNrc1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSB0YXNrIC0gdGhlIHRhc2sgY29uZmlnIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dERhdGEgLSB0aGUgdXNlciBpbnB1dCBkYXRhXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiB0YXNrKHN1YnByb2Nlc3NJRCwgc3VicHJvY2Vzc1NFUSwgdGFzaywgc3B1dWlkLCBtb2RlbCkge1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICB2YXIgX1dGSW5zdGFuY2UgPSBhcHAuU0NPUEUud29ya2Zsb3c7XG4gICAgICAgIHZhciBwcmVBY3Rpb25zQ29uZiA9IHRhc2sucHJlQWN0aW9ucztcbiAgICAgICAgcHJlQWN0aW9ucyhwcmVBY3Rpb25zQ29uZiwgX1dGSW5zdGFuY2UsIHNwdXVpZCkudGhlbihmdW5jdGlvbiAocHJlQWN0aW9uUmVzdWx0KSB7XG5cbiAgICAgICAgICAgIHZhciBsaXN0ID0gW107XG4gICAgICAgICAgICBpZiAodGFzay5hc3NpZ24ucm9sZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgYXNzaWduVHlwZSA9ICdwcm9maWxlUm9sZSc7XG4gICAgICAgICAgICAgICAgdmFyIHByb2ZpbGVJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XG4gICAgICAgICAgICAgICAgdmFyIGlkID0gJyc7XG4gICAgICAgICAgICAgICAgaWYgKHRhc2suYXNzaWduLnJvbGUucHJvZmlsZSA9PSAnY3VycmVudCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGFzay5hc3NpZ24ucm9sZS5wcm9maWxlID09ICdjb21tdW5pdHknKSB7XG4gICAgICAgICAgICAgICAgICAgIGlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHJvbGUgPSB0YXNrLmFzc2lnbi5yb2xlLnJvbGVJZDtcblxuICAgICAgICAgICAgICAgIGxpYnJhcnkuZ2V0VXNlcnNMaXN0QnlSb2xlKGlkLCByb2xlKS50aGVuKGZ1bmN0aW9uIChsaXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsaXN0ICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGlzdC5sZW5ndGggPiAxKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBOZXcgcmVxdWlyZW1lbnQgaGVyZSB3aWxsIGF1dG9tYXRpY2FsbHkgYXNzaWduIHRoZSBzdGVwIHRvIGN1cnJlbnQgdXNlciBpZiB0aGlzIHVzZXIgZmFsbHMgdW5kZXIgdGhlIHByb3ZpZGVkIGdyb3VwLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJVTEUgSU5UUk9EVUNFRCBPTiAxNi1NQVJDSC0yMDE3XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgY3VycmVudCB1c2VyIGxpZXMgd2l0aGluIHRoZSBzcGVjaWZpZWQgcm9sZSwgaXQgd2lsbCBiZSBhdXRvbWF0aWNhbGx5IGFzc2lnbmVkIHRvIHRoYXQgdXNlci5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXNDdXJyZW50VXNlckV4aXN0SW5HaXZlblJvbGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm9sZXNPYmplY3QgPSBsaWJyYXJ5LmdldEN1cnJlbnRVc2VyUm9sZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXNDdXJyZW50VXNlclJvbGUxID0gcm9sZXNPYmplY3QucHJvZmlsZS5pbmRleE9mKHJvbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpc0N1cnJlbnRVc2VyUm9sZTIgPSByb2xlc09iamVjdC5jb21tdW5pdHkuaW5kZXhPZihyb2xlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXNDdXJyZW50VXNlclJvbGUzID0gcm9sZXNPYmplY3QuaW1wbGljaXQuaW5kZXhPZihyb2xlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXNDdXJyZW50VXNlclJvbGU0ID0gcm9sZXNPYmplY3QuYWRvcHRpb24uaW5kZXhPZihyb2xlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXNDdXJyZW50VXNlclJvbGU1ID0gcm9sZXNPYmplY3Quc3VicHJvZmlsZS5pbmRleE9mKHJvbGUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXNDdXJyZW50VXNlclJvbGUxID4gLTEgfHwgaXNDdXJyZW50VXNlclJvbGUyID4gLTEgfHwgaXNDdXJyZW50VXNlclJvbGUzID4gLTEgfHwgaXNDdXJyZW50VXNlclJvbGU0ID4gLTEgfHwgaXNDdXJyZW50VXNlclJvbGU1ID4gLTEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0N1cnJlbnRVc2VyRXhpc3RJbkdpdmVuUm9sZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDdXJyZW50VXNlckV4aXN0SW5HaXZlblJvbGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNDdXJyZW50VXNlckV4aXN0SW5HaXZlblJvbGUpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhc3NpZ25lZSA9IG1vZGVsLmFzc2lnbmVkVG87XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVlLm5hbWUgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJuYW1lICsgXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduZWUudXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQgKyBcIlwiO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFzc2lnbm1lbnQgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFzay5hc3NpZ24uYXNzaWdubWVudCAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXNzaWdubWVudCA9IG1vZGVsLmFzc2lnbm1lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhY2NlcHQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNob3dcIjogdGFzay5hc3NpZ24uYXNzaWdubWVudC5hY2NlcHQuc2hvdyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogX2dldE5hbWVCeUxhbmcodGFzay5hc3NpZ24uYXNzaWdubWVudC5hY2NlcHQubGFiZWwuaTE4bilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50LmFjY2VwdCA9IGFjY2VwdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5tZXNzYWdlID0gX2dldE5hbWVCeUxhbmcodGFzay5hc3NpZ24uYXNzaWdubWVudC5tZXNzYWdlLmkxOG4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVqZWN0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaG93XCI6IHRhc2suYXNzaWduLmFzc2lnbm1lbnQucmVqZWN0LnNob3csXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IF9nZXROYW1lQnlMYW5nKHRhc2suYXNzaWduLmFzc2lnbm1lbnQucmVqZWN0LmxhYmVsLmkxOG4pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5yZWplY3QgPSByZWplY3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZmlsZUlkXCI6IHByb2ZpbGVJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicm9sZUlkXCI6IHJvbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJyb2xlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50LnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQucHJvZmlsZVJvbGVJZCA9IGlkO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0N1cnJlbnRVc2VyRXhpc3RJbkdpdmVuUm9sZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0ZpcmUgUHJlLXdvcmtBY3Rpb25zIGhlcmVcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvY2Vzc0lkID0gSlNPTi54cGF0aChcIi9pbnN0YW5jZS9wcm9jZXNzZXNbc3ViUHJvY2Vzc2VzL3V1aWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXS9pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3ViUHJvY2Vzc0lkID0gSlNPTi54cGF0aChcIi9pbnN0YW5jZS9wcm9jZXNzZXMvc3ViUHJvY2Vzc2VzW3V1aWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXS9pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RlcElkID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHNwdXVpZCArIFwiJ10vc3RlcC9pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RlcE9iamVjdCA9IEpTT04ueHBhdGgoXCIvcHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBwcm9jZXNzSWQgKyBcIiddL3N1YlByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3ViUHJvY2Vzc0lkICsgXCInXS9zdGVwc1tfaWQgZXEgJ1wiICsgc3RlcElkICsgXCInXVwiLCBfV0ZJbnN0YW5jZS5jb25maWcsIHt9KVswXTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YXNrLnByZVdvcmtBY3Rpb25zICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJlV29ya0FjdGlvbnNPYmogPSB0YXNrLnByZVdvcmtBY3Rpb25zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlV29ya0FjdGlvbnMocHJlV29ya0FjdGlvbnNPYmosIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uIChzdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgnQXNzaWdubWVudCBpcyBtYWRlLiBQcmUgd29yayBhY3Rpb25zIGZvdW5kIGFuZCBleGVjdXRlZCAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCdBc3NpZ25tZW50IGlzIG1hZGUuIE5vIHByZSB3b3JrIGFjdGlvbnMgZm91bmQuICcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoJ05vdGlmaWNhdGlvbnMgcmVxdWVzdCBzdWJtaXR0ZWQgZm9yIGFjY2VwdGFuY2UuJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobGlzdC5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEltcGxlbWVudCBoZXJlIHByZVdvcmtBY3Rpb24gYXMgdGhpcyBpcyBhdXRvbWF0aWNhbGx5IGFzc2lnbmVkIGluIGNhc2Ugb2YgMSB1c2VyIGFuZCB3aWxsIG5vdCBnbyB0cm91Z2ggYWNjZXB0YW5jZSBmdW5jdGlvbi5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1c2VySWQgPSBsaXN0WzBdLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1c2VybmFtZSA9IGxpc3RbMF0ubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXNzaWduZWUgPSBtb2RlbC5hc3NpZ25lZFRvO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVlLm5hbWUgPSB1c2VybmFtZSArIFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduZWUudXNlcklkID0gdXNlcklkICsgXCJcIjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhc3NpZ25tZW50ID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhc2suYXNzaWduLmFzc2lnbm1lbnQgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFzc2lnbm1lbnQgPSBtb2RlbC5hc3NpZ25tZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWNjZXB0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaG93XCI6IHRhc2suYXNzaWduLmFzc2lnbm1lbnQuYWNjZXB0LnNob3csXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IF9nZXROYW1lQnlMYW5nKHRhc2suYXNzaWduLmFzc2lnbm1lbnQuYWNjZXB0LmxhYmVsLmkxOG4pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5hY2NlcHQgPSBhY2NlcHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQubWVzc2FnZSA9IF9nZXROYW1lQnlMYW5nKHRhc2suYXNzaWduLmFzc2lnbm1lbnQubWVzc2FnZS5pMThuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlamVjdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2hvd1wiOiB0YXNrLmFzc2lnbi5hc3NpZ25tZW50LnJlamVjdC5zaG93LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBfZ2V0TmFtZUJ5TGFuZyh0YXNrLmFzc2lnbi5hc3NpZ25tZW50LnJlamVjdC5sYWJlbC5pMThuKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQucmVqZWN0ID0gcmVqZWN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb2ZpbGVJZFwiOiBwcm9maWxlSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJvbGVJZFwiOiByb2xlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwicm9sZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50LnByb2ZpbGVSb2xlSWQgPSBpZDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9GaXJlIFByZS13b3JrQWN0aW9ucyBoZXJlXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb2Nlc3NJZCA9IEpTT04ueHBhdGgoXCIvaW5zdGFuY2UvcHJvY2Vzc2VzW3N1YlByb2Nlc3Nlcy91dWlkIGVxICdcIiArIHNwdXVpZCArIFwiJ10vaWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1YlByb2Nlc3NJZCA9IEpTT04ueHBhdGgoXCIvaW5zdGFuY2UvcHJvY2Vzc2VzL3N1YlByb2Nlc3Nlc1t1dWlkIGVxICdcIiArIHNwdXVpZCArIFwiJ10vaWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0ZXBJZCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL3N0ZXAvaWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0ZXBPYmplY3QgPSBKU09OLnhwYXRoKFwiL3Byb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgcHJvY2Vzc0lkICsgXCInXS9zdWJQcm9jZXNzZXNbX2lkIGVxICdcIiArIHN1YlByb2Nlc3NJZCArIFwiJ10vc3RlcHNbX2lkIGVxICdcIiArIHN0ZXBJZCArIFwiJ11cIiwgX1dGSW5zdGFuY2UuY29uZmlnLCB7fSlbMF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhc2sucHJlV29ya0FjdGlvbnMgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcmVXb3JrQWN0aW9uc09iaiA9IHRhc2sucHJlV29ya0FjdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVXb3JrQWN0aW9ucyhwcmVXb3JrQWN0aW9uc09iaiwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24gKHN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgnQXNzaWduZWQgdG8gdGhlIG9ubHkgdXNlciBpbiByb2xlLiBQcmUgd29yayBhY3Rpb25zIGV4ZWN1dGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgnQXNzaWduZWQgdG8gdGhlIG9ubHkgdXNlciBpbiByb2xlLiBObyBwcmUgd29yayBhY3Rpb25zIGZvdW5kLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXNzaWduZWUgPSBtb2RlbC5hc3NpZ25lZFRvO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVlLm5hbWUgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVlLnVzZXJJZCA9IFwiXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXNzaWdubWVudCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YXNrLmFzc2lnbi5hc3NpZ25tZW50ICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhc3NpZ25tZW50ID0gbW9kZWwuYXNzaWdubWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjY2VwdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2hvd1wiOiB0YXNrLmFzc2lnbi5hc3NpZ25tZW50LmFjY2VwdC5zaG93LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBfZ2V0TmFtZUJ5TGFuZyh0YXNrLmFzc2lnbi5hc3NpZ25tZW50LmFjY2VwdC5sYWJlbC5pMThuKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQuYWNjZXB0ID0gYWNjZXB0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50Lm1lc3NhZ2UgPSBfZ2V0TmFtZUJ5TGFuZyh0YXNrLmFzc2lnbi5hc3NpZ25tZW50Lm1lc3NhZ2UuaTE4bik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWplY3QgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNob3dcIjogdGFzay5hc3NpZ24uYXNzaWdubWVudC5yZWplY3Quc2hvdyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogX2dldE5hbWVCeUxhbmcodGFzay5hc3NpZ24uYXNzaWdubWVudC5yZWplY3QubGFiZWwuaTE4bilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50LnJlamVjdCA9IHJlamVjdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxlSWRcIjogcHJvZmlsZUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyb2xlSWRcIjogcm9sZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInJvbGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5wcm9maWxlUm9sZUlkID0gaWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9XaWxsIGJlIGZpcmVkIGZyb20gVGFrZUFzc2lnbm1lbnQgcGF0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoXCJObyB1c2VycyBmb3VuZCBpbiBsaXN0LiBBc3NpZ25pbmcgYmxhbmsgXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBpbiBnZXRVc2Vyc0xpc3RCeVJvbGUgdW5kZWZpbmVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgaW4gZ2V0VXNlcnNMaXN0QnlSb2xlJyk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0YXNrLmFzc2lnbi5zd2ltbGFuZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCdzd2ltbGFuZScpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTd2ltbGFuZSBpbXBsZW1lbnRhdGlvbiAhIScpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuXG4gICAgICAgICAgICByZWplY3QoZXJyKTtcblxuICAgICAgICB9KTtcblxuXG5cblxuICAgIH0pO1xuXG59O1xuXG4vKipcbiAqIFByb2Nlc3MgdHJhbnNpdGlvblxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBwcm9jZXNzIGlkXG4gKiBAcGFyYW0ge251bWJlcn0gcHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBwcm9jZXNzIHNlcVxuICogQHBhcmFtIHtzdHJpbmd9IHN1YlByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN1Yi1wcm9jZXNzIGlkXG4gKiBAcGFyYW0ge251bWJlcn0gc3ViUHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBzdWItcHJvY2VzcyBzZXFcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdGVwSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdGVwIGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gdHJhbnNpdGlvbklkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gdHJhbnNpdGlvbiBpZFxuICogQHBhcmFtIHtvYmplY3R9IGRhdGEgLSBhbnkgYWRkaXRpb25hbCBkYXRhIHBhc3NlZCBpbiBhcyBrZXkgdmFsdWUgcGFpcnNcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiB0cmFuc2l0aW9uKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdGVwSWQsIHRyYW5zaXRpb25JZCwgZGF0YSwgX1dGSW5zdGFuY2UsIHNwdXVpZCwgbW9kZWwpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIHN0ZXBTZXEgPSAwO1xuICAgICAgICAgICAgdmFyIG5leHRTdGVwSWQgPSAnJztcbiAgICAgICAgICAgIHZhciBuZXh0U3RlcFNlcSA9IDA7XG4gICAgICAgICAgICB2YXIgc3ViUHJvY2VzcyA9IFtdO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRQcm9jZXNzID0gX1dGSW5zdGFuY2UuY29uZmlnLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKG9ialByb2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBpZiAob2JqUHJvY2Vzcy5faWQgPT0gcHJvY2Vzc0lkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmpQcm9jZXNzO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgY3VycmVudFN1YlByb2Nlc3MgPSBjdXJyZW50UHJvY2Vzc1swXS5zdWJQcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChvYmpTdWJQcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9ialN1YlByb2Nlc3MuX2lkID09IHN1YlByb2Nlc3NJZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqU3ViUHJvY2VzcztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRTdGVwID0gY3VycmVudFN1YlByb2Nlc3NbMF0uc3RlcHMuZmlsdGVyKGZ1bmN0aW9uIChvYmpTdGVwKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9ialN0ZXAuX2lkID09IHN0ZXBJZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqU3RlcDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIHRyYW5zaXRpb24gPSBjdXJyZW50U3RlcFswXS50cmFuc2l0aW9uLmZpbHRlcihmdW5jdGlvbiAob2JqVHJhbnNpdGlvbikge1xuICAgICAgICAgICAgICAgIGlmIChvYmpUcmFuc2l0aW9uLl9pZCA9PSB0cmFuc2l0aW9uSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9ialRyYW5zaXRpb247XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY3VycmVudFN1YlByb2Nlc3NbMF0uc3RlcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFN1YlByb2Nlc3NbMF0uc3RlcHNbaV0uX2lkID09IHN0ZXBJZCkge1xuICAgICAgICAgICAgICAgICAgICBzdGVwU2VxID0gcGFyc2VJbnQoY3VycmVudFN1YlByb2Nlc3NbMF0uc3RlcHNbaV0uX3NlcSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN1cnJlbnRTdWJQcm9jZXNzWzBdLnN0ZXBzLmZpbHRlcihmdW5jdGlvbiAoc3RlcEl0ZW0pIHtcbiAgICAgICAgICAgICAgICBuZXh0U3RlcFNlcSA9IHN0ZXBTZXEgKyAxO1xuICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChzdGVwSXRlbS5fc2VxKSA9PSBuZXh0U3RlcFNlcSkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0U3RlcElkID0gc3RlcEl0ZW0uX2lkO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF9XRkluc3RhbmNlLmluc3RhbmNlLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKG9ialByb2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBpZiAob2JqUHJvY2Vzcy5pZCA9PSBwcm9jZXNzSWQgJiYgb2JqUHJvY2Vzcy5zZXEgPT0gcHJvY2Vzc1NlcSkge1xuICAgICAgICAgICAgICAgICAgICBvYmpQcm9jZXNzLnN1YlByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKG9ialN1YlByb2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmpTdWJQcm9jZXNzLmlkID09IHN1YlByb2Nlc3NJZCAmJiBvYmpTdWJQcm9jZXNzLnNlcSA9PSBzdWJQcm9jZXNzU2VxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHV1aWQgPSBvYmpTdWJQcm9jZXNzLnV1aWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3B1dWlkID0gdXVpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChzdWJQcm9jZXNzSXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3ViUHJvY2Vzc0l0ZW0uX2lkID09IHV1aWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3MgPSBzdWJQcm9jZXNzSXRlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgbWF4U3RlcHMgPSBjdXJyZW50U3ViUHJvY2Vzc1swXS5zdGVwcy5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgc3BpbnN0YW5jZU9iamVjdCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIrIHNwdXVpZCArXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgdmFyIHNwSW5zdGFuY2VTdGVwT2JqZWN0ID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIisgc3B1dWlkICtcIiddL3N0ZXBcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcblxuICAgICAgICAgICAgLy8gQWRkaW5nIHN0ZXAgT2JqZWN0IGluIHN1YnByb2Nlc3MgaGlzdG9yeSBGcm9tIHNlY29uZCBzdGVwLiBBcyBmaXJzdCBzdGVwIGlzIGFkZGVkIGF0IHN1YlByb2Nlc3MoKSBmdW5jdGlvbiBcbiAgICAgICAgICAgIGlmIChzcGluc3RhbmNlT2JqZWN0Lmhpc3RvcnkgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgc3BpbnN0YW5jZU9iamVjdC5oaXN0b3J5ID0gW107XG4gICAgICAgICAgICB9XG5cblxuXG5cbiAgICAgICAgICAgIHZhciBwdXNoSW5kaWNhdG9yVG9Nb2RlbCA9IGZ1bmN0aW9uKG1vZGVsKXtcblxuICAgICAgICAgICAgICAgIC8vIEluIGJvdGggIHRoZSBjYXNlcyB0aGUgbGlzdCBpcyBkaWZmZXJuZXQgdGhhdCBuZWVkcyB0byBiZSBtYWRlIHNhbWUuXG5cbiAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yTGlzdCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIrIHNwdXVpZCArXCInXS9pbmRpY2F0b3JzXCIsIF9XRkluc3RhbmNlICx7fSk7XG4gICAgICAgICAgICAgICAgdmFyIGlzRmlyc3QgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZihpbmRpY2F0b3JMaXN0ID09IHVuZGVmaW5lZCB8fCBpbmRpY2F0b3JMaXN0Lmxlbmd0aCA9PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgaXNGaXJzdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGluZGljYXRvckxpc3QgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbd29ya2Zsb3dzL3Byb2Nlc3Nlc1tzdWJQcm9jZXNzVVVJRCBlcSAnXCIrIHNwdXVpZCArXCInXV1cIiwgX1dGSW5zdGFuY2UgLHt9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYobW9kZWwuaW5kaWNhdG9ycyA9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgICAgIG1vZGVsLmluZGljYXRvcnMgPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBpbmRpY2F0b3JMaXN0Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZihpc0ZpcnN0KXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHV1aWQgPSBpbmRpY2F0b3JMaXN0W2pdLl9pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXYgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbX2lkIGVxICdcIisgdXVpZCArXCInXS9fcmV2XCIgLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlcSA9IGluZGljYXRvckxpc3Rbal0ubW9kZWwucGVuZGluZy5zZXE7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RhdHVzID0gaW5kaWNhdG9yTGlzdFtqXS5tb2RlbC5wZW5kaW5nLnN0YXR1cztcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRPYmplY3QgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXVpZDogdXVpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXY6IHJldixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXE6IHNlcSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuaW5kaWNhdG9ycy5wdXNoKGluZE9iamVjdCk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1dWlkID0gaW5kaWNhdG9yTGlzdFtqXS5pbnN0YW5jZXNbMF0udXVpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXYgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbX2lkIGVxICdcIisgdXVpZCArXCInXS9fcmV2XCIgLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlcSA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tfaWQgZXEgJ1wiKyB1dWlkICtcIiddL21vZGVsL3BlbmRpbmcvc2VxXCIsX1dGSW5zdGFuY2Use30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXR1cyA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tfaWQgZXEgJ1wiKyB1dWlkICtcIiddL21vZGVsL3BlbmRpbmcvc3RhdHVzXCIsX1dGSW5zdGFuY2Use30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZE9iamVjdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dWlkOiB1dWlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldjogcmV2LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcTogc2VxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5pbmRpY2F0b3JzLnB1c2goaW5kT2JqZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9ICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBtb2RlbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgXG5cbiAgICAgICAgICAgIGlmKG1vZGVsICE9IHVuZGVmaW5lZCAmJiBPYmplY3Qua2V5cyhtb2RlbCkubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgdmFyIGluZE1vZGVsSW5TdGVwID0gaW5kTW9kZWxJblN0ZXAgPSBwdXNoSW5kaWNhdG9yVG9Nb2RlbChtb2RlbCk7XG4gICAgICAgICAgICAgICAgc3BpbnN0YW5jZU9iamVjdC5oaXN0b3J5LnB1c2goaW5kTW9kZWxJblN0ZXApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5kTW9kZWxJblN0ZXAgPSBpbmRNb2RlbEluU3RlcCA9IHB1c2hJbmRpY2F0b3JUb01vZGVsKHNwSW5zdGFuY2VTdGVwT2JqZWN0KTtcbiAgICAgICAgICAgICAgICBzcGluc3RhbmNlT2JqZWN0Lmhpc3RvcnkucHVzaChpbmRNb2RlbEluU3RlcCk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8vc3BpbnN0YW5jZU9iamVjdC5oaXN0b3J5LnB1c2gobW9kZWwpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHRyYW5zaXRpb25bMF0udHJhbnNpdGlvbkFjdGlvbi5nb1RvU3RlcCAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICB2YXIgbmV4dFNlcSA9IHBhcnNlSW50KGN1cnJlbnRTdGVwWzBdLl9zZXEpICsgcGFyc2VJbnQodHJhbnNpdGlvblswXS50cmFuc2l0aW9uQWN0aW9uLmdvVG9TdGVwLmRlZmF1bHQpO1xuICAgICAgICAgICAgICAgIHZhciBuZXh0SWQgPSAnJztcbiAgICAgICAgICAgICAgICBjdXJyZW50U3ViUHJvY2Vzc1swXS5zdGVwcy5maWx0ZXIoZnVuY3Rpb24gKHN0ZXBJdGVtKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KHN0ZXBJdGVtLl9zZXEpID09IG5leHRTdGVwU2VxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0SWQgPSBzdGVwSXRlbS5faWQ7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgc3RlcChwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgbmV4dElkLCBuZXh0U2VxLCBkYXRhLCBfV0ZJbnN0YW5jZSwgc3B1dWlkKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRTZXEgPT0gbWF4U3RlcHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdBbGwgU3RlcCB0cmFuc2l0aW9ucyBoYXZlIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NDb21wbGV0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwOiByZXN1bHQuZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnU3RlcCB0cmFuc2l0aW9uIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NDb21wbGV0ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcDogcmVzdWx0LmRhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRyYW5zaXRpb25bMF0udHJhbnNpdGlvbkFjdGlvbi5nb1RvU3RlcElkICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICB2YXIgZ29Ub1N0ZXBJZCA9IHRyYW5zaXRpb25bMF0udHJhbnNpdGlvbkFjdGlvbi5nb1RvU3RlcElkLnN0ZXBJZDtcbiAgICAgICAgICAgICAgICB2YXIgZ29Ub1N0ZXBTZXEgPSAxO1xuXG4gICAgICAgICAgICAgICAgY3VycmVudFN1YlByb2Nlc3NbMF0uc3RlcHMuZmlsdGVyKGZ1bmN0aW9uIChzdGVwSXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RlcEl0ZW0uX2lkID09IGdvVG9TdGVwSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdvVG9TdGVwU2VxID0gcGFyc2VJbnQoc3RlcEl0ZW0uX3NlcSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgc3RlcChwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgZ29Ub1N0ZXBJZCwgZ29Ub1N0ZXBTZXEsIGRhdGEsIF9XRkluc3RhbmNlLCBzcHV1aWQpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZ29Ub1N0ZXBTZXEgPT0gbWF4U3RlcHMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0FsbCBTdGVwIHRyYW5zaXRpb25zIGhhdmUgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc0NvbXBsZXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXA6IHJlc3VsdC5kYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1N0ZXAgdHJhbnNpdGlvbiBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzQ29tcGxldGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXA6IHJlc3VsdC5kYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHJhbnNpdGlvblswXS50cmFuc2l0aW9uQWN0aW9uLnN0b3AgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBBcyB0aGlzIGlzIHRoZSBsYXN0IHN0ZXAgKHdoZXJlIHN0b3AgaXMgZGVmaWVkKSAsIHN1YlByb2Nlc3MgcG9zdEFjdGlvbnMgc2hvdWxkIGNvbWUgaGVyZS5cblxuICAgICAgICAgICAgICAgIHZhciBwb3N0QWN0aW9uc0NvbmYgPSBjdXJyZW50UHJvY2Vzc1swXS5wb3N0QWN0aW9ucztcbiAgICAgICAgICAgICAgICBwb3N0QWN0aW9ucyhwb3N0QWN0aW9uc0NvbmYsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnU3RlcCB0cmFuc2l0aW9uIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuV29ya2Zsb3cgc3RvcHBlZC4nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzQ29tcGxldGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwOiBtb2RlbFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG5cbiAgICB9KTtcbn07XG5cbi8qKlxuICogUHJvY2VzcyBwb3N0QWN0aW9uc1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBwb3N0QWN0aW9ucyAtIHRoZSBwb3N0QWN0aW9ucyBjb25maWcgZGF0YVxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuZnVuY3Rpb24gcG9zdEFjdGlvbnMocG9zdEFjdGlvbnMsIF9XRkluc3RhbmNlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIGNvbXBsZXRlZCA9IFtdO1xuICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICB2YXIgc3ViUHJvY2Vzc0NvbmZpZ09iamVjdCA9IEpTT04ueHBhdGgoXCIvY29uZmlnL3Byb2Nlc3Nlc1tfaWQgZXEgJ1wiK2FwcC5wcm9jZXNzSUQrXCInXS9zdWJQcm9jZXNzZXNbX2lkIGVxICdcIisgYXBwLnByb2Nlc3NJZCtcIiddXCIsIF9XRkluc3RhbmNlICwge30pWzBdO1xuICAgICAgICAgICAgdmFyIHN0ZXBPYmplY3QgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiKyBhcHAuU0NPUEUucHJvY2Vzc1VVSUQgK1wiJ10vc3RlcFwiLF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHV0aWwuc3luY0xvb3AocG9zdEFjdGlvbnMubGVuZ3RoLCBmdW5jdGlvbiAobG9vcCkge1xuICAgICAgICAgICAgICAgIHZhciBjb3VudGVyID0gbG9vcC5pdGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICBhY3Rpb24ocG9zdEFjdGlvbnNbY291bnRlcl0sIGFwcC5wcm9jZXNzSUQsIGFwcC5wcm9jZXNzU0VRLCBhcHAucHJvY2Vzc0lkLCBhcHAucHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0NvbmZpZ09iamVjdCwgc3RlcE9iamVjdCxfV0ZJbnN0YW5jZSwge30sIGFwcC5TQ09QRS5wcm9jZXNzVVVJRCkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBhbGwgcHJlLXJlcXVpc2l0ZXMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS5cbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVkLnB1c2godHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGxvb3AubmV4dCgpO1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVkLnB1c2goZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBsb29wLmJyZWFrKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZWQuZXZlcnkoQm9vbGVhbikpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1Bvc3QtYWN0aW9ucyBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHt9KTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRlByZUFjdGlvbnNFcnJvcicsICdOb3QgYWxsIHBvc3QtYWN0aW9ucyBwYXNzZWQuJyk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG59O1xuXG4vKlxuZnVuY3Rpb24gc2VuZE5vdGlmaWNhdGlvbnModXNlcnNMaXN0LCBzcHV1aWQpe1xuXG4gIC8vIGdldCB1c2VycyBsaXN0IFxuICAvLyBzZW4gbm90aWZpY2F0aW9ucyB0byB1c2VycyB5IGFkZGluZyBjaGFubmVscyB0byB0aGVtXG5cbiAgdmFyIGNoYW5uZWxBcnJheSA9IFtdO1xuXG4gIGZvcihpPTA7aTx1c2Vyc0xpc3QubGVuZ3RoOyBpKyspe1xuICAgIGNoYW5uZWxBcnJheS5wdXNoKFwidXNlcl9cIit1c2Vyc0xpc3RbaV0uaWQpO1xuICB9XG5cbiAgYXNzaWduVG9Vc2Vycyhwcm9jZXNzV29ya2Zsb3dNZXNzYWdlKE5PVElGSUNBVElPTl9VU0VSX01TR19BQ0NFUFQsIHNwdXVpZCksIGNoYW5uZWxBcnJheSk7XG5cbn07Ki9cblxuLypmdW5jdGlvbiBhc3NpZ25Ub1VzZXJzKG1lc3NhZ2UsIGNoYW5uZWxBcnJheSl7XG5cbiAgICAgdmFyIGNoYW5uZWxzID0gY2hhbm5lbEFycmF5O1xuXG4gICAgIHZhciBub3RpZmljYXRpb24gPSAgeyBcbiAgICAgICAgICBcIl9pZFwiOiBnZW5lcmF0ZVVVSUQoKSxcbiAgICAgICAgICBcImNoYW5uZWxzXCI6Y2hhbm5lbHMsXG4gICAgICAgICAgXCJtZXNzYWdlXCI6IG1lc3NhZ2UsXG4gICAgICAgICAgXCJtZXNzYWdlVHlwZVwiOiBcImluZm9cIixcbiAgICAgICAgICBcImNyZWF0ZWREYXRlVGltZVwiOiBtb21lbnQoKS5mb3JtYXQoKSxcbiAgICAgICAgICBcInJlYWRcIjogZmFsc2UsXG4gICAgICAgICAgXCJyZWFkRGF0ZVRpbWVcIjogXCJcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJub3RpZmljYXRpb25cIixcbiAgICAgICAgICBcInNlbmRlclVzZXJJZFwiOiBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZFxuICAgICAgIH07XG5cbiAgICAgICBjb25zb2xlLmxvZyhub3RpZmljYXRpb24pO1xuICAgICAgIGRhby51cHNlcnQobm90aWZpY2F0aW9uKTtcblxuICB9OyovXG5cbmZ1bmN0aW9uIHByb2Nlc3NXb3JrZmxvd01lc3NhZ2UobWVzc2FnZSwgc3B1dWlkKSB7XG5cbiAgICB2YXIgcmVwbGFjZWRNc2cgPSBtZXNzYWdlO1xuXG4gICAgaWYgKHJlcGxhY2VkTXNnLmluZGV4T2YoJyNJTlNUQU5DRV9MQUJFTCcpICE9PSAtMSkge1xuICAgICAgICB2YXIgdmFsID0gSlNPTi54cGF0aChcIi9pbnN0YW5jZS9wcm9jZXNzZXMvc3ViUHJvY2Vzc2VzW3V1aWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXS9sYWJlbFwiLCBhcHAuU0NPUEUud29ya2Zsb3csIHt9KVswXTtcbiAgICAgICAgcmVwbGFjZWRNc2cgPSByZXBsYWNlZE1zZy5yZXBsYWNlKCcjSU5TVEFOQ0VfTEFCRUwnLCB2YWwpO1xuXG4gICAgfVxuXG4gICAgaWYgKHJlcGxhY2VkTXNnLmluZGV4T2YoJyNVU0VSX05BTUUnKSAhPT0gLTEpIHtcbiAgICAgICAgdmFyIHZhbCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL3N0ZXAvYXNzaWduZWRUby9uYW1lXCIsIGFwcC5TQ09QRS53b3JrZmxvdywge30pWzBdO1xuICAgICAgICByZXBsYWNlZE1zZyA9IHJlcGxhY2VkTXNnLnJlcGxhY2UoJyNVU0VSX05BTUUnLCB2YWwpO1xuXG4gICAgfVxuXG4gICAgaWYgKHJlcGxhY2VkTXNnLmluZGV4T2YoJyNQUk9GSUxFX1RJVExFJykgIT09IC0xKSB7XG4gICAgICAgIHZhciB2YWwgPSBhcHAucHJvZmlsZS50aXRsZTtcbiAgICAgICAgcmVwbGFjZWRNc2cgPSByZXBsYWNlZE1zZy5yZXBsYWNlKCcjUFJPRklMRV9USVRMRScsIHZhbCk7XG5cbiAgICB9XG5cbiAgICBpZiAocmVwbGFjZWRNc2cuaW5kZXhPZignI1BST0ZJTEVfVFlQRScpICE9PSAtMSkge1xuICAgICAgICB2YXIgdmFsID0gYXBwLlNDT1BFLkFQUF9DT05GSUcubmFtZTtcbiAgICAgICAgcmVwbGFjZWRNc2cgPSByZXBsYWNlZE1zZy5yZXBsYWNlKCcjUFJPRklMRV9UWVBFJywgdmFsKTtcblxuICAgIH1cblxuICAgIGlmIChyZXBsYWNlZE1zZy5pbmRleE9mKCcjVkFSX1NQVVVJRCcpICE9PSAtMSkge1xuICAgICAgICB2YXIgdmFsID0gc3B1dWlkO1xuICAgICAgICByZXBsYWNlZE1zZyA9IHJlcGxhY2VkTXNnLnJlcGxhY2UoJyNWQVJfU1BVVUlEJywgdmFsKTtcblxuICAgIH1cblxuICAgIHJldHVybiByZXBsYWNlZE1zZztcbn07XG5cbmZ1bmN0aW9uIF9nZXROYW1lKGFyciwgbGFuZykge1xuICAgIGlmIChhcnIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGFycltpXS5fbGFuZyA9PT0gbGFuZykge1xuICAgICAgICAgICAgICAgIHJldHVybiBhcnJbaV0udmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG59O1xuXG5mdW5jdGlvbiBfZ2V0TmFtZUJ5TGFuZyhvYmopIHtcbiAgICByZXR1cm4gbGlicmFyeS5nZXROYW1lQnlMYW5nKG9iaik7XG59O1xuXG5cblxuXG5cbi8qKlxuICogUHJvY2VzcyBwcmVXb3JrQWN0aW9uc1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBwcmVXb3JrQWN0aW9ucyAtIHRoZSBwcmVXb3JrQWN0aW9ucyBjb25maWcgZGF0YVxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuXG5mdW5jdGlvbiBwcmVXb3JrQWN0aW9ucyhwcmVXb3JrQWN0aW9ucywgX1dGSW5zdGFuY2UpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgY29tcGxldGVkID0gW107XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgc3ViUHJvY2Vzc0NvbmZpZ09iamVjdCA9IEpTT04ueHBhdGgoXCIvY29uZmlnL3Byb2Nlc3Nlc1tfaWQgZXEgJ1wiK2FwcC5wcm9jZXNzSUQrXCInXS9zdWJQcm9jZXNzZXNbX2lkIGVxICdcIisgYXBwLnByb2Nlc3NJZCtcIiddXCIsIF9XRkluc3RhbmNlICwge30pWzBdO1xuICAgICAgICAgICAgdmFyIHN0ZXBPYmplY3QgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiKyBhcHAuU0NPUEUucHJvY2Vzc1VVSUQgK1wiJ10vc3RlcFwiLF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICB1dGlsLnN5bmNMb29wKHByZVdvcmtBY3Rpb25zLmxlbmd0aCwgZnVuY3Rpb24gKGxvb3ApIHtcbiAgICAgICAgICAgICAgICB2YXIgY291bnRlciA9IGxvb3AuaXRlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgYWN0aW9uKHByZVdvcmtBY3Rpb25zW2NvdW50ZXJdLCBhcHAucHJvY2Vzc0lELCBhcHAucHJvY2Vzc1NFUSwgYXBwLnByb2Nlc3NJZCwgYXBwLnByb2Nlc3NTZXEsIHN1YlByb2Nlc3NDb25maWdPYmplY3QsIHN0ZXBPYmplY3QgLF9XRkluc3RhbmNlLCB7fSwgYXBwLlNDT1BFLnByb2Nlc3NVVUlEKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGFsbCBwcmUtcmVxdWlzaXRlcyBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LlxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQucHVzaCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgbG9vcC5uZXh0KCk7XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQucHVzaChmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGxvb3AuYnJlYWsoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbXBsZXRlZC5ldmVyeShCb29sZWFuKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnUHJlV29yay1hY3Rpb25zIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywge30pO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGUHJlQWN0aW9uc0Vycm9yJywgJ05vdCBhbGwgcHJlLXdvcmstYWN0aW9ucyBwYXNzZWQuJyk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gICAgcHJlUmVxdWlzaXRlczogcHJlUmVxdWlzaXRlcyxcbiAgICBwcmVBY3Rpb25zOiBwcmVBY3Rpb25zLFxuICAgIHBvc3RBY3Rpb25zOiBwb3N0QWN0aW9ucyxcbiAgICBwcmVXb3JrQWN0aW9uczogcHJlV29ya0FjdGlvbnMsXG4gICAgc3ViUHJvY2Vzczogc3ViUHJvY2VzcyxcbiAgICBpbmRpY2F0b3JEb2NzOiBpbmRpY2F0b3JEb2NzLFxuICAgIHRhc2s6IHRhc2ssXG4gICAgdHJhbnNpdGlvbjogdHJhbnNpdGlvbixcbiAgICBhc3NpZ25Vc2VyOiBhc3NpZ25Vc2VyXG5cbn0iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXRpbGl0eSBNb2R1bGVcbiAqXG4gKiBAbW9kdWxlIGxpYi91dGlsXG4gKlxuICogQGF1dGhvciBCcmVudCBHb3Jkb25cbiAqIEB2ZXJzaW9uIDAuMS4wXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBXb3JrZmxvdyB1dGlsaXR5IG1vZHVsZSB1c2VkIHRvIGZvcm1hdCB0aGUgcmV0dXJuIGFuZCBlcnJvciBvYmplY3RzLCBhbmRcbiAqIGNvbnRhaW5zIHNvbWUgb3RoZXIgdXRpbGl0eSBmdW5jdGlvbnMgc3VjaCBhcyBhIHN5bmMgbG9vcCBhbmQgY29tcGFyZS5cbiAqXG4gKi9cblxuLyoqXG4gKiBTdWNjZXNzIGJsb2NrIHJldHVybiBvYmplY3QsIGNvbnRhaW5zIGEgbWVzc2FnZSBhbmQgb3B0aW9uYWwgZGF0YSBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSB0aGUgc3VjY2VzcyBtZXNzYWdlXG4gKiBAcGFyYW0ge3N0cmluZ3xPYmplY3R9IFtkYXRhXSAtIHRoZSBzdWNjZXNzIHJldHVybmVkIGRhdGFcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gUmV0dXJuIHN1Y2Nlc3Mgd2l0aG91dCBhIGRhdGEgYmxvY2tcbiAqIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdTdWNjZXNzIG1lc3NhZ2UgZ29lcyBoZXJlLi4uJyk7XG4gKlxuICogQHJldHVybiB7T2JqZWN0fSAtIHdpdGggbWVzc2FnZSBhbmQgZGF0YSBwcm9wZXJ0aWVzXG4gKlxuICovXG5mdW5jdGlvbiBzdWNjZXNzKG1lc3NhZ2UsIGRhdGEpe1xuXHRyZXR1cm4ge1xuXHRcdG1lc3NhZ2U6IG1lc3NhZ2UsXG5cdFx0ZGF0YTogZGF0YVxuXHR9O1xufTtcblxuLyoqXG4gKiBXYXJuaW5nIGJsb2NrIHJldHVybiBvYmplY3QsIGNvbnRhaW5zIGEgbWVzc2FnZSBhbmQgb3B0aW9uYWwgZGF0YSBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSB0aGUgd2FybmluZyBtZXNzYWdlXG4gKiBAcGFyYW0ge3N0cmluZ3xPYmplY3R9IFtkYXRhXSAtIHRoZSByZXR1cm5lZCBkYXRhXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFJldHVybiBzdWNjZXNzIHdpdGhvdXQgYSBkYXRhIGJsb2NrXG4gKiB2YXIgc3VjY2VzcyA9IHV0aWwud2FybignV2FybmluZyBtZXNzYWdlIGdvZXMgaGVyZS4uLicpO1xuICpcbiAqIEByZXR1cm4ge09iamVjdH0gd2l0aCBtZXNzYWdlIGFuZCBkYXRhIHByb3BlcnRpZXMsIGFuZCBsb2dzIHRoZSB3YXJuaW5nIHRvIHRoZSBjb25zb2xlLlxuICpcbiAqL1xuZnVuY3Rpb24gd2FybihtZXNzYWdlLCBkYXRhKXtcblx0Y29uc29sZS53YXJuKGRhdGEpO1xuXHRyZXR1cm4ge1xuXHRcdHdhcm5pbmc6IG1lc3NhZ2UsXG5cdFx0ZGF0YTogZGF0YVxuXHR9O1xufTtcblxuLyoqXG4gKiBFcnJvciBibG9jayBKUyBlcnJvciBvYmplY3QsIGNvbnRhaW5zIGEgY29kZSBhbmQgbWVzc2FnZSBmb3IgdGhlIGVycm9yLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb2RlIC0gdGhlIGVycm9yIGNvZGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gdGhlIGVycm9yIG1lc3NhZ2VcbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIHN1Y2Nlc3MgPSB1dGlsLmVycm9yKCdFcnJvcjAwMScsJ0Vycm9yIG1lc3NhZ2UgZ29lcyBoZXJlLi4uJyk7XG4gKlxuICogQHJldHVybiB7T2JqZWN0fSB3aXRoIGEgY29kZSBhbmQgbWVzc2FnZSBwcm9wZXJ0aWVzLlxuICpcbiAqL1xuZnVuY3Rpb24gZXJyb3IoY29kZSwgbWVzc2FnZSl7XG5cdHZhciBlcnIgPSBuZXcgRXJyb3IoJycpO1xuXHRlcnIubmFtZSA9IGNvZGU7XG5cdGVyci5tZXNzYWdlID0gbWVzc2FnZTtcblx0cmV0dXJuIGVycjtcbn07XG5cbi8qKlxuICogQSBsb29wIHdoaWNoIGNhbiBsb29wIFggYW1vdW50IG9mIHRpbWVzLCB3aGljaCBjYXJyaWVzIG91dFxuICogYXN5bmNocm9ub3VzIGNvZGUsIGJ1dCB3YWl0cyBmb3IgdGhhdCBjb2RlIHRvIGNvbXBsZXRlIGJlZm9yZSBsb29waW5nLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBpdGVyYXRpb25zIC0gdGhlIG51bWJlciBvZiBpdGVyYXRpb25zIHRvIGNhcnJ5IG91dFxuICogQHBhcmFtIHtmdW5jdGlvbn0gcHJvY2VzcyAtIHRoZSBjb2RlL2Z1bmN0aW9uIHdlJ3JlIHJ1bm5pbmcgZm9yIGV2ZXJ5XG4gKiBpdGVyYXRpb25cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGV4aXQgLSBhbiBvcHRpb25hbCBjYWxsYmFjayB0byBjYXJyeSBvdXQgb25jZSB0aGUgbG9vcFxuICogaGFzIGNvbXBsZXRlZFxuICpcbiAqIEBleGFtcGxlXG4gKiB1dGlsLnN5bmNMb29wKDUsIGZ1bmN0aW9uKGxvb3Ape1xuICogXHR2YXIgY291bnRlciA9IGxvb3AuaXRlcmF0aW9uKCk7XG4gKiBcdC8vIEFkZCBhc3luYyBjYWxscyBoZXJlLi5cbiAqXG4gKiB9LCBmdW5jdGlvbigpe1xuICogXHQvLyBPbiBjb21wbGV0ZSBwZXJmb3JtIGFjdGlvbnMgaGVyZS4uLlxuICpcbiAqIH0pO1xuICpcbiAqIEByZXR1cm4ge09iamVjdH0gdGhlIGxvb3AgY29udHJvbCBvYmplY3QuXG4gKlxuICovXG5mdW5jdGlvbiBzeW5jTG9vcChpdGVyYXRpb25zLCBwcm9jZXNzLCBleGl0KXtcbiAgICB2YXIgaW5kZXggPSAwLFxuICAgICAgICBkb25lID0gZmFsc2UsXG4gICAgICAgIHNob3VsZEV4aXQgPSBmYWxzZTtcbiAgICB2YXIgbG9vcCA9IHtcbiAgICAgICAgbmV4dDpmdW5jdGlvbigpe1xuICAgICAgICAgICAgaWYoZG9uZSl7XG4gICAgICAgICAgICAgICAgaWYoc2hvdWxkRXhpdCAmJiBleGl0KXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV4aXQoKTsgLy8gRXhpdCBpZiB3ZSdyZSBkb25lXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSWYgd2UncmUgbm90IGZpbmlzaGVkXG4gICAgICAgICAgICBpZihpbmRleCA8IGl0ZXJhdGlvbnMpe1xuICAgICAgICAgICAgICAgIGluZGV4Kys7IC8vIEluY3JlbWVudCBvdXIgaW5kZXhcbiAgICAgICAgICAgICAgICBwcm9jZXNzKGxvb3ApOyAvLyBSdW4gb3VyIHByb2Nlc3MsIHBhc3MgaW4gdGhlIGxvb3BcbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSB3ZSdyZSBkb25lXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlOyAvLyBNYWtlIHN1cmUgd2Ugc2F5IHdlJ3JlIGRvbmVcbiAgICAgICAgICAgICAgICBpZihleGl0KSBleGl0KCk7IC8vIENhbGwgdGhlIGNhbGxiYWNrIG9uIGV4aXRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaXRlcmF0aW9uOmZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gaW5kZXggLSAxOyAvLyBSZXR1cm4gdGhlIGxvb3AgbnVtYmVyIHdlJ3JlIG9uXG4gICAgICAgIH0sXG4gICAgICAgIGJyZWFrOmZ1bmN0aW9uKGVuZCl7XG4gICAgICAgICAgICBkb25lID0gdHJ1ZTsgLy8gRW5kIHRoZSBsb29wXG4gICAgICAgICAgICBzaG91bGRFeGl0ID0gZW5kOyAvLyBQYXNzaW5nIGVuZCBhcyB0cnVlIG1lYW5zIHdlIHN0aWxsIGNhbGwgdGhlIGV4aXQgY2FsbGJhY2tcbiAgICAgICAgfVxuICAgIH07XG4gICAgbG9vcC5uZXh0KCk7XG4gICAgcmV0dXJuIGxvb3A7XG59O1xuXG5mdW5jdGlvbiBjb21wYXJlKHN1YmplY3QsIG9wZXJhdG9yLCB2YWx1ZSkge1xuICBcdHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgXHRcdGNhc2UgJ2dyZWF0ZXJUaGFuJzpcblx0XHRcdHJldHVybiBzdWJqZWN0ID4gdmFsdWU7XG5cdFx0Y2FzZSAnbGVzc1RoYW4nOlxuXHRcdFx0cmV0dXJuIHN1YmplY3QgPCB2YWx1ZTtcblx0XHRjYXNlICdncmVhdGVyVGhhbkVxdWFsJzpcblx0XHRcdHJldHVybiBzdWJqZWN0ID49IHZhbHVlO1xuXHRcdGNhc2UgJ2xlc3NUaGFuRXF1YWwnOlxuXHRcdFx0cmV0dXJuIHN1YmplY3QgPD0gdmFsdWU7XG5cdFx0Y2FzZSAnZXF1YWxUbyc6XG5cdFx0XHRyZXR1cm4gc3ViamVjdCA9PT0gdmFsdWU7XG5cdFx0Y2FzZSAnbm90RXF1YWxUbyc6XG5cdFx0XHRyZXR1cm4gc3ViamVjdCAhPT0gdmFsdWU7XG4gIFx0fVxufTtcblxuZnVuY3Rpb24gZ2V0TmFtZShhcnIsIGxhbmcpe1xuXHRpZiAoYXJyICE9PSB1bmRlZmluZWQpIHtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGggOyBpKyspIHtcblx0XHRcdGlmIChhcnJbaV0uaTE4bi5fbGFuZyA9PT0gbGFuZykge1xuXHRcdFx0XHRyZXR1cm4gYXJyW2ldLmkxOG4udmFsdWU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gXHRzdWNjZXNzOiBzdWNjZXNzLFxuIFx0d2Fybjogd2FybixcbiBcdGVycm9yOiBlcnJvcixcbiBcdHN5bmNMb29wOiBzeW5jTG9vcCxcbiBcdGNvbXBhcmU6IGNvbXBhcmUsXG5cdGdldE5hbWU6IGdldE5hbWVcblxuIH1cbiJdfQ==
