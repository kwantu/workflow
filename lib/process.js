'use strict';

var Q = require('q');

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

function persistState(type, processId, subProcessId, formId, docId, config, instance, data){
	var deferred = Q.defer();
	switch(type) {
		case 'process':
			// TODO: Add logic here ...
			var success = util.success('Process instance data persisted successfully.', instance);
			deferred.resolve(success);
			break;
		case 'subProcess':
			// TODO: Add code logic here...
			var success = util.success('Sub-Process instance data persisted successfully.', instance);
			deferred.resolve(success);
			break;
		case 'form':
			// TODO: Add code logic here...
			var success = util.success('Form instance data persisted successfully.', instance);
			deferred.resolve(success);
			break;
		case 'indicator':
			// TODO: Add code logic here...
			var success = util.success('Indicator instance data persisted successfully.', instance);
			deferred.resolve(success);
			break;
		default:
			var error = util.error('WF005');
			deferred.reject(error);
	}
	return deferred.promise;
};

function preRequisites(prerequisites) {
	var deferred = Q.defer();
	var completed = [];
	var result = {
		complete: false,
		data: []
	};
	util.syncLoop(prerequisites.length, function(loop){
		var counter = loop.iteration();
		preRequisite(prerequisites[counter], counter).then(function(data){			
			// Check if all pre-requisites completed successfully.
			completed.push(data.complete);
			result.data.push(data);
			if (completed.every(Boolean)) {
				result.completed = true;
				loop.next();
				var success = util.success('Pre-requisites completed successfully.', result);
				deferred.resolve(success);
			} else {
				loop.break();
				var error = util.error('WF007');
				deferred.reject(error);
			}
		}).fail(function(err){
			loop.break();
			deferred.reject(err);
		});
	});
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

function initaite(){
	return 'Implementation pending..';
};

function subProcess(){
	return 'Implementation pending..';
};

function preActions(){
	return 'Implementation pending..';
};

function postActions(){
	return 'Implementation pending..';
};

function action(){
	return 'Implementation pending..';
};

function func(){
	return 'Implementation pending..';
};

module.exports = { 

 	persistState: persistState,
 	preRequisites: preRequisites

}