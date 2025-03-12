---
title: Semantic search
description: Use AI to supercharge your code search.
sidebar_position: 51
unlisted: true
---

Use the [Harness AIDA](/docs/platform/harness-aida/aida-overview) Semantic Code Search functionality to search your entire codebase using natural language queries. Ask a question and let AIDA retrieve source code that best answers your question. This is useful when you aren't sure what specific keywords to search for or you want to better understand what the code achieves.

## Natural language processing

With Semantic Code Search enabled, AIDA treats your search query as a natural language question and searches for code that matches the semantic meaning of your question, rather than looking for specific keywords or regular expressions. More detailed questions allow AIDA to provide more refined results.

### Semantic search question examples

* Where are the swagger docs defining how to build on top of the authentication API?
* What repositories does the group 'platform-devs' own code in?

## Refine the search results

Semantic search is based on the *meaning* of your query and not literal keywords. With semantic search, AIDA assesses the natural-language meaning of your query and returns results based on that meaning.

Unlike keyword searches, the code returned from a semantic search might not contain any of the words used in your query.

To get more accurate results from semantic search:

* Ask specific questions with details of what you need.
* Combine broader semantic searches with targeted [keyword searches](/docs/code-repository/work-in-repos/keyword-search) to find the exact code you need.

### Use Harness AIDA for semantic searches of your code

![An example of semantic code search with Harness AIDA](./static/semanticsearch.gif)

