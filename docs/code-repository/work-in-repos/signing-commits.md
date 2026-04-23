---
title: Sign commits
description: Use GPG or SSH keys to sign commits and verify authorship in Harness Code Repository.
sidebar_position: 35
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Commit signing lets you cryptographically prove that you created a commit and that no one has tampered with it. When you sign a commit, Git attaches a digital signature using your private key. Anyone with your public key can verify that the commit is authentic.

Harness Code Repository supports commit signature verification for both GPG and SSH keys. After you <a href="/docs/platform/authentication/manage-public-keys" target="_blank">add your public key</a> to your Harness user profile, Harness Code automatically verifies signatures on commits you push and displays the verification status in the commit listing.

---

## What will you learn in this topic

By the end of this topic, you will be able to:

- Understand what commit signing is and why it matters for verifying authorship.
- Configure Git to sign commits using a GPG or SSH key.
- Push signed commits to Harness Code and read the verification status badges.
- Troubleshoot common signing issues such as unverified or revoked signatures.

---

## Before you begin

Before you start, make a note of the following:

- A Harness Code Repository with push access.
- A GPG or SSH key pair generated on your local machine. For instructions, go to <a href="/docs/platform/authentication/manage-public-keys" target="_blank">Manage public keys</a>.
- Your public key uploaded to your Harness user profile.

---

## Sign commits with a GPG key

Use this method if you already have a GPG key pair or prefer GPG for cryptographic signing.

### Step 1: Configure Git to use your GPG key

Find your GPG key ID:

```bash
gpg --list-secret-keys --keyid-format=long
```

In the output, find the `sec` line. The key ID follows the algorithm and key size. For example, in `sec rsa4096/3AA5C34371567BD2`, the key ID is `3AA5C34371567BD2`.

Tell Git to use this key for signing:

```bash
git config --global user.signingkey 3AA5C34371567BD2
```

Replace `3AA5C34371567BD2` with your actual key ID.

### Step 2: Enable commit signing

To sign all commits by default:

```bash
git config --global commit.gpgsign true
```

Alternatively, sign individual commits by adding the `-S` flag:

```bash
git commit -S -m "Your commit message"
```

### Step 3: Push to Harness Code

Push your signed commits to your Harness Code repository as you normally would:

```bash
git push origin main
```

Harness Code verifies the signature against the GPG public keys in your user profile and displays the verification status on the commit listing page.

:::tip

Make sure the email address on your GPG key matches the email address associated with your Harness account. Harness uses the committer's email to match the signature to your user profile.

:::

---

## Sign commits with an SSH key

Use this method if you already use SSH keys for authentication and want a setup without a separate GPG tool.

### Step 1: Configure Git to use SSH for signing

Tell Git to use SSH as the signing format and specify the path to your SSH private key:

```bash
git config --global gpg.format ssh
git config --global user.signingkey ~/.ssh/id_ed25519
```

Replace `~/.ssh/id_ed25519` with the path to the SSH private key you want to use for signing.

### Step 2: Enable commit signing

To sign all commits by default:

```bash
git config --global commit.gpgsign true
```

Alternatively, sign individual commits by adding the `-S` flag:

```bash
git commit -S -m "Your commit message"
```

### Step 3: Push to Harness Code

Push your signed commits to your Harness Code repository:

```bash
git push origin main
```

Harness Code verifies the signature against the SSH public keys in your user profile and displays the verification status on the commit listing page.

:::tip

SSH commit signing requires Git 2.34.0 or later. Check your version with `git --version` and upgrade if needed.

:::

---

## Signature verification statuses

When you view commits on the **Commits** page in Harness Code, each signed commit displays a verification badge. Unsigned commits do not display a verification badge.

The verification badge indicates one of the following statuses:


| Badge | Description |
| --- | --- |
| `Verified` | The signature is valid and matches a public key on the committer's Harness user profile. This confirms that the commit was created by the stated author and has not been modified since it was signed. |
| `Unverified` | The commit has a signature, but Harness could not verify it. This typically means the public key used to create the signature has not been added to the committer's Harness user profile, or the email address on the key does not match the committer's Harness account. The commit itself may be legitimate, but its authorship cannot be confirmed. |
| `Revoked` | The commit was signed with a key that has since been revoked. A revoked key means the key owner (or an administrator) has explicitly invalidated the key, which could indicate that the key was compromised or is no longer trusted. |


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
1. Generate a new GPG or SSH key pair (see Manage public keys).
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

- <a href="/docs/platform/authentication/manage-public-keys" target="_blank">Manage public keys</a>: Generate and add GPG or SSH keys to your Harness profile.
- <a href="/docs/code-repository/work-in-repos/commit" target="_blank">Commits</a>: Create and inspect commits in Harness Code.

