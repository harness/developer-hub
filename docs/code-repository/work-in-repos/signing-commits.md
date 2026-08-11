---
title: Sign commits
sidebar_label: Sign Commits
description: Use GPG or SSH keys to sign commits and verify authorship in Harness Code Repository.
keywords:
  - commit signing
  - GPG
  - SSH
  - signature verification
  - verified commits
tags:
  - code-repository
  - work-in-repos
  - security
sidebar_position: 35
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Commit signing lets you cryptographically prove that you created a commit and that no one has tampered with it. When you sign a commit, Git attaches a digital signature using your private key, and anyone with your public key can verify that the commit is authentic.

Harness Code Repository supports commit signature verification for both GPG and SSH keys. After you add your public key to your Harness user profile, Harness Code verifies signatures on the commits you push and displays the verification status in the commit listing.

---

## What you will learn

- **Commit signing:** What commit signing is and why it matters for verifying authorship.
- **Git configuration:** How to configure Git to sign commits with a GPG or an SSH key.
- **Verification status:** How to read the verification badges on the Commits page.
- **Troubleshooting:** How to resolve unverified and revoked signatures.

---

## Before you begin

- **Repository access:** You need push access to a Harness Code repository.
- **Key pair:** You need a GPG or SSH key pair generated on your local machine. Go to [Manage public keys](/docs/platform/authentication/manage-public-keys) to generate one.
- **Public key uploaded:** Your public key must be present on your Harness user profile. Go to [Manage public keys](/docs/platform/authentication/manage-public-keys) to add it.

---

## Configure commit signing

Configure Git to sign your commits with either a GPG key or an SSH key. Use GPG if you already have a GPG key pair or prefer GPG for cryptographic signing. Use SSH if you already use SSH keys for authentication and want a setup without a separate GPG tool.

<Tabs>
<TabItem value="gpg" label="GPG Key" default>

#### Step 1: Configure Git to use your GPG key

Find your GPG key ID:

```bash
gpg --list-secret-keys --keyid-format=long
```

In the output, find the `sec` line. The key ID follows the algorithm and key size. For example, in `sec rsa4096/3AA5C34371567BD2`, the key ID is `3AA5C34371567BD2`.

Tell Git to use this key for signing, replacing `3AA5C34371567BD2` with your own key ID:

```bash
git config --global user.signingkey 3AA5C34371567BD2
```

#### Step 2: Enable commit signing

To sign all commits by default:

```bash
git config --global commit.gpgsign true
```

Alternatively, sign individual commits by adding the `-S` flag:

```bash
git commit -S -m "Your commit message"
```

#### Step 3: Push to Harness Code

Push your signed commits to your Harness Code repository as you normally would:

```bash
git push origin main
```

Harness Code verifies the signature against the GPG public keys on your user profile and displays the verification status on the commit listing page.

:::tip

Make sure the email address on your GPG key matches the email address associated with your Harness account. Harness uses the committer email to match the signature to your user profile.

:::

</TabItem>
<TabItem value="ssh" label="SSH Key">

#### Step 1: Configure Git to use SSH for signing

Tell Git to use SSH as the signing format and specify the path to your SSH private key, replacing `~/.ssh/id_ed25519` with your own key path:

```bash
git config --global gpg.format ssh
git config --global user.signingkey ~/.ssh/id_ed25519
```

#### Step 2: Enable commit signing

To sign all commits by default:

```bash
git config --global commit.gpgsign true
```

Alternatively, sign individual commits by adding the `-S` flag:

```bash
git commit -S -m "Your commit message"
```

#### Step 3: Push to Harness Code

Push your signed commits to your Harness Code repository:

```bash
git push origin main
```

Harness Code verifies the signature against the SSH public keys on your user profile and displays the verification status on the commit listing page.

:::tip

SSH commit signing requires Git 2.34.0 or later. Check your version with `git --version` and upgrade if needed.

:::

</TabItem>
</Tabs>

---

## Signature verification statuses

When you view commits on the **Commits** page in Harness Code, each signed commit displays a verification badge. Unsigned commits do not display a badge.

The badge indicates one of the following statuses:

| Badge | Description |
| --- | --- |
| `Verified` | The signature is valid and matches a public key on the committer's Harness user profile. This confirms that the stated author created the commit and that it has not been modified since it was signed. |
| `Unverified` | The commit has a signature, but Harness could not verify it. Typically the public key used to create the signature is not on the committer's Harness user profile, or the email address on the key does not match the committer's Harness account. The commit may be legitimate, but its authorship cannot be confirmed. |
| `Revoked` | The commit was signed with a key that has since been revoked. A revoked key means the key owner or an administrator explicitly invalidated the key, which can indicate that the key was compromised or is no longer trusted. |

<!-- TODO(SME): State whether a branch rule can require Verified signatures before a merge, and if so link the rule from here and from rules.md. Signing is currently documented as advisory only, with no enforcement path. -->

---

## Troubleshooting

<Troubleshoot
  issue="Commits show as Unverified in Harness Code"
  mode="docs"
  fallback={`Verify the following:

1. **Your public key is uploaded.** Go to your User Profile in Harness and confirm that your GPG or SSH public key appears under My Public Keys. If the key is missing, add it to your profile.
2. **Your email addresses match.** The email address on your GPG or SSH key must match the email address on your Harness account. To check the email on your GPG key, run \`gpg --list-keys --keyid-format=long\`. For SSH keys, the email is typically the comment at the end of the public key file.
3. **Git is using the correct key.** Run \`git config --global user.signingkey\` to verify your signing key configuration.
4. **Your commits are actually signed.** Run \`git log --show-signature -1\` to verify locally. If the output does not show a signature, enable signing with \`git config --global commit.gpgsign true\`.`}
/>

<Troubleshoot
  issue="Commits show as Revoked in Harness Code"
  mode="docs"
  fallback={`The key used to sign the commits has been explicitly revoked and is no longer considered trustworthy. You cannot reverse a key revocation.

To resolve this:
1. Generate a new GPG or SSH key pair.
2. Add the new public key to your Harness user profile.
3. Update your Git configuration to use the new key.
4. Future commits signed with the new key display as Verified.

If your GPG key was revoked and you need assistance, contact Harness Support.`}
/>

<Troubleshoot
  issue="GPG asks for a passphrase but no prompt appears"
  mode="docs"
  fallback={`Configure the GPG agent to use a terminal-based prompt by running \`export GPG_TTY=$(tty)\`. Add this line to your shell profile (~/.bashrc, ~/.zshrc, or equivalent) so it persists across sessions.`}
/>

<Troubleshoot
  issue="SSH signing fails with unsupported value or similar error"
  mode="docs"
  fallback={`SSH commit signing requires Git version 2.34.0 or later. Check your Git version with \`git --version\`. If your version is older than 2.34.0, upgrade Git to use SSH signing.`}
/>

---

## Next steps

You can now sign commits and confirm that Harness Code recognizes them as verified.

- [Manage public keys](/docs/platform/authentication/manage-public-keys): Generate and add GPG or SSH keys to your Harness profile.
- [Commits](/docs/code-repository/work-in-repos/commit): Create and inspect commits in Harness Code.
- [Enable security](/docs/code-repository/config-repos/security): Enforce committer email verification alongside signing.
