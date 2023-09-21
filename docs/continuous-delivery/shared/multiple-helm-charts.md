:::note

Currently, using multiple Helm Charts in a single Harness service is behind the feature flag `CDS_HELM_MULTIPLE_MANIFEST_SUPPORT_NG`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

For [Kubernetes Helm](/docs/continuous-delivery/deploy-srv-diff-platforms/helm/helm-cd-quickstart) and [Native Helm](/docs/continuous-delivery/deploy-srv-diff-platforms/native-helm-quickstart) deployment types, you can add multiple Helm charts to a Harness service.

![picture 0](static/048f14a5e9803bcf519ecaa9f7c3aa83a7d81cf5468b6c4db2d51b3d22b5fc3e.png)  

When you run a Harness pipeline that deploys the service, you can select one of the Helm charts to deploy.

![picture 1](static/b2e97e57801c4ece48c40bed8eb8465a6fb8de1dc58e09cd7fa144ba603cd3b8.png)  

By using multiple Helm charts, you can deploy the same artifact with different manifests at pipeline runtime.


### Video summary of using multiple manifests

<!-- Video:
https://www.loom.com/share/6647b697e3e7447a9626f38a64b98cb9?sid=e39261e6-a678-404a-af59-6d6b3fc5a7cb-->
<docvideo src="https://www.loom.com/share/6647b697e3e7447a9626f38a64b98cb9?sid=e39261e6-a678-404a-af59-6d6b3fc5a7cb" />

### Helm chart expressions

import HelmManifestExpressions from '/docs/continuous-delivery/shared/helm-manifest-expressions.md';

<HelmManifestExpressions name="helmexpressions" />