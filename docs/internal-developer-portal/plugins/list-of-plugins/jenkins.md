---
title: Jenkins
---

| Plugin details |                                                                              |
| -------------- | ---------------------------------------------------------------------------- |
| **Created by** | [@timja](https://github.com/timja)                                           |
| **Category**   | CI/CD                                                                        |
| **Source**     | [GitHub](https://github.com/backstage/backstage/tree/master/plugins/jenkins) |
| **Type**       | Open Source plugin                                                           |

## Configuration

### 1. App config YAML

_No action required_

This plugin needs a backend config to make calls to your Jenkins instance with authentication. Update the config with your Jenkins URL and a username.

```yaml
jenkins:
  instances:
    - name: default
      baseUrl: "<your-jenkins-url>"
      username: "<your-jenkins-username>"
      apiKey: ${JENKINS_TOKEN}
```

### 2. Secrets

Since `JENKINS_TOKEN` variable is used in the app config, you need to generate a Jenkins API token and set it as a secret value of `JENKINS_TOKEN`.

### 3. Delegate proxy

If your jenkins instance is available on the public internet, this plugin does not need a delegate proxy to work. But if it is hidden behind a network firewall, ensure you have a [Harness delegate](https://developer.harness.io/docs/platform/Delegates/delegate-concepts/delegate-overview) running in your network. You can enter the host name or IP address of your jenkins and choose the delegate which should have access to the jenkins instance. The delegate will then be used as an HTTP proxy between IDP and your Jenkins instance.

## Layout

This plugin exports a UI Tab which can be added as a new "CI/CD" tab of a service or any other layout pages. Go to the layout section from **Admin** -> **Layout**, choose **Service** from the dropdown and add the following in the **CI/CD** section.

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

In order to configure the plugin for a service in the software catalog, the following annotation must be set in its `catalog-info.yaml` definition file.

```yaml
metadata:
  annotations:
  jenkins.io/github-folder: "folder-name/project-name"
```

## Support

The plugin is owned by [@timja](https://github.com/timja) and managed in the [Backstage repository](https://github.com/backstage/backstage/tree/master/plugins/jenkins) as an Open Source project. Create a GitHub issue to report bugs or suggest new features on the plugin.
