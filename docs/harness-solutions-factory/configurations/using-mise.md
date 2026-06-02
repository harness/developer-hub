---
title: Local Development Using mise
description: This document details how to use Mise
sidebar_position: 20
---

# Local Development Using mise

This document explains what mise is, how it is used in the HSF repository,
and how to get it configured in your local development environment.

## What is mise?

[mise](https://mise.jdx.dev/) (pronounced "meez", short for _mise en place_)
is a polyglot runtime and tool version manager. It manages the versions of
tools like Terraform, OpenTofu, and other CLI utilities your project depends
on — and ensures everyone on your team is running the exact same versions,
regardless of what is installed on their local machine.

Think of it as a single tool that replaces `tfenv`, `tfswitch`, `asdf`, and
similar per-tool version managers. Instead of managing versions separately for
each tool, mise reads a single `.mise.toml` configuration file at the root of
the repository and installs and activates the correct version of each tool
automatically when you enter the directory.

**Why HSF uses mise:**

- Ensures consistent tool versions across local development, CI, and
  contributor environments without manual version pinning.
- Reduces "works on my machine" issues caused by mismatched Terraform or
  OpenTofu versions.
- One install, one config file — no need to manage separate version managers
  per tool.

## Prerequisites

Before setting up mise, confirm you have the following:

- A Unix-based environment (macOS or Linux). Windows users should use
  WSL2 or the DevContainer setup described in
  [Developer Environment Setup](./developer-env-setup).
- `git` installed and the repository cloned locally.
- A terminal with shell support for `bash`, `zsh`, or `fish`.

## Get started:

1. [Install mise](https://mise.jdx.dev/getting-started.html) and activate
   it in your shell.
2. From the root of the repository, run:

```bash
   mise install
```

   mise reads the `.mise.toml` file at the root of the repository and
   installs all required tool versions automatically.

3. Verify the correct versions are active:

```bash
   mise current
```

:::note
If mise does not activate automatically when you enter the repository
directory, run `mise trust` at the root of the repository to allow
auto-activation.
:::