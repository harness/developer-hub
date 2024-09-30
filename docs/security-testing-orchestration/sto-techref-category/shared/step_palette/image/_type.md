The registry type where the image is stored: 

* **Docker v2** A registry that uses the Docker Registry v2 API such as [Docker Hub](https://docs.docker.com/registry/spec/api/), [Google Container Registry](https://cloud.google.com/container-registry), or [Google Artifact Registry](https://cloud.google.com/artifact-registry).

* **[AWS ECR](https://aws.amazon.com/ecr/)** 

* **[Jfrog Artifactory](https://jfrog.com/artifactory/)** 

* **Local Image in this Stage** Scan a local image built and stored within the context of the current stage (via `/var/run/docker.sock` registered as a stage level volume mount). For this, you will need to [configure Docker-in-Docker](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#configuring-docker-in-docker-dind-for-your-pipeline) as a background step.

* **Local OCI/Docker archive in this Stage** Scan an OCI or Docker archive that has been created and stored within the current stage. The path to the archive can be specified via the workspace field, and ensure that the path to which the archive is saved is a shared volume mount.