---
title: Search
description: Use built-in keyword search to query your codebase.
sidebar_position: 50
---

Use the **Code Search** functionality to search for a given keyword in your codebase. If you are viewing a specific repo, the search queries the current repo. If you search at the project level (from the **Repositories** list), the search queries all repos in the current project.

## Search syntax and filters

In addition to keyword strings, you can use query syntax and filters to refine your search:

* **Match exact string:** Wrap your keyword string in quotation marks to query exact string matches.
   * For example, searching `yarn install` returns results containing both keywords anywhere (not necessarily adjacent to each other); whereas, searching `"yarn install"` returns only results containing that exact phrase in the specified order.
* **Boolean operators:** Use Boolean operators `and`, `or`, and `not` to create more inclusive, exclusive, or complex queries.
   * You must wrap your keywords in quotation marks to distinguish them from the Boolean operators. For example, `"yarn" or "install"`.
   * Any plain keyword phrase is treated as `and`. For example, `yarn install` is the same as `"yarn" and "install"`.
   * You can also use a hyphen or minus sign (`-`) for `not`. For example, `yarn -install` is the same as `"yarn" not "install"`.
* **Simple regex:** Keyword search has some support for simple regex, but more complex expressions might not function as expected.
* **Language search:** Use `lang:LANGUAGE` to filter your search to a specific source code language.
   * For example `build lang:go` returns results for the keyword `build` in Go files.
* **File name search:** Use `file:KEYWORD` to search for a keyword in file names.
   * For example `file:README` returns results for file names containing `README`.
* **Repository search:** If you search at the project level (from the **Repositories** list), use `repo:REPOSITORY_NAME` to filter your search to a specific repo in the current project.
   * If you start a search within a specific repository, your search is automatically scoped to the current repo.
   * You can only search repos that you can access.
   * Currently, keyword search can't search across an entire organization or account at once.

## Search results

Search results can include matches in code, file names, and file paths. Currently, keyword search doesn't include non-code entities (such as PRs, tags, and branches).

Matches in a file name or file path display the full file path with the matching portion highlighted.

Matches in your code (within a file) display the file path and up to 25 matching code snippets per file.

Depending on your query and search context, you can filter search results by repository, file path, or language. The repository filter is limited to repositories that you can access.

Select a search result to go to the **Files** page for the selected file.
