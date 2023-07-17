---
title: Jenkins
description: View CI/CD executions running within your Jenkins instance.
---

| Plugin details |                                                                              |
| -------------- | ---------------------------------------------------------------------------- |
| **Created by** | [@timja](https://github.com/timja)                                           |
| **Category**   | CI/CD                                                                        |
| **Source**     | [GitHub](https://github.com/backstage/backstage/tree/master/plugins/jenkins) |
| **Type**       | Open-source plugin                                                           |

## Configuration

### Application configuration YAML

This plugin requires a backend configuration to make calls to your Jenkins instance with authentication. Update the following configuration with your Jenkins URL and a user name:

```yaml
jenkins:
  instances:
    - name: default
      baseUrl: "<your-jenkins-url>"
      username: "<your-jenkins-username>"
      apiKey: ${JENKINS_TOKEN}
```

### Secrets

Since the `JENKINS_TOKEN` variable is used in the application configuration, you must generate a Jenkins API token and set it as the value of `JENKINS_TOKEN`.

### Delegate proxy

If your Jenkins instance is available on the public internet, this plugin does not require a delegate proxy to work. However, if the Jenkins instance is behind a network firewall, ensure that you have a [Harness Delegate](https://developer.harness.io/docs/platform/Delegates/delegate-concepts/delegate-overview) running in your network. You can enter the host name or IP address of your Jenkins instance and select the delegate that should have access to the Jenkins instance. The delegate serves as an HTTP proxy for communications between IDP and your Jenkins instance.

## Layout

This plugin exports a UI tab that you can use as a new CI/CD tab for a service or for any other layout page. Go to **Admin** > **Layout**, select **Service** in the dropdown menu, and then add the following YAML code in the **CI/CD** section:

```yaml
- name: ci-cd
  path: /ci-cd
  title: CI/CD
  contents:
    - component: EntitySwitch
      specs:
        cases:
          - if: isJenkinsAvailable
            content:
              component: EntityJenkinsContent
          - content:
              component: EmptyState
              specs:
                props:
                  title: No CI/CD available for this entity
                  missing: info
                  description: You need to add an annotation to your component if you want to enable CI/CD for it. You can read more about annotations in Backstage by clicking the button below.
```

The `isJenkinsAvailable` condition is met when the `jenkins.io/github-folder` annotation is present in the software components's `catalog-info.yaml` definition file.

## Annotations

To configure the plugin for a service in the software catalog, set the following annotation in its `catalog-info.yaml` definition file:

```yaml
metadata:
  annotations:
  jenkins.io/github-folder: "folder-name/project-name"
```

## Support

The plugin is owned by [@timja](https://github.com/timja) and managed in the [Backstage repository](https://github.com/backstage/backstage/tree/master/plugins/jenkins) as an open-source project. Create a GitHub issue to report bugs or suggest new features for the plugin.
