---
title: Terraformer Stages Stop Running Jobs with a 'timeout' error (Logging Enabled)
---

## Issue
Users may find that their Terraformer Stages show an error with an ```Exception (Monitor Run Terraform) timeout``` in the Spinnaker Console while having Terraform Logging Enabled


Customers also have ```spec.spinnakerConfig.profiles.terraformer.logging.remote.enabled``` value set to ```true``` in their Spinnaker Configuration.  
spec:
  spinnakerConfig:
    profiles:
      terraformer:
        logging:
          remote:
            enabled: true

or set to ```true``` in Halyard in the hal config profiles directory e.g. (```~/.hal/default/profiles/```) in the ```terraform-local.yml``` file
logging:
  remote:
    enabled: true

## Cause
The logging and metrics for Terraformer is enabled and set to an endpoint which is unreachable.
[https://docs.armory.io/docs/armory-admin/terraform-enable-integration/#logging-and-metrics](https://docs.armory.io/docs/armory-admin/terraform-enable-integration/#logging-and-metrics)


