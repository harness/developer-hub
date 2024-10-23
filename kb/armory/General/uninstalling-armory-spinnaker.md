---
title: Uninstalling Armory Spinnaker
---

## Introduction
The following information explains how uninstall Armory Spinnaker from an environment.

## Prerequisites
Administration access

## Instructions
**Uninstall Armory Spinnaker installed using Armory Operator**
All Armory Spinnaker components are installed inside the namespace specified by the user during installation. To uninstall Armory Spinnaker, simply delete the namespace using the following commands:

```kubectl -n  delete spinnakerservice spinnaker```

More information in the link below:
[https://docs.armory.io/docs/installation/armory-operator/op-manage-spinnaker/#delete-armory-enterprise](https://docs.armory.io/docs/installation/armory-operator/op-manage-spinnaker/#delete-armory-enterprise)
 
Please note that resources deployed with Armory Spinnaker may continue to remain even after removal. Admins should seek to remove all pipelines and resources, or transfer their management before removing Spinnaker.
 
**Uninstall Armory Spinnaker installed using Halyard**
If Halyard was installed on Linux/MacOS, run the following commands:
 

```hal deploy clean```

 

```sudo ~/.hal/uninstall.sh```

 
If Halyard was installed using Docker, simple delete the running halyard Docker container using the following commands:
 

```docker rm halyard```

 
More information in the link below:
[https://spinnaker.io/docs/setup/install/halyard/#uninstall-halyard-from-debianubuntu-or-macos](https://spinnaker.io/docs/setup/install/halyard/#uninstall-halyard-from-debianubuntu-or-macos)
[https://spinnaker.io/docs/setup/install/halyard/#uninstall-halyard-from-docker](https://spinnaker.io/docs/setup/install/halyard/#uninstall-halyard-from-docker)
 
Please note that resources deployed with Armory Spinnaker may continue to remain even after removal. Admins should seek to remove all pipelines and resources, or transfer their management before removing Spinnaker.

