---
title: Global flags and output formats
sidebar_label: Global Flags and Output
description: Learn how to use global flags to control scope, output format, pagination, and behavior across all Harness CLI commands.
sidebar_position: 5
keywords:
  - harness cli
  - global flags
  - output formats
  - pagination
  - environment variables
  - json output
---

The Harness CLI provides a set of flags that work consistently across commands. Use these flags to control scope, output formatting, pagination, and command behavior. This page serves as a reference for the shared flags available throughout the CLI.

---

## What will you learn in this topic?

By the end of this page, you will know how to:

* Control the account, organization, and project scope of commands.
* Switch between supported output formats.
* Customize which fields appear in command output.
* Paginate through large result sets or retrieve all results.
* Configure the CLI using environment variables.

---

## Before you begin

* **Harness CLI installed and authenticated:** Go to [Install and upgrade](/docs/platform/harness-cli/install-and-upgrade) and [Authenticate](/docs/platform/harness-cli/authenticate) to set up the CLI.

---

## Scope flags

Use scope flags to control which account, organization, and project a command operates against. The CLI resolves scope in the following order: command-line flags, profile defaults, and then environment variables.

| Flag                            | Description                                                   |
| ------------------------------- | ------------------------------------------------------------- |
| `--profile <name>`              | Use a specific authentication profile.                        |
| `--org <id>`                    | Override the organization defined in the active profile.      |
| `--project <id>`                | Override the project defined in the active profile.           |
| `--level account\|org\|project` | Specify the scope for resources that support multiple levels. |

```sh
harness list secret --level account
harness list pipeline --org platform --project production
harness list connector --level org --org platform --profile prod
```

---

## Output formats for list commands

By default, `list` commands display results in a table. Use `--format` to produce machine-readable output or export data for external tools.

| Format     | Use case                                 | Notes                              |
| ---------- | ---------------------------------------- | ---------------------------------- |
| `table`    | Interactive terminal use                 | Default format for `list` commands |
| `json`     | Integration with tools that consume JSON | Returns a formatted JSON array     |
| `jsonl`    | Streaming and line-based processing      | Outputs one JSON object per line   |
| `csv`      | Spreadsheet and reporting tools          | Includes a header row              |
| `tsv`      | Tab-delimited processing                 | Includes a header row              |
| `markdown` | Documentation, pull requests, and wikis  | Renders output as a Markdown table |

```sh
harness list pipeline --format json
harness list pipeline --format jsonl | jq -r '.id'
harness list pipeline --format csv > pipelines.csv
harness list pipeline --json
```

### Customize columns

Use `--columns` to control which columns appear in list output. Run `--list-columns` to view the available columns for a resource.

```sh
harness list pipeline --list-columns
harness list pipeline --columns "name,id,project,lastRun"
harness list pipeline --columns "+lastRun"
harness list pipeline --columns "Name:it.name"
```

---

## Output formats for get, create, and update commands

Commands that operate on a single resource default to human-readable text output. Use the following flags to change the format or save output to a file.

| Flag                  | Description                                                   |
| --------------------- | ------------------------------------------------------------- |
| `--format text\|json` | Output format. Default is `text`.                             |
| `--json`              | Shorthand for `--format json`.                                |
| `--list-fields`       | Display available field identifiers and exit.                 |
| `--raw`               | Return the complete API response envelope (JSON output only). |
| `-o`, `--out <path>`  | Write output to a file instead of standard output.            |

```sh
harness get pipeline my-pipeline --format json
harness get pipeline my-pipeline --raw --format json
harness get pipeline my-pipeline -o pipeline.yaml
```

---

## Pagination flags

List commands return paginated results by default. Use these flags to control how many records are returned.

| Flag           | Description                                                    |
| -------------- | -------------------------------------------------------------- |
| `--all`        | Retrieve all available results.                                |
| `--limit <N>`  | Return up to N results.                                        |
| `--offset <N>` | Skip the first N results.                                      |
| `--count`      | Return the total number of results without retrieving records. |

These options are mutually exclusive. Use either `--all`, `--limit` and `--offset`, or `--count`.

```sh
harness list pipeline --count
harness list pipeline --all --format jsonl
harness list pipeline --limit 25 --offset 50
```

---

## Next steps

- Go to [Platform](/docs/platform/harness-cli/harness-cli-commands/platform-commands) for detailed examples of platform resource operations.
- Go to [Troubleshooting](/docs/platform/harness-cli/troubleshooting) to resolve common CLI errors.
