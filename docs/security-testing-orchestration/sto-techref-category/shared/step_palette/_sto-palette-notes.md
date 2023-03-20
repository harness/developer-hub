:::note
* UI configuration support is currently limited to the following scanners: Aqua Trivy, Bandit, Black Duck, Checkmarx, Grype, Mend, Prisma Cloud, Snyk, SonarQube, and ZAP. 
* Each step palette shows only the options that apply to a specific scan. If you're setting up a repository scan, for example, the UI won't show Container Image settings. 
* Docker-in-Docker is not required for these steps *unless* you're scanning a container image. If you're scanning a repository using Bandit, for example, you don't need to set up a Background step running DinD.
* Support is currently limited to Kubernetes and Harness Cloud AMD64 build infrastructures only.
:::