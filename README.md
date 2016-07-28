# Workflow [![Build Status](https://travis-ci.org/kwantu/workflow.svg?branch=develop)](https://travis-ci.org/kwantu/workflow)
> Javascript based workflow engine

## Getting started
> Install all command line dependancies:  

`npm install -g bower browserify uglifyify mocha-phantomjs jsdoc-to-markdown`

### How to install the npm module:

`npm install git+https://github.com/kwantu/workflow.git#0.1.2`

### How to install the bower module:

`bower install https://github.com/kwantu/workflow.git#0.1.2`

### How to generate the browser based workflow module with browserify:

`npm run browserify`

### How to install the repo for development work:

1. Clone the repo
2. Run `npm install && bower install`

### How to run the unit tests ( server / client ):

`npm test`

### How to generate the API documentation:

This is based on the 'jsdoc-to-markdown' module. See https://github.com/jsdoc2md/jsdoc-to-markdown for more information.

`npm run docs`

## API Documentation

[View the documentation here ...](https://github.com/kwantu/workflow/blob/master/docs/index.md)

## Module usage

#### 1. Require the Workflow and Database modules

> Server side ( Node JS )

```javascript
var Workflow = require('./workflow');
var Database = require('./database');
```

> Client side ( All modern browsers )

```html
<script src="../bower_components/workflow/dist/workflow.js"></script>
<script src="../bower_components/database/dist/database.js"></script>
```

#### 2. Get all the required parameters

```javascript
var profile = '1234';
var app = '5678';
```

> This should point to the application workflow config / definition file:

```javascript
var config = {};
```

#### 3. Instantiate the Workflow and DAO constructors

`var db = new Database('pouchdb', 'http://kwantu10.kwantu.net:8091');`  
`var workflow = new Workflow(profile, app, config);`

#### 4. Define these two functions in a global script / module

> initData(type, workflow) - On workflow UI load, initialize the data. Param type allowed values --> 'instance' / 'subprocesses' / 'indicators'

```javascript
function initData(type, workflow){  
	if (type === 'instance') {  
		// Get the workflow instance file  
		var id = workflow.profile + ':processes';
		db.get(id).then(function(data){
			return doc;
		}, function(err){
			console.error(err);
		})
	} else if (type === 'subprocesses') {
		// Get the workflow sub-process instances
		var subprocesses = [];
		for (var i = 0; i < workflow.instance.processes.length; i++) {
			var subProcessesArray = workflow.instance.processes[i].subProcesses;
			for (var j = 0; j < subProcessesArray.length; j++) {
				var id = subProcessesArray[j].ref;
				db.get(id).then(function(doc){
					subprocesses.push(doc);
				}, function(err){
					console.error(err);
				})
			}
		}
		return subprocesses;
	} else if (type === 'indicators') {
		// Save the workflow sub-process indicator set document instances
		var indicators = [];
		for (var i = 0; i < workflow.instance.processes.length; i++) {
			var subProcessesArray = workflow.instance.processes[i].subProcesses;
			for (var j = 0; j < subProcessesArray.length; j++) {
				var id = subProcessesArray[j].ref;				
				for (var k = 0; k < workflow.subprocesses.length; k++) {
					if (workflow.subprocesses[k]._id === id) {
						var indicatorArray = workflow.subprocesses[k].indicators;
						for (var l = 0; l < indicatorArray.length; l++) {
							var instanceArray = indicatorArray[l].instances;
							for (var m = 0; m < instanceArray.length; m++) {
								var id = instanceArray[m].uuid;
								db.get(id).then(function(doc){
									indicators.push(doc);
								}, function(err){
									console.error(err);
								})
							}							
						}
					}
				}
			}
		}
		return indicators;
	} else {
		console.error('Init Data type: ' + type + ' not defined.')
	}
}
```

> persistData(type, workflow) - Locally declared functions to persist the data. Param type allowed values --> 'instance' / 'subprocesses' / 'indicators'

```javascript
function persistData(type, workflow){
	if (type === 'instance') {
		// Save the workflow instance file
		db.save(workflow.instance).then(function(data){
			console.log('Instance file saved successfully.');
			// Update the instance variable
			var id = data.id;
			db.get(id).then(function(doc){
				return doc;
			}, function(err){
				console.error(err);
			})
		}, function(err){
			console.error(err);
		})
	} else if (type === 'subprocesses') {
		// Save the workflow sub-process instances
		var subprocesses = [];
		for (var i = 0; i < workflow.subprocesses.length; i++) {
			var doc = workflow.subprocesses[i];
			db.save(doc).then(function(data){
				console.log('Subprocess instance file saved successfully.');
				// Update the subprocesses array variable
				var id = data.id;
				db.get(id).then(function(doc){
					subprocesses.push(doc);
				}, function(err){
					console.error(err);
				})
			}, function(err){
				console.error(err);
			})
		}
		return subprocesses;
	} else if (type === 'indicators') {
		// Save the workflow sub-process indicator set document instances
		var indicators = [];
		for (var i = 0; i < workflow.indicators.length; i++) {
			var doc = workflow.indicators[i];
			db.save(doc).then(function(data){
				console.log('Subprocess indicator set instance file saved successfully.');
				// Update the indicators array variable
				var id = data.id;
				db.get(id).then(function(doc){
					indicators.push(doc);
				}, function(err){
					console.error(err);
				})
			}, function(err){
				console.error(err);
			})
		}
		return indicators;
	} else {
		console.error('Persist Data type: ' + type + ' not defined.')
	}
}
```
