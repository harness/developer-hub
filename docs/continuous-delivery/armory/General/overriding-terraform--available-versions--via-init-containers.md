---
title: Overriding Terraform  Available Versions  via init containers
---

## Issue
The available Terraform versions in Spinnaker are updated upon new releases and patches.  However, customers may wish to create an update themselves ahead of time by overriding using an ```init container```. [https://kubernetes.io/docs/concepts/workloads/pods/init-containers/](https://kubernetes.io/docs/concepts/workloads/pods/init-containers/)
If a customer wishes to add additional Terraform versions, they can do so with the instructions below. However, please note that these versions have not been tested with Spinnaker and have not go through integration testing, and should only be done knowing the possible risks involved with using an untested version of Terraform. 
By making these changes, any errors associated with untested versions of Terraform are considered out of scope until versions have proceeded through the normal release and testing process.

## Cause
Terraformer expects all the Terraform versions to be in a directory locally when it starts up. Since the Terraform binaries have to exist and be accessible, typically one could use a separate script and image to put them in place in an ```init container```.

