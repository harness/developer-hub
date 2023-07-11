---
title: TODO
description: Browse TODO comments in your project's source code.
---

| Plugin details |                                                                                 |
| -------------- | ------------------------------------------------------------------------------- |
| **Created by** | Spotify                                                                         |
| **Category**   | Monitoring                                                                      |
| **Source**     | [GitHub](https://github.com/backstage/backstage/tree/master/plugins/kubernetes) |
| **Type**       | Open Source plugin                                                              |

## Configuration

### 1. App config YAML

The plugin supports two types of app-config.

1. Authentication using a Kubernetes service account. (default)

```yaml
kubernetes:
  serviceLocatorMethod:
    type: "multiTenant"
  clusterLocatorMethods:
    - type: "config"
      clusters:
        - url: "<your-base-url>"
          name: "<your-cluster-name>"
          authProvider: "serviceAccount"
          skipTLSVerify: true
          skipMetricsLookup: false
          serviceAccountToken: ${K8S_SA_TOKEN}
```

2. Authentication using Google Cloud Platform (GCP) credentials.

```yaml
kubernetes:
  serviceLocatorMethod:
    type: "multiTenant"
  clusterLocatorMethods:
    - type: "config"
      clusters:
        - url: "<your-base-url>"
          name: "<your-cluster-name>"
          authProvider: "google"
          skipTLSVerify: true
          skipMetricsLookup: false
```

In both cases, replace `<your-base-url>` with the base URL of the target cluster. Replace `<your-cluster-name>` with a name that identifies the target cluster.

### 2. Secrets

In case of authentication using a service account, ensure that a secret variable `K8S_SA_TOKEN` is set with the Kubernetes service account key.

If case of authentication using Google Cloud Platform (GCP) credentials, there is no need to add a variable. Instead, you should configure the [Google OAuth provider](../oauth-support-for-plugins.md) on the **OAuth Configurations** page. Then the plugin will use the logged-in user's credentials to make the authenticated requests.

### 3. Delegate proxy

If the target cluster is located behind a private network, please ensure that you include the host of the cluster's base URL in this section. If the cluster is not behind a private network, you can skip this section entirely.

After adding the host, you can choose one or more delegates that have access to the host. If you leave the delegate selectors field empty, it will be assumed that any delegate in the account will have access to the host/cluster.
Note: When adding the host, please include only the hostname. Remove the protocol (HTTP/HTTPS) and any port number associated with it.

![](./static/plugin-delegate-proxy.png)

## Layout

This plugin exports a UI Tab which can be added as a new **Kubernetes** tab of a service or any other layout pages. Go to the layout section from **Admin** -> **Layout**, choose **Service** from the dropdown and add the following in a new **Kubernetes** section.

```yaml
- name: kubernetes
  path: /kubernetes
  title: Kubernetes
  contents:
    - component: EntityKubernetesContent
```

## Annotations

There are several annotations supported by the Kubernetes plugin, which can be used in your service's `catalog-info.yaml` descriptor file to link to a Kubernetes entity. Refer to the [plugin docs](https://backstage.io/docs/features/kubernetes/configuration#surfacing-your-kubernetes-components-as-part-of-an-entity) for the details.

## Support

The plugin is owned by Spotify and managed in the [Backstage repository](https://github.com/backstage/backstage/tree/master/plugins/kubernetes) as an Open Source project. Create a GitHub issue to report bugs or suggest new features on the plugin.
