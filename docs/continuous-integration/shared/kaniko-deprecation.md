⚠️ **Note on Kaniko Usage**

Kaniko is an open-source project developed by Google and is no longer actively maintained ([see notice](https://github.com/GoogleContainerTools/kaniko)).

The **Build and Push** step in Harness CI supports both **Buildx** and **Kaniko** as build engines.

Harness recommends using **Buildx** as the default engine. Buildx provides better performance, active community support, and advanced features such as efficient caching.

To use Buildx by default on Kubernetes builds in the **Build and Push** step, the `CI_USE_BUILDX_ON_K8` feature flag must be enabled. Contact [Harness Support](https://support.harness.io/) to enable this flag.