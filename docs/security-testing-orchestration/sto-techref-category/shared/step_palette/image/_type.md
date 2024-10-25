The registry type where the image is stored: 

* **Docker v2** A registry that uses the Docker Registry v2 API such as [Docker Hub](https://docs.docker.com/registry/spec/api/), [Google Container Registry](https://cloud.google.com/container-registry), or [Google Artifact Registry](https://cloud.google.com/artifact-registry). STO will automatically pull and scan the container image or OCI/Docker archive.


* **[AWS ECR](https://aws.amazon.com/ecr/)** Set your AWS ECR connector with image details. STO will automatically pull and scan the container image or OCI/Docker archive.

* **[Jfrog Artifactory](https://jfrog.com/artifactory/)** Set your Jfrog Artifactory connector with image details. STO will automatically pull and scan the container image or OCI/Docker archive.

* **Local Image in this Stage** Scan a local image built and stored within the context of the current stage (via `/var/run/docker.sock` registered as a stage level volume mount). For this, you will need to [configure Docker-in-Docker](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#configuring-docker-in-docker-dind-for-your-pipeline) as a background step. STO will identify and scan the container image matching the step configuration inside the Docker-in-Docker background within that stage.

* **Local OCI/Docker archive in this Stage** Scan an OCI or Docker archive created and stored within the current stage. STO will scan the archive based on the path configured in the workspace field during the step. Ensure that the path to which the archive is saved is a shared volume mount.