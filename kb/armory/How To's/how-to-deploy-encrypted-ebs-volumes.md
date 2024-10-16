---
title: How to deploy encrypted EBS volumes
---

## Introduction
Although no option currently exists in the UI to deploy encrypted EBS volumes (see [Cannot Define EBS Volumes When Deploying Baked AMI](https://support.armory.io/support?sys_kb_id=90991176dba0b81079f53ec8f4961907&id=kb_article_view&sysparm_rank=1&sysparm_tsqueryId=f4336852dbb3f010ac71c26c299619fe)), it is possible through the Deploy stage JSON.

## Prerequisites
IAM permissions and appropriate role(s) to allow the use of AWS KMS.

## Instructions
Please note that all rules regarding volume encryption (such as not being able to encrypt an already created EBS volume) follow AWS' encryption rules. 
### Scenario 1 - Deploy non-root encrypted EBS volumes
In this scenario we want to deploy an EC2 instance using a non-encrypted AMI whilst attaching an encrypted EBS non-root volume. The end result should look like this in the AWS console:

First, go to AWS KMS and either generate a new key or grab the ID for one to use.
In the Deploy stage of a pipeline, click "Edit stage as JSON" and insert the ```blockDevices``` section as below:
```
{
  "clusters": [
    {
      "account": "myAwsAccount",
      "application": "myApp",
      "availabilityZones": {
        "eu-west-1": [
          "eu-west-1a",
          "eu-west-1b",
          "eu-west-1c"
        ]
      },
      "blockDevices": [
        {
          "deleteOnTermination": true,
          "deviceName": "xvdb",
          "encrypted": true,             <----        
          "kmskeyid": "KMS_KEY_ID",      <----
          "size": 50,
          "volumeType": "gp2"
        }
      ],
      "capacity": {
        "desired": 1,
        "max": 1,
        "min": 1
      },
      "cloudProvider": "aws",

 ...REST_OF_CONFIG...

      ],
      "useAmiBlockDeviceMappings": false,    <----
    }
  ],
  "name": "Deploy",
  "type": "deploy"
}
``` 
Ensure "encryption" is set to ```true``` and enter the KMS key ID from earlier in the ```kmskeyid``` field. ```useAmiBlockDeviceMappings``` should be set to ```false``` otherwise the instance will deploy with the unencrypted root volume but the encrypted volume will not be created.
Execute the deployment. 
 
**Scenario 2 - Deploy an EC2 instance with an encrypted root volume**
In this scenario we are creating an EC2 instance with an encrypted root volume only:

**IMPORTANT**: the AMI being deployed must be encrypted, that is, ```sda1``` or the root volume should have the encrypted flag set in the AMI Block Device details. It is beyond the scope of this KB to go into how to do that, but for testing purposes a non-encrypted AMI was copied in the AWS console with the ```Encrypt target EBS snapshots``` option selected. The AMI details should like like this:

The copied and now encrypted AMI is then referenced as the Base AMI in the Bake stage prior to deployment:

This may not be necessary depending on how images are created and how deployments are run. When the deployment runs, the root volume is encrypted because the EBS snapshot from the AMI was also encrypted.
**NOTE**: the size, type etc. values are dictated by the AMI, and cannot be overwritten during the deployment.
 
**Scenario 3 - Deploy an EC2 instance with encrypted root and non-root EBS volumes**

Combine scenarios 1 and 2 but with two caveats:
1. AWS will override whatever key put in the ```kmskeyid``` field in favor of the one used to encrypt the AMI initially. In this case the ```kmskeyid``` field does not even appear to be required and the deployment will complete by using the AMI encryption key. 
2. ```useAmiBlockDeviceMappings``` should be set to ```false```. 
 

**Common Issues**

*Volume stays in "attaching" status*
- typo in the KMS key ID or the incorrect key is being specified

*The instance(s) launch with a non-encrypted root volume but my encrypted volume is not created or attached*
- set ```useAmiBlockDeviceMappings``` to ```false```

*```sda1``` specified to be encrypted but it is not*
- check the AMI being used. If ```sda1``` is not flagged as encrypted in the device details of the AMI, it will not be encrypted when deployed. Expected AWS behavior.

**IMPORTANT**: ```useAmiBlockDeviceMappings``` = Spinnaker will use the block device mappings from the selected AMI when deploying a new server group. If instances are deploying but the EBS volumes are not being created try flipping this value.

*When trying to deploy an encrypted non-root volume, Scaling Activity shows an error like "Launching a new EC2 instance. Status Reason: The device 'sda1' is used in more than one block-device mapping. Launching EC2 instance failed."*
- It may be that ```sda1``` was specified as the ```deviceName``` but have ```useAmiBlockDeviceMappings``` set to false. Change ```useAmiBlockDeviceMappings``` to true or use a different deviceName like ```xvdb```. Check the AMI Block Devices to see what is already being used as ```sda1``` will already be in use in most cases.

*When trying to deploy an encrypted root volume from an encrypted AMI, Scaling Activity shows an error like "Launching a new EC2 instance. Status Reason: The device 'sda1' is used in more than one block-device mapping. Launching EC2 instance failed."*
- ```sda1``` is likely being used already from the AMI

*When trying to deploy an encrypted non-root EBS value with an encrypted root volume, the instance is created with the encrypted root volume but the non-root-volume is not created.*
- ```useAmiBlockDeviceMappings``` should be set to false to add additional encrypted volumes else only the mappings on the AMI are used.

*When trying to deploy an encrypted non-root EBS value with an encrypted root volume, the value for kmskeyid is ignored.*
- Believed to be expected behavior on the AWS side


