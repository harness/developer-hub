---
title: Capture Spinnaker configurations with the Armory Support Bundle
---


### Introduction
Troubleshooting a Spinnaker issue may require customers to manually pull the configurations  from their environment. At times, the configurations may be incomplete which would again require customers to pull the details causing a delay in the actual issue resolution.
To avoid such discrepancies, ```Armory's Support Bundle``` application helps in capturing the accurate details  about the customer's Spinnaker installation. The Armory Support Bundle is a Kubernetes tool that pulls a standardized set of configuration details from Spinnaker manifests. The debug information is then compressed in the form of zip file and can provided to Armory's technical support team over the support case.  
### What Information can the Armory Support Bundle discover?
Armory Support Bundle retrieves all pod, service, and deployment configuration associated with an Armory installation. This emulates what a user does when trying to describe resources with ```kubectl```. The tool will generate a zip file with all the info it gathered so they can be easily share across teams, and attach to Support tickets. This also gives you the opportunity to manually remove any sensitive information that is not meant to be shared with Armory.
### Workflow
Below is the flow diagram that depicts how Armory Support Bundle operates

Installation
There are two manifests in support bundle:
* ```deploy.yaml``` - the support bundle runner* ```visualizer.yaml``` - a utility pod to retrieve the generated zip file
Below are the steps involved in installation of the Armory Support Bundle
Run the Support Bundle by running the below command . Replace the namespace with the namespace where Spinnaker is installed.  The Support Bundle only needs to be run and active when gathering information
kubectl -n  \
  apply -f \
  https://engineering.armory.io/manifests/support-bundle/0.1.0/deploy.yaml​
The above command creates a job in the cluster that will scrape the debug information and collect the manifests into a zip file.To retrieve the debug information, install the visualizer by executing the following command
kubectl -n  \
  apply -f \
  https://engineering.armory.io/manifests/support-bundle/0.1.0/visualizer.yaml​
After applying the above manifest, there will be 2 pods as mentioned below that shall come up on the cluster: ```armory-support-bundle ``````armory-support-bundle-visualizer```This can be verified by running the below command
```kubectl -n  get pods​```

### Retrieving the debug information 
* The debug content can be located on the visualizer pod that was installed above in a ***persistent volume***. The content will be in the form of zip files with timestamps. Because these files are saved on the persistent volume, the number of files will depend on how many times the ```armory-support-bundle``` was installed.  The exact filename of the most recent execution can be completed by running the following command on the visualizer pod:
```kubectl -n  exec armory-support-bundle-visualizer -- ls -ltr /opt/support​```
Once the zip is located, it can be extracted to the user's machine using the following command
```kubectl -n  cp armory-support-bundle-visualizer:opt/support/ ​```
* Once the debug content is extracted, it can then be attached to Armory support case
### Freeing Resources after Retrieving the configurations
* Since there is no need to keep the Armory Support Bundle pods running, it is best to remove them to free up resources.Below are the commands to delete the pods 
kubectl -n  delete \
  -f   https://engineering.armory.io/manifests/support-bundle/0.1.0/deploy.yaml​
kubectl -n  delete \
  -f   https://engineering.armory.io/manifests/support-bundle/0.1.0/visualizer.yaml​

### Multiple Executions
Post deletion if it is necessary to capture the debug information again, install the Armory Support Bundle using the installation steps, and run through the process again.

### Troubleshooting
It may be noticed that the zip file generated on the visualizer pod is empty.
* In such cases, it is ideal to start by looking into the armory-support-bundle job logs by running the below command.
```kubectl logs armory-support-bundle-xxxx -n  ```
* Check to see if there are any access or forbidden errors similar to the ones shown below
2021/08/26 21:58:35 there was an error while trying to get deployments: deployments.apps is forbidden: User "system:serviceaccount:namespace:armory-support-bundle" cannot list resource "deployments" in API group "apps" in the namespace "Armory"
2021/08/26 21:58:35 there was an error while trying to get secrets: services is forbidden: User "system:serviceaccount:namespace:armory-support-bundle" cannot list resource "services" in API group "" in the namespace "Armory"
2021/08/26 21:58:35 there was an error while trying to get pods: pods is forbidden: User "system:serviceaccount:namespace:armory-support-bundle" cannot list resource "pods" in API group "" in the namespace "Armory"
* If there are similar errors, then it is probably because the command parameter of armory-support-bundle job in ```deploy.yaml``` points to the namespace called "Armory" and the spinnaker may not be installed under Armory namespace or the namespace may not exist. This has to be be updated to the namespace where spinnaker is installed.
apiVersion: batch/v1
kind: Job
metadata:
  labels:
    name: armory-support-bundle
  name: armory-support-bundle
spec:
  backoffLimit: 1
  template:
    spec:
      containers:
      - command:
        - /courier
        - --namespace
        - Armory  # Update the namespace where spinnaker is installed
        image: armory/courier:0.1.0
        name: armory-support-bundle
        volumeMounts:
        - mountPath: /opt/support
          name: armory-support-bundle

Please reach out to Armory support if there are issues in getting the support configurations even after following the above troubleshooting steps.

