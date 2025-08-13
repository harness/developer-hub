---
title: Python PyPi Library for the Admin API
description: Learn how to use the Python library for the Admin API.
sidebar_position: 2
sidebar_label: Python Library for Admin API
---

## Overview

The Python library provides full support for Split REST Admin API. It allows you to create, delete, and edit environments, feature flags, feature flag definitions, segments, segment keys, users, groups, API keys, change requests, attributes, and identities. 

For more information, see the [Split Admin API](https://docs.split.io/reference/introduction) for more information. The library source is available on the [GitHub repository](https://github.com/splitio/python-api).

## Using in Harness Mode

Starting with version 3.5.0, the Split API client supports operating in Harness Mode to interact with both Split and Harness APIs. This allows you to work with Harness resources like tokens, service accounts, and roles using the same client.

#### Deprecated Endpoints in Harness Mode

The following Split endpoints are deprecated and cannot be used in Harness Mode:

- `/workspaces`: `POST`, `PATCH`, `DELETE`, and `PUT`
- `/apiKeys`: `POST` for `apiKeyType == 'admin'`
- `/users`: all methods
- `/groups`: all methods
- `/restrictions`: all methods

Non-deprecated endpoints will continue to function as before.

### Working with Harness Resources

Harness Mode provides access to several Harness-specific resources through dedicated microclients.

  * `token`
  * `harness_apikey`
  * `service_account`
  * `harness_user`
  * `harness_group`
  * `role`
  * `resource_group`
  * `role_assignment`
  * `harness_project`

To work with Harness resources, initialize the Split client in Harness Mode:

```python
client = get_client({
  'harness_mode': True,
  'harness_token': 'YOUR_HARNESS_TOKEN',
  'account_identifier': 'YOUR_ACCOUNT_ID'
})
```

Example schema for creating resources:

```python
schema = {
  'name': 'string',
  'identifier': 'string',
  'email': 'string',
  'accountIdentifier': 'string',
  'description': 'string',
  'tags': {'key': 'value'}
}
```

Each microclient supports standard methods such as `list()`, `get(id)`, `create(data)`, `update(id, data)`, and `delete(id)`.

To learn about specifications for the Harness APIs, see the [Harness API reference documentation](https://apidocs.harness.io/). For more examples of using Harness resources, see the [Python API README](https://github.com/splitio/python-api?tab=readme-ov-file#working-with-harness-specific-resources).

### Common Microclient Methods

Most Harness microclients support the following standard methods:

- `list(account_identifier=None)`: Lists all resources of the specified type.
- `get(id, account_identifier=None)`: Gets a specific resource by ID.
- `create(data, account_identifier=None)`: Creates a new resource.
- `update(id, data, account_identifier=None)`: Updates an existing resource.
- `delete(id, account_identifier=None)`: Deletes a resource.

:::tip
The `account_identifier` parameter can be omitted if it was set during client initialization.
:::

## Language support

The Python lib supports Python 3 (v3.3 or later).

### Installation

Install the `splitapiclient` package using the following command:

```python
pip install splitapiclient
```

### Initialization and Logging

Import the client object and initializes a connection using an Admin API key:

```python
from splitapiclient.main import get_client  
client = get_client({'apikey': 'ADMIN API KEY'})
```

### Enable optional logging

```python
import logging  
logging.basicConfig(level=logging.DEBUG)
```

### Default Account Identifier

To avoid specifying the `account_id` with every call, set the default when creating the client:

```python
client = get_client({
    'harness_mode': True,
    'harness_token': 'YOUR_HARNESS_TOKEN',
    'account_identifier': 'YOUR_ACCOUNT_IDENTIFIER'
})

tokens = client.token.list()  
projects = client.harness_project.list()
```

## Handling Rate Limit

When the library receives a 429 HTTP response because of a limit rate, it waits for five seconds and then retries the HTTP request.

## Objects Reference

### Workspaces (now called Projects in Split UI)

#### Class

**Workspace**

```python
schema = {
    'id': 'string',
    'name': 'string',
    'requiresTitleAndComments': 'boolean',
}
```

#### Methods

`Array(Workspace) workspaces.list()`

Fetches all workspaces in an account and returns an array of Workspace instances.

* Parameters: None
* Return: List of Workspace objects

```python
for ws in client.workspaces.list():  
print ("\nWorkspace:"+ws.name+", Id: "+ws.id)
```

`Workspace workspaces.find(workspace_name)`

Finds a workspace in a given workspace name.

* Parameters: Workspace name as string
* Return: Workspace instance

```python
ws = client.workspaces.find("Defaults")  
print ("\nWorkspace:"+ws.name+", Id: "+ws.id)
```

`Workspace workspaces.add(data)`

Adds a new workspace.

* Parameters: Data as JSON with workspace info: `{'name': 'string', 'requiresTitleAndComments': boolean, 'type': 'workspace'}`
* Return: Workspace instance

```python
ws = client.workspaces.add({"requiresTitleAndComments" : True, "name" : "WS_From_API", "type" : "workspace"})  
print ("\nWorkspace:"+ws.name+", Id: "+ws.id)
```

`Workspace update(field_name, field_value)`

Updates a field in existing workspace.

* Parameters:
  
  - `field_name` as string
  - `field_value` as string 
* Return: Workspace instance

```python
ws = client.workspaces.find("Default")
ws2 = ws.update("requiresTitleAndComments", True)
```

`Workspace delete()`

Delete the current instance for an existing workspace and returns True if successful.

* Parameters: None
* Return: Boolean

```python
ws = client.workspaces.find("WS_From_API")
print (ws.name)  
# If the workspace was created from the Admin API, we need to delete the traffic type that was automatically created before deleting the workspace  
for ttype in client.traffic_types.list(ws.id):  
    client.traffic_types.delete(ttype.id)  
ws.delete()
```

` RuleBasedSegment add_rule_based_segment(segment_data, traffic_type)`

Adds a new rule-based segment to a workspace.

* Parameters:

  - `segment_data` as dict
  - `traffic_type` as string

* Return: `RuleBasedSegment` instance

```python
segment_data = {'name': 'advanced_users', 'description': 'Users who match advanced criteria'}
rule_segment = ws.add_rule_based_segment(segment_data, "user")
print(rule_segment.name)
```

`Segment add_segment(data, traffic_type_name)`

Adds a new segment to the Workspace instance.

* Parameters:
  
  - Data as JSON with segment name and description: `{'name': 'string', 'description': 'string'}`
  - `traffic_type_name` as string

* Return: Segment instance

```python
ws = client.workspaces.find("Defaults")  
seg = ws.add_segment({'name':'new_seg', 'description':'some description'})  
print(seg.name+", "+seg.production)
```

`Boolean delete_segment(segment_name)`

Deletes an existing segment from the Workspace instance and returns True if it's successful.

* Parameters: `segment_name` as string
* Return: Boolean 

```python
ws = client.workspaces.find("Defaults")  
ws.delete_environment('new_seg')
```

`LargeSegment add_large_segment(data, traffic_type_name)`

Adds a new large segment to the Workspace instance.

* Parameters:
  
  - Data as JSON with segment name and description: `{'name': 'string', 'description': 'string'}`
  - `traffic_type_name` as string

* Return: Segment instance

```python
ws = client.workspaces.find("Defaults")  
seg = ws.add_large_segment({'name':'new_seg', 'description':'some description'})  
print(seg.name+", "+seg.production)
```

`Boolean delete_large_segment(segment_name)`

Deletes an existing large segment from the Workspace instance and returns True if it's successful.

* Parameters: `segment_name` as string
* Return: Boolean 

```python
ws = client.workspaces.find("Defaults")  
ws.delete_large_segment('new_seg')
```

`Split add_split(data, traffic_type_name)`

Adds a new feature flag to the Workspace instance.

* Parameters: 

  - Data as JSON with a feature flag name and production flag:
    
    ```python
    {
        'name': 'string',
        'description': 'string',
        'owners': [{'id': 'string', 'type': 'string'}]
    }
    ```
    
  - `traffic_type_name` as string

* Return: Split instance

```python
ws = client.workspaces.find("Defaults")  
gr = client.groups.find('Administrators')  
print(gr._id)  
user = client.users.find('bilal@split.io')  
print(user._id)  
sp = ws.add_split({'name':'new-split', 'description':'some description'},[{"id": gr._id, "type": "group"},{"id": user._id, "type": "user"}], 'user')  
print(sp.name+", "+seg.production)
```

`Boolean delete_split(split_name)`

Deletes an existing feature flag from the Workspace instance and returns True if it's successful.

* Parameters: `split_name` as string
* Return: Boolean 

```python
ws = client.workspaces.find("Defaults")  
ws.delete_split('new-split')
```

`Boolean delete_rule_based_segment(segment_name)`

Deletes an existing rule-based segment from the Workspace instance and returns True if it's successful.

* Parameters: `segment_name` as string
* Return: Boolean

```python
ws = client.workspaces.find("Defaults")
success = ws.delete_rule_based_segment("advanced_users")
```

### Restrictions

#### Class

**Restriction**

```python
schema = {
    "operations" : {
        "view" : True
    },
    "resourcePermissions" : {
        "view" : [{
            "name" : "name",
            "id" : "id",
            "type" : "user"
        }]
    },
    "resource" : {
        "name" : "name",
        "id" : "id",
        "type" : "workspace"
    },
    "id" : "id",
    "type" : "restriction"
}
```

#### Methods

`Array(Restriction) restrictions.list(resourceType, resourceId)`

Fetches all restrictions for a given resource type and id.

* Parameters:
  
  - `resource_type` as string; for example 'workspace'
  - `resource_id` as string

* Return: List of Restriction objects

```python
for ws in client.workspaces.list():  
    print (ws._name)  
    for res in client.restrictions.list("workspace", ws.id):  
        print(res._resource)  
        for rp in res._resourcePermissions["view"]:  
            print(rp)  
```

`Restriction restrictions.add(resourceType, resourceId, data)`

Adds a new restriction or overwrite the existing one to a Workspace instance.

* Parameters: Data as JSON: `[{'id': 'string', 'type': 'string'}]`
* Return: Restriction instance

```python
ws = client.workspaces.find("work-02")  
# Administrator group is required for workspace permissions  
gr = client.groups.find('Administrators')  
print(gr._id)  
user = client.users.find('bilal@split.io')  
print(user._id)  
client.restrictions.add("workspace", ws.id, [{"id": gr._id, "type": "group"},{"id": user._id, "type": "user"}])  
```

### Environments

#### Class

**Environment**

```python
schema = {
    "creationTime" : number,
    "production": boolean,
    "dataExportPermissions" : {
        "areExportersRestricted" : boolean,
        "exporters" : [{
            "name" : "string",
            "id" : "string",
            "type" : "string"
        }]
    },
    "environmentType" : "string",
    "workspaceIds" : [ "string" ],
    "name" : "string",
"apiTokens" : [
{
"name" : "string",
"type" : "string",
"id" : "id",
"apiKeyType" : "string"
}
],
    "changePermissions" : {
        "areApproversRestricted" : False,
        "allowKills" : False,
        "areEditorsRestricted" : False,
        "areApprovalsRequired" : False,
        "approvers" : [ {
            "name" : "string",
            "id" : "string",
            "type" : "string"
        }],
        "editors" : [ {
            "name" : "string",
            "id" : "string",
            "type" : "string"
        }]
    },
    "type": "environment",
    "id" : "string",
    "orgId" : "string",
    "status" : "string"
}
```

#### Methods

`Array(Environment) environments.list(workspaceId)`

Fetches all environments in a workspace and returns an array of Environment instances.

* Parameters: `workspace_id` as string
* Return: List of environment objects

```python
ws = client.workspaces.find("Defaults")  
for env in client.environments.list(ws.id):  
    print (env.name+", "+env.production)
```

`Environment environments.find(environment_name, workspace_id)`

Finds an environment in a workspace that is given a name.

* Parameters:
  
  - `environment_name` as string
  - `workspace_id` as integer
* Return: Environment instance

```python
ws = client.workspaces.find("Defaults")  
en = client.environments.find("Production", wd.id)  
print (env.name+", "+env.production)
```

`Environment environments.add(data, workspace_id)`

Adds a new environment to the Workspace instance.

* Parameters:
  
  - Data as JSON with environment schema
  - `workspace_id` as string

* Return: Environment instance

```python
ws = client.workspaces.find("Default")  
# Administrator group is required for environment permissions  
gr = client.groups.find('Administrators')  
print(gr._id)  
user = client.users.find('bilal@split.io')
print(user._id)  
body = {"production": True, "dataExportPermissions" : {"areExportersRestricted" : False, "exporters" : []},"environmentType" : "production","workspaceIds" : [ ws.id ],"name" : "new_env_third","changePermissions" : {"areApproversRestricted" : True,"allowKills" : False,"areEditorsRestricted" : False,"areApprovalsRequired" : True,"approvers" : [ {"id": gr._id, "type": "group", "name": gr._name},{"id": user._id, "type": "user", "name": user._name}],"editors" : []},"type": "environment",}  
env = client.environments.add(body, ws.id)
print(env.name)
```

`Boolean environments.delete(environment_id, workspace_id)`

Deletes an existing environment from the Workspace instance and returns True if successful.

* Parameters:
  - `environment_id` as string
  - `workspace_id` as string
* Return: Boolean 

```python
ws = client.workspaces.find("Defaults")  
client.environments.delete('newenv', ws.id)
```

`Environment update(field_name, field_value)`

Updates the current environment instance given filed name with the field value, this API call allows to update any field of an environment using [JsonPatch](https://datatracker.ietf.org/doc/html/rfc6902).

* Parameters:
  - `field_name` as string
  - `field_value` as string
* Return: Environment JSON structure

```python
ws = client.workspaces.find("Defaults")  
env = client.environments.find("new_env_third", ws.id)   
# Update the data exporters permissions  
gr = client.groups.find('Administrators')  
user = client.users.find('bilal@split.io')  
client.environments.update(env.id, ws.id, "dataExportPermissions", {"areExportersRestricted" : True, "exporters" : [{"id": gr._id, "type": "group", "name": gr._name},{"id": user._id, "type": "user", "name": user._name}]})  
# Enable Allow Kill option  
client.environments.update(env.id, ws.id, "changePermissions/allowKills", True)
```

### Traffic Types

#### Class

**TrafficType**

```python
schema = {
    'id': 'string',
    'name': 'string',
    'displayAttributeId': 'string',
}
```

#### Methods

`Array(TrafficType) traffictypes.list(workspace_id)`

Fetches all traffic types in a workspace and returns an array of `TrafficType` instances.

* Parameters: `workspace_id` as string
* Return: List of `TrafficType` objects

```python
ws = client.workspaces.find("Defaults")  
for tp in client.traffic_types.list(ws.id):  
    print (tp.name+", "+tp.id)
```

`TrafficType traffictypes.find(traffic_type_name, workspace_id)`

Finds a traffic type in a workspace by name.

* Parameters:

  - `traffic_type_name` as string
  - `workspace_id` as string

* Return: TrafficType object

```python
ws = client.workspaces.find("Defaults")  
tp = client.traffic_types.find('user', ws.id)  
print (tp.name+", "+tp.id)
```

`Array(Attribute) fetch_attributes()`

Fetches all attributes of the current traffic type instance.

* Parameters: None
* Return: List of Attribute objects

```python
ws = client.workspaces.find("Defaults")  
tp = client.traffic_types.find('user', ws.id)  
for at in tp.fetch_attributes():  
    print (at.display_name)
```

`Attribute add_attribute(data)`

Adds a new attribute to the current traffic type instance.

* Parameters: Data as JSON; `{ "id": "string", "displayName": "string", "description": "string", "dataType": "string", "isSearchable": "boolean", "suggestedValues": ["suggested", "values"]}`
* Return: Attribute object

```python
ws = client.workspaces.find("Defaults")  
tp = client.traffic_types.find('user', ws.id)  
at = tp.add_attribute({"id": "attrib456", "displayName": "Street", "description": "St Address",  
"dataType": "STRING", "isSearchable": False, "workspaceId": ws.id, "suggestedValues": ["Meadowlark", "Mayfield"] })
```

`Identity add_identity(data)`

Adds a new identity to the current traffic type instance.

* Parameters: Data as JSON; `{ key: 'string', values: { 'attribute_id': 'string', … } }`
* Return: Identity object

```python
ws = client.workspaces.find("Defaults")  
tp = client.traffic_types.find('user', ws.id)  
env = client.environments.find("Production", wd.id)  
at = tp.add_identity({'key': 'user120','values': {'attrib456': 'PM'}, 'environmentId': env.id)}
```

`Identity add_identities(data)`

Adds a new identities list to current traffic type instance and returns a tuple with successful and failed items. Successful items are Identity objects. Failed items will contain the Identity object for the failed item together with a status code and a message.

* Parameters: Data as JSON; `[{ key: 'string', values: { 'attribute_id': 'string', … } }]`
* Return: Tuple

```python
ws = client.workspaces.find("Defaults")  
tp = client.traffic_types.find('user', ws.id)  
env = client.environments.find("Production", wd.id)  
at = tp.add_identities([{'key': 'user120','values': {'attrib456': 'PM'}, 'ecnvironmentId': env.id)},{'key': 'testing554','values': {'attrib123': 'CEO'}, 'environmentId': env.id)}])
```

`import_attributes_from_json function`

Imports attributes directly from a JSON array of objects.

* Parameters: Data as JSON Array. Minimum needed for each attribute is an `idproperty`. Other properties can be `displayName`, `description`, `dataType`, and an array of `suggestedValues`.  
* Return: boolean, true if successfully imported

```python
ws = client.workspaces.find(workspace_name='Default')
tp = client.traffic_types.find('account', ws.id)
newAttributeData=[ { "id": "anAttribute2", "displayName": "An Attribute2", "description": "my description here", "dataType": "string", "suggestedValues": ["suggested","values"] } ]
tp.import_attributes_from_json(newAttributeData)
```

### Attributes

#### Class

**Attribute**

```python
schema = {
    'id': 'string',
    'trafficTypeId': 'string',
    'displayName': 'string',
    'description': 'string',
    'dataType': 'string',
    'isSearchable': 'bool',
    'workspaceId' : 'string',
    'suggestedValues' : ['string']
}
```

#### Methods

`Array(Attributes) attributes.list(traffic_type_id, workspace_id)`

Fetches all attributes in a traffic type for a workspace and returns an array of Attribute instances.

* Parameters:
  - `workspace_id` as string
  - `traffic_type_id` as string
* Return: List of Attribute objects

```python
ws = client.workspaces.find("Defaults")  
tp = client.traffic_types.find('user', ws.id)  
for atr in client.attributes.list(tp.id, ws.id):  
    print (at.display_name)
```

`Attribute attributes.find(attribute_id, traffic_type_name, workspace_id)`

Finds an attribute in a traffic type for a workspace.

* Parameters:
  - `attribute_id` as string
  - `traffic_type_name` as string
  - `workspace_id` as string
* Return: Attribute instance

```python
ws = client.workspaces.find("Defaults")  
tp = client.traffic_types.find('user', ws.id)  
atr = client.attributes.find('attrib456', tp.id, ws.id)
```

`Attribute save()`

Saves the current attribute and overwrite the existing one.

* Parameters: None
* Return: Attribute instance

```python
ws = client.workspaces.find("Defaults")  
tp = client.traffic_types.find('user', ws.id)  
atr = client.attributes.find('Country', tp.id, ws.id)  
atr.display_name = "Country"  
atr.is_searchable = True  
atr.save()
```

`Boolean delete()`

Deletes the current attribute and returns True if it's successful.

* Parameters: None
* Return: Boolean

```python
ws = client.workspaces.find("Defaults")  
tp = client.traffic_types.find('user', ws.id)  
atr = client.attributes.find('Country', tp.id, ws.id)  
atr.delete()
```

`Boolean attributes.delete_by_instance()`

Deletes a given attribute and returns True if it's successful.

* Parameters: None
* Return: Boolean

```python
ws = client.workspaces.find("Defaults")  
tp = client.traffic_types.find('user', ws.id)  
atr = client.attributes.find('Country', tp.id, ws.id)  
clients.attributes.delete_by_instance(atr)
```

**Properties** 

* `traffic_type_id`: Set or get `traffic_type_id` for current Attribute object

* `display_name`: Set or get `display_name` for current Attribute object

* `description`: Set or get `description` for current Attribute object

* `data_type`: Set or get `display_type` for current Attribute object

* `is_searchable`: Set or get `is_searchable` for current Attribute object

### Identities

#### Class

**Identity**

```python
schema = {
    'key': 'string',
    'trafficTypeId': 'string',
    'environmentId': 'string',
    'values': 'object'
}
```

#### Methods

`Identity save()`

Saves the current identity and overwrites an existing one if it exists.

* Parameters: None
* Return: Identity object

```python
ws = client.workspaces.find("Defaults")  
env = client.environments.find("Production", ws.id)  
tp = client.traffic_types.find('user', ws.id)  
at = tp.add_identity({'key': 'user120','values': {'attrib456': 'PM'}, 'environmentId': env.id})  
at.key = 'bob'  
at.save()
```

`Array(Identity) identities.add_identities(data)`

Adds a new identities list to current traffic type instance and returns a tuple with successful and failed items. Successful items are Identity objects. Failed items will contain the Identity object for the failed item together with a status code and a message.

* Parameters: Data as JSON; `[{ key: 'string', values: { 'attribute_id': 'string', … } , 'environmentId': 'string', 'trafficTypeId': 'string'}, …..]`
* Return: Tuple

```python
ws = client.workspaces.find("Defaults")  
env = client.environments.find("Production", ws.id)  
tp = client.traffic_types.find('user', ws.id)  
at = client.identities.add_identities([{'key': 'user120','values': {atId: 'PM'}'environmentId': env.id, 'trafficTypeId': tp.id},{'key': 'testing554','values': {atId: 'CEO'}'environmentId': env.id}, 'trafficTypeId': tp.id])
```

`Identity update()`

Saves the current identity and overwrite the existing one.

* Parameters: None
* Return: Identity object

```python
ws = client.workspaces.find("Defaults")  
env = client.environments.find("Production", ws.id)  
tp = client.traffic_types.find('user', ws.id)  
at = tp.add_identity({'key': 'user120','values': {'attrib456': 'PM'}, 'environmentId': env.id})  
at.key = 'bob'  
at.update()
```

`Boolean identities.delete(traffic_type_id, environment_id, key)`

Deletes an identity object from a user key and returns True if it's successful.

* Parameters: `traffic_type_id`, `environment_id`, `key` 
* Return: Boolean

```python
ws = client.workspaces.find("Defaults")  
env = client.environments.find("Production", ws.id)  
tp = client.traffic_types.find('user', ws.id)  
client.identities.delete(tp.id, env.id, 'user100')
```

### Segments

#### Class

**Segment**

```python
schema = {
    'name': 'string',
    'description': 'string',
    'trafficType' : {
        'id': 'string',
        'name': 'string'
    },

    'tags': [{'name': 'string'}],

    'creationTime' : 'number',     
}
```

#### Methods

`Array(Segment) segments.list(workspace_id)`

Fetches all segments in a workspace and returns an array of Segment instances.

* Parameters: `workspace_id` as string
* Return: List of Segment objects

```python
ws = client.workspaces.find("Defaults")  
for seg in client.segments.list(ws.id):  
    print (seg.name+", "+str(seg.description))  
```

`Segment segments.find(segment_name, workspace_id)`

Finds a segment in a workspace given a name.

* Parameters:
  - `segment_name` as string
  - `workspace_id` as integer
* Return: Segment instance

```python
ws = client.workspaces.find("Defaults")  
seg = client.segments.find("employees", ws.id)  
print (seg.name+", "+str(seg.production))  
```

`SegmentDefinition add_to_environment(environment_id)`

Adds a current segment object to an environment.

* Parameters: `environment_id` as integer
* Return: SegmentDefinition object

```python
ws = client.workspaces.find("Defaults")  
env = client.environments.find("Production", ws.id)  
seg = client.segments.find("employees", ws.id)  
segDef = seg.add_to_environment(env.id)
```

`SegmentDefinition remove_from_environment(environment_id)`

Removes a current segment object to an environment and returns True if it's successful.

* Parameters: `environment_id` as integer
* Return: Boolean

```python
ws = client.workspaces.find("Defaults")  
en = client.environments.find("Production", ws.id)  
seg = client.segments.find("employees", ws.id)  
segDef = seg.remove_from_environment(env.id)  
```

#### Class

**SegmentDefinition**

```python
schema = {
    'name': 'string',
    'environment': {
        'id': 'string',
        'name':'string'
    },
    'trafficType' : {
        'id': 'string',
        'name': 'string'
    },
    'creationTime' : 'number'
}
```

#### Methods

`Array(SegmentDefinition) segments.list(environment_id, workspace_id)`

Fetches all segment definitions in an environment and returns an array of SegmentDefinition instances.

* Parameters:
  - `environment_id` as integer
  - `workspace_id` as integer
* Return: List of SegmentDefinition objects

```python
ws = client.workspaces.find("Defaults")  
env = client.environments.find("Production", ws.id)  
for segDef in client.segment_definitions.list(env.id, ws.id):  
    print (segDef.name)
```

`SegmentDefinition segment_definitions.find(segment_name, environment_id, workspace_id)`

Finds a segment in an environment.

* Parameters:
  - `segment_name` as string
  - `environment_id` as integer
  - `workspace_id` as integer
* Return: SegmentDefinition instance

```python
ws = client.workspaces.find("Defaults")  
env = client.environments.find("Production", ws.id)  
segDef = client.segment_definitions.find("employees", env.id, ws.id)  
print (segDef.name)
```

`int get_key_count()`

Fetches key count of current segment definition object.

* Parameters: None
* Return: integer

```python
ws = client.workspaces.find("Defaults")  
env = client.environments.find("Production", ws.id)  
segDef = client.segment_definitions.find("employees", env.id, ws.id)  
print(str(segDef.get_key_count())) 
```

`Array(string) get_keys()`

Fetches all keys of current segment definition object.

* Parameters: None
* Return: Array of string

```python
ws = client.workspaces.find("Defaults")  
env = client.environments.find("Production", ws.id)  
segDef = client.segment_definitions.find("employees", env.id, ws.id)  
for key in segDef.get_keys():  
    print(key)  
```

`Boolean export_keys_to_csv(csv_file_name)`

Exports all segment keys in a current segment definition object to a csv file and returns True if it's successful.

* Parameters: `csv_file_name` as string
* Return: Boolean 

```python
ws = client.workspaces.find("Defaults")  
en = client.environments.find("Production", ws.id)  
segDef = client.segment_definitions.find("employees", env.id, ws.id)  
segDef.export_keys_to_csv("seg.csv")  
```

`Boolean import_keys_from_json(replace_keys, json_data)`

Imports keys into the current segment definition object from JSON object, with an option to replace all existing keys and returns True if it's successful.

* Parameters:
  - `replace_keys` as boolean
  - `json_data` as JSON `{'keys':['key1, 'key2', 'key3'], 'comment':'a comment'}`
* Return: Boolean

```python
ws = client.workspaces.find("Defaults")  
en = client.environments.find("Production", ws.id)  
segDef = client.segment_definitions.find("employees", env.id, ws.id)  
segDef.import_keys_from_json("false", {"keys":["id4", "id5", "id6"], "comment":"a comment"})  
```

`Boolean remove_keys( json_data)`

Removes keys from the current segment definition object stored in JSON object and returns True if it's successful.

* Parameters: `json_data` as JSON `{'keys':['key1, 'key2', 'key3'], 'comment':'a comment'}`
* Return: Boolean

```python
ws = client.workspaces.find("Defaults")  
env = client.environments.find("Production", ws.id)  
segDef = client.segment_definitions.find("employees", env.id, ws.id)  
segDef.remove_keys({"keys":["id4", "id5", "id6"], "comment":"a comment"})  
```

`ChangeRequest submit_change_request(definition, operation_type, title, comment, approvers, rollout_status_id)`

Submits adding keys request change for current segment definition object.

* Parameters: Definition as JSON;
    
    ```python
    {
        'keys': '[string]',
    }
    ```

  - `operation_type` as string
  - `title` as string
  - `comment` as string
  - `approvers` as string array
* Return: ChangeRequest object

```python
ws = client.workspaces.find('Default')  
env = client.environments.find('Production', ws.id)  
segmentDef = client.segment_definitions.find('employees', env.id, ws.id)  
keys = ['user1', 'user2', 'user3']  
cr = segmentDef.submit_change_request(keys, 'CREATE', 'new def', 'comment', ['user@email.com'], None, ws.id)
```

### Splits (now called Feature Flags in Split UI)

#### Class

**Split**

```python
schema = {
    'name': 'string',
    'description': 'string',
    'trafficType' : {
        'id': 'string',
        'name': 'string'
    },
    'creationTime' : 'number',
    'id': 'string',
    'rolloutStatus': {
        'id': 'string',
        'name': 'string'
    },
    'rolloutStatusTimestamp': 'number',
    'tags': [{'name': 'string'}],

    'owners': [{'id': 'string', 'type': 'string'}],
}
```

:::info
Only `getSplit` and `createSplit` return the `owners` property.
:::

#### Methods

`Array(Split) splits.list(workspace_id, tags)`

Fetches all feature flags in a workspace and returns an array of Split instances, will also filter by given tags in array of strings. 

* Parameters:

  - `workspace_id` as integer
  - `tags` as array(string) Optional.
* Return: List of split objects

```python
ws = client.workspaces.find("Defaults")  
for sp in client.splits.list(ws.id, ["tag1", "tag2"]):  
    print (sp.name+", "+sp.description)  
```

`Split splits.find(split_name, workspace_id, tags)`

Finds a feature flag in a workspace given a name.

* Parameters:
  - `split_name` as string
  - `workspace_id` as integer
  - `tags` as string (Optional)
* Return: Split instance

```python
ws = client.workspaces.find("Defaults")  
sp = client.splits.find("new_feature", wd.id)  
print (sp.name+", "+sp.description)  
```

`SplitDefinition add_to_environment(environment_id, json_data)`

Adds current Split object to an environment.

* Parameters:
  - `environment_id` as integer
  - `json_data` as JSON; split definition structure:
    
    ```python
    {
        'comment': 'string',
        'treatments': [{
            'name': 'string',
            'configurations': 'string',
            'description': 'string',
            'keys': [ 'string' ],
            'segments': [ 'string' ]
        }],
        'defaultTreatment': 'string',
    'impressionsDisabled': 'boolean'
        'baselineTreatment': 'string',
        'trafficAllocation': 'number',
    'flagSets': [{'id': 'string', 'type': 'string'}]
        'rules': [{
            'condition': {
                'combiner': 'string',
                'matchers': [{
                    'negate': 'boolean',
                    'type': { 'string' },
                    'attribute': 'string',
                    'string': 'string',
                    'bool' : 'boolean',
                    'strings' : [ 'string' ],
                    'number' : 'number',
                    'date' : 'number',
                    'between': { 'from': 'number', 'to' : 'umber' },
                    'depends': { 'splitName': 'string', 'treatment': 'string' }
                }]
            },
            'buckets': [{
                'treatment': 'string',
                'size': 'number'
            }]
        }],
        'defaultRule': [{
            'treatment': 'string',
            'size': 'number'
        }],
    }
    ```

* Return: SplitDefinition object

```python
ws = client.workspaces.find("Defaults")  
env = client.environments.find("Production", ws.id)  
sp = client.splits.find("new_feature", ws.id)  
data={"treatments":[{"name":"on","configurations":""},{"name":"off","configurations": ""}],"defaultTreatment":"off", "baselineTreatment": "off","rules": [{"condition":{"matchers":[{"attribute":"group","type":"IN_LIST_STRING","strings":["employees"]}]}, "buckets":[{"treatment":"on","size":50},{"treatment":"off","size":50}]}],"defaultRule":[{"treatment":"off","size":100}], "comment": "adding comments"}  
spDef = sp.add_to_environment(env.id, data)  
```

`Boolean remove_from_environment(environment_id, title, comment)`

Removes a current split object to an environment and returns True if it's successful.

* Parameters: `environment_id`, `title` (optional), `comment` (optional)
* Return: Boolean

```python
ws = client.workspaces.find("Defaults")
en = client.environments.find("Production", ws.id)
sp = client.splits.find("new_feature", ws.id)
sp.remove_from_environment(environment_id=env.id, title="title", comment="comment")  
```

`Boolean associate_tags(tags)`

Associates tags on current split object and overwrites existing ones, and returns True if it's successful.

* Parameters: `tags` as string array 
* Return: Boolean

```python
ws = client.workspaces.find("Defaults")  
en = client.environments.find("Production", ws.id)  
sp = client.splits.find("new_feature", ws.id)  
sp.associate_tags(['my_new_tag', 'another_new_tag'])  
```

#### Class

**SplitDefinition**

```python
schema = {
    'name': 'string',
    'environment': {
        'id': 'string',
      'name': 'string'
    },
    'trafficType' : {
        'id': 'string',
        'name': 'string'
    },
    'killed': 'boolean',
    'treatments': [{
        'name': 'string',
        'configurations': 'string',
        'description': 'string',
        'keys': [ 'string' ],
        'segments': [ 'string' ]
    }],
    'defaultTreatment': 'string',
    'baselineTreatment': 'string',
    'trafficAllocation': 'number',
    'rules': [{
        'condition': {
            'combiner': 'string',
            'matchers': [{
                'negate': 'boolean',
                'type': { 'string' },
                'attribute': 'string',
                'string': 'string',
                'bool' : 'boolean',
                'strings' : [ 'string' ],
                'number' : 'number',
                'date' : 'number',
                'between': { 'from': 'number', 'to' : 'umber' },
                'depends': { 'splitName': 'string', 'treatment': 'string' }
            }]
        },
        'buckets': [{
            'treatment': 'string',
            'size': 'number'
        }]
    }],
    'defaultRule': [{
        'treatment': 'string',
        'size': 'number'
    }],
    'creationTime' : 'number',
    'lastUpdateTime' : 'number'
}
```

#### Methods

`Array(SplitDefinition) split_definitions.list(environment_id, workspace_id)`

Fetches all feature flag definitions in an environment and returns an array of SplitDefinition instances.

* Parameters:
  - `environment_id` as integer
  - `workspace_id` as integer
* Return: List of SplitDefinition objects

```python
ws = client.workspaces.find("Defaults")  
env = client.environments.find("Production", ws.id)  
for spDef in client.split_definitions.list(env.id, ws.id):  
    print (spDef.name)  
```

`SplitDefinition split_definitions.find(split_name, environment_id, workspace_id)`

Finds a feature flag in an environment.

* Parameters:
  - `split_name` as string
  - `environment_id` as integer
  - `workspace_id` as integer
* Return: SplitDefinition instance

```python
ws = client.workspaces.find("Defaults")  
env = client.environments.find("Production", ws.id)  
spDef = client.split_definitions.find("new_feature", env.id, ws.id)  
print (spDef.name)  
```

`SplitDefinition split_definitions.get_definition(split_name, environment_id, workspace_id)`

Get a single split definition directly.

* Parameters:
  - `split_name` as string
  - `environment_id` as integer
  - `workspace_id` as integer
* Return: SplitDefinition instance

```python
ws = client.workspaces.find("Defaults")  
env = client.environments.find("Production", ws.id)  
spDef = client.split_definitions.get_definition("new_feature", env.id, ws.id)  
print (spDef.name)  
```

`SplitDefinition update_definition(data)`

Updates the full feature flag definition for the current SplitDefinition object.

* Parameters: Data as JSON; Split Definition structure
  
  ```python
    {
        'comment': 'string',
        'treatments': [{
            'name': 'string',
            'configurations': 'string',
            'description': 'string',
            'keys': [ 'string' ],
            'segments': [ 'string' ]
        }],
        'defaultTreatment': 'string',    'baselineTreatment': 'string',
        'trafficAllocation': 'number',
        'rules': [{
            'condition': {
                'combiner': 'string',
                'matchers': [{
                    'negate': 'boolean',
                    'type': { 'string' },
                    'attribute': 'string',
                    'string': 'string',
                    'bool' : 'boolean',
                    'strings' : [ 'string' ],
                    'number' : 'number',
                    'date' : 'number',
                    'between': { 'from': 'number', 'to' : 'umber' },
                    'depends': { 'splitName': 'string', 'treatment': 'string' }
                }]
            },
            'buckets': [{
                'treatment': 'string',
                'size': 'number'
            }]
        }],
        'defaultRule': [{
            'treatment': 'string',
            'size': 'number'
        }]
    }
  ```
* Return: SplitDefinition instance

```python
ws = client.workspaces.find("Defaults")  
env = client.environments.find("Production", ws.id)  
spDef = client.split_definitions.find("new_feature", env.id, ws.id)  
tr1 = treatment.Treatment({"name":"on","configurations":""})  
tr2 = treatment.Treatment({"name":"off","configurations":""})  
bk1 = bucket.Bucket({"treatment":"on","size":50})  
bk2 = bucket.Bucket({"treatment":"off","size":50})  
match = matcher.Matcher({"attribute":"group","type":"IN_LIST_STRING","strings":["employees"]})  
cond = condition.Condition({'matchers':[match.export_dict()]})  
rl = rule.Rule({'condition':cond.export_dict(), 'buckets':[bk1.export_dict(), bk2.export_dict()]})  
defrl = default_rule.DefaultRule({"treatment":"off","size":100})   
data={"treatments":[tr1.export_dict() ,tr2.export_dict()],"defaultTreatment":"off", "baselineTreatment": "off","rules":[rl.export_dict()],"defaultRule":[defrl.export_dict()], "comment": "adding comments"}  
spNewDef = spDef.update_definition(data)  
print (spNewDef.name)  
```

`Boolean kill()`

Kills a current split object, and returns True if it's successful.

* Parameters: None
* Return: Boolean

```python
ws = client.workspaces.find("Defaults")  
env = client.environments.find("Production", ws.id)  
spDef = client.split_definitions.find("new_feature", env.id, ws.id)  
spDef.kill()  
```

`Boolean restore()`

Restores a current split object and returns True if it's successful.

* Parameters: None
* Return: Boolean

```python
ws = client.workspaces.find("Defaults")  
env = client.environments.find("Production", ws.id)  
spDef = client.split_definitions.find("new_feature", env.id, ws.id)  
spDef.restore()  
```

`ChangeRequest submit_change_request(definition, operation_type, title, comment, approvers, rollout_status_id)`

Submits a definition request change for current split definition object.

* Parameters: Definition as JSON;

  ```python
    {
        'comment': 'string',
        'treatments': [{
            'name': 'string',
            'configurations': 'string',
            'description': 'string',
            'keys': [ 'string' ],
            'segments': [ 'string' ]
        }],
        'defaultTreatment': 'string',
        'baselineTreatment': 'string',
        'trafficAllocation': 'number',
        'rules': [{
            'condition': {
                'combiner': 'string',
                'matchers': [{
                    'negate': 'boolean',
                    'type': { 'string' },
                    'attribute': 'string',
                    'string': 'string',
                    'bool' : 'boolean',
                    'strings' : [ 'string' ],
                    'number' : 'number',
                    'date' : 'number',
                    'between': { 'from': 'number', 'to' : 'umber' },
                    'depends': { 'splitName': 'string', 'treatment': 'string' }
                }]
            },
            'buckets': [{
                'treatment': 'string',
                'size': 'number'
            }]
        }],
        'defaultRule': [{
            'treatment': 'string',
            'size': 'number'
        }],
    }
  ```

  - `operation_type` as string
  - `title` as string
  - `comment` as string
  - `approvers` as string array
  - `rollout_status_id` as string, optional, use None if not specified.
* Return: ChangeRequest object

```python
ws = client.workspaces.find("Defaults")  
env = client.environments.find("Production", ws.id)  
spDef = client.split_definitions.find("new_feature", env.id, ws.id)  
definition= {"treatments":[ {"name":"on"},{"name":"off"}],  
"defaultTreatment":"off", "baselineTreatment": "off",  
"rules": [],  
"defaultRule":[{"treatment":"off","size":100}],"comment": "adding comments"  
}  
cr = spDef.submit_change_request(definition, 'UPDATE', 'new def', 'comment', ['user@mail.com'], None)  
```

#### Class

**Bucket**

```python
schema = {
    'treatment': 'string',
    'size': 'number'
}
```

#### Methods

`JSON export_dict()`

Exports the current class structure as JSON.

* Parameters: None
* Return: JSON structure

```python
from splitapiclient.resources import bucket  

bk1 = bucket.Bucket({"treatment":"on","size":50})  
print(bk1.export_dict())
```

#### Class

**Condition**

```python
schema = {
    'combiner': 'string',
    'matchers': [{
        'negate': 'boolean',
        'type': { 'string' },
        'attribute': 'string',
        'string': 'string',
        'bool' : 'boolean',
        'strings' : [ 'string' ],
        'number' : 'number',
        'date' : 'number',
        'between': { 'from': 'number', 'to' : 'number' },
        'depends': { 'splitName': 'string', 'treatment': 'string' }
    }]
}
```

#### Methods

`JSON export_dict()`

Exports the current class structure as JSON.

* Parameters: None
* Return: JSON structure

```python
from splitapiclient.resources import condition  
from splitapiclient.resources import matcher  

match = matcher.Matcher({"attribute":"group","type":"IN_LIST_STRING","strings":["employees"]})  
cond = condition.Condition({'matchers':[match.export_dict()]})  
print(cond.export_dict())  
```

#### Class

**DefaultRule**

```python
schema = {
    'treatment': 'string',
    'size': 'number'
}
```

#### Methods

`JSON export_dict()`

Exports the current class structure as JSON.

* Parameters: None
* Return: JSON structure

```python
from splitapiclient.resources import default_rule  

df = default_rule.DefaultRule({"treatment":"on","size":50})  
print(df.export_dict())    
```

#### Class

**Matcher**

```python
schema = {
    'negate': 'boolean',
    'type': 'string',
    'attribute': 'string',
    'string': 'string',
    'bool' : 'boolean',
    'strings' : [ 'string' ],
    'number' : 'number',
    'date' : 'number',
    'between': {
        'from': 'number',
        'to' : 'number'
    },
    'depends': {
        'splitName': 'string',
        'treatment': 'string'
    }
}
```

#### Methods

`JSON export_dict()`

Exports the current class structure as JSON.

* Parameters: None
* Return: JSON structure

```python
from splitapiclient.resources import matcher  

match = matcher.Matcher({"attribute":"group","type":"IN_LIST_STRING","strings":["employees"]})  
print(match.export_dict())      
```

#### Class

**Rule**

```python
schema = {
    'condition': {
        'combiner': 'string',
        'matchers': [{
            'negate': 'boolean',
            'type': { 'string' },
            'attribute': 'string',
            'string': 'string',
            'bool' : 'boolean',
            'strings' : [ 'string' ],
            'number' : 'number',
            'date' : 'number',
            'between': { 'from': 'number', 'to' : 'umber' },
            'depends': { 'splitName': 'string', 'treatment': 'string' }
        }]
    },
    'buckets': [{
        'treatment': 'string',
        'size': 'number'
    }]
}
```

#### Methods

`JSON export_dict()`

Exports the current class structure as JSON.

* Parameters: None
* Return: JSON structure

```python
from splitapiclient.resources import condition   
from splitapiclient.resources import bucket   
from splitapiclient.resources import matcher  
from splitapiclient.resources import rule  

match = matcher.Matcher({"attribute":"group","type":"IN_LIST_STRING","strings":["employees"]})  
cond = condition.Condition({'matchers':[match.export_dict()]})  
bk1 = bucket.Bucket({"treatment":"on","size":50})  
bk2 = bucket.Bucket({"treatment":"off","size":50})  
rl = rule.Rule({'condition':cond.export_dict(), 'buckets':[bk1.export_dict(), bk2.export_dict()]})  
print(rl.export_dict())      
```

#### Class

**Treatment**

```python
schema = {
    'name': 'string',
    'configurations': 'string',
    'description': 'string',
    'keys': [ 'string' ],
    'segments': [ 'string' ]
}
```

#### Methods

`JSON export_dict()`

Exports the current class structure as JSON.

* Parameters: None
* Return: JSON structure

```python
from splitapiclient.resources import treatment  

tr1 = treatment.Treatment({"name":"on","configurations":""})  
print(tr1.export_dict())     
```

### Change Requests

#### Class

**ChangeRequest**

```python
schema = {
    'split': {
        'id': 'string',
        'name': 'string',
        'environment': {
            'id': 'string',
            'name': 'string'
        },
        'trafficType' : {
            'id': 'string',
            'name': 'string'
        },
        'killed': 'boolean',
        'treatments': [{
            'name': 'string',
            'configurations': 'string',
            'description': 'string',
            'keys': [ 'string' ],
            'segments': [ 'string' ]
        }],
        'defaultTreatment': 'string',
        'baselineTreatment': 'string',
        'trafficAllocation': 'number',
        'rules': [{
            'condition': {
                'combiner': 'string',
                'matchers': [{
                    'negate': 'boolean',
                    'type': { 'string' },
                    'attribute': 'string',
                    'string': 'string',
                    'bool' : 'boolean',
                    'strings' : [ 'string' ],
                    'number' : 'number',
                    'date' : 'number',
                  'between': { 'from': 'number', 'to' : 'umber' },
                    'depends': { 'splitName': 'string', 'treatment': 'string' }
                }]
            },
            'buckets': [{
                'treatment': 'string',
                'size': 'number'
            }]
        }],
       'defaultRule': [{
            'treatment': 'string',
            'size': 'number'
        }],
       'openChangeRequestId' : 'number'
    },
    'segment': {
        'name': 'string',
        'keys': ['string']
    },
    'id': 'string',
    'status': 'string',
    'title': 'string',
    'comment': 'string',
    'approvers': ['string'],
    'operationType': 'string',
    'comments':[{
      'comment': 'string',
        'user': 'string',
        'role': 'string',
        'timestamp': 'number'
    }],
    'rolloutStatus': {
        'id': 'string',
        'type': 'string',
        'name': 'string'
    }
}
```

#### Methods

`Array(ChangeRequest) change_requests.list()`

Fetches all change requests and returns array of ChangeRequest instances.

* Parameters: None
* Return: List of ChangeRequest objects

```python
for cr in client.change_requests.list():  
    if cr._split is not None:  
        print (cr._id+", "+cr._split['name']+", "+cr._title+", "+str(cr._split['environment']['id']))   
    if cr._segment is not None:  
        print (cr._id+", "+cr._segment['name']+", "+cr._title)      
```

`Array(ChangeRequest) change_requests.find(split_name, segment_name, environment_id)`

Finds a change request in an environment.

* Parameters: 
  - `split_name` as string
  - `segment_name` as string
  - `environment_id` as string
* Return: Array of ChangeRequest instances

```python
# Find all change requests in an environment  
ws = client.workspaces.find("Defaults")  
env = client.environments.find("Production", ws.id)  
for cr in client.change_requests.find(None, None, env.id):  
    if cr._split is not None:  
        print (cr._id+", "+cr._split['name']+", "+cr._title+", "+str(cr._split['environment']['id']))   
    if cr._segment is not None:  
        print (cr._id+", "+cr._segment['name']+", "+cr._title)   
```

`ChangeRequest update_status(new_status, comment)`

Updates a status of the current change request instance.

* Parameters: 
  - `new_status` as string
  - `comment` as string
* Return: ChangeRequest object

```python
ws = client.workspaces.find("Defaults")  
env = client.environments.find("Production", ws.id)  
cr = client.change_requests.find("new_feature", None, env.id):  
cr[0].update_status("APPROVED", "done")   
```

### Users

#### Class

**User**

```python
schema = {
    'id': 'string',
    'type': 'string',
    'name': 'string',
    'email': 'string',
    'status': 'string',
    'groups': [
    {
        'type': 'string',
        'id': 'string'
    }]
}
```

#### Methods

`Array(User) users.list(status)`

Fetches all users in the current org for specific status and returns array of User instances.

* Parameters: `status` as string
* Return: List of User objects

```python
for user in client.users.list('ACTIVE'):  
    print(user.email)  
```

`User users.find(email)`

Finds user in a workspace given email and returns User instances.

* Parameters: `email` as string
* Return: User object

```python
user = client.users.find('user@mail.com')  
print(user.email)  
```

`User update_user(data)`

Updates the current user object data.

* Parameters: Data as JSON; `{'name':'string', 'email':'string', '2fa':Boolean, 'status':'string'}`
* Return: User object

```python
user = client.users.find('user@mail.com')  
data = {'name':'bob', 'email':'user@mail.com', '2fa':False, 'status':'ACTIVE'}  
user = user.update_user(data)
```

`User update_user_group(data)`

Updates the current user object group.

* Parameters: Data as JSON; `[{'op': 'replace', 'path': '/groups/0', 'value': {'id': 'groupId', 'type':'group'}}]`
* Return: User object

```python
# Replace current user group  
user = client.users.find('user@mail.com')  
group = client.groups.find('Administrators')  
data = [{'op': 'replace', 'path': '/groups/0', 'value': {'id': '<groupId>', 'type':'group'}}]  
data[0]['value']['id'] = group._id  
user = user.update_user_group(data)  
# Add new group  
data = [{'op': 'add', 'path': '/groups/-', 'value': {'id': '<groupId>', 'type':'group'}}]  
data[0]['value']['id'] = group._id  
user = user.update_user_group(data)  
```

`User invite_user(data)`

Sends an invite to an email and returns True if it's successful.

* Parameters: Data as JSON; `{'email':'chillaq@gmail.com', "groups":[{"id":"group_id", "type":"group"}]}`
* Return: Boolean 

```python
client.users.invite_user({'email':'user@mail.com'})
```

`User delete(user_id)`

Deletes an existing user and returns True if it's successful.

* Parameters: `user_id` as string
* Return: Boolean 

```python
user = client.users.find('user@mail.com')  
client.users.delete(user._id)
```

### Groups

#### Class

**Group**

```python
schema = {
    'id': 'string',
    'type': 'string',
    'name': 'string',
    'description': 'string'
}
```

#### Methods

`Array(Group) groups.list()`

Fetches all groups in current org and returns an array of Group instances.

* Parameters: None
* Return: List of Group objects

```python
for group in client.groups.list():  
    print (group._id+", "+group._name)   
```

`Group groups.find(group_name)`

Finds a user in a workspace given email and returns User instances.

* Parameters: `email` as string
* Return: User object

```python
gr = client.groups.find('Administrators')  
print(gr._id)
```

`Group groups.create_group(data)`

Creates a new group in the org and returns a group instance.

* Parameters: Data as JSON; `{'name':'string', 'description':'string'}`
* Return: User object

```python
gr = client.groups.create_group({'name':'QA', 'description':'QA group'})  
print(gr._id)
```

`Group groups.update_group(group_id, data)`

Updates an existing group in the org and returns group instance.

* Parameters: Data as JSON; `{'name':'string', 'description':'string'}`
* Return: Group object

```python
gr = client.groups.find('QA')  
gr = client.groups.update_group(gr._id, {'name':'QA Team', 'description':'QA group'})  
print(gr._name)
```

`Boolean groups.delete_group(group_id)`

Deletes an existing group in the org and returns True if it's successful.

* Parameters: `group_id` as string
* Return: Boolean

```python
gr = client.groups.find('QA')  
client.groups.delete_group(gr._id)
```

### API Keys

#### Class

**APIKey**

```python
schema = {
    'key': 'string',
    'name': 'string',
    'apiKeyType': 'string',
    'organization': {
        'id': 'string',
        'type': 'string'
    },
    'createdBy': {
        'type': 'string',
        'id': 'string',
        'name': 'string'
    },
    'createdAt': 'number',
    'environments': [
    {
        'type': 'string',
        'id': 'string'
    }],
    'workspace': {
        'type': 'string',
        'id': 'string'
    },
'roles': ['string'],
    type: 'api_key'
}
```

#### Methods

`APIKey apikeys.create_apikey(api_key_name, api_key_type, environment_id, workspace_id)`

Creates a new API key in the org and returns an APIKey instance.

* Parameters:
  - `api_key_name` as string
  - `api_key_type` as string
  - `environment_id` as string
  - `workspace_id` as string
  - list of scopes (optional)
* Return: APIKey object

```python
ws = client.workspaces.find("Defaults")  
env = client.environments.find("Production", ws.id)  
ak = client.apikeys.create_apikey('prod_api','server_side', [env.id], ws.id, ['API_FEATURE_FLAG_VIEWER'])  
print(ak._id)
```

`Boolean apikeys.delete_apikey(apikey_id)`

Deletes an API key and returns True if it's successful.

* Parameters: `apikey_id` as string
* Return: Boolean

```python
client.apikeys.delete_apikey('99go91flvm4h88d7baqh82l0e0u2pp3hldj5')
```

### Flag Sets

#### Class

**FlagSet**

```python
schema = {
"id" : "string",
"name": "string",
"description": "string",
"workspace": {
"id": "string",
"type": "string"
},
"createdAt": "string",
"type": "string"
}
```

#### Methods

`[FlagSet] flag_sets.list(workspace_id)`

Returns a list of flag sets.

* Parameters:
  - `workspace_id` as string
* Return: [FlagSet object]

```python
ws = client.workspaces.find("Defaults")  
for s in client.flag_sets.list( ws.id):
    print(s.name)
```

`FlagSet flag_sets.find(name, workspace_id)`

Find a flag set in a workspace by name.

* Parameters:
  - `name` as string
  - `workspace_id` as string
* Return: FlagSet object

```python
ws = client.workspaces.find("Defaults")
client.flag_sets.find('my_flagset', ws.id)
```

`FlagSet flag_sets.add(flag_set,workspace_id)`

Add a flag set in a workspace.

* Parameters:
  - `workspace_id` as string
  - `flag_set` as `flag_set` object
* Return: FlagSet object

```python
ws = client.workspaces.find("Defaults")  
client.flag_sets.add(flag_set={"name": "omgtest2", "description": "test_description"}, workspace_id=ws.id)
```

`Bool flag_sets.delete(id)`

Delete a flag set by ID.

* Parameters: `flag_set` ID as string
* Return: boolean

```python
client.flag_sets.delete(flag_set_id='39148e6e-63ba-4419-afeb-24683cf01e2b')
```

### Large Segments

#### Class

**Large Segment**

```python
schema = {
'name': 'string',
'description': 'string',
'trafficType' : {
'id': 'string',
'name': 'string'
},
'creationTime' : 'number',
'tags': [{'name': 'string'}]   
}
```

#### Methods

`Array(LargeSegment) large_segments.list(workspace_id)`

Fetches all segments in a workspace and returns an array of Segment instances.

* Parameters: `workspace_id` as string
* Return: List of Segment objects

```python
ws = client.workspaces.find("Defaults")  
for seg in client.large_segments.list(ws.id):  
    print (seg.name+", "+str(seg.description))  
```

`LargeSegment large_segments.find(segment_name, workspace_id)`

Finds a segment in a workspace given a name.

* Parameters:
  - `segment_name` as string
  - `workspace_id` as integer
* Return: Segment instance

```python
ws = client.workspaces.find("Defaults")  
seg = client.large_segments.find("employees", ws.id)  
print (seg.name+", "+str(seg.production))  
```

`LargeSegmentDefinition add_to_environment(environment_id)`

Adds a current segment object to an environment.

* Parameters: `environment_id` as integer
* Return: LargeSegmentDefinition object

```python
ws = client.workspaces.find("Defaults")  
env = client.environments.find("Production", ws.id)  
seg = client.large_segments.find("employees", ws.id)  
segDef = seg.add_to_environment(env.id)
```

`LargeSegmentDefinition remove_from_environment(environment_id)`

Removes a current large segment object to an environment and returns True if it's successful.

* Parameters: `environment_id` as integer
* Return: Boolean

```python
ws = client.workspaces.find("Defaults")  
en = client.environments.find("Production", ws.id)  
seg = client.large_segments.find("employees", ws.id)  
segDef = seg.remove_from_environment(env.id)  
```

#### Class

**LargeSegmentDefinition**

```python
schema = {
    'name': 'string',
    'environment': {
        'id': 'string',
        'name':'string'
    },
    'trafficType' : {
        'id': 'string',
        'name': 'string'
    },
    'creationTime' : 'number'
}
```

#### Methods

`Array(LargeSegmentDefinition) large_segments.list(environment_id, workspace_id)`

Fetches all large segment definitions in an environment and returns an array of LargeSegmentDefinition instances.

* Parameters:
  - `environment_id` as integer
  - `workspace_id` as integer
* Return: List of LargeSegmentDefinition objects

```python
ws = client.workspaces.find("Defaults")  
env = client.environments.find("Production", ws.id)  
for segDef in client.large_segment_definitions.list(env.id, ws.id):  
    print (segDef.name)
```

`LargeSegmentDefinition large_segment_definitions.find(segment_name, environment_id, workspace_id)`

Finds a large segment in an environment.

* Parameters:
  - `segment_name` as string
  - `environment_id` as integer
  - `workspace_id` as integer
* Return: LargeSegmentDefinition instance

```python
ws = client.workspaces.find("Defaults")  
env = client.environments.find("Production", ws.id)  
segDef = client.large_segment_definitions.find("employees", env.id, ws.id)  
print (segDef.name)
```

`LargeSegmentDefinition submit_upload(title, comment, approvers, file_path)`

Imports keys into the current segment definition from the CSV file.

:::info
This creates a change request and may not be fully automatable in environments with additional change requests and approvers.
:::

* Parameters:

  - `title` as string
  - `comment` as string
  - `approvers` as [string]
  - `file_path` as string to a single column, no header CSV with segment key values

* Return: Boolean

```python
ws = client.workspaces.find("Defaults")  
en = client.environments.find("Production", ws.id)  
largeSegmentDef = client.large_segment_definitions.find("employees", env.id, ws.id)  
largeSegmentDef.submit_upload('title', 'comment', [], 'largeSegment.csv')
```

`Boolean remove_all_members( title, comment, approvers)`

Removes all keys from the large segment.

:::info
This creates a change request and may not be fully automatable in environments with additional change requests and approvers.
:::

* Parameters: 
  - `title` as string
  - `comment` as string
  - `approvers` as [string]
* Return: Boolean

```python
ws = client.workspaces.find("Defaults")  
env = client.environments.find("Production", ws.id)  
largeSegmentDef = client.large_segment_definitions.find('large_segment',env.id, ws.id)
largeSegmentDef.remove_all_members('title', 'comment', [])
```

### Rule-based Segments

Rule-based segments allow you to define audience segments using complex rule structures and exclusion logic.

#### Class

**RuleBasedSegment**

```python
schema = {
'name': 'string',
'description': 'string',
'trafficType' : {
'id': 'string',
'name': 'string'
},
'creationTime' : 'number',
'tags': [{'name': 'string'}]   
}
```

#### Methods

`rule_based_segments.list(workspace_id)`

    Fetch all rule-based segments in a workspace.

* Parameters: `workspace_id` as string
* Return: List of `RuleBasedSegment` objects

```python
ws = client.workspaces.find("Defaults")
for segment in client.rule_based_segments.list(ws.id):
    print(f"Rule-Based Segment: {segment.name}, {segment.description}")
```

`rule_based_segments.find(segment_name, workspace_id)`

Finds a specific rule-based segment by name.

* Parameters:

  - `segment_name` as string
  - `workspace_id` as string

* Return: `RuleBasedSegment` instance

```python
segment = client.rule_based_segments.find("advanced_users", ws.id)
```

#### Class

**RuleBasedSegmentDefinition**

The segment definition is used when adding, updating, or making change requests to rule-based segments in specific environments.

```python
schema = {
  'name': 'string',
  'environment': {
    'id': 'string',
    'name':'string'
  },
  'trafficType' : {
    'id': 'string',
    'name': 'string'
  },
  'creationTime' : 'number',
  'rules': [ ... ],
  'excludedKeys': ['string'],
  'excludedSegments': [ { 'name': 'string', 'type': 'string' } ]
}
```

#### Methods

`rule_based_segment_definitions.add_to_environment(environment_id)`

Adds a rule-based segment to an environment.

* Parameters: `environment_id` as string

* Return: `RuleBasedSegmentDefinition` instance

```python
env = client.environments.find("Production", ws.id)
segdef = segment.add_to_environment(env.id)
```

`rule_based_segment_definitions.find(segment_name, environment_id, workspace_id)`

Finds a rule-based segment definition in an environment.

* Parameters:

  - `segment_name` as string
  - `environment_id` as string
  - `workspace_id` as string

* Return: `RuleBasedSegmentDefinition` instance

```python
segdef = client.rule_based_segment_definitions.find("advanced_users", env.id, ws.id)
```

`rule_based_segment_definitions.update(data)`

Updates the rule-based segment definition with rules or exclusions.

* Parameters: `data` as dict

* Return: Updated `RuleBasedSegmentDefinition` instance

```python
update_data = {
    'rules': [...],
    'excludedKeys': ['user1', 'user2'],
    'excludedSegments': [{'name': 'beta_testers', 'type': 'standard_segment'}]
}
updated_segdef = segdef.update(update_data)
```

`rule_based_segment_definitions.submit_change_request(...)`

Submits a change request to update a rule-based segment definition.

* Parameters:

  - `rules` as list of dicts
  - `excluded_keys` as list of strings
  - `excluded_segments` as list of dicts
  - `operation_type` as string
  - `title` as string
  - `comment` as string
  - `approvers` as list of strings
  - `workspace_id` as string

* Return:Boolean

```python
segdef.submit_change_request(
    rules=rules,
    excluded_keys=excluded_keys,
    excluded_segments=excluded_segments,
    operation_type='UPDATE',
    title='Lower age threshold to 25',
    comment='Including more users in advanced segment',
    approvers=['user@email.com'],
    workspace_id=ws.id
)
```

`change_requests.list()`

List all change requests.

* Return: List of `ChangeRequest` objects

```python
for cr in client.change_requests.list():
    if cr._split:
        print(f"{cr._id}, {cr._split['name']}, {cr._title}")
    if cr._segment:
        print(f"{cr._id}, {cr._segment['name']}, {cr._title}")
```

`change_requests.update_status(status, comment)`

Approve or reject a change request.

* Parameters:

  - `status` as string (APPROVED or REJECTED)
  - `comment` as string

* Return: Boolean

```python
for cr in client.change_requests.list():
    if cr._split['name'] == 'new_feature':
        cr.update_status("APPROVED", "done")
```

For more information about rule-based segments, see the [README](https://github.com/splitio/python-api?tab=readme-ov-file#rule-based-segments).
