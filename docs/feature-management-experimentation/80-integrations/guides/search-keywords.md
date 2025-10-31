---
title: Searching Keywords in GitHub
description: Learn how to use the GitHub API to programmatically search a keyword in a GitHub repository.
sidebar_position: 8
sidebar_label: Searching Keywords in GitHub
---

## Overview

Use the following Python script to search for a keyword in a repository and export the matching lines to a CSV file using the GitHub API. This can be used to locate all references to Split SDK method calls like `getTreatment` across a codebase.

### Prerequisites

The following environments:

- Python 2.7.15
- requests 2.20.1

## Prepare the Python script

1. Open `Constants.py` and update the following:

  * `REPO` with the GitHub repository in [owner]/[repo] format.
  * `TOKEN` with your GitHub personal access token (required to use the GitHub Search API and access private repos).
  * `KEYWORD` with the term you'd like to search for, such as getTreatment or a wrapper method used by your team.
  * Optionally, update the log file name (`LOG_FILE`) and output path for CSV results (`CSV_PATH`).

## Run the Python script

```bash
python Main.py
```

A CSV file will be generated with the name format `[CSV file name]_[Keyword].csv`. Each row contains the file path, line number, and matching code line.

For more information on the GitHub Search API, see the [GitHub REST API documentation](https://docs.github.com/en/rest/search?apiVersion=2022-11-28).