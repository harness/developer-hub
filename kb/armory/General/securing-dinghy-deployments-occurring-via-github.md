---
title: Securing Dinghy Deployments Occurring via GitHub
---

## Introduction
Customers running an environment with Dinghy deployments via GitHub may find the need to secure their deployments.  Administrators often would like to know how Spinnaker secures a GitHub Pull Request and limits the trigger to authorized users.
From the standpoint of Spinnaker, changes to the Repo should be managed with Github permissions.  In order to secure the environment, most of the changes and security must be completed on the GitHub side of the equation.  
When Dinghy is configured, any Github user who has access to the Github Repo configured to use the ```dinghyfile``` can modify the ```dinghyfile``` so that it will create a pipeline to deploy to any environment.  This is because the credentials assigned to the user are on the Github level and are not passed as a part of the webhook payload to Spinnaker, and Spinnaker cannot use those permissions to identify access permissions of the user. 
Within the Spinnaker environment itself, Dinghy as a service is provided administration permissions so that it can execute on the changes pushed to it through the webhook.
Once item to note as well is that a user could also potentially modify permissions and triggers in the ```dinghyfile``` that would then allow them to trigger the pipeline without logging in by using the ```runAsUser``` property of the trigger.   This definition should always be reviewed before approving any changes to the ```dinghyfile```
One other possibility that customers can look to leverage is to use Policy Engine to provide additional checks on the content of the deployment are met before executing.  

## Prerequisites
Access to Github Repo to administer changes

## Instructions
The restrictions in this case, must come from the Github policies and architecture/design of the repo.  As it stands of this writing, Github does not support RBAC on the folder/file level.  
There are a couple best practices surrounding Github architecture that will assist administrators to restrict the access and capabilities of end users.  
* Have ```CODEOWNERS``` defined for the ```dinghyfile```: [About code owners - GitHub Docs](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/about-code-owners)* Have a ```Branch protection rule``` set up that requires a Pull Request review from the ```CODEOWNERS```: [Managing a branch protection rule - GitHub Docs](https://docs.github.com/en/github/administering-a-repository/managing-a-branch-protection-rule)
Once these two items are set, this will force a review of changes made to the Github repository and allow companies to manage the access control to their pipelines with regards to Dinghy

In an Armory enabled environment, customers can also look to leverage Policy Engine to create a policy to validate the application and account combination at runtime.  The following blog post outlines the basics about how to accomplish policy creation: [https://www.armory.io/blog/policy-deployment-and-self-governance-with-spinnaker/](https://www.armory.io/blog/policy-deployment-and-self-governance-with-spinnaker/)
For more information about Policy Engine, please read the following documentation on [Enabling Policy Engine](https://docs.armory.io/docs/armory-admin/policy-engine-enable/) and [Using Policy Engine](https://docs.armory.io/docs/spinnaker-user-guides/policy-engine-use/) 

