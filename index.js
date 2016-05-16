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
 * Instantiate a new workflow process.
 *
 * @example 
 * Workflow.init();
 *
 * @return Success / error message with the newly created workflow processes
 * instance data.
 *
 */
Workflow.prototype.init = function(){
	var deferred = Q.defer();
	// Process the pre-actions of the first defined process in the config.
	var preActions = this.config.processes.process[0].preActions;
	this.preActions(preActions).then(function(ret){
		deferred.resolve(res);
	}).fail(function(err){
		deferred.reject(err);
	});
	return deferred.promise;
};

Workflow.prototype.assign = function(assign){
	return 'Implementation pending..';
};

Workflow.prototype.variables = function(variables){
	return 'Implementation pending..';
};

Workflow.prototype.roles = function(roles){
	return 'Implementation pending..';
};

Workflow.prototype.processes = function(processes){
	return 'Implementation pending..';
};

Workflow.prototype.process = function(process){
	return 'Implementation pending..';
};

Workflow.prototype.subProcesses = function(subProcesses){
	return 'Implementation pending..';
};

Workflow.prototype.subProcess = function(subProcess){
	return 'Implementation pending..';
};

Workflow.prototype.preActions = function(actions){
	return 'Implementation pending..';
};

Workflow.prototype.postActions = function(actions){
	return 'Implementation pending..';
};

Workflow.prototype.preRequisites = function(prerequisites){
	return 'Implementation pending..';
};

Workflow.prototype.action = function(action){
	return 'Implementation pending..';
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
