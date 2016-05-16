'use strict';

var Q = require('q');

/*globals */

/** 
 * Kwantu workflow engine
 *
 * @constructor
 * @param {string} profile - Profile UUID
 * @param {Object} [config]
 * 	@param {string} config._id 
 *	Workflow configuration / definition ID
 * @author Brent Gordon
 * @version 0.1.0
 *
 * @example 
 * 
 *
 * @return {Object} new Workflow object
 *
 * @throws "ERROR: Message"
 *
 */

function Workflow(profile, config){
	// Profile ID validation checks
	if (profile === '' || profile === undefined) {
        throw new Error('A profile id is required.');
    } else if (typeof(profile) !== 'string') {
    	throw new Error('The profile id must be a javascript string.');
    } else {
    	this.profile = profile || '';
    }
    // Workflow configuration validation checks
    if (config === '' || config === undefined) {
    	throw new Error('A workflow configuration is required.');
    } else if (typeof(config) !== 'object') {
        throw new Error('The workflow configuration must be a javascript object');
    } else {
    	this.config = config || {};
    }
}

/** 
 * Execute a workflow process / subprocess / step / action / transition. This
 * method is used as a generic way to execute any step in the workflow and 
 * should be used as the calling method via a rest API implementation.
 *
 * @param {string} profile - profile UUID
 * @param {string} config - workflow configuration file UUID
 * @param {string} process - workflow process ID
 * @param {string} subprocess - workflow subprocess ID
 * @param {string} step - workflow step ID
 * @param {string} token - current workflow generated token for the step
 * @param {string} instance - workflow process instance file UUID
 * @param {string} document - indicator set document UUID
 *
 * @example 
 * Workflow.exec();
 *
 * @return Success / error message with the newly created workflow processes
 * instance data.
 *
 */
Workflow.prototype.exec = function(profile, config, process, subprocess, step, token, processes, document){
	var deferred = Q.defer();
	// Add implementation code here ...

	return deferred.promise;
};

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
	var deferred = Q.defer();
	// Process the first process of the workflow configuration
	var initProcess = this.config.processes.process[0];
	this.process(initProcess).then(function(ret){
		deferred.resolve(ret);
	}).fail(function(err){
		deferred.reject(err);
	});
	return deferred.promise;
};

/** 
 * Workflow initaition process. Used to process the defined initiation process
 * in the configuration file.
 *
 * @example 
 * Workflow.initaite();
 *
 * @return Success / error message with the newly created workflow processes
 * instance data.
 *
 */
Workflow.prototype.initaite = function(initaite){
	var deferred = Q.defer();
	if (initaite.type === 'user' && initaite.subProcess.init === 'true') {
		// Add implementation code here ...

		deferred.resolve(initaite);
	} else if (initaite.type === 'user' && initaite.subProcess.init === 'false') {
		// Add implementation code here ...

		deferred.resolve(initaite);
	} else if (initaite.type === 'schedule') {
		// Add implementation code here ...

		deferred.resolve(initaite);
	} else if (initaite.type === 'periodic') {
		// Add implementation code here ...

		deferred.resolve(initaite);
	} else if (initaite.type === 'auto') {
		// Add implementation code here ...

		deferred.resolve(initaite);
	} else {
		// Return error message
		var err = 'Workflow initiation failed. Initiate type not found.';
		deferred.reject(err);
	}
	return deferred.promise;
};

// Workflow.prototype.assign = function(assign){
// 	return 'Implementation pending..';
// };

// Workflow.prototype.variables = function(variables){
// 	return 'Implementation pending..';
// };

// Workflow.prototype.roles = function(roles){
// 	return 'Implementation pending..';
// };

// Workflow.prototype.processes = function(processes){
// 	return 'Implementation pending..';
// };

/** 
 * Workflow process, this function executes and process within a workflow
 * configuration.
 *
 * @example 
 * Workflow.process();
 *
 * @return Success / error message with the newly created workflow processes
 * instance data.
 *
 */
Workflow.prototype.process = function(process){
	var deferred = Q.defer();
	// Process the prerequisites
	var preRequisites = process.prerequisites;
	this.preRequisites(preRequisites).then(function(ret){
		console.log('Pre-requisite processing completed.');
		// Process the pre-actions
		var preActions = process.preActions;
		this.preActions(preActions).then(function(ret){
			console.log('Pre-actions processing completed.');
			// Process the initiation of the workflow process instance file etc..
			var initaite = process.initaite;
			this.initaite(initaite).then(function(instance){
				// Process the post-actions
				var postActions = process.postActions;
				this.postActions(postActions).then(function(ret){
					// On success: persist the data
					// Include the action to persist the data here...
					deferred.resolve(instance);
				}).fail(function(err){
					deferred.reject(err);
				});
			}).fail(function(err){
				deferred.reject(err);
			});
		}).fail(function(err){
			deferred.reject(err);
		});
	}).fail(function(err){
		deferred.reject(err);
	});
	// Return the deffered promise object
	return deferred.promise;
};

Workflow.prototype.subProcesses = function(subProcesses){
	return 'Implementation pending..';
};

Workflow.prototype.subProcess = function(subProcess){
	return 'Implementation pending..';
};

/** 
 * Process all the workflow pre-actions.
 *
 * @example 
 * Workflow.preActions();
 *
 * @return Success / error message with the newly created workflow processes
 * instance data.
 *
 */

Workflow.prototype.preActions = function(actions){
	var deferred = Q.defer();
	console.log('Processing all pre-actions...');
	for (var i = 0; i < actions.action.length; i++) {
		var action = actions.action[i];
		this.action(action, i).then(function(ret){
			deferred.resolve(ret);
		}).fail(function(err){
			deferred.reject(err);
		});
	}
	return deferred.promise;
};

Workflow.prototype.postActions = function(actions){
	return 'Implementation pending..';
};

Workflow.prototype.preRequisites = function(prerequisites){
	var deferred = Q.defer();
	console.log('Processing all pre-requisites...');
	for (var i = 0; i < prerequisites.prerequisite.length; i++) {
		var prerequisite = prerequisites.prerequisite[i];
		this.preRequisite(prerequisite, i).then(function(ret){
			deferred.resolve(ret);
		}).fail(function(err){
			deferred.reject(err);
		});
	}
	return deferred.promise;
};

Workflow.prototype.preRequisite = function(prerequisite, counter){
	var deferred = Q.defer();
	console.log('Processing pre-requisite number ' + counter + '...');
	// Add implementation code here ...

	return deferred.promise;
};

Workflow.prototype.action = function(action, counter){
	var deferred = Q.defer();
	console.log('Processing action number ' + counter + '...');
	// Add implementation code here ...

	return deferred.promise;
};

Workflow.prototype.steps = function(steps){
	return 'Implementation pending..';
};

Workflow.prototype.step = function(step){
	return 'Implementation pending..';
};

Workflow.prototype.transition = function(transition){
	return 'Implementation pending..';
};

Workflow.prototype.condition = function(condition){
	return 'Implementation pending..';
};

Workflow.prototype.func = function(func, params){
	return 'Implementation pending..';
};

Workflow.prototype.error = function(){
	return 'Implementation pending..';
};

Workflow.prototype.success = function(){
	return 'Implementation pending..';
};

Workflow.prototype.close = function(){
	return 'Implementation pending..';
};

module.exports = Workflow;
