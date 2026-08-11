---
title: Keyword search
sidebar_label: Keyword Search
description: Query your codebase with Harness Code search, using Boolean operators, regex, language filters, and scoped recursive search.
keywords:
  - code search
  - keyword search
  - regex
  - RE2
  - search syntax
tags:
  - code-repository
  - work-in-repos
  - search
sidebar_position: 50
---

Use **Code Search** to find a keyword in your codebase. When you are viewing a specific repository, search queries that repository. When you search at the project level from the **Repositories** list, search queries every repository in the project.

---

## What you will learn

- **Query syntax:** How exact matching, Boolean operators, and case sensitivity work.
- **Filters:** How to narrow results by language, file name, and repository.
- **Scope:** How recursive search behaves at project, organization, and account level.
- **Results:** What search returns and what it does not cover.

:::note

You can search only the repositories you have permission to access.

:::

---

## Search syntax and filters

Beyond plain keyword strings, you can use query syntax and filters to refine a search.

### Match an exact string

Wrap your keyword string in quotation marks to match an exact string. Searching `yarn install` returns results containing both keywords anywhere and in any order. Searching `"yarn install"` returns only results containing that exact phrase in that order.

### Boolean operators

Use the Boolean operators `and`, `or`, and `not` to build more inclusive, exclusive, or complex queries:

- **And:** Any plain keyword phrase is treated as `and`. **Do not declare `and` explicitly.** For example, `yarn install` is interpreted as `yarn and install`.
- **Not:** Use `not` or a hyphen (`-`). For example, `yarn -install` is the same as `yarn not install`.
- **Or:** Use `or`, such as `yarn or bundle`.

To search for the literal words `or` or `not`, wrap your keywords in quotation marks so search does not read them as operators. For example, `"if not" or "if else"`.

### Case sensitivity

Keyword search is case *insensitive* by default. To enable case sensitivity, include `case:yes`. For example, `class Button case:yes` searches for files containing `class` and `Button` with case sensitivity.

### Regular expressions

Keyword search supports simple patterns and substrings. For more complex expressions, enable regular expression search by clicking `.*` to the right of the search box, which treats every search pattern as a regular expression.

Harness supports [RE2 syntax](https://github.com/google/re2/wiki/Syntax).

### Special characters

Search engines and regular expressions reserve certain characters for query functionality, such as an asterisk for a wildcard. When your keyword string contains one of these characters, escape it with a backslash (`\`) so search reads it literally.

Characters that require escaping include asterisks, colons, single and double quotation marks, parentheses, curly braces, brackets, ampersands, question marks, and hyphens.

For example, to search for the literal string `"feedback"` including the quotation marks, escape them as `\"feedback\"`. Without the escape, your query is treated as [exact string matching](#match-an-exact-string) and returns any instance of the word `feedback`, with or without punctuation.

### Language search

To limit a search to one source code language, use the **Language** [search results filter](#search-results-filters) or the `lang:LANGUAGE` query syntax. For example, `build lang:go` returns results for the keyword `build` in Go files.

### File name search

Use `file:KEYWORD` to search file names. For example, `file:README` returns file names containing `README`.

### Search scope

A search that starts inside a repository is scoped to that repository automatically. To search more than one repository, go to a [Harness project, organization, or account](/docs/platform/get-started/key-concepts) and search recursively across every repository in that scope.

Searching from the organization view covers all repositories at organization level and all repositories in every project in that organization. Searching from the account view covers every repository across the account and all organizations.

Use the **Repository** [search results filter](#search-results-filters) to limit results to specific repositories in the current scope. Within an account or organization search, you can also disable recursive search and query only the repositories at that level.

---

## Search results

Search results include matches in code, file names, and file paths. Keyword search does not currently cover non-code entities such as pull requests, tags, and branches.

- **File name or path match:** Displays the full file path with the matching portion highlighted.
- **Code match:** Displays the file path and up to 25 matching code snippets per file.

Select a search result to open the **Files** page for that file.

### Search results filters

Depending on your query and search context, you can filter results by repository, file path, or language. The repository filter covers only repositories you can access.

<!-- TODO(SME): Document the indexing behavior readers need in order to trust an empty result: how soon a new commit becomes searchable, whether every file type is indexed, and whether a repository size or file size limit excludes content from the index. -->

---

## Related concepts

You can now build precise queries and scope them to the right set of repositories.

- [Clone a repository](/docs/code-repository/work-in-repos/clone-repos): Work with results locally after you find them.
- [Branch](/docs/code-repository/work-in-repos/branch): Switch branches before searching a different line of work.
- [Harness key concepts](/docs/platform/get-started/key-concepts): Review how account, organization, and project scope relate.
