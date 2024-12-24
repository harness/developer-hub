---
title: Python command line interface (CLI) for FME API
sidebar_label: Python command line interface (CLI) for FME API
helpdocs_is_private: false
helpdocs_is_published: true
sidebar_position: 1
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/15249943602957-Python-Admin-API-command-line-interface-CLI </button>
</p>

<p dir="auto">
  With the Python Admin API command-line interface, (CLI), you can:
</p>
<ul>
  <li dir="auto">
    Search for projects, environments, groups, users, feature flags, and segments
  </li>
  <li dir="auto">
    List all projects, environments, groups, users, feature flags, and segments
  </li>
  <li dir="auto">
    Export detailed definitions to JSON and optionally convert to CSV
  </li>
  <li dir="auto">Copy (clone) feature flags and segments</li>
  <li dir="auto">Delete groups, segments, and feature flags</li>
</ul>

<p>
  This Python tool utilizes Split's <a href="https://help.split.io/hc/en-us/articles/4412331052685-Python-PyPi-library-for-Split-REST-Admin-API" rel="nofollow">Python PyPi library for Split REST Admin API</a>.
</p>

<p>
  Github repo:
  <a href="https://github.com/Split-Community/split_support_tools/tree/main/python_admin_api_tool">https://github.com/Split-Community/split_support_tools/tree/main/python_admin_api_tool</a>
</p>

## Setting up

<ol dir="auto">
  <li>
    If you don’t have Python 3 installed, <a href="https://www.python.org/downloads/" rel="nofollow">install it from here</a>
  </li>
</ol>
<ul dir="auto">
  <li>
    Note that on MacOS, the python command is `python3`.
  </li>
  <li>Run the following command to create an alias for python.</li>
</ul>

```bash
echo "alias python=python3\nalias pip=pip3" >> ~/.zprofile

source ~/.zprofile
```

<ul dir="auto">
  <li>
    Now your `python` command
    on MacOS runs python3.
  </li>
</ul>
<ol dir="auto" start="2">
  <li>Clone this repository and access it as follows:</li>
</ol>

```bash
git clone https://github.com/Split-Community/split_support_tools.git

cd split_support_tools/python_admin_api_tool/
```

<ol dir="auto" start="3">
  <li>Create a new virtual environment.</li>
</ol>

```bash
python -m venv venv

source venv/bin/activate
```

<ol dir="auto" start="4">
  <li>Install the requirements.</li>
</ol>

```bash
pip install -r requirements.txt
```

<ol dir="auto" start="6">
  <li>Make a copy of the example environment variables file.</li>
</ol>

```bash
cp env_sample .env
```

<ol dir="auto" start="7">
  <li>
    Add your <a href="https://help.split.io/hc/en-us/articles/360019916211-API-keys#adding-admin-api-keys" rel="nofollow">Admin API key</a> to
    the newly created `.env` file.
  </li>
</ol>
<ul dir="auto">
  <li>
    Note that it's recommended to use an API key that is scoped across all environments
    and projects
  </li>
  <li>
    If the environment/project has access restrictions, you might encounter an
    error.
  </li>
</ul>
<ol dir="auto" start="8">
  <li>Run the tool</li>
</ol>

```bash
python admin_api_tool.py
```

<p dir="auto">or on MacOS</p>

```bash
python3 admin_api_tool.py
```

## Caching

<p dir="auto">
  To reduce API calls and improve response time, the script caches feature flag
  definitions and segment definitions on the first run if there is no cache data.
  Other data will be cached on the first use.
</p>
<p dir="auto">
  <strong>Note: If you make changes to your feature flags or segment definitions, it's recommended that you update the cache using the Update Cache option.</strong>
</p>

## Usage

<p dir="auto">
  The menu is straightforward with the options. There are 5 choices:
</p>
<ul>
  <li dir="auto">Search</li>
  <li dir="auto">List</li>
  <li dir="auto">Export</li>
  <li dir="auto">Operations</li>
  <li dir="auto">Update Cache</li>
</ul>

### Search

<p dir="auto">The Search options are:</p>

```
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

<p>
  The List options are self-explanatory. Note that these do not show the full details
  (such as feature flag definitions or segment keys), please use the Export functions
  to get the full data.
</p>

```
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

### Export

<p>
  The Export options are straightforward. By default, all exports are json format.
</p>
<p>
  Also refer to the
  <a href="#additional-tool-json-to-csv-converter">Additional tool (JSON to CSV converter)</a>
  for more information.
</p>

```
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

### Operations

<p>
  The Operations mutates or changes your feature flags/segments/projects/environments.
  More options will be added over time.
</p>

```
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

<p>
  It's recommended to run this option after you have made changes to feature flags
  or segments to ensure the latest data.
</p>

## DEBUG Logging

<p dir="auto">
  If you run into issues, you can run the script with debug logging enabled for
  better troubleshooting:
</p>

```bash
python admin_api_tool.py --debug
```

## Additional tool (JSON to CSV converter)

<p dir="auto">
  You can use the provided `convert_json_csv.py` to
  convert your json files to csv. Simply run
</p>

```bash
python convert_json_csv.py
```

<p dir="auto">In the same directory of your json files.</p>

## Additional notes

<p dir="auto">
  The admin tool does not work properly for projects that require approval or have
  access restrictions.
</p>
<p dir="auto">
  When that happens, you either have to manually do the edit, or you have to make
  sure the API key you are using has proper access and temporarily disable the
  approval so the tool can work.
</p>