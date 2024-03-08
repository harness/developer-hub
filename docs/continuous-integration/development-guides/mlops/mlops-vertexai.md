---
title: Google Vertex AI
description: Use Google Vertex AI with Harness
sidebar_position: 13
---

You can use Google Vertex AI in your MLOps workflow. For more information about Vertex AI, go to the Google documentation:

* [Introduction to Vertex AI](https://cloud.google.com/vertex-ai/docs/start/introduction-unified-platform)
* [MLOps on Vertex AI](https://cloud.google.com/vertex-ai/docs/start/introduction-mlops)

## Use Vertex AI with Harness

Training can be done in Harness or using native integrations with popular data science platforms, such as Vertex AI.

### Vertex AI plugin

You can use the Vertex AI plugin in a [Plugin step](/docs/continuous-integration/use-ci/use-drone-plugins/run-a-drone-plugin-in-ci) in a CI pipeline.

This plugin executes a Vertex notebook and stores the output in GCloud storage.

```yaml
              - step:
                  type: Plugin
                  name: vertex
                  identifier: vertex
                  spec:
                    connectorRef: account.harnessImage
                    image: harnesscommunity/gcloud-vertex
                    settings:
                      allowlist: sample_notebook.ipynb
                      project_id: some-gcloud-project
                      GCLOUD_SOURCE_BUCKET: some-gcloud-buket
                      GCLOUD_OUTPUT_BUCKET: some-gcloud-bucket/nbr/output
                      SERVICE_ACCOUNT_KEY: <+secrets.getValue("google_sa_key")>
                      DISPLAY_NAME: vertex-test
                    imagePullPolicy: Always
```

### Vertex AI plugin settings

*  `type: Plugin`
*  `name:` Specify a step name.
*  `identifier:` Specify a unique step ID.
*  `connectorRef:` Specify a [Docker connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference).
*  `image: harnesscommunity/gcloud-vertex`
*  `settings:` Configure the plugin parameters.
   * `allowlist`
   * `project_id`
   * `GCLOUD_SOURCE_BUCKET`
   * `GCLOUD_OUTPUT_BUCKET`
   * `SERVICE_ACCOUNT_KEY`
   * `DISPLAY_NAME`

:::tip

You can use expressions for plugin settings. For example, `<+stage.variables.projectId>` references a [stage variable](/docs/platform/pipelines/add-a-stage#stage-variables). You can also create [text secrets](/docs/platform/secrets/add-use-text-secrets) for sensitive information, such as passwords, and then use expressions to reference those secrets.

:::