---
title: How to use Spot Instances with Launch Templates for Spinnaker 
---

## Introduction
A spot instance is an instance that uses unused Amazon EC2 capacity at a price much lower than on-demand instances.  Spot instances are mainly utilized for non-critical use cases, as they get terminated once a higher bid is made for the instance.
For more information, please visit AWS' information on Spot Instances: [https://aws.amazon.com/ec2/spot/](https://aws.amazon.com/ec2/spot/)
AWS suggests the best use cases for Spot Instances include
* Containerized workloads* Big data and analytics* CI/CD workloads
Launch Templates are AWS's preferred suggested method for customers to use the latest AWS capabilities.  AWS encourages customers to leverage Launch Templates to use the newest Spot Instance functions and find the latest instance-type options.

## Prerequisites
Launch templates will need to be enabled in the Spinnaker environment before being able to use Spot instances with Spinnaker
The steps are described in the Spinnaker OSS docs: [https://spinnaker.io/docs/setup/other_config/server-group-launch-settings/aws-ec2/launch-templates-setup/](https://spinnaker.io/docs/setup/other_config/server-group-launch-settings/aws-ec2/launch-templates-setup/)

It is recommended that admins ensure the environment is up-to-date, as certain features are only available with specific versions of Spinnaker.  Customers should attempt to use Spinnaker 2.27.3+, with some features only available on 2.28.1+
Customers should also consider implementing security, such as enabling ```IMDSv2```


## Instructions
Customers seeking to implement Spot instances in Spinnaker can utilize Launch Templates.  Users can invoke the Launch Template Feature in Spinnaker using API calls.  
### Via Launch Templates - Using API calls 
Spot Instances using Launch templates allows for additional options to reduce costs by diversifying instances across purchase options and Spot allocation strategies.  AWS recommends following their best practices around Spot Instances: [https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-best-practices.html](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-best-practices.html)
For more information the capabilities of Spot Instances and ASG deployment strategies, please see the following documentation:[https://spinnaker.io/docs/setup/other_config/server-group-launch-settings/aws-ec2/launch-templates/#additional-features](https://spinnaker.io/docs/setup/other_config/server-group-launch-settings/aws-ec2/launch-templates/#additional-features)
* Spot instances, along with other instance types and strategies, can be created by making API calls to Spinnaker.  This allows users and admins to make use of AWS's more advanced strategies around deploymentsCustomers can run a cURL command as per the example below. 
```
curl -H 'Content-Type: application/json' -d '{ "job": [ 
  {
    "type": "createServerGroup",
    "cloudProvider": "aws",
    "account": "my-aws-account",
    "application": "myAwsApp",
    "stack": "myStack",
    "credentials": "my-aws-account",
    "setLaunchTemplate": true,
    "subnetType":"test-subnet"
    "availabilityZones": {"us-west-1": ["us-west-1a","us-west-1b","us-west-1c"]},
    "amiName": "ami-12345",
    "capacity": {"desired": 3,"max": 5,"min": 3},
    "iamRole":"MyInstanceProfile",
    "instanceType":"m4.large",
    "requireIMDSv2": true,
    "onDemandBaseCapacity":1,
    "onDemandPercentageAboveBaseCapacity":50,
    "spotAllocationStrategy":"capacity-optimized",
    "launchTemplateOverridesForInstanceType": [
      {"instanceType":"m5.large","weightedCapacity":"1","priority": 2},
      {"instanceType":"m5.xlarge","weightedCapacity":"2","priority": 1}] 
  }], "application": "myAwsApp", "description": "Create New Server Group in cluster myAwsApp"}' -X POST http://my-spinnaker-gate:8084/tasks
```

* For more information and examples, please visit the Spinnaker OSS information [https://spinnaker.io/docs/setup/other_config/server-group-launch-settings/aws-ec2/launch-templates/#use-cases--sample-api-requests](https://spinnaker.io/docs/setup/other_config/server-group-launch-settings/aws-ec2/launch-templates/#use-cases--sample-api-requests).
 
### Via Launch Config - Deploy Strategy in the Spinnaker Console (Legacy)
* In the ```Deploy Stage``` of a pipeline, navigate to the ```Deploy configuration``` then select ```Add server group```.
* In the ```Advanced Settings``` section, you will see an option called ```Spot instances price (optional)```.  Users can input a cost threshold for a Spot Instance price. 
* Once the pipeline is executed, Spinnaker will deploy the Spot Instance with the price threshold set for it.
* Please note that options available through the Deploy Stage (as of 2.28.x) are limited since they employ Amazon Launch Configs.

