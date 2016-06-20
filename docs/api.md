<a name="Workflow"></a>

## Workflow
**Kind**: global class  
**Version**: 0.1.0  
**Author:** Brent Gordon  

* [Workflow](#Workflow)
    * [new Workflow(profile, app, config, [instance])](#new_Workflow_new)
    * [.create()](#Workflow+create) ⇒ <code>Object</code>
    * [.initialise(processId, [data])](#Workflow+initialise) ⇒
    * [.task(processId, inputData)](#Workflow+task) ⇒
    * [.transition(processId, subProcessId, stepId, transitionId, data)](#Workflow+transition) ⇒

<a name="new_Workflow_new"></a>

### new Workflow(profile, app, config, [instance])
A new Workflow constructor instance contains the reference to the application
and associated profile which it requires as the first two parameters. It also
requires a workflow configuration, as the third parameter, which is used to 
descibe the workflow processes. If a workflow instance exists you can pass it
in as the fourth parameter which it will then use, else create a new one.

**Returns**: <code>Object</code> - new Workflow object  
**Throws**:

- ERROR: A profile id is required.
	ERROR: An app id is required.


| Param | Type | Description |
| --- | --- | --- |
| profile | <code>string</code> | Profile ID |
| app | <code>string</code> | Application ID |
| config | <code>Object</code> | Workflow configuration |
| [instance] | <code>Object</code> | Workflow instance |

**Example**  
```js
new Workflow('1234', '5678', { '_id': 'abc123' });
	new Workflow('1234', '5678', { '_id': 'abc123' }, {});
```
<a name="Workflow+create"></a>

### workflow.create() ⇒ <code>Object</code>
This method creates a new workflow process i.e. it creates a processes object with the
minimum required data.

**Kind**: instance method of <code>[Workflow](#Workflow)</code>  
**Returns**: <code>Object</code> - new Workflow instance with updated instance data.  
**Example**  
```js
Workflow.create().then(function(data){ 
	console.log('Workflow created successfully.'); 
}, function(err){ 
	console.log(err); 
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
<a name="Workflow+task"></a>

### workflow.task(processId, inputData) ⇒
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
<a name="Workflow+transition"></a>

### workflow.transition(processId, subProcessId, stepId, transitionId, data) ⇒
Workflow transition to the next step. This moves the workflow from the current process,
sub-process step to the next one as specified.

**Kind**: instance method of <code>[Workflow](#Workflow)</code>  
**Returns**: ""  

| Param | Type | Description |
| --- | --- | --- |
| processId | <code>string</code> | the Workflow config / definition process id |
| subProcessId | <code>string</code> | the Workflow config / definition sub-process id |
| stepId | <code>string</code> | the Workflow config / definition step id |
| transitionId | <code>string</code> | the Workflow config / definition transition id |
| data | <code>object</code> | any additional data passed in as key value pairs |

**Example**  
```js
Workflow.transition('processId', 'subProcessId', 'stepId', 'transitionId', { key: '', value: '' });
```
