---
sidebar_position: 3
---

# Security

## Secret Scanning

In Gitness, you can use the integrated [Gitleaks](https://github.com/gitleaks/gitleaks) tool to block secrets like passwords, API keys, and tokens from being pushed to your Git repositories. Enabling secret scanning for individual repositories ensures that any attempt to push a commit containing a [recognized secret pattern](https://github.com/gitleaks/gitleaks/blob/master/config/gitleaks.toml) is denied. This is essential for maintaining the security of your codebase.

:::caution

Gitness Secret Scanning scans *only new/changed code* in commits that users attempt to push *after* you enable Secret Scanning on a repo. Secrets in existing/unchanged code aren't detected.

:::

To enable Secret Scanning:

1. Go to the repository where you want to enable secret scanning and select **Settings**.
2. Select the **Security** tab.
3. Enable **Secret Scanning**.
4. Select **Save**.
5. Repeat to enable Secret Scanning on additional repos.

### Bypass or ignore detected secrets

:::note

Bypassing/ignoring detected secrets is not recommended unless you are certain the detected secret doesn't represent a potential vulnerability, such as test data containing fake secrets.

:::

If you want to bypass Gitleaks and knowingly commit a recognized secret, you have two options:

* Add `gitleaks:allow` as a comment in your code.
* Create a `.gitleaksignore` file.

For more information, refer to the [Gitleaks README](https://github.com/gitleaks/gitleaks?tab=readme-ov-file#additional-configuration).
