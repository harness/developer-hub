---
title: Controlling the Number of Caching Agents in Clouddriver
---

## Introduction
Caching agents query the infrastructure on behalf of Clouddriver to index the data and save the results in a cache store, Redis by default, or an SQL data store.
The number of caching agents varies significantly between providers and Clouddriver configurations.  For example, AWS might have between ***16 and 20 agents per region*** performing tasks such as caching the status of IAM roles, instances, VPCs, AMI, etc.
Depending on the size of the infrastructure and how many elements it has, administrators may need to increase Clouddriver's CPU and memory limits, increase the number of running Clouddriver instances, or both.
Administrators [should review the following KB article](https://support.armory.io/support?id=kb_article_view&sysparm_article=KB0010483) to help determine the resources an environment may need.Administrators can also exert more control over the number of Caching Agents if the environment only uses some of the deployment providers in Spinnaker.  This is what the content of this article will cover.

## Prerequisites
Suppose administrators only use Spinnaker to deploy to Kubernetes clusters in some accounts and have the Lambda plugin enabled for other accounts.
In that case, the administrators can run only the Kubernetes caching agents and limit the resource usage by Clouddriver.
Lower resource usage by Clouddriver also means a lower bill for resource consumption. 
One caveat is that administrators will now need to manually re-enable or adjust the agents in the future as necessary.

## Instructions
There are two ways administrators can exert this control.  It can be by determining a global configuration for all accounts defined in the Spinnaker manifest or by setting specific configurations for each account in Spinnaker.
### Using a regex pattern that will work globally for all deployment accounts defined in the Spinnaker manifest
Below is an example of enabling specific caching agents.  The function of the regex pattern is using an allowlist logic.  In this scenario, the agents are being enabled for:
```LambdaCachingAgent``` is used for caching the Lambda functions in all the AWS accounts if the deployment provider is enabled.```KubernetesCoreCachingAgent``` and ```KubernetesUnregisteredCustomResourceCachingAgent``` is used for caching all defined kind-types in the Kubernetes clusters when the deployment provider is enabled.Keeping```VPC and Subnet``` agents is a good practice.  These caching agents should be left "on" by default as these caching agents run as a dependency for the Spinnaker configuration. 
The following is a configuration example for the ```SpinnakerService.yml``` file to fulfill the criteria above and contains a sample regex pattern:
spec:
  spinnakerConfig:
    profiles:
      clouddriver:
          agent:
            enabled-pattern:  '(.*LambdaCachingAgent.*|.*KubernetesCoreCachingAgent.*|.*AmazonVpcCachingAgent.*|.*AmazonSubnetCachingAgent.*|.*KubernetesUnregisteredCustomResourceCachingAgent.*)'
 
### Setting disabled caching agents on an account-by-account basis in the Spinnaker manifest
The following is an example of how to set caching agents for each target account within Spinnaker.  Please note this second approach is time-consuming because of the work to manage each account defined in the Spinnaker configuration and the manual process for configuring and managing manifests in the future.  However, this will provide more granular control through denylist logic.   
In this scenario's example:
Suppose the environment has an AWS account named ```aws-dev``` in the Spinnaker manifests. For the account named ```aws-dev``` the administration team wants to cache only the ***Lambda serverless functions***, and everything else from the AWS account can be excluded since there is no use for it.
The following is a configuration example for the ```SpinnakerService.yml``` file to fulfill the criteria above
spec:
  spinnakerConfig:
    profiles:
      clouddriver: # is the contents of ~/.hal/default/profiles/clouddriver.yml
          agent:
            disabled-agents: 'aws-dev/eu-central-1/AmazonApplicationLoadBalancerCachingAgent,aws-dev/eu-central-1/AmazonSecurityGroupCachingAgent,aws-emea-ecs/eu-central-1/ServiceCachingAgent,aws-dev/eu-central-1/ImageCachingAgent,aws-dev/eu-central-1/AmazonCertificateCachingAgent,aws-dev/eu-central-1/LaunchConfigCachingAgent,aws-dev/eu-central-1/InstanceCachingAgent,aws-dev/eu-central-1/ClusterCachingAgent,aws-dev/eu-central-1AmazonLoadBalancerInstanceStateCachingAgent,aws-dev/eu-central-1/AmazonLoadBalancerCachingAgent,aws-dev/eu-central-1/AmazonLoadBalancerInstanceStateCachingAgent,aws-dev/eu-central-1/ImageCachingAgent/private,aws-dev/eu-central-1/AmazonKeyPairCachingAgent,aws-dev/eu-central-1/AmazonElasticIpCachingAgent'
Upon redeploying Clouddriver, administrators should only see the specified enabled caching agents in the logs.

