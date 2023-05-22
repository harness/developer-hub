---
title: Run delegate profiles without root access
description: This topic describes how to run delegate profiles without root access.
sidebar_position: 2
---

Internal policies and security requirements may prevent you from running the Harness Delegate with root user privileges. You can install Harness Delegate without root user privileges and run delegate profiles.

:::info note
With this option, you can run delegate profiles, but you cannot run commands that require root user privileges.
:::

## Install AWS or Terraform CLIs on non-root delegates

You can install AWS or Terraform CLIs on delegates without root user privileges.

To install the Terraform or AWS CLI, do the following:

1. Install the CLI using curl to a folder in the Home Directory.
2. Move the executable to the bin folder in the Home Directory.
3. In the delegate YAML, update the `image` to `harness/delegate:non-root`.

   ```yaml
   containers:
      - image: harness/delegate:non-root
        imagePullPolicy: Always
        name: harness-delegate-instance
   ```
4. Add the bin directory to the path.

   ```
   export PATH="$HOME/bin:$PATH"
   ```
