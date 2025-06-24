---
title: Harness MCP Server (Beta)
description: A unified interface for AI agents to interact with Harness tools and services using the Model Context Protocol (MCP).
sidebar_position: 54
---

The Harness Model Context Protocol (MCP) Server (in Beta) enables integration with Harness tools, providing endpoints for pipelines, pull requests, and more. This guide outlines the installation, configuration, and usage of the MCP server.

## Introduction

### What is MCP?

MCP (Model Context Protocol) is an open standard for AI agents to interact with tools and services using a unified protocol. Instead of building custom adapters or connectors for each tool, MCP provides a consistent interface that allows AI agents to communicate seamlessly with various tools, including Harness services.

In simpler terms: MCP standardizes how AI agents talk to software tools, enabling interoperability without requiring custom code for each integration.

### Why MCP?

Harness is building a diverse set of AI agents that need access to platform data and services. Additionally, customers may have their own agents that require interaction with Harness entities to perform specific tasks.

MCP solves this problem by:

* **Standardizing communication:** A single interface for connecting agents to Harness tools, reducing implementation complexity.
* **Supporting external tools:** Seamless integration with third-party tools like **Windsurf, Cursor, and Claude Desktop**, eliminating the need for custom adapters.
* **Ensuring consistency:** A common interface reduces duplication and potential inconsistencies across different agents and tools.

### MCP vs. Tool/Function Calling

Why not just use function calls for each API?

1. **Limited Support for External Tools:** Function calling is often restricted to the model’s internal tools. MCP enables integration with external tools like Windsurf, Cursor, and Claude Desktop.
2. **Inconsistent Implementations:** Without MCP, each agent would need to implement the same logic in different languages/frameworks, increasing the risk of errors.
3. **Scalability and Reuse:** MCP provides a standardized protocol, allowing reusable implementations across various agents and tools.

## Requirements

* **Harness API Token:** Generate one through the Harness UI. Learn more: [Manage API Keys](/docs/platform/automation/api/add-and-manage-api-keys/)
* **Go 1.23 or later:** Ensure **Go** is installed on your system.

### Video Walkthrough (Installation and Setup)

<DocVideo src="https://www.loom.com/share/b7c5d77b1f7f4f55a779758971eefe78?sid=146f737a-3922-4bf2-8485-9c7c51154cc8" />


## Configuration

### Windsurf Configuration

#### Using Source

```json
{
  "mcpServers": {
    "harness": {
      "command": "/path/to/harness-mcp-server",
      "args": ["stdio"],
      "env": {
        "HARNESS_API_KEY": "your_api_key",
        "HARNESS_DEFAULT_ORG_ID": "your_org_id",
        "HARNESS_DEFAULT_PROJECT_ID": "your_project_id",
        "HARNESS_BASE_URL": "<if-needed>"
      }
    }
  }
}
```

#### Using Docker

```json
{
  "mcpServers": {
    "harness": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "HARNESS_API_KEY",
        "-e",
        "HARNESS_DEFAULT_ORG_ID",
        "-e",
        "HARNESS_DEFAULT_PROJECT_ID",
        "-e",
        "HARNESS_BASE_URL",
        "harness/mcp-server",
        "stdio"
      ],
      "env": {
        "HARNESS_API_KEY": "<YOUR_API_KEY>",
        "HARNESS_DEFAULT_ORG_ID": "<YOUR_ORG_ID>",
        "HARNESS_DEFAULT_PROJECT_ID": "<YOUR_PROJECT_ID>",
        "HARNESS_BASE_URL": "<YOUR_BASE_URL>"
      }
    }
  }
}
```

[Windsurf MCP Guide](https://docs.windsurf.com/windsurf/cascade/mcp#model-context-protocol-mcp)

### Cursor Configuration

```json
{
  "mcpServers": {
    "harness": {
      "command": "/path/to/harness-mcp-server",
      "args": ["stdio"],
      "env": {
        "HARNESS_API_KEY": "your_api_key",
        "HARNESS_DEFAULT_ORG_ID": "your_org_id",
        "HARNESS_DEFAULT_PROJECT_ID": "your_project_id",
        "HARNESS_BASE_URL": "<if-needed>"
      }
    }
  }
}
```

[Cursor MCP Guide](https://docs.cursor.com/context/model-context-protocol#configuring-mcp-servers)

[Add to Cursor](cursor://anysphere.cursor-deeplink/mcp/install?name=harness&config=eyJjb21tYW5kIjoiZG9ja2VyIHJ1biAtaSAtLXJtIC1lIEhBUk5FU1NfQVBJX0tFWSAtZSBIQVJORVNTX0RFRkFVTFRfT1JHX0lEIC1lIEhBUk5FU1NfREVGQVVMVF9QUk9KRUNUX0lEIC1lIEhBUk5FU1NfQkFTRV9VUkwgaGFybmVzcy9tY3Atc2VydmVyIHN0ZGlvIiwiZW52Ijp7IkhBUk5FU1NfQVBJX0tFWSI6IjxZT1VSX0FQSV9LRVk+IiwiSEFSTkVTU19ERUZBVUxUX09SR19JRCI6IjxZT1VSX09SR19JRD4iLCJIQVJORVNTX0RFRkFVTFRfUFJPSkVDVF9JRCI6IjxZT1VSX1BST0pFQ1RfSUQ+IiwiSEFSTkVTU19CQVNFX1VSTCI6IjxZT1VSX0JBU0VfVVJMPiJ9fQ==)

### VS Code Configuration

```json
{
  "mcp": {
    "servers": {
      "harness": {
        "command": "docker",
        "args": [
          "run",
          "-i",
          "--rm",
          "-e",
          "YjJmMGNkNDAyOGQ2YWQ4ZjI2MzA4NzMxNTlhOTgyNWQ=",
          "-e",
          "HARNESS_DEFAULT_ORG_ID",
          "-e",
          "HARNESS_DEFAULT_PROJECT_ID",
          "-e",
          "HARNESS_BASE_URL",
          "harness/mcp-server",
          "stdio"
        ],
        "env": {
          "HARNESS_API_KEY": "<YOUR_API_KEY>",
          "HARNESS_DEFAULT_ORG_ID": "<YOUR_ORG_ID>",
          "HARNESS_DEFAULT_PROJECT_ID": "<YOUR_PROJECT_ID>",
          "HARNESS_BASE_URL": "<YOUR_BASE_URL>"
        }
      }
    }
  }
}

```

[VS Code MCP Guide](https://code.visualstudio.com/docs/copilot/chat/mcp-servers)

### Using Claude Code

```bash
HARNESS_API_KEY=your_api_key \
HARNESS_DEFAULT_ORG_ID=your_org_id \
HARNESS_DEFAULT_PROJECT_ID=your_project_id \
./cmd/harness-mcp-server/harness-mcp-server stdio
```

### Building from Source

1. Clone the repository:

```bash
git clone https://github.com/harness/harness-mcp.git  
cd harness-mcp
```

2. Build the binary:

```bash
go build -o cmd/harness-mcp-server/harness-mcp-server ./cmd/harness-mcp-server
```

3. Run the server:

```bash
HARNESS_API_KEY=your_api_key \
./cmd/harness-mcp-server/harness-mcp-server stdio
```

### Use Docker Image

Alternatively, you can use the pre-built Docker image:

```
docker run -i --rm \
  -e HARNESS_API_KEY=your_api_key \
  -e HARNESS_DEFAULT_ORG_ID=your_org_id \
  -e HARNESS_DEFAULT_PROJECT_ID=your_project_id \
  -e HARNESS_BASE_URL=your_base_url \
  harness/mcp-server stdio
```


## Authentication

Set the `HARNESS_API_KEY` environment variable for authentication. Learn more: [Manage API Keys](/docs/platform/automation/api/add-and-manage-api-keys/).

```bash
export HARNESS_API_KEY=<your_api_key>
```

## Command Line Arguments

| Argument      | Description           |
| ------------- | --------------------- |
| `--toolsets`  | Enable tool groups    |
| `--read-only` | Run in read-only mode |
| `--log-file`  | Path to log file      |
| `--version`   | Show version info     |
| `--help`      | Show help             |

## Environment Variables

| Variable             | Description      |
| -------------------- | ---------------- |
| `HARNESS_API_KEY`    | API key          |
| `HARNESS_DEFAULT_ORG_ID`     | Org ID           |
| `HARNESS_DEFAULT_PROJECT_ID` | Project ID       |
| `HARNESS_TOOLSETS`   | Enabled toolsets |
| `HARNESS_READ_ONLY`  | Read-only mode   |
| `HARNESS_BASE_URL`   | Base URL         |

## MCP Server Tool Sets Overview

[MCP Tools](https://modelcontextprotocol.io/docs/concepts/tools#overview) allow servers to expose executable functions that can be invoked by clients and used by LLMs to perform actions. At Harness, we have split our tools into the following tool sets:

  - Pipelines Tool Set
  - Pull Requests Tool Set
  - Repositories Tool Set
  - Logs Tool Set
  - Artifact Registries Tool Set

This list will be continuously changing and growing. For a full list of tools visit the MCP repo at [MCP Server](https://github.com/harness/mcp-server?tab=readme-ov-file#tools).

## Use Cases

### Using Tools Demo

Watch the use case demo for a walkthrough of MCP server functionality:

<DocVideo src="https://www.loom.com/share/be336ce0d64649299a4631e81e1405f7?sid=6a68772b-e65d-4b22-ae38-e1ebb1fc6552" />

### Using Artifact Registry Tools Demo

Watch this demo to see the use of Artifact Registry tools in action. 

<DocVideo src="https://www.loom.com/share/1fb5694359204d7ab62688f899cd427e?sid=669f2ec4-9170-4804-88ea-d357ad38cb44" />

## References

* [Harness MCP Server Repo](https://github.com/harness/mcp-server)
* [Model Context Protocol Overview](https://modelcontextprotocol.io/introduction)
