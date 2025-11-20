---
title: Configure ElastiCache with Spinnaker
---

## Introduction
Spinnaker stores its pipeline execution history in REDIS. The default configuration deploys a pod in the kubernetes cluster. If the pods gets restarted, all of the history gets lost.Using ElastiCache removes this possibility.

## Prerequisites
N/A

## Instructions
We are going to use a terraform script to create all that we need for this. The script is located in this repository: [https://github.com/armory/terraform/tree/master/elasticache](https://github.com/armory/terraform/tree/master/elasticache)This script creates an ElastiCache cluster using a Redis engine, it’s based on an already existing vpc using its subnet ids, this to allow connectivity to the Spinnaker cluster. 
### Variables
In the file ```terraform.tfvars```” you need to set some variables.
-subnet-1-cidr: the eks subnet cluster
-subnet-2-cidr = the eks subnet cluster
-availability_zones: zones where a node of the cluster will be available.  This needs to be equal or less than the number of nodes in the cluster
-security_group_ids: The eks nodes sg
### Execute the Script
```
terraform init 
terraform plan -var-file=terraform.tfvars
terraform apply -var-file=terraform.tfvars
```

### Result
After run the script the infrastructure should be created and the output of the script is the primary endpoint of the ElastiCache cluster.
 
### Validate Spinnaker has Connection to Elasticache
To validate Spinnaker has connection to Elasticache you need to exec into the Gate pod and run
```nc -zv  6379```
Console should should show:
bash-4.4$ nc -zv myelasticache.usw2.cache.amazonaws.com 6379
myelasticache.usw2.cache.amazonaws.com (0.0.0.0:6379) open
If it’s not open, you should verify the subnet ids, and security groups to validate it is correct. 
## Configuring Spinnaker with the Cluster
To configure spinnaker to use this cluster follow:Using elasticache in aws eks cluster: Run terraformer scripts: Need to output the dns endpointIf terraformer is enabled, add the following to ```terraformer-local.yml```
```
      redis:
        host: 
      port: 
```
If dinghy is enabled, add the following to ```dinghy-local.yml```
```
  services:
    redis:
        address: 
```
In ```redis.yml```, add the following code:
overrideBaseUrl: redis://:
skipLifeCycleManagement: true
Disable automatic Redis configuration in Gate by adding the following to your ```gate-local.yml``` file:
```
    redis:
     configuration:
       secure: true
```
To delete the default redis pod, run
```kubectl -n spinnaker delete deployment spin-redis```

