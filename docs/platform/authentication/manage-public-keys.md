---
title: Manage public keys
description: Add and manage GPG and SSH public keys in your Harness user profile.
sidebar_position: 8
---

When you add a GPG or SSH public key to your Harness user profile, Harness uses it to verify that actions like <a href="/docs/code-repository/work-in-repos/signing-commits" target="_blank">signing commits</a> actually come from you. This gives your team confidence that commits are authentic and untampered.

---

## What will you learn in this topic

By the end of this topic, you will be able to:
- Generate a GPG or SSH key pair on your local machine.
- Add a GPG or SSH public key to your Harness user profile.
- Delete a key from your profile when it is no longer needed.

---

## Before you begin

Before you manage public keys, make a note of the following:

- A Harness account.
- GPG command-line tools installed on your machine (for GPG keys).
- An SSH client installed on your machine (for SSH keys).

---

## Generate a new GPG key

Before you can upload a GPG public key to Harness, you need to generate a GPG key pair on your local machine.

### Step 1: Install GPG

Download and install the GPG command-line tools for your operating system:

- **macOS**: `brew install gnupg`
- **Windows**: Download [Gpg4win](https://www.gpg4win.org/).
- **Linux**: GPG is usually pre-installed. If not, use your package manager (for example, `sudo apt install gnupg`).

### Step 2: Generate the key pair

Open a terminal and run:

```bash
gpg --full-generate-key
```

When prompted:

1. **Key type**: Press **Enter** to accept the default (RSA and RSA).
2. **Key size**: Enter `4096` for maximum security.
3. **Expiration**: Press **Enter** for no expiration, or specify an expiration period.
4. **Confirm** your selections.
5. **User ID**: Enter your real name and the email address associated with your Harness account.
6. **Passphrase**: Enter a secure passphrase.

### Step 3: Find your key ID

List your GPG secret keys:

```bash
gpg --list-secret-keys --keyid-format=long
```

In the output, find the `sec` line. The key ID follows the algorithm and key size. For example, in `sec rsa4096/3AA5C34371567BD2`, the key ID is `3AA5C34371567BD2`.

### Step 4: Export the public key

Export your public key in ASCII armor format:

```bash
gpg --armor --export <YOUR_KEY_ID>
```

Copy the entire output, including the `-----BEGIN PGP PUBLIC KEY BLOCK-----` and `-----END PGP PUBLIC KEY BLOCK-----` lines.

---

## Add a GPG public key to Harness

1. In Harness, select your avatar in the bottom-left corner to open your **User Profile**.
2. Under **My Public Keys**, find the **GPG Keys** section.
3. Select **+ GPG Key**.
4. In the **Add new GPG key** dialog, fill in:
   - **Name** (required): A descriptive name for the key.
   - **Id**: An identifier for the key (auto-generated from the name, editable).
   - **Description** (optional): A note about the key's purpose.
   - **Tags** (optional): Key-value pairs for organization.
   - **Public Key** (required): Paste the full PGP public key block you exported earlier.
5. Select **Save**.

Harness confirms the key and adds it to your GPG Keys list, showing the key name and fingerprint.

---

## Delete a GPG key

1. Navigate to the GPG key in your user profile.
2. Select the three-dot menu (&vellip;) on the key card.
3. Select **Delete**.
4. Confirm the deletion in the dialog.

---

## Generate a new SSH key

Before you can upload an SSH public key to Harness, generate an SSH key pair on your local machine.

### Step 1: Generate the key pair

Open a terminal and run:

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

Replace `your_email@example.com` with the email address associated with your Harness account.

:::info note

If your system does not support Ed25519, use RSA instead:

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

:::

When prompted:

1. **File location**: Press **Enter** to accept the default (`~/.ssh/id_ed25519`).
2. **Passphrase**: Enter a secure passphrase (recommended) or press **Enter** for no passphrase.

### Step 2: Start the SSH agent

```bash
eval "$(ssh-agent -s)"
```

### Step 3: Add the key to the SSH agent

**macOS:**

First, add the following to your `~/.ssh/config` file (create it if it does not exist):

```
Host *
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_ed25519
```

Then add the key:

```bash
ssh-add --apple-use-keychain ~/.ssh/id_ed25519
```

**Linux:**

```bash
ssh-add ~/.ssh/id_ed25519
```

**Windows (Git Bash):**

```bash
ssh-add ~/.ssh/id_ed25519
```

### Step 4: Copy the public key

**macOS:**

```bash
pbcopy < ~/.ssh/id_ed25519.pub
```

**Linux:**

```bash
xclip -selection clipboard < ~/.ssh/id_ed25519.pub
```

**Windows (Git Bash):**

```bash
clip < ~/.ssh/id_ed25519.pub
```

Alternatively, open the file and copy its contents manually:

```bash
cat ~/.ssh/id_ed25519.pub
```

---

## Add an SSH public key to Harness

Once you have your public key copied, add it to your Harness profile so Harness can verify your identity.

1. In Harness, select your avatar in the bottom-left corner to open your **User Profile**.
2. Under **My Public Keys**, find the **SSH Keys** section.
3. Select **+ SSH Key**.
4. In the **New SSH Key** dialog, fill in:
   - **Name** (required): A descriptive name for the key.
   - **Id**: An identifier for the key (auto-generated from the name, editable).
   - **Description** (optional): A note about the key's purpose.
   - **Tags** (optional): Key-value pairs for organization.
   - **Public Key** (required): Paste the SSH public key you copied earlier.
5. Select **Save**.

Harness confirms the key was created and adds it to your SSH Keys list with its fingerprint.

---

## Delete an SSH key

1. Navigate to the SSH key in your user profile.
2. Select the three-dot menu (&vellip;) on the key card.
3. Select **Delete**.
4. Confirm the deletion in the dialog.

---

## Next steps

<a href="/docs/code-repository/work-in-repos/signing-commits" target="_blank">Sign commits</a> in Harness Code Repository using your GPG or SSH keys.
