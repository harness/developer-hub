---
title: Configure Spinnakers External Account Configuration with Vault
---

## Introduction
##### WARNING: Spring Cloud Config Server is not recommended for use with Armory Enterprise. As an alternative, Armory has built the External Accounts plugin to provide our customers with a reliable replacement.
Customers may find that their environment requires a way to add, delete, or modify Kubernetes deployment targets on a regular basis without redeploying Clouddriver to pull in the new account configuration.  This is because redeploying Clouddriver can impact their teams' productivity.
Spinnaker's [External Account Configuration](https://spinnaker.io/docs/setup/other_config/configuration/#external-account-configuration) feature allows customers to manage account configuration externally from Spinnaker and then read that configuration change without requiring a redeployment of Clouddriver.

```External Account Configuration``` is only supported for ***Kubernetes and CloudFoundry provider accounts***. This document describes how this works with Kubernetes accounts.

```External Account Configuration``` uses Spring Cloud Config Server to allow portions of Clouddriver's configuration to be hosted in an external source. See [Enabling external configuration](https://www.spinnaker.io/setup/configuration/#enabling-external-configuration) for details on the implementation and its limitations.
The general, high-level steps involved in setting up dynamic Kubernetes accounts are:
* Create a JSON type secret in Vault. This secret stores the entire contents of the Kubernetes account portion of the Clouddriver configuration.* Create or update the ```spinnakerconfig.yml``` file to enable Spring Cloud Config Server and to connect it to Vault.* Redeploy Spinnaker.

## Prerequisites
This document assumes the following:
* A running Spinnaker cluster* A Vault instance is accessible from the Spinnaker cluster.* Vault tokens are available that Spinnaker can use to access the Vault instance.* The ```kubeconfig``` is valid for the target Kubernetes cluster.

## Instructions
### 1. Create the secret in Vault
The secret in Vault contains the ```accounts``` section that was previously in the Halyard or Operator configuration. Note that the configuration should be left in Halyard or Operator for the Kubernetes account where Spinnaker is deployed. Clouddriver *replaces* all of its account information with what it finds in the Vault token. The configuration for the Spinnaker cluster should be added in the case that the cluster will be used as a deployment target for Clouddriver.
The ```kubeconfig``` file for each cluster is stored inline as a single line string in the ```kubeconfigContents``` element of the JSON. A ```sed``` command can be used to convert a ```kubeconfig``` file to a string:

```sed -E ':a;N;$!ba;s/\r{0,1}\n/\\n/g' kubeconfig.yml```

Create a secret in Vault of type JSON with contents specific for the accounts:
```
{
"kubernetes": {
  "accounts": [
    {
      "cacheThreads": 1,
      "cachingPolicies": [],
      "configureImagePullSecrets": true,
      "customResources": [],
      "dockerRegistries": [],
      "kinds": [],
      "kubeconfigContents": "",
      "name": "",
      "namespaces": [],
      "oAuthScopes": [],
      "omitKinds": [],
      "omitNamespaces": [],
      "onlySpinnakerManaged": true,
      "permissions": {},
      "providerVersion": "V2",
      "requiredGroupMembership": []
    },
   {
      "cacheThreads": 1,
      "cachingPolicies": [],
      "configureImagePullSecrets": true,
      "customResources": [],
      "dockerRegistries": [],
      "kinds": [],
      "kubeconfigContents": "",
      "name": "",
      "namespaces": [],
      "oAuthScopes": [],
      "omitKinds": [],
      "omitNamespaces": [],
      "onlySpinnakerManaged": true,
      "permissions": {},
      "providerVersion": "V2",
      "requiredGroupMembership": []
    },
  ]
}
}
```

### 2. Update spinnakerconfig.yml and redeploy Spinnaker
In order to complete the configuration of Spinnaker to use dynamic accounts, the backend and default-key fields must be defined. This is directly related to how the secret was created in Vault.  For example, if the secret is set to ```spinnaker```/```clouddriver```:
* ```backend``` is ```spinnaker```* ```default-key``` is ```clouddriver```.
The Spring Cloud Config Server that is internal to Clouddriver only supports the ```Vault token authentication``` type. An access token must be created in order to configure Clouddriver.
#### Operator
In the ```spinnakerService``` manifest:
```
apiVersion: spinnaker.armory.io/{{}}
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    files:
      profiles__spinnakerconfig.yml: |
        spring:
          profiles:
            include: vault
          cloud:
            config:
              server:
                vault:
                  host: 
                  port: 8200
                  backend: 
                  kvVersion: 2
                  scheme: http
                  default-key: 
                  token: 
```
Then, run the following command to deploy the changes:

```kubectl -n spinnaker apply -f spinnakerservice.yml```

#### Halyard
Create or update the ```spinnakerconfig.yml``` file (located in ```.hal/default/profiles``` by default), with the following content:
```
spring:
  profiles:
    include: vault
  cloud:
    config:
      server:
        vault:
          host: 
          port: 8200
          backend: 
          kvVersion: 2
          scheme: http
          default-key: 
          token: 
```
Then, run ```hal deploy apply``` to deploy the changes.
### 3. Check Spinnaker for new accounts
When all of the pods are running and ready, perform a hard refresh of the Spinnaker web interface. The accounts added in the Vault secret should now be available in the web interface to use.

### Troubleshooting
If the configuration in the ```spinnakerconfig.yml``` is incorrect, Clouddriver may not start. Because External Account Configuration is also available for the Echo and Igor services, some issues may appear within those pods as well. Check the Clouddriver logs for errors related to the Vault profile. Use the ```kubectl logs ``` command to view the logs.
If External Account Configuration is working properly, the messages similar to the following can be found in the Clouddriver logs as long as the accounts were loaded and there were no changes:
````
2020-04-23 13:49:29.921  INFO 1 --- [reshScheduler-0] o.s.boot.SpringApplication               : The following profiles are active: composite,vault,local
2020-04-23 13:49:29.951  INFO 1 --- [reshScheduler-0] o.s.boot.SpringApplication               : Started application in 1.55 seconds (JVM running for 63660.417)
2020-04-23 13:49:30.180  INFO 1 --- [reshScheduler-0] k.v.c.KubernetesV2ProviderSynchronizable : No changes detected to V2 Kubernetes accounts. Skipping caching agent synchronization.
If a change to an account were made, the following similar messages can be found:
2020-04-23 14:07:00.905  INFO 1 --- [reshScheduler-0] o.s.boot.SpringApplication               : The following profiles are active: composite,vault,local
2020-04-23 14:07:00.921  INFO 1 --- [reshScheduler-0] o.s.boot.SpringApplication               : Started application in 1.602 seconds (JVM running for 64711.387)
2020-04-23 14:07:01.178  INFO 1 --- [reshScheduler-0] k.v.c.KubernetesV2ProviderSynchronizable : Synchronizing 1 caching agents for V2 Kubernetes accounts.
2020-04-23 14:07:01.181  INFO 1 --- [reshScheduler-0] k.v.c.KubernetesV2ProviderSynchronizable : Adding 3 agents for account newaccount
````