For [Kubernetes Helm](/docs/continuous-delivery/deploy-srv-diff-platforms/helm/deploy-helm-charts) and [Native Helm](/docs/continuous-delivery/deploy-srv-diff-platforms/native-helm-quickstart) deployments, you can use the following built-in expressions in your pipeline stage steps to reference chart details.

|                     Expression                      |                                                      Description                                                      |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `<+manifests.MANIFEST_ID.helm.name>`                | Helm chart name.                                                                                                      |
| `<+manifests.MANIFEST_ID.helm.description>`         | Helm chart description.                                                                                               |
| `<+manifests.MANIFEST_ID.helm.version>`             | Helm Chart version.                                                                                                   |
| `<+manifests.MANIFEST_ID.helm.apiVersion>`          | Chart.yaml API version.                                                                                               |
| `<+manifests.MANIFEST_ID.helm.appVersion>`          | The app version.                                                                                                      |
| `<+manifests.MANIFEST_ID.helm.kubeVersion>`         | Kubernetes version constraint.                                                                                        |
| `<+manifests.MANIFEST_ID.helm.metadata.url>`        | Helm Chart repository URL.                                                                                            |
| `<+manifests.MANIFEST_ID.helm.metadata.basePath>`   | Helm Chart base path, available only for OCI, GCS, and S3.                                                            |
| `<+manifests.MANIFEST_ID.helm.metadata.bucketName>` | Helm Chart bucket name, available only for GCS and S3.                                                                |
| `<+manifests.MANIFEST_ID.helm.metadata.commitId>`   | Store commit Id, available only when manifest is stored in a Git repo and Harness is configured to use latest commit. |
| `<+manifests.MANIFEST_ID.helm.metadata.branch>`     | Store branch name, available only when manifest is stored in a Git repo and Harness is configured to use a branch.    |


The `MANIFEST_ID` is located in `service.serviceDefinition.spec.manifests.manifest.identifier` in the Harness service YAML. In the following example, it is `nginx`:

```yaml
service:
  name: Helm Chart
  identifier: Helm_Chart
  tags: {}
  serviceDefinition:
    spec:
      manifests:
        - manifest:
            identifier: nginx
            type: HelmChart
            spec:
              store:
                type: Http
                spec:
                  connectorRef: Bitnami
              chartName: nginx
              helmVersion: V3
              skipResourceVersioning: false
              commandFlags:
                - commandType: Template
                  flag: mychart -x templates/deployment.yaml
    type: Kubernetes

```

