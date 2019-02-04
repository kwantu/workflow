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

                model._id = _this.profile + ':processes:local';
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

            var buildParam = function(array) {

                var indName = "";
                for (var l = 0; l < array.length - 1; l++) {
                    indName = indName + "'" + array[l] + "',";
                }
                return '(' + indName + "'" + array[array.length - 1] + "')"

            };

            var spId = configProcess[0].subProcesses[0]._id;
            var toCheckArray = [];
            var instanceType = configProcess[0].subProcesses[0].instanceType;
            var processIndicators = JSON.xpath("indicators/_id", configProcess[0].subProcesses[0], {});

            var canCreateProcess = function(array) {

                var countSingle = JSON.xpath("count(/indicators[setId = " + buildParam(array) + " and cardinality eq 'single' ]/setId)", app.SCOPE.APP_CONFIG, {});

                if (countSingle > 0) {

                    var count = JSON.xpath("count(/subprocesses[indicators/id = " + buildParam(array) + " and complete eq 'false'])", _this, {})[0];
                    return (count == 0)

                } else {


                    if (instanceType.newSequence != undefined) {
                        var count = JSON.xpath("count(/subprocesses[id eq " + spId + " and indicators/id = " + buildParam(array) + " and complete eq 'false'])", _this, {})[0];
                        return (count == 0)
                    } else if (instanceType.newInstance != undefined) {
                        return true;
                    } else {
                        return true;
                    }



                }

            };

            if (canCreateProcess(processIndicators)) {

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

                });
                // Call the subprocess method
                var inputUUID = generateUUID();
                //create txn
                var txnPacket = {
                    "communityId": app.SCOPE.communityId,
                    "uuid": inputUUID,
                    "userId": LOCAL_SETTINGS.SUBSCRIPTIONS.userId,
                    "transactionType": "subProcess",
                    "documents": []
                };

                dao.startTransaction(txnPacket).then(function(succ) {

                    Process.subProcess(inputUUID, processId, processSeq, subProcessId, subProcessSeq, subprofileId, data, _this).then(function(subProcess) {
                        // Generate the uuid

                        var uuid = subProcess.data._id; //_this.profile + ':' + _this.app + ':' + processId + ':' + processSeq + ':' + subProcessId + ':' + subProcessSeq;

                        // Build the sub-process reference object

                        var groupKey = subProcess.data.groupKey;
                        //TODO: Change required to move isActive to subProcess file.Remove from here
                        if (subprofileId == undefined) {
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
                        Process.indicatorDocs(processId, indicators, step, _this).then(function(result) {
                            var success = util.success('Process: ' + _this.config.processes[0]._id + ' initialized successfully.', subProcessRef);
                            // commit call
                            resolve(success);
                        }, function(err) {
                            reject(err);
                        });

                    }, function(err) {
                        _this.instance.processes = _this.instance.processes.filter(function(obj) {
                            return !(obj.id == processId && obj.seq == processSeq);
                        });
                        console.log(err);
                        reject(err);
                    });

                }).catch(function(err) {
                    console.log(err);
                    if(err.responseJSON != undefined && err.responseJSON.message != undefined){
                        reject(err.responseJSON.message);
                    } else if(err.responseText != undefined) {
                        reject(err.responseText);
                    } else {
                        reject(err);
                    }
                    
                    
                });



            } else {
                reject("Cannot create workflow as other process using same SDO is not complete")
            }








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
            var model = JSON.xpath("/subprocesses[_id eq '" + spuuid + "']/step", app.SCOPE.workflow, {})[0];
            var stepObject = JSON.xpath("/processes[_id eq '" + processId + "']/subProcesses[_id eq '" + subProcessId + "']/steps[_id eq '" + stepId + "']", _this.config, {})[0];
            var subProcessSeq = JSON.xpath("/subprocesses[_id eq '" + spuuid + "']/meta-data/subProcessInsSeq", app.SCOPE.workflow, {})[0];

            // Update the current sub-process step data
            var update = function(type, result) {
                _this.instance.processes.filter(function(processItem) {
                    if (processItem.id == processId && processItem.seq == processSeq) {

                        processItem.subProcesses.filter(function(subProcessItem) {
                            if (subProcessItem.id == subProcessId) {

                                _this.subprocesses.filter(function(subProcessObj) {
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
                Process.postActions(postActions, _this, spuuid).then(function(success) {

                    Process.transition(processId, processSeq, subProcessId, subProcessSeq, stepId, transitionId, data, _this, spuuid, model).then(function(result) {

                        if (result.data.subProcessComplete) {

                            update('stepComplete', result);
                        } else {

                            update('step', result);
                        }

                    }, function(err) {

                        reject(err);
                    });

                }, function(err) {

                    reject(err);

                });


            } else {


                Process.transition(processId, processSeq, subProcessId, subProcessSeq, stepId, transitionId, data, _this, spuuid, model).then(function(result) {

                    if (result.data.subProcessComplete) {

                        update('stepComplete', result);
                    } else {

                        update('step', result);
                    }

                }, function(err) {

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
Workflow.prototype.assignUser = function(processId, processSeq, subProcessId, subProcessSeq, user, uuid) {
    // Re-assign the Workflow constructor instance as _this
    var _this = this;
    return new Promise(function(resolve, reject) {
        try {
            var spObject = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", app.SCOPE.workflow, {})[0];
            var spRev = spObject._rev;
            var txnPacket = {
                "communityId": app.SCOPE.communityId,
                "uuid": uuid,
                "userId": LOCAL_SETTINGS.SUBSCRIPTIONS.userId,
                "transactionType": "subProcess",
                "documents": [{
                    "document": uuid,
                    "rev": spRev
                }]
            };

            Process.assignUser(processId, processSeq, subProcessId, subProcessSeq, user, uuid, _this).then(function(result) {

               
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

Workflow.prototype.takeAssignment = function(spuuid) {
    // Re-assign the Workflow constructor instance as _this
    var _this = this;

    return new Promise(function(resolve, reject) {

        try {
           
           //Assignment are executing here

           var spObject = JSON.xpath("/subprocesses[_id eq '" + spuuid + "']", _this, {})[0];
           var assignee = JSON.xpath("/step/assignedTo", spObject, {})[0];
           //Pushing older record in reAssign array

           if (spObject.step.assignmentHistory == undefined) {
               spObject.step.assignmentHistory = [];
           }
           if (assignee.userId != "" && assignee.name != "") {
               spObject.step.assignmentHistory.push(JSON.parse(JSON.stringify(assignee)));
           }



           assignee.name = LOCAL_SETTINGS.SESSION.firstName + " " + LOCAL_SETTINGS.SESSION.lastName;
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
               Process.preWorkActions(preWorkActions, _this).then(function(success) {

                   resolve(_this);

               }, function(err) {

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

Workflow.prototype.condition = function(condition, spuuid) {

    var _this = this;
    return new Promise(function(resolve, reject) {

        try {

            var operator = condition.operator;
            var dataBlock = condition.value.data;

            if (condition.subject.indicator != undefined) {

                var setId = condition.subject.indicator.setId;
                var modelScope = condition.subject.indicator.modelScope;
                var elementPath = condition.subject.indicator.elementPath;
                if (condition.subject.indicator.context == 'subProcess') {

                    var indicatorUUID = JSON.xpath("/subprocesses[_id eq '" + spuuid + "']/indicators[id eq '" + setId + "']/instances[1]/uuid", _this, {})[0];
                    var indicatorModel = JSON.xpath("/indicators[_id eq '" + indicatorUUID + "']", _this, {})[0];
                    var dataElement = indicatorModel.model[modelScope].data[setId];
                    var value = eval("dataElement." + elementPath);

                    helper.getNodeValue(dataBlock, _this, spuuid).then(function(res) {
                        var result = helper.compare(value, operator, res);

                        resolve(result);
                    }, function(err) {
                        reject(err);
                    });



                } else {
                    reject('Not implemented')
                }


            } else if (condition.subject.indicatorWrapper != undefined) {
                reject('Not implemented')
            } else if (condition.subject.variable != undefined) {
                reject('Not implemented')
            } else if (condition.subject.subProcess != undefined) {

                var elementPath = condition.subject.subProcess.elementPath;
                var spObject = JSON.xpath("/subprocesses[_id eq '" + spuuid + "']", _this, {})[0];
                var value = eval("spObject." + elementPath);
                helper.getNodeValue(dataBlock, _this, spuuid).then(function(res) {
                    var result = helper.compare(value, operator, res);

                    resolve(result);
                }, function(err) {
                    reject(err);
                });
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

var community = (function() {

    return {

        createCommunity: function(_def, uuid, _WFInstance) {

            return new Promise(function(resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                var subprofileId = "";
                if (app.profile != undefined && app.profile.subprofileId != undefined) {
                    subprofileId = app.profile.subprofileId;
                }

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.subProcessUUID = uuid;
                workerObject.subprofileId = subprofileId;
                workerObject.channels.push("follow");
                workerObject.channels.push("community_" + app.SCOPE.getCommunityId());

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
                    worker.setWorkerInfoInSubprocess(workerObject, _WFInstance, uuid);
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

                var subprofileId = "";
                if (app.profile != undefined && app.profile.subprofileId != undefined) {
                    subprofileId = app.profile.subprofileId;
                }

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.subProcessUUID = uuid;
                workerObject.subprofileId = subprofileId;
                workerObject.channels.push("follow");
                workerObject.channels.push("community_" + app.SCOPE.getCommunityId());
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

                    worker.setWorkerInfoInSubprocess(workerObject, _WFInstance, uuid);

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

                var subprofileId = "";
                if (app.profile != undefined && app.profile.subprofileId != undefined) {
                    subprofileId = app.profile.subprofileId;
                }

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.subProcessUUID = uuid;
                workerObject.subprofileId = subprofileId;
                workerObject.channels.push("follow");
                workerObject.channels.push("community_" + app.SCOPE.getCommunityId());
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

                    worker.setWorkerInfoInSubprocess(workerObject, _WFInstance, uuid);

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

                var subprofileId = "";
                if (app.profile != undefined && app.profile.subprofileId != undefined) {
                    subprofileId = app.profile.subprofileId;
                }

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.subProcessUUID = uuid;
                workerObject.subprofileId = subprofileId;
                workerObject.channels.push("follow");
                workerObject.channels.push("community_" + app.SCOPE.getCommunityId());
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

                    worker.setWorkerInfoInSubprocess(workerObject, _WFInstance, uuid);

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

                var subprofileId = "";
                if (app.profile != undefined && app.profile.subprofileId != undefined) {
                    subprofileId = app.profile.subprofileId;
                }


                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.subProcessUUID = uuid;
                workerObject.subprofileId = subprofileId;
                workerObject.channels.push("follow");
                workerObject.channels.push("community_" + app.SCOPE.getCommunityId());
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

                    worker.setWorkerInfoInSubprocess(workerObject, _WFInstance, uuid);

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

                var subprofileId = "";
                if (app.profile != undefined && app.profile.subprofileId != undefined) {
                    subprofileId = app.profile.subprofileId;
                }

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.subProcessUUID = uuid;
                workerObject.subprofileId = subprofileId;
                workerObject.channels.push("follow");
                workerObject.channels.push("community_" + app.SCOPE.getCommunityId());
                var taxonomyUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq 'Taxonomy']/instances[1]/uuid", _WFInstance, {})[0];

                var action = {
                    "createTaxonomy": {
                        "taxonomyUUID": taxonomyUUID
                    }

                };

                workerObject.action = action;
                worker.send(workerObject).then(function(workerSuccess) {

                    worker.setWorkerInfoInSubprocess(workerObject, _WFInstance, uuid);

                    var success = util.success('Worker processes successfully.', workerSuccess);
                    resolve(success);

                }, function(workerFail) {
                    reject(workerFail);
                });
            });

        }

    }

})();

var performance = (function() {

    return {


        unlockPeriod: function(_def, uuid, _WFInstance) {

            return new Promise(function(resolve, reject) {

                var subprocessObject = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];

                // message from step : TODO 

                var entryUUID = JSON.xpath("/indicators[id eq '" + PERIOD_SET_ID + "']/instances/uuid", subprocessObject, {})[0];
                var enddate = subprocessObject.dates.valid;

                library.unlockPeriod(entryUUID, enddate, uuid).then(function(data) {

                    var success = util.success('Unlock period.', data);
                    resolve(success);



                }, function(error) {
                    reject(error);
                });






            });
        },

        setModelStatus: function(_def, uuid, _WFInstance) {

            return new Promise(function(resolve, reject) {


                var subprocessObject = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];
                var entryUUID = JSON.xpath("/indicators[id eq '" + PERIOD_SET_ID + "']/instances/uuid", subprocessObject, {})[0];
                var enddate = subprocessObject.dates.valid;

                var statusi18nLabel = JSON.xpath("/label", _def, {})[0];
                var status = helper.getLanguageMessage(statusi18nLabel);


                library.setPeriodStatus(entryUUID, enddate, status, uuid).then(function(data) {

                    var success = util.success('setModelStatus', data);
                    resolve(success);


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

                library.lockPerformanceModel(entryUUID, enddate, uuid).then(function(data) {

                    var success = util.success('Lock performance model.', data);
                    resolve(success);


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

                var subprofileId = "";
                if (app.profile != undefined && app.profile.subprofileId != undefined) {
                    subprofileId = app.profile.subprofileId;
                }

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.subProcessUUID = uuid;
                workerObject.subprofileId = subprofileId;
                workerObject.channels.push("follow");
                workerObject.channels.push("community_" + app.SCOPE.getCommunityId());
                var sdoUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq 'SDO']/instances[1]/uuid", _WFInstance, {})[0];

                var action = {
                    "createSDO": {
                        "sdoUUID": sdoUUID
                    }

                };

                workerObject.action = action;
                worker.send(workerObject).then(function(workerSuccess) {

                    worker.setWorkerInfoInSubprocess(workerObject, _WFInstance, uuid);

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

                var subprofileId = "";
                if (app.profile != undefined && app.profile.subprofileId != undefined) {
                    subprofileId = app.profile.subprofileId;
                }

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.subProcessUUID = uuid;
                workerObject.subprofileId = subprofileId;
                workerObject.channels.push("follow");
                workerObject.channels.push("community_" + app.SCOPE.getCommunityId());
                var taxonomyUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq 'Taxonomy']/instances[1]/uuid", _WFInstance, {})[0];

                var action = {
                    "createTaxonomy": {
                        "taxonomyUUID": taxonomyUUID
                    }

                };

                workerObject.action = action;
                worker.send(workerObject).then(function(workerSuccess) {

                    worker.setWorkerInfoInSubprocess(workerObject, _WFInstance, uuid);

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

        },

        setSPStatus: function(_def, uuid, dataValue, _WFInstance) {

            return new Promise(function(resolve, reject) {

                var spProcessObject = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", app.SCOPE.workflow, {})[0];
                spProcessObject.spStatus = dataValue;

                var itemsToProcess = 1;
                var stuff = [];
                var obj = {};

                obj.model = _WFInstance.subprocesses;
                stuff.push(obj);
                var success = util.success('Subprocess spStatus success.', _WFInstance.subprocesses);
                resolve(success);
            });

        },

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
                            var txnPacket = JSON.parse(JSON.stringify(app.SCOPE.txn));

                            dao.get(profileVariableFileName).then(function(file) {

                                var refPack = {};
                                var localProcess = function() {
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

                                        if (file[variableName] != undefined) {
                                            eval('file.' + variableName + '.push(obj)');
                                        } else {
                                            file[variableName] = [obj];
                                        }

                                    } else {
                                        file[variableName] = dataValue;
                                    }

                                    dao.upsert(file).then(function(data) {
                                        refPack.rev = data.rev;
                                        resolve("Variable set successfully");
                                    }).catch(function(error) {
                                        reject("Failed to set Variable");
                                    });
                                };


                                var found = false;
                                for (var i = 0; i < txnPacket.documents.length; i++) {
                                    if (profileVariableFileName == txnPacket.documents[i].document) {
                                        refPack =  txnPacket.documents[i];
                                        found = true;
                                    }
                                }

                                if (!found) {
                                    txnPacket.documents = [];
                                    refPack = { "document": profileVariableFileName, "rev": file._rev };
                                    txnPacket.documents.push(refPack);
                                    app.SCOPE.txn.documents.push(refPack);

                                    dao.updateTransaction(txnPacket).then(function(succ) {
                                        localProcess();
                                    }).catch(function(err) {
                                        console.log(err);
                                        if(err.responseJSON != undefined && err.responseJSON.message != undefined){
                                            reject(err.responseJSON.message);
                                        } else if(err.responseText != undefined) {
                                            reject(err.responseText);
                                        } else {
                                            reject(err);
                                        }
                                    });
                                } else {
                                    localProcess();
                                }




                            }).catch(function(error) {

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

                                dao.upsert(file).then(function(data) {
                                    resolve("Variable set successfully");
                                }).catch(function(error) {
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
                            //update trxn
                            var txnPacket = JSON.parse(JSON.stringify(app.SCOPE.txn));
                            dao.get(subProfileVariableFileName).then(function(file) {

                                ///
                                var refPack = {};
                                var localProcess = function() {
                                    if (variableType == 'periodic') {

                                        var part = library.getSubprofileSubprocessIds();
                                        var seq = JSON.xpath("count(/subprocesses[_id eq '" + uuid + "']/preceding-sibling::node()[id = /subprocesses[_id eq '" + uuid + "']/id and _id = /subprocesses[_id = " + part + "]/_id])", _WFInstance, {})[0] + 1;


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

                                        if (file[variableName] != undefined) {
                                            eval('file.' + variableName + '.push(obj)');
                                        } else {
                                            file[variableName] = [obj];
                                        }

                                    } else {
                                        file[variableName] = dataValue;
                                    }

                                    dao.upsert(file).then(function(data) {
                                        refPack.rev = data.rev;
                                        resolve("Variable at subprofile set successfully");
                                    }).catch(function(error) {
                                        reject("Failed to set Variable at subprofile");
                                    });
                                };


                                var found = false;
                                for (var i = 0; i < txnPacket.documents.length; i++) {
                                    if (subProfileVariableFileName == txnPacket.documents[i].document) {
                                        refPack =  txnPacket.documents[i];
                                        found = true;
                                    }
                                }

                                if (!found) {
                                    txnPacket.documents = [];
                                    refPack = { "document": subProfileVariableFileName, "rev": file._rev };
                                    txnPacket.documents.push(refPack);
                                    app.SCOPE.txn.documents.push(refPack);

                                    dao.updateTransaction(txnPacket).then(function(succ) {
                                        localProcess();
                                    }).catch(function(err) {
                                        console.log(err);
                                        if(err.responseJSON != undefined && err.responseJSON.message != undefined){
                                            reject(err.responseJSON.message);
                                        } else if(err.responseText != undefined) {
                                            reject(err.responseText);
                                        } else {
                                            reject(err);
                                        }
                                    });
                                } else {
                                    localProcess();
                                }




                            }).catch(function(error) {

                                var file = {
                                    "_id": subProfileVariableFileName
                                }
                                file.channels = app.profile.channels;

                                if (variableType == 'periodic') {
                                    //var processObj = JSON.xpath("/instance/processes[subProcesses/uuid eq '" + uuid + "']", _WFInstance, {})[0];
                                    //var seq = processObj.seq;

                                    //var seq = JSON.xpath("count(/subprocesses[_id eq '" + uuid + "']/preceding-sibling::node()[id = /subprocesses[_id eq '" + uuid + "']/id and id = /subprocesses[_id = /instance/processes/subProcesses[subprofileId eq '" + subProfileId + "']/uuid]/_id])", _WFInstance, {})[0] + 1;
                                    var part = library.getSubprofileSubprocessIds();
                                    var seq = JSON.xpath("count(/subprocesses[_id eq '" + uuid + "']/preceding-sibling::node()[id = /subprocesses[_id eq '" + uuid + "']/id and _id = /subprocesses[_id = " + part + "]/_id])", _WFInstance, {})[0] + 1;



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

                                dao.upsert(file).then(function(data) {
                                    resolve("Variable at subprofile set successfully");
                                }).catch(function(error) {
                                    reject("Failed to set Variable at subprofile");
                                });


                            });

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

var notification = (function() {

    return {

        sendNotificationWorker: function(notification, _WFInstance, uuid) {

            return new Promise(function(resolve, reject) {


                var getRecipients = function(notification) {

                    return new Promise(function(resolve, reject) {
                        var recipients = {};
                        if (notification.recipients.role != undefined) {

                            recipients.role = notification.recipients.role;
                            resolve(recipients);

                        } else if (notification.recipients.profileRole != undefined) {

                            recipients.profileRole = {};
                            recipients.profileRole.role = notification.recipients.profileRole.role;
                            recipients.profileRole.profile = notification.recipients.profileRole.profile;
                            resolve(recipients);

                        } else if (notification.recipients.subProfileRole != undefined) {

                            recipients.subProfileRole = {};
                            recipients.subProfileRole.role = notification.recipients.subProfileRole.role;
                            recipients.subProfileRole.subProfileCategory = notification.recipients.subProfileRole.subProfileCategory;
                            recipients.subProfileRole.profile = notification.recipients.subProfileRole.profile;
                            resolve(recipients);

                        } else if (notification.recipients.function != undefined) {

                            recipients.function = {};
                            recipients.function.users = {};

                            helper.getNodeValue(notification.recipients.function.users, _WFInstance, uuid).then(function(dataValue) {

                                recipients.function.users = dataValue;
                                resolve(recipients);

                            }, function(err) {
                                rej(err);
                            });
                        } else if (notification.recipients.stepAssignee != undefined) {

                            recipients.stepAssignee = {};
                            recipients.stepAssignee.role = notification.recipients.stepAssignee.role;
                            resolve(recipients);

                        }

                    });
                }

                var workerObject = new NotificatioWorker(app);


                var subProfileId = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/meta-data/subprofileId", _WFInstance, {})[0];

                var pathArray = window.location.pathname.split('/');
                var baseURL = window.location.protocol + "//" + window.location.host + "/" + pathArray[1];


                var subprofileId = "";
                if (app.profile != undefined && app.profile.subprofileId != undefined) {
                    subprofileId = app.profile.subprofileId;
                }


                var action = {
                    "notification": {
                        "message": {

                        },
                        "messageType": "",
                        "meta-data": {
                            "applicationId": _WFInstance.app,
                            "communityId": _WFInstance.communityId,
                            "profileId": _WFInstance.profile,
                            "subProcessUUID": uuid,
                            "subProfileId": subProfileId
                        },
                        "notificationType": "",
                        "subprofileId": subprofileId,
                        "priority": "",
                        "recipients": {

                        },
                        "url": baseURL,
                        "keys": {
                            "profile": {
                                "name": "",
                                "id": ""
                            },
                            "community": {
                                "name": "",
                                "id": ""
                            },
                            "application": {
                                "name": "",
                                "id": ""
                            },
                            "currentUser": {
                                "name": "",
                                "id": ""
                            },
                            "subProcess": {
                                "name": "",
                                "id": "",
                                "validDate": "",
                                "dueDate": ""
                            },
                            "notification": {
                                "createdDateTime": moment().format()
                            },
                            "step": {
                                "stepCreatedDateTime": "",
                                "stepName": "",
                                "stepId": ""
                            },
                            "node": {
                                "title": ""
                            }
                        }
                    }
                };

                /**
                * 
                Keys message 
                */




                var indicatorTitle = JSON.xpath("/indicators[_id eq '" + app.profile._id + "']/title", _WFInstance, {})[0];
                action.notification.keys.profile.name = indicatorTitle;

                action.notification.keys.profile.id = app.profile._id;

                action.notification.keys.community.name = app.getNameByLang(LOCAL_SETTINGS.COMMUNITY_CONFIG.communityName);
                action.notification.keys.community.id = LOCAL_SETTINGS.COMMUNITY_CONFIG.communityId;

                var application = JSON.xpath("/applications[appId eq '" + app.SCOPE.applicationId + "']", LOCAL_SETTINGS.COMMUNITY_CONFIG, {})[0];

                action.notification.keys.application.name = app.getNameByLang(application.name);
                action.notification.keys.application.id = application.appId;

                action.notification.keys.currentUser.name = LOCAL_SETTINGS.SESSION.firstName + " " + LOCAL_SETTINGS.SESSION.lastName;
                action.notification.keys.currentUser.id = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;

                var subProcessObject = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];

                action.notification.keys.subProcess.name = subProcessObject.label;
                action.notification.keys.subProcess.id = uuid;
                action.notification.keys.subProcess.validDate = subProcessObject.dates.valid;
                action.notification.keys.subProcess.dueDate = subProcessObject.dates.due;

                var stepObject = subProcessObject.step;
                action.notification.keys.step.stepCreatedDateTime = stepObject.dateTimeCreated;
                action.notification.keys.step.stepId = stepObject.id;

                var stepConfigObject = JSON.xpath("/processes/subProcesses[_id eq '" + subProcessObject.id + "']/steps[_id eq '" + stepObject.id + "']", app.SCOPE.workflow.config, {})[0];
                action.notification.keys.step.stepName = app.getNameByLang(stepConfigObject.name);

                var nodeTitle = JSON.xpath("/indicators[_id eq '" + subprofileId + "']/title", app.SCOPE.workflow, {})[0];
                if (nodeTitle == undefined) {
                    action.notification.keys.node.title = "";
                } else {
                    action.notification.keys.node.title = nodeTitle;
                }
                /**
                * 
                Worker message 
                */
                action.notification.message.default = notification.message.default;
                action.notification.message.title = notification.message.title;

                if (notification.message.rtf != undefined) {
                    action.notification.message.rtf = {};
                    if (notification.message.rtf.template != undefined) {
                        action.notification.message.rtf.template = notification.message.rtf.template;
                    } else if (notification.message.rtf.markup != undefined) {
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

                if (notification.notificationAction != undefined) {

                    action.notification.notificationAction = {};
                    action.notification.notificationAction.label = notification.notificationAction.label;
                    if (notification.notificationAction.action.URI != undefined) {

                        action.notification.notificationAction.action = {};
                        action.notification.notificationAction.action.URI = notification.notificationAction.action.URI;

                    } else if (notification.notificationAction.action.goto != undefined) {

                        action.notification.notificationAction.action = {};
                        action.notification.notificationAction.action.goto = notification.notificationAction.action.goto;

                    }
                }

                if (notification.schedule != undefined) {

                    var executeObject = notification.schedule.executeCommand;

                    var workerSchedule = {
                        dateTime: "",
                        unit: "",
                        factor: ""
                    }

                    if (executeObject.now != undefined) {

                        workerSchedule.dateTime = moment().format();


                    } else if (executeObject.exact != undefined) {

                        workerSchedule.dateTime = executeObject.exact.dateTime;

                    } else if (executeObject.dueDate != undefined) {

                        var subProcessObject = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];
                        var calculatedDateTime = "";
                        var dueDate = subProcessObject.dates.due;

                        if (dueDate != "") {
                            calculatedDateTime = moment(dueDate, "YYYY-MM-DD");
                        } else {
                            calculatedDateTime = moment().format();
                        }

                        workerSchedule.dateTime = calculatedDateTime;
                        workerSchedule.factor = executeObject.dueDate.factor;
                        workerSchedule.unit = executeObject.dueDate.unit;

                    } else if (executeObject.validDate != undefined) {

                        var subProcessObject = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];
                        var calculatedDateTime = "";
                        var dueDate = subProcessObject.dates.valid;

                        if (validDate != "") {
                            calculatedDateTime = moment(validDate, "YYYY-MM-DD");
                        } else {
                            calculatedDateTime = moment().format();
                        }

                        workerSchedule.dateTime = calculatedDateTime;
                        workerSchedule.factor = executeObject.validDate.factor;
                        workerSchedule.unit = executeObject.validDate.unit;

                    } else if (executeObject.stepCreatedDate != undefined) {

                        var subProcessObject = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];
                        var calculatedDateTime = "";
                        var stepCreatedDateTime = subProcessObject.step.dueDateTime;

                        if (stepCreatedDateTime != "") {
                            calculatedDateTime = moment(stepCreatedDateTime).format();
                        } else {
                            calculatedDateTime = moment().format();
                        }

                        workerSchedule.dateTime = calculatedDateTime;
                        workerSchedule.factor = executeObject.stepCreatedDate.factor;
                        workerSchedule.unit = executeObject.stepCreatedDate.unit;


                    } else {

                        workerSchedule.dateTime = moment().format();

                    }

                    workerObject.setSchedule(workerSchedule);

                }

                /**
                * 
                Worker recipients
                */

                getRecipients(notification).then(function(recipient) {
                    action.notification.recipients = recipient;
                    workerObject.setMessage("The server is processing your request. Please wait a few seconds and then click the refresh button.");
                    workerObject.setAction(action);
                    var subProcessObject = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];
                    workerObject.setContext({
                        step: {
                            stepDateTime: subProcessObject.step.dateTimeCreated
                        }
                    });
                    workerObject.send().then(function(workerSuccess) {
                        console.log(workerObject);
                        var success = util.success('Notification Worker processes successfully.', workerSuccess);
                        resolve(success);

                    }, function(workerFail) {
                        resolve(workerFail);
                    });


                }).catch(function(err) {

                    console.log("Notification - getRecipients failed with error " + err);
                    reject(err);


                });

            });

        },


        reAssignmentNotification: function(notification, _WFInstance, uuid, user) {

            return new Promise(function(resolve, reject) {


                var getRecipients = function(userObj) {

                    return new Promise(function(resolve, reject) {
                        var recipients = {};
                        recipients.function = {};
                        recipients.function.users = {};
                        recipients.function.users = userObj.id;
                        resolve(recipients);
                    });
                }


                var workerObject = new NotificatioWorker(app);

                var subProfileId = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/meta-data/subprofileId", _WFInstance, {})[0];
                var pathArray = window.location.pathname.split('/');
                var baseURL = window.location.protocol + "//" + window.location.host + "/" + pathArray[1];


                var action = {
                    "notification": {
                        "message": {
                            "rtf": {

                            }
                        },
                        "messageType": "",
                        "meta-data": {
                            "applicationId": _WFInstance.app,
                            "communityId": _WFInstance.communityId,
                            "profileId": _WFInstance.profile,
                            "subProcessUUID": uuid,
                            "subProfileId": subProfileId
                        },
                        "notificationType": "workflow",
                        "priority": "",
                        "recipients": {

                        },
                        "url": baseURL,
                        "keys": {
                            "profile": {
                                "name": "",
                                "id": ""
                            },
                            "community": {
                                "name": "",
                                "id": ""
                            },
                            "application": {
                                "name": "",
                                "id": ""
                            },
                            "currentUser": {
                                "name": "",
                                "id": ""
                            },
                            "subProcess": {
                                "name": "",
                                "id": "",
                                "validDate": "",
                                "dueDate": ""
                            },
                            "notification": {
                                "createdDateTime": moment().format()
                            },
                            "step": {
                                "stepCreatedDateTime": "",
                                "stepName": "",
                                "stepId": ""
                            },
                            "node": {
                                "title": ""
                            }
                        }
                    }
                };

                /**
                * 
                Keys message 
                */

                var indicatorTitle = JSON.xpath("/indicators[_id eq '" + app.profile._id + "']/title", _WFInstance, {})[0];
                action.notification.keys.profile.name = indicatorTitle;
                action.notification.keys.profile.id = app.profile._id;

                action.notification.keys.community.name = app.getNameByLang(LOCAL_SETTINGS.COMMUNITY_CONFIG.communityName);
                action.notification.keys.community.id = LOCAL_SETTINGS.COMMUNITY_CONFIG.communityId;

                var application = JSON.xpath("/applications[appId eq '" + app.SCOPE.applicationId + "']", LOCAL_SETTINGS.COMMUNITY_CONFIG, {})[0];

                action.notification.keys.application.name = app.getNameByLang(application.name);
                action.notification.keys.application.id = application.appId;

                action.notification.keys.currentUser.name = LOCAL_SETTINGS.SESSION.firstName + " " + LOCAL_SETTINGS.SESSION.lastName;
                action.notification.keys.currentUser.id = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;


                action.notification.keys.subProcess.name = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/label", _WFInstance, {})[0];
                action.notification.keys.subProcess.id = uuid;

                action.notification.keys.subProcess.validDate = subProcessObject.dates.valid;
                action.notification.keys.subProcess.dueDate = subProcessObject.dates.due;

                var stepObject = subProcessObject.step;
                action.notification.keys.step.stepCreatedDateTime = stepObject.dateTimeCreated;
                action.notification.keys.step.stepId = stepObject.id;

                var stepConfigObject = JSON.xpath("/processes/subProcesses[_id eq '" + subProcessObject.id + "']/steps[_id eq '" + stepObject.id + "']", app.SCOPE.workflow.config, {})[0];
                action.notification.keys.step.stepName = app.getNameByLang(stepConfigObject.name);

                var nodeTitle = JSON.xpath("/indicators[_id eq '" + subprofileId + "']/title", app.SCOPE.workflow, {})[0];
                if (nodeTitle == undefined) {
                    action.notification.keys.node.title = "";
                } else {
                    action.notification.keys.node.title = nodeTitle;
                }

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

                if (notification.reAssignment.notificationAction != undefined) {

                    action.notification.notificationAction = {};
                    action.notification.notificationAction.label = notification.reAssignment.notificationAction.label;
                    if (notification.reAssignment.notificationAction.action.URI != undefined) {

                        action.notification.notificationAction.action = {};
                        action.notification.notificationAction.action.URI = notification.reAssignment.notificationAction.action.URI;

                    } else if (notification.reAssignment.notificationAction.action.goto != undefined) {

                        action.notification.notificationAction.action = {};
                        action.notification.notificationAction.action.goto = notification.reAssignment.notificationAction.action.goto;

                    }
                }


                if (notification.reAssignment.schedule != undefined) {

                    var executeObject = notification.reAssignment.schedule.executeCommand;

                    var workerSchedule = {
                        dateTime: "",
                        unit: "",
                        factor: ""
                    }

                    if (executeObject.now != undefined) {

                        workerSchedule.dateTime = moment().format();


                    } else if (executeObject.exact != undefined) {

                        workerSchedule.dateTime = executeObject.exact.dateTime;

                    } else if (executeObject.dueDate != undefined) {

                        var subProcessObject = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];
                        var calculatedDateTime = "";
                        var dueDate = subProcessObject.dates.due;

                        if (dueDate != "") {
                            calculatedDateTime = moment(dueDate, "YYYY-MM-DD");
                        } else {
                            calculatedDateTime = moment().format();
                        }

                        workerSchedule.dateTime = calculatedDateTime;
                        workerSchedule.factor = executeObject.dueDate.factor;
                        workerSchedule.unit = executeObject.dueDate.unit;

                    } else if (executeObject.validDate != undefined) {

                        var subProcessObject = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];
                        var calculatedDateTime = "";
                        var dueDate = subProcessObject.dates.valid;

                        if (validDate != "") {
                            calculatedDateTime = moment(validDate, "YYYY-MM-DD");
                        } else {
                            calculatedDateTime = moment().format();
                        }

                        workerSchedule.dateTime = calculatedDateTime;
                        workerSchedule.factor = executeObject.validDate.factor;
                        workerSchedule.unit = executeObject.validDate.unit;

                    } else if (executeObject.stepCreatedDate != undefined) {

                        var subProcessObject = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];
                        var calculatedDateTime = "";
                        var stepCreatedDateTime = subProcessObject.step.dueDateTime;

                        if (stepCreatedDateTime != "") {
                            calculatedDateTime = moment(stepCreatedDateTime).format();
                        } else {
                            calculatedDateTime = moment().format();
                        }

                        workerSchedule.dateTime = calculatedDateTime;
                        workerSchedule.factor = executeObject.stepCreatedDate.factor;
                        workerSchedule.unit = executeObject.stepCreatedDate.unit;


                    } else {

                        workerSchedule.dateTime = moment().format();

                    }

                    workerObject.setSchedule(workerSchedule);

                }
                /**
                * 
                Worker recipients
                */

                getRecipients(user).then(function(recipient) {
                    action.notification.recipients = recipient;
                    workerObject.setAction(action);
                    workerObject.setMessage("The server is processing your request. Please wait a few seconds and then click the refresh button.");
                    workerObject.send().then(function(workerSuccess) {

                        var success = util.success('Notification Worker processes successfully for reassignment.', workerSuccess);
                        resolve(success);

                    }, function(workerFail) {
                        resolve(workerFail);
                    });


                }).catch(function(err) {

                    console.log("Notification - getRecipients failed with error " + err);
                    reject(err);


                });

            });

        },

        assignmentNotification: function(notification, _WFInstance, uuid, user) {

            return new Promise(function(resolve, reject) {


                var getRecipients = function(userObj) {

                    return new Promise(function(resolve, reject) {
                        var recipients = {};
                        recipients.function = {};
                        recipients.function.users = {};
                        recipients.function.users = userObj.id;
                        resolve(recipients);
                    });
                }

                var workerObject = new NotificatioWorker(app);


                var subProfileId = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/meta-data/subprofileId", _WFInstance, {})[0];

                var pathArray = window.location.pathname.split('/');
                var baseURL = window.location.protocol + "//" + window.location.host + "/" + pathArray[1];


                var action = {
                    "notification": {
                        "message": {
                            "rtf": {

                            }
                        },
                        "messageType": "",
                        "meta-data": {
                            "applicationId": _WFInstance.app,
                            "communityId": _WFInstance.communityId,
                            "profileId": _WFInstance.profile,
                            "subProcessUUID": uuid,
                            "subProfileId": subProfileId
                        },
                        "notificationType": "workflow",
                        "priority": "",
                        "recipients": {

                        },
                        "url": baseURL,
                        "keys": {
                            "profile": {
                                "name": "",
                                "id": ""
                            },
                            "community": {
                                "name": "",
                                "id": ""
                            },
                            "application": {
                                "name": "",
                                "id": ""
                            },
                            "currentUser": {
                                "name": "",
                                "id": ""
                            },
                            "subProcess": {
                                "name": "",
                                "id": "",
                                "validDate": "",
                                "dueDate": ""
                            },
                            "notification": {
                                "createdDateTime": moment().format()
                            },
                            "step": {
                                "stepCreatedDateTime": "",
                                "stepName": "",
                                "stepId": ""
                            },
                            "node": {
                                "title": ""
                            }
                        }
                    }
                };

                /**
                * 
                Keys message 
                */

                var indicatorTitle = JSON.xpath("/indicators[_id eq '" + app.profile._id + "']/title", _WFInstance, {})[0];
                action.notification.keys.profile.name = indicatorTitle;
                action.notification.keys.profile.id = app.profile._id;

                action.notification.keys.community.name = app.getNameByLang(LOCAL_SETTINGS.COMMUNITY_CONFIG.communityName);
                action.notification.keys.community.id = LOCAL_SETTINGS.COMMUNITY_CONFIG.communityId;

                var application = JSON.xpath("/applications[appId eq '" + app.SCOPE.applicationId + "']", LOCAL_SETTINGS.COMMUNITY_CONFIG, {})[0];

                action.notification.keys.application.name = app.getNameByLang(application.name);
                action.notification.keys.application.id = application.appId;

                action.notification.keys.currentUser.name = LOCAL_SETTINGS.SESSION.firstName + " " + LOCAL_SETTINGS.SESSION.lastName;
                action.notification.keys.currentUser.id = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;


                action.notification.keys.subProcess.name = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/label", _WFInstance, {})[0];
                action.notification.keys.subProcess.id = uuid;

                action.notification.keys.subProcess.validDate = subProcessObject.dates.valid;
                action.notification.keys.subProcess.dueDate = subProcessObject.dates.due;

                var stepObject = subProcessObject.step;
                action.notification.keys.step.stepCreatedDateTime = stepObject.dateTimeCreated;
                action.notification.keys.step.stepId = stepObject.id;

                var stepConfigObject = JSON.xpath("/processes/subProcesses[_id eq '" + subProcessObject.id + "']/steps[_id eq '" + stepObject.id + "']", app.SCOPE.workflow.config, {})[0];
                action.notification.keys.step.stepName = app.getNameByLang(stepConfigObject.name);

                var nodeTitle = JSON.xpath("/indicators[_id eq '" + subprofileId + "']/title", app.SCOPE.workflow, {})[0];
                if (nodeTitle == undefined) {
                    action.notification.keys.node.title = "";
                } else {
                    action.notification.keys.node.title = nodeTitle;
                }

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

                if (notification.assignment.notificationAction != undefined) {

                    action.notification.notificationAction = {};
                    action.notification.notificationAction.label = notification.assignment.notificationAction.label;
                    if (notification.assignment.notificationAction.action.URI != undefined) {

                        action.notification.notificationAction.action = {};
                        action.notification.notificationAction.action.URI = notification.assignment.notificationAction.action.URI;

                    } else if (notification.assignment.notificationAction.action.goto != undefined) {

                        action.notification.notificationAction.action = {};
                        action.notification.notificationAction.action.goto = notification.assignment.notificationAction.action.goto;

                    }
                }

                if (notification.assignment.schedule != undefined) {

                    var executeObject = notification.assignment.schedule.executeCommand;

                    var workerSchedule = {
                        dateTime: "",
                        unit: "",
                        factor: ""
                    }

                    if (executeObject.now != undefined) {

                        workerSchedule.dateTime = moment().format();


                    } else if (executeObject.exact != undefined) {

                        workerSchedule.dateTime = executeObject.exact.dateTime;

                    } else if (executeObject.dueDate != undefined) {

                        var subProcessObject = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];
                        var calculatedDateTime = "";
                        var dueDate = subProcessObject.dates.due;

                        if (dueDate != "") {
                            calculatedDateTime = moment(dueDate, "YYYY-MM-DD");
                        } else {
                            calculatedDateTime = moment().format();
                        }

                        workerSchedule.dateTime = calculatedDateTime;
                        workerSchedule.factor = executeObject.dueDate.factor;
                        workerSchedule.unit = executeObject.dueDate.unit;

                    } else if (executeObject.validDate != undefined) {

                        var subProcessObject = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];
                        var calculatedDateTime = "";
                        var dueDate = subProcessObject.dates.valid;

                        if (validDate != "") {
                            calculatedDateTime = moment(validDate, "YYYY-MM-DD");
                        } else {
                            calculatedDateTime = moment().format();
                        }

                        workerSchedule.dateTime = calculatedDateTime;
                        workerSchedule.factor = executeObject.validDate.factor;
                        workerSchedule.unit = executeObject.validDate.unit;

                    } else if (executeObject.stepCreatedDate != undefined) {

                        var subProcessObject = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];
                        var calculatedDateTime = "";
                        var stepCreatedDateTime = subProcessObject.step.dueDateTime;

                        if (stepCreatedDateTime != "") {
                            calculatedDateTime = moment(stepCreatedDateTime).format();
                        } else {
                            calculatedDateTime = moment().format();
                        }

                        workerSchedule.dateTime = calculatedDateTime;
                        workerSchedule.factor = executeObject.stepCreatedDate.factor;
                        workerSchedule.unit = executeObject.stepCreatedDate.unit;


                    } else {

                        workerSchedule.dateTime = moment().format();

                    }

                    workerObject.setSchedule(workerSchedule);

                }

                /**
                * 
                Worker recipients
                */

                getRecipients(user).then(function(recipient) {
                    action.notification.recipients = recipient;
                    workerObject.setAction(action);
                    workerObject.setMessage("The server is processing your request. Please wait a few seconds and then click the refresh button.");
                    workerObject.send().then(function(workerSuccess) {
                        console.log(workerObject);
                        var success = util.success('Notification Worker processes successfully for assignment.', workerSuccess);
                        resolve(success);

                    }, function(workerFail) {
                        resolve(workerFail);
                    });


                }).catch(function(err) {

                    console.log("Notification - getRecipients failed with error " + err);
                    reject(err);


                });

            });

        },

        acceptanceNotification: function(notification, _WFInstance, uuid, role) {

            return new Promise(function(resolve, reject) {


                var getRoles = function(role) {

                    return new Promise(function(resolve, reject) {
                        var recipients = {};
                        recipients.role = role;
                        resolve(recipients);
                    });
                }

                var workerObject = new NotificatioWorker(app);


                var subProfileId = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/meta-data/subprofileId", _WFInstance, {})[0];

                var pathArray = window.location.pathname.split('/');
                var baseURL = window.location.protocol + "//" + window.location.host + "/" + pathArray[1];


                var action = {
                    "notification": {
                        "message": {
                            "rtf": {

                            }
                        },
                        "messageType": "",
                        "meta-data": {
                            "applicationId": _WFInstance.app,
                            "communityId": _WFInstance.communityId,
                            "profileId": _WFInstance.profile,
                            "subProcessUUID": uuid,
                            "subProfileId": subProfileId
                        },
                        "notificationType": "workflow",
                        "priority": "",
                        "recipients": {

                        },
                        "url": baseURL,
                        "keys": {
                            "profile": {
                                "name": "",
                                "id": ""
                            },
                            "community": {
                                "name": "",
                                "id": ""
                            },
                            "application": {
                                "name": "",
                                "id": ""
                            },
                            "currentUser": {
                                "name": "",
                                "id": ""
                            },
                            "subProcess": {
                                "name": "",
                                "id": "",
                                "validDate": "",
                                "dueDate": ""
                            },
                            "notification": {
                                "createdDateTime": moment().format()
                            },
                            "step": {
                                "stepCreatedDateTime": "",
                                "stepName": "",
                                "stepId": ""
                            },
                            "node": {
                                "title": ""
                            }
                        }
                    }
                };

                /**
                * 
                Keys message 
                */

                var indicatorTitle = JSON.xpath("/indicators[_id eq '" + app.profile._id + "']/title", _WFInstance, {})[0];
                action.notification.keys.profile.name = indicatorTitle;
                action.notification.keys.profile.id = app.profile._id;

                action.notification.keys.community.name = app.getNameByLang(LOCAL_SETTINGS.COMMUNITY_CONFIG.communityName);
                action.notification.keys.community.id = LOCAL_SETTINGS.COMMUNITY_CONFIG.communityId;

                var application = JSON.xpath("/applications[appId eq '" + app.SCOPE.applicationId + "']", LOCAL_SETTINGS.COMMUNITY_CONFIG, {})[0];

                action.notification.keys.application.name = app.getNameByLang(application.name);
                action.notification.keys.application.id = application.appId;

                action.notification.keys.currentUser.name = LOCAL_SETTINGS.SESSION.firstName + " " + LOCAL_SETTINGS.SESSION.lastName;
                action.notification.keys.currentUser.id = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;


                action.notification.keys.subProcess.name = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/label", _WFInstance, {})[0];
                action.notification.keys.subProcess.id = uuid;

                action.notification.keys.subProcess.validDate = subProcessObject.dates.valid;
                action.notification.keys.subProcess.dueDate = subProcessObject.dates.due;

                var stepObject = subProcessObject.step;
                action.notification.keys.step.stepCreatedDateTime = stepObject.dateTimeCreated;
                action.notification.keys.step.stepId = stepObject.id;

                var stepConfigObject = JSON.xpath("/processes/subProcesses[_id eq '" + subProcessObject.id + "']/steps[_id eq '" + stepObject.id + "']", app.SCOPE.workflow.config, {})[0];
                action.notification.keys.step.stepName = app.getNameByLang(stepConfigObject.name);

                var nodeTitle = JSON.xpath("/indicators[_id eq '" + subprofileId + "']/title", app.SCOPE.workflow, {})[0];
                if (nodeTitle == undefined) {
                    action.notification.keys.node.title = "";
                } else {
                    action.notification.keys.node.title = nodeTitle;
                }

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

                if (notification.assignmentAcceptance.notificationAction != undefined) {

                    action.notification.notificationAction = {};
                    action.notification.notificationAction.label = notification.assignmentAcceptance.notificationAction.label;
                    if (notification.assignmentAcceptance.notificationAction.action.URI != undefined) {

                        action.notification.notificationAction.action = {};
                        action.notification.notificationAction.action.URI = notification.assignmentAcceptance.notificationAction.action.URI;

                    } else if (notification.assignmentAcceptance.notificationAction.action.goto != undefined) {

                        action.notification.notificationAction.action = {};
                        action.notification.notificationAction.action.goto = notification.assignmentAcceptance.notificationAction.action.goto;

                    }
                }

                if (notification.assignmentAcceptance.schedule != undefined) {

                    var executeObject = notification.assignmentAcceptance.schedule.executeCommand;

                    var workerSchedule = {
                        dateTime: "",
                        unit: "",
                        factor: ""
                    }

                    if (executeObject.now != undefined) {

                        workerSchedule.dateTime = moment().format();


                    } else if (executeObject.exact != undefined) {

                        workerSchedule.dateTime = executeObject.exact.dateTime;

                    } else if (executeObject.dueDate != undefined) {

                        var subProcessObject = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];
                        var calculatedDateTime = "";
                        var dueDate = subProcessObject.dates.due;

                        if (dueDate != "") {
                            calculatedDateTime = moment(dueDate, "YYYY-MM-DD");
                        } else {
                            calculatedDateTime = moment().format();
                        }

                        workerSchedule.dateTime = calculatedDateTime;
                        workerSchedule.factor = executeObject.dueDate.factor;
                        workerSchedule.unit = executeObject.dueDate.unit;

                    } else if (executeObject.validDate != undefined) {

                        var subProcessObject = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];
                        var calculatedDateTime = "";
                        var dueDate = subProcessObject.dates.valid;

                        if (validDate != "") {
                            calculatedDateTime = moment(validDate, "YYYY-MM-DD");
                        } else {
                            calculatedDateTime = moment().format();
                        }

                        workerSchedule.dateTime = calculatedDateTime;
                        workerSchedule.factor = executeObject.validDate.factor;
                        workerSchedule.unit = executeObject.validDate.unit;

                    } else if (executeObject.stepCreatedDate != undefined) {

                        var subProcessObject = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];
                        var calculatedDateTime = "";
                        var stepCreatedDateTime = subProcessObject.step.dueDateTime;

                        if (stepCreatedDateTime != "") {
                            calculatedDateTime = moment(stepCreatedDateTime).format();
                        } else {
                            calculatedDateTime = moment().format();
                        }

                        workerSchedule.dateTime = calculatedDateTime;
                        workerSchedule.factor = executeObject.stepCreatedDate.factor;
                        workerSchedule.unit = executeObject.stepCreatedDate.unit;


                    } else {

                        workerSchedule.dateTime = moment().format();

                    }

                    workerObject.setSchedule(workerSchedule);

                }

                /**
                * 
                Worker recipients
                */

                getRoles(role).then(function(recipient) {
                    action.notification.recipients = recipient;
                    workerObject.setAction(action);
                    workerObject.setMessage("The server is processing your request. Please wait a few seconds and then click the refresh button.");
                    workerObject.setContext({
                        process: {

                        }
                    });
                    workerObject.send(workerObject).then(function(workerSuccess) {
                        console.log(workerObject);
                        var success = util.success('Notification Worker processes successfully for assignment.', workerSuccess);
                        resolve(success);

                    }, function(workerFail) {
                        resolve(workerFail);
                    });


                }).catch(function(err) {

                    console.log("Notification - getRecipients failed with error " + err);
                    reject(err);


                });

            });

        }


    }

})();


var report = (function() {

    return {




        createPerformanceReport: function(performanceReportObject, _WFInstance, uuid) {

            return new Promise(function(resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                var subprofileId = "";
                if (app.profile != undefined && app.profile.subprofileId != undefined) {
                    subprofileId = app.profile.subprofileId;
                }

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.subProcessUUID = uuid;
                workerObject.subprofileId = subprofileId;
                workerObject.channels.push("createPerformanceReport");
                workerObject.channels.push("community_" + app.SCOPE.getCommunityId());
                var workplanSetId = performanceReportObject.workplanSetId;
                var configSetId = performanceReportObject.configSetId;


                // workplanSetId scope is profile
                // configSetId scope is subprocesses

                var workplanUUID = JSON.xpath("/indicators[category/term eq '" + workplanSetId + "']/_id", app.SCOPE.workflow, {})[0];
                var configUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + configSetId + "']/instances[1]/uuid", _WFInstance, {})[0];


                var action = {
                    "createPerformanceReport": {
                        "workplanUUID": workplanUUID,
                        "configUUID": configUUID,
                        "profilId": _WFInstance.profile
                    }
                };

                workerObject.action = action;
                worker.send(workerObject).then(function(workerSuccess) {

                    worker.setWorkerInfoInSubprocess(workerObject, _WFInstance, uuid);

                    var success = util.success('WorkplanReport Worker processed successfully.', workerSuccess);
                    resolve(success);

                }, function(workerFail) {
                    reject(workerFail);
                });
            });

        },

        createReport: function(createReport, _WFInstance, uuid) {

            return new Promise(function(resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                var subprofileId = "";
                if (app.profile != undefined && app.profile.subprofileId != undefined) {
                    subprofileId = app.profile.subprofileId;
                }

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.subProcessUUID = uuid;
                workerObject.subprofileId = subprofileId;
                workerObject.channels.push("executeReport");
                workerObject.channels.push("community_" + app.SCOPE.getCommunityId());

                var performanceReportDefinitionSetId = createReport.PerformanceReportDefinitionSetId;
                var reportingSDOSetId = createReport.reportingSDOSetId;

                var performanceReportDefinition = JSON.xpath("/indicators[category/term eq '" + performanceReportDefinitionSetId + "']/_id", _WFInstance, {})[0];
                var reportingSDO = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + reportingSDOSetId + "']/instances[1]/uuid", _WFInstance, {})[0];


                var action = {
                    "createReport": {
                        "performanceReportDefinition": performanceReportDefinition,
                        "reportingSDO": reportingSDO,
                        "profilId": _WFInstance.profile
                    }
                };

                workerObject.action = action;
                worker.send(workerObject).then(function(workerSuccess) {

                    worker.setWorkerInfoInSubprocess(workerObject, _WFInstance, uuid);

                    var success = util.success('Reprot Worker processed successfully.', workerSuccess);
                    resolve(success);

                }, function(workerFail) {
                    reject(workerFail);
                });
            });

        },




        sdoReport: function(sdoReport, _WFInstance, uuid) {

            return new Promise(function(resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                var subprofileId = "";
                if (app.profile != undefined && app.profile.subprofileId != undefined) {
                    subprofileId = app.profile.subprofileId;
                }

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.subProcessUUID = uuid;
                workerObject.subprofileId = subprofileId;
                workerObject.channels.push("sdoReport");
                workerObject.channels.push("community_" + app.SCOPE.getCommunityId());

                var setId = sdoReport.indicatorSetId;
                var sdoReportUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + setId + "']/instances[1]/uuid", _WFInstance, {})[0];


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
                worker.send(workerObject).then(function(workerSuccess) {

                    worker.setWorkerInfoInSubprocess(workerObject, _WFInstance, uuid);

                    var success = util.success('report Worker processed successfully.', workerSuccess);
                    resolve(success);

                }, function(workerFail) {
                    reject(workerFail);
                });
            });

        },

        executeReport: function(executeReport, _WFInstance, uuid) {

            return new Promise(function(resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                var subprofileId = "";
                if (app.profile != undefined && app.profile.subprofileId != undefined) {
                    subprofileId = app.profile.subprofileId;
                }

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.subProcessUUID = uuid;
                workerObject.subprofileId = subprofileId;
                workerObject.channels.push("executeReport");
                workerObject.channels.push("community_" + app.SCOPE.getCommunityId());



                var SDOreportSetId = executeReport.SDOreportSetId;
                var reportingSDOSetid = executeReport.reportingSDOSetid;


                var SDOreportUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + SDOreportSetId + "']/instances[1]/uuid", _WFInstance, {})[0];
                var reportingSDOUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + reportingSDOSetid + "']/instances[1]/uuid", _WFInstance, {})[0];

                if (SDOreportUUID == undefined) {
                    SDOreportUUID = JSON.xpath("/indicators[category/term eq '" + SDOreportSetId + "']/_id", _WFInstance, {})[0];
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
                worker.send(workerObject).then(function(workerSuccess) {

                    worker.setWorkerInfoInSubprocess(workerObject, _WFInstance, uuid);

                    var success = util.success('report Worker processed successfully.', workerSuccess);
                    resolve(success);

                }, function(workerFail) {
                    reject(workerFail);
                });
            });

        },

        generateView: function(generateView, _WFInstance, uuid) {

            return new Promise(function(resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                var subprofileId = "";
                if (app.profile != undefined && app.profile.subprofileId != undefined) {
                    subprofileId = app.profile.subprofileId;
                }

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.subProcessUUID = uuid;
                workerObject.subprofileId = subprofileId;
                workerObject.channels.push("sdoReport");
                workerObject.channels.push("community_" + app.SCOPE.getCommunityId());
                var ViewConfigSetId = generateView.ViewConfigSetId;
                var ViewConfigUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + ViewConfigSetId + "']/instances[1]/uuid", _WFInstance, {})[0];


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
                worker.send(workerObject).then(function(workerSuccess) {

                    worker.setWorkerInfoInSubprocess(workerObject, _WFInstance, uuid);

                    var success = util.success('report Worker processed successfully.', workerSuccess);
                    resolve(success);

                }, function(workerFail) {
                    reject(workerFail);
                });
            });

        },

        requestReport: function(requestReport, _WFInstance, uuid) {

            return new Promise(function(resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                var subprofileId = "";
                if (app.profile != undefined && app.profile.subprofileId != undefined) {
                    subprofileId = app.profile.subprofileId;
                }

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.subProcessUUID = uuid;
                workerObject.subprofileId = subprofileId;
                workerObject.channels.push("executeReport");
                workerObject.channels.push("community_" + app.SCOPE.getCommunityId());

                var sdoRequestReportSetId = requestReport.sdoRequestReportSetId;
                var sdoReportCreationSetId = requestReport.sdoReportCreationSetId;
                var performanceReportSetId = requestReport.performanceReportSetId;
                var sdoRequestReportUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + sdoRequestReportSetId + "']/instances[1]/uuid", _WFInstance, {})[0];
                var sdoReportCreationUUID = JSON.xpath("/indicators[category/term eq '" + sdoReportCreationSetId + "']/_id", _WFInstance, {})[0];
                var performanceReportUUID = JSON.xpath("/indicators[category/term eq '" + performanceReportSetId + "']/_id", _WFInstance, {})[0];

                var action = {
                    "requestReport": {
                        "performanceReportUUID": performanceReportUUID,
                        "sdoRequestReportUUID": sdoRequestReportUUID,
                        "sdoReportCreationUUID": sdoReportCreationUUID,
                        "applicationId": app.SCOPE.applicationId,
                        "communityId": app.SCOPE.getCommunityId(),
                        "profileId": app.SCOPE.workflow.profile,
                        "subProcessUUID": uuid
                    }
                };

                workerObject.action = action;
                worker.send(workerObject).then(function(workerSuccess) {

                    worker.setWorkerInfoInSubprocess(workerObject, _WFInstance, uuid);

                    var success = util.success('Request report Worker processed successfully.', workerSuccess);
                    resolve(success);

                }, function(workerFail) {
                    reject(workerFail);
                });
            });

        },


        generateBasicView: function(generateBasicView, _WFInstance, uuid) {

            return new Promise(function(resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                var subprofileId = "";
                if (app.profile != undefined && app.profile.subprofileId != undefined) {
                    subprofileId = app.profile.subprofileId;
                }

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.subProcessUUID = uuid;
                workerObject.subprofileId = subprofileId;
                workerObject.channels.push("sdoReport");
                workerObject.channels.push("community_" + app.SCOPE.getCommunityId());

                var sdoDataObjectViewSetId = generateBasicView.sdoDataObjectViewSetId;
                var sdoDataObjectViewUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + sdoDataObjectViewSetId + "']/instances[1]/uuid", _WFInstance, {})[0];


                var action = {
                    "generateBasicView": {
                        "sdoDataObjectViewUUID": sdoDataObjectViewUUID,
                        "applicationId": app.SCOPE.applicationId,
                        "communityId": app.SCOPE.getCommunityId(),
                        "profileId": app.SCOPE.workflow.profile,
                        "subProcessUUID": uuid
                    }
                };

                workerObject.action = action;
                worker.send(workerObject).then(function(workerSuccess) {

                    worker.setWorkerInfoInSubprocess(workerObject, _WFInstance, uuid);

                    var success = util.success('generateBasicView Worker processed successfully.', workerSuccess);
                    resolve(success);

                }, function(workerFail) {
                    reject(workerFail);
                });
            });

        },

        generateUnionView: function(generateUnionView, _WFInstance, uuid) {

            return new Promise(function(resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                var subprofileId = "";
                if (app.profile != undefined && app.profile.subprofileId != undefined) {
                    subprofileId = app.profile.subprofileId;
                }

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.subProcessUUID = uuid;
                workerObject.subprofileId = subprofileId;
                workerObject.channels.push("sdoReport");
                workerObject.channels.push("community_" + app.SCOPE.getCommunityId());

                var sdoDataObjectViewUnionSetId = generateUnionView.sdoDataObjectViewUnionSetId;
                var sdoDataObjectViewUnionUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + sdoDataObjectViewUnionSetId + "']/instances[1]/uuid", _WFInstance, {})[0];


                var action = {
                    "generateUnionView": {
                        "sdoDataObjectViewUnionUUID": sdoDataObjectViewUnionUUID,
                        "applicationId": app.SCOPE.applicationId,
                        "communityId": app.SCOPE.getCommunityId(),
                        "profileId": app.SCOPE.workflow.profile,
                        "subProcessUUID": uuid
                    }
                };

                workerObject.action = action;
                worker.send(workerObject).then(function(workerSuccess) {

                    worker.setWorkerInfoInSubprocess(workerObject, _WFInstance, uuid);

                    var success = util.success('generateUnionView Worker processed successfully.', workerSuccess);
                    resolve(success);

                }, function(workerFail) {
                    reject(workerFail);
                });
            });

        },

        sdoReportMultiple: function(sdoReportMultiple, _WFInstance, uuid) {

            return new Promise(function(resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                var subprofileId = "";
                if (app.profile != undefined && app.profile.subprofileId != undefined) {
                    subprofileId = app.profile.subprofileId;
                }

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.subProcessUUID = uuid;
                workerObject.subprofileId = subprofileId;
                workerObject.channels.push("sdoReport");
                workerObject.channels.push("community_" + app.SCOPE.getCommunityId());

                var sdoReportCreationSetId = sdoReportMultiple.sdoReportCreationSetId;
                var sdoReportViewsSetId = sdoReportMultiple.sdoReportViewsSetId;
                var sdoReportJoinsSetId = sdoReportMultiple.sdoReportJoinsSetId;

                var sdoReportCreationUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + sdoReportCreationSetId + "']/instances[1]/uuid", _WFInstance, {})[0];
                var sdoReportViewsUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + sdoReportViewsSetId + "']/instances[1]/uuid", _WFInstance, {})[0];
                var sdoReportJoinsUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + sdoReportJoinsSetId + "']/instances[1]/uuid", _WFInstance, {})[0];


                var action = {
                    "sdoReportMultiple": {
                        "sdoReportCreationUUID": sdoReportCreationUUID,
                        "sdoReportViewsUUID": sdoReportViewsUUID,
                        "sdoReportJoinsUUID": sdoReportJoinsUUID,
                        "applicationId": app.SCOPE.applicationId,
                        "communityId": app.SCOPE.getCommunityId(),
                        "profileId": app.SCOPE.workflow.profile,
                        "subProcessUUID": uuid
                    }
                };

                workerObject.action = action;
                worker.send(workerObject).then(function(workerSuccess) {

                    worker.setWorkerInfoInSubprocess(workerObject, _WFInstance, uuid);

                    var success = util.success('sdoReportMultiple Worker processed successfully.', workerSuccess);
                    resolve(success);

                }, function(workerFail) {
                    reject(workerFail);
                });
            });

        },

        subprofileQuarterlyReport: function(subprofileQuarterlyReport, _WFInstance, uuid) {

            return new Promise(function(resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                var subprofileId = "";
                if (app.profile != undefined && app.profile.subprofileId != undefined) {
                    subprofileId = app.profile.subprofileId;
                }

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.subProcessUUID = uuid;
                workerObject.subprofileId = subprofileId;
                workerObject.channels.push("executeReport");
                workerObject.channels.push("community_" + app.SCOPE.getCommunityId());

                var scheduleReportIndicator = subprofileQuarterlyReport.scheduleReportIndicator;
                var scheduleReportIndicatorUUID = JSON.xpath("/indicators[category/term eq '" + scheduleReportIndicator + "']/_id", _WFInstance, {})[0];
                var sdoReportApprovalIndicator = subprofileQuarterlyReport.sdoReportApprovalIndicator;
                var sdoReportApprovalIndicatorUUID = JSON.xpath("/indicators[category/term eq '" + sdoReportApprovalIndicator + "' and workflows[1]/processes[1]/subProcessUUID eq '" + uuid + "']/_id", _WFInstance, {})[0];





                var action = {
                    "subprofileQuarterlyReport": {
                        "scheduleReportIndicatorUUID": scheduleReportIndicatorUUID,
                        "sdoReportApprovalIndicatorUUID": sdoReportApprovalIndicatorUUID,
                        "subprofileCode": app.profile.subProfile.code,
                        "subprofileTitle": app.profile.subProfile.title,
                        "applicationId": app.SCOPE.applicationId,
                        "communityId": app.SCOPE.getCommunityId(),
                        "profileId": app.SCOPE.workflow.profile,
                        "subProcessUUID": uuid
                    }
                };

                workerObject.action = action;
                worker.send(workerObject).then(function(workerSuccess) {

                    worker.setWorkerInfoInSubprocess(workerObject, _WFInstance, uuid);

                    var success = util.success('QuarterlyReport report Worker processed successfully.', workerSuccess);
                    resolve(success);

                }, function(workerFail) {
                    reject(workerFail);
                });
            });


        }





    }

})();

var participants = (function() {

    return {

        linkParticipants: function(linkParticipants, _WFInstance, uuid) {

            return new Promise(function(resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                var subprofileId = "";
                if (app.profile != undefined && app.profile.subprofileId != undefined) {
                    subprofileId = app.profile.subprofileId;
                }

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.subProcessUUID = uuid;
                workerObject.subprofileId = subprofileId;
                workerObject.channels.push("follow");
                workerObject.channels.push("community_" + app.SCOPE.getCommunityId());

                var EPWPLinkParticipantsInBulkId = linkParticipants.EPWPLinkParticipantsInBulkId;
                var EPWPLinkParticipantsInBulkIdUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + EPWPLinkParticipantsInBulkId + "']/instances[1]/uuid", _WFInstance, {})[0];

                var EPWPLocalityId = linkParticipants.EPWPLocalityId;
                var EPWPLocalityIdUUID = JSON.xpath("/indicators[category/term eq '" + EPWPLocalityId + "']/_id", _WFInstance, {})[0];

                var EPWPActiveParticipantsId = linkParticipants.EPWPActiveParticipantsId;
                var EPWPActiveParticipantsIdUUID = JSON.xpath("/indicators[category/term eq '" + EPWPActiveParticipantsId + "']/_id", _WFInstance, {})[0];

                var action = {
                    "linkParticipants": {
                        "EPWPLinkParticipantsInBulkIdUUID": EPWPLinkParticipantsInBulkIdUUID,
                        "EPWPLocalityIdUUID": EPWPLocalityIdUUID,
                        "EPWPActiveParticipantsIdUUID": EPWPActiveParticipantsIdUUID,
                        "profilId": _WFInstance.profile
                    }
                };
                workerObject.action = action;
                worker.send(workerObject).then(function(workerSuccess) {

                    worker.setWorkerInfoInSubprocess(workerObject, _WFInstance, uuid);

                    var success = util.success('EPWPLinkParticipants Worker processed successfully.', workerSuccess);
                    resolve(success);

                }, function(workerFail) {
                    reject(workerFail);
                });
            });

        },

        monthlyAttendance: function(monthlyAttendance, _WFInstance, uuid) {

            return new Promise(function(resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                var subprofileId = "";
                if (app.profile != undefined && app.profile.subprofileId != undefined) {
                    subprofileId = app.profile.subprofileId;
                }

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.subProcessUUID = uuid;
                workerObject.subprofileId = subprofileId;
                workerObject.channels.push("follow");
                workerObject.channels.push("community_" + app.SCOPE.getCommunityId());

                var EPWPMonthlyAttendanceBulkUploadId = monthlyAttendance.EPWPMonthlyAttendanceBulkUploadUUID;
                var EPWPMonthlyAttendanceBulkUploadUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + EPWPMonthlyAttendanceBulkUploadId + "']/instances[1]/uuid", _WFInstance, {})[0];

                var EPWPActiveParticipantsId = monthlyAttendance.EPWPActiveParticipantsIdUUID;
                var EPWPActiveParticipantsIdUUID = JSON.xpath("/indicators[category/term eq '" + EPWPActiveParticipantsId + "']/_id", _WFInstance, {})[0];

                var EPWPMonthlyEmploymentPerLocalityId = monthlyAttendance.EPWPMonthlyEmploymentPerLocalityUUID;
                var EPWPMonthlyEmploymentPerLocalityUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + EPWPMonthlyEmploymentPerLocalityId + "']/instances[1]/uuid", _WFInstance, {})[0];




                var action = {
                    "monthlyAttendance": {
                        "EPWPMonthlyAttendanceBulkUploadUUID": EPWPMonthlyAttendanceBulkUploadUUID,
                        "EPWPActiveParticipantsIdUUID": EPWPActiveParticipantsIdUUID,
                        "EPWPMonthlyEmploymentPerLocalityUUID": EPWPMonthlyEmploymentPerLocalityUUID,
                        "profilId": _WFInstance.profile
                    }
                };
                workerObject.action = action;
                worker.send(workerObject).then(function(workerSuccess) {

                    worker.setWorkerInfoInSubprocess(workerObject, _WFInstance, uuid);

                    var success = util.success('monthlyAttendance Worker processed successfully.', workerSuccess);
                    resolve(success);

                }, function(workerFail) {
                    reject(workerFail);
                });
            });

        },

        monthlyProgressSummary: function(monthlyProgressSummary, _WFInstance, uuid) {

            return new Promise(function(resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                var subprofileId = "";
                if (app.profile != undefined && app.profile.subprofileId != undefined) {
                    subprofileId = app.profile.subprofileId;
                }

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.subProcessUUID = uuid;
                workerObject.subprofileId = subprofileId;
                workerObject.channels.push("follow");
                workerObject.channels.push("community_" + app.SCOPE.getCommunityId());

                var EPWPMonthlyProgressSummaryId = monthlyProgressSummary.EPWPMonthlyProgressSummaryIdUUID;
                var EPWPMonthlyProgressSummaryIdUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + EPWPMonthlyProgressSummaryId + "']/instances[1]/uuid", _WFInstance, {})[0];





                var action = {
                    "monthlyProgressSummary": {
                        "EPWPMonthlyProgressSummaryIdUUID": EPWPMonthlyProgressSummaryIdUUID,

                        "profilId": _WFInstance.profile
                    }
                };
                workerObject.action = action;
                worker.send(workerObject).then(function(workerSuccess) {

                    worker.setWorkerInfoInSubprocess(workerObject, _WFInstance, uuid);

                    var success = util.success('monthlyAttendance Worker processed successfully.', workerSuccess);
                    resolve(success);

                }, function(workerFail) {
                    reject(workerFail);
                });
            });

        },

        participantContracts: function(participantContracts, _WFInstance, uuid) {

            return new Promise(function(resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                var subprofileId = "";
                if (app.profile != undefined && app.profile.subprofileId != undefined) {
                    subprofileId = app.profile.subprofileId;
                }

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.subProcessUUID = uuid;
                workerObject.subprofileId = subprofileId;
                workerObject.channels.push("follow");
                workerObject.channels.push("community_" + app.SCOPE.getCommunityId());

                var EPWPParticipantContractsId = participantContracts.EPWPParticipantContractsIdUUID;
                var EPWPParticipantContractsIdUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + EPWPParticipantContractsId + "']/instances[1]/uuid", _WFInstance, {})[0];

                var action = {
                    "participantContracts": {
                        "EPWPParticipantContractsIdUUID": EPWPParticipantContractsIdUUID,
                        "profilId": _WFInstance.profile
                    }
                };

                workerObject.action = action;
                worker.send(workerObject).then(function(workerSuccess) {

                    worker.setWorkerInfoInSubprocess(workerObject, _WFInstance, uuid);

                    var success = util.success('participantContracts Worker processed successfully.', workerSuccess);
                    resolve(success);

                }, function(workerFail) {
                    reject(workerFail);
                });
            });

        },

        genericLinkParticipants: function(genericLinkParticipants, _WFInstance, uuid) {
            return new Promise(function(resolve, reject) {



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
                "channels": ["workerObject"],
                "profileId": "",
                "communityId": "",
                "applicationId": "",
                "subProcessUUID": "",
                "message": "",
                "messageType": "info",
                "createdDateTime": "",
                "senderUserId": "",
                "subProfileId": "",
                "parentTransactionId": (app.SCOPE.txn == undefined ? "" : app.SCOPE.txn.transactionId),
                "action": {

                }

            };

            return wrapper;

        },
        send: function(workerObject) {

            return new Promise(function(resolve, reject) {

                console.log('Submitting Worker Object to server');
                console.log(workerObject);
                dao.save(workerObject).then(function(workerResponse) {
                    resolve(workerResponse);
                }).catch(function(err) {
                    console.log('Error submitting worker response !!' + err);
                    reject(err);
                })

            });

        },

        sendWorker: function(workerConfig, _WFInstance, uuid) {

            return new Promise(function(resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                var subprofileId = "";
                if (app.profile != undefined && app.profile.subprofileId != undefined) {
                    subprofileId = app.profile.subprofileId;
                }

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.subProcessUUID = uuid;
                workerObject.subprofileId = subprofileId;
                workerObject.channels.push("sendWorker");
                workerObject.channels.push("community_" + app.SCOPE.getCommunityId());
                var processGetNodeValue = function(paramBlock, seq, paramName) {

                    return new Promise(function(res, rej) {

                        helper.getNodeValue(paramBlock, _WFInstance, uuid).then(function(dataValue) {

                            res({
                                "seq": seq,
                                "paramName": paramName,
                                "dataValue": dataValue
                            });

                        }, function(err) {
                            rej(err);
                        });


                    });

                };
                var processParams = function(configParam) {

                    return new Promise(function(res, rej) {
                        var parametersArray = [];
                        var itemsToProcess = configParam.length;
                        for (var i = 0; i < configParam.length; i++) {
                            var paramBlock = configParam[i].parameterValue;
                            var seq = configParam[i].seq;
                            var paramName = configParam[i].parameterName;

                            var paramValue = processGetNodeValue(paramBlock, seq, paramName).then(function(response) {

                                parametersArray.push({
                                    "seq": response.seq,
                                    "paramName": response.paramName,
                                    "paramValue": response.dataValue
                                })

                                itemsToProcess--;
                                if (itemsToProcess == 0) {
                                    parametersArray.push({
                                        "seq": itemsToProcess + 1,
                                        "paramName": "communityId",
                                        "paramValue": _WFInstance.communityId
                                    });

                                    parametersArray.push({
                                        "seq": itemsToProcess + 2,
                                        "paramName": "applicationId",
                                        "paramValue": _WFInstance.app
                                    });

                                    parametersArray.push({
                                        "seq": itemsToProcess + 3,
                                        "paramName": "profileId",
                                        "paramValue": _WFInstance.profile
                                    });

                                    parametersArray.push({
                                        "seq": itemsToProcess + 4,
                                        "paramName": "subProcessUUID",
                                        "paramValue": uuid
                                    });

                                    res(parametersArray);
                                }
                            }, function(err) {
                                itemsToProcess--;
                                if (itemsToProcess == 0) {
                                    parametersArray.push({
                                        "seq": itemsToProcess + 1,
                                        "paramName": "communityId",
                                        "paramValue": _WFInstance.communityId
                                    });

                                    parametersArray.push({
                                        "seq": itemsToProcess + 2,
                                        "paramName": "applicationId",
                                        "paramValue": _WFInstance.app
                                    });

                                    parametersArray.push({
                                        "seq": itemsToProcess + 3,
                                        "paramName": "profileId",
                                        "paramValue": _WFInstance.profile
                                    });

                                    parametersArray.push({
                                        "seq": itemsToProcess + 4,
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
                if (workerConfig.rest != undefined) {

                    var configParam = workerConfig.rest.parameters;
                    processParams(configParam).then(function(paramsArray) {
                        var action = {
                            "sendWorker": {
                                "rest": {

                                }
                            }
                        };
                        action.sendWorker.rest.uri = workerConfig.rest.uri;
                        action.sendWorker.rest.profilId = _WFInstance.profile;
                        action.sendWorker.rest.parameters = paramsArray;

                        workerObject.action = action;
                        worker.send(workerObject).then(function(workerSuccess) {



                            var spObject = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];
                            spObject.spStatus = 'submitted';

                            if (spObject.messages == undefined) {
                                spObject.messages = [];
                            }
                            var pendingSubmissionObject = {
                                "message": {
                                    "i18n": {
                                        "_id": "",
                                        "en": "The server is processing your request. Please wait a few seconds and then click the refresh button.",
                                        "pt": "The server is processing your request. Please wait a few seconds and then click the refresh button."
                                    }
                                },
                                "type": "info"
                            };
                            spObject.messages.push(pendingSubmissionObject);
                            // worker id here
                            if (spObject.workers == undefined) {
                                spObject.workers = [];
                            }
                            spObject.workers.push({
                                "workerId": workerObject._id,
                                "dateTime": moment().format()
                            });

                            persistData('subprocesses', app.SCOPE.workflow, uuid)
                                .then(function(saved) {

                                    var success = util.success('Worker Rest processed successfully.', workerSuccess);
                                    resolve(success);

                                }).catch(function(failed) {
                                    console.log('Worker submitted subprocess file update failed');
                                    reject(failed);
                                });





                        }, function(workerFail) {
                            console.log('Worker failed ');
                            reject(workerFail);
                        });

                    }, function(err) {
                        console.log("parameter creation failed. Abording worker object");
                    });

                } else if (workerConfig.functional != undefined) {

                    var configParam = workerConfig.functional.parameters;
                    processParams(configParam).then(function(paramsArray) {
                        var action = {
                            "sendWorker": {
                                "functional": {

                                }
                            }
                        };
                        action.sendWorker.functional.methodName = workerConfig.functional.methodName;
                        action.sendWorker.functional.profilId = _WFInstance.profile;
                        action.sendWorker.functional.parameters = paramsArray;
                        workerObject.action = action;
                        worker.send(workerObject).then(function(workerSuccess) {

                            var spObject = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];
                            spObject.spStatus = 'submitted';

                            if (spObject.messages == undefined) {
                                spObject.messages = [];
                            }
                            var pendingSubmissionObject = {
                                "message": {
                                    "i18n": {
                                        "_id": "",
                                        "en": "The server is processing your request. Please wait a few seconds and then click the refresh button.",
                                        "pt": "The server is processing your request. Please wait a few seconds and then click the refresh button."
                                    }
                                },
                                "type": "info"
                            };
                            spObject.messages.push(pendingSubmissionObject);

                            // worker id here
                            if (spObject.workers == undefined) {
                                spObject.workers = [];
                            }
                            spObject.workers.push({
                                "workerId": workerObject._id,
                                "dateTime": moment().format()
                            });

                            persistData('subprocesses', app.SCOPE.workflow, uuid)
                                .then(function(saved) {

                                    var success = util.success('Worker functional processed successfully.', workerSuccess);
                                    resolve(success);

                                }).catch(function(failed) {
                                    console.log('Worker submitted subprocess file update failed');
                                    reject(failed);
                                });



                        }, function(workerFail) {
                            console.log('Worker failed ');
                            reject(workerFail);
                        });

                    }, function(err) {
                        console.log("parameter creation failed. Abording worker object");
                    });
                }

            });

        },

        executeLocal: function(workerConfig, _WFInstance, uuid) {

            return new Promise(function(resolve, reject) {



                var processGetNodeValue = function(paramBlock, seq, dataType) {

                    return new Promise(function(res, rej) {

                        helper.getNodeValue(paramBlock, _WFInstance, uuid).then(function(dataValue) {

                            res({
                                "seq": seq,
                                "dataType": dataType,
                                "dataValue": dataValue
                            });

                        }, function(err) {
                            rej(err);
                        });


                    });

                };

                var processParams = function(configParam) {

                    return new Promise(function(res, rej) {
                        var parametersArray = [];
                        var itemsToProcess = configParam.length;
                        for (var i = 0; i < configParam.length; i++) {
                            var paramBlock = configParam[i].parameterValue;
                            var seq = configParam[i].seq;
                            var dataType = configParam[i].dataType.dataType;
                            var paramValue = processGetNodeValue(paramBlock, seq, dataType).then(function(response) {

                                parametersArray.push({
                                    "seq": response.seq,
                                    "dataType": response.dataType,
                                    "paramValue": response.dataValue
                                })

                                itemsToProcess--;
                                if (itemsToProcess == 0) {
                                    res(parametersArray);
                                }
                            }, function(err) {
                                itemsToProcess--;
                                if (itemsToProcess == 0) {
                                    res(parametersArray);
                                }
                            })


                        }
                    });
                };

                var fixParamType = function(paramValue, dataType) {

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
                            return paramValue;
                            break;
                        default:
                            break;
                    }

                };

                var methodName = workerConfig.methodName;
                var configParam = workerConfig.parameters;
                processParams(configParam).then(function(paramsArray) {

                    var pList = '';
                    for (var i = 0; i < paramsArray.length - 1; i++) {
                        pList = pList + fixParamType(paramsArray[i].paramValue, paramsArray[i].dataType) + ',';
                    }
                    pList = pList + fixParamType(paramsArray[i].paramValue, paramsArray[i].dataType)

                    var callbackSuccess = function() {
                        return resolve("Function '" + methodName + "' executed. Response success.");
                    };
                    var callbackFailure = function() {
                        return reject("Function '" + methodName + "' executed. Response failed.");
                    };
                    var spUUID = "'" + uuid + "'"
                    var func = methodName + '(' + pList + ',callbackSuccess, callbackFailure,' + spUUID + ')';
                    var exe = eval(func);
                    console.log(exe);
                    resolve("Local function executed");

                }, function(err) {
                    console.log("parameter creation failed. Abording worker object");
                    reject(err);
                });



            });

        },

        setWorkerInfoInSubprocess: function(workerObject, _WFInstance, uuid) {

            var subprocessObject = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];
            var pendingSubmissionObject = {
                "message": {
                    "i18n": {
                        "_id": "",
                        "en": "The server is processing your request. Please wait a few seconds and then click the refresh button.",
                        "pt": "O servidor está processando sua solicitação. Por favor aguarde alguns segundos e depois clique no botão atualizar."
                    }
                },
                "type": "info"
            };
            subprocessObject.messages = [];
            subprocessObject.messages.push(pendingSubmissionObject);

            if (subprocessObject.workers == undefined) {
                subprocessObject.workers = [];
            }
            subprocessObject.workers.push({
                "workerId": workerObject._id,
                "dateTime": moment().format()
            })
            return;

        },


        create: function(workerConfig, _WFInstance, uuid) {

            return new Promise(function(resolve, reject) {

                var channel = workerConfig.channel;
                var workerAction = workerConfig.action;

                var workerObject = worker.getWorkerWrapper();

                var subprofileId = "";
                if (app.profile != undefined && app.profile.subprofileId != undefined) {
                    subprofileId = app.profile.subprofileId;
                }

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = moment().format();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.subProcessUUID = uuid;
                workerObject.subprofileId = subprofileId;
                workerObject.channels.push(channel);
                workerObject.channels.push("community_" + app.SCOPE.getCommunityId());

                var action = {

                };
                action[workerAction] = {};

                for (var i = 0; i < workerConfig.indicators.length; i++) {
                    var label = workerConfig.indicators[i].label;
                    var setId = workerConfig.indicators[i].setId;
                    var context = workerConfig.indicators[i].context;

                    var id = "";

                    if (context == 'subProcess') {
                        id = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + setId + "']/instances[1]/uuid", _WFInstance, {})[0];
                    } else {
                        id = JSON.xpath("/indicators[category/term eq '" + setId + "']/_id", _WFInstance, {})[0];
                    }
                    action[workerAction][label] = id
                }
                action[workerAction].profilId = _WFInstance.profile;

                if (workerConfig.fixed != undefined) {
                    for (var i = 0; i < workerConfig.fixed.length; i++) {

                        var obj = workerConfig.fixed[i];
                        var key = Object.keys(obj)[0];
                        action[workerAction][key] = obj[key]

                    }
                }
                if (workerConfig.dataFields != undefined) {
                    action[workerAction].dataFields = workerConfig.dataFields;
                }

                workerObject.action = action;
                worker.send(workerObject).then(function(workerSuccess) {

                    worker.setWorkerInfoInSubprocess(workerObject, _WFInstance, uuid);

                    var success = util.success(workerAction + ' worker processed successfully.', workerSuccess);
                    resolve(success);

                }, function(workerFail) {
                    reject(workerFail);
                });








            });

        },

    }

})();

var user = (function() {

    return {

        addToRole: function(addToRole, uuid, _WFInstance) {

            return new Promise(function(resolve, reject) {
                helper.getNodeValue(addToRole.userName, _WFInstance, uuid).then(function(userDisplayName) {
                    helper.getNodeValue(addToRole.userId, _WFInstance, uuid).then(function(userId) {
                        var contextType = JSON.xpath("/roles[id eq '" + addToRole.roleId + "']/type", app.SCOPE.APP_CONFIG, {})[0]

                        if (contextType == 'instance') {
                            rolesManager.doUserRegistration(userId, userDisplayName, addToRole.roleId, 'instance').then(function(s) {
                                var success = util.success('Role assigned to user in context instance', s);
                                resolve(success);
                            }).catch(function(err) {
                                console.log('rolesManager- instance fail');
                                resolve('role update failed');
                            });
                        } else if (contextType == 'subprofile') {
                            rolesManager.doUserRegistration_node(userId, userDisplayName, addToRole.roleId, 'subprofile').then(function(s) {
                                var success = util.success('Role assigned to user in context subprofile', s);
                                resolve(success);
                            }).catch(function(err) {
                                console.log('rolesManager- subprofile fail');
                                resolve('role update failed');
                            });
                        } else if (contextType == 'adoption') {
                            rolesManager.doUserRegistration_adoption(userId, userDisplayName, addToRole.roleId, 'adoption').then(function(s) {
                                var success = util.success('Role assigned to user in context adoption', s);
                                resolve(success);
                            }).catch(function(err) {
                                console.log('rolesManager- adoption fail');
                                resolve('role update failed');
                            });
                        } else {
                            console.log('Role not found in any context');
                            reject('Role not found in any context')
                        }
                    }).catch(function(err) {
                        reject(err);
                    })
                }).catch(function(err) {
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
    report: report,
    participants: participants,
    user: user
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

    return new Promise(function (resolve, reject) {
        var toProcess = indicators.length;
        var broke = false;

        var resolveCaller = function () {

            if (broke == false) {
                var success = util.success('Form create indicator persist success.', _WFInstance.indicators);
                resolve(success);
            } else {

                var toAddProcess = [];
                for (var i = 0; i < _WFInstance.instance.processes.length; i++) {
                    if (_WFInstance.instance.processes[i].subProcesses.length > 0) {
                        toAddProcess.push(_WFInstance.instance.processes[i]);
                    }

                }

                _WFInstance.instance.processes = [];
                _WFInstance.instance.processes = toAddProcess;


                var involvedSubProcesses = [];
                var subProcessObject = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];
                var subProcessId = subProcessObject.id;
                var subProcessConfigObject = JSON.xpath("/config/processes/subProcesses[_id eq '" + subProcessId + "']", _WFInstance, {})[0];
                if (subProcessConfigObject.instanceType.newSequence != undefined) {

                    for (var i = 0; i < subProcessConfigObject.indicators.length; i++) {

                        var indicator = subProcessConfigObject.indicators[i];
                        var setId = indicator._id;
                        var indicatorUUID = JSON.xpath("distinct-values(/subprocesses[groupKey = '" + subProcessObject.groupKey + "']/indicators[id = '" + setId + "']/instances/uuid)", _WFInstance, {})[0];

                        //JSON.xpath("/subprocesses/indicators[id eq '" + setId + "']/instances/uuid", _WFInstance, {})[0];

                        if (indicatorUUID != undefined) {
                            var indicatorObject = JSON.xpath("/indicators[_id eq '" + indicatorUUID + "']", _WFInstance, {})[0];
                            if (indicatorObject != undefined) {
                                indicatorObject.model.pending = indicatorObject.model.approved;
                            }
                        }
                    }

                    var indListNames = '';
                    for (var i = 0; i < subProcessConfigObject.indicators.length - 1; i++) {
                        indListNames = indListNames + "'" + subProcessConfigObject.indicators[i]._id + "',"

                    }
                    indListNames = indListNames + "'" + subProcessConfigObject.indicators[subProcessConfigObject.indicators.length - 1]._id + "'"
                    involvedSubProcesses = JSON.xpath("distinct-values(/indicators[category/term = (" + indListNames + ")]/model/approved/subProcessUUID)", _WFInstance, {});

                    var persistSubProcess = function (index, involvedSubProcesses) {
                        if (index == involvedSubProcesses.length) {

                            var toAddSubProcess = [];
                            for (var i = 0; i < _WFInstance.subprocesses.length; i++) {
                                if (_WFInstance.subprocesses[i].indicators.length > 0) {
                                    toAddSubProcess.push(_WFInstance.subprocesses[i]);
                                }

                            }
                            _WFInstance.subprocesses = [];
                            _WFInstance.subprocesses = toAddSubProcess;


                            var failure = util.success('Gatekeeper initialisation failed (100)', {});
                            reject(failure);
                        } else {

                            persistData('indicators', _WFInstance, involvedSubProcesses[index]).then(function (data) {
                                persistSubProcess(index + 1, involvedSubProcesses);
                            }).catch(function (err) {
                                persistSubProcess(index + 1, involvedSubProcesses);
                            })


                        }

                    }

                    persistSubProcess(0, involvedSubProcesses);

                } else {

                    var toAddSubProcess = [];
                    for (var i = 0; i < _WFInstance.subprocesses.length; i++) {
                        if (_WFInstance.subprocesses[i].indicators.length > 0) {
                            toAddSubProcess.push(_WFInstance.subprocesses[i]);
                        }

                    }
                    _WFInstance.subprocesses = [];
                    _WFInstance.subprocesses = toAddSubProcess;
                    var failure = util.success('Gatekeeper initialisation failed (100)', {});
                    reject(failure);
                }

            }


        }

        var subprocessType = JSON.xpath("/config/processes/subProcesses[_id eq '" + subProcessId + "']/type", _WFInstance, {})[0];

        var formCreateFn = function (indicatorType, indicatorId, validDate, instantiateSource) {

            return new Promise(function (resolve, reject) {

                gatekeeper.instantiate(baseUUID, indicatorType, indicatorId, _WFInstance.profile, validDate, subProcessId, subprocessType).then(function (docArray) {
                    // Update the indicator workflow processes section

                    for (var i = 0; i < docArray.length; i++) {
                        var object = docArray[i];

                        for (var index = 0; index < _WFInstance.indicators.length; index++) {
                            var indicator = _WFInstance.indicators[index];
                            if (indicator._id == object.model._id) {

                                _WFInstance.indicators.splice(index, 1);
                                _WFInstance.indicators.push(object.model);
                                break;

                            }

                        }


                        if (!object.model._id.endsWith(':approved') && !object.model._id.endsWith(':rejected')) {


                            object.model.model.pending.validDate = validDate;
                            object.model.model.pending.subProcessUUID = uuid;



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

                            if (object.model.model.pending.seq == 1 && action.setWorkflowLabelInTitle != undefined && action.setWorkflowLabelInTitle != '' && action.setWorkflowLabelInTitle == true) {
                                object.model.title = inputData.label;
                            }

                            if (action.setDraft != undefined && action.setDraft != '' && action.setDraft == true) {
                                object.model.control.draft = true;
                            }

                            object.model.workflows.push(workflowObj);
                            var mainId = object.model._id;
                            // persist via gk so that it is save in couch
                            gatekeeper.persist(docArray).then(function (savedArray) {
                                //using same id call initialiseData
                                //call code to set to setInstance
                                dao.get(mainId).then(function (data) {

                                    var indicatorModel = ko.mapping.fromJS({
                                        "defaultModel": {
                                            "setId": indicatorId
                                        }

                                    });
                                    var sequence = data.model.pending.seq;
                                    gatekeeper.instantiateData(mainId, instantiateSource, indicatorModel, data.model.pending.seq, paramObject).then(function (data) {
                                        if (data[0].status == "200") {

                                            for (var index = 0; index < _WFInstance.indicators.length; index++) {
                                                var indicator = _WFInstance.indicators[index];
                                                if (indicator._id == data[0].model._id) {

                                                    _WFInstance.indicators.splice(index, 1);
                                                    _WFInstance.indicators.push(data[0].model);
                                                    break;

                                                }

                                            }

                                            if (sequence == 1) {
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
                                            }
                                            gatekeeper.persist(data).then(function (savedArray) {
                                                dao.get(mainId).then(function (data) {
                                                    if (_WFInstance.indicators.length == 0) {
                                                        _WFInstance.indicators.push(data);
                                                        toProcess--;
                                                        if (toProcess == 0) {

                                                            persistData('indicators', _WFInstance, uuid).then(function (data) {

                                                                var success = util.success('Form create indicator persist success.', _WFInstance.indicators);
                                                                resolveCaller();

                                                            }).catch(function (err) {

                                                                console.error(err);
                                                                var failure = util.success('Form create indicator persist failed.', {});
                                                                broke = true;
                                                                resolveCaller();

                                                            })



                                                        }
                                                        resolve({});


                                                    } else {
                                                        var found = false;
                                                        for (var index = 0; index < _WFInstance.indicators.length; index++) {
                                                            var indicator = _WFInstance.indicators[index];
                                                            if (indicator._id == data._id) {

                                                                found = true;
                                                                // Remove the current item from the array and add the updated processModel
                                                                _WFInstance.indicators.splice(index, 1);
                                                                _WFInstance.indicators.push(data);
                                                                index = _WFInstance.indicators.length;


                                                                toProcess--;
                                                                if (toProcess == 0) {
                                                                    persistData('indicators', _WFInstance, uuid).then(function (data) {

                                                                        var success = util.success('Form create indicator persist success.', _WFInstance.indicators);
                                                                        resolveCaller();

                                                                    }).catch(function (err) {

                                                                        console.error(err);
                                                                        var failure = util.success('Form create indicator persist failed.', {});
                                                                        broke = true;
                                                                        resolveCaller();

                                                                    })
                                                                }

                                                                resolve({});


                                                            }

                                                        }

                                                        if (found == false) {
                                                            _WFInstance.indicators.push(data);

                                                            toProcess--;
                                                            if (toProcess == 0) {
                                                                persistData('indicators', _WFInstance, uuid).then(function (data) {

                                                                    var success = util.success('Form create indicator persist success.', _WFInstance.indicators);
                                                                    resolveCaller();

                                                                }).catch(function (err) {

                                                                    console.error(err);
                                                                    var failure = util.success('Form create indicator persist failed.', {});
                                                                    broke = true;
                                                                    resolveCaller();


                                                                })
                                                            }

                                                            resolve({});


                                                        }

                                                    }

                                                }).catch(function (err) {
                                                    console.error(err);
                                                    var failure = util.success('1 Gatekeeper initialisation failed with initialiseData message ', {});
                                                    broke = true;
                                                    toProcess--;
                                                    if (toProcess == 0) {
                                                        resolveCaller();
                                                    }

                                                    resolve({});


                                                });

                                            }, function (err) {
                                                console.error(err);
                                                var failure = util.success('2 Gatekeeper initialisation failed with initialiseData message ', {});
                                                broke = true;
                                                toProcess--;
                                                if (toProcess == 0) {
                                                    resolveCaller();
                                                }

                                                resolve({});

                                            });

                                        } else {
                                            var failure = util.success('3 Gatekeeper initialisation failed with initialiseData message ', {});
                                            broke = true;
                                            toProcess--;
                                            if (toProcess == 0) {
                                                resolveCaller();
                                            }

                                            resolve({});

                                        }

                                    }, function (err) {
                                        var failure = util.success('4 Gatekeeper initialisation failed with initialiseData message ', {});
                                        broke = true;
                                        toProcess--;
                                        if (toProcess == 0) {
                                            resolveCaller();
                                        }

                                        resolve({});

                                    });

                                }).catch(function (err) {
                                    console.error(err);
                                    var failure = util.success('5 Gatekeeper initialisation failed with initialiseData message ', {});
                                    broke = true;
                                    toProcess--;
                                    if (toProcess == 0) {
                                        resolveCaller();
                                    }

                                    resolve({});

                                })
                            }, function (err) {
                                console.error(err);
                                var failure = util.success('6 Gatekeeper initialisation failed with initialiseData message ', {});
                                broke = true;
                                toProcess--;
                                if (toProcess == 0) {
                                    resolveCaller();
                                }

                                resolve({});

                            });
                        }

                    }

                }, function (err) {

                    broke = true;
                    toProcess--;
                    if (toProcess == 0) {
                        resolveCaller();
                    }

                    resolve({});


                });

            });



        };

        var instantiateSource = FROM_DEFINITION;

        var loopFunction = function (indicators, counter) {

            if (indicators.length == 0) {

                toProcess--;
                if (toProcess == 0) {
                    resolveCaller();
                }

            }
            else if (counter < indicators.length) {

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

                    if (subProcess.periodType.periodic == undefined) {

                        if (baseUUID != uuid) {
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
                                path = "/indicators[category/term eq '" + indicatorId + "' and id = /subprocesses[id = '" + subProcessId + "' and id = " + part + "]/indicators/instances/uuid]/_id";
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

                formCreateFn(initType, indicatorId, inputData.validDate, instantiateSource)
                    .then(function (s) {
                        loopFunction(indicators, (counter + 1));
                    })
                    .catch(function (err) {

                        broke = true;
                        toProcess--;
                        if (toProcess == 0) {
                            resolveCaller();
                        }

                    });

            }

        }

        loopFunction(indicators, 0);

    });
};

function setInstanceTitle(args) {

    var _WFInstance = args[0] || {};

    var uuid = args[2] || '';
    var data = args[4] || {};

    var title = data.label;

    return new Promise(function (resolve, reject) {

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

    return new Promise(function (resolve, reject) {

        var subprofileId = "";
        if (app.profile != undefined && app.profile.subprofileId != undefined) {
            subprofileId = app.profile.subprofileId;
        }

        var workerObject = {
            "source": "remote",
            "type": "workerObject",
            "_id": generateUUID(),
            "channels": ["deleteProfile", "community_" + app.SCOPE.getCommunityId(), "workerObject"],
            "communityId": app.SCOPE.getCommunityId(),
            "applicationId": app.SCOPE.applicationId,
            "profileId": _WFInstance.profile,
            "message": "",
            "subprofileId": subprofileId,
            "messageType": "info",
            "createdDateTime": moment().format(),
            "senderUserId": LOCAL_SETTINGS.SUBSCRIPTIONS.userId,
            "parentTransactionId": (app.SCOPE.txn == undefined ? "" : app.SCOPE.txn.transactionId),
            "notification": {

            },
            "profile": {
                "action": "deleteProfile",
                "profileId": profileId
            }

        }

        console.log(workerObject);
        dao.upsert(workerObject).then(function (data) {
            console.log("Worker Object submitted for profile(" + profileId + ") deletion.");
            console.log(data);
            resolve(data);
        }).catch(function (err) {
            console.log(err);
            reject(data);
        });

    });

};

function createProfile(args) {

    var _WFInstance = args[1] || {};

    var communityId = _WFInstance.communityId;
    var profileId = _WFInstance.profile;

    return new Promise(function (resolve, reject) {

        library.createProfileDocuments(communityId, profileId).then(function (data) {

            var success = util.success('Form created successfully.', data);
            resolve(success);

        }).catch(function (err) {

            console.error(err);
            var failure = util.success('ERROR: Profile creation failed', {});
            reject(failure);

        });

    });
};

function setDraft(args) {

    var _WFInstance = args[0] || {};

    var communityId = _WFInstance.communityId;
    var profileId = _WFInstance.profile;
    var uuid = args[2] || '';

    return new Promise(function (resolve, reject) {

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

    return new Promise(function (resolve, reject) {

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

    return new Promise(function (resolve, reject) {
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

    return new Promise(function (resolve, reject) {
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

    return new Promise(function (resolve, reject) {

        var spo = JSON.xpath("/subprocesses[_id eq '" + subProcessUUID + "']", app.SCOPE.workflow, {})[0];



        //var subProcessUUID = JSON.xpath("/processes[id eq '" + processId + "' and seq eq '" + processSeq + "']/subProcesses[id eq '" + subProcessId + "' and seq eq '" + subProcessSeq + "']/uuid", _WFInstance.instance, {})[0];
        var spIndicators = JSON.xpath("/subprocesses[_id eq '" + subProcessUUID + "']/indicators/instances/uuid", _WFInstance, {});
        var itemsToProcess = spIndicators.length;
        var updatedObjectsArray = [];
        var tempArray = [];

        //start txn on induuid + :approved then commit

        for (var i = 0; i < spIndicators.length; i++) {

            gatekeeper.authorise(spIndicators[i]).then(function (authorisedReturn) {

                gatekeeper.persist(authorisedReturn).then(function (savedArray) {

                    var uuidSavedIndicator = '';
                    for (var c = 0; c < savedArray.length; c++) {
                        if (!savedArray[c].id.endsWith(':approved')) {
                            uuidSavedIndicator = savedArray[c].id;
                        }

                    }

                    dao.get(uuidSavedIndicator).then(function (data) {

                        if (_WFInstance.indicators.length == 0) {
                            _WFInstance.indicators.push(data);
                            itemsToProcess--;
                            if (itemsToProcess == 0) {



                                persistData('indicators', _WFInstance, subProcessUUID).then(function (data) {

                                    var success = util.success('Form authorised successfully.', updatedObjectsArray);
                                    resolve(success);



                                }).catch(function (err) {

                                    console.error(err);
                                    var failure = util.success('Form authorised persist failed.', {});
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

                                        for (var p = 0; p < indLength; p++) {
                                            var tempObj = false;
                                            for (var q = 0; q < tempLength; q++) {
                                                if (_WFInstance.indicators[p]._id == tempArray[q]._id) {
                                                    tempObj = true;
                                                }
                                            }
                                            if (!tempObj) {
                                                tempArray.push(_WFInstance.indicators[p])
                                            }
                                        }

                                        _WFInstance.indicators = tempArray;

                                        break;
                                    }

                                }

                            }

                            if (found == true && itemsToProcess == 0) {

                                persistData('indicators', _WFInstance, subProcessUUID).then(function (data) {

                                    var success = util.success('Form authorised successfully.', updatedObjectsArray);
                                    resolve(success);

                                }).catch(function (err) {

                                    console.error(err);
                                    var failure = util.success('Form authorised persist failed.', {});
                                    reject(failure);

                                });

                            }

                        }

                    }).catch(function (err) {
                        console.error(err);
                    });

                }, function (error) {
                    console.error(error);
                });

            }, function (error) {
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

    return new Promise(function (resolve, reject) {
        var success = util.success('Form closed successfully.', result);
        resolve(success);
    });
};



function updateIndicator(args) {

    var _WFInstance = args[0] || {};

    var uuid = args[1] || '';
    var path = args[2] || '';
    var dataValue = args[3] || '';

    return new Promise(function (resolve, reject) {

        var setId = path.split(".", 1)[0];
        var indObject = JSON.xpath("/indicators[workflows/processes/subProcessUUID = '" + uuid + "' and category/term = '" + setId + "']", _WFInstance, {})[0];

        var squote = (dataValue + "").replace(/'/g, "\\'");
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

    return new Promise(function (resolve, reject) {


        var indObject = JSON.xpath("/indicators[workflows/processes/subProcessUUID = '" + uuid + "' and category/term = '" + indicatorSetId + "']", _WFInstance, {})[0];



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

    return new Promise(function (resolve, reject) {

        var indObject = JSON.xpath("/indicators[workflows/processes/subProcessUUID = '" + uuid + "' and category/term = '" + indicatorSetId + "']", _WFInstance, {})[0];
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

    return new Promise(function (resolve, reject) {

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

            if (data.value.datatype.dataType != undefined) {
                inputDataType = data.value.datatype.dataType;
            } else {
                inputDataType = data.value.datatype;
            }


            var inputValue = data.value.data;

            if (inputDataType == 'number') {
                resolve(Number(inputValue));
            } else if (inputDataType == 'string') {
                resolve(inputValue);
            } else if (inputDataType == 'integer') {
                resolve(parseInt(inputValue));
            } else if (inputDataType == 'decimal') {
                resolve(parseFloat(inputValue));
            } else if (inputDataType == 'date' || inputDataType == 'dateTime') {
                resolve(inputValue);
            } else {
                // In case data type not matched
                resolve(inputValue);
            }

        } else if (data.indicatorUUID != undefined) {

            // A change is required to make sure proper scope is identified.
            var indicatorUUID = null;

            var subprocess = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];
            if (subprocess.indicators.length == 0) {

                indicatorUUID = JSON.xpath("/indicators[category/term eq '" + data.indicatorUUID.indicatorSetId + "']/_id", _WFInstance, {})[0];

            } else {

                indicatorUUID = JSON.xpath("/indicators[id eq '" + data.indicatorUUID.indicatorSetId + "']/instances/uuid", subprocess, {})[0];
                if (indicatorUUID == undefined) {
                    indicatorUUID = JSON.xpath("/indicators[category/term eq '" + data.indicatorUUID.indicatorSetId + "']/_id", _WFInstance, {})[0];
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
                seq = JSON.xpath("count(/subprocesses[_id eq '" + uuid + "']/preceding-sibling::node()[id = /subprocesses[_id eq '" + uuid + "']/id and _id = /subprocesses[_id = " + part + "]/_id])", _WFInstance, {})[0] + 1;
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
                            seq = JSON.xpath("count(/subprocesses[_id eq '" + uuid + "']/preceding-sibling::node()[id = /subprocesses[_id eq '" + uuid + "']/id and _id = /subprocesses[_id = " + part + "]/_id])", _WFInstance, {})[0] + 1;
                        }

                        var valuePath = "/" + variableName + "[" + seq + "]/value";
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
            var elementpath = replaceAll(data.indicatorWrapper.path, "[.]", "/")
            var xpath = '/' + elementpath
            var value = JSON.xpath(xpath, indObject, {})[0];
            resolve(value);

        } else if (data.calculated != undefined) {


            var value = '';
            var separator = data.calculated.separator;

            for (var i = 0; i < data.calculated.elements.length - 1; i++) {

                var elements = data.calculated.elements;

                var possibleItems = ["elementProperty", "constantValue", "elementWrapper", "currentDate", "randomDigits", "profileObjectElement", "profileObjectWrapper", "currentFinancialYear"];
                switch (propertyExists(elements[i], possibleItems)) {

                    case 'elementProperty':
                        var indicatorSet = elements[i].elementProperty.indicatorSetId;
                        var indicatorUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + indicatorSet + "']/instances/uuid", _WFInstance, {})[0];
                        var indObject = JSON.xpath("/indicators[_id eq '" + indicatorUUID + "']", _WFInstance, {})[0];
                        var elementpath = replaceAll(elements[i].elementProperty.elementId, "[.]", "/")
                        var xpath = '/model/pending/data/' + indicatorSet + '/' + elementpath;
                        var itemValue = JSON.xpath(xpath, indObject, {})[0];
                        value = value + itemValue + separator;
                        break;


                    case 'constantValue':

                        var itemValue = elements[i].constantValue.value;
                        value = value + itemValue + separator;
                        break;

                    case 'elementWrapper':
                        var indicatorSet = elements[i].elementWrapper.indicatorSetId;
                        var indicatorUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + indicatorSet + "']/instances/uuid", _WFInstance, {})[0];
                        var indObject = JSON.xpath("/indicators[_id eq '" + indicatorUUID + "']", _WFInstance, {})[0];
                        var elementpath = replaceAll(elements[i].elementWrapper.elementId, "[.]", "/")
                        var xpath = '/' + elementpath;
                        var itemValue = JSON.xpath(xpath, indObject, {})[0];
                        value = value + itemValue + separator;
                        break;


                    case 'currentDate':

                        value = value + formatDate(new Date()) + separator;
                        break;

                    case 'randomDigits':
                        var digits = elements[i].randomDigits.digits;
                        var random = Math.random();
                        var exp = Math.pow(10, digits);
                        var intPart = (random * exp) ^ 0
                        value = value + intPart + separator;
                        break;

                    case 'profileObjectElement':

                        var indicatorSet = elements[i].profileObjectElement.indicatorSetId;
                        var indObject = JSON.xpath("/indicators[category/term eq 'appProfile']", app.SCOPE.workflow, {})[0];
                        var elementpath = replaceAll(elements[i].profileObjectElement.elementId, "[.]", "/")
                        var xpath = '/model/pending/data/' + indicatorSet + '/' + elementpath;
                        var itemValue = JSON.xpath(xpath, indObject, {})[0];
                        value = value + itemValue + separator;
                        break;

                    case 'profileObjectWrapper':

                        var indicatorSet = elements[i].profileObjectWrapper.indicatorSetId;
                        var indObject = JSON.xpath("/indicators[category/term eq 'appProfile']", app.SCOPE.workflow, {})[0];
                        var elementpath = replaceAll(elements[i].profileObjectWrapper.wrapperElementId, "[.]", "/")
                        var xpath = '/' + elementpath;
                        var itemValue = JSON.xpath(xpath, indObject, {})[0];
                        value = value + itemValue + separator;
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

            var possibleItems = ["elementProperty", "constantValue", "elementWrapper", "currentDate", "randomDigits", "profileObjectElement", "profileObjectWrapper", "currentFinancialYear"];
            switch (propertyExists(elements[i], possibleItems)) {

                case 'elementProperty':
                    var indicatorSet = elements[i].elementProperty.indicatorSetId;
                    var indicatorUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + indicatorSet + "']/instances/uuid", _WFInstance, {})[0];
                    var indObject = JSON.xpath("/indicators[_id eq '" + indicatorUUID + "']", _WFInstance, {})[0];
                    var elementpath = replaceAll(elements[i].elementProperty.elementId, "[.]", "/")
                    var xpath = '/model/pending/data/' + indicatorSet + '/' + elementpath;
                    var itemValue = JSON.xpath(xpath, indObject, {})[0];
                    value = value + itemValue;
                    break;


                case 'constantValue':

                    var itemValue = elements[i].constantValue.value;
                    value = value + itemValue;
                    break;

                case 'elementWrapper':
                    var indicatorSet = elements[i].elementWrapper.indicatorSetId;
                    var indicatorUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + indicatorSet + "']/instances/uuid", _WFInstance, {})[0];
                    var indObject = JSON.xpath("/indicators[_id eq '" + indicatorUUID + "']", _WFInstance, {})[0];
                    var elementpath = replaceAll(elements[i].elementWrapper.elementId, "[.]", "/")
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
                    var intPart = (random * exp) ^ 0
                    value = value + intPart;
                    break;

                case 'profileObjectElement':

                    var indicatorSet = elements[i].profileObjectElement.indicatorSetId;
                    var indObject = JSON.xpath("/indicators[category/term eq 'appProfile']", app.SCOPE.workflow, {})[0];
                    var elementpath = replaceAll(elements[i].profileObjectElement.elementId, "[.]", "/")
                    var xpath = '/model/pending/data/' + indicatorSet + '/' + elementpath;
                    var itemValue = JSON.xpath(xpath, indObject, {})[0];
                    value = value + itemValue;
                    break;

                case 'profileObjectWrapper':

                    var indicatorSet = elements[i].profileObjectWrapper.indicatorSetId;
                    var indObject = JSON.xpath("/indicators[category/term eq 'appProfile']", app.SCOPE.workflow, {})[0];
                    var elementpath = replaceAll(elements[i].profileObjectWrapper.wrapperElementId, "[.]", "/")
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

        } else if (data.subProcess != undefined) {

            if (data.subProcess.path != undefined) {

                var path = data.subProcess.path;
                var arr = path.split(".");
                var pathItems = "";
                for (var i = 0; i < arr.length; i++) {
                    pathItems = pathItems + "['" + arr[i] + "']";
                }
                var subprocess = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];
                var value = eval("subprocess" + pathItems);
                resolve(value)

            } else if (data.subProcess.stepUser != undefined) {

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
    return new Promise(function(resolve, reject) {
        // Uncomment below section when ready to implement
        var completed = [];
        try {
            util.syncLoop(prerequisites.length, function(loop) {
                var counter = loop.iteration();
                preRequisite(prerequisites[counter], _WFInstance, spuuid).then(function(data) {
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
function preRequisite(prerequisite, _WFInstance, spuuid) {
    return new Promise(function(resolve, reject) {



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
                fullPath = "count(/subprocesses[id eq '" + _subprocessId + "' and _id = " + part + "]" + innerXpath + ")";
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

            if (scope == "profile") {

                var profileId = _WFInstance.profile;
                fileName = profileId + ':variables';

            } else if (scope == "subProfileSubProcessInstance") {

                var subProfileId = app.profile.subprofileId;
                fileName = subProfileId + ':variables';

            } else {
                reject("ERROR: Scope '" + scope + "' not implemented in pre-requisites");
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
                        seq = JSON.xpath("count(/subprocesses[_id eq '" + spuuid + "']/preceding-sibling::node()[id = /subprocesses[_id eq '" + spuuid + "']/id and _id = /subprocesses[_id = " + part + "]/_id])", _WFInstance, {})[0] + 1;
                    }
                    var valuePath = "/" + variableName + "[" + seq + "]/value";
                    subjectValueCalculated = JSON.xpath(valuePath, file, {})[0];

                } else if (typeof obj == 'string') {

                    subjectValueCalculated = obj;

                }


                var inputValue = prerequisite.check.variable.value.data;
                var inputDataType = prerequisite.check.variable.value.dataType.dataType;

                var finalValue;
                if (inputDataType == 'number') {
                    finalValue = Number(inputValue);
                } else if (inputDataType == 'string') {
                    finalValue = inputValue;
                } else if (inputDataType == 'integer') {
                    finalValue = parseInt(inputValue);
                } else if (inputDataType == 'decimal') {
                    finalValue = parseFloat(inputValue);
                } else if (inputDataType == 'date' || inputDataType == 'dateTime') {
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
    return new Promise(function(resolve, reject) {
        var completed = [];
        try {

            var spObject = JSON.xpath("/subprocesses[_id eq '" + spuuid + "']", _WFInstance, {})[0];
            var processID = spObject["meta-data"].processConfigId;
            var processId = spObject["meta-data"].subProcessConfigId;
            var processSEQ = spObject["meta-data"].subProcessInsSeq;
            var processSeq = spObject["meta-data"].subProcessInsSeq;

            var subProcessConfigObject = JSON.xpath("/processes[_id eq '" + processID + "']/subProcesses[_id eq '" + processId + "']", _WFInstance.config, {})[0];
            var stepObject = JSON.xpath("/subprocesses[_id eq '" + spuuid + "']/step", _WFInstance, {})[0];
            util.syncLoop(preActions.length, function(loop) {
                var counter = loop.iteration();
                action(preActions[counter], processID, processSEQ, processId, processSeq, subProcessConfigObject, stepObject, _WFInstance, {}, spuuid).then(function(data) {
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
function subProcess(uuid, processId, processSeq, subProcessId, subProcessSeq, subprofileId, data, _WFInstance) {
    // Get the current process subProcess instance
    // var subProcessSeq = 1;
    var subProcess = [];
    var processConf = [];
    var subProcessConf = [];
    
    
    // _WFInstance.instance.processes.filter(function(objProcess) {
    //     if (objProcess.id == processId && objProcess.seq == processSeq) {
    //         var spLength = objProcess.subProcesses.length;
    //         objProcess.subProcesses.filter(function(objSubProcess) {
    //             if (objSubProcess.id == subProcessId && objSubProcess.seq == subProcessSeq) {
    //                 var uuid = objSubProcess.uuid;
    //                 _WFInstance.subprocesses.filter(function(subProcessItem) {
    //                     if (subProcessItem._id == uuid) {
    //                         subProcess = subProcessItem;
    //                     }

    //                 })
    //             }
    //         });
    //     }

    // });

    // NOTE: incoming uuid will be used in case of new subprocess creation
    _WFInstance.subprocesses.filter(function(subProcessItem) {
        if (subProcessItem._id == uuid) {
            subProcess = subProcessItem;
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

        var cardIndList = '';
        for (var i = 0; i < subProcessConf.indicators.length - 1; i++) {
            cardIndList = cardIndList + "'" + subProcessConf.indicators[i]._id + "',";
        }
        cardIndList = cardIndList + "'" + subProcessConf.indicators[i]._id + "'";
        var singleCard = JSON.xpath("/indicators[setId = (" + cardIndList + ") and cardinality eq 'single']", app.SCOPE.APP_CONFIG, {}).length;

        if (subProcessConf.instanceType.newSequence != undefined || singleCard > 0) {
            var previousObject = JSON.xpath("/instance/processes[id eq '" + processId + "']", _WFInstance, {})[0];
            if (previousObject != undefined && previousObject.subProcesses.length > 0) {
                groupKey = previousObject.subProcesses[0].groupKey;
            } else {
                groupKey = generateUUID();
            }
        } else {
            groupKey = generateUUID();

        }
    }

    var countSubprocessInContext = JSON.xpath("count(/processes/subProcesses[groupKey eq '" + groupKey + "'])", _WFInstance.instance, {})[0];
    var label = data.label;
    var subProcessObjectId = uuid;






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
            subprofileId: subprofileId == undefined ? '' : subprofileId,
            processConfigId: processId,
            subProcessConfigId: subProcessId,
            subProcessInsSeq: countSubprocessInContext + 1
        },
        messages: [],
        spStatus: ''
    };

    if (app.profile.subprofileId != undefined && app.profile.subprofileId != "") {
        model.channels.push("profile_" + app.SCOPE.profileId + "_subprofile_" + app.profile.subprofileId);
        model.channels.push("subprofile_" + app.profile.subprofileId);
    } else {
        model.channels.push("profile_" + app.SCOPE.profileId + "_subprofile_" + 0);
        model.channels.push("subprofile_" + 0);
    }

    _WFInstance.subprocesses.push(model);
    // Return a promise
    return new Promise(function(resolve, reject) {
        // Catch all uncaught errors
        try {
            // 1. Process the pre-actions
            var preActionsConf = processConf.preActions;
            //action(actions[counter], processId, processSeq, subProcessId, subProcessSeq, subProcess, step, _WFInstance, data, uuid)
            preActions(preActionsConf, _WFInstance, subProcessObjectId).then(function(result) {
                // 2. Process the pre-requisites
                var prerequisiteConf = processConf.prerequisites;
                preRequisites(prerequisiteConf, _WFInstance, subProcessObjectId).then(function(result) {
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
                                console.log("Step execution complete");
                                console.log(result);

                                model.step = result.data;
                                indicators(subProcessConf.indicators, _WFInstance, model._id).then(function(result1) {
                                    model.indicators = result1.data;
                                    console.log("indicators function execution complete");
                                    console.log(result1);


                                    // Execute the transitions, if auto
                                    //Subprocess postActions removed from here as they should be executed at the end of the subProcess, means at last step after transition, just before finish.

                                    // Can add history object here in case for first step, i.e initialisation
                                    // model.history.push(result.data);


                                    var success = util.success(result1.message, model);
                                    resolve(success);


                                }, function(err) {
                                    reject(err);
                                })
                            }, function(err) {

                                console.log('err == ');
                                console.log(err);

                                console.log(data);
                                console.log(_WFInstance);
                                console.log(subProcessObjectId);



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
            start: '',
            due: '',
            closed: ''
        }

    };

    return new Promise(function(resolve, reject) {
        var init = function() {

            if (initiate.user != undefined) {
                result.dates.created = data.createdDate;
                if (initiate.user.validDate._type == 'userSelected' || initiate.user.validDate._type == 'autoSelected') {
                    if (data.validDate != undefined) {
                        result.dates.valid = data.validDate;
                    } else {
                        result.dates.valid = new Date().toISOString().substring(0, 10);
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
            dateTime: '',
            type: '',
            dueDateTime: '',
            by: ''
        },
        assignmentHistory: [],
        dateTimeCreated: moment().format(),
        dueDateTime: moment().format(),
        transition: {
            transitionId: '',
            dateTime: '',
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
    return new Promise(function(resolve, reject) {
        try {
            //Get the current subProcess instance data
            
            // _WFInstance.instance.processes.filter(function(objProcess) {
            //     if (objProcess.id == processId && objProcess.seq == processSeq) {
            //         objProcess.subProcesses.filter(function(objSubProcess) {
            //             if (objSubProcess.id == subProcessId && objSubProcess.seq == subProcessSeq) {
            //                 uuid = objSubProcess.uuid;
            //             }
            //         })
            //     }
            // });

            _WFInstance.subprocesses.filter(function(subProcessItem) {
                if (subProcessItem._id == app.SCOPE.processUUID) {
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

            var updateSPIndicatorObject = function(indicators, _WFInstance) {
                if (indicators.length > 0) {
                    for (var i = 0; i < indicators.length; i++) {
                        var indicatorObject = indicators[i];
                        var uuid = indicatorObject.instances[0].uuid;
                        var updatedSeq = JSON.xpath("/indicators[_id eq '" + uuid + "']/model/pending/seq", _WFInstance, {})[0];
                        indicatorObject.instances[0].seq = updatedSeq;
                    }
                }
            };
            var clearSPStatus = function(spuuid) {
                var obj = JSON.xpath("/subprocesses[_id eq '" + spuuid + "']", _WFInstance, {})[0];
                obj.spStatus = "";
            };

            indicatorDocs(processId, indicators, model, _WFInstance).then(function(result) {
                uuid = spuuid;

                if (step.function.actions != undefined) {
                    actions(step.function.actions, processId, processSeq, subProcessId, subProcessSeq, subProcess, model, _WFInstance, data, spuuid)
                        .then(function(result) {
                            var assignee = model.assignedTo;

                            assignee.name = LOCAL_SETTINGS.SESSION.firstName + " " + LOCAL_SETTINGS.SESSION.lastName;
                            assignee.userId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId + "";
                            assignee.dateTime = moment().format();
                            assignee.type = ASSIGNMENT_TYPE_AUTO;
                            assignee.dueDateTime = '';
                            assignee.by = LOCAL_SETTINGS.SUBSCRIPTIONS.userId + "";



                            updateSPIndicatorObject(indicators, _WFInstance);
                            var transitionId = step.transition[0]._id;
                            transition(processId, processSeq, subProcessId, subProcessSeq, stepId, transitionId, data, _WFInstance, spuuid, model).then(function(result) {
                                var success = util.success('Transition completed successfully.', result.data.step);
                                resolve(success);
                            }, function(err) {
                                reject(err);
                            });
                        }, function(err) {
                            console.log('err from actions()');
                            console.log(err);
                            reject(err);
                        })

                } else if (step.function.task != undefined) {
                    // Make assignments
                    task(processId, processSeq, step.function.task, spuuid, model).then(function(result) {

                        updateSPIndicatorObject(indicators, _WFInstance);
                        var success = util.success('Task awaiting user action.', model);
                        resolve(success);
                    }, function(err) {
                        reject(err);
                    });

                } else if (step.function.server != undefined) {
                    // Make assignments
                    clearSPStatus(spuuid);
                    server(step.function.server, processId, processSeq, subProcessId, subProcessSeq, subProcess, model, _WFInstance, data, spuuid).then(function(result) {

                        updateSPIndicatorObject(indicators, _WFInstance);
                        var success = util.success('Server awaiting server response.', model);
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
            console.log("indicator function");
            console.log(array);

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
    return new Promise(function(resolve, reject) {
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

            _WFInstance.subprocesses.filter(function(subProcessItem) {
                if (subProcessItem._id == uuid) {
                    //Added to hstory
                    if (subProcessItem.step.assignmentHistory == undefined) {
                        subProcessItem.step.assignmentHistory = [];
                    }
                    if (subProcessItem.step.assignedTo.userId != "" && subProcessItem.step.assignedTo.name != "") {
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
                    //Send assign user notification from here

                    var notification = JSON.xpath("/processes[_id eq '" + processId + "']/notifications", _WFInstance.config, {})[0];

                    if (notification != undefined && notification.reAssignment != undefined) {

                        actionsModule.notification.reAssignmentNotification(notification, _WFInstance, uuid, user).then(
                            function(success) {
                                var success = util.success('User assigned successfully. UserId: "' + user.id + '", Name: "' + user.name + '"', subProcessItem);
                                resolve(success);
                            }).catch(
                            function(fail) {
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
            var methodPossibleItems = ["form", "indicator", "profile", "subProcessInstance", "step", "community", "application", "user", "sdo", "performance", "taxonomy", "variables", "notification", "report", "worker", "participants"];
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
                        form.authorise(args).then(function(result) {

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

                            form.create(args).then(function(result) {
                                resolve(result.data);
                            }, function(err) {
                                reject(err);
                            });



                            //Ed creation of new sequence



                        }, function(err) {
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

                    } else if (action.method.indicator.setWrapperElement != undefined) {

                        var path = action.method.indicator.setWrapperElement.path;
                        var indicatorSetId = action.method.indicator.setWrapperElement.indicatorSetId;

                        helper.getNodeValue(action.method.indicator.setWrapperElement.data, _WFInstance, uuid).then(function(dataValue) {

                            var args = [];
                            args.push(_WFInstance);
                            args.push(uuid);
                            args.push(path);
                            args.push(dataValue);
                            args.push(indicatorSetId);

                            form.updateIndicatorWrapper(args).then(function(result) {
                                resolve(result.data);
                            }, function(err) {
                                reject(err);
                            });

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

                    } else if (action.method.profile.setStatusTo != undefined) {

                        var args = [];
                        var status = action.method.profile.setStatusTo;

                        args.push(_WFInstance);
                        args.push(uuid);
                        args.push(status);

                        form.setStatus(args).then(function(result) {
                            resolve(result.data);
                        }, function(err) {
                            reject(err);
                        });

                    }

                    break;
                case 'subProcessInstance':
                    var spPossibleItems = ["instantiate", "authorise", "close", "setVariable", "setStatusTo", "setStatusMsgTo", "setTitle", "setValidDate", "setSPStatus"];
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


                        case 'setSPStatus':
                            helper.getNodeValue(action.method.subProcessInstance.setSPStatus, _WFInstance, uuid).then(function(dataValue) {
                                actionsModule.subProcessInstance.setSPStatus(action.method.subProcessInstance.setSPStatus, uuid, dataValue, _WFInstance).then(function(result) {
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
                    var userPossibleItems = ["addToRole"];
                    switch (propertyExists(action.method.user, userPossibleItems)) {
                        case 'addToRole':
                            return actionsModule.user.addToRole(action.method.user.addToRole, uuid, _WFInstance).then(function(result) {
                                resolve(result.data);
                            }, function(err) {
                                reject(err);
                            });
                    }
                    break;
                case 'sdo':
                    var sdoPossibleItems = ["create", "enrollCourse"];
                    switch (propertyExists(action.method.sdo, sdoPossibleItems)) {

                        case 'create':
                            return actionsModule.sdo.create(action.method.sdo.create, uuid, _WFInstance).then(function(result) {
                                resolve(result.data);
                            }, function(err) {
                                reject(err);
                            });
                        case 'enrollCourse':
                            return actionsModule.sdo.enrollCourse(action.method.sdo.enrollCourse, uuid, _WFInstance).then(function(result) {
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
                    var performancePossibleItems = ["unlockPeriod", "lockPerformanceModel", "setModelStatus"];
                    switch (propertyExists(action.method.performance, performancePossibleItems)) {


                        case 'unlockPeriod':
                            return actionsModule.performance.unlockPeriod(action.method.performance.unlockPeriod, uuid, _WFInstance).then(function(result) {
                                resolve(result.data);
                            }, function(err) {
                                reject(err);
                            });
                        case 'setModelStatus':
                            return actionsModule.performance.setModelStatus(action.method.performance.setModelStatus, uuid, _WFInstance).then(function(result) {
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
                case 'notification':

                    return actionsModule.notification.sendNotificationWorker(action.method.notification, _WFInstance, uuid).then(function(result) {
                        resolve(result.data);
                    }, function(err) {
                        reject(err);
                    });
                    break;

                case 'report':
                    /**
                     * 
                     */
                    var reportPossibleItems = ["createPerformanceReport", "createReport", "sdoReport", "executeReport", "requestReport", "generateView", "generateBasicView", "generateUnionView", "sdoReportMultiple", "subprofileQuarterlyReport"];

                    switch (propertyExists(action.method.report, reportPossibleItems)) {

                        case 'createPerformanceReport':
                            return actionsModule.report.createPerformanceReport(action.method.report.createPerformanceReport, _WFInstance, uuid).then(function(result) {
                                resolve(result.data);
                            }, function(err) {
                                reject(err);
                            });

                        case 'createReport':
                            return actionsModule.report.createReport(action.method.report.createReport, _WFInstance, uuid).then(function(result) {
                                resolve(result.data);
                            }, function(err) {
                                reject(err);
                            });
                        case 'sdoReport':
                            return actionsModule.report.sdoReport(action.method.report.sdoReport, _WFInstance, uuid).then(function(result) {
                                resolve(result.data);
                            }, function(err) {
                                reject(err);
                            });
                        case 'executeReport':
                            return actionsModule.report.executeReport(action.method.report.executeReport, _WFInstance, uuid).then(function(result) {
                                resolve(result.data);
                            }, function(err) {
                                reject(err);
                            });
                        case 'generateView':
                            return actionsModule.report.generateView(action.method.report.generateView, _WFInstance, uuid).then(function(result) {
                                resolve(result.data);
                            }, function(err) {
                                reject(err);
                            });
                        case 'requestReport':
                            return actionsModule.report.requestReport(action.method.report.requestReport, _WFInstance, uuid).then(function(result) {
                                resolve(result.data);
                            }, function(err) {
                                reject(err);
                            });
                        case 'generateBasicView':
                            return actionsModule.report.generateBasicView(action.method.report.generateBasicView, _WFInstance, uuid).then(function(result) {
                                resolve(result.data);
                            }, function(err) {
                                reject(err);
                            });
                        case 'generateUnionView':
                            return actionsModule.report.generateUnionView(action.method.report.generateUnionView, _WFInstance, uuid).then(function(result) {
                                resolve(result.data);
                            }, function(err) {
                                reject(err);
                            });

                        case 'sdoReportMultiple':
                            return actionsModule.report.sdoReportMultiple(action.method.report.sdoReportMultiple, _WFInstance, uuid).then(function(result) {
                                resolve(result.data);
                            }, function(err) {
                                reject(err);
                            });
                        case 'subprofileQuarterlyReport':
                            return actionsModule.report.subprofileQuarterlyReport(action.method.report.subprofileQuarterlyReport, _WFInstance, uuid).then(function(result) {
                                resolve(result.data);
                            }, function(err) {
                                reject(err);
                            });


                        default:
                            reject("No method found from implemented list.");
                            break;
                    }

                    break;

                case 'worker':
                    var workerPossibleItems = ["sendWorker", "executeLocal", "create"];
                    switch (propertyExists(action.method.worker, workerPossibleItems)) {

                        case 'sendWorker':

                            return actionsModule.worker.sendWorker(action.method.worker.sendWorker, _WFInstance, uuid).then(function(result) {
                                resolve(result.data);
                            }, function(err) {
                                reject(err);
                            });

                        case 'executeLocal':

                            return actionsModule.worker.executeLocal(action.method.worker.executeLocal, _WFInstance, uuid).then(function(result) {
                                resolve(result.data);
                            }, function(err) {
                                reject(err);
                            });

                        case 'create':

                            return actionsModule.worker.create(action.method.worker.create, _WFInstance, uuid).then(function(result) {
                                resolve(result.data);
                            }, function(err) {
                                reject(err);
                            });

                        default:
                            reject("No method found from implemented list.");
                            break;
                    }

                    break;



                case 'participants':
                    /**
                     * 
                     */
                    var participantPossibleItems = ["linkParticipants", "monthlyAttendance", "monthlyProgressSummary", "participantContracts"];

                    switch (propertyExists(action.method.participants, participantPossibleItems)) {

                        case 'linkParticipants':
                            return actionsModule.participants.linkParticipants(action.method.participants.linkParticipants, _WFInstance, uuid).then(function(result) {
                                resolve(result.data);
                            }, function(err) {
                                reject(err);
                            });

                        case 'monthlyAttendance':
                            return actionsModule.participants.monthlyAttendance(action.method.participants.monthlyAttendance, _WFInstance, uuid).then(function(result) {
                                resolve(result.data);
                            }, function(err) {
                                reject(err);
                            });

                        case 'monthlyProgressSummary':
                            return actionsModule.participants.monthlyProgressSummary(action.method.participants.monthlyProgressSummary, _WFInstance, uuid).then(function(result) {
                                resolve(result.data);
                            }, function(err) {
                                reject(err);
                            });
                        case 'participantContracts':
                            return actionsModule.participants.participantContracts(action.method.participants.participantContracts, _WFInstance, uuid).then(function(result) {
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

        var _WFInstance = app.SCOPE.workflow;
        var preActionsConf = task.preActions;
        preActions(preActionsConf, _WFInstance, spuuid).then(function(preActionResult) {

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

                library.getUsersListByRole(id, role).then(function(list) {
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

                            if (isCurrentUserRole1 > -1 || isCurrentUserRole2 > -1 || isCurrentUserRole3 > -1 || isCurrentUserRole4 > -1 || isCurrentUserRole5 > -1) {
                                isCurrentUserExistInGivenRole = true;
                            } else {
                                isCurrentUserExistInGivenRole = false;
                            }

                            if (isCurrentUserExistInGivenRole) {
                                if (model.assignmentHistory == undefined) {
                                    model.assignmentHistory = [];
                                }
                                var assignee = model.assignedTo;
                                if (assignee.userId != "" && assignee.name != "") {
                                    var newObj = JSON.parse(JSON.stringify(assignee));
                                    model.assignmentHistory.push(newObj);
                                }


                                assignee.name = LOCAL_SETTINGS.SESSION.firstName + " " + LOCAL_SETTINGS.SESSION.lastName;
                                assignee.userId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId + "";
                                assignee.dateTime = moment().format();
                                assignee.type = ASSIGNMENT_TYPE_AUTO;
                                assignee.dueDateTime = '';
                                assignee.by = LOCAL_SETTINGS.SUBSCRIPTIONS.userId + "";

                                // Notification that its been automatically assigned to you
                                //Send assign user notification from here
                                var notification = JSON.xpath("/processes[_id eq '" + subprocessID + "']/notifications", _WFInstance.config, {})[0];
                                if (notification != undefined && notification.assignment != undefined) {
                                    var user = { 'id': LOCAL_SETTINGS.SUBSCRIPTIONS.userId, 'name': LOCAL_SETTINGS.SUBSCRIPTIONS.username };
                                    actionsModule.notification.assignmentNotification(notification, _WFInstance, spuuid, user).then(
                                        function(success) {
                                            console.log('User assigned successfully. UserId: "' + user.id + '", Name: "' + user.name + '"');
                                        }
                                    ).catch(
                                        function(fail) {
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
                                    preWorkActions(preWorkActionsObj, _WFInstance).then(function(success) {
                                        resolve('Assignment is made. Pre work actions found and executed ');
                                    }, function(err) {
                                        reject(err);
                                    });

                                } else {
                                    resolve('Assignment is made. No pre work actions found. ');
                                }

                            } else {

                                // Notification that its been released for acceptance

                                var notification = JSON.xpath("/processes[_id eq '" + subprocessID + "']/notifications", _WFInstance.config, {})[0];
                                //issue here
                                if (notification != undefined && notification.assignmentAcceptance != undefined) {
                                    var user = { 'id': LOCAL_SETTINGS.SUBSCRIPTIONS.userId, 'name': LOCAL_SETTINGS.SUBSCRIPTIONS.username };
                                    actionsModule.notification.acceptanceNotification(notification, _WFInstance, spuuid, role).then(
                                        function(success) {
                                            console.log('User assigned successfully. UserId: "' + user.id + '", Name: "' + user.name + '"');
                                            resolve('Notifications request submitted for acceptance.');
                                        }
                                    ).catch(
                                        function(fail) {
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

                            if (model.assignmentHistory == undefined) {
                                model.assignmentHistory = [];
                            }

                            var assignee = model.assignedTo;
                            if (assignee.userId != "" && assignee.name != "") {
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

                            var notification = JSON.xpath("/processes[_id eq '" + subprocessID + "']/notifications", _WFInstance.config, {})[0];
                            if (notification != undefined && notification.assignment != undefined) {
                                var user = { 'id': userId, 'name': username };
                                actionsModule.notification.assignmentNotification(notification, _WFInstance, spuuid, user).then(
                                    function(success) {
                                        console.log('User assigned successfully. UserId: "' + user.id + '", Name: "' + user.name + '"');
                                    }
                                ).catch(
                                    function(fail) {
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
                                preWorkActions(preWorkActionsObj, _WFInstance).then(function(success) {
                                    resolve('Assigned to the only user in role. Pre work actions executed');
                                }, function(err) {
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

                }, function(err) {
                    console.log('Error in getUsersListByRole');
                    reject(err);
                });
            } else if (task.assign.user != undefined) {

                helper.getNodeValue(task.assign.user.userName, _WFInstance, spuuid).then(function(userName) {
                    helper.getNodeValue(task.assign.user.userId, _WFInstance, spuuid).then(function(userId) {

                        var userId = userId;
                        var username = userName;

                        if (model.assignmentHistory == undefined) {
                            model.assignmentHistory = [];
                        }

                        var assignee = model.assignedTo;
                        if (assignee.userId != "" && assignee.name != "") {
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
                        var notification = JSON.xpath("/processes[_id eq '" + subprocessID + "']/notifications", _WFInstance.config, {})[0];
                        if (notification != undefined && notification.assignment != undefined) {
                            var user = { 'id': userId, 'name': username };
                            actionsModule.notification.assignmentNotification(notification, _WFInstance, spuuid, user).then(
                                function(success) {
                                    console.log('User assigned successfully. UserId: "' + user.id + '", Name: "' + user.name + '"');
                                }
                            ).catch(
                                function(fail) {
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
                            preWorkActions(preWorkActionsObj, _WFInstance).then(function(success) {
                                resolve('Assigned to the only user in role. Pre work actions executed');
                            }, function(err) {
                                reject(err);
                            });

                        } else {
                            resolve('Assigned to the only user in role. No pre work actions found.');
                        }
                    }, function(err) {
                        reject(err);
                    });

                }, function(err) {
                    reject(err);
                });

            } else if (task.assign.swimlane != undefined) {

                var stepId = task.assign.swimlane.stepId;
                var sequence = task.assign.swimlane.sequence;

                var subProcess = JSON.xpath("/subprocesses[_id eq '" + spuuid + "']", _WFInstance, {})[0];
                var historyList = JSON.xpath("/history[id eq '" + stepId + "']", subProcess, {});
                var dateSearch = '';
                if (sequence == 'last') {
                    dateSearch = JSON.xpath("max(for $s in /* return xs:dateTime($s/dateTimeCreated))", historyList, {})[0];
                } else {
                    dateSearch = JSON.xpath("min(for $s in /* return xs:dateTime($s/dateTimeCreated))", historyList, {})[0];
                }
                var historyObject = JSON.xpath("/*[dateTimeCreated eq '" + dateSearch + "']", historyList, {})[0];
                var assignmentObject = JSON.xpath("/assignmentHistory[last()]", historyObject, {})[0];

                var userId = assignmentObject.userId;
                var username = assignmentObject.name;

                if (model.assignmentHistory == undefined) {
                    model.assignmentHistory = [];
                }

                var assignee = model.assignedTo;
                if (assignee.userId != "" && assignee.name != "") {
                    var newObj = JSON.parse(JSON.stringify(assignee));
                    model.assignmentHistory.push(newObj);
                }
                assignee.name = username + "";
                assignee.userId = userId + "";
                assignee.dateTime = moment().format();
                assignee.type = ASSIGNMENT_TYPE_SWIMLANE;
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
                var notification = JSON.xpath("/processes[_id eq '" + subprocessID + "']/notifications", _WFInstance.config, {})[0];
                if (notification != undefined && notification.assignment != undefined) {
                    var user = { 'id': userId, 'name': username };
                    actionsModule.notification.assignmentNotification(notification, _WFInstance, spuuid, user).then(
                        function(success) {
                            console.log('User assigned successfully. UserId: "' + user.id + '", Name: "' + user.name + '"');
                        }
                    ).catch(
                        function(fail) {
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
                    preWorkActions(preWorkActionsObj, _WFInstance).then(function(success) {
                        resolve('Assigned to the only user in role. Pre work actions executed');
                    }, function(err) {
                        reject(err);
                    });

                } else {
                    resolve('Assigned to the only user in role. No pre work actions found.');
                }
            }
        }, function(err) {
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

    return new Promise(function(resolve, reject) {

        //var _WFInstance = app.SCOPE.workflow;
        var profileId = _WFInstance.profile;
        var actionBlock = server.serverAction[0];
        if (model.assignmentHistory == undefined) {
            model.assignmentHistory = [];
        }

        var assignee = model.assignedTo;
        if (assignee.userId != "" && assignee.name != "") {
            var newObj = JSON.parse(JSON.stringify(assignee));
            model.assignmentHistory.push(newObj);
        }
        assignee.name = LOCAL_SETTINGS.SESSION.firstName + " " + LOCAL_SETTINGS.SESSION.lastName;
        assignee.userId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId + "";
        assignee.dateTime = moment().format();
        assignee.type = ASSIGNMENT_TYPE_AUTO;
        assignee.dueDateTime = '';
        assignee.by = LOCAL_SETTINGS.SUBSCRIPTIONS.userId + "";

        action(actionBlock, processId, processSeq, subProcessId, subProcessSeq, subProcess, model, _WFInstance, data, uuid)
            .then(function(result) {
                resolve("No users found in list. Assigning blank ");
            }, function(err) {
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




            var maxSteps = currentSubProcess[0].steps.length;
            var spinstanceObject = JSON.xpath("/subprocesses[_id eq '" + spuuid + "']", _WFInstance, {})[0];
            var spInstanceStepObject = JSON.xpath("/subprocesses[_id eq '" + spuuid + "']/step", _WFInstance, {})[0];

            // Adding step Object in subprocess history From second step. As first step is added at subProcess() function 
            if (spinstanceObject.history == undefined) {
                spinstanceObject.history = [];
            }
            var pushIndicatorToModel = function(model) {

                // In both  the cases the list is differnet that needs to be made same.

                var indicatorList = JSON.xpath("/subprocesses[_id eq '" + spuuid + "']/indicators", _WFInstance, {});
                var isFirst = false;
                if (indicatorList == undefined || indicatorList.length == 0) {
                    isFirst = true;
                    indicatorList = JSON.xpath("/indicators[workflows/processes[subProcessUUID eq '" + spuuid + "']]", _WFInstance, {});
                }
                if (model.indicators == undefined) {
                    model.indicators = [];
                }
                for (var j = 0; j < indicatorList.length; j++) {

                    if (isFirst) {

                        var uuid = indicatorList[j]._id;
                        var rev = JSON.xpath("/indicators[_id eq '" + uuid + "']/_rev", _WFInstance, {})[0];
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
                        var rev = JSON.xpath("/indicators[_id eq '" + uuid + "']/_rev", _WFInstance, {})[0];
                        var seq = JSON.xpath("/indicators[_id eq '" + uuid + "']/model/pending/seq", _WFInstance, {})[0];
                        var status = JSON.xpath("/indicators[_id eq '" + uuid + "']/model/pending/status", _WFInstance, {})[0];
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
            var trnObject = {
                transitionId: transition[0]._id,
                dateTime: moment().format(),
                userId: LOCAL_SETTINGS.SUBSCRIPTIONS.userId + ""
            }
            if (model != undefined && Object.keys(model).length > 0) {
                model.transition = trnObject;
            } else {
                spInstanceStepObject.transition = trnObject;
            }

            // copy current assignedTo to reAssignment object

            if (model != undefined && Object.keys(model).length > 0) {
                if (model.assignmentHistory == undefined) {
                    model.assignmentHistory = [];
                }
                var assigneeObj = JSON.parse(JSON.stringify(model.assignedTo));
                if (assigneeObj.userId != "" && assigneeObj.name != "") {
                    model.assignmentHistory.push(assigneeObj);
                }

            } else {
                if (spInstanceStepObject.assignmentHistory == undefined) {
                    spInstanceStepObject.assignmentHistory = [];
                }
                var assigneeObj = JSON.parse(JSON.stringify(spInstanceStepObject.assignedTo));
                if (assigneeObj.userId != "" && assigneeObj.name != "") {
                    spInstanceStepObject.assignmentHistory.push(assigneeObj);
                }

            }
            var historyModel;
            if (model != undefined && Object.keys(model).length > 0) {
                historyModel = JSON.parse(JSON.stringify(model));
            } else {
                historyModel = JSON.parse(JSON.stringify(spInstanceStepObject));
            }
            var indModelInStep = pushIndicatorToModel(historyModel);
            spinstanceObject.history.push(indModelInStep);

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
                    if (goToStepSeq == maxSteps || result.data.status == 'Complete') {

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

                // As this is the last step (where stop is defied) , subProcess postActions should come here.

                var postActionsConf = currentProcess[0].postActions;
                postActions(postActionsConf, _WFInstance, spuuid).then(function(result) {

                    var success = util.success('Step transition completed successfully.Workflow stopped.', {
                        subProcessComplete: true,
                        step: model
                    });
                    resolve(success);

                }, function(err) {
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
    return new Promise(function(resolve, reject) {
        var completed = [];
        try {


            var spObject = JSON.xpath("/subprocesses[_id eq '" + spuuid + "']", _WFInstance, {})[0];
            var processID = spObject["meta-data"].processConfigId;
            var processId = spObject["meta-data"].subProcessConfigId;
            var processSEQ = spObject["meta-data"].subProcessInsSeq;
            var processSeq = spObject["meta-data"].subProcessInsSeq;

            var subProcessConfigObject = JSON.xpath("/config/processes[_id eq '" + processID + "']/subProcesses[_id eq '" + processId + "']", _WFInstance, {})[0];
            var stepObject = JSON.xpath("/subprocesses[_id eq '" + spuuid + "']/step", _WFInstance, {})[0];


            util.syncLoop(postActions.length, function(loop) {
                var counter = loop.iteration();
                action(postActions[counter], processID, processSEQ, processId, processSeq, subProcessConfigObject, stepObject, _WFInstance, {}, spuuid).then(function(data) {
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
    return new Promise(function(resolve, reject) {
        var completed = [];
        try {
            var subProcessConfigObject = JSON.xpath("/config/processes[_id eq '" + app.SCOPE.spo.pObject.id + "']/subProcesses[_id eq '" + app.SCOPE.spo.spObject.id + "']", _WFInstance, {})[0];
            var stepObject = JSON.xpath("/subprocesses[_id eq '" + app.SCOPE.processUUID + "']/step", _WFInstance, {})[0];
            util.syncLoop(preWorkActions.length, function(loop) {
                var counter = loop.iteration();
                action(preWorkActions[counter], app.SCOPE.spo.pObject.id, app.SCOPE.spo.pObject.seq, app.SCOPE.spo.spObject.id, app.SCOPE.spo.spObject.seq, subProcessConfigObject, stepObject, _WFInstance, {}, app.SCOPE.processUUID).then(function(data) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsImxpYi9hY3Rpb25zLmpzIiwibGliL2Zvcm0uanMiLCJsaWIvaGVscGVyLmpzIiwibGliL2ludGVyZmFjZS5qcyIsImxpYi9ub2RlVmFsdWUuanMiLCJsaWIvcHJvY2Vzcy5qcyIsIm5vZGVfbW9kdWxlcy91dGlsaXR5L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4N0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqNUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVpQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxd0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUHJvY2VzcyA9IHJlcXVpcmUoJy4vbGliL3Byb2Nlc3MnKTtcbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbGl0eScpO1xudmFyIHVzZXJJbnRlcmZhY2UgPSByZXF1aXJlKCcuL2xpYi9pbnRlcmZhY2UnKTtcbnZhciBoZWxwZXIgPSByZXF1aXJlKCcuL2xpYi9oZWxwZXInKTtcblxuXG4vKmdsb2JhbHMgKi9cblxuLyoqXG4gKiBBIG5ldyBXb3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZSBjb250YWlucyB0aGUgcmVmZXJlbmNlIHRvIHRoZSBhcHBsaWNhdGlvblxuICogYW5kIGFzc29jaWF0ZWQgcHJvZmlsZSB3aGljaCBpdCByZXF1aXJlcyBhcyB0aGUgZmlyc3QgdHdvIHBhcmFtZXRlcnMuIEl0IGFsc29cbiAqIHJlcXVpcmVzIGEgd29ya2Zsb3cgY29uZmlndXJhdGlvbiwgYXMgdGhlIHRoaXJkIHBhcmFtZXRlciwgd2hpY2ggaXMgdXNlZCB0b1xuICogZGVzY2liZSB0aGUgd29ya2Zsb3cgcHJvY2Vzc2VzLiBJZiBhIHdvcmtmbG93IGluc3RhbmNlIGV4aXN0cyB5b3UgY2FuIHBhc3MgaXRcbiAqIGluIGFzIHRoZSBmb3VydGggcGFyYW1ldGVyIHdoaWNoIGl0IHdpbGwgdGhlbiB1c2UsIGVsc2UgY3JlYXRlIGEgbmV3IG9uZS5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvZmlsZSAtIFRoZSBjdXJyZW50IHByb2ZpbGUgaWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBhcHAgLSBUaGUgYXNzb2NpYXRlZCBhcHBsaWNhdGlvbiBpZFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyAtIFRoZSBhcHBsaWNhdGlvbiB3b3JrZmxvdyBjb25maWd1cmF0aW9uIC8gZGVmaW5pdGlvblxuICogQHBhcmFtIHtPYmplY3R9IFtpbnN0YW5jZV0gLSBBbiBleGlzdGluZyBhcHBsaWNhdGlvbiBwcm9maWxlIHdvcmtmbG93IGluc3RhbmNlIGJhc2VkXG4gKiBvbiB0aGUgZGVmaW5pdGlvblxuICpcbiAqIEBhdXRob3IgQnJlbnQgR29yZG9uXG4gKiBAdmVyc2lvbiAwLjEuMFxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgY29uZmlnID0geyAnX2lkJzogJ2FiYzEyMycgfTtcblxuICogdmFyIGluc3RhbmNlID0geyAnX2lkJzogJ2luc3RhbmNlX2FiYzEyMycgfTtcblxuICogLy8gSWYgdGhlcmUgaXNuJ3QgYW4gZXhpc3RpbmcgaW5zdGFuY2VcbiAqIHZhciB3b3JrZmxvdyA9IG5ldyBXb3JrZmxvdygnMTIzNCcsICc1Njc4JywgY29uZmlnKTtcbiAqIC8vIElmIHRoZXJlIGlzIGFuIGV4aXN0aW5nIGluc3RhbmNlXG4gKiB2YXIgd29ya2Zsb3cgPSBuZXcgV29ya2Zsb3coJzEyMzQnLCAnNTY3OCcsIGNvbmZpZywgaW5zdGFuY2UpO1xuICpcbiAqIEByZXR1cm4ge09iamVjdH0gbmV3IFdvcmtmbG93IG9iamVjdFxuICpcbiAqIEB0aHJvd3MgRXJyb3I6IEEgcHJvZmlsZSBpZCBpcyByZXF1aXJlZFxuICogQHRocm93cyBFcnJvcjogQW4gYXBwIGlkIGlzIHJlcXVpcmVkXG4gKiBAdGhyb3dzIEVycm9yOiBBIHdvcmtmbG93IGNvbmZpZ3VyYXRpb24gaXMgcmVxdWlyZWRcbiAqXG4gKi9cblxuZnVuY3Rpb24gV29ya2Zsb3cocHJvZmlsZSwgY29tbXVuaXR5SWQsIGFwcCwgY29uZmlnKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIC8vIENvbW11bml0eSBJRCB2YWxpZGF0aW9uIGNoZWNrc1xuICAgIGlmIChjb21tdW5pdHlJZCA9PSAnJyB8fCBjb21tdW5pdHlJZCA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgdXRpbC5lcnJvcignUGFyYW1SZXF1aXJlZCcsICdBIGNvbW11bml0eSBpZCBpcyByZXF1aXJlZC4nKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZihjb21tdW5pdHlJZCkgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGNvbW11bml0eSBpZCBtdXN0IGJlIGEgamF2YXNjcmlwdCBzdHJpbmcuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgX3RoaXMuY29tbXVuaXR5SWQgPSBjb21tdW5pdHlJZCB8fCAnJztcbiAgICB9XG5cbiAgICAvLyBQcm9maWxlIElEIHZhbGlkYXRpb24gY2hlY2tzXG4gICAgaWYgKHByb2ZpbGUgPT0gJycgfHwgcHJvZmlsZSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgdXRpbC5lcnJvcignUGFyYW1SZXF1aXJlZCcsICdBIHByb2ZpbGUgaWQgaXMgcmVxdWlyZWQuJyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YocHJvZmlsZSkgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHByb2ZpbGUgaWQgbXVzdCBiZSBhIGphdmFzY3JpcHQgc3RyaW5nLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIF90aGlzLnByb2ZpbGUgPSBwcm9maWxlIHx8ICcnO1xuICAgIH1cblxuICAgIC8vIEFwcCBJRCB2YWxpZGF0aW9uIGNoZWNrc1xuICAgIGlmIChhcHAgPT0gJycgfHwgYXBwID09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyB1dGlsLmVycm9yKCdQYXJhbVJlcXVpcmVkJywgJ0FuIGFwcCBpZCBpcyByZXF1aXJlZC4nKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZihhcHApICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBhcHAgaWQgbXVzdCBiZSBhIGphdmFzY3JpcHQgc3RyaW5nLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIF90aGlzLmFwcCA9IGFwcCB8fCAnJztcbiAgICB9XG5cbiAgICAvLyBXb3JrZmxvdyBjb25maWd1cmF0aW9uIHZhbGlkYXRpb24gY2hlY2tzXG4gICAgaWYgKGNvbmZpZyA9PSAnJyB8fCBjb25maWcgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IHV0aWwuZXJyb3IoJ1BhcmFtUmVxdWlyZWQnLCAnQSB3b3JrZmxvdyBjb25maWd1cmF0aW9uIGlzIHJlcXVpcmVkLicpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mKGNvbmZpZykgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIF90aGlzLmNvbmZpZyA9IEpTT04ucGFyc2UoY29uZmlnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBfdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgfVxuXG4gICAgLy8gV29ya2Zsb3cgaW5zdGFuY2UgdmFsaWRhdGlvbiBjaGVja3NcbiAgICBfdGhpcy5pbnN0YW5jZTtcbiAgICAvLyBXb3JrZmxvdyBzdWItcHJvY2Vzc2VzIHZhbGlkYXRpb24gY2hlY2tzXG4gICAgX3RoaXMuc3VicHJvY2Vzc2VzID0gW107XG4gICAgLy8gV29ya2Zsb3cgaW5kaWNhdG9ycyBwbGFjZSBob2xkZXJcbiAgICBfdGhpcy5pbmRpY2F0b3JzID0gW107XG5cblxufVxuXG4vKipcbiAqIFdvcmtmbG93IGdldCBwcm9maWxlIGlkLlxuICpcbiAqIEBleGFtcGxlIFwiXCJcbiAqXG4gKiBAcmV0dXJuIFwiXCJcbiAqXG4gKi9cbldvcmtmbG93LnByb3RvdHlwZS5nZXRQcm9maWxlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvZmlsZTtcbn07XG5cbi8qKlxuICogV29ya2Zsb3cgZ2V0IGFwcCBpZC5cbiAqXG4gKiBAZXhhbXBsZSBcIlwiXG4gKlxuICogQHJldHVybiBcIlwiXG4gKlxuICovXG5Xb3JrZmxvdy5wcm90b3R5cGUuZ2V0QXBwID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwO1xufTtcblxuLyoqXG4gKiBXb3JrZmxvdyBnZXQgY29uZmlnLlxuICpcbiAqIEBleGFtcGxlIFwiXCJcbiAqXG4gKiBAcmV0dXJuIFwiXCJcbiAqXG4gKi9cbldvcmtmbG93LnByb3RvdHlwZS5nZXRDb25maWcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWc7XG59O1xuXG4vKipcbiAqIFdvcmtmbG93IGdldCBpbnN0YW5jZS5cbiAqXG4gKiBAZXhhbXBsZSBcIlwiXG4gKlxuICogQHJldHVybiBcIlwiXG4gKlxuICovXG5cbldvcmtmbG93LnByb3RvdHlwZS5nZXRJbnN0YW5jZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xufTtcblxuLyoqXG4gKiBXb3JrZmxvdyBzZXQgdGhlIGluc3RhbmNlIGRhdGEuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSB0aGUgd29ya2Zsb3cgcHJvY2VzcyBpbnN0YW5jZSBkYXRhXG4gKlxuICogQGV4YW1wbGUgXCJcIlxuICpcbiAqIEByZXR1cm4gXCJcIlxuICpcbiAqL1xuV29ya2Zsb3cucHJvdG90eXBlLnNldEluc3RhbmNlID0gZnVuY3Rpb24oZGF0YSkge1xuICAgIHRoaXMuaW5zdGFuY2UgPSBkYXRhO1xufTtcblxuLyoqXG4gKiBXb3JrZmxvdyBnZXQgc3ViLXByb2Nlc3NlcyBkYXRhLlxuICpcbiAqIEBleGFtcGxlIFwiXCJcbiAqXG4gKiBAcmV0dXJuIFwiXCJcbiAqXG4gKi9cbldvcmtmbG93LnByb3RvdHlwZS5nZXRTdWJQcm9jZXNzZXMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5zdWJwcm9jZXNzZXM7XG59O1xuXG4vKipcbiAqIFdvcmtmbG93IHNldCB0aGUgc3ViLXByb2Nlc3NlcyBkYXRhLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC0gdGhlIHdvcmtmbG93IHByb2Nlc3MgaW5zdGFuY2UgZGF0YVxuICpcbiAqIEBleGFtcGxlIFwiXCJcbiAqXG4gKiBAcmV0dXJuIFwiXCJcbiAqXG4gKi9cbldvcmtmbG93LnByb3RvdHlwZS5zZXRTdWJQcm9jZXNzZXMgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgdGhpcy5zdWJwcm9jZXNzZXMgPSBkYXRhO1xufTtcblxuLyoqXG4gKiBXb3JrZmxvdyBnZXQgaW5kaWNhdG9yIHNldCBkYXRhLlxuICpcbiAqIEBleGFtcGxlIFwiXCJcbiAqXG4gKiBAcmV0dXJuIFwiXCJcbiAqXG4gKi9cbldvcmtmbG93LnByb3RvdHlwZS5nZXRJbmRpY2F0b3JzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5kaWNhdG9ycztcbn07XG5cbi8qKlxuICogV29ya2Zsb3cgc2V0IHRoZSBpbmRpY2F0b3Igc2V0IGRhdGEuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSB0aGUgd29ya2Zsb3cgcHJvY2VzcyBpbnN0YW5jZSBkYXRhXG4gKlxuICogQGV4YW1wbGUgXCJcIlxuICpcbiAqIEByZXR1cm4gXCJcIlxuICpcbiAqL1xuV29ya2Zsb3cucHJvdG90eXBlLnNldEluZGljYXRvcnMgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgdGhpcy5pbmRpY2F0b3JzID0gZGF0YTtcbn07XG5cbi8qKlxuICogU2V0IHRoZSB2YXJpYWJsZSB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gcHJvY2VzcyBpZFxuICogQHBhcmFtIHtudW1iZXJ9IHByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2UgcHJvY2VzcyBzZXFcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdWJQcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdWItcHJvY2VzcyBpZFxuICogQHBhcmFtIHtudW1iZXJ9IHN1YlByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2Ugc3ViLXByb2Nlc3Mgc2VxXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RlcElkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3RlcCBpZFxuICogQHBhcmFtIHtPYmplY3R9IHZhcmlhYmxlIC0gdGhlIFdvcmtmbG93IHZhcmlhYmxlIG9iamVjdFxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuLy8gV29ya2Zsb3cucHJvdG90eXBlLnNldFZhcmlhYmxlID0gZnVuY3Rpb24ocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwgdmFyaWFibGUpe1xuLy8gXHR2YXIgX3RoaXMgPSB0aGlzO1xuLy8gXHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4vLyBcdFx0dHJ5IHtcbi8vIFx0XHRcdFByb2Nlc3MuZ2V0VmFyaWFibGUocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwgdmFyaWFibGUpLnRoZW4oZnVuY2lvbihyZXN1bHQpe1xuLy8gXHRcdFx0XHRyZXNvbHZlKHJlc3VsdC5kYXRhKTtcbi8vIFx0XHRcdH0sIGZ1bmN0aW9uKGVycil7XG4vLyBcdFx0XHRcdHJlamVjdChlcnIpO1xuLy8gXHRcdFx0fSlcbi8vIFx0XHR9IGNhdGNoIChlcnIpIHtcbi8vIFx0XHRcdHJlamVjdChlcnIpO1xuLy8gXHRcdH1cblxuLy8gXHR9KTtcbi8vIH07XG5cbi8qKlxuICogR2V0IHRoZSB2YXJpYWJsZSB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gcHJvY2VzcyBpZFxuICogQHBhcmFtIHtudW1iZXJ9IHByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2UgcHJvY2VzcyBzZXFcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdWJQcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdWItcHJvY2VzcyBpZFxuICogQHBhcmFtIHtudW1iZXJ9IHN1YlByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2Ugc3ViLXByb2Nlc3Mgc2VxXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RlcElkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3RlcCBpZFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIHRoZSBXb3JrZmxvdyB2YXJpYWJsZSBpZFxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuLy8gV29ya2Zsb3cucHJvdG90eXBlLmdldFZhcmlhYmxlID0gZnVuY3Rpb24ocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwga2V5KXtcbi8vIFx0dmFyIF90aGlzID0gdGhpcztcbi8vIFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuLy8gXHRcdHRyeSB7XG4vLyBcdFx0XHRQcm9jZXNzLnNldFZhcmlhYmxlKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdGVwSWQsIGtleSkudGhlbihmdW5jaW9uKHJlc3VsdCl7XG4vLyBcdFx0XHRcdHJlc29sdmUocmVzdWx0LmRhdGEpO1xuLy8gXHRcdFx0fSwgZnVuY3Rpb24oZXJyKXtcbi8vIFx0XHRcdFx0cmVqZWN0KGVycik7XG4vLyBcdFx0XHR9KVxuLy8gXHRcdH0gY2F0Y2ggKGVycikge1xuLy8gXHRcdFx0cmVqZWN0KGVycik7XG4vLyBcdFx0fVxuXG4vLyBcdH0pO1xuLy8gfTtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBjcmVhdGVzIGEgbmV3IHdvcmtmbG93IHByb2Nlc3MgaS5lLiBpdCBjcmVhdGVzIGEgd29ya2Zsb3cgcHJvY2Vzc2VzIGluc3RhbmNlXG4gKiBvYmplY3Qgd2l0aCB0aGUgbWluaW11bSByZXF1aXJlZCBkYXRhLiBUaGlzIGluc3RhbmNlIGNhbiBiZSByZWZlcmVuY2VkIGluIHRoZSBmb2xsb3dpbmdcbiAqIHdheSwgc2VlIGV4YW1wbGUgYmVsb3cuXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBjb25maWcgPSB7ICdfaWQnOiAnYWJjMTIzJyB9O1xuXG4gKiB2YXIgd29ya2Zsb3cgPSBuZXcgV29ya2Zsb3coJzEyMzQnLCAnNTY3OCcsIGNvbmZpZyk7XG4gKiB3b3JrZmxvdy5jcmVhdGUoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gKlx0Y29uc29sZS5sb2cocmVzdWx0Lm1lc3NhZ2UpO1xuICpcdC8vIFRoZSBmb2xsb3dpbmcgcHJvcGVydGllcyBjYW4gbm93IGJlIGFjY2Vzc2VkXG4gKiBcdHZhciBwcm9maWxlID0gd29ya2Zsb3cucHJvZmlsZTtcbiAqIFx0dmFyIGFwcCA9IHdvcmtmbG93LmFwcDtcbiAqIFx0dmFyIGNvbmZpZyA9IHdvcmtmbG93LmNvbmZpZztcbiAqXHQvLyBPbiBzdWNjZXNzIHlvdSBjYW4gYWNjZXNzIHRoZSBpbnN0YW5jZSB0aGUgZm9sbG93aW5nIHdheVxuICpcdHZhciBpbnN0YW5jZSA9IHdvcmtmbG93Lmluc3RhbmNlO1xuICogfSwgZnVuY3Rpb24oZXJyb3Ipe1xuICpcdGNvbnNvbGUubG9nKGVycm9yKTtcbiAqIH0pO1xuICpcbiAqIEByZXR1cm4ge09iamVjdH0gbmV3IFdvcmtmbG93IGluc3RhbmNlIHdpdGggdXBkYXRlZCBpbnN0YW5jZSBkYXRhLlxuICpcbiAqL1xuXG5Xb3JrZmxvdy5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoX3RoaXMuaW5zdGFuY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHZhciB3YXJuID0gdXRpbC53YXJuKCdJbnN0YW5jZSBhbHJlYWR5IGV4aXN0cy4nLCBfdGhpcylcbiAgICAgICAgICAgICAgICByZXNvbHZlKHdhcm4pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgdGhlIHdvcmtmbG93IHByb2Nlc3NlcyBpbnN0YW5jZSBvYmplY3RcbiAgICAgICAgICAgICAgICB2YXIgbW9kZWwgPSB7XG4gICAgICAgICAgICAgICAgICAgIF9pZDogJycsXG4gICAgICAgICAgICAgICAgICAgIHZlcnNpb246ICcnLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnd29ya2Zsb3dJbnN0YW5jZScsXG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NlczogW10sXG4gICAgICAgICAgICAgICAgICAgIGNoYW5uZWxzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbW11bml0eV9cIiArIGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxlX1wiICsgYXBwLlNDT1BFLnByb2ZpbGVJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYXBwbGljYXRpb25fXCIgKyBhcHAuU0NPUEUuYXBwbGljYXRpb25JZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tbXVuaXR5X1wiICsgYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCkgKyBcIl9hcHBsaWNhdGlvbl9cIiArIGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgbW9kZWwuX2lkID0gX3RoaXMucHJvZmlsZSArICc6cHJvY2Vzc2VzOmxvY2FsJztcbiAgICAgICAgICAgICAgICAvL21vZGVsLl9pZCA9IF90aGlzLnByb2ZpbGUgKyAnOnByb2Nlc3Nlcyc7XG5cbiAgICAgICAgICAgICAgICBtb2RlbC52ZXJzaW9uID0gX3RoaXMuY29uZmlnLnZlcnNpb247XG4gICAgICAgICAgICAgICAgX3RoaXMuaW5zdGFuY2UgPSBtb2RlbDtcbiAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya2Zsb3cgcHJvY2Vzc2VzIGluc3RhbmNlIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5LicsIF90aGlzKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFdvcmtmbG93IGluaXRpYWxpc2UsIHRoaXMgZnVuY3Rpb24gZXhlY3V0ZXMgYSBwcm9jZXNzIHdpdGhpbiBhIHdvcmtmbG93XG4gKiBjb25maWd1cmF0aW9uLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9jZXNzSWQgLSB0aGUgcHJvY2VzcyBpZCB0byBwcm9jZXNzXG4gKiBAcGFyYW0ge29iamVjdH0gW2RhdGFdIC0gdGhlIGlucHV0IGRhdGEgdG8gcHJvY2Vzc1xuICpcbiAqIEBleGFtcGxlXG4gKiBXb3JrZmxvdy5pbml0aWFsaXNlKCdwcm9jZXNzSWQnLCB7IHZhbGlkRGF0ZTogJ2RhdGUnIH0pO1xuICpcbiAqIEByZXR1cm4gXCJcIlxuICpcbiAqL1xuV29ya2Zsb3cucHJvdG90eXBlLmluaXRpYWxpc2UgPSBmdW5jdGlvbihwcm9jZXNzSWQsIGRhdGEsIHN1YnByb2ZpbGVJZCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIGNvbmZpZ1Byb2Nlc3MgPSBbXTtcbiAgICAgICAgICAgIC8vIENoZWNrIHRoZSBwYXNzZWQgaW4gcGFyYW1ldGVyc1xuICAgICAgICAgICAgaWYgKHByb2Nlc3NJZCAhPT0gJycgJiYgcHJvY2Vzc0lkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBHZXQgdGhlIGN1cnJlbnQgcHJvY2VzcyBjb25maWdcbiAgICAgICAgICAgICAgICBjb25maWdQcm9jZXNzID0gX3RoaXMuY29uZmlnLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqUHJvY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAob2JqUHJvY2Vzcy5faWQgPT0gcHJvY2Vzc0lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqUHJvY2VzcztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ1Byb2Nlc3NbMF0uX2lkID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRkNvbmZpZ0Vycm9yJywgJ05vIHZhbGlkIHByb2Nlc3MgZGVmaW5pdGlvbiBmb3VuZCB3aXRoIHByb2Nlc3MgaWQ6ICcgKyBwcm9jZXNzSWQpO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25maWdQcm9jZXNzLnB1c2goX3RoaXMuY29uZmlnLnByb2Nlc3Nlc1swXSk7XG4gICAgICAgICAgICAgICAgcHJvY2Vzc0lkID0gX3RoaXMuY29uZmlnLnByb2Nlc3Nlc1swXS5faWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBidWlsZFBhcmFtID0gZnVuY3Rpb24oYXJyYXkpIHtcblxuICAgICAgICAgICAgICAgIHZhciBpbmROYW1lID0gXCJcIjtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBsID0gMDsgbCA8IGFycmF5Lmxlbmd0aCAtIDE7IGwrKykge1xuICAgICAgICAgICAgICAgICAgICBpbmROYW1lID0gaW5kTmFtZSArIFwiJ1wiICsgYXJyYXlbbF0gKyBcIicsXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAnKCcgKyBpbmROYW1lICsgXCInXCIgKyBhcnJheVthcnJheS5sZW5ndGggLSAxXSArIFwiJylcIlxuXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgc3BJZCA9IGNvbmZpZ1Byb2Nlc3NbMF0uc3ViUHJvY2Vzc2VzWzBdLl9pZDtcbiAgICAgICAgICAgIHZhciB0b0NoZWNrQXJyYXkgPSBbXTtcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZVR5cGUgPSBjb25maWdQcm9jZXNzWzBdLnN1YlByb2Nlc3Nlc1swXS5pbnN0YW5jZVR5cGU7XG4gICAgICAgICAgICB2YXIgcHJvY2Vzc0luZGljYXRvcnMgPSBKU09OLnhwYXRoKFwiaW5kaWNhdG9ycy9faWRcIiwgY29uZmlnUHJvY2Vzc1swXS5zdWJQcm9jZXNzZXNbMF0sIHt9KTtcblxuICAgICAgICAgICAgdmFyIGNhbkNyZWF0ZVByb2Nlc3MgPSBmdW5jdGlvbihhcnJheSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIGNvdW50U2luZ2xlID0gSlNPTi54cGF0aChcImNvdW50KC9pbmRpY2F0b3JzW3NldElkID0gXCIgKyBidWlsZFBhcmFtKGFycmF5KSArIFwiIGFuZCBjYXJkaW5hbGl0eSBlcSAnc2luZ2xlJyBdL3NldElkKVwiLCBhcHAuU0NPUEUuQVBQX0NPTkZJRywge30pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNvdW50U2luZ2xlID4gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb3VudCA9IEpTT04ueHBhdGgoXCJjb3VudCgvc3VicHJvY2Vzc2VzW2luZGljYXRvcnMvaWQgPSBcIiArIGJ1aWxkUGFyYW0oYXJyYXkpICsgXCIgYW5kIGNvbXBsZXRlIGVxICdmYWxzZSddKVwiLCBfdGhpcywge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGNvdW50ID09IDApXG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlVHlwZS5uZXdTZXF1ZW5jZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb3VudCA9IEpTT04ueHBhdGgoXCJjb3VudCgvc3VicHJvY2Vzc2VzW2lkIGVxIFwiICsgc3BJZCArIFwiIGFuZCBpbmRpY2F0b3JzL2lkID0gXCIgKyBidWlsZFBhcmFtKGFycmF5KSArIFwiIGFuZCBjb21wbGV0ZSBlcSAnZmFsc2UnXSlcIiwgX3RoaXMsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoY291bnQgPT0gMClcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpbnN0YW5jZVR5cGUubmV3SW5zdGFuY2UgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cblxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAoY2FuQ3JlYXRlUHJvY2Vzcyhwcm9jZXNzSW5kaWNhdG9ycykpIHtcblxuICAgICAgICAgICAgICAgIC8vIHZhciBwcm9jZXNzU2VxID0gMTtcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudFByb2Nlc3MgPSBbXTtcbiAgICAgICAgICAgICAgICBfdGhpcy5pbnN0YW5jZS5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHByb2Nlc3NJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzSXRlbS5pZCA9PSBwcm9jZXNzSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQcm9jZXNzLnB1c2gocHJvY2Vzc0l0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB2YXIgcHJvY2Vzc1NlcSA9IGN1cnJlbnRQcm9jZXNzLmxlbmd0aCArIDE7XG4gICAgICAgICAgICAgICAgLy8gdmFyIG5leHRTZXEgPSBwcm9jZXNzU2VxICsgMTtcbiAgICAgICAgICAgICAgICAvLyBQdXNoIHRoZSBwcm9jZXNzIG9iamVjdCBpbnRvIHRoZSBhcnJheVxuICAgICAgICAgICAgICAgIHZhciBwcm9jZXNzTW9kZWwgPSB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgc2VxOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc2VzOiBbXVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIDEuIFVwZGF0ZSB0aGUgcHJvY2VzcyBpZCBhbmQgc2VxXG4gICAgICAgICAgICAgICAgcHJvY2Vzc01vZGVsLmlkID0gcHJvY2Vzc0lkO1xuICAgICAgICAgICAgICAgIHByb2Nlc3NNb2RlbC5zZXEgPSBwcm9jZXNzU2VxO1xuICAgICAgICAgICAgICAgIF90aGlzLmluc3RhbmNlLnByb2Nlc3Nlcy5wdXNoKHByb2Nlc3NNb2RlbCk7XG4gICAgICAgICAgICAgICAgLy8gUGFyYW1ldGVyc1xuICAgICAgICAgICAgICAgIHZhciBzdWJQcm9jZXNzSWQgPSBjb25maWdQcm9jZXNzWzBdLnN1YlByb2Nlc3Nlc1swXS5faWQ7XG4gICAgICAgICAgICAgICAgdmFyIHN1YlByb2Nlc3NTZXEgPSAxO1xuICAgICAgICAgICAgICAgIF90aGlzLmluc3RhbmNlLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ocHJvY2Vzc0l0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb2Nlc3NJdGVtLmlkID09IHByb2Nlc3NJZCAmJiBwcm9jZXNzSXRlbS5zZXEgPT0gcHJvY2Vzc1NlcSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc1NlcSA9IHByb2Nlc3NJdGVtLnN1YlByb2Nlc3Nlcy5sZW5ndGggKyAxXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vIENhbGwgdGhlIHN1YnByb2Nlc3MgbWV0aG9kXG4gICAgICAgICAgICAgICAgdmFyIGlucHV0VVVJRCA9IGdlbmVyYXRlVVVJRCgpO1xuICAgICAgICAgICAgICAgIC8vY3JlYXRlIHR4blxuICAgICAgICAgICAgICAgIHZhciB0eG5QYWNrZXQgPSB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29tbXVuaXR5SWRcIjogYXBwLlNDT1BFLmNvbW11bml0eUlkLFxuICAgICAgICAgICAgICAgICAgICBcInV1aWRcIjogaW5wdXRVVUlELFxuICAgICAgICAgICAgICAgICAgICBcInVzZXJJZFwiOiBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgXCJ0cmFuc2FjdGlvblR5cGVcIjogXCJzdWJQcm9jZXNzXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZG9jdW1lbnRzXCI6IFtdXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGRhby5zdGFydFRyYW5zYWN0aW9uKHR4blBhY2tldCkudGhlbihmdW5jdGlvbihzdWNjKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgUHJvY2Vzcy5zdWJQcm9jZXNzKGlucHV0VVVJRCwgcHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN1YnByb2ZpbGVJZCwgZGF0YSwgX3RoaXMpLnRoZW4oZnVuY3Rpb24oc3ViUHJvY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gR2VuZXJhdGUgdGhlIHV1aWRcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHV1aWQgPSBzdWJQcm9jZXNzLmRhdGEuX2lkOyAvL190aGlzLnByb2ZpbGUgKyAnOicgKyBfdGhpcy5hcHAgKyAnOicgKyBwcm9jZXNzSWQgKyAnOicgKyBwcm9jZXNzU2VxICsgJzonICsgc3ViUHJvY2Vzc0lkICsgJzonICsgc3ViUHJvY2Vzc1NlcTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQnVpbGQgdGhlIHN1Yi1wcm9jZXNzIHJlZmVyZW5jZSBvYmplY3RcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdyb3VwS2V5ID0gc3ViUHJvY2Vzcy5kYXRhLmdyb3VwS2V5O1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiBDaGFuZ2UgcmVxdWlyZWQgdG8gbW92ZSBpc0FjdGl2ZSB0byBzdWJQcm9jZXNzIGZpbGUuUmVtb3ZlIGZyb20gaGVyZVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1YnByb2ZpbGVJZCA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJwcm9maWxlSWQgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWJQcm9jZXNzUmVmID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBzdWJQcm9jZXNzSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VicHJvZmlsZUlkOiBzdWJwcm9maWxlSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VxOiBzdWJQcm9jZXNzLmRhdGFbXCJtZXRhLWRhdGFcIl0uc3ViUHJvY2Vzc0luc1NlcSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dWlkOiB1dWlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwS2V5OiBncm91cEtleVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUgcmVmZXJlbmNlIHRvIHRoZSBwcm9jZXNzIG1vZGVsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzTW9kZWwuc3ViUHJvY2Vzc2VzLnB1c2goc3ViUHJvY2Vzc1JlZik7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIHN1YlByb2Nlc3MgbW9kZWwgdG8gdGhlIHN1YnByb2Nlc3NlcyBhcnJheVxuICAgICAgICAgICAgICAgICAgICAgICAgLy9fdGhpcy5zdWJwcm9jZXNzZXMucHVzaChzdWJQcm9jZXNzLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gX3RoaXMuaW5zdGFuY2UucHJvY2Vzc2VzLnB1c2gocHJvY2Vzc01vZGVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBfdGhpcy5pbnN0YW5jZS5wcm9jZXNzZXMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb2Nlc3NJdGVtID0gX3RoaXMuaW5zdGFuY2UucHJvY2Vzc2VzW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvY2Vzc0l0ZW0uaWQgPT0gcHJvY2Vzc0lkICYmIHByb2Nlc3NJdGVtLnNlcSA9PSBwcm9jZXNzU2VxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgY3VycmVudCBwcm9jZXNzIGZyb20gdGhlIGFycmF5IGFuZCBhZGQgdGhlIHVwZGF0ZWQgcHJvY2Vzc01vZGVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmluc3RhbmNlLnByb2Nlc3Nlcy5zcGxpY2UoaW5kZXgsIDEsIHByb2Nlc3NNb2RlbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUHJvY2VzcyB0aGUgaW5kaWNhdG9yIGRvY3VtZW50cyB3b3JrZmxvdyBwcm9jZXNzZXMgdXBkYXRlc1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvcnMgPSBzdWJQcm9jZXNzLmRhdGEuaW5kaWNhdG9ycztcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGVwID0gc3ViUHJvY2Vzcy5kYXRhLnN0ZXA7XG4gICAgICAgICAgICAgICAgICAgICAgICBQcm9jZXNzLmluZGljYXRvckRvY3MocHJvY2Vzc0lkLCBpbmRpY2F0b3JzLCBzdGVwLCBfdGhpcykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnUHJvY2VzczogJyArIF90aGlzLmNvbmZpZy5wcm9jZXNzZXNbMF0uX2lkICsgJyBpbml0aWFsaXplZCBzdWNjZXNzZnVsbHkuJywgc3ViUHJvY2Vzc1JlZik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29tbWl0IGNhbGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmluc3RhbmNlLnByb2Nlc3NlcyA9IF90aGlzLmluc3RhbmNlLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEob2JqLmlkID09IHByb2Nlc3NJZCAmJiBvYmouc2VxID09IHByb2Nlc3NTZXEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgICAgIGlmKGVyci5yZXNwb25zZUpTT04gIT0gdW5kZWZpbmVkICYmIGVyci5yZXNwb25zZUpTT04ubWVzc2FnZSAhPSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVyci5yZXNwb25zZUpTT04ubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihlcnIucmVzcG9uc2VUZXh0ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVyci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0pO1xuXG5cblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWplY3QoXCJDYW5ub3QgY3JlYXRlIHdvcmtmbG93IGFzIG90aGVyIHByb2Nlc3MgdXNpbmcgc2FtZSBTRE8gaXMgbm90IGNvbXBsZXRlXCIpXG4gICAgICAgICAgICB9XG5cblxuXG5cblxuXG5cblxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG5cbiAgICB9KTtcbn07XG5cbi8qKlxuICogV29ya2Zsb3cgdHJhbnNpdGlvbiB0byB0aGUgbmV4dCBzdGVwLiBUaGlzIG1vdmVzIHRoZSB3b3JrZmxvdyBmcm9tIHRoZSBjdXJyZW50IHByb2Nlc3MsXG4gKiBzdWItcHJvY2VzcyBzdGVwIHRvIHRoZSBuZXh0IG9uZSBhcyBzcGVjaWZpZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHByb2Nlc3MgaWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBwcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHByb2Nlc3Mgc2VxXG4gKiBAcGFyYW0ge3N0cmluZ30gc3ViUHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3ViLXByb2Nlc3MgaWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdWJQcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHN1Yi1wcm9jZXNzIHNlcVxuICogQHBhcmFtIHtzdHJpbmd9IHN0ZXBJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN0ZXAgaWQgXG4gKiBAcGFyYW0ge3N0cmluZ30gdHJhbnNpdGlvbklkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gdHJhbnNpdGlvbiBpZFxuICogQHBhcmFtIHtvYmplY3R9IGRhdGEgLSBhbnkgYWRkaXRpb25hbCBkYXRhIHBhc3NlZCBpbiBhcyBrZXkgdmFsdWUgcGFpcnNcbiAqXG4gKiBAZXhhbXBsZVxuICogV29ya2Zsb3cudHJhbnNpdGlvbigncHJvY2Vzc0lkJywgMSwgJ3N1YlByb2Nlc3NJZCcsIDEsICdzdGVwSWQnLCAndHJhbnNpdGlvbklkJywgeyBrZXk6ICcnLCB2YWx1ZTogJycgfSk7XG4gKlxuICogQHJldHVybiBcIlwiXG4gKlxuICovXG5Xb3JrZmxvdy5wcm90b3R5cGUudHJhbnNpdGlvbiA9IGZ1bmN0aW9uKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdGVwSWQsIHRyYW5zaXRpb25JZCwgZGF0YSwgc3B1dWlkKSB7XG4gICAgLy8gUmUtYXNzaWduIHRoaXNcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciBtb2RlbCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL3N0ZXBcIiwgYXBwLlNDT1BFLndvcmtmbG93LCB7fSlbMF07XG4gICAgICAgICAgICB2YXIgc3RlcE9iamVjdCA9IEpTT04ueHBhdGgoXCIvcHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBwcm9jZXNzSWQgKyBcIiddL3N1YlByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3ViUHJvY2Vzc0lkICsgXCInXS9zdGVwc1tfaWQgZXEgJ1wiICsgc3RlcElkICsgXCInXVwiLCBfdGhpcy5jb25maWcsIHt9KVswXTtcbiAgICAgICAgICAgIHZhciBzdWJQcm9jZXNzU2VxID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHNwdXVpZCArIFwiJ10vbWV0YS1kYXRhL3N1YlByb2Nlc3NJbnNTZXFcIiwgYXBwLlNDT1BFLndvcmtmbG93LCB7fSlbMF07XG5cbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgY3VycmVudCBzdWItcHJvY2VzcyBzdGVwIGRhdGFcbiAgICAgICAgICAgIHZhciB1cGRhdGUgPSBmdW5jdGlvbih0eXBlLCByZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5pbnN0YW5jZS5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHByb2Nlc3NJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzSXRlbS5pZCA9PSBwcm9jZXNzSWQgJiYgcHJvY2Vzc0l0ZW0uc2VxID09IHByb2Nlc3NTZXEpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0l0ZW0uc3ViUHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihzdWJQcm9jZXNzSXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWJQcm9jZXNzSXRlbS5pZCA9PSBzdWJQcm9jZXNzSWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5zdWJwcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHN1YlByb2Nlc3NPYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWJQcm9jZXNzT2JqLl9pZCA9PSBzcHV1aWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09ICdzdGVwJykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NPYmouc3RlcCA9IHJlc3VsdC5kYXRhLnN0ZXA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKHJlc3VsdC5tZXNzYWdlLCBzdWJQcm9jZXNzT2JqKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PSAnc3RlcENvbXBsZXRlJykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NPYmouc3RlcCA9IHJlc3VsdC5kYXRhLnN0ZXA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NPYmouY29tcGxldGUgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKHJlc3VsdC5tZXNzYWdlLCBzdWJQcm9jZXNzT2JqLnN0ZXApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgaWYgKHN0ZXBPYmplY3QuZnVuY3Rpb24udGFzayAhPSB1bmRlZmluZWQgJiYgc3RlcE9iamVjdC5mdW5jdGlvbi50YXNrLnBvc3RBY3Rpb25zICE9IHVuZGVmaW5lZCkge1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgcG9zdEFjdGlvbnMgPSBzdGVwT2JqZWN0LmZ1bmN0aW9uLnRhc2sucG9zdEFjdGlvbnM7XG4gICAgICAgICAgICAgICAgUHJvY2Vzcy5wb3N0QWN0aW9ucyhwb3N0QWN0aW9ucywgX3RoaXMsIHNwdXVpZCkudGhlbihmdW5jdGlvbihzdWNjZXNzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgUHJvY2Vzcy50cmFuc2l0aW9uKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdGVwSWQsIHRyYW5zaXRpb25JZCwgZGF0YSwgX3RoaXMsIHNwdXVpZCwgbW9kZWwpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YS5zdWJQcm9jZXNzQ29tcGxldGUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZSgnc3RlcENvbXBsZXRlJywgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGUoJ3N0ZXAnLCByZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcblxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcblxuICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cblxuICAgICAgICAgICAgICAgIFByb2Nlc3MudHJhbnNpdGlvbihwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3RlcElkLCB0cmFuc2l0aW9uSWQsIGRhdGEsIF90aGlzLCBzcHV1aWQsIG1vZGVsKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YS5zdWJQcm9jZXNzQ29tcGxldGUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlKCdzdGVwQ29tcGxldGUnLCByZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGUoJ3N0ZXAnLCByZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcblxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuXG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFdvcmtmbG93IGFzc2lnbiB1c2VyLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBwcm9jZXNzIGlkXG4gKiBAcGFyYW0ge251bWJlcn0gcHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBwcm9jZXNzIHNlcVxuICogQHBhcmFtIHtzdHJpbmd9IHN1YlByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN1Yi1wcm9jZXNzIGlkXG4gKiBAcGFyYW0ge251bWJlcn0gc3ViUHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBzdWItcHJvY2VzcyBzZXFcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdGVwSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdGVwIGlkXG4gKiBAcGFyYW0ge29iamVjdH0gdXNlciAtIHRoZSB1c2VyIGlkIGFuZCBuYW1lIGRhdGFcbiAqXG4gKiBAZXhhbXBsZSBcIlwiXG4gKlxuICogQHJldHVybiBcIlwiXG4gKlxuICovXG5Xb3JrZmxvdy5wcm90b3R5cGUuYXNzaWduVXNlciA9IGZ1bmN0aW9uKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCB1c2VyLCB1dWlkKSB7XG4gICAgLy8gUmUtYXNzaWduIHRoZSBXb3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZSBhcyBfdGhpc1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIHNwT2JqZWN0ID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddXCIsIGFwcC5TQ09QRS53b3JrZmxvdywge30pWzBdO1xuICAgICAgICAgICAgdmFyIHNwUmV2ID0gc3BPYmplY3QuX3JldjtcbiAgICAgICAgICAgIHZhciB0eG5QYWNrZXQgPSB7XG4gICAgICAgICAgICAgICAgXCJjb21tdW5pdHlJZFwiOiBhcHAuU0NPUEUuY29tbXVuaXR5SWQsXG4gICAgICAgICAgICAgICAgXCJ1dWlkXCI6IHV1aWQsXG4gICAgICAgICAgICAgICAgXCJ1c2VySWRcIjogTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQsXG4gICAgICAgICAgICAgICAgXCJ0cmFuc2FjdGlvblR5cGVcIjogXCJzdWJQcm9jZXNzXCIsXG4gICAgICAgICAgICAgICAgXCJkb2N1bWVudHNcIjogW3tcbiAgICAgICAgICAgICAgICAgICAgXCJkb2N1bWVudFwiOiB1dWlkLFxuICAgICAgICAgICAgICAgICAgICBcInJldlwiOiBzcFJldlxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBQcm9jZXNzLmFzc2lnblVzZXIocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHVzZXIsIHV1aWQsIF90aGlzKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuXG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICAgICBcblxuXG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgXG5cblxuXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cblxuICAgIH0pXG59O1xuXG4vKipcbiAqIFdvcmtmbG93IHRhc2ssIHRoaXMgbWV0aG9kIGV4ZWN1dGVzIGEgc3BlY2lmaWMgdGFzay5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIHByb2Nlc3MgaWQgdG8gcHJvY2Vzc1xuICogQHBhcmFtIHtvYmplY3R9IGlucHV0RGF0YSAtIHRoZSBpbnB1dCBkYXRhIHRvIHByb2Nlc3NcbiAqXG4gKiBAZXhhbXBsZVxuICogV29ya2Zsb3cuaW5pdGlhbGl6ZSgncHJvY2Vzc0lkJywgeyB2YWxpZERhdGU6ICdkYXRlJyB9KTtcbiAqXG4gKiBAcmV0dXJuIFwiXCJcbiAqXG4gKi9cbldvcmtmbG93LnByb3RvdHlwZS51aSA9IGZ1bmN0aW9uKCkge1xuICAgIC8vIFJlLWFzc2lnbiB0aGUgV29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2UgYXMgX3RoaXNcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldFByb2Nlc3M6IGZ1bmN0aW9uKHByb2Nlc3NJZCwgbGFuZykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJJbnRlcmZhY2UuZ2V0UHJvY2Vzcyhwcm9jZXNzSWQsIGxhbmcsIF90aGlzKS50aGVuKGZ1bmN0aW9uKG1vZGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG1vZGVsKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICB9XG5cbn07XG5cbi8qKlxuICogV29ya2Zsb3cgdGFzaywgdGhpcyBtZXRob2QgZXhlY3V0ZXMgYSBzcGVjaWZpYyB0YXNrLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIC0gdGhlIHByb2Nlc3MgaWQgdG8gcHJvY2Vzc1xuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGlucHV0IGRhdGEgdG8gcHJvY2Vzc1xuICogKiBAcGFyYW0ge3N0cmluZ30gdXVpZCAtIHRoZSBpbnB1dCBkYXRhIHRvIHByb2Nlc3NcbiAqXG4gKiBAZXhhbXBsZVxuICogV29ya2Zsb3cuZ2V0Tm9kZVZhbHVlKGRhdGEsIF9XRkluc3RhbmNlLCB1dWlkKTtcbiAqXG4gKiBAcmV0dXJuIFwiXCJcbiAqXG4gKi9cblxuV29ya2Zsb3cucHJvdG90eXBlLmdldE5vZGVWYWx1ZSA9IGZ1bmN0aW9uKGRhdGEsIHV1aWQpIHtcbiAgICAvLyBSZS1hc3NpZ24gdGhlIFdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlIGFzIF90aGlzXG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBoZWxwZXIuZ2V0Tm9kZVZhbHVlKGRhdGEsIF90aGlzLCB1dWlkKS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzKTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cblxuICAgIH0pXG59O1xuXG4vKipcbiAqIFdvcmtmbG93IHRhc2ssIHRoaXMgbWV0aG9kIGV4ZWN1dGVzIGEgc3BlY2lmaWMgdGFzay5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gZGF0YSAtIHRoZSBwcm9jZXNzIGlkIHRvIHByb2Nlc3NcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBpbnB1dCBkYXRhIHRvIHByb2Nlc3NcbiAqXG4gKiBAZXhhbXBsZVxuICogV29ya2Zsb3cudGFrZUFzc2lnbm1lbnQoc3B1dWlkLCBfV0ZJbnN0YW5jZSk7XG4gKlxuICogQHJldHVybiBcIlwiXG4gKlxuICovXG5cbldvcmtmbG93LnByb3RvdHlwZS50YWtlQXNzaWdubWVudCA9IGZ1bmN0aW9uKHNwdXVpZCkge1xuICAgIC8vIFJlLWFzc2lnbiB0aGUgV29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2UgYXMgX3RoaXNcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgIFxuICAgICAgICAgICAvL0Fzc2lnbm1lbnQgYXJlIGV4ZWN1dGluZyBoZXJlXG5cbiAgICAgICAgICAgdmFyIHNwT2JqZWN0ID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHNwdXVpZCArIFwiJ11cIiwgX3RoaXMsIHt9KVswXTtcbiAgICAgICAgICAgdmFyIGFzc2lnbmVlID0gSlNPTi54cGF0aChcIi9zdGVwL2Fzc2lnbmVkVG9cIiwgc3BPYmplY3QsIHt9KVswXTtcbiAgICAgICAgICAgLy9QdXNoaW5nIG9sZGVyIHJlY29yZCBpbiByZUFzc2lnbiBhcnJheVxuXG4gICAgICAgICAgIGlmIChzcE9iamVjdC5zdGVwLmFzc2lnbm1lbnRIaXN0b3J5ID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgc3BPYmplY3Quc3RlcC5hc3NpZ25tZW50SGlzdG9yeSA9IFtdO1xuICAgICAgICAgICB9XG4gICAgICAgICAgIGlmIChhc3NpZ25lZS51c2VySWQgIT0gXCJcIiAmJiBhc3NpZ25lZS5uYW1lICE9IFwiXCIpIHtcbiAgICAgICAgICAgICAgIHNwT2JqZWN0LnN0ZXAuYXNzaWdubWVudEhpc3RvcnkucHVzaChKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGFzc2lnbmVlKSkpO1xuICAgICAgICAgICB9XG5cblxuXG4gICAgICAgICAgIGFzc2lnbmVlLm5hbWUgPSBMT0NBTF9TRVRUSU5HUy5TRVNTSU9OLmZpcnN0TmFtZSArIFwiIFwiICsgTE9DQUxfU0VUVElOR1MuU0VTU0lPTi5sYXN0TmFtZTtcbiAgICAgICAgICAgYXNzaWduZWUudXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQgKyBcIlwiO1xuICAgICAgICAgICBhc3NpZ25lZS5kYXRlVGltZSA9IG1vbWVudCgpLmZvcm1hdCgpO1xuICAgICAgICAgICBhc3NpZ25lZS50eXBlID0gQVNTSUdOTUVOVF9UWVBFX0FDQ0VQVEFOQ0U7XG4gICAgICAgICAgIGFzc2lnbmVlLmR1ZURhdGVUaW1lID0gJyc7XG4gICAgICAgICAgIGFzc2lnbmVlLmJ5ID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQgKyBcIlwiO1xuXG5cbiAgICAgICAgICAgLy9mZXRjaCBwcmVXb3JrQWN0aW9ucyBoZXJlIFxuXG4gICAgICAgICAgIHZhciBwcm9jZXNzSWQgPSBKU09OLnhwYXRoKFwiL2luc3RhbmNlL3Byb2Nlc3Nlc1tzdWJQcm9jZXNzZXMvdXVpZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL2lkXCIsIF90aGlzLCB7fSlbMF07XG4gICAgICAgICAgIHZhciBzdWJQcm9jZXNzSWQgPSBKU09OLnhwYXRoKFwiL2luc3RhbmNlL3Byb2Nlc3Nlcy9zdWJQcm9jZXNzZXNbdXVpZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL2lkXCIsIF90aGlzLCB7fSlbMF07XG4gICAgICAgICAgIHZhciBzdGVwSWQgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXS9zdGVwL2lkXCIsIF90aGlzLCB7fSlbMF07XG4gICAgICAgICAgIHZhciBzdGVwT2JqZWN0ID0gSlNPTi54cGF0aChcIi9wcm9jZXNzZXNbX2lkIGVxICdcIiArIHByb2Nlc3NJZCArIFwiJ10vc3ViUHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzdWJQcm9jZXNzSWQgKyBcIiddL3N0ZXBzW19pZCBlcSAnXCIgKyBzdGVwSWQgKyBcIiddXCIsIF90aGlzLmNvbmZpZywge30pWzBdO1xuXG4gICAgICAgICAgIGlmIChzdGVwT2JqZWN0LmZ1bmN0aW9uLnRhc2sucHJlV29ya0FjdGlvbnMgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgIHZhciBwcmVXb3JrQWN0aW9ucyA9IHN0ZXBPYmplY3QuZnVuY3Rpb24udGFzay5wcmVXb3JrQWN0aW9ucztcbiAgICAgICAgICAgICAgIFByb2Nlc3MucHJlV29ya0FjdGlvbnMocHJlV29ya0FjdGlvbnMsIF90aGlzKS50aGVuKGZ1bmN0aW9uKHN1Y2Nlc3MpIHtcblxuICAgICAgICAgICAgICAgICAgIHJlc29sdmUoX3RoaXMpO1xuXG4gICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcblxuICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuXG4gICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICByZXNvbHZlKF90aGlzKTtcblxuICAgICAgICAgICB9XG5cblxuXG5cblxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcblxuICAgICAgICAgICAgcmVqZWN0KGVycik7XG5cbiAgICAgICAgfVxuXG4gICAgfSk7XG59O1xuXG5cbi8qKlxuICogV29ya2Zsb3cgdGFzaywgdGhpcyBtZXRob2QgZXhlY3V0ZXMgYSBzcGVjaWZpYyB0YXNrLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIC0gdGhlIHByb2Nlc3MgaWQgdG8gcHJvY2Vzc1xuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGlucHV0IGRhdGEgdG8gcHJvY2Vzc1xuICpcbiAqIEBleGFtcGxlXG4gKiBXb3JrZmxvdy5jb25kaXRpb24oY29uZGl0aW9uLCBzcHV1aWQpO1xuICpcbiAqIEByZXR1cm4gXCJcIlxuICpcbiAqL1xuXG5Xb3JrZmxvdy5wcm90b3R5cGUuY29uZGl0aW9uID0gZnVuY3Rpb24oY29uZGl0aW9uLCBzcHV1aWQpIHtcblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgIHZhciBvcGVyYXRvciA9IGNvbmRpdGlvbi5vcGVyYXRvcjtcbiAgICAgICAgICAgIHZhciBkYXRhQmxvY2sgPSBjb25kaXRpb24udmFsdWUuZGF0YTtcblxuICAgICAgICAgICAgaWYgKGNvbmRpdGlvbi5zdWJqZWN0LmluZGljYXRvciAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgIHZhciBzZXRJZCA9IGNvbmRpdGlvbi5zdWJqZWN0LmluZGljYXRvci5zZXRJZDtcbiAgICAgICAgICAgICAgICB2YXIgbW9kZWxTY29wZSA9IGNvbmRpdGlvbi5zdWJqZWN0LmluZGljYXRvci5tb2RlbFNjb3BlO1xuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50UGF0aCA9IGNvbmRpdGlvbi5zdWJqZWN0LmluZGljYXRvci5lbGVtZW50UGF0aDtcbiAgICAgICAgICAgICAgICBpZiAoY29uZGl0aW9uLnN1YmplY3QuaW5kaWNhdG9yLmNvbnRleHQgPT0gJ3N1YlByb2Nlc3MnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvclVVSUQgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXS9pbmRpY2F0b3JzW2lkIGVxICdcIiArIHNldElkICsgXCInXS9pbnN0YW5jZXNbMV0vdXVpZFwiLCBfdGhpcywge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yTW9kZWwgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbX2lkIGVxICdcIiArIGluZGljYXRvclVVSUQgKyBcIiddXCIsIF90aGlzLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhRWxlbWVudCA9IGluZGljYXRvck1vZGVsLm1vZGVsW21vZGVsU2NvcGVdLmRhdGFbc2V0SWRdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBldmFsKFwiZGF0YUVsZW1lbnQuXCIgKyBlbGVtZW50UGF0aCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaGVscGVyLmdldE5vZGVWYWx1ZShkYXRhQmxvY2ssIF90aGlzLCBzcHV1aWQpLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gaGVscGVyLmNvbXBhcmUodmFsdWUsIG9wZXJhdG9yLCByZXMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCgnTm90IGltcGxlbWVudGVkJylcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgfSBlbHNlIGlmIChjb25kaXRpb24uc3ViamVjdC5pbmRpY2F0b3JXcmFwcGVyICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJlamVjdCgnTm90IGltcGxlbWVudGVkJylcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29uZGl0aW9uLnN1YmplY3QudmFyaWFibGUgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KCdOb3QgaW1wbGVtZW50ZWQnKVxuICAgICAgICAgICAgfSBlbHNlIGlmIChjb25kaXRpb24uc3ViamVjdC5zdWJQcm9jZXNzICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRQYXRoID0gY29uZGl0aW9uLnN1YmplY3Quc3ViUHJvY2Vzcy5lbGVtZW50UGF0aDtcbiAgICAgICAgICAgICAgICB2YXIgc3BPYmplY3QgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXVwiLCBfdGhpcywge30pWzBdO1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGV2YWwoXCJzcE9iamVjdC5cIiArIGVsZW1lbnRQYXRoKTtcbiAgICAgICAgICAgICAgICBoZWxwZXIuZ2V0Tm9kZVZhbHVlKGRhdGFCbG9jaywgX3RoaXMsIHNwdXVpZCkudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGhlbHBlci5jb21wYXJlKHZhbHVlLCBvcGVyYXRvciwgcmVzKTtcblxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG5cblxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcblxuICAgICAgICAgICAgcmVqZWN0KGVycik7XG5cbiAgICAgICAgfVxuXG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFdvcmtmbG93OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsaXR5Jyk7XG52YXIgbm9kZVZhbHVlID0gcmVxdWlyZSgnLi9ub2RlVmFsdWUnKTtcbnZhciBmb3JtID0gcmVxdWlyZSgnLi9mb3JtJyk7XG52YXIgaGVscGVyID0gcmVxdWlyZSgnLi9oZWxwZXInKTtcblxudmFyIGdhdGVrZWVwZXIgPSBuZXcgR0soKTtcblxuLyoqXG4gKiBBY3Rpb25zIE1vZHVsZVxuICpcbiAqIEBtb2R1bGUgbGliL2FjdGlvbnNcbiAqIEBhdXRob3IgSGFzYW4gQWJiYXNcbiAqIEB2ZXJzaW9uIDIuMC4wXG4gKiBAZGVzY3JpcHRpb24gdGVzdCBkZXNjcmlwdGlvblxuICogQGNvcHlyaWdodCBLd2FudHUgTHRkIFJTQSAyMDA5LTIwMTUuXG4gKlxuICovXG5cbi8qKlxuICogIEZvcm0gTW9kdWxlIGFjdGlvbnMgbmVlZHMgdG8gYmUgbW92ZWQgaGVyZS5cbiAqICBUaGlzIGFjdGlvbnMgbW9kdWxlIHdpbGwgYmUgY2VudGFsIHBsYWNlIHRvIGhvbGQgYWxsIGZ1bmN0aW9ucy5cbiAqICBcbiAqL1xuXG52YXIgY29tbXVuaXR5ID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICBjcmVhdGVDb21tdW5pdHk6IGZ1bmN0aW9uKF9kZWYsIHV1aWQsIF9XRkluc3RhbmNlKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHN1YnByb2ZpbGVJZCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgaWYgKGFwcC5wcm9maWxlICE9IHVuZGVmaW5lZCAmJiBhcHAucHJvZmlsZS5zdWJwcm9maWxlSWQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YnByb2ZpbGVJZCA9IGFwcC5wcm9maWxlLnN1YnByb2ZpbGVJZDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbW9tZW50KCkuZm9ybWF0KCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5wcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zdWJQcm9jZXNzVVVJRCA9IHV1aWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnN1YnByb2ZpbGVJZCA9IHN1YnByb2ZpbGVJZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY2hhbm5lbHMucHVzaChcImZvbGxvd1wiKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY2hhbm5lbHMucHVzaChcImNvbW11bml0eV9cIiArIGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpKTtcblxuICAgICAgICAgICAgICAgIHZhciB1dWlkQ29tbXVuaXR5ID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ0NvbW11bml0eSddL19pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIFwiY3JlYXRlQ29tbXVuaXR5XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibmV3Q29tbXVuaXR5SWRcIjogX1dGSW5zdGFuY2UucHJvZmlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5kaWNhdG9yVVVJRFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJDb21tdW5pdHlcIjogdXVpZENvbW11bml0eVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbih3b3JrZXJTdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIHdvcmtlci5zZXRXb3JrZXJJbmZvSW5TdWJwcm9jZXNzKHdvcmtlck9iamVjdCwgX1dGSW5zdGFuY2UsIHV1aWQpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya2VyIHByb2Nlc3NlZCBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbih3b3JrZXJGYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh3b3JrZXJGYWlsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICB1c2VySm9pbkNvbW11bml0eTogZnVuY3Rpb24oX2RlZiwgdXVpZCwgX1dGSW5zdGFuY2UpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9LFxuICAgICAgICByZWxlYXNlQWRvcHRlZEFwcGxpY2F0aW9uOiBmdW5jdGlvbihfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcblxuICAgICAgICAgICAgICAgIHZhciBzdWJwcm9maWxlSWQgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGlmIChhcHAucHJvZmlsZSAhPSB1bmRlZmluZWQgJiYgYXBwLnByb2ZpbGUuc3VicHJvZmlsZUlkICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBzdWJwcm9maWxlSWQgPSBhcHAucHJvZmlsZS5zdWJwcm9maWxlSWQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG1vbWVudCgpLmZvcm1hdCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZW5kZXJVc2VySWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QucHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc3ViUHJvY2Vzc1VVSUQgPSB1dWlkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zdWJwcm9maWxlSWQgPSBzdWJwcm9maWxlSWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNoYW5uZWxzLnB1c2goXCJmb2xsb3dcIik7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNoYW5uZWxzLnB1c2goXCJjb21tdW5pdHlfXCIgKyBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKSk7XG4gICAgICAgICAgICAgICAgdmFyIHV1aWRSZWxlYXNlQWRvcHRlZEFwcGxpY2F0aW9uID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ2Fkb3B0ZWRBcHBsaWNhdGlvbiddL2luc3RhbmNlc1sxXS91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG5cbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICBcInJlbGVhc2VBZG9wdGVkQXBwbGljYXRpb25cIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21tdW5pdHlJZFwiOiBfV0ZJbnN0YW5jZS5wcm9maWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbmRpY2F0b3JVVUlEXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFkb3B0ZWRBcHBsaWNhdGlvblwiOiB1dWlkUmVsZWFzZUFkb3B0ZWRBcHBsaWNhdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbih3b3JrZXJTdWNjZXNzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgd29ya2VyLnNldFdvcmtlckluZm9JblN1YnByb2Nlc3Mod29ya2VyT2JqZWN0LCBfV0ZJbnN0YW5jZSwgdXVpZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1dvcmtlciBwcm9jZXNzZXMgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24od29ya2VyRmFpbCkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59KSgpO1xuXG52YXIgYXBwbGljYXRpb24gPSAoZnVuY3Rpb24oKSB7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIGNyZWF0ZUFwcERlZmluaXRpb246IGZ1bmN0aW9uKF9kZWYsIHV1aWQsIF9XRkluc3RhbmNlKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHN1YnByb2ZpbGVJZCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgaWYgKGFwcC5wcm9maWxlICE9IHVuZGVmaW5lZCAmJiBhcHAucHJvZmlsZS5zdWJwcm9maWxlSWQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YnByb2ZpbGVJZCA9IGFwcC5wcm9maWxlLnN1YnByb2ZpbGVJZDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbW9tZW50KCkuZm9ybWF0KCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5wcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zdWJQcm9jZXNzVVVJRCA9IHV1aWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnN1YnByb2ZpbGVJZCA9IHN1YnByb2ZpbGVJZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY2hhbm5lbHMucHVzaChcImZvbGxvd1wiKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY2hhbm5lbHMucHVzaChcImNvbW11bml0eV9cIiArIGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpKTtcbiAgICAgICAgICAgICAgICB2YXIgdXVpZEFwcGxpY2F0aW9uID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ0FwcGxpY2F0aW9uJ10vX2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVBcHBsaWNhdGlvblwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcIm5ld0FwcGxpY2F0aW9uSWRcIjogX1dGSW5zdGFuY2UucHJvZmlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5kaWNhdG9yVVVJRFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBcHBsaWNhdGlvblwiOiB1dWlkQXBwbGljYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24od29ya2VyU3VjY2Vzcykge1xuXG4gICAgICAgICAgICAgICAgICAgIHdvcmtlci5zZXRXb3JrZXJJbmZvSW5TdWJwcm9jZXNzKHdvcmtlck9iamVjdCwgX1dGSW5zdGFuY2UsIHV1aWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdXb3JrZXIgcHJvY2Vzc2VzIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHdvcmtlckZhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdvcmtlckZhaWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICBidWlsZEFwcGxpY2F0aW9uOiBmdW5jdGlvbihfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcblxuICAgICAgICAgICAgICAgIHZhciBzdWJwcm9maWxlSWQgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGlmIChhcHAucHJvZmlsZSAhPSB1bmRlZmluZWQgJiYgYXBwLnByb2ZpbGUuc3VicHJvZmlsZUlkICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBzdWJwcm9maWxlSWQgPSBhcHAucHJvZmlsZS5zdWJwcm9maWxlSWQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG1vbWVudCgpLmZvcm1hdCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZW5kZXJVc2VySWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QucHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc3ViUHJvY2Vzc1VVSUQgPSB1dWlkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zdWJwcm9maWxlSWQgPSBzdWJwcm9maWxlSWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNoYW5uZWxzLnB1c2goXCJmb2xsb3dcIik7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNoYW5uZWxzLnB1c2goXCJjb21tdW5pdHlfXCIgKyBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKSk7XG4gICAgICAgICAgICAgICAgdmFyIHV1aWRQdWJsaXNoQXBwbGljYXRpb24gPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnUHVibGlzaEFwcGxpY2F0aW9uJ10vaW5zdGFuY2VzWzFdL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcblxuICAgICAgICAgICAgICAgIHZhciB1dWlkQXBwbGljYXRpb25EZWZpbml0aW9uID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ0FwcGxpY2F0aW9uRGVmaW5pdGlvbiddL19pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgIHZhciB1dWlkUm9sZXMgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnUm9sZXMnXS9faWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICB2YXIgdXVpZEFwcGxpY2F0aW9uID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ0FwcGxpY2F0aW9uJ10vX2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgdmFyIHV1aWRBcHBQZXJtaXNzaW9ucyA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdBcHBQZXJtaXNzaW9ucyddL19pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJidWlsZEFwcGxpY2F0aW9uXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYXBwbGljYXRpb25JZFwiOiBfV0ZJbnN0YW5jZS5wcm9maWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbmRpY2F0b3JVVUlEXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlB1Ymxpc2hBcHBsaWNhdGlvblwiOiB1dWlkUHVibGlzaEFwcGxpY2F0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQXBwbGljYXRpb25EZWZpbml0aW9uXCI6IHV1aWRBcHBsaWNhdGlvbkRlZmluaXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSb2xlc1wiOiB1dWlkUm9sZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBcHBsaWNhdGlvblwiOiB1dWlkQXBwbGljYXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBcHBQZXJtaXNzaW9uc1wiOiB1dWlkQXBwUGVybWlzc2lvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24od29ya2VyU3VjY2Vzcykge1xuXG4gICAgICAgICAgICAgICAgICAgIHdvcmtlci5zZXRXb3JrZXJJbmZvSW5TdWJwcm9jZXNzKHdvcmtlck9iamVjdCwgX1dGSW5zdGFuY2UsIHV1aWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdXb3JrZXIgcHJvY2Vzc2VzIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHdvcmtlckZhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdvcmtlckZhaWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICBhcHBsaWNhdGlvbkFkb3B0aW9uOiBmdW5jdGlvbihfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcblxuICAgICAgICAgICAgICAgIHZhciBzdWJwcm9maWxlSWQgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGlmIChhcHAucHJvZmlsZSAhPSB1bmRlZmluZWQgJiYgYXBwLnByb2ZpbGUuc3VicHJvZmlsZUlkICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBzdWJwcm9maWxlSWQgPSBhcHAucHJvZmlsZS5zdWJwcm9maWxlSWQ7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbW9tZW50KCkuZm9ybWF0KCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5wcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zdWJQcm9jZXNzVVVJRCA9IHV1aWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnN1YnByb2ZpbGVJZCA9IHN1YnByb2ZpbGVJZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY2hhbm5lbHMucHVzaChcImZvbGxvd1wiKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY2hhbm5lbHMucHVzaChcImNvbW11bml0eV9cIiArIGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpKTtcbiAgICAgICAgICAgICAgICB2YXIgdXVpZEFkb3B0aW9uID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ0Fkb3B0aW9uJ10vaW5zdGFuY2VzWzFdL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcblxuICAgICAgICAgICAgICAgIHZhciB1dWlkUHVibGlzaEFwcGxpY2F0aW9uID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ1B1Ymxpc2hBcHBsaWNhdGlvbiddL19pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgIHZhciB1dWlkQXBwbGljYXRpb24gPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnQXBwbGljYXRpb24nXS9faWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcblxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIFwiYWRvcHRBcHBsaWNhdGlvblwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImFwcGxpY2F0aW9uSWRcIjogX1dGSW5zdGFuY2UucHJvZmlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5kaWNhdG9yVVVJRFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBZG9wdGlvblwiOiB1dWlkQWRvcHRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJQdWJsaXNoQXBwbGljYXRpb25cIjogdXVpZFB1Ymxpc2hBcHBsaWNhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkFwcGxpY2F0aW9uXCI6IHV1aWRBcHBsaWNhdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbih3b3JrZXJTdWNjZXNzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgd29ya2VyLnNldFdvcmtlckluZm9JblN1YnByb2Nlc3Mod29ya2VyT2JqZWN0LCBfV0ZJbnN0YW5jZSwgdXVpZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1dvcmtlciBwcm9jZXNzZXMgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24od29ya2VyRmFpbCkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZVRheG9ub215OiBmdW5jdGlvbihfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcblxuICAgICAgICAgICAgICAgIHZhciBzdWJwcm9maWxlSWQgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGlmIChhcHAucHJvZmlsZSAhPSB1bmRlZmluZWQgJiYgYXBwLnByb2ZpbGUuc3VicHJvZmlsZUlkICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBzdWJwcm9maWxlSWQgPSBhcHAucHJvZmlsZS5zdWJwcm9maWxlSWQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG1vbWVudCgpLmZvcm1hdCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZW5kZXJVc2VySWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QucHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc3ViUHJvY2Vzc1VVSUQgPSB1dWlkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zdWJwcm9maWxlSWQgPSBzdWJwcm9maWxlSWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNoYW5uZWxzLnB1c2goXCJmb2xsb3dcIik7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNoYW5uZWxzLnB1c2goXCJjb21tdW5pdHlfXCIgKyBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKSk7XG4gICAgICAgICAgICAgICAgdmFyIHRheG9ub215VVVJRCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pbmRpY2F0b3JzW2lkIGVxICdUYXhvbm9teSddL2luc3RhbmNlc1sxXS91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG5cbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZVRheG9ub215XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGF4b25vbXlVVUlEXCI6IHRheG9ub215VVVJRFxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24od29ya2VyU3VjY2Vzcykge1xuXG4gICAgICAgICAgICAgICAgICAgIHdvcmtlci5zZXRXb3JrZXJJbmZvSW5TdWJwcm9jZXNzKHdvcmtlck9iamVjdCwgX1dGSW5zdGFuY2UsIHV1aWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdXb3JrZXIgcHJvY2Vzc2VzIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHdvcmtlckZhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdvcmtlckZhaWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG59KSgpO1xuXG52YXIgcGVyZm9ybWFuY2UgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICByZXR1cm4ge1xuXG5cbiAgICAgICAgdW5sb2NrUGVyaW9kOiBmdW5jdGlvbihfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgc3VicHJvY2Vzc09iamVjdCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuXG4gICAgICAgICAgICAgICAgLy8gbWVzc2FnZSBmcm9tIHN0ZXAgOiBUT0RPIFxuXG4gICAgICAgICAgICAgICAgdmFyIGVudHJ5VVVJRCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tpZCBlcSAnXCIgKyBQRVJJT0RfU0VUX0lEICsgXCInXS9pbnN0YW5jZXMvdXVpZFwiLCBzdWJwcm9jZXNzT2JqZWN0LCB7fSlbMF07XG4gICAgICAgICAgICAgICAgdmFyIGVuZGRhdGUgPSBzdWJwcm9jZXNzT2JqZWN0LmRhdGVzLnZhbGlkO1xuXG4gICAgICAgICAgICAgICAgbGlicmFyeS51bmxvY2tQZXJpb2QoZW50cnlVVUlELCBlbmRkYXRlLCB1dWlkKS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnVW5sb2NrIHBlcmlvZC4nLCBkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuXG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG5cblxuXG5cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0TW9kZWxTdGF0dXM6IGZ1bmN0aW9uKF9kZWYsIHV1aWQsIF9XRkluc3RhbmNlKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblxuXG4gICAgICAgICAgICAgICAgdmFyIHN1YnByb2Nlc3NPYmplY3QgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICB2YXIgZW50cnlVVUlEID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2lkIGVxICdcIiArIFBFUklPRF9TRVRfSUQgKyBcIiddL2luc3RhbmNlcy91dWlkXCIsIHN1YnByb2Nlc3NPYmplY3QsIHt9KVswXTtcbiAgICAgICAgICAgICAgICB2YXIgZW5kZGF0ZSA9IHN1YnByb2Nlc3NPYmplY3QuZGF0ZXMudmFsaWQ7XG5cbiAgICAgICAgICAgICAgICB2YXIgc3RhdHVzaTE4bkxhYmVsID0gSlNPTi54cGF0aChcIi9sYWJlbFwiLCBfZGVmLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgdmFyIHN0YXR1cyA9IGhlbHBlci5nZXRMYW5ndWFnZU1lc3NhZ2Uoc3RhdHVzaTE4bkxhYmVsKTtcblxuXG4gICAgICAgICAgICAgICAgbGlicmFyeS5zZXRQZXJpb2RTdGF0dXMoZW50cnlVVUlELCBlbmRkYXRlLCBzdGF0dXMsIHV1aWQpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdzZXRNb2RlbFN0YXR1cycsIGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG5cblxuXG5cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cblxuICAgICAgICBsb2NrUGVyZm9ybWFuY2VNb2RlbDogZnVuY3Rpb24oX2RlZiwgdXVpZCwgX1dGSW5zdGFuY2UpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHN1YnByb2Nlc3NPYmplY3QgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcblxuICAgICAgICAgICAgICAgIHZhciBlbnRyeVVVSUQgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbaWQgZXEgJ1wiICsgUEVSRk9STUFOQ0VfU0VUX0lEICsgXCInXS9pbnN0YW5jZXMvdXVpZFwiLCBzdWJwcm9jZXNzT2JqZWN0LCB7fSlbMF07XG4gICAgICAgICAgICAgICAgdmFyIGVuZGRhdGUgPSBzdWJwcm9jZXNzT2JqZWN0LmRhdGVzLnZhbGlkO1xuXG4gICAgICAgICAgICAgICAgbGlicmFyeS5sb2NrUGVyZm9ybWFuY2VNb2RlbChlbnRyeVVVSUQsIGVuZGRhdGUsIHV1aWQpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdMb2NrIHBlcmZvcm1hbmNlIG1vZGVsLicsIGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG5cblxuXG5cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH1cblxufSkoKTtcblxudmFyIHNkbyA9IChmdW5jdGlvbigpIHtcblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgY3JlYXRlOiBmdW5jdGlvbihfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcblxuICAgICAgICAgICAgICAgIHZhciBzdWJwcm9maWxlSWQgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGlmIChhcHAucHJvZmlsZSAhPSB1bmRlZmluZWQgJiYgYXBwLnByb2ZpbGUuc3VicHJvZmlsZUlkICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBzdWJwcm9maWxlSWQgPSBhcHAucHJvZmlsZS5zdWJwcm9maWxlSWQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG1vbWVudCgpLmZvcm1hdCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZW5kZXJVc2VySWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QucHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc3ViUHJvY2Vzc1VVSUQgPSB1dWlkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zdWJwcm9maWxlSWQgPSBzdWJwcm9maWxlSWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNoYW5uZWxzLnB1c2goXCJmb2xsb3dcIik7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNoYW5uZWxzLnB1c2goXCJjb21tdW5pdHlfXCIgKyBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKSk7XG4gICAgICAgICAgICAgICAgdmFyIHNkb1VVSUQgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnU0RPJ10vaW5zdGFuY2VzWzFdL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcblxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIFwiY3JlYXRlU0RPXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic2RvVVVJRFwiOiBzZG9VVUlEXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbih3b3JrZXJTdWNjZXNzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgd29ya2VyLnNldFdvcmtlckluZm9JblN1YnByb2Nlc3Mod29ya2VyT2JqZWN0LCBfV0ZJbnN0YW5jZSwgdXVpZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1dvcmtlciBwcm9jZXNzZXMgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24od29ya2VyRmFpbCkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbn0pKCk7XG5cbnZhciB0YXhvbm9teSA9IChmdW5jdGlvbigpIHtcblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgY3JlYXRlOiBmdW5jdGlvbihfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcblxuICAgICAgICAgICAgICAgIHZhciBzdWJwcm9maWxlSWQgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGlmIChhcHAucHJvZmlsZSAhPSB1bmRlZmluZWQgJiYgYXBwLnByb2ZpbGUuc3VicHJvZmlsZUlkICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBzdWJwcm9maWxlSWQgPSBhcHAucHJvZmlsZS5zdWJwcm9maWxlSWQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG1vbWVudCgpLmZvcm1hdCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZW5kZXJVc2VySWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QucHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc3ViUHJvY2Vzc1VVSUQgPSB1dWlkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zdWJwcm9maWxlSWQgPSBzdWJwcm9maWxlSWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNoYW5uZWxzLnB1c2goXCJmb2xsb3dcIik7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNoYW5uZWxzLnB1c2goXCJjb21tdW5pdHlfXCIgKyBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKSk7XG4gICAgICAgICAgICAgICAgdmFyIHRheG9ub215VVVJRCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pbmRpY2F0b3JzW2lkIGVxICdUYXhvbm9teSddL2luc3RhbmNlc1sxXS91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG5cbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZVRheG9ub215XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGF4b25vbXlVVUlEXCI6IHRheG9ub215VVVJRFxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24od29ya2VyU3VjY2Vzcykge1xuXG4gICAgICAgICAgICAgICAgICAgIHdvcmtlci5zZXRXb3JrZXJJbmZvSW5TdWJwcm9jZXNzKHdvcmtlck9iamVjdCwgX1dGSW5zdGFuY2UsIHV1aWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdXb3JrZXIgcHJvY2Vzc2VzIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHdvcmtlckZhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdvcmtlckZhaWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG59KSgpO1xuXG52YXIgc3ViUHJvY2Vzc0luc3RhbmNlID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICBzZXRUaXRsZTogZnVuY3Rpb24oX2RlZiwgdXVpZCwgZGF0YVZhbHVlLCBfV0ZJbnN0YW5jZSkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgc3BQcm9jZXNzT2JqZWN0ID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddXCIsIGFwcC5TQ09QRS53b3JrZmxvdywge30pWzBdO1xuICAgICAgICAgICAgICAgIHNwUHJvY2Vzc09iamVjdC5sYWJlbCA9IGRhdGFWYWx1ZTtcblxuICAgICAgICAgICAgICAgIHZhciBpdGVtc1RvUHJvY2VzcyA9IDE7XG4gICAgICAgICAgICAgICAgdmFyIHN0dWZmID0gW107XG4gICAgICAgICAgICAgICAgdmFyIG9iaiA9IHt9O1xuXG4gICAgICAgICAgICAgICAgb2JqLm1vZGVsID0gX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzO1xuICAgICAgICAgICAgICAgIHN0dWZmLnB1c2gob2JqKTtcbiAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnU3VicHJvY2VzcyBzZXRUaXRsZSBzdWNjZXNzLicsIF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlcyk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0VmFsaWREYXRlOiBmdW5jdGlvbihfZGVmLCB1dWlkLCBkYXRhVmFsdWUsIF9XRkluc3RhbmNlKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgICAgIHZhciBzcFByb2Nlc3NPYmplY3QgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ11cIiwgYXBwLlNDT1BFLndvcmtmbG93LCB7fSlbMF07XG4gICAgICAgICAgICAgICAgc3BQcm9jZXNzT2JqZWN0LmRhdGVzLnZhbGlkID0gZGF0YVZhbHVlO1xuXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW1zVG9Qcm9jZXNzID0gMTtcbiAgICAgICAgICAgICAgICB2YXIgc3R1ZmYgPSBbXTtcbiAgICAgICAgICAgICAgICB2YXIgb2JqID0ge307XG5cbiAgICAgICAgICAgICAgICBvYmoubW9kZWwgPSBzcFByb2Nlc3NPYmplY3Q7XG4gICAgICAgICAgICAgICAgc3R1ZmYucHVzaChvYmopO1xuXG4gICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ3ZhbGlkIGRhdGUgc2V0LicsIF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlcyk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0U1BTdGF0dXM6IGZ1bmN0aW9uKF9kZWYsIHV1aWQsIGRhdGFWYWx1ZSwgX1dGSW5zdGFuY2UpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHNwUHJvY2Vzc09iamVjdCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBhcHAuU0NPUEUud29ya2Zsb3csIHt9KVswXTtcbiAgICAgICAgICAgICAgICBzcFByb2Nlc3NPYmplY3Quc3BTdGF0dXMgPSBkYXRhVmFsdWU7XG5cbiAgICAgICAgICAgICAgICB2YXIgaXRlbXNUb1Byb2Nlc3MgPSAxO1xuICAgICAgICAgICAgICAgIHZhciBzdHVmZiA9IFtdO1xuICAgICAgICAgICAgICAgIHZhciBvYmogPSB7fTtcblxuICAgICAgICAgICAgICAgIG9iai5tb2RlbCA9IF9XRkluc3RhbmNlLnN1YnByb2Nlc3NlcztcbiAgICAgICAgICAgICAgICBzdHVmZi5wdXNoKG9iaik7XG4gICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1N1YnByb2Nlc3Mgc3BTdGF0dXMgc3VjY2Vzcy4nLCBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9LFxuXG4gICAgfVxuXG59KSgpO1xuXG52YXIgdmFyaWFibGVzID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICBzZXRWYXJpYWJsZTogZnVuY3Rpb24oc2V0VmFyaWFibGUsIF9XRkluc3RhbmNlLCB1dWlkKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgICAgIGhlbHBlci5nZXROb2RlVmFsdWUoc2V0VmFyaWFibGUuZGF0YSwgX1dGSW5zdGFuY2UsIHV1aWQpLnRoZW4oZnVuY3Rpb24oZGF0YVZhbHVlKSB7XG5cblxuICAgICAgICAgICAgICAgICAgICB2YXIgc2NvcGUgPSBzZXRWYXJpYWJsZS5zY29wZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhcmlhYmxlTmFtZSA9IHNldFZhcmlhYmxlLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YXJpYWJsZVR5cGUgPSBzZXRWYXJpYWJsZS52YXJpYWJsZVR5cGU7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbGlkRGF0ZSA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9kYXRlcy92YWxpZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoc2NvcGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3Byb2ZpbGUnOlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb2ZpbGVJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb2ZpbGVWYXJpYWJsZUZpbGVOYW1lID0gcHJvZmlsZUlkICsgJzp2YXJpYWJsZXMnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0eG5QYWNrZXQgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGFwcC5TQ09QRS50eG4pKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhby5nZXQocHJvZmlsZVZhcmlhYmxlRmlsZU5hbWUpLnRoZW4oZnVuY3Rpb24oZmlsZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWZQYWNrID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsb2NhbFByb2Nlc3MgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YXJpYWJsZVR5cGUgPT0gJ3BlcmlvZGljJykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogT3ZlcndyaXRlIHRoZSBleGlzdGluZyB2YXJpYWJsZSBpbiBjYXNlIHdoZXJlIHNhbWUgdmFyaWFibGUgaXMgYXNzaWduZWQgYXQgbXVsdGlwbGUgc3RlcHMuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvY2Vzc09iaiA9IEpTT04ueHBhdGgoXCIvaW5zdGFuY2UvcHJvY2Vzc2VzW3N1YlByb2Nlc3Nlcy91dWlkIGVxICdcIiArIHV1aWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlcSA9IHByb2Nlc3NPYmouc2VxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3ViUHJvY2Vzc1VVSURcIjogdXVpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlck5hbWVcIjogTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VybmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlcklkXCI6IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlclByb2ZpbGVJZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlcVwiOiBzZXEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsaWREYXRlXCI6IHZhbGlkRGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBkYXRhVmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsZVt2YXJpYWJsZU5hbWVdICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmFsKCdmaWxlLicgKyB2YXJpYWJsZU5hbWUgKyAnLnB1c2gob2JqKScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVbdmFyaWFibGVOYW1lXSA9IFtvYmpdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlW3ZhcmlhYmxlTmFtZV0gPSBkYXRhVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhby51cHNlcnQoZmlsZSkudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmUGFjay5yZXYgPSBkYXRhLnJldjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKFwiVmFyaWFibGUgc2V0IHN1Y2Nlc3NmdWxseVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiRmFpbGVkIHRvIHNldCBWYXJpYWJsZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHhuUGFja2V0LmRvY3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb2ZpbGVWYXJpYWJsZUZpbGVOYW1lID09IHR4blBhY2tldC5kb2N1bWVudHNbaV0uZG9jdW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZQYWNrID0gIHR4blBhY2tldC5kb2N1bWVudHNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFmb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHhuUGFja2V0LmRvY3VtZW50cyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmUGFjayA9IHsgXCJkb2N1bWVudFwiOiBwcm9maWxlVmFyaWFibGVGaWxlTmFtZSwgXCJyZXZcIjogZmlsZS5fcmV2IH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eG5QYWNrZXQuZG9jdW1lbnRzLnB1c2gocmVmUGFjayk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHAuU0NPUEUudHhuLmRvY3VtZW50cy5wdXNoKHJlZlBhY2spO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYW8udXBkYXRlVHJhbnNhY3Rpb24odHhuUGFja2V0KS50aGVuKGZ1bmN0aW9uKHN1Y2MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFByb2Nlc3MoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZXJyLnJlc3BvbnNlSlNPTiAhPSB1bmRlZmluZWQgJiYgZXJyLnJlc3BvbnNlSlNPTi5tZXNzYWdlICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIucmVzcG9uc2VKU09OLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihlcnIucmVzcG9uc2VUZXh0ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFByb2Nlc3MoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG5cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlsZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiX2lkXCI6IHByb2ZpbGVWYXJpYWJsZUZpbGVOYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZS5jaGFubmVscyA9IGFwcC5wcm9maWxlLmNoYW5uZWxzO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YXJpYWJsZVR5cGUgPT0gJ3BlcmlvZGljJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb2Nlc3NPYmogPSBKU09OLnhwYXRoKFwiL2luc3RhbmNlL3Byb2Nlc3Nlc1tzdWJQcm9jZXNzZXMvdXVpZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlcSA9IHByb2Nlc3NPYmouc2VxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZVt2YXJpYWJsZU5hbWVdID0gW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN1YlByb2Nlc3NVVUlEXCI6IHV1aWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VyTmFtZVwiOiBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVzZXJJZFwiOiBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJQcm9maWxlSWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VxXCI6IHNlcSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbGlkRGF0ZVwiOiB2YWxpZERhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBkYXRhVmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZVt2YXJpYWJsZU5hbWVdID0gZGF0YVZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGFvLnVwc2VydChmaWxlKS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoXCJWYXJpYWJsZSBzZXQgc3VjY2Vzc2Z1bGx5XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiRmFpbGVkIHRvIHNldCBWYXJpYWJsZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N1YlByb2Nlc3NJbnN0YW5jZSc6XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKFwibm90IGltcGxlbWVudGVkXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzdGVwJzpcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoXCJub3QgaW1wbGVtZW50ZWRcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzdWJQcm9maWxlU3ViUHJvY2Vzc0luc3RhbmNlJzpcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWJQcm9maWxlSWQgPSBhcHAucHJvZmlsZS5zdWJwcm9maWxlSWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1YlByb2ZpbGVWYXJpYWJsZUZpbGVOYW1lID0gc3ViUHJvZmlsZUlkICsgJzp2YXJpYWJsZXMnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdXBkYXRlIHRyeG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHhuUGFja2V0ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShhcHAuU0NPUEUudHhuKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGFvLmdldChzdWJQcm9maWxlVmFyaWFibGVGaWxlTmFtZSkudGhlbihmdW5jdGlvbihmaWxlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8vXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWZQYWNrID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsb2NhbFByb2Nlc3MgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YXJpYWJsZVR5cGUgPT0gJ3BlcmlvZGljJykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhcnQgPSBsaWJyYXJ5LmdldFN1YnByb2ZpbGVTdWJwcm9jZXNzSWRzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlcSA9IEpTT04ueHBhdGgoXCJjb3VudCgvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9wcmVjZWRpbmctc2libGluZzo6bm9kZSgpW2lkID0gL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaWQgYW5kIF9pZCA9IC9zdWJwcm9jZXNzZXNbX2lkID0gXCIgKyBwYXJ0ICsgXCJdL19pZF0pXCIsIF9XRkluc3RhbmNlLCB7fSlbMF0gKyAxO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN1YlByb2Nlc3NVVUlEXCI6IHV1aWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlclwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVzZXJOYW1lXCI6IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVzZXJJZFwiOiBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJQcm9maWxlSWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZXFcIjogc2VxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbGlkRGF0ZVwiOiB2YWxpZERhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZGF0YVZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGVbdmFyaWFibGVOYW1lXSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZhbCgnZmlsZS4nICsgdmFyaWFibGVOYW1lICsgJy5wdXNoKG9iaiknKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlW3ZhcmlhYmxlTmFtZV0gPSBbb2JqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZVt2YXJpYWJsZU5hbWVdID0gZGF0YVZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYW8udXBzZXJ0KGZpbGUpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZlBhY2sucmV2ID0gZGF0YS5yZXY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShcIlZhcmlhYmxlIGF0IHN1YnByb2ZpbGUgc2V0IHN1Y2Nlc3NmdWxseVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiRmFpbGVkIHRvIHNldCBWYXJpYWJsZSBhdCBzdWJwcm9maWxlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0eG5QYWNrZXQuZG9jdW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3ViUHJvZmlsZVZhcmlhYmxlRmlsZU5hbWUgPT0gdHhuUGFja2V0LmRvY3VtZW50c1tpXS5kb2N1bWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZlBhY2sgPSAgdHhuUGFja2V0LmRvY3VtZW50c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eG5QYWNrZXQuZG9jdW1lbnRzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZQYWNrID0geyBcImRvY3VtZW50XCI6IHN1YlByb2ZpbGVWYXJpYWJsZUZpbGVOYW1lLCBcInJldlwiOiBmaWxlLl9yZXYgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4blBhY2tldC5kb2N1bWVudHMucHVzaChyZWZQYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcC5TQ09QRS50eG4uZG9jdW1lbnRzLnB1c2gocmVmUGFjayk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhby51cGRhdGVUcmFuc2FjdGlvbih0eG5QYWNrZXQpLnRoZW4oZnVuY3Rpb24oc3VjYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsUHJvY2VzcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihlcnIucmVzcG9uc2VKU09OICE9IHVuZGVmaW5lZCAmJiBlcnIucmVzcG9uc2VKU09OLm1lc3NhZ2UgIT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVyci5yZXNwb25zZUpTT04ubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKGVyci5yZXNwb25zZVRleHQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsUHJvY2VzcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cblxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaWxlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJfaWRcIjogc3ViUHJvZmlsZVZhcmlhYmxlRmlsZU5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlLmNoYW5uZWxzID0gYXBwLnByb2ZpbGUuY2hhbm5lbHM7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhcmlhYmxlVHlwZSA9PSAncGVyaW9kaWMnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciBwcm9jZXNzT2JqID0gSlNPTi54cGF0aChcIi9pbnN0YW5jZS9wcm9jZXNzZXNbc3ViUHJvY2Vzc2VzL3V1aWQgZXEgJ1wiICsgdXVpZCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIHNlcSA9IHByb2Nlc3NPYmouc2VxO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciBzZXEgPSBKU09OLnhwYXRoKFwiY291bnQoL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vcHJlY2VkaW5nLXNpYmxpbmc6Om5vZGUoKVtpZCA9IC9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2lkIGFuZCBpZCA9IC9zdWJwcm9jZXNzZXNbX2lkID0gL2luc3RhbmNlL3Byb2Nlc3Nlcy9zdWJQcm9jZXNzZXNbc3VicHJvZmlsZUlkIGVxICdcIiArIHN1YlByb2ZpbGVJZCArIFwiJ10vdXVpZF0vX2lkXSlcIiwgX1dGSW5zdGFuY2UsIHt9KVswXSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFydCA9IGxpYnJhcnkuZ2V0U3VicHJvZmlsZVN1YnByb2Nlc3NJZHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZXEgPSBKU09OLnhwYXRoKFwiY291bnQoL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vcHJlY2VkaW5nLXNpYmxpbmc6Om5vZGUoKVtpZCA9IC9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2lkIGFuZCBfaWQgPSAvc3VicHJvY2Vzc2VzW19pZCA9IFwiICsgcGFydCArIFwiXS9faWRdKVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdICsgMTtcblxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVbdmFyaWFibGVOYW1lXSA9IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJQcm9jZXNzVVVJRFwiOiB1dWlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlclwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlck5hbWVcIjogTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VybmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VySWRcIjogTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VyUHJvZmlsZUlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlcVwiOiBzZXEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWxpZERhdGVcIjogdmFsaWREYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZGF0YVZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVbdmFyaWFibGVOYW1lXSA9IGRhdGFWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhby51cHNlcnQoZmlsZSkudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKFwiVmFyaWFibGUgYXQgc3VicHJvZmlsZSBzZXQgc3VjY2Vzc2Z1bGx5XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiRmFpbGVkIHRvIHNldCBWYXJpYWJsZSBhdCBzdWJwcm9maWxlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJnZXROb2RlVmFsdWUgdmFsdWUgbm90IGZvdW5kLlwiKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuXG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxufSkoKTtcblxudmFyIG5vdGlmaWNhdGlvbiA9IChmdW5jdGlvbigpIHtcblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgc2VuZE5vdGlmaWNhdGlvbldvcmtlcjogZnVuY3Rpb24obm90aWZpY2F0aW9uLCBfV0ZJbnN0YW5jZSwgdXVpZCkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cblxuICAgICAgICAgICAgICAgIHZhciBnZXRSZWNpcGllbnRzID0gZnVuY3Rpb24obm90aWZpY2F0aW9uKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlY2lwaWVudHMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChub3RpZmljYXRpb24ucmVjaXBpZW50cy5yb2xlICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjaXBpZW50cy5yb2xlID0gbm90aWZpY2F0aW9uLnJlY2lwaWVudHMucm9sZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlY2lwaWVudHMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5vdGlmaWNhdGlvbi5yZWNpcGllbnRzLnByb2ZpbGVSb2xlICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjaXBpZW50cy5wcm9maWxlUm9sZSA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY2lwaWVudHMucHJvZmlsZVJvbGUucm9sZSA9IG5vdGlmaWNhdGlvbi5yZWNpcGllbnRzLnByb2ZpbGVSb2xlLnJvbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjaXBpZW50cy5wcm9maWxlUm9sZS5wcm9maWxlID0gbm90aWZpY2F0aW9uLnJlY2lwaWVudHMucHJvZmlsZVJvbGUucHJvZmlsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlY2lwaWVudHMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5vdGlmaWNhdGlvbi5yZWNpcGllbnRzLnN1YlByb2ZpbGVSb2xlICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjaXBpZW50cy5zdWJQcm9maWxlUm9sZSA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY2lwaWVudHMuc3ViUHJvZmlsZVJvbGUucm9sZSA9IG5vdGlmaWNhdGlvbi5yZWNpcGllbnRzLnN1YlByb2ZpbGVSb2xlLnJvbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjaXBpZW50cy5zdWJQcm9maWxlUm9sZS5zdWJQcm9maWxlQ2F0ZWdvcnkgPSBub3RpZmljYXRpb24ucmVjaXBpZW50cy5zdWJQcm9maWxlUm9sZS5zdWJQcm9maWxlQ2F0ZWdvcnk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjaXBpZW50cy5zdWJQcm9maWxlUm9sZS5wcm9maWxlID0gbm90aWZpY2F0aW9uLnJlY2lwaWVudHMuc3ViUHJvZmlsZVJvbGUucHJvZmlsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlY2lwaWVudHMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5vdGlmaWNhdGlvbi5yZWNpcGllbnRzLmZ1bmN0aW9uICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjaXBpZW50cy5mdW5jdGlvbiA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY2lwaWVudHMuZnVuY3Rpb24udXNlcnMgPSB7fTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlbHBlci5nZXROb2RlVmFsdWUobm90aWZpY2F0aW9uLnJlY2lwaWVudHMuZnVuY3Rpb24udXNlcnMsIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uKGRhdGFWYWx1ZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY2lwaWVudHMuZnVuY3Rpb24udXNlcnMgPSBkYXRhVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVjaXBpZW50cyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5vdGlmaWNhdGlvbi5yZWNpcGllbnRzLnN0ZXBBc3NpZ25lZSAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY2lwaWVudHMuc3RlcEFzc2lnbmVlID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjaXBpZW50cy5zdGVwQXNzaWduZWUucm9sZSA9IG5vdGlmaWNhdGlvbi5yZWNpcGllbnRzLnN0ZXBBc3NpZ25lZS5yb2xlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVjaXBpZW50cyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gbmV3IE5vdGlmaWNhdGlvV29ya2VyKGFwcCk7XG5cblxuICAgICAgICAgICAgICAgIHZhciBzdWJQcm9maWxlSWQgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vbWV0YS1kYXRhL3N1YnByb2ZpbGVJZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuXG4gICAgICAgICAgICAgICAgdmFyIHBhdGhBcnJheSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpO1xuICAgICAgICAgICAgICAgIHZhciBiYXNlVVJMID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgd2luZG93LmxvY2F0aW9uLmhvc3QgKyBcIi9cIiArIHBhdGhBcnJheVsxXTtcblxuXG4gICAgICAgICAgICAgICAgdmFyIHN1YnByb2ZpbGVJZCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgaWYgKGFwcC5wcm9maWxlICE9IHVuZGVmaW5lZCAmJiBhcHAucHJvZmlsZS5zdWJwcm9maWxlSWQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YnByb2ZpbGVJZCA9IGFwcC5wcm9maWxlLnN1YnByb2ZpbGVJZDtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIFwibm90aWZpY2F0aW9uXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VUeXBlXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm1ldGEtZGF0YVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHBsaWNhdGlvbklkXCI6IF9XRkluc3RhbmNlLmFwcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbW11bml0eUlkXCI6IF9XRkluc3RhbmNlLmNvbW11bml0eUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZmlsZUlkXCI6IF9XRkluc3RhbmNlLnByb2ZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJQcm9jZXNzVVVJRFwiOiB1dWlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3ViUHJvZmlsZUlkXCI6IHN1YlByb2ZpbGVJZFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibm90aWZpY2F0aW9uVHlwZVwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJwcm9maWxlSWRcIjogc3VicHJvZmlsZUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZWNpcGllbnRzXCI6IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidXJsXCI6IGJhc2VVUkwsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImtleXNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZmlsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tbXVuaXR5XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHBsaWNhdGlvblwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY3VycmVudFVzZXJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN1YlByb2Nlc3NcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbGlkRGF0ZVwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImR1ZURhdGVcIjogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJub3RpZmljYXRpb25cIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZWREYXRlVGltZVwiOiBtb21lbnQoKS5mb3JtYXQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdGVwXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdGVwQ3JlYXRlZERhdGVUaW1lXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3RlcE5hbWVcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdGVwSWRcIjogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJub2RlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICogXG4gICAgICAgICAgICAgICAgS2V5cyBtZXNzYWdlIFxuICAgICAgICAgICAgICAgICovXG5cblxuXG5cbiAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yVGl0bGUgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbX2lkIGVxICdcIiArIGFwcC5wcm9maWxlLl9pZCArIFwiJ10vdGl0bGVcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMucHJvZmlsZS5uYW1lID0gaW5kaWNhdG9yVGl0bGU7XG5cbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMucHJvZmlsZS5pZCA9IGFwcC5wcm9maWxlLl9pZDtcblxuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5jb21tdW5pdHkubmFtZSA9IGFwcC5nZXROYW1lQnlMYW5nKExPQ0FMX1NFVFRJTkdTLkNPTU1VTklUWV9DT05GSUcuY29tbXVuaXR5TmFtZSk7XG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLmNvbW11bml0eS5pZCA9IExPQ0FMX1NFVFRJTkdTLkNPTU1VTklUWV9DT05GSUcuY29tbXVuaXR5SWQ7XG5cbiAgICAgICAgICAgICAgICB2YXIgYXBwbGljYXRpb24gPSBKU09OLnhwYXRoKFwiL2FwcGxpY2F0aW9uc1thcHBJZCBlcSAnXCIgKyBhcHAuU0NPUEUuYXBwbGljYXRpb25JZCArIFwiJ11cIiwgTE9DQUxfU0VUVElOR1MuQ09NTVVOSVRZX0NPTkZJRywge30pWzBdO1xuXG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLmFwcGxpY2F0aW9uLm5hbWUgPSBhcHAuZ2V0TmFtZUJ5TGFuZyhhcHBsaWNhdGlvbi5uYW1lKTtcbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMuYXBwbGljYXRpb24uaWQgPSBhcHBsaWNhdGlvbi5hcHBJZDtcblxuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5jdXJyZW50VXNlci5uYW1lID0gTE9DQUxfU0VUVElOR1MuU0VTU0lPTi5maXJzdE5hbWUgKyBcIiBcIiArIExPQ0FMX1NFVFRJTkdTLlNFU1NJT04ubGFzdE5hbWU7XG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLmN1cnJlbnRVc2VyLmlkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XG5cbiAgICAgICAgICAgICAgICB2YXIgc3ViUHJvY2Vzc09iamVjdCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuXG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLnN1YlByb2Nlc3MubmFtZSA9IHN1YlByb2Nlc3NPYmplY3QubGFiZWw7XG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLnN1YlByb2Nlc3MuaWQgPSB1dWlkO1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5zdWJQcm9jZXNzLnZhbGlkRGF0ZSA9IHN1YlByb2Nlc3NPYmplY3QuZGF0ZXMudmFsaWQ7XG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLnN1YlByb2Nlc3MuZHVlRGF0ZSA9IHN1YlByb2Nlc3NPYmplY3QuZGF0ZXMuZHVlO1xuXG4gICAgICAgICAgICAgICAgdmFyIHN0ZXBPYmplY3QgPSBzdWJQcm9jZXNzT2JqZWN0LnN0ZXA7XG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLnN0ZXAuc3RlcENyZWF0ZWREYXRlVGltZSA9IHN0ZXBPYmplY3QuZGF0ZVRpbWVDcmVhdGVkO1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5zdGVwLnN0ZXBJZCA9IHN0ZXBPYmplY3QuaWQ7XG5cbiAgICAgICAgICAgICAgICB2YXIgc3RlcENvbmZpZ09iamVjdCA9IEpTT04ueHBhdGgoXCIvcHJvY2Vzc2VzL3N1YlByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3ViUHJvY2Vzc09iamVjdC5pZCArIFwiJ10vc3RlcHNbX2lkIGVxICdcIiArIHN0ZXBPYmplY3QuaWQgKyBcIiddXCIsIGFwcC5TQ09QRS53b3JrZmxvdy5jb25maWcsIHt9KVswXTtcbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMuc3RlcC5zdGVwTmFtZSA9IGFwcC5nZXROYW1lQnlMYW5nKHN0ZXBDb25maWdPYmplY3QubmFtZSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgbm9kZVRpdGxlID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW19pZCBlcSAnXCIgKyBzdWJwcm9maWxlSWQgKyBcIiddL3RpdGxlXCIsIGFwcC5TQ09QRS53b3JrZmxvdywge30pWzBdO1xuICAgICAgICAgICAgICAgIGlmIChub2RlVGl0bGUgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5ub2RlLnRpdGxlID0gXCJcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMubm9kZS50aXRsZSA9IG5vZGVUaXRsZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgKiBcbiAgICAgICAgICAgICAgICBXb3JrZXIgbWVzc2FnZSBcbiAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubWVzc2FnZS5kZWZhdWx0ID0gbm90aWZpY2F0aW9uLm1lc3NhZ2UuZGVmYXVsdDtcbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm1lc3NhZ2UudGl0bGUgPSBub3RpZmljYXRpb24ubWVzc2FnZS50aXRsZTtcblxuICAgICAgICAgICAgICAgIGlmIChub3RpZmljYXRpb24ubWVzc2FnZS5ydGYgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubWVzc2FnZS5ydGYgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vdGlmaWNhdGlvbi5tZXNzYWdlLnJ0Zi50ZW1wbGF0ZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubWVzc2FnZS5ydGYudGVtcGxhdGUgPSBub3RpZmljYXRpb24ubWVzc2FnZS5ydGYudGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobm90aWZpY2F0aW9uLm1lc3NhZ2UucnRmLm1hcmt1cCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubWVzc2FnZS5ydGYubWFya3VwID0gbm90aWZpY2F0aW9uLm1lc3NhZ2UucnRmLm1hcmt1cDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAqIFxuICAgICAgICAgICAgICAgIFdvcmtlciBtZXNzYWdlVHlwZSBcbiAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubWVzc2FnZVR5cGUgPSBub3RpZmljYXRpb24ubWVzc2FnZVR5cGU7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgKiBcbiAgICAgICAgICAgICAgICBXb3JrZXIgbm90aWZpY2F0aW9uVHlwZSBcbiAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubm90aWZpY2F0aW9uVHlwZSA9IG5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25UeXBlO1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICogXG4gICAgICAgICAgICAgICAgV29ya2VyIHByaW9yaXR5IFxuICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5wcmlvcml0eSA9IG5vdGlmaWNhdGlvbi5wcmlvcml0eTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAqIFxuICAgICAgICAgICAgICAgIFdvcmtlciBub3RpZmljYXRpb25BY3Rpb24gaWYgZXhpc3RzIFxuICAgICAgICAgICAgICAgICovXG5cbiAgICAgICAgICAgICAgICBpZiAobm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbkFjdGlvbiAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbkFjdGlvbiA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbkFjdGlvbi5sYWJlbCA9IG5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25BY3Rpb24ubGFiZWw7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub3RpZmljYXRpb24ubm90aWZpY2F0aW9uQWN0aW9uLmFjdGlvbi5VUkkgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubm90aWZpY2F0aW9uQWN0aW9uLmFjdGlvbiA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uLlVSSSA9IG5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uLlVSSTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uLmdvdG8gIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubm90aWZpY2F0aW9uQWN0aW9uLmFjdGlvbiA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uLmdvdG8gPSBub3RpZmljYXRpb24ubm90aWZpY2F0aW9uQWN0aW9uLmFjdGlvbi5nb3RvO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobm90aWZpY2F0aW9uLnNjaGVkdWxlICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBleGVjdXRlT2JqZWN0ID0gbm90aWZpY2F0aW9uLnNjaGVkdWxlLmV4ZWN1dGVDb21tYW5kO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciB3b3JrZXJTY2hlZHVsZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGVUaW1lOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdW5pdDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhY3RvcjogXCJcIlxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4ZWN1dGVPYmplY3Qubm93ICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JrZXJTY2hlZHVsZS5kYXRlVGltZSA9IG1vbWVudCgpLmZvcm1hdCgpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChleGVjdXRlT2JqZWN0LmV4YWN0ICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JrZXJTY2hlZHVsZS5kYXRlVGltZSA9IGV4ZWN1dGVPYmplY3QuZXhhY3QuZGF0ZVRpbWU7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChleGVjdXRlT2JqZWN0LmR1ZURhdGUgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWJQcm9jZXNzT2JqZWN0ID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2FsY3VsYXRlZERhdGVUaW1lID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkdWVEYXRlID0gc3ViUHJvY2Vzc09iamVjdC5kYXRlcy5kdWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkdWVEYXRlICE9IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdGVkRGF0ZVRpbWUgPSBtb21lbnQoZHVlRGF0ZSwgXCJZWVlZLU1NLUREXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdGVkRGF0ZVRpbWUgPSBtb21lbnQoKS5mb3JtYXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgd29ya2VyU2NoZWR1bGUuZGF0ZVRpbWUgPSBjYWxjdWxhdGVkRGF0ZVRpbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JrZXJTY2hlZHVsZS5mYWN0b3IgPSBleGVjdXRlT2JqZWN0LmR1ZURhdGUuZmFjdG9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgd29ya2VyU2NoZWR1bGUudW5pdCA9IGV4ZWN1dGVPYmplY3QuZHVlRGF0ZS51bml0O1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZXhlY3V0ZU9iamVjdC52YWxpZERhdGUgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWJQcm9jZXNzT2JqZWN0ID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2FsY3VsYXRlZERhdGVUaW1lID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkdWVEYXRlID0gc3ViUHJvY2Vzc09iamVjdC5kYXRlcy52YWxpZDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbGlkRGF0ZSAhPSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRlZERhdGVUaW1lID0gbW9tZW50KHZhbGlkRGF0ZSwgXCJZWVlZLU1NLUREXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdGVkRGF0ZVRpbWUgPSBtb21lbnQoKS5mb3JtYXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgd29ya2VyU2NoZWR1bGUuZGF0ZVRpbWUgPSBjYWxjdWxhdGVkRGF0ZVRpbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JrZXJTY2hlZHVsZS5mYWN0b3IgPSBleGVjdXRlT2JqZWN0LnZhbGlkRGF0ZS5mYWN0b3I7XG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JrZXJTY2hlZHVsZS51bml0ID0gZXhlY3V0ZU9iamVjdC52YWxpZERhdGUudW5pdDtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGV4ZWN1dGVPYmplY3Quc3RlcENyZWF0ZWREYXRlICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3ViUHJvY2Vzc09iamVjdCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhbGN1bGF0ZWREYXRlVGltZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RlcENyZWF0ZWREYXRlVGltZSA9IHN1YlByb2Nlc3NPYmplY3Quc3RlcC5kdWVEYXRlVGltZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0ZXBDcmVhdGVkRGF0ZVRpbWUgIT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0ZWREYXRlVGltZSA9IG1vbWVudChzdGVwQ3JlYXRlZERhdGVUaW1lKS5mb3JtYXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRlZERhdGVUaW1lID0gbW9tZW50KCkuZm9ybWF0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtlclNjaGVkdWxlLmRhdGVUaW1lID0gY2FsY3VsYXRlZERhdGVUaW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgd29ya2VyU2NoZWR1bGUuZmFjdG9yID0gZXhlY3V0ZU9iamVjdC5zdGVwQ3JlYXRlZERhdGUuZmFjdG9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgd29ya2VyU2NoZWR1bGUudW5pdCA9IGV4ZWN1dGVPYmplY3Quc3RlcENyZWF0ZWREYXRlLnVuaXQ7XG5cblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JrZXJTY2hlZHVsZS5kYXRlVGltZSA9IG1vbWVudCgpLmZvcm1hdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2V0U2NoZWR1bGUod29ya2VyU2NoZWR1bGUpO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgKiBcbiAgICAgICAgICAgICAgICBXb3JrZXIgcmVjaXBpZW50c1xuICAgICAgICAgICAgICAgICovXG5cbiAgICAgICAgICAgICAgICBnZXRSZWNpcGllbnRzKG5vdGlmaWNhdGlvbikudGhlbihmdW5jdGlvbihyZWNpcGllbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5yZWNpcGllbnRzID0gcmVjaXBpZW50O1xuICAgICAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2V0TWVzc2FnZShcIlRoZSBzZXJ2ZXIgaXMgcHJvY2Vzc2luZyB5b3VyIHJlcXVlc3QuIFBsZWFzZSB3YWl0IGEgZmV3IHNlY29uZHMgYW5kIHRoZW4gY2xpY2sgdGhlIHJlZnJlc2ggYnV0dG9uLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNldEFjdGlvbihhY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3ViUHJvY2Vzc09iamVjdCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2V0Q29udGV4dCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcERhdGVUaW1lOiBzdWJQcm9jZXNzT2JqZWN0LnN0ZXAuZGF0ZVRpbWVDcmVhdGVkXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2VuZCgpLnRoZW4oZnVuY3Rpb24od29ya2VyU3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cod29ya2VyT2JqZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdOb3RpZmljYXRpb24gV29ya2VyIHByb2Nlc3NlcyBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHdvcmtlckZhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUod29ya2VyRmFpbCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vdGlmaWNhdGlvbiAtIGdldFJlY2lwaWVudHMgZmFpbGVkIHdpdGggZXJyb3IgXCIgKyBlcnIpO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcblxuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sXG5cblxuICAgICAgICByZUFzc2lnbm1lbnROb3RpZmljYXRpb246IGZ1bmN0aW9uKG5vdGlmaWNhdGlvbiwgX1dGSW5zdGFuY2UsIHV1aWQsIHVzZXIpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgZ2V0UmVjaXBpZW50cyA9IGZ1bmN0aW9uKHVzZXJPYmopIHtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVjaXBpZW50cyA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVjaXBpZW50cy5mdW5jdGlvbiA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVjaXBpZW50cy5mdW5jdGlvbi51c2VycyA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVjaXBpZW50cy5mdW5jdGlvbi51c2VycyA9IHVzZXJPYmouaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlY2lwaWVudHMpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSBuZXcgTm90aWZpY2F0aW9Xb3JrZXIoYXBwKTtcblxuICAgICAgICAgICAgICAgIHZhciBzdWJQcm9maWxlSWQgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vbWV0YS1kYXRhL3N1YnByb2ZpbGVJZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgIHZhciBwYXRoQXJyYXkgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJy8nKTtcbiAgICAgICAgICAgICAgICB2YXIgYmFzZVVSTCA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICsgXCIvXCIgKyBwYXRoQXJyYXlbMV07XG5cblxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIFwibm90aWZpY2F0aW9uXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJydGZcIjoge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVR5cGVcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibWV0YS1kYXRhXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFwcGxpY2F0aW9uSWRcIjogX1dGSW5zdGFuY2UuYXBwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tbXVuaXR5SWRcIjogX1dGSW5zdGFuY2UuY29tbXVuaXR5SWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxlSWRcIjogX1dGSW5zdGFuY2UucHJvZmlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN1YlByb2Nlc3NVVUlEXCI6IHV1aWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJQcm9maWxlSWRcIjogc3ViUHJvZmlsZUlkXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJub3RpZmljYXRpb25UeXBlXCI6IFwid29ya2Zsb3dcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicHJpb3JpdHlcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmVjaXBpZW50c1wiOiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcInVybFwiOiBiYXNlVVJMLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJrZXlzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb2ZpbGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbW11bml0eVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXBwbGljYXRpb25cIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImN1cnJlbnRVc2VyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJQcm9jZXNzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWxpZERhdGVcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkdWVEYXRlXCI6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibm90aWZpY2F0aW9uXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVkRGF0ZVRpbWVcIjogbW9tZW50KCkuZm9ybWF0KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3RlcFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3RlcENyZWF0ZWREYXRlVGltZVwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0ZXBOYW1lXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3RlcElkXCI6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibm9kZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAqIFxuICAgICAgICAgICAgICAgIEtleXMgbWVzc2FnZSBcbiAgICAgICAgICAgICAgICAqL1xuXG4gICAgICAgICAgICAgICAgdmFyIGluZGljYXRvclRpdGxlID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW19pZCBlcSAnXCIgKyBhcHAucHJvZmlsZS5faWQgKyBcIiddL3RpdGxlXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLnByb2ZpbGUubmFtZSA9IGluZGljYXRvclRpdGxlO1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5wcm9maWxlLmlkID0gYXBwLnByb2ZpbGUuX2lkO1xuXG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLmNvbW11bml0eS5uYW1lID0gYXBwLmdldE5hbWVCeUxhbmcoTE9DQUxfU0VUVElOR1MuQ09NTVVOSVRZX0NPTkZJRy5jb21tdW5pdHlOYW1lKTtcbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMuY29tbXVuaXR5LmlkID0gTE9DQUxfU0VUVElOR1MuQ09NTVVOSVRZX0NPTkZJRy5jb21tdW5pdHlJZDtcblxuICAgICAgICAgICAgICAgIHZhciBhcHBsaWNhdGlvbiA9IEpTT04ueHBhdGgoXCIvYXBwbGljYXRpb25zW2FwcElkIGVxICdcIiArIGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkICsgXCInXVwiLCBMT0NBTF9TRVRUSU5HUy5DT01NVU5JVFlfQ09ORklHLCB7fSlbMF07XG5cbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMuYXBwbGljYXRpb24ubmFtZSA9IGFwcC5nZXROYW1lQnlMYW5nKGFwcGxpY2F0aW9uLm5hbWUpO1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5hcHBsaWNhdGlvbi5pZCA9IGFwcGxpY2F0aW9uLmFwcElkO1xuXG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLmN1cnJlbnRVc2VyLm5hbWUgPSBMT0NBTF9TRVRUSU5HUy5TRVNTSU9OLmZpcnN0TmFtZSArIFwiIFwiICsgTE9DQUxfU0VUVElOR1MuU0VTU0lPTi5sYXN0TmFtZTtcbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMuY3VycmVudFVzZXIuaWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZDtcblxuXG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLnN1YlByb2Nlc3MubmFtZSA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9sYWJlbFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5zdWJQcm9jZXNzLmlkID0gdXVpZDtcblxuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5zdWJQcm9jZXNzLnZhbGlkRGF0ZSA9IHN1YlByb2Nlc3NPYmplY3QuZGF0ZXMudmFsaWQ7XG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLnN1YlByb2Nlc3MuZHVlRGF0ZSA9IHN1YlByb2Nlc3NPYmplY3QuZGF0ZXMuZHVlO1xuXG4gICAgICAgICAgICAgICAgdmFyIHN0ZXBPYmplY3QgPSBzdWJQcm9jZXNzT2JqZWN0LnN0ZXA7XG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLnN0ZXAuc3RlcENyZWF0ZWREYXRlVGltZSA9IHN0ZXBPYmplY3QuZGF0ZVRpbWVDcmVhdGVkO1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5zdGVwLnN0ZXBJZCA9IHN0ZXBPYmplY3QuaWQ7XG5cbiAgICAgICAgICAgICAgICB2YXIgc3RlcENvbmZpZ09iamVjdCA9IEpTT04ueHBhdGgoXCIvcHJvY2Vzc2VzL3N1YlByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3ViUHJvY2Vzc09iamVjdC5pZCArIFwiJ10vc3RlcHNbX2lkIGVxICdcIiArIHN0ZXBPYmplY3QuaWQgKyBcIiddXCIsIGFwcC5TQ09QRS53b3JrZmxvdy5jb25maWcsIHt9KVswXTtcbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMuc3RlcC5zdGVwTmFtZSA9IGFwcC5nZXROYW1lQnlMYW5nKHN0ZXBDb25maWdPYmplY3QubmFtZSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgbm9kZVRpdGxlID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW19pZCBlcSAnXCIgKyBzdWJwcm9maWxlSWQgKyBcIiddL3RpdGxlXCIsIGFwcC5TQ09QRS53b3JrZmxvdywge30pWzBdO1xuICAgICAgICAgICAgICAgIGlmIChub2RlVGl0bGUgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5ub2RlLnRpdGxlID0gXCJcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMubm9kZS50aXRsZSA9IG5vZGVUaXRsZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAqIFxuICAgICAgICAgICAgICAgIFdvcmtlciBtZXNzYWdlIFxuICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5tZXNzYWdlLmRlZmF1bHQgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubWVzc2FnZS50aXRsZSA9IG5vdGlmaWNhdGlvbi5yZUFzc2lnbm1lbnQudGl0bGU7XG5cbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm1lc3NhZ2UucnRmLm1hcmt1cCA9IG5vdGlmaWNhdGlvbi5yZUFzc2lnbm1lbnQubWVzc2FnZTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAqIFxuICAgICAgICAgICAgICAgIFdvcmtlciBtZXNzYWdlVHlwZSBcbiAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubWVzc2FnZVR5cGUgPSBub3RpZmljYXRpb24ucmVBc3NpZ25tZW50Lm1lc3NhZ2VUeXBlO1xuXG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAqIFxuICAgICAgICAgICAgICAgIFdvcmtlciBwcmlvcml0eSBcbiAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ucHJpb3JpdHkgPSBub3RpZmljYXRpb24ucmVBc3NpZ25tZW50LnByaW9yaXR5O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICogXG4gICAgICAgICAgICAgICAgV29ya2VyIG5vdGlmaWNhdGlvbkFjdGlvbiBpZiBleGlzdHMgXG4gICAgICAgICAgICAgICAgKi9cblxuICAgICAgICAgICAgICAgIGlmIChub3RpZmljYXRpb24ucmVBc3NpZ25tZW50Lm5vdGlmaWNhdGlvbkFjdGlvbiAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbkFjdGlvbiA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbkFjdGlvbi5sYWJlbCA9IG5vdGlmaWNhdGlvbi5yZUFzc2lnbm1lbnQubm90aWZpY2F0aW9uQWN0aW9uLmxhYmVsO1xuICAgICAgICAgICAgICAgICAgICBpZiAobm90aWZpY2F0aW9uLnJlQXNzaWdubWVudC5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uLlVSSSAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbkFjdGlvbi5hY3Rpb24uVVJJID0gbm90aWZpY2F0aW9uLnJlQXNzaWdubWVudC5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uLlVSSTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5vdGlmaWNhdGlvbi5yZUFzc2lnbm1lbnQubm90aWZpY2F0aW9uQWN0aW9uLmFjdGlvbi5nb3RvICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbkFjdGlvbi5hY3Rpb24gPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubm90aWZpY2F0aW9uQWN0aW9uLmFjdGlvbi5nb3RvID0gbm90aWZpY2F0aW9uLnJlQXNzaWdubWVudC5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uLmdvdG87XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgaWYgKG5vdGlmaWNhdGlvbi5yZUFzc2lnbm1lbnQuc2NoZWR1bGUgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGV4ZWN1dGVPYmplY3QgPSBub3RpZmljYXRpb24ucmVBc3NpZ25tZW50LnNjaGVkdWxlLmV4ZWN1dGVDb21tYW5kO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciB3b3JrZXJTY2hlZHVsZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGVUaW1lOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdW5pdDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhY3RvcjogXCJcIlxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4ZWN1dGVPYmplY3Qubm93ICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JrZXJTY2hlZHVsZS5kYXRlVGltZSA9IG1vbWVudCgpLmZvcm1hdCgpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChleGVjdXRlT2JqZWN0LmV4YWN0ICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JrZXJTY2hlZHVsZS5kYXRlVGltZSA9IGV4ZWN1dGVPYmplY3QuZXhhY3QuZGF0ZVRpbWU7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChleGVjdXRlT2JqZWN0LmR1ZURhdGUgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWJQcm9jZXNzT2JqZWN0ID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2FsY3VsYXRlZERhdGVUaW1lID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkdWVEYXRlID0gc3ViUHJvY2Vzc09iamVjdC5kYXRlcy5kdWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkdWVEYXRlICE9IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdGVkRGF0ZVRpbWUgPSBtb21lbnQoZHVlRGF0ZSwgXCJZWVlZLU1NLUREXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdGVkRGF0ZVRpbWUgPSBtb21lbnQoKS5mb3JtYXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgd29ya2VyU2NoZWR1bGUuZGF0ZVRpbWUgPSBjYWxjdWxhdGVkRGF0ZVRpbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JrZXJTY2hlZHVsZS5mYWN0b3IgPSBleGVjdXRlT2JqZWN0LmR1ZURhdGUuZmFjdG9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgd29ya2VyU2NoZWR1bGUudW5pdCA9IGV4ZWN1dGVPYmplY3QuZHVlRGF0ZS51bml0O1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZXhlY3V0ZU9iamVjdC52YWxpZERhdGUgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWJQcm9jZXNzT2JqZWN0ID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2FsY3VsYXRlZERhdGVUaW1lID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkdWVEYXRlID0gc3ViUHJvY2Vzc09iamVjdC5kYXRlcy52YWxpZDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbGlkRGF0ZSAhPSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRlZERhdGVUaW1lID0gbW9tZW50KHZhbGlkRGF0ZSwgXCJZWVlZLU1NLUREXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdGVkRGF0ZVRpbWUgPSBtb21lbnQoKS5mb3JtYXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgd29ya2VyU2NoZWR1bGUuZGF0ZVRpbWUgPSBjYWxjdWxhdGVkRGF0ZVRpbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JrZXJTY2hlZHVsZS5mYWN0b3IgPSBleGVjdXRlT2JqZWN0LnZhbGlkRGF0ZS5mYWN0b3I7XG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JrZXJTY2hlZHVsZS51bml0ID0gZXhlY3V0ZU9iamVjdC52YWxpZERhdGUudW5pdDtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGV4ZWN1dGVPYmplY3Quc3RlcENyZWF0ZWREYXRlICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3ViUHJvY2Vzc09iamVjdCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhbGN1bGF0ZWREYXRlVGltZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RlcENyZWF0ZWREYXRlVGltZSA9IHN1YlByb2Nlc3NPYmplY3Quc3RlcC5kdWVEYXRlVGltZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0ZXBDcmVhdGVkRGF0ZVRpbWUgIT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0ZWREYXRlVGltZSA9IG1vbWVudChzdGVwQ3JlYXRlZERhdGVUaW1lKS5mb3JtYXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRlZERhdGVUaW1lID0gbW9tZW50KCkuZm9ybWF0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtlclNjaGVkdWxlLmRhdGVUaW1lID0gY2FsY3VsYXRlZERhdGVUaW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgd29ya2VyU2NoZWR1bGUuZmFjdG9yID0gZXhlY3V0ZU9iamVjdC5zdGVwQ3JlYXRlZERhdGUuZmFjdG9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgd29ya2VyU2NoZWR1bGUudW5pdCA9IGV4ZWN1dGVPYmplY3Quc3RlcENyZWF0ZWREYXRlLnVuaXQ7XG5cblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JrZXJTY2hlZHVsZS5kYXRlVGltZSA9IG1vbWVudCgpLmZvcm1hdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2V0U2NoZWR1bGUod29ya2VyU2NoZWR1bGUpO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICogXG4gICAgICAgICAgICAgICAgV29ya2VyIHJlY2lwaWVudHNcbiAgICAgICAgICAgICAgICAqL1xuXG4gICAgICAgICAgICAgICAgZ2V0UmVjaXBpZW50cyh1c2VyKS50aGVuKGZ1bmN0aW9uKHJlY2lwaWVudCkge1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLnJlY2lwaWVudHMgPSByZWNpcGllbnQ7XG4gICAgICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZXRBY3Rpb24oYWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNldE1lc3NhZ2UoXCJUaGUgc2VydmVyIGlzIHByb2Nlc3NpbmcgeW91ciByZXF1ZXN0LiBQbGVhc2Ugd2FpdCBhIGZldyBzZWNvbmRzIGFuZCB0aGVuIGNsaWNrIHRoZSByZWZyZXNoIGJ1dHRvbi5cIik7XG4gICAgICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZW5kKCkudGhlbihmdW5jdGlvbih3b3JrZXJTdWNjZXNzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdOb3RpZmljYXRpb24gV29ya2VyIHByb2Nlc3NlcyBzdWNjZXNzZnVsbHkgZm9yIHJlYXNzaWdubWVudC4nLCB3b3JrZXJTdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24od29ya2VyRmFpbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh3b3JrZXJGYWlsKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm90aWZpY2F0aW9uIC0gZ2V0UmVjaXBpZW50cyBmYWlsZWQgd2l0aCBlcnJvciBcIiArIGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuXG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICBhc3NpZ25tZW50Tm90aWZpY2F0aW9uOiBmdW5jdGlvbihub3RpZmljYXRpb24sIF9XRkluc3RhbmNlLCB1dWlkLCB1c2VyKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblxuXG4gICAgICAgICAgICAgICAgdmFyIGdldFJlY2lwaWVudHMgPSBmdW5jdGlvbih1c2VyT2JqKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlY2lwaWVudHMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY2lwaWVudHMuZnVuY3Rpb24gPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY2lwaWVudHMuZnVuY3Rpb24udXNlcnMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY2lwaWVudHMuZnVuY3Rpb24udXNlcnMgPSB1c2VyT2JqLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZWNpcGllbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IG5ldyBOb3RpZmljYXRpb1dvcmtlcihhcHApO1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgc3ViUHJvZmlsZUlkID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL21ldGEtZGF0YS9zdWJwcm9maWxlSWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcblxuICAgICAgICAgICAgICAgIHZhciBwYXRoQXJyYXkgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJy8nKTtcbiAgICAgICAgICAgICAgICB2YXIgYmFzZVVSTCA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICsgXCIvXCIgKyBwYXRoQXJyYXlbMV07XG5cblxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIFwibm90aWZpY2F0aW9uXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJydGZcIjoge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVR5cGVcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibWV0YS1kYXRhXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFwcGxpY2F0aW9uSWRcIjogX1dGSW5zdGFuY2UuYXBwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tbXVuaXR5SWRcIjogX1dGSW5zdGFuY2UuY29tbXVuaXR5SWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxlSWRcIjogX1dGSW5zdGFuY2UucHJvZmlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN1YlByb2Nlc3NVVUlEXCI6IHV1aWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJQcm9maWxlSWRcIjogc3ViUHJvZmlsZUlkXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJub3RpZmljYXRpb25UeXBlXCI6IFwid29ya2Zsb3dcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicHJpb3JpdHlcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmVjaXBpZW50c1wiOiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcInVybFwiOiBiYXNlVVJMLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJrZXlzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb2ZpbGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbW11bml0eVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXBwbGljYXRpb25cIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImN1cnJlbnRVc2VyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJQcm9jZXNzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWxpZERhdGVcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkdWVEYXRlXCI6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibm90aWZpY2F0aW9uXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVkRGF0ZVRpbWVcIjogbW9tZW50KCkuZm9ybWF0KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3RlcFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3RlcENyZWF0ZWREYXRlVGltZVwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0ZXBOYW1lXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3RlcElkXCI6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibm9kZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAqIFxuICAgICAgICAgICAgICAgIEtleXMgbWVzc2FnZSBcbiAgICAgICAgICAgICAgICAqL1xuXG4gICAgICAgICAgICAgICAgdmFyIGluZGljYXRvclRpdGxlID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW19pZCBlcSAnXCIgKyBhcHAucHJvZmlsZS5faWQgKyBcIiddL3RpdGxlXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLnByb2ZpbGUubmFtZSA9IGluZGljYXRvclRpdGxlO1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5wcm9maWxlLmlkID0gYXBwLnByb2ZpbGUuX2lkO1xuXG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLmNvbW11bml0eS5uYW1lID0gYXBwLmdldE5hbWVCeUxhbmcoTE9DQUxfU0VUVElOR1MuQ09NTVVOSVRZX0NPTkZJRy5jb21tdW5pdHlOYW1lKTtcbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMuY29tbXVuaXR5LmlkID0gTE9DQUxfU0VUVElOR1MuQ09NTVVOSVRZX0NPTkZJRy5jb21tdW5pdHlJZDtcblxuICAgICAgICAgICAgICAgIHZhciBhcHBsaWNhdGlvbiA9IEpTT04ueHBhdGgoXCIvYXBwbGljYXRpb25zW2FwcElkIGVxICdcIiArIGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkICsgXCInXVwiLCBMT0NBTF9TRVRUSU5HUy5DT01NVU5JVFlfQ09ORklHLCB7fSlbMF07XG5cbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMuYXBwbGljYXRpb24ubmFtZSA9IGFwcC5nZXROYW1lQnlMYW5nKGFwcGxpY2F0aW9uLm5hbWUpO1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5hcHBsaWNhdGlvbi5pZCA9IGFwcGxpY2F0aW9uLmFwcElkO1xuXG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLmN1cnJlbnRVc2VyLm5hbWUgPSBMT0NBTF9TRVRUSU5HUy5TRVNTSU9OLmZpcnN0TmFtZSArIFwiIFwiICsgTE9DQUxfU0VUVElOR1MuU0VTU0lPTi5sYXN0TmFtZTtcbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMuY3VycmVudFVzZXIuaWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZDtcblxuXG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLnN1YlByb2Nlc3MubmFtZSA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9sYWJlbFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5zdWJQcm9jZXNzLmlkID0gdXVpZDtcblxuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5zdWJQcm9jZXNzLnZhbGlkRGF0ZSA9IHN1YlByb2Nlc3NPYmplY3QuZGF0ZXMudmFsaWQ7XG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLnN1YlByb2Nlc3MuZHVlRGF0ZSA9IHN1YlByb2Nlc3NPYmplY3QuZGF0ZXMuZHVlO1xuXG4gICAgICAgICAgICAgICAgdmFyIHN0ZXBPYmplY3QgPSBzdWJQcm9jZXNzT2JqZWN0LnN0ZXA7XG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLnN0ZXAuc3RlcENyZWF0ZWREYXRlVGltZSA9IHN0ZXBPYmplY3QuZGF0ZVRpbWVDcmVhdGVkO1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5zdGVwLnN0ZXBJZCA9IHN0ZXBPYmplY3QuaWQ7XG5cbiAgICAgICAgICAgICAgICB2YXIgc3RlcENvbmZpZ09iamVjdCA9IEpTT04ueHBhdGgoXCIvcHJvY2Vzc2VzL3N1YlByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3ViUHJvY2Vzc09iamVjdC5pZCArIFwiJ10vc3RlcHNbX2lkIGVxICdcIiArIHN0ZXBPYmplY3QuaWQgKyBcIiddXCIsIGFwcC5TQ09QRS53b3JrZmxvdy5jb25maWcsIHt9KVswXTtcbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMuc3RlcC5zdGVwTmFtZSA9IGFwcC5nZXROYW1lQnlMYW5nKHN0ZXBDb25maWdPYmplY3QubmFtZSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgbm9kZVRpdGxlID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW19pZCBlcSAnXCIgKyBzdWJwcm9maWxlSWQgKyBcIiddL3RpdGxlXCIsIGFwcC5TQ09QRS53b3JrZmxvdywge30pWzBdO1xuICAgICAgICAgICAgICAgIGlmIChub2RlVGl0bGUgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5ub2RlLnRpdGxlID0gXCJcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMubm9kZS50aXRsZSA9IG5vZGVUaXRsZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAqIFxuICAgICAgICAgICAgICAgIFdvcmtlciBtZXNzYWdlIFxuICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5tZXNzYWdlLmRlZmF1bHQgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubWVzc2FnZS50aXRsZSA9IG5vdGlmaWNhdGlvbi5hc3NpZ25tZW50LnRpdGxlO1xuXG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5tZXNzYWdlLnJ0Zi5tYXJrdXAgPSBub3RpZmljYXRpb24uYXNzaWdubWVudC5tZXNzYWdlO1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICogXG4gICAgICAgICAgICAgICAgV29ya2VyIG1lc3NhZ2VUeXBlIFxuICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5tZXNzYWdlVHlwZSA9IG5vdGlmaWNhdGlvbi5hc3NpZ25tZW50Lm1lc3NhZ2VUeXBlO1xuXG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAqIFxuICAgICAgICAgICAgICAgIFdvcmtlciBwcmlvcml0eSBcbiAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ucHJpb3JpdHkgPSBub3RpZmljYXRpb24uYXNzaWdubWVudC5wcmlvcml0eTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAqIFxuICAgICAgICAgICAgICAgIFdvcmtlciBub3RpZmljYXRpb25BY3Rpb24gaWYgZXhpc3RzIFxuICAgICAgICAgICAgICAgICovXG5cbiAgICAgICAgICAgICAgICBpZiAobm90aWZpY2F0aW9uLmFzc2lnbm1lbnQubm90aWZpY2F0aW9uQWN0aW9uICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubm90aWZpY2F0aW9uQWN0aW9uID0ge307XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubm90aWZpY2F0aW9uQWN0aW9uLmxhYmVsID0gbm90aWZpY2F0aW9uLmFzc2lnbm1lbnQubm90aWZpY2F0aW9uQWN0aW9uLmxhYmVsO1xuICAgICAgICAgICAgICAgICAgICBpZiAobm90aWZpY2F0aW9uLmFzc2lnbm1lbnQubm90aWZpY2F0aW9uQWN0aW9uLmFjdGlvbi5VUkkgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubm90aWZpY2F0aW9uQWN0aW9uLmFjdGlvbiA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uLlVSSSA9IG5vdGlmaWNhdGlvbi5hc3NpZ25tZW50Lm5vdGlmaWNhdGlvbkFjdGlvbi5hY3Rpb24uVVJJO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobm90aWZpY2F0aW9uLmFzc2lnbm1lbnQubm90aWZpY2F0aW9uQWN0aW9uLmFjdGlvbi5nb3RvICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbkFjdGlvbi5hY3Rpb24gPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubm90aWZpY2F0aW9uQWN0aW9uLmFjdGlvbi5nb3RvID0gbm90aWZpY2F0aW9uLmFzc2lnbm1lbnQubm90aWZpY2F0aW9uQWN0aW9uLmFjdGlvbi5nb3RvO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobm90aWZpY2F0aW9uLmFzc2lnbm1lbnQuc2NoZWR1bGUgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGV4ZWN1dGVPYmplY3QgPSBub3RpZmljYXRpb24uYXNzaWdubWVudC5zY2hlZHVsZS5leGVjdXRlQ29tbWFuZDtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgd29ya2VyU2NoZWR1bGUgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRlVGltZTogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuaXQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWN0b3I6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChleGVjdXRlT2JqZWN0Lm5vdyAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgd29ya2VyU2NoZWR1bGUuZGF0ZVRpbWUgPSBtb21lbnQoKS5mb3JtYXQoKTtcblxuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZXhlY3V0ZU9iamVjdC5leGFjdCAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgd29ya2VyU2NoZWR1bGUuZGF0ZVRpbWUgPSBleGVjdXRlT2JqZWN0LmV4YWN0LmRhdGVUaW1lO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZXhlY3V0ZU9iamVjdC5kdWVEYXRlICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3ViUHJvY2Vzc09iamVjdCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhbGN1bGF0ZWREYXRlVGltZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZHVlRGF0ZSA9IHN1YlByb2Nlc3NPYmplY3QuZGF0ZXMuZHVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZHVlRGF0ZSAhPSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRlZERhdGVUaW1lID0gbW9tZW50KGR1ZURhdGUsIFwiWVlZWS1NTS1ERFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRlZERhdGVUaW1lID0gbW9tZW50KCkuZm9ybWF0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtlclNjaGVkdWxlLmRhdGVUaW1lID0gY2FsY3VsYXRlZERhdGVUaW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgd29ya2VyU2NoZWR1bGUuZmFjdG9yID0gZXhlY3V0ZU9iamVjdC5kdWVEYXRlLmZhY3RvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtlclNjaGVkdWxlLnVuaXQgPSBleGVjdXRlT2JqZWN0LmR1ZURhdGUudW5pdDtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGV4ZWN1dGVPYmplY3QudmFsaWREYXRlICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3ViUHJvY2Vzc09iamVjdCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhbGN1bGF0ZWREYXRlVGltZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZHVlRGF0ZSA9IHN1YlByb2Nlc3NPYmplY3QuZGF0ZXMudmFsaWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWxpZERhdGUgIT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0ZWREYXRlVGltZSA9IG1vbWVudCh2YWxpZERhdGUsIFwiWVlZWS1NTS1ERFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRlZERhdGVUaW1lID0gbW9tZW50KCkuZm9ybWF0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtlclNjaGVkdWxlLmRhdGVUaW1lID0gY2FsY3VsYXRlZERhdGVUaW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgd29ya2VyU2NoZWR1bGUuZmFjdG9yID0gZXhlY3V0ZU9iamVjdC52YWxpZERhdGUuZmFjdG9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgd29ya2VyU2NoZWR1bGUudW5pdCA9IGV4ZWN1dGVPYmplY3QudmFsaWREYXRlLnVuaXQ7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChleGVjdXRlT2JqZWN0LnN0ZXBDcmVhdGVkRGF0ZSAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1YlByb2Nlc3NPYmplY3QgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYWxjdWxhdGVkRGF0ZVRpbWUgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0ZXBDcmVhdGVkRGF0ZVRpbWUgPSBzdWJQcm9jZXNzT2JqZWN0LnN0ZXAuZHVlRGF0ZVRpbWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGVwQ3JlYXRlZERhdGVUaW1lICE9IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdGVkRGF0ZVRpbWUgPSBtb21lbnQoc3RlcENyZWF0ZWREYXRlVGltZSkuZm9ybWF0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0ZWREYXRlVGltZSA9IG1vbWVudCgpLmZvcm1hdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JrZXJTY2hlZHVsZS5kYXRlVGltZSA9IGNhbGN1bGF0ZWREYXRlVGltZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtlclNjaGVkdWxlLmZhY3RvciA9IGV4ZWN1dGVPYmplY3Quc3RlcENyZWF0ZWREYXRlLmZhY3RvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtlclNjaGVkdWxlLnVuaXQgPSBleGVjdXRlT2JqZWN0LnN0ZXBDcmVhdGVkRGF0ZS51bml0O1xuXG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgd29ya2VyU2NoZWR1bGUuZGF0ZVRpbWUgPSBtb21lbnQoKS5mb3JtYXQoKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNldFNjaGVkdWxlKHdvcmtlclNjaGVkdWxlKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICogXG4gICAgICAgICAgICAgICAgV29ya2VyIHJlY2lwaWVudHNcbiAgICAgICAgICAgICAgICAqL1xuXG4gICAgICAgICAgICAgICAgZ2V0UmVjaXBpZW50cyh1c2VyKS50aGVuKGZ1bmN0aW9uKHJlY2lwaWVudCkge1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLnJlY2lwaWVudHMgPSByZWNpcGllbnQ7XG4gICAgICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZXRBY3Rpb24oYWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNldE1lc3NhZ2UoXCJUaGUgc2VydmVyIGlzIHByb2Nlc3NpbmcgeW91ciByZXF1ZXN0LiBQbGVhc2Ugd2FpdCBhIGZldyBzZWNvbmRzIGFuZCB0aGVuIGNsaWNrIHRoZSByZWZyZXNoIGJ1dHRvbi5cIik7XG4gICAgICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZW5kKCkudGhlbihmdW5jdGlvbih3b3JrZXJTdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh3b3JrZXJPYmplY3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ05vdGlmaWNhdGlvbiBXb3JrZXIgcHJvY2Vzc2VzIHN1Y2Nlc3NmdWxseSBmb3IgYXNzaWdubWVudC4nLCB3b3JrZXJTdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24od29ya2VyRmFpbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh3b3JrZXJGYWlsKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm90aWZpY2F0aW9uIC0gZ2V0UmVjaXBpZW50cyBmYWlsZWQgd2l0aCBlcnJvciBcIiArIGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuXG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICBhY2NlcHRhbmNlTm90aWZpY2F0aW9uOiBmdW5jdGlvbihub3RpZmljYXRpb24sIF9XRkluc3RhbmNlLCB1dWlkLCByb2xlKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblxuXG4gICAgICAgICAgICAgICAgdmFyIGdldFJvbGVzID0gZnVuY3Rpb24ocm9sZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWNpcGllbnRzID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICByZWNpcGllbnRzLnJvbGUgPSByb2xlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZWNpcGllbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IG5ldyBOb3RpZmljYXRpb1dvcmtlcihhcHApO1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgc3ViUHJvZmlsZUlkID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL21ldGEtZGF0YS9zdWJwcm9maWxlSWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcblxuICAgICAgICAgICAgICAgIHZhciBwYXRoQXJyYXkgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJy8nKTtcbiAgICAgICAgICAgICAgICB2YXIgYmFzZVVSTCA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICsgXCIvXCIgKyBwYXRoQXJyYXlbMV07XG5cblxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIFwibm90aWZpY2F0aW9uXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJydGZcIjoge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVR5cGVcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibWV0YS1kYXRhXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFwcGxpY2F0aW9uSWRcIjogX1dGSW5zdGFuY2UuYXBwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tbXVuaXR5SWRcIjogX1dGSW5zdGFuY2UuY29tbXVuaXR5SWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxlSWRcIjogX1dGSW5zdGFuY2UucHJvZmlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN1YlByb2Nlc3NVVUlEXCI6IHV1aWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJQcm9maWxlSWRcIjogc3ViUHJvZmlsZUlkXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJub3RpZmljYXRpb25UeXBlXCI6IFwid29ya2Zsb3dcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicHJpb3JpdHlcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmVjaXBpZW50c1wiOiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcInVybFwiOiBiYXNlVVJMLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJrZXlzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb2ZpbGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbW11bml0eVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXBwbGljYXRpb25cIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImN1cnJlbnRVc2VyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJQcm9jZXNzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWxpZERhdGVcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkdWVEYXRlXCI6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibm90aWZpY2F0aW9uXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVkRGF0ZVRpbWVcIjogbW9tZW50KCkuZm9ybWF0KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3RlcFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3RlcENyZWF0ZWREYXRlVGltZVwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0ZXBOYW1lXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3RlcElkXCI6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibm9kZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAqIFxuICAgICAgICAgICAgICAgIEtleXMgbWVzc2FnZSBcbiAgICAgICAgICAgICAgICAqL1xuXG4gICAgICAgICAgICAgICAgdmFyIGluZGljYXRvclRpdGxlID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW19pZCBlcSAnXCIgKyBhcHAucHJvZmlsZS5faWQgKyBcIiddL3RpdGxlXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLnByb2ZpbGUubmFtZSA9IGluZGljYXRvclRpdGxlO1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5wcm9maWxlLmlkID0gYXBwLnByb2ZpbGUuX2lkO1xuXG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLmNvbW11bml0eS5uYW1lID0gYXBwLmdldE5hbWVCeUxhbmcoTE9DQUxfU0VUVElOR1MuQ09NTVVOSVRZX0NPTkZJRy5jb21tdW5pdHlOYW1lKTtcbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMuY29tbXVuaXR5LmlkID0gTE9DQUxfU0VUVElOR1MuQ09NTVVOSVRZX0NPTkZJRy5jb21tdW5pdHlJZDtcblxuICAgICAgICAgICAgICAgIHZhciBhcHBsaWNhdGlvbiA9IEpTT04ueHBhdGgoXCIvYXBwbGljYXRpb25zW2FwcElkIGVxICdcIiArIGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkICsgXCInXVwiLCBMT0NBTF9TRVRUSU5HUy5DT01NVU5JVFlfQ09ORklHLCB7fSlbMF07XG5cbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMuYXBwbGljYXRpb24ubmFtZSA9IGFwcC5nZXROYW1lQnlMYW5nKGFwcGxpY2F0aW9uLm5hbWUpO1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5hcHBsaWNhdGlvbi5pZCA9IGFwcGxpY2F0aW9uLmFwcElkO1xuXG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLmN1cnJlbnRVc2VyLm5hbWUgPSBMT0NBTF9TRVRUSU5HUy5TRVNTSU9OLmZpcnN0TmFtZSArIFwiIFwiICsgTE9DQUxfU0VUVElOR1MuU0VTU0lPTi5sYXN0TmFtZTtcbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMuY3VycmVudFVzZXIuaWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZDtcblxuXG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLnN1YlByb2Nlc3MubmFtZSA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9sYWJlbFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5zdWJQcm9jZXNzLmlkID0gdXVpZDtcblxuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5zdWJQcm9jZXNzLnZhbGlkRGF0ZSA9IHN1YlByb2Nlc3NPYmplY3QuZGF0ZXMudmFsaWQ7XG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLnN1YlByb2Nlc3MuZHVlRGF0ZSA9IHN1YlByb2Nlc3NPYmplY3QuZGF0ZXMuZHVlO1xuXG4gICAgICAgICAgICAgICAgdmFyIHN0ZXBPYmplY3QgPSBzdWJQcm9jZXNzT2JqZWN0LnN0ZXA7XG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLnN0ZXAuc3RlcENyZWF0ZWREYXRlVGltZSA9IHN0ZXBPYmplY3QuZGF0ZVRpbWVDcmVhdGVkO1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5zdGVwLnN0ZXBJZCA9IHN0ZXBPYmplY3QuaWQ7XG5cbiAgICAgICAgICAgICAgICB2YXIgc3RlcENvbmZpZ09iamVjdCA9IEpTT04ueHBhdGgoXCIvcHJvY2Vzc2VzL3N1YlByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3ViUHJvY2Vzc09iamVjdC5pZCArIFwiJ10vc3RlcHNbX2lkIGVxICdcIiArIHN0ZXBPYmplY3QuaWQgKyBcIiddXCIsIGFwcC5TQ09QRS53b3JrZmxvdy5jb25maWcsIHt9KVswXTtcbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMuc3RlcC5zdGVwTmFtZSA9IGFwcC5nZXROYW1lQnlMYW5nKHN0ZXBDb25maWdPYmplY3QubmFtZSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgbm9kZVRpdGxlID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW19pZCBlcSAnXCIgKyBzdWJwcm9maWxlSWQgKyBcIiddL3RpdGxlXCIsIGFwcC5TQ09QRS53b3JrZmxvdywge30pWzBdO1xuICAgICAgICAgICAgICAgIGlmIChub2RlVGl0bGUgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5ub2RlLnRpdGxlID0gXCJcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMubm9kZS50aXRsZSA9IG5vZGVUaXRsZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAqIFxuICAgICAgICAgICAgICAgIFdvcmtlciBtZXNzYWdlIFxuICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5tZXNzYWdlLmRlZmF1bHQgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubWVzc2FnZS50aXRsZSA9IG5vdGlmaWNhdGlvbi5hc3NpZ25tZW50QWNjZXB0YW5jZS50aXRsZTtcblxuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubWVzc2FnZS5ydGYubWFya3VwID0gbm90aWZpY2F0aW9uLmFzc2lnbm1lbnRBY2NlcHRhbmNlLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgKiBcbiAgICAgICAgICAgICAgICBXb3JrZXIgbWVzc2FnZVR5cGUgXG4gICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm1lc3NhZ2VUeXBlID0gbm90aWZpY2F0aW9uLmFzc2lnbm1lbnRBY2NlcHRhbmNlLm1lc3NhZ2VUeXBlO1xuXG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAqIFxuICAgICAgICAgICAgICAgIFdvcmtlciBwcmlvcml0eSBcbiAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ucHJpb3JpdHkgPSBub3RpZmljYXRpb24uYXNzaWdubWVudEFjY2VwdGFuY2UucHJpb3JpdHk7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgKiBcbiAgICAgICAgICAgICAgICBXb3JrZXIgbm90aWZpY2F0aW9uQWN0aW9uIGlmIGV4aXN0cyBcbiAgICAgICAgICAgICAgICAqL1xuXG4gICAgICAgICAgICAgICAgaWYgKG5vdGlmaWNhdGlvbi5hc3NpZ25tZW50QWNjZXB0YW5jZS5ub3RpZmljYXRpb25BY3Rpb24gIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25BY3Rpb24gPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25BY3Rpb24ubGFiZWwgPSBub3RpZmljYXRpb24uYXNzaWdubWVudEFjY2VwdGFuY2Uubm90aWZpY2F0aW9uQWN0aW9uLmxhYmVsO1xuICAgICAgICAgICAgICAgICAgICBpZiAobm90aWZpY2F0aW9uLmFzc2lnbm1lbnRBY2NlcHRhbmNlLm5vdGlmaWNhdGlvbkFjdGlvbi5hY3Rpb24uVVJJICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbkFjdGlvbi5hY3Rpb24gPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubm90aWZpY2F0aW9uQWN0aW9uLmFjdGlvbi5VUkkgPSBub3RpZmljYXRpb24uYXNzaWdubWVudEFjY2VwdGFuY2Uubm90aWZpY2F0aW9uQWN0aW9uLmFjdGlvbi5VUkk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChub3RpZmljYXRpb24uYXNzaWdubWVudEFjY2VwdGFuY2Uubm90aWZpY2F0aW9uQWN0aW9uLmFjdGlvbi5nb3RvICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbkFjdGlvbi5hY3Rpb24gPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubm90aWZpY2F0aW9uQWN0aW9uLmFjdGlvbi5nb3RvID0gbm90aWZpY2F0aW9uLmFzc2lnbm1lbnRBY2NlcHRhbmNlLm5vdGlmaWNhdGlvbkFjdGlvbi5hY3Rpb24uZ290bztcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG5vdGlmaWNhdGlvbi5hc3NpZ25tZW50QWNjZXB0YW5jZS5zY2hlZHVsZSAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgZXhlY3V0ZU9iamVjdCA9IG5vdGlmaWNhdGlvbi5hc3NpZ25tZW50QWNjZXB0YW5jZS5zY2hlZHVsZS5leGVjdXRlQ29tbWFuZDtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgd29ya2VyU2NoZWR1bGUgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRlVGltZTogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuaXQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWN0b3I6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChleGVjdXRlT2JqZWN0Lm5vdyAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgd29ya2VyU2NoZWR1bGUuZGF0ZVRpbWUgPSBtb21lbnQoKS5mb3JtYXQoKTtcblxuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZXhlY3V0ZU9iamVjdC5leGFjdCAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgd29ya2VyU2NoZWR1bGUuZGF0ZVRpbWUgPSBleGVjdXRlT2JqZWN0LmV4YWN0LmRhdGVUaW1lO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZXhlY3V0ZU9iamVjdC5kdWVEYXRlICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3ViUHJvY2Vzc09iamVjdCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhbGN1bGF0ZWREYXRlVGltZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZHVlRGF0ZSA9IHN1YlByb2Nlc3NPYmplY3QuZGF0ZXMuZHVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZHVlRGF0ZSAhPSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRlZERhdGVUaW1lID0gbW9tZW50KGR1ZURhdGUsIFwiWVlZWS1NTS1ERFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRlZERhdGVUaW1lID0gbW9tZW50KCkuZm9ybWF0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtlclNjaGVkdWxlLmRhdGVUaW1lID0gY2FsY3VsYXRlZERhdGVUaW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgd29ya2VyU2NoZWR1bGUuZmFjdG9yID0gZXhlY3V0ZU9iamVjdC5kdWVEYXRlLmZhY3RvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtlclNjaGVkdWxlLnVuaXQgPSBleGVjdXRlT2JqZWN0LmR1ZURhdGUudW5pdDtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGV4ZWN1dGVPYmplY3QudmFsaWREYXRlICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3ViUHJvY2Vzc09iamVjdCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhbGN1bGF0ZWREYXRlVGltZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZHVlRGF0ZSA9IHN1YlByb2Nlc3NPYmplY3QuZGF0ZXMudmFsaWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWxpZERhdGUgIT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0ZWREYXRlVGltZSA9IG1vbWVudCh2YWxpZERhdGUsIFwiWVlZWS1NTS1ERFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRlZERhdGVUaW1lID0gbW9tZW50KCkuZm9ybWF0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtlclNjaGVkdWxlLmRhdGVUaW1lID0gY2FsY3VsYXRlZERhdGVUaW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgd29ya2VyU2NoZWR1bGUuZmFjdG9yID0gZXhlY3V0ZU9iamVjdC52YWxpZERhdGUuZmFjdG9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgd29ya2VyU2NoZWR1bGUudW5pdCA9IGV4ZWN1dGVPYmplY3QudmFsaWREYXRlLnVuaXQ7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChleGVjdXRlT2JqZWN0LnN0ZXBDcmVhdGVkRGF0ZSAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1YlByb2Nlc3NPYmplY3QgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYWxjdWxhdGVkRGF0ZVRpbWUgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0ZXBDcmVhdGVkRGF0ZVRpbWUgPSBzdWJQcm9jZXNzT2JqZWN0LnN0ZXAuZHVlRGF0ZVRpbWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGVwQ3JlYXRlZERhdGVUaW1lICE9IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdGVkRGF0ZVRpbWUgPSBtb21lbnQoc3RlcENyZWF0ZWREYXRlVGltZSkuZm9ybWF0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0ZWREYXRlVGltZSA9IG1vbWVudCgpLmZvcm1hdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JrZXJTY2hlZHVsZS5kYXRlVGltZSA9IGNhbGN1bGF0ZWREYXRlVGltZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtlclNjaGVkdWxlLmZhY3RvciA9IGV4ZWN1dGVPYmplY3Quc3RlcENyZWF0ZWREYXRlLmZhY3RvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtlclNjaGVkdWxlLnVuaXQgPSBleGVjdXRlT2JqZWN0LnN0ZXBDcmVhdGVkRGF0ZS51bml0O1xuXG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgd29ya2VyU2NoZWR1bGUuZGF0ZVRpbWUgPSBtb21lbnQoKS5mb3JtYXQoKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNldFNjaGVkdWxlKHdvcmtlclNjaGVkdWxlKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICogXG4gICAgICAgICAgICAgICAgV29ya2VyIHJlY2lwaWVudHNcbiAgICAgICAgICAgICAgICAqL1xuXG4gICAgICAgICAgICAgICAgZ2V0Um9sZXMocm9sZSkudGhlbihmdW5jdGlvbihyZWNpcGllbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5yZWNpcGllbnRzID0gcmVjaXBpZW50O1xuICAgICAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2V0QWN0aW9uKGFjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZXRNZXNzYWdlKFwiVGhlIHNlcnZlciBpcyBwcm9jZXNzaW5nIHlvdXIgcmVxdWVzdC4gUGxlYXNlIHdhaXQgYSBmZXcgc2Vjb25kcyBhbmQgdGhlbiBjbGljayB0aGUgcmVmcmVzaCBidXR0b24uXCIpO1xuICAgICAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2V0Q29udGV4dCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzOiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbih3b3JrZXJTdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh3b3JrZXJPYmplY3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ05vdGlmaWNhdGlvbiBXb3JrZXIgcHJvY2Vzc2VzIHN1Y2Nlc3NmdWxseSBmb3IgYXNzaWdubWVudC4nLCB3b3JrZXJTdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24od29ya2VyRmFpbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh3b3JrZXJGYWlsKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm90aWZpY2F0aW9uIC0gZ2V0UmVjaXBpZW50cyBmYWlsZWQgd2l0aCBlcnJvciBcIiArIGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuXG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbn0pKCk7XG5cblxudmFyIHJlcG9ydCA9IChmdW5jdGlvbigpIHtcblxuICAgIHJldHVybiB7XG5cblxuXG5cbiAgICAgICAgY3JlYXRlUGVyZm9ybWFuY2VSZXBvcnQ6IGZ1bmN0aW9uKHBlcmZvcm1hbmNlUmVwb3J0T2JqZWN0LCBfV0ZJbnN0YW5jZSwgdXVpZCkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcblxuICAgICAgICAgICAgICAgIHZhciBzdWJwcm9maWxlSWQgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGlmIChhcHAucHJvZmlsZSAhPSB1bmRlZmluZWQgJiYgYXBwLnByb2ZpbGUuc3VicHJvZmlsZUlkICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBzdWJwcm9maWxlSWQgPSBhcHAucHJvZmlsZS5zdWJwcm9maWxlSWQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG1vbWVudCgpLmZvcm1hdCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZW5kZXJVc2VySWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QucHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc3ViUHJvY2Vzc1VVSUQgPSB1dWlkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zdWJwcm9maWxlSWQgPSBzdWJwcm9maWxlSWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNoYW5uZWxzLnB1c2goXCJjcmVhdGVQZXJmb3JtYW5jZVJlcG9ydFwiKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY2hhbm5lbHMucHVzaChcImNvbW11bml0eV9cIiArIGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpKTtcbiAgICAgICAgICAgICAgICB2YXIgd29ya3BsYW5TZXRJZCA9IHBlcmZvcm1hbmNlUmVwb3J0T2JqZWN0LndvcmtwbGFuU2V0SWQ7XG4gICAgICAgICAgICAgICAgdmFyIGNvbmZpZ1NldElkID0gcGVyZm9ybWFuY2VSZXBvcnRPYmplY3QuY29uZmlnU2V0SWQ7XG5cblxuICAgICAgICAgICAgICAgIC8vIHdvcmtwbGFuU2V0SWQgc2NvcGUgaXMgcHJvZmlsZVxuICAgICAgICAgICAgICAgIC8vIGNvbmZpZ1NldElkIHNjb3BlIGlzIHN1YnByb2Nlc3Nlc1xuXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtwbGFuVVVJRCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdcIiArIHdvcmtwbGFuU2V0SWQgKyBcIiddL19pZFwiLCBhcHAuU0NPUEUud29ya2Zsb3csIHt9KVswXTtcbiAgICAgICAgICAgICAgICB2YXIgY29uZmlnVVVJRCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pbmRpY2F0b3JzW2lkIGVxICdcIiArIGNvbmZpZ1NldElkICsgXCInXS9pbnN0YW5jZXNbMV0vdXVpZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZVBlcmZvcm1hbmNlUmVwb3J0XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwid29ya3BsYW5VVUlEXCI6IHdvcmtwbGFuVVVJRCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29uZmlnVVVJRFwiOiBjb25maWdVVUlELFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxJZFwiOiBfV0ZJbnN0YW5jZS5wcm9maWxlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24od29ya2VyU3VjY2Vzcykge1xuXG4gICAgICAgICAgICAgICAgICAgIHdvcmtlci5zZXRXb3JrZXJJbmZvSW5TdWJwcm9jZXNzKHdvcmtlck9iamVjdCwgX1dGSW5zdGFuY2UsIHV1aWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdXb3JrcGxhblJlcG9ydCBXb3JrZXIgcHJvY2Vzc2VkIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHdvcmtlckZhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdvcmtlckZhaWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICBjcmVhdGVSZXBvcnQ6IGZ1bmN0aW9uKGNyZWF0ZVJlcG9ydCwgX1dGSW5zdGFuY2UsIHV1aWQpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IHdvcmtlci5nZXRXb3JrZXJXcmFwcGVyKCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgc3VicHJvZmlsZUlkID0gXCJcIjtcbiAgICAgICAgICAgICAgICBpZiAoYXBwLnByb2ZpbGUgIT0gdW5kZWZpbmVkICYmIGFwcC5wcm9maWxlLnN1YnByb2ZpbGVJZCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3VicHJvZmlsZUlkID0gYXBwLnByb2ZpbGUuc3VicHJvZmlsZUlkO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5faWQgPSBnZW5lcmF0ZVVVSUQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY29tbXVuaXR5SWQgPSBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYXBwbGljYXRpb25JZCA9IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jcmVhdGVkRGF0ZVRpbWUgPSBtb21lbnQoKS5mb3JtYXQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2VuZGVyVXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnByb2ZpbGVJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnN1YlByb2Nlc3NVVUlEID0gdXVpZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc3VicHJvZmlsZUlkID0gc3VicHJvZmlsZUlkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jaGFubmVscy5wdXNoKFwiZXhlY3V0ZVJlcG9ydFwiKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY2hhbm5lbHMucHVzaChcImNvbW11bml0eV9cIiArIGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpKTtcblxuICAgICAgICAgICAgICAgIHZhciBwZXJmb3JtYW5jZVJlcG9ydERlZmluaXRpb25TZXRJZCA9IGNyZWF0ZVJlcG9ydC5QZXJmb3JtYW5jZVJlcG9ydERlZmluaXRpb25TZXRJZDtcbiAgICAgICAgICAgICAgICB2YXIgcmVwb3J0aW5nU0RPU2V0SWQgPSBjcmVhdGVSZXBvcnQucmVwb3J0aW5nU0RPU2V0SWQ7XG5cbiAgICAgICAgICAgICAgICB2YXIgcGVyZm9ybWFuY2VSZXBvcnREZWZpbml0aW9uID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ1wiICsgcGVyZm9ybWFuY2VSZXBvcnREZWZpbml0aW9uU2V0SWQgKyBcIiddL19pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgIHZhciByZXBvcnRpbmdTRE8gPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnXCIgKyByZXBvcnRpbmdTRE9TZXRJZCArIFwiJ10vaW5zdGFuY2VzWzFdL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcblxuXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVSZXBvcnRcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJwZXJmb3JtYW5jZVJlcG9ydERlZmluaXRpb25cIjogcGVyZm9ybWFuY2VSZXBvcnREZWZpbml0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZXBvcnRpbmdTRE9cIjogcmVwb3J0aW5nU0RPLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxJZFwiOiBfV0ZJbnN0YW5jZS5wcm9maWxlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24od29ya2VyU3VjY2Vzcykge1xuXG4gICAgICAgICAgICAgICAgICAgIHdvcmtlci5zZXRXb3JrZXJJbmZvSW5TdWJwcm9jZXNzKHdvcmtlck9iamVjdCwgX1dGSW5zdGFuY2UsIHV1aWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdSZXByb3QgV29ya2VyIHByb2Nlc3NlZCBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbih3b3JrZXJGYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh3b3JrZXJGYWlsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sXG5cblxuXG5cbiAgICAgICAgc2RvUmVwb3J0OiBmdW5jdGlvbihzZG9SZXBvcnQsIF9XRkluc3RhbmNlLCB1dWlkKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHN1YnByb2ZpbGVJZCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgaWYgKGFwcC5wcm9maWxlICE9IHVuZGVmaW5lZCAmJiBhcHAucHJvZmlsZS5zdWJwcm9maWxlSWQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YnByb2ZpbGVJZCA9IGFwcC5wcm9maWxlLnN1YnByb2ZpbGVJZDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbW9tZW50KCkuZm9ybWF0KCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5wcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zdWJQcm9jZXNzVVVJRCA9IHV1aWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnN1YnByb2ZpbGVJZCA9IHN1YnByb2ZpbGVJZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY2hhbm5lbHMucHVzaChcInNkb1JlcG9ydFwiKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY2hhbm5lbHMucHVzaChcImNvbW11bml0eV9cIiArIGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpKTtcblxuICAgICAgICAgICAgICAgIHZhciBzZXRJZCA9IHNkb1JlcG9ydC5pbmRpY2F0b3JTZXRJZDtcbiAgICAgICAgICAgICAgICB2YXIgc2RvUmVwb3J0VVVJRCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pbmRpY2F0b3JzW2lkIGVxICdcIiArIHNldElkICsgXCInXS9pbnN0YW5jZXNbMV0vdXVpZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICBcInNkb1JlcG9ydFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInNkb1JlcG9ydFVVSURcIjogc2RvUmVwb3J0VVVJRCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYXBwbGljYXRpb25JZFwiOiBhcHAuU0NPUEUuYXBwbGljYXRpb25JZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tbXVuaXR5SWRcIjogYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBcInByb2ZpbGVJZFwiOiBhcHAuU0NPUEUud29ya2Zsb3cucHJvZmlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3ViUHJvY2Vzc1VVSURcIjogdXVpZFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hY3Rpb24gPSBhY3Rpb247XG4gICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uKHdvcmtlclN1Y2Nlc3MpIHtcblxuICAgICAgICAgICAgICAgICAgICB3b3JrZXIuc2V0V29ya2VySW5mb0luU3VicHJvY2Vzcyh3b3JrZXJPYmplY3QsIF9XRkluc3RhbmNlLCB1dWlkKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygncmVwb3J0IFdvcmtlciBwcm9jZXNzZWQgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24od29ya2VyRmFpbCkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIGV4ZWN1dGVSZXBvcnQ6IGZ1bmN0aW9uKGV4ZWN1dGVSZXBvcnQsIF9XRkluc3RhbmNlLCB1dWlkKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHN1YnByb2ZpbGVJZCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgaWYgKGFwcC5wcm9maWxlICE9IHVuZGVmaW5lZCAmJiBhcHAucHJvZmlsZS5zdWJwcm9maWxlSWQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YnByb2ZpbGVJZCA9IGFwcC5wcm9maWxlLnN1YnByb2ZpbGVJZDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbW9tZW50KCkuZm9ybWF0KCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5wcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zdWJQcm9jZXNzVVVJRCA9IHV1aWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnN1YnByb2ZpbGVJZCA9IHN1YnByb2ZpbGVJZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY2hhbm5lbHMucHVzaChcImV4ZWN1dGVSZXBvcnRcIik7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNoYW5uZWxzLnB1c2goXCJjb21tdW5pdHlfXCIgKyBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKSk7XG5cblxuXG4gICAgICAgICAgICAgICAgdmFyIFNET3JlcG9ydFNldElkID0gZXhlY3V0ZVJlcG9ydC5TRE9yZXBvcnRTZXRJZDtcbiAgICAgICAgICAgICAgICB2YXIgcmVwb3J0aW5nU0RPU2V0aWQgPSBleGVjdXRlUmVwb3J0LnJlcG9ydGluZ1NET1NldGlkO1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgU0RPcmVwb3J0VVVJRCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pbmRpY2F0b3JzW2lkIGVxICdcIiArIFNET3JlcG9ydFNldElkICsgXCInXS9pbnN0YW5jZXNbMV0vdXVpZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgIHZhciByZXBvcnRpbmdTRE9VVUlEID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ1wiICsgcmVwb3J0aW5nU0RPU2V0aWQgKyBcIiddL2luc3RhbmNlc1sxXS91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG5cbiAgICAgICAgICAgICAgICBpZiAoU0RPcmVwb3J0VVVJRCA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgU0RPcmVwb3J0VVVJRCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdcIiArIFNET3JlcG9ydFNldElkICsgXCInXS9faWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIFwiZXhlY3V0ZVJlcG9ydFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInNkb1JlcG9ydFVVSURcIjogU0RPcmVwb3J0VVVJRCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmVwb3J0aW5nU0RPVVVJRFwiOiByZXBvcnRpbmdTRE9VVUlELFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHBsaWNhdGlvbklkXCI6IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21tdW5pdHlJZFwiOiBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZmlsZUlkXCI6IGFwcC5TQ09QRS53b3JrZmxvdy5wcm9maWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJQcm9jZXNzVVVJRFwiOiB1dWlkXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24od29ya2VyU3VjY2Vzcykge1xuXG4gICAgICAgICAgICAgICAgICAgIHdvcmtlci5zZXRXb3JrZXJJbmZvSW5TdWJwcm9jZXNzKHdvcmtlck9iamVjdCwgX1dGSW5zdGFuY2UsIHV1aWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdyZXBvcnQgV29ya2VyIHByb2Nlc3NlZCBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbih3b3JrZXJGYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh3b3JrZXJGYWlsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2VuZXJhdGVWaWV3OiBmdW5jdGlvbihnZW5lcmF0ZVZpZXcsIF9XRkluc3RhbmNlLCB1dWlkKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHN1YnByb2ZpbGVJZCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgaWYgKGFwcC5wcm9maWxlICE9IHVuZGVmaW5lZCAmJiBhcHAucHJvZmlsZS5zdWJwcm9maWxlSWQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YnByb2ZpbGVJZCA9IGFwcC5wcm9maWxlLnN1YnByb2ZpbGVJZDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbW9tZW50KCkuZm9ybWF0KCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5wcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zdWJQcm9jZXNzVVVJRCA9IHV1aWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnN1YnByb2ZpbGVJZCA9IHN1YnByb2ZpbGVJZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY2hhbm5lbHMucHVzaChcInNkb1JlcG9ydFwiKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY2hhbm5lbHMucHVzaChcImNvbW11bml0eV9cIiArIGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpKTtcbiAgICAgICAgICAgICAgICB2YXIgVmlld0NvbmZpZ1NldElkID0gZ2VuZXJhdGVWaWV3LlZpZXdDb25maWdTZXRJZDtcbiAgICAgICAgICAgICAgICB2YXIgVmlld0NvbmZpZ1VVSUQgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnXCIgKyBWaWV3Q29uZmlnU2V0SWQgKyBcIiddL2luc3RhbmNlc1sxXS91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG5cblxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIFwiZ2VuZXJhdGVWaWV3XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmlld0NvbmZpZ1VVSURcIjogVmlld0NvbmZpZ1VVSUQsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFwcGxpY2F0aW9uSWRcIjogYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbW11bml0eUlkXCI6IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxlSWRcIjogYXBwLlNDT1BFLndvcmtmbG93LnByb2ZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInN1YlByb2Nlc3NVVUlEXCI6IHV1aWRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbih3b3JrZXJTdWNjZXNzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgd29ya2VyLnNldFdvcmtlckluZm9JblN1YnByb2Nlc3Mod29ya2VyT2JqZWN0LCBfV0ZJbnN0YW5jZSwgdXVpZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ3JlcG9ydCBXb3JrZXIgcHJvY2Vzc2VkIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHdvcmtlckZhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdvcmtlckZhaWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICByZXF1ZXN0UmVwb3J0OiBmdW5jdGlvbihyZXF1ZXN0UmVwb3J0LCBfV0ZJbnN0YW5jZSwgdXVpZCkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcblxuICAgICAgICAgICAgICAgIHZhciBzdWJwcm9maWxlSWQgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGlmIChhcHAucHJvZmlsZSAhPSB1bmRlZmluZWQgJiYgYXBwLnByb2ZpbGUuc3VicHJvZmlsZUlkICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBzdWJwcm9maWxlSWQgPSBhcHAucHJvZmlsZS5zdWJwcm9maWxlSWQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG1vbWVudCgpLmZvcm1hdCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZW5kZXJVc2VySWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QucHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc3ViUHJvY2Vzc1VVSUQgPSB1dWlkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zdWJwcm9maWxlSWQgPSBzdWJwcm9maWxlSWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNoYW5uZWxzLnB1c2goXCJleGVjdXRlUmVwb3J0XCIpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jaGFubmVscy5wdXNoKFwiY29tbXVuaXR5X1wiICsgYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCkpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHNkb1JlcXVlc3RSZXBvcnRTZXRJZCA9IHJlcXVlc3RSZXBvcnQuc2RvUmVxdWVzdFJlcG9ydFNldElkO1xuICAgICAgICAgICAgICAgIHZhciBzZG9SZXBvcnRDcmVhdGlvblNldElkID0gcmVxdWVzdFJlcG9ydC5zZG9SZXBvcnRDcmVhdGlvblNldElkO1xuICAgICAgICAgICAgICAgIHZhciBwZXJmb3JtYW5jZVJlcG9ydFNldElkID0gcmVxdWVzdFJlcG9ydC5wZXJmb3JtYW5jZVJlcG9ydFNldElkO1xuICAgICAgICAgICAgICAgIHZhciBzZG9SZXF1ZXN0UmVwb3J0VVVJRCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pbmRpY2F0b3JzW2lkIGVxICdcIiArIHNkb1JlcXVlc3RSZXBvcnRTZXRJZCArIFwiJ10vaW5zdGFuY2VzWzFdL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICB2YXIgc2RvUmVwb3J0Q3JlYXRpb25VVUlEID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ1wiICsgc2RvUmVwb3J0Q3JlYXRpb25TZXRJZCArIFwiJ10vX2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgdmFyIHBlcmZvcm1hbmNlUmVwb3J0VVVJRCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdcIiArIHBlcmZvcm1hbmNlUmVwb3J0U2V0SWQgKyBcIiddL19pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJyZXF1ZXN0UmVwb3J0XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGVyZm9ybWFuY2VSZXBvcnRVVUlEXCI6IHBlcmZvcm1hbmNlUmVwb3J0VVVJRCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic2RvUmVxdWVzdFJlcG9ydFVVSURcIjogc2RvUmVxdWVzdFJlcG9ydFVVSUQsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNkb1JlcG9ydENyZWF0aW9uVVVJRFwiOiBzZG9SZXBvcnRDcmVhdGlvblVVSUQsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFwcGxpY2F0aW9uSWRcIjogYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbW11bml0eUlkXCI6IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxlSWRcIjogYXBwLlNDT1BFLndvcmtmbG93LnByb2ZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInN1YlByb2Nlc3NVVUlEXCI6IHV1aWRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbih3b3JrZXJTdWNjZXNzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgd29ya2VyLnNldFdvcmtlckluZm9JblN1YnByb2Nlc3Mod29ya2VyT2JqZWN0LCBfV0ZJbnN0YW5jZSwgdXVpZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1JlcXVlc3QgcmVwb3J0IFdvcmtlciBwcm9jZXNzZWQgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24od29ya2VyRmFpbCkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9LFxuXG5cbiAgICAgICAgZ2VuZXJhdGVCYXNpY1ZpZXc6IGZ1bmN0aW9uKGdlbmVyYXRlQmFzaWNWaWV3LCBfV0ZJbnN0YW5jZSwgdXVpZCkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcblxuICAgICAgICAgICAgICAgIHZhciBzdWJwcm9maWxlSWQgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGlmIChhcHAucHJvZmlsZSAhPSB1bmRlZmluZWQgJiYgYXBwLnByb2ZpbGUuc3VicHJvZmlsZUlkICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBzdWJwcm9maWxlSWQgPSBhcHAucHJvZmlsZS5zdWJwcm9maWxlSWQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG1vbWVudCgpLmZvcm1hdCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZW5kZXJVc2VySWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QucHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc3ViUHJvY2Vzc1VVSUQgPSB1dWlkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zdWJwcm9maWxlSWQgPSBzdWJwcm9maWxlSWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNoYW5uZWxzLnB1c2goXCJzZG9SZXBvcnRcIik7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNoYW5uZWxzLnB1c2goXCJjb21tdW5pdHlfXCIgKyBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgc2RvRGF0YU9iamVjdFZpZXdTZXRJZCA9IGdlbmVyYXRlQmFzaWNWaWV3LnNkb0RhdGFPYmplY3RWaWV3U2V0SWQ7XG4gICAgICAgICAgICAgICAgdmFyIHNkb0RhdGFPYmplY3RWaWV3VVVJRCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pbmRpY2F0b3JzW2lkIGVxICdcIiArIHNkb0RhdGFPYmplY3RWaWV3U2V0SWQgKyBcIiddL2luc3RhbmNlc1sxXS91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG5cblxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIFwiZ2VuZXJhdGVCYXNpY1ZpZXdcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJzZG9EYXRhT2JqZWN0Vmlld1VVSURcIjogc2RvRGF0YU9iamVjdFZpZXdVVUlELFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHBsaWNhdGlvbklkXCI6IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21tdW5pdHlJZFwiOiBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZmlsZUlkXCI6IGFwcC5TQ09QRS53b3JrZmxvdy5wcm9maWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJQcm9jZXNzVVVJRFwiOiB1dWlkXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24od29ya2VyU3VjY2Vzcykge1xuXG4gICAgICAgICAgICAgICAgICAgIHdvcmtlci5zZXRXb3JrZXJJbmZvSW5TdWJwcm9jZXNzKHdvcmtlck9iamVjdCwgX1dGSW5zdGFuY2UsIHV1aWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdnZW5lcmF0ZUJhc2ljVmlldyBXb3JrZXIgcHJvY2Vzc2VkIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHdvcmtlckZhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdvcmtlckZhaWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICBnZW5lcmF0ZVVuaW9uVmlldzogZnVuY3Rpb24oZ2VuZXJhdGVVbmlvblZpZXcsIF9XRkluc3RhbmNlLCB1dWlkKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHN1YnByb2ZpbGVJZCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgaWYgKGFwcC5wcm9maWxlICE9IHVuZGVmaW5lZCAmJiBhcHAucHJvZmlsZS5zdWJwcm9maWxlSWQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YnByb2ZpbGVJZCA9IGFwcC5wcm9maWxlLnN1YnByb2ZpbGVJZDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbW9tZW50KCkuZm9ybWF0KCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5wcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zdWJQcm9jZXNzVVVJRCA9IHV1aWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnN1YnByb2ZpbGVJZCA9IHN1YnByb2ZpbGVJZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY2hhbm5lbHMucHVzaChcInNkb1JlcG9ydFwiKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY2hhbm5lbHMucHVzaChcImNvbW11bml0eV9cIiArIGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpKTtcblxuICAgICAgICAgICAgICAgIHZhciBzZG9EYXRhT2JqZWN0Vmlld1VuaW9uU2V0SWQgPSBnZW5lcmF0ZVVuaW9uVmlldy5zZG9EYXRhT2JqZWN0Vmlld1VuaW9uU2V0SWQ7XG4gICAgICAgICAgICAgICAgdmFyIHNkb0RhdGFPYmplY3RWaWV3VW5pb25VVUlEID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ1wiICsgc2RvRGF0YU9iamVjdFZpZXdVbmlvblNldElkICsgXCInXS9pbnN0YW5jZXNbMV0vdXVpZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICBcImdlbmVyYXRlVW5pb25WaWV3XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic2RvRGF0YU9iamVjdFZpZXdVbmlvblVVSURcIjogc2RvRGF0YU9iamVjdFZpZXdVbmlvblVVSUQsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFwcGxpY2F0aW9uSWRcIjogYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbW11bml0eUlkXCI6IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxlSWRcIjogYXBwLlNDT1BFLndvcmtmbG93LnByb2ZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInN1YlByb2Nlc3NVVUlEXCI6IHV1aWRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbih3b3JrZXJTdWNjZXNzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgd29ya2VyLnNldFdvcmtlckluZm9JblN1YnByb2Nlc3Mod29ya2VyT2JqZWN0LCBfV0ZJbnN0YW5jZSwgdXVpZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ2dlbmVyYXRlVW5pb25WaWV3IFdvcmtlciBwcm9jZXNzZWQgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24od29ya2VyRmFpbCkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIHNkb1JlcG9ydE11bHRpcGxlOiBmdW5jdGlvbihzZG9SZXBvcnRNdWx0aXBsZSwgX1dGSW5zdGFuY2UsIHV1aWQpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IHdvcmtlci5nZXRXb3JrZXJXcmFwcGVyKCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgc3VicHJvZmlsZUlkID0gXCJcIjtcbiAgICAgICAgICAgICAgICBpZiAoYXBwLnByb2ZpbGUgIT0gdW5kZWZpbmVkICYmIGFwcC5wcm9maWxlLnN1YnByb2ZpbGVJZCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3VicHJvZmlsZUlkID0gYXBwLnByb2ZpbGUuc3VicHJvZmlsZUlkO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5faWQgPSBnZW5lcmF0ZVVVSUQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY29tbXVuaXR5SWQgPSBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYXBwbGljYXRpb25JZCA9IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jcmVhdGVkRGF0ZVRpbWUgPSBtb21lbnQoKS5mb3JtYXQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2VuZGVyVXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnByb2ZpbGVJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnN1YlByb2Nlc3NVVUlEID0gdXVpZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc3VicHJvZmlsZUlkID0gc3VicHJvZmlsZUlkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jaGFubmVscy5wdXNoKFwic2RvUmVwb3J0XCIpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jaGFubmVscy5wdXNoKFwiY29tbXVuaXR5X1wiICsgYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCkpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHNkb1JlcG9ydENyZWF0aW9uU2V0SWQgPSBzZG9SZXBvcnRNdWx0aXBsZS5zZG9SZXBvcnRDcmVhdGlvblNldElkO1xuICAgICAgICAgICAgICAgIHZhciBzZG9SZXBvcnRWaWV3c1NldElkID0gc2RvUmVwb3J0TXVsdGlwbGUuc2RvUmVwb3J0Vmlld3NTZXRJZDtcbiAgICAgICAgICAgICAgICB2YXIgc2RvUmVwb3J0Sm9pbnNTZXRJZCA9IHNkb1JlcG9ydE11bHRpcGxlLnNkb1JlcG9ydEpvaW5zU2V0SWQ7XG5cbiAgICAgICAgICAgICAgICB2YXIgc2RvUmVwb3J0Q3JlYXRpb25VVUlEID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ1wiICsgc2RvUmVwb3J0Q3JlYXRpb25TZXRJZCArIFwiJ10vaW5zdGFuY2VzWzFdL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICB2YXIgc2RvUmVwb3J0Vmlld3NVVUlEID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ1wiICsgc2RvUmVwb3J0Vmlld3NTZXRJZCArIFwiJ10vaW5zdGFuY2VzWzFdL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICB2YXIgc2RvUmVwb3J0Sm9pbnNVVUlEID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ1wiICsgc2RvUmVwb3J0Sm9pbnNTZXRJZCArIFwiJ10vaW5zdGFuY2VzWzFdL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcblxuXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJzZG9SZXBvcnRNdWx0aXBsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInNkb1JlcG9ydENyZWF0aW9uVVVJRFwiOiBzZG9SZXBvcnRDcmVhdGlvblVVSUQsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNkb1JlcG9ydFZpZXdzVVVJRFwiOiBzZG9SZXBvcnRWaWV3c1VVSUQsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNkb1JlcG9ydEpvaW5zVVVJRFwiOiBzZG9SZXBvcnRKb2luc1VVSUQsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFwcGxpY2F0aW9uSWRcIjogYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbW11bml0eUlkXCI6IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxlSWRcIjogYXBwLlNDT1BFLndvcmtmbG93LnByb2ZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInN1YlByb2Nlc3NVVUlEXCI6IHV1aWRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbih3b3JrZXJTdWNjZXNzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgd29ya2VyLnNldFdvcmtlckluZm9JblN1YnByb2Nlc3Mod29ya2VyT2JqZWN0LCBfV0ZJbnN0YW5jZSwgdXVpZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ3Nkb1JlcG9ydE11bHRpcGxlIFdvcmtlciBwcm9jZXNzZWQgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24od29ya2VyRmFpbCkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIHN1YnByb2ZpbGVRdWFydGVybHlSZXBvcnQ6IGZ1bmN0aW9uKHN1YnByb2ZpbGVRdWFydGVybHlSZXBvcnQsIF9XRkluc3RhbmNlLCB1dWlkKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHN1YnByb2ZpbGVJZCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgaWYgKGFwcC5wcm9maWxlICE9IHVuZGVmaW5lZCAmJiBhcHAucHJvZmlsZS5zdWJwcm9maWxlSWQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YnByb2ZpbGVJZCA9IGFwcC5wcm9maWxlLnN1YnByb2ZpbGVJZDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbW9tZW50KCkuZm9ybWF0KCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5wcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zdWJQcm9jZXNzVVVJRCA9IHV1aWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnN1YnByb2ZpbGVJZCA9IHN1YnByb2ZpbGVJZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY2hhbm5lbHMucHVzaChcImV4ZWN1dGVSZXBvcnRcIik7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNoYW5uZWxzLnB1c2goXCJjb21tdW5pdHlfXCIgKyBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgc2NoZWR1bGVSZXBvcnRJbmRpY2F0b3IgPSBzdWJwcm9maWxlUXVhcnRlcmx5UmVwb3J0LnNjaGVkdWxlUmVwb3J0SW5kaWNhdG9yO1xuICAgICAgICAgICAgICAgIHZhciBzY2hlZHVsZVJlcG9ydEluZGljYXRvclVVSUQgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnXCIgKyBzY2hlZHVsZVJlcG9ydEluZGljYXRvciArIFwiJ10vX2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgdmFyIHNkb1JlcG9ydEFwcHJvdmFsSW5kaWNhdG9yID0gc3VicHJvZmlsZVF1YXJ0ZXJseVJlcG9ydC5zZG9SZXBvcnRBcHByb3ZhbEluZGljYXRvcjtcbiAgICAgICAgICAgICAgICB2YXIgc2RvUmVwb3J0QXBwcm92YWxJbmRpY2F0b3JVVUlEID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ1wiICsgc2RvUmVwb3J0QXBwcm92YWxJbmRpY2F0b3IgKyBcIicgYW5kIHdvcmtmbG93c1sxXS9wcm9jZXNzZXNbMV0vc3ViUHJvY2Vzc1VVSUQgZXEgJ1wiICsgdXVpZCArIFwiJ10vX2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG5cblxuXG5cblxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIFwic3VicHJvZmlsZVF1YXJ0ZXJseVJlcG9ydFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInNjaGVkdWxlUmVwb3J0SW5kaWNhdG9yVVVJRFwiOiBzY2hlZHVsZVJlcG9ydEluZGljYXRvclVVSUQsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNkb1JlcG9ydEFwcHJvdmFsSW5kaWNhdG9yVVVJRFwiOiBzZG9SZXBvcnRBcHByb3ZhbEluZGljYXRvclVVSUQsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInN1YnByb2ZpbGVDb2RlXCI6IGFwcC5wcm9maWxlLnN1YlByb2ZpbGUuY29kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3VicHJvZmlsZVRpdGxlXCI6IGFwcC5wcm9maWxlLnN1YlByb2ZpbGUudGl0bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFwcGxpY2F0aW9uSWRcIjogYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbW11bml0eUlkXCI6IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxlSWRcIjogYXBwLlNDT1BFLndvcmtmbG93LnByb2ZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInN1YlByb2Nlc3NVVUlEXCI6IHV1aWRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbih3b3JrZXJTdWNjZXNzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgd29ya2VyLnNldFdvcmtlckluZm9JblN1YnByb2Nlc3Mod29ya2VyT2JqZWN0LCBfV0ZJbnN0YW5jZSwgdXVpZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1F1YXJ0ZXJseVJlcG9ydCByZXBvcnQgV29ya2VyIHByb2Nlc3NlZCBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbih3b3JrZXJGYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh3b3JrZXJGYWlsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgfVxuXG5cblxuXG5cbiAgICB9XG5cbn0pKCk7XG5cbnZhciBwYXJ0aWNpcGFudHMgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIGxpbmtQYXJ0aWNpcGFudHM6IGZ1bmN0aW9uKGxpbmtQYXJ0aWNpcGFudHMsIF9XRkluc3RhbmNlLCB1dWlkKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHN1YnByb2ZpbGVJZCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgaWYgKGFwcC5wcm9maWxlICE9IHVuZGVmaW5lZCAmJiBhcHAucHJvZmlsZS5zdWJwcm9maWxlSWQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YnByb2ZpbGVJZCA9IGFwcC5wcm9maWxlLnN1YnByb2ZpbGVJZDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbW9tZW50KCkuZm9ybWF0KCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5wcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zdWJQcm9jZXNzVVVJRCA9IHV1aWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnN1YnByb2ZpbGVJZCA9IHN1YnByb2ZpbGVJZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY2hhbm5lbHMucHVzaChcImZvbGxvd1wiKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY2hhbm5lbHMucHVzaChcImNvbW11bml0eV9cIiArIGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpKTtcblxuICAgICAgICAgICAgICAgIHZhciBFUFdQTGlua1BhcnRpY2lwYW50c0luQnVsa0lkID0gbGlua1BhcnRpY2lwYW50cy5FUFdQTGlua1BhcnRpY2lwYW50c0luQnVsa0lkO1xuICAgICAgICAgICAgICAgIHZhciBFUFdQTGlua1BhcnRpY2lwYW50c0luQnVsa0lkVVVJRCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pbmRpY2F0b3JzW2lkIGVxICdcIiArIEVQV1BMaW5rUGFydGljaXBhbnRzSW5CdWxrSWQgKyBcIiddL2luc3RhbmNlc1sxXS91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG5cbiAgICAgICAgICAgICAgICB2YXIgRVBXUExvY2FsaXR5SWQgPSBsaW5rUGFydGljaXBhbnRzLkVQV1BMb2NhbGl0eUlkO1xuICAgICAgICAgICAgICAgIHZhciBFUFdQTG9jYWxpdHlJZFVVSUQgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnXCIgKyBFUFdQTG9jYWxpdHlJZCArIFwiJ10vX2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG5cbiAgICAgICAgICAgICAgICB2YXIgRVBXUEFjdGl2ZVBhcnRpY2lwYW50c0lkID0gbGlua1BhcnRpY2lwYW50cy5FUFdQQWN0aXZlUGFydGljaXBhbnRzSWQ7XG4gICAgICAgICAgICAgICAgdmFyIEVQV1BBY3RpdmVQYXJ0aWNpcGFudHNJZFVVSUQgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnXCIgKyBFUFdQQWN0aXZlUGFydGljaXBhbnRzSWQgKyBcIiddL19pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJsaW5rUGFydGljaXBhbnRzXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiRVBXUExpbmtQYXJ0aWNpcGFudHNJbkJ1bGtJZFVVSURcIjogRVBXUExpbmtQYXJ0aWNpcGFudHNJbkJ1bGtJZFVVSUQsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkVQV1BMb2NhbGl0eUlkVVVJRFwiOiBFUFdQTG9jYWxpdHlJZFVVSUQsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkVQV1BBY3RpdmVQYXJ0aWNpcGFudHNJZFVVSURcIjogRVBXUEFjdGl2ZVBhcnRpY2lwYW50c0lkVVVJRCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZmlsSWRcIjogX1dGSW5zdGFuY2UucHJvZmlsZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbih3b3JrZXJTdWNjZXNzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgd29ya2VyLnNldFdvcmtlckluZm9JblN1YnByb2Nlc3Mod29ya2VyT2JqZWN0LCBfV0ZJbnN0YW5jZSwgdXVpZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0VQV1BMaW5rUGFydGljaXBhbnRzIFdvcmtlciBwcm9jZXNzZWQgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24od29ya2VyRmFpbCkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIG1vbnRobHlBdHRlbmRhbmNlOiBmdW5jdGlvbihtb250aGx5QXR0ZW5kYW5jZSwgX1dGSW5zdGFuY2UsIHV1aWQpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IHdvcmtlci5nZXRXb3JrZXJXcmFwcGVyKCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgc3VicHJvZmlsZUlkID0gXCJcIjtcbiAgICAgICAgICAgICAgICBpZiAoYXBwLnByb2ZpbGUgIT0gdW5kZWZpbmVkICYmIGFwcC5wcm9maWxlLnN1YnByb2ZpbGVJZCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3VicHJvZmlsZUlkID0gYXBwLnByb2ZpbGUuc3VicHJvZmlsZUlkO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5faWQgPSBnZW5lcmF0ZVVVSUQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY29tbXVuaXR5SWQgPSBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYXBwbGljYXRpb25JZCA9IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jcmVhdGVkRGF0ZVRpbWUgPSBtb21lbnQoKS5mb3JtYXQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2VuZGVyVXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnByb2ZpbGVJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnN1YlByb2Nlc3NVVUlEID0gdXVpZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc3VicHJvZmlsZUlkID0gc3VicHJvZmlsZUlkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jaGFubmVscy5wdXNoKFwiZm9sbG93XCIpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jaGFubmVscy5wdXNoKFwiY29tbXVuaXR5X1wiICsgYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCkpO1xuXG4gICAgICAgICAgICAgICAgdmFyIEVQV1BNb250aGx5QXR0ZW5kYW5jZUJ1bGtVcGxvYWRJZCA9IG1vbnRobHlBdHRlbmRhbmNlLkVQV1BNb250aGx5QXR0ZW5kYW5jZUJ1bGtVcGxvYWRVVUlEO1xuICAgICAgICAgICAgICAgIHZhciBFUFdQTW9udGhseUF0dGVuZGFuY2VCdWxrVXBsb2FkVVVJRCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pbmRpY2F0b3JzW2lkIGVxICdcIiArIEVQV1BNb250aGx5QXR0ZW5kYW5jZUJ1bGtVcGxvYWRJZCArIFwiJ10vaW5zdGFuY2VzWzFdL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcblxuICAgICAgICAgICAgICAgIHZhciBFUFdQQWN0aXZlUGFydGljaXBhbnRzSWQgPSBtb250aGx5QXR0ZW5kYW5jZS5FUFdQQWN0aXZlUGFydGljaXBhbnRzSWRVVUlEO1xuICAgICAgICAgICAgICAgIHZhciBFUFdQQWN0aXZlUGFydGljaXBhbnRzSWRVVUlEID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ1wiICsgRVBXUEFjdGl2ZVBhcnRpY2lwYW50c0lkICsgXCInXS9faWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcblxuICAgICAgICAgICAgICAgIHZhciBFUFdQTW9udGhseUVtcGxveW1lbnRQZXJMb2NhbGl0eUlkID0gbW9udGhseUF0dGVuZGFuY2UuRVBXUE1vbnRobHlFbXBsb3ltZW50UGVyTG9jYWxpdHlVVUlEO1xuICAgICAgICAgICAgICAgIHZhciBFUFdQTW9udGhseUVtcGxveW1lbnRQZXJMb2NhbGl0eVVVSUQgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnXCIgKyBFUFdQTW9udGhseUVtcGxveW1lbnRQZXJMb2NhbGl0eUlkICsgXCInXS9pbnN0YW5jZXNbMV0vdXVpZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuXG5cblxuXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJtb250aGx5QXR0ZW5kYW5jZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcIkVQV1BNb250aGx5QXR0ZW5kYW5jZUJ1bGtVcGxvYWRVVUlEXCI6IEVQV1BNb250aGx5QXR0ZW5kYW5jZUJ1bGtVcGxvYWRVVUlELFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJFUFdQQWN0aXZlUGFydGljaXBhbnRzSWRVVUlEXCI6IEVQV1BBY3RpdmVQYXJ0aWNpcGFudHNJZFVVSUQsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkVQV1BNb250aGx5RW1wbG95bWVudFBlckxvY2FsaXR5VVVJRFwiOiBFUFdQTW9udGhseUVtcGxveW1lbnRQZXJMb2NhbGl0eVVVSUQsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInByb2ZpbElkXCI6IF9XRkluc3RhbmNlLnByb2ZpbGVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24od29ya2VyU3VjY2Vzcykge1xuXG4gICAgICAgICAgICAgICAgICAgIHdvcmtlci5zZXRXb3JrZXJJbmZvSW5TdWJwcm9jZXNzKHdvcmtlck9iamVjdCwgX1dGSW5zdGFuY2UsIHV1aWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdtb250aGx5QXR0ZW5kYW5jZSBXb3JrZXIgcHJvY2Vzc2VkIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHdvcmtlckZhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdvcmtlckZhaWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICBtb250aGx5UHJvZ3Jlc3NTdW1tYXJ5OiBmdW5jdGlvbihtb250aGx5UHJvZ3Jlc3NTdW1tYXJ5LCBfV0ZJbnN0YW5jZSwgdXVpZCkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcblxuICAgICAgICAgICAgICAgIHZhciBzdWJwcm9maWxlSWQgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGlmIChhcHAucHJvZmlsZSAhPSB1bmRlZmluZWQgJiYgYXBwLnByb2ZpbGUuc3VicHJvZmlsZUlkICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBzdWJwcm9maWxlSWQgPSBhcHAucHJvZmlsZS5zdWJwcm9maWxlSWQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG1vbWVudCgpLmZvcm1hdCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZW5kZXJVc2VySWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QucHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc3ViUHJvY2Vzc1VVSUQgPSB1dWlkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zdWJwcm9maWxlSWQgPSBzdWJwcm9maWxlSWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNoYW5uZWxzLnB1c2goXCJmb2xsb3dcIik7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNoYW5uZWxzLnB1c2goXCJjb21tdW5pdHlfXCIgKyBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgRVBXUE1vbnRobHlQcm9ncmVzc1N1bW1hcnlJZCA9IG1vbnRobHlQcm9ncmVzc1N1bW1hcnkuRVBXUE1vbnRobHlQcm9ncmVzc1N1bW1hcnlJZFVVSUQ7XG4gICAgICAgICAgICAgICAgdmFyIEVQV1BNb250aGx5UHJvZ3Jlc3NTdW1tYXJ5SWRVVUlEID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ1wiICsgRVBXUE1vbnRobHlQcm9ncmVzc1N1bW1hcnlJZCArIFwiJ10vaW5zdGFuY2VzWzFdL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcblxuXG5cblxuXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJtb250aGx5UHJvZ3Jlc3NTdW1tYXJ5XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiRVBXUE1vbnRobHlQcm9ncmVzc1N1bW1hcnlJZFVVSURcIjogRVBXUE1vbnRobHlQcm9ncmVzc1N1bW1hcnlJZFVVSUQsXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZmlsSWRcIjogX1dGSW5zdGFuY2UucHJvZmlsZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbih3b3JrZXJTdWNjZXNzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgd29ya2VyLnNldFdvcmtlckluZm9JblN1YnByb2Nlc3Mod29ya2VyT2JqZWN0LCBfV0ZJbnN0YW5jZSwgdXVpZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ21vbnRobHlBdHRlbmRhbmNlIFdvcmtlciBwcm9jZXNzZWQgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24od29ya2VyRmFpbCkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIHBhcnRpY2lwYW50Q29udHJhY3RzOiBmdW5jdGlvbihwYXJ0aWNpcGFudENvbnRyYWN0cywgX1dGSW5zdGFuY2UsIHV1aWQpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IHdvcmtlci5nZXRXb3JrZXJXcmFwcGVyKCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgc3VicHJvZmlsZUlkID0gXCJcIjtcbiAgICAgICAgICAgICAgICBpZiAoYXBwLnByb2ZpbGUgIT0gdW5kZWZpbmVkICYmIGFwcC5wcm9maWxlLnN1YnByb2ZpbGVJZCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3VicHJvZmlsZUlkID0gYXBwLnByb2ZpbGUuc3VicHJvZmlsZUlkO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5faWQgPSBnZW5lcmF0ZVVVSUQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY29tbXVuaXR5SWQgPSBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYXBwbGljYXRpb25JZCA9IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jcmVhdGVkRGF0ZVRpbWUgPSBtb21lbnQoKS5mb3JtYXQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2VuZGVyVXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnByb2ZpbGVJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnN1YlByb2Nlc3NVVUlEID0gdXVpZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc3VicHJvZmlsZUlkID0gc3VicHJvZmlsZUlkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jaGFubmVscy5wdXNoKFwiZm9sbG93XCIpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jaGFubmVscy5wdXNoKFwiY29tbXVuaXR5X1wiICsgYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCkpO1xuXG4gICAgICAgICAgICAgICAgdmFyIEVQV1BQYXJ0aWNpcGFudENvbnRyYWN0c0lkID0gcGFydGljaXBhbnRDb250cmFjdHMuRVBXUFBhcnRpY2lwYW50Q29udHJhY3RzSWRVVUlEO1xuICAgICAgICAgICAgICAgIHZhciBFUFdQUGFydGljaXBhbnRDb250cmFjdHNJZFVVSUQgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnXCIgKyBFUFdQUGFydGljaXBhbnRDb250cmFjdHNJZCArIFwiJ10vaW5zdGFuY2VzWzFdL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcblxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRDb250cmFjdHNcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJFUFdQUGFydGljaXBhbnRDb250cmFjdHNJZFVVSURcIjogRVBXUFBhcnRpY2lwYW50Q29udHJhY3RzSWRVVUlELFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxJZFwiOiBfV0ZJbnN0YW5jZS5wcm9maWxlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24od29ya2VyU3VjY2Vzcykge1xuXG4gICAgICAgICAgICAgICAgICAgIHdvcmtlci5zZXRXb3JrZXJJbmZvSW5TdWJwcm9jZXNzKHdvcmtlck9iamVjdCwgX1dGSW5zdGFuY2UsIHV1aWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdwYXJ0aWNpcGFudENvbnRyYWN0cyBXb3JrZXIgcHJvY2Vzc2VkIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHdvcmtlckZhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdvcmtlckZhaWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICBnZW5lcmljTGlua1BhcnRpY2lwYW50czogZnVuY3Rpb24oZ2VuZXJpY0xpbmtQYXJ0aWNpcGFudHMsIF9XRkluc3RhbmNlLCB1dWlkKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cblxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59KSgpO1xuXG52YXIgd29ya2VyID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICBnZXRXb3JrZXJXcmFwcGVyOiBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgdmFyIHdyYXBwZXIgPSB7XG4gICAgICAgICAgICAgICAgXCJzb3VyY2VcIjogXCJyZW1vdGVcIixcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ3b3JrZXJPYmplY3RcIixcbiAgICAgICAgICAgICAgICBcIl9pZFwiOiBcIlwiLFxuICAgICAgICAgICAgICAgIFwiY2hhbm5lbHNcIjogW1wid29ya2VyT2JqZWN0XCJdLFxuICAgICAgICAgICAgICAgIFwicHJvZmlsZUlkXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgXCJjb21tdW5pdHlJZFwiOiBcIlwiLFxuICAgICAgICAgICAgICAgIFwiYXBwbGljYXRpb25JZFwiOiBcIlwiLFxuICAgICAgICAgICAgICAgIFwic3ViUHJvY2Vzc1VVSURcIjogXCJcIixcbiAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJcIixcbiAgICAgICAgICAgICAgICBcIm1lc3NhZ2VUeXBlXCI6IFwiaW5mb1wiLFxuICAgICAgICAgICAgICAgIFwiY3JlYXRlZERhdGVUaW1lXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgXCJzZW5kZXJVc2VySWRcIjogXCJcIixcbiAgICAgICAgICAgICAgICBcInN1YlByb2ZpbGVJZFwiOiBcIlwiLFxuICAgICAgICAgICAgICAgIFwicGFyZW50VHJhbnNhY3Rpb25JZFwiOiAoYXBwLlNDT1BFLnR4biA9PSB1bmRlZmluZWQgPyBcIlwiIDogYXBwLlNDT1BFLnR4bi50cmFuc2FjdGlvbklkKSxcbiAgICAgICAgICAgICAgICBcImFjdGlvblwiOiB7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiB3cmFwcGVyO1xuXG4gICAgICAgIH0sXG4gICAgICAgIHNlbmQ6IGZ1bmN0aW9uKHdvcmtlck9iamVjdCkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU3VibWl0dGluZyBXb3JrZXIgT2JqZWN0IHRvIHNlcnZlcicpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHdvcmtlck9iamVjdCk7XG4gICAgICAgICAgICAgICAgZGFvLnNhdmUod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uKHdvcmtlclJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUod29ya2VyUmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3Igc3VibWl0dGluZyB3b3JrZXIgcmVzcG9uc2UgISEnICsgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICBzZW5kV29ya2VyOiBmdW5jdGlvbih3b3JrZXJDb25maWcsIF9XRkluc3RhbmNlLCB1dWlkKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHN1YnByb2ZpbGVJZCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgaWYgKGFwcC5wcm9maWxlICE9IHVuZGVmaW5lZCAmJiBhcHAucHJvZmlsZS5zdWJwcm9maWxlSWQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YnByb2ZpbGVJZCA9IGFwcC5wcm9maWxlLnN1YnByb2ZpbGVJZDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbW9tZW50KCkuZm9ybWF0KCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5wcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zdWJQcm9jZXNzVVVJRCA9IHV1aWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnN1YnByb2ZpbGVJZCA9IHN1YnByb2ZpbGVJZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY2hhbm5lbHMucHVzaChcInNlbmRXb3JrZXJcIik7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNoYW5uZWxzLnB1c2goXCJjb21tdW5pdHlfXCIgKyBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKSk7XG4gICAgICAgICAgICAgICAgdmFyIHByb2Nlc3NHZXROb2RlVmFsdWUgPSBmdW5jdGlvbihwYXJhbUJsb2NrLCBzZXEsIHBhcmFtTmFtZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXMsIHJlaikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWxwZXIuZ2V0Tm9kZVZhbHVlKHBhcmFtQmxvY2ssIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uKGRhdGFWYWx1ZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZXFcIjogc2VxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmFtTmFtZVwiOiBwYXJhbU5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YVZhbHVlXCI6IGRhdGFWYWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWooZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHZhciBwcm9jZXNzUGFyYW1zID0gZnVuY3Rpb24oY29uZmlnUGFyYW0pIHtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzLCByZWopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJhbWV0ZXJzQXJyYXkgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpdGVtc1RvUHJvY2VzcyA9IGNvbmZpZ1BhcmFtLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29uZmlnUGFyYW0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFyYW1CbG9jayA9IGNvbmZpZ1BhcmFtW2ldLnBhcmFtZXRlclZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZXEgPSBjb25maWdQYXJhbVtpXS5zZXE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmFtTmFtZSA9IGNvbmZpZ1BhcmFtW2ldLnBhcmFtZXRlck5hbWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFyYW1WYWx1ZSA9IHByb2Nlc3NHZXROb2RlVmFsdWUocGFyYW1CbG9jaywgc2VxLCBwYXJhbU5hbWUpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzQXJyYXkucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlcVwiOiByZXNwb25zZS5zZXEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmFtTmFtZVwiOiByZXNwb25zZS5wYXJhbU5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmFtVmFsdWVcIjogcmVzcG9uc2UuZGF0YVZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNUb1Byb2Nlc3MtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zVG9Qcm9jZXNzID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnNBcnJheS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlcVwiOiBpdGVtc1RvUHJvY2VzcyArIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJhbU5hbWVcIjogXCJjb21tdW5pdHlJZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFyYW1WYWx1ZVwiOiBfV0ZJbnN0YW5jZS5jb21tdW5pdHlJZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnNBcnJheS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlcVwiOiBpdGVtc1RvUHJvY2VzcyArIDIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJhbU5hbWVcIjogXCJhcHBsaWNhdGlvbklkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJhbVZhbHVlXCI6IF9XRkluc3RhbmNlLmFwcFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnNBcnJheS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlcVwiOiBpdGVtc1RvUHJvY2VzcyArIDMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJhbU5hbWVcIjogXCJwcm9maWxlSWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmFtVmFsdWVcIjogX1dGSW5zdGFuY2UucHJvZmlsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnNBcnJheS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlcVwiOiBpdGVtc1RvUHJvY2VzcyArIDQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJhbU5hbWVcIjogXCJzdWJQcm9jZXNzVVVJRFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFyYW1WYWx1ZVwiOiB1dWlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzKHBhcmFtZXRlcnNBcnJheSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNUb1Byb2Nlc3MtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zVG9Qcm9jZXNzID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnNBcnJheS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlcVwiOiBpdGVtc1RvUHJvY2VzcyArIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJhbU5hbWVcIjogXCJjb21tdW5pdHlJZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFyYW1WYWx1ZVwiOiBfV0ZJbnN0YW5jZS5jb21tdW5pdHlJZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnNBcnJheS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlcVwiOiBpdGVtc1RvUHJvY2VzcyArIDIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJhbU5hbWVcIjogXCJhcHBsaWNhdGlvbklkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJhbVZhbHVlXCI6IF9XRkluc3RhbmNlLmFwcFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnNBcnJheS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlcVwiOiBpdGVtc1RvUHJvY2VzcyArIDMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJhbU5hbWVcIjogXCJwcm9maWxlSWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmFtVmFsdWVcIjogX1dGSW5zdGFuY2UucHJvZmlsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnNBcnJheS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlcVwiOiBpdGVtc1RvUHJvY2VzcyArIDQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJhbU5hbWVcIjogXCJzdWJQcm9jZXNzVVVJRFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFyYW1WYWx1ZVwiOiB1dWlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzKHBhcmFtZXRlcnNBcnJheSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHZhciB0eXBlID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAod29ya2VyQ29uZmlnLnJlc3QgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbmZpZ1BhcmFtID0gd29ya2VyQ29uZmlnLnJlc3QucGFyYW1ldGVycztcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc1BhcmFtcyhjb25maWdQYXJhbSkudGhlbihmdW5jdGlvbihwYXJhbXNBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlbmRXb3JrZXJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJlc3RcIjoge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLnNlbmRXb3JrZXIucmVzdC51cmkgPSB3b3JrZXJDb25maWcucmVzdC51cmk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24uc2VuZFdvcmtlci5yZXN0LnByb2ZpbElkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5zZW5kV29ya2VyLnJlc3QucGFyYW1ldGVycyA9IHBhcmFtc0FycmF5O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uKHdvcmtlclN1Y2Nlc3MpIHtcblxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3BPYmplY3QgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcE9iamVjdC5zcFN0YXR1cyA9ICdzdWJtaXR0ZWQnO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwT2JqZWN0Lm1lc3NhZ2VzID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcE9iamVjdC5tZXNzYWdlcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGVuZGluZ1N1Ym1pc3Npb25PYmplY3QgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImkxOG5cIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiX2lkXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJlblwiOiBcIlRoZSBzZXJ2ZXIgaXMgcHJvY2Vzc2luZyB5b3VyIHJlcXVlc3QuIFBsZWFzZSB3YWl0IGEgZmV3IHNlY29uZHMgYW5kIHRoZW4gY2xpY2sgdGhlIHJlZnJlc2ggYnV0dG9uLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHRcIjogXCJUaGUgc2VydmVyIGlzIHByb2Nlc3NpbmcgeW91ciByZXF1ZXN0LiBQbGVhc2Ugd2FpdCBhIGZldyBzZWNvbmRzIGFuZCB0aGVuIGNsaWNrIHRoZSByZWZyZXNoIGJ1dHRvbi5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbmZvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwT2JqZWN0Lm1lc3NhZ2VzLnB1c2gocGVuZGluZ1N1Ym1pc3Npb25PYmplY3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdvcmtlciBpZCBoZXJlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwT2JqZWN0LndvcmtlcnMgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwT2JqZWN0LndvcmtlcnMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BPYmplY3Qud29ya2Vycy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ3b3JrZXJJZFwiOiB3b3JrZXJPYmplY3QuX2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRhdGVUaW1lXCI6IG1vbWVudCgpLmZvcm1hdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJzaXN0RGF0YSgnc3VicHJvY2Vzc2VzJywgYXBwLlNDT1BFLndvcmtmbG93LCB1dWlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihzYXZlZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya2VyIFJlc3QgcHJvY2Vzc2VkIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZmFpbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnV29ya2VyIHN1Ym1pdHRlZCBzdWJwcm9jZXNzIGZpbGUgdXBkYXRlIGZhaWxlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGZhaWxlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cblxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHdvcmtlckZhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnV29ya2VyIGZhaWxlZCAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGFyYW1ldGVyIGNyZWF0aW9uIGZhaWxlZC4gQWJvcmRpbmcgd29ya2VyIG9iamVjdFwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHdvcmtlckNvbmZpZy5mdW5jdGlvbmFsICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb25maWdQYXJhbSA9IHdvcmtlckNvbmZpZy5mdW5jdGlvbmFsLnBhcmFtZXRlcnM7XG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NQYXJhbXMoY29uZmlnUGFyYW0pLnRoZW4oZnVuY3Rpb24ocGFyYW1zQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZW5kV29ya2VyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmdW5jdGlvbmFsXCI6IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5zZW5kV29ya2VyLmZ1bmN0aW9uYWwubWV0aG9kTmFtZSA9IHdvcmtlckNvbmZpZy5mdW5jdGlvbmFsLm1ldGhvZE5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24uc2VuZFdvcmtlci5mdW5jdGlvbmFsLnByb2ZpbElkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5zZW5kV29ya2VyLmZ1bmN0aW9uYWwucGFyYW1ldGVycyA9IHBhcmFtc0FycmF5O1xuICAgICAgICAgICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbih3b3JrZXJTdWNjZXNzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3BPYmplY3QgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcE9iamVjdC5zcFN0YXR1cyA9ICdzdWJtaXR0ZWQnO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwT2JqZWN0Lm1lc3NhZ2VzID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcE9iamVjdC5tZXNzYWdlcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGVuZGluZ1N1Ym1pc3Npb25PYmplY3QgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImkxOG5cIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiX2lkXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJlblwiOiBcIlRoZSBzZXJ2ZXIgaXMgcHJvY2Vzc2luZyB5b3VyIHJlcXVlc3QuIFBsZWFzZSB3YWl0IGEgZmV3IHNlY29uZHMgYW5kIHRoZW4gY2xpY2sgdGhlIHJlZnJlc2ggYnV0dG9uLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHRcIjogXCJUaGUgc2VydmVyIGlzIHByb2Nlc3NpbmcgeW91ciByZXF1ZXN0LiBQbGVhc2Ugd2FpdCBhIGZldyBzZWNvbmRzIGFuZCB0aGVuIGNsaWNrIHRoZSByZWZyZXNoIGJ1dHRvbi5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbmZvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwT2JqZWN0Lm1lc3NhZ2VzLnB1c2gocGVuZGluZ1N1Ym1pc3Npb25PYmplY3QpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd29ya2VyIGlkIGhlcmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BPYmplY3Qud29ya2VycyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BPYmplY3Qud29ya2VycyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcE9iamVjdC53b3JrZXJzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIndvcmtlcklkXCI6IHdvcmtlck9iamVjdC5faWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0ZVRpbWVcIjogbW9tZW50KCkuZm9ybWF0KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNpc3REYXRhKCdzdWJwcm9jZXNzZXMnLCBhcHAuU0NPUEUud29ya2Zsb3csIHV1aWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHNhdmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdXb3JrZXIgZnVuY3Rpb25hbCBwcm9jZXNzZWQgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihmYWlsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdXb3JrZXIgc3VibWl0dGVkIHN1YnByb2Nlc3MgZmlsZSB1cGRhdGUgZmFpbGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFpbGVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbih3b3JrZXJGYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1dvcmtlciBmYWlsZWQgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdvcmtlckZhaWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInBhcmFtZXRlciBjcmVhdGlvbiBmYWlsZWQuIEFib3JkaW5nIHdvcmtlciBvYmplY3RcIik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICBleGVjdXRlTG9jYWw6IGZ1bmN0aW9uKHdvcmtlckNvbmZpZywgX1dGSW5zdGFuY2UsIHV1aWQpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXG5cblxuICAgICAgICAgICAgICAgIHZhciBwcm9jZXNzR2V0Tm9kZVZhbHVlID0gZnVuY3Rpb24ocGFyYW1CbG9jaywgc2VxLCBkYXRhVHlwZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXMsIHJlaikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWxwZXIuZ2V0Tm9kZVZhbHVlKHBhcmFtQmxvY2ssIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uKGRhdGFWYWx1ZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZXFcIjogc2VxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRhdGFUeXBlXCI6IGRhdGFUeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRhdGFWYWx1ZVwiOiBkYXRhVmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHZhciBwcm9jZXNzUGFyYW1zID0gZnVuY3Rpb24oY29uZmlnUGFyYW0pIHtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzLCByZWopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJhbWV0ZXJzQXJyYXkgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpdGVtc1RvUHJvY2VzcyA9IGNvbmZpZ1BhcmFtLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29uZmlnUGFyYW0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFyYW1CbG9jayA9IGNvbmZpZ1BhcmFtW2ldLnBhcmFtZXRlclZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZXEgPSBjb25maWdQYXJhbVtpXS5zZXE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGFUeXBlID0gY29uZmlnUGFyYW1baV0uZGF0YVR5cGUuZGF0YVR5cGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmFtVmFsdWUgPSBwcm9jZXNzR2V0Tm9kZVZhbHVlKHBhcmFtQmxvY2ssIHNlcSwgZGF0YVR5cGUpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzQXJyYXkucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlcVwiOiByZXNwb25zZS5zZXEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRhdGFUeXBlXCI6IHJlc3BvbnNlLmRhdGFUeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJhbVZhbHVlXCI6IHJlc3BvbnNlLmRhdGFWYWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zVG9Qcm9jZXNzLS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1RvUHJvY2VzcyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMocGFyYW1ldGVyc0FycmF5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1RvUHJvY2Vzcy0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbXNUb1Byb2Nlc3MgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzKHBhcmFtZXRlcnNBcnJheSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHZhciBmaXhQYXJhbVR5cGUgPSBmdW5jdGlvbihwYXJhbVZhbHVlLCBkYXRhVHlwZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZGF0YVR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHh0ID0gcGFyYW1WYWx1ZS5yZXBsYWNlKC8nL2csIFwiXFxcXCdcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiJ1wiICsgdHh0ICsgXCInXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZGF0ZVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImRhdGVUaW1lXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiJ1wiICsgcGFyYW1WYWx1ZSArIFwiJ1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm51bWJlclwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImRlY2ltYWxcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyYW1WYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB2YXIgbWV0aG9kTmFtZSA9IHdvcmtlckNvbmZpZy5tZXRob2ROYW1lO1xuICAgICAgICAgICAgICAgIHZhciBjb25maWdQYXJhbSA9IHdvcmtlckNvbmZpZy5wYXJhbWV0ZXJzO1xuICAgICAgICAgICAgICAgIHByb2Nlc3NQYXJhbXMoY29uZmlnUGFyYW0pLnRoZW4oZnVuY3Rpb24ocGFyYW1zQXJyYXkpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgcExpc3QgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJhbXNBcnJheS5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBMaXN0ID0gcExpc3QgKyBmaXhQYXJhbVR5cGUocGFyYW1zQXJyYXlbaV0ucGFyYW1WYWx1ZSwgcGFyYW1zQXJyYXlbaV0uZGF0YVR5cGUpICsgJywnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHBMaXN0ID0gcExpc3QgKyBmaXhQYXJhbVR5cGUocGFyYW1zQXJyYXlbaV0ucGFyYW1WYWx1ZSwgcGFyYW1zQXJyYXlbaV0uZGF0YVR5cGUpXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGNhbGxiYWNrU3VjY2VzcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoXCJGdW5jdGlvbiAnXCIgKyBtZXRob2ROYW1lICsgXCInIGV4ZWN1dGVkLiBSZXNwb25zZSBzdWNjZXNzLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNhbGxiYWNrRmFpbHVyZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChcIkZ1bmN0aW9uICdcIiArIG1ldGhvZE5hbWUgKyBcIicgZXhlY3V0ZWQuIFJlc3BvbnNlIGZhaWxlZC5cIik7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHZhciBzcFVVSUQgPSBcIidcIiArIHV1aWQgKyBcIidcIlxuICAgICAgICAgICAgICAgICAgICB2YXIgZnVuYyA9IG1ldGhvZE5hbWUgKyAnKCcgKyBwTGlzdCArICcsY2FsbGJhY2tTdWNjZXNzLCBjYWxsYmFja0ZhaWx1cmUsJyArIHNwVVVJRCArICcpJztcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV4ZSA9IGV2YWwoZnVuYyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGV4ZSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoXCJMb2NhbCBmdW5jdGlvbiBleGVjdXRlZFwiKTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInBhcmFtZXRlciBjcmVhdGlvbiBmYWlsZWQuIEFib3JkaW5nIHdvcmtlciBvYmplY3RcIik7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG5cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICBzZXRXb3JrZXJJbmZvSW5TdWJwcm9jZXNzOiBmdW5jdGlvbih3b3JrZXJPYmplY3QsIF9XRkluc3RhbmNlLCB1dWlkKSB7XG5cbiAgICAgICAgICAgIHZhciBzdWJwcm9jZXNzT2JqZWN0ID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICB2YXIgcGVuZGluZ1N1Ym1pc3Npb25PYmplY3QgPSB7XG4gICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJpMThuXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiX2lkXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImVuXCI6IFwiVGhlIHNlcnZlciBpcyBwcm9jZXNzaW5nIHlvdXIgcmVxdWVzdC4gUGxlYXNlIHdhaXQgYSBmZXcgc2Vjb25kcyBhbmQgdGhlbiBjbGljayB0aGUgcmVmcmVzaCBidXR0b24uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInB0XCI6IFwiTyBzZXJ2aWRvciBlc3TDoSBwcm9jZXNzYW5kbyBzdWEgc29saWNpdGHDp8Ojby4gUG9yIGZhdm9yIGFndWFyZGUgYWxndW5zIHNlZ3VuZG9zIGUgZGVwb2lzIGNsaXF1ZSBubyBib3TDo28gYXR1YWxpemFyLlwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImluZm9cIlxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHN1YnByb2Nlc3NPYmplY3QubWVzc2FnZXMgPSBbXTtcbiAgICAgICAgICAgIHN1YnByb2Nlc3NPYmplY3QubWVzc2FnZXMucHVzaChwZW5kaW5nU3VibWlzc2lvbk9iamVjdCk7XG5cbiAgICAgICAgICAgIGlmIChzdWJwcm9jZXNzT2JqZWN0LndvcmtlcnMgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgc3VicHJvY2Vzc09iamVjdC53b3JrZXJzID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdWJwcm9jZXNzT2JqZWN0LndvcmtlcnMucHVzaCh7XG4gICAgICAgICAgICAgICAgXCJ3b3JrZXJJZFwiOiB3b3JrZXJPYmplY3QuX2lkLFxuICAgICAgICAgICAgICAgIFwiZGF0ZVRpbWVcIjogbW9tZW50KCkuZm9ybWF0KClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgfSxcblxuXG4gICAgICAgIGNyZWF0ZTogZnVuY3Rpb24od29ya2VyQ29uZmlnLCBfV0ZJbnN0YW5jZSwgdXVpZCkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgY2hhbm5lbCA9IHdvcmtlckNvbmZpZy5jaGFubmVsO1xuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJBY3Rpb24gPSB3b3JrZXJDb25maWcuYWN0aW9uO1xuXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IHdvcmtlci5nZXRXb3JrZXJXcmFwcGVyKCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgc3VicHJvZmlsZUlkID0gXCJcIjtcbiAgICAgICAgICAgICAgICBpZiAoYXBwLnByb2ZpbGUgIT0gdW5kZWZpbmVkICYmIGFwcC5wcm9maWxlLnN1YnByb2ZpbGVJZCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3VicHJvZmlsZUlkID0gYXBwLnByb2ZpbGUuc3VicHJvZmlsZUlkO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5faWQgPSBnZW5lcmF0ZVVVSUQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY29tbXVuaXR5SWQgPSBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYXBwbGljYXRpb25JZCA9IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jcmVhdGVkRGF0ZVRpbWUgPSBtb21lbnQoKS5mb3JtYXQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2VuZGVyVXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnByb2ZpbGVJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnN1YlByb2Nlc3NVVUlEID0gdXVpZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc3VicHJvZmlsZUlkID0gc3VicHJvZmlsZUlkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jaGFubmVscy5wdXNoKGNoYW5uZWwpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jaGFubmVscy5wdXNoKFwiY29tbXVuaXR5X1wiICsgYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCkpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcblxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgYWN0aW9uW3dvcmtlckFjdGlvbl0gPSB7fTtcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgd29ya2VyQ29uZmlnLmluZGljYXRvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxhYmVsID0gd29ya2VyQ29uZmlnLmluZGljYXRvcnNbaV0ubGFiZWw7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzZXRJZCA9IHdvcmtlckNvbmZpZy5pbmRpY2F0b3JzW2ldLnNldElkO1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29udGV4dCA9IHdvcmtlckNvbmZpZy5pbmRpY2F0b3JzW2ldLmNvbnRleHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGlkID0gXCJcIjtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY29udGV4dCA9PSAnc3ViUHJvY2VzcycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ1wiICsgc2V0SWQgKyBcIiddL2luc3RhbmNlc1sxXS91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdcIiArIHNldElkICsgXCInXS9faWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBhY3Rpb25bd29ya2VyQWN0aW9uXVtsYWJlbF0gPSBpZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhY3Rpb25bd29ya2VyQWN0aW9uXS5wcm9maWxJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XG5cbiAgICAgICAgICAgICAgICBpZiAod29ya2VyQ29uZmlnLmZpeGVkICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHdvcmtlckNvbmZpZy5maXhlZC5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0gd29ya2VyQ29uZmlnLmZpeGVkW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGtleSA9IE9iamVjdC5rZXlzKG9iailbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25bd29ya2VyQWN0aW9uXVtrZXldID0gb2JqW2tleV1cblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh3b3JrZXJDb25maWcuZGF0YUZpZWxkcyAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uW3dvcmtlckFjdGlvbl0uZGF0YUZpZWxkcyA9IHdvcmtlckNvbmZpZy5kYXRhRmllbGRzO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hY3Rpb24gPSBhY3Rpb247XG4gICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uKHdvcmtlclN1Y2Nlc3MpIHtcblxuICAgICAgICAgICAgICAgICAgICB3b3JrZXIuc2V0V29ya2VySW5mb0luU3VicHJvY2Vzcyh3b3JrZXJPYmplY3QsIF9XRkluc3RhbmNlLCB1dWlkKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2Vzcyh3b3JrZXJBY3Rpb24gKyAnIHdvcmtlciBwcm9jZXNzZWQgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24od29ya2VyRmFpbCkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cblxuXG5cblxuXG5cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSxcblxuICAgIH1cblxufSkoKTtcblxudmFyIHVzZXIgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIGFkZFRvUm9sZTogZnVuY3Rpb24oYWRkVG9Sb2xlLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgaGVscGVyLmdldE5vZGVWYWx1ZShhZGRUb1JvbGUudXNlck5hbWUsIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uKHVzZXJEaXNwbGF5TmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBoZWxwZXIuZ2V0Tm9kZVZhbHVlKGFkZFRvUm9sZS51c2VySWQsIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uKHVzZXJJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRleHRUeXBlID0gSlNPTi54cGF0aChcIi9yb2xlc1tpZCBlcSAnXCIgKyBhZGRUb1JvbGUucm9sZUlkICsgXCInXS90eXBlXCIsIGFwcC5TQ09QRS5BUFBfQ09ORklHLCB7fSlbMF1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRleHRUeXBlID09ICdpbnN0YW5jZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlc01hbmFnZXIuZG9Vc2VyUmVnaXN0cmF0aW9uKHVzZXJJZCwgdXNlckRpc3BsYXlOYW1lLCBhZGRUb1JvbGUucm9sZUlkLCAnaW5zdGFuY2UnKS50aGVuKGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1JvbGUgYXNzaWduZWQgdG8gdXNlciBpbiBjb250ZXh0IGluc3RhbmNlJywgcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyb2xlc01hbmFnZXItIGluc3RhbmNlIGZhaWwnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgncm9sZSB1cGRhdGUgZmFpbGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHRUeXBlID09ICdzdWJwcm9maWxlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGVzTWFuYWdlci5kb1VzZXJSZWdpc3RyYXRpb25fbm9kZSh1c2VySWQsIHVzZXJEaXNwbGF5TmFtZSwgYWRkVG9Sb2xlLnJvbGVJZCwgJ3N1YnByb2ZpbGUnKS50aGVuKGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1JvbGUgYXNzaWduZWQgdG8gdXNlciBpbiBjb250ZXh0IHN1YnByb2ZpbGUnLCBzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3JvbGVzTWFuYWdlci0gc3VicHJvZmlsZSBmYWlsJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoJ3JvbGUgdXBkYXRlIGZhaWxlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0VHlwZSA9PSAnYWRvcHRpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZXNNYW5hZ2VyLmRvVXNlclJlZ2lzdHJhdGlvbl9hZG9wdGlvbih1c2VySWQsIHVzZXJEaXNwbGF5TmFtZSwgYWRkVG9Sb2xlLnJvbGVJZCwgJ2Fkb3B0aW9uJykudGhlbihmdW5jdGlvbihzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdSb2xlIGFzc2lnbmVkIHRvIHVzZXIgaW4gY29udGV4dCBhZG9wdGlvbicsIHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncm9sZXNNYW5hZ2VyLSBhZG9wdGlvbiBmYWlsJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoJ3JvbGUgdXBkYXRlIGZhaWxlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUm9sZSBub3QgZm91bmQgaW4gYW55IGNvbnRleHQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoJ1JvbGUgbm90IGZvdW5kIGluIGFueSBjb250ZXh0JylcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gICAgY29tbXVuaXR5OiBjb21tdW5pdHksXG4gICAgYXBwbGljYXRpb246IGFwcGxpY2F0aW9uLFxuICAgIHBlcmZvcm1hbmNlOiBwZXJmb3JtYW5jZSxcbiAgICB3b3JrZXI6IHdvcmtlcixcbiAgICBzZG86IHNkbyxcbiAgICB0YXhvbm9teTogdGF4b25vbXksXG4gICAgc3ViUHJvY2Vzc0luc3RhbmNlOiBzdWJQcm9jZXNzSW5zdGFuY2UsXG4gICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgbm90aWZpY2F0aW9uOiBub3RpZmljYXRpb24sXG4gICAgcmVwb3J0OiByZXBvcnQsXG4gICAgcGFydGljaXBhbnRzOiBwYXJ0aWNpcGFudHMsXG4gICAgdXNlcjogdXNlclxufSIsIid1c2Ugc3RyaWN0JztcblxuLy92YXIgZ2F0ZWtlZXBlciA9IHJlcXVpcmUoJy4uL2Jvd2VyX2NvbXBvbmVudHMvZ2F0ZWtlZXBlcicpO1xudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsaXR5Jyk7XG5cbi8vIHZhciB1dWlkID0gcmVxdWlyZSgnbm9kZS11dWlkJyk7XG5cbnZhciBnYXRla2VlcGVyID0gbmV3IEdLKCk7XG5cbi8qKlxuICogRm9ybSBNb2R1bGVcbiAqXG4gKiBAbW9kdWxlIGxpYi9mb3JtXG4gKiBAYXV0aG9yIEJyZW50IEdvcmRvblxuICogQHZlcnNpb24gMi4wLjBcbiAqIEBkZXNjcmlwdGlvbiB0ZXN0IGRlc2NyaXB0aW9uXG4gKiBAY29weXJpZ2h0IEt3YW50dSBMdGQgUlNBIDIwMDktMjAxNS5cbiAqXG4gKi9cblxuZnVuY3Rpb24gY3JlYXRlKGFyZ3MpIHtcblxuICAgIHZhciBwcm9jZXNzSWQgPSBhcmdzWzBdIHx8ICcnO1xuXG4gICAgdmFyIHN1YlByb2Nlc3MgPSBhcmdzWzFdIHx8IHt9O1xuXG4gICAgdmFyIHN0ZXAgPSBhcmdzWzJdIHx8IHt9O1xuXG4gICAgdmFyIGFjdGlvbiA9IGFyZ3NbM10gfHwge307XG5cbiAgICB2YXIgX1dGSW5zdGFuY2UgPSBhcmdzWzZdIHx8IHt9O1xuXG4gICAgdmFyIGRhdGEgPSBhcmdzWzZdIHx8IHt9O1xuXG4gICAgdmFyIGluZGljYXRvcnMgPSBzdWJQcm9jZXNzLmluZGljYXRvcnMgfHwgW107XG5cbiAgICB2YXIgcmVzdWx0ID0gW107XG5cbiAgICB2YXIgaW5kaWNhdG9yVHlwZSA9IGFjdGlvbi5fdHlwZTtcblxuICAgIHZhciBwcm9jZXNzU2VxID0gYXJnc1s0XSB8fCAnJztcblxuICAgIHZhciBzdWJQcm9jZXNzU2VxID0gYXJnc1s1XSB8fCAnJztcblxuICAgIHZhciBjcmVhdGVUeXBlID0gYXJnc1s3XSB8fCAnJztcblxuICAgIHZhciBzdWJQcm9jZXNzSWQgPSBzdWJQcm9jZXNzLl9pZDtcblxuICAgIHZhciB1dWlkID0gYXJnc1s4XSB8fCAnJztcblxuICAgIHZhciBiYXNlVVVJRCA9IGFyZ3NbOV0gfHwgJyc7XG5cbiAgICB2YXIgcHJvZmlsZSA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XG5cbiAgICB2YXIgaW5wdXREYXRhID0gYXJnc1sxMF0gfHwge307XG5cbiAgICB2YXIgZm9ybUNyZWF0ZVR5cGUgPSBhY3Rpb24ubWV0aG9kLmZvcm0uY3JlYXRlO1xuXG4gICAgdmFyIGZvcm1UeXBlID0gYWN0aW9uLm1ldGhvZC5mb3JtLnR5cGU7XG5cbiAgICB2YXIgcGFyYW1PYmplY3QgPSB7XG5cbiAgICAgICAgXCJmb3JtQ3JlYXRlVHlwZVwiOiBmb3JtQ3JlYXRlVHlwZSxcbiAgICAgICAgXCJmb3JtVHlwZVwiOiBmb3JtVHlwZVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIHRvUHJvY2VzcyA9IGluZGljYXRvcnMubGVuZ3RoO1xuICAgICAgICB2YXIgYnJva2UgPSBmYWxzZTtcblxuICAgICAgICB2YXIgcmVzb2x2ZUNhbGxlciA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgaWYgKGJyb2tlID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gY3JlYXRlIGluZGljYXRvciBwZXJzaXN0IHN1Y2Nlc3MuJywgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycyk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgdG9BZGRQcm9jZXNzID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfV0ZJbnN0YW5jZS5pbnN0YW5jZS5wcm9jZXNzZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9XRkluc3RhbmNlLmluc3RhbmNlLnByb2Nlc3Nlc1tpXS5zdWJQcm9jZXNzZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9BZGRQcm9jZXNzLnB1c2goX1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzID0gW107XG4gICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzID0gdG9BZGRQcm9jZXNzO1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgaW52b2x2ZWRTdWJQcm9jZXNzZXMgPSBbXTtcbiAgICAgICAgICAgICAgICB2YXIgc3ViUHJvY2Vzc09iamVjdCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgIHZhciBzdWJQcm9jZXNzSWQgPSBzdWJQcm9jZXNzT2JqZWN0LmlkO1xuICAgICAgICAgICAgICAgIHZhciBzdWJQcm9jZXNzQ29uZmlnT2JqZWN0ID0gSlNPTi54cGF0aChcIi9jb25maWcvcHJvY2Vzc2VzL3N1YlByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3ViUHJvY2Vzc0lkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgIGlmIChzdWJQcm9jZXNzQ29uZmlnT2JqZWN0Lmluc3RhbmNlVHlwZS5uZXdTZXF1ZW5jZSAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN1YlByb2Nlc3NDb25maWdPYmplY3QuaW5kaWNhdG9ycy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yID0gc3ViUHJvY2Vzc0NvbmZpZ09iamVjdC5pbmRpY2F0b3JzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNldElkID0gaW5kaWNhdG9yLl9pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3JVVUlEID0gSlNPTi54cGF0aChcImRpc3RpbmN0LXZhbHVlcygvc3VicHJvY2Vzc2VzW2dyb3VwS2V5ID0gJ1wiICsgc3ViUHJvY2Vzc09iamVjdC5ncm91cEtleSArIFwiJ10vaW5kaWNhdG9yc1tpZCA9ICdcIiArIHNldElkICsgXCInXS9pbnN0YW5jZXMvdXVpZClcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9KU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlcy9pbmRpY2F0b3JzW2lkIGVxICdcIiArIHNldElkICsgXCInXS9pbnN0YW5jZXMvdXVpZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kaWNhdG9yVVVJRCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yT2JqZWN0ID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW19pZCBlcSAnXCIgKyBpbmRpY2F0b3JVVUlEICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRpY2F0b3JPYmplY3QgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGljYXRvck9iamVjdC5tb2RlbC5wZW5kaW5nID0gaW5kaWNhdG9yT2JqZWN0Lm1vZGVsLmFwcHJvdmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRMaXN0TmFtZXMgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdWJQcm9jZXNzQ29uZmlnT2JqZWN0LmluZGljYXRvcnMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRMaXN0TmFtZXMgPSBpbmRMaXN0TmFtZXMgKyBcIidcIiArIHN1YlByb2Nlc3NDb25maWdPYmplY3QuaW5kaWNhdG9yc1tpXS5faWQgKyBcIicsXCJcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGluZExpc3ROYW1lcyA9IGluZExpc3ROYW1lcyArIFwiJ1wiICsgc3ViUHJvY2Vzc0NvbmZpZ09iamVjdC5pbmRpY2F0b3JzW3N1YlByb2Nlc3NDb25maWdPYmplY3QuaW5kaWNhdG9ycy5sZW5ndGggLSAxXS5faWQgKyBcIidcIlxuICAgICAgICAgICAgICAgICAgICBpbnZvbHZlZFN1YlByb2Nlc3NlcyA9IEpTT04ueHBhdGgoXCJkaXN0aW5jdC12YWx1ZXMoL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSA9IChcIiArIGluZExpc3ROYW1lcyArIFwiKV0vbW9kZWwvYXBwcm92ZWQvc3ViUHJvY2Vzc1VVSUQpXCIsIF9XRkluc3RhbmNlLCB7fSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHBlcnNpc3RTdWJQcm9jZXNzID0gZnVuY3Rpb24gKGluZGV4LCBpbnZvbHZlZFN1YlByb2Nlc3Nlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID09IGludm9sdmVkU3ViUHJvY2Vzc2VzLmxlbmd0aCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRvQWRkU3ViUHJvY2VzcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXNbaV0uaW5kaWNhdG9ycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b0FkZFN1YlByb2Nlc3MucHVzaChfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXNbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzID0gdG9BZGRTdWJQcm9jZXNzO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmFpbHVyZSA9IHV0aWwuc3VjY2VzcygnR2F0ZWtlZXBlciBpbml0aWFsaXNhdGlvbiBmYWlsZWQgKDEwMCknLCB7fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGZhaWx1cmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNpc3REYXRhKCdpbmRpY2F0b3JzJywgX1dGSW5zdGFuY2UsIGludm9sdmVkU3ViUHJvY2Vzc2VzW2luZGV4XSkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJzaXN0U3ViUHJvY2VzcyhpbmRleCArIDEsIGludm9sdmVkU3ViUHJvY2Vzc2VzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNpc3RTdWJQcm9jZXNzKGluZGV4ICsgMSwgaW52b2x2ZWRTdWJQcm9jZXNzZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBwZXJzaXN0U3ViUHJvY2VzcygwLCBpbnZvbHZlZFN1YlByb2Nlc3Nlcyk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciB0b0FkZFN1YlByb2Nlc3MgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXNbaV0uaW5kaWNhdG9ycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9BZGRTdWJQcm9jZXNzLnB1c2goX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLnN1YnByb2Nlc3NlcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMgPSB0b0FkZFN1YlByb2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmYWlsdXJlID0gdXRpbC5zdWNjZXNzKCdHYXRla2VlcGVyIGluaXRpYWxpc2F0aW9uIGZhaWxlZCAoMTAwKScsIHt9KTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGZhaWx1cmUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzdWJwcm9jZXNzVHlwZSA9IEpTT04ueHBhdGgoXCIvY29uZmlnL3Byb2Nlc3Nlcy9zdWJQcm9jZXNzZXNbX2lkIGVxICdcIiArIHN1YlByb2Nlc3NJZCArIFwiJ10vdHlwZVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuXG4gICAgICAgIHZhciBmb3JtQ3JlYXRlRm4gPSBmdW5jdGlvbiAoaW5kaWNhdG9yVHlwZSwgaW5kaWNhdG9ySWQsIHZhbGlkRGF0ZSwgaW5zdGFudGlhdGVTb3VyY2UpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgICAgIGdhdGVrZWVwZXIuaW5zdGFudGlhdGUoYmFzZVVVSUQsIGluZGljYXRvclR5cGUsIGluZGljYXRvcklkLCBfV0ZJbnN0YW5jZS5wcm9maWxlLCB2YWxpZERhdGUsIHN1YlByb2Nlc3NJZCwgc3VicHJvY2Vzc1R5cGUpLnRoZW4oZnVuY3Rpb24gKGRvY0FycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgaW5kaWNhdG9yIHdvcmtmbG93IHByb2Nlc3NlcyBzZWN0aW9uXG5cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkb2NBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9iamVjdCA9IGRvY0FycmF5W2ldO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yID0gX1dGSW5zdGFuY2UuaW5kaWNhdG9yc1tpbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGljYXRvci5faWQgPT0gb2JqZWN0Lm1vZGVsLl9pZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5wdXNoKG9iamVjdC5tb2RlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFvYmplY3QubW9kZWwuX2lkLmVuZHNXaXRoKCc6YXBwcm92ZWQnKSAmJiAhb2JqZWN0Lm1vZGVsLl9pZC5lbmRzV2l0aCgnOnJlamVjdGVkJykpIHtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0Lm1vZGVsLm1vZGVsLnBlbmRpbmcudmFsaWREYXRlID0gdmFsaWREYXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdC5tb2RlbC5tb2RlbC5wZW5kaW5nLnN1YlByb2Nlc3NVVUlEID0gdXVpZDtcblxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgd29ya2Zsb3dPYmogPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogX1dGSW5zdGFuY2UuY29uZmlnLl9pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbnN0YW5jZVwiOiBfV0ZJbnN0YW5jZS5pbnN0YW5jZS5faWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvY2Vzc2VzXCI6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IHByb2Nlc3NJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3ViUHJvY2Vzc0lkXCI6IHN1YlByb2Nlc3MuX2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJQcm9jZXNzVVVJRFwiOiB1dWlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdGVwXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IHN0ZXAuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZXFcIjogc3RlcC5zZXEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdGFydERhdGVcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0YXR1c1wiOiBzdGVwLnN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogc3RlcC5tZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXNzaWduZWRUb1wiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlcklkXCI6IHN0ZXAuYXNzaWduZWRUby51c2VySWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBzdGVwLmFzc2lnbmVkVG8ubmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21tZW50XCI6IHN0ZXAuY29tbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbXBsZXRlXCI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZW5kRGF0ZVwiOiBcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqZWN0Lm1vZGVsLm1vZGVsLnBlbmRpbmcuc2VxID09IDEgJiYgYWN0aW9uLnNldFdvcmtmbG93TGFiZWxJblRpdGxlICE9IHVuZGVmaW5lZCAmJiBhY3Rpb24uc2V0V29ya2Zsb3dMYWJlbEluVGl0bGUgIT0gJycgJiYgYWN0aW9uLnNldFdvcmtmbG93TGFiZWxJblRpdGxlID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0Lm1vZGVsLnRpdGxlID0gaW5wdXREYXRhLmxhYmVsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24uc2V0RHJhZnQgIT0gdW5kZWZpbmVkICYmIGFjdGlvbi5zZXREcmFmdCAhPSAnJyAmJiBhY3Rpb24uc2V0RHJhZnQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3QubW9kZWwuY29udHJvbC5kcmFmdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0Lm1vZGVsLndvcmtmbG93cy5wdXNoKHdvcmtmbG93T2JqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWFpbklkID0gb2JqZWN0Lm1vZGVsLl9pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwZXJzaXN0IHZpYSBnayBzbyB0aGF0IGl0IGlzIHNhdmUgaW4gY291Y2hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYXRla2VlcGVyLnBlcnNpc3QoZG9jQXJyYXkpLnRoZW4oZnVuY3Rpb24gKHNhdmVkQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy91c2luZyBzYW1lIGlkIGNhbGwgaW5pdGlhbGlzZURhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jYWxsIGNvZGUgdG8gc2V0IHRvIHNldEluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhby5nZXQobWFpbklkKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3JNb2RlbCA9IGtvLm1hcHBpbmcuZnJvbUpTKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRlZmF1bHRNb2RlbFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2V0SWRcIjogaW5kaWNhdG9ySWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlcXVlbmNlID0gZGF0YS5tb2RlbC5wZW5kaW5nLnNlcTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhdGVrZWVwZXIuaW5zdGFudGlhdGVEYXRhKG1haW5JZCwgaW5zdGFudGlhdGVTb3VyY2UsIGluZGljYXRvck1vZGVsLCBkYXRhLm1vZGVsLnBlbmRpbmcuc2VxLCBwYXJhbU9iamVjdCkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhWzBdLnN0YXR1cyA9PSBcIjIwMFwiKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IF9XRkluc3RhbmNlLmluZGljYXRvcnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yID0gX1dGSW5zdGFuY2UuaW5kaWNhdG9yc1tpbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kaWNhdG9yLl9pZCA9PSBkYXRhWzBdLm1vZGVsLl9pZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhWzBdLm1vZGVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VxdWVuY2UgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGlvbi5zZXRXb3JrZmxvd0xhYmVsSW5GaWVsZCAhPSB1bmRlZmluZWQgJiYgYWN0aW9uLnNldFdvcmtmbG93TGFiZWxJbkZpZWxkICE9ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFzc2lnbm1lbnRTZXRJZCA9IGFjdGlvbi5zZXRXb3JrZmxvd0xhYmVsSW5GaWVsZC5zcGxpdChcIi5cIilbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFzc2lnbm1lbnRTZXRJZCA9PSBpbmRpY2F0b3JJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHR4dCA9IGlucHV0RGF0YS5sYWJlbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNxdW90ZSA9IHR4dC5yZXBsYWNlKC8nL2csIFwiXFxcXCdcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXRoID0gXCJkYXRhWzBdLm1vZGVsLm1vZGVsLnBlbmRpbmcuZGF0YS5cIiArIGFjdGlvbi5zZXRXb3JrZmxvd0xhYmVsSW5GaWVsZCArIFwiPSdcIiArIHNxdW90ZSArIFwiJ1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmFsKHBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhdGVrZWVwZXIucGVyc2lzdChkYXRhKS50aGVuKGZ1bmN0aW9uIChzYXZlZEFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYW8uZ2V0KG1haW5JZCkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9Qcm9jZXNzLS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b1Byb2Nlc3MgPT0gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJzaXN0RGF0YSgnaW5kaWNhdG9ycycsIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnRm9ybSBjcmVhdGUgaW5kaWNhdG9yIHBlcnNpc3Qgc3VjY2Vzcy4nLCBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlQ2FsbGVyKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmFpbHVyZSA9IHV0aWwuc3VjY2VzcygnRm9ybSBjcmVhdGUgaW5kaWNhdG9yIHBlcnNpc3QgZmFpbGVkLicsIHt9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicm9rZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZUNhbGxlcigpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoe30pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IF9XRkluc3RhbmNlLmluZGljYXRvcnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yID0gX1dGSW5zdGFuY2UuaW5kaWNhdG9yc1tpbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kaWNhdG9yLl9pZCA9PSBkYXRhLl9pZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgY3VycmVudCBpdGVtIGZyb20gdGhlIGFycmF5IGFuZCBhZGQgdGhlIHVwZGF0ZWQgcHJvY2Vzc01vZGVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleCA9IF9XRkluc3RhbmNlLmluZGljYXRvcnMubGVuZ3RoO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b1Byb2Nlc3MtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9Qcm9jZXNzID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyc2lzdERhdGEoJ2luZGljYXRvcnMnLCBfV0ZJbnN0YW5jZSwgdXVpZCkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnRm9ybSBjcmVhdGUgaW5kaWNhdG9yIHBlcnNpc3Qgc3VjY2Vzcy4nLCBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmVDYWxsZXIoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmYWlsdXJlID0gdXRpbC5zdWNjZXNzKCdGb3JtIGNyZWF0ZSBpbmRpY2F0b3IgcGVyc2lzdCBmYWlsZWQuJywge30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJva2UgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZUNhbGxlcigpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh7fSk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm91bmQgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9Qcm9jZXNzLS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9Qcm9jZXNzID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJzaXN0RGF0YSgnaW5kaWNhdG9ycycsIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gY3JlYXRlIGluZGljYXRvciBwZXJzaXN0IHN1Y2Nlc3MuJywgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmVDYWxsZXIoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmYWlsdXJlID0gdXRpbC5zdWNjZXNzKCdGb3JtIGNyZWF0ZSBpbmRpY2F0b3IgcGVyc2lzdCBmYWlsZWQuJywge30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicm9rZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmVDYWxsZXIoKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh7fSk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZhaWx1cmUgPSB1dGlsLnN1Y2Nlc3MoJzEgR2F0ZWtlZXBlciBpbml0aWFsaXNhdGlvbiBmYWlsZWQgd2l0aCBpbml0aWFsaXNlRGF0YSBtZXNzYWdlICcsIHt9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicm9rZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9Qcm9jZXNzLS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRvUHJvY2VzcyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmVDYWxsZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHt9KTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmFpbHVyZSA9IHV0aWwuc3VjY2VzcygnMiBHYXRla2VlcGVyIGluaXRpYWxpc2F0aW9uIGZhaWxlZCB3aXRoIGluaXRpYWxpc2VEYXRhIG1lc3NhZ2UgJywge30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJva2UgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9Qcm9jZXNzLS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9Qcm9jZXNzID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlQ2FsbGVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoe30pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZhaWx1cmUgPSB1dGlsLnN1Y2Nlc3MoJzMgR2F0ZWtlZXBlciBpbml0aWFsaXNhdGlvbiBmYWlsZWQgd2l0aCBpbml0aWFsaXNlRGF0YSBtZXNzYWdlICcsIHt9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJva2UgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b1Byb2Nlc3MtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRvUHJvY2VzcyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlQ2FsbGVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHt9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmYWlsdXJlID0gdXRpbC5zdWNjZXNzKCc0IEdhdGVrZWVwZXIgaW5pdGlhbGlzYXRpb24gZmFpbGVkIHdpdGggaW5pdGlhbGlzZURhdGEgbWVzc2FnZSAnLCB7fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJva2UgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvUHJvY2Vzcy0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b1Byb2Nlc3MgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlQ2FsbGVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh7fSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmYWlsdXJlID0gdXRpbC5zdWNjZXNzKCc1IEdhdGVrZWVwZXIgaW5pdGlhbGlzYXRpb24gZmFpbGVkIHdpdGggaW5pdGlhbGlzZURhdGEgbWVzc2FnZSAnLCB7fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicm9rZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b1Byb2Nlc3MtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b1Byb2Nlc3MgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmVDYWxsZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh7fSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZhaWx1cmUgPSB1dGlsLnN1Y2Nlc3MoJzYgR2F0ZWtlZXBlciBpbml0aWFsaXNhdGlvbiBmYWlsZWQgd2l0aCBpbml0aWFsaXNlRGF0YSBtZXNzYWdlICcsIHt9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJva2UgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b1Byb2Nlc3MtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRvUHJvY2VzcyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlQ2FsbGVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHt9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcblxuICAgICAgICAgICAgICAgICAgICBicm9rZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRvUHJvY2Vzcy0tO1xuICAgICAgICAgICAgICAgICAgICBpZiAodG9Qcm9jZXNzID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmVDYWxsZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoe30pO1xuXG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSk7XG5cblxuXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGluc3RhbnRpYXRlU291cmNlID0gRlJPTV9ERUZJTklUSU9OO1xuXG4gICAgICAgIHZhciBsb29wRnVuY3Rpb24gPSBmdW5jdGlvbiAoaW5kaWNhdG9ycywgY291bnRlcikge1xuXG4gICAgICAgICAgICBpZiAoaW5kaWNhdG9ycy5sZW5ndGggPT0gMCkge1xuXG4gICAgICAgICAgICAgICAgdG9Qcm9jZXNzLS07XG4gICAgICAgICAgICAgICAgaWYgKHRvUHJvY2VzcyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmVDYWxsZXIoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNvdW50ZXIgPCBpbmRpY2F0b3JzLmxlbmd0aCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIGluZGljYXRvcklkID0gaW5kaWNhdG9yc1tjb3VudGVyXS5faWQ7XG4gICAgICAgICAgICAgICAgdmFyIGluZGljYXRvck5hbWUgPSB1dGlsLmdldE5hbWUoaW5kaWNhdG9yc1tjb3VudGVyXS5uYW1lLCAnZW4nKTtcblxuICAgICAgICAgICAgICAgIHZhciBzb3VyY2UgPSBpbmRpY2F0b3JzW2NvdW50ZXJdLmluaXRpYXRlRGF0YTtcblxuICAgICAgICAgICAgICAgIHZhciBpbml0VHlwZSA9ICcnO1xuICAgICAgICAgICAgICAgIGlmIChzdWJQcm9jZXNzLmluc3RhbmNlVHlwZS5uZXdTZXF1ZW5jZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5pdFR5cGUgPSBJTlNUQU5DRV9UWVBFX05FV19TRVE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdWJQcm9jZXNzLmluc3RhbmNlVHlwZS5uZXdJbnN0YW5jZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5pdFR5cGUgPSBJTlNUQU5DRV9UWVBFX05FV19JTlM7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIGluZGljYXRvckRvYyA9IHt9O1xuICAgICAgICAgICAgICAgIGlmIChiYXNlVVVJRCAhPSB1bmRlZmluZWQgJiYgYmFzZVVVSUQgIT0gJycgJiYgYmFzZVVVSUQubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzcCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBiYXNlVVVJRCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoc3ViUHJvY2Vzcy5wZXJpb2RUeXBlLnBlcmlvZGljID09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmFzZVVVSUQgIT0gdXVpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG5cbiAgICAgICAgICAgICAgICAgICAgaW5zdGFudGlhdGVTb3VyY2UgPSBGUk9NX0FVVEhPUklTRUQ7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2FyZGluYWxpdHkgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbc2V0SWQgZXEgJ1wiICsgaW5kaWNhdG9ySWQgKyBcIiddL2NhcmRpbmFsaXR5XCIsIGFwcC5TQ09QRS5BUFBfQ09ORklHLCB7fSlbMF07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGluaXRUeXBlID09IElOU1RBTkNFX1RZUEVfTkVXX0lOUykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FyZGluYWxpdHkgPT0gSU5ESUNBVE9SX0NBUkRJTkFMSVRZX1NJTkdMRSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGV4aXN0aW5nVVVJRCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdcIiArIGluZGljYXRvcklkICsgXCInXS9faWRcIiwgX1dGSW5zdGFuY2UsIHt9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChleGlzdGluZ1VVSUQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW50aWF0ZVNvdXJjZSA9IEZST01fQVVUSE9SSVNFRDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW50aWF0ZVNvdXJjZSA9IEZST01fREVGSU5JVElPTjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbnRpYXRlU291cmNlID0gRlJPTV9ERUZJTklUSU9OO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cblxuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYXJkaW5hbGl0eSA9PSBJTkRJQ0FUT1JfQ0FSRElOQUxJVFlfU0lOR0xFKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXhpc3RpbmdVVUlEID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ1wiICsgaW5kaWNhdG9ySWQgKyBcIiddL19pZFwiLCBhcHAuU0NPUEUud29ya2Zsb3csIHt9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChleGlzdGluZ1VVSUQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW50aWF0ZVNvdXJjZSA9IEZST01fQVVUSE9SSVNFRDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW50aWF0ZVNvdXJjZSA9IEZST01fREVGSU5JVElPTjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXRoID0gXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdcIiArIGluZGljYXRvcklkICsgXCInIGFuZCBpZCA9IC9zdWJwcm9jZXNzZXNbaWQgPSAnXCIgKyBzdWJQcm9jZXNzSWQgKyBcIiddL2luZGljYXRvcnMvaW5zdGFuY2VzL3V1aWRdL19pZFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJ0ID0gbGlicmFyeS5nZXRTdWJwcm9maWxlU3VicHJvY2Vzc0lkcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWJwcm9jZXNzVHlwZSA9PSBQUk9DRVNTX1RZUEVfU1VCUFJPRklMRSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoID0gXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdcIiArIGluZGljYXRvcklkICsgXCInIGFuZCBpZCA9IC9zdWJwcm9jZXNzZXNbaWQgPSAnXCIgKyBzdWJQcm9jZXNzSWQgKyBcIicgYW5kIGlkID0gXCIgKyBwYXJ0ICsgXCJdL2luZGljYXRvcnMvaW5zdGFuY2VzL3V1aWRdL19pZFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXhpc3RpbmdVVUlEID0gSlNPTi54cGF0aChwYXRoLCBfV0ZJbnN0YW5jZSwge30pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV4aXN0aW5nVVVJRC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbnRpYXRlU291cmNlID0gRlJPTV9BVVRIT1JJU0VEO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbnRpYXRlU291cmNlID0gRlJPTV9ERUZJTklUSU9OO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG5cblxuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvcm1DcmVhdGVGbihpbml0VHlwZSwgaW5kaWNhdG9ySWQsIGlucHV0RGF0YS52YWxpZERhdGUsIGluc3RhbnRpYXRlU291cmNlKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9vcEZ1bmN0aW9uKGluZGljYXRvcnMsIChjb3VudGVyICsgMSkpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBicm9rZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b1Byb2Nlc3MtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b1Byb2Nlc3MgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmVDYWxsZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBsb29wRnVuY3Rpb24oaW5kaWNhdG9ycywgMCk7XG5cbiAgICB9KTtcbn07XG5cbmZ1bmN0aW9uIHNldEluc3RhbmNlVGl0bGUoYXJncykge1xuXG4gICAgdmFyIF9XRkluc3RhbmNlID0gYXJnc1swXSB8fCB7fTtcblxuICAgIHZhciB1dWlkID0gYXJnc1syXSB8fCAnJztcbiAgICB2YXIgZGF0YSA9IGFyZ3NbNF0gfHwge307XG5cbiAgICB2YXIgdGl0bGUgPSBkYXRhLmxhYmVsO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICB2YXIgc3ViUHJvY2Vzc0luc3RhbmNlID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgIHZhciBpbmRpY2F0b3JJbnN0YW5jZXMgPSBzdWJQcm9jZXNzSW5zdGFuY2UuaW5kaWNhdG9ycztcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluZGljYXRvckluc3RhbmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGluZGljYXRvclVVSUQgPSBpbmRpY2F0b3JJbnN0YW5jZXNbaV0uaW5zdGFuY2VzWzBdLnV1aWQ7XG4gICAgICAgICAgICB2YXIgaW5kaWNhdG9ySW5zdGFuY2UgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbX2lkIGVxICdcIiArIGluZGljYXRvclVVSUQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICBpbmRpY2F0b3JJbnN0YW5jZS50aXRsZSA9IGluZGljYXRvckluc3RhbmNlc1tpXS5pZCArICcgJyArIHRpdGxlO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlc29sdmUoXCJTZXQgVGl0bGUgU3VjY2Vzc1wiLCBpbmRpY2F0b3JJbnN0YW5jZXMpO1xuXG4gICAgfSk7XG5cbn07XG5cbmZ1bmN0aW9uIGRlbGV0ZVByb2ZpbGUoYXJncykge1xuXG4gICAgdmFyIF9XRkluc3RhbmNlID0gYXJnc1swXSB8fCB7fTtcblxuICAgIHZhciBwcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICB2YXIgc3VicHJvZmlsZUlkID0gXCJcIjtcbiAgICAgICAgaWYgKGFwcC5wcm9maWxlICE9IHVuZGVmaW5lZCAmJiBhcHAucHJvZmlsZS5zdWJwcm9maWxlSWQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzdWJwcm9maWxlSWQgPSBhcHAucHJvZmlsZS5zdWJwcm9maWxlSWQ7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0ge1xuICAgICAgICAgICAgXCJzb3VyY2VcIjogXCJyZW1vdGVcIixcbiAgICAgICAgICAgIFwidHlwZVwiOiBcIndvcmtlck9iamVjdFwiLFxuICAgICAgICAgICAgXCJfaWRcIjogZ2VuZXJhdGVVVUlEKCksXG4gICAgICAgICAgICBcImNoYW5uZWxzXCI6IFtcImRlbGV0ZVByb2ZpbGVcIiwgXCJjb21tdW5pdHlfXCIgKyBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKSwgXCJ3b3JrZXJPYmplY3RcIl0sXG4gICAgICAgICAgICBcImNvbW11bml0eUlkXCI6IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpLFxuICAgICAgICAgICAgXCJhcHBsaWNhdGlvbklkXCI6IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkLFxuICAgICAgICAgICAgXCJwcm9maWxlSWRcIjogX1dGSW5zdGFuY2UucHJvZmlsZSxcbiAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIlwiLFxuICAgICAgICAgICAgXCJzdWJwcm9maWxlSWRcIjogc3VicHJvZmlsZUlkLFxuICAgICAgICAgICAgXCJtZXNzYWdlVHlwZVwiOiBcImluZm9cIixcbiAgICAgICAgICAgIFwiY3JlYXRlZERhdGVUaW1lXCI6IG1vbWVudCgpLmZvcm1hdCgpLFxuICAgICAgICAgICAgXCJzZW5kZXJVc2VySWRcIjogTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQsXG4gICAgICAgICAgICBcInBhcmVudFRyYW5zYWN0aW9uSWRcIjogKGFwcC5TQ09QRS50eG4gPT0gdW5kZWZpbmVkID8gXCJcIiA6IGFwcC5TQ09QRS50eG4udHJhbnNhY3Rpb25JZCksXG4gICAgICAgICAgICBcIm5vdGlmaWNhdGlvblwiOiB7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInByb2ZpbGVcIjoge1xuICAgICAgICAgICAgICAgIFwiYWN0aW9uXCI6IFwiZGVsZXRlUHJvZmlsZVwiLFxuICAgICAgICAgICAgICAgIFwicHJvZmlsZUlkXCI6IHByb2ZpbGVJZFxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZyh3b3JrZXJPYmplY3QpO1xuICAgICAgICBkYW8udXBzZXJ0KHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJXb3JrZXIgT2JqZWN0IHN1Ym1pdHRlZCBmb3IgcHJvZmlsZShcIiArIHByb2ZpbGVJZCArIFwiKSBkZWxldGlvbi5cIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICByZWplY3QoZGF0YSk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVByb2ZpbGUoYXJncykge1xuXG4gICAgdmFyIF9XRkluc3RhbmNlID0gYXJnc1sxXSB8fCB7fTtcblxuICAgIHZhciBjb21tdW5pdHlJZCA9IF9XRkluc3RhbmNlLmNvbW11bml0eUlkO1xuICAgIHZhciBwcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICBsaWJyYXJ5LmNyZWF0ZVByb2ZpbGVEb2N1bWVudHMoY29tbXVuaXR5SWQsIHByb2ZpbGVJZCkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuXG4gICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnRm9ybSBjcmVhdGVkIHN1Y2Nlc3NmdWxseS4nLCBkYXRhKTtcbiAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICB2YXIgZmFpbHVyZSA9IHV0aWwuc3VjY2VzcygnRVJST1I6IFByb2ZpbGUgY3JlYXRpb24gZmFpbGVkJywge30pO1xuICAgICAgICAgICAgcmVqZWN0KGZhaWx1cmUpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG59O1xuXG5mdW5jdGlvbiBzZXREcmFmdChhcmdzKSB7XG5cbiAgICB2YXIgX1dGSW5zdGFuY2UgPSBhcmdzWzBdIHx8IHt9O1xuXG4gICAgdmFyIGNvbW11bml0eUlkID0gX1dGSW5zdGFuY2UuY29tbXVuaXR5SWQ7XG4gICAgdmFyIHByb2ZpbGVJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XG4gICAgdmFyIHV1aWQgPSBhcmdzWzJdIHx8ICcnO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICB2YXIgc3ViUHJvY2Vzc0luc3RhbmNlID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgIHZhciBpbmRpY2F0b3JJbnN0YW5jZXMgPSBzdWJQcm9jZXNzSW5zdGFuY2UuaW5kaWNhdG9ycztcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluZGljYXRvckluc3RhbmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGluZGljYXRvclVVSUQgPSBpbmRpY2F0b3JJbnN0YW5jZXNbaV0uaW5zdGFuY2VzWzBdLnV1aWQ7XG4gICAgICAgICAgICB2YXIgaW5kaWNhdG9ySW5zdGFuY2UgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbX2lkIGVxICdcIiArIGluZGljYXRvclVVSUQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICBpbmRpY2F0b3JJbnN0YW5jZS5jb250cm9sLmRyYWZ0ID0gdHJ1ZTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXNvbHZlKFwiU2V0IERyYWZ0IFN1Y2Nlc3NcIiwgaW5kaWNhdG9ySW5zdGFuY2VzKTtcblxuICAgIH0pO1xufTtcblxuZnVuY3Rpb24gc2V0VW5EcmFmdChhcmdzKSB7XG5cbiAgICB2YXIgX1dGSW5zdGFuY2UgPSBhcmdzWzBdIHx8IHt9O1xuXG4gICAgdmFyIGNvbW11bml0eUlkID0gX1dGSW5zdGFuY2UuY29tbXVuaXR5SWQ7XG4gICAgdmFyIHByb2ZpbGVJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XG4gICAgdmFyIHV1aWQgPSBhcmdzWzJdIHx8ICcnO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICB2YXIgc3ViUHJvY2Vzc0luc3RhbmNlID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgIHZhciBpbmRpY2F0b3JJbnN0YW5jZXMgPSBzdWJQcm9jZXNzSW5zdGFuY2UuaW5kaWNhdG9ycztcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluZGljYXRvckluc3RhbmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGluZGljYXRvclVVSUQgPSBpbmRpY2F0b3JJbnN0YW5jZXNbaV0uaW5zdGFuY2VzWzBdLnV1aWQ7XG4gICAgICAgICAgICB2YXIgaW5kaWNhdG9ySW5zdGFuY2UgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbX2lkIGVxICdcIiArIGluZGljYXRvclVVSUQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICBpbmRpY2F0b3JJbnN0YW5jZS5jb250cm9sLmRyYWZ0ID0gZmFsc2U7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVzb2x2ZShcIlNldCBEcmFmdCBTdWNjZXNzXCIsIGluZGljYXRvckluc3RhbmNlcyk7XG5cbiAgICB9KTtcbn07XG5cbmZ1bmN0aW9uIHNhdmUoaW5kaWNhdG9yKSB7XG4gICAgdmFyIGNvbXBsZXRlZCA9IFtdO1xuICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgIGNvbXBsZXRlOiB0cnVlLFxuICAgICAgICBkYXRhOiBbXVxuICAgIH07XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnRm9ybSBpbmRpY2F0b3Igc2V0IHNhdmVkIHN1Y2Nlc3NmdWxseS4nLCByZXN1bHQpO1xuICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgIH0pO1xufTtcblxuZnVuY3Rpb24gc3VibWl0KGZvcm0pIHtcbiAgICB2YXIgY29tcGxldGVkID0gW107XG4gICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgY29tcGxldGU6IHRydWUsXG4gICAgICAgIGRhdGE6IFtdXG4gICAgfTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIHN1Ym1pdHRlZCBzdWNjZXNzZnVsbHkuJywgcmVzdWx0KTtcbiAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICB9KTtcbn07XG5cbmZ1bmN0aW9uIGF1dGhvcmlzZShmb3JtKSB7XG4gICAgdmFyIGNvbXBsZXRlZCA9IFtdO1xuICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgIGNvbXBsZXRlOiB0cnVlLFxuICAgICAgICBkYXRhOiBbXVxuICAgIH07XG5cbiAgICB2YXIgcHJvY2Vzc0lkID0gZm9ybVswXSB8fCAnJztcblxuICAgIHZhciBzdWJQcm9jZXNzID0gZm9ybVsxXSB8fCB7fTtcblxuICAgIHZhciBzdWJQcm9jZXNzSWQgPSBzdWJQcm9jZXNzLl9pZDtcblxuICAgIHZhciBwcm9jZXNzU2VxID0gZm9ybVsyXSB8fCAnJztcblxuICAgIHZhciBzdWJQcm9jZXNzU2VxID0gZm9ybVszXSB8fCAnJztcblxuICAgIHZhciBfV0ZJbnN0YW5jZSA9IGZvcm1bNF0gfHwge307XG5cbiAgICB2YXIgc3ViUHJvY2Vzc1VVSUQgPSBmb3JtWzZdIHx8ICcnO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICB2YXIgc3BvID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHN1YlByb2Nlc3NVVUlEICsgXCInXVwiLCBhcHAuU0NPUEUud29ya2Zsb3csIHt9KVswXTtcblxuXG5cbiAgICAgICAgLy92YXIgc3ViUHJvY2Vzc1VVSUQgPSBKU09OLnhwYXRoKFwiL3Byb2Nlc3Nlc1tpZCBlcSAnXCIgKyBwcm9jZXNzSWQgKyBcIicgYW5kIHNlcSBlcSAnXCIgKyBwcm9jZXNzU2VxICsgXCInXS9zdWJQcm9jZXNzZXNbaWQgZXEgJ1wiICsgc3ViUHJvY2Vzc0lkICsgXCInIGFuZCBzZXEgZXEgJ1wiICsgc3ViUHJvY2Vzc1NlcSArIFwiJ10vdXVpZFwiLCBfV0ZJbnN0YW5jZS5pbnN0YW5jZSwge30pWzBdO1xuICAgICAgICB2YXIgc3BJbmRpY2F0b3JzID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHN1YlByb2Nlc3NVVUlEICsgXCInXS9pbmRpY2F0b3JzL2luc3RhbmNlcy91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSk7XG4gICAgICAgIHZhciBpdGVtc1RvUHJvY2VzcyA9IHNwSW5kaWNhdG9ycy5sZW5ndGg7XG4gICAgICAgIHZhciB1cGRhdGVkT2JqZWN0c0FycmF5ID0gW107XG4gICAgICAgIHZhciB0ZW1wQXJyYXkgPSBbXTtcblxuICAgICAgICAvL3N0YXJ0IHR4biBvbiBpbmR1dWlkICsgOmFwcHJvdmVkIHRoZW4gY29tbWl0XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzcEluZGljYXRvcnMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgZ2F0ZWtlZXBlci5hdXRob3Jpc2Uoc3BJbmRpY2F0b3JzW2ldKS50aGVuKGZ1bmN0aW9uIChhdXRob3Jpc2VkUmV0dXJuKSB7XG5cbiAgICAgICAgICAgICAgICBnYXRla2VlcGVyLnBlcnNpc3QoYXV0aG9yaXNlZFJldHVybikudGhlbihmdW5jdGlvbiAoc2F2ZWRBcnJheSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciB1dWlkU2F2ZWRJbmRpY2F0b3IgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCBzYXZlZEFycmF5Lmxlbmd0aDsgYysrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNhdmVkQXJyYXlbY10uaWQuZW5kc1dpdGgoJzphcHByb3ZlZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXVpZFNhdmVkSW5kaWNhdG9yID0gc2F2ZWRBcnJheVtjXS5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZGFvLmdldCh1dWlkU2F2ZWRJbmRpY2F0b3IpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9XRkluc3RhbmNlLmluZGljYXRvcnMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNUb1Byb2Nlc3MtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbXNUb1Byb2Nlc3MgPT0gMCkge1xuXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJzaXN0RGF0YSgnaW5kaWNhdG9ycycsIF9XRkluc3RhbmNlLCBzdWJQcm9jZXNzVVVJRCkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnRm9ybSBhdXRob3Jpc2VkIHN1Y2Nlc3NmdWxseS4nLCB1cGRhdGVkT2JqZWN0c0FycmF5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZhaWx1cmUgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gYXV0aG9yaXNlZCBwZXJzaXN0IGZhaWxlZC4nLCB7fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFpbHVyZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm91bmQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yID0gX1dGSW5zdGFuY2UuaW5kaWNhdG9yc1tpbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRpY2F0b3IuX2lkID09IGRhdGEuX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGN1cnJlbnQgaXRlbSBmcm9tIHRoZSBhcnJheSBhbmQgYWRkIHRoZSB1cGRhdGVkIHByb2Nlc3NNb2RlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEFycmF5LnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL19XRkluc3RhbmNlLmluZGljYXRvcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5wdXNoKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNUb1Byb2Nlc3MtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1RvUHJvY2VzcyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZExlbmd0aCA9IF9XRkluc3RhbmNlLmluZGljYXRvcnMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ZW1wTGVuZ3RoID0gdGVtcEFycmF5Lmxlbmd0aDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHAgPSAwOyBwIDwgaW5kTGVuZ3RoOyBwKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRlbXBPYmogPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgcSA9IDA7IHEgPCB0ZW1wTGVuZ3RoOyBxKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzW3BdLl9pZCA9PSB0ZW1wQXJyYXlbcV0uX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcE9iaiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0ZW1wT2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wQXJyYXkucHVzaChfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzW3BdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycyA9IHRlbXBBcnJheTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3VuZCA9PSB0cnVlICYmIGl0ZW1zVG9Qcm9jZXNzID09IDApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJzaXN0RGF0YSgnaW5kaWNhdG9ycycsIF9XRkluc3RhbmNlLCBzdWJQcm9jZXNzVVVJRCkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnRm9ybSBhdXRob3Jpc2VkIHN1Y2Nlc3NmdWxseS4nLCB1cGRhdGVkT2JqZWN0c0FycmF5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmFpbHVyZSA9IHV0aWwuc3VjY2VzcygnRm9ybSBhdXRob3Jpc2VkIHBlcnNpc3QgZmFpbGVkLicsIHt9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChmYWlsdXJlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGl0ZW1zVG9Qcm9jZXNzLS07XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1zVG9Qcm9jZXNzID09IDApIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnRm9ybSBhdXRob3Jpc2VkIHN1Y2Nlc3NmdWxseS4nLCB1cGRhdGVkT2JqZWN0c0FycmF5KTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuXG5cblxuICAgIH0pO1xufTtcblxuZnVuY3Rpb24gY2xvc2UoZm9ybSkge1xuICAgIHZhciBjb21wbGV0ZWQgPSBbXTtcbiAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgICBjb21wbGV0ZTogdHJ1ZSxcbiAgICAgICAgZGF0YTogW11cbiAgICB9O1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gY2xvc2VkIHN1Y2Nlc3NmdWxseS4nLCByZXN1bHQpO1xuICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgIH0pO1xufTtcblxuXG5cbmZ1bmN0aW9uIHVwZGF0ZUluZGljYXRvcihhcmdzKSB7XG5cbiAgICB2YXIgX1dGSW5zdGFuY2UgPSBhcmdzWzBdIHx8IHt9O1xuXG4gICAgdmFyIHV1aWQgPSBhcmdzWzFdIHx8ICcnO1xuICAgIHZhciBwYXRoID0gYXJnc1syXSB8fCAnJztcbiAgICB2YXIgZGF0YVZhbHVlID0gYXJnc1szXSB8fCAnJztcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgdmFyIHNldElkID0gcGF0aC5zcGxpdChcIi5cIiwgMSlbMF07XG4gICAgICAgIHZhciBpbmRPYmplY3QgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbd29ya2Zsb3dzL3Byb2Nlc3Nlcy9zdWJQcm9jZXNzVVVJRCA9ICdcIiArIHV1aWQgKyBcIicgYW5kIGNhdGVnb3J5L3Rlcm0gPSAnXCIgKyBzZXRJZCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcblxuICAgICAgICB2YXIgc3F1b3RlID0gKGRhdGFWYWx1ZSArIFwiXCIpLnJlcGxhY2UoLycvZywgXCJcXFxcJ1wiKTtcbiAgICAgICAgdmFyIGV4cHIgPSBcImluZE9iamVjdC5tb2RlbC5wZW5kaW5nLmRhdGEuXCIgKyBwYXRoICsgXCIgPSAnXCIgKyBzcXVvdGUgKyBcIidcIjtcbiAgICAgICAgZXZhbChleHByKTtcbiAgICAgICAgdmFyIGl0ZW1zVG9Qcm9jZXNzID0gMTtcbiAgICAgICAgdmFyIHN0dWZmID0gW107XG4gICAgICAgIHZhciBvYmogPSB7fTtcblxuICAgICAgICBvYmoubW9kZWwgPSBpbmRPYmplY3Q7XG4gICAgICAgIHN0dWZmLnB1c2gob2JqKTtcblxuICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnSW5kaWNhdG9yIHVwZGF0ZWQuJywgc3R1ZmYpO1xuICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgfSk7XG59O1xuXG5cbmZ1bmN0aW9uIHVwZGF0ZUluZGljYXRvcldyYXBwZXIoYXJncykge1xuXG4gICAgdmFyIF9XRkluc3RhbmNlID0gYXJnc1swXSB8fCB7fTtcblxuICAgIHZhciB1dWlkID0gYXJnc1sxXSB8fCAnJztcbiAgICB2YXIgcGF0aCA9IGFyZ3NbMl0gfHwgJyc7XG4gICAgdmFyIGRhdGFWYWx1ZSA9IGFyZ3NbM10gfHwgJyc7XG4gICAgdmFyIGluZGljYXRvclNldElkID0gYXJnc1s0XSB8fCAnJztcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cblxuICAgICAgICB2YXIgaW5kT2JqZWN0ID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW3dvcmtmbG93cy9wcm9jZXNzZXMvc3ViUHJvY2Vzc1VVSUQgPSAnXCIgKyB1dWlkICsgXCInIGFuZCBjYXRlZ29yeS90ZXJtID0gJ1wiICsgaW5kaWNhdG9yU2V0SWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG5cblxuXG4gICAgICAgIHZhciBzcXVvdGUgPSBkYXRhVmFsdWUucmVwbGFjZSgvJy9nLCBcIlxcXFwnXCIpO1xuICAgICAgICB2YXIgZXhwciA9IFwiaW5kT2JqZWN0LlwiICsgcGF0aCArIFwiID0gJ1wiICsgc3F1b3RlICsgXCInXCI7XG4gICAgICAgIGV2YWwoZXhwcik7XG4gICAgICAgIHZhciBpdGVtc1RvUHJvY2VzcyA9IDE7XG4gICAgICAgIHZhciBzdHVmZiA9IFtdO1xuICAgICAgICB2YXIgb2JqID0ge307XG5cbiAgICAgICAgb2JqLm1vZGVsID0gaW5kT2JqZWN0O1xuICAgICAgICBzdHVmZi5wdXNoKG9iaik7XG5cbiAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0luZGljYXRvciB1cGRhdGVkLicsIHN0dWZmKTtcbiAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgIH0pO1xufTtcblxuZnVuY3Rpb24gbWFya1VwZGF0ZUluZGljYXRvcihhcmdzKSB7XG5cbiAgICB2YXIgX1dGSW5zdGFuY2UgPSBhcmdzWzBdIHx8IHt9O1xuXG4gICAgdmFyIHV1aWQgPSBhcmdzWzFdIHx8ICcnO1xuICAgIHZhciBzdGF0dXMgPSBhcmdzWzJdIHx8ICcnO1xuICAgIHZhciBpbmRpY2F0b3JTZXRJZCA9IGFyZ3NbM10gfHwgJyc7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgIHZhciBpbmRPYmplY3QgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbd29ya2Zsb3dzL3Byb2Nlc3Nlcy9zdWJQcm9jZXNzVVVJRCA9ICdcIiArIHV1aWQgKyBcIicgYW5kIGNhdGVnb3J5L3Rlcm0gPSAnXCIgKyBpbmRpY2F0b3JTZXRJZCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgaW5kT2JqZWN0Lm1vZGVsLnBlbmRpbmcuc3RhdHVzID0gc3RhdHVzO1xuICAgICAgICB2YXIgaXRlbXNUb1Byb2Nlc3MgPSAxO1xuICAgICAgICB2YXIgc3R1ZmYgPSBbXTtcbiAgICAgICAgdmFyIG9iaiA9IHt9O1xuICAgICAgICBvYmoubW9kZWwgPSBpbmRPYmplY3Q7XG4gICAgICAgIHN0dWZmLnB1c2gob2JqKTtcblxuICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnSW5kaWNhdG9yIHVwZGF0ZWQuJywgc3R1ZmYpO1xuICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgfSk7XG59O1xuXG5cbmZ1bmN0aW9uIHNldFN0YXR1cyhhcmdzKSB7XG5cblxuICAgIC8vIEN1cnJlbnRseSBzZXR0aW5nIHN0YXR1cyB0byBzdWJwcm9jZXNzIGluc3RhbmNlLiBpdCBzaG91bGQgdXBkYXRlIHNvbWUgZmllbGQgaW4gYXBwUHJvZmlsZSBvciB3aGF0ZXZlciBpbmRpY2F0b3IgdGhlIHByb2ZpbGUgaGFzLlxuICAgIHZhciBfV0ZJbnN0YW5jZSA9IGFyZ3NbMF0gfHwge307XG4gICAgdmFyIHV1aWQgPSBhcmdzWzFdIHx8ICcnO1xuICAgIHZhciBzdGF0dXMgPSBhcmdzWzJdIHx8ICcnO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICB2YXIgc3ViUHJvY2Vzc0luc3RhbmNlID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgIHN1YlByb2Nlc3NJbnN0YW5jZS5zdGVwLm1lc3NhZ2UgPSBzdGF0dXM7XG5cbiAgICAgICAgcmVzb2x2ZShcIlNldCBwcm9maWxlIHN0YXR1cyBTdWNjZXNzXCIsIHN1YlByb2Nlc3NJbnN0YW5jZSk7XG5cbiAgICB9KTtcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgICBjcmVhdGU6IGNyZWF0ZSxcbiAgICBzYXZlOiBzYXZlLFxuICAgIHN1Ym1pdDogc3VibWl0LFxuICAgIGF1dGhvcmlzZTogYXV0aG9yaXNlLFxuICAgIGNsb3NlOiBjbG9zZSxcbiAgICBzZXREcmFmdDogc2V0RHJhZnQsXG4gICAgc2V0VW5EcmFmdDogc2V0VW5EcmFmdCxcbiAgICBjcmVhdGVQcm9maWxlOiBjcmVhdGVQcm9maWxlLFxuICAgIHNldEluc3RhbmNlVGl0bGU6IHNldEluc3RhbmNlVGl0bGUsXG4gICAgZGVsZXRlUHJvZmlsZTogZGVsZXRlUHJvZmlsZSxcbiAgICB1cGRhdGVJbmRpY2F0b3I6IHVwZGF0ZUluZGljYXRvcixcbiAgICBtYXJrVXBkYXRlSW5kaWNhdG9yOiBtYXJrVXBkYXRlSW5kaWNhdG9yLFxuICAgIHVwZGF0ZUluZGljYXRvcldyYXBwZXI6IHVwZGF0ZUluZGljYXRvcldyYXBwZXJcblxufSIsIid1c2Ugc3RyaWN0JztcblxuXG5mdW5jdGlvbiBnZXRMYW5ndWFnZU1lc3NhZ2UobWVzc2FnZSkge1xuXG4gICAgdmFyIGxhbmd1YWdlID0gc2VydmljZS5nZXRMYW5ndWFnZSgpO1xuICAgIHZhciByZXMgPSBldmFsKFwibWVzc2FnZS5pMThuLlwiICsgbGFuZ3VhZ2UpO1xuICAgIHJldHVybiByZXM7XG5cbn07XG5cbmZ1bmN0aW9uIGdldE5vZGVWYWx1ZShkYXRhLCBfV0ZJbnN0YW5jZSwgdXVpZCkge1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgIGlmIChkYXRhLnZhbHVlICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICB2YXIgaW5wdXREYXRhVHlwZSA9ICdzdHJpbmcnO1xuXG4gICAgICAgICAgICBpZiAoZGF0YS52YWx1ZS5kYXRhdHlwZS5kYXRhVHlwZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpbnB1dERhdGFUeXBlID0gZGF0YS52YWx1ZS5kYXRhdHlwZS5kYXRhVHlwZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5wdXREYXRhVHlwZSA9IGRhdGEudmFsdWUuZGF0YXR5cGU7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgdmFyIGlucHV0VmFsdWUgPSBkYXRhLnZhbHVlLmRhdGE7XG5cbiAgICAgICAgICAgIGlmIChpbnB1dERhdGFUeXBlID09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShOdW1iZXIoaW5wdXRWYWx1ZSkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpbnB1dERhdGFUeXBlID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShpbnB1dFZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5wdXREYXRhVHlwZSA9PSAnaW50ZWdlcicpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHBhcnNlSW50KGlucHV0VmFsdWUpKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5wdXREYXRhVHlwZSA9PSAnZGVjaW1hbCcpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHBhcnNlRmxvYXQoaW5wdXRWYWx1ZSkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpbnB1dERhdGFUeXBlID09ICdkYXRlJyB8fCBpbnB1dERhdGFUeXBlID09ICdkYXRlVGltZScpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGlucHV0VmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBJbiBjYXNlIGRhdGEgdHlwZSBub3QgbWF0Y2hlZFxuICAgICAgICAgICAgICAgIHJlc29sdmUoaW5wdXRWYWx1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmIChkYXRhLmluZGljYXRvclVVSUQgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgIC8vIEEgY2hhbmdlIGlzIHJlcXVpcmVkIHRvIG1ha2Ugc3VyZSBwcm9wZXIgc2NvcGUgaXMgaWRlbnRpZmllZC5cbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JVVUlEID0gbnVsbDtcblxuICAgICAgICAgICAgdmFyIHN1YnByb2Nlc3MgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgIGlmIChzdWJwcm9jZXNzLmluZGljYXRvcnMubGVuZ3RoID09IDApIHtcblxuICAgICAgICAgICAgICAgIGluZGljYXRvclVVSUQgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnXCIgKyBkYXRhLmluZGljYXRvclVVSUQuaW5kaWNhdG9yU2V0SWQgKyBcIiddL19pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgaW5kaWNhdG9yVVVJRCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tpZCBlcSAnXCIgKyBkYXRhLmluZGljYXRvclVVSUQuaW5kaWNhdG9yU2V0SWQgKyBcIiddL2luc3RhbmNlcy91dWlkXCIsIHN1YnByb2Nlc3MsIHt9KVswXTtcbiAgICAgICAgICAgICAgICBpZiAoaW5kaWNhdG9yVVVJRCA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5kaWNhdG9yVVVJRCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdcIiArIGRhdGEuaW5kaWNhdG9yVVVJRC5pbmRpY2F0b3JTZXRJZCArIFwiJ10vX2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG5cblxuICAgICAgICAgICAgcmVzb2x2ZShpbmRpY2F0b3JVVUlEKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGRhdGEuaW5kaWNhdG9yICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICB2YXIgaW5kaWNhdG9yVVVJRCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pbmRpY2F0b3JzW2lkIGVxICdcIiArIGRhdGEuaW5kaWNhdG9yLmluZGljYXRvclNldElkICsgXCInXS9pbnN0YW5jZXMvdXVpZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgdmFyIGluZE9iamVjdCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tfaWQgZXEgJ1wiICsgaW5kaWNhdG9yVVVJRCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgIHZhciB4cGF0aCA9ICcvbW9kZWwvcGVuZGluZy9kYXRhLycgKyBkYXRhLmluZGljYXRvci5pbmRpY2F0b3JTZXRJZCArICcvJyArIGRhdGEuaW5kaWNhdG9yLmVsZW1lbnRJZDtcblxuICAgICAgICAgICAgdmFyIHNlcSA9IEpTT04ueHBhdGgoXCJjb3VudCgvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9wcmVjZWRpbmctc2libGluZzo6bm9kZSgpW2lkID0gL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaWRdKVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdICsgMTtcbiAgICAgICAgICAgIHZhciBzdWJwcm9jZXNzVHlwZSA9IEpTT04ueHBhdGgoXCIvY29uZmlnL3Byb2Nlc3Nlcy9zdWJQcm9jZXNzZXNbX2lkIGVxIC9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2lkXS90eXBlXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICB2YXIgcGFydCA9IGxpYnJhcnkuZ2V0U3VicHJvZmlsZVN1YnByb2Nlc3NJZHMoKTtcblxuICAgICAgICAgICAgaWYgKHN1YnByb2Nlc3NUeXBlID09IFBST0NFU1NfVFlQRV9TVUJQUk9GSUxFKSB7XG4gICAgICAgICAgICAgICAgc2VxID0gSlNPTi54cGF0aChcImNvdW50KC9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL3ByZWNlZGluZy1zaWJsaW5nOjpub2RlKClbaWQgPSAvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pZCBhbmQgX2lkID0gL3N1YnByb2Nlc3Nlc1tfaWQgPSBcIiArIHBhcnQgKyBcIl0vX2lkXSlcIiwgX1dGSW5zdGFuY2UsIHt9KVswXSArIDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciByZXBsYWNlZFBhdGggPSByZXBsYWNlQWxsKHhwYXRoLCAnI1NFUVVFTkNFIycsIHNlcSk7XG5cbiAgICAgICAgICAgIHZhciB2YWxpZERhdGUgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vZGF0ZXMvdmFsaWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgIHZhciBjb25jYXRWYWxpZERhdGUgPSBcIidcIiArIHZhbGlkRGF0ZSArIFwiJ1wiO1xuICAgICAgICAgICAgdmFyIG5ld1BhdGggPSByZXBsYWNlQWxsKHJlcGxhY2VkUGF0aCwgJyNFTkRfREFURSMnLCBjb25jYXRWYWxpZERhdGUpO1xuICAgICAgICAgICAgdmFyIGRvdFJlcGxhY2VkID0gcmVwbGFjZUFsbChuZXdQYXRoLCAnWy5dJywgJy8nKTtcbiAgICAgICAgICAgIHZhciByZXRWYWx1ZSA9IEpTT04ueHBhdGgoZG90UmVwbGFjZWQsIGluZE9iamVjdCwge30pWzBdO1xuXG4gICAgICAgICAgICByZXNvbHZlKHJldFZhbHVlKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGRhdGEuc3lzdGVtICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICByZXNvbHZlKFwiRVJST1I6IFVuaW1wbGVtZW50ZWQgc3lzdGVtIHR5cGUgZm91bmQuXCIpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS52YXJpYWJsZSAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBcbiAgICAgICAgICAgICAqIFRha2VuIG91dCBvZiBzY2hlbWFcbiAgICAgICAgICAgICAqIFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJQcm9jZXNzSW5zdGFuY2VcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCJ2YWx1ZSBvZiB0aGUgdmFyaWFibGUgc3ViUHJvY2Vzc0luc3RhbmNlIHZhcmlhYmxlIGN1cnJlbnQgc3VicHJvY2Vzc0luc3RhbmNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcInN0ZXBcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCJ2YWx1ZSBvZiB0aGUgdmFyaWFibGUgaW4gdGhlIGN1cnJlbnQgc3RlcFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJQcm9jZXNzSWRcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCJ2YWx1ZSBvZiB0aGUgY3VycmVudCBhcHBsaWNhaXRvbiBJRFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgKiBcbiAgICAgICAgICAgICAqIFxuICAgICAgICAgICAgICogXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmIChkYXRhLnZhcmlhYmxlLnByb2ZpbGUgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgdmFyaWFibGVOYW1lID0gZGF0YS52YXJpYWJsZS5wcm9maWxlO1xuXG4gICAgICAgICAgICAgICAgdmFyIHByb2ZpbGVJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XG4gICAgICAgICAgICAgICAgdmFyIHByb2ZpbGVWYXJpYWJsZUZpbGVOYW1lID0gcHJvZmlsZUlkICsgJzp2YXJpYWJsZXMnO1xuXG4gICAgICAgICAgICAgICAgZGFvLmdldChwcm9maWxlVmFyaWFibGVGaWxlTmFtZSkudGhlbihmdW5jdGlvbihmaWxlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIG9iaiA9IGV2YWwoJ2ZpbGUuJyArIHZhcmlhYmxlTmFtZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmogPT0gJ29iamVjdCcpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlcSA9IEpTT04ueHBhdGgoXCJjb3VudCgvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9wcmVjZWRpbmctc2libGluZzo6bm9kZSgpW2lkID0gL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaWRdKVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWJwcm9jZXNzVHlwZSA9IEpTT04ueHBhdGgoXCIvY29uZmlnL3Byb2Nlc3Nlcy9zdWJQcm9jZXNzZXNbX2lkIGVxIC9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2lkXS90eXBlXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFydCA9IGxpYnJhcnkuZ2V0U3VicHJvZmlsZVN1YnByb2Nlc3NJZHMoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1YnByb2Nlc3NUeXBlID09IFBST0NFU1NfVFlQRV9TVUJQUk9GSUxFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VxID0gSlNPTi54cGF0aChcImNvdW50KC9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL3ByZWNlZGluZy1zaWJsaW5nOjpub2RlKClbaWQgPSAvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pZCBhbmQgX2lkID0gL3N1YnByb2Nlc3Nlc1tfaWQgPSBcIiArIHBhcnQgKyBcIl0vX2lkXSlcIiwgX1dGSW5zdGFuY2UsIHt9KVswXSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZVBhdGggPSBcIi9cIiArIHZhcmlhYmxlTmFtZSArIFwiW1wiICsgc2VxICsgXCJdL3ZhbHVlXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmV0VmFsdWUgPSBKU09OLnhwYXRoKHZhbHVlUGF0aCwgZmlsZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXRWYWx1ZSk7XG5cblxuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9iaiA9PSAnc3RyaW5nJykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG9iaik7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcblxuICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJFUlJPUjogUHJvZmlsZSB2YXJpYWJsZXMgbm90IGZvdW5kXCIpO1xuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KFwiRVJST1I6IFVuaW1wbGVtZW50ZWQgcHJvZmlsZSB0eXBlIGZvdW5kLlwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKGRhdGEuaW5kaWNhdG9yV3JhcHBlciAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgdmFyIGluZGljYXRvclNldCA9IGRhdGEuaW5kaWNhdG9yV3JhcHBlci5pbmRpY2F0b3JTZXRJZDtcbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JVVUlEID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ1wiICsgaW5kaWNhdG9yU2V0ICsgXCInXS9pbnN0YW5jZXMvdXVpZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgdmFyIGluZE9iamVjdCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tfaWQgZXEgJ1wiICsgaW5kaWNhdG9yVVVJRCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgIHZhciBlbGVtZW50cGF0aCA9IHJlcGxhY2VBbGwoZGF0YS5pbmRpY2F0b3JXcmFwcGVyLnBhdGgsIFwiWy5dXCIsIFwiL1wiKVxuICAgICAgICAgICAgdmFyIHhwYXRoID0gJy8nICsgZWxlbWVudHBhdGhcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IEpTT04ueHBhdGgoeHBhdGgsIGluZE9iamVjdCwge30pWzBdO1xuICAgICAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChkYXRhLmNhbGN1bGF0ZWQgIT0gdW5kZWZpbmVkKSB7XG5cblxuICAgICAgICAgICAgdmFyIHZhbHVlID0gJyc7XG4gICAgICAgICAgICB2YXIgc2VwYXJhdG9yID0gZGF0YS5jYWxjdWxhdGVkLnNlcGFyYXRvcjtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmNhbGN1bGF0ZWQuZWxlbWVudHMubGVuZ3RoIC0gMTsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudHMgPSBkYXRhLmNhbGN1bGF0ZWQuZWxlbWVudHM7XG5cbiAgICAgICAgICAgICAgICB2YXIgcG9zc2libGVJdGVtcyA9IFtcImVsZW1lbnRQcm9wZXJ0eVwiLCBcImNvbnN0YW50VmFsdWVcIiwgXCJlbGVtZW50V3JhcHBlclwiLCBcImN1cnJlbnREYXRlXCIsIFwicmFuZG9tRGlnaXRzXCIsIFwicHJvZmlsZU9iamVjdEVsZW1lbnRcIiwgXCJwcm9maWxlT2JqZWN0V3JhcHBlclwiLCBcImN1cnJlbnRGaW5hbmNpYWxZZWFyXCJdO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAocHJvcGVydHlFeGlzdHMoZWxlbWVudHNbaV0sIHBvc3NpYmxlSXRlbXMpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZWxlbWVudFByb3BlcnR5JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3JTZXQgPSBlbGVtZW50c1tpXS5lbGVtZW50UHJvcGVydHkuaW5kaWNhdG9yU2V0SWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yVVVJRCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pbmRpY2F0b3JzW2lkIGVxICdcIiArIGluZGljYXRvclNldCArIFwiJ10vaW5zdGFuY2VzL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRPYmplY3QgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbX2lkIGVxICdcIiArIGluZGljYXRvclVVSUQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbWVudHBhdGggPSByZXBsYWNlQWxsKGVsZW1lbnRzW2ldLmVsZW1lbnRQcm9wZXJ0eS5lbGVtZW50SWQsIFwiWy5dXCIsIFwiL1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHhwYXRoID0gJy9tb2RlbC9wZW5kaW5nL2RhdGEvJyArIGluZGljYXRvclNldCArICcvJyArIGVsZW1lbnRwYXRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW1WYWx1ZSA9IEpTT04ueHBhdGgoeHBhdGgsIGluZE9iamVjdCwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSArIGl0ZW1WYWx1ZSArIHNlcGFyYXRvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnY29uc3RhbnRWYWx1ZSc6XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpdGVtVmFsdWUgPSBlbGVtZW50c1tpXS5jb25zdGFudFZhbHVlLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSArIGl0ZW1WYWx1ZSArIHNlcGFyYXRvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2VsZW1lbnRXcmFwcGVyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3JTZXQgPSBlbGVtZW50c1tpXS5lbGVtZW50V3JhcHBlci5pbmRpY2F0b3JTZXRJZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3JVVUlEID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ1wiICsgaW5kaWNhdG9yU2V0ICsgXCInXS9pbnN0YW5jZXMvdXVpZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZE9iamVjdCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tfaWQgZXEgJ1wiICsgaW5kaWNhdG9yVVVJRCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50cGF0aCA9IHJlcGxhY2VBbGwoZWxlbWVudHNbaV0uZWxlbWVudFdyYXBwZXIuZWxlbWVudElkLCBcIlsuXVwiLCBcIi9cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB4cGF0aCA9ICcvJyArIGVsZW1lbnRwYXRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW1WYWx1ZSA9IEpTT04ueHBhdGgoeHBhdGgsIGluZE9iamVjdCwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSArIGl0ZW1WYWx1ZSArIHNlcGFyYXRvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnY3VycmVudERhdGUnOlxuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlICsgZm9ybWF0RGF0ZShuZXcgRGF0ZSgpKSArIHNlcGFyYXRvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JhbmRvbURpZ2l0cyc6XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGlnaXRzID0gZWxlbWVudHNbaV0ucmFuZG9tRGlnaXRzLmRpZ2l0cztcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYW5kb20gPSBNYXRoLnJhbmRvbSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGV4cCA9IE1hdGgucG93KDEwLCBkaWdpdHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGludFBhcnQgPSAocmFuZG9tICogZXhwKSBeIDBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgKyBpbnRQYXJ0ICsgc2VwYXJhdG9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncHJvZmlsZU9iamVjdEVsZW1lbnQnOlxuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yU2V0ID0gZWxlbWVudHNbaV0ucHJvZmlsZU9iamVjdEVsZW1lbnQuaW5kaWNhdG9yU2V0SWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kT2JqZWN0ID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ2FwcFByb2ZpbGUnXVwiLCBhcHAuU0NPUEUud29ya2Zsb3csIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50cGF0aCA9IHJlcGxhY2VBbGwoZWxlbWVudHNbaV0ucHJvZmlsZU9iamVjdEVsZW1lbnQuZWxlbWVudElkLCBcIlsuXVwiLCBcIi9cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB4cGF0aCA9ICcvbW9kZWwvcGVuZGluZy9kYXRhLycgKyBpbmRpY2F0b3JTZXQgKyAnLycgKyBlbGVtZW50cGF0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpdGVtVmFsdWUgPSBKU09OLnhwYXRoKHhwYXRoLCBpbmRPYmplY3QsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgKyBpdGVtVmFsdWUgKyBzZXBhcmF0b3I7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlICdwcm9maWxlT2JqZWN0V3JhcHBlcic6XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3JTZXQgPSBlbGVtZW50c1tpXS5wcm9maWxlT2JqZWN0V3JhcHBlci5pbmRpY2F0b3JTZXRJZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRPYmplY3QgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnYXBwUHJvZmlsZSddXCIsIGFwcC5TQ09QRS53b3JrZmxvdywge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRwYXRoID0gcmVwbGFjZUFsbChlbGVtZW50c1tpXS5wcm9maWxlT2JqZWN0V3JhcHBlci53cmFwcGVyRWxlbWVudElkLCBcIlsuXVwiLCBcIi9cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB4cGF0aCA9ICcvJyArIGVsZW1lbnRwYXRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW1WYWx1ZSA9IEpTT04ueHBhdGgoeHBhdGgsIGluZE9iamVjdCwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSArIGl0ZW1WYWx1ZSArIHNlcGFyYXRvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdjdXJyZW50RmluYW5jaWFsWWVhcic6XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGFydERhdGUgPSBlbGVtZW50c1tpXS5jdXJyZW50RmluYW5jaWFsWWVhci5zdGFydERhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RhcnRNb250aCA9IGVsZW1lbnRzW2ldLmN1cnJlbnRGaW5hbmNpYWxZZWFyLnN0YXJ0TW9udGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmluYW5jaWFsWWVhciA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSArIFwiLVwiICsgc3RhcnRNb250aCArIFwiLVwiICsgc3RhcnREYXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSArIGZpbmFuY2lhbFllYXIgKyBzZXBhcmF0b3I7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJObyBtZXRob2QgZm91bmQgZnJvbSBpbXBsZW1lbnRlZCBsaXN0LlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgaSA9IGRhdGEuY2FsY3VsYXRlZC5lbGVtZW50cy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgdmFyIGVsZW1lbnRzID0gZGF0YS5jYWxjdWxhdGVkLmVsZW1lbnRzO1xuXG4gICAgICAgICAgICB2YXIgcG9zc2libGVJdGVtcyA9IFtcImVsZW1lbnRQcm9wZXJ0eVwiLCBcImNvbnN0YW50VmFsdWVcIiwgXCJlbGVtZW50V3JhcHBlclwiLCBcImN1cnJlbnREYXRlXCIsIFwicmFuZG9tRGlnaXRzXCIsIFwicHJvZmlsZU9iamVjdEVsZW1lbnRcIiwgXCJwcm9maWxlT2JqZWN0V3JhcHBlclwiLCBcImN1cnJlbnRGaW5hbmNpYWxZZWFyXCJdO1xuICAgICAgICAgICAgc3dpdGNoIChwcm9wZXJ0eUV4aXN0cyhlbGVtZW50c1tpXSwgcG9zc2libGVJdGVtcykpIHtcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2VsZW1lbnRQcm9wZXJ0eSc6XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3JTZXQgPSBlbGVtZW50c1tpXS5lbGVtZW50UHJvcGVydHkuaW5kaWNhdG9yU2V0SWQ7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3JVVUlEID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ1wiICsgaW5kaWNhdG9yU2V0ICsgXCInXS9pbnN0YW5jZXMvdXVpZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kT2JqZWN0ID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW19pZCBlcSAnXCIgKyBpbmRpY2F0b3JVVUlEICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbWVudHBhdGggPSByZXBsYWNlQWxsKGVsZW1lbnRzW2ldLmVsZW1lbnRQcm9wZXJ0eS5lbGVtZW50SWQsIFwiWy5dXCIsIFwiL1wiKVxuICAgICAgICAgICAgICAgICAgICB2YXIgeHBhdGggPSAnL21vZGVsL3BlbmRpbmcvZGF0YS8nICsgaW5kaWNhdG9yU2V0ICsgJy8nICsgZWxlbWVudHBhdGg7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtVmFsdWUgPSBKU09OLnhwYXRoKHhwYXRoLCBpbmRPYmplY3QsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSArIGl0ZW1WYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cblxuICAgICAgICAgICAgICAgIGNhc2UgJ2NvbnN0YW50VmFsdWUnOlxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtVmFsdWUgPSBlbGVtZW50c1tpXS5jb25zdGFudFZhbHVlLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlICsgaXRlbVZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2VsZW1lbnRXcmFwcGVyJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvclNldCA9IGVsZW1lbnRzW2ldLmVsZW1lbnRXcmFwcGVyLmluZGljYXRvclNldElkO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yVVVJRCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pbmRpY2F0b3JzW2lkIGVxICdcIiArIGluZGljYXRvclNldCArIFwiJ10vaW5zdGFuY2VzL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZE9iamVjdCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tfaWQgZXEgJ1wiICsgaW5kaWNhdG9yVVVJRCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRwYXRoID0gcmVwbGFjZUFsbChlbGVtZW50c1tpXS5lbGVtZW50V3JhcHBlci5lbGVtZW50SWQsIFwiWy5dXCIsIFwiL1wiKVxuICAgICAgICAgICAgICAgICAgICB2YXIgeHBhdGggPSAnLycgKyBlbGVtZW50cGF0aDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW1WYWx1ZSA9IEpTT04ueHBhdGgoeHBhdGgsIGluZE9iamVjdCwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlICsgaXRlbVZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuXG4gICAgICAgICAgICAgICAgY2FzZSAnY3VycmVudERhdGUnOlxuXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgKyBmb3JtYXREYXRlKG5ldyBEYXRlKCkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3JhbmRvbURpZ2l0cyc6XG4gICAgICAgICAgICAgICAgICAgIHZhciBkaWdpdHMgPSBlbGVtZW50c1tpXS5yYW5kb21EaWdpdHMuZGlnaXRzO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmFuZG9tID0gTWF0aC5yYW5kb20oKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV4cCA9IE1hdGgucG93KDEwLCBkaWdpdHMpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW50UGFydCA9IChyYW5kb20gKiBleHApIF4gMFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlICsgaW50UGFydDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdwcm9maWxlT2JqZWN0RWxlbWVudCc6XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvclNldCA9IGVsZW1lbnRzW2ldLnByb2ZpbGVPYmplY3RFbGVtZW50LmluZGljYXRvclNldElkO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kT2JqZWN0ID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ2FwcFByb2ZpbGUnXVwiLCBhcHAuU0NPUEUud29ya2Zsb3csIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRwYXRoID0gcmVwbGFjZUFsbChlbGVtZW50c1tpXS5wcm9maWxlT2JqZWN0RWxlbWVudC5lbGVtZW50SWQsIFwiWy5dXCIsIFwiL1wiKVxuICAgICAgICAgICAgICAgICAgICB2YXIgeHBhdGggPSAnL21vZGVsL3BlbmRpbmcvZGF0YS8nICsgaW5kaWNhdG9yU2V0ICsgJy8nICsgZWxlbWVudHBhdGg7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtVmFsdWUgPSBKU09OLnhwYXRoKHhwYXRoLCBpbmRPYmplY3QsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSArIGl0ZW1WYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdwcm9maWxlT2JqZWN0V3JhcHBlcic6XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvclNldCA9IGVsZW1lbnRzW2ldLnByb2ZpbGVPYmplY3RXcmFwcGVyLmluZGljYXRvclNldElkO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kT2JqZWN0ID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ2FwcFByb2ZpbGUnXVwiLCBhcHAuU0NPUEUud29ya2Zsb3csIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRwYXRoID0gcmVwbGFjZUFsbChlbGVtZW50c1tpXS5wcm9maWxlT2JqZWN0V3JhcHBlci53cmFwcGVyRWxlbWVudElkLCBcIlsuXVwiLCBcIi9cIilcbiAgICAgICAgICAgICAgICAgICAgdmFyIHhwYXRoID0gJy8nICsgZWxlbWVudHBhdGg7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtVmFsdWUgPSBKU09OLnhwYXRoKHhwYXRoLCBpbmRPYmplY3QsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSArIGl0ZW1WYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdjdXJyZW50RmluYW5jaWFsWWVhcic6XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXJ0RGF0ZSA9IGVsZW1lbnRzW2ldLmN1cnJlbnRGaW5hbmNpYWxZZWFyLnN0YXJ0RGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXJ0TW9udGggPSBlbGVtZW50c1tpXS5jdXJyZW50RmluYW5jaWFsWWVhci5zdGFydE1vbnRoO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZmluYW5jaWFsWWVhciA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSArIFwiLVwiICsgc3RhcnRNb250aCArIFwiLVwiICsgc3RhcnREYXRlO1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlICsgZmluYW5jaWFsWWVhcjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJObyBtZXRob2QgZm91bmQgZnJvbSBpbXBsZW1lbnRlZCBsaXN0LlwiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cblxuXG5cbiAgICAgICAgICAgIHJlc29sdmUodmFsdWUpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS5zdWJQcm9jZXNzICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWJQcm9jZXNzLnBhdGggIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgcGF0aCA9IGRhdGEuc3ViUHJvY2Vzcy5wYXRoO1xuICAgICAgICAgICAgICAgIHZhciBhcnIgPSBwYXRoLnNwbGl0KFwiLlwiKTtcbiAgICAgICAgICAgICAgICB2YXIgcGF0aEl0ZW1zID0gXCJcIjtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBwYXRoSXRlbXMgPSBwYXRoSXRlbXMgKyBcIlsnXCIgKyBhcnJbaV0gKyBcIiddXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBzdWJwcm9jZXNzID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gZXZhbChcInN1YnByb2Nlc3NcIiArIHBhdGhJdGVtcyk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh2YWx1ZSlcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLnN1YlByb2Nlc3Muc3RlcFVzZXIgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgIH1cblxuXG5cbiAgICAgICAgfVxuXG4gICAgfSk7XG5cblxuXG59O1xuXG5cbmZ1bmN0aW9uIHJlcGxhY2VBbGwodHh0LCByZXBsYWNlLCB3aXRoX3RoaXMpIHtcbiAgICBpZiAodHlwZW9mIHR4dC5yZXBsYWNlICE9ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY29uc29sZS5sb2cocmVwbGFjZSArICcgJyArIHdpdGhfdGhpcyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHR4dCk7XG4gICAgfVxuICAgIHJldHVybiB0eHQucmVwbGFjZShuZXcgUmVnRXhwKHJlcGxhY2UsICdnJyksIHdpdGhfdGhpcyk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdERhdGUoZGF0ZSkge1xuXG4gICAgdmFyIGRheSA9IGRhdGUuZ2V0RGF0ZSgpO1xuICAgIHZhciBtb250aEluZGV4ID0gZGF0ZS5nZXRNb250aCgpO1xuICAgIHZhciB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuXG4gICAgcmV0dXJuIGRheSArICctJyArIG1vbnRoSW5kZXggKyAnLScgKyB5ZWFyO1xufVxuXG5cbmZ1bmN0aW9uIGNvbXBhcmUoc3ViamVjdCwgb3BlcmF0b3IsIHZhbHVlKSB7XG4gICAgc3dpdGNoIChvcGVyYXRvcikge1xuICAgICAgICBjYXNlICc+JzpcbiAgICAgICAgICAgIHJldHVybiBzdWJqZWN0ID4gdmFsdWU7XG4gICAgICAgIGNhc2UgJzwnOlxuICAgICAgICAgICAgcmV0dXJuIHN1YmplY3QgPCB2YWx1ZTtcbiAgICAgICAgY2FzZSAnPj0nOlxuICAgICAgICAgICAgcmV0dXJuIHN1YmplY3QgPj0gdmFsdWU7XG4gICAgICAgIGNhc2UgJzw9JzpcbiAgICAgICAgICAgIHJldHVybiBzdWJqZWN0IDw9IHZhbHVlO1xuICAgICAgICBjYXNlICc9PSc6XG4gICAgICAgICAgICByZXR1cm4gc3ViamVjdCA9PSB2YWx1ZTtcbiAgICAgICAgY2FzZSAnIT0nOlxuICAgICAgICAgICAgcmV0dXJuIHN1YmplY3QgIT0gdmFsdWU7XG4gICAgfVxufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICAgIGdldExhbmd1YWdlTWVzc2FnZTogZ2V0TGFuZ3VhZ2VNZXNzYWdlLFxuICAgIGdldE5vZGVWYWx1ZTogZ2V0Tm9kZVZhbHVlLFxuICAgIGNvbXBhcmU6IGNvbXBhcmVcblxufSIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsaXR5Jyk7XG5cbi8qKlxuICogVXNlciBJbnRlcmZhY2UgTW9kdWxlXG4gKlxuICogQG1vZHVsZSBsaWIvdWlcbiAqIEBhdXRob3IgQnJlbnQgR29yZG9uXG4gKiBAdmVyc2lvbiAwLjEuMFxuICogQGRlc2NyaXB0aW9uIHRlc3QgZGVzY3JpcHRpb25cbiAqXG4gKi9cblxuIC8qKlxuICAqIEdldCBhbGwgcHJvY2VzcyBzdWItcHJvY2Vzc2VzIHVzZXIgaW50ZXJmYWNlIGRhdGFcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBwcm9jZXNzIGlkXG4gICogQHBhcmFtIHtzdHJpbmd9IGxhbmcgLSB0aGUgdXNlciBwcmVmZmVyZWQgbGFuZ2F1Z2VcbiAgKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxuICAqXG4gICogQGV4YW1wbGUgJydcbiAgKlxuICAqIEByZXR1cm4gJydcbiAgKlxuICAqL1xuIGZ1bmN0aW9uIGdldFByb2Nlc3MocHJvY2Vzc0lkLCBsYW5nLCBfV0ZJbnN0YW5jZSl7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICB0cnkge1xuICAgICAgdmFyIHByb2Nlc3NNb2RlbCA9IFtdO1xuICAgICAgdmFyIHByb2Nlc3NJbnN0YW5jZSA9IFtdO1xuICAgIFx0X1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihwcm9jZXNzSXRlbSl7XG4gICAgXHRcdGlmIChwcm9jZXNzSXRlbS5pZCA9PSBwcm9jZXNzSWQpIHtcbiAgICBcdFx0XHRwcm9jZXNzSW5zdGFuY2UgPSBwcm9jZXNzSXRlbTtcbiAgICBcdFx0fVxuICAgIFx0fSlcbiAgICAgIC8vIGNvbnNvbGUubG9nKHByb2Nlc3NJbnN0YW5jZS5zdWJQcm9jZXNzZXMubGVuZ3RoKTtcbiAgICAgIHV0aWwuc3luY0xvb3AocHJvY2Vzc0luc3RhbmNlLnN1YlByb2Nlc3Nlcy5sZW5ndGgsIGZ1bmN0aW9uKGxvb3Ape1xuICBcdFx0XHR2YXIgY291bnRlciA9IGxvb3AuaXRlcmF0aW9uKCk7XG4gICAgICAgIHZhciBwcm9jZXNzU2VxID0gcHJvY2Vzc0luc3RhbmNlLnNlcTtcbiAgICAgICAgdmFyIHN1YlByb2Nlc3NJZCA9IHByb2Nlc3NJbnN0YW5jZS5zdWJQcm9jZXNzZXNbY291bnRlcl0uaWQ7XG4gICAgICAgIHZhciBzdWJQcm9jZXNzU2VxID0gcHJvY2Vzc0luc3RhbmNlLnN1YlByb2Nlc3Nlc1tjb3VudGVyXS5zZXE7XG4gICAgICAgIGdldFN1YlByb2Nlc3MocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIGxhbmcsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKG1vZGVsKXtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhtb2RlbCk7XG4gICAgICAgICAgcHJvY2Vzc01vZGVsLnB1c2gobW9kZWwpO1xuICAgICAgICAgIGxvb3AubmV4dCgpO1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHByb2Nlc3NNb2RlbCk7XG4gIFx0XHRcdH0sIGZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2cocHJvY2Vzc01vZGVsKTtcbiAgXHRcdFx0XHRsb29wLmJyZWFrKCk7XG4gIFx0XHRcdFx0cmVqZWN0KGVycik7XG4gIFx0XHRcdH0pO1xuICBcdFx0fSwgZnVuY3Rpb24oKXtcbiAgICAgICAgLy8gY29uc29sZS5sb2cocHJvY2Vzc01vZGVsKTtcbiAgXHRcdFx0cmVzb2x2ZShwcm9jZXNzTW9kZWwpO1xuICBcdFx0fSk7XG4gICAgfSBjYXRjaChlcnIpe1xuICAgICAgcmVqZWN0KGVycik7XG4gICAgfVxuICB9KVxufTtcblxuIC8qKlxuICAqIEdldCBTdWJQcm9jZXNzIHVzZXIgaW50ZXJmYWNlIGRhdGFcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBwcm9jZXNzIGlkXG4gICogQHBhcmFtIHtudW1iZXJ9IHByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2UgcHJvY2VzcyBzZXFcbiAgKiBAcGFyYW0ge3N0cmluZ30gc3ViUHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3ViLXByb2Nlc3MgaWRcbiAgKiBAcGFyYW0ge251bWJlcn0gc3ViUHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBzdWItcHJvY2VzcyBzZXFcbiAgKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxuICAqXG4gICogQGV4YW1wbGUgJydcbiAgKlxuICAqIEByZXR1cm4gJydcbiAgKlxuICAqL1xuZnVuY3Rpb24gZ2V0U3ViUHJvY2Vzcyhwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgbGFuZywgX1dGSW5zdGFuY2Upe1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBtb2RlbCA9IHtcbiAgICAgICAgaWQ6ICcnLFxuICAgICAgICBzZXE6ICcnLFxuICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgaGVscDogJycsXG4gICAgICAgIGRhdGVzOiAnJyxcbiAgICAgICAgc3RlcDogJydcbiAgICAgIH07XG4gICAgICB2YXIgc3ViUHJvY2VzcyA9IFtdO1xuICAgIFx0dmFyIHN1YlByb2Nlc3NDb25mID0gW107XG4gICAgXHRfV0ZJbnN0YW5jZS5pbnN0YW5jZS5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHByb2Nlc3NJdGVtKXtcbiAgICBcdFx0aWYgKHByb2Nlc3NJdGVtLmlkID09IHByb2Nlc3NJZCAmJiBwcm9jZXNzSXRlbS5zZXEgPT0gcHJvY2Vzc1NlcSkge1xuICAgIFx0XHRcdHZhciBzcExlbmd0aCA9IHByb2Nlc3NJdGVtLnN1YlByb2Nlc3Nlcy5sZW5ndGg7XG4gICAgXHRcdFx0cHJvY2Vzc0l0ZW0uc3ViUHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihzdWJQcm9jZXNzSXRlbSl7XG4gICAgXHRcdFx0XHRpZiAoc3ViUHJvY2Vzc0l0ZW0uaWQgPT0gc3ViUHJvY2Vzc0lkICYmIHN1YlByb2Nlc3NJdGVtLnNlcSA9PSBzdWJQcm9jZXNzU2VxICYmIHN1YlByb2Nlc3NJdGVtLmNvbXBsZXRlID09IGZhbHNlKSB7XG4gICAgXHRcdFx0XHRcdHN1YlByb2Nlc3MgPSBzdWJQcm9jZXNzSXRlbTtcbiAgICBcdFx0XHRcdH1cbiAgICBcdFx0XHR9KVxuICAgIFx0XHR9XG4gICAgXHR9KVxuICAgIFx0Ly8gR2V0IHRoZSBjdXJyZW50IHN1YlByb2Nlc3MgY29uZmlndXJhdGlvblxuICAgIFx0X1dGSW5zdGFuY2UuY29uZmlnLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ocHJvY2Vzc0NvbmZpZyl7XG4gICAgXHRcdGlmIChwcm9jZXNzQ29uZmlnLl9pZCA9PSBwcm9jZXNzSWQpIHtcbiAgICBcdFx0XHRwcm9jZXNzQ29uZmlnLnN1YlByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24oc3ViUHJvY2Vzc0NvbmZpZyl7XG4gICAgXHRcdFx0XHRpZiAoc3ViUHJvY2Vzc0NvbmZpZy5faWQgPT0gc3ViUHJvY2Vzc0lkKSB7XG4gICAgXHRcdFx0XHRcdHN1YlByb2Nlc3NDb25mID0gc3ViUHJvY2Vzc0NvbmZpZztcbiAgICBcdFx0XHRcdH1cbiAgICBcdFx0XHR9KVxuICAgIFx0XHR9XG4gICAgXHR9KVxuICAgICAgLy8gVXBkYXRlIHRoZSBtb2RlbFxuICAgICAgbW9kZWwuaWQgPSBzdWJQcm9jZXNzQ29uZi5faWQ7XG4gICAgICBtb2RlbC5zZXEgPSBzdWJQcm9jZXNzLnNlcTtcbiAgICAgIG1vZGVsLm5hbWUgPSB1dGlsLmdldE5hbWUoc3ViUHJvY2Vzc0NvbmYubmFtZSwgbGFuZyk7XG4gICAgICBtb2RlbC5oZWxwID0gdXRpbC5nZXROYW1lKHN1YlByb2Nlc3NDb25mLmhlbHAsIGxhbmcpO1xuICAgICAgbW9kZWwuZGF0ZXMgPSBzdWJQcm9jZXNzLmRhdGVzO1xuICAgICAgbW9kZWwuc3RlcCA9IHN1YlByb2Nlc3Muc3RlcDtcbiAgICAgIHJlc29sdmUobW9kZWwpO1xuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICByZWplY3QoZXJyKTtcbiAgICB9XG4gIH0pXG59O1xuXG5cblxuXG5mdW5jdGlvbiBwcmVwYXJlTm90aWZpY2F0aW9uU2NyZWVuKCl7XG5cbiAgXCJcIlxufTtcblxuIG1vZHVsZS5leHBvcnRzID0ge1xuXG4gIGdldFByb2Nlc3M6IGdldFByb2Nlc3NcblxuIH1cbiIsIid1c2Ugc3RyaWN0JztcblxuXG5mdW5jdGlvbiBnZXQoKSB7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICB9KTtcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgICBnZXQ6IGdldFxuXG59IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWxpdHknKTtcbnZhciBhY3Rpb25zTW9kdWxlID0gcmVxdWlyZSgnLi9hY3Rpb25zJyk7XG52YXIgaGVscGVyID0gcmVxdWlyZSgnLi9oZWxwZXInKTtcbnZhciBmb3JtID0gcmVxdWlyZSgnLi9mb3JtJyk7XG5cbi8qKlxuICogUHJvY2VzcyBNb2R1bGVcbiAqXG4gKiBAbW9kdWxlIGxpYi9wcm9jZXNzXG4gKiBAYXV0aG9yIEhhc2FuIEFiYmFzXG4gKiBAdmVyc2lvbiAwLjIuMVxuICogQGRlc2NyaXB0aW9uIFdvcmtmbG93IGltcGxlbWVudGF0aW9uIGNoYW5nZWQgYXMgcGVyIG5ldyBzY2hlbWEgaW1wbGVtZW50YXRpb25cbiAqXG4gKi9cblxuLyoqXG4gKiBDb3VudCBhbiBhcnJheSBvZiBpdGVtc1xuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciAtIHRoZSBhcnJheSBkYXRhXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiBjb3VudChhcnIpIHtcbiAgICBpZiAoYXJyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGFyci5sZW5ndGg7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG59O1xuXG4vKipcbiAqIFByb2Nlc3MgcHJlLXJlcXVpc2l0ZXNcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gcHJlcmVxdWlzaXRlcyAtIHRoZSBwcmUtcmVxdWlzaXRlcyBjb25maWcgZGF0YVxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuZnVuY3Rpb24gcHJlUmVxdWlzaXRlcyhwcmVyZXF1aXNpdGVzLCBfV0ZJbnN0YW5jZSwgc3B1dWlkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAvLyBVbmNvbW1lbnQgYmVsb3cgc2VjdGlvbiB3aGVuIHJlYWR5IHRvIGltcGxlbWVudFxuICAgICAgICB2YXIgY29tcGxldGVkID0gW107XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB1dGlsLnN5bmNMb29wKHByZXJlcXVpc2l0ZXMubGVuZ3RoLCBmdW5jdGlvbihsb29wKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvdW50ZXIgPSBsb29wLml0ZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgIHByZVJlcXVpc2l0ZShwcmVyZXF1aXNpdGVzW2NvdW50ZXJdLCBfV0ZJbnN0YW5jZSwgc3B1dWlkKS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgYWxsIHByZS1yZXF1aXNpdGVzIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlZC5wdXNoKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBsb29wLm5leHQoKTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVkLnB1c2goZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBsb29wLmJyZWFrKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbXBsZXRlZC5ldmVyeShCb29sZWFuKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnUHJlLXJlcXVpc2l0ZXMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCB7fSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZQcmVSZXF1aXNpdGVFcnJvcicsICdOb3QgYWxsIHByZS1yZXF1aXNpdGVzIHBhc3NlZC4nKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG5cbiAgICB9KTtcbn07XG5cbi8qKlxuICogUHJvY2VzcyBwcmUtcmVxdWlzaXRlLCBleGVjdXRlIHRoZSBwcmUtcmVxdWlzaXRlIGNvbmRpdGlvbi5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gcHJlcmVxdWlzaXRlIC0gdGhlIHByZS1yZXF1aXNpdGUgY29uZmlnIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxuICpcbiAqIEBleGFtcGxlXG4gKiBQcm9jZXNzLnByZVJlcXVpc2l0ZShjb25maWcsIGNvdW50ZXIsIGluc3RhbmNlLCBkb2MpO1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cbmZ1bmN0aW9uIHByZVJlcXVpc2l0ZShwcmVyZXF1aXNpdGUsIF9XRkluc3RhbmNlLCBzcHV1aWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cblxuXG4gICAgICAgIGlmIChwcmVyZXF1aXNpdGUuY2hlY2subnVtYmVyUHJvY2Vzc0luc3RhbmNlcyAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgdmFyIG51bWJlclByb2Nlc3NJbnN0YW5jZXMgPSBwcmVyZXF1aXNpdGUuY2hlY2subnVtYmVyUHJvY2Vzc0luc3RhbmNlcztcbiAgICAgICAgICAgIHZhciBfZmlsdGVyT3BlcmF0b3IgPSBudW1iZXJQcm9jZXNzSW5zdGFuY2VzLm9wZXJhdG9yO1xuICAgICAgICAgICAgdmFyIHhwYXRoT3BlcmF0b3IgPSAnJztcbiAgICAgICAgICAgIHN3aXRjaCAoX2ZpbHRlck9wZXJhdG9yKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnZ3JlYXRlclRoYW4nOlxuICAgICAgICAgICAgICAgICAgICB4cGF0aE9wZXJhdG9yID0gJ2d0JztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbGVzc1RoYW4nOlxuICAgICAgICAgICAgICAgICAgICB4cGF0aE9wZXJhdG9yID0gJ2x0JztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZ3JlYXRlclRoYW5FcXVhbCc6XG4gICAgICAgICAgICAgICAgICAgIHhwYXRoT3BlcmF0b3IgPSAnZ2UnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdsZXNzVGhhbkVxdWFsJzpcbiAgICAgICAgICAgICAgICAgICAgeHBhdGhPcGVyYXRvciA9ICdsZSc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2VxdWFsVG8nOlxuICAgICAgICAgICAgICAgICAgICB4cGF0aE9wZXJhdG9yID0gJ2VxJztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbm90RXF1YWxUbyc6XG4gICAgICAgICAgICAgICAgICAgIHhwYXRoT3BlcmF0b3IgPSAnbmUnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIF9zdWJwcm9jZXNzSWQgPSBudW1iZXJQcm9jZXNzSW5zdGFuY2VzLnN1YlByb2Nlc3NJZDtcbiAgICAgICAgICAgIHZhciBfZmlsdGVyRWxlbWVudCA9IFwic3RlcC9zdGF0dXNcIjtcbiAgICAgICAgICAgIHZhciBfZmlsdGVyVmFsdWUgPSBudW1iZXJQcm9jZXNzSW5zdGFuY2VzLnR5cGU7XG4gICAgICAgICAgICB2YXIgaW5uZXJYcGF0aCA9IFwiL1wiICsgX2ZpbHRlckVsZW1lbnQgKyBcIlsuIGVxICdcIiArIF9maWx0ZXJWYWx1ZSArIFwiJ11cIjtcblxuICAgICAgICAgICAgdmFyIGZ1bGxQYXRoID0gXCJjb3VudCgvc3VicHJvY2Vzc2VzW2lkIGVxICdcIiArIF9zdWJwcm9jZXNzSWQgKyBcIiddXCIgKyBpbm5lclhwYXRoICsgXCIpXCI7XG5cbiAgICAgICAgICAgIHZhciBwcmVyZXFQcm9jZXNzVHlwZSA9IEpTT04ueHBhdGgoXCIvY29uZmlnL3Byb2Nlc3Nlcy9zdWJQcm9jZXNzZXNbX2lkIGVxICdcIiArIF9zdWJwcm9jZXNzSWQgKyBcIiddL3R5cGVcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgIHZhciBwYXJ0ID0gbGlicmFyeS5nZXRTdWJwcm9maWxlU3VicHJvY2Vzc0lkcygpO1xuXG4gICAgICAgICAgICBpZiAoYXBwLnByb2ZpbGUuc3VicHJvZmlsZUlkICE9IHVuZGVmaW5lZCAmJiBhcHAucHJvZmlsZS5zdWJwcm9maWxlSWQgIT0gJycgJiYgcHJlcmVxUHJvY2Vzc1R5cGUgIT0gdW5kZWZpbmVkICYmIHByZXJlcVByb2Nlc3NUeXBlID09IFBST0NFU1NfVFlQRV9TVUJQUk9GSUxFKSB7XG4gICAgICAgICAgICAgICAgZnVsbFBhdGggPSBcImNvdW50KC9zdWJwcm9jZXNzZXNbaWQgZXEgJ1wiICsgX3N1YnByb2Nlc3NJZCArIFwiJyBhbmQgX2lkID0gXCIgKyBwYXJ0ICsgXCJdXCIgKyBpbm5lclhwYXRoICsgXCIpXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBzdWJqZWN0Q291bnQgPSBKU09OLnhwYXRoKGZ1bGxQYXRoLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgdmFyIGNvdW50VmFsdWUgPSBwcmVyZXF1aXNpdGUuY2hlY2subnVtYmVyUHJvY2Vzc0luc3RhbmNlcy5jb3VudDtcbiAgICAgICAgICAgIHZhciBjb21wYXJlID0gdXRpbC5jb21wYXJlKHN1YmplY3RDb3VudCwgcHJlcmVxdWlzaXRlLmNoZWNrLm51bWJlclByb2Nlc3NJbnN0YW5jZXMub3BlcmF0b3IsIHBhcnNlSW50KGNvdW50VmFsdWUpKTtcblxuXG4gICAgICAgICAgICBpZiAoY29tcGFyZSkge1xuICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdQcmUtcmVxdWlzaXRlcyBwYXNzZWQuJywge30pO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBoZWxwZXIuZ2V0TGFuZ3VhZ2VNZXNzYWdlKHByZXJlcXVpc2l0ZS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRlByZVJlcXVpc2l0ZUVycm9yJywgbWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH0gZWxzZSBpZiAocHJlcmVxdWlzaXRlLmNoZWNrLnZhcmlhYmxlICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICB2YXIgc2NvcGUgPSBwcmVyZXF1aXNpdGUuY2hlY2sudmFyaWFibGUuc2NvcGU7XG4gICAgICAgICAgICB2YXIgZmlsZU5hbWUgPSAnJztcblxuICAgICAgICAgICAgaWYgKHNjb3BlID09IFwicHJvZmlsZVwiKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgcHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcbiAgICAgICAgICAgICAgICBmaWxlTmFtZSA9IHByb2ZpbGVJZCArICc6dmFyaWFibGVzJztcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChzY29wZSA9PSBcInN1YlByb2ZpbGVTdWJQcm9jZXNzSW5zdGFuY2VcIikge1xuXG4gICAgICAgICAgICAgICAgdmFyIHN1YlByb2ZpbGVJZCA9IGFwcC5wcm9maWxlLnN1YnByb2ZpbGVJZDtcbiAgICAgICAgICAgICAgICBmaWxlTmFtZSA9IHN1YlByb2ZpbGVJZCArICc6dmFyaWFibGVzJztcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWplY3QoXCJFUlJPUjogU2NvcGUgJ1wiICsgc2NvcGUgKyBcIicgbm90IGltcGxlbWVudGVkIGluIHByZS1yZXF1aXNpdGVzXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkYW8uZ2V0KGZpbGVOYW1lKS50aGVuKGZ1bmN0aW9uKGZpbGUpIHtcblxuICAgICAgICAgICAgICAgIHZhciB2YXJpYWJsZU5hbWUgPSBwcmVyZXF1aXNpdGUuY2hlY2sudmFyaWFibGUubmFtZTtcbiAgICAgICAgICAgICAgICB2YXIgb2JqID0gZXZhbCgnZmlsZS4nICsgdmFyaWFibGVOYW1lKTtcbiAgICAgICAgICAgICAgICB2YXIgc3ViamVjdFZhbHVlQ2FsY3VsYXRlZDtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqID09ICdvYmplY3QnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlcSA9IEpTT04ueHBhdGgoXCJjb3VudCgvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL3ByZWNlZGluZy1zaWJsaW5nOjpub2RlKClbaWQgPSAvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL2lkXSlcIiwgX1dGSW5zdGFuY2UsIHt9KVswXSArIDE7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWJwcm9jZXNzVHlwZSA9IEpTT04ueHBhdGgoXCIvY29uZmlnL3Byb2Nlc3Nlcy9zdWJQcm9jZXNzZXNbX2lkIGVxIC9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHNwdXVpZCArIFwiJ10vaWRdL3R5cGVcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcnQgPSBsaWJyYXJ5LmdldFN1YnByb2ZpbGVTdWJwcm9jZXNzSWRzKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdWJwcm9jZXNzVHlwZSA9PSBQUk9DRVNTX1RZUEVfU1VCUFJPRklMRSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VxID0gSlNPTi54cGF0aChcImNvdW50KC9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHNwdXVpZCArIFwiJ10vcHJlY2VkaW5nLXNpYmxpbmc6Om5vZGUoKVtpZCA9IC9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHNwdXVpZCArIFwiJ10vaWQgYW5kIF9pZCA9IC9zdWJwcm9jZXNzZXNbX2lkID0gXCIgKyBwYXJ0ICsgXCJdL19pZF0pXCIsIF9XRkluc3RhbmNlLCB7fSlbMF0gKyAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZVBhdGggPSBcIi9cIiArIHZhcmlhYmxlTmFtZSArIFwiW1wiICsgc2VxICsgXCJdL3ZhbHVlXCI7XG4gICAgICAgICAgICAgICAgICAgIHN1YmplY3RWYWx1ZUNhbGN1bGF0ZWQgPSBKU09OLnhwYXRoKHZhbHVlUGF0aCwgZmlsZSwge30pWzBdO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqID09ICdzdHJpbmcnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgc3ViamVjdFZhbHVlQ2FsY3VsYXRlZCA9IG9iajtcblxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgdmFyIGlucHV0VmFsdWUgPSBwcmVyZXF1aXNpdGUuY2hlY2sudmFyaWFibGUudmFsdWUuZGF0YTtcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXREYXRhVHlwZSA9IHByZXJlcXVpc2l0ZS5jaGVjay52YXJpYWJsZS52YWx1ZS5kYXRhVHlwZS5kYXRhVHlwZTtcblxuICAgICAgICAgICAgICAgIHZhciBmaW5hbFZhbHVlO1xuICAgICAgICAgICAgICAgIGlmIChpbnB1dERhdGFUeXBlID09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbmFsVmFsdWUgPSBOdW1iZXIoaW5wdXRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpbnB1dERhdGFUeXBlID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbmFsVmFsdWUgPSBpbnB1dFZhbHVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5wdXREYXRhVHlwZSA9PSAnaW50ZWdlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgZmluYWxWYWx1ZSA9IHBhcnNlSW50KGlucHV0VmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5wdXREYXRhVHlwZSA9PSAnZGVjaW1hbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgZmluYWxWYWx1ZSA9IHBhcnNlRmxvYXQoaW5wdXRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpbnB1dERhdGFUeXBlID09ICdkYXRlJyB8fCBpbnB1dERhdGFUeXBlID09ICdkYXRlVGltZScpIHtcbiAgICAgICAgICAgICAgICAgICAgZmluYWxWYWx1ZSA9IGlucHV0VmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIGNvbXBhcmUgPSB1dGlsLmNvbXBhcmUoc3ViamVjdFZhbHVlQ2FsY3VsYXRlZCwgcHJlcmVxdWlzaXRlLmNoZWNrLnZhcmlhYmxlLm9wZXJhdG9yLCBmaW5hbFZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAoY29tcGFyZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnVmFyaWFibGUgUHJlLXJlcXVpc2l0ZXMgcGFzc2VkLicsIHt9KTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gaGVscGVyLmdldExhbmd1YWdlTWVzc2FnZShwcmVyZXF1aXNpdGUubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGUHJlUmVxdWlzaXRlRXJyb3InLCBtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xuXG4gICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBoZWxwZXIuZ2V0TGFuZ3VhZ2VNZXNzYWdlKHByZXJlcXVpc2l0ZS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRlByZVJlcXVpc2l0ZUVycm9yOicsIG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGUHJlUmVxdWlzaXRlRXJyb3InLCAnUHJlLXJlcXVpc2l0ZSB0eXBlIG5vdCBkZWZpbmVkLicpO1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcblxuICAgICAgICB9XG5cblxuXG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFByb2Nlc3MgcHJlLWFjdGlvbnNzXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHByZUFjdGlvbnMgLSB0aGUgcHJlLWFjdGlvbnMgY29uZmlnIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiBwcmVBY3Rpb25zKHByZUFjdGlvbnMsIF9XRkluc3RhbmNlLCBzcHV1aWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciBjb21wbGV0ZWQgPSBbXTtcbiAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgdmFyIHNwT2JqZWN0ID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHNwdXVpZCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgIHZhciBwcm9jZXNzSUQgPSBzcE9iamVjdFtcIm1ldGEtZGF0YVwiXS5wcm9jZXNzQ29uZmlnSWQ7XG4gICAgICAgICAgICB2YXIgcHJvY2Vzc0lkID0gc3BPYmplY3RbXCJtZXRhLWRhdGFcIl0uc3ViUHJvY2Vzc0NvbmZpZ0lkO1xuICAgICAgICAgICAgdmFyIHByb2Nlc3NTRVEgPSBzcE9iamVjdFtcIm1ldGEtZGF0YVwiXS5zdWJQcm9jZXNzSW5zU2VxO1xuICAgICAgICAgICAgdmFyIHByb2Nlc3NTZXEgPSBzcE9iamVjdFtcIm1ldGEtZGF0YVwiXS5zdWJQcm9jZXNzSW5zU2VxO1xuXG4gICAgICAgICAgICB2YXIgc3ViUHJvY2Vzc0NvbmZpZ09iamVjdCA9IEpTT04ueHBhdGgoXCIvcHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBwcm9jZXNzSUQgKyBcIiddL3N1YlByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgcHJvY2Vzc0lkICsgXCInXVwiLCBfV0ZJbnN0YW5jZS5jb25maWcsIHt9KVswXTtcbiAgICAgICAgICAgIHZhciBzdGVwT2JqZWN0ID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHNwdXVpZCArIFwiJ10vc3RlcFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgdXRpbC5zeW5jTG9vcChwcmVBY3Rpb25zLmxlbmd0aCwgZnVuY3Rpb24obG9vcCkge1xuICAgICAgICAgICAgICAgIHZhciBjb3VudGVyID0gbG9vcC5pdGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICBhY3Rpb24ocHJlQWN0aW9uc1tjb3VudGVyXSwgcHJvY2Vzc0lELCBwcm9jZXNzU0VRLCBwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NDb25maWdPYmplY3QsIHN0ZXBPYmplY3QsIF9XRkluc3RhbmNlLCB7fSwgc3B1dWlkKS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgYWxsIHByZS1yZXF1aXNpdGVzIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlZC5wdXNoKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBsb29wLm5leHQoKTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVkLnB1c2goZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBsb29wLmJyZWFrKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbXBsZXRlZC5ldmVyeShCb29sZWFuKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnUHJlLWFjdGlvbnMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCB7fSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZQcmVSZXF1aXNpdGVFcnJvcicsICdOb3QgYWxsIHByZS1hY3Rpb25zIHBhc3NlZC4nKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG5cbiAgICB9KTtcbn07XG5cbi8qKlxuICogV29ya2Zsb3cgZ2V0IHN1Yi1wcm9jZXNzIGRhdGEuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGlkIC0gdGhlIHN1YlByb2Nlc3MgY29uZmlnIGlkXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxuICpcbiAqIEBleGFtcGxlIFwiXCJcbiAqXG4gKiBAcmV0dXJuIFwiXCJcbiAqXG4gKi9cbmZ1bmN0aW9uIGdldFN1YlByb2Nlc3MoaWQsIF9XRkluc3RhbmNlKSB7XG4gICAgaWYgKF9XRkluc3RhbmNlLnN1YnByb2Nlc3NlcyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24oc3ViUHJvY2Vzcykge1xuICAgICAgICAgICAgaWYgKHN1YlByb2Nlc3MuaWQgPT0gaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3ViUHJvY2VzcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcbiAgICB9XG5cbn07XG5cbi8qKlxuICogUHJvY2VzcyBzdWItcHJvY2Vzc1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBwcm9jZXNzIC0gdGhlIGN1cnJlbnQgcHJvY2VzcyBpZCBhbmQgc2VxXG4gKiBAcGFyYW0ge29iamVjdH0gc3ViUHJvY2VzcyAtIHRoZSBzdWItcHJvY2VzcyBpZCBhbmQgc2VxXG4gKiBAcGFyYW0ge29iamVjdH0gZGF0YSAtIHRoZSB1c2VyIGlucHV0IGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiBzdWJQcm9jZXNzKHV1aWQsIHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdWJwcm9maWxlSWQsIGRhdGEsIF9XRkluc3RhbmNlKSB7XG4gICAgLy8gR2V0IHRoZSBjdXJyZW50IHByb2Nlc3Mgc3ViUHJvY2VzcyBpbnN0YW5jZVxuICAgIC8vIHZhciBzdWJQcm9jZXNzU2VxID0gMTtcbiAgICB2YXIgc3ViUHJvY2VzcyA9IFtdO1xuICAgIHZhciBwcm9jZXNzQ29uZiA9IFtdO1xuICAgIHZhciBzdWJQcm9jZXNzQ29uZiA9IFtdO1xuICAgIFxuICAgIFxuICAgIC8vIF9XRkluc3RhbmNlLmluc3RhbmNlLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqUHJvY2Vzcykge1xuICAgIC8vICAgICBpZiAob2JqUHJvY2Vzcy5pZCA9PSBwcm9jZXNzSWQgJiYgb2JqUHJvY2Vzcy5zZXEgPT0gcHJvY2Vzc1NlcSkge1xuICAgIC8vICAgICAgICAgdmFyIHNwTGVuZ3RoID0gb2JqUHJvY2Vzcy5zdWJQcm9jZXNzZXMubGVuZ3RoO1xuICAgIC8vICAgICAgICAgb2JqUHJvY2Vzcy5zdWJQcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKG9ialN1YlByb2Nlc3MpIHtcbiAgICAvLyAgICAgICAgICAgICBpZiAob2JqU3ViUHJvY2Vzcy5pZCA9PSBzdWJQcm9jZXNzSWQgJiYgb2JqU3ViUHJvY2Vzcy5zZXEgPT0gc3ViUHJvY2Vzc1NlcSkge1xuICAgIC8vICAgICAgICAgICAgICAgICB2YXIgdXVpZCA9IG9ialN1YlByb2Nlc3MudXVpZDtcbiAgICAvLyAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihzdWJQcm9jZXNzSXRlbSkge1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgaWYgKHN1YlByb2Nlc3NJdGVtLl9pZCA9PSB1dWlkKSB7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2VzcyA9IHN1YlByb2Nlc3NJdGVtO1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgLy8gICAgICAgICAgICAgICAgIH0pXG4gICAgLy8gICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgfSk7XG4gICAgLy8gICAgIH1cblxuICAgIC8vIH0pO1xuXG4gICAgLy8gTk9URTogaW5jb21pbmcgdXVpZCB3aWxsIGJlIHVzZWQgaW4gY2FzZSBvZiBuZXcgc3VicHJvY2VzcyBjcmVhdGlvblxuICAgIF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24oc3ViUHJvY2Vzc0l0ZW0pIHtcbiAgICAgICAgaWYgKHN1YlByb2Nlc3NJdGVtLl9pZCA9PSB1dWlkKSB7XG4gICAgICAgICAgICBzdWJQcm9jZXNzID0gc3ViUHJvY2Vzc0l0ZW07XG4gICAgICAgIH1cbiAgICB9KTtcblxuXG5cblxuICAgIC8vIEdldCB0aGUgY3VycmVudCBzdWJQcm9jZXNzIGNvbmZpZ3VyYXRpb25cbiAgICBfV0ZJbnN0YW5jZS5jb25maWcucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihwcm9jZXNzQ29uZmlnKSB7XG4gICAgICAgIGlmIChwcm9jZXNzQ29uZmlnLl9pZCA9PSBwcm9jZXNzSWQpIHtcbiAgICAgICAgICAgIHByb2Nlc3NDb25mID0gcHJvY2Vzc0NvbmZpZztcbiAgICAgICAgICAgIHByb2Nlc3NDb25maWcuc3ViUHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihzdWJQcm9jZXNzQ29uZmlnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN1YlByb2Nlc3NDb25maWcuX2lkID09IHN1YlByb2Nlc3NJZCkge1xuICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzQ29uZiA9IHN1YlByb2Nlc3NDb25maWc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIC8vVE9ETzogQ2hhbmdlIHJlcXVpcmVkIHRvIG1vdmUgaXNBY3RpdmUgdG8gc3ViUHJvY2VzcyBmaWxlLkhlcmVcbiAgICB2YXIgZ3JvdXBLZXkgPSAnJztcbiAgICB2YXIgYmFzZVVVSUQgPSBkYXRhLmJhc2VVVUlEO1xuXG4gICAgaWYgKGJhc2VVVUlEICE9IHVuZGVmaW5lZCAmJiBiYXNlVVVJRCAhPSAnJyAmJiBiYXNlVVVJRC5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgdmFyIHByZXZpb3VzT2JqZWN0ID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIGJhc2VVVUlEICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICBncm91cEtleSA9IHByZXZpb3VzT2JqZWN0Lmdyb3VwS2V5O1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgICB2YXIgY2FyZEluZExpc3QgPSAnJztcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdWJQcm9jZXNzQ29uZi5pbmRpY2F0b3JzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgY2FyZEluZExpc3QgPSBjYXJkSW5kTGlzdCArIFwiJ1wiICsgc3ViUHJvY2Vzc0NvbmYuaW5kaWNhdG9yc1tpXS5faWQgKyBcIicsXCI7XG4gICAgICAgIH1cbiAgICAgICAgY2FyZEluZExpc3QgPSBjYXJkSW5kTGlzdCArIFwiJ1wiICsgc3ViUHJvY2Vzc0NvbmYuaW5kaWNhdG9yc1tpXS5faWQgKyBcIidcIjtcbiAgICAgICAgdmFyIHNpbmdsZUNhcmQgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbc2V0SWQgPSAoXCIgKyBjYXJkSW5kTGlzdCArIFwiKSBhbmQgY2FyZGluYWxpdHkgZXEgJ3NpbmdsZSddXCIsIGFwcC5TQ09QRS5BUFBfQ09ORklHLCB7fSkubGVuZ3RoO1xuXG4gICAgICAgIGlmIChzdWJQcm9jZXNzQ29uZi5pbnN0YW5jZVR5cGUubmV3U2VxdWVuY2UgIT0gdW5kZWZpbmVkIHx8IHNpbmdsZUNhcmQgPiAwKSB7XG4gICAgICAgICAgICB2YXIgcHJldmlvdXNPYmplY3QgPSBKU09OLnhwYXRoKFwiL2luc3RhbmNlL3Byb2Nlc3Nlc1tpZCBlcSAnXCIgKyBwcm9jZXNzSWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICBpZiAocHJldmlvdXNPYmplY3QgIT0gdW5kZWZpbmVkICYmIHByZXZpb3VzT2JqZWN0LnN1YlByb2Nlc3Nlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgZ3JvdXBLZXkgPSBwcmV2aW91c09iamVjdC5zdWJQcm9jZXNzZXNbMF0uZ3JvdXBLZXk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGdyb3VwS2V5ID0gZ2VuZXJhdGVVVUlEKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBncm91cEtleSA9IGdlbmVyYXRlVVVJRCgpO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgY291bnRTdWJwcm9jZXNzSW5Db250ZXh0ID0gSlNPTi54cGF0aChcImNvdW50KC9wcm9jZXNzZXMvc3ViUHJvY2Vzc2VzW2dyb3VwS2V5IGVxICdcIiArIGdyb3VwS2V5ICsgXCInXSlcIiwgX1dGSW5zdGFuY2UuaW5zdGFuY2UsIHt9KVswXTtcbiAgICB2YXIgbGFiZWwgPSBkYXRhLmxhYmVsO1xuICAgIHZhciBzdWJQcm9jZXNzT2JqZWN0SWQgPSB1dWlkO1xuXG5cblxuXG5cblxuICAgIHZhciBtb2RlbCA9IHtcbiAgICAgICAgX2lkOiBzdWJQcm9jZXNzT2JqZWN0SWQsXG4gICAgICAgIGlkOiBzdWJQcm9jZXNzSWQsXG4gICAgICAgIHR5cGU6ICd3b3JrZmxvd0luc3RhbmNlU3ViUHJvY2VzcycsXG4gICAgICAgIGRhdGVUaW1lQ3JlYXRlZDogbW9tZW50KCkuZm9ybWF0KCksXG4gICAgICAgIGR1ZURhdGVUaW1lOiBtb21lbnQoKS5mb3JtYXQoKSxcbiAgICAgICAgc2VxOiBzdWJQcm9jZXNzU2VxLFxuICAgICAgICBpbml0aWF0ZWQ6IGZhbHNlLFxuICAgICAgICBkYXRlczoge1xuICAgICAgICAgICAgY3JlYXRlZDogJycsXG4gICAgICAgICAgICB2YWxpZDogJycsXG4gICAgICAgICAgICBzdGFydDogJycsXG4gICAgICAgICAgICBkdWU6ICcnLFxuICAgICAgICAgICAgY2xvc2VkOiAnJ1xuICAgICAgICB9LFxuICAgICAgICBjb21wbGV0ZTogZmFsc2UsXG4gICAgICAgIGluZGljYXRvcnM6IFtdLFxuICAgICAgICBzdGVwOiB7fSxcbiAgICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgICBncm91cEtleTogZ3JvdXBLZXksXG4gICAgICAgIGxhYmVsOiBsYWJlbCxcbiAgICAgICAgY2hhbm5lbHM6IFtcbiAgICAgICAgICAgIFwiY29tbXVuaXR5X1wiICsgYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCksXG4gICAgICAgICAgICBcInByb2ZpbGVfXCIgKyBhcHAuU0NPUEUucHJvZmlsZUlkLFxuICAgICAgICAgICAgXCJhcHBsaWNhdGlvbl9cIiArIGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkLFxuICAgICAgICAgICAgXCJjb21tdW5pdHlfXCIgKyBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKSArIFwiX2FwcGxpY2F0aW9uX1wiICsgYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWRcbiAgICAgICAgXSxcbiAgICAgICAgaGlzdG9yeTogW10sXG4gICAgICAgIC8vbWV0YSBpbmZvcm1hdGlvbiBhZGRlZCBmb3Igc2VydmVyIHNpZGUgY29uZmxpY3QgbWFuYWdlbWVudCBhbmQgbWVyZ2VyXG4gICAgICAgIFwibWV0YS1kYXRhXCI6IHtcbiAgICAgICAgICAgIGFwcGxpY2F0aW9uSWQ6IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkLFxuICAgICAgICAgICAgY29tbXVuaXR5SWQ6IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpLFxuICAgICAgICAgICAgcHJvZmlsZUlkOiBhcHAuU0NPUEUucHJvZmlsZUlkLFxuICAgICAgICAgICAgc3VicHJvZmlsZUlkOiBzdWJwcm9maWxlSWQgPT0gdW5kZWZpbmVkID8gJycgOiBzdWJwcm9maWxlSWQsXG4gICAgICAgICAgICBwcm9jZXNzQ29uZmlnSWQ6IHByb2Nlc3NJZCxcbiAgICAgICAgICAgIHN1YlByb2Nlc3NDb25maWdJZDogc3ViUHJvY2Vzc0lkLFxuICAgICAgICAgICAgc3ViUHJvY2Vzc0luc1NlcTogY291bnRTdWJwcm9jZXNzSW5Db250ZXh0ICsgMVxuICAgICAgICB9LFxuICAgICAgICBtZXNzYWdlczogW10sXG4gICAgICAgIHNwU3RhdHVzOiAnJ1xuICAgIH07XG5cbiAgICBpZiAoYXBwLnByb2ZpbGUuc3VicHJvZmlsZUlkICE9IHVuZGVmaW5lZCAmJiBhcHAucHJvZmlsZS5zdWJwcm9maWxlSWQgIT0gXCJcIikge1xuICAgICAgICBtb2RlbC5jaGFubmVscy5wdXNoKFwicHJvZmlsZV9cIiArIGFwcC5TQ09QRS5wcm9maWxlSWQgKyBcIl9zdWJwcm9maWxlX1wiICsgYXBwLnByb2ZpbGUuc3VicHJvZmlsZUlkKTtcbiAgICAgICAgbW9kZWwuY2hhbm5lbHMucHVzaChcInN1YnByb2ZpbGVfXCIgKyBhcHAucHJvZmlsZS5zdWJwcm9maWxlSWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG1vZGVsLmNoYW5uZWxzLnB1c2goXCJwcm9maWxlX1wiICsgYXBwLlNDT1BFLnByb2ZpbGVJZCArIFwiX3N1YnByb2ZpbGVfXCIgKyAwKTtcbiAgICAgICAgbW9kZWwuY2hhbm5lbHMucHVzaChcInN1YnByb2ZpbGVfXCIgKyAwKTtcbiAgICB9XG5cbiAgICBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMucHVzaChtb2RlbCk7XG4gICAgLy8gUmV0dXJuIGEgcHJvbWlzZVxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgLy8gQ2F0Y2ggYWxsIHVuY2F1Z2h0IGVycm9yc1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gMS4gUHJvY2VzcyB0aGUgcHJlLWFjdGlvbnNcbiAgICAgICAgICAgIHZhciBwcmVBY3Rpb25zQ29uZiA9IHByb2Nlc3NDb25mLnByZUFjdGlvbnM7XG4gICAgICAgICAgICAvL2FjdGlvbihhY3Rpb25zW2NvdW50ZXJdLCBwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3ViUHJvY2Vzcywgc3RlcCwgX1dGSW5zdGFuY2UsIGRhdGEsIHV1aWQpXG4gICAgICAgICAgICBwcmVBY3Rpb25zKHByZUFjdGlvbnNDb25mLCBfV0ZJbnN0YW5jZSwgc3ViUHJvY2Vzc09iamVjdElkKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIC8vIDIuIFByb2Nlc3MgdGhlIHByZS1yZXF1aXNpdGVzXG4gICAgICAgICAgICAgICAgdmFyIHByZXJlcXVpc2l0ZUNvbmYgPSBwcm9jZXNzQ29uZi5wcmVyZXF1aXNpdGVzO1xuICAgICAgICAgICAgICAgIHByZVJlcXVpc2l0ZXMocHJlcmVxdWlzaXRlQ29uZiwgX1dGSW5zdGFuY2UsIHN1YlByb2Nlc3NPYmplY3RJZCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gMy4gSW5pdGlhdGUgdGhlIHN1YlByb2Nlc3NcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluaXRpYXRlQ29uZiA9IHN1YlByb2Nlc3NDb25mLmluaXRpYXRlO1xuICAgICAgICAgICAgICAgICAgICBpbml0aWF0ZShpbml0aWF0ZUNvbmYsIHN1YlByb2Nlc3MsIGRhdGEpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL1VwZGF0ZSB0aGUgc3ViUHJvY2VzcyBtb2RlbFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuaW5pdGlhdGVkID0gcmVzdWx0LmRhdGEuaW5pdGlhdGVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuZGF0ZXMgPSByZXN1bHQuZGF0YS5kYXRlcztcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEV4ZWN1dGUgdGhlIGZpcnN0IHN0ZXBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGVwSWQgPSBzdWJQcm9jZXNzQ29uZi5zdGVwc1swXS5faWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHJhbnNpdGlvbklkID0gc3ViUHJvY2Vzc0NvbmYuc3RlcHNbMF0udHJhbnNpdGlvblswXS5faWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RlcFNlcSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdGVwSWQsIHN0ZXBTZXEsIGRhdGEsIF9XRkluc3RhbmNlLCBzdWJQcm9jZXNzT2JqZWN0SWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3RlcCBleGVjdXRpb24gY29tcGxldGVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuc3RlcCA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRpY2F0b3JzKHN1YlByb2Nlc3NDb25mLmluZGljYXRvcnMsIF9XRkluc3RhbmNlLCBtb2RlbC5faWQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0MSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuaW5kaWNhdG9ycyA9IHJlc3VsdDEuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaW5kaWNhdG9ycyBmdW5jdGlvbiBleGVjdXRpb24gY29tcGxldGVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQxKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBFeGVjdXRlIHRoZSB0cmFuc2l0aW9ucywgaWYgYXV0b1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9TdWJwcm9jZXNzIHBvc3RBY3Rpb25zIHJlbW92ZWQgZnJvbSBoZXJlIGFzIHRoZXkgc2hvdWxkIGJlIGV4ZWN1dGVkIGF0IHRoZSBlbmQgb2YgdGhlIHN1YlByb2Nlc3MsIG1lYW5zIGF0IGxhc3Qgc3RlcCBhZnRlciB0cmFuc2l0aW9uLCBqdXN0IGJlZm9yZSBmaW5pc2guXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENhbiBhZGQgaGlzdG9yeSBvYmplY3QgaGVyZSBpbiBjYXNlIGZvciBmaXJzdCBzdGVwLCBpLmUgaW5pdGlhbGlzYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1vZGVsLmhpc3RvcnkucHVzaChyZXN1bHQuZGF0YSk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MocmVzdWx0MS5tZXNzYWdlLCBtb2RlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyID09ICcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhfV0ZJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHN1YlByb2Nlc3NPYmplY3RJZCk7XG5cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzID0gX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gIShvYmouX2lkID09IHN1YlByb2Nlc3NPYmplY3RJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMgPSBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEob2JqLl9pZCA9PSBzdWJQcm9jZXNzT2JqZWN0SWQpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLnN1YnByb2Nlc3NlcyA9IF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhKG9iai5faWQgPT0gc3ViUHJvY2Vzc09iamVjdElkKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cblxuICAgIH0pO1xufTtcblxuLyoqXG4gKiBQcm9jZXNzIGluaXRpYXRlXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGluaXRpYXRlIC0gdGhlIGluaXRpYXRlIGNvbmZpZyBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gZGF0YSAtIHRoZSB1c2VyIGlucHV0IGRhdGFcbiAqXG4gKiBAZXhhbXBsZSAnJ1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cbmZ1bmN0aW9uIGluaXRpYXRlKGluaXRpYXRlLCBzdWJQcm9jZXNzLCBkYXRhKSB7XG4gICAgdmFyIGNvbXBsZXRlZCA9IFtdO1xuICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgIGluaXRpYXRlZDogZmFsc2UsXG4gICAgICAgIGRhdGVzOiB7XG4gICAgICAgICAgICBjcmVhdGVkOiAnJyxcbiAgICAgICAgICAgIHZhbGlkOiAnJyxcbiAgICAgICAgICAgIHN0YXJ0OiAnJyxcbiAgICAgICAgICAgIGR1ZTogJycsXG4gICAgICAgICAgICBjbG9zZWQ6ICcnXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgIGlmIChpbml0aWF0ZS51c2VyICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5kYXRlcy5jcmVhdGVkID0gZGF0YS5jcmVhdGVkRGF0ZTtcbiAgICAgICAgICAgICAgICBpZiAoaW5pdGlhdGUudXNlci52YWxpZERhdGUuX3R5cGUgPT0gJ3VzZXJTZWxlY3RlZCcgfHwgaW5pdGlhdGUudXNlci52YWxpZERhdGUuX3R5cGUgPT0gJ2F1dG9TZWxlY3RlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEudmFsaWREYXRlICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmRhdGVzLnZhbGlkID0gZGF0YS52YWxpZERhdGU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZGF0ZXMudmFsaWQgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3Vic3RyaW5nKDAsIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGluaXRpYXRlLnVzZXIuZHVlRGF0ZS5fdHlwZSA9PSAndXNlclNlbGVjdGVkJyB8fCBpbml0aWF0ZS51c2VyLmR1ZURhdGUuX3R5cGUgPT0gJ2F1dG9TZWxlY3RlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuZHVlRGF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZGF0ZXMuZHVlID0gZGF0YS5kdWVEYXRlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC53YXJuKCdXRkluaXRpYXRlRXJyb3InLCAnTm8gZHVlIGRhdGUgcGFzc2VkIGluIC0ge2RhdGEuZHVlRGF0ZX0nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVzdWx0LmRhdGVzLnN0YXJ0ID0gZGF0YS5maXJzdERhdGU7XG5cblxuXG4gICAgICAgICAgICAgICAgcmVzdWx0LmluaXRpYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1N1Yi1Qcm9jZXNzIGluaXRpYXRlIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGluaXRpYXRlLmF1dG8gIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgIHJlc3VsdC5kYXRlcy5jcmVhdGVkID0gZGF0YS5jcmVhdGVkRGF0ZTtcblxuICAgICAgICAgICAgICAgIGlmIChpbml0aWF0ZS5kYXRlcy52YWxpZC5fdHlwZSA9PSAndXNlclNlbGVjdGVkJyB8fCBpbml0aWF0ZS5kYXRlcy52YWxpZC5fdHlwZSA9PSAnYXV0b1NlbGVjdGVkJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS52YWxpZERhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmRhdGVzLnZhbGlkID0gZGF0YS52YWxpZERhdGU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlsLndhcm4oJ1dGSW5pdGlhdGVFcnJvcicsICdObyB2YWxpZCBkYXRlIHBhc3NlZCBpbiAtIHtkYXRhLnZhbGlkRGF0ZX0nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGluaXRpYXRlLmRhdGVzLmR1ZS5fdHlwZSA9PSAndXNlclNlbGVjdGVkJyB8fCBpbml0aWF0ZS5kYXRlcy5kdWUuX3R5cGUgPT0gJ2F1dG9TZWxlY3RlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuZHVlRGF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZGF0ZXMuZHVlID0gZGF0YS5kdWVEYXRlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC53YXJuKCdXRkluaXRpYXRlRXJyb3InLCAnTm8gZHVlIGRhdGUgcGFzc2VkIGluIC0ge2RhdGEuZHVlRGF0ZX0nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVzdWx0LmluaXRpYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1N1Yi1Qcm9jZXNzIGluaXRpYXRlIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpOyovXG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRkluaXRpYXRlRXJyb3InLCAnSW5pdGlhdGUgdHlwZTogJyArIGluaXRpYXRlLl90eXBlICsgJyBub3QgZGVmaW5lZC4nKTtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdWJQcm9jZXNzLmNvbXBsZXRlID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaW5pdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKCFzdWJQcm9jZXNzLmNvbXBsZXRlKSB7XG4gICAgICAgICAgICBpZiAoaW5pdGlhdGUucGFyYWxsZWxJbnN0YW5jZXMpIHtcbiAgICAgICAgICAgICAgICBpbml0KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGSW5pdGlhdGVFcnJvcicsICdTdWItcHJvY2VzczogJyArIHN1YlByb2Nlc3MuaWQgKyAnIHN0aWxsIGFjdGl2ZSBhbmQgcGFyYWxsZWwgaW5zdGFuY2VzIGFyZSBub3QgYWxsb3dlZC4nKTtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH0pO1xufTtcblxuLyoqXG4gKiBQcm9jZXNzIHN0ZXBcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIGN1cnJlbnQgcHJvY2VzcyBpZFxuICogQHBhcmFtIHtzdHJpbmd9IHN1YlByb2Nlc3NJZCAtIHRoZSBjdXJyZW50IHN1Yi1wcm9jZXNzIGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RlcElkIC0gdGhlIGN1cnJlbnQgc3ViLXByb2Nlc3Mgc3RlcCBpZFxuICogQHBhcmFtIHtudW1iZXJ9IHN0ZXBTZXEgLSB0aGUgY3VycmVudCBzdWItcHJvY2VzcyBzdGVwIGluc3RhbmNlIGNvdW50ZXIgLyBzZXF1ZW5jZVxuICogQHBhcmFtIHtvYmplY3R9IGRhdGEgLSB0aGUgdXNlciBpbnB1dCBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCBfV0ZJbnN0YW5jZSBjb25zdHJ1Y3RvciBpbnN0YW5jZVxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuZnVuY3Rpb24gc3RlcChwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3RlcElkLCBzdGVwU2VxLCBkYXRhLCBfV0ZJbnN0YW5jZSwgc3B1dWlkKSB7XG5cbiAgICAvLyBEZWZhdWx0IHN0ZXAgbW9kZWxcbiAgICB2YXIgbW9kZWwgPSB7XG4gICAgICAgIGtleTogZ2VuZXJhdGVVVUlEKCksXG4gICAgICAgIGlkOiAnJyxcbiAgICAgICAgc2VxOiAnJyxcbiAgICAgICAgc3RhdHVzOiAnJyxcbiAgICAgICAgbWVzc2FnZTogJycsXG4gICAgICAgIGFzc2lnbmVkVG86IHtcbiAgICAgICAgICAgIHVzZXJJZDogJycsXG4gICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgIGRhdGVUaW1lOiAnJyxcbiAgICAgICAgICAgIHR5cGU6ICcnLFxuICAgICAgICAgICAgZHVlRGF0ZVRpbWU6ICcnLFxuICAgICAgICAgICAgYnk6ICcnXG4gICAgICAgIH0sXG4gICAgICAgIGFzc2lnbm1lbnRIaXN0b3J5OiBbXSxcbiAgICAgICAgZGF0ZVRpbWVDcmVhdGVkOiBtb21lbnQoKS5mb3JtYXQoKSxcbiAgICAgICAgZHVlRGF0ZVRpbWU6IG1vbWVudCgpLmZvcm1hdCgpLFxuICAgICAgICB0cmFuc2l0aW9uOiB7XG4gICAgICAgICAgICB0cmFuc2l0aW9uSWQ6ICcnLFxuICAgICAgICAgICAgZGF0ZVRpbWU6ICcnLFxuICAgICAgICAgICAgdXNlcklkOiAnJ1xuICAgICAgICB9LFxuICAgICAgICBhc3NpZ25tZW50OiB7fSxcbiAgICAgICAgY29tbWVudDogJydcbiAgICB9O1xuXG4gICAgdmFyIHN1YlByb2Nlc3MgPSB7fTtcblxuICAgIHZhciB1dWlkID0gJyc7XG4gICAgdmFyIGluc3RTdWJQcm9jZXNzO1xuICAgIHZhciBzdGVwID0ge307XG5cbiAgICB2YXIgdHJhbnNpdGlvbklkID0gJyc7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy9HZXQgdGhlIGN1cnJlbnQgc3ViUHJvY2VzcyBpbnN0YW5jZSBkYXRhXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIF9XRkluc3RhbmNlLmluc3RhbmNlLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqUHJvY2Vzcykge1xuICAgICAgICAgICAgLy8gICAgIGlmIChvYmpQcm9jZXNzLmlkID09IHByb2Nlc3NJZCAmJiBvYmpQcm9jZXNzLnNlcSA9PSBwcm9jZXNzU2VxKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgIG9ialByb2Nlc3Muc3ViUHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmpTdWJQcm9jZXNzKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBpZiAob2JqU3ViUHJvY2Vzcy5pZCA9PSBzdWJQcm9jZXNzSWQgJiYgb2JqU3ViUHJvY2Vzcy5zZXEgPT0gc3ViUHJvY2Vzc1NlcSkge1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIHV1aWQgPSBvYmpTdWJQcm9jZXNzLnV1aWQ7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyAgICAgICAgIH0pXG4gICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgLy8gfSk7XG5cbiAgICAgICAgICAgIF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24oc3ViUHJvY2Vzc0l0ZW0pIHtcbiAgICAgICAgICAgICAgICBpZiAoc3ViUHJvY2Vzc0l0ZW0uX2lkID09IGFwcC5TQ09QRS5wcm9jZXNzVVVJRCkge1xuICAgICAgICAgICAgICAgICAgICBpbnN0U3ViUHJvY2VzcyA9IHN1YlByb2Nlc3NJdGVtO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF9XRkluc3RhbmNlLmNvbmZpZy5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKG9ialByb2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBpZiAob2JqUHJvY2Vzcy5faWQgPT0gcHJvY2Vzc0lkKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ialByb2Nlc3Muc3ViUHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmpTdWJQcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqU3ViUHJvY2Vzcy5faWQgPT0gc3ViUHJvY2Vzc0lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2VzcyA9IG9ialN1YlByb2Nlc3M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqU3ViUHJvY2Vzcy5zdGVwcy5maWx0ZXIoZnVuY3Rpb24ob2JqU3RlcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqU3RlcC5faWQgPT0gc3RlcElkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwID0gb2JqU3RlcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIHN1Yi1wcm9jZXNzIHN0ZXAgZGF0YVxuICAgICAgICAgICAgbW9kZWwuaWQgPSBzdGVwSWQ7XG4gICAgICAgICAgICBtb2RlbC5zZXEgPSBzdGVwU2VxO1xuXG4gICAgICAgICAgICB2YXIgaW5zdGFuY2VTdGF0dXMgPSAnJztcbiAgICAgICAgICAgIGlmIChzdGVwLnNldEluc3RhbmNlU3RhdHVzVG8uTm90U3RhcnRlZCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVN0YXR1cyA9IFwiTm90U3RhcnRlZFwiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGVwLnNldEluc3RhbmNlU3RhdHVzVG8uQ3JlYXRlZCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVN0YXR1cyA9IFwiQ3JlYXRlZFwiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGVwLnNldEluc3RhbmNlU3RhdHVzVG8uSW5Qcm9ncmVzcyAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVN0YXR1cyA9IFwiSW5Qcm9ncmVzc1wiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGVwLnNldEluc3RhbmNlU3RhdHVzVG8uU3VibWl0dGVkICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlU3RhdHVzID0gXCJTdWJtaXR0ZWRcIjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RlcC5zZXRJbnN0YW5jZVN0YXR1c1RvLkNvbXBsZXRlICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlU3RhdHVzID0gXCJDb21wbGV0ZVwiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgbGFuZ3VhZ2UgPSBzZXJ2aWNlLmdldExhbmd1YWdlKCk7XG5cbiAgICAgICAgICAgIG1vZGVsLnN0YXR1cyA9IGluc3RhbmNlU3RhdHVzO1xuICAgICAgICAgICAgbW9kZWwubWVzc2FnZSA9IGV2YWwoXCJzdGVwLnNldEluc3RhbmNlU3RhdHVzVG8uXCIgKyBpbnN0YW5jZVN0YXR1cyArIFwiLmxhYmVsLmkxOG4uXCIgKyBsYW5ndWFnZSk7XG4gICAgICAgICAgICBtb2RlbC5jb21tZW50ID0gZGF0YS5jb21tZW50ICE9PSB1bmRlZmluZWQgPyBkYXRhLmNvbW1lbnQgOiAnJztcbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JzID0gaW5zdFN1YlByb2Nlc3MgIT09IHVuZGVmaW5lZCA/IGluc3RTdWJQcm9jZXNzLmluZGljYXRvcnMgOiBbXTtcblxuICAgICAgICAgICAgdmFyIHVwZGF0ZVNQSW5kaWNhdG9yT2JqZWN0ID0gZnVuY3Rpb24oaW5kaWNhdG9ycywgX1dGSW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5kaWNhdG9ycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5kaWNhdG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvck9iamVjdCA9IGluZGljYXRvcnNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdXVpZCA9IGluZGljYXRvck9iamVjdC5pbnN0YW5jZXNbMF0udXVpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1cGRhdGVkU2VxID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9tb2RlbC9wZW5kaW5nL3NlcVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kaWNhdG9yT2JqZWN0Lmluc3RhbmNlc1swXS5zZXEgPSB1cGRhdGVkU2VxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciBjbGVhclNQU3RhdHVzID0gZnVuY3Rpb24oc3B1dWlkKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9iaiA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgb2JqLnNwU3RhdHVzID0gXCJcIjtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGluZGljYXRvckRvY3MocHJvY2Vzc0lkLCBpbmRpY2F0b3JzLCBtb2RlbCwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgdXVpZCA9IHNwdXVpZDtcblxuICAgICAgICAgICAgICAgIGlmIChzdGVwLmZ1bmN0aW9uLmFjdGlvbnMgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbnMoc3RlcC5mdW5jdGlvbi5hY3Rpb25zLCBwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3ViUHJvY2VzcywgbW9kZWwsIF9XRkluc3RhbmNlLCBkYXRhLCBzcHV1aWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXNzaWduZWUgPSBtb2RlbC5hc3NpZ25lZFRvO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduZWUubmFtZSA9IExPQ0FMX1NFVFRJTkdTLlNFU1NJT04uZmlyc3ROYW1lICsgXCIgXCIgKyBMT0NBTF9TRVRUSU5HUy5TRVNTSU9OLmxhc3ROYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVlLnVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkICsgXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25lZS5kYXRlVGltZSA9IG1vbWVudCgpLmZvcm1hdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVlLnR5cGUgPSBBU1NJR05NRU5UX1RZUEVfQVVUTztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25lZS5kdWVEYXRlVGltZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVlLmJ5ID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQgKyBcIlwiO1xuXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVNQSW5kaWNhdG9yT2JqZWN0KGluZGljYXRvcnMsIF9XRkluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHJhbnNpdGlvbklkID0gc3RlcC50cmFuc2l0aW9uWzBdLl9pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdGVwSWQsIHRyYW5zaXRpb25JZCwgZGF0YSwgX1dGSW5zdGFuY2UsIHNwdXVpZCwgbW9kZWwpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdUcmFuc2l0aW9uIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywgcmVzdWx0LmRhdGEuc3RlcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2VyciBmcm9tIGFjdGlvbnMoKScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdGVwLmZ1bmN0aW9uLnRhc2sgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE1ha2UgYXNzaWdubWVudHNcbiAgICAgICAgICAgICAgICAgICAgdGFzayhwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN0ZXAuZnVuY3Rpb24udGFzaywgc3B1dWlkLCBtb2RlbCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlU1BJbmRpY2F0b3JPYmplY3QoaW5kaWNhdG9ycywgX1dGSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1Rhc2sgYXdhaXRpbmcgdXNlciBhY3Rpb24uJywgbW9kZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0ZXAuZnVuY3Rpb24uc2VydmVyICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBNYWtlIGFzc2lnbm1lbnRzXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyU1BTdGF0dXMoc3B1dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyKHN0ZXAuZnVuY3Rpb24uc2VydmVyLCBwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3ViUHJvY2VzcywgbW9kZWwsIF9XRkluc3RhbmNlLCBkYXRhLCBzcHV1aWQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVNQSW5kaWNhdG9yT2JqZWN0KGluZGljYXRvcnMsIF9XRkluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdTZXJ2ZXIgYXdhaXRpbmcgc2VydmVyIHJlc3BvbnNlLicsIG1vZGVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFByb2Nlc3MgaW5kaWNhdG9yIHVwZGF0ZXNcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gYWN0aW9ucyAtIHRoZSBhY3Rpb25zIGNvbmZpZyBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gc3ViUHJvY2VzcyAtIHRoZSBjdXJyZW50IHN1Yi1wcm9jZXNzIGZvcm0gY29uZmlnIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiBpbmRpY2F0b3JzKGluZGljYXRvcnMsIF9XRkluc3RhbmNlLCBzcHV1aWQpIHtcbiAgICB2YXIgbW9kZWwgPSBbXTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgYXJyYXkgPSBKU09OLnhwYXRoKFwiaW5kaWNhdG9yc1tmbjpjb3VudCguL3dvcmtmbG93cy9wcm9jZXNzZXNbc3ViUHJvY2Vzc1VVSUQgZXEgJ1wiICsgc3B1dWlkICsgXCInXSkgZ3QgMF1cIiwgX1dGSW5zdGFuY2UsIHt9KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaW5kaWNhdG9yIGZ1bmN0aW9uXCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYXJyYXkpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGFycmF5Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluZGljYXRvciA9IGFycmF5W2pdO1xuICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3JNb2RlbCA9IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICcnLFxuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZXM6IFtdXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIGluc3RhbmNlTW9kZWwgPSB7XG4gICAgICAgICAgICAgICAgICAgIHV1aWQ6ICcnLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJycsXG4gICAgICAgICAgICAgICAgICAgIGtleTogJycsXG4gICAgICAgICAgICAgICAgICAgIHNlcTogMSxcbiAgICAgICAgICAgICAgICAgICAgcmV2OiAnJ1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGluZGljYXRvck1vZGVsLmlkID0gaW5kaWNhdG9yLmNhdGVnb3J5LnRlcm07XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VNb2RlbC51dWlkID0gaW5kaWNhdG9yLl9pZDtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZU1vZGVsLnJldiA9IGluZGljYXRvci5fcmV2O1xuICAgICAgICAgICAgICAgIGluc3RhbmNlTW9kZWwudGl0bGUgPSBpbmRpY2F0b3IudGl0bGU7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VNb2RlbC5rZXkgPSAnJztcbiAgICAgICAgICAgICAgICBpbnN0YW5jZU1vZGVsLnNlcSA9IGluZGljYXRvci5tb2RlbC5wZW5kaW5nLnNlcTsgLy8gaW5kaWNhdG9yIHNlcSBudW1iZXIgaGVyZSB3aGljaCBpcyBnZXR0aW5nIHVwZGF0ZWQuXG4gICAgICAgICAgICAgICAgaW5kaWNhdG9yTW9kZWwuaW5zdGFuY2VzLnB1c2goaW5zdGFuY2VNb2RlbCk7XG4gICAgICAgICAgICAgICAgbW9kZWwucHVzaChpbmRpY2F0b3JNb2RlbCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdQcm9jZXNzIGluZGljYXRvciBtb2RlbCB1cGRhdGVkLicsIG1vZGVsKTtcbiAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cblxuICAgIH0pXG59O1xuXG4vKipcbiAqIFByb2Nlc3MgYXNzaWduIHVzZXJcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gcHJvY2VzcyBpZFxuICogQHBhcmFtIHtudW1iZXJ9IHByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2UgcHJvY2VzcyBzZXFcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdWJQcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdWItcHJvY2VzcyBpZFxuICogQHBhcmFtIHtudW1iZXJ9IHN1YlByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2Ugc3ViLXByb2Nlc3Mgc2VxXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RlcElkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3RlcCBpZFxuICogQHBhcmFtIHtzdHJpbmd9IHRyYW5zaXRpb25JZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHRyYW5zaXRpb24gaWRcbiAqIEBwYXJhbSB7b2JqZWN0fSB1c2VyIC0gdGhlIHVzZXIgdG8gYXNzaWduIHRvXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuZnVuY3Rpb24gYXNzaWduVXNlcihwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgdXNlciwgdXVpZCwgX1dGSW5zdGFuY2UpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgIC8vIEdldCB0aGUgY3VycmVudCBzdWJQcm9jZXNzIGluc3RhbmNlIGRhdGFcblxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgIF9XRkluc3RhbmNlLmluc3RhbmNlLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKG9ialByb2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBpZiAob2JqUHJvY2Vzcy5pZCA9PSBwcm9jZXNzSWQgJiYgb2JqUHJvY2Vzcy5zZXEgPT0gcHJvY2Vzc1NlcSkge1xuICAgICAgICAgICAgICAgICAgICBvYmpQcm9jZXNzLnN1YlByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKG9ialN1YlByb2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmpTdWJQcm9jZXNzLmlkID09IHN1YlByb2Nlc3NJZCAmJiBvYmpTdWJQcm9jZXNzLnNlcSA9PSBzdWJQcm9jZXNzU2VxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXVpZCA9IG9ialN1YlByb2Nlc3MudXVpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAqL1xuXG4gICAgICAgICAgICBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHN1YlByb2Nlc3NJdGVtKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN1YlByb2Nlc3NJdGVtLl9pZCA9PSB1dWlkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vQWRkZWQgdG8gaHN0b3J5XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdWJQcm9jZXNzSXRlbS5zdGVwLmFzc2lnbm1lbnRIaXN0b3J5ID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc0l0ZW0uc3RlcC5hc3NpZ25tZW50SGlzdG9yeSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdWJQcm9jZXNzSXRlbS5zdGVwLmFzc2lnbmVkVG8udXNlcklkICE9IFwiXCIgJiYgc3ViUHJvY2Vzc0l0ZW0uc3RlcC5hc3NpZ25lZFRvLm5hbWUgIT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc0l0ZW0uc3RlcC5hc3NpZ25tZW50SGlzdG9yeS5wdXNoKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoc3ViUHJvY2Vzc0l0ZW0uc3RlcC5hc3NpZ25lZFRvKSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICAvLyBTZXQgdGhlIHVzZXIgZGV0YWlsc1xuICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzSXRlbS5zdGVwLmFzc2lnbmVkVG8udXNlcklkID0gdXNlci5pZDtcbiAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc0l0ZW0uc3RlcC5hc3NpZ25lZFRvLm5hbWUgPSB1c2VyLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NJdGVtLnN0ZXAuYXNzaWduZWRUby5kYXRlVGltZSA9IG1vbWVudCgpLmZvcm1hdCgpO1xuICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzSXRlbS5zdGVwLmFzc2lnbmVkVG8udHlwZSA9IEFTU0lHTk1FTlRfVFlQRV9SRUFTU0lHTk1FTlQ7XG4gICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NJdGVtLnN0ZXAuYXNzaWduZWRUby5kdWVEYXRlVGltZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzSXRlbS5zdGVwLmFzc2lnbmVkVG8uYnkgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZCArIFwiXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBpbmRpY2F0b3JzIHVzZXIgZGV0YWlsc1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9ycyA9IHN1YlByb2Nlc3NJdGVtLmluZGljYXRvcnM7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5kaWNhdG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvciA9IGluZGljYXRvcnNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGluZGljYXRvci5pbnN0YW5jZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSBpbmRpY2F0b3IuaW5zdGFuY2VzW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZG9jID0gX1dGSW5zdGFuY2UuaW5kaWNhdG9yc1trXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlLnV1aWQgPT0gZG9jLl9pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jLndvcmtmbG93cy5maWx0ZXIoZnVuY3Rpb24od29ya2Zsb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod29ya2Zsb3cuaWQgPT0gX1dGSW5zdGFuY2UuY29uZmlnLl9pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3b3JrZmxvdy5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHByb2Nlc3NJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvY2Vzc0l0ZW0uaWQgPT0gcHJvY2Vzc0lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSB1c2VyIGlkIGFuZCBuYW1lIGluIHRoZSBkb2N1bWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NJdGVtLnN0ZXAuYXNzaWduZWRUby51c2VySWQgPSB1c2VyLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NJdGVtLnN0ZXAuYXNzaWduZWRUby5uYW1lID0gdXNlci5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vU2VuZCBhc3NpZ24gdXNlciBub3RpZmljYXRpb24gZnJvbSBoZXJlXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vdGlmaWNhdGlvbiA9IEpTT04ueHBhdGgoXCIvcHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBwcm9jZXNzSWQgKyBcIiddL25vdGlmaWNhdGlvbnNcIiwgX1dGSW5zdGFuY2UuY29uZmlnLCB7fSlbMF07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vdGlmaWNhdGlvbiAhPSB1bmRlZmluZWQgJiYgbm90aWZpY2F0aW9uLnJlQXNzaWdubWVudCAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uc01vZHVsZS5ub3RpZmljYXRpb24ucmVBc3NpZ25tZW50Tm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbiwgX1dGSW5zdGFuY2UsIHV1aWQsIHVzZXIpLnRoZW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnVXNlciBhc3NpZ25lZCBzdWNjZXNzZnVsbHkuIFVzZXJJZDogXCInICsgdXNlci5pZCArICdcIiwgTmFtZTogXCInICsgdXNlci5uYW1lICsgJ1wiJywgc3ViUHJvY2Vzc0l0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGZhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShmYWlsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdVc2VyIGFzc2lnbmVkIHN1Y2Nlc3NmdWxseS4gVXNlcklkOiBcIicgKyB1c2VyLmlkICsgJ1wiLCBOYW1lOiBcIicgKyB1c2VyLm5hbWUgKyAnXCInLCBzdWJQcm9jZXNzSXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG5cblxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG5cbiAgICB9KTtcbn07XG5cbi8qKlxuICogUHJvY2VzcyBpbmRpY2F0b3IgZG9jdW1lbnQgdXBkYXRlc1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBhY3Rpb25zIC0gdGhlIGFjdGlvbnMgY29uZmlnIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBzdWJQcm9jZXNzIC0gdGhlIGN1cnJlbnQgc3ViLXByb2Nlc3MgZm9ybSBjb25maWcgZGF0YVxuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcbiAqXG4gKiBAZXhhbXBsZSAnJ1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cbmZ1bmN0aW9uIGluZGljYXRvckRvY3MocHJvY2Vzc0lkLCBpbmRpY2F0b3JzLCBzdGVwLCBfV0ZJbnN0YW5jZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgaW5kaWNhdG9yIHNlY3Rpb25zIG9mIHRoZSBzdWJQcm9jZXNzXG4gICAgICAgICAgICBpZiAoaW5kaWNhdG9ycyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRkluZGljYXRvcnNVcGRhdGUnLCAnSW5kaWNhdG9ycyBwYXJhbWV0ZXIgaXMgcmVxdWlyZWQuIC0gVmFsdWU6ICcgKyBpbmRpY2F0b3JzKVxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluZGljYXRvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvciA9IGluZGljYXRvcnNbaV07XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaW5kaWNhdG9yLmluc3RhbmNlcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gaW5kaWNhdG9yLmluc3RhbmNlc1tqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkb2MgPSBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzW2tdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZS51dWlkID09IGRvYy5faWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jLndvcmtmbG93cy5maWx0ZXIoZnVuY3Rpb24od29ya2Zsb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3b3JrZmxvdy5pZCA9PSBfV0ZJbnN0YW5jZS5jb25maWcuX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd29ya2Zsb3cucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihwcm9jZXNzSXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvY2Vzc0l0ZW0uaWQgPT0gcHJvY2Vzc0lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzSXRlbS5zdGVwLmlkID0gc3RlcC5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NJdGVtLnN0ZXAuc2VxID0gc3RlcC5zZXE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzSXRlbS5zdGVwLnN0YXR1cyA9IHN0ZXAuc3RhdHVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0l0ZW0uc3RlcC5tZXNzYWdlID0gc3RlcC5tZXNzYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0l0ZW0uc3RlcC5hc3NpZ25lZFRvLnVzZXJJZCA9IHN0ZXAuYXNzaWduZWRUby51c2VySWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzSXRlbS5zdGVwLmFzc2lnbmVkVG8ubmFtZSA9IHN0ZXAuYXNzaWduZWRUby5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0l0ZW0uc3RlcC5jb21tZW50ID0gc3RlcC5jb21tZW50ICE9PSB1bmRlZmluZWQgPyBzdGVwLmNvbW1lbnQgOiAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdJbmRpY2F0b3IgZG9jdW1lbnRzIHdvcmtmbG93IHByb2Nlc3MgbW9kZWwgdXBkYXRlZC4nLCBfV0ZJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG5cbiAgICB9KVxufTtcblxuLyoqXG4gKiBQcm9jZXNzIGFjdGlvbnNcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gYWN0aW9ucyAtIHRoZSBhY3Rpb25zIGNvbmZpZyBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gc3ViUHJvY2VzcyAtIHRoZSBjdXJyZW50IHN1Yi1wcm9jZXNzIGZvcm0gY29uZmlnIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5cbmZ1bmN0aW9uIGFjdGlvbnMoYWN0aW9ucywgcHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN1YlByb2Nlc3MsIHN0ZXAsIF9XRkluc3RhbmNlLCBkYXRhLCB1dWlkKSB7XG4gICAgdmFyIGFyckFjdGlvbnMgPSBbXTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHV0aWwuc3luY0xvb3AoYWN0aW9ucy5sZW5ndGgsIGZ1bmN0aW9uKGxvb3ApIHtcbiAgICAgICAgICAgIHZhciBjb3VudGVyID0gbG9vcC5pdGVyYXRpb24oKTtcbiAgICAgICAgICAgIGFjdGlvbihhY3Rpb25zW2NvdW50ZXJdLCBwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3ViUHJvY2Vzcywgc3RlcCwgX1dGSW5zdGFuY2UsIGRhdGEsIHV1aWQpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXRBY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogYWN0aW9uc1tjb3VudGVyXS5faWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXE6IGNvdW50ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiByZXN1bHRcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICBhcnJBY3Rpb25zLnB1c2gocmV0QWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgbG9vcC5uZXh0KCk7XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvb3AuYnJlYWsoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0FjdGlvbnMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCBhcnJBY3Rpb25zKTtcbiAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcblxuLyoqXG4gKiBQcm9jZXNzIGFjdGlvblxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBhY3Rpb24gLSB0aGUgYWN0aW9uIGNvbmZpZyBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gc3ViUHJvY2VzcyAtIHRoZSBjdXJyZW50IHN1Yi1wcm9jZXNzIGZvcm0gY29uZmlnIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiBhY3Rpb24oYWN0aW9uLCBwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3ViUHJvY2Vzcywgc3RlcCwgX1dGSW5zdGFuY2UsIGRhdGEsIHV1aWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgaWYgKGFjdGlvbi5tZXRob2QgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YXIgbWV0aG9kUG9zc2libGVJdGVtcyA9IFtcImZvcm1cIiwgXCJpbmRpY2F0b3JcIiwgXCJwcm9maWxlXCIsIFwic3ViUHJvY2Vzc0luc3RhbmNlXCIsIFwic3RlcFwiLCBcImNvbW11bml0eVwiLCBcImFwcGxpY2F0aW9uXCIsIFwidXNlclwiLCBcInNkb1wiLCBcInBlcmZvcm1hbmNlXCIsIFwidGF4b25vbXlcIiwgXCJ2YXJpYWJsZXNcIiwgXCJub3RpZmljYXRpb25cIiwgXCJyZXBvcnRcIiwgXCJ3b3JrZXJcIiwgXCJwYXJ0aWNpcGFudHNcIl07XG4gICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5RXhpc3RzKGFjdGlvbi5tZXRob2QsIG1ldGhvZFBvc3NpYmxlSXRlbXMpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnZm9ybSc6XG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24ubWV0aG9kLmZvcm0uY3JlYXRlICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHByb2Nlc3NJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goc3ViUHJvY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goc3RlcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goYWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChwcm9jZXNzU2VxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChzdWJQcm9jZXNzU2VxKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKF9XRkluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmNyZWF0ZVR5cGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHV1aWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEuYmFzZVVVSUQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmNyZWF0ZShhcmdzKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbi5tZXRob2QuZm9ybS5hdXRob3Jpc2UgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2gocHJvY2Vzc0lkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChzdWJQcm9jZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChwcm9jZXNzU2VxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChzdWJQcm9jZXNzU2VxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChfV0ZJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YS5jcmVhdGVUeXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh1dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmJhc2VVVUlEKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uYXV0aG9yaXNlKGFyZ3MpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uLm1ldGhvZC5mb3JtLnVuZHJhZnQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKF9XRkluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmNyZWF0ZVR5cGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHV1aWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEuYmFzZVVVSUQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5zZXRVbkRyYWZ0KGFyZ3MpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uLm1ldGhvZC5mb3JtLmRyYWZ0ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChfV0ZJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YS5jcmVhdGVUeXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh1dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmJhc2VVVUlEKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uc2V0RHJhZnQoYXJncykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24ubWV0aG9kLmZvcm0uY2xvc2UgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goc3ViUHJvY2Vzcy5pbmRpY2F0b3JzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChfV0ZJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YS5jcmVhdGVUeXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh1dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmJhc2VVVUlEKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uY2xvc2UoYXJncykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24ubWV0aG9kLmZvcm0uYXV0aG9yaXNlQW5kQ3JlYXRlTmV3U2VxICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHByb2Nlc3NJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goc3ViUHJvY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2gocHJvY2Vzc1NlcSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goc3ViUHJvY2Vzc1NlcSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goX1dGSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEuY3JlYXRlVHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2godXVpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YS5iYXNlVVVJRCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmF1dGhvcmlzZShhcmdzKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ3JlYXRlIG5ldyBzZXF1ZW5jZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2gocHJvY2Vzc0lkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goc3ViUHJvY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHN0ZXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChhY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChwcm9jZXNzU2VxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goc3ViUHJvY2Vzc1NlcSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goX1dGSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmNyZWF0ZVR5cGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh1dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2godXVpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5jcmVhdGUoYXJncykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vRWQgY3JlYXRpb24gb2YgbmV3IHNlcXVlbmNlXG5cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdpbmRpY2F0b3InOlxuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uLm1ldGhvZC5pbmRpY2F0b3IuY3JlYXRlICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKFwiTm90IGltcGxlbWVudGVkXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uLm1ldGhvZC5pbmRpY2F0b3IuaW5zdGFudGlhdGUgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoXCJOb3QgaW1wbGVtZW50ZWRcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24ubWV0aG9kLmluZGljYXRvci5zZXRWYWx1ZSAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhdGggPSBhY3Rpb24ubWV0aG9kLmluZGljYXRvci5zZXRWYWx1ZS5wYXRoO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWxwZXIuZ2V0Tm9kZVZhbHVlKGFjdGlvbi5tZXRob2QuaW5kaWNhdG9yLnNldFZhbHVlLmRhdGEsIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uKGRhdGFWYWx1ZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goX1dGSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh1dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2gocGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGFWYWx1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLnVwZGF0ZUluZGljYXRvcihhcmdzKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbi5tZXRob2QuaW5kaWNhdG9yLnVwZGF0ZVN0YXR1cyAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvclNldElkID0gYWN0aW9uLm1ldGhvZC5pbmRpY2F0b3IuaW5kaWNhdG9yU2V0SWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKF9XRkluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh1dWlkKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGlvbi5tZXRob2QuaW5kaWNhdG9yLnVwZGF0ZVN0YXR1cyAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RhdHVzID0gYWN0aW9uLm1ldGhvZC5pbmRpY2F0b3IudXBkYXRlU3RhdHVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChzdGF0dXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChpbmRpY2F0b3JTZXRJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gS2VlcCBpbmRpY2F0b3IgZnVuY3Rpb25zIGluIGluZGlhdG9yIGZpbGUgaXN0ZWFkIG9mIGZvcm0gZmlsZS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLm1hcmtVcGRhdGVJbmRpY2F0b3IoYXJncykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoXCJBY3Rpb24gaW5kaWNhdG9yIHN1YiB0eXBlIG5vdCBmb3VuZC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24ubWV0aG9kLmluZGljYXRvci5zZXRXcmFwcGVyRWxlbWVudCAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhdGggPSBhY3Rpb24ubWV0aG9kLmluZGljYXRvci5zZXRXcmFwcGVyRWxlbWVudC5wYXRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvclNldElkID0gYWN0aW9uLm1ldGhvZC5pbmRpY2F0b3Iuc2V0V3JhcHBlckVsZW1lbnQuaW5kaWNhdG9yU2V0SWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGhlbHBlci5nZXROb2RlVmFsdWUoYWN0aW9uLm1ldGhvZC5pbmRpY2F0b3Iuc2V0V3JhcHBlckVsZW1lbnQuZGF0YSwgX1dGSW5zdGFuY2UsIHV1aWQpLnRoZW4oZnVuY3Rpb24oZGF0YVZhbHVlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChfV0ZJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHV1aWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChwYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goaW5kaWNhdG9yU2V0SWQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS51cGRhdGVJbmRpY2F0b3JXcmFwcGVyKGFyZ3MpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdwcm9maWxlJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGlvbi5tZXRob2QucHJvZmlsZS5jcmVhdGUgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2gocHJvY2Vzc0lkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChfV0ZJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YS5jcmVhdGVUeXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh1dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmJhc2VVVUlEKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uY3JlYXRlUHJvZmlsZShhcmdzKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbi5tZXRob2QucHJvZmlsZS5zZXRTdGF0dXNUbyAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGF0dXMgPSBhY3Rpb24ubWV0aG9kLnByb2ZpbGUuc2V0U3RhdHVzVG87XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChfV0ZJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2godXVpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goc3RhdHVzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5zZXRTdGF0dXMoYXJncykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3N1YlByb2Nlc3NJbnN0YW5jZSc6XG4gICAgICAgICAgICAgICAgICAgIHZhciBzcFBvc3NpYmxlSXRlbXMgPSBbXCJpbnN0YW50aWF0ZVwiLCBcImF1dGhvcmlzZVwiLCBcImNsb3NlXCIsIFwic2V0VmFyaWFibGVcIiwgXCJzZXRTdGF0dXNUb1wiLCBcInNldFN0YXR1c01zZ1RvXCIsIFwic2V0VGl0bGVcIiwgXCJzZXRWYWxpZERhdGVcIiwgXCJzZXRTUFN0YXR1c1wiXTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChwcm9wZXJ0eUV4aXN0cyhhY3Rpb24ubWV0aG9kLnN1YlByb2Nlc3NJbnN0YW5jZSwgc3BQb3NzaWJsZUl0ZW1zKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzZXRUaXRsZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVscGVyLmdldE5vZGVWYWx1ZShhY3Rpb24ubWV0aG9kLnN1YlByb2Nlc3NJbnN0YW5jZS5zZXRUaXRsZSwgX1dGSW5zdGFuY2UsIHV1aWQpLnRoZW4oZnVuY3Rpb24oZGF0YVZhbHVlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uc01vZHVsZS5zdWJQcm9jZXNzSW5zdGFuY2Uuc2V0VGl0bGUoYWN0aW9uLm1ldGhvZC5zdWJQcm9jZXNzSW5zdGFuY2Uuc2V0VGl0bGUsIHV1aWQsIGRhdGFWYWx1ZSwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3VwZGF0ZSBzdWJwcm9jZXNzIGxhYmVsIGluIHdvcmtmbG93IGluc3RhbmNlIHByb2Nlc3Mgb2JqZWN0OiBUT0RPXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3NldFZhbGlkRGF0ZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVscGVyLmdldE5vZGVWYWx1ZShhY3Rpb24ubWV0aG9kLnN1YlByb2Nlc3NJbnN0YW5jZS5zZXRWYWxpZERhdGUsIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uKGRhdGFWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25zTW9kdWxlLnN1YlByb2Nlc3NJbnN0YW5jZS5zZXRWYWxpZERhdGUoYWN0aW9uLm1ldGhvZC5zdWJQcm9jZXNzSW5zdGFuY2Uuc2V0VmFsaWREYXRlLCB1dWlkLCBkYXRhVmFsdWUsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdXBkYXRlIHN1YnByb2Nlc3MgbGFiZWwgaW4gd29ya2Zsb3cgaW5zdGFuY2UgcHJvY2VzcyBvYmplY3Q6IFRPRE9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzZXRTUFN0YXR1cyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVscGVyLmdldE5vZGVWYWx1ZShhY3Rpb24ubWV0aG9kLnN1YlByb2Nlc3NJbnN0YW5jZS5zZXRTUFN0YXR1cywgX1dGSW5zdGFuY2UsIHV1aWQpLnRoZW4oZnVuY3Rpb24oZGF0YVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbnNNb2R1bGUuc3ViUHJvY2Vzc0luc3RhbmNlLnNldFNQU3RhdHVzKGFjdGlvbi5tZXRob2Quc3ViUHJvY2Vzc0luc3RhbmNlLnNldFNQU3RhdHVzLCB1dWlkLCBkYXRhVmFsdWUsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdXBkYXRlIHN1YnByb2Nlc3MgbGFiZWwgaW4gd29ya2Zsb3cgaW5zdGFuY2UgcHJvY2VzcyBvYmplY3Q6IFRPRE9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdCBpbiBzdWJwcm9jZXNzIGFjdGlvbi5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdzdGVwJzpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnY29tbXVuaXR5JzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbW11bml0eVBvc3NpYmxlSXRlbXMgPSBbXCJjcmVhdGVDb21tdW5pdHlcIiwgXCJyZWxlYXNlQWRvcHRlZEFwcGxpY2F0aW9uXCIsIFwidXNlckpvaW5Db21tdW5pdHlcIl07XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocHJvcGVydHlFeGlzdHMoYWN0aW9uLm1ldGhvZC5jb21tdW5pdHksIGNvbW11bml0eVBvc3NpYmxlSXRlbXMpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NyZWF0ZUNvbW11bml0eSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUuY29tbXVuaXR5LmNyZWF0ZUNvbW11bml0eShhY3Rpb24ubWV0aG9kLmNvbW11bml0eS5jcmVhdGVDb21tdW5pdHksIHV1aWQsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlbGVhc2VBZG9wdGVkQXBwbGljYXRpb24nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25zTW9kdWxlLmNvbW11bml0eS5yZWxlYXNlQWRvcHRlZEFwcGxpY2F0aW9uKGFjdGlvbi5tZXRob2QuY29tbXVuaXR5LnJlbGVhc2VBZG9wdGVkQXBwbGljYXRpb24sIHV1aWQsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3VzZXJKb2luQ29tbXVuaXR5JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5jb21tdW5pdHkudXNlckpvaW5Db21tdW5pdHkoYWN0aW9uLm1ldGhvZC5jb21tdW5pdHkudXNlckpvaW5Db21tdW5pdHksIHV1aWQsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdhcHBsaWNhdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIHZhciBhcHBsaWNhdGlvblBvc3NpYmxlSXRlbXMgPSBbXCJjcmVhdGVBcHBEZWZpbml0aW9uXCIsIFwiYnVpbGRBcHBsaWNhdGlvblwiLCBcImFwcGxpY2F0aW9uQWRvcHRpb25cIl07XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocHJvcGVydHlFeGlzdHMoYWN0aW9uLm1ldGhvZC5hcHBsaWNhdGlvbiwgYXBwbGljYXRpb25Qb3NzaWJsZUl0ZW1zKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjcmVhdGVBcHBEZWZpbml0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5hcHBsaWNhdGlvbi5jcmVhdGVBcHBEZWZpbml0aW9uKGFjdGlvbi5tZXRob2QuYXBwbGljYXRpb24uY3JlYXRlQXBwRGVmaW5pdGlvbiwgdXVpZCwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYnVpbGRBcHBsaWNhdGlvbic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUuYXBwbGljYXRpb24uYnVpbGRBcHBsaWNhdGlvbihhY3Rpb24ubWV0aG9kLmFwcGxpY2F0aW9uLmJ1aWxkQXBwbGljYXRpb24sIHV1aWQsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2FwcGxpY2F0aW9uQWRvcHRpb24nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25zTW9kdWxlLmFwcGxpY2F0aW9uLmFwcGxpY2F0aW9uQWRvcHRpb24oYWN0aW9uLm1ldGhvZC5hcHBsaWNhdGlvbi5hcHBsaWNhdGlvbkFkb3B0aW9uLCB1dWlkLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChcIk5vIG1ldGhvZCBmb3VuZCBmcm9tIGltcGxlbWVudGVkIGxpc3QuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICd1c2VyJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVzZXJQb3NzaWJsZUl0ZW1zID0gW1wiYWRkVG9Sb2xlXCJdO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5RXhpc3RzKGFjdGlvbi5tZXRob2QudXNlciwgdXNlclBvc3NpYmxlSXRlbXMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdhZGRUb1JvbGUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25zTW9kdWxlLnVzZXIuYWRkVG9Sb2xlKGFjdGlvbi5tZXRob2QudXNlci5hZGRUb1JvbGUsIHV1aWQsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnc2RvJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNkb1Bvc3NpYmxlSXRlbXMgPSBbXCJjcmVhdGVcIiwgXCJlbnJvbGxDb3Vyc2VcIl07XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocHJvcGVydHlFeGlzdHMoYWN0aW9uLm1ldGhvZC5zZG8sIHNkb1Bvc3NpYmxlSXRlbXMpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NyZWF0ZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUuc2RvLmNyZWF0ZShhY3Rpb24ubWV0aG9kLnNkby5jcmVhdGUsIHV1aWQsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdlbnJvbGxDb3Vyc2UnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25zTW9kdWxlLnNkby5lbnJvbGxDb3Vyc2UoYWN0aW9uLm1ldGhvZC5zZG8uZW5yb2xsQ291cnNlLCB1dWlkLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChcIk5vIG1ldGhvZCBmb3VuZCBmcm9tIGltcGxlbWVudGVkIGxpc3QuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdwZXJmb3JtYW5jZSc6XG4gICAgICAgICAgICAgICAgICAgIHZhciBwZXJmb3JtYW5jZVBvc3NpYmxlSXRlbXMgPSBbXCJ1bmxvY2tQZXJpb2RcIiwgXCJsb2NrUGVyZm9ybWFuY2VNb2RlbFwiLCBcInNldE1vZGVsU3RhdHVzXCJdO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5RXhpc3RzKGFjdGlvbi5tZXRob2QucGVyZm9ybWFuY2UsIHBlcmZvcm1hbmNlUG9zc2libGVJdGVtcykpIHtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd1bmxvY2tQZXJpb2QnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25zTW9kdWxlLnBlcmZvcm1hbmNlLnVubG9ja1BlcmlvZChhY3Rpb24ubWV0aG9kLnBlcmZvcm1hbmNlLnVubG9ja1BlcmlvZCwgdXVpZCwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3NldE1vZGVsU3RhdHVzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5wZXJmb3JtYW5jZS5zZXRNb2RlbFN0YXR1cyhhY3Rpb24ubWV0aG9kLnBlcmZvcm1hbmNlLnNldE1vZGVsU3RhdHVzLCB1dWlkLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbG9ja1BlcmZvcm1hbmNlTW9kZWwnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25zTW9kdWxlLnBlcmZvcm1hbmNlLmxvY2tQZXJmb3JtYW5jZU1vZGVsKGFjdGlvbi5tZXRob2QucGVyZm9ybWFuY2UubG9ja1BlcmZvcm1hbmNlTW9kZWwsIHV1aWQsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJObyBtZXRob2QgZm91bmQgZnJvbSBpbXBsZW1lbnRlZCBsaXN0LlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAndGF4b25vbXknOlxuICAgICAgICAgICAgICAgICAgICB2YXIgdGF4b25vbXlQb3NzaWJsZUl0ZW1zID0gW1wiY3JlYXRlXCJdO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5RXhpc3RzKGFjdGlvbi5tZXRob2QudGF4b25vbXksIHRheG9ub215UG9zc2libGVJdGVtcykpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnY3JlYXRlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS50YXhvbm9teS5jcmVhdGUoYWN0aW9uLm1ldGhvZC50YXhvbm9teS5jcmVhdGUsIHV1aWQsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd2YXJpYWJsZXMnOlxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFyaWFibGVzUG9zc2libGVJdGVtcyA9IFtcInNldFZhcmlhYmxlXCJdO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5RXhpc3RzKGFjdGlvbi5tZXRob2QudmFyaWFibGVzLCB2YXJpYWJsZXNQb3NzaWJsZUl0ZW1zKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzZXRWYXJpYWJsZSc6XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS52YXJpYWJsZXMuc2V0VmFyaWFibGUoYWN0aW9uLm1ldGhvZC52YXJpYWJsZXMuc2V0VmFyaWFibGUsIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdub3RpZmljYXRpb24nOlxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25zTW9kdWxlLm5vdGlmaWNhdGlvbi5zZW5kTm90aWZpY2F0aW9uV29ya2VyKGFjdGlvbi5tZXRob2Qubm90aWZpY2F0aW9uLCBfV0ZJbnN0YW5jZSwgdXVpZCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdyZXBvcnQnOlxuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogXG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVwb3J0UG9zc2libGVJdGVtcyA9IFtcImNyZWF0ZVBlcmZvcm1hbmNlUmVwb3J0XCIsIFwiY3JlYXRlUmVwb3J0XCIsIFwic2RvUmVwb3J0XCIsIFwiZXhlY3V0ZVJlcG9ydFwiLCBcInJlcXVlc3RSZXBvcnRcIiwgXCJnZW5lcmF0ZVZpZXdcIiwgXCJnZW5lcmF0ZUJhc2ljVmlld1wiLCBcImdlbmVyYXRlVW5pb25WaWV3XCIsIFwic2RvUmVwb3J0TXVsdGlwbGVcIiwgXCJzdWJwcm9maWxlUXVhcnRlcmx5UmVwb3J0XCJdO1xuXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocHJvcGVydHlFeGlzdHMoYWN0aW9uLm1ldGhvZC5yZXBvcnQsIHJlcG9ydFBvc3NpYmxlSXRlbXMpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NyZWF0ZVBlcmZvcm1hbmNlUmVwb3J0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5yZXBvcnQuY3JlYXRlUGVyZm9ybWFuY2VSZXBvcnQoYWN0aW9uLm1ldGhvZC5yZXBvcnQuY3JlYXRlUGVyZm9ybWFuY2VSZXBvcnQsIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NyZWF0ZVJlcG9ydCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUucmVwb3J0LmNyZWF0ZVJlcG9ydChhY3Rpb24ubWV0aG9kLnJlcG9ydC5jcmVhdGVSZXBvcnQsIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzZG9SZXBvcnQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25zTW9kdWxlLnJlcG9ydC5zZG9SZXBvcnQoYWN0aW9uLm1ldGhvZC5yZXBvcnQuc2RvUmVwb3J0LCBfV0ZJbnN0YW5jZSwgdXVpZCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZXhlY3V0ZVJlcG9ydCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUucmVwb3J0LmV4ZWN1dGVSZXBvcnQoYWN0aW9uLm1ldGhvZC5yZXBvcnQuZXhlY3V0ZVJlcG9ydCwgX1dGSW5zdGFuY2UsIHV1aWQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2dlbmVyYXRlVmlldyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUucmVwb3J0LmdlbmVyYXRlVmlldyhhY3Rpb24ubWV0aG9kLnJlcG9ydC5nZW5lcmF0ZVZpZXcsIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdyZXF1ZXN0UmVwb3J0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5yZXBvcnQucmVxdWVzdFJlcG9ydChhY3Rpb24ubWV0aG9kLnJlcG9ydC5yZXF1ZXN0UmVwb3J0LCBfV0ZJbnN0YW5jZSwgdXVpZCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZ2VuZXJhdGVCYXNpY1ZpZXcnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25zTW9kdWxlLnJlcG9ydC5nZW5lcmF0ZUJhc2ljVmlldyhhY3Rpb24ubWV0aG9kLnJlcG9ydC5nZW5lcmF0ZUJhc2ljVmlldywgX1dGSW5zdGFuY2UsIHV1aWQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2dlbmVyYXRlVW5pb25WaWV3JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5yZXBvcnQuZ2VuZXJhdGVVbmlvblZpZXcoYWN0aW9uLm1ldGhvZC5yZXBvcnQuZ2VuZXJhdGVVbmlvblZpZXcsIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3Nkb1JlcG9ydE11bHRpcGxlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5yZXBvcnQuc2RvUmVwb3J0TXVsdGlwbGUoYWN0aW9uLm1ldGhvZC5yZXBvcnQuc2RvUmVwb3J0TXVsdGlwbGUsIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzdWJwcm9maWxlUXVhcnRlcmx5UmVwb3J0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5yZXBvcnQuc3VicHJvZmlsZVF1YXJ0ZXJseVJlcG9ydChhY3Rpb24ubWV0aG9kLnJlcG9ydC5zdWJwcm9maWxlUXVhcnRlcmx5UmVwb3J0LCBfV0ZJbnN0YW5jZSwgdXVpZCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3dvcmtlcic6XG4gICAgICAgICAgICAgICAgICAgIHZhciB3b3JrZXJQb3NzaWJsZUl0ZW1zID0gW1wic2VuZFdvcmtlclwiLCBcImV4ZWN1dGVMb2NhbFwiLCBcImNyZWF0ZVwiXTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChwcm9wZXJ0eUV4aXN0cyhhY3Rpb24ubWV0aG9kLndvcmtlciwgd29ya2VyUG9zc2libGVJdGVtcykpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc2VuZFdvcmtlcic6XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS53b3JrZXIuc2VuZFdvcmtlcihhY3Rpb24ubWV0aG9kLndvcmtlci5zZW5kV29ya2VyLCBfV0ZJbnN0YW5jZSwgdXVpZCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdleGVjdXRlTG9jYWwnOlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUud29ya2VyLmV4ZWN1dGVMb2NhbChhY3Rpb24ubWV0aG9kLndvcmtlci5leGVjdXRlTG9jYWwsIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NyZWF0ZSc6XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS53b3JrZXIuY3JlYXRlKGFjdGlvbi5tZXRob2Qud29ya2VyLmNyZWF0ZSwgX1dGSW5zdGFuY2UsIHV1aWQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJObyBtZXRob2QgZm91bmQgZnJvbSBpbXBsZW1lbnRlZCBsaXN0LlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG5cblxuICAgICAgICAgICAgICAgIGNhc2UgJ3BhcnRpY2lwYW50cyc6XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJ0aWNpcGFudFBvc3NpYmxlSXRlbXMgPSBbXCJsaW5rUGFydGljaXBhbnRzXCIsIFwibW9udGhseUF0dGVuZGFuY2VcIiwgXCJtb250aGx5UHJvZ3Jlc3NTdW1tYXJ5XCIsIFwicGFydGljaXBhbnRDb250cmFjdHNcIl07XG5cbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChwcm9wZXJ0eUV4aXN0cyhhY3Rpb24ubWV0aG9kLnBhcnRpY2lwYW50cywgcGFydGljaXBhbnRQb3NzaWJsZUl0ZW1zKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdsaW5rUGFydGljaXBhbnRzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5wYXJ0aWNpcGFudHMubGlua1BhcnRpY2lwYW50cyhhY3Rpb24ubWV0aG9kLnBhcnRpY2lwYW50cy5saW5rUGFydGljaXBhbnRzLCBfV0ZJbnN0YW5jZSwgdXVpZCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdtb250aGx5QXR0ZW5kYW5jZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUucGFydGljaXBhbnRzLm1vbnRobHlBdHRlbmRhbmNlKGFjdGlvbi5tZXRob2QucGFydGljaXBhbnRzLm1vbnRobHlBdHRlbmRhbmNlLCBfV0ZJbnN0YW5jZSwgdXVpZCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdtb250aGx5UHJvZ3Jlc3NTdW1tYXJ5JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5wYXJ0aWNpcGFudHMubW9udGhseVByb2dyZXNzU3VtbWFyeShhY3Rpb24ubWV0aG9kLnBhcnRpY2lwYW50cy5tb250aGx5UHJvZ3Jlc3NTdW1tYXJ5LCBfV0ZJbnN0YW5jZSwgdXVpZCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncGFydGljaXBhbnRDb250cmFjdHMnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25zTW9kdWxlLnBhcnRpY2lwYW50cy5wYXJ0aWNpcGFudENvbnRyYWN0cyhhY3Rpb24ubWV0aG9kLnBhcnRpY2lwYW50cy5wYXJ0aWNpcGFudENvbnRyYWN0cywgX1dGSW5zdGFuY2UsIHV1aWQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChcIk5vIG1ldGhvZCBmb3VuZCBmcm9tIGltcGxlbWVudGVkIGxpc3QuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cblxuXG5cblxuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwibWV0aG9kIG5vdCBkZWZpbmVkIGluIGNvbmZpZ3VyYXRpb25cIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWplY3QoXCJObyBtZXRob2QgZm91bmQgZnJvbSBpbXBsZW1lbnRlZCBsaXN0LlwiKTtcblxuICAgICAgICB9XG5cbiAgICB9KTtcbn07XG5cbi8qKlxuICogUHJvY2VzcyB0YXNrc1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSB0YXNrIC0gdGhlIHRhc2sgY29uZmlnIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dERhdGEgLSB0aGUgdXNlciBpbnB1dCBkYXRhXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiB0YXNrKHN1YnByb2Nlc3NJRCwgc3VicHJvY2Vzc1NFUSwgdGFzaywgc3B1dWlkLCBtb2RlbCkge1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgIHZhciBfV0ZJbnN0YW5jZSA9IGFwcC5TQ09QRS53b3JrZmxvdztcbiAgICAgICAgdmFyIHByZUFjdGlvbnNDb25mID0gdGFzay5wcmVBY3Rpb25zO1xuICAgICAgICBwcmVBY3Rpb25zKHByZUFjdGlvbnNDb25mLCBfV0ZJbnN0YW5jZSwgc3B1dWlkKS50aGVuKGZ1bmN0aW9uKHByZUFjdGlvblJlc3VsdCkge1xuXG4gICAgICAgICAgICB2YXIgbGlzdCA9IFtdO1xuXG5cbiAgICAgICAgICAgIGlmICh0YXNrLmFzc2lnbi5yb2xlICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHZhciBhc3NpZ25UeXBlID0gJ3Byb2ZpbGVSb2xlJztcbiAgICAgICAgICAgICAgICB2YXIgcHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcbiAgICAgICAgICAgICAgICB2YXIgaWQgPSAnJztcbiAgICAgICAgICAgICAgICBpZiAodGFzay5hc3NpZ24ucm9sZS5wcm9maWxlID09ICdjdXJyZW50Jykge1xuICAgICAgICAgICAgICAgICAgICBpZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0YXNrLmFzc2lnbi5yb2xlLnByb2ZpbGUgPT0gJ2NvbW11bml0eScpIHtcbiAgICAgICAgICAgICAgICAgICAgaWQgPSBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgcm9sZSA9IHRhc2suYXNzaWduLnJvbGUucm9sZUlkO1xuXG4gICAgICAgICAgICAgICAgbGlicmFyeS5nZXRVc2Vyc0xpc3RCeVJvbGUoaWQsIHJvbGUpLnRoZW4oZnVuY3Rpb24obGlzdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdCAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3QubGVuZ3RoID4gMSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTmV3IHJlcXVpcmVtZW50IGhlcmUgd2lsbCBhdXRvbWF0aWNhbGx5IGFzc2lnbiB0aGUgc3RlcCB0byBjdXJyZW50IHVzZXIgaWYgdGhpcyB1c2VyIGZhbGxzIHVuZGVyIHRoZSBwcm92aWRlZCBncm91cC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSVUxFIElOVFJPRFVDRUQgT04gMTYtTUFSQ0gtMjAxN1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIGN1cnJlbnQgdXNlciBsaWVzIHdpdGhpbiB0aGUgc3BlY2lmaWVkIHJvbGUsIGl0IHdpbGwgYmUgYXV0b21hdGljYWxseSBhc3NpZ25lZCB0byB0aGF0IHVzZXIuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXNDdXJyZW50VXNlckV4aXN0SW5HaXZlblJvbGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm9sZXNPYmplY3QgPSBsaWJyYXJ5LmdldEN1cnJlbnRVc2VyUm9sZXMoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpc0N1cnJlbnRVc2VyUm9sZTEgPSByb2xlc09iamVjdC5wcm9maWxlLmluZGV4T2Yocm9sZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlzQ3VycmVudFVzZXJSb2xlMiA9IHJvbGVzT2JqZWN0LmNvbW11bml0eS5pbmRleE9mKHJvbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpc0N1cnJlbnRVc2VyUm9sZTMgPSByb2xlc09iamVjdC5pbXBsaWNpdC5pbmRleE9mKHJvbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpc0N1cnJlbnRVc2VyUm9sZTQgPSByb2xlc09iamVjdC5hZG9wdGlvbi5pbmRleE9mKHJvbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpc0N1cnJlbnRVc2VyUm9sZTUgPSByb2xlc09iamVjdC5zdWJwcm9maWxlLmluZGV4T2Yocm9sZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNDdXJyZW50VXNlclJvbGUxID4gLTEgfHwgaXNDdXJyZW50VXNlclJvbGUyID4gLTEgfHwgaXNDdXJyZW50VXNlclJvbGUzID4gLTEgfHwgaXNDdXJyZW50VXNlclJvbGU0ID4gLTEgfHwgaXNDdXJyZW50VXNlclJvbGU1ID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDdXJyZW50VXNlckV4aXN0SW5HaXZlblJvbGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ3VycmVudFVzZXJFeGlzdEluR2l2ZW5Sb2xlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzQ3VycmVudFVzZXJFeGlzdEluR2l2ZW5Sb2xlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb2RlbC5hc3NpZ25tZW50SGlzdG9yeSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLmFzc2lnbm1lbnRIaXN0b3J5ID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFzc2lnbmVlID0gbW9kZWwuYXNzaWduZWRUbztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFzc2lnbmVlLnVzZXJJZCAhPSBcIlwiICYmIGFzc2lnbmVlLm5hbWUgIT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld09iaiA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYXNzaWduZWUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLmFzc2lnbm1lbnRIaXN0b3J5LnB1c2gobmV3T2JqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduZWUubmFtZSA9IExPQ0FMX1NFVFRJTkdTLlNFU1NJT04uZmlyc3ROYW1lICsgXCIgXCIgKyBMT0NBTF9TRVRUSU5HUy5TRVNTSU9OLmxhc3ROYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25lZS51c2VySWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZCArIFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVlLmRhdGVUaW1lID0gbW9tZW50KCkuZm9ybWF0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVlLnR5cGUgPSBBU1NJR05NRU5UX1RZUEVfQVVUTztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduZWUuZHVlRGF0ZVRpbWUgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduZWUuYnkgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZCArIFwiXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTm90aWZpY2F0aW9uIHRoYXQgaXRzIGJlZW4gYXV0b21hdGljYWxseSBhc3NpZ25lZCB0byB5b3VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9TZW5kIGFzc2lnbiB1c2VyIG5vdGlmaWNhdGlvbiBmcm9tIGhlcmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5vdGlmaWNhdGlvbiA9IEpTT04ueHBhdGgoXCIvcHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzdWJwcm9jZXNzSUQgKyBcIiddL25vdGlmaWNhdGlvbnNcIiwgX1dGSW5zdGFuY2UuY29uZmlnLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChub3RpZmljYXRpb24gIT0gdW5kZWZpbmVkICYmIG5vdGlmaWNhdGlvbi5hc3NpZ25tZW50ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVzZXIgPSB7ICdpZCc6IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkLCAnbmFtZSc6IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcm5hbWUgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbnNNb2R1bGUubm90aWZpY2F0aW9uLmFzc2lnbm1lbnROb3RpZmljYXRpb24obm90aWZpY2F0aW9uLCBfV0ZJbnN0YW5jZSwgc3B1dWlkLCB1c2VyKS50aGVuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1VzZXIgYXNzaWduZWQgc3VjY2Vzc2Z1bGx5LiBVc2VySWQ6IFwiJyArIHVzZXIuaWQgKyAnXCIsIE5hbWU6IFwiJyArIHVzZXIubmFtZSArICdcIicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkuY2F0Y2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oZmFpbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVXNlciBhc3NpZ25tZW50IG5vdGlmaWNhdGlvbiBmYWlsZWQgdG8gdXNlciBVc2VySWQ6IFwiJyArIHVzZXIuaWQgKyAnXCIsIE5hbWU6IFwiJyArIHVzZXIubmFtZSArICdcIicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXNzaWdubWVudCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YXNrLmFzc2lnbi5hc3NpZ25tZW50ICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhc3NpZ25tZW50ID0gbW9kZWwuYXNzaWdubWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjY2VwdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2hvd1wiOiB0YXNrLmFzc2lnbi5hc3NpZ25tZW50LmFjY2VwdC5zaG93LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBfZ2V0TmFtZUJ5TGFuZyh0YXNrLmFzc2lnbi5hc3NpZ25tZW50LmFjY2VwdC5sYWJlbC5pMThuKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQuYWNjZXB0ID0gYWNjZXB0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50Lm1lc3NhZ2UgPSBfZ2V0TmFtZUJ5TGFuZyh0YXNrLmFzc2lnbi5hc3NpZ25tZW50Lm1lc3NhZ2UuaTE4bik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWplY3QgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNob3dcIjogdGFzay5hc3NpZ24uYXNzaWdubWVudC5yZWplY3Quc2hvdyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogX2dldE5hbWVCeUxhbmcodGFzay5hc3NpZ24uYXNzaWdubWVudC5yZWplY3QubGFiZWwuaTE4bilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50LnJlamVjdCA9IHJlamVjdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxlSWRcIjogcHJvZmlsZUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyb2xlSWRcIjogcm9sZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInJvbGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5wcm9maWxlUm9sZUlkID0gaWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzQ3VycmVudFVzZXJFeGlzdEluR2l2ZW5Sb2xlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vRmlyZSBQcmUtd29ya0FjdGlvbnMgaGVyZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm9jZXNzSWQgPSBKU09OLnhwYXRoKFwiL2luc3RhbmNlL3Byb2Nlc3Nlc1tzdWJQcm9jZXNzZXMvdXVpZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWJQcm9jZXNzSWQgPSBKU09OLnhwYXRoKFwiL2luc3RhbmNlL3Byb2Nlc3Nlcy9zdWJQcm9jZXNzZXNbdXVpZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGVwSWQgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXS9zdGVwL2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGVwT2JqZWN0ID0gSlNPTi54cGF0aChcIi9wcm9jZXNzZXNbX2lkIGVxICdcIiArIHByb2Nlc3NJZCArIFwiJ10vc3ViUHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzdWJQcm9jZXNzSWQgKyBcIiddL3N0ZXBzW19pZCBlcSAnXCIgKyBzdGVwSWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLmNvbmZpZywge30pWzBdO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhc2sucHJlV29ya0FjdGlvbnMgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcmVXb3JrQWN0aW9uc09iaiA9IHRhc2sucHJlV29ya0FjdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVXb3JrQWN0aW9ucyhwcmVXb3JrQWN0aW9uc09iaiwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24oc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoJ0Fzc2lnbm1lbnQgaXMgbWFkZS4gUHJlIHdvcmsgYWN0aW9ucyBmb3VuZCBhbmQgZXhlY3V0ZWQgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCdBc3NpZ25tZW50IGlzIG1hZGUuIE5vIHByZSB3b3JrIGFjdGlvbnMgZm91bmQuICcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5vdGlmaWNhdGlvbiB0aGF0IGl0cyBiZWVuIHJlbGVhc2VkIGZvciBhY2NlcHRhbmNlXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5vdGlmaWNhdGlvbiA9IEpTT04ueHBhdGgoXCIvcHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzdWJwcm9jZXNzSUQgKyBcIiddL25vdGlmaWNhdGlvbnNcIiwgX1dGSW5zdGFuY2UuY29uZmlnLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaXNzdWUgaGVyZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobm90aWZpY2F0aW9uICE9IHVuZGVmaW5lZCAmJiBub3RpZmljYXRpb24uYXNzaWdubWVudEFjY2VwdGFuY2UgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdXNlciA9IHsgJ2lkJzogTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQsICduYW1lJzogTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VybmFtZSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uc01vZHVsZS5ub3RpZmljYXRpb24uYWNjZXB0YW5jZU5vdGlmaWNhdGlvbihub3RpZmljYXRpb24sIF9XRkluc3RhbmNlLCBzcHV1aWQsIHJvbGUpLnRoZW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVXNlciBhc3NpZ25lZCBzdWNjZXNzZnVsbHkuIFVzZXJJZDogXCInICsgdXNlci5pZCArICdcIiwgTmFtZTogXCInICsgdXNlci5uYW1lICsgJ1wiJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoJ05vdGlmaWNhdGlvbnMgcmVxdWVzdCBzdWJtaXR0ZWQgZm9yIGFjY2VwdGFuY2UuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKS5jYXRjaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihmYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoJ05vdGlmaWNhdGlvbnMgZmFpbGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVc2VyIGFzc2lnbm1lbnQgbm90aWZpY2F0aW9uIGZhaWxlZCB0byB1c2VyIFVzZXJJZDogXCInICsgdXNlci5pZCArICdcIiwgTmFtZTogXCInICsgdXNlci5uYW1lICsgJ1wiJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoJ05vdGlmaWNhdGlvbnMgbm90IGZvdW5kJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsaXN0Lmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSW1wbGVtZW50IGhlcmUgcHJlV29ya0FjdGlvbiBhcyB0aGlzIGlzIGF1dG9tYXRpY2FsbHkgYXNzaWduZWQgaW4gY2FzZSBvZiAxIHVzZXIgYW5kIHdpbGwgbm90IGdvIHRyb3VnaCBhY2NlcHRhbmNlIGZ1bmN0aW9uLlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVzZXJJZCA9IGxpc3RbMF0uaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVzZXJuYW1lID0gbGlzdFswXS5uYW1lO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vZGVsLmFzc2lnbm1lbnRIaXN0b3J5ID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5hc3NpZ25tZW50SGlzdG9yeSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhc3NpZ25lZSA9IG1vZGVsLmFzc2lnbmVkVG87XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFzc2lnbmVlLnVzZXJJZCAhPSBcIlwiICYmIGFzc2lnbmVlLm5hbWUgIT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3T2JqID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShhc3NpZ25lZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5hc3NpZ25tZW50SGlzdG9yeS5wdXNoKG5ld09iaik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVlLm5hbWUgPSB1c2VybmFtZSArIFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduZWUudXNlcklkID0gdXNlcklkICsgXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25lZS5kYXRlVGltZSA9IG1vbWVudCgpLmZvcm1hdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVlLnR5cGUgPSBBU1NJR05NRU5UX1RZUEVfQVVUTztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25lZS5kdWVEYXRlVGltZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVlLmJ5ID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQgKyBcIlwiO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFzc2lnbm1lbnQgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGFzay5hc3NpZ24uYXNzaWdubWVudCAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXNzaWdubWVudCA9IG1vZGVsLmFzc2lnbm1lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhY2NlcHQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNob3dcIjogdGFzay5hc3NpZ24uYXNzaWdubWVudC5hY2NlcHQuc2hvdyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogX2dldE5hbWVCeUxhbmcodGFzay5hc3NpZ24uYXNzaWdubWVudC5hY2NlcHQubGFiZWwuaTE4bilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50LmFjY2VwdCA9IGFjY2VwdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5tZXNzYWdlID0gX2dldE5hbWVCeUxhbmcodGFzay5hc3NpZ24uYXNzaWdubWVudC5tZXNzYWdlLmkxOG4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVqZWN0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaG93XCI6IHRhc2suYXNzaWduLmFzc2lnbm1lbnQucmVqZWN0LnNob3csXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IF9nZXROYW1lQnlMYW5nKHRhc2suYXNzaWduLmFzc2lnbm1lbnQucmVqZWN0LmxhYmVsLmkxOG4pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5yZWplY3QgPSByZWplY3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZmlsZUlkXCI6IHByb2ZpbGVJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicm9sZUlkXCI6IHJvbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJyb2xlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50LnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQucHJvZmlsZVJvbGVJZCA9IGlkO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTm90aWZpY2F0aW9uIHRoYXQgaXRzIGJlZW4gYXV0b21hdGljYWxseSBhc3NpZ25lZCB0byB5b3VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1NlbmQgYXNzaWduIHVzZXIgbm90aWZpY2F0aW9uIGZyb20gaGVyZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5vdGlmaWNhdGlvbiA9IEpTT04ueHBhdGgoXCIvcHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzdWJwcm9jZXNzSUQgKyBcIiddL25vdGlmaWNhdGlvbnNcIiwgX1dGSW5zdGFuY2UuY29uZmlnLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vdGlmaWNhdGlvbiAhPSB1bmRlZmluZWQgJiYgbm90aWZpY2F0aW9uLmFzc2lnbm1lbnQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1c2VyID0geyAnaWQnOiB1c2VySWQsICduYW1lJzogdXNlcm5hbWUgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uc01vZHVsZS5ub3RpZmljYXRpb24uYXNzaWdubWVudE5vdGlmaWNhdGlvbihub3RpZmljYXRpb24sIF9XRkluc3RhbmNlLCBzcHV1aWQsIHVzZXIpLnRoZW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihzdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1VzZXIgYXNzaWduZWQgc3VjY2Vzc2Z1bGx5LiBVc2VySWQ6IFwiJyArIHVzZXIuaWQgKyAnXCIsIE5hbWU6IFwiJyArIHVzZXIubmFtZSArICdcIicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLmNhdGNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oZmFpbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVc2VyIGFzc2lnbm1lbnQgbm90aWZpY2F0aW9uIGZhaWxlZCB0byB1c2VyIFVzZXJJZDogXCInICsgdXNlci5pZCArICdcIiwgTmFtZTogXCInICsgdXNlci5uYW1lICsgJ1wiJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9GaXJlIFByZS13b3JrQWN0aW9ucyBoZXJlXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvY2Vzc0lkID0gSlNPTi54cGF0aChcIi9pbnN0YW5jZS9wcm9jZXNzZXNbc3ViUHJvY2Vzc2VzL3V1aWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXS9pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWJQcm9jZXNzSWQgPSBKU09OLnhwYXRoKFwiL2luc3RhbmNlL3Byb2Nlc3Nlcy9zdWJQcm9jZXNzZXNbdXVpZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0ZXBJZCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL3N0ZXAvaWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RlcE9iamVjdCA9IEpTT04ueHBhdGgoXCIvcHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBwcm9jZXNzSWQgKyBcIiddL3N1YlByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3ViUHJvY2Vzc0lkICsgXCInXS9zdGVwc1tfaWQgZXEgJ1wiICsgc3RlcElkICsgXCInXVwiLCBfV0ZJbnN0YW5jZS5jb25maWcsIHt9KVswXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YXNrLnByZVdvcmtBY3Rpb25zICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcmVXb3JrQWN0aW9uc09iaiA9IHRhc2sucHJlV29ya0FjdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZVdvcmtBY3Rpb25zKHByZVdvcmtBY3Rpb25zT2JqLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihzdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCdBc3NpZ25lZCB0byB0aGUgb25seSB1c2VyIGluIHJvbGUuIFByZSB3b3JrIGFjdGlvbnMgZXhlY3V0ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCdBc3NpZ25lZCB0byB0aGUgb25seSB1c2VyIGluIHJvbGUuIE5vIHByZSB3b3JrIGFjdGlvbnMgZm91bmQuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ2FzZSB3aGVyZSB1c2VycyBsaXN0ID0gMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhc3NpZ25lZSA9IG1vZGVsLmFzc2lnbmVkVG87XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduZWUubmFtZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduZWUudXNlcklkID0gXCJcIjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhc3NpZ25tZW50ID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhc2suYXNzaWduLmFzc2lnbm1lbnQgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFzc2lnbm1lbnQgPSBtb2RlbC5hc3NpZ25tZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWNjZXB0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaG93XCI6IHRhc2suYXNzaWduLmFzc2lnbm1lbnQuYWNjZXB0LnNob3csXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IF9nZXROYW1lQnlMYW5nKHRhc2suYXNzaWduLmFzc2lnbm1lbnQuYWNjZXB0LmxhYmVsLmkxOG4pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5hY2NlcHQgPSBhY2NlcHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQubWVzc2FnZSA9IF9nZXROYW1lQnlMYW5nKHRhc2suYXNzaWduLmFzc2lnbm1lbnQubWVzc2FnZS5pMThuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlamVjdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2hvd1wiOiB0YXNrLmFzc2lnbi5hc3NpZ25tZW50LnJlamVjdC5zaG93LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBfZ2V0TmFtZUJ5TGFuZyh0YXNrLmFzc2lnbi5hc3NpZ25tZW50LnJlamVjdC5sYWJlbC5pMThuKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQucmVqZWN0ID0gcmVqZWN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb2ZpbGVJZFwiOiBwcm9maWxlSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJvbGVJZFwiOiByb2xlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwicm9sZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50LnByb2ZpbGVSb2xlSWQgPSBpZDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1dpbGwgYmUgZmlyZWQgZnJvbSBUYWtlQXNzaWdubWVudCBwYXRoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShcIk5vIHVzZXJzIGZvdW5kIGluIGxpc3QuIEFzc2lnbmluZyBibGFuayBcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIGluIGdldFVzZXJzTGlzdEJ5Um9sZSB1bmRlZmluZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIGluIGdldFVzZXJzTGlzdEJ5Um9sZScpO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFzay5hc3NpZ24udXNlciAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgIGhlbHBlci5nZXROb2RlVmFsdWUodGFzay5hc3NpZ24udXNlci51c2VyTmFtZSwgX1dGSW5zdGFuY2UsIHNwdXVpZCkudGhlbihmdW5jdGlvbih1c2VyTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBoZWxwZXIuZ2V0Tm9kZVZhbHVlKHRhc2suYXNzaWduLnVzZXIudXNlcklkLCBfV0ZJbnN0YW5jZSwgc3B1dWlkKS50aGVuKGZ1bmN0aW9uKHVzZXJJZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdXNlcklkID0gdXNlcklkO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVzZXJuYW1lID0gdXNlck5hbWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtb2RlbC5hc3NpZ25tZW50SGlzdG9yeSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5hc3NpZ25tZW50SGlzdG9yeSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXNzaWduZWUgPSBtb2RlbC5hc3NpZ25lZFRvO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFzc2lnbmVlLnVzZXJJZCAhPSBcIlwiICYmIGFzc2lnbmVlLm5hbWUgIT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdPYmogPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGFzc2lnbmVlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuYXNzaWdubWVudEhpc3RvcnkucHVzaChuZXdPYmopO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduZWUubmFtZSA9IHVzZXJuYW1lICsgXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVlLnVzZXJJZCA9IHVzZXJJZCArIFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25lZS5kYXRlVGltZSA9IG1vbWVudCgpLmZvcm1hdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduZWUudHlwZSA9IEFTU0lHTk1FTlRfVFlQRV9BVVRPO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduZWUuZHVlRGF0ZVRpbWUgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVlLmJ5ID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQgKyBcIlwiO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXNzaWdubWVudCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhc2suYXNzaWduLmFzc2lnbm1lbnQgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXNzaWdubWVudCA9IG1vZGVsLmFzc2lnbm1lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjY2VwdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaG93XCI6IHRhc2suYXNzaWduLmFzc2lnbm1lbnQuYWNjZXB0LnNob3csXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogX2dldE5hbWVCeUxhbmcodGFzay5hc3NpZ24uYXNzaWdubWVudC5hY2NlcHQubGFiZWwuaTE4bilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5hY2NlcHQgPSBhY2NlcHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5tZXNzYWdlID0gX2dldE5hbWVCeUxhbmcodGFzay5hc3NpZ24uYXNzaWdubWVudC5tZXNzYWdlLmkxOG4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWplY3QgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2hvd1wiOiB0YXNrLmFzc2lnbi5hc3NpZ25tZW50LnJlamVjdC5zaG93LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IF9nZXROYW1lQnlMYW5nKHRhc2suYXNzaWduLmFzc2lnbm1lbnQucmVqZWN0LmxhYmVsLmkxOG4pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQucmVqZWN0ID0gcmVqZWN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxlSWRcIjogcHJvZmlsZUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJvbGVJZFwiOiByb2xlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJyb2xlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQucHJvZmlsZVJvbGVJZCA9IGlkO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBOb3RpZmljYXRpb24gdGhhdCBpdHMgYmVlbiBhdXRvbWF0aWNhbGx5IGFzc2lnbmVkIHRvIHlvdVxuICAgICAgICAgICAgICAgICAgICAgICAgLy9TZW5kIGFzc2lnbiB1c2VyIG5vdGlmaWNhdGlvbiBmcm9tIGhlcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBub3RpZmljYXRpb24gPSBKU09OLnhwYXRoKFwiL3Byb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3VicHJvY2Vzc0lEICsgXCInXS9ub3RpZmljYXRpb25zXCIsIF9XRkluc3RhbmNlLmNvbmZpZywge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vdGlmaWNhdGlvbiAhPSB1bmRlZmluZWQgJiYgbm90aWZpY2F0aW9uLmFzc2lnbm1lbnQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVzZXIgPSB7ICdpZCc6IHVzZXJJZCwgJ25hbWUnOiB1c2VybmFtZSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbnNNb2R1bGUubm90aWZpY2F0aW9uLmFzc2lnbm1lbnROb3RpZmljYXRpb24obm90aWZpY2F0aW9uLCBfV0ZJbnN0YW5jZSwgc3B1dWlkLCB1c2VyKS50aGVuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihzdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVXNlciBhc3NpZ25lZCBzdWNjZXNzZnVsbHkuIFVzZXJJZDogXCInICsgdXNlci5pZCArICdcIiwgTmFtZTogXCInICsgdXNlci5uYW1lICsgJ1wiJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLmNhdGNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihmYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVXNlciBhc3NpZ25tZW50IG5vdGlmaWNhdGlvbiBmYWlsZWQgdG8gdXNlciBVc2VySWQ6IFwiJyArIHVzZXIuaWQgKyAnXCIsIE5hbWU6IFwiJyArIHVzZXIubmFtZSArICdcIicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vRmlyZSBQcmUtd29ya0FjdGlvbnMgaGVyZVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb2Nlc3NJZCA9IEpTT04ueHBhdGgoXCIvaW5zdGFuY2UvcHJvY2Vzc2VzW3N1YlByb2Nlc3Nlcy91dWlkIGVxICdcIiArIHNwdXVpZCArIFwiJ10vaWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWJQcm9jZXNzSWQgPSBKU09OLnhwYXRoKFwiL2luc3RhbmNlL3Byb2Nlc3Nlcy9zdWJQcm9jZXNzZXNbdXVpZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RlcElkID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHNwdXVpZCArIFwiJ10vc3RlcC9pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0ZXBPYmplY3QgPSBKU09OLnhwYXRoKFwiL3Byb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgcHJvY2Vzc0lkICsgXCInXS9zdWJQcm9jZXNzZXNbX2lkIGVxICdcIiArIHN1YlByb2Nlc3NJZCArIFwiJ10vc3RlcHNbX2lkIGVxICdcIiArIHN0ZXBJZCArIFwiJ11cIiwgX1dGSW5zdGFuY2UuY29uZmlnLCB7fSlbMF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YXNrLnByZVdvcmtBY3Rpb25zICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByZVdvcmtBY3Rpb25zT2JqID0gdGFzay5wcmVXb3JrQWN0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVXb3JrQWN0aW9ucyhwcmVXb3JrQWN0aW9uc09iaiwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24oc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCdBc3NpZ25lZCB0byB0aGUgb25seSB1c2VyIGluIHJvbGUuIFByZSB3b3JrIGFjdGlvbnMgZXhlY3V0ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgnQXNzaWduZWQgdG8gdGhlIG9ubHkgdXNlciBpbiByb2xlLiBObyBwcmUgd29yayBhY3Rpb25zIGZvdW5kLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmICh0YXNrLmFzc2lnbi5zd2ltbGFuZSAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgIHZhciBzdGVwSWQgPSB0YXNrLmFzc2lnbi5zd2ltbGFuZS5zdGVwSWQ7XG4gICAgICAgICAgICAgICAgdmFyIHNlcXVlbmNlID0gdGFzay5hc3NpZ24uc3dpbWxhbmUuc2VxdWVuY2U7XG5cbiAgICAgICAgICAgICAgICB2YXIgc3ViUHJvY2VzcyA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgdmFyIGhpc3RvcnlMaXN0ID0gSlNPTi54cGF0aChcIi9oaXN0b3J5W2lkIGVxICdcIiArIHN0ZXBJZCArIFwiJ11cIiwgc3ViUHJvY2Vzcywge30pO1xuICAgICAgICAgICAgICAgIHZhciBkYXRlU2VhcmNoID0gJyc7XG4gICAgICAgICAgICAgICAgaWYgKHNlcXVlbmNlID09ICdsYXN0Jykge1xuICAgICAgICAgICAgICAgICAgICBkYXRlU2VhcmNoID0gSlNPTi54cGF0aChcIm1heChmb3IgJHMgaW4gLyogcmV0dXJuIHhzOmRhdGVUaW1lKCRzL2RhdGVUaW1lQ3JlYXRlZCkpXCIsIGhpc3RvcnlMaXN0LCB7fSlbMF07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZVNlYXJjaCA9IEpTT04ueHBhdGgoXCJtaW4oZm9yICRzIGluIC8qIHJldHVybiB4czpkYXRlVGltZSgkcy9kYXRlVGltZUNyZWF0ZWQpKVwiLCBoaXN0b3J5TGlzdCwge30pWzBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgaGlzdG9yeU9iamVjdCA9IEpTT04ueHBhdGgoXCIvKltkYXRlVGltZUNyZWF0ZWQgZXEgJ1wiICsgZGF0ZVNlYXJjaCArIFwiJ11cIiwgaGlzdG9yeUxpc3QsIHt9KVswXTtcbiAgICAgICAgICAgICAgICB2YXIgYXNzaWdubWVudE9iamVjdCA9IEpTT04ueHBhdGgoXCIvYXNzaWdubWVudEhpc3RvcnlbbGFzdCgpXVwiLCBoaXN0b3J5T2JqZWN0LCB7fSlbMF07XG5cbiAgICAgICAgICAgICAgICB2YXIgdXNlcklkID0gYXNzaWdubWVudE9iamVjdC51c2VySWQ7XG4gICAgICAgICAgICAgICAgdmFyIHVzZXJuYW1lID0gYXNzaWdubWVudE9iamVjdC5uYW1lO1xuXG4gICAgICAgICAgICAgICAgaWYgKG1vZGVsLmFzc2lnbm1lbnRIaXN0b3J5ID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBtb2RlbC5hc3NpZ25tZW50SGlzdG9yeSA9IFtdO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBhc3NpZ25lZSA9IG1vZGVsLmFzc2lnbmVkVG87XG4gICAgICAgICAgICAgICAgaWYgKGFzc2lnbmVlLnVzZXJJZCAhPSBcIlwiICYmIGFzc2lnbmVlLm5hbWUgIT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3T2JqID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShhc3NpZ25lZSkpO1xuICAgICAgICAgICAgICAgICAgICBtb2RlbC5hc3NpZ25tZW50SGlzdG9yeS5wdXNoKG5ld09iaik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFzc2lnbmVlLm5hbWUgPSB1c2VybmFtZSArIFwiXCI7XG4gICAgICAgICAgICAgICAgYXNzaWduZWUudXNlcklkID0gdXNlcklkICsgXCJcIjtcbiAgICAgICAgICAgICAgICBhc3NpZ25lZS5kYXRlVGltZSA9IG1vbWVudCgpLmZvcm1hdCgpO1xuICAgICAgICAgICAgICAgIGFzc2lnbmVlLnR5cGUgPSBBU1NJR05NRU5UX1RZUEVfU1dJTUxBTkU7XG4gICAgICAgICAgICAgICAgYXNzaWduZWUuZHVlRGF0ZVRpbWUgPSAnJztcbiAgICAgICAgICAgICAgICBhc3NpZ25lZS5ieSA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkICsgXCJcIjtcblxuICAgICAgICAgICAgICAgIHZhciBhc3NpZ25tZW50ID0gJyc7XG4gICAgICAgICAgICAgICAgaWYgKHRhc2suYXNzaWduLmFzc2lnbm1lbnQgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGFzc2lnbm1lbnQgPSBtb2RlbC5hc3NpZ25tZW50O1xuICAgICAgICAgICAgICAgICAgICB2YXIgYWNjZXB0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJzaG93XCI6IHRhc2suYXNzaWduLmFzc2lnbm1lbnQuYWNjZXB0LnNob3csXG4gICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IF9nZXROYW1lQnlMYW5nKHRhc2suYXNzaWduLmFzc2lnbm1lbnQuYWNjZXB0LmxhYmVsLmkxOG4pXG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5hY2NlcHQgPSBhY2NlcHQ7XG4gICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQubWVzc2FnZSA9IF9nZXROYW1lQnlMYW5nKHRhc2suYXNzaWduLmFzc2lnbm1lbnQubWVzc2FnZS5pMThuKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlamVjdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic2hvd1wiOiB0YXNrLmFzc2lnbi5hc3NpZ25tZW50LnJlamVjdC5zaG93LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBfZ2V0TmFtZUJ5TGFuZyh0YXNrLmFzc2lnbi5hc3NpZ25tZW50LnJlamVjdC5sYWJlbC5pMThuKVxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQucmVqZWN0ID0gcmVqZWN0O1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInByb2ZpbGVJZFwiOiBwcm9maWxlSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInJvbGVJZFwiOiByb2xlLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwicm9sZVwiXG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50LnByb2ZpbGVSb2xlSWQgPSBpZDtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBOb3RpZmljYXRpb24gdGhhdCBpdHMgYmVlbiBhdXRvbWF0aWNhbGx5IGFzc2lnbmVkIHRvIHlvdVxuICAgICAgICAgICAgICAgIC8vU2VuZCBhc3NpZ24gdXNlciBub3RpZmljYXRpb24gZnJvbSBoZXJlXG4gICAgICAgICAgICAgICAgdmFyIG5vdGlmaWNhdGlvbiA9IEpTT04ueHBhdGgoXCIvcHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzdWJwcm9jZXNzSUQgKyBcIiddL25vdGlmaWNhdGlvbnNcIiwgX1dGSW5zdGFuY2UuY29uZmlnLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgaWYgKG5vdGlmaWNhdGlvbiAhPSB1bmRlZmluZWQgJiYgbm90aWZpY2F0aW9uLmFzc2lnbm1lbnQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB1c2VyID0geyAnaWQnOiB1c2VySWQsICduYW1lJzogdXNlcm5hbWUgfTtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uc01vZHVsZS5ub3RpZmljYXRpb24uYXNzaWdubWVudE5vdGlmaWNhdGlvbihub3RpZmljYXRpb24sIF9XRkluc3RhbmNlLCBzcHV1aWQsIHVzZXIpLnRoZW4oXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihzdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1VzZXIgYXNzaWduZWQgc3VjY2Vzc2Z1bGx5LiBVc2VySWQ6IFwiJyArIHVzZXIuaWQgKyAnXCIsIE5hbWU6IFwiJyArIHVzZXIubmFtZSArICdcIicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApLmNhdGNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oZmFpbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVc2VyIGFzc2lnbm1lbnQgbm90aWZpY2F0aW9uIGZhaWxlZCB0byB1c2VyIFVzZXJJZDogXCInICsgdXNlci5pZCArICdcIiwgTmFtZTogXCInICsgdXNlci5uYW1lICsgJ1wiJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vRmlyZSBQcmUtd29ya0FjdGlvbnMgaGVyZVxuICAgICAgICAgICAgICAgIHZhciBwcm9jZXNzSWQgPSBKU09OLnhwYXRoKFwiL2luc3RhbmNlL3Byb2Nlc3Nlc1tzdWJQcm9jZXNzZXMvdXVpZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgdmFyIHN1YlByb2Nlc3NJZCA9IEpTT04ueHBhdGgoXCIvaW5zdGFuY2UvcHJvY2Vzc2VzL3N1YlByb2Nlc3Nlc1t1dWlkIGVxICdcIiArIHNwdXVpZCArIFwiJ10vaWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICB2YXIgc3RlcElkID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHNwdXVpZCArIFwiJ10vc3RlcC9pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgIHZhciBzdGVwT2JqZWN0ID0gSlNPTi54cGF0aChcIi9wcm9jZXNzZXNbX2lkIGVxICdcIiArIHByb2Nlc3NJZCArIFwiJ10vc3ViUHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzdWJQcm9jZXNzSWQgKyBcIiddL3N0ZXBzW19pZCBlcSAnXCIgKyBzdGVwSWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLmNvbmZpZywge30pWzBdO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRhc2sucHJlV29ya0FjdGlvbnMgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHByZVdvcmtBY3Rpb25zT2JqID0gdGFzay5wcmVXb3JrQWN0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgcHJlV29ya0FjdGlvbnMocHJlV29ya0FjdGlvbnNPYmosIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoJ0Fzc2lnbmVkIHRvIHRoZSBvbmx5IHVzZXIgaW4gcm9sZS4gUHJlIHdvcmsgYWN0aW9ucyBleGVjdXRlZCcpO1xuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoJ0Fzc2lnbmVkIHRvIHRoZSBvbmx5IHVzZXIgaW4gcm9sZS4gTm8gcHJlIHdvcmsgYWN0aW9ucyBmb3VuZC4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcblxuXG5cbi8qKlxuICogUHJvY2VzcyB0YXNrc1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSB0YXNrIC0gdGhlIHRhc2sgY29uZmlnIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dERhdGEgLSB0aGUgdXNlciBpbnB1dCBkYXRhXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiBzZXJ2ZXIoc2VydmVyLCBwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3ViUHJvY2VzcywgbW9kZWwsIF9XRkluc3RhbmNlLCBkYXRhLCB1dWlkKSB7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgLy92YXIgX1dGSW5zdGFuY2UgPSBhcHAuU0NPUEUud29ya2Zsb3c7XG4gICAgICAgIHZhciBwcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xuICAgICAgICB2YXIgYWN0aW9uQmxvY2sgPSBzZXJ2ZXIuc2VydmVyQWN0aW9uWzBdO1xuICAgICAgICBpZiAobW9kZWwuYXNzaWdubWVudEhpc3RvcnkgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBtb2RlbC5hc3NpZ25tZW50SGlzdG9yeSA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGFzc2lnbmVlID0gbW9kZWwuYXNzaWduZWRUbztcbiAgICAgICAgaWYgKGFzc2lnbmVlLnVzZXJJZCAhPSBcIlwiICYmIGFzc2lnbmVlLm5hbWUgIT0gXCJcIikge1xuICAgICAgICAgICAgdmFyIG5ld09iaiA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYXNzaWduZWUpKTtcbiAgICAgICAgICAgIG1vZGVsLmFzc2lnbm1lbnRIaXN0b3J5LnB1c2gobmV3T2JqKTtcbiAgICAgICAgfVxuICAgICAgICBhc3NpZ25lZS5uYW1lID0gTE9DQUxfU0VUVElOR1MuU0VTU0lPTi5maXJzdE5hbWUgKyBcIiBcIiArIExPQ0FMX1NFVFRJTkdTLlNFU1NJT04ubGFzdE5hbWU7XG4gICAgICAgIGFzc2lnbmVlLnVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkICsgXCJcIjtcbiAgICAgICAgYXNzaWduZWUuZGF0ZVRpbWUgPSBtb21lbnQoKS5mb3JtYXQoKTtcbiAgICAgICAgYXNzaWduZWUudHlwZSA9IEFTU0lHTk1FTlRfVFlQRV9BVVRPO1xuICAgICAgICBhc3NpZ25lZS5kdWVEYXRlVGltZSA9ICcnO1xuICAgICAgICBhc3NpZ25lZS5ieSA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkICsgXCJcIjtcblxuICAgICAgICBhY3Rpb24oYWN0aW9uQmxvY2ssIHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdWJQcm9jZXNzLCBtb2RlbCwgX1dGSW5zdGFuY2UsIGRhdGEsIHV1aWQpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKFwiTm8gdXNlcnMgZm91bmQgaW4gbGlzdC4gQXNzaWduaW5nIGJsYW5rIFwiKTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgIHJlamVjdChcIlNlcnZlciBhY3Rpb24gZXJyb3IgZm91bmQgcmVqZWN0ZWRcIilcbiAgICAgICAgICAgIH0pO1xuICAgIH0pO1xuXG59O1xuXG4vKipcbiAqIFByb2Nlc3MgdHJhbnNpdGlvblxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBwcm9jZXNzIGlkXG4gKiBAcGFyYW0ge251bWJlcn0gcHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBwcm9jZXNzIHNlcVxuICogQHBhcmFtIHtzdHJpbmd9IHN1YlByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN1Yi1wcm9jZXNzIGlkXG4gKiBAcGFyYW0ge251bWJlcn0gc3ViUHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBzdWItcHJvY2VzcyBzZXFcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdGVwSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdGVwIGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gdHJhbnNpdGlvbklkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gdHJhbnNpdGlvbiBpZFxuICogQHBhcmFtIHtvYmplY3R9IGRhdGEgLSBhbnkgYWRkaXRpb25hbCBkYXRhIHBhc3NlZCBpbiBhcyBrZXkgdmFsdWUgcGFpcnNcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiB0cmFuc2l0aW9uKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdGVwSWQsIHRyYW5zaXRpb25JZCwgZGF0YSwgX1dGSW5zdGFuY2UsIHNwdXVpZCwgbW9kZWwpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgc3RlcFNlcSA9IDA7XG4gICAgICAgICAgICB2YXIgbmV4dFN0ZXBJZCA9ICcnO1xuICAgICAgICAgICAgdmFyIG5leHRTdGVwU2VxID0gMDtcbiAgICAgICAgICAgIHZhciBzdWJQcm9jZXNzID0gW107XG4gICAgICAgICAgICB2YXIgY3VycmVudFByb2Nlc3MgPSBfV0ZJbnN0YW5jZS5jb25maWcucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmpQcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9ialByb2Nlc3MuX2lkID09IHByb2Nlc3NJZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqUHJvY2VzcztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRTdWJQcm9jZXNzID0gY3VycmVudFByb2Nlc3NbMF0uc3ViUHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmpTdWJQcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9ialN1YlByb2Nlc3MuX2lkID09IHN1YlByb2Nlc3NJZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqU3ViUHJvY2VzcztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRTdGVwID0gY3VycmVudFN1YlByb2Nlc3NbMF0uc3RlcHMuZmlsdGVyKGZ1bmN0aW9uKG9ialN0ZXApIHtcbiAgICAgICAgICAgICAgICBpZiAob2JqU3RlcC5faWQgPT0gc3RlcElkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmpTdGVwO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgdHJhbnNpdGlvbiA9IGN1cnJlbnRTdGVwWzBdLnRyYW5zaXRpb24uZmlsdGVyKGZ1bmN0aW9uKG9ialRyYW5zaXRpb24pIHtcbiAgICAgICAgICAgICAgICBpZiAob2JqVHJhbnNpdGlvbi5faWQgPT0gdHJhbnNpdGlvbklkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmpUcmFuc2l0aW9uO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGN1cnJlbnRTdWJQcm9jZXNzWzBdLnN0ZXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRTdWJQcm9jZXNzWzBdLnN0ZXBzW2ldLl9pZCA9PSBzdGVwSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RlcFNlcSA9IHBhcnNlSW50KGN1cnJlbnRTdWJQcm9jZXNzWzBdLnN0ZXBzW2ldLl9zZXEpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjdXJyZW50U3ViUHJvY2Vzc1swXS5zdGVwcy5maWx0ZXIoZnVuY3Rpb24oc3RlcEl0ZW0pIHtcbiAgICAgICAgICAgICAgICBuZXh0U3RlcFNlcSA9IHN0ZXBTZXEgKyAxO1xuICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChzdGVwSXRlbS5fc2VxKSA9PSBuZXh0U3RlcFNlcSkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0U3RlcElkID0gc3RlcEl0ZW0uX2lkO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSlcblxuXG5cblxuICAgICAgICAgICAgdmFyIG1heFN0ZXBzID0gY3VycmVudFN1YlByb2Nlc3NbMF0uc3RlcHMubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIHNwaW5zdGFuY2VPYmplY3QgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgdmFyIHNwSW5zdGFuY2VTdGVwT2JqZWN0ID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHNwdXVpZCArIFwiJ10vc3RlcFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuXG4gICAgICAgICAgICAvLyBBZGRpbmcgc3RlcCBPYmplY3QgaW4gc3VicHJvY2VzcyBoaXN0b3J5IEZyb20gc2Vjb25kIHN0ZXAuIEFzIGZpcnN0IHN0ZXAgaXMgYWRkZWQgYXQgc3ViUHJvY2VzcygpIGZ1bmN0aW9uIFxuICAgICAgICAgICAgaWYgKHNwaW5zdGFuY2VPYmplY3QuaGlzdG9yeSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzcGluc3RhbmNlT2JqZWN0Lmhpc3RvcnkgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBwdXNoSW5kaWNhdG9yVG9Nb2RlbCA9IGZ1bmN0aW9uKG1vZGVsKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBJbiBib3RoICB0aGUgY2FzZXMgdGhlIGxpc3QgaXMgZGlmZmVybmV0IHRoYXQgbmVlZHMgdG8gYmUgbWFkZSBzYW1lLlxuXG4gICAgICAgICAgICAgICAgdmFyIGluZGljYXRvckxpc3QgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXS9pbmRpY2F0b3JzXCIsIF9XRkluc3RhbmNlLCB7fSk7XG4gICAgICAgICAgICAgICAgdmFyIGlzRmlyc3QgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoaW5kaWNhdG9yTGlzdCA9PSB1bmRlZmluZWQgfHwgaW5kaWNhdG9yTGlzdC5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBpc0ZpcnN0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgaW5kaWNhdG9yTGlzdCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1t3b3JrZmxvd3MvcHJvY2Vzc2VzW3N1YlByb2Nlc3NVVUlEIGVxICdcIiArIHNwdXVpZCArIFwiJ11dXCIsIF9XRkluc3RhbmNlLCB7fSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChtb2RlbC5pbmRpY2F0b3JzID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBtb2RlbC5pbmRpY2F0b3JzID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaW5kaWNhdG9yTGlzdC5sZW5ndGg7IGorKykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0ZpcnN0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1dWlkID0gaW5kaWNhdG9yTGlzdFtqXS5faWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmV2ID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9fcmV2XCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VxID0gaW5kaWNhdG9yTGlzdFtqXS5tb2RlbC5wZW5kaW5nLnNlcTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGF0dXMgPSBpbmRpY2F0b3JMaXN0W2pdLm1vZGVsLnBlbmRpbmcuc3RhdHVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZE9iamVjdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dWlkOiB1dWlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldjogcmV2LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcTogc2VxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5pbmRpY2F0b3JzLnB1c2goaW5kT2JqZWN0KTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdXVpZCA9IGluZGljYXRvckxpc3Rbal0uaW5zdGFuY2VzWzBdLnV1aWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmV2ID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9fcmV2XCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VxID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9tb2RlbC9wZW5kaW5nL3NlcVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXR1cyA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vbW9kZWwvcGVuZGluZy9zdGF0dXNcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRPYmplY3QgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXVpZDogdXVpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXY6IHJldixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXE6IHNlcSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuaW5kaWNhdG9ycy5wdXNoKGluZE9iamVjdCk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkZWxldGUgbW9kZWwuYXNzaWduZWRUbztcbiAgICAgICAgICAgICAgICBkZWxldGUgbW9kZWwuYXNzaWdubWVudDtcbiAgICAgICAgICAgICAgICByZXR1cm4gbW9kZWw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGFkZCBpbmZvcm1hdGlvbiB0byB0cmFuc3Rpb24gb2JqZWN0LlxuICAgICAgICAgICAgdmFyIHRybk9iamVjdCA9IHtcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uSWQ6IHRyYW5zaXRpb25bMF0uX2lkLFxuICAgICAgICAgICAgICAgIGRhdGVUaW1lOiBtb21lbnQoKS5mb3JtYXQoKSxcbiAgICAgICAgICAgICAgICB1c2VySWQ6IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkICsgXCJcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1vZGVsICE9IHVuZGVmaW5lZCAmJiBPYmplY3Qua2V5cyhtb2RlbCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIG1vZGVsLnRyYW5zaXRpb24gPSB0cm5PYmplY3Q7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNwSW5zdGFuY2VTdGVwT2JqZWN0LnRyYW5zaXRpb24gPSB0cm5PYmplY3Q7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNvcHkgY3VycmVudCBhc3NpZ25lZFRvIHRvIHJlQXNzaWdubWVudCBvYmplY3RcblxuICAgICAgICAgICAgaWYgKG1vZGVsICE9IHVuZGVmaW5lZCAmJiBPYmplY3Qua2V5cyhtb2RlbCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGlmIChtb2RlbC5hc3NpZ25tZW50SGlzdG9yeSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwuYXNzaWdubWVudEhpc3RvcnkgPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGFzc2lnbmVlT2JqID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShtb2RlbC5hc3NpZ25lZFRvKSk7XG4gICAgICAgICAgICAgICAgaWYgKGFzc2lnbmVlT2JqLnVzZXJJZCAhPSBcIlwiICYmIGFzc2lnbmVlT2JqLm5hbWUgIT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgICBtb2RlbC5hc3NpZ25tZW50SGlzdG9yeS5wdXNoKGFzc2lnbmVlT2JqKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHNwSW5zdGFuY2VTdGVwT2JqZWN0LmFzc2lnbm1lbnRIaXN0b3J5ID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBzcEluc3RhbmNlU3RlcE9iamVjdC5hc3NpZ25tZW50SGlzdG9yeSA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgYXNzaWduZWVPYmogPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHNwSW5zdGFuY2VTdGVwT2JqZWN0LmFzc2lnbmVkVG8pKTtcbiAgICAgICAgICAgICAgICBpZiAoYXNzaWduZWVPYmoudXNlcklkICE9IFwiXCIgJiYgYXNzaWduZWVPYmoubmFtZSAhPSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHNwSW5zdGFuY2VTdGVwT2JqZWN0LmFzc2lnbm1lbnRIaXN0b3J5LnB1c2goYXNzaWduZWVPYmopO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGhpc3RvcnlNb2RlbDtcbiAgICAgICAgICAgIGlmIChtb2RlbCAhPSB1bmRlZmluZWQgJiYgT2JqZWN0LmtleXMobW9kZWwpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBoaXN0b3J5TW9kZWwgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG1vZGVsKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGhpc3RvcnlNb2RlbCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoc3BJbnN0YW5jZVN0ZXBPYmplY3QpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBpbmRNb2RlbEluU3RlcCA9IHB1c2hJbmRpY2F0b3JUb01vZGVsKGhpc3RvcnlNb2RlbCk7XG4gICAgICAgICAgICBzcGluc3RhbmNlT2JqZWN0Lmhpc3RvcnkucHVzaChpbmRNb2RlbEluU3RlcCk7XG5cbiAgICAgICAgICAgIGlmICh0cmFuc2l0aW9uWzBdLnRyYW5zaXRpb25BY3Rpb24uZ29Ub1N0ZXAgIT0gdW5kZWZpbmVkKSB7XG5cblxuXG4gICAgICAgICAgICAgICAgdmFyIG5leHRTZXEgPSBwYXJzZUludChjdXJyZW50U3RlcFswXS5fc2VxKSArIHBhcnNlSW50KHRyYW5zaXRpb25bMF0udHJhbnNpdGlvbkFjdGlvbi5nb1RvU3RlcC5kZWZhdWx0KTtcbiAgICAgICAgICAgICAgICB2YXIgbmV4dElkID0gJyc7XG4gICAgICAgICAgICAgICAgY3VycmVudFN1YlByb2Nlc3NbMF0uc3RlcHMuZmlsdGVyKGZ1bmN0aW9uKHN0ZXBJdGVtKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KHN0ZXBJdGVtLl9zZXEpID09IG5leHRTdGVwU2VxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0SWQgPSBzdGVwSXRlbS5faWQ7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgc3RlcChwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgbmV4dElkLCBuZXh0U2VxLCBkYXRhLCBfV0ZJbnN0YW5jZSwgc3B1dWlkKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFNlcSA9PSBtYXhTdGVwcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0FsbCBTdGVwIHRyYW5zaXRpb25zIGhhdmUgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc0NvbXBsZXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXA6IHJlc3VsdC5kYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdTdGVwIHRyYW5zaXRpb24gY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc0NvbXBsZXRlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwOiByZXN1bHQuZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmICh0cmFuc2l0aW9uWzBdLnRyYW5zaXRpb25BY3Rpb24uZ29Ub1N0ZXBJZCAhPSB1bmRlZmluZWQpIHtcblxuXG5cbiAgICAgICAgICAgICAgICB2YXIgZ29Ub1N0ZXBJZCA9IHRyYW5zaXRpb25bMF0udHJhbnNpdGlvbkFjdGlvbi5nb1RvU3RlcElkLnN0ZXBJZDtcbiAgICAgICAgICAgICAgICB2YXIgZ29Ub1N0ZXBTZXEgPSAxO1xuXG4gICAgICAgICAgICAgICAgY3VycmVudFN1YlByb2Nlc3NbMF0uc3RlcHMuZmlsdGVyKGZ1bmN0aW9uKHN0ZXBJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGVwSXRlbS5faWQgPT0gZ29Ub1N0ZXBJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ29Ub1N0ZXBTZXEgPSBwYXJzZUludChzdGVwSXRlbS5fc2VxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBzdGVwKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBnb1RvU3RlcElkLCBnb1RvU3RlcFNlcSwgZGF0YSwgX1dGSW5zdGFuY2UsIHNwdXVpZCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdvVG9TdGVwU2VxID09IG1heFN0ZXBzIHx8IHJlc3VsdC5kYXRhLnN0YXR1cyA9PSAnQ29tcGxldGUnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdBbGwgU3RlcCB0cmFuc2l0aW9ucyBoYXZlIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NDb21wbGV0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwOiByZXN1bHQuZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdTdGVwIHRyYW5zaXRpb24gY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc0NvbXBsZXRlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwOiByZXN1bHQuZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHJhbnNpdGlvblswXS50cmFuc2l0aW9uQWN0aW9uLnN0b3AgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBBcyB0aGlzIGlzIHRoZSBsYXN0IHN0ZXAgKHdoZXJlIHN0b3AgaXMgZGVmaWVkKSAsIHN1YlByb2Nlc3MgcG9zdEFjdGlvbnMgc2hvdWxkIGNvbWUgaGVyZS5cblxuICAgICAgICAgICAgICAgIHZhciBwb3N0QWN0aW9uc0NvbmYgPSBjdXJyZW50UHJvY2Vzc1swXS5wb3N0QWN0aW9ucztcbiAgICAgICAgICAgICAgICBwb3N0QWN0aW9ucyhwb3N0QWN0aW9uc0NvbmYsIF9XRkluc3RhbmNlLCBzcHV1aWQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1N0ZXAgdHJhbnNpdGlvbiBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LldvcmtmbG93IHN0b3BwZWQuJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc0NvbXBsZXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcDogbW9kZWxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG5cbiAgICB9KTtcbn07XG5cbi8qKlxuICogUHJvY2VzcyBwb3N0QWN0aW9uc1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBwb3N0QWN0aW9ucyAtIHRoZSBwb3N0QWN0aW9ucyBjb25maWcgZGF0YVxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuZnVuY3Rpb24gcG9zdEFjdGlvbnMocG9zdEFjdGlvbnMsIF9XRkluc3RhbmNlLCBzcHV1aWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciBjb21wbGV0ZWQgPSBbXTtcbiAgICAgICAgdHJ5IHtcblxuXG4gICAgICAgICAgICB2YXIgc3BPYmplY3QgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgdmFyIHByb2Nlc3NJRCA9IHNwT2JqZWN0W1wibWV0YS1kYXRhXCJdLnByb2Nlc3NDb25maWdJZDtcbiAgICAgICAgICAgIHZhciBwcm9jZXNzSWQgPSBzcE9iamVjdFtcIm1ldGEtZGF0YVwiXS5zdWJQcm9jZXNzQ29uZmlnSWQ7XG4gICAgICAgICAgICB2YXIgcHJvY2Vzc1NFUSA9IHNwT2JqZWN0W1wibWV0YS1kYXRhXCJdLnN1YlByb2Nlc3NJbnNTZXE7XG4gICAgICAgICAgICB2YXIgcHJvY2Vzc1NlcSA9IHNwT2JqZWN0W1wibWV0YS1kYXRhXCJdLnN1YlByb2Nlc3NJbnNTZXE7XG5cbiAgICAgICAgICAgIHZhciBzdWJQcm9jZXNzQ29uZmlnT2JqZWN0ID0gSlNPTi54cGF0aChcIi9jb25maWcvcHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBwcm9jZXNzSUQgKyBcIiddL3N1YlByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgcHJvY2Vzc0lkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgdmFyIHN0ZXBPYmplY3QgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXS9zdGVwXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG5cblxuICAgICAgICAgICAgdXRpbC5zeW5jTG9vcChwb3N0QWN0aW9ucy5sZW5ndGgsIGZ1bmN0aW9uKGxvb3ApIHtcbiAgICAgICAgICAgICAgICB2YXIgY291bnRlciA9IGxvb3AuaXRlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgYWN0aW9uKHBvc3RBY3Rpb25zW2NvdW50ZXJdLCBwcm9jZXNzSUQsIHByb2Nlc3NTRVEsIHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0NvbmZpZ09iamVjdCwgc3RlcE9iamVjdCwgX1dGSW5zdGFuY2UsIHt9LCBzcHV1aWQpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBhbGwgcHJlLXJlcXVpc2l0ZXMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS5cbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVkLnB1c2godHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGxvb3AubmV4dCgpO1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQucHVzaChmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGxvb3AuYnJlYWsoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29tcGxldGVkLmV2ZXJ5KEJvb2xlYW4pKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdQb3N0LWFjdGlvbnMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCB7fSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZQcmVBY3Rpb25zRXJyb3InLCAnTm90IGFsbCBwb3N0LWFjdGlvbnMgcGFzc2VkLicpO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cblxuICAgIH0pO1xufTtcblxuLypcbmZ1bmN0aW9uIHNlbmROb3RpZmljYXRpb25zKHVzZXJzTGlzdCwgc3B1dWlkKXtcblxuICAvLyBnZXQgdXNlcnMgbGlzdCBcbiAgLy8gc2VuIG5vdGlmaWNhdGlvbnMgdG8gdXNlcnMgeSBhZGRpbmcgY2hhbm5lbHMgdG8gdGhlbVxuXG4gIHZhciBjaGFubmVsQXJyYXkgPSBbXTtcblxuICBmb3IoaT0wO2k8dXNlcnNMaXN0Lmxlbmd0aDsgaSsrKXtcbiAgICBjaGFubmVsQXJyYXkucHVzaChcInVzZXJfXCIrdXNlcnNMaXN0W2ldLmlkKTtcbiAgfVxuXG4gIGFzc2lnblRvVXNlcnMocHJvY2Vzc1dvcmtmbG93TWVzc2FnZShOT1RJRklDQVRJT05fVVNFUl9NU0dfQUNDRVBULCBzcHV1aWQpLCBjaGFubmVsQXJyYXkpO1xuXG59OyovXG5cbi8qZnVuY3Rpb24gYXNzaWduVG9Vc2VycyhtZXNzYWdlLCBjaGFubmVsQXJyYXkpe1xuXG4gICAgIHZhciBjaGFubmVscyA9IGNoYW5uZWxBcnJheTtcblxuICAgICB2YXIgbm90aWZpY2F0aW9uID0gIHsgXG4gICAgICAgICAgXCJfaWRcIjogZ2VuZXJhdGVVVUlEKCksXG4gICAgICAgICAgXCJjaGFubmVsc1wiOmNoYW5uZWxzLFxuICAgICAgICAgIFwibWVzc2FnZVwiOiBtZXNzYWdlLFxuICAgICAgICAgIFwibWVzc2FnZVR5cGVcIjogXCJpbmZvXCIsXG4gICAgICAgICAgXCJjcmVhdGVkRGF0ZVRpbWVcIjogbW9tZW50KCkuZm9ybWF0KCksXG4gICAgICAgICAgXCJyZWFkXCI6IGZhbHNlLFxuICAgICAgICAgIFwicmVhZERhdGVUaW1lXCI6IFwiXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwibm90aWZpY2F0aW9uXCIsXG4gICAgICAgICAgXCJzZW5kZXJVc2VySWRcIjogTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWRcbiAgICAgICB9O1xuXG4gICAgICAgY29uc29sZS5sb2cobm90aWZpY2F0aW9uKTtcbiAgICAgICBkYW8udXBzZXJ0KG5vdGlmaWNhdGlvbik7XG5cbiAgfTsqL1xuXG5mdW5jdGlvbiBwcm9jZXNzV29ya2Zsb3dNZXNzYWdlKG1lc3NhZ2UsIHNwdXVpZCkge1xuXG4gICAgdmFyIHJlcGxhY2VkTXNnID0gbWVzc2FnZTtcblxuICAgIGlmIChyZXBsYWNlZE1zZy5pbmRleE9mKCcjSU5TVEFOQ0VfTEFCRUwnKSAhPT0gLTEpIHtcbiAgICAgICAgdmFyIHZhbCA9IEpTT04ueHBhdGgoXCIvaW5zdGFuY2UvcHJvY2Vzc2VzL3N1YlByb2Nlc3Nlc1t1dWlkIGVxICdcIiArIHNwdXVpZCArIFwiJ10vbGFiZWxcIiwgYXBwLlNDT1BFLndvcmtmbG93LCB7fSlbMF07XG4gICAgICAgIHJlcGxhY2VkTXNnID0gcmVwbGFjZWRNc2cucmVwbGFjZSgnI0lOU1RBTkNFX0xBQkVMJywgdmFsKTtcblxuICAgIH1cblxuICAgIGlmIChyZXBsYWNlZE1zZy5pbmRleE9mKCcjVVNFUl9OQU1FJykgIT09IC0xKSB7XG4gICAgICAgIHZhciB2YWwgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXS9zdGVwL2Fzc2lnbmVkVG8vbmFtZVwiLCBhcHAuU0NPUEUud29ya2Zsb3csIHt9KVswXTtcbiAgICAgICAgcmVwbGFjZWRNc2cgPSByZXBsYWNlZE1zZy5yZXBsYWNlKCcjVVNFUl9OQU1FJywgdmFsKTtcblxuICAgIH1cblxuICAgIGlmIChyZXBsYWNlZE1zZy5pbmRleE9mKCcjUFJPRklMRV9USVRMRScpICE9PSAtMSkge1xuICAgICAgICB2YXIgdmFsID0gYXBwLnByb2ZpbGUudGl0bGU7XG4gICAgICAgIHJlcGxhY2VkTXNnID0gcmVwbGFjZWRNc2cucmVwbGFjZSgnI1BST0ZJTEVfVElUTEUnLCB2YWwpO1xuXG4gICAgfVxuXG4gICAgaWYgKHJlcGxhY2VkTXNnLmluZGV4T2YoJyNQUk9GSUxFX1RZUEUnKSAhPT0gLTEpIHtcbiAgICAgICAgdmFyIHZhbCA9IGFwcC5TQ09QRS5BUFBfQ09ORklHLm5hbWU7XG4gICAgICAgIHJlcGxhY2VkTXNnID0gcmVwbGFjZWRNc2cucmVwbGFjZSgnI1BST0ZJTEVfVFlQRScsIHZhbCk7XG5cbiAgICB9XG5cbiAgICBpZiAocmVwbGFjZWRNc2cuaW5kZXhPZignI1ZBUl9TUFVVSUQnKSAhPT0gLTEpIHtcbiAgICAgICAgdmFyIHZhbCA9IHNwdXVpZDtcbiAgICAgICAgcmVwbGFjZWRNc2cgPSByZXBsYWNlZE1zZy5yZXBsYWNlKCcjVkFSX1NQVVVJRCcsIHZhbCk7XG5cbiAgICB9XG5cbiAgICByZXR1cm4gcmVwbGFjZWRNc2c7XG59O1xuXG5mdW5jdGlvbiBfZ2V0TmFtZShhcnIsIGxhbmcpIHtcbiAgICBpZiAoYXJyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChhcnJbaV0uX2xhbmcgPT09IGxhbmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXJyW2ldLnZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH1cblxufTtcblxuZnVuY3Rpb24gX2dldE5hbWVCeUxhbmcob2JqKSB7XG4gICAgcmV0dXJuIGxpYnJhcnkuZ2V0TmFtZUJ5TGFuZyhvYmopO1xufTtcblxuXG5cblxuXG4vKipcbiAqIFByb2Nlc3MgcHJlV29ya0FjdGlvbnNcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gcHJlV29ya0FjdGlvbnMgLSB0aGUgcHJlV29ya0FjdGlvbnMgY29uZmlnIGRhdGFcbiAqXG4gKiBAZXhhbXBsZSAnJ1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cblxuZnVuY3Rpb24gcHJlV29ya0FjdGlvbnMocHJlV29ya0FjdGlvbnMsIF9XRkluc3RhbmNlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgY29tcGxldGVkID0gW107XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgc3ViUHJvY2Vzc0NvbmZpZ09iamVjdCA9IEpTT04ueHBhdGgoXCIvY29uZmlnL3Byb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgYXBwLlNDT1BFLnNwby5wT2JqZWN0LmlkICsgXCInXS9zdWJQcm9jZXNzZXNbX2lkIGVxICdcIiArIGFwcC5TQ09QRS5zcG8uc3BPYmplY3QuaWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICB2YXIgc3RlcE9iamVjdCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBhcHAuU0NPUEUucHJvY2Vzc1VVSUQgKyBcIiddL3N0ZXBcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgIHV0aWwuc3luY0xvb3AocHJlV29ya0FjdGlvbnMubGVuZ3RoLCBmdW5jdGlvbihsb29wKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvdW50ZXIgPSBsb29wLml0ZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgIGFjdGlvbihwcmVXb3JrQWN0aW9uc1tjb3VudGVyXSwgYXBwLlNDT1BFLnNwby5wT2JqZWN0LmlkLCBhcHAuU0NPUEUuc3BvLnBPYmplY3Quc2VxLCBhcHAuU0NPUEUuc3BvLnNwT2JqZWN0LmlkLCBhcHAuU0NPUEUuc3BvLnNwT2JqZWN0LnNlcSwgc3ViUHJvY2Vzc0NvbmZpZ09iamVjdCwgc3RlcE9iamVjdCwgX1dGSW5zdGFuY2UsIHt9LCBhcHAuU0NPUEUucHJvY2Vzc1VVSUQpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBhbGwgcHJlLXJlcXVpc2l0ZXMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS5cbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVkLnB1c2godHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGxvb3AubmV4dCgpO1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQucHVzaChmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGxvb3AuYnJlYWsoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29tcGxldGVkLmV2ZXJ5KEJvb2xlYW4pKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdQcmVXb3JrLWFjdGlvbnMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCB7fSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZQcmVBY3Rpb25zRXJyb3InLCAnTm90IGFsbCBwcmUtd29yay1hY3Rpb25zIHBhc3NlZC4nKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG5cbiAgICB9KTtcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgICBwcmVSZXF1aXNpdGVzOiBwcmVSZXF1aXNpdGVzLFxuICAgIHByZUFjdGlvbnM6IHByZUFjdGlvbnMsXG4gICAgcG9zdEFjdGlvbnM6IHBvc3RBY3Rpb25zLFxuICAgIHByZVdvcmtBY3Rpb25zOiBwcmVXb3JrQWN0aW9ucyxcbiAgICBzdWJQcm9jZXNzOiBzdWJQcm9jZXNzLFxuICAgIGluZGljYXRvckRvY3M6IGluZGljYXRvckRvY3MsXG4gICAgdGFzazogdGFzayxcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2l0aW9uLFxuICAgIGFzc2lnblVzZXI6IGFzc2lnblVzZXJcblxufSIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVdGlsaXR5IE1vZHVsZVxuICpcbiAqIEBtb2R1bGUgbGliL3V0aWxcbiAqXG4gKiBAYXV0aG9yIEJyZW50IEdvcmRvblxuICogQHZlcnNpb24gMC4xLjBcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFdvcmtmbG93IHV0aWxpdHkgbW9kdWxlIHVzZWQgdG8gZm9ybWF0IHRoZSByZXR1cm4gYW5kIGVycm9yIG9iamVjdHMsIGFuZFxuICogY29udGFpbnMgc29tZSBvdGhlciB1dGlsaXR5IGZ1bmN0aW9ucyBzdWNoIGFzIGEgc3luYyBsb29wIGFuZCBjb21wYXJlLlxuICpcbiAqL1xuXG4vKipcbiAqIFN1Y2Nlc3MgYmxvY2sgcmV0dXJuIG9iamVjdCwgY29udGFpbnMgYSBtZXNzYWdlIGFuZCBvcHRpb25hbCBkYXRhIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIHRoZSBzdWNjZXNzIG1lc3NhZ2VcbiAqIEBwYXJhbSB7c3RyaW5nfE9iamVjdH0gW2RhdGFdIC0gdGhlIHN1Y2Nlc3MgcmV0dXJuZWQgZGF0YVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBSZXR1cm4gc3VjY2VzcyB3aXRob3V0IGEgZGF0YSBibG9ja1xuICogdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1N1Y2Nlc3MgbWVzc2FnZSBnb2VzIGhlcmUuLi4nKTtcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IC0gd2l0aCBtZXNzYWdlIGFuZCBkYXRhIHByb3BlcnRpZXNcbiAqXG4gKi9cbmZ1bmN0aW9uIHN1Y2Nlc3MobWVzc2FnZSwgZGF0YSl7XG5cdHJldHVybiB7XG5cdFx0bWVzc2FnZTogbWVzc2FnZSxcblx0XHRkYXRhOiBkYXRhXG5cdH07XG59O1xuXG4vKipcbiAqIFdhcm5pbmcgYmxvY2sgcmV0dXJuIG9iamVjdCwgY29udGFpbnMgYSBtZXNzYWdlIGFuZCBvcHRpb25hbCBkYXRhIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIHRoZSB3YXJuaW5nIG1lc3NhZ2VcbiAqIEBwYXJhbSB7c3RyaW5nfE9iamVjdH0gW2RhdGFdIC0gdGhlIHJldHVybmVkIGRhdGFcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gUmV0dXJuIHN1Y2Nlc3Mgd2l0aG91dCBhIGRhdGEgYmxvY2tcbiAqIHZhciBzdWNjZXNzID0gdXRpbC53YXJuKCdXYXJuaW5nIG1lc3NhZ2UgZ29lcyBoZXJlLi4uJyk7XG4gKlxuICogQHJldHVybiB7T2JqZWN0fSB3aXRoIG1lc3NhZ2UgYW5kIGRhdGEgcHJvcGVydGllcywgYW5kIGxvZ3MgdGhlIHdhcm5pbmcgdG8gdGhlIGNvbnNvbGUuXG4gKlxuICovXG5mdW5jdGlvbiB3YXJuKG1lc3NhZ2UsIGRhdGEpe1xuXHRjb25zb2xlLndhcm4oZGF0YSk7XG5cdHJldHVybiB7XG5cdFx0d2FybmluZzogbWVzc2FnZSxcblx0XHRkYXRhOiBkYXRhXG5cdH07XG59O1xuXG4vKipcbiAqIEVycm9yIGJsb2NrIEpTIGVycm9yIG9iamVjdCwgY29udGFpbnMgYSBjb2RlIGFuZCBtZXNzYWdlIGZvciB0aGUgZXJyb3IuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNvZGUgLSB0aGUgZXJyb3IgY29kZVxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSB0aGUgZXJyb3IgbWVzc2FnZVxuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgc3VjY2VzcyA9IHV0aWwuZXJyb3IoJ0Vycm9yMDAxJywnRXJyb3IgbWVzc2FnZSBnb2VzIGhlcmUuLi4nKTtcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IHdpdGggYSBjb2RlIGFuZCBtZXNzYWdlIHByb3BlcnRpZXMuXG4gKlxuICovXG5mdW5jdGlvbiBlcnJvcihjb2RlLCBtZXNzYWdlKXtcblx0dmFyIGVyciA9IG5ldyBFcnJvcignJyk7XG5cdGVyci5uYW1lID0gY29kZTtcblx0ZXJyLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXHRyZXR1cm4gZXJyO1xufTtcblxuLyoqXG4gKiBBIGxvb3Agd2hpY2ggY2FuIGxvb3AgWCBhbW91bnQgb2YgdGltZXMsIHdoaWNoIGNhcnJpZXMgb3V0XG4gKiBhc3luY2hyb25vdXMgY29kZSwgYnV0IHdhaXRzIGZvciB0aGF0IGNvZGUgdG8gY29tcGxldGUgYmVmb3JlIGxvb3BpbmcuXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGl0ZXJhdGlvbnMgLSB0aGUgbnVtYmVyIG9mIGl0ZXJhdGlvbnMgdG8gY2Fycnkgb3V0XG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBwcm9jZXNzIC0gdGhlIGNvZGUvZnVuY3Rpb24gd2UncmUgcnVubmluZyBmb3IgZXZlcnlcbiAqIGl0ZXJhdGlvblxuICogQHBhcmFtIHtmdW5jdGlvbn0gZXhpdCAtIGFuIG9wdGlvbmFsIGNhbGxiYWNrIHRvIGNhcnJ5IG91dCBvbmNlIHRoZSBsb29wXG4gKiBoYXMgY29tcGxldGVkXG4gKlxuICogQGV4YW1wbGVcbiAqIHV0aWwuc3luY0xvb3AoNSwgZnVuY3Rpb24obG9vcCl7XG4gKiBcdHZhciBjb3VudGVyID0gbG9vcC5pdGVyYXRpb24oKTtcbiAqIFx0Ly8gQWRkIGFzeW5jIGNhbGxzIGhlcmUuLlxuICpcbiAqIH0sIGZ1bmN0aW9uKCl7XG4gKiBcdC8vIE9uIGNvbXBsZXRlIHBlcmZvcm0gYWN0aW9ucyBoZXJlLi4uXG4gKlxuICogfSk7XG4gKlxuICogQHJldHVybiB7T2JqZWN0fSB0aGUgbG9vcCBjb250cm9sIG9iamVjdC5cbiAqXG4gKi9cbmZ1bmN0aW9uIHN5bmNMb29wKGl0ZXJhdGlvbnMsIHByb2Nlc3MsIGV4aXQpe1xuICAgIHZhciBpbmRleCA9IDAsXG4gICAgICAgIGRvbmUgPSBmYWxzZSxcbiAgICAgICAgc2hvdWxkRXhpdCA9IGZhbHNlO1xuICAgIHZhciBsb29wID0ge1xuICAgICAgICBuZXh0OmZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpZihkb25lKXtcbiAgICAgICAgICAgICAgICBpZihzaG91bGRFeGl0ICYmIGV4aXQpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXhpdCgpOyAvLyBFeGl0IGlmIHdlJ3JlIGRvbmVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJZiB3ZSdyZSBub3QgZmluaXNoZWRcbiAgICAgICAgICAgIGlmKGluZGV4IDwgaXRlcmF0aW9ucyl7XG4gICAgICAgICAgICAgICAgaW5kZXgrKzsgLy8gSW5jcmVtZW50IG91ciBpbmRleFxuICAgICAgICAgICAgICAgIHByb2Nlc3MobG9vcCk7IC8vIFJ1biBvdXIgcHJvY2VzcywgcGFzcyBpbiB0aGUgbG9vcFxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIHdlJ3JlIGRvbmVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZG9uZSA9IHRydWU7IC8vIE1ha2Ugc3VyZSB3ZSBzYXkgd2UncmUgZG9uZVxuICAgICAgICAgICAgICAgIGlmKGV4aXQpIGV4aXQoKTsgLy8gQ2FsbCB0aGUgY2FsbGJhY2sgb24gZXhpdFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpdGVyYXRpb246ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJldHVybiBpbmRleCAtIDE7IC8vIFJldHVybiB0aGUgbG9vcCBudW1iZXIgd2UncmUgb25cbiAgICAgICAgfSxcbiAgICAgICAgYnJlYWs6ZnVuY3Rpb24oZW5kKXtcbiAgICAgICAgICAgIGRvbmUgPSB0cnVlOyAvLyBFbmQgdGhlIGxvb3BcbiAgICAgICAgICAgIHNob3VsZEV4aXQgPSBlbmQ7IC8vIFBhc3NpbmcgZW5kIGFzIHRydWUgbWVhbnMgd2Ugc3RpbGwgY2FsbCB0aGUgZXhpdCBjYWxsYmFja1xuICAgICAgICB9XG4gICAgfTtcbiAgICBsb29wLm5leHQoKTtcbiAgICByZXR1cm4gbG9vcDtcbn07XG5cbmZ1bmN0aW9uIGNvbXBhcmUoc3ViamVjdCwgb3BlcmF0b3IsIHZhbHVlKSB7XG4gIFx0c3dpdGNoIChvcGVyYXRvcikge1xuICBcdFx0Y2FzZSAnZ3JlYXRlclRoYW4nOlxuXHRcdFx0cmV0dXJuIHN1YmplY3QgPiB2YWx1ZTtcblx0XHRjYXNlICdsZXNzVGhhbic6XG5cdFx0XHRyZXR1cm4gc3ViamVjdCA8IHZhbHVlO1xuXHRcdGNhc2UgJ2dyZWF0ZXJUaGFuRXF1YWwnOlxuXHRcdFx0cmV0dXJuIHN1YmplY3QgPj0gdmFsdWU7XG5cdFx0Y2FzZSAnbGVzc1RoYW5FcXVhbCc6XG5cdFx0XHRyZXR1cm4gc3ViamVjdCA8PSB2YWx1ZTtcblx0XHRjYXNlICdlcXVhbFRvJzpcblx0XHRcdHJldHVybiBzdWJqZWN0ID09PSB2YWx1ZTtcblx0XHRjYXNlICdub3RFcXVhbFRvJzpcblx0XHRcdHJldHVybiBzdWJqZWN0ICE9PSB2YWx1ZTtcbiAgXHR9XG59O1xuXG5mdW5jdGlvbiBnZXROYW1lKGFyciwgbGFuZyl7XG5cdGlmIChhcnIgIT09IHVuZGVmaW5lZCkge1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aCA7IGkrKykge1xuXHRcdFx0aWYgKGFycltpXS5pMThuLl9sYW5nID09PSBsYW5nKSB7XG5cdFx0XHRcdHJldHVybiBhcnJbaV0uaTE4bi52YWx1ZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiBcdHN1Y2Nlc3M6IHN1Y2Nlc3MsXG4gXHR3YXJuOiB3YXJuLFxuIFx0ZXJyb3I6IGVycm9yLFxuIFx0c3luY0xvb3A6IHN5bmNMb29wLFxuIFx0Y29tcGFyZTogY29tcGFyZSxcblx0Z2V0TmFtZTogZ2V0TmFtZVxuXG4gfVxuIl19
