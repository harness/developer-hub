---
title: How to upload to AWS S3 from Armory CDSH / Spinnaker
---

## Introduction
Although Clouddriver can download artifacts from S3 as part of a ```Deploy (Manifest)``` pipeline stage, it cannot natively upload to S3.  A ```Run Job (Manifest) stage``` can be used to upload objects to S3.  The following process example is based on a KB article describing running a generic shell script in Spinnaker ([https://support.armory.io/kb_view.do?sysparm_article=KB0010129](https://support.armory.io/kb_view.do?sysparm_article=KB0010129)).  

## Prerequisites
Write access to an S3 bucket will be required from the Spinnaker cluster.

## Instructions
Users looking to write to an S3 bucket will first need to create a ```Run Job (Manifest) stage``` in the pipeline.  The following is an example that should be modified to fit the parameters of the S3 bucket and will write a test message to ```file.tmp``` within the S3 Bucket.
```
apiVersion: v1
kind: ConfigMap
data:
  script.sh: |-
    echo "test file contents" > file.tmp
    aws s3 cp file.tmp s3://your-bucket/your-folder/
metadata:
  name: s3-upload-configmap
---
apiVersion: batch/v1
kind: Job
metadata:
  labels:
    app: s3-upload-test
  name: s3-upload-test
spec:
  backoffLimit: 2
  template:
    spec:
      containers:
        - command:
            - sh
            - /opt/script/script.sh
          image: amazon/aws-cli:latest
          name: s3-upload
          volumeMounts:
            - mountPath: /opt/script
              name: s3-upload-configmap
              readOnly: false
      restartPolicy: Never
      volumes:
        - configMap:
            name: s3-upload-configmap
          name: s3-upload-configmap
```

The key sections are:
* ```ConfigMap.data.script.sh```: the shell commands to upload a file to s3.  In this example, we generate a test file for upload.  * ```Job.template.spec.containers.image```: This needs to be an image with AWS CLI installed.  * Users should utilize IAM roles to handle authentication if deploying to an EC2 or ECS instance.  Otherwise, they could configure AWS authentication by inserting ```aws configure``` commands in the args section before the upload.  Providing credentials within pipelines is not recommended for secure environments, as the credential data will be present in pipelines and logs.  

