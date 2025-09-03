:::note
* UI configuration support is currently limited to a subset of scanners. You can set up other scanners using a [Custom Ingest](docs/security-testing-orchestration/sto-techref-category/custom-scan-reference) step. 
* Each step shows only the options that apply to a specific workflow. If you're setting up a repository scan, for example, the UI won't show Container Image settings. 
* Docker-in-Docker is not required for these steps *unless* you're scanning a container image on a Kubernetes or Docker build infrastructure. If you're scanning a repository using Semgrep, for example, you don't need to add a DinD background step.
* Support is currently limited to Kubernetes and Harness Cloud AMD64 build infrastructures only.
:::