---
title: Upgrade to Spinnaker (1.20.x+/2.20.x+) Causes Errors as Pipelines Deploy to Unavailable Namespace
---

## Issue
After upgrading Spinnaker completed successfully from 1.19.x/2.19.x or below to 1.20.x/2.20.x or above, attempts to deploy pipelines causes errors.  The following is an example of the error
```Deploy failed: Error from server (NotFound): error when creating "STDIN": namespaces "xxxxxxxxxxxxx" not found```
The namespace is not a part of any declarations within your halconfig, etc.   
This error can also be applicable/appear where Spinnaker will attempt to deploy to the current namespace it occupies (basically what it defaults to) if the following is true:
* ```*kubeconfig*``` doesn't define any namespace* Manifest doesn't define any namespace* Override namespace in stage definition is not enabled* Deployment targets a different cluster than the one where spinnaker lives

## Cause
Spinnaker OSS change in 1.20.x (2.20.x Armory version):[https://github.com/spinnaker/spinnaker/issues/5731](https://github.com/spinnaker/spinnaker/issues/5731)
A bugfix that shipped with Spinnaker 1.20 fixes an issue in versions 1.19 and earlier, where Spinnaker would attempt to read the default namespace in the context using a faulty JSON path.As a result of this error, Spinnaker was always falling back to the ```default``` namespace. As a result of this change, Spinnaker is now correctly interpreting the default namespace declared in the kubeconfig fileAnother possibility is that Spinnaker can also end up falling back in the namespace specified in:
```/var/run/secrets/kubernetes.io/serviceaccount/namespace```
in absence of any namespace specified in the kubeconfig file

