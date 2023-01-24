---
title: Connect to an Artifact Repo
description: Doc explaining steps to create Artifactory Repository connector.
# sidebar_position: 2
helpdocs_topic_id: xxvnk67c5x
helpdocs_category_id: o1zhrfo8n5
helpdocs_is_private: false
helpdocs_is_published: true
---

You connect Harness to an artifact repo by adding an **Artifact Repositories** Connector.

You can connect to an artifact repo inline when developing your Pipeline, or separately in your Account/Org/Project **Connectors**. Once add the Connector, it'll be available in Pipelines and Connectors of the same Account/Org/Project.

### Before you begin

* [Learn Harness' Key Concepts](https://ngdocs.harness.io/article/hv2758ro4e-learn-harness-key-concepts)

### Review: AWS, Azure, and Google Cloud Storage Artifacts

Connectors for artifacts stored in Google Cloud Storage or Amazon S3 are added as **Cloud Providers** Connectors, not **Artifact Repositories**.

If you are using Google Cloud Storage or Amazon S3, see [Cloud Platform Connectors](https://docs.harness.io/category/cloud-platform-connectors).

For Azure ACR, use the **Docker Registry** Connector, described below.

### Review: Artifact Repository Connectors Scope

You can add an Artifact Repository Connector at the Account/Org/Project scope.

This topic will explain how to add it at the Project scope. The process is same for Org and Account.

Steps on adding the Artifact Repository Connector inline when developing a Pipeline are covered in the relevant How-to and Technical Reference topics. For example, adding a Docker Registry is covered in the [Kubernetes CD Quickstart](https://docs.harness.io/article/knunou9j30-kubernetes-cd-quickstart) and [Docker Connector Settings Reference](ref-cloud-providers/docker-registry-connector-settings-reference.md).

### Step: Add an Artifactory Repository

For details on settings and permissions, see [Artifactory Connector Settings Reference](ref-cloud-providers/artifactory-connector-settings-reference.md).

1. Open a Harness Project.
2. In **Project Setup**, click **Connectors**.
3. Click **New Connector**, and click **Artifactory** in **Artifact Repositories**. The Artifactory Repository settings appear.
4. In **Name**, enter a name for this connector.
5. Click **Continue**.
6. Enter the **Artifactory Repository URL**.
7. In **Authentication**, select one of the following options:
	1. **Username and Password** - Once you choose this option, you need to enter the **Username** and **Password**. For Password you can either create a new Secret or use an existing one.
	2. **Anonymous (no credentials required)**.
8. Click **Continue**.
9. In **Delegates Setup,**use any Delegate or enter [Tags](../2_Delegates/delegate-guide/select-delegates-with-selectors.md) for specific Delegates that you want to allow to connect to his Connector.
10. Click **Save and Continue**.
11. Once the Test Connection succeeds, click **Finish**. The Connector is listed in Connectors.

### Step: Add a Docker Registry

For details on settings and permissions, see [Docker Connector Settings Reference](ref-cloud-providers/docker-registry-connector-settings-reference.md).The Docker Connector is platform-agnostic and can be used to connect to any Docker container registry, but Harness provides first class support for registries in AWS and GCR. See [Add an AWS Connector](add-aws-connector.md), [Google Cloud Platform (GCP) Connector Settings Reference](connect-to-google-cloud-platform-gcp.md).

1. Open a Harness Project.
2. In **Project Setup**, click **Connectors**.
3. Click **New Connector**, and click **Docker Registry** in **Artifact Repositories**. The Docker Registry settings appear.
4. In **Name**, enter a name for this connector.
5. Click **Continue**.
6. Enter the **Docker Registry URL**.
7. Select a **Provider Type**.
8. In **Authentication**, select one of the following options:
	1. **Username and Password** - Once you choose this option, you need to enter the **Username** and **Password**. For Password you can either create a new Secret or use an existing one.
	2. **Anonymous (no credentials required)**.
9. Click **Continue**.
10. In **Delegates Setup**, use any Delegate or enter [Tags](../2_Delegates/delegate-guide/select-delegates-with-selectors.md) for specific Delegates that you want to allow to connect to his Connector.
11. Click **Save and Continue**.
12. Once the Test Connection succeeds, click **Finish**. The Connector is listed in Connectors.

### Step: Add an HTTP Helm Repo

You can add Helm Charts from an HTTP Helm Repo. Once you set up the Connector, you can use it in a Stage to add your Helm Chart.

Since Harness lets you use the `<+artifact.image>` expression in your Helm Chart Values YAML files, Helm Charts are added a Stage Service in **Manifests** and not **Artifacts**. If you use the `<+artifact.image>` expression in your Helm Chart Values YAML files, then Harness will pull the image you add to **Artifacts**. See [Deploy Helm Charts](https://docs.harness.io/article/7owpxsaqar-deploy-helm-charts).

For details on settings and permissions, see [HTTP Helm Repo Connector Settings Reference](ref-source-repo-provider/http-helm-repo-connector-settings-reference.md).

1. Open a Harness Project.
2. In **Project Setup**, click **Connectors**.
3. Click **New Connector**, and click **HTTP Helm** in **Artifact Repositories**. The HTTP Helm Repo settings appear.
4. In **Name**, enter a name for this connector.
5. Click **Continue**.
6. Enter the **Helm Repository URL**.
7. In **Authentication**, select one of the following options:
	1. **Username and Password** - Once you choose this option, you need to enter the **Username** and **Password**. For Password you can either create a new Secret or use an existing one.
	2. **Anonymous (no credentials required)**.
8. Click **Continue**.
9. In **Delegates Setup**, use any Delegate or enter [Tags](../2_Delegates/delegate-guide/select-delegates-with-selectors.md) for specific Delegates that you want to allow to connect to his Connector.
10. Click **Save and Continue**.
11. Once the Test Connection succeeds, click **Finish**. The Connector is listed in Connectors.

### Step: Add a Helm 3 OCI Helm Registry

You can add Helm Charts from an [OCI Helm Registry](https://helm.sh/docs/topics/registries/). Once you set up the Connector, you can use it in a Stage to add your Helm Chart.

Since Harness lets you use the `<+artifact.image>` expression in your Helm Chart Values YAML files, Helm Charts are added a Stage Service in **Manifests** and not **Artifacts**. If you use the `<+artifact.image>` expression in your Helm Chart Values YAML files, then Harness will pull the image you add to **Artifacts**. See [Deploy Helm Charts](https://docs.harness.io/article/7owpxsaqar-deploy-helm-charts).

1. Open a Harness Project.
2. In **Project Setup**, click **Connectors**.
3. Click **New Connector**, and click **OCI Helm Registry** in **Artifact Repositories**. The OCI Helm Registry settings appear.
4. In **Name**, enter a name for this connector.
5. Click **Continue**.
6. Enter the **Helm Repository URL**.  
You don't need to include the `oci://` scheme in **Helm Repository URL**. Harness will preface the domain name you enter with `oci://`.
7. In **Authentication**, in **Username and Password**, enter the **Username** and **Password**. For Password you can either create a new Secret or use an existing one.
8. Click **Continue**.
9. In **Delegates Setup**, use any Delegate or enter [Tags](../2_Delegates/delegate-guide/select-delegates-with-selectors.md) for specific Delegates that you want to allow to connect to his Connector.
10. Click **Save and Continue**.
11. Once the Test Connection succeeds, click **Finish**. The Connector is listed in Connectors.

#### OCI Registry Notes

* Helm supports OCI registries officially for Helm version 3.8 and above. Experimental support is available with versions below 3.8.
* You cannot use OCI Helm Registries with [Helm Chart Triggers](../11_Triggers/trigger-pipelines-on-new-helm-chart.md).
* Harness OCI support is cloud-agnostic. You can use OCI registries in ACR, GCR, and ECR.

#### Google GCR Authentication Supported

For GCR as an OCI registry, Harness support authentication using the following:

* Access token
* A JSON key file where username is `_json_key_base64` and password is base64-encoded JSON key file content.

Harness does not support a username of `_json_key` and password as unencrypted JSON key file content.

#### AWS ECR authentication supported

For **Helm Repository URL**, enter the URL for the repo in the format `https://<aws_account_id>.dkr.ecr.<region>.amazonaws.com`.

For example, something like `https://0838475738302113.dkr.ecr.us-west-2.amazonaws.com`.

For **Username**, enter `AWS`.

For **Password**, create a new Harness text secret.

Use the following command to retrieve the password from AWS ECR:

`aws ecr get-login-password --region <region>`

For example: `aws ecr get-login-password --region us-west-2`

Copy the password and paste it into a Harness text secret.

The AWS ECR authorization token in only valid for 12 hours. [This is an AWS limitation.](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ecr/get-login-password.html#description)For information on ECR authentication, go to [Private registry authentication](https://docs.aws.amazon.com/AmazonECR/latest/userguide/registry_auth.html) from AWS.

### Step: Add a Nexus Repository

For details on settings and permissions, see [Nexus Connector Settings Reference](../8_Pipelines/w_pipeline-steps-reference/nexus-connector-settings-reference.md).1. Open a Harness Project.
2. In **Project Setup**, click **Connectors**.
3. Click **New Connector**, and click **Nexus** in **Artifact Repositories**. The Nexus Repository settings appear.
4. In **Name**, enter a name for this connector.
5. Click **Continue**.
6. Enter the **Nexus Repository URL**.
7. Select a **Version**.
8. In **Authentication**, select one of the following options:
	1. **Username and Password** - Once you choose this option, you need to enter the **Username** and **Password**. For Password you can either create a new Secret or use an existing one.
	2. **Anonymous (no credentials required)**.
9. Click **Continue**.
10. In **Delegates Setup****,**use any Delegate or enter [Tags](../2_Delegates/delegate-guide/select-delegates-with-selectors.md) for specific Delegates that you want to allow to connect to his Connector.
11. Click **Save and Continue**.
12. Once the Test Connection succeeds, click **Finish**. The Connector is listed in Connectors.

### See also

* [Select Delegates with Selectors](../2_Delegates/delegate-guide/select-delegates-with-selectors.md)
* [Add a Secrets Manager](../6_Security/5-add-secrets-manager.md)

