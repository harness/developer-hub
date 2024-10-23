

<details>
<summary>Set up a Docker-in-Docker background step</summary>

1. Go to the stage where you want to run the scan.

2. In **Overview**, add the shared path `/var/run`.

2. In **Execution**, do the following:

    1. Click **Add Step** and then choose **Background**.
    2. Configure the Background step as follows:
       1. Dependency Name = `dind`
       2. Container Registry = The Docker connector to download the DinD image. If you don't have one defined, go to [Docker connector settings reference](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference).
         :::info
         If your container registry uses a [self-signed certificate](https://en.wikipedia.org/wiki/Self-signed_certificate), the background step will not be able to access the registry by default. Refer to [Configure DinD Background step to trust self-signed container registries](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference.md#configuring-dind-background-step-to-trust-self-signed-container-registries) for instructions.
         :::
       3. Image = `docker:dind`
       4. Under **Entry Point**, add the following: `dockerd` 
          
          In most cases, using `dockerd` is a faster and more secure way to set up the background step. For more information, go to the **TLS** section in the [Docker quick reference](https://hub.docker.com/_/docker).

          If the DinD service doesn't start with `dockerd`, clear the **Entry Point** field and then run the pipeline again. This starts the service with the default [entry point](https://docs.docker.com/engine/reference/run/#entrypoint-default-command-to-execute-at-runtime).

       5. Under **Optional Configuration**, select the **Privileged** checkbox.



import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


<Tabs>
  <TabItem value="Visual" label="Visual setup" default>

import set_up_harness_25 from '/docs/security-testing-orchestration/get-started/static/set-up-harness-for-sto-25.png'

<img src={set_up_harness_25} alt="Configure the background step" height="50%" width="50%" />



</TabItem>
<TabItem value="YAML" label="YAML setup" default>


Add a Background step to your pipeline and set it up as follows:

```yaml
- step:
   type: Background
   name: background-dind-service
   identifier: Background_1
   spec:
      connectorRef: CONTAINER_IMAGE_REGISTRY_CONNECTOR
      image: docker:dind
      shell: Sh
      entrypoint:
         - dockerd
      privileged: true
```


</TabItem>
</Tabs>


</details>
