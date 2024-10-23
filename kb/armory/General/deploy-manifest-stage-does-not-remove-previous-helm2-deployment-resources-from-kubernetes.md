---
title: Deploy (Manifest) stage does not remove previous Helm2 deployment resources from Kubernetes
---

## Issue
Sometimes when migrating an application to Spinnaker that was previously deployed using Helm2 or ```kubectl create```, the deployment's old resources are not removed or modified as expected.Example workflow:
* Helm2 chart was previously deployed in target Kubernetes namespace* This chart was migrated into Spinnaker and modified to include a new container, deployed in same namespace
* Deployment object in Kubernetes contained both the old container (installed in previous helm chart) and the new container.

## Cause
If the Kubernetes deployment resource does not contain a ```last-applied-configuration``` annotation, when Spinnaker uses ```kubectl apply``` to deploy the new manifest, Kubernetes may not know to remove the old container or other deployment resources. **Related issues:***[spinnaker/spinnaker#2877](https://github.com/spinnaker/spinnaker/issues/2877#issuecomment-429071589): Deploy (Manifest) stage merges attributes of existing object into deployed manifest*This user explains that they were running up against how kubectl apply was designed.```kubectl apply``` is known to create states similar to this when, for example, the previous deployment was generated with ```kubectl create```, which does not leave a ```last-applied-configuration``` annotation in the deployment. This annotation is used by ```kubectl apply``` to figure out what resources need to be removed or updated.

