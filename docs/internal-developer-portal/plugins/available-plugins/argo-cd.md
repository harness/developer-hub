---
title: Argo CD Plugin
description: View Argo CD status for your projects in Harness IDP.
---

| Plugin details |                                                                                              |
| -------------- | -------------------------------------------------------------------------------------------- |
| **Created by** | [Roadie](https://roadie.io/)                                                                |
| **Category**   | Image                                                                                        |
| **Source**     | [GitHub](https://github.com/RoadieHQ/roadie-backstage-plugins/tree/main/plugins/frontend/backstage-plugin-argo-cd#argo-cd-plugin-for-backstage) |
| **Type**       | Open-source plugin                                                                           |

![](./static/argo-cd-plugin-overview-card.png)

## Configuration

### Application configuration YAML

This plugin requires a backend proxy configuration to make calls to your argo-cd instance with authentication.

- Under the **Plugins** tab in **Admin**, go to `app-config.yaml` and **Edit YAML** to configure your `username` along with the `url` to your argo instance in the format as shown below.

```YAML
# app-config.yaml
argocd:
  username: your-username
  password: ${ARGOCD_PASSWORD}
  appLocatorMethods:
    - type: 'config'
      instances:
        - name: argoInstance1
          url: https://argoInstance1.com
          token: ${ARGOCD_AUTH_TOKEN}
```

### Secrets

- You need to add the `ARGOCD_PASSWORD` and `ARGOCD_AUTH_TOKEN`(Optional) as a Harness Secret. Also, if both are mentioned `ARGOCD_PASSWORD` will take precedence. 

- **Create secret in Harness** to store API token, click on “New Secret Text” and enter values as shown below.

![](./static/hs-og.png)

## Layout

_No action required_

This plugin exports a UI card that you can show on the **Overview** tab of a service or any other layout page. The following configuration is set by default in **Layout** under **Catalog Entities** for **Service** and you do not need to change anything:

```yaml
- component: EntityArgoCDOverviewCard
```

## Annotations

- Details of your argo-cd instance are correlated to IDP entities using an annotation added in the entity's `catalog-info.yaml` file.

```YAML
metadata:
  annotations:
    argocd/app-name: <your-app-name>
```

## Note

When using ArgoCD without SSL, the plugin may fail to retrieve data correctly, even if configured with the HTTPS endpoint. This occurs because when operating over HTTP, ArgoCD will not accept the connection unless the `server.insecure` configuration is set to `true`.

In Kubernetes (K8s) environments where ArgoCD is deployed, the associated ConfigMap may not include this configuration flag by default. The `server.insecure` flag needs to be enabled in the ConfigMap to allow HTTP access. The following Kubernetes commands can be used to enable this configuration:

```bash
kubectl patch configmap argocd-cmd-params-cm -n argocd --type merge -p '{"data":{"server.insecure":"true"}}'
kubectl rollout restart deployment argocd-server -n argocd
```


## Support

The plugin is owned by RedHat and managed in this [repository](https://github.com/RoadieHQ/roadie-backstage-plugins/tree/main/plugins/frontend/backstage-plugin-argo-cd#argo-cd-plugin-for-backstage) as an open-source project. Create a GitHub issue to report bugs or suggest new features for the plugin.
