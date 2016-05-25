'use strict';

var Q = require('q');

var util = require('./utility');

/**
 * Model Module
 *
 * @module lib/model
 * @author Brent Gordon
 * @version 0.1.0
 * @description 
 * @copyright Kwantu Ltd RSA 2009-2015.
 *
 */

function instance(){
	var model = {
	    "_id": "",
	    "version": "",
	    "type": "workflowInstance",
	    "processes": []
	};
	return model;
};

function configuration(){
	var model = {
		"_id": "1234:mangaungProject",
		"_version": "1.0",
		"type": "workflowConfig",
		"title": {
			"name": {
				"i18n": {
					"_lang": "en",
					"value": "Mangagung project workflow"
				}
			},
			"description": {
				"i18n": {
					"_lang": "en",
					"value": "Mangagung project workflow used to manage housing development."
				}
			}
		},
		"identification": {
			"documentation": {
				"i18n": {
					"_lang": "",
					"value": ""
				}
			},
			"upgradeInformation": {
				"i18n": {
					"_lang": "",
					"value": ""
				}
			}
		},
		"variables": {
			"variable": [{
				"_id": "",
				"_dataType": "",
				"_sessionVar": "",
				"_default": "",
				"_value": ""
			}]
		},
		"roles": {
			"role": [{
				"_id": "",
				"_level": "",
				"name": {
					"i18n": {
						"_lang": "",
						"value": ""
					}
				},
				"roleMappings": {
					"roleMapping": {
						"_applicationId": "",
						"_roleId": ""
					}
				},
				"requiredRoles": {
					"requiredRole": {
						"_applicationId": "",
						"_roleId": ""
					}
				}
			}]
		},
		"processes": [{
			"_id": "registration",
			"_seq": "1",
			"name": {
				"i18n": {
					"_lang": "en",
					"value": "Register a project"
				}
			},
			"help": {
				"i18n": {
					"_lang": "en",
					"value": "Register a new project"
				}
			},
			"variables": [{
				"_id": "",
				"_dataType": "",
				"_sessionVar": "",
				"_default": "",
				"_value": ""
			}],
			"prerequisites": [{
				"_seq": "1",
				"_type": "count",
				"_subject": "monthlyProgress.instance",
				"_operator": "equalTo",
				"_value": "0",
				"message": {
					"i18n": {
						"_lang": "en",
						"value": "The project registration form can't be edited once the monthly progress process has been initiated."
					}
				}
				// Not allowed to create another instance if there is one open
			}],
			"preActions": [{
				"_seq": "",
				"_type": "",
				"funct": {
					"module": "",
					"method": "",
					"params": {
						"param": []
					}
				},
				"rest": {
					"hostId": "",
					"service": "",
					"APIKey": "",
					"format": "",
					"collection": "",
					"endpoint": "",
					"params": {
						"param": []
					}
				}
			}],
			"subProcesses": [{
				"_id": "spRegistration",
				"_seq": "1",
				"name": {
					"i18n": {
						"_lang": "en",
						"value": "Project Registration Form"
					}
				},
				"help": {
					"i18n": {
						"_lang": "en",
						"value": "Register a new project"
					}
				},
				"initiate": {
					"_type": "user",
					"maxInstances": "-1",
					"action": {
						"_type": "button",
						"label": "Create"
					},
					"dates": {
						"valid": {
							"_type": "userSelected",
							"message": {
								"i18n": {
									"_lang": "en",
									"value": "Please select a valid date i.e. the monthly date that the data captured is valid for."
								}
							}
						},
						"due": {
							"_type": "userSelected",
							"message": {
								"i18n": {
									"_lang": "en",
									"value": "Please select a due date i.e. the actual date that the data needs to be captured and authorised by."
								}
							}
						}
					}
				},
				"indicators": [{
					"_id": "projectDetail",
					"maxInstances": "1",
					"name": {
						"i18n": {
							"_lang": "en",
							"value": "Project Details"
						}
					}
				}, {
					"_id": "projectLocation",
					"maxInstances": "-1",
					"name": {
						"i18n": {
							"_lang": "en",
							"value": "Project Locations"
						}
					}
				}, {
					"_id": "developerDetail",
					"maxInstances": "1",
					"name": {
						"i18n": {
							"_lang": "en",
							"value": "Developer Details"
						}
					}
				}],
				"steps": [{
					"_id": "createForm",
					"_seq": "1",
					"_setInstanceStatusTo": "Created",
					"_setStatusMsgTo": "Form created",
					"name": {
						"i18n": {
							"_lang": "en",
							"value": "Create the registration form."
						}
					},
					"prerequisites": [{
						"_seq": "",
						"_type": "",
						"_operator": "",
						"_subject": "",
						"_value": "",
						"message": {
							"i18n": {
								"_lang": "en",
								"value": ""
							}
						}
					}],
					"actions": [{
						"_seq": "1",
						"_type": "internal",
						"funct": {
							"module": "form",
							"method": "create",
							"type": "newSequence" 
						},
						"transitions": [{
							"_type": "auto",
							"name": {
								"i18n": {
									"_lang": "en",
									"value": ""
								}
							},
							"goTo": {
								"_type": "nextStep",
								"_stepId": ""
							},
							"_stop": false
						}]
					}]
				}, {
					"_id": "captureForm",
					"_seq": "2",
					"_setStatusTo": "InProgress",
					"_setStatusMsgTo": "User assigned and data capture in progress",
					"name": {
						"i18n": {
							"_lang": "en",
							"value": "Capture"
						}
					},
					"prerequisites": [{
						"_seq": "1",
						"_type": "readyToSubmit",
						"_subject": "indicators.complete",
						"_operator": "equalTo",
						"_value": "true",
						"message": {
							"i18n": {
								"_lang": "en",
								"value": "All form indicators have to be marked as complete before submission."
							}
						}
					}],
					"actions": [],
					"task": {
						"assign": {
							"profileRole": {
								"profile": "current",
								"role": "capturer"
							},
							"default": ""
						},
						"work": {
							"action": "editForm"
						},
						"transitions": [{
							"_id": "submitForm",
							"_type": "user",
							"name": {
								"i18n": {
									"_lang": "en",
									"value": "Submit"
								}
							},
							"goTo": {
								"_type": "nextStep",
								"_stepId": ""
							},
							"_stop": false
						}]
					}
				}, {
					"_id": "authoriseForm",
					"_seq": "3",
					"_setInstanceStatusTo": "awaitingAuthorisation",
					"_setStatusMsgTo": "Form data submitted, user assigned and form data under review",
					"name": {
						"i18n": {
							"_lang": "en",
							"value": "Review the registration form data."
						}
					},
					"prerequisites": [{
						"_seq": "1",
						"_type": "checkRole",
						"_subject": "profileRole",
						"_operator": "equalTo",
						"_value": "authoriser",
						"message": {
							"i18n": {
								"_lang": "en",
								"value": "You have to be an authoriser on the project to approve the form data that has been captured or refer back for further editing."
							}
						}
					}],
					"actions": [],
					"task": {
						"assign": {
							"profileRole": {
								"profile": "current",
								"role": "authoriser"
							},
							"default": ""
						},
						"work": {
							"action": "editForm"
						},
						"transitions": [{
							"_id": "authoriseForm",
							"_type": "user",
							"name": {
								"i18n": {
									"_lang": "en",
									"value": "Authorise"
								}
							},
							"goTo": {
								"_type": "nextStep",
								"_stepId": ""
							},
							"_stop": false
						}, {
							"_id": "revertForm",
							"_type": "user",
							"name": {
								"i18n": {
									"_lang": "en",
									"value": "Refer Back"
								}
							},
							"goTo": {
								"_type": "stepId",
								"_stepId": "captureForm"
							},
							"_stop": false
						}]
					}
				}, {
					"_id": "closeForm",
					"_seq": "5",
					"_setInstanceStatusTo": "Complete",
					"_setStatusMsgTo": "Form locked",
					"name": {
						"i18n": {
							"_lang": "en",
							"value": "Close the registration form."
						}
					},
					"actions": [{
						"_seq": "1",
						"_type": "internal",
						"funct": {
							"module": "form",
							"method": "authorise"
						},
						"transition": [{
							"_type": "auto",
							"name": {
								"i18n": {
									"_lang": "en",
									"value": ""
								}
							},
							"goTo": {
								"_type": "",
								"_stepId": ""
							},
							"_stop": true
						}]
					}]
				}]
			}],
			"postActions": {}
		}]
	};
	return model;
};

function process(){
	var model = {
        "configId": "", 
        "instanceId": "",
        "processId": "",
        "subProcessId": "",
        "stepId": "",
        "assignedTo": {
            "userId": "",
            "name": ""
        },
        "token": "",
        "status": "",
        "statusMsg": "",
        "lastUpdated": "",
        "dueDate": ""
    }
    return model;
};

module.exports = { 

 	configuration: configuration, 
 	instance: instance, 
 	process: process

}