---
title: sourceAMI Must be Defined in Two Areas if a template JSON is used in AWS bakes
---

## Issue
Rosco supports adding ```sourceAMI``` which would serve as the base image for baking a custom AMI.  This setting can be changed/completed from the UI.  However, if a template JSON contains the filter ```source_ami_filter```, the Source AMI would also be based on the filter conditions.

## Cause
There are two steps when the Bake process kicks in.

Rosco would validate the ```sourceAMI``` defined in the configuration (or from UI) to see if the source AMI exists.  It validates by making a request to Clouddriver, which in turn uses the AWS APIs to determine if the ```sourceAMI``` is valid.
---> HTTP GET http://spin-clouddriver.gowri-operator-spin:7002/aws/images/find?q=CentOS+Linux+7+x86_64+HVM+EBS*&account=gowri-aws&region=us-east-1


Once the source AMI is valid, it invokes the packer command with the sourceAMI seen as the variable along with others.  Below is a sample command it invokes.
```packer, build, -color=false, -var, aws_region=us-east-1, -var, aws_instance_type=t2.micro, -var, aws_source_ami=ami-d7e1d2bd, -var, aws_target_ami=nginx-all-20220427155605-vendor-centos-7, -var, aws_ssh_username=centos, -var, aws_associate_public_ip_address=true, -var, package_type=rpm, -var, packages=nginx, -var, configDir=/opt/rosco/config/packer, -var, aws_subnet_id=subnet-02fd76fd0e0db6662, -var, aws_vpc_id=vpc-0a54022472f8eeb4c, /opt/rosco/config/packer/aws-vendor-centos-7-latest.json```

If the ```sourceAMI``` is not defined in the Rosco configurations, the bake will fail during the validation step.
Users may also have a criteria/filter before fetching the source AMI that uses a prefix.  ``````If the filter is defined, Packer does not respect the variables (such as sourceAMI) passed to the Packer command.  Without the filter, the accurate sourceAMI cannot be located because Spinnaker does not support fields like ```owners``` that's available on the filter in the template JSON.

