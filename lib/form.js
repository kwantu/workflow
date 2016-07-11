'use strict';

// var GK = require('./gatekeeper');
var util = require('utility');
// var uuid = require('node-uuid');

// var gatekeeper = new GK();

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

function create(args){
	var processId = args[0] || '';
	// console.log(processId);
	var subProcess = args[1] || {};
	// console.log(subProcess);
	var indicators = subProcess.indicators || [];
	// console.log(indicators);
	var _WFInstance = args[3] || {};
	// console.log(_WFInstance);
	var step = args[2] || {};
	// var data = args[3] || {};
	// console.log(step);
	var result = [];
	// console.log(subProcess);
	return new Promise(function(resolve, reject) {
		util.syncLoop(indicators.length, function(loop){
			var counter = loop.iteration();
			var indicatorId = indicators[counter]._id;
			var indicatorName = util.getName(indicators[counter].name, 'en');
			var id = _WFInstance.profile + ':' + _WFInstance.app + ':' + indicatorId + ':0';

			// TODO: Replace with the gatekeeper promise call, return the object, update the indicator
			// document workflow processes data and update the workflow class indicators array.

			// gatekeeper.instantiate(id, 'newInstance', indicatorId, _WFInstance.profile, data.validDate).then(function(doc){
			//	// Update the indicator workflow processes section
			//	var workflows = doc.workflows;
			//	workflows.id = _WFInstance.config._id;
			//	workflows.instance = _WFInstance.instance._id;
			//	_WFInstance.indicators.push(doc);
			//	loop.next();
			// }, function(err){
			//	reject(err);
			// })

			// This should be the data returned from the gatekeeper call.
			var doc = {
				"_id": id,
				"title": indicatorName,
				"category": {
					"term": indicatorId,
					"label": indicatorName
				},
				"workflows": [{
	        "id": _WFInstance.config._id,
	        "instance": _WFInstance.instance._id,
	        "processes": [{
            "id": processId,
            "subProcessId": subProcess._id,
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
		    }]
			};

			// Update the indicators property array
			_WFInstance.indicators.push(doc);
			// Got to the next process item
			loop.next();
		}, function(){
			// On completion of all process loop items
	    var success = util.success('Form created successfully.', _WFInstance.indicators);
			resolve(success);
		});
		// var success = util.success('Form indicator set saved successfully.', result);
		// resolve(success);
	});
};

function save(indicator){
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

function submit(form){
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

function authorise(form){
	var completed = [];
	var result = {
		complete: true,
		data: []
	};
	return new Promise(function(resolve, reject) {

		var success = util.success('Form authorised successfully.', result);
		resolve(success);
	});
};

function close(form){
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

module.exports = {

 	create: create,
 	save: save,
 	submit: submit,
 	authorise: authorise,
 	close: close

}
