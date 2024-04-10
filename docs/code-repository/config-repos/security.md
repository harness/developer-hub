---
title: Enable security
description: Set up security in Harness Code
sidebar_position: 40
---

In Harness Code, you can enable security features to protect your code and prevent secrets or vulnerabilites from being introduced into your git repository during a push. Blocking secrets and vulnerabilities from being introduced into your git repository is a critical step in securing your codebase.

## Enable Secret Scanning

In Harness Code, you can prevent hardcoded secrets like passwords, api keys, and tokens from being introduced into your git repository during a push, eliminating the potential to leak valuable IP or compromise security. By scanning every push your secrets are never added to the repository history reducing the chance of a leak and preventing the need to rewrite git history.

You can enable secret scanning for each repository individually. Once enabled any git push that contains a commit containing a recognized pattern for a secret will be denied. Only new coded added in the included commits are scanned; any secrets in existing code will not be detected.

1. Go to the repository where you want to enable secret scanning, and select **Settings**.
2. Select the **Security** tab.
3. Turn on **Secret Scanning**.
4. Click **Save**.

## Enable Vulnerability Scanning

In Harness Code, you can prevent vulnerable code from being introduced into your git repository during a push. Your code is checked against a database of known OSV vulnerabilities and if any are found the push the push can be optionally blocked or a warning can be displayed to the code author.

You can enable vulnerability scanning for each repository individually. Once enabled any git push that contains a commit containing a recognized pattern for a vulnerability will be denied or logged. Due to the nature of vulnerability scanning, some vulnerabilities have a lower severity and you may not wish to block on every vulnerability discovered and simply alert the author. Only new code added in the included commits are scanned; any vulnerabilities in existing code will not be detected.

1. Go to the repository where you want to enable vulnerability scanning, and select **Settings**.
2. Select the **Security** tab.
3. Turn on **Vulnerability Scanning**.
4. Choose whether to **Detect** or **Block** vulnerabilities.
4. Click **Save**.

