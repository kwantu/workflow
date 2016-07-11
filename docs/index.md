<a name="Workflow"></a>

## Workflow
**Kind**: global class  
**Version**: 0.1.0  
**Author:** Brent Gordon  

* [Workflow](#Workflow)
    * [new Workflow(profile, app, config, [instance])](#new_Workflow_new)
    * [.getProfile()](#Workflow+getProfile) ⇒
    * [.getApp()](#Workflow+getApp) ⇒
    * [.getConfig()](#Workflow+getConfig) ⇒
    * [.getInstance()](#Workflow+getInstance) ⇒
    * [.setInstance(data)](#Workflow+setInstance) ⇒
    * [.getSubProcesses()](#Workflow+getSubProcesses) ⇒
    * [.setSubProcesses(data)](#Workflow+setSubProcesses) ⇒
    * [.getIndicators()](#Workflow+getIndicators) ⇒
    * [.setIndicators(data)](#Workflow+setIndicators) ⇒
    * [.create()](#Workflow+create) ⇒ <code>Object</code>
    * [.initialise(processId, [data])](#Workflow+initialise) ⇒
    * [.transition(processId, processSeq, subProcessId, subProcessSeq, stepId, transitionId, data)](#Workflow+transition) ⇒
    * [.assignUser(processId, processSeq, subProcessId, subProcessSeq, stepId, user)](#Workflow+assignUser) ⇒
    * [.ui(processId, inputData)](#Workflow+ui) ⇒

<a name="new_Workflow_new"></a>

### new Workflow(profile, app, config, [instance])
A new Workflow constructor instance contains the reference to the application
and associated profile which it requires as the first two parameters. It also
requires a workflow configuration, as the third parameter, which is used to
descibe the workflow processes. If a workflow instance exists you can pass it
in as the fourth parameter which it will then use, else create a new one.

**Returns**: <code>Object</code> - new Workflow object  
**Throws**:

- Error: A profile id is required
- Error: An app id is required
- Error: A workflow configuration is required


| Param | Type | Description |
| --- | --- | --- |
| profile | <code>string</code> | The current profile id |
| app | <code>string</code> | The associated application id |
| config | <code>Object</code> | The application workflow configuration / definition |
| [instance] | <code>Object</code> | An existing application profile workflow instance based on the definition |

**Example**  
```js
var config = { '_id': 'abc123' };
var instance = { '_id': 'instance_abc123' };
// If there isn't an existing instance
var workflow = new Workflow('1234', '5678', config);
// If there is an existing instance
var workflow = new Workflow('1234', '5678', config, instance);
```
<a name="Workflow+getProfile"></a>

### workflow.getProfile() ⇒
Workflow get profile id.

**Kind**: instance method of <code>[Workflow](#Workflow)</code>  
**Returns**: ""  
**Example**  
```js
""
```
<a name="Workflow+getApp"></a>

### workflow.getApp() ⇒
Workflow get app id.

**Kind**: instance method of <code>[Workflow](#Workflow)</code>  
**Returns**: ""  
**Example**  
```js
""
```
<a name="Workflow+getConfig"></a>

### workflow.getConfig() ⇒
Workflow get config.

**Kind**: instance method of <code>[Workflow](#Workflow)</code>  
**Returns**: ""  
**Example**  
```js
""
```
<a name="Workflow+getInstance"></a>

### workflow.getInstance() ⇒
Workflow get instance.

**Kind**: instance method of <code>[Workflow](#Workflow)</code>  
**Returns**: ""  
**Example**  
```js
""
```
<a name="Workflow+setInstance"></a>

### workflow.setInstance(data) ⇒
Workflow set the instance data.

**Kind**: instance method of <code>[Workflow](#Workflow)</code>  
**Returns**: ""  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | the workflow process instance data |

**Example**  
```js
""
```
<a name="Workflow+getSubProcesses"></a>

### workflow.getSubProcesses() ⇒
Workflow get sub-processes data.

**Kind**: instance method of <code>[Workflow](#Workflow)</code>  
**Returns**: ""  
**Example**  
```js
""
```
<a name="Workflow+setSubProcesses"></a>

### workflow.setSubProcesses(data) ⇒
Workflow set the sub-processes data.

**Kind**: instance method of <code>[Workflow](#Workflow)</code>  
**Returns**: ""  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | the workflow process instance data |

**Example**  
```js
""
```
<a name="Workflow+getIndicators"></a>

### workflow.getIndicators() ⇒
Workflow get indicator set data.

**Kind**: instance method of <code>[Workflow](#Workflow)</code>  
**Returns**: ""  
**Example**  
```js
""
```
<a name="Workflow+setIndicators"></a>

### workflow.setIndicators(data) ⇒
Workflow set the indicator set data.

**Kind**: instance method of <code>[Workflow](#Workflow)</code>  
**Returns**: ""  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | the workflow process instance data |

**Example**  
```js
""
```
<a name="Workflow+create"></a>

### workflow.create() ⇒ <code>Object</code>
This method creates a new workflow process i.e. it creates a workflow processes instance
object with the minimum required data. This instance can be referenced in the following
way, see example below.

**Kind**: instance method of <code>[Workflow](#Workflow)</code>  
**Returns**: <code>Object</code> - new Workflow instance with updated instance data.  
**Example**  
```js
var config = { '_id': 'abc123' };
var workflow = new Workflow('1234', '5678', config);
workflow.create().then(function(result){
	console.log(result.message);
	// The following properties can now be accessed
	var profile = workflow.profile;
	var app = workflow.app;
	var config = workflow.config;
	// On success you can access the instance the following way
	var instance = workflow.instance;
}, function(error){
	console.log(error);
});
```
<a name="Workflow+initialise"></a>

### workflow.initialise(processId, [data]) ⇒
Workflow initialise, this function executes a process within a workflow
configuration.

**Kind**: instance method of <code>[Workflow](#Workflow)</code>  
**Returns**: ""  

| Param | Type | Description |
| --- | --- | --- |
| processId | <code>string</code> | the process id to process |
| [data] | <code>object</code> | the input data to process |

**Example**  
```js
Workflow.initialize('processId', { validDate: 'date' });
```
<a name="Workflow+transition"></a>

### workflow.transition(processId, processSeq, subProcessId, subProcessSeq, stepId, transitionId, data) ⇒
Workflow transition to the next step. This moves the workflow from the current process,
sub-process step to the next one as specified.

**Kind**: instance method of <code>[Workflow](#Workflow)</code>  
**Returns**: ""  

| Param | Type | Description |
| --- | --- | --- |
| processId | <code>string</code> | the Workflow config / definition process id |
| processSeq | <code>number</code> | the Workflow instance process seq |
| subProcessId | <code>string</code> | the Workflow config / definition sub-process id |
| subProcessSeq | <code>number</code> | the Workflow instance sub-process seq |
| stepId | <code>string</code> | the Workflow config / definition step id |
| transitionId | <code>string</code> | the Workflow config / definition transition id |
| data | <code>object</code> | any additional data passed in as key value pairs |

**Example**  
```js
Workflow.transition('processId', 1, 'subProcessId', 1, 'stepId', 'transitionId', { key: '', value: '' });
```
<a name="Workflow+assignUser"></a>

### workflow.assignUser(processId, processSeq, subProcessId, subProcessSeq, stepId, user) ⇒
Workflow assign user.

**Kind**: instance method of <code>[Workflow](#Workflow)</code>  
**Returns**: ""  

| Param | Type | Description |
| --- | --- | --- |
| processId | <code>string</code> | the Workflow config / definition process id |
| processSeq | <code>number</code> | the Workflow instance process seq |
| subProcessId | <code>string</code> | the Workflow config / definition sub-process id |
| subProcessSeq | <code>number</code> | the Workflow instance sub-process seq |
| stepId | <code>string</code> | the Workflow config / definition step id |
| user | <code>object</code> | the user id and username data |

**Example**  
```js
""
```
<a name="Workflow+ui"></a>

### workflow.ui(processId, inputData) ⇒
Workflow task, this method executes a specific task.

**Kind**: instance method of <code>[Workflow](#Workflow)</code>  
**Returns**: ""  

| Param | Type | Description |
| --- | --- | --- |
| processId | <code>string</code> | the process id to process |
| inputData | <code>object</code> | the input data to process |

**Example**  
```js
Workflow.initialize('processId', { validDate: 'date' });
```
## Modules

<dl>
<dt><a href="#module_lib/form">lib/form</a></dt>
<dd><p>test description</p>
</dd>
<dt><a href="#module_lib/ui">lib/ui</a></dt>
<dd><p>test description</p>
</dd>
<dt><a href="#module_lib/process">lib/process</a></dt>
<dd><p>test description</p>
</dd>
</dl>

<a name="module_lib/form"></a>

## lib/form
test description

**Version**: 2.0.0  
**Author:** Brent Gordon  
**Copyright**: Kwantu Ltd RSA 2009-2015.  
<a name="module_lib/ui"></a>

## lib/ui
test description

**Version**: 0.1.0  
**Author:** Brent Gordon  

* [lib/ui](#module_lib/ui)
    * [~getProcess(processId, lang, _WFInstance)](#module_lib/ui..getProcess) ⇒
    * [~getSubProcess(processId, processSeq, subProcessId, subProcessSeq, _WFInstance)](#module_lib/ui..getSubProcess) ⇒

<a name="module_lib/ui..getProcess"></a>

### lib/ui~getProcess(processId, lang, _WFInstance) ⇒
Get all process sub-processes user interface data

**Kind**: inner method of <code>[lib/ui](#module_lib/ui)</code>  
**Returns**: ''  

| Param | Type | Description |
| --- | --- | --- |
| processId | <code>string</code> | the Workflow config / definition process id |
| lang | <code>string</code> | the user preffered langauge |
| _WFInstance | <code>object</code> | the current workflow constructor instance |

**Example**  
```js
''
```
<a name="module_lib/ui..getSubProcess"></a>

### lib/ui~getSubProcess(processId, processSeq, subProcessId, subProcessSeq, _WFInstance) ⇒
Get SubProcess user interface data

**Kind**: inner method of <code>[lib/ui](#module_lib/ui)</code>  
**Returns**: ''  

| Param | Type | Description |
| --- | --- | --- |
| processId | <code>string</code> | the Workflow config / definition process id |
| processSeq | <code>number</code> | the Workflow instance process seq |
| subProcessId | <code>string</code> | the Workflow config / definition sub-process id |
| subProcessSeq | <code>number</code> | the Workflow instance sub-process seq |
| _WFInstance | <code>object</code> | the current workflow constructor instance |

**Example**  
```js
''
```
<a name="module_lib/process"></a>

## lib/process
test description

**Version**: 0.1.0  
**Author:** Brent Gordon  

* [lib/process](#module_lib/process)
    * [~preRequisites(prerequisites)](#module_lib/process..preRequisites) ⇒
    * [~preRequisite(prerequisite, counter, _WFInstance)](#module_lib/process..preRequisite) ⇒
    * [~preActions(preActions, _WFInstance)](#module_lib/process..preActions) ⇒
    * [~subProcess(process, subProcess, data, _WFInstance)](#module_lib/process..subProcess) ⇒
    * [~initiate(initiate, data)](#module_lib/process..initiate) ⇒
    * [~step(processId, subProcessId, stepId, stepSeq, inputData, _WFInstance)](#module_lib/process..step) ⇒
    * [~indicators(actions, subProcess, _WFInstance)](#module_lib/process..indicators) ⇒
    * [~indicatorDocs(actions, subProcess, _WFInstance)](#module_lib/process..indicatorDocs) ⇒
    * [~actions(actions, subProcess, _WFInstance)](#module_lib/process..actions) ⇒
    * [~action(action, subProcess, _WFInstance)](#module_lib/process..action) ⇒
    * [~task(task, inputData)](#module_lib/process..task) ⇒
    * [~transition(processId, processSeq, subProcessId, subProcessSeq, stepId, transitionId, data, _WFInstance)](#module_lib/process..transition) ⇒
    * [~postActions(postActions)](#module_lib/process..postActions) ⇒

<a name="module_lib/process..preRequisites"></a>

### lib/process~preRequisites(prerequisites) ⇒
Process pre-requisites

**Kind**: inner method of <code>[lib/process](#module_lib/process)</code>  
**Returns**: ''  

| Param | Type | Description |
| --- | --- | --- |
| prerequisites | <code>object</code> | the pre-requisites config data |

**Example**  
```js
''
```
<a name="module_lib/process..preRequisite"></a>

### lib/process~preRequisite(prerequisite, counter, _WFInstance) ⇒
Process pre-requisite, execute the pre-requisite condition.

**Kind**: inner method of <code>[lib/process](#module_lib/process)</code>  
**Returns**: ''  

| Param | Type | Description |
| --- | --- | --- |
| prerequisite | <code>object</code> | the pre-requisite config data |
| counter | <code>number</code> | the pre-requisite count / number |
| _WFInstance | <code>object</code> | the workflow constructor instance |

**Example**  
```js
var config = {
	    "_seq": "",
	    "_type": "",
		"_subject": "",
	    "_operator": "",
	    "_value": "",
	    "_reference": "",
	    "message": {
	    	"i18n": {
	    		"_lang": "en",
	    		"value": ""
	    	}
	    }
	};
Process.preRequisite(config, counter, instance, doc);
```
<a name="module_lib/process..preActions"></a>

### lib/process~preActions(preActions, _WFInstance) ⇒
Process pre-actionss

**Kind**: inner method of <code>[lib/process](#module_lib/process)</code>  
**Returns**: ''  

| Param | Type | Description |
| --- | --- | --- |
| preActions | <code>object</code> | the pre-actions config data |
| _WFInstance | <code>object</code> | the current workflow constructor instance |

**Example**  
```js
''
```
<a name="module_lib/process..subProcess"></a>

### lib/process~subProcess(process, subProcess, data, _WFInstance) ⇒
Process sub-process

**Kind**: inner method of <code>[lib/process](#module_lib/process)</code>  
**Returns**: ''  

| Param | Type | Description |
| --- | --- | --- |
| process | <code>object</code> | the current process id and seq |
| subProcess | <code>object</code> | the sub-process id and seq |
| data | <code>object</code> | the user input data |
| _WFInstance | <code>object</code> | the current workflow constructor instance |

**Example**  
```js
''
```
<a name="module_lib/process..initiate"></a>

### lib/process~initiate(initiate, data) ⇒
Process initiate

**Kind**: inner method of <code>[lib/process](#module_lib/process)</code>  
**Returns**: ''  

| Param | Type | Description |
| --- | --- | --- |
| initiate | <code>object</code> | the initiate config data |
| data | <code>object</code> | the user input data |

**Example**  
```js
''
```
<a name="module_lib/process..step"></a>

### lib/process~step(processId, subProcessId, stepId, stepSeq, inputData, _WFInstance) ⇒
Process step

**Kind**: inner method of <code>[lib/process](#module_lib/process)</code>  
**Returns**: ''  

| Param | Type | Description |
| --- | --- | --- |
| processId | <code>string</code> | the current process id |
| subProcessId | <code>string</code> | the current sub-process id |
| stepId | <code>string</code> | the current sub-process step id |
| stepSeq | <code>number</code> | the current sub-process step instance counter / sequence |
| inputData | <code>object</code> | the user input data |
| _WFInstance | <code>object</code> | the current _WFInstance constructor instance |

**Example**  
```js
''
```
<a name="module_lib/process..indicators"></a>

### lib/process~indicators(actions, subProcess, _WFInstance) ⇒
Process indicator updates

**Kind**: inner method of <code>[lib/process](#module_lib/process)</code>  
**Returns**: ''  

| Param | Type | Description |
| --- | --- | --- |
| actions | <code>object</code> | the actions config data |
| subProcess | <code>object</code> | the current sub-process form config data |
| _WFInstance | <code>object</code> | the current workflow constructor instance |

**Example**  
```js
''
```
<a name="module_lib/process..indicatorDocs"></a>

### lib/process~indicatorDocs(actions, subProcess, _WFInstance) ⇒
Process indicator document updates

**Kind**: inner method of <code>[lib/process](#module_lib/process)</code>  
**Returns**: ''  

| Param | Type | Description |
| --- | --- | --- |
| actions | <code>object</code> | the actions config data |
| subProcess | <code>object</code> | the current sub-process form config data |
| _WFInstance | <code>object</code> | the current workflow constructor instance |

**Example**  
```js
''
```
<a name="module_lib/process..actions"></a>

### lib/process~actions(actions, subProcess, _WFInstance) ⇒
Process actions

**Kind**: inner method of <code>[lib/process](#module_lib/process)</code>  
**Returns**: ''  

| Param | Type | Description |
| --- | --- | --- |
| actions | <code>object</code> | the actions config data |
| subProcess | <code>object</code> | the current sub-process form config data |
| _WFInstance | <code>object</code> | the current workflow constructor instance |

**Example**  
```js
''
```
<a name="module_lib/process..action"></a>

### lib/process~action(action, subProcess, _WFInstance) ⇒
Process action

**Kind**: inner method of <code>[lib/process](#module_lib/process)</code>  
**Returns**: ''  

| Param | Type | Description |
| --- | --- | --- |
| action | <code>object</code> | the action config data |
| subProcess | <code>object</code> | the current sub-process form config data |
| _WFInstance | <code>object</code> | the current workflow constructor instance |

**Example**  
```js
''
```
<a name="module_lib/process..task"></a>

### lib/process~task(task, inputData) ⇒
Process task

**Kind**: inner method of <code>[lib/process](#module_lib/process)</code>  
**Returns**: ''  

| Param | Type | Description |
| --- | --- | --- |
| task | <code>object</code> | the task config data |
| inputData | <code>object</code> | the user input data |

**Example**  
```js
''
```
<a name="module_lib/process..transition"></a>

### lib/process~transition(processId, processSeq, subProcessId, subProcessSeq, stepId, transitionId, data, _WFInstance) ⇒
Process transition

**Kind**: inner method of <code>[lib/process](#module_lib/process)</code>  
**Returns**: ''  

| Param | Type | Description |
| --- | --- | --- |
| processId | <code>string</code> | the Workflow config / definition process id |
| processSeq | <code>number</code> | the Workflow instance process seq |
| subProcessId | <code>string</code> | the Workflow config / definition sub-process id |
| subProcessSeq | <code>number</code> | the Workflow instance sub-process seq |
| stepId | <code>string</code> | the Workflow config / definition step id |
| transitionId | <code>string</code> | the Workflow config / definition transition id |
| data | <code>object</code> | any additional data passed in as key value pairs |
| _WFInstance | <code>object</code> | the current workflow constructor instance |

**Example**  
```js
''
```
<a name="module_lib/process..postActions"></a>

### lib/process~postActions(postActions) ⇒
Process postActions

**Kind**: inner method of <code>[lib/process](#module_lib/process)</code>  
**Returns**: ''  

| Param | Type | Description |
| --- | --- | --- |
| postActions | <code>object</code> | the postActions config data |

**Example**  
```js
''
```
