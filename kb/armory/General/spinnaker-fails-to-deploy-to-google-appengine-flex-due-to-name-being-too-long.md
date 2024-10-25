---
title: Spinnaker Fails to Deploy to Google AppEngine Flex Due to Name Being Too Long
---

## Issue
Spinnaker fails to deploy to Google AppEngine due to name being too long. Error will look something like the following:
Failed to deploy to App Engine with command gcloud app deploy /var/tmp/clouddriver
/gcr.io-np-ca-analytics-xxx-pospbsb:1.0.21/./b5769c9f-d0a6-4f2c-95e3-
038f9cfcb880.yaml --version=caanalyticspossalespubsub-pospbsb-v000 --no-promote 
--stop-previous-version --project=np-ca-analytics-xxx --account=spinnaker-
onboarding@pr-developer-tools.iam.gserviceaccount.com --image-url=gcr.io/np-ca-
analytics-xxx/pospbsb:1.0.21: stdout: , stderr: Services to deploy:

WARNING: This deployment will result in an invalid SSL certificate for service
[possalespubsub]. The total length of your subdomain in the format $VERSION_ID-
dot-$SERVICE_ID-dot-$APP_ID should not exceed 63 characters. Please verify that
the certificate corresponds to the parent domain of your application when you
connect. descriptor: [/var/tmp/clouddriver/gcr.io-np-ca-analytics-xxx-
pospbsb:1.0.21/b5769c9f-d0a6-4f2c-95e3-038f9cfcb880.yaml] source:
[/var/tmp/clouddriver/gcr.io-np-ca-analytics-xxx-pospbsb:1.0.21] target project:
[np-ca-analytics-xxx] target service: [possalespubsub] target version: [caanalyticspossalespubsub-pospbsb-v000] target url:
[http://caanalyticspossalespubsub-pospbsb-v000.possalespubsub.np-ca-analytics-
xxx.uc.r.appspot.com]

(add --promote if you also want to make this service available from
[https://possalespubsub-dot-np-ca-analytics-xxx.uc.r.appspot.com])
Do you want to continue (Y/n)?
Beginning deployment of service [possalespubsub]... WARNING: Deployment of service
[possalespubsub] will ignore the skip_files field in the configuration file,
because the image has already been built. ERROR: (gcloud.app.deploy)
INVALID_ARGUMENT: Combined version and service (module) name is too long. The combined length must be less than 48 characters. Note that for internal reasons,
each hyphen or sequence of hyphens in the version or service name counts as one
extra character.

## Cause
The length of Spinnaker Application Name + Spinnaker Stack + Spinnaker Detail (optional) + Spinnaker Version (4 characters) combined cannot be greater than or equal to 48.

