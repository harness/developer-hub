---
title: Cannot add custom Kind to Delete Manifest Stage
---

## Issue
When adding the Delete Manifest Stage, Spinnaker will require a ```Kind``` field. For the Deploy Manifest Stage, a custom ```Kind``` can be added. However, Spinnaker is not able to get the Kubernetes custom ```Kinds``` for the ```Delete Manifest Stage```. When trying to add a custom ```Kind``` to the ```Delete Manifest Stage```, the user may see an error such as:
Exception ( Monitor Delete )
Failed to delete none/ from cluster: error: the server doesn't have a resource type "none"

## Cause
The ```Delete Manifest stage``` works differently within Spinnaker than the Deploy Manifest stage.
The ```KubernetesDeleteManifestOperatation``` that is used during the ```Delete Manifest stage``` uses the ```kind```'s handler to do the deletion. All unregistered ```kinds``` use the ```KubernetesUnregisteredCustomResourceHandler```, which always sets the ```kind``` to ```NONE.``` 
This isn't a problem for deploy operations as it doesn't need to do a lookup to find an existing resource, it is just adding the new resource to the cluster. For the delete operations, the current ```kind``` needs to be sent as part of the delete operation, but the handler only knows the ```kind``` as ```NONE```.
 

