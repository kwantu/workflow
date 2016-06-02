'use strict';

var Promise = require('es6-promise').Promise;

var util = require('./lib/utility');
var Process = require('./lib/process');
var models = require('./lib/models');

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

function Workflow(profile, app, config, instance){
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
    // App ID validation checks
	if (app === '' || app === undefined) {
        throw new Error('An app id is required.');
    } else if (typeof(app) !== 'string') {
    	throw new Error('The app id must be a javascript string.');
    } else {
    	_this.app = app || '';
    }
    // Workflow configuration validation checks
    if (config === '' || config === undefined) {
    	throw new Error('A workflow configuration is required.');
    } else if (typeof(config) !== 'object') {
        _this.config = JSON.parse(config);
    } else {
    	_this.config = config;
    }
    // Workflow instance validation checks
    _this.instance = instance;
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
	// Use the native es6 Promise constructor
	return new Promise(function(resolve, reject) {
		if (_this.instance !== undefined) {
			var warn = util.warn('Instance already exists.', _this.instance)
			resolve(warn);
		} else {
			// Create the workflow processes instance object
			var model = models.instance();
			model._id = _this.profile + ':processes';
			model.version = _this.config.version;
			// Update the processes and subProcesses sections with defaults
			// model.processes[0].id = _this.config.processes[0]._id;
			// model.processes[0].seq = 1;
			_this.instance = model;
			var success = util.success('Workflow processes instance created successfully.', _this.instance);
			resolve(success);
		}
	});
};

/** 
 * Workflow initialize, this function executes a process within a workflow
 * configuration.
 *
 * @param {string} processId - the process id to process
 * @param {object} inputData - the input data to process
 *
 * @example 
 * Workflow.initialize('processId', { validDate: 'date' });
 *
 * @return 
 * { complete: true, message: 'Process: 'processId' initialized successfully.', res: undefined }
 *
 */
Workflow.prototype.initialize = function(processId, inputData){
	// Re-assign this 
	var _this = this;
	// Use the native es6 Promise constructor
	return new Promise(function(resolve, reject) {
		var configProcess = [];
		// Check the passed in parameters
		if (processId !== '' && processId !== undefined) {
			// Get the current process config
			configProcess = _this.config.processes.filter(function(objProcess){
				if (objProcess._id === processId) {
					return objProcess;
				}
			});
			if (configProcess[0]._id === undefined) {
				var error = util.error('WF001', err);
				reject(error);
			}
		} else {
			configProcess.push(_this.config.processes[0]);
			processId = _this.config.processes[0]._id;
		}
		// Get the current list of process instances
		var processSeq = 1;
		var currentProcess = [];
		currentProcess = _this.instance.processes.filter(function(objProcess){
			if (objProcess.id === processId) {
				return objProcess;
			}
		});
		var currentSeq = currentProcess.length;
		var nextSeq = currentSeq + 1;
		// Push the process object into the array
		var processModel = {
			"id": "", 
	      	"seq": nextSeq, 
	      	"subProcesses": []
		}
		// 1. Update the process id and seq
		processModel.id = processId;
		processModel.seq = processSeq;
		_this.instance.processes.push(processModel);
		// 2. Complete all the process prerequisites
		Process.preRequisites(configProcess[0].prerequisites, _this).then(function(result){
			// Check if all pre-requisites were met
			if (result.complete === true) {
				// 3. Complete all the process pre-actions
				Process.preActions(configProcess[0].preActions, _this).then(function(result){
					// Check if all pre-actions were met
					if (result.complete) {
						// 4. Initialise the first sub-process
						Process.subProcess(processId, configProcess[0].subProcesses[0], 1, inputData, _this).then(function(result){
							// Check if sub-process initialisation was successfull
							if (result.complete) {
								// 5. Update the subProcess section details in the processes model
								var subProcessModel = result.res;
								// _this.instance.processes[processIndex].subProcesses.push(subProcessModel);
								_this.instance.processes.filter(function(objProcess){
									if (objProcess.id === processId) {
										objProcess.subProcesses.push(subProcessModel);
									}
								});
								var success = util.success('Process: ' + _this.config.processes[0]._id + ' initialized successfully.');
								resolve(success);
							} else {
								var error = util.error('WF008');
								reject(error);
							}
						}).fail(function(err){
							reject(err);
						});
					} else {
						var error = util.error('WF006');
						reject(error);
					}
				}).fail(function(err){
					reject(err);
				});
			} else {
				var error = util.error('WF004');
				reject(error);
			}
		}).fail(function(err){
			reject(err);
		});
	});
};

Workflow.prototype.task = function(type, params){
	// Re-assign this 
	var _this = this;
	// Use the native es6 Promise constructor
	return new Promise(function(resolve, reject) {
		if (type === 'indicator.markComplete') {
			resolve('Success');
		} else {
			reject('Error');
		}
	});
};

Workflow.prototype.transition = function(processId, subProcessId, stepId, transitionId, subProcessModel, workflow){
	// Re-assign this 
	var _this = this;
	// Use the native es6 Promise constructor
	return new Promise(function(resolve, reject) {
		Process.transition(processId, subProcessId, stepId, transitionId, subProcessModel, workflow).then(function(result){
			var success = util.success('Workflow transitioned to the next step successfully.', subProcessModel);
			resolve(success);
		}).fail(function(err){
			reject(err);
		});	
	});
};

module.exports = Workflow;

















