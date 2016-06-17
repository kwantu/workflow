<a name="Workflow"></a>

## Workflow
**Kind**: global class  
**Version**: 0.1.0  
**Author:** Brent Gordon  

* [Workflow](#Workflow)
    * [new Workflow(profile, [config], [instance])](#new_Workflow_new)
    * [.create()](#Workflow+create) ⇒
    * [.initialise(processId, data)](#Workflow+initialise) ⇒
    * [.task(processId, inputData)](#Workflow+task) ⇒
    * [.transition(processId, subProcessId, stepId, transitionId, data)](#Workflow+transition) ⇒

<a name="new_Workflow_new"></a>

### new Workflow(profile, [config], [instance])
Kwantu workflow engine

**Returns**: <code>Object</code> - new Workflow object  
**Throws**:

- "ERROR: Message"


| Param | Type | Description |
| --- | --- | --- |
| profile | <code>string</code> | Profile UUID |
| [config] | <code>Object</code> | Workflow configuration |
| config._id | <code>string</code> | Workflow configuration / definition ID |
| [instance] | <code>Object</code> | Workflow instance |
| instance._id | <code>string</code> | Workflow instance ID |

**Example**  
```js
new Workflow('1234', {})
```
<a name="Workflow+create"></a>

### workflow.create() ⇒
Create a new workflow process.

**Kind**: instance method of <code>[Workflow](#Workflow)</code>  
**Returns**: Success / error message with the newly created workflow processes
instance data.  
**Example**  
```js
Workflow.create();
```
<a name="Workflow+initialise"></a>

### workflow.initialise(processId, data) ⇒
Workflow initialise, this function executes a process within a workflow
configuration.

**Kind**: instance method of <code>[Workflow](#Workflow)</code>  
**Returns**: ""  

| Param | Type | Description |
| --- | --- | --- |
| processId | <code>string</code> | the process id to process |
| data | <code>object</code> | the input data to process |

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
