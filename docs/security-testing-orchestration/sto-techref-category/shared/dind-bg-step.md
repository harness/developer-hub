To scan a container image, you must have Docker-in-Docker running as a background service in the stage where you're running the scan.

<details><summary>Set up a Docker-in-Docker background step</summary>

1. Go to the stage where you want to run the scan.

2. In **Overview**, add the shared path `/var/run`.

2. In **Execution**, do the following:

    1. Click **Add Step** and then choose **Background**.
    2. Configure the Background step as follows:
       1. Dependency Name = `dind`
       2. Container Registry = The Docker connector to download the DinD image. If you don't have one defined, go to [Docker connector settings reference](/docs/platform/Connectors/Cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference).
       3. Image = `docker:dind`
       4. Under **Optional Configuration**, select the **Privileged** checkbox.

```mdx-code-block
import set_up_harness_25 from '/docs/security-testing-orchestration/onboard-sto/static/set-up-harness-for-sto-25.png'
```

```mdx-code-block
<img src={set_up_harness_25} alt="Configure the background step" height="50%" width="50%" />
```

</details>