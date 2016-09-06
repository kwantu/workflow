'use strict';

//var gatekeeper = require('../bower_components/gatekeeper');
var util = require('utility');

// var uuid = require('node-uuid');

 var gatekeeper = new GK();

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
	
	var subProcess = args[1] || {};
	
	var step = args[2] || {};
	
	var action = args[3] || {};
	
	var _WFInstance = args[6] || {};
	
	var data = args[6] || {};
	
	var indicators = subProcess.indicators || [];
	
	var result = [];
	
	var indicatorType = action._type;

	var processSeq =  args[4] || '';
	
	var subProcessSeq =  args[5] || '';
	
	var createType =  args[7] || '';

	var subProcessId = subProcess._id;

	var uuid =  args[8] || '';

	var baseUUID =  args[9] || '';

	return new Promise(function(resolve, reject) {
		var toProcess = indicators.length;

		var formCreateFn = function(id, indicatorType, indicatorId, validDate, instantiateSource){

			gatekeeper.instantiate(id, indicatorType, indicatorId, _WFInstance.profile, validDate).then(function(docArray){
				// Update the indicator workflow processes section
				
				for (var i = 0; i< docArray.length; i++) {
					var object = docArray[i];
					if(!object.model._id.endsWith(':approved') && !object.model._id.endsWith(':rejected')){

						var workflowObj = {
					        "id": _WFInstance.config._id,
					        "instance": _WFInstance.instance._id,
					        "processes": [{
					            "id": processId,
					            "subProcessId": subProcess._id,
					            "subProcessUUID":uuid,
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
						}
						object.model.workflows.push(workflowObj);
						var mainId = object.model._id;
						// persist via gk so that it is save in couch
						gatekeeper.persist(docArray).then(function(savedArray){
							//using same id call initialiseData
							//call code to set to setInstance
							dao.get(mainId).done(function(data){
								

								var indicatorModel = ko.mapping.fromJS({
									"defaultModel":{
										"setId":indicatorId
									}
								});

								gatekeeper.instantiateData(mainId, instantiateSource ,indicatorModel, data.model.pending.seq).then(function(data){

									if(data[0].status == "200"){
										gatekeeper.persist(data).then(function(savedArray){
											dao.get(mainId).done(function(data){
												if (_WFInstance.indicators.length == 0) {
													_WFInstance.indicators.push(data);
													toProcess--;
													if(toProcess == 0)
													{
														var success = util.success('Form created successfully.', _WFInstance.indicators);
													
														resolve(success);
													}
												} else {
													var found = false;
													for (var index = 0; index < _WFInstance.indicators.length; index++){
														var indicator = _WFInstance.indicators[index];
														if (indicator._id == data._id) {
															found =  true;
															// Remove the current item from the array and add the updated processModel
															_WFInstance.indicators.splice(index, 1);
															_WFInstance.indicators.push(data);															
															toProcess--;
															if(toProcess == 0)
															{
																var success = util.success('Form created successfully.', _WFInstance.indicators);
																resolve(success);
															}
														} 
													}
													if(found == false){
														_WFInstance.indicators.push(data);
														
														toProcess--;
														if(toProcess == 0)
														{
															var success = util.success('Form created successfully.', _WFInstance.indicators);
															
															resolve(success);
														}
														
													}
												}

											}).fail(function(err){
												console.error(err);
												var failure = util.success('1 Gatekeeper initialisation failed with initialiseData message '+err[0].message, {});
												reject(failure);
											});


										},function(err){
											console.error(err);
											var failure = util.success('2 Gatekeeper initialisation failed with initialiseData message '+err[0].message, {});
											reject(failure);
										});



									} else {
										var failure = util.success('3 Gatekeeper initialisation failed with initialiseData message '+err[0].message, {});
										reject(failure);
									}


								},function(err){
									var failure = util.success('4 Gatekeeper initialisation failed with initialiseData message '+err[0].message, {});
									reject(failure);
								});

								
								
							}).fail(function(err){
								console.error(err);
								var failure = util.success('5 Gatekeeper initialisation failed with initialiseData message '+err[0].message, {});
								reject(failure);
							})
						}, function(err){
							console.error(err);
							var failure = util.success('6 Gatekeeper initialisation failed with initialiseData message '+err[0].message, {});
							reject(failure);
						});
					}
				}
				//persist - save
			  	//loop on workflow array and check for 4 conditions and splice and update
				// Got to the next process item
				
				/*var workflows = doc.workflows;
				workflows.id = _WFInstance.config._id;
				workflows.instance = _WFInstance.instance._id;
				_WFInstance.indicators.push(doc);
				loop.next();*/

			}, function(err){
				


				var toAddProcess = [];
				for(var i=0 ; i<_WFInstance.instance.processes.length; i++){
					if(_WFInstance.instance.processes[i].subProcesses.length > 0){
						toAddProcess.push(_WFInstance.instance.processes[i]);
					}
				}
				_WFInstance.instance.processes = [];
				_WFInstance.instance.processes = toAddProcess;


				var toAddSubProcess = [];
				for(var i=0 ; i<_WFInstance.subprocesses.length; i++){
					if(_WFInstance.subprocesses[i].indicators.length > 0){
						toAddSubProcess.push(_WFInstance.subprocesses[i]);
					}
				}
				_WFInstance.subprocesses = [];
				_WFInstance.subprocesses = toAddSubProcess;


				console.error(err);
				var failure = util.success('7 Gatekeeper initialisation failed with initialiseData message '+ err[0].message, {});
				reject(failure);
			})
		}

		var instantiateSource = 'fromDefinition';
		
		for(var counter = 0; counter < indicators.length; counter++)
		{

			var indicatorId = indicators[counter]._id;
			var indicatorName = util.getName(indicators[counter].name, 'en');
			var initType = indicators[counter]._type;

			var id = '';
		   	var indicatorDoc = {};

	   		if(initType == 'newInstance'){

	   			if(baseUUID != undefined && baseUUID != '' && baseUUID.length > 0){

	   				var existingUUID = JSON.xpath("/subprocesses[_id eq '"+ baseUUID +"']/indicators[id eq '"+ indicatorId +"']/instances[1]/uuid", _WFInstance, {})[0];
	   				id = existingUUID;
	   				initType = 'newSequence';

	   				// update processes block to not display the older instance based on baseUUID
	   				var sp = JSON.xpath("/instance/processes/subProcesses[uuid eq '"+ baseUUID +"']",app.SCOPE.workflow,{})[0];
	   				sp.active = false;
	   				// instantiate new seq with previous authorised data
	   				instantiateSource = 'fromAuthorised';

	   			} else {
	   				id = indicatorId + '-' +generateUUID();
	   			}
	   			

		   	} else {

		   		var spLastUuid = JSON.xpath("/instance/processes[id eq '"+ processId +"' and subProcesses/id eq '"+ subProcessId+"'][last()]/subProcesses/uuid",_WFInstance,{})[0];
		   		var indId = JSON.xpath("/subprocesses[_id eq '"+ spLastUuid +"']/indicators[id eq '"+ indicatorId +"']/instances/uuid",app.SCOPE.workflow,{})[0];
		   		if(spLastUuid == '' || spLastUuid == undefined || indId == '' || indId == undefined){

		   			id = indicatorId + '-' +generateUUID();

		   		} else {

		   			id = indId;
		   		}

		   		if(baseUUID != undefined && baseUUID != '' && baseUUID.length > 0){
		   			var sp = JSON.xpath("/instance/processes/subProcesses[uuid eq '"+ baseUUID +"']",app.SCOPE.workflow,{})[0];
	   				sp.active = false;
	   				instantiateSource = 'fromAuthorised';

		   		}



		   	}
			// TODO: Replace with the gatekeeper promise call, return the object, update the indicator
			// document workflow processes data and update the workflow class indicators array.
			formCreateFn(id, initType, indicatorId, '', instantiateSource);
			
		
		}

		
		// var success = util.success('Form indicator set saved successfully.', result);
		// resolve(success);
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
	
	var processId = form[0] || '';
	
	var subProcess = form[1] || {};
	
	var subProcessId = subProcess._id;
	
	var processSeq =  form[2] || '';
	
	var subProcessSeq =  form[3] || '';
	
	var _WFInstance = form[4] || {};
	
	return new Promise(function(resolve, reject) {
		
		var subProcessUUID = JSON.xpath("/processes[id eq '"+ processId +"' and seq eq '"+ processSeq +"']/subProcesses[id eq '"+ subProcessId +"' and seq eq '"+ subProcessSeq +"']/uuid", _WFInstance.instance, {})[0];
		var spIndicators  = JSON.xpath("/subprocesses[_id eq '"+ subProcessUUID +"']/indicators/instances/uuid", _WFInstance ,{});
		var itemsToProcess = spIndicators.length;
		var updatedObjectsArray= [];

		for(var i=0; i<itemsToProcess; i++){

			
			
			gatekeeper.authorise(spIndicators[i]).then(function(authorisedReturn){

				
				gatekeeper.persist(authorisedReturn).then(function(savedArray){
					
					
					var uuidSavedIndicator='';
					for(var c=0; c<savedArray.length; c++){
						if(!savedArray[c].id.endsWith(':approved')){
							uuidSavedIndicator = savedArray[c].id;
						}
					}
					dao.get(uuidSavedIndicator).done(function(data){
						if (_WFInstance.indicators.length == 0) {
							_WFInstance.indicators.push(data);
							itemsToProcess--;
							if(itemsToProcess == 0){
								
								var success = util.success('Form authorised successfully.', updatedObjectsArray);
								resolve(success);
							}
						} else {
							var found = false;
							for (var index = 0; index < _WFInstance.indicators.length; index++){
								var indicator = _WFInstance.indicators[index];
								if (indicator._id == data._id) {
									found =  true;
									// Remove the current item from the array and add the updated processModel
									_WFInstance.indicators.splice(index, 1);
									_WFInstance.indicators.push(data);															
									itemsToProcess--;
									if(itemsToProcess == 0){
										
										var success = util.success('Form authorised successfully.', updatedObjectsArray);
										resolve(success);
									}
								} 
							}
							if(found == false){
								_WFInstance.indicators.push(data);
								
								itemsToProcess--;
								if(itemsToProcess == 0){
									
									var success = util.success('Form authorised successfully.', updatedObjectsArray);
									resolve(success);
								}
								
							}
						}
					}).fail(function(err){
						console.error(err);
					});
	
				}, function(error){
					console.error(err);
				});
				

			},function(error){
				itemsToProcess--;
				if(itemsToProcess == 0){
					
					var success = util.success('Form authorised successfully.', updatedObjectsArray);
					resolve(success);
				}
			});
			

		}
		
		
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
