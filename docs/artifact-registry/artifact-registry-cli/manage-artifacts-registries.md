---
title: Manage Artifacts and Registries
description: Learn how to manage registries and artifacts using the Harness CLI
sidebar_position: 1
sidebar_label: Manage Artifacts & Registries
keywords:
  - CLI commands
  - registry management
  - artifact management
tags:
  - artifact-registry-cli
  - registries
  - artifacts
  - cli-commands
---

This guide covers the essential commands for working with the Artifact Registry from the command line.
This will require installation of the [Harness CLI](/docs/platform/automation/cli/install) and authentication to your Harness account.

## Registry Management

The `hc registry` (or `hc reg`) command allows you to manage your Artifact Registry registries.

### List Registries

View all registries in your project:

```bash
hc registry list --org devrel --project sd1
```

You can also use the short alias:

```bash
hc reg list --org devrel --project sd1 
```

<DocImage path={require('./static/reg-list.png')} width="80%" title="Registry List" alt="Registry List" width="100%"/>

This displays a table with your registries, including their identifiers, package types, and other details provided that your authentication is at account level.

<!-- ### Create a Registry

Create a new registry with a specific package type:

```bash
hc registry create <identifier> --package-type <TYPE>
```

**Example:** Create a Docker registry

```bash
hc registry create my-docker-registry --package-type DOCKER
```

**Example:** Create a Maven registry with description

```bash
hc registry create my-maven-repo --package-type MAVEN --description "Maven artifacts for backend services"
```

You can create registries with the following package types:
- `DOCKER` (default)
- `MAVEN`
- `NPM`
- `GENERIC` (for uploading and downloading arbitrary files)
- and more

Feel free to refer to the [Artifact Registry documentation](https://developer.harness.io/docs/artifact-registryget-started/quickstart#docker) for a comprehensive list of supported package types. -->

### Get Registry Details

Retrieve detailed information about a specific registry:

```bash
hc registry get [?name] [flags]
```
**Available flags:**

- `--package-type string`   package type
- `--page int32`            page number (zero-indexed)
- `--page-size int32`       number of items per page (default 10)

Go to the [Artifact Registry documentation](https://developer.harness.io/docs/artifact-registryget-started/quickstart#docker) for a comprehensive list of supported package types.

You can also use global flags to override the org and project, to know more about global flags, refer to the [Global Flags](/docs/platform/automation/cli/reference#v1-hc--global-flags) section.

### Manage Registry Metadata

Attach custom key-value pairs to registries for better organization and tracking.

#### Set Metadata

```bash
hc registry metadata set [flags]
```

**Required flags:**
- `--registry string`: Registry identifier
- `--metadata string`: Metadata in `key:value,key:value` format

**Example:**

```bash
hc registry metadata set --registry my-docker-reg --metadata "env:prod,region:us"
```

#### Get Metadata

```bash
hc registry metadata get [flags]
```

**Required flags:**
- `--registry string`: Registry identifier

**Example:**

```bash
hc registry metadata get --registry my-docker-reg
```

#### Delete Metadata

```bash
hc registry metadata delete [flags]
```

**Required flags:**
- `--registry string`: Registry identifier
- `--metadata string`: Metadata in `key:value,key:value` format

**Example:**

```bash
hc registry metadata delete --registry my-docker-reg --metadata "env:prod"
```

---

### Delete a Registry

Remove a registry from your project:

```bash
hc registry delete [name] [flags]
```

**Example:**

```bash
hc registry delete my-docker-registry
```

:::warning Permanent Action
Deleting a registry will remove all artifacts stored within it. This action cannot be undone. Make sure to back up any important artifacts before deletion.
:::

---

## Artifact Management

The `hc artifact` (or `hc art`) command allows you to manage artifacts within your registries.

<!-- ### CLI support by Artifact Type 

| Artifact Type | Push Command | Pull Command |
|---------------|--------------|--------------|
| Generic |  ✅  | ✅ |
| Go | ✅ | ⏳ Coming Soon |
| Maven | ✅ | ⏳ Coming Soon |
| Conda | ✅ | ⏳ Coming Soon |
| Docker | ⏳ Coming Soon | ⏳ Coming Soon |
| Helm | ⏳ Coming Soon | ⏳ Coming Soon |
| Python (PyPI) | ⏳ Coming Soon | ⏳ Coming Soon |
| NPM | ⏳ Coming Soon | ⏳ Coming Soon |
| NuGet | ⏳ Coming Soon | ⏳ Coming Soon |
| RPM | ⏳ Coming Soon | ⏳ Coming Soon |
| Cargo | ⏳ Coming Soon | ⏳ Coming Soon |
| Hugging Face | ⏳ Coming Soon | ⏳ Coming Soon | -->

---

### List Artifacts

The `list` command is hierarchical and can show different levels of detail depending on the arguments provided.

#### List Artifacts 

```bash
hc artifact list [flags]
```

Shows all available artifacts in your project.

---

#### List All Artifacts in a Registry

This will show all artifacts in the specified registry.

```bash
hc artifact list --registry <registry> --org <org> --project <project>
```

**Example:**

```bash
hc artifact list --registry hub01 --org devrel --project sd1 
```

<DocImage path={require('./static/get-arti-from-regis.png')} width="80%" title="Get Artifact from Registry" alt="Get Artifact from Registry" width="100%"/>



---

#### Pagination Options

For large result sets, control the output with pagination:

```bash
hc artifact list --registry <registry> --page 0 --page-size 20
```

**Available flags:**
- `--page`: Page number (zero-indexed)
- `--page-size`: Number of items per page (default: 10)
- `--registry`: Name of the registry 

### Push Artifacts

Push artifacts to your registry using the appropriate subcommand for your package type.

**General syntax:**

```bash
hc artifact push [command]
```
**Available commands:**

- `generic`
- `go`
- `conda`
- `cargo`
- `composer`
- `dart`
- `nuget`
- `python`
- `rpm`
- `npm`

Pick the appropriate command based on your package type. Use the `-h` flag to get help and understand the necessary flags for each command.

**Example: Push a generic artifact**

```bash
hc artifact push go my-go-registry v1.2.3
```



---

### Pull Artifacts

Download artifacts from your registry to your local machine.

**General syntax:**

```bash
 hc artifact pull [command]
```

**Available commands:**

- `generic`


Pick the appropriate command based on your package type. Use the `-h` flag to get help and understand the necessary flags for each command.



**Example with package URL:**

```bash
hc artifact pull generic image cli-arti/latest/package.json ./dummy --pkg-url https://pkg.harness.io 
```

<DocImage path={require('./static/pull-arti-general.png')} width="80%" title="Pull Generic Artifact" alt="Pull Generic Artifact" width="100%"/>

This downloads the specified artifact to the destination path on your local machine.

---

### Manage Artifact Metadata

Attach custom key-value pairs to packages or specific versions for better organization, tracking, and automation workflows.

:::info Package vs Version Level Metadata
Metadata can be applied at two levels:
- **Package-level**: Applies to the entire package (omit `--version` flag)
- **Version-level**: Applies to a specific version (include `--version` flag)
:::

#### Set Metadata

```bash
hc artifact metadata set [flags]
```

**Required flags:**
- `--registry string`: Registry identifier
- `--package string`: Package name
- `--metadata string`: Metadata in `key:value,key:value` format

**Optional flags:**
- `--version string`: Version (for version-level metadata)

**Example - Package-level metadata:**

```bash
hc artifact metadata set --registry r1 --package nginx --metadata "owner:team-a"
```

**Example - Version-level metadata:**

```bash
hc artifact metadata set --registry r1 --package nginx --version 1.2.3 --metadata "approved:true"
```

#### Get Metadata

```bash
hc artifact metadata get [flags]
```

**Required flags:**
- `--registry string`: Registry identifier
- `--package string`: Package name

**Optional flags:**
- `--version string`: Version (for version-level metadata)

**Example - Package-level:**

```bash
hc artifact metadata get --registry r1 --package nginx
```

**Example - Version-level:**

```bash
hc artifact metadata get --registry r1 --package nginx --version 1.2.3
```

#### Delete Metadata

```bash
hc artifact metadata delete [flags]
```

**Required flags:**
- `--registry string`: Registry identifier
- `--package string`: Package name
- `--metadata string`: Metadata in `key:value,key:value` format

**Optional flags:**
- `--version string`: Version (for version-level metadata)

**Example - Package-level:**

```bash
hc artifact metadata delete --registry r1 --package nginx --metadata "owner:team-a"
```

**Example - Version-level:**

```bash
hc artifact metadata delete --registry r1 --package nginx --version 1.2.3 --metadata "approved:true"
```

---

### Delete Artifacts

Delete a specific version of an artifact or all versions of an artifact from the Harness Artifact Registry.

```bash
hc artifact delete [artifact-name] [flags]
```

**Required flags:**
- `--registry string`: Name of the registry

**Optional flags:**
- `--version string`: Specific version to delete (if not provided, deletes all versions)

**Example - Delete a specific version:**

```bash
hc artifact delete my-app --registry my-docker-registry --version 1.0.0
```

**Example - Delete all versions:**

Omit the `--version` flag to delete the entire artifact and all its versions:

```bash
hc artifact delete my-app --registry my-docker-registry
```

:::warning Permanent Deletion
Deleting artifacts is permanent and cannot be undone. Ensure you have backups or are certain about the deletion before proceeding.
:::

---

### Copy Artifacts

Copy a specific version of an artifact package from one registry to another within your Harness Artifact Registry.

```bash
hc artifact copy <SRC_REGISTRY>/<PACKAGE_NAME>/<VERSION> <DEST_REGISTRY> [flags]
```

**Optional flags:**
- `--artifact-type string`: Artifact type (e.g., `model` or `dataset`)

**Example:**

```bash
hc artifact copy source-registry/nginx/1.2.3 destination-registry
```

**Example with artifact type:**

```bash
hc artifact copy ml-registry/my-model/v2.0 prod-registry --artifact-type model
```


<!-- 
## Output Formats

The CLI supports multiple output formats to suit different use cases.

### Table Format (Default)

Human-readable table output:

```bash
hc registry list --format table
```

### JSON Format

Machine-readable JSON for scripting:

```bash
hc registry list --format json
```

### YAML Format

YAML output for configuration management:

```bash
hc registry list --format yaml
```

:::tip Automation
Use `--format json` or `--format yaml` when writing scripts or integrating with CI/CD pipelines. These formats are easier to parse programmatically.
::: -->

## Tips and Best Practices

**1. Use Command Aliases**

Save time with short aliases:
- `hc reg` instead of `hc registry`
- `hc art` instead of `hc artifact`

**2. Get Help Anytime**

Use the `--help` flag to see all available options:

```bash
hc [command] --help
hc registry list --help
```

**3. Pagination for Large Datasets**

Control output when working with many artifacts:

```bash
hc artifact list my-registry --page-size 50
```

**4. Scripting and Automation**

Use JSON or YAML format for parsing in scripts:

```bash
hc registry list --format json | jq '.[] | .identifier'
```

**5. Work Across Projects**

Use global flags to work with different projects without changing configuration:

```bash
hc registry list --project dev-project
hc registry list --project prod-project
```

---
