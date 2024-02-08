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
| AWS S3 Cache | Cache files and directories to S3 storage to preserve them between builds (You can also use the built-in [Save and Restore Cache from S3 steps](../caching-ci-data/saving-cache.md).) | [drone-s3-cache](https://github.com/drone-plugins/drone-s3-cache) | plugins/s3-cache |
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
| Datadog | Send events and metrics to Datadog | [drone-datadog](https://github.com/masci/drone-datadog) | masci/drone-datadog |
| DCO | Enforce Developer Certificate of Origin | [drone-plugin-dco](https://git.madhouse-project.org/algernon/drone-plugin-dco) | algernon/drone-plugin-dco |
| Deta | Deploy your build to [deta.sh](https://deta.sh) | [drone-deta](https://github.com/lizheming/drone-deta) | lizheming/drone-deta |
| Diagnostics | Use CLI network tools (`dig`, `pin`, `traceroute`) to diagnose issues in a build (This plugin doesn't accept any properties.) | [drone-diagnostics](https://github.com/drone-plugins/drone-diagnostics) | plugins/drone-diagnostics |
| DingTalk | Send a message through DingTalk group robot | [drone-dingtalk-message](https://github.com/lddsb/drone-dingtalk-message) | lddsb/drone-dingtalk-message |
| Discord | Post build status messages to a Discord channel | [drone-discord](https://github.com/appleboy/drone-discord) | appleboy/drone-discord |
| Docker | [Build and push images to Docker registries](../build-and-upload-artifacts/build-and-push/build-and-push-to-docker-registry.md) | [drone-docker](https://github.com/drone-plugins/drone-docker) | plugins/docker |
| Doumark | Automatically sync [Douban](https://douban.com) movie/book/music marked data | [drone-doumark](https://github.com/lizheming/drone-doumark) | lizheming/drone-doumark |
| Download | Download archives required for your builds, and integrate a secure way to inject basic authentication credentials checked by md5 or sha256 checksums (For example usage go to [Use Drone plugins](../use-drone-plugins/run-a-drone-plugin-in-ci.md).) | [drone-download](https://github.com/drone-plugins/drone-download) | plugins/download |
| Downstream Build | Trigger builds for a list of downstream repositories | [drone-downstream](https://github.com/drone-plugins/drone-downstream) | plugins/downstream |
| Dron8s | Use dynamic Server Side Apply to achieve `kubectl apply -f multi-configs.yaml` parity for CI/CD pipelines | [drone8s](https://github.com/bh90210/dron8s) | bh90210/dron8s |
| Email | [Send emails from CI pipelines, such as artifact attachments or build results](../build-and-upload-artifacts/drone-email-plugin.md) | [drone-email](https://github.com/drillster/drone-email) | drillster/drone-email |
| Facebook | Post build status messages to a Facebook account | [drone-facebook](https://github.com/appleboy/drone-facebook) | appleboy/drone-facebook |
| Fandogh | Deliver Docker images to Fandogh PaaS | [fandogh-drone](https://github.com/amirbagh75/fandogh-drone) | amirbagh75/fandogh-drone |
| Fossa | Run the `analyze` command per the generic CI documentation for FOSSA | [drone-plugin-fossa](https://github.com/rancherlabs/drone-plugin-fossa) | rancher/drone-fossa |
| FTP(S) | Publish artifacts over FTP(S) | [drone-ftps](https://github.com/christophschlosser/drone-ftps) | cschlosser/drone-ftps |
| Google Artifact Registry | [Build and push to GAR](../build-and-upload-artifacts/build-and-push/build-and-push-to-gar.md) | [drone-docker](https://github.com/drone-plugins/drone-docker) | plugins/gar |
| Google Chat | Post build status messages to your organization's Google Chat | [drone-google-chat](https://github.com/josmo/drone-google-chat) | pelotech/drone-google-chat |
| Google Cloud Functions | Deploy, list, and delete Google Cloud Functions | [drone-gcf](https://github.com/oliver006/drone-gcf) | oliver006/drone-gcf |
| Google Cloud Storage | [Upload artifacts to GCS](../build-and-upload-artifacts/upload-artifacts/upload-artifacts-to-gcs-step-settings.md) | [drone-plugins/drone-gcs](https://github.com/drone-plugins/drone-gcs) or [wyattjoh/drone-gcs](https://github.com/wyattjoh/drone-gcs) | plugins/gcs or wyattjoh/drone-gcs |
| Google Cloud Storage Cache | Preserve files and directories between builds (You can also use the built-in [Save and Restore Cache from GCS steps](../caching-ci-data/save-cache-in-gcs.md).) | [drone-gcs-cache](https://github.com/hvalle/drone-gcs-cache) | homerovalle/drone-gcs-cache |
| Google Cloud Auth | Create and configure a Google Cloud auth configuration file to use with gcloud CLI (Only GAR is supported. The plugin also configures Docker configuration (`~/.docker/config.json`) to push and pull container images from GAR.) | [drone-google-cloud-auth](https://github.com/kameshsampath/drone-google-cloud-auth) | kameshsampath/drone-gcloud-auth |
| Google Cloud Run | Build and maintain managed Google Cloud Run services | [drone-gcloud-run](https://github.com/kameshsampath/drone-gcloud-run) | kameshsampath/drone-gcloud-run |
| Google Container Registry | [Build and push to GCR](../build-and-upload-artifacts/build-and-push/build-and-push-to-gcr.md) | [drone-docker](https://github.com/drone-plugins/drone-docker) | plugins/gcr |
| Git | [Clone a git repository](../codebase-configuration/clone-and-process-multiple-codebases-in-the-same-pipeline.md) (This plugin is the basis for the image used to clone a pipeline's [default codebase](../codebase-configuration/create-and-configure-a-codebase.md)) | [drone-git](https://github.com/drone/drone-git) | drone/drone-git |
| Gitea Comment | Update the build status on a Gitea Pull Request | [gitea-comment](https://github.com/DefinitelyADev/gitea-comment) | tsakidev/giteacomment |
| Gitea Release | Publish files and artifacts to Gitea Release | [drone-gitea-release](https://github.com/drone-plugins/drone-gitea-release) | plugins/gitea-release |
| Gitee Pulls | Update comments, labels, and tests in Gitee PRs | [drone-plugin-gitee-pulls](https://github.com/kit101/drone-plugin-gitee-pulls) | kit101z/drone-plugin-gitee-pulls |
| GitHub Actions | [Run a GitHub Action](./run-a-git-hub-action-in-cie.md) | [github-actions](https://github.com/drone-plugins/github-actions) | plugins/github-actions |
| GitHub Changelog Generator | Create a changelog file based on GitHub tags that you can then upload to a desired location via other plugins or pipeline steps | [drone-github-changelog-generator](https://plugins.drone.io/plugins/github-changelog-generator) | naorlivne/drone-github-changelog-generator |
| Github Comment | Update the build status on a GitHub Pull Request (This can be an alternative or addition to [Harness CI's built-in SCM status updates](../codebase-configuration/scm-status-checks.md).) | [drone-github-comment](https://github.com/gradeup/drone-github-comment) | codehimanshu/gitdrone |
| GitHub Pages | Publish static websites to GitHub | [drone-gh-pages](https://github.com/drone-plugins/drone-gh-pages) | plugins/gh-pages |
| GitHub Release | Publish files and artifacts to GitHub Release | [drone-github-release](https://github.com/drone-plugins/drone-github-release) | plugins/github-release |
| GitHub Search Downstream | Trigger builds for a list of downstream repositories fetched from a Github repository search | [drone-github-search-downstream](https://github.com/gboddin/drone-github-search-downstream) | gboo/github-search-downstream |
| GitLab-CI | Trigger GitLab CI jobs | [drone-gitlab-ci](https://github.com/appleboy/drone-gitlab-ci) | appleboy/drone-gitlab-ci |
| Gitleaks | Detect hard-coded secrets and sensitive data in your source code files | [drone-gitleaks](https://github.com/drone/drone-gitleaks) | plugins/gitleaks |
| Git Push | Deploy an application via `git push` (You must supply a private SSH key or use the same credentials as the cloned repo to being able to push changes.) | [drone-git-push](https://github.com/appleboy/drone-git-push) | appleboy/drone-git-push |
| GPG Sign | Sign your artifacts and build results with [GnuPG](https://www.gnupg.org/) | [drone-gpgsign](https://github.com/drone-plugins/drone-gpgsign) | plugins/gpgsign |
| Grafana Annotation | Create an annotation in [Grafana](https://grafana.com) | [drone-grafana-annotation](https://github.com/fdeschenes/drone-grafana-annotation) | fdeschenes/drone-grafana-annotation |
| GTalk | Post build status messages to your Google account | [drone-gtalk](https://github.com/appleboy/drone-gtalk) | appleboy/drone-gtalk |
| Helm | Run Kubernetes Helm | [drone-helm](https://github.com/ipedrazas/drone-helm) | ipedrazas/drone-helm |
| Helm3 | Interface with Helm3 | [drone-helm3](https://github.com/pelotech/drone-helm3) | pelotech/drone-helm3 |
| Heroku | Build and push images to Heroku container registry | [drone-docker](https://github.com/drone-plugins/drone-docker) | plugins/heroku |
| Hugo | Generate static web page files that you can then publish | [drone-hugo](https://github.com/drone-plugins/drone-hugo) | plugins/hugo |
| InstantAccess(即时达) | Post build status messages to an InstantAccess account | [drone-instant-access](https://github.com/erguotou520/drone-instant-access) | erguotou/drone-instant-access |
| IRC | Send notifications to an IRC channel | [drone-irc](https://github.com/drone-plugins/drone-irc) | plugins/irc |
| Java Maven | Build Java applications using the Apache Maven build tool | [drone-java-maven-plugin](https://github.com/kameshsampath/drone-java-maven-plugin) | kameshsampath/drone-java-maven-plugin |
| Jenkins | Trigger Jenkins jobs | [drone-jenkins](https://github.com/appleboy/drone-jenkins) | appleboy/drone-jenkins |
| Jira | [Integrate with Jira](./ci-jira-int-plugin.md) | [drone-jira](https://github.com/drone/drone-jira) | plugins/jira |
| Kaniko (Docker, ACR, ECR, GCR) | [Build and push images to container registries](../build-and-upload-artifacts/build-and-upload-an-artifact.md) | [drone-kaniko](https://github.com/drone/drone-kaniko) | plugins/kaniko, plugins/kaniko-acr, plugins/kaniko-ecr, plugins/kaniko-gcr |
| Kubernetes Deployments (drone-kube) | Does the equivalent of `kubectl apply -f deployment.yaml` | [drone-kube](https://github.com/vallard/drone-kube) | vallard/drone-kube |
| Kubernetes Deployments (drone-kubernetes) | Upgrade a Kubernetes deployment with a newer version of an image | [drone-kubernetes](https://plugins.drone.io/plugins/kubernetes) | [honestbee/drone-kubernetes](http://quay.io/honestbee/drone-kubernetes) |
| Kubernetes Deployments (drone-plugin-kube) | Update Kubernetes deployments from templates and configMaps from files | [drone-plugin-kube](https://github.com/danielgormly/drone-plugin-kube) | danielgormly/drone-plugin-kube |
| Kubernetes Resources and Configmaps | Create and update all Kubernetes resources and creating/updating configmaps from config files | [drone-k8s-plugin](https://github.com/zc2638/drone-k8s-plugin) | zc2638/drone-k8s-plugin |
| Kubevious | Detect and prevent errors (typos, misconfigurations, conflicts, inconsistencies) and violations of best practices for Kubernetes applications and clusters | [cli](https://github.com/kubevious/cli) | kubevious/cli |
| Line | Post build status messages to a Line channel | [drone-line](https://github.com/appleboy/drone-line) | appleboy/drone-line |
| Load and Store | Build and push images to a Docker registry (This is useful when you can't use the [built-in Build and Push to Docker step](../build-and-upload-artifacts/build-and-push/build-and-push-to-docker-registry.md), such as when building Docker images with nix, which produces a Docker image archive) | [drone-load-and-store](https://github.com/allgreed/drone-load-and-store) | allgreed/drone-load-and-store |
| Manifest | Push manifest for [multi-architecture Docker images](../build-and-upload-artifacts/build-multi-arch.md) | [drone-manifest](https://github.com/drone-plugins/drone-manifest) | plugins/manifest |
| Marathon | Deploy apps to a Marathon server | [drone-marathon](https://github.com/expansioncap/drone-marathon) | e20co/drone-marathon |
| Matrix | Send build success/failure messages to a Matrix room | [drone-matrix](https://github.com/drone-plugins/drone-matrix) | plugins/matrix |
| Maven Auth | Generate `settings.xml` with server authentication for a Maven repository | [drone-mvn-auth](https://github.com/robertstettner/drone-mvn-auth) | robertstettner/drone-mvn-auth |
| Mercurial | Clone a Mercurial repository | [drone-hg](https://github.com/drone-plugins/drone-hg) | plugins/hg |
| Metronome | Deploy apps to a Metronome server | [drone-metronome](https://plugins.drone.io/plugins/metronome) | naorlivne/drone-metronome |
| Netlify | Deploy your build to Netlify | [drone-netlify](https://github.com/lucaperret/drone-netlify) | https://github.com/lucaperret/drone-netlify |
| Newrelic Deployment | Report/log deployments to a Newrelic dashboard | [newrelic-deployment](https://github.com/cityfurniture/newrelic-deployment) | cityfurniture/drone-newrelic-deployment |
| Nomad | Deploy services from a Nomad template file | [drone-nomad](https://github.com/loq9/drone-nomad) | loq9/drone-nomad |
| Now | Deploy your build to `now.sh` | [drone-now](https://github.com/lucaperret/drone-now) | lucap/drone-now |
| NPM | Publish libraries to publish or private registries | [drone-npm](https://github.com/drone-plugins/drone-npm) | plugins/npm |
| NPM Auth | Generate a `.npmrc` file locally to authenticate against any public/private NPM repository | [drone-npm-auth](https://github.com/robertstettner/drone-npm-auth) | robertstettner/drone-npm-auth |
| OpenFaaS | Build and deploy functions to the OpenFaaS Gateway | [drone-openfaas](https://github.com/knovus/drone-openfaas) | knovus/drone-openfaas |
| Packer | Build automated machine images with Packer | [drone-packer](https://github.com/appleboy/drone-packer) | appleboy/drone-packer |
| PyPI | Publish Python pypi packages | [drone-pypi](https://github.com/drone-plugins/drone-pypi) | plugins/pypi |
| Rancher | Deploy a Docker image to a Rancher environment | [drone-rancher](https://github.com/josmo/drone-rancher) | pelotech/drone-rancher |
| Rancher Stack v1 | Deploy/update an entire Rancher stack (instead of a single service) to Rancher v1.6 | [drone-rancher-stack-v1](https://github.com/wayneconnolly/drone-rancher-stack-v1) | dubc/drone-rancher-stack-v1 |
| Rocket.Chat | Send messages to a Rocket.Chat channel | [drone-rocket](https://github.com/mike1pol/drone-rocket) | mike1pol/drone-rocket |
| Rsync | Transfer files to remote machines and then run a user-defined script | [drone-rsync](https://github.com/drillster/drone-rsync) | drillster/drone-rsync |
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

### Other integrations

There are plugins available to integrate with a myriad of third party tools. For some highlights, browse the list of [Harness-supported plugins](#harness-supported-plugins).
