'use strict';

var Q = require('q');
var moment = require('moment');

var util = require('./utility');

/**
 * Process Module
 *
 * @module lib/process
 * @author Brent Gordon
 * @version 2.0.0
 * @description 
 * @copyright Kwantu Ltd RSA 2009-2015.
 *
 */

function state(workflow, processId, subProcessId){
	var processIndex;
	var subProcessIndex;
	var currentProcessId;
	var currentSubProcessId;
	var processSeq;
	var subProcessSeq;
	if (processInstance !== undefined) {
		var processInstance = workflow.instance.processes.filter(function(objProcess){
			if (objProcess._id === processId) {
				return objProcess;
			}
		});
		processIndex = processInstance.length - 1;
		currentProcessId = workflow.instance.processes[processIndex].id;
		processSeq = workflow.instance.processes[processIndex].seq;
	} else {
		processInstance = [];
		processIndex = 0;
		currentProcessId = processId;
		processSeq = 1;
	}
	if (processInstance.subProcesses !== undefined) {
		var subProcessInstance = processInstance.subProcesses.filter(function(objProcess){
			if (objProcess._id === subProcessId) {
				return objProcess;
			}
		});
		subProcessIndex = subProcessInstance.length - 1;
		currentSubProcessId = workflow.instance.processes[processIndex].subProcesses[subProcessIndex].id;
		subProcessSeq = workflow.instance.processes[processIndex].subProcesses[subProcessIndex].seq;
	} else {
		subProcessInstance = [];
		subProcessIndex = 0;
		currentSubProcessId = subProcessId;
		subProcessSeq = 1;
	}
	var data = {
		profileId: workflow.profile,
		configId: workflow.config._id,
		processId: currentProcessId,
		processIndex: processIndex,
		processSeq: processSeq,
		subProcessId: currentSubProcessId,
		subProcessIndex: subProcessIndex,
		subProcessSeq: subProcessSeq
	}
	return data;
};

function preRequisites(prerequisites) {
	var deferred = Q.defer();
	var completed = [];
	var result = {
		complete: false,
		data: []
	};
	// util.syncLoop(prerequisites.length, function(loop){
	// 	var counter = loop.iteration();
	// 	preRequisite(prerequisites[counter], counter).then(function(data){			
	// 		// Check if all pre-requisites completed successfully.
	// 		completed.push(data.complete);
	// 		result.data.push(data);
	// 		if (completed.every(Boolean)) {
	// 			result.completed = true;
	// 			loop.next();
	// 			var success = util.success('Pre-requisites completed successfully.', result);
	// 			deferred.resolve(success);
	// 		} else {
	// 			loop.break();
	// 			var error = util.error('WF007');
	// 			deferred.reject(error);
	// 		}
	// 	}).fail(function(err){
	// 		loop.break();
	// 		deferred.reject(err);
	// 	});
	// });
	var success = util.success('Pre-requisites completed successfully.', result);
	deferred.resolve(success);
	return deferred.promise;
};
	/** 
 * Workflow pre-requisite, execute the pre-requisite condition.
 *
 * @param {object} config - the pre-requisite config data
 * @param {object} counter - the pre-requisite count / number
 * @param {object} instance - the process instance data
 * @param {object} doc - the current active document
 *
 * @example 
 * var config = {
 *	    "_seq": "",
 *	    "_type": "",
 *		"_subject": "",
 *	    "_operator": "",
 *	    "_value": "",
 *	    "_reference": "",
 *	    "message": {
 *	    	"i18n": {
 *	    		"_lang": "en",
 *	    		"value": ""
 *	    	}
 *	    }
 *	};
 * Workflow.preRequisite(config, counter, instance, doc);
 *
 * @return Success / error message with the newly created workflow processes
 * instance data.
 *
 */
function preRequisite(prerequisite, counter){
	var deferred = Q.defer();
	switch(prerequisite._type) {
		case 'mock':
			// Used for mock testing
			if (util.compare(prerequisite._subject, prerequisite._operator, prerequisite._value)) {
				var data = {};
				var success = util.success('Mock successfull.', data);
				deferred.resolve(success);
			} else {
				// console.warn('Pre-requisite ' + counter + ' not met.');
				var error = util.error('WF006');
				deferred.reject(error);
			}
			break;
		// TODO: Add the call to the relevant methods based on the _type 
		// attribute.
		case 'count':
			// TODO: Add code logic here...
			var data = {};
			var success = util.success('Mock count successfull.', data);
			deferred.resolve(success);
			break;
		default:
			var error = util.error('WF005');
			deferred.reject(error);
	}
	return deferred.promise;
};

function preActions(preActions){
	var deferred = Q.defer();
	var completed = [];
	var result = {
		complete: false,
		data: []
	};
	var success = util.success('Pre-actions completed successfully.', result);
	deferred.resolve(success);
	return deferred.promise;
};

function subProcess(subProcess, inputData){
	var deferred = Q.defer();
	var today = moment().format('YYYY-MM-DD');
	var completed = [];
	var result = {
		complete: false,
		data: []
	};
	var subProcessModel = {
		"id": subProcess._id, 
		"seq": 1, 
		"initiated": false,
		"status": "",
		"message": "",
		"dates": {
			"created": today,
			"valid": "",
			"due": "",
			"submitted": "",
			"authorised": "",
			"closed": ""
		},
		"complete": false,
		"indicators": []
	};
	// Initiate the sub-process
	initiate(subProcess.initiate, inputData).then(function(result){
		if (result.complete) {
			subProcessModel.initiated = true;
			subProcessModel.dates.valid = result.validDate;
			subProcessModel.dates.valid = result.validDate;
			// Process the first step and any subsequent 'auto' step
			steps(subProcess.steps, subProcess.indicators).then(function(result){
				if (result.complete) {

					var success = util.success('Sub-Process completed successfully.', subProcessModel);
					deferred.resolve(success);
				} else {
					var error = util.error('WF0011');
					deferred.reject(error);
				}
			}).fail(function(err){
				var error = util.error('WF007', err);
				deferred.reject(error);
			}); 
		} else {
			var error = util.error('WF0011');
			deferred.reject(error);
		}
	}).fail(function(err){
		var error = util.error('WF007', err);
		deferred.reject(error);
	});
	return deferred.promise;
};

function initiate(initiate, inputData){
	var deferred = Q.defer();
	var completed = [];
	var result = {
		complete: false,
		data: []
	};
	switch(initiate._type) {
		case 'user':
			// If the subProcess initiation is user defined then
			if (initiate.dates.valid._type === 'userSelected') {
				if (inputData.validDate !== undefined) {
					result.data.validDate = inputData.validDate;
				} else {
					var error = util.error('WF0010');
					deferred.reject(error);
				}
			}
			if (initiate.dates.due._type === 'userSelected') {
				if (inputData.dueDate !== undefined) {
					result.data.dueDate = inputData.dueDate;
				} else {
					var error = util.error('WF0010');
					deferred.reject(error);
				}
			}
			result.complete = true;
			var success = util.success('Sub-Process initiate completed successfully.', result);
			deferred.resolve(success);
			break;
		default:
			var error = util.error('WF005');
			deferred.reject(error);
	}
	return deferred.promise;
};

function steps(steps, indicators){
	var deferred = Q.defer();
	var completed = [];
	var result = {
		complete: true,
		data: []
	};
	
	var success = util.success('Steps processed successfully.', result);
	deferred.resolve(success);
	return deferred.promise;
};

function step(step, indicators){
	return 'Implementation pending..';
};

function actions(){
	return 'Implementation pending..';
};

function postActions(){
	return 'Implementation pending..';
};

function action(action, counter){
	return 'Implementation pending..';
};

function func(){
	return 'Implementation pending..';
};

module.exports = { 

 	state: state,
 	preRequisites: preRequisites,
 	preActions: preActions,
 	subProcess: subProcess

}