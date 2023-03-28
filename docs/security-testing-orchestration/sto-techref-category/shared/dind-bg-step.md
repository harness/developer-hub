To scan a container image, you must have Docker-in-Docker running as a background service in the stage where you're running the scan.

<details><summary>Set up a Docker-in-Docker background step</summary>

In the **Execution** tab, do the following:

1. Click **Add Step** and then choose **Background**.
2. Configure the Background step as follows:
2. Dependency Name = `dind`
3. Container Registry = The Docker connector to download the DinD image. If you don't have one defined, go to [Docker connector settings reference](/docs/platform/Connectors/ref-cloud-providers/docker-registry-connector-settings-reference).
4. Image = `docker:dind`
5. Under **Optional Configuration**, select the **Privileged** checkbox.


```mdx-code-block
import set_up_harness_25 from '/docs/security-testing-orchestration/onboard-sto/static/set-up-harness-for-sto-25.png'
```

 ```mdx-code-block
<img src={set_up_harness_25} alt="Configure the background step" height="75%" width="75%" />
```

</details>