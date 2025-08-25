---
title: Generating a MongoDB Changelog from an Existing Database
sidebar_label: MongoDB Changelog Generation
description: Automatically generate a Liquibase-compatible changelog from an existing MongoDB database using a Python script in Harness Database DevOps pipelines, and commit it to Git for version control.
slug: /database-devops/mongodb-changelog-generation
sidebar_position: 15
keywords:
  - mongodb
  - liquibase
  - database devops
  - harness db devops
  - schema versioning
  - changelog generation
  - ci/cd for databases
  - db schema automation
  - database change tracking
  - harness pipelines
  - pymongo
tags:
  - mongodb
  - database devops
  - harness
  - liquibase
  - changelog
  - ci/cd
---
import CommitToGit from "./../snippets/commit-to-git.md";

Harness Database DevOps enables teams to integrate database schema changes into Git-driven workflows.
When onboarding an existing **MongoDB** database, you can use the `MongoDB.py` Python script to extract the current schema and generate a **Liquibase-compatible changelog**.
This changelog can then be versioned in Git and used in subsequent deployments, ensuring auditability and consistency across environments.

By automating this process in a Harness pipeline, you can:
- Avoid manual changelog creation for legacy or existing databases
- Standardize schema tracking using Liquibase-compatible formats (JSON or YAML)
- Keep your database changes version-controlled with peer review

## Prerequisites

If you're unfamiliar with generating or structuring a changelog, you may want to explore our general [build a changelog](https://developer.harness.io/docs/database-devops/get-started/build-a-changelog) guide first—it covers schema migration fundamentals, best practices, and format patterns. Before implementing the pipeline, ensure the following:

- Pipeline execution environment can connect to your MongoDB instance  
- The Git connector used in the pipeline has **commit** permissions  
- MongoDB credentials have **read-only** access for schema extraction

## Pipeline Implementation

### Create a New Pipeline

1. Go to your Harness pipeline.
2. Click on "**Create a Pipeline**"
3. In the Stage, select "Custom" and then create a "Step Group".
4. Add the **GitClone** step.
5. Then a new add step, **Run**
![MongoDB Changelog Generation](./static/dbops-mongo-changelog.png)
- **Container Registry**: used to pull images from private or public registries.
- **Image**: "`python:3.11-alpine`"
- **Shell**: "`Python`"
- **Command**: Add the following script under the command palette:

```bash
# ====== Install Dependencies ========
import subprocess
import sys
subprocess.check_call([sys.executable, "-m", "pip", "install", "pymongo", "pyyaml"])

# ====== Import Libraries ===========
import os
from pymongo import MongoClient
import yaml
import json

# === CONFIG ===
MONGO_URI = "mongodb://<username>:<password>@<host>:27017"
DATABASE_NAME = "test"
OUTPUT_FILE = "generated.yml"
AUTHOR = "Animesh"  # Change as needed
CHANGESET_ID = "baseline-collections"

# === SETUP ===
client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]
collections = db.list_collection_names()

# === BUILD YAML STRUCTURE ===
changesets = []

for name in collections:
    if(name=="DATABASECHANGELOGLOCK" or name=="DATABASECHANGELOG"):
        continue
    changes = []
    # Add createCollection
    collection_options = db[name].options()
    changes.append({'createCollection': {'collectionName': name,'options':json.dumps(collection_options)}})
    
    # Add createIndex for all non-_id indexes
    indexes = db[name].index_information()

    print("processing indexes for collection: "+name+"\r\n" + json.dumps(indexes))
    for index_name, index_data in indexes.items():
        if index_name == "_id_":
            continue
        index_fields = index_data['key']
        index_for_changelog = {}
        unique = index_data.get('unique',False)
       
        for currentIndex in index_fields:
            index_for_changelog.update({currentIndex[0]:currentIndex[1]})
        change = {
            'createIndex': {
                'collectionName': name,
                #'indexName': index_name, TODO: move to options
                'keys': json.dumps(index_for_changelog) ,
                'options': json.dumps({"name":index_name,"unique":index_data.get('unique',unique)})
            }
        }
        if index_data.get('unique', False):
            change['createIndex']['unique'] = True
        changes.append(change)
    changesets.append(
            {'changeSet': {
                'id': CHANGESET_ID+"-"+name,
                'author': AUTHOR,
                'changes': changes
            }})

# Final YAML structure
changeset = {
    'databaseChangeLog': changesets
}

# === WRITE TO FILE ===
with open(OUTPUT_FILE, "w") as f:
    yaml.dump(changeset, f, sort_keys=False)

print(f"✅ YAML baseline changelog with indexes written to: {OUTPUT_FILE}")
```

In the above script:
- Update the `MONGO_URI` to your MongoDB connection string.
- Set the `DATABASE_NAME` to the name of your database.
- Specify the `OUTPUT_FILE` name as needed.
- Change the `AUTHOR` and `CHANGESET_ID` variables to reflect your changes.

<CommitToGit />

![Commit to Git](./static/dbops-mongo-diffchangelog.png)
This step will ensure that the generated changelog file is committed to your Git repository, allowing you to track changes and maintain version control over your database schema changes.

## Best Practices
- Store changelogs in a dedicated folder (e.g., `/db/changelog/`)
- Validate changelog generation in a staging pipeline before committing to production branches
- Parameterize connection details using Harness pipeline variables
- Always use a read-only MongoDB user for schema extraction
By integrating this process into Harness pipelines, you ensure repeatable, auditable, and version-controlled database schema onboarding.

## FAQs
### 1. Can I change the changelog filename?
Yes. Update the OUTPUT_FILE variable in the script to set a custom filename.
### 2. Does it support JSON output instead of YAML?
Currently, the script outputs YAML. You can modify the yaml.dump section to use json.dump if JSON output is preferred.
### 3. How are indexes handled?
All non-_id indexes are included in the changelog with createIndex changes. The script preserves uniqueness flags.
### 4. How do I avoid including Liquibase internal collections?
The script automatically excludes DATABASECHANGELOG and DATABASECHANGELOGLOCK collections.
