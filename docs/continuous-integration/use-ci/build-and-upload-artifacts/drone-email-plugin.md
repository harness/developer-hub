---
title: Export artifacts by email
description: Use the Drone Email plugin to export reports and other artifacts by email.
sidebar_position: 32
redirect_from:
  - /docs/continuous-integration/use-ci/use-drone-plugins/drone-email-plugin
---

You can use the [Drone Email plugin](https://plugins.drone.io/plugins/email) to export reports, data, and other artifacts by email.

## Use the Email plugin

1. [Add an SMTP configuration in Harness](/docs/platform/notifications/add-smtp-configuration). **Username** and **Password** are not required.
2. Make sure your pipeline produces the artifact that you wan to include in the email, such as a `.txt`, `.html`, or `.csv` file. For example:

   ```yaml
                 - step:
                     type: Run
                     name: Run_1
                     identifier: Run_1
                     spec:
                       connectorRef: rutvijdocker
                       image: alpine
                       shell: Sh
                       command: |-
                         touch test.html

                         echo "My Test HTML" > test.html

                         cat test.html
   ```

3. Use the Email plugin in a [Plugin step](../use-drone-plugins/plugin-step-settings-reference.md), for example:

   ```yaml
                 - step:
                     type: Plugin
                     name: Plugin_1
                     identifier: Plugin_1
                     spec:
                       connectorRef: YOUR_DOCKER_CONNECTOR_ID
                       image: plugins/email ## This is the email plugin image.
                       settings:
                         from: sender@mysite.com ## The email address to send the notification from. Can be the same as the From Address in your Harness SMTP configuration.
                         recipients: test@mysite.com ## List of recipients to send the email to (besides the commit author).
                         host: smtp.somesmtpserver.com ## SMTP server address from your Harness SMTP configuration.
                         port: "25" ## SMTP server port from your Harness SMTP configuration.
                         skip_verify: "true" ## Set to 'true' to skip cert verification.
                         subject: somesubject ## Subject line.
                         body: file:///harness/test.html ## The email body. This can be an inline template or a URL. `file:///` is allowed.
   ```

For information about Email plugin settings, go to the [Drone Email plugin documentation](https://plugins.drone.io/plugins/email).

For information about the Plugin step settings, go to the [Plugin step settings documentation](../use-drone-plugins/plugin-step-settings-reference.md).

## Send with username and password authentication

You don't need to provide the SMPT `username` and `password`, but you can include these parameters if you want or need to. For information about Email plugin settings, including the `username` and `password`, go to the [Drone Email plugin documentation](https://plugins.drone.io/plugins/email).

## Send data in the body

You can send the data either in the body of the email or as an attachment.

Here's an example of a Plugin step where the data is in the email body.

```yaml
              - step:
                  type: Plugin
                  name: Plugin_1
                  identifier: Plugin_1
                  spec:
                    connectorRef: account.harnessImage
                    image: drillster/drone-email
                    settings:
                      from: sender@mysite.com
                      recipients: test@mysite.com
                      host: smtp.somesmtpserver.com
                      port: "25"
                      skip_verify: "true"
                      subject: somesubject
                      body: file:///harness/test.html
```

## Send data as an attachment

You can send the data either in the body of the email or as an attachment.

Here's an example of a Plugin step where the data is sent as an attachment.

```yaml
              - step:
                  type: Plugin
                  name: Plugin_1
                  identifier: Plugin_1
                  spec:
                    connectorRef: account.harnessImage
                    image: drillster/drone-email
                    settings:
                      from: sender@mysite.com
                      recipients: test@mysite.com
                      host: smtp.somesmtpserver.com
                      port: "25"
                      skip_verify: "true"
                      subject: somesubject
                      body: somebody
                      attachment: /harness/test.html
```
