---
title: Authenticate Private Ansible Galaxy Content
sidebar_label: Authenticate Private Content
description: Authenticate to private Ansible Galaxy servers, Automation Hub, private Git collection sources, and .netrc credentials during ansible-galaxy installs in Harness IaCM.
keywords:
  - ansible
  - IaCM
  - galaxy
  - private collections
  - automation hub
  - git auth
  - netrc
  - secrets
  - ansible-galaxy
tags:
  - iacm
  - ansible
  - configuration
sidebar_position: 30
redirect_from:
  - /docs/infra-as-code-management/configuration-management/ansible/authenticate-private-collections
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Harness Ansible plugin authenticates to private Ansible content when it runs `ansible-galaxy collection install -r <requirements file>` during the galaxy pre-flight (the dependency installation phase before playbook execution). This page explains the three mechanisms it supports: private Galaxy and Automation Hub servers, private Git collection sources, and `.netrc` credentials.

All three apply at galaxy install time, and none of them require embedding credentials in `requirements.yml`. Tokens and secrets are never written to `requirements.yml`, never printed to logs, and never passed on a command line.

---

## What you will learn

- **Galaxy and Automation Hub servers:** Authenticate to a private Galaxy server or Red Hat Automation Hub using `ANSIBLE_GALAXY_SERVER_*` settings.
- **Private Git collection sources:** Authenticate `git+https://` collection sources using indexed `ANSIBLE_GIT_AUTH_<N>_*` credential triples (a set of three related values: HOST, USERNAME, and TOKEN).
- **`.netrc` credentials:** Provide a provider-agnostic `.netrc` file that git and Python use for HTTPS fetches.
- **Configuration sources and precedence:** Supply settings either as pipeline-level environment variables or as playbook variables, with pipeline env taking precedence per key.

---

## How credentials are supplied

The Galaxy server and Git mechanisms can each be configured from two sources. The `.netrc` mechanism is file-based and is described in its own section.

- **Pipeline-level environment variables:** Set the keys directly on the pipeline or step. Go to [Add and reference text secrets](/docs/platform/secrets/add-use-text-secrets) to manage secrets, and [Manage pipeline variables](/docs/platform/variables-and-expressions/add-a-variable) to configure environment variables.
- **Playbook variables:** Set the same keys as variables on the playbook, with secret values stored as Harness secrets. Go to [Get started with Ansible](/docs/infra-as-code-management/configuration-management/ansible/get-started#add-variables) to add or edit playbook variables.

When the same key is set in both places, the pipeline-level value wins. Resolution is per key, not all-or-nothing, so a username can come from the pipeline while the token for the same entry comes from a playbook secret.

### Playbook variable resolution

When a setting is defined as a playbook variable, the value reaches the plugin in one of two ways depending on its type.

| Playbook variable type | Where the value comes from |
|------------------------|----------------------------|
| `string` (host, URL, username, server list) | The literal value stored on the playbook variable. |
| `secret` (token, password, client secret) | The playbook stores only a reference to a Harness secret. The resolved value is injected at runtime as an environment variable named `ANSIBLE_PLAYBOOK_VAR__<KEY>`. |

Set the relevant key (for example, `ANSIBLE_GALAXY_SERVER_<NAME>_TOKEN` or `ANSIBLE_GIT_AUTH_0_TOKEN`) as a variable in the playbook UI. The `ANSIBLE_PLAYBOOK_VAR__` prefix is added automatically on injection to avoid collisions with pipeline-level variables. The plugin strips the prefix and uses the real key.

---

## Private Galaxy and Automation Hub servers

Use this mechanism when collections are hosted on a private Galaxy server or Red Hat Automation Hub rather than fetched directly from a Git repository.

### How it works

Ansible builds a server list from `ANSIBLE_GALAXY_SERVER_LIST` and reads per-server settings from `ANSIBLE_GALAXY_SERVER_<NAME>_<OPTION>` variables. The `<NAME>` segment is the uppercased server name from the list. Server order matters: the first server in the list is tried first, then Ansible falls through to the next.

You can supply these settings as pipeline-level environment variables (Method A) or as playbook variables (Method B). Go to [How credentials are supplied](#how-credentials-are-supplied) for the source precedence rules. The plugin makes the resolved settings available to `ansible-galaxy` through the environment, so no files are written.

### Variables

The variable names are identical regardless of source. For playbook variables, set these same keys as playbook variables, and store secret-typed keys (`_TOKEN`, `_PASSWORD`, `_CLIENT_SECRET`) as Harness secrets.

| Variable | Required | Description |
|----------|----------|-------------|
| `ANSIBLE_GALAXY_SERVER_LIST` | **Yes** | Comma-separated, ordered list of server names, for example `automation_hub,community`. Order sets lookup priority. |

For each server name `<NAME>` in the list (uppercased), the following per-server options are available.

| Variable | Required | Description |
|----------|----------|-------------|
| `ANSIBLE_GALAXY_SERVER_<NAME>_URL` | **Yes** | The server's API URL. |
| `ANSIBLE_GALAXY_SERVER_<NAME>_TOKEN` | For token auth | API token for the server, for example Automation Hub. |
| `ANSIBLE_GALAXY_SERVER_<NAME>_AUTH_URL` | For SSO or Keycloak | Token exchange (SSO) endpoint. Required for cloud Automation Hub offline tokens. Cloud Automation Hub uses offline tokens. Go to [Get started with Automation Hub](https://access.redhat.com/articles/3626371) (Red Hat docs) to generate an offline token. |
| `ANSIBLE_GALAXY_SERVER_<NAME>_USERNAME` | For basic auth | Username, when using username and password instead of a token. |
| `ANSIBLE_GALAXY_SERVER_<NAME>_PASSWORD` | For basic auth | Password, paired with username. |
| `ANSIBLE_GALAXY_SERVER_<NAME>_API_VERSION` | No | Pin the Galaxy API version when auto-detection is undesirable. |
| `ANSIBLE_GALAXY_SERVER_<NAME>_VALIDATE_CERTS` | No | `true` or `false` to toggle TLS certificate verification. |
| `ANSIBLE_GALAXY_SERVER_<NAME>_CLIENT_ID` | No | OAuth client ID for Keycloak flows. |
| `ANSIBLE_GALAXY_SERVER_<NAME>_CLIENT_SECRET` | No | OAuth client secret for Keycloak flows. |
| `ANSIBLE_GALAXY_SERVER_<NAME>_TIMEOUT` | No | Per-server request timeout in seconds. |

### Configuration examples

<Tabs groupId="config-method">
<TabItem value="pipeline-env" label="Pipeline environment variables" default>

Two servers, a private Automation Hub (token and SSO) followed by public community Galaxy:

```
ANSIBLE_GALAXY_SERVER_LIST=automation_hub,community

ANSIBLE_GALAXY_SERVER_AUTOMATION_HUB_URL=https://hub.example.com/api/galaxy/content/published/
ANSIBLE_GALAXY_SERVER_AUTOMATION_HUB_AUTH_URL=https://sso.example.com/auth/realms/redhat-external/protocol/openid-connect/token
ANSIBLE_GALAXY_SERVER_AUTOMATION_HUB_TOKEN=<api-token>

ANSIBLE_GALAXY_SERVER_COMMUNITY_URL=https://galaxy.ansible.com/
```

A `requirements.yml` then references collections by name as usual:

```yaml
collections:
  - name: my_namespace.my_collection
  - name: community.general
```

</TabItem>
<TabItem value="playbook-vars" label="Playbook variables">

The same server, defined as playbook variables. The list and URL are strings, and the token is a secret referencing a stored Harness secret.

| Playbook variable key | Type | Value |
|-----------------------|------|-------|
| `ANSIBLE_GALAXY_SERVER_LIST` | string | `automation_hub` |
| `ANSIBLE_GALAXY_SERVER_AUTOMATION_HUB_URL` | string | `https://hub.example.com/api/galaxy/content/published/` |
| `ANSIBLE_GALAXY_SERVER_AUTOMATION_HUB_TOKEN` | secret | `account.iacm_hub_token` |

At runtime the plugin reads the string values from the playbook, resolves the secret token from its injected `ANSIBLE_PLAYBOOK_VAR__ANSIBLE_GALAXY_SERVER_AUTOMATION_HUB_TOKEN` value, and makes all three available to `ansible-galaxy`.

</TabItem>
</Tabs>

### Detection output

During the galaxy pre-flight, the plugin prints a Galaxy server detection section so you can confirm which servers were detected from either source. Secret values are never shown, only the server name, URL, and auth presence:

```
▶ Galaxy server detection
✓ ok: detected 2 galaxy server(s)
    - automation_hub (url: https://hub.example.com/api/galaxy/content/published/) auth: token (set)
    - community (url: https://galaxy.ansible.com/) auth: none
```

For username and password servers, the auth line reads `auth: basic (user: <username>)`. When no galaxy servers are configured, the section prints `(no galaxy servers detected)`.

:::info Galaxy server authentication

- **Server name in variable keys:** The `<NAME>` in the variable key is the uppercased server name. A server named `automation_hub` becomes `ANSIBLE_GALAXY_SERVER_AUTOMATION_HUB_*`.
- **Auth by server type:** Public Galaxy needs no auth. Private Automation Hub uses a token. Cloud Automation Hub (console.redhat.com) uses an offline token exchanged at the `AUTH_URL`.
- **Independent from Git auth:** This mechanism is independent of the Git mechanism. A `requirements.yml` can mix named collections, resolved through the server list, and `git+https://` sources, resolved through Git auth.
- **Missing auth errors:** If you attempt to install a private collection without authentication configured, `ansible-galaxy` will fail with an HTTP 401 or 403 error indicating unauthorized access.

:::

---

## Private Git collection sources

Use this mechanism when `requirements.yml` pulls collections directly from a Git repository over HTTPS:

```yaml
collections:
  - name: git+https://github.com/my-org/private-collection.git
    type: git
    version: main

  - name: git+https://git.harness.io/account/org/repo.git
    type: git
    version: main
```

The plugin configures transparent Git URL rewrites before running `ansible-galaxy`. For each configured host, a rewrite injects credentials so that a clone of:

```
https://github.com/my-org/private-collection.git
```

is transparently performed as:

```
https://<username>:<token>@github.com/my-org/private-collection.git
```

No change to `requirements.yml` is needed, and credentials never appear in it.

Credentials are defined as indexed triples (a set of three related values: HOST, USERNAME, and TOKEN). Each Git host is one numbered entry made of a `HOST`, a `USERNAME`, and a `TOKEN`.

### Common username conventions per provider

| Provider | Username value | Token |
|----------|----------------|-------|
| GitHub (github.com or Enterprise Server) | `x-access-token` (or `oauth2`) | Personal access token or App installation token |
| Harness Code | Your Harness account email | Harness personal access token |
| GitLab (gitlab.com or self-hosted) | `oauth2` | Personal or project access token |
| Bitbucket Cloud | Bitbucket username | App password |
| Gitea or Forgejo | Git username | Access token |

The host must be the exact hostname. For GitHub Enterprise Server, use your server host (for example, `github.mycompany.com`), not `github.com`.

There are two ways to supply these triples. Both produce the same result and differ only in where the values come from. When both define the same key, pipeline-level environment variables take precedence.

### Variables

For each host, where `<N>` is the entry index (`0`, `1`, `2`, and so on):

| Variable | Required | Description |
|----------|----------|-------------|
| `ANSIBLE_GIT_AUTH_<N>_HOST` | **Yes** | Git host, for example `github.com` or `git.harness.io`. |
| `ANSIBLE_GIT_AUTH_<N>_USERNAME` | **Yes** | Username for the host (see the conventions table above). |
| `ANSIBLE_GIT_AUTH_<N>_TOKEN` | **Yes** | Token or password for the host. |

**Index rules:**
- All three fields (`HOST`, `USERNAME`, `TOKEN`) are required for an entry to be used. An incomplete entry is skipped with a warning — see [Detection output](#detection-output) below for examples.
- Indices do not have to start at `0` or be contiguous (non-contiguous indices are supported, for example you can use indices 1 and 3 without defining index 2). A set containing only `ANSIBLE_GIT_AUTH_1_*` works, and gaps (for example, `0` and `2` with no `1`) are fine. All present entries are used.

### Configuration examples

<Tabs groupId="config-method">
<TabItem value="pipeline-env" label="Pipeline environment variables" default>

**Single host (GitHub):**

```
ANSIBLE_GIT_AUTH_0_HOST=github.com
ANSIBLE_GIT_AUTH_0_USERNAME=x-access-token
ANSIBLE_GIT_AUTH_0_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
```

**Multiple hosts:**

```
ANSIBLE_GIT_AUTH_0_HOST=github.com
ANSIBLE_GIT_AUTH_0_USERNAME=x-access-token
ANSIBLE_GIT_AUTH_0_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx

ANSIBLE_GIT_AUTH_1_HOST=git.harness.io
ANSIBLE_GIT_AUTH_1_USERNAME=oauth2
ANSIBLE_GIT_AUTH_1_TOKEN=yyy

ANSIBLE_GIT_AUTH_2_HOST=gitlab.com
ANSIBLE_GIT_AUTH_2_USERNAME=oauth2
ANSIBLE_GIT_AUTH_2_TOKEN=zzz
```

</TabItem>
<TabItem value="playbook-vars" label="Playbook variables">

Define the same `ANSIBLE_GIT_AUTH_<N>_*` keys as variables on the playbook. This is useful when credentials should live with the playbook definition rather than the pipeline. The host and username are typically plain strings, and the token should be a secret.

| Playbook variable type | Where the value comes from |
|------------------------|----------------------------|
| `string` (HOST, USERNAME) | The literal value stored on the playbook variable. |
| `secret` (TOKEN) | The playbook stores only a reference. The resolved secret value is injected at runtime as an environment variable named `ANSIBLE_PLAYBOOK_VAR__<KEY>`. |

For a secret named `ANSIBLE_GIT_AUTH_1_TOKEN`, the resolved value is injected at runtime as:

```
ANSIBLE_PLAYBOOK_VAR__ANSIBLE_GIT_AUTH_1_TOKEN=<resolved-secret-value>
```

The plugin reads the string values from the playbook variables and the secret value from the injected `ANSIBLE_PLAYBOOK_VAR__*` env var, then assembles the triple.

**Example playbook configuration:**

A playbook with three variables for one GitHub host, with HOST and USERNAME as strings and TOKEN as a secret referencing a Harness secret:

```json
{
  "identifier": "GalaxyRemoteCollection",
  "ansible_galaxy": true,
  "ansible_galaxy_requirements_file": "requirements.yaml",
  "vars": {
    "ANSIBLE_GIT_AUTH_1_HOST": {
      "key": "ANSIBLE_GIT_AUTH_1_HOST",
      "value": "github.com",
      "value_type": "string"
    },
    "ANSIBLE_GIT_AUTH_1_USERNAME": {
      "key": "ANSIBLE_GIT_AUTH_1_USERNAME",
      "value": "x-access-token",
      "value_type": "string"
    },
    "ANSIBLE_GIT_AUTH_1_TOKEN": {
      "key": "ANSIBLE_GIT_AUTH_1_TOKEN",
      "value": "account.iacm_git_token",
      "value_type": "secret"
    }
  }
}
```

For the secret, `value` is a reference to a stored secret (`account.iacm_git_token`), not the token itself. At runtime the resolved value is injected as `ANSIBLE_PLAYBOOK_VAR__ANSIBLE_GIT_AUTH_1_TOKEN`.

**Variable rules:**
- The same triple rules as pipeline environment variables apply: `HOST`, `USERNAME`, and `TOKEN` are all required for an entry to be used, and incomplete entries are skipped.
- The same indexing rules apply: any index, with non-contiguous and non-zero indices supported (for example you can use indices 1 and 3 without defining index 2).
- A `secret` token with no injected runtime value is treated as incomplete and skipped.

</TabItem>
</Tabs>

---

## .netrc credentials

A `.netrc` file is an alternative, provider-agnostic way to authenticate HTTPS fetches during the galaxy install. It is useful when you already manage credentials in `.netrc` format, or when authentication is needed by tools that read `.netrc` directly: git, used by `ansible-galaxy` for `git+https://` collection sources, and Python's `urllib`.

### Why a $HOME/.netrc copy is made

git and Python's `urllib` read credentials only from `$HOME/.netrc` and ignore the `NETRC` and `ANSIBLE_NETRC` environment variables. During the galaxy pre-flight, the plugin detects a `.netrc` file and copies its contents to `$HOME/.netrc` (written with owner-only `0600` permissions) so those tools pick it up. If `$HOME/.netrc` already exists, it is left untouched and not overwritten.

### Detection order and sources

The plugin searches these locations in order and uses the first one found. Any additional `.netrc` files found are reported but not used.

| Order | Source | Location |
|-------|--------|----------|
| 1 | `ANSIBLE_NETRC` | The value is treated as a direct file path to an existing `.netrc` file, not the file's contents. |
| 2 | Current working directory | `<cwd>/.netrc`. By default `cwd` is `/harness`, so this resolves to `/harness/.netrc`. |
| 3 | Ansible workspace | `<HARNESS_WORKSPACE>/.netrc` |
| 4 | File-type secret | The secret's resolved value is written to the path specified by `file_name` at runtime (mode `0600`). The path must match one of the sources above for detection to pick it up. Go to [Add and reference file secrets](/docs/platform/secrets/add-file-secrets) to create a file-type secret. |

### Recommended approach

**Write `/harness/.netrc` from an earlier step:** Because `/harness` is the default working directory and is shared across all steps within a pipeline stage, a prior step such as a shell or Run step can create `/harness/.netrc`, and the Ansible step picks it up automatically (it matches detection source 2 above, the current working directory). This is the recommended approach when you do not want to use a file-type secret.

**Use a file-type secret for sensitive credentials:** A `secret`-type playbook variable that specifies a `file_name` has its resolved value written to disk at that file name (mode `0600`) at runtime, so no credentials are committed to source control. Point this at a `.netrc` so detection finds it. This is the same general file-secret mechanism the plugin uses for other on-disk secrets, such as certificate files, and is not `.netrc`-specific.

:::info
The plugin does not read raw `.netrc` contents from an environment variable or a plain (non-file) secret and write `$HOME/.netrc` from it. A `.netrc` file must first exist on disk, either committed or staged, pointed to by `ANSIBLE_NETRC`, or materialized by a file-type secret. The plugin then copies that file into `$HOME/.netrc`.
:::

### .netrc format

Standard `.netrc`, one machine entry per host:

```
machine git.harness.io
  login oauth2
  password <token>

machine github.com
  login x-access-token
  password <token>
```

### Detection output

During the galaxy pre-flight, the plugin prints a Netrc detection section. It reports the detected file path and source, and lists any additional unused `.netrc` files. Credentials inside the file are never printed.

```
▶ Netrc detection
✓ ok: detected /harness/.netrc (source: current working directory)
    ↳ copied /harness/.netrc to $HOME/.netrc
```

When none is found:

```
▶ Netrc detection
    (no .netrc detected)
```

### Notes

- The mechanism is provider-agnostic and works for any HTTPS host you add a `machine` entry for.
- The `$HOME/.netrc` copy is created only when a source `.netrc` is detected and `$HOME/.netrc` does not already exist.
- `.netrc` and the `ANSIBLE_GIT_AUTH_*` Git mechanism both serve `git+https://` sources. Use whichever fits your credential management. If both are present, the `ANSIBLE_GIT_AUTH_*` URL rewrite takes precedence because git uses embedded credentials in the URL before checking `.netrc`.

---

## Precedence

The two private-Git methods can be combined. Resolution is per key, in this order from lowest to highest priority:

1. **Playbook string variable (Method B):** Used for HOST and USERNAME.
2. **Playbook secret (Method B):** Token resolved from the injected `ANSIBLE_PLAYBOOK_VAR__<KEY>`.
3. **Pipeline-level environment variable (Method A):** Overrides the playbook value for the same key.

A pipeline-level `ANSIBLE_GIT_AUTH_0_USERNAME` overrides a playbook's `ANSIBLE_GIT_AUTH_0_USERNAME`, while the token for the same index can still come from the playbook secret. Values are merged key by key, not all-or-nothing.

---

## Security

These behaviors apply to all mechanisms (Galaxy server, Git, and `.netrc`):

- Secrets such as tokens and passwords are never written to `requirements.yml`.
- Secrets are never printed to logs. The Git section reports only host and username. The Galaxy server detection section reports only server name, URL, and auth presence, for example `auth: token (set)`.
- Secret values stored as playbook secrets are resolved at runtime from injected `ANSIBLE_PLAYBOOK_VAR__<KEY>` env vars. The playbook itself stores only a reference.

Git-specific:

- Tokens are never passed as command-line arguments, so they cannot appear in process listings.
- The generated Git configuration is written to a temporary file with owner-only permissions and removed after the galaxy install completes.

Galaxy-server-specific:

- Settings are made available to `ansible-galaxy` purely through the process environment, and no file is written. Promoted playbook values remain set for the remainder of the run.

`.netrc`-specific:

- The detected `.netrc` is copied to `$HOME/.netrc` with owner-only (`0600`) permissions, and only when `$HOME/.netrc` does not already exist.
- `.netrc` contents, including passwords, are never printed. Detection output reports only file paths and sources.

---

## Supported Git providers

The URL-rewrite approach is provider-agnostic and works for any Git server reachable over HTTPS, including:

- Harness Code
- GitHub (github.com and Enterprise Server)
- GitLab (gitlab.com and self-hosted)
- Bitbucket Cloud
- Gitea or Forgejo
- Any other HTTPS Git server

---

## Quick reference

The Galaxy server and Git mechanisms support the same two sources, with pipeline env taking precedence over playbook values per key. The `.netrc` mechanism is file-based.

<Tabs groupId="mechanism-type">
<TabItem value="galaxy" label="Galaxy servers" default>

**Pipeline environment variables:**

```
ANSIBLE_GALAXY_SERVER_LIST=<name1>,<name2>
ANSIBLE_GALAXY_SERVER_<NAME>_URL=<url>
ANSIBLE_GALAXY_SERVER_<NAME>_TOKEN=<token>
ANSIBLE_GALAXY_SERVER_<NAME>_AUTH_URL=<sso-url>     # if applicable
```

**Playbook variables:**

```
# Playbook vars (string): ANSIBLE_GALAXY_SERVER_LIST, ANSIBLE_GALAXY_SERVER_<NAME>_URL
# Playbook var  (secret): ANSIBLE_GALAXY_SERVER_<NAME>_TOKEN
#   -> resolved at runtime as ANSIBLE_PLAYBOOK_VAR__ANSIBLE_GALAXY_SERVER_<NAME>_TOKEN
```

**Precedence:** Pipeline env over playbook secret or string, per key.

</TabItem>
<TabItem value="git" label="Private Git sources">

**Pipeline environment variables:**

```
ANSIBLE_GIT_AUTH_<N>_HOST=<host>
ANSIBLE_GIT_AUTH_<N>_USERNAME=<username>
ANSIBLE_GIT_AUTH_<N>_TOKEN=<token>
```

**Playbook variables:**

```
# Playbook vars (string): ANSIBLE_GIT_AUTH_<N>_HOST, ANSIBLE_GIT_AUTH_<N>_USERNAME
# Playbook var  (secret): ANSIBLE_GIT_AUTH_<N>_TOKEN
#   -> resolved at runtime as ANSIBLE_PLAYBOOK_VAR__ANSIBLE_GIT_AUTH_<N>_TOKEN
```

**Precedence:** Pipeline env over playbook secret or string, per key.

</TabItem>
<TabItem value="netrc" label=".netrc file">

**File-based authentication:**

```
# Provide a .netrc file via one of (first found wins):
ANSIBLE_NETRC=<path-to-existing-.netrc>     # treated as a path, not contents
# or  /harness/.netrc   <-- recommended: /harness is the default cwd, shared across stage steps
# or  <HARNESS_WORKSPACE>/.netrc
# or  a file-type secret with file_name=/harness/.netrc  (written to /harness/.netrc at runtime, picked up via cwd source)
# The plugin copies the detected file to $HOME/.netrc (0600) if not already present.
```

</TabItem>
</Tabs>

---

## Related concepts

Explore these related topics to expand your Ansible automation capabilities in Harness IaCM:

- [Manage Playbook Dependencies](/docs/infra-as-code-management/configuration-management/ansible/playbooks/manage-dependencies): Install Ansible collections and Python packages for your playbooks.
- [Get started with Ansible](/docs/infra-as-code-management/configuration-management/ansible/get-started): Configure your first Ansible pipeline in Harness IaCM.
- [Use Variable Files with Ansible](/docs/infra-as-code-management/configuration-management/ansible/examples/variable-files): Organize configuration by environment, host group, or role.
- [Add and reference text secrets](/docs/platform/secrets/add-use-text-secrets): Create and manage secrets in Harness Platform.
- [Harness secrets management](/docs/platform/secrets/secrets-management/harness-secret-manager-overview): Understand Harness Platform secrets architecture and capabilities.
