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

            var _filterValue = numberProcessInstances.type;

            var innerXpath = ''

            if (_filterValue == "all") {
                innerXpath = '';
            } else {
                innerXpath = "[complete eq 'true']";
            }

            var additionalFilter = "";

            if (numberProcessInstances.filter != undefined && numberProcessInstances.filter.length > 0) {
                additionalFilter = "[" + numberProcessInstances.filter + "]";
            }

            var fullPath = "count(/instance/processes/subProcesses[id eq '" + _subprocessId + "']" + innerXpath + additionalFilter + ")";

            var prereqProcessType = JSON.xpath("/config/processes/subProcesses[_id eq '" + _subprocessId + "']/type", _WFInstance, {})[0];
            var part = library.getSubprofileSubprocessIds();

            if (app.profile.subprofileId != undefined && app.profile.subprofileId != '' && prereqProcessType != undefined && prereqProcessType == PROCESS_TYPE_SUBPROFILE) {
                fullPath = "count(/instance/processes/subProcesses[id eq '" + _subprocessId + "' and uuid = " + part + "]" + innerXpath + ")";
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
                var variableType = prerequisite.check.variable.type;
                var finalValue = file;
                var pathToElement = variableName == "" ? [] : variableName.split(/['"\[\].]+/);

                for (var k = 0; k < pathToElement.length; k++) {
                    if(pathToElement[k] == "") continue;
                    finalValue = finalValue[pathToElement[k]];
                }
                var obj = finalValue;
                var subjectValueCalculated;

                if (variableType != undefined && variableType == "array") {
                    subjectValueCalculated = obj;
                } else if (typeof obj == 'object') {

                    //var seq = JSON.xpath("count(/subprocesses[_id eq '" + spuuid + "']/preceding-sibling::node()[id = /subprocesses[_id eq '" + spuuid + "']/id])", _WFInstance, {})[0] + 1;
                    var subprocessType = JSON.xpath("/config/processes/subProcesses[_id eq /subprocesses[_id eq '" + spuuid + "']/id]/type", _WFInstance, {})[0];
                    // var part = library.getSubprofileSubprocessIds();
                    // if (subprocessType == PROCESS_TYPE_SUBPROFILE) {
                    //     seq = JSON.xpath("count(/subprocesses[_id eq '" + spuuid + "']/preceding-sibling::node()[id = /subprocesses[_id eq '" + spuuid + "']/id and _id = /subprocesses[_id = " + part + "]/_id])", _WFInstance, {})[0] + 1;
                    // }




                    var seq = JSON.xpath("count(/instance/processes/subProcesses[id = /subprocesses[_id eq '" + spuuid + "']/id])", _WFInstance, {})[0] + 1;
                    if (subprocessType == PROCESS_TYPE_SUBPROFILE) {
                        var part = library.getSubprofileSubprocessIds();
                        seq = JSON.xpath("count(/instance/processes/subProcesses[id = /subprocesses[_id eq '" + spuuid + "']/id and uuid = " + part + "])", _WFInstance, {})[0] + 1;
                    }





                    var valuePath = "/" + variableName + "[" + seq + "]/value";
                    subjectValueCalculated = JSON.xpath(valuePath, file, {})[0];

                } else if (typeof obj == 'string') {

                    subjectValueCalculated = obj;

                }



                var inputValue = prerequisite.check.variable.value.data;
                var inputDataType = prerequisite.check.variable.value.dataType.dataType;

                if (inputValue.indexOf("xpath:") == 0) {
                    var fullPath = inputValue.substring(6);
                    inputValue = JSON.xpath(fullPath, _WFInstance, {})[0];
                }

                if (inputValue == "#VALID_DATE") {
                    var spo = JSON.xpath("/subprocesses[_id eq '" + spuuid + "']", _WFInstance, {})[0];
                    if (spo != undefined) {
                        inputValue = spo.dates.valid;
                    }
                }


                var finalValue;
                if (inputDataType == 'number') {
                    finalValue = Number(inputValue);
                } else if (inputDataType == 'string') {
                    finalValue = inputValue;
                } else if (inputDataType == 'integer') {
                    finalValue = parseInt(inputValue);
                    if (variableType != undefined && variableType == "array") {

                        if (subjectValueCalculated == undefined) {
                            subjectValueCalculated = 0;
                        } else {
                            subjectValueCalculated = subjectValueCalculated.length;
                        }

                    }
                } else if (inputDataType == 'decimal') {
                    finalValue = parseFloat(inputValue);
                } else if (inputDataType == 'date' || inputDataType == 'dateTime') {
                    finalValue = inputValue;
                }

                if (subjectValueCalculated == undefined &&
                    (prerequisite.check.variable.allowBlank != undefined &&
                        prerequisite.check.variable.allowBlank == true)) {
                    var success = util.success('Variable Pre-requisites passed.', {});
                    resolve(success);
                } else {
                    var compare = util.compare(subjectValueCalculated, prerequisite.check.variable.operator, finalValue);
                    if (compare) {
                        var success = util.success('Variable Pre-requisites passed.', {});
                        resolve(success);
                    } else {

                        var message = helper.getLanguageMessage(prerequisite.message);
                        message = message.replace("#VALID_DATE", subjectValueCalculated);
                        var error = util.error('WFPreRequisiteError', message);
                        reject(error);
                    }
                }


            }).catch(function(error) {
                if (prerequisite.check.variable.allowBlank != undefined &&
                    prerequisite.check.variable.allowBlank == true) {
                    var success = util.success('Variable Pre-requisites passed.', {});
                    resolve(success);
                } else {
                    var message = helper.getLanguageMessage(prerequisite.message);
                    var error = util.error('WFPreRequisiteError:', message);
                    reject(error);
                }

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
    var countSubprocessInContext = 0;

    if (baseUUID != undefined && baseUUID != '' && baseUUID.length > 0) {

        var previousObject = JSON.xpath("/subprocesses[_id eq '" + baseUUID + "']", _WFInstance, {})[0];

        groupKey = previousObject.groupKey;
        countSubprocessInContext = previousObject['meta-data'].subProcessInsSeq;


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

        countSubprocessInContext = JSON.xpath("count(/processes/subProcesses[groupKey eq '" + groupKey + "'])", _WFInstance.instance, {})[0];
    }

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

    if (data.validDate != undefined && data.validDate.length > 0) {
        if(subProcessConf.periodType.periodic != undefined){
            model.dates.valid = moment(data.validDate).endOf("month").format("YYYY-MM-DD");
        }
        else{
            model.dates.valid = data.validDate;
        }
        
    }

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

                                model.step = result.data;
                                indicators(subProcessConf.indicators, _WFInstance, model._id).then(function(result1) {
                                    model.indicators = result1.data;

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

                                console.log(err);

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
            model.message = step.setInstanceStatusTo[instanceStatus].label.i18n[language];
            model.comment = data.comment !== undefined ? data.comment : '';
            var indicators = instSubProcess !== undefined ? instSubProcess.indicators : [];

            var updateSPIndicatorObject = function(indicators, _WFInstance) {
                var assignee = model.assignedTo;
                if (indicators.length > 0) {
                    for (var i = 0; i < indicators.length; i++) {
                        var indicatorObject = indicators[i];
                        var uuid = indicatorObject.instances[0].uuid;
                        var indicator = JSON.xpath("/indicators[_id eq '" + uuid + "']", _WFInstance, {})[0];
                        indicatorObject.instances[0].seq = indicator.model.pending.seq;

                        for (var j = 0; j < indicator.workflows.length; j++) {
                            if (indicator.workflows[j].processes[0] != undefined &&
                                indicator.workflows[j].processes[0].subProcessUUID != undefined &&
                                indicator.workflows[j].processes[0].step != undefined &&
                                spuuid == indicator.workflows[j].processes[0].subProcessUUID) {
                                indicator.workflows[j].processes[0].step.assignedTo = assignee;
                            }
                        }

                    }
                }
            };
            var clearSPStatus = function(spuuid) {
                var obj = JSON.xpath("/subprocesses[_id eq '" + spuuid + "']", _WFInstance, {})[0];

                obj.spStatus = "";
            };

            indicatorDocs(processId, indicators, model, _WFInstance, spuuid).then(function(result) {
                uuid = spuuid;

                if (step.function.actions != undefined) {
                    actions(step.function.actions, processId, processSeq, subProcessId, subProcessSeq, subProcess, model, _WFInstance, data, spuuid)
                        .then(function(result) {
                            var assignee = model.assignedTo;

                            assignee.name = _lclx.SESSION.firstName + " " + _lclx.SESSION.lastName;
                            assignee.userId = _lclx.SUBSCRIPTIONS.userId + "";
                            assignee.dateTime = moment().format();
                            assignee.type = ASSIGNMENT_TYPE_AUTO;
                            assignee.dueDateTime = '';
                            assignee.by = _lclx.SUBSCRIPTIONS.userId + "";



                            updateSPIndicatorObject(indicators, _WFInstance);
                            var transitionId = step.transition[0]._id;
                            transition(processId, processSeq, subProcessId, subProcessSeq, stepId, transitionId, data, _WFInstance, spuuid, model).then(function(result) {
                                var success = util.success('Transition completed successfully.', result.data.step);
                                resolve(success);
                            }, function(err) {
                                reject(err);
                            });
                        }, function(err) {
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
                    subProcessItem.step.assignedTo.by = _lclx.SUBSCRIPTIONS.userId + "";

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
                                        workflow.processes.filter(function(processItem) {
                                            if (processItem.id == processId) {
                                                // Update the user id and name in the document
                                                processItem.step.assignedTo.userId = user.id;
                                                processItem.step.assignedTo.name = user.name;
                                            }

                                        })

                                    })
                                }

                            }

                        }

                    }
                    //Send assign user notification from here

                    var notification = JSON.xpath("/processes[_id eq '" + processId + "']/notifications", _WFInstance.config, {})[0];

                    if (notification != undefined && notification.reAssignment != undefined) {

                        if(typeof notification.reAssignment === "string"){
                          
                            var reAssignmentNId = notification.reAssignment;
                            
                            dao.getConfig(reAssignmentNId).then(function(reAssignmentObject){
                                notification.reAssignment = reAssignmentObject;
                                
                                actionsModule.notification.reAssignmentNotification(notification, _WFInstance, uuid, user).then(
                                    function(success) {
                                        var success = util.success('User assigned successfully. UserId: "' + user.id + '", Name: "' + user.name + '"', subProcessItem);
                                        resolve(success);
                                    }).catch(
                                    function(fail) {
                                        resolve(fail);
                                    });
                                    

                            }).catch(function(fail){
                                resolve(fail);
                            })


                        } else {
                          

                            actionsModule.notification.reAssignmentNotification(notification, _WFInstance, uuid, user).then(
                                function(success) {
                                    var success = util.success('User assigned successfully. UserId: "' + user.id + '", Name: "' + user.name + '"', subProcessItem);
                                    resolve(success);
                                }).catch(
                                function(fail) {
                                    resolve(fail);
                                });
                        }

                       


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
function indicatorDocs(processId, indicators, step, _WFInstance, currentSPUUID) {
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
                                    workflow.processes.filter(function(processItem) {
                                        if (processItem.subProcessUUID == currentSPUUID) {
                                            processItem.step.id = step.id;
                                            processItem.step.seq = step.seq;
                                            processItem.step.status = step.status;
                                            processItem.step.message = step.message;
                                            processItem.step.assignedTo.userId = step.assignedTo.userId;
                                            processItem.step.assignedTo.name = step.assignedTo.name;
                                            processItem.step.comment = step.comment !== undefined ? step.comment : '';
                                        }
                                    })

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
            var methodPossibleItems = ["form", "indicator", "profile", "subProcessInstance", "step", "community", "application", "user", "sdo", "performance", "taxonomy", "variables", "notification", "report", "worker", "participants", "generalFunctions"];
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

                    } else if (action.method.form.createNewSeq != undefined) {

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


                    if(typeof action.method.notification === "string"){
                          
                        var reAssignmentNId = action.method.notification;
                        
                        dao.getConfig(reAssignmentNId).then(function(reAssignmentObject){
                            action.method.notification = reAssignmentObject;

                            actionsModule.notification.sendNotificationWorker(action.method.notification, _WFInstance, uuid).then(function(result) {
                                resolve(result.data);
                            }, function(err) {
                                reject(err);
                            }); 

                        }).catch(function(fail){
                            resolve(fail);
                        })


                    } else {
                      
                         actionsModule.notification.sendNotificationWorker(action.method.notification, _WFInstance, uuid).then(function(result) {
                            resolve(result.data);
                        }, function(err) {
                            reject(err);
                        });
                       
                    }

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
                case "generalFunctions":

                    var possibleItems = ["addToFavourites", "addToUserFavourites"];
                    switch (propertyExists(action.method.generalFunctions, possibleItems)) {

                        case 'addToFavourites':
                            return actionsModule.generalFunctions.addToFavourites(action.method.generalFunctions.addToFavourites, _WFInstance, uuid).then(function(result) {
                                resolve(result.data);
                            }, function(err) {
                                reject(err);
                            });
                        case 'addToUserFavourites':
                            return actionsModule.generalFunctions.addToUserFavourites(action.method.generalFunctions.addToUserFavourites, _WFInstance, uuid).then(function(result) {
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

                var processToAssignExternal = function() {

                    var role = task.assign.role.roleId;
                    library.getUsersFromProfileRole(id, role).then(function(list) {

                        if (list != undefined) {

                            if (list.length > 1) {

                                // Adding roles from external profile

                                var isCurrentUserExistInGivenRole = false;
                                for (var i = 0; i < list.length; i++) {
                                    var uid = list[i].id;
                                    if (_lclx.SUBSCRIPTIONS.userId == list[i].id) {
                                        isCurrentUserExistInGivenRole = true;
                                    }
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


                                    assignee.name = _lclx.SESSION.firstName + " " + _lclx.SESSION.lastName;
                                    assignee.userId = _lclx.SUBSCRIPTIONS.userId + "";
                                    assignee.dateTime = moment().format();
                                    assignee.type = ASSIGNMENT_TYPE_AUTO;
                                    assignee.dueDateTime = '';
                                    assignee.by = _lclx.SUBSCRIPTIONS.userId + "";

                                    // Notification that its been automatically assigned to you
                                    //Send assign user notification from here



                                    var notification = JSON.xpath("/processes[_id eq '" + subprocessID + "']/notifications", _WFInstance.config, {})[0];
                                    if (notification != undefined && notification.assignment != undefined) {
                                        var user = { 'id': _lclx.SUBSCRIPTIONS.userId, 'name': _lclx.SUBSCRIPTIONS.username };
                                        
                                        
                                        if(typeof notification.assignment === "string"){
                          
                                            var assignmentNId = notification.assignment;
                                            
                                            dao.getConfig(assignmentNId).then(function(assignmentObject){
                                                notification.assignment = assignmentObject;
                                                
                                                actionsModule.notification.assignmentNotification(notification, _WFInstance, spuuid, user).then(
                                                    function(success) {
                                                        console.log('User assigned successfully. UserId: "' + user.id + '", Name: "' + user.name + '"');
                                                    }
                                                ).catch(
                                                    function(fail) {
                                                        console.log('User assignment notification failed to user UserId: "' + user.id + '", Name: "' + user.name + '"');
                                                    }
                                                );
                                                    
                                        
                                            }).catch(function(fail){
                                                resolve(fail);
                                            })
                                        
                                        
                                        } else {
                                          
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
                                        "profileId": id,
                                        "type": "user",
                                        "userId": list
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
                                        var user = { 'id': _lclx.SUBSCRIPTIONS.userId, 'name': _lclx.SUBSCRIPTIONS.username };
                                        actionsModule.notification.acceptanceNotificationExternal(notification, _WFInstance, spuuid, list).then(
                                            function(success) {
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
                                assignee.by = _lclx.SUBSCRIPTIONS.userId + "";

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
                                        "profileId": id,
                                        "userId": list,
                                        "type": "user"
                                    };

                                    assignment.value = value;
                                    assignment.profileRoleId = id;

                                }

                                // Notification that its been automatically assigned to you
                                //Send assign user notification from here

                                var notification = JSON.xpath("/processes[_id eq '" + subprocessID + "']/notifications", _WFInstance.config, {})[0];
                                if (notification != undefined && notification.assignment != undefined) {
                                    var user = { 'id': userId, 'name': username };

                                    if(typeof notification.assignment === "string"){
                          
                                        var assignmentNId = notification.assignment;
                                        
                                        dao.getConfig(assignmentNId).then(function(assignmentObject){
                                            notification.assignment = assignmentObject;
                                            
                                            actionsModule.notification.assignmentNotification(notification, _WFInstance, spuuid, user).then(
                                                function(success) {
                                                    console.log('User assigned successfully. UserId: "' + user.id + '", Name: "' + user.name + '"');
                                                }
                                            ).catch(
                                                function(fail) {
                                                    console.log('User assignment notification failed to user UserId: "' + user.id + '", Name: "' + user.name + '"');
                                                }
                                            );
                                                
                                    
                                        }).catch(function(fail){
                                            resolve(fail);
                                        })
                                    
                                    
                                    } else {
                                      
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
                                        "profileId": id,
                                        "userId": list,
                                        "type": "user"
                                    };

                                    assignment.value = value;
                                    assignment.profileRoleId = id;

                                }
                                //Will be fired from TakeAssignment path
                                resolve("No users found in list. Assigning blank ");

                            }

                        } else {
                            reject('Error in getUsersFromProfileRole ');
                        }

                    }).catch(function(err) {
                        reject(err);
                    })
                };

                var processToAssign = function() {
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


                                    assignee.name = _lclx.SESSION.firstName + " " + _lclx.SESSION.lastName;
                                    assignee.userId = _lclx.SUBSCRIPTIONS.userId + "";
                                    assignee.dateTime = moment().format();
                                    assignee.type = ASSIGNMENT_TYPE_AUTO;
                                    assignee.dueDateTime = '';
                                    assignee.by = _lclx.SUBSCRIPTIONS.userId + "";

                                    // Notification that its been automatically assigned to you
                                    //Send assign user notification from here
                                    var notification = JSON.xpath("/processes[_id eq '" + subprocessID + "']/notifications", _WFInstance.config, {})[0];
                                    if (notification != undefined && notification.assignment != undefined) {
                                        var user = { 'id': _lclx.SUBSCRIPTIONS.userId, 'name': _lclx.SUBSCRIPTIONS.username };
                                        
                                        if(typeof notification.assignment === "string"){
                          
                                            var assignmentNId = notification.assignment;
                                            
                                            dao.getConfig(assignmentNId).then(function(assignmentObject){
                                                notification.assignment = assignmentObject;
                                                
                                                actionsModule.notification.assignmentNotification(notification, _WFInstance, spuuid, user).then(
                                                    function(success) {
                                                        console.log('User assigned successfully. UserId: "' + user.id + '", Name: "' + user.name + '"');
                                                    }
                                                ).catch(
                                                    function(fail) {
                                                        console.log('User assignment notification failed to user UserId: "' + user.id + '", Name: "' + user.name + '"');
                                                    }
                                                );
                                                    
                                        
                                            }).catch(function(fail){
                                                resolve(fail);
                                            })
                                        
                                        
                                        } else {
                                          
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
                                        var user = { 'id': _lclx.SUBSCRIPTIONS.userId, 'name': _lclx.SUBSCRIPTIONS.username };
                                        


                                        if(typeof notification.assignmentAcceptance === "string"){
                          
                                            var assignmentNId = notification.assignmentAcceptance;
                                            
                                            dao.getConfig(assignmentNId).then(function(assignmentObject){
                                                notification.assignmentAcceptance = assignmentObject;
                                                
                                                actionsModule.notification.acceptanceNotification(notification, _WFInstance, spuuid, role).then(
                                                    function(success) {
        
                                                        resolve('Notifications request submitted for acceptance.');
                                                    }
                                                ).catch(
                                                    function(fail) {
                                                        resolve('Notifications failed');
                                                        console.log('User assignment notification failed to user UserId: "' + user.id + '", Name: "' + user.name + '"');
                                                    }
                                                );
                                               
                                                    
                                        
                                            }).catch(function(fail){
                                                resolve(fail);
                                            })
                                        
                                        
                                        } else {
                                          
                                            
                                            actionsModule.notification.acceptanceNotification(notification, _WFInstance, spuuid, role).then(
                                                function(success) {
    
                                                    resolve('Notifications request submitted for acceptance.');
                                                }
                                            ).catch(
                                                function(fail) {
                                                    resolve('Notifications failed');
                                                    console.log('User assignment notification failed to user UserId: "' + user.id + '", Name: "' + user.name + '"');
                                                }
                                            );

                                            
                                        }


                                       

                                        
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
                                assignee.by = _lclx.SUBSCRIPTIONS.userId + "";

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
                                    
                                    
                                    if(typeof notification.assignment === "string"){
                          
                                        var assignmentNId = notification.assignment;
                                        
                                        dao.getConfig(assignmentNId).then(function(assignmentObject){
                                            notification.assignment = assignmentObject;
                                            
                                            actionsModule.notification.assignmentNotification(notification, _WFInstance, spuuid, user).then(
                                                function(success) {
                                                    console.log('User assigned successfully. UserId: "' + user.id + '", Name: "' + user.name + '"');
                                                }
                                            ).catch(
                                                function(fail) {
                                                    console.log('User assignment notification failed to user UserId: "' + user.id + '", Name: "' + user.name + '"');
                                                }
                                            );
                                                
                                    
                                        }).catch(function(fail){
                                            resolve(fail);
                                        })
                                    
                                    
                                    } else {
                                      
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
                            reject(err);
                        }

                    }, function(err) {
                        reject(err);
                    });
                };

                if (task.assign.role.profile != undefined) {

                    if (task.assign.role.profile == 'current') {
                        id = _WFInstance.profile;
                    } else if (task.assign.role.profile == 'community') {
                        id = app.SCOPE.getCommunityId();
                    }
                    processToAssign();

                } else if (task.assign.role.profileId != undefined) {

                    helper.getNodeValue(task.assign.role.profileId, _WFInstance, spuuid).then(function(formProfileId) {
                        id = formProfileId;
                        processToAssignExternal();
                    }).catch(function(err) {
                        reject(err);
                    });

                }




            } else if (task.assign.user != undefined) {

                helper.getNodeValue(task.assign.user.userName, _WFInstance, spuuid).then(function(userName) {
                    helper.getNodeValue(task.assign.user.userId, _WFInstance, spuuid).then(function(userId) {

                        var userId = userId;
                        var username = userName;
                        var profileId = _WFInstance.profile;
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
                        assignee.by = _lclx.SUBSCRIPTIONS.userId + "";

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



                            var i = {
                                id: userId,
                                name: userName
                            }
                            list.push(i);

                            assignment.reject = reject;
                            var value = {
                                "profileId": profileId,
                                "userId": list,
                                "type": "user"
                            };





                            assignment.value = value;
                            assignment.profileRoleId = id;

                        }
                        // Notification that its been automatically assigned to you
                        //Send assign user notification from here
                        var notification = JSON.xpath("/processes[_id eq '" + subprocessID + "']/notifications", _WFInstance.config, {})[0];
                        if (notification != undefined && notification.assignment != undefined) {
                            var user = { 'id': userId, 'name': username };
                            
                            if(typeof notification.assignment === "string"){
                          
                                var assignmentNId = notification.assignment;
                                
                                dao.getConfig(assignmentNId).then(function(assignmentObject){
                                    notification.assignment = assignmentObject;
                                    
                                    actionsModule.notification.assignmentNotification(notification, _WFInstance, spuuid, user).then(
                                        function(success) {
                                            console.log('User assigned successfully. UserId: "' + user.id + '", Name: "' + user.name + '"');
                                        }
                                    ).catch(
                                        function(fail) {
                                            console.log('User assignment notification failed to user UserId: "' + user.id + '", Name: "' + user.name + '"');
                                        }
                                    );
                                        
                            
                                }).catch(function(fail){
                                    resolve(fail);
                                })
                            
                            
                            } else {
                              
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
                var historyObject = JSON.xpath("/*[xs:dateTime(dateTimeCreated) eq xs:dateTime('" + dateSearch + "')]", historyList, {})[0];
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
                assignee.by = _lclx.SUBSCRIPTIONS.userId + "";

                var assignment = '';

                // Notification that its been automatically assigned to you
                //Send assign user notification from here
                var notification = JSON.xpath("/processes[_id eq '" + subprocessID + "']/notifications", _WFInstance.config, {})[0];
                if (notification != undefined && notification.assignment != undefined) {
                    var user = { 'id': userId, 'name': username };
                    
                    
                    if(typeof notification.assignment === "string"){
                          
                        var assignmentNId = notification.assignment;
                        
                        dao.getConfig(assignmentNId).then(function(assignmentObject){
                            notification.assignment = assignmentObject;
                            
                            actionsModule.notification.assignmentNotification(notification, _WFInstance, spuuid, user).then(
                                function(success) {
                                    console.log('User assigned successfully. UserId: "' + user.id + '", Name: "' + user.name + '"');
                                }
                            ).catch(
                                function(fail) {
                                    console.log('User assignment notification failed to user UserId: "' + user.id + '", Name: "' + user.name + '"');
                                }
                            );
                                
                    
                        }).catch(function(fail){
                            resolve(fail);
                        })
                    
                    
                    } else {
                      
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
        assignee.name = _lclx.SESSION.firstName + " " + _lclx.SESSION.lastName;
        assignee.userId = _lclx.SUBSCRIPTIONS.userId + "";
        assignee.dateTime = moment().format();
        assignee.type = ASSIGNMENT_TYPE_AUTO;
        assignee.dueDateTime = '';
        assignee.by = _lclx.SUBSCRIPTIONS.userId + "";

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
                userId: _lclx.SUBSCRIPTIONS.userId + ""
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
                var newArr = [];
                if(spinstanceObject.messages != undefined){
                    for(var m = 0; m < spinstanceObject.messages.length; m++){
                        var obj = spinstanceObject.messages[m];
                        if(obj.type == "info" || obj.type == "success"){
                            if(obj.url != undefined){
                                newArr.push(obj);
                            }
                        }
                        else{
                            newArr.push(obj);
                        }
                    }
                }
                spinstanceObject.messages = newArr;
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
          "senderUserId": _lclx.SUBSCRIPTIONS.userId
       };

       console.log(notification);
       dao.save(notification);

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