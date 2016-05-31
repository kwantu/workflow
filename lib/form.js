'use strict';

var Q = require('q');
var moment = require('moment');

var util = require('./utility');

/**
 * Form Module
 *
 * @module lib/form
 * @author Brent Gordon
 * @version 2.0.0
 * @description 
 * @copyright Kwantu Ltd RSA 2009-2015.
 *
 */

function create(formDef, workflow){
	var deferred = Q.defer();
	var indicators = [];
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
		deferred.resolve(success);
	});
	return deferred.promise;
};

function save(indicator){
	var deferred = Q.defer();
	var completed = [];
	var result = {
		complete: true,
		data: []
	};
	var success = util.success('Form indicator set saved successfully.', result);
	deferred.resolve(success);
	return deferred.promise;
};

function submit(form){
	var deferred = Q.defer();
	var completed = [];
	var result = {
		complete: true,
		data: []
	};
	var success = util.success('Form submitted successfully.', result);
	deferred.resolve(success);
	return deferred.promise;
};

function authorise(form){
	var deferred = Q.defer();
	var completed = [];
	var result = {
		complete: true,
		data: []
	};
	var success = util.success('Form authorised successfully.', result);
	deferred.resolve(success);
	return deferred.promise;
};

function close(form){
	var deferred = Q.defer();
	var completed = [];
	var result = {
		complete: true,
		data: []
	};
	var success = util.success('Form closed successfully.', result);
	deferred.resolve(success);
	return deferred.promise;
};

module.exports = { 

 	create: create,
 	save: save,
 	submit: submit,
 	authorise: authorise,
 	close: close

}