---
title: What to Consider When Using Terraformer with the Provisioner, Local-Exec
---

## Introduction
In a local environment, users would usually include the ```local-exec``` provisioner to run operations on their local machine. 
[https://www.terraform.io/docs/provisioners/local-exec.html](https://www.terraform.io/docs/provisioners/local-exec.html)
This is usually because they have other operations like doing a Git Pull Request from a repository, or running an **Ansible / Chef / Puppet** script from the same system.  In a Spinnaker environment, this needs to be adjusted

## Prerequisites
N/A

## Instructions
Since most users/customers run their Spinnaker environment either in Kubernetes (e.g. EKS) or in containerized services (e.g. ECS) in the cloud, it will mean a change needs to be made to the scripts that are pre-existing. Because the Terraformer service is not running on an instance like EC2 or a VM where additional modules can be installed, users should instead look to leverage the Terraform provisioner, ```remote-exec```*. *[https://www.terraform.io/docs/provisioners/remote-exec.html](https://www.terraform.io/docs/provisioners/remote-exec.html)  Since ```local-exec``` invokes a local executable, it would in essence be executing the command on the container/pod, which is local to Terraformer. As an example re-working the Terraform Code and using Spinnaker, instead of running the Git Pull Request and subsequent Ansible / Chef / Puppet execution on the same container with ```local-exec,``` a separate instance should be set up to execute what is required.
One possible way would be to bake and then deploy an instance in Spinnaker with the services you need installed and then use that instance in Terraformer's ```remote-exec``` provisioner to execute the reset of your Terraform Code.While it may be possible to add services to your existing Pod/Container, in general, Armory does not recommend for our customers to make modifications to add additional services to the preexisting Spinnaker containers/pods as they can be removed upon upgrade or re-deployment.

