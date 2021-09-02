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


        //hasan

        var errorArray = [];

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


                            var failure = util.success('Process failed', errorArray);
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
                    var failure = util.success('Process failed', errorArray);
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
                            var alreadyExists = false;
                            var obIndex = -1;
                            object.model.workflows.forEach(function(workflowBlockInIndicator, index){
                                if(uuid == workflowBlockInIndicator.processes[0].subProcessUUID){
                                    alreadyExists = true;
                                    obIndex = index;
                                }
                            }) 
                            if(!alreadyExists){
                                object.model.workflows.push(workflowObj);
                            } else{
                                object.model.workflows[obIndex] = workflowObj;
                            }

                          
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
                                                                errorArray.push({"error": "persistData "+ uuid, "errorBlock": err});
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
                                                                        errorArray.push({"error": "persistData "+ uuid, "errorBlock": err});
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
                                                                    errorArray.push({"error": "persistData "+ uuid, "errorBlock": err});
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
                                                    errorArray.push({"error": "dao.get(mainId) "+ mainId, "errorBlock": err});
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
                                                errorArray.push({"error": "gatekeeper.persist(data) - Persisting all docs ", "errorBlock": err});
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
                                            errorArray.push({"error": "gatekeeper.instantiateData"+ mainId + " "+ data[0].status , "errorBlock": {}});
                                            var failure = util.success('3 Gatekeeper initialisation failed with initialiseData message ', {});
                                            broke = true;
                                            toProcess--;
                                            if (toProcess == 0) {
                                                resolveCaller();
                                            }

                                            resolve({});

                                        }

                                    }, function (err) {
                                        errorArray.push({"error": "gatekeeper.instantiateData"+ mainId, "errorBlock": err});
                                        var failure = util.success('4 Gatekeeper initialisation failed with initialiseData message ', {});
                                        broke = true;
                                        toProcess--;
                                        if (toProcess == 0) {
                                            resolveCaller();
                                        }

                                        resolve({});

                                    });

                                }).catch(function (err) {
                                    errorArray.push({"error": "dao.get(mainId) "+ mainId, "errorBlock": err});
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
                                errorArray.push({"error": "gatekeeper.persist savedArray", "errorBlock": err});
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
                    errorArray.push({"error": "gatekeeper.instantiate", "errorBlock": err});
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

                var createForm = function(){
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

                var indicatorDoc = {};
                if (baseUUID != undefined && baseUUID != '' && baseUUID.length > 0) {

                    var sp = JSON.xpath("/subprocesses[_id eq '" + baseUUID + "']", _WFInstance, {})[0];
                    
                    if (subProcess.periodType.periodic == undefined) {

                        if (baseUUID != uuid) {
                            sp.active = false;
                        }

                    }
                    
                    if(formCreateType == BLANK_MODEL){
                        instantiateSource = FROM_DEFINITION;
                    } else {
                        instantiateSource = FROM_AUTHORISED;
                    }
                    
                    createForm();

                } else {
                    var cardinality = JSON.xpath("/indicators[setId eq '" + indicatorId + "']/cardinality", app.SCOPE.APP_CONFIG, {})[0];

                    if (initType == INSTANCE_TYPE_NEW_INS) {

                        if (cardinality == INDICATOR_CARDINALITY_SINGLE) {

                            library.getSingleIndicator(indicatorId)
                            .then(function(existingUUID){

                                if (existingUUID.length > 0) {
                                    instantiateSource = FROM_AUTHORISED;
                                } else {
                                    instantiateSource = FROM_DEFINITION;
                                }

                                createForm();

                            })
                            .catch(function(existingUUID){
                                instantiateSource = FROM_DEFINITION;
                                createForm();
                            });


                        } else {

                            instantiateSource = FROM_DEFINITION;
                            createForm();

                        }



                    } else {

                        if (cardinality == INDICATOR_CARDINALITY_SINGLE) {
                            

                            library.getSingleIndicator(indicatorId)
                            .then(function(existingUUID){

                                if (existingUUID.length > 0) {
                                    instantiateSource = FROM_AUTHORISED;
                                } else {
                                    instantiateSource = FROM_DEFINITION;
                                }

                                createForm();

                            })
                            .catch(function(existingUUID){
                                instantiateSource = FROM_DEFINITION;
                                createForm();
                            });

                        } else {
                            //check here

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
                            createForm();

                        }



                    }


                }

                

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
            "parentTransactionId": (app.SCOPE.txn == undefined  ? "" : app.SCOPE.txn.transactionId),
            "notification": {

            },
            "profile": {
                "action": "deleteProfile",
                "profileId": profileId
            }

        }

        console.log(workerObject);
        dao.save(workerObject).then(function (data) {
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

        var processSDO = function(i){

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
                            else if(itemsToProcess > 0){
                                processSDO(i + 1);
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

                            else if(itemsToProcess > 0){
                                processSDO(i + 1);
                            }

                        }

                    }).catch(function (err) {
                        console.error(err);
                        var failure = util.success('Form authorised persist failed 2.', {});
                        reject(failure);
                    });

                }, function (error) {
                    console.error(error);
                    var failure = util.success('Form authorised persist failed 3.', {});
                    reject(failure);
                });

            }, function (error) {
                var failure = util.success('Form authorised persist failed 4.', {});
                reject(failure);

            });

        }

        processSDO(0);




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
        if(indObject == undefined && setId == "appProfile"){
            indObject = JSON.xpath("/indicators[model/pending/status = 'Authorised' and category/term = '" + setId + "']", _WFInstance, {})[0];
            if(indObject == undefined){
                var stuff = [];
                var obj = {};

                obj.model = {};
                stuff.push(obj);

                var success = util.success('Indicator updated skipped.', stuff);
                resolve(success);
                return;
            }
        }

        var squote = (dataValue + "").replace(/'/g, "\\'");
        var squote = squote.split('\n').join(' ');
        var expr = "indObject.model.pending.data." + path + " = '" + squote + "'";
        eval(expr);
        var itemsToProcess = 1;
        var stuff = [];
        var obj = {};

        obj.model = indObject;
        stuff.push(obj);

        var txnPacket = JSON.parse(JSON.stringify(app.SCOPE.txn));
        txnPacket.documents = [];
        var refPack = { "document": indObject._id, "rev": indObject._rev };
        txnPacket.documents.push(refPack);
        app.SCOPE.txn.documents.push(refPack);

        dao.updateTransaction(txnPacket).then(function(succ) {

            dao.save(indObject).then(function(data) {
                refPack.rev = data.rev;
                var success = util.success('Indicator updated.', stuff);
                resolve(success);
            }).catch(function(error) {
                console.log(error);
                var success = util.success('Indicator updated.', stuff);
                resolve(success);
            });

        }).catch(function(err) {
            console.log(err);
            var success = util.success('Indicator updated.', stuff);
            resolve(success);
        });


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

        if(indObject == undefined && setId == "appProfile"){
            indObject = JSON.xpath("/indicators[model/pending/status = 'Authorised' and category/term = '" + setId + "']", _WFInstance, {})[0];
            if(indObject == undefined){
                var stuff = [];
                var obj = {};

                obj.model = {};
                stuff.push(obj);

                var success = util.success('Indicator updated skipped.', stuff);
                resolve(success);
                return;
            }
        }

        var squote = dataValue.replace(/'/g, "\\'");
        var squote = squote.split('\n').join(' ');
        var expr = "indObject." + path + " = '" + squote + "'";
        eval(expr);
        var itemsToProcess = 1;
        var stuff = [];
        var obj = {};

        obj.model = indObject;
        stuff.push(obj);

        var txnPacket = JSON.parse(JSON.stringify(app.SCOPE.txn));
        txnPacket.documents = [];
        var refPack = { "document": indObject._id, "rev": indObject._rev };
        txnPacket.documents.push(refPack);
        app.SCOPE.txn.documents.push(refPack);

        dao.updateTransaction(txnPacket).then(function(succ) {

            dao.save(indObject).then(function(data) {
                refPack.rev = data.rev;
                var success = util.success('Indicator updated.', stuff);
                resolve(success);
            }).catch(function(error) {
                console.log(error);
                var success = util.success('Indicator updated.', stuff);
                resolve(success);
            });

        }).catch(function(err) {
            console.log(err);
            var success = util.success('Indicator updated.', stuff);
            resolve(success);
        });

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