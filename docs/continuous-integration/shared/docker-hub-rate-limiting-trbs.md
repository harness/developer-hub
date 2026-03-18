By default, Harness uses anonymous Docker access to [pull Harness images](/docs/continuous-integration/use-ci/set-up-build-infrastructure/harness-ci.md). If you experience rate limiting issues when pulling images, try one of these solutions:

* Use credentialed access, rather than anonymous access, to pull Harness CI images.
* Configure the default Docker connector to pull images from GAR or ECR instead of Docker Hub.
* Pull Harness images from your own private registry.

For instructions on each of these options, go to [Connect to the Harness container image registry](/docs/platform/connectors/artifact-repositories/connect-to-harness-container-image-registry-using-docker-connector.md).

:::note

Only the images listed in the [Harness CI images list](/docs/continuous-integration/use-ci/set-up-build-infrastructure/harness-ci.md#harness-ci-images-list) are supported across Docker Hub, GAR, ECR, and EU-GAR. If an image you need is unavailable on your expected registry, contact [Harness Support](https://support.harness.io/).

:::