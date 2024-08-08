Harness CI supports a variety of platforms, repos, registries, and related technologies. The following sections list entities or providers with first-class support in Harness CI. Additional entities or providers may be supported through unofficial plugins or scripting.

### Source Code Management (SCM)

In addition to [built-in codebase cloning](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase) and support for Git functionality like [Git LFS](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase), [subdirectory cloning](/docs/continuous-integration/use-ci/codebase-configuration/clone-subdirectory), and [PR status checks](/docs/continuous-integration/use-ci/codebase-configuration/scm-status-checks), Harness CI supports these SCM providers:

* [AWS CodeCommit](/docs/platform/connectors/code-repositories/connect-to-code-repo)
* [Azure Repos](/docs/platform/connectors/code-repositories/connect-to-a-azure-repo)
* [Bitbucket](/docs/platform/connectors/code-repositories/ref-source-repo-provider/bitbucket-connector-settings-reference)
* [GitHub](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-hub-connector-settings-reference)
* [GitLab](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-lab-connector-settings-reference)
* [Harness Code Repository](/docs/code-repository)
* Other Git providers through the [provider-agnostic Git connector](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-connector-settings-reference)

### Build infrastructure

Harness CI offers [Harness-managed and self-managed build infrastructure options](/docs/continuous-integration/use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me.md) for a variety of operating systems and architectures, including:

* Harness CI Cloud (built in, Harness-managed, Linux/Windows/macOS)
* Local runners (Linux/Windows/macOS)
* [Kubernetes clusters](/docs/category/set-up-kubernetes-cluster-build-infrastructures):
   * Amazon Elastic Kubernetes Service (Amazon EKS)
   * Google Kubernetes Engine (GKE)
   * Red Hat OpenShift 4
   * Other, platform agnostic
* [Self-managed VMs](/docs/category/set-up-vm-build-infrastructures):
   * Microsoft Azure (Linux/Windows)
   * GCP (Linux/Windows)
   * AWS EC2 (Linux/Windows)
   * AWS EC2 (macOS) - **Harness recommends Harness CI Cloud for macOS builds due to licensing requirements and the complexity of managing macOS VMs with Anka virtualization.**

### Container registries

* Azure Container Registry (ACR)
* Amazon Elastic Container Registry (ECR)
* Google Artifact Registry (GAR)
* Google Container Registry (GCR) (pending deprecation)
* Docker-compliant registries, such as Docker Hub, GitHub Container Registry (GHCR), and JFrog Docker registries
* Other

For more information, go to [Build and push artifacts and images](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-upload-an-artifact).

### Artifact repositories

* JFrog Artifactory
* AWS S3
* GCP GCS
* Sonatype Nexus
* Other

For more information, go to [Build and push artifacts and images](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-upload-an-artifact).

### Dependencies and caching

Harness CI supports running dependent services, such as Docker-in-Docker, LocalStack, and PostgreSQL, in [Background steps](/docs/continuous-integration/use-ci/manage-dependencies/dependency-mgmt-strategies).

Harness offers several [caching options](/docs/category/share-and-cache-ci-data), including:

* Harness Cache Intelligence
* AWS S3
* GCP GCS
* Azure storage

### Testing frameworks

Harness CI supports popular testing frameworks, including:

* Bazel
* CTest
* Cucumber
* DOTNET CLI
* Go
* Gradle
* JUnit
* Maven
* Minitest
* Mocha
* NUnit
* PHPUnit
* Pytest
* RSpec
* Sbt
* Unittest
* Other

In addition to supporting various test types and tools, Harness CI also supports time saving and quality control functionality like test selection, code coverage, and test splitting. For more information, go to [Run tests in CI pipelines](/docs/continuous-integration/use-ci/run-tests/run-tests-in-ci).
