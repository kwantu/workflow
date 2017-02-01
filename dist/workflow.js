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
                    var success = util.success('Process: ' + _this.config.processes[0]._id + ' initialized successfully.', _this);
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

module.exports = Workflow;
},{"./lib/interface":5,"./lib/process":7,"utility":8}],2:[function(require,module,exports){
'use strict';

var util = require('utility');
var nodeValue = require('./nodeValue');
var form = require('./form');


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
                            _WFInstance.instance = data;

                            var success = util.success('Subprocess setTitle success.', _WFInstance.instance);
                            resolve(success);

                        }).fail(function(err) {
                            console.error(err);
                        });

                }, function(error) {
                    console.error(error);
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
    subProcessInstance: subProcessInstance
}
},{"./form":3,"./nodeValue":6,"utility":8}],3:[function(require,module,exports){
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
            var initType = '';
            if (subProcess.instanceType.newSequence != undefined) {
                initType = 'newSequence';
            } else if (subProcess.instanceType.newInstance != undefined) {
                initType = 'newInstance';
            }
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

                    if (subProcess.isProfile != undefined && subProcess.isProfile && (indicatorId == PROFILE_SET_ID || app.SCOPE.APP_CONFIG.indicators.length == 1)) {
                        id = profile;
                    } else if (indicatorId == "node") {
                        id = app.profile.subprofileId;
                    } else {
                        id = indicatorId + '-' + generateUUID();
                    }
                }


            } else {

                var spLastUuid = JSON.xpath("/instance/processes[id eq '" + processId + "' and subProcesses/id eq '" + subProcessId + "'][1]/subProcesses/uuid", _WFInstance, {})[0];
                var indId = JSON.xpath("/subprocesses[_id eq '" + spLastUuid + "']/indicators[id eq '" + indicatorId + "']/instances/uuid", app.SCOPE.workflow, {})[0];

                if (spLastUuid == '' || spLastUuid == undefined || indId == '' || indId == undefined) {

                    if (subProcess.isProfile != undefined && subProcess.isProfile && (indicatorId == PROFILE_SET_ID || app.SCOPE.APP_CONFIG.indicators.length == 1)) {
                        id = profile;
                    } else if (indicatorId == "node") {
                        id = app.profile.subprofileId;
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

    if (data.value != undefined) {

    } else if (data.currentIndicator != undefined) {

    } else if (data.indicator != undefined) {

        var indicatorUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + data.indicator.indicatorSetId + "']/instances/uuid", _WFInstance, {})[0];
        var indObject = JSON.xpath("/indicators[_id eq '" + indicatorUUID + "']", _WFInstance, {})[0];
        var value = 'indObject.model.pending.data.' + data.indicator.indicatorSetId + '.' + data.indicator.elementId;
        return eval(value);

    } else if (data.system != undefined) {

    } else if (data.variable != undefined) {

    }





};



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
            subjectCount = JSON.xpath(fullPath, _WFInstance, {})[0];

        } else if (prerequisite.check.variableConfirm != undefined) {

        } else {

            var error = util.error('WFPreRequisiteError', 'Pre-requisite type not defined.');
            reject(error);

        }

        var compare = '';

        if (prerequisite.check.numberProcessInstances) {
            compare = util.compare(subjectCount, prerequisite.check.numberProcessInstances.operator, parseInt(prerequisite.check.numberProcessInstances.count));
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
                                // Update the indicator sections of the subProcess

                                indicators(subProcessConf.indicators, _WFInstance, model._id).then(function(result1) {

                                    model.indicators = result1.data;
                                    // Execute the transitions, if auto

                                    var postActionsConf = processConf.postActions;
                                    postActions(postActionsConf, _WFInstance).then(function(result) {
                                        var success = util.success(result.message, model);
                                        resolve(success);
                                    }, function(err) {
                                        reject(err);
                                    })

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
            //model.assignedTo.userId = data.userId !== undefined ? data.userId : '';
            //model.assignedTo.name = data.name !== undefined ? data.name : '';
            model.comment = data.comment !== undefined ? data.comment : '';
            // Update the indicator documents process step data
            //comso.log('instSubProcess===');
            //comso.log(instSubProcess);
            var indicators = instSubProcess !== undefined ? instSubProcess.indicators : [];
            indicatorDocs(processId, indicators, model, _WFInstance).then(function(result) {
                // If actions are specified, execute them
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
            var methodPossibleItems = ["form", "indicator", "profile", "subProcessInstance", "step", "community", "application", "user", "sdo", "performance", "taxonomy"];
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

                        var dataValue = helper.getNodeValue(action.method.indicator.setValue.data, _WFInstance, uuid);

                        var args = [];
                        args.push(_WFInstance);
                        args.push(uuid);
                        args.push(path);
                        args.push(dataValue);
                        // Keep indicator functions in indiator file istead of form file.

                        form.updateIndicator(args).then(function(result) {
                            resolve(result.data);
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
                            //other implementations  
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
                    var spPossibleItems = ["instantiate", "authorise", "close", "setVariable", "setStatusTo", "setStatusMsgTo", "setTitle"];
                    switch (propertyExists(action.method.subProcessInstance, spPossibleItems)) {

                        case 'setTitle':

                            var dataValue = helper.getNodeValue(action.method.subProcessInstance.setTitle, _WFInstance, uuid);

                            return actionsModule.subProcessInstance.setTitle(action.method.subProcessInstance.setTitle, uuid, dataValue, _WFInstance).then(function(result) {
                                resolve(result.data);
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
                    var performancePossibleItems = ["create", "configureNode"];
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

                            var assignment = model.assignment; //JSON.xpath("/step/assignment",spObject,{})[0];
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

                            var assignment = model.assignment; //JSON.xpath("/step/assignment",spObject,{})[0];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VzZXJzL0hhc2FuL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImluZGV4LmpzIiwibGliL2FjdGlvbnMuanMiLCJsaWIvZm9ybS5qcyIsImxpYi9oZWxwZXIuanMiLCJsaWIvaW50ZXJmYWNlLmpzIiwibGliL25vZGVWYWx1ZS5qcyIsImxpYi9wcm9jZXNzLmpzIiwibm9kZV9tb2R1bGVzL3V0aWxpdHkvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaG1CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Z0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoeUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBQcm9jZXNzID0gcmVxdWlyZSgnLi9saWIvcHJvY2VzcycpO1xyXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWxpdHknKTtcclxudmFyIHVzZXJJbnRlcmZhY2UgPSByZXF1aXJlKCcuL2xpYi9pbnRlcmZhY2UnKTtcclxuXHJcbi8qZ2xvYmFscyAqL1xyXG5cclxuLyoqXHJcbiAqIEEgbmV3IFdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlIGNvbnRhaW5zIHRoZSByZWZlcmVuY2UgdG8gdGhlIGFwcGxpY2F0aW9uXHJcbiAqIGFuZCBhc3NvY2lhdGVkIHByb2ZpbGUgd2hpY2ggaXQgcmVxdWlyZXMgYXMgdGhlIGZpcnN0IHR3byBwYXJhbWV0ZXJzLiBJdCBhbHNvXHJcbiAqIHJlcXVpcmVzIGEgd29ya2Zsb3cgY29uZmlndXJhdGlvbiwgYXMgdGhlIHRoaXJkIHBhcmFtZXRlciwgd2hpY2ggaXMgdXNlZCB0b1xyXG4gKiBkZXNjaWJlIHRoZSB3b3JrZmxvdyBwcm9jZXNzZXMuIElmIGEgd29ya2Zsb3cgaW5zdGFuY2UgZXhpc3RzIHlvdSBjYW4gcGFzcyBpdFxyXG4gKiBpbiBhcyB0aGUgZm91cnRoIHBhcmFtZXRlciB3aGljaCBpdCB3aWxsIHRoZW4gdXNlLCBlbHNlIGNyZWF0ZSBhIG5ldyBvbmUuXHJcbiAqXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvZmlsZSAtIFRoZSBjdXJyZW50IHByb2ZpbGUgaWRcclxuICogQHBhcmFtIHtzdHJpbmd9IGFwcCAtIFRoZSBhc3NvY2lhdGVkIGFwcGxpY2F0aW9uIGlkXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgLSBUaGUgYXBwbGljYXRpb24gd29ya2Zsb3cgY29uZmlndXJhdGlvbiAvIGRlZmluaXRpb25cclxuICogQHBhcmFtIHtPYmplY3R9IFtpbnN0YW5jZV0gLSBBbiBleGlzdGluZyBhcHBsaWNhdGlvbiBwcm9maWxlIHdvcmtmbG93IGluc3RhbmNlIGJhc2VkXHJcbiAqIG9uIHRoZSBkZWZpbml0aW9uXHJcbiAqXHJcbiAqIEBhdXRob3IgQnJlbnQgR29yZG9uXHJcbiAqIEB2ZXJzaW9uIDAuMS4wXHJcbiAqXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBjb25maWcgPSB7ICdfaWQnOiAnYWJjMTIzJyB9O1xyXG5cclxuICogdmFyIGluc3RhbmNlID0geyAnX2lkJzogJ2luc3RhbmNlX2FiYzEyMycgfTtcclxuXHJcbiAqIC8vIElmIHRoZXJlIGlzbid0IGFuIGV4aXN0aW5nIGluc3RhbmNlXHJcbiAqIHZhciB3b3JrZmxvdyA9IG5ldyBXb3JrZmxvdygnMTIzNCcsICc1Njc4JywgY29uZmlnKTtcclxuICogLy8gSWYgdGhlcmUgaXMgYW4gZXhpc3RpbmcgaW5zdGFuY2VcclxuICogdmFyIHdvcmtmbG93ID0gbmV3IFdvcmtmbG93KCcxMjM0JywgJzU2NzgnLCBjb25maWcsIGluc3RhbmNlKTtcclxuICpcclxuICogQHJldHVybiB7T2JqZWN0fSBuZXcgV29ya2Zsb3cgb2JqZWN0XHJcbiAqXHJcbiAqIEB0aHJvd3MgRXJyb3I6IEEgcHJvZmlsZSBpZCBpcyByZXF1aXJlZFxyXG4gKiBAdGhyb3dzIEVycm9yOiBBbiBhcHAgaWQgaXMgcmVxdWlyZWRcclxuICogQHRocm93cyBFcnJvcjogQSB3b3JrZmxvdyBjb25maWd1cmF0aW9uIGlzIHJlcXVpcmVkXHJcbiAqXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gV29ya2Zsb3cocHJvZmlsZSwgY29tbXVuaXR5SWQsIGFwcCwgY29uZmlnKSB7XHJcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgIC8vIENvbW11bml0eSBJRCB2YWxpZGF0aW9uIGNoZWNrc1xyXG4gICAgaWYgKGNvbW11bml0eUlkID09ICcnIHx8IGNvbW11bml0eUlkID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRocm93IHV0aWwuZXJyb3IoJ1BhcmFtUmVxdWlyZWQnLCAnQSBjb21tdW5pdHkgaWQgaXMgcmVxdWlyZWQuJyk7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZihjb21tdW5pdHlJZCkgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgY29tbXVuaXR5IGlkIG11c3QgYmUgYSBqYXZhc2NyaXB0IHN0cmluZy4nKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgX3RoaXMuY29tbXVuaXR5SWQgPSBjb21tdW5pdHlJZCB8fCAnJztcclxuICAgIH1cclxuXHJcbiAgICAvLyBQcm9maWxlIElEIHZhbGlkYXRpb24gY2hlY2tzXHJcbiAgICBpZiAocHJvZmlsZSA9PSAnJyB8fCBwcm9maWxlID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRocm93IHV0aWwuZXJyb3IoJ1BhcmFtUmVxdWlyZWQnLCAnQSBwcm9maWxlIGlkIGlzIHJlcXVpcmVkLicpO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YocHJvZmlsZSkgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgcHJvZmlsZSBpZCBtdXN0IGJlIGEgamF2YXNjcmlwdCBzdHJpbmcuJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIF90aGlzLnByb2ZpbGUgPSBwcm9maWxlIHx8ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEFwcCBJRCB2YWxpZGF0aW9uIGNoZWNrc1xyXG4gICAgaWYgKGFwcCA9PSAnJyB8fCBhcHAgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhyb3cgdXRpbC5lcnJvcignUGFyYW1SZXF1aXJlZCcsICdBbiBhcHAgaWQgaXMgcmVxdWlyZWQuJyk7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZihhcHApICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGFwcCBpZCBtdXN0IGJlIGEgamF2YXNjcmlwdCBzdHJpbmcuJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIF90aGlzLmFwcCA9IGFwcCB8fCAnJztcclxuICAgIH1cclxuXHJcbiAgICAvLyBXb3JrZmxvdyBjb25maWd1cmF0aW9uIHZhbGlkYXRpb24gY2hlY2tzXHJcbiAgICBpZiAoY29uZmlnID09ICcnIHx8IGNvbmZpZyA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aHJvdyB1dGlsLmVycm9yKCdQYXJhbVJlcXVpcmVkJywgJ0Egd29ya2Zsb3cgY29uZmlndXJhdGlvbiBpcyByZXF1aXJlZC4nKTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mKGNvbmZpZykgIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgX3RoaXMuY29uZmlnID0gSlNPTi5wYXJzZShjb25maWcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBfdGhpcy5jb25maWcgPSBjb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gV29ya2Zsb3cgaW5zdGFuY2UgdmFsaWRhdGlvbiBjaGVja3NcclxuICAgIF90aGlzLmluc3RhbmNlO1xyXG4gICAgLy8gV29ya2Zsb3cgc3ViLXByb2Nlc3NlcyB2YWxpZGF0aW9uIGNoZWNrc1xyXG4gICAgX3RoaXMuc3VicHJvY2Vzc2VzID0gW107XHJcbiAgICAvLyBXb3JrZmxvdyBpbmRpY2F0b3JzIHBsYWNlIGhvbGRlclxyXG4gICAgX3RoaXMuaW5kaWNhdG9ycyA9IFtdO1xyXG4gICAgLy8gV29ya2Zsb3cgc3ViLXByb2Nlc3Mgc3RlcCBoaXN0b3J5IHBsYWNlIGhvbGRlclxyXG4gICAgX3RoaXMuaGlzdG9yeSA9IFtdO1xyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIFdvcmtmbG93IGdldCBwcm9maWxlIGlkLlxyXG4gKlxyXG4gKiBAZXhhbXBsZSBcIlwiXHJcbiAqXHJcbiAqIEByZXR1cm4gXCJcIlxyXG4gKlxyXG4gKi9cclxuV29ya2Zsb3cucHJvdG90eXBlLmdldFByb2ZpbGUgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLnByb2ZpbGU7XHJcbn07XHJcblxyXG4vKipcclxuICogV29ya2Zsb3cgZ2V0IGFwcCBpZC5cclxuICpcclxuICogQGV4YW1wbGUgXCJcIlxyXG4gKlxyXG4gKiBAcmV0dXJuIFwiXCJcclxuICpcclxuICovXHJcbldvcmtmbG93LnByb3RvdHlwZS5nZXRBcHAgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLmFwcDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXb3JrZmxvdyBnZXQgY29uZmlnLlxyXG4gKlxyXG4gKiBAZXhhbXBsZSBcIlwiXHJcbiAqXHJcbiAqIEByZXR1cm4gXCJcIlxyXG4gKlxyXG4gKi9cclxuV29ya2Zsb3cucHJvdG90eXBlLmdldENvbmZpZyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29uZmlnO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdvcmtmbG93IGdldCBpbnN0YW5jZS5cclxuICpcclxuICogQGV4YW1wbGUgXCJcIlxyXG4gKlxyXG4gKiBAcmV0dXJuIFwiXCJcclxuICpcclxuICovXHJcblxyXG5Xb3JrZmxvdy5wcm90b3R5cGUuZ2V0SW5zdGFuY2UgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdvcmtmbG93IHNldCB0aGUgaW5zdGFuY2UgZGF0YS5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSB0aGUgd29ya2Zsb3cgcHJvY2VzcyBpbnN0YW5jZSBkYXRhXHJcbiAqXHJcbiAqIEBleGFtcGxlIFwiXCJcclxuICpcclxuICogQHJldHVybiBcIlwiXHJcbiAqXHJcbiAqL1xyXG5Xb3JrZmxvdy5wcm90b3R5cGUuc2V0SW5zdGFuY2UgPSBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICB0aGlzLmluc3RhbmNlID0gZGF0YTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXb3JrZmxvdyBnZXQgc3ViLXByb2Nlc3NlcyBkYXRhLlxyXG4gKlxyXG4gKiBAZXhhbXBsZSBcIlwiXHJcbiAqXHJcbiAqIEByZXR1cm4gXCJcIlxyXG4gKlxyXG4gKi9cclxuV29ya2Zsb3cucHJvdG90eXBlLmdldFN1YlByb2Nlc3NlcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc3VicHJvY2Vzc2VzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdvcmtmbG93IHNldCB0aGUgc3ViLXByb2Nlc3NlcyBkYXRhLlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIHRoZSB3b3JrZmxvdyBwcm9jZXNzIGluc3RhbmNlIGRhdGFcclxuICpcclxuICogQGV4YW1wbGUgXCJcIlxyXG4gKlxyXG4gKiBAcmV0dXJuIFwiXCJcclxuICpcclxuICovXHJcbldvcmtmbG93LnByb3RvdHlwZS5zZXRTdWJQcm9jZXNzZXMgPSBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICB0aGlzLnN1YnByb2Nlc3NlcyA9IGRhdGE7XHJcbn07XHJcblxyXG4vKipcclxuICogV29ya2Zsb3cgZ2V0IGluZGljYXRvciBzZXQgZGF0YS5cclxuICpcclxuICogQGV4YW1wbGUgXCJcIlxyXG4gKlxyXG4gKiBAcmV0dXJuIFwiXCJcclxuICpcclxuICovXHJcbldvcmtmbG93LnByb3RvdHlwZS5nZXRJbmRpY2F0b3JzID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5pbmRpY2F0b3JzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdvcmtmbG93IHNldCB0aGUgaW5kaWNhdG9yIHNldCBkYXRhLlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIHRoZSB3b3JrZmxvdyBwcm9jZXNzIGluc3RhbmNlIGRhdGFcclxuICpcclxuICogQGV4YW1wbGUgXCJcIlxyXG4gKlxyXG4gKiBAcmV0dXJuIFwiXCJcclxuICpcclxuICovXHJcbldvcmtmbG93LnByb3RvdHlwZS5zZXRJbmRpY2F0b3JzID0gZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgdGhpcy5pbmRpY2F0b3JzID0gZGF0YTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIHZhcmlhYmxlIHZhbHVlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gcHJvY2VzcyBpZFxyXG4gKiBAcGFyYW0ge251bWJlcn0gcHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBwcm9jZXNzIHNlcVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3ViUHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3ViLXByb2Nlc3MgaWRcclxuICogQHBhcmFtIHtudW1iZXJ9IHN1YlByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2Ugc3ViLXByb2Nlc3Mgc2VxXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdGVwSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdGVwIGlkXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YXJpYWJsZSAtIHRoZSBXb3JrZmxvdyB2YXJpYWJsZSBvYmplY3RcclxuICpcclxuICogQGV4YW1wbGUgJydcclxuICpcclxuICogQHJldHVybiAnJ1xyXG4gKlxyXG4gKi9cclxuLy8gV29ya2Zsb3cucHJvdG90eXBlLnNldFZhcmlhYmxlID0gZnVuY3Rpb24ocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwgdmFyaWFibGUpe1xyXG4vLyBcdHZhciBfdGhpcyA9IHRoaXM7XHJcbi8vIFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4vLyBcdFx0dHJ5IHtcclxuLy8gXHRcdFx0UHJvY2Vzcy5nZXRWYXJpYWJsZShwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3RlcElkLCB2YXJpYWJsZSkudGhlbihmdW5jaW9uKHJlc3VsdCl7XHJcbi8vIFx0XHRcdFx0cmVzb2x2ZShyZXN1bHQuZGF0YSk7XHJcbi8vIFx0XHRcdH0sIGZ1bmN0aW9uKGVycil7XHJcbi8vIFx0XHRcdFx0cmVqZWN0KGVycik7XHJcbi8vIFx0XHRcdH0pXHJcbi8vIFx0XHR9IGNhdGNoIChlcnIpIHtcclxuLy8gXHRcdFx0cmVqZWN0KGVycik7XHJcbi8vIFx0XHR9XHJcblxyXG4vLyBcdH0pO1xyXG4vLyB9O1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgdmFyaWFibGUgdmFsdWUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBwcm9jZXNzIGlkXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHByb2Nlc3Mgc2VxXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdWJQcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdWItcHJvY2VzcyBpZFxyXG4gKiBAcGFyYW0ge251bWJlcn0gc3ViUHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBzdWItcHJvY2VzcyBzZXFcclxuICogQHBhcmFtIHtzdHJpbmd9IHN0ZXBJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN0ZXAgaWRcclxuICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIHRoZSBXb3JrZmxvdyB2YXJpYWJsZSBpZFxyXG4gKlxyXG4gKiBAZXhhbXBsZSAnJ1xyXG4gKlxyXG4gKiBAcmV0dXJuICcnXHJcbiAqXHJcbiAqL1xyXG4vLyBXb3JrZmxvdy5wcm90b3R5cGUuZ2V0VmFyaWFibGUgPSBmdW5jdGlvbihwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3RlcElkLCBrZXkpe1xyXG4vLyBcdHZhciBfdGhpcyA9IHRoaXM7XHJcbi8vIFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4vLyBcdFx0dHJ5IHtcclxuLy8gXHRcdFx0UHJvY2Vzcy5zZXRWYXJpYWJsZShwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3RlcElkLCBrZXkpLnRoZW4oZnVuY2lvbihyZXN1bHQpe1xyXG4vLyBcdFx0XHRcdHJlc29sdmUocmVzdWx0LmRhdGEpO1xyXG4vLyBcdFx0XHR9LCBmdW5jdGlvbihlcnIpe1xyXG4vLyBcdFx0XHRcdHJlamVjdChlcnIpO1xyXG4vLyBcdFx0XHR9KVxyXG4vLyBcdFx0fSBjYXRjaCAoZXJyKSB7XHJcbi8vIFx0XHRcdHJlamVjdChlcnIpO1xyXG4vLyBcdFx0fVxyXG5cclxuLy8gXHR9KTtcclxuLy8gfTtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIG1ldGhvZCBjcmVhdGVzIGEgbmV3IHdvcmtmbG93IHByb2Nlc3MgaS5lLiBpdCBjcmVhdGVzIGEgd29ya2Zsb3cgcHJvY2Vzc2VzIGluc3RhbmNlXHJcbiAqIG9iamVjdCB3aXRoIHRoZSBtaW5pbXVtIHJlcXVpcmVkIGRhdGEuIFRoaXMgaW5zdGFuY2UgY2FuIGJlIHJlZmVyZW5jZWQgaW4gdGhlIGZvbGxvd2luZ1xyXG4gKiB3YXksIHNlZSBleGFtcGxlIGJlbG93LlxyXG4gKlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgY29uZmlnID0geyAnX2lkJzogJ2FiYzEyMycgfTtcclxuXHJcbiAqIHZhciB3b3JrZmxvdyA9IG5ldyBXb3JrZmxvdygnMTIzNCcsICc1Njc4JywgY29uZmlnKTtcclxuICogd29ya2Zsb3cuY3JlYXRlKCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xyXG4gKlx0Y29uc29sZS5sb2cocmVzdWx0Lm1lc3NhZ2UpO1xyXG4gKlx0Ly8gVGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzIGNhbiBub3cgYmUgYWNjZXNzZWRcclxuICogXHR2YXIgcHJvZmlsZSA9IHdvcmtmbG93LnByb2ZpbGU7XHJcbiAqIFx0dmFyIGFwcCA9IHdvcmtmbG93LmFwcDtcclxuICogXHR2YXIgY29uZmlnID0gd29ya2Zsb3cuY29uZmlnO1xyXG4gKlx0Ly8gT24gc3VjY2VzcyB5b3UgY2FuIGFjY2VzcyB0aGUgaW5zdGFuY2UgdGhlIGZvbGxvd2luZyB3YXlcclxuICpcdHZhciBpbnN0YW5jZSA9IHdvcmtmbG93Lmluc3RhbmNlO1xyXG4gKiB9LCBmdW5jdGlvbihlcnJvcil7XHJcbiAqXHRjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAqIH0pO1xyXG4gKlxyXG4gKiBAcmV0dXJuIHtPYmplY3R9IG5ldyBXb3JrZmxvdyBpbnN0YW5jZSB3aXRoIHVwZGF0ZWQgaW5zdGFuY2UgZGF0YS5cclxuICpcclxuICovXHJcblxyXG5Xb3JrZmxvdy5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChfdGhpcy5pbnN0YW5jZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgd2FybiA9IHV0aWwud2FybignSW5zdGFuY2UgYWxyZWFkeSBleGlzdHMuJywgX3RoaXMpXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHdhcm4pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSB3b3JrZmxvdyBwcm9jZXNzZXMgaW5zdGFuY2Ugb2JqZWN0XHJcbiAgICAgICAgICAgICAgICB2YXIgbW9kZWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2lkOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnd29ya2Zsb3dJbnN0YW5jZScsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc2VzOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFubmVsczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbW11bml0eV9cIiArIGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInByb2ZpbGVfXCIgKyBhcHAuU0NPUEUucHJvZmlsZUlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFwcGxpY2F0aW9uX1wiICsgYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tbXVuaXR5X1wiICsgYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCkgKyBcIl9hcHBsaWNhdGlvbl9cIiArIGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBtb2RlbC5faWQgPSBfdGhpcy5wcm9maWxlICsgJzpwcm9jZXNzZXMnO1xyXG4gICAgICAgICAgICAgICAgbW9kZWwudmVyc2lvbiA9IF90aGlzLmNvbmZpZy52ZXJzaW9uO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuaW5zdGFuY2UgPSBtb2RlbDtcclxuICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdXb3JrZmxvdyBwcm9jZXNzZXMgaW5zdGFuY2UgY3JlYXRlZCBzdWNjZXNzZnVsbHkuJywgX3RoaXMpO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXb3JrZmxvdyBpbml0aWFsaXNlLCB0aGlzIGZ1bmN0aW9uIGV4ZWN1dGVzIGEgcHJvY2VzcyB3aXRoaW4gYSB3b3JrZmxvd1xyXG4gKiBjb25maWd1cmF0aW9uLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIHByb2Nlc3MgaWQgdG8gcHJvY2Vzc1xyXG4gKiBAcGFyYW0ge29iamVjdH0gW2RhdGFdIC0gdGhlIGlucHV0IGRhdGEgdG8gcHJvY2Vzc1xyXG4gKlxyXG4gKiBAZXhhbXBsZVxyXG4gKiBXb3JrZmxvdy5pbml0aWFsaXNlKCdwcm9jZXNzSWQnLCB7IHZhbGlkRGF0ZTogJ2RhdGUnIH0pO1xyXG4gKlxyXG4gKiBAcmV0dXJuIFwiXCJcclxuICpcclxuICovXHJcbldvcmtmbG93LnByb3RvdHlwZS5pbml0aWFsaXNlID0gZnVuY3Rpb24ocHJvY2Vzc0lkLCBkYXRhLCBzdWJwcm9maWxlSWQpIHtcclxuICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIGNvbmZpZ1Byb2Nlc3MgPSBbXTtcclxuICAgICAgICAgICAgLy8gQ2hlY2sgdGhlIHBhc3NlZCBpbiBwYXJhbWV0ZXJzXHJcbiAgICAgICAgICAgIGlmIChwcm9jZXNzSWQgIT09ICcnICYmIHByb2Nlc3NJZCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBHZXQgdGhlIGN1cnJlbnQgcHJvY2VzcyBjb25maWdcclxuICAgICAgICAgICAgICAgIGNvbmZpZ1Byb2Nlc3MgPSBfdGhpcy5jb25maWcucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmpQcm9jZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9ialByb2Nlc3MuX2lkID09IHByb2Nlc3NJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqUHJvY2VzcztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnUHJvY2Vzc1swXS5faWQgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZDb25maWdFcnJvcicsICdObyB2YWxpZCBwcm9jZXNzIGRlZmluaXRpb24gZm91bmQgd2l0aCBwcm9jZXNzIGlkOiAnICsgcHJvY2Vzc0lkKTtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbmZpZ1Byb2Nlc3MucHVzaChfdGhpcy5jb25maWcucHJvY2Vzc2VzWzBdKTtcclxuICAgICAgICAgICAgICAgIHByb2Nlc3NJZCA9IF90aGlzLmNvbmZpZy5wcm9jZXNzZXNbMF0uX2lkO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBHZXQgdGhlIGN1cnJlbnQgbGlzdCBvZiBwcm9jZXNzIGluc3RhbmNlc1xyXG4gICAgICAgICAgICAvLyB2YXIgcHJvY2Vzc1NlcSA9IDE7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50UHJvY2VzcyA9IFtdO1xyXG4gICAgICAgICAgICBfdGhpcy5pbnN0YW5jZS5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHByb2Nlc3NJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocHJvY2Vzc0l0ZW0uaWQgPT0gcHJvY2Vzc0lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFByb2Nlc3MucHVzaChwcm9jZXNzSXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIHByb2Nlc3NTZXEgPSBjdXJyZW50UHJvY2Vzcy5sZW5ndGggKyAxO1xyXG4gICAgICAgICAgICAvLyB2YXIgbmV4dFNlcSA9IHByb2Nlc3NTZXEgKyAxO1xyXG4gICAgICAgICAgICAvLyBQdXNoIHRoZSBwcm9jZXNzIG9iamVjdCBpbnRvIHRoZSBhcnJheVxyXG4gICAgICAgICAgICB2YXIgcHJvY2Vzc01vZGVsID0ge1xyXG4gICAgICAgICAgICAgICAgaWQ6ICcnLFxyXG4gICAgICAgICAgICAgICAgc2VxOiAnJyxcclxuICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NlczogW11cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gMS4gVXBkYXRlIHRoZSBwcm9jZXNzIGlkIGFuZCBzZXFcclxuICAgICAgICAgICAgcHJvY2Vzc01vZGVsLmlkID0gcHJvY2Vzc0lkO1xyXG4gICAgICAgICAgICBwcm9jZXNzTW9kZWwuc2VxID0gcHJvY2Vzc1NlcTtcclxuICAgICAgICAgICAgX3RoaXMuaW5zdGFuY2UucHJvY2Vzc2VzLnB1c2gocHJvY2Vzc01vZGVsKTtcclxuICAgICAgICAgICAgLy8gUGFyYW1ldGVyc1xyXG4gICAgICAgICAgICB2YXIgc3ViUHJvY2Vzc0lkID0gY29uZmlnUHJvY2Vzc1swXS5zdWJQcm9jZXNzZXNbMF0uX2lkO1xyXG4gICAgICAgICAgICB2YXIgc3ViUHJvY2Vzc1NlcSA9IDE7XHJcbiAgICAgICAgICAgIF90aGlzLmluc3RhbmNlLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ocHJvY2Vzc0l0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvY2Vzc0l0ZW0uaWQgPT0gcHJvY2Vzc0lkICYmIHByb2Nlc3NJdGVtLnNlcSA9PSBwcm9jZXNzU2VxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NTZXEgPSBwcm9jZXNzSXRlbS5zdWJQcm9jZXNzZXMubGVuZ3RoICsgMVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8gQ2FsbCB0aGUgc3VicHJvY2VzcyBtZXRob2RcclxuXHJcbiAgICAgICAgICAgIFByb2Nlc3Muc3ViUHJvY2Vzcyhwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgZGF0YSwgX3RoaXMpLnRoZW4oZnVuY3Rpb24oc3ViUHJvY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgLy8gR2VuZXJhdGUgdGhlIHV1aWRcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdXVpZCA9IHN1YlByb2Nlc3MuZGF0YS5faWQ7IC8vX3RoaXMucHJvZmlsZSArICc6JyArIF90aGlzLmFwcCArICc6JyArIHByb2Nlc3NJZCArICc6JyArIHByb2Nlc3NTZXEgKyAnOicgKyBzdWJQcm9jZXNzSWQgKyAnOicgKyBzdWJQcm9jZXNzU2VxO1xyXG4gICAgICAgICAgICAgICAgdmFyIGxhYmVsID0gZGF0YS5sYWJlbDtcclxuICAgICAgICAgICAgICAgIC8vIEJ1aWxkIHRoZSBzdWItcHJvY2VzcyByZWZlcmVuY2Ugb2JqZWN0XHJcblxyXG4gICAgICAgICAgICAgICAgLy9UT0RPOiBDaGFuZ2UgcmVxdWlyZWQgdG8gbW92ZSBpc0FjdGl2ZSB0byBzdWJQcm9jZXNzIGZpbGUuUmVtb3ZlIGZyb20gaGVyZVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBzdWJQcm9jZXNzUmVmID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBzdWJQcm9jZXNzSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VicHJvZmlsZUlkOiBzdWJwcm9maWxlSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VxOiBzdWJQcm9jZXNzU2VxLFxyXG4gICAgICAgICAgICAgICAgICAgIHV1aWQ6IHV1aWQsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGxhYmVsXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQWRkIHRoZSByZWZlcmVuY2UgdG8gdGhlIHByb2Nlc3MgbW9kZWxcclxuICAgICAgICAgICAgICAgIHByb2Nlc3NNb2RlbC5zdWJQcm9jZXNzZXMucHVzaChzdWJQcm9jZXNzUmVmKTtcclxuICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUgc3ViUHJvY2VzcyBtb2RlbCB0byB0aGUgc3VicHJvY2Vzc2VzIGFycmF5XHJcbiAgICAgICAgICAgICAgICAvL190aGlzLnN1YnByb2Nlc3Nlcy5wdXNoKHN1YlByb2Nlc3MuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAvLyBfdGhpcy5pbnN0YW5jZS5wcm9jZXNzZXMucHVzaChwcm9jZXNzTW9kZWwpO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IF90aGlzLmluc3RhbmNlLnByb2Nlc3Nlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcHJvY2Vzc0l0ZW0gPSBfdGhpcy5pbnN0YW5jZS5wcm9jZXNzZXNbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzSXRlbS5pZCA9PSBwcm9jZXNzSWQgJiYgcHJvY2Vzc0l0ZW0uc2VxID09IHByb2Nlc3NTZXEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBjdXJyZW50IHByb2Nlc3MgZnJvbSB0aGUgYXJyYXkgYW5kIGFkZCB0aGUgdXBkYXRlZCBwcm9jZXNzTW9kZWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuaW5zdGFuY2UucHJvY2Vzc2VzLnNwbGljZShpbmRleCwgMSwgcHJvY2Vzc01vZGVsKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUHJvY2VzcyB0aGUgaW5kaWNhdG9yIGRvY3VtZW50cyB3b3JrZmxvdyBwcm9jZXNzZXMgdXBkYXRlc1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZGljYXRvcnMgPSBzdWJQcm9jZXNzLmRhdGEuaW5kaWNhdG9ycztcclxuICAgICAgICAgICAgICAgIHZhciBzdGVwID0gc3ViUHJvY2Vzcy5kYXRhLnN0ZXA7XHJcbiAgICAgICAgICAgICAgICBQcm9jZXNzLmluZGljYXRvckRvY3MocHJvY2Vzc0lkLCBpbmRpY2F0b3JzLCBzdGVwLCBfdGhpcykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnUHJvY2VzczogJyArIF90aGlzLmNvbmZpZy5wcm9jZXNzZXNbMF0uX2lkICsgJyBpbml0aWFsaXplZCBzdWNjZXNzZnVsbHkuJywgX3RoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmluc3RhbmNlLnByb2Nlc3NlcyA9IF90aGlzLmluc3RhbmNlLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEob2JqLmlkID09IHByb2Nlc3NJZCAmJiBvYmouc2VxID09IHByb2Nlc3NTZXEpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogV29ya2Zsb3cgdHJhbnNpdGlvbiB0byB0aGUgbmV4dCBzdGVwLiBUaGlzIG1vdmVzIHRoZSB3b3JrZmxvdyBmcm9tIHRoZSBjdXJyZW50IHByb2Nlc3MsXHJcbiAqIHN1Yi1wcm9jZXNzIHN0ZXAgdG8gdGhlIG5leHQgb25lIGFzIHNwZWNpZmllZC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHByb2Nlc3MgaWRcclxuICogQHBhcmFtIHtudW1iZXJ9IHByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2UgcHJvY2VzcyBzZXFcclxuICogQHBhcmFtIHtzdHJpbmd9IHN1YlByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN1Yi1wcm9jZXNzIGlkXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdWJQcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHN1Yi1wcm9jZXNzIHNlcVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RlcElkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3RlcCBpZCBcclxuICogQHBhcmFtIHtzdHJpbmd9IHRyYW5zaXRpb25JZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHRyYW5zaXRpb24gaWRcclxuICogQHBhcmFtIHtvYmplY3R9IGRhdGEgLSBhbnkgYWRkaXRpb25hbCBkYXRhIHBhc3NlZCBpbiBhcyBrZXkgdmFsdWUgcGFpcnNcclxuICpcclxuICogQGV4YW1wbGVcclxuICogV29ya2Zsb3cudHJhbnNpdGlvbigncHJvY2Vzc0lkJywgMSwgJ3N1YlByb2Nlc3NJZCcsIDEsICdzdGVwSWQnLCAndHJhbnNpdGlvbklkJywgeyBrZXk6ICcnLCB2YWx1ZTogJycgfSk7XHJcbiAqXHJcbiAqIEByZXR1cm4gXCJcIlxyXG4gKlxyXG4gKi9cclxuV29ya2Zsb3cucHJvdG90eXBlLnRyYW5zaXRpb24gPSBmdW5jdGlvbihwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3RlcElkLCB0cmFuc2l0aW9uSWQsIGRhdGEsIHNwdXVpZCkge1xyXG4gICAgLy8gUmUtYXNzaWduIHRoaXNcclxuICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIG1vZGVsID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHNwdXVpZCArIFwiJ10vc3RlcC9kYXRhXCIsIGFwcC5TQ09QRS53b3JrZmxvdywge30pWzBdO1xyXG5cclxuICAgICAgICAgICAgUHJvY2Vzcy50cmFuc2l0aW9uKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdGVwSWQsIHRyYW5zaXRpb25JZCwgZGF0YSwgX3RoaXMsIHNwdXVpZCwgbW9kZWwpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBjdXJyZW50IHN1Yi1wcm9jZXNzIHN0ZXAgZGF0YVxyXG4gICAgICAgICAgICAgICAgdmFyIHVwZGF0ZSA9IGZ1bmN0aW9uKHR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5pbnN0YW5jZS5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHByb2Nlc3NJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzSXRlbS5pZCA9PSBwcm9jZXNzSWQgJiYgcHJvY2Vzc0l0ZW0uc2VxID09IHByb2Nlc3NTZXEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzSXRlbS5zdWJQcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHN1YlByb2Nlc3NJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1YlByb2Nlc3NJdGVtLmlkID09IHN1YlByb2Nlc3NJZCAmJiBzdWJQcm9jZXNzSXRlbS5zZXEgPT0gc3ViUHJvY2Vzc1NlcSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuc3VicHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihzdWJQcm9jZXNzT2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3ViUHJvY2Vzc09iai5faWQgPT0gc3ViUHJvY2Vzc0l0ZW0udXVpZCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PSAnc3RlcCcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NPYmouc3RlcCA9IHJlc3VsdC5kYXRhLnN0ZXA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKHJlc3VsdC5tZXNzYWdlLCBzdWJQcm9jZXNzT2JqKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09ICdzdGVwQ29tcGxldGUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NPYmouc3RlcCA9IHJlc3VsdC5kYXRhLnN0ZXA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NPYmouY29tcGxldGUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKHJlc3VsdC5tZXNzYWdlLCBzdWJQcm9jZXNzT2JqLnN0ZXApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YS5zdWJQcm9jZXNzQ29tcGxldGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlKCdzdGVwQ29tcGxldGUnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZSgnc3RlcCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG5cclxuICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdvcmtmbG93IGFzc2lnbiB1c2VyLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gcHJvY2VzcyBpZFxyXG4gKiBAcGFyYW0ge251bWJlcn0gcHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBwcm9jZXNzIHNlcVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3ViUHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3ViLXByb2Nlc3MgaWRcclxuICogQHBhcmFtIHtudW1iZXJ9IHN1YlByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2Ugc3ViLXByb2Nlc3Mgc2VxXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdGVwSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdGVwIGlkXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSB1c2VyIC0gdGhlIHVzZXIgaWQgYW5kIG5hbWUgZGF0YVxyXG4gKlxyXG4gKiBAZXhhbXBsZSBcIlwiXHJcbiAqXHJcbiAqIEByZXR1cm4gXCJcIlxyXG4gKlxyXG4gKi9cclxuV29ya2Zsb3cucHJvdG90eXBlLmFzc2lnblVzZXIgPSBmdW5jdGlvbihwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgdXNlcikge1xyXG4gICAgLy8gUmUtYXNzaWduIHRoZSBXb3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZSBhcyBfdGhpc1xyXG4gICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBQcm9jZXNzLmFzc2lnblVzZXIocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHVzZXIsIF90aGlzKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSlcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXb3JrZmxvdyB0YXNrLCB0aGlzIG1ldGhvZCBleGVjdXRlcyBhIHNwZWNpZmljIHRhc2suXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9jZXNzSWQgLSB0aGUgcHJvY2VzcyBpZCB0byBwcm9jZXNzXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dERhdGEgLSB0aGUgaW5wdXQgZGF0YSB0byBwcm9jZXNzXHJcbiAqXHJcbiAqIEBleGFtcGxlXHJcbiAqIFdvcmtmbG93LmluaXRpYWxpemUoJ3Byb2Nlc3NJZCcsIHsgdmFsaWREYXRlOiAnZGF0ZScgfSk7XHJcbiAqXHJcbiAqIEByZXR1cm4gXCJcIlxyXG4gKlxyXG4gKi9cclxuV29ya2Zsb3cucHJvdG90eXBlLnVpID0gZnVuY3Rpb24oKSB7XHJcbiAgICAvLyBSZS1hc3NpZ24gdGhlIFdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlIGFzIF90aGlzXHJcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnZXRQcm9jZXNzOiBmdW5jdGlvbihwcm9jZXNzSWQsIGxhbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VySW50ZXJmYWNlLmdldFByb2Nlc3MocHJvY2Vzc0lkLCBsYW5nLCBfdGhpcykudGhlbihmdW5jdGlvbihtb2RlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG1vZGVsKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gV29ya2Zsb3c7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsaXR5Jyk7XHJcbnZhciBub2RlVmFsdWUgPSByZXF1aXJlKCcuL25vZGVWYWx1ZScpO1xyXG52YXIgZm9ybSA9IHJlcXVpcmUoJy4vZm9ybScpO1xyXG5cclxuXHJcbnZhciBnYXRla2VlcGVyID0gbmV3IEdLKCk7XHJcblxyXG4vKipcclxuICogQWN0aW9ucyBNb2R1bGVcclxuICpcclxuICogQG1vZHVsZSBsaWIvYWN0aW9uc1xyXG4gKiBAYXV0aG9yIEhhc2FuIEFiYmFzXHJcbiAqIEB2ZXJzaW9uIDIuMC4wXHJcbiAqIEBkZXNjcmlwdGlvbiB0ZXN0IGRlc2NyaXB0aW9uXHJcbiAqIEBjb3B5cmlnaHQgS3dhbnR1IEx0ZCBSU0EgMjAwOS0yMDE1LlxyXG4gKlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiAgRm9ybSBNb2R1bGUgYWN0aW9ucyBuZWVkcyB0byBiZSBtb3ZlZCBoZXJlLlxyXG4gKiAgVGhpcyBhY3Rpb25zIG1vZHVsZSB3aWxsIGJlIGNlbnRhbCBwbGFjZSB0byBob2xkIGFsbCBmdW5jdGlvbnMuXHJcbiAqICBcclxuICovXHJcblxyXG52YXIgY29tbXVuaXR5ID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHJldHVybiB7XHJcblxyXG4gICAgICAgIGNyZWF0ZUNvbW11bml0eTogZnVuY3Rpb24oX2RlZiwgdXVpZCwgX1dGSW5zdGFuY2UpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY29tbXVuaXR5SWQgPSBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbmV3IERhdGUoKS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xyXG4gICAgICAgICAgICAgICAgdmFyIHV1aWRDb21tdW5pdHkgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnQ29tbXVuaXR5J10vX2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY3JlYXRlQ29tbXVuaXR5XCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJuZXdDb21tdW5pdHlJZFwiOiBfV0ZJbnN0YW5jZS5wcm9maWxlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImluZGljYXRvclVVSURcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJDb21tdW5pdHlcIjogdXVpZENvbW11bml0eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hY3Rpb24gPSBhY3Rpb247XHJcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24od29ya2VyU3VjY2Vzcykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya2VyIHByb2Nlc3NlZCBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbih3b3JrZXJGYWlsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdvcmtlckZhaWwpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdXNlckpvaW5Db21tdW5pdHk6IGZ1bmN0aW9uKF9kZWYsIHV1aWQsIF9XRkluc3RhbmNlKSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZWxlYXNlQWRvcHRlZEFwcGxpY2F0aW9uOiBmdW5jdGlvbihfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5faWQgPSBnZW5lcmF0ZVVVSUQoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jcmVhdGVkRGF0ZVRpbWUgPSBuZXcgRGF0ZSgpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2VuZGVyVXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHV1aWRSZWxlYXNlQWRvcHRlZEFwcGxpY2F0aW9uID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ2Fkb3B0ZWRBcHBsaWNhdGlvbiddL2luc3RhbmNlc1sxXS91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWxlYXNlQWRvcHRlZEFwcGxpY2F0aW9uXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21tdW5pdHlJZFwiOiBfV0ZJbnN0YW5jZS5wcm9maWxlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImluZGljYXRvclVVSURcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhZG9wdGVkQXBwbGljYXRpb25cIjogdXVpZFJlbGVhc2VBZG9wdGVkQXBwbGljYXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uKHdvcmtlclN1Y2Nlc3MpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1dvcmtlciBwcm9jZXNzZXMgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24od29ya2VyRmFpbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh3b3JrZXJGYWlsKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSkoKTtcclxuXHJcbnZhciBhcHBsaWNhdGlvbiA9IChmdW5jdGlvbigpIHtcclxuXHJcbiAgICByZXR1cm4ge1xyXG5cclxuICAgICAgICBjcmVhdGVBcHBEZWZpbml0aW9uOiBmdW5jdGlvbihfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5faWQgPSBnZW5lcmF0ZVVVSUQoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jcmVhdGVkRGF0ZVRpbWUgPSBuZXcgRGF0ZSgpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2VuZGVyVXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHV1aWRBcHBsaWNhdGlvbiA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdBcHBsaWNhdGlvbiddL19pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZUFwcGxpY2F0aW9uXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJuZXdBcHBsaWNhdGlvbklkXCI6IF9XRkluc3RhbmNlLnByb2ZpbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5kaWNhdG9yVVVJRFwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkFwcGxpY2F0aW9uXCI6IHV1aWRBcHBsaWNhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hY3Rpb24gPSBhY3Rpb247XHJcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24od29ya2VyU3VjY2Vzcykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya2VyIHByb2Nlc3NlcyBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbih3b3JrZXJGYWlsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdvcmtlckZhaWwpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBidWlsZEFwcGxpY2F0aW9uOiBmdW5jdGlvbihfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5faWQgPSBnZW5lcmF0ZVVVSUQoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jcmVhdGVkRGF0ZVRpbWUgPSBuZXcgRGF0ZSgpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2VuZGVyVXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHV1aWRQdWJsaXNoQXBwbGljYXRpb24gPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnUHVibGlzaEFwcGxpY2F0aW9uJ10vaW5zdGFuY2VzWzFdL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdXVpZEFwcGxpY2F0aW9uRGVmaW5pdGlvbiA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdBcHBsaWNhdGlvbkRlZmluaXRpb24nXS9faWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICAgICAgICAgIHZhciB1dWlkUm9sZXMgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnUm9sZXMnXS9faWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICAgICAgICAgIHZhciB1dWlkQXBwbGljYXRpb24gPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnQXBwbGljYXRpb24nXS9faWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICAgICAgICAgIHZhciB1dWlkQXBwUGVybWlzc2lvbnMgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnQXBwUGVybWlzc2lvbnMnXS9faWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiYnVpbGRBcHBsaWNhdGlvblwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYXBwbGljYXRpb25JZFwiOiBfV0ZJbnN0YW5jZS5wcm9maWxlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImluZGljYXRvclVVSURcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJQdWJsaXNoQXBwbGljYXRpb25cIjogdXVpZFB1Ymxpc2hBcHBsaWNhdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQXBwbGljYXRpb25EZWZpbml0aW9uXCI6IHV1aWRBcHBsaWNhdGlvbkRlZmluaXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJvbGVzXCI6IHV1aWRSb2xlcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQXBwbGljYXRpb25cIjogdXVpZEFwcGxpY2F0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBcHBQZXJtaXNzaW9uc1wiOiB1dWlkQXBwUGVybWlzc2lvbnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uKHdvcmtlclN1Y2Nlc3MpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1dvcmtlciBwcm9jZXNzZXMgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24od29ya2VyRmFpbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh3b3JrZXJGYWlsKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYXBwbGljYXRpb25BZG9wdGlvbjogZnVuY3Rpb24oX2RlZiwgdXVpZCwgX1dGSW5zdGFuY2UpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY29tbXVuaXR5SWQgPSBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbmV3IERhdGUoKS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB1dWlkQWRvcHRpb24gPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnQWRvcHRpb24nXS9pbnN0YW5jZXNbMV0vdXVpZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHV1aWRQdWJsaXNoQXBwbGljYXRpb24gPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnUHVibGlzaEFwcGxpY2F0aW9uJ10vX2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcbiAgICAgICAgICAgICAgICB2YXIgdXVpZEFwcGxpY2F0aW9uID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ0FwcGxpY2F0aW9uJ10vX2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICBcImFkb3B0QXBwbGljYXRpb25cIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFwcGxpY2F0aW9uSWRcIjogX1dGSW5zdGFuY2UucHJvZmlsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbmRpY2F0b3JVVUlEXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQWRvcHRpb25cIjogdXVpZEFkb3B0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJQdWJsaXNoQXBwbGljYXRpb25cIjogdXVpZFB1Ymxpc2hBcHBsaWNhdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQXBwbGljYXRpb25cIjogdXVpZEFwcGxpY2F0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcclxuICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbih3b3JrZXJTdWNjZXNzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdXb3JrZXIgcHJvY2Vzc2VzIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHdvcmtlckZhaWwpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNyZWF0ZVRheG9ub215OiBmdW5jdGlvbihfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5faWQgPSBnZW5lcmF0ZVVVSUQoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jcmVhdGVkRGF0ZVRpbWUgPSBuZXcgRGF0ZSgpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2VuZGVyVXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHRheG9ub215VVVJRCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pbmRpY2F0b3JzW2lkIGVxICdUYXhvbm9teSddL2luc3RhbmNlc1sxXS91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZVRheG9ub215XCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YXhvbm9teVVVSURcIjogdGF4b25vbXlVVUlEXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hY3Rpb24gPSBhY3Rpb247XHJcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24od29ya2VyU3VjY2Vzcykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya2VyIHByb2Nlc3NlcyBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbih3b3JrZXJGYWlsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdvcmtlckZhaWwpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KSgpO1xyXG5cclxuXHJcbnZhciB3b3JrZXIgPSAoZnVuY3Rpb24oKSB7XHJcblxyXG5cclxuICAgIHJldHVybiB7XHJcblxyXG4gICAgICAgIGdldFdvcmtlcldyYXBwZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHdyYXBwZXIgPSB7XHJcbiAgICAgICAgICAgICAgICBcInNvdXJjZVwiOiBcInJlbW90ZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwid29ya2VyT2JqZWN0XCIsXHJcbiAgICAgICAgICAgICAgICBcIl9pZFwiOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgXCJjaGFubmVsc1wiOiBbXSxcclxuICAgICAgICAgICAgICAgIFwiY29tbXVuaXR5SWRcIjogXCJcIixcclxuICAgICAgICAgICAgICAgIFwiYXBwbGljYXRpb25JZFwiOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBcIm1lc3NhZ2VUeXBlXCI6IFwiaW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgXCJjcmVhdGVkRGF0ZVRpbWVcIjogXCJcIixcclxuICAgICAgICAgICAgICAgIFwic2VuZGVyVXNlcklkXCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdGlmaWNhdGlvblwiOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwiYWN0aW9uXCI6IHtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gd3JhcHBlcjtcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZW5kOiBmdW5jdGlvbih3b3JrZXJPYmplY3QpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU3VibWl0dGluZyBXb3JrZXIgT2JqZWN0IHRvIHNlcnZlcicpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cod29ya2VyT2JqZWN0KTtcclxuICAgICAgICAgICAgICAgIGRhby5zYXZlKHdvcmtlck9iamVjdCkuZG9uZShmdW5jdGlvbih3b3JrZXJSZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUod29ya2VyUmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgfSkuZmFpbChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3Igc3VibWl0dGluZyB3b3JrZXIgcmVzcG9uc2UgISEnICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pKCk7XHJcblxyXG52YXIgcGVyZm9ybWFuY2UgPSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuXHJcbiAgICAgICAgY3JlYXRlOiBmdW5jdGlvbihfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5faWQgPSBnZW5lcmF0ZVVVSUQoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jcmVhdGVkRGF0ZVRpbWUgPSBuZXcgRGF0ZSgpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2VuZGVyVXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHV1aWRDb21tdW5pdHkgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAncGxhbiddL19pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZVBsYW5cIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBsYW5VVUlEXCI6IHV1aWRDb21tdW5pdHlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcclxuICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbih3b3JrZXJTdWNjZXNzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdXb3JrZXIgcHJvY2Vzc2VkIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHdvcmtlckZhaWwpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY29uZmlndXJlTm9kZTogZnVuY3Rpb24oX2RlZiwgdXVpZCwgX1dGSW5zdGFuY2UpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY29tbXVuaXR5SWQgPSBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbmV3IERhdGUoKS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB1dWlkTm9kZUluU3ViUHJvY2VzcyA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pbmRpY2F0b3JzW2lkIGVxICdub2RlJ10vaW5zdGFuY2VzWzFdL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29uZmlndXJlTm9kZVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibm9kZVVVSURcIjogdXVpZE5vZGVJblN1YlByb2Nlc3NcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcclxuICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbih3b3JrZXJTdWNjZXNzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdXb3JrZXIgcHJvY2Vzc2VkIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHdvcmtlckZhaWwpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0pKCk7XHJcblxyXG52YXIgc2RvID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHJldHVybiB7XHJcblxyXG4gICAgICAgIGNyZWF0ZTogZnVuY3Rpb24oX2RlZiwgdXVpZCwgX1dGSW5zdGFuY2UpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY29tbXVuaXR5SWQgPSBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbmV3IERhdGUoKS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBzZG9VVUlEID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ1NETyddL2luc3RhbmNlc1sxXS91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZVNET1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic2RvVVVJRFwiOiBzZG9VVUlEXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hY3Rpb24gPSBhY3Rpb247XHJcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24od29ya2VyU3VjY2Vzcykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya2VyIHByb2Nlc3NlcyBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbih3b3JrZXJGYWlsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdvcmtlckZhaWwpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSkoKTtcclxuXHJcbnZhciB0YXhvbm9teSA9IChmdW5jdGlvbigpIHtcclxuXHJcbiAgICByZXR1cm4ge1xyXG5cclxuICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uKF9kZWYsIHV1aWQsIF9XRkluc3RhbmNlKSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IHdvcmtlci5nZXRXb3JrZXJXcmFwcGVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYXBwbGljYXRpb25JZCA9IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG5ldyBEYXRlKCkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZW5kZXJVc2VySWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZDtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdGF4b25vbXlVVUlEID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ1RheG9ub215J10vaW5zdGFuY2VzWzFdL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY3JlYXRlVGF4b25vbXlcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRheG9ub215VVVJRFwiOiB0YXhvbm9teVVVSURcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcclxuICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbih3b3JrZXJTdWNjZXNzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdXb3JrZXIgcHJvY2Vzc2VzIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHdvcmtlckZhaWwpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59KSgpO1xyXG5cclxuXHJcbnZhciBzdWJQcm9jZXNzSW5zdGFuY2UgPSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuXHJcbiAgICAgICAgc2V0VGl0bGU6IGZ1bmN0aW9uKF9kZWYsIHV1aWQsIGRhdGFWYWx1ZSwgX1dGSW5zdGFuY2UpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgc3BQcm9jZXNzT2JqZWN0ID0gSlNPTi54cGF0aChcIi9pbnN0YW5jZS9wcm9jZXNzZXMvc3ViUHJvY2Vzc2VzW3V1aWQgZXEgJ1wiICsgdXVpZCArIFwiJ11cIiwgYXBwLlNDT1BFLndvcmtmbG93LCB7fSlbMF07XHJcbiAgICAgICAgICAgICAgICBzcFByb2Nlc3NPYmplY3QubGFiZWwgPSBkYXRhVmFsdWU7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW1zVG9Qcm9jZXNzID0gMTtcclxuICAgICAgICAgICAgICAgIHZhciBzdHVmZiA9IFtdO1xyXG4gICAgICAgICAgICAgICAgdmFyIG9iaiA9IHt9O1xyXG4gICAgICAgICAgICAgICAgb2JqLm1vZGVsID0gX1dGSW5zdGFuY2UuaW5zdGFuY2U7XHJcbiAgICAgICAgICAgICAgICBzdHVmZi5wdXNoKG9iaik7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgICAgICBnYXRla2VlcGVyLnBlcnNpc3Qoc3R1ZmYpLnRoZW4oZnVuY3Rpb24oc2F2ZWRBcnJheSkge1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHV1aWRTYXZlZEluZGljYXRvciA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgc2F2ZWRBcnJheS5sZW5ndGg7IGMrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNhdmVkQXJyYXlbY10uaWQuZW5kc1dpdGgoJzphcHByb3ZlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dWlkU2F2ZWRJbmRpY2F0b3IgPSBzYXZlZEFycmF5W2NdLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGRhby5nZXQodXVpZFNhdmVkSW5kaWNhdG9yKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbnN0YW5jZSA9IGRhdGE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1N1YnByb2Nlc3Mgc2V0VGl0bGUgc3VjY2Vzcy4nLCBfV0ZJbnN0YW5jZS5pbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuZmFpbChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0pKCk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgICBjb21tdW5pdHk6IGNvbW11bml0eSxcclxuICAgIGFwcGxpY2F0aW9uOiBhcHBsaWNhdGlvbixcclxuICAgIHBlcmZvcm1hbmNlOiBwZXJmb3JtYW5jZSxcclxuICAgIHdvcmtlcjogd29ya2VyLFxyXG4gICAgc2RvOiBzZG8sXHJcbiAgICB0YXhvbm9teTogdGF4b25vbXksXHJcbiAgICBzdWJQcm9jZXNzSW5zdGFuY2U6IHN1YlByb2Nlc3NJbnN0YW5jZVxyXG59IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy92YXIgZ2F0ZWtlZXBlciA9IHJlcXVpcmUoJy4uL2Jvd2VyX2NvbXBvbmVudHMvZ2F0ZWtlZXBlcicpO1xyXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWxpdHknKTtcclxuXHJcbi8vIHZhciB1dWlkID0gcmVxdWlyZSgnbm9kZS11dWlkJyk7XHJcblxyXG52YXIgZ2F0ZWtlZXBlciA9IG5ldyBHSygpO1xyXG5cclxuLyoqXHJcbiAqIEZvcm0gTW9kdWxlXHJcbiAqXHJcbiAqIEBtb2R1bGUgbGliL2Zvcm1cclxuICogQGF1dGhvciBCcmVudCBHb3Jkb25cclxuICogQHZlcnNpb24gMi4wLjBcclxuICogQGRlc2NyaXB0aW9uIHRlc3QgZGVzY3JpcHRpb25cclxuICogQGNvcHlyaWdodCBLd2FudHUgTHRkIFJTQSAyMDA5LTIwMTUuXHJcbiAqXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlKGFyZ3MpIHtcclxuXHJcbiAgICB2YXIgcHJvY2Vzc0lkID0gYXJnc1swXSB8fCAnJztcclxuXHJcbiAgICB2YXIgc3ViUHJvY2VzcyA9IGFyZ3NbMV0gfHwge307XHJcblxyXG4gICAgdmFyIHN0ZXAgPSBhcmdzWzJdIHx8IHt9O1xyXG5cclxuICAgIHZhciBhY3Rpb24gPSBhcmdzWzNdIHx8IHt9O1xyXG5cclxuICAgIHZhciBfV0ZJbnN0YW5jZSA9IGFyZ3NbNl0gfHwge307XHJcblxyXG4gICAgdmFyIGRhdGEgPSBhcmdzWzZdIHx8IHt9O1xyXG5cclxuICAgIHZhciBpbmRpY2F0b3JzID0gc3ViUHJvY2Vzcy5pbmRpY2F0b3JzIHx8IFtdO1xyXG5cclxuICAgIHZhciByZXN1bHQgPSBbXTtcclxuXHJcbiAgICB2YXIgaW5kaWNhdG9yVHlwZSA9IGFjdGlvbi5fdHlwZTtcclxuXHJcbiAgICB2YXIgcHJvY2Vzc1NlcSA9IGFyZ3NbNF0gfHwgJyc7XHJcblxyXG4gICAgdmFyIHN1YlByb2Nlc3NTZXEgPSBhcmdzWzVdIHx8ICcnO1xyXG5cclxuICAgIHZhciBjcmVhdGVUeXBlID0gYXJnc1s3XSB8fCAnJztcclxuXHJcbiAgICB2YXIgc3ViUHJvY2Vzc0lkID0gc3ViUHJvY2Vzcy5faWQ7XHJcblxyXG4gICAgdmFyIHV1aWQgPSBhcmdzWzhdIHx8ICcnO1xyXG5cclxuICAgIHZhciBiYXNlVVVJRCA9IGFyZ3NbOV0gfHwgJyc7XHJcblxyXG4gICAgdmFyIHByb2ZpbGUgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xyXG5cclxuXHJcblxyXG4gICAgdmFyIGlucHV0RGF0YSA9IGFyZ3NbMTBdIHx8IHt9O1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICB2YXIgdG9Qcm9jZXNzID0gaW5kaWNhdG9ycy5sZW5ndGg7XHJcblxyXG4gICAgICAgIHZhciBmb3JtQ3JlYXRlRm4gPSBmdW5jdGlvbihpZCwgaW5kaWNhdG9yVHlwZSwgaW5kaWNhdG9ySWQsIHZhbGlkRGF0ZSwgaW5zdGFudGlhdGVTb3VyY2UpIHtcclxuXHJcbiAgICAgICAgICAgIGdhdGVrZWVwZXIuaW5zdGFudGlhdGUoaWQsIGluZGljYXRvclR5cGUsIGluZGljYXRvcklkLCBfV0ZJbnN0YW5jZS5wcm9maWxlLCB2YWxpZERhdGUpLnRoZW4oZnVuY3Rpb24oZG9jQXJyYXkpIHtcclxuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgaW5kaWNhdG9yIHdvcmtmbG93IHByb2Nlc3NlcyBzZWN0aW9uXHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkb2NBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmplY3QgPSBkb2NBcnJheVtpXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIW9iamVjdC5tb2RlbC5faWQuZW5kc1dpdGgoJzphcHByb3ZlZCcpICYmICFvYmplY3QubW9kZWwuX2lkLmVuZHNXaXRoKCc6cmVqZWN0ZWQnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHdvcmtmbG93T2JqID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBfV0ZJbnN0YW5jZS5jb25maWcuX2lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbnN0YW5jZVwiOiBfV0ZJbnN0YW5jZS5pbnN0YW5jZS5faWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb2Nlc3Nlc1wiOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogcHJvY2Vzc0lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3ViUHJvY2Vzc0lkXCI6IHN1YlByb2Nlc3MuX2lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3ViUHJvY2Vzc1VVSURcIjogdXVpZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0ZXBcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IHN0ZXAuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VxXCI6IHN0ZXAuc2VxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0YXJ0RGF0ZVwiOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0YXR1c1wiOiBzdGVwLnN0YXR1cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IHN0ZXAubWVzc2FnZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhc3NpZ25lZFRvXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlcklkXCI6IHN0ZXAuYXNzaWduZWRUby51c2VySWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogc3RlcC5hc3NpZ25lZFRvLm5hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21tZW50XCI6IHN0ZXAuY29tbWVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21wbGV0ZVwiOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJlbmREYXRlXCI6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uLnNldFdvcmtmbG93TGFiZWxJblRpdGxlICE9IHVuZGVmaW5lZCAmJiBhY3Rpb24uc2V0V29ya2Zsb3dMYWJlbEluVGl0bGUgIT0gJycgJiYgYWN0aW9uLnNldFdvcmtmbG93TGFiZWxJblRpdGxlID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdC5tb2RlbC50aXRsZSA9IGlucHV0RGF0YS5sYWJlbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGlvbi5zZXREcmFmdCAhPSB1bmRlZmluZWQgJiYgYWN0aW9uLnNldERyYWZ0ICE9ICcnICYmIGFjdGlvbi5zZXREcmFmdCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3QubW9kZWwuY29udHJvbC5kcmFmdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3QubW9kZWwud29ya2Zsb3dzLnB1c2god29ya2Zsb3dPYmopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWFpbklkID0gb2JqZWN0Lm1vZGVsLl9pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcGVyc2lzdCB2aWEgZ2sgc28gdGhhdCBpdCBpcyBzYXZlIGluIGNvdWNoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhdGVrZWVwZXIucGVyc2lzdChkb2NBcnJheSkudGhlbihmdW5jdGlvbihzYXZlZEFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3VzaW5nIHNhbWUgaWQgY2FsbCBpbml0aWFsaXNlRGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jYWxsIGNvZGUgdG8gc2V0IHRvIHNldEluc3RhbmNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYW8uZ2V0KG1haW5JZCkuZG9uZShmdW5jdGlvbihkYXRhKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yTW9kZWwgPSBrby5tYXBwaW5nLmZyb21KUyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGVmYXVsdE1vZGVsXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2V0SWRcIjogaW5kaWNhdG9ySWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYXRla2VlcGVyLmluc3RhbnRpYXRlRGF0YShtYWluSWQsIGluc3RhbnRpYXRlU291cmNlLCBpbmRpY2F0b3JNb2RlbCwgZGF0YS5tb2RlbC5wZW5kaW5nLnNlcSkudGhlbihmdW5jdGlvbihkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVswXS5zdGF0dXMgPT0gXCIyMDBcIikge1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uLnNldFdvcmtmbG93TGFiZWxJbkZpZWxkICE9IHVuZGVmaW5lZCAmJiBhY3Rpb24uc2V0V29ya2Zsb3dMYWJlbEluRmllbGQgIT0gJycgJiYgbWFpbklkID09IHByb2ZpbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGF0aCA9IFwiZGF0YVswXS5tb2RlbC5tb2RlbC5wZW5kaW5nLmRhdGEuXCIgKyBhY3Rpb24uc2V0V29ya2Zsb3dMYWJlbEluRmllbGQgKyBcIj0nXCIgKyBpbnB1dERhdGEubGFiZWwgKyBcIidcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmFsKHBhdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhdGVrZWVwZXIucGVyc2lzdChkYXRhKS50aGVuKGZ1bmN0aW9uKHNhdmVkQXJyYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYW8uZ2V0KG1haW5JZCkuZG9uZShmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnB1c2goZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b1Byb2Nlc3MtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b1Byb2Nlc3MgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5LicsIF9XRkluc3RhbmNlLmluZGljYXRvcnMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvdW5kID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yID0gX1dGSW5zdGFuY2UuaW5kaWNhdG9yc1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGljYXRvci5faWQgPT0gZGF0YS5faWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGN1cnJlbnQgaXRlbSBmcm9tIHRoZSBhcnJheSBhbmQgYWRkIHRoZSB1cGRhdGVkIHByb2Nlc3NNb2RlbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9Qcm9jZXNzLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b1Byb2Nlc3MgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gY3JlYXRlZCBzdWNjZXNzZnVsbHkuJywgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvdW5kID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5wdXNoKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b1Byb2Nlc3MtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9Qcm9jZXNzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gY3JlYXRlZCBzdWNjZXNzZnVsbHkuJywgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuZmFpbChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmFpbHVyZSA9IHV0aWwuc3VjY2VzcygnMSBHYXRla2VlcGVyIGluaXRpYWxpc2F0aW9uIGZhaWxlZCB3aXRoIGluaXRpYWxpc2VEYXRhIG1lc3NhZ2UgJyArIGVyclswXS5tZXNzYWdlLCB7fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChmYWlsdXJlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmYWlsdXJlID0gdXRpbC5zdWNjZXNzKCcyIEdhdGVrZWVwZXIgaW5pdGlhbGlzYXRpb24gZmFpbGVkIHdpdGggaW5pdGlhbGlzZURhdGEgbWVzc2FnZSAnICsgZXJyWzBdLm1lc3NhZ2UsIHt9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFpbHVyZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmYWlsdXJlID0gdXRpbC5zdWNjZXNzKCczIEdhdGVrZWVwZXIgaW5pdGlhbGlzYXRpb24gZmFpbGVkIHdpdGggaW5pdGlhbGlzZURhdGEgbWVzc2FnZSAnICsgZXJyWzBdLm1lc3NhZ2UsIHt9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChmYWlsdXJlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmYWlsdXJlID0gdXRpbC5zdWNjZXNzKCc0IEdhdGVrZWVwZXIgaW5pdGlhbGlzYXRpb24gZmFpbGVkIHdpdGggaW5pdGlhbGlzZURhdGEgbWVzc2FnZSAnICsgZXJyWzBdLm1lc3NhZ2UsIHt9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGZhaWx1cmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuZmFpbChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZhaWx1cmUgPSB1dGlsLnN1Y2Nlc3MoJzUgR2F0ZWtlZXBlciBpbml0aWFsaXNhdGlvbiBmYWlsZWQgd2l0aCBpbml0aWFsaXNlRGF0YSBtZXNzYWdlICcgKyBlcnJbMF0ubWVzc2FnZSwge30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChmYWlsdXJlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZhaWx1cmUgPSB1dGlsLnN1Y2Nlc3MoJzYgR2F0ZWtlZXBlciBpbml0aWFsaXNhdGlvbiBmYWlsZWQgd2l0aCBpbml0aWFsaXNlRGF0YSBtZXNzYWdlICcgKyBlcnJbMF0ubWVzc2FnZSwge30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGZhaWx1cmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL3BlcnNpc3QgLSBzYXZlXHJcbiAgICAgICAgICAgICAgICAvL2xvb3Agb24gd29ya2Zsb3cgYXJyYXkgYW5kIGNoZWNrIGZvciA0IGNvbmRpdGlvbnMgYW5kIHNwbGljZSBhbmQgdXBkYXRlXHJcbiAgICAgICAgICAgICAgICAvLyBHb3QgdG8gdGhlIG5leHQgcHJvY2VzcyBpdGVtXHJcblxyXG4gICAgICAgICAgICAgICAgLyp2YXIgd29ya2Zsb3dzID0gZG9jLndvcmtmbG93cztcclxuICAgICAgICAgICAgICAgIHdvcmtmbG93cy5pZCA9IF9XRkluc3RhbmNlLmNvbmZpZy5faWQ7XHJcbiAgICAgICAgICAgICAgICB3b3JrZmxvd3MuaW5zdGFuY2UgPSBfV0ZJbnN0YW5jZS5pbnN0YW5jZS5faWQ7XHJcbiAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnB1c2goZG9jKTtcclxuICAgICAgICAgICAgICAgIGxvb3AubmV4dCgpOyovXHJcblxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHZhciB0b0FkZFByb2Nlc3MgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgX1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9XRkluc3RhbmNlLmluc3RhbmNlLnByb2Nlc3Nlc1tpXS5zdWJQcm9jZXNzZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b0FkZFByb2Nlc3MucHVzaChfV0ZJbnN0YW5jZS5pbnN0YW5jZS5wcm9jZXNzZXNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluc3RhbmNlLnByb2Nlc3NlcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzID0gdG9BZGRQcm9jZXNzO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdG9BZGRTdWJQcm9jZXNzID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXNbaV0uaW5kaWNhdG9ycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvQWRkU3ViUHJvY2Vzcy5wdXNoKF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzID0gW107XHJcbiAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMgPSB0b0FkZFN1YlByb2Nlc3M7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgIHZhciBmYWlsdXJlID0gdXRpbC5zdWNjZXNzKCc3IEdhdGVrZWVwZXIgaW5pdGlhbGlzYXRpb24gZmFpbGVkIHdpdGggaW5pdGlhbGlzZURhdGEgbWVzc2FnZSAnICsgZXJyWzBdLm1lc3NhZ2UsIHt9KTtcclxuICAgICAgICAgICAgICAgIHJlamVjdChmYWlsdXJlKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBpbnN0YW50aWF0ZVNvdXJjZSA9ICdmcm9tRGVmaW5pdGlvbic7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGNvdW50ZXIgPSAwOyBjb3VudGVyIDwgaW5kaWNhdG9ycy5sZW5ndGg7IGNvdW50ZXIrKykge1xyXG4gICAgICAgICAgICB2YXIgaW5kaWNhdG9ySWQgPSBpbmRpY2F0b3JzW2NvdW50ZXJdLl9pZDtcclxuICAgICAgICAgICAgdmFyIGluZGljYXRvck5hbWUgPSB1dGlsLmdldE5hbWUoaW5kaWNhdG9yc1tjb3VudGVyXS5uYW1lLCAnZW4nKTtcclxuICAgICAgICAgICAgdmFyIGluaXRUeXBlID0gJyc7XHJcbiAgICAgICAgICAgIGlmIChzdWJQcm9jZXNzLmluc3RhbmNlVHlwZS5uZXdTZXF1ZW5jZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGluaXRUeXBlID0gJ25ld1NlcXVlbmNlJztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdWJQcm9jZXNzLmluc3RhbmNlVHlwZS5uZXdJbnN0YW5jZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGluaXRUeXBlID0gJ25ld0luc3RhbmNlJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgaWQgPSAnJztcclxuICAgICAgICAgICAgdmFyIGluZGljYXRvckRvYyA9IHt9O1xyXG5cclxuICAgICAgICAgICAgaWYgKGluaXRUeXBlID09ICduZXdJbnN0YW5jZScpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYmFzZVVVSUQgIT0gdW5kZWZpbmVkICYmIGJhc2VVVUlEICE9ICcnICYmIGJhc2VVVUlELmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV4aXN0aW5nVVVJRCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBiYXNlVVVJRCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnXCIgKyBpbmRpY2F0b3JJZCArIFwiJ10vaW5zdGFuY2VzWzFdL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICAgICAgICAgICAgICBpZCA9IGV4aXN0aW5nVVVJRDtcclxuICAgICAgICAgICAgICAgICAgICBpbml0VHlwZSA9ICduZXdTZXF1ZW5jZSc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBwcm9jZXNzZXMgYmxvY2sgdG8gbm90IGRpc3BsYXkgdGhlIG9sZGVyIGluc3RhbmNlIGJhc2VkIG9uIGJhc2VVVUlEXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vVE9ETzogQ2hhbmdlIHJlcXVpcmVkIHRvIG1vdmUgaXNBY3RpdmUgdG8gc3ViUHJvY2VzcyBmaWxlLlxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzcCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBiYXNlVVVJRCArIFwiJ11cIiwgYXBwLlNDT1BFLndvcmtmbG93LCB7fSlbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgc3AuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaW5zdGFudGlhdGUgbmV3IHNlcSB3aXRoIHByZXZpb3VzIGF1dGhvcmlzZWQgZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbnRpYXRlU291cmNlID0gJ2Zyb21BdXRob3Jpc2VkJztcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3ViUHJvY2Vzcy5pc1Byb2ZpbGUgIT0gdW5kZWZpbmVkICYmIHN1YlByb2Nlc3MuaXNQcm9maWxlICYmIChpbmRpY2F0b3JJZCA9PSBQUk9GSUxFX1NFVF9JRCB8fCBhcHAuU0NPUEUuQVBQX0NPTkZJRy5pbmRpY2F0b3JzLmxlbmd0aCA9PSAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZCA9IHByb2ZpbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpbmRpY2F0b3JJZCA9PSBcIm5vZGVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZCA9IGFwcC5wcm9maWxlLnN1YnByb2ZpbGVJZDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZCA9IGluZGljYXRvcklkICsgJy0nICsgZ2VuZXJhdGVVVUlEKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHNwTGFzdFV1aWQgPSBKU09OLnhwYXRoKFwiL2luc3RhbmNlL3Byb2Nlc3Nlc1tpZCBlcSAnXCIgKyBwcm9jZXNzSWQgKyBcIicgYW5kIHN1YlByb2Nlc3Nlcy9pZCBlcSAnXCIgKyBzdWJQcm9jZXNzSWQgKyBcIiddWzFdL3N1YlByb2Nlc3Nlcy91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kSWQgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3BMYXN0VXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnXCIgKyBpbmRpY2F0b3JJZCArIFwiJ10vaW5zdGFuY2VzL3V1aWRcIiwgYXBwLlNDT1BFLndvcmtmbG93LCB7fSlbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHNwTGFzdFV1aWQgPT0gJycgfHwgc3BMYXN0VXVpZCA9PSB1bmRlZmluZWQgfHwgaW5kSWQgPT0gJycgfHwgaW5kSWQgPT0gdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdWJQcm9jZXNzLmlzUHJvZmlsZSAhPSB1bmRlZmluZWQgJiYgc3ViUHJvY2Vzcy5pc1Byb2ZpbGUgJiYgKGluZGljYXRvcklkID09IFBST0ZJTEVfU0VUX0lEIHx8IGFwcC5TQ09QRS5BUFBfQ09ORklHLmluZGljYXRvcnMubGVuZ3RoID09IDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkID0gcHJvZmlsZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGluZGljYXRvcklkID09IFwibm9kZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkID0gYXBwLnByb2ZpbGUuc3VicHJvZmlsZUlkO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkID0gaW5kaWNhdG9ySWQgKyAnLScgKyBnZW5lcmF0ZVVVSUQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWQgPSBpbmRJZDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYmFzZVVVSUQgIT0gdW5kZWZpbmVkICYmIGJhc2VVVUlEICE9ICcnICYmIGJhc2VVVUlELmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiBDaGFuZ2UgcmVxdWlyZWQgdG8gbW92ZSBpc0FjdGl2ZSB0byBzdWJQcm9jZXNzIGZpbGUuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzcCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBiYXNlVVVJRCArIFwiJ11cIiwgYXBwLlNDT1BFLndvcmtmbG93LCB7fSlbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgc3AuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFudGlhdGVTb3VyY2UgPSAnZnJvbUF1dGhvcmlzZWQnO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBUT0RPOiBSZXBsYWNlIHdpdGggdGhlIGdhdGVrZWVwZXIgcHJvbWlzZSBjYWxsLCByZXR1cm4gdGhlIG9iamVjdCwgdXBkYXRlIHRoZSBpbmRpY2F0b3JcclxuICAgICAgICAgICAgLy8gZG9jdW1lbnQgd29ya2Zsb3cgcHJvY2Vzc2VzIGRhdGEgYW5kIHVwZGF0ZSB0aGUgd29ya2Zsb3cgY2xhc3MgaW5kaWNhdG9ycyBhcnJheS5cclxuXHJcbiAgICAgICAgICAgIGZvcm1DcmVhdGVGbihpZCwgaW5pdFR5cGUsIGluZGljYXRvcklkLCAnJywgaW5zdGFudGlhdGVTb3VyY2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gaW5kaWNhdG9yIHNldCBzYXZlZCBzdWNjZXNzZnVsbHkuJywgcmVzdWx0KTtcclxuICAgICAgICAvLyByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBzZXRJbnN0YW5jZVRpdGxlKGFyZ3MpIHtcclxuXHJcbiAgICB2YXIgX1dGSW5zdGFuY2UgPSBhcmdzWzBdIHx8IHt9O1xyXG4gICAgdmFyIHV1aWQgPSBhcmdzWzJdIHx8ICcnO1xyXG4gICAgdmFyIGRhdGEgPSBhcmdzWzRdIHx8IHt9O1xyXG4gICAgdmFyIHRpdGxlID0gZGF0YS5sYWJlbDtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgIHZhciBzdWJQcm9jZXNzSW5zdGFuY2UgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICB2YXIgaW5kaWNhdG9ySW5zdGFuY2VzID0gc3ViUHJvY2Vzc0luc3RhbmNlLmluZGljYXRvcnM7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5kaWNhdG9ySW5zdGFuY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JVVUlEID0gaW5kaWNhdG9ySW5zdGFuY2VzW2ldLmluc3RhbmNlc1swXS51dWlkO1xyXG4gICAgICAgICAgICB2YXIgaW5kaWNhdG9ySW5zdGFuY2UgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbX2lkIGVxICdcIiArIGluZGljYXRvclVVSUQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcbiAgICAgICAgICAgIGluZGljYXRvckluc3RhbmNlLnRpdGxlID0gaW5kaWNhdG9ySW5zdGFuY2VzW2ldLmlkICsgJyAnICsgdGl0bGU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmVzb2x2ZShcIlNldCBUaXRsZSBTdWNjZXNzXCIsIGluZGljYXRvckluc3RhbmNlcyk7XHJcblxyXG4gICAgfSk7XHJcblxyXG59O1xyXG5cclxuZnVuY3Rpb24gZGVsZXRlUHJvZmlsZShhcmdzKSB7XHJcblxyXG4gICAgdmFyIF9XRkluc3RhbmNlID0gYXJnc1swXSB8fCB7fTtcclxuICAgIHZhciBwcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IHtcclxuICAgICAgICAgICAgXCJzb3VyY2VcIjogXCJyZW1vdGVcIixcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwid29ya2VyT2JqZWN0XCIsXHJcbiAgICAgICAgICAgIFwiX2lkXCI6IGdlbmVyYXRlVVVJRCgpLFxyXG4gICAgICAgICAgICBcImNoYW5uZWxzXCI6IFtdLFxyXG4gICAgICAgICAgICBcImNvbW11bml0eUlkXCI6IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpLFxyXG4gICAgICAgICAgICBcImFwcGxpY2F0aW9uSWRcIjogYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQsXHJcbiAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIlwiLFxyXG4gICAgICAgICAgICBcIm1lc3NhZ2VUeXBlXCI6IFwiaW5mb1wiLFxyXG4gICAgICAgICAgICBcImNyZWF0ZWREYXRlVGltZVwiOiBtb21lbnQoKS5mb3JtYXQoKSxcclxuICAgICAgICAgICAgXCJzZW5kZXJVc2VySWRcIjogTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQsXHJcbiAgICAgICAgICAgIFwibm90aWZpY2F0aW9uXCI6IHtcclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicHJvZmlsZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjdGlvblwiOiBcImRlbGV0ZVByb2ZpbGVcIixcclxuICAgICAgICAgICAgICAgIFwicHJvZmlsZUlkXCI6IHByb2ZpbGVJZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHdvcmtlck9iamVjdCk7XHJcbiAgICAgICAgZGFvLnVwc2VydCh3b3JrZXJPYmplY3QpLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIldvcmtlciBPYmplY3Qgc3VibWl0dGVkIGZvciBwcm9maWxlKFwiICsgcHJvZmlsZUlkICsgXCIpIGRlbGV0aW9uLlwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XHJcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgcmVqZWN0KGRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICB9KTtcclxuXHJcblxyXG59O1xyXG5cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVByb2ZpbGUoYXJncykge1xyXG5cclxuXHJcblxyXG4gICAgdmFyIF9XRkluc3RhbmNlID0gYXJnc1sxXSB8fCB7fTtcclxuXHJcbiAgICB2YXIgY29tbXVuaXR5SWQgPSBfV0ZJbnN0YW5jZS5jb21tdW5pdHlJZDtcclxuICAgIHZhciBwcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgbGlicmFyeS5jcmVhdGVQcm9maWxlRG9jdW1lbnRzKGNvbW11bml0eUlkLCBwcm9maWxlSWQpLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gY3JlYXRlZCBzdWNjZXNzZnVsbHkuJywgZGF0YSk7XHJcbiAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcblxyXG4gICAgICAgIH0pLmZhaWwoZnVuY3Rpb24oZXJyKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgIHZhciBmYWlsdXJlID0gdXRpbC5zdWNjZXNzKCdFUlJPUjogUHJvZmlsZSBjcmVhdGlvbiBmYWlsZWQnICsgZXJyWzBdLm1lc3NhZ2UsIHt9KTtcclxuICAgICAgICAgICAgcmVqZWN0KGZhaWx1cmUpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIHNldERyYWZ0KGFyZ3MpIHtcclxuXHJcblxyXG5cclxuICAgIHZhciBfV0ZJbnN0YW5jZSA9IGFyZ3NbMF0gfHwge307XHJcbiAgICB2YXIgY29tbXVuaXR5SWQgPSBfV0ZJbnN0YW5jZS5jb21tdW5pdHlJZDtcclxuICAgIHZhciBwcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xyXG4gICAgdmFyIHV1aWQgPSBhcmdzWzJdIHx8ICcnO1xyXG5cclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgIHZhciBzdWJQcm9jZXNzSW5zdGFuY2UgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICB2YXIgaW5kaWNhdG9ySW5zdGFuY2VzID0gc3ViUHJvY2Vzc0luc3RhbmNlLmluZGljYXRvcnM7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5kaWNhdG9ySW5zdGFuY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JVVUlEID0gaW5kaWNhdG9ySW5zdGFuY2VzW2ldLmluc3RhbmNlc1swXS51dWlkO1xyXG4gICAgICAgICAgICB2YXIgaW5kaWNhdG9ySW5zdGFuY2UgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbX2lkIGVxICdcIiArIGluZGljYXRvclVVSUQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcbiAgICAgICAgICAgIGluZGljYXRvckluc3RhbmNlLmNvbnRyb2wuZHJhZnQgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJlc29sdmUoXCJTZXQgRHJhZnQgU3VjY2Vzc1wiLCBpbmRpY2F0b3JJbnN0YW5jZXMpO1xyXG5cclxuICAgIH0pO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gc2V0VW5EcmFmdChhcmdzKSB7XHJcblxyXG4gICAgdmFyIF9XRkluc3RhbmNlID0gYXJnc1swXSB8fCB7fTtcclxuICAgIHZhciBjb21tdW5pdHlJZCA9IF9XRkluc3RhbmNlLmNvbW11bml0eUlkO1xyXG4gICAgdmFyIHByb2ZpbGVJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XHJcbiAgICB2YXIgdXVpZCA9IGFyZ3NbMl0gfHwgJyc7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICB2YXIgc3ViUHJvY2Vzc0luc3RhbmNlID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcbiAgICAgICAgdmFyIGluZGljYXRvckluc3RhbmNlcyA9IHN1YlByb2Nlc3NJbnN0YW5jZS5pbmRpY2F0b3JzO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluZGljYXRvckluc3RhbmNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgaW5kaWNhdG9yVVVJRCA9IGluZGljYXRvckluc3RhbmNlc1tpXS5pbnN0YW5jZXNbMF0udXVpZDtcclxuICAgICAgICAgICAgdmFyIGluZGljYXRvckluc3RhbmNlID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW19pZCBlcSAnXCIgKyBpbmRpY2F0b3JVVUlEICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG4gICAgICAgICAgICBpbmRpY2F0b3JJbnN0YW5jZS5jb250cm9sLmRyYWZ0ID0gZmFsc2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmVzb2x2ZShcIlNldCBEcmFmdCBTdWNjZXNzXCIsIGluZGljYXRvckluc3RhbmNlcyk7XHJcblxyXG4gICAgfSk7XHJcbn07XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIHNhdmUoaW5kaWNhdG9yKSB7XHJcbiAgICB2YXIgY29tcGxldGVkID0gW107XHJcbiAgICB2YXIgcmVzdWx0ID0ge1xyXG4gICAgICAgIGNvbXBsZXRlOiB0cnVlLFxyXG4gICAgICAgIGRhdGE6IFtdXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGluZGljYXRvciBzZXQgc2F2ZWQgc3VjY2Vzc2Z1bGx5LicsIHJlc3VsdCk7XHJcbiAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gc3VibWl0KGZvcm0pIHtcclxuICAgIHZhciBjb21wbGV0ZWQgPSBbXTtcclxuICAgIHZhciByZXN1bHQgPSB7XHJcbiAgICAgICAgY29tcGxldGU6IHRydWUsXHJcbiAgICAgICAgZGF0YTogW11cclxuICAgIH07XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gc3VibWl0dGVkIHN1Y2Nlc3NmdWxseS4nLCByZXN1bHQpO1xyXG4gICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGF1dGhvcmlzZShmb3JtKSB7XHJcbiAgICB2YXIgY29tcGxldGVkID0gW107XHJcbiAgICB2YXIgcmVzdWx0ID0ge1xyXG4gICAgICAgIGNvbXBsZXRlOiB0cnVlLFxyXG4gICAgICAgIGRhdGE6IFtdXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBwcm9jZXNzSWQgPSBmb3JtWzBdIHx8ICcnO1xyXG5cclxuICAgIHZhciBzdWJQcm9jZXNzID0gZm9ybVsxXSB8fCB7fTtcclxuXHJcbiAgICB2YXIgc3ViUHJvY2Vzc0lkID0gc3ViUHJvY2Vzcy5faWQ7XHJcblxyXG4gICAgdmFyIHByb2Nlc3NTZXEgPSBmb3JtWzJdIHx8ICcnO1xyXG5cclxuICAgIHZhciBzdWJQcm9jZXNzU2VxID0gZm9ybVszXSB8fCAnJztcclxuXHJcbiAgICB2YXIgX1dGSW5zdGFuY2UgPSBmb3JtWzRdIHx8IHt9O1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgdmFyIHN1YlByb2Nlc3NVVUlEID0gSlNPTi54cGF0aChcIi9wcm9jZXNzZXNbaWQgZXEgJ1wiICsgcHJvY2Vzc0lkICsgXCInIGFuZCBzZXEgZXEgJ1wiICsgcHJvY2Vzc1NlcSArIFwiJ10vc3ViUHJvY2Vzc2VzW2lkIGVxICdcIiArIHN1YlByb2Nlc3NJZCArIFwiJyBhbmQgc2VxIGVxICdcIiArIHN1YlByb2Nlc3NTZXEgKyBcIiddL3V1aWRcIiwgX1dGSW5zdGFuY2UuaW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICB2YXIgc3BJbmRpY2F0b3JzID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHN1YlByb2Nlc3NVVUlEICsgXCInXS9pbmRpY2F0b3JzL2luc3RhbmNlcy91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSk7XHJcbiAgICAgICAgdmFyIGl0ZW1zVG9Qcm9jZXNzID0gc3BJbmRpY2F0b3JzLmxlbmd0aDtcclxuICAgICAgICB2YXIgdXBkYXRlZE9iamVjdHNBcnJheSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW1zVG9Qcm9jZXNzOyBpKyspIHtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgZ2F0ZWtlZXBlci5hdXRob3Jpc2Uoc3BJbmRpY2F0b3JzW2ldKS50aGVuKGZ1bmN0aW9uKGF1dGhvcmlzZWRSZXR1cm4pIHtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgZ2F0ZWtlZXBlci5wZXJzaXN0KGF1dGhvcmlzZWRSZXR1cm4pLnRoZW4oZnVuY3Rpb24oc2F2ZWRBcnJheSkge1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHV1aWRTYXZlZEluZGljYXRvciA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgc2F2ZWRBcnJheS5sZW5ndGg7IGMrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNhdmVkQXJyYXlbY10uaWQuZW5kc1dpdGgoJzphcHByb3ZlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dWlkU2F2ZWRJbmRpY2F0b3IgPSBzYXZlZEFycmF5W2NdLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGRhby5nZXQodXVpZFNhdmVkSW5kaWNhdG9yKS5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9XRkluc3RhbmNlLmluZGljYXRvcnMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zVG9Qcm9jZXNzLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbXNUb1Byb2Nlc3MgPT0gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnRm9ybSBhdXRob3Jpc2VkIHN1Y2Nlc3NmdWxseS4nLCB1cGRhdGVkT2JqZWN0c0FycmF5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvdW5kID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yID0gX1dGSW5zdGFuY2UuaW5kaWNhdG9yc1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGljYXRvci5faWQgPT0gZGF0YS5faWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGN1cnJlbnQgaXRlbSBmcm9tIHRoZSBhcnJheSBhbmQgYWRkIHRoZSB1cGRhdGVkIHByb2Nlc3NNb2RlbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNUb1Byb2Nlc3MtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zVG9Qcm9jZXNzID09IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnRm9ybSBhdXRob3Jpc2VkIHN1Y2Nlc3NmdWxseS4nLCB1cGRhdGVkT2JqZWN0c0FycmF5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm91bmQgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnB1c2goZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zVG9Qcm9jZXNzLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zVG9Qcm9jZXNzID09IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGF1dGhvcmlzZWQgc3VjY2Vzc2Z1bGx5LicsIHVwZGF0ZWRPYmplY3RzQXJyYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgaXRlbXNUb1Byb2Nlc3MtLTtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtc1RvUHJvY2VzcyA9PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGF1dGhvcmlzZWQgc3VjY2Vzc2Z1bGx5LicsIHVwZGF0ZWRPYmplY3RzQXJyYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9KTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGNsb3NlKGZvcm0pIHtcclxuICAgIHZhciBjb21wbGV0ZWQgPSBbXTtcclxuICAgIHZhciByZXN1bHQgPSB7XHJcbiAgICAgICAgY29tcGxldGU6IHRydWUsXHJcbiAgICAgICAgZGF0YTogW11cclxuICAgIH07XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gY2xvc2VkIHN1Y2Nlc3NmdWxseS4nLCByZXN1bHQpO1xyXG4gICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcblxyXG5mdW5jdGlvbiB1cGRhdGVJbmRpY2F0b3IoYXJncykge1xyXG5cclxuICAgIHZhciBfV0ZJbnN0YW5jZSA9IGFyZ3NbMF0gfHwge307XHJcbiAgICB2YXIgdXVpZCA9IGFyZ3NbMV0gfHwgJyc7XHJcbiAgICB2YXIgcGF0aCA9IGFyZ3NbMl0gfHwgJyc7XHJcbiAgICB2YXIgZGF0YVZhbHVlID0gYXJnc1szXSB8fCAnJztcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgIHZhciBzdWJQcm9jZXNzSW5zdGFuY2UgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICB2YXIgaW5kaWNhdG9ySW5zdGFuY2VzID0gc3ViUHJvY2Vzc0luc3RhbmNlLmluZGljYXRvcnM7XHJcblxyXG4gICAgICAgIHZhciBzZXRJZCA9IHBhdGguc3BsaXQoXCIuXCIsIDEpWzBdO1xyXG4gICAgICAgIHZhciBpbmRpY2F0b3JVVUlEID0gSlNPTi54cGF0aChcIi8qW2lkIGVxICdcIiArIHNldElkICsgXCInXS9pbnN0YW5jZXMvdXVpZFwiLCBpbmRpY2F0b3JJbnN0YW5jZXMsIHt9KVswXTtcclxuICAgICAgICB2YXIgaW5kT2JqZWN0ID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW19pZCBlcSAnXCIgKyBpbmRpY2F0b3JVVUlEICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG4gICAgICAgIHZhciBleHByID0gJ2luZE9iamVjdC5tb2RlbC5wZW5kaW5nLmRhdGEuJyArIHBhdGggKyAnID0gXCInICsgZGF0YVZhbHVlICsgJ1wiJztcclxuICAgICAgICBldmFsKGV4cHIpO1xyXG4gICAgICAgIHZhciBpdGVtc1RvUHJvY2VzcyA9IDE7XHJcbiAgICAgICAgdmFyIHN0dWZmID0gW107XHJcbiAgICAgICAgdmFyIG9iaiA9IHt9O1xyXG4gICAgICAgIG9iai5tb2RlbCA9IGluZE9iamVjdDtcclxuICAgICAgICBzdHVmZi5wdXNoKG9iaik7XHJcblxyXG4gICAgICAgIC8vLS0tLS0tLS0tLVxyXG4gICAgICAgIGdhdGVrZWVwZXIucGVyc2lzdChzdHVmZikudGhlbihmdW5jdGlvbihzYXZlZEFycmF5KSB7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIHV1aWRTYXZlZEluZGljYXRvciA9ICcnO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IHNhdmVkQXJyYXkubGVuZ3RoOyBjKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICghc2F2ZWRBcnJheVtjXS5pZC5lbmRzV2l0aCgnOmFwcHJvdmVkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dWlkU2F2ZWRJbmRpY2F0b3IgPSBzYXZlZEFycmF5W2NdLmlkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRhby5nZXQodXVpZFNhdmVkSW5kaWNhdG9yKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNUb1Byb2Nlc3MtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zVG9Qcm9jZXNzID09IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnSW5kaWNhdG9yIHVwZGF0ZWQuJywgc3R1ZmYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3VuZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3IgPSBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzW2luZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRpY2F0b3IuX2lkID09IGRhdGEuX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgY3VycmVudCBpdGVtIGZyb20gdGhlIGFycmF5IGFuZCBhZGQgdGhlIHVwZGF0ZWQgcHJvY2Vzc01vZGVsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1RvUHJvY2Vzcy0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1RvUHJvY2VzcyA9PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnSW5kaWNhdG9yIHVwZGF0ZWQuJywgc3R1ZmYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm91bmQgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1RvUHJvY2Vzcy0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zVG9Qcm9jZXNzID09IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0luZGljYXRvciB1cGRhdGVkLicsIHN0dWZmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLmZhaWwoZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG59O1xyXG5cclxuXHJcbmZ1bmN0aW9uIG1hcmtVcGRhdGVJbmRpY2F0b3IoYXJncykge1xyXG5cclxuICAgIHZhciBfV0ZJbnN0YW5jZSA9IGFyZ3NbMF0gfHwge307XHJcbiAgICB2YXIgdXVpZCA9IGFyZ3NbMV0gfHwgJyc7XHJcbiAgICB2YXIgc3RhdHVzID0gYXJnc1syXSB8fCAnJztcclxuICAgIHZhciBpbmRpY2F0b3JTZXRJZCA9IGFyZ3NbM10gfHwgJyc7XHJcblxyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcblxyXG4gICAgICAgIHZhciBpbmRPYmplY3QgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnXCIgKyBpbmRpY2F0b3JTZXRJZCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICBpbmRPYmplY3QubW9kZWwucGVuZGluZy5zdGF0dXMgPSBzdGF0dXM7XHJcblxyXG4gICAgICAgIHZhciBpdGVtc1RvUHJvY2VzcyA9IDE7XHJcbiAgICAgICAgdmFyIHN0dWZmID0gW107XHJcbiAgICAgICAgdmFyIG9iaiA9IHt9O1xyXG4gICAgICAgIG9iai5tb2RlbCA9IGluZE9iamVjdDtcclxuICAgICAgICBzdHVmZi5wdXNoKG9iaik7XHJcblxyXG4gICAgICAgIC8vLS0tLS0tLS0tLVxyXG4gICAgICAgIGdhdGVrZWVwZXIucGVyc2lzdChzdHVmZikudGhlbihmdW5jdGlvbihzYXZlZEFycmF5KSB7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIHV1aWRTYXZlZEluZGljYXRvciA9ICcnO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IHNhdmVkQXJyYXkubGVuZ3RoOyBjKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICghc2F2ZWRBcnJheVtjXS5pZC5lbmRzV2l0aCgnOmFwcHJvdmVkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICB1dWlkU2F2ZWRJbmRpY2F0b3IgPSBzYXZlZEFycmF5W2NdLmlkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRhby5nZXQodXVpZFNhdmVkSW5kaWNhdG9yKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNUb1Byb2Nlc3MtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zVG9Qcm9jZXNzID09IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnSW5kaWNhdG9yIHVwZGF0ZWQuJywgc3R1ZmYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3VuZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3IgPSBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzW2luZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRpY2F0b3IuX2lkID09IGRhdGEuX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgY3VycmVudCBpdGVtIGZyb20gdGhlIGFycmF5IGFuZCBhZGQgdGhlIHVwZGF0ZWQgcHJvY2Vzc01vZGVsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1RvUHJvY2Vzcy0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1RvUHJvY2VzcyA9PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnSW5kaWNhdG9yIHVwZGF0ZWQuJywgc3R1ZmYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm91bmQgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1RvUHJvY2Vzcy0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zVG9Qcm9jZXNzID09IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0luZGljYXRvciB1cGRhdGVkLicsIHN0dWZmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLmZhaWwoZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gICAgY3JlYXRlOiBjcmVhdGUsXHJcbiAgICBzYXZlOiBzYXZlLFxyXG4gICAgc3VibWl0OiBzdWJtaXQsXHJcbiAgICBhdXRob3Jpc2U6IGF1dGhvcmlzZSxcclxuICAgIGNsb3NlOiBjbG9zZSxcclxuICAgIHNldERyYWZ0OiBzZXREcmFmdCxcclxuICAgIHNldFVuRHJhZnQ6IHNldFVuRHJhZnQsXHJcbiAgICBjcmVhdGVQcm9maWxlOiBjcmVhdGVQcm9maWxlLFxyXG4gICAgc2V0SW5zdGFuY2VUaXRsZTogc2V0SW5zdGFuY2VUaXRsZSxcclxuICAgIGRlbGV0ZVByb2ZpbGU6IGRlbGV0ZVByb2ZpbGUsXHJcbiAgICB1cGRhdGVJbmRpY2F0b3I6IHVwZGF0ZUluZGljYXRvcixcclxuICAgIG1hcmtVcGRhdGVJbmRpY2F0b3I6IG1hcmtVcGRhdGVJbmRpY2F0b3JcclxuXHJcbn0iLCIndXNlIHN0cmljdCc7XHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0TGFuZ3VhZ2VNZXNzYWdlKG1lc3NhZ2UpIHtcclxuXHJcbiAgICB2YXIgbGFuZ3VhZ2UgPSBzZXJ2aWNlLmdldExhbmd1YWdlKCk7XHJcbiAgICB2YXIgcmVzID0gZXZhbChcIm1lc3NhZ2UuaTE4bi5cIiArIGxhbmd1YWdlKTtcclxuICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICByZXR1cm4gcmVzO1xyXG5cclxuXHJcbn07XHJcblxyXG5mdW5jdGlvbiBnZXROb2RlVmFsdWUoZGF0YSwgX1dGSW5zdGFuY2UsIHV1aWQpIHtcclxuXHJcbiAgICBpZiAoZGF0YS52YWx1ZSAhPSB1bmRlZmluZWQpIHtcclxuXHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY3VycmVudEluZGljYXRvciAhPSB1bmRlZmluZWQpIHtcclxuXHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuaW5kaWNhdG9yICE9IHVuZGVmaW5lZCkge1xyXG5cclxuICAgICAgICB2YXIgaW5kaWNhdG9yVVVJRCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pbmRpY2F0b3JzW2lkIGVxICdcIiArIGRhdGEuaW5kaWNhdG9yLmluZGljYXRvclNldElkICsgXCInXS9pbnN0YW5jZXMvdXVpZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG4gICAgICAgIHZhciBpbmRPYmplY3QgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbX2lkIGVxICdcIiArIGluZGljYXRvclVVSUQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcbiAgICAgICAgdmFyIHZhbHVlID0gJ2luZE9iamVjdC5tb2RlbC5wZW5kaW5nLmRhdGEuJyArIGRhdGEuaW5kaWNhdG9yLmluZGljYXRvclNldElkICsgJy4nICsgZGF0YS5pbmRpY2F0b3IuZWxlbWVudElkO1xyXG4gICAgICAgIHJldHVybiBldmFsKHZhbHVlKTtcclxuXHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuc3lzdGVtICE9IHVuZGVmaW5lZCkge1xyXG5cclxuICAgIH0gZWxzZSBpZiAoZGF0YS52YXJpYWJsZSAhPSB1bmRlZmluZWQpIHtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxufTtcclxuXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gICAgZ2V0TGFuZ3VhZ2VNZXNzYWdlOiBnZXRMYW5ndWFnZU1lc3NhZ2UsXHJcbiAgICBnZXROb2RlVmFsdWU6IGdldE5vZGVWYWx1ZVxyXG5cclxufSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbGl0eScpO1xyXG5cclxuLyoqXHJcbiAqIFVzZXIgSW50ZXJmYWNlIE1vZHVsZVxyXG4gKlxyXG4gKiBAbW9kdWxlIGxpYi91aVxyXG4gKiBAYXV0aG9yIEJyZW50IEdvcmRvblxyXG4gKiBAdmVyc2lvbiAwLjEuMFxyXG4gKiBAZGVzY3JpcHRpb24gdGVzdCBkZXNjcmlwdGlvblxyXG4gKlxyXG4gKi9cclxuXHJcbiAvKipcclxuICAqIEdldCBhbGwgcHJvY2VzcyBzdWItcHJvY2Vzc2VzIHVzZXIgaW50ZXJmYWNlIGRhdGFcclxuICAqXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gcHJvY2VzcyBpZFxyXG4gICogQHBhcmFtIHtzdHJpbmd9IGxhbmcgLSB0aGUgdXNlciBwcmVmZmVyZWQgbGFuZ2F1Z2VcclxuICAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXHJcbiAgKlxyXG4gICogQGV4YW1wbGUgJydcclxuICAqXHJcbiAgKiBAcmV0dXJuICcnXHJcbiAgKlxyXG4gICovXHJcbiBmdW5jdGlvbiBnZXRQcm9jZXNzKHByb2Nlc3NJZCwgbGFuZywgX1dGSW5zdGFuY2Upe1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHZhciBwcm9jZXNzTW9kZWwgPSBbXTtcclxuICAgICAgdmFyIHByb2Nlc3NJbnN0YW5jZSA9IFtdO1xyXG4gICAgXHRfV0ZJbnN0YW5jZS5pbnN0YW5jZS5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHByb2Nlc3NJdGVtKXtcclxuICAgIFx0XHRpZiAocHJvY2Vzc0l0ZW0uaWQgPT0gcHJvY2Vzc0lkKSB7XHJcbiAgICBcdFx0XHRwcm9jZXNzSW5zdGFuY2UgPSBwcm9jZXNzSXRlbTtcclxuICAgIFx0XHR9XHJcbiAgICBcdH0pXHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKHByb2Nlc3NJbnN0YW5jZS5zdWJQcm9jZXNzZXMubGVuZ3RoKTtcclxuICAgICAgdXRpbC5zeW5jTG9vcChwcm9jZXNzSW5zdGFuY2Uuc3ViUHJvY2Vzc2VzLmxlbmd0aCwgZnVuY3Rpb24obG9vcCl7XHJcbiAgXHRcdFx0dmFyIGNvdW50ZXIgPSBsb29wLml0ZXJhdGlvbigpO1xyXG4gICAgICAgIHZhciBwcm9jZXNzU2VxID0gcHJvY2Vzc0luc3RhbmNlLnNlcTtcclxuICAgICAgICB2YXIgc3ViUHJvY2Vzc0lkID0gcHJvY2Vzc0luc3RhbmNlLnN1YlByb2Nlc3Nlc1tjb3VudGVyXS5pZDtcclxuICAgICAgICB2YXIgc3ViUHJvY2Vzc1NlcSA9IHByb2Nlc3NJbnN0YW5jZS5zdWJQcm9jZXNzZXNbY291bnRlcl0uc2VxO1xyXG4gICAgICAgIGdldFN1YlByb2Nlc3MocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIGxhbmcsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKG1vZGVsKXtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG1vZGVsKTtcclxuICAgICAgICAgIHByb2Nlc3NNb2RlbC5wdXNoKG1vZGVsKTtcclxuICAgICAgICAgIGxvb3AubmV4dCgpO1xyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2cocHJvY2Vzc01vZGVsKTtcclxuICBcdFx0XHR9LCBmdW5jdGlvbihlcnIpe1xyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2cocHJvY2Vzc01vZGVsKTtcclxuICBcdFx0XHRcdGxvb3AuYnJlYWsoKTtcclxuICBcdFx0XHRcdHJlamVjdChlcnIpO1xyXG4gIFx0XHRcdH0pO1xyXG4gIFx0XHR9LCBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHByb2Nlc3NNb2RlbCk7XHJcbiAgXHRcdFx0cmVzb2x2ZShwcm9jZXNzTW9kZWwpO1xyXG4gIFx0XHR9KTtcclxuICAgIH0gY2F0Y2goZXJyKXtcclxuICAgICAgcmVqZWN0KGVycik7XHJcbiAgICB9XHJcbiAgfSlcclxufTtcclxuXHJcbiAvKipcclxuICAqIEdldCBTdWJQcm9jZXNzIHVzZXIgaW50ZXJmYWNlIGRhdGFcclxuICAqXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gcHJvY2VzcyBpZFxyXG4gICogQHBhcmFtIHtudW1iZXJ9IHByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2UgcHJvY2VzcyBzZXFcclxuICAqIEBwYXJhbSB7c3RyaW5nfSBzdWJQcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdWItcHJvY2VzcyBpZFxyXG4gICogQHBhcmFtIHtudW1iZXJ9IHN1YlByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2Ugc3ViLXByb2Nlc3Mgc2VxXHJcbiAgKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxyXG4gICpcclxuICAqIEBleGFtcGxlICcnXHJcbiAgKlxyXG4gICogQHJldHVybiAnJ1xyXG4gICpcclxuICAqL1xyXG5mdW5jdGlvbiBnZXRTdWJQcm9jZXNzKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBsYW5nLCBfV0ZJbnN0YW5jZSl7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgdmFyIG1vZGVsID0ge1xyXG4gICAgICAgIGlkOiAnJyxcclxuICAgICAgICBzZXE6ICcnLFxyXG4gICAgICAgIG5hbWU6ICcnLFxyXG4gICAgICAgIGhlbHA6ICcnLFxyXG4gICAgICAgIGRhdGVzOiAnJyxcclxuICAgICAgICBzdGVwOiAnJ1xyXG4gICAgICB9O1xyXG4gICAgICB2YXIgc3ViUHJvY2VzcyA9IFtdO1xyXG4gICAgXHR2YXIgc3ViUHJvY2Vzc0NvbmYgPSBbXTtcclxuICAgIFx0X1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihwcm9jZXNzSXRlbSl7XHJcbiAgICBcdFx0aWYgKHByb2Nlc3NJdGVtLmlkID09IHByb2Nlc3NJZCAmJiBwcm9jZXNzSXRlbS5zZXEgPT0gcHJvY2Vzc1NlcSkge1xyXG4gICAgXHRcdFx0dmFyIHNwTGVuZ3RoID0gcHJvY2Vzc0l0ZW0uc3ViUHJvY2Vzc2VzLmxlbmd0aDtcclxuICAgIFx0XHRcdHByb2Nlc3NJdGVtLnN1YlByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24oc3ViUHJvY2Vzc0l0ZW0pe1xyXG4gICAgXHRcdFx0XHRpZiAoc3ViUHJvY2Vzc0l0ZW0uaWQgPT0gc3ViUHJvY2Vzc0lkICYmIHN1YlByb2Nlc3NJdGVtLnNlcSA9PSBzdWJQcm9jZXNzU2VxICYmIHN1YlByb2Nlc3NJdGVtLmNvbXBsZXRlID09IGZhbHNlKSB7XHJcbiAgICBcdFx0XHRcdFx0c3ViUHJvY2VzcyA9IHN1YlByb2Nlc3NJdGVtO1xyXG4gICAgXHRcdFx0XHR9XHJcbiAgICBcdFx0XHR9KVxyXG4gICAgXHRcdH1cclxuICAgIFx0fSlcclxuICAgIFx0Ly8gR2V0IHRoZSBjdXJyZW50IHN1YlByb2Nlc3MgY29uZmlndXJhdGlvblxyXG4gICAgXHRfV0ZJbnN0YW5jZS5jb25maWcucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihwcm9jZXNzQ29uZmlnKXtcclxuICAgIFx0XHRpZiAocHJvY2Vzc0NvbmZpZy5faWQgPT0gcHJvY2Vzc0lkKSB7XHJcbiAgICBcdFx0XHRwcm9jZXNzQ29uZmlnLnN1YlByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24oc3ViUHJvY2Vzc0NvbmZpZyl7XHJcbiAgICBcdFx0XHRcdGlmIChzdWJQcm9jZXNzQ29uZmlnLl9pZCA9PSBzdWJQcm9jZXNzSWQpIHtcclxuICAgIFx0XHRcdFx0XHRzdWJQcm9jZXNzQ29uZiA9IHN1YlByb2Nlc3NDb25maWc7XHJcbiAgICBcdFx0XHRcdH1cclxuICAgIFx0XHRcdH0pXHJcbiAgICBcdFx0fVxyXG4gICAgXHR9KVxyXG4gICAgICAvLyBVcGRhdGUgdGhlIG1vZGVsXHJcbiAgICAgIG1vZGVsLmlkID0gc3ViUHJvY2Vzc0NvbmYuX2lkO1xyXG4gICAgICBtb2RlbC5zZXEgPSBzdWJQcm9jZXNzLnNlcTtcclxuICAgICAgbW9kZWwubmFtZSA9IHV0aWwuZ2V0TmFtZShzdWJQcm9jZXNzQ29uZi5uYW1lLCBsYW5nKTtcclxuICAgICAgbW9kZWwuaGVscCA9IHV0aWwuZ2V0TmFtZShzdWJQcm9jZXNzQ29uZi5oZWxwLCBsYW5nKTtcclxuICAgICAgbW9kZWwuZGF0ZXMgPSBzdWJQcm9jZXNzLmRhdGVzO1xyXG4gICAgICBtb2RlbC5zdGVwID0gc3ViUHJvY2Vzcy5zdGVwO1xyXG4gICAgICByZXNvbHZlKG1vZGVsKTtcclxuICAgIH0gY2F0Y2goZXJyKSB7XHJcbiAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgfVxyXG4gIH0pXHJcbn07XHJcblxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBwcmVwYXJlTm90aWZpY2F0aW9uU2NyZWVuKCl7XHJcblxyXG4gIFwiXCJcclxufTtcclxuXHJcbiBtb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgZ2V0UHJvY2VzczogZ2V0UHJvY2Vzc1xyXG5cclxuIH1cclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuXHJcbmZ1bmN0aW9uIGdldCgpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgfSk7XHJcblxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gICAgZ2V0OiBnZXRcclxuXHJcbn0iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWxpdHknKTtcclxudmFyIGFjdGlvbnNNb2R1bGUgPSByZXF1aXJlKCcuL2FjdGlvbnMnKTtcclxudmFyIGhlbHBlciA9IHJlcXVpcmUoJy4vaGVscGVyJyk7XHJcbnZhciBmb3JtID0gcmVxdWlyZSgnLi9mb3JtJyk7XHJcblxyXG4vKipcclxuICogUHJvY2VzcyBNb2R1bGVcclxuICpcclxuICogQG1vZHVsZSBsaWIvcHJvY2Vzc1xyXG4gKiBAYXV0aG9yIEJyZW50IEdvcmRvblxyXG4gKiBAdmVyc2lvbiAwLjEuMFxyXG4gKiBAZGVzY3JpcHRpb24gdGVzdCBkZXNjcmlwdGlvblxyXG4gKlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBDb3VudCBhbiBhcnJheSBvZiBpdGVtc1xyXG4gKlxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgLSB0aGUgYXJyYXkgZGF0YVxyXG4gKlxyXG4gKiBAZXhhbXBsZSAnJ1xyXG4gKlxyXG4gKiBAcmV0dXJuICcnXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiBjb3VudChhcnIpIHtcclxuICAgIGlmIChhcnIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldHVybiBhcnIubGVuZ3RoO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbn07XHJcblxyXG4vKipcclxuICogUHJvY2VzcyBwcmUtcmVxdWlzaXRlc1xyXG4gKlxyXG4gKiBAcGFyYW0ge29iamVjdH0gcHJlcmVxdWlzaXRlcyAtIHRoZSBwcmUtcmVxdWlzaXRlcyBjb25maWcgZGF0YVxyXG4gKlxyXG4gKiBAZXhhbXBsZSAnJ1xyXG4gKlxyXG4gKiBAcmV0dXJuICcnXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiBwcmVSZXF1aXNpdGVzKHByZXJlcXVpc2l0ZXMsIF9XRkluc3RhbmNlKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgLy8gVW5jb21tZW50IGJlbG93IHNlY3Rpb24gd2hlbiByZWFkeSB0byBpbXBsZW1lbnRcclxuICAgICAgICB2YXIgY29tcGxldGVkID0gW107XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdXRpbC5zeW5jTG9vcChwcmVyZXF1aXNpdGVzLmxlbmd0aCwgZnVuY3Rpb24obG9vcCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvdW50ZXIgPSBsb29wLml0ZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgcHJlUmVxdWlzaXRlKHByZXJlcXVpc2l0ZXNbY291bnRlcl0sIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBhbGwgcHJlLXJlcXVpc2l0ZXMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS5cclxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQucHVzaCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBsb29wLm5leHQoKTtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlZC5wdXNoKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBsb29wLmJyZWFrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29tcGxldGVkLmV2ZXJ5KEJvb2xlYW4pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1ByZS1yZXF1aXNpdGVzIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywge30pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGUHJlUmVxdWlzaXRlRXJyb3InLCAnTm90IGFsbCBwcmUtcmVxdWlzaXRlcyBwYXNzZWQuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUHJvY2VzcyBwcmUtcmVxdWlzaXRlLCBleGVjdXRlIHRoZSBwcmUtcmVxdWlzaXRlIGNvbmRpdGlvbi5cclxuICpcclxuICogQHBhcmFtIHtvYmplY3R9IHByZXJlcXVpc2l0ZSAtIHRoZSBwcmUtcmVxdWlzaXRlIGNvbmZpZyBkYXRhXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxyXG4gKlxyXG4gKiBAZXhhbXBsZVxyXG4gKiBQcm9jZXNzLnByZVJlcXVpc2l0ZShjb25maWcsIGNvdW50ZXIsIGluc3RhbmNlLCBkb2MpO1xyXG4gKlxyXG4gKiBAcmV0dXJuICcnXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiBwcmVSZXF1aXNpdGUocHJlcmVxdWlzaXRlLCBfV0ZJbnN0YW5jZSkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICB2YXIgc3ViamVjdENvdW50ID0gJyc7XHJcblxyXG4gICAgICAgIGlmIChwcmVyZXF1aXNpdGUuY2hlY2subnVtYmVyUHJvY2Vzc0luc3RhbmNlcyAhPSB1bmRlZmluZWQpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBudW1iZXJQcm9jZXNzSW5zdGFuY2VzID0gcHJlcmVxdWlzaXRlLmNoZWNrLm51bWJlclByb2Nlc3NJbnN0YW5jZXM7XHJcbiAgICAgICAgICAgIHZhciBfZmlsdGVyT3BlcmF0b3IgPSBudW1iZXJQcm9jZXNzSW5zdGFuY2VzLm9wZXJhdG9yO1xyXG4gICAgICAgICAgICB2YXIgeHBhdGhPcGVyYXRvciA9ICcnO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKF9maWx0ZXJPcGVyYXRvcikge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnZ3JlYXRlclRoYW4nOlxyXG4gICAgICAgICAgICAgICAgICAgIHhwYXRoT3BlcmF0b3IgPSAnZ3QnO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnbGVzc1RoYW4nOlxyXG4gICAgICAgICAgICAgICAgICAgIHhwYXRoT3BlcmF0b3IgPSAnbHQnO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnZ3JlYXRlclRoYW5FcXVhbCc6XHJcbiAgICAgICAgICAgICAgICAgICAgeHBhdGhPcGVyYXRvciA9ICdnZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdsZXNzVGhhbkVxdWFsJzpcclxuICAgICAgICAgICAgICAgICAgICB4cGF0aE9wZXJhdG9yID0gJ2xlJztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2VxdWFsVG8nOlxyXG4gICAgICAgICAgICAgICAgICAgIHhwYXRoT3BlcmF0b3IgPSAnZXEnO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnbm90RXF1YWxUbyc6XHJcbiAgICAgICAgICAgICAgICAgICAgeHBhdGhPcGVyYXRvciA9ICduZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBfc3VicHJvY2Vzc0lkID0gbnVtYmVyUHJvY2Vzc0luc3RhbmNlcy5zdWJQcm9jZXNzSWQ7XHJcbiAgICAgICAgICAgIHZhciBfZmlsdGVyRWxlbWVudCA9IFwic3RlcC9zdGF0dXNcIjtcclxuICAgICAgICAgICAgdmFyIF9maWx0ZXJWYWx1ZSA9IG51bWJlclByb2Nlc3NJbnN0YW5jZXMudHlwZTtcclxuICAgICAgICAgICAgdmFyIGlubmVyWHBhdGggPSBcIi9cIiArIF9maWx0ZXJFbGVtZW50ICsgXCJbLiBlcSAnXCIgKyBfZmlsdGVyVmFsdWUgKyBcIiddXCI7XHJcbiAgICAgICAgICAgIHZhciBmdWxsUGF0aCA9IFwiY291bnQoL3N1YnByb2Nlc3Nlc1tpZCBlcSAnXCIgKyBfc3VicHJvY2Vzc0lkICsgXCInXVwiICsgaW5uZXJYcGF0aCArIFwiKVwiO1xyXG4gICAgICAgICAgICBzdWJqZWN0Q291bnQgPSBKU09OLnhwYXRoKGZ1bGxQYXRoLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKHByZXJlcXVpc2l0ZS5jaGVjay52YXJpYWJsZUNvbmZpcm0gIT0gdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRlByZVJlcXVpc2l0ZUVycm9yJywgJ1ByZS1yZXF1aXNpdGUgdHlwZSBub3QgZGVmaW5lZC4nKTtcclxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgY29tcGFyZSA9ICcnO1xyXG5cclxuICAgICAgICBpZiAocHJlcmVxdWlzaXRlLmNoZWNrLm51bWJlclByb2Nlc3NJbnN0YW5jZXMpIHtcclxuICAgICAgICAgICAgY29tcGFyZSA9IHV0aWwuY29tcGFyZShzdWJqZWN0Q291bnQsIHByZXJlcXVpc2l0ZS5jaGVjay5udW1iZXJQcm9jZXNzSW5zdGFuY2VzLm9wZXJhdG9yLCBwYXJzZUludChwcmVyZXF1aXNpdGUuY2hlY2subnVtYmVyUHJvY2Vzc0luc3RhbmNlcy5jb3VudCkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocHJlcmVxdWlzaXRlLmNoZWNrLnZhcmlhYmxlQ29uZmlybSkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjb21wYXJlKSB7XHJcbiAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdQcmUtcmVxdWlzaXRlcyBwYXNzZWQuJywge30pO1xyXG4gICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGhlbHBlci5nZXRMYW5ndWFnZU1lc3NhZ2UocHJlcmVxdWlzaXRlLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRlByZVJlcXVpc2l0ZUVycm9yJywgbWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFByb2Nlc3MgcHJlLWFjdGlvbnNzXHJcbiAqXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBwcmVBY3Rpb25zIC0gdGhlIHByZS1hY3Rpb25zIGNvbmZpZyBkYXRhXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXHJcbiAqXHJcbiAqIEBleGFtcGxlICcnXHJcbiAqXHJcbiAqIEByZXR1cm4gJydcclxuICpcclxuICovXHJcbmZ1bmN0aW9uIHByZUFjdGlvbnMocHJlQWN0aW9ucywgX1dGSW5zdGFuY2UpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICB2YXIgY29tcGxldGVkID0gW107XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdXRpbC5zeW5jTG9vcChwcmVBY3Rpb25zLmxlbmd0aCwgZnVuY3Rpb24obG9vcCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvdW50ZXIgPSBsb29wLml0ZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uKHByZUFjdGlvbnNbY291bnRlcl0sIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBhbGwgcHJlLXJlcXVpc2l0ZXMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS5cclxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQucHVzaCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBsb29wLm5leHQoKTtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlZC5wdXNoKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBsb29wLmJyZWFrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29tcGxldGVkLmV2ZXJ5KEJvb2xlYW4pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1ByZS1hY3Rpb25zIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywge30pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGUHJlUmVxdWlzaXRlRXJyb3InLCAnTm90IGFsbCBwcmUtYWN0aW9ucyBwYXNzZWQuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogV29ya2Zsb3cgZ2V0IHN1Yi1wcm9jZXNzIGRhdGEuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIHRoZSBzdWJQcm9jZXNzIGNvbmZpZyBpZFxyXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxyXG4gKlxyXG4gKiBAZXhhbXBsZSBcIlwiXHJcbiAqXHJcbiAqIEByZXR1cm4gXCJcIlxyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0U3ViUHJvY2VzcyhpZCwgX1dGSW5zdGFuY2UpIHtcclxuICAgIGlmIChfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHN1YlByb2Nlc3MpIHtcclxuICAgICAgICAgICAgaWYgKHN1YlByb2Nlc3MuaWQgPT0gaWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdWJQcm9jZXNzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufTtcclxuXHJcbi8qKlxyXG4gKiBQcm9jZXNzIHN1Yi1wcm9jZXNzXHJcbiAqXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBwcm9jZXNzIC0gdGhlIGN1cnJlbnQgcHJvY2VzcyBpZCBhbmQgc2VxXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBzdWJQcm9jZXNzIC0gdGhlIHN1Yi1wcm9jZXNzIGlkIGFuZCBzZXFcclxuICogQHBhcmFtIHtvYmplY3R9IGRhdGEgLSB0aGUgdXNlciBpbnB1dCBkYXRhXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXHJcbiAqXHJcbiAqIEBleGFtcGxlICcnXHJcbiAqXHJcbiAqIEByZXR1cm4gJydcclxuICpcclxuICovXHJcbmZ1bmN0aW9uIHN1YlByb2Nlc3MocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIGRhdGEsIF9XRkluc3RhbmNlKSB7XHJcbiAgICAvLyBHZXQgdGhlIGN1cnJlbnQgcHJvY2VzcyBzdWJQcm9jZXNzIGluc3RhbmNlXHJcbiAgICAvLyB2YXIgc3ViUHJvY2Vzc1NlcSA9IDE7XHJcbiAgICB2YXIgc3ViUHJvY2VzcyA9IFtdO1xyXG4gICAgdmFyIHByb2Nlc3NDb25mID0gW107XHJcbiAgICB2YXIgc3ViUHJvY2Vzc0NvbmYgPSBbXTtcclxuICAgIF9XRkluc3RhbmNlLmluc3RhbmNlLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqUHJvY2Vzcykge1xyXG4gICAgICAgIGlmIChvYmpQcm9jZXNzLmlkID09IHByb2Nlc3NJZCAmJiBvYmpQcm9jZXNzLnNlcSA9PSBwcm9jZXNzU2VxKSB7XHJcbiAgICAgICAgICAgIHZhciBzcExlbmd0aCA9IG9ialByb2Nlc3Muc3ViUHJvY2Vzc2VzLmxlbmd0aDtcclxuICAgICAgICAgICAgb2JqUHJvY2Vzcy5zdWJQcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKG9ialN1YlByb2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmpTdWJQcm9jZXNzLmlkID09IHN1YlByb2Nlc3NJZCAmJiBvYmpTdWJQcm9jZXNzLnNlcSA9PSBzdWJQcm9jZXNzU2VxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHV1aWQgPSBvYmpTdWJQcm9jZXNzLnV1aWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihzdWJQcm9jZXNzSXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3ViUHJvY2Vzc0l0ZW0uX2lkID09IHV1aWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3MgPSBzdWJQcm9jZXNzSXRlbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcbiAgICAvLyBHZXQgdGhlIGN1cnJlbnQgc3ViUHJvY2VzcyBjb25maWd1cmF0aW9uXHJcbiAgICBfV0ZJbnN0YW5jZS5jb25maWcucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihwcm9jZXNzQ29uZmlnKSB7XHJcbiAgICAgICAgaWYgKHByb2Nlc3NDb25maWcuX2lkID09IHByb2Nlc3NJZCkge1xyXG4gICAgICAgICAgICBwcm9jZXNzQ29uZiA9IHByb2Nlc3NDb25maWc7XHJcbiAgICAgICAgICAgIHByb2Nlc3NDb25maWcuc3ViUHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihzdWJQcm9jZXNzQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3ViUHJvY2Vzc0NvbmZpZy5faWQgPT0gc3ViUHJvY2Vzc0lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc0NvbmYgPSBzdWJQcm9jZXNzQ29uZmlnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcbiAgICAvLyBpZiAoc3ViUHJvY2Vzcy5sZW5ndGggIT09IDApIHtcclxuICAgIC8vIFx0c3ViUHJvY2Vzc1NlcSA9IHN1YlByb2Nlc3MubGVuZ3RoICsgMTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBUaGUgZGVmYXVsdCBzdWJQcm9jZXNzIG1vZGVsXHJcblxyXG4gICAgLy9UT0RPOiBDaGFuZ2UgcmVxdWlyZWQgdG8gbW92ZSBpc0FjdGl2ZSB0byBzdWJQcm9jZXNzIGZpbGUuSGVyZVxyXG5cclxuICAgIHZhciBncm91cEtleSA9ICcnO1xyXG4gICAgdmFyIGJhc2VVVUlEID0gZGF0YS5iYXNlVVVJRDtcclxuICAgIGlmIChiYXNlVVVJRCAhPSB1bmRlZmluZWQgJiYgYmFzZVVVSUQgIT0gJycgJiYgYmFzZVVVSUQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHZhciBwcmV2aW91c09iamVjdCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBiYXNlVVVJRCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICBncm91cEtleSA9IHByZXZpb3VzT2JqZWN0Lmdyb3VwS2V5O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBncm91cEtleSA9IGdlbmVyYXRlVVVJRCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBzdWJQcm9jZXNzT2JqZWN0SWQgPSBnZW5lcmF0ZVVVSUQoKTtcclxuICAgIHZhciBtb2RlbCA9IHtcclxuICAgICAgICBfaWQ6IHN1YlByb2Nlc3NPYmplY3RJZCxcclxuICAgICAgICBpZDogc3ViUHJvY2Vzc0lkLFxyXG4gICAgICAgIHR5cGU6ICd3b3JrZmxvd0luc3RhbmNlU3ViUHJvY2VzcycsXHJcbiAgICAgICAgc2VxOiBzdWJQcm9jZXNzU2VxLFxyXG4gICAgICAgIGluaXRpYXRlZDogZmFsc2UsXHJcbiAgICAgICAgZGF0ZXM6IHtcclxuICAgICAgICAgICAgY3JlYXRlZDogJycsXHJcbiAgICAgICAgICAgIHZhbGlkOiAnJyxcclxuICAgICAgICAgICAgZHVlOiAnJyxcclxuICAgICAgICAgICAgY2xvc2VkOiAnJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcGxldGU6IGZhbHNlLFxyXG4gICAgICAgIGluZGljYXRvcnM6IFtdLFxyXG4gICAgICAgIHN0ZXA6IHt9LFxyXG4gICAgICAgIGFjdGl2ZTogdHJ1ZSxcclxuICAgICAgICBncm91cEtleTogZ3JvdXBLZXksXHJcbiAgICAgICAgY2hhbm5lbHM6IFtcclxuICAgICAgICAgICAgXCJjb21tdW5pdHlfXCIgKyBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKSxcclxuICAgICAgICAgICAgXCJwcm9maWxlX1wiICsgYXBwLlNDT1BFLnByb2ZpbGVJZCxcclxuICAgICAgICAgICAgXCJhcHBsaWNhdGlvbl9cIiArIGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkLFxyXG4gICAgICAgICAgICBcImNvbW11bml0eV9cIiArIGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpICsgXCJfYXBwbGljYXRpb25fXCIgKyBhcHAuU0NPUEUuYXBwbGljYXRpb25JZFxyXG4gICAgICAgIF1cclxuICAgIH07XHJcblxyXG4gICAgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzLnB1c2gobW9kZWwpO1xyXG4gICAgLy8gUmV0dXJuIGEgcHJvbWlzZVxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIC8vIENhdGNoIGFsbCB1bmNhdWdodCBlcnJvcnNcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyAxLiBQcm9jZXNzIHRoZSBwcmUtYWN0aW9uc1xyXG4gICAgICAgICAgICB2YXIgcHJlQWN0aW9uc0NvbmYgPSBwcm9jZXNzQ29uZi5wcmVBY3Rpb25zO1xyXG4gICAgICAgICAgICBwcmVBY3Rpb25zKHByZUFjdGlvbnNDb25mLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIC8vIDIuIFByb2Nlc3MgdGhlIHByZS1yZXF1aXNpdGVzXHJcbiAgICAgICAgICAgICAgICB2YXIgcHJlcmVxdWlzaXRlQ29uZiA9IHByb2Nlc3NDb25mLnByZXJlcXVpc2l0ZXM7XHJcbiAgICAgICAgICAgICAgICBwcmVSZXF1aXNpdGVzKHByZXJlcXVpc2l0ZUNvbmYsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIDMuIEluaXRpYXRlIHRoZSBzdWJQcm9jZXNzXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluaXRpYXRlQ29uZiA9IHN1YlByb2Nlc3NDb25mLmluaXRpYXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYXRlKGluaXRpYXRlQ29uZiwgc3ViUHJvY2VzcywgZGF0YSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9VcGRhdGUgdGhlIHN1YlByb2Nlc3MgbW9kZWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuaW5pdGlhdGVkID0gcmVzdWx0LmRhdGEuaW5pdGlhdGVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5kYXRlcyA9IHJlc3VsdC5kYXRhLmRhdGVzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBFeGVjdXRlIHRoZSBmaXJzdCBzdGVwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGVwSWQgPSBzdWJQcm9jZXNzQ29uZi5zdGVwc1swXS5faWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0cmFuc2l0aW9uSWQgPSBzdWJQcm9jZXNzQ29uZi5zdGVwc1swXS50cmFuc2l0aW9uWzBdLl9pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0ZXBTZXEgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdGVwSWQsIHN0ZXBTZXEsIGRhdGEsIF9XRkluc3RhbmNlLCBzdWJQcm9jZXNzT2JqZWN0SWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuc3RlcCA9IHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgaW5kaWNhdG9yIHNlY3Rpb25zIG9mIHRoZSBzdWJQcm9jZXNzXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGljYXRvcnMoc3ViUHJvY2Vzc0NvbmYuaW5kaWNhdG9ycywgX1dGSW5zdGFuY2UsIG1vZGVsLl9pZCkudGhlbihmdW5jdGlvbihyZXN1bHQxKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5pbmRpY2F0b3JzID0gcmVzdWx0MS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBFeGVjdXRlIHRoZSB0cmFuc2l0aW9ucywgaWYgYXV0b1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBvc3RBY3Rpb25zQ29uZiA9IHByb2Nlc3NDb25mLnBvc3RBY3Rpb25zO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3N0QWN0aW9ucyhwb3N0QWN0aW9uc0NvbmYsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MocmVzdWx0Lm1lc3NhZ2UsIG1vZGVsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMgPSBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEob2JqLl9pZCA9PSBzdWJQcm9jZXNzT2JqZWN0SWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLnN1YnByb2Nlc3NlcyA9IF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhKG9iai5faWQgPT0gc3ViUHJvY2Vzc09iamVjdElkKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzID0gX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIShvYmouX2lkID09IHN1YlByb2Nlc3NPYmplY3RJZCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUHJvY2VzcyBpbml0aWF0ZVxyXG4gKlxyXG4gKiBAcGFyYW0ge29iamVjdH0gaW5pdGlhdGUgLSB0aGUgaW5pdGlhdGUgY29uZmlnIGRhdGFcclxuICogQHBhcmFtIHtvYmplY3R9IGRhdGEgLSB0aGUgdXNlciBpbnB1dCBkYXRhXHJcbiAqXHJcbiAqIEBleGFtcGxlICcnXHJcbiAqXHJcbiAqIEByZXR1cm4gJydcclxuICpcclxuICovXHJcbmZ1bmN0aW9uIGluaXRpYXRlKGluaXRpYXRlLCBzdWJQcm9jZXNzLCBkYXRhKSB7XHJcbiAgICB2YXIgY29tcGxldGVkID0gW107XHJcbiAgICB2YXIgcmVzdWx0ID0ge1xyXG4gICAgICAgIGluaXRpYXRlZDogZmFsc2UsXHJcbiAgICAgICAgZGF0ZXM6IHtcclxuICAgICAgICAgICAgY3JlYXRlZDogJycsXHJcbiAgICAgICAgICAgIHZhbGlkOiAnJyxcclxuICAgICAgICAgICAgZHVlOiAnJyxcclxuICAgICAgICAgICAgY2xvc2VkOiAnJ1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKGluaXRpYXRlLnVzZXIgIT0gdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgcmVzdWx0LmRhdGVzLmNyZWF0ZWQgPSBkYXRhLmNyZWF0ZWREYXRlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpbml0aWF0ZS51c2VyLnZhbGlkRGF0ZS5fdHlwZSA9PSAndXNlclNlbGVjdGVkJyB8fCBpbml0aWF0ZS51c2VyLnZhbGlkRGF0ZS5fdHlwZSA9PSAnYXV0b1NlbGVjdGVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnZhbGlkRGF0ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5kYXRlcy52YWxpZCA9IGRhdGEudmFsaWREYXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwud2FybignV0ZJbml0aWF0ZUVycm9yJywgJ05vIHZhbGlkIGRhdGUgcGFzc2VkIGluIC0ge2RhdGEudmFsaWREYXRlfScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGluaXRpYXRlLnVzZXIuZHVlRGF0ZS5fdHlwZSA9PSAndXNlclNlbGVjdGVkJyB8fCBpbml0aWF0ZS51c2VyLmR1ZURhdGUuX3R5cGUgPT0gJ2F1dG9TZWxlY3RlZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5kdWVEYXRlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmRhdGVzLmR1ZSA9IGRhdGEuZHVlRGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlsLndhcm4oJ1dGSW5pdGlhdGVFcnJvcicsICdObyBkdWUgZGF0ZSBwYXNzZWQgaW4gLSB7ZGF0YS5kdWVEYXRlfScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmVzdWx0LmluaXRpYXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnU3ViLVByb2Nlc3MgaW5pdGlhdGUgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5pdGlhdGUuYXV0byAhPSB1bmRlZmluZWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgcmVzdWx0LmRhdGVzLmNyZWF0ZWQgPSBkYXRhLmNyZWF0ZWREYXRlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpbml0aWF0ZS5kYXRlcy52YWxpZC5fdHlwZSA9PSAndXNlclNlbGVjdGVkJyB8fCBpbml0aWF0ZS5kYXRlcy52YWxpZC5fdHlwZSA9PSAnYXV0b1NlbGVjdGVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnZhbGlkRGF0ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5kYXRlcy52YWxpZCA9IGRhdGEudmFsaWREYXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwud2FybignV0ZJbml0aWF0ZUVycm9yJywgJ05vIHZhbGlkIGRhdGUgcGFzc2VkIGluIC0ge2RhdGEudmFsaWREYXRlfScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGluaXRpYXRlLmRhdGVzLmR1ZS5fdHlwZSA9PSAndXNlclNlbGVjdGVkJyB8fCBpbml0aWF0ZS5kYXRlcy5kdWUuX3R5cGUgPT0gJ2F1dG9TZWxlY3RlZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5kdWVEYXRlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmRhdGVzLmR1ZSA9IGRhdGEuZHVlRGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlsLndhcm4oJ1dGSW5pdGlhdGVFcnJvcicsICdObyBkdWUgZGF0ZSBwYXNzZWQgaW4gLSB7ZGF0YS5kdWVEYXRlfScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmVzdWx0LmluaXRpYXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnU3ViLVByb2Nlc3MgaW5pdGlhdGUgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTsqL1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRkluaXRpYXRlRXJyb3InLCAnSW5pdGlhdGUgdHlwZTogJyArIGluaXRpYXRlLl90eXBlICsgJyBub3QgZGVmaW5lZC4nKTtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHN1YlByb2Nlc3MuY29tcGxldGUgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGluaXQoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCFzdWJQcm9jZXNzLmNvbXBsZXRlKSB7XHJcbiAgICAgICAgICAgIGlmIChpbml0aWF0ZS5wYXJhbGxlbEluc3RhbmNlcykge1xyXG4gICAgICAgICAgICAgICAgaW5pdCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZJbml0aWF0ZUVycm9yJywgJ1N1Yi1wcm9jZXNzOiAnICsgc3ViUHJvY2Vzcy5pZCArICcgc3RpbGwgYWN0aXZlIGFuZCBwYXJhbGxlbCBpbnN0YW5jZXMgYXJlIG5vdCBhbGxvd2VkLicpO1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUHJvY2VzcyBzdGVwXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9jZXNzSWQgLSB0aGUgY3VycmVudCBwcm9jZXNzIGlkXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdWJQcm9jZXNzSWQgLSB0aGUgY3VycmVudCBzdWItcHJvY2VzcyBpZFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RlcElkIC0gdGhlIGN1cnJlbnQgc3ViLXByb2Nlc3Mgc3RlcCBpZFxyXG4gKiBAcGFyYW0ge251bWJlcn0gc3RlcFNlcSAtIHRoZSBjdXJyZW50IHN1Yi1wcm9jZXNzIHN0ZXAgaW5zdGFuY2UgY291bnRlciAvIHNlcXVlbmNlXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIC0gdGhlIHVzZXIgaW5wdXQgZGF0YVxyXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCBfV0ZJbnN0YW5jZSBjb25zdHJ1Y3RvciBpbnN0YW5jZVxyXG4gKlxyXG4gKiBAZXhhbXBsZSAnJ1xyXG4gKlxyXG4gKiBAcmV0dXJuICcnXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiBzdGVwKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdGVwSWQsIHN0ZXBTZXEsIGRhdGEsIF9XRkluc3RhbmNlLCBzcHV1aWQpIHtcclxuXHJcbiAgICAvLyBEZWZhdWx0IHN0ZXAgbW9kZWxcclxuICAgIHZhciBtb2RlbCA9IHtcclxuICAgICAgICBpZDogJycsXHJcbiAgICAgICAgc2VxOiAnJyxcclxuICAgICAgICBzdGF0dXM6ICcnLFxyXG4gICAgICAgIG1lc3NhZ2U6ICcnLFxyXG4gICAgICAgIGFzc2lnbmVkVG86IHtcclxuICAgICAgICAgICAgdXNlcklkOiAnJyxcclxuICAgICAgICAgICAgbmFtZTogJydcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFzc2lnbm1lbnQ6IHt9LFxyXG4gICAgICAgIGNvbW1lbnQ6ICcnXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBzdWJQcm9jZXNzID0ge307XHJcblxyXG4gICAgdmFyIHV1aWQgPSAnJztcclxuICAgIHZhciBpbnN0U3ViUHJvY2VzcztcclxuICAgIHZhciBzdGVwID0ge307XHJcblxyXG4gICAgdmFyIHRyYW5zaXRpb25JZCA9ICcnO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vR2V0IHRoZSBjdXJyZW50IHN1YlByb2Nlc3MgaW5zdGFuY2UgZGF0YVxyXG5cclxuICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmpQcm9jZXNzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG9ialByb2Nlc3MuaWQgPT0gcHJvY2Vzc0lkICYmIG9ialByb2Nlc3Muc2VxID09IHByb2Nlc3NTZXEpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmpQcm9jZXNzLnN1YlByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqU3ViUHJvY2Vzcykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9ialN1YlByb2Nlc3MuaWQgPT0gc3ViUHJvY2Vzc0lkICYmIG9ialN1YlByb2Nlc3Muc2VxID09IHN1YlByb2Nlc3NTZXEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV1aWQgPSBvYmpTdWJQcm9jZXNzLnV1aWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24oc3ViUHJvY2Vzc0l0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdWJQcm9jZXNzSXRlbS5faWQgPT0gdXVpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluc3RTdWJQcm9jZXNzID0gc3ViUHJvY2Vzc0l0ZW07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBfV0ZJbnN0YW5jZS5jb25maWcucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmpQcm9jZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqUHJvY2Vzcy5faWQgPT0gcHJvY2Vzc0lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqUHJvY2Vzcy5zdWJQcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKG9ialN1YlByb2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9ialN1YlByb2Nlc3MuX2lkID09IHN1YlByb2Nlc3NJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2VzcyA9IG9ialN1YlByb2Nlc3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmpTdWJQcm9jZXNzLnN0ZXBzLmZpbHRlcihmdW5jdGlvbihvYmpTdGVwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9ialN0ZXAuX2lkID09IHN0ZXBJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwID0gb2JqU3RlcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgc3ViLXByb2Nlc3Mgc3RlcCBkYXRhXHJcbiAgICAgICAgICAgIG1vZGVsLmlkID0gc3RlcElkO1xyXG4gICAgICAgICAgICBtb2RlbC5zZXEgPSBzdGVwU2VxO1xyXG5cclxuICAgICAgICAgICAgdmFyIGluc3RhbmNlU3RhdHVzID0gJyc7XHJcbiAgICAgICAgICAgIGlmIChzdGVwLnNldEluc3RhbmNlU3RhdHVzVG8uTm90U3RhcnRlZCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlU3RhdHVzID0gXCJOb3RTdGFydGVkXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RlcC5zZXRJbnN0YW5jZVN0YXR1c1RvLkNyZWF0ZWQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVN0YXR1cyA9IFwiQ3JlYXRlZFwiO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0ZXAuc2V0SW5zdGFuY2VTdGF0dXNUby5JblByb2dyZXNzICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2VTdGF0dXMgPSBcIkluUHJvZ3Jlc3NcIjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGVwLnNldEluc3RhbmNlU3RhdHVzVG8uU3VibWl0dGVkICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2VTdGF0dXMgPSBcIlN1Ym1pdHRlZFwiO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0ZXAuc2V0SW5zdGFuY2VTdGF0dXNUby5Db21wbGV0ZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlU3RhdHVzID0gXCJDb21wbGV0ZVwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgbGFuZ3VhZ2UgPSBzZXJ2aWNlLmdldExhbmd1YWdlKCk7XHJcblxyXG4gICAgICAgICAgICBtb2RlbC5zdGF0dXMgPSBpbnN0YW5jZVN0YXR1cztcclxuICAgICAgICAgICAgbW9kZWwubWVzc2FnZSA9IGV2YWwoXCJzdGVwLnNldEluc3RhbmNlU3RhdHVzVG8uXCIgKyBpbnN0YW5jZVN0YXR1cyArIFwiLmxhYmVsLmkxOG4uXCIgKyBsYW5ndWFnZSk7XHJcbiAgICAgICAgICAgIC8vbW9kZWwuYXNzaWduZWRUby51c2VySWQgPSBkYXRhLnVzZXJJZCAhPT0gdW5kZWZpbmVkID8gZGF0YS51c2VySWQgOiAnJztcclxuICAgICAgICAgICAgLy9tb2RlbC5hc3NpZ25lZFRvLm5hbWUgPSBkYXRhLm5hbWUgIT09IHVuZGVmaW5lZCA/IGRhdGEubmFtZSA6ICcnO1xyXG4gICAgICAgICAgICBtb2RlbC5jb21tZW50ID0gZGF0YS5jb21tZW50ICE9PSB1bmRlZmluZWQgPyBkYXRhLmNvbW1lbnQgOiAnJztcclxuICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBpbmRpY2F0b3IgZG9jdW1lbnRzIHByb2Nlc3Mgc3RlcCBkYXRhXHJcbiAgICAgICAgICAgIC8vY29tc28ubG9nKCdpbnN0U3ViUHJvY2Vzcz09PScpO1xyXG4gICAgICAgICAgICAvL2NvbXNvLmxvZyhpbnN0U3ViUHJvY2Vzcyk7XHJcbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JzID0gaW5zdFN1YlByb2Nlc3MgIT09IHVuZGVmaW5lZCA/IGluc3RTdWJQcm9jZXNzLmluZGljYXRvcnMgOiBbXTtcclxuICAgICAgICAgICAgaW5kaWNhdG9yRG9jcyhwcm9jZXNzSWQsIGluZGljYXRvcnMsIG1vZGVsLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIC8vIElmIGFjdGlvbnMgYXJlIHNwZWNpZmllZCwgZXhlY3V0ZSB0aGVtXHJcbiAgICAgICAgICAgICAgICB1dWlkID0gc3B1dWlkO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzdGVwLmZ1bmN0aW9uLmFjdGlvbnMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9ucyhzdGVwLmZ1bmN0aW9uLmFjdGlvbnMsIHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdWJQcm9jZXNzLCBtb2RlbCwgX1dGSW5zdGFuY2UsIGRhdGEsIHNwdXVpZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBFeGVjdXRlIHRoZSB0cmFuc2l0aW9ucywgaWYgYXV0b1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRyYW5zaXRpb25JZCA9IHN0ZXAudHJhbnNpdGlvblswXS5faWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdGVwSWQsIHRyYW5zaXRpb25JZCwgZGF0YSwgX1dGSW5zdGFuY2UsIHNwdXVpZCwgbW9kZWwpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1RyYW5zaXRpb24gY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCByZXN1bHQuZGF0YS5zdGVwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBFbHNlIHRhc2tzIGFyZSBzcHJlY2lmaWVkLCBleGVjdXRlIHRoZW1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RlcC5mdW5jdGlvbi50YXNrICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIE1ha2UgYXNzaWdubWVudHNcclxuICAgICAgICAgICAgICAgICAgICB0YXNrKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3RlcC5mdW5jdGlvbi50YXNrLCBzcHV1aWQsIG1vZGVsKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBkbyB0YXNrIHN1Y2Nlc3MgaGFuZGxpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1Rhc2sgY29tcGxldGUuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdUYXNrIGF3YWl0aW5nIHVzZXIgYWN0aW9uLicsIG1vZGVsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFByb2Nlc3MgaW5kaWNhdG9yIHVwZGF0ZXNcclxuICpcclxuICogQHBhcmFtIHtvYmplY3R9IGFjdGlvbnMgLSB0aGUgYWN0aW9ucyBjb25maWcgZGF0YVxyXG4gKiBAcGFyYW0ge29iamVjdH0gc3ViUHJvY2VzcyAtIHRoZSBjdXJyZW50IHN1Yi1wcm9jZXNzIGZvcm0gY29uZmlnIGRhdGFcclxuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcclxuICpcclxuICogQGV4YW1wbGUgJydcclxuICpcclxuICogQHJldHVybiAnJ1xyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gaW5kaWNhdG9ycyhpbmRpY2F0b3JzLCBfV0ZJbnN0YW5jZSwgc3B1dWlkKSB7XHJcbiAgICB2YXIgbW9kZWwgPSBbXTtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGluZGljYXRvciBzZWN0aW9ucyBvZiB0aGUgc3ViUHJvY2Vzc1xyXG5cclxuICAgICAgICAgICAgdmFyIGFycmF5ID0gSlNPTi54cGF0aChcImluZGljYXRvcnNbZm46Y291bnQoLi93b3JrZmxvd3MvcHJvY2Vzc2VzW3N1YlByb2Nlc3NVVUlEIGVxICdcIiArIHNwdXVpZCArIFwiJ10pIGd0IDBdXCIsIF9XRkluc3RhbmNlLCB7fSk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgYXJyYXkubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3IgPSBhcnJheVtqXTtcclxuICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3JNb2RlbCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2VzOiBbXVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBpbnN0YW5jZU1vZGVsID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHV1aWQ6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICBrZXk6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcTogMVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGluZGljYXRvck1vZGVsLmlkID0gaW5kaWNhdG9yLmNhdGVnb3J5LnRlcm07XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZU1vZGVsLnV1aWQgPSBpbmRpY2F0b3IuX2lkO1xyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2VNb2RlbC50aXRsZSA9IGluZGljYXRvci50aXRsZTtcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlTW9kZWwua2V5ID0gJyc7XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZU1vZGVsLnNlcSA9IGluZGljYXRvci5tb2RlbC5wZW5kaW5nLnNlcTsgLy8gaW5kaWNhdG9yIHNlcSBudW1iZXIgaGVyZSB3aGljaCBpcyBnZXR0aW5nIHVwZGF0ZWQuXHJcbiAgICAgICAgICAgICAgICBpbmRpY2F0b3JNb2RlbC5pbnN0YW5jZXMucHVzaChpbnN0YW5jZU1vZGVsKTtcclxuICAgICAgICAgICAgICAgIG1vZGVsLnB1c2goaW5kaWNhdG9yTW9kZWwpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnUHJvY2VzcyBpbmRpY2F0b3IgbW9kZWwgdXBkYXRlZC4nLCBtb2RlbCk7XHJcbiAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFByb2Nlc3MgYXNzaWduIHVzZXJcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHByb2Nlc3MgaWRcclxuICogQHBhcmFtIHtudW1iZXJ9IHByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2UgcHJvY2VzcyBzZXFcclxuICogQHBhcmFtIHtzdHJpbmd9IHN1YlByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN1Yi1wcm9jZXNzIGlkXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdWJQcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHN1Yi1wcm9jZXNzIHNlcVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RlcElkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3RlcCBpZFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdHJhbnNpdGlvbklkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gdHJhbnNpdGlvbiBpZFxyXG4gKiBAcGFyYW0ge29iamVjdH0gdXNlciAtIHRoZSB1c2VyIHRvIGFzc2lnbiB0b1xyXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxyXG4gKlxyXG4gKiBAZXhhbXBsZSAnJ1xyXG4gKlxyXG4gKiBAcmV0dXJuICcnXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiBhc3NpZ25Vc2VyKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCB1c2VyLCBfV0ZJbnN0YW5jZSkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHZhciB1dWlkID0gJyc7XHJcbiAgICAgICAgICAgIC8vIEdldCB0aGUgY3VycmVudCBzdWJQcm9jZXNzIGluc3RhbmNlIGRhdGFcclxuICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmpQcm9jZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqUHJvY2Vzcy5pZCA9PSBwcm9jZXNzSWQgJiYgb2JqUHJvY2Vzcy5zZXEgPT0gcHJvY2Vzc1NlcSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9ialByb2Nlc3Muc3ViUHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmpTdWJQcm9jZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmpTdWJQcm9jZXNzLmlkID09IHN1YlByb2Nlc3NJZCAmJiBvYmpTdWJQcm9jZXNzLnNlcSA9PSBzdWJQcm9jZXNzU2VxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dWlkID0gb2JqU3ViUHJvY2Vzcy51dWlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHN1YlByb2Nlc3NJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3ViUHJvY2Vzc0l0ZW0uX2lkID09IHV1aWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBTZXQgdGhlIHVzZXIgZGV0YWlsc1xyXG4gICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NJdGVtLnN0ZXAuYXNzaWduZWRUby51c2VySWQgPSB1c2VyLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NJdGVtLnN0ZXAuYXNzaWduZWRUby5uYW1lID0gdXNlci5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgaW5kaWNhdG9ycyB1c2VyIGRldGFpbHNcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9ycyA9IHN1YlByb2Nlc3NJdGVtLmluZGljYXRvcnM7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbmRpY2F0b3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3IgPSBpbmRpY2F0b3JzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGluZGljYXRvci5pbnN0YW5jZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IGluZGljYXRvci5pbnN0YW5jZXNbal07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IF9XRkluc3RhbmNlLmluZGljYXRvcnMubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZG9jID0gX1dGSW5zdGFuY2UuaW5kaWNhdG9yc1trXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2UudXVpZCA9PSBkb2MuX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvYy53b3JrZmxvd3MuZmlsdGVyKGZ1bmN0aW9uKHdvcmtmbG93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod29ya2Zsb3cuaWQgPT0gX1dGSW5zdGFuY2UuY29uZmlnLl9pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtmbG93LnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ocHJvY2Vzc0l0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb2Nlc3NJdGVtLmlkID09IHByb2Nlc3NJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSB1c2VyIGlkIGFuZCBuYW1lIGluIHRoZSBkb2N1bWVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0l0ZW0uc3RlcC5hc3NpZ25lZFRvLnVzZXJJZCA9IHVzZXIuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzSXRlbS5zdGVwLmFzc2lnbmVkVG8ubmFtZSA9IHVzZXIubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdVc2VyIGFzc2lnbmVkIHN1Y2Nlc3NmdWxseS4gVXNlcklkOiBcIicgKyB1c2VyLmlkICsgJ1wiLCBOYW1lOiBcIicgKyB1c2VyLm5hbWUgKyAnXCInLCBzdWJQcm9jZXNzSXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBQcm9jZXNzIGluZGljYXRvciBkb2N1bWVudCB1cGRhdGVzXHJcbiAqXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBhY3Rpb25zIC0gdGhlIGFjdGlvbnMgY29uZmlnIGRhdGFcclxuICogQHBhcmFtIHtvYmplY3R9IHN1YlByb2Nlc3MgLSB0aGUgY3VycmVudCBzdWItcHJvY2VzcyBmb3JtIGNvbmZpZyBkYXRhXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXHJcbiAqXHJcbiAqIEBleGFtcGxlICcnXHJcbiAqXHJcbiAqIEByZXR1cm4gJydcclxuICpcclxuICovXHJcbmZ1bmN0aW9uIGluZGljYXRvckRvY3MocHJvY2Vzc0lkLCBpbmRpY2F0b3JzLCBzdGVwLCBfV0ZJbnN0YW5jZSkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgaW5kaWNhdG9yIHNlY3Rpb25zIG9mIHRoZSBzdWJQcm9jZXNzXHJcbiAgICAgICAgICAgIGlmIChpbmRpY2F0b3JzID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZJbmRpY2F0b3JzVXBkYXRlJywgJ0luZGljYXRvcnMgcGFyYW1ldGVyIGlzIHJlcXVpcmVkLiAtIFZhbHVlOiAnICsgaW5kaWNhdG9ycylcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbmRpY2F0b3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb21zby5sb2coJy0tPj4+Pj4+IEZpcnN0IElmIGNvbnNpdGlvbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3IgPSBpbmRpY2F0b3JzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaW5kaWNhdG9yLmluc3RhbmNlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbXNvLmxvZygnLS0+Pj4+Pj4gU2Vjb25kIElmIGNvbnNpdGlvbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSBpbmRpY2F0b3IuaW5zdGFuY2VzW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IF9XRkluc3RhbmNlLmluZGljYXRvcnMubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29tc28ubG9nKCctLT4+Pj4+PiBUaGlyZCBJZiBjb25zaXRpb24nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkb2MgPSBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzW2tdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlLnV1aWQgPT0gZG9jLl9pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29tc28ubG9nKCctLT4+Pj4+PiBGb3VydGggSWYgY29uc2l0aW9uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jLndvcmtmbG93cy5maWx0ZXIoZnVuY3Rpb24od29ya2Zsb3cpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdvcmtmbG93LmlkID09IF9XRkluc3RhbmNlLmNvbmZpZy5faWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29tc28ubG9nKCctLT4+Pj4+PiBGaWZ0aCBJZiBjb25zaXRpb24nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3b3JrZmxvdy5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHByb2Nlc3NJdGVtKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzSXRlbS5pZCA9PSBwcm9jZXNzSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0l0ZW0uc3RlcC5pZCA9IHN0ZXAuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NJdGVtLnN0ZXAuc2VxID0gc3RlcC5zZXE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NJdGVtLnN0ZXAuc3RhdHVzID0gc3RlcC5zdGF0dXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NJdGVtLnN0ZXAubWVzc2FnZSA9IHN0ZXAubWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0l0ZW0uc3RlcC5hc3NpZ25lZFRvLnVzZXJJZCA9IHN0ZXAuYXNzaWduZWRUby51c2VySWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NJdGVtLnN0ZXAuYXNzaWduZWRUby5uYW1lID0gc3RlcC5hc3NpZ25lZFRvLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NJdGVtLnN0ZXAuY29tbWVudCA9IHN0ZXAuY29tbWVudCAhPT0gdW5kZWZpbmVkID8gc3RlcC5jb21tZW50IDogJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnSW5kaWNhdG9yIGRvY3VtZW50cyB3b3JrZmxvdyBwcm9jZXNzIG1vZGVsIHVwZGF0ZWQuJywgX1dGSW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgLy9jb21zby5sb2coJ2luZGljYXRvckRvY3MgZnVuY3Rpb24gRU5EUy0tLS0tLS0tLS0tLS0tJyk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSlcclxufTtcclxuXHJcbi8qKlxyXG4gKiBQcm9jZXNzIGFjdGlvbnNcclxuICpcclxuICogQHBhcmFtIHtvYmplY3R9IGFjdGlvbnMgLSB0aGUgYWN0aW9ucyBjb25maWcgZGF0YVxyXG4gKiBAcGFyYW0ge29iamVjdH0gc3ViUHJvY2VzcyAtIHRoZSBjdXJyZW50IHN1Yi1wcm9jZXNzIGZvcm0gY29uZmlnIGRhdGFcclxuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcclxuICpcclxuICogQGV4YW1wbGUgJydcclxuICpcclxuICogQHJldHVybiAnJ1xyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gYWN0aW9ucyhhY3Rpb25zLCBwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3ViUHJvY2Vzcywgc3RlcCwgX1dGSW5zdGFuY2UsIGRhdGEsIHV1aWQpIHtcclxuICAgIHZhciBhcnJBY3Rpb25zID0gW107XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgdXRpbC5zeW5jTG9vcChhY3Rpb25zLmxlbmd0aCwgZnVuY3Rpb24obG9vcCkge1xyXG4gICAgICAgICAgICB2YXIgY291bnRlciA9IGxvb3AuaXRlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgIGFjdGlvbihhY3Rpb25zW2NvdW50ZXJdLCBwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3ViUHJvY2Vzcywgc3RlcCwgX1dGSW5zdGFuY2UsIGRhdGEsIHV1aWQpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmV0QWN0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogYWN0aW9uc1tjb3VudGVyXS5faWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcTogY291bnRlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogcmVzdWx0XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXJyQWN0aW9ucy5wdXNoKHJldEFjdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9vcC5uZXh0KCk7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBsb29wLmJyZWFrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gT24gY29tcGxldGlvbiBvZiB0aGUgbG9vcFxyXG5cclxuICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0FjdGlvbnMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCBhcnJBY3Rpb25zKTtcclxuXHJcbiAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBQcm9jZXNzIGFjdGlvblxyXG4gKlxyXG4gKiBAcGFyYW0ge29iamVjdH0gYWN0aW9uIC0gdGhlIGFjdGlvbiBjb25maWcgZGF0YVxyXG4gKiBAcGFyYW0ge29iamVjdH0gc3ViUHJvY2VzcyAtIHRoZSBjdXJyZW50IHN1Yi1wcm9jZXNzIGZvcm0gY29uZmlnIGRhdGFcclxuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcclxuICpcclxuICogQGV4YW1wbGUgJydcclxuICpcclxuICogQHJldHVybiAnJ1xyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gYWN0aW9uKGFjdGlvbiwgcHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN1YlByb2Nlc3MsIHN0ZXAsIF9XRkluc3RhbmNlLCBkYXRhLCB1dWlkKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24ubWV0aG9kICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB2YXIgbWV0aG9kUG9zc2libGVJdGVtcyA9IFtcImZvcm1cIiwgXCJpbmRpY2F0b3JcIiwgXCJwcm9maWxlXCIsIFwic3ViUHJvY2Vzc0luc3RhbmNlXCIsIFwic3RlcFwiLCBcImNvbW11bml0eVwiLCBcImFwcGxpY2F0aW9uXCIsIFwidXNlclwiLCBcInNkb1wiLCBcInBlcmZvcm1hbmNlXCIsIFwidGF4b25vbXlcIl07XHJcbiAgICAgICAgICAgIHN3aXRjaCAocHJvcGVydHlFeGlzdHMoYWN0aW9uLm1ldGhvZCwgbWV0aG9kUG9zc2libGVJdGVtcykpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2Zvcm0nOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24ubWV0aG9kLmZvcm0uY3JlYXRlICE9IHVuZGVmaW5lZCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHByb2Nlc3NJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChzdWJQcm9jZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHN0ZXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goYWN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHByb2Nlc3NTZXEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goc3ViUHJvY2Vzc1NlcSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goX1dGSW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YS5jcmVhdGVUeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHV1aWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YS5iYXNlVVVJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uY3JlYXRlKGFyZ3MpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uLm1ldGhvZC5mb3JtLmF1dGhvcmlzZSAhPSB1bmRlZmluZWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChwcm9jZXNzSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goc3ViUHJvY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChwcm9jZXNzU2VxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHN1YlByb2Nlc3NTZXEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goX1dGSW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YS5jcmVhdGVUeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHV1aWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YS5iYXNlVVVJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5hdXRob3Jpc2UoYXJncykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24ubWV0aG9kLmZvcm0udW5kcmFmdCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKF9XRkluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEuY3JlYXRlVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh1dWlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEuYmFzZVVVSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uc2V0VW5EcmFmdChhcmdzKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbi5tZXRob2QuZm9ybS5kcmFmdCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKF9XRkluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEuY3JlYXRlVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh1dWlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEuYmFzZVVVSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uc2V0RHJhZnQoYXJncykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24ubWV0aG9kLmZvcm0uY2xvc2UgIT0gdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goc3ViUHJvY2Vzcy5pbmRpY2F0b3JzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKF9XRkluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEuY3JlYXRlVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh1dWlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEuYmFzZVVVSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uY2xvc2UoYXJncykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2luZGljYXRvcic6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGlvbi5tZXRob2QuaW5kaWNhdG9yLmNyZWF0ZSAhPSB1bmRlZmluZWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24ubWV0aG9kLmluZGljYXRvci5pbnN0YW50aWF0ZSAhPSB1bmRlZmluZWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24ubWV0aG9kLmluZGljYXRvci5zZXRWYWx1ZSAhPSB1bmRlZmluZWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXRoID0gYWN0aW9uLm1ldGhvZC5pbmRpY2F0b3Iuc2V0VmFsdWUucGF0aDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRhVmFsdWUgPSBoZWxwZXIuZ2V0Tm9kZVZhbHVlKGFjdGlvbi5tZXRob2QuaW5kaWNhdG9yLnNldFZhbHVlLmRhdGEsIF9XRkluc3RhbmNlLCB1dWlkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChfV0ZJbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh1dWlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHBhdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YVZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gS2VlcCBpbmRpY2F0b3IgZnVuY3Rpb25zIGluIGluZGlhdG9yIGZpbGUgaXN0ZWFkIG9mIGZvcm0gZmlsZS5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0udXBkYXRlSW5kaWNhdG9yKGFyZ3MpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24ubWV0aG9kLmluZGljYXRvci51cGRhdGVTdGF0dXMgIT0gdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yU2V0SWQgPSBhY3Rpb24ubWV0aG9kLmluZGljYXRvci5pbmRpY2F0b3JTZXRJZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKF9XRkluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHV1aWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGlvbi5tZXRob2QuaW5kaWNhdG9yLnVwZGF0ZVN0YXR1cyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGF0dXMgPSBhY3Rpb24ubWV0aG9kLmluZGljYXRvci51cGRhdGVTdGF0dXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goc3RhdHVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChpbmRpY2F0b3JTZXRJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBLZWVwIGluZGljYXRvciBmdW5jdGlvbnMgaW4gaW5kaWF0b3IgZmlsZSBpc3RlYWQgb2YgZm9ybSBmaWxlLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5tYXJrVXBkYXRlSW5kaWNhdG9yKGFyZ3MpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vb3RoZXIgaW1wbGVtZW50YXRpb25zICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoXCJBY3Rpb24gaW5kaWNhdG9yIHN1YiB0eXBlIG5vdCBmb3VuZC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3Byb2ZpbGUnOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24ubWV0aG9kLnByb2ZpbGUuY3JlYXRlICE9IHVuZGVmaW5lZCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHByb2Nlc3NJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChfV0ZJbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmNyZWF0ZVR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2godXVpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmJhc2VVVUlEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmNyZWF0ZVByb2ZpbGUoYXJncykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24ubWV0aG9kLnByb2ZpbGUuWCAhPSB1bmRlZmluZWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3N1YlByb2Nlc3NJbnN0YW5jZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNwUG9zc2libGVJdGVtcyA9IFtcImluc3RhbnRpYXRlXCIsIFwiYXV0aG9yaXNlXCIsIFwiY2xvc2VcIiwgXCJzZXRWYXJpYWJsZVwiLCBcInNldFN0YXR1c1RvXCIsIFwic2V0U3RhdHVzTXNnVG9cIiwgXCJzZXRUaXRsZVwiXTtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5RXhpc3RzKGFjdGlvbi5tZXRob2Quc3ViUHJvY2Vzc0luc3RhbmNlLCBzcFBvc3NpYmxlSXRlbXMpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzZXRUaXRsZSc6XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGFWYWx1ZSA9IGhlbHBlci5nZXROb2RlVmFsdWUoYWN0aW9uLm1ldGhvZC5zdWJQcm9jZXNzSW5zdGFuY2Uuc2V0VGl0bGUsIF9XRkluc3RhbmNlLCB1dWlkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5zdWJQcm9jZXNzSW5zdGFuY2Uuc2V0VGl0bGUoYWN0aW9uLm1ldGhvZC5zdWJQcm9jZXNzSW5zdGFuY2Uuc2V0VGl0bGUsIHV1aWQsIGRhdGFWYWx1ZSwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdXBkYXRlIHN1YnByb2Nlc3MgbGFiZWwgaW4gd29ya2Zsb3cgaW5zdGFuY2UgcHJvY2VzcyBvYmplY3Q6IFRPRE9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdCBpbiBzdWJwcm9jZXNzIGFjdGlvbi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnc3RlcCc6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdjb21tdW5pdHknOlxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb21tdW5pdHlQb3NzaWJsZUl0ZW1zID0gW1wiY3JlYXRlQ29tbXVuaXR5XCIsIFwicmVsZWFzZUFkb3B0ZWRBcHBsaWNhdGlvblwiLCBcInVzZXJKb2luQ29tbXVuaXR5XCJdO1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocHJvcGVydHlFeGlzdHMoYWN0aW9uLm1ldGhvZC5jb21tdW5pdHksIGNvbW11bml0eVBvc3NpYmxlSXRlbXMpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjcmVhdGVDb21tdW5pdHknOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUuY29tbXVuaXR5LmNyZWF0ZUNvbW11bml0eShhY3Rpb24ubWV0aG9kLmNvbW11bml0eS5jcmVhdGVDb21tdW5pdHksIHV1aWQsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlbGVhc2VBZG9wdGVkQXBwbGljYXRpb24nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUuY29tbXVuaXR5LnJlbGVhc2VBZG9wdGVkQXBwbGljYXRpb24oYWN0aW9uLm1ldGhvZC5jb21tdW5pdHkucmVsZWFzZUFkb3B0ZWRBcHBsaWNhdGlvbiwgdXVpZCwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAndXNlckpvaW5Db21tdW5pdHknOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUuY29tbXVuaXR5LnVzZXJKb2luQ29tbXVuaXR5KGFjdGlvbi5tZXRob2QuY29tbXVuaXR5LnVzZXJKb2luQ29tbXVuaXR5LCB1dWlkLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnYXBwbGljYXRpb24nOlxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhcHBsaWNhdGlvblBvc3NpYmxlSXRlbXMgPSBbXCJjcmVhdGVBcHBEZWZpbml0aW9uXCIsIFwiYnVpbGRBcHBsaWNhdGlvblwiLCBcImFwcGxpY2F0aW9uQWRvcHRpb25cIl07XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChwcm9wZXJ0eUV4aXN0cyhhY3Rpb24ubWV0aG9kLmFwcGxpY2F0aW9uLCBhcHBsaWNhdGlvblBvc3NpYmxlSXRlbXMpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjcmVhdGVBcHBEZWZpbml0aW9uJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25zTW9kdWxlLmFwcGxpY2F0aW9uLmNyZWF0ZUFwcERlZmluaXRpb24oYWN0aW9uLm1ldGhvZC5hcHBsaWNhdGlvbi5jcmVhdGVBcHBEZWZpbml0aW9uLCB1dWlkLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdidWlsZEFwcGxpY2F0aW9uJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25zTW9kdWxlLmFwcGxpY2F0aW9uLmJ1aWxkQXBwbGljYXRpb24oYWN0aW9uLm1ldGhvZC5hcHBsaWNhdGlvbi5idWlsZEFwcGxpY2F0aW9uLCB1dWlkLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdhcHBsaWNhdGlvbkFkb3B0aW9uJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25zTW9kdWxlLmFwcGxpY2F0aW9uLmFwcGxpY2F0aW9uQWRvcHRpb24oYWN0aW9uLm1ldGhvZC5hcHBsaWNhdGlvbi5hcHBsaWNhdGlvbkFkb3B0aW9uLCB1dWlkLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ3VzZXInOlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnc2RvJzpcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2RvUG9zc2libGVJdGVtcyA9IFtcImNyZWF0ZVwiXTtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5RXhpc3RzKGFjdGlvbi5tZXRob2Quc2RvLCBzZG9Qb3NzaWJsZUl0ZW1zKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnY3JlYXRlJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25zTW9kdWxlLnNkby5jcmVhdGUoYWN0aW9uLm1ldGhvZC5zZG8uY3JlYXRlLCB1dWlkLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ3BlcmZvcm1hbmNlJzpcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGVyZm9ybWFuY2VQb3NzaWJsZUl0ZW1zID0gW1wiY3JlYXRlXCIsIFwiY29uZmlndXJlTm9kZVwiXTtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5RXhpc3RzKGFjdGlvbi5tZXRob2QucGVyZm9ybWFuY2UsIHBlcmZvcm1hbmNlUG9zc2libGVJdGVtcykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NyZWF0ZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5wZXJmb3JtYW5jZS5jcmVhdGUoYWN0aW9uLm1ldGhvZC5wZXJmb3JtYW5jZS5jcmVhdGUsIHV1aWQsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnY29uZmlndXJlTm9kZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5wZXJmb3JtYW5jZS5jb25maWd1cmVOb2RlKGFjdGlvbi5tZXRob2QucGVyZm9ybWFuY2UuY29uZmlndXJlTm9kZSwgdXVpZCwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChcIk5vIG1ldGhvZCBmb3VuZCBmcm9tIGltcGxlbWVudGVkIGxpc3QuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICd0YXhvbm9teSc6XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRheG9ub215UG9zc2libGVJdGVtcyA9IFtcImNyZWF0ZVwiXTtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5RXhpc3RzKGFjdGlvbi5tZXRob2QudGF4b25vbXksIHRheG9ub215UG9zc2libGVJdGVtcykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NyZWF0ZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS50YXhvbm9teS5jcmVhdGUoYWN0aW9uLm1ldGhvZC50YXhvbm9teS5jcmVhdGUsIHV1aWQsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJObyBtZXRob2QgZm91bmQgZnJvbSBpbXBsZW1lbnRlZCBsaXN0LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJtZXRob2Qgbm90IGRlZmluZWQgaW4gY29uZmlndXJhdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdC5cIik7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBQcm9jZXNzIHRhc2tzXHJcbiAqXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSB0YXNrIC0gdGhlIHRhc2sgY29uZmlnIGRhdGFcclxuICogQHBhcmFtIHtvYmplY3R9IGlucHV0RGF0YSAtIHRoZSB1c2VyIGlucHV0IGRhdGFcclxuICpcclxuICogQGV4YW1wbGUgJydcclxuICpcclxuICogQHJldHVybiAnJ1xyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gdGFzayhzdWJwcm9jZXNzSUQsIHN1YnByb2Nlc3NTRVEsIHRhc2ssIHNwdXVpZCwgbW9kZWwpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgdmFyIGxpc3QgPSBbXTtcclxuICAgICAgICBpZiAodGFzay5hc3NpZ24ucm9sZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdmFyIGFzc2lnblR5cGUgPSAncHJvZmlsZVJvbGUnO1xyXG4gICAgICAgICAgICB2YXIgcHJvZmlsZUlkID0gYXBwLlNDT1BFLndvcmtmbG93LnByb2ZpbGU7XHJcbiAgICAgICAgICAgIHZhciBpZCA9ICcnO1xyXG4gICAgICAgICAgICBpZiAodGFzay5hc3NpZ24ucm9sZS5wcm9maWxlID09ICdjdXJyZW50Jykge1xyXG4gICAgICAgICAgICAgICAgaWQgPSBhcHAuU0NPUEUud29ya2Zsb3cucHJvZmlsZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0YXNrLmFzc2lnbi5yb2xlLnByb2ZpbGUgPT0gJ2NvbW11bml0eScpIHtcclxuICAgICAgICAgICAgICAgIGlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciByb2xlID0gdGFzay5hc3NpZ24ucm9sZS5yb2xlSWQ7XHJcblxyXG4gICAgICAgICAgICBsaWJyYXJ5LmdldFVzZXJzTGlzdEJ5Um9sZShpZCwgcm9sZSkudGhlbihmdW5jdGlvbihsaXN0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGlzdCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdC5sZW5ndGggPiAxKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXNzaWdubWVudCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFzay5hc3NpZ24uYXNzaWdubWVudCAhPSB1bmRlZmluZWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXNzaWdubWVudCA9IG1vZGVsLmFzc2lnbm1lbnQ7IC8vSlNPTi54cGF0aChcIi9zdGVwL2Fzc2lnbm1lbnRcIixzcE9iamVjdCx7fSlbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWNjZXB0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2hvd1wiOiB0YXNrLmFzc2lnbi5hc3NpZ25tZW50LmFjY2VwdC5zaG93LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogX2dldE5hbWVCeUxhbmcodGFzay5hc3NpZ24uYXNzaWdubWVudC5hY2NlcHQubGFiZWwuaTE4bilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5hY2NlcHQgPSBhY2NlcHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50Lm1lc3NhZ2UgPSBfZ2V0TmFtZUJ5TGFuZyh0YXNrLmFzc2lnbi5hc3NpZ25tZW50Lm1lc3NhZ2UuaTE4bik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVqZWN0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2hvd1wiOiB0YXNrLmFzc2lnbi5hc3NpZ25tZW50LnJlamVjdC5zaG93LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogX2dldE5hbWVCeUxhbmcodGFzay5hc3NpZ24uYXNzaWdubWVudC5yZWplY3QubGFiZWwuaTE4bilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5yZWplY3QgPSByZWplY3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxlSWRcIjogcHJvZmlsZUlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicm9sZUlkXCI6IHJvbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwicm9sZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQucHJvZmlsZVJvbGVJZCA9IGlkO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgnTm90aWZpY2F0aW9ucyByZXF1ZXN0IHN1Ym1pdHRlZCBmb3IgYWNjZXB0YW5jZS4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsaXN0Lmxlbmd0aCA9PSAxKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdXNlcklkID0gbGlzdFswXS5pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVzZXJuYW1lID0gbGlzdFswXS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXNzaWduZWUgPSBtb2RlbC5hc3NpZ25lZFRvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25lZS5uYW1lID0gdXNlcm5hbWUgKyBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25lZS51c2VySWQgPSB1c2VySWQgKyBcIlwiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFzc2lnbm1lbnQgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhc2suYXNzaWduLmFzc2lnbm1lbnQgIT0gdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFzc2lnbm1lbnQgPSBtb2RlbC5hc3NpZ25tZW50OyAvL0pTT04ueHBhdGgoXCIvc3RlcC9hc3NpZ25tZW50XCIsc3BPYmplY3Qse30pWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjY2VwdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNob3dcIjogdGFzay5hc3NpZ24uYXNzaWdubWVudC5hY2NlcHQuc2hvdyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IF9nZXROYW1lQnlMYW5nKHRhc2suYXNzaWduLmFzc2lnbm1lbnQuYWNjZXB0LmxhYmVsLmkxOG4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQuYWNjZXB0ID0gYWNjZXB0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5tZXNzYWdlID0gX2dldE5hbWVCeUxhbmcodGFzay5hc3NpZ24uYXNzaWdubWVudC5tZXNzYWdlLmkxOG4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlamVjdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNob3dcIjogdGFzay5hc3NpZ24uYXNzaWdubWVudC5yZWplY3Quc2hvdyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IF9nZXROYW1lQnlMYW5nKHRhc2suYXNzaWduLmFzc2lnbm1lbnQucmVqZWN0LmxhYmVsLmkxOG4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQucmVqZWN0ID0gcmVqZWN0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZmlsZUlkXCI6IHByb2ZpbGVJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJvbGVJZFwiOiByb2xlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInJvbGVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50LnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50LnByb2ZpbGVSb2xlSWQgPSBpZDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoJ0Fzc2lnbmVkIHRvIHRoZSBvbmx5IHVzZXIgaW4gcm9sZS4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhc3NpZ25lZSA9IG1vZGVsLmFzc2lnbmVkVG87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVlLm5hbWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25lZS51c2VySWQgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFzc2lnbm1lbnQgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhc2suYXNzaWduLmFzc2lnbm1lbnQgIT0gdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFzc2lnbm1lbnQgPSBtb2RlbC5hc3NpZ25tZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjY2VwdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNob3dcIjogdGFzay5hc3NpZ24uYXNzaWdubWVudC5hY2NlcHQuc2hvdyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IF9nZXROYW1lQnlMYW5nKHRhc2suYXNzaWduLmFzc2lnbm1lbnQuYWNjZXB0LmxhYmVsLmkxOG4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQuYWNjZXB0ID0gYWNjZXB0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5tZXNzYWdlID0gX2dldE5hbWVCeUxhbmcodGFzay5hc3NpZ24uYXNzaWdubWVudC5tZXNzYWdlLmkxOG4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlamVjdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNob3dcIjogdGFzay5hc3NpZ24uYXNzaWdubWVudC5yZWplY3Quc2hvdyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IF9nZXROYW1lQnlMYW5nKHRhc2suYXNzaWduLmFzc2lnbm1lbnQucmVqZWN0LmxhYmVsLmkxOG4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQucmVqZWN0ID0gcmVqZWN0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZmlsZUlkXCI6IHByb2ZpbGVJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJvbGVJZFwiOiByb2xlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInJvbGVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50LnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50LnByb2ZpbGVSb2xlSWQgPSBpZDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoXCJObyB1c2VycyBmb3VuZCBpbiBsaXN0LiBBc3NpZ25pbmcgYmxhbmsgXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgaW4gZ2V0VXNlcnNMaXN0QnlSb2xlIHVuZGVmaW5lZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgaW4gZ2V0VXNlcnNMaXN0QnlSb2xlJyk7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0YXNrLmFzc2lnbi5zd2ltbGFuZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZSgnc3dpbWxhbmUnKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1N3aW1sYW5lIGltcGxlbWVudGF0aW9uICEhJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG5cclxufTtcclxuXHJcbi8qKlxyXG4gKiBQcm9jZXNzIHRyYW5zaXRpb25cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHByb2Nlc3MgaWRcclxuICogQHBhcmFtIHtudW1iZXJ9IHByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2UgcHJvY2VzcyBzZXFcclxuICogQHBhcmFtIHtzdHJpbmd9IHN1YlByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN1Yi1wcm9jZXNzIGlkXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdWJQcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHN1Yi1wcm9jZXNzIHNlcVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RlcElkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3RlcCBpZFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdHJhbnNpdGlvbklkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gdHJhbnNpdGlvbiBpZFxyXG4gKiBAcGFyYW0ge29iamVjdH0gZGF0YSAtIGFueSBhZGRpdGlvbmFsIGRhdGEgcGFzc2VkIGluIGFzIGtleSB2YWx1ZSBwYWlyc1xyXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxyXG4gKlxyXG4gKiBAZXhhbXBsZSAnJ1xyXG4gKlxyXG4gKiBAcmV0dXJuICcnXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiB0cmFuc2l0aW9uKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdGVwSWQsIHRyYW5zaXRpb25JZCwgZGF0YSwgX1dGSW5zdGFuY2UsIHNwdXVpZCwgbW9kZWwpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YXIgc3RlcFNlcSA9IDA7XHJcbiAgICAgICAgICAgIHZhciBuZXh0U3RlcElkID0gJyc7XHJcbiAgICAgICAgICAgIHZhciBuZXh0U3RlcFNlcSA9IDA7XHJcbiAgICAgICAgICAgIHZhciBzdWJQcm9jZXNzID0gW107XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50UHJvY2VzcyA9IF9XRkluc3RhbmNlLmNvbmZpZy5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKG9ialByb2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmpQcm9jZXNzLl9pZCA9PSBwcm9jZXNzSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqUHJvY2VzcztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudFN1YlByb2Nlc3MgPSBjdXJyZW50UHJvY2Vzc1swXS5zdWJQcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKG9ialN1YlByb2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmpTdWJQcm9jZXNzLl9pZCA9PSBzdWJQcm9jZXNzSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqU3ViUHJvY2VzcztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudFN0ZXAgPSBjdXJyZW50U3ViUHJvY2Vzc1swXS5zdGVwcy5maWx0ZXIoZnVuY3Rpb24ob2JqU3RlcCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9ialN0ZXAuX2lkID09IHN0ZXBJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmpTdGVwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZhciB0cmFuc2l0aW9uID0gY3VycmVudFN0ZXBbMF0udHJhbnNpdGlvbi5maWx0ZXIoZnVuY3Rpb24ob2JqVHJhbnNpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9ialRyYW5zaXRpb24uX2lkID09IHRyYW5zaXRpb25JZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmpUcmFuc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY3VycmVudFN1YlByb2Nlc3NbMF0uc3RlcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50U3ViUHJvY2Vzc1swXS5zdGVwc1tpXS5faWQgPT0gc3RlcElkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RlcFNlcSA9IHBhcnNlSW50KGN1cnJlbnRTdWJQcm9jZXNzWzBdLnN0ZXBzW2ldLl9zZXEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY3VycmVudFN1YlByb2Nlc3NbMF0uc3RlcHMuZmlsdGVyKGZ1bmN0aW9uKHN0ZXBJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBuZXh0U3RlcFNlcSA9IHN0ZXBTZXEgKyAxO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KHN0ZXBJdGVtLl9zZXEpID09IG5leHRTdGVwU2VxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dFN0ZXBJZCA9IHN0ZXBJdGVtLl9pZDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIF9XRkluc3RhbmNlLmluc3RhbmNlLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqUHJvY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9ialByb2Nlc3MuaWQgPT0gcHJvY2Vzc0lkICYmIG9ialByb2Nlc3Muc2VxID09IHByb2Nlc3NTZXEpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmpQcm9jZXNzLnN1YlByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqU3ViUHJvY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqU3ViUHJvY2Vzcy5pZCA9PSBzdWJQcm9jZXNzSWQgJiYgb2JqU3ViUHJvY2Vzcy5zZXEgPT0gc3ViUHJvY2Vzc1NlcSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHV1aWQgPSBvYmpTdWJQcm9jZXNzLnV1aWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcHV1aWQgPSB1dWlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3ViUHJvY2VzcyA9IG9ialN1YlByb2Nlc3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHN1YlByb2Nlc3NJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1YlByb2Nlc3NJdGVtLl9pZCA9PSB1dWlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3MgPSBzdWJQcm9jZXNzSXRlbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZhciBtYXhTdGVwcyA9IGN1cnJlbnRTdWJQcm9jZXNzWzBdLnN0ZXBzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgIGlmICh0cmFuc2l0aW9uWzBdLnRyYW5zaXRpb25BY3Rpb24uZ29Ub1N0ZXAgIT0gdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG5leHRTZXEgPSBwYXJzZUludChjdXJyZW50U3RlcFswXS5fc2VxKSArIHBhcnNlSW50KHRyYW5zaXRpb25bMF0udHJhbnNpdGlvbkFjdGlvbi5nb1RvU3RlcC5kZWZhdWx0KTtcclxuICAgICAgICAgICAgICAgIHZhciBuZXh0SWQgPSAnJztcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRTdWJQcm9jZXNzWzBdLnN0ZXBzLmZpbHRlcihmdW5jdGlvbihzdGVwSXRlbSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQoc3RlcEl0ZW0uX3NlcSkgPT0gbmV4dFN0ZXBTZXEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dElkID0gc3RlcEl0ZW0uX2lkO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBzdGVwKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBuZXh0SWQsIG5leHRTZXEsIGRhdGEsIF9XRkluc3RhbmNlLCBzcHV1aWQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRTZXEgPT0gbWF4U3RlcHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0FsbCBTdGVwIHRyYW5zaXRpb25zIGhhdmUgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzQ29tcGxldGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwOiByZXN1bHQuZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1N0ZXAgdHJhbnNpdGlvbiBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NDb21wbGV0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwOiByZXN1bHQuZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRyYW5zaXRpb25bMF0udHJhbnNpdGlvbkFjdGlvbi5nb1RvU3RlcElkICE9IHVuZGVmaW5lZCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBnb1RvU3RlcElkID0gdHJhbnNpdGlvblswXS50cmFuc2l0aW9uQWN0aW9uLmdvVG9TdGVwSWQuc3RlcElkO1xyXG4gICAgICAgICAgICAgICAgdmFyIGdvVG9TdGVwU2VxID0gMTtcclxuXHJcbiAgICAgICAgICAgICAgICBjdXJyZW50U3ViUHJvY2Vzc1swXS5zdGVwcy5maWx0ZXIoZnVuY3Rpb24oc3RlcEl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RlcEl0ZW0uX2lkID09IGdvVG9TdGVwSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ29Ub1N0ZXBTZXEgPSBwYXJzZUludChzdGVwSXRlbS5fc2VxKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgc3RlcChwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgZ29Ub1N0ZXBJZCwgZ29Ub1N0ZXBTZXEsIGRhdGEsIF9XRkluc3RhbmNlLCBzcHV1aWQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdvVG9TdGVwU2VxID09IG1heFN0ZXBzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnQWxsIFN0ZXAgdHJhbnNpdGlvbnMgaGF2ZSBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NDb21wbGV0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXA6IHJlc3VsdC5kYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1N0ZXAgdHJhbnNpdGlvbiBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NDb21wbGV0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwOiByZXN1bHQuZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHJhbnNpdGlvblswXS50cmFuc2l0aW9uQWN0aW9uLnN0b3AgIT0gdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1N0ZXAgdHJhbnNpdGlvbiBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LldvcmtmbG93IHN0b3BwZWQuJywge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NDb21wbGV0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzdGVwOiBtb2RlbFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFByb2Nlc3MgcG9zdEFjdGlvbnNcclxuICpcclxuICogQHBhcmFtIHtvYmplY3R9IHBvc3RBY3Rpb25zIC0gdGhlIHBvc3RBY3Rpb25zIGNvbmZpZyBkYXRhXHJcbiAqXHJcbiAqIEBleGFtcGxlICcnXHJcbiAqXHJcbiAqIEByZXR1cm4gJydcclxuICpcclxuICovXHJcbmZ1bmN0aW9uIHBvc3RBY3Rpb25zKHBvc3RBY3Rpb25zLCBfV0ZJbnN0YW5jZSkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHZhciBjb21wbGV0ZWQgPSBbXTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB1dGlsLnN5bmNMb29wKHBvc3RBY3Rpb25zLmxlbmd0aCwgZnVuY3Rpb24obG9vcCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvdW50ZXIgPSBsb29wLml0ZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uKHBvc3RBY3Rpb25zW2NvdW50ZXJdLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgYWxsIHByZS1yZXF1aXNpdGVzIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuXHJcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVkLnB1c2godHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9vcC5uZXh0KCk7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQucHVzaChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9vcC5icmVhaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBsZXRlZC5ldmVyeShCb29sZWFuKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdQb3N0LWFjdGlvbnMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCB7fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZQcmVBY3Rpb25zRXJyb3InLCAnTm90IGFsbCBwb3N0LWFjdGlvbnMgcGFzc2VkLicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG59O1xyXG5cclxuLypcclxuZnVuY3Rpb24gc2VuZE5vdGlmaWNhdGlvbnModXNlcnNMaXN0LCBzcHV1aWQpe1xyXG5cclxuICAvLyBnZXQgdXNlcnMgbGlzdCBcclxuICAvLyBzZW4gbm90aWZpY2F0aW9ucyB0byB1c2VycyB5IGFkZGluZyBjaGFubmVscyB0byB0aGVtXHJcblxyXG4gIHZhciBjaGFubmVsQXJyYXkgPSBbXTtcclxuXHJcbiAgZm9yKGk9MDtpPHVzZXJzTGlzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICBjaGFubmVsQXJyYXkucHVzaChcInVzZXJfXCIrdXNlcnNMaXN0W2ldLmlkKTtcclxuICB9XHJcblxyXG4gIGFzc2lnblRvVXNlcnMocHJvY2Vzc1dvcmtmbG93TWVzc2FnZShOT1RJRklDQVRJT05fVVNFUl9NU0dfQUNDRVBULCBzcHV1aWQpLCBjaGFubmVsQXJyYXkpO1xyXG5cclxufTsqL1xyXG5cclxuLypmdW5jdGlvbiBhc3NpZ25Ub1VzZXJzKG1lc3NhZ2UsIGNoYW5uZWxBcnJheSl7XHJcblxyXG4gICAgIHZhciBjaGFubmVscyA9IGNoYW5uZWxBcnJheTtcclxuXHJcbiAgICAgdmFyIG5vdGlmaWNhdGlvbiA9ICB7IFxyXG4gICAgICAgICAgXCJfaWRcIjogZ2VuZXJhdGVVVUlEKCksXHJcbiAgICAgICAgICBcImNoYW5uZWxzXCI6Y2hhbm5lbHMsXHJcbiAgICAgICAgICBcIm1lc3NhZ2VcIjogbWVzc2FnZSxcclxuICAgICAgICAgIFwibWVzc2FnZVR5cGVcIjogXCJpbmZvXCIsXHJcbiAgICAgICAgICBcImNyZWF0ZWREYXRlVGltZVwiOiBtb21lbnQoKS5mb3JtYXQoKSxcclxuICAgICAgICAgIFwicmVhZFwiOiBmYWxzZSxcclxuICAgICAgICAgIFwicmVhZERhdGVUaW1lXCI6IFwiXCIsXHJcbiAgICAgICAgICBcInR5cGVcIjogXCJub3RpZmljYXRpb25cIixcclxuICAgICAgICAgIFwic2VuZGVyVXNlcklkXCI6IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkXHJcbiAgICAgICB9O1xyXG5cclxuICAgICAgIGNvbnNvbGUubG9nKG5vdGlmaWNhdGlvbik7XHJcbiAgICAgICBkYW8udXBzZXJ0KG5vdGlmaWNhdGlvbik7XHJcblxyXG4gIH07Ki9cclxuXHJcbmZ1bmN0aW9uIHByb2Nlc3NXb3JrZmxvd01lc3NhZ2UobWVzc2FnZSwgc3B1dWlkKSB7XHJcblxyXG4gICAgdmFyIHJlcGxhY2VkTXNnID0gbWVzc2FnZTtcclxuXHJcbiAgICBpZiAocmVwbGFjZWRNc2cuaW5kZXhPZignI0lOU1RBTkNFX0xBQkVMJykgIT09IC0xKSB7XHJcbiAgICAgICAgdmFyIHZhbCA9IEpTT04ueHBhdGgoXCIvaW5zdGFuY2UvcHJvY2Vzc2VzL3N1YlByb2Nlc3Nlc1t1dWlkIGVxICdcIiArIHNwdXVpZCArIFwiJ10vbGFiZWxcIiwgYXBwLlNDT1BFLndvcmtmbG93LCB7fSlbMF07XHJcbiAgICAgICAgcmVwbGFjZWRNc2cgPSByZXBsYWNlZE1zZy5yZXBsYWNlKCcjSU5TVEFOQ0VfTEFCRUwnLCB2YWwpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBpZiAocmVwbGFjZWRNc2cuaW5kZXhPZignI1VTRVJfTkFNRScpICE9PSAtMSkge1xyXG4gICAgICAgIHZhciB2YWwgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXS9zdGVwL2Fzc2lnbmVkVG8vbmFtZVwiLCBhcHAuU0NPUEUud29ya2Zsb3csIHt9KVswXTtcclxuICAgICAgICByZXBsYWNlZE1zZyA9IHJlcGxhY2VkTXNnLnJlcGxhY2UoJyNVU0VSX05BTUUnLCB2YWwpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBpZiAocmVwbGFjZWRNc2cuaW5kZXhPZignI1BST0ZJTEVfVElUTEUnKSAhPT0gLTEpIHtcclxuICAgICAgICB2YXIgdmFsID0gYXBwLnByb2ZpbGUudGl0bGU7XHJcbiAgICAgICAgcmVwbGFjZWRNc2cgPSByZXBsYWNlZE1zZy5yZXBsYWNlKCcjUFJPRklMRV9USVRMRScsIHZhbCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGlmIChyZXBsYWNlZE1zZy5pbmRleE9mKCcjUFJPRklMRV9UWVBFJykgIT09IC0xKSB7XHJcbiAgICAgICAgdmFyIHZhbCA9IGFwcC5TQ09QRS5BUFBfQ09ORklHLm5hbWU7XHJcbiAgICAgICAgcmVwbGFjZWRNc2cgPSByZXBsYWNlZE1zZy5yZXBsYWNlKCcjUFJPRklMRV9UWVBFJywgdmFsKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJlcGxhY2VkTXNnLmluZGV4T2YoJyNWQVJfU1BVVUlEJykgIT09IC0xKSB7XHJcbiAgICAgICAgdmFyIHZhbCA9IHNwdXVpZDtcclxuICAgICAgICByZXBsYWNlZE1zZyA9IHJlcGxhY2VkTXNnLnJlcGxhY2UoJyNWQVJfU1BVVUlEJywgdmFsKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlcGxhY2VkTXNnO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gX2dldE5hbWUoYXJyLCBsYW5nKSB7XHJcbiAgICBpZiAoYXJyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoYXJyW2ldLl9sYW5nID09PSBsYW5nKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYXJyW2ldLnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuZnVuY3Rpb24gX2dldE5hbWVCeUxhbmcob2JqKSB7XHJcbiAgICB2YXIgbGFuZyA9IHNlcnZpY2UuZ2V0TGFuZ3VhZ2UoKTtcclxuICAgIHZhciBleHByID0gJ29iai4nICsgbGFuZztcclxuICAgIHJldHVybiBldmFsKGV4cHIpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gICAgcHJlUmVxdWlzaXRlczogcHJlUmVxdWlzaXRlcyxcclxuICAgIHByZUFjdGlvbnM6IHByZUFjdGlvbnMsXHJcbiAgICBzdWJQcm9jZXNzOiBzdWJQcm9jZXNzLFxyXG4gICAgaW5kaWNhdG9yRG9jczogaW5kaWNhdG9yRG9jcyxcclxuICAgIHRhc2s6IHRhc2ssXHJcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2l0aW9uLFxyXG4gICAgYXNzaWduVXNlcjogYXNzaWduVXNlclxyXG5cclxufSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8qKlxyXG4gKiBVdGlsaXR5IE1vZHVsZVxyXG4gKlxyXG4gKiBAbW9kdWxlIGxpYi91dGlsXHJcbiAqXHJcbiAqIEBhdXRob3IgQnJlbnQgR29yZG9uXHJcbiAqIEB2ZXJzaW9uIDAuMS4wXHJcbiAqXHJcbiAqIEBkZXNjcmlwdGlvblxyXG4gKiBXb3JrZmxvdyB1dGlsaXR5IG1vZHVsZSB1c2VkIHRvIGZvcm1hdCB0aGUgcmV0dXJuIGFuZCBlcnJvciBvYmplY3RzLCBhbmRcclxuICogY29udGFpbnMgc29tZSBvdGhlciB1dGlsaXR5IGZ1bmN0aW9ucyBzdWNoIGFzIGEgc3luYyBsb29wIGFuZCBjb21wYXJlLlxyXG4gKlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBTdWNjZXNzIGJsb2NrIHJldHVybiBvYmplY3QsIGNvbnRhaW5zIGEgbWVzc2FnZSBhbmQgb3B0aW9uYWwgZGF0YSBvYmplY3QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gdGhlIHN1Y2Nlc3MgbWVzc2FnZVxyXG4gKiBAcGFyYW0ge3N0cmluZ3xPYmplY3R9IFtkYXRhXSAtIHRoZSBzdWNjZXNzIHJldHVybmVkIGRhdGFcclxuICpcclxuICogQGV4YW1wbGVcclxuICogLy8gUmV0dXJuIHN1Y2Nlc3Mgd2l0aG91dCBhIGRhdGEgYmxvY2tcclxuICogdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1N1Y2Nlc3MgbWVzc2FnZSBnb2VzIGhlcmUuLi4nKTtcclxuICpcclxuICogQHJldHVybiB7T2JqZWN0fSAtIHdpdGggbWVzc2FnZSBhbmQgZGF0YSBwcm9wZXJ0aWVzXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiBzdWNjZXNzKG1lc3NhZ2UsIGRhdGEpe1xyXG5cdHJldHVybiB7XHJcblx0XHRtZXNzYWdlOiBtZXNzYWdlLFxyXG5cdFx0ZGF0YTogZGF0YVxyXG5cdH07XHJcbn07XHJcblxyXG4vKipcclxuICogV2FybmluZyBibG9jayByZXR1cm4gb2JqZWN0LCBjb250YWlucyBhIG1lc3NhZ2UgYW5kIG9wdGlvbmFsIGRhdGEgb2JqZWN0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIHRoZSB3YXJuaW5nIG1lc3NhZ2VcclxuICogQHBhcmFtIHtzdHJpbmd8T2JqZWN0fSBbZGF0YV0gLSB0aGUgcmV0dXJuZWQgZGF0YVxyXG4gKlxyXG4gKiBAZXhhbXBsZVxyXG4gKiAvLyBSZXR1cm4gc3VjY2VzcyB3aXRob3V0IGEgZGF0YSBibG9ja1xyXG4gKiB2YXIgc3VjY2VzcyA9IHV0aWwud2FybignV2FybmluZyBtZXNzYWdlIGdvZXMgaGVyZS4uLicpO1xyXG4gKlxyXG4gKiBAcmV0dXJuIHtPYmplY3R9IHdpdGggbWVzc2FnZSBhbmQgZGF0YSBwcm9wZXJ0aWVzLCBhbmQgbG9ncyB0aGUgd2FybmluZyB0byB0aGUgY29uc29sZS5cclxuICpcclxuICovXHJcbmZ1bmN0aW9uIHdhcm4obWVzc2FnZSwgZGF0YSl7XHJcblx0Y29uc29sZS53YXJuKGRhdGEpO1xyXG5cdHJldHVybiB7XHJcblx0XHR3YXJuaW5nOiBtZXNzYWdlLFxyXG5cdFx0ZGF0YTogZGF0YVxyXG5cdH07XHJcbn07XHJcblxyXG4vKipcclxuICogRXJyb3IgYmxvY2sgSlMgZXJyb3Igb2JqZWN0LCBjb250YWlucyBhIGNvZGUgYW5kIG1lc3NhZ2UgZm9yIHRoZSBlcnJvci5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGNvZGUgLSB0aGUgZXJyb3IgY29kZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIHRoZSBlcnJvciBtZXNzYWdlXHJcbiAqXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBzdWNjZXNzID0gdXRpbC5lcnJvcignRXJyb3IwMDEnLCdFcnJvciBtZXNzYWdlIGdvZXMgaGVyZS4uLicpO1xyXG4gKlxyXG4gKiBAcmV0dXJuIHtPYmplY3R9IHdpdGggYSBjb2RlIGFuZCBtZXNzYWdlIHByb3BlcnRpZXMuXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiBlcnJvcihjb2RlLCBtZXNzYWdlKXtcclxuXHR2YXIgZXJyID0gbmV3IEVycm9yKCcnKTtcclxuXHRlcnIubmFtZSA9IGNvZGU7XHJcblx0ZXJyLm1lc3NhZ2UgPSBtZXNzYWdlO1xyXG5cdHJldHVybiBlcnI7XHJcbn07XHJcblxyXG4vKipcclxuICogQSBsb29wIHdoaWNoIGNhbiBsb29wIFggYW1vdW50IG9mIHRpbWVzLCB3aGljaCBjYXJyaWVzIG91dFxyXG4gKiBhc3luY2hyb25vdXMgY29kZSwgYnV0IHdhaXRzIGZvciB0aGF0IGNvZGUgdG8gY29tcGxldGUgYmVmb3JlIGxvb3BpbmcuXHJcbiAqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBpdGVyYXRpb25zIC0gdGhlIG51bWJlciBvZiBpdGVyYXRpb25zIHRvIGNhcnJ5IG91dFxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBwcm9jZXNzIC0gdGhlIGNvZGUvZnVuY3Rpb24gd2UncmUgcnVubmluZyBmb3IgZXZlcnlcclxuICogaXRlcmF0aW9uXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGV4aXQgLSBhbiBvcHRpb25hbCBjYWxsYmFjayB0byBjYXJyeSBvdXQgb25jZSB0aGUgbG9vcFxyXG4gKiBoYXMgY29tcGxldGVkXHJcbiAqXHJcbiAqIEBleGFtcGxlXHJcbiAqIHV0aWwuc3luY0xvb3AoNSwgZnVuY3Rpb24obG9vcCl7XHJcbiAqIFx0dmFyIGNvdW50ZXIgPSBsb29wLml0ZXJhdGlvbigpO1xyXG4gKiBcdC8vIEFkZCBhc3luYyBjYWxscyBoZXJlLi5cclxuICpcclxuICogfSwgZnVuY3Rpb24oKXtcclxuICogXHQvLyBPbiBjb21wbGV0ZSBwZXJmb3JtIGFjdGlvbnMgaGVyZS4uLlxyXG4gKlxyXG4gKiB9KTtcclxuICpcclxuICogQHJldHVybiB7T2JqZWN0fSB0aGUgbG9vcCBjb250cm9sIG9iamVjdC5cclxuICpcclxuICovXHJcbmZ1bmN0aW9uIHN5bmNMb29wKGl0ZXJhdGlvbnMsIHByb2Nlc3MsIGV4aXQpe1xyXG4gICAgdmFyIGluZGV4ID0gMCxcclxuICAgICAgICBkb25lID0gZmFsc2UsXHJcbiAgICAgICAgc2hvdWxkRXhpdCA9IGZhbHNlO1xyXG4gICAgdmFyIGxvb3AgPSB7XHJcbiAgICAgICAgbmV4dDpmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZihkb25lKXtcclxuICAgICAgICAgICAgICAgIGlmKHNob3VsZEV4aXQgJiYgZXhpdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV4aXQoKTsgLy8gRXhpdCBpZiB3ZSdyZSBkb25lXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gSWYgd2UncmUgbm90IGZpbmlzaGVkXHJcbiAgICAgICAgICAgIGlmKGluZGV4IDwgaXRlcmF0aW9ucyl7XHJcbiAgICAgICAgICAgICAgICBpbmRleCsrOyAvLyBJbmNyZW1lbnQgb3VyIGluZGV4XHJcbiAgICAgICAgICAgICAgICBwcm9jZXNzKGxvb3ApOyAvLyBSdW4gb3VyIHByb2Nlc3MsIHBhc3MgaW4gdGhlIGxvb3BcclxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIHdlJ3JlIGRvbmVcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlOyAvLyBNYWtlIHN1cmUgd2Ugc2F5IHdlJ3JlIGRvbmVcclxuICAgICAgICAgICAgICAgIGlmKGV4aXQpIGV4aXQoKTsgLy8gQ2FsbCB0aGUgY2FsbGJhY2sgb24gZXhpdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpdGVyYXRpb246ZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIGluZGV4IC0gMTsgLy8gUmV0dXJuIHRoZSBsb29wIG51bWJlciB3ZSdyZSBvblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYnJlYWs6ZnVuY3Rpb24oZW5kKXtcclxuICAgICAgICAgICAgZG9uZSA9IHRydWU7IC8vIEVuZCB0aGUgbG9vcFxyXG4gICAgICAgICAgICBzaG91bGRFeGl0ID0gZW5kOyAvLyBQYXNzaW5nIGVuZCBhcyB0cnVlIG1lYW5zIHdlIHN0aWxsIGNhbGwgdGhlIGV4aXQgY2FsbGJhY2tcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgbG9vcC5uZXh0KCk7XHJcbiAgICByZXR1cm4gbG9vcDtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGNvbXBhcmUoc3ViamVjdCwgb3BlcmF0b3IsIHZhbHVlKSB7XHJcbiAgXHRzd2l0Y2ggKG9wZXJhdG9yKSB7XHJcbiAgXHRcdGNhc2UgJ2dyZWF0ZXJUaGFuJzpcclxuXHRcdFx0cmV0dXJuIHN1YmplY3QgPiB2YWx1ZTtcclxuXHRcdGNhc2UgJ2xlc3NUaGFuJzpcclxuXHRcdFx0cmV0dXJuIHN1YmplY3QgPCB2YWx1ZTtcclxuXHRcdGNhc2UgJ2dyZWF0ZXJUaGFuRXF1YWwnOlxyXG5cdFx0XHRyZXR1cm4gc3ViamVjdCA+PSB2YWx1ZTtcclxuXHRcdGNhc2UgJ2xlc3NUaGFuRXF1YWwnOlxyXG5cdFx0XHRyZXR1cm4gc3ViamVjdCA8PSB2YWx1ZTtcclxuXHRcdGNhc2UgJ2VxdWFsVG8nOlxyXG5cdFx0XHRyZXR1cm4gc3ViamVjdCA9PT0gdmFsdWU7XHJcblx0XHRjYXNlICdub3RFcXVhbFRvJzpcclxuXHRcdFx0cmV0dXJuIHN1YmplY3QgIT09IHZhbHVlO1xyXG4gIFx0fVxyXG59O1xyXG5cclxuZnVuY3Rpb24gZ2V0TmFtZShhcnIsIGxhbmcpe1xyXG5cdGlmIChhcnIgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoIDsgaSsrKSB7XHJcblx0XHRcdGlmIChhcnJbaV0uaTE4bi5fbGFuZyA9PT0gbGFuZykge1xyXG5cdFx0XHRcdHJldHVybiBhcnJbaV0uaTE4bi52YWx1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gXHRzdWNjZXNzOiBzdWNjZXNzLFxyXG4gXHR3YXJuOiB3YXJuLFxyXG4gXHRlcnJvcjogZXJyb3IsXHJcbiBcdHN5bmNMb29wOiBzeW5jTG9vcCxcclxuIFx0Y29tcGFyZTogY29tcGFyZSxcclxuXHRnZXROYW1lOiBnZXROYW1lXHJcblxyXG4gfVxyXG4iXX0=
