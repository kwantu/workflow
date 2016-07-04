'use strict';

var util = require('./utility');

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
	// console.log(step);
	var result = [];
	return new Promise(function(resolve, reject) {
		
		util.syncLoop(indicators.length, function(loop){
			var counter = loop.iteration();
			var indicatorId = indicators[counter]._id;
			var indicatorName = indicators[counter].name.i18n.value;
			// Comment out for testing
			// var indicator = {};
			// library.createIndicatorInstance(indicatorId, _WFInstance.profile).done(function(data){
			// 	indicator = data;
			// 	indicators.push(indicator);
			// 	loop.next();
			// }).fail(function(err){
			// 	console.log(err);
			// });
			// TODO: Replace with the gatekeeper call and return the object
			var uuid = _WFInstance.profile + ':' + _WFInstance.app + ':' + indicatorId + ':0';
			// This should be the data returned from the gatekeeper call.
			var indicatorDoc = {
				"_id": uuid,
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
			_WFInstance.indicators.push(indicatorDoc);
			loop.next();
		}, function(){
		    var success = util.success('Form created successfully.', _WFInstance.indicators);
				resolve(success);
		});
		var success = util.success('Form indicator set saved successfully.', result);
		resolve(success);
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
