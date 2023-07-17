---
title: TODO
description: Browse TODO comments in your project's source code.
---

| Plugin details |                                                                           |
| -------------- | ------------------------------------------------------------------------- |
| **Created by** | Spotify                                                                   |
| **Category**   | Discovery                                                                 |
| **Source**     | [GitHub](https://github.com/backstage/backstage/tree/master/plugins/todo) |
| **Type**       | Open-source plugin                                                        |

## Configuration

### Application configuration YAML

_No action required_

This plugin does not require any application configuration.

### Secrets

This plugin does not require you to configure secrets because it uses the GitHub connector setup in IDP to connect with GitHub.

### Delegate proxy

_No action required_

This plugin does not require a delegate proxy to be set up because GitHub is publicly accessible.

## Layout

This plugin exports a UI tab that you can use as a new **TODO** tab for a service or for any other layout page. Go to **Admin** > **Layout**, select **Service** in the dropdown menu, and then add the following in the **TODO** section:

```yaml
- name: todo
  path: /todo
  title: TODO
  contents:
    - component: EntityTodoContent
```

## Annotations

If the `catalog-info.yaml` descriptor file for the component is stored in GitHub, the `github.com/project-slug` is automatically added as the `org/repo` where the file is stored. However, you can manually configure or override this setting:

```yaml
metadata:
  annotations:
    github.com/project-slug: org/repo
```

## Support

The plugin is owned by Spotify and managed in the [Backstage repository](https://github.com/backstage/backstage/tree/master/plugins/todo) as an open-source project. Create a GitHub issue to report bugs or suggest new features for the plugin.
