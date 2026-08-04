---
title: Semantic search
description: Use Harness AI Semantic Code Search to search your entire codebase with natural language queries.
keywords:
  - semantic code search
  - natural language search
  - code search
  - Harness AI
  - codebase search
  - repository indexing
tags:
  - code-repository
  - harness-ai
  - search
sidebar_position: 51
---

Use <a href="/docs/platform/harness-ai/overview" target="_blank">Harness AI</a> Semantic Code Search to search your entire codebase with natural language queries. Ask a question and Harness AI retrieves the source code that best answers it. Semantic search is useful when you are not sure which keywords to search for, or when you want to understand what the code achieves.

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

- [Understand how semantic search interprets natural language queries](#natural-language-processing).
- [Refine your queries to get more accurate results](#refine-the-search-results).
- [Enable Semantic Code Search for your repository](#enable-semantic-code-search).

---

## Before you begin

Before you use Semantic Code Search, ensure you have the following:

- **Harness AI access**: Harness AI must be active for your account. Go to <a href="/docs/platform/harness-ai/overview#enable-ai" target="_blank">Overview of Harness AI</a> to enable Harness AI.
- **Repository access**: A repository in Harness Code Repository with permission to trigger indexing.
- **Harness API key**: An API key to call the indexing endpoint. Go to <a href="/docs/platform/automation/api/add-and-manage-api-keys" target="_blank">Manage API keys</a> to create one.

---

## Natural language processing

Semantic Code Search treats your query as a natural language question rather than a keyword or regular expression match. Understand this behavior so you can phrase queries that return the most relevant code.

With Semantic Code Search enabled, Harness AI searches for code that matches the semantic meaning of your question, not specific keywords. More detailed questions allow Harness AI to provide more refined results.

### Semantic search question examples

- Where are the swagger docs defining how to build on top of the authentication API?
- What repositories does the group `platform-devs` own code in?

---

## Refine the search results

Semantic search returns results based on the meaning of your query, not literal keywords. The code returned from a semantic search might not contain any of the words used in your query.

To get more accurate results from semantic search:

- **Ask specific questions**: Include details of what you need.
- **Combine search types**: Pair broader semantic searches with targeted <a href="/docs/code-repository/work-in-repos/keyword-search" target="_blank">keyword searches</a> to find the exact code you need.

---

## Enable Semantic Code Search

Enable Semantic Code Search to search your repository with natural language. Enabling the feature requires a feature flag and an indexing call for each repository.

1. Enable the feature flag `SEMANTIC_SEARCH_ENABLED` in your Harness account.
2. Make the following API call to start the indexing process for your repository:

   ```
   curl -X POST 'https://app.harness.io/gateway/code/api/v1/repos/{repo-identifier}/semantic/index?accountIdentifier={account-identifier}&orgIdentifier={org-identifier}&projectIdentifier={project-identifier}' \
     -H 'X-Api-Key: YOUR_HARNESS_API_KEY'
   ```

:::note
After you trigger indexing, semantic search takes a short time to become fully functional. If you search too early, you might see a temporary 500 error.
:::

### Run a semantic search

After indexing completes, use Harness AI to run semantic searches of your code.

<div style={{textAlign: 'center'}}>
   <DocImage path={require('./static/semanticsearch.gif')} width="80%" height="40%" alt="An example of semantic code search with Harness AI" title="Click to view full size image" />
</div>