---
title: Databricks
description: Use Databricks with Harness.
sidebar_position: 12
---

You can use Databricks in your MLOps workflow. For more information about Databricks, go to the [Databricks MLOps workflows documentation](https://docs.databricks.com/en/machine-learning/mlops/mlops-workflow.html).

## Use Databricks with Harness

Training can be done in Harness or using native integrations with popular data science platforms, such as Databricks.

### Databricks plugin

You can use the Databricks plugin in a [Plugin step](/docs/continuous-integration/use-ci/use-drone-plugins/run-a-drone-plugin-in-ci) in a CI pipeline.


```yaml
              - step:
                  type: Plugin
                  name: databricks
                  identifier: databricks_plugin
                  spec:
                    connectorRef: account.harnessImage
                    image: harnesscommunity/databricks
                    settings:
                      host: https://abc-1234-def.cloud.databricks.com/
                      pat: <+secrets.getValue("databricks_token")>
                      job_name: new job
                      NOTEBOOK_PATH: /Workspace/Shared/sample_notebook
                      TASK_KEY: mydemotask
                      Description: test desc
                      CLUSTER_ID: <+secrets.getValue("databricks_clusterId")>
                    imagePullPolicy: Always
```

### Databricks plugin settings

*  `type: Plugin`
*  `name:` Specify a step name.
*  `identifier:` Specify a unique step ID.
*  `connectorRef:` Specify a [Docker connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference).
*  `image: harnesscommunity/databricks`
*  `settings:` Configure the plugin parameters.
   * `host`
   * `pat`
   * `job_name`
   * `NOTEBOOK_PATH`
   * `TASK_KEY`
   * `Description`
   * `CLUSTER_ID`

:::tip

You can use expressions for plugin settings. For example, `<+stage.variables.trackingUri>` references a [stage variable](/docs/platform/pipelines/add-a-stage#stage-variables). You can also create [text secrets](/docs/platform/secrets/add-use-text-secrets) for sensitive information, such as passwords, and then use expressions to reference those secrets.

:::
