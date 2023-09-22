You need to run the scan step with root access if either of the following apply:

* You need to run a Docker-in-Docker background service. This is required in the following scenarios only:

  - You're using a generic Security step to run an Orchestrated or Extraction scan, rather than a scanner-specific step such as Aqua Trivy, Bandit, etc. (not required for Ingestion scans).
  
  - You're scanning a container image using an Orchestrated or Extraction scan (not required for Ingestion scans). 

* You need to add trusted certificates to your scan images at runtime. 

:::note

You can set up your STO scan images and pipelines to run scans as non-root and establish trust for your own proxies using self-signed certificates. For more information, go to [Configure STO to Download Images from a Private Registry](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/download-images-from-private-registry).

:::
