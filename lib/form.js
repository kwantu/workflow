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

function create(formDef, workflow){
	var indicators = [];
	return new Promise(function(resolve, reject) {
		util.syncLoop(formDef.indicators.length, function(loop){
			var counter = loop.iteration();
			var indicatorId = formDef.indicators[counter]._id;
			var indicatorName = formDef.indicators[counter].name.i18n.value;
			// Comment out for testing
			// var indicator = {};
			// library.createIndicatorInstance(indicatorId, workflow.profile).done(function(data){
			// 	indicator = data;
			// 	indicators.push(indicator);
			// 	loop.next();
			// }).fail(function(err){
			// 	console.log(err);
			// });
			var uuid = workflow.profile + ':' + workflow.app + ':' + indicatorId + ':0'; // replace this with gatekeeper call and return the uuid
			var indicator = {
				_id: uuid,
				category: {
					term: indicatorId,
					label: indicatorName
				},
				"processes": []
			};
			indicators.push(indicator);
			loop.next();
		}, function(){
		    // console.log('done');
		    var success = util.success('Form created successfully.', indicators);
			resolve(success);
		});
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
