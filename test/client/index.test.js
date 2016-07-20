'use strict';

// Get the test workflow configuration file
var config = {
	"_id": "mangaungProject",
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
				"_lang": "en",
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
	"variables": [{
		"_id": "",
		"_dataType": "",
		"_sessionVar": "",
		"_default": "",
		"_value": ""
	}],
	"roles": [
		{
			"_id": "Guest",
			"_level": "0",
			"name": {
				"i18n": {
					"_lang": "en",
					"value": "Guest follower of a property."
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
		  },
		   {
			"_id": "Capturer",
			"_level": "1",
			"name": {
				"i18n": {
					"_lang": "en",
					"value": "Capturer"
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
		},
		   {
			"_id": "Authoriser",
			"_level": "2",
			"name": {
				"i18n": {
					"_lang": "en",
					"value": "Authoriser"
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
		},
		   {
			"_id": "Owner",
			"_level": "3",
			"name": {
				"i18n": {
					"_lang": "en",
					"value": "Owner"
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
		}
	],
	"processes": [{
		"_id": "registration",
		"_seq": "1",
		"name": {
			"i18n": {
				"_lang": "en",
				"value": "Register a new project"
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
			"_type": "processInstances",
			"_operator": "equalTo",
			"_parameter": "completion",
			"_value": "0",
			"message": {
				"i18n": [{
					"_lang": "en",
					"value": "The project registration form can't be edited once the completion process has been initiated."
				}]
			}
		}],
		"preActions": [],
		"subProcesses": [
			{
				"_id": "spRegistration",
				"_seq": "1",
				"name": {
					"i18n": {
						"_lang": "en",
						"value": "Project Registration Process"
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
					"maxInstances": "1",
					"parallelInstances": false,
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
									"value": "Please select a valid date i.e. the date that the project data captured is valid for."
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
					"_type": "newSequence",
					"maxInstances": "1",
					"name": {
						"i18n": [{
							"_lang": "en",
							"value": "Project Details"
						}]
					}
				}, {
					"_id": "BudgetInformation",
					"_type": "newSequence",
					"maxInstances": "1",
					"name": {
						"i18n": [{
							"_lang": "en",
							"value": "Budget information"
						}]
					}
				}],
				"steps": [{
					"_id": "createForm",
					"_seq": "1",
					"_setInstanceStatusTo": "Created",
					"_setStatusMsgTo": "Form created",
					"name": {
						"i18n": [{
							"_lang": "en",
							"value": "Create the registration form."
						}]
					},
					"help": {
						"i18n": [{
							"_lang": "en",
							"value": ""
						}]
					},
					"actions": [{
						"_id": "form.create",
						"_seq": "1",
						"_args": ["processId","subProcess","step"],
						"_type": "newSequence"
					}],
					"task": {},
					"transitions": [{
						"_id": "captureForm",
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
				}, {
					"_id": "captureForm",
					"_seq": "2",
					"_setInstanceStatusTo": "InProgress",
					"_setStatusMsgTo": "User assigned and data capture in progress",
					"name": {
						"i18n": {
							"_lang": "en",
							"value": "Capture"
						}
					},
					"actions": [],
					"task": {
						"assign": {
							"profileRole": {
								"profile": "current",
								"role": "Capturer"
							},
							"default": ""
						},
						"work": {
							"action": "captureData"
						}
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
				}, {
					"_id": "authoriseForm",
					"_seq": "3",
					"_setInstanceStatusTo": "submitted",
					"_setStatusMsgTo": "Form data submitted, user assigned and form data under review",
					"name": {
						"i18n": {
							"_lang": "en",
							"value": "Review the registration form data."
						}
					},
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
						}
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
				}, {
					"_id": "closeForm",
					"_seq": "4",
					"_setInstanceStatusTo": "Complete",
					"_setStatusMsgTo": "Form locked",
					"name": {
						"i18n": {
							"_lang": "en",
							"value": "Close the registration form."
						}
					},
					"actions": [{
						"_id": "form.authorise",
						"_seq": "1",
						"_args": ["subProcess.indicators"],
						"_type": "internal"
					},{
						"_id": "form.close",
						"_seq": "2",
						"_args": ["subProcess.indicators"],
						"_type": "internal"
					}],
					"task": {},
					"transitions": []
				}]
			}
		],
		"postActions": []
	},
	{
		"_id": "developerregistration",
		"_seq": "2",
		"name": {
			"i18n": {
				"_lang": "en",
				"value": "Register a new developer"
			}
		},
		"help": {
			"i18n": {
				"_lang": "en",
				"value": "Register a new developer"
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
			"_subject": "completion.instance",
			"_operator": "greaterThan",
			"_value": "0",
			"message": {
				"i18n": {
					"_lang": "en",
					"value": "The developer registration form can't be edited once the completion process has been initiated."
				}
			}
		}],
		"preActions": [],
		"subProcesses": [
			{
				"_id": "spDeveloperRegistration",
				"_seq": "1",
				"name": {
					"i18n": {
						"_lang": "en",
						"value": "Developer Registration Process"
					}
				},
				"help": {
					"i18n": {
						"_lang": "en",
						"value": "Register a new developer"
					}
				},
				"initiate": {
					"_type": "user",
					"maxInstances": "1",
					"parallelInstances": false,
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
									"value": "Please select a valid date i.e. the date that the project data captured is valid for."
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
					"_id": "developerDetail",
					"maxInstances": "1",
					"name": {
						"i18n": {
							"_lang": "en",
							"value": "Project Details"
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
					"help": {
						"i18n": {
							"_lang": "en",
							"value": ""
						}
					},
					"actions": [{
						"_id": "form.create",
						"_seq": "1",
						"_args": ["processId","subProcess","step"],
						"_type": "newSequence"
					}],
					"task": {},
					"transitions": [{
						"_id": "captureForm",
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
				}, {
					"_id": "captureForm",
					"_seq": "2",
					"_setInstanceStatusTo": "InProgress",
					"_setStatusMsgTo": "User assigned and data capture in progress",
					"name": {
						"i18n": {
							"_lang": "en",
							"value": "Capture"
						}
					},
					"actions": [],
					"task": {
						"assign": {
							"profileRole": {
								"profile": "current",
								"role": "Capturer"
							},
							"default": ""
						},
						"work": {
							"action": "captureData"
						}
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
				}, {
					"_id": "authoriseForm",
					"_seq": "3",
					"_setInstanceStatusTo": "submitted",
					"_setStatusMsgTo": "Form data submitted, user assigned and form data under review",
					"name": {
						"i18n": {
							"_lang": "en",
							"value": "Review the registration form data."
						}
					},
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
						}
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
				}, {
					"_id": "closeForm",
					"_seq": "4",
					"_setInstanceStatusTo": "Complete",
					"_setStatusMsgTo": "Form locked",
					"name": {
						"i18n": {
							"_lang": "en",
							"value": "Close the registration form."
						}
					},
					"actions": [{
						"_id": "form.authorise",
						"_seq": "1",
						"_args": ["subProcess.indicators"],
						"_type": "internal"
					},{
						"_id": "form.close",
						"_seq": "2",
						"_args": ["subProcess.indicators"],
						"_type": "internal"
					}],
					"task": {},
					"transitions": []
				}]
			}
		],
		"postActions": []
	},
	{
		"_id": "location",
		"_seq": "3",
		"name": {
			"i18n": {
				"_lang": "en",
				"value": "Register the project location"
			}
		},
		"help": {
			"i18n": {
				"_lang": "en",
				"value": "Register project location"
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
			"_subject": "completion.instance",
			"_operator": "greaterThan",
			"_value": "0",
			"message": {
				"i18n": {
					"_lang": "en",
					"value": "The project location form can't be edited once the completion process has been initiated."
				}
			}
		}],
		"preActions": [],
		"subProcesses": [
			{
				"_id": "spprojectlocation",
				"_seq": "1",
				"name": [{
					"i18n": {
						"_lang": "en",
						"value": "Project Location Process"
					}
				}],
				"help": [{
					"i18n": {
						"_lang": "en",
						"value": "Register project location"
					}
				}],
				"initiate": {
					"_type": "user",
					"maxInstances": "-1",
					"parallelInstances": false,
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
									"value": "Please select a valid date i.e. the date that the project data captured is valid for."
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
					"_id": "ProjectLocation",
					"maxInstances": "-1",
					"name": {
						"i18n": {
							"_lang": "en",
							"value": "Project Details"
						}
					}
				}],
				"steps": [{
					"_id": "createForm",
					"_seq": "1",
					"_setInstanceStatusTo": "Created",
					"_setStatusMsgTo": "Form created",
					"name": [{
						"i18n": {
							"_lang": "en",
							"value": "Create the registration form."
						}
					}],
					"help": [{
						"i18n": {
							"_lang": "en",
							"value": ""
						}
					}],
					"actions": [{
						"_id": "form.create",
						"_seq": "1",
						"_args": ["processId","subProcess","step"],
						"_type": "newSequence"
					}],
					"task": {},
					"transitions": [
						{
							"_id": "captureForm",
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
						}
					]
				},
				{
					"_id": "captureForm",
					"_seq": "2",
					"_setInstanceStatusTo": "InProgress",
					"_setStatusMsgTo": "User assigned and data capture in progress",
					"name": [{
						"i18n": {
							"_lang": "en",
							"value": "Capture"
						}
					}],
					"help": [{
						"i18n": {
							"_lang": "en",
							"value": ""
						}
					}],
					"actions": [],
					"task": {
						"assign": {
							"profileRole": {
								"profile": "current",
								"role": "Capturer"
							},
							"default": ""
						},
						"work": {
							"action": "captureData"
						}
					},
					"transitions": [
						{
							"_id": "submitForm",
							"_type": "user",
							"name": [{
								"i18n": {
									"_lang": "en",
									"value": "Submit"
								}
							}],
							"goTo": {
								"_type": "nextStep",
								"_stepId": ""
							},
							"_stop": false
						}
					]
				},
				{
					"_id": "authoriseForm",
					"_seq": "3",
					"_setInstanceStatusTo": "submitted",
					"_setStatusMsgTo": "Form data submitted, user assigned and form data under review",
					"name": [{
						"i18n": {
							"_lang": "en",
							"value": "Review the registration form data."
						}
					}],
					"help": [{
						"i18n": {
							"_lang": "en",
							"value": ""
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
						}
					},
					"transitions": [
						{
							"_id": "authoriseForm",
							"_type": "user",
							"name": [{
								"i18n": {
									"_lang": "en",
									"value": "Authorise"
								}
							}],
							"goTo": {
								"_type": "nextStep",
								"_stepId": ""
							},
							"_stop": false
						},
						{
							"_id": "revertForm",
							"_type": "user",
							"name": [{
								"i18n": {
									"_lang": "en",
									"value": "Refer Back"
								}
							}],
							"goTo": {
								"_type": "stepId",
								"_stepId": "captureForm"
							},
							"_stop": false
						}
					]
				},
				{
					"_id": "closeForm",
					"_seq": "4",
					"_setInstanceStatusTo": "Complete",
					"_setStatusMsgTo": "Form locked",
					"name": [{
						"i18n": {
							"_lang": "en",
							"value": "Close the registration form."
						}
					}],
					"help": [{
						"i18n": {
							"_lang": "en",
							"value": ""
						}
					}],
					"actions": [
						{
							"_id": "form.authorise",
							"_seq": "1",
							"_args": ["subProcess"],
							"_type": "internal"
						},
						{
							"_id": "form.close",
							"_seq": "2",
							"_args": ["subProcess"],
							"_type": "internal"
						}
					],
					"task": {},
					"transitions": []
				}]
			}
		],
		"postActions": []
	},{
		"_id": "monthlyProgress",
		"_seq": "3",
		"name": {
			"i18n": {
				"_lang": "en",
				"value": "Capture project montly progress report"
			}
		},
		"help": {
			"i18n": {
				"_lang": "en",
				"value": "Capture project montly progress report"
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
			"_subject": "monthlyProgress.instanceStatus",
			"_operator": "notEqualTo",
			"_value": "In Progress",
			"message": {
				"i18n": {
					"_lang": "en",
					"value": "Please complete the existing monthly progress form first."
				}
			}
		}],
		"preActions": [],
		"subProcesses": [{
			"_id": "spMonthlyProgress",
			"_seq": "1",
			"name": {
				"i18n": {
					"_lang": "en",
					"value": "Capture the monthly progress"
				}
			},
			"help": {
				"i18n": {
					"_lang": "en",
					"value": "Capture the monthly progress"
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
				"_id": "projectLevelMonthlyprogressReport",
				"maxInstances": "1",
				"name": {
					"i18n": {
						"_lang": "en",
						"value": "Project Level Monthly Progress Report"
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
						"value": "Create the monthly progress form."
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
					"_id": "createForm",
					"_seq": "1",
					"_type": "newSequence",
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
				"_setInstanceStatusTo": "InProgress",
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
							"role": "Capturer"
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
		"postActions": []
	},{
		"_id": "completion",
		"_seq": "4",
		"name": {
			"i18n": {
				"_lang": "en",
				"value": "Record the project completion"
			}
		},
		"help": {
			"i18n": {
				"_lang": "en",
				"value": "Record the project completion"
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
			"_subject": "completion.instance",
			"_operator": "equalTo",
			"_value": "0",
			"message": {
				"i18n": {
					"_lang": "en",
					"value": "The project completion form can't be edited once the project process has been closed."
				}
			}
		}],
		"preActions": [],
		"subProcesses": [{
			"_id": "spCompletion",
			"_seq": "1",
			"name": {
				"i18n": {
					"_lang": "en",
					"value": "Project Completion Form"
				}
			},
			"help": {
				"i18n": {
					"_lang": "en",
					"value": "Record project completion"
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
								"value": "Please select a valid date i.e. the date that the data project was completed."
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
				"_id": "Completion",
				"maxInstances": "1",
				"name": {
					"i18n": {
						"_lang": "en",
						"value": "Project Completion"
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
					"_id": "createForm",
					"_seq": "1",
					"_type": "newSequence",
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
				"_setInstanceStatusTo": "InProgress",
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
							"role": "Capturer"
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
		"postActions": []
	}]
}

// Create the workflow constrctor instance
var workflow = new Workflow('1234', '5678', config);

var processId = 'registration';
var subProcessId = 'spRegistration'

// Workflow module test
describe('# Module: Workflow', function(){
	// Test the new Workflow constructor method
	describe('- new Workflow() object instance', function(){
		it('Should return the passed in profile id and workflow configuration data.', function(done){
			expect(workflow.profile).to.equal('1234');
			expect(workflow.config).to.be.an('object');
			expect(workflow.config._id).to.equal('mangaungProject');
			done();
		})
	});
	// Test the create method
	describe('- Method: create(): Create a new workflow instance', function(){
		it('Should return a success block with the newly created process instance data.', function(done){
			workflow.create().then(function(result){
				expect(result).to.be.an('object');
				expect(result.message).to.equal('Workflow processes instance created successfully.');
				expect(workflow.instance).to.be.an('object');
				expect(workflow.instance._id).to.equal(workflow.profile + ':processes');
				expect(workflow.instance.version).to.equal(workflow.config.version);
				expect(workflow.instance.processes.length).to.equal(0);
			}).should.notify(done);
		})
	});
	// Test the initialize method
	describe('- Method: initialise(): Create the first process instance', function(){
		it('Should return a success block and update the processes instance data.', function(done){
			var processId = workflow.config.processes[0]._id;
			var data = {
				createdDate: moment().format('YYYY-MM-DD'),
				validDate: '2016-06-30',
				dueDate: '2016-07-31',
				userId: '9012',
				name: 'Brent Gordon',
				comment: ''
			}
			var currentStep = {};
			workflow.initialise(processId, data).then(function(result){
				expect(result).to.be.an('object');
				expect(result.message).to.equal('Process: ' + processId + ' initialized successfully.');
				expect(workflow.instance).to.be.an('object');
				expect(workflow.instance._id).to.equal(workflow.profile + ':processes');
				expect(workflow.instance.version).to.equal(workflow.config.version);
				// Save file for testing
				// saveFile(workflow.profile + ':processes', workflow.instance);
				workflow.instance.processes.filter(function(processItem){
					if (processItem.id === processId && processItem.seq === 1) {
						// Workflow process instance data checks
						expect(processItem.id).to.equal(workflow.config.processes[0]._id);
						expect(processItem.seq).to.equal(1);
						processItem.subProcesses.filter(function(subProcessItem){
							if (subProcessItem.id === subProcessId && subProcessItem.seq === 1) {
								workflow.subprocesses.filter(function(subProcessObj){
									if (subProcessObj._id === subProcessItem.uuid) {
										// Workflow sub-process instance data checks
										expect(subProcessObj.id).to.equal(workflow.config.processes[0].subProcesses[0]._id);
										expect(subProcessObj.seq).to.equal(1);
										expect(subProcessObj.initiated).to.equal(true);
										expect(subProcessObj.dates.created).to.equal(data.createdDate);
										expect(subProcessObj.dates.valid).to.equal(data.validDate);
										expect(subProcessObj.dates.due).to.equal(data.dueDate);
										expect(subProcessObj.complete).to.equal(false);
										// Workflow sub-process indicators data checks
										workflow.config.processes.filter(function(confProcessItem){
											if (confProcessItem._id === processId){
												confProcessItem.subProcesses.filter(function(confSubProcessItem){
													if (confSubProcessItem._id === subProcessId) {
														var indicators = confSubProcessItem.indicators;
														for (var i = 0; i < indicators.length; i++) {
															var indicatorId = indicators[i]._id;
															for (var j = 0; j < subProcessObj.indicators.length; j++) {
																var indicator = subProcessObj.indicators[j];
																if (indicator.id === indicatorId) {
																	expect(indicator.id).to.equal(indicatorId);
																	var instances = indicator.instances;
																	for (var k = 0; k < instances.length; k++) {
																		var instance = instances[k];
																		expect(instance.uuid).to.equal(workflow.profile + ':' + workflow.app + ':' + indicatorId + ':0');
																		expect(instance.key).to.equal('');
																		expect(instance.seq).to.equal(1);
																	}
																}
															}
														}
													}
												})
											}
										})
										// Workflow step instance data checks
										currentStep = subProcessObj.step
										expect(currentStep.id).to.equal('captureForm');
										expect(currentStep.seq).to.equal(2);
										expect(currentStep.status).to.equal('InProgress');
										expect(currentStep.message).to.equal('User assigned and data capture in progress');
										expect(currentStep.assignedTo.userId).to.equal(data.userId);
										expect(currentStep.assignedTo.name).to.equal(data.name);
										expect(currentStep.comment).to.equal(data.comment);
										// Save for testing
										// saveFile(subProcessObj._id, subProcessObj);
										var indicators = subProcessObj.indicators;
										for (var i = 0; i < indicators.length; i++) {
											var indicatorId = indicators[i].id;
											for (var j = 0; j < indicators[i].instances.length; j++) {
												var uuid = indicators[i].instances[j].uuid;
												workflow.indicators.filter(function(indicator){
													if (uuid === indicator._id) {
														expect(indicator._id).to.equal(workflow.profile + ':' + workflow.app + ':' + indicatorId + ':0');
														expect(indicator.title).to.equal(indicator.category.label);
														expect(indicator.category.term).to.equal(indicator.category.term);
														expect(indicator.category.label).to.equal(indicator.category.label);
														// Check the indicator workflow processes section
														var workflows = indicator.workflows;
														workflows.filter(function(wfInstance){
															if (wfInstance.id === workflow.config._id) {
																expect(wfInstance.id).to.equal(workflow.config._id);
																expect(wfInstance.instance).to.equal(workflow.profile + ':processes');
																wfInstance.processes.filter(function(processItem){
																	expect(processItem.id).to.equal(processId);
																	expect(processItem.subProcessId).to.equal(subProcessId);
																	// Check the step data
																	expect(processItem.step.id).to.equal(currentStep.id);
																	expect(processItem.step.seq).to.equal(currentStep.seq);
																	expect(processItem.step.status).to.equal(currentStep.status);
																	expect(processItem.step.message).to.equal(currentStep.message);
																	expect(processItem.step.assignedTo.userId).to.equal(currentStep.assignedTo.userId);
																	expect(processItem.step.assignedTo.name).to.equal(currentStep.assignedTo.name);
																	// saveFile(uuid, indicator);
																})
															}
														})
													}
												})
											}
										}
									}
								})
							}
						})
					}
				})
			}).should.notify(done);
		})
	});
	// Test the assignUser method
	describe('- Method: assignUser(): Assign a user to a particular sub-process step.', function(){
		it('Should return a success message and the valid user id and name in the current step.', function(done){
			var processSeq = 1;
			var subProcessSeq = 1;
			var user = {
				id: '5678',
				name: 'Satinder Sighn'
			}
			workflow.assignUser(processId, processSeq, subProcessId, subProcessSeq, user).then(function(result){
				expect(result).to.be.an('object');
				expect(result.message).to.equal('User assigned successfully. UserId: "' + user.id + '", Name: "' + user.name + '"');
				workflow.instance.processes.filter(function(processItem){
					if (processItem.id === processId && processItem.seq === processSeq) {
						processItem.subProcesses.filter(function(subProcessItem){
							if (subProcessItem.id === subProcessId && subProcessItem.seq === subProcessSeq) {
								workflow.subprocesses.filter(function(subProcessObj){
									if (subProcessObj._id === subProcessItem.uuid) {
										expect(subProcessObj.step.assignedTo.userId).to.equal(user.id);
										expect(subProcessObj.step.assignedTo.name).to.equal(user.name);
									}
								})
							}
						})
					}
				})
				// Test the updates to the indicator documents workflow processes section
				workflow.config.processes.filter(function(processItem){
					if (processItem._id === processId) {
						processItem.subProcesses.filter(function(subProcessItem){
							if (subProcessItem._id === subProcessId) {
								var indicators = subProcessItem.indicators;
								for (var i = 0; i < indicators.length; i++) {
									var indicatorId = indicators[i]._id;
									workflow.indicators.filter(function(indicator){
										if (indicatorId === indicator.category.term) {
											var workflows = indicator.workflows;
											workflows.filter(function(wfInstance){
												if (wfInstance.id === workflow.config._id) {
													wfInstance.processes.filter(function(processItem){
														// Check the step data
														expect(processItem.step.assignedTo.userId).to.equal(user.id);
														expect(processItem.step.assignedTo.name).to.equal(user.name);
													})
												}
											})
										}
									})
								}
							}
						})
					}
				})
			}).should.notify(done);
		})
	});
	// Test the transition method
	describe('- Method: transition()', function(){
		it('Should return a success message and update the processes instance data.', function(done){
			var processSeq = 1;
			var subProcessSeq = 1;
			var stepId = 'captureForm';
			var transitionId = 'submitForm';
			var data = {
				createdDate: '',
				endDate: '',
				userId: '9012',
				name: 'Brent Gordon',
				comment: ''
			}
			var currentStep = {};
			workflow.transition(processId, processSeq, subProcessId, subProcessSeq, stepId, transitionId, data).then(function(result){
				expect(result).to.be.an('object');
				expect(result.message).to.equal('Step transition completed successfully.');
				// Test the step updates to the workflow processes file
				workflow.instance.processes.filter(function(processItem){
					if (processItem.id === processId && processItem.seq === processSeq) {
						processItem.subProcesses.filter(function(subProcessItem){
							if (subProcessItem.id === subProcessId && subProcessItem.seq === subProcessSeq) {
								workflow.subprocesses.filter(function(subProcessObj){
									if (subProcessObj._id === subProcessItem.uuid) {
										expect(subProcessObj.step.id).to.equal('authoriseForm');
										expect(subProcessObj.step.seq).to.equal(3);
										expect(subProcessObj.step.status).to.equal('submitted');
										expect(subProcessObj.step.message).to.equal('Form data submitted, user assigned and form data under review');
										expect(subProcessObj.step.assignedTo.userId).to.equal(data.userId);
										expect(subProcessObj.step.assignedTo.name).to.equal(data.name);
										expect(subProcessObj.step.comment).to.equal(data.comment);
										currentStep = subProcessObj.step;
									}
								})
							}
						})
					}
				})
				// Test the updates to the indicator documents workflow processes section
				workflow.config.processes.filter(function(processItem){
					if (processItem._id === processId) {
						processItem.subProcesses.filter(function(subProcessItem){
							if (subProcessItem._id === subProcessId) {
								var indicators = subProcessItem.indicators;
								for (var i = 0; i < indicators.length; i++) {
									var indicatorId = indicators[i]._id;
									workflow.indicators.filter(function(indicator){
										if (indicatorId === indicator.category.term) {
											var workflows = indicator.workflows;
											workflows.filter(function(wfInstance){
												if (wfInstance.id === workflow.config._id) {
													wfInstance.processes.filter(function(processItem){
														// Check the step data
														expect(processItem.step.id).to.equal('authoriseForm');
														expect(processItem.step.seq).to.equal(3);
														expect(processItem.step.status).to.equal('submitted');
														expect(processItem.step.message).to.equal('Form data submitted, user assigned and form data under review');
														expect(processItem.step.assignedTo.userId).to.equal(data.userId);
														expect(processItem.step.assignedTo.name).to.equal(data.name);
													})
												}
											})
										}
									})
								}
							}
						})
					}
				})
			}).should.notify(done);
		})
	});
});
