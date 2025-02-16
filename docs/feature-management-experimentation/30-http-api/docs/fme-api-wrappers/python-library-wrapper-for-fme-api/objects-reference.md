---
title: Objects Reference
sidebar_label: Objects Reference
helpdocs_is_private: false
helpdocs_is_published: true
sidebar_position: 1
---

## API Keys
_Class:_
### APIKey
```
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
<br />

_Methods:_
#### APIKey apikeys.create_apikey(api_key_name, api_key_type, environment_id, workspace_id)
Creates a new API key in the org and returns an APIKey instance.<br />
Parameters:<br />
api_key_name as string<br />
api_key_type as string<br />
environment_id as string<br />
workspace_id as string<br />
list of scopes (optional)<br />
Return: APIKey object
```
ws = client.workspaces.find("Defaults")
env = client.environments.find("Production", ws.id)
ak = client.apikeys.create_apikey('prod_api','server_side', [env.id], ws.id, ['API_FEATURE_FLAG_VIEWER'])
print(ak._id)
```
#### Boolean apikeys.delete_apikey(apikey_id)
Deletes an API key and returns True if it's successful.<br />
Parameters:<br />
apikey_id as string<br />
Return: Boolean
```
client.apikeys.delete_apikey('99go91flvm4h88d7baqh82l0e0u2pp3hldj5')
```
***
## Attributes
_Class:_
### Attribute
```
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
<br />

_Methods:_
#### Array(Attributes) attributes.list(traffic_type_id, workspace_id)  
Fetches all attributes in a traffic type for a workspace and returns an array of Attribute instances.<br />
Parameters:<br />
workspace_id as string<br />
traffic_type_id as string<br />
Return: List of Attribute objects
```
ws = client.workspaces.find("Defaults")
tp = client.traffic_types.find('user', ws.id)
for atr in client.attributes.list(tp.id, ws.id):
    print (at.display_name)
```
#### Attribute attributes.find(attribute_id, traffic_type_name, workspace_id)
Finds an attribute in a traffic type for a workspace.<br />
Parameters:<br />
attribute_id as string<br />
traffic_type_name as string<br />
workspace_id as string<br />
Return: Attribute instance
```
ws = client.workspaces.find("Defaults")
tp = client.traffic_types.find('user', ws.id)
atr = client.attributes.find('attrib456', tp.id, ws.id)
```
#### Attribute save()
Saves the current attribute and overwrite the existing one.<br />
Parameters: None<br />
Return: Attribute instance
```
ws = client.workspaces.find("Defaults")
tp = client.traffic_types.find('user', ws.id)
atr = client.attributes.find('Country', tp.id, ws.id)
atr.display_name = "Country"
atr.is_searchable = True
atr.save()
```
#### Boolean delete() 
Deletes the current attribute and returns True if it's successful.<br />
Parameters: None<br />
Return: Boolean
```
ws = client.workspaces.find("Defaults")
tp = client.traffic_types.find('user', ws.id)
atr = client.attributes.find('Country', tp.id, ws.id)
atr.delete()
```
#### Boolean attributes.delete_by_instance() 
Deletes a given attribute and returns True if it's successful.<br />
Parameters: None<br />
Return: Boolean
```
ws = client.workspaces.find("Defaults")
tp = client.traffic_types.find('user', ws.id)
atr = client.attributes.find('Country', tp.id, ws.id)
clients.attributes.delete_by_instance(atr)
```
<br />

_Properties:_
#### traffic_type_id
set/get traffic_type_id for current Attribute object
#### display_name
set/get display_name for current Attribute object
#### description
set/get description for current Attribute object
#### data_type
set/get display_type for current Attribute object
#### is_searchable
set/get is_searchable for current Attribute object
***
## Change Requests
_Class:_
### ChangeRequest
```
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
<br />

_Methods:_
#### Array(ChangeRequest) change_requests.list()
Fetches all change requests and returns array of ChangeRequest instances.<br />
Parameters: None<br />
Return: List of ChangeRequest objects
```
for cr in client.change_requests.list():
    if cr._split is not None:
        print (cr._id+", "+cr._split['name']+", "+cr._title+", "+str(cr._split['environment']['id']))
    if cr._segment is not None:
        print (cr._id+", "+cr._segment['name']+", "+cr._title)
```
#### Array(ChangeRequest) change_requests.find(split_name, segment_name, environment_id)
Finds a change request in an environment.<br />
Parameters:<br />
split_name as string<br />
segment_name as string<br />
environment_id as string<br />
Return: Array of ChangeRequest instances
```
# Find all change requests in an environment
ws = client.workspaces.find("Defaults")
env = client.environments.find("Production", ws.id)
for cr in client.change_requests.find(None, None, env.id):
    if cr._split is not None:
        print (cr._id+", "+cr._split['name']+", "+cr._title+", "+str(cr._split['environment']['id']))
    if cr._segment is not None:
        print (cr._id+", "+cr._segment['name']+", "+cr._title)
```
#### ChangeRequest update_status(new_status, comment)
Updates a status of the current change request instance.<br />
Parameters:<br />
new_status as string<br />
comment as string<br />
Return: ChangeRequest object
```
ws = client.workspaces.find("Defaults")
env = client.environments.find("Production", ws.id)
cr = client.change_requests.find("new_feature", None, env.id):
cr[0].update_status("APPROVED", "done")
```

***
## Environments
_Class:_
### Environment
```
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
<br />

_Methods:_
#### Array(Environment) environments.list(workspaceId)
Fetches all environments in a workspace and returns an array of Environment instances.<br />
Parameters:<br />
workspace_id as string<br />
Return: List of environment objects
```
ws = client.workspaces.find("Defaults")
for env in client.environments.list(ws.id):
    print (env.name+", "+env.production)
```
#### Environment environments.find(environment_name, workspace_id)
Finds an environment in a workspace that is given a name.<br />
Parameters:<br />
environment_name as string<br />
workspace_id as integer<br />
Return: Environment instance
```
ws = client.workspaces.find("Defaults")
en = client.environments.find("Production", wd.id)
print (env.name+", "+env.production)
```
#### Environment environments.add(data, workspace_id)
Adds a new environment to the Workspace instance.<br />
Parameters:<br />
data as JSON with environment schema<br />
workspace_id as string<br />
Return: Environment instance
```
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
#### Boolean environments.delete(environment_id, workspace_id)
Deletes an existing environment from the Workspace instance and returns True if successful.<br />
Parameters:<br />
environment_id as string<br />
workspace_id as string<br />
Return: Boolean 
```
ws = client.workspaces.find("Defaults")
client.environments.delete('newenv', ws.id)
```
#### Environment update(field_name, field_value)
Updates the current environment instance given filed name with the field value, this API call allows to update any field of an environment using [JsonPatch](https://datatracker.ietf.org/doc/html/rfc6902).<br />
Parameters:<br />
field_name as string<br />
field_value as string<br />
Return: Environment JSON structure
```
ws = client.workspaces.find("Defaults")
env = client.environments.find("new_env_third", ws.id)
# Update the data exporters permissions
gr = client.groups.find('Administrators')
user = client.users.find('bilal@split.io')
client.environments.update(env.id, ws.id, "dataExportPermissions", {"areExportersRestricted" : True, "exporters" : [{"id": gr._id, "type": "group", "name": gr._name},{"id": user._id, "type": "user", "name": user._name}]})
# Enable Allow Kill option
client.environments.update(env.id, ws.id, "changePermissions/allowKills", True)
```
***
## Flag Sets
_Class:_
### FlagSet
```
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
<br />

_Methods:_
#### [FlagSet] flag_sets.list(workspace_id)
Returns a list of flag sets
Parameters:<br />
workspace_id as string<br />
Return: [FlagSet object]
```
ws = client.workspaces.find("Defaults")
for s in client.flag_sets.list( ws.id):
    print(s.name)
```
#### FlagSet flag_sets.find(name, workspace_id)
find a flag set in a workspace by name
Parameters:<br />
name as string<br />
workspace id as string<br />
Return: FlagSet object
```
ws = client.workspaces.find("Defaults")
client.flag_sets.find('my_flagset', ws.id)
```
#### FlagSet flag_sets.add(flag_set,workspace_id)
add a flag set in a workspace
Parameters:<br />
workspace_id as string<br />
flag_set as flag_set object<br />
Return: FlagSet object
```
ws = client.workspaces.find("Defaults")
client.flag_sets.add(flag_set={"name": "omgtest2", "description": "test_description"}, workspace_id=ws.id)
```
#### Bool flag_sets.delete(id)
delete a flag set by id
Parameters:<br />
flag_set id as string<br />
Return: boolean
```
client.flag_sets.delete(flag_set_id='39148e6e-63ba-4419-afeb-24683cf01e2b')
```
***
## Groups
_Class:_
### Group
```
schema = {
  'id': 'string',
  'type': 'string',
  'name': 'string',
  'description': 'string'
}
```
<br />

_Methods:_
#### Array(Group) groups.list()
Fetches all groups in current org and returns an array of Group instances.<br />
Parameters: None<br />
Return: List of Group objects
```
for group in client.groups.list():
    print (group._id+", "+group._name)
```
#### Group groups.find(group_name)
Finds a user in a workspace given email and returns User instances.<br />
Parameters:<br />
email as string<br />
Return: User object
```
gr = client.groups.find('Administrators')
print(gr._id)
```
#### Group groups.create_group(data)
Creates a new group in the org and returns a group instance.<br />
Parameters:<br />
data as JSON:
```
{'name':'string', 'description':'string'}
```
Return: User object
```
gr = client.groups.create_group({'name':'QA', 'description':'QA group'})
print(gr._id)
```
#### Group groups.update_group(group_id, data)
Updates an existing group in the org and returns group instance.<br />
Parameters:<br />
data as JSON:
```
{'name':'string', 'description':'string'}
```
Return: Group object
```
gr = client.groups.find('QA')
gr = client.groups.update_group(gr._id, {'name':'QA Team', 'description':'QA group'})
print(gr._name)
```
#### Boolean groups.delete_group(group_id)
Deletes an existing group in the org and returns True if it's successful.<br />
Parameters:<br />
group_id as string<br />
Return: Boolean
```
gr = client.groups.find('QA')
client.groups.delete_group(gr._id)
```
***
## Identities
_Class:_
### Identity
```
schema = {
  'key': 'string',
  'trafficTypeId': 'string',
  'environmentId': 'string',
  'values': 'object'
}
```
<br />

_Methods:_
#### Identity save()
Saves the current identity and overwrites an existing one if it exists.<br />
Parameters: None<br />
Return: Identity object
```
ws = client.workspaces.find("Defaults")
env = client.environments.find("Production", ws.id)
tp = client.traffic_types.find('user', ws.id)
at = tp.add_identity({'key': 'user120','values': {'attrib456': 'PM'}, 'environmentId': env.id})
at.key = 'bob'
at.save()
```
#### Array(Identity) identities.add_identities(data)
Adds a new identities list to current traffic type instance and returns a tuple with successful and failed items. Successful items are Identity objects. Failed items will contain the Identity object for the failed item together with a status code and a message.<br />
Parameters:<br />
data as JSON:
```
[{ key: 'string', values: { 'attribute_id': 'string', ... } , 'environmentId': 'string', 'trafficTypeId': 'string'}, .....]
```
Return: Tuple
```
ws = client.workspaces.find("Defaults")
env = client.environments.find("Production", ws.id)
tp = client.traffic_types.find('user', ws.id)
at = client.identities.add_identities([{'key': 'user120','values': {atId: 'PM'}'environmentId': env.id, 'trafficTypeId': tp.id},{'key': 'testing554','values': {atId: 'CEO'}'environmentId': env.id}, 'trafficTypeId': tp.id])
```
#### Identity update()
Saves the current identity and overwrite the existing one.<br />
Parameters: None<br />
Return: Identity object
```
ws = client.workspaces.find("Defaults")
env = client.environments.find("Production", ws.id)
tp = client.traffic_types.find('user', ws.id)
at = tp.add_identity({'key': 'user120','values': {'attrib456': 'PM'}, 'environmentId': env.id})
at.key = 'bob'
at.update()
```
#### Boolean identities.delete(traffic_trype_id, environment_id, key)
Deletes an identity object from a user key and returns True if it's successful.<br />
Parameters: <br />
Return: Boolean
```
ws = client.workspaces.find("Defaults")
env = client.environments.find("Production", ws.id)
tp = client.traffic_types.find('user', ws.id)
client.identities.delete(tp.id, env.id, 'user100')
```
<br />

_Properties:_
#### key
set/get key for current Attribute object
#### traffic_type_id
set/get traffic_type_id for current Attribute object
#### environment_id
set/get environment_id for current Attribute object
#### values
set/get description for current Attribute object
***
## Large Segments
_Class:_
### Large Segment
```
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
<br />

_Methods:_
#### Array(LargeSegment) large_segments.list(workspace_id)
Fetches all segments in a workspace and returns an array of Segment instances.<br />
Parameters:<br />
workspace_id as string<br />
Return: List of Segment objects
```
ws = client.workspaces.find("Defaults")
for seg in client.large_segments.list(ws.id):
    print (seg.name+", "+str(seg.description))
```
#### LargeSegment large_segments.find(segment_name, workspace_id)
Finds a segment in a workspace given a name.<br />
Parameters:<br />
segment_name as string<br />
workspace_id as integer<br />
Return: Segment instance
```
ws = client.workspaces.find("Defaults")
seg = client.large_segments.find("employees", ws.id)
print (seg.name+", "+str(seg.production))
```
#### LargeSegmentDefinition add_to_environment(environment_id)
Adds a current segment object to an environment.<br />
Parameters:<br />
environment_id as integer<br />
Return: LargeSegmentDefinition object
```
ws = client.workspaces.find("Defaults")
env = client.environments.find("Production", ws.id)
seg = client.large_segments.find("employees", ws.id)
segDef = seg.add_to_environment(env.id)
```
#### LargeSegmentDefinition remove_from_environment(environment_id)
Removes a current large segment object to an environment and returns True if it's successful.<br />
Parameters:<br />
environment_id as integer<br />
Return: Boolean
```
ws = client.workspaces.find("Defaults")
en = client.environments.find("Production", ws.id)
seg = client.large_segments.find("employees", ws.id)
segDef = seg.remove_from_environment(env.id)
```
 
_Class:_
### LargeSegmentDefinition
```
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
<br />

_Methods:_
#### Array(LargeSegmentDefinition) large_segments.list(environment_id, workspace_id)
Fetches all large segment definitions in an environment and returns an array of LargeSegmentDefinition instances.<br />
Parameters:<br />
environment_id as integer<br />
workspace_id as integer<br />
Return: List of LargeSegmentDefinition objects
```
ws = client.workspaces.find("Defaults")
env = client.environments.find("Production", ws.id)
for segDef in client.large_segment_definitions.list(env.id, ws.id):
    print (segDef.name)
```
#### LargeSegmentDefinition large_segment_definitions.find(segment_name, environment_id, workspace_id)
Finds a large segment in an environment.<br />
Parameters:<br />
segment_name as string<br />
environment_id as integer<br />
workspace_id as integer<br />
Return: LargeSegmentDefinition instance
```
ws = client.workspaces.find("Defaults")
env = client.environments.find("Production", ws.id)
segDef = client.large_segment_definitions.find("employees", env.id, ws.id)
print (segDef.name)
```
#### LargeSegmentDefinition submit_upload(title, comment, approvers, file_path)
Imports keys into the current segment definition from the csv file
:::note
This creates a change request and may not be fully automatable in environments with additional change requests and approvers.
:::
title as string
comment as string
approvers as [string]
file_path as string to a single column, no header CSV with segment key values<br />
Return: Boolean
```
ws = client.workspaces.find("Defaults")
en = client.environments.find("Production", ws.id)
largeSegmentDef = client.large_segment_definitions.find("employees", env.id, ws.id)
largeSegmentDef.submit_upload('title', 'comment', [], 'largeSegment.csv')
```
#### Boolean remove_all_members( title, comment, approvers)
Removes all keys from the large segment
:::note
This creates a change request and may not be fully automatable in environments with additional change requests and approvers.
:::
Parameters:<br />
title as string<br />
comment as string<br />
approvers as [string]<br />
Return: Boolean
```
ws = client.workspaces.find("Defaults")
env = client.environments.find("Production", ws.id)
largeSegmentDef = client.large_segment_definitions.find('large_segment',env.id, ws.id)
largeSegmentDef.remove_all_members('title', 'comment', [])
```
***
## Restrictions
_Class:_
### Restriction
```
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
<br />

_Methods:_
#### Array(Restriction) restrictions.list(resourceType, resourceId)
Fetches all restrictions for a given resource type and id.<br />
Parameters:<br />
resource_type as string; for example 'workspace'<br />
resource_id as string<br />
Return: List of Restriction objects
```
for ws in client.workspaces.list():
    print (ws._name)
    for res in client.restrictions.list("workspace", ws.id):
        print(res._resource)
        for rp in res._resourcePermissions["view"]:
            print(rp)
```
#### Restriction restrictions.add(resourceType, resourceId, data)
Adds a new restriction or overwrite the existing one to a Workspace instance.<br />
Parameters:<br />
data as JSON:
```
[{'id': 'string', 'type': 'string'}]
```
Return: Restriction instance
```
ws = client.workspaces.find("work-02")
# Administrator group is required for workspace permissions
gr = client.groups.find('Administrators')
print(gr._id)
user = client.users.find('bilal@split.io')
print(user._id)
client.restrictions.add("workspace", ws.id, [{"id": gr._id, "type": "group"},{"id": user._id, "type": "user"}])
```
***
## Segments
_Class:_
### Segment
```
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
<br />

_Methods:_
#### Array(Segment) segments.list(workspace_id)
Fetches all segments in a workspace and returns an array of Segment instances.<br />
Parameters:<br />
workspace_id as string<br />
Return: List of Segment objects
```
ws = client.workspaces.find("Defaults")
for seg in client.segments.list(ws.id):
    print (seg.name+", "+str(seg.description))
```
#### Segment segments.find(segment_name, workspace_id)
Finds a segment in a workspace given a name.<br />
Parameters:<br />
segment_name as string<br />
workspace_id as integer<br />
Return: Segment instance
```
ws = client.workspaces.find("Defaults")
seg = client.segments.find("employees", ws.id)
print (seg.name+", "+str(seg.production))
```
#### SegmentDefinition add_to_environment(environment_id)
Adds a current segment object to an environment.<br />
Parameters:<br />
environment_id as integer<br />
Return: SegmentDefinition object
```
ws = client.workspaces.find("Defaults")
env = client.environments.find("Production", ws.id)
seg = client.segments.find("employees", ws.id)
segDef = seg.add_to_environment(env.id)
```
#### SegmentDefinition remove_from_environment(environment_id)
Removes a current segment object to an environment and returns True if it's successful.<br />
Parameters:<br />
environment_id as integer<br />
Return: Boolean
```
ws = client.workspaces.find("Defaults")
en = client.environments.find("Production", ws.id)
seg = client.segments.find("employees", ws.id)
segDef = seg.remove_from_environment(env.id)
```
_Class:_
### SegmentDefinition
```
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
<br />

_Methods:_
#### Array(SegmentDefinition) segments.list(environment_id, workspace_id)
Fetches all segment definitions in an environment and returns an array of SegmentDefinition instances.<br />
Parameters:<br />
environment_id as integer<br />
workspace_id as integer<br />
Return: List of SegmentDefinition objects
```
ws = client.workspaces.find("Defaults")
env = client.environments.find("Production", ws.id)
for segDef in client.segment_definitions.list(env.id, ws.id):
    print (segDef.name)
```
#### SegmentDefinition segment_definitions.find(segment_name, environment_id, workspace_id)
Finds a segment in an environment.<br />
Parameters:<br />
segment_name as string<br />
environment_id as integer<br />
workspace_id as integer<br />
Return: SegmentDefinition instance
```
ws = client.workspaces.find("Defaults")
env = client.environments.find("Production", ws.id)
segDef = client.segment_definitions.find("employees", env.id, ws.id)
print (segDef.name)
```
#### Array(string) get_keys()
Fetches all keys of current segment definition object.<br />
Parameters: None<br />
Return: Array of string
```
ws = client.workspaces.find("Defaults")
env = client.environments.find("Production", ws.id)
segDef = client.segment_definitions.find("employees", env.id, ws.id)
for key in segDef.get_keys():
    print(key)
```
#### Boolean export_keys_to_csv(csv_file_name)
Exports all segment keys in a current segment definition object to a csv file and returns True if it's successful.<br />
Parameters:<br />
csv_file_name as string<br />
Return: Boolean 
```
ws = client.workspaces.find("Defaults")
en = client.environments.find("Production", ws.id)
segDef = client.segment_definitions.find("employees", env.id, ws.id)
segDef.export_keys_to_csv("seg.csv")
```
#### Boolean import_keys_from_json(replace_keys, json_data)
Imports keys into the current segment definition object from JSON object, with an option to replace all existing keys and returns True if it's successful.<br />
Parameters:<br />
replace_keys as boolean<br />
json_data as JSON:
```
{'keys':['key1, 'key2', 'key3'], 'comment':'a comment'}
```
Return: Boolean
```
ws = client.workspaces.find("Defaults")
en = client.environments.find("Production", ws.id)
segDef = client.segment_definitions.find("employees", env.id, ws.id)
segDef.import_keys_from_json("false", {"keys":["id4", "id5", "id6"], "comment":"a comment"})
```
#### Boolean remove_keys( json_data)
Removes keys from the current segment definition object stored in JSON object and returns True if it's successful.<br />
Parameters:<br />
json_data as JSON:
```
{'keys':['key1, 'key2', 'key3'], 'comment':'a comment'}
```
Return: Boolean
```
ws = client.workspaces.find("Defaults")
env = client.environments.find("Production", ws.id)
segDef = client.segment_definitions.find("employees", env.id, ws.id)
segDef.remove_keys({"keys":["id4", "id5", "id6"], "comment":"a comment"})
```
#### ChangeRequest submit_change_request(definition, operation_type, title, comment, approvers, rollout_status_id)
Submits adding keys request change for current segment definition object.<br />
Parameters:<br />
definition as JSON:
```
{
  'keys': '[string]',
}
```
operation_type as string<br />
title as string<br />
comment as string<br />
approvers as string array<br />
Return: ChangeRequest object
```
ws = client.workspaces.find('Default')
env = client.environments.find('Production', ws.id)
segmentDef = client.segment_definitions.find('employees', env.id, ws.id)
keys = ['user1', 'user2', 'user3']
cr = segmentDef.submit_change_request(keys, 'CREATE', 'new def', 'comment', ['user@email.com'], None, ws.id)
```
***
## Splits (now called feature flags in Harness FME)
_Class:_
### Split
```
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
:::note
Only getSplit and createSplit return 'owners' property.
:::
<br />

_Methods:_
#### Array(Split) splits.list(workspace_id, tags)
Fetches all feature flags in a workspace and returns an array of Split instances, will also filter by given tags in array of strings.<br />
Parameters:<br />
workspace_id as integer<br />
tags as array(string) Optional.<br />
Return: List of split objects
```
ws = client.workspaces.find("Defaults")
for sp in client.splits.list(ws.id, ["tag1", "tag2"]):
    print (sp.name+", "+sp.description)
```
#### Split splits.find(split_name, workspace_id, tags)
Finds a feature flag in a workspace given a name.<br />
Parameters:<br />
split_name as string<br />
workspace_id as integer<br />
tags as string (Optional)<br />
Return: Split instance
```
ws = client.workspaces.find("Defaults")
sp = client.splits.find("new_feature", wd.id)
print (sp.name+", "+sp.description)
```
#### SplitDefinition add_to_environment(environment_id, json_data)
Adds current feature flag object to an environment.<br />
Parameters:<br />
environment_id as integer<br />
json_data as JSON; feature flag definition structure:
```
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
Return: SplitDefinition object
```
ws = client.workspaces.find("Defaults")
env = client.environments.find("Production", ws.id)
sp = client.splits.find("new_feature", ws.id)
data={"treatments":[{"name":"on","configurations":""},{"name":"off","configurations": ""}],"defaultTreatment":"off", "baselineTreatment": "off","rules": [{"condition":{"matchers":[{"attribute":"group","type":"IN_LIST_STRING","strings":["employees"]}]}, "buckets":[{"treatment":"on","size":50},{"treatment":"off","size":50}]}],"defaultRule":[{"treatment":"off","size":100}], "comment": "adding comments"}
spDef = sp.add_to_environment(env.id, data)
```
#### Boolean remove_from_environment(environment_id, title, comment)
Removes a current split object to an environment and returns True if it's successful.<br />
Parameters:<br />
environment_id<br />
title (optional)<br />
comment (optional)<br />
Return: Boolean
```
ws = client.workspaces.find("Defaults")
en = client.environments.find("Production", ws.id)
sp = client.splits.find("new_feature", ws.id)
sp.remove_from_environment(environment_id=env.id, title="title", comment="comment")
```
#### Boolean associate_tags(tags)
Associates tags on current split object and overwrites existing ones, and returns True if it's successful.<br />
Parameters:<br />
tags as string array<br />
Return: Boolean
```
ws = client.workspaces.find("Defaults")
en = client.environments.find("Production", ws.id)
sp = client.splits.find("new_feature", ws.id)
sp.associate_tags(['my_new_tag', 'another_new_tag'])
```
 
_Class:_
### SplitDefinition
```
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
<br />

_Methods:_
#### Array(SplitDefinition) split_definitions.list(environment_id, workspace_id)
Fetches all feature flag definitions in an environment and returns an array of SplitDefinition instances.<br />
Parameters:<br />
environment_id as integer<br />
workspace_id as integer<br />
Return: List of SplitDefinition objects
```
ws = client.workspaces.find("Defaults")
env = client.environments.find("Production", ws.id)
for spDef in client.split_definitions.list(env.id, ws.id):
    print (spDef.name)
```
#### SplitDefinition split_definitions.find(split_name, environment_id, workspace_id)
Finds a feature flag in an environment.<br />
Parameters:<br />
split_name as string<br />
environment_id as integer<br />
workspace_id as integer<br />
Return: SplitDefinition instance
```
ws = client.workspaces.find("Defaults")
env = client.environments.find("Production", ws.id)
spDef = client.split_definitions.find("new_feature", env.id, ws.id)
print (spDef.name)
```
#### SplitDefinition split_definitions.get_definition(split_name, environment_id, workspace_id)
get a single split definition directly.<br />
Parameters:<br />
split_name as string<br />
environment_id as integer<br />
workspace_id as integer<br />
Return: SplitDefinition instance
```
ws = client.workspaces.find("Defaults")
env = client.environments.find("Production", ws.id)
spDef = client.split_definitions.get_definition("new_feature", env.id, ws.id)
print (spDef.name)
```
#### SplitDefinition update_definition(data)
Updates the full feature flag definition for the current SplitDefinition object.<br />
Parameters:<br />
data as JSON: Feature flag definition structure
```
{
  'comment': 'string',
  'treatments': [{
  'name': 'string',
  'configurations': 'string',
  'description': 'string',
  'keys': [ 'string' ],
  'segments': [ 'string' ]
 }],
  'defaultTreatment': 'string',  'baselineTreatment': 'string',
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
Return: SplitDefinition instance
```
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
#### Boolean kill()
Kills a current split object, and returns True if it's successful.<br />
Parameters: None<br />
Return: Boolean
```
ws = client.workspaces.find("Defaults")
env = client.environments.find("Production", ws.id)
spDef = client.split_definitions.find("new_feature", env.id, ws.id)
spDef.kill()
```
#### Boolean restore()
Restores a current split object and returns True if it's successful.<br />
Parameters: None<br />
Return: Boolean
```
ws = client.workspaces.find("Defaults")
env = client.environments.find("Production", ws.id)
spDef = client.split_definitions.find("new_feature", env.id, ws.id)
spDef.restore()
```
#### ChangeRequest submit_change_request(definition, operation_type, title, comment, approvers, rollout_status_id)
Submits a definition request change for current split definition object.<br />
Parameters:<br />
definition as JSON
```
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
operation_type as string
title as string
comment as string
approvers as string array
rollout_status_id as string, optional, use None if not specified.<br />
Return: ChangeRequest object
```
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
 
_Class:_
### Bucket
```
schema = {
  'treatment': 'string',
  'size': 'number'
}
```
<br />

_Methods:_
#### JSON export_dict()
Exports the current class structure as JSON.<br />
Parameters: None<br />
Return: JSON structure
```
from splitapiclient.resources import bucket
bk1 = bucket.Bucket({"treatment":"on","size":50})
print(bk1.export_dict())
```
_Class:_
### Condition
```
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
<br />

_Methods:_
#### JSON export_dict()
Exports the current class structure as JSON.<br />
Parameters: None<br />
Return: JSON structure
```
from splitapiclient.resources import condition
from splitapiclient.resources import matcher
match = matcher.Matcher({"attribute":"group","type":"IN_LIST_STRING","strings":["employees"]})
cond = condition.Condition({'matchers':[match.export_dict()]})
print(cond.export_dict())
```
 
_Class:_
### DefaultRule
```
schema = {
  'treatment': 'string',
  'size': 'number'
}
```
<br />

_Methods:_
#### JSON export_dict()
Exports the current class structure as JSON.<br />
Parameters: None<br />
Return: JSON structure
```
from splitapiclient.resources import default_rule
df = default_rule.DefaultRule({"treatment":"on","size":50})
print(df.export_dict())
```
 
_Class:_
### Matcher
```
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
<br />

_Methods:_
#### JSON export_dict()
Exports the current class structure as JSON.<br />
Parameters: None<br />
Return: JSON structure
```
from splitapiclient.resources import matcher
match = matcher.Matcher({"attribute":"group","type":"IN_LIST_STRING","strings":["employees"]})
print(match.export_dict())
```
 
_Class:_
### Rule
```
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
<br />

_Methods:_
#### JSON export_dict()
Exports the current class structure as JSON.<br />
Parameters: None<br />
Return: JSON structure
```
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
 
_Class:_
### Treatment
```
schema = {
  'name': 'string',
  'configurations': 'string',
  'description': 'string',
  'keys': [ 'string' ],
  'segments': [ 'string' ]
}
```
<br />

_Methods:_
#### JSON export_dict()
Exports the current class structure as JSON.<br />
Parameters: None<br />
Return: JSON structure
```
from splitapiclient.resources import treatment
tr1 = treatment.Treatment({"name":"on","configurations":""})
print(tr1.export_dict())
```
***
## Traffic Types
_Class:_
### TrafficType
```
schema = {
  'id': 'string',
  'name': 'string',
  'displayAttributeId': 'string',
}
```
<br />

_Methods:_
#### Array(TrafficType) traffictypes.list(workspace_id)
Fetches all traffic types in a workspace and returns an array of TrafficType instances.<br />
Parameters:<br />
workspace_id as string<br />
Return: List of TrafficType objects
```
ws = client.workspaces.find("Defaults")
for tp in client.traffic_types.list(ws.id):
    print (tp.name+", "+tp.id)
```
#### TrafficType traffictypes.find(traffic_type_name, workspace_id)
Finds a traffic type in a workspace by name.<br />
Parameters:<br />
traffic_type_name as string<br />
workspace_id as string<br />
Return: TrafficType object
```
ws = client.workspaces.find("Defaults")
tp = client.traffic_types.find('user', ws.id)
print (tp.name+", "+tp.id)
```
#### Array(Attribute) fetch_attributes()
Fetches all attributes of the current traffic type instance.<br />
Parameters: None<br />
Return: List of Attribute objects
```
ws = client.workspaces.find("Defaults")
tp = client.traffic_types.find('user', ws.id)
for at in tp.fetch_attributes():
    print (at.display_name)
```
#### Attribute add_attribute(data)
Adds a new attribute to the current traffic type instance.<br />
Parameters:<br />
data as JSON:
```
{ "id": "string", "displayName": "string", "description": "string", "dataType": "string", "isSearchable": "boolean", "suggestedValues": ["suggested", "values"]}
```
Return: Attribute object
```
ws = client.workspaces.find("Defaults")
tp = client.traffic_types.find('user', ws.id)
at = tp.add_attribute({"id": "attrib456", "displayName": "Street", "description": "St Address",
"dataType": "STRING", "isSearchable": False, "workspaceId": ws.id, "suggestedValues": ["Meadowlark", "Mayfield"] })
```
#### Identity add_identity(data)
Adds a new identity to the current traffic type instance.<br />
Parameters:<br />
data as JSON:
```
{ key: 'string', values: { 'attribute_id': 'string', ... } }
```
Return: Identity object
```
ws = client.workspaces.find("Defaults")
tp = client.traffic_types.find('user', ws.id)
env = client.environments.find("Production", wd.id)
at = tp.add_identity({'key': 'user120','values': {'attrib456': 'PM'}, 'environmentId': env.id)}
```
#### Identity add_identities(data)
Adds a new identities list to current traffic type instance and returns a tuple with successful and failed items. Successful items are Identity objects. Failed items will contain the Identity object for the failed item together with a status code and a message.
```
schema = { [{ key: 'string', values: { 'attribute_id': 'string', ... } }]
```
Return: Tuple
```
ws = client.workspaces.find("Defaults")
tp = client.traffic_types.find('user', ws.id)
env = client.environments.find("Production", wd.id)
at = tp.add_identities([{'key': 'user120','values': {'attrib456': 'PM'}, 'ecnvironmentId': env.id)},{'key': 'testing554','values': {'attrib123': 'CEO'}, 'environmentId': env.id)}])
```
#### import_attributes_from_json function
Imports attributes directly from a JSON array of objects.<br />
Parameters:<br />
data as JSON Array. Minimum needed for each attribute is an `id`property. Other properties can be `displayName`, `description`, `dataType`, and an array of `suggestedValues`.<br />
Return: boolean, true if successfully imported
```
ws = client.workspaces.find(workspace_name='Default')
tp = client.traffic_types.find('account', ws.id)
newAttributeData=[ { "id": "anAttribute2", "displayName": "An Attribute2", "description": "my description here", "dataType": "string", "suggestedValues": ["suggested","values"] } ]
tp.import_attributes_from_json(newAttributeData)
```
***
## Users
_Class:_
### User
```
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
<br />

_Methods:_
#### Array(User) users.list(status)
Fetches all users in the current org for specific status and returns array of User instances.<br />
Parameters: Status as string<br />
Return: List of User objects
```
for user in client.users.list('ACTIVE'):
    print(user.email)
```
#### User users.find(email)
Finds user in a workspace given email and returns User instances.<br />
Parameters: email as string<br />
Return: User object
```
user = client.users.find('user@mail.com')
print(user.email)
```
#### User update_user(data)
Updates the current user object data.<br />
Parameters:<br />
data as JSON:
```
{'name':'string', 'email':'string', '2fa':Boolean, 'status':'string'}
```
Return: User object
```
user = client.users.find('user@mail.com')
data = {'name':'bob', 'email':'user@mail.com', '2fa':False, 'status':'ACTIVE'}
user = user.update_user(data)
```
#### User update_user_group(data)
Updates the current user object group.<br />
Parameters:<br />
data as JSON:
```
[{'op': 'replace', 'path': '/groups/0', 'value': {'id': 'groupId', 'type':'group'}}]
```
Return: User object
```
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
#### User invite_user(data)
Sends an invite to an email and returns True if it's successful.<br />
Parameters:<br />
data as JSON:
```
{'email':'john@gmail.com', "groups":[{"id":"group_id", "type":"group"}]}
```
Return: Boolean 
```
client.users.invite_user({'email':'user@mail.com'})
```
#### User delete(user_id)
Deletes an existing user and returns True if it's successful.<br />
Parameters:<br />
user_id as string<br />
Return: Boolean 
```
user = client.users.find('user@mail.com')
client.users.delete(user._id)
```
***
## Workspaces (now called Projects in Harness)
_Class:_
### Workspace
```
schema = {
  'id': 'string',
  'name': 'string',
  'requiresTitleAndComments': 'boolean',
}
```
<br />

_Methods:_
#### Array(Workspace) workspaces.list()
Fetches all workspaces in an account and returns an array of Workspace instances.<br />
Parameters: None<br />
Return: List of Workspace objects
```
for ws in client.workspaces.list():
print ("\nWorkspace:"+ws.name+", Id: "+ws.id)
```
#### Workspace workspaces.find(workspace_name)
Finds a workspace in a given workspace name.<br />
Parameters:<br />
Workspace name as string<br />
Return: Workspace instance
```
ws = client.workspaces.find("Defaults")
print ("\nWorkspace:"+ws.name+", Id: "+ws.id)
```
#### Workspace workspaces.add(data)
Adds a new workspace.<br />
Parameters:<br />
data as JSON with workspace info:
```
{'name': 'string', 'requiresTitleAndComments': boolean, 'type': 'workspace'}
```
Return: Workspace instance
```
ws = client.workspaces.add({"requiresTitleAndComments" : True, "name" : "WS_From_API", "type" : "workspace"})
print ("\nWorkspace:"+ws.name+", Id: "+ws.id)
```
#### Workspace update(field_name, field_value)
Updates a field in existing workspace.<br />
Parameters:<br />
field_name as string<br />
field_value as string <br />
Return: Workspace instance
```
ws = client.workspaces.find("Default")
ws2 = ws.update("requiresTitleAndComments", True)
```
#### Workspace delete()
Delete the current instance for an existing workspace and returns True if successful.<br />
Parameters: None<br />
Return: Boolean
```
ws = client.workspaces.find("WS_From_API")
print (ws.name)
# If the workspace was created from the Admin API, we need to delete the traffic type that was automatically created before deleting the workspace
for ttype in client.traffic_types.list(ws.id):
    client.traffic_types.delete(ttype.id)
ws.delete()
```
#### Segment add_segment(data, traffic_type_name)
Adds a new segment to the Workspace instance.<br />
Parameters:<br />
data as JSON with segment name and description: 
```
{'name': 'string', 'description': 'string'}
```
traffic_type_name as string<br />
Return: Segment instance
```
ws = client.workspaces.find("Defaults")
seg = ws.add_segment(\{'name':'new_seg', 'description':'some description'\})
print(seg.name+", "+seg.production)
```
#### Boolean delete_segment(segment_name)
Deletes an existing segment from the Workspace instance and returns True if it's successful.<br />
Parameters:<br />
segment_name as string<br />
Return: Boolean 
```
ws = client.workspaces.find("Defaults")
ws.delete_environment('new_seg')
```
#### LargeSegment add_large_segment(data, traffic_type_name)
Adds a new large segment to the Workspace instance.<br />
Parameters:<br />
data as JSON with segment name and description:
```
{'name': 'string', 'description': 'string'}
```
traffic_type_name as string<br />
Return: Segment instance
```
ws = client.workspaces.find("Defaults")
seg = ws.add_segment(\{'name':'new_seg', 'description':'some description'\})
print(seg.name+", "+seg.production)
```
#### Boolean delete_large_segment(segment_name)
Deletes an existing large segment from the Workspace instance and returns True if it's successful.<br />
Parameters:<br />
segment_name as string<br />
Return: Boolean 
```
ws = client.workspaces.find("Defaults")
ws.delete_environment('new_seg')
```
#### Split add_split(data, traffic_type_name)
Adds a new feature flag to the Workspace instance.<br />
Parameters:<br />
data as JSON with a feature flag name and production flag:
```
{
  'name': 'string',
  'description': 'string',
  'owners': [{'id': 'string', 'type': 'string'}]
}
```
traffic_type_name as string<br />
Return: Split instance
```
ws = client.workspaces.find("Defaults")
gr = client.groups.find('Administrators')
print(gr._id)
user = client.users.find('bilal@split.io')
print(user._id)
sp = ws.add_split({'name':'new-split', 'description':'some description'},[{"id": gr._id, "type": "group"},{"id": user._id, "type": "user"}], 'user')
print(sp.name+", "+seg.production)
```
#### Boolean delete_split(split_name)
Deletes an existing feature flag from the Workspace instance and returns True if it's successful.<br />
Parameters:<br />
split_name as string<br />
Return: Boolean 
```
ws = client.workspaces.find("Defaults")
ws.delete_split('new-split')
```