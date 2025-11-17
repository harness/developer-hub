---
title: How to Use and Migrate to Launch Templates, Migrating from Launch Configuration
---

## Introduction
By Default, Spinnaker and customers have been using [Launch Configuration from AWS](https://docs.aws.amazon.com/autoscaling/ec2/userguide/LaunchConfiguration.html) as a way for managing their Auto-Scaling Groups, as it has been the more matured solution.  However, as of 2017, Amazon has introduced the concepts of [Launch Templates](https://docs.aws.amazon.com/autoscaling/ec2/userguide/LaunchTemplates.html) and has been actively developing this method to manage resources. 
Launch templates have been available since 2.24.x, and additional supports to this feature have been added in 2.27 and the upcoming 2.28 release thanks to contributions by AWS in OSS that we leverage in Armory's Enterprise distribution.
In AWS' own documentation, they have since advised [in blog posts](https://aws.amazon.com/blogs/compute/amazon-ec2-auto-scaling-will-no-longer-add-support-for-new-ec2-features-to-launch-configurations/#:~:text=Launch%20templates%20define%20the%20steps,ve%20added%20to%20launch%20templates.) and in their documentation pages about their intention to discontinue support for new features from Launch Configurations.
AWS' own involvement in the OSS community and making changes to Spinnaker has been in the direction of adding and supporting functionality for Launch Templates only, and it is suggested that companies plan to move to this methodology as well. 
Launch templates have been available since 2.24.x, and Amazon is has added additional supports to this feature in 2.27 and the upcoming 2.28 release thanks to contributions by AWS in OSS that we leverage in our Enterprise distribution.

## Prerequisites
Set up the environment to use Launch Templates using the following OSS documentation:[https://spinnaker.io/docs/setup/other_config/server-group-launch-settings/aws-ec2/launch-templates-setup/](https://spinnaker.io/docs/setup/other_config/server-group-launch-settings/aws-ec2/launch-templates-setup/)
 

## Instructions
It is highly encourage all administrators enabling Launch Templates to consider a controlled rollout methodology. Please take special note of the [Rollout section near the bottom](https://spinnaker.io/docs/setup/other_config/server-group-launch-settings/aws-ec2/launch-templates-setup/#rollout-configuration), which instructs on how to phase this rollout with a whitelist set of applications to ensure a controlled rollout in the Enterprise cluster.
In general, customers should look to do the following:
Enable [Launch Templates given the above documentation](https://spinnaker.io/docs/setup/other_config/server-group-launch-settings/aws-ec2/launch-templates-setup/) in a sandbox environment
* Adjust the policies attached to the role Spinnaker relies on. See: [https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-launch-template-permissions.html](https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-launch-template-permissions.html))
* Only whitelist a small set of applications that can be used to perform a validation
Validate that pipelines are behaving as expected, and deploying EC2 applications
* Check and review policies above are set correctly
* Make any adjustments necessary
* Widen the rollout to whitelist an entire AWS account, repeat step 2
* Enable for all applications, regardless of account, repeat step 2
* Roll out to Production instance in the same manner

