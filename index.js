'use strict';

var fs = require('fs');
var path = require('path');
var Q = require('q');

var util = require('./lib/utility');
var Process = require('./lib/process');

/*globals */

/** 
 * Kwantu workflow engine
 *
 * @constructor
 * @param {string} profile - Profile UUID
 * @param {Object} [config] - Workflow configuration
 * 	@param {string} config._id 
 *	Workflow configuration / definition ID
 * @param {Object} [instance] - Workflow instance
 * 	@param {string} instance._id 
 *	Workflow instance ID
 * @author Brent Gordon
 * @version 0.1.0
 *
 * @example new Workflow('1234', {})
 * 
 *
 * @return {Object} new Workflow object
 *
 * @throws "ERROR: Message"
 *
 */

function Workflow(profile, config, instance){
	//
	var _this = this;
	// Profile ID validation checks
	if (profile === '' || profile === undefined) {
        throw new Error('A profile id is required.');
    } else if (typeof(profile) !== 'string') {
    	throw new Error('The profile id must be a javascript string.');
    } else {
    	_this.profile = profile || '';
    }
    // Workflow configuration validation checks
    if (config === '' || config === undefined) {
    	throw new Error('A workflow configuration is required.');
    } else if (typeof(JSON.parse(config)) !== 'object') {
        throw new Error('The workflow configuration must be a javascript object');
    } else {
    	_this.config = JSON.parse(config) || {};
    }
    // Workflow instance validation checks
    if (instance === '' || instance === undefined) {

    } else {
    	_this.instance = JSON.parse(instance);
    };
}

/** 
 * Create a new workflow process.
 *
 * @example 
 * Workflow.create();
 *
 * @return Success / error message with the newly created workflow processes
 * instance data.
 *
 */
Workflow.prototype.create = function(){
	//
	var _this = this;
	var deferred = Q.defer();
	if (_this.instance !== undefined) {
		var warn = util.warn('Instance already exists.', _this.instance)
		deferred.resolve(warn);
	} else {
		// Create the workflow processes instance object
		var file = path.join(__dirname, 'models/processes.json');
		var model = JSON.parse(fs.readFileSync(file, 'utf8'));
		model._id = _this.profile + ':' + _this.config._id + ':processes';
		model._version = _this.config._version;
		_this.instance = model;
		var success = util.success('Workflow processes instance created successfully.', _this.instance);
		deferred.resolve(success);
	}
	return deferred.promise;
};

/** 
 * Workflow process, this function executes and process within a workflow
 * configuration.
 *
 * @param {object} processId - the process id to process
 *
 * @example 
 * Workflow.process();
 *
 * @return ''
 *
 */
Workflow.prototype.process = function(processId, inputData){
	// Re-assign this 
	var _this = this;
	// Create the deffered object
	var deferred = Q.defer();
	if (processId !== '' || processId !== undefined) {
		// Get the current process config
		var currentProcess = _this.config.processes.filter(function(objProcess){
			if (objProcess._id === processId) {
				return objProcess;
			}
		});
		// 1. Check the process instance data, if required, update
		Process.persistState('process', processId, '', '', '', currentProcess, _this.instance, inputData).then(function(result){
			_this.instance = result.res;
			// 2. Complete all the process prerequisites
			Process.preRequisites(currentProcess[0].prerequisites).then(function(result){
				// Check if all pre-requisites were met
				if (result.complete) {
					var success = util.success('Process: ' + processId + ' completed successfully.', _this.instance);
					deferred.resolve(success);
				} else {
					var error = util.error('WF004');
					deferred.reject(error);
				}
			}).fail(function(err){
				var error = util.error('WF003', err);
				deferred.reject(error);
			});
		}).fail(function(err){
			var error = util.error('WF002', err);
			deferred.reject(error);
		});
	} else {
		var error = util.error('WF001');
		deferred.reject(error);
	}
	// Return the deffered promise object
	return deferred.promise;
};

Workflow.prototype.subProcess = function(){
	return 'Implementation pending..';
};

Workflow.prototype.step = function(){
	return 'Implementation pending..';
};

Workflow.prototype.assign = function(){
	return 'Implementation pending..';
};

Workflow.prototype.transition = function(){
	return 'Implementation pending..';
};

Workflow.prototype.close = function(){
	return 'Implementation pending..';
};

module.exports = Workflow;
