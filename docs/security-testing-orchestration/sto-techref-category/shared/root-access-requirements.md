You need to run the scan step with root access if either of the following apply:

* You need to run a Docker-in-Docker background service.

* You need to add trusted certificates to your scan images at runtime. 

:::note

You can set up your STO scan images and pipelines to run scans as non-root and establish trust for your own proxies using self-signed certificates. For more information, go to [Configure STO to Download Images from a Private Registry](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/download-images-from-private-registry).

:::