---
title: Prompt library
sidebar_label: Prompt Library
description: A curated library of natural-language prompts for the Harness MCP server's resilience-testing toolset. Click any card to fill in your values and copy a ready-to-paste prompt.
sidebar_position: 3
keywords:
  - chaos engineering
  - prompt library
  - prompt template
  - MCP
  - AI agent
  - resilience testing
---

This page is a curated library of natural-language prompts for the Harness MCP server's resilience-testing toolset. Each card represents a real SRE scenario, mapped to specific Harness chaos resource types. Click any card to open the full prompt, fill in your service and tolerance values, and copy a ready-to-paste prompt for Cursor, Claude Desktop, Windsurf, or any other MCP-compatible AI client.

## Browse the prompts

<PromptLibraryProvider datasetId="resilience-testing">


### Resilience coverage map

<PromptCard promptId="coverage-map" />

### Fault catalog exploration

<PromptCard promptId="fault-catalog" />

### Service resilience risk scan

<PromptCard promptId="resilience-risk" />


### Pod failure experiment design

<PromptCard promptId="pod-failure" />


</PromptLibraryProvider>

## Related concepts

- Go to [Resilience Testing MCP Tools](/docs/resilience-testing/chaos-testing/ai/mcp) to install and configure the Harness MCP server in your AI client.
- Go to [AI Reliability Agent](/docs/resilience-testing/chaos-testing/ai/ai-reliability-agent) to learn how Harness recommends and remediates experiments automatically.
- Go to [Pod Network Latency](/docs/chaos-engineering/faults/chaos-faults/kubernetes/pod/pod-network-latency) to review the underlying network-latency fault and its tunables.
