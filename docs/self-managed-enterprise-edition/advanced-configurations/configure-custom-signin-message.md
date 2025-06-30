---
title: Configure Customizable Login Message
sidebar_label: Configure Customizable Login Message
tags: ["custom sign in message", "smp", "message on log in"]
keywords: 
- custom sign-in message
date: 2025-07-26T14:00
sidebar_position: 3
---

<!--Introduction: what is customizable login message, why it is needed-->

The Custom Login Message enables users to display a compliance banner on the login screen. This banner informs users of security policies and responsibilities before accessing the platform, supporting organizational security requirements and regulatory compliance.

By providing a configurable banner, organizations can improve user awareness and strengthen their overall security posture.

<!--Pre-requistics-->

:::note
    This feature is available starting from release harness-0.XX.0. 
:::

<!--configuration steps: how to enable this sign-in message-->

## Configuration Steps

Follow these steps to enable and configure the Custom Login Message:

1. Write your message in valid HTML format, ensure the content is properly sanitized to avoid XSS or other injection risks.

2. Encode the `HTML` content to `Base64`. 

    - Use any standard tool or command. For example:

        ```bash
        cat your-message.html | base64
        ```
    - Copy and save the resulting `Base64` encoded string to the environment variables as shown in next step.

3. Modify your `values.yaml`, locate the `ng-auth-ui` service and set the `CUSTOM_EULA_POLICY` with encoded string as follows:

    ```bash
    ng-auth-ui:
      config:
        CUSTOM_EULA_POLICY: "<your-base64-encoded-html>"
    ```

4. Upgrade your Helm chart to apply the changes. With values.yaml set, simply run the Helm upgrade command.

    ```bash 
    helm upgrade -i <release-name> <path-to-directory> -n <namespace> -f values.yaml
    ```

    Once you have successfully upgraded your Helm chart, your custom message will appear on the login screen, similar to the example shown below.

    ![custom-message](./static/custom-sign-in-message.png)

<!--Working snapshot-->

