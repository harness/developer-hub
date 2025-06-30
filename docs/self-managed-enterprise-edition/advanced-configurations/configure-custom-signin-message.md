---
title: Configure Customizable Login Message
sidebar_label: Configure Customizable Login Message
tags: ["custom sign in message", "smp", "message on log in"]
keywords: 
- custom sign-in message
date: 2025-07-26T14:00
sidebar_position: 3
---

<!--Pre-requistics-->

:::important
    This feature is available starting from release harness-0.30.0. 
:::

<!--Introduction: what is customizable login message, why it is needed-->

The Custom Login Message feature lets organizations display a mandatory banner or modal on the login screen, ensuring that users see and acknowledge important notices before accessing the platform.

This is not just cosmetic. It's essential for:

* **Regulatory compliance** (e.g. SOC 2, ISO 27001, GDPR) that may require user consent or policy acknowledgment.
* **Legal protection** by showing terms of use, acceptable use policies, or disclaimers before granting access.
* **Security awareness** by reminding users of data handling responsibilities, password policies, or incident reporting procedures.

By enforcing a visible, customizable message at login, organizations strengthen their security posture and reduce legal risk.

<details>
    <summary>Example</summary>
        <p>
            You are accessing a U.S. Government (USG) Information System (IS) that is provided for USG-authorized use only.

            By using this IS (which includes any device attached to this IS), you consent to the following conditions:

            -The USG routinely intercepts and monitors communications on this IS for purposes including, but not limited to, penetration testing, COMSEC monitoring, network operations and defense, personnel misconduct (PM), law enforcement (LE), and counterintelligence (CI) investigations.

            -At any time, the USG may inspect and seize data stored on this IS.

            -Communications using, or data stored on, this IS are not private, are subject to routine monitoring, interception, and search, and may be disclosed or used for any USG-authorized purpose.

            -This IS includes security measures (e.g., authentication and access controls) to protect USG interests--not for your personal benefit or privacy.

            -Notwithstanding the above, using this IS does not constitute consent to PM, LE or CI investigative searching or monitoring of the content of privileged communications, or work product, related to personal representation or services by attorneys, psychotherapists, or clergy, and their assistants. Such communications and work products are private and confidential. See User Agreement for details.
        </p>
</details>




## Who should use this feature?

This feature is especially valuable for:

* **Security teams** enforcing policy awareness
* **Compliance officers** meeting audit or regulatory requirements
* **IT administrators** who want consistent communication of rules across the organization

Any organization handling sensitive data or operating under compliance frameworks will benefit from enabling this feature.

<!--configuration steps: how to enable this sign-in message-->

## Configuration Steps

Follow these steps to enable and configure the Custom Login Message:

1. Write your message in valid HTML format. Make sure the content is properly sanitized to avoid XSS or injection risks.

2. Encode the HTML content to Base64.

    - Use any standard tool or command. For example:

        ```bash
        cat your-message.html | base64
        ```

3. Configure the environment variable.

   Add the Base64-encoded string to your `values.yaml` file in the `ng-auth-ui` service:

   ```yaml
   ng-auth-ui:
     config:
       CUSTOM_EULA_POLICY: "<your-base64-encoded-html>"
   ```

4. Upgrade your Helm chart to apply the changes:

   ```bash
   helm upgrade -i <release-name> <path-to-directory> -n <namespace> -f values.yaml
   ```

    Once you have successfully upgraded your Helm chart, your custom message will appear on the login screen, similar to the example shown below.

    ![custom-message](./static/custom-sign-in-message.png)

<!--Working snapshot-->

