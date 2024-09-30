---
title: Exposing Gate API With x509 Certificates Using A Separate Deployment
---

## Introduction
This article will have detailed instructions on how to expose Gate API with X509 Certificates using a separate deployment. This includes useful commands, as well as a description of what needs to happen. Organizations can use this information as a guide and are encouraged to reach out to Armory support if assistance is required.


## Prerequisites
* Deployed Spinnaker* A separate instance of Spinnaker* Administrator Access* X509 Certificates have been set up.

## Instructions
These instructions contain example commands which will need to be modified to fit each organization's file structure.
**Copy the Main Gate Deployment**
Download the main Gate deployment using a command similar to the following:
kubectl -n spinnaker get deployment spin-gate -o yaml > gate-x509-deployment.yml

In that deployments, there will be a number of secrets referenced.  Download the contents of each of those secrets using a command similar to the following:
```kubectl -n spinnaker get secret spin-gate-files-xxxxxxxxx -o yaml > spin-gate-files-xxxxxxxxx.yml​```
If there is more than one secret referenced in the deployment, make sure to download all of them.For each item in each of the secrets, you'll need to base64 decode them into their component files.  There should be a minimum of three files to decode:
spinnaker.yml
gate.yml
gate-local.yml

If the `yq` command is available, the following is an example of a method to extract the component files and decode them:
```​yq r spin-gate-files-xxxxxxxxx.yml 'data[spinnaker.yml]' | base64 --decode > spinnaker.yml```
**NOTE: These files use the `.yml` extension without the `a`.  This is important, so please make sure the extension is correct.**Download the main Gate service using a command similar to the following:
```kubectl -n spinnaker get service spin-gate -o yaml > gate-x509-service.yml​```

**## Update the Files for the x509 Gate Deployment​**
* For each of the files extracted from the secrets, the following updates will need to be made:```* For `spinnaker.yml`, the value of the Gate URL will need to be updated to match the new external domain name of the x509 Gate deployment.  The specific value is `services.gate.baseUrl`.  If the main Gate deployment uses any specific paths, such as `/api/v1/`, it is recommended to keep the path on the x509 Gate service the same.``````* For `gate.yml`, no changes should be required.``````* For `gate-local.yml`, make the changes required to support the x509 endpoint per the x509 documentation available at [https://docs.armory.io/docs/spinnaker-install-admin-guides/api-endpoint/#gate-local](https://docs.armory.io/docs/spinnaker-install-admin-guides/api-endpoint/#gate-local)```**NOTE: Do not update the Operator or Halyard configs for this as these setting are not going to apply to the main Gate deployment.**If the `x509.enabled` value is not set in the `gate.yml` or `gate-local.yml` files, add the following to the `gate-local.yml` to enable x509 instead of using the Operator or Halyard configuration: 
````x509.enabled: true`​```
**​NOTE: Make sure TLS certificates are configured and the x509 setting is enabled.*** The deployment will need to be modified to use a secret with a new name, such as `spin-gate-x509-files`, and will need the deployment name updated to differentiate it from the main Gate deployment, such as `spin-gate-x509`.  Also, remove the `status` section, as it cannot be updated.* The service will need to be modified to reference the new deployment, e.g. `spin-gate-x509`, use the x509 port (`8085`), and have a new name, such as `spin-gate-x509`.
**## Deploy the x509 Gate Deployment**
First create the secret with a command similar to the following:
```kubectl -n spinnaker create secret generic spin-gate-x509-files --from-file=./spinnaker.yml --from-file=./gate.yml --from-file=./gate-local.yml​```
Next, create the deployment with a command similar to the following:
```kubectl apply -f gate-x509-deployment.yml​```
Finally, create the service with a command similar to the following
```kubectl apply -f gate-x509-service.yml​```
* Once the above is deployed, verify functionality.  If using a load balancer in front of the x509 Gate deployment, make sure the load balancer is in TCP (layer 4) mode so it passes the TLS certs to the x509 Gate deployment


