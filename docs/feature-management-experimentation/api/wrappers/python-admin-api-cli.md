---
title: Python Admin API Command-Line Interface (CLI)
description: Learn how to use the Python Admin API CLI.
sidebar_position: 1
sidebar_label: Python Admin API CLI
---

## Overview

With the Python Admin API command-line interface (CLI), you can:

* Search for projects, environments, groups, users, feature flags, and segments
* List all projects, environments, groups, users, feature flags, and segments
* Export detailed definitions to JSON and optionally convert to CSV
* Copy (clone) feature flags and segments
* Delete groups, segments, and feature flags

This Python tool utilizes Split's Python PyPi library for Split REST Admin API. 

For more information, see the [GitHub repository](https://github.com/Split-Community/split_support_tools/tree/main/python_admin_api_tool).

## Setup

1. If you don’t have Python 3 installed, [install it](https://www.python.org/downloads/).

   * If you are using MacOS, the `python` command is `python3`.
   * Run the following command to create an alias for `python`:

     ```bash
     echo "alias python=python3\nalias pip=pip3" >> ~/.zprofile
     source ~/.zprofile
     ```
   * Now your `python` command on MacOS runs python3.

1. Clone this repository and access it using the following commands:

   ```bash
   git clone https://github.com/Split-Community/split_support_tools.git
   cd split_support_tools/python_admin_api_tool/
   ```

1. Create a virtual environment using the following commands

   ```bash
   python -m venv venv
   source venv/bin/activate
   ```

1. Install the requirements using the following commands:

   ```bash
   pip install -r requirements.txt
   ```

1. Make a copy of the example environment variables file using the following command:

   ```bash
   cp env_sample .env
   ```

1. Add your Admin API Key to the `.env` file you just created.

   :::tip
   Harness recommends using an API key that is scoped across all environments and projects. If the environment or project has access restrictions, you may encounter an error.

   In cases like these, you can manually edit or ensure the API key that you are using has proper access, and temporarily disable the approval so the tool can work.
   :::

1. Run the tool using the following commands:

   ```bash
   python admin_api_tool.py
   ```

   If you are using MacOS, run the following command:

   ```bash
   python3 admin_api_tool.py
   ```

## Caching

To reduce API calls and improve response time, the script caches feature flag definitions and segment definitions on the first run if there is no cache data. Other data will be cached on the first use.

:::info
If you make changes to your feature flags or segment definitions, Harness recommends updating the cache using the Update Cache option.
:::

## Usage

The menu is straightforward with the options. There are 5 choices:

* [Search](#search)
* [List](#list)
* [Export](#export)
* [Operations](#operations)
* [Update Cache](#update-cache)

### Search

The following options are available for search:

```bash
1. Search Workspaces Or Groups
   - This searches for the name of the projects (formerly called workspaces) or the groups in your account.

2. Search Environments
   - This searches for all the environments of the same name across all projects.

3. Search Users
   - Requires the email of the users being searched. This shows information of the user and which group they are in.

4. Search Feature Flags
   - This searches for all feature flags of the same name across all projects and environments.
   - When a feature flag is found, the user can choose to export the following:
      * This feature flag's definition from a specific environment to json
      * The treatment keys to csv
      * The list of the targeting rules csv

5. Search Segments
   - This will search for all segments of the same name across all projects and environments, and will also display all the keys of the segments.
   - When a segment is found, the user can choose to export the following:
      * The segment keys to csv
```

### List

The following options are available for list:

```bash
1. List all workspaces
   - List all projects (formerly called workspaces) in the account.

2. List all environments
   - List all environments across all projects.

3. List all groups
   - List all the groups and the list of users.

4. List all segments
   - List all the segments and keys of each for all environments and projects.

5. List all feature Flags
   - List all the feature flags across all projects, does not show feature flag definitions (use the export option for the definitions).

6. List all users
   - List all users and their statuses.
```

:::info
The List option does not show the full details (such as feature flag definitions or segment keys). To get the comprehensive data, use the Export option.
:::

### Export

The following options are available for export: 

```bash
1. Export environments
   - This exports all environments across all projects.

2. Export groups
   - This exports all groups and the users in each group.

3. Export segments definitions
   - This exports all segments definitions across all projects and environments.

4. Export segments keys
   - This lets the user choose the project, environment, the segment, and export all the keys.

5. Export feature flag definitions
   - This exports all feature flag definitions across all projects and environments.

6. Export feature flags
   - This exports all feature flags (not the definitions) across all projects and environments.

7. Export users
   - This exports all the users and their statuses, as well as group memberships.

8. Export workspaces
   - This exports all projects (formerly called workspaces) in your account.
```

By default, all exports are in JSON format. For more information, see the [JSON to CSV converter](#json-to-csv-converter) section.

### Operations

The following options are available for operations:

```bash
1. Copy segment definitions
   - This allows for copying the keys of one segment to another segment. Users can choose from available lists of projects, environments, and segments to copy.

2. Copy feature flag definitions
   - This allows for copying the definitions of one feature flag to another feature flag. Users can choose from available lists of projects, environments, and feature flags to copy.

3. Delete groups
   - This forcefully deletes the group in the project you specified, regardless of the definitions. Note that this is not reversible!

4. Delete segments
   - This forcefully deletes the segment in the project you specified, regardless of the definitions. Note that this is not reversible!

5. Delete feature flags
   - This forcefully deletes the feature flag in the project you specified, regardless of the definitions. Note that this is not reversible!
```

### Update Cache

Harness recommends running this option after you have made changes to your feature flags or segments to ensure FME receives the most recent data.

## `DEBUG` Logging

If you run into issues, you can run the script with debug logging enabled for better troubleshooting:

```bash
python admin_api_tool.py --debug
```

## JSON to CSV converter

You can use the provided `convert_json_csv.py` to convert your JSON files to CSV files. 

In the same directory of your JSON files, run the following command:

```bash
python convert_json_csv.py
```
