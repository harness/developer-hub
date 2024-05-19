---
title: General Containerized Steps FAQs
description: Frequently asked questions about Containerized steps.
sidebar_position: 7
---

### How can I override the lite-engine image for the Container Run step to pull images from ECR instead of Docker Hub? 

Yes, use Docker Connector with your registry URL and anonymous access would help you to achieve this.

### Does the container step in CD override the entry point when using the command input?

The entry point in the base image will be overwritten as we have to run the commands specified in the run step.

### Can a single custom plugin be created that could be used in steps for both the CI and CD modules?

Yes, it is possible to create a single custom plugin that can be used in both the CI and CD modules. The documentation for creating custom plugins is similar for both modules, and the same plugin can be used in both. The only difference is in how the plugin is used in the pipeline. In the CI module, the plugin is used in a [Plugin step](https://developer.harness.io/docs/continuous-integration/use-ci/use-drone-plugins/explore-ci-plugins), while in the CD module, it is used in a [Containerized step](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/plugin-step). As long as the plugin is designed to work in both types of steps, it can be used in both modules.


### Is there a method to modify permissions for write access to the `/tmp` directory in order to mitigate the risk of a team unintentionally or intentionally deleting it, thereby avoiding potential disruptions for other teams that rely on it without restrictions?

No, we don't have such feature availability now.
Although one can simply use Containerized step groups instead of having teams work out of `/tmp`.
Please refer more on containerized step group in this [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups/)


### How to pass the dynamic tag of the image from the CI pipeline to the CD Pipeline to pull the image?
A project or org or account level variable can be created and A shell_script/Run Step can be added in the P1 pipeline to export or output the required variable then the P2 pipeline can access this variable and perform the task based on its value.
 
The shell script will use this API to update the value of the variable - https://apidocs.harness.io/tag/Variables#operation/updateVariable


### How do I use a custom stage to do the Terraform Cloud Run step?
The run step is only supported in the CI and CD stages. For the custom stage, please use the Shell Script step.


### Why doesn't the pipeline roll back when the Container Step times out?

The Container Step is being deprecated, and support for it will no longer be provided. Instead, we recommend incorporating a step group that is container-based in your pipeline and proceeding to create a Run step. This step will function similarly to the container step, but the rollback will operate as expected.


### Can I use the same cluster for running the Harness Delegate and containerized step group(s), or is it required to use separate clusters ?

Certainly! one has the flexibility to use the same cluster for both the Harness Delegate and containerized step group(s). However, it's important to note that this is not a requirement. Harness is designed to accommodate various deployment scenarios, allowing you to optimize resource utilization based on your specific needs. Feel free to configure your setup according to your preferences and resource allocation strategy.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups#important-notes).




### How to fetch files from the harness file store in the Run step?
To fetch files from the Harness file store in a Run step, you can use the following example:

```
- step:
    type: Run
    name: Fetch Files from File Store
    identifier: fetch_files
    spec:
      shell: Sh
      command: |
        harness file-store download-file --file-name <file_name> --destination <destination_path>
```
Replace "filename" with the name of the file you want to fetch from the file store, and "destinationpath" with the path where you want to save the file on the target host.


### Is there a way the user can pull from Bitbucket/Github inside the Harness Delegate and then push it to the target server?

Yes, you can use the git clone step and after that, you can push the files to the target server with the shell script/run step in the stage.


### Is there an alternative work for usage of Container step in Continuous Delivery?

Yes, we recommend using **Container-step-group + run step**.
Read more about [Containerized step group](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups/#add-a-containerized-step-group).


### Do common containerized steps like "run" and "git clone" require a CI license to be available in CD step groups?

No, you do not need a CI license to use the "run" and "git clone" steps in a CD step group, even though they are typically listed under the "build" section.


### How can one access the AWS CDK provisioning in their workflow? Are there any feature flags required?

No, accessing AWS CDK provisioning does not require any Feature flags. However, to utilize AWS CDK provisioning steps in your workflow, ensure that you are operating within a containerized step group specifically designated for AWS CDK provisioning. These steps are only visible when adding a step within that particular step group. If no step is added within the AWS CDK provisioning containerized step group, the associated steps will not be visible.

For more information on AWS CDK provisioning, please refer to the following Harness [documentation](https://developer.harness.io/docs/continuous-delivery/cd-infrastructure/aws-cdk/).


### Can I use Plugin or Git Clone steps in Deploy or Custom stages?

Yes, you can add these steps in Containerized step groups in Deploy or Custom stages.


### Can I use any CI steps in a Containerized step group?

No. Only some step types are available in Containerized step groups.


### Where are steps in Containerized step groups executed?

They are executed on a separate pod created at runtime.

The pod is cleaned up after step group execution ends.


### Are separate pods created for each step in a Containerized step group?

No. Harness creates one pod for the containerized step group and runs all step containers in the group on that pod.


### Can I access files from a Containerized Step group in a subsequent Shell Script step?

No. Containerized step groups are isolated on a separate pod from other steps. Files generated in the containerized step group aren't available in outside steps.


### Can I run a Containerized step group on a self-managed VM or local infrastructure?

No, containerized step group can only run on Kubernetes infrastructure.


### Does the Containerized step group's command override CMD and/or ENTRYPOINT?

The step group's **Command** is overwritten the image's default entrypoint, if it has one.

If you want to run the entrypoint in addition to other commands, make sure the image doesn't have a default entry point, and then execute all the commands in the step group's **Command**.


