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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VzZXJzL0hhc2FuL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImluZGV4LmpzIiwibGliL2FjdGlvbnMuanMiLCJsaWIvZm9ybS5qcyIsImxpYi9oZWxwZXIuanMiLCJsaWIvaW50ZXJmYWNlLmpzIiwibGliL25vZGVWYWx1ZS5qcyIsImxpYi9wcm9jZXNzLmpzIiwibm9kZV9tb2R1bGVzL3V0aWxpdHkvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25vQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6dUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNXJEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBQcm9jZXNzID0gcmVxdWlyZSgnLi9saWIvcHJvY2VzcycpO1xyXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWxpdHknKTtcclxudmFyIHVzZXJJbnRlcmZhY2UgPSByZXF1aXJlKCcuL2xpYi9pbnRlcmZhY2UnKTtcclxudmFyIGhlbHBlciA9IHJlcXVpcmUoJy4vbGliL2hlbHBlcicpO1xyXG5cclxuXHJcbi8qZ2xvYmFscyAqL1xyXG5cclxuLyoqXHJcbiAqIEEgbmV3IFdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlIGNvbnRhaW5zIHRoZSByZWZlcmVuY2UgdG8gdGhlIGFwcGxpY2F0aW9uXHJcbiAqIGFuZCBhc3NvY2lhdGVkIHByb2ZpbGUgd2hpY2ggaXQgcmVxdWlyZXMgYXMgdGhlIGZpcnN0IHR3byBwYXJhbWV0ZXJzLiBJdCBhbHNvXHJcbiAqIHJlcXVpcmVzIGEgd29ya2Zsb3cgY29uZmlndXJhdGlvbiwgYXMgdGhlIHRoaXJkIHBhcmFtZXRlciwgd2hpY2ggaXMgdXNlZCB0b1xyXG4gKiBkZXNjaWJlIHRoZSB3b3JrZmxvdyBwcm9jZXNzZXMuIElmIGEgd29ya2Zsb3cgaW5zdGFuY2UgZXhpc3RzIHlvdSBjYW4gcGFzcyBpdFxyXG4gKiBpbiBhcyB0aGUgZm91cnRoIHBhcmFtZXRlciB3aGljaCBpdCB3aWxsIHRoZW4gdXNlLCBlbHNlIGNyZWF0ZSBhIG5ldyBvbmUuXHJcbiAqXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvZmlsZSAtIFRoZSBjdXJyZW50IHByb2ZpbGUgaWRcclxuICogQHBhcmFtIHtzdHJpbmd9IGFwcCAtIFRoZSBhc3NvY2lhdGVkIGFwcGxpY2F0aW9uIGlkXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgLSBUaGUgYXBwbGljYXRpb24gd29ya2Zsb3cgY29uZmlndXJhdGlvbiAvIGRlZmluaXRpb25cclxuICogQHBhcmFtIHtPYmplY3R9IFtpbnN0YW5jZV0gLSBBbiBleGlzdGluZyBhcHBsaWNhdGlvbiBwcm9maWxlIHdvcmtmbG93IGluc3RhbmNlIGJhc2VkXHJcbiAqIG9uIHRoZSBkZWZpbml0aW9uXHJcbiAqXHJcbiAqIEBhdXRob3IgQnJlbnQgR29yZG9uXHJcbiAqIEB2ZXJzaW9uIDAuMS4wXHJcbiAqXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBjb25maWcgPSB7ICdfaWQnOiAnYWJjMTIzJyB9O1xyXG5cclxuICogdmFyIGluc3RhbmNlID0geyAnX2lkJzogJ2luc3RhbmNlX2FiYzEyMycgfTtcclxuXHJcbiAqIC8vIElmIHRoZXJlIGlzbid0IGFuIGV4aXN0aW5nIGluc3RhbmNlXHJcbiAqIHZhciB3b3JrZmxvdyA9IG5ldyBXb3JrZmxvdygnMTIzNCcsICc1Njc4JywgY29uZmlnKTtcclxuICogLy8gSWYgdGhlcmUgaXMgYW4gZXhpc3RpbmcgaW5zdGFuY2VcclxuICogdmFyIHdvcmtmbG93ID0gbmV3IFdvcmtmbG93KCcxMjM0JywgJzU2NzgnLCBjb25maWcsIGluc3RhbmNlKTtcclxuICpcclxuICogQHJldHVybiB7T2JqZWN0fSBuZXcgV29ya2Zsb3cgb2JqZWN0XHJcbiAqXHJcbiAqIEB0aHJvd3MgRXJyb3I6IEEgcHJvZmlsZSBpZCBpcyByZXF1aXJlZFxyXG4gKiBAdGhyb3dzIEVycm9yOiBBbiBhcHAgaWQgaXMgcmVxdWlyZWRcclxuICogQHRocm93cyBFcnJvcjogQSB3b3JrZmxvdyBjb25maWd1cmF0aW9uIGlzIHJlcXVpcmVkXHJcbiAqXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gV29ya2Zsb3cocHJvZmlsZSwgY29tbXVuaXR5SWQsIGFwcCwgY29uZmlnKSB7XHJcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgIC8vIENvbW11bml0eSBJRCB2YWxpZGF0aW9uIGNoZWNrc1xyXG4gICAgaWYgKGNvbW11bml0eUlkID09ICcnIHx8IGNvbW11bml0eUlkID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRocm93IHV0aWwuZXJyb3IoJ1BhcmFtUmVxdWlyZWQnLCAnQSBjb21tdW5pdHkgaWQgaXMgcmVxdWlyZWQuJyk7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZihjb21tdW5pdHlJZCkgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgY29tbXVuaXR5IGlkIG11c3QgYmUgYSBqYXZhc2NyaXB0IHN0cmluZy4nKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgX3RoaXMuY29tbXVuaXR5SWQgPSBjb21tdW5pdHlJZCB8fCAnJztcclxuICAgIH1cclxuXHJcbiAgICAvLyBQcm9maWxlIElEIHZhbGlkYXRpb24gY2hlY2tzXHJcbiAgICBpZiAocHJvZmlsZSA9PSAnJyB8fCBwcm9maWxlID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRocm93IHV0aWwuZXJyb3IoJ1BhcmFtUmVxdWlyZWQnLCAnQSBwcm9maWxlIGlkIGlzIHJlcXVpcmVkLicpO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YocHJvZmlsZSkgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgcHJvZmlsZSBpZCBtdXN0IGJlIGEgamF2YXNjcmlwdCBzdHJpbmcuJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIF90aGlzLnByb2ZpbGUgPSBwcm9maWxlIHx8ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEFwcCBJRCB2YWxpZGF0aW9uIGNoZWNrc1xyXG4gICAgaWYgKGFwcCA9PSAnJyB8fCBhcHAgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhyb3cgdXRpbC5lcnJvcignUGFyYW1SZXF1aXJlZCcsICdBbiBhcHAgaWQgaXMgcmVxdWlyZWQuJyk7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZihhcHApICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGFwcCBpZCBtdXN0IGJlIGEgamF2YXNjcmlwdCBzdHJpbmcuJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIF90aGlzLmFwcCA9IGFwcCB8fCAnJztcclxuICAgIH1cclxuXHJcbiAgICAvLyBXb3JrZmxvdyBjb25maWd1cmF0aW9uIHZhbGlkYXRpb24gY2hlY2tzXHJcbiAgICBpZiAoY29uZmlnID09ICcnIHx8IGNvbmZpZyA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aHJvdyB1dGlsLmVycm9yKCdQYXJhbVJlcXVpcmVkJywgJ0Egd29ya2Zsb3cgY29uZmlndXJhdGlvbiBpcyByZXF1aXJlZC4nKTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mKGNvbmZpZykgIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgX3RoaXMuY29uZmlnID0gSlNPTi5wYXJzZShjb25maWcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBfdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gV29ya2Zsb3cgaW5zdGFuY2UgdmFsaWRhdGlvbiBjaGVja3NcclxuICAgIF90aGlzLmluc3RhbmNlO1xyXG4gICAgLy8gV29ya2Zsb3cgc3ViLXByb2Nlc3NlcyB2YWxpZGF0aW9uIGNoZWNrc1xyXG4gICAgX3RoaXMuc3VicHJvY2Vzc2VzID0gW107XHJcbiAgICAvLyBXb3JrZmxvdyBpbmRpY2F0b3JzIHBsYWNlIGhvbGRlclxyXG4gICAgX3RoaXMuaW5kaWNhdG9ycyA9IFtdO1xyXG4gICAgLy8gV29ya2Zsb3cgc3ViLXByb2Nlc3Mgc3RlcCBoaXN0b3J5IHBsYWNlIGhvbGRlclxyXG4gICAgX3RoaXMuaGlzdG9yeSA9IFtdO1xyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIFdvcmtmbG93IGdldCBwcm9maWxlIGlkLlxyXG4gKlxyXG4gKiBAZXhhbXBsZSBcIlwiXHJcbiAqXHJcbiAqIEByZXR1cm4gXCJcIlxyXG4gKlxyXG4gKi9cclxuV29ya2Zsb3cucHJvdG90eXBlLmdldFByb2ZpbGUgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLnByb2ZpbGU7XHJcbn07XHJcblxyXG4vKipcclxuICogV29ya2Zsb3cgZ2V0IGFwcCBpZC5cclxuICpcclxuICogQGV4YW1wbGUgXCJcIlxyXG4gKlxyXG4gKiBAcmV0dXJuIFwiXCJcclxuICpcclxuICovXHJcbldvcmtmbG93LnByb3RvdHlwZS5nZXRBcHAgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLmFwcDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXb3JrZmxvdyBnZXQgY29uZmlnLlxyXG4gKlxyXG4gKiBAZXhhbXBsZSBcIlwiXHJcbiAqXHJcbiAqIEByZXR1cm4gXCJcIlxyXG4gKlxyXG4gKi9cclxuV29ya2Zsb3cucHJvdG90eXBlLmdldENvbmZpZyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29uZmlnO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdvcmtmbG93IGdldCBpbnN0YW5jZS5cclxuICpcclxuICogQGV4YW1wbGUgXCJcIlxyXG4gKlxyXG4gKiBAcmV0dXJuIFwiXCJcclxuICpcclxuICovXHJcblxyXG5Xb3JrZmxvdy5wcm90b3R5cGUuZ2V0SW5zdGFuY2UgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdvcmtmbG93IHNldCB0aGUgaW5zdGFuY2UgZGF0YS5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSB0aGUgd29ya2Zsb3cgcHJvY2VzcyBpbnN0YW5jZSBkYXRhXHJcbiAqXHJcbiAqIEBleGFtcGxlIFwiXCJcclxuICpcclxuICogQHJldHVybiBcIlwiXHJcbiAqXHJcbiAqL1xyXG5Xb3JrZmxvdy5wcm90b3R5cGUuc2V0SW5zdGFuY2UgPSBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICB0aGlzLmluc3RhbmNlID0gZGF0YTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXb3JrZmxvdyBnZXQgc3ViLXByb2Nlc3NlcyBkYXRhLlxyXG4gKlxyXG4gKiBAZXhhbXBsZSBcIlwiXHJcbiAqXHJcbiAqIEByZXR1cm4gXCJcIlxyXG4gKlxyXG4gKi9cclxuV29ya2Zsb3cucHJvdG90eXBlLmdldFN1YlByb2Nlc3NlcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc3VicHJvY2Vzc2VzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdvcmtmbG93IHNldCB0aGUgc3ViLXByb2Nlc3NlcyBkYXRhLlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIHRoZSB3b3JrZmxvdyBwcm9jZXNzIGluc3RhbmNlIGRhdGFcclxuICpcclxuICogQGV4YW1wbGUgXCJcIlxyXG4gKlxyXG4gKiBAcmV0dXJuIFwiXCJcclxuICpcclxuICovXHJcbldvcmtmbG93LnByb3RvdHlwZS5zZXRTdWJQcm9jZXNzZXMgPSBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICB0aGlzLnN1YnByb2Nlc3NlcyA9IGRhdGE7XHJcbn07XHJcblxyXG4vKipcclxuICogV29ya2Zsb3cgZ2V0IGluZGljYXRvciBzZXQgZGF0YS5cclxuICpcclxuICogQGV4YW1wbGUgXCJcIlxyXG4gKlxyXG4gKiBAcmV0dXJuIFwiXCJcclxuICpcclxuICovXHJcbldvcmtmbG93LnByb3RvdHlwZS5nZXRJbmRpY2F0b3JzID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5pbmRpY2F0b3JzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdvcmtmbG93IHNldCB0aGUgaW5kaWNhdG9yIHNldCBkYXRhLlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIHRoZSB3b3JrZmxvdyBwcm9jZXNzIGluc3RhbmNlIGRhdGFcclxuICpcclxuICogQGV4YW1wbGUgXCJcIlxyXG4gKlxyXG4gKiBAcmV0dXJuIFwiXCJcclxuICpcclxuICovXHJcbldvcmtmbG93LnByb3RvdHlwZS5zZXRJbmRpY2F0b3JzID0gZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgdGhpcy5pbmRpY2F0b3JzID0gZGF0YTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIHZhcmlhYmxlIHZhbHVlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gcHJvY2VzcyBpZFxyXG4gKiBAcGFyYW0ge251bWJlcn0gcHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBwcm9jZXNzIHNlcVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3ViUHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3ViLXByb2Nlc3MgaWRcclxuICogQHBhcmFtIHtudW1iZXJ9IHN1YlByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2Ugc3ViLXByb2Nlc3Mgc2VxXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdGVwSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdGVwIGlkXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YXJpYWJsZSAtIHRoZSBXb3JrZmxvdyB2YXJpYWJsZSBvYmplY3RcclxuICpcclxuICogQGV4YW1wbGUgJydcclxuICpcclxuICogQHJldHVybiAnJ1xyXG4gKlxyXG4gKi9cclxuLy8gV29ya2Zsb3cucHJvdG90eXBlLnNldFZhcmlhYmxlID0gZnVuY3Rpb24ocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwgdmFyaWFibGUpe1xyXG4vLyBcdHZhciBfdGhpcyA9IHRoaXM7XHJcbi8vIFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4vLyBcdFx0dHJ5IHtcclxuLy8gXHRcdFx0UHJvY2Vzcy5nZXRWYXJpYWJsZShwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3RlcElkLCB2YXJpYWJsZSkudGhlbihmdW5jaW9uKHJlc3VsdCl7XHJcbi8vIFx0XHRcdFx0cmVzb2x2ZShyZXN1bHQuZGF0YSk7XHJcbi8vIFx0XHRcdH0sIGZ1bmN0aW9uKGVycil7XHJcbi8vIFx0XHRcdFx0cmVqZWN0KGVycik7XHJcbi8vIFx0XHRcdH0pXHJcbi8vIFx0XHR9IGNhdGNoIChlcnIpIHtcclxuLy8gXHRcdFx0cmVqZWN0KGVycik7XHJcbi8vIFx0XHR9XHJcblxyXG4vLyBcdH0pO1xyXG4vLyB9O1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgdmFyaWFibGUgdmFsdWUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBwcm9jZXNzIGlkXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHByb2Nlc3Mgc2VxXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdWJQcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdWItcHJvY2VzcyBpZFxyXG4gKiBAcGFyYW0ge251bWJlcn0gc3ViUHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBzdWItcHJvY2VzcyBzZXFcclxuICogQHBhcmFtIHtzdHJpbmd9IHN0ZXBJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN0ZXAgaWRcclxuICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIHRoZSBXb3JrZmxvdyB2YXJpYWJsZSBpZFxyXG4gKlxyXG4gKiBAZXhhbXBsZSAnJ1xyXG4gKlxyXG4gKiBAcmV0dXJuICcnXHJcbiAqXHJcbiAqL1xyXG4vLyBXb3JrZmxvdy5wcm90b3R5cGUuZ2V0VmFyaWFibGUgPSBmdW5jdGlvbihwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3RlcElkLCBrZXkpe1xyXG4vLyBcdHZhciBfdGhpcyA9IHRoaXM7XHJcbi8vIFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4vLyBcdFx0dHJ5IHtcclxuLy8gXHRcdFx0UHJvY2Vzcy5zZXRWYXJpYWJsZShwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3RlcElkLCBrZXkpLnRoZW4oZnVuY2lvbihyZXN1bHQpe1xyXG4vLyBcdFx0XHRcdHJlc29sdmUocmVzdWx0LmRhdGEpO1xyXG4vLyBcdFx0XHR9LCBmdW5jdGlvbihlcnIpe1xyXG4vLyBcdFx0XHRcdHJlamVjdChlcnIpO1xyXG4vLyBcdFx0XHR9KVxyXG4vLyBcdFx0fSBjYXRjaCAoZXJyKSB7XHJcbi8vIFx0XHRcdHJlamVjdChlcnIpO1xyXG4vLyBcdFx0fVxyXG5cclxuLy8gXHR9KTtcclxuLy8gfTtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIG1ldGhvZCBjcmVhdGVzIGEgbmV3IHdvcmtmbG93IHByb2Nlc3MgaS5lLiBpdCBjcmVhdGVzIGEgd29ya2Zsb3cgcHJvY2Vzc2VzIGluc3RhbmNlXHJcbiAqIG9iamVjdCB3aXRoIHRoZSBtaW5pbXVtIHJlcXVpcmVkIGRhdGEuIFRoaXMgaW5zdGFuY2UgY2FuIGJlIHJlZmVyZW5jZWQgaW4gdGhlIGZvbGxvd2luZ1xyXG4gKiB3YXksIHNlZSBleGFtcGxlIGJlbG93LlxyXG4gKlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgY29uZmlnID0geyAnX2lkJzogJ2FiYzEyMycgfTtcclxuXHJcbiAqIHZhciB3b3JrZmxvdyA9IG5ldyBXb3JrZmxvdygnMTIzNCcsICc1Njc4JywgY29uZmlnKTtcclxuICogd29ya2Zsb3cuY3JlYXRlKCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xyXG4gKlx0Y29uc29sZS5sb2cocmVzdWx0Lm1lc3NhZ2UpO1xyXG4gKlx0Ly8gVGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzIGNhbiBub3cgYmUgYWNjZXNzZWRcclxuICogXHR2YXIgcHJvZmlsZSA9IHdvcmtmbG93LnByb2ZpbGU7XHJcbiAqIFx0dmFyIGFwcCA9IHdvcmtmbG93LmFwcDtcclxuICogXHR2YXIgY29uZmlnID0gd29ya2Zsb3cuY29uZmlnO1xyXG4gKlx0Ly8gT24gc3VjY2VzcyB5b3UgY2FuIGFjY2VzcyB0aGUgaW5zdGFuY2UgdGhlIGZvbGxvd2luZyB3YXlcclxuICpcdHZhciBpbnN0YW5jZSA9IHdvcmtmbG93Lmluc3RhbmNlO1xyXG4gKiB9LCBmdW5jdGlvbihlcnJvcil7XHJcbiAqXHRjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAqIH0pO1xyXG4gKlxyXG4gKiBAcmV0dXJuIHtPYmplY3R9IG5ldyBXb3JrZmxvdyBpbnN0YW5jZSB3aXRoIHVwZGF0ZWQgaW5zdGFuY2UgZGF0YS5cclxuICpcclxuICovXHJcblxyXG5Xb3JrZmxvdy5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChfdGhpcy5pbnN0YW5jZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgd2FybiA9IHV0aWwud2FybignSW5zdGFuY2UgYWxyZWFkeSBleGlzdHMuJywgX3RoaXMpXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHdhcm4pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSB3b3JrZmxvdyBwcm9jZXNzZXMgaW5zdGFuY2Ugb2JqZWN0XHJcbiAgICAgICAgICAgICAgICB2YXIgbW9kZWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2lkOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnd29ya2Zsb3dJbnN0YW5jZScsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc2VzOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFubmVsczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbW11bml0eV9cIiArIGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInByb2ZpbGVfXCIgKyBhcHAuU0NPUEUucHJvZmlsZUlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFwcGxpY2F0aW9uX1wiICsgYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tbXVuaXR5X1wiICsgYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCkgKyBcIl9hcHBsaWNhdGlvbl9cIiArIGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBtb2RlbC5faWQgPSBfdGhpcy5wcm9maWxlICsgJzpwcm9jZXNzZXMnO1xyXG4gICAgICAgICAgICAgICAgbW9kZWwudmVyc2lvbiA9IF90aGlzLmNvbmZpZy52ZXJzaW9uO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuaW5zdGFuY2UgPSBtb2RlbDtcclxuICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdXb3JrZmxvdyBwcm9jZXNzZXMgaW5zdGFuY2UgY3JlYXRlZCBzdWNjZXNzZnVsbHkuJywgX3RoaXMpO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXb3JrZmxvdyBpbml0aWFsaXNlLCB0aGlzIGZ1bmN0aW9uIGV4ZWN1dGVzIGEgcHJvY2VzcyB3aXRoaW4gYSB3b3JrZmxvd1xyXG4gKiBjb25maWd1cmF0aW9uLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIHByb2Nlc3MgaWQgdG8gcHJvY2Vzc1xyXG4gKiBAcGFyYW0ge29iamVjdH0gW2RhdGFdIC0gdGhlIGlucHV0IGRhdGEgdG8gcHJvY2Vzc1xyXG4gKlxyXG4gKiBAZXhhbXBsZVxyXG4gKiBXb3JrZmxvdy5pbml0aWFsaXNlKCdwcm9jZXNzSWQnLCB7IHZhbGlkRGF0ZTogJ2RhdGUnIH0pO1xyXG4gKlxyXG4gKiBAcmV0dXJuIFwiXCJcclxuICpcclxuICovXHJcbldvcmtmbG93LnByb3RvdHlwZS5pbml0aWFsaXNlID0gZnVuY3Rpb24ocHJvY2Vzc0lkLCBkYXRhLCBzdWJwcm9maWxlSWQpIHtcclxuICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIGNvbmZpZ1Byb2Nlc3MgPSBbXTtcclxuICAgICAgICAgICAgLy8gQ2hlY2sgdGhlIHBhc3NlZCBpbiBwYXJhbWV0ZXJzXHJcbiAgICAgICAgICAgIGlmIChwcm9jZXNzSWQgIT09ICcnICYmIHByb2Nlc3NJZCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBHZXQgdGhlIGN1cnJlbnQgcHJvY2VzcyBjb25maWdcclxuICAgICAgICAgICAgICAgIGNvbmZpZ1Byb2Nlc3MgPSBfdGhpcy5jb25maWcucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmpQcm9jZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9ialByb2Nlc3MuX2lkID09IHByb2Nlc3NJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqUHJvY2VzcztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnUHJvY2Vzc1swXS5faWQgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZDb25maWdFcnJvcicsICdObyB2YWxpZCBwcm9jZXNzIGRlZmluaXRpb24gZm91bmQgd2l0aCBwcm9jZXNzIGlkOiAnICsgcHJvY2Vzc0lkKTtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbmZpZ1Byb2Nlc3MucHVzaChfdGhpcy5jb25maWcucHJvY2Vzc2VzWzBdKTtcclxuICAgICAgICAgICAgICAgIHByb2Nlc3NJZCA9IF90aGlzLmNvbmZpZy5wcm9jZXNzZXNbMF0uX2lkO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBHZXQgdGhlIGN1cnJlbnQgbGlzdCBvZiBwcm9jZXNzIGluc3RhbmNlc1xyXG4gICAgICAgICAgICAvLyB2YXIgcHJvY2Vzc1NlcSA9IDE7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50UHJvY2VzcyA9IFtdO1xyXG4gICAgICAgICAgICBfdGhpcy5pbnN0YW5jZS5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHByb2Nlc3NJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocHJvY2Vzc0l0ZW0uaWQgPT0gcHJvY2Vzc0lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFByb2Nlc3MucHVzaChwcm9jZXNzSXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIHByb2Nlc3NTZXEgPSBjdXJyZW50UHJvY2Vzcy5sZW5ndGggKyAxO1xyXG4gICAgICAgICAgICAvLyB2YXIgbmV4dFNlcSA9IHByb2Nlc3NTZXEgKyAxO1xyXG4gICAgICAgICAgICAvLyBQdXNoIHRoZSBwcm9jZXNzIG9iamVjdCBpbnRvIHRoZSBhcnJheVxyXG4gICAgICAgICAgICB2YXIgcHJvY2Vzc01vZGVsID0ge1xyXG4gICAgICAgICAgICAgICAgaWQ6ICcnLFxyXG4gICAgICAgICAgICAgICAgc2VxOiAnJyxcclxuICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NlczogW11cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gMS4gVXBkYXRlIHRoZSBwcm9jZXNzIGlkIGFuZCBzZXFcclxuICAgICAgICAgICAgcHJvY2Vzc01vZGVsLmlkID0gcHJvY2Vzc0lkO1xyXG4gICAgICAgICAgICBwcm9jZXNzTW9kZWwuc2VxID0gcHJvY2Vzc1NlcTtcclxuICAgICAgICAgICAgX3RoaXMuaW5zdGFuY2UucHJvY2Vzc2VzLnB1c2gocHJvY2Vzc01vZGVsKTtcclxuICAgICAgICAgICAgLy8gUGFyYW1ldGVyc1xyXG4gICAgICAgICAgICB2YXIgc3ViUHJvY2Vzc0lkID0gY29uZmlnUHJvY2Vzc1swXS5zdWJQcm9jZXNzZXNbMF0uX2lkO1xyXG4gICAgICAgICAgICB2YXIgc3ViUHJvY2Vzc1NlcSA9IDE7XHJcbiAgICAgICAgICAgIF90aGlzLmluc3RhbmNlLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ocHJvY2Vzc0l0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvY2Vzc0l0ZW0uaWQgPT0gcHJvY2Vzc0lkICYmIHByb2Nlc3NJdGVtLnNlcSA9PSBwcm9jZXNzU2VxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NTZXEgPSBwcm9jZXNzSXRlbS5zdWJQcm9jZXNzZXMubGVuZ3RoICsgMVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8gQ2FsbCB0aGUgc3VicHJvY2VzcyBtZXRob2RcclxuXHJcbiAgICAgICAgICAgIFByb2Nlc3Muc3ViUHJvY2Vzcyhwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgZGF0YSwgX3RoaXMpLnRoZW4oZnVuY3Rpb24oc3ViUHJvY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgLy8gR2VuZXJhdGUgdGhlIHV1aWRcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdXVpZCA9IHN1YlByb2Nlc3MuZGF0YS5faWQ7IC8vX3RoaXMucHJvZmlsZSArICc6JyArIF90aGlzLmFwcCArICc6JyArIHByb2Nlc3NJZCArICc6JyArIHByb2Nlc3NTZXEgKyAnOicgKyBzdWJQcm9jZXNzSWQgKyAnOicgKyBzdWJQcm9jZXNzU2VxO1xyXG4gICAgICAgICAgICAgICAgdmFyIGxhYmVsID0gZGF0YS5sYWJlbDtcclxuICAgICAgICAgICAgICAgIC8vIEJ1aWxkIHRoZSBzdWItcHJvY2VzcyByZWZlcmVuY2Ugb2JqZWN0XHJcblxyXG4gICAgICAgICAgICAgICAgLy9UT0RPOiBDaGFuZ2UgcmVxdWlyZWQgdG8gbW92ZSBpc0FjdGl2ZSB0byBzdWJQcm9jZXNzIGZpbGUuUmVtb3ZlIGZyb20gaGVyZVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBzdWJQcm9jZXNzUmVmID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBzdWJQcm9jZXNzSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VicHJvZmlsZUlkOiBzdWJwcm9maWxlSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VxOiBzdWJQcm9jZXNzU2VxLFxyXG4gICAgICAgICAgICAgICAgICAgIHV1aWQ6IHV1aWQsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGxhYmVsXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQWRkIHRoZSByZWZlcmVuY2UgdG8gdGhlIHByb2Nlc3MgbW9kZWxcclxuICAgICAgICAgICAgICAgIHByb2Nlc3NNb2RlbC5zdWJQcm9jZXNzZXMucHVzaChzdWJQcm9jZXNzUmVmKTtcclxuICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUgc3ViUHJvY2VzcyBtb2RlbCB0byB0aGUgc3VicHJvY2Vzc2VzIGFycmF5XHJcbiAgICAgICAgICAgICAgICAvL190aGlzLnN1YnByb2Nlc3Nlcy5wdXNoKHN1YlByb2Nlc3MuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAvLyBfdGhpcy5pbnN0YW5jZS5wcm9jZXNzZXMucHVzaChwcm9jZXNzTW9kZWwpO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IF90aGlzLmluc3RhbmNlLnByb2Nlc3Nlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcHJvY2Vzc0l0ZW0gPSBfdGhpcy5pbnN0YW5jZS5wcm9jZXNzZXNbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzSXRlbS5pZCA9PSBwcm9jZXNzSWQgJiYgcHJvY2Vzc0l0ZW0uc2VxID09IHByb2Nlc3NTZXEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBjdXJyZW50IHByb2Nlc3MgZnJvbSB0aGUgYXJyYXkgYW5kIGFkZCB0aGUgdXBkYXRlZCBwcm9jZXNzTW9kZWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuaW5zdGFuY2UucHJvY2Vzc2VzLnNwbGljZShpbmRleCwgMSwgcHJvY2Vzc01vZGVsKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUHJvY2VzcyB0aGUgaW5kaWNhdG9yIGRvY3VtZW50cyB3b3JrZmxvdyBwcm9jZXNzZXMgdXBkYXRlc1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZGljYXRvcnMgPSBzdWJQcm9jZXNzLmRhdGEuaW5kaWNhdG9ycztcclxuICAgICAgICAgICAgICAgIHZhciBzdGVwID0gc3ViUHJvY2Vzcy5kYXRhLnN0ZXA7XHJcbiAgICAgICAgICAgICAgICBQcm9jZXNzLmluZGljYXRvckRvY3MocHJvY2Vzc0lkLCBpbmRpY2F0b3JzLCBzdGVwLCBfdGhpcykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnUHJvY2VzczogJyArIF90aGlzLmNvbmZpZy5wcm9jZXNzZXNbMF0uX2lkICsgJyBpbml0aWFsaXplZCBzdWNjZXNzZnVsbHkuJywgc3ViUHJvY2Vzc1JlZik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuaW5zdGFuY2UucHJvY2Vzc2VzID0gX3RoaXMuaW5zdGFuY2UucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIShvYmouaWQgPT0gcHJvY2Vzc0lkICYmIG9iai5zZXEgPT0gcHJvY2Vzc1NlcSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXb3JrZmxvdyB0cmFuc2l0aW9uIHRvIHRoZSBuZXh0IHN0ZXAuIFRoaXMgbW92ZXMgdGhlIHdvcmtmbG93IGZyb20gdGhlIGN1cnJlbnQgcHJvY2VzcyxcclxuICogc3ViLXByb2Nlc3Mgc3RlcCB0byB0aGUgbmV4dCBvbmUgYXMgc3BlY2lmaWVkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gcHJvY2VzcyBpZFxyXG4gKiBAcGFyYW0ge251bWJlcn0gcHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBwcm9jZXNzIHNlcVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3ViUHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3ViLXByb2Nlc3MgaWRcclxuICogQHBhcmFtIHtudW1iZXJ9IHN1YlByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2Ugc3ViLXByb2Nlc3Mgc2VxXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdGVwSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdGVwIGlkIFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdHJhbnNpdGlvbklkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gdHJhbnNpdGlvbiBpZFxyXG4gKiBAcGFyYW0ge29iamVjdH0gZGF0YSAtIGFueSBhZGRpdGlvbmFsIGRhdGEgcGFzc2VkIGluIGFzIGtleSB2YWx1ZSBwYWlyc1xyXG4gKlxyXG4gKiBAZXhhbXBsZVxyXG4gKiBXb3JrZmxvdy50cmFuc2l0aW9uKCdwcm9jZXNzSWQnLCAxLCAnc3ViUHJvY2Vzc0lkJywgMSwgJ3N0ZXBJZCcsICd0cmFuc2l0aW9uSWQnLCB7IGtleTogJycsIHZhbHVlOiAnJyB9KTtcclxuICpcclxuICogQHJldHVybiBcIlwiXHJcbiAqXHJcbiAqL1xyXG5Xb3JrZmxvdy5wcm90b3R5cGUudHJhbnNpdGlvbiA9IGZ1bmN0aW9uKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdGVwSWQsIHRyYW5zaXRpb25JZCwgZGF0YSwgc3B1dWlkKSB7XHJcbiAgICAvLyBSZS1hc3NpZ24gdGhpc1xyXG4gICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YXIgbW9kZWwgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXS9zdGVwL2RhdGFcIiwgYXBwLlNDT1BFLndvcmtmbG93LCB7fSlbMF07XHJcblxyXG4gICAgICAgICAgICBQcm9jZXNzLnRyYW5zaXRpb24ocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwgdHJhbnNpdGlvbklkLCBkYXRhLCBfdGhpcywgc3B1dWlkLCBtb2RlbCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGN1cnJlbnQgc3ViLXByb2Nlc3Mgc3RlcCBkYXRhXHJcbiAgICAgICAgICAgICAgICB2YXIgdXBkYXRlID0gZnVuY3Rpb24odHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmluc3RhbmNlLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ocHJvY2Vzc0l0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb2Nlc3NJdGVtLmlkID09IHByb2Nlc3NJZCAmJiBwcm9jZXNzSXRlbS5zZXEgPT0gcHJvY2Vzc1NlcSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NJdGVtLnN1YlByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24oc3ViUHJvY2Vzc0l0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3ViUHJvY2Vzc0l0ZW0uaWQgPT0gc3ViUHJvY2Vzc0lkICYmIHN1YlByb2Nlc3NJdGVtLnNlcSA9PSBzdWJQcm9jZXNzU2VxKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5zdWJwcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHN1YlByb2Nlc3NPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWJQcm9jZXNzT2JqLl9pZCA9PSBzdWJQcm9jZXNzSXRlbS51dWlkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09ICdzdGVwJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc09iai5zdGVwID0gcmVzdWx0LmRhdGEuc3RlcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MocmVzdWx0Lm1lc3NhZ2UsIHN1YlByb2Nlc3NPYmopO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gJ3N0ZXBDb21wbGV0ZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc09iai5zdGVwID0gcmVzdWx0LmRhdGEuc3RlcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc09iai5jb21wbGV0ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MocmVzdWx0Lm1lc3NhZ2UsIHN1YlByb2Nlc3NPYmouc3RlcCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhLnN1YlByb2Nlc3NDb21wbGV0ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGUoJ3N0ZXBDb21wbGV0ZScpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlKCdzdGVwJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcblxyXG4gICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogV29ya2Zsb3cgYXNzaWduIHVzZXIuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBwcm9jZXNzIGlkXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHByb2Nlc3Mgc2VxXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdWJQcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdWItcHJvY2VzcyBpZFxyXG4gKiBAcGFyYW0ge251bWJlcn0gc3ViUHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBzdWItcHJvY2VzcyBzZXFcclxuICogQHBhcmFtIHtzdHJpbmd9IHN0ZXBJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN0ZXAgaWRcclxuICogQHBhcmFtIHtvYmplY3R9IHVzZXIgLSB0aGUgdXNlciBpZCBhbmQgbmFtZSBkYXRhXHJcbiAqXHJcbiAqIEBleGFtcGxlIFwiXCJcclxuICpcclxuICogQHJldHVybiBcIlwiXHJcbiAqXHJcbiAqL1xyXG5Xb3JrZmxvdy5wcm90b3R5cGUuYXNzaWduVXNlciA9IGZ1bmN0aW9uKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCB1c2VyKSB7XHJcbiAgICAvLyBSZS1hc3NpZ24gdGhlIFdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlIGFzIF90aGlzXHJcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIFByb2Nlc3MuYXNzaWduVXNlcihwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgdXNlciwgX3RoaXMpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdvcmtmbG93IHRhc2ssIHRoaXMgbWV0aG9kIGV4ZWN1dGVzIGEgc3BlY2lmaWMgdGFzay5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NJZCAtIHRoZSBwcm9jZXNzIGlkIHRvIHByb2Nlc3NcclxuICogQHBhcmFtIHtvYmplY3R9IGlucHV0RGF0YSAtIHRoZSBpbnB1dCBkYXRhIHRvIHByb2Nlc3NcclxuICpcclxuICogQGV4YW1wbGVcclxuICogV29ya2Zsb3cuaW5pdGlhbGl6ZSgncHJvY2Vzc0lkJywgeyB2YWxpZERhdGU6ICdkYXRlJyB9KTtcclxuICpcclxuICogQHJldHVybiBcIlwiXHJcbiAqXHJcbiAqL1xyXG5Xb3JrZmxvdy5wcm90b3R5cGUudWkgPSBmdW5jdGlvbigpIHtcclxuICAgIC8vIFJlLWFzc2lnbiB0aGUgV29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2UgYXMgX3RoaXNcclxuICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldFByb2Nlc3M6IGZ1bmN0aW9uKHByb2Nlc3NJZCwgbGFuZykge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJJbnRlcmZhY2UuZ2V0UHJvY2Vzcyhwcm9jZXNzSWQsIGxhbmcsIF90aGlzKS50aGVuKGZ1bmN0aW9uKG1vZGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUobW9kZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdvcmtmbG93IHRhc2ssIHRoaXMgbWV0aG9kIGV4ZWN1dGVzIGEgc3BlY2lmaWMgdGFzay5cclxuICpcclxuICogQHBhcmFtIHtvYmplY3R9IGRhdGEgLSB0aGUgcHJvY2VzcyBpZCB0byBwcm9jZXNzXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBpbnB1dCBkYXRhIHRvIHByb2Nlc3NcclxuICogKiBAcGFyYW0ge3N0cmluZ30gdXVpZCAtIHRoZSBpbnB1dCBkYXRhIHRvIHByb2Nlc3NcclxuICpcclxuICogQGV4YW1wbGVcclxuICogV29ya2Zsb3cuZ2V0Tm9kZVZhbHVlKGRhdGEsIF9XRkluc3RhbmNlLCB1dWlkKTtcclxuICpcclxuICogQHJldHVybiBcIlwiXHJcbiAqXHJcbiAqL1xyXG5cclxuV29ya2Zsb3cucHJvdG90eXBlLmdldE5vZGVWYWx1ZSA9IGZ1bmN0aW9uKGRhdGEsIHV1aWQpIHtcclxuICAgIC8vIFJlLWFzc2lnbiB0aGUgV29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2UgYXMgX3RoaXNcclxuICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaGVscGVyLmdldE5vZGVWYWx1ZShkYXRhLCBfdGhpcywgdXVpZCkudGhlbihmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzKTtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KVxyXG59O1xyXG5cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFdvcmtmbG93OyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbGl0eScpO1xyXG52YXIgbm9kZVZhbHVlID0gcmVxdWlyZSgnLi9ub2RlVmFsdWUnKTtcclxudmFyIGZvcm0gPSByZXF1aXJlKCcuL2Zvcm0nKTtcclxudmFyIGhlbHBlciA9IHJlcXVpcmUoJy4vaGVscGVyJyk7XHJcblxyXG52YXIgZ2F0ZWtlZXBlciA9IG5ldyBHSygpO1xyXG5cclxuLyoqXHJcbiAqIEFjdGlvbnMgTW9kdWxlXHJcbiAqXHJcbiAqIEBtb2R1bGUgbGliL2FjdGlvbnNcclxuICogQGF1dGhvciBIYXNhbiBBYmJhc1xyXG4gKiBAdmVyc2lvbiAyLjAuMFxyXG4gKiBAZGVzY3JpcHRpb24gdGVzdCBkZXNjcmlwdGlvblxyXG4gKiBAY29weXJpZ2h0IEt3YW50dSBMdGQgUlNBIDIwMDktMjAxNS5cclxuICpcclxuICovXHJcblxyXG4vKipcclxuICogIEZvcm0gTW9kdWxlIGFjdGlvbnMgbmVlZHMgdG8gYmUgbW92ZWQgaGVyZS5cclxuICogIFRoaXMgYWN0aW9ucyBtb2R1bGUgd2lsbCBiZSBjZW50YWwgcGxhY2UgdG8gaG9sZCBhbGwgZnVuY3Rpb25zLlxyXG4gKiAgXHJcbiAqL1xyXG5cclxudmFyIGNvbW11bml0eSA9IChmdW5jdGlvbigpIHtcclxuXHJcbiAgICByZXR1cm4ge1xyXG5cclxuICAgICAgICBjcmVhdGVDb21tdW5pdHk6IGZ1bmN0aW9uKF9kZWYsIHV1aWQsIF9XRkluc3RhbmNlKSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IHdvcmtlci5nZXRXb3JrZXJXcmFwcGVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYXBwbGljYXRpb25JZCA9IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG5ldyBEYXRlKCkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZW5kZXJVc2VySWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZDtcclxuICAgICAgICAgICAgICAgIHZhciB1dWlkQ29tbXVuaXR5ID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ0NvbW11bml0eSddL19pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZUNvbW11bml0eVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibmV3Q29tbXVuaXR5SWRcIjogX1dGSW5zdGFuY2UucHJvZmlsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbmRpY2F0b3JVVUlEXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQ29tbXVuaXR5XCI6IHV1aWRDb21tdW5pdHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uKHdvcmtlclN1Y2Nlc3MpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1dvcmtlciBwcm9jZXNzZWQgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24od29ya2VyRmFpbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh3b3JrZXJGYWlsKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHVzZXJKb2luQ29tbXVuaXR5OiBmdW5jdGlvbihfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVsZWFzZUFkb3B0ZWRBcHBsaWNhdGlvbjogZnVuY3Rpb24oX2RlZiwgdXVpZCwgX1dGSW5zdGFuY2UpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY29tbXVuaXR5SWQgPSBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbmV3IERhdGUoKS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB1dWlkUmVsZWFzZUFkb3B0ZWRBcHBsaWNhdGlvbiA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pbmRpY2F0b3JzW2lkIGVxICdhZG9wdGVkQXBwbGljYXRpb24nXS9pbnN0YW5jZXNbMV0vdXVpZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWxlYXNlQWRvcHRlZEFwcGxpY2F0aW9uXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21tdW5pdHlJZFwiOiBfV0ZJbnN0YW5jZS5wcm9maWxlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImluZGljYXRvclVVSURcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhZG9wdGVkQXBwbGljYXRpb25cIjogdXVpZFJlbGVhc2VBZG9wdGVkQXBwbGljYXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uKHdvcmtlclN1Y2Nlc3MpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1dvcmtlciBwcm9jZXNzZXMgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24od29ya2VyRmFpbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh3b3JrZXJGYWlsKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSkoKTtcclxuXHJcbnZhciBhcHBsaWNhdGlvbiA9IChmdW5jdGlvbigpIHtcclxuXHJcbiAgICByZXR1cm4ge1xyXG5cclxuICAgICAgICBjcmVhdGVBcHBEZWZpbml0aW9uOiBmdW5jdGlvbihfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5faWQgPSBnZW5lcmF0ZVVVSUQoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jcmVhdGVkRGF0ZVRpbWUgPSBuZXcgRGF0ZSgpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2VuZGVyVXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHV1aWRBcHBsaWNhdGlvbiA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdBcHBsaWNhdGlvbiddL19pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZUFwcGxpY2F0aW9uXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJuZXdBcHBsaWNhdGlvbklkXCI6IF9XRkluc3RhbmNlLnByb2ZpbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5kaWNhdG9yVVVJRFwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkFwcGxpY2F0aW9uXCI6IHV1aWRBcHBsaWNhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hY3Rpb24gPSBhY3Rpb247XHJcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24od29ya2VyU3VjY2Vzcykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya2VyIHByb2Nlc3NlcyBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbih3b3JrZXJGYWlsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdvcmtlckZhaWwpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBidWlsZEFwcGxpY2F0aW9uOiBmdW5jdGlvbihfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5faWQgPSBnZW5lcmF0ZVVVSUQoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jcmVhdGVkRGF0ZVRpbWUgPSBuZXcgRGF0ZSgpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2VuZGVyVXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHV1aWRQdWJsaXNoQXBwbGljYXRpb24gPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnUHVibGlzaEFwcGxpY2F0aW9uJ10vaW5zdGFuY2VzWzFdL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdXVpZEFwcGxpY2F0aW9uRGVmaW5pdGlvbiA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdBcHBsaWNhdGlvbkRlZmluaXRpb24nXS9faWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICAgICAgICAgIHZhciB1dWlkUm9sZXMgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnUm9sZXMnXS9faWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICAgICAgICAgIHZhciB1dWlkQXBwbGljYXRpb24gPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnQXBwbGljYXRpb24nXS9faWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICAgICAgICAgIHZhciB1dWlkQXBwUGVybWlzc2lvbnMgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnQXBwUGVybWlzc2lvbnMnXS9faWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiYnVpbGRBcHBsaWNhdGlvblwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYXBwbGljYXRpb25JZFwiOiBfV0ZJbnN0YW5jZS5wcm9maWxlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImluZGljYXRvclVVSURcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJQdWJsaXNoQXBwbGljYXRpb25cIjogdXVpZFB1Ymxpc2hBcHBsaWNhdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQXBwbGljYXRpb25EZWZpbml0aW9uXCI6IHV1aWRBcHBsaWNhdGlvbkRlZmluaXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJvbGVzXCI6IHV1aWRSb2xlcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQXBwbGljYXRpb25cIjogdXVpZEFwcGxpY2F0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBcHBQZXJtaXNzaW9uc1wiOiB1dWlkQXBwUGVybWlzc2lvbnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uKHdvcmtlclN1Y2Nlc3MpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1dvcmtlciBwcm9jZXNzZXMgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24od29ya2VyRmFpbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh3b3JrZXJGYWlsKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYXBwbGljYXRpb25BZG9wdGlvbjogZnVuY3Rpb24oX2RlZiwgdXVpZCwgX1dGSW5zdGFuY2UpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY29tbXVuaXR5SWQgPSBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbmV3IERhdGUoKS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB1dWlkQWRvcHRpb24gPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnQWRvcHRpb24nXS9pbnN0YW5jZXNbMV0vdXVpZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB1dWlkUHVibGlzaEFwcGxpY2F0aW9uID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ1B1Ymxpc2hBcHBsaWNhdGlvbiddL19pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG4gICAgICAgICAgICAgICAgdmFyIHV1aWRBcHBsaWNhdGlvbiA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdBcHBsaWNhdGlvbiddL19pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJhZG9wdEFwcGxpY2F0aW9uXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHBsaWNhdGlvbklkXCI6IF9XRkluc3RhbmNlLnByb2ZpbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5kaWNhdG9yVVVJRFwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkFkb3B0aW9uXCI6IHV1aWRBZG9wdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUHVibGlzaEFwcGxpY2F0aW9uXCI6IHV1aWRQdWJsaXNoQXBwbGljYXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkFwcGxpY2F0aW9uXCI6IHV1aWRBcHBsaWNhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hY3Rpb24gPSBhY3Rpb247XHJcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24od29ya2VyU3VjY2Vzcykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya2VyIHByb2Nlc3NlcyBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbih3b3JrZXJGYWlsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdvcmtlckZhaWwpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjcmVhdGVUYXhvbm9teTogZnVuY3Rpb24oX2RlZiwgdXVpZCwgX1dGSW5zdGFuY2UpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY29tbXVuaXR5SWQgPSBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbmV3IERhdGUoKS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB0YXhvbm9teVVVSUQgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnVGF4b25vbXknXS9pbnN0YW5jZXNbMV0vdXVpZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVUYXhvbm9teVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGF4b25vbXlVVUlEXCI6IHRheG9ub215VVVJRFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hY3Rpb24gPSBhY3Rpb247XHJcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24od29ya2VyU3VjY2Vzcykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya2VyIHByb2Nlc3NlcyBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbih3b3JrZXJGYWlsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdvcmtlckZhaWwpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSkoKTtcclxuXHJcbnZhciB3b3JrZXIgPSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuXHJcbiAgICAgICAgZ2V0V29ya2VyV3JhcHBlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgd3JhcHBlciA9IHtcclxuICAgICAgICAgICAgICAgIFwic291cmNlXCI6IFwicmVtb3RlXCIsXHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ3b3JrZXJPYmplY3RcIixcclxuICAgICAgICAgICAgICAgIFwiX2lkXCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBcImNoYW5uZWxzXCI6IFtdLFxyXG4gICAgICAgICAgICAgICAgXCJjb21tdW5pdHlJZFwiOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgXCJhcHBsaWNhdGlvbklkXCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJcIixcclxuICAgICAgICAgICAgICAgIFwibWVzc2FnZVR5cGVcIjogXCJpbmZvXCIsXHJcbiAgICAgICAgICAgICAgICBcImNyZWF0ZWREYXRlVGltZVwiOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgXCJzZW5kZXJVc2VySWRcIjogXCJcIixcclxuICAgICAgICAgICAgICAgIFwibm90aWZpY2F0aW9uXCI6IHtcclxuXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgXCJhY3Rpb25cIjoge1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gd3JhcHBlcjtcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZW5kOiBmdW5jdGlvbih3b3JrZXJPYmplY3QpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU3VibWl0dGluZyBXb3JrZXIgT2JqZWN0IHRvIHNlcnZlcicpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cod29ya2VyT2JqZWN0KTtcclxuICAgICAgICAgICAgICAgIGRhby5zYXZlKHdvcmtlck9iamVjdCkuZG9uZShmdW5jdGlvbih3b3JrZXJSZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUod29ya2VyUmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgfSkuZmFpbChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3Igc3VibWl0dGluZyB3b3JrZXIgcmVzcG9uc2UgISEnICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0pKCk7XHJcblxyXG52YXIgcGVyZm9ybWFuY2UgPSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuXHJcbiAgICAgICAgY3JlYXRlOiBmdW5jdGlvbihfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5faWQgPSBnZW5lcmF0ZVVVSUQoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jcmVhdGVkRGF0ZVRpbWUgPSBuZXcgRGF0ZSgpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2VuZGVyVXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHV1aWRDb21tdW5pdHkgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAncGxhbiddL19pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZVBsYW5cIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBsYW5VVUlEXCI6IHV1aWRDb21tdW5pdHlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uKHdvcmtlclN1Y2Nlc3MpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1dvcmtlciBwcm9jZXNzZWQgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24od29ya2VyRmFpbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh3b3JrZXJGYWlsKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb25maWd1cmVOb2RlOiBmdW5jdGlvbihfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5faWQgPSBnZW5lcmF0ZVVVSUQoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jcmVhdGVkRGF0ZVRpbWUgPSBuZXcgRGF0ZSgpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2VuZGVyVXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHV1aWROb2RlSW5TdWJQcm9jZXNzID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ25vZGUnXS9pbnN0YW5jZXNbMV0vdXVpZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb25maWd1cmVOb2RlXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJub2RlVVVJRFwiOiB1dWlkTm9kZUluU3ViUHJvY2Vzc1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hY3Rpb24gPSBhY3Rpb247XHJcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24od29ya2VyU3VjY2Vzcykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya2VyIHByb2Nlc3NlZCBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbih3b3JrZXJGYWlsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdvcmtlckZhaWwpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdW5sb2NrUGVyaW9kOiBmdW5jdGlvbihfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBzdWJwcm9jZXNzT2JqZWN0ID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGVudHJ5VVVJRCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tpZCBlcSAnXCIgKyBQRVJJT0RfU0VUX0lEICsgXCInXS9pbnN0YW5jZXMvdXVpZFwiLCBzdWJwcm9jZXNzT2JqZWN0LCB7fSlbMF07XHJcbiAgICAgICAgICAgICAgICB2YXIgZW5kZGF0ZSA9IHN1YnByb2Nlc3NPYmplY3QuZGF0ZXMudmFsaWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgbGlicmFyeS51bmxvY2tQZXJpb2QoZW50cnlVVUlELCBlbmRkYXRlKS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHV1aWRTYXZlZEluZGljYXRvciA9IGRhdGEuaWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRhby5nZXQodXVpZFNhdmVkSW5kaWNhdG9yKS5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvciA9IF9XRkluc3RhbmNlLmluZGljYXRvcnNbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGljYXRvci5faWQgPT0gZGF0YS5faWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5wdXNoKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdVbmxvY2sgcGVyaW9kLicsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSkuZmFpbChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbG9ja1BlcmZvcm1hbmNlTW9kZWw6IGZ1bmN0aW9uKF9kZWYsIHV1aWQsIF9XRkluc3RhbmNlKSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHN1YnByb2Nlc3NPYmplY3QgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZW50cnlVVUlEID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2lkIGVxICdcIiArIFBFUkZPUk1BTkNFX1NFVF9JRCArIFwiJ10vaW5zdGFuY2VzL3V1aWRcIiwgc3VicHJvY2Vzc09iamVjdCwge30pWzBdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGVuZGRhdGUgPSBzdWJwcm9jZXNzT2JqZWN0LmRhdGVzLnZhbGlkO1xyXG5cclxuICAgICAgICAgICAgICAgIGxpYnJhcnkubG9ja1BlcmZvcm1hbmNlTW9kZWwoZW50cnlVVUlELCBlbmRkYXRlKS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHV1aWRTYXZlZEluZGljYXRvciA9IGRhdGEuaWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRhby5nZXQodXVpZFNhdmVkSW5kaWNhdG9yKS5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvciA9IF9XRkluc3RhbmNlLmluZGljYXRvcnNbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGljYXRvci5faWQgPT0gZGF0YS5faWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5wdXNoKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdMb2NrIHBlcmZvcm1hbmNlIG1vZGVsLicsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSkuZmFpbChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59KSgpO1xyXG5cclxudmFyIHNkbyA9IChmdW5jdGlvbigpIHtcclxuXHJcbiAgICByZXR1cm4ge1xyXG5cclxuICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uKF9kZWYsIHV1aWQsIF9XRkluc3RhbmNlKSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IHdvcmtlci5nZXRXb3JrZXJXcmFwcGVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYXBwbGljYXRpb25JZCA9IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG5ldyBEYXRlKCkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZW5kZXJVc2VySWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZDtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgc2RvVVVJRCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pbmRpY2F0b3JzW2lkIGVxICdTRE8nXS9pbnN0YW5jZXNbMV0vdXVpZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVTRE9cIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNkb1VVSURcIjogc2RvVVVJRFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hY3Rpb24gPSBhY3Rpb247XHJcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24od29ya2VyU3VjY2Vzcykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya2VyIHByb2Nlc3NlcyBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbih3b3JrZXJGYWlsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdvcmtlckZhaWwpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSkoKTtcclxuXHJcbnZhciB0YXhvbm9teSA9IChmdW5jdGlvbigpIHtcclxuXHJcbiAgICByZXR1cm4ge1xyXG5cclxuICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uKF9kZWYsIHV1aWQsIF9XRkluc3RhbmNlKSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IHdvcmtlci5nZXRXb3JrZXJXcmFwcGVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYXBwbGljYXRpb25JZCA9IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG5ldyBEYXRlKCkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZW5kZXJVc2VySWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZDtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdGF4b25vbXlVVUlEID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ1RheG9ub215J10vaW5zdGFuY2VzWzFdL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY3JlYXRlVGF4b25vbXlcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRheG9ub215VVVJRFwiOiB0YXhvbm9teVVVSURcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uKHdvcmtlclN1Y2Nlc3MpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1dvcmtlciBwcm9jZXNzZXMgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24od29ya2VyRmFpbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh3b3JrZXJGYWlsKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0pKCk7XHJcblxyXG52YXIgc3ViUHJvY2Vzc0luc3RhbmNlID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHJldHVybiB7XHJcblxyXG4gICAgICAgIHNldFRpdGxlOiBmdW5jdGlvbihfZGVmLCB1dWlkLCBkYXRhVmFsdWUsIF9XRkluc3RhbmNlKSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHNwUHJvY2Vzc09iamVjdCA9IEpTT04ueHBhdGgoXCIvaW5zdGFuY2UvcHJvY2Vzc2VzL3N1YlByb2Nlc3Nlc1t1dWlkIGVxICdcIiArIHV1aWQgKyBcIiddXCIsIGFwcC5TQ09QRS53b3JrZmxvdywge30pWzBdO1xyXG4gICAgICAgICAgICAgICAgc3BQcm9jZXNzT2JqZWN0LmxhYmVsID0gZGF0YVZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBpdGVtc1RvUHJvY2VzcyA9IDE7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3R1ZmYgPSBbXTtcclxuICAgICAgICAgICAgICAgIHZhciBvYmogPSB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICBvYmoubW9kZWwgPSBfV0ZJbnN0YW5jZS5pbnN0YW5jZTtcclxuICAgICAgICAgICAgICAgIHN0dWZmLnB1c2gob2JqKTtcclxuICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdTdWJwcm9jZXNzIHNldFRpdGxlIHN1Y2Nlc3MuJywgX1dGSW5zdGFuY2UuaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNldFZhbGlkRGF0ZTogZnVuY3Rpb24oX2RlZiwgdXVpZCwgZGF0YVZhbHVlLCBfV0ZJbnN0YW5jZSkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBzcFByb2Nlc3NPYmplY3QgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ11cIiwgYXBwLlNDT1BFLndvcmtmbG93LCB7fSlbMF07XHJcbiAgICAgICAgICAgICAgICBzcFByb2Nlc3NPYmplY3QuZGF0ZXMudmFsaWQgPSBkYXRhVmFsdWU7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW1zVG9Qcm9jZXNzID0gMTtcclxuICAgICAgICAgICAgICAgIHZhciBzdHVmZiA9IFtdO1xyXG4gICAgICAgICAgICAgICAgdmFyIG9iaiA9IHt9O1xyXG5cclxuICAgICAgICAgICAgICAgIG9iai5tb2RlbCA9IHNwUHJvY2Vzc09iamVjdDtcclxuICAgICAgICAgICAgICAgIHN0dWZmLnB1c2gob2JqKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygndmFsaWQgZGF0ZSBzZXQuJywgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzKTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSkoKTtcclxuXHJcbnZhciB2YXJpYWJsZXMgPSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuXHJcbiAgICAgICAgc2V0VmFyaWFibGU6IGZ1bmN0aW9uKHNldFZhcmlhYmxlLCBfV0ZJbnN0YW5jZSwgdXVpZCkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGhlbHBlci5nZXROb2RlVmFsdWUoc2V0VmFyaWFibGUuZGF0YSwgX1dGSW5zdGFuY2UsIHV1aWQpLnRoZW4oZnVuY3Rpb24oZGF0YVZhbHVlKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2NvcGUgPSBzZXRWYXJpYWJsZS5zY29wZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFyaWFibGVOYW1lID0gc2V0VmFyaWFibGUubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFyaWFibGVUeXBlID0gc2V0VmFyaWFibGUudmFyaWFibGVUeXBlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsaWREYXRlID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2RhdGVzL3ZhbGlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoc2NvcGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncHJvZmlsZSc6XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb2ZpbGVJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvZmlsZVZhcmlhYmxlRmlsZU5hbWUgPSBwcm9maWxlSWQgKyAnOnZhcmlhYmxlcyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYW8uZ2V0KHByb2ZpbGVWYXJpYWJsZUZpbGVOYW1lKS5kb25lKGZ1bmN0aW9uKGZpbGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhcmlhYmxlVHlwZSA9PSAncGVyaW9kaWMnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm9jZXNzT2JqID0gSlNPTi54cGF0aChcIi9pbnN0YW5jZS9wcm9jZXNzZXNbc3ViUHJvY2Vzc2VzL3V1aWQgZXEgJ1wiICsgdXVpZCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlcSA9IHByb2Nlc3NPYmouc2VxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJQcm9jZXNzVVVJRFwiOiB1dWlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VyXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVzZXJOYW1lXCI6IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VySWRcIjogTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VyUHJvZmlsZUlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZXFcIjogc2VxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWxpZERhdGVcIjogdmFsaWREYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBkYXRhVmFsdWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmFsKCdmaWxlLicgKyB2YXJpYWJsZU5hbWUgKyAnLnB1c2gob2JqKScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlW3ZhcmlhYmxlTmFtZV0gPSBkYXRhVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYW8udXBzZXJ0KGZpbGUpLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKFwiVmFyaWFibGUgc2V0IHN1Y2Nlc3NmdWxseVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChcIkZhaWxlZCB0byBzZXQgVmFyaWFibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuZmFpbChmdW5jdGlvbihlcnJvcikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlsZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJfaWRcIjogcHJvZmlsZVZhcmlhYmxlRmlsZU5hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZS5jaGFubmVscyA9IGFwcC5wcm9maWxlLmNoYW5uZWxzO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFyaWFibGVUeXBlID09ICdwZXJpb2RpYycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb2Nlc3NPYmogPSBKU09OLnhwYXRoKFwiL2luc3RhbmNlL3Byb2Nlc3Nlc1tzdWJQcm9jZXNzZXMvdXVpZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VxID0gcHJvY2Vzc09iai5zZXE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVbdmFyaWFibGVOYW1lXSA9IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN1YlByb2Nlc3NVVUlEXCI6IHV1aWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVzZXJcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlck5hbWVcIjogTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VybmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVzZXJJZFwiOiBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJQcm9maWxlSWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlcVwiOiBzZXEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbGlkRGF0ZVwiOiB2YWxpZERhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IGRhdGFWYWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlW3ZhcmlhYmxlTmFtZV0gPSBkYXRhVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYW8udXBzZXJ0KGZpbGUpLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKFwiVmFyaWFibGUgc2V0IHN1Y2Nlc3NmdWxseVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChcIkZhaWxlZCB0byBzZXQgVmFyaWFibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N1YlByb2Nlc3NJbnN0YW5jZSc6XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShcIm5vdCBpbXBsZW1lbnRlZFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3RlcCc6XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShcIm5vdCBpbXBsZW1lbnRlZFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJnZXROb2RlVmFsdWUgdmFsdWUgbm90IGZvdW5kLlwiKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0pKCk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgICBjb21tdW5pdHk6IGNvbW11bml0eSxcclxuICAgIGFwcGxpY2F0aW9uOiBhcHBsaWNhdGlvbixcclxuICAgIHBlcmZvcm1hbmNlOiBwZXJmb3JtYW5jZSxcclxuICAgIHdvcmtlcjogd29ya2VyLFxyXG4gICAgc2RvOiBzZG8sXHJcbiAgICB0YXhvbm9teTogdGF4b25vbXksXHJcbiAgICBzdWJQcm9jZXNzSW5zdGFuY2U6IHN1YlByb2Nlc3NJbnN0YW5jZSxcclxuICAgIHZhcmlhYmxlczogdmFyaWFibGVzXHJcbn0iLCIndXNlIHN0cmljdCc7XHJcblxyXG4vL3ZhciBnYXRla2VlcGVyID0gcmVxdWlyZSgnLi4vYm93ZXJfY29tcG9uZW50cy9nYXRla2VlcGVyJyk7XHJcbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbGl0eScpO1xyXG5cclxuLy8gdmFyIHV1aWQgPSByZXF1aXJlKCdub2RlLXV1aWQnKTtcclxuXHJcbnZhciBnYXRla2VlcGVyID0gbmV3IEdLKCk7XHJcblxyXG4vKipcclxuICogRm9ybSBNb2R1bGVcclxuICpcclxuICogQG1vZHVsZSBsaWIvZm9ybVxyXG4gKiBAYXV0aG9yIEJyZW50IEdvcmRvblxyXG4gKiBAdmVyc2lvbiAyLjAuMFxyXG4gKiBAZGVzY3JpcHRpb24gdGVzdCBkZXNjcmlwdGlvblxyXG4gKiBAY29weXJpZ2h0IEt3YW50dSBMdGQgUlNBIDIwMDktMjAxNS5cclxuICpcclxuICovXHJcblxyXG5mdW5jdGlvbiBjcmVhdGUoYXJncykge1xyXG5cclxuICAgIHZhciBwcm9jZXNzSWQgPSBhcmdzWzBdIHx8ICcnO1xyXG5cclxuICAgIHZhciBzdWJQcm9jZXNzID0gYXJnc1sxXSB8fCB7fTtcclxuXHJcbiAgICB2YXIgc3RlcCA9IGFyZ3NbMl0gfHwge307XHJcblxyXG4gICAgdmFyIGFjdGlvbiA9IGFyZ3NbM10gfHwge307XHJcblxyXG4gICAgdmFyIF9XRkluc3RhbmNlID0gYXJnc1s2XSB8fCB7fTtcclxuXHJcbiAgICB2YXIgZGF0YSA9IGFyZ3NbNl0gfHwge307XHJcblxyXG4gICAgdmFyIGluZGljYXRvcnMgPSBzdWJQcm9jZXNzLmluZGljYXRvcnMgfHwgW107XHJcblxyXG4gICAgdmFyIHJlc3VsdCA9IFtdO1xyXG5cclxuICAgIHZhciBpbmRpY2F0b3JUeXBlID0gYWN0aW9uLl90eXBlO1xyXG5cclxuICAgIHZhciBwcm9jZXNzU2VxID0gYXJnc1s0XSB8fCAnJztcclxuXHJcbiAgICB2YXIgc3ViUHJvY2Vzc1NlcSA9IGFyZ3NbNV0gfHwgJyc7XHJcblxyXG4gICAgdmFyIGNyZWF0ZVR5cGUgPSBhcmdzWzddIHx8ICcnO1xyXG5cclxuICAgIHZhciBzdWJQcm9jZXNzSWQgPSBzdWJQcm9jZXNzLl9pZDtcclxuXHJcbiAgICB2YXIgdXVpZCA9IGFyZ3NbOF0gfHwgJyc7XHJcblxyXG4gICAgdmFyIGJhc2VVVUlEID0gYXJnc1s5XSB8fCAnJztcclxuXHJcbiAgICB2YXIgcHJvZmlsZSA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XHJcblxyXG4gICAgdmFyIGlucHV0RGF0YSA9IGFyZ3NbMTBdIHx8IHt9O1xyXG5cclxuICAgIHZhciBmb3JtQ3JlYXRlVHlwZSA9IGFjdGlvbi5tZXRob2QuZm9ybS5jcmVhdGU7XHJcblxyXG4gICAgdmFyIGZvcm1UeXBlID0gYWN0aW9uLm1ldGhvZC5mb3JtLnR5cGU7XHJcblxyXG4gICAgdmFyIHBhcmFtT2JqZWN0ID0ge1xyXG5cclxuICAgICAgICBcImZvcm1DcmVhdGVUeXBlXCI6IGZvcm1DcmVhdGVUeXBlLFxyXG4gICAgICAgIFwiZm9ybVR5cGVcIjogZm9ybVR5cGVcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHZhciB0b1Byb2Nlc3MgPSBpbmRpY2F0b3JzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgdmFyIHN1YnByb2Nlc3NUeXBlID0gSlNPTi54cGF0aChcIi9jb25maWcvcHJvY2Vzc2VzL3N1YlByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3ViUHJvY2Vzc0lkICsgXCInXS90eXBlXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcblxyXG4gICAgICAgIHZhciBmb3JtQ3JlYXRlRm4gPSBmdW5jdGlvbihpbmRpY2F0b3JUeXBlLCBpbmRpY2F0b3JJZCwgdmFsaWREYXRlLCBpbnN0YW50aWF0ZVNvdXJjZSkge1xyXG5cclxuICAgICAgICAgICAgZ2F0ZWtlZXBlci5pbnN0YW50aWF0ZShiYXNlVVVJRCwgaW5kaWNhdG9yVHlwZSwgaW5kaWNhdG9ySWQsIF9XRkluc3RhbmNlLnByb2ZpbGUsIHZhbGlkRGF0ZSwgc3ViUHJvY2Vzc0lkLCBzdWJwcm9jZXNzVHlwZSkudGhlbihmdW5jdGlvbihkb2NBcnJheSkge1xyXG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBpbmRpY2F0b3Igd29ya2Zsb3cgcHJvY2Vzc2VzIHNlY3Rpb25cclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRvY0FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9iamVjdCA9IGRvY0FycmF5W2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghb2JqZWN0Lm1vZGVsLl9pZC5lbmRzV2l0aCgnOmFwcHJvdmVkJykgJiYgIW9iamVjdC5tb2RlbC5faWQuZW5kc1dpdGgoJzpyZWplY3RlZCcpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgd29ya2Zsb3dPYmogPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IF9XRkluc3RhbmNlLmNvbmZpZy5faWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImluc3RhbmNlXCI6IF9XRkluc3RhbmNlLmluc3RhbmNlLl9pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvY2Vzc2VzXCI6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBwcm9jZXNzSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJQcm9jZXNzSWRcIjogc3ViUHJvY2Vzcy5faWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJQcm9jZXNzVVVJRFwiOiB1dWlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3RlcFwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogc3RlcC5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZXFcIjogc3RlcC5zZXEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3RhcnREYXRlXCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3RhdHVzXCI6IHN0ZXAuc3RhdHVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogc3RlcC5tZXNzYWdlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFzc2lnbmVkVG9cIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VySWRcIjogc3RlcC5hc3NpZ25lZFRvLnVzZXJJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBzdGVwLmFzc2lnbmVkVG8ubmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbW1lbnRcIjogc3RlcC5jb21tZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbXBsZXRlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImVuZERhdGVcIjogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uLnNldFdvcmtmbG93TGFiZWxJblRpdGxlICE9IHVuZGVmaW5lZCAmJiBhY3Rpb24uc2V0V29ya2Zsb3dMYWJlbEluVGl0bGUgIT0gJycgJiYgYWN0aW9uLnNldFdvcmtmbG93TGFiZWxJblRpdGxlID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdC5tb2RlbC50aXRsZSA9IGlucHV0RGF0YS5sYWJlbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGlvbi5zZXREcmFmdCAhPSB1bmRlZmluZWQgJiYgYWN0aW9uLnNldERyYWZ0ICE9ICcnICYmIGFjdGlvbi5zZXREcmFmdCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3QubW9kZWwuY29udHJvbC5kcmFmdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdC5tb2RlbC53b3JrZmxvd3MucHVzaCh3b3JrZmxvd09iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYWluSWQgPSBvYmplY3QubW9kZWwuX2lkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwZXJzaXN0IHZpYSBnayBzbyB0aGF0IGl0IGlzIHNhdmUgaW4gY291Y2hcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2F0ZWtlZXBlci5wZXJzaXN0KGRvY0FycmF5KS50aGVuKGZ1bmN0aW9uKHNhdmVkQXJyYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdXNpbmcgc2FtZSBpZCBjYWxsIGluaXRpYWxpc2VEYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NhbGwgY29kZSB0byBzZXQgdG8gc2V0SW5zdGFuY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhby5nZXQobWFpbklkKS5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvck1vZGVsID0ga28ubWFwcGluZy5mcm9tSlMoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRlZmF1bHRNb2RlbFwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNldElkXCI6IGluZGljYXRvcklkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2F0ZWtlZXBlci5pbnN0YW50aWF0ZURhdGEobWFpbklkLCBpbnN0YW50aWF0ZVNvdXJjZSwgaW5kaWNhdG9yTW9kZWwsIGRhdGEubW9kZWwucGVuZGluZy5zZXEsIHBhcmFtT2JqZWN0KS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFbMF0uc3RhdHVzID09IFwiMjAwXCIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uLnNldFdvcmtmbG93TGFiZWxJbkZpZWxkICE9IHVuZGVmaW5lZCAmJiBhY3Rpb24uc2V0V29ya2Zsb3dMYWJlbEluRmllbGQgIT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXNzaWdubWVudFNldElkID0gYWN0aW9uLnNldFdvcmtmbG93TGFiZWxJbkZpZWxkLnNwbGl0KFwiLlwiKVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXNzaWdubWVudFNldElkID09IGluZGljYXRvcklkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGFbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGF0aCA9IFwiZGF0YVswXS5tb2RlbC5tb2RlbC5wZW5kaW5nLmRhdGEuXCIgKyBhY3Rpb24uc2V0V29ya2Zsb3dMYWJlbEluRmllbGQgKyBcIj0nXCIgKyBpbnB1dERhdGEubGFiZWwgKyBcIidcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZhbChwYXRoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhdGVrZWVwZXIucGVyc2lzdChkYXRhKS50aGVuKGZ1bmN0aW9uKHNhdmVkQXJyYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYW8uZ2V0KG1haW5JZCkuZG9uZShmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnB1c2goZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b1Byb2Nlc3MtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b1Byb2Nlc3MgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5LicsIF9XRkluc3RhbmNlLmluZGljYXRvcnMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3VuZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IF9XRkluc3RhbmNlLmluZGljYXRvcnMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvciA9IF9XRkluc3RhbmNlLmluZGljYXRvcnNbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRpY2F0b3IuX2lkID09IGRhdGEuX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBjdXJyZW50IGl0ZW0gZnJvbSB0aGUgYXJyYXkgYW5kIGFkZCB0aGUgdXBkYXRlZCBwcm9jZXNzTW9kZWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnB1c2goZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvUHJvY2Vzcy0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9Qcm9jZXNzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5LicsIF9XRkluc3RhbmNlLmluZGljYXRvcnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3VuZCA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9Qcm9jZXNzLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRvUHJvY2VzcyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5LicsIF9XRkluc3RhbmNlLmluZGljYXRvcnMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmYWlsdXJlID0gdXRpbC5zdWNjZXNzKCcxIEdhdGVrZWVwZXIgaW5pdGlhbGlzYXRpb24gZmFpbGVkIHdpdGggaW5pdGlhbGlzZURhdGEgbWVzc2FnZSAnICsgZXJyWzBdLm1lc3NhZ2UsIHt9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGZhaWx1cmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmFpbHVyZSA9IHV0aWwuc3VjY2VzcygnMiBHYXRla2VlcGVyIGluaXRpYWxpc2F0aW9uIGZhaWxlZCB3aXRoIGluaXRpYWxpc2VEYXRhIG1lc3NhZ2UgJyArIGVyclswXS5tZXNzYWdlLCB7fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGZhaWx1cmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZhaWx1cmUgPSB1dGlsLnN1Y2Nlc3MoJzMgR2F0ZWtlZXBlciBpbml0aWFsaXNhdGlvbiBmYWlsZWQgd2l0aCBpbml0aWFsaXNlRGF0YSBtZXNzYWdlICcgKyBlcnJbMF0ubWVzc2FnZSwge30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGZhaWx1cmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmFpbHVyZSA9IHV0aWwuc3VjY2VzcygnNCBHYXRla2VlcGVyIGluaXRpYWxpc2F0aW9uIGZhaWxlZCB3aXRoIGluaXRpYWxpc2VEYXRhIG1lc3NhZ2UgJyArIGVyclswXS5tZXNzYWdlLCB7fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChmYWlsdXJlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmFpbHVyZSA9IHV0aWwuc3VjY2VzcygnNSBHYXRla2VlcGVyIGluaXRpYWxpc2F0aW9uIGZhaWxlZCB3aXRoIGluaXRpYWxpc2VEYXRhIG1lc3NhZ2UgJyArIGVyclswXS5tZXNzYWdlLCB7fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGZhaWx1cmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmFpbHVyZSA9IHV0aWwuc3VjY2VzcygnNiBHYXRla2VlcGVyIGluaXRpYWxpc2F0aW9uIGZhaWxlZCB3aXRoIGluaXRpYWxpc2VEYXRhIG1lc3NhZ2UgJyArIGVyclswXS5tZXNzYWdlLCB7fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFpbHVyZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdG9BZGRQcm9jZXNzID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IF9XRkluc3RhbmNlLmluc3RhbmNlLnByb2Nlc3Nlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfV0ZJbnN0YW5jZS5pbnN0YW5jZS5wcm9jZXNzZXNbaV0uc3ViUHJvY2Vzc2VzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9BZGRQcm9jZXNzLnB1c2goX1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluc3RhbmNlLnByb2Nlc3NlcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzID0gdG9BZGRQcm9jZXNzO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB0b0FkZFN1YlByb2Nlc3MgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlc1tpXS5pbmRpY2F0b3JzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9BZGRTdWJQcm9jZXNzLnB1c2goX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLnN1YnByb2Nlc3NlcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzID0gdG9BZGRTdWJQcm9jZXNzO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgIHZhciBmYWlsdXJlID0gdXRpbC5zdWNjZXNzKCc3IEdhdGVrZWVwZXIgaW5pdGlhbGlzYXRpb24gZmFpbGVkIHdpdGggaW5pdGlhbGlzZURhdGEgbWVzc2FnZSAnICsgZXJyWzBdLm1lc3NhZ2UsIHt9KTtcclxuICAgICAgICAgICAgICAgIHJlamVjdChmYWlsdXJlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmFyIGluc3RhbnRpYXRlU291cmNlID0gRlJPTV9ERUZJTklUSU9OO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBjb3VudGVyID0gMDsgY291bnRlciA8IGluZGljYXRvcnMubGVuZ3RoOyBjb3VudGVyKyspIHtcclxuICAgICAgICAgICAgdmFyIGluZGljYXRvcklkID0gaW5kaWNhdG9yc1tjb3VudGVyXS5faWQ7XHJcbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JOYW1lID0gdXRpbC5nZXROYW1lKGluZGljYXRvcnNbY291bnRlcl0ubmFtZSwgJ2VuJyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgc291cmNlID0gaW5kaWNhdG9yc1tjb3VudGVyXS5pbml0aWF0ZURhdGE7XHJcblxyXG4gICAgICAgICAgICB2YXIgaW5pdFR5cGUgPSAnJztcclxuICAgICAgICAgICAgaWYgKHN1YlByb2Nlc3MuaW5zdGFuY2VUeXBlLm5ld1NlcXVlbmNlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaW5pdFR5cGUgPSBJTlNUQU5DRV9UWVBFX05FV19TRVE7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3ViUHJvY2Vzcy5pbnN0YW5jZVR5cGUubmV3SW5zdGFuY2UgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpbml0VHlwZSA9IElOU1RBTkNFX1RZUEVfTkVXX0lOUztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGluZGljYXRvckRvYyA9IHt9O1xyXG4gICAgICAgICAgICBpZiAoYmFzZVVVSUQgIT0gdW5kZWZpbmVkICYmIGJhc2VVVUlEICE9ICcnICYmIGJhc2VVVUlELmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgc3AgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgYmFzZVVVSUQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcbiAgICAgICAgICAgICAgICBzcC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGluc3RhbnRpYXRlU291cmNlID0gRlJPTV9BVVRIT1JJU0VEO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBjYXJkaW5hbGl0eSA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tzZXRJZCBlcSAnXCIgKyBpbmRpY2F0b3JJZCArIFwiJ10vY2FyZGluYWxpdHlcIiwgYXBwLlNDT1BFLkFQUF9DT05GSUcsIHt9KVswXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaW5pdFR5cGUgPT0gSU5TVEFOQ0VfVFlQRV9ORVdfSU5TKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYXJkaW5hbGl0eSA9PSBJTkRJQ0FUT1JfQ0FSRElOQUxJVFlfU0lOR0xFKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXhpc3RpbmdVVUlEID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ1wiICsgaW5kaWNhdG9ySWQgKyBcIiddL19pZFwiLCBfV0ZJbnN0YW5jZSwge30pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV4aXN0aW5nVVVJRC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW50aWF0ZVNvdXJjZSA9IEZST01fQVVUSE9SSVNFRDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbnRpYXRlU291cmNlID0gRlJPTV9ERUZJTklUSU9OO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFudGlhdGVTb3VyY2UgPSBGUk9NX0RFRklOSVRJT047XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYXJkaW5hbGl0eSA9PSBJTkRJQ0FUT1JfQ0FSRElOQUxJVFlfU0lOR0xFKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXhpc3RpbmdVVUlEID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ1wiICsgaW5kaWNhdG9ySWQgKyBcIiddL19pZFwiLCBhcHAuU0NPUEUud29ya2Zsb3csIHt9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChleGlzdGluZ1VVSUQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFudGlhdGVTb3VyY2UgPSBGUk9NX0FVVEhPUklTRUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW50aWF0ZVNvdXJjZSA9IEZST01fREVGSU5JVElPTjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhdGggPSBcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ1wiICsgaW5kaWNhdG9ySWQgKyBcIiddL19pZFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3VicHJvY2Vzc1R5cGUgPT0gUFJPQ0VTU19UWVBFX1NVQlBST0ZJTEUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGggPSBcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ1wiICsgaW5kaWNhdG9ySWQgKyBcIicgYW5kIGlkID0gL3N1YnByb2Nlc3Nlc1tpZCA9ICdcIiArIHN1YlByb2Nlc3NJZCArIFwiJyBhbmQgaWQgPSAvaW5zdGFuY2UvcHJvY2Vzc2VzL3N1YlByb2Nlc3Nlc1tzdWJwcm9maWxlSWQgZXEgJ1wiICsgYXBwLnByb2ZpbGUuc3VicHJvZmlsZUlkICsgXCInXS91dWlkXS9pbmRpY2F0b3JzL2luc3RhbmNlcy91dWlkXS9faWRcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXhpc3RpbmdVVUlEID0gSlNPTi54cGF0aChwYXRoLCBfV0ZJbnN0YW5jZSwge30pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV4aXN0aW5nVVVJRC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW50aWF0ZVNvdXJjZSA9IEZST01fQVVUSE9SSVNFRDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbnRpYXRlU291cmNlID0gRlJPTV9ERUZJTklUSU9OO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3JtQ3JlYXRlRm4oaW5pdFR5cGUsIGluZGljYXRvcklkLCAnJywgaW5zdGFudGlhdGVTb3VyY2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIHNldEluc3RhbmNlVGl0bGUoYXJncykge1xyXG5cclxuICAgIHZhciBfV0ZJbnN0YW5jZSA9IGFyZ3NbMF0gfHwge307XHJcblxyXG4gICAgdmFyIHV1aWQgPSBhcmdzWzJdIHx8ICcnO1xyXG4gICAgdmFyIGRhdGEgPSBhcmdzWzRdIHx8IHt9O1xyXG5cclxuICAgIHZhciB0aXRsZSA9IGRhdGEubGFiZWw7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICB2YXIgc3ViUHJvY2Vzc0luc3RhbmNlID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcbiAgICAgICAgdmFyIGluZGljYXRvckluc3RhbmNlcyA9IHN1YlByb2Nlc3NJbnN0YW5jZS5pbmRpY2F0b3JzO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluZGljYXRvckluc3RhbmNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgaW5kaWNhdG9yVVVJRCA9IGluZGljYXRvckluc3RhbmNlc1tpXS5pbnN0YW5jZXNbMF0udXVpZDtcclxuICAgICAgICAgICAgdmFyIGluZGljYXRvckluc3RhbmNlID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW19pZCBlcSAnXCIgKyBpbmRpY2F0b3JVVUlEICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG4gICAgICAgICAgICBpbmRpY2F0b3JJbnN0YW5jZS50aXRsZSA9IGluZGljYXRvckluc3RhbmNlc1tpXS5pZCArICcgJyArIHRpdGxlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJlc29sdmUoXCJTZXQgVGl0bGUgU3VjY2Vzc1wiLCBpbmRpY2F0b3JJbnN0YW5jZXMpO1xyXG5cclxuICAgIH0pO1xyXG5cclxufTtcclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZVByb2ZpbGUoYXJncykge1xyXG5cclxuICAgIHZhciBfV0ZJbnN0YW5jZSA9IGFyZ3NbMF0gfHwge307XHJcblxyXG4gICAgdmFyIHByb2ZpbGVJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0ge1xyXG4gICAgICAgICAgICBcInNvdXJjZVwiOiBcInJlbW90ZVwiLFxyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJ3b3JrZXJPYmplY3RcIixcclxuICAgICAgICAgICAgXCJfaWRcIjogZ2VuZXJhdGVVVUlEKCksXHJcbiAgICAgICAgICAgIFwiY2hhbm5lbHNcIjogW10sXHJcbiAgICAgICAgICAgIFwiY29tbXVuaXR5SWRcIjogYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCksXHJcbiAgICAgICAgICAgIFwiYXBwbGljYXRpb25JZFwiOiBhcHAuU0NPUEUuYXBwbGljYXRpb25JZCxcclxuICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiXCIsXHJcbiAgICAgICAgICAgIFwibWVzc2FnZVR5cGVcIjogXCJpbmZvXCIsXHJcbiAgICAgICAgICAgIFwiY3JlYXRlZERhdGVUaW1lXCI6IG1vbWVudCgpLmZvcm1hdCgpLFxyXG4gICAgICAgICAgICBcInNlbmRlclVzZXJJZFwiOiBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZCxcclxuICAgICAgICAgICAgXCJub3RpZmljYXRpb25cIjoge1xyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwcm9maWxlXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWN0aW9uXCI6IFwiZGVsZXRlUHJvZmlsZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJwcm9maWxlSWRcIjogcHJvZmlsZUlkXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyh3b3JrZXJPYmplY3QpO1xyXG4gICAgICAgIGRhby51cHNlcnQod29ya2VyT2JqZWN0KS5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJXb3JrZXIgT2JqZWN0IHN1Ym1pdHRlZCBmb3IgcHJvZmlsZShcIiArIHByb2ZpbGVJZCArIFwiKSBkZWxldGlvbi5cIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgIH0pLmZhaWwoZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgIHJlamVjdChkYXRhKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuXHJcbn07XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVQcm9maWxlKGFyZ3MpIHtcclxuXHJcbiAgICB2YXIgX1dGSW5zdGFuY2UgPSBhcmdzWzFdIHx8IHt9O1xyXG5cclxuICAgIHZhciBjb21tdW5pdHlJZCA9IF9XRkluc3RhbmNlLmNvbW11bml0eUlkO1xyXG4gICAgdmFyIHByb2ZpbGVJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICBsaWJyYXJ5LmNyZWF0ZVByb2ZpbGVEb2N1bWVudHMoY29tbXVuaXR5SWQsIHByb2ZpbGVJZCkuZG9uZShmdW5jdGlvbihkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnRm9ybSBjcmVhdGVkIHN1Y2Nlc3NmdWxseS4nLCBkYXRhKTtcclxuICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuXHJcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbihlcnIpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgdmFyIGZhaWx1cmUgPSB1dGlsLnN1Y2Nlc3MoJ0VSUk9SOiBQcm9maWxlIGNyZWF0aW9uIGZhaWxlZCcgKyBlcnJbMF0ubWVzc2FnZSwge30pO1xyXG4gICAgICAgICAgICByZWplY3QoZmFpbHVyZSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gc2V0RHJhZnQoYXJncykge1xyXG5cclxuICAgIHZhciBfV0ZJbnN0YW5jZSA9IGFyZ3NbMF0gfHwge307XHJcblxyXG4gICAgdmFyIGNvbW11bml0eUlkID0gX1dGSW5zdGFuY2UuY29tbXVuaXR5SWQ7XHJcbiAgICB2YXIgcHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcclxuICAgIHZhciB1dWlkID0gYXJnc1syXSB8fCAnJztcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgIHZhciBzdWJQcm9jZXNzSW5zdGFuY2UgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICB2YXIgaW5kaWNhdG9ySW5zdGFuY2VzID0gc3ViUHJvY2Vzc0luc3RhbmNlLmluZGljYXRvcnM7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5kaWNhdG9ySW5zdGFuY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JVVUlEID0gaW5kaWNhdG9ySW5zdGFuY2VzW2ldLmluc3RhbmNlc1swXS51dWlkO1xyXG4gICAgICAgICAgICB2YXIgaW5kaWNhdG9ySW5zdGFuY2UgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbX2lkIGVxICdcIiArIGluZGljYXRvclVVSUQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcbiAgICAgICAgICAgIGluZGljYXRvckluc3RhbmNlLmNvbnRyb2wuZHJhZnQgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJlc29sdmUoXCJTZXQgRHJhZnQgU3VjY2Vzc1wiLCBpbmRpY2F0b3JJbnN0YW5jZXMpO1xyXG5cclxuICAgIH0pO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gc2V0VW5EcmFmdChhcmdzKSB7XHJcblxyXG4gICAgdmFyIF9XRkluc3RhbmNlID0gYXJnc1swXSB8fCB7fTtcclxuXHJcbiAgICB2YXIgY29tbXVuaXR5SWQgPSBfV0ZJbnN0YW5jZS5jb21tdW5pdHlJZDtcclxuICAgIHZhciBwcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xyXG4gICAgdmFyIHV1aWQgPSBhcmdzWzJdIHx8ICcnO1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgdmFyIHN1YlByb2Nlc3NJbnN0YW5jZSA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG4gICAgICAgIHZhciBpbmRpY2F0b3JJbnN0YW5jZXMgPSBzdWJQcm9jZXNzSW5zdGFuY2UuaW5kaWNhdG9ycztcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbmRpY2F0b3JJbnN0YW5jZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGluZGljYXRvclVVSUQgPSBpbmRpY2F0b3JJbnN0YW5jZXNbaV0uaW5zdGFuY2VzWzBdLnV1aWQ7XHJcbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JJbnN0YW5jZSA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tfaWQgZXEgJ1wiICsgaW5kaWNhdG9yVVVJRCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICAgICAgaW5kaWNhdG9ySW5zdGFuY2UuY29udHJvbC5kcmFmdCA9IGZhbHNlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJlc29sdmUoXCJTZXQgRHJhZnQgU3VjY2Vzc1wiLCBpbmRpY2F0b3JJbnN0YW5jZXMpO1xyXG5cclxuICAgIH0pO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gc2F2ZShpbmRpY2F0b3IpIHtcclxuICAgIHZhciBjb21wbGV0ZWQgPSBbXTtcclxuICAgIHZhciByZXN1bHQgPSB7XHJcbiAgICAgICAgY29tcGxldGU6IHRydWUsXHJcbiAgICAgICAgZGF0YTogW11cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGluZGljYXRvciBzZXQgc2F2ZWQgc3VjY2Vzc2Z1bGx5LicsIHJlc3VsdCk7XHJcbiAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gc3VibWl0KGZvcm0pIHtcclxuICAgIHZhciBjb21wbGV0ZWQgPSBbXTtcclxuICAgIHZhciByZXN1bHQgPSB7XHJcbiAgICAgICAgY29tcGxldGU6IHRydWUsXHJcbiAgICAgICAgZGF0YTogW11cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIHN1Ym1pdHRlZCBzdWNjZXNzZnVsbHkuJywgcmVzdWx0KTtcclxuICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBhdXRob3Jpc2UoZm9ybSkge1xyXG4gICAgdmFyIGNvbXBsZXRlZCA9IFtdO1xyXG4gICAgdmFyIHJlc3VsdCA9IHtcclxuICAgICAgICBjb21wbGV0ZTogdHJ1ZSxcclxuICAgICAgICBkYXRhOiBbXVxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgcHJvY2Vzc0lkID0gZm9ybVswXSB8fCAnJztcclxuXHJcbiAgICB2YXIgc3ViUHJvY2VzcyA9IGZvcm1bMV0gfHwge307XHJcblxyXG4gICAgdmFyIHN1YlByb2Nlc3NJZCA9IHN1YlByb2Nlc3MuX2lkO1xyXG5cclxuICAgIHZhciBwcm9jZXNzU2VxID0gZm9ybVsyXSB8fCAnJztcclxuXHJcbiAgICB2YXIgc3ViUHJvY2Vzc1NlcSA9IGZvcm1bM10gfHwgJyc7XHJcblxyXG4gICAgdmFyIF9XRkluc3RhbmNlID0gZm9ybVs0XSB8fCB7fTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgIHZhciBzdWJQcm9jZXNzVVVJRCA9IEpTT04ueHBhdGgoXCIvcHJvY2Vzc2VzW2lkIGVxICdcIiArIHByb2Nlc3NJZCArIFwiJyBhbmQgc2VxIGVxICdcIiArIHByb2Nlc3NTZXEgKyBcIiddL3N1YlByb2Nlc3Nlc1tpZCBlcSAnXCIgKyBzdWJQcm9jZXNzSWQgKyBcIicgYW5kIHNlcSBlcSAnXCIgKyBzdWJQcm9jZXNzU2VxICsgXCInXS91dWlkXCIsIF9XRkluc3RhbmNlLmluc3RhbmNlLCB7fSlbMF07XHJcbiAgICAgICAgdmFyIHNwSW5kaWNhdG9ycyA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzdWJQcm9jZXNzVVVJRCArIFwiJ10vaW5kaWNhdG9ycy9pbnN0YW5jZXMvdXVpZFwiLCBfV0ZJbnN0YW5jZSwge30pO1xyXG4gICAgICAgIHZhciBpdGVtc1RvUHJvY2VzcyA9IHNwSW5kaWNhdG9ycy5sZW5ndGg7XHJcbiAgICAgICAgdmFyIHVwZGF0ZWRPYmplY3RzQXJyYXkgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtc1RvUHJvY2VzczsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICBnYXRla2VlcGVyLmF1dGhvcmlzZShzcEluZGljYXRvcnNbaV0pLnRoZW4oZnVuY3Rpb24oYXV0aG9yaXNlZFJldHVybikge1xyXG5cclxuICAgICAgICAgICAgICAgIGdhdGVrZWVwZXIucGVyc2lzdChhdXRob3Jpc2VkUmV0dXJuKS50aGVuKGZ1bmN0aW9uKHNhdmVkQXJyYXkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHV1aWRTYXZlZEluZGljYXRvciA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgc2F2ZWRBcnJheS5sZW5ndGg7IGMrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNhdmVkQXJyYXlbY10uaWQuZW5kc1dpdGgoJzphcHByb3ZlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dWlkU2F2ZWRJbmRpY2F0b3IgPSBzYXZlZEFycmF5W2NdLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGFvLmdldCh1dWlkU2F2ZWRJbmRpY2F0b3IpLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5wdXNoKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNUb1Byb2Nlc3MtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1RvUHJvY2VzcyA9PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGF1dGhvcmlzZWQgc3VjY2Vzc2Z1bGx5LicsIHVwZGF0ZWRPYmplY3RzQXJyYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvdW5kID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yID0gX1dGSW5zdGFuY2UuaW5kaWNhdG9yc1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGljYXRvci5faWQgPT0gZGF0YS5faWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGN1cnJlbnQgaXRlbSBmcm9tIHRoZSBhcnJheSBhbmQgYWRkIHRoZSB1cGRhdGVkIHByb2Nlc3NNb2RlbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNUb1Byb2Nlc3MtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zVG9Qcm9jZXNzID09IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnRm9ybSBhdXRob3Jpc2VkIHN1Y2Nlc3NmdWxseS4nLCB1cGRhdGVkT2JqZWN0c0FycmF5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm91bmQgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnB1c2goZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zVG9Qcm9jZXNzLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zVG9Qcm9jZXNzID09IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGF1dGhvcmlzZWQgc3VjY2Vzc2Z1bGx5LicsIHVwZGF0ZWRPYmplY3RzQXJyYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pLmZhaWwoZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1zVG9Qcm9jZXNzLS07XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbXNUb1Byb2Nlc3MgPT0gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnRm9ybSBhdXRob3Jpc2VkIHN1Y2Nlc3NmdWxseS4nLCB1cGRhdGVkT2JqZWN0c0FycmF5KTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGNsb3NlKGZvcm0pIHtcclxuICAgIHZhciBjb21wbGV0ZWQgPSBbXTtcclxuICAgIHZhciByZXN1bHQgPSB7XHJcbiAgICAgICAgY29tcGxldGU6IHRydWUsXHJcbiAgICAgICAgZGF0YTogW11cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGNsb3NlZCBzdWNjZXNzZnVsbHkuJywgcmVzdWx0KTtcclxuICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVJbmRpY2F0b3IoYXJncykge1xyXG5cclxuICAgIHZhciBfV0ZJbnN0YW5jZSA9IGFyZ3NbMF0gfHwge307XHJcblxyXG4gICAgdmFyIHV1aWQgPSBhcmdzWzFdIHx8ICcnO1xyXG4gICAgdmFyIHBhdGggPSBhcmdzWzJdIHx8ICcnO1xyXG4gICAgdmFyIGRhdGFWYWx1ZSA9IGFyZ3NbM10gfHwgJyc7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICB2YXIgc3ViUHJvY2Vzc0luc3RhbmNlID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcbiAgICAgICAgdmFyIGluZGljYXRvckluc3RhbmNlcyA9IHN1YlByb2Nlc3NJbnN0YW5jZS5pbmRpY2F0b3JzO1xyXG4gICAgICAgIHZhciBzZXRJZCA9IHBhdGguc3BsaXQoXCIuXCIsIDEpWzBdO1xyXG4gICAgICAgIHZhciBpbmRpY2F0b3JVVUlEID0gSlNPTi54cGF0aChcIi8qW2lkIGVxICdcIiArIHNldElkICsgXCInXS9pbnN0YW5jZXMvdXVpZFwiLCBpbmRpY2F0b3JJbnN0YW5jZXMsIHt9KVswXTtcclxuICAgICAgICB2YXIgaW5kT2JqZWN0ID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW19pZCBlcSAnXCIgKyBpbmRpY2F0b3JVVUlEICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG4gICAgICAgIHZhciBleHByID0gJ2luZE9iamVjdC5tb2RlbC5wZW5kaW5nLmRhdGEuJyArIHBhdGggKyAnID0gXCInICsgZGF0YVZhbHVlICsgJ1wiJztcclxuICAgICAgICBldmFsKGV4cHIpO1xyXG4gICAgICAgIHZhciBpdGVtc1RvUHJvY2VzcyA9IDE7XHJcbiAgICAgICAgdmFyIHN0dWZmID0gW107XHJcbiAgICAgICAgdmFyIG9iaiA9IHt9O1xyXG5cclxuICAgICAgICBvYmoubW9kZWwgPSBpbmRPYmplY3Q7XHJcbiAgICAgICAgc3R1ZmYucHVzaChvYmopO1xyXG5cclxuICAgICAgICBnYXRla2VlcGVyLnBlcnNpc3Qoc3R1ZmYpLnRoZW4oZnVuY3Rpb24oc2F2ZWRBcnJheSkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHV1aWRTYXZlZEluZGljYXRvciA9ICcnO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IHNhdmVkQXJyYXkubGVuZ3RoOyBjKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICghc2F2ZWRBcnJheVtjXS5pZC5lbmRzV2l0aCgnOmFwcHJvdmVkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dWlkU2F2ZWRJbmRpY2F0b3IgPSBzYXZlZEFycmF5W2NdLmlkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZGFvLmdldCh1dWlkU2F2ZWRJbmRpY2F0b3IpXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9XRkluc3RhbmNlLmluZGljYXRvcnMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5wdXNoKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1RvUHJvY2Vzcy0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbXNUb1Byb2Nlc3MgPT0gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdJbmRpY2F0b3IgdXBkYXRlZC4nLCBzdHVmZik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3VuZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3IgPSBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzW2luZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRpY2F0b3IuX2lkID09IGRhdGEuX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgY3VycmVudCBpdGVtIGZyb20gdGhlIGFycmF5IGFuZCBhZGQgdGhlIHVwZGF0ZWQgcHJvY2Vzc01vZGVsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1RvUHJvY2Vzcy0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1RvUHJvY2VzcyA9PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnSW5kaWNhdG9yIHVwZGF0ZWQuJywgc3R1ZmYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm91bmQgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1RvUHJvY2Vzcy0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zVG9Qcm9jZXNzID09IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0luZGljYXRvciB1cGRhdGVkLicsIHN0dWZmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSkuZmFpbChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBtYXJrVXBkYXRlSW5kaWNhdG9yKGFyZ3MpIHtcclxuXHJcbiAgICB2YXIgX1dGSW5zdGFuY2UgPSBhcmdzWzBdIHx8IHt9O1xyXG5cclxuICAgIHZhciB1dWlkID0gYXJnc1sxXSB8fCAnJztcclxuICAgIHZhciBzdGF0dXMgPSBhcmdzWzJdIHx8ICcnO1xyXG4gICAgdmFyIGluZGljYXRvclNldElkID0gYXJnc1szXSB8fCAnJztcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgIHZhciBpbmRPYmplY3QgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnXCIgKyBpbmRpY2F0b3JTZXRJZCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICBpbmRPYmplY3QubW9kZWwucGVuZGluZy5zdGF0dXMgPSBzdGF0dXM7XHJcblxyXG4gICAgICAgIHZhciBpdGVtc1RvUHJvY2VzcyA9IDE7XHJcbiAgICAgICAgdmFyIHN0dWZmID0gW107XHJcbiAgICAgICAgdmFyIG9iaiA9IHt9O1xyXG5cclxuICAgICAgICBvYmoubW9kZWwgPSBpbmRPYmplY3Q7XHJcbiAgICAgICAgc3R1ZmYucHVzaChvYmopO1xyXG5cclxuICAgICAgICAvLy0tLS0tLS0tLS1cclxuICAgICAgICBnYXRla2VlcGVyLnBlcnNpc3Qoc3R1ZmYpLnRoZW4oZnVuY3Rpb24oc2F2ZWRBcnJheSkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHV1aWRTYXZlZEluZGljYXRvciA9ICcnO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IHNhdmVkQXJyYXkubGVuZ3RoOyBjKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICghc2F2ZWRBcnJheVtjXS5pZC5lbmRzV2l0aCgnOmFwcHJvdmVkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dWlkU2F2ZWRJbmRpY2F0b3IgPSBzYXZlZEFycmF5W2NdLmlkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZGFvLmdldCh1dWlkU2F2ZWRJbmRpY2F0b3IpXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9XRkluc3RhbmNlLmluZGljYXRvcnMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5wdXNoKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1RvUHJvY2Vzcy0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbXNUb1Byb2Nlc3MgPT0gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdJbmRpY2F0b3IgdXBkYXRlZC4nLCBzdHVmZik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3VuZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3IgPSBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzW2luZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRpY2F0b3IuX2lkID09IGRhdGEuX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgY3VycmVudCBpdGVtIGZyb20gdGhlIGFycmF5IGFuZCBhZGQgdGhlIHVwZGF0ZWQgcHJvY2Vzc01vZGVsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1RvUHJvY2Vzcy0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1RvUHJvY2VzcyA9PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnSW5kaWNhdG9yIHVwZGF0ZWQuJywgc3R1ZmYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm91bmQgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1RvUHJvY2Vzcy0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zVG9Qcm9jZXNzID09IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0luZGljYXRvciB1cGRhdGVkLicsIHN0dWZmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSkuZmFpbChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgICBjcmVhdGU6IGNyZWF0ZSxcclxuICAgIHNhdmU6IHNhdmUsXHJcbiAgICBzdWJtaXQ6IHN1Ym1pdCxcclxuICAgIGF1dGhvcmlzZTogYXV0aG9yaXNlLFxyXG4gICAgY2xvc2U6IGNsb3NlLFxyXG4gICAgc2V0RHJhZnQ6IHNldERyYWZ0LFxyXG4gICAgc2V0VW5EcmFmdDogc2V0VW5EcmFmdCxcclxuICAgIGNyZWF0ZVByb2ZpbGU6IGNyZWF0ZVByb2ZpbGUsXHJcbiAgICBzZXRJbnN0YW5jZVRpdGxlOiBzZXRJbnN0YW5jZVRpdGxlLFxyXG4gICAgZGVsZXRlUHJvZmlsZTogZGVsZXRlUHJvZmlsZSxcclxuICAgIHVwZGF0ZUluZGljYXRvcjogdXBkYXRlSW5kaWNhdG9yLFxyXG4gICAgbWFya1VwZGF0ZUluZGljYXRvcjogbWFya1VwZGF0ZUluZGljYXRvclxyXG5cclxufSIsIid1c2Ugc3RyaWN0JztcclxuXHJcblxyXG5mdW5jdGlvbiBnZXRMYW5ndWFnZU1lc3NhZ2UobWVzc2FnZSkge1xyXG5cclxuICAgIHZhciBsYW5ndWFnZSA9IHNlcnZpY2UuZ2V0TGFuZ3VhZ2UoKTtcclxuICAgIHZhciByZXMgPSBldmFsKFwibWVzc2FnZS5pMThuLlwiICsgbGFuZ3VhZ2UpO1xyXG4gICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgIHJldHVybiByZXM7XHJcblxyXG59O1xyXG5cclxuZnVuY3Rpb24gZ2V0Tm9kZVZhbHVlKGRhdGEsIF9XRkluc3RhbmNlLCB1dWlkKSB7XHJcblxyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcblxyXG4gICAgICAgIGlmIChkYXRhLnZhbHVlICE9IHVuZGVmaW5lZCkge1xyXG5cclxuICAgICAgICAgICAgcmVqZWN0KFwiRVJST1I6IFVuaW1wbGVtZW50ZWQgdmFsdWUgdHlwZSBmb3VuZC5cIik7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS5pbmRpY2F0b3JVVUlEICE9IHVuZGVmaW5lZCkge1xyXG5cclxuICAgICAgICAgICAgcmVqZWN0KFwiRVJST1I6IFVuaW1wbGVtZW50ZWQgdmFsdWUgdHlwZSBmb3VuZC5cIik7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS5pbmRpY2F0b3IgIT0gdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgaW5kaWNhdG9yVVVJRCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pbmRpY2F0b3JzW2lkIGVxICdcIiArIGRhdGEuaW5kaWNhdG9yLmluZGljYXRvclNldElkICsgXCInXS9pbnN0YW5jZXMvdXVpZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG4gICAgICAgICAgICB2YXIgaW5kT2JqZWN0ID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW19pZCBlcSAnXCIgKyBpbmRpY2F0b3JVVUlEICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG4gICAgICAgICAgICB2YXIgeHBhdGggPSAnL21vZGVsL3BlbmRpbmcvZGF0YS8nICsgZGF0YS5pbmRpY2F0b3IuaW5kaWNhdG9yU2V0SWQgKyAnLycgKyBkYXRhLmluZGljYXRvci5lbGVtZW50SWQ7XHJcblxyXG4gICAgICAgICAgICB2YXIgc2VxID0gSlNPTi54cGF0aChcImNvdW50KC9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL3ByZWNlZGluZy1zaWJsaW5nOjpub2RlKClbaWQgPSAvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pZF0pXCIsIF9XRkluc3RhbmNlLCB7fSlbMF0gKyAxO1xyXG4gICAgICAgICAgICB2YXIgc3VicHJvY2Vzc1R5cGUgPSBKU09OLnhwYXRoKFwiL2NvbmZpZy9wcm9jZXNzZXMvc3ViUHJvY2Vzc2VzW19pZCBlcSAvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pZF0vdHlwZVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHN1YnByb2Nlc3NUeXBlID09IFBST0NFU1NfVFlQRV9TVUJQUk9GSUxFKSB7XHJcbiAgICAgICAgICAgICAgICBzZXEgPSBKU09OLnhwYXRoKFwiY291bnQoL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vcHJlY2VkaW5nLXNpYmxpbmc6Om5vZGUoKVtpZCA9IC9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2lkIGFuZCBpZCA9IC9zdWJwcm9jZXNzZXNbX2lkID0gL2luc3RhbmNlL3Byb2Nlc3Nlcy9zdWJQcm9jZXNzZXNbc3VicHJvZmlsZUlkIGVxICdcIiArIGFwcC5wcm9maWxlLnN1YnByb2ZpbGVJZCArIFwiJ10vdXVpZF0pXCIsIF9XRkluc3RhbmNlLCB7fSlbMF0gKyAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgcmVwbGFjZWRQYXRoID0gcmVwbGFjZUFsbCh4cGF0aCwgJyNTRVFVRU5DRSMnLCBzZXEpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHZhbGlkRGF0ZSA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9kYXRlcy92YWxpZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG4gICAgICAgICAgICB2YXIgY29uY2F0VmFsaWREYXRlID0gXCInXCIgKyB2YWxpZERhdGUgKyBcIidcIjtcclxuICAgICAgICAgICAgdmFyIG5ld1BhdGggPSByZXBsYWNlQWxsKHJlcGxhY2VkUGF0aCwgJyNFTkRfREFURSMnLCBjb25jYXRWYWxpZERhdGUpO1xyXG4gICAgICAgICAgICB2YXIgZG90UmVwbGFjZWQgPSByZXBsYWNlQWxsKG5ld1BhdGgsICdbLl0nLCAnLycpO1xyXG4gICAgICAgICAgICB2YXIgcmV0VmFsdWUgPSBKU09OLnhwYXRoKGRvdFJlcGxhY2VkLCBpbmRPYmplY3QsIHt9KVswXTtcclxuXHJcbiAgICAgICAgICAgIHJlc29sdmUocmV0VmFsdWUpO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKGRhdGEuc3lzdGVtICE9IHVuZGVmaW5lZCkge1xyXG5cclxuICAgICAgICAgICAgcmVzb2x2ZShcIkVSUk9SOiBVbmltcGxlbWVudGVkIHN5c3RlbSB0eXBlIGZvdW5kLlwiKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhLnZhcmlhYmxlICE9IHVuZGVmaW5lZCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEudmFyaWFibGUucHJvZmlsZSAhPSB1bmRlZmluZWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdmFyaWFibGVOYW1lID0gZGF0YS52YXJpYWJsZS5wcm9maWxlO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBwcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xyXG4gICAgICAgICAgICAgICAgdmFyIHByb2ZpbGVWYXJpYWJsZUZpbGVOYW1lID0gcHJvZmlsZUlkICsgJzp2YXJpYWJsZXMnO1xyXG5cclxuICAgICAgICAgICAgICAgIGRhby5nZXQocHJvZmlsZVZhcmlhYmxlRmlsZU5hbWUpLmRvbmUoZnVuY3Rpb24oZmlsZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0gZXZhbCgnZmlsZS4nICsgdmFyaWFibGVOYW1lKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmogPT0gJ29iamVjdCcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZXEgPSBKU09OLnhwYXRoKFwiY291bnQoL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vcHJlY2VkaW5nLXNpYmxpbmc6Om5vZGUoKVtpZCA9IC9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2lkXSlcIiwgX1dGSW5zdGFuY2UsIHt9KVswXSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWJwcm9jZXNzVHlwZSA9IEpTT04ueHBhdGgoXCIvY29uZmlnL3Byb2Nlc3Nlcy9zdWJQcm9jZXNzZXNbX2lkIGVxIC9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2lkXS90eXBlXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWJwcm9jZXNzVHlwZSA9PSBQUk9DRVNTX1RZUEVfU1VCUFJPRklMRSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VxID0gSlNPTi54cGF0aChcImNvdW50KC9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL3ByZWNlZGluZy1zaWJsaW5nOjpub2RlKClbaWQgPSAvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pZCBhbmQgaWQgPSAvc3VicHJvY2Vzc2VzW19pZCA9IC9pbnN0YW5jZS9wcm9jZXNzZXMvc3ViUHJvY2Vzc2VzW3N1YnByb2ZpbGVJZCBlcSAnXCIgKyBhcHAucHJvZmlsZS5zdWJwcm9maWxlSWQgKyBcIiddL3V1aWRdKVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlUGF0aCA9IFwiL1wiICsgdmFyaWFibGVOYW1lICsgXCJbc2VxIGVxICdcIiArIHNlcSArIFwiJ10vdmFsdWVcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJldFZhbHVlID0gSlNPTi54cGF0aCh2YWx1ZVBhdGgsIGZpbGUsIHt9KVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXRWYWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9iaiA9PSAnc3RyaW5nJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShvYmopO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSkuZmFpbChmdW5jdGlvbihlcnJvcikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJFUlJPUjogUHJvZmlsZSB2YXJpYWJsZXMgbm90IGZvdW5kXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChcIkVSUk9SOiBVbmltcGxlbWVudGVkIHByb2ZpbGUgdHlwZSBmb3VuZC5cIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG5cclxuXHJcblxyXG59O1xyXG5cclxuXHJcbmZ1bmN0aW9uIHJlcGxhY2VBbGwodHh0LCByZXBsYWNlLCB3aXRoX3RoaXMpIHtcclxuICAgIGlmICh0eXBlb2YgdHh0LnJlcGxhY2UgIT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcGxhY2UgKyAnICcgKyB3aXRoX3RoaXMpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHR4dCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHh0LnJlcGxhY2UobmV3IFJlZ0V4cChyZXBsYWNlLCAnZycpLCB3aXRoX3RoaXMpO1xyXG59XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gICAgZ2V0TGFuZ3VhZ2VNZXNzYWdlOiBnZXRMYW5ndWFnZU1lc3NhZ2UsXHJcbiAgICBnZXROb2RlVmFsdWU6IGdldE5vZGVWYWx1ZVxyXG5cclxufSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbGl0eScpO1xyXG5cclxuLyoqXHJcbiAqIFVzZXIgSW50ZXJmYWNlIE1vZHVsZVxyXG4gKlxyXG4gKiBAbW9kdWxlIGxpYi91aVxyXG4gKiBAYXV0aG9yIEJyZW50IEdvcmRvblxyXG4gKiBAdmVyc2lvbiAwLjEuMFxyXG4gKiBAZGVzY3JpcHRpb24gdGVzdCBkZXNjcmlwdGlvblxyXG4gKlxyXG4gKi9cclxuXHJcbiAvKipcclxuICAqIEdldCBhbGwgcHJvY2VzcyBzdWItcHJvY2Vzc2VzIHVzZXIgaW50ZXJmYWNlIGRhdGFcclxuICAqXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gcHJvY2VzcyBpZFxyXG4gICogQHBhcmFtIHtzdHJpbmd9IGxhbmcgLSB0aGUgdXNlciBwcmVmZmVyZWQgbGFuZ2F1Z2VcclxuICAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXHJcbiAgKlxyXG4gICogQGV4YW1wbGUgJydcclxuICAqXHJcbiAgKiBAcmV0dXJuICcnXHJcbiAgKlxyXG4gICovXHJcbiBmdW5jdGlvbiBnZXRQcm9jZXNzKHByb2Nlc3NJZCwgbGFuZywgX1dGSW5zdGFuY2Upe1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHZhciBwcm9jZXNzTW9kZWwgPSBbXTtcclxuICAgICAgdmFyIHByb2Nlc3NJbnN0YW5jZSA9IFtdO1xyXG4gICAgXHRfV0ZJbnN0YW5jZS5pbnN0YW5jZS5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHByb2Nlc3NJdGVtKXtcclxuICAgIFx0XHRpZiAocHJvY2Vzc0l0ZW0uaWQgPT0gcHJvY2Vzc0lkKSB7XHJcbiAgICBcdFx0XHRwcm9jZXNzSW5zdGFuY2UgPSBwcm9jZXNzSXRlbTtcclxuICAgIFx0XHR9XHJcbiAgICBcdH0pXHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKHByb2Nlc3NJbnN0YW5jZS5zdWJQcm9jZXNzZXMubGVuZ3RoKTtcclxuICAgICAgdXRpbC5zeW5jTG9vcChwcm9jZXNzSW5zdGFuY2Uuc3ViUHJvY2Vzc2VzLmxlbmd0aCwgZnVuY3Rpb24obG9vcCl7XHJcbiAgXHRcdFx0dmFyIGNvdW50ZXIgPSBsb29wLml0ZXJhdGlvbigpO1xyXG4gICAgICAgIHZhciBwcm9jZXNzU2VxID0gcHJvY2Vzc0luc3RhbmNlLnNlcTtcclxuICAgICAgICB2YXIgc3ViUHJvY2Vzc0lkID0gcHJvY2Vzc0luc3RhbmNlLnN1YlByb2Nlc3Nlc1tjb3VudGVyXS5pZDtcclxuICAgICAgICB2YXIgc3ViUHJvY2Vzc1NlcSA9IHByb2Nlc3NJbnN0YW5jZS5zdWJQcm9jZXNzZXNbY291bnRlcl0uc2VxO1xyXG4gICAgICAgIGdldFN1YlByb2Nlc3MocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIGxhbmcsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKG1vZGVsKXtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG1vZGVsKTtcclxuICAgICAgICAgIHByb2Nlc3NNb2RlbC5wdXNoKG1vZGVsKTtcclxuICAgICAgICAgIGxvb3AubmV4dCgpO1xyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2cocHJvY2Vzc01vZGVsKTtcclxuICBcdFx0XHR9LCBmdW5jdGlvbihlcnIpe1xyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2cocHJvY2Vzc01vZGVsKTtcclxuICBcdFx0XHRcdGxvb3AuYnJlYWsoKTtcclxuICBcdFx0XHRcdHJlamVjdChlcnIpO1xyXG4gIFx0XHRcdH0pO1xyXG4gIFx0XHR9LCBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHByb2Nlc3NNb2RlbCk7XHJcbiAgXHRcdFx0cmVzb2x2ZShwcm9jZXNzTW9kZWwpO1xyXG4gIFx0XHR9KTtcclxuICAgIH0gY2F0Y2goZXJyKXtcclxuICAgICAgcmVqZWN0KGVycik7XHJcbiAgICB9XHJcbiAgfSlcclxufTtcclxuXHJcbiAvKipcclxuICAqIEdldCBTdWJQcm9jZXNzIHVzZXIgaW50ZXJmYWNlIGRhdGFcclxuICAqXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gcHJvY2VzcyBpZFxyXG4gICogQHBhcmFtIHtudW1iZXJ9IHByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2UgcHJvY2VzcyBzZXFcclxuICAqIEBwYXJhbSB7c3RyaW5nfSBzdWJQcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdWItcHJvY2VzcyBpZFxyXG4gICogQHBhcmFtIHtudW1iZXJ9IHN1YlByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2Ugc3ViLXByb2Nlc3Mgc2VxXHJcbiAgKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxyXG4gICpcclxuICAqIEBleGFtcGxlICcnXHJcbiAgKlxyXG4gICogQHJldHVybiAnJ1xyXG4gICpcclxuICAqL1xyXG5mdW5jdGlvbiBnZXRTdWJQcm9jZXNzKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBsYW5nLCBfV0ZJbnN0YW5jZSl7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgdmFyIG1vZGVsID0ge1xyXG4gICAgICAgIGlkOiAnJyxcclxuICAgICAgICBzZXE6ICcnLFxyXG4gICAgICAgIG5hbWU6ICcnLFxyXG4gICAgICAgIGhlbHA6ICcnLFxyXG4gICAgICAgIGRhdGVzOiAnJyxcclxuICAgICAgICBzdGVwOiAnJ1xyXG4gICAgICB9O1xyXG4gICAgICB2YXIgc3ViUHJvY2VzcyA9IFtdO1xyXG4gICAgXHR2YXIgc3ViUHJvY2Vzc0NvbmYgPSBbXTtcclxuICAgIFx0X1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihwcm9jZXNzSXRlbSl7XHJcbiAgICBcdFx0aWYgKHByb2Nlc3NJdGVtLmlkID09IHByb2Nlc3NJZCAmJiBwcm9jZXNzSXRlbS5zZXEgPT0gcHJvY2Vzc1NlcSkge1xyXG4gICAgXHRcdFx0dmFyIHNwTGVuZ3RoID0gcHJvY2Vzc0l0ZW0uc3ViUHJvY2Vzc2VzLmxlbmd0aDtcclxuICAgIFx0XHRcdHByb2Nlc3NJdGVtLnN1YlByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24oc3ViUHJvY2Vzc0l0ZW0pe1xyXG4gICAgXHRcdFx0XHRpZiAoc3ViUHJvY2Vzc0l0ZW0uaWQgPT0gc3ViUHJvY2Vzc0lkICYmIHN1YlByb2Nlc3NJdGVtLnNlcSA9PSBzdWJQcm9jZXNzU2VxICYmIHN1YlByb2Nlc3NJdGVtLmNvbXBsZXRlID09IGZhbHNlKSB7XHJcbiAgICBcdFx0XHRcdFx0c3ViUHJvY2VzcyA9IHN1YlByb2Nlc3NJdGVtO1xyXG4gICAgXHRcdFx0XHR9XHJcbiAgICBcdFx0XHR9KVxyXG4gICAgXHRcdH1cclxuICAgIFx0fSlcclxuICAgIFx0Ly8gR2V0IHRoZSBjdXJyZW50IHN1YlByb2Nlc3MgY29uZmlndXJhdGlvblxyXG4gICAgXHRfV0ZJbnN0YW5jZS5jb25maWcucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihwcm9jZXNzQ29uZmlnKXtcclxuICAgIFx0XHRpZiAocHJvY2Vzc0NvbmZpZy5faWQgPT0gcHJvY2Vzc0lkKSB7XHJcbiAgICBcdFx0XHRwcm9jZXNzQ29uZmlnLnN1YlByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24oc3ViUHJvY2Vzc0NvbmZpZyl7XHJcbiAgICBcdFx0XHRcdGlmIChzdWJQcm9jZXNzQ29uZmlnLl9pZCA9PSBzdWJQcm9jZXNzSWQpIHtcclxuICAgIFx0XHRcdFx0XHRzdWJQcm9jZXNzQ29uZiA9IHN1YlByb2Nlc3NDb25maWc7XHJcbiAgICBcdFx0XHRcdH1cclxuICAgIFx0XHRcdH0pXHJcbiAgICBcdFx0fVxyXG4gICAgXHR9KVxyXG4gICAgICAvLyBVcGRhdGUgdGhlIG1vZGVsXHJcbiAgICAgIG1vZGVsLmlkID0gc3ViUHJvY2Vzc0NvbmYuX2lkO1xyXG4gICAgICBtb2RlbC5zZXEgPSBzdWJQcm9jZXNzLnNlcTtcclxuICAgICAgbW9kZWwubmFtZSA9IHV0aWwuZ2V0TmFtZShzdWJQcm9jZXNzQ29uZi5uYW1lLCBsYW5nKTtcclxuICAgICAgbW9kZWwuaGVscCA9IHV0aWwuZ2V0TmFtZShzdWJQcm9jZXNzQ29uZi5oZWxwLCBsYW5nKTtcclxuICAgICAgbW9kZWwuZGF0ZXMgPSBzdWJQcm9jZXNzLmRhdGVzO1xyXG4gICAgICBtb2RlbC5zdGVwID0gc3ViUHJvY2Vzcy5zdGVwO1xyXG4gICAgICByZXNvbHZlKG1vZGVsKTtcclxuICAgIH0gY2F0Y2goZXJyKSB7XHJcbiAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgfVxyXG4gIH0pXHJcbn07XHJcblxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBwcmVwYXJlTm90aWZpY2F0aW9uU2NyZWVuKCl7XHJcblxyXG4gIFwiXCJcclxufTtcclxuXHJcbiBtb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgZ2V0UHJvY2VzczogZ2V0UHJvY2Vzc1xyXG5cclxuIH1cclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuXHJcbmZ1bmN0aW9uIGdldCgpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgfSk7XHJcblxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gICAgZ2V0OiBnZXRcclxuXHJcbn0iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbGl0eScpO1xudmFyIGFjdGlvbnNNb2R1bGUgPSByZXF1aXJlKCcuL2FjdGlvbnMnKTtcbnZhciBoZWxwZXIgPSByZXF1aXJlKCcuL2hlbHBlcicpO1xudmFyIGZvcm0gPSByZXF1aXJlKCcuL2Zvcm0nKTtcblxuLyoqXG4gKiBQcm9jZXNzIE1vZHVsZVxuICpcbiAqIEBtb2R1bGUgbGliL3Byb2Nlc3NcbiAqIEBhdXRob3IgSGFzYW4gQWJiYXNcbiAqIEB2ZXJzaW9uIDAuMi4xXG4gKiBAZGVzY3JpcHRpb24gV29ya2Zsb3cgaW1wbGVtZW50YXRpb24gY2hhbmdlZCBhcyBwZXIgbmV3IHNjaGVtYSBpbXBsZW1lbnRhdGlvblxuICpcbiAqL1xuXG4vKipcbiAqIENvdW50IGFuIGFycmF5IG9mIGl0ZW1zXG4gKlxuICogQHBhcmFtIHtBcnJheX0gYXJyIC0gdGhlIGFycmF5IGRhdGFcbiAqXG4gKiBAZXhhbXBsZSAnJ1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cbmZ1bmN0aW9uIGNvdW50KGFycikge1xuICAgIGlmIChhcnIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gYXJyLmxlbmd0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbn07XG5cbi8qKlxuICogUHJvY2VzcyBwcmUtcmVxdWlzaXRlc1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBwcmVyZXF1aXNpdGVzIC0gdGhlIHByZS1yZXF1aXNpdGVzIGNvbmZpZyBkYXRhXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiBwcmVSZXF1aXNpdGVzKHByZXJlcXVpc2l0ZXMsIF9XRkluc3RhbmNlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAvLyBVbmNvbW1lbnQgYmVsb3cgc2VjdGlvbiB3aGVuIHJlYWR5IHRvIGltcGxlbWVudFxuICAgICAgICB2YXIgY29tcGxldGVkID0gW107XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB1dGlsLnN5bmNMb29wKHByZXJlcXVpc2l0ZXMubGVuZ3RoLCBmdW5jdGlvbihsb29wKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvdW50ZXIgPSBsb29wLml0ZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgIHByZVJlcXVpc2l0ZShwcmVyZXF1aXNpdGVzW2NvdW50ZXJdLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGFsbCBwcmUtcmVxdWlzaXRlcyBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LlxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQucHVzaCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgbG9vcC5uZXh0KCk7XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlZC5wdXNoKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgbG9vcC5icmVhaygpO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZWQuZXZlcnkoQm9vbGVhbikpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1ByZS1yZXF1aXNpdGVzIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywge30pO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGUHJlUmVxdWlzaXRlRXJyb3InLCAnTm90IGFsbCBwcmUtcmVxdWlzaXRlcyBwYXNzZWQuJyk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFByb2Nlc3MgcHJlLXJlcXVpc2l0ZSwgZXhlY3V0ZSB0aGUgcHJlLXJlcXVpc2l0ZSBjb25kaXRpb24uXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHByZXJlcXVpc2l0ZSAtIHRoZSBwcmUtcmVxdWlzaXRlIGNvbmZpZyBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcbiAqXG4gKiBAZXhhbXBsZVxuICogUHJvY2Vzcy5wcmVSZXF1aXNpdGUoY29uZmlnLCBjb3VudGVyLCBpbnN0YW5jZSwgZG9jKTtcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiBwcmVSZXF1aXNpdGUocHJlcmVxdWlzaXRlLCBfV0ZJbnN0YW5jZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICB2YXIgc3ViamVjdENvdW50ID0gJyc7XG5cbiAgICAgICAgaWYgKHByZXJlcXVpc2l0ZS5jaGVjay5udW1iZXJQcm9jZXNzSW5zdGFuY2VzICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICB2YXIgbnVtYmVyUHJvY2Vzc0luc3RhbmNlcyA9IHByZXJlcXVpc2l0ZS5jaGVjay5udW1iZXJQcm9jZXNzSW5zdGFuY2VzO1xuICAgICAgICAgICAgdmFyIF9maWx0ZXJPcGVyYXRvciA9IG51bWJlclByb2Nlc3NJbnN0YW5jZXMub3BlcmF0b3I7XG4gICAgICAgICAgICB2YXIgeHBhdGhPcGVyYXRvciA9ICcnO1xuICAgICAgICAgICAgc3dpdGNoIChfZmlsdGVyT3BlcmF0b3IpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdncmVhdGVyVGhhbic6XG4gICAgICAgICAgICAgICAgICAgIHhwYXRoT3BlcmF0b3IgPSAnZ3QnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdsZXNzVGhhbic6XG4gICAgICAgICAgICAgICAgICAgIHhwYXRoT3BlcmF0b3IgPSAnbHQnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdncmVhdGVyVGhhbkVxdWFsJzpcbiAgICAgICAgICAgICAgICAgICAgeHBhdGhPcGVyYXRvciA9ICdnZSc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2xlc3NUaGFuRXF1YWwnOlxuICAgICAgICAgICAgICAgICAgICB4cGF0aE9wZXJhdG9yID0gJ2xlJztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZXF1YWxUbyc6XG4gICAgICAgICAgICAgICAgICAgIHhwYXRoT3BlcmF0b3IgPSAnZXEnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdub3RFcXVhbFRvJzpcbiAgICAgICAgICAgICAgICAgICAgeHBhdGhPcGVyYXRvciA9ICduZSc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgX3N1YnByb2Nlc3NJZCA9IG51bWJlclByb2Nlc3NJbnN0YW5jZXMuc3ViUHJvY2Vzc0lkO1xuICAgICAgICAgICAgdmFyIF9maWx0ZXJFbGVtZW50ID0gXCJzdGVwL3N0YXR1c1wiO1xuICAgICAgICAgICAgdmFyIF9maWx0ZXJWYWx1ZSA9IG51bWJlclByb2Nlc3NJbnN0YW5jZXMudHlwZTtcbiAgICAgICAgICAgIHZhciBpbm5lclhwYXRoID0gXCIvXCIgKyBfZmlsdGVyRWxlbWVudCArIFwiWy4gZXEgJ1wiICsgX2ZpbHRlclZhbHVlICsgXCInXVwiO1xuXG4gICAgICAgICAgICB2YXIgZnVsbFBhdGggPSBcImNvdW50KC9zdWJwcm9jZXNzZXNbaWQgZXEgJ1wiICsgX3N1YnByb2Nlc3NJZCArIFwiJ11cIiArIGlubmVyWHBhdGggKyBcIilcIjtcblxuICAgICAgICAgICAgdmFyIHByZXJlcVByb2Nlc3NUeXBlID0gSlNPTi54cGF0aChcIi9jb25maWcvcHJvY2Vzc2VzL3N1YlByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgX3N1YnByb2Nlc3NJZCArIFwiJ10vdHlwZVwiLCBhcHAuU0NPUEUud29ya2Zsb3csIHt9KVswXTtcbiAgICAgICAgICAgIGlmIChhcHAucHJvZmlsZS5zdWJwcm9maWxlSWQgIT0gdW5kZWZpbmVkICYmIGFwcC5wcm9maWxlLnN1YnByb2ZpbGVJZCAhPSAnJyAmJiBwcmVyZXFQcm9jZXNzVHlwZSAhPSB1bmRlZmluZWQgJiYgcHJlcmVxUHJvY2Vzc1R5cGUgPT0gUFJPQ0VTU19UWVBFX1NVQlBST0ZJTEUpIHtcbiAgICAgICAgICAgICAgICBmdWxsUGF0aCA9IFwiY291bnQoL3N1YnByb2Nlc3Nlc1tpZCBlcSAnXCIgKyBfc3VicHJvY2Vzc0lkICsgXCInIGFuZCBfaWQgPSAvaW5zdGFuY2UvcHJvY2Vzc2VzL3N1YlByb2Nlc3Nlc1tzdWJwcm9maWxlSWQgZXEgJ1wiICsgYXBwLnByb2ZpbGUuc3VicHJvZmlsZUlkICsgXCInXS91dWlkXVwiICsgaW5uZXJYcGF0aCArIFwiKVwiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzdWJqZWN0Q291bnQgPSBKU09OLnhwYXRoKGZ1bGxQYXRoLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuXG5cblxuICAgICAgICB9IGVsc2UgaWYgKHByZXJlcXVpc2l0ZS5jaGVjay52YXJpYWJsZUNvbmZpcm0gIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZQcmVSZXF1aXNpdGVFcnJvcicsICdQcmUtcmVxdWlzaXRlIHR5cGUgbm90IGRlZmluZWQuJyk7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY29tcGFyZSA9ICcnO1xuICAgICAgICB2YXIgY291bnRWYWx1ZSA9ICcnO1xuXG4gICAgICAgIC8vIGlmIChzb21lKSB7XG4gICAgICAgIC8vICAgICBjb3VudFZhbHVlID0gWFhYO1xuICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAvLyAgICAgY291bnRWYWx1ZSA9IHByZXJlcXVpc2l0ZS5jaGVjay5udW1iZXJQcm9jZXNzSW5zdGFuY2VzLmNvdW50O1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgY291bnRWYWx1ZSA9IHByZXJlcXVpc2l0ZS5jaGVjay5udW1iZXJQcm9jZXNzSW5zdGFuY2VzLmNvdW50O1xuXG4gICAgICAgIHByZXJlcXVpc2l0ZS5jaGVjay5udW1iZXJQcm9jZXNzSW5zdGFuY2VzLmNvdW50XG4gICAgICAgIGlmIChwcmVyZXF1aXNpdGUuY2hlY2subnVtYmVyUHJvY2Vzc0luc3RhbmNlcykge1xuICAgICAgICAgICAgY29tcGFyZSA9IHV0aWwuY29tcGFyZShzdWJqZWN0Q291bnQsIHByZXJlcXVpc2l0ZS5jaGVjay5udW1iZXJQcm9jZXNzSW5zdGFuY2VzLm9wZXJhdG9yLCBwYXJzZUludChjb3VudFZhbHVlKSk7XG4gICAgICAgIH0gZWxzZSBpZiAocHJlcmVxdWlzaXRlLmNoZWNrLnZhcmlhYmxlQ29uZmlybSkge1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29tcGFyZSkge1xuICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1ByZS1yZXF1aXNpdGVzIHBhc3NlZC4nLCB7fSk7XG4gICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGhlbHBlci5nZXRMYW5ndWFnZU1lc3NhZ2UocHJlcmVxdWlzaXRlLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZQcmVSZXF1aXNpdGVFcnJvcicsIG1lc3NhZ2UpO1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFByb2Nlc3MgcHJlLWFjdGlvbnNzXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHByZUFjdGlvbnMgLSB0aGUgcHJlLWFjdGlvbnMgY29uZmlnIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiBwcmVBY3Rpb25zKHByZUFjdGlvbnMsIF9XRkluc3RhbmNlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgY29tcGxldGVkID0gW107XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB1dGlsLnN5bmNMb29wKHByZUFjdGlvbnMubGVuZ3RoLCBmdW5jdGlvbihsb29wKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvdW50ZXIgPSBsb29wLml0ZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgIGFjdGlvbihwcmVBY3Rpb25zW2NvdW50ZXJdLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGFsbCBwcmUtcmVxdWlzaXRlcyBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LlxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQucHVzaCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgbG9vcC5uZXh0KCk7XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlZC5wdXNoKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgbG9vcC5icmVhaygpO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZWQuZXZlcnkoQm9vbGVhbikpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1ByZS1hY3Rpb25zIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywge30pO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGUHJlUmVxdWlzaXRlRXJyb3InLCAnTm90IGFsbCBwcmUtYWN0aW9ucyBwYXNzZWQuJyk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFdvcmtmbG93IGdldCBzdWItcHJvY2VzcyBkYXRhLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIHRoZSBzdWJQcm9jZXNzIGNvbmZpZyBpZFxuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcbiAqXG4gKiBAZXhhbXBsZSBcIlwiXG4gKlxuICogQHJldHVybiBcIlwiXG4gKlxuICovXG5mdW5jdGlvbiBnZXRTdWJQcm9jZXNzKGlkLCBfV0ZJbnN0YW5jZSkge1xuICAgIGlmIChfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHN1YlByb2Nlc3MpIHtcbiAgICAgICAgICAgIGlmIChzdWJQcm9jZXNzLmlkID09IGlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1YlByb2Nlc3M7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG4gICAgfVxuXG59O1xuXG4vKipcbiAqIFByb2Nlc3Mgc3ViLXByb2Nlc3NcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gcHJvY2VzcyAtIHRoZSBjdXJyZW50IHByb2Nlc3MgaWQgYW5kIHNlcVxuICogQHBhcmFtIHtvYmplY3R9IHN1YlByb2Nlc3MgLSB0aGUgc3ViLXByb2Nlc3MgaWQgYW5kIHNlcVxuICogQHBhcmFtIHtvYmplY3R9IGRhdGEgLSB0aGUgdXNlciBpbnB1dCBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuZnVuY3Rpb24gc3ViUHJvY2Vzcyhwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgZGF0YSwgX1dGSW5zdGFuY2UpIHtcbiAgICAvLyBHZXQgdGhlIGN1cnJlbnQgcHJvY2VzcyBzdWJQcm9jZXNzIGluc3RhbmNlXG4gICAgLy8gdmFyIHN1YlByb2Nlc3NTZXEgPSAxO1xuICAgIHZhciBzdWJQcm9jZXNzID0gW107XG4gICAgdmFyIHByb2Nlc3NDb25mID0gW107XG4gICAgdmFyIHN1YlByb2Nlc3NDb25mID0gW107XG4gICAgX1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmpQcm9jZXNzKSB7XG4gICAgICAgIGlmIChvYmpQcm9jZXNzLmlkID09IHByb2Nlc3NJZCAmJiBvYmpQcm9jZXNzLnNlcSA9PSBwcm9jZXNzU2VxKSB7XG4gICAgICAgICAgICB2YXIgc3BMZW5ndGggPSBvYmpQcm9jZXNzLnN1YlByb2Nlc3Nlcy5sZW5ndGg7XG4gICAgICAgICAgICBvYmpQcm9jZXNzLnN1YlByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqU3ViUHJvY2Vzcykge1xuICAgICAgICAgICAgICAgIGlmIChvYmpTdWJQcm9jZXNzLmlkID09IHN1YlByb2Nlc3NJZCAmJiBvYmpTdWJQcm9jZXNzLnNlcSA9PSBzdWJQcm9jZXNzU2VxKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB1dWlkID0gb2JqU3ViUHJvY2Vzcy51dWlkO1xuICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHN1YlByb2Nlc3NJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3ViUHJvY2Vzc0l0ZW0uX2lkID09IHV1aWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzID0gc3ViUHJvY2Vzc0l0ZW07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgIH0pO1xuICAgIC8vIEdldCB0aGUgY3VycmVudCBzdWJQcm9jZXNzIGNvbmZpZ3VyYXRpb25cbiAgICBfV0ZJbnN0YW5jZS5jb25maWcucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihwcm9jZXNzQ29uZmlnKSB7XG4gICAgICAgIGlmIChwcm9jZXNzQ29uZmlnLl9pZCA9PSBwcm9jZXNzSWQpIHtcbiAgICAgICAgICAgIHByb2Nlc3NDb25mID0gcHJvY2Vzc0NvbmZpZztcbiAgICAgICAgICAgIHByb2Nlc3NDb25maWcuc3ViUHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihzdWJQcm9jZXNzQ29uZmlnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN1YlByb2Nlc3NDb25maWcuX2lkID09IHN1YlByb2Nlc3NJZCkge1xuICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzQ29uZiA9IHN1YlByb2Nlc3NDb25maWc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIC8vVE9ETzogQ2hhbmdlIHJlcXVpcmVkIHRvIG1vdmUgaXNBY3RpdmUgdG8gc3ViUHJvY2VzcyBmaWxlLkhlcmVcbiAgICB2YXIgZ3JvdXBLZXkgPSAnJztcbiAgICB2YXIgYmFzZVVVSUQgPSBkYXRhLmJhc2VVVUlEO1xuICAgIGlmIChiYXNlVVVJRCAhPSB1bmRlZmluZWQgJiYgYmFzZVVVSUQgIT0gJycgJiYgYmFzZVVVSUQubGVuZ3RoID4gMCkge1xuICAgICAgICB2YXIgcHJldmlvdXNPYmplY3QgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgYmFzZVVVSUQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgIGdyb3VwS2V5ID0gcHJldmlvdXNPYmplY3QuZ3JvdXBLZXk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZ3JvdXBLZXkgPSBnZW5lcmF0ZVVVSUQoKTtcbiAgICB9XG5cbiAgICB2YXIgc3ViUHJvY2Vzc09iamVjdElkID0gZ2VuZXJhdGVVVUlEKCk7XG4gICAgdmFyIG1vZGVsID0ge1xuICAgICAgICBfaWQ6IHN1YlByb2Nlc3NPYmplY3RJZCxcbiAgICAgICAgaWQ6IHN1YlByb2Nlc3NJZCxcbiAgICAgICAgdHlwZTogJ3dvcmtmbG93SW5zdGFuY2VTdWJQcm9jZXNzJyxcbiAgICAgICAgc2VxOiBzdWJQcm9jZXNzU2VxLFxuICAgICAgICBpbml0aWF0ZWQ6IGZhbHNlLFxuICAgICAgICBkYXRlczoge1xuICAgICAgICAgICAgY3JlYXRlZDogJycsXG4gICAgICAgICAgICB2YWxpZDogJycsXG4gICAgICAgICAgICBkdWU6ICcnLFxuICAgICAgICAgICAgY2xvc2VkOiAnJ1xuICAgICAgICB9LFxuICAgICAgICBjb21wbGV0ZTogZmFsc2UsXG4gICAgICAgIGluZGljYXRvcnM6IFtdLFxuICAgICAgICBzdGVwOiB7fSxcbiAgICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgICBncm91cEtleTogZ3JvdXBLZXksXG4gICAgICAgIGNoYW5uZWxzOiBbXG4gICAgICAgICAgICBcImNvbW11bml0eV9cIiArIGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpLFxuICAgICAgICAgICAgXCJwcm9maWxlX1wiICsgYXBwLlNDT1BFLnByb2ZpbGVJZCxcbiAgICAgICAgICAgIFwiYXBwbGljYXRpb25fXCIgKyBhcHAuU0NPUEUuYXBwbGljYXRpb25JZCxcbiAgICAgICAgICAgIFwiY29tbXVuaXR5X1wiICsgYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCkgKyBcIl9hcHBsaWNhdGlvbl9cIiArIGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkXG4gICAgICAgIF1cbiAgICB9O1xuXG4gICAgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzLnB1c2gobW9kZWwpO1xuICAgIC8vIFJldHVybiBhIHByb21pc2VcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIC8vIENhdGNoIGFsbCB1bmNhdWdodCBlcnJvcnNcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIDEuIFByb2Nlc3MgdGhlIHByZS1hY3Rpb25zXG4gICAgICAgICAgICB2YXIgcHJlQWN0aW9uc0NvbmYgPSBwcm9jZXNzQ29uZi5wcmVBY3Rpb25zO1xuICAgICAgICAgICAgcHJlQWN0aW9ucyhwcmVBY3Rpb25zQ29uZiwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgLy8gMi4gUHJvY2VzcyB0aGUgcHJlLXJlcXVpc2l0ZXNcbiAgICAgICAgICAgICAgICB2YXIgcHJlcmVxdWlzaXRlQ29uZiA9IHByb2Nlc3NDb25mLnByZXJlcXVpc2l0ZXM7XG4gICAgICAgICAgICAgICAgcHJlUmVxdWlzaXRlcyhwcmVyZXF1aXNpdGVDb25mLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gMy4gSW5pdGlhdGUgdGhlIHN1YlByb2Nlc3NcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluaXRpYXRlQ29uZiA9IHN1YlByb2Nlc3NDb25mLmluaXRpYXRlO1xuICAgICAgICAgICAgICAgICAgICBpbml0aWF0ZShpbml0aWF0ZUNvbmYsIHN1YlByb2Nlc3MsIGRhdGEpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL1VwZGF0ZSB0aGUgc3ViUHJvY2VzcyBtb2RlbFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuaW5pdGlhdGVkID0gcmVzdWx0LmRhdGEuaW5pdGlhdGVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuZGF0ZXMgPSByZXN1bHQuZGF0YS5kYXRlcztcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEV4ZWN1dGUgdGhlIGZpcnN0IHN0ZXBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGVwSWQgPSBzdWJQcm9jZXNzQ29uZi5zdGVwc1swXS5faWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHJhbnNpdGlvbklkID0gc3ViUHJvY2Vzc0NvbmYuc3RlcHNbMF0udHJhbnNpdGlvblswXS5faWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RlcFNlcSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdGVwSWQsIHN0ZXBTZXEsIGRhdGEsIF9XRkluc3RhbmNlLCBzdWJQcm9jZXNzT2JqZWN0SWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLnN0ZXAgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kaWNhdG9ycyhzdWJQcm9jZXNzQ29uZi5pbmRpY2F0b3JzLCBfV0ZJbnN0YW5jZSwgbW9kZWwuX2lkKS50aGVuKGZ1bmN0aW9uKHJlc3VsdDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLmluZGljYXRvcnMgPSByZXN1bHQxLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBFeGVjdXRlIHRoZSB0cmFuc2l0aW9ucywgaWYgYXV0b1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBvc3RBY3Rpb25zQ29uZiA9IHByb2Nlc3NDb25mLnBvc3RBY3Rpb25zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zdEFjdGlvbnMocG9zdEFjdGlvbnNDb25mLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcyhyZXN1bHQubWVzc2FnZSwgbW9kZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLnN1YnByb2Nlc3NlcyA9IF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEob2JqLl9pZCA9PSBzdWJQcm9jZXNzT2JqZWN0SWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzID0gX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhKG9iai5faWQgPT0gc3ViUHJvY2Vzc09iamVjdElkKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMgPSBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIShvYmouX2lkID09IHN1YlByb2Nlc3NPYmplY3RJZCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG5cbiAgICB9KTtcbn07XG5cbi8qKlxuICogUHJvY2VzcyBpbml0aWF0ZVxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBpbml0aWF0ZSAtIHRoZSBpbml0aWF0ZSBjb25maWcgZGF0YVxuICogQHBhcmFtIHtvYmplY3R9IGRhdGEgLSB0aGUgdXNlciBpbnB1dCBkYXRhXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiBpbml0aWF0ZShpbml0aWF0ZSwgc3ViUHJvY2VzcywgZGF0YSkge1xuICAgIHZhciBjb21wbGV0ZWQgPSBbXTtcbiAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgICBpbml0aWF0ZWQ6IGZhbHNlLFxuICAgICAgICBkYXRlczoge1xuICAgICAgICAgICAgY3JlYXRlZDogJycsXG4gICAgICAgICAgICB2YWxpZDogJycsXG4gICAgICAgICAgICBkdWU6ICcnLFxuICAgICAgICAgICAgY2xvc2VkOiAnJ1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICBpZiAoaW5pdGlhdGUudXNlciAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuZGF0ZXMuY3JlYXRlZCA9IGRhdGEuY3JlYXRlZERhdGU7XG4gICAgICAgICAgICAgICAgaWYgKGluaXRpYXRlLnVzZXIudmFsaWREYXRlLl90eXBlID09ICd1c2VyU2VsZWN0ZWQnIHx8IGluaXRpYXRlLnVzZXIudmFsaWREYXRlLl90eXBlID09ICdhdXRvU2VsZWN0ZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnZhbGlkRGF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZGF0ZXMudmFsaWQgPSBkYXRhLnZhbGlkRGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwud2FybignV0ZJbml0aWF0ZUVycm9yJywgJ05vIHZhbGlkIGRhdGUgcGFzc2VkIGluIC0ge2RhdGEudmFsaWREYXRlfScpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaW5pdGlhdGUudXNlci5kdWVEYXRlLl90eXBlID09ICd1c2VyU2VsZWN0ZWQnIHx8IGluaXRpYXRlLnVzZXIuZHVlRGF0ZS5fdHlwZSA9PSAnYXV0b1NlbGVjdGVkJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5kdWVEYXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5kYXRlcy5kdWUgPSBkYXRhLmR1ZURhdGU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlsLndhcm4oJ1dGSW5pdGlhdGVFcnJvcicsICdObyBkdWUgZGF0ZSBwYXNzZWQgaW4gLSB7ZGF0YS5kdWVEYXRlfScpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXN1bHQuaW5pdGlhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnU3ViLVByb2Nlc3MgaW5pdGlhdGUgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCByZXN1bHQpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5pdGlhdGUuYXV0byAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgcmVzdWx0LmRhdGVzLmNyZWF0ZWQgPSBkYXRhLmNyZWF0ZWREYXRlO1xuXG4gICAgICAgICAgICAgICAgaWYgKGluaXRpYXRlLmRhdGVzLnZhbGlkLl90eXBlID09ICd1c2VyU2VsZWN0ZWQnIHx8IGluaXRpYXRlLmRhdGVzLnZhbGlkLl90eXBlID09ICdhdXRvU2VsZWN0ZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnZhbGlkRGF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZGF0ZXMudmFsaWQgPSBkYXRhLnZhbGlkRGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwud2FybignV0ZJbml0aWF0ZUVycm9yJywgJ05vIHZhbGlkIGRhdGUgcGFzc2VkIGluIC0ge2RhdGEudmFsaWREYXRlfScpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaW5pdGlhdGUuZGF0ZXMuZHVlLl90eXBlID09ICd1c2VyU2VsZWN0ZWQnIHx8IGluaXRpYXRlLmRhdGVzLmR1ZS5fdHlwZSA9PSAnYXV0b1NlbGVjdGVkJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5kdWVEYXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5kYXRlcy5kdWUgPSBkYXRhLmR1ZURhdGU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlsLndhcm4oJ1dGSW5pdGlhdGVFcnJvcicsICdObyBkdWUgZGF0ZSBwYXNzZWQgaW4gLSB7ZGF0YS5kdWVEYXRlfScpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXN1bHQuaW5pdGlhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnU3ViLVByb2Nlc3MgaW5pdGlhdGUgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCByZXN1bHQpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7Ki9cblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGSW5pdGlhdGVFcnJvcicsICdJbml0aWF0ZSB0eXBlOiAnICsgaW5pdGlhdGUuX3R5cGUgKyAnIG5vdCBkZWZpbmVkLicpO1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN1YlByb2Nlc3MuY29tcGxldGUgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpbml0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXN1YlByb2Nlc3MuY29tcGxldGUpIHtcbiAgICAgICAgICAgIGlmIChpbml0aWF0ZS5wYXJhbGxlbEluc3RhbmNlcykge1xuICAgICAgICAgICAgICAgIGluaXQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZJbml0aWF0ZUVycm9yJywgJ1N1Yi1wcm9jZXNzOiAnICsgc3ViUHJvY2Vzcy5pZCArICcgc3RpbGwgYWN0aXZlIGFuZCBwYXJhbGxlbCBpbnN0YW5jZXMgYXJlIG5vdCBhbGxvd2VkLicpO1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFByb2Nlc3Mgc3RlcFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9jZXNzSWQgLSB0aGUgY3VycmVudCBwcm9jZXNzIGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gc3ViUHJvY2Vzc0lkIC0gdGhlIGN1cnJlbnQgc3ViLXByb2Nlc3MgaWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdGVwSWQgLSB0aGUgY3VycmVudCBzdWItcHJvY2VzcyBzdGVwIGlkXG4gKiBAcGFyYW0ge251bWJlcn0gc3RlcFNlcSAtIHRoZSBjdXJyZW50IHN1Yi1wcm9jZXNzIHN0ZXAgaW5zdGFuY2UgY291bnRlciAvIHNlcXVlbmNlXG4gKiBAcGFyYW0ge29iamVjdH0gZGF0YSAtIHRoZSB1c2VyIGlucHV0IGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IF9XRkluc3RhbmNlIGNvbnN0cnVjdG9yIGluc3RhbmNlXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiBzdGVwKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdGVwSWQsIHN0ZXBTZXEsIGRhdGEsIF9XRkluc3RhbmNlLCBzcHV1aWQpIHtcblxuICAgIC8vIERlZmF1bHQgc3RlcCBtb2RlbFxuICAgIHZhciBtb2RlbCA9IHtcbiAgICAgICAgaWQ6ICcnLFxuICAgICAgICBzZXE6ICcnLFxuICAgICAgICBzdGF0dXM6ICcnLFxuICAgICAgICBtZXNzYWdlOiAnJyxcbiAgICAgICAgYXNzaWduZWRUbzoge1xuICAgICAgICAgICAgdXNlcklkOiAnJyxcbiAgICAgICAgICAgIG5hbWU6ICcnXG4gICAgICAgIH0sXG4gICAgICAgIGFzc2lnbm1lbnQ6IHt9LFxuICAgICAgICBjb21tZW50OiAnJ1xuICAgIH07XG5cbiAgICB2YXIgc3ViUHJvY2VzcyA9IHt9O1xuXG4gICAgdmFyIHV1aWQgPSAnJztcbiAgICB2YXIgaW5zdFN1YlByb2Nlc3M7XG4gICAgdmFyIHN0ZXAgPSB7fTtcblxuICAgIHZhciB0cmFuc2l0aW9uSWQgPSAnJztcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvL0dldCB0aGUgY3VycmVudCBzdWJQcm9jZXNzIGluc3RhbmNlIGRhdGFcbiAgICAgICAgICAgIF9XRkluc3RhbmNlLmluc3RhbmNlLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqUHJvY2Vzcykge1xuICAgICAgICAgICAgICAgIGlmIChvYmpQcm9jZXNzLmlkID09IHByb2Nlc3NJZCAmJiBvYmpQcm9jZXNzLnNlcSA9PSBwcm9jZXNzU2VxKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ialByb2Nlc3Muc3ViUHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmpTdWJQcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqU3ViUHJvY2Vzcy5pZCA9PSBzdWJQcm9jZXNzSWQgJiYgb2JqU3ViUHJvY2Vzcy5zZXEgPT0gc3ViUHJvY2Vzc1NlcSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV1aWQgPSBvYmpTdWJQcm9jZXNzLnV1aWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHN1YlByb2Nlc3NJdGVtKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN1YlByb2Nlc3NJdGVtLl9pZCA9PSB1dWlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGluc3RTdWJQcm9jZXNzID0gc3ViUHJvY2Vzc0l0ZW07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgX1dGSW5zdGFuY2UuY29uZmlnLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqUHJvY2Vzcykge1xuICAgICAgICAgICAgICAgIGlmIChvYmpQcm9jZXNzLl9pZCA9PSBwcm9jZXNzSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqUHJvY2Vzcy5zdWJQcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKG9ialN1YlByb2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmpTdWJQcm9jZXNzLl9pZCA9PSBzdWJQcm9jZXNzSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzID0gb2JqU3ViUHJvY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmpTdWJQcm9jZXNzLnN0ZXBzLmZpbHRlcihmdW5jdGlvbihvYmpTdGVwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmpTdGVwLl9pZCA9PSBzdGVwSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXAgPSBvYmpTdGVwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgc3ViLXByb2Nlc3Mgc3RlcCBkYXRhXG4gICAgICAgICAgICBtb2RlbC5pZCA9IHN0ZXBJZDtcbiAgICAgICAgICAgIG1vZGVsLnNlcSA9IHN0ZXBTZXE7XG5cbiAgICAgICAgICAgIHZhciBpbnN0YW5jZVN0YXR1cyA9ICcnO1xuICAgICAgICAgICAgaWYgKHN0ZXAuc2V0SW5zdGFuY2VTdGF0dXNUby5Ob3RTdGFydGVkICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlU3RhdHVzID0gXCJOb3RTdGFydGVkXCI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0ZXAuc2V0SW5zdGFuY2VTdGF0dXNUby5DcmVhdGVkICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlU3RhdHVzID0gXCJDcmVhdGVkXCI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0ZXAuc2V0SW5zdGFuY2VTdGF0dXNUby5JblByb2dyZXNzICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlU3RhdHVzID0gXCJJblByb2dyZXNzXCI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0ZXAuc2V0SW5zdGFuY2VTdGF0dXNUby5TdWJtaXR0ZWQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VTdGF0dXMgPSBcIlN1Ym1pdHRlZFwiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGVwLnNldEluc3RhbmNlU3RhdHVzVG8uQ29tcGxldGUgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VTdGF0dXMgPSBcIkNvbXBsZXRlXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBsYW5ndWFnZSA9IHNlcnZpY2UuZ2V0TGFuZ3VhZ2UoKTtcblxuICAgICAgICAgICAgbW9kZWwuc3RhdHVzID0gaW5zdGFuY2VTdGF0dXM7XG4gICAgICAgICAgICBtb2RlbC5tZXNzYWdlID0gZXZhbChcInN0ZXAuc2V0SW5zdGFuY2VTdGF0dXNUby5cIiArIGluc3RhbmNlU3RhdHVzICsgXCIubGFiZWwuaTE4bi5cIiArIGxhbmd1YWdlKTtcbiAgICAgICAgICAgIG1vZGVsLmNvbW1lbnQgPSBkYXRhLmNvbW1lbnQgIT09IHVuZGVmaW5lZCA/IGRhdGEuY29tbWVudCA6ICcnO1xuICAgICAgICAgICAgdmFyIGluZGljYXRvcnMgPSBpbnN0U3ViUHJvY2VzcyAhPT0gdW5kZWZpbmVkID8gaW5zdFN1YlByb2Nlc3MuaW5kaWNhdG9ycyA6IFtdO1xuICAgICAgICAgICAgaW5kaWNhdG9yRG9jcyhwcm9jZXNzSWQsIGluZGljYXRvcnMsIG1vZGVsLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICB1dWlkID0gc3B1dWlkO1xuXG4gICAgICAgICAgICAgICAgaWYgKHN0ZXAuZnVuY3Rpb24uYWN0aW9ucyAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9ucyhzdGVwLmZ1bmN0aW9uLmFjdGlvbnMsIHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdWJQcm9jZXNzLCBtb2RlbCwgX1dGSW5zdGFuY2UsIGRhdGEsIHNwdXVpZClcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEV4ZWN1dGUgdGhlIHRyYW5zaXRpb25zLCBpZiBhdXRvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRyYW5zaXRpb25JZCA9IHN0ZXAudHJhbnNpdGlvblswXS5faWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbihwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3RlcElkLCB0cmFuc2l0aW9uSWQsIGRhdGEsIF9XRkluc3RhbmNlLCBzcHV1aWQsIG1vZGVsKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnVHJhbnNpdGlvbiBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHJlc3VsdC5kYXRhLnN0ZXApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBFbHNlIHRhc2tzIGFyZSBzcHJlY2lmaWVkLCBleGVjdXRlIHRoZW1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0ZXAuZnVuY3Rpb24udGFzayAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTWFrZSBhc3NpZ25tZW50c1xuICAgICAgICAgICAgICAgICAgICB0YXNrKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3RlcC5mdW5jdGlvbi50YXNrLCBzcHV1aWQsIG1vZGVsKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1Rhc2sgY29tcGxldGUuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnVGFzayBhd2FpdGluZyB1c2VyIGFjdGlvbi4nLCBtb2RlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG5cbiAgICB9KTtcbn07XG5cbi8qKlxuICogUHJvY2VzcyBpbmRpY2F0b3IgdXBkYXRlc1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBhY3Rpb25zIC0gdGhlIGFjdGlvbnMgY29uZmlnIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBzdWJQcm9jZXNzIC0gdGhlIGN1cnJlbnQgc3ViLXByb2Nlc3MgZm9ybSBjb25maWcgZGF0YVxuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcbiAqXG4gKiBAZXhhbXBsZSAnJ1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cbmZ1bmN0aW9uIGluZGljYXRvcnMoaW5kaWNhdG9ycywgX1dGSW5zdGFuY2UsIHNwdXVpZCkge1xuICAgIHZhciBtb2RlbCA9IFtdO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciBhcnJheSA9IEpTT04ueHBhdGgoXCJpbmRpY2F0b3JzW2ZuOmNvdW50KC4vd29ya2Zsb3dzL3Byb2Nlc3Nlc1tzdWJQcm9jZXNzVVVJRCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddKSBndCAwXVwiLCBfV0ZJbnN0YW5jZSwge30pO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBhcnJheS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3IgPSBhcnJheVtqXTtcbiAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yTW9kZWwgPSB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2VzOiBbXVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBpbnN0YW5jZU1vZGVsID0ge1xuICAgICAgICAgICAgICAgICAgICB1dWlkOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICcnLFxuICAgICAgICAgICAgICAgICAgICBrZXk6ICcnLFxuICAgICAgICAgICAgICAgICAgICBzZXE6IDFcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpbmRpY2F0b3JNb2RlbC5pZCA9IGluZGljYXRvci5jYXRlZ29yeS50ZXJtO1xuICAgICAgICAgICAgICAgIGluc3RhbmNlTW9kZWwudXVpZCA9IGluZGljYXRvci5faWQ7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VNb2RlbC50aXRsZSA9IGluZGljYXRvci50aXRsZTtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZU1vZGVsLmtleSA9ICcnO1xuICAgICAgICAgICAgICAgIGluc3RhbmNlTW9kZWwuc2VxID0gaW5kaWNhdG9yLm1vZGVsLnBlbmRpbmcuc2VxOyAvLyBpbmRpY2F0b3Igc2VxIG51bWJlciBoZXJlIHdoaWNoIGlzIGdldHRpbmcgdXBkYXRlZC5cbiAgICAgICAgICAgICAgICBpbmRpY2F0b3JNb2RlbC5pbnN0YW5jZXMucHVzaChpbnN0YW5jZU1vZGVsKTtcbiAgICAgICAgICAgICAgICBtb2RlbC5wdXNoKGluZGljYXRvck1vZGVsKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1Byb2Nlc3MgaW5kaWNhdG9yIG1vZGVsIHVwZGF0ZWQuJywgbW9kZWwpO1xuICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgfSlcbn07XG5cbi8qKlxuICogUHJvY2VzcyBhc3NpZ24gdXNlclxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBwcm9jZXNzIGlkXG4gKiBAcGFyYW0ge251bWJlcn0gcHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBwcm9jZXNzIHNlcVxuICogQHBhcmFtIHtzdHJpbmd9IHN1YlByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN1Yi1wcm9jZXNzIGlkXG4gKiBAcGFyYW0ge251bWJlcn0gc3ViUHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBzdWItcHJvY2VzcyBzZXFcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdGVwSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdGVwIGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gdHJhbnNpdGlvbklkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gdHJhbnNpdGlvbiBpZFxuICogQHBhcmFtIHtvYmplY3R9IHVzZXIgLSB0aGUgdXNlciB0byBhc3NpZ24gdG9cbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiBhc3NpZ25Vc2VyKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCB1c2VyLCBfV0ZJbnN0YW5jZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciB1dWlkID0gJyc7XG4gICAgICAgICAgICAvLyBHZXQgdGhlIGN1cnJlbnQgc3ViUHJvY2VzcyBpbnN0YW5jZSBkYXRhXG4gICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbnN0YW5jZS5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKG9ialByb2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBpZiAob2JqUHJvY2Vzcy5pZCA9PSBwcm9jZXNzSWQgJiYgb2JqUHJvY2Vzcy5zZXEgPT0gcHJvY2Vzc1NlcSkge1xuICAgICAgICAgICAgICAgICAgICBvYmpQcm9jZXNzLnN1YlByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqU3ViUHJvY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9ialN1YlByb2Nlc3MuaWQgPT0gc3ViUHJvY2Vzc0lkICYmIG9ialN1YlByb2Nlc3Muc2VxID09IHN1YlByb2Nlc3NTZXEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dWlkID0gb2JqU3ViUHJvY2Vzcy51dWlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHN1YlByb2Nlc3NJdGVtKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN1YlByb2Nlc3NJdGVtLl9pZCA9PSB1dWlkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNldCB0aGUgdXNlciBkZXRhaWxzXG4gICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NJdGVtLnN0ZXAuYXNzaWduZWRUby51c2VySWQgPSB1c2VyLmlkO1xuICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzSXRlbS5zdGVwLmFzc2lnbmVkVG8ubmFtZSA9IHVzZXIubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBpbmRpY2F0b3JzIHVzZXIgZGV0YWlsc1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9ycyA9IHN1YlByb2Nlc3NJdGVtLmluZGljYXRvcnM7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5kaWNhdG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvciA9IGluZGljYXRvcnNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGluZGljYXRvci5pbnN0YW5jZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSBpbmRpY2F0b3IuaW5zdGFuY2VzW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZG9jID0gX1dGSW5zdGFuY2UuaW5kaWNhdG9yc1trXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlLnV1aWQgPT0gZG9jLl9pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jLndvcmtmbG93cy5maWx0ZXIoZnVuY3Rpb24od29ya2Zsb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod29ya2Zsb3cuaWQgPT0gX1dGSW5zdGFuY2UuY29uZmlnLl9pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3b3JrZmxvdy5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHByb2Nlc3NJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvY2Vzc0l0ZW0uaWQgPT0gcHJvY2Vzc0lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSB1c2VyIGlkIGFuZCBuYW1lIGluIHRoZSBkb2N1bWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NJdGVtLnN0ZXAuYXNzaWduZWRUby51c2VySWQgPSB1c2VyLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NJdGVtLnN0ZXAuYXNzaWduZWRUby5uYW1lID0gdXNlci5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1VzZXIgYXNzaWduZWQgc3VjY2Vzc2Z1bGx5LiBVc2VySWQ6IFwiJyArIHVzZXIuaWQgKyAnXCIsIE5hbWU6IFwiJyArIHVzZXIubmFtZSArICdcIicsIHN1YlByb2Nlc3NJdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cblxuICAgIH0pO1xufTtcblxuLyoqXG4gKiBQcm9jZXNzIGluZGljYXRvciBkb2N1bWVudCB1cGRhdGVzXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGFjdGlvbnMgLSB0aGUgYWN0aW9ucyBjb25maWcgZGF0YVxuICogQHBhcmFtIHtvYmplY3R9IHN1YlByb2Nlc3MgLSB0aGUgY3VycmVudCBzdWItcHJvY2VzcyBmb3JtIGNvbmZpZyBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuZnVuY3Rpb24gaW5kaWNhdG9yRG9jcyhwcm9jZXNzSWQsIGluZGljYXRvcnMsIHN0ZXAsIF9XRkluc3RhbmNlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBpbmRpY2F0b3Igc2VjdGlvbnMgb2YgdGhlIHN1YlByb2Nlc3NcbiAgICAgICAgICAgIGlmIChpbmRpY2F0b3JzID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGSW5kaWNhdG9yc1VwZGF0ZScsICdJbmRpY2F0b3JzIHBhcmFtZXRlciBpcyByZXF1aXJlZC4gLSBWYWx1ZTogJyArIGluZGljYXRvcnMpXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5kaWNhdG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yID0gaW5kaWNhdG9yc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBpbmRpY2F0b3IuaW5zdGFuY2VzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSBpbmRpY2F0b3IuaW5zdGFuY2VzW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRvYyA9IF9XRkluc3RhbmNlLmluZGljYXRvcnNba107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlLnV1aWQgPT0gZG9jLl9pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2Mud29ya2Zsb3dzLmZpbHRlcihmdW5jdGlvbih3b3JrZmxvdykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdvcmtmbG93LmlkID09IF9XRkluc3RhbmNlLmNvbmZpZy5faWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3b3JrZmxvdy5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHByb2Nlc3NJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzSXRlbS5pZCA9PSBwcm9jZXNzSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NJdGVtLnN0ZXAuaWQgPSBzdGVwLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0l0ZW0uc3RlcC5zZXEgPSBzdGVwLnNlcTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NJdGVtLnN0ZXAuc3RhdHVzID0gc3RlcC5zdGF0dXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzSXRlbS5zdGVwLm1lc3NhZ2UgPSBzdGVwLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzSXRlbS5zdGVwLmFzc2lnbmVkVG8udXNlcklkID0gc3RlcC5hc3NpZ25lZFRvLnVzZXJJZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NJdGVtLnN0ZXAuYXNzaWduZWRUby5uYW1lID0gc3RlcC5hc3NpZ25lZFRvLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzSXRlbS5zdGVwLmNvbW1lbnQgPSBzdGVwLmNvbW1lbnQgIT09IHVuZGVmaW5lZCA/IHN0ZXAuY29tbWVudCA6ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0luZGljYXRvciBkb2N1bWVudHMgd29ya2Zsb3cgcHJvY2VzcyBtb2RlbCB1cGRhdGVkLicsIF9XRkluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cblxuICAgIH0pXG59O1xuXG4vKipcbiAqIFByb2Nlc3MgYWN0aW9uc1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBhY3Rpb25zIC0gdGhlIGFjdGlvbnMgY29uZmlnIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBzdWJQcm9jZXNzIC0gdGhlIGN1cnJlbnQgc3ViLXByb2Nlc3MgZm9ybSBjb25maWcgZGF0YVxuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcbiAqXG4gKiBAZXhhbXBsZSAnJ1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cbmZ1bmN0aW9uIGFjdGlvbnMoYWN0aW9ucywgcHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN1YlByb2Nlc3MsIHN0ZXAsIF9XRkluc3RhbmNlLCBkYXRhLCB1dWlkKSB7XG4gICAgdmFyIGFyckFjdGlvbnMgPSBbXTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHV0aWwuc3luY0xvb3AoYWN0aW9ucy5sZW5ndGgsIGZ1bmN0aW9uKGxvb3ApIHtcbiAgICAgICAgICAgIHZhciBjb3VudGVyID0gbG9vcC5pdGVyYXRpb24oKTtcbiAgICAgICAgICAgIGFjdGlvbihhY3Rpb25zW2NvdW50ZXJdLCBwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3ViUHJvY2Vzcywgc3RlcCwgX1dGSW5zdGFuY2UsIGRhdGEsIHV1aWQpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXRBY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogYWN0aW9uc1tjb3VudGVyXS5faWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXE6IGNvdW50ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiByZXN1bHRcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICBhcnJBY3Rpb25zLnB1c2gocmV0QWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgbG9vcC5uZXh0KCk7XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvb3AuYnJlYWsoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0FjdGlvbnMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCBhcnJBY3Rpb25zKTtcbiAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcblxuLyoqXG4gKiBQcm9jZXNzIGFjdGlvblxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBhY3Rpb24gLSB0aGUgYWN0aW9uIGNvbmZpZyBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gc3ViUHJvY2VzcyAtIHRoZSBjdXJyZW50IHN1Yi1wcm9jZXNzIGZvcm0gY29uZmlnIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiBhY3Rpb24oYWN0aW9uLCBwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3ViUHJvY2Vzcywgc3RlcCwgX1dGSW5zdGFuY2UsIGRhdGEsIHV1aWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgaWYgKGFjdGlvbi5tZXRob2QgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YXIgbWV0aG9kUG9zc2libGVJdGVtcyA9IFtcImZvcm1cIiwgXCJpbmRpY2F0b3JcIiwgXCJwcm9maWxlXCIsIFwic3ViUHJvY2Vzc0luc3RhbmNlXCIsIFwic3RlcFwiLCBcImNvbW11bml0eVwiLCBcImFwcGxpY2F0aW9uXCIsIFwidXNlclwiLCBcInNkb1wiLCBcInBlcmZvcm1hbmNlXCIsIFwidGF4b25vbXlcIiwgXCJ2YXJpYWJsZXNcIl07XG4gICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5RXhpc3RzKGFjdGlvbi5tZXRob2QsIG1ldGhvZFBvc3NpYmxlSXRlbXMpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnZm9ybSc6XG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24ubWV0aG9kLmZvcm0uY3JlYXRlICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHByb2Nlc3NJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goc3ViUHJvY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goc3RlcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goYWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChwcm9jZXNzU2VxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChzdWJQcm9jZXNzU2VxKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKF9XRkluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmNyZWF0ZVR5cGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHV1aWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEuYmFzZVVVSUQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmNyZWF0ZShhcmdzKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbi5tZXRob2QuZm9ybS5hdXRob3Jpc2UgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2gocHJvY2Vzc0lkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChzdWJQcm9jZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChwcm9jZXNzU2VxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChzdWJQcm9jZXNzU2VxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChfV0ZJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YS5jcmVhdGVUeXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh1dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmJhc2VVVUlEKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uYXV0aG9yaXNlKGFyZ3MpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uLm1ldGhvZC5mb3JtLnVuZHJhZnQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKF9XRkluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmNyZWF0ZVR5cGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHV1aWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEuYmFzZVVVSUQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5zZXRVbkRyYWZ0KGFyZ3MpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uLm1ldGhvZC5mb3JtLmRyYWZ0ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChfV0ZJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YS5jcmVhdGVUeXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh1dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmJhc2VVVUlEKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uc2V0RHJhZnQoYXJncykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24ubWV0aG9kLmZvcm0uY2xvc2UgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goc3ViUHJvY2Vzcy5pbmRpY2F0b3JzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChfV0ZJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YS5jcmVhdGVUeXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh1dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmJhc2VVVUlEKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uY2xvc2UoYXJncykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2luZGljYXRvcic6XG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24ubWV0aG9kLmluZGljYXRvci5jcmVhdGUgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24ubWV0aG9kLmluZGljYXRvci5pbnN0YW50aWF0ZSAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbi5tZXRob2QuaW5kaWNhdG9yLnNldFZhbHVlICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGF0aCA9IGFjdGlvbi5tZXRob2QuaW5kaWNhdG9yLnNldFZhbHVlLnBhdGg7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGhlbHBlci5nZXROb2RlVmFsdWUoYWN0aW9uLm1ldGhvZC5pbmRpY2F0b3Iuc2V0VmFsdWUuZGF0YSwgX1dGSW5zdGFuY2UsIHV1aWQpLnRoZW4oZnVuY3Rpb24oZGF0YVZhbHVlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChfV0ZJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHV1aWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChwYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YVZhbHVlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0udXBkYXRlSW5kaWNhdG9yKGFyZ3MpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uLm1ldGhvZC5pbmRpY2F0b3IudXBkYXRlU3RhdHVzICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yU2V0SWQgPSBhY3Rpb24ubWV0aG9kLmluZGljYXRvci5pbmRpY2F0b3JTZXRJZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goX1dGSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHV1aWQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uLm1ldGhvZC5pbmRpY2F0b3IudXBkYXRlU3RhdHVzICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGF0dXMgPSBhY3Rpb24ubWV0aG9kLmluZGljYXRvci51cGRhdGVTdGF0dXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHN0YXR1cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGluZGljYXRvclNldElkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBLZWVwIGluZGljYXRvciBmdW5jdGlvbnMgaW4gaW5kaWF0b3IgZmlsZSBpc3RlYWQgb2YgZm9ybSBmaWxlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0ubWFya1VwZGF0ZUluZGljYXRvcihhcmdzKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShcIkFjdGlvbiBpbmRpY2F0b3Igc3ViIHR5cGUgbm90IGZvdW5kLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncHJvZmlsZSc6XG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24ubWV0aG9kLnByb2ZpbGUuY3JlYXRlICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHByb2Nlc3NJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goX1dGSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEuY3JlYXRlVHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2godXVpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YS5iYXNlVVVJRCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmNyZWF0ZVByb2ZpbGUoYXJncykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24ubWV0aG9kLnByb2ZpbGUuWCAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3ViUHJvY2Vzc0luc3RhbmNlJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNwUG9zc2libGVJdGVtcyA9IFtcImluc3RhbnRpYXRlXCIsIFwiYXV0aG9yaXNlXCIsIFwiY2xvc2VcIiwgXCJzZXRWYXJpYWJsZVwiLCBcInNldFN0YXR1c1RvXCIsIFwic2V0U3RhdHVzTXNnVG9cIiwgXCJzZXRUaXRsZVwiLCBcInNldFZhbGlkRGF0ZVwiXTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChwcm9wZXJ0eUV4aXN0cyhhY3Rpb24ubWV0aG9kLnN1YlByb2Nlc3NJbnN0YW5jZSwgc3BQb3NzaWJsZUl0ZW1zKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzZXRUaXRsZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVscGVyLmdldE5vZGVWYWx1ZShhY3Rpb24ubWV0aG9kLnN1YlByb2Nlc3NJbnN0YW5jZS5zZXRUaXRsZSwgX1dGSW5zdGFuY2UsIHV1aWQpLnRoZW4oZnVuY3Rpb24oZGF0YVZhbHVlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uc01vZHVsZS5zdWJQcm9jZXNzSW5zdGFuY2Uuc2V0VGl0bGUoYWN0aW9uLm1ldGhvZC5zdWJQcm9jZXNzSW5zdGFuY2Uuc2V0VGl0bGUsIHV1aWQsIGRhdGFWYWx1ZSwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3VwZGF0ZSBzdWJwcm9jZXNzIGxhYmVsIGluIHdvcmtmbG93IGluc3RhbmNlIHByb2Nlc3Mgb2JqZWN0OiBUT0RPXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3NldFZhbGlkRGF0ZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVscGVyLmdldE5vZGVWYWx1ZShhY3Rpb24ubWV0aG9kLnN1YlByb2Nlc3NJbnN0YW5jZS5zZXRWYWxpZERhdGUsIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uKGRhdGFWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25zTW9kdWxlLnN1YlByb2Nlc3NJbnN0YW5jZS5zZXRWYWxpZERhdGUoYWN0aW9uLm1ldGhvZC5zdWJQcm9jZXNzSW5zdGFuY2Uuc2V0VmFsaWREYXRlLCB1dWlkLCBkYXRhVmFsdWUsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdXBkYXRlIHN1YnByb2Nlc3MgbGFiZWwgaW4gd29ya2Zsb3cgaW5zdGFuY2UgcHJvY2VzcyBvYmplY3Q6IFRPRE9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJObyBtZXRob2QgZm91bmQgZnJvbSBpbXBsZW1lbnRlZCBsaXN0IGluIHN1YnByb2Nlc3MgYWN0aW9uLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3N0ZXAnOlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdjb21tdW5pdHknOlxuICAgICAgICAgICAgICAgICAgICB2YXIgY29tbXVuaXR5UG9zc2libGVJdGVtcyA9IFtcImNyZWF0ZUNvbW11bml0eVwiLCBcInJlbGVhc2VBZG9wdGVkQXBwbGljYXRpb25cIiwgXCJ1c2VySm9pbkNvbW11bml0eVwiXTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChwcm9wZXJ0eUV4aXN0cyhhY3Rpb24ubWV0aG9kLmNvbW11bml0eSwgY29tbXVuaXR5UG9zc2libGVJdGVtcykpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnY3JlYXRlQ29tbXVuaXR5JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5jb21tdW5pdHkuY3JlYXRlQ29tbXVuaXR5KGFjdGlvbi5tZXRob2QuY29tbXVuaXR5LmNyZWF0ZUNvbW11bml0eSwgdXVpZCwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncmVsZWFzZUFkb3B0ZWRBcHBsaWNhdGlvbic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUuY29tbXVuaXR5LnJlbGVhc2VBZG9wdGVkQXBwbGljYXRpb24oYWN0aW9uLm1ldGhvZC5jb21tdW5pdHkucmVsZWFzZUFkb3B0ZWRBcHBsaWNhdGlvbiwgdXVpZCwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAndXNlckpvaW5Db21tdW5pdHknOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25zTW9kdWxlLmNvbW11bml0eS51c2VySm9pbkNvbW11bml0eShhY3Rpb24ubWV0aG9kLmNvbW11bml0eS51c2VySm9pbkNvbW11bml0eSwgdXVpZCwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJObyBtZXRob2QgZm91bmQgZnJvbSBpbXBsZW1lbnRlZCBsaXN0LlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2FwcGxpY2F0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFwcGxpY2F0aW9uUG9zc2libGVJdGVtcyA9IFtcImNyZWF0ZUFwcERlZmluaXRpb25cIiwgXCJidWlsZEFwcGxpY2F0aW9uXCIsIFwiYXBwbGljYXRpb25BZG9wdGlvblwiXTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChwcm9wZXJ0eUV4aXN0cyhhY3Rpb24ubWV0aG9kLmFwcGxpY2F0aW9uLCBhcHBsaWNhdGlvblBvc3NpYmxlSXRlbXMpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NyZWF0ZUFwcERlZmluaXRpb24nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25zTW9kdWxlLmFwcGxpY2F0aW9uLmNyZWF0ZUFwcERlZmluaXRpb24oYWN0aW9uLm1ldGhvZC5hcHBsaWNhdGlvbi5jcmVhdGVBcHBEZWZpbml0aW9uLCB1dWlkLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdidWlsZEFwcGxpY2F0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5hcHBsaWNhdGlvbi5idWlsZEFwcGxpY2F0aW9uKGFjdGlvbi5tZXRob2QuYXBwbGljYXRpb24uYnVpbGRBcHBsaWNhdGlvbiwgdXVpZCwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYXBwbGljYXRpb25BZG9wdGlvbic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUuYXBwbGljYXRpb24uYXBwbGljYXRpb25BZG9wdGlvbihhY3Rpb24ubWV0aG9kLmFwcGxpY2F0aW9uLmFwcGxpY2F0aW9uQWRvcHRpb24sIHV1aWQsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3VzZXInOlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdzZG8nOlxuICAgICAgICAgICAgICAgICAgICB2YXIgc2RvUG9zc2libGVJdGVtcyA9IFtcImNyZWF0ZVwiXTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChwcm9wZXJ0eUV4aXN0cyhhY3Rpb24ubWV0aG9kLnNkbywgc2RvUG9zc2libGVJdGVtcykpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnY3JlYXRlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5zZG8uY3JlYXRlKGFjdGlvbi5tZXRob2Quc2RvLmNyZWF0ZSwgdXVpZCwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJObyBtZXRob2QgZm91bmQgZnJvbSBpbXBsZW1lbnRlZCBsaXN0LlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAncGVyZm9ybWFuY2UnOlxuICAgICAgICAgICAgICAgICAgICB2YXIgcGVyZm9ybWFuY2VQb3NzaWJsZUl0ZW1zID0gW1wiY3JlYXRlXCIsIFwiY29uZmlndXJlTm9kZVwiLCBcInVubG9ja1BlcmlvZFwiLCBcImxvY2tQZXJmb3JtYW5jZU1vZGVsXCJdO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5RXhpc3RzKGFjdGlvbi5tZXRob2QucGVyZm9ybWFuY2UsIHBlcmZvcm1hbmNlUG9zc2libGVJdGVtcykpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnY3JlYXRlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5wZXJmb3JtYW5jZS5jcmVhdGUoYWN0aW9uLm1ldGhvZC5wZXJmb3JtYW5jZS5jcmVhdGUsIHV1aWQsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjb25maWd1cmVOb2RlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5wZXJmb3JtYW5jZS5jb25maWd1cmVOb2RlKGFjdGlvbi5tZXRob2QucGVyZm9ybWFuY2UuY29uZmlndXJlTm9kZSwgdXVpZCwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3VubG9ja1BlcmlvZCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUucGVyZm9ybWFuY2UudW5sb2NrUGVyaW9kKGFjdGlvbi5tZXRob2QucGVyZm9ybWFuY2UudW5sb2NrUGVyaW9kLCB1dWlkLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbG9ja1BlcmZvcm1hbmNlTW9kZWwnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25zTW9kdWxlLnBlcmZvcm1hbmNlLmxvY2tQZXJmb3JtYW5jZU1vZGVsKGFjdGlvbi5tZXRob2QucGVyZm9ybWFuY2UubG9ja1BlcmZvcm1hbmNlTW9kZWwsIHV1aWQsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJObyBtZXRob2QgZm91bmQgZnJvbSBpbXBsZW1lbnRlZCBsaXN0LlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAndGF4b25vbXknOlxuICAgICAgICAgICAgICAgICAgICB2YXIgdGF4b25vbXlQb3NzaWJsZUl0ZW1zID0gW1wiY3JlYXRlXCJdO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5RXhpc3RzKGFjdGlvbi5tZXRob2QudGF4b25vbXksIHRheG9ub215UG9zc2libGVJdGVtcykpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnY3JlYXRlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS50YXhvbm9teS5jcmVhdGUoYWN0aW9uLm1ldGhvZC50YXhvbm9teS5jcmVhdGUsIHV1aWQsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd2YXJpYWJsZXMnOlxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFyaWFibGVzUG9zc2libGVJdGVtcyA9IFtcInNldFZhcmlhYmxlXCJdO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5RXhpc3RzKGFjdGlvbi5tZXRob2QudmFyaWFibGVzLCB2YXJpYWJsZXNQb3NzaWJsZUl0ZW1zKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzZXRWYXJpYWJsZSc6XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS52YXJpYWJsZXMuc2V0VmFyaWFibGUoYWN0aW9uLm1ldGhvZC52YXJpYWJsZXMuc2V0VmFyaWFibGUsIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChcIm1ldGhvZCBub3QgZGVmaW5lZCBpbiBjb25maWd1cmF0aW9uXCIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdC5cIik7XG5cbiAgICAgICAgfVxuXG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFByb2Nlc3MgdGFza3NcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdGFzayAtIHRoZSB0YXNrIGNvbmZpZyBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gaW5wdXREYXRhIC0gdGhlIHVzZXIgaW5wdXQgZGF0YVxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuZnVuY3Rpb24gdGFzayhzdWJwcm9jZXNzSUQsIHN1YnByb2Nlc3NTRVEsIHRhc2ssIHNwdXVpZCwgbW9kZWwpIHtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIGxpc3QgPSBbXTtcbiAgICAgICAgaWYgKHRhc2suYXNzaWduLnJvbGUgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YXIgYXNzaWduVHlwZSA9ICdwcm9maWxlUm9sZSc7XG4gICAgICAgICAgICB2YXIgcHJvZmlsZUlkID0gYXBwLlNDT1BFLndvcmtmbG93LnByb2ZpbGU7XG4gICAgICAgICAgICB2YXIgaWQgPSAnJztcbiAgICAgICAgICAgIGlmICh0YXNrLmFzc2lnbi5yb2xlLnByb2ZpbGUgPT0gJ2N1cnJlbnQnKSB7XG4gICAgICAgICAgICAgICAgaWQgPSBhcHAuU0NPUEUud29ya2Zsb3cucHJvZmlsZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFzay5hc3NpZ24ucm9sZS5wcm9maWxlID09ICdjb21tdW5pdHknKSB7XG4gICAgICAgICAgICAgICAgaWQgPSBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHJvbGUgPSB0YXNrLmFzc2lnbi5yb2xlLnJvbGVJZDtcblxuICAgICAgICAgICAgbGlicmFyeS5nZXRVc2Vyc0xpc3RCeVJvbGUoaWQsIHJvbGUpLnRoZW4oZnVuY3Rpb24obGlzdCkge1xuICAgICAgICAgICAgICAgIGlmIChsaXN0ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdC5sZW5ndGggPiAxKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhc3NpZ25tZW50ID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFzay5hc3NpZ24uYXNzaWdubWVudCAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhc3NpZ25tZW50ID0gbW9kZWwuYXNzaWdubWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWNjZXB0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNob3dcIjogdGFzay5hc3NpZ24uYXNzaWdubWVudC5hY2NlcHQuc2hvdyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBfZ2V0TmFtZUJ5TGFuZyh0YXNrLmFzc2lnbi5hc3NpZ25tZW50LmFjY2VwdC5sYWJlbC5pMThuKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50LmFjY2VwdCA9IGFjY2VwdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50Lm1lc3NhZ2UgPSBfZ2V0TmFtZUJ5TGFuZyh0YXNrLmFzc2lnbi5hc3NpZ25tZW50Lm1lc3NhZ2UuaTE4bik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlamVjdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaG93XCI6IHRhc2suYXNzaWduLmFzc2lnbm1lbnQucmVqZWN0LnNob3csXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogX2dldE5hbWVCeUxhbmcodGFzay5hc3NpZ24uYXNzaWdubWVudC5yZWplY3QubGFiZWwuaTE4bilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5yZWplY3QgPSByZWplY3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb2ZpbGVJZFwiOiBwcm9maWxlSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicm9sZUlkXCI6IHJvbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInJvbGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50LnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5wcm9maWxlUm9sZUlkID0gaWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgnTm90aWZpY2F0aW9ucyByZXF1ZXN0IHN1Ym1pdHRlZCBmb3IgYWNjZXB0YW5jZS4nKTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxpc3QubGVuZ3RoID09IDEpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVzZXJJZCA9IGxpc3RbMF0uaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdXNlcm5hbWUgPSBsaXN0WzBdLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXNzaWduZWUgPSBtb2RlbC5hc3NpZ25lZFRvO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduZWUubmFtZSA9IHVzZXJuYW1lICsgXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVlLnVzZXJJZCA9IHVzZXJJZCArIFwiXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhc3NpZ25tZW50ID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFzay5hc3NpZ24uYXNzaWdubWVudCAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhc3NpZ25tZW50ID0gbW9kZWwuYXNzaWdubWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWNjZXB0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNob3dcIjogdGFzay5hc3NpZ24uYXNzaWdubWVudC5hY2NlcHQuc2hvdyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBfZ2V0TmFtZUJ5TGFuZyh0YXNrLmFzc2lnbi5hc3NpZ25tZW50LmFjY2VwdC5sYWJlbC5pMThuKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50LmFjY2VwdCA9IGFjY2VwdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50Lm1lc3NhZ2UgPSBfZ2V0TmFtZUJ5TGFuZyh0YXNrLmFzc2lnbi5hc3NpZ25tZW50Lm1lc3NhZ2UuaTE4bik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlamVjdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaG93XCI6IHRhc2suYXNzaWduLmFzc2lnbm1lbnQucmVqZWN0LnNob3csXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogX2dldE5hbWVCeUxhbmcodGFzay5hc3NpZ24uYXNzaWdubWVudC5yZWplY3QubGFiZWwuaTE4bilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5yZWplY3QgPSByZWplY3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb2ZpbGVJZFwiOiBwcm9maWxlSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicm9sZUlkXCI6IHJvbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInJvbGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50LnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5wcm9maWxlUm9sZUlkID0gaWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgnQXNzaWduZWQgdG8gdGhlIG9ubHkgdXNlciBpbiByb2xlLicpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhc3NpZ25lZSA9IG1vZGVsLmFzc2lnbmVkVG87XG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25lZS5uYW1lID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVlLnVzZXJJZCA9IFwiXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhc3NpZ25tZW50ID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFzay5hc3NpZ24uYXNzaWdubWVudCAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhc3NpZ25tZW50ID0gbW9kZWwuYXNzaWdubWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWNjZXB0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNob3dcIjogdGFzay5hc3NpZ24uYXNzaWdubWVudC5hY2NlcHQuc2hvdyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBfZ2V0TmFtZUJ5TGFuZyh0YXNrLmFzc2lnbi5hc3NpZ25tZW50LmFjY2VwdC5sYWJlbC5pMThuKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50LmFjY2VwdCA9IGFjY2VwdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50Lm1lc3NhZ2UgPSBfZ2V0TmFtZUJ5TGFuZyh0YXNrLmFzc2lnbi5hc3NpZ25tZW50Lm1lc3NhZ2UuaTE4bik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlamVjdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaG93XCI6IHRhc2suYXNzaWduLmFzc2lnbm1lbnQucmVqZWN0LnNob3csXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogX2dldE5hbWVCeUxhbmcodGFzay5hc3NpZ24uYXNzaWdubWVudC5yZWplY3QubGFiZWwuaTE4bilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5yZWplY3QgPSByZWplY3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb2ZpbGVJZFwiOiBwcm9maWxlSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicm9sZUlkXCI6IHJvbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInJvbGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50LnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5wcm9maWxlUm9sZUlkID0gaWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShcIk5vIHVzZXJzIGZvdW5kIGluIGxpc3QuIEFzc2lnbmluZyBibGFuayBcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIGluIGdldFVzZXJzTGlzdEJ5Um9sZSB1bmRlZmluZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgaW4gZ2V0VXNlcnNMaXN0QnlSb2xlJyk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmICh0YXNrLmFzc2lnbi5zd2ltbGFuZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlc29sdmUoJ3N3aW1sYW5lJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU3dpbWxhbmUgaW1wbGVtZW50YXRpb24gISEnKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn07XG5cbi8qKlxuICogUHJvY2VzcyB0cmFuc2l0aW9uXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHByb2Nlc3MgaWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBwcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHByb2Nlc3Mgc2VxXG4gKiBAcGFyYW0ge3N0cmluZ30gc3ViUHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3ViLXByb2Nlc3MgaWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdWJQcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHN1Yi1wcm9jZXNzIHNlcVxuICogQHBhcmFtIHtzdHJpbmd9IHN0ZXBJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN0ZXAgaWRcbiAqIEBwYXJhbSB7c3RyaW5nfSB0cmFuc2l0aW9uSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiB0cmFuc2l0aW9uIGlkXG4gKiBAcGFyYW0ge29iamVjdH0gZGF0YSAtIGFueSBhZGRpdGlvbmFsIGRhdGEgcGFzc2VkIGluIGFzIGtleSB2YWx1ZSBwYWlyc1xuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcbiAqXG4gKiBAZXhhbXBsZSAnJ1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cbmZ1bmN0aW9uIHRyYW5zaXRpb24ocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwgdHJhbnNpdGlvbklkLCBkYXRhLCBfV0ZJbnN0YW5jZSwgc3B1dWlkLCBtb2RlbCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciBzdGVwU2VxID0gMDtcbiAgICAgICAgICAgIHZhciBuZXh0U3RlcElkID0gJyc7XG4gICAgICAgICAgICB2YXIgbmV4dFN0ZXBTZXEgPSAwO1xuICAgICAgICAgICAgdmFyIHN1YlByb2Nlc3MgPSBbXTtcbiAgICAgICAgICAgIHZhciBjdXJyZW50UHJvY2VzcyA9IF9XRkluc3RhbmNlLmNvbmZpZy5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKG9ialByb2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBpZiAob2JqUHJvY2Vzcy5faWQgPT0gcHJvY2Vzc0lkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmpQcm9jZXNzO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgY3VycmVudFN1YlByb2Nlc3MgPSBjdXJyZW50UHJvY2Vzc1swXS5zdWJQcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKG9ialN1YlByb2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBpZiAob2JqU3ViUHJvY2Vzcy5faWQgPT0gc3ViUHJvY2Vzc0lkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmpTdWJQcm9jZXNzO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgY3VycmVudFN0ZXAgPSBjdXJyZW50U3ViUHJvY2Vzc1swXS5zdGVwcy5maWx0ZXIoZnVuY3Rpb24ob2JqU3RlcCkge1xuICAgICAgICAgICAgICAgIGlmIChvYmpTdGVwLl9pZCA9PSBzdGVwSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9ialN0ZXA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciB0cmFuc2l0aW9uID0gY3VycmVudFN0ZXBbMF0udHJhbnNpdGlvbi5maWx0ZXIoZnVuY3Rpb24ob2JqVHJhbnNpdGlvbikge1xuICAgICAgICAgICAgICAgIGlmIChvYmpUcmFuc2l0aW9uLl9pZCA9PSB0cmFuc2l0aW9uSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9ialRyYW5zaXRpb247XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY3VycmVudFN1YlByb2Nlc3NbMF0uc3RlcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFN1YlByb2Nlc3NbMF0uc3RlcHNbaV0uX2lkID09IHN0ZXBJZCkge1xuICAgICAgICAgICAgICAgICAgICBzdGVwU2VxID0gcGFyc2VJbnQoY3VycmVudFN1YlByb2Nlc3NbMF0uc3RlcHNbaV0uX3NlcSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN1cnJlbnRTdWJQcm9jZXNzWzBdLnN0ZXBzLmZpbHRlcihmdW5jdGlvbihzdGVwSXRlbSkge1xuICAgICAgICAgICAgICAgIG5leHRTdGVwU2VxID0gc3RlcFNlcSArIDE7XG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KHN0ZXBJdGVtLl9zZXEpID09IG5leHRTdGVwU2VxKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRTdGVwSWQgPSBzdGVwSXRlbS5faWQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmpQcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9ialByb2Nlc3MuaWQgPT0gcHJvY2Vzc0lkICYmIG9ialByb2Nlc3Muc2VxID09IHByb2Nlc3NTZXEpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqUHJvY2Vzcy5zdWJQcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKG9ialN1YlByb2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmpTdWJQcm9jZXNzLmlkID09IHN1YlByb2Nlc3NJZCAmJiBvYmpTdWJQcm9jZXNzLnNlcSA9PSBzdWJQcm9jZXNzU2VxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHV1aWQgPSBvYmpTdWJQcm9jZXNzLnV1aWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3B1dWlkID0gdXVpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHN1YlByb2Nlc3NJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWJQcm9jZXNzSXRlbS5faWQgPT0gdXVpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2VzcyA9IHN1YlByb2Nlc3NJdGVtO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBtYXhTdGVwcyA9IGN1cnJlbnRTdWJQcm9jZXNzWzBdLnN0ZXBzLmxlbmd0aDtcblxuICAgICAgICAgICAgaWYgKHRyYW5zaXRpb25bMF0udHJhbnNpdGlvbkFjdGlvbi5nb1RvU3RlcCAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgIHZhciBuZXh0U2VxID0gcGFyc2VJbnQoY3VycmVudFN0ZXBbMF0uX3NlcSkgKyBwYXJzZUludCh0cmFuc2l0aW9uWzBdLnRyYW5zaXRpb25BY3Rpb24uZ29Ub1N0ZXAuZGVmYXVsdCk7XG4gICAgICAgICAgICAgICAgdmFyIG5leHRJZCA9ICcnO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRTdWJQcm9jZXNzWzBdLnN0ZXBzLmZpbHRlcihmdW5jdGlvbihzdGVwSXRlbSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChzdGVwSXRlbS5fc2VxKSA9PSBuZXh0U3RlcFNlcSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dElkID0gc3RlcEl0ZW0uX2lkO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHN0ZXAocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIG5leHRJZCwgbmV4dFNlcSwgZGF0YSwgX1dGSW5zdGFuY2UsIHNwdXVpZCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRTZXEgPT0gbWF4U3RlcHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdBbGwgU3RlcCB0cmFuc2l0aW9ucyBoYXZlIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NDb21wbGV0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwOiByZXN1bHQuZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnU3RlcCB0cmFuc2l0aW9uIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NDb21wbGV0ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcDogcmVzdWx0LmRhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHJhbnNpdGlvblswXS50cmFuc2l0aW9uQWN0aW9uLmdvVG9TdGVwSWQgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgZ29Ub1N0ZXBJZCA9IHRyYW5zaXRpb25bMF0udHJhbnNpdGlvbkFjdGlvbi5nb1RvU3RlcElkLnN0ZXBJZDtcbiAgICAgICAgICAgICAgICB2YXIgZ29Ub1N0ZXBTZXEgPSAxO1xuXG4gICAgICAgICAgICAgICAgY3VycmVudFN1YlByb2Nlc3NbMF0uc3RlcHMuZmlsdGVyKGZ1bmN0aW9uKHN0ZXBJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGVwSXRlbS5faWQgPT0gZ29Ub1N0ZXBJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ29Ub1N0ZXBTZXEgPSBwYXJzZUludChzdGVwSXRlbS5fc2VxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBzdGVwKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBnb1RvU3RlcElkLCBnb1RvU3RlcFNlcSwgZGF0YSwgX1dGSW5zdGFuY2UsIHNwdXVpZCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdvVG9TdGVwU2VxID09IG1heFN0ZXBzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdBbGwgU3RlcCB0cmFuc2l0aW9ucyBoYXZlIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NDb21wbGV0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwOiByZXN1bHQuZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdTdGVwIHRyYW5zaXRpb24gY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc0NvbXBsZXRlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwOiByZXN1bHQuZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHJhbnNpdGlvblswXS50cmFuc2l0aW9uQWN0aW9uLnN0b3AgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnU3RlcCB0cmFuc2l0aW9uIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuV29ya2Zsb3cgc3RvcHBlZC4nLCB7XG4gICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NDb21wbGV0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc3RlcDogbW9kZWxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFByb2Nlc3MgcG9zdEFjdGlvbnNcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gcG9zdEFjdGlvbnMgLSB0aGUgcG9zdEFjdGlvbnMgY29uZmlnIGRhdGFcbiAqXG4gKiBAZXhhbXBsZSAnJ1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cbmZ1bmN0aW9uIHBvc3RBY3Rpb25zKHBvc3RBY3Rpb25zLCBfV0ZJbnN0YW5jZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIGNvbXBsZXRlZCA9IFtdO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdXRpbC5zeW5jTG9vcChwb3N0QWN0aW9ucy5sZW5ndGgsIGZ1bmN0aW9uKGxvb3ApIHtcbiAgICAgICAgICAgICAgICB2YXIgY291bnRlciA9IGxvb3AuaXRlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgYWN0aW9uKHBvc3RBY3Rpb25zW2NvdW50ZXJdLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGFsbCBwcmUtcmVxdWlzaXRlcyBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LlxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQucHVzaCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgbG9vcC5uZXh0KCk7XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlZC5wdXNoKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgbG9vcC5icmVhaygpO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZWQuZXZlcnkoQm9vbGVhbikpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1Bvc3QtYWN0aW9ucyBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHt9KTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRlByZUFjdGlvbnNFcnJvcicsICdOb3QgYWxsIHBvc3QtYWN0aW9ucyBwYXNzZWQuJyk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG59O1xuXG4vKlxuZnVuY3Rpb24gc2VuZE5vdGlmaWNhdGlvbnModXNlcnNMaXN0LCBzcHV1aWQpe1xuXG4gIC8vIGdldCB1c2VycyBsaXN0IFxuICAvLyBzZW4gbm90aWZpY2F0aW9ucyB0byB1c2VycyB5IGFkZGluZyBjaGFubmVscyB0byB0aGVtXG5cbiAgdmFyIGNoYW5uZWxBcnJheSA9IFtdO1xuXG4gIGZvcihpPTA7aTx1c2Vyc0xpc3QubGVuZ3RoOyBpKyspe1xuICAgIGNoYW5uZWxBcnJheS5wdXNoKFwidXNlcl9cIit1c2Vyc0xpc3RbaV0uaWQpO1xuICB9XG5cbiAgYXNzaWduVG9Vc2Vycyhwcm9jZXNzV29ya2Zsb3dNZXNzYWdlKE5PVElGSUNBVElPTl9VU0VSX01TR19BQ0NFUFQsIHNwdXVpZCksIGNoYW5uZWxBcnJheSk7XG5cbn07Ki9cblxuLypmdW5jdGlvbiBhc3NpZ25Ub1VzZXJzKG1lc3NhZ2UsIGNoYW5uZWxBcnJheSl7XG5cbiAgICAgdmFyIGNoYW5uZWxzID0gY2hhbm5lbEFycmF5O1xuXG4gICAgIHZhciBub3RpZmljYXRpb24gPSAgeyBcbiAgICAgICAgICBcIl9pZFwiOiBnZW5lcmF0ZVVVSUQoKSxcbiAgICAgICAgICBcImNoYW5uZWxzXCI6Y2hhbm5lbHMsXG4gICAgICAgICAgXCJtZXNzYWdlXCI6IG1lc3NhZ2UsXG4gICAgICAgICAgXCJtZXNzYWdlVHlwZVwiOiBcImluZm9cIixcbiAgICAgICAgICBcImNyZWF0ZWREYXRlVGltZVwiOiBtb21lbnQoKS5mb3JtYXQoKSxcbiAgICAgICAgICBcInJlYWRcIjogZmFsc2UsXG4gICAgICAgICAgXCJyZWFkRGF0ZVRpbWVcIjogXCJcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJub3RpZmljYXRpb25cIixcbiAgICAgICAgICBcInNlbmRlclVzZXJJZFwiOiBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZFxuICAgICAgIH07XG5cbiAgICAgICBjb25zb2xlLmxvZyhub3RpZmljYXRpb24pO1xuICAgICAgIGRhby51cHNlcnQobm90aWZpY2F0aW9uKTtcblxuICB9OyovXG5cbmZ1bmN0aW9uIHByb2Nlc3NXb3JrZmxvd01lc3NhZ2UobWVzc2FnZSwgc3B1dWlkKSB7XG5cbiAgICB2YXIgcmVwbGFjZWRNc2cgPSBtZXNzYWdlO1xuXG4gICAgaWYgKHJlcGxhY2VkTXNnLmluZGV4T2YoJyNJTlNUQU5DRV9MQUJFTCcpICE9PSAtMSkge1xuICAgICAgICB2YXIgdmFsID0gSlNPTi54cGF0aChcIi9pbnN0YW5jZS9wcm9jZXNzZXMvc3ViUHJvY2Vzc2VzW3V1aWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXS9sYWJlbFwiLCBhcHAuU0NPUEUud29ya2Zsb3csIHt9KVswXTtcbiAgICAgICAgcmVwbGFjZWRNc2cgPSByZXBsYWNlZE1zZy5yZXBsYWNlKCcjSU5TVEFOQ0VfTEFCRUwnLCB2YWwpO1xuXG4gICAgfVxuXG4gICAgaWYgKHJlcGxhY2VkTXNnLmluZGV4T2YoJyNVU0VSX05BTUUnKSAhPT0gLTEpIHtcbiAgICAgICAgdmFyIHZhbCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL3N0ZXAvYXNzaWduZWRUby9uYW1lXCIsIGFwcC5TQ09QRS53b3JrZmxvdywge30pWzBdO1xuICAgICAgICByZXBsYWNlZE1zZyA9IHJlcGxhY2VkTXNnLnJlcGxhY2UoJyNVU0VSX05BTUUnLCB2YWwpO1xuXG4gICAgfVxuXG4gICAgaWYgKHJlcGxhY2VkTXNnLmluZGV4T2YoJyNQUk9GSUxFX1RJVExFJykgIT09IC0xKSB7XG4gICAgICAgIHZhciB2YWwgPSBhcHAucHJvZmlsZS50aXRsZTtcbiAgICAgICAgcmVwbGFjZWRNc2cgPSByZXBsYWNlZE1zZy5yZXBsYWNlKCcjUFJPRklMRV9USVRMRScsIHZhbCk7XG5cbiAgICB9XG5cbiAgICBpZiAocmVwbGFjZWRNc2cuaW5kZXhPZignI1BST0ZJTEVfVFlQRScpICE9PSAtMSkge1xuICAgICAgICB2YXIgdmFsID0gYXBwLlNDT1BFLkFQUF9DT05GSUcubmFtZTtcbiAgICAgICAgcmVwbGFjZWRNc2cgPSByZXBsYWNlZE1zZy5yZXBsYWNlKCcjUFJPRklMRV9UWVBFJywgdmFsKTtcblxuICAgIH1cblxuICAgIGlmIChyZXBsYWNlZE1zZy5pbmRleE9mKCcjVkFSX1NQVVVJRCcpICE9PSAtMSkge1xuICAgICAgICB2YXIgdmFsID0gc3B1dWlkO1xuICAgICAgICByZXBsYWNlZE1zZyA9IHJlcGxhY2VkTXNnLnJlcGxhY2UoJyNWQVJfU1BVVUlEJywgdmFsKTtcblxuICAgIH1cblxuICAgIHJldHVybiByZXBsYWNlZE1zZztcbn07XG5cbmZ1bmN0aW9uIF9nZXROYW1lKGFyciwgbGFuZykge1xuICAgIGlmIChhcnIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGFycltpXS5fbGFuZyA9PT0gbGFuZykge1xuICAgICAgICAgICAgICAgIHJldHVybiBhcnJbaV0udmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG59O1xuXG5mdW5jdGlvbiBfZ2V0TmFtZUJ5TGFuZyhvYmopIHtcbiAgICB2YXIgbGFuZyA9IHNlcnZpY2UuZ2V0TGFuZ3VhZ2UoKTtcbiAgICB2YXIgZXhwciA9ICdvYmouJyArIGxhbmc7XG4gICAgcmV0dXJuIGV2YWwoZXhwcik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICAgIHByZVJlcXVpc2l0ZXM6IHByZVJlcXVpc2l0ZXMsXG4gICAgcHJlQWN0aW9uczogcHJlQWN0aW9ucyxcbiAgICBzdWJQcm9jZXNzOiBzdWJQcm9jZXNzLFxuICAgIGluZGljYXRvckRvY3M6IGluZGljYXRvckRvY3MsXG4gICAgdGFzazogdGFzayxcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2l0aW9uLFxuICAgIGFzc2lnblVzZXI6IGFzc2lnblVzZXJcblxufSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBVdGlsaXR5IE1vZHVsZVxyXG4gKlxyXG4gKiBAbW9kdWxlIGxpYi91dGlsXHJcbiAqXHJcbiAqIEBhdXRob3IgQnJlbnQgR29yZG9uXHJcbiAqIEB2ZXJzaW9uIDAuMS4wXHJcbiAqXHJcbiAqIEBkZXNjcmlwdGlvblxyXG4gKiBXb3JrZmxvdyB1dGlsaXR5IG1vZHVsZSB1c2VkIHRvIGZvcm1hdCB0aGUgcmV0dXJuIGFuZCBlcnJvciBvYmplY3RzLCBhbmRcclxuICogY29udGFpbnMgc29tZSBvdGhlciB1dGlsaXR5IGZ1bmN0aW9ucyBzdWNoIGFzIGEgc3luYyBsb29wIGFuZCBjb21wYXJlLlxyXG4gKlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBTdWNjZXNzIGJsb2NrIHJldHVybiBvYmplY3QsIGNvbnRhaW5zIGEgbWVzc2FnZSBhbmQgb3B0aW9uYWwgZGF0YSBvYmplY3QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gdGhlIHN1Y2Nlc3MgbWVzc2FnZVxyXG4gKiBAcGFyYW0ge3N0cmluZ3xPYmplY3R9IFtkYXRhXSAtIHRoZSBzdWNjZXNzIHJldHVybmVkIGRhdGFcclxuICpcclxuICogQGV4YW1wbGVcclxuICogLy8gUmV0dXJuIHN1Y2Nlc3Mgd2l0aG91dCBhIGRhdGEgYmxvY2tcclxuICogdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1N1Y2Nlc3MgbWVzc2FnZSBnb2VzIGhlcmUuLi4nKTtcclxuICpcclxuICogQHJldHVybiB7T2JqZWN0fSAtIHdpdGggbWVzc2FnZSBhbmQgZGF0YSBwcm9wZXJ0aWVzXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiBzdWNjZXNzKG1lc3NhZ2UsIGRhdGEpe1xyXG5cdHJldHVybiB7XHJcblx0XHRtZXNzYWdlOiBtZXNzYWdlLFxyXG5cdFx0ZGF0YTogZGF0YVxyXG5cdH07XHJcbn07XHJcblxyXG4vKipcclxuICogV2FybmluZyBibG9jayByZXR1cm4gb2JqZWN0LCBjb250YWlucyBhIG1lc3NhZ2UgYW5kIG9wdGlvbmFsIGRhdGEgb2JqZWN0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIHRoZSB3YXJuaW5nIG1lc3NhZ2VcclxuICogQHBhcmFtIHtzdHJpbmd8T2JqZWN0fSBbZGF0YV0gLSB0aGUgcmV0dXJuZWQgZGF0YVxyXG4gKlxyXG4gKiBAZXhhbXBsZVxyXG4gKiAvLyBSZXR1cm4gc3VjY2VzcyB3aXRob3V0IGEgZGF0YSBibG9ja1xyXG4gKiB2YXIgc3VjY2VzcyA9IHV0aWwud2FybignV2FybmluZyBtZXNzYWdlIGdvZXMgaGVyZS4uLicpO1xyXG4gKlxyXG4gKiBAcmV0dXJuIHtPYmplY3R9IHdpdGggbWVzc2FnZSBhbmQgZGF0YSBwcm9wZXJ0aWVzLCBhbmQgbG9ncyB0aGUgd2FybmluZyB0byB0aGUgY29uc29sZS5cclxuICpcclxuICovXHJcbmZ1bmN0aW9uIHdhcm4obWVzc2FnZSwgZGF0YSl7XHJcblx0Y29uc29sZS53YXJuKGRhdGEpO1xyXG5cdHJldHVybiB7XHJcblx0XHR3YXJuaW5nOiBtZXNzYWdlLFxyXG5cdFx0ZGF0YTogZGF0YVxyXG5cdH07XHJcbn07XHJcblxyXG4vKipcclxuICogRXJyb3IgYmxvY2sgSlMgZXJyb3Igb2JqZWN0LCBjb250YWlucyBhIGNvZGUgYW5kIG1lc3NhZ2UgZm9yIHRoZSBlcnJvci5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGNvZGUgLSB0aGUgZXJyb3IgY29kZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIHRoZSBlcnJvciBtZXNzYWdlXHJcbiAqXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBzdWNjZXNzID0gdXRpbC5lcnJvcignRXJyb3IwMDEnLCdFcnJvciBtZXNzYWdlIGdvZXMgaGVyZS4uLicpO1xyXG4gKlxyXG4gKiBAcmV0dXJuIHtPYmplY3R9IHdpdGggYSBjb2RlIGFuZCBtZXNzYWdlIHByb3BlcnRpZXMuXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiBlcnJvcihjb2RlLCBtZXNzYWdlKXtcclxuXHR2YXIgZXJyID0gbmV3IEVycm9yKCcnKTtcclxuXHRlcnIubmFtZSA9IGNvZGU7XHJcblx0ZXJyLm1lc3NhZ2UgPSBtZXNzYWdlO1xyXG5cdHJldHVybiBlcnI7XHJcbn07XHJcblxyXG4vKipcclxuICogQSBsb29wIHdoaWNoIGNhbiBsb29wIFggYW1vdW50IG9mIHRpbWVzLCB3aGljaCBjYXJyaWVzIG91dFxyXG4gKiBhc3luY2hyb25vdXMgY29kZSwgYnV0IHdhaXRzIGZvciB0aGF0IGNvZGUgdG8gY29tcGxldGUgYmVmb3JlIGxvb3BpbmcuXHJcbiAqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBpdGVyYXRpb25zIC0gdGhlIG51bWJlciBvZiBpdGVyYXRpb25zIHRvIGNhcnJ5IG91dFxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBwcm9jZXNzIC0gdGhlIGNvZGUvZnVuY3Rpb24gd2UncmUgcnVubmluZyBmb3IgZXZlcnlcclxuICogaXRlcmF0aW9uXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGV4aXQgLSBhbiBvcHRpb25hbCBjYWxsYmFjayB0byBjYXJyeSBvdXQgb25jZSB0aGUgbG9vcFxyXG4gKiBoYXMgY29tcGxldGVkXHJcbiAqXHJcbiAqIEBleGFtcGxlXHJcbiAqIHV0aWwuc3luY0xvb3AoNSwgZnVuY3Rpb24obG9vcCl7XHJcbiAqIFx0dmFyIGNvdW50ZXIgPSBsb29wLml0ZXJhdGlvbigpO1xyXG4gKiBcdC8vIEFkZCBhc3luYyBjYWxscyBoZXJlLi5cclxuICpcclxuICogfSwgZnVuY3Rpb24oKXtcclxuICogXHQvLyBPbiBjb21wbGV0ZSBwZXJmb3JtIGFjdGlvbnMgaGVyZS4uLlxyXG4gKlxyXG4gKiB9KTtcclxuICpcclxuICogQHJldHVybiB7T2JqZWN0fSB0aGUgbG9vcCBjb250cm9sIG9iamVjdC5cclxuICpcclxuICovXHJcbmZ1bmN0aW9uIHN5bmNMb29wKGl0ZXJhdGlvbnMsIHByb2Nlc3MsIGV4aXQpe1xyXG4gICAgdmFyIGluZGV4ID0gMCxcclxuICAgICAgICBkb25lID0gZmFsc2UsXHJcbiAgICAgICAgc2hvdWxkRXhpdCA9IGZhbHNlO1xyXG4gICAgdmFyIGxvb3AgPSB7XHJcbiAgICAgICAgbmV4dDpmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZihkb25lKXtcclxuICAgICAgICAgICAgICAgIGlmKHNob3VsZEV4aXQgJiYgZXhpdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV4aXQoKTsgLy8gRXhpdCBpZiB3ZSdyZSBkb25lXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gSWYgd2UncmUgbm90IGZpbmlzaGVkXHJcbiAgICAgICAgICAgIGlmKGluZGV4IDwgaXRlcmF0aW9ucyl7XHJcbiAgICAgICAgICAgICAgICBpbmRleCsrOyAvLyBJbmNyZW1lbnQgb3VyIGluZGV4XHJcbiAgICAgICAgICAgICAgICBwcm9jZXNzKGxvb3ApOyAvLyBSdW4gb3VyIHByb2Nlc3MsIHBhc3MgaW4gdGhlIGxvb3BcclxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIHdlJ3JlIGRvbmVcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlOyAvLyBNYWtlIHN1cmUgd2Ugc2F5IHdlJ3JlIGRvbmVcclxuICAgICAgICAgICAgICAgIGlmKGV4aXQpIGV4aXQoKTsgLy8gQ2FsbCB0aGUgY2FsbGJhY2sgb24gZXhpdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpdGVyYXRpb246ZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIGluZGV4IC0gMTsgLy8gUmV0dXJuIHRoZSBsb29wIG51bWJlciB3ZSdyZSBvblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYnJlYWs6ZnVuY3Rpb24oZW5kKXtcclxuICAgICAgICAgICAgZG9uZSA9IHRydWU7IC8vIEVuZCB0aGUgbG9vcFxyXG4gICAgICAgICAgICBzaG91bGRFeGl0ID0gZW5kOyAvLyBQYXNzaW5nIGVuZCBhcyB0cnVlIG1lYW5zIHdlIHN0aWxsIGNhbGwgdGhlIGV4aXQgY2FsbGJhY2tcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgbG9vcC5uZXh0KCk7XHJcbiAgICByZXR1cm4gbG9vcDtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGNvbXBhcmUoc3ViamVjdCwgb3BlcmF0b3IsIHZhbHVlKSB7XHJcbiAgXHRzd2l0Y2ggKG9wZXJhdG9yKSB7XHJcbiAgXHRcdGNhc2UgJ2dyZWF0ZXJUaGFuJzpcclxuXHRcdFx0cmV0dXJuIHN1YmplY3QgPiB2YWx1ZTtcclxuXHRcdGNhc2UgJ2xlc3NUaGFuJzpcclxuXHRcdFx0cmV0dXJuIHN1YmplY3QgPCB2YWx1ZTtcclxuXHRcdGNhc2UgJ2dyZWF0ZXJUaGFuRXF1YWwnOlxyXG5cdFx0XHRyZXR1cm4gc3ViamVjdCA+PSB2YWx1ZTtcclxuXHRcdGNhc2UgJ2xlc3NUaGFuRXF1YWwnOlxyXG5cdFx0XHRyZXR1cm4gc3ViamVjdCA8PSB2YWx1ZTtcclxuXHRcdGNhc2UgJ2VxdWFsVG8nOlxyXG5cdFx0XHRyZXR1cm4gc3ViamVjdCA9PT0gdmFsdWU7XHJcblx0XHRjYXNlICdub3RFcXVhbFRvJzpcclxuXHRcdFx0cmV0dXJuIHN1YmplY3QgIT09IHZhbHVlO1xyXG4gIFx0fVxyXG59O1xyXG5cclxuZnVuY3Rpb24gZ2V0TmFtZShhcnIsIGxhbmcpe1xyXG5cdGlmIChhcnIgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoIDsgaSsrKSB7XHJcblx0XHRcdGlmIChhcnJbaV0uaTE4bi5fbGFuZyA9PT0gbGFuZykge1xyXG5cdFx0XHRcdHJldHVybiBhcnJbaV0uaTE4bi52YWx1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gXHRzdWNjZXNzOiBzdWNjZXNzLFxyXG4gXHR3YXJuOiB3YXJuLFxyXG4gXHRlcnJvcjogZXJyb3IsXHJcbiBcdHN5bmNMb29wOiBzeW5jTG9vcCxcclxuIFx0Y29tcGFyZTogY29tcGFyZSxcclxuXHRnZXROYW1lOiBnZXROYW1lXHJcblxyXG4gfVxyXG4iXX0=
