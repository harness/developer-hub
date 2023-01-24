---
title: HTTP Helm Repo Connector Settings Reference
description: This topic provides settings and permissions for the HTTP Helm Repo Connector.
# sidebar_position: 2
helpdocs_topic_id: a0jotsvsi7
helpdocs_category_id: xyexvcc206
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic provides settings and permissions for the HTTP Helm Repo Connector.

You can add a Helm Chart Repository as an Artifact Server and then use it in Harness Kubernetes and Helm deployments. See [Helm CD Quickstart](https://docs.harness.io/article/cifa2yb19a-helm-cd-quickstart).

A Helm chart repository is an HTTP server that houses an **index.yaml** file and, if needed, packaged charts. For details, see [The Chart Repository Guide](https://helm.sh/docs/topics/chart_repository/) from Helm.

For instructions on how to use this Connector to perform specific tasks, see [Helm CD Quickstart](https://docs.harness.io/article/cifa2yb19a-helm-cd-quickstart).


### Limitations

For Helm charts stored in repos such as **Amazon S3** or **GCS** (Google Cloud Storage), you will need a Cloud Provider for that account. For more information, see [Cloud Platform Connectors](https://docs.harness.io/category/cloud-platform-connectors).

### Name

The unique name for this Connector.

### ID

See [Entity Identifier Reference](../../20_References/entity-identifier-reference.md).

### Description

Text string.

### Tags

See [Tags Reference](../../20_References/tags-reference.md).

### Helm Repository URL

The URL of the chart repo.

Helm Hub at `https://hub.helm.sh` is not a Helm repo. It is a website for discovery and documentation. While it does list charts for deployments such cluster-autoscaler, the actual Helm repo for this and most charts is `https://kubernetes-charts.storage.googleapis.com`**.**If you're having trouble connecting, try adding a trailing slash (`/`) to the URL, like `https://nexus3.dev.example.io/repository/test-helm/`.

Some chart servers, like Nexus, require a trailing slash. 

![](./static/http-helm-repo-connector-settings-reference-02.png)
### Username and Password

From Helm:


> Note: For Helm 2.0.0, chart repositories do not have any intrinsic authentication. There is an issue tracking progress in GitHub.


> Because a chart repository can be any HTTP server that can serve YAML and tar files and can answer GET requests, you have a plethora of options when it comes down to hosting your own chart repository. For example, you can use a Google Cloud Storage (GCS) bucket, Amazon S3 bucket, Github Pages, or even create your own web server.

If the charts are backed by HTTP basic authentication, you can also supply the username and password. See [Share your charts with others](https://helm.sh/docs/topics/chart_repository/#share-your-charts-with-others) from Helm.

### See also

* [AWS Connector Settings Reference](../ref-cloud-providers/aws-connector-settings-reference.md)
* [Google Cloud Platform (GCP) Connector Settings Reference](../ref-cloud-providers/gcs-connector-settings-reference.md)

