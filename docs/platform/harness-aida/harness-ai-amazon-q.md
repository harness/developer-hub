---
title: Harness AI x Amazon Q Developer
description: Leverage Amazon Q CLI with Harness AI MCP Server to unleash your developer workflows
sidebar_position: 12
---

# Amazon Q Developer CLI Integration with Harness MCP Server

## What is Amazon Q Developer

Amazon Q Developer is a generative AI-powered assistant by AWS built on Amazon Bedrock. It helps with understanding, building, extending, and operating AWS applications. You can use it in various environments including the CLI (command line), IDEs, AWS Console, chat applications, etc. It supports features like conversational assistance, code suggestions, inline completions, and translating natural language into shell commands.  ￼

In the CLI context, Amazon Q Developer enhances your terminal experience by:
	•	providing command autocompletion for many common CLIs (like git, npm, docker, aws)  ￼
	•	enabling “chat mode” where you can ask questions in natural language from the terminal and get responses that help you build, debug, or operate your code or infrastructure  ￼
	•	translating plain language instructions into executable shell commands  ￼
	•	understanding context (files in the project, existing settings, AWS resource state) so that suggestions and completions are more relevant  ￼

There are pricing tiers including a Free Tier; Amazon Q Developer provides features in its Free and Pro tiers.  ￼



## Prerequisites

- Amazon Q Developer CLI installed and configured with AWS credentials
- Harness account with an API Key (Org ID and Project ID optional)
- Go installed to build the Harness MCP Server
- Docker Installed to run the Harness MCP



## Step 1: Build the Harness MCP Server

Clone the MCP server repository
```sh
git clone https://github.com/harness/mcp-server.git
cd mcp-server
```

Build the binary if building locally

```sh
go build -o cmd/harness-mcp-server/harness-mcp-server ./cmd/harness-mcp-server

# Make executable if needed
chmod +x harness-mcp-server
```


⸻

## Step 2: Run the Harness MCP Server

```sh
HARNESS_API_KEY=<YOUR_API_KEY> \
HARNESS_DEFAULT_ORG_ID=<YOUR_ORG_ID> \
HARNESS_DEFAULT_PROJECT_ID=<YOUR_PROJECT_ID> \
./cmd/harness-mcp-server/harness-mcp-server stdio
```

You can also set `HARNESS_BASE_URL` if using a custom Harness domain.


## Step 3: Configure Amazon Q Developer CLI

Edit or create the MCP configuration file at: `~/.aws/amazonq/mcp.json`

```json
{
  "mcpServers": {
    "harness": {
      "command": "/path/to/harness-mcp-server",
      "args": ["stdio"],
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



## Step 4: Query Harness with Amazon Q

Start a session with:

```sh
q chat
```

Then interact with Harness using natural language prompts.


## Sample Prompts

- List all my pipelines in Harness
- What repositories are linked to my account?
- Show me all artifacts in my project
- Find feature flags created in my org
- Summarize the last 5 deployments in project XYZ
- Which connectors are configured in Harness?


## Troubleshooting

-	If Amazon Q cannot connect to Harness MCP, check the command path, arguments, and environment variables in mcp.json.
-	If you see credential errors, regenerate the API key in Harness.
-	If no resources are returned, confirm that Org ID, Project ID, or Base URL are set correctly.
-	For performance or latency issues, ensure the MCP server has sufficient resources and review its logs.



If you like, I can also include a “Security & Governance Considerations” section about Amazon Q (e.g. permissions, IAM policies, data privacy) for the doc.
