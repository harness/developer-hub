---
title: Add a new software component to the catalog
description: Learn how you can add a new software component to the IDP software catalog.
sidebar_position: 30
helpdocs_topic_id:
helpdocs_category_id:
helpdocs_is_private: false
helpdocs_is_published: true
---

You can register any new software component with the software catalog by creating a `catalog-info.yaml` file in your Git repository and then registering its URL.

## Create a new `catalog-info.yaml`

1. If you want to register an existing software component, navigate to its repository. If it is a mono-repo, navigate to its directory and create a `catalog-info.yaml` at the root of the directory. The file can technically live anywhere (for example, `.harness/catalog-info.yaml`). You can use the following YAML code:

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: my-new-service
  description: Description of my new service
  annotations:
    pagerduty.com/integration-key: <sample-service-integration-key>
  tags:
    - java
  links:
    - url: https://admin.example-org.com
      title: Admin Dashboard
      icon: dashboard
      type: admin-dashboard
spec:
  type: service
  lifecycle: production
  owner: team-a
  system: project-x
```

Following are the key fields that you must update:

* `metadata.name`. This should be a unique name for your component. Usually, it is the name of the service.
* `metadata.description` - A description for your new component.
* `spec.type` - The new software component could be a `service`, `library`, `website`, or any other type.
* `spec.owner` - The user group identifier of the team that owns the component.

2. Once the file is created in your Git repo, copy the full URL to the file. For example, `https://github.com/harness-community/idp-samples/blob/main/catalog-info.yaml`.

3. In the left navigation, select **Create**, and then select **Register Software Component**.

  ![](static/create-page-sidebar.png)
  ![](static/create-page.png)

4. Enter the URL to your new `catalog-info.yaml`.

  ![](static/url-on-register-page.png)

5. Select **Import**.

  ![](static/finished-state.png)

The new component will be available in your catalog.

  ![](static/imported-entity.png)
