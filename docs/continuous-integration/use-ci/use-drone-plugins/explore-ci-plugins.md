---
title: Explore plugins
description: Learn how, why, and when to use plugins
sidebar_position: 10
---

Plugins perform predefined tasks. They are essentially templated scripts that can be written in any programming language.

You can build your own plugins or use one of the many preexisting plugins from the [Drone Plugins Marketplace](https://plugins.drone.io/), [GitHub Actions Marketplace](https://github.com/marketplace?type=actions), or the [Bitrise Integrations library](https://bitrise.io/integrations/steps).

To include a plugin in a CI pipeline, you use either the generic **Plugin** step or a specialized plugin step.

## Custom plugins

You can [write your own plugins](./custom_plugins.md) and run them in your Harness CI pipelines.

## Drone plugins

You can [use Plugin steps to run Drone plugins](./run-a-drone-plugin-in-ci.md) in Harness CI pipelines.

You can [write your own plugins](#custom-plugins) or use pre-built plugins from the [Drone Plugins Marketplace](https://plugins.drone.io/), the [Drone Plugins GitHub org](https://github.com/drone-plugins), and the [Harness Community GitHub org](https://github.com/harness-community).

### Harness-supported plugins

Harness-supported plugins include official Drone plugins, plugins used to drive built-in Harness CI steps, and other notable plugins developed by the Harness and Drone communities. Plugins used to drive built-in Harness CI steps can also be used on their own in **Plugin** steps.

Harness officially supports the following plugins.

| Plugin | Use | Source | Image |
| ------ | --- | ------ | ----- |
| Airbrake Deployment | Notify Airbrake when a deployment is finished | [drone-airbrake-deployment](https://github.com/dhoeric/drone-airbrake-deployment) | dhoeric/drone-airbrake-deployment |
| Ansible | Run Ansible plays | [drone-ansible](https://github.com/drone-plugins/drone-ansible) | plugins/ansible  |
| Anynines | Deploy your app to the Anynines platform | [drone-anynines](https://github.com/drone-plugins/drone-anynines) | plugins/anynines |
| Apex Up | Use the apex/up tool to deploy infinitely scalable serverless apps, APIs, and sites to AWS | [drone-apex-up](https://github.com/appleboy/drone-apex-up) | appleboy/drone-apex-up |
| Artifact Metadata Publisher | [Publish any URL to the Artifacts tab](../build-and-upload-artifacts/artifacts-tab.md) | [artifact-metadata-publisher](https://github.com/drone-plugins/artifact-metadata-publisher) | plugins/artifact-metadata-publisher |
| Artifactory | [Upload artifacts to JFrog Artifactory](../build-and-upload-artifacts/upload-artifacts/upload-artifacts-to-jfrog.md) | [drone-artifactory](https://github.com/athieriot/drone-artifactory) | athieriot/drone-artifactory |
| AWS CloudFormation | Validate templates or create/update/delete stacks | [drone-cloudformation](https://github.com/robertstettner/drone-cloudformation) | robertstettner/drone-cloudformation |
| AWS ECR | [Build and push images to ECR](../build-and-upload-artifacts/build-and-push/build-and-push-to-ecr-step-settings.md) | [drone-docker](https://github.com/drone-plugins/drone-docker) | plugins/ecr |
| AWS ECS | Deploy a Docker images to an ECS environment | [drone-ecs](https://github.com/josmo/drone-ecs) | pelotech/drone-ecs |
| AWS ECS Deploy | Update an ECS service (The plugin is a wrapper for `ecs-deploy`. It takes the current task definition of a service and changes the image. All configuration stays the same.) | [drone-ecs-deploy](https://github.com/joshdvir/drone-ecs-deploy) | joshdvir/drone-ecs-deploy |
| AWS Elastic Beanstalk | Deploy an app to a Beanstalk environment | [drone-elastic-beanstalk](https://github.com/josmo/drone-elastic-beanstalk) | pelotech/drone-elastic-beanstalk |
| AWS Lambda | Deploy a serverless function to AWS Lambda from a zip file located in an S3 bucket (This plugin doesn't create or upload the zip file.) | [drone-lambda-plugin](https://github.com/omerxx/drone-lambda-plugin) | omerxx/drone-lambda-plugin |
| AWS RDS Snapper | Clean up a specific RDS instance's snapshots, keep a specified number of copies, and create new snapshots | [rds-snapper](https://github.com/honestbee/devops-tools/tree/master/rds-snapper) | [honestbee/rds-snapper](http://quay.io/honestbee/rds-snapper) |
| AWS S3 | [Upload artifacts to S3 or S3-compatible buckets](../build-and-upload-artifacts/upload-artifacts/upload-artifacts-to-s3.md) | [drone-s3](https://github.com/drone-plugins/drone-s3) | plugins/s3 |
| AWS S3 Cache | Cache files and directories to S3 storage to preserve them between builds | [drone-s3-cache](https://github.com/drone-plugins/drone-s3-cache) | plugins/s3-cache |
| AWS S3 Sync | Synchronize files and build artifacts to your S3 bucket | [drone-s3-sync](https://github.com/drone-plugins/drone-s3-sync) | plugins/s3-sync |
| AWS S3 Upload and Publish | [Upload artifacts to S3 and publish the artifact URL on the Artifacts tab](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts-to-s-3-step-settings#use-the-s3-upload-and-publish-plugin) | [drone-s3-upload-publish](https://github.com/harness-community/drone-s3-upload-publish) | harnesscommunity/drone-s3-upload-publish |
| Azure Container Registry | [Build and push images to ACR](../build-and-upload-artifacts/build-and-push/build-and-push-to-acr.md) | [drone-docker](https://github.com/drone-plugins/drone-docker) | plugins/acr |
| Backblaze B2 | Upload files and build artifacts to a B2 bucket | [drone-b2](https://github.com/techknowlogick/drone-b2) | techknowlogick/drone-b2 |
| Bluemix Cloud Foundry | Deploy files or services to Bluemix | [drone-bluemix-cloudfoundry](https://github.com/ibmclouddevops/drone-bluemix-cloudfoundry) | ibmclouddevops/drone-bluemix-cloudfoundry |
| Buildah | Build and push Docker images to a container registry (Primarily used to [build and push with non-root users](../build-and-upload-artifacts/build-and-push-nonroot.md).) | [drone-buildah](https://github.com/drone-plugins/drone-buildah) | plugins/buildah-acr, plugins/buildah-docker, plugins/buildah-ecr, plugins/buildah-gcr |
| Cache | [Cache current workspace files between builds to reduce build times](/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages/#use-caching-to-reduce-build-time) | [drone-meltwater-cache](https://github.com/drone-plugins/drone-meltwater-cache) | plugins/cache |
| Capistrano | Deploy apps via the Capistrano Ruby Gem | [drone-capistrano](https://github.com/glaszig/drone-capistrano) | glaszig/drone-capistrano |
| Captains Log | Organize release information in Slack | [captains-log](https://github.com/target/captains-log) | target/captains-log |
| Chef Supermarket | Publish Chef Cookbooks to Supermarket (internal or public) | [drone-chef-supermarket](https://github.com/jmccann/drone-chef-supermarket) | jmccann/drone-chef-supermarket |
| CircleCI | Trigger CircleCI builds automatically | [drone-circleci](https://github.com/wesleimp/drone-circleci) | wesleimp/drone-circleci |
| Clair | Submit a Docker image to your Clair server to scan the image for security vulnerabilities | [drone-clair](https://github.com/jmccann/drone-clair) | jmccann/drone-clair |
| Cloudflare Caching | Use Cloudflare's API to purge cache | [drone-cloudflare-caching](https://github.com/jetrails/drone-cloudflare-caching) | jetrails/drone-cloudflare-caching |
| Cloudflare DNS | Use Cloudflare's API to create/update/delete DNS records | [drone-cloudflare-dns](https://github.com/jetrails/drone-cloudflare-dns) | jetrails/drone-cloudflare-dns |
| Cloud Foundry | Deploy files or services to Cloud Foundry | [drone-cloudfoundry](https://github.com/Comcast/drone-cloudfoundry) | cheslip/drone-cloudfoundry |
| Codacy | [Upload code coverage reports to Codacy](../run-tests/code-coverage.md#codacy) | [drone-codacy](https://github.com/drone-plugins/drone-codacy) | plugins/codacy |
| Codecov | [Upload test coverage results to Codecov](../run-tests/code-coverage.md#codecov) | [drone-codecov](https://github.com/robertstettner/drone-codecov) | robertstettner/drone-codecov |
| Coveralls | [Upload coverage reports to Coveralls](../run-tests/code-coverage.md#coveralls) | [drone-coveralls](https://github.com/lizheming/drone-coveralls) | lizheming/drone-coveralls |
| Crowdin | Submit translation files to Crowdin | [drone-crowdin](https://github.com/JonasFranzDEV/drone-crowdin) | jonasfranz/crowdin |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
| GitHub Actions | [Run a GitHub Action](./run-a-git-hub-action-in-cie.md) | [github-actions](https://github.com/drone-plugins/github-actions) | plugins/github-actions |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

Useful and popular plugins include:

* **Artifact Metadata Publisher:** The [Artifact Metadata Publisher plugin](/tutorials/ci-pipelines/publish/artifacts-tab) can publish any artifact URL to the [Artifacts tab](../viewing-builds.md). For example, you can publish links to [test reports](/docs/continuous-integration/use-ci/run-tests/viewing-tests#view-reports-on-the-artifacts-tab), [code coverage reports](/docs/continuous-integration/use-ci/run-tests/code-coverage#view-code-coverage-reports-on-the-artifacts-tab), and [artifacts uploaded to cloud storage](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-upload-an-artifact/#upload-artifacts) to the Artifacts tab.
* **S3 Upload and Publish:** Similar to the Artifacts Metadata Publisher plugin, the [S3 Upload and Publish plugin](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts-to-s-3-step-settings/#use-the-s3-upload-and-publish-plugin) handles both uploading your artifact to S3 and publishing the URL to the Artifacts tab.
* **Email:** Use the [Drone Email plugin](/docs/continuous-integration/use-ci/build-and-upload-artifacts/drone-email-plugin) to export reports, data, and other artifacts by email.
* **Push Helm chart to Docker registry:** Use this plugin to [upload Helm charts to Docker registries](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-helm-chart-to-docker).

<!-- :::tip

Harness CI supports `DRONE_` environment variables. For more information, go to the CI environment variables reference ../optimize-and-more/ci-env-var.md .

:::-->

## Integrations

Through plugins and built-in steps, Harness CI integrates with other tools in your SDLC tool chain.

### Bitrise integrations

How you run [Bitrise integrations](https://bitrise.io/integrations/steps) in Harness CI pipelines depends on your [build infrastructure](../set-up-build-infrastructure/which-build-infrastructure-is-right-for-me.md).

* With Harness Cloud build infrastructure, use the [Bitrise step](./ci-bitrise-plugin.md).
* With other build infrastructures, you can use a [custom plugin](./custom_plugins.md).

### GitHub Actions

How you run [GitHub Actions](https://github.com/marketplace?type=actions) in Harness CI pipelines depends on your [build infrastructure](../set-up-build-infrastructure/which-build-infrastructure-is-right-for-me.md).

* With Harness Cloud build infrastructure, use the [GitHub Action step](./ci-github-action-step.md).
* With other build infrastructures, use the [GitHub Actions Drone plugin in a Plugin step](./run-a-git-hub-action-in-cie.md).

### Jira integrations

If you want your CI pipelines to update Jira issues, you can use a **Plugin** step as explained in [Integrate Jira in a CI pipeline](./ci-jira-int-plugin.md).

### Scanner integrations

The [Harness Security Testing Orchestration module](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference.md#harness-sto-scanner-support) provides first-class support for many security scanners. You can also use the [Drone SonarScanner plugin](https://plugins.drone.io/plugins/sonar-node-plugin) in a [Plugin step](./run-a-drone-plugin-in-ci.md), for example:

```yaml
              - step:
                  type: Plugin
                  name: Plugin_1
                  identifier: Plugin_1
                  spec:
                    connectorRef: YOUR_DOCKER_CONNECTOR_ID
                    image: kytay/sonar-node-plugin ## This is the sonarscanner plugin image.
                    settings:
                      sonar_host:
                        from_secret: sonar_host
                      sonar_token:
                        from_secret: sonar_token
                      use_node_version: 16.18.1
```

For information about SonarScanner plugin settings, go to the [Drone SonarScanner plugin documentation](https://plugins.drone.io/plugins/sonar-node-plugin).

For information about the Plugin step settings, go to the [Plugin step settings documentation](./plugin-step-settings-reference.md).
