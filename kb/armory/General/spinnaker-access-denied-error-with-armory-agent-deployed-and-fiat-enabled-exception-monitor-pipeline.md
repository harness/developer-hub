---
title: Spinnaker Access denied error with Armory Agent deployed and FIAT enabled (Exception (Monitor Pipeline))
---

## Issue
Admins and end users may find that with FIAT enabled and Armory Agent Deployed, Agent shows connection, but execution of pipelines will fail.  The following error may be outputted:
Exception ( Monitor Pipeline )
Exception in child pipeline stage (deploy-armory-agent-devtest: DeployManifest): Access denied to account test-spinnaker

 
FIAT is deployed without issue, and is enabled in the Clouddriver Config File. 

## Cause
When trying to perform any manifest operation (deploy/patch/delete etc) with either ```Scale Agent``` or ```Clouddriver Kubernetes v2``` provider, Clouddriver will first fetch permissions from FIAT to validate that the user is authorized to do that operation.
FIAT synchronizes authorization data of each account and its permissions every certain period of time specified on the ```fiat.writeMode.syncDelayMs``` property as stated within the [Authorization Architecture](https://spinnaker.io/docs/reference/architecture/authz_authn/authorization/#sync). The default value is ```600000 milliseconds``` (10 minutes).
Therefore, it’s possible that FIAT synchronizes auth data at minute zero, Clouddriver defines new credentials at one minute, and then a new operation is performed with the new accounts.
We will then need to wait 9 minutes for FIAT to synchronize the new accounts. Otherwise, during that period ```Access denied to account``` errors will happen for new operations of the newly defined accounts.  This is assuming Clouddriver has the default 10 mins defined at the properly, ```fiat.writeMode.syncDelayMs```.

