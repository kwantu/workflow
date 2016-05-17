'use strict';

var fs = require('fs');
var Q = require('q');
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
 * @example 
 * 
 *
 * @return {Object} new Workflow object
 *
 * @throws "ERROR: Message"
 *
 */

function Workflow(profile, config, instance){
	//
	var self = this;
	// Profile ID validation checks
	if (profile === '' || profile === undefined) {
        throw new Error('A profile id is required.');
    } else if (typeof(profile) !== 'string') {
    	throw new Error('The profile id must be a javascript string.');
    } else {
    	self.profile = profile || '';
    }
    // Workflow configuration validation checks
    if (config === '' || config === undefined) {
    	throw new Error('A workflow configuration is required.');
    } else if (typeof(JSON.parse(config)) !== 'object') {
        throw new Error('The workflow configuration must be a javascript object');
    } else {
    	self.config = JSON.parse(config) || {};
    }
    // Workflow instance validation checks
    if (instance === '' || instance === undefined) {

    } else {
    	self.instance = JSON.parse(instance);
    };
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
 * @param {object} document - indicator set document UUID
 *
 * @example 
 * Workflow.exec();
 *
 * @return Success / error message with the newly created workflow processes
 * instance data.
 *
 */
Workflow.prototype.exec = function(profile, config, process, subprocess, step, token, instance, document){
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
	//
	var self = this;
	var deferred = Q.defer();
	if (self.instance !== undefined) {
		var warn = util.warn('Instance already exists.', self.instance)
		deferred.resolve(warn);
	} else {
		// Process the first process of the workflow configuration
		this.process(self.config.processes[0]).then(function(data){
			var success = util.success('Workflow created suucessfully.', data);
			deferred.resolve(success);
		}).fail(function(err){
			var error = util.error('WF001', err);
			deferred.reject(error);
		});
	}
	return deferred.promise;
};

/** 
 * Workflow process, this function executes and process within a workflow
 * configuration.
 *
 * @param {object} doc - the current active document
 *
 * @example 
 * Workflow.process();
 *
 * @return Success / error message with the newly created workflow processes
 * instance data.
 *
 */
Workflow.prototype.process = function(processConfig, processInstance){
	// Re-assign this 
	var self = this;
	// Create the deffered object
	var deferred = Q.defer();
	// Process instance data
	var instance = processInstance || fs.readFileSync('./models/processes.json', 'utf8');;
	// 1. Complete all the process prerequisites
	self.preRequisites(processConfig.prerequisites, instance).then(function(data){
		// Check if all pre-requisites were met
		if (data.complete) {
			// console.log('Pre-requisite processing completed.');
			// 2. Complete all the process pre-actions
			// self.preActions(processConfig.preActions, instance).then(function(data){
			// 	if (data.complete) {
			// 		console.log('Pre-actions processing completed.');
			// 		// 3. Process the initiation of the workflow process instance file etc..
			// 		self.initaite(processConfig.initaite, instance).then(function(data){
			// 			if (data.complete) {
			// 				console.log('Process initiation completed.');
			// 				// 4. Process the post-actions
			// 				self.postActions(processConfig.postActions, instance).then(function(data){
			// 					if (data.complete) {
			// 						console.log('Post-actions processing completed.');
			// 						// On success: persist the data
			// 						// Include the action to persist the data here...
			// 						deferred.resolve(data);
			// 					} else {
			// 						console.log('All post-actions were not executed successfully.');
			// 						var error = util.error('WF004');
			// 						deferred.reject(error);
			// 					}
			// 				}).fail(function(error){
			// 					deferred.reject(error);
			// 				});
			// 			} else {
			// 				console.log('Process initiation was unsuccessful.');
			// 				var error = util.error('WF003');
			// 				deferred.reject(error);
			// 			}
			// 		}).fail(function(err){
			// 			deferred.reject(error);
			// 		});
			// 	} else {
			// 		console.log('All pre-actions were not executed successfully.');
			// 		var error = util.error('WF002');
			// 		deferred.reject(error);
			// 	}
			// }).fail(function(err){
			// 	deferred.reject(error);
			// });
			var success = util.success('Process: ' + processConfig._id + ' completed successfully.', instance);
			deferred.resolve(success);
		} else {
			// console.log('All pre-requisites were not met.');
			var error = util.error('WF001');
			deferred.reject(error);
		}
	}).fail(function(err){
		deferred.reject(error);
	});
	// Return the deffered promise object
	return deferred.promise;
};

Workflow.prototype.preRequisites = function(preRequisitesConfig, preRequisitesInstance){
	var self = this;
	var deferred = Q.defer();
	var completed = [];
	var result = {
		complete: false,
		data: []
	};
	// console.log('Processing all pre-requisites...');
	util.syncLoop(preRequisitesConfig.length, function(loop){
		var counter = loop.iteration();
		self.preRequisite(preRequisitesConfig[counter], counter, preRequisitesInstance).then(function(data){			
			// Check if all pre-requisites completed successfully.
			completed.push(data.complete);
			result.data.push(data);
			if (completed.every(Boolean)) {
				result.completed = true;
				// console.log('Pre-requisites completed successfully.');
				loop.next();
				var success = util.success('Pre-requisites completed successfully.', result);
				deferred.resolve(success);
			} else {
				// console.warn('Pre-requisites not met.');
				loop.break();
				var error = util.error('WF007');
				deferred.reject(error);
			}
		}).fail(function(err){
			loop.break();
			// console.warn('Pre-requisites not met.', err);
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
Workflow.prototype.preRequisite = function(preRequisiteConfig, counter, preRequisiteInstance){
	var deferred = Q.defer();
	// console.log('Processing pre-requisite number ' + counter + '...');
	// Add implementation code here ...
	switch(preRequisiteConfig._type) {
		case 'mock':
			// Used for mock testing
			if (util.compare(preRequisiteConfig._subject, preRequisiteConfig._operator, preRequisiteConfig._value)) {
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
			// Add code logic here...
			var data = {};
			var success = util.success('Mock count successfull.', data);
			deferred.resolve(success);
			break;
		default:
			// console.log('Pre-requisites _type: ' + preRequisiteConfig._type + ' not found.');
			var error = util.error('WF005');
			deferred.reject(error);
	}
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
	if (initaite.type === 'user') {
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

Workflow.prototype.subProcesses = function(config, instance){
	return 'Implementation pending..';
};

/** 
 * Workflow process, this function executes and process within a workflow
 * configuration.
 *
 * @param {object} config - the process config data
 * @param {object} instance - the process instance data
 *
 * @example 
 * Workflow.process();
 *
 * @return Success / error message with the newly created workflow processes
 * instance data.
 *
 */
Workflow.prototype.subProcess = function(config, instance){
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

// Workflow.prototype.error = function(code){
// 	return 'Implementation pending..';
// };

// Workflow.prototype.success = function(message, data){
// 	return 'Implementation pending..';
// };

Workflow.prototype.close = function(){
	return 'Implementation pending..';
};

module.exports = Workflow;
