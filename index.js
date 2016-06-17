'use strict';

var Process = require('./lib/process');

var util = require('./lib/utility');

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
	// Re-assign the Workflow constructor instance as _this
	var _this = this;
	return new Promise(function(resolve, reject) {
		// Try the block of code
		try {
			if (_this.instance !== undefined) {
				var warn = util.warn('Instance already exists.', _this.instance)
				resolve(warn);
			} else {
				// Create the workflow processes instance object
				var model = {
				    _id: "",
				    version: "",
				    type: "workflowInstance",
				    processes: []
				};
				model._id = _this.profile + ':processes';
				model.version = _this.config.version;
				_this.instance = model;
				var success = util.success('Workflow processes instance created successfully.', _this.instance);
				resolve(success);
			}
		// Catch any unforseen errors
		} catch (err) {
			reject(err);
		}
	});
};

/** 
 * Workflow initialise, this function executes a process within a workflow
 * configuration.
 *
 * @param {string} processId - the process id to process
 * @param {object} data - the input data to process
 *
 * @example 
 * Workflow.initialize('processId', { validDate: 'date' });
 *
 * @return ""
 *
 */
Workflow.prototype.initialise = function(processId, data){
	// Re-assign the Workflow constructor instance as _this
	var _this = this;
	return new Promise(function(resolve, reject) {
		try {
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
					var error = util.error('WFConfigError', 'No valid process definition found with process id: ' + processId);
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
		      	"seq": "", 
		      	"subProcesses": []
			}
			// 1. Update the process id and seq
			processModel.id = processId;
			processModel.seq = nextSeq;
			_this.instance.processes.push(processModel);
			// 2. Complete all the process prerequisites
			Process.preRequisites(configProcess[0].prerequisites, _this).then(function(result){
				// 3. Complete all the process pre-actions
				Process.preActions(configProcess[0].preActions, _this).then(function(result){
					// 4. Initialise the first sub-process
					Process.subProcess(processId, configProcess[0].subProcesses[0], 1, data, _this).then(function(result){
						// console.log('subProcess completed.');
						_this.instance = result.res;
						var success = util.success('Process: ' + _this.config.processes[0]._id + ' initialized successfully.');
						resolve(success);
					}, function(err){
						reject(err);
					});
				}, function(err){
					reject(err);
				});
			}, function(err){
				reject(err);
			});
		} catch(err) {
			reject(err);
		}
	});
};

/** 
 * Workflow task, this method executes a specific task.
 *
 * @param {string} processId - the process id to process
 * @param {object} inputData - the input data to process
 *
 * @example 
 * Workflow.initialize('processId', { validDate: 'date' });
 *
 * @return ""
 *
 */
Workflow.prototype.task = function(type, params){
	// Re-assign the Workflow constructor instance as _this
	var _this = this;
	return new Promise(function(resolve, reject) {
		try {
			resolve('Success');
		} catch(err) {	
			reject(err);
		}
	});
};

/** 
 * Workflow transition to the next step. This moves the workflow from the current process,
 * sub-process step to the next one as specified.
 *
 * @param {string} processId - the Workflow config / definition process id
 * @param {string} subProcessId - the Workflow config / definition sub-process id
 * @param {string} stepId - the Workflow config / definition step id
 * @param {string} transitionId - the Workflow config / definition transition id
 * @param {object} data - any additional data passed in as key value pairs
 *
 * @example 
 * Workflow.transition('processId', 'subProcessId', 'stepId', 'transitionId', { key: '', value: '' });
 *
 * @return ""
 *
 */
Workflow.prototype.transition = function(processId, subProcessId, stepId, transitionId, data){
	// Re-assign this 
	var _this = this;
	return new Promise(function(resolve, reject) {
		try {
			Process.transition(processId, subProcessId, stepId, transitionId, data, _this).then(function(result){
				var success = util.success('Workflow transitioned to the next step successfully.', {});
				resolve(success);
			}, function(err){
				reject(err);
			});
		} catch(err) {	
			reject(err);
		}
	});
};

module.exports = Workflow;
