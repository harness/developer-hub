---
title: Hide log information based on regex patterns
sidebar_label: Hide log information using regexes
description: This topic describes how to sensitive log information based on regex patterns.
sidebar_position: 9
---

Harness sanitizes deployment logs and any script outputs to mask text secret values and JSON web tokens (JWTs) by default. For more information, go to [Secrets and log sanitization](/docs/platform/secrets/secrets-management/secrets-and-log-sanitization). You can mask other sensitive information from log streams using regular expressions based on your needs. This will remove the information you define from logs in the Harness UI.

:::info

Harness Delegate version 24.01.82110 or later is required to use this feature.

:::

To hide log information based on regex, do the following:

1. Create a `sanitize-patterns.txt` file in your local that contains all of the regexes that you want to hide in logs.

   This file can contain multiple regexes. Add each regex on a new line. In the example below, we have added two expressions.

   ```
   <CreditCard>.*?</CreditCard>
   <accountID>.*?</accountID>
   ```

2. Create the ConfigMap in the same namespace where you are installing the delegate.

   ```
   kubectl create configmap <CONFIGMAP_NAME> --from-file sanitize-patterns.txt -n <NAMESPACE>
   ```

3. Mount the volume under the `/opt/harness-delegate` path in your delegate YAML file.

   ```yaml
               volumeMounts:
              - name: "config"
                mountPath: "/opt/harness-delegate/sanitize-patterns.txt"
                subPath: sanitize-patterns.txt
          volumes:
            - name: "config"
              configMap:
                name: "<YOUR_CONFIGMAP_FILE_NAME>"
   ```

4. Apply the Kubernetes YAML.
