---
title: How to Tag EBS Volumes with Spinnaker using Launch Templates in AWS
---

## Introduction
Tagging is a means of categorization within a cloud environment to identify, organize, search and filter resources.  As teams scale, tagging becomes an essential part of most DevOps teams' best practices.

In deploying AWS resources in Spinnaker, defining resources happened using Launch Configurations, but AWS has since migrated towards using Launch Templates.  (Please see the following KB Article: [https://support.armory.io/support?id=kb_article_view&sysparm_article=KB0010548](https://support.armory.io/support?id=kb_article_view&sysparm_article=KB0010548))

## Prerequisites
Launch templates will need to be enabled in the Spinnaker environment (The steps are described in the Spinnaker OSS docs: [https://spinnaker.io/docs/setup/other_config/server-group-launch-settings/aws-ec2/launch-templates-setup/](https://spinnaker.io/docs/setup/other_config/server-group-launch-settings/aws-ec2/launch-templates-setup/)) 

It is recommended that admins ensure the environment is up-to-date, as certain features are only available with specific versions of Spinnaker.
* Customers should attempt to use Spinnaker 2.27.3+
* Access to launch templates is available to the Spinnaker Environment.


## Instructions
Launch Template [tag specifications feature](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-launchtemplate-tagspecification.html) to [tag EBS volumes](https://github.com/spinnaker/clouddriver/blob/master/clouddriver-aws/src/main/java/com/netflix/spinnaker/clouddriver/aws/services/LaunchTemplateService.java#L601') is a supported feature in Spinnaker.
Since Spinnaker creates new launch templates with every server group, the EBS volumes defined in the launch templates can be tagged using the [*blockDeviceTags*](https://github.com/spinnaker/clouddriver/blob/master/clouddriver-aws/src/main/groovy/com/netflix/spinnaker/clouddriver/aws/deploy/description/BasicAmazonDeployDescription.groovy#L101)* *parameter in the [```createServerGroup``` within the launch template request](https://spinnaker.io/docs/setup/other_config/server-group-launch-settings/aws-ec2/launch-templates/#create-a-server-group-with-launch-template).
For example: ``````
```"blockDeviceTags":{ "test": "myVolume" }```
 
By defining the value, users can tag newly created EBS volumes for the server group with application, cluster, and user-provided block device tags. The following code was added to the Spinnaker project by AWS to allow for this functionality:[https://github.com/spinnaker/clouddriver/blob/master/clouddriver-aws/src/main/java/com/netflix/spinnaker/clouddriver/aws/deploy/DefaultAmazonResourceTagger.java#L59-L64](https://github.com/spinnaker/clouddriver/blob/master/clouddriver-aws/src/main/java/com/netflix/spinnaker/clouddriver/aws/deploy/DefaultAmazonResourceTagger.java#L59-L64)

