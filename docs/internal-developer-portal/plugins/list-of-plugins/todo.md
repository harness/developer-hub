---
title: TODO
description: Browse TODO comments in your project's source code.
---

| Plugin details |                                                                           |
| -------------- | ------------------------------------------------------------------------- |
| **Created by** | Spotify                                                                   |
| **Category**   | Discovery                                                                 |
| **Source**     | [GitHub](https://github.com/backstage/backstage/tree/master/plugins/todo) |
| **Type**       | Open Source plugin                                                        |

## Configuration

### 1. App config YAML

_No action required_

This plugin does not need any app config to be configured.

### 2. Secrets

This plugin does not need any secrets to be configured as it uses the GitHub connector setup in IDP to connect with GitHub.

### 3. Delegate proxy

_No action required_

This plugin does not need a delegate proxy to be setup since GitHub can be accessed publicly on the cloud.

## Layout

This plugin exports a UI Tab which can be added as a new **TODO** tab of a service or any other layout pages. Go to the layout section from **Admin** -> **Layout**, choose **Service** from the dropdown and add the following in the **TODO** section.

```yaml
- name: todo
  path: /todo
  title: TODO
  contents:
    - component: EntityTodoContent
```

## Annotations

If the `catalog-info.yaml` descriptor file for the component is stored in GitHub, the `github.com/project-slug` is automatically added as the `org/repo` where the file is stored. However, this also can be manually configured or overridden.

```yaml
metadata:
  annotations:
    github.com/project-slug: org/repo
```

## Support

The plugin is owned by Spotify and managed in the [Backstage repository](https://github.com/backstage/backstage/tree/master/plugins/todo) as an Open Source project. Create a GitHub issue to report bugs or suggest new features on the plugin.
