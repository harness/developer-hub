---
title: Keyword search
description: Use built-in keyword search to query your codebase.
sidebar_position: 50
---

Use the **Code Search** functionality to search for a given keyword in your codebase. If you are viewing a specific repo, the search queries the current repo. If you search at the project level (from the **Repositories** list), the search queries all repos in the current project.

## Search syntax and filters

In addition to keyword strings, you can use query syntax and filters to refine your search.

### Match exact string

Wrap your keyword string in quotation marks to query exact string matches. For example, searching `yarn install` returns results containing both keywords anywhere (not necessarily adjacent to each other); whereas, searching `"yarn install"` returns only results containing that exact phrase in the specified order.

### Boolean operators

Use Boolean operators `and`, `or`, and `not` to create more inclusive, exclusive, or complex queries.

* **And:** Any plain keyword phrase is treated as `and`. **Don't explicitly declare 'and' in your query.** For example, `yarn install` is interpreted as `yarn and install`.
* **Not:** You can use `not` or a hyphen/minus sign (`-`). For example, `yarn -install` is the same as `yarn not install`.
* **Or:** Use `or`, such as `yarn or bundle`.

If searching for the literal words `or` or `not`, wrap your keywords in quotation marks to distinguish them from the Boolean operators. For example, `"if not" or "if else"`.

### Case sensitivity

By default, keyword search is case *insensitive*. If you want to enable case sensitivity, include `case:yes`. For example, `class Button case:yes` searches for files containing `class` and `Button` with case sensitivity.

### Regular Expressions (Regex)

Keyword search has some support for simple patterns and substrings, but for more complex expressions you need to explicitly enable regular regex search by clicking on the `.*` to the right of the search box. This will treat all search patterns as regular expressions.   

We support [RE2 syntax](https://github.com/google/re2/wiki/Syntax).

### Special characters

Search engines and regex use certain characters to trigger specific query functionality, such as asterisks for wildcards. If your keyword strings contain these characters, you must escape them with backslash (`\`) so the search interprets them literally as part of your search phrase.

Special characters requiring escaping include those common to search engines or regex, such as asterisks, colons, single and double quotation marks, parenthesis, curly braces, brackets, ampersands, question marks, hyphens/minus signs, and so on.

For example, if you want to search for the literal string `"feedback"` with the quotation marks, then you need to escape the quotation marks as `\"feedback\"`. Without escaping, your query is treated as [exact string matching](#match-exact-string), and your results include any instance of the word `feedback` with or without punctuation around it.

### Language search

To limit your search to a specific source code language, you can use the **Language** [search results filter](#search-results-filters) or the `lang:LANGUAGE` query syntax. For example, `build lang:go` returns results for the keyword `build` in Go files.

### File name search

Use `file:KEYWORD` to search for a keyword in file names. For example, `file:README` returns results for file names containing `README`.

### Search Scope

If you start a search within a specific repository, your search is automatically scoped to the current repository. If you want to search more than one repository at a time, you can navigate to a [Harness project, organization, or account](/docs/platform/get-started/key-concepts.md) and recursively search all of the repositories within that scope.

For example, if you search from the organization view, it will search all repositories at the organization level and all repositories within every project in that organization. If you search from the account view, it will search every repository across the entire account and all organizations.

You can use the **Repository** [search results filter](#search-results-filters) to limit results to specific repositories in the current scope.

Within an account or organization keyword search you may also disable recursive search and only search the repositories within the respective account or organization itself.  

::: Note
You can only search for code in repositories that you have permission to access.
:::

## Search results

Search results can include matches in code, file names, and file paths. Currently, keyword search doesn't include non-code entities (such as PRs, tags, and branches).

Matches in a file name or file path display the full file path with the matching portion highlighted.

Matches in your code (within a file) display the file path and up to 25 matching code snippets per file.

Select a search result to go to the **Files** page for the selected file.

### Search results filters

Depending on your query and search context, you can filter search results by repository, file path, or language. The repository filter is limited to repositories that you can access.
