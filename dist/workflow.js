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
Workflow.prototype.getProfile = function() {
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
Workflow.prototype.getApp = function() {
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
Workflow.prototype.getConfig = function() {
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

Workflow.prototype.getInstance = function() {
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
Workflow.prototype.setInstance = function(data) {
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
Workflow.prototype.getSubProcesses = function() {
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
Workflow.prototype.setSubProcesses = function(data) {
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
Workflow.prototype.getIndicators = function() {
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
Workflow.prototype.setIndicators = function(data) {
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

Workflow.prototype.create = function() {
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
Workflow.prototype.initialise = function(processId, data, subprofileId) {
    var _this = this;
    return new Promise(function(resolve, reject) {
        try {
            var configProcess = [];
            // Check the passed in parameters
            if (processId !== '' && processId !== undefined) {
                // Get the current process config
                configProcess = _this.config.processes.filter(function(objProcess) {
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
            _this.instance.processes.filter(function(processItem) {
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
            _this.instance.processes.filter(function(processItem) {
                    if (processItem.id == processId && processItem.seq == processSeq) {
                        subProcessSeq = processItem.subProcesses.length + 1
                    }

                })
                // Call the subprocess method

            Process.subProcess(processId, processSeq, subProcessId, subProcessSeq, data, _this).then(function(subProcess) {
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
                Process.indicatorDocs(processId, indicators, step, _this).then(function(result) {
                    var success = util.success('Process: ' + _this.config.processes[0]._id + ' initialized successfully.', subProcessRef);
                    resolve(success);
                }, function(err) {
                    reject(err);
                })

            }, function(err) {
                _this.instance.processes = _this.instance.processes.filter(function(obj) {
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
Workflow.prototype.transition = function(processId, processSeq, subProcessId, subProcessSeq, stepId, transitionId, data, spuuid) {
    // Re-assign this
    var _this = this;
    return new Promise(function(resolve, reject) {
        try {
            var model = JSON.xpath("/subprocesses[_id eq '" + spuuid + "']/step/data", app.SCOPE.workflow, {})[0];

            Process.transition(processId, processSeq, subProcessId, subProcessSeq, stepId, transitionId, data, _this, spuuid, model).then(function(result) {

                // Update the current sub-process step data
                var update = function(type) {
                    _this.instance.processes.filter(function(processItem) {
                        if (processItem.id == processId && processItem.seq == processSeq) {

                            processItem.subProcesses.filter(function(subProcessItem) {
                                if (subProcessItem.id == subProcessId && subProcessItem.seq == subProcessSeq) {

                                    _this.subprocesses.filter(function(subProcessObj) {
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

                if (result.data.subProcessComplete) {

                    update('stepComplete');
                } else {

                    update('step');
                }

            }, function(err) {

                reject(err);
            });
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
Workflow.prototype.assignUser = function(processId, processSeq, subProcessId, subProcessSeq, user) {
    // Re-assign the Workflow constructor instance as _this
    var _this = this;
    return new Promise(function(resolve, reject) {
        try {
            Process.assignUser(processId, processSeq, subProcessId, subProcessSeq, user, _this).then(function(result) {
                resolve(result);
            }, function(err) {
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
Workflow.prototype.ui = function() {
    // Re-assign the Workflow constructor instance as _this
    var _this = this;
    return {
        getProcess: function(processId, lang) {
            return new Promise(function(resolve, reject) {
                try {
                    userInterface.getProcess(processId, lang, _this).then(function(model) {
                        resolve(model);
                    }, function(err) {
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

Workflow.prototype.getNodeValue = function(data, uuid) {
    // Re-assign the Workflow constructor instance as _this
    var _this = this;
    return new Promise(function(resolve, reject) {
        try {
            helper.getNodeValue(data, _this, uuid).then(function(res) {
                resolve(res);
            }, function(err) {
                reject(err);
            });
        } catch (err) {
            reject(err);
        }

    })
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

var community = (function() {

    return {

        createCommunity: function(_def, uuid, _WFInstance) {

            return new Promise(function(resolve, reject) {

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
                worker.send(workerObject).then(function(workerSuccess) {

                    var success = util.success('Worker processed successfully.', workerSuccess);
                    resolve(success);

                }, function(workerFail) {
                    reject(workerFail);
                });
            });
        },
        userJoinCommunity: function(_def, uuid, _WFInstance) {

            return new Promise(function(resolve, reject) {

            });

        },
        releaseAdoptedApplication: function(_def, uuid, _WFInstance) {

            return new Promise(function(resolve, reject) {

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

        createAppDefinition: function(_def, uuid, _WFInstance) {

            return new Promise(function(resolve, reject) {

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
                worker.send(workerObject).then(function(workerSuccess) {

                    var success = util.success('Worker processes successfully.', workerSuccess);
                    resolve(success);

                }, function(workerFail) {
                    reject(workerFail);
                });
            });

        },

        buildApplication: function(_def, uuid, _WFInstance) {

            return new Promise(function(resolve, reject) {

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
                worker.send(workerObject).then(function(workerSuccess) {

                    var success = util.success('Worker processes successfully.', workerSuccess);
                    resolve(success);

                }, function(workerFail) {
                    reject(workerFail);
                });
            });

        },

        applicationAdoption: function(_def, uuid, _WFInstance) {

            return new Promise(function(resolve, reject) {

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
                worker.send(workerObject).then(function(workerSuccess) {

                    var success = util.success('Worker processes successfully.', workerSuccess);
                    resolve(success);

                }, function(workerFail) {
                    reject(workerFail);
                });
            });

        },

        createTaxonomy: function(_def, uuid, _WFInstance) {

            return new Promise(function(resolve, reject) {

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

var performance = (function() {

    return {

        create: function(_def, uuid, _WFInstance) {

            return new Promise(function(resolve, reject) {

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
                worker.send(workerObject).then(function(workerSuccess) {

                    var success = util.success('Worker processed successfully.', workerSuccess);
                    resolve(success);

                }, function(workerFail) {
                    reject(workerFail);
                });
            });
        },

        configureNode: function(_def, uuid, _WFInstance) {

            return new Promise(function(resolve, reject) {

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
                worker.send(workerObject).then(function(workerSuccess) {

                    var success = util.success('Worker processed successfully.', workerSuccess);
                    resolve(success);

                }, function(workerFail) {
                    reject(workerFail);
                });
            });
        },
        unlockPeriod: function(_def, uuid, _WFInstance) {

            return new Promise(function(resolve, reject) {

                var subprocessObject = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];

                var entryUUID = JSON.xpath("/indicators[id eq '" + PERIOD_SET_ID + "']/instances/uuid", subprocessObject, {})[0];
                var enddate = subprocessObject.dates.valid;

                library.unlockPeriod(entryUUID, enddate).then(function(data) {

                    var uuidSavedIndicator = data.id;

                    dao.get(uuidSavedIndicator).done(function(data) {

                        for (var index = 0; index < _WFInstance.indicators.length; index++) {
                            var indicator = _WFInstance.indicators[index];
                            if (indicator._id == data._id) {
                                _WFInstance.indicators.splice(index, 1);
                                _WFInstance.indicators.push(data);
                                var success = util.success('Unlock period.', data);
                                resolve(success);


                            }

                        }

                    }).fail(function(err) {
                        console.error(err);
                        reject(err);
                    });


                }, function(error) {
                    reject(error);
                });






            });
        },
        lockPerformanceModel: function(_def, uuid, _WFInstance) {

            return new Promise(function(resolve, reject) {

                var subprocessObject = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];

                var entryUUID = JSON.xpath("/indicators[id eq '" + PERFORMANCE_SET_ID + "']/instances/uuid", subprocessObject, {})[0];
                var enddate = subprocessObject.dates.valid;

                library.lockPerformanceModel(entryUUID, enddate).then(function(data) {

                    var uuidSavedIndicator = data.id;

                    dao.get(uuidSavedIndicator).done(function(data) {

                        for (var index = 0; index < _WFInstance.indicators.length; index++) {
                            var indicator = _WFInstance.indicators[index];
                            if (indicator._id == data._id) {
                                _WFInstance.indicators.splice(index, 1);
                                _WFInstance.indicators.push(data);
                                var success = util.success('Lock performance model.', data);
                                resolve(success);


                            }

                        }

                    }).fail(function(err) {
                        console.error(err);
                        reject(err);
                    });


                }, function(error) {
                    reject(error);
                });






            });
        }

    }

})();

var sdo = (function() {

    return {

        create: function(_def, uuid, _WFInstance) {

            return new Promise(function(resolve, reject) {

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

var taxonomy = (function() {

    return {

        create: function(_def, uuid, _WFInstance) {

            return new Promise(function(resolve, reject) {

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

var subProcessInstance = (function() {

    return {

        setTitle: function(_def, uuid, dataValue, _WFInstance) {

            return new Promise(function(resolve, reject) {

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

        setValidDate: function(_def, uuid, dataValue, _WFInstance) {

            return new Promise(function(resolve, reject) {

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

var variables = (function() {

    return {

        setVariable: function(setVariable, _WFInstance, uuid) {

            return new Promise(function(resolve, reject) {

                helper.getNodeValue(setVariable.data, _WFInstance, uuid).then(function(dataValue) {


                    var scope = setVariable.scope;
                    var variableName = setVariable.name;
                    var variableType = setVariable.variableType;

                    var validDate = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/dates/valid", _WFInstance, {})[0];

                    switch (scope) {
                        case 'profile':

                            var profileId = _WFInstance.profile;
                            var profileVariableFileName = profileId + ':variables';
                            dao.get(profileVariableFileName).done(function(file) {

                                if (variableType == 'periodic') {
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
                                    eval('file.' + variableName + '.push(obj)');

                                } else {
                                    file[variableName] = dataValue;
                                }

                                dao.upsert(file).done(function(data) {
                                    resolve("Variable set successfully");
                                }).fail(function(error) {
                                    reject("Failed to set Variable");
                                });

                            }).fail(function(error) {

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

                                dao.upsert(file).done(function(data) {
                                    resolve("Variable set successfully");
                                }).fail(function(error) {
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

                }, function(err) {
                    reject("getNodeValue value not found.");
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
    variables: variables
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

            gatekeeper.instantiate(baseUUID, indicatorType, indicatorId, _WFInstance.profile, validDate, subprocessType).then(function(docArray) {
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
                sp.active = false;
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
                            path = "/indicators[category/term eq '" + indicatorId + "' and _id = /subprocesses[_id = /instance/processes/subProcesses[subprofileId eq '" + app.profile.subprofileId + "']/uuid]/indicators/instances/uuid]/_id";
                        }
                        var existingUUID = JSON.xpath(path, app.SCOPE.workflow, {});

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

        //----------
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
    console.log(res);
    return res;

};

function getNodeValue(data, _WFInstance, uuid) {


    return new Promise(function(resolve, reject) {


        if (data.value != undefined) {

            reject("ERROR: Unimplemented value type found.");

        } else if (data.indicatorUUID != undefined) {

            reject("ERROR: Unimplemented value type found.");

        } else if (data.indicator != undefined) {

            var indicatorUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + data.indicator.indicatorSetId + "']/instances/uuid", _WFInstance, {})[0];
            var indObject = JSON.xpath("/indicators[_id eq '" + indicatorUUID + "']", _WFInstance, {})[0];
            var xpath = '/model/pending/data/' + data.indicator.indicatorSetId + '/' + data.indicator.elementId;

            var seq = JSON.xpath("count(/subprocesses[_id eq '" + uuid + "']/preceding-sibling::node()[id = /subprocesses[_id eq '" + uuid + "']/id])", _WFInstance, {})[0] + 1;
            var subprocessType = JSON.xpath("/config/processes/subProcesses[_id eq /subprocesses[_id eq '" + uuid + "']/id]/type", _WFInstance, {})[0];

            if (subprocessType == PROCESS_TYPE_SUBPROFILE) {
                seq = JSON.xpath("count(/subprocesses[_id eq '" + uuid + "']/preceding-sibling::node()[id = /subprocesses[_id eq '" + uuid + "']/id and id = /subprocesses[_id = /instance/processes/subProcesses[subprofileId eq '" + app.profile.subprofileId + "']/uuid])", _WFInstance, {})[0] + 1;
            }

            var replacedPath = replaceAll(xpath, '#SEQUENCE#', seq);

            var validDate = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/dates/valid", _WFInstance, {})[0];
            var concatValidDate = "'" + validDate + "'";
            var newPath = replaceAll(replacedPath, '#END_DATE#', concatValidDate);

            var retValue = JSON.xpath(newPath, indObject, {})[0];

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
                            seq = JSON.xpath("count(/subprocesses[_id eq '" + uuid + "']/preceding-sibling::node()[id = /subprocesses[_id eq '" + uuid + "']/id and id = /subprocesses[_id = /instance/processes/subProcesses[subprofileId eq '" + app.profile.subprofileId + "']/uuid])", _WFInstance, {})[0] + 1;
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

        var subjectCount = '';

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

            var prereqProcessType = JSON.xpath("/config/processes/subProcesses[_id eq '" + _subprocessId + "']/type", app.SCOPE.workflow, {})[0];
            if (app.profile.subprofileId != undefined && app.profile.subprofileId != '' && prereqProcessType != undefined && prereqProcessType == PROCESS_TYPE_SUBPROFILE) {
                fullPath = "count(/subprocesses[id eq '" + _subprocessId + "' and _id = /instance/processes/subProcesses[subprofileId eq '" + app.profile.subprofileId + "']/uuid]" + innerXpath + ")";
            }

            subjectCount = JSON.xpath(fullPath, _WFInstance, {})[0];



        } else if (prerequisite.check.variableConfirm != undefined) {

        } else {

            var error = util.error('WFPreRequisiteError', 'Pre-requisite type not defined.');
            reject(error);

        }

        var compare = '';
        var countValue = '';

        // if (some) {
        //     countValue = XXX;
        // } else {
        //     countValue = prerequisite.check.numberProcessInstances.count;
        // }

        countValue = prerequisite.check.numberProcessInstances.count;

        prerequisite.check.numberProcessInstances.count
        if (prerequisite.check.numberProcessInstances) {
            compare = util.compare(subjectCount, prerequisite.check.numberProcessInstances.operator, parseInt(countValue));
        } else if (prerequisite.check.variableConfirm) {

        }

        if (compare) {
            var success = util.success('Pre-requisites passed.', {});
            resolve(success);
        } else {

            var message = helper.getLanguageMessage(prerequisite.message);
            var error = util.error('WFPreRequisiteError', message);
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

    });
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
                        var transitionId = subProcessConf.steps[0].transition[0]._id;
                        var stepSeq = 1;
                        step(processId, processSeq, subProcessId, subProcessSeq, stepId, stepSeq, data, _WFInstance, subProcessObjectId)
                            .then(function(result) {
                                model.step = result.data;
                                indicators(subProcessConf.indicators, _WFInstance, model._id).then(function(result1) {
                                    model.indicators = result1.data;
                                    // Execute the transitions, if auto
                                    var postActionsConf = processConf.postActions;
                                    postActions(postActionsConf, _WFInstance).then(function(result) {
                                        var success = util.success(result.message, model);
                                        resolve(success);
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
            indicatorDocs(processId, indicators, model, _WFInstance).then(function(result) {
                uuid = spuuid;

                if (step.function.actions != undefined) {
                    actions(step.function.actions, processId, processSeq, subProcessId, subProcessSeq, subProcess, model, _WFInstance, data, spuuid)
                        .then(function(result) {
                            // Execute the transitions, if auto
                            var transitionId = step.transition[0]._id;
                            transition(processId, processSeq, subProcessId, subProcessSeq, stepId, transitionId, data, _WFInstance, spuuid, model).then(function(result) {
                                var success = util.success('Transition completed successfully.', result.data.step);

                                resolve(success);
                            }, function(err) {
                                reject(err);
                            });

                        }, function(err) {
                            reject(err);
                        })
                        // Else tasks are sprecified, execute them
                } else if (step.function.task != undefined) {
                    // Make assignments
                    task(processId, processSeq, step.function.task, spuuid, model).then(function(result) {
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

                    });
                }

            });
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
            var methodPossibleItems = ["form", "indicator", "profile", "subProcessInstance", "step", "community", "application", "user", "sdo", "performance", "taxonomy", "variables"];
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

                        form.create(args).then(function(result) {
                            resolve(result.data);
                        }, function(err) {
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
                        form.authorise(args).then(function(result) {
                            resolve(result.data);
                        }, function(err) {
                            reject(err);
                        });

                    } else if (action.method.form.undraft != undefined) {
                        var args = [];
                        args.push(_WFInstance);
                        args.push(data.createType);
                        args.push(uuid);
                        args.push(data.baseUUID);
                        args.push(data);
                        form.setUnDraft(args).then(function(result) {
                            resolve(result.data);
                        }, function(err) {
                            reject(err);
                        });

                    } else if (action.method.form.draft != undefined) {
                        var args = [];
                        args.push(_WFInstance);
                        args.push(data.createType);
                        args.push(uuid);
                        args.push(data.baseUUID);
                        args.push(data);
                        form.setDraft(args).then(function(result) {
                            resolve(result.data);
                        }, function(err) {
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
                        form.close(args).then(function(result) {
                            resolve(result.data);
                        }, function(err) {
                            reject(err);
                        });

                    }

                    break;
                case 'indicator':
                    if (action.method.indicator.create != undefined) {

                    } else if (action.method.indicator.instantiate != undefined) {

                    } else if (action.method.indicator.setValue != undefined) {

                        var path = action.method.indicator.setValue.path;

                        helper.getNodeValue(action.method.indicator.setValue.data, _WFInstance, uuid).then(function(dataValue) {

                            var args = [];
                            args.push(_WFInstance);
                            args.push(uuid);
                            args.push(path);
                            args.push(dataValue);

                            form.updateIndicator(args).then(function(result) {
                                resolve(result.data);
                            }, function(err) {
                                reject(err);
                            });

                        }, function(err) {
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
                            form.markUpdateIndicator(args).then(function(result) {
                                resolve(result.data);
                            }, function(err) {
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
                        form.createProfile(args).then(function(result) {
                            resolve(result.data);
                        }, function(err) {
                            reject(err);
                        });

                    } else if (action.method.profile.X != undefined) {

                    }

                    break;
                case 'subProcessInstance':
                    var spPossibleItems = ["instantiate", "authorise", "close", "setVariable", "setStatusTo", "setStatusMsgTo", "setTitle", "setValidDate"];
                    switch (propertyExists(action.method.subProcessInstance, spPossibleItems)) {

                        case 'setTitle':
                            helper.getNodeValue(action.method.subProcessInstance.setTitle, _WFInstance, uuid).then(function(dataValue) {

                                actionsModule.subProcessInstance.setTitle(action.method.subProcessInstance.setTitle, uuid, dataValue, _WFInstance).then(function(result) {
                                    resolve(result.data);
                                }, function(err) {
                                    reject(err);
                                });

                            }, function(err) {
                                reject(err);
                            });

                            //update subprocess label in workflow instance process object: TODO
                            break;

                        case 'setValidDate':
                            helper.getNodeValue(action.method.subProcessInstance.setValidDate, _WFInstance, uuid).then(function(dataValue) {
                                actionsModule.subProcessInstance.setValidDate(action.method.subProcessInstance.setValidDate, uuid, dataValue, _WFInstance).then(function(result) {
                                    resolve(result.data);
                                }, function(err) {
                                    reject(err);
                                });
                            }, function(err) {
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
                            return actionsModule.community.createCommunity(action.method.community.createCommunity, uuid, _WFInstance).then(function(result) {
                                resolve(result.data);
                            }, function(err) {
                                reject(err);
                            });

                        case 'releaseAdoptedApplication':
                            return actionsModule.community.releaseAdoptedApplication(action.method.community.releaseAdoptedApplication, uuid, _WFInstance).then(function(result) {
                                resolve(result.data);
                            }, function(err) {
                                reject(err);
                            });

                        case 'userJoinCommunity':
                            return actionsModule.community.userJoinCommunity(action.method.community.userJoinCommunity, uuid, _WFInstance).then(function(result) {
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
                            return actionsModule.application.createAppDefinition(action.method.application.createAppDefinition, uuid, _WFInstance).then(function(result) {
                                resolve(result.data);
                            }, function(err) {
                                reject(err);
                            });

                        case 'buildApplication':
                            return actionsModule.application.buildApplication(action.method.application.buildApplication, uuid, _WFInstance).then(function(result) {
                                resolve(result.data);
                            }, function(err) {
                                reject(err);
                            });

                        case 'applicationAdoption':
                            return actionsModule.application.applicationAdoption(action.method.application.applicationAdoption, uuid, _WFInstance).then(function(result) {
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
                    var sdoPossibleItems = ["create"];
                    switch (propertyExists(action.method.sdo, sdoPossibleItems)) {

                        case 'create':
                            return actionsModule.sdo.create(action.method.sdo.create, uuid, _WFInstance).then(function(result) {
                                resolve(result.data);
                            }, function(err) {
                                reject(err);
                            });

                        default:
                            reject("No method found from implemented list.");
                            break;
                    }

                    break;

                case 'performance':
                    var performancePossibleItems = ["create", "configureNode", "unlockPeriod", "lockPerformanceModel"];
                    switch (propertyExists(action.method.performance, performancePossibleItems)) {

                        case 'create':
                            return actionsModule.performance.create(action.method.performance.create, uuid, _WFInstance).then(function(result) {
                                resolve(result.data);
                            }, function(err) {
                                reject(err);
                            });
                        case 'configureNode':
                            return actionsModule.performance.configureNode(action.method.performance.configureNode, uuid, _WFInstance).then(function(result) {
                                resolve(result.data);
                            }, function(err) {
                                reject(err);
                            });
                        case 'unlockPeriod':
                            return actionsModule.performance.unlockPeriod(action.method.performance.unlockPeriod, uuid, _WFInstance).then(function(result) {
                                resolve(result.data);
                            }, function(err) {
                                reject(err);
                            });
                        case 'lockPerformanceModel':
                            return actionsModule.performance.lockPerformanceModel(action.method.performance.lockPerformanceModel, uuid, _WFInstance).then(function(result) {
                                resolve(result.data);
                            }, function(err) {
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
                            return actionsModule.taxonomy.create(action.method.taxonomy.create, uuid, _WFInstance).then(function(result) {
                                resolve(result.data);
                            }, function(err) {
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

                            return actionsModule.variables.setVariable(action.method.variables.setVariable, _WFInstance, uuid).then(function(result) {
                                resolve(result.data);
                            }, function(err) {
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

    return new Promise(function(resolve, reject) {
        var list = [];
        if (task.assign.role != undefined) {
            var assignType = 'profileRole';
            var profileId = app.SCOPE.workflow.profile;
            var id = '';
            if (task.assign.role.profile == 'current') {
                id = app.SCOPE.workflow.profile;
            } else if (task.assign.role.profile == 'community') {
                id = app.SCOPE.getCommunityId();
            }

            var role = task.assign.role.roleId;

            library.getUsersListByRole(id, role).then(function(list) {
                if (list != undefined) {
                    if (list.length > 1) {

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

                        resolve('Notifications request submitted for acceptance.');

                    } else if (list.length == 1) {

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

                        resolve('Assigned to the only user in role.');

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

                        resolve("No users found in list. Assigning blank ");

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
function transition(processId, processSeq, subProcessId, subProcessSeq, stepId, transitionId, data, _WFInstance, spuuid, model) {
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
            var transition = currentStep[0].transition.filter(function(objTransition) {
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
                            spuuid = uuid;
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

            if (transition[0].transitionAction.goToStep != undefined) {

                var nextSeq = parseInt(currentStep[0]._seq) + parseInt(transition[0].transitionAction.goToStep.default);
                var nextId = '';
                currentSubProcess[0].steps.filter(function(stepItem) {

                    if (parseInt(stepItem._seq) == nextStepSeq) {
                        nextId = stepItem._id;
                    }

                });

                step(processId, processSeq, subProcessId, subProcessSeq, nextId, nextSeq, data, _WFInstance, spuuid).then(function(result) {
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

                }, function(err) {
                    reject(err);
                });

            } else if (transition[0].transitionAction.goToStepId != undefined) {

                var goToStepId = transition[0].transitionAction.goToStepId.stepId;
                var goToStepSeq = 1;

                currentSubProcess[0].steps.filter(function(stepItem) {
                    if (stepItem._id == goToStepId) {
                        goToStepSeq = parseInt(stepItem._seq);
                    }

                });

                step(processId, processSeq, subProcessId, subProcessSeq, goToStepId, goToStepSeq, data, _WFInstance, spuuid).then(function(result) {
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

                }, function(err) {
                    reject(err);
                });
            } else if (transition[0].transitionAction.stop != undefined) {

                var success = util.success('Step transition completed successfully.Workflow stopped.', {
                    subProcessComplete: true,
                    step: model
                });
                resolve(success);

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

function _getNameByLang(obj) {
    var lang = service.getLanguage();
    var expr = 'obj.' + lang;
    return eval(expr);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VzZXJzL0hhc2FuL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImluZGV4LmpzIiwibGliL2FjdGlvbnMuanMiLCJsaWIvZm9ybS5qcyIsImxpYi9oZWxwZXIuanMiLCJsaWIvaW50ZXJmYWNlLmpzIiwibGliL25vZGVWYWx1ZS5qcyIsImxpYi9wcm9jZXNzLmpzIiwibm9kZV9tb2R1bGVzL3V0aWxpdHkvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25vQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6dUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOXlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNySEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgUHJvY2VzcyA9IHJlcXVpcmUoJy4vbGliL3Byb2Nlc3MnKTtcclxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsaXR5Jyk7XHJcbnZhciB1c2VySW50ZXJmYWNlID0gcmVxdWlyZSgnLi9saWIvaW50ZXJmYWNlJyk7XHJcbnZhciBoZWxwZXIgPSByZXF1aXJlKCcuL2xpYi9oZWxwZXInKTtcclxuXHJcblxyXG4vKmdsb2JhbHMgKi9cclxuXHJcbi8qKlxyXG4gKiBBIG5ldyBXb3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZSBjb250YWlucyB0aGUgcmVmZXJlbmNlIHRvIHRoZSBhcHBsaWNhdGlvblxyXG4gKiBhbmQgYXNzb2NpYXRlZCBwcm9maWxlIHdoaWNoIGl0IHJlcXVpcmVzIGFzIHRoZSBmaXJzdCB0d28gcGFyYW1ldGVycy4gSXQgYWxzb1xyXG4gKiByZXF1aXJlcyBhIHdvcmtmbG93IGNvbmZpZ3VyYXRpb24sIGFzIHRoZSB0aGlyZCBwYXJhbWV0ZXIsIHdoaWNoIGlzIHVzZWQgdG9cclxuICogZGVzY2liZSB0aGUgd29ya2Zsb3cgcHJvY2Vzc2VzLiBJZiBhIHdvcmtmbG93IGluc3RhbmNlIGV4aXN0cyB5b3UgY2FuIHBhc3MgaXRcclxuICogaW4gYXMgdGhlIGZvdXJ0aCBwYXJhbWV0ZXIgd2hpY2ggaXQgd2lsbCB0aGVuIHVzZSwgZWxzZSBjcmVhdGUgYSBuZXcgb25lLlxyXG4gKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHByb2ZpbGUgLSBUaGUgY3VycmVudCBwcm9maWxlIGlkXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBhcHAgLSBUaGUgYXNzb2NpYXRlZCBhcHBsaWNhdGlvbiBpZFxyXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIC0gVGhlIGFwcGxpY2F0aW9uIHdvcmtmbG93IGNvbmZpZ3VyYXRpb24gLyBkZWZpbml0aW9uXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbaW5zdGFuY2VdIC0gQW4gZXhpc3RpbmcgYXBwbGljYXRpb24gcHJvZmlsZSB3b3JrZmxvdyBpbnN0YW5jZSBiYXNlZFxyXG4gKiBvbiB0aGUgZGVmaW5pdGlvblxyXG4gKlxyXG4gKiBAYXV0aG9yIEJyZW50IEdvcmRvblxyXG4gKiBAdmVyc2lvbiAwLjEuMFxyXG4gKlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgY29uZmlnID0geyAnX2lkJzogJ2FiYzEyMycgfTtcclxuXHJcbiAqIHZhciBpbnN0YW5jZSA9IHsgJ19pZCc6ICdpbnN0YW5jZV9hYmMxMjMnIH07XHJcblxyXG4gKiAvLyBJZiB0aGVyZSBpc24ndCBhbiBleGlzdGluZyBpbnN0YW5jZVxyXG4gKiB2YXIgd29ya2Zsb3cgPSBuZXcgV29ya2Zsb3coJzEyMzQnLCAnNTY3OCcsIGNvbmZpZyk7XHJcbiAqIC8vIElmIHRoZXJlIGlzIGFuIGV4aXN0aW5nIGluc3RhbmNlXHJcbiAqIHZhciB3b3JrZmxvdyA9IG5ldyBXb3JrZmxvdygnMTIzNCcsICc1Njc4JywgY29uZmlnLCBpbnN0YW5jZSk7XHJcbiAqXHJcbiAqIEByZXR1cm4ge09iamVjdH0gbmV3IFdvcmtmbG93IG9iamVjdFxyXG4gKlxyXG4gKiBAdGhyb3dzIEVycm9yOiBBIHByb2ZpbGUgaWQgaXMgcmVxdWlyZWRcclxuICogQHRocm93cyBFcnJvcjogQW4gYXBwIGlkIGlzIHJlcXVpcmVkXHJcbiAqIEB0aHJvd3MgRXJyb3I6IEEgd29ya2Zsb3cgY29uZmlndXJhdGlvbiBpcyByZXF1aXJlZFxyXG4gKlxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIFdvcmtmbG93KHByb2ZpbGUsIGNvbW11bml0eUlkLCBhcHAsIGNvbmZpZykge1xyXG4gICAgdmFyIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAvLyBDb21tdW5pdHkgSUQgdmFsaWRhdGlvbiBjaGVja3NcclxuICAgIGlmIChjb21tdW5pdHlJZCA9PSAnJyB8fCBjb21tdW5pdHlJZCA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aHJvdyB1dGlsLmVycm9yKCdQYXJhbVJlcXVpcmVkJywgJ0EgY29tbXVuaXR5IGlkIGlzIHJlcXVpcmVkLicpO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YoY29tbXVuaXR5SWQpICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGNvbW11bml0eSBpZCBtdXN0IGJlIGEgamF2YXNjcmlwdCBzdHJpbmcuJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIF90aGlzLmNvbW11bml0eUlkID0gY29tbXVuaXR5SWQgfHwgJyc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUHJvZmlsZSBJRCB2YWxpZGF0aW9uIGNoZWNrc1xyXG4gICAgaWYgKHByb2ZpbGUgPT0gJycgfHwgcHJvZmlsZSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aHJvdyB1dGlsLmVycm9yKCdQYXJhbVJlcXVpcmVkJywgJ0EgcHJvZmlsZSBpZCBpcyByZXF1aXJlZC4nKTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mKHByb2ZpbGUpICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHByb2ZpbGUgaWQgbXVzdCBiZSBhIGphdmFzY3JpcHQgc3RyaW5nLicpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBfdGhpcy5wcm9maWxlID0gcHJvZmlsZSB8fCAnJztcclxuICAgIH1cclxuXHJcbiAgICAvLyBBcHAgSUQgdmFsaWRhdGlvbiBjaGVja3NcclxuICAgIGlmIChhcHAgPT0gJycgfHwgYXBwID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRocm93IHV0aWwuZXJyb3IoJ1BhcmFtUmVxdWlyZWQnLCAnQW4gYXBwIGlkIGlzIHJlcXVpcmVkLicpO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YoYXBwKSAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBhcHAgaWQgbXVzdCBiZSBhIGphdmFzY3JpcHQgc3RyaW5nLicpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBfdGhpcy5hcHAgPSBhcHAgfHwgJyc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gV29ya2Zsb3cgY29uZmlndXJhdGlvbiB2YWxpZGF0aW9uIGNoZWNrc1xyXG4gICAgaWYgKGNvbmZpZyA9PSAnJyB8fCBjb25maWcgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhyb3cgdXRpbC5lcnJvcignUGFyYW1SZXF1aXJlZCcsICdBIHdvcmtmbG93IGNvbmZpZ3VyYXRpb24gaXMgcmVxdWlyZWQuJyk7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZihjb25maWcpICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIF90aGlzLmNvbmZpZyA9IEpTT04ucGFyc2UoY29uZmlnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgX3RoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFdvcmtmbG93IGluc3RhbmNlIHZhbGlkYXRpb24gY2hlY2tzXHJcbiAgICBfdGhpcy5pbnN0YW5jZTtcclxuICAgIC8vIFdvcmtmbG93IHN1Yi1wcm9jZXNzZXMgdmFsaWRhdGlvbiBjaGVja3NcclxuICAgIF90aGlzLnN1YnByb2Nlc3NlcyA9IFtdO1xyXG4gICAgLy8gV29ya2Zsb3cgaW5kaWNhdG9ycyBwbGFjZSBob2xkZXJcclxuICAgIF90aGlzLmluZGljYXRvcnMgPSBbXTtcclxuICAgIC8vIFdvcmtmbG93IHN1Yi1wcm9jZXNzIHN0ZXAgaGlzdG9yeSBwbGFjZSBob2xkZXJcclxuICAgIF90aGlzLmhpc3RvcnkgPSBbXTtcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBXb3JrZmxvdyBnZXQgcHJvZmlsZSBpZC5cclxuICpcclxuICogQGV4YW1wbGUgXCJcIlxyXG4gKlxyXG4gKiBAcmV0dXJuIFwiXCJcclxuICpcclxuICovXHJcbldvcmtmbG93LnByb3RvdHlwZS5nZXRQcm9maWxlID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wcm9maWxlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdvcmtmbG93IGdldCBhcHAgaWQuXHJcbiAqXHJcbiAqIEBleGFtcGxlIFwiXCJcclxuICpcclxuICogQHJldHVybiBcIlwiXHJcbiAqXHJcbiAqL1xyXG5Xb3JrZmxvdy5wcm90b3R5cGUuZ2V0QXBwID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hcHA7XHJcbn07XHJcblxyXG4vKipcclxuICogV29ya2Zsb3cgZ2V0IGNvbmZpZy5cclxuICpcclxuICogQGV4YW1wbGUgXCJcIlxyXG4gKlxyXG4gKiBAcmV0dXJuIFwiXCJcclxuICpcclxuICovXHJcbldvcmtmbG93LnByb3RvdHlwZS5nZXRDb25maWcgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbmZpZztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXb3JrZmxvdyBnZXQgaW5zdGFuY2UuXHJcbiAqXHJcbiAqIEBleGFtcGxlIFwiXCJcclxuICpcclxuICogQHJldHVybiBcIlwiXHJcbiAqXHJcbiAqL1xyXG5cclxuV29ya2Zsb3cucHJvdG90eXBlLmdldEluc3RhbmNlID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXb3JrZmxvdyBzZXQgdGhlIGluc3RhbmNlIGRhdGEuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC0gdGhlIHdvcmtmbG93IHByb2Nlc3MgaW5zdGFuY2UgZGF0YVxyXG4gKlxyXG4gKiBAZXhhbXBsZSBcIlwiXHJcbiAqXHJcbiAqIEByZXR1cm4gXCJcIlxyXG4gKlxyXG4gKi9cclxuV29ya2Zsb3cucHJvdG90eXBlLnNldEluc3RhbmNlID0gZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgdGhpcy5pbnN0YW5jZSA9IGRhdGE7XHJcbn07XHJcblxyXG4vKipcclxuICogV29ya2Zsb3cgZ2V0IHN1Yi1wcm9jZXNzZXMgZGF0YS5cclxuICpcclxuICogQGV4YW1wbGUgXCJcIlxyXG4gKlxyXG4gKiBAcmV0dXJuIFwiXCJcclxuICpcclxuICovXHJcbldvcmtmbG93LnByb3RvdHlwZS5nZXRTdWJQcm9jZXNzZXMgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLnN1YnByb2Nlc3NlcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXb3JrZmxvdyBzZXQgdGhlIHN1Yi1wcm9jZXNzZXMgZGF0YS5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSB0aGUgd29ya2Zsb3cgcHJvY2VzcyBpbnN0YW5jZSBkYXRhXHJcbiAqXHJcbiAqIEBleGFtcGxlIFwiXCJcclxuICpcclxuICogQHJldHVybiBcIlwiXHJcbiAqXHJcbiAqL1xyXG5Xb3JrZmxvdy5wcm90b3R5cGUuc2V0U3ViUHJvY2Vzc2VzID0gZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgdGhpcy5zdWJwcm9jZXNzZXMgPSBkYXRhO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdvcmtmbG93IGdldCBpbmRpY2F0b3Igc2V0IGRhdGEuXHJcbiAqXHJcbiAqIEBleGFtcGxlIFwiXCJcclxuICpcclxuICogQHJldHVybiBcIlwiXHJcbiAqXHJcbiAqL1xyXG5Xb3JrZmxvdy5wcm90b3R5cGUuZ2V0SW5kaWNhdG9ycyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaW5kaWNhdG9ycztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXb3JrZmxvdyBzZXQgdGhlIGluZGljYXRvciBzZXQgZGF0YS5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSB0aGUgd29ya2Zsb3cgcHJvY2VzcyBpbnN0YW5jZSBkYXRhXHJcbiAqXHJcbiAqIEBleGFtcGxlIFwiXCJcclxuICpcclxuICogQHJldHVybiBcIlwiXHJcbiAqXHJcbiAqL1xyXG5Xb3JrZmxvdy5wcm90b3R5cGUuc2V0SW5kaWNhdG9ycyA9IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgIHRoaXMuaW5kaWNhdG9ycyA9IGRhdGE7XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0IHRoZSB2YXJpYWJsZSB2YWx1ZS5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHByb2Nlc3MgaWRcclxuICogQHBhcmFtIHtudW1iZXJ9IHByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2UgcHJvY2VzcyBzZXFcclxuICogQHBhcmFtIHtzdHJpbmd9IHN1YlByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN1Yi1wcm9jZXNzIGlkXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdWJQcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHN1Yi1wcm9jZXNzIHNlcVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RlcElkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3RlcCBpZFxyXG4gKiBAcGFyYW0ge09iamVjdH0gdmFyaWFibGUgLSB0aGUgV29ya2Zsb3cgdmFyaWFibGUgb2JqZWN0XHJcbiAqXHJcbiAqIEBleGFtcGxlICcnXHJcbiAqXHJcbiAqIEByZXR1cm4gJydcclxuICpcclxuICovXHJcbi8vIFdvcmtmbG93LnByb3RvdHlwZS5zZXRWYXJpYWJsZSA9IGZ1bmN0aW9uKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdGVwSWQsIHZhcmlhYmxlKXtcclxuLy8gXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG4vLyBcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuLy8gXHRcdHRyeSB7XHJcbi8vIFx0XHRcdFByb2Nlc3MuZ2V0VmFyaWFibGUocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwgdmFyaWFibGUpLnRoZW4oZnVuY2lvbihyZXN1bHQpe1xyXG4vLyBcdFx0XHRcdHJlc29sdmUocmVzdWx0LmRhdGEpO1xyXG4vLyBcdFx0XHR9LCBmdW5jdGlvbihlcnIpe1xyXG4vLyBcdFx0XHRcdHJlamVjdChlcnIpO1xyXG4vLyBcdFx0XHR9KVxyXG4vLyBcdFx0fSBjYXRjaCAoZXJyKSB7XHJcbi8vIFx0XHRcdHJlamVjdChlcnIpO1xyXG4vLyBcdFx0fVxyXG5cclxuLy8gXHR9KTtcclxuLy8gfTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIHZhcmlhYmxlIHZhbHVlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gcHJvY2VzcyBpZFxyXG4gKiBAcGFyYW0ge251bWJlcn0gcHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBwcm9jZXNzIHNlcVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3ViUHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3ViLXByb2Nlc3MgaWRcclxuICogQHBhcmFtIHtudW1iZXJ9IHN1YlByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2Ugc3ViLXByb2Nlc3Mgc2VxXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdGVwSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdGVwIGlkXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSB0aGUgV29ya2Zsb3cgdmFyaWFibGUgaWRcclxuICpcclxuICogQGV4YW1wbGUgJydcclxuICpcclxuICogQHJldHVybiAnJ1xyXG4gKlxyXG4gKi9cclxuLy8gV29ya2Zsb3cucHJvdG90eXBlLmdldFZhcmlhYmxlID0gZnVuY3Rpb24ocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwga2V5KXtcclxuLy8gXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG4vLyBcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuLy8gXHRcdHRyeSB7XHJcbi8vIFx0XHRcdFByb2Nlc3Muc2V0VmFyaWFibGUocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwga2V5KS50aGVuKGZ1bmNpb24ocmVzdWx0KXtcclxuLy8gXHRcdFx0XHRyZXNvbHZlKHJlc3VsdC5kYXRhKTtcclxuLy8gXHRcdFx0fSwgZnVuY3Rpb24oZXJyKXtcclxuLy8gXHRcdFx0XHRyZWplY3QoZXJyKTtcclxuLy8gXHRcdFx0fSlcclxuLy8gXHRcdH0gY2F0Y2ggKGVycikge1xyXG4vLyBcdFx0XHRyZWplY3QoZXJyKTtcclxuLy8gXHRcdH1cclxuXHJcbi8vIFx0fSk7XHJcbi8vIH07XHJcblxyXG4vKipcclxuICogVGhpcyBtZXRob2QgY3JlYXRlcyBhIG5ldyB3b3JrZmxvdyBwcm9jZXNzIGkuZS4gaXQgY3JlYXRlcyBhIHdvcmtmbG93IHByb2Nlc3NlcyBpbnN0YW5jZVxyXG4gKiBvYmplY3Qgd2l0aCB0aGUgbWluaW11bSByZXF1aXJlZCBkYXRhLiBUaGlzIGluc3RhbmNlIGNhbiBiZSByZWZlcmVuY2VkIGluIHRoZSBmb2xsb3dpbmdcclxuICogd2F5LCBzZWUgZXhhbXBsZSBiZWxvdy5cclxuICpcclxuICogQGV4YW1wbGVcclxuICogdmFyIGNvbmZpZyA9IHsgJ19pZCc6ICdhYmMxMjMnIH07XHJcblxyXG4gKiB2YXIgd29ya2Zsb3cgPSBuZXcgV29ya2Zsb3coJzEyMzQnLCAnNTY3OCcsIGNvbmZpZyk7XHJcbiAqIHdvcmtmbG93LmNyZWF0ZSgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcclxuICpcdGNvbnNvbGUubG9nKHJlc3VsdC5tZXNzYWdlKTtcclxuICpcdC8vIFRoZSBmb2xsb3dpbmcgcHJvcGVydGllcyBjYW4gbm93IGJlIGFjY2Vzc2VkXHJcbiAqIFx0dmFyIHByb2ZpbGUgPSB3b3JrZmxvdy5wcm9maWxlO1xyXG4gKiBcdHZhciBhcHAgPSB3b3JrZmxvdy5hcHA7XHJcbiAqIFx0dmFyIGNvbmZpZyA9IHdvcmtmbG93LmNvbmZpZztcclxuICpcdC8vIE9uIHN1Y2Nlc3MgeW91IGNhbiBhY2Nlc3MgdGhlIGluc3RhbmNlIHRoZSBmb2xsb3dpbmcgd2F5XHJcbiAqXHR2YXIgaW5zdGFuY2UgPSB3b3JrZmxvdy5pbnN0YW5jZTtcclxuICogfSwgZnVuY3Rpb24oZXJyb3Ipe1xyXG4gKlx0Y29uc29sZS5sb2coZXJyb3IpO1xyXG4gKiB9KTtcclxuICpcclxuICogQHJldHVybiB7T2JqZWN0fSBuZXcgV29ya2Zsb3cgaW5zdGFuY2Ugd2l0aCB1cGRhdGVkIGluc3RhbmNlIGRhdGEuXHJcbiAqXHJcbiAqL1xyXG5cclxuV29ya2Zsb3cucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAoX3RoaXMuaW5zdGFuY2UgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHdhcm4gPSB1dGlsLndhcm4oJ0luc3RhbmNlIGFscmVhZHkgZXhpc3RzLicsIF90aGlzKVxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh3YXJuKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgd29ya2Zsb3cgcHJvY2Vzc2VzIGluc3RhbmNlIG9iamVjdFxyXG4gICAgICAgICAgICAgICAgdmFyIG1vZGVsID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIF9pZDogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgdmVyc2lvbjogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3dvcmtmbG93SW5zdGFuY2UnLFxyXG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NlczogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbm5lbHM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21tdW5pdHlfXCIgKyBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxlX1wiICsgYXBwLlNDT1BFLnByb2ZpbGVJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHBsaWNhdGlvbl9cIiArIGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbW11bml0eV9cIiArIGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpICsgXCJfYXBwbGljYXRpb25fXCIgKyBhcHAuU0NPUEUuYXBwbGljYXRpb25JZFxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgbW9kZWwuX2lkID0gX3RoaXMucHJvZmlsZSArICc6cHJvY2Vzc2VzJztcclxuICAgICAgICAgICAgICAgIG1vZGVsLnZlcnNpb24gPSBfdGhpcy5jb25maWcudmVyc2lvbjtcclxuICAgICAgICAgICAgICAgIF90aGlzLmluc3RhbmNlID0gbW9kZWw7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya2Zsb3cgcHJvY2Vzc2VzIGluc3RhbmNlIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5LicsIF90aGlzKTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogV29ya2Zsb3cgaW5pdGlhbGlzZSwgdGhpcyBmdW5jdGlvbiBleGVjdXRlcyBhIHByb2Nlc3Mgd2l0aGluIGEgd29ya2Zsb3dcclxuICogY29uZmlndXJhdGlvbi5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NJZCAtIHRoZSBwcm9jZXNzIGlkIHRvIHByb2Nlc3NcclxuICogQHBhcmFtIHtvYmplY3R9IFtkYXRhXSAtIHRoZSBpbnB1dCBkYXRhIHRvIHByb2Nlc3NcclxuICpcclxuICogQGV4YW1wbGVcclxuICogV29ya2Zsb3cuaW5pdGlhbGlzZSgncHJvY2Vzc0lkJywgeyB2YWxpZERhdGU6ICdkYXRlJyB9KTtcclxuICpcclxuICogQHJldHVybiBcIlwiXHJcbiAqXHJcbiAqL1xyXG5Xb3JrZmxvdy5wcm90b3R5cGUuaW5pdGlhbGlzZSA9IGZ1bmN0aW9uKHByb2Nlc3NJZCwgZGF0YSwgc3VicHJvZmlsZUlkKSB7XHJcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHZhciBjb25maWdQcm9jZXNzID0gW107XHJcbiAgICAgICAgICAgIC8vIENoZWNrIHRoZSBwYXNzZWQgaW4gcGFyYW1ldGVyc1xyXG4gICAgICAgICAgICBpZiAocHJvY2Vzc0lkICE9PSAnJyAmJiBwcm9jZXNzSWQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgLy8gR2V0IHRoZSBjdXJyZW50IHByb2Nlc3MgY29uZmlnXHJcbiAgICAgICAgICAgICAgICBjb25maWdQcm9jZXNzID0gX3RoaXMuY29uZmlnLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqUHJvY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmpQcm9jZXNzLl9pZCA9PSBwcm9jZXNzSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9ialByb2Nlc3M7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ1Byb2Nlc3NbMF0uX2lkID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGQ29uZmlnRXJyb3InLCAnTm8gdmFsaWQgcHJvY2VzcyBkZWZpbml0aW9uIGZvdW5kIHdpdGggcHJvY2VzcyBpZDogJyArIHByb2Nlc3NJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25maWdQcm9jZXNzLnB1c2goX3RoaXMuY29uZmlnLnByb2Nlc3Nlc1swXSk7XHJcbiAgICAgICAgICAgICAgICBwcm9jZXNzSWQgPSBfdGhpcy5jb25maWcucHJvY2Vzc2VzWzBdLl9pZDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gR2V0IHRoZSBjdXJyZW50IGxpc3Qgb2YgcHJvY2VzcyBpbnN0YW5jZXNcclxuICAgICAgICAgICAgLy8gdmFyIHByb2Nlc3NTZXEgPSAxO1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudFByb2Nlc3MgPSBbXTtcclxuICAgICAgICAgICAgX3RoaXMuaW5zdGFuY2UucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihwcm9jZXNzSXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHByb2Nlc3NJdGVtLmlkID09IHByb2Nlc3NJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQcm9jZXNzLnB1c2gocHJvY2Vzc0l0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZhciBwcm9jZXNzU2VxID0gY3VycmVudFByb2Nlc3MubGVuZ3RoICsgMTtcclxuICAgICAgICAgICAgLy8gdmFyIG5leHRTZXEgPSBwcm9jZXNzU2VxICsgMTtcclxuICAgICAgICAgICAgLy8gUHVzaCB0aGUgcHJvY2VzcyBvYmplY3QgaW50byB0aGUgYXJyYXlcclxuICAgICAgICAgICAgdmFyIHByb2Nlc3NNb2RlbCA9IHtcclxuICAgICAgICAgICAgICAgIGlkOiAnJyxcclxuICAgICAgICAgICAgICAgIHNlcTogJycsXHJcbiAgICAgICAgICAgICAgICBzdWJQcm9jZXNzZXM6IFtdXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIDEuIFVwZGF0ZSB0aGUgcHJvY2VzcyBpZCBhbmQgc2VxXHJcbiAgICAgICAgICAgIHByb2Nlc3NNb2RlbC5pZCA9IHByb2Nlc3NJZDtcclxuICAgICAgICAgICAgcHJvY2Vzc01vZGVsLnNlcSA9IHByb2Nlc3NTZXE7XHJcbiAgICAgICAgICAgIF90aGlzLmluc3RhbmNlLnByb2Nlc3Nlcy5wdXNoKHByb2Nlc3NNb2RlbCk7XHJcbiAgICAgICAgICAgIC8vIFBhcmFtZXRlcnNcclxuICAgICAgICAgICAgdmFyIHN1YlByb2Nlc3NJZCA9IGNvbmZpZ1Byb2Nlc3NbMF0uc3ViUHJvY2Vzc2VzWzBdLl9pZDtcclxuICAgICAgICAgICAgdmFyIHN1YlByb2Nlc3NTZXEgPSAxO1xyXG4gICAgICAgICAgICBfdGhpcy5pbnN0YW5jZS5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHByb2Nlc3NJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb2Nlc3NJdGVtLmlkID09IHByb2Nlc3NJZCAmJiBwcm9jZXNzSXRlbS5zZXEgPT0gcHJvY2Vzc1NlcSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzU2VxID0gcHJvY2Vzc0l0ZW0uc3ViUHJvY2Vzc2VzLmxlbmd0aCArIDFcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vIENhbGwgdGhlIHN1YnByb2Nlc3MgbWV0aG9kXHJcblxyXG4gICAgICAgICAgICBQcm9jZXNzLnN1YlByb2Nlc3MocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIGRhdGEsIF90aGlzKS50aGVuKGZ1bmN0aW9uKHN1YlByb2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIC8vIEdlbmVyYXRlIHRoZSB1dWlkXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHV1aWQgPSBzdWJQcm9jZXNzLmRhdGEuX2lkOyAvL190aGlzLnByb2ZpbGUgKyAnOicgKyBfdGhpcy5hcHAgKyAnOicgKyBwcm9jZXNzSWQgKyAnOicgKyBwcm9jZXNzU2VxICsgJzonICsgc3ViUHJvY2Vzc0lkICsgJzonICsgc3ViUHJvY2Vzc1NlcTtcclxuICAgICAgICAgICAgICAgIHZhciBsYWJlbCA9IGRhdGEubGFiZWw7XHJcbiAgICAgICAgICAgICAgICAvLyBCdWlsZCB0aGUgc3ViLXByb2Nlc3MgcmVmZXJlbmNlIG9iamVjdFxyXG5cclxuICAgICAgICAgICAgICAgIC8vVE9ETzogQ2hhbmdlIHJlcXVpcmVkIHRvIG1vdmUgaXNBY3RpdmUgdG8gc3ViUHJvY2VzcyBmaWxlLlJlbW92ZSBmcm9tIGhlcmVcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgc3ViUHJvY2Vzc1JlZiA9IHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogc3ViUHJvY2Vzc0lkLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1YnByb2ZpbGVJZDogc3VicHJvZmlsZUlkLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcTogc3ViUHJvY2Vzc1NlcSxcclxuICAgICAgICAgICAgICAgICAgICB1dWlkOiB1dWlkLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBsYWJlbFxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUgcmVmZXJlbmNlIHRvIHRoZSBwcm9jZXNzIG1vZGVsXHJcbiAgICAgICAgICAgICAgICBwcm9jZXNzTW9kZWwuc3ViUHJvY2Vzc2VzLnB1c2goc3ViUHJvY2Vzc1JlZik7XHJcbiAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIHN1YlByb2Nlc3MgbW9kZWwgdG8gdGhlIHN1YnByb2Nlc3NlcyBhcnJheVxyXG4gICAgICAgICAgICAgICAgLy9fdGhpcy5zdWJwcm9jZXNzZXMucHVzaChzdWJQcm9jZXNzLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgLy8gX3RoaXMuaW5zdGFuY2UucHJvY2Vzc2VzLnB1c2gocHJvY2Vzc01vZGVsKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBfdGhpcy5pbnN0YW5jZS5wcm9jZXNzZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByb2Nlc3NJdGVtID0gX3RoaXMuaW5zdGFuY2UucHJvY2Vzc2VzW2luZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvY2Vzc0l0ZW0uaWQgPT0gcHJvY2Vzc0lkICYmIHByb2Nlc3NJdGVtLnNlcSA9PSBwcm9jZXNzU2VxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgY3VycmVudCBwcm9jZXNzIGZyb20gdGhlIGFycmF5IGFuZCBhZGQgdGhlIHVwZGF0ZWQgcHJvY2Vzc01vZGVsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmluc3RhbmNlLnByb2Nlc3Nlcy5zcGxpY2UoaW5kZXgsIDEsIHByb2Nlc3NNb2RlbClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFByb2Nlc3MgdGhlIGluZGljYXRvciBkb2N1bWVudHMgd29ya2Zsb3cgcHJvY2Vzc2VzIHVwZGF0ZXNcclxuICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3JzID0gc3ViUHJvY2Vzcy5kYXRhLmluZGljYXRvcnM7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RlcCA9IHN1YlByb2Nlc3MuZGF0YS5zdGVwO1xyXG4gICAgICAgICAgICAgICAgUHJvY2Vzcy5pbmRpY2F0b3JEb2NzKHByb2Nlc3NJZCwgaW5kaWNhdG9ycywgc3RlcCwgX3RoaXMpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1Byb2Nlc3M6ICcgKyBfdGhpcy5jb25maWcucHJvY2Vzc2VzWzBdLl9pZCArICcgaW5pdGlhbGl6ZWQgc3VjY2Vzc2Z1bGx5LicsIHN1YlByb2Nlc3NSZWYpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmluc3RhbmNlLnByb2Nlc3NlcyA9IF90aGlzLmluc3RhbmNlLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEob2JqLmlkID09IHByb2Nlc3NJZCAmJiBvYmouc2VxID09IHByb2Nlc3NTZXEpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogV29ya2Zsb3cgdHJhbnNpdGlvbiB0byB0aGUgbmV4dCBzdGVwLiBUaGlzIG1vdmVzIHRoZSB3b3JrZmxvdyBmcm9tIHRoZSBjdXJyZW50IHByb2Nlc3MsXHJcbiAqIHN1Yi1wcm9jZXNzIHN0ZXAgdG8gdGhlIG5leHQgb25lIGFzIHNwZWNpZmllZC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHByb2Nlc3MgaWRcclxuICogQHBhcmFtIHtudW1iZXJ9IHByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2UgcHJvY2VzcyBzZXFcclxuICogQHBhcmFtIHtzdHJpbmd9IHN1YlByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN1Yi1wcm9jZXNzIGlkXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdWJQcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHN1Yi1wcm9jZXNzIHNlcVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RlcElkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3RlcCBpZCBcclxuICogQHBhcmFtIHtzdHJpbmd9IHRyYW5zaXRpb25JZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHRyYW5zaXRpb24gaWRcclxuICogQHBhcmFtIHtvYmplY3R9IGRhdGEgLSBhbnkgYWRkaXRpb25hbCBkYXRhIHBhc3NlZCBpbiBhcyBrZXkgdmFsdWUgcGFpcnNcclxuICpcclxuICogQGV4YW1wbGVcclxuICogV29ya2Zsb3cudHJhbnNpdGlvbigncHJvY2Vzc0lkJywgMSwgJ3N1YlByb2Nlc3NJZCcsIDEsICdzdGVwSWQnLCAndHJhbnNpdGlvbklkJywgeyBrZXk6ICcnLCB2YWx1ZTogJycgfSk7XHJcbiAqXHJcbiAqIEByZXR1cm4gXCJcIlxyXG4gKlxyXG4gKi9cclxuV29ya2Zsb3cucHJvdG90eXBlLnRyYW5zaXRpb24gPSBmdW5jdGlvbihwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3RlcElkLCB0cmFuc2l0aW9uSWQsIGRhdGEsIHNwdXVpZCkge1xyXG4gICAgLy8gUmUtYXNzaWduIHRoaXNcclxuICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIG1vZGVsID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHNwdXVpZCArIFwiJ10vc3RlcC9kYXRhXCIsIGFwcC5TQ09QRS53b3JrZmxvdywge30pWzBdO1xyXG5cclxuICAgICAgICAgICAgUHJvY2Vzcy50cmFuc2l0aW9uKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdGVwSWQsIHRyYW5zaXRpb25JZCwgZGF0YSwgX3RoaXMsIHNwdXVpZCwgbW9kZWwpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBjdXJyZW50IHN1Yi1wcm9jZXNzIHN0ZXAgZGF0YVxyXG4gICAgICAgICAgICAgICAgdmFyIHVwZGF0ZSA9IGZ1bmN0aW9uKHR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5pbnN0YW5jZS5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHByb2Nlc3NJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzSXRlbS5pZCA9PSBwcm9jZXNzSWQgJiYgcHJvY2Vzc0l0ZW0uc2VxID09IHByb2Nlc3NTZXEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzSXRlbS5zdWJQcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHN1YlByb2Nlc3NJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1YlByb2Nlc3NJdGVtLmlkID09IHN1YlByb2Nlc3NJZCAmJiBzdWJQcm9jZXNzSXRlbS5zZXEgPT0gc3ViUHJvY2Vzc1NlcSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuc3VicHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihzdWJQcm9jZXNzT2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3ViUHJvY2Vzc09iai5faWQgPT0gc3ViUHJvY2Vzc0l0ZW0udXVpZCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PSAnc3RlcCcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NPYmouc3RlcCA9IHJlc3VsdC5kYXRhLnN0ZXA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKHJlc3VsdC5tZXNzYWdlLCBzdWJQcm9jZXNzT2JqKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09ICdzdGVwQ29tcGxldGUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NPYmouc3RlcCA9IHJlc3VsdC5kYXRhLnN0ZXA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NPYmouY29tcGxldGUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKHJlc3VsdC5tZXNzYWdlLCBzdWJQcm9jZXNzT2JqLnN0ZXApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YS5zdWJQcm9jZXNzQ29tcGxldGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlKCdzdGVwQ29tcGxldGUnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZSgnc3RlcCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG5cclxuICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdvcmtmbG93IGFzc2lnbiB1c2VyLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gcHJvY2VzcyBpZFxyXG4gKiBAcGFyYW0ge251bWJlcn0gcHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBwcm9jZXNzIHNlcVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3ViUHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3ViLXByb2Nlc3MgaWRcclxuICogQHBhcmFtIHtudW1iZXJ9IHN1YlByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2Ugc3ViLXByb2Nlc3Mgc2VxXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdGVwSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdGVwIGlkXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSB1c2VyIC0gdGhlIHVzZXIgaWQgYW5kIG5hbWUgZGF0YVxyXG4gKlxyXG4gKiBAZXhhbXBsZSBcIlwiXHJcbiAqXHJcbiAqIEByZXR1cm4gXCJcIlxyXG4gKlxyXG4gKi9cclxuV29ya2Zsb3cucHJvdG90eXBlLmFzc2lnblVzZXIgPSBmdW5jdGlvbihwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgdXNlcikge1xyXG4gICAgLy8gUmUtYXNzaWduIHRoZSBXb3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZSBhcyBfdGhpc1xyXG4gICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBQcm9jZXNzLmFzc2lnblVzZXIocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHVzZXIsIF90aGlzKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSlcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXb3JrZmxvdyB0YXNrLCB0aGlzIG1ldGhvZCBleGVjdXRlcyBhIHNwZWNpZmljIHRhc2suXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9jZXNzSWQgLSB0aGUgcHJvY2VzcyBpZCB0byBwcm9jZXNzXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dERhdGEgLSB0aGUgaW5wdXQgZGF0YSB0byBwcm9jZXNzXHJcbiAqXHJcbiAqIEBleGFtcGxlXHJcbiAqIFdvcmtmbG93LmluaXRpYWxpemUoJ3Byb2Nlc3NJZCcsIHsgdmFsaWREYXRlOiAnZGF0ZScgfSk7XHJcbiAqXHJcbiAqIEByZXR1cm4gXCJcIlxyXG4gKlxyXG4gKi9cclxuV29ya2Zsb3cucHJvdG90eXBlLnVpID0gZnVuY3Rpb24oKSB7XHJcbiAgICAvLyBSZS1hc3NpZ24gdGhlIFdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlIGFzIF90aGlzXHJcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnZXRQcm9jZXNzOiBmdW5jdGlvbihwcm9jZXNzSWQsIGxhbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VySW50ZXJmYWNlLmdldFByb2Nlc3MocHJvY2Vzc0lkLCBsYW5nLCBfdGhpcykudGhlbihmdW5jdGlvbihtb2RlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG1vZGVsKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufTtcclxuXHJcbi8qKlxyXG4gKiBXb3JrZmxvdyB0YXNrLCB0aGlzIG1ldGhvZCBleGVjdXRlcyBhIHNwZWNpZmljIHRhc2suXHJcbiAqXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIC0gdGhlIHByb2Nlc3MgaWQgdG8gcHJvY2Vzc1xyXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgaW5wdXQgZGF0YSB0byBwcm9jZXNzXHJcbiAqICogQHBhcmFtIHtzdHJpbmd9IHV1aWQgLSB0aGUgaW5wdXQgZGF0YSB0byBwcm9jZXNzXHJcbiAqXHJcbiAqIEBleGFtcGxlXHJcbiAqIFdvcmtmbG93LmdldE5vZGVWYWx1ZShkYXRhLCBfV0ZJbnN0YW5jZSwgdXVpZCk7XHJcbiAqXHJcbiAqIEByZXR1cm4gXCJcIlxyXG4gKlxyXG4gKi9cclxuXHJcbldvcmtmbG93LnByb3RvdHlwZS5nZXROb2RlVmFsdWUgPSBmdW5jdGlvbihkYXRhLCB1dWlkKSB7XHJcbiAgICAvLyBSZS1hc3NpZ24gdGhlIFdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlIGFzIF90aGlzXHJcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGhlbHBlci5nZXROb2RlVmFsdWUoZGF0YSwgX3RoaXMsIHV1aWQpLnRoZW4oZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSlcclxufTtcclxuXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBXb3JrZmxvdzsiLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWxpdHknKTtcclxudmFyIG5vZGVWYWx1ZSA9IHJlcXVpcmUoJy4vbm9kZVZhbHVlJyk7XHJcbnZhciBmb3JtID0gcmVxdWlyZSgnLi9mb3JtJyk7XHJcbnZhciBoZWxwZXIgPSByZXF1aXJlKCcuL2hlbHBlcicpO1xyXG5cclxudmFyIGdhdGVrZWVwZXIgPSBuZXcgR0soKTtcclxuXHJcbi8qKlxyXG4gKiBBY3Rpb25zIE1vZHVsZVxyXG4gKlxyXG4gKiBAbW9kdWxlIGxpYi9hY3Rpb25zXHJcbiAqIEBhdXRob3IgSGFzYW4gQWJiYXNcclxuICogQHZlcnNpb24gMi4wLjBcclxuICogQGRlc2NyaXB0aW9uIHRlc3QgZGVzY3JpcHRpb25cclxuICogQGNvcHlyaWdodCBLd2FudHUgTHRkIFJTQSAyMDA5LTIwMTUuXHJcbiAqXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqICBGb3JtIE1vZHVsZSBhY3Rpb25zIG5lZWRzIHRvIGJlIG1vdmVkIGhlcmUuXHJcbiAqICBUaGlzIGFjdGlvbnMgbW9kdWxlIHdpbGwgYmUgY2VudGFsIHBsYWNlIHRvIGhvbGQgYWxsIGZ1bmN0aW9ucy5cclxuICogIFxyXG4gKi9cclxuXHJcbnZhciBjb21tdW5pdHkgPSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuXHJcbiAgICAgICAgY3JlYXRlQ29tbXVuaXR5OiBmdW5jdGlvbihfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5faWQgPSBnZW5lcmF0ZVVVSUQoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jcmVhdGVkRGF0ZVRpbWUgPSBuZXcgRGF0ZSgpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2VuZGVyVXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgdXVpZENvbW11bml0eSA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdDb21tdW5pdHknXS9faWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVDb21tdW5pdHlcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm5ld0NvbW11bml0eUlkXCI6IF9XRkluc3RhbmNlLnByb2ZpbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5kaWNhdG9yVVVJRFwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkNvbW11bml0eVwiOiB1dWlkQ29tbXVuaXR5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcclxuICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbih3b3JrZXJTdWNjZXNzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdXb3JrZXIgcHJvY2Vzc2VkIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHdvcmtlckZhaWwpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB1c2VySm9pbkNvbW11bml0eTogZnVuY3Rpb24oX2RlZiwgdXVpZCwgX1dGSW5zdGFuY2UpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbGVhc2VBZG9wdGVkQXBwbGljYXRpb246IGZ1bmN0aW9uKF9kZWYsIHV1aWQsIF9XRkluc3RhbmNlKSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IHdvcmtlci5nZXRXb3JrZXJXcmFwcGVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYXBwbGljYXRpb25JZCA9IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG5ldyBEYXRlKCkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZW5kZXJVc2VySWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZDtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdXVpZFJlbGVhc2VBZG9wdGVkQXBwbGljYXRpb24gPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnYWRvcHRlZEFwcGxpY2F0aW9uJ10vaW5zdGFuY2VzWzFdL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIFwicmVsZWFzZUFkb3B0ZWRBcHBsaWNhdGlvblwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tbXVuaXR5SWRcIjogX1dGSW5zdGFuY2UucHJvZmlsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbmRpY2F0b3JVVUlEXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWRvcHRlZEFwcGxpY2F0aW9uXCI6IHV1aWRSZWxlYXNlQWRvcHRlZEFwcGxpY2F0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcclxuICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbih3b3JrZXJTdWNjZXNzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdXb3JrZXIgcHJvY2Vzc2VzIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHdvcmtlckZhaWwpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0pKCk7XHJcblxyXG52YXIgYXBwbGljYXRpb24gPSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuXHJcbiAgICAgICAgY3JlYXRlQXBwRGVmaW5pdGlvbjogZnVuY3Rpb24oX2RlZiwgdXVpZCwgX1dGSW5zdGFuY2UpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY29tbXVuaXR5SWQgPSBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbmV3IERhdGUoKS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB1dWlkQXBwbGljYXRpb24gPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnQXBwbGljYXRpb24nXS9faWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVBcHBsaWNhdGlvblwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibmV3QXBwbGljYXRpb25JZFwiOiBfV0ZJbnN0YW5jZS5wcm9maWxlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImluZGljYXRvclVVSURcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBcHBsaWNhdGlvblwiOiB1dWlkQXBwbGljYXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uKHdvcmtlclN1Y2Nlc3MpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1dvcmtlciBwcm9jZXNzZXMgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24od29ya2VyRmFpbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh3b3JrZXJGYWlsKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYnVpbGRBcHBsaWNhdGlvbjogZnVuY3Rpb24oX2RlZiwgdXVpZCwgX1dGSW5zdGFuY2UpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY29tbXVuaXR5SWQgPSBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbmV3IERhdGUoKS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB1dWlkUHVibGlzaEFwcGxpY2F0aW9uID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ1B1Ymxpc2hBcHBsaWNhdGlvbiddL2luc3RhbmNlc1sxXS91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHV1aWRBcHBsaWNhdGlvbkRlZmluaXRpb24gPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnQXBwbGljYXRpb25EZWZpbml0aW9uJ10vX2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcbiAgICAgICAgICAgICAgICB2YXIgdXVpZFJvbGVzID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ1JvbGVzJ10vX2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcbiAgICAgICAgICAgICAgICB2YXIgdXVpZEFwcGxpY2F0aW9uID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ0FwcGxpY2F0aW9uJ10vX2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcbiAgICAgICAgICAgICAgICB2YXIgdXVpZEFwcFBlcm1pc3Npb25zID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ0FwcFBlcm1pc3Npb25zJ10vX2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICBcImJ1aWxkQXBwbGljYXRpb25cIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFwcGxpY2F0aW9uSWRcIjogX1dGSW5zdGFuY2UucHJvZmlsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbmRpY2F0b3JVVUlEXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUHVibGlzaEFwcGxpY2F0aW9uXCI6IHV1aWRQdWJsaXNoQXBwbGljYXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkFwcGxpY2F0aW9uRGVmaW5pdGlvblwiOiB1dWlkQXBwbGljYXRpb25EZWZpbml0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSb2xlc1wiOiB1dWlkUm9sZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkFwcGxpY2F0aW9uXCI6IHV1aWRBcHBsaWNhdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQXBwUGVybWlzc2lvbnNcIjogdXVpZEFwcFBlcm1pc3Npb25zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcclxuICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbih3b3JrZXJTdWNjZXNzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdXb3JrZXIgcHJvY2Vzc2VzIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHdvcmtlckZhaWwpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFwcGxpY2F0aW9uQWRvcHRpb246IGZ1bmN0aW9uKF9kZWYsIHV1aWQsIF9XRkluc3RhbmNlKSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IHdvcmtlci5nZXRXb3JrZXJXcmFwcGVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYXBwbGljYXRpb25JZCA9IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG5ldyBEYXRlKCkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZW5kZXJVc2VySWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZDtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdXVpZEFkb3B0aW9uID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ0Fkb3B0aW9uJ10vaW5zdGFuY2VzWzFdL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdXVpZFB1Ymxpc2hBcHBsaWNhdGlvbiA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdQdWJsaXNoQXBwbGljYXRpb24nXS9faWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICAgICAgICAgIHZhciB1dWlkQXBwbGljYXRpb24gPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnQXBwbGljYXRpb24nXS9faWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiYWRvcHRBcHBsaWNhdGlvblwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYXBwbGljYXRpb25JZFwiOiBfV0ZJbnN0YW5jZS5wcm9maWxlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImluZGljYXRvclVVSURcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBZG9wdGlvblwiOiB1dWlkQWRvcHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlB1Ymxpc2hBcHBsaWNhdGlvblwiOiB1dWlkUHVibGlzaEFwcGxpY2F0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBcHBsaWNhdGlvblwiOiB1dWlkQXBwbGljYXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uKHdvcmtlclN1Y2Nlc3MpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1dvcmtlciBwcm9jZXNzZXMgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24od29ya2VyRmFpbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh3b3JrZXJGYWlsKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY3JlYXRlVGF4b25vbXk6IGZ1bmN0aW9uKF9kZWYsIHV1aWQsIF9XRkluc3RhbmNlKSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IHdvcmtlci5nZXRXb3JrZXJXcmFwcGVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYXBwbGljYXRpb25JZCA9IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG5ldyBEYXRlKCkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZW5kZXJVc2VySWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZDtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdGF4b25vbXlVVUlEID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ1RheG9ub215J10vaW5zdGFuY2VzWzFdL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY3JlYXRlVGF4b25vbXlcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRheG9ub215VVVJRFwiOiB0YXhvbm9teVVVSURcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uKHdvcmtlclN1Y2Nlc3MpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1dvcmtlciBwcm9jZXNzZXMgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24od29ya2VyRmFpbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh3b3JrZXJGYWlsKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0pKCk7XHJcblxyXG52YXIgd29ya2VyID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHJldHVybiB7XHJcblxyXG4gICAgICAgIGdldFdvcmtlcldyYXBwZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHdyYXBwZXIgPSB7XHJcbiAgICAgICAgICAgICAgICBcInNvdXJjZVwiOiBcInJlbW90ZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwid29ya2VyT2JqZWN0XCIsXHJcbiAgICAgICAgICAgICAgICBcIl9pZFwiOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgXCJjaGFubmVsc1wiOiBbXSxcclxuICAgICAgICAgICAgICAgIFwiY29tbXVuaXR5SWRcIjogXCJcIixcclxuICAgICAgICAgICAgICAgIFwiYXBwbGljYXRpb25JZFwiOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBcIm1lc3NhZ2VUeXBlXCI6IFwiaW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgXCJjcmVhdGVkRGF0ZVRpbWVcIjogXCJcIixcclxuICAgICAgICAgICAgICAgIFwic2VuZGVyVXNlcklkXCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdGlmaWNhdGlvblwiOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwiYWN0aW9uXCI6IHtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHdyYXBwZXI7XHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2VuZDogZnVuY3Rpb24od29ya2VyT2JqZWN0KSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1N1Ym1pdHRpbmcgV29ya2VyIE9iamVjdCB0byBzZXJ2ZXInKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHdvcmtlck9iamVjdCk7XHJcbiAgICAgICAgICAgICAgICBkYW8uc2F2ZSh3b3JrZXJPYmplY3QpLmRvbmUoZnVuY3Rpb24od29ya2VyUmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHdvcmtlclJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgIH0pLmZhaWwoZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIHN1Ym1pdHRpbmcgd29ya2VyIHJlc3BvbnNlICEhJyArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59KSgpO1xyXG5cclxudmFyIHBlcmZvcm1hbmNlID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHJldHVybiB7XHJcblxyXG4gICAgICAgIGNyZWF0ZTogZnVuY3Rpb24oX2RlZiwgdXVpZCwgX1dGSW5zdGFuY2UpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY29tbXVuaXR5SWQgPSBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbmV3IERhdGUoKS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB1dWlkQ29tbXVuaXR5ID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ3BsYW4nXS9faWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVQbGFuXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwbGFuVVVJRFwiOiB1dWlkQ29tbXVuaXR5XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcclxuICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbih3b3JrZXJTdWNjZXNzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdXb3JrZXIgcHJvY2Vzc2VkIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHdvcmtlckZhaWwpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY29uZmlndXJlTm9kZTogZnVuY3Rpb24oX2RlZiwgdXVpZCwgX1dGSW5zdGFuY2UpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY29tbXVuaXR5SWQgPSBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbmV3IERhdGUoKS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB1dWlkTm9kZUluU3ViUHJvY2VzcyA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pbmRpY2F0b3JzW2lkIGVxICdub2RlJ10vaW5zdGFuY2VzWzFdL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29uZmlndXJlTm9kZVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibm9kZVVVSURcIjogdXVpZE5vZGVJblN1YlByb2Nlc3NcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uKHdvcmtlclN1Y2Nlc3MpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1dvcmtlciBwcm9jZXNzZWQgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24od29ya2VyRmFpbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh3b3JrZXJGYWlsKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHVubG9ja1BlcmlvZDogZnVuY3Rpb24oX2RlZiwgdXVpZCwgX1dGSW5zdGFuY2UpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgc3VicHJvY2Vzc09iamVjdCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBlbnRyeVVVSUQgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbaWQgZXEgJ1wiICsgUEVSSU9EX1NFVF9JRCArIFwiJ10vaW5zdGFuY2VzL3V1aWRcIiwgc3VicHJvY2Vzc09iamVjdCwge30pWzBdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGVuZGRhdGUgPSBzdWJwcm9jZXNzT2JqZWN0LmRhdGVzLnZhbGlkO1xyXG5cclxuICAgICAgICAgICAgICAgIGxpYnJhcnkudW5sb2NrUGVyaW9kKGVudHJ5VVVJRCwgZW5kZGF0ZSkudGhlbihmdW5jdGlvbihkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB1dWlkU2F2ZWRJbmRpY2F0b3IgPSBkYXRhLmlkO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBkYW8uZ2V0KHV1aWRTYXZlZEluZGljYXRvcikuZG9uZShmdW5jdGlvbihkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3IgPSBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzW2luZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRpY2F0b3IuX2lkID09IGRhdGEuX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnVW5sb2NrIHBlcmlvZC4nLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pLmZhaWwoZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxvY2tQZXJmb3JtYW5jZU1vZGVsOiBmdW5jdGlvbihfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBzdWJwcm9jZXNzT2JqZWN0ID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGVudHJ5VVVJRCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tpZCBlcSAnXCIgKyBQRVJGT1JNQU5DRV9TRVRfSUQgKyBcIiddL2luc3RhbmNlcy91dWlkXCIsIHN1YnByb2Nlc3NPYmplY3QsIHt9KVswXTtcclxuICAgICAgICAgICAgICAgIHZhciBlbmRkYXRlID0gc3VicHJvY2Vzc09iamVjdC5kYXRlcy52YWxpZDtcclxuXHJcbiAgICAgICAgICAgICAgICBsaWJyYXJ5LmxvY2tQZXJmb3JtYW5jZU1vZGVsKGVudHJ5VVVJRCwgZW5kZGF0ZSkudGhlbihmdW5jdGlvbihkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB1dWlkU2F2ZWRJbmRpY2F0b3IgPSBkYXRhLmlkO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBkYW8uZ2V0KHV1aWRTYXZlZEluZGljYXRvcikuZG9uZShmdW5jdGlvbihkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3IgPSBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzW2luZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRpY2F0b3IuX2lkID09IGRhdGEuX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnTG9jayBwZXJmb3JtYW5jZSBtb2RlbC4nLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pLmZhaWwoZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSkoKTtcclxuXHJcbnZhciBzZG8gPSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuXHJcbiAgICAgICAgY3JlYXRlOiBmdW5jdGlvbihfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5faWQgPSBnZW5lcmF0ZVVVSUQoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jcmVhdGVkRGF0ZVRpbWUgPSBuZXcgRGF0ZSgpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2VuZGVyVXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHNkb1VVSUQgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnU0RPJ10vaW5zdGFuY2VzWzFdL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY3JlYXRlU0RPXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzZG9VVUlEXCI6IHNkb1VVSURcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uKHdvcmtlclN1Y2Nlc3MpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1dvcmtlciBwcm9jZXNzZXMgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24od29ya2VyRmFpbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh3b3JrZXJGYWlsKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0pKCk7XHJcblxyXG52YXIgdGF4b25vbXkgPSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuXHJcbiAgICAgICAgY3JlYXRlOiBmdW5jdGlvbihfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5faWQgPSBnZW5lcmF0ZVVVSUQoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jcmVhdGVkRGF0ZVRpbWUgPSBuZXcgRGF0ZSgpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2VuZGVyVXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHRheG9ub215VVVJRCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pbmRpY2F0b3JzW2lkIGVxICdUYXhvbm9teSddL2luc3RhbmNlc1sxXS91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZVRheG9ub215XCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YXhvbm9teVVVSURcIjogdGF4b25vbXlVVUlEXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcclxuICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbih3b3JrZXJTdWNjZXNzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdXb3JrZXIgcHJvY2Vzc2VzIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHdvcmtlckZhaWwpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59KSgpO1xyXG5cclxudmFyIHN1YlByb2Nlc3NJbnN0YW5jZSA9IChmdW5jdGlvbigpIHtcclxuXHJcbiAgICByZXR1cm4ge1xyXG5cclxuICAgICAgICBzZXRUaXRsZTogZnVuY3Rpb24oX2RlZiwgdXVpZCwgZGF0YVZhbHVlLCBfV0ZJbnN0YW5jZSkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBzcFByb2Nlc3NPYmplY3QgPSBKU09OLnhwYXRoKFwiL2luc3RhbmNlL3Byb2Nlc3Nlcy9zdWJQcm9jZXNzZXNbdXVpZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBhcHAuU0NPUEUud29ya2Zsb3csIHt9KVswXTtcclxuICAgICAgICAgICAgICAgIHNwUHJvY2Vzc09iamVjdC5sYWJlbCA9IGRhdGFWYWx1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgaXRlbXNUb1Byb2Nlc3MgPSAxO1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0dWZmID0gW107XHJcbiAgICAgICAgICAgICAgICB2YXIgb2JqID0ge307XHJcblxyXG4gICAgICAgICAgICAgICAgb2JqLm1vZGVsID0gX1dGSW5zdGFuY2UuaW5zdGFuY2U7XHJcbiAgICAgICAgICAgICAgICBzdHVmZi5wdXNoKG9iaik7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnU3VicHJvY2VzcyBzZXRUaXRsZSBzdWNjZXNzLicsIF9XRkluc3RhbmNlLmluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzZXRWYWxpZERhdGU6IGZ1bmN0aW9uKF9kZWYsIHV1aWQsIGRhdGFWYWx1ZSwgX1dGSW5zdGFuY2UpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgc3BQcm9jZXNzT2JqZWN0ID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddXCIsIGFwcC5TQ09QRS53b3JrZmxvdywge30pWzBdO1xyXG4gICAgICAgICAgICAgICAgc3BQcm9jZXNzT2JqZWN0LmRhdGVzLnZhbGlkID0gZGF0YVZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBpdGVtc1RvUHJvY2VzcyA9IDE7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3R1ZmYgPSBbXTtcclxuICAgICAgICAgICAgICAgIHZhciBvYmogPSB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICBvYmoubW9kZWwgPSBzcFByb2Nlc3NPYmplY3Q7XHJcbiAgICAgICAgICAgICAgICBzdHVmZi5wdXNoKG9iaik7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ3ZhbGlkIGRhdGUgc2V0LicsIF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlcyk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0pKCk7XHJcblxyXG52YXIgdmFyaWFibGVzID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHJldHVybiB7XHJcblxyXG4gICAgICAgIHNldFZhcmlhYmxlOiBmdW5jdGlvbihzZXRWYXJpYWJsZSwgX1dGSW5zdGFuY2UsIHV1aWQpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBoZWxwZXIuZ2V0Tm9kZVZhbHVlKHNldFZhcmlhYmxlLmRhdGEsIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uKGRhdGFWYWx1ZSkge1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjb3BlID0gc2V0VmFyaWFibGUuc2NvcGU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhcmlhYmxlTmFtZSA9IHNldFZhcmlhYmxlLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhcmlhYmxlVHlwZSA9IHNldFZhcmlhYmxlLnZhcmlhYmxlVHlwZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbGlkRGF0ZSA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9kYXRlcy92YWxpZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHNjb3BlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3Byb2ZpbGUnOlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb2ZpbGVWYXJpYWJsZUZpbGVOYW1lID0gcHJvZmlsZUlkICsgJzp2YXJpYWJsZXMnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGFvLmdldChwcm9maWxlVmFyaWFibGVGaWxlTmFtZSkuZG9uZShmdW5jdGlvbihmaWxlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YXJpYWJsZVR5cGUgPT0gJ3BlcmlvZGljJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvY2Vzc09iaiA9IEpTT04ueHBhdGgoXCIvaW5zdGFuY2UvcHJvY2Vzc2VzW3N1YlByb2Nlc3Nlcy91dWlkIGVxICdcIiArIHV1aWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZXEgPSBwcm9jZXNzT2JqLnNlcTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9iaiA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3ViUHJvY2Vzc1VVSURcIjogdXVpZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlclwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VyTmFtZVwiOiBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJuYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlcklkXCI6IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlclByb2ZpbGVJZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VxXCI6IHNlcSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsaWREYXRlXCI6IHZhbGlkRGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZGF0YVZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZhbCgnZmlsZS4nICsgdmFyaWFibGVOYW1lICsgJy5wdXNoKG9iaiknKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZVt2YXJpYWJsZU5hbWVdID0gZGF0YVZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGFvLnVwc2VydChmaWxlKS5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShcIlZhcmlhYmxlIHNldCBzdWNjZXNzZnVsbHlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuZmFpbChmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJGYWlsZWQgdG8gc2V0IFZhcmlhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmZhaWwoZnVuY3Rpb24oZXJyb3IpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpbGUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiX2lkXCI6IHByb2ZpbGVWYXJpYWJsZUZpbGVOYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGUuY2hhbm5lbHMgPSBhcHAucHJvZmlsZS5jaGFubmVscztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhcmlhYmxlVHlwZSA9PSAncGVyaW9kaWMnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm9jZXNzT2JqID0gSlNPTi54cGF0aChcIi9pbnN0YW5jZS9wcm9jZXNzZXNbc3ViUHJvY2Vzc2VzL3V1aWQgZXEgJ1wiICsgdXVpZCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlcSA9IHByb2Nlc3NPYmouc2VxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlW3ZhcmlhYmxlTmFtZV0gPSBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJQcm9jZXNzVVVJRFwiOiB1dWlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VyXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVzZXJOYW1lXCI6IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VySWRcIjogTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VyUHJvZmlsZUlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZXFcIjogc2VxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWxpZERhdGVcIjogdmFsaWREYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBkYXRhVmFsdWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZVt2YXJpYWJsZU5hbWVdID0gZGF0YVZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGFvLnVwc2VydChmaWxlKS5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShcIlZhcmlhYmxlIHNldCBzdWNjZXNzZnVsbHlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuZmFpbChmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJGYWlsZWQgdG8gc2V0IFZhcmlhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzdWJQcm9jZXNzSW5zdGFuY2UnOlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoXCJub3QgaW1wbGVtZW50ZWRcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N0ZXAnOlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoXCJub3QgaW1wbGVtZW50ZWRcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiZ2V0Tm9kZVZhbHVlIHZhbHVlIG5vdCBmb3VuZC5cIik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59KSgpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gICAgY29tbXVuaXR5OiBjb21tdW5pdHksXHJcbiAgICBhcHBsaWNhdGlvbjogYXBwbGljYXRpb24sXHJcbiAgICBwZXJmb3JtYW5jZTogcGVyZm9ybWFuY2UsXHJcbiAgICB3b3JrZXI6IHdvcmtlcixcclxuICAgIHNkbzogc2RvLFxyXG4gICAgdGF4b25vbXk6IHRheG9ub215LFxyXG4gICAgc3ViUHJvY2Vzc0luc3RhbmNlOiBzdWJQcm9jZXNzSW5zdGFuY2UsXHJcbiAgICB2YXJpYWJsZXM6IHZhcmlhYmxlc1xyXG59IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy92YXIgZ2F0ZWtlZXBlciA9IHJlcXVpcmUoJy4uL2Jvd2VyX2NvbXBvbmVudHMvZ2F0ZWtlZXBlcicpO1xyXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWxpdHknKTtcclxuXHJcbi8vIHZhciB1dWlkID0gcmVxdWlyZSgnbm9kZS11dWlkJyk7XHJcblxyXG52YXIgZ2F0ZWtlZXBlciA9IG5ldyBHSygpO1xyXG5cclxuLyoqXHJcbiAqIEZvcm0gTW9kdWxlXHJcbiAqXHJcbiAqIEBtb2R1bGUgbGliL2Zvcm1cclxuICogQGF1dGhvciBCcmVudCBHb3Jkb25cclxuICogQHZlcnNpb24gMi4wLjBcclxuICogQGRlc2NyaXB0aW9uIHRlc3QgZGVzY3JpcHRpb25cclxuICogQGNvcHlyaWdodCBLd2FudHUgTHRkIFJTQSAyMDA5LTIwMTUuXHJcbiAqXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlKGFyZ3MpIHtcclxuXHJcbiAgICB2YXIgcHJvY2Vzc0lkID0gYXJnc1swXSB8fCAnJztcclxuXHJcbiAgICB2YXIgc3ViUHJvY2VzcyA9IGFyZ3NbMV0gfHwge307XHJcblxyXG4gICAgdmFyIHN0ZXAgPSBhcmdzWzJdIHx8IHt9O1xyXG5cclxuICAgIHZhciBhY3Rpb24gPSBhcmdzWzNdIHx8IHt9O1xyXG5cclxuICAgIHZhciBfV0ZJbnN0YW5jZSA9IGFyZ3NbNl0gfHwge307XHJcblxyXG4gICAgdmFyIGRhdGEgPSBhcmdzWzZdIHx8IHt9O1xyXG5cclxuICAgIHZhciBpbmRpY2F0b3JzID0gc3ViUHJvY2Vzcy5pbmRpY2F0b3JzIHx8IFtdO1xyXG5cclxuICAgIHZhciByZXN1bHQgPSBbXTtcclxuXHJcbiAgICB2YXIgaW5kaWNhdG9yVHlwZSA9IGFjdGlvbi5fdHlwZTtcclxuXHJcbiAgICB2YXIgcHJvY2Vzc1NlcSA9IGFyZ3NbNF0gfHwgJyc7XHJcblxyXG4gICAgdmFyIHN1YlByb2Nlc3NTZXEgPSBhcmdzWzVdIHx8ICcnO1xyXG5cclxuICAgIHZhciBjcmVhdGVUeXBlID0gYXJnc1s3XSB8fCAnJztcclxuXHJcbiAgICB2YXIgc3ViUHJvY2Vzc0lkID0gc3ViUHJvY2Vzcy5faWQ7XHJcblxyXG4gICAgdmFyIHV1aWQgPSBhcmdzWzhdIHx8ICcnO1xyXG5cclxuICAgIHZhciBiYXNlVVVJRCA9IGFyZ3NbOV0gfHwgJyc7XHJcblxyXG4gICAgdmFyIHByb2ZpbGUgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xyXG5cclxuICAgIHZhciBpbnB1dERhdGEgPSBhcmdzWzEwXSB8fCB7fTtcclxuXHJcbiAgICB2YXIgZm9ybUNyZWF0ZVR5cGUgPSBhY3Rpb24ubWV0aG9kLmZvcm0uY3JlYXRlO1xyXG5cclxuICAgIHZhciBmb3JtVHlwZSA9IGFjdGlvbi5tZXRob2QuZm9ybS50eXBlO1xyXG5cclxuICAgIHZhciBwYXJhbU9iamVjdCA9IHtcclxuXHJcbiAgICAgICAgXCJmb3JtQ3JlYXRlVHlwZVwiOiBmb3JtQ3JlYXRlVHlwZSxcclxuICAgICAgICBcImZvcm1UeXBlXCI6IGZvcm1UeXBlXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICB2YXIgdG9Qcm9jZXNzID0gaW5kaWNhdG9ycy5sZW5ndGg7XHJcblxyXG4gICAgICAgIHZhciBzdWJwcm9jZXNzVHlwZSA9IEpTT04ueHBhdGgoXCIvY29uZmlnL3Byb2Nlc3Nlcy9zdWJQcm9jZXNzZXNbX2lkIGVxICdcIiArIHN1YlByb2Nlc3NJZCArIFwiJ10vdHlwZVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG5cclxuICAgICAgICB2YXIgZm9ybUNyZWF0ZUZuID0gZnVuY3Rpb24oaW5kaWNhdG9yVHlwZSwgaW5kaWNhdG9ySWQsIHZhbGlkRGF0ZSwgaW5zdGFudGlhdGVTb3VyY2UpIHtcclxuXHJcbiAgICAgICAgICAgIGdhdGVrZWVwZXIuaW5zdGFudGlhdGUoYmFzZVVVSUQsIGluZGljYXRvclR5cGUsIGluZGljYXRvcklkLCBfV0ZJbnN0YW5jZS5wcm9maWxlLCB2YWxpZERhdGUsIHN1YnByb2Nlc3NUeXBlKS50aGVuKGZ1bmN0aW9uKGRvY0FycmF5KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGluZGljYXRvciB3b3JrZmxvdyBwcm9jZXNzZXMgc2VjdGlvblxyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZG9jQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgb2JqZWN0ID0gZG9jQXJyYXlbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvYmplY3QubW9kZWwuX2lkLmVuZHNXaXRoKCc6YXBwcm92ZWQnKSAmJiAhb2JqZWN0Lm1vZGVsLl9pZC5lbmRzV2l0aCgnOnJlamVjdGVkJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3b3JrZmxvd09iaiA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogX1dGSW5zdGFuY2UuY29uZmlnLl9pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5zdGFuY2VcIjogX1dGSW5zdGFuY2UuaW5zdGFuY2UuX2lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9jZXNzZXNcIjogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IHByb2Nlc3NJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN1YlByb2Nlc3NJZFwiOiBzdWJQcm9jZXNzLl9pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN1YlByb2Nlc3NVVUlEXCI6IHV1aWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdGVwXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBzdGVwLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlcVwiOiBzdGVwLnNlcSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdGFydERhdGVcIjogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdGF0dXNcIjogc3RlcC5zdGF0dXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBzdGVwLm1lc3NhZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXNzaWduZWRUb1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVzZXJJZFwiOiBzdGVwLmFzc2lnbmVkVG8udXNlcklkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IHN0ZXAuYXNzaWduZWRUby5uYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tbWVudFwiOiBzdGVwLmNvbW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tcGxldGVcIjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZW5kRGF0ZVwiOiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24uc2V0V29ya2Zsb3dMYWJlbEluVGl0bGUgIT0gdW5kZWZpbmVkICYmIGFjdGlvbi5zZXRXb3JrZmxvd0xhYmVsSW5UaXRsZSAhPSAnJyAmJiBhY3Rpb24uc2V0V29ya2Zsb3dMYWJlbEluVGl0bGUgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0Lm1vZGVsLnRpdGxlID0gaW5wdXREYXRhLmxhYmVsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uLnNldERyYWZ0ICE9IHVuZGVmaW5lZCAmJiBhY3Rpb24uc2V0RHJhZnQgIT0gJycgJiYgYWN0aW9uLnNldERyYWZ0ID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdC5tb2RlbC5jb250cm9sLmRyYWZ0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0Lm1vZGVsLndvcmtmbG93cy5wdXNoKHdvcmtmbG93T2JqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1haW5JZCA9IG9iamVjdC5tb2RlbC5faWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBlcnNpc3QgdmlhIGdrIHNvIHRoYXQgaXQgaXMgc2F2ZSBpbiBjb3VjaFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnYXRla2VlcGVyLnBlcnNpc3QoZG9jQXJyYXkpLnRoZW4oZnVuY3Rpb24oc2F2ZWRBcnJheSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy91c2luZyBzYW1lIGlkIGNhbGwgaW5pdGlhbGlzZURhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY2FsbCBjb2RlIHRvIHNldCB0byBzZXRJbnN0YW5jZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGFvLmdldChtYWluSWQpLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yTW9kZWwgPSBrby5tYXBwaW5nLmZyb21KUyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGVmYXVsdE1vZGVsXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2V0SWRcIjogaW5kaWNhdG9ySWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYXRla2VlcGVyLmluc3RhbnRpYXRlRGF0YShtYWluSWQsIGluc3RhbnRpYXRlU291cmNlLCBpbmRpY2F0b3JNb2RlbCwgZGF0YS5tb2RlbC5wZW5kaW5nLnNlcSwgcGFyYW1PYmplY3QpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVswXS5zdGF0dXMgPT0gXCIyMDBcIikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24uc2V0V29ya2Zsb3dMYWJlbEluRmllbGQgIT0gdW5kZWZpbmVkICYmIGFjdGlvbi5zZXRXb3JrZmxvd0xhYmVsSW5GaWVsZCAhPSAnJyAmJiBtYWluSWQgPT0gcHJvZmlsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGFbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXRoID0gXCJkYXRhWzBdLm1vZGVsLm1vZGVsLnBlbmRpbmcuZGF0YS5cIiArIGFjdGlvbi5zZXRXb3JrZmxvd0xhYmVsSW5GaWVsZCArIFwiPSdcIiArIGlucHV0RGF0YS5sYWJlbCArIFwiJ1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2YWwocGF0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2F0ZWtlZXBlci5wZXJzaXN0KGRhdGEpLnRoZW4oZnVuY3Rpb24oc2F2ZWRBcnJheSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhby5nZXQobWFpbklkKS5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9XRkluc3RhbmNlLmluZGljYXRvcnMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvUHJvY2Vzcy0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRvUHJvY2VzcyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gY3JlYXRlZCBzdWNjZXNzZnVsbHkuJywgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvdW5kID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yID0gX1dGSW5zdGFuY2UuaW5kaWNhdG9yc1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGljYXRvci5faWQgPT0gZGF0YS5faWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGN1cnJlbnQgaXRlbSBmcm9tIHRoZSBhcnJheSBhbmQgYWRkIHRoZSB1cGRhdGVkIHByb2Nlc3NNb2RlbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9Qcm9jZXNzLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b1Byb2Nlc3MgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gY3JlYXRlZCBzdWNjZXNzZnVsbHkuJywgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvdW5kID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5wdXNoKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b1Byb2Nlc3MtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9Qcm9jZXNzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gY3JlYXRlZCBzdWNjZXNzZnVsbHkuJywgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmZhaWwoZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZhaWx1cmUgPSB1dGlsLnN1Y2Nlc3MoJzEgR2F0ZWtlZXBlciBpbml0aWFsaXNhdGlvbiBmYWlsZWQgd2l0aCBpbml0aWFsaXNlRGF0YSBtZXNzYWdlICcgKyBlcnJbMF0ubWVzc2FnZSwge30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFpbHVyZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmYWlsdXJlID0gdXRpbC5zdWNjZXNzKCcyIEdhdGVrZWVwZXIgaW5pdGlhbGlzYXRpb24gZmFpbGVkIHdpdGggaW5pdGlhbGlzZURhdGEgbWVzc2FnZSAnICsgZXJyWzBdLm1lc3NhZ2UsIHt9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFpbHVyZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmFpbHVyZSA9IHV0aWwuc3VjY2VzcygnMyBHYXRla2VlcGVyIGluaXRpYWxpc2F0aW9uIGZhaWxlZCB3aXRoIGluaXRpYWxpc2VEYXRhIG1lc3NhZ2UgJyArIGVyclswXS5tZXNzYWdlLCB7fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFpbHVyZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmYWlsdXJlID0gdXRpbC5zdWNjZXNzKCc0IEdhdGVrZWVwZXIgaW5pdGlhbGlzYXRpb24gZmFpbGVkIHdpdGggaW5pdGlhbGlzZURhdGEgbWVzc2FnZSAnICsgZXJyWzBdLm1lc3NhZ2UsIHt9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGZhaWx1cmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmZhaWwoZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmYWlsdXJlID0gdXRpbC5zdWNjZXNzKCc1IEdhdGVrZWVwZXIgaW5pdGlhbGlzYXRpb24gZmFpbGVkIHdpdGggaW5pdGlhbGlzZURhdGEgbWVzc2FnZSAnICsgZXJyWzBdLm1lc3NhZ2UsIHt9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFpbHVyZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmYWlsdXJlID0gdXRpbC5zdWNjZXNzKCc2IEdhdGVrZWVwZXIgaW5pdGlhbGlzYXRpb24gZmFpbGVkIHdpdGggaW5pdGlhbGlzZURhdGEgbWVzc2FnZSAnICsgZXJyWzBdLm1lc3NhZ2UsIHt9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChmYWlsdXJlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB0b0FkZFByb2Nlc3MgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgX1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9XRkluc3RhbmNlLmluc3RhbmNlLnByb2Nlc3Nlc1tpXS5zdWJQcm9jZXNzZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b0FkZFByb2Nlc3MucHVzaChfV0ZJbnN0YW5jZS5pbnN0YW5jZS5wcm9jZXNzZXNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzID0gW107XHJcbiAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbnN0YW5jZS5wcm9jZXNzZXMgPSB0b0FkZFByb2Nlc3M7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHRvQWRkU3ViUHJvY2VzcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzW2ldLmluZGljYXRvcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b0FkZFN1YlByb2Nlc3MucHVzaChfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzID0gW107XHJcbiAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMgPSB0b0FkZFN1YlByb2Nlc3M7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGZhaWx1cmUgPSB1dGlsLnN1Y2Nlc3MoJzcgR2F0ZWtlZXBlciBpbml0aWFsaXNhdGlvbiBmYWlsZWQgd2l0aCBpbml0aWFsaXNlRGF0YSBtZXNzYWdlICcgKyBlcnJbMF0ubWVzc2FnZSwge30pO1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGZhaWx1cmUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2YXIgaW5zdGFudGlhdGVTb3VyY2UgPSBGUk9NX0RFRklOSVRJT047XHJcblxyXG4gICAgICAgIGZvciAodmFyIGNvdW50ZXIgPSAwOyBjb3VudGVyIDwgaW5kaWNhdG9ycy5sZW5ndGg7IGNvdW50ZXIrKykge1xyXG4gICAgICAgICAgICB2YXIgaW5kaWNhdG9ySWQgPSBpbmRpY2F0b3JzW2NvdW50ZXJdLl9pZDtcclxuICAgICAgICAgICAgdmFyIGluZGljYXRvck5hbWUgPSB1dGlsLmdldE5hbWUoaW5kaWNhdG9yc1tjb3VudGVyXS5uYW1lLCAnZW4nKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSBpbmRpY2F0b3JzW2NvdW50ZXJdLmluaXRpYXRlRGF0YTtcclxuXHJcbiAgICAgICAgICAgIHZhciBpbml0VHlwZSA9ICcnO1xyXG4gICAgICAgICAgICBpZiAoc3ViUHJvY2Vzcy5pbnN0YW5jZVR5cGUubmV3U2VxdWVuY2UgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpbml0VHlwZSA9IElOU1RBTkNFX1RZUEVfTkVXX1NFUTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdWJQcm9jZXNzLmluc3RhbmNlVHlwZS5uZXdJbnN0YW5jZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGluaXRUeXBlID0gSU5TVEFOQ0VfVFlQRV9ORVdfSU5TO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgaW5kaWNhdG9yRG9jID0ge307XHJcbiAgICAgICAgICAgIGlmIChiYXNlVVVJRCAhPSB1bmRlZmluZWQgJiYgYmFzZVVVSUQgIT0gJycgJiYgYmFzZVVVSUQubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBzcCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBiYXNlVVVJRCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICAgICAgICAgIHNwLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaW5zdGFudGlhdGVTb3VyY2UgPSBGUk9NX0FVVEhPUklTRUQ7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNhcmRpbmFsaXR5ID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW3NldElkIGVxICdcIiArIGluZGljYXRvcklkICsgXCInXS9jYXJkaW5hbGl0eVwiLCBhcHAuU0NPUEUuQVBQX0NPTkZJRywge30pWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpbml0VHlwZSA9PSBJTlNUQU5DRV9UWVBFX05FV19JTlMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhcmRpbmFsaXR5ID09IElORElDQVRPUl9DQVJESU5BTElUWV9TSU5HTEUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBleGlzdGluZ1VVSUQgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnXCIgKyBpbmRpY2F0b3JJZCArIFwiJ10vX2lkXCIsIF9XRkluc3RhbmNlLCB7fSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmdVVUlELmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbnRpYXRlU291cmNlID0gRlJPTV9BVVRIT1JJU0VEO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFudGlhdGVTb3VyY2UgPSBGUk9NX0RFRklOSVRJT047XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW50aWF0ZVNvdXJjZSA9IEZST01fREVGSU5JVElPTjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhcmRpbmFsaXR5ID09IElORElDQVRPUl9DQVJESU5BTElUWV9TSU5HTEUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBleGlzdGluZ1VVSUQgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnXCIgKyBpbmRpY2F0b3JJZCArIFwiJ10vX2lkXCIsIGFwcC5TQ09QRS53b3JrZmxvdywge30pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV4aXN0aW5nVVVJRC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW50aWF0ZVNvdXJjZSA9IEZST01fQVVUSE9SSVNFRDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbnRpYXRlU291cmNlID0gRlJPTV9ERUZJTklUSU9OO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGF0aCA9IFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnXCIgKyBpbmRpY2F0b3JJZCArIFwiJ10vX2lkXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWJwcm9jZXNzVHlwZSA9PSBQUk9DRVNTX1RZUEVfU1VCUFJPRklMRSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aCA9IFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnXCIgKyBpbmRpY2F0b3JJZCArIFwiJyBhbmQgX2lkID0gL3N1YnByb2Nlc3Nlc1tfaWQgPSAvaW5zdGFuY2UvcHJvY2Vzc2VzL3N1YlByb2Nlc3Nlc1tzdWJwcm9maWxlSWQgZXEgJ1wiICsgYXBwLnByb2ZpbGUuc3VicHJvZmlsZUlkICsgXCInXS91dWlkXS9pbmRpY2F0b3JzL2luc3RhbmNlcy91dWlkXS9faWRcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXhpc3RpbmdVVUlEID0gSlNPTi54cGF0aChwYXRoLCBhcHAuU0NPUEUud29ya2Zsb3csIHt9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChleGlzdGluZ1VVSUQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFudGlhdGVTb3VyY2UgPSBGUk9NX0FVVEhPUklTRUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW50aWF0ZVNvdXJjZSA9IEZST01fREVGSU5JVElPTjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9ybUNyZWF0ZUZuKGluaXRUeXBlLCBpbmRpY2F0b3JJZCwgJycsIGluc3RhbnRpYXRlU291cmNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBzZXRJbnN0YW5jZVRpdGxlKGFyZ3MpIHtcclxuXHJcbiAgICB2YXIgX1dGSW5zdGFuY2UgPSBhcmdzWzBdIHx8IHt9O1xyXG5cclxuICAgIHZhciB1dWlkID0gYXJnc1syXSB8fCAnJztcclxuICAgIHZhciBkYXRhID0gYXJnc1s0XSB8fCB7fTtcclxuXHJcbiAgICB2YXIgdGl0bGUgPSBkYXRhLmxhYmVsO1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgdmFyIHN1YlByb2Nlc3NJbnN0YW5jZSA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG4gICAgICAgIHZhciBpbmRpY2F0b3JJbnN0YW5jZXMgPSBzdWJQcm9jZXNzSW5zdGFuY2UuaW5kaWNhdG9ycztcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbmRpY2F0b3JJbnN0YW5jZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGluZGljYXRvclVVSUQgPSBpbmRpY2F0b3JJbnN0YW5jZXNbaV0uaW5zdGFuY2VzWzBdLnV1aWQ7XHJcbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JJbnN0YW5jZSA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tfaWQgZXEgJ1wiICsgaW5kaWNhdG9yVVVJRCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICAgICAgaW5kaWNhdG9ySW5zdGFuY2UudGl0bGUgPSBpbmRpY2F0b3JJbnN0YW5jZXNbaV0uaWQgKyAnICcgKyB0aXRsZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXNvbHZlKFwiU2V0IFRpdGxlIFN1Y2Nlc3NcIiwgaW5kaWNhdG9ySW5zdGFuY2VzKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbn07XHJcblxyXG5mdW5jdGlvbiBkZWxldGVQcm9maWxlKGFyZ3MpIHtcclxuXHJcbiAgICB2YXIgX1dGSW5zdGFuY2UgPSBhcmdzWzBdIHx8IHt9O1xyXG5cclxuICAgIHZhciBwcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IHtcclxuICAgICAgICAgICAgXCJzb3VyY2VcIjogXCJyZW1vdGVcIixcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwid29ya2VyT2JqZWN0XCIsXHJcbiAgICAgICAgICAgIFwiX2lkXCI6IGdlbmVyYXRlVVVJRCgpLFxyXG4gICAgICAgICAgICBcImNoYW5uZWxzXCI6IFtdLFxyXG4gICAgICAgICAgICBcImNvbW11bml0eUlkXCI6IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpLFxyXG4gICAgICAgICAgICBcImFwcGxpY2F0aW9uSWRcIjogYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQsXHJcbiAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIlwiLFxyXG4gICAgICAgICAgICBcIm1lc3NhZ2VUeXBlXCI6IFwiaW5mb1wiLFxyXG4gICAgICAgICAgICBcImNyZWF0ZWREYXRlVGltZVwiOiBtb21lbnQoKS5mb3JtYXQoKSxcclxuICAgICAgICAgICAgXCJzZW5kZXJVc2VySWRcIjogTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQsXHJcbiAgICAgICAgICAgIFwibm90aWZpY2F0aW9uXCI6IHtcclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicHJvZmlsZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjdGlvblwiOiBcImRlbGV0ZVByb2ZpbGVcIixcclxuICAgICAgICAgICAgICAgIFwicHJvZmlsZUlkXCI6IHByb2ZpbGVJZFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2cod29ya2VyT2JqZWN0KTtcclxuICAgICAgICBkYW8udXBzZXJ0KHdvcmtlck9iamVjdCkuZG9uZShmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV29ya2VyIE9iamVjdCBzdWJtaXR0ZWQgZm9yIHByb2ZpbGUoXCIgKyBwcm9maWxlSWQgKyBcIikgZGVsZXRpb24uXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICByZWplY3QoZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG59O1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlUHJvZmlsZShhcmdzKSB7XHJcblxyXG4gICAgdmFyIF9XRkluc3RhbmNlID0gYXJnc1sxXSB8fCB7fTtcclxuXHJcbiAgICB2YXIgY29tbXVuaXR5SWQgPSBfV0ZJbnN0YW5jZS5jb21tdW5pdHlJZDtcclxuICAgIHZhciBwcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgbGlicmFyeS5jcmVhdGVQcm9maWxlRG9jdW1lbnRzKGNvbW11bml0eUlkLCBwcm9maWxlSWQpLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gY3JlYXRlZCBzdWNjZXNzZnVsbHkuJywgZGF0YSk7XHJcbiAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcblxyXG4gICAgICAgIH0pLmZhaWwoZnVuY3Rpb24oZXJyKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgIHZhciBmYWlsdXJlID0gdXRpbC5zdWNjZXNzKCdFUlJPUjogUHJvZmlsZSBjcmVhdGlvbiBmYWlsZWQnICsgZXJyWzBdLm1lc3NhZ2UsIHt9KTtcclxuICAgICAgICAgICAgcmVqZWN0KGZhaWx1cmUpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIHNldERyYWZ0KGFyZ3MpIHtcclxuXHJcbiAgICB2YXIgX1dGSW5zdGFuY2UgPSBhcmdzWzBdIHx8IHt9O1xyXG5cclxuICAgIHZhciBjb21tdW5pdHlJZCA9IF9XRkluc3RhbmNlLmNvbW11bml0eUlkO1xyXG4gICAgdmFyIHByb2ZpbGVJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XHJcbiAgICB2YXIgdXVpZCA9IGFyZ3NbMl0gfHwgJyc7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICB2YXIgc3ViUHJvY2Vzc0luc3RhbmNlID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcbiAgICAgICAgdmFyIGluZGljYXRvckluc3RhbmNlcyA9IHN1YlByb2Nlc3NJbnN0YW5jZS5pbmRpY2F0b3JzO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluZGljYXRvckluc3RhbmNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgaW5kaWNhdG9yVVVJRCA9IGluZGljYXRvckluc3RhbmNlc1tpXS5pbnN0YW5jZXNbMF0udXVpZDtcclxuICAgICAgICAgICAgdmFyIGluZGljYXRvckluc3RhbmNlID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW19pZCBlcSAnXCIgKyBpbmRpY2F0b3JVVUlEICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG4gICAgICAgICAgICBpbmRpY2F0b3JJbnN0YW5jZS5jb250cm9sLmRyYWZ0ID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXNvbHZlKFwiU2V0IERyYWZ0IFN1Y2Nlc3NcIiwgaW5kaWNhdG9ySW5zdGFuY2VzKTtcclxuXHJcbiAgICB9KTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIHNldFVuRHJhZnQoYXJncykge1xyXG5cclxuICAgIHZhciBfV0ZJbnN0YW5jZSA9IGFyZ3NbMF0gfHwge307XHJcblxyXG4gICAgdmFyIGNvbW11bml0eUlkID0gX1dGSW5zdGFuY2UuY29tbXVuaXR5SWQ7XHJcbiAgICB2YXIgcHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcclxuICAgIHZhciB1dWlkID0gYXJnc1syXSB8fCAnJztcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgIHZhciBzdWJQcm9jZXNzSW5zdGFuY2UgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICB2YXIgaW5kaWNhdG9ySW5zdGFuY2VzID0gc3ViUHJvY2Vzc0luc3RhbmNlLmluZGljYXRvcnM7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5kaWNhdG9ySW5zdGFuY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JVVUlEID0gaW5kaWNhdG9ySW5zdGFuY2VzW2ldLmluc3RhbmNlc1swXS51dWlkO1xyXG4gICAgICAgICAgICB2YXIgaW5kaWNhdG9ySW5zdGFuY2UgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbX2lkIGVxICdcIiArIGluZGljYXRvclVVSUQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcbiAgICAgICAgICAgIGluZGljYXRvckluc3RhbmNlLmNvbnRyb2wuZHJhZnQgPSBmYWxzZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXNvbHZlKFwiU2V0IERyYWZ0IFN1Y2Nlc3NcIiwgaW5kaWNhdG9ySW5zdGFuY2VzKTtcclxuXHJcbiAgICB9KTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIHNhdmUoaW5kaWNhdG9yKSB7XHJcbiAgICB2YXIgY29tcGxldGVkID0gW107XHJcbiAgICB2YXIgcmVzdWx0ID0ge1xyXG4gICAgICAgIGNvbXBsZXRlOiB0cnVlLFxyXG4gICAgICAgIGRhdGE6IFtdXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnRm9ybSBpbmRpY2F0b3Igc2V0IHNhdmVkIHN1Y2Nlc3NmdWxseS4nLCByZXN1bHQpO1xyXG4gICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIHN1Ym1pdChmb3JtKSB7XHJcbiAgICB2YXIgY29tcGxldGVkID0gW107XHJcbiAgICB2YXIgcmVzdWx0ID0ge1xyXG4gICAgICAgIGNvbXBsZXRlOiB0cnVlLFxyXG4gICAgICAgIGRhdGE6IFtdXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnRm9ybSBzdWJtaXR0ZWQgc3VjY2Vzc2Z1bGx5LicsIHJlc3VsdCk7XHJcbiAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gYXV0aG9yaXNlKGZvcm0pIHtcclxuICAgIHZhciBjb21wbGV0ZWQgPSBbXTtcclxuICAgIHZhciByZXN1bHQgPSB7XHJcbiAgICAgICAgY29tcGxldGU6IHRydWUsXHJcbiAgICAgICAgZGF0YTogW11cclxuICAgIH07XHJcblxyXG4gICAgdmFyIHByb2Nlc3NJZCA9IGZvcm1bMF0gfHwgJyc7XHJcblxyXG4gICAgdmFyIHN1YlByb2Nlc3MgPSBmb3JtWzFdIHx8IHt9O1xyXG5cclxuICAgIHZhciBzdWJQcm9jZXNzSWQgPSBzdWJQcm9jZXNzLl9pZDtcclxuXHJcbiAgICB2YXIgcHJvY2Vzc1NlcSA9IGZvcm1bMl0gfHwgJyc7XHJcblxyXG4gICAgdmFyIHN1YlByb2Nlc3NTZXEgPSBmb3JtWzNdIHx8ICcnO1xyXG5cclxuICAgIHZhciBfV0ZJbnN0YW5jZSA9IGZvcm1bNF0gfHwge307XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICB2YXIgc3ViUHJvY2Vzc1VVSUQgPSBKU09OLnhwYXRoKFwiL3Byb2Nlc3Nlc1tpZCBlcSAnXCIgKyBwcm9jZXNzSWQgKyBcIicgYW5kIHNlcSBlcSAnXCIgKyBwcm9jZXNzU2VxICsgXCInXS9zdWJQcm9jZXNzZXNbaWQgZXEgJ1wiICsgc3ViUHJvY2Vzc0lkICsgXCInIGFuZCBzZXEgZXEgJ1wiICsgc3ViUHJvY2Vzc1NlcSArIFwiJ10vdXVpZFwiLCBfV0ZJbnN0YW5jZS5pbnN0YW5jZSwge30pWzBdO1xyXG4gICAgICAgIHZhciBzcEluZGljYXRvcnMgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3ViUHJvY2Vzc1VVSUQgKyBcIiddL2luZGljYXRvcnMvaW5zdGFuY2VzL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KTtcclxuICAgICAgICB2YXIgaXRlbXNUb1Byb2Nlc3MgPSBzcEluZGljYXRvcnMubGVuZ3RoO1xyXG4gICAgICAgIHZhciB1cGRhdGVkT2JqZWN0c0FycmF5ID0gW107XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXNUb1Byb2Nlc3M7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgZ2F0ZWtlZXBlci5hdXRob3Jpc2Uoc3BJbmRpY2F0b3JzW2ldKS50aGVuKGZ1bmN0aW9uKGF1dGhvcmlzZWRSZXR1cm4pIHtcclxuXHJcbiAgICAgICAgICAgICAgICBnYXRla2VlcGVyLnBlcnNpc3QoYXV0aG9yaXNlZFJldHVybikudGhlbihmdW5jdGlvbihzYXZlZEFycmF5KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB1dWlkU2F2ZWRJbmRpY2F0b3IgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IHNhdmVkQXJyYXkubGVuZ3RoOyBjKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzYXZlZEFycmF5W2NdLmlkLmVuZHNXaXRoKCc6YXBwcm92ZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXVpZFNhdmVkSW5kaWNhdG9yID0gc2F2ZWRBcnJheVtjXS5pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRhby5nZXQodXVpZFNhdmVkSW5kaWNhdG9yKS5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9XRkluc3RhbmNlLmluZGljYXRvcnMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zVG9Qcm9jZXNzLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbXNUb1Byb2Nlc3MgPT0gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnRm9ybSBhdXRob3Jpc2VkIHN1Y2Nlc3NmdWxseS4nLCB1cGRhdGVkT2JqZWN0c0FycmF5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3VuZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IF9XRkluc3RhbmNlLmluZGljYXRvcnMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvciA9IF9XRkluc3RhbmNlLmluZGljYXRvcnNbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRpY2F0b3IuX2lkID09IGRhdGEuX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBjdXJyZW50IGl0ZW0gZnJvbSB0aGUgYXJyYXkgYW5kIGFkZCB0aGUgdXBkYXRlZCBwcm9jZXNzTW9kZWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnB1c2goZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zVG9Qcm9jZXNzLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1RvUHJvY2VzcyA9PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gYXV0aG9yaXNlZCBzdWNjZXNzZnVsbHkuJywgdXBkYXRlZE9iamVjdHNBcnJheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvdW5kID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5wdXNoKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1RvUHJvY2Vzcy0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1RvUHJvY2VzcyA9PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnRm9ybSBhdXRob3Jpc2VkIHN1Y2Nlc3NmdWxseS4nLCB1cGRhdGVkT2JqZWN0c0FycmF5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtc1RvUHJvY2Vzcy0tO1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1zVG9Qcm9jZXNzID09IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gYXV0aG9yaXNlZCBzdWNjZXNzZnVsbHkuJywgdXBkYXRlZE9iamVjdHNBcnJheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBjbG9zZShmb3JtKSB7XHJcbiAgICB2YXIgY29tcGxldGVkID0gW107XHJcbiAgICB2YXIgcmVzdWx0ID0ge1xyXG4gICAgICAgIGNvbXBsZXRlOiB0cnVlLFxyXG4gICAgICAgIGRhdGE6IFtdXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnRm9ybSBjbG9zZWQgc3VjY2Vzc2Z1bGx5LicsIHJlc3VsdCk7XHJcbiAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gdXBkYXRlSW5kaWNhdG9yKGFyZ3MpIHtcclxuXHJcbiAgICB2YXIgX1dGSW5zdGFuY2UgPSBhcmdzWzBdIHx8IHt9O1xyXG5cclxuICAgIHZhciB1dWlkID0gYXJnc1sxXSB8fCAnJztcclxuICAgIHZhciBwYXRoID0gYXJnc1syXSB8fCAnJztcclxuICAgIHZhciBkYXRhVmFsdWUgPSBhcmdzWzNdIHx8ICcnO1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgdmFyIHN1YlByb2Nlc3NJbnN0YW5jZSA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG4gICAgICAgIHZhciBpbmRpY2F0b3JJbnN0YW5jZXMgPSBzdWJQcm9jZXNzSW5zdGFuY2UuaW5kaWNhdG9ycztcclxuICAgICAgICB2YXIgc2V0SWQgPSBwYXRoLnNwbGl0KFwiLlwiLCAxKVswXTtcclxuICAgICAgICB2YXIgaW5kaWNhdG9yVVVJRCA9IEpTT04ueHBhdGgoXCIvKltpZCBlcSAnXCIgKyBzZXRJZCArIFwiJ10vaW5zdGFuY2VzL3V1aWRcIiwgaW5kaWNhdG9ySW5zdGFuY2VzLCB7fSlbMF07XHJcbiAgICAgICAgdmFyIGluZE9iamVjdCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tfaWQgZXEgJ1wiICsgaW5kaWNhdG9yVVVJRCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICB2YXIgZXhwciA9ICdpbmRPYmplY3QubW9kZWwucGVuZGluZy5kYXRhLicgKyBwYXRoICsgJyA9IFwiJyArIGRhdGFWYWx1ZSArICdcIic7XHJcbiAgICAgICAgZXZhbChleHByKTtcclxuICAgICAgICB2YXIgaXRlbXNUb1Byb2Nlc3MgPSAxO1xyXG4gICAgICAgIHZhciBzdHVmZiA9IFtdO1xyXG4gICAgICAgIHZhciBvYmogPSB7fTtcclxuXHJcbiAgICAgICAgb2JqLm1vZGVsID0gaW5kT2JqZWN0O1xyXG4gICAgICAgIHN0dWZmLnB1c2gob2JqKTtcclxuXHJcbiAgICAgICAgZ2F0ZWtlZXBlci5wZXJzaXN0KHN0dWZmKS50aGVuKGZ1bmN0aW9uKHNhdmVkQXJyYXkpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB1dWlkU2F2ZWRJbmRpY2F0b3IgPSAnJztcclxuICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCBzYXZlZEFycmF5Lmxlbmd0aDsgYysrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNhdmVkQXJyYXlbY10uaWQuZW5kc1dpdGgoJzphcHByb3ZlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXVpZFNhdmVkSW5kaWNhdG9yID0gc2F2ZWRBcnJheVtjXS5pZDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRhby5nZXQodXVpZFNhdmVkSW5kaWNhdG9yKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNUb1Byb2Nlc3MtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zVG9Qcm9jZXNzID09IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnSW5kaWNhdG9yIHVwZGF0ZWQuJywgc3R1ZmYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm91bmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IF9XRkluc3RhbmNlLmluZGljYXRvcnMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yID0gX1dGSW5zdGFuY2UuaW5kaWNhdG9yc1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kaWNhdG9yLl9pZCA9PSBkYXRhLl9pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGN1cnJlbnQgaXRlbSBmcm9tIHRoZSBhcnJheSBhbmQgYWRkIHRoZSB1cGRhdGVkIHByb2Nlc3NNb2RlbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnB1c2goZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNUb1Byb2Nlc3MtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbXNUb1Byb2Nlc3MgPT0gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0luZGljYXRvciB1cGRhdGVkLicsIHN0dWZmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvdW5kID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnB1c2goZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNUb1Byb2Nlc3MtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1RvUHJvY2VzcyA9PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdJbmRpY2F0b3IgdXBkYXRlZC4nLCBzdHVmZik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pLmZhaWwoZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gbWFya1VwZGF0ZUluZGljYXRvcihhcmdzKSB7XHJcblxyXG4gICAgdmFyIF9XRkluc3RhbmNlID0gYXJnc1swXSB8fCB7fTtcclxuXHJcbiAgICB2YXIgdXVpZCA9IGFyZ3NbMV0gfHwgJyc7XHJcbiAgICB2YXIgc3RhdHVzID0gYXJnc1syXSB8fCAnJztcclxuICAgIHZhciBpbmRpY2F0b3JTZXRJZCA9IGFyZ3NbM10gfHwgJyc7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICB2YXIgaW5kT2JqZWN0ID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ1wiICsgaW5kaWNhdG9yU2V0SWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcbiAgICAgICAgaW5kT2JqZWN0Lm1vZGVsLnBlbmRpbmcuc3RhdHVzID0gc3RhdHVzO1xyXG5cclxuICAgICAgICB2YXIgaXRlbXNUb1Byb2Nlc3MgPSAxO1xyXG4gICAgICAgIHZhciBzdHVmZiA9IFtdO1xyXG4gICAgICAgIHZhciBvYmogPSB7fTtcclxuXHJcbiAgICAgICAgb2JqLm1vZGVsID0gaW5kT2JqZWN0O1xyXG4gICAgICAgIHN0dWZmLnB1c2gob2JqKTtcclxuXHJcbiAgICAgICAgLy8tLS0tLS0tLS0tXHJcbiAgICAgICAgZ2F0ZWtlZXBlci5wZXJzaXN0KHN0dWZmKS50aGVuKGZ1bmN0aW9uKHNhdmVkQXJyYXkpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB1dWlkU2F2ZWRJbmRpY2F0b3IgPSAnJztcclxuICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCBzYXZlZEFycmF5Lmxlbmd0aDsgYysrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNhdmVkQXJyYXlbY10uaWQuZW5kc1dpdGgoJzphcHByb3ZlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXVpZFNhdmVkSW5kaWNhdG9yID0gc2F2ZWRBcnJheVtjXS5pZDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRhby5nZXQodXVpZFNhdmVkSW5kaWNhdG9yKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNUb1Byb2Nlc3MtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zVG9Qcm9jZXNzID09IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnSW5kaWNhdG9yIHVwZGF0ZWQuJywgc3R1ZmYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm91bmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IF9XRkluc3RhbmNlLmluZGljYXRvcnMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yID0gX1dGSW5zdGFuY2UuaW5kaWNhdG9yc1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kaWNhdG9yLl9pZCA9PSBkYXRhLl9pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGN1cnJlbnQgaXRlbSBmcm9tIHRoZSBhcnJheSBhbmQgYWRkIHRoZSB1cGRhdGVkIHByb2Nlc3NNb2RlbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnB1c2goZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNUb1Byb2Nlc3MtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbXNUb1Byb2Nlc3MgPT0gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0luZGljYXRvciB1cGRhdGVkLicsIHN0dWZmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvdW5kID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnB1c2goZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNUb1Byb2Nlc3MtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1RvUHJvY2VzcyA9PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdJbmRpY2F0b3IgdXBkYXRlZC4nLCBzdHVmZik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pLmZhaWwoZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gICAgY3JlYXRlOiBjcmVhdGUsXHJcbiAgICBzYXZlOiBzYXZlLFxyXG4gICAgc3VibWl0OiBzdWJtaXQsXHJcbiAgICBhdXRob3Jpc2U6IGF1dGhvcmlzZSxcclxuICAgIGNsb3NlOiBjbG9zZSxcclxuICAgIHNldERyYWZ0OiBzZXREcmFmdCxcclxuICAgIHNldFVuRHJhZnQ6IHNldFVuRHJhZnQsXHJcbiAgICBjcmVhdGVQcm9maWxlOiBjcmVhdGVQcm9maWxlLFxyXG4gICAgc2V0SW5zdGFuY2VUaXRsZTogc2V0SW5zdGFuY2VUaXRsZSxcclxuICAgIGRlbGV0ZVByb2ZpbGU6IGRlbGV0ZVByb2ZpbGUsXHJcbiAgICB1cGRhdGVJbmRpY2F0b3I6IHVwZGF0ZUluZGljYXRvcixcclxuICAgIG1hcmtVcGRhdGVJbmRpY2F0b3I6IG1hcmtVcGRhdGVJbmRpY2F0b3JcclxuXHJcbn0iLCIndXNlIHN0cmljdCc7XHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0TGFuZ3VhZ2VNZXNzYWdlKG1lc3NhZ2UpIHtcclxuXHJcbiAgICB2YXIgbGFuZ3VhZ2UgPSBzZXJ2aWNlLmdldExhbmd1YWdlKCk7XHJcbiAgICB2YXIgcmVzID0gZXZhbChcIm1lc3NhZ2UuaTE4bi5cIiArIGxhbmd1YWdlKTtcclxuICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICByZXR1cm4gcmVzO1xyXG5cclxufTtcclxuXHJcbmZ1bmN0aW9uIGdldE5vZGVWYWx1ZShkYXRhLCBfV0ZJbnN0YW5jZSwgdXVpZCkge1xyXG5cclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG5cclxuICAgICAgICBpZiAoZGF0YS52YWx1ZSAhPSB1bmRlZmluZWQpIHtcclxuXHJcbiAgICAgICAgICAgIHJlamVjdChcIkVSUk9SOiBVbmltcGxlbWVudGVkIHZhbHVlIHR5cGUgZm91bmQuXCIpO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKGRhdGEuaW5kaWNhdG9yVVVJRCAhPSB1bmRlZmluZWQpIHtcclxuXHJcbiAgICAgICAgICAgIHJlamVjdChcIkVSUk9SOiBVbmltcGxlbWVudGVkIHZhbHVlIHR5cGUgZm91bmQuXCIpO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKGRhdGEuaW5kaWNhdG9yICE9IHVuZGVmaW5lZCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIGluZGljYXRvclVVSUQgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnXCIgKyBkYXRhLmluZGljYXRvci5pbmRpY2F0b3JTZXRJZCArIFwiJ10vaW5zdGFuY2VzL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICAgICAgdmFyIGluZE9iamVjdCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tfaWQgZXEgJ1wiICsgaW5kaWNhdG9yVVVJRCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICAgICAgdmFyIHhwYXRoID0gJy9tb2RlbC9wZW5kaW5nL2RhdGEvJyArIGRhdGEuaW5kaWNhdG9yLmluZGljYXRvclNldElkICsgJy8nICsgZGF0YS5pbmRpY2F0b3IuZWxlbWVudElkO1xyXG5cclxuICAgICAgICAgICAgdmFyIHNlcSA9IEpTT04ueHBhdGgoXCJjb3VudCgvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9wcmVjZWRpbmctc2libGluZzo6bm9kZSgpW2lkID0gL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaWRdKVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdICsgMTtcclxuICAgICAgICAgICAgdmFyIHN1YnByb2Nlc3NUeXBlID0gSlNPTi54cGF0aChcIi9jb25maWcvcHJvY2Vzc2VzL3N1YlByb2Nlc3Nlc1tfaWQgZXEgL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaWRdL3R5cGVcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzdWJwcm9jZXNzVHlwZSA9PSBQUk9DRVNTX1RZUEVfU1VCUFJPRklMRSkge1xyXG4gICAgICAgICAgICAgICAgc2VxID0gSlNPTi54cGF0aChcImNvdW50KC9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL3ByZWNlZGluZy1zaWJsaW5nOjpub2RlKClbaWQgPSAvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pZCBhbmQgaWQgPSAvc3VicHJvY2Vzc2VzW19pZCA9IC9pbnN0YW5jZS9wcm9jZXNzZXMvc3ViUHJvY2Vzc2VzW3N1YnByb2ZpbGVJZCBlcSAnXCIgKyBhcHAucHJvZmlsZS5zdWJwcm9maWxlSWQgKyBcIiddL3V1aWRdKVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdICsgMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHJlcGxhY2VkUGF0aCA9IHJlcGxhY2VBbGwoeHBhdGgsICcjU0VRVUVOQ0UjJywgc2VxKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB2YWxpZERhdGUgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vZGF0ZXMvdmFsaWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICAgICAgdmFyIGNvbmNhdFZhbGlkRGF0ZSA9IFwiJ1wiICsgdmFsaWREYXRlICsgXCInXCI7XHJcbiAgICAgICAgICAgIHZhciBuZXdQYXRoID0gcmVwbGFjZUFsbChyZXBsYWNlZFBhdGgsICcjRU5EX0RBVEUjJywgY29uY2F0VmFsaWREYXRlKTtcclxuXHJcbiAgICAgICAgICAgIHZhciByZXRWYWx1ZSA9IEpTT04ueHBhdGgobmV3UGF0aCwgaW5kT2JqZWN0LCB7fSlbMF07XHJcblxyXG4gICAgICAgICAgICByZXNvbHZlKHJldFZhbHVlKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhLnN5c3RlbSAhPSB1bmRlZmluZWQpIHtcclxuXHJcbiAgICAgICAgICAgIHJlc29sdmUoXCJFUlJPUjogVW5pbXBsZW1lbnRlZCBzeXN0ZW0gdHlwZSBmb3VuZC5cIik7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS52YXJpYWJsZSAhPSB1bmRlZmluZWQpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLnZhcmlhYmxlLnByb2ZpbGUgIT0gdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHZhcmlhYmxlTmFtZSA9IGRhdGEudmFyaWFibGUucHJvZmlsZTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcclxuICAgICAgICAgICAgICAgIHZhciBwcm9maWxlVmFyaWFibGVGaWxlTmFtZSA9IHByb2ZpbGVJZCArICc6dmFyaWFibGVzJztcclxuXHJcbiAgICAgICAgICAgICAgICBkYW8uZ2V0KHByb2ZpbGVWYXJpYWJsZUZpbGVOYW1lKS5kb25lKGZ1bmN0aW9uKGZpbGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9iaiA9IGV2YWwoJ2ZpbGUuJyArIHZhcmlhYmxlTmFtZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqID09ICdvYmplY3QnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VxID0gSlNPTi54cGF0aChcImNvdW50KC9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL3ByZWNlZGluZy1zaWJsaW5nOjpub2RlKClbaWQgPSAvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pZF0pXCIsIF9XRkluc3RhbmNlLCB7fSlbMF0gKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VicHJvY2Vzc1R5cGUgPSBKU09OLnhwYXRoKFwiL2NvbmZpZy9wcm9jZXNzZXMvc3ViUHJvY2Vzc2VzW19pZCBlcSAvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pZF0vdHlwZVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3VicHJvY2Vzc1R5cGUgPT0gUFJPQ0VTU19UWVBFX1NVQlBST0ZJTEUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcSA9IEpTT04ueHBhdGgoXCJjb3VudCgvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9wcmVjZWRpbmctc2libGluZzo6bm9kZSgpW2lkID0gL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaWQgYW5kIGlkID0gL3N1YnByb2Nlc3Nlc1tfaWQgPSAvaW5zdGFuY2UvcHJvY2Vzc2VzL3N1YlByb2Nlc3Nlc1tzdWJwcm9maWxlSWQgZXEgJ1wiICsgYXBwLnByb2ZpbGUuc3VicHJvZmlsZUlkICsgXCInXS91dWlkXSlcIiwgX1dGSW5zdGFuY2UsIHt9KVswXSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZVBhdGggPSBcIi9cIiArIHZhcmlhYmxlTmFtZSArIFwiW3NlcSBlcSAnXCIgKyBzZXEgKyBcIiddL3ZhbHVlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXRWYWx1ZSA9IEpTT04ueHBhdGgodmFsdWVQYXRoLCBmaWxlLCB7fSlbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmV0VmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvYmogPT0gJ3N0cmluZycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUob2JqKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pLmZhaWwoZnVuY3Rpb24oZXJyb3IpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiRVJST1I6IFByb2ZpbGUgdmFyaWFibGVzIG5vdCBmb3VuZFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoXCJFUlJPUjogVW5pbXBsZW1lbnRlZCBwcm9maWxlIHR5cGUgZm91bmQuXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcblxyXG5cclxufTtcclxuXHJcblxyXG5mdW5jdGlvbiByZXBsYWNlQWxsKHR4dCwgcmVwbGFjZSwgd2l0aF90aGlzKSB7XHJcbiAgICBpZiAodHlwZW9mIHR4dC5yZXBsYWNlICE9ICdmdW5jdGlvbicpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXBsYWNlICsgJyAnICsgd2l0aF90aGlzKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0eHQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHR4dC5yZXBsYWNlKG5ldyBSZWdFeHAocmVwbGFjZSwgJ2cnKSwgd2l0aF90aGlzKTtcclxufVxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cclxuICAgIGdldExhbmd1YWdlTWVzc2FnZTogZ2V0TGFuZ3VhZ2VNZXNzYWdlLFxyXG4gICAgZ2V0Tm9kZVZhbHVlOiBnZXROb2RlVmFsdWVcclxuXHJcbn0iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWxpdHknKTtcclxuXHJcbi8qKlxyXG4gKiBVc2VyIEludGVyZmFjZSBNb2R1bGVcclxuICpcclxuICogQG1vZHVsZSBsaWIvdWlcclxuICogQGF1dGhvciBCcmVudCBHb3Jkb25cclxuICogQHZlcnNpb24gMC4xLjBcclxuICogQGRlc2NyaXB0aW9uIHRlc3QgZGVzY3JpcHRpb25cclxuICpcclxuICovXHJcblxyXG4gLyoqXHJcbiAgKiBHZXQgYWxsIHByb2Nlc3Mgc3ViLXByb2Nlc3NlcyB1c2VyIGludGVyZmFjZSBkYXRhXHJcbiAgKlxyXG4gICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHByb2Nlc3MgaWRcclxuICAqIEBwYXJhbSB7c3RyaW5nfSBsYW5nIC0gdGhlIHVzZXIgcHJlZmZlcmVkIGxhbmdhdWdlXHJcbiAgKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxyXG4gICpcclxuICAqIEBleGFtcGxlICcnXHJcbiAgKlxyXG4gICogQHJldHVybiAnJ1xyXG4gICpcclxuICAqL1xyXG4gZnVuY3Rpb24gZ2V0UHJvY2Vzcyhwcm9jZXNzSWQsIGxhbmcsIF9XRkluc3RhbmNlKXtcclxuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICB2YXIgcHJvY2Vzc01vZGVsID0gW107XHJcbiAgICAgIHZhciBwcm9jZXNzSW5zdGFuY2UgPSBbXTtcclxuICAgIFx0X1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihwcm9jZXNzSXRlbSl7XHJcbiAgICBcdFx0aWYgKHByb2Nlc3NJdGVtLmlkID09IHByb2Nlc3NJZCkge1xyXG4gICAgXHRcdFx0cHJvY2Vzc0luc3RhbmNlID0gcHJvY2Vzc0l0ZW07XHJcbiAgICBcdFx0fVxyXG4gICAgXHR9KVxyXG4gICAgICAvLyBjb25zb2xlLmxvZyhwcm9jZXNzSW5zdGFuY2Uuc3ViUHJvY2Vzc2VzLmxlbmd0aCk7XHJcbiAgICAgIHV0aWwuc3luY0xvb3AocHJvY2Vzc0luc3RhbmNlLnN1YlByb2Nlc3Nlcy5sZW5ndGgsIGZ1bmN0aW9uKGxvb3Ape1xyXG4gIFx0XHRcdHZhciBjb3VudGVyID0gbG9vcC5pdGVyYXRpb24oKTtcclxuICAgICAgICB2YXIgcHJvY2Vzc1NlcSA9IHByb2Nlc3NJbnN0YW5jZS5zZXE7XHJcbiAgICAgICAgdmFyIHN1YlByb2Nlc3NJZCA9IHByb2Nlc3NJbnN0YW5jZS5zdWJQcm9jZXNzZXNbY291bnRlcl0uaWQ7XHJcbiAgICAgICAgdmFyIHN1YlByb2Nlc3NTZXEgPSBwcm9jZXNzSW5zdGFuY2Uuc3ViUHJvY2Vzc2VzW2NvdW50ZXJdLnNlcTtcclxuICAgICAgICBnZXRTdWJQcm9jZXNzKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBsYW5nLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihtb2RlbCl7XHJcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhtb2RlbCk7XHJcbiAgICAgICAgICBwcm9jZXNzTW9kZWwucHVzaChtb2RlbCk7XHJcbiAgICAgICAgICBsb29wLm5leHQoKTtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHByb2Nlc3NNb2RlbCk7XHJcbiAgXHRcdFx0fSwgZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHByb2Nlc3NNb2RlbCk7XHJcbiAgXHRcdFx0XHRsb29wLmJyZWFrKCk7XHJcbiAgXHRcdFx0XHRyZWplY3QoZXJyKTtcclxuICBcdFx0XHR9KTtcclxuICBcdFx0fSwgZnVuY3Rpb24oKXtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhwcm9jZXNzTW9kZWwpO1xyXG4gIFx0XHRcdHJlc29sdmUocHJvY2Vzc01vZGVsKTtcclxuICBcdFx0fSk7XHJcbiAgICB9IGNhdGNoKGVycil7XHJcbiAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgfVxyXG4gIH0pXHJcbn07XHJcblxyXG4gLyoqXHJcbiAgKiBHZXQgU3ViUHJvY2VzcyB1c2VyIGludGVyZmFjZSBkYXRhXHJcbiAgKlxyXG4gICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHByb2Nlc3MgaWRcclxuICAqIEBwYXJhbSB7bnVtYmVyfSBwcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHByb2Nlc3Mgc2VxXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gc3ViUHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3ViLXByb2Nlc3MgaWRcclxuICAqIEBwYXJhbSB7bnVtYmVyfSBzdWJQcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHN1Yi1wcm9jZXNzIHNlcVxyXG4gICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcclxuICAqXHJcbiAgKiBAZXhhbXBsZSAnJ1xyXG4gICpcclxuICAqIEByZXR1cm4gJydcclxuICAqXHJcbiAgKi9cclxuZnVuY3Rpb24gZ2V0U3ViUHJvY2Vzcyhwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgbGFuZywgX1dGSW5zdGFuY2Upe1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHZhciBtb2RlbCA9IHtcclxuICAgICAgICBpZDogJycsXHJcbiAgICAgICAgc2VxOiAnJyxcclxuICAgICAgICBuYW1lOiAnJyxcclxuICAgICAgICBoZWxwOiAnJyxcclxuICAgICAgICBkYXRlczogJycsXHJcbiAgICAgICAgc3RlcDogJydcclxuICAgICAgfTtcclxuICAgICAgdmFyIHN1YlByb2Nlc3MgPSBbXTtcclxuICAgIFx0dmFyIHN1YlByb2Nlc3NDb25mID0gW107XHJcbiAgICBcdF9XRkluc3RhbmNlLmluc3RhbmNlLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ocHJvY2Vzc0l0ZW0pe1xyXG4gICAgXHRcdGlmIChwcm9jZXNzSXRlbS5pZCA9PSBwcm9jZXNzSWQgJiYgcHJvY2Vzc0l0ZW0uc2VxID09IHByb2Nlc3NTZXEpIHtcclxuICAgIFx0XHRcdHZhciBzcExlbmd0aCA9IHByb2Nlc3NJdGVtLnN1YlByb2Nlc3Nlcy5sZW5ndGg7XHJcbiAgICBcdFx0XHRwcm9jZXNzSXRlbS5zdWJQcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHN1YlByb2Nlc3NJdGVtKXtcclxuICAgIFx0XHRcdFx0aWYgKHN1YlByb2Nlc3NJdGVtLmlkID09IHN1YlByb2Nlc3NJZCAmJiBzdWJQcm9jZXNzSXRlbS5zZXEgPT0gc3ViUHJvY2Vzc1NlcSAmJiBzdWJQcm9jZXNzSXRlbS5jb21wbGV0ZSA9PSBmYWxzZSkge1xyXG4gICAgXHRcdFx0XHRcdHN1YlByb2Nlc3MgPSBzdWJQcm9jZXNzSXRlbTtcclxuICAgIFx0XHRcdFx0fVxyXG4gICAgXHRcdFx0fSlcclxuICAgIFx0XHR9XHJcbiAgICBcdH0pXHJcbiAgICBcdC8vIEdldCB0aGUgY3VycmVudCBzdWJQcm9jZXNzIGNvbmZpZ3VyYXRpb25cclxuICAgIFx0X1dGSW5zdGFuY2UuY29uZmlnLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ocHJvY2Vzc0NvbmZpZyl7XHJcbiAgICBcdFx0aWYgKHByb2Nlc3NDb25maWcuX2lkID09IHByb2Nlc3NJZCkge1xyXG4gICAgXHRcdFx0cHJvY2Vzc0NvbmZpZy5zdWJQcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHN1YlByb2Nlc3NDb25maWcpe1xyXG4gICAgXHRcdFx0XHRpZiAoc3ViUHJvY2Vzc0NvbmZpZy5faWQgPT0gc3ViUHJvY2Vzc0lkKSB7XHJcbiAgICBcdFx0XHRcdFx0c3ViUHJvY2Vzc0NvbmYgPSBzdWJQcm9jZXNzQ29uZmlnO1xyXG4gICAgXHRcdFx0XHR9XHJcbiAgICBcdFx0XHR9KVxyXG4gICAgXHRcdH1cclxuICAgIFx0fSlcclxuICAgICAgLy8gVXBkYXRlIHRoZSBtb2RlbFxyXG4gICAgICBtb2RlbC5pZCA9IHN1YlByb2Nlc3NDb25mLl9pZDtcclxuICAgICAgbW9kZWwuc2VxID0gc3ViUHJvY2Vzcy5zZXE7XHJcbiAgICAgIG1vZGVsLm5hbWUgPSB1dGlsLmdldE5hbWUoc3ViUHJvY2Vzc0NvbmYubmFtZSwgbGFuZyk7XHJcbiAgICAgIG1vZGVsLmhlbHAgPSB1dGlsLmdldE5hbWUoc3ViUHJvY2Vzc0NvbmYuaGVscCwgbGFuZyk7XHJcbiAgICAgIG1vZGVsLmRhdGVzID0gc3ViUHJvY2Vzcy5kYXRlcztcclxuICAgICAgbW9kZWwuc3RlcCA9IHN1YlByb2Nlc3Muc3RlcDtcclxuICAgICAgcmVzb2x2ZShtb2RlbCk7XHJcbiAgICB9IGNhdGNoKGVycikge1xyXG4gICAgICByZWplY3QoZXJyKTtcclxuICAgIH1cclxuICB9KVxyXG59O1xyXG5cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gcHJlcGFyZU5vdGlmaWNhdGlvblNjcmVlbigpe1xyXG5cclxuICBcIlwiXHJcbn07XHJcblxyXG4gbW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gIGdldFByb2Nlc3M6IGdldFByb2Nlc3NcclxuXHJcbiB9XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcblxyXG5mdW5jdGlvbiBnZXQoKSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgIH0pO1xyXG5cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cclxuICAgIGdldDogZ2V0XHJcblxyXG59IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWxpdHknKTtcbnZhciBhY3Rpb25zTW9kdWxlID0gcmVxdWlyZSgnLi9hY3Rpb25zJyk7XG52YXIgaGVscGVyID0gcmVxdWlyZSgnLi9oZWxwZXInKTtcbnZhciBmb3JtID0gcmVxdWlyZSgnLi9mb3JtJyk7XG5cbi8qKlxuICogUHJvY2VzcyBNb2R1bGVcbiAqXG4gKiBAbW9kdWxlIGxpYi9wcm9jZXNzXG4gKiBAYXV0aG9yIEhhc2FuIEFiYmFzXG4gKiBAdmVyc2lvbiAwLjIuMVxuICogQGRlc2NyaXB0aW9uIFdvcmtmbG93IGltcGxlbWVudGF0aW9uIGNoYW5nZWQgYXMgcGVyIG5ldyBzY2hlbWEgaW1wbGVtZW50YXRpb25cbiAqXG4gKi9cblxuLyoqXG4gKiBDb3VudCBhbiBhcnJheSBvZiBpdGVtc1xuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciAtIHRoZSBhcnJheSBkYXRhXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiBjb3VudChhcnIpIHtcbiAgICBpZiAoYXJyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGFyci5sZW5ndGg7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG59O1xuXG4vKipcbiAqIFByb2Nlc3MgcHJlLXJlcXVpc2l0ZXNcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gcHJlcmVxdWlzaXRlcyAtIHRoZSBwcmUtcmVxdWlzaXRlcyBjb25maWcgZGF0YVxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuZnVuY3Rpb24gcHJlUmVxdWlzaXRlcyhwcmVyZXF1aXNpdGVzLCBfV0ZJbnN0YW5jZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgLy8gVW5jb21tZW50IGJlbG93IHNlY3Rpb24gd2hlbiByZWFkeSB0byBpbXBsZW1lbnRcbiAgICAgICAgdmFyIGNvbXBsZXRlZCA9IFtdO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdXRpbC5zeW5jTG9vcChwcmVyZXF1aXNpdGVzLmxlbmd0aCwgZnVuY3Rpb24obG9vcCkge1xuICAgICAgICAgICAgICAgIHZhciBjb3VudGVyID0gbG9vcC5pdGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICBwcmVSZXF1aXNpdGUocHJlcmVxdWlzaXRlc1tjb3VudGVyXSwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBhbGwgcHJlLXJlcXVpc2l0ZXMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS5cbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVkLnB1c2godHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGxvb3AubmV4dCgpO1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQucHVzaChmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGxvb3AuYnJlYWsoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29tcGxldGVkLmV2ZXJ5KEJvb2xlYW4pKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdQcmUtcmVxdWlzaXRlcyBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHt9KTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRlByZVJlcXVpc2l0ZUVycm9yJywgJ05vdCBhbGwgcHJlLXJlcXVpc2l0ZXMgcGFzc2VkLicpO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cblxuICAgIH0pO1xufTtcblxuLyoqXG4gKiBQcm9jZXNzIHByZS1yZXF1aXNpdGUsIGV4ZWN1dGUgdGhlIHByZS1yZXF1aXNpdGUgY29uZGl0aW9uLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBwcmVyZXF1aXNpdGUgLSB0aGUgcHJlLXJlcXVpc2l0ZSBjb25maWcgZGF0YVxuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXG4gKlxuICogQGV4YW1wbGVcbiAqIFByb2Nlc3MucHJlUmVxdWlzaXRlKGNvbmZpZywgY291bnRlciwgaW5zdGFuY2UsIGRvYyk7XG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuZnVuY3Rpb24gcHJlUmVxdWlzaXRlKHByZXJlcXVpc2l0ZSwgX1dGSW5zdGFuY2UpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgdmFyIHN1YmplY3RDb3VudCA9ICcnO1xuXG4gICAgICAgIGlmIChwcmVyZXF1aXNpdGUuY2hlY2subnVtYmVyUHJvY2Vzc0luc3RhbmNlcyAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgdmFyIG51bWJlclByb2Nlc3NJbnN0YW5jZXMgPSBwcmVyZXF1aXNpdGUuY2hlY2subnVtYmVyUHJvY2Vzc0luc3RhbmNlcztcbiAgICAgICAgICAgIHZhciBfZmlsdGVyT3BlcmF0b3IgPSBudW1iZXJQcm9jZXNzSW5zdGFuY2VzLm9wZXJhdG9yO1xuICAgICAgICAgICAgdmFyIHhwYXRoT3BlcmF0b3IgPSAnJztcbiAgICAgICAgICAgIHN3aXRjaCAoX2ZpbHRlck9wZXJhdG9yKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnZ3JlYXRlclRoYW4nOlxuICAgICAgICAgICAgICAgICAgICB4cGF0aE9wZXJhdG9yID0gJ2d0JztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbGVzc1RoYW4nOlxuICAgICAgICAgICAgICAgICAgICB4cGF0aE9wZXJhdG9yID0gJ2x0JztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZ3JlYXRlclRoYW5FcXVhbCc6XG4gICAgICAgICAgICAgICAgICAgIHhwYXRoT3BlcmF0b3IgPSAnZ2UnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdsZXNzVGhhbkVxdWFsJzpcbiAgICAgICAgICAgICAgICAgICAgeHBhdGhPcGVyYXRvciA9ICdsZSc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2VxdWFsVG8nOlxuICAgICAgICAgICAgICAgICAgICB4cGF0aE9wZXJhdG9yID0gJ2VxJztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbm90RXF1YWxUbyc6XG4gICAgICAgICAgICAgICAgICAgIHhwYXRoT3BlcmF0b3IgPSAnbmUnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIF9zdWJwcm9jZXNzSWQgPSBudW1iZXJQcm9jZXNzSW5zdGFuY2VzLnN1YlByb2Nlc3NJZDtcbiAgICAgICAgICAgIHZhciBfZmlsdGVyRWxlbWVudCA9IFwic3RlcC9zdGF0dXNcIjtcbiAgICAgICAgICAgIHZhciBfZmlsdGVyVmFsdWUgPSBudW1iZXJQcm9jZXNzSW5zdGFuY2VzLnR5cGU7XG4gICAgICAgICAgICB2YXIgaW5uZXJYcGF0aCA9IFwiL1wiICsgX2ZpbHRlckVsZW1lbnQgKyBcIlsuIGVxICdcIiArIF9maWx0ZXJWYWx1ZSArIFwiJ11cIjtcblxuICAgICAgICAgICAgdmFyIGZ1bGxQYXRoID0gXCJjb3VudCgvc3VicHJvY2Vzc2VzW2lkIGVxICdcIiArIF9zdWJwcm9jZXNzSWQgKyBcIiddXCIgKyBpbm5lclhwYXRoICsgXCIpXCI7XG5cbiAgICAgICAgICAgIHZhciBwcmVyZXFQcm9jZXNzVHlwZSA9IEpTT04ueHBhdGgoXCIvY29uZmlnL3Byb2Nlc3Nlcy9zdWJQcm9jZXNzZXNbX2lkIGVxICdcIiArIF9zdWJwcm9jZXNzSWQgKyBcIiddL3R5cGVcIiwgYXBwLlNDT1BFLndvcmtmbG93LCB7fSlbMF07XG4gICAgICAgICAgICBpZiAoYXBwLnByb2ZpbGUuc3VicHJvZmlsZUlkICE9IHVuZGVmaW5lZCAmJiBhcHAucHJvZmlsZS5zdWJwcm9maWxlSWQgIT0gJycgJiYgcHJlcmVxUHJvY2Vzc1R5cGUgIT0gdW5kZWZpbmVkICYmIHByZXJlcVByb2Nlc3NUeXBlID09IFBST0NFU1NfVFlQRV9TVUJQUk9GSUxFKSB7XG4gICAgICAgICAgICAgICAgZnVsbFBhdGggPSBcImNvdW50KC9zdWJwcm9jZXNzZXNbaWQgZXEgJ1wiICsgX3N1YnByb2Nlc3NJZCArIFwiJyBhbmQgX2lkID0gL2luc3RhbmNlL3Byb2Nlc3Nlcy9zdWJQcm9jZXNzZXNbc3VicHJvZmlsZUlkIGVxICdcIiArIGFwcC5wcm9maWxlLnN1YnByb2ZpbGVJZCArIFwiJ10vdXVpZF1cIiArIGlubmVyWHBhdGggKyBcIilcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3ViamVjdENvdW50ID0gSlNPTi54cGF0aChmdWxsUGF0aCwgX1dGSW5zdGFuY2UsIHt9KVswXTtcblxuXG5cbiAgICAgICAgfSBlbHNlIGlmIChwcmVyZXF1aXNpdGUuY2hlY2sudmFyaWFibGVDb25maXJtICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGUHJlUmVxdWlzaXRlRXJyb3InLCAnUHJlLXJlcXVpc2l0ZSB0eXBlIG5vdCBkZWZpbmVkLicpO1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGNvbXBhcmUgPSAnJztcbiAgICAgICAgdmFyIGNvdW50VmFsdWUgPSAnJztcblxuICAgICAgICAvLyBpZiAoc29tZSkge1xuICAgICAgICAvLyAgICAgY291bnRWYWx1ZSA9IFhYWDtcbiAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgLy8gICAgIGNvdW50VmFsdWUgPSBwcmVyZXF1aXNpdGUuY2hlY2subnVtYmVyUHJvY2Vzc0luc3RhbmNlcy5jb3VudDtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIGNvdW50VmFsdWUgPSBwcmVyZXF1aXNpdGUuY2hlY2subnVtYmVyUHJvY2Vzc0luc3RhbmNlcy5jb3VudDtcblxuICAgICAgICBwcmVyZXF1aXNpdGUuY2hlY2subnVtYmVyUHJvY2Vzc0luc3RhbmNlcy5jb3VudFxuICAgICAgICBpZiAocHJlcmVxdWlzaXRlLmNoZWNrLm51bWJlclByb2Nlc3NJbnN0YW5jZXMpIHtcbiAgICAgICAgICAgIGNvbXBhcmUgPSB1dGlsLmNvbXBhcmUoc3ViamVjdENvdW50LCBwcmVyZXF1aXNpdGUuY2hlY2subnVtYmVyUHJvY2Vzc0luc3RhbmNlcy5vcGVyYXRvciwgcGFyc2VJbnQoY291bnRWYWx1ZSkpO1xuICAgICAgICB9IGVsc2UgaWYgKHByZXJlcXVpc2l0ZS5jaGVjay52YXJpYWJsZUNvbmZpcm0pIHtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbXBhcmUpIHtcbiAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdQcmUtcmVxdWlzaXRlcyBwYXNzZWQuJywge30pO1xuICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBoZWxwZXIuZ2V0TGFuZ3VhZ2VNZXNzYWdlKHByZXJlcXVpc2l0ZS5tZXNzYWdlKTtcbiAgICAgICAgICAgIHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGUHJlUmVxdWlzaXRlRXJyb3InLCBtZXNzYWdlKTtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH1cblxuICAgIH0pO1xufTtcblxuLyoqXG4gKiBQcm9jZXNzIHByZS1hY3Rpb25zc1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBwcmVBY3Rpb25zIC0gdGhlIHByZS1hY3Rpb25zIGNvbmZpZyBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuZnVuY3Rpb24gcHJlQWN0aW9ucyhwcmVBY3Rpb25zLCBfV0ZJbnN0YW5jZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIGNvbXBsZXRlZCA9IFtdO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdXRpbC5zeW5jTG9vcChwcmVBY3Rpb25zLmxlbmd0aCwgZnVuY3Rpb24obG9vcCkge1xuICAgICAgICAgICAgICAgIHZhciBjb3VudGVyID0gbG9vcC5pdGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICBhY3Rpb24ocHJlQWN0aW9uc1tjb3VudGVyXSwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBhbGwgcHJlLXJlcXVpc2l0ZXMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS5cbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVkLnB1c2godHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGxvb3AubmV4dCgpO1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQucHVzaChmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGxvb3AuYnJlYWsoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29tcGxldGVkLmV2ZXJ5KEJvb2xlYW4pKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdQcmUtYWN0aW9ucyBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHt9KTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRlByZVJlcXVpc2l0ZUVycm9yJywgJ05vdCBhbGwgcHJlLWFjdGlvbnMgcGFzc2VkLicpO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cblxuICAgIH0pO1xufTtcblxuLyoqXG4gKiBXb3JrZmxvdyBnZXQgc3ViLXByb2Nlc3MgZGF0YS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gaWQgLSB0aGUgc3ViUHJvY2VzcyBjb25maWcgaWRcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXG4gKlxuICogQGV4YW1wbGUgXCJcIlxuICpcbiAqIEByZXR1cm4gXCJcIlxuICpcbiAqL1xuZnVuY3Rpb24gZ2V0U3ViUHJvY2VzcyhpZCwgX1dGSW5zdGFuY2UpIHtcbiAgICBpZiAoX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzID09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgfSBlbHNlIHtcbiAgICAgICAgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihzdWJQcm9jZXNzKSB7XG4gICAgICAgICAgICBpZiAoc3ViUHJvY2Vzcy5pZCA9PSBpZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdWJQcm9jZXNzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuICAgIH1cblxufTtcblxuLyoqXG4gKiBQcm9jZXNzIHN1Yi1wcm9jZXNzXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHByb2Nlc3MgLSB0aGUgY3VycmVudCBwcm9jZXNzIGlkIGFuZCBzZXFcbiAqIEBwYXJhbSB7b2JqZWN0fSBzdWJQcm9jZXNzIC0gdGhlIHN1Yi1wcm9jZXNzIGlkIGFuZCBzZXFcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIC0gdGhlIHVzZXIgaW5wdXQgZGF0YVxuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcbiAqXG4gKiBAZXhhbXBsZSAnJ1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cbmZ1bmN0aW9uIHN1YlByb2Nlc3MocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIGRhdGEsIF9XRkluc3RhbmNlKSB7XG4gICAgLy8gR2V0IHRoZSBjdXJyZW50IHByb2Nlc3Mgc3ViUHJvY2VzcyBpbnN0YW5jZVxuICAgIC8vIHZhciBzdWJQcm9jZXNzU2VxID0gMTtcbiAgICB2YXIgc3ViUHJvY2VzcyA9IFtdO1xuICAgIHZhciBwcm9jZXNzQ29uZiA9IFtdO1xuICAgIHZhciBzdWJQcm9jZXNzQ29uZiA9IFtdO1xuICAgIF9XRkluc3RhbmNlLmluc3RhbmNlLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqUHJvY2Vzcykge1xuICAgICAgICBpZiAob2JqUHJvY2Vzcy5pZCA9PSBwcm9jZXNzSWQgJiYgb2JqUHJvY2Vzcy5zZXEgPT0gcHJvY2Vzc1NlcSkge1xuICAgICAgICAgICAgdmFyIHNwTGVuZ3RoID0gb2JqUHJvY2Vzcy5zdWJQcm9jZXNzZXMubGVuZ3RoO1xuICAgICAgICAgICAgb2JqUHJvY2Vzcy5zdWJQcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKG9ialN1YlByb2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBpZiAob2JqU3ViUHJvY2Vzcy5pZCA9PSBzdWJQcm9jZXNzSWQgJiYgb2JqU3ViUHJvY2Vzcy5zZXEgPT0gc3ViUHJvY2Vzc1NlcSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdXVpZCA9IG9ialN1YlByb2Nlc3MudXVpZDtcbiAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihzdWJQcm9jZXNzSXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1YlByb2Nlc3NJdGVtLl9pZCA9PSB1dWlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2VzcyA9IHN1YlByb2Nlc3NJdGVtO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICB9KTtcbiAgICAvLyBHZXQgdGhlIGN1cnJlbnQgc3ViUHJvY2VzcyBjb25maWd1cmF0aW9uXG4gICAgX1dGSW5zdGFuY2UuY29uZmlnLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ocHJvY2Vzc0NvbmZpZykge1xuICAgICAgICBpZiAocHJvY2Vzc0NvbmZpZy5faWQgPT0gcHJvY2Vzc0lkKSB7XG4gICAgICAgICAgICBwcm9jZXNzQ29uZiA9IHByb2Nlc3NDb25maWc7XG4gICAgICAgICAgICBwcm9jZXNzQ29uZmlnLnN1YlByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24oc3ViUHJvY2Vzc0NvbmZpZykge1xuICAgICAgICAgICAgICAgIGlmIChzdWJQcm9jZXNzQ29uZmlnLl9pZCA9PSBzdWJQcm9jZXNzSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc0NvbmYgPSBzdWJQcm9jZXNzQ29uZmlnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICAvL1RPRE86IENoYW5nZSByZXF1aXJlZCB0byBtb3ZlIGlzQWN0aXZlIHRvIHN1YlByb2Nlc3MgZmlsZS5IZXJlXG4gICAgdmFyIGdyb3VwS2V5ID0gJyc7XG4gICAgdmFyIGJhc2VVVUlEID0gZGF0YS5iYXNlVVVJRDtcbiAgICBpZiAoYmFzZVVVSUQgIT0gdW5kZWZpbmVkICYmIGJhc2VVVUlEICE9ICcnICYmIGJhc2VVVUlELmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIHByZXZpb3VzT2JqZWN0ID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIGJhc2VVVUlEICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICBncm91cEtleSA9IHByZXZpb3VzT2JqZWN0Lmdyb3VwS2V5O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGdyb3VwS2V5ID0gZ2VuZXJhdGVVVUlEKCk7XG4gICAgfVxuXG4gICAgdmFyIHN1YlByb2Nlc3NPYmplY3RJZCA9IGdlbmVyYXRlVVVJRCgpO1xuICAgIHZhciBtb2RlbCA9IHtcbiAgICAgICAgX2lkOiBzdWJQcm9jZXNzT2JqZWN0SWQsXG4gICAgICAgIGlkOiBzdWJQcm9jZXNzSWQsXG4gICAgICAgIHR5cGU6ICd3b3JrZmxvd0luc3RhbmNlU3ViUHJvY2VzcycsXG4gICAgICAgIHNlcTogc3ViUHJvY2Vzc1NlcSxcbiAgICAgICAgaW5pdGlhdGVkOiBmYWxzZSxcbiAgICAgICAgZGF0ZXM6IHtcbiAgICAgICAgICAgIGNyZWF0ZWQ6ICcnLFxuICAgICAgICAgICAgdmFsaWQ6ICcnLFxuICAgICAgICAgICAgZHVlOiAnJyxcbiAgICAgICAgICAgIGNsb3NlZDogJydcbiAgICAgICAgfSxcbiAgICAgICAgY29tcGxldGU6IGZhbHNlLFxuICAgICAgICBpbmRpY2F0b3JzOiBbXSxcbiAgICAgICAgc3RlcDoge30sXG4gICAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgZ3JvdXBLZXk6IGdyb3VwS2V5LFxuICAgICAgICBjaGFubmVsczogW1xuICAgICAgICAgICAgXCJjb21tdW5pdHlfXCIgKyBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKSxcbiAgICAgICAgICAgIFwicHJvZmlsZV9cIiArIGFwcC5TQ09QRS5wcm9maWxlSWQsXG4gICAgICAgICAgICBcImFwcGxpY2F0aW9uX1wiICsgYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQsXG4gICAgICAgICAgICBcImNvbW11bml0eV9cIiArIGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpICsgXCJfYXBwbGljYXRpb25fXCIgKyBhcHAuU0NPUEUuYXBwbGljYXRpb25JZFxuICAgICAgICBdXG4gICAgfTtcblxuICAgIF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlcy5wdXNoKG1vZGVsKTtcbiAgICAvLyBSZXR1cm4gYSBwcm9taXNlXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAvLyBDYXRjaCBhbGwgdW5jYXVnaHQgZXJyb3JzXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyAxLiBQcm9jZXNzIHRoZSBwcmUtYWN0aW9uc1xuICAgICAgICAgICAgdmFyIHByZUFjdGlvbnNDb25mID0gcHJvY2Vzc0NvbmYucHJlQWN0aW9ucztcbiAgICAgICAgICAgIHByZUFjdGlvbnMocHJlQWN0aW9uc0NvbmYsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIC8vIDIuIFByb2Nlc3MgdGhlIHByZS1yZXF1aXNpdGVzXG4gICAgICAgICAgICAgICAgdmFyIHByZXJlcXVpc2l0ZUNvbmYgPSBwcm9jZXNzQ29uZi5wcmVyZXF1aXNpdGVzO1xuICAgICAgICAgICAgICAgIHByZVJlcXVpc2l0ZXMocHJlcmVxdWlzaXRlQ29uZiwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIDMuIEluaXRpYXRlIHRoZSBzdWJQcm9jZXNzXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbml0aWF0ZUNvbmYgPSBzdWJQcm9jZXNzQ29uZi5pbml0aWF0ZTtcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhdGUoaW5pdGlhdGVDb25mLCBzdWJQcm9jZXNzLCBkYXRhKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9VcGRhdGUgdGhlIHN1YlByb2Nlc3MgbW9kZWxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLmluaXRpYXRlZCA9IHJlc3VsdC5kYXRhLmluaXRpYXRlZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLmRhdGVzID0gcmVzdWx0LmRhdGEuZGF0ZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBFeGVjdXRlIHRoZSBmaXJzdCBzdGVwXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RlcElkID0gc3ViUHJvY2Vzc0NvbmYuc3RlcHNbMF0uX2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRyYW5zaXRpb25JZCA9IHN1YlByb2Nlc3NDb25mLnN0ZXBzWzBdLnRyYW5zaXRpb25bMF0uX2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0ZXBTZXEgPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcChwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3RlcElkLCBzdGVwU2VxLCBkYXRhLCBfV0ZJbnN0YW5jZSwgc3ViUHJvY2Vzc09iamVjdElkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5zdGVwID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGljYXRvcnMoc3ViUHJvY2Vzc0NvbmYuaW5kaWNhdG9ycywgX1dGSW5zdGFuY2UsIG1vZGVsLl9pZCkudGhlbihmdW5jdGlvbihyZXN1bHQxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5pbmRpY2F0b3JzID0gcmVzdWx0MS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRXhlY3V0ZSB0aGUgdHJhbnNpdGlvbnMsIGlmIGF1dG9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwb3N0QWN0aW9uc0NvbmYgPSBwcm9jZXNzQ29uZi5wb3N0QWN0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc3RBY3Rpb25zKHBvc3RBY3Rpb25zQ29uZiwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MocmVzdWx0Lm1lc3NhZ2UsIG1vZGVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMgPSBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhKG9iai5faWQgPT0gc3ViUHJvY2Vzc09iamVjdElkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLnN1YnByb2Nlc3NlcyA9IF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gIShvYmouX2lkID09IHN1YlByb2Nlc3NPYmplY3RJZCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzID0gX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEob2JqLl9pZCA9PSBzdWJQcm9jZXNzT2JqZWN0SWQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFByb2Nlc3MgaW5pdGlhdGVcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gaW5pdGlhdGUgLSB0aGUgaW5pdGlhdGUgY29uZmlnIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIC0gdGhlIHVzZXIgaW5wdXQgZGF0YVxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuZnVuY3Rpb24gaW5pdGlhdGUoaW5pdGlhdGUsIHN1YlByb2Nlc3MsIGRhdGEpIHtcbiAgICB2YXIgY29tcGxldGVkID0gW107XG4gICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgaW5pdGlhdGVkOiBmYWxzZSxcbiAgICAgICAgZGF0ZXM6IHtcbiAgICAgICAgICAgIGNyZWF0ZWQ6ICcnLFxuICAgICAgICAgICAgdmFsaWQ6ICcnLFxuICAgICAgICAgICAgZHVlOiAnJyxcbiAgICAgICAgICAgIGNsb3NlZDogJydcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgaWYgKGluaXRpYXRlLnVzZXIgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmRhdGVzLmNyZWF0ZWQgPSBkYXRhLmNyZWF0ZWREYXRlO1xuICAgICAgICAgICAgICAgIGlmIChpbml0aWF0ZS51c2VyLnZhbGlkRGF0ZS5fdHlwZSA9PSAndXNlclNlbGVjdGVkJyB8fCBpbml0aWF0ZS51c2VyLnZhbGlkRGF0ZS5fdHlwZSA9PSAnYXV0b1NlbGVjdGVkJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS52YWxpZERhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmRhdGVzLnZhbGlkID0gZGF0YS52YWxpZERhdGU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlsLndhcm4oJ1dGSW5pdGlhdGVFcnJvcicsICdObyB2YWxpZCBkYXRlIHBhc3NlZCBpbiAtIHtkYXRhLnZhbGlkRGF0ZX0nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGluaXRpYXRlLnVzZXIuZHVlRGF0ZS5fdHlwZSA9PSAndXNlclNlbGVjdGVkJyB8fCBpbml0aWF0ZS51c2VyLmR1ZURhdGUuX3R5cGUgPT0gJ2F1dG9TZWxlY3RlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuZHVlRGF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZGF0ZXMuZHVlID0gZGF0YS5kdWVEYXRlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC53YXJuKCdXRkluaXRpYXRlRXJyb3InLCAnTm8gZHVlIGRhdGUgcGFzc2VkIGluIC0ge2RhdGEuZHVlRGF0ZX0nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVzdWx0LmluaXRpYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1N1Yi1Qcm9jZXNzIGluaXRpYXRlIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGluaXRpYXRlLmF1dG8gIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgIHJlc3VsdC5kYXRlcy5jcmVhdGVkID0gZGF0YS5jcmVhdGVkRGF0ZTtcblxuICAgICAgICAgICAgICAgIGlmIChpbml0aWF0ZS5kYXRlcy52YWxpZC5fdHlwZSA9PSAndXNlclNlbGVjdGVkJyB8fCBpbml0aWF0ZS5kYXRlcy52YWxpZC5fdHlwZSA9PSAnYXV0b1NlbGVjdGVkJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS52YWxpZERhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmRhdGVzLnZhbGlkID0gZGF0YS52YWxpZERhdGU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlsLndhcm4oJ1dGSW5pdGlhdGVFcnJvcicsICdObyB2YWxpZCBkYXRlIHBhc3NlZCBpbiAtIHtkYXRhLnZhbGlkRGF0ZX0nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGluaXRpYXRlLmRhdGVzLmR1ZS5fdHlwZSA9PSAndXNlclNlbGVjdGVkJyB8fCBpbml0aWF0ZS5kYXRlcy5kdWUuX3R5cGUgPT0gJ2F1dG9TZWxlY3RlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuZHVlRGF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZGF0ZXMuZHVlID0gZGF0YS5kdWVEYXRlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC53YXJuKCdXRkluaXRpYXRlRXJyb3InLCAnTm8gZHVlIGRhdGUgcGFzc2VkIGluIC0ge2RhdGEuZHVlRGF0ZX0nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVzdWx0LmluaXRpYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1N1Yi1Qcm9jZXNzIGluaXRpYXRlIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpOyovXG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRkluaXRpYXRlRXJyb3InLCAnSW5pdGlhdGUgdHlwZTogJyArIGluaXRpYXRlLl90eXBlICsgJyBub3QgZGVmaW5lZC4nKTtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdWJQcm9jZXNzLmNvbXBsZXRlID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaW5pdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKCFzdWJQcm9jZXNzLmNvbXBsZXRlKSB7XG4gICAgICAgICAgICBpZiAoaW5pdGlhdGUucGFyYWxsZWxJbnN0YW5jZXMpIHtcbiAgICAgICAgICAgICAgICBpbml0KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGSW5pdGlhdGVFcnJvcicsICdTdWItcHJvY2VzczogJyArIHN1YlByb2Nlc3MuaWQgKyAnIHN0aWxsIGFjdGl2ZSBhbmQgcGFyYWxsZWwgaW5zdGFuY2VzIGFyZSBub3QgYWxsb3dlZC4nKTtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH0pO1xufTtcblxuLyoqXG4gKiBQcm9jZXNzIHN0ZXBcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIGN1cnJlbnQgcHJvY2VzcyBpZFxuICogQHBhcmFtIHtzdHJpbmd9IHN1YlByb2Nlc3NJZCAtIHRoZSBjdXJyZW50IHN1Yi1wcm9jZXNzIGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RlcElkIC0gdGhlIGN1cnJlbnQgc3ViLXByb2Nlc3Mgc3RlcCBpZFxuICogQHBhcmFtIHtudW1iZXJ9IHN0ZXBTZXEgLSB0aGUgY3VycmVudCBzdWItcHJvY2VzcyBzdGVwIGluc3RhbmNlIGNvdW50ZXIgLyBzZXF1ZW5jZVxuICogQHBhcmFtIHtvYmplY3R9IGRhdGEgLSB0aGUgdXNlciBpbnB1dCBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCBfV0ZJbnN0YW5jZSBjb25zdHJ1Y3RvciBpbnN0YW5jZVxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuZnVuY3Rpb24gc3RlcChwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3RlcElkLCBzdGVwU2VxLCBkYXRhLCBfV0ZJbnN0YW5jZSwgc3B1dWlkKSB7XG5cbiAgICAvLyBEZWZhdWx0IHN0ZXAgbW9kZWxcbiAgICB2YXIgbW9kZWwgPSB7XG4gICAgICAgIGlkOiAnJyxcbiAgICAgICAgc2VxOiAnJyxcbiAgICAgICAgc3RhdHVzOiAnJyxcbiAgICAgICAgbWVzc2FnZTogJycsXG4gICAgICAgIGFzc2lnbmVkVG86IHtcbiAgICAgICAgICAgIHVzZXJJZDogJycsXG4gICAgICAgICAgICBuYW1lOiAnJ1xuICAgICAgICB9LFxuICAgICAgICBhc3NpZ25tZW50OiB7fSxcbiAgICAgICAgY29tbWVudDogJydcbiAgICB9O1xuXG4gICAgdmFyIHN1YlByb2Nlc3MgPSB7fTtcblxuICAgIHZhciB1dWlkID0gJyc7XG4gICAgdmFyIGluc3RTdWJQcm9jZXNzO1xuICAgIHZhciBzdGVwID0ge307XG5cbiAgICB2YXIgdHJhbnNpdGlvbklkID0gJyc7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy9HZXQgdGhlIGN1cnJlbnQgc3ViUHJvY2VzcyBpbnN0YW5jZSBkYXRhXG4gICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbnN0YW5jZS5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKG9ialByb2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBpZiAob2JqUHJvY2Vzcy5pZCA9PSBwcm9jZXNzSWQgJiYgb2JqUHJvY2Vzcy5zZXEgPT0gcHJvY2Vzc1NlcSkge1xuICAgICAgICAgICAgICAgICAgICBvYmpQcm9jZXNzLnN1YlByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqU3ViUHJvY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9ialN1YlByb2Nlc3MuaWQgPT0gc3ViUHJvY2Vzc0lkICYmIG9ialN1YlByb2Nlc3Muc2VxID09IHN1YlByb2Nlc3NTZXEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dWlkID0gb2JqU3ViUHJvY2Vzcy51dWlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihzdWJQcm9jZXNzSXRlbSkge1xuICAgICAgICAgICAgICAgIGlmIChzdWJQcm9jZXNzSXRlbS5faWQgPT0gdXVpZCkge1xuICAgICAgICAgICAgICAgICAgICBpbnN0U3ViUHJvY2VzcyA9IHN1YlByb2Nlc3NJdGVtO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF9XRkluc3RhbmNlLmNvbmZpZy5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKG9ialByb2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBpZiAob2JqUHJvY2Vzcy5faWQgPT0gcHJvY2Vzc0lkKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ialByb2Nlc3Muc3ViUHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmpTdWJQcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqU3ViUHJvY2Vzcy5faWQgPT0gc3ViUHJvY2Vzc0lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2VzcyA9IG9ialN1YlByb2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqU3ViUHJvY2Vzcy5zdGVwcy5maWx0ZXIoZnVuY3Rpb24ob2JqU3RlcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqU3RlcC5faWQgPT0gc3RlcElkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwID0gb2JqU3RlcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIHN1Yi1wcm9jZXNzIHN0ZXAgZGF0YVxuICAgICAgICAgICAgbW9kZWwuaWQgPSBzdGVwSWQ7XG4gICAgICAgICAgICBtb2RlbC5zZXEgPSBzdGVwU2VxO1xuXG4gICAgICAgICAgICB2YXIgaW5zdGFuY2VTdGF0dXMgPSAnJztcbiAgICAgICAgICAgIGlmIChzdGVwLnNldEluc3RhbmNlU3RhdHVzVG8uTm90U3RhcnRlZCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVN0YXR1cyA9IFwiTm90U3RhcnRlZFwiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGVwLnNldEluc3RhbmNlU3RhdHVzVG8uQ3JlYXRlZCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVN0YXR1cyA9IFwiQ3JlYXRlZFwiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGVwLnNldEluc3RhbmNlU3RhdHVzVG8uSW5Qcm9ncmVzcyAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVN0YXR1cyA9IFwiSW5Qcm9ncmVzc1wiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGVwLnNldEluc3RhbmNlU3RhdHVzVG8uU3VibWl0dGVkICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlU3RhdHVzID0gXCJTdWJtaXR0ZWRcIjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RlcC5zZXRJbnN0YW5jZVN0YXR1c1RvLkNvbXBsZXRlICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlU3RhdHVzID0gXCJDb21wbGV0ZVwiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgbGFuZ3VhZ2UgPSBzZXJ2aWNlLmdldExhbmd1YWdlKCk7XG5cbiAgICAgICAgICAgIG1vZGVsLnN0YXR1cyA9IGluc3RhbmNlU3RhdHVzO1xuICAgICAgICAgICAgbW9kZWwubWVzc2FnZSA9IGV2YWwoXCJzdGVwLnNldEluc3RhbmNlU3RhdHVzVG8uXCIgKyBpbnN0YW5jZVN0YXR1cyArIFwiLmxhYmVsLmkxOG4uXCIgKyBsYW5ndWFnZSk7XG4gICAgICAgICAgICBtb2RlbC5jb21tZW50ID0gZGF0YS5jb21tZW50ICE9PSB1bmRlZmluZWQgPyBkYXRhLmNvbW1lbnQgOiAnJztcbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JzID0gaW5zdFN1YlByb2Nlc3MgIT09IHVuZGVmaW5lZCA/IGluc3RTdWJQcm9jZXNzLmluZGljYXRvcnMgOiBbXTtcbiAgICAgICAgICAgIGluZGljYXRvckRvY3MocHJvY2Vzc0lkLCBpbmRpY2F0b3JzLCBtb2RlbCwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgdXVpZCA9IHNwdXVpZDtcblxuICAgICAgICAgICAgICAgIGlmIChzdGVwLmZ1bmN0aW9uLmFjdGlvbnMgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbnMoc3RlcC5mdW5jdGlvbi5hY3Rpb25zLCBwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3ViUHJvY2VzcywgbW9kZWwsIF9XRkluc3RhbmNlLCBkYXRhLCBzcHV1aWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBFeGVjdXRlIHRoZSB0cmFuc2l0aW9ucywgaWYgYXV0b1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0cmFuc2l0aW9uSWQgPSBzdGVwLnRyYW5zaXRpb25bMF0uX2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb24ocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwgdHJhbnNpdGlvbklkLCBkYXRhLCBfV0ZJbnN0YW5jZSwgc3B1dWlkLCBtb2RlbCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1RyYW5zaXRpb24gY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCByZXN1bHQuZGF0YS5zdGVwKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRWxzZSB0YXNrcyBhcmUgc3ByZWNpZmllZCwgZXhlY3V0ZSB0aGVtXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdGVwLmZ1bmN0aW9uLnRhc2sgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE1ha2UgYXNzaWdubWVudHNcbiAgICAgICAgICAgICAgICAgICAgdGFzayhwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN0ZXAuZnVuY3Rpb24udGFzaywgc3B1dWlkLCBtb2RlbCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdUYXNrIGNvbXBsZXRlLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1Rhc2sgYXdhaXRpbmcgdXNlciBhY3Rpb24uJywgbW9kZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFByb2Nlc3MgaW5kaWNhdG9yIHVwZGF0ZXNcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gYWN0aW9ucyAtIHRoZSBhY3Rpb25zIGNvbmZpZyBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gc3ViUHJvY2VzcyAtIHRoZSBjdXJyZW50IHN1Yi1wcm9jZXNzIGZvcm0gY29uZmlnIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiBpbmRpY2F0b3JzKGluZGljYXRvcnMsIF9XRkluc3RhbmNlLCBzcHV1aWQpIHtcbiAgICB2YXIgbW9kZWwgPSBbXTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgYXJyYXkgPSBKU09OLnhwYXRoKFwiaW5kaWNhdG9yc1tmbjpjb3VudCguL3dvcmtmbG93cy9wcm9jZXNzZXNbc3ViUHJvY2Vzc1VVSUQgZXEgJ1wiICsgc3B1dWlkICsgXCInXSkgZ3QgMF1cIiwgX1dGSW5zdGFuY2UsIHt9KTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgYXJyYXkubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yID0gYXJyYXlbal07XG4gICAgICAgICAgICAgICAgdmFyIGluZGljYXRvck1vZGVsID0ge1xuICAgICAgICAgICAgICAgICAgICBpZDogJycsXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlczogW11cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgaW5zdGFuY2VNb2RlbCA9IHtcbiAgICAgICAgICAgICAgICAgICAgdXVpZDogJycsXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnJyxcbiAgICAgICAgICAgICAgICAgICAga2V5OiAnJyxcbiAgICAgICAgICAgICAgICAgICAgc2VxOiAxXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaW5kaWNhdG9yTW9kZWwuaWQgPSBpbmRpY2F0b3IuY2F0ZWdvcnkudGVybTtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZU1vZGVsLnV1aWQgPSBpbmRpY2F0b3IuX2lkO1xuICAgICAgICAgICAgICAgIGluc3RhbmNlTW9kZWwudGl0bGUgPSBpbmRpY2F0b3IudGl0bGU7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VNb2RlbC5rZXkgPSAnJztcbiAgICAgICAgICAgICAgICBpbnN0YW5jZU1vZGVsLnNlcSA9IGluZGljYXRvci5tb2RlbC5wZW5kaW5nLnNlcTsgLy8gaW5kaWNhdG9yIHNlcSBudW1iZXIgaGVyZSB3aGljaCBpcyBnZXR0aW5nIHVwZGF0ZWQuXG4gICAgICAgICAgICAgICAgaW5kaWNhdG9yTW9kZWwuaW5zdGFuY2VzLnB1c2goaW5zdGFuY2VNb2RlbCk7XG4gICAgICAgICAgICAgICAgbW9kZWwucHVzaChpbmRpY2F0b3JNb2RlbCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdQcm9jZXNzIGluZGljYXRvciBtb2RlbCB1cGRhdGVkLicsIG1vZGVsKTtcbiAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cblxuICAgIH0pXG59O1xuXG4vKipcbiAqIFByb2Nlc3MgYXNzaWduIHVzZXJcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gcHJvY2VzcyBpZFxuICogQHBhcmFtIHtudW1iZXJ9IHByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2UgcHJvY2VzcyBzZXFcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdWJQcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdWItcHJvY2VzcyBpZFxuICogQHBhcmFtIHtudW1iZXJ9IHN1YlByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2Ugc3ViLXByb2Nlc3Mgc2VxXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RlcElkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3RlcCBpZFxuICogQHBhcmFtIHtzdHJpbmd9IHRyYW5zaXRpb25JZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHRyYW5zaXRpb24gaWRcbiAqIEBwYXJhbSB7b2JqZWN0fSB1c2VyIC0gdGhlIHVzZXIgdG8gYXNzaWduIHRvXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuZnVuY3Rpb24gYXNzaWduVXNlcihwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgdXNlciwgX1dGSW5zdGFuY2UpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgdXVpZCA9ICcnO1xuICAgICAgICAgICAgLy8gR2V0IHRoZSBjdXJyZW50IHN1YlByb2Nlc3MgaW5zdGFuY2UgZGF0YVxuICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmpQcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9ialByb2Nlc3MuaWQgPT0gcHJvY2Vzc0lkICYmIG9ialByb2Nlc3Muc2VxID09IHByb2Nlc3NTZXEpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqUHJvY2Vzcy5zdWJQcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKG9ialN1YlByb2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmpTdWJQcm9jZXNzLmlkID09IHN1YlByb2Nlc3NJZCAmJiBvYmpTdWJQcm9jZXNzLnNlcSA9PSBzdWJQcm9jZXNzU2VxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXVpZCA9IG9ialN1YlByb2Nlc3MudXVpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihzdWJQcm9jZXNzSXRlbSkge1xuICAgICAgICAgICAgICAgIGlmIChzdWJQcm9jZXNzSXRlbS5faWQgPT0gdXVpZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBTZXQgdGhlIHVzZXIgZGV0YWlsc1xuICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzSXRlbS5zdGVwLmFzc2lnbmVkVG8udXNlcklkID0gdXNlci5pZDtcbiAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc0l0ZW0uc3RlcC5hc3NpZ25lZFRvLm5hbWUgPSB1c2VyLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgaW5kaWNhdG9ycyB1c2VyIGRldGFpbHNcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvcnMgPSBzdWJQcm9jZXNzSXRlbS5pbmRpY2F0b3JzO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluZGljYXRvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3IgPSBpbmRpY2F0b3JzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBpbmRpY2F0b3IuaW5zdGFuY2VzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gaW5kaWNhdG9yLmluc3RhbmNlc1tqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IF9XRkluc3RhbmNlLmluZGljYXRvcnMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRvYyA9IF9XRkluc3RhbmNlLmluZGljYXRvcnNba107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZS51dWlkID09IGRvYy5faWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvYy53b3JrZmxvd3MuZmlsdGVyKGZ1bmN0aW9uKHdvcmtmbG93KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdvcmtmbG93LmlkID09IF9XRkluc3RhbmNlLmNvbmZpZy5faWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd29ya2Zsb3cucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihwcm9jZXNzSXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb2Nlc3NJdGVtLmlkID09IHByb2Nlc3NJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgdXNlciBpZCBhbmQgbmFtZSBpbiB0aGUgZG9jdW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzSXRlbS5zdGVwLmFzc2lnbmVkVG8udXNlcklkID0gdXNlci5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzSXRlbS5zdGVwLmFzc2lnbmVkVG8ubmFtZSA9IHVzZXIubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdVc2VyIGFzc2lnbmVkIHN1Y2Nlc3NmdWxseS4gVXNlcklkOiBcIicgKyB1c2VyLmlkICsgJ1wiLCBOYW1lOiBcIicgKyB1c2VyLm5hbWUgKyAnXCInLCBzdWJQcm9jZXNzSXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG5cbiAgICB9KTtcbn07XG5cbi8qKlxuICogUHJvY2VzcyBpbmRpY2F0b3IgZG9jdW1lbnQgdXBkYXRlc1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBhY3Rpb25zIC0gdGhlIGFjdGlvbnMgY29uZmlnIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBzdWJQcm9jZXNzIC0gdGhlIGN1cnJlbnQgc3ViLXByb2Nlc3MgZm9ybSBjb25maWcgZGF0YVxuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcbiAqXG4gKiBAZXhhbXBsZSAnJ1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cbmZ1bmN0aW9uIGluZGljYXRvckRvY3MocHJvY2Vzc0lkLCBpbmRpY2F0b3JzLCBzdGVwLCBfV0ZJbnN0YW5jZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgaW5kaWNhdG9yIHNlY3Rpb25zIG9mIHRoZSBzdWJQcm9jZXNzXG4gICAgICAgICAgICBpZiAoaW5kaWNhdG9ycyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRkluZGljYXRvcnNVcGRhdGUnLCAnSW5kaWNhdG9ycyBwYXJhbWV0ZXIgaXMgcmVxdWlyZWQuIC0gVmFsdWU6ICcgKyBpbmRpY2F0b3JzKVxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluZGljYXRvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvciA9IGluZGljYXRvcnNbaV07XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaW5kaWNhdG9yLmluc3RhbmNlcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gaW5kaWNhdG9yLmluc3RhbmNlc1tqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkb2MgPSBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzW2tdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZS51dWlkID09IGRvYy5faWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jLndvcmtmbG93cy5maWx0ZXIoZnVuY3Rpb24od29ya2Zsb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3b3JrZmxvdy5pZCA9PSBfV0ZJbnN0YW5jZS5jb25maWcuX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd29ya2Zsb3cucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihwcm9jZXNzSXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvY2Vzc0l0ZW0uaWQgPT0gcHJvY2Vzc0lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzSXRlbS5zdGVwLmlkID0gc3RlcC5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NJdGVtLnN0ZXAuc2VxID0gc3RlcC5zZXE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzSXRlbS5zdGVwLnN0YXR1cyA9IHN0ZXAuc3RhdHVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0l0ZW0uc3RlcC5tZXNzYWdlID0gc3RlcC5tZXNzYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0l0ZW0uc3RlcC5hc3NpZ25lZFRvLnVzZXJJZCA9IHN0ZXAuYXNzaWduZWRUby51c2VySWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzSXRlbS5zdGVwLmFzc2lnbmVkVG8ubmFtZSA9IHN0ZXAuYXNzaWduZWRUby5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0l0ZW0uc3RlcC5jb21tZW50ID0gc3RlcC5jb21tZW50ICE9PSB1bmRlZmluZWQgPyBzdGVwLmNvbW1lbnQgOiAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdJbmRpY2F0b3IgZG9jdW1lbnRzIHdvcmtmbG93IHByb2Nlc3MgbW9kZWwgdXBkYXRlZC4nLCBfV0ZJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG5cbiAgICB9KVxufTtcblxuLyoqXG4gKiBQcm9jZXNzIGFjdGlvbnNcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gYWN0aW9ucyAtIHRoZSBhY3Rpb25zIGNvbmZpZyBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gc3ViUHJvY2VzcyAtIHRoZSBjdXJyZW50IHN1Yi1wcm9jZXNzIGZvcm0gY29uZmlnIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiBhY3Rpb25zKGFjdGlvbnMsIHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdWJQcm9jZXNzLCBzdGVwLCBfV0ZJbnN0YW5jZSwgZGF0YSwgdXVpZCkge1xuICAgIHZhciBhcnJBY3Rpb25zID0gW107XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB1dGlsLnN5bmNMb29wKGFjdGlvbnMubGVuZ3RoLCBmdW5jdGlvbihsb29wKSB7XG4gICAgICAgICAgICB2YXIgY291bnRlciA9IGxvb3AuaXRlcmF0aW9uKCk7XG4gICAgICAgICAgICBhY3Rpb24oYWN0aW9uc1tjb3VudGVyXSwgcHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN1YlByb2Nlc3MsIHN0ZXAsIF9XRkluc3RhbmNlLCBkYXRhLCB1dWlkKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmV0QWN0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGFjdGlvbnNbY291bnRlcl0uX2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VxOiBjb3VudGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogcmVzdWx0XG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgYXJyQWN0aW9ucy5wdXNoKHJldEFjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGxvb3AubmV4dCgpO1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICBsb29wLmJyZWFrKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdBY3Rpb25zIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywgYXJyQWN0aW9ucyk7XG4gICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5cbi8qKlxuICogUHJvY2VzcyBhY3Rpb25cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gYWN0aW9uIC0gdGhlIGFjdGlvbiBjb25maWcgZGF0YVxuICogQHBhcmFtIHtvYmplY3R9IHN1YlByb2Nlc3MgLSB0aGUgY3VycmVudCBzdWItcHJvY2VzcyBmb3JtIGNvbmZpZyBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuZnVuY3Rpb24gYWN0aW9uKGFjdGlvbiwgcHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN1YlByb2Nlc3MsIHN0ZXAsIF9XRkluc3RhbmNlLCBkYXRhLCB1dWlkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgIGlmIChhY3Rpb24ubWV0aG9kICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdmFyIG1ldGhvZFBvc3NpYmxlSXRlbXMgPSBbXCJmb3JtXCIsIFwiaW5kaWNhdG9yXCIsIFwicHJvZmlsZVwiLCBcInN1YlByb2Nlc3NJbnN0YW5jZVwiLCBcInN0ZXBcIiwgXCJjb21tdW5pdHlcIiwgXCJhcHBsaWNhdGlvblwiLCBcInVzZXJcIiwgXCJzZG9cIiwgXCJwZXJmb3JtYW5jZVwiLCBcInRheG9ub215XCIsIFwidmFyaWFibGVzXCJdO1xuICAgICAgICAgICAgc3dpdGNoIChwcm9wZXJ0eUV4aXN0cyhhY3Rpb24ubWV0aG9kLCBtZXRob2RQb3NzaWJsZUl0ZW1zKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2Zvcm0nOlxuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uLm1ldGhvZC5mb3JtLmNyZWF0ZSAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChwcm9jZXNzSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHN1YlByb2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHN0ZXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGFjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2gocHJvY2Vzc1NlcSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goc3ViUHJvY2Vzc1NlcSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChfV0ZJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YS5jcmVhdGVUeXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh1dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmJhc2VVVUlEKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5jcmVhdGUoYXJncykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24ubWV0aG9kLmZvcm0uYXV0aG9yaXNlICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHByb2Nlc3NJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goc3ViUHJvY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2gocHJvY2Vzc1NlcSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goc3ViUHJvY2Vzc1NlcSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goX1dGSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEuY3JlYXRlVHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2godXVpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YS5iYXNlVVVJRCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmF1dGhvcmlzZShhcmdzKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbi5tZXRob2QuZm9ybS51bmRyYWZ0ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChfV0ZJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YS5jcmVhdGVUeXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh1dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmJhc2VVVUlEKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uc2V0VW5EcmFmdChhcmdzKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbi5tZXRob2QuZm9ybS5kcmFmdCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goX1dGSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEuY3JlYXRlVHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2godXVpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YS5iYXNlVVVJRCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLnNldERyYWZ0KGFyZ3MpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uLm1ldGhvZC5mb3JtLmNsb3NlICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHN1YlByb2Nlc3MuaW5kaWNhdG9ycyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goX1dGSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEuY3JlYXRlVHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2godXVpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YS5iYXNlVVVJRCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmNsb3NlKGFyZ3MpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdpbmRpY2F0b3InOlxuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uLm1ldGhvZC5pbmRpY2F0b3IuY3JlYXRlICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uLm1ldGhvZC5pbmRpY2F0b3IuaW5zdGFudGlhdGUgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24ubWV0aG9kLmluZGljYXRvci5zZXRWYWx1ZSAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhdGggPSBhY3Rpb24ubWV0aG9kLmluZGljYXRvci5zZXRWYWx1ZS5wYXRoO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWxwZXIuZ2V0Tm9kZVZhbHVlKGFjdGlvbi5tZXRob2QuaW5kaWNhdG9yLnNldFZhbHVlLmRhdGEsIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uKGRhdGFWYWx1ZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goX1dGSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh1dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2gocGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGFWYWx1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLnVwZGF0ZUluZGljYXRvcihhcmdzKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbi5tZXRob2QuaW5kaWNhdG9yLnVwZGF0ZVN0YXR1cyAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvclNldElkID0gYWN0aW9uLm1ldGhvZC5pbmRpY2F0b3IuaW5kaWNhdG9yU2V0SWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKF9XRkluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh1dWlkKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGlvbi5tZXRob2QuaW5kaWNhdG9yLnVwZGF0ZVN0YXR1cyAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RhdHVzID0gYWN0aW9uLm1ldGhvZC5pbmRpY2F0b3IudXBkYXRlU3RhdHVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChzdGF0dXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChpbmRpY2F0b3JTZXRJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gS2VlcCBpbmRpY2F0b3IgZnVuY3Rpb25zIGluIGluZGlhdG9yIGZpbGUgaXN0ZWFkIG9mIGZvcm0gZmlsZS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLm1hcmtVcGRhdGVJbmRpY2F0b3IoYXJncykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoXCJBY3Rpb24gaW5kaWNhdG9yIHN1YiB0eXBlIG5vdCBmb3VuZC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3Byb2ZpbGUnOlxuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uLm1ldGhvZC5wcm9maWxlLmNyZWF0ZSAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChwcm9jZXNzSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKF9XRkluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmNyZWF0ZVR5cGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHV1aWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEuYmFzZVVVSUQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5jcmVhdGVQcm9maWxlKGFyZ3MpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uLm1ldGhvZC5wcm9maWxlLlggIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3N1YlByb2Nlc3NJbnN0YW5jZSc6XG4gICAgICAgICAgICAgICAgICAgIHZhciBzcFBvc3NpYmxlSXRlbXMgPSBbXCJpbnN0YW50aWF0ZVwiLCBcImF1dGhvcmlzZVwiLCBcImNsb3NlXCIsIFwic2V0VmFyaWFibGVcIiwgXCJzZXRTdGF0dXNUb1wiLCBcInNldFN0YXR1c01zZ1RvXCIsIFwic2V0VGl0bGVcIiwgXCJzZXRWYWxpZERhdGVcIl07XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocHJvcGVydHlFeGlzdHMoYWN0aW9uLm1ldGhvZC5zdWJQcm9jZXNzSW5zdGFuY2UsIHNwUG9zc2libGVJdGVtcykpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc2V0VGl0bGUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlbHBlci5nZXROb2RlVmFsdWUoYWN0aW9uLm1ldGhvZC5zdWJQcm9jZXNzSW5zdGFuY2Uuc2V0VGl0bGUsIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uKGRhdGFWYWx1ZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbnNNb2R1bGUuc3ViUHJvY2Vzc0luc3RhbmNlLnNldFRpdGxlKGFjdGlvbi5tZXRob2Quc3ViUHJvY2Vzc0luc3RhbmNlLnNldFRpdGxlLCB1dWlkLCBkYXRhVmFsdWUsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy91cGRhdGUgc3VicHJvY2VzcyBsYWJlbCBpbiB3b3JrZmxvdyBpbnN0YW5jZSBwcm9jZXNzIG9iamVjdDogVE9ET1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzZXRWYWxpZERhdGUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlbHBlci5nZXROb2RlVmFsdWUoYWN0aW9uLm1ldGhvZC5zdWJQcm9jZXNzSW5zdGFuY2Uuc2V0VmFsaWREYXRlLCBfV0ZJbnN0YW5jZSwgdXVpZCkudGhlbihmdW5jdGlvbihkYXRhVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uc01vZHVsZS5zdWJQcm9jZXNzSW5zdGFuY2Uuc2V0VmFsaWREYXRlKGFjdGlvbi5tZXRob2Quc3ViUHJvY2Vzc0luc3RhbmNlLnNldFZhbGlkRGF0ZSwgdXVpZCwgZGF0YVZhbHVlLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3VwZGF0ZSBzdWJwcm9jZXNzIGxhYmVsIGluIHdvcmtmbG93IGluc3RhbmNlIHByb2Nlc3Mgb2JqZWN0OiBUT0RPXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdCBpbiBzdWJwcm9jZXNzIGFjdGlvbi5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdzdGVwJzpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnY29tbXVuaXR5JzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbW11bml0eVBvc3NpYmxlSXRlbXMgPSBbXCJjcmVhdGVDb21tdW5pdHlcIiwgXCJyZWxlYXNlQWRvcHRlZEFwcGxpY2F0aW9uXCIsIFwidXNlckpvaW5Db21tdW5pdHlcIl07XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocHJvcGVydHlFeGlzdHMoYWN0aW9uLm1ldGhvZC5jb21tdW5pdHksIGNvbW11bml0eVBvc3NpYmxlSXRlbXMpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NyZWF0ZUNvbW11bml0eSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUuY29tbXVuaXR5LmNyZWF0ZUNvbW11bml0eShhY3Rpb24ubWV0aG9kLmNvbW11bml0eS5jcmVhdGVDb21tdW5pdHksIHV1aWQsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlbGVhc2VBZG9wdGVkQXBwbGljYXRpb24nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25zTW9kdWxlLmNvbW11bml0eS5yZWxlYXNlQWRvcHRlZEFwcGxpY2F0aW9uKGFjdGlvbi5tZXRob2QuY29tbXVuaXR5LnJlbGVhc2VBZG9wdGVkQXBwbGljYXRpb24sIHV1aWQsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3VzZXJKb2luQ29tbXVuaXR5JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5jb21tdW5pdHkudXNlckpvaW5Db21tdW5pdHkoYWN0aW9uLm1ldGhvZC5jb21tdW5pdHkudXNlckpvaW5Db21tdW5pdHksIHV1aWQsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdhcHBsaWNhdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIHZhciBhcHBsaWNhdGlvblBvc3NpYmxlSXRlbXMgPSBbXCJjcmVhdGVBcHBEZWZpbml0aW9uXCIsIFwiYnVpbGRBcHBsaWNhdGlvblwiLCBcImFwcGxpY2F0aW9uQWRvcHRpb25cIl07XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocHJvcGVydHlFeGlzdHMoYWN0aW9uLm1ldGhvZC5hcHBsaWNhdGlvbiwgYXBwbGljYXRpb25Qb3NzaWJsZUl0ZW1zKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjcmVhdGVBcHBEZWZpbml0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5hcHBsaWNhdGlvbi5jcmVhdGVBcHBEZWZpbml0aW9uKGFjdGlvbi5tZXRob2QuYXBwbGljYXRpb24uY3JlYXRlQXBwRGVmaW5pdGlvbiwgdXVpZCwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYnVpbGRBcHBsaWNhdGlvbic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUuYXBwbGljYXRpb24uYnVpbGRBcHBsaWNhdGlvbihhY3Rpb24ubWV0aG9kLmFwcGxpY2F0aW9uLmJ1aWxkQXBwbGljYXRpb24sIHV1aWQsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2FwcGxpY2F0aW9uQWRvcHRpb24nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25zTW9kdWxlLmFwcGxpY2F0aW9uLmFwcGxpY2F0aW9uQWRvcHRpb24oYWN0aW9uLm1ldGhvZC5hcHBsaWNhdGlvbi5hcHBsaWNhdGlvbkFkb3B0aW9uLCB1dWlkLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChcIk5vIG1ldGhvZCBmb3VuZCBmcm9tIGltcGxlbWVudGVkIGxpc3QuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICd1c2VyJzpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnc2RvJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNkb1Bvc3NpYmxlSXRlbXMgPSBbXCJjcmVhdGVcIl07XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocHJvcGVydHlFeGlzdHMoYWN0aW9uLm1ldGhvZC5zZG8sIHNkb1Bvc3NpYmxlSXRlbXMpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NyZWF0ZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUuc2RvLmNyZWF0ZShhY3Rpb24ubWV0aG9kLnNkby5jcmVhdGUsIHV1aWQsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3BlcmZvcm1hbmNlJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBlcmZvcm1hbmNlUG9zc2libGVJdGVtcyA9IFtcImNyZWF0ZVwiLCBcImNvbmZpZ3VyZU5vZGVcIiwgXCJ1bmxvY2tQZXJpb2RcIiwgXCJsb2NrUGVyZm9ybWFuY2VNb2RlbFwiXTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChwcm9wZXJ0eUV4aXN0cyhhY3Rpb24ubWV0aG9kLnBlcmZvcm1hbmNlLCBwZXJmb3JtYW5jZVBvc3NpYmxlSXRlbXMpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NyZWF0ZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUucGVyZm9ybWFuY2UuY3JlYXRlKGFjdGlvbi5tZXRob2QucGVyZm9ybWFuY2UuY3JlYXRlLCB1dWlkLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnY29uZmlndXJlTm9kZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUucGVyZm9ybWFuY2UuY29uZmlndXJlTm9kZShhY3Rpb24ubWV0aG9kLnBlcmZvcm1hbmNlLmNvbmZpZ3VyZU5vZGUsIHV1aWQsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd1bmxvY2tQZXJpb2QnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25zTW9kdWxlLnBlcmZvcm1hbmNlLnVubG9ja1BlcmlvZChhY3Rpb24ubWV0aG9kLnBlcmZvcm1hbmNlLnVubG9ja1BlcmlvZCwgdXVpZCwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2xvY2tQZXJmb3JtYW5jZU1vZGVsJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5wZXJmb3JtYW5jZS5sb2NrUGVyZm9ybWFuY2VNb2RlbChhY3Rpb24ubWV0aG9kLnBlcmZvcm1hbmNlLmxvY2tQZXJmb3JtYW5jZU1vZGVsLCB1dWlkLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3RheG9ub215JzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRheG9ub215UG9zc2libGVJdGVtcyA9IFtcImNyZWF0ZVwiXTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChwcm9wZXJ0eUV4aXN0cyhhY3Rpb24ubWV0aG9kLnRheG9ub215LCB0YXhvbm9teVBvc3NpYmxlSXRlbXMpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NyZWF0ZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUudGF4b25vbXkuY3JlYXRlKGFjdGlvbi5tZXRob2QudGF4b25vbXkuY3JlYXRlLCB1dWlkLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChcIk5vIG1ldGhvZCBmb3VuZCBmcm9tIGltcGxlbWVudGVkIGxpc3QuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAndmFyaWFibGVzJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhcmlhYmxlc1Bvc3NpYmxlSXRlbXMgPSBbXCJzZXRWYXJpYWJsZVwiXTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChwcm9wZXJ0eUV4aXN0cyhhY3Rpb24ubWV0aG9kLnZhcmlhYmxlcywgdmFyaWFibGVzUG9zc2libGVJdGVtcykpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc2V0VmFyaWFibGUnOlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUudmFyaWFibGVzLnNldFZhcmlhYmxlKGFjdGlvbi5tZXRob2QudmFyaWFibGVzLnNldFZhcmlhYmxlLCBfV0ZJbnN0YW5jZSwgdXVpZCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChcIk5vIG1ldGhvZCBmb3VuZCBmcm9tIGltcGxlbWVudGVkIGxpc3QuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJtZXRob2Qgbm90IGRlZmluZWQgaW4gY29uZmlndXJhdGlvblwiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChcIk5vIG1ldGhvZCBmb3VuZCBmcm9tIGltcGxlbWVudGVkIGxpc3QuXCIpO1xuXG4gICAgICAgIH1cblxuICAgIH0pO1xufTtcblxuLyoqXG4gKiBQcm9jZXNzIHRhc2tzXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHRhc2sgLSB0aGUgdGFzayBjb25maWcgZGF0YVxuICogQHBhcmFtIHtvYmplY3R9IGlucHV0RGF0YSAtIHRoZSB1c2VyIGlucHV0IGRhdGFcbiAqXG4gKiBAZXhhbXBsZSAnJ1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cbmZ1bmN0aW9uIHRhc2soc3VicHJvY2Vzc0lELCBzdWJwcm9jZXNzU0VRLCB0YXNrLCBzcHV1aWQsIG1vZGVsKSB7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciBsaXN0ID0gW107XG4gICAgICAgIGlmICh0YXNrLmFzc2lnbi5yb2xlICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdmFyIGFzc2lnblR5cGUgPSAncHJvZmlsZVJvbGUnO1xuICAgICAgICAgICAgdmFyIHByb2ZpbGVJZCA9IGFwcC5TQ09QRS53b3JrZmxvdy5wcm9maWxlO1xuICAgICAgICAgICAgdmFyIGlkID0gJyc7XG4gICAgICAgICAgICBpZiAodGFzay5hc3NpZ24ucm9sZS5wcm9maWxlID09ICdjdXJyZW50Jykge1xuICAgICAgICAgICAgICAgIGlkID0gYXBwLlNDT1BFLndvcmtmbG93LnByb2ZpbGU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhc2suYXNzaWduLnJvbGUucHJvZmlsZSA9PSAnY29tbXVuaXR5Jykge1xuICAgICAgICAgICAgICAgIGlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciByb2xlID0gdGFzay5hc3NpZ24ucm9sZS5yb2xlSWQ7XG5cbiAgICAgICAgICAgIGxpYnJhcnkuZ2V0VXNlcnNMaXN0QnlSb2xlKGlkLCByb2xlKS50aGVuKGZ1bmN0aW9uKGxpc3QpIHtcbiAgICAgICAgICAgICAgICBpZiAobGlzdCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3QubGVuZ3RoID4gMSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXNzaWdubWVudCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhc2suYXNzaWduLmFzc2lnbm1lbnQgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXNzaWdubWVudCA9IG1vZGVsLmFzc2lnbm1lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjY2VwdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaG93XCI6IHRhc2suYXNzaWduLmFzc2lnbm1lbnQuYWNjZXB0LnNob3csXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogX2dldE5hbWVCeUxhbmcodGFzay5hc3NpZ24uYXNzaWdubWVudC5hY2NlcHQubGFiZWwuaTE4bilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5hY2NlcHQgPSBhY2NlcHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5tZXNzYWdlID0gX2dldE5hbWVCeUxhbmcodGFzay5hc3NpZ24uYXNzaWdubWVudC5tZXNzYWdlLmkxOG4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWplY3QgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2hvd1wiOiB0YXNrLmFzc2lnbi5hc3NpZ25tZW50LnJlamVjdC5zaG93LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IF9nZXROYW1lQnlMYW5nKHRhc2suYXNzaWduLmFzc2lnbm1lbnQucmVqZWN0LmxhYmVsLmkxOG4pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQucmVqZWN0ID0gcmVqZWN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxlSWRcIjogcHJvZmlsZUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJvbGVJZFwiOiByb2xlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJyb2xlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQucHJvZmlsZVJvbGVJZCA9IGlkO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoJ05vdGlmaWNhdGlvbnMgcmVxdWVzdCBzdWJtaXR0ZWQgZm9yIGFjY2VwdGFuY2UuJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsaXN0Lmxlbmd0aCA9PSAxKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1c2VySWQgPSBsaXN0WzBdLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVzZXJuYW1lID0gbGlzdFswXS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFzc2lnbmVlID0gbW9kZWwuYXNzaWduZWRUbztcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVlLm5hbWUgPSB1c2VybmFtZSArIFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25lZS51c2VySWQgPSB1c2VySWQgKyBcIlwiO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXNzaWdubWVudCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhc2suYXNzaWduLmFzc2lnbm1lbnQgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXNzaWdubWVudCA9IG1vZGVsLmFzc2lnbm1lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjY2VwdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaG93XCI6IHRhc2suYXNzaWduLmFzc2lnbm1lbnQuYWNjZXB0LnNob3csXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogX2dldE5hbWVCeUxhbmcodGFzay5hc3NpZ24uYXNzaWdubWVudC5hY2NlcHQubGFiZWwuaTE4bilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5hY2NlcHQgPSBhY2NlcHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5tZXNzYWdlID0gX2dldE5hbWVCeUxhbmcodGFzay5hc3NpZ24uYXNzaWdubWVudC5tZXNzYWdlLmkxOG4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWplY3QgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2hvd1wiOiB0YXNrLmFzc2lnbi5hc3NpZ25tZW50LnJlamVjdC5zaG93LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IF9nZXROYW1lQnlMYW5nKHRhc2suYXNzaWduLmFzc2lnbm1lbnQucmVqZWN0LmxhYmVsLmkxOG4pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQucmVqZWN0ID0gcmVqZWN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxlSWRcIjogcHJvZmlsZUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJvbGVJZFwiOiByb2xlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJyb2xlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQucHJvZmlsZVJvbGVJZCA9IGlkO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoJ0Fzc2lnbmVkIHRvIHRoZSBvbmx5IHVzZXIgaW4gcm9sZS4nKTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXNzaWduZWUgPSBtb2RlbC5hc3NpZ25lZFRvO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduZWUubmFtZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25lZS51c2VySWQgPSBcIlwiO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXNzaWdubWVudCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhc2suYXNzaWduLmFzc2lnbm1lbnQgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXNzaWdubWVudCA9IG1vZGVsLmFzc2lnbm1lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjY2VwdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaG93XCI6IHRhc2suYXNzaWduLmFzc2lnbm1lbnQuYWNjZXB0LnNob3csXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogX2dldE5hbWVCeUxhbmcodGFzay5hc3NpZ24uYXNzaWdubWVudC5hY2NlcHQubGFiZWwuaTE4bilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5hY2NlcHQgPSBhY2NlcHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5tZXNzYWdlID0gX2dldE5hbWVCeUxhbmcodGFzay5hc3NpZ24uYXNzaWdubWVudC5tZXNzYWdlLmkxOG4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWplY3QgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2hvd1wiOiB0YXNrLmFzc2lnbi5hc3NpZ25tZW50LnJlamVjdC5zaG93LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IF9nZXROYW1lQnlMYW5nKHRhc2suYXNzaWduLmFzc2lnbm1lbnQucmVqZWN0LmxhYmVsLmkxOG4pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQucmVqZWN0ID0gcmVqZWN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxlSWRcIjogcHJvZmlsZUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJvbGVJZFwiOiByb2xlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJyb2xlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQucHJvZmlsZVJvbGVJZCA9IGlkO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoXCJObyB1c2VycyBmb3VuZCBpbiBsaXN0LiBBc3NpZ25pbmcgYmxhbmsgXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBpbiBnZXRVc2Vyc0xpc3RCeVJvbGUgdW5kZWZpbmVkJyk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIGluIGdldFVzZXJzTGlzdEJ5Um9sZScpO1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGFzay5hc3NpZ24uc3dpbWxhbmUgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXNvbHZlKCdzd2ltbGFuZScpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1N3aW1sYW5lIGltcGxlbWVudGF0aW9uICEhJyk7XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG59O1xuXG4vKipcbiAqIFByb2Nlc3MgdHJhbnNpdGlvblxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBwcm9jZXNzIGlkXG4gKiBAcGFyYW0ge251bWJlcn0gcHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBwcm9jZXNzIHNlcVxuICogQHBhcmFtIHtzdHJpbmd9IHN1YlByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN1Yi1wcm9jZXNzIGlkXG4gKiBAcGFyYW0ge251bWJlcn0gc3ViUHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBzdWItcHJvY2VzcyBzZXFcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdGVwSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdGVwIGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gdHJhbnNpdGlvbklkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gdHJhbnNpdGlvbiBpZFxuICogQHBhcmFtIHtvYmplY3R9IGRhdGEgLSBhbnkgYWRkaXRpb25hbCBkYXRhIHBhc3NlZCBpbiBhcyBrZXkgdmFsdWUgcGFpcnNcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiB0cmFuc2l0aW9uKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdGVwSWQsIHRyYW5zaXRpb25JZCwgZGF0YSwgX1dGSW5zdGFuY2UsIHNwdXVpZCwgbW9kZWwpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgc3RlcFNlcSA9IDA7XG4gICAgICAgICAgICB2YXIgbmV4dFN0ZXBJZCA9ICcnO1xuICAgICAgICAgICAgdmFyIG5leHRTdGVwU2VxID0gMDtcbiAgICAgICAgICAgIHZhciBzdWJQcm9jZXNzID0gW107XG4gICAgICAgICAgICB2YXIgY3VycmVudFByb2Nlc3MgPSBfV0ZJbnN0YW5jZS5jb25maWcucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmpQcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9ialByb2Nlc3MuX2lkID09IHByb2Nlc3NJZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqUHJvY2VzcztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRTdWJQcm9jZXNzID0gY3VycmVudFByb2Nlc3NbMF0uc3ViUHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmpTdWJQcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9ialN1YlByb2Nlc3MuX2lkID09IHN1YlByb2Nlc3NJZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqU3ViUHJvY2VzcztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRTdGVwID0gY3VycmVudFN1YlByb2Nlc3NbMF0uc3RlcHMuZmlsdGVyKGZ1bmN0aW9uKG9ialN0ZXApIHtcbiAgICAgICAgICAgICAgICBpZiAob2JqU3RlcC5faWQgPT0gc3RlcElkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmpTdGVwO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgdHJhbnNpdGlvbiA9IGN1cnJlbnRTdGVwWzBdLnRyYW5zaXRpb24uZmlsdGVyKGZ1bmN0aW9uKG9ialRyYW5zaXRpb24pIHtcbiAgICAgICAgICAgICAgICBpZiAob2JqVHJhbnNpdGlvbi5faWQgPT0gdHJhbnNpdGlvbklkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmpUcmFuc2l0aW9uO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGN1cnJlbnRTdWJQcm9jZXNzWzBdLnN0ZXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRTdWJQcm9jZXNzWzBdLnN0ZXBzW2ldLl9pZCA9PSBzdGVwSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RlcFNlcSA9IHBhcnNlSW50KGN1cnJlbnRTdWJQcm9jZXNzWzBdLnN0ZXBzW2ldLl9zZXEpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjdXJyZW50U3ViUHJvY2Vzc1swXS5zdGVwcy5maWx0ZXIoZnVuY3Rpb24oc3RlcEl0ZW0pIHtcbiAgICAgICAgICAgICAgICBuZXh0U3RlcFNlcSA9IHN0ZXBTZXEgKyAxO1xuICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChzdGVwSXRlbS5fc2VxKSA9PSBuZXh0U3RlcFNlcSkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0U3RlcElkID0gc3RlcEl0ZW0uX2lkO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF9XRkluc3RhbmNlLmluc3RhbmNlLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqUHJvY2Vzcykge1xuICAgICAgICAgICAgICAgIGlmIChvYmpQcm9jZXNzLmlkID09IHByb2Nlc3NJZCAmJiBvYmpQcm9jZXNzLnNlcSA9PSBwcm9jZXNzU2VxKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ialByb2Nlc3Muc3ViUHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmpTdWJQcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqU3ViUHJvY2Vzcy5pZCA9PSBzdWJQcm9jZXNzSWQgJiYgb2JqU3ViUHJvY2Vzcy5zZXEgPT0gc3ViUHJvY2Vzc1NlcSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1dWlkID0gb2JqU3ViUHJvY2Vzcy51dWlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwdXVpZCA9IHV1aWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihzdWJQcm9jZXNzSXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3ViUHJvY2Vzc0l0ZW0uX2lkID09IHV1aWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3MgPSBzdWJQcm9jZXNzSXRlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgbWF4U3RlcHMgPSBjdXJyZW50U3ViUHJvY2Vzc1swXS5zdGVwcy5sZW5ndGg7XG5cbiAgICAgICAgICAgIGlmICh0cmFuc2l0aW9uWzBdLnRyYW5zaXRpb25BY3Rpb24uZ29Ub1N0ZXAgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgbmV4dFNlcSA9IHBhcnNlSW50KGN1cnJlbnRTdGVwWzBdLl9zZXEpICsgcGFyc2VJbnQodHJhbnNpdGlvblswXS50cmFuc2l0aW9uQWN0aW9uLmdvVG9TdGVwLmRlZmF1bHQpO1xuICAgICAgICAgICAgICAgIHZhciBuZXh0SWQgPSAnJztcbiAgICAgICAgICAgICAgICBjdXJyZW50U3ViUHJvY2Vzc1swXS5zdGVwcy5maWx0ZXIoZnVuY3Rpb24oc3RlcEl0ZW0pIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQoc3RlcEl0ZW0uX3NlcSkgPT0gbmV4dFN0ZXBTZXEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRJZCA9IHN0ZXBJdGVtLl9pZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBzdGVwKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBuZXh0SWQsIG5leHRTZXEsIGRhdGEsIF9XRkluc3RhbmNlLCBzcHV1aWQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXh0U2VxID09IG1heFN0ZXBzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnQWxsIFN0ZXAgdHJhbnNpdGlvbnMgaGF2ZSBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzQ29tcGxldGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcDogcmVzdWx0LmRhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1N0ZXAgdHJhbnNpdGlvbiBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzQ29tcGxldGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXA6IHJlc3VsdC5kYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRyYW5zaXRpb25bMF0udHJhbnNpdGlvbkFjdGlvbi5nb1RvU3RlcElkICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIGdvVG9TdGVwSWQgPSB0cmFuc2l0aW9uWzBdLnRyYW5zaXRpb25BY3Rpb24uZ29Ub1N0ZXBJZC5zdGVwSWQ7XG4gICAgICAgICAgICAgICAgdmFyIGdvVG9TdGVwU2VxID0gMTtcblxuICAgICAgICAgICAgICAgIGN1cnJlbnRTdWJQcm9jZXNzWzBdLnN0ZXBzLmZpbHRlcihmdW5jdGlvbihzdGVwSXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RlcEl0ZW0uX2lkID09IGdvVG9TdGVwSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdvVG9TdGVwU2VxID0gcGFyc2VJbnQoc3RlcEl0ZW0uX3NlcSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgc3RlcChwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgZ29Ub1N0ZXBJZCwgZ29Ub1N0ZXBTZXEsIGRhdGEsIF9XRkluc3RhbmNlLCBzcHV1aWQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChnb1RvU3RlcFNlcSA9PSBtYXhTdGVwcykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnQWxsIFN0ZXAgdHJhbnNpdGlvbnMgaGF2ZSBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzQ29tcGxldGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcDogcmVzdWx0LmRhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnU3RlcCB0cmFuc2l0aW9uIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NDb21wbGV0ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcDogcmVzdWx0LmRhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRyYW5zaXRpb25bMF0udHJhbnNpdGlvbkFjdGlvbi5zdG9wICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1N0ZXAgdHJhbnNpdGlvbiBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LldvcmtmbG93IHN0b3BwZWQuJywge1xuICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzQ29tcGxldGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN0ZXA6IG1vZGVsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cblxuICAgIH0pO1xufTtcblxuLyoqXG4gKiBQcm9jZXNzIHBvc3RBY3Rpb25zXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHBvc3RBY3Rpb25zIC0gdGhlIHBvc3RBY3Rpb25zIGNvbmZpZyBkYXRhXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiBwb3N0QWN0aW9ucyhwb3N0QWN0aW9ucywgX1dGSW5zdGFuY2UpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciBjb21wbGV0ZWQgPSBbXTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHV0aWwuc3luY0xvb3AocG9zdEFjdGlvbnMubGVuZ3RoLCBmdW5jdGlvbihsb29wKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvdW50ZXIgPSBsb29wLml0ZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgIGFjdGlvbihwb3N0QWN0aW9uc1tjb3VudGVyXSwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBhbGwgcHJlLXJlcXVpc2l0ZXMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS5cbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVkLnB1c2godHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGxvb3AubmV4dCgpO1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQucHVzaChmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGxvb3AuYnJlYWsoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29tcGxldGVkLmV2ZXJ5KEJvb2xlYW4pKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdQb3N0LWFjdGlvbnMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCB7fSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZQcmVBY3Rpb25zRXJyb3InLCAnTm90IGFsbCBwb3N0LWFjdGlvbnMgcGFzc2VkLicpO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cblxuICAgIH0pO1xufTtcblxuLypcbmZ1bmN0aW9uIHNlbmROb3RpZmljYXRpb25zKHVzZXJzTGlzdCwgc3B1dWlkKXtcblxuICAvLyBnZXQgdXNlcnMgbGlzdCBcbiAgLy8gc2VuIG5vdGlmaWNhdGlvbnMgdG8gdXNlcnMgeSBhZGRpbmcgY2hhbm5lbHMgdG8gdGhlbVxuXG4gIHZhciBjaGFubmVsQXJyYXkgPSBbXTtcblxuICBmb3IoaT0wO2k8dXNlcnNMaXN0Lmxlbmd0aDsgaSsrKXtcbiAgICBjaGFubmVsQXJyYXkucHVzaChcInVzZXJfXCIrdXNlcnNMaXN0W2ldLmlkKTtcbiAgfVxuXG4gIGFzc2lnblRvVXNlcnMocHJvY2Vzc1dvcmtmbG93TWVzc2FnZShOT1RJRklDQVRJT05fVVNFUl9NU0dfQUNDRVBULCBzcHV1aWQpLCBjaGFubmVsQXJyYXkpO1xuXG59OyovXG5cbi8qZnVuY3Rpb24gYXNzaWduVG9Vc2VycyhtZXNzYWdlLCBjaGFubmVsQXJyYXkpe1xuXG4gICAgIHZhciBjaGFubmVscyA9IGNoYW5uZWxBcnJheTtcblxuICAgICB2YXIgbm90aWZpY2F0aW9uID0gIHsgXG4gICAgICAgICAgXCJfaWRcIjogZ2VuZXJhdGVVVUlEKCksXG4gICAgICAgICAgXCJjaGFubmVsc1wiOmNoYW5uZWxzLFxuICAgICAgICAgIFwibWVzc2FnZVwiOiBtZXNzYWdlLFxuICAgICAgICAgIFwibWVzc2FnZVR5cGVcIjogXCJpbmZvXCIsXG4gICAgICAgICAgXCJjcmVhdGVkRGF0ZVRpbWVcIjogbW9tZW50KCkuZm9ybWF0KCksXG4gICAgICAgICAgXCJyZWFkXCI6IGZhbHNlLFxuICAgICAgICAgIFwicmVhZERhdGVUaW1lXCI6IFwiXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwibm90aWZpY2F0aW9uXCIsXG4gICAgICAgICAgXCJzZW5kZXJVc2VySWRcIjogTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWRcbiAgICAgICB9O1xuXG4gICAgICAgY29uc29sZS5sb2cobm90aWZpY2F0aW9uKTtcbiAgICAgICBkYW8udXBzZXJ0KG5vdGlmaWNhdGlvbik7XG5cbiAgfTsqL1xuXG5mdW5jdGlvbiBwcm9jZXNzV29ya2Zsb3dNZXNzYWdlKG1lc3NhZ2UsIHNwdXVpZCkge1xuXG4gICAgdmFyIHJlcGxhY2VkTXNnID0gbWVzc2FnZTtcblxuICAgIGlmIChyZXBsYWNlZE1zZy5pbmRleE9mKCcjSU5TVEFOQ0VfTEFCRUwnKSAhPT0gLTEpIHtcbiAgICAgICAgdmFyIHZhbCA9IEpTT04ueHBhdGgoXCIvaW5zdGFuY2UvcHJvY2Vzc2VzL3N1YlByb2Nlc3Nlc1t1dWlkIGVxICdcIiArIHNwdXVpZCArIFwiJ10vbGFiZWxcIiwgYXBwLlNDT1BFLndvcmtmbG93LCB7fSlbMF07XG4gICAgICAgIHJlcGxhY2VkTXNnID0gcmVwbGFjZWRNc2cucmVwbGFjZSgnI0lOU1RBTkNFX0xBQkVMJywgdmFsKTtcblxuICAgIH1cblxuICAgIGlmIChyZXBsYWNlZE1zZy5pbmRleE9mKCcjVVNFUl9OQU1FJykgIT09IC0xKSB7XG4gICAgICAgIHZhciB2YWwgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXS9zdGVwL2Fzc2lnbmVkVG8vbmFtZVwiLCBhcHAuU0NPUEUud29ya2Zsb3csIHt9KVswXTtcbiAgICAgICAgcmVwbGFjZWRNc2cgPSByZXBsYWNlZE1zZy5yZXBsYWNlKCcjVVNFUl9OQU1FJywgdmFsKTtcblxuICAgIH1cblxuICAgIGlmIChyZXBsYWNlZE1zZy5pbmRleE9mKCcjUFJPRklMRV9USVRMRScpICE9PSAtMSkge1xuICAgICAgICB2YXIgdmFsID0gYXBwLnByb2ZpbGUudGl0bGU7XG4gICAgICAgIHJlcGxhY2VkTXNnID0gcmVwbGFjZWRNc2cucmVwbGFjZSgnI1BST0ZJTEVfVElUTEUnLCB2YWwpO1xuXG4gICAgfVxuXG4gICAgaWYgKHJlcGxhY2VkTXNnLmluZGV4T2YoJyNQUk9GSUxFX1RZUEUnKSAhPT0gLTEpIHtcbiAgICAgICAgdmFyIHZhbCA9IGFwcC5TQ09QRS5BUFBfQ09ORklHLm5hbWU7XG4gICAgICAgIHJlcGxhY2VkTXNnID0gcmVwbGFjZWRNc2cucmVwbGFjZSgnI1BST0ZJTEVfVFlQRScsIHZhbCk7XG5cbiAgICB9XG5cbiAgICBpZiAocmVwbGFjZWRNc2cuaW5kZXhPZignI1ZBUl9TUFVVSUQnKSAhPT0gLTEpIHtcbiAgICAgICAgdmFyIHZhbCA9IHNwdXVpZDtcbiAgICAgICAgcmVwbGFjZWRNc2cgPSByZXBsYWNlZE1zZy5yZXBsYWNlKCcjVkFSX1NQVVVJRCcsIHZhbCk7XG5cbiAgICB9XG5cbiAgICByZXR1cm4gcmVwbGFjZWRNc2c7XG59O1xuXG5mdW5jdGlvbiBfZ2V0TmFtZShhcnIsIGxhbmcpIHtcbiAgICBpZiAoYXJyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChhcnJbaV0uX2xhbmcgPT09IGxhbmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXJyW2ldLnZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH1cblxufTtcblxuZnVuY3Rpb24gX2dldE5hbWVCeUxhbmcob2JqKSB7XG4gICAgdmFyIGxhbmcgPSBzZXJ2aWNlLmdldExhbmd1YWdlKCk7XG4gICAgdmFyIGV4cHIgPSAnb2JqLicgKyBsYW5nO1xuICAgIHJldHVybiBldmFsKGV4cHIpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgICBwcmVSZXF1aXNpdGVzOiBwcmVSZXF1aXNpdGVzLFxuICAgIHByZUFjdGlvbnM6IHByZUFjdGlvbnMsXG4gICAgc3ViUHJvY2Vzczogc3ViUHJvY2VzcyxcbiAgICBpbmRpY2F0b3JEb2NzOiBpbmRpY2F0b3JEb2NzLFxuICAgIHRhc2s6IHRhc2ssXG4gICAgdHJhbnNpdGlvbjogdHJhbnNpdGlvbixcbiAgICBhc3NpZ25Vc2VyOiBhc3NpZ25Vc2VyXG5cbn0iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vKipcclxuICogVXRpbGl0eSBNb2R1bGVcclxuICpcclxuICogQG1vZHVsZSBsaWIvdXRpbFxyXG4gKlxyXG4gKiBAYXV0aG9yIEJyZW50IEdvcmRvblxyXG4gKiBAdmVyc2lvbiAwLjEuMFxyXG4gKlxyXG4gKiBAZGVzY3JpcHRpb25cclxuICogV29ya2Zsb3cgdXRpbGl0eSBtb2R1bGUgdXNlZCB0byBmb3JtYXQgdGhlIHJldHVybiBhbmQgZXJyb3Igb2JqZWN0cywgYW5kXHJcbiAqIGNvbnRhaW5zIHNvbWUgb3RoZXIgdXRpbGl0eSBmdW5jdGlvbnMgc3VjaCBhcyBhIHN5bmMgbG9vcCBhbmQgY29tcGFyZS5cclxuICpcclxuICovXHJcblxyXG4vKipcclxuICogU3VjY2VzcyBibG9jayByZXR1cm4gb2JqZWN0LCBjb250YWlucyBhIG1lc3NhZ2UgYW5kIG9wdGlvbmFsIGRhdGEgb2JqZWN0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIHRoZSBzdWNjZXNzIG1lc3NhZ2VcclxuICogQHBhcmFtIHtzdHJpbmd8T2JqZWN0fSBbZGF0YV0gLSB0aGUgc3VjY2VzcyByZXR1cm5lZCBkYXRhXHJcbiAqXHJcbiAqIEBleGFtcGxlXHJcbiAqIC8vIFJldHVybiBzdWNjZXNzIHdpdGhvdXQgYSBkYXRhIGJsb2NrXHJcbiAqIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdTdWNjZXNzIG1lc3NhZ2UgZ29lcyBoZXJlLi4uJyk7XHJcbiAqXHJcbiAqIEByZXR1cm4ge09iamVjdH0gLSB3aXRoIG1lc3NhZ2UgYW5kIGRhdGEgcHJvcGVydGllc1xyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gc3VjY2VzcyhtZXNzYWdlLCBkYXRhKXtcclxuXHRyZXR1cm4ge1xyXG5cdFx0bWVzc2FnZTogbWVzc2FnZSxcclxuXHRcdGRhdGE6IGRhdGFcclxuXHR9O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdhcm5pbmcgYmxvY2sgcmV0dXJuIG9iamVjdCwgY29udGFpbnMgYSBtZXNzYWdlIGFuZCBvcHRpb25hbCBkYXRhIG9iamVjdC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSB0aGUgd2FybmluZyBtZXNzYWdlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfE9iamVjdH0gW2RhdGFdIC0gdGhlIHJldHVybmVkIGRhdGFcclxuICpcclxuICogQGV4YW1wbGVcclxuICogLy8gUmV0dXJuIHN1Y2Nlc3Mgd2l0aG91dCBhIGRhdGEgYmxvY2tcclxuICogdmFyIHN1Y2Nlc3MgPSB1dGlsLndhcm4oJ1dhcm5pbmcgbWVzc2FnZSBnb2VzIGhlcmUuLi4nKTtcclxuICpcclxuICogQHJldHVybiB7T2JqZWN0fSB3aXRoIG1lc3NhZ2UgYW5kIGRhdGEgcHJvcGVydGllcywgYW5kIGxvZ3MgdGhlIHdhcm5pbmcgdG8gdGhlIGNvbnNvbGUuXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiB3YXJuKG1lc3NhZ2UsIGRhdGEpe1xyXG5cdGNvbnNvbGUud2FybihkYXRhKTtcclxuXHRyZXR1cm4ge1xyXG5cdFx0d2FybmluZzogbWVzc2FnZSxcclxuXHRcdGRhdGE6IGRhdGFcclxuXHR9O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEVycm9yIGJsb2NrIEpTIGVycm9yIG9iamVjdCwgY29udGFpbnMgYSBjb2RlIGFuZCBtZXNzYWdlIGZvciB0aGUgZXJyb3IuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb2RlIC0gdGhlIGVycm9yIGNvZGVcclxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSB0aGUgZXJyb3IgbWVzc2FnZVxyXG4gKlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgc3VjY2VzcyA9IHV0aWwuZXJyb3IoJ0Vycm9yMDAxJywnRXJyb3IgbWVzc2FnZSBnb2VzIGhlcmUuLi4nKTtcclxuICpcclxuICogQHJldHVybiB7T2JqZWN0fSB3aXRoIGEgY29kZSBhbmQgbWVzc2FnZSBwcm9wZXJ0aWVzLlxyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gZXJyb3IoY29kZSwgbWVzc2FnZSl7XHJcblx0dmFyIGVyciA9IG5ldyBFcnJvcignJyk7XHJcblx0ZXJyLm5hbWUgPSBjb2RlO1xyXG5cdGVyci5tZXNzYWdlID0gbWVzc2FnZTtcclxuXHRyZXR1cm4gZXJyO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEEgbG9vcCB3aGljaCBjYW4gbG9vcCBYIGFtb3VudCBvZiB0aW1lcywgd2hpY2ggY2FycmllcyBvdXRcclxuICogYXN5bmNocm9ub3VzIGNvZGUsIGJ1dCB3YWl0cyBmb3IgdGhhdCBjb2RlIHRvIGNvbXBsZXRlIGJlZm9yZSBsb29waW5nLlxyXG4gKlxyXG4gKiBAcGFyYW0ge251bWJlcn0gaXRlcmF0aW9ucyAtIHRoZSBudW1iZXIgb2YgaXRlcmF0aW9ucyB0byBjYXJyeSBvdXRcclxuICogQHBhcmFtIHtmdW5jdGlvbn0gcHJvY2VzcyAtIHRoZSBjb2RlL2Z1bmN0aW9uIHdlJ3JlIHJ1bm5pbmcgZm9yIGV2ZXJ5XHJcbiAqIGl0ZXJhdGlvblxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBleGl0IC0gYW4gb3B0aW9uYWwgY2FsbGJhY2sgdG8gY2Fycnkgb3V0IG9uY2UgdGhlIGxvb3BcclxuICogaGFzIGNvbXBsZXRlZFxyXG4gKlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB1dGlsLnN5bmNMb29wKDUsIGZ1bmN0aW9uKGxvb3Ape1xyXG4gKiBcdHZhciBjb3VudGVyID0gbG9vcC5pdGVyYXRpb24oKTtcclxuICogXHQvLyBBZGQgYXN5bmMgY2FsbHMgaGVyZS4uXHJcbiAqXHJcbiAqIH0sIGZ1bmN0aW9uKCl7XHJcbiAqIFx0Ly8gT24gY29tcGxldGUgcGVyZm9ybSBhY3Rpb25zIGhlcmUuLi5cclxuICpcclxuICogfSk7XHJcbiAqXHJcbiAqIEByZXR1cm4ge09iamVjdH0gdGhlIGxvb3AgY29udHJvbCBvYmplY3QuXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiBzeW5jTG9vcChpdGVyYXRpb25zLCBwcm9jZXNzLCBleGl0KXtcclxuICAgIHZhciBpbmRleCA9IDAsXHJcbiAgICAgICAgZG9uZSA9IGZhbHNlLFxyXG4gICAgICAgIHNob3VsZEV4aXQgPSBmYWxzZTtcclxuICAgIHZhciBsb29wID0ge1xyXG4gICAgICAgIG5leHQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYoZG9uZSl7XHJcbiAgICAgICAgICAgICAgICBpZihzaG91bGRFeGl0ICYmIGV4aXQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBleGl0KCk7IC8vIEV4aXQgaWYgd2UncmUgZG9uZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIElmIHdlJ3JlIG5vdCBmaW5pc2hlZFxyXG4gICAgICAgICAgICBpZihpbmRleCA8IGl0ZXJhdGlvbnMpe1xyXG4gICAgICAgICAgICAgICAgaW5kZXgrKzsgLy8gSW5jcmVtZW50IG91ciBpbmRleFxyXG4gICAgICAgICAgICAgICAgcHJvY2Vzcyhsb29wKTsgLy8gUnVuIG91ciBwcm9jZXNzLCBwYXNzIGluIHRoZSBsb29wXHJcbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSB3ZSdyZSBkb25lXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkb25lID0gdHJ1ZTsgLy8gTWFrZSBzdXJlIHdlIHNheSB3ZSdyZSBkb25lXHJcbiAgICAgICAgICAgICAgICBpZihleGl0KSBleGl0KCk7IC8vIENhbGwgdGhlIGNhbGxiYWNrIG9uIGV4aXRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaXRlcmF0aW9uOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybiBpbmRleCAtIDE7IC8vIFJldHVybiB0aGUgbG9vcCBudW1iZXIgd2UncmUgb25cclxuICAgICAgICB9LFxyXG4gICAgICAgIGJyZWFrOmZ1bmN0aW9uKGVuZCl7XHJcbiAgICAgICAgICAgIGRvbmUgPSB0cnVlOyAvLyBFbmQgdGhlIGxvb3BcclxuICAgICAgICAgICAgc2hvdWxkRXhpdCA9IGVuZDsgLy8gUGFzc2luZyBlbmQgYXMgdHJ1ZSBtZWFucyB3ZSBzdGlsbCBjYWxsIHRoZSBleGl0IGNhbGxiYWNrXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGxvb3AubmV4dCgpO1xyXG4gICAgcmV0dXJuIGxvb3A7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBjb21wYXJlKHN1YmplY3QsIG9wZXJhdG9yLCB2YWx1ZSkge1xyXG4gIFx0c3dpdGNoIChvcGVyYXRvcikge1xyXG4gIFx0XHRjYXNlICdncmVhdGVyVGhhbic6XHJcblx0XHRcdHJldHVybiBzdWJqZWN0ID4gdmFsdWU7XHJcblx0XHRjYXNlICdsZXNzVGhhbic6XHJcblx0XHRcdHJldHVybiBzdWJqZWN0IDwgdmFsdWU7XHJcblx0XHRjYXNlICdncmVhdGVyVGhhbkVxdWFsJzpcclxuXHRcdFx0cmV0dXJuIHN1YmplY3QgPj0gdmFsdWU7XHJcblx0XHRjYXNlICdsZXNzVGhhbkVxdWFsJzpcclxuXHRcdFx0cmV0dXJuIHN1YmplY3QgPD0gdmFsdWU7XHJcblx0XHRjYXNlICdlcXVhbFRvJzpcclxuXHRcdFx0cmV0dXJuIHN1YmplY3QgPT09IHZhbHVlO1xyXG5cdFx0Y2FzZSAnbm90RXF1YWxUbyc6XHJcblx0XHRcdHJldHVybiBzdWJqZWN0ICE9PSB2YWx1ZTtcclxuICBcdH1cclxufTtcclxuXHJcbmZ1bmN0aW9uIGdldE5hbWUoYXJyLCBsYW5nKXtcclxuXHRpZiAoYXJyICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aCA7IGkrKykge1xyXG5cdFx0XHRpZiAoYXJyW2ldLmkxOG4uX2xhbmcgPT09IGxhbmcpIHtcclxuXHRcdFx0XHRyZXR1cm4gYXJyW2ldLmkxOG4udmFsdWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cclxuIFx0c3VjY2Vzczogc3VjY2VzcyxcclxuIFx0d2Fybjogd2FybixcclxuIFx0ZXJyb3I6IGVycm9yLFxyXG4gXHRzeW5jTG9vcDogc3luY0xvb3AsXHJcbiBcdGNvbXBhcmU6IGNvbXBhcmUsXHJcblx0Z2V0TmFtZTogZ2V0TmFtZVxyXG5cclxuIH1cclxuIl19
