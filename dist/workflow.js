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

                        var status = action.method.indicator.updateStatus;
                        var indicatorSetId = action.method.indicator.indicatorSetId;

                        var args = [];
                        args.push(_WFInstance);
                        args.push(uuid);
                        args.push(status);
                        args.push(indicatorSetId);
                        // Keep indicator functions in indiator file istead of form file.

                        form.markUpdateIndicator(args).then(function(result) {
                            resolve(result.data);
                        }, function(err) {
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
                        var process_CurrentStepNamei18 = JSON.xpath("/steps[_seq eq '" + stepSeq + "']/name/i18n", configSubProcess, {})[0];
                        var process_CurrentStepName = _getNameByLang(process_CurrentStepNamei18);

                        var processName = _getNameByLang(configSubProcess.name.i18n);

                        var notficationRequest = {
                            "source": "remote",
                            "type": "notificationRequest",
                            "_id": spuuid + ":notificationRequest",
                            "channels": channels,
                            "communityId": app.SCOPE.getCommunityId(),
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
                        /**
                         * 
                         if (task.assign.default != undefined) {
                             var userId = task.assign.default.userId;
                             var username = task.assign.default.userName;

                             var assignee = model.assignedTo; 
                             assignee.name = username + "";
                             assignee.userId = userId + "";

                             resolve('Assigned to default user');

                         } else {

                             console.log('Error in assignment. Default user not specified.');
                             reject('Error in assignment. Default user not specified.');

                         }

                         */

                        var assignee = model.assignedTo;
                        assignee.name = "";
                        assignee.userId = "";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VzZXJzL0hhc2FuL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImluZGV4LmpzIiwibGliL2FjdGlvbnMuanMiLCJsaWIvZm9ybS5qcyIsImxpYi9oZWxwZXIuanMiLCJsaWIvaW50ZXJmYWNlLmpzIiwibGliL25vZGVWYWx1ZS5qcyIsImxpYi9wcm9jZXNzLmpzIiwibm9kZV9tb2R1bGVzL3V0aWxpdHkvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaG1CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Z0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoeUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgUHJvY2VzcyA9IHJlcXVpcmUoJy4vbGliL3Byb2Nlc3MnKTtcclxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsaXR5Jyk7XHJcbnZhciB1c2VySW50ZXJmYWNlID0gcmVxdWlyZSgnLi9saWIvaW50ZXJmYWNlJyk7XHJcblxyXG4vKmdsb2JhbHMgKi9cclxuXHJcbi8qKlxyXG4gKiBBIG5ldyBXb3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZSBjb250YWlucyB0aGUgcmVmZXJlbmNlIHRvIHRoZSBhcHBsaWNhdGlvblxyXG4gKiBhbmQgYXNzb2NpYXRlZCBwcm9maWxlIHdoaWNoIGl0IHJlcXVpcmVzIGFzIHRoZSBmaXJzdCB0d28gcGFyYW1ldGVycy4gSXQgYWxzb1xyXG4gKiByZXF1aXJlcyBhIHdvcmtmbG93IGNvbmZpZ3VyYXRpb24sIGFzIHRoZSB0aGlyZCBwYXJhbWV0ZXIsIHdoaWNoIGlzIHVzZWQgdG9cclxuICogZGVzY2liZSB0aGUgd29ya2Zsb3cgcHJvY2Vzc2VzLiBJZiBhIHdvcmtmbG93IGluc3RhbmNlIGV4aXN0cyB5b3UgY2FuIHBhc3MgaXRcclxuICogaW4gYXMgdGhlIGZvdXJ0aCBwYXJhbWV0ZXIgd2hpY2ggaXQgd2lsbCB0aGVuIHVzZSwgZWxzZSBjcmVhdGUgYSBuZXcgb25lLlxyXG4gKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHByb2ZpbGUgLSBUaGUgY3VycmVudCBwcm9maWxlIGlkXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBhcHAgLSBUaGUgYXNzb2NpYXRlZCBhcHBsaWNhdGlvbiBpZFxyXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIC0gVGhlIGFwcGxpY2F0aW9uIHdvcmtmbG93IGNvbmZpZ3VyYXRpb24gLyBkZWZpbml0aW9uXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbaW5zdGFuY2VdIC0gQW4gZXhpc3RpbmcgYXBwbGljYXRpb24gcHJvZmlsZSB3b3JrZmxvdyBpbnN0YW5jZSBiYXNlZFxyXG4gKiBvbiB0aGUgZGVmaW5pdGlvblxyXG4gKlxyXG4gKiBAYXV0aG9yIEJyZW50IEdvcmRvblxyXG4gKiBAdmVyc2lvbiAwLjEuMFxyXG4gKlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgY29uZmlnID0geyAnX2lkJzogJ2FiYzEyMycgfTtcclxuXHJcbiAqIHZhciBpbnN0YW5jZSA9IHsgJ19pZCc6ICdpbnN0YW5jZV9hYmMxMjMnIH07XHJcblxyXG4gKiAvLyBJZiB0aGVyZSBpc24ndCBhbiBleGlzdGluZyBpbnN0YW5jZVxyXG4gKiB2YXIgd29ya2Zsb3cgPSBuZXcgV29ya2Zsb3coJzEyMzQnLCAnNTY3OCcsIGNvbmZpZyk7XHJcbiAqIC8vIElmIHRoZXJlIGlzIGFuIGV4aXN0aW5nIGluc3RhbmNlXHJcbiAqIHZhciB3b3JrZmxvdyA9IG5ldyBXb3JrZmxvdygnMTIzNCcsICc1Njc4JywgY29uZmlnLCBpbnN0YW5jZSk7XHJcbiAqXHJcbiAqIEByZXR1cm4ge09iamVjdH0gbmV3IFdvcmtmbG93IG9iamVjdFxyXG4gKlxyXG4gKiBAdGhyb3dzIEVycm9yOiBBIHByb2ZpbGUgaWQgaXMgcmVxdWlyZWRcclxuICogQHRocm93cyBFcnJvcjogQW4gYXBwIGlkIGlzIHJlcXVpcmVkXHJcbiAqIEB0aHJvd3MgRXJyb3I6IEEgd29ya2Zsb3cgY29uZmlndXJhdGlvbiBpcyByZXF1aXJlZFxyXG4gKlxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIFdvcmtmbG93KHByb2ZpbGUsIGNvbW11bml0eUlkLCBhcHAsIGNvbmZpZykge1xyXG4gICAgdmFyIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAvLyBDb21tdW5pdHkgSUQgdmFsaWRhdGlvbiBjaGVja3NcclxuICAgIGlmIChjb21tdW5pdHlJZCA9PSAnJyB8fCBjb21tdW5pdHlJZCA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aHJvdyB1dGlsLmVycm9yKCdQYXJhbVJlcXVpcmVkJywgJ0EgY29tbXVuaXR5IGlkIGlzIHJlcXVpcmVkLicpO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YoY29tbXVuaXR5SWQpICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGNvbW11bml0eSBpZCBtdXN0IGJlIGEgamF2YXNjcmlwdCBzdHJpbmcuJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIF90aGlzLmNvbW11bml0eUlkID0gY29tbXVuaXR5SWQgfHwgJyc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUHJvZmlsZSBJRCB2YWxpZGF0aW9uIGNoZWNrc1xyXG4gICAgaWYgKHByb2ZpbGUgPT0gJycgfHwgcHJvZmlsZSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aHJvdyB1dGlsLmVycm9yKCdQYXJhbVJlcXVpcmVkJywgJ0EgcHJvZmlsZSBpZCBpcyByZXF1aXJlZC4nKTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mKHByb2ZpbGUpICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHByb2ZpbGUgaWQgbXVzdCBiZSBhIGphdmFzY3JpcHQgc3RyaW5nLicpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBfdGhpcy5wcm9maWxlID0gcHJvZmlsZSB8fCAnJztcclxuICAgIH1cclxuXHJcbiAgICAvLyBBcHAgSUQgdmFsaWRhdGlvbiBjaGVja3NcclxuICAgIGlmIChhcHAgPT0gJycgfHwgYXBwID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRocm93IHV0aWwuZXJyb3IoJ1BhcmFtUmVxdWlyZWQnLCAnQW4gYXBwIGlkIGlzIHJlcXVpcmVkLicpO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YoYXBwKSAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBhcHAgaWQgbXVzdCBiZSBhIGphdmFzY3JpcHQgc3RyaW5nLicpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBfdGhpcy5hcHAgPSBhcHAgfHwgJyc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gV29ya2Zsb3cgY29uZmlndXJhdGlvbiB2YWxpZGF0aW9uIGNoZWNrc1xyXG4gICAgaWYgKGNvbmZpZyA9PSAnJyB8fCBjb25maWcgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhyb3cgdXRpbC5lcnJvcignUGFyYW1SZXF1aXJlZCcsICdBIHdvcmtmbG93IGNvbmZpZ3VyYXRpb24gaXMgcmVxdWlyZWQuJyk7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZihjb25maWcpICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIF90aGlzLmNvbmZpZyA9IEpTT04ucGFyc2UoY29uZmlnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgX3RoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFdvcmtmbG93IGluc3RhbmNlIHZhbGlkYXRpb24gY2hlY2tzXHJcbiAgICBfdGhpcy5pbnN0YW5jZTtcclxuICAgIC8vIFdvcmtmbG93IHN1Yi1wcm9jZXNzZXMgdmFsaWRhdGlvbiBjaGVja3NcclxuICAgIF90aGlzLnN1YnByb2Nlc3NlcyA9IFtdO1xyXG4gICAgLy8gV29ya2Zsb3cgaW5kaWNhdG9ycyBwbGFjZSBob2xkZXJcclxuICAgIF90aGlzLmluZGljYXRvcnMgPSBbXTtcclxuICAgIC8vIFdvcmtmbG93IHN1Yi1wcm9jZXNzIHN0ZXAgaGlzdG9yeSBwbGFjZSBob2xkZXJcclxuICAgIF90aGlzLmhpc3RvcnkgPSBbXTtcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBXb3JrZmxvdyBnZXQgcHJvZmlsZSBpZC5cclxuICpcclxuICogQGV4YW1wbGUgXCJcIlxyXG4gKlxyXG4gKiBAcmV0dXJuIFwiXCJcclxuICpcclxuICovXHJcbldvcmtmbG93LnByb3RvdHlwZS5nZXRQcm9maWxlID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wcm9maWxlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdvcmtmbG93IGdldCBhcHAgaWQuXHJcbiAqXHJcbiAqIEBleGFtcGxlIFwiXCJcclxuICpcclxuICogQHJldHVybiBcIlwiXHJcbiAqXHJcbiAqL1xyXG5Xb3JrZmxvdy5wcm90b3R5cGUuZ2V0QXBwID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hcHA7XHJcbn07XHJcblxyXG4vKipcclxuICogV29ya2Zsb3cgZ2V0IGNvbmZpZy5cclxuICpcclxuICogQGV4YW1wbGUgXCJcIlxyXG4gKlxyXG4gKiBAcmV0dXJuIFwiXCJcclxuICpcclxuICovXHJcbldvcmtmbG93LnByb3RvdHlwZS5nZXRDb25maWcgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbmZpZztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXb3JrZmxvdyBnZXQgaW5zdGFuY2UuXHJcbiAqXHJcbiAqIEBleGFtcGxlIFwiXCJcclxuICpcclxuICogQHJldHVybiBcIlwiXHJcbiAqXHJcbiAqL1xyXG5cclxuV29ya2Zsb3cucHJvdG90eXBlLmdldEluc3RhbmNlID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXb3JrZmxvdyBzZXQgdGhlIGluc3RhbmNlIGRhdGEuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC0gdGhlIHdvcmtmbG93IHByb2Nlc3MgaW5zdGFuY2UgZGF0YVxyXG4gKlxyXG4gKiBAZXhhbXBsZSBcIlwiXHJcbiAqXHJcbiAqIEByZXR1cm4gXCJcIlxyXG4gKlxyXG4gKi9cclxuV29ya2Zsb3cucHJvdG90eXBlLnNldEluc3RhbmNlID0gZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgdGhpcy5pbnN0YW5jZSA9IGRhdGE7XHJcbn07XHJcblxyXG4vKipcclxuICogV29ya2Zsb3cgZ2V0IHN1Yi1wcm9jZXNzZXMgZGF0YS5cclxuICpcclxuICogQGV4YW1wbGUgXCJcIlxyXG4gKlxyXG4gKiBAcmV0dXJuIFwiXCJcclxuICpcclxuICovXHJcbldvcmtmbG93LnByb3RvdHlwZS5nZXRTdWJQcm9jZXNzZXMgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLnN1YnByb2Nlc3NlcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXb3JrZmxvdyBzZXQgdGhlIHN1Yi1wcm9jZXNzZXMgZGF0YS5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSB0aGUgd29ya2Zsb3cgcHJvY2VzcyBpbnN0YW5jZSBkYXRhXHJcbiAqXHJcbiAqIEBleGFtcGxlIFwiXCJcclxuICpcclxuICogQHJldHVybiBcIlwiXHJcbiAqXHJcbiAqL1xyXG5Xb3JrZmxvdy5wcm90b3R5cGUuc2V0U3ViUHJvY2Vzc2VzID0gZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgdGhpcy5zdWJwcm9jZXNzZXMgPSBkYXRhO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdvcmtmbG93IGdldCBpbmRpY2F0b3Igc2V0IGRhdGEuXHJcbiAqXHJcbiAqIEBleGFtcGxlIFwiXCJcclxuICpcclxuICogQHJldHVybiBcIlwiXHJcbiAqXHJcbiAqL1xyXG5Xb3JrZmxvdy5wcm90b3R5cGUuZ2V0SW5kaWNhdG9ycyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaW5kaWNhdG9ycztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXb3JrZmxvdyBzZXQgdGhlIGluZGljYXRvciBzZXQgZGF0YS5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSB0aGUgd29ya2Zsb3cgcHJvY2VzcyBpbnN0YW5jZSBkYXRhXHJcbiAqXHJcbiAqIEBleGFtcGxlIFwiXCJcclxuICpcclxuICogQHJldHVybiBcIlwiXHJcbiAqXHJcbiAqL1xyXG5Xb3JrZmxvdy5wcm90b3R5cGUuc2V0SW5kaWNhdG9ycyA9IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgIHRoaXMuaW5kaWNhdG9ycyA9IGRhdGE7XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0IHRoZSB2YXJpYWJsZSB2YWx1ZS5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHByb2Nlc3MgaWRcclxuICogQHBhcmFtIHtudW1iZXJ9IHByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2UgcHJvY2VzcyBzZXFcclxuICogQHBhcmFtIHtzdHJpbmd9IHN1YlByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN1Yi1wcm9jZXNzIGlkXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdWJQcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHN1Yi1wcm9jZXNzIHNlcVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RlcElkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3RlcCBpZFxyXG4gKiBAcGFyYW0ge09iamVjdH0gdmFyaWFibGUgLSB0aGUgV29ya2Zsb3cgdmFyaWFibGUgb2JqZWN0XHJcbiAqXHJcbiAqIEBleGFtcGxlICcnXHJcbiAqXHJcbiAqIEByZXR1cm4gJydcclxuICpcclxuICovXHJcbi8vIFdvcmtmbG93LnByb3RvdHlwZS5zZXRWYXJpYWJsZSA9IGZ1bmN0aW9uKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdGVwSWQsIHZhcmlhYmxlKXtcclxuLy8gXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG4vLyBcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuLy8gXHRcdHRyeSB7XHJcbi8vIFx0XHRcdFByb2Nlc3MuZ2V0VmFyaWFibGUocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwgdmFyaWFibGUpLnRoZW4oZnVuY2lvbihyZXN1bHQpe1xyXG4vLyBcdFx0XHRcdHJlc29sdmUocmVzdWx0LmRhdGEpO1xyXG4vLyBcdFx0XHR9LCBmdW5jdGlvbihlcnIpe1xyXG4vLyBcdFx0XHRcdHJlamVjdChlcnIpO1xyXG4vLyBcdFx0XHR9KVxyXG4vLyBcdFx0fSBjYXRjaCAoZXJyKSB7XHJcbi8vIFx0XHRcdHJlamVjdChlcnIpO1xyXG4vLyBcdFx0fVxyXG5cclxuLy8gXHR9KTtcclxuLy8gfTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIHZhcmlhYmxlIHZhbHVlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gcHJvY2VzcyBpZFxyXG4gKiBAcGFyYW0ge251bWJlcn0gcHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBwcm9jZXNzIHNlcVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3ViUHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3ViLXByb2Nlc3MgaWRcclxuICogQHBhcmFtIHtudW1iZXJ9IHN1YlByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2Ugc3ViLXByb2Nlc3Mgc2VxXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdGVwSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdGVwIGlkXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSB0aGUgV29ya2Zsb3cgdmFyaWFibGUgaWRcclxuICpcclxuICogQGV4YW1wbGUgJydcclxuICpcclxuICogQHJldHVybiAnJ1xyXG4gKlxyXG4gKi9cclxuLy8gV29ya2Zsb3cucHJvdG90eXBlLmdldFZhcmlhYmxlID0gZnVuY3Rpb24ocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwga2V5KXtcclxuLy8gXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG4vLyBcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuLy8gXHRcdHRyeSB7XHJcbi8vIFx0XHRcdFByb2Nlc3Muc2V0VmFyaWFibGUocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwga2V5KS50aGVuKGZ1bmNpb24ocmVzdWx0KXtcclxuLy8gXHRcdFx0XHRyZXNvbHZlKHJlc3VsdC5kYXRhKTtcclxuLy8gXHRcdFx0fSwgZnVuY3Rpb24oZXJyKXtcclxuLy8gXHRcdFx0XHRyZWplY3QoZXJyKTtcclxuLy8gXHRcdFx0fSlcclxuLy8gXHRcdH0gY2F0Y2ggKGVycikge1xyXG4vLyBcdFx0XHRyZWplY3QoZXJyKTtcclxuLy8gXHRcdH1cclxuXHJcbi8vIFx0fSk7XHJcbi8vIH07XHJcblxyXG4vKipcclxuICogVGhpcyBtZXRob2QgY3JlYXRlcyBhIG5ldyB3b3JrZmxvdyBwcm9jZXNzIGkuZS4gaXQgY3JlYXRlcyBhIHdvcmtmbG93IHByb2Nlc3NlcyBpbnN0YW5jZVxyXG4gKiBvYmplY3Qgd2l0aCB0aGUgbWluaW11bSByZXF1aXJlZCBkYXRhLiBUaGlzIGluc3RhbmNlIGNhbiBiZSByZWZlcmVuY2VkIGluIHRoZSBmb2xsb3dpbmdcclxuICogd2F5LCBzZWUgZXhhbXBsZSBiZWxvdy5cclxuICpcclxuICogQGV4YW1wbGVcclxuICogdmFyIGNvbmZpZyA9IHsgJ19pZCc6ICdhYmMxMjMnIH07XHJcblxyXG4gKiB2YXIgd29ya2Zsb3cgPSBuZXcgV29ya2Zsb3coJzEyMzQnLCAnNTY3OCcsIGNvbmZpZyk7XHJcbiAqIHdvcmtmbG93LmNyZWF0ZSgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcclxuICpcdGNvbnNvbGUubG9nKHJlc3VsdC5tZXNzYWdlKTtcclxuICpcdC8vIFRoZSBmb2xsb3dpbmcgcHJvcGVydGllcyBjYW4gbm93IGJlIGFjY2Vzc2VkXHJcbiAqIFx0dmFyIHByb2ZpbGUgPSB3b3JrZmxvdy5wcm9maWxlO1xyXG4gKiBcdHZhciBhcHAgPSB3b3JrZmxvdy5hcHA7XHJcbiAqIFx0dmFyIGNvbmZpZyA9IHdvcmtmbG93LmNvbmZpZztcclxuICpcdC8vIE9uIHN1Y2Nlc3MgeW91IGNhbiBhY2Nlc3MgdGhlIGluc3RhbmNlIHRoZSBmb2xsb3dpbmcgd2F5XHJcbiAqXHR2YXIgaW5zdGFuY2UgPSB3b3JrZmxvdy5pbnN0YW5jZTtcclxuICogfSwgZnVuY3Rpb24oZXJyb3Ipe1xyXG4gKlx0Y29uc29sZS5sb2coZXJyb3IpO1xyXG4gKiB9KTtcclxuICpcclxuICogQHJldHVybiB7T2JqZWN0fSBuZXcgV29ya2Zsb3cgaW5zdGFuY2Ugd2l0aCB1cGRhdGVkIGluc3RhbmNlIGRhdGEuXHJcbiAqXHJcbiAqL1xyXG5cclxuV29ya2Zsb3cucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAoX3RoaXMuaW5zdGFuY2UgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHdhcm4gPSB1dGlsLndhcm4oJ0luc3RhbmNlIGFscmVhZHkgZXhpc3RzLicsIF90aGlzKVxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh3YXJuKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgd29ya2Zsb3cgcHJvY2Vzc2VzIGluc3RhbmNlIG9iamVjdFxyXG4gICAgICAgICAgICAgICAgdmFyIG1vZGVsID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIF9pZDogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgdmVyc2lvbjogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3dvcmtmbG93SW5zdGFuY2UnLFxyXG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NlczogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbm5lbHM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21tdW5pdHlfXCIgKyBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxlX1wiICsgYXBwLlNDT1BFLnByb2ZpbGVJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHBsaWNhdGlvbl9cIiArIGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbW11bml0eV9cIiArIGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpICsgXCJfYXBwbGljYXRpb25fXCIgKyBhcHAuU0NPUEUuYXBwbGljYXRpb25JZFxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgbW9kZWwuX2lkID0gX3RoaXMucHJvZmlsZSArICc6cHJvY2Vzc2VzJztcclxuICAgICAgICAgICAgICAgIG1vZGVsLnZlcnNpb24gPSBfdGhpcy5jb25maWcudmVyc2lvbjtcclxuICAgICAgICAgICAgICAgIF90aGlzLmluc3RhbmNlID0gbW9kZWw7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya2Zsb3cgcHJvY2Vzc2VzIGluc3RhbmNlIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5LicsIF90aGlzKTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogV29ya2Zsb3cgaW5pdGlhbGlzZSwgdGhpcyBmdW5jdGlvbiBleGVjdXRlcyBhIHByb2Nlc3Mgd2l0aGluIGEgd29ya2Zsb3dcclxuICogY29uZmlndXJhdGlvbi5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NJZCAtIHRoZSBwcm9jZXNzIGlkIHRvIHByb2Nlc3NcclxuICogQHBhcmFtIHtvYmplY3R9IFtkYXRhXSAtIHRoZSBpbnB1dCBkYXRhIHRvIHByb2Nlc3NcclxuICpcclxuICogQGV4YW1wbGVcclxuICogV29ya2Zsb3cuaW5pdGlhbGlzZSgncHJvY2Vzc0lkJywgeyB2YWxpZERhdGU6ICdkYXRlJyB9KTtcclxuICpcclxuICogQHJldHVybiBcIlwiXHJcbiAqXHJcbiAqL1xyXG5Xb3JrZmxvdy5wcm90b3R5cGUuaW5pdGlhbGlzZSA9IGZ1bmN0aW9uKHByb2Nlc3NJZCwgZGF0YSwgc3VicHJvZmlsZUlkKSB7XHJcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHZhciBjb25maWdQcm9jZXNzID0gW107XHJcbiAgICAgICAgICAgIC8vIENoZWNrIHRoZSBwYXNzZWQgaW4gcGFyYW1ldGVyc1xyXG4gICAgICAgICAgICBpZiAocHJvY2Vzc0lkICE9PSAnJyAmJiBwcm9jZXNzSWQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgLy8gR2V0IHRoZSBjdXJyZW50IHByb2Nlc3MgY29uZmlnXHJcbiAgICAgICAgICAgICAgICBjb25maWdQcm9jZXNzID0gX3RoaXMuY29uZmlnLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqUHJvY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmpQcm9jZXNzLl9pZCA9PSBwcm9jZXNzSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9ialByb2Nlc3M7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ1Byb2Nlc3NbMF0uX2lkID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGQ29uZmlnRXJyb3InLCAnTm8gdmFsaWQgcHJvY2VzcyBkZWZpbml0aW9uIGZvdW5kIHdpdGggcHJvY2VzcyBpZDogJyArIHByb2Nlc3NJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25maWdQcm9jZXNzLnB1c2goX3RoaXMuY29uZmlnLnByb2Nlc3Nlc1swXSk7XHJcbiAgICAgICAgICAgICAgICBwcm9jZXNzSWQgPSBfdGhpcy5jb25maWcucHJvY2Vzc2VzWzBdLl9pZDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gR2V0IHRoZSBjdXJyZW50IGxpc3Qgb2YgcHJvY2VzcyBpbnN0YW5jZXNcclxuICAgICAgICAgICAgLy8gdmFyIHByb2Nlc3NTZXEgPSAxO1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudFByb2Nlc3MgPSBbXTtcclxuICAgICAgICAgICAgX3RoaXMuaW5zdGFuY2UucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihwcm9jZXNzSXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHByb2Nlc3NJdGVtLmlkID09IHByb2Nlc3NJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQcm9jZXNzLnB1c2gocHJvY2Vzc0l0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZhciBwcm9jZXNzU2VxID0gY3VycmVudFByb2Nlc3MubGVuZ3RoICsgMTtcclxuICAgICAgICAgICAgLy8gdmFyIG5leHRTZXEgPSBwcm9jZXNzU2VxICsgMTtcclxuICAgICAgICAgICAgLy8gUHVzaCB0aGUgcHJvY2VzcyBvYmplY3QgaW50byB0aGUgYXJyYXlcclxuICAgICAgICAgICAgdmFyIHByb2Nlc3NNb2RlbCA9IHtcclxuICAgICAgICAgICAgICAgIGlkOiAnJyxcclxuICAgICAgICAgICAgICAgIHNlcTogJycsXHJcbiAgICAgICAgICAgICAgICBzdWJQcm9jZXNzZXM6IFtdXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIDEuIFVwZGF0ZSB0aGUgcHJvY2VzcyBpZCBhbmQgc2VxXHJcbiAgICAgICAgICAgIHByb2Nlc3NNb2RlbC5pZCA9IHByb2Nlc3NJZDtcclxuICAgICAgICAgICAgcHJvY2Vzc01vZGVsLnNlcSA9IHByb2Nlc3NTZXE7XHJcbiAgICAgICAgICAgIF90aGlzLmluc3RhbmNlLnByb2Nlc3Nlcy5wdXNoKHByb2Nlc3NNb2RlbCk7XHJcbiAgICAgICAgICAgIC8vIFBhcmFtZXRlcnNcclxuICAgICAgICAgICAgdmFyIHN1YlByb2Nlc3NJZCA9IGNvbmZpZ1Byb2Nlc3NbMF0uc3ViUHJvY2Vzc2VzWzBdLl9pZDtcclxuICAgICAgICAgICAgdmFyIHN1YlByb2Nlc3NTZXEgPSAxO1xyXG4gICAgICAgICAgICBfdGhpcy5pbnN0YW5jZS5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHByb2Nlc3NJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb2Nlc3NJdGVtLmlkID09IHByb2Nlc3NJZCAmJiBwcm9jZXNzSXRlbS5zZXEgPT0gcHJvY2Vzc1NlcSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzU2VxID0gcHJvY2Vzc0l0ZW0uc3ViUHJvY2Vzc2VzLmxlbmd0aCArIDFcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vIENhbGwgdGhlIHN1YnByb2Nlc3MgbWV0aG9kXHJcblxyXG4gICAgICAgICAgICBQcm9jZXNzLnN1YlByb2Nlc3MocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIGRhdGEsIF90aGlzKS50aGVuKGZ1bmN0aW9uKHN1YlByb2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIC8vIEdlbmVyYXRlIHRoZSB1dWlkXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHV1aWQgPSBzdWJQcm9jZXNzLmRhdGEuX2lkOyAvL190aGlzLnByb2ZpbGUgKyAnOicgKyBfdGhpcy5hcHAgKyAnOicgKyBwcm9jZXNzSWQgKyAnOicgKyBwcm9jZXNzU2VxICsgJzonICsgc3ViUHJvY2Vzc0lkICsgJzonICsgc3ViUHJvY2Vzc1NlcTtcclxuICAgICAgICAgICAgICAgIHZhciBsYWJlbCA9IGRhdGEubGFiZWw7XHJcbiAgICAgICAgICAgICAgICAvLyBCdWlsZCB0aGUgc3ViLXByb2Nlc3MgcmVmZXJlbmNlIG9iamVjdFxyXG5cclxuICAgICAgICAgICAgICAgIC8vVE9ETzogQ2hhbmdlIHJlcXVpcmVkIHRvIG1vdmUgaXNBY3RpdmUgdG8gc3ViUHJvY2VzcyBmaWxlLlJlbW92ZSBmcm9tIGhlcmVcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgc3ViUHJvY2Vzc1JlZiA9IHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogc3ViUHJvY2Vzc0lkLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1YnByb2ZpbGVJZDogc3VicHJvZmlsZUlkLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcTogc3ViUHJvY2Vzc1NlcSxcclxuICAgICAgICAgICAgICAgICAgICB1dWlkOiB1dWlkLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBsYWJlbFxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUgcmVmZXJlbmNlIHRvIHRoZSBwcm9jZXNzIG1vZGVsXHJcbiAgICAgICAgICAgICAgICBwcm9jZXNzTW9kZWwuc3ViUHJvY2Vzc2VzLnB1c2goc3ViUHJvY2Vzc1JlZik7XHJcbiAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIHN1YlByb2Nlc3MgbW9kZWwgdG8gdGhlIHN1YnByb2Nlc3NlcyBhcnJheVxyXG4gICAgICAgICAgICAgICAgLy9fdGhpcy5zdWJwcm9jZXNzZXMucHVzaChzdWJQcm9jZXNzLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgLy8gX3RoaXMuaW5zdGFuY2UucHJvY2Vzc2VzLnB1c2gocHJvY2Vzc01vZGVsKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBfdGhpcy5pbnN0YW5jZS5wcm9jZXNzZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByb2Nlc3NJdGVtID0gX3RoaXMuaW5zdGFuY2UucHJvY2Vzc2VzW2luZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvY2Vzc0l0ZW0uaWQgPT0gcHJvY2Vzc0lkICYmIHByb2Nlc3NJdGVtLnNlcSA9PSBwcm9jZXNzU2VxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgY3VycmVudCBwcm9jZXNzIGZyb20gdGhlIGFycmF5IGFuZCBhZGQgdGhlIHVwZGF0ZWQgcHJvY2Vzc01vZGVsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmluc3RhbmNlLnByb2Nlc3Nlcy5zcGxpY2UoaW5kZXgsIDEsIHByb2Nlc3NNb2RlbClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFByb2Nlc3MgdGhlIGluZGljYXRvciBkb2N1bWVudHMgd29ya2Zsb3cgcHJvY2Vzc2VzIHVwZGF0ZXNcclxuICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3JzID0gc3ViUHJvY2Vzcy5kYXRhLmluZGljYXRvcnM7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RlcCA9IHN1YlByb2Nlc3MuZGF0YS5zdGVwO1xyXG4gICAgICAgICAgICAgICAgUHJvY2Vzcy5pbmRpY2F0b3JEb2NzKHByb2Nlc3NJZCwgaW5kaWNhdG9ycywgc3RlcCwgX3RoaXMpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1Byb2Nlc3M6ICcgKyBfdGhpcy5jb25maWcucHJvY2Vzc2VzWzBdLl9pZCArICcgaW5pdGlhbGl6ZWQgc3VjY2Vzc2Z1bGx5LicsIF90aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5pbnN0YW5jZS5wcm9jZXNzZXMgPSBfdGhpcy5pbnN0YW5jZS5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhKG9iai5pZCA9PSBwcm9jZXNzSWQgJiYgb2JqLnNlcSA9PSBwcm9jZXNzU2VxKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdvcmtmbG93IHRyYW5zaXRpb24gdG8gdGhlIG5leHQgc3RlcC4gVGhpcyBtb3ZlcyB0aGUgd29ya2Zsb3cgZnJvbSB0aGUgY3VycmVudCBwcm9jZXNzLFxyXG4gKiBzdWItcHJvY2VzcyBzdGVwIHRvIHRoZSBuZXh0IG9uZSBhcyBzcGVjaWZpZWQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBwcm9jZXNzIGlkXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHByb2Nlc3Mgc2VxXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdWJQcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdWItcHJvY2VzcyBpZFxyXG4gKiBAcGFyYW0ge251bWJlcn0gc3ViUHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBzdWItcHJvY2VzcyBzZXFcclxuICogQHBhcmFtIHtzdHJpbmd9IHN0ZXBJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN0ZXAgaWQgXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0cmFuc2l0aW9uSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiB0cmFuc2l0aW9uIGlkXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIC0gYW55IGFkZGl0aW9uYWwgZGF0YSBwYXNzZWQgaW4gYXMga2V5IHZhbHVlIHBhaXJzXHJcbiAqXHJcbiAqIEBleGFtcGxlXHJcbiAqIFdvcmtmbG93LnRyYW5zaXRpb24oJ3Byb2Nlc3NJZCcsIDEsICdzdWJQcm9jZXNzSWQnLCAxLCAnc3RlcElkJywgJ3RyYW5zaXRpb25JZCcsIHsga2V5OiAnJywgdmFsdWU6ICcnIH0pO1xyXG4gKlxyXG4gKiBAcmV0dXJuIFwiXCJcclxuICpcclxuICovXHJcbldvcmtmbG93LnByb3RvdHlwZS50cmFuc2l0aW9uID0gZnVuY3Rpb24ocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwgdHJhbnNpdGlvbklkLCBkYXRhLCBzcHV1aWQpIHtcclxuICAgIC8vIFJlLWFzc2lnbiB0aGlzXHJcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHZhciBtb2RlbCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL3N0ZXAvZGF0YVwiLCBhcHAuU0NPUEUud29ya2Zsb3csIHt9KVswXTtcclxuXHJcbiAgICAgICAgICAgIFByb2Nlc3MudHJhbnNpdGlvbihwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3RlcElkLCB0cmFuc2l0aW9uSWQsIGRhdGEsIF90aGlzLCBzcHV1aWQsIG1vZGVsKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgY3VycmVudCBzdWItcHJvY2VzcyBzdGVwIGRhdGFcclxuICAgICAgICAgICAgICAgIHZhciB1cGRhdGUgPSBmdW5jdGlvbih0eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuaW5zdGFuY2UucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihwcm9jZXNzSXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvY2Vzc0l0ZW0uaWQgPT0gcHJvY2Vzc0lkICYmIHByb2Nlc3NJdGVtLnNlcSA9PSBwcm9jZXNzU2VxKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0l0ZW0uc3ViUHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihzdWJQcm9jZXNzSXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWJQcm9jZXNzSXRlbS5pZCA9PSBzdWJQcm9jZXNzSWQgJiYgc3ViUHJvY2Vzc0l0ZW0uc2VxID09IHN1YlByb2Nlc3NTZXEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnN1YnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24oc3ViUHJvY2Vzc09iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1YlByb2Nlc3NPYmouX2lkID09IHN1YlByb2Nlc3NJdGVtLnV1aWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT0gJ3N0ZXAnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzT2JqLnN0ZXAgPSByZXN1bHQuZGF0YS5zdGVwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcyhyZXN1bHQubWVzc2FnZSwgc3ViUHJvY2Vzc09iaik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PSAnc3RlcENvbXBsZXRlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzT2JqLnN0ZXAgPSByZXN1bHQuZGF0YS5zdGVwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzT2JqLmNvbXBsZXRlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcyhyZXN1bHQubWVzc2FnZSwgc3ViUHJvY2Vzc09iai5zdGVwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRhdGEuc3ViUHJvY2Vzc0NvbXBsZXRlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZSgnc3RlcENvbXBsZXRlJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGUoJ3N0ZXAnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG5cclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuXHJcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXb3JrZmxvdyBhc3NpZ24gdXNlci5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHByb2Nlc3MgaWRcclxuICogQHBhcmFtIHtudW1iZXJ9IHByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2UgcHJvY2VzcyBzZXFcclxuICogQHBhcmFtIHtzdHJpbmd9IHN1YlByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN1Yi1wcm9jZXNzIGlkXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdWJQcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHN1Yi1wcm9jZXNzIHNlcVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RlcElkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3RlcCBpZFxyXG4gKiBAcGFyYW0ge29iamVjdH0gdXNlciAtIHRoZSB1c2VyIGlkIGFuZCBuYW1lIGRhdGFcclxuICpcclxuICogQGV4YW1wbGUgXCJcIlxyXG4gKlxyXG4gKiBAcmV0dXJuIFwiXCJcclxuICpcclxuICovXHJcbldvcmtmbG93LnByb3RvdHlwZS5hc3NpZ25Vc2VyID0gZnVuY3Rpb24ocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHVzZXIpIHtcclxuICAgIC8vIFJlLWFzc2lnbiB0aGUgV29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2UgYXMgX3RoaXNcclxuICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgUHJvY2Vzcy5hc3NpZ25Vc2VyKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCB1c2VyLCBfdGhpcykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pXHJcbn07XHJcblxyXG4vKipcclxuICogV29ya2Zsb3cgdGFzaywgdGhpcyBtZXRob2QgZXhlY3V0ZXMgYSBzcGVjaWZpYyB0YXNrLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIHByb2Nlc3MgaWQgdG8gcHJvY2Vzc1xyXG4gKiBAcGFyYW0ge29iamVjdH0gaW5wdXREYXRhIC0gdGhlIGlucHV0IGRhdGEgdG8gcHJvY2Vzc1xyXG4gKlxyXG4gKiBAZXhhbXBsZVxyXG4gKiBXb3JrZmxvdy5pbml0aWFsaXplKCdwcm9jZXNzSWQnLCB7IHZhbGlkRGF0ZTogJ2RhdGUnIH0pO1xyXG4gKlxyXG4gKiBAcmV0dXJuIFwiXCJcclxuICpcclxuICovXHJcbldvcmtmbG93LnByb3RvdHlwZS51aSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gUmUtYXNzaWduIHRoZSBXb3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZSBhcyBfdGhpc1xyXG4gICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ2V0UHJvY2VzczogZnVuY3Rpb24ocHJvY2Vzc0lkLCBsYW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlckludGVyZmFjZS5nZXRQcm9jZXNzKHByb2Nlc3NJZCwgbGFuZywgX3RoaXMpLnRoZW4oZnVuY3Rpb24obW9kZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShtb2RlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFdvcmtmbG93OyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbGl0eScpO1xyXG52YXIgbm9kZVZhbHVlID0gcmVxdWlyZSgnLi9ub2RlVmFsdWUnKTtcclxudmFyIGZvcm0gPSByZXF1aXJlKCcuL2Zvcm0nKTtcclxuXHJcblxyXG52YXIgZ2F0ZWtlZXBlciA9IG5ldyBHSygpO1xyXG5cclxuLyoqXHJcbiAqIEFjdGlvbnMgTW9kdWxlXHJcbiAqXHJcbiAqIEBtb2R1bGUgbGliL2FjdGlvbnNcclxuICogQGF1dGhvciBIYXNhbiBBYmJhc1xyXG4gKiBAdmVyc2lvbiAyLjAuMFxyXG4gKiBAZGVzY3JpcHRpb24gdGVzdCBkZXNjcmlwdGlvblxyXG4gKiBAY29weXJpZ2h0IEt3YW50dSBMdGQgUlNBIDIwMDktMjAxNS5cclxuICpcclxuICovXHJcblxyXG4vKipcclxuICogIEZvcm0gTW9kdWxlIGFjdGlvbnMgbmVlZHMgdG8gYmUgbW92ZWQgaGVyZS5cclxuICogIFRoaXMgYWN0aW9ucyBtb2R1bGUgd2lsbCBiZSBjZW50YWwgcGxhY2UgdG8gaG9sZCBhbGwgZnVuY3Rpb25zLlxyXG4gKiAgXHJcbiAqL1xyXG5cclxudmFyIGNvbW11bml0eSA9IChmdW5jdGlvbigpIHtcclxuXHJcbiAgICByZXR1cm4ge1xyXG5cclxuICAgICAgICBjcmVhdGVDb21tdW5pdHk6IGZ1bmN0aW9uKF9kZWYsIHV1aWQsIF9XRkluc3RhbmNlKSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IHdvcmtlci5nZXRXb3JrZXJXcmFwcGVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYXBwbGljYXRpb25JZCA9IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG5ldyBEYXRlKCkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZW5kZXJVc2VySWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZDtcclxuICAgICAgICAgICAgICAgIHZhciB1dWlkQ29tbXVuaXR5ID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ0NvbW11bml0eSddL19pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZUNvbW11bml0eVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibmV3Q29tbXVuaXR5SWRcIjogX1dGSW5zdGFuY2UucHJvZmlsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbmRpY2F0b3JVVUlEXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQ29tbXVuaXR5XCI6IHV1aWRDb21tdW5pdHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uKHdvcmtlclN1Y2Nlc3MpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1dvcmtlciBwcm9jZXNzZWQgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24od29ya2VyRmFpbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh3b3JrZXJGYWlsKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHVzZXJKb2luQ29tbXVuaXR5OiBmdW5jdGlvbihfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVsZWFzZUFkb3B0ZWRBcHBsaWNhdGlvbjogZnVuY3Rpb24oX2RlZiwgdXVpZCwgX1dGSW5zdGFuY2UpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY29tbXVuaXR5SWQgPSBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbmV3IERhdGUoKS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB1dWlkUmVsZWFzZUFkb3B0ZWRBcHBsaWNhdGlvbiA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pbmRpY2F0b3JzW2lkIGVxICdhZG9wdGVkQXBwbGljYXRpb24nXS9pbnN0YW5jZXNbMV0vdXVpZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIFwicmVsZWFzZUFkb3B0ZWRBcHBsaWNhdGlvblwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tbXVuaXR5SWRcIjogX1dGSW5zdGFuY2UucHJvZmlsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbmRpY2F0b3JVVUlEXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWRvcHRlZEFwcGxpY2F0aW9uXCI6IHV1aWRSZWxlYXNlQWRvcHRlZEFwcGxpY2F0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcclxuICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbih3b3JrZXJTdWNjZXNzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdXb3JrZXIgcHJvY2Vzc2VzIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHdvcmtlckZhaWwpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0pKCk7XHJcblxyXG52YXIgYXBwbGljYXRpb24gPSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuXHJcbiAgICAgICAgY3JlYXRlQXBwRGVmaW5pdGlvbjogZnVuY3Rpb24oX2RlZiwgdXVpZCwgX1dGSW5zdGFuY2UpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY29tbXVuaXR5SWQgPSBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbmV3IERhdGUoKS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB1dWlkQXBwbGljYXRpb24gPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnQXBwbGljYXRpb24nXS9faWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVBcHBsaWNhdGlvblwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibmV3QXBwbGljYXRpb25JZFwiOiBfV0ZJbnN0YW5jZS5wcm9maWxlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImluZGljYXRvclVVSURcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBcHBsaWNhdGlvblwiOiB1dWlkQXBwbGljYXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uKHdvcmtlclN1Y2Nlc3MpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1dvcmtlciBwcm9jZXNzZXMgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24od29ya2VyRmFpbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh3b3JrZXJGYWlsKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYnVpbGRBcHBsaWNhdGlvbjogZnVuY3Rpb24oX2RlZiwgdXVpZCwgX1dGSW5zdGFuY2UpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY29tbXVuaXR5SWQgPSBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbmV3IERhdGUoKS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB1dWlkUHVibGlzaEFwcGxpY2F0aW9uID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ1B1Ymxpc2hBcHBsaWNhdGlvbiddL2luc3RhbmNlc1sxXS91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHV1aWRBcHBsaWNhdGlvbkRlZmluaXRpb24gPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnQXBwbGljYXRpb25EZWZpbml0aW9uJ10vX2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcbiAgICAgICAgICAgICAgICB2YXIgdXVpZFJvbGVzID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ1JvbGVzJ10vX2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcbiAgICAgICAgICAgICAgICB2YXIgdXVpZEFwcGxpY2F0aW9uID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ0FwcGxpY2F0aW9uJ10vX2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcbiAgICAgICAgICAgICAgICB2YXIgdXVpZEFwcFBlcm1pc3Npb25zID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ0FwcFBlcm1pc3Npb25zJ10vX2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICBcImJ1aWxkQXBwbGljYXRpb25cIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFwcGxpY2F0aW9uSWRcIjogX1dGSW5zdGFuY2UucHJvZmlsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbmRpY2F0b3JVVUlEXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUHVibGlzaEFwcGxpY2F0aW9uXCI6IHV1aWRQdWJsaXNoQXBwbGljYXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkFwcGxpY2F0aW9uRGVmaW5pdGlvblwiOiB1dWlkQXBwbGljYXRpb25EZWZpbml0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSb2xlc1wiOiB1dWlkUm9sZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkFwcGxpY2F0aW9uXCI6IHV1aWRBcHBsaWNhdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQXBwUGVybWlzc2lvbnNcIjogdXVpZEFwcFBlcm1pc3Npb25zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcclxuICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbih3b3JrZXJTdWNjZXNzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdXb3JrZXIgcHJvY2Vzc2VzIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHdvcmtlckZhaWwpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFwcGxpY2F0aW9uQWRvcHRpb246IGZ1bmN0aW9uKF9kZWYsIHV1aWQsIF9XRkluc3RhbmNlKSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IHdvcmtlci5nZXRXb3JrZXJXcmFwcGVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYXBwbGljYXRpb25JZCA9IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG5ldyBEYXRlKCkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZW5kZXJVc2VySWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZDtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdXVpZEFkb3B0aW9uID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ0Fkb3B0aW9uJ10vaW5zdGFuY2VzWzFdL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHZhciB1dWlkUHVibGlzaEFwcGxpY2F0aW9uID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ1B1Ymxpc2hBcHBsaWNhdGlvbiddL19pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG4gICAgICAgICAgICAgICAgdmFyIHV1aWRBcHBsaWNhdGlvbiA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdBcHBsaWNhdGlvbiddL19pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJhZG9wdEFwcGxpY2F0aW9uXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHBsaWNhdGlvbklkXCI6IF9XRkluc3RhbmNlLnByb2ZpbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5kaWNhdG9yVVVJRFwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkFkb3B0aW9uXCI6IHV1aWRBZG9wdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUHVibGlzaEFwcGxpY2F0aW9uXCI6IHV1aWRQdWJsaXNoQXBwbGljYXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkFwcGxpY2F0aW9uXCI6IHV1aWRBcHBsaWNhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hY3Rpb24gPSBhY3Rpb247XHJcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24od29ya2VyU3VjY2Vzcykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya2VyIHByb2Nlc3NlcyBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbih3b3JrZXJGYWlsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdvcmtlckZhaWwpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjcmVhdGVUYXhvbm9teTogZnVuY3Rpb24oX2RlZiwgdXVpZCwgX1dGSW5zdGFuY2UpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY29tbXVuaXR5SWQgPSBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbmV3IERhdGUoKS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB0YXhvbm9teVVVSUQgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnVGF4b25vbXknXS9pbnN0YW5jZXNbMV0vdXVpZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVUYXhvbm9teVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGF4b25vbXlVVUlEXCI6IHRheG9ub215VVVJRFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uKHdvcmtlclN1Y2Nlc3MpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1dvcmtlciBwcm9jZXNzZXMgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24od29ya2VyRmFpbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh3b3JrZXJGYWlsKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSkoKTtcclxuXHJcblxyXG52YXIgd29ya2VyID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuXHJcbiAgICByZXR1cm4ge1xyXG5cclxuICAgICAgICBnZXRXb3JrZXJXcmFwcGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB3cmFwcGVyID0ge1xyXG4gICAgICAgICAgICAgICAgXCJzb3VyY2VcIjogXCJyZW1vdGVcIixcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIndvcmtlck9iamVjdFwiLFxyXG4gICAgICAgICAgICAgICAgXCJfaWRcIjogXCJcIixcclxuICAgICAgICAgICAgICAgIFwiY2hhbm5lbHNcIjogW10sXHJcbiAgICAgICAgICAgICAgICBcImNvbW11bml0eUlkXCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBcImFwcGxpY2F0aW9uSWRcIjogXCJcIixcclxuICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgXCJtZXNzYWdlVHlwZVwiOiBcImluZm9cIixcclxuICAgICAgICAgICAgICAgIFwiY3JlYXRlZERhdGVUaW1lXCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBcInNlbmRlclVzZXJJZFwiOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgXCJub3RpZmljYXRpb25cIjoge1xyXG5cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcImFjdGlvblwiOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHdyYXBwZXI7XHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2VuZDogZnVuY3Rpb24od29ya2VyT2JqZWN0KSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1N1Ym1pdHRpbmcgV29ya2VyIE9iamVjdCB0byBzZXJ2ZXInKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHdvcmtlck9iamVjdCk7XHJcbiAgICAgICAgICAgICAgICBkYW8uc2F2ZSh3b3JrZXJPYmplY3QpLmRvbmUoZnVuY3Rpb24od29ya2VyUmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHdvcmtlclJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgIH0pLmZhaWwoZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIHN1Ym1pdHRpbmcgd29ya2VyIHJlc3BvbnNlICEhJyArIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KSgpO1xyXG5cclxudmFyIHBlcmZvcm1hbmNlID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHJldHVybiB7XHJcblxyXG4gICAgICAgIGNyZWF0ZTogZnVuY3Rpb24oX2RlZiwgdXVpZCwgX1dGSW5zdGFuY2UpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY29tbXVuaXR5SWQgPSBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbmV3IERhdGUoKS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB1dWlkQ29tbXVuaXR5ID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ3BsYW4nXS9faWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVQbGFuXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwbGFuVVVJRFwiOiB1dWlkQ29tbXVuaXR5XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hY3Rpb24gPSBhY3Rpb247XHJcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24od29ya2VyU3VjY2Vzcykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya2VyIHByb2Nlc3NlZCBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbih3b3JrZXJGYWlsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdvcmtlckZhaWwpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNvbmZpZ3VyZU5vZGU6IGZ1bmN0aW9uKF9kZWYsIHV1aWQsIF9XRkluc3RhbmNlKSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IHdvcmtlci5nZXRXb3JrZXJXcmFwcGVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYXBwbGljYXRpb25JZCA9IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG5ldyBEYXRlKCkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZW5kZXJVc2VySWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZDtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdXVpZE5vZGVJblN1YlByb2Nlc3MgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnbm9kZSddL2luc3RhbmNlc1sxXS91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvbmZpZ3VyZU5vZGVcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm5vZGVVVUlEXCI6IHV1aWROb2RlSW5TdWJQcm9jZXNzXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hY3Rpb24gPSBhY3Rpb247XHJcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24od29ya2VyU3VjY2Vzcykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya2VyIHByb2Nlc3NlZCBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbih3b3JrZXJGYWlsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdvcmtlckZhaWwpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59KSgpO1xyXG5cclxudmFyIHNkbyA9IChmdW5jdGlvbigpIHtcclxuXHJcbiAgICByZXR1cm4ge1xyXG5cclxuICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uKF9kZWYsIHV1aWQsIF9XRkluc3RhbmNlKSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IHdvcmtlci5nZXRXb3JrZXJXcmFwcGVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYXBwbGljYXRpb25JZCA9IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG5ldyBEYXRlKCkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZW5kZXJVc2VySWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZDtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgc2RvVVVJRCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pbmRpY2F0b3JzW2lkIGVxICdTRE8nXS9pbnN0YW5jZXNbMV0vdXVpZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVTRE9cIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNkb1VVSURcIjogc2RvVVVJRFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uKHdvcmtlclN1Y2Nlc3MpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1dvcmtlciBwcm9jZXNzZXMgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24od29ya2VyRmFpbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh3b3JrZXJGYWlsKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0pKCk7XHJcblxyXG52YXIgdGF4b25vbXkgPSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuXHJcbiAgICAgICAgY3JlYXRlOiBmdW5jdGlvbihfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5faWQgPSBnZW5lcmF0ZVVVSUQoKTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jcmVhdGVkRGF0ZVRpbWUgPSBuZXcgRGF0ZSgpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2VuZGVyVXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHRheG9ub215VVVJRCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pbmRpY2F0b3JzW2lkIGVxICdUYXhvbm9teSddL2luc3RhbmNlc1sxXS91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZVRheG9ub215XCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YXhvbm9teVVVSURcIjogdGF4b25vbXlVVUlEXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hY3Rpb24gPSBhY3Rpb247XHJcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24od29ya2VyU3VjY2Vzcykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya2VyIHByb2Nlc3NlcyBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbih3b3JrZXJGYWlsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdvcmtlckZhaWwpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSkoKTtcclxuXHJcblxyXG52YXIgc3ViUHJvY2Vzc0luc3RhbmNlID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHJldHVybiB7XHJcblxyXG4gICAgICAgIHNldFRpdGxlOiBmdW5jdGlvbihfZGVmLCB1dWlkLCBkYXRhVmFsdWUsIF9XRkluc3RhbmNlKSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHNwUHJvY2Vzc09iamVjdCA9IEpTT04ueHBhdGgoXCIvaW5zdGFuY2UvcHJvY2Vzc2VzL3N1YlByb2Nlc3Nlc1t1dWlkIGVxICdcIiArIHV1aWQgKyBcIiddXCIsIGFwcC5TQ09QRS53b3JrZmxvdywge30pWzBdO1xyXG4gICAgICAgICAgICAgICAgc3BQcm9jZXNzT2JqZWN0LmxhYmVsID0gZGF0YVZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBpdGVtc1RvUHJvY2VzcyA9IDE7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3R1ZmYgPSBbXTtcclxuICAgICAgICAgICAgICAgIHZhciBvYmogPSB7fTtcclxuICAgICAgICAgICAgICAgIG9iai5tb2RlbCA9IF9XRkluc3RhbmNlLmluc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgc3R1ZmYucHVzaChvYmopO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLVxyXG4gICAgICAgICAgICAgICAgZ2F0ZWtlZXBlci5wZXJzaXN0KHN0dWZmKS50aGVuKGZ1bmN0aW9uKHNhdmVkQXJyYXkpIHtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB1dWlkU2F2ZWRJbmRpY2F0b3IgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IHNhdmVkQXJyYXkubGVuZ3RoOyBjKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzYXZlZEFycmF5W2NdLmlkLmVuZHNXaXRoKCc6YXBwcm92ZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXVpZFNhdmVkSW5kaWNhdG9yID0gc2F2ZWRBcnJheVtjXS5pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBkYW8uZ2V0KHV1aWRTYXZlZEluZGljYXRvcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5zdGFuY2UgPSBkYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdTdWJwcm9jZXNzIHNldFRpdGxlIHN1Y2Nlc3MuJywgX1dGSW5zdGFuY2UuaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmZhaWwoZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59KSgpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gICAgY29tbXVuaXR5OiBjb21tdW5pdHksXHJcbiAgICBhcHBsaWNhdGlvbjogYXBwbGljYXRpb24sXHJcbiAgICBwZXJmb3JtYW5jZTogcGVyZm9ybWFuY2UsXHJcbiAgICB3b3JrZXI6IHdvcmtlcixcclxuICAgIHNkbzogc2RvLFxyXG4gICAgdGF4b25vbXk6IHRheG9ub215LFxyXG4gICAgc3ViUHJvY2Vzc0luc3RhbmNlOiBzdWJQcm9jZXNzSW5zdGFuY2VcclxufSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vdmFyIGdhdGVrZWVwZXIgPSByZXF1aXJlKCcuLi9ib3dlcl9jb21wb25lbnRzL2dhdGVrZWVwZXInKTtcclxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsaXR5Jyk7XHJcblxyXG4vLyB2YXIgdXVpZCA9IHJlcXVpcmUoJ25vZGUtdXVpZCcpO1xyXG5cclxudmFyIGdhdGVrZWVwZXIgPSBuZXcgR0soKTtcclxuXHJcbi8qKlxyXG4gKiBGb3JtIE1vZHVsZVxyXG4gKlxyXG4gKiBAbW9kdWxlIGxpYi9mb3JtXHJcbiAqIEBhdXRob3IgQnJlbnQgR29yZG9uXHJcbiAqIEB2ZXJzaW9uIDIuMC4wXHJcbiAqIEBkZXNjcmlwdGlvbiB0ZXN0IGRlc2NyaXB0aW9uXHJcbiAqIEBjb3B5cmlnaHQgS3dhbnR1IEx0ZCBSU0EgMjAwOS0yMDE1LlxyXG4gKlxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZShhcmdzKSB7XHJcblxyXG4gICAgdmFyIHByb2Nlc3NJZCA9IGFyZ3NbMF0gfHwgJyc7XHJcblxyXG4gICAgdmFyIHN1YlByb2Nlc3MgPSBhcmdzWzFdIHx8IHt9O1xyXG5cclxuICAgIHZhciBzdGVwID0gYXJnc1syXSB8fCB7fTtcclxuXHJcbiAgICB2YXIgYWN0aW9uID0gYXJnc1szXSB8fCB7fTtcclxuXHJcbiAgICB2YXIgX1dGSW5zdGFuY2UgPSBhcmdzWzZdIHx8IHt9O1xyXG5cclxuICAgIHZhciBkYXRhID0gYXJnc1s2XSB8fCB7fTtcclxuXHJcbiAgICB2YXIgaW5kaWNhdG9ycyA9IHN1YlByb2Nlc3MuaW5kaWNhdG9ycyB8fCBbXTtcclxuXHJcbiAgICB2YXIgcmVzdWx0ID0gW107XHJcblxyXG4gICAgdmFyIGluZGljYXRvclR5cGUgPSBhY3Rpb24uX3R5cGU7XHJcblxyXG4gICAgdmFyIHByb2Nlc3NTZXEgPSBhcmdzWzRdIHx8ICcnO1xyXG5cclxuICAgIHZhciBzdWJQcm9jZXNzU2VxID0gYXJnc1s1XSB8fCAnJztcclxuXHJcbiAgICB2YXIgY3JlYXRlVHlwZSA9IGFyZ3NbN10gfHwgJyc7XHJcblxyXG4gICAgdmFyIHN1YlByb2Nlc3NJZCA9IHN1YlByb2Nlc3MuX2lkO1xyXG5cclxuICAgIHZhciB1dWlkID0gYXJnc1s4XSB8fCAnJztcclxuXHJcbiAgICB2YXIgYmFzZVVVSUQgPSBhcmdzWzldIHx8ICcnO1xyXG5cclxuICAgIHZhciBwcm9maWxlID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcclxuXHJcblxyXG5cclxuICAgIHZhciBpbnB1dERhdGEgPSBhcmdzWzEwXSB8fCB7fTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgdmFyIHRvUHJvY2VzcyA9IGluZGljYXRvcnMubGVuZ3RoO1xyXG5cclxuICAgICAgICB2YXIgZm9ybUNyZWF0ZUZuID0gZnVuY3Rpb24oaWQsIGluZGljYXRvclR5cGUsIGluZGljYXRvcklkLCB2YWxpZERhdGUsIGluc3RhbnRpYXRlU291cmNlKSB7XHJcblxyXG4gICAgICAgICAgICBnYXRla2VlcGVyLmluc3RhbnRpYXRlKGlkLCBpbmRpY2F0b3JUeXBlLCBpbmRpY2F0b3JJZCwgX1dGSW5zdGFuY2UucHJvZmlsZSwgdmFsaWREYXRlKS50aGVuKGZ1bmN0aW9uKGRvY0FycmF5KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGluZGljYXRvciB3b3JrZmxvdyBwcm9jZXNzZXMgc2VjdGlvblxyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZG9jQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgb2JqZWN0ID0gZG9jQXJyYXlbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvYmplY3QubW9kZWwuX2lkLmVuZHNXaXRoKCc6YXBwcm92ZWQnKSAmJiAhb2JqZWN0Lm1vZGVsLl9pZC5lbmRzV2l0aCgnOnJlamVjdGVkJykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3b3JrZmxvd09iaiA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogX1dGSW5zdGFuY2UuY29uZmlnLl9pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5zdGFuY2VcIjogX1dGSW5zdGFuY2UuaW5zdGFuY2UuX2lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9jZXNzZXNcIjogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IHByb2Nlc3NJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN1YlByb2Nlc3NJZFwiOiBzdWJQcm9jZXNzLl9pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN1YlByb2Nlc3NVVUlEXCI6IHV1aWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdGVwXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBzdGVwLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlcVwiOiBzdGVwLnNlcSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdGFydERhdGVcIjogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdGF0dXNcIjogc3RlcC5zdGF0dXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBzdGVwLm1lc3NhZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXNzaWduZWRUb1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVzZXJJZFwiOiBzdGVwLmFzc2lnbmVkVG8udXNlcklkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IHN0ZXAuYXNzaWduZWRUby5uYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tbWVudFwiOiBzdGVwLmNvbW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tcGxldGVcIjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZW5kRGF0ZVwiOiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGlvbi5zZXRXb3JrZmxvd0xhYmVsSW5UaXRsZSAhPSB1bmRlZmluZWQgJiYgYWN0aW9uLnNldFdvcmtmbG93TGFiZWxJblRpdGxlICE9ICcnICYmIGFjdGlvbi5zZXRXb3JrZmxvd0xhYmVsSW5UaXRsZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3QubW9kZWwudGl0bGUgPSBpbnB1dERhdGEubGFiZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24uc2V0RHJhZnQgIT0gdW5kZWZpbmVkICYmIGFjdGlvbi5zZXREcmFmdCAhPSAnJyAmJiBhY3Rpb24uc2V0RHJhZnQgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0Lm1vZGVsLmNvbnRyb2wuZHJhZnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0Lm1vZGVsLndvcmtmbG93cy5wdXNoKHdvcmtmbG93T2JqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1haW5JZCA9IG9iamVjdC5tb2RlbC5faWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBlcnNpc3QgdmlhIGdrIHNvIHRoYXQgaXQgaXMgc2F2ZSBpbiBjb3VjaFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnYXRla2VlcGVyLnBlcnNpc3QoZG9jQXJyYXkpLnRoZW4oZnVuY3Rpb24oc2F2ZWRBcnJheSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy91c2luZyBzYW1lIGlkIGNhbGwgaW5pdGlhbGlzZURhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY2FsbCBjb2RlIHRvIHNldCB0byBzZXRJbnN0YW5jZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGFvLmdldChtYWluSWQpLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvck1vZGVsID0ga28ubWFwcGluZy5mcm9tSlMoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRlZmF1bHRNb2RlbFwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNldElkXCI6IGluZGljYXRvcklkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2F0ZWtlZXBlci5pbnN0YW50aWF0ZURhdGEobWFpbklkLCBpbnN0YW50aWF0ZVNvdXJjZSwgaW5kaWNhdG9yTW9kZWwsIGRhdGEubW9kZWwucGVuZGluZy5zZXEpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFbMF0uc3RhdHVzID09IFwiMjAwXCIpIHtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGlvbi5zZXRXb3JrZmxvd0xhYmVsSW5GaWVsZCAhPSB1bmRlZmluZWQgJiYgYWN0aW9uLnNldFdvcmtmbG93TGFiZWxJbkZpZWxkICE9ICcnICYmIG1haW5JZCA9PSBwcm9maWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhdGggPSBcImRhdGFbMF0ubW9kZWwubW9kZWwucGVuZGluZy5kYXRhLlwiICsgYWN0aW9uLnNldFdvcmtmbG93TGFiZWxJbkZpZWxkICsgXCI9J1wiICsgaW5wdXREYXRhLmxhYmVsICsgXCInXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZhbChwYXRoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYXRla2VlcGVyLnBlcnNpc3QoZGF0YSkudGhlbihmdW5jdGlvbihzYXZlZEFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGFvLmdldChtYWluSWQpLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5wdXNoKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9Qcm9jZXNzLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9Qcm9jZXNzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnRm9ybSBjcmVhdGVkIHN1Y2Nlc3NmdWxseS4nLCBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3VuZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IF9XRkluc3RhbmNlLmluZGljYXRvcnMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvciA9IF9XRkluc3RhbmNlLmluZGljYXRvcnNbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRpY2F0b3IuX2lkID09IGRhdGEuX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBjdXJyZW50IGl0ZW0gZnJvbSB0aGUgYXJyYXkgYW5kIGFkZCB0aGUgdXBkYXRlZCBwcm9jZXNzTW9kZWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnB1c2goZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvUHJvY2Vzcy0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9Qcm9jZXNzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5LicsIF9XRkluc3RhbmNlLmluZGljYXRvcnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3VuZCA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9Qcm9jZXNzLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRvUHJvY2VzcyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5LicsIF9XRkluc3RhbmNlLmluZGljYXRvcnMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmZhaWwoZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZhaWx1cmUgPSB1dGlsLnN1Y2Nlc3MoJzEgR2F0ZWtlZXBlciBpbml0aWFsaXNhdGlvbiBmYWlsZWQgd2l0aCBpbml0aWFsaXNlRGF0YSBtZXNzYWdlICcgKyBlcnJbMF0ubWVzc2FnZSwge30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFpbHVyZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmFpbHVyZSA9IHV0aWwuc3VjY2VzcygnMiBHYXRla2VlcGVyIGluaXRpYWxpc2F0aW9uIGZhaWxlZCB3aXRoIGluaXRpYWxpc2VEYXRhIG1lc3NhZ2UgJyArIGVyclswXS5tZXNzYWdlLCB7fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGZhaWx1cmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmFpbHVyZSA9IHV0aWwuc3VjY2VzcygnMyBHYXRla2VlcGVyIGluaXRpYWxpc2F0aW9uIGZhaWxlZCB3aXRoIGluaXRpYWxpc2VEYXRhIG1lc3NhZ2UgJyArIGVyclswXS5tZXNzYWdlLCB7fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFpbHVyZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmFpbHVyZSA9IHV0aWwuc3VjY2VzcygnNCBHYXRla2VlcGVyIGluaXRpYWxpc2F0aW9uIGZhaWxlZCB3aXRoIGluaXRpYWxpc2VEYXRhIG1lc3NhZ2UgJyArIGVyclswXS5tZXNzYWdlLCB7fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChmYWlsdXJlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmZhaWwoZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmYWlsdXJlID0gdXRpbC5zdWNjZXNzKCc1IEdhdGVrZWVwZXIgaW5pdGlhbGlzYXRpb24gZmFpbGVkIHdpdGggaW5pdGlhbGlzZURhdGEgbWVzc2FnZSAnICsgZXJyWzBdLm1lc3NhZ2UsIHt9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFpbHVyZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmYWlsdXJlID0gdXRpbC5zdWNjZXNzKCc2IEdhdGVrZWVwZXIgaW5pdGlhbGlzYXRpb24gZmFpbGVkIHdpdGggaW5pdGlhbGlzZURhdGEgbWVzc2FnZSAnICsgZXJyWzBdLm1lc3NhZ2UsIHt9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChmYWlsdXJlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9wZXJzaXN0IC0gc2F2ZVxyXG4gICAgICAgICAgICAgICAgLy9sb29wIG9uIHdvcmtmbG93IGFycmF5IGFuZCBjaGVjayBmb3IgNCBjb25kaXRpb25zIGFuZCBzcGxpY2UgYW5kIHVwZGF0ZVxyXG4gICAgICAgICAgICAgICAgLy8gR290IHRvIHRoZSBuZXh0IHByb2Nlc3MgaXRlbVxyXG5cclxuICAgICAgICAgICAgICAgIC8qdmFyIHdvcmtmbG93cyA9IGRvYy53b3JrZmxvd3M7XHJcbiAgICAgICAgICAgICAgICB3b3JrZmxvd3MuaWQgPSBfV0ZJbnN0YW5jZS5jb25maWcuX2lkO1xyXG4gICAgICAgICAgICAgICAgd29ya2Zsb3dzLmluc3RhbmNlID0gX1dGSW5zdGFuY2UuaW5zdGFuY2UuX2lkO1xyXG4gICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5wdXNoKGRvYyk7XHJcbiAgICAgICAgICAgICAgICBsb29wLm5leHQoKTsqL1xyXG5cclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdG9BZGRQcm9jZXNzID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IF9XRkluc3RhbmNlLmluc3RhbmNlLnByb2Nlc3Nlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfV0ZJbnN0YW5jZS5pbnN0YW5jZS5wcm9jZXNzZXNbaV0uc3ViUHJvY2Vzc2VzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9BZGRQcm9jZXNzLnB1c2goX1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbnN0YW5jZS5wcm9jZXNzZXMgPSBbXTtcclxuICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluc3RhbmNlLnByb2Nlc3NlcyA9IHRvQWRkUHJvY2VzcztcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHRvQWRkU3ViUHJvY2VzcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzW2ldLmluZGljYXRvcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b0FkZFN1YlByb2Nlc3MucHVzaChfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLnN1YnByb2Nlc3NlcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzID0gdG9BZGRTdWJQcm9jZXNzO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgICAgICB2YXIgZmFpbHVyZSA9IHV0aWwuc3VjY2VzcygnNyBHYXRla2VlcGVyIGluaXRpYWxpc2F0aW9uIGZhaWxlZCB3aXRoIGluaXRpYWxpc2VEYXRhIG1lc3NhZ2UgJyArIGVyclswXS5tZXNzYWdlLCB7fSk7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZmFpbHVyZSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgaW5zdGFudGlhdGVTb3VyY2UgPSAnZnJvbURlZmluaXRpb24nO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBjb3VudGVyID0gMDsgY291bnRlciA8IGluZGljYXRvcnMubGVuZ3RoOyBjb3VudGVyKyspIHtcclxuICAgICAgICAgICAgdmFyIGluZGljYXRvcklkID0gaW5kaWNhdG9yc1tjb3VudGVyXS5faWQ7XHJcbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JOYW1lID0gdXRpbC5nZXROYW1lKGluZGljYXRvcnNbY291bnRlcl0ubmFtZSwgJ2VuJyk7XHJcbiAgICAgICAgICAgIHZhciBpbml0VHlwZSA9ICcnO1xyXG4gICAgICAgICAgICBpZiAoc3ViUHJvY2Vzcy5pbnN0YW5jZVR5cGUubmV3U2VxdWVuY2UgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpbml0VHlwZSA9ICduZXdTZXF1ZW5jZSc7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3ViUHJvY2Vzcy5pbnN0YW5jZVR5cGUubmV3SW5zdGFuY2UgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpbml0VHlwZSA9ICduZXdJbnN0YW5jZSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGlkID0gJyc7XHJcbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JEb2MgPSB7fTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpbml0VHlwZSA9PSAnbmV3SW5zdGFuY2UnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGJhc2VVVUlEICE9IHVuZGVmaW5lZCAmJiBiYXNlVVVJRCAhPSAnJyAmJiBiYXNlVVVJRC5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBleGlzdGluZ1VVSUQgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgYmFzZVVVSUQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ1wiICsgaW5kaWNhdG9ySWQgKyBcIiddL2luc3RhbmNlc1sxXS91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgaWQgPSBleGlzdGluZ1VVSUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdFR5cGUgPSAnbmV3U2VxdWVuY2UnO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyB1cGRhdGUgcHJvY2Vzc2VzIGJsb2NrIHRvIG5vdCBkaXNwbGF5IHRoZSBvbGRlciBpbnN0YW5jZSBiYXNlZCBvbiBiYXNlVVVJRFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL1RPRE86IENoYW5nZSByZXF1aXJlZCB0byBtb3ZlIGlzQWN0aXZlIHRvIHN1YlByb2Nlc3MgZmlsZS5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3AgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgYmFzZVVVSUQgKyBcIiddXCIsIGFwcC5TQ09QRS53b3JrZmxvdywge30pWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIHNwLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGluc3RhbnRpYXRlIG5ldyBzZXEgd2l0aCBwcmV2aW91cyBhdXRob3Jpc2VkIGRhdGFcclxuICAgICAgICAgICAgICAgICAgICBpbnN0YW50aWF0ZVNvdXJjZSA9ICdmcm9tQXV0aG9yaXNlZCc7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1YlByb2Nlc3MuaXNQcm9maWxlICE9IHVuZGVmaW5lZCAmJiBzdWJQcm9jZXNzLmlzUHJvZmlsZSAmJiAoaW5kaWNhdG9ySWQgPT0gUFJPRklMRV9TRVRfSUQgfHwgYXBwLlNDT1BFLkFQUF9DT05GSUcuaW5kaWNhdG9ycy5sZW5ndGggPT0gMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQgPSBwcm9maWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5kaWNhdG9ySWQgPT0gXCJub2RlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQgPSBhcHAucHJvZmlsZS5zdWJwcm9maWxlSWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQgPSBpbmRpY2F0b3JJZCArICctJyArIGdlbmVyYXRlVVVJRCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBzcExhc3RVdWlkID0gSlNPTi54cGF0aChcIi9pbnN0YW5jZS9wcm9jZXNzZXNbaWQgZXEgJ1wiICsgcHJvY2Vzc0lkICsgXCInIGFuZCBzdWJQcm9jZXNzZXMvaWQgZXEgJ1wiICsgc3ViUHJvY2Vzc0lkICsgXCInXVsxXS9zdWJQcm9jZXNzZXMvdXVpZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZElkID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHNwTGFzdFV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ1wiICsgaW5kaWNhdG9ySWQgKyBcIiddL2luc3RhbmNlcy91dWlkXCIsIGFwcC5TQ09QRS53b3JrZmxvdywge30pWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzcExhc3RVdWlkID09ICcnIHx8IHNwTGFzdFV1aWQgPT0gdW5kZWZpbmVkIHx8IGluZElkID09ICcnIHx8IGluZElkID09IHVuZGVmaW5lZCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3ViUHJvY2Vzcy5pc1Byb2ZpbGUgIT0gdW5kZWZpbmVkICYmIHN1YlByb2Nlc3MuaXNQcm9maWxlICYmIChpbmRpY2F0b3JJZCA9PSBQUk9GSUxFX1NFVF9JRCB8fCBhcHAuU0NPUEUuQVBQX0NPTkZJRy5pbmRpY2F0b3JzLmxlbmd0aCA9PSAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZCA9IHByb2ZpbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpbmRpY2F0b3JJZCA9PSBcIm5vZGVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZCA9IGFwcC5wcm9maWxlLnN1YnByb2ZpbGVJZDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZCA9IGluZGljYXRvcklkICsgJy0nICsgZ2VuZXJhdGVVVUlEKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlkID0gaW5kSWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGJhc2VVVUlEICE9IHVuZGVmaW5lZCAmJiBiYXNlVVVJRCAhPSAnJyAmJiBiYXNlVVVJRC5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vVE9ETzogQ2hhbmdlIHJlcXVpcmVkIHRvIG1vdmUgaXNBY3RpdmUgdG8gc3ViUHJvY2VzcyBmaWxlLlxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3AgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgYmFzZVVVSUQgKyBcIiddXCIsIGFwcC5TQ09QRS53b3JrZmxvdywge30pWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIHNwLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbnRpYXRlU291cmNlID0gJ2Zyb21BdXRob3Jpc2VkJztcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gVE9ETzogUmVwbGFjZSB3aXRoIHRoZSBnYXRla2VlcGVyIHByb21pc2UgY2FsbCwgcmV0dXJuIHRoZSBvYmplY3QsIHVwZGF0ZSB0aGUgaW5kaWNhdG9yXHJcbiAgICAgICAgICAgIC8vIGRvY3VtZW50IHdvcmtmbG93IHByb2Nlc3NlcyBkYXRhIGFuZCB1cGRhdGUgdGhlIHdvcmtmbG93IGNsYXNzIGluZGljYXRvcnMgYXJyYXkuXHJcblxyXG4gICAgICAgICAgICBmb3JtQ3JlYXRlRm4oaWQsIGluaXRUeXBlLCBpbmRpY2F0b3JJZCwgJycsIGluc3RhbnRpYXRlU291cmNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGluZGljYXRvciBzZXQgc2F2ZWQgc3VjY2Vzc2Z1bGx5LicsIHJlc3VsdCk7XHJcbiAgICAgICAgLy8gcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gc2V0SW5zdGFuY2VUaXRsZShhcmdzKSB7XHJcblxyXG4gICAgdmFyIF9XRkluc3RhbmNlID0gYXJnc1swXSB8fCB7fTtcclxuICAgIHZhciB1dWlkID0gYXJnc1syXSB8fCAnJztcclxuICAgIHZhciBkYXRhID0gYXJnc1s0XSB8fCB7fTtcclxuICAgIHZhciB0aXRsZSA9IGRhdGEubGFiZWw7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICB2YXIgc3ViUHJvY2Vzc0luc3RhbmNlID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcbiAgICAgICAgdmFyIGluZGljYXRvckluc3RhbmNlcyA9IHN1YlByb2Nlc3NJbnN0YW5jZS5pbmRpY2F0b3JzO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluZGljYXRvckluc3RhbmNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgaW5kaWNhdG9yVVVJRCA9IGluZGljYXRvckluc3RhbmNlc1tpXS5pbnN0YW5jZXNbMF0udXVpZDtcclxuICAgICAgICAgICAgdmFyIGluZGljYXRvckluc3RhbmNlID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW19pZCBlcSAnXCIgKyBpbmRpY2F0b3JVVUlEICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG4gICAgICAgICAgICBpbmRpY2F0b3JJbnN0YW5jZS50aXRsZSA9IGluZGljYXRvckluc3RhbmNlc1tpXS5pZCArICcgJyArIHRpdGxlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJlc29sdmUoXCJTZXQgVGl0bGUgU3VjY2Vzc1wiLCBpbmRpY2F0b3JJbnN0YW5jZXMpO1xyXG5cclxuICAgIH0pO1xyXG5cclxufTtcclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZVByb2ZpbGUoYXJncykge1xyXG5cclxuICAgIHZhciBfV0ZJbnN0YW5jZSA9IGFyZ3NbMF0gfHwge307XHJcbiAgICB2YXIgcHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB7XHJcbiAgICAgICAgICAgIFwic291cmNlXCI6IFwicmVtb3RlXCIsXHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcIndvcmtlck9iamVjdFwiLFxyXG4gICAgICAgICAgICBcIl9pZFwiOiBnZW5lcmF0ZVVVSUQoKSxcclxuICAgICAgICAgICAgXCJjaGFubmVsc1wiOiBbXSxcclxuICAgICAgICAgICAgXCJjb21tdW5pdHlJZFwiOiBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKSxcclxuICAgICAgICAgICAgXCJhcHBsaWNhdGlvbklkXCI6IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkLFxyXG4gICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJcIixcclxuICAgICAgICAgICAgXCJtZXNzYWdlVHlwZVwiOiBcImluZm9cIixcclxuICAgICAgICAgICAgXCJjcmVhdGVkRGF0ZVRpbWVcIjogbW9tZW50KCkuZm9ybWF0KCksXHJcbiAgICAgICAgICAgIFwic2VuZGVyVXNlcklkXCI6IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkLFxyXG4gICAgICAgICAgICBcIm5vdGlmaWNhdGlvblwiOiB7XHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInByb2ZpbGVcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhY3Rpb25cIjogXCJkZWxldGVQcm9maWxlXCIsXHJcbiAgICAgICAgICAgICAgICBcInByb2ZpbGVJZFwiOiBwcm9maWxlSWRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyh3b3JrZXJPYmplY3QpO1xyXG4gICAgICAgIGRhby51cHNlcnQod29ya2VyT2JqZWN0KS5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJXb3JrZXIgT2JqZWN0IHN1Ym1pdHRlZCBmb3IgcHJvZmlsZShcIiArIHByb2ZpbGVJZCArIFwiKSBkZWxldGlvbi5cIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgIH0pLmZhaWwoZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgIHJlamVjdChkYXRhKTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgfSk7XHJcblxyXG5cclxufTtcclxuXHJcblxyXG5mdW5jdGlvbiBjcmVhdGVQcm9maWxlKGFyZ3MpIHtcclxuXHJcblxyXG5cclxuICAgIHZhciBfV0ZJbnN0YW5jZSA9IGFyZ3NbMV0gfHwge307XHJcblxyXG4gICAgdmFyIGNvbW11bml0eUlkID0gX1dGSW5zdGFuY2UuY29tbXVuaXR5SWQ7XHJcbiAgICB2YXIgcHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgIGxpYnJhcnkuY3JlYXRlUHJvZmlsZURvY3VtZW50cyhjb21tdW5pdHlJZCwgcHJvZmlsZUlkKS5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5LicsIGRhdGEpO1xyXG4gICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG5cclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uKGVycikge1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICB2YXIgZmFpbHVyZSA9IHV0aWwuc3VjY2VzcygnRVJST1I6IFByb2ZpbGUgY3JlYXRpb24gZmFpbGVkJyArIGVyclswXS5tZXNzYWdlLCB7fSk7XHJcbiAgICAgICAgICAgIHJlamVjdChmYWlsdXJlKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBzZXREcmFmdChhcmdzKSB7XHJcblxyXG5cclxuXHJcbiAgICB2YXIgX1dGSW5zdGFuY2UgPSBhcmdzWzBdIHx8IHt9O1xyXG4gICAgdmFyIGNvbW11bml0eUlkID0gX1dGSW5zdGFuY2UuY29tbXVuaXR5SWQ7XHJcbiAgICB2YXIgcHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcclxuICAgIHZhciB1dWlkID0gYXJnc1syXSB8fCAnJztcclxuXHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICB2YXIgc3ViUHJvY2Vzc0luc3RhbmNlID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcbiAgICAgICAgdmFyIGluZGljYXRvckluc3RhbmNlcyA9IHN1YlByb2Nlc3NJbnN0YW5jZS5pbmRpY2F0b3JzO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluZGljYXRvckluc3RhbmNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgaW5kaWNhdG9yVVVJRCA9IGluZGljYXRvckluc3RhbmNlc1tpXS5pbnN0YW5jZXNbMF0udXVpZDtcclxuICAgICAgICAgICAgdmFyIGluZGljYXRvckluc3RhbmNlID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW19pZCBlcSAnXCIgKyBpbmRpY2F0b3JVVUlEICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG4gICAgICAgICAgICBpbmRpY2F0b3JJbnN0YW5jZS5jb250cm9sLmRyYWZ0ID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXNvbHZlKFwiU2V0IERyYWZ0IFN1Y2Nlc3NcIiwgaW5kaWNhdG9ySW5zdGFuY2VzKTtcclxuXHJcbiAgICB9KTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIHNldFVuRHJhZnQoYXJncykge1xyXG5cclxuICAgIHZhciBfV0ZJbnN0YW5jZSA9IGFyZ3NbMF0gfHwge307XHJcbiAgICB2YXIgY29tbXVuaXR5SWQgPSBfV0ZJbnN0YW5jZS5jb21tdW5pdHlJZDtcclxuICAgIHZhciBwcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xyXG4gICAgdmFyIHV1aWQgPSBhcmdzWzJdIHx8ICcnO1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgdmFyIHN1YlByb2Nlc3NJbnN0YW5jZSA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG4gICAgICAgIHZhciBpbmRpY2F0b3JJbnN0YW5jZXMgPSBzdWJQcm9jZXNzSW5zdGFuY2UuaW5kaWNhdG9ycztcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbmRpY2F0b3JJbnN0YW5jZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGluZGljYXRvclVVSUQgPSBpbmRpY2F0b3JJbnN0YW5jZXNbaV0uaW5zdGFuY2VzWzBdLnV1aWQ7XHJcbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JJbnN0YW5jZSA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tfaWQgZXEgJ1wiICsgaW5kaWNhdG9yVVVJRCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICAgICAgaW5kaWNhdG9ySW5zdGFuY2UuY29udHJvbC5kcmFmdCA9IGZhbHNlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJlc29sdmUoXCJTZXQgRHJhZnQgU3VjY2Vzc1wiLCBpbmRpY2F0b3JJbnN0YW5jZXMpO1xyXG5cclxuICAgIH0pO1xyXG59O1xyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBzYXZlKGluZGljYXRvcikge1xyXG4gICAgdmFyIGNvbXBsZXRlZCA9IFtdO1xyXG4gICAgdmFyIHJlc3VsdCA9IHtcclxuICAgICAgICBjb21wbGV0ZTogdHJ1ZSxcclxuICAgICAgICBkYXRhOiBbXVxyXG4gICAgfTtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnRm9ybSBpbmRpY2F0b3Igc2V0IHNhdmVkIHN1Y2Nlc3NmdWxseS4nLCByZXN1bHQpO1xyXG4gICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIHN1Ym1pdChmb3JtKSB7XHJcbiAgICB2YXIgY29tcGxldGVkID0gW107XHJcbiAgICB2YXIgcmVzdWx0ID0ge1xyXG4gICAgICAgIGNvbXBsZXRlOiB0cnVlLFxyXG4gICAgICAgIGRhdGE6IFtdXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIHN1Ym1pdHRlZCBzdWNjZXNzZnVsbHkuJywgcmVzdWx0KTtcclxuICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBhdXRob3Jpc2UoZm9ybSkge1xyXG4gICAgdmFyIGNvbXBsZXRlZCA9IFtdO1xyXG4gICAgdmFyIHJlc3VsdCA9IHtcclxuICAgICAgICBjb21wbGV0ZTogdHJ1ZSxcclxuICAgICAgICBkYXRhOiBbXVxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgcHJvY2Vzc0lkID0gZm9ybVswXSB8fCAnJztcclxuXHJcbiAgICB2YXIgc3ViUHJvY2VzcyA9IGZvcm1bMV0gfHwge307XHJcblxyXG4gICAgdmFyIHN1YlByb2Nlc3NJZCA9IHN1YlByb2Nlc3MuX2lkO1xyXG5cclxuICAgIHZhciBwcm9jZXNzU2VxID0gZm9ybVsyXSB8fCAnJztcclxuXHJcbiAgICB2YXIgc3ViUHJvY2Vzc1NlcSA9IGZvcm1bM10gfHwgJyc7XHJcblxyXG4gICAgdmFyIF9XRkluc3RhbmNlID0gZm9ybVs0XSB8fCB7fTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgIHZhciBzdWJQcm9jZXNzVVVJRCA9IEpTT04ueHBhdGgoXCIvcHJvY2Vzc2VzW2lkIGVxICdcIiArIHByb2Nlc3NJZCArIFwiJyBhbmQgc2VxIGVxICdcIiArIHByb2Nlc3NTZXEgKyBcIiddL3N1YlByb2Nlc3Nlc1tpZCBlcSAnXCIgKyBzdWJQcm9jZXNzSWQgKyBcIicgYW5kIHNlcSBlcSAnXCIgKyBzdWJQcm9jZXNzU2VxICsgXCInXS91dWlkXCIsIF9XRkluc3RhbmNlLmluc3RhbmNlLCB7fSlbMF07XHJcbiAgICAgICAgdmFyIHNwSW5kaWNhdG9ycyA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzdWJQcm9jZXNzVVVJRCArIFwiJ10vaW5kaWNhdG9ycy9pbnN0YW5jZXMvdXVpZFwiLCBfV0ZJbnN0YW5jZSwge30pO1xyXG4gICAgICAgIHZhciBpdGVtc1RvUHJvY2VzcyA9IHNwSW5kaWNhdG9ycy5sZW5ndGg7XHJcbiAgICAgICAgdmFyIHVwZGF0ZWRPYmplY3RzQXJyYXkgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtc1RvUHJvY2VzczsgaSsrKSB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGdhdGVrZWVwZXIuYXV0aG9yaXNlKHNwSW5kaWNhdG9yc1tpXSkudGhlbihmdW5jdGlvbihhdXRob3Jpc2VkUmV0dXJuKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGdhdGVrZWVwZXIucGVyc2lzdChhdXRob3Jpc2VkUmV0dXJuKS50aGVuKGZ1bmN0aW9uKHNhdmVkQXJyYXkpIHtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB1dWlkU2F2ZWRJbmRpY2F0b3IgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IHNhdmVkQXJyYXkubGVuZ3RoOyBjKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzYXZlZEFycmF5W2NdLmlkLmVuZHNXaXRoKCc6YXBwcm92ZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXVpZFNhdmVkSW5kaWNhdG9yID0gc2F2ZWRBcnJheVtjXS5pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBkYW8uZ2V0KHV1aWRTYXZlZEluZGljYXRvcikuZG9uZShmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnB1c2goZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1RvUHJvY2Vzcy0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zVG9Qcm9jZXNzID09IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gYXV0aG9yaXNlZCBzdWNjZXNzZnVsbHkuJywgdXBkYXRlZE9iamVjdHNBcnJheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3VuZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IF9XRkluc3RhbmNlLmluZGljYXRvcnMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvciA9IF9XRkluc3RhbmNlLmluZGljYXRvcnNbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRpY2F0b3IuX2lkID09IGRhdGEuX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBjdXJyZW50IGl0ZW0gZnJvbSB0aGUgYXJyYXkgYW5kIGFkZCB0aGUgdXBkYXRlZCBwcm9jZXNzTW9kZWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnB1c2goZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zVG9Qcm9jZXNzLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1RvUHJvY2VzcyA9PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gYXV0aG9yaXNlZCBzdWNjZXNzZnVsbHkuJywgdXBkYXRlZE9iamVjdHNBcnJheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvdW5kID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5wdXNoKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1RvUHJvY2Vzcy0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1RvUHJvY2VzcyA9PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnRm9ybSBhdXRob3Jpc2VkIHN1Y2Nlc3NmdWxseS4nLCB1cGRhdGVkT2JqZWN0c0FycmF5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuZmFpbChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1zVG9Qcm9jZXNzLS07XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbXNUb1Byb2Nlc3MgPT0gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnRm9ybSBhdXRob3Jpc2VkIHN1Y2Nlc3NmdWxseS4nLCB1cGRhdGVkT2JqZWN0c0FycmF5KTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfSk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBjbG9zZShmb3JtKSB7XHJcbiAgICB2YXIgY29tcGxldGVkID0gW107XHJcbiAgICB2YXIgcmVzdWx0ID0ge1xyXG4gICAgICAgIGNvbXBsZXRlOiB0cnVlLFxyXG4gICAgICAgIGRhdGE6IFtdXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGNsb3NlZCBzdWNjZXNzZnVsbHkuJywgcmVzdWx0KTtcclxuICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5cclxuZnVuY3Rpb24gdXBkYXRlSW5kaWNhdG9yKGFyZ3MpIHtcclxuXHJcbiAgICB2YXIgX1dGSW5zdGFuY2UgPSBhcmdzWzBdIHx8IHt9O1xyXG4gICAgdmFyIHV1aWQgPSBhcmdzWzFdIHx8ICcnO1xyXG4gICAgdmFyIHBhdGggPSBhcmdzWzJdIHx8ICcnO1xyXG4gICAgdmFyIGRhdGFWYWx1ZSA9IGFyZ3NbM10gfHwgJyc7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICB2YXIgc3ViUHJvY2Vzc0luc3RhbmNlID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcbiAgICAgICAgdmFyIGluZGljYXRvckluc3RhbmNlcyA9IHN1YlByb2Nlc3NJbnN0YW5jZS5pbmRpY2F0b3JzO1xyXG5cclxuICAgICAgICB2YXIgc2V0SWQgPSBwYXRoLnNwbGl0KFwiLlwiLCAxKVswXTtcclxuICAgICAgICB2YXIgaW5kaWNhdG9yVVVJRCA9IEpTT04ueHBhdGgoXCIvKltpZCBlcSAnXCIgKyBzZXRJZCArIFwiJ10vaW5zdGFuY2VzL3V1aWRcIiwgaW5kaWNhdG9ySW5zdGFuY2VzLCB7fSlbMF07XHJcbiAgICAgICAgdmFyIGluZE9iamVjdCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tfaWQgZXEgJ1wiICsgaW5kaWNhdG9yVVVJRCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICB2YXIgZXhwciA9ICdpbmRPYmplY3QubW9kZWwucGVuZGluZy5kYXRhLicgKyBwYXRoICsgJyA9IFwiJyArIGRhdGFWYWx1ZSArICdcIic7XHJcbiAgICAgICAgZXZhbChleHByKTtcclxuICAgICAgICB2YXIgaXRlbXNUb1Byb2Nlc3MgPSAxO1xyXG4gICAgICAgIHZhciBzdHVmZiA9IFtdO1xyXG4gICAgICAgIHZhciBvYmogPSB7fTtcclxuICAgICAgICBvYmoubW9kZWwgPSBpbmRPYmplY3Q7XHJcbiAgICAgICAgc3R1ZmYucHVzaChvYmopO1xyXG5cclxuICAgICAgICAvLy0tLS0tLS0tLS1cclxuICAgICAgICBnYXRla2VlcGVyLnBlcnNpc3Qoc3R1ZmYpLnRoZW4oZnVuY3Rpb24oc2F2ZWRBcnJheSkge1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciB1dWlkU2F2ZWRJbmRpY2F0b3IgPSAnJztcclxuICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCBzYXZlZEFycmF5Lmxlbmd0aDsgYysrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNhdmVkQXJyYXlbY10uaWQuZW5kc1dpdGgoJzphcHByb3ZlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXVpZFNhdmVkSW5kaWNhdG9yID0gc2F2ZWRBcnJheVtjXS5pZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkYW8uZ2V0KHV1aWRTYXZlZEluZGljYXRvcilcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnB1c2goZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zVG9Qcm9jZXNzLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1RvUHJvY2VzcyA9PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0luZGljYXRvciB1cGRhdGVkLicsIHN0dWZmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm91bmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IF9XRkluc3RhbmNlLmluZGljYXRvcnMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yID0gX1dGSW5zdGFuY2UuaW5kaWNhdG9yc1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kaWNhdG9yLl9pZCA9PSBkYXRhLl9pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGN1cnJlbnQgaXRlbSBmcm9tIHRoZSBhcnJheSBhbmQgYWRkIHRoZSB1cGRhdGVkIHByb2Nlc3NNb2RlbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnB1c2goZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNUb1Byb2Nlc3MtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbXNUb1Byb2Nlc3MgPT0gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0luZGljYXRvciB1cGRhdGVkLicsIHN0dWZmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvdW5kID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnB1c2goZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNUb1Byb2Nlc3MtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1RvUHJvY2VzcyA9PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdJbmRpY2F0b3IgdXBkYXRlZC4nLCBzdHVmZik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxufTtcclxuXHJcblxyXG5mdW5jdGlvbiBtYXJrVXBkYXRlSW5kaWNhdG9yKGFyZ3MpIHtcclxuXHJcbiAgICB2YXIgX1dGSW5zdGFuY2UgPSBhcmdzWzBdIHx8IHt9O1xyXG4gICAgdmFyIHV1aWQgPSBhcmdzWzFdIHx8ICcnO1xyXG4gICAgdmFyIHN0YXR1cyA9IGFyZ3NbMl0gfHwgJyc7XHJcbiAgICB2YXIgaW5kaWNhdG9yU2V0SWQgPSBhcmdzWzNdIHx8ICcnO1xyXG5cclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG5cclxuICAgICAgICB2YXIgaW5kT2JqZWN0ID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ1wiICsgaW5kaWNhdG9yU2V0SWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcbiAgICAgICAgaW5kT2JqZWN0Lm1vZGVsLnBlbmRpbmcuc3RhdHVzID0gc3RhdHVzO1xyXG5cclxuICAgICAgICB2YXIgaXRlbXNUb1Byb2Nlc3MgPSAxO1xyXG4gICAgICAgIHZhciBzdHVmZiA9IFtdO1xyXG4gICAgICAgIHZhciBvYmogPSB7fTtcclxuICAgICAgICBvYmoubW9kZWwgPSBpbmRPYmplY3Q7XHJcbiAgICAgICAgc3R1ZmYucHVzaChvYmopO1xyXG5cclxuICAgICAgICAvLy0tLS0tLS0tLS1cclxuICAgICAgICBnYXRla2VlcGVyLnBlcnNpc3Qoc3R1ZmYpLnRoZW4oZnVuY3Rpb24oc2F2ZWRBcnJheSkge1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciB1dWlkU2F2ZWRJbmRpY2F0b3IgPSAnJztcclxuICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCBzYXZlZEFycmF5Lmxlbmd0aDsgYysrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNhdmVkQXJyYXlbY10uaWQuZW5kc1dpdGgoJzphcHByb3ZlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXVpZFNhdmVkSW5kaWNhdG9yID0gc2F2ZWRBcnJheVtjXS5pZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkYW8uZ2V0KHV1aWRTYXZlZEluZGljYXRvcilcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnB1c2goZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zVG9Qcm9jZXNzLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1RvUHJvY2VzcyA9PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0luZGljYXRvciB1cGRhdGVkLicsIHN0dWZmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm91bmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IF9XRkluc3RhbmNlLmluZGljYXRvcnMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yID0gX1dGSW5zdGFuY2UuaW5kaWNhdG9yc1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kaWNhdG9yLl9pZCA9PSBkYXRhLl9pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGN1cnJlbnQgaXRlbSBmcm9tIHRoZSBhcnJheSBhbmQgYWRkIHRoZSB1cGRhdGVkIHByb2Nlc3NNb2RlbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnB1c2goZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNUb1Byb2Nlc3MtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbXNUb1Byb2Nlc3MgPT0gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0luZGljYXRvciB1cGRhdGVkLicsIHN0dWZmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvdW5kID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnB1c2goZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNUb1Byb2Nlc3MtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1RvUHJvY2VzcyA9PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdJbmRpY2F0b3IgdXBkYXRlZC4nLCBzdHVmZik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cclxuICAgIGNyZWF0ZTogY3JlYXRlLFxyXG4gICAgc2F2ZTogc2F2ZSxcclxuICAgIHN1Ym1pdDogc3VibWl0LFxyXG4gICAgYXV0aG9yaXNlOiBhdXRob3Jpc2UsXHJcbiAgICBjbG9zZTogY2xvc2UsXHJcbiAgICBzZXREcmFmdDogc2V0RHJhZnQsXHJcbiAgICBzZXRVbkRyYWZ0OiBzZXRVbkRyYWZ0LFxyXG4gICAgY3JlYXRlUHJvZmlsZTogY3JlYXRlUHJvZmlsZSxcclxuICAgIHNldEluc3RhbmNlVGl0bGU6IHNldEluc3RhbmNlVGl0bGUsXHJcbiAgICBkZWxldGVQcm9maWxlOiBkZWxldGVQcm9maWxlLFxyXG4gICAgdXBkYXRlSW5kaWNhdG9yOiB1cGRhdGVJbmRpY2F0b3IsXHJcbiAgICBtYXJrVXBkYXRlSW5kaWNhdG9yOiBtYXJrVXBkYXRlSW5kaWNhdG9yXHJcblxyXG59IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuXHJcbmZ1bmN0aW9uIGdldExhbmd1YWdlTWVzc2FnZShtZXNzYWdlKSB7XHJcblxyXG4gICAgdmFyIGxhbmd1YWdlID0gc2VydmljZS5nZXRMYW5ndWFnZSgpO1xyXG4gICAgdmFyIHJlcyA9IGV2YWwoXCJtZXNzYWdlLmkxOG4uXCIgKyBsYW5ndWFnZSk7XHJcbiAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgcmV0dXJuIHJlcztcclxuXHJcblxyXG59O1xyXG5cclxuZnVuY3Rpb24gZ2V0Tm9kZVZhbHVlKGRhdGEsIF9XRkluc3RhbmNlLCB1dWlkKSB7XHJcblxyXG4gICAgaWYgKGRhdGEudmFsdWUgIT0gdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmN1cnJlbnRJbmRpY2F0b3IgIT0gdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmluZGljYXRvciAhPSB1bmRlZmluZWQpIHtcclxuXHJcbiAgICAgICAgdmFyIGluZGljYXRvclVVSUQgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnXCIgKyBkYXRhLmluZGljYXRvci5pbmRpY2F0b3JTZXRJZCArIFwiJ10vaW5zdGFuY2VzL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuICAgICAgICB2YXIgaW5kT2JqZWN0ID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW19pZCBlcSAnXCIgKyBpbmRpY2F0b3JVVUlEICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xyXG4gICAgICAgIHZhciB2YWx1ZSA9ICdpbmRPYmplY3QubW9kZWwucGVuZGluZy5kYXRhLicgKyBkYXRhLmluZGljYXRvci5pbmRpY2F0b3JTZXRJZCArICcuJyArIGRhdGEuaW5kaWNhdG9yLmVsZW1lbnRJZDtcclxuICAgICAgICByZXR1cm4gZXZhbCh2YWx1ZSk7XHJcblxyXG4gICAgfSBlbHNlIGlmIChkYXRhLnN5c3RlbSAhPSB1bmRlZmluZWQpIHtcclxuXHJcbiAgICB9IGVsc2UgaWYgKGRhdGEudmFyaWFibGUgIT0gdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcbn07XHJcblxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cclxuICAgIGdldExhbmd1YWdlTWVzc2FnZTogZ2V0TGFuZ3VhZ2VNZXNzYWdlLFxyXG4gICAgZ2V0Tm9kZVZhbHVlOiBnZXROb2RlVmFsdWVcclxuXHJcbn0iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWxpdHknKTtcclxuXHJcbi8qKlxyXG4gKiBVc2VyIEludGVyZmFjZSBNb2R1bGVcclxuICpcclxuICogQG1vZHVsZSBsaWIvdWlcclxuICogQGF1dGhvciBCcmVudCBHb3Jkb25cclxuICogQHZlcnNpb24gMC4xLjBcclxuICogQGRlc2NyaXB0aW9uIHRlc3QgZGVzY3JpcHRpb25cclxuICpcclxuICovXHJcblxyXG4gLyoqXHJcbiAgKiBHZXQgYWxsIHByb2Nlc3Mgc3ViLXByb2Nlc3NlcyB1c2VyIGludGVyZmFjZSBkYXRhXHJcbiAgKlxyXG4gICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHByb2Nlc3MgaWRcclxuICAqIEBwYXJhbSB7c3RyaW5nfSBsYW5nIC0gdGhlIHVzZXIgcHJlZmZlcmVkIGxhbmdhdWdlXHJcbiAgKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxyXG4gICpcclxuICAqIEBleGFtcGxlICcnXHJcbiAgKlxyXG4gICogQHJldHVybiAnJ1xyXG4gICpcclxuICAqL1xyXG4gZnVuY3Rpb24gZ2V0UHJvY2Vzcyhwcm9jZXNzSWQsIGxhbmcsIF9XRkluc3RhbmNlKXtcclxuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICB2YXIgcHJvY2Vzc01vZGVsID0gW107XHJcbiAgICAgIHZhciBwcm9jZXNzSW5zdGFuY2UgPSBbXTtcclxuICAgIFx0X1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihwcm9jZXNzSXRlbSl7XHJcbiAgICBcdFx0aWYgKHByb2Nlc3NJdGVtLmlkID09IHByb2Nlc3NJZCkge1xyXG4gICAgXHRcdFx0cHJvY2Vzc0luc3RhbmNlID0gcHJvY2Vzc0l0ZW07XHJcbiAgICBcdFx0fVxyXG4gICAgXHR9KVxyXG4gICAgICAvLyBjb25zb2xlLmxvZyhwcm9jZXNzSW5zdGFuY2Uuc3ViUHJvY2Vzc2VzLmxlbmd0aCk7XHJcbiAgICAgIHV0aWwuc3luY0xvb3AocHJvY2Vzc0luc3RhbmNlLnN1YlByb2Nlc3Nlcy5sZW5ndGgsIGZ1bmN0aW9uKGxvb3Ape1xyXG4gIFx0XHRcdHZhciBjb3VudGVyID0gbG9vcC5pdGVyYXRpb24oKTtcclxuICAgICAgICB2YXIgcHJvY2Vzc1NlcSA9IHByb2Nlc3NJbnN0YW5jZS5zZXE7XHJcbiAgICAgICAgdmFyIHN1YlByb2Nlc3NJZCA9IHByb2Nlc3NJbnN0YW5jZS5zdWJQcm9jZXNzZXNbY291bnRlcl0uaWQ7XHJcbiAgICAgICAgdmFyIHN1YlByb2Nlc3NTZXEgPSBwcm9jZXNzSW5zdGFuY2Uuc3ViUHJvY2Vzc2VzW2NvdW50ZXJdLnNlcTtcclxuICAgICAgICBnZXRTdWJQcm9jZXNzKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBsYW5nLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihtb2RlbCl7XHJcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhtb2RlbCk7XHJcbiAgICAgICAgICBwcm9jZXNzTW9kZWwucHVzaChtb2RlbCk7XHJcbiAgICAgICAgICBsb29wLm5leHQoKTtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHByb2Nlc3NNb2RlbCk7XHJcbiAgXHRcdFx0fSwgZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHByb2Nlc3NNb2RlbCk7XHJcbiAgXHRcdFx0XHRsb29wLmJyZWFrKCk7XHJcbiAgXHRcdFx0XHRyZWplY3QoZXJyKTtcclxuICBcdFx0XHR9KTtcclxuICBcdFx0fSwgZnVuY3Rpb24oKXtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhwcm9jZXNzTW9kZWwpO1xyXG4gIFx0XHRcdHJlc29sdmUocHJvY2Vzc01vZGVsKTtcclxuICBcdFx0fSk7XHJcbiAgICB9IGNhdGNoKGVycil7XHJcbiAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgfVxyXG4gIH0pXHJcbn07XHJcblxyXG4gLyoqXHJcbiAgKiBHZXQgU3ViUHJvY2VzcyB1c2VyIGludGVyZmFjZSBkYXRhXHJcbiAgKlxyXG4gICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHByb2Nlc3MgaWRcclxuICAqIEBwYXJhbSB7bnVtYmVyfSBwcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHByb2Nlc3Mgc2VxXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gc3ViUHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3ViLXByb2Nlc3MgaWRcclxuICAqIEBwYXJhbSB7bnVtYmVyfSBzdWJQcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHN1Yi1wcm9jZXNzIHNlcVxyXG4gICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcclxuICAqXHJcbiAgKiBAZXhhbXBsZSAnJ1xyXG4gICpcclxuICAqIEByZXR1cm4gJydcclxuICAqXHJcbiAgKi9cclxuZnVuY3Rpb24gZ2V0U3ViUHJvY2Vzcyhwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgbGFuZywgX1dGSW5zdGFuY2Upe1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHZhciBtb2RlbCA9IHtcclxuICAgICAgICBpZDogJycsXHJcbiAgICAgICAgc2VxOiAnJyxcclxuICAgICAgICBuYW1lOiAnJyxcclxuICAgICAgICBoZWxwOiAnJyxcclxuICAgICAgICBkYXRlczogJycsXHJcbiAgICAgICAgc3RlcDogJydcclxuICAgICAgfTtcclxuICAgICAgdmFyIHN1YlByb2Nlc3MgPSBbXTtcclxuICAgIFx0dmFyIHN1YlByb2Nlc3NDb25mID0gW107XHJcbiAgICBcdF9XRkluc3RhbmNlLmluc3RhbmNlLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ocHJvY2Vzc0l0ZW0pe1xyXG4gICAgXHRcdGlmIChwcm9jZXNzSXRlbS5pZCA9PSBwcm9jZXNzSWQgJiYgcHJvY2Vzc0l0ZW0uc2VxID09IHByb2Nlc3NTZXEpIHtcclxuICAgIFx0XHRcdHZhciBzcExlbmd0aCA9IHByb2Nlc3NJdGVtLnN1YlByb2Nlc3Nlcy5sZW5ndGg7XHJcbiAgICBcdFx0XHRwcm9jZXNzSXRlbS5zdWJQcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHN1YlByb2Nlc3NJdGVtKXtcclxuICAgIFx0XHRcdFx0aWYgKHN1YlByb2Nlc3NJdGVtLmlkID09IHN1YlByb2Nlc3NJZCAmJiBzdWJQcm9jZXNzSXRlbS5zZXEgPT0gc3ViUHJvY2Vzc1NlcSAmJiBzdWJQcm9jZXNzSXRlbS5jb21wbGV0ZSA9PSBmYWxzZSkge1xyXG4gICAgXHRcdFx0XHRcdHN1YlByb2Nlc3MgPSBzdWJQcm9jZXNzSXRlbTtcclxuICAgIFx0XHRcdFx0fVxyXG4gICAgXHRcdFx0fSlcclxuICAgIFx0XHR9XHJcbiAgICBcdH0pXHJcbiAgICBcdC8vIEdldCB0aGUgY3VycmVudCBzdWJQcm9jZXNzIGNvbmZpZ3VyYXRpb25cclxuICAgIFx0X1dGSW5zdGFuY2UuY29uZmlnLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ocHJvY2Vzc0NvbmZpZyl7XHJcbiAgICBcdFx0aWYgKHByb2Nlc3NDb25maWcuX2lkID09IHByb2Nlc3NJZCkge1xyXG4gICAgXHRcdFx0cHJvY2Vzc0NvbmZpZy5zdWJQcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHN1YlByb2Nlc3NDb25maWcpe1xyXG4gICAgXHRcdFx0XHRpZiAoc3ViUHJvY2Vzc0NvbmZpZy5faWQgPT0gc3ViUHJvY2Vzc0lkKSB7XHJcbiAgICBcdFx0XHRcdFx0c3ViUHJvY2Vzc0NvbmYgPSBzdWJQcm9jZXNzQ29uZmlnO1xyXG4gICAgXHRcdFx0XHR9XHJcbiAgICBcdFx0XHR9KVxyXG4gICAgXHRcdH1cclxuICAgIFx0fSlcclxuICAgICAgLy8gVXBkYXRlIHRoZSBtb2RlbFxyXG4gICAgICBtb2RlbC5pZCA9IHN1YlByb2Nlc3NDb25mLl9pZDtcclxuICAgICAgbW9kZWwuc2VxID0gc3ViUHJvY2Vzcy5zZXE7XHJcbiAgICAgIG1vZGVsLm5hbWUgPSB1dGlsLmdldE5hbWUoc3ViUHJvY2Vzc0NvbmYubmFtZSwgbGFuZyk7XHJcbiAgICAgIG1vZGVsLmhlbHAgPSB1dGlsLmdldE5hbWUoc3ViUHJvY2Vzc0NvbmYuaGVscCwgbGFuZyk7XHJcbiAgICAgIG1vZGVsLmRhdGVzID0gc3ViUHJvY2Vzcy5kYXRlcztcclxuICAgICAgbW9kZWwuc3RlcCA9IHN1YlByb2Nlc3Muc3RlcDtcclxuICAgICAgcmVzb2x2ZShtb2RlbCk7XHJcbiAgICB9IGNhdGNoKGVycikge1xyXG4gICAgICByZWplY3QoZXJyKTtcclxuICAgIH1cclxuICB9KVxyXG59O1xyXG5cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gcHJlcGFyZU5vdGlmaWNhdGlvblNjcmVlbigpe1xyXG5cclxuICBcIlwiXHJcbn07XHJcblxyXG4gbW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gIGdldFByb2Nlc3M6IGdldFByb2Nlc3NcclxuXHJcbiB9XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcblxyXG5mdW5jdGlvbiBnZXQoKSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgIH0pO1xyXG5cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cclxuICAgIGdldDogZ2V0XHJcblxyXG59IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsaXR5Jyk7XHJcbnZhciBhY3Rpb25zTW9kdWxlID0gcmVxdWlyZSgnLi9hY3Rpb25zJyk7XHJcbnZhciBoZWxwZXIgPSByZXF1aXJlKCcuL2hlbHBlcicpO1xyXG52YXIgZm9ybSA9IHJlcXVpcmUoJy4vZm9ybScpO1xyXG5cclxuLyoqXHJcbiAqIFByb2Nlc3MgTW9kdWxlXHJcbiAqXHJcbiAqIEBtb2R1bGUgbGliL3Byb2Nlc3NcclxuICogQGF1dGhvciBCcmVudCBHb3Jkb25cclxuICogQHZlcnNpb24gMC4xLjBcclxuICogQGRlc2NyaXB0aW9uIHRlc3QgZGVzY3JpcHRpb25cclxuICpcclxuICovXHJcblxyXG4vKipcclxuICogQ291bnQgYW4gYXJyYXkgb2YgaXRlbXNcclxuICpcclxuICogQHBhcmFtIHtBcnJheX0gYXJyIC0gdGhlIGFycmF5IGRhdGFcclxuICpcclxuICogQGV4YW1wbGUgJydcclxuICpcclxuICogQHJldHVybiAnJ1xyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gY291bnQoYXJyKSB7XHJcbiAgICBpZiAoYXJyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gYXJyLmxlbmd0aDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFByb2Nlc3MgcHJlLXJlcXVpc2l0ZXNcclxuICpcclxuICogQHBhcmFtIHtvYmplY3R9IHByZXJlcXVpc2l0ZXMgLSB0aGUgcHJlLXJlcXVpc2l0ZXMgY29uZmlnIGRhdGFcclxuICpcclxuICogQGV4YW1wbGUgJydcclxuICpcclxuICogQHJldHVybiAnJ1xyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gcHJlUmVxdWlzaXRlcyhwcmVyZXF1aXNpdGVzLCBfV0ZJbnN0YW5jZSkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIC8vIFVuY29tbWVudCBiZWxvdyBzZWN0aW9uIHdoZW4gcmVhZHkgdG8gaW1wbGVtZW50XHJcbiAgICAgICAgdmFyIGNvbXBsZXRlZCA9IFtdO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHV0aWwuc3luY0xvb3AocHJlcmVxdWlzaXRlcy5sZW5ndGgsIGZ1bmN0aW9uKGxvb3ApIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb3VudGVyID0gbG9vcC5pdGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIHByZVJlcXVpc2l0ZShwcmVyZXF1aXNpdGVzW2NvdW50ZXJdLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgYWxsIHByZS1yZXF1aXNpdGVzIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuXHJcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVkLnB1c2godHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9vcC5uZXh0KCk7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQucHVzaChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9vcC5icmVhaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBsZXRlZC5ldmVyeShCb29sZWFuKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdQcmUtcmVxdWlzaXRlcyBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHt9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRlByZVJlcXVpc2l0ZUVycm9yJywgJ05vdCBhbGwgcHJlLXJlcXVpc2l0ZXMgcGFzc2VkLicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFByb2Nlc3MgcHJlLXJlcXVpc2l0ZSwgZXhlY3V0ZSB0aGUgcHJlLXJlcXVpc2l0ZSBjb25kaXRpb24uXHJcbiAqXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBwcmVyZXF1aXNpdGUgLSB0aGUgcHJlLXJlcXVpc2l0ZSBjb25maWcgZGF0YVxyXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcclxuICpcclxuICogQGV4YW1wbGVcclxuICogUHJvY2Vzcy5wcmVSZXF1aXNpdGUoY29uZmlnLCBjb3VudGVyLCBpbnN0YW5jZSwgZG9jKTtcclxuICpcclxuICogQHJldHVybiAnJ1xyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gcHJlUmVxdWlzaXRlKHByZXJlcXVpc2l0ZSwgX1dGSW5zdGFuY2UpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgdmFyIHN1YmplY3RDb3VudCA9ICcnO1xyXG5cclxuICAgICAgICBpZiAocHJlcmVxdWlzaXRlLmNoZWNrLm51bWJlclByb2Nlc3NJbnN0YW5jZXMgIT0gdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgbnVtYmVyUHJvY2Vzc0luc3RhbmNlcyA9IHByZXJlcXVpc2l0ZS5jaGVjay5udW1iZXJQcm9jZXNzSW5zdGFuY2VzO1xyXG4gICAgICAgICAgICB2YXIgX2ZpbHRlck9wZXJhdG9yID0gbnVtYmVyUHJvY2Vzc0luc3RhbmNlcy5vcGVyYXRvcjtcclxuICAgICAgICAgICAgdmFyIHhwYXRoT3BlcmF0b3IgPSAnJztcclxuICAgICAgICAgICAgc3dpdGNoIChfZmlsdGVyT3BlcmF0b3IpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2dyZWF0ZXJUaGFuJzpcclxuICAgICAgICAgICAgICAgICAgICB4cGF0aE9wZXJhdG9yID0gJ2d0JztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2xlc3NUaGFuJzpcclxuICAgICAgICAgICAgICAgICAgICB4cGF0aE9wZXJhdG9yID0gJ2x0JztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2dyZWF0ZXJUaGFuRXF1YWwnOlxyXG4gICAgICAgICAgICAgICAgICAgIHhwYXRoT3BlcmF0b3IgPSAnZ2UnO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnbGVzc1RoYW5FcXVhbCc6XHJcbiAgICAgICAgICAgICAgICAgICAgeHBhdGhPcGVyYXRvciA9ICdsZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdlcXVhbFRvJzpcclxuICAgICAgICAgICAgICAgICAgICB4cGF0aE9wZXJhdG9yID0gJ2VxJztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ25vdEVxdWFsVG8nOlxyXG4gICAgICAgICAgICAgICAgICAgIHhwYXRoT3BlcmF0b3IgPSAnbmUnO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgX3N1YnByb2Nlc3NJZCA9IG51bWJlclByb2Nlc3NJbnN0YW5jZXMuc3ViUHJvY2Vzc0lkO1xyXG4gICAgICAgICAgICB2YXIgX2ZpbHRlckVsZW1lbnQgPSBcInN0ZXAvc3RhdHVzXCI7XHJcbiAgICAgICAgICAgIHZhciBfZmlsdGVyVmFsdWUgPSBudW1iZXJQcm9jZXNzSW5zdGFuY2VzLnR5cGU7XHJcbiAgICAgICAgICAgIHZhciBpbm5lclhwYXRoID0gXCIvXCIgKyBfZmlsdGVyRWxlbWVudCArIFwiWy4gZXEgJ1wiICsgX2ZpbHRlclZhbHVlICsgXCInXVwiO1xyXG4gICAgICAgICAgICB2YXIgZnVsbFBhdGggPSBcImNvdW50KC9zdWJwcm9jZXNzZXNbaWQgZXEgJ1wiICsgX3N1YnByb2Nlc3NJZCArIFwiJ11cIiArIGlubmVyWHBhdGggKyBcIilcIjtcclxuICAgICAgICAgICAgc3ViamVjdENvdW50ID0gSlNPTi54cGF0aChmdWxsUGF0aCwgX1dGSW5zdGFuY2UsIHt9KVswXTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChwcmVyZXF1aXNpdGUuY2hlY2sudmFyaWFibGVDb25maXJtICE9IHVuZGVmaW5lZCkge1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgdmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZQcmVSZXF1aXNpdGVFcnJvcicsICdQcmUtcmVxdWlzaXRlIHR5cGUgbm90IGRlZmluZWQuJyk7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGNvbXBhcmUgPSAnJztcclxuXHJcbiAgICAgICAgaWYgKHByZXJlcXVpc2l0ZS5jaGVjay5udW1iZXJQcm9jZXNzSW5zdGFuY2VzKSB7XHJcbiAgICAgICAgICAgIGNvbXBhcmUgPSB1dGlsLmNvbXBhcmUoc3ViamVjdENvdW50LCBwcmVyZXF1aXNpdGUuY2hlY2subnVtYmVyUHJvY2Vzc0luc3RhbmNlcy5vcGVyYXRvciwgcGFyc2VJbnQocHJlcmVxdWlzaXRlLmNoZWNrLm51bWJlclByb2Nlc3NJbnN0YW5jZXMuY291bnQpKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHByZXJlcXVpc2l0ZS5jaGVjay52YXJpYWJsZUNvbmZpcm0pIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY29tcGFyZSkge1xyXG4gICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnUHJlLXJlcXVpc2l0ZXMgcGFzc2VkLicsIHt9KTtcclxuICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBoZWxwZXIuZ2V0TGFuZ3VhZ2VNZXNzYWdlKHByZXJlcXVpc2l0ZS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgdmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZQcmVSZXF1aXNpdGVFcnJvcicsIG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBQcm9jZXNzIHByZS1hY3Rpb25zc1xyXG4gKlxyXG4gKiBAcGFyYW0ge29iamVjdH0gcHJlQWN0aW9ucyAtIHRoZSBwcmUtYWN0aW9ucyBjb25maWcgZGF0YVxyXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxyXG4gKlxyXG4gKiBAZXhhbXBsZSAnJ1xyXG4gKlxyXG4gKiBAcmV0dXJuICcnXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiBwcmVBY3Rpb25zKHByZUFjdGlvbnMsIF9XRkluc3RhbmNlKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgdmFyIGNvbXBsZXRlZCA9IFtdO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHV0aWwuc3luY0xvb3AocHJlQWN0aW9ucy5sZW5ndGgsIGZ1bmN0aW9uKGxvb3ApIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb3VudGVyID0gbG9vcC5pdGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGFjdGlvbihwcmVBY3Rpb25zW2NvdW50ZXJdLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgYWxsIHByZS1yZXF1aXNpdGVzIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuXHJcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVkLnB1c2godHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9vcC5uZXh0KCk7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQucHVzaChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9vcC5icmVhaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBsZXRlZC5ldmVyeShCb29sZWFuKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdQcmUtYWN0aW9ucyBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHt9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRlByZVJlcXVpc2l0ZUVycm9yJywgJ05vdCBhbGwgcHJlLWFjdGlvbnMgcGFzc2VkLicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdvcmtmbG93IGdldCBzdWItcHJvY2VzcyBkYXRhLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gaWQgLSB0aGUgc3ViUHJvY2VzcyBjb25maWcgaWRcclxuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcclxuICpcclxuICogQGV4YW1wbGUgXCJcIlxyXG4gKlxyXG4gKiBAcmV0dXJuIFwiXCJcclxuICpcclxuICovXHJcbmZ1bmN0aW9uIGdldFN1YlByb2Nlc3MoaWQsIF9XRkluc3RhbmNlKSB7XHJcbiAgICBpZiAoX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihzdWJQcm9jZXNzKSB7XHJcbiAgICAgICAgICAgIGlmIChzdWJQcm9jZXNzLmlkID09IGlkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3ViUHJvY2VzcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn07XHJcblxyXG4vKipcclxuICogUHJvY2VzcyBzdWItcHJvY2Vzc1xyXG4gKlxyXG4gKiBAcGFyYW0ge29iamVjdH0gcHJvY2VzcyAtIHRoZSBjdXJyZW50IHByb2Nlc3MgaWQgYW5kIHNlcVxyXG4gKiBAcGFyYW0ge29iamVjdH0gc3ViUHJvY2VzcyAtIHRoZSBzdWItcHJvY2VzcyBpZCBhbmQgc2VxXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIC0gdGhlIHVzZXIgaW5wdXQgZGF0YVxyXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxyXG4gKlxyXG4gKiBAZXhhbXBsZSAnJ1xyXG4gKlxyXG4gKiBAcmV0dXJuICcnXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiBzdWJQcm9jZXNzKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBkYXRhLCBfV0ZJbnN0YW5jZSkge1xyXG4gICAgLy8gR2V0IHRoZSBjdXJyZW50IHByb2Nlc3Mgc3ViUHJvY2VzcyBpbnN0YW5jZVxyXG4gICAgLy8gdmFyIHN1YlByb2Nlc3NTZXEgPSAxO1xyXG4gICAgdmFyIHN1YlByb2Nlc3MgPSBbXTtcclxuICAgIHZhciBwcm9jZXNzQ29uZiA9IFtdO1xyXG4gICAgdmFyIHN1YlByb2Nlc3NDb25mID0gW107XHJcbiAgICBfV0ZJbnN0YW5jZS5pbnN0YW5jZS5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKG9ialByb2Nlc3MpIHtcclxuICAgICAgICBpZiAob2JqUHJvY2Vzcy5pZCA9PSBwcm9jZXNzSWQgJiYgb2JqUHJvY2Vzcy5zZXEgPT0gcHJvY2Vzc1NlcSkge1xyXG4gICAgICAgICAgICB2YXIgc3BMZW5ndGggPSBvYmpQcm9jZXNzLnN1YlByb2Nlc3Nlcy5sZW5ndGg7XHJcbiAgICAgICAgICAgIG9ialByb2Nlc3Muc3ViUHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmpTdWJQcm9jZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqU3ViUHJvY2Vzcy5pZCA9PSBzdWJQcm9jZXNzSWQgJiYgb2JqU3ViUHJvY2Vzcy5zZXEgPT0gc3ViUHJvY2Vzc1NlcSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB1dWlkID0gb2JqU3ViUHJvY2Vzcy51dWlkO1xyXG4gICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24oc3ViUHJvY2Vzc0l0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1YlByb2Nlc3NJdGVtLl9pZCA9PSB1dWlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzID0gc3ViUHJvY2Vzc0l0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG4gICAgLy8gR2V0IHRoZSBjdXJyZW50IHN1YlByb2Nlc3MgY29uZmlndXJhdGlvblxyXG4gICAgX1dGSW5zdGFuY2UuY29uZmlnLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ocHJvY2Vzc0NvbmZpZykge1xyXG4gICAgICAgIGlmIChwcm9jZXNzQ29uZmlnLl9pZCA9PSBwcm9jZXNzSWQpIHtcclxuICAgICAgICAgICAgcHJvY2Vzc0NvbmYgPSBwcm9jZXNzQ29uZmlnO1xyXG4gICAgICAgICAgICBwcm9jZXNzQ29uZmlnLnN1YlByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24oc3ViUHJvY2Vzc0NvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN1YlByb2Nlc3NDb25maWcuX2lkID09IHN1YlByb2Nlc3NJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NDb25mID0gc3ViUHJvY2Vzc0NvbmZpZztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG4gICAgLy8gaWYgKHN1YlByb2Nlc3MubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAvLyBcdHN1YlByb2Nlc3NTZXEgPSBzdWJQcm9jZXNzLmxlbmd0aCArIDE7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gVGhlIGRlZmF1bHQgc3ViUHJvY2VzcyBtb2RlbFxyXG5cclxuICAgIC8vVE9ETzogQ2hhbmdlIHJlcXVpcmVkIHRvIG1vdmUgaXNBY3RpdmUgdG8gc3ViUHJvY2VzcyBmaWxlLkhlcmVcclxuXHJcbiAgICB2YXIgZ3JvdXBLZXkgPSAnJztcclxuICAgIHZhciBiYXNlVVVJRCA9IGRhdGEuYmFzZVVVSUQ7XHJcbiAgICBpZiAoYmFzZVVVSUQgIT0gdW5kZWZpbmVkICYmIGJhc2VVVUlEICE9ICcnICYmIGJhc2VVVUlELmxlbmd0aCA+IDApIHtcclxuICAgICAgICB2YXIgcHJldmlvdXNPYmplY3QgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgYmFzZVVVSUQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XHJcbiAgICAgICAgZ3JvdXBLZXkgPSBwcmV2aW91c09iamVjdC5ncm91cEtleTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZ3JvdXBLZXkgPSBnZW5lcmF0ZVVVSUQoKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgc3ViUHJvY2Vzc09iamVjdElkID0gZ2VuZXJhdGVVVUlEKCk7XHJcbiAgICB2YXIgbW9kZWwgPSB7XHJcbiAgICAgICAgX2lkOiBzdWJQcm9jZXNzT2JqZWN0SWQsXHJcbiAgICAgICAgaWQ6IHN1YlByb2Nlc3NJZCxcclxuICAgICAgICB0eXBlOiAnd29ya2Zsb3dJbnN0YW5jZVN1YlByb2Nlc3MnLFxyXG4gICAgICAgIHNlcTogc3ViUHJvY2Vzc1NlcSxcclxuICAgICAgICBpbml0aWF0ZWQ6IGZhbHNlLFxyXG4gICAgICAgIGRhdGVzOiB7XHJcbiAgICAgICAgICAgIGNyZWF0ZWQ6ICcnLFxyXG4gICAgICAgICAgICB2YWxpZDogJycsXHJcbiAgICAgICAgICAgIGR1ZTogJycsXHJcbiAgICAgICAgICAgIGNsb3NlZDogJydcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXBsZXRlOiBmYWxzZSxcclxuICAgICAgICBpbmRpY2F0b3JzOiBbXSxcclxuICAgICAgICBzdGVwOiB7fSxcclxuICAgICAgICBhY3RpdmU6IHRydWUsXHJcbiAgICAgICAgZ3JvdXBLZXk6IGdyb3VwS2V5LFxyXG4gICAgICAgIGNoYW5uZWxzOiBbXHJcbiAgICAgICAgICAgIFwiY29tbXVuaXR5X1wiICsgYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCksXHJcbiAgICAgICAgICAgIFwicHJvZmlsZV9cIiArIGFwcC5TQ09QRS5wcm9maWxlSWQsXHJcbiAgICAgICAgICAgIFwiYXBwbGljYXRpb25fXCIgKyBhcHAuU0NPUEUuYXBwbGljYXRpb25JZCxcclxuICAgICAgICAgICAgXCJjb21tdW5pdHlfXCIgKyBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKSArIFwiX2FwcGxpY2F0aW9uX1wiICsgYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWRcclxuICAgICAgICBdXHJcbiAgICB9O1xyXG5cclxuICAgIF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlcy5wdXNoKG1vZGVsKTtcclxuICAgIC8vIFJldHVybiBhIHByb21pc2VcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAvLyBDYXRjaCBhbGwgdW5jYXVnaHQgZXJyb3JzXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gMS4gUHJvY2VzcyB0aGUgcHJlLWFjdGlvbnNcclxuICAgICAgICAgICAgdmFyIHByZUFjdGlvbnNDb25mID0gcHJvY2Vzc0NvbmYucHJlQWN0aW9ucztcclxuICAgICAgICAgICAgcHJlQWN0aW9ucyhwcmVBY3Rpb25zQ29uZiwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAvLyAyLiBQcm9jZXNzIHRoZSBwcmUtcmVxdWlzaXRlc1xyXG4gICAgICAgICAgICAgICAgdmFyIHByZXJlcXVpc2l0ZUNvbmYgPSBwcm9jZXNzQ29uZi5wcmVyZXF1aXNpdGVzO1xyXG4gICAgICAgICAgICAgICAgcHJlUmVxdWlzaXRlcyhwcmVyZXF1aXNpdGVDb25mLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAzLiBJbml0aWF0ZSB0aGUgc3ViUHJvY2Vzc1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbml0aWF0ZUNvbmYgPSBzdWJQcm9jZXNzQ29uZi5pbml0aWF0ZTtcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWF0ZShpbml0aWF0ZUNvbmYsIHN1YlByb2Nlc3MsIGRhdGEpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vVXBkYXRlIHRoZSBzdWJQcm9jZXNzIG1vZGVsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLmluaXRpYXRlZCA9IHJlc3VsdC5kYXRhLmluaXRpYXRlZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuZGF0ZXMgPSByZXN1bHQuZGF0YS5kYXRlcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRXhlY3V0ZSB0aGUgZmlyc3Qgc3RlcFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RlcElkID0gc3ViUHJvY2Vzc0NvbmYuc3RlcHNbMF0uX2lkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHJhbnNpdGlvbklkID0gc3ViUHJvY2Vzc0NvbmYuc3RlcHNbMF0udHJhbnNpdGlvblswXS5faWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGVwU2VxID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcChwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3RlcElkLCBzdGVwU2VxLCBkYXRhLCBfV0ZJbnN0YW5jZSwgc3ViUHJvY2Vzc09iamVjdElkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLnN0ZXAgPSByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGluZGljYXRvciBzZWN0aW9ucyBvZiB0aGUgc3ViUHJvY2Vzc1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRpY2F0b3JzKHN1YlByb2Nlc3NDb25mLmluZGljYXRvcnMsIF9XRkluc3RhbmNlLCBtb2RlbC5faWQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0MSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuaW5kaWNhdG9ycyA9IHJlc3VsdDEuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRXhlY3V0ZSB0aGUgdHJhbnNpdGlvbnMsIGlmIGF1dG9cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwb3N0QWN0aW9uc0NvbmYgPSBwcm9jZXNzQ29uZi5wb3N0QWN0aW9ucztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zdEFjdGlvbnMocG9zdEFjdGlvbnNDb25mLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKHJlc3VsdC5tZXNzYWdlLCBtb2RlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzID0gX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhKG9iai5faWQgPT0gc3ViUHJvY2Vzc09iamVjdElkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMgPSBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gIShvYmouX2lkID09IHN1YlByb2Nlc3NPYmplY3RJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLnN1YnByb2Nlc3NlcyA9IF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEob2JqLl9pZCA9PSBzdWJQcm9jZXNzT2JqZWN0SWQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFByb2Nlc3MgaW5pdGlhdGVcclxuICpcclxuICogQHBhcmFtIHtvYmplY3R9IGluaXRpYXRlIC0gdGhlIGluaXRpYXRlIGNvbmZpZyBkYXRhXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIC0gdGhlIHVzZXIgaW5wdXQgZGF0YVxyXG4gKlxyXG4gKiBAZXhhbXBsZSAnJ1xyXG4gKlxyXG4gKiBAcmV0dXJuICcnXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiBpbml0aWF0ZShpbml0aWF0ZSwgc3ViUHJvY2VzcywgZGF0YSkge1xyXG4gICAgdmFyIGNvbXBsZXRlZCA9IFtdO1xyXG4gICAgdmFyIHJlc3VsdCA9IHtcclxuICAgICAgICBpbml0aWF0ZWQ6IGZhbHNlLFxyXG4gICAgICAgIGRhdGVzOiB7XHJcbiAgICAgICAgICAgIGNyZWF0ZWQ6ICcnLFxyXG4gICAgICAgICAgICB2YWxpZDogJycsXHJcbiAgICAgICAgICAgIGR1ZTogJycsXHJcbiAgICAgICAgICAgIGNsb3NlZDogJydcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChpbml0aWF0ZS51c2VyICE9IHVuZGVmaW5lZCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHJlc3VsdC5kYXRlcy5jcmVhdGVkID0gZGF0YS5jcmVhdGVkRGF0ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaW5pdGlhdGUudXNlci52YWxpZERhdGUuX3R5cGUgPT0gJ3VzZXJTZWxlY3RlZCcgfHwgaW5pdGlhdGUudXNlci52YWxpZERhdGUuX3R5cGUgPT0gJ2F1dG9TZWxlY3RlZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS52YWxpZERhdGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZGF0ZXMudmFsaWQgPSBkYXRhLnZhbGlkRGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlsLndhcm4oJ1dGSW5pdGlhdGVFcnJvcicsICdObyB2YWxpZCBkYXRlIHBhc3NlZCBpbiAtIHtkYXRhLnZhbGlkRGF0ZX0nKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpbml0aWF0ZS51c2VyLmR1ZURhdGUuX3R5cGUgPT0gJ3VzZXJTZWxlY3RlZCcgfHwgaW5pdGlhdGUudXNlci5kdWVEYXRlLl90eXBlID09ICdhdXRvU2VsZWN0ZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuZHVlRGF0ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5kYXRlcy5kdWUgPSBkYXRhLmR1ZURhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC53YXJuKCdXRkluaXRpYXRlRXJyb3InLCAnTm8gZHVlIGRhdGUgcGFzc2VkIGluIC0ge2RhdGEuZHVlRGF0ZX0nKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJlc3VsdC5pbml0aWF0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1N1Yi1Qcm9jZXNzIGluaXRpYXRlIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywgcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGluaXRpYXRlLmF1dG8gIT0gdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5kYXRlcy5jcmVhdGVkID0gZGF0YS5jcmVhdGVkRGF0ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaW5pdGlhdGUuZGF0ZXMudmFsaWQuX3R5cGUgPT0gJ3VzZXJTZWxlY3RlZCcgfHwgaW5pdGlhdGUuZGF0ZXMudmFsaWQuX3R5cGUgPT0gJ2F1dG9TZWxlY3RlZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS52YWxpZERhdGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZGF0ZXMudmFsaWQgPSBkYXRhLnZhbGlkRGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlsLndhcm4oJ1dGSW5pdGlhdGVFcnJvcicsICdObyB2YWxpZCBkYXRlIHBhc3NlZCBpbiAtIHtkYXRhLnZhbGlkRGF0ZX0nKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpbml0aWF0ZS5kYXRlcy5kdWUuX3R5cGUgPT0gJ3VzZXJTZWxlY3RlZCcgfHwgaW5pdGlhdGUuZGF0ZXMuZHVlLl90eXBlID09ICdhdXRvU2VsZWN0ZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuZHVlRGF0ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5kYXRlcy5kdWUgPSBkYXRhLmR1ZURhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC53YXJuKCdXRkluaXRpYXRlRXJyb3InLCAnTm8gZHVlIGRhdGUgcGFzc2VkIGluIC0ge2RhdGEuZHVlRGF0ZX0nKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJlc3VsdC5pbml0aWF0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1N1Yi1Qcm9jZXNzIGluaXRpYXRlIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywgcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7Ki9cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZJbml0aWF0ZUVycm9yJywgJ0luaXRpYXRlIHR5cGU6ICcgKyBpbml0aWF0ZS5fdHlwZSArICcgbm90IGRlZmluZWQuJyk7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzdWJQcm9jZXNzLmNvbXBsZXRlID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpbml0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICghc3ViUHJvY2Vzcy5jb21wbGV0ZSkge1xyXG4gICAgICAgICAgICBpZiAoaW5pdGlhdGUucGFyYWxsZWxJbnN0YW5jZXMpIHtcclxuICAgICAgICAgICAgICAgIGluaXQoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGSW5pdGlhdGVFcnJvcicsICdTdWItcHJvY2VzczogJyArIHN1YlByb2Nlc3MuaWQgKyAnIHN0aWxsIGFjdGl2ZSBhbmQgcGFyYWxsZWwgaW5zdGFuY2VzIGFyZSBub3QgYWxsb3dlZC4nKTtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFByb2Nlc3Mgc3RlcFxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIGN1cnJlbnQgcHJvY2VzcyBpZFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3ViUHJvY2Vzc0lkIC0gdGhlIGN1cnJlbnQgc3ViLXByb2Nlc3MgaWRcclxuICogQHBhcmFtIHtzdHJpbmd9IHN0ZXBJZCAtIHRoZSBjdXJyZW50IHN1Yi1wcm9jZXNzIHN0ZXAgaWRcclxuICogQHBhcmFtIHtudW1iZXJ9IHN0ZXBTZXEgLSB0aGUgY3VycmVudCBzdWItcHJvY2VzcyBzdGVwIGluc3RhbmNlIGNvdW50ZXIgLyBzZXF1ZW5jZVxyXG4gKiBAcGFyYW0ge29iamVjdH0gZGF0YSAtIHRoZSB1c2VyIGlucHV0IGRhdGFcclxuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgX1dGSW5zdGFuY2UgY29uc3RydWN0b3IgaW5zdGFuY2VcclxuICpcclxuICogQGV4YW1wbGUgJydcclxuICpcclxuICogQHJldHVybiAnJ1xyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gc3RlcChwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3RlcElkLCBzdGVwU2VxLCBkYXRhLCBfV0ZJbnN0YW5jZSwgc3B1dWlkKSB7XHJcblxyXG4gICAgLy8gRGVmYXVsdCBzdGVwIG1vZGVsXHJcbiAgICB2YXIgbW9kZWwgPSB7XHJcbiAgICAgICAgaWQ6ICcnLFxyXG4gICAgICAgIHNlcTogJycsXHJcbiAgICAgICAgc3RhdHVzOiAnJyxcclxuICAgICAgICBtZXNzYWdlOiAnJyxcclxuICAgICAgICBhc3NpZ25lZFRvOiB7XHJcbiAgICAgICAgICAgIHVzZXJJZDogJycsXHJcbiAgICAgICAgICAgIG5hbWU6ICcnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhc3NpZ25tZW50OiB7fSxcclxuICAgICAgICBjb21tZW50OiAnJ1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgc3ViUHJvY2VzcyA9IHt9O1xyXG5cclxuICAgIHZhciB1dWlkID0gJyc7XHJcbiAgICB2YXIgaW5zdFN1YlByb2Nlc3M7XHJcbiAgICB2YXIgc3RlcCA9IHt9O1xyXG5cclxuICAgIHZhciB0cmFuc2l0aW9uSWQgPSAnJztcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvL0dldCB0aGUgY3VycmVudCBzdWJQcm9jZXNzIGluc3RhbmNlIGRhdGFcclxuXHJcbiAgICAgICAgICAgIF9XRkluc3RhbmNlLmluc3RhbmNlLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqUHJvY2Vzcykge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChvYmpQcm9jZXNzLmlkID09IHByb2Nlc3NJZCAmJiBvYmpQcm9jZXNzLnNlcSA9PSBwcm9jZXNzU2VxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqUHJvY2Vzcy5zdWJQcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKG9ialN1YlByb2Nlc3MpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmpTdWJQcm9jZXNzLmlkID09IHN1YlByb2Nlc3NJZCAmJiBvYmpTdWJQcm9jZXNzLnNlcSA9PSBzdWJQcm9jZXNzU2VxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dWlkID0gb2JqU3ViUHJvY2Vzcy51dWlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHN1YlByb2Nlc3NJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3ViUHJvY2Vzc0l0ZW0uX2lkID09IHV1aWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnN0U3ViUHJvY2VzcyA9IHN1YlByb2Nlc3NJdGVtO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgX1dGSW5zdGFuY2UuY29uZmlnLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqUHJvY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9ialByb2Nlc3MuX2lkID09IHByb2Nlc3NJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9ialByb2Nlc3Muc3ViUHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmpTdWJQcm9jZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmpTdWJQcm9jZXNzLl9pZCA9PSBzdWJQcm9jZXNzSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3MgPSBvYmpTdWJQcm9jZXNzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqU3ViUHJvY2Vzcy5zdGVwcy5maWx0ZXIoZnVuY3Rpb24ob2JqU3RlcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmpTdGVwLl9pZCA9PSBzdGVwSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcCA9IG9ialN0ZXA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIHN1Yi1wcm9jZXNzIHN0ZXAgZGF0YVxyXG4gICAgICAgICAgICBtb2RlbC5pZCA9IHN0ZXBJZDtcclxuICAgICAgICAgICAgbW9kZWwuc2VxID0gc3RlcFNlcTtcclxuXHJcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZVN0YXR1cyA9ICcnO1xyXG4gICAgICAgICAgICBpZiAoc3RlcC5zZXRJbnN0YW5jZVN0YXR1c1RvLk5vdFN0YXJ0ZWQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVN0YXR1cyA9IFwiTm90U3RhcnRlZFwiO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0ZXAuc2V0SW5zdGFuY2VTdGF0dXNUby5DcmVhdGVkICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2VTdGF0dXMgPSBcIkNyZWF0ZWRcIjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGVwLnNldEluc3RhbmNlU3RhdHVzVG8uSW5Qcm9ncmVzcyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlU3RhdHVzID0gXCJJblByb2dyZXNzXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RlcC5zZXRJbnN0YW5jZVN0YXR1c1RvLlN1Ym1pdHRlZCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlU3RhdHVzID0gXCJTdWJtaXR0ZWRcIjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGVwLnNldEluc3RhbmNlU3RhdHVzVG8uQ29tcGxldGUgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVN0YXR1cyA9IFwiQ29tcGxldGVcIjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGxhbmd1YWdlID0gc2VydmljZS5nZXRMYW5ndWFnZSgpO1xyXG5cclxuICAgICAgICAgICAgbW9kZWwuc3RhdHVzID0gaW5zdGFuY2VTdGF0dXM7XHJcbiAgICAgICAgICAgIG1vZGVsLm1lc3NhZ2UgPSBldmFsKFwic3RlcC5zZXRJbnN0YW5jZVN0YXR1c1RvLlwiICsgaW5zdGFuY2VTdGF0dXMgKyBcIi5sYWJlbC5pMThuLlwiICsgbGFuZ3VhZ2UpO1xyXG4gICAgICAgICAgICAvL21vZGVsLmFzc2lnbmVkVG8udXNlcklkID0gZGF0YS51c2VySWQgIT09IHVuZGVmaW5lZCA/IGRhdGEudXNlcklkIDogJyc7XHJcbiAgICAgICAgICAgIC8vbW9kZWwuYXNzaWduZWRUby5uYW1lID0gZGF0YS5uYW1lICE9PSB1bmRlZmluZWQgPyBkYXRhLm5hbWUgOiAnJztcclxuICAgICAgICAgICAgbW9kZWwuY29tbWVudCA9IGRhdGEuY29tbWVudCAhPT0gdW5kZWZpbmVkID8gZGF0YS5jb21tZW50IDogJyc7XHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgaW5kaWNhdG9yIGRvY3VtZW50cyBwcm9jZXNzIHN0ZXAgZGF0YVxyXG4gICAgICAgICAgICAvL2NvbXNvLmxvZygnaW5zdFN1YlByb2Nlc3M9PT0nKTtcclxuICAgICAgICAgICAgLy9jb21zby5sb2coaW5zdFN1YlByb2Nlc3MpO1xyXG4gICAgICAgICAgICB2YXIgaW5kaWNhdG9ycyA9IGluc3RTdWJQcm9jZXNzICE9PSB1bmRlZmluZWQgPyBpbnN0U3ViUHJvY2Vzcy5pbmRpY2F0b3JzIDogW107XHJcbiAgICAgICAgICAgIGluZGljYXRvckRvY3MocHJvY2Vzc0lkLCBpbmRpY2F0b3JzLCBtb2RlbCwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBJZiBhY3Rpb25zIGFyZSBzcGVjaWZpZWQsIGV4ZWN1dGUgdGhlbVxyXG4gICAgICAgICAgICAgICAgdXVpZCA9IHNwdXVpZDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc3RlcC5mdW5jdGlvbi5hY3Rpb25zICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbnMoc3RlcC5mdW5jdGlvbi5hY3Rpb25zLCBwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3ViUHJvY2VzcywgbW9kZWwsIF9XRkluc3RhbmNlLCBkYXRhLCBzcHV1aWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRXhlY3V0ZSB0aGUgdHJhbnNpdGlvbnMsIGlmIGF1dG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0cmFuc2l0aW9uSWQgPSBzdGVwLnRyYW5zaXRpb25bMF0uX2lkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbihwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3RlcElkLCB0cmFuc2l0aW9uSWQsIGRhdGEsIF9XRkluc3RhbmNlLCBzcHV1aWQsIG1vZGVsKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdUcmFuc2l0aW9uIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywgcmVzdWx0LmRhdGEuc3RlcCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRWxzZSB0YXNrcyBhcmUgc3ByZWNpZmllZCwgZXhlY3V0ZSB0aGVtXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0ZXAuZnVuY3Rpb24udGFzayAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBNYWtlIGFzc2lnbm1lbnRzXHJcbiAgICAgICAgICAgICAgICAgICAgdGFzayhwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN0ZXAuZnVuY3Rpb24udGFzaywgc3B1dWlkLCBtb2RlbCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZG8gdGFzayBzdWNjZXNzIGhhbmRsaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdUYXNrIGNvbXBsZXRlLicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnVGFzayBhd2FpdGluZyB1c2VyIGFjdGlvbi4nLCBtb2RlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBQcm9jZXNzIGluZGljYXRvciB1cGRhdGVzXHJcbiAqXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBhY3Rpb25zIC0gdGhlIGFjdGlvbnMgY29uZmlnIGRhdGFcclxuICogQHBhcmFtIHtvYmplY3R9IHN1YlByb2Nlc3MgLSB0aGUgY3VycmVudCBzdWItcHJvY2VzcyBmb3JtIGNvbmZpZyBkYXRhXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXHJcbiAqXHJcbiAqIEBleGFtcGxlICcnXHJcbiAqXHJcbiAqIEByZXR1cm4gJydcclxuICpcclxuICovXHJcbmZ1bmN0aW9uIGluZGljYXRvcnMoaW5kaWNhdG9ycywgX1dGSW5zdGFuY2UsIHNwdXVpZCkge1xyXG4gICAgdmFyIG1vZGVsID0gW107XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBpbmRpY2F0b3Igc2VjdGlvbnMgb2YgdGhlIHN1YlByb2Nlc3NcclxuXHJcbiAgICAgICAgICAgIHZhciBhcnJheSA9IEpTT04ueHBhdGgoXCJpbmRpY2F0b3JzW2ZuOmNvdW50KC4vd29ya2Zsb3dzL3Byb2Nlc3Nlc1tzdWJQcm9jZXNzVVVJRCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddKSBndCAwXVwiLCBfV0ZJbnN0YW5jZSwge30pO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGFycmF5Lmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yID0gYXJyYXlbal07XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yTW9kZWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlczogW11cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgaW5zdGFuY2VNb2RlbCA9IHtcclxuICAgICAgICAgICAgICAgICAgICB1dWlkOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJycsXHJcbiAgICAgICAgICAgICAgICAgICAga2V5OiAnJyxcclxuICAgICAgICAgICAgICAgICAgICBzZXE6IDFcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpbmRpY2F0b3JNb2RlbC5pZCA9IGluZGljYXRvci5jYXRlZ29yeS50ZXJtO1xyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2VNb2RlbC51dWlkID0gaW5kaWNhdG9yLl9pZDtcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlTW9kZWwudGl0bGUgPSBpbmRpY2F0b3IudGl0bGU7XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZU1vZGVsLmtleSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2VNb2RlbC5zZXEgPSBpbmRpY2F0b3IubW9kZWwucGVuZGluZy5zZXE7IC8vIGluZGljYXRvciBzZXEgbnVtYmVyIGhlcmUgd2hpY2ggaXMgZ2V0dGluZyB1cGRhdGVkLlxyXG4gICAgICAgICAgICAgICAgaW5kaWNhdG9yTW9kZWwuaW5zdGFuY2VzLnB1c2goaW5zdGFuY2VNb2RlbCk7XHJcbiAgICAgICAgICAgICAgICBtb2RlbC5wdXNoKGluZGljYXRvck1vZGVsKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1Byb2Nlc3MgaW5kaWNhdG9yIG1vZGVsIHVwZGF0ZWQuJywgbW9kZWwpO1xyXG4gICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSlcclxufTtcclxuXHJcbi8qKlxyXG4gKiBQcm9jZXNzIGFzc2lnbiB1c2VyXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBwcm9jZXNzIGlkXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHByb2Nlc3Mgc2VxXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdWJQcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdWItcHJvY2VzcyBpZFxyXG4gKiBAcGFyYW0ge251bWJlcn0gc3ViUHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBzdWItcHJvY2VzcyBzZXFcclxuICogQHBhcmFtIHtzdHJpbmd9IHN0ZXBJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN0ZXAgaWRcclxuICogQHBhcmFtIHtzdHJpbmd9IHRyYW5zaXRpb25JZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHRyYW5zaXRpb24gaWRcclxuICogQHBhcmFtIHtvYmplY3R9IHVzZXIgLSB0aGUgdXNlciB0byBhc3NpZ24gdG9cclxuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcclxuICpcclxuICogQGV4YW1wbGUgJydcclxuICpcclxuICogQHJldHVybiAnJ1xyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gYXNzaWduVXNlcihwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgdXNlciwgX1dGSW5zdGFuY2UpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YXIgdXVpZCA9ICcnO1xyXG4gICAgICAgICAgICAvLyBHZXQgdGhlIGN1cnJlbnQgc3ViUHJvY2VzcyBpbnN0YW5jZSBkYXRhXHJcbiAgICAgICAgICAgIF9XRkluc3RhbmNlLmluc3RhbmNlLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqUHJvY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9ialByb2Nlc3MuaWQgPT0gcHJvY2Vzc0lkICYmIG9ialByb2Nlc3Muc2VxID09IHByb2Nlc3NTZXEpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmpQcm9jZXNzLnN1YlByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqU3ViUHJvY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqU3ViUHJvY2Vzcy5pZCA9PSBzdWJQcm9jZXNzSWQgJiYgb2JqU3ViUHJvY2Vzcy5zZXEgPT0gc3ViUHJvY2Vzc1NlcSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXVpZCA9IG9ialN1YlByb2Nlc3MudXVpZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihzdWJQcm9jZXNzSXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN1YlByb2Nlc3NJdGVtLl9pZCA9PSB1dWlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0IHRoZSB1c2VyIGRldGFpbHNcclxuICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzSXRlbS5zdGVwLmFzc2lnbmVkVG8udXNlcklkID0gdXNlci5pZDtcclxuICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzSXRlbS5zdGVwLmFzc2lnbmVkVG8ubmFtZSA9IHVzZXIubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGluZGljYXRvcnMgdXNlciBkZXRhaWxzXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvcnMgPSBzdWJQcm9jZXNzSXRlbS5pbmRpY2F0b3JzO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5kaWNhdG9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yID0gaW5kaWNhdG9yc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBpbmRpY2F0b3IuaW5zdGFuY2VzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSBpbmRpY2F0b3IuaW5zdGFuY2VzW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRvYyA9IF9XRkluc3RhbmNlLmluZGljYXRvcnNba107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlLnV1aWQgPT0gZG9jLl9pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2Mud29ya2Zsb3dzLmZpbHRlcihmdW5jdGlvbih3b3JrZmxvdykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdvcmtmbG93LmlkID09IF9XRkluc3RhbmNlLmNvbmZpZy5faWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3b3JrZmxvdy5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHByb2Nlc3NJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzSXRlbS5pZCA9PSBwcm9jZXNzSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgdXNlciBpZCBhbmQgbmFtZSBpbiB0aGUgZG9jdW1lbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NJdGVtLnN0ZXAuYXNzaWduZWRUby51c2VySWQgPSB1c2VyLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0l0ZW0uc3RlcC5hc3NpZ25lZFRvLm5hbWUgPSB1c2VyLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnVXNlciBhc3NpZ25lZCBzdWNjZXNzZnVsbHkuIFVzZXJJZDogXCInICsgdXNlci5pZCArICdcIiwgTmFtZTogXCInICsgdXNlci5uYW1lICsgJ1wiJywgc3ViUHJvY2Vzc0l0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUHJvY2VzcyBpbmRpY2F0b3IgZG9jdW1lbnQgdXBkYXRlc1xyXG4gKlxyXG4gKiBAcGFyYW0ge29iamVjdH0gYWN0aW9ucyAtIHRoZSBhY3Rpb25zIGNvbmZpZyBkYXRhXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBzdWJQcm9jZXNzIC0gdGhlIGN1cnJlbnQgc3ViLXByb2Nlc3MgZm9ybSBjb25maWcgZGF0YVxyXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxyXG4gKlxyXG4gKiBAZXhhbXBsZSAnJ1xyXG4gKlxyXG4gKiBAcmV0dXJuICcnXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiBpbmRpY2F0b3JEb2NzKHByb2Nlc3NJZCwgaW5kaWNhdG9ycywgc3RlcCwgX1dGSW5zdGFuY2UpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGluZGljYXRvciBzZWN0aW9ucyBvZiB0aGUgc3ViUHJvY2Vzc1xyXG4gICAgICAgICAgICBpZiAoaW5kaWNhdG9ycyA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGSW5kaWNhdG9yc1VwZGF0ZScsICdJbmRpY2F0b3JzIHBhcmFtZXRlciBpcyByZXF1aXJlZC4gLSBWYWx1ZTogJyArIGluZGljYXRvcnMpXHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5kaWNhdG9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29tc28ubG9nKCctLT4+Pj4+PiBGaXJzdCBJZiBjb25zaXRpb24nKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yID0gaW5kaWNhdG9yc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGluZGljYXRvci5pbnN0YW5jZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb21zby5sb2coJy0tPj4+Pj4+IFNlY29uZCBJZiBjb25zaXRpb24nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gaW5kaWNhdG9yLmluc3RhbmNlc1tqXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbXNvLmxvZygnLS0+Pj4+Pj4gVGhpcmQgSWYgY29uc2l0aW9uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZG9jID0gX1dGSW5zdGFuY2UuaW5kaWNhdG9yc1trXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZS51dWlkID09IGRvYy5faWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbXNvLmxvZygnLS0+Pj4+Pj4gRm91cnRoIElmIGNvbnNpdGlvbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvYy53b3JrZmxvd3MuZmlsdGVyKGZ1bmN0aW9uKHdvcmtmbG93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3b3JrZmxvdy5pZCA9PSBfV0ZJbnN0YW5jZS5jb25maWcuX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbXNvLmxvZygnLS0+Pj4+Pj4gRmlmdGggSWYgY29uc2l0aW9uJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd29ya2Zsb3cucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihwcm9jZXNzSXRlbSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvY2Vzc0l0ZW0uaWQgPT0gcHJvY2Vzc0lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NJdGVtLnN0ZXAuaWQgPSBzdGVwLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzSXRlbS5zdGVwLnNlcSA9IHN0ZXAuc2VxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzSXRlbS5zdGVwLnN0YXR1cyA9IHN0ZXAuc3RhdHVzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzSXRlbS5zdGVwLm1lc3NhZ2UgPSBzdGVwLm1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NJdGVtLnN0ZXAuYXNzaWduZWRUby51c2VySWQgPSBzdGVwLmFzc2lnbmVkVG8udXNlcklkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzSXRlbS5zdGVwLmFzc2lnbmVkVG8ubmFtZSA9IHN0ZXAuYXNzaWduZWRUby5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzSXRlbS5zdGVwLmNvbW1lbnQgPSBzdGVwLmNvbW1lbnQgIT09IHVuZGVmaW5lZCA/IHN0ZXAuY29tbWVudCA6ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0luZGljYXRvciBkb2N1bWVudHMgd29ya2Zsb3cgcHJvY2VzcyBtb2RlbCB1cGRhdGVkLicsIF9XRkluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIC8vY29tc28ubG9nKCdpbmRpY2F0b3JEb2NzIGZ1bmN0aW9uIEVORFMtLS0tLS0tLS0tLS0tLScpO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pXHJcbn07XHJcblxyXG4vKipcclxuICogUHJvY2VzcyBhY3Rpb25zXHJcbiAqXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBhY3Rpb25zIC0gdGhlIGFjdGlvbnMgY29uZmlnIGRhdGFcclxuICogQHBhcmFtIHtvYmplY3R9IHN1YlByb2Nlc3MgLSB0aGUgY3VycmVudCBzdWItcHJvY2VzcyBmb3JtIGNvbmZpZyBkYXRhXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXHJcbiAqXHJcbiAqIEBleGFtcGxlICcnXHJcbiAqXHJcbiAqIEByZXR1cm4gJydcclxuICpcclxuICovXHJcbmZ1bmN0aW9uIGFjdGlvbnMoYWN0aW9ucywgcHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN1YlByb2Nlc3MsIHN0ZXAsIF9XRkluc3RhbmNlLCBkYXRhLCB1dWlkKSB7XHJcbiAgICB2YXIgYXJyQWN0aW9ucyA9IFtdO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHV0aWwuc3luY0xvb3AoYWN0aW9ucy5sZW5ndGgsIGZ1bmN0aW9uKGxvb3ApIHtcclxuICAgICAgICAgICAgdmFyIGNvdW50ZXIgPSBsb29wLml0ZXJhdGlvbigpO1xyXG4gICAgICAgICAgICBhY3Rpb24oYWN0aW9uc1tjb3VudGVyXSwgcHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN1YlByb2Nlc3MsIHN0ZXAsIF9XRkluc3RhbmNlLCBkYXRhLCB1dWlkKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJldEFjdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGFjdGlvbnNbY291bnRlcl0uX2lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXE6IGNvdW50ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHJlc3VsdFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGFyckFjdGlvbnMucHVzaChyZXRBY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvb3AubmV4dCgpO1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9vcC5icmVhaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIE9uIGNvbXBsZXRpb24gb2YgdGhlIGxvb3BcclxuXHJcbiAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdBY3Rpb25zIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywgYXJyQWN0aW9ucyk7XHJcblxyXG4gICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUHJvY2VzcyBhY3Rpb25cclxuICpcclxuICogQHBhcmFtIHtvYmplY3R9IGFjdGlvbiAtIHRoZSBhY3Rpb24gY29uZmlnIGRhdGFcclxuICogQHBhcmFtIHtvYmplY3R9IHN1YlByb2Nlc3MgLSB0aGUgY3VycmVudCBzdWItcHJvY2VzcyBmb3JtIGNvbmZpZyBkYXRhXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXHJcbiAqXHJcbiAqIEBleGFtcGxlICcnXHJcbiAqXHJcbiAqIEByZXR1cm4gJydcclxuICpcclxuICovXHJcbmZ1bmN0aW9uIGFjdGlvbihhY3Rpb24sIHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdWJQcm9jZXNzLCBzdGVwLCBfV0ZJbnN0YW5jZSwgZGF0YSwgdXVpZCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICBpZiAoYWN0aW9uLm1ldGhvZCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdmFyIG1ldGhvZFBvc3NpYmxlSXRlbXMgPSBbXCJmb3JtXCIsIFwiaW5kaWNhdG9yXCIsIFwicHJvZmlsZVwiLCBcInN1YlByb2Nlc3NJbnN0YW5jZVwiLCBcInN0ZXBcIiwgXCJjb21tdW5pdHlcIiwgXCJhcHBsaWNhdGlvblwiLCBcInVzZXJcIiwgXCJzZG9cIiwgXCJwZXJmb3JtYW5jZVwiLCBcInRheG9ub215XCJdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5RXhpc3RzKGFjdGlvbi5tZXRob2QsIG1ldGhvZFBvc3NpYmxlSXRlbXMpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdmb3JtJzpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uLm1ldGhvZC5mb3JtLmNyZWF0ZSAhPSB1bmRlZmluZWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChwcm9jZXNzSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goc3ViUHJvY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChzdGVwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGFjdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChwcm9jZXNzU2VxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHN1YlByb2Nlc3NTZXEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKF9XRkluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEuY3JlYXRlVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh1dWlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEuYmFzZVVVSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmNyZWF0ZShhcmdzKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbi5tZXRob2QuZm9ybS5hdXRob3Jpc2UgIT0gdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2gocHJvY2Vzc0lkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHN1YlByb2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2gocHJvY2Vzc1NlcSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChzdWJQcm9jZXNzU2VxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKF9XRkluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEuY3JlYXRlVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh1dWlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEuYmFzZVVVSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uYXV0aG9yaXNlKGFyZ3MpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uLm1ldGhvZC5mb3JtLnVuZHJhZnQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChfV0ZJbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmNyZWF0ZVR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2godXVpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmJhc2VVVUlEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLnNldFVuRHJhZnQoYXJncykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24ubWV0aG9kLmZvcm0uZHJhZnQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChfV0ZJbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmNyZWF0ZVR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2godXVpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmJhc2VVVUlEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLnNldERyYWZ0KGFyZ3MpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uLm1ldGhvZC5mb3JtLmNsb3NlICE9IHVuZGVmaW5lZCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHN1YlByb2Nlc3MuaW5kaWNhdG9ycyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChfV0ZJbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmNyZWF0ZVR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2godXVpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmJhc2VVVUlEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmNsb3NlKGFyZ3MpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdpbmRpY2F0b3InOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24ubWV0aG9kLmluZGljYXRvci5jcmVhdGUgIT0gdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uLm1ldGhvZC5pbmRpY2F0b3IuaW5zdGFudGlhdGUgIT0gdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uLm1ldGhvZC5pbmRpY2F0b3Iuc2V0VmFsdWUgIT0gdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGF0aCA9IGFjdGlvbi5tZXRob2QuaW5kaWNhdG9yLnNldFZhbHVlLnBhdGg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YVZhbHVlID0gaGVscGVyLmdldE5vZGVWYWx1ZShhY3Rpb24ubWV0aG9kLmluZGljYXRvci5zZXRWYWx1ZS5kYXRhLCBfV0ZJbnN0YW5jZSwgdXVpZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goX1dGSW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2godXVpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChwYXRoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGFWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEtlZXAgaW5kaWNhdG9yIGZ1bmN0aW9ucyBpbiBpbmRpYXRvciBmaWxlIGlzdGVhZCBvZiBmb3JtIGZpbGUuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLnVwZGF0ZUluZGljYXRvcihhcmdzKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uLm1ldGhvZC5pbmRpY2F0b3IudXBkYXRlU3RhdHVzICE9IHVuZGVmaW5lZCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXR1cyA9IGFjdGlvbi5tZXRob2QuaW5kaWNhdG9yLnVwZGF0ZVN0YXR1cztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvclNldElkID0gYWN0aW9uLm1ldGhvZC5pbmRpY2F0b3IuaW5kaWNhdG9yU2V0SWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goX1dGSW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2godXVpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChzdGF0dXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goaW5kaWNhdG9yU2V0SWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBLZWVwIGluZGljYXRvciBmdW5jdGlvbnMgaW4gaW5kaWF0b3IgZmlsZSBpc3RlYWQgb2YgZm9ybSBmaWxlLlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5tYXJrVXBkYXRlSW5kaWNhdG9yKGFyZ3MpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3Byb2ZpbGUnOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24ubWV0aG9kLnByb2ZpbGUuY3JlYXRlICE9IHVuZGVmaW5lZCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHByb2Nlc3NJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChfV0ZJbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmNyZWF0ZVR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2godXVpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmJhc2VVVUlEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmNyZWF0ZVByb2ZpbGUoYXJncykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24ubWV0aG9kLnByb2ZpbGUuWCAhPSB1bmRlZmluZWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3N1YlByb2Nlc3NJbnN0YW5jZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNwUG9zc2libGVJdGVtcyA9IFtcImluc3RhbnRpYXRlXCIsIFwiYXV0aG9yaXNlXCIsIFwiY2xvc2VcIiwgXCJzZXRWYXJpYWJsZVwiLCBcInNldFN0YXR1c1RvXCIsIFwic2V0U3RhdHVzTXNnVG9cIiwgXCJzZXRUaXRsZVwiXTtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5RXhpc3RzKGFjdGlvbi5tZXRob2Quc3ViUHJvY2Vzc0luc3RhbmNlLCBzcFBvc3NpYmxlSXRlbXMpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzZXRUaXRsZSc6XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGFWYWx1ZSA9IGhlbHBlci5nZXROb2RlVmFsdWUoYWN0aW9uLm1ldGhvZC5zdWJQcm9jZXNzSW5zdGFuY2Uuc2V0VGl0bGUsIF9XRkluc3RhbmNlLCB1dWlkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5zdWJQcm9jZXNzSW5zdGFuY2Uuc2V0VGl0bGUoYWN0aW9uLm1ldGhvZC5zdWJQcm9jZXNzSW5zdGFuY2Uuc2V0VGl0bGUsIHV1aWQsIGRhdGFWYWx1ZSwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdXBkYXRlIHN1YnByb2Nlc3MgbGFiZWwgaW4gd29ya2Zsb3cgaW5zdGFuY2UgcHJvY2VzcyBvYmplY3Q6IFRPRE9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdCBpbiBzdWJwcm9jZXNzIGFjdGlvbi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnc3RlcCc6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdjb21tdW5pdHknOlxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb21tdW5pdHlQb3NzaWJsZUl0ZW1zID0gW1wiY3JlYXRlQ29tbXVuaXR5XCIsIFwicmVsZWFzZUFkb3B0ZWRBcHBsaWNhdGlvblwiLCBcInVzZXJKb2luQ29tbXVuaXR5XCJdO1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocHJvcGVydHlFeGlzdHMoYWN0aW9uLm1ldGhvZC5jb21tdW5pdHksIGNvbW11bml0eVBvc3NpYmxlSXRlbXMpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjcmVhdGVDb21tdW5pdHknOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUuY29tbXVuaXR5LmNyZWF0ZUNvbW11bml0eShhY3Rpb24ubWV0aG9kLmNvbW11bml0eS5jcmVhdGVDb21tdW5pdHksIHV1aWQsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlbGVhc2VBZG9wdGVkQXBwbGljYXRpb24nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUuY29tbXVuaXR5LnJlbGVhc2VBZG9wdGVkQXBwbGljYXRpb24oYWN0aW9uLm1ldGhvZC5jb21tdW5pdHkucmVsZWFzZUFkb3B0ZWRBcHBsaWNhdGlvbiwgdXVpZCwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAndXNlckpvaW5Db21tdW5pdHknOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUuY29tbXVuaXR5LnVzZXJKb2luQ29tbXVuaXR5KGFjdGlvbi5tZXRob2QuY29tbXVuaXR5LnVzZXJKb2luQ29tbXVuaXR5LCB1dWlkLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnYXBwbGljYXRpb24nOlxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhcHBsaWNhdGlvblBvc3NpYmxlSXRlbXMgPSBbXCJjcmVhdGVBcHBEZWZpbml0aW9uXCIsIFwiYnVpbGRBcHBsaWNhdGlvblwiLCBcImFwcGxpY2F0aW9uQWRvcHRpb25cIl07XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChwcm9wZXJ0eUV4aXN0cyhhY3Rpb24ubWV0aG9kLmFwcGxpY2F0aW9uLCBhcHBsaWNhdGlvblBvc3NpYmxlSXRlbXMpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjcmVhdGVBcHBEZWZpbml0aW9uJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25zTW9kdWxlLmFwcGxpY2F0aW9uLmNyZWF0ZUFwcERlZmluaXRpb24oYWN0aW9uLm1ldGhvZC5hcHBsaWNhdGlvbi5jcmVhdGVBcHBEZWZpbml0aW9uLCB1dWlkLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdidWlsZEFwcGxpY2F0aW9uJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25zTW9kdWxlLmFwcGxpY2F0aW9uLmJ1aWxkQXBwbGljYXRpb24oYWN0aW9uLm1ldGhvZC5hcHBsaWNhdGlvbi5idWlsZEFwcGxpY2F0aW9uLCB1dWlkLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdhcHBsaWNhdGlvbkFkb3B0aW9uJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25zTW9kdWxlLmFwcGxpY2F0aW9uLmFwcGxpY2F0aW9uQWRvcHRpb24oYWN0aW9uLm1ldGhvZC5hcHBsaWNhdGlvbi5hcHBsaWNhdGlvbkFkb3B0aW9uLCB1dWlkLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ3VzZXInOlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnc2RvJzpcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2RvUG9zc2libGVJdGVtcyA9IFtcImNyZWF0ZVwiXTtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5RXhpc3RzKGFjdGlvbi5tZXRob2Quc2RvLCBzZG9Qb3NzaWJsZUl0ZW1zKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnY3JlYXRlJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25zTW9kdWxlLnNkby5jcmVhdGUoYWN0aW9uLm1ldGhvZC5zZG8uY3JlYXRlLCB1dWlkLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ3BlcmZvcm1hbmNlJzpcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGVyZm9ybWFuY2VQb3NzaWJsZUl0ZW1zID0gW1wiY3JlYXRlXCIsIFwiY29uZmlndXJlTm9kZVwiXTtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5RXhpc3RzKGFjdGlvbi5tZXRob2QucGVyZm9ybWFuY2UsIHBlcmZvcm1hbmNlUG9zc2libGVJdGVtcykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NyZWF0ZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5wZXJmb3JtYW5jZS5jcmVhdGUoYWN0aW9uLm1ldGhvZC5wZXJmb3JtYW5jZS5jcmVhdGUsIHV1aWQsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnY29uZmlndXJlTm9kZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5wZXJmb3JtYW5jZS5jb25maWd1cmVOb2RlKGFjdGlvbi5tZXRob2QucGVyZm9ybWFuY2UuY29uZmlndXJlTm9kZSwgdXVpZCwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChcIk5vIG1ldGhvZCBmb3VuZCBmcm9tIGltcGxlbWVudGVkIGxpc3QuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICd0YXhvbm9teSc6XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRheG9ub215UG9zc2libGVJdGVtcyA9IFtcImNyZWF0ZVwiXTtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5RXhpc3RzKGFjdGlvbi5tZXRob2QudGF4b25vbXksIHRheG9ub215UG9zc2libGVJdGVtcykpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NyZWF0ZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS50YXhvbm9teS5jcmVhdGUoYWN0aW9uLm1ldGhvZC50YXhvbm9teS5jcmVhdGUsIHV1aWQsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJObyBtZXRob2QgZm91bmQgZnJvbSBpbXBsZW1lbnRlZCBsaXN0LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJtZXRob2Qgbm90IGRlZmluZWQgaW4gY29uZmlndXJhdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdC5cIik7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBQcm9jZXNzIHRhc2tzXHJcbiAqXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSB0YXNrIC0gdGhlIHRhc2sgY29uZmlnIGRhdGFcclxuICogQHBhcmFtIHtvYmplY3R9IGlucHV0RGF0YSAtIHRoZSB1c2VyIGlucHV0IGRhdGFcclxuICpcclxuICogQGV4YW1wbGUgJydcclxuICpcclxuICogQHJldHVybiAnJ1xyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gdGFzayhzdWJwcm9jZXNzSUQsIHN1YnByb2Nlc3NTRVEsIHRhc2ssIHNwdXVpZCwgbW9kZWwpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgdmFyIGxpc3QgPSBbXTtcclxuICAgICAgICBpZiAodGFzay5hc3NpZ24ucm9sZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdmFyIGFzc2lnblR5cGUgPSAncHJvZmlsZVJvbGUnO1xyXG4gICAgICAgICAgICB2YXIgcHJvZmlsZUlkID0gYXBwLlNDT1BFLndvcmtmbG93LnByb2ZpbGU7XHJcbiAgICAgICAgICAgIHZhciBpZCA9ICcnO1xyXG4gICAgICAgICAgICBpZiAodGFzay5hc3NpZ24ucm9sZS5wcm9maWxlID09ICdjdXJyZW50Jykge1xyXG4gICAgICAgICAgICAgICAgaWQgPSBhcHAuU0NPUEUud29ya2Zsb3cucHJvZmlsZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0YXNrLmFzc2lnbi5yb2xlLnByb2ZpbGUgPT0gJ2NvbW11bml0eScpIHtcclxuICAgICAgICAgICAgICAgIGlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciByb2xlID0gdGFzay5hc3NpZ24ucm9sZS5yb2xlSWQ7XHJcblxyXG4gICAgICAgICAgICBsaWJyYXJ5LmdldFVzZXJzTGlzdEJ5Um9sZShpZCwgcm9sZSkudGhlbihmdW5jdGlvbihsaXN0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGlzdCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdC5sZW5ndGggPiAxKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhc3NpZ24gdG8gdXNlcnMgc2VuZCBub3RpZmljYXRpb25zXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciBwck9iamVjdCA9IEpTT04ueHBhdGgoXCIvaW5zdGFuY2UvcHJvY2Vzc2VzW3N1YlByb2Nlc3Nlcy91dWlkIGVxICdcIisgc3B1dWlkICtcIiddXCIsYXBwLlNDT1BFLndvcmtmbG93LHt9KVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNwT2JqZWN0ID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHNwdXVpZCArIFwiJ11cIiwgYXBwLlNDT1BFLndvcmtmbG93LCB7fSlbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjaGFubmVscyA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL2NoYW5uZWxzXCIsIGFwcC5TQ09QRS53b3JrZmxvdywge30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmluYWxNc2cgPSBwcm9jZXNzV29ya2Zsb3dNZXNzYWdlKE5PVElGSUNBVElPTl9VU0VSX01TR19BQ0NFUFQsIHNwdXVpZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvY2Vzc0lkID0gc3BPYmplY3QuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm9jZXNzU2VxID0gc3BPYmplY3Quc2VxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciBzdWJwcm9jZXNzSUQgPSBwck9iamVjdC5pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgc3VicHJvY2Vzc1NFUSA9IHByT2JqZWN0LnNlcTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1YnByb2Nlc3NVVUlEID0gc3B1dWlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvY2Vzc19WYWxpZERhdGUgPSBzcE9iamVjdC5kYXRlcy52YWxpZDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb25maWdQcm9jZXNzID0gSlNPTi54cGF0aChcIi9jb25maWcvcHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzdWJwcm9jZXNzSUQgKyBcIiddXCIsIGFwcC5TQ09QRS53b3JrZmxvdywge30pWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29uZmlnU3ViUHJvY2VzcyA9IEpTT04ueHBhdGgoXCIvc3ViUHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBwcm9jZXNzSWQgKyBcIiddXCIsIGNvbmZpZ1Byb2Nlc3MsIHt9KVswXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGVwU2VxID0gc3BPYmplY3Quc3RlcC5zZXEgKyAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvY2Vzc19DdXJyZW50U3RlcE5hbWVpMTggPSBKU09OLnhwYXRoKFwiL3N0ZXBzW19zZXEgZXEgJ1wiICsgc3RlcFNlcSArIFwiJ10vbmFtZS9pMThuXCIsIGNvbmZpZ1N1YlByb2Nlc3MsIHt9KVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb2Nlc3NfQ3VycmVudFN0ZXBOYW1lID0gX2dldE5hbWVCeUxhbmcocHJvY2Vzc19DdXJyZW50U3RlcE5hbWVpMTgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb2Nlc3NOYW1lID0gX2dldE5hbWVCeUxhbmcoY29uZmlnU3ViUHJvY2Vzcy5uYW1lLmkxOG4pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5vdGZpY2F0aW9uUmVxdWVzdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic291cmNlXCI6IFwicmVtb3RlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJub3RpZmljYXRpb25SZXF1ZXN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIl9pZFwiOiBzcHV1aWQgKyBcIjpub3RpZmljYXRpb25SZXF1ZXN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoYW5uZWxzXCI6IGNoYW5uZWxzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21tdW5pdHlJZFwiOiBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXBwbGljYXRpb25JZFwiOiBhcHAuU0NPUEUuYXBwbGljYXRpb25JZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBmaW5hbE1zZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVR5cGVcIjogXCJpbmZvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZWREYXRlVGltZVwiOiBtb21lbnQoKS5mb3JtYXQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VuZGVyVXNlcklkXCI6IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3Rpb25zXCI6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBcIlZpZXdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZ1bmN0aW9uXCI6IFwiYXBwLm9wZW5TdWJwcm9jZXNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJhbXNcIjogW3Byb2ZpbGVJZCwgcHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBwcm9jZXNzTmFtZSwgc3VicHJvY2Vzc0lELCBzdWJwcm9jZXNzU0VRLCBzdWJwcm9jZXNzVVVJRCwgcHJvY2Vzc19WYWxpZERhdGUsIHByb2Nlc3NfQ3VycmVudFN0ZXBOYW1lXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJlY2VpdmVyXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInJvbGVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IHJvbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZmlsZUlkXCI6IGlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhby51cHNlcnQobm90ZmljYXRpb25SZXF1ZXN0KS5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciBzcE9iamVjdCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIrIHNwdXVpZCArXCInXVwiLGFwcC5TQ09QRS53b3JrZmxvdywge30pWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXNzaWdubWVudCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFzay5hc3NpZ24uYXNzaWdubWVudCAhPSB1bmRlZmluZWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXNzaWdubWVudCA9IG1vZGVsLmFzc2lnbm1lbnQ7IC8vSlNPTi54cGF0aChcIi9zdGVwL2Fzc2lnbm1lbnRcIixzcE9iamVjdCx7fSlbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWNjZXB0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2hvd1wiOiB0YXNrLmFzc2lnbi5hc3NpZ25tZW50LmFjY2VwdC5zaG93LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogX2dldE5hbWVCeUxhbmcodGFzay5hc3NpZ24uYXNzaWdubWVudC5hY2NlcHQubGFiZWwuaTE4bilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5hY2NlcHQgPSBhY2NlcHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50Lm1lc3NhZ2UgPSBfZ2V0TmFtZUJ5TGFuZyh0YXNrLmFzc2lnbi5hc3NpZ25tZW50Lm1lc3NhZ2UuaTE4bik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVqZWN0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2hvd1wiOiB0YXNrLmFzc2lnbi5hc3NpZ25tZW50LnJlamVjdC5zaG93LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogX2dldE5hbWVCeUxhbmcodGFzay5hc3NpZ24uYXNzaWdubWVudC5yZWplY3QubGFiZWwuaTE4bilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5yZWplY3QgPSByZWplY3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxlSWRcIjogcHJvZmlsZUlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicm9sZUlkXCI6IHJvbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwicm9sZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQucHJvZmlsZVJvbGVJZCA9IGlkO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgnTm90aWZpY2F0aW9ucyByZXF1ZXN0IHN1Ym1pdHRlZCBmb3IgYWNjZXB0YW5jZS4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsaXN0Lmxlbmd0aCA9PSAxKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdXNlcklkID0gbGlzdFswXS5pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVzZXJuYW1lID0gbGlzdFswXS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXNzaWduZWUgPSBtb2RlbC5hc3NpZ25lZFRvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25lZS5uYW1lID0gdXNlcm5hbWUgKyBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25lZS51c2VySWQgPSB1c2VySWQgKyBcIlwiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFzc2lnbm1lbnQgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhc2suYXNzaWduLmFzc2lnbm1lbnQgIT0gdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFzc2lnbm1lbnQgPSBtb2RlbC5hc3NpZ25tZW50OyAvL0pTT04ueHBhdGgoXCIvc3RlcC9hc3NpZ25tZW50XCIsc3BPYmplY3Qse30pWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjY2VwdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNob3dcIjogdGFzay5hc3NpZ24uYXNzaWdubWVudC5hY2NlcHQuc2hvdyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IF9nZXROYW1lQnlMYW5nKHRhc2suYXNzaWduLmFzc2lnbm1lbnQuYWNjZXB0LmxhYmVsLmkxOG4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQuYWNjZXB0ID0gYWNjZXB0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5tZXNzYWdlID0gX2dldE5hbWVCeUxhbmcodGFzay5hc3NpZ24uYXNzaWdubWVudC5tZXNzYWdlLmkxOG4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlamVjdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNob3dcIjogdGFzay5hc3NpZ24uYXNzaWdubWVudC5yZWplY3Quc2hvdyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IF9nZXROYW1lQnlMYW5nKHRhc2suYXNzaWduLmFzc2lnbm1lbnQucmVqZWN0LmxhYmVsLmkxOG4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQucmVqZWN0ID0gcmVqZWN0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZmlsZUlkXCI6IHByb2ZpbGVJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJvbGVJZFwiOiByb2xlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInJvbGVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50LnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50LnByb2ZpbGVSb2xlSWQgPSBpZDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoJ0Fzc2lnbmVkIHRvIHRoZSBvbmx5IHVzZXIgaW4gcm9sZS4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAqIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhc2suYXNzaWduLmRlZmF1bHQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVzZXJJZCA9IHRhc2suYXNzaWduLmRlZmF1bHQudXNlcklkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1c2VybmFtZSA9IHRhc2suYXNzaWduLmRlZmF1bHQudXNlck5hbWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhc3NpZ25lZSA9IG1vZGVsLmFzc2lnbmVkVG87IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVlLm5hbWUgPSB1c2VybmFtZSArIFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduZWUudXNlcklkID0gdXNlcklkICsgXCJcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgnQXNzaWduZWQgdG8gZGVmYXVsdCB1c2VyJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIGluIGFzc2lnbm1lbnQuIERlZmF1bHQgdXNlciBub3Qgc3BlY2lmaWVkLicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCgnRXJyb3IgaW4gYXNzaWdubWVudC4gRGVmYXVsdCB1c2VyIG5vdCBzcGVjaWZpZWQuJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICovXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXNzaWduZWUgPSBtb2RlbC5hc3NpZ25lZFRvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25lZS5uYW1lID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduZWUudXNlcklkID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShcIk5vIHVzZXJzIGZvdW5kIGluIGxpc3QuIEFzc2lnbmluZyBibGFuayBcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBpbiBnZXRVc2Vyc0xpc3RCeVJvbGUgdW5kZWZpbmVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBpbiBnZXRVc2Vyc0xpc3RCeVJvbGUnKTtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRhc2suYXNzaWduLnN3aW1sYW5lICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXNvbHZlKCdzd2ltbGFuZScpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU3dpbWxhbmUgaW1wbGVtZW50YXRpb24gISEnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFByb2Nlc3MgdHJhbnNpdGlvblxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gcHJvY2VzcyBpZFxyXG4gKiBAcGFyYW0ge251bWJlcn0gcHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBwcm9jZXNzIHNlcVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3ViUHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3ViLXByb2Nlc3MgaWRcclxuICogQHBhcmFtIHtudW1iZXJ9IHN1YlByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2Ugc3ViLXByb2Nlc3Mgc2VxXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdGVwSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdGVwIGlkXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0cmFuc2l0aW9uSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiB0cmFuc2l0aW9uIGlkXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIC0gYW55IGFkZGl0aW9uYWwgZGF0YSBwYXNzZWQgaW4gYXMga2V5IHZhbHVlIHBhaXJzXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXHJcbiAqXHJcbiAqIEBleGFtcGxlICcnXHJcbiAqXHJcbiAqIEByZXR1cm4gJydcclxuICpcclxuICovXHJcbmZ1bmN0aW9uIHRyYW5zaXRpb24ocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwgdHJhbnNpdGlvbklkLCBkYXRhLCBfV0ZJbnN0YW5jZSwgc3B1dWlkLCBtb2RlbCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHZhciBzdGVwU2VxID0gMDtcclxuICAgICAgICAgICAgdmFyIG5leHRTdGVwSWQgPSAnJztcclxuICAgICAgICAgICAgdmFyIG5leHRTdGVwU2VxID0gMDtcclxuICAgICAgICAgICAgdmFyIHN1YlByb2Nlc3MgPSBbXTtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRQcm9jZXNzID0gX1dGSW5zdGFuY2UuY29uZmlnLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqUHJvY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9ialByb2Nlc3MuX2lkID09IHByb2Nlc3NJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmpQcm9jZXNzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50U3ViUHJvY2VzcyA9IGN1cnJlbnRQcm9jZXNzWzBdLnN1YlByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqU3ViUHJvY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9ialN1YlByb2Nlc3MuX2lkID09IHN1YlByb2Nlc3NJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmpTdWJQcm9jZXNzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50U3RlcCA9IGN1cnJlbnRTdWJQcm9jZXNzWzBdLnN0ZXBzLmZpbHRlcihmdW5jdGlvbihvYmpTdGVwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqU3RlcC5faWQgPT0gc3RlcElkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9ialN0ZXA7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIHRyYW5zaXRpb24gPSBjdXJyZW50U3RlcFswXS50cmFuc2l0aW9uLmZpbHRlcihmdW5jdGlvbihvYmpUcmFuc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqVHJhbnNpdGlvbi5faWQgPT0gdHJhbnNpdGlvbklkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9ialRyYW5zaXRpb247XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjdXJyZW50U3ViUHJvY2Vzc1swXS5zdGVwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRTdWJQcm9jZXNzWzBdLnN0ZXBzW2ldLl9pZCA9PSBzdGVwSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGVwU2VxID0gcGFyc2VJbnQoY3VycmVudFN1YlByb2Nlc3NbMF0uc3RlcHNbaV0uX3NlcSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjdXJyZW50U3ViUHJvY2Vzc1swXS5zdGVwcy5maWx0ZXIoZnVuY3Rpb24oc3RlcEl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIG5leHRTdGVwU2VxID0gc3RlcFNlcSArIDE7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQoc3RlcEl0ZW0uX3NlcSkgPT0gbmV4dFN0ZXBTZXEpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0U3RlcElkID0gc3RlcEl0ZW0uX2lkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmpQcm9jZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqUHJvY2Vzcy5pZCA9PSBwcm9jZXNzSWQgJiYgb2JqUHJvY2Vzcy5zZXEgPT0gcHJvY2Vzc1NlcSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9ialByb2Nlc3Muc3ViUHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmpTdWJQcm9jZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmpTdWJQcm9jZXNzLmlkID09IHN1YlByb2Nlc3NJZCAmJiBvYmpTdWJQcm9jZXNzLnNlcSA9PSBzdWJQcm9jZXNzU2VxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdXVpZCA9IG9ialN1YlByb2Nlc3MudXVpZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwdXVpZCA9IHV1aWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzdWJQcm9jZXNzID0gb2JqU3ViUHJvY2VzcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24oc3ViUHJvY2Vzc0l0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3ViUHJvY2Vzc0l0ZW0uX2lkID09IHV1aWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2VzcyA9IHN1YlByb2Nlc3NJdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIG1heFN0ZXBzID0gY3VycmVudFN1YlByb2Nlc3NbMF0uc3RlcHMubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRyYW5zaXRpb25bMF0udHJhbnNpdGlvbkFjdGlvbi5nb1RvU3RlcCAhPSB1bmRlZmluZWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgbmV4dFNlcSA9IHBhcnNlSW50KGN1cnJlbnRTdGVwWzBdLl9zZXEpICsgcGFyc2VJbnQodHJhbnNpdGlvblswXS50cmFuc2l0aW9uQWN0aW9uLmdvVG9TdGVwLmRlZmF1bHQpO1xyXG4gICAgICAgICAgICAgICAgdmFyIG5leHRJZCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFN1YlByb2Nlc3NbMF0uc3RlcHMuZmlsdGVyKGZ1bmN0aW9uKHN0ZXBJdGVtKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChzdGVwSXRlbS5fc2VxKSA9PSBuZXh0U3RlcFNlcSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0SWQgPSBzdGVwSXRlbS5faWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHN0ZXAocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIG5leHRJZCwgbmV4dFNlcSwgZGF0YSwgX1dGSW5zdGFuY2UsIHNwdXVpZCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFNlcSA9PSBtYXhTdGVwcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnQWxsIFN0ZXAgdHJhbnNpdGlvbnMgaGF2ZSBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NDb21wbGV0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXA6IHJlc3VsdC5kYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnU3RlcCB0cmFuc2l0aW9uIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc0NvbXBsZXRlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXA6IHJlc3VsdC5kYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHJhbnNpdGlvblswXS50cmFuc2l0aW9uQWN0aW9uLmdvVG9TdGVwSWQgIT0gdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGdvVG9TdGVwSWQgPSB0cmFuc2l0aW9uWzBdLnRyYW5zaXRpb25BY3Rpb24uZ29Ub1N0ZXBJZC5zdGVwSWQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgZ29Ub1N0ZXBTZXEgPSAxO1xyXG5cclxuICAgICAgICAgICAgICAgIGN1cnJlbnRTdWJQcm9jZXNzWzBdLnN0ZXBzLmZpbHRlcihmdW5jdGlvbihzdGVwSXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGVwSXRlbS5faWQgPT0gZ29Ub1N0ZXBJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnb1RvU3RlcFNlcSA9IHBhcnNlSW50KHN0ZXBJdGVtLl9zZXEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBzdGVwKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBnb1RvU3RlcElkLCBnb1RvU3RlcFNlcSwgZGF0YSwgX1dGSW5zdGFuY2UsIHNwdXVpZCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ29Ub1N0ZXBTZXEgPT0gbWF4U3RlcHMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdBbGwgU3RlcCB0cmFuc2l0aW9ucyBoYXZlIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc0NvbXBsZXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcDogcmVzdWx0LmRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnU3RlcCB0cmFuc2l0aW9uIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc0NvbXBsZXRlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXA6IHJlc3VsdC5kYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0cmFuc2l0aW9uWzBdLnRyYW5zaXRpb25BY3Rpb24uc3RvcCAhPSB1bmRlZmluZWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnU3RlcCB0cmFuc2l0aW9uIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuV29ya2Zsb3cgc3RvcHBlZC4nLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc0NvbXBsZXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0ZXA6IG1vZGVsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUHJvY2VzcyBwb3N0QWN0aW9uc1xyXG4gKlxyXG4gKiBAcGFyYW0ge29iamVjdH0gcG9zdEFjdGlvbnMgLSB0aGUgcG9zdEFjdGlvbnMgY29uZmlnIGRhdGFcclxuICpcclxuICogQGV4YW1wbGUgJydcclxuICpcclxuICogQHJldHVybiAnJ1xyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gcG9zdEFjdGlvbnMocG9zdEFjdGlvbnMsIF9XRkluc3RhbmNlKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgdmFyIGNvbXBsZXRlZCA9IFtdO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHV0aWwuc3luY0xvb3AocG9zdEFjdGlvbnMubGVuZ3RoLCBmdW5jdGlvbihsb29wKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY291bnRlciA9IGxvb3AuaXRlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb24ocG9zdEFjdGlvbnNbY291bnRlcl0sIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBhbGwgcHJlLXJlcXVpc2l0ZXMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS5cclxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQucHVzaCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBsb29wLm5leHQoKTtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlZC5wdXNoKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBsb29wLmJyZWFrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29tcGxldGVkLmV2ZXJ5KEJvb2xlYW4pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1Bvc3QtYWN0aW9ucyBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHt9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRlByZUFjdGlvbnNFcnJvcicsICdOb3QgYWxsIHBvc3QtYWN0aW9ucyBwYXNzZWQuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vKlxyXG5mdW5jdGlvbiBzZW5kTm90aWZpY2F0aW9ucyh1c2Vyc0xpc3QsIHNwdXVpZCl7XHJcblxyXG4gIC8vIGdldCB1c2VycyBsaXN0IFxyXG4gIC8vIHNlbiBub3RpZmljYXRpb25zIHRvIHVzZXJzIHkgYWRkaW5nIGNoYW5uZWxzIHRvIHRoZW1cclxuXHJcbiAgdmFyIGNoYW5uZWxBcnJheSA9IFtdO1xyXG5cclxuICBmb3IoaT0wO2k8dXNlcnNMaXN0Lmxlbmd0aDsgaSsrKXtcclxuICAgIGNoYW5uZWxBcnJheS5wdXNoKFwidXNlcl9cIit1c2Vyc0xpc3RbaV0uaWQpO1xyXG4gIH1cclxuXHJcbiAgYXNzaWduVG9Vc2Vycyhwcm9jZXNzV29ya2Zsb3dNZXNzYWdlKE5PVElGSUNBVElPTl9VU0VSX01TR19BQ0NFUFQsIHNwdXVpZCksIGNoYW5uZWxBcnJheSk7XHJcblxyXG59OyovXHJcblxyXG4vKmZ1bmN0aW9uIGFzc2lnblRvVXNlcnMobWVzc2FnZSwgY2hhbm5lbEFycmF5KXtcclxuXHJcbiAgICAgdmFyIGNoYW5uZWxzID0gY2hhbm5lbEFycmF5O1xyXG5cclxuICAgICB2YXIgbm90aWZpY2F0aW9uID0gIHsgXHJcbiAgICAgICAgICBcIl9pZFwiOiBnZW5lcmF0ZVVVSUQoKSxcclxuICAgICAgICAgIFwiY2hhbm5lbHNcIjpjaGFubmVscyxcclxuICAgICAgICAgIFwibWVzc2FnZVwiOiBtZXNzYWdlLFxyXG4gICAgICAgICAgXCJtZXNzYWdlVHlwZVwiOiBcImluZm9cIixcclxuICAgICAgICAgIFwiY3JlYXRlZERhdGVUaW1lXCI6IG1vbWVudCgpLmZvcm1hdCgpLFxyXG4gICAgICAgICAgXCJyZWFkXCI6IGZhbHNlLFxyXG4gICAgICAgICAgXCJyZWFkRGF0ZVRpbWVcIjogXCJcIixcclxuICAgICAgICAgIFwidHlwZVwiOiBcIm5vdGlmaWNhdGlvblwiLFxyXG4gICAgICAgICAgXCJzZW5kZXJVc2VySWRcIjogTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWRcclxuICAgICAgIH07XHJcblxyXG4gICAgICAgY29uc29sZS5sb2cobm90aWZpY2F0aW9uKTtcclxuICAgICAgIGRhby51cHNlcnQobm90aWZpY2F0aW9uKTtcclxuXHJcbiAgfTsqL1xyXG5cclxuZnVuY3Rpb24gcHJvY2Vzc1dvcmtmbG93TWVzc2FnZShtZXNzYWdlLCBzcHV1aWQpIHtcclxuXHJcbiAgICB2YXIgcmVwbGFjZWRNc2cgPSBtZXNzYWdlO1xyXG5cclxuICAgIGlmIChyZXBsYWNlZE1zZy5pbmRleE9mKCcjSU5TVEFOQ0VfTEFCRUwnKSAhPT0gLTEpIHtcclxuICAgICAgICB2YXIgdmFsID0gSlNPTi54cGF0aChcIi9pbnN0YW5jZS9wcm9jZXNzZXMvc3ViUHJvY2Vzc2VzW3V1aWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXS9sYWJlbFwiLCBhcHAuU0NPUEUud29ya2Zsb3csIHt9KVswXTtcclxuICAgICAgICByZXBsYWNlZE1zZyA9IHJlcGxhY2VkTXNnLnJlcGxhY2UoJyNJTlNUQU5DRV9MQUJFTCcsIHZhbCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGlmIChyZXBsYWNlZE1zZy5pbmRleE9mKCcjVVNFUl9OQU1FJykgIT09IC0xKSB7XHJcbiAgICAgICAgdmFyIHZhbCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL3N0ZXAvYXNzaWduZWRUby9uYW1lXCIsIGFwcC5TQ09QRS53b3JrZmxvdywge30pWzBdO1xyXG4gICAgICAgIHJlcGxhY2VkTXNnID0gcmVwbGFjZWRNc2cucmVwbGFjZSgnI1VTRVJfTkFNRScsIHZhbCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGlmIChyZXBsYWNlZE1zZy5pbmRleE9mKCcjUFJPRklMRV9USVRMRScpICE9PSAtMSkge1xyXG4gICAgICAgIHZhciB2YWwgPSBhcHAucHJvZmlsZS50aXRsZTtcclxuICAgICAgICByZXBsYWNlZE1zZyA9IHJlcGxhY2VkTXNnLnJlcGxhY2UoJyNQUk9GSUxFX1RJVExFJywgdmFsKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJlcGxhY2VkTXNnLmluZGV4T2YoJyNQUk9GSUxFX1RZUEUnKSAhPT0gLTEpIHtcclxuICAgICAgICB2YXIgdmFsID0gYXBwLlNDT1BFLkFQUF9DT05GSUcubmFtZTtcclxuICAgICAgICByZXBsYWNlZE1zZyA9IHJlcGxhY2VkTXNnLnJlcGxhY2UoJyNQUk9GSUxFX1RZUEUnLCB2YWwpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBpZiAocmVwbGFjZWRNc2cuaW5kZXhPZignI1ZBUl9TUFVVSUQnKSAhPT0gLTEpIHtcclxuICAgICAgICB2YXIgdmFsID0gc3B1dWlkO1xyXG4gICAgICAgIHJlcGxhY2VkTXNnID0gcmVwbGFjZWRNc2cucmVwbGFjZSgnI1ZBUl9TUFVVSUQnLCB2YWwpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVwbGFjZWRNc2c7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBfZ2V0TmFtZShhcnIsIGxhbmcpIHtcclxuICAgIGlmIChhcnIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChhcnJbaV0uX2xhbmcgPT09IGxhbmcpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhcnJbaV0udmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5mdW5jdGlvbiBfZ2V0TmFtZUJ5TGFuZyhvYmopIHtcclxuICAgIHZhciBsYW5nID0gc2VydmljZS5nZXRMYW5ndWFnZSgpO1xyXG4gICAgdmFyIGV4cHIgPSAnb2JqLicgKyBsYW5nO1xyXG4gICAgcmV0dXJuIGV2YWwoZXhwcik7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgICBwcmVSZXF1aXNpdGVzOiBwcmVSZXF1aXNpdGVzLFxyXG4gICAgcHJlQWN0aW9uczogcHJlQWN0aW9ucyxcclxuICAgIHN1YlByb2Nlc3M6IHN1YlByb2Nlc3MsXHJcbiAgICBpbmRpY2F0b3JEb2NzOiBpbmRpY2F0b3JEb2NzLFxyXG4gICAgdGFzazogdGFzayxcclxuICAgIHRyYW5zaXRpb246IHRyYW5zaXRpb24sXHJcbiAgICBhc3NpZ25Vc2VyOiBhc3NpZ25Vc2VyXHJcblxyXG59IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqIFV0aWxpdHkgTW9kdWxlXHJcbiAqXHJcbiAqIEBtb2R1bGUgbGliL3V0aWxcclxuICpcclxuICogQGF1dGhvciBCcmVudCBHb3Jkb25cclxuICogQHZlcnNpb24gMC4xLjBcclxuICpcclxuICogQGRlc2NyaXB0aW9uXHJcbiAqIFdvcmtmbG93IHV0aWxpdHkgbW9kdWxlIHVzZWQgdG8gZm9ybWF0IHRoZSByZXR1cm4gYW5kIGVycm9yIG9iamVjdHMsIGFuZFxyXG4gKiBjb250YWlucyBzb21lIG90aGVyIHV0aWxpdHkgZnVuY3Rpb25zIHN1Y2ggYXMgYSBzeW5jIGxvb3AgYW5kIGNvbXBhcmUuXHJcbiAqXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFN1Y2Nlc3MgYmxvY2sgcmV0dXJuIG9iamVjdCwgY29udGFpbnMgYSBtZXNzYWdlIGFuZCBvcHRpb25hbCBkYXRhIG9iamVjdC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSB0aGUgc3VjY2VzcyBtZXNzYWdlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfE9iamVjdH0gW2RhdGFdIC0gdGhlIHN1Y2Nlc3MgcmV0dXJuZWQgZGF0YVxyXG4gKlxyXG4gKiBAZXhhbXBsZVxyXG4gKiAvLyBSZXR1cm4gc3VjY2VzcyB3aXRob3V0IGEgZGF0YSBibG9ja1xyXG4gKiB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnU3VjY2VzcyBtZXNzYWdlIGdvZXMgaGVyZS4uLicpO1xyXG4gKlxyXG4gKiBAcmV0dXJuIHtPYmplY3R9IC0gd2l0aCBtZXNzYWdlIGFuZCBkYXRhIHByb3BlcnRpZXNcclxuICpcclxuICovXHJcbmZ1bmN0aW9uIHN1Y2Nlc3MobWVzc2FnZSwgZGF0YSl7XHJcblx0cmV0dXJuIHtcclxuXHRcdG1lc3NhZ2U6IG1lc3NhZ2UsXHJcblx0XHRkYXRhOiBkYXRhXHJcblx0fTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXYXJuaW5nIGJsb2NrIHJldHVybiBvYmplY3QsIGNvbnRhaW5zIGEgbWVzc2FnZSBhbmQgb3B0aW9uYWwgZGF0YSBvYmplY3QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gdGhlIHdhcm5pbmcgbWVzc2FnZVxyXG4gKiBAcGFyYW0ge3N0cmluZ3xPYmplY3R9IFtkYXRhXSAtIHRoZSByZXR1cm5lZCBkYXRhXHJcbiAqXHJcbiAqIEBleGFtcGxlXHJcbiAqIC8vIFJldHVybiBzdWNjZXNzIHdpdGhvdXQgYSBkYXRhIGJsb2NrXHJcbiAqIHZhciBzdWNjZXNzID0gdXRpbC53YXJuKCdXYXJuaW5nIG1lc3NhZ2UgZ29lcyBoZXJlLi4uJyk7XHJcbiAqXHJcbiAqIEByZXR1cm4ge09iamVjdH0gd2l0aCBtZXNzYWdlIGFuZCBkYXRhIHByb3BlcnRpZXMsIGFuZCBsb2dzIHRoZSB3YXJuaW5nIHRvIHRoZSBjb25zb2xlLlxyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gd2FybihtZXNzYWdlLCBkYXRhKXtcclxuXHRjb25zb2xlLndhcm4oZGF0YSk7XHJcblx0cmV0dXJuIHtcclxuXHRcdHdhcm5pbmc6IG1lc3NhZ2UsXHJcblx0XHRkYXRhOiBkYXRhXHJcblx0fTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBFcnJvciBibG9jayBKUyBlcnJvciBvYmplY3QsIGNvbnRhaW5zIGEgY29kZSBhbmQgbWVzc2FnZSBmb3IgdGhlIGVycm9yLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gY29kZSAtIHRoZSBlcnJvciBjb2RlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gdGhlIGVycm9yIG1lc3NhZ2VcclxuICpcclxuICogQGV4YW1wbGVcclxuICogdmFyIHN1Y2Nlc3MgPSB1dGlsLmVycm9yKCdFcnJvcjAwMScsJ0Vycm9yIG1lc3NhZ2UgZ29lcyBoZXJlLi4uJyk7XHJcbiAqXHJcbiAqIEByZXR1cm4ge09iamVjdH0gd2l0aCBhIGNvZGUgYW5kIG1lc3NhZ2UgcHJvcGVydGllcy5cclxuICpcclxuICovXHJcbmZ1bmN0aW9uIGVycm9yKGNvZGUsIG1lc3NhZ2Upe1xyXG5cdHZhciBlcnIgPSBuZXcgRXJyb3IoJycpO1xyXG5cdGVyci5uYW1lID0gY29kZTtcclxuXHRlcnIubWVzc2FnZSA9IG1lc3NhZ2U7XHJcblx0cmV0dXJuIGVycjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBIGxvb3Agd2hpY2ggY2FuIGxvb3AgWCBhbW91bnQgb2YgdGltZXMsIHdoaWNoIGNhcnJpZXMgb3V0XHJcbiAqIGFzeW5jaHJvbm91cyBjb2RlLCBidXQgd2FpdHMgZm9yIHRoYXQgY29kZSB0byBjb21wbGV0ZSBiZWZvcmUgbG9vcGluZy5cclxuICpcclxuICogQHBhcmFtIHtudW1iZXJ9IGl0ZXJhdGlvbnMgLSB0aGUgbnVtYmVyIG9mIGl0ZXJhdGlvbnMgdG8gY2Fycnkgb3V0XHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHByb2Nlc3MgLSB0aGUgY29kZS9mdW5jdGlvbiB3ZSdyZSBydW5uaW5nIGZvciBldmVyeVxyXG4gKiBpdGVyYXRpb25cclxuICogQHBhcmFtIHtmdW5jdGlvbn0gZXhpdCAtIGFuIG9wdGlvbmFsIGNhbGxiYWNrIHRvIGNhcnJ5IG91dCBvbmNlIHRoZSBsb29wXHJcbiAqIGhhcyBjb21wbGV0ZWRcclxuICpcclxuICogQGV4YW1wbGVcclxuICogdXRpbC5zeW5jTG9vcCg1LCBmdW5jdGlvbihsb29wKXtcclxuICogXHR2YXIgY291bnRlciA9IGxvb3AuaXRlcmF0aW9uKCk7XHJcbiAqIFx0Ly8gQWRkIGFzeW5jIGNhbGxzIGhlcmUuLlxyXG4gKlxyXG4gKiB9LCBmdW5jdGlvbigpe1xyXG4gKiBcdC8vIE9uIGNvbXBsZXRlIHBlcmZvcm0gYWN0aW9ucyBoZXJlLi4uXHJcbiAqXHJcbiAqIH0pO1xyXG4gKlxyXG4gKiBAcmV0dXJuIHtPYmplY3R9IHRoZSBsb29wIGNvbnRyb2wgb2JqZWN0LlxyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gc3luY0xvb3AoaXRlcmF0aW9ucywgcHJvY2VzcywgZXhpdCl7XHJcbiAgICB2YXIgaW5kZXggPSAwLFxyXG4gICAgICAgIGRvbmUgPSBmYWxzZSxcclxuICAgICAgICBzaG91bGRFeGl0ID0gZmFsc2U7XHJcbiAgICB2YXIgbG9vcCA9IHtcclxuICAgICAgICBuZXh0OmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmKGRvbmUpe1xyXG4gICAgICAgICAgICAgICAgaWYoc2hvdWxkRXhpdCAmJiBleGl0KXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXhpdCgpOyAvLyBFeGl0IGlmIHdlJ3JlIGRvbmVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBJZiB3ZSdyZSBub3QgZmluaXNoZWRcclxuICAgICAgICAgICAgaWYoaW5kZXggPCBpdGVyYXRpb25zKXtcclxuICAgICAgICAgICAgICAgIGluZGV4Kys7IC8vIEluY3JlbWVudCBvdXIgaW5kZXhcclxuICAgICAgICAgICAgICAgIHByb2Nlc3MobG9vcCk7IC8vIFJ1biBvdXIgcHJvY2VzcywgcGFzcyBpbiB0aGUgbG9vcFxyXG4gICAgICAgICAgICAvLyBPdGhlcndpc2Ugd2UncmUgZG9uZVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZG9uZSA9IHRydWU7IC8vIE1ha2Ugc3VyZSB3ZSBzYXkgd2UncmUgZG9uZVxyXG4gICAgICAgICAgICAgICAgaWYoZXhpdCkgZXhpdCgpOyAvLyBDYWxsIHRoZSBjYWxsYmFjayBvbiBleGl0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGl0ZXJhdGlvbjpmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICByZXR1cm4gaW5kZXggLSAxOyAvLyBSZXR1cm4gdGhlIGxvb3AgbnVtYmVyIHdlJ3JlIG9uXHJcbiAgICAgICAgfSxcclxuICAgICAgICBicmVhazpmdW5jdGlvbihlbmQpe1xyXG4gICAgICAgICAgICBkb25lID0gdHJ1ZTsgLy8gRW5kIHRoZSBsb29wXHJcbiAgICAgICAgICAgIHNob3VsZEV4aXQgPSBlbmQ7IC8vIFBhc3NpbmcgZW5kIGFzIHRydWUgbWVhbnMgd2Ugc3RpbGwgY2FsbCB0aGUgZXhpdCBjYWxsYmFja1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBsb29wLm5leHQoKTtcclxuICAgIHJldHVybiBsb29wO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gY29tcGFyZShzdWJqZWN0LCBvcGVyYXRvciwgdmFsdWUpIHtcclxuICBcdHN3aXRjaCAob3BlcmF0b3IpIHtcclxuICBcdFx0Y2FzZSAnZ3JlYXRlclRoYW4nOlxyXG5cdFx0XHRyZXR1cm4gc3ViamVjdCA+IHZhbHVlO1xyXG5cdFx0Y2FzZSAnbGVzc1RoYW4nOlxyXG5cdFx0XHRyZXR1cm4gc3ViamVjdCA8IHZhbHVlO1xyXG5cdFx0Y2FzZSAnZ3JlYXRlclRoYW5FcXVhbCc6XHJcblx0XHRcdHJldHVybiBzdWJqZWN0ID49IHZhbHVlO1xyXG5cdFx0Y2FzZSAnbGVzc1RoYW5FcXVhbCc6XHJcblx0XHRcdHJldHVybiBzdWJqZWN0IDw9IHZhbHVlO1xyXG5cdFx0Y2FzZSAnZXF1YWxUbyc6XHJcblx0XHRcdHJldHVybiBzdWJqZWN0ID09PSB2YWx1ZTtcclxuXHRcdGNhc2UgJ25vdEVxdWFsVG8nOlxyXG5cdFx0XHRyZXR1cm4gc3ViamVjdCAhPT0gdmFsdWU7XHJcbiAgXHR9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBnZXROYW1lKGFyciwgbGFuZyl7XHJcblx0aWYgKGFyciAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGggOyBpKyspIHtcclxuXHRcdFx0aWYgKGFycltpXS5pMThuLl9sYW5nID09PSBsYW5nKSB7XHJcblx0XHRcdFx0cmV0dXJuIGFycltpXS5pMThuLnZhbHVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiBcdHN1Y2Nlc3M6IHN1Y2Nlc3MsXHJcbiBcdHdhcm46IHdhcm4sXHJcbiBcdGVycm9yOiBlcnJvcixcclxuIFx0c3luY0xvb3A6IHN5bmNMb29wLFxyXG4gXHRjb21wYXJlOiBjb21wYXJlLFxyXG5cdGdldE5hbWU6IGdldE5hbWVcclxuXHJcbiB9XHJcbiJdfQ==
