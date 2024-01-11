---
title: Use GCP secrets in scripts
description: Use base64 encoding and decoding to avoid errors with GCP secrets in Run steps.
sidebar_position: 30
---

This page explains how to handle JSON-formatted GCP credentials in scripts, such as in Run steps or Background steps. The information on this page **doesn't** apply to `.json` credentials supplied to [Harness GCP connectors](/docs/platform/connectors/cloud-providers/ref-cloud-providers/gcs-connector-settings-reference).

[Harness secrets](/docs/category/secrets) with new line characters or other shell-interpreted special characters can cause errors in scripts you run in Harness pipelines. For example, attempting to parse a standard JSON-formatted GCP secret can cause errors such as `Could not read json file secret.json: Invalid control character at: line #, column #`.

To avoid these errors, you need to:

1. [Create a base64-encoded secret file](https://www.base64encode.org/) from your JSON-formatted GCP secret.
2. Save the base64-encoded file as a [Harness file secret](/docs/platform/secrets/add-file-secrets).
3. In your pipeline, in the step where you need to use the GCP secret, decode the file secret and write it to a `.json` file. For example, this command decodes a Harness file secret named `my_secret` and writes it to `/harness/secrets.json`.

   ```
   echo <+secrets.getValue("my_secret")> | base64 -d > /harness/secrets.json
   ```

   If your secret contains line breaks, you can `cat` the secret in a special-purpose code block, for example:

   ```
   cat > /harness/secrets.json << 'EOF'
   MySecret:<+secrets.getValue("my_secret")>
   EOF
   ```

   Decoded secrets in `cat` aren't [masked in outputs](/docs/platform/secrets/add-file-secrets/#secrets-in-outputs), because Harness no longer recognizes the contents as a secret.

4. Use the `.json` file as needed for GCP authentication in your `gcloud` commands, such as:

   ```
   gcloud auth activate-service-account YOUR_SERVICE_ACCOUNT --key-file=/harness/secrets.json
   ```
