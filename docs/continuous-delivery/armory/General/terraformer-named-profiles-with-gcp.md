---
title: Terraformer Named Profiles with GCP
---

## Introduction
Armory has implemented the Named Profiles concepts within Spinnaker
[https://docs.armory.io/armory-enterprise/armory-admin/terraform-enable-integration/#named-profiles](https://docs.armory.io/armory-enterprise/armory-admin/terraform-enable-integration/#named-profiles)
However, customers may also be hoping to use Named Profiles with Google Cloud Platform.  Armory's Terraformer Named Profiles solution can work with GCP credentials as well.

## Prerequisites
Please ensure Terraformer is enabled
[https://docs.armory.io/armory-enterprise/armory-admin/terraform-enable-integration/](https://docs.armory.io/armory-enterprise/armory-admin/terraform-enable-integration/)

## Instructions
#### Attaining the JSON Key File
In order to define credentials, users or admins should have a ```.json``` file with the credentials in a pre-defined location. Their credentials can be attained by following the first section the ```adding credentials``` section in Terraform's knowledge base: [https://registry.terraform.io/providers/hashicorp/google/latest/docs/guides/getting_started#adding-credentials](https://registry.terraform.io/providers/hashicorp/google/latest/docs/guides/getting_started#adding-credentials)
Customers will need to download the JSON key file and store it.  They can do so either in a Credentials Manager or in Kubernetes Secrets.  
Once the file is in the appropriate place, it can be referenced by defining the secrets as a token [https://docs.armory.io/armory-enterprise/armory-admin/secrets/](https://docs.armory.io/armory-enterprise/armory-admin/secrets/)
#### In Halyard
Customers using Halyard should look to make the following adjustments in the ```.hal/default/profiles``` directory by creating or editing their ```terraformer-local.yml``` file. 
Please ensure the kind ```name``` is ```GOOGLE_CREDENTIALS``` so that the information can be interpreted properly.  The ```value``` should include the secrets location as defined thorough [https://docs.armory.io/armory-enterprise/armory-admin/secrets/](https://docs.armory.io/armory-enterprise/armory-admin/secrets/) (For example, ```encrypted:k8s!n:spin-secrets!k:GCPTestCredentials.json```)
- name: gcp-credentials
    variables:
      - kind: static
        options:
          name: GOOGLE_CREDENTIALS
          value: 
#### In Operator
Customers using Operator should place the following information under ```spec.spinnakerConfig.profiles.terraformer```
Please ensure the kind ```name``` is ```GOOGLE_CREDENTIALS``` so that the information can be interpreted properly.  The ```value``` should include the secrets location as defined thorough [https://docs.armory.io/armory-enterprise/armory-admin/secrets/](https://docs.armory.io/armory-enterprise/armory-admin/secrets/) (For example, ```encrypted:k8s!n:spin-secrets!k:GCPTestCredentials.json```)
spec:
  spinnakerConfig:
    profiles:
      terraformer:
        - name: gcp-credentials
            variables:
              - kind: static
                options:
                  name: GOOGLE_CREDENTIALS
                  value: 
####  

