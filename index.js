'use strict';

var Process = require('./lib/process');
var util = require('./lib/utility');

/*globals */

/** 
 * A new Workflow constructor instance contains the reference to the application
 * and associated profile which it requires as the first two parameters. It also
 * requires a workflow configuration, as the third parameter, which is used to 
 * descibe the workflow processes. If a workflow instance exists you can pass it
 * in as the fourth parameter which it will then use, else create a new one.
 *
 * @constructor
 *
 * @param {string} profile - The current profile id
 * @param {string} app - The associated application id
 * @param {Object} config - The application workflow configuration / definition 
 * @param {Object} [instance] - An existing application profile workflow instance based 
 * on the definition
 *
 * @author Brent Gordon
 * @version 0.1.0
 *
 * @example 
 * var config = { '_id': 'abc123' };
 * var instance = { '_id': 'instance_abc123' };
 * // If there isn't an existing instance
 * var workflow = new Workflow('1234', '5678', config);
 * // If there is an existing instance
 * var workflow = new Workflow('1234', '5678', config, instance);
 *
 * @return {Object} new Workflow object
 *
 * @throws ERROR: A profile id is required
 * @throws ERROR: An app id is required
 * @throws ERROR: A workflow configuration is required
 *
 */

function Workflow(profile, app, config, instance){
	var _this = this;
	// Profile ID validation checks
	if (profile === '' || profile === undefined) {
        throw util.error('ParamRequired', 'A profile id is required.');
    } else if (typeof(profile) !== 'string') {
    	throw new Error('The profile id must be a javascript string.');
    } else {
    	_this.profile = profile || '';
    }
    // App ID validation checks
	if (app === '' || app === undefined) {
        throw util.error('ParamRequired', 'An app id is required.');
    } else if (typeof(app) !== 'string') {
    	throw new Error('The app id must be a javascript string.');
    } else {
    	_this.app = app || '';
    }
    // Workflow configuration validation checks
    if (config === '' || config === undefined) {
    	throw util.error('ParamRequired', 'A workflow configuration is required.');
    } else if (typeof(config) !== 'object') {
        _this.config = JSON.parse(config);
    } else {
    	_this.config = config;
    }
    // Workflow instance validation checks
    _this.instance = instance;
}

/** 
 * This method creates a new workflow process i.e. it creates a workflow processes instance 
 * object with the minimum required data. This instance can be referenced in the following
 * way, see example below.
 *
 * @example 
 * var config = { '_id': 'abc123' };
 * var workflow = new Workflow('1234', '5678', config);
 * workflow.create().then(function(result){ 
 *	console.log(result.message); 
 *	// The following properties can now be accessed
 * 	var profile = workflow.profile;
 * 	var app = workflow.app;
 * 	var config = workflow.config;
 *	// On success you can access the instance the following way
 *	var instance = workflow.instance;
 * }, function(error){ 
 *	console.log(error); 
 * });
 *
 * @return {Object} new Workflow instance with updated instance data.
 *
 */
Workflow.prototype.create = function(){
	var _this = this;
	return new Promise(function(resolve, reject) {
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
 * @param {object} [data] - the input data to process
 *
 * @example 
 * Workflow.initialize('processId', { validDate: 'date' });
 *
 * @return ""
 *
 */
Workflow.prototype.initialise = function(processId, data){
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
