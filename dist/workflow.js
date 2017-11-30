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
                if(subprofileId == undefined){
                    subprofileId = '';
                }
                var subProcessRef = {
                    id: subProcessId,
                    subprofileId: subprofileId,
                    seq: subProcess.data["meta-data"].subProcessInsSeq,
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
            var model = JSON.xpath("/subprocesses[_id eq '" + spuuid + "']/step", app.SCOPE.workflow, {})[0];
            var stepObject = JSON.xpath("/processes[_id eq '" + processId + "']/subProcesses[_id eq '" + subProcessId + "']/steps[_id eq '" + stepId + "']", _this.config, {})[0];
            var subProcessSeq = JSON.xpath("/subprocesses[_id eq '" + spuuid + "']/meta-data/subProcessInsSeq", app.SCOPE.workflow, {})[0];

            // Update the current sub-process step data
            var update = function (type, result) {
                _this.instance.processes.filter(function (processItem) {
                    if (processItem.id == processId && processItem.seq == processSeq) {

                        processItem.subProcesses.filter(function (subProcessItem) {
                            if (subProcessItem.id == subProcessId) {

                                _this.subprocesses.filter(function (subProcessObj) {
                                    if (subProcessObj._id == spuuid) {

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


            if (stepObject.function.task != undefined && stepObject.function.task.postActions != undefined) {


                var postActions = stepObject.function.task.postActions;
                Process.postActions(postActions, _this, spuuid).then(function (success) {
                     
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
Workflow.prototype.assignUser = function (processId, processSeq, subProcessId, subProcessSeq, user, uuid) {
    // Re-assign the Workflow constructor instance as _this
    var _this = this;
    return new Promise(function (resolve, reject) {
        try {
            Process.assignUser(processId, processSeq, subProcessId, subProcessSeq, user, uuid, _this).then(function (result) {
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
            //Pushing older record in reAssign array
            
            if(spObject.step.assignmentHistory == undefined){
                spObject.step.assignmentHistory = [];
            }
            if(assignee.userId != "" && assignee.name != ""){
                spObject.step.assignmentHistory.push(JSON.parse(JSON.stringify(assignee)));
            }
            

            
            assignee.name = LOCAL_SETTINGS.SESSION.firstName + " "+ LOCAL_SETTINGS.SESSION.lastName;
            assignee.userId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId + "";
            assignee.dateTime = moment().format();
            assignee.type = ASSIGNMENT_TYPE_ACCEPTANCE;
            assignee.dueDateTime = '';
            assignee.by = LOCAL_SETTINGS.SUBSCRIPTIONS.userId + "";
           

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


/**
 * Workflow task, this method executes a specific task.
 *
 * @param {object} data - the process id to process
 * @param {object} _WFInstance - the input data to process
 *
 * @example
 * Workflow.condition(condition, spuuid);
 *
 * @return ""
 *
 */

Workflow.prototype.condition = function (condition, spuuid) {
    
    var _this = this;
    return new Promise(function (resolve, reject) {

        try {
            
            var operator = condition.operator;
            var dataBlock = condition.data;

            if(condition.indicator != undefined){

                var setId = condition.indicator.setId;
                var modelScope = condition.indicator.modelScope;
                var elementPath = condition.indicator.elementPath;
                if(condition.indicator.context == 'subProcess'){

                    var indicatorUUID = JSON.xpath("/subprocesses[_id eq '"+ spuuid +"']/indicators[id eq '"+ setId +"']/instances[1]/uuid", _this , {})[0];
                    var indicatorModel = JSON.xpath("/indicators[_id eq '"+ indicatorUUID +"']", _this , {})[0];
                    var dataElement = indicatorModel.model[modelScope].data[setId];
                    var value = eval("dataElement."+ elementPath);
                    
                    helper.getNodeValue(dataBlock, _this, spuuid).then(function (res) {
                        var result = helper.compare(value, operator , res);
                        
                        resolve(result);
                    }, function (err) {
                        reject(err);
                    });



                } else {
                    reject('Not implemented')
                }
                

            } else if(condition.indicatorWrapper != undefined){
                reject('Not implemented')
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
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.subProcessUUID = uuid;
                workerObject.channels.push("dataRegistry");

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
                    worker.setWorkerInfoInSubprocess(workerObject, _WFInstance, uuid);
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
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.subProcessUUID = uuid;
                workerObject.channels.push("dataRegistry");
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

                    worker.setWorkerInfoInSubprocess(workerObject, _WFInstance, uuid);

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
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.subProcessUUID = uuid;
                workerObject.channels.push("dataRegistry");
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
                    
                    worker.setWorkerInfoInSubprocess(workerObject, _WFInstance, uuid);

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
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.subProcessUUID = uuid;
                workerObject.channels.push("dataRegistry");
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

                    worker.setWorkerInfoInSubprocess(workerObject, _WFInstance, uuid);

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
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.subProcessUUID = uuid;
                workerObject.channels.push("dataRegistry");
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

                    worker.setWorkerInfoInSubprocess(workerObject, _WFInstance, uuid);

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
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.subProcessUUID = uuid;
                workerObject.channels.push("dataRegistry");
                var taxonomyUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq 'Taxonomy']/instances[1]/uuid", _WFInstance, {})[0];

                var action = {
                    "createTaxonomy": {
                        "taxonomyUUID": taxonomyUUID
                    }

                };

                workerObject.action = action;
                worker.send(workerObject).then(function (workerSuccess) {
                    
                    worker.setWorkerInfoInSubprocess(workerObject, _WFInstance, uuid);

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

        
        unlockPeriod: function (_def, uuid, _WFInstance) {

            return new Promise(function (resolve, reject) {

                var subprocessObject = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];

                // message from step : TODO 

                var entryUUID = JSON.xpath("/indicators[id eq '" + PERIOD_SET_ID + "']/instances/uuid", subprocessObject, {})[0];
                var enddate = subprocessObject.dates.valid;

                library.unlockPeriod(entryUUID, enddate, uuid).then(function (data) {

                    var success = util.success('Unlock period.', data);
                    resolve(success);



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


                library.setPeriodStatus(entryUUID, enddate, status, uuid).then(function (data) {

                    var success = util.success('setModelStatus', data);
                    resolve(success);


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

                library.lockPerformanceModel(entryUUID, enddate, uuid).then(function (data) {

                    var success = util.success('Lock performance model.', data);
                    resolve(success);


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
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.subProcessUUID = uuid;
                workerObject.channels.push("dataRegistry");
                var sdoUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq 'SDO']/instances[1]/uuid", _WFInstance, {})[0];

                var action = {
                    "createSDO": {
                        "sdoUUID": sdoUUID
                    }

                };

                workerObject.action = action;
                worker.send(workerObject).then(function (workerSuccess) {

                    worker.setWorkerInfoInSubprocess(workerObject, _WFInstance, uuid);

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
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.subProcessUUID = uuid;
                workerObject.channels.push("dataRegistry");
                var taxonomyUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq 'Taxonomy']/instances[1]/uuid", _WFInstance, {})[0];

                var action = {
                    "createTaxonomy": {
                        "taxonomyUUID": taxonomyUUID
                    }

                };

                workerObject.action = action;
                worker.send(workerObject).then(function (workerSuccess) {

                    worker.setWorkerInfoInSubprocess(workerObject, _WFInstance, uuid);

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

                obj.model = _WFInstance.subprocesses;
                stuff.push(obj);
                var success = util.success('Subprocess setTitle success.', _WFInstance.subprocesses);
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
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.messageType = "notification";
                workerObject.channels.push("notification");
                var subProfileId = JSON.xpath("/subprocesses[_id eq '"+ uuid +"']/meta-data/subprofileId", _WFInstance ,{})[0];
               
                var pathArray = window.location.pathname.split( '/' );
                var baseURL = window.location.protocol + "//" + window.location.host + "/" + pathArray[1];

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
                        "url":baseURL,
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

        },


        reAssignmentNotification: function (notification, _WFInstance, uuid, user) {

            return new Promise(function (resolve, reject) {


                var getRecipients = function(userObj) {

                    return new Promise(function (resolve, reject) {
                        var recipients = {};
                        recipients.function = {};
                        recipients.function.users = {};
                        recipients.function.users =  userObj.id;
                        resolve(recipients);
                    });
                }

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.messageType = "notification";
                workerObject.channels.push("notification");
                var subProfileId = JSON.xpath("/subprocesses[_id eq '"+ uuid +"']/meta-data/subprofileId", _WFInstance ,{})[0];

                var pathArray = window.location.pathname.split( '/' );
                var baseURL = window.location.protocol + "//" + window.location.host + "/" + pathArray[1];


                var action = {
                    "notification": {
                        "message": {
                            "rtf":{

                            }
                        },
                        "messageType":"",
                        "meta-data": {
                            "applicationId": _WFInstance.app,
                            "communityId": _WFInstance.communityId,
                            "profileId": _WFInstance.profile,
                            "subProcessUUID": uuid,
                            "subProfileId": subProfileId
                        },
                        "notificationType":"workflow",
                        "priority":"",
                        "recipients": {

                        },
                        "url":baseURL,
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
                action.notification.message.default = "";
                action.notification.message.title = notification.reAssignment.title;

                action.notification.message.rtf.markup = notification.reAssignment.message;
                /**
                * 
                Worker messageType 
                */
                action.notification.messageType = notification.reAssignment.messageType;
                

                /**
                * 
                Worker priority 
                */
                action.notification.priority = notification.reAssignment.priority;
                /**
                * 
                Worker notificationAction if exists 
                */

                if(notification.reAssignment.notificationAction != undefined){

                    action.notification.notificationAction = {};
                    action.notification.notificationAction.label = notification.reAssignment.notificationAction.label;
                    if(notification.reAssignment.notificationAction.action.URI != undefined){
                         
                         action.notification.notificationAction.action = {};
                         action.notification.notificationAction.action.URI = notification.reAssignment.notificationAction.action.URI;
                         
                    } else if(notification.reAssignment.notificationAction.action.goto != undefined) {
                         
                         action.notification.notificationAction.action = {};
                         action.notification.notificationAction.action.goto = notification.reAssignment.notificationAction.action.goto;

                    }
                }
               


                 /**
                * 
                Worker recipients
                */
                
                getRecipients(user).then(function(recipient){
                    action.notification.recipients = recipient;
                    workerObject.action = action;
                    worker.send(workerObject).then(function (workerSuccess) {
                        console.log(workerObject);
                        var success = util.success('Notification Worker processes successfully for reassignment.', workerSuccess);
                        resolve(success);

                    }, function (workerFail) {
                        resolve(workerFail);
                    });


                }).catch(function(err){

                    console.log("Notification - getRecipients failed with error "+ err);
                    reject(err);


                });
               
            });

        },

        assignmentNotification: function (notification, _WFInstance, uuid, user) {

            return new Promise(function (resolve, reject) {


                var getRecipients = function(userObj) {

                    return new Promise(function (resolve, reject) {
                        var recipients = {};
                        recipients.function = {};
                        recipients.function.users = {};
                        recipients.function.users =  userObj.id;
                        resolve(recipients);
                    });
                }

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.messageType = "notification";
                workerObject.channels.push("notification");
                var subProfileId = JSON.xpath("/subprocesses[_id eq '"+ uuid +"']/meta-data/subprofileId", _WFInstance ,{})[0];

                var pathArray = window.location.pathname.split( '/' );
                var baseURL = window.location.protocol + "//" + window.location.host + "/" + pathArray[1];


                var action = {
                    "notification": {
                        "message": {
                            "rtf":{

                            }
                        },
                        "messageType":"",
                        "meta-data": {
                            "applicationId": _WFInstance.app,
                            "communityId": _WFInstance.communityId,
                            "profileId": _WFInstance.profile,
                            "subProcessUUID": uuid,
                            "subProfileId": subProfileId
                        },
                        "notificationType":"workflow",
                        "priority":"",
                        "recipients": {

                        },
                        "url":baseURL,
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
                action.notification.message.default = "";
                action.notification.message.title = notification.assignment.title;

                action.notification.message.rtf.markup = notification.assignment.message;
                /**
                * 
                Worker messageType 
                */
                action.notification.messageType = notification.assignment.messageType;
                

                /**
                * 
                Worker priority 
                */
                action.notification.priority = notification.assignment.priority;
                /**
                * 
                Worker notificationAction if exists 
                */

                if(notification.assignment.notificationAction != undefined){

                    action.notification.notificationAction = {};
                    action.notification.notificationAction.label = notification.assignment.notificationAction.label;
                    if(notification.assignment.notificationAction.action.URI != undefined){
                         
                         action.notification.notificationAction.action = {};
                         action.notification.notificationAction.action.URI = notification.assignment.notificationAction.action.URI;
                         
                    } else if(notification.assignment.notificationAction.action.goto != undefined) {
                         
                         action.notification.notificationAction.action = {};
                         action.notification.notificationAction.action.goto = notification.assignment.notificationAction.action.goto;

                    }
                }
               


                 /**
                * 
                Worker recipients
                */
                
                getRecipients(user).then(function(recipient){
                    action.notification.recipients = recipient;
                    workerObject.action = action;
                    worker.send(workerObject).then(function (workerSuccess) {
                        console.log(workerObject);
                        var success = util.success('Notification Worker processes successfully for assignment.', workerSuccess);
                        resolve(success);

                    }, function (workerFail) {
                        resolve(workerFail);
                    });


                }).catch(function(err){

                    console.log("Notification - getRecipients failed with error "+ err);
                    reject(err);


                });
               
            });

        },

        acceptanceNotification: function (notification, _WFInstance, uuid, role) {

            return new Promise(function (resolve, reject) {


                var getRoles = function(role) {

                    return new Promise(function (resolve, reject) {
                        var recipients = {};
                        recipients.role = role;
                        resolve(recipients);
                    });
                }

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.messageType = "notification";
                workerObject.channels.push("notification");
                var subProfileId = JSON.xpath("/subprocesses[_id eq '"+ uuid +"']/meta-data/subprofileId", _WFInstance ,{})[0];

                var pathArray = window.location.pathname.split( '/' );
                var baseURL = window.location.protocol + "//" + window.location.host + "/" + pathArray[1];


                var action = {
                    "notification": {
                        "message": {
                            "rtf":{

                            }
                        },
                        "messageType":"",
                        "meta-data": {
                            "applicationId": _WFInstance.app,
                            "communityId": _WFInstance.communityId,
                            "profileId": _WFInstance.profile,
                            "subProcessUUID": uuid,
                            "subProfileId": subProfileId
                        },
                        "notificationType":"workflow",
                        "priority":"",
                        "recipients": {

                        },
                        "url":baseURL,
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
                action.notification.message.default = "";
                action.notification.message.title = notification.assignmentAcceptance.title;

                action.notification.message.rtf.markup = notification.assignmentAcceptance.message;
                /**
                * 
                Worker messageType 
                */
                action.notification.messageType = notification.assignmentAcceptance.messageType;
                

                /**
                * 
                Worker priority 
                */
                action.notification.priority = notification.assignmentAcceptance.priority;
                /**
                * 
                Worker notificationAction if exists 
                */

                if(notification.assignmentAcceptance.notificationAction != undefined){

                    action.notification.notificationAction = {};
                    action.notification.notificationAction.label = notification.assignmentAcceptance.notificationAction.label;
                    if(notification.assignmentAcceptance.notificationAction.action.URI != undefined){
                         
                         action.notification.notificationAction.action = {};
                         action.notification.notificationAction.action.URI = notification.assignmentAcceptance.notificationAction.action.URI;
                         
                    } else if(notification.assignmentAcceptance.notificationAction.action.goto != undefined) {
                         
                         action.notification.notificationAction.action = {};
                         action.notification.notificationAction.action.goto = notification.assignmentAcceptance.notificationAction.action.goto;

                    }
                }
               


                 /**
                * 
                Worker recipients
                */
                
                getRoles(role).then(function(recipient){
                    action.notification.recipients = recipient;
                    workerObject.action = action;
                    worker.send(workerObject).then(function (workerSuccess) {
                        console.log(workerObject);
                        var success = util.success('Notification Worker processes successfully for assignment.', workerSuccess);
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
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.subProcessUUID = uuid;
                workerObject.channels.push("createPerformanceReport");
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

                    worker.setWorkerInfoInSubprocess(workerObject, _WFInstance, uuid);

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
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.subProcessUUID = uuid;
                workerObject.channels.push("createReport");
                
                var performanceReportDefinitionSetId = createReport.PerformanceReportDefinitionSetId;
                var reportingSDOSetId = createReport.reportingSDOSetId;

                var performanceReportDefinition = JSON.xpath("/indicators[category/term eq '"+ performanceReportDefinitionSetId +"']/_id", _WFInstance, {})[0];
                var reportingSDO = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '"+ reportingSDOSetId +"']/instances[1]/uuid", _WFInstance, {})[0];

                
                var action = {
                    "createReport": {
                        "performanceReportDefinition": performanceReportDefinition,
                        "reportingSDO": reportingSDO,
                        "profilId": _WFInstance.profile   
                    }
                };

                workerObject.action = action;
                worker.send(workerObject).then(function (workerSuccess) {

                    worker.setWorkerInfoInSubprocess(workerObject, _WFInstance, uuid);

                    var success = util.success('Reprot Worker processed successfully.', workerSuccess);
                    resolve(success);

                }, function (workerFail) {
                    reject(workerFail);
                });
            });

        },


       

        sdoReport: function (sdoReport, _WFInstance, uuid) {
            
            return new Promise(function (resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.subProcessUUID = uuid;
                workerObject.channels.push("sdoReport");
                
                var setId = sdoReport.indicatorSetId;
                var sdoReportUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '"+ setId +"']/instances[1]/uuid", _WFInstance, {})[0];

                
                var action = {
                    "sdoReport": {
                        "sdoReportUUID": sdoReportUUID,
                        "applicationId": app.SCOPE.applicationId,
                        "communityId": app.SCOPE.getCommunityId(),
                        "profileId": app.SCOPE.workflow.profile,
                        "subProcessUUID": uuid  
                    }
                };

                workerObject.action = action;
                worker.send(workerObject).then(function (workerSuccess) {

                    worker.setWorkerInfoInSubprocess(workerObject, _WFInstance, uuid);

                    var success = util.success('report Worker processed successfully.', workerSuccess);
                    resolve(success);

                }, function (workerFail) {
                    reject(workerFail);
                });
            });

        },

        executeReport: function (executeReport, _WFInstance, uuid) {
            
            return new Promise(function (resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.subProcessUUID = uuid;
                workerObject.channels.push("executeReport");
                
               
               
                var SDOreportSetId = executeReport.SDOreportSetId;
                var reportingSDOSetid = executeReport.reportingSDOSetid;


                var SDOreportUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '"+ SDOreportSetId +"']/instances[1]/uuid", _WFInstance, {})[0];
                var reportingSDOUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '"+ reportingSDOSetid +"']/instances[1]/uuid", _WFInstance, {})[0];
                
                if(SDOreportUUID == undefined){
                    SDOreportUUID = JSON.xpath("/indicators[category/term eq '"+ SDOreportSetId +"']/_id",_WFInstance,{})[0];
                }

                
                var action = {
                    "executeReport": {
                        "sdoReportUUID": SDOreportUUID,
                        "reportingSDOUUID": reportingSDOUUID,
                        "applicationId": app.SCOPE.applicationId,
                        "communityId": app.SCOPE.getCommunityId(),
                        "profileId": app.SCOPE.workflow.profile,
                        "subProcessUUID": uuid  
                    }
                };

                workerObject.action = action;
                worker.send(workerObject).then(function (workerSuccess) {

                    worker.setWorkerInfoInSubprocess(workerObject, _WFInstance, uuid);

                    var success = util.success('report Worker processed successfully.', workerSuccess);
                    resolve(success);

                }, function (workerFail) {
                    reject(workerFail);
                });
            });

        },

        generateView: function (generateView, _WFInstance, uuid) {
            
            return new Promise(function (resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.subProcessUUID = uuid;
                workerObject.channels.push("generateView");                
                var ViewConfigSetId = generateView.ViewConfigSetId;
                var ViewConfigUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '"+ ViewConfigSetId +"']/instances[1]/uuid", _WFInstance, {})[0];
                
                
                var action = {
                    "generateView": {
                        "viewConfigUUID": ViewConfigUUID,
                        "applicationId": app.SCOPE.applicationId,
                        "communityId": app.SCOPE.getCommunityId(),
                        "profileId": app.SCOPE.workflow.profile,
                        "subProcessUUID": uuid  
                    }
                };

                workerObject.action = action;
                worker.send(workerObject).then(function (workerSuccess) {

                    worker.setWorkerInfoInSubprocess(workerObject, _WFInstance, uuid);

                    var success = util.success('report Worker processed successfully.', workerSuccess);
                    resolve(success);

                }, function (workerFail) {
                    reject(workerFail);
                });
            });

        },

        requestReport: function (requestReport, _WFInstance, uuid) {
            
            return new Promise(function (resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.subProcessUUID = uuid;
                workerObject.channels.push("requestReport");   
                
                var sdoRequestReportSetId = requestReport.sdoRequestReportSetId;
                var sdoReportCreationSetId = requestReport.sdoReportCreationSetId;
                var sdoRequestReportUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '"+ sdoRequestReportSetId +"']/instances[1]/uuid", _WFInstance, {})[0];
                var sdoReportCreationUUID = JSON.xpath("/indicators[category/term eq '"+ sdoReportCreationSetId +"']/_id", _WFInstance, {})[0];
                var action = {
                    "requestReport": {
                        "sdoRequestReportUUID": sdoRequestReportUUID,
                        "sdoReportCreationUUID": sdoReportCreationUUID,
                        "applicationId": app.SCOPE.applicationId,
                        "communityId": app.SCOPE.getCommunityId(),
                        "profileId": app.SCOPE.workflow.profile,
                        "subProcessUUID": uuid  
                    }
                };

                workerObject.action = action;
                worker.send(workerObject).then(function (workerSuccess) {

                    worker.setWorkerInfoInSubprocess(workerObject, _WFInstance, uuid);

                    var success = util.success('Request report Worker processed successfully.', workerSuccess);
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
                "profileId":"",
                "communityId": "",
                "applicationId": "",
                "subProcessUUID":"",
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
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.subProcessUUID = uuid;
                workerObject.channels.push("sendWorker");
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
                            


                            var spObject = JSON.xpath("/subprocesses[_id eq '"+ uuid +"']",_WFInstance,{})[0];
                            spObject.spStatus = 'submitted';
            
                            if(spObject.messages == undefined){
                                spObject.messages = [];
                            }
                            var pendingSubmissionObject = {
                                "message":{
                                    "i18n":{
                                        "_id":"",
                                        "en": "Server request is pending",
                                        "pt": "Server request is pending"
                                    }
                                },
                                "type":"info"
                            };
                            spObject.messages.push(pendingSubmissionObject);
                            // worker id here
                            if(spObject.workers == undefined){
                                spObject.workers = [];
                            }
                            spObject.workers.push({
                                "workerId": workerObject._id,
                                "dateTime": moment().format()
                            });

                            persistData('subprocesses', app.SCOPE.workflow, uuid)
                            .then(function(saved){
                                
                                var success = util.success('Worker Rest processed successfully.', workerSuccess);
                                resolve(success);

                            }).catch(function(failed){
                                console.log('Worker submitted subprocess file update failed');
                                reject(failed);
                            });



                            

                        }, function (workerFail) {
                            console.log('Worker failed ');
                            reject(workerFail);
                        });

                    },function(err){
                        console.log("parameter creation failed. Abording worker object");
                    });

               } else if(workerConfig.functional != undefined) {

                   var configParam = workerConfig.functional.parameters;
                   processParams(configParam).then(function(paramsArray){
                        var action = {
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

                            var spObject = JSON.xpath("/subprocesses[_id eq '"+ uuid +"']",_WFInstance,{})[0];
                            spObject.spStatus = 'submitted';
            
                            if(spObject.messages == undefined){
                                spObject.messages = [];
                            }
                            var pendingSubmissionObject = {
                                "message":{
                                    "i18n":{
                                        "_id":"",
                                        "en": "Server request is pending",
                                        "pt": "Server request is pending"
                                    }
                                },
                                "type":"info"
                            };
                            spObject.messages.push(pendingSubmissionObject);
                            
                            // worker id here
                            if(spObject.workers == undefined){
                                spObject.workers = [];
                            }
                            spObject.workers.push({
                                "workerId": workerObject._id,
                                "dateTime": moment().format()
                            });

                            persistData('subprocesses', app.SCOPE.workflow, uuid)
                            .then(function(saved){
                                
                                var success = util.success('Worker functional processed successfully.', workerSuccess);
                                resolve(success);

                            }).catch(function(failed){
                                console.log('Worker submitted subprocess file update failed');
                                reject(failed);
                            });



                        }, function (workerFail) {
                            console.log('Worker failed ');
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
                            var txt = paramValue.replace(/'/g, "\\'");
                            return "'" + txt + "'";
                            break;
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

        },

        setWorkerInfoInSubprocess: function(workerObject, _WFInstance, uuid ) {
            
            var subprocessObject = JSON.xpath("/subprocesses[_id eq '"+ uuid +"']", _WFInstance , {})[0];                                    
            var pendingSubmissionObject = {
                "message":{
                    "i18n":{
                        "_id":"",
                        "en": "Worker submitted",
                        "pt": "Worker submitted"
                    }
                },
                "type":"info"
            };
            subprocessObject.messages = [];
            subprocessObject.messages.push(pendingSubmissionObject);

            if(subprocessObject.workers == undefined){
                subprocessObject.workers = [];
            }
            subprocessObject.workers.push({
                "workerId": workerObject._id,
                "dateTime": moment().format()
            })
            return;
            
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
                                                var txt = inputData.label;
                                                var squote = txt.replace(/'/g, "\\'");
                                                var path = "data[0].model.model.pending.data." + action.setWorkflowLabelInField + "='" + squote + "'";
                                                eval(path);
                                            }

                                        }

                                        gatekeeper.persist(data).then(function(savedArray) {
                                            dao.get(mainId).then(function(data) {
                                                if (_WFInstance.indicators.length == 0) {
                                                    _WFInstance.indicators.push(data);
                                                    toProcess--;
                                                    if (toProcess == 0) {

                                                        persistData('indicators', _WFInstance, uuid).then(function (data) {
                                                            
                                                            var success = util.success('Form create indicator persist success.', _WFInstance.indicators);
                                                            resolve(success);

                                                        }).catch(function (err) {

                                                            console.error(err);
                                                            var failure = util.success('Form create indicator persist failed.' + err[0].message, {});
                                                            reject(failure);

                                                        })


                                                      
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
                                                                persistData('indicators', _WFInstance, uuid).then(function (data) {
                                                                    
                                                                    var success = util.success('Form create indicator persist success.', _WFInstance.indicators);
                                                                    resolve(success);
        
                                                                }).catch(function (err) {
        
                                                                    console.error(err);
                                                                    var failure = util.success('Form create indicator persist failed.' + err[0].message, {});
                                                                    reject(failure);
        
                                                                })
                                                            }

                                                        }

                                                    }

                                                    if (found == false) {
                                                        _WFInstance.indicators.push(data);

                                                        toProcess--;
                                                        if (toProcess == 0) {
                                                            persistData('indicators', _WFInstance, uuid).then(function (data) {
                                                                
                                                                var success = util.success('Form create indicator persist success.', _WFInstance.indicators);
                                                                resolve(success);
    
                                                            }).catch(function (err) {
    
                                                                console.error(err);
                                                                var failure = util.success('Form create indicator persist failed.' + err[0].message, {});
                                                                reject(failure);
    
                                                            })
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
            "channels": ["deleteProfile"],
            "communityId": app.SCOPE.getCommunityId(),
            "applicationId": app.SCOPE.applicationId,
            "profileId": _WFInstance.profile,
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

    var subProcessUUID = form[6] || '';

    return new Promise(function(resolve, reject) {

        //var subProcessUUID = JSON.xpath("/processes[id eq '" + processId + "' and seq eq '" + processSeq + "']/subProcesses[id eq '" + subProcessId + "' and seq eq '" + subProcessSeq + "']/uuid", _WFInstance.instance, {})[0];
        var spIndicators = JSON.xpath("/subprocesses[_id eq '" + subProcessUUID + "']/indicators/instances/uuid", _WFInstance, {});
        var itemsToProcess = spIndicators.length;
        var updatedObjectsArray = [];
        var tempArray = [];

        for (var i = 0; i < spIndicators.length; i++) {

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

                                

                                persistData('indicators', _WFInstance, subProcessUUID).then(function (data) {
                                    
                                    var success = util.success('Form authorised successfully.', updatedObjectsArray);
                                    resolve(success);

                                }).catch(function (err) {

                                    console.error(err);
                                    var failure = util.success('Form authorised persist failed.' + err[0].message, {});
                                    reject(failure);

                                });


                            }

                        } else {
                            var found = false;
                            
                            for (var index = 0; index < _WFInstance.indicators.length; index++) {
                                var indicator = _WFInstance.indicators[index];
                                if (indicator._id == data._id) {
                                    found = true;
                                    // Remove the current item from the array and add the updated processModel
                                    tempArray.push(data);
                                    //_WFInstance.indicators.splice(index, 1);
                                    //_WFInstance.indicators.push(data);
                                    itemsToProcess--;
                                    if (itemsToProcess == 0) {
                                        var indLength = _WFInstance.indicators.length;
                                        var tempLength = tempArray.length;

                                        for(var p = 0; p < indLength; p++){
                                            var tempObj=false;
                                            for(var q=0; q < tempLength; q++){
                                                if(_WFInstance.indicators[p]._id == tempArray[q]._id){
                                                    tempObj = true;
                                                }
                                            }
                                            if(!tempObj){ 
                                                tempArray.push(_WFInstance.indicators[p])
                                            }
                                        }
                                        
                                        _WFInstance.indicators = tempArray;
                                        
                                        break;
                                    }

                                }

                            }

                            if (found == true && itemsToProcess == 0){

                                persistData('indicators', _WFInstance, subProcessUUID).then(function (data) {
                                    
                                    var success = util.success('Form authorised successfully.', updatedObjectsArray);
                                    resolve(success);

                                }).catch(function (err) {

                                    console.error(err);
                                    var failure = util.success('Form authorised persist failed.' + err[0].message, {});
                                    reject(failure);

                                });
                                
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

        var setId = path.split(".", 1)[0];
        var indObject = JSON.xpath("/indicators[workflows/processes/subProcessUUID = '"+ uuid +"' and category/term = '"+ setId +"']", _WFInstance ,{})[0];

        var squote = dataValue.replace(/'/g, "\\'");
        var expr = "indObject.model.pending.data." + path + " = '" + squote + "'";
        eval(expr);
        var itemsToProcess = 1;
        var stuff = [];
        var obj = {};

        obj.model = indObject;
        stuff.push(obj);

        var success = util.success('Indicator updated.', stuff);
        resolve(success);

    });
};


function updateIndicatorWrapper(args) {

    var _WFInstance = args[0] || {};

    var uuid = args[1] || '';
    var path = args[2] || '';
    var dataValue = args[3] || '';
    var indicatorSetId = args[4] || '';

    return new Promise(function(resolve, reject) {

       
        var indObject = JSON.xpath("/indicators[workflows/processes/subProcessUUID = '"+ uuid +"' and category/term = '"+ indicatorSetId +"']", _WFInstance ,{})[0];

        
        
        var squote = dataValue.replace(/'/g, "\\'");
        var expr = "indObject." + path + " = '" + squote + "'";
        eval(expr);
        var itemsToProcess = 1;
        var stuff = [];
        var obj = {};

        obj.model = indObject;
        stuff.push(obj);

        var success = util.success('Indicator updated.', stuff);
            resolve(success);

    });
};

function markUpdateIndicator(args) {

    var _WFInstance = args[0] || {};

    var uuid = args[1] || '';
    var status = args[2] || '';
    var indicatorSetId = args[3] || '';
    
    return new Promise(function(resolve, reject) {

        var indObject = JSON.xpath("/indicators[workflows/processes/subProcessUUID = '"+ uuid +"' and category/term = '"+ indicatorSetId +"']", _WFInstance ,{})[0];        
        indObject.model.pending.status = status;
        var itemsToProcess = 1;
        var stuff = [];
        var obj = {};
        obj.model = indObject;
        stuff.push(obj);

        var success = util.success('Indicator updated.', stuff);
        resolve(success);

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


function compare(subject, operator, value) {
    switch (operator) {
        case '>':
            return subject > value;
        case '<':
            return subject < value;
        case '>=':
            return subject >= value;
        case '<=':
            return subject <= value;
        case '==':
            return subject == value;
        case '!=':
            return subject != value;
    }
};



module.exports = {

    getLanguageMessage: getLanguageMessage,
    getNodeValue: getNodeValue,
    compare: compare

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

            var  spObject = JSON.xpath("/subprocesses[_id eq '"+ spuuid +"']", _WFInstance , {})[0];
            var processID = spObject["meta-data"].processConfigId;
            var processId = spObject["meta-data"].subProcessConfigId;
            var processSEQ = spObject["meta-data"].subProcessInsSeq;
            var processSeq = spObject["meta-data"].subProcessInsSeq;

            var subProcessConfigObject = JSON.xpath("/processes[_id eq '"+processID+"']/subProcesses[_id eq '"+ processId+"']", _WFInstance.config , {})[0];
            var stepObject = JSON.xpath("/subprocesses[_id eq '"+ spuuid +"']/step",_WFInstance, {})[0];
            util.syncLoop(preActions.length, function (loop) {
                var counter = loop.iteration();
                action(preActions[counter], processID, processSEQ, processId, processSeq, subProcessConfigObject, stepObject ,_WFInstance, {}, spuuid).then(function (data) {
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

        var cardIndList = '';
        for(var i = 0; i < subProcessConf.indicators.length-1; i++){
            cardIndList = cardIndList + "'"+ subProcessConf.indicators[i]._id + "',";
        }
        cardIndList = cardIndList + "'"+ subProcessConf.indicators[i]._id + "'";
        var singleCard = JSON.xpath("/indicators[setId = ("+ cardIndList +") and cardinality eq 'single']", app.SCOPE.APP_CONFIG,{}).length;

        if(subProcessConf.instanceType.newSequence != undefined || singleCard > 0){
            var previousObject = JSON.xpath("/instance/processes[id eq '" + processId + "']", _WFInstance, {})[0];
            if(previousObject != undefined && previousObject.subProcesses.length > 0) {
                groupKey = previousObject.subProcesses[0].groupKey;
            } else {
                groupKey = generateUUID();
            }
        } else {
            groupKey = generateUUID();

        } 
     }
    
    var countSubprocessInContext = JSON.xpath("count(/processes/subProcesses[groupKey eq '"+ groupKey +"'])", _WFInstance.instance ,{})[0];
    var label = data.label;
    var subProcessObjectId = generateUUID();
    var model = {
        _id: subProcessObjectId,
        id: subProcessId,
        type: 'workflowInstanceSubProcess',
        dateTimeCreated: moment().format(),
        dueDateTime: moment().format(),
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
        },
        messages: [],
        spStatus:''
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
                    if (data.validDate != undefined) {
                        result.dates.valid = data.validDate;
                    } else {
                        result.dates.valid = new Date().toISOString().substring(0,10);
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
            name: '',
            dateTime:'',
            type:'',
            dueDateTime:'',
            by:''
        },
        assignmentHistory:[],
        dateTimeCreated: moment().format(),
        dueDateTime: moment().format(),
        transition:{
            transitionId:'',
            dateTime:'',
            userId: ''
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
                        var updatedSeq = JSON.xpath("/indicators[_id eq '"+ uuid +"']/model/pending/seq", _WFInstance, {})[0];
                        indicatorObject.instances[0].seq = updatedSeq;
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

                } else if (step.function.server != undefined) {
                    // Make assignments
                    server(step.function.server, processId, processSeq, subProcessId, subProcessSeq, subProcess, model, _WFInstance, data, spuuid).then(function (result) {

                        updateSPIndicatorObject(indicators, _WFInstance);
                        var success = util.success('Server awaiting server response.', model);
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
function assignUser(processId, processSeq, subProcessId, subProcessSeq, user, uuid, _WFInstance) {
    return new Promise(function (resolve, reject) {
        try {
           
            // Get the current subProcess instance data

            /*
            _WFInstance.instance.processes.filter(function (objProcess) {
                if (objProcess.id == processId && objProcess.seq == processSeq) {
                    objProcess.subProcesses.filter(function (objSubProcess) {
                        if (objSubProcess.id == subProcessId && objSubProcess.seq == subProcessSeq) {
                            uuid = objSubProcess.uuid;
                        }
                    });
                }
            });
            */
            
            _WFInstance.subprocesses.filter(function (subProcessItem) {
                if (subProcessItem._id == uuid) {
                    //Added to hstory
                    if(subProcessItem.step.assignmentHistory == undefined){
                        subProcessItem.step.assignmentHistory = [];
                    }
                    if(subProcessItem.step.assignedTo.userId != "" && subProcessItem.step.assignedTo.name != ""){
                        subProcessItem.step.assignmentHistory.push(JSON.parse(JSON.stringify(subProcessItem.step.assignedTo)));
                    }
                    

                    // Set the user details
                    subProcessItem.step.assignedTo.userId = user.id;
                    subProcessItem.step.assignedTo.name = user.name;
                    subProcessItem.step.assignedTo.dateTime = moment().format();
                    subProcessItem.step.assignedTo.type = ASSIGNMENT_TYPE_REASSIGNMENT;
                    subProcessItem.step.assignedTo.dueDateTime = '';
                    subProcessItem.step.assignedTo.by = LOCAL_SETTINGS.SUBSCRIPTIONS.userId + "";
                    
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
                    //Send assign user notification from here

                    var notification = JSON.xpath("/processes[_id eq '"+ processId +"']/notifications",_WFInstance.config, {})[0];

                    if(notification != undefined && notification.reAssignment != undefined){

                        actionsModule.notification.reAssignmentNotification(notification, _WFInstance, uuid, user).then(
                            function(success){
                                var success = util.success('User assigned successfully. UserId: "' + user.id + '", Name: "' + user.name + '"', subProcessItem);
                                resolve(success);
                        }).catch(
                            function(fail){
                            resolve(fail);
                        });
                        

                    } else {

                        var success = util.success('User assigned successfully. UserId: "' + user.id + '", Name: "' + user.name + '"', subProcessItem);
                        resolve(success);

                    }

                   


                    
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
                    var performancePossibleItems = ["unlockPeriod", "lockPerformanceModel", "setModelStatus"];
                    switch (propertyExists(action.method.performance, performancePossibleItems)) {

                        
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
                /**
                 * 
                 */    
                var reportPossibleItems = ["createPerformanceReport","createReport","sdoReport","executeReport", "requestReport","generateView" ];

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
                        case 'sdoReport':
                            return actionsModule.report.sdoReport(action.method.report.sdoReport, _WFInstance, uuid ).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });
                        case 'executeReport':
                            return actionsModule.report.executeReport(action.method.report.executeReport, _WFInstance, uuid ).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });
                        case 'generateView':
                            return actionsModule.report.generateView(action.method.report.generateView, _WFInstance, uuid ).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });
                        case 'requestReport':
                            return actionsModule.report.requestReport(action.method.report.requestReport, _WFInstance, uuid ).then(function (result) {
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
                                if(model.assignmentHistory == undefined){
                                    model.assignmentHistory = [];
                                }
                                var assignee = model.assignedTo;
                                if(assignee.userId !="" && assignee.name != ""){
                                    var newObj = JSON.parse(JSON.stringify(assignee));
                                    model.assignmentHistory.push(newObj);
                                }
                                

                                assignee.name = LOCAL_SETTINGS.SUBSCRIPTIONS.username + "";
                                assignee.userId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId + "";
                                assignee.dateTime = moment().format();
                                assignee.type = ASSIGNMENT_TYPE_AUTO;
                                assignee.dueDateTime = '';
                                assignee.by = LOCAL_SETTINGS.SUBSCRIPTIONS.userId + "";

                                // Notification that its been automatically assigned to you
                                //Send assign user notification from here
                                var notification = JSON.xpath("/processes[_id eq '"+ subprocessID +"']/notifications",_WFInstance.config, {})[0];
                                if(notification != undefined && notification.assignment != undefined){
                                    var user = { 'id': LOCAL_SETTINGS.SUBSCRIPTIONS.userId, 'name': LOCAL_SETTINGS.SUBSCRIPTIONS.username };
                                    actionsModule.notification.assignmentNotification(notification, _WFInstance, spuuid, user).then(
                                        function(success){
                                            console.log('User assigned successfully. UserId: "' + user.id + '", Name: "' + user.name + '"');    
                                        }
                                    ).catch(
                                        function(fail){
                                            console.log('User assignment notification failed to user UserId: "' + user.id + '", Name: "' + user.name + '"');
                                        }
                                    );
                                }
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

                                // Notification that its been released for acceptance

                                var notification = JSON.xpath("/processes[_id eq '"+ subprocessID +"']/notifications",_WFInstance.config, {})[0];
                                //issue here
                                if(notification != undefined && notification.assignmentAcceptance != undefined){
                                    var user = { 'id': LOCAL_SETTINGS.SUBSCRIPTIONS.userId, 'name': LOCAL_SETTINGS.SUBSCRIPTIONS.username };
                                    actionsModule.notification.acceptanceNotification(notification, _WFInstance, spuuid, role).then(
                                        function(success){
                                            console.log('User assigned successfully. UserId: "' + user.id + '", Name: "' + user.name + '"');    
                                            resolve('Notifications request submitted for acceptance.');
                                        }
                                    ).catch(
                                        function(fail){
                                            resolve('Notifications failed');
                                            console.log('User assignment notification failed to user UserId: "' + user.id + '", Name: "' + user.name + '"');
                                        }
                                    );
                                } else {
                                    resolve('Notifications not found');
                                }

                               

                            }
                            

                        } else if (list.length == 1) {
                            // Implement here preWorkAction as this is automatically assigned in case of 1 user and will not go trough acceptance function.

                            var userId = list[0].id;
                            var username = list[0].name;

                            if(model.assignmentHistory == undefined){
                                model.assignmentHistory = [];
                            }

                            var assignee = model.assignedTo;
                            if(assignee.userId !="" && assignee.name != ""){
                                var newObj = JSON.parse(JSON.stringify(assignee));
                                model.assignmentHistory.push(newObj);
                            }


                            

                            assignee.name = username + "";
                            assignee.userId = userId + "";
                            assignee.dateTime = moment().format();
                            assignee.type = ASSIGNMENT_TYPE_AUTO;
                            assignee.dueDateTime = '';
                            assignee.by = LOCAL_SETTINGS.SUBSCRIPTIONS.userId + "";

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

                            // Notification that its been automatically assigned to you
                            //Send assign user notification from here
                            
                            var notification = JSON.xpath("/processes[_id eq '"+ subprocessID +"']/notifications",_WFInstance.config, {})[0];
                            if(notification != undefined && notification.assignment != undefined){
                                var user = { 'id': userId, 'name': username };
                                actionsModule.notification.assignmentNotification(notification, _WFInstance, spuuid, user).then(
                                    function(success){
                                        console.log('User assigned successfully. UserId: "' + user.id + '", Name: "' + user.name + '"');    
                                    }
                                ).catch(
                                    function(fail){
                                        console.log('User assignment notification failed to user UserId: "' + user.id + '", Name: "' + user.name + '"');
                                    }
                                );
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
                            //Case where users list = 0
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
function server(server, processId, processSeq, subProcessId, subProcessSeq, subProcess, model, _WFInstance, data, uuid) {
    
        return new Promise(function (resolve, reject) {
           
            //var _WFInstance = app.SCOPE.workflow;
            var profileId = _WFInstance.profile;
            var actionBlock = server.serverAction[0];
            if(model.assignmentHistory == undefined){
                model.assignmentHistory = [];
            }

            var assignee = model.assignedTo;
            if(assignee.userId !="" && assignee.name != ""){
                var newObj = JSON.parse(JSON.stringify(assignee));
                model.assignmentHistory.push(newObj);
            }
            assignee.name = LOCAL_SETTINGS.SUBSCRIPTIONS.username + "";
            assignee.userId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId + "";
            assignee.dateTime = moment().format();
            assignee.type = ASSIGNMENT_TYPE_AUTO;
            assignee.dueDateTime = '';
            assignee.by = LOCAL_SETTINGS.SUBSCRIPTIONS.userId + "";

            action(actionBlock, processId, processSeq, subProcessId, subProcessSeq, subProcess, model, _WFInstance, data, uuid)
            .then(function (result) {
                resolve("No users found in list. Assigning blank ");
            }, function (err) {
                reject("Server action error found rejected")
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
                delete model.assignedTo;
                delete model.assignment;
                return model;
            }

            // add information to transtion object.
            var  trnObject = {
                transitionId: transition[0]._id,
                dateTime: moment().format(),
                userId: LOCAL_SETTINGS.SUBSCRIPTIONS.userId + ""
            }
            if(model != undefined && Object.keys(model).length > 0){
                model.transition = trnObject;    
            } else {
                spInstanceStepObject.transition = trnObject;
            }

            // copy current assignedTo to reAssignment object
            
            if(model != undefined && Object.keys(model).length > 0){
                if(model.assignmentHistory == undefined){
                    model.assignmentHistory = [];
                }
                var assigneeObj = JSON.parse(JSON.stringify(model.assignedTo));
                if(assigneeObj.userId != "" && assigneeObj.name != ""){
                    model.assignmentHistory.push(assigneeObj);
                }
                
            } else {
                if(spInstanceStepObject.assignmentHistory == undefined){
                    spInstanceStepObject.assignmentHistory = [];
                }
                var assigneeObj = JSON.parse(JSON.stringify(spInstanceStepObject.assignedTo));
                if(assigneeObj.userId != "" && assigneeObj.name != ""){
                    spInstanceStepObject.assignmentHistory.push(assigneeObj);
                }
                
            }
            var historyModel;
            if(model != undefined && Object.keys(model).length > 0){
                 historyModel = JSON.parse(JSON.stringify(model));
            } else {
                 historyModel = JSON.parse(JSON.stringify(spInstanceStepObject));
            }
            var indModelInStep = pushIndicatorToModel(historyModel);
            spinstanceObject.history.push(indModelInStep); 

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
                postActions(postActionsConf, _WFInstance, spuuid).then(function (result) {

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
function postActions(postActions, _WFInstance, spuuid) {
    return new Promise(function (resolve, reject) {
        var completed = [];
        try {

            
            var spObject = JSON.xpath("/subprocesses[_id eq '"+ spuuid +"']", _WFInstance , {})[0];
            var processID = spObject["meta-data"].processConfigId;
            var processId = spObject["meta-data"].subProcessConfigId;
            var processSEQ = spObject["meta-data"].subProcessInsSeq;
            var processSeq = spObject["meta-data"].subProcessInsSeq;

            var subProcessConfigObject = JSON.xpath("/config/processes[_id eq '"+ processID+"']/subProcesses[_id eq '"+ processId+"']", _WFInstance , {})[0];
            var stepObject = JSON.xpath("/subprocesses[_id eq '"+ spuuid +"']/step",_WFInstance, {})[0];
            

            util.syncLoop(postActions.length, function (loop) {
                var counter = loop.iteration();
                action(postActions[counter], processID, processSEQ, processId, processSeq, subProcessConfigObject, stepObject,_WFInstance, {}, spuuid).then(function (data) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsImxpYi9hY3Rpb25zLmpzIiwibGliL2Zvcm0uanMiLCJsaWIvaGVscGVyLmpzIiwibGliL2ludGVyZmFjZS5qcyIsImxpYi9ub2RlVmFsdWUuanMiLCJsaWIvcHJvY2Vzcy5qcyIsIm5vZGVfbW9kdWxlcy91dGlsaXR5L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzl6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9zRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcjBCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3g3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbnZhciBQcm9jZXNzID0gcmVxdWlyZSgnLi9saWIvcHJvY2VzcycpO1xudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsaXR5Jyk7XG52YXIgdXNlckludGVyZmFjZSA9IHJlcXVpcmUoJy4vbGliL2ludGVyZmFjZScpO1xudmFyIGhlbHBlciA9IHJlcXVpcmUoJy4vbGliL2hlbHBlcicpO1xuXG5cbi8qZ2xvYmFscyAqL1xuXG4vKipcbiAqIEEgbmV3IFdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlIGNvbnRhaW5zIHRoZSByZWZlcmVuY2UgdG8gdGhlIGFwcGxpY2F0aW9uXG4gKiBhbmQgYXNzb2NpYXRlZCBwcm9maWxlIHdoaWNoIGl0IHJlcXVpcmVzIGFzIHRoZSBmaXJzdCB0d28gcGFyYW1ldGVycy4gSXQgYWxzb1xuICogcmVxdWlyZXMgYSB3b3JrZmxvdyBjb25maWd1cmF0aW9uLCBhcyB0aGUgdGhpcmQgcGFyYW1ldGVyLCB3aGljaCBpcyB1c2VkIHRvXG4gKiBkZXNjaWJlIHRoZSB3b3JrZmxvdyBwcm9jZXNzZXMuIElmIGEgd29ya2Zsb3cgaW5zdGFuY2UgZXhpc3RzIHlvdSBjYW4gcGFzcyBpdFxuICogaW4gYXMgdGhlIGZvdXJ0aCBwYXJhbWV0ZXIgd2hpY2ggaXQgd2lsbCB0aGVuIHVzZSwgZWxzZSBjcmVhdGUgYSBuZXcgb25lLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9maWxlIC0gVGhlIGN1cnJlbnQgcHJvZmlsZSBpZFxuICogQHBhcmFtIHtzdHJpbmd9IGFwcCAtIFRoZSBhc3NvY2lhdGVkIGFwcGxpY2F0aW9uIGlkXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIC0gVGhlIGFwcGxpY2F0aW9uIHdvcmtmbG93IGNvbmZpZ3VyYXRpb24gLyBkZWZpbml0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gW2luc3RhbmNlXSAtIEFuIGV4aXN0aW5nIGFwcGxpY2F0aW9uIHByb2ZpbGUgd29ya2Zsb3cgaW5zdGFuY2UgYmFzZWRcbiAqIG9uIHRoZSBkZWZpbml0aW9uXG4gKlxuICogQGF1dGhvciBCcmVudCBHb3Jkb25cbiAqIEB2ZXJzaW9uIDAuMS4wXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBjb25maWcgPSB7ICdfaWQnOiAnYWJjMTIzJyB9O1xuXG4gKiB2YXIgaW5zdGFuY2UgPSB7ICdfaWQnOiAnaW5zdGFuY2VfYWJjMTIzJyB9O1xuXG4gKiAvLyBJZiB0aGVyZSBpc24ndCBhbiBleGlzdGluZyBpbnN0YW5jZVxuICogdmFyIHdvcmtmbG93ID0gbmV3IFdvcmtmbG93KCcxMjM0JywgJzU2NzgnLCBjb25maWcpO1xuICogLy8gSWYgdGhlcmUgaXMgYW4gZXhpc3RpbmcgaW5zdGFuY2VcbiAqIHZhciB3b3JrZmxvdyA9IG5ldyBXb3JrZmxvdygnMTIzNCcsICc1Njc4JywgY29uZmlnLCBpbnN0YW5jZSk7XG4gKlxuICogQHJldHVybiB7T2JqZWN0fSBuZXcgV29ya2Zsb3cgb2JqZWN0XG4gKlxuICogQHRocm93cyBFcnJvcjogQSBwcm9maWxlIGlkIGlzIHJlcXVpcmVkXG4gKiBAdGhyb3dzIEVycm9yOiBBbiBhcHAgaWQgaXMgcmVxdWlyZWRcbiAqIEB0aHJvd3MgRXJyb3I6IEEgd29ya2Zsb3cgY29uZmlndXJhdGlvbiBpcyByZXF1aXJlZFxuICpcbiAqL1xuXG5mdW5jdGlvbiBXb3JrZmxvdyhwcm9maWxlLCBjb21tdW5pdHlJZCwgYXBwLCBjb25maWcpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgLy8gQ29tbXVuaXR5IElEIHZhbGlkYXRpb24gY2hlY2tzXG4gICAgaWYgKGNvbW11bml0eUlkID09ICcnIHx8IGNvbW11bml0eUlkID09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyB1dGlsLmVycm9yKCdQYXJhbVJlcXVpcmVkJywgJ0EgY29tbXVuaXR5IGlkIGlzIHJlcXVpcmVkLicpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIChjb21tdW5pdHlJZCkgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGNvbW11bml0eSBpZCBtdXN0IGJlIGEgamF2YXNjcmlwdCBzdHJpbmcuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgX3RoaXMuY29tbXVuaXR5SWQgPSBjb21tdW5pdHlJZCB8fCAnJztcbiAgICB9XG5cbiAgICAvLyBQcm9maWxlIElEIHZhbGlkYXRpb24gY2hlY2tzXG4gICAgaWYgKHByb2ZpbGUgPT0gJycgfHwgcHJvZmlsZSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgdXRpbC5lcnJvcignUGFyYW1SZXF1aXJlZCcsICdBIHByb2ZpbGUgaWQgaXMgcmVxdWlyZWQuJyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgKHByb2ZpbGUpICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBwcm9maWxlIGlkIG11c3QgYmUgYSBqYXZhc2NyaXB0IHN0cmluZy4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBfdGhpcy5wcm9maWxlID0gcHJvZmlsZSB8fCAnJztcbiAgICB9XG5cbiAgICAvLyBBcHAgSUQgdmFsaWRhdGlvbiBjaGVja3NcbiAgICBpZiAoYXBwID09ICcnIHx8IGFwcCA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgdXRpbC5lcnJvcignUGFyYW1SZXF1aXJlZCcsICdBbiBhcHAgaWQgaXMgcmVxdWlyZWQuJyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgKGFwcCkgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGFwcCBpZCBtdXN0IGJlIGEgamF2YXNjcmlwdCBzdHJpbmcuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgX3RoaXMuYXBwID0gYXBwIHx8ICcnO1xuICAgIH1cblxuICAgIC8vIFdvcmtmbG93IGNvbmZpZ3VyYXRpb24gdmFsaWRhdGlvbiBjaGVja3NcbiAgICBpZiAoY29uZmlnID09ICcnIHx8IGNvbmZpZyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgdXRpbC5lcnJvcignUGFyYW1SZXF1aXJlZCcsICdBIHdvcmtmbG93IGNvbmZpZ3VyYXRpb24gaXMgcmVxdWlyZWQuJyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgKGNvbmZpZykgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIF90aGlzLmNvbmZpZyA9IEpTT04ucGFyc2UoY29uZmlnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBfdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgfVxuXG4gICAgLy8gV29ya2Zsb3cgaW5zdGFuY2UgdmFsaWRhdGlvbiBjaGVja3NcbiAgICBfdGhpcy5pbnN0YW5jZTtcbiAgICAvLyBXb3JrZmxvdyBzdWItcHJvY2Vzc2VzIHZhbGlkYXRpb24gY2hlY2tzXG4gICAgX3RoaXMuc3VicHJvY2Vzc2VzID0gW107XG4gICAgLy8gV29ya2Zsb3cgaW5kaWNhdG9ycyBwbGFjZSBob2xkZXJcbiAgICBfdGhpcy5pbmRpY2F0b3JzID0gW107XG4gICAgXG5cbn1cblxuLyoqXG4gKiBXb3JrZmxvdyBnZXQgcHJvZmlsZSBpZC5cbiAqXG4gKiBAZXhhbXBsZSBcIlwiXG4gKlxuICogQHJldHVybiBcIlwiXG4gKlxuICovXG5Xb3JrZmxvdy5wcm90b3R5cGUuZ2V0UHJvZmlsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9maWxlO1xufTtcblxuLyoqXG4gKiBXb3JrZmxvdyBnZXQgYXBwIGlkLlxuICpcbiAqIEBleGFtcGxlIFwiXCJcbiAqXG4gKiBAcmV0dXJuIFwiXCJcbiAqXG4gKi9cbldvcmtmbG93LnByb3RvdHlwZS5nZXRBcHAgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwO1xufTtcblxuLyoqXG4gKiBXb3JrZmxvdyBnZXQgY29uZmlnLlxuICpcbiAqIEBleGFtcGxlIFwiXCJcbiAqXG4gKiBAcmV0dXJuIFwiXCJcbiAqXG4gKi9cbldvcmtmbG93LnByb3RvdHlwZS5nZXRDb25maWcgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnO1xufTtcblxuLyoqXG4gKiBXb3JrZmxvdyBnZXQgaW5zdGFuY2UuXG4gKlxuICogQGV4YW1wbGUgXCJcIlxuICpcbiAqIEByZXR1cm4gXCJcIlxuICpcbiAqL1xuXG5Xb3JrZmxvdy5wcm90b3R5cGUuZ2V0SW5zdGFuY2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG59O1xuXG4vKipcbiAqIFdvcmtmbG93IHNldCB0aGUgaW5zdGFuY2UgZGF0YS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIHRoZSB3b3JrZmxvdyBwcm9jZXNzIGluc3RhbmNlIGRhdGFcbiAqXG4gKiBAZXhhbXBsZSBcIlwiXG4gKlxuICogQHJldHVybiBcIlwiXG4gKlxuICovXG5Xb3JrZmxvdy5wcm90b3R5cGUuc2V0SW5zdGFuY2UgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHRoaXMuaW5zdGFuY2UgPSBkYXRhO1xufTtcblxuLyoqXG4gKiBXb3JrZmxvdyBnZXQgc3ViLXByb2Nlc3NlcyBkYXRhLlxuICpcbiAqIEBleGFtcGxlIFwiXCJcbiAqXG4gKiBAcmV0dXJuIFwiXCJcbiAqXG4gKi9cbldvcmtmbG93LnByb3RvdHlwZS5nZXRTdWJQcm9jZXNzZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3VicHJvY2Vzc2VzO1xufTtcblxuLyoqXG4gKiBXb3JrZmxvdyBzZXQgdGhlIHN1Yi1wcm9jZXNzZXMgZGF0YS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIHRoZSB3b3JrZmxvdyBwcm9jZXNzIGluc3RhbmNlIGRhdGFcbiAqXG4gKiBAZXhhbXBsZSBcIlwiXG4gKlxuICogQHJldHVybiBcIlwiXG4gKlxuICovXG5Xb3JrZmxvdy5wcm90b3R5cGUuc2V0U3ViUHJvY2Vzc2VzID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICB0aGlzLnN1YnByb2Nlc3NlcyA9IGRhdGE7XG59O1xuXG4vKipcbiAqIFdvcmtmbG93IGdldCBpbmRpY2F0b3Igc2V0IGRhdGEuXG4gKlxuICogQGV4YW1wbGUgXCJcIlxuICpcbiAqIEByZXR1cm4gXCJcIlxuICpcbiAqL1xuV29ya2Zsb3cucHJvdG90eXBlLmdldEluZGljYXRvcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5kaWNhdG9ycztcbn07XG5cbi8qKlxuICogV29ya2Zsb3cgc2V0IHRoZSBpbmRpY2F0b3Igc2V0IGRhdGEuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSB0aGUgd29ya2Zsb3cgcHJvY2VzcyBpbnN0YW5jZSBkYXRhXG4gKlxuICogQGV4YW1wbGUgXCJcIlxuICpcbiAqIEByZXR1cm4gXCJcIlxuICpcbiAqL1xuV29ya2Zsb3cucHJvdG90eXBlLnNldEluZGljYXRvcnMgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHRoaXMuaW5kaWNhdG9ycyA9IGRhdGE7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgdmFyaWFibGUgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHByb2Nlc3MgaWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBwcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHByb2Nlc3Mgc2VxXG4gKiBAcGFyYW0ge3N0cmluZ30gc3ViUHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3ViLXByb2Nlc3MgaWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdWJQcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHN1Yi1wcm9jZXNzIHNlcVxuICogQHBhcmFtIHtzdHJpbmd9IHN0ZXBJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN0ZXAgaWRcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YXJpYWJsZSAtIHRoZSBXb3JrZmxvdyB2YXJpYWJsZSBvYmplY3RcbiAqXG4gKiBAZXhhbXBsZSAnJ1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cbi8vIFdvcmtmbG93LnByb3RvdHlwZS5zZXRWYXJpYWJsZSA9IGZ1bmN0aW9uKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdGVwSWQsIHZhcmlhYmxlKXtcbi8vIFx0dmFyIF90aGlzID0gdGhpcztcbi8vIFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuLy8gXHRcdHRyeSB7XG4vLyBcdFx0XHRQcm9jZXNzLmdldFZhcmlhYmxlKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdGVwSWQsIHZhcmlhYmxlKS50aGVuKGZ1bmNpb24ocmVzdWx0KXtcbi8vIFx0XHRcdFx0cmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4vLyBcdFx0XHR9LCBmdW5jdGlvbihlcnIpe1xuLy8gXHRcdFx0XHRyZWplY3QoZXJyKTtcbi8vIFx0XHRcdH0pXG4vLyBcdFx0fSBjYXRjaCAoZXJyKSB7XG4vLyBcdFx0XHRyZWplY3QoZXJyKTtcbi8vIFx0XHR9XG5cbi8vIFx0fSk7XG4vLyB9O1xuXG4vKipcbiAqIEdldCB0aGUgdmFyaWFibGUgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHByb2Nlc3MgaWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBwcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHByb2Nlc3Mgc2VxXG4gKiBAcGFyYW0ge3N0cmluZ30gc3ViUHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3ViLXByb2Nlc3MgaWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdWJQcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHN1Yi1wcm9jZXNzIHNlcVxuICogQHBhcmFtIHtzdHJpbmd9IHN0ZXBJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN0ZXAgaWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSB0aGUgV29ya2Zsb3cgdmFyaWFibGUgaWRcbiAqXG4gKiBAZXhhbXBsZSAnJ1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cbi8vIFdvcmtmbG93LnByb3RvdHlwZS5nZXRWYXJpYWJsZSA9IGZ1bmN0aW9uKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdGVwSWQsIGtleSl7XG4vLyBcdHZhciBfdGhpcyA9IHRoaXM7XG4vLyBcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbi8vIFx0XHR0cnkge1xuLy8gXHRcdFx0UHJvY2Vzcy5zZXRWYXJpYWJsZShwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3RlcElkLCBrZXkpLnRoZW4oZnVuY2lvbihyZXN1bHQpe1xuLy8gXHRcdFx0XHRyZXNvbHZlKHJlc3VsdC5kYXRhKTtcbi8vIFx0XHRcdH0sIGZ1bmN0aW9uKGVycil7XG4vLyBcdFx0XHRcdHJlamVjdChlcnIpO1xuLy8gXHRcdFx0fSlcbi8vIFx0XHR9IGNhdGNoIChlcnIpIHtcbi8vIFx0XHRcdHJlamVjdChlcnIpO1xuLy8gXHRcdH1cblxuLy8gXHR9KTtcbi8vIH07XG5cbi8qKlxuICogVGhpcyBtZXRob2QgY3JlYXRlcyBhIG5ldyB3b3JrZmxvdyBwcm9jZXNzIGkuZS4gaXQgY3JlYXRlcyBhIHdvcmtmbG93IHByb2Nlc3NlcyBpbnN0YW5jZVxuICogb2JqZWN0IHdpdGggdGhlIG1pbmltdW0gcmVxdWlyZWQgZGF0YS4gVGhpcyBpbnN0YW5jZSBjYW4gYmUgcmVmZXJlbmNlZCBpbiB0aGUgZm9sbG93aW5nXG4gKiB3YXksIHNlZSBleGFtcGxlIGJlbG93LlxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgY29uZmlnID0geyAnX2lkJzogJ2FiYzEyMycgfTtcblxuICogdmFyIHdvcmtmbG93ID0gbmV3IFdvcmtmbG93KCcxMjM0JywgJzU2NzgnLCBjb25maWcpO1xuICogd29ya2Zsb3cuY3JlYXRlKCkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICpcdGNvbnNvbGUubG9nKHJlc3VsdC5tZXNzYWdlKTtcbiAqXHQvLyBUaGUgZm9sbG93aW5nIHByb3BlcnRpZXMgY2FuIG5vdyBiZSBhY2Nlc3NlZFxuICogXHR2YXIgcHJvZmlsZSA9IHdvcmtmbG93LnByb2ZpbGU7XG4gKiBcdHZhciBhcHAgPSB3b3JrZmxvdy5hcHA7XG4gKiBcdHZhciBjb25maWcgPSB3b3JrZmxvdy5jb25maWc7XG4gKlx0Ly8gT24gc3VjY2VzcyB5b3UgY2FuIGFjY2VzcyB0aGUgaW5zdGFuY2UgdGhlIGZvbGxvd2luZyB3YXlcbiAqXHR2YXIgaW5zdGFuY2UgPSB3b3JrZmxvdy5pbnN0YW5jZTtcbiAqIH0sIGZ1bmN0aW9uKGVycm9yKXtcbiAqXHRjb25zb2xlLmxvZyhlcnJvcik7XG4gKiB9KTtcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IG5ldyBXb3JrZmxvdyBpbnN0YW5jZSB3aXRoIHVwZGF0ZWQgaW5zdGFuY2UgZGF0YS5cbiAqXG4gKi9cblxuV29ya2Zsb3cucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoX3RoaXMuaW5zdGFuY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHZhciB3YXJuID0gdXRpbC53YXJuKCdJbnN0YW5jZSBhbHJlYWR5IGV4aXN0cy4nLCBfdGhpcylcbiAgICAgICAgICAgICAgICByZXNvbHZlKHdhcm4pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgdGhlIHdvcmtmbG93IHByb2Nlc3NlcyBpbnN0YW5jZSBvYmplY3RcbiAgICAgICAgICAgICAgICB2YXIgbW9kZWwgPSB7XG4gICAgICAgICAgICAgICAgICAgIF9pZDogJycsXG4gICAgICAgICAgICAgICAgICAgIHZlcnNpb246ICcnLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnd29ya2Zsb3dJbnN0YW5jZScsXG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NlczogW10sXG4gICAgICAgICAgICAgICAgICAgIGNoYW5uZWxzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbW11bml0eV9cIiArIGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxlX1wiICsgYXBwLlNDT1BFLnByb2ZpbGVJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYXBwbGljYXRpb25fXCIgKyBhcHAuU0NPUEUuYXBwbGljYXRpb25JZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tbXVuaXR5X1wiICsgYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCkgKyBcIl9hcHBsaWNhdGlvbl9cIiArIGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgbW9kZWwuX2lkID0gXCJfbG9jYWwvXCIrX3RoaXMucHJvZmlsZSArICc6cHJvY2Vzc2VzOmxvY2FsJztcbiAgICAgICAgICAgICAgICAvL21vZGVsLl9pZCA9IF90aGlzLnByb2ZpbGUgKyAnOnByb2Nlc3Nlcyc7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbW9kZWwudmVyc2lvbiA9IF90aGlzLmNvbmZpZy52ZXJzaW9uO1xuICAgICAgICAgICAgICAgIF90aGlzLmluc3RhbmNlID0gbW9kZWw7XG4gICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1dvcmtmbG93IHByb2Nlc3NlcyBpbnN0YW5jZSBjcmVhdGVkIHN1Y2Nlc3NmdWxseS4nLCBfdGhpcyk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cblxuICAgIH0pO1xufTtcblxuLyoqXG4gKiBXb3JrZmxvdyBpbml0aWFsaXNlLCB0aGlzIGZ1bmN0aW9uIGV4ZWN1dGVzIGEgcHJvY2VzcyB3aXRoaW4gYSB3b3JrZmxvd1xuICogY29uZmlndXJhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIHByb2Nlc3MgaWQgdG8gcHJvY2Vzc1xuICogQHBhcmFtIHtvYmplY3R9IFtkYXRhXSAtIHRoZSBpbnB1dCBkYXRhIHRvIHByb2Nlc3NcbiAqXG4gKiBAZXhhbXBsZVxuICogV29ya2Zsb3cuaW5pdGlhbGlzZSgncHJvY2Vzc0lkJywgeyB2YWxpZERhdGU6ICdkYXRlJyB9KTtcbiAqXG4gKiBAcmV0dXJuIFwiXCJcbiAqXG4gKi9cbldvcmtmbG93LnByb3RvdHlwZS5pbml0aWFsaXNlID0gZnVuY3Rpb24gKHByb2Nlc3NJZCwgZGF0YSwgc3VicHJvZmlsZUlkKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIGNvbmZpZ1Byb2Nlc3MgPSBbXTtcbiAgICAgICAgICAgIC8vIENoZWNrIHRoZSBwYXNzZWQgaW4gcGFyYW1ldGVyc1xuICAgICAgICAgICAgaWYgKHByb2Nlc3NJZCAhPT0gJycgJiYgcHJvY2Vzc0lkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBHZXQgdGhlIGN1cnJlbnQgcHJvY2VzcyBjb25maWdcbiAgICAgICAgICAgICAgICBjb25maWdQcm9jZXNzID0gX3RoaXMuY29uZmlnLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKG9ialByb2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9ialByb2Nlc3MuX2lkID09IHByb2Nlc3NJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9ialByb2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChjb25maWdQcm9jZXNzWzBdLl9pZCA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZDb25maWdFcnJvcicsICdObyB2YWxpZCBwcm9jZXNzIGRlZmluaXRpb24gZm91bmQgd2l0aCBwcm9jZXNzIGlkOiAnICsgcHJvY2Vzc0lkKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uZmlnUHJvY2Vzcy5wdXNoKF90aGlzLmNvbmZpZy5wcm9jZXNzZXNbMF0pO1xuICAgICAgICAgICAgICAgIHByb2Nlc3NJZCA9IF90aGlzLmNvbmZpZy5wcm9jZXNzZXNbMF0uX2lkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBHZXQgdGhlIGN1cnJlbnQgbGlzdCBvZiBwcm9jZXNzIGluc3RhbmNlc1xuICAgICAgICAgICAgLy8gdmFyIHByb2Nlc3NTZXEgPSAxO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRQcm9jZXNzID0gW107XG4gICAgICAgICAgICBfdGhpcy5pbnN0YW5jZS5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChwcm9jZXNzSXRlbSkge1xuICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzSXRlbS5pZCA9PSBwcm9jZXNzSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFByb2Nlc3MucHVzaChwcm9jZXNzSXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBwcm9jZXNzU2VxID0gY3VycmVudFByb2Nlc3MubGVuZ3RoICsgMTtcbiAgICAgICAgICAgIC8vIHZhciBuZXh0U2VxID0gcHJvY2Vzc1NlcSArIDE7XG4gICAgICAgICAgICAvLyBQdXNoIHRoZSBwcm9jZXNzIG9iamVjdCBpbnRvIHRoZSBhcnJheVxuICAgICAgICAgICAgdmFyIHByb2Nlc3NNb2RlbCA9IHtcbiAgICAgICAgICAgICAgICBpZDogJycsXG4gICAgICAgICAgICAgICAgc2VxOiAnJyxcbiAgICAgICAgICAgICAgICBzdWJQcm9jZXNzZXM6IFtdXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIDEuIFVwZGF0ZSB0aGUgcHJvY2VzcyBpZCBhbmQgc2VxXG4gICAgICAgICAgICBwcm9jZXNzTW9kZWwuaWQgPSBwcm9jZXNzSWQ7XG4gICAgICAgICAgICBwcm9jZXNzTW9kZWwuc2VxID0gcHJvY2Vzc1NlcTtcbiAgICAgICAgICAgIF90aGlzLmluc3RhbmNlLnByb2Nlc3Nlcy5wdXNoKHByb2Nlc3NNb2RlbCk7XG4gICAgICAgICAgICAvLyBQYXJhbWV0ZXJzXG4gICAgICAgICAgICB2YXIgc3ViUHJvY2Vzc0lkID0gY29uZmlnUHJvY2Vzc1swXS5zdWJQcm9jZXNzZXNbMF0uX2lkO1xuICAgICAgICAgICAgdmFyIHN1YlByb2Nlc3NTZXEgPSAxO1xuICAgICAgICAgICAgX3RoaXMuaW5zdGFuY2UucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbiAocHJvY2Vzc0l0ZW0pIHtcbiAgICAgICAgICAgICAgICBpZiAocHJvY2Vzc0l0ZW0uaWQgPT0gcHJvY2Vzc0lkICYmIHByb2Nlc3NJdGVtLnNlcSA9PSBwcm9jZXNzU2VxKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NTZXEgPSBwcm9jZXNzSXRlbS5zdWJQcm9jZXNzZXMubGVuZ3RoICsgMVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC8vIENhbGwgdGhlIHN1YnByb2Nlc3MgbWV0aG9kXG5cbiAgICAgICAgICAgIFByb2Nlc3Muc3ViUHJvY2Vzcyhwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3VicHJvZmlsZUlkLCBkYXRhLCBfdGhpcykudGhlbihmdW5jdGlvbiAoc3ViUHJvY2Vzcykge1xuICAgICAgICAgICAgICAgIC8vIEdlbmVyYXRlIHRoZSB1dWlkXG5cbiAgICAgICAgICAgICAgICB2YXIgdXVpZCA9IHN1YlByb2Nlc3MuZGF0YS5faWQ7IC8vX3RoaXMucHJvZmlsZSArICc6JyArIF90aGlzLmFwcCArICc6JyArIHByb2Nlc3NJZCArICc6JyArIHByb2Nlc3NTZXEgKyAnOicgKyBzdWJQcm9jZXNzSWQgKyAnOicgKyBzdWJQcm9jZXNzU2VxO1xuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gQnVpbGQgdGhlIHN1Yi1wcm9jZXNzIHJlZmVyZW5jZSBvYmplY3RcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB2YXIgZ3JvdXBLZXkgPSBzdWJQcm9jZXNzLmRhdGEuZ3JvdXBLZXk7XG4gICAgICAgICAgICAgICAgLy9UT0RPOiBDaGFuZ2UgcmVxdWlyZWQgdG8gbW92ZSBpc0FjdGl2ZSB0byBzdWJQcm9jZXNzIGZpbGUuUmVtb3ZlIGZyb20gaGVyZVxuICAgICAgICAgICAgICAgIGlmKHN1YnByb2ZpbGVJZCA9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgICAgICBzdWJwcm9maWxlSWQgPSAnJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHN1YlByb2Nlc3NSZWYgPSB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBzdWJQcm9jZXNzSWQsXG4gICAgICAgICAgICAgICAgICAgIHN1YnByb2ZpbGVJZDogc3VicHJvZmlsZUlkLFxuICAgICAgICAgICAgICAgICAgICBzZXE6IHN1YlByb2Nlc3MuZGF0YVtcIm1ldGEtZGF0YVwiXS5zdWJQcm9jZXNzSW5zU2VxLFxuICAgICAgICAgICAgICAgICAgICB1dWlkOiB1dWlkLFxuICAgICAgICAgICAgICAgICAgICBncm91cEtleTogZ3JvdXBLZXlcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUgcmVmZXJlbmNlIHRvIHRoZSBwcm9jZXNzIG1vZGVsXG4gICAgICAgICAgICAgICAgcHJvY2Vzc01vZGVsLnN1YlByb2Nlc3Nlcy5wdXNoKHN1YlByb2Nlc3NSZWYpO1xuICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUgc3ViUHJvY2VzcyBtb2RlbCB0byB0aGUgc3VicHJvY2Vzc2VzIGFycmF5XG4gICAgICAgICAgICAgICAgLy9fdGhpcy5zdWJwcm9jZXNzZXMucHVzaChzdWJQcm9jZXNzLmRhdGEpO1xuICAgICAgICAgICAgICAgIC8vIF90aGlzLmluc3RhbmNlLnByb2Nlc3Nlcy5wdXNoKHByb2Nlc3NNb2RlbCk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IF90aGlzLmluc3RhbmNlLnByb2Nlc3Nlcy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByb2Nlc3NJdGVtID0gX3RoaXMuaW5zdGFuY2UucHJvY2Vzc2VzW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb2Nlc3NJdGVtLmlkID09IHByb2Nlc3NJZCAmJiBwcm9jZXNzSXRlbS5zZXEgPT0gcHJvY2Vzc1NlcSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBjdXJyZW50IHByb2Nlc3MgZnJvbSB0aGUgYXJyYXkgYW5kIGFkZCB0aGUgdXBkYXRlZCBwcm9jZXNzTW9kZWxcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmluc3RhbmNlLnByb2Nlc3Nlcy5zcGxpY2UoaW5kZXgsIDEsIHByb2Nlc3NNb2RlbClcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gUHJvY2VzcyB0aGUgaW5kaWNhdG9yIGRvY3VtZW50cyB3b3JrZmxvdyBwcm9jZXNzZXMgdXBkYXRlc1xuICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3JzID0gc3ViUHJvY2Vzcy5kYXRhLmluZGljYXRvcnM7XG4gICAgICAgICAgICAgICAgdmFyIHN0ZXAgPSBzdWJQcm9jZXNzLmRhdGEuc3RlcDtcbiAgICAgICAgICAgICAgICBQcm9jZXNzLmluZGljYXRvckRvY3MocHJvY2Vzc0lkLCBpbmRpY2F0b3JzLCBzdGVwLCBfdGhpcykudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdQcm9jZXNzOiAnICsgX3RoaXMuY29uZmlnLnByb2Nlc3Nlc1swXS5faWQgKyAnIGluaXRpYWxpemVkIHN1Y2Nlc3NmdWxseS4nLCBzdWJQcm9jZXNzUmVmKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuaW5zdGFuY2UucHJvY2Vzc2VzID0gX3RoaXMuaW5zdGFuY2UucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhKG9iai5pZCA9PSBwcm9jZXNzSWQgJiYgb2JqLnNlcSA9PSBwcm9jZXNzU2VxKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cblxuICAgIH0pO1xufTtcblxuLyoqXG4gKiBXb3JrZmxvdyB0cmFuc2l0aW9uIHRvIHRoZSBuZXh0IHN0ZXAuIFRoaXMgbW92ZXMgdGhlIHdvcmtmbG93IGZyb20gdGhlIGN1cnJlbnQgcHJvY2VzcyxcbiAqIHN1Yi1wcm9jZXNzIHN0ZXAgdG8gdGhlIG5leHQgb25lIGFzIHNwZWNpZmllZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gcHJvY2VzcyBpZFxuICogQHBhcmFtIHtudW1iZXJ9IHByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2UgcHJvY2VzcyBzZXFcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdWJQcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdWItcHJvY2VzcyBpZFxuICogQHBhcmFtIHtudW1iZXJ9IHN1YlByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2Ugc3ViLXByb2Nlc3Mgc2VxXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RlcElkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3RlcCBpZCBcbiAqIEBwYXJhbSB7c3RyaW5nfSB0cmFuc2l0aW9uSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiB0cmFuc2l0aW9uIGlkXG4gKiBAcGFyYW0ge29iamVjdH0gZGF0YSAtIGFueSBhZGRpdGlvbmFsIGRhdGEgcGFzc2VkIGluIGFzIGtleSB2YWx1ZSBwYWlyc1xuICpcbiAqIEBleGFtcGxlXG4gKiBXb3JrZmxvdy50cmFuc2l0aW9uKCdwcm9jZXNzSWQnLCAxLCAnc3ViUHJvY2Vzc0lkJywgMSwgJ3N0ZXBJZCcsICd0cmFuc2l0aW9uSWQnLCB7IGtleTogJycsIHZhbHVlOiAnJyB9KTtcbiAqXG4gKiBAcmV0dXJuIFwiXCJcbiAqXG4gKi9cbldvcmtmbG93LnByb3RvdHlwZS50cmFuc2l0aW9uID0gZnVuY3Rpb24gKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdGVwSWQsIHRyYW5zaXRpb25JZCwgZGF0YSwgc3B1dWlkKSB7XG4gICAgLy8gUmUtYXNzaWduIHRoaXNcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgbW9kZWwgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXS9zdGVwXCIsIGFwcC5TQ09QRS53b3JrZmxvdywge30pWzBdO1xuICAgICAgICAgICAgdmFyIHN0ZXBPYmplY3QgPSBKU09OLnhwYXRoKFwiL3Byb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgcHJvY2Vzc0lkICsgXCInXS9zdWJQcm9jZXNzZXNbX2lkIGVxICdcIiArIHN1YlByb2Nlc3NJZCArIFwiJ10vc3RlcHNbX2lkIGVxICdcIiArIHN0ZXBJZCArIFwiJ11cIiwgX3RoaXMuY29uZmlnLCB7fSlbMF07XG4gICAgICAgICAgICB2YXIgc3ViUHJvY2Vzc1NlcSA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL21ldGEtZGF0YS9zdWJQcm9jZXNzSW5zU2VxXCIsIGFwcC5TQ09QRS53b3JrZmxvdywge30pWzBdO1xuXG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGN1cnJlbnQgc3ViLXByb2Nlc3Mgc3RlcCBkYXRhXG4gICAgICAgICAgICB2YXIgdXBkYXRlID0gZnVuY3Rpb24gKHR5cGUsIHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIF90aGlzLmluc3RhbmNlLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKHByb2Nlc3NJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzSXRlbS5pZCA9PSBwcm9jZXNzSWQgJiYgcHJvY2Vzc0l0ZW0uc2VxID09IHByb2Nlc3NTZXEpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0l0ZW0uc3ViUHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbiAoc3ViUHJvY2Vzc0l0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3ViUHJvY2Vzc0l0ZW0uaWQgPT0gc3ViUHJvY2Vzc0lkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuc3VicHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbiAoc3ViUHJvY2Vzc09iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1YlByb2Nlc3NPYmouX2lkID09IHNwdXVpZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT0gJ3N0ZXAnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc09iai5zdGVwID0gcmVzdWx0LmRhdGEuc3RlcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MocmVzdWx0Lm1lc3NhZ2UsIHN1YlByb2Nlc3NPYmopO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09ICdzdGVwQ29tcGxldGUnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc09iai5zdGVwID0gcmVzdWx0LmRhdGEuc3RlcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc09iai5jb21wbGV0ZSA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MocmVzdWx0Lm1lc3NhZ2UsIHN1YlByb2Nlc3NPYmouc3RlcCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBpZiAoc3RlcE9iamVjdC5mdW5jdGlvbi50YXNrICE9IHVuZGVmaW5lZCAmJiBzdGVwT2JqZWN0LmZ1bmN0aW9uLnRhc2sucG9zdEFjdGlvbnMgIT0gdW5kZWZpbmVkKSB7XG5cblxuICAgICAgICAgICAgICAgIHZhciBwb3N0QWN0aW9ucyA9IHN0ZXBPYmplY3QuZnVuY3Rpb24udGFzay5wb3N0QWN0aW9ucztcbiAgICAgICAgICAgICAgICBQcm9jZXNzLnBvc3RBY3Rpb25zKHBvc3RBY3Rpb25zLCBfdGhpcywgc3B1dWlkKS50aGVuKGZ1bmN0aW9uIChzdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgUHJvY2Vzcy50cmFuc2l0aW9uKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdGVwSWQsIHRyYW5zaXRpb25JZCwgZGF0YSwgX3RoaXMsIHNwdXVpZCwgbW9kZWwpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRhdGEuc3ViUHJvY2Vzc0NvbXBsZXRlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGUoJ3N0ZXBDb21wbGV0ZScsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlKCdzdGVwJywgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcblxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcblxuICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cblxuICAgICAgICAgICAgICAgIFByb2Nlc3MudHJhbnNpdGlvbihwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3RlcElkLCB0cmFuc2l0aW9uSWQsIGRhdGEsIF90aGlzLCBzcHV1aWQsIG1vZGVsKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRhdGEuc3ViUHJvY2Vzc0NvbXBsZXRlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZSgnc3RlcENvbXBsZXRlJywgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlKCdzdGVwJywgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG5cbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG5cbiAgICB9KTtcbn07XG5cbi8qKlxuICogV29ya2Zsb3cgYXNzaWduIHVzZXIuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHByb2Nlc3MgaWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBwcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHByb2Nlc3Mgc2VxXG4gKiBAcGFyYW0ge3N0cmluZ30gc3ViUHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3ViLXByb2Nlc3MgaWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdWJQcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHN1Yi1wcm9jZXNzIHNlcVxuICogQHBhcmFtIHtzdHJpbmd9IHN0ZXBJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN0ZXAgaWRcbiAqIEBwYXJhbSB7b2JqZWN0fSB1c2VyIC0gdGhlIHVzZXIgaWQgYW5kIG5hbWUgZGF0YVxuICpcbiAqIEBleGFtcGxlIFwiXCJcbiAqXG4gKiBAcmV0dXJuIFwiXCJcbiAqXG4gKi9cbldvcmtmbG93LnByb3RvdHlwZS5hc3NpZ25Vc2VyID0gZnVuY3Rpb24gKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCB1c2VyLCB1dWlkKSB7XG4gICAgLy8gUmUtYXNzaWduIHRoZSBXb3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZSBhcyBfdGhpc1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIFByb2Nlc3MuYXNzaWduVXNlcihwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgdXNlciwgdXVpZCwgX3RoaXMpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cblxuICAgIH0pXG59O1xuXG4vKipcbiAqIFdvcmtmbG93IHRhc2ssIHRoaXMgbWV0aG9kIGV4ZWN1dGVzIGEgc3BlY2lmaWMgdGFzay5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIHByb2Nlc3MgaWQgdG8gcHJvY2Vzc1xuICogQHBhcmFtIHtvYmplY3R9IGlucHV0RGF0YSAtIHRoZSBpbnB1dCBkYXRhIHRvIHByb2Nlc3NcbiAqXG4gKiBAZXhhbXBsZVxuICogV29ya2Zsb3cuaW5pdGlhbGl6ZSgncHJvY2Vzc0lkJywgeyB2YWxpZERhdGU6ICdkYXRlJyB9KTtcbiAqXG4gKiBAcmV0dXJuIFwiXCJcbiAqXG4gKi9cbldvcmtmbG93LnByb3RvdHlwZS51aSA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBSZS1hc3NpZ24gdGhlIFdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlIGFzIF90aGlzXG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRQcm9jZXNzOiBmdW5jdGlvbiAocHJvY2Vzc0lkLCBsYW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJbnRlcmZhY2UuZ2V0UHJvY2Vzcyhwcm9jZXNzSWQsIGxhbmcsIF90aGlzKS50aGVuKGZ1bmN0aW9uIChtb2RlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShtb2RlbCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgIH1cblxufTtcblxuLyoqXG4gKiBXb3JrZmxvdyB0YXNrLCB0aGlzIG1ldGhvZCBleGVjdXRlcyBhIHNwZWNpZmljIHRhc2suXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGRhdGEgLSB0aGUgcHJvY2VzcyBpZCB0byBwcm9jZXNzXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgaW5wdXQgZGF0YSB0byBwcm9jZXNzXG4gKiAqIEBwYXJhbSB7c3RyaW5nfSB1dWlkIC0gdGhlIGlucHV0IGRhdGEgdG8gcHJvY2Vzc1xuICpcbiAqIEBleGFtcGxlXG4gKiBXb3JrZmxvdy5nZXROb2RlVmFsdWUoZGF0YSwgX1dGSW5zdGFuY2UsIHV1aWQpO1xuICpcbiAqIEByZXR1cm4gXCJcIlxuICpcbiAqL1xuXG5Xb3JrZmxvdy5wcm90b3R5cGUuZ2V0Tm9kZVZhbHVlID0gZnVuY3Rpb24gKGRhdGEsIHV1aWQpIHtcbiAgICAvLyBSZS1hc3NpZ24gdGhlIFdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlIGFzIF90aGlzXG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaGVscGVyLmdldE5vZGVWYWx1ZShkYXRhLCBfdGhpcywgdXVpZCkudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMpO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cblxuICAgIH0pXG59O1xuXG4vKipcbiAqIFdvcmtmbG93IHRhc2ssIHRoaXMgbWV0aG9kIGV4ZWN1dGVzIGEgc3BlY2lmaWMgdGFzay5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gZGF0YSAtIHRoZSBwcm9jZXNzIGlkIHRvIHByb2Nlc3NcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBpbnB1dCBkYXRhIHRvIHByb2Nlc3NcbiAqXG4gKiBAZXhhbXBsZVxuICogV29ya2Zsb3cudGFrZUFzc2lnbm1lbnQoc3B1dWlkLCBfV0ZJbnN0YW5jZSk7XG4gKlxuICogQHJldHVybiBcIlwiXG4gKlxuICovXG5cbldvcmtmbG93LnByb3RvdHlwZS50YWtlQXNzaWdubWVudCA9IGZ1bmN0aW9uIChzcHV1aWQpIHtcbiAgICAvLyBSZS1hc3NpZ24gdGhlIFdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlIGFzIF90aGlzXG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgLy9Bc3NpZ25tZW50IGFyZSBleGVjdXRpbmcgaGVyZVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgc3BPYmplY3QgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXVwiLCBfdGhpcywge30pWzBdO1xuICAgICAgICAgICAgdmFyIGFzc2lnbmVlID0gSlNPTi54cGF0aChcIi9zdGVwL2Fzc2lnbmVkVG9cIiwgc3BPYmplY3QsIHt9KVswXTtcbiAgICAgICAgICAgIC8vUHVzaGluZyBvbGRlciByZWNvcmQgaW4gcmVBc3NpZ24gYXJyYXlcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoc3BPYmplY3Quc3RlcC5hc3NpZ25tZW50SGlzdG9yeSA9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgIHNwT2JqZWN0LnN0ZXAuYXNzaWdubWVudEhpc3RvcnkgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGFzc2lnbmVlLnVzZXJJZCAhPSBcIlwiICYmIGFzc2lnbmVlLm5hbWUgIT0gXCJcIil7XG4gICAgICAgICAgICAgICAgc3BPYmplY3Quc3RlcC5hc3NpZ25tZW50SGlzdG9yeS5wdXNoKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYXNzaWduZWUpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgXG4gICAgICAgICAgICBhc3NpZ25lZS5uYW1lID0gTE9DQUxfU0VUVElOR1MuU0VTU0lPTi5maXJzdE5hbWUgKyBcIiBcIisgTE9DQUxfU0VUVElOR1MuU0VTU0lPTi5sYXN0TmFtZTtcbiAgICAgICAgICAgIGFzc2lnbmVlLnVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkICsgXCJcIjtcbiAgICAgICAgICAgIGFzc2lnbmVlLmRhdGVUaW1lID0gbW9tZW50KCkuZm9ybWF0KCk7XG4gICAgICAgICAgICBhc3NpZ25lZS50eXBlID0gQVNTSUdOTUVOVF9UWVBFX0FDQ0VQVEFOQ0U7XG4gICAgICAgICAgICBhc3NpZ25lZS5kdWVEYXRlVGltZSA9ICcnO1xuICAgICAgICAgICAgYXNzaWduZWUuYnkgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZCArIFwiXCI7XG4gICAgICAgICAgIFxuXG4gICAgICAgICAgICAvL2ZldGNoIHByZVdvcmtBY3Rpb25zIGhlcmUgXG5cbiAgICAgICAgICAgIHZhciBwcm9jZXNzSWQgPSBKU09OLnhwYXRoKFwiL2luc3RhbmNlL3Byb2Nlc3Nlc1tzdWJQcm9jZXNzZXMvdXVpZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL2lkXCIsIF90aGlzLCB7fSlbMF07XG4gICAgICAgICAgICB2YXIgc3ViUHJvY2Vzc0lkID0gSlNPTi54cGF0aChcIi9pbnN0YW5jZS9wcm9jZXNzZXMvc3ViUHJvY2Vzc2VzW3V1aWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXS9pZFwiLCBfdGhpcywge30pWzBdO1xuICAgICAgICAgICAgdmFyIHN0ZXBJZCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL3N0ZXAvaWRcIiwgX3RoaXMsIHt9KVswXTtcbiAgICAgICAgICAgIHZhciBzdGVwT2JqZWN0ID0gSlNPTi54cGF0aChcIi9wcm9jZXNzZXNbX2lkIGVxICdcIiArIHByb2Nlc3NJZCArIFwiJ10vc3ViUHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzdWJQcm9jZXNzSWQgKyBcIiddL3N0ZXBzW19pZCBlcSAnXCIgKyBzdGVwSWQgKyBcIiddXCIsIF90aGlzLmNvbmZpZywge30pWzBdO1xuXG4gICAgICAgICAgICBpZiAoc3RlcE9iamVjdC5mdW5jdGlvbi50YXNrLnByZVdvcmtBY3Rpb25zICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHByZVdvcmtBY3Rpb25zID0gc3RlcE9iamVjdC5mdW5jdGlvbi50YXNrLnByZVdvcmtBY3Rpb25zO1xuICAgICAgICAgICAgICAgIFByb2Nlc3MucHJlV29ya0FjdGlvbnMocHJlV29ya0FjdGlvbnMsIF90aGlzKS50aGVuKGZ1bmN0aW9uIChzdWNjZXNzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShfdGhpcyk7XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHJlc29sdmUoX3RoaXMpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG5cbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuXG4gICAgICAgIH1cblxuICAgIH0pO1xufTtcblxuXG4vKipcbiAqIFdvcmtmbG93IHRhc2ssIHRoaXMgbWV0aG9kIGV4ZWN1dGVzIGEgc3BlY2lmaWMgdGFzay5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gZGF0YSAtIHRoZSBwcm9jZXNzIGlkIHRvIHByb2Nlc3NcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBpbnB1dCBkYXRhIHRvIHByb2Nlc3NcbiAqXG4gKiBAZXhhbXBsZVxuICogV29ya2Zsb3cuY29uZGl0aW9uKGNvbmRpdGlvbiwgc3B1dWlkKTtcbiAqXG4gKiBAcmV0dXJuIFwiXCJcbiAqXG4gKi9cblxuV29ya2Zsb3cucHJvdG90eXBlLmNvbmRpdGlvbiA9IGZ1bmN0aW9uIChjb25kaXRpb24sIHNwdXVpZCkge1xuICAgIFxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgb3BlcmF0b3IgPSBjb25kaXRpb24ub3BlcmF0b3I7XG4gICAgICAgICAgICB2YXIgZGF0YUJsb2NrID0gY29uZGl0aW9uLmRhdGE7XG5cbiAgICAgICAgICAgIGlmKGNvbmRpdGlvbi5pbmRpY2F0b3IgIT0gdW5kZWZpbmVkKXtcblxuICAgICAgICAgICAgICAgIHZhciBzZXRJZCA9IGNvbmRpdGlvbi5pbmRpY2F0b3Iuc2V0SWQ7XG4gICAgICAgICAgICAgICAgdmFyIG1vZGVsU2NvcGUgPSBjb25kaXRpb24uaW5kaWNhdG9yLm1vZGVsU2NvcGU7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRQYXRoID0gY29uZGl0aW9uLmluZGljYXRvci5lbGVtZW50UGF0aDtcbiAgICAgICAgICAgICAgICBpZihjb25kaXRpb24uaW5kaWNhdG9yLmNvbnRleHQgPT0gJ3N1YlByb2Nlc3MnKXtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yVVVJRCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIrIHNwdXVpZCArXCInXS9pbmRpY2F0b3JzW2lkIGVxICdcIisgc2V0SWQgK1wiJ10vaW5zdGFuY2VzWzFdL3V1aWRcIiwgX3RoaXMgLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3JNb2RlbCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tfaWQgZXEgJ1wiKyBpbmRpY2F0b3JVVUlEICtcIiddXCIsIF90aGlzICwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YUVsZW1lbnQgPSBpbmRpY2F0b3JNb2RlbC5tb2RlbFttb2RlbFNjb3BlXS5kYXRhW3NldElkXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gZXZhbChcImRhdGFFbGVtZW50LlwiKyBlbGVtZW50UGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBoZWxwZXIuZ2V0Tm9kZVZhbHVlKGRhdGFCbG9jaywgX3RoaXMsIHNwdXVpZCkudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gaGVscGVyLmNvbXBhcmUodmFsdWUsIG9wZXJhdG9yICwgcmVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cblxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCdOb3QgaW1wbGVtZW50ZWQnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgfSBlbHNlIGlmKGNvbmRpdGlvbi5pbmRpY2F0b3JXcmFwcGVyICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgcmVqZWN0KCdOb3QgaW1wbGVtZW50ZWQnKVxuICAgICAgICAgICAgfVxuXG5cblxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcblxuICAgICAgICAgICAgcmVqZWN0KGVycik7XG5cbiAgICAgICAgfVxuXG4gICAgfSk7XG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0gV29ya2Zsb3c7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWxpdHknKTtcbnZhciBub2RlVmFsdWUgPSByZXF1aXJlKCcuL25vZGVWYWx1ZScpO1xudmFyIGZvcm0gPSByZXF1aXJlKCcuL2Zvcm0nKTtcbnZhciBoZWxwZXIgPSByZXF1aXJlKCcuL2hlbHBlcicpO1xuXG52YXIgZ2F0ZWtlZXBlciA9IG5ldyBHSygpO1xuXG4vKipcbiAqIEFjdGlvbnMgTW9kdWxlXG4gKlxuICogQG1vZHVsZSBsaWIvYWN0aW9uc1xuICogQGF1dGhvciBIYXNhbiBBYmJhc1xuICogQHZlcnNpb24gMi4wLjBcbiAqIEBkZXNjcmlwdGlvbiB0ZXN0IGRlc2NyaXB0aW9uXG4gKiBAY29weXJpZ2h0IEt3YW50dSBMdGQgUlNBIDIwMDktMjAxNS5cbiAqXG4gKi9cblxuLyoqXG4gKiAgRm9ybSBNb2R1bGUgYWN0aW9ucyBuZWVkcyB0byBiZSBtb3ZlZCBoZXJlLlxuICogIFRoaXMgYWN0aW9ucyBtb2R1bGUgd2lsbCBiZSBjZW50YWwgcGxhY2UgdG8gaG9sZCBhbGwgZnVuY3Rpb25zLlxuICogIFxuICovXG5cbnZhciBjb21tdW5pdHkgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICBjcmVhdGVDb21tdW5pdHk6IGZ1bmN0aW9uIChfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IHdvcmtlci5nZXRXb3JrZXJXcmFwcGVyKCk7XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbW9tZW50KCkuZm9ybWF0KCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5wcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zdWJQcm9jZXNzVVVJRCA9IHV1aWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNoYW5uZWxzLnB1c2goXCJkYXRhUmVnaXN0cnlcIik7XG5cbiAgICAgICAgICAgICAgICB2YXIgdXVpZENvbW11bml0eSA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdDb21tdW5pdHknXS9faWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZUNvbW11bml0eVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcIm5ld0NvbW11bml0eUlkXCI6IF9XRkluc3RhbmNlLnByb2ZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImluZGljYXRvclVVSURcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQ29tbXVuaXR5XCI6IHV1aWRDb21tdW5pdHlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24gKHdvcmtlclN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgd29ya2VyLnNldFdvcmtlckluZm9JblN1YnByb2Nlc3Mod29ya2VyT2JqZWN0LCBfV0ZJbnN0YW5jZSwgdXVpZCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdXb3JrZXIgcHJvY2Vzc2VkIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICh3b3JrZXJGYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh3b3JrZXJGYWlsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICB1c2VySm9pbkNvbW11bml0eTogZnVuY3Rpb24gKF9kZWYsIHV1aWQsIF9XRkluc3RhbmNlKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sXG4gICAgICAgIHJlbGVhc2VBZG9wdGVkQXBwbGljYXRpb246IGZ1bmN0aW9uIChfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IHdvcmtlci5nZXRXb3JrZXJXcmFwcGVyKCk7XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbW9tZW50KCkuZm9ybWF0KCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5wcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zdWJQcm9jZXNzVVVJRCA9IHV1aWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNoYW5uZWxzLnB1c2goXCJkYXRhUmVnaXN0cnlcIik7XG4gICAgICAgICAgICAgICAgdmFyIHV1aWRSZWxlYXNlQWRvcHRlZEFwcGxpY2F0aW9uID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ2Fkb3B0ZWRBcHBsaWNhdGlvbiddL2luc3RhbmNlc1sxXS91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG5cbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICBcInJlbGVhc2VBZG9wdGVkQXBwbGljYXRpb25cIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21tdW5pdHlJZFwiOiBfV0ZJbnN0YW5jZS5wcm9maWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbmRpY2F0b3JVVUlEXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFkb3B0ZWRBcHBsaWNhdGlvblwiOiB1dWlkUmVsZWFzZUFkb3B0ZWRBcHBsaWNhdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbiAod29ya2VyU3VjY2Vzcykge1xuXG4gICAgICAgICAgICAgICAgICAgIHdvcmtlci5zZXRXb3JrZXJJbmZvSW5TdWJwcm9jZXNzKHdvcmtlck9iamVjdCwgX1dGSW5zdGFuY2UsIHV1aWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdXb3JrZXIgcHJvY2Vzc2VzIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICh3b3JrZXJGYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh3b3JrZXJGYWlsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn0pKCk7XG5cbnZhciBhcHBsaWNhdGlvbiA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIGNyZWF0ZUFwcERlZmluaXRpb246IGZ1bmN0aW9uIChfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IHdvcmtlci5nZXRXb3JrZXJXcmFwcGVyKCk7XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbW9tZW50KCkuZm9ybWF0KCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5wcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zdWJQcm9jZXNzVVVJRCA9IHV1aWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNoYW5uZWxzLnB1c2goXCJkYXRhUmVnaXN0cnlcIik7XG4gICAgICAgICAgICAgICAgdmFyIHV1aWRBcHBsaWNhdGlvbiA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdBcHBsaWNhdGlvbiddL19pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIFwiY3JlYXRlQXBwbGljYXRpb25cIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJuZXdBcHBsaWNhdGlvbklkXCI6IF9XRkluc3RhbmNlLnByb2ZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImluZGljYXRvclVVSURcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQXBwbGljYXRpb25cIjogdXVpZEFwcGxpY2F0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hY3Rpb24gPSBhY3Rpb247XG4gICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uICh3b3JrZXJTdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB3b3JrZXIuc2V0V29ya2VySW5mb0luU3VicHJvY2Vzcyh3b3JrZXJPYmplY3QsIF9XRkluc3RhbmNlLCB1dWlkKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya2VyIHByb2Nlc3NlcyBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAod29ya2VyRmFpbCkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIGJ1aWxkQXBwbGljYXRpb246IGZ1bmN0aW9uIChfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IHdvcmtlci5nZXRXb3JrZXJXcmFwcGVyKCk7XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbW9tZW50KCkuZm9ybWF0KCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5wcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zdWJQcm9jZXNzVVVJRCA9IHV1aWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNoYW5uZWxzLnB1c2goXCJkYXRhUmVnaXN0cnlcIik7XG4gICAgICAgICAgICAgICAgdmFyIHV1aWRQdWJsaXNoQXBwbGljYXRpb24gPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnUHVibGlzaEFwcGxpY2F0aW9uJ10vaW5zdGFuY2VzWzFdL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcblxuICAgICAgICAgICAgICAgIHZhciB1dWlkQXBwbGljYXRpb25EZWZpbml0aW9uID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ0FwcGxpY2F0aW9uRGVmaW5pdGlvbiddL19pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgIHZhciB1dWlkUm9sZXMgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnUm9sZXMnXS9faWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICB2YXIgdXVpZEFwcGxpY2F0aW9uID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ0FwcGxpY2F0aW9uJ10vX2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgdmFyIHV1aWRBcHBQZXJtaXNzaW9ucyA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdBcHBQZXJtaXNzaW9ucyddL19pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJidWlsZEFwcGxpY2F0aW9uXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYXBwbGljYXRpb25JZFwiOiBfV0ZJbnN0YW5jZS5wcm9maWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbmRpY2F0b3JVVUlEXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlB1Ymxpc2hBcHBsaWNhdGlvblwiOiB1dWlkUHVibGlzaEFwcGxpY2F0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQXBwbGljYXRpb25EZWZpbml0aW9uXCI6IHV1aWRBcHBsaWNhdGlvbkRlZmluaXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSb2xlc1wiOiB1dWlkUm9sZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBcHBsaWNhdGlvblwiOiB1dWlkQXBwbGljYXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBcHBQZXJtaXNzaW9uc1wiOiB1dWlkQXBwUGVybWlzc2lvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24gKHdvcmtlclN1Y2Nlc3MpIHtcblxuICAgICAgICAgICAgICAgICAgICB3b3JrZXIuc2V0V29ya2VySW5mb0luU3VicHJvY2Vzcyh3b3JrZXJPYmplY3QsIF9XRkluc3RhbmNlLCB1dWlkKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya2VyIHByb2Nlc3NlcyBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAod29ya2VyRmFpbCkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIGFwcGxpY2F0aW9uQWRvcHRpb246IGZ1bmN0aW9uIChfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IHdvcmtlci5nZXRXb3JrZXJXcmFwcGVyKCk7XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbW9tZW50KCkuZm9ybWF0KCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5wcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zdWJQcm9jZXNzVVVJRCA9IHV1aWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNoYW5uZWxzLnB1c2goXCJkYXRhUmVnaXN0cnlcIik7XG4gICAgICAgICAgICAgICAgdmFyIHV1aWRBZG9wdGlvbiA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pbmRpY2F0b3JzW2lkIGVxICdBZG9wdGlvbiddL2luc3RhbmNlc1sxXS91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG5cbiAgICAgICAgICAgICAgICB2YXIgdXVpZFB1Ymxpc2hBcHBsaWNhdGlvbiA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdQdWJsaXNoQXBwbGljYXRpb24nXS9faWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICB2YXIgdXVpZEFwcGxpY2F0aW9uID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ0FwcGxpY2F0aW9uJ10vX2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG5cbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICBcImFkb3B0QXBwbGljYXRpb25cIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHBsaWNhdGlvbklkXCI6IF9XRkluc3RhbmNlLnByb2ZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImluZGljYXRvclVVSURcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQWRvcHRpb25cIjogdXVpZEFkb3B0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUHVibGlzaEFwcGxpY2F0aW9uXCI6IHV1aWRQdWJsaXNoQXBwbGljYXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBcHBsaWNhdGlvblwiOiB1dWlkQXBwbGljYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24gKHdvcmtlclN1Y2Nlc3MpIHtcblxuICAgICAgICAgICAgICAgICAgICB3b3JrZXIuc2V0V29ya2VySW5mb0luU3VicHJvY2Vzcyh3b3JrZXJPYmplY3QsIF9XRkluc3RhbmNlLCB1dWlkKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya2VyIHByb2Nlc3NlcyBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAod29ya2VyRmFpbCkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZVRheG9ub215OiBmdW5jdGlvbiAoX2RlZiwgdXVpZCwgX1dGSW5zdGFuY2UpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG1vbWVudCgpLmZvcm1hdCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZW5kZXJVc2VySWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QucHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc3ViUHJvY2Vzc1VVSUQgPSB1dWlkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jaGFubmVscy5wdXNoKFwiZGF0YVJlZ2lzdHJ5XCIpO1xuICAgICAgICAgICAgICAgIHZhciB0YXhvbm9teVVVSUQgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnVGF4b25vbXknXS9pbnN0YW5jZXNbMV0vdXVpZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVUYXhvbm9teVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInRheG9ub215VVVJRFwiOiB0YXhvbm9teVVVSURcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hY3Rpb24gPSBhY3Rpb247XG4gICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uICh3b3JrZXJTdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB3b3JrZXIuc2V0V29ya2VySW5mb0luU3VicHJvY2Vzcyh3b3JrZXJPYmplY3QsIF9XRkluc3RhbmNlLCB1dWlkKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya2VyIHByb2Nlc3NlcyBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAod29ya2VyRmFpbCkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbn0pKCk7XG5cblxuXG52YXIgcGVyZm9ybWFuY2UgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICBcbiAgICAgICAgdW5sb2NrUGVyaW9kOiBmdW5jdGlvbiAoX2RlZiwgdXVpZCwgX1dGSW5zdGFuY2UpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgICAgIHZhciBzdWJwcm9jZXNzT2JqZWN0ID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG5cbiAgICAgICAgICAgICAgICAvLyBtZXNzYWdlIGZyb20gc3RlcCA6IFRPRE8gXG5cbiAgICAgICAgICAgICAgICB2YXIgZW50cnlVVUlEID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2lkIGVxICdcIiArIFBFUklPRF9TRVRfSUQgKyBcIiddL2luc3RhbmNlcy91dWlkXCIsIHN1YnByb2Nlc3NPYmplY3QsIHt9KVswXTtcbiAgICAgICAgICAgICAgICB2YXIgZW5kZGF0ZSA9IHN1YnByb2Nlc3NPYmplY3QuZGF0ZXMudmFsaWQ7XG5cbiAgICAgICAgICAgICAgICBsaWJyYXJ5LnVubG9ja1BlcmlvZChlbnRyeVVVSUQsIGVuZGRhdGUsIHV1aWQpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnVW5sb2NrIHBlcmlvZC4nLCBkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuXG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuXG5cblxuXG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldE1vZGVsU3RhdHVzOiBmdW5jdGlvbiAoX2RlZiwgdXVpZCwgX1dGSW5zdGFuY2UpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuXG4gICAgICAgICAgICAgICAgdmFyIHN1YnByb2Nlc3NPYmplY3QgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICB2YXIgZW50cnlVVUlEID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2lkIGVxICdcIiArIFBFUklPRF9TRVRfSUQgKyBcIiddL2luc3RhbmNlcy91dWlkXCIsIHN1YnByb2Nlc3NPYmplY3QsIHt9KVswXTtcbiAgICAgICAgICAgICAgICB2YXIgZW5kZGF0ZSA9IHN1YnByb2Nlc3NPYmplY3QuZGF0ZXMudmFsaWQ7XG5cbiAgICAgICAgICAgICAgICB2YXIgc3RhdHVzaTE4bkxhYmVsID0gSlNPTi54cGF0aChcIi9sYWJlbFwiLCBfZGVmICwge30pWzBdO1xuICAgICAgICAgICAgICAgIHZhciBzdGF0dXMgPSBoZWxwZXIuZ2V0TGFuZ3VhZ2VNZXNzYWdlKHN0YXR1c2kxOG5MYWJlbCk7XG5cblxuICAgICAgICAgICAgICAgIGxpYnJhcnkuc2V0UGVyaW9kU3RhdHVzKGVudHJ5VVVJRCwgZW5kZGF0ZSwgc3RhdHVzLCB1dWlkKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ3NldE1vZGVsU3RhdHVzJywgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG5cblxuXG5cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICBcbiAgICAgICAgbG9ja1BlcmZvcm1hbmNlTW9kZWw6IGZ1bmN0aW9uIChfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHN1YnByb2Nlc3NPYmplY3QgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcblxuICAgICAgICAgICAgICAgIHZhciBlbnRyeVVVSUQgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbaWQgZXEgJ1wiICsgUEVSRk9STUFOQ0VfU0VUX0lEICsgXCInXS9pbnN0YW5jZXMvdXVpZFwiLCBzdWJwcm9jZXNzT2JqZWN0LCB7fSlbMF07XG4gICAgICAgICAgICAgICAgdmFyIGVuZGRhdGUgPSBzdWJwcm9jZXNzT2JqZWN0LmRhdGVzLnZhbGlkO1xuXG4gICAgICAgICAgICAgICAgbGlicmFyeS5sb2NrUGVyZm9ybWFuY2VNb2RlbChlbnRyeVVVSUQsIGVuZGRhdGUsIHV1aWQpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnTG9jayBwZXJmb3JtYW5jZSBtb2RlbC4nLCBkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG5cblxuXG5cblxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59KSgpO1xuXG52YXIgc2RvID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgY3JlYXRlOiBmdW5jdGlvbiAoX2RlZiwgdXVpZCwgX1dGSW5zdGFuY2UpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG1vbWVudCgpLmZvcm1hdCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZW5kZXJVc2VySWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QucHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc3ViUHJvY2Vzc1VVSUQgPSB1dWlkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jaGFubmVscy5wdXNoKFwiZGF0YVJlZ2lzdHJ5XCIpO1xuICAgICAgICAgICAgICAgIHZhciBzZG9VVUlEID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ1NETyddL2luc3RhbmNlc1sxXS91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG5cbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZVNET1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInNkb1VVSURcIjogc2RvVVVJRFxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24gKHdvcmtlclN1Y2Nlc3MpIHtcblxuICAgICAgICAgICAgICAgICAgICB3b3JrZXIuc2V0V29ya2VySW5mb0luU3VicHJvY2Vzcyh3b3JrZXJPYmplY3QsIF9XRkluc3RhbmNlLCB1dWlkKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya2VyIHByb2Nlc3NlcyBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAod29ya2VyRmFpbCkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbn0pKCk7XG5cbnZhciB0YXhvbm9teSA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIGNyZWF0ZTogZnVuY3Rpb24gKF9kZWYsIHV1aWQsIF9XRkluc3RhbmNlKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5faWQgPSBnZW5lcmF0ZVVVSUQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY29tbXVuaXR5SWQgPSBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYXBwbGljYXRpb25JZCA9IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jcmVhdGVkRGF0ZVRpbWUgPSBtb21lbnQoKS5mb3JtYXQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2VuZGVyVXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnByb2ZpbGVJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnN1YlByb2Nlc3NVVUlEID0gdXVpZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY2hhbm5lbHMucHVzaChcImRhdGFSZWdpc3RyeVwiKTtcbiAgICAgICAgICAgICAgICB2YXIgdGF4b25vbXlVVUlEID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ1RheG9ub215J10vaW5zdGFuY2VzWzFdL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcblxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIFwiY3JlYXRlVGF4b25vbXlcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YXhvbm9teVVVSURcIjogdGF4b25vbXlVVUlEXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbiAod29ya2VyU3VjY2Vzcykge1xuXG4gICAgICAgICAgICAgICAgICAgIHdvcmtlci5zZXRXb3JrZXJJbmZvSW5TdWJwcm9jZXNzKHdvcmtlck9iamVjdCwgX1dGSW5zdGFuY2UsIHV1aWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdXb3JrZXIgcHJvY2Vzc2VzIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICh3b3JrZXJGYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh3b3JrZXJGYWlsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxufSkoKTtcblxudmFyIHN1YlByb2Nlc3NJbnN0YW5jZSA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIHNldFRpdGxlOiBmdW5jdGlvbiAoX2RlZiwgdXVpZCwgZGF0YVZhbHVlLCBfV0ZJbnN0YW5jZSkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHNwUHJvY2Vzc09iamVjdCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBhcHAuU0NPUEUud29ya2Zsb3csIHt9KVswXTtcbiAgICAgICAgICAgICAgICBzcFByb2Nlc3NPYmplY3QubGFiZWwgPSBkYXRhVmFsdWU7XG5cbiAgICAgICAgICAgICAgICB2YXIgaXRlbXNUb1Byb2Nlc3MgPSAxO1xuICAgICAgICAgICAgICAgIHZhciBzdHVmZiA9IFtdO1xuICAgICAgICAgICAgICAgIHZhciBvYmogPSB7fTtcblxuICAgICAgICAgICAgICAgIG9iai5tb2RlbCA9IF9XRkluc3RhbmNlLnN1YnByb2Nlc3NlcztcbiAgICAgICAgICAgICAgICBzdHVmZi5wdXNoKG9iaik7XG4gICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1N1YnByb2Nlc3Mgc2V0VGl0bGUgc3VjY2Vzcy4nLCBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIHNldFZhbGlkRGF0ZTogZnVuY3Rpb24gKF9kZWYsIHV1aWQsIGRhdGFWYWx1ZSwgX1dGSW5zdGFuY2UpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgICAgIHZhciBzcFByb2Nlc3NPYmplY3QgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ11cIiwgYXBwLlNDT1BFLndvcmtmbG93LCB7fSlbMF07XG4gICAgICAgICAgICAgICAgc3BQcm9jZXNzT2JqZWN0LmRhdGVzLnZhbGlkID0gZGF0YVZhbHVlO1xuXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW1zVG9Qcm9jZXNzID0gMTtcbiAgICAgICAgICAgICAgICB2YXIgc3R1ZmYgPSBbXTtcbiAgICAgICAgICAgICAgICB2YXIgb2JqID0ge307XG5cbiAgICAgICAgICAgICAgICBvYmoubW9kZWwgPSBzcFByb2Nlc3NPYmplY3Q7XG4gICAgICAgICAgICAgICAgc3R1ZmYucHVzaChvYmopO1xuXG4gICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ3ZhbGlkIGRhdGUgc2V0LicsIF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlcyk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxufSkoKTtcblxudmFyIHZhcmlhYmxlcyA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIHNldFZhcmlhYmxlOiBmdW5jdGlvbiAoc2V0VmFyaWFibGUsIF9XRkluc3RhbmNlLCB1dWlkKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICBoZWxwZXIuZ2V0Tm9kZVZhbHVlKHNldFZhcmlhYmxlLmRhdGEsIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uIChkYXRhVmFsdWUpIHtcblxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzY29wZSA9IHNldFZhcmlhYmxlLnNjb3BlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmFyaWFibGVOYW1lID0gc2V0VmFyaWFibGUubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhcmlhYmxlVHlwZSA9IHNldFZhcmlhYmxlLnZhcmlhYmxlVHlwZTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsaWREYXRlID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2RhdGVzL3ZhbGlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG5cbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChzY29wZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncHJvZmlsZSc6XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvZmlsZVZhcmlhYmxlRmlsZU5hbWUgPSBwcm9maWxlSWQgKyAnOnZhcmlhYmxlcyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGFvLmdldChwcm9maWxlVmFyaWFibGVGaWxlTmFtZSkudGhlbihmdW5jdGlvbiAoZmlsZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YXJpYWJsZVR5cGUgPT0gJ3BlcmlvZGljJykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBPdmVyd3JpdGUgdGhlIGV4aXN0aW5nIHZhcmlhYmxlIGluIGNhc2Ugd2hlcmUgc2FtZSB2YXJpYWJsZSBpcyBhc3NpZ25lZCBhdCBtdWx0aXBsZSBzdGVwcy5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb2Nlc3NPYmogPSBKU09OLnhwYXRoKFwiL2luc3RhbmNlL3Byb2Nlc3Nlc1tzdWJQcm9jZXNzZXMvdXVpZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlcSA9IHByb2Nlc3NPYmouc2VxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9iaiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN1YlByb2Nlc3NVVUlEXCI6IHV1aWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VyTmFtZVwiOiBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVzZXJJZFwiOiBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJQcm9maWxlSWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VxXCI6IHNlcSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbGlkRGF0ZVwiOiB2YWxpZERhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBkYXRhVmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZmlsZVt2YXJpYWJsZU5hbWVdICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZhbCgnZmlsZS4nICsgdmFyaWFibGVOYW1lICsgJy5wdXNoKG9iaiknKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZVt2YXJpYWJsZU5hbWVdID0gW29ial07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVbdmFyaWFibGVOYW1lXSA9IGRhdGFWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhby51cHNlcnQoZmlsZSkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShcIlZhcmlhYmxlIHNldCBzdWNjZXNzZnVsbHlcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiRmFpbGVkIHRvIHNldCBWYXJpYWJsZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlsZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiX2lkXCI6IHByb2ZpbGVWYXJpYWJsZUZpbGVOYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZS5jaGFubmVscyA9IGFwcC5wcm9maWxlLmNoYW5uZWxzO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YXJpYWJsZVR5cGUgPT0gJ3BlcmlvZGljJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb2Nlc3NPYmogPSBKU09OLnhwYXRoKFwiL2luc3RhbmNlL3Byb2Nlc3Nlc1tzdWJQcm9jZXNzZXMvdXVpZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlcSA9IHByb2Nlc3NPYmouc2VxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZVt2YXJpYWJsZU5hbWVdID0gW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN1YlByb2Nlc3NVVUlEXCI6IHV1aWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VyTmFtZVwiOiBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVzZXJJZFwiOiBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJQcm9maWxlSWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VxXCI6IHNlcSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbGlkRGF0ZVwiOiB2YWxpZERhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBkYXRhVmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZVt2YXJpYWJsZU5hbWVdID0gZGF0YVZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGFvLnVwc2VydChmaWxlKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKFwiVmFyaWFibGUgc2V0IHN1Y2Nlc3NmdWxseVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJGYWlsZWQgdG8gc2V0IFZhcmlhYmxlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3ViUHJvY2Vzc0luc3RhbmNlJzpcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoXCJub3QgaW1wbGVtZW50ZWRcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N0ZXAnOlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShcIm5vdCBpbXBsZW1lbnRlZFwiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3ViUHJvZmlsZVN1YlByb2Nlc3NJbnN0YW5jZSc6XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3ViUHJvZmlsZUlkID0gYXBwLnByb2ZpbGUuc3VicHJvZmlsZUlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWJQcm9maWxlVmFyaWFibGVGaWxlTmFtZSA9IHN1YlByb2ZpbGVJZCArICc6dmFyaWFibGVzJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYW8uZ2V0KHN1YlByb2ZpbGVWYXJpYWJsZUZpbGVOYW1lKS50aGVuKGZ1bmN0aW9uIChmaWxlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhcmlhYmxlVHlwZSA9PSAncGVyaW9kaWMnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJ0ID0gbGlicmFyeS5nZXRTdWJwcm9maWxlU3VicHJvY2Vzc0lkcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlcSA9IEpTT04ueHBhdGgoXCJjb3VudCgvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9wcmVjZWRpbmctc2libGluZzo6bm9kZSgpW2lkID0gL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaWQgYW5kIF9pZCA9IC9zdWJwcm9jZXNzZXNbX2lkID0gXCIrcGFydCtcIl0vX2lkXSlcIiwgX1dGSW5zdGFuY2UsIHt9KVswXSArIDE7ICAgICAgICAgICAgICAgICAgIFxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJQcm9jZXNzVVVJRFwiOiB1dWlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlclwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlck5hbWVcIjogTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VybmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VySWRcIjogTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VyUHJvZmlsZUlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlcVwiOiBzZXEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWxpZERhdGVcIjogdmFsaWREYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZGF0YVZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGZpbGVbdmFyaWFibGVOYW1lXSAhPSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2YWwoJ2ZpbGUuJyArIHZhcmlhYmxlTmFtZSArICcucHVzaChvYmopJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVbdmFyaWFibGVOYW1lXSA9IFtvYmpdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlW3ZhcmlhYmxlTmFtZV0gPSBkYXRhVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYW8udXBzZXJ0KGZpbGUpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoXCJWYXJpYWJsZSBhdCBzdWJwcm9maWxlIHNldCBzdWNjZXNzZnVsbHlcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiRmFpbGVkIHRvIHNldCBWYXJpYWJsZSBhdCBzdWJwcm9maWxlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaWxlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJfaWRcIjogc3ViUHJvZmlsZVZhcmlhYmxlRmlsZU5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlLmNoYW5uZWxzID0gYXBwLnByb2ZpbGUuY2hhbm5lbHM7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhcmlhYmxlVHlwZSA9PSAncGVyaW9kaWMnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciBwcm9jZXNzT2JqID0gSlNPTi54cGF0aChcIi9pbnN0YW5jZS9wcm9jZXNzZXNbc3ViUHJvY2Vzc2VzL3V1aWQgZXEgJ1wiICsgdXVpZCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIHNlcSA9IHByb2Nlc3NPYmouc2VxO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciBzZXEgPSBKU09OLnhwYXRoKFwiY291bnQoL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vcHJlY2VkaW5nLXNpYmxpbmc6Om5vZGUoKVtpZCA9IC9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2lkIGFuZCBpZCA9IC9zdWJwcm9jZXNzZXNbX2lkID0gL2luc3RhbmNlL3Byb2Nlc3Nlcy9zdWJQcm9jZXNzZXNbc3VicHJvZmlsZUlkIGVxICdcIiArIHN1YlByb2ZpbGVJZCArIFwiJ10vdXVpZF0vX2lkXSlcIiwgX1dGSW5zdGFuY2UsIHt9KVswXSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFydCA9IGxpYnJhcnkuZ2V0U3VicHJvZmlsZVN1YnByb2Nlc3NJZHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZXEgPSBKU09OLnhwYXRoKFwiY291bnQoL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vcHJlY2VkaW5nLXNpYmxpbmc6Om5vZGUoKVtpZCA9IC9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2lkIGFuZCBfaWQgPSAvc3VicHJvY2Vzc2VzW19pZCA9IFwiK3BhcnQrXCJdL19pZF0pXCIsIF9XRkluc3RhbmNlLCB7fSlbMF0gKyAxOyAgICAgICAgICAgICAgICAgICBcblxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVbdmFyaWFibGVOYW1lXSA9IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJQcm9jZXNzVVVJRFwiOiB1dWlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlclwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlck5hbWVcIjogTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VybmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VySWRcIjogTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VyUHJvZmlsZUlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlcVwiOiBzZXEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWxpZERhdGVcIjogdmFsaWREYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZGF0YVZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVbdmFyaWFibGVOYW1lXSA9IGRhdGFWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhby51cHNlcnQoZmlsZSkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShcIlZhcmlhYmxlIGF0IHN1YnByb2ZpbGUgc2V0IHN1Y2Nlc3NmdWxseVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJGYWlsZWQgdG8gc2V0IFZhcmlhYmxlIGF0IHN1YnByb2ZpbGVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChcImdldE5vZGVWYWx1ZSB2YWx1ZSBub3QgZm91bmQuXCIpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG5cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG59KSgpO1xuXG52YXIgbm90aWZpY2F0aW9uID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgc2VuZE5vdGlmaWNhdGlvbldvcmtlcjogZnVuY3Rpb24gKG5vdGlmaWNhdGlvbiwgX1dGSW5zdGFuY2UsIHV1aWQpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuXG4gICAgICAgICAgICAgICAgdmFyIGdldFJlY2lwaWVudHMgPSBmdW5jdGlvbihub3RpZmljYXRpb24pIHtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlY2lwaWVudHMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5vdGlmaWNhdGlvbi5yZWNpcGllbnRzLnJvbGUgIT0gdW5kZWZpbmVkKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY2lwaWVudHMucm9sZSA9IG5vdGlmaWNhdGlvbi5yZWNpcGllbnRzLnJvbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZWNpcGllbnRzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKG5vdGlmaWNhdGlvbi5yZWNpcGllbnRzLnByb2ZpbGVSb2xlICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjaXBpZW50cy5wcm9maWxlUm9sZSA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY2lwaWVudHMucHJvZmlsZVJvbGUucm9sZSA9IG5vdGlmaWNhdGlvbi5yZWNpcGllbnRzLnByb2ZpbGVSb2xlLnJvbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjaXBpZW50cy5wcm9maWxlUm9sZS5wcm9maWxlID0gbm90aWZpY2F0aW9uLnJlY2lwaWVudHMucHJvZmlsZVJvbGUucHJvZmlsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlY2lwaWVudHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKG5vdGlmaWNhdGlvbi5yZWNpcGllbnRzLnN1YlByb2ZpbGVSb2xlICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjaXBpZW50cy5zdWJQcm9maWxlUm9sZSA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY2lwaWVudHMuc3ViUHJvZmlsZVJvbGUucm9sZSA9IG5vdGlmaWNhdGlvbi5yZWNpcGllbnRzLnN1YlByb2ZpbGVSb2xlLnJvbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjaXBpZW50cy5zdWJQcm9maWxlUm9sZS5zdWJQcm9maWxlQ2F0ZWdvcnkgPSBub3RpZmljYXRpb24ucmVjaXBpZW50cy5zdWJQcm9maWxlUm9sZS5zdWJQcm9maWxlQ2F0ZWdvcnk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjaXBpZW50cy5zdWJQcm9maWxlUm9sZS5wcm9maWxlID0gbm90aWZpY2F0aW9uLnJlY2lwaWVudHMuc3ViUHJvZmlsZVJvbGUucHJvZmlsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlY2lwaWVudHMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYobm90aWZpY2F0aW9uLnJlY2lwaWVudHMuZnVuY3Rpb24gIT0gdW5kZWZpbmVkKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY2lwaWVudHMuZnVuY3Rpb24gPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNpcGllbnRzLmZ1bmN0aW9uLnVzZXJzID0ge307XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWxwZXIuZ2V0Tm9kZVZhbHVlKG5vdGlmaWNhdGlvbi5yZWNpcGllbnRzLmZ1bmN0aW9uLnVzZXJzLCBfV0ZJbnN0YW5jZSwgdXVpZCkudGhlbihmdW5jdGlvbiAoZGF0YVZhbHVlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjaXBpZW50cy5mdW5jdGlvbi51c2VycyA9ICBkYXRhVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVjaXBpZW50cyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlaihlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG1vbWVudCgpLmZvcm1hdCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZW5kZXJVc2VySWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QucHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QubWVzc2FnZVR5cGUgPSBcIm5vdGlmaWNhdGlvblwiO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jaGFubmVscy5wdXNoKFwibm90aWZpY2F0aW9uXCIpO1xuICAgICAgICAgICAgICAgIHZhciBzdWJQcm9maWxlSWQgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiKyB1dWlkICtcIiddL21ldGEtZGF0YS9zdWJwcm9maWxlSWRcIiwgX1dGSW5zdGFuY2UgLHt9KVswXTtcbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHZhciBwYXRoQXJyYXkgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoICcvJyApO1xuICAgICAgICAgICAgICAgIHZhciBiYXNlVVJMID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgd2luZG93LmxvY2F0aW9uLmhvc3QgKyBcIi9cIiArIHBhdGhBcnJheVsxXTtcblxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIFwibm90aWZpY2F0aW9uXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VUeXBlXCI6XCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibWV0YS1kYXRhXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFwcGxpY2F0aW9uSWRcIjogX1dGSW5zdGFuY2UuYXBwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tbXVuaXR5SWRcIjogX1dGSW5zdGFuY2UuY29tbXVuaXR5SWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxlSWRcIjogX1dGSW5zdGFuY2UucHJvZmlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN1YlByb2Nlc3NVVUlEXCI6IHV1aWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJQcm9maWxlSWRcIjogc3ViUHJvZmlsZUlkXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJub3RpZmljYXRpb25UeXBlXCI6XCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicHJpb3JpdHlcIjpcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZWNpcGllbnRzXCI6IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidXJsXCI6YmFzZVVSTCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwia2V5c1wiOntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb2ZpbGVcIjp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6XCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21tdW5pdHlcIjp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjpcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFwcGxpY2F0aW9uXCI6e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6XCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjdXJyZW50VXNlclwiOntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOlwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3ViUHJvY2Vzc1wiOntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOlwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgKiBcbiAgICAgICAgICAgICAgICBLZXlzIG1lc3NhZ2UgXG4gICAgICAgICAgICAgICAgKi9cblxuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5wcm9maWxlLm5hbWUgPSBhcHAucHJvZmlsZS50aXRsZTtcbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMucHJvZmlsZS5pZCA9IGFwcC5wcm9maWxlLl9pZDtcblxuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5jb21tdW5pdHkubmFtZSA9IGFwcC5nZXROYW1lQnlMYW5nKExPQ0FMX1NFVFRJTkdTLkNPTU1VTklUWV9DT05GSUcuY29tbXVuaXR5TmFtZSk7XG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLmNvbW11bml0eS5pZCA9IExPQ0FMX1NFVFRJTkdTLkNPTU1VTklUWV9DT05GSUcuY29tbXVuaXR5SWQ7XG5cbiAgICAgICAgICAgICAgICB2YXIgYXBwbGljYXRpb24gPSBKU09OLnhwYXRoKFwiL2FwcGxpY2F0aW9uc1thcHBJZCBlcSAnXCIgKyBhcHAuU0NPUEUuYXBwbGljYXRpb25JZCArIFwiJ11cIiwgTE9DQUxfU0VUVElOR1MuQ09NTVVOSVRZX0NPTkZJRywge30pWzBdO1xuXG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLmFwcGxpY2F0aW9uLm5hbWUgPSBhcHAuZ2V0TmFtZUJ5TGFuZyhhcHBsaWNhdGlvbi5uYW1lKTtcbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMuYXBwbGljYXRpb24uaWQgPSBhcHBsaWNhdGlvbi5hcHBJZDtcblxuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5jdXJyZW50VXNlci5uYW1lID0gTE9DQUxfU0VUVElOR1MuU0VTU0lPTi5maXJzdE5hbWUgKyBcIiBcIiArIExPQ0FMX1NFVFRJTkdTLlNFU1NJT04ubGFzdE5hbWU7XG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLmN1cnJlbnRVc2VyLmlkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XG5cblxuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5zdWJQcm9jZXNzLm5hbWUgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiKyB1dWlkICtcIiddL2xhYmVsXCIsIF9XRkluc3RhbmNlICwge30pWzBdO1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5zdWJQcm9jZXNzLmlkID0gdXVpZDtcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICogXG4gICAgICAgICAgICAgICAgV29ya2VyIG1lc3NhZ2UgXG4gICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm1lc3NhZ2UuZGVmYXVsdCA9IG5vdGlmaWNhdGlvbi5tZXNzYWdlLmRlZmF1bHQ7XG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5tZXNzYWdlLnRpdGxlID0gbm90aWZpY2F0aW9uLm1lc3NhZ2UudGl0bGU7XG5cbiAgICAgICAgICAgICAgICBpZihub3RpZmljYXRpb24ubWVzc2FnZS5ydGYgIT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5tZXNzYWdlLnJ0ZiA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBpZihub3RpZmljYXRpb24ubWVzc2FnZS5ydGYudGVtcGxhdGUhPSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5tZXNzYWdlLnJ0Zi50ZW1wbGF0ZSA9IG5vdGlmaWNhdGlvbi5tZXNzYWdlLnJ0Zi50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChub3RpZmljYXRpb24ubWVzc2FnZS5ydGYubWFya3VwIT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubWVzc2FnZS5ydGYubWFya3VwID0gbm90aWZpY2F0aW9uLm1lc3NhZ2UucnRmLm1hcmt1cDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAqIFxuICAgICAgICAgICAgICAgIFdvcmtlciBtZXNzYWdlVHlwZSBcbiAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubWVzc2FnZVR5cGUgPSBub3RpZmljYXRpb24ubWVzc2FnZVR5cGU7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgKiBcbiAgICAgICAgICAgICAgICBXb3JrZXIgbm90aWZpY2F0aW9uVHlwZSBcbiAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubm90aWZpY2F0aW9uVHlwZSA9IG5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25UeXBlO1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICogXG4gICAgICAgICAgICAgICAgV29ya2VyIHByaW9yaXR5IFxuICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5wcmlvcml0eSA9IG5vdGlmaWNhdGlvbi5wcmlvcml0eTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAqIFxuICAgICAgICAgICAgICAgIFdvcmtlciBub3RpZmljYXRpb25BY3Rpb24gaWYgZXhpc3RzIFxuICAgICAgICAgICAgICAgICovXG5cbiAgICAgICAgICAgICAgICBpZihub3RpZmljYXRpb24ubm90aWZpY2F0aW9uQWN0aW9uICE9IHVuZGVmaW5lZCl7XG5cbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25BY3Rpb24gPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25BY3Rpb24ubGFiZWwgPSBub3RpZmljYXRpb24ubm90aWZpY2F0aW9uQWN0aW9uLmxhYmVsO1xuICAgICAgICAgICAgICAgICAgICBpZihub3RpZmljYXRpb24ubm90aWZpY2F0aW9uQWN0aW9uLmFjdGlvbi5VUkkgIT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbkFjdGlvbi5hY3Rpb24gPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbkFjdGlvbi5hY3Rpb24uVVJJID0gbm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbkFjdGlvbi5hY3Rpb24uVVJJO1xuICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYobm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbkFjdGlvbi5hY3Rpb24uZ290byAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbkFjdGlvbi5hY3Rpb24gPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbkFjdGlvbi5hY3Rpb24uZ290byA9IG5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uLmdvdG87XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIFxuXG5cbiAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgKiBcbiAgICAgICAgICAgICAgICBXb3JrZXIgcmVjaXBpZW50c1xuICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZ2V0UmVjaXBpZW50cyhub3RpZmljYXRpb24pLnRoZW4oZnVuY3Rpb24ocmVjaXBpZW50KXtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5yZWNpcGllbnRzID0gcmVjaXBpZW50O1xuICAgICAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24gKHdvcmtlclN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHdvcmtlck9iamVjdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnTm90aWZpY2F0aW9uIFdvcmtlciBwcm9jZXNzZXMgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAod29ya2VyRmFpbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh3b3JrZXJGYWlsKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycil7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJOb3RpZmljYXRpb24gLSBnZXRSZWNpcGllbnRzIGZhaWxlZCB3aXRoIGVycm9yIFwiKyBlcnIpO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcblxuXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sXG5cblxuICAgICAgICByZUFzc2lnbm1lbnROb3RpZmljYXRpb246IGZ1bmN0aW9uIChub3RpZmljYXRpb24sIF9XRkluc3RhbmNlLCB1dWlkLCB1c2VyKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cblxuICAgICAgICAgICAgICAgIHZhciBnZXRSZWNpcGllbnRzID0gZnVuY3Rpb24odXNlck9iaikge1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVjaXBpZW50cyA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVjaXBpZW50cy5mdW5jdGlvbiA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVjaXBpZW50cy5mdW5jdGlvbi51c2VycyA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVjaXBpZW50cy5mdW5jdGlvbi51c2VycyA9ICB1c2VyT2JqLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZWNpcGllbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IHdvcmtlci5nZXRXb3JrZXJXcmFwcGVyKCk7XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY29tbXVuaXR5SWQgPSBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbW9tZW50KCkuZm9ybWF0KCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5wcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5tZXNzYWdlVHlwZSA9IFwibm90aWZpY2F0aW9uXCI7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNoYW5uZWxzLnB1c2goXCJub3RpZmljYXRpb25cIik7XG4gICAgICAgICAgICAgICAgdmFyIHN1YlByb2ZpbGVJZCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIrIHV1aWQgK1wiJ10vbWV0YS1kYXRhL3N1YnByb2ZpbGVJZFwiLCBfV0ZJbnN0YW5jZSAse30pWzBdO1xuXG4gICAgICAgICAgICAgICAgdmFyIHBhdGhBcnJheSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCggJy8nICk7XG4gICAgICAgICAgICAgICAgdmFyIGJhc2VVUkwgPSB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyB3aW5kb3cubG9jYXRpb24uaG9zdCArIFwiL1wiICsgcGF0aEFycmF5WzFdO1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICBcIm5vdGlmaWNhdGlvblwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicnRmXCI6e1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVR5cGVcIjpcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJtZXRhLWRhdGFcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXBwbGljYXRpb25JZFwiOiBfV0ZJbnN0YW5jZS5hcHAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21tdW5pdHlJZFwiOiBfV0ZJbnN0YW5jZS5jb21tdW5pdHlJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb2ZpbGVJZFwiOiBfV0ZJbnN0YW5jZS5wcm9maWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3ViUHJvY2Vzc1VVSURcIjogdXVpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN1YlByb2ZpbGVJZFwiOiBzdWJQcm9maWxlSWRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm5vdGlmaWNhdGlvblR5cGVcIjpcIndvcmtmbG93XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6XCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmVjaXBpZW50c1wiOiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcInVybFwiOmJhc2VVUkwsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImtleXNcIjp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxlXCI6e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOlwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tbXVuaXR5XCI6e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6XCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHBsaWNhdGlvblwiOntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOlwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY3VycmVudFVzZXJcIjp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjpcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN1YlByb2Nlc3NcIjp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjpcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICogXG4gICAgICAgICAgICAgICAgS2V5cyBtZXNzYWdlIFxuICAgICAgICAgICAgICAgICovXG5cbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMucHJvZmlsZS5uYW1lID0gYXBwLnByb2ZpbGUudGl0bGU7XG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLnByb2ZpbGUuaWQgPSBhcHAucHJvZmlsZS5faWQ7XG5cbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMuY29tbXVuaXR5Lm5hbWUgPSBhcHAuZ2V0TmFtZUJ5TGFuZyhMT0NBTF9TRVRUSU5HUy5DT01NVU5JVFlfQ09ORklHLmNvbW11bml0eU5hbWUpO1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5jb21tdW5pdHkuaWQgPSBMT0NBTF9TRVRUSU5HUy5DT01NVU5JVFlfQ09ORklHLmNvbW11bml0eUlkO1xuXG4gICAgICAgICAgICAgICAgdmFyIGFwcGxpY2F0aW9uID0gSlNPTi54cGF0aChcIi9hcHBsaWNhdGlvbnNbYXBwSWQgZXEgJ1wiICsgYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQgKyBcIiddXCIsIExPQ0FMX1NFVFRJTkdTLkNPTU1VTklUWV9DT05GSUcsIHt9KVswXTtcblxuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5hcHBsaWNhdGlvbi5uYW1lID0gYXBwLmdldE5hbWVCeUxhbmcoYXBwbGljYXRpb24ubmFtZSk7XG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLmFwcGxpY2F0aW9uLmlkID0gYXBwbGljYXRpb24uYXBwSWQ7XG5cbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMuY3VycmVudFVzZXIubmFtZSA9IExPQ0FMX1NFVFRJTkdTLlNFU1NJT04uZmlyc3ROYW1lICsgXCIgXCIgKyBMT0NBTF9TRVRUSU5HUy5TRVNTSU9OLmxhc3ROYW1lO1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5jdXJyZW50VXNlci5pZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xuXG5cbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMuc3ViUHJvY2Vzcy5uYW1lID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIisgdXVpZCArXCInXS9sYWJlbFwiLCBfV0ZJbnN0YW5jZSAsIHt9KVswXTtcbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMuc3ViUHJvY2Vzcy5pZCA9IHV1aWQ7XG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAqIFxuICAgICAgICAgICAgICAgIFdvcmtlciBtZXNzYWdlIFxuICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5tZXNzYWdlLmRlZmF1bHQgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubWVzc2FnZS50aXRsZSA9IG5vdGlmaWNhdGlvbi5yZUFzc2lnbm1lbnQudGl0bGU7XG5cbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm1lc3NhZ2UucnRmLm1hcmt1cCA9IG5vdGlmaWNhdGlvbi5yZUFzc2lnbm1lbnQubWVzc2FnZTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAqIFxuICAgICAgICAgICAgICAgIFdvcmtlciBtZXNzYWdlVHlwZSBcbiAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubWVzc2FnZVR5cGUgPSBub3RpZmljYXRpb24ucmVBc3NpZ25tZW50Lm1lc3NhZ2VUeXBlO1xuICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgKiBcbiAgICAgICAgICAgICAgICBXb3JrZXIgcHJpb3JpdHkgXG4gICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLnByaW9yaXR5ID0gbm90aWZpY2F0aW9uLnJlQXNzaWdubWVudC5wcmlvcml0eTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAqIFxuICAgICAgICAgICAgICAgIFdvcmtlciBub3RpZmljYXRpb25BY3Rpb24gaWYgZXhpc3RzIFxuICAgICAgICAgICAgICAgICovXG5cbiAgICAgICAgICAgICAgICBpZihub3RpZmljYXRpb24ucmVBc3NpZ25tZW50Lm5vdGlmaWNhdGlvbkFjdGlvbiAhPSB1bmRlZmluZWQpe1xuXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubm90aWZpY2F0aW9uQWN0aW9uID0ge307XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubm90aWZpY2F0aW9uQWN0aW9uLmxhYmVsID0gbm90aWZpY2F0aW9uLnJlQXNzaWdubWVudC5ub3RpZmljYXRpb25BY3Rpb24ubGFiZWw7XG4gICAgICAgICAgICAgICAgICAgIGlmKG5vdGlmaWNhdGlvbi5yZUFzc2lnbm1lbnQubm90aWZpY2F0aW9uQWN0aW9uLmFjdGlvbi5VUkkgIT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbkFjdGlvbi5hY3Rpb24gPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbkFjdGlvbi5hY3Rpb24uVVJJID0gbm90aWZpY2F0aW9uLnJlQXNzaWdubWVudC5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uLlVSSTtcbiAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKG5vdGlmaWNhdGlvbi5yZUFzc2lnbm1lbnQubm90aWZpY2F0aW9uQWN0aW9uLmFjdGlvbi5nb3RvICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubm90aWZpY2F0aW9uQWN0aW9uLmFjdGlvbiA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubm90aWZpY2F0aW9uQWN0aW9uLmFjdGlvbi5nb3RvID0gbm90aWZpY2F0aW9uLnJlQXNzaWdubWVudC5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uLmdvdG87XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIFxuXG5cbiAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgKiBcbiAgICAgICAgICAgICAgICBXb3JrZXIgcmVjaXBpZW50c1xuICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZ2V0UmVjaXBpZW50cyh1c2VyKS50aGVuKGZ1bmN0aW9uKHJlY2lwaWVudCl7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ucmVjaXBpZW50cyA9IHJlY2lwaWVudDtcbiAgICAgICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uICh3b3JrZXJTdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh3b3JrZXJPYmplY3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ05vdGlmaWNhdGlvbiBXb3JrZXIgcHJvY2Vzc2VzIHN1Y2Nlc3NmdWxseSBmb3IgcmVhc3NpZ25tZW50LicsIHdvcmtlclN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAod29ya2VyRmFpbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh3b3JrZXJGYWlsKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycil7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJOb3RpZmljYXRpb24gLSBnZXRSZWNpcGllbnRzIGZhaWxlZCB3aXRoIGVycm9yIFwiKyBlcnIpO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcblxuXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgYXNzaWdubWVudE5vdGlmaWNhdGlvbjogZnVuY3Rpb24gKG5vdGlmaWNhdGlvbiwgX1dGSW5zdGFuY2UsIHV1aWQsIHVzZXIpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuXG4gICAgICAgICAgICAgICAgdmFyIGdldFJlY2lwaWVudHMgPSBmdW5jdGlvbih1c2VyT2JqKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWNpcGllbnRzID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICByZWNpcGllbnRzLmZ1bmN0aW9uID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICByZWNpcGllbnRzLmZ1bmN0aW9uLnVzZXJzID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICByZWNpcGllbnRzLmZ1bmN0aW9uLnVzZXJzID0gIHVzZXJPYmouaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlY2lwaWVudHMpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5faWQgPSBnZW5lcmF0ZVVVSUQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYXBwbGljYXRpb25JZCA9IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jcmVhdGVkRGF0ZVRpbWUgPSBtb21lbnQoKS5mb3JtYXQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2VuZGVyVXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnByb2ZpbGVJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Lm1lc3NhZ2VUeXBlID0gXCJub3RpZmljYXRpb25cIjtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY2hhbm5lbHMucHVzaChcIm5vdGlmaWNhdGlvblwiKTtcbiAgICAgICAgICAgICAgICB2YXIgc3ViUHJvZmlsZUlkID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIisgdXVpZCArXCInXS9tZXRhLWRhdGEvc3VicHJvZmlsZUlkXCIsIF9XRkluc3RhbmNlICx7fSlbMF07XG5cbiAgICAgICAgICAgICAgICB2YXIgcGF0aEFycmF5ID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCAnLycgKTtcbiAgICAgICAgICAgICAgICB2YXIgYmFzZVVSTCA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICsgXCIvXCIgKyBwYXRoQXJyYXlbMV07XG5cblxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIFwibm90aWZpY2F0aW9uXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJydGZcIjp7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlVHlwZVwiOlwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm1ldGEtZGF0YVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHBsaWNhdGlvbklkXCI6IF9XRkluc3RhbmNlLmFwcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbW11bml0eUlkXCI6IF9XRkluc3RhbmNlLmNvbW11bml0eUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZmlsZUlkXCI6IF9XRkluc3RhbmNlLnByb2ZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJQcm9jZXNzVVVJRFwiOiB1dWlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3ViUHJvZmlsZUlkXCI6IHN1YlByb2ZpbGVJZFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibm90aWZpY2F0aW9uVHlwZVwiOlwid29ya2Zsb3dcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicHJpb3JpdHlcIjpcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZWNpcGllbnRzXCI6IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidXJsXCI6YmFzZVVSTCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwia2V5c1wiOntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb2ZpbGVcIjp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6XCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21tdW5pdHlcIjp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjpcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFwcGxpY2F0aW9uXCI6e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6XCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjdXJyZW50VXNlclwiOntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOlwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3ViUHJvY2Vzc1wiOntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOlwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgKiBcbiAgICAgICAgICAgICAgICBLZXlzIG1lc3NhZ2UgXG4gICAgICAgICAgICAgICAgKi9cblxuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5wcm9maWxlLm5hbWUgPSBhcHAucHJvZmlsZS50aXRsZTtcbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMucHJvZmlsZS5pZCA9IGFwcC5wcm9maWxlLl9pZDtcblxuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5jb21tdW5pdHkubmFtZSA9IGFwcC5nZXROYW1lQnlMYW5nKExPQ0FMX1NFVFRJTkdTLkNPTU1VTklUWV9DT05GSUcuY29tbXVuaXR5TmFtZSk7XG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLmNvbW11bml0eS5pZCA9IExPQ0FMX1NFVFRJTkdTLkNPTU1VTklUWV9DT05GSUcuY29tbXVuaXR5SWQ7XG5cbiAgICAgICAgICAgICAgICB2YXIgYXBwbGljYXRpb24gPSBKU09OLnhwYXRoKFwiL2FwcGxpY2F0aW9uc1thcHBJZCBlcSAnXCIgKyBhcHAuU0NPUEUuYXBwbGljYXRpb25JZCArIFwiJ11cIiwgTE9DQUxfU0VUVElOR1MuQ09NTVVOSVRZX0NPTkZJRywge30pWzBdO1xuXG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLmFwcGxpY2F0aW9uLm5hbWUgPSBhcHAuZ2V0TmFtZUJ5TGFuZyhhcHBsaWNhdGlvbi5uYW1lKTtcbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMuYXBwbGljYXRpb24uaWQgPSBhcHBsaWNhdGlvbi5hcHBJZDtcblxuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5jdXJyZW50VXNlci5uYW1lID0gTE9DQUxfU0VUVElOR1MuU0VTU0lPTi5maXJzdE5hbWUgKyBcIiBcIiArIExPQ0FMX1NFVFRJTkdTLlNFU1NJT04ubGFzdE5hbWU7XG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLmN1cnJlbnRVc2VyLmlkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XG5cblxuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5zdWJQcm9jZXNzLm5hbWUgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiKyB1dWlkICtcIiddL2xhYmVsXCIsIF9XRkluc3RhbmNlICwge30pWzBdO1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5zdWJQcm9jZXNzLmlkID0gdXVpZDtcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICogXG4gICAgICAgICAgICAgICAgV29ya2VyIG1lc3NhZ2UgXG4gICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm1lc3NhZ2UuZGVmYXVsdCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5tZXNzYWdlLnRpdGxlID0gbm90aWZpY2F0aW9uLmFzc2lnbm1lbnQudGl0bGU7XG5cbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm1lc3NhZ2UucnRmLm1hcmt1cCA9IG5vdGlmaWNhdGlvbi5hc3NpZ25tZW50Lm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgKiBcbiAgICAgICAgICAgICAgICBXb3JrZXIgbWVzc2FnZVR5cGUgXG4gICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm1lc3NhZ2VUeXBlID0gbm90aWZpY2F0aW9uLmFzc2lnbm1lbnQubWVzc2FnZVR5cGU7XG4gICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAqIFxuICAgICAgICAgICAgICAgIFdvcmtlciBwcmlvcml0eSBcbiAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ucHJpb3JpdHkgPSBub3RpZmljYXRpb24uYXNzaWdubWVudC5wcmlvcml0eTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAqIFxuICAgICAgICAgICAgICAgIFdvcmtlciBub3RpZmljYXRpb25BY3Rpb24gaWYgZXhpc3RzIFxuICAgICAgICAgICAgICAgICovXG5cbiAgICAgICAgICAgICAgICBpZihub3RpZmljYXRpb24uYXNzaWdubWVudC5ub3RpZmljYXRpb25BY3Rpb24gIT0gdW5kZWZpbmVkKXtcblxuICAgICAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbkFjdGlvbiA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbkFjdGlvbi5sYWJlbCA9IG5vdGlmaWNhdGlvbi5hc3NpZ25tZW50Lm5vdGlmaWNhdGlvbkFjdGlvbi5sYWJlbDtcbiAgICAgICAgICAgICAgICAgICAgaWYobm90aWZpY2F0aW9uLmFzc2lnbm1lbnQubm90aWZpY2F0aW9uQWN0aW9uLmFjdGlvbi5VUkkgIT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbkFjdGlvbi5hY3Rpb24gPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbkFjdGlvbi5hY3Rpb24uVVJJID0gbm90aWZpY2F0aW9uLmFzc2lnbm1lbnQubm90aWZpY2F0aW9uQWN0aW9uLmFjdGlvbi5VUkk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihub3RpZmljYXRpb24uYXNzaWdubWVudC5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uLmdvdG8gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uLmdvdG8gPSBub3RpZmljYXRpb24uYXNzaWdubWVudC5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uLmdvdG87XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIFxuXG5cbiAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgKiBcbiAgICAgICAgICAgICAgICBXb3JrZXIgcmVjaXBpZW50c1xuICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZ2V0UmVjaXBpZW50cyh1c2VyKS50aGVuKGZ1bmN0aW9uKHJlY2lwaWVudCl7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ucmVjaXBpZW50cyA9IHJlY2lwaWVudDtcbiAgICAgICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uICh3b3JrZXJTdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh3b3JrZXJPYmplY3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ05vdGlmaWNhdGlvbiBXb3JrZXIgcHJvY2Vzc2VzIHN1Y2Nlc3NmdWxseSBmb3IgYXNzaWdubWVudC4nLCB3b3JrZXJTdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHdvcmtlckZhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUod29ya2VyRmFpbCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpe1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm90aWZpY2F0aW9uIC0gZ2V0UmVjaXBpZW50cyBmYWlsZWQgd2l0aCBlcnJvciBcIisgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG5cblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIGFjY2VwdGFuY2VOb3RpZmljYXRpb246IGZ1bmN0aW9uIChub3RpZmljYXRpb24sIF9XRkluc3RhbmNlLCB1dWlkLCByb2xlKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cblxuICAgICAgICAgICAgICAgIHZhciBnZXRSb2xlcyA9IGZ1bmN0aW9uKHJvbGUpIHtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlY2lwaWVudHMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY2lwaWVudHMucm9sZSA9IHJvbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlY2lwaWVudHMpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5faWQgPSBnZW5lcmF0ZVVVSUQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYXBwbGljYXRpb25JZCA9IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jcmVhdGVkRGF0ZVRpbWUgPSBtb21lbnQoKS5mb3JtYXQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2VuZGVyVXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnByb2ZpbGVJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Lm1lc3NhZ2VUeXBlID0gXCJub3RpZmljYXRpb25cIjtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY2hhbm5lbHMucHVzaChcIm5vdGlmaWNhdGlvblwiKTtcbiAgICAgICAgICAgICAgICB2YXIgc3ViUHJvZmlsZUlkID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIisgdXVpZCArXCInXS9tZXRhLWRhdGEvc3VicHJvZmlsZUlkXCIsIF9XRkluc3RhbmNlICx7fSlbMF07XG5cbiAgICAgICAgICAgICAgICB2YXIgcGF0aEFycmF5ID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCAnLycgKTtcbiAgICAgICAgICAgICAgICB2YXIgYmFzZVVSTCA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICsgXCIvXCIgKyBwYXRoQXJyYXlbMV07XG5cblxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIFwibm90aWZpY2F0aW9uXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJydGZcIjp7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlVHlwZVwiOlwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm1ldGEtZGF0YVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHBsaWNhdGlvbklkXCI6IF9XRkluc3RhbmNlLmFwcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbW11bml0eUlkXCI6IF9XRkluc3RhbmNlLmNvbW11bml0eUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZmlsZUlkXCI6IF9XRkluc3RhbmNlLnByb2ZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJQcm9jZXNzVVVJRFwiOiB1dWlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3ViUHJvZmlsZUlkXCI6IHN1YlByb2ZpbGVJZFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibm90aWZpY2F0aW9uVHlwZVwiOlwid29ya2Zsb3dcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicHJpb3JpdHlcIjpcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZWNpcGllbnRzXCI6IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidXJsXCI6YmFzZVVSTCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwia2V5c1wiOntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb2ZpbGVcIjp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6XCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21tdW5pdHlcIjp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjpcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFwcGxpY2F0aW9uXCI6e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6XCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjdXJyZW50VXNlclwiOntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOlwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3ViUHJvY2Vzc1wiOntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOlwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgKiBcbiAgICAgICAgICAgICAgICBLZXlzIG1lc3NhZ2UgXG4gICAgICAgICAgICAgICAgKi9cblxuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5wcm9maWxlLm5hbWUgPSBhcHAucHJvZmlsZS50aXRsZTtcbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMucHJvZmlsZS5pZCA9IGFwcC5wcm9maWxlLl9pZDtcblxuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5jb21tdW5pdHkubmFtZSA9IGFwcC5nZXROYW1lQnlMYW5nKExPQ0FMX1NFVFRJTkdTLkNPTU1VTklUWV9DT05GSUcuY29tbXVuaXR5TmFtZSk7XG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLmNvbW11bml0eS5pZCA9IExPQ0FMX1NFVFRJTkdTLkNPTU1VTklUWV9DT05GSUcuY29tbXVuaXR5SWQ7XG5cbiAgICAgICAgICAgICAgICB2YXIgYXBwbGljYXRpb24gPSBKU09OLnhwYXRoKFwiL2FwcGxpY2F0aW9uc1thcHBJZCBlcSAnXCIgKyBhcHAuU0NPUEUuYXBwbGljYXRpb25JZCArIFwiJ11cIiwgTE9DQUxfU0VUVElOR1MuQ09NTVVOSVRZX0NPTkZJRywge30pWzBdO1xuXG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLmFwcGxpY2F0aW9uLm5hbWUgPSBhcHAuZ2V0TmFtZUJ5TGFuZyhhcHBsaWNhdGlvbi5uYW1lKTtcbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMuYXBwbGljYXRpb24uaWQgPSBhcHBsaWNhdGlvbi5hcHBJZDtcblxuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5jdXJyZW50VXNlci5uYW1lID0gTE9DQUxfU0VUVElOR1MuU0VTU0lPTi5maXJzdE5hbWUgKyBcIiBcIiArIExPQ0FMX1NFVFRJTkdTLlNFU1NJT04ubGFzdE5hbWU7XG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLmN1cnJlbnRVc2VyLmlkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XG5cblxuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5zdWJQcm9jZXNzLm5hbWUgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiKyB1dWlkICtcIiddL2xhYmVsXCIsIF9XRkluc3RhbmNlICwge30pWzBdO1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5zdWJQcm9jZXNzLmlkID0gdXVpZDtcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICogXG4gICAgICAgICAgICAgICAgV29ya2VyIG1lc3NhZ2UgXG4gICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm1lc3NhZ2UuZGVmYXVsdCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5tZXNzYWdlLnRpdGxlID0gbm90aWZpY2F0aW9uLmFzc2lnbm1lbnRBY2NlcHRhbmNlLnRpdGxlO1xuXG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5tZXNzYWdlLnJ0Zi5tYXJrdXAgPSBub3RpZmljYXRpb24uYXNzaWdubWVudEFjY2VwdGFuY2UubWVzc2FnZTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAqIFxuICAgICAgICAgICAgICAgIFdvcmtlciBtZXNzYWdlVHlwZSBcbiAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubWVzc2FnZVR5cGUgPSBub3RpZmljYXRpb24uYXNzaWdubWVudEFjY2VwdGFuY2UubWVzc2FnZVR5cGU7XG4gICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAqIFxuICAgICAgICAgICAgICAgIFdvcmtlciBwcmlvcml0eSBcbiAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ucHJpb3JpdHkgPSBub3RpZmljYXRpb24uYXNzaWdubWVudEFjY2VwdGFuY2UucHJpb3JpdHk7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgKiBcbiAgICAgICAgICAgICAgICBXb3JrZXIgbm90aWZpY2F0aW9uQWN0aW9uIGlmIGV4aXN0cyBcbiAgICAgICAgICAgICAgICAqL1xuXG4gICAgICAgICAgICAgICAgaWYobm90aWZpY2F0aW9uLmFzc2lnbm1lbnRBY2NlcHRhbmNlLm5vdGlmaWNhdGlvbkFjdGlvbiAhPSB1bmRlZmluZWQpe1xuXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubm90aWZpY2F0aW9uQWN0aW9uID0ge307XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubm90aWZpY2F0aW9uQWN0aW9uLmxhYmVsID0gbm90aWZpY2F0aW9uLmFzc2lnbm1lbnRBY2NlcHRhbmNlLm5vdGlmaWNhdGlvbkFjdGlvbi5sYWJlbDtcbiAgICAgICAgICAgICAgICAgICAgaWYobm90aWZpY2F0aW9uLmFzc2lnbm1lbnRBY2NlcHRhbmNlLm5vdGlmaWNhdGlvbkFjdGlvbi5hY3Rpb24uVVJJICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uLlVSSSA9IG5vdGlmaWNhdGlvbi5hc3NpZ25tZW50QWNjZXB0YW5jZS5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uLlVSSTtcbiAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKG5vdGlmaWNhdGlvbi5hc3NpZ25tZW50QWNjZXB0YW5jZS5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uLmdvdG8gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uLmdvdG8gPSBub3RpZmljYXRpb24uYXNzaWdubWVudEFjY2VwdGFuY2Uubm90aWZpY2F0aW9uQWN0aW9uLmFjdGlvbi5nb3RvO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICBcblxuXG4gICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICogXG4gICAgICAgICAgICAgICAgV29ya2VyIHJlY2lwaWVudHNcbiAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGdldFJvbGVzKHJvbGUpLnRoZW4oZnVuY3Rpb24ocmVjaXBpZW50KXtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5yZWNpcGllbnRzID0gcmVjaXBpZW50O1xuICAgICAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24gKHdvcmtlclN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHdvcmtlck9iamVjdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnTm90aWZpY2F0aW9uIFdvcmtlciBwcm9jZXNzZXMgc3VjY2Vzc2Z1bGx5IGZvciBhc3NpZ25tZW50LicsIHdvcmtlclN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAod29ya2VyRmFpbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh3b3JrZXJGYWlsKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycil7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJOb3RpZmljYXRpb24gLSBnZXRSZWNpcGllbnRzIGZhaWxlZCB3aXRoIGVycm9yIFwiKyBlcnIpO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcblxuXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG59KSgpO1xuXG5cbnZhciByZXBvcnQgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgcmV0dXJuIHtcblxuXG5cblxuICAgICAgICBjcmVhdGVQZXJmb3JtYW5jZVJlcG9ydDogZnVuY3Rpb24gKHBlcmZvcm1hbmNlUmVwb3J0T2JqZWN0LCBfV0ZJbnN0YW5jZSwgdXVpZCkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IHdvcmtlci5nZXRXb3JrZXJXcmFwcGVyKCk7XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbW9tZW50KCkuZm9ybWF0KCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5wcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zdWJQcm9jZXNzVVVJRCA9IHV1aWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNoYW5uZWxzLnB1c2goXCJjcmVhdGVQZXJmb3JtYW5jZVJlcG9ydFwiKTtcbiAgICAgICAgICAgICAgICB2YXIgd29ya3BsYW5TZXRJZCA9IHBlcmZvcm1hbmNlUmVwb3J0T2JqZWN0LndvcmtwbGFuU2V0SWQ7XG4gICAgICAgICAgICAgICAgdmFyIGNvbmZpZ1NldElkID0gcGVyZm9ybWFuY2VSZXBvcnRPYmplY3QuY29uZmlnU2V0SWQ7XG5cblxuICAgICAgICAgICAgICAgIC8vIHdvcmtwbGFuU2V0SWQgc2NvcGUgaXMgcHJvZmlsZVxuICAgICAgICAgICAgICAgIC8vIGNvbmZpZ1NldElkIHNjb3BlIGlzIHN1YnByb2Nlc3Nlc1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHZhciB3b3JrcGxhblVVSUQgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnXCIrIHdvcmtwbGFuU2V0SWQgK1wiJ10vX2lkXCIsYXBwLlNDT1BFLndvcmtmbG93LCB7fSlbMF07XG4gICAgICAgICAgICAgICAgdmFyIGNvbmZpZ1VVSUQgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnXCIrIGNvbmZpZ1NldElkICtcIiddL2luc3RhbmNlc1sxXS91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZVBlcmZvcm1hbmNlUmVwb3J0XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwid29ya3BsYW5VVUlEXCI6IHdvcmtwbGFuVVVJRCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29uZmlnVVVJRFwiOiBjb25maWdVVUlELFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxJZFwiOiBfV0ZJbnN0YW5jZS5wcm9maWxlICAgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24gKHdvcmtlclN1Y2Nlc3MpIHtcblxuICAgICAgICAgICAgICAgICAgICB3b3JrZXIuc2V0V29ya2VySW5mb0luU3VicHJvY2Vzcyh3b3JrZXJPYmplY3QsIF9XRkluc3RhbmNlLCB1dWlkKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya3BsYW5SZXBvcnQgV29ya2VyIHByb2Nlc3NlZCBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAod29ya2VyRmFpbCkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZVJlcG9ydDogZnVuY3Rpb24gKGNyZWF0ZVJlcG9ydCwgX1dGSW5zdGFuY2UsIHV1aWQpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG1vbWVudCgpLmZvcm1hdCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZW5kZXJVc2VySWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QucHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc3ViUHJvY2Vzc1VVSUQgPSB1dWlkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jaGFubmVscy5wdXNoKFwiY3JlYXRlUmVwb3J0XCIpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHZhciBwZXJmb3JtYW5jZVJlcG9ydERlZmluaXRpb25TZXRJZCA9IGNyZWF0ZVJlcG9ydC5QZXJmb3JtYW5jZVJlcG9ydERlZmluaXRpb25TZXRJZDtcbiAgICAgICAgICAgICAgICB2YXIgcmVwb3J0aW5nU0RPU2V0SWQgPSBjcmVhdGVSZXBvcnQucmVwb3J0aW5nU0RPU2V0SWQ7XG5cbiAgICAgICAgICAgICAgICB2YXIgcGVyZm9ybWFuY2VSZXBvcnREZWZpbml0aW9uID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ1wiKyBwZXJmb3JtYW5jZVJlcG9ydERlZmluaXRpb25TZXRJZCArXCInXS9faWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICB2YXIgcmVwb3J0aW5nU0RPID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ1wiKyByZXBvcnRpbmdTRE9TZXRJZCArXCInXS9pbnN0YW5jZXNbMV0vdXVpZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVSZXBvcnRcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJwZXJmb3JtYW5jZVJlcG9ydERlZmluaXRpb25cIjogcGVyZm9ybWFuY2VSZXBvcnREZWZpbml0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZXBvcnRpbmdTRE9cIjogcmVwb3J0aW5nU0RPLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxJZFwiOiBfV0ZJbnN0YW5jZS5wcm9maWxlICAgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24gKHdvcmtlclN1Y2Nlc3MpIHtcblxuICAgICAgICAgICAgICAgICAgICB3b3JrZXIuc2V0V29ya2VySW5mb0luU3VicHJvY2Vzcyh3b3JrZXJPYmplY3QsIF9XRkluc3RhbmNlLCB1dWlkKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnUmVwcm90IFdvcmtlciBwcm9jZXNzZWQgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHdvcmtlckZhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdvcmtlckZhaWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSxcblxuXG4gICAgICAgXG5cbiAgICAgICAgc2RvUmVwb3J0OiBmdW5jdGlvbiAoc2RvUmVwb3J0LCBfV0ZJbnN0YW5jZSwgdXVpZCkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IHdvcmtlci5nZXRXb3JrZXJXcmFwcGVyKCk7XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbW9tZW50KCkuZm9ybWF0KCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5wcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zdWJQcm9jZXNzVVVJRCA9IHV1aWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNoYW5uZWxzLnB1c2goXCJzZG9SZXBvcnRcIik7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFyIHNldElkID0gc2RvUmVwb3J0LmluZGljYXRvclNldElkO1xuICAgICAgICAgICAgICAgIHZhciBzZG9SZXBvcnRVVUlEID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ1wiKyBzZXRJZCArXCInXS9pbnN0YW5jZXNbMV0vdXVpZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJzZG9SZXBvcnRcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJzZG9SZXBvcnRVVUlEXCI6IHNkb1JlcG9ydFVVSUQsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFwcGxpY2F0aW9uSWRcIjogYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbW11bml0eUlkXCI6IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxlSWRcIjogYXBwLlNDT1BFLndvcmtmbG93LnByb2ZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInN1YlByb2Nlc3NVVUlEXCI6IHV1aWQgIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hY3Rpb24gPSBhY3Rpb247XG4gICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uICh3b3JrZXJTdWNjZXNzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgd29ya2VyLnNldFdvcmtlckluZm9JblN1YnByb2Nlc3Mod29ya2VyT2JqZWN0LCBfV0ZJbnN0YW5jZSwgdXVpZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ3JlcG9ydCBXb3JrZXIgcHJvY2Vzc2VkIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICh3b3JrZXJGYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh3b3JrZXJGYWlsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZXhlY3V0ZVJlcG9ydDogZnVuY3Rpb24gKGV4ZWN1dGVSZXBvcnQsIF9XRkluc3RhbmNlLCB1dWlkKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5faWQgPSBnZW5lcmF0ZVVVSUQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY29tbXVuaXR5SWQgPSBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYXBwbGljYXRpb25JZCA9IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jcmVhdGVkRGF0ZVRpbWUgPSBtb21lbnQoKS5mb3JtYXQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2VuZGVyVXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnByb2ZpbGVJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnN1YlByb2Nlc3NVVUlEID0gdXVpZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY2hhbm5lbHMucHVzaChcImV4ZWN1dGVSZXBvcnRcIik7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHZhciBTRE9yZXBvcnRTZXRJZCA9IGV4ZWN1dGVSZXBvcnQuU0RPcmVwb3J0U2V0SWQ7XG4gICAgICAgICAgICAgICAgdmFyIHJlcG9ydGluZ1NET1NldGlkID0gZXhlY3V0ZVJlcG9ydC5yZXBvcnRpbmdTRE9TZXRpZDtcblxuXG4gICAgICAgICAgICAgICAgdmFyIFNET3JlcG9ydFVVSUQgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnXCIrIFNET3JlcG9ydFNldElkICtcIiddL2luc3RhbmNlc1sxXS91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgdmFyIHJlcG9ydGluZ1NET1VVSUQgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnXCIrIHJlcG9ydGluZ1NET1NldGlkICtcIiddL2luc3RhbmNlc1sxXS91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYoU0RPcmVwb3J0VVVJRCA9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgICAgICBTRE9yZXBvcnRVVUlEID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ1wiKyBTRE9yZXBvcnRTZXRJZCArXCInXS9faWRcIixfV0ZJbnN0YW5jZSx7fSlbMF07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJleGVjdXRlUmVwb3J0XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic2RvUmVwb3J0VVVJRFwiOiBTRE9yZXBvcnRVVUlELFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZXBvcnRpbmdTRE9VVUlEXCI6IHJlcG9ydGluZ1NET1VVSUQsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFwcGxpY2F0aW9uSWRcIjogYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbW11bml0eUlkXCI6IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxlSWRcIjogYXBwLlNDT1BFLndvcmtmbG93LnByb2ZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInN1YlByb2Nlc3NVVUlEXCI6IHV1aWQgIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hY3Rpb24gPSBhY3Rpb247XG4gICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uICh3b3JrZXJTdWNjZXNzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgd29ya2VyLnNldFdvcmtlckluZm9JblN1YnByb2Nlc3Mod29ya2VyT2JqZWN0LCBfV0ZJbnN0YW5jZSwgdXVpZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ3JlcG9ydCBXb3JrZXIgcHJvY2Vzc2VkIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICh3b3JrZXJGYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh3b3JrZXJGYWlsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2VuZXJhdGVWaWV3OiBmdW5jdGlvbiAoZ2VuZXJhdGVWaWV3LCBfV0ZJbnN0YW5jZSwgdXVpZCkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IHdvcmtlci5nZXRXb3JrZXJXcmFwcGVyKCk7XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbW9tZW50KCkuZm9ybWF0KCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5wcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zdWJQcm9jZXNzVVVJRCA9IHV1aWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNoYW5uZWxzLnB1c2goXCJnZW5lcmF0ZVZpZXdcIik7ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHZhciBWaWV3Q29uZmlnU2V0SWQgPSBnZW5lcmF0ZVZpZXcuVmlld0NvbmZpZ1NldElkO1xuICAgICAgICAgICAgICAgIHZhciBWaWV3Q29uZmlnVVVJRCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pbmRpY2F0b3JzW2lkIGVxICdcIisgVmlld0NvbmZpZ1NldElkICtcIiddL2luc3RhbmNlc1sxXS91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJnZW5lcmF0ZVZpZXdcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2aWV3Q29uZmlnVVVJRFwiOiBWaWV3Q29uZmlnVVVJRCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYXBwbGljYXRpb25JZFwiOiBhcHAuU0NPUEUuYXBwbGljYXRpb25JZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tbXVuaXR5SWRcIjogYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBcInByb2ZpbGVJZFwiOiBhcHAuU0NPUEUud29ya2Zsb3cucHJvZmlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3ViUHJvY2Vzc1VVSURcIjogdXVpZCAgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24gKHdvcmtlclN1Y2Nlc3MpIHtcblxuICAgICAgICAgICAgICAgICAgICB3b3JrZXIuc2V0V29ya2VySW5mb0luU3VicHJvY2Vzcyh3b3JrZXJPYmplY3QsIF9XRkluc3RhbmNlLCB1dWlkKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygncmVwb3J0IFdvcmtlciBwcm9jZXNzZWQgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHdvcmtlckZhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdvcmtlckZhaWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICByZXF1ZXN0UmVwb3J0OiBmdW5jdGlvbiAocmVxdWVzdFJlcG9ydCwgX1dGSW5zdGFuY2UsIHV1aWQpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG1vbWVudCgpLmZvcm1hdCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZW5kZXJVc2VySWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QucHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc3ViUHJvY2Vzc1VVSUQgPSB1dWlkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jaGFubmVscy5wdXNoKFwicmVxdWVzdFJlcG9ydFwiKTsgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB2YXIgc2RvUmVxdWVzdFJlcG9ydFNldElkID0gcmVxdWVzdFJlcG9ydC5zZG9SZXF1ZXN0UmVwb3J0U2V0SWQ7XG4gICAgICAgICAgICAgICAgdmFyIHNkb1JlcG9ydENyZWF0aW9uU2V0SWQgPSByZXF1ZXN0UmVwb3J0LnNkb1JlcG9ydENyZWF0aW9uU2V0SWQ7XG4gICAgICAgICAgICAgICAgdmFyIHNkb1JlcXVlc3RSZXBvcnRVVUlEID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ1wiKyBzZG9SZXF1ZXN0UmVwb3J0U2V0SWQgK1wiJ10vaW5zdGFuY2VzWzFdL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICB2YXIgc2RvUmVwb3J0Q3JlYXRpb25VVUlEID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ1wiKyBzZG9SZXBvcnRDcmVhdGlvblNldElkICtcIiddL19pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIFwicmVxdWVzdFJlcG9ydFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInNkb1JlcXVlc3RSZXBvcnRVVUlEXCI6IHNkb1JlcXVlc3RSZXBvcnRVVUlELFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzZG9SZXBvcnRDcmVhdGlvblVVSURcIjogc2RvUmVwb3J0Q3JlYXRpb25VVUlELFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHBsaWNhdGlvbklkXCI6IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21tdW5pdHlJZFwiOiBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZmlsZUlkXCI6IGFwcC5TQ09QRS53b3JrZmxvdy5wcm9maWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJQcm9jZXNzVVVJRFwiOiB1dWlkICBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbiAod29ya2VyU3VjY2Vzcykge1xuXG4gICAgICAgICAgICAgICAgICAgIHdvcmtlci5zZXRXb3JrZXJJbmZvSW5TdWJwcm9jZXNzKHdvcmtlck9iamVjdCwgX1dGSW5zdGFuY2UsIHV1aWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdSZXF1ZXN0IHJlcG9ydCBXb3JrZXIgcHJvY2Vzc2VkIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICh3b3JrZXJGYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh3b3JrZXJGYWlsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIFxuXG5cblxuICAgIH1cblxufSkoKTtcblxudmFyIHdvcmtlciA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIGdldFdvcmtlcldyYXBwZXI6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgdmFyIHdyYXBwZXIgPSB7XG4gICAgICAgICAgICAgICAgXCJzb3VyY2VcIjogXCJyZW1vdGVcIixcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ3b3JrZXJPYmplY3RcIixcbiAgICAgICAgICAgICAgICBcIl9pZFwiOiBcIlwiLFxuICAgICAgICAgICAgICAgIFwiY2hhbm5lbHNcIjogW10sXG4gICAgICAgICAgICAgICAgXCJwcm9maWxlSWRcIjpcIlwiLFxuICAgICAgICAgICAgICAgIFwiY29tbXVuaXR5SWRcIjogXCJcIixcbiAgICAgICAgICAgICAgICBcImFwcGxpY2F0aW9uSWRcIjogXCJcIixcbiAgICAgICAgICAgICAgICBcInN1YlByb2Nlc3NVVUlEXCI6XCJcIixcbiAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJcIixcbiAgICAgICAgICAgICAgICBcIm1lc3NhZ2VUeXBlXCI6IFwiaW5mb1wiLFxuICAgICAgICAgICAgICAgIFwiY3JlYXRlZERhdGVUaW1lXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgXCJzZW5kZXJVc2VySWRcIjogXCJcIixcbiAgICAgICAgICAgICAgICBcImFjdGlvblwiOiB7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiB3cmFwcGVyO1xuXG4gICAgICAgIH0sXG4gICAgICAgIHNlbmQ6IGZ1bmN0aW9uICh3b3JrZXJPYmplY3QpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTdWJtaXR0aW5nIFdvcmtlciBPYmplY3QgdG8gc2VydmVyJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cod29ya2VyT2JqZWN0KTtcbiAgICAgICAgICAgICAgICBkYW8uc2F2ZSh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24gKHdvcmtlclJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUod29ya2VyUmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIHN1Ym1pdHRpbmcgd29ya2VyIHJlc3BvbnNlICEhJyArIGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2VuZFdvcmtlcjogZnVuY3Rpb24gKHdvcmtlckNvbmZpZywgX1dGSW5zdGFuY2UsIHV1aWQpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG1vbWVudCgpLmZvcm1hdCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZW5kZXJVc2VySWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QucHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc3ViUHJvY2Vzc1VVSUQgPSB1dWlkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jaGFubmVscy5wdXNoKFwic2VuZFdvcmtlclwiKTtcbiAgICAgICAgICAgICAgICB2YXIgcHJvY2Vzc0dldE5vZGVWYWx1ZSA9IGZ1bmN0aW9uKHBhcmFtQmxvY2ssIHNlcSwgcGFyYW1OYW1lKXtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXMsIHJlail7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGhlbHBlci5nZXROb2RlVmFsdWUocGFyYW1CbG9jaywgX1dGSW5zdGFuY2UsIHV1aWQpLnRoZW4oZnVuY3Rpb24gKGRhdGFWYWx1ZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICByZXMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VxXCI6c2VxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFyYW1OYW1lXCI6cGFyYW1OYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YVZhbHVlXCI6ZGF0YVZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlaihlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdmFyIHByb2Nlc3NQYXJhbXMgPSBmdW5jdGlvbihjb25maWdQYXJhbSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXMsIHJlail7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFyYW1ldGVyc0FycmF5ID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbXNUb1Byb2Nlc3MgPSBjb25maWdQYXJhbS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGk9MDsgaTxjb25maWdQYXJhbS5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmFtQmxvY2sgPSBjb25maWdQYXJhbVtpXS5wYXJhbWV0ZXJWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VxID0gY29uZmlnUGFyYW1baV0uc2VxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJhbU5hbWUgPSBjb25maWdQYXJhbVtpXS5wYXJhbWV0ZXJOYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJhbVZhbHVlID0gcHJvY2Vzc0dldE5vZGVWYWx1ZShwYXJhbUJsb2NrLCBzZXEsIHBhcmFtTmFtZSkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVyc0FycmF5LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZXFcIjogcmVzcG9uc2Uuc2VxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJhbU5hbWVcIjogcmVzcG9uc2UucGFyYW1OYW1lLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFyYW1WYWx1ZVwiOiByZXNwb25zZS5kYXRhVmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1RvUHJvY2Vzcy0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbXNUb1Byb2Nlc3MgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVyc0FycmF5LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VxXCI6IGl0ZW1zVG9Qcm9jZXNzKzEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJhbU5hbWVcIjogXCJjb21tdW5pdHlJZFwiLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmFtVmFsdWVcIjogX1dGSW5zdGFuY2UuY29tbXVuaXR5SWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzQXJyYXkucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZXFcIjogaXRlbXNUb1Byb2Nlc3MrMixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmFtTmFtZVwiOiBcImFwcGxpY2F0aW9uSWRcIiwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJhbVZhbHVlXCI6IF9XRkluc3RhbmNlLmFwcFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnNBcnJheS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlcVwiOiBpdGVtc1RvUHJvY2VzcyszLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFyYW1OYW1lXCI6IFwicHJvZmlsZUlkXCIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFyYW1WYWx1ZVwiOiBfV0ZJbnN0YW5jZS5wcm9maWxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVyc0FycmF5LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VxXCI6IGl0ZW1zVG9Qcm9jZXNzKzQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJhbU5hbWVcIjogXCJzdWJQcm9jZXNzVVVJRFwiLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmFtVmFsdWVcIjogdXVpZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcyhwYXJhbWV0ZXJzQXJyYXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1RvUHJvY2Vzcy0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbXNUb1Byb2Nlc3MgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVyc0FycmF5LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VxXCI6IGl0ZW1zVG9Qcm9jZXNzKzEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJhbU5hbWVcIjogXCJjb21tdW5pdHlJZFwiLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmFtVmFsdWVcIjogX1dGSW5zdGFuY2UuY29tbXVuaXR5SWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzQXJyYXkucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZXFcIjogaXRlbXNUb1Byb2Nlc3MrMixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmFtTmFtZVwiOiBcImFwcGxpY2F0aW9uSWRcIiwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJhbVZhbHVlXCI6IF9XRkluc3RhbmNlLmFwcFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnNBcnJheS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlcVwiOiBpdGVtc1RvUHJvY2VzcyszLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFyYW1OYW1lXCI6IFwicHJvZmlsZUlkXCIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFyYW1WYWx1ZVwiOiBfV0ZJbnN0YW5jZS5wcm9maWxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVyc0FycmF5LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VxXCI6IGl0ZW1zVG9Qcm9jZXNzKzQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJhbU5hbWVcIjogXCJzdWJQcm9jZXNzVVVJRFwiLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmFtVmFsdWVcIjogdXVpZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcyhwYXJhbWV0ZXJzQXJyYXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgdmFyIHR5cGUgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmKHdvcmtlckNvbmZpZy5yZXN0ICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbmZpZ1BhcmFtID0gd29ya2VyQ29uZmlnLnJlc3QucGFyYW1ldGVycztcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc1BhcmFtcyhjb25maWdQYXJhbSkudGhlbihmdW5jdGlvbihwYXJhbXNBcnJheSl7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aW9uPXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlbmRXb3JrZXJcIjp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVzdFwiOntcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5zZW5kV29ya2VyLnJlc3QudXJpID0gd29ya2VyQ29uZmlnLnJlc3QudXJpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLnNlbmRXb3JrZXIucmVzdC5wcm9maWxJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24uc2VuZFdvcmtlci5yZXN0LnBhcmFtZXRlcnMgPSBwYXJhbXNBcnJheTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbiAod29ya2VyU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3BPYmplY3QgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiKyB1dWlkICtcIiddXCIsX1dGSW5zdGFuY2Use30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwT2JqZWN0LnNwU3RhdHVzID0gJ3N1Ym1pdHRlZCc7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzcE9iamVjdC5tZXNzYWdlcyA9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcE9iamVjdC5tZXNzYWdlcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGVuZGluZ1N1Ym1pc3Npb25PYmplY3QgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaTE4blwiOntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIl9pZFwiOlwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJlblwiOiBcIlNlcnZlciByZXF1ZXN0IGlzIHBlbmRpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInB0XCI6IFwiU2VydmVyIHJlcXVlc3QgaXMgcGVuZGluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOlwiaW5mb1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcE9iamVjdC5tZXNzYWdlcy5wdXNoKHBlbmRpbmdTdWJtaXNzaW9uT2JqZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3b3JrZXIgaWQgaGVyZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNwT2JqZWN0LndvcmtlcnMgPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BPYmplY3Qud29ya2VycyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcE9iamVjdC53b3JrZXJzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIndvcmtlcklkXCI6IHdvcmtlck9iamVjdC5faWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0ZVRpbWVcIjogbW9tZW50KCkuZm9ybWF0KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNpc3REYXRhKCdzdWJwcm9jZXNzZXMnLCBhcHAuU0NPUEUud29ya2Zsb3csIHV1aWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oc2F2ZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1dvcmtlciBSZXN0IHByb2Nlc3NlZCBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihmYWlsZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnV29ya2VyIHN1Ym1pdHRlZCBzdWJwcm9jZXNzIGZpbGUgdXBkYXRlIGZhaWxlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFpbGVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHdvcmtlckZhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnV29ya2VyIGZhaWxlZCAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB9LGZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInBhcmFtZXRlciBjcmVhdGlvbiBmYWlsZWQuIEFib3JkaW5nIHdvcmtlciBvYmplY3RcIik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICB9IGVsc2UgaWYod29ya2VyQ29uZmlnLmZ1bmN0aW9uYWwgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICB2YXIgY29uZmlnUGFyYW0gPSB3b3JrZXJDb25maWcuZnVuY3Rpb25hbC5wYXJhbWV0ZXJzO1xuICAgICAgICAgICAgICAgICAgIHByb2Nlc3NQYXJhbXMoY29uZmlnUGFyYW0pLnRoZW4oZnVuY3Rpb24ocGFyYW1zQXJyYXkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlbmRXb3JrZXJcIjp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZnVuY3Rpb25hbFwiOntcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5zZW5kV29ya2VyLmZ1bmN0aW9uYWwubWV0aG9kTmFtZSA9IHdvcmtlckNvbmZpZy5mdW5jdGlvbmFsLm1ldGhvZE5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24uc2VuZFdvcmtlci5mdW5jdGlvbmFsLnByb2ZpbElkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5zZW5kV29ya2VyLmZ1bmN0aW9uYWwucGFyYW1ldGVycyA9IHBhcmFtc0FycmF5O1xuICAgICAgICAgICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbiAod29ya2VyU3VjY2Vzcykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNwT2JqZWN0ID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIisgdXVpZCArXCInXVwiLF9XRkluc3RhbmNlLHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcE9iamVjdC5zcFN0YXR1cyA9ICdzdWJtaXR0ZWQnO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc3BPYmplY3QubWVzc2FnZXMgPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BPYmplY3QubWVzc2FnZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBlbmRpbmdTdWJtaXNzaW9uT2JqZWN0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImkxOG5cIjp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJfaWRcIjpcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZW5cIjogXCJTZXJ2ZXIgcmVxdWVzdCBpcyBwZW5kaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwdFwiOiBcIlNlcnZlciByZXF1ZXN0IGlzIHBlbmRpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjpcImluZm9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BPYmplY3QubWVzc2FnZXMucHVzaChwZW5kaW5nU3VibWlzc2lvbk9iamVjdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd29ya2VyIGlkIGhlcmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzcE9iamVjdC53b3JrZXJzID09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwT2JqZWN0LndvcmtlcnMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BPYmplY3Qud29ya2Vycy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ3b3JrZXJJZFwiOiB3b3JrZXJPYmplY3QuX2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRhdGVUaW1lXCI6IG1vbWVudCgpLmZvcm1hdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJzaXN0RGF0YSgnc3VicHJvY2Vzc2VzJywgYXBwLlNDT1BFLndvcmtmbG93LCB1dWlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHNhdmVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdXb3JrZXIgZnVuY3Rpb25hbCBwcm9jZXNzZWQgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZmFpbGVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1dvcmtlciBzdWJtaXR0ZWQgc3VicHJvY2VzcyBmaWxlIHVwZGF0ZSBmYWlsZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGZhaWxlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAod29ya2VyRmFpbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdXb3JrZXIgZmFpbGVkICcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCh3b3JrZXJGYWlsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH0sZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGFyYW1ldGVyIGNyZWF0aW9uIGZhaWxlZC4gQWJvcmRpbmcgd29ya2VyIG9iamVjdFwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIGV4ZWN1dGVMb2NhbDogZnVuY3Rpb24gKHdvcmtlckNvbmZpZywgX1dGSW5zdGFuY2UsIHV1aWQpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgIHZhciBwcm9jZXNzR2V0Tm9kZVZhbHVlID0gZnVuY3Rpb24ocGFyYW1CbG9jaywgc2VxLCBkYXRhVHlwZSl7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzLCByZWope1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWxwZXIuZ2V0Tm9kZVZhbHVlKHBhcmFtQmxvY2ssIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uIChkYXRhVmFsdWUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlcVwiOiBzZXEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRhVHlwZVwiOiBkYXRhVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRhdGFWYWx1ZVwiOiBkYXRhVmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHZhciBwcm9jZXNzUGFyYW1zID0gZnVuY3Rpb24oY29uZmlnUGFyYW0pIHtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzLCByZWope1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmFtZXRlcnNBcnJheSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW1zVG9Qcm9jZXNzID0gY29uZmlnUGFyYW0ubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBpPTA7IGk8Y29uZmlnUGFyYW0ubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJhbUJsb2NrID0gY29uZmlnUGFyYW1baV0ucGFyYW1ldGVyVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlcSA9IGNvbmZpZ1BhcmFtW2ldLnNlcTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YVR5cGUgPSBjb25maWdQYXJhbVtpXS5kYXRhVHlwZS5kYXRhVHlwZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFyYW1WYWx1ZSA9IHByb2Nlc3NHZXROb2RlVmFsdWUocGFyYW1CbG9jaywgc2VxLCBkYXRhVHlwZSkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVyc0FycmF5LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZXFcIjogcmVzcG9uc2Uuc2VxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRhVHlwZVwiOiByZXNwb25zZS5kYXRhVHlwZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmFtVmFsdWVcIjogcmVzcG9uc2UuZGF0YVZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNUb1Byb2Nlc3MtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zVG9Qcm9jZXNzID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcyhwYXJhbWV0ZXJzQXJyYXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1RvUHJvY2Vzcy0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbXNUb1Byb2Nlc3MgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzKHBhcmFtZXRlcnNBcnJheSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB2YXIgZml4UGFyYW1UeXBlID0gZnVuY3Rpb24ocGFyYW1WYWx1ZSwgZGF0YVR5cGUpe1xuXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZGF0YVR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHh0ID0gcGFyYW1WYWx1ZS5yZXBsYWNlKC8nL2csIFwiXFxcXCdcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiJ1wiICsgdHh0ICsgXCInXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZGF0ZVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImRhdGVUaW1lXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiJ1wiICsgcGFyYW1WYWx1ZSArIFwiJ1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm51bWJlclwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImRlY2ltYWxcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gIHBhcmFtVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgdmFyIG1ldGhvZE5hbWUgPSB3b3JrZXJDb25maWcubWV0aG9kTmFtZTtcbiAgICAgICAgICAgICAgICB2YXIgY29uZmlnUGFyYW0gPSB3b3JrZXJDb25maWcucGFyYW1ldGVycztcbiAgICAgICAgICAgICAgICBwcm9jZXNzUGFyYW1zKGNvbmZpZ1BhcmFtKS50aGVuKGZ1bmN0aW9uKHBhcmFtc0FycmF5KXtcbiAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBMaXN0ID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9MDsgaTwgcGFyYW1zQXJyYXkubGVuZ3RoLTE7IGkrKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBwTGlzdCA9IHBMaXN0ICsgZml4UGFyYW1UeXBlKHBhcmFtc0FycmF5W2ldLnBhcmFtVmFsdWUscGFyYW1zQXJyYXlbaV0uZGF0YVR5cGUpICsgJywnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHBMaXN0ID0gcExpc3QgKyBmaXhQYXJhbVR5cGUocGFyYW1zQXJyYXlbaV0ucGFyYW1WYWx1ZSwgcGFyYW1zQXJyYXlbaV0uZGF0YVR5cGUpXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB2YXIgY2FsbGJhY2tTdWNjZXNzID0gZnVuY3Rpb24oKSB7IFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoXCJGdW5jdGlvbiAnXCIrIG1ldGhvZE5hbWUgKyBcIicgZXhlY3V0ZWQuIFJlc3BvbnNlIHN1Y2Nlc3MuXCIpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2FsbGJhY2tGYWlsdXJlID0gZnVuY3Rpb24oKSB7IFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChcIkZ1bmN0aW9uICdcIisgbWV0aG9kTmFtZSArIFwiJyBleGVjdXRlZC4gUmVzcG9uc2UgZmFpbGVkLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfTsgICAgXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB2YXIgZnVuYyA9IG1ldGhvZE5hbWUrJygnKyBwTGlzdCArJyxjYWxsYmFja1N1Y2Nlc3MsIGNhbGxiYWNrRmFpbHVyZSknO1xuICAgICAgICAgICAgICAgICAgICBldmFsKGZ1bmMpO1xuICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgIH0sZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwYXJhbWV0ZXIgY3JlYXRpb24gZmFpbGVkLiBBYm9yZGluZyB3b3JrZXIgb2JqZWN0XCIpO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIHNldFdvcmtlckluZm9JblN1YnByb2Nlc3M6IGZ1bmN0aW9uKHdvcmtlck9iamVjdCwgX1dGSW5zdGFuY2UsIHV1aWQgKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBzdWJwcm9jZXNzT2JqZWN0ID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIisgdXVpZCArXCInXVwiLCBfV0ZJbnN0YW5jZSAsIHt9KVswXTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBwZW5kaW5nU3VibWlzc2lvbk9iamVjdCA9IHtcbiAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjp7XG4gICAgICAgICAgICAgICAgICAgIFwiaTE4blwiOntcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiX2lkXCI6XCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZW5cIjogXCJXb3JrZXIgc3VibWl0dGVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInB0XCI6IFwiV29ya2VyIHN1Ym1pdHRlZFwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOlwiaW5mb1wiXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc3VicHJvY2Vzc09iamVjdC5tZXNzYWdlcyA9IFtdO1xuICAgICAgICAgICAgc3VicHJvY2Vzc09iamVjdC5tZXNzYWdlcy5wdXNoKHBlbmRpbmdTdWJtaXNzaW9uT2JqZWN0KTtcblxuICAgICAgICAgICAgaWYoc3VicHJvY2Vzc09iamVjdC53b3JrZXJzID09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgc3VicHJvY2Vzc09iamVjdC53b3JrZXJzID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdWJwcm9jZXNzT2JqZWN0LndvcmtlcnMucHVzaCh7XG4gICAgICAgICAgICAgICAgXCJ3b3JrZXJJZFwiOiB3b3JrZXJPYmplY3QuX2lkLFxuICAgICAgICAgICAgICAgIFwiZGF0ZVRpbWVcIjogbW9tZW50KCkuZm9ybWF0KClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgfVxuXG59KSgpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gICAgY29tbXVuaXR5OiBjb21tdW5pdHksXG4gICAgYXBwbGljYXRpb246IGFwcGxpY2F0aW9uLFxuICAgIHBlcmZvcm1hbmNlOiBwZXJmb3JtYW5jZSxcbiAgICB3b3JrZXI6IHdvcmtlcixcbiAgICBzZG86IHNkbyxcbiAgICB0YXhvbm9teTogdGF4b25vbXksXG4gICAgc3ViUHJvY2Vzc0luc3RhbmNlOiBzdWJQcm9jZXNzSW5zdGFuY2UsXG4gICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgbm90aWZpY2F0aW9uOiBub3RpZmljYXRpb24sXG4gICAgcmVwb3J0OnJlcG9ydFxufSIsIid1c2Ugc3RyaWN0JztcblxuLy92YXIgZ2F0ZWtlZXBlciA9IHJlcXVpcmUoJy4uL2Jvd2VyX2NvbXBvbmVudHMvZ2F0ZWtlZXBlcicpO1xudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsaXR5Jyk7XG5cbi8vIHZhciB1dWlkID0gcmVxdWlyZSgnbm9kZS11dWlkJyk7XG5cbnZhciBnYXRla2VlcGVyID0gbmV3IEdLKCk7XG5cbi8qKlxuICogRm9ybSBNb2R1bGVcbiAqXG4gKiBAbW9kdWxlIGxpYi9mb3JtXG4gKiBAYXV0aG9yIEJyZW50IEdvcmRvblxuICogQHZlcnNpb24gMi4wLjBcbiAqIEBkZXNjcmlwdGlvbiB0ZXN0IGRlc2NyaXB0aW9uXG4gKiBAY29weXJpZ2h0IEt3YW50dSBMdGQgUlNBIDIwMDktMjAxNS5cbiAqXG4gKi9cblxuZnVuY3Rpb24gY3JlYXRlKGFyZ3MpIHtcblxuICAgIHZhciBwcm9jZXNzSWQgPSBhcmdzWzBdIHx8ICcnO1xuXG4gICAgdmFyIHN1YlByb2Nlc3MgPSBhcmdzWzFdIHx8IHt9O1xuXG4gICAgdmFyIHN0ZXAgPSBhcmdzWzJdIHx8IHt9O1xuXG4gICAgdmFyIGFjdGlvbiA9IGFyZ3NbM10gfHwge307XG5cbiAgICB2YXIgX1dGSW5zdGFuY2UgPSBhcmdzWzZdIHx8IHt9O1xuXG4gICAgdmFyIGRhdGEgPSBhcmdzWzZdIHx8IHt9O1xuXG4gICAgdmFyIGluZGljYXRvcnMgPSBzdWJQcm9jZXNzLmluZGljYXRvcnMgfHwgW107XG5cbiAgICB2YXIgcmVzdWx0ID0gW107XG5cbiAgICB2YXIgaW5kaWNhdG9yVHlwZSA9IGFjdGlvbi5fdHlwZTtcblxuICAgIHZhciBwcm9jZXNzU2VxID0gYXJnc1s0XSB8fCAnJztcblxuICAgIHZhciBzdWJQcm9jZXNzU2VxID0gYXJnc1s1XSB8fCAnJztcblxuICAgIHZhciBjcmVhdGVUeXBlID0gYXJnc1s3XSB8fCAnJztcblxuICAgIHZhciBzdWJQcm9jZXNzSWQgPSBzdWJQcm9jZXNzLl9pZDtcblxuICAgIHZhciB1dWlkID0gYXJnc1s4XSB8fCAnJztcblxuICAgIHZhciBiYXNlVVVJRCA9IGFyZ3NbOV0gfHwgJyc7XG5cbiAgICB2YXIgcHJvZmlsZSA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XG5cbiAgICB2YXIgaW5wdXREYXRhID0gYXJnc1sxMF0gfHwge307XG5cbiAgICB2YXIgZm9ybUNyZWF0ZVR5cGUgPSBhY3Rpb24ubWV0aG9kLmZvcm0uY3JlYXRlO1xuXG4gICAgdmFyIGZvcm1UeXBlID0gYWN0aW9uLm1ldGhvZC5mb3JtLnR5cGU7XG5cbiAgICB2YXIgcGFyYW1PYmplY3QgPSB7XG5cbiAgICAgICAgXCJmb3JtQ3JlYXRlVHlwZVwiOiBmb3JtQ3JlYXRlVHlwZSxcbiAgICAgICAgXCJmb3JtVHlwZVwiOiBmb3JtVHlwZVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgdG9Qcm9jZXNzID0gaW5kaWNhdG9ycy5sZW5ndGg7XG5cbiAgICAgICAgdmFyIHN1YnByb2Nlc3NUeXBlID0gSlNPTi54cGF0aChcIi9jb25maWcvcHJvY2Vzc2VzL3N1YlByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3ViUHJvY2Vzc0lkICsgXCInXS90eXBlXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG5cbiAgICAgICAgdmFyIGZvcm1DcmVhdGVGbiA9IGZ1bmN0aW9uKGluZGljYXRvclR5cGUsIGluZGljYXRvcklkLCB2YWxpZERhdGUsIGluc3RhbnRpYXRlU291cmNlKSB7XG5cbiAgICAgICAgICAgIGdhdGVrZWVwZXIuaW5zdGFudGlhdGUoYmFzZVVVSUQsIGluZGljYXRvclR5cGUsIGluZGljYXRvcklkLCBfV0ZJbnN0YW5jZS5wcm9maWxlLCB2YWxpZERhdGUsIHN1YlByb2Nlc3NJZCwgc3VicHJvY2Vzc1R5cGUpLnRoZW4oZnVuY3Rpb24oZG9jQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGluZGljYXRvciB3b3JrZmxvdyBwcm9jZXNzZXMgc2VjdGlvblxuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkb2NBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgb2JqZWN0ID0gZG9jQXJyYXlbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmICghb2JqZWN0Lm1vZGVsLl9pZC5lbmRzV2l0aCgnOmFwcHJvdmVkJykgJiYgIW9iamVjdC5tb2RlbC5faWQuZW5kc1dpdGgoJzpyZWplY3RlZCcpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3b3JrZmxvd09iaiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IF9XRkluc3RhbmNlLmNvbmZpZy5faWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbnN0YW5jZVwiOiBfV0ZJbnN0YW5jZS5pbnN0YW5jZS5faWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9jZXNzZXNcIjogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBwcm9jZXNzSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3ViUHJvY2Vzc0lkXCI6IHN1YlByb2Nlc3MuX2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN1YlByb2Nlc3NVVUlEXCI6IHV1aWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3RlcFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IHN0ZXAuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlcVwiOiBzdGVwLnNlcSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3RhcnREYXRlXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0YXR1c1wiOiBzdGVwLnN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBzdGVwLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFzc2lnbmVkVG9cIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlcklkXCI6IHN0ZXAuYXNzaWduZWRUby51c2VySWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IHN0ZXAuYXNzaWduZWRUby5uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21tZW50XCI6IHN0ZXAuY29tbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tcGxldGVcIjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImVuZERhdGVcIjogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uLnNldFdvcmtmbG93TGFiZWxJblRpdGxlICE9IHVuZGVmaW5lZCAmJiBhY3Rpb24uc2V0V29ya2Zsb3dMYWJlbEluVGl0bGUgIT0gJycgJiYgYWN0aW9uLnNldFdvcmtmbG93TGFiZWxJblRpdGxlID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3QubW9kZWwudGl0bGUgPSBpbnB1dERhdGEubGFiZWw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24uc2V0RHJhZnQgIT0gdW5kZWZpbmVkICYmIGFjdGlvbi5zZXREcmFmdCAhPSAnJyAmJiBhY3Rpb24uc2V0RHJhZnQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdC5tb2RlbC5jb250cm9sLmRyYWZ0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0Lm1vZGVsLndvcmtmbG93cy5wdXNoKHdvcmtmbG93T2JqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYWluSWQgPSBvYmplY3QubW9kZWwuX2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcGVyc2lzdCB2aWEgZ2sgc28gdGhhdCBpdCBpcyBzYXZlIGluIGNvdWNoXG4gICAgICAgICAgICAgICAgICAgICAgICBnYXRla2VlcGVyLnBlcnNpc3QoZG9jQXJyYXkpLnRoZW4oZnVuY3Rpb24oc2F2ZWRBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdXNpbmcgc2FtZSBpZCBjYWxsIGluaXRpYWxpc2VEYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jYWxsIGNvZGUgdG8gc2V0IHRvIHNldEluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGFvLmdldChtYWluSWQpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3JNb2RlbCA9IGtvLm1hcHBpbmcuZnJvbUpTKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGVmYXVsdE1vZGVsXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNldElkXCI6IGluZGljYXRvcklkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhdGVrZWVwZXIuaW5zdGFudGlhdGVEYXRhKG1haW5JZCwgaW5zdGFudGlhdGVTb3VyY2UsIGluZGljYXRvck1vZGVsLCBkYXRhLm1vZGVsLnBlbmRpbmcuc2VxLCBwYXJhbU9iamVjdCkudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVswXS5zdGF0dXMgPT0gXCIyMDBcIikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGlvbi5zZXRXb3JrZmxvd0xhYmVsSW5GaWVsZCAhPSB1bmRlZmluZWQgJiYgYWN0aW9uLnNldFdvcmtmbG93TGFiZWxJbkZpZWxkICE9ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhc3NpZ25tZW50U2V0SWQgPSBhY3Rpb24uc2V0V29ya2Zsb3dMYWJlbEluRmllbGQuc3BsaXQoXCIuXCIpWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXNzaWdubWVudFNldElkID09IGluZGljYXRvcklkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0eHQgPSBpbnB1dERhdGEubGFiZWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3F1b3RlID0gdHh0LnJlcGxhY2UoLycvZywgXCJcXFxcJ1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXRoID0gXCJkYXRhWzBdLm1vZGVsLm1vZGVsLnBlbmRpbmcuZGF0YS5cIiArIGFjdGlvbi5zZXRXb3JrZmxvd0xhYmVsSW5GaWVsZCArIFwiPSdcIiArIHNxdW90ZSArIFwiJ1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZhbChwYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2F0ZWtlZXBlci5wZXJzaXN0KGRhdGEpLnRoZW4oZnVuY3Rpb24oc2F2ZWRBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYW8uZ2V0KG1haW5JZCkudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b1Byb2Nlc3MtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9Qcm9jZXNzID09IDApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJzaXN0RGF0YSgnaW5kaWNhdG9ycycsIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGNyZWF0ZSBpbmRpY2F0b3IgcGVyc2lzdCBzdWNjZXNzLicsIF9XRkluc3RhbmNlLmluZGljYXRvcnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmYWlsdXJlID0gdXRpbC5zdWNjZXNzKCdGb3JtIGNyZWF0ZSBpbmRpY2F0b3IgcGVyc2lzdCBmYWlsZWQuJyArIGVyclswXS5tZXNzYWdlLCB7fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFpbHVyZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IF9XRkluc3RhbmNlLmluZGljYXRvcnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3IgPSBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGljYXRvci5faWQgPT0gZGF0YS5faWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgY3VycmVudCBpdGVtIGZyb20gdGhlIGFycmF5IGFuZCBhZGQgdGhlIHVwZGF0ZWQgcHJvY2Vzc01vZGVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b1Byb2Nlc3MtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b1Byb2Nlc3MgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNpc3REYXRhKCdpbmRpY2F0b3JzJywgX1dGSW5zdGFuY2UsIHV1aWQpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGNyZWF0ZSBpbmRpY2F0b3IgcGVyc2lzdCBzdWNjZXNzLicsIF9XRkluc3RhbmNlLmluZGljYXRvcnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmYWlsdXJlID0gdXRpbC5zdWNjZXNzKCdGb3JtIGNyZWF0ZSBpbmRpY2F0b3IgcGVyc2lzdCBmYWlsZWQuJyArIGVyclswXS5tZXNzYWdlLCB7fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChmYWlsdXJlKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm91bmQgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5wdXNoKGRhdGEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvUHJvY2Vzcy0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9Qcm9jZXNzID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNpc3REYXRhKCdpbmRpY2F0b3JzJywgX1dGSW5zdGFuY2UsIHV1aWQpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnRm9ybSBjcmVhdGUgaW5kaWNhdG9yIHBlcnNpc3Qgc3VjY2Vzcy4nLCBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmFpbHVyZSA9IHV0aWwuc3VjY2VzcygnRm9ybSBjcmVhdGUgaW5kaWNhdG9yIHBlcnNpc3QgZmFpbGVkLicgKyBlcnJbMF0ubWVzc2FnZSwge30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChmYWlsdXJlKTtcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZhaWx1cmUgPSB1dGlsLnN1Y2Nlc3MoJzEgR2F0ZWtlZXBlciBpbml0aWFsaXNhdGlvbiBmYWlsZWQgd2l0aCBpbml0aWFsaXNlRGF0YSBtZXNzYWdlICcgKyBlcnJbMF0ubWVzc2FnZSwge30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGZhaWx1cmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmYWlsdXJlID0gdXRpbC5zdWNjZXNzKCcyIEdhdGVrZWVwZXIgaW5pdGlhbGlzYXRpb24gZmFpbGVkIHdpdGggaW5pdGlhbGlzZURhdGEgbWVzc2FnZSAnICsgZXJyWzBdLm1lc3NhZ2UsIHt9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGZhaWx1cmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmYWlsdXJlID0gdXRpbC5zdWNjZXNzKCczIEdhdGVrZWVwZXIgaW5pdGlhbGlzYXRpb24gZmFpbGVkIHdpdGggaW5pdGlhbGlzZURhdGEgbWVzc2FnZSAnICsgZXJyWzBdLm1lc3NhZ2UsIHt9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFpbHVyZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmFpbHVyZSA9IHV0aWwuc3VjY2VzcygnNCBHYXRla2VlcGVyIGluaXRpYWxpc2F0aW9uIGZhaWxlZCB3aXRoIGluaXRpYWxpc2VEYXRhIG1lc3NhZ2UgJyArIGVyclswXS5tZXNzYWdlLCB7fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFpbHVyZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZhaWx1cmUgPSB1dGlsLnN1Y2Nlc3MoJzUgR2F0ZWtlZXBlciBpbml0aWFsaXNhdGlvbiBmYWlsZWQgd2l0aCBpbml0aWFsaXNlRGF0YSBtZXNzYWdlICcgKyBlcnJbMF0ubWVzc2FnZSwge30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFpbHVyZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmFpbHVyZSA9IHV0aWwuc3VjY2VzcygnNiBHYXRla2VlcGVyIGluaXRpYWxpc2F0aW9uIGZhaWxlZCB3aXRoIGluaXRpYWxpc2VEYXRhIG1lc3NhZ2UgJyArIGVyclswXS5tZXNzYWdlLCB7fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGZhaWx1cmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgdG9BZGRQcm9jZXNzID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfV0ZJbnN0YW5jZS5pbnN0YW5jZS5wcm9jZXNzZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9XRkluc3RhbmNlLmluc3RhbmNlLnByb2Nlc3Nlc1tpXS5zdWJQcm9jZXNzZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9BZGRQcm9jZXNzLnB1c2goX1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzID0gW107XG4gICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzID0gdG9BZGRQcm9jZXNzO1xuXG4gICAgICAgICAgICAgICAgdmFyIHRvQWRkU3ViUHJvY2VzcyA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXNbaV0uaW5kaWNhdG9ycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b0FkZFN1YlByb2Nlc3MucHVzaChfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXNbaV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMgPSBbXTtcbiAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMgPSB0b0FkZFN1YlByb2Nlc3M7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgdmFyIGZhaWx1cmUgPSB1dGlsLnN1Y2Nlc3MoJzcgR2F0ZWtlZXBlciBpbml0aWFsaXNhdGlvbiBmYWlsZWQgd2l0aCBpbml0aWFsaXNlRGF0YSBtZXNzYWdlICcgKyBlcnJbMF0ubWVzc2FnZSwge30pO1xuICAgICAgICAgICAgICAgIHJlamVjdChmYWlsdXJlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBpbnN0YW50aWF0ZVNvdXJjZSA9IEZST01fREVGSU5JVElPTjtcblxuICAgICAgICBmb3IgKHZhciBjb3VudGVyID0gMDsgY291bnRlciA8IGluZGljYXRvcnMubGVuZ3RoOyBjb3VudGVyKyspIHtcbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JJZCA9IGluZGljYXRvcnNbY291bnRlcl0uX2lkO1xuICAgICAgICAgICAgdmFyIGluZGljYXRvck5hbWUgPSB1dGlsLmdldE5hbWUoaW5kaWNhdG9yc1tjb3VudGVyXS5uYW1lLCAnZW4nKTtcblxuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IGluZGljYXRvcnNbY291bnRlcl0uaW5pdGlhdGVEYXRhO1xuXG4gICAgICAgICAgICB2YXIgaW5pdFR5cGUgPSAnJztcbiAgICAgICAgICAgIGlmIChzdWJQcm9jZXNzLmluc3RhbmNlVHlwZS5uZXdTZXF1ZW5jZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpbml0VHlwZSA9IElOU1RBTkNFX1RZUEVfTkVXX1NFUTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3ViUHJvY2Vzcy5pbnN0YW5jZVR5cGUubmV3SW5zdGFuY2UgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaW5pdFR5cGUgPSBJTlNUQU5DRV9UWVBFX05FV19JTlM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JEb2MgPSB7fTtcbiAgICAgICAgICAgIGlmIChiYXNlVVVJRCAhPSB1bmRlZmluZWQgJiYgYmFzZVVVSUQgIT0gJycgJiYgYmFzZVVVSUQubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHNwID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIGJhc2VVVUlEICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKHN1YlByb2Nlc3MucGVyaW9kVHlwZS5wZXJpb2RpYyA9PSB1bmRlZmluZWQpe1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKGJhc2VVVUlEICE9IHV1aWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3AuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpbnN0YW50aWF0ZVNvdXJjZSA9IEZST01fQVVUSE9SSVNFRDtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgY2FyZGluYWxpdHkgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbc2V0SWQgZXEgJ1wiICsgaW5kaWNhdG9ySWQgKyBcIiddL2NhcmRpbmFsaXR5XCIsIGFwcC5TQ09QRS5BUFBfQ09ORklHLCB7fSlbMF07XG5cbiAgICAgICAgICAgICAgICBpZiAoaW5pdFR5cGUgPT0gSU5TVEFOQ0VfVFlQRV9ORVdfSU5TKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhcmRpbmFsaXR5ID09IElORElDQVRPUl9DQVJESU5BTElUWV9TSU5HTEUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGV4aXN0aW5nVVVJRCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdcIiArIGluZGljYXRvcklkICsgXCInXS9faWRcIiwgX1dGSW5zdGFuY2UsIHt9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV4aXN0aW5nVVVJRC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFudGlhdGVTb3VyY2UgPSBGUk9NX0FVVEhPUklTRUQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbnRpYXRlU291cmNlID0gRlJPTV9ERUZJTklUSU9OO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFudGlhdGVTb3VyY2UgPSBGUk9NX0RFRklOSVRJT047XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhcmRpbmFsaXR5ID09IElORElDQVRPUl9DQVJESU5BTElUWV9TSU5HTEUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGV4aXN0aW5nVVVJRCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdcIiArIGluZGljYXRvcklkICsgXCInXS9faWRcIiwgYXBwLlNDT1BFLndvcmtmbG93LCB7fSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChleGlzdGluZ1VVSUQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbnRpYXRlU291cmNlID0gRlJPTV9BVVRIT1JJU0VEO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW50aWF0ZVNvdXJjZSA9IEZST01fREVGSU5JVElPTjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXRoID0gXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdcIiArIGluZGljYXRvcklkICsgXCInIGFuZCBpZCA9IC9zdWJwcm9jZXNzZXNbaWQgPSAnXCIgKyBzdWJQcm9jZXNzSWQgKyBcIiddL2luZGljYXRvcnMvaW5zdGFuY2VzL3V1aWRdL19pZFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhcnQgPSBsaWJyYXJ5LmdldFN1YnByb2ZpbGVTdWJwcm9jZXNzSWRzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3VicHJvY2Vzc1R5cGUgPT0gUFJPQ0VTU19UWVBFX1NVQlBST0ZJTEUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoID0gXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdcIiArIGluZGljYXRvcklkICsgXCInIGFuZCBpZCA9IC9zdWJwcm9jZXNzZXNbaWQgPSAnXCIgKyBzdWJQcm9jZXNzSWQgKyBcIicgYW5kIGlkID0gXCIrcGFydCtcIl0vaW5kaWNhdG9ycy9pbnN0YW5jZXMvdXVpZF0vX2lkXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXhpc3RpbmdVVUlEID0gSlNPTi54cGF0aChwYXRoLCBfV0ZJbnN0YW5jZSwge30pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmdVVUlELmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW50aWF0ZVNvdXJjZSA9IEZST01fQVVUSE9SSVNFRDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFudGlhdGVTb3VyY2UgPSBGUk9NX0RFRklOSVRJT047XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cblxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvcm1DcmVhdGVGbihpbml0VHlwZSwgaW5kaWNhdG9ySWQsICcnLCBpbnN0YW50aWF0ZVNvdXJjZSk7XG4gICAgICAgIH1cblxuICAgIH0pO1xufTtcblxuZnVuY3Rpb24gc2V0SW5zdGFuY2VUaXRsZShhcmdzKSB7XG5cbiAgICB2YXIgX1dGSW5zdGFuY2UgPSBhcmdzWzBdIHx8IHt9O1xuXG4gICAgdmFyIHV1aWQgPSBhcmdzWzJdIHx8ICcnO1xuICAgIHZhciBkYXRhID0gYXJnc1s0XSB8fCB7fTtcblxuICAgIHZhciB0aXRsZSA9IGRhdGEubGFiZWw7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgdmFyIHN1YlByb2Nlc3NJbnN0YW5jZSA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICB2YXIgaW5kaWNhdG9ySW5zdGFuY2VzID0gc3ViUHJvY2Vzc0luc3RhbmNlLmluZGljYXRvcnM7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbmRpY2F0b3JJbnN0YW5jZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JVVUlEID0gaW5kaWNhdG9ySW5zdGFuY2VzW2ldLmluc3RhbmNlc1swXS51dWlkO1xuICAgICAgICAgICAgdmFyIGluZGljYXRvckluc3RhbmNlID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW19pZCBlcSAnXCIgKyBpbmRpY2F0b3JVVUlEICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgaW5kaWNhdG9ySW5zdGFuY2UudGl0bGUgPSBpbmRpY2F0b3JJbnN0YW5jZXNbaV0uaWQgKyAnICcgKyB0aXRsZTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXNvbHZlKFwiU2V0IFRpdGxlIFN1Y2Nlc3NcIiwgaW5kaWNhdG9ySW5zdGFuY2VzKTtcblxuICAgIH0pO1xuXG59O1xuXG5mdW5jdGlvbiBkZWxldGVQcm9maWxlKGFyZ3MpIHtcblxuICAgIHZhciBfV0ZJbnN0YW5jZSA9IGFyZ3NbMF0gfHwge307XG5cbiAgICB2YXIgcHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0ge1xuICAgICAgICAgICAgXCJzb3VyY2VcIjogXCJyZW1vdGVcIixcbiAgICAgICAgICAgIFwidHlwZVwiOiBcIndvcmtlck9iamVjdFwiLFxuICAgICAgICAgICAgXCJfaWRcIjogZ2VuZXJhdGVVVUlEKCksXG4gICAgICAgICAgICBcImNoYW5uZWxzXCI6IFtcImRlbGV0ZVByb2ZpbGVcIl0sXG4gICAgICAgICAgICBcImNvbW11bml0eUlkXCI6IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpLFxuICAgICAgICAgICAgXCJhcHBsaWNhdGlvbklkXCI6IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkLFxuICAgICAgICAgICAgXCJwcm9maWxlSWRcIjogX1dGSW5zdGFuY2UucHJvZmlsZSxcbiAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIlwiLFxuICAgICAgICAgICAgXCJtZXNzYWdlVHlwZVwiOiBcImluZm9cIixcbiAgICAgICAgICAgIFwiY3JlYXRlZERhdGVUaW1lXCI6IG1vbWVudCgpLmZvcm1hdCgpLFxuICAgICAgICAgICAgXCJzZW5kZXJVc2VySWRcIjogTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQsXG4gICAgICAgICAgICBcIm5vdGlmaWNhdGlvblwiOiB7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInByb2ZpbGVcIjoge1xuICAgICAgICAgICAgICAgIFwiYWN0aW9uXCI6IFwiZGVsZXRlUHJvZmlsZVwiLFxuICAgICAgICAgICAgICAgIFwicHJvZmlsZUlkXCI6IHByb2ZpbGVJZFxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZyh3b3JrZXJPYmplY3QpO1xuICAgICAgICBkYW8udXBzZXJ0KHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIldvcmtlciBPYmplY3Qgc3VibWl0dGVkIGZvciBwcm9maWxlKFwiICsgcHJvZmlsZUlkICsgXCIpIGRlbGV0aW9uLlwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgcmVqZWN0KGRhdGEpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG59O1xuXG5mdW5jdGlvbiBjcmVhdGVQcm9maWxlKGFyZ3MpIHtcblxuICAgIHZhciBfV0ZJbnN0YW5jZSA9IGFyZ3NbMV0gfHwge307XG5cbiAgICB2YXIgY29tbXVuaXR5SWQgPSBfV0ZJbnN0YW5jZS5jb21tdW5pdHlJZDtcbiAgICB2YXIgcHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICBsaWJyYXJ5LmNyZWF0ZVByb2ZpbGVEb2N1bWVudHMoY29tbXVuaXR5SWQsIHByb2ZpbGVJZCkudGhlbihmdW5jdGlvbihkYXRhKSB7XG5cbiAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5LicsIGRhdGEpO1xuICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcblxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgdmFyIGZhaWx1cmUgPSB1dGlsLnN1Y2Nlc3MoJ0VSUk9SOiBQcm9maWxlIGNyZWF0aW9uIGZhaWxlZCcgKyBlcnJbMF0ubWVzc2FnZSwge30pO1xuICAgICAgICAgICAgcmVqZWN0KGZhaWx1cmUpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG59O1xuXG5mdW5jdGlvbiBzZXREcmFmdChhcmdzKSB7XG5cbiAgICB2YXIgX1dGSW5zdGFuY2UgPSBhcmdzWzBdIHx8IHt9O1xuXG4gICAgdmFyIGNvbW11bml0eUlkID0gX1dGSW5zdGFuY2UuY29tbXVuaXR5SWQ7XG4gICAgdmFyIHByb2ZpbGVJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XG4gICAgdmFyIHV1aWQgPSBhcmdzWzJdIHx8ICcnO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgIHZhciBzdWJQcm9jZXNzSW5zdGFuY2UgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgdmFyIGluZGljYXRvckluc3RhbmNlcyA9IHN1YlByb2Nlc3NJbnN0YW5jZS5pbmRpY2F0b3JzO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5kaWNhdG9ySW5zdGFuY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgaW5kaWNhdG9yVVVJRCA9IGluZGljYXRvckluc3RhbmNlc1tpXS5pbnN0YW5jZXNbMF0udXVpZDtcbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JJbnN0YW5jZSA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tfaWQgZXEgJ1wiICsgaW5kaWNhdG9yVVVJRCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgIGluZGljYXRvckluc3RhbmNlLmNvbnRyb2wuZHJhZnQgPSB0cnVlO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlc29sdmUoXCJTZXQgRHJhZnQgU3VjY2Vzc1wiLCBpbmRpY2F0b3JJbnN0YW5jZXMpO1xuXG4gICAgfSk7XG59O1xuXG5mdW5jdGlvbiBzZXRVbkRyYWZ0KGFyZ3MpIHtcblxuICAgIHZhciBfV0ZJbnN0YW5jZSA9IGFyZ3NbMF0gfHwge307XG5cbiAgICB2YXIgY29tbXVuaXR5SWQgPSBfV0ZJbnN0YW5jZS5jb21tdW5pdHlJZDtcbiAgICB2YXIgcHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcbiAgICB2YXIgdXVpZCA9IGFyZ3NbMl0gfHwgJyc7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgdmFyIHN1YlByb2Nlc3NJbnN0YW5jZSA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICB2YXIgaW5kaWNhdG9ySW5zdGFuY2VzID0gc3ViUHJvY2Vzc0luc3RhbmNlLmluZGljYXRvcnM7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbmRpY2F0b3JJbnN0YW5jZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JVVUlEID0gaW5kaWNhdG9ySW5zdGFuY2VzW2ldLmluc3RhbmNlc1swXS51dWlkO1xuICAgICAgICAgICAgdmFyIGluZGljYXRvckluc3RhbmNlID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW19pZCBlcSAnXCIgKyBpbmRpY2F0b3JVVUlEICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgaW5kaWNhdG9ySW5zdGFuY2UuY29udHJvbC5kcmFmdCA9IGZhbHNlO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlc29sdmUoXCJTZXQgRHJhZnQgU3VjY2Vzc1wiLCBpbmRpY2F0b3JJbnN0YW5jZXMpO1xuXG4gICAgfSk7XG59O1xuXG5mdW5jdGlvbiBzYXZlKGluZGljYXRvcikge1xuICAgIHZhciBjb21wbGV0ZWQgPSBbXTtcbiAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgICBjb21wbGV0ZTogdHJ1ZSxcbiAgICAgICAgZGF0YTogW11cbiAgICB9O1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnRm9ybSBpbmRpY2F0b3Igc2V0IHNhdmVkIHN1Y2Nlc3NmdWxseS4nLCByZXN1bHQpO1xuICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgIH0pO1xufTtcblxuZnVuY3Rpb24gc3VibWl0KGZvcm0pIHtcbiAgICB2YXIgY29tcGxldGVkID0gW107XG4gICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgY29tcGxldGU6IHRydWUsXG4gICAgICAgIGRhdGE6IFtdXG4gICAgfTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gc3VibWl0dGVkIHN1Y2Nlc3NmdWxseS4nLCByZXN1bHQpO1xuICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgIH0pO1xufTtcblxuZnVuY3Rpb24gYXV0aG9yaXNlKGZvcm0pIHtcbiAgICB2YXIgY29tcGxldGVkID0gW107XG4gICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgY29tcGxldGU6IHRydWUsXG4gICAgICAgIGRhdGE6IFtdXG4gICAgfTtcblxuICAgIHZhciBwcm9jZXNzSWQgPSBmb3JtWzBdIHx8ICcnO1xuXG4gICAgdmFyIHN1YlByb2Nlc3MgPSBmb3JtWzFdIHx8IHt9O1xuXG4gICAgdmFyIHN1YlByb2Nlc3NJZCA9IHN1YlByb2Nlc3MuX2lkO1xuXG4gICAgdmFyIHByb2Nlc3NTZXEgPSBmb3JtWzJdIHx8ICcnO1xuXG4gICAgdmFyIHN1YlByb2Nlc3NTZXEgPSBmb3JtWzNdIHx8ICcnO1xuXG4gICAgdmFyIF9XRkluc3RhbmNlID0gZm9ybVs0XSB8fCB7fTtcblxuICAgIHZhciBzdWJQcm9jZXNzVVVJRCA9IGZvcm1bNl0gfHwgJyc7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgLy92YXIgc3ViUHJvY2Vzc1VVSUQgPSBKU09OLnhwYXRoKFwiL3Byb2Nlc3Nlc1tpZCBlcSAnXCIgKyBwcm9jZXNzSWQgKyBcIicgYW5kIHNlcSBlcSAnXCIgKyBwcm9jZXNzU2VxICsgXCInXS9zdWJQcm9jZXNzZXNbaWQgZXEgJ1wiICsgc3ViUHJvY2Vzc0lkICsgXCInIGFuZCBzZXEgZXEgJ1wiICsgc3ViUHJvY2Vzc1NlcSArIFwiJ10vdXVpZFwiLCBfV0ZJbnN0YW5jZS5pbnN0YW5jZSwge30pWzBdO1xuICAgICAgICB2YXIgc3BJbmRpY2F0b3JzID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHN1YlByb2Nlc3NVVUlEICsgXCInXS9pbmRpY2F0b3JzL2luc3RhbmNlcy91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSk7XG4gICAgICAgIHZhciBpdGVtc1RvUHJvY2VzcyA9IHNwSW5kaWNhdG9ycy5sZW5ndGg7XG4gICAgICAgIHZhciB1cGRhdGVkT2JqZWN0c0FycmF5ID0gW107XG4gICAgICAgIHZhciB0ZW1wQXJyYXkgPSBbXTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNwSW5kaWNhdG9ycy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICBnYXRla2VlcGVyLmF1dGhvcmlzZShzcEluZGljYXRvcnNbaV0pLnRoZW4oZnVuY3Rpb24oYXV0aG9yaXNlZFJldHVybikge1xuXG4gICAgICAgICAgICAgICAgZ2F0ZWtlZXBlci5wZXJzaXN0KGF1dGhvcmlzZWRSZXR1cm4pLnRoZW4oZnVuY3Rpb24oc2F2ZWRBcnJheSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciB1dWlkU2F2ZWRJbmRpY2F0b3IgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCBzYXZlZEFycmF5Lmxlbmd0aDsgYysrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNhdmVkQXJyYXlbY10uaWQuZW5kc1dpdGgoJzphcHByb3ZlZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXVpZFNhdmVkSW5kaWNhdG9yID0gc2F2ZWRBcnJheVtjXS5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZGFvLmdldCh1dWlkU2F2ZWRJbmRpY2F0b3IpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1RvUHJvY2Vzcy0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1RvUHJvY2VzcyA9PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyc2lzdERhdGEoJ2luZGljYXRvcnMnLCBfV0ZJbnN0YW5jZSwgc3ViUHJvY2Vzc1VVSUQpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gYXV0aG9yaXNlZCBzdWNjZXNzZnVsbHkuJywgdXBkYXRlZE9iamVjdHNBcnJheSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZhaWx1cmUgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gYXV0aG9yaXNlZCBwZXJzaXN0IGZhaWxlZC4nICsgZXJyWzBdLm1lc3NhZ2UsIHt9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChmYWlsdXJlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3VuZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yID0gX1dGSW5zdGFuY2UuaW5kaWNhdG9yc1tpbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRpY2F0b3IuX2lkID09IGRhdGEuX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGN1cnJlbnQgaXRlbSBmcm9tIHRoZSBhcnJheSBhbmQgYWRkIHRoZSB1cGRhdGVkIHByb2Nlc3NNb2RlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEFycmF5LnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL19XRkluc3RhbmNlLmluZGljYXRvcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5wdXNoKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNUb1Byb2Nlc3MtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1RvUHJvY2VzcyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZExlbmd0aCA9IF9XRkluc3RhbmNlLmluZGljYXRvcnMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ZW1wTGVuZ3RoID0gdGVtcEFycmF5Lmxlbmd0aDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcih2YXIgcCA9IDA7IHAgPCBpbmRMZW5ndGg7IHArKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ZW1wT2JqPWZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IodmFyIHE9MDsgcSA8IHRlbXBMZW5ndGg7IHErKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzW3BdLl9pZCA9PSB0ZW1wQXJyYXlbcV0uX2lkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wT2JqID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZighdGVtcE9iail7IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEFycmF5LnB1c2goX1dGSW5zdGFuY2UuaW5kaWNhdG9yc1twXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzID0gdGVtcEFycmF5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3VuZCA9PSB0cnVlICYmIGl0ZW1zVG9Qcm9jZXNzID09IDApe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNpc3REYXRhKCdpbmRpY2F0b3JzJywgX1dGSW5zdGFuY2UsIHN1YlByb2Nlc3NVVUlEKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGF1dGhvcmlzZWQgc3VjY2Vzc2Z1bGx5LicsIHVwZGF0ZWRPYmplY3RzQXJyYXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmYWlsdXJlID0gdXRpbC5zdWNjZXNzKCdGb3JtIGF1dGhvcmlzZWQgcGVyc2lzdCBmYWlsZWQuJyArIGVyclswXS5tZXNzYWdlLCB7fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFpbHVyZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpdGVtc1RvUHJvY2Vzcy0tO1xuICAgICAgICAgICAgICAgIGlmIChpdGVtc1RvUHJvY2VzcyA9PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gYXV0aG9yaXNlZCBzdWNjZXNzZnVsbHkuJywgdXBkYXRlZE9iamVjdHNBcnJheSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9KTtcbn07XG5cbmZ1bmN0aW9uIGNsb3NlKGZvcm0pIHtcbiAgICB2YXIgY29tcGxldGVkID0gW107XG4gICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgY29tcGxldGU6IHRydWUsXG4gICAgICAgIGRhdGE6IFtdXG4gICAgfTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gY2xvc2VkIHN1Y2Nlc3NmdWxseS4nLCByZXN1bHQpO1xuICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgIH0pO1xufTtcblxuXG5cbmZ1bmN0aW9uIHVwZGF0ZUluZGljYXRvcihhcmdzKSB7XG5cbiAgICB2YXIgX1dGSW5zdGFuY2UgPSBhcmdzWzBdIHx8IHt9O1xuXG4gICAgdmFyIHV1aWQgPSBhcmdzWzFdIHx8ICcnO1xuICAgIHZhciBwYXRoID0gYXJnc1syXSB8fCAnJztcbiAgICB2YXIgZGF0YVZhbHVlID0gYXJnc1szXSB8fCAnJztcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICB2YXIgc2V0SWQgPSBwYXRoLnNwbGl0KFwiLlwiLCAxKVswXTtcbiAgICAgICAgdmFyIGluZE9iamVjdCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1t3b3JrZmxvd3MvcHJvY2Vzc2VzL3N1YlByb2Nlc3NVVUlEID0gJ1wiKyB1dWlkICtcIicgYW5kIGNhdGVnb3J5L3Rlcm0gPSAnXCIrIHNldElkICtcIiddXCIsIF9XRkluc3RhbmNlICx7fSlbMF07XG5cbiAgICAgICAgdmFyIHNxdW90ZSA9IGRhdGFWYWx1ZS5yZXBsYWNlKC8nL2csIFwiXFxcXCdcIik7XG4gICAgICAgIHZhciBleHByID0gXCJpbmRPYmplY3QubW9kZWwucGVuZGluZy5kYXRhLlwiICsgcGF0aCArIFwiID0gJ1wiICsgc3F1b3RlICsgXCInXCI7XG4gICAgICAgIGV2YWwoZXhwcik7XG4gICAgICAgIHZhciBpdGVtc1RvUHJvY2VzcyA9IDE7XG4gICAgICAgIHZhciBzdHVmZiA9IFtdO1xuICAgICAgICB2YXIgb2JqID0ge307XG5cbiAgICAgICAgb2JqLm1vZGVsID0gaW5kT2JqZWN0O1xuICAgICAgICBzdHVmZi5wdXNoKG9iaik7XG5cbiAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0luZGljYXRvciB1cGRhdGVkLicsIHN0dWZmKTtcbiAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgIH0pO1xufTtcblxuXG5mdW5jdGlvbiB1cGRhdGVJbmRpY2F0b3JXcmFwcGVyKGFyZ3MpIHtcblxuICAgIHZhciBfV0ZJbnN0YW5jZSA9IGFyZ3NbMF0gfHwge307XG5cbiAgICB2YXIgdXVpZCA9IGFyZ3NbMV0gfHwgJyc7XG4gICAgdmFyIHBhdGggPSBhcmdzWzJdIHx8ICcnO1xuICAgIHZhciBkYXRhVmFsdWUgPSBhcmdzWzNdIHx8ICcnO1xuICAgIHZhciBpbmRpY2F0b3JTZXRJZCA9IGFyZ3NbNF0gfHwgJyc7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICBcbiAgICAgICAgdmFyIGluZE9iamVjdCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1t3b3JrZmxvd3MvcHJvY2Vzc2VzL3N1YlByb2Nlc3NVVUlEID0gJ1wiKyB1dWlkICtcIicgYW5kIGNhdGVnb3J5L3Rlcm0gPSAnXCIrIGluZGljYXRvclNldElkICtcIiddXCIsIF9XRkluc3RhbmNlICx7fSlbMF07XG5cbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICB2YXIgc3F1b3RlID0gZGF0YVZhbHVlLnJlcGxhY2UoLycvZywgXCJcXFxcJ1wiKTtcbiAgICAgICAgdmFyIGV4cHIgPSBcImluZE9iamVjdC5cIiArIHBhdGggKyBcIiA9ICdcIiArIHNxdW90ZSArIFwiJ1wiO1xuICAgICAgICBldmFsKGV4cHIpO1xuICAgICAgICB2YXIgaXRlbXNUb1Byb2Nlc3MgPSAxO1xuICAgICAgICB2YXIgc3R1ZmYgPSBbXTtcbiAgICAgICAgdmFyIG9iaiA9IHt9O1xuXG4gICAgICAgIG9iai5tb2RlbCA9IGluZE9iamVjdDtcbiAgICAgICAgc3R1ZmYucHVzaChvYmopO1xuXG4gICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdJbmRpY2F0b3IgdXBkYXRlZC4nLCBzdHVmZik7XG4gICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgfSk7XG59O1xuXG5mdW5jdGlvbiBtYXJrVXBkYXRlSW5kaWNhdG9yKGFyZ3MpIHtcblxuICAgIHZhciBfV0ZJbnN0YW5jZSA9IGFyZ3NbMF0gfHwge307XG5cbiAgICB2YXIgdXVpZCA9IGFyZ3NbMV0gfHwgJyc7XG4gICAgdmFyIHN0YXR1cyA9IGFyZ3NbMl0gfHwgJyc7XG4gICAgdmFyIGluZGljYXRvclNldElkID0gYXJnc1szXSB8fCAnJztcbiAgICBcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgdmFyIGluZE9iamVjdCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1t3b3JrZmxvd3MvcHJvY2Vzc2VzL3N1YlByb2Nlc3NVVUlEID0gJ1wiKyB1dWlkICtcIicgYW5kIGNhdGVnb3J5L3Rlcm0gPSAnXCIrIGluZGljYXRvclNldElkICtcIiddXCIsIF9XRkluc3RhbmNlICx7fSlbMF07ICAgICAgICBcbiAgICAgICAgaW5kT2JqZWN0Lm1vZGVsLnBlbmRpbmcuc3RhdHVzID0gc3RhdHVzO1xuICAgICAgICB2YXIgaXRlbXNUb1Byb2Nlc3MgPSAxO1xuICAgICAgICB2YXIgc3R1ZmYgPSBbXTtcbiAgICAgICAgdmFyIG9iaiA9IHt9O1xuICAgICAgICBvYmoubW9kZWwgPSBpbmRPYmplY3Q7XG4gICAgICAgIHN0dWZmLnB1c2gob2JqKTtcblxuICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnSW5kaWNhdG9yIHVwZGF0ZWQuJywgc3R1ZmYpO1xuICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgfSk7XG59O1xuXG5cbmZ1bmN0aW9uIHNldFN0YXR1cyhhcmdzKSB7XG5cblxuICAgIC8vIEN1cnJlbnRseSBzZXR0aW5nIHN0YXR1cyB0byBzdWJwcm9jZXNzIGluc3RhbmNlLiBpdCBzaG91bGQgdXBkYXRlIHNvbWUgZmllbGQgaW4gYXBwUHJvZmlsZSBvciB3aGF0ZXZlciBpbmRpY2F0b3IgdGhlIHByb2ZpbGUgaGFzLlxuICAgIHZhciBfV0ZJbnN0YW5jZSA9IGFyZ3NbMF0gfHwge307XG4gICAgdmFyIHV1aWQgPSBhcmdzWzFdIHx8ICcnO1xuICAgIHZhciBzdGF0dXMgPSBhcmdzWzJdIHx8ICcnO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgIHZhciBzdWJQcm9jZXNzSW5zdGFuY2UgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgc3ViUHJvY2Vzc0luc3RhbmNlLnN0ZXAubWVzc2FnZSA9IHN0YXR1cztcblxuICAgICAgICByZXNvbHZlKFwiU2V0IHByb2ZpbGUgc3RhdHVzIFN1Y2Nlc3NcIiwgc3ViUHJvY2Vzc0luc3RhbmNlKTtcblxuICAgIH0pO1xuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICAgIGNyZWF0ZTogY3JlYXRlLFxuICAgIHNhdmU6IHNhdmUsXG4gICAgc3VibWl0OiBzdWJtaXQsXG4gICAgYXV0aG9yaXNlOiBhdXRob3Jpc2UsXG4gICAgY2xvc2U6IGNsb3NlLFxuICAgIHNldERyYWZ0OiBzZXREcmFmdCxcbiAgICBzZXRVbkRyYWZ0OiBzZXRVbkRyYWZ0LFxuICAgIGNyZWF0ZVByb2ZpbGU6IGNyZWF0ZVByb2ZpbGUsXG4gICAgc2V0SW5zdGFuY2VUaXRsZTogc2V0SW5zdGFuY2VUaXRsZSxcbiAgICBkZWxldGVQcm9maWxlOiBkZWxldGVQcm9maWxlLFxuICAgIHVwZGF0ZUluZGljYXRvcjogdXBkYXRlSW5kaWNhdG9yLFxuICAgIG1hcmtVcGRhdGVJbmRpY2F0b3I6IG1hcmtVcGRhdGVJbmRpY2F0b3IsXG4gICAgdXBkYXRlSW5kaWNhdG9yV3JhcHBlcjogdXBkYXRlSW5kaWNhdG9yV3JhcHBlclxuXG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5cbmZ1bmN0aW9uIGdldExhbmd1YWdlTWVzc2FnZShtZXNzYWdlKSB7XG5cbiAgICB2YXIgbGFuZ3VhZ2UgPSBzZXJ2aWNlLmdldExhbmd1YWdlKCk7XG4gICAgdmFyIHJlcyA9IGV2YWwoXCJtZXNzYWdlLmkxOG4uXCIgKyBsYW5ndWFnZSk7XG4gICAgcmV0dXJuIHJlcztcblxufTtcblxuZnVuY3Rpb24gZ2V0Tm9kZVZhbHVlKGRhdGEsIF9XRkluc3RhbmNlLCB1dWlkKSB7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgaWYgKGRhdGEudmFsdWUgIT0gdW5kZWZpbmVkKSB7ICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgaW5wdXREYXRhVHlwZSA9ICdzdHJpbmcnO1xuXG4gICAgICAgICAgICBpZihkYXRhLnZhbHVlLmRhdGF0eXBlLmRhdGFUeXBlICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgaW5wdXREYXRhVHlwZSA9IGRhdGEudmFsdWUuZGF0YXR5cGUuZGF0YVR5cGU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlucHV0RGF0YVR5cGUgPSBkYXRhLnZhbHVlLmRhdGF0eXBlO1xuICAgICAgICAgICAgfSBcblxuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgaW5wdXRWYWx1ZSA9IGRhdGEudmFsdWUuZGF0YTtcblxuICAgICAgICAgICAgaWYoaW5wdXREYXRhVHlwZSA9PSAnbnVtYmVyJyApe1xuICAgICAgICAgICAgICAgIHJlc29sdmUoTnVtYmVyKGlucHV0VmFsdWUpKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihpbnB1dERhdGFUeXBlID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShpbnB1dFZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihpbnB1dERhdGFUeXBlID09ICdpbnRlZ2VyJyl7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShwYXJzZUludChpbnB1dFZhbHVlKSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYoaW5wdXREYXRhVHlwZSA9PSAnZGVjaW1hbCcpe1xuICAgICAgICAgICAgICAgIHJlc29sdmUocGFyc2VGbG9hdChpbnB1dFZhbHVlKSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYoaW5wdXREYXRhVHlwZSA9PSAnZGF0ZScgfHwgaW5wdXREYXRhVHlwZSA9PSAnZGF0ZVRpbWUnICl7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShpbnB1dFZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gSW4gY2FzZSBkYXRhIHR5cGUgbm90IG1hdGNoZWRcbiAgICAgICAgICAgICAgICByZXNvbHZlKGlucHV0VmFsdWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS5pbmRpY2F0b3JVVUlEICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAvLyBBIGNoYW5nZSBpcyByZXF1aXJlZCB0byBtYWtlIHN1cmUgcHJvcGVyIHNjb3BlIGlzIGlkZW50aWZpZWQuXG4gICAgICAgICAgICB2YXIgaW5kaWNhdG9yVVVJRCA9IG51bGw7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBzdWJwcm9jZXNzID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICBpZihzdWJwcm9jZXNzLmluZGljYXRvcnMubGVuZ3RoID09IDApe1xuXG4gICAgICAgICAgICAgICAgaW5kaWNhdG9yVVVJRCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdcIisgZGF0YS5pbmRpY2F0b3JVVUlELmluZGljYXRvclNldElkICtcIiddL19pZFwiLCBfV0ZJbnN0YW5jZSAsIHt9KVswXTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgaW5kaWNhdG9yVVVJRCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tpZCBlcSAnXCIgKyBkYXRhLmluZGljYXRvclVVSUQuaW5kaWNhdG9yU2V0SWQgKyBcIiddL2luc3RhbmNlcy91dWlkXCIsIHN1YnByb2Nlc3MsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgaWYoaW5kaWNhdG9yVVVJRCA9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgICAgICBpbmRpY2F0b3JVVUlEID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ1wiKyBkYXRhLmluZGljYXRvclVVSUQuaW5kaWNhdG9yU2V0SWQgK1wiJ10vX2lkXCIsX1dGSW5zdGFuY2Use30pWzBdO1xuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cblxuXG4gICAgICAgICAgICByZXNvbHZlKGluZGljYXRvclVVSUQpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS5pbmRpY2F0b3IgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JVVUlEID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ1wiICsgZGF0YS5pbmRpY2F0b3IuaW5kaWNhdG9yU2V0SWQgKyBcIiddL2luc3RhbmNlcy91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICB2YXIgaW5kT2JqZWN0ID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW19pZCBlcSAnXCIgKyBpbmRpY2F0b3JVVUlEICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgdmFyIHhwYXRoID0gJy9tb2RlbC9wZW5kaW5nL2RhdGEvJyArIGRhdGEuaW5kaWNhdG9yLmluZGljYXRvclNldElkICsgJy8nICsgZGF0YS5pbmRpY2F0b3IuZWxlbWVudElkO1xuXG4gICAgICAgICAgICB2YXIgc2VxID0gSlNPTi54cGF0aChcImNvdW50KC9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL3ByZWNlZGluZy1zaWJsaW5nOjpub2RlKClbaWQgPSAvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pZF0pXCIsIF9XRkluc3RhbmNlLCB7fSlbMF0gKyAxO1xuICAgICAgICAgICAgdmFyIHN1YnByb2Nlc3NUeXBlID0gSlNPTi54cGF0aChcIi9jb25maWcvcHJvY2Vzc2VzL3N1YlByb2Nlc3Nlc1tfaWQgZXEgL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaWRdL3R5cGVcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgIHZhciBwYXJ0ID0gbGlicmFyeS5nZXRTdWJwcm9maWxlU3VicHJvY2Vzc0lkcygpO1xuXG4gICAgICAgICAgICBpZiAoc3VicHJvY2Vzc1R5cGUgPT0gUFJPQ0VTU19UWVBFX1NVQlBST0ZJTEUpIHtcbiAgICAgICAgICAgICAgICBzZXEgPSBKU09OLnhwYXRoKFwiY291bnQoL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vcHJlY2VkaW5nLXNpYmxpbmc6Om5vZGUoKVtpZCA9IC9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2lkIGFuZCBfaWQgPSAvc3VicHJvY2Vzc2VzW19pZCA9IFwiK3BhcnQrXCJdL19pZF0pXCIsIF9XRkluc3RhbmNlLCB7fSlbMF0gKyAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcmVwbGFjZWRQYXRoID0gcmVwbGFjZUFsbCh4cGF0aCwgJyNTRVFVRU5DRSMnLCBzZXEpO1xuXG4gICAgICAgICAgICB2YXIgdmFsaWREYXRlID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2RhdGVzL3ZhbGlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICB2YXIgY29uY2F0VmFsaWREYXRlID0gXCInXCIgKyB2YWxpZERhdGUgKyBcIidcIjtcbiAgICAgICAgICAgIHZhciBuZXdQYXRoID0gcmVwbGFjZUFsbChyZXBsYWNlZFBhdGgsICcjRU5EX0RBVEUjJywgY29uY2F0VmFsaWREYXRlKTtcbiAgICAgICAgICAgIHZhciBkb3RSZXBsYWNlZCA9IHJlcGxhY2VBbGwobmV3UGF0aCwgJ1suXScsICcvJyk7XG4gICAgICAgICAgICB2YXIgcmV0VmFsdWUgPSBKU09OLnhwYXRoKGRvdFJlcGxhY2VkLCBpbmRPYmplY3QsIHt9KVswXTtcblxuICAgICAgICAgICAgcmVzb2x2ZShyZXRWYWx1ZSk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChkYXRhLnN5c3RlbSAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgcmVzb2x2ZShcIkVSUk9SOiBVbmltcGxlbWVudGVkIHN5c3RlbSB0eXBlIGZvdW5kLlwiKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGRhdGEudmFyaWFibGUgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogXG4gICAgICAgICAgICAgKiBUYWtlbiBvdXQgb2Ygc2NoZW1hXG4gICAgICAgICAgICAgKiBcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3ViUHJvY2Vzc0luc3RhbmNlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwidmFsdWUgb2YgdGhlIHZhcmlhYmxlIHN1YlByb2Nlc3NJbnN0YW5jZSB2YXJpYWJsZSBjdXJyZW50IHN1YnByb2Nlc3NJbnN0YW5jZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzdGVwXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwidmFsdWUgb2YgdGhlIHZhcmlhYmxlIGluIHRoZSBjdXJyZW50IHN0ZXBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3ViUHJvY2Vzc0lkXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwidmFsdWUgb2YgdGhlIGN1cnJlbnQgYXBwbGljYWl0b24gSURcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICogXG4gICAgICAgICAgICAgKiBcbiAgICAgICAgICAgICAqIFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBpZiAoZGF0YS52YXJpYWJsZS5wcm9maWxlICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHZhcmlhYmxlTmFtZSA9IGRhdGEudmFyaWFibGUucHJvZmlsZTtcblxuICAgICAgICAgICAgICAgIHZhciBwcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xuICAgICAgICAgICAgICAgIHZhciBwcm9maWxlVmFyaWFibGVGaWxlTmFtZSA9IHByb2ZpbGVJZCArICc6dmFyaWFibGVzJztcblxuICAgICAgICAgICAgICAgIGRhby5nZXQocHJvZmlsZVZhcmlhYmxlRmlsZU5hbWUpLnRoZW4oZnVuY3Rpb24oZmlsZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSBldmFsKCdmaWxlLicgKyB2YXJpYWJsZU5hbWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqID09ICdvYmplY3QnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZXEgPSBKU09OLnhwYXRoKFwiY291bnQoL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vcHJlY2VkaW5nLXNpYmxpbmc6Om5vZGUoKVtpZCA9IC9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2lkXSlcIiwgX1dGSW5zdGFuY2UsIHt9KVswXSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VicHJvY2Vzc1R5cGUgPSBKU09OLnhwYXRoKFwiL2NvbmZpZy9wcm9jZXNzZXMvc3ViUHJvY2Vzc2VzW19pZCBlcSAvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pZF0vdHlwZVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhcnQgPSBsaWJyYXJ5LmdldFN1YnByb2ZpbGVTdWJwcm9jZXNzSWRzKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWJwcm9jZXNzVHlwZSA9PSBQUk9DRVNTX1RZUEVfU1VCUFJPRklMRSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcSA9IEpTT04ueHBhdGgoXCJjb3VudCgvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9wcmVjZWRpbmctc2libGluZzo6bm9kZSgpW2lkID0gL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaWQgYW5kIF9pZCA9IC9zdWJwcm9jZXNzZXNbX2lkID0gXCIrcGFydCtcIl0vX2lkXSlcIiwgX1dGSW5zdGFuY2UsIHt9KVswXSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZVBhdGggPSBcIi9cIiArIHZhcmlhYmxlTmFtZSArIFwiW3NlcSBlcSAnXCIgKyBzZXEgKyBcIiddL3ZhbHVlXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmV0VmFsdWUgPSBKU09OLnhwYXRoKHZhbHVlUGF0aCwgZmlsZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXRWYWx1ZSk7XG5cblxuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9iaiA9PSAnc3RyaW5nJykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG9iaik7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcblxuICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJFUlJPUjogUHJvZmlsZSB2YXJpYWJsZXMgbm90IGZvdW5kXCIpO1xuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KFwiRVJST1I6IFVuaW1wbGVtZW50ZWQgcHJvZmlsZSB0eXBlIGZvdW5kLlwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKGRhdGEuaW5kaWNhdG9yV3JhcHBlciAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgdmFyIGluZGljYXRvclNldCA9IGRhdGEuaW5kaWNhdG9yV3JhcHBlci5pbmRpY2F0b3JTZXRJZDtcbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JVVUlEID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ1wiICsgaW5kaWNhdG9yU2V0ICsgXCInXS9pbnN0YW5jZXMvdXVpZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgdmFyIGluZE9iamVjdCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tfaWQgZXEgJ1wiICsgaW5kaWNhdG9yVVVJRCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgIHZhciBlbGVtZW50cGF0aCA9IHJlcGxhY2VBbGwoZGF0YS5pbmRpY2F0b3JXcmFwcGVyLnBhdGgsXCJbLl1cIixcIi9cIilcbiAgICAgICAgICAgIHZhciB4cGF0aCA9ICcvJytlbGVtZW50cGF0aFxuICAgICAgICAgICAgdmFyIHZhbHVlID0gSlNPTi54cGF0aCh4cGF0aCwgaW5kT2JqZWN0LCB7fSlbMF07XG4gICAgICAgICAgICByZXNvbHZlKHZhbHVlKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGRhdGEuY2FsY3VsYXRlZCAhPSB1bmRlZmluZWQpIHtcblxuXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSAnJztcbiAgICAgICAgICAgIHZhciBzZXBhcmF0b3IgPSBkYXRhLmNhbGN1bGF0ZWQuc2VwYXJhdG9yO1xuXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgZGF0YS5jYWxjdWxhdGVkLmVsZW1lbnRzLmxlbmd0aCAtIDE7IGkrKyl7XG4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICB2YXIgZWxlbWVudHMgPSBkYXRhLmNhbGN1bGF0ZWQuZWxlbWVudHM7XG4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICB2YXIgcG9zc2libGVJdGVtcyA9IFtcImVsZW1lbnRQcm9wZXJ0eVwiLFwiY29uc3RhbnRWYWx1ZVwiLFwiZWxlbWVudFdyYXBwZXJcIixcImN1cnJlbnREYXRlXCIsXCJyYW5kb21EaWdpdHNcIiwgXCJwcm9maWxlT2JqZWN0RWxlbWVudFwiLFwicHJvZmlsZU9iamVjdFdyYXBwZXJcIixcImN1cnJlbnRGaW5hbmNpYWxZZWFyXCJdO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5RXhpc3RzKGVsZW1lbnRzW2ldLCBwb3NzaWJsZUl0ZW1zKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdlbGVtZW50UHJvcGVydHknOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3JTZXQgPSBlbGVtZW50c1tpXS5lbGVtZW50UHJvcGVydHkuaW5kaWNhdG9yU2V0SWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvclVVSUQgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnXCIgKyBpbmRpY2F0b3JTZXQgKyBcIiddL2luc3RhbmNlcy91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZE9iamVjdCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tfaWQgZXEgJ1wiICsgaW5kaWNhdG9yVVVJRCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbWVudHBhdGggPSByZXBsYWNlQWxsKGVsZW1lbnRzW2ldLmVsZW1lbnRQcm9wZXJ0eS5lbGVtZW50SWQsXCJbLl1cIixcIi9cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgeHBhdGggPSAnL21vZGVsL3BlbmRpbmcvZGF0YS8nKyBpbmRpY2F0b3JTZXQgKycvJyArIGVsZW1lbnRwYXRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpdGVtVmFsdWUgPSBKU09OLnhwYXRoKHhwYXRoLCBpbmRPYmplY3QsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlICsgaXRlbVZhbHVlICsgc2VwYXJhdG9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NvbnN0YW50VmFsdWUnOlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW1WYWx1ZSA9IGVsZW1lbnRzW2ldLmNvbnN0YW50VmFsdWUudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSArIGl0ZW1WYWx1ZStzZXBhcmF0b3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2VsZW1lbnRXcmFwcGVyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yU2V0ID0gZWxlbWVudHNbaV0uZWxlbWVudFdyYXBwZXIuaW5kaWNhdG9yU2V0SWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvclVVSUQgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnXCIgKyBpbmRpY2F0b3JTZXQgKyBcIiddL2luc3RhbmNlcy91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZE9iamVjdCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tfaWQgZXEgJ1wiICsgaW5kaWNhdG9yVVVJRCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbWVudHBhdGggPSByZXBsYWNlQWxsKGVsZW1lbnRzW2ldLmVsZW1lbnRXcmFwcGVyLmVsZW1lbnRJZCxcIlsuXVwiLFwiL1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB4cGF0aCA9ICcvJyArIGVsZW1lbnRwYXRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpdGVtVmFsdWUgPSBKU09OLnhwYXRoKHhwYXRoLCBpbmRPYmplY3QsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlICsgaXRlbVZhbHVlK3NlcGFyYXRvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjdXJyZW50RGF0ZSc6XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlICsgZm9ybWF0RGF0ZShuZXcgRGF0ZSgpKStzZXBhcmF0b3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdyYW5kb21EaWdpdHMnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRpZ2l0cyA9IGVsZW1lbnRzW2ldLnJhbmRvbURpZ2l0cy5kaWdpdHM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFuZG9tID0gTWF0aC5yYW5kb20oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBleHAgPSBNYXRoLnBvdygxMCwgZGlnaXRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbnRQYXJ0ID0gIChyYW5kb20gKiBleHApIF4gMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSArIGludFBhcnQrc2VwYXJhdG9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdwcm9maWxlT2JqZWN0RWxlbWVudCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yU2V0ID0gZWxlbWVudHNbaV0ucHJvZmlsZU9iamVjdEVsZW1lbnQuaW5kaWNhdG9yU2V0SWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZE9iamVjdCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdhcHBQcm9maWxlJ11cIixhcHAuU0NPUEUud29ya2Zsb3cse30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50cGF0aCA9IHJlcGxhY2VBbGwoZWxlbWVudHNbaV0ucHJvZmlsZU9iamVjdEVsZW1lbnQuZWxlbWVudElkLFwiWy5dXCIsXCIvXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHhwYXRoID0gJy9tb2RlbC9wZW5kaW5nL2RhdGEvJysgaW5kaWNhdG9yU2V0ICsnLycgKyBlbGVtZW50cGF0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbVZhbHVlID0gSlNPTi54cGF0aCh4cGF0aCwgaW5kT2JqZWN0LCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSArIGl0ZW1WYWx1ZStzZXBhcmF0b3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3Byb2ZpbGVPYmplY3RXcmFwcGVyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3JTZXQgPSBlbGVtZW50c1tpXS5wcm9maWxlT2JqZWN0V3JhcHBlci5pbmRpY2F0b3JTZXRJZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kT2JqZWN0ID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ2FwcFByb2ZpbGUnXVwiLGFwcC5TQ09QRS53b3JrZmxvdyx7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRwYXRoID0gcmVwbGFjZUFsbChlbGVtZW50c1tpXS5wcm9maWxlT2JqZWN0V3JhcHBlci53cmFwcGVyRWxlbWVudElkLFwiWy5dXCIsXCIvXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHhwYXRoID0gJy8nICsgZWxlbWVudHBhdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW1WYWx1ZSA9IEpTT04ueHBhdGgoeHBhdGgsIGluZE9iamVjdCwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgKyBpdGVtVmFsdWUrc2VwYXJhdG9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjdXJyZW50RmluYW5jaWFsWWVhcic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXJ0RGF0ZSA9IGVsZW1lbnRzW2ldLmN1cnJlbnRGaW5hbmNpYWxZZWFyLnN0YXJ0RGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RhcnRNb250aCA9IGVsZW1lbnRzW2ldLmN1cnJlbnRGaW5hbmNpYWxZZWFyLnN0YXJ0TW9udGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpbmFuY2lhbFllYXIgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkgKyBcIi1cIiArIHN0YXJ0TW9udGggKyBcIi1cIiArIHN0YXJ0RGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlICsgZmluYW5jaWFsWWVhciArIHNlcGFyYXRvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgIHZhciBpID0gZGF0YS5jYWxjdWxhdGVkLmVsZW1lbnRzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgIHZhciBlbGVtZW50cyA9IGRhdGEuY2FsY3VsYXRlZC5lbGVtZW50cztcblxuICAgICAgICAgICAgICAgICAgICB2YXIgcG9zc2libGVJdGVtcyA9IFtcImVsZW1lbnRQcm9wZXJ0eVwiLFwiY29uc3RhbnRWYWx1ZVwiLFwiZWxlbWVudFdyYXBwZXJcIixcImN1cnJlbnREYXRlXCIsXCJyYW5kb21EaWdpdHNcIiwgXCJwcm9maWxlT2JqZWN0RWxlbWVudFwiLFwicHJvZmlsZU9iamVjdFdyYXBwZXJcIixcImN1cnJlbnRGaW5hbmNpYWxZZWFyXCJdO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5RXhpc3RzKGVsZW1lbnRzW2ldLCBwb3NzaWJsZUl0ZW1zKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdlbGVtZW50UHJvcGVydHknOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3JTZXQgPSBlbGVtZW50c1tpXS5lbGVtZW50UHJvcGVydHkuaW5kaWNhdG9yU2V0SWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvclVVSUQgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnXCIgKyBpbmRpY2F0b3JTZXQgKyBcIiddL2luc3RhbmNlcy91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZE9iamVjdCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tfaWQgZXEgJ1wiICsgaW5kaWNhdG9yVVVJRCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbWVudHBhdGggPSByZXBsYWNlQWxsKGVsZW1lbnRzW2ldLmVsZW1lbnRQcm9wZXJ0eS5lbGVtZW50SWQsXCJbLl1cIixcIi9cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgeHBhdGggPSAnL21vZGVsL3BlbmRpbmcvZGF0YS8nKyBpbmRpY2F0b3JTZXQgKycvJyArIGVsZW1lbnRwYXRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpdGVtVmFsdWUgPSBKU09OLnhwYXRoKHhwYXRoLCBpbmRPYmplY3QsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlICsgaXRlbVZhbHVlIDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjb25zdGFudFZhbHVlJzpcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpdGVtVmFsdWUgPSBlbGVtZW50c1tpXS5jb25zdGFudFZhbHVlLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgKyBpdGVtVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2VsZW1lbnRXcmFwcGVyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yU2V0ID0gZWxlbWVudHNbaV0uZWxlbWVudFdyYXBwZXIuaW5kaWNhdG9yU2V0SWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvclVVSUQgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnXCIgKyBpbmRpY2F0b3JTZXQgKyBcIiddL2luc3RhbmNlcy91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZE9iamVjdCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tfaWQgZXEgJ1wiICsgaW5kaWNhdG9yVVVJRCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbWVudHBhdGggPSByZXBsYWNlQWxsKGVsZW1lbnRzW2ldLmVsZW1lbnRXcmFwcGVyLmVsZW1lbnRJZCxcIlsuXVwiLFwiL1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB4cGF0aCA9ICcvJyArIGVsZW1lbnRwYXRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpdGVtVmFsdWUgPSBKU09OLnhwYXRoKHhwYXRoLCBpbmRPYmplY3QsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlICsgaXRlbVZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2N1cnJlbnREYXRlJzpcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgKyBmb3JtYXREYXRlKG5ldyBEYXRlKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncmFuZG9tRGlnaXRzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkaWdpdHMgPSBlbGVtZW50c1tpXS5yYW5kb21EaWdpdHMuZGlnaXRzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJhbmRvbSA9IE1hdGgucmFuZG9tKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXhwID0gTWF0aC5wb3coMTAsIGRpZ2l0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW50UGFydCA9ICAocmFuZG9tICogZXhwKSBeIDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgKyBpbnRQYXJ0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdwcm9maWxlT2JqZWN0RWxlbWVudCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yU2V0ID0gZWxlbWVudHNbaV0ucHJvZmlsZU9iamVjdEVsZW1lbnQuaW5kaWNhdG9yU2V0SWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZE9iamVjdCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdhcHBQcm9maWxlJ11cIixhcHAuU0NPUEUud29ya2Zsb3cse30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50cGF0aCA9IHJlcGxhY2VBbGwoZWxlbWVudHNbaV0ucHJvZmlsZU9iamVjdEVsZW1lbnQuZWxlbWVudElkLFwiWy5dXCIsXCIvXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHhwYXRoID0gJy9tb2RlbC9wZW5kaW5nL2RhdGEvJysgaW5kaWNhdG9yU2V0ICsnLycgKyBlbGVtZW50cGF0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbVZhbHVlID0gSlNPTi54cGF0aCh4cGF0aCwgaW5kT2JqZWN0LCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSArIGl0ZW1WYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncHJvZmlsZU9iamVjdFdyYXBwZXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvclNldCA9IGVsZW1lbnRzW2ldLnByb2ZpbGVPYmplY3RXcmFwcGVyLmluZGljYXRvclNldElkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRPYmplY3QgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnYXBwUHJvZmlsZSddXCIsYXBwLlNDT1BFLndvcmtmbG93LHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbWVudHBhdGggPSByZXBsYWNlQWxsKGVsZW1lbnRzW2ldLnByb2ZpbGVPYmplY3RXcmFwcGVyLndyYXBwZXJFbGVtZW50SWQsXCJbLl1cIixcIi9cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgeHBhdGggPSAnLycgKyBlbGVtZW50cGF0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbVZhbHVlID0gSlNPTi54cGF0aCh4cGF0aCwgaW5kT2JqZWN0LCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSArIGl0ZW1WYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjdXJyZW50RmluYW5jaWFsWWVhcic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXJ0RGF0ZSA9IGVsZW1lbnRzW2ldLmN1cnJlbnRGaW5hbmNpYWxZZWFyLnN0YXJ0RGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RhcnRNb250aCA9IGVsZW1lbnRzW2ldLmN1cnJlbnRGaW5hbmNpYWxZZWFyLnN0YXJ0TW9udGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpbmFuY2lhbFllYXIgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkgKyBcIi1cIiArIHN0YXJ0TW9udGggKyBcIi1cIiArIHN0YXJ0RGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlICsgZmluYW5jaWFsWWVhcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG5cblxuICAgICAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG4gICAgICAgIFxuICAgICAgICB9XG5cbiAgICB9KTtcblxuXG5cbn07XG5cblxuZnVuY3Rpb24gcmVwbGFjZUFsbCh0eHQsIHJlcGxhY2UsIHdpdGhfdGhpcykge1xuICAgIGlmICh0eXBlb2YgdHh0LnJlcGxhY2UgIT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXBsYWNlICsgJyAnICsgd2l0aF90aGlzKTtcbiAgICAgICAgY29uc29sZS5sb2codHh0KTtcbiAgICB9XG4gICAgcmV0dXJuIHR4dC5yZXBsYWNlKG5ldyBSZWdFeHAocmVwbGFjZSwgJ2cnKSwgd2l0aF90aGlzKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0RGF0ZShkYXRlKSB7XG4gIFxuICB2YXIgZGF5ID0gZGF0ZS5nZXREYXRlKCk7XG4gIHZhciBtb250aEluZGV4ID0gZGF0ZS5nZXRNb250aCgpO1xuICB2YXIgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcblxuICByZXR1cm4gZGF5ICsgJy0nICsgbW9udGhJbmRleCArICctJyArIHllYXI7XG59XG5cblxuZnVuY3Rpb24gY29tcGFyZShzdWJqZWN0LCBvcGVyYXRvciwgdmFsdWUpIHtcbiAgICBzd2l0Y2ggKG9wZXJhdG9yKSB7XG4gICAgICAgIGNhc2UgJz4nOlxuICAgICAgICAgICAgcmV0dXJuIHN1YmplY3QgPiB2YWx1ZTtcbiAgICAgICAgY2FzZSAnPCc6XG4gICAgICAgICAgICByZXR1cm4gc3ViamVjdCA8IHZhbHVlO1xuICAgICAgICBjYXNlICc+PSc6XG4gICAgICAgICAgICByZXR1cm4gc3ViamVjdCA+PSB2YWx1ZTtcbiAgICAgICAgY2FzZSAnPD0nOlxuICAgICAgICAgICAgcmV0dXJuIHN1YmplY3QgPD0gdmFsdWU7XG4gICAgICAgIGNhc2UgJz09JzpcbiAgICAgICAgICAgIHJldHVybiBzdWJqZWN0ID09IHZhbHVlO1xuICAgICAgICBjYXNlICchPSc6XG4gICAgICAgICAgICByZXR1cm4gc3ViamVjdCAhPSB2YWx1ZTtcbiAgICB9XG59O1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgICBnZXRMYW5ndWFnZU1lc3NhZ2U6IGdldExhbmd1YWdlTWVzc2FnZSxcbiAgICBnZXROb2RlVmFsdWU6IGdldE5vZGVWYWx1ZSxcbiAgICBjb21wYXJlOiBjb21wYXJlXG5cbn0iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbGl0eScpO1xuXG4vKipcbiAqIFVzZXIgSW50ZXJmYWNlIE1vZHVsZVxuICpcbiAqIEBtb2R1bGUgbGliL3VpXG4gKiBAYXV0aG9yIEJyZW50IEdvcmRvblxuICogQHZlcnNpb24gMC4xLjBcbiAqIEBkZXNjcmlwdGlvbiB0ZXN0IGRlc2NyaXB0aW9uXG4gKlxuICovXG5cbiAvKipcbiAgKiBHZXQgYWxsIHByb2Nlc3Mgc3ViLXByb2Nlc3NlcyB1c2VyIGludGVyZmFjZSBkYXRhXG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gcHJvY2VzcyBpZFxuICAqIEBwYXJhbSB7c3RyaW5nfSBsYW5nIC0gdGhlIHVzZXIgcHJlZmZlcmVkIGxhbmdhdWdlXG4gICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcbiAgKlxuICAqIEBleGFtcGxlICcnXG4gICpcbiAgKiBAcmV0dXJuICcnXG4gICpcbiAgKi9cbiBmdW5jdGlvbiBnZXRQcm9jZXNzKHByb2Nlc3NJZCwgbGFuZywgX1dGSW5zdGFuY2Upe1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBwcm9jZXNzTW9kZWwgPSBbXTtcbiAgICAgIHZhciBwcm9jZXNzSW5zdGFuY2UgPSBbXTtcbiAgICBcdF9XRkluc3RhbmNlLmluc3RhbmNlLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ocHJvY2Vzc0l0ZW0pe1xuICAgIFx0XHRpZiAocHJvY2Vzc0l0ZW0uaWQgPT0gcHJvY2Vzc0lkKSB7XG4gICAgXHRcdFx0cHJvY2Vzc0luc3RhbmNlID0gcHJvY2Vzc0l0ZW07XG4gICAgXHRcdH1cbiAgICBcdH0pXG4gICAgICAvLyBjb25zb2xlLmxvZyhwcm9jZXNzSW5zdGFuY2Uuc3ViUHJvY2Vzc2VzLmxlbmd0aCk7XG4gICAgICB1dGlsLnN5bmNMb29wKHByb2Nlc3NJbnN0YW5jZS5zdWJQcm9jZXNzZXMubGVuZ3RoLCBmdW5jdGlvbihsb29wKXtcbiAgXHRcdFx0dmFyIGNvdW50ZXIgPSBsb29wLml0ZXJhdGlvbigpO1xuICAgICAgICB2YXIgcHJvY2Vzc1NlcSA9IHByb2Nlc3NJbnN0YW5jZS5zZXE7XG4gICAgICAgIHZhciBzdWJQcm9jZXNzSWQgPSBwcm9jZXNzSW5zdGFuY2Uuc3ViUHJvY2Vzc2VzW2NvdW50ZXJdLmlkO1xuICAgICAgICB2YXIgc3ViUHJvY2Vzc1NlcSA9IHByb2Nlc3NJbnN0YW5jZS5zdWJQcm9jZXNzZXNbY291bnRlcl0uc2VxO1xuICAgICAgICBnZXRTdWJQcm9jZXNzKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBsYW5nLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihtb2RlbCl7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2cobW9kZWwpO1xuICAgICAgICAgIHByb2Nlc3NNb2RlbC5wdXNoKG1vZGVsKTtcbiAgICAgICAgICBsb29wLm5leHQoKTtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhwcm9jZXNzTW9kZWwpO1xuICBcdFx0XHR9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHByb2Nlc3NNb2RlbCk7XG4gIFx0XHRcdFx0bG9vcC5icmVhaygpO1xuICBcdFx0XHRcdHJlamVjdChlcnIpO1xuICBcdFx0XHR9KTtcbiAgXHRcdH0sIGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHByb2Nlc3NNb2RlbCk7XG4gIFx0XHRcdHJlc29sdmUocHJvY2Vzc01vZGVsKTtcbiAgXHRcdH0pO1xuICAgIH0gY2F0Y2goZXJyKXtcbiAgICAgIHJlamVjdChlcnIpO1xuICAgIH1cbiAgfSlcbn07XG5cbiAvKipcbiAgKiBHZXQgU3ViUHJvY2VzcyB1c2VyIGludGVyZmFjZSBkYXRhXG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gcHJvY2VzcyBpZFxuICAqIEBwYXJhbSB7bnVtYmVyfSBwcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHByb2Nlc3Mgc2VxXG4gICogQHBhcmFtIHtzdHJpbmd9IHN1YlByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN1Yi1wcm9jZXNzIGlkXG4gICogQHBhcmFtIHtudW1iZXJ9IHN1YlByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2Ugc3ViLXByb2Nlc3Mgc2VxXG4gICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcbiAgKlxuICAqIEBleGFtcGxlICcnXG4gICpcbiAgKiBAcmV0dXJuICcnXG4gICpcbiAgKi9cbmZ1bmN0aW9uIGdldFN1YlByb2Nlc3MocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIGxhbmcsIF9XRkluc3RhbmNlKXtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgIHRyeSB7XG4gICAgICB2YXIgbW9kZWwgPSB7XG4gICAgICAgIGlkOiAnJyxcbiAgICAgICAgc2VxOiAnJyxcbiAgICAgICAgbmFtZTogJycsXG4gICAgICAgIGhlbHA6ICcnLFxuICAgICAgICBkYXRlczogJycsXG4gICAgICAgIHN0ZXA6ICcnXG4gICAgICB9O1xuICAgICAgdmFyIHN1YlByb2Nlc3MgPSBbXTtcbiAgICBcdHZhciBzdWJQcm9jZXNzQ29uZiA9IFtdO1xuICAgIFx0X1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihwcm9jZXNzSXRlbSl7XG4gICAgXHRcdGlmIChwcm9jZXNzSXRlbS5pZCA9PSBwcm9jZXNzSWQgJiYgcHJvY2Vzc0l0ZW0uc2VxID09IHByb2Nlc3NTZXEpIHtcbiAgICBcdFx0XHR2YXIgc3BMZW5ndGggPSBwcm9jZXNzSXRlbS5zdWJQcm9jZXNzZXMubGVuZ3RoO1xuICAgIFx0XHRcdHByb2Nlc3NJdGVtLnN1YlByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24oc3ViUHJvY2Vzc0l0ZW0pe1xuICAgIFx0XHRcdFx0aWYgKHN1YlByb2Nlc3NJdGVtLmlkID09IHN1YlByb2Nlc3NJZCAmJiBzdWJQcm9jZXNzSXRlbS5zZXEgPT0gc3ViUHJvY2Vzc1NlcSAmJiBzdWJQcm9jZXNzSXRlbS5jb21wbGV0ZSA9PSBmYWxzZSkge1xuICAgIFx0XHRcdFx0XHRzdWJQcm9jZXNzID0gc3ViUHJvY2Vzc0l0ZW07XG4gICAgXHRcdFx0XHR9XG4gICAgXHRcdFx0fSlcbiAgICBcdFx0fVxuICAgIFx0fSlcbiAgICBcdC8vIEdldCB0aGUgY3VycmVudCBzdWJQcm9jZXNzIGNvbmZpZ3VyYXRpb25cbiAgICBcdF9XRkluc3RhbmNlLmNvbmZpZy5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHByb2Nlc3NDb25maWcpe1xuICAgIFx0XHRpZiAocHJvY2Vzc0NvbmZpZy5faWQgPT0gcHJvY2Vzc0lkKSB7XG4gICAgXHRcdFx0cHJvY2Vzc0NvbmZpZy5zdWJQcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHN1YlByb2Nlc3NDb25maWcpe1xuICAgIFx0XHRcdFx0aWYgKHN1YlByb2Nlc3NDb25maWcuX2lkID09IHN1YlByb2Nlc3NJZCkge1xuICAgIFx0XHRcdFx0XHRzdWJQcm9jZXNzQ29uZiA9IHN1YlByb2Nlc3NDb25maWc7XG4gICAgXHRcdFx0XHR9XG4gICAgXHRcdFx0fSlcbiAgICBcdFx0fVxuICAgIFx0fSlcbiAgICAgIC8vIFVwZGF0ZSB0aGUgbW9kZWxcbiAgICAgIG1vZGVsLmlkID0gc3ViUHJvY2Vzc0NvbmYuX2lkO1xuICAgICAgbW9kZWwuc2VxID0gc3ViUHJvY2Vzcy5zZXE7XG4gICAgICBtb2RlbC5uYW1lID0gdXRpbC5nZXROYW1lKHN1YlByb2Nlc3NDb25mLm5hbWUsIGxhbmcpO1xuICAgICAgbW9kZWwuaGVscCA9IHV0aWwuZ2V0TmFtZShzdWJQcm9jZXNzQ29uZi5oZWxwLCBsYW5nKTtcbiAgICAgIG1vZGVsLmRhdGVzID0gc3ViUHJvY2Vzcy5kYXRlcztcbiAgICAgIG1vZGVsLnN0ZXAgPSBzdWJQcm9jZXNzLnN0ZXA7XG4gICAgICByZXNvbHZlKG1vZGVsKTtcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgcmVqZWN0KGVycik7XG4gICAgfVxuICB9KVxufTtcblxuXG5cblxuZnVuY3Rpb24gcHJlcGFyZU5vdGlmaWNhdGlvblNjcmVlbigpe1xuXG4gIFwiXCJcbn07XG5cbiBtb2R1bGUuZXhwb3J0cyA9IHtcblxuICBnZXRQcm9jZXNzOiBnZXRQcm9jZXNzXG5cbiB9XG4iLCIndXNlIHN0cmljdCc7XG5cblxuZnVuY3Rpb24gZ2V0KCkge1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgfSk7XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gICAgZ2V0OiBnZXRcblxufSIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsaXR5Jyk7XG52YXIgYWN0aW9uc01vZHVsZSA9IHJlcXVpcmUoJy4vYWN0aW9ucycpO1xudmFyIGhlbHBlciA9IHJlcXVpcmUoJy4vaGVscGVyJyk7XG52YXIgZm9ybSA9IHJlcXVpcmUoJy4vZm9ybScpO1xuXG4vKipcbiAqIFByb2Nlc3MgTW9kdWxlXG4gKlxuICogQG1vZHVsZSBsaWIvcHJvY2Vzc1xuICogQGF1dGhvciBIYXNhbiBBYmJhc1xuICogQHZlcnNpb24gMC4yLjFcbiAqIEBkZXNjcmlwdGlvbiBXb3JrZmxvdyBpbXBsZW1lbnRhdGlvbiBjaGFuZ2VkIGFzIHBlciBuZXcgc2NoZW1hIGltcGxlbWVudGF0aW9uXG4gKlxuICovXG5cbi8qKlxuICogQ291bnQgYW4gYXJyYXkgb2YgaXRlbXNcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgLSB0aGUgYXJyYXkgZGF0YVxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuZnVuY3Rpb24gY291bnQoYXJyKSB7XG4gICAgaWYgKGFyciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBhcnIubGVuZ3RoO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxufTtcblxuLyoqXG4gKiBQcm9jZXNzIHByZS1yZXF1aXNpdGVzXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHByZXJlcXVpc2l0ZXMgLSB0aGUgcHJlLXJlcXVpc2l0ZXMgY29uZmlnIGRhdGFcbiAqXG4gKiBAZXhhbXBsZSAnJ1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cbmZ1bmN0aW9uIHByZVJlcXVpc2l0ZXMocHJlcmVxdWlzaXRlcywgX1dGSW5zdGFuY2UsIHNwdXVpZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIC8vIFVuY29tbWVudCBiZWxvdyBzZWN0aW9uIHdoZW4gcmVhZHkgdG8gaW1wbGVtZW50XG4gICAgICAgIHZhciBjb21wbGV0ZWQgPSBbXTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHV0aWwuc3luY0xvb3AocHJlcmVxdWlzaXRlcy5sZW5ndGgsIGZ1bmN0aW9uIChsb29wKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvdW50ZXIgPSBsb29wLml0ZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgIHByZVJlcXVpc2l0ZShwcmVyZXF1aXNpdGVzW2NvdW50ZXJdLCBfV0ZJbnN0YW5jZSwgc3B1dWlkKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGFsbCBwcmUtcmVxdWlzaXRlcyBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LlxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQucHVzaCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgbG9vcC5uZXh0KCk7XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQucHVzaChmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGxvb3AuYnJlYWsoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbXBsZXRlZC5ldmVyeShCb29sZWFuKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnUHJlLXJlcXVpc2l0ZXMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCB7fSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZQcmVSZXF1aXNpdGVFcnJvcicsICdOb3QgYWxsIHByZS1yZXF1aXNpdGVzIHBhc3NlZC4nKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG5cbiAgICB9KTtcbn07XG5cbi8qKlxuICogUHJvY2VzcyBwcmUtcmVxdWlzaXRlLCBleGVjdXRlIHRoZSBwcmUtcmVxdWlzaXRlIGNvbmRpdGlvbi5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gcHJlcmVxdWlzaXRlIC0gdGhlIHByZS1yZXF1aXNpdGUgY29uZmlnIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxuICpcbiAqIEBleGFtcGxlXG4gKiBQcm9jZXNzLnByZVJlcXVpc2l0ZShjb25maWcsIGNvdW50ZXIsIGluc3RhbmNlLCBkb2MpO1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cbmZ1bmN0aW9uIHByZVJlcXVpc2l0ZShwcmVyZXF1aXNpdGUsIF9XRkluc3RhbmNlLCBzcHV1aWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgXG5cbiAgICAgICAgaWYgKHByZXJlcXVpc2l0ZS5jaGVjay5udW1iZXJQcm9jZXNzSW5zdGFuY2VzICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICB2YXIgbnVtYmVyUHJvY2Vzc0luc3RhbmNlcyA9IHByZXJlcXVpc2l0ZS5jaGVjay5udW1iZXJQcm9jZXNzSW5zdGFuY2VzO1xuICAgICAgICAgICAgdmFyIF9maWx0ZXJPcGVyYXRvciA9IG51bWJlclByb2Nlc3NJbnN0YW5jZXMub3BlcmF0b3I7XG4gICAgICAgICAgICB2YXIgeHBhdGhPcGVyYXRvciA9ICcnO1xuICAgICAgICAgICAgc3dpdGNoIChfZmlsdGVyT3BlcmF0b3IpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdncmVhdGVyVGhhbic6XG4gICAgICAgICAgICAgICAgICAgIHhwYXRoT3BlcmF0b3IgPSAnZ3QnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdsZXNzVGhhbic6XG4gICAgICAgICAgICAgICAgICAgIHhwYXRoT3BlcmF0b3IgPSAnbHQnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdncmVhdGVyVGhhbkVxdWFsJzpcbiAgICAgICAgICAgICAgICAgICAgeHBhdGhPcGVyYXRvciA9ICdnZSc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2xlc3NUaGFuRXF1YWwnOlxuICAgICAgICAgICAgICAgICAgICB4cGF0aE9wZXJhdG9yID0gJ2xlJztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZXF1YWxUbyc6XG4gICAgICAgICAgICAgICAgICAgIHhwYXRoT3BlcmF0b3IgPSAnZXEnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdub3RFcXVhbFRvJzpcbiAgICAgICAgICAgICAgICAgICAgeHBhdGhPcGVyYXRvciA9ICduZSc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgX3N1YnByb2Nlc3NJZCA9IG51bWJlclByb2Nlc3NJbnN0YW5jZXMuc3ViUHJvY2Vzc0lkO1xuICAgICAgICAgICAgdmFyIF9maWx0ZXJFbGVtZW50ID0gXCJzdGVwL3N0YXR1c1wiO1xuICAgICAgICAgICAgdmFyIF9maWx0ZXJWYWx1ZSA9IG51bWJlclByb2Nlc3NJbnN0YW5jZXMudHlwZTtcbiAgICAgICAgICAgIHZhciBpbm5lclhwYXRoID0gXCIvXCIgKyBfZmlsdGVyRWxlbWVudCArIFwiWy4gZXEgJ1wiICsgX2ZpbHRlclZhbHVlICsgXCInXVwiO1xuXG4gICAgICAgICAgICB2YXIgZnVsbFBhdGggPSBcImNvdW50KC9zdWJwcm9jZXNzZXNbaWQgZXEgJ1wiICsgX3N1YnByb2Nlc3NJZCArIFwiJ11cIiArIGlubmVyWHBhdGggKyBcIilcIjtcblxuICAgICAgICAgICAgdmFyIHByZXJlcVByb2Nlc3NUeXBlID0gSlNPTi54cGF0aChcIi9jb25maWcvcHJvY2Vzc2VzL3N1YlByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgX3N1YnByb2Nlc3NJZCArIFwiJ10vdHlwZVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgdmFyIHBhcnQgPSBsaWJyYXJ5LmdldFN1YnByb2ZpbGVTdWJwcm9jZXNzSWRzKCk7XG5cbiAgICAgICAgICAgIGlmIChhcHAucHJvZmlsZS5zdWJwcm9maWxlSWQgIT0gdW5kZWZpbmVkICYmIGFwcC5wcm9maWxlLnN1YnByb2ZpbGVJZCAhPSAnJyAmJiBwcmVyZXFQcm9jZXNzVHlwZSAhPSB1bmRlZmluZWQgJiYgcHJlcmVxUHJvY2Vzc1R5cGUgPT0gUFJPQ0VTU19UWVBFX1NVQlBST0ZJTEUpIHtcbiAgICAgICAgICAgICAgICBmdWxsUGF0aCA9IFwiY291bnQoL3N1YnByb2Nlc3Nlc1tpZCBlcSAnXCIgKyBfc3VicHJvY2Vzc0lkICsgXCInIGFuZCBfaWQgPSBcIitwYXJ0K1wiXVwiICsgaW5uZXJYcGF0aCArIFwiKVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBzdWJqZWN0Q291bnQgPSBKU09OLnhwYXRoKGZ1bGxQYXRoLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgdmFyIGNvdW50VmFsdWUgPSBwcmVyZXF1aXNpdGUuY2hlY2subnVtYmVyUHJvY2Vzc0luc3RhbmNlcy5jb3VudDtcbiAgICAgICAgICAgIHZhciBjb21wYXJlID0gdXRpbC5jb21wYXJlKHN1YmplY3RDb3VudCwgcHJlcmVxdWlzaXRlLmNoZWNrLm51bWJlclByb2Nlc3NJbnN0YW5jZXMub3BlcmF0b3IsIHBhcnNlSW50KGNvdW50VmFsdWUpKTtcblxuXG4gICAgICAgICAgICBpZiAoY29tcGFyZSkge1xuICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdQcmUtcmVxdWlzaXRlcyBwYXNzZWQuJywge30pO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBoZWxwZXIuZ2V0TGFuZ3VhZ2VNZXNzYWdlKHByZXJlcXVpc2l0ZS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRlByZVJlcXVpc2l0ZUVycm9yJywgbWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH0gZWxzZSBpZiAocHJlcmVxdWlzaXRlLmNoZWNrLnZhcmlhYmxlICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICB2YXIgc2NvcGUgPSBwcmVyZXF1aXNpdGUuY2hlY2sudmFyaWFibGUuc2NvcGU7XG4gICAgICAgICAgICB2YXIgZmlsZU5hbWUgPSAnJztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoc2NvcGUgID09IFwicHJvZmlsZVwiKXtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB2YXIgcHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcbiAgICAgICAgICAgICAgICBmaWxlTmFtZSA9IHByb2ZpbGVJZCArICc6dmFyaWFibGVzJztcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChzY29wZSAgPT0gXCJzdWJQcm9maWxlU3ViUHJvY2Vzc0luc3RhbmNlXCIpIHtcblxuICAgICAgICAgICAgICAgIHZhciBzdWJQcm9maWxlSWQgPSBhcHAucHJvZmlsZS5zdWJwcm9maWxlSWQ7XG4gICAgICAgICAgICAgICAgZmlsZU5hbWUgPSBzdWJQcm9maWxlSWQgKyAnOnZhcmlhYmxlcyc7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KFwiRVJST1I6IFNjb3BlICdcIisgc2NvcGUgK1wiJyBub3QgaW1wbGVtZW50ZWQgaW4gcHJlLXJlcXVpc2l0ZXNcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRhby5nZXQoZmlsZU5hbWUpLnRoZW4oZnVuY3Rpb24oZmlsZSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHZhcmlhYmxlTmFtZSA9IHByZXJlcXVpc2l0ZS5jaGVjay52YXJpYWJsZS5uYW1lO1xuICAgICAgICAgICAgICAgIHZhciBvYmogPSBldmFsKCdmaWxlLicgKyB2YXJpYWJsZU5hbWUpO1xuICAgICAgICAgICAgICAgIHZhciBzdWJqZWN0VmFsdWVDYWxjdWxhdGVkO1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmogPT0gJ29iamVjdCcpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VxID0gSlNPTi54cGF0aChcImNvdW50KC9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHNwdXVpZCArIFwiJ10vcHJlY2VkaW5nLXNpYmxpbmc6Om5vZGUoKVtpZCA9IC9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHNwdXVpZCArIFwiJ10vaWRdKVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdICsgMTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1YnByb2Nlc3NUeXBlID0gSlNPTi54cGF0aChcIi9jb25maWcvcHJvY2Vzc2VzL3N1YlByb2Nlc3Nlc1tfaWQgZXEgL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXS9pZF0vdHlwZVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGFydCA9IGxpYnJhcnkuZ2V0U3VicHJvZmlsZVN1YnByb2Nlc3NJZHMoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1YnByb2Nlc3NUeXBlID09IFBST0NFU1NfVFlQRV9TVUJQUk9GSUxFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXEgPSBKU09OLnhwYXRoKFwiY291bnQoL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXS9wcmVjZWRpbmctc2libGluZzo6bm9kZSgpW2lkID0gL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXS9pZCBhbmQgX2lkID0gL3N1YnByb2Nlc3Nlc1tfaWQgPSBcIitwYXJ0K1wiXS9faWRdKVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdICsgMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWVQYXRoID0gXCIvXCIgKyB2YXJpYWJsZU5hbWUgKyBcIltzZXEgZXEgJ1wiICsgc2VxICsgXCInXS92YWx1ZVwiO1xuICAgICAgICAgICAgICAgICAgICBzdWJqZWN0VmFsdWVDYWxjdWxhdGVkID0gSlNPTi54cGF0aCh2YWx1ZVBhdGgsIGZpbGUsIHt9KVswXTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9iaiA9PSAnc3RyaW5nJykge1xuXG4gICAgICAgICAgICAgICAgICAgIHN1YmplY3RWYWx1ZUNhbGN1bGF0ZWQgPSBvYmo7XG5cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIHZhciBpbnB1dFZhbHVlID0gcHJlcmVxdWlzaXRlLmNoZWNrLnZhcmlhYmxlLnZhbHVlLmRhdGE7XG4gICAgICAgICAgICAgICAgdmFyIGlucHV0RGF0YVR5cGUgPSBwcmVyZXF1aXNpdGUuY2hlY2sudmFyaWFibGUudmFsdWUuZGF0YVR5cGUuZGF0YVR5cGU7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFyIGZpbmFsVmFsdWU7XG4gICAgICAgICAgICAgICAgaWYoaW5wdXREYXRhVHlwZSA9PSAnbnVtYmVyJyApe1xuICAgICAgICAgICAgICAgICAgICBmaW5hbFZhbHVlID0gTnVtYmVyKGlucHV0VmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihpbnB1dERhdGFUeXBlID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbmFsVmFsdWUgPSBpbnB1dFZhbHVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihpbnB1dERhdGFUeXBlID09ICdpbnRlZ2VyJyl7XG4gICAgICAgICAgICAgICAgICAgIGZpbmFsVmFsdWUgPSBwYXJzZUludChpbnB1dFZhbHVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoaW5wdXREYXRhVHlwZSA9PSAnZGVjaW1hbCcpe1xuICAgICAgICAgICAgICAgICAgICBmaW5hbFZhbHVlID0gcGFyc2VGbG9hdChpbnB1dFZhbHVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoaW5wdXREYXRhVHlwZSA9PSAnZGF0ZScgfHwgaW5wdXREYXRhVHlwZSA9PSAnZGF0ZVRpbWUnICl7XG4gICAgICAgICAgICAgICAgICAgIGZpbmFsVmFsdWUgPSBpbnB1dFZhbHVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBjb21wYXJlID0gdXRpbC5jb21wYXJlKHN1YmplY3RWYWx1ZUNhbGN1bGF0ZWQsIHByZXJlcXVpc2l0ZS5jaGVjay52YXJpYWJsZS5vcGVyYXRvciwgZmluYWxWYWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbXBhcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1ZhcmlhYmxlIFByZS1yZXF1aXNpdGVzIHBhc3NlZC4nLCB7fSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGhlbHBlci5nZXRMYW5ndWFnZU1lc3NhZ2UocHJlcmVxdWlzaXRlLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRlByZVJlcXVpc2l0ZUVycm9yJywgbWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcblxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gaGVscGVyLmdldExhbmd1YWdlTWVzc2FnZShwcmVyZXF1aXNpdGUubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgdmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZQcmVSZXF1aXNpdGVFcnJvcjonLCBtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICB2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRlByZVJlcXVpc2l0ZUVycm9yJywgJ1ByZS1yZXF1aXNpdGUgdHlwZSBub3QgZGVmaW5lZC4nKTtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG5cbiAgICAgICAgfVxuXG4gICAgICAgXG5cbiAgICB9KTtcbn07XG5cbi8qKlxuICogUHJvY2VzcyBwcmUtYWN0aW9uc3NcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gcHJlQWN0aW9ucyAtIHRoZSBwcmUtYWN0aW9ucyBjb25maWcgZGF0YVxuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcbiAqXG4gKiBAZXhhbXBsZSAnJ1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cbmZ1bmN0aW9uIHByZUFjdGlvbnMocHJlQWN0aW9ucywgX1dGSW5zdGFuY2UsIHNwdXVpZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciBjb21wbGV0ZWQgPSBbXTtcbiAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgdmFyICBzcE9iamVjdCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIrIHNwdXVpZCArXCInXVwiLCBfV0ZJbnN0YW5jZSAsIHt9KVswXTtcbiAgICAgICAgICAgIHZhciBwcm9jZXNzSUQgPSBzcE9iamVjdFtcIm1ldGEtZGF0YVwiXS5wcm9jZXNzQ29uZmlnSWQ7XG4gICAgICAgICAgICB2YXIgcHJvY2Vzc0lkID0gc3BPYmplY3RbXCJtZXRhLWRhdGFcIl0uc3ViUHJvY2Vzc0NvbmZpZ0lkO1xuICAgICAgICAgICAgdmFyIHByb2Nlc3NTRVEgPSBzcE9iamVjdFtcIm1ldGEtZGF0YVwiXS5zdWJQcm9jZXNzSW5zU2VxO1xuICAgICAgICAgICAgdmFyIHByb2Nlc3NTZXEgPSBzcE9iamVjdFtcIm1ldGEtZGF0YVwiXS5zdWJQcm9jZXNzSW5zU2VxO1xuXG4gICAgICAgICAgICB2YXIgc3ViUHJvY2Vzc0NvbmZpZ09iamVjdCA9IEpTT04ueHBhdGgoXCIvcHJvY2Vzc2VzW19pZCBlcSAnXCIrcHJvY2Vzc0lEK1wiJ10vc3ViUHJvY2Vzc2VzW19pZCBlcSAnXCIrIHByb2Nlc3NJZCtcIiddXCIsIF9XRkluc3RhbmNlLmNvbmZpZyAsIHt9KVswXTtcbiAgICAgICAgICAgIHZhciBzdGVwT2JqZWN0ID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIisgc3B1dWlkICtcIiddL3N0ZXBcIixfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgdXRpbC5zeW5jTG9vcChwcmVBY3Rpb25zLmxlbmd0aCwgZnVuY3Rpb24gKGxvb3ApIHtcbiAgICAgICAgICAgICAgICB2YXIgY291bnRlciA9IGxvb3AuaXRlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgYWN0aW9uKHByZUFjdGlvbnNbY291bnRlcl0sIHByb2Nlc3NJRCwgcHJvY2Vzc1NFUSwgcHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzQ29uZmlnT2JqZWN0LCBzdGVwT2JqZWN0ICxfV0ZJbnN0YW5jZSwge30sIHNwdXVpZCkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBhbGwgcHJlLXJlcXVpc2l0ZXMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS5cbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVkLnB1c2godHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGxvb3AubmV4dCgpO1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVkLnB1c2goZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBsb29wLmJyZWFrKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZWQuZXZlcnkoQm9vbGVhbikpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1ByZS1hY3Rpb25zIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywge30pO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGUHJlUmVxdWlzaXRlRXJyb3InLCAnTm90IGFsbCBwcmUtYWN0aW9ucyBwYXNzZWQuJyk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFdvcmtmbG93IGdldCBzdWItcHJvY2VzcyBkYXRhLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIHRoZSBzdWJQcm9jZXNzIGNvbmZpZyBpZFxuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcbiAqXG4gKiBAZXhhbXBsZSBcIlwiXG4gKlxuICogQHJldHVybiBcIlwiXG4gKlxuICovXG5mdW5jdGlvbiBnZXRTdWJQcm9jZXNzKGlkLCBfV0ZJbnN0YW5jZSkge1xuICAgIGlmIChfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChzdWJQcm9jZXNzKSB7XG4gICAgICAgICAgICBpZiAoc3ViUHJvY2Vzcy5pZCA9PSBpZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdWJQcm9jZXNzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuICAgIH1cblxufTtcblxuLyoqXG4gKiBQcm9jZXNzIHN1Yi1wcm9jZXNzXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHByb2Nlc3MgLSB0aGUgY3VycmVudCBwcm9jZXNzIGlkIGFuZCBzZXFcbiAqIEBwYXJhbSB7b2JqZWN0fSBzdWJQcm9jZXNzIC0gdGhlIHN1Yi1wcm9jZXNzIGlkIGFuZCBzZXFcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIC0gdGhlIHVzZXIgaW5wdXQgZGF0YVxuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcbiAqXG4gKiBAZXhhbXBsZSAnJ1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cbmZ1bmN0aW9uIHN1YlByb2Nlc3MocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN1YnByb2ZpbGVJZCwgZGF0YSwgX1dGSW5zdGFuY2UpIHtcbiAgICAvLyBHZXQgdGhlIGN1cnJlbnQgcHJvY2VzcyBzdWJQcm9jZXNzIGluc3RhbmNlXG4gICAgLy8gdmFyIHN1YlByb2Nlc3NTZXEgPSAxO1xuICAgIHZhciBzdWJQcm9jZXNzID0gW107XG4gICAgdmFyIHByb2Nlc3NDb25mID0gW107XG4gICAgdmFyIHN1YlByb2Nlc3NDb25mID0gW107XG4gICAgX1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbiAob2JqUHJvY2Vzcykge1xuICAgICAgICBpZiAob2JqUHJvY2Vzcy5pZCA9PSBwcm9jZXNzSWQgJiYgb2JqUHJvY2Vzcy5zZXEgPT0gcHJvY2Vzc1NlcSkge1xuICAgICAgICAgICAgdmFyIHNwTGVuZ3RoID0gb2JqUHJvY2Vzcy5zdWJQcm9jZXNzZXMubGVuZ3RoO1xuICAgICAgICAgICAgb2JqUHJvY2Vzcy5zdWJQcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChvYmpTdWJQcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9ialN1YlByb2Nlc3MuaWQgPT0gc3ViUHJvY2Vzc0lkICYmIG9ialN1YlByb2Nlc3Muc2VxID09IHN1YlByb2Nlc3NTZXEpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHV1aWQgPSBvYmpTdWJQcm9jZXNzLnV1aWQ7XG4gICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKHN1YlByb2Nlc3NJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3ViUHJvY2Vzc0l0ZW0uX2lkID09IHV1aWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzID0gc3ViUHJvY2Vzc0l0ZW07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgIH0pO1xuICAgIC8vIEdldCB0aGUgY3VycmVudCBzdWJQcm9jZXNzIGNvbmZpZ3VyYXRpb25cbiAgICBfV0ZJbnN0YW5jZS5jb25maWcucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbiAocHJvY2Vzc0NvbmZpZykge1xuICAgICAgICBpZiAocHJvY2Vzc0NvbmZpZy5faWQgPT0gcHJvY2Vzc0lkKSB7XG4gICAgICAgICAgICBwcm9jZXNzQ29uZiA9IHByb2Nlc3NDb25maWc7XG4gICAgICAgICAgICBwcm9jZXNzQ29uZmlnLnN1YlByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKHN1YlByb2Nlc3NDb25maWcpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3ViUHJvY2Vzc0NvbmZpZy5faWQgPT0gc3ViUHJvY2Vzc0lkKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NDb25mID0gc3ViUHJvY2Vzc0NvbmZpZztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgLy9UT0RPOiBDaGFuZ2UgcmVxdWlyZWQgdG8gbW92ZSBpc0FjdGl2ZSB0byBzdWJQcm9jZXNzIGZpbGUuSGVyZVxuICAgIHZhciBncm91cEtleSA9ICcnO1xuICAgIHZhciBiYXNlVVVJRCA9IGRhdGEuYmFzZVVVSUQ7XG4gICAgXG4gICAgaWYgKGJhc2VVVUlEICE9IHVuZGVmaW5lZCAmJiBiYXNlVVVJRCAhPSAnJyAmJiBiYXNlVVVJRC5sZW5ndGggPiAwKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgcHJldmlvdXNPYmplY3QgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgYmFzZVVVSUQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgIGdyb3VwS2V5ID0gcHJldmlvdXNPYmplY3QuZ3JvdXBLZXk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIHZhciBjYXJkSW5kTGlzdCA9ICcnO1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgc3ViUHJvY2Vzc0NvbmYuaW5kaWNhdG9ycy5sZW5ndGgtMTsgaSsrKXtcbiAgICAgICAgICAgIGNhcmRJbmRMaXN0ID0gY2FyZEluZExpc3QgKyBcIidcIisgc3ViUHJvY2Vzc0NvbmYuaW5kaWNhdG9yc1tpXS5faWQgKyBcIicsXCI7XG4gICAgICAgIH1cbiAgICAgICAgY2FyZEluZExpc3QgPSBjYXJkSW5kTGlzdCArIFwiJ1wiKyBzdWJQcm9jZXNzQ29uZi5pbmRpY2F0b3JzW2ldLl9pZCArIFwiJ1wiO1xuICAgICAgICB2YXIgc2luZ2xlQ2FyZCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tzZXRJZCA9IChcIisgY2FyZEluZExpc3QgK1wiKSBhbmQgY2FyZGluYWxpdHkgZXEgJ3NpbmdsZSddXCIsIGFwcC5TQ09QRS5BUFBfQ09ORklHLHt9KS5sZW5ndGg7XG5cbiAgICAgICAgaWYoc3ViUHJvY2Vzc0NvbmYuaW5zdGFuY2VUeXBlLm5ld1NlcXVlbmNlICE9IHVuZGVmaW5lZCB8fCBzaW5nbGVDYXJkID4gMCl7XG4gICAgICAgICAgICB2YXIgcHJldmlvdXNPYmplY3QgPSBKU09OLnhwYXRoKFwiL2luc3RhbmNlL3Byb2Nlc3Nlc1tpZCBlcSAnXCIgKyBwcm9jZXNzSWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICBpZihwcmV2aW91c09iamVjdCAhPSB1bmRlZmluZWQgJiYgcHJldmlvdXNPYmplY3Quc3ViUHJvY2Vzc2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBncm91cEtleSA9IHByZXZpb3VzT2JqZWN0LnN1YlByb2Nlc3Nlc1swXS5ncm91cEtleTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZ3JvdXBLZXkgPSBnZW5lcmF0ZVVVSUQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdyb3VwS2V5ID0gZ2VuZXJhdGVVVUlEKCk7XG5cbiAgICAgICAgfSBcbiAgICAgfVxuICAgIFxuICAgIHZhciBjb3VudFN1YnByb2Nlc3NJbkNvbnRleHQgPSBKU09OLnhwYXRoKFwiY291bnQoL3Byb2Nlc3Nlcy9zdWJQcm9jZXNzZXNbZ3JvdXBLZXkgZXEgJ1wiKyBncm91cEtleSArXCInXSlcIiwgX1dGSW5zdGFuY2UuaW5zdGFuY2UgLHt9KVswXTtcbiAgICB2YXIgbGFiZWwgPSBkYXRhLmxhYmVsO1xuICAgIHZhciBzdWJQcm9jZXNzT2JqZWN0SWQgPSBnZW5lcmF0ZVVVSUQoKTtcbiAgICB2YXIgbW9kZWwgPSB7XG4gICAgICAgIF9pZDogc3ViUHJvY2Vzc09iamVjdElkLFxuICAgICAgICBpZDogc3ViUHJvY2Vzc0lkLFxuICAgICAgICB0eXBlOiAnd29ya2Zsb3dJbnN0YW5jZVN1YlByb2Nlc3MnLFxuICAgICAgICBkYXRlVGltZUNyZWF0ZWQ6IG1vbWVudCgpLmZvcm1hdCgpLFxuICAgICAgICBkdWVEYXRlVGltZTogbW9tZW50KCkuZm9ybWF0KCksXG4gICAgICAgIHNlcTogc3ViUHJvY2Vzc1NlcSxcbiAgICAgICAgaW5pdGlhdGVkOiBmYWxzZSxcbiAgICAgICAgZGF0ZXM6IHtcbiAgICAgICAgICAgIGNyZWF0ZWQ6ICcnLFxuICAgICAgICAgICAgdmFsaWQ6ICcnLFxuICAgICAgICAgICAgc3RhcnQ6ICcnLFxuICAgICAgICAgICAgZHVlOiAnJyxcbiAgICAgICAgICAgIGNsb3NlZDogJydcbiAgICAgICAgfSxcbiAgICAgICAgY29tcGxldGU6IGZhbHNlLFxuICAgICAgICBpbmRpY2F0b3JzOiBbXSxcbiAgICAgICAgc3RlcDoge30sXG4gICAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgZ3JvdXBLZXk6IGdyb3VwS2V5LFxuICAgICAgICBsYWJlbDogbGFiZWwsXG4gICAgICAgIGNoYW5uZWxzOiBbXG4gICAgICAgICAgICBcImNvbW11bml0eV9cIiArIGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpLFxuICAgICAgICAgICAgXCJwcm9maWxlX1wiICsgYXBwLlNDT1BFLnByb2ZpbGVJZCxcbiAgICAgICAgICAgIFwiYXBwbGljYXRpb25fXCIgKyBhcHAuU0NPUEUuYXBwbGljYXRpb25JZCxcbiAgICAgICAgICAgIFwiY29tbXVuaXR5X1wiICsgYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCkgKyBcIl9hcHBsaWNhdGlvbl9cIiArIGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkXG4gICAgICAgIF0sXG4gICAgICAgIGhpc3Rvcnk6IFtdLFxuICAgICAgICAvL21ldGEgaW5mb3JtYXRpb24gYWRkZWQgZm9yIHNlcnZlciBzaWRlIGNvbmZsaWN0IG1hbmFnZW1lbnQgYW5kIG1lcmdlclxuICAgICAgICBcIm1ldGEtZGF0YVwiOiB7XG4gICAgICAgICAgICBhcHBsaWNhdGlvbklkOiBhcHAuU0NPUEUuYXBwbGljYXRpb25JZCxcbiAgICAgICAgICAgIGNvbW11bml0eUlkOiBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKSxcbiAgICAgICAgICAgIHByb2ZpbGVJZDogYXBwLlNDT1BFLnByb2ZpbGVJZCxcbiAgICAgICAgICAgIHN1YnByb2ZpbGVJZDogc3VicHJvZmlsZUlkID09IHVuZGVmaW5lZD8gJyc6IHN1YnByb2ZpbGVJZCxcbiAgICAgICAgICAgIHByb2Nlc3NDb25maWdJZDogcHJvY2Vzc0lkLFxuICAgICAgICAgICAgc3ViUHJvY2Vzc0NvbmZpZ0lkOiBzdWJQcm9jZXNzSWQsXG4gICAgICAgICAgICBzdWJQcm9jZXNzSW5zU2VxOiBjb3VudFN1YnByb2Nlc3NJbkNvbnRleHQgKyAxXG4gICAgICAgIH0sXG4gICAgICAgIG1lc3NhZ2VzOiBbXSxcbiAgICAgICAgc3BTdGF0dXM6JydcbiAgICB9O1xuXG4gICAgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzLnB1c2gobW9kZWwpO1xuICAgIC8vIFJldHVybiBhIHByb21pc2VcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAvLyBDYXRjaCBhbGwgdW5jYXVnaHQgZXJyb3JzXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyAxLiBQcm9jZXNzIHRoZSBwcmUtYWN0aW9uc1xuICAgICAgICAgICAgdmFyIHByZUFjdGlvbnNDb25mID0gcHJvY2Vzc0NvbmYucHJlQWN0aW9ucztcbiAgICAgICAgICAgIC8vYWN0aW9uKGFjdGlvbnNbY291bnRlcl0sIHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdWJQcm9jZXNzLCBzdGVwLCBfV0ZJbnN0YW5jZSwgZGF0YSwgdXVpZClcbiAgICAgICAgICAgIHByZUFjdGlvbnMocHJlQWN0aW9uc0NvbmYsIF9XRkluc3RhbmNlLCBzdWJQcm9jZXNzT2JqZWN0SWQpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIC8vIDIuIFByb2Nlc3MgdGhlIHByZS1yZXF1aXNpdGVzXG4gICAgICAgICAgICAgICAgdmFyIHByZXJlcXVpc2l0ZUNvbmYgPSBwcm9jZXNzQ29uZi5wcmVyZXF1aXNpdGVzO1xuICAgICAgICAgICAgICAgIHByZVJlcXVpc2l0ZXMocHJlcmVxdWlzaXRlQ29uZiwgX1dGSW5zdGFuY2UsIHN1YlByb2Nlc3NPYmplY3RJZCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIDMuIEluaXRpYXRlIHRoZSBzdWJQcm9jZXNzXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbml0aWF0ZUNvbmYgPSBzdWJQcm9jZXNzQ29uZi5pbml0aWF0ZTtcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhdGUoaW5pdGlhdGVDb25mLCBzdWJQcm9jZXNzLCBkYXRhKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vVXBkYXRlIHRoZSBzdWJQcm9jZXNzIG1vZGVsXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5pbml0aWF0ZWQgPSByZXN1bHQuZGF0YS5pbml0aWF0ZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5kYXRlcyA9IHJlc3VsdC5kYXRhLmRhdGVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRXhlY3V0ZSB0aGUgZmlyc3Qgc3RlcFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0ZXBJZCA9IHN1YlByb2Nlc3NDb25mLnN0ZXBzWzBdLl9pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0cmFuc2l0aW9uSWQgPSBzdWJQcm9jZXNzQ29uZi5zdGVwc1swXS50cmFuc2l0aW9uWzBdLl9pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGVwU2VxID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXAocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwgc3RlcFNlcSwgZGF0YSwgX1dGSW5zdGFuY2UsIHN1YlByb2Nlc3NPYmplY3RJZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLnN0ZXAgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kaWNhdG9ycyhzdWJQcm9jZXNzQ29uZi5pbmRpY2F0b3JzLCBfV0ZJbnN0YW5jZSwgbW9kZWwuX2lkKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5pbmRpY2F0b3JzID0gcmVzdWx0MS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRXhlY3V0ZSB0aGUgdHJhbnNpdGlvbnMsIGlmIGF1dG9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vU3VicHJvY2VzcyBwb3N0QWN0aW9ucyByZW1vdmVkIGZyb20gaGVyZSBhcyB0aGV5IHNob3VsZCBiZSBleGVjdXRlZCBhdCB0aGUgZW5kIG9mIHRoZSBzdWJQcm9jZXNzLCBtZWFucyBhdCBsYXN0IHN0ZXAgYWZ0ZXIgdHJhbnNpdGlvbiwganVzdCBiZWZvcmUgZmluaXNoLlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2FuIGFkZCBoaXN0b3J5IG9iamVjdCBoZXJlIGluIGNhc2UgZm9yIGZpcnN0IHN0ZXAsIGkuZSBpbml0aWFsaXNhdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbW9kZWwuaGlzdG9yeS5wdXNoKHJlc3VsdC5kYXRhKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcyhyZXN1bHQxLm1lc3NhZ2UsIG1vZGVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLnN1YnByb2Nlc3NlcyA9IF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhKG9iai5faWQgPT0gc3ViUHJvY2Vzc09iamVjdElkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMgPSBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhKG9iai5faWQgPT0gc3ViUHJvY2Vzc09iamVjdElkKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzID0gX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhKG9iai5faWQgPT0gc3ViUHJvY2Vzc09iamVjdElkKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cblxuICAgIH0pO1xufTtcblxuLyoqXG4gKiBQcm9jZXNzIGluaXRpYXRlXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGluaXRpYXRlIC0gdGhlIGluaXRpYXRlIGNvbmZpZyBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gZGF0YSAtIHRoZSB1c2VyIGlucHV0IGRhdGFcbiAqXG4gKiBAZXhhbXBsZSAnJ1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cbmZ1bmN0aW9uIGluaXRpYXRlKGluaXRpYXRlLCBzdWJQcm9jZXNzLCBkYXRhKSB7XG4gICAgdmFyIGNvbXBsZXRlZCA9IFtdO1xuICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgIGluaXRpYXRlZDogZmFsc2UsXG4gICAgICAgIGRhdGVzOiB7XG4gICAgICAgICAgICBjcmVhdGVkOiAnJyxcbiAgICAgICAgICAgIHZhbGlkOiAnJyxcbiAgICAgICAgICAgIHN0YXJ0OiAnJyxcbiAgICAgICAgICAgIGR1ZTogJycsXG4gICAgICAgICAgICBjbG9zZWQ6ICcnXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgaWYgKGluaXRpYXRlLnVzZXIgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmRhdGVzLmNyZWF0ZWQgPSBkYXRhLmNyZWF0ZWREYXRlO1xuICAgICAgICAgICAgICAgIGlmIChpbml0aWF0ZS51c2VyLnZhbGlkRGF0ZS5fdHlwZSA9PSAndXNlclNlbGVjdGVkJyB8fCBpbml0aWF0ZS51c2VyLnZhbGlkRGF0ZS5fdHlwZSA9PSAnYXV0b1NlbGVjdGVkJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS52YWxpZERhdGUgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZGF0ZXMudmFsaWQgPSBkYXRhLnZhbGlkRGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5kYXRlcy52YWxpZCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zdWJzdHJpbmcoMCwxMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChpbml0aWF0ZS51c2VyLmR1ZURhdGUuX3R5cGUgPT0gJ3VzZXJTZWxlY3RlZCcgfHwgaW5pdGlhdGUudXNlci5kdWVEYXRlLl90eXBlID09ICdhdXRvU2VsZWN0ZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmR1ZURhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmRhdGVzLmR1ZSA9IGRhdGEuZHVlRGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwud2FybignV0ZJbml0aWF0ZUVycm9yJywgJ05vIGR1ZSBkYXRlIHBhc3NlZCBpbiAtIHtkYXRhLmR1ZURhdGV9Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlc3VsdC5kYXRlcy5zdGFydCA9IGRhdGEuZmlyc3REYXRlO1xuXG5cblxuICAgICAgICAgICAgICAgIHJlc3VsdC5pbml0aWF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdTdWItUHJvY2VzcyBpbml0aWF0ZSBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChpbml0aWF0ZS5hdXRvICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICByZXN1bHQuZGF0ZXMuY3JlYXRlZCA9IGRhdGEuY3JlYXRlZERhdGU7XG5cbiAgICAgICAgICAgICAgICBpZiAoaW5pdGlhdGUuZGF0ZXMudmFsaWQuX3R5cGUgPT0gJ3VzZXJTZWxlY3RlZCcgfHwgaW5pdGlhdGUuZGF0ZXMudmFsaWQuX3R5cGUgPT0gJ2F1dG9TZWxlY3RlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEudmFsaWREYXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5kYXRlcy52YWxpZCA9IGRhdGEudmFsaWREYXRlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC53YXJuKCdXRkluaXRpYXRlRXJyb3InLCAnTm8gdmFsaWQgZGF0ZSBwYXNzZWQgaW4gLSB7ZGF0YS52YWxpZERhdGV9Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChpbml0aWF0ZS5kYXRlcy5kdWUuX3R5cGUgPT0gJ3VzZXJTZWxlY3RlZCcgfHwgaW5pdGlhdGUuZGF0ZXMuZHVlLl90eXBlID09ICdhdXRvU2VsZWN0ZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmR1ZURhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmRhdGVzLmR1ZSA9IGRhdGEuZHVlRGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwud2FybignV0ZJbml0aWF0ZUVycm9yJywgJ05vIGR1ZSBkYXRlIHBhc3NlZCBpbiAtIHtkYXRhLmR1ZURhdGV9Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlc3VsdC5pbml0aWF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdTdWItUHJvY2VzcyBpbml0aWF0ZSBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTsqL1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgdmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZJbml0aWF0ZUVycm9yJywgJ0luaXRpYXRlIHR5cGU6ICcgKyBpbml0aWF0ZS5fdHlwZSArICcgbm90IGRlZmluZWQuJyk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3ViUHJvY2Vzcy5jb21wbGV0ZSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGluaXQoKTtcbiAgICAgICAgfSBlbHNlIGlmICghc3ViUHJvY2Vzcy5jb21wbGV0ZSkge1xuICAgICAgICAgICAgaWYgKGluaXRpYXRlLnBhcmFsbGVsSW5zdGFuY2VzKSB7XG4gICAgICAgICAgICAgICAgaW5pdCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRkluaXRpYXRlRXJyb3InLCAnU3ViLXByb2Nlc3M6ICcgKyBzdWJQcm9jZXNzLmlkICsgJyBzdGlsbCBhY3RpdmUgYW5kIHBhcmFsbGVsIGluc3RhbmNlcyBhcmUgbm90IGFsbG93ZWQuJyk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9KTtcbn07XG5cbi8qKlxuICogUHJvY2VzcyBzdGVwXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NJZCAtIHRoZSBjdXJyZW50IHByb2Nlc3MgaWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdWJQcm9jZXNzSWQgLSB0aGUgY3VycmVudCBzdWItcHJvY2VzcyBpZFxuICogQHBhcmFtIHtzdHJpbmd9IHN0ZXBJZCAtIHRoZSBjdXJyZW50IHN1Yi1wcm9jZXNzIHN0ZXAgaWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGVwU2VxIC0gdGhlIGN1cnJlbnQgc3ViLXByb2Nlc3Mgc3RlcCBpbnN0YW5jZSBjb3VudGVyIC8gc2VxdWVuY2VcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIC0gdGhlIHVzZXIgaW5wdXQgZGF0YVxuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgX1dGSW5zdGFuY2UgY29uc3RydWN0b3IgaW5zdGFuY2VcbiAqXG4gKiBAZXhhbXBsZSAnJ1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cbmZ1bmN0aW9uIHN0ZXAocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwgc3RlcFNlcSwgZGF0YSwgX1dGSW5zdGFuY2UsIHNwdXVpZCkge1xuXG4gICAgLy8gRGVmYXVsdCBzdGVwIG1vZGVsXG4gICAgdmFyIG1vZGVsID0ge1xuICAgICAgICBrZXk6IGdlbmVyYXRlVVVJRCgpLFxuICAgICAgICBpZDogJycsXG4gICAgICAgIHNlcTogJycsXG4gICAgICAgIHN0YXR1czogJycsXG4gICAgICAgIG1lc3NhZ2U6ICcnLFxuICAgICAgICBhc3NpZ25lZFRvOiB7XG4gICAgICAgICAgICB1c2VySWQ6ICcnLFxuICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICBkYXRlVGltZTonJyxcbiAgICAgICAgICAgIHR5cGU6JycsXG4gICAgICAgICAgICBkdWVEYXRlVGltZTonJyxcbiAgICAgICAgICAgIGJ5OicnXG4gICAgICAgIH0sXG4gICAgICAgIGFzc2lnbm1lbnRIaXN0b3J5OltdLFxuICAgICAgICBkYXRlVGltZUNyZWF0ZWQ6IG1vbWVudCgpLmZvcm1hdCgpLFxuICAgICAgICBkdWVEYXRlVGltZTogbW9tZW50KCkuZm9ybWF0KCksXG4gICAgICAgIHRyYW5zaXRpb246e1xuICAgICAgICAgICAgdHJhbnNpdGlvbklkOicnLFxuICAgICAgICAgICAgZGF0ZVRpbWU6JycsXG4gICAgICAgICAgICB1c2VySWQ6ICcnXG4gICAgICAgIH0sXG4gICAgICAgIGFzc2lnbm1lbnQ6IHt9LFxuICAgICAgICBjb21tZW50OiAnJ1xuICAgIH07XG5cbiAgICB2YXIgc3ViUHJvY2VzcyA9IHt9O1xuXG4gICAgdmFyIHV1aWQgPSAnJztcbiAgICB2YXIgaW5zdFN1YlByb2Nlc3M7XG4gICAgdmFyIHN0ZXAgPSB7fTtcblxuICAgIHZhciB0cmFuc2l0aW9uSWQgPSAnJztcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy9HZXQgdGhlIGN1cnJlbnQgc3ViUHJvY2VzcyBpbnN0YW5jZSBkYXRhXG4gICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbnN0YW5jZS5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChvYmpQcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9ialByb2Nlc3MuaWQgPT0gcHJvY2Vzc0lkICYmIG9ialByb2Nlc3Muc2VxID09IHByb2Nlc3NTZXEpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqUHJvY2Vzcy5zdWJQcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChvYmpTdWJQcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqU3ViUHJvY2Vzcy5pZCA9PSBzdWJQcm9jZXNzSWQgJiYgb2JqU3ViUHJvY2Vzcy5zZXEgPT0gc3ViUHJvY2Vzc1NlcSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV1aWQgPSBvYmpTdWJQcm9jZXNzLnV1aWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChzdWJQcm9jZXNzSXRlbSkge1xuICAgICAgICAgICAgICAgIGlmIChzdWJQcm9jZXNzSXRlbS5faWQgPT0gdXVpZCkge1xuICAgICAgICAgICAgICAgICAgICBpbnN0U3ViUHJvY2VzcyA9IHN1YlByb2Nlc3NJdGVtO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF9XRkluc3RhbmNlLmNvbmZpZy5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChvYmpQcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9ialByb2Nlc3MuX2lkID09IHByb2Nlc3NJZCkge1xuICAgICAgICAgICAgICAgICAgICBvYmpQcm9jZXNzLnN1YlByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKG9ialN1YlByb2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmpTdWJQcm9jZXNzLl9pZCA9PSBzdWJQcm9jZXNzSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzID0gb2JqU3ViUHJvY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmpTdWJQcm9jZXNzLnN0ZXBzLmZpbHRlcihmdW5jdGlvbiAob2JqU3RlcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqU3RlcC5faWQgPT0gc3RlcElkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwID0gb2JqU3RlcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIHN1Yi1wcm9jZXNzIHN0ZXAgZGF0YVxuICAgICAgICAgICAgbW9kZWwuaWQgPSBzdGVwSWQ7XG4gICAgICAgICAgICBtb2RlbC5zZXEgPSBzdGVwU2VxO1xuXG4gICAgICAgICAgICB2YXIgaW5zdGFuY2VTdGF0dXMgPSAnJztcbiAgICAgICAgICAgIGlmIChzdGVwLnNldEluc3RhbmNlU3RhdHVzVG8uTm90U3RhcnRlZCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVN0YXR1cyA9IFwiTm90U3RhcnRlZFwiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGVwLnNldEluc3RhbmNlU3RhdHVzVG8uQ3JlYXRlZCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVN0YXR1cyA9IFwiQ3JlYXRlZFwiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGVwLnNldEluc3RhbmNlU3RhdHVzVG8uSW5Qcm9ncmVzcyAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVN0YXR1cyA9IFwiSW5Qcm9ncmVzc1wiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGVwLnNldEluc3RhbmNlU3RhdHVzVG8uU3VibWl0dGVkICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlU3RhdHVzID0gXCJTdWJtaXR0ZWRcIjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RlcC5zZXRJbnN0YW5jZVN0YXR1c1RvLkNvbXBsZXRlICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlU3RhdHVzID0gXCJDb21wbGV0ZVwiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgbGFuZ3VhZ2UgPSBzZXJ2aWNlLmdldExhbmd1YWdlKCk7XG5cbiAgICAgICAgICAgIG1vZGVsLnN0YXR1cyA9IGluc3RhbmNlU3RhdHVzO1xuICAgICAgICAgICAgbW9kZWwubWVzc2FnZSA9IGV2YWwoXCJzdGVwLnNldEluc3RhbmNlU3RhdHVzVG8uXCIgKyBpbnN0YW5jZVN0YXR1cyArIFwiLmxhYmVsLmkxOG4uXCIgKyBsYW5ndWFnZSk7XG4gICAgICAgICAgICBtb2RlbC5jb21tZW50ID0gZGF0YS5jb21tZW50ICE9PSB1bmRlZmluZWQgPyBkYXRhLmNvbW1lbnQgOiAnJztcbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JzID0gaW5zdFN1YlByb2Nlc3MgIT09IHVuZGVmaW5lZCA/IGluc3RTdWJQcm9jZXNzLmluZGljYXRvcnMgOiBbXTtcblxuICAgICAgICAgICAgdmFyIHVwZGF0ZVNQSW5kaWNhdG9yT2JqZWN0ID0gZnVuY3Rpb24oaW5kaWNhdG9ycywgX1dGSW5zdGFuY2Upe1xuXG4gICAgICAgICAgICAgICAgaWYoaW5kaWNhdG9ycy5sZW5ndGggPiAwKXtcblxuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGk9MCA7IGkgPCBpbmRpY2F0b3JzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3JPYmplY3QgID0gaW5kaWNhdG9yc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1dWlkID0gaW5kaWNhdG9yT2JqZWN0Lmluc3RhbmNlc1swXS51dWlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVwZGF0ZWRTZXEgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbX2lkIGVxICdcIisgdXVpZCArXCInXS9tb2RlbC9wZW5kaW5nL3NlcVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kaWNhdG9yT2JqZWN0Lmluc3RhbmNlc1swXS5zZXEgPSB1cGRhdGVkU2VxO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpbmRpY2F0b3JEb2NzKHByb2Nlc3NJZCwgaW5kaWNhdG9ycywgbW9kZWwsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICB1dWlkID0gc3B1dWlkO1xuXG4gICAgICAgICAgICAgICAgaWYgKHN0ZXAuZnVuY3Rpb24uYWN0aW9ucyAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9ucyhzdGVwLmZ1bmN0aW9uLmFjdGlvbnMsIHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdWJQcm9jZXNzLCBtb2RlbCwgX1dGSW5zdGFuY2UsIGRhdGEsIHNwdXVpZClcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVTUEluZGljYXRvck9iamVjdChpbmRpY2F0b3JzLCBfV0ZJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRyYW5zaXRpb25JZCA9IHN0ZXAudHJhbnNpdGlvblswXS5faWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbihwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3RlcElkLCB0cmFuc2l0aW9uSWQsIGRhdGEsIF9XRkluc3RhbmNlLCBzcHV1aWQsIG1vZGVsKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1RyYW5zaXRpb24gY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCByZXN1bHQuZGF0YS5zdGVwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdGVwLmZ1bmN0aW9uLnRhc2sgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE1ha2UgYXNzaWdubWVudHNcbiAgICAgICAgICAgICAgICAgICAgdGFzayhwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN0ZXAuZnVuY3Rpb24udGFzaywgc3B1dWlkLCBtb2RlbCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVNQSW5kaWNhdG9yT2JqZWN0KGluZGljYXRvcnMsIF9XRkluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdUYXNrIGF3YWl0aW5nIHVzZXIgYWN0aW9uLicsIG1vZGVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RlcC5mdW5jdGlvbi5zZXJ2ZXIgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE1ha2UgYXNzaWdubWVudHNcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyKHN0ZXAuZnVuY3Rpb24uc2VydmVyLCBwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3ViUHJvY2VzcywgbW9kZWwsIF9XRkluc3RhbmNlLCBkYXRhLCBzcHV1aWQpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVTUEluZGljYXRvck9iamVjdChpbmRpY2F0b3JzLCBfV0ZJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnU2VydmVyIGF3YWl0aW5nIHNlcnZlciByZXNwb25zZS4nLCBtb2RlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cblxuICAgIH0pO1xufTtcblxuLyoqXG4gKiBQcm9jZXNzIGluZGljYXRvciB1cGRhdGVzXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGFjdGlvbnMgLSB0aGUgYWN0aW9ucyBjb25maWcgZGF0YVxuICogQHBhcmFtIHtvYmplY3R9IHN1YlByb2Nlc3MgLSB0aGUgY3VycmVudCBzdWItcHJvY2VzcyBmb3JtIGNvbmZpZyBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuZnVuY3Rpb24gaW5kaWNhdG9ycyhpbmRpY2F0b3JzLCBfV0ZJbnN0YW5jZSwgc3B1dWlkKSB7XG4gICAgdmFyIG1vZGVsID0gW107XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciBhcnJheSA9IEpTT04ueHBhdGgoXCJpbmRpY2F0b3JzW2ZuOmNvdW50KC4vd29ya2Zsb3dzL3Byb2Nlc3Nlc1tzdWJQcm9jZXNzVVVJRCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddKSBndCAwXVwiLCBfV0ZJbnN0YW5jZSwge30pO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBhcnJheS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3IgPSBhcnJheVtqXTtcbiAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yTW9kZWwgPSB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2VzOiBbXVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBpbnN0YW5jZU1vZGVsID0ge1xuICAgICAgICAgICAgICAgICAgICB1dWlkOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICcnLFxuICAgICAgICAgICAgICAgICAgICBrZXk6ICcnLFxuICAgICAgICAgICAgICAgICAgICBzZXE6IDEsXG4gICAgICAgICAgICAgICAgICAgIHJldjogJydcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpbmRpY2F0b3JNb2RlbC5pZCA9IGluZGljYXRvci5jYXRlZ29yeS50ZXJtO1xuICAgICAgICAgICAgICAgIGluc3RhbmNlTW9kZWwudXVpZCA9IGluZGljYXRvci5faWQ7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VNb2RlbC5yZXYgPSBpbmRpY2F0b3IuX3JldjtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZU1vZGVsLnRpdGxlID0gaW5kaWNhdG9yLnRpdGxlO1xuICAgICAgICAgICAgICAgIGluc3RhbmNlTW9kZWwua2V5ID0gJyc7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VNb2RlbC5zZXEgPSBpbmRpY2F0b3IubW9kZWwucGVuZGluZy5zZXE7IC8vIGluZGljYXRvciBzZXEgbnVtYmVyIGhlcmUgd2hpY2ggaXMgZ2V0dGluZyB1cGRhdGVkLlxuICAgICAgICAgICAgICAgIGluZGljYXRvck1vZGVsLmluc3RhbmNlcy5wdXNoKGluc3RhbmNlTW9kZWwpO1xuICAgICAgICAgICAgICAgIG1vZGVsLnB1c2goaW5kaWNhdG9yTW9kZWwpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnUHJvY2VzcyBpbmRpY2F0b3IgbW9kZWwgdXBkYXRlZC4nLCBtb2RlbCk7XG4gICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG5cbiAgICB9KVxufTtcblxuLyoqXG4gKiBQcm9jZXNzIGFzc2lnbiB1c2VyXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHByb2Nlc3MgaWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBwcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHByb2Nlc3Mgc2VxXG4gKiBAcGFyYW0ge3N0cmluZ30gc3ViUHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3ViLXByb2Nlc3MgaWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdWJQcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHN1Yi1wcm9jZXNzIHNlcVxuICogQHBhcmFtIHtzdHJpbmd9IHN0ZXBJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN0ZXAgaWRcbiAqIEBwYXJhbSB7c3RyaW5nfSB0cmFuc2l0aW9uSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiB0cmFuc2l0aW9uIGlkXG4gKiBAcGFyYW0ge29iamVjdH0gdXNlciAtIHRoZSB1c2VyIHRvIGFzc2lnbiB0b1xuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcbiAqXG4gKiBAZXhhbXBsZSAnJ1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cbmZ1bmN0aW9uIGFzc2lnblVzZXIocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHVzZXIsIHV1aWQsIF9XRkluc3RhbmNlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBHZXQgdGhlIGN1cnJlbnQgc3ViUHJvY2VzcyBpbnN0YW5jZSBkYXRhXG5cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbnN0YW5jZS5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChvYmpQcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9ialByb2Nlc3MuaWQgPT0gcHJvY2Vzc0lkICYmIG9ialByb2Nlc3Muc2VxID09IHByb2Nlc3NTZXEpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqUHJvY2Vzcy5zdWJQcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChvYmpTdWJQcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqU3ViUHJvY2Vzcy5pZCA9PSBzdWJQcm9jZXNzSWQgJiYgb2JqU3ViUHJvY2Vzcy5zZXEgPT0gc3ViUHJvY2Vzc1NlcSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV1aWQgPSBvYmpTdWJQcm9jZXNzLnV1aWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbiAoc3ViUHJvY2Vzc0l0ZW0pIHtcbiAgICAgICAgICAgICAgICBpZiAoc3ViUHJvY2Vzc0l0ZW0uX2lkID09IHV1aWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9BZGRlZCB0byBoc3RvcnlcbiAgICAgICAgICAgICAgICAgICAgaWYoc3ViUHJvY2Vzc0l0ZW0uc3RlcC5hc3NpZ25tZW50SGlzdG9yeSA9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc0l0ZW0uc3RlcC5hc3NpZ25tZW50SGlzdG9yeSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKHN1YlByb2Nlc3NJdGVtLnN0ZXAuYXNzaWduZWRUby51c2VySWQgIT0gXCJcIiAmJiBzdWJQcm9jZXNzSXRlbS5zdGVwLmFzc2lnbmVkVG8ubmFtZSAhPSBcIlwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NJdGVtLnN0ZXAuYXNzaWdubWVudEhpc3RvcnkucHVzaChKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHN1YlByb2Nlc3NJdGVtLnN0ZXAuYXNzaWduZWRUbykpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAvLyBTZXQgdGhlIHVzZXIgZGV0YWlsc1xuICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzSXRlbS5zdGVwLmFzc2lnbmVkVG8udXNlcklkID0gdXNlci5pZDtcbiAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc0l0ZW0uc3RlcC5hc3NpZ25lZFRvLm5hbWUgPSB1c2VyLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NJdGVtLnN0ZXAuYXNzaWduZWRUby5kYXRlVGltZSA9IG1vbWVudCgpLmZvcm1hdCgpO1xuICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzSXRlbS5zdGVwLmFzc2lnbmVkVG8udHlwZSA9IEFTU0lHTk1FTlRfVFlQRV9SRUFTU0lHTk1FTlQ7XG4gICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NJdGVtLnN0ZXAuYXNzaWduZWRUby5kdWVEYXRlVGltZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzSXRlbS5zdGVwLmFzc2lnbmVkVG8uYnkgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZCArIFwiXCI7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGluZGljYXRvcnMgdXNlciBkZXRhaWxzXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3JzID0gc3ViUHJvY2Vzc0l0ZW0uaW5kaWNhdG9ycztcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbmRpY2F0b3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yID0gaW5kaWNhdG9yc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaW5kaWNhdG9yLmluc3RhbmNlcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IGluZGljYXRvci5pbnN0YW5jZXNbal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkb2MgPSBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzW2tdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2UudXVpZCA9PSBkb2MuX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2Mud29ya2Zsb3dzLmZpbHRlcihmdW5jdGlvbiAod29ya2Zsb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod29ya2Zsb3cuaWQgPT0gX1dGSW5zdGFuY2UuY29uZmlnLl9pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3b3JrZmxvdy5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChwcm9jZXNzSXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb2Nlc3NJdGVtLmlkID09IHByb2Nlc3NJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgdXNlciBpZCBhbmQgbmFtZSBpbiB0aGUgZG9jdW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzSXRlbS5zdGVwLmFzc2lnbmVkVG8udXNlcklkID0gdXNlci5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzSXRlbS5zdGVwLmFzc2lnbmVkVG8ubmFtZSA9IHVzZXIubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL1NlbmQgYXNzaWduIHVzZXIgbm90aWZpY2F0aW9uIGZyb20gaGVyZVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBub3RpZmljYXRpb24gPSBKU09OLnhwYXRoKFwiL3Byb2Nlc3Nlc1tfaWQgZXEgJ1wiKyBwcm9jZXNzSWQgK1wiJ10vbm90aWZpY2F0aW9uc1wiLF9XRkluc3RhbmNlLmNvbmZpZywge30pWzBdO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKG5vdGlmaWNhdGlvbiAhPSB1bmRlZmluZWQgJiYgbm90aWZpY2F0aW9uLnJlQXNzaWdubWVudCAhPSB1bmRlZmluZWQpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25zTW9kdWxlLm5vdGlmaWNhdGlvbi5yZUFzc2lnbm1lbnROb3RpZmljYXRpb24obm90aWZpY2F0aW9uLCBfV0ZJbnN0YW5jZSwgdXVpZCwgdXNlcikudGhlbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihzdWNjZXNzKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1VzZXIgYXNzaWduZWQgc3VjY2Vzc2Z1bGx5LiBVc2VySWQ6IFwiJyArIHVzZXIuaWQgKyAnXCIsIE5hbWU6IFwiJyArIHVzZXIubmFtZSArICdcIicsIHN1YlByb2Nlc3NJdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGZhaWwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZmFpbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdVc2VyIGFzc2lnbmVkIHN1Y2Nlc3NmdWxseS4gVXNlcklkOiBcIicgKyB1c2VyLmlkICsgJ1wiLCBOYW1lOiBcIicgKyB1c2VyLm5hbWUgKyAnXCInLCBzdWJQcm9jZXNzSXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgIFxuXG5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG5cbiAgICB9KTtcbn07XG5cbi8qKlxuICogUHJvY2VzcyBpbmRpY2F0b3IgZG9jdW1lbnQgdXBkYXRlc1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBhY3Rpb25zIC0gdGhlIGFjdGlvbnMgY29uZmlnIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBzdWJQcm9jZXNzIC0gdGhlIGN1cnJlbnQgc3ViLXByb2Nlc3MgZm9ybSBjb25maWcgZGF0YVxuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcbiAqXG4gKiBAZXhhbXBsZSAnJ1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cbmZ1bmN0aW9uIGluZGljYXRvckRvY3MocHJvY2Vzc0lkLCBpbmRpY2F0b3JzLCBzdGVwLCBfV0ZJbnN0YW5jZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGluZGljYXRvciBzZWN0aW9ucyBvZiB0aGUgc3ViUHJvY2Vzc1xuICAgICAgICAgICAgaWYgKGluZGljYXRvcnMgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZJbmRpY2F0b3JzVXBkYXRlJywgJ0luZGljYXRvcnMgcGFyYW1ldGVyIGlzIHJlcXVpcmVkLiAtIFZhbHVlOiAnICsgaW5kaWNhdG9ycylcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbmRpY2F0b3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3IgPSBpbmRpY2F0b3JzW2ldO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGluZGljYXRvci5pbnN0YW5jZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IGluZGljYXRvci5pbnN0YW5jZXNbal07XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IF9XRkluc3RhbmNlLmluZGljYXRvcnMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZG9jID0gX1dGSW5zdGFuY2UuaW5kaWNhdG9yc1trXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2UudXVpZCA9PSBkb2MuX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvYy53b3JrZmxvd3MuZmlsdGVyKGZ1bmN0aW9uICh3b3JrZmxvdykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdvcmtmbG93LmlkID09IF9XRkluc3RhbmNlLmNvbmZpZy5faWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3b3JrZmxvdy5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChwcm9jZXNzSXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvY2Vzc0l0ZW0uaWQgPT0gcHJvY2Vzc0lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzSXRlbS5zdGVwLmlkID0gc3RlcC5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NJdGVtLnN0ZXAuc2VxID0gc3RlcC5zZXE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzSXRlbS5zdGVwLnN0YXR1cyA9IHN0ZXAuc3RhdHVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0l0ZW0uc3RlcC5tZXNzYWdlID0gc3RlcC5tZXNzYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0l0ZW0uc3RlcC5hc3NpZ25lZFRvLnVzZXJJZCA9IHN0ZXAuYXNzaWduZWRUby51c2VySWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzSXRlbS5zdGVwLmFzc2lnbmVkVG8ubmFtZSA9IHN0ZXAuYXNzaWduZWRUby5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0l0ZW0uc3RlcC5jb21tZW50ID0gc3RlcC5jb21tZW50ICE9PSB1bmRlZmluZWQgPyBzdGVwLmNvbW1lbnQgOiAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdJbmRpY2F0b3IgZG9jdW1lbnRzIHdvcmtmbG93IHByb2Nlc3MgbW9kZWwgdXBkYXRlZC4nLCBfV0ZJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG5cbiAgICB9KVxufTtcblxuLyoqXG4gKiBQcm9jZXNzIGFjdGlvbnNcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gYWN0aW9ucyAtIHRoZSBhY3Rpb25zIGNvbmZpZyBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gc3ViUHJvY2VzcyAtIHRoZSBjdXJyZW50IHN1Yi1wcm9jZXNzIGZvcm0gY29uZmlnIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5cbmZ1bmN0aW9uIGFjdGlvbnMoYWN0aW9ucywgcHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN1YlByb2Nlc3MsIHN0ZXAsIF9XRkluc3RhbmNlLCBkYXRhLCB1dWlkKSB7XG4gICAgdmFyIGFyckFjdGlvbnMgPSBbXTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB1dGlsLnN5bmNMb29wKGFjdGlvbnMubGVuZ3RoLCBmdW5jdGlvbiAobG9vcCkge1xuICAgICAgICAgICAgdmFyIGNvdW50ZXIgPSBsb29wLml0ZXJhdGlvbigpO1xuICAgICAgICAgICAgYWN0aW9uKGFjdGlvbnNbY291bnRlcl0sIHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdWJQcm9jZXNzLCBzdGVwLCBfV0ZJbnN0YW5jZSwgZGF0YSwgdXVpZClcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXRBY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogYWN0aW9uc1tjb3VudGVyXS5faWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXE6IGNvdW50ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiByZXN1bHRcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICBhcnJBY3Rpb25zLnB1c2gocmV0QWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgbG9vcC5uZXh0KCk7XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBsb29wLmJyZWFrKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnQWN0aW9ucyBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIGFyckFjdGlvbnMpO1xuICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFByb2Nlc3MgYWN0aW9uXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGFjdGlvbiAtIHRoZSBhY3Rpb24gY29uZmlnIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBzdWJQcm9jZXNzIC0gdGhlIGN1cnJlbnQgc3ViLXByb2Nlc3MgZm9ybSBjb25maWcgZGF0YVxuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcbiAqXG4gKiBAZXhhbXBsZSAnJ1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi8gXG5mdW5jdGlvbiBhY3Rpb24oYWN0aW9uLCBwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3ViUHJvY2Vzcywgc3RlcCwgX1dGSW5zdGFuY2UsIGRhdGEsIHV1aWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgIGlmIChhY3Rpb24ubWV0aG9kICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdmFyIG1ldGhvZFBvc3NpYmxlSXRlbXMgPSBbXCJmb3JtXCIsIFwiaW5kaWNhdG9yXCIsIFwicHJvZmlsZVwiLCBcInN1YlByb2Nlc3NJbnN0YW5jZVwiLCBcInN0ZXBcIiwgXCJjb21tdW5pdHlcIiwgXCJhcHBsaWNhdGlvblwiLCBcInVzZXJcIiwgXCJzZG9cIiwgXCJwZXJmb3JtYW5jZVwiLCBcInRheG9ub215XCIsIFwidmFyaWFibGVzXCIsIFwibm90aWZpY2F0aW9uXCIsXCJyZXBvcnRcIixcIndvcmtlclwiXTtcbiAgICAgICAgICAgIHN3aXRjaCAocHJvcGVydHlFeGlzdHMoYWN0aW9uLm1ldGhvZCwgbWV0aG9kUG9zc2libGVJdGVtcykpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdmb3JtJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGlvbi5tZXRob2QuZm9ybS5jcmVhdGUgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2gocHJvY2Vzc0lkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChzdWJQcm9jZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChzdGVwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChhY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHByb2Nlc3NTZXEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHN1YlByb2Nlc3NTZXEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goX1dGSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEuY3JlYXRlVHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2godXVpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YS5iYXNlVVVJRCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uY3JlYXRlKGFyZ3MpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24ubWV0aG9kLmZvcm0uYXV0aG9yaXNlICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHByb2Nlc3NJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goc3ViUHJvY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2gocHJvY2Vzc1NlcSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goc3ViUHJvY2Vzc1NlcSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goX1dGSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEuY3JlYXRlVHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2godXVpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YS5iYXNlVVVJRCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmF1dGhvcmlzZShhcmdzKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uLm1ldGhvZC5mb3JtLnVuZHJhZnQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKF9XRkluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmNyZWF0ZVR5cGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHV1aWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEuYmFzZVVVSUQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5zZXRVbkRyYWZ0KGFyZ3MpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24ubWV0aG9kLmZvcm0uZHJhZnQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKF9XRkluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmNyZWF0ZVR5cGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHV1aWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEuYmFzZVVVSUQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5zZXREcmFmdChhcmdzKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uLm1ldGhvZC5mb3JtLmNsb3NlICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHN1YlByb2Nlc3MuaW5kaWNhdG9ycyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goX1dGSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEuY3JlYXRlVHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2godXVpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YS5iYXNlVVVJRCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmNsb3NlKGFyZ3MpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24ubWV0aG9kLmZvcm0uYXV0aG9yaXNlQW5kQ3JlYXRlTmV3U2VxICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHByb2Nlc3NJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goc3ViUHJvY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2gocHJvY2Vzc1NlcSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goc3ViUHJvY2Vzc1NlcSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goX1dGSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEuY3JlYXRlVHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2godXVpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YS5iYXNlVVVJRCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmF1dGhvcmlzZShhcmdzKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ3JlYXRlIG5ldyBzZXF1ZW5jZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2gocHJvY2Vzc0lkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goc3ViUHJvY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHN0ZXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChhY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChwcm9jZXNzU2VxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goc3ViUHJvY2Vzc1NlcSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goX1dGSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmNyZWF0ZVR5cGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh1dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2godXVpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5jcmVhdGUoYXJncykudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9FZCBjcmVhdGlvbiBvZiBuZXcgc2VxdWVuY2VcblxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gXG5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnaW5kaWNhdG9yJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGlvbi5tZXRob2QuaW5kaWNhdG9yLmNyZWF0ZSAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShcIk5vdCBpbXBsZW1lbnRlZFwiKTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbi5tZXRob2QuaW5kaWNhdG9yLmluc3RhbnRpYXRlICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKFwiTm90IGltcGxlbWVudGVkXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uLm1ldGhvZC5pbmRpY2F0b3Iuc2V0VmFsdWUgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXRoID0gYWN0aW9uLm1ldGhvZC5pbmRpY2F0b3Iuc2V0VmFsdWUucGF0aDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaGVscGVyLmdldE5vZGVWYWx1ZShhY3Rpb24ubWV0aG9kLmluZGljYXRvci5zZXRWYWx1ZS5kYXRhLCBfV0ZJbnN0YW5jZSwgdXVpZCkudGhlbihmdW5jdGlvbiAoZGF0YVZhbHVlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChfV0ZJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHV1aWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChwYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YVZhbHVlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0udXBkYXRlSW5kaWNhdG9yKGFyZ3MpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uLm1ldGhvZC5pbmRpY2F0b3IudXBkYXRlU3RhdHVzICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yU2V0SWQgPSBhY3Rpb24ubWV0aG9kLmluZGljYXRvci5pbmRpY2F0b3JTZXRJZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goX1dGSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHV1aWQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uLm1ldGhvZC5pbmRpY2F0b3IudXBkYXRlU3RhdHVzICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGF0dXMgPSBhY3Rpb24ubWV0aG9kLmluZGljYXRvci51cGRhdGVTdGF0dXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHN0YXR1cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGluZGljYXRvclNldElkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBLZWVwIGluZGljYXRvciBmdW5jdGlvbnMgaW4gaW5kaWF0b3IgZmlsZSBpc3RlYWQgb2YgZm9ybSBmaWxlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0ubWFya1VwZGF0ZUluZGljYXRvcihhcmdzKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKFwiQWN0aW9uIGluZGljYXRvciBzdWIgdHlwZSBub3QgZm91bmQuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uLm1ldGhvZC5pbmRpY2F0b3Iuc2V0V3JhcHBlckVsZW1lbnQgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXRoID0gYWN0aW9uLm1ldGhvZC5pbmRpY2F0b3Iuc2V0V3JhcHBlckVsZW1lbnQucGF0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3JTZXRJZCA9IGFjdGlvbi5tZXRob2QuaW5kaWNhdG9yLnNldFdyYXBwZXJFbGVtZW50LmluZGljYXRvclNldElkO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWxwZXIuZ2V0Tm9kZVZhbHVlKGFjdGlvbi5tZXRob2QuaW5kaWNhdG9yLnNldFdyYXBwZXJFbGVtZW50LmRhdGEsIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uIChkYXRhVmFsdWUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKF9XRkluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2godXVpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChpbmRpY2F0b3JTZXRJZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLnVwZGF0ZUluZGljYXRvcldyYXBwZXIoYXJncykudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3Byb2ZpbGUnOlxuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uLm1ldGhvZC5wcm9maWxlLmNyZWF0ZSAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChwcm9jZXNzSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKF9XRkluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmNyZWF0ZVR5cGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHV1aWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEuYmFzZVVVSUQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5jcmVhdGVQcm9maWxlKGFyZ3MpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24ubWV0aG9kLnByb2ZpbGUuc2V0U3RhdHVzVG8gIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGF0dXMgPSBhY3Rpb24ubWV0aG9kLnByb2ZpbGUuc2V0U3RhdHVzVG87XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKF9XRkluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2godXVpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHN0YXR1cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLnNldFN0YXR1cyhhcmdzKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3ViUHJvY2Vzc0luc3RhbmNlJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNwUG9zc2libGVJdGVtcyA9IFtcImluc3RhbnRpYXRlXCIsIFwiYXV0aG9yaXNlXCIsIFwiY2xvc2VcIiwgXCJzZXRWYXJpYWJsZVwiLCBcInNldFN0YXR1c1RvXCIsIFwic2V0U3RhdHVzTXNnVG9cIiwgXCJzZXRUaXRsZVwiLCBcInNldFZhbGlkRGF0ZVwiXTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChwcm9wZXJ0eUV4aXN0cyhhY3Rpb24ubWV0aG9kLnN1YlByb2Nlc3NJbnN0YW5jZSwgc3BQb3NzaWJsZUl0ZW1zKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzZXRUaXRsZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVscGVyLmdldE5vZGVWYWx1ZShhY3Rpb24ubWV0aG9kLnN1YlByb2Nlc3NJbnN0YW5jZS5zZXRUaXRsZSwgX1dGSW5zdGFuY2UsIHV1aWQpLnRoZW4oZnVuY3Rpb24gKGRhdGFWYWx1ZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbnNNb2R1bGUuc3ViUHJvY2Vzc0luc3RhbmNlLnNldFRpdGxlKGFjdGlvbi5tZXRob2Quc3ViUHJvY2Vzc0luc3RhbmNlLnNldFRpdGxlLCB1dWlkLCBkYXRhVmFsdWUsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy91cGRhdGUgc3VicHJvY2VzcyBsYWJlbCBpbiB3b3JrZmxvdyBpbnN0YW5jZSBwcm9jZXNzIG9iamVjdDogVE9ET1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzZXRWYWxpZERhdGUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlbHBlci5nZXROb2RlVmFsdWUoYWN0aW9uLm1ldGhvZC5zdWJQcm9jZXNzSW5zdGFuY2Uuc2V0VmFsaWREYXRlLCBfV0ZJbnN0YW5jZSwgdXVpZCkudGhlbihmdW5jdGlvbiAoZGF0YVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbnNNb2R1bGUuc3ViUHJvY2Vzc0luc3RhbmNlLnNldFZhbGlkRGF0ZShhY3Rpb24ubWV0aG9kLnN1YlByb2Nlc3NJbnN0YW5jZS5zZXRWYWxpZERhdGUsIHV1aWQsIGRhdGFWYWx1ZSwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy91cGRhdGUgc3VicHJvY2VzcyBsYWJlbCBpbiB3b3JrZmxvdyBpbnN0YW5jZSBwcm9jZXNzIG9iamVjdDogVE9ET1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChcIk5vIG1ldGhvZCBmb3VuZCBmcm9tIGltcGxlbWVudGVkIGxpc3QgaW4gc3VicHJvY2VzcyBhY3Rpb24uXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3RlcCc6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NvbW11bml0eSc6XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb21tdW5pdHlQb3NzaWJsZUl0ZW1zID0gW1wiY3JlYXRlQ29tbXVuaXR5XCIsIFwicmVsZWFzZUFkb3B0ZWRBcHBsaWNhdGlvblwiLCBcInVzZXJKb2luQ29tbXVuaXR5XCJdO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5RXhpc3RzKGFjdGlvbi5tZXRob2QuY29tbXVuaXR5LCBjb21tdW5pdHlQb3NzaWJsZUl0ZW1zKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjcmVhdGVDb21tdW5pdHknOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25zTW9kdWxlLmNvbW11bml0eS5jcmVhdGVDb21tdW5pdHkoYWN0aW9uLm1ldGhvZC5jb21tdW5pdHkuY3JlYXRlQ29tbXVuaXR5LCB1dWlkLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlbGVhc2VBZG9wdGVkQXBwbGljYXRpb24nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25zTW9kdWxlLmNvbW11bml0eS5yZWxlYXNlQWRvcHRlZEFwcGxpY2F0aW9uKGFjdGlvbi5tZXRob2QuY29tbXVuaXR5LnJlbGVhc2VBZG9wdGVkQXBwbGljYXRpb24sIHV1aWQsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAndXNlckpvaW5Db21tdW5pdHknOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25zTW9kdWxlLmNvbW11bml0eS51c2VySm9pbkNvbW11bml0eShhY3Rpb24ubWV0aG9kLmNvbW11bml0eS51c2VySm9pbkNvbW11bml0eSwgdXVpZCwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChcIk5vIG1ldGhvZCBmb3VuZCBmcm9tIGltcGxlbWVudGVkIGxpc3QuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnYXBwbGljYXRpb24nOlxuICAgICAgICAgICAgICAgICAgICB2YXIgYXBwbGljYXRpb25Qb3NzaWJsZUl0ZW1zID0gW1wiY3JlYXRlQXBwRGVmaW5pdGlvblwiLCBcImJ1aWxkQXBwbGljYXRpb25cIiwgXCJhcHBsaWNhdGlvbkFkb3B0aW9uXCJdO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5RXhpc3RzKGFjdGlvbi5tZXRob2QuYXBwbGljYXRpb24sIGFwcGxpY2F0aW9uUG9zc2libGVJdGVtcykpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnY3JlYXRlQXBwRGVmaW5pdGlvbic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUuYXBwbGljYXRpb24uY3JlYXRlQXBwRGVmaW5pdGlvbihhY3Rpb24ubWV0aG9kLmFwcGxpY2F0aW9uLmNyZWF0ZUFwcERlZmluaXRpb24sIHV1aWQsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYnVpbGRBcHBsaWNhdGlvbic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUuYXBwbGljYXRpb24uYnVpbGRBcHBsaWNhdGlvbihhY3Rpb24ubWV0aG9kLmFwcGxpY2F0aW9uLmJ1aWxkQXBwbGljYXRpb24sIHV1aWQsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYXBwbGljYXRpb25BZG9wdGlvbic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUuYXBwbGljYXRpb24uYXBwbGljYXRpb25BZG9wdGlvbihhY3Rpb24ubWV0aG9kLmFwcGxpY2F0aW9uLmFwcGxpY2F0aW9uQWRvcHRpb24sIHV1aWQsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJObyBtZXRob2QgZm91bmQgZnJvbSBpbXBsZW1lbnRlZCBsaXN0LlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAndXNlcic6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3Nkbyc6XG4gICAgICAgICAgICAgICAgICAgIHZhciBzZG9Qb3NzaWJsZUl0ZW1zID0gW1wiY3JlYXRlXCIsXCJlbnJvbGxDb3Vyc2VcIl07XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocHJvcGVydHlFeGlzdHMoYWN0aW9uLm1ldGhvZC5zZG8sIHNkb1Bvc3NpYmxlSXRlbXMpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NyZWF0ZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUuc2RvLmNyZWF0ZShhY3Rpb24ubWV0aG9kLnNkby5jcmVhdGUsIHV1aWQsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2Vucm9sbENvdXJzZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUuc2RvLmVucm9sbENvdXJzZShhY3Rpb24ubWV0aG9kLnNkby5lbnJvbGxDb3Vyc2UsIHV1aWQsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJObyBtZXRob2QgZm91bmQgZnJvbSBpbXBsZW1lbnRlZCBsaXN0LlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAncGVyZm9ybWFuY2UnOlxuICAgICAgICAgICAgICAgICAgICB2YXIgcGVyZm9ybWFuY2VQb3NzaWJsZUl0ZW1zID0gW1widW5sb2NrUGVyaW9kXCIsIFwibG9ja1BlcmZvcm1hbmNlTW9kZWxcIiwgXCJzZXRNb2RlbFN0YXR1c1wiXTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChwcm9wZXJ0eUV4aXN0cyhhY3Rpb24ubWV0aG9kLnBlcmZvcm1hbmNlLCBwZXJmb3JtYW5jZVBvc3NpYmxlSXRlbXMpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAndW5sb2NrUGVyaW9kJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5wZXJmb3JtYW5jZS51bmxvY2tQZXJpb2QoYWN0aW9uLm1ldGhvZC5wZXJmb3JtYW5jZS51bmxvY2tQZXJpb2QsIHV1aWQsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3NldE1vZGVsU3RhdHVzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5wZXJmb3JtYW5jZS5zZXRNb2RlbFN0YXR1cyhhY3Rpb24ubWV0aG9kLnBlcmZvcm1hbmNlLnNldE1vZGVsU3RhdHVzLCB1dWlkLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdsb2NrUGVyZm9ybWFuY2VNb2RlbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUucGVyZm9ybWFuY2UubG9ja1BlcmZvcm1hbmNlTW9kZWwoYWN0aW9uLm1ldGhvZC5wZXJmb3JtYW5jZS5sb2NrUGVyZm9ybWFuY2VNb2RlbCwgdXVpZCwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3RheG9ub215JzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRheG9ub215UG9zc2libGVJdGVtcyA9IFtcImNyZWF0ZVwiXTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChwcm9wZXJ0eUV4aXN0cyhhY3Rpb24ubWV0aG9kLnRheG9ub215LCB0YXhvbm9teVBvc3NpYmxlSXRlbXMpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NyZWF0ZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUudGF4b25vbXkuY3JlYXRlKGFjdGlvbi5tZXRob2QudGF4b25vbXkuY3JlYXRlLCB1dWlkLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd2YXJpYWJsZXMnOlxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFyaWFibGVzUG9zc2libGVJdGVtcyA9IFtcInNldFZhcmlhYmxlXCJdO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5RXhpc3RzKGFjdGlvbi5tZXRob2QudmFyaWFibGVzLCB2YXJpYWJsZXNQb3NzaWJsZUl0ZW1zKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzZXRWYXJpYWJsZSc6XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS52YXJpYWJsZXMuc2V0VmFyaWFibGUoYWN0aW9uLm1ldGhvZC52YXJpYWJsZXMuc2V0VmFyaWFibGUsIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJObyBtZXRob2QgZm91bmQgZnJvbSBpbXBsZW1lbnRlZCBsaXN0LlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ25vdGlmaWNhdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5ub3RpZmljYXRpb24uc2VuZE5vdGlmaWNhdGlvbldvcmtlcihhY3Rpb24ubWV0aG9kLm5vdGlmaWNhdGlvbiwgX1dGSW5zdGFuY2UsIHV1aWQpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY2FzZSAncmVwb3J0JzpcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBcbiAgICAgICAgICAgICAgICAgKi8gICAgXG4gICAgICAgICAgICAgICAgdmFyIHJlcG9ydFBvc3NpYmxlSXRlbXMgPSBbXCJjcmVhdGVQZXJmb3JtYW5jZVJlcG9ydFwiLFwiY3JlYXRlUmVwb3J0XCIsXCJzZG9SZXBvcnRcIixcImV4ZWN1dGVSZXBvcnRcIiwgXCJyZXF1ZXN0UmVwb3J0XCIsXCJnZW5lcmF0ZVZpZXdcIiBdO1xuXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocHJvcGVydHlFeGlzdHMoYWN0aW9uLm1ldGhvZC5yZXBvcnQsIHJlcG9ydFBvc3NpYmxlSXRlbXMpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NyZWF0ZVBlcmZvcm1hbmNlUmVwb3J0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5yZXBvcnQuY3JlYXRlUGVyZm9ybWFuY2VSZXBvcnQoYWN0aW9uLm1ldGhvZC5yZXBvcnQuY3JlYXRlUGVyZm9ybWFuY2VSZXBvcnQsIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnY3JlYXRlUmVwb3J0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5yZXBvcnQuY3JlYXRlUmVwb3J0KGFjdGlvbi5tZXRob2QucmVwb3J0LmNyZWF0ZVJlcG9ydCwgX1dGSW5zdGFuY2UsIHV1aWQgKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3Nkb1JlcG9ydCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUucmVwb3J0LnNkb1JlcG9ydChhY3Rpb24ubWV0aG9kLnJlcG9ydC5zZG9SZXBvcnQsIF9XRkluc3RhbmNlLCB1dWlkICkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdleGVjdXRlUmVwb3J0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5yZXBvcnQuZXhlY3V0ZVJlcG9ydChhY3Rpb24ubWV0aG9kLnJlcG9ydC5leGVjdXRlUmVwb3J0LCBfV0ZJbnN0YW5jZSwgdXVpZCApLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZ2VuZXJhdGVWaWV3JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5yZXBvcnQuZ2VuZXJhdGVWaWV3KGFjdGlvbi5tZXRob2QucmVwb3J0LmdlbmVyYXRlVmlldywgX1dGSW5zdGFuY2UsIHV1aWQgKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlcXVlc3RSZXBvcnQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25zTW9kdWxlLnJlcG9ydC5yZXF1ZXN0UmVwb3J0KGFjdGlvbi5tZXRob2QucmVwb3J0LnJlcXVlc3RSZXBvcnQsIF9XRkluc3RhbmNlLCB1dWlkICkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7ICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3dvcmtlcic6XG4gICAgICAgICAgICAgICAgICAgIHZhciB3b3JrZXJQb3NzaWJsZUl0ZW1zID0gW1wic2VuZFdvcmtlclwiLCBcImV4ZWN1dGVMb2NhbFwiXTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChwcm9wZXJ0eUV4aXN0cyhhY3Rpb24ubWV0aG9kLndvcmtlciwgd29ya2VyUG9zc2libGVJdGVtcykpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc2VuZFdvcmtlcic6XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS53b3JrZXIuc2VuZFdvcmtlcihhY3Rpb24ubWV0aG9kLndvcmtlci5zZW5kV29ya2VyLCBfV0ZJbnN0YW5jZSwgdXVpZCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2V4ZWN1dGVMb2NhbCc6XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS53b3JrZXIuZXhlY3V0ZUxvY2FsKGFjdGlvbi5tZXRob2Qud29ya2VyLmV4ZWN1dGVMb2NhbCwgX1dGSW5zdGFuY2UsIHV1aWQpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChcIk5vIG1ldGhvZCBmb3VuZCBmcm9tIGltcGxlbWVudGVkIGxpc3QuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChcIm1ldGhvZCBub3QgZGVmaW5lZCBpbiBjb25maWd1cmF0aW9uXCIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdC5cIik7XG5cbiAgICAgICAgfVxuXG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFByb2Nlc3MgdGFza3NcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdGFzayAtIHRoZSB0YXNrIGNvbmZpZyBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gaW5wdXREYXRhIC0gdGhlIHVzZXIgaW5wdXQgZGF0YVxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuZnVuY3Rpb24gdGFzayhzdWJwcm9jZXNzSUQsIHN1YnByb2Nlc3NTRVEsIHRhc2ssIHNwdXVpZCwgbW9kZWwpIHtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgdmFyIF9XRkluc3RhbmNlID0gYXBwLlNDT1BFLndvcmtmbG93O1xuICAgICAgICB2YXIgcHJlQWN0aW9uc0NvbmYgPSB0YXNrLnByZUFjdGlvbnM7XG4gICAgICAgIHByZUFjdGlvbnMocHJlQWN0aW9uc0NvbmYsIF9XRkluc3RhbmNlLCBzcHV1aWQpLnRoZW4oZnVuY3Rpb24gKHByZUFjdGlvblJlc3VsdCkge1xuXG4gICAgICAgICAgICB2YXIgbGlzdCA9IFtdO1xuICAgICAgICAgICAgaWYgKHRhc2suYXNzaWduLnJvbGUgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFzc2lnblR5cGUgPSAncHJvZmlsZVJvbGUnO1xuICAgICAgICAgICAgICAgIHZhciBwcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xuICAgICAgICAgICAgICAgIHZhciBpZCA9ICcnO1xuICAgICAgICAgICAgICAgIGlmICh0YXNrLmFzc2lnbi5yb2xlLnByb2ZpbGUgPT0gJ2N1cnJlbnQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRhc2suYXNzaWduLnJvbGUucHJvZmlsZSA9PSAnY29tbXVuaXR5Jykge1xuICAgICAgICAgICAgICAgICAgICBpZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciByb2xlID0gdGFzay5hc3NpZ24ucm9sZS5yb2xlSWQ7XG5cbiAgICAgICAgICAgICAgICBsaWJyYXJ5LmdldFVzZXJzTGlzdEJ5Um9sZShpZCwgcm9sZSkudGhlbihmdW5jdGlvbiAobGlzdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdCAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3QubGVuZ3RoID4gMSkgeyAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBOZXcgcmVxdWlyZW1lbnQgaGVyZSB3aWxsIGF1dG9tYXRpY2FsbHkgYXNzaWduIHRoZSBzdGVwIHRvIGN1cnJlbnQgdXNlciBpZiB0aGlzIHVzZXIgZmFsbHMgdW5kZXIgdGhlIHByb3ZpZGVkIGdyb3VwLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJVTEUgSU5UUk9EVUNFRCBPTiAxNi1NQVJDSC0yMDE3XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgY3VycmVudCB1c2VyIGxpZXMgd2l0aGluIHRoZSBzcGVjaWZpZWQgcm9sZSwgaXQgd2lsbCBiZSBhdXRvbWF0aWNhbGx5IGFzc2lnbmVkIHRvIHRoYXQgdXNlci5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXNDdXJyZW50VXNlckV4aXN0SW5HaXZlblJvbGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm9sZXNPYmplY3QgPSBsaWJyYXJ5LmdldEN1cnJlbnRVc2VyUm9sZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXNDdXJyZW50VXNlclJvbGUxID0gcm9sZXNPYmplY3QucHJvZmlsZS5pbmRleE9mKHJvbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpc0N1cnJlbnRVc2VyUm9sZTIgPSByb2xlc09iamVjdC5jb21tdW5pdHkuaW5kZXhPZihyb2xlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXNDdXJyZW50VXNlclJvbGUzID0gcm9sZXNPYmplY3QuaW1wbGljaXQuaW5kZXhPZihyb2xlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXNDdXJyZW50VXNlclJvbGU0ID0gcm9sZXNPYmplY3QuYWRvcHRpb24uaW5kZXhPZihyb2xlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXNDdXJyZW50VXNlclJvbGU1ID0gcm9sZXNPYmplY3Quc3VicHJvZmlsZS5pbmRleE9mKHJvbGUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXNDdXJyZW50VXNlclJvbGUxID4gLTEgfHwgaXNDdXJyZW50VXNlclJvbGUyID4gLTEgfHwgaXNDdXJyZW50VXNlclJvbGUzID4gLTEgfHwgaXNDdXJyZW50VXNlclJvbGU0ID4gLTEgfHwgaXNDdXJyZW50VXNlclJvbGU1ID4gLTEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0N1cnJlbnRVc2VyRXhpc3RJbkdpdmVuUm9sZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDdXJyZW50VXNlckV4aXN0SW5HaXZlblJvbGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNDdXJyZW50VXNlckV4aXN0SW5HaXZlblJvbGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihtb2RlbC5hc3NpZ25tZW50SGlzdG9yeSA9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuYXNzaWdubWVudEhpc3RvcnkgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXNzaWduZWUgPSBtb2RlbC5hc3NpZ25lZFRvO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihhc3NpZ25lZS51c2VySWQgIT1cIlwiICYmIGFzc2lnbmVlLm5hbWUgIT0gXCJcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3T2JqID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShhc3NpZ25lZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuYXNzaWdubWVudEhpc3RvcnkucHVzaChuZXdPYmopO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVlLm5hbWUgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJuYW1lICsgXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduZWUudXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQgKyBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25lZS5kYXRlVGltZSA9IG1vbWVudCgpLmZvcm1hdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25lZS50eXBlID0gQVNTSUdOTUVOVF9UWVBFX0FVVE87XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVlLmR1ZURhdGVUaW1lID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVlLmJ5ID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQgKyBcIlwiO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5vdGlmaWNhdGlvbiB0aGF0IGl0cyBiZWVuIGF1dG9tYXRpY2FsbHkgYXNzaWduZWQgdG8geW91XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vU2VuZCBhc3NpZ24gdXNlciBub3RpZmljYXRpb24gZnJvbSBoZXJlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBub3RpZmljYXRpb24gPSBKU09OLnhwYXRoKFwiL3Byb2Nlc3Nlc1tfaWQgZXEgJ1wiKyBzdWJwcm9jZXNzSUQgK1wiJ10vbm90aWZpY2F0aW9uc1wiLF9XRkluc3RhbmNlLmNvbmZpZywge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihub3RpZmljYXRpb24gIT0gdW5kZWZpbmVkICYmIG5vdGlmaWNhdGlvbi5hc3NpZ25tZW50ICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdXNlciA9IHsgJ2lkJzogTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQsICduYW1lJzogTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VybmFtZSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uc01vZHVsZS5ub3RpZmljYXRpb24uYXNzaWdubWVudE5vdGlmaWNhdGlvbihub3RpZmljYXRpb24sIF9XRkluc3RhbmNlLCBzcHV1aWQsIHVzZXIpLnRoZW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oc3VjY2Vzcyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVc2VyIGFzc2lnbmVkIHN1Y2Nlc3NmdWxseS4gVXNlcklkOiBcIicgKyB1c2VyLmlkICsgJ1wiLCBOYW1lOiBcIicgKyB1c2VyLm5hbWUgKyAnXCInKTsgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKS5jYXRjaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihmYWlsKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1VzZXIgYXNzaWdubWVudCBub3RpZmljYXRpb24gZmFpbGVkIHRvIHVzZXIgVXNlcklkOiBcIicgKyB1c2VyLmlkICsgJ1wiLCBOYW1lOiBcIicgKyB1c2VyLm5hbWUgKyAnXCInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFzc2lnbm1lbnQgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFzay5hc3NpZ24uYXNzaWdubWVudCAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXNzaWdubWVudCA9IG1vZGVsLmFzc2lnbm1lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhY2NlcHQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNob3dcIjogdGFzay5hc3NpZ24uYXNzaWdubWVudC5hY2NlcHQuc2hvdyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogX2dldE5hbWVCeUxhbmcodGFzay5hc3NpZ24uYXNzaWdubWVudC5hY2NlcHQubGFiZWwuaTE4bilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50LmFjY2VwdCA9IGFjY2VwdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5tZXNzYWdlID0gX2dldE5hbWVCeUxhbmcodGFzay5hc3NpZ24uYXNzaWdubWVudC5tZXNzYWdlLmkxOG4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVqZWN0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaG93XCI6IHRhc2suYXNzaWduLmFzc2lnbm1lbnQucmVqZWN0LnNob3csXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IF9nZXROYW1lQnlMYW5nKHRhc2suYXNzaWduLmFzc2lnbm1lbnQucmVqZWN0LmxhYmVsLmkxOG4pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5yZWplY3QgPSByZWplY3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZmlsZUlkXCI6IHByb2ZpbGVJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicm9sZUlkXCI6IHJvbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJyb2xlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50LnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQucHJvZmlsZVJvbGVJZCA9IGlkO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNDdXJyZW50VXNlckV4aXN0SW5HaXZlblJvbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9GaXJlIFByZS13b3JrQWN0aW9ucyBoZXJlXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb2Nlc3NJZCA9IEpTT04ueHBhdGgoXCIvaW5zdGFuY2UvcHJvY2Vzc2VzW3N1YlByb2Nlc3Nlcy91dWlkIGVxICdcIiArIHNwdXVpZCArIFwiJ10vaWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1YlByb2Nlc3NJZCA9IEpTT04ueHBhdGgoXCIvaW5zdGFuY2UvcHJvY2Vzc2VzL3N1YlByb2Nlc3Nlc1t1dWlkIGVxICdcIiArIHNwdXVpZCArIFwiJ10vaWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0ZXBJZCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL3N0ZXAvaWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0ZXBPYmplY3QgPSBKU09OLnhwYXRoKFwiL3Byb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgcHJvY2Vzc0lkICsgXCInXS9zdWJQcm9jZXNzZXNbX2lkIGVxICdcIiArIHN1YlByb2Nlc3NJZCArIFwiJ10vc3RlcHNbX2lkIGVxICdcIiArIHN0ZXBJZCArIFwiJ11cIiwgX1dGSW5zdGFuY2UuY29uZmlnLCB7fSlbMF07XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFzay5wcmVXb3JrQWN0aW9ucyAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByZVdvcmtBY3Rpb25zT2JqID0gdGFzay5wcmVXb3JrQWN0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZVdvcmtBY3Rpb25zKHByZVdvcmtBY3Rpb25zT2JqLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbiAoc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoJ0Fzc2lnbm1lbnQgaXMgbWFkZS4gUHJlIHdvcmsgYWN0aW9ucyBmb3VuZCBhbmQgZXhlY3V0ZWQgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgnQXNzaWdubWVudCBpcyBtYWRlLiBObyBwcmUgd29yayBhY3Rpb25zIGZvdW5kLiAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBOb3RpZmljYXRpb24gdGhhdCBpdHMgYmVlbiByZWxlYXNlZCBmb3IgYWNjZXB0YW5jZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBub3RpZmljYXRpb24gPSBKU09OLnhwYXRoKFwiL3Byb2Nlc3Nlc1tfaWQgZXEgJ1wiKyBzdWJwcm9jZXNzSUQgK1wiJ10vbm90aWZpY2F0aW9uc1wiLF9XRkluc3RhbmNlLmNvbmZpZywge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lzc3VlIGhlcmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobm90aWZpY2F0aW9uICE9IHVuZGVmaW5lZCAmJiBub3RpZmljYXRpb24uYXNzaWdubWVudEFjY2VwdGFuY2UgIT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1c2VyID0geyAnaWQnOiBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZCwgJ25hbWUnOiBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJuYW1lIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25zTW9kdWxlLm5vdGlmaWNhdGlvbi5hY2NlcHRhbmNlTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbiwgX1dGSW5zdGFuY2UsIHNwdXVpZCwgcm9sZSkudGhlbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihzdWNjZXNzKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1VzZXIgYXNzaWduZWQgc3VjY2Vzc2Z1bGx5LiBVc2VySWQ6IFwiJyArIHVzZXIuaWQgKyAnXCIsIE5hbWU6IFwiJyArIHVzZXIubmFtZSArICdcIicpOyAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgnTm90aWZpY2F0aW9ucyByZXF1ZXN0IHN1Ym1pdHRlZCBmb3IgYWNjZXB0YW5jZS4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLmNhdGNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGZhaWwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCdOb3RpZmljYXRpb25zIGZhaWxlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVXNlciBhc3NpZ25tZW50IG5vdGlmaWNhdGlvbiBmYWlsZWQgdG8gdXNlciBVc2VySWQ6IFwiJyArIHVzZXIuaWQgKyAnXCIsIE5hbWU6IFwiJyArIHVzZXIubmFtZSArICdcIicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCdOb3RpZmljYXRpb25zIG5vdCBmb3VuZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsaXN0Lmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSW1wbGVtZW50IGhlcmUgcHJlV29ya0FjdGlvbiBhcyB0aGlzIGlzIGF1dG9tYXRpY2FsbHkgYXNzaWduZWQgaW4gY2FzZSBvZiAxIHVzZXIgYW5kIHdpbGwgbm90IGdvIHRyb3VnaCBhY2NlcHRhbmNlIGZ1bmN0aW9uLlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVzZXJJZCA9IGxpc3RbMF0uaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVzZXJuYW1lID0gbGlzdFswXS5uYW1lO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobW9kZWwuYXNzaWdubWVudEhpc3RvcnkgPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuYXNzaWdubWVudEhpc3RvcnkgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXNzaWduZWUgPSBtb2RlbC5hc3NpZ25lZFRvO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGFzc2lnbmVlLnVzZXJJZCAhPVwiXCIgJiYgYXNzaWduZWUubmFtZSAhPSBcIlwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld09iaiA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYXNzaWduZWUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuYXNzaWdubWVudEhpc3RvcnkucHVzaChuZXdPYmopO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25lZS5uYW1lID0gdXNlcm5hbWUgKyBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVlLnVzZXJJZCA9IHVzZXJJZCArIFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduZWUuZGF0ZVRpbWUgPSBtb21lbnQoKS5mb3JtYXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25lZS50eXBlID0gQVNTSUdOTUVOVF9UWVBFX0FVVE87XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduZWUuZHVlRGF0ZVRpbWUgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25lZS5ieSA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkICsgXCJcIjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhc3NpZ25tZW50ID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhc2suYXNzaWduLmFzc2lnbm1lbnQgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFzc2lnbm1lbnQgPSBtb2RlbC5hc3NpZ25tZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWNjZXB0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaG93XCI6IHRhc2suYXNzaWduLmFzc2lnbm1lbnQuYWNjZXB0LnNob3csXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IF9nZXROYW1lQnlMYW5nKHRhc2suYXNzaWduLmFzc2lnbm1lbnQuYWNjZXB0LmxhYmVsLmkxOG4pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5hY2NlcHQgPSBhY2NlcHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQubWVzc2FnZSA9IF9nZXROYW1lQnlMYW5nKHRhc2suYXNzaWduLmFzc2lnbm1lbnQubWVzc2FnZS5pMThuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlamVjdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2hvd1wiOiB0YXNrLmFzc2lnbi5hc3NpZ25tZW50LnJlamVjdC5zaG93LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBfZ2V0TmFtZUJ5TGFuZyh0YXNrLmFzc2lnbi5hc3NpZ25tZW50LnJlamVjdC5sYWJlbC5pMThuKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQucmVqZWN0ID0gcmVqZWN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb2ZpbGVJZFwiOiBwcm9maWxlSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJvbGVJZFwiOiByb2xlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwicm9sZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50LnByb2ZpbGVSb2xlSWQgPSBpZDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5vdGlmaWNhdGlvbiB0aGF0IGl0cyBiZWVuIGF1dG9tYXRpY2FsbHkgYXNzaWduZWQgdG8geW91XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9TZW5kIGFzc2lnbiB1c2VyIG5vdGlmaWNhdGlvbiBmcm9tIGhlcmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbm90aWZpY2F0aW9uID0gSlNPTi54cGF0aChcIi9wcm9jZXNzZXNbX2lkIGVxICdcIisgc3VicHJvY2Vzc0lEICtcIiddL25vdGlmaWNhdGlvbnNcIixfV0ZJbnN0YW5jZS5jb25maWcsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihub3RpZmljYXRpb24gIT0gdW5kZWZpbmVkICYmIG5vdGlmaWNhdGlvbi5hc3NpZ25tZW50ICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1c2VyID0geyAnaWQnOiB1c2VySWQsICduYW1lJzogdXNlcm5hbWUgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uc01vZHVsZS5ub3RpZmljYXRpb24uYXNzaWdubWVudE5vdGlmaWNhdGlvbihub3RpZmljYXRpb24sIF9XRkluc3RhbmNlLCBzcHV1aWQsIHVzZXIpLnRoZW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihzdWNjZXNzKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVXNlciBhc3NpZ25lZCBzdWNjZXNzZnVsbHkuIFVzZXJJZDogXCInICsgdXNlci5pZCArICdcIiwgTmFtZTogXCInICsgdXNlci5uYW1lICsgJ1wiJyk7ICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLmNhdGNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oZmFpbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1VzZXIgYXNzaWdubWVudCBub3RpZmljYXRpb24gZmFpbGVkIHRvIHVzZXIgVXNlcklkOiBcIicgKyB1c2VyLmlkICsgJ1wiLCBOYW1lOiBcIicgKyB1c2VyLm5hbWUgKyAnXCInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9GaXJlIFByZS13b3JrQWN0aW9ucyBoZXJlXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvY2Vzc0lkID0gSlNPTi54cGF0aChcIi9pbnN0YW5jZS9wcm9jZXNzZXNbc3ViUHJvY2Vzc2VzL3V1aWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXS9pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWJQcm9jZXNzSWQgPSBKU09OLnhwYXRoKFwiL2luc3RhbmNlL3Byb2Nlc3Nlcy9zdWJQcm9jZXNzZXNbdXVpZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0ZXBJZCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL3N0ZXAvaWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RlcE9iamVjdCA9IEpTT04ueHBhdGgoXCIvcHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBwcm9jZXNzSWQgKyBcIiddL3N1YlByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3ViUHJvY2Vzc0lkICsgXCInXS9zdGVwc1tfaWQgZXEgJ1wiICsgc3RlcElkICsgXCInXVwiLCBfV0ZJbnN0YW5jZS5jb25maWcsIHt9KVswXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YXNrLnByZVdvcmtBY3Rpb25zICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcmVXb3JrQWN0aW9uc09iaiA9IHRhc2sucHJlV29ya0FjdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZVdvcmtBY3Rpb25zKHByZVdvcmtBY3Rpb25zT2JqLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbiAoc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoJ0Fzc2lnbmVkIHRvIHRoZSBvbmx5IHVzZXIgaW4gcm9sZS4gUHJlIHdvcmsgYWN0aW9ucyBleGVjdXRlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCdBc3NpZ25lZCB0byB0aGUgb25seSB1c2VyIGluIHJvbGUuIE5vIHByZSB3b3JrIGFjdGlvbnMgZm91bmQuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ2FzZSB3aGVyZSB1c2VycyBsaXN0ID0gMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhc3NpZ25lZSA9IG1vZGVsLmFzc2lnbmVkVG87XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduZWUubmFtZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduZWUudXNlcklkID0gXCJcIjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhc3NpZ25tZW50ID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhc2suYXNzaWduLmFzc2lnbm1lbnQgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFzc2lnbm1lbnQgPSBtb2RlbC5hc3NpZ25tZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWNjZXB0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaG93XCI6IHRhc2suYXNzaWduLmFzc2lnbm1lbnQuYWNjZXB0LnNob3csXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IF9nZXROYW1lQnlMYW5nKHRhc2suYXNzaWduLmFzc2lnbm1lbnQuYWNjZXB0LmxhYmVsLmkxOG4pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5hY2NlcHQgPSBhY2NlcHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQubWVzc2FnZSA9IF9nZXROYW1lQnlMYW5nKHRhc2suYXNzaWduLmFzc2lnbm1lbnQubWVzc2FnZS5pMThuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlamVjdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2hvd1wiOiB0YXNrLmFzc2lnbi5hc3NpZ25tZW50LnJlamVjdC5zaG93LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBfZ2V0TmFtZUJ5TGFuZyh0YXNrLmFzc2lnbi5hc3NpZ25tZW50LnJlamVjdC5sYWJlbC5pMThuKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQucmVqZWN0ID0gcmVqZWN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb2ZpbGVJZFwiOiBwcm9maWxlSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJvbGVJZFwiOiByb2xlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwicm9sZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50LnByb2ZpbGVSb2xlSWQgPSBpZDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1dpbGwgYmUgZmlyZWQgZnJvbSBUYWtlQXNzaWdubWVudCBwYXRoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShcIk5vIHVzZXJzIGZvdW5kIGluIGxpc3QuIEFzc2lnbmluZyBibGFuayBcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIGluIGdldFVzZXJzTGlzdEJ5Um9sZSB1bmRlZmluZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBpbiBnZXRVc2Vyc0xpc3RCeVJvbGUnKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhc2suYXNzaWduLnN3aW1sYW5lICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoJ3N3aW1sYW5lJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1N3aW1sYW5lIGltcGxlbWVudGF0aW9uICEhJyk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG5cbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuXG4gICAgICAgIH0pO1xuXG5cblxuXG4gICAgfSk7XG5cbn07XG5cblxuXG4vKipcbiAqIFByb2Nlc3MgdGFza3NcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdGFzayAtIHRoZSB0YXNrIGNvbmZpZyBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gaW5wdXREYXRhIC0gdGhlIHVzZXIgaW5wdXQgZGF0YVxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuZnVuY3Rpb24gc2VydmVyKHNlcnZlciwgcHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN1YlByb2Nlc3MsIG1vZGVsLCBfV0ZJbnN0YW5jZSwgZGF0YSwgdXVpZCkge1xuICAgIFxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICBcbiAgICAgICAgICAgIC8vdmFyIF9XRkluc3RhbmNlID0gYXBwLlNDT1BFLndvcmtmbG93O1xuICAgICAgICAgICAgdmFyIHByb2ZpbGVJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XG4gICAgICAgICAgICB2YXIgYWN0aW9uQmxvY2sgPSBzZXJ2ZXIuc2VydmVyQWN0aW9uWzBdO1xuICAgICAgICAgICAgaWYobW9kZWwuYXNzaWdubWVudEhpc3RvcnkgPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICBtb2RlbC5hc3NpZ25tZW50SGlzdG9yeSA9IFtdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgYXNzaWduZWUgPSBtb2RlbC5hc3NpZ25lZFRvO1xuICAgICAgICAgICAgaWYoYXNzaWduZWUudXNlcklkICE9XCJcIiAmJiBhc3NpZ25lZS5uYW1lICE9IFwiXCIpe1xuICAgICAgICAgICAgICAgIHZhciBuZXdPYmogPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGFzc2lnbmVlKSk7XG4gICAgICAgICAgICAgICAgbW9kZWwuYXNzaWdubWVudEhpc3RvcnkucHVzaChuZXdPYmopO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXNzaWduZWUubmFtZSA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcm5hbWUgKyBcIlwiO1xuICAgICAgICAgICAgYXNzaWduZWUudXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQgKyBcIlwiO1xuICAgICAgICAgICAgYXNzaWduZWUuZGF0ZVRpbWUgPSBtb21lbnQoKS5mb3JtYXQoKTtcbiAgICAgICAgICAgIGFzc2lnbmVlLnR5cGUgPSBBU1NJR05NRU5UX1RZUEVfQVVUTztcbiAgICAgICAgICAgIGFzc2lnbmVlLmR1ZURhdGVUaW1lID0gJyc7XG4gICAgICAgICAgICBhc3NpZ25lZS5ieSA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkICsgXCJcIjtcblxuICAgICAgICAgICAgYWN0aW9uKGFjdGlvbkJsb2NrLCBwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3ViUHJvY2VzcywgbW9kZWwsIF9XRkluc3RhbmNlLCBkYXRhLCB1dWlkKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoXCJObyB1c2VycyBmb3VuZCBpbiBsaXN0LiBBc3NpZ25pbmcgYmxhbmsgXCIpO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIHJlamVjdChcIlNlcnZlciBhY3Rpb24gZXJyb3IgZm91bmQgcmVqZWN0ZWRcIilcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICBcbiAgICB9O1xuXG4vKipcbiAqIFByb2Nlc3MgdHJhbnNpdGlvblxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBwcm9jZXNzIGlkXG4gKiBAcGFyYW0ge251bWJlcn0gcHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBwcm9jZXNzIHNlcVxuICogQHBhcmFtIHtzdHJpbmd9IHN1YlByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN1Yi1wcm9jZXNzIGlkXG4gKiBAcGFyYW0ge251bWJlcn0gc3ViUHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBzdWItcHJvY2VzcyBzZXFcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdGVwSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdGVwIGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gdHJhbnNpdGlvbklkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gdHJhbnNpdGlvbiBpZFxuICogQHBhcmFtIHtvYmplY3R9IGRhdGEgLSBhbnkgYWRkaXRpb25hbCBkYXRhIHBhc3NlZCBpbiBhcyBrZXkgdmFsdWUgcGFpcnNcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiB0cmFuc2l0aW9uKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdGVwSWQsIHRyYW5zaXRpb25JZCwgZGF0YSwgX1dGSW5zdGFuY2UsIHNwdXVpZCwgbW9kZWwpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIHN0ZXBTZXEgPSAwO1xuICAgICAgICAgICAgdmFyIG5leHRTdGVwSWQgPSAnJztcbiAgICAgICAgICAgIHZhciBuZXh0U3RlcFNlcSA9IDA7XG4gICAgICAgICAgICB2YXIgc3ViUHJvY2VzcyA9IFtdO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRQcm9jZXNzID0gX1dGSW5zdGFuY2UuY29uZmlnLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKG9ialByb2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBpZiAob2JqUHJvY2Vzcy5faWQgPT0gcHJvY2Vzc0lkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmpQcm9jZXNzO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgY3VycmVudFN1YlByb2Nlc3MgPSBjdXJyZW50UHJvY2Vzc1swXS5zdWJQcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChvYmpTdWJQcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9ialN1YlByb2Nlc3MuX2lkID09IHN1YlByb2Nlc3NJZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqU3ViUHJvY2VzcztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRTdGVwID0gY3VycmVudFN1YlByb2Nlc3NbMF0uc3RlcHMuZmlsdGVyKGZ1bmN0aW9uIChvYmpTdGVwKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9ialN0ZXAuX2lkID09IHN0ZXBJZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqU3RlcDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIHRyYW5zaXRpb24gPSBjdXJyZW50U3RlcFswXS50cmFuc2l0aW9uLmZpbHRlcihmdW5jdGlvbiAob2JqVHJhbnNpdGlvbikge1xuICAgICAgICAgICAgICAgIGlmIChvYmpUcmFuc2l0aW9uLl9pZCA9PSB0cmFuc2l0aW9uSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9ialRyYW5zaXRpb247XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY3VycmVudFN1YlByb2Nlc3NbMF0uc3RlcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFN1YlByb2Nlc3NbMF0uc3RlcHNbaV0uX2lkID09IHN0ZXBJZCkge1xuICAgICAgICAgICAgICAgICAgICBzdGVwU2VxID0gcGFyc2VJbnQoY3VycmVudFN1YlByb2Nlc3NbMF0uc3RlcHNbaV0uX3NlcSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN1cnJlbnRTdWJQcm9jZXNzWzBdLnN0ZXBzLmZpbHRlcihmdW5jdGlvbiAoc3RlcEl0ZW0pIHtcbiAgICAgICAgICAgICAgICBuZXh0U3RlcFNlcSA9IHN0ZXBTZXEgKyAxO1xuICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChzdGVwSXRlbS5fc2VxKSA9PSBuZXh0U3RlcFNlcSkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0U3RlcElkID0gc3RlcEl0ZW0uX2lkO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSlcbiAgICAgICBcbiAgICAgICBcbiAgICAgICBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIG1heFN0ZXBzID0gY3VycmVudFN1YlByb2Nlc3NbMF0uc3RlcHMubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIHNwaW5zdGFuY2VPYmplY3QgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiKyBzcHV1aWQgK1wiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgIHZhciBzcEluc3RhbmNlU3RlcE9iamVjdCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIrIHNwdXVpZCArXCInXS9zdGVwXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG5cbiAgICAgICAgICAgIC8vIEFkZGluZyBzdGVwIE9iamVjdCBpbiBzdWJwcm9jZXNzIGhpc3RvcnkgRnJvbSBzZWNvbmQgc3RlcC4gQXMgZmlyc3Qgc3RlcCBpcyBhZGRlZCBhdCBzdWJQcm9jZXNzKCkgZnVuY3Rpb24gXG4gICAgICAgICAgICBpZiAoc3BpbnN0YW5jZU9iamVjdC5oaXN0b3J5ID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHNwaW5zdGFuY2VPYmplY3QuaGlzdG9yeSA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHB1c2hJbmRpY2F0b3JUb01vZGVsID0gZnVuY3Rpb24obW9kZWwpe1xuXG4gICAgICAgICAgICAgICAgLy8gSW4gYm90aCAgdGhlIGNhc2VzIHRoZSBsaXN0IGlzIGRpZmZlcm5ldCB0aGF0IG5lZWRzIHRvIGJlIG1hZGUgc2FtZS5cbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3JMaXN0ID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIisgc3B1dWlkICtcIiddL2luZGljYXRvcnNcIiwgX1dGSW5zdGFuY2UgLHt9KTtcbiAgICAgICAgICAgICAgICB2YXIgaXNGaXJzdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmKGluZGljYXRvckxpc3QgPT0gdW5kZWZpbmVkIHx8IGluZGljYXRvckxpc3QubGVuZ3RoID09IDApe1xuICAgICAgICAgICAgICAgICAgICBpc0ZpcnN0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgaW5kaWNhdG9yTGlzdCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1t3b3JrZmxvd3MvcHJvY2Vzc2VzW3N1YlByb2Nlc3NVVUlEIGVxICdcIisgc3B1dWlkICtcIiddXVwiLCBfV0ZJbnN0YW5jZSAse30pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihtb2RlbC5pbmRpY2F0b3JzID09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgbW9kZWwuaW5kaWNhdG9ycyA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGluZGljYXRvckxpc3QubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmKGlzRmlyc3Qpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdXVpZCA9IGluZGljYXRvckxpc3Rbal0uX2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJldiA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tfaWQgZXEgJ1wiKyB1dWlkICtcIiddL19yZXZcIiAsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VxID0gaW5kaWNhdG9yTGlzdFtqXS5tb2RlbC5wZW5kaW5nLnNlcTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGF0dXMgPSBpbmRpY2F0b3JMaXN0W2pdLm1vZGVsLnBlbmRpbmcuc3RhdHVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZE9iamVjdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dWlkOiB1dWlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldjogcmV2LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcTogc2VxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5pbmRpY2F0b3JzLnB1c2goaW5kT2JqZWN0KTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHV1aWQgPSBpbmRpY2F0b3JMaXN0W2pdLmluc3RhbmNlc1swXS51dWlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJldiA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tfaWQgZXEgJ1wiKyB1dWlkICtcIiddL19yZXZcIiAsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VxID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW19pZCBlcSAnXCIrIHV1aWQgK1wiJ10vbW9kZWwvcGVuZGluZy9zZXFcIixfV0ZJbnN0YW5jZSx7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RhdHVzID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW19pZCBlcSAnXCIrIHV1aWQgK1wiJ10vbW9kZWwvcGVuZGluZy9zdGF0dXNcIixfV0ZJbnN0YW5jZSx7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kT2JqZWN0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV1aWQ6IHV1aWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV2OiByZXYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VxOiBzZXEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLmluZGljYXRvcnMucHVzaChpbmRPYmplY3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH0gICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGVsZXRlIG1vZGVsLmFzc2lnbmVkVG87XG4gICAgICAgICAgICAgICAgZGVsZXRlIG1vZGVsLmFzc2lnbm1lbnQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vZGVsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBhZGQgaW5mb3JtYXRpb24gdG8gdHJhbnN0aW9uIG9iamVjdC5cbiAgICAgICAgICAgIHZhciAgdHJuT2JqZWN0ID0ge1xuICAgICAgICAgICAgICAgIHRyYW5zaXRpb25JZDogdHJhbnNpdGlvblswXS5faWQsXG4gICAgICAgICAgICAgICAgZGF0ZVRpbWU6IG1vbWVudCgpLmZvcm1hdCgpLFxuICAgICAgICAgICAgICAgIHVzZXJJZDogTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQgKyBcIlwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihtb2RlbCAhPSB1bmRlZmluZWQgJiYgT2JqZWN0LmtleXMobW9kZWwpLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIG1vZGVsLnRyYW5zaXRpb24gPSB0cm5PYmplY3Q7ICAgIFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzcEluc3RhbmNlU3RlcE9iamVjdC50cmFuc2l0aW9uID0gdHJuT2JqZWN0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjb3B5IGN1cnJlbnQgYXNzaWduZWRUbyB0byByZUFzc2lnbm1lbnQgb2JqZWN0XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKG1vZGVsICE9IHVuZGVmaW5lZCAmJiBPYmplY3Qua2V5cyhtb2RlbCkubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgaWYobW9kZWwuYXNzaWdubWVudEhpc3RvcnkgPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwuYXNzaWdubWVudEhpc3RvcnkgPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGFzc2lnbmVlT2JqID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShtb2RlbC5hc3NpZ25lZFRvKSk7XG4gICAgICAgICAgICAgICAgaWYoYXNzaWduZWVPYmoudXNlcklkICE9IFwiXCIgJiYgYXNzaWduZWVPYmoubmFtZSAhPSBcIlwiKXtcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwuYXNzaWdubWVudEhpc3RvcnkucHVzaChhc3NpZ25lZU9iaik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZihzcEluc3RhbmNlU3RlcE9iamVjdC5hc3NpZ25tZW50SGlzdG9yeSA9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgICAgICBzcEluc3RhbmNlU3RlcE9iamVjdC5hc3NpZ25tZW50SGlzdG9yeSA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgYXNzaWduZWVPYmogPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHNwSW5zdGFuY2VTdGVwT2JqZWN0LmFzc2lnbmVkVG8pKTtcbiAgICAgICAgICAgICAgICBpZihhc3NpZ25lZU9iai51c2VySWQgIT0gXCJcIiAmJiBhc3NpZ25lZU9iai5uYW1lICE9IFwiXCIpe1xuICAgICAgICAgICAgICAgICAgICBzcEluc3RhbmNlU3RlcE9iamVjdC5hc3NpZ25tZW50SGlzdG9yeS5wdXNoKGFzc2lnbmVlT2JqKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgaGlzdG9yeU1vZGVsO1xuICAgICAgICAgICAgaWYobW9kZWwgIT0gdW5kZWZpbmVkICYmIE9iamVjdC5rZXlzKG1vZGVsKS5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgaGlzdG9yeU1vZGVsID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShtb2RlbCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgaGlzdG9yeU1vZGVsID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShzcEluc3RhbmNlU3RlcE9iamVjdCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGluZE1vZGVsSW5TdGVwID0gcHVzaEluZGljYXRvclRvTW9kZWwoaGlzdG9yeU1vZGVsKTtcbiAgICAgICAgICAgIHNwaW5zdGFuY2VPYmplY3QuaGlzdG9yeS5wdXNoKGluZE1vZGVsSW5TdGVwKTsgXG5cbiAgICAgICAgICAgIGlmICh0cmFuc2l0aW9uWzBdLnRyYW5zaXRpb25BY3Rpb24uZ29Ub1N0ZXAgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgdmFyIG5leHRTZXEgPSBwYXJzZUludChjdXJyZW50U3RlcFswXS5fc2VxKSArIHBhcnNlSW50KHRyYW5zaXRpb25bMF0udHJhbnNpdGlvbkFjdGlvbi5nb1RvU3RlcC5kZWZhdWx0KTtcbiAgICAgICAgICAgICAgICB2YXIgbmV4dElkID0gJyc7XG4gICAgICAgICAgICAgICAgY3VycmVudFN1YlByb2Nlc3NbMF0uc3RlcHMuZmlsdGVyKGZ1bmN0aW9uIChzdGVwSXRlbSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChzdGVwSXRlbS5fc2VxKSA9PSBuZXh0U3RlcFNlcSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dElkID0gc3RlcEl0ZW0uX2lkO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHN0ZXAocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIG5leHRJZCwgbmV4dFNlcSwgZGF0YSwgX1dGSW5zdGFuY2UsIHNwdXVpZCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXh0U2VxID09IG1heFN0ZXBzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnQWxsIFN0ZXAgdHJhbnNpdGlvbnMgaGF2ZSBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzQ29tcGxldGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcDogcmVzdWx0LmRhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1N0ZXAgdHJhbnNpdGlvbiBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzQ29tcGxldGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXA6IHJlc3VsdC5kYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmICh0cmFuc2l0aW9uWzBdLnRyYW5zaXRpb25BY3Rpb24uZ29Ub1N0ZXBJZCAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgdmFyIGdvVG9TdGVwSWQgPSB0cmFuc2l0aW9uWzBdLnRyYW5zaXRpb25BY3Rpb24uZ29Ub1N0ZXBJZC5zdGVwSWQ7XG4gICAgICAgICAgICAgICAgdmFyIGdvVG9TdGVwU2VxID0gMTtcblxuICAgICAgICAgICAgICAgIGN1cnJlbnRTdWJQcm9jZXNzWzBdLnN0ZXBzLmZpbHRlcihmdW5jdGlvbiAoc3RlcEl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0ZXBJdGVtLl9pZCA9PSBnb1RvU3RlcElkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBnb1RvU3RlcFNlcSA9IHBhcnNlSW50KHN0ZXBJdGVtLl9zZXEpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHN0ZXAocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIGdvVG9TdGVwSWQsIGdvVG9TdGVwU2VxLCBkYXRhLCBfV0ZJbnN0YW5jZSwgc3B1dWlkKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdvVG9TdGVwU2VxID09IG1heFN0ZXBzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdBbGwgU3RlcCB0cmFuc2l0aW9ucyBoYXZlIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NDb21wbGV0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwOiByZXN1bHQuZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdTdGVwIHRyYW5zaXRpb24gY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc0NvbXBsZXRlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwOiByZXN1bHQuZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRyYW5zaXRpb25bMF0udHJhbnNpdGlvbkFjdGlvbi5zdG9wICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgLy8gQXMgdGhpcyBpcyB0aGUgbGFzdCBzdGVwICh3aGVyZSBzdG9wIGlzIGRlZmllZCkgLCBzdWJQcm9jZXNzIHBvc3RBY3Rpb25zIHNob3VsZCBjb21lIGhlcmUuXG5cbiAgICAgICAgICAgICAgICB2YXIgcG9zdEFjdGlvbnNDb25mID0gY3VycmVudFByb2Nlc3NbMF0ucG9zdEFjdGlvbnM7XG4gICAgICAgICAgICAgICAgcG9zdEFjdGlvbnMocG9zdEFjdGlvbnNDb25mLCBfV0ZJbnN0YW5jZSwgc3B1dWlkKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnU3RlcCB0cmFuc2l0aW9uIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuV29ya2Zsb3cgc3RvcHBlZC4nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzQ29tcGxldGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwOiBtb2RlbFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG5cbiAgICB9KTtcbn07XG5cbi8qKlxuICogUHJvY2VzcyBwb3N0QWN0aW9uc1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBwb3N0QWN0aW9ucyAtIHRoZSBwb3N0QWN0aW9ucyBjb25maWcgZGF0YVxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuZnVuY3Rpb24gcG9zdEFjdGlvbnMocG9zdEFjdGlvbnMsIF9XRkluc3RhbmNlLCBzcHV1aWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgY29tcGxldGVkID0gW107XG4gICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHNwT2JqZWN0ID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIisgc3B1dWlkICtcIiddXCIsIF9XRkluc3RhbmNlICwge30pWzBdO1xuICAgICAgICAgICAgdmFyIHByb2Nlc3NJRCA9IHNwT2JqZWN0W1wibWV0YS1kYXRhXCJdLnByb2Nlc3NDb25maWdJZDtcbiAgICAgICAgICAgIHZhciBwcm9jZXNzSWQgPSBzcE9iamVjdFtcIm1ldGEtZGF0YVwiXS5zdWJQcm9jZXNzQ29uZmlnSWQ7XG4gICAgICAgICAgICB2YXIgcHJvY2Vzc1NFUSA9IHNwT2JqZWN0W1wibWV0YS1kYXRhXCJdLnN1YlByb2Nlc3NJbnNTZXE7XG4gICAgICAgICAgICB2YXIgcHJvY2Vzc1NlcSA9IHNwT2JqZWN0W1wibWV0YS1kYXRhXCJdLnN1YlByb2Nlc3NJbnNTZXE7XG5cbiAgICAgICAgICAgIHZhciBzdWJQcm9jZXNzQ29uZmlnT2JqZWN0ID0gSlNPTi54cGF0aChcIi9jb25maWcvcHJvY2Vzc2VzW19pZCBlcSAnXCIrIHByb2Nlc3NJRCtcIiddL3N1YlByb2Nlc3Nlc1tfaWQgZXEgJ1wiKyBwcm9jZXNzSWQrXCInXVwiLCBfV0ZJbnN0YW5jZSAsIHt9KVswXTtcbiAgICAgICAgICAgIHZhciBzdGVwT2JqZWN0ID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIisgc3B1dWlkICtcIiddL3N0ZXBcIixfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgXG5cbiAgICAgICAgICAgIHV0aWwuc3luY0xvb3AocG9zdEFjdGlvbnMubGVuZ3RoLCBmdW5jdGlvbiAobG9vcCkge1xuICAgICAgICAgICAgICAgIHZhciBjb3VudGVyID0gbG9vcC5pdGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICBhY3Rpb24ocG9zdEFjdGlvbnNbY291bnRlcl0sIHByb2Nlc3NJRCwgcHJvY2Vzc1NFUSwgcHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzQ29uZmlnT2JqZWN0LCBzdGVwT2JqZWN0LF9XRkluc3RhbmNlLCB7fSwgc3B1dWlkKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGFsbCBwcmUtcmVxdWlzaXRlcyBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LlxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQucHVzaCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgbG9vcC5uZXh0KCk7XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQucHVzaChmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGxvb3AuYnJlYWsoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbXBsZXRlZC5ldmVyeShCb29sZWFuKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnUG9zdC1hY3Rpb25zIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywge30pO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGUHJlQWN0aW9uc0Vycm9yJywgJ05vdCBhbGwgcG9zdC1hY3Rpb25zIHBhc3NlZC4nKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG5cbiAgICB9KTtcbn07XG5cbi8qXG5mdW5jdGlvbiBzZW5kTm90aWZpY2F0aW9ucyh1c2Vyc0xpc3QsIHNwdXVpZCl7XG5cbiAgLy8gZ2V0IHVzZXJzIGxpc3QgXG4gIC8vIHNlbiBub3RpZmljYXRpb25zIHRvIHVzZXJzIHkgYWRkaW5nIGNoYW5uZWxzIHRvIHRoZW1cblxuICB2YXIgY2hhbm5lbEFycmF5ID0gW107XG5cbiAgZm9yKGk9MDtpPHVzZXJzTGlzdC5sZW5ndGg7IGkrKyl7XG4gICAgY2hhbm5lbEFycmF5LnB1c2goXCJ1c2VyX1wiK3VzZXJzTGlzdFtpXS5pZCk7XG4gIH1cblxuICBhc3NpZ25Ub1VzZXJzKHByb2Nlc3NXb3JrZmxvd01lc3NhZ2UoTk9USUZJQ0FUSU9OX1VTRVJfTVNHX0FDQ0VQVCwgc3B1dWlkKSwgY2hhbm5lbEFycmF5KTtcblxufTsqL1xuXG4vKmZ1bmN0aW9uIGFzc2lnblRvVXNlcnMobWVzc2FnZSwgY2hhbm5lbEFycmF5KXtcblxuICAgICB2YXIgY2hhbm5lbHMgPSBjaGFubmVsQXJyYXk7XG5cbiAgICAgdmFyIG5vdGlmaWNhdGlvbiA9ICB7IFxuICAgICAgICAgIFwiX2lkXCI6IGdlbmVyYXRlVVVJRCgpLFxuICAgICAgICAgIFwiY2hhbm5lbHNcIjpjaGFubmVscyxcbiAgICAgICAgICBcIm1lc3NhZ2VcIjogbWVzc2FnZSxcbiAgICAgICAgICBcIm1lc3NhZ2VUeXBlXCI6IFwiaW5mb1wiLFxuICAgICAgICAgIFwiY3JlYXRlZERhdGVUaW1lXCI6IG1vbWVudCgpLmZvcm1hdCgpLFxuICAgICAgICAgIFwicmVhZFwiOiBmYWxzZSxcbiAgICAgICAgICBcInJlYWREYXRlVGltZVwiOiBcIlwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcIm5vdGlmaWNhdGlvblwiLFxuICAgICAgICAgIFwic2VuZGVyVXNlcklkXCI6IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkXG4gICAgICAgfTtcblxuICAgICAgIGNvbnNvbGUubG9nKG5vdGlmaWNhdGlvbik7XG4gICAgICAgZGFvLnVwc2VydChub3RpZmljYXRpb24pO1xuXG4gIH07Ki9cblxuZnVuY3Rpb24gcHJvY2Vzc1dvcmtmbG93TWVzc2FnZShtZXNzYWdlLCBzcHV1aWQpIHtcblxuICAgIHZhciByZXBsYWNlZE1zZyA9IG1lc3NhZ2U7XG5cbiAgICBpZiAocmVwbGFjZWRNc2cuaW5kZXhPZignI0lOU1RBTkNFX0xBQkVMJykgIT09IC0xKSB7XG4gICAgICAgIHZhciB2YWwgPSBKU09OLnhwYXRoKFwiL2luc3RhbmNlL3Byb2Nlc3Nlcy9zdWJQcm9jZXNzZXNbdXVpZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL2xhYmVsXCIsIGFwcC5TQ09QRS53b3JrZmxvdywge30pWzBdO1xuICAgICAgICByZXBsYWNlZE1zZyA9IHJlcGxhY2VkTXNnLnJlcGxhY2UoJyNJTlNUQU5DRV9MQUJFTCcsIHZhbCk7XG5cbiAgICB9XG5cbiAgICBpZiAocmVwbGFjZWRNc2cuaW5kZXhPZignI1VTRVJfTkFNRScpICE9PSAtMSkge1xuICAgICAgICB2YXIgdmFsID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHNwdXVpZCArIFwiJ10vc3RlcC9hc3NpZ25lZFRvL25hbWVcIiwgYXBwLlNDT1BFLndvcmtmbG93LCB7fSlbMF07XG4gICAgICAgIHJlcGxhY2VkTXNnID0gcmVwbGFjZWRNc2cucmVwbGFjZSgnI1VTRVJfTkFNRScsIHZhbCk7XG5cbiAgICB9XG5cbiAgICBpZiAocmVwbGFjZWRNc2cuaW5kZXhPZignI1BST0ZJTEVfVElUTEUnKSAhPT0gLTEpIHtcbiAgICAgICAgdmFyIHZhbCA9IGFwcC5wcm9maWxlLnRpdGxlO1xuICAgICAgICByZXBsYWNlZE1zZyA9IHJlcGxhY2VkTXNnLnJlcGxhY2UoJyNQUk9GSUxFX1RJVExFJywgdmFsKTtcblxuICAgIH1cblxuICAgIGlmIChyZXBsYWNlZE1zZy5pbmRleE9mKCcjUFJPRklMRV9UWVBFJykgIT09IC0xKSB7XG4gICAgICAgIHZhciB2YWwgPSBhcHAuU0NPUEUuQVBQX0NPTkZJRy5uYW1lO1xuICAgICAgICByZXBsYWNlZE1zZyA9IHJlcGxhY2VkTXNnLnJlcGxhY2UoJyNQUk9GSUxFX1RZUEUnLCB2YWwpO1xuXG4gICAgfVxuXG4gICAgaWYgKHJlcGxhY2VkTXNnLmluZGV4T2YoJyNWQVJfU1BVVUlEJykgIT09IC0xKSB7XG4gICAgICAgIHZhciB2YWwgPSBzcHV1aWQ7XG4gICAgICAgIHJlcGxhY2VkTXNnID0gcmVwbGFjZWRNc2cucmVwbGFjZSgnI1ZBUl9TUFVVSUQnLCB2YWwpO1xuXG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcGxhY2VkTXNnO1xufTtcblxuZnVuY3Rpb24gX2dldE5hbWUoYXJyLCBsYW5nKSB7XG4gICAgaWYgKGFyciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoYXJyW2ldLl9sYW5nID09PSBsYW5nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFycltpXS52YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9XG5cbn07XG5cbmZ1bmN0aW9uIF9nZXROYW1lQnlMYW5nKG9iaikge1xuICAgIHJldHVybiBsaWJyYXJ5LmdldE5hbWVCeUxhbmcob2JqKTtcbn07XG5cblxuXG5cblxuLyoqXG4gKiBQcm9jZXNzIHByZVdvcmtBY3Rpb25zXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHByZVdvcmtBY3Rpb25zIC0gdGhlIHByZVdvcmtBY3Rpb25zIGNvbmZpZyBkYXRhXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5cbmZ1bmN0aW9uIHByZVdvcmtBY3Rpb25zKHByZVdvcmtBY3Rpb25zLCBfV0ZJbnN0YW5jZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciBjb21wbGV0ZWQgPSBbXTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciBzdWJQcm9jZXNzQ29uZmlnT2JqZWN0ID0gSlNPTi54cGF0aChcIi9jb25maWcvcHJvY2Vzc2VzW19pZCBlcSAnXCIrYXBwLnByb2Nlc3NJRCtcIiddL3N1YlByb2Nlc3Nlc1tfaWQgZXEgJ1wiKyBhcHAucHJvY2Vzc0lkK1wiJ11cIiwgX1dGSW5zdGFuY2UgLCB7fSlbMF07XG4gICAgICAgICAgICB2YXIgc3RlcE9iamVjdCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIrIGFwcC5TQ09QRS5wcm9jZXNzVVVJRCArXCInXS9zdGVwXCIsX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgIHV0aWwuc3luY0xvb3AocHJlV29ya0FjdGlvbnMubGVuZ3RoLCBmdW5jdGlvbiAobG9vcCkge1xuICAgICAgICAgICAgICAgIHZhciBjb3VudGVyID0gbG9vcC5pdGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICBhY3Rpb24ocHJlV29ya0FjdGlvbnNbY291bnRlcl0sIGFwcC5wcm9jZXNzSUQsIGFwcC5wcm9jZXNzU0VRLCBhcHAucHJvY2Vzc0lkLCBhcHAucHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0NvbmZpZ09iamVjdCwgc3RlcE9iamVjdCAsX1dGSW5zdGFuY2UsIHt9LCBhcHAuU0NPUEUucHJvY2Vzc1VVSUQpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgYWxsIHByZS1yZXF1aXNpdGVzIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlZC5wdXNoKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBsb29wLm5leHQoKTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlZC5wdXNoKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgbG9vcC5icmVhaygpO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29tcGxldGVkLmV2ZXJ5KEJvb2xlYW4pKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdQcmVXb3JrLWFjdGlvbnMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCB7fSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZQcmVBY3Rpb25zRXJyb3InLCAnTm90IGFsbCBwcmUtd29yay1hY3Rpb25zIHBhc3NlZC4nKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG5cbiAgICB9KTtcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgICBwcmVSZXF1aXNpdGVzOiBwcmVSZXF1aXNpdGVzLFxuICAgIHByZUFjdGlvbnM6IHByZUFjdGlvbnMsXG4gICAgcG9zdEFjdGlvbnM6IHBvc3RBY3Rpb25zLFxuICAgIHByZVdvcmtBY3Rpb25zOiBwcmVXb3JrQWN0aW9ucyxcbiAgICBzdWJQcm9jZXNzOiBzdWJQcm9jZXNzLFxuICAgIGluZGljYXRvckRvY3M6IGluZGljYXRvckRvY3MsXG4gICAgdGFzazogdGFzayxcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2l0aW9uLFxuICAgIGFzc2lnblVzZXI6IGFzc2lnblVzZXJcblxufSIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVdGlsaXR5IE1vZHVsZVxuICpcbiAqIEBtb2R1bGUgbGliL3V0aWxcbiAqXG4gKiBAYXV0aG9yIEJyZW50IEdvcmRvblxuICogQHZlcnNpb24gMC4xLjBcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFdvcmtmbG93IHV0aWxpdHkgbW9kdWxlIHVzZWQgdG8gZm9ybWF0IHRoZSByZXR1cm4gYW5kIGVycm9yIG9iamVjdHMsIGFuZFxuICogY29udGFpbnMgc29tZSBvdGhlciB1dGlsaXR5IGZ1bmN0aW9ucyBzdWNoIGFzIGEgc3luYyBsb29wIGFuZCBjb21wYXJlLlxuICpcbiAqL1xuXG4vKipcbiAqIFN1Y2Nlc3MgYmxvY2sgcmV0dXJuIG9iamVjdCwgY29udGFpbnMgYSBtZXNzYWdlIGFuZCBvcHRpb25hbCBkYXRhIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIHRoZSBzdWNjZXNzIG1lc3NhZ2VcbiAqIEBwYXJhbSB7c3RyaW5nfE9iamVjdH0gW2RhdGFdIC0gdGhlIHN1Y2Nlc3MgcmV0dXJuZWQgZGF0YVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBSZXR1cm4gc3VjY2VzcyB3aXRob3V0IGEgZGF0YSBibG9ja1xuICogdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1N1Y2Nlc3MgbWVzc2FnZSBnb2VzIGhlcmUuLi4nKTtcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IC0gd2l0aCBtZXNzYWdlIGFuZCBkYXRhIHByb3BlcnRpZXNcbiAqXG4gKi9cbmZ1bmN0aW9uIHN1Y2Nlc3MobWVzc2FnZSwgZGF0YSl7XG5cdHJldHVybiB7XG5cdFx0bWVzc2FnZTogbWVzc2FnZSxcblx0XHRkYXRhOiBkYXRhXG5cdH07XG59O1xuXG4vKipcbiAqIFdhcm5pbmcgYmxvY2sgcmV0dXJuIG9iamVjdCwgY29udGFpbnMgYSBtZXNzYWdlIGFuZCBvcHRpb25hbCBkYXRhIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIHRoZSB3YXJuaW5nIG1lc3NhZ2VcbiAqIEBwYXJhbSB7c3RyaW5nfE9iamVjdH0gW2RhdGFdIC0gdGhlIHJldHVybmVkIGRhdGFcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gUmV0dXJuIHN1Y2Nlc3Mgd2l0aG91dCBhIGRhdGEgYmxvY2tcbiAqIHZhciBzdWNjZXNzID0gdXRpbC53YXJuKCdXYXJuaW5nIG1lc3NhZ2UgZ29lcyBoZXJlLi4uJyk7XG4gKlxuICogQHJldHVybiB7T2JqZWN0fSB3aXRoIG1lc3NhZ2UgYW5kIGRhdGEgcHJvcGVydGllcywgYW5kIGxvZ3MgdGhlIHdhcm5pbmcgdG8gdGhlIGNvbnNvbGUuXG4gKlxuICovXG5mdW5jdGlvbiB3YXJuKG1lc3NhZ2UsIGRhdGEpe1xuXHRjb25zb2xlLndhcm4oZGF0YSk7XG5cdHJldHVybiB7XG5cdFx0d2FybmluZzogbWVzc2FnZSxcblx0XHRkYXRhOiBkYXRhXG5cdH07XG59O1xuXG4vKipcbiAqIEVycm9yIGJsb2NrIEpTIGVycm9yIG9iamVjdCwgY29udGFpbnMgYSBjb2RlIGFuZCBtZXNzYWdlIGZvciB0aGUgZXJyb3IuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNvZGUgLSB0aGUgZXJyb3IgY29kZVxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSB0aGUgZXJyb3IgbWVzc2FnZVxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgc3VjY2VzcyA9IHV0aWwuZXJyb3IoJ0Vycm9yMDAxJywnRXJyb3IgbWVzc2FnZSBnb2VzIGhlcmUuLi4nKTtcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IHdpdGggYSBjb2RlIGFuZCBtZXNzYWdlIHByb3BlcnRpZXMuXG4gKlxuICovXG5mdW5jdGlvbiBlcnJvcihjb2RlLCBtZXNzYWdlKXtcblx0dmFyIGVyciA9IG5ldyBFcnJvcignJyk7XG5cdGVyci5uYW1lID0gY29kZTtcblx0ZXJyLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXHRyZXR1cm4gZXJyO1xufTtcblxuLyoqXG4gKiBBIGxvb3Agd2hpY2ggY2FuIGxvb3AgWCBhbW91bnQgb2YgdGltZXMsIHdoaWNoIGNhcnJpZXMgb3V0XG4gKiBhc3luY2hyb25vdXMgY29kZSwgYnV0IHdhaXRzIGZvciB0aGF0IGNvZGUgdG8gY29tcGxldGUgYmVmb3JlIGxvb3BpbmcuXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGl0ZXJhdGlvbnMgLSB0aGUgbnVtYmVyIG9mIGl0ZXJhdGlvbnMgdG8gY2Fycnkgb3V0XG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBwcm9jZXNzIC0gdGhlIGNvZGUvZnVuY3Rpb24gd2UncmUgcnVubmluZyBmb3IgZXZlcnlcbiAqIGl0ZXJhdGlvblxuICogQHBhcmFtIHtmdW5jdGlvbn0gZXhpdCAtIGFuIG9wdGlvbmFsIGNhbGxiYWNrIHRvIGNhcnJ5IG91dCBvbmNlIHRoZSBsb29wXG4gKiBoYXMgY29tcGxldGVkXG4gKlxuICogQGV4YW1wbGVcbiAqIHV0aWwuc3luY0xvb3AoNSwgZnVuY3Rpb24obG9vcCl7XG4gKiBcdHZhciBjb3VudGVyID0gbG9vcC5pdGVyYXRpb24oKTtcbiAqIFx0Ly8gQWRkIGFzeW5jIGNhbGxzIGhlcmUuLlxuICpcbiAqIH0sIGZ1bmN0aW9uKCl7XG4gKiBcdC8vIE9uIGNvbXBsZXRlIHBlcmZvcm0gYWN0aW9ucyBoZXJlLi4uXG4gKlxuICogfSk7XG4gKlxuICogQHJldHVybiB7T2JqZWN0fSB0aGUgbG9vcCBjb250cm9sIG9iamVjdC5cbiAqXG4gKi9cbmZ1bmN0aW9uIHN5bmNMb29wKGl0ZXJhdGlvbnMsIHByb2Nlc3MsIGV4aXQpe1xuICAgIHZhciBpbmRleCA9IDAsXG4gICAgICAgIGRvbmUgPSBmYWxzZSxcbiAgICAgICAgc2hvdWxkRXhpdCA9IGZhbHNlO1xuICAgIHZhciBsb29wID0ge1xuICAgICAgICBuZXh0OmZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpZihkb25lKXtcbiAgICAgICAgICAgICAgICBpZihzaG91bGRFeGl0ICYmIGV4aXQpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXhpdCgpOyAvLyBFeGl0IGlmIHdlJ3JlIGRvbmVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJZiB3ZSdyZSBub3QgZmluaXNoZWRcbiAgICAgICAgICAgIGlmKGluZGV4IDwgaXRlcmF0aW9ucyl7XG4gICAgICAgICAgICAgICAgaW5kZXgrKzsgLy8gSW5jcmVtZW50IG91ciBpbmRleFxuICAgICAgICAgICAgICAgIHByb2Nlc3MobG9vcCk7IC8vIFJ1biBvdXIgcHJvY2VzcywgcGFzcyBpbiB0aGUgbG9vcFxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIHdlJ3JlIGRvbmVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZG9uZSA9IHRydWU7IC8vIE1ha2Ugc3VyZSB3ZSBzYXkgd2UncmUgZG9uZVxuICAgICAgICAgICAgICAgIGlmKGV4aXQpIGV4aXQoKTsgLy8gQ2FsbCB0aGUgY2FsbGJhY2sgb24gZXhpdFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpdGVyYXRpb246ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJldHVybiBpbmRleCAtIDE7IC8vIFJldHVybiB0aGUgbG9vcCBudW1iZXIgd2UncmUgb25cbiAgICAgICAgfSxcbiAgICAgICAgYnJlYWs6ZnVuY3Rpb24oZW5kKXtcbiAgICAgICAgICAgIGRvbmUgPSB0cnVlOyAvLyBFbmQgdGhlIGxvb3BcbiAgICAgICAgICAgIHNob3VsZEV4aXQgPSBlbmQ7IC8vIFBhc3NpbmcgZW5kIGFzIHRydWUgbWVhbnMgd2Ugc3RpbGwgY2FsbCB0aGUgZXhpdCBjYWxsYmFja1xuICAgICAgICB9XG4gICAgfTtcbiAgICBsb29wLm5leHQoKTtcbiAgICByZXR1cm4gbG9vcDtcbn07XG5cbmZ1bmN0aW9uIGNvbXBhcmUoc3ViamVjdCwgb3BlcmF0b3IsIHZhbHVlKSB7XG4gIFx0c3dpdGNoIChvcGVyYXRvcikge1xuICBcdFx0Y2FzZSAnZ3JlYXRlclRoYW4nOlxuXHRcdFx0cmV0dXJuIHN1YmplY3QgPiB2YWx1ZTtcblx0XHRjYXNlICdsZXNzVGhhbic6XG5cdFx0XHRyZXR1cm4gc3ViamVjdCA8IHZhbHVlO1xuXHRcdGNhc2UgJ2dyZWF0ZXJUaGFuRXF1YWwnOlxuXHRcdFx0cmV0dXJuIHN1YmplY3QgPj0gdmFsdWU7XG5cdFx0Y2FzZSAnbGVzc1RoYW5FcXVhbCc6XG5cdFx0XHRyZXR1cm4gc3ViamVjdCA8PSB2YWx1ZTtcblx0XHRjYXNlICdlcXVhbFRvJzpcblx0XHRcdHJldHVybiBzdWJqZWN0ID09PSB2YWx1ZTtcblx0XHRjYXNlICdub3RFcXVhbFRvJzpcblx0XHRcdHJldHVybiBzdWJqZWN0ICE9PSB2YWx1ZTtcbiAgXHR9XG59O1xuXG5mdW5jdGlvbiBnZXROYW1lKGFyciwgbGFuZyl7XG5cdGlmIChhcnIgIT09IHVuZGVmaW5lZCkge1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aCA7IGkrKykge1xuXHRcdFx0aWYgKGFycltpXS5pMThuLl9sYW5nID09PSBsYW5nKSB7XG5cdFx0XHRcdHJldHVybiBhcnJbaV0uaTE4bi52YWx1ZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiBcdHN1Y2Nlc3M6IHN1Y2Nlc3MsXG4gXHR3YXJuOiB3YXJuLFxuIFx0ZXJyb3I6IGVycm9yLFxuIFx0c3luY0xvb3A6IHN5bmNMb29wLFxuIFx0Y29tcGFyZTogY29tcGFyZSxcblx0Z2V0TmFtZTogZ2V0TmFtZVxuXG4gfVxuIl19
