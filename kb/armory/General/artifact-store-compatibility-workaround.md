---
title: Artifact Store Compatibility 1.32.x to 1.34.x
---

## Problem Description 

Armory CD 2.32.0 (OSS Spinnaker 1.32.0) introduced support for [artifact storage](https://spinnaker.io/changelogs/1.32.0-changelog/#artifact-store) 
with AWS S3.
This feature compresses embdedded/base64 artifacts to remote/base64 and uploads them to an AWS S3 bucket significantly
reducing the artifact size in the execution context.

Armory CD 2.32.x (OSS Spinnaker 1.32.x) releases the Artifacts are stored in the following location in the artifact storage S3 bucket:
- `s3://bucket/ref://application/hash`

Armory CD 2.34.x (OSS Spinnaker 1.34.0) onwards the location of the artifacts in the S3 artifact storage bucket changed to:
- `s3://bucket/application/hash`

> [!CAUTION]
> 
> This change of the artifact location in the S3 bucket breaks the Read operations when upgrading from Armory CD 2.32.x → 2.34.x
> and when downgrading from 2.34.x → 2.32.x

## Workaround
To avoid any issues with reading the previously stored artifacts from the S3 bucket, an admin user can manually copy 
(or move) the location of the artifacts between versions.

### When upgrading from 2.32.x
- Copy the artifacts from the ref:// prefix location to the root location of the S3 bucket (remove the --dryrun argument when ready to execute)

```bash
aws s3 cp --recursive "s3://$ARTIFACT_STORE_BUCKET/ref://" "s3://$ARTIFACT_STORE_BUCKET" --include "*"  --dryrun
```

### When downgrading from 2.34.x
- Copy the artifacts from the root location to the ref:// location of the S3 bucket (remove the --dryrun argument when ready to execute)

```bash
aws s3 cp --recursive "s3://$ARTIFACT_STORE_BUCKET" "$ARTIFACT_STORE_BUCKET/ref://" --exclude "ref:/*"  --dryrun
```

Alternative you can use the following bash script by specifying the following arguments:
- Artifact Store S3 bucket name
- Target version of compatibility of your Armory CD installation
- Dryrun (optional); defaults to true

```bash
#!/bin/bash

ARTIFACT_STORE_BUCKET=$1
TARGET_VERSION=$2
DRYRUN=${3:-true}

if [ -z "$1" ] || [ -z "$2" ]; then
  echo "Error: Both the artifact store bucket and target version must be provided."
  echo "Usage: $0 <artifact_store_bucket> <target_version> [dryrun](true|false)"
  exit 1
fi

function compare_semver() {
  local v1=$1
  local v2=$2

  # Split the versions into major, minor, and patch components
  local IFS=.
  read -ra v1_arr <<< "$v1"
  read -ra v2_arr <<< "$v2"

  # Compare major versions
  if (( ${v1_arr[0]} > ${v2_arr[0]} )); then
    echo 1
  elif (( ${v1_arr[0]} < ${v2_arr[0]} )); then
    echo -1
  else
    # Compare minor versions
    if (( ${v1_arr[1]} > ${v2_arr[1]} )); then
      echo 1
    elif (( ${v1_arr[1]} < ${v2_arr[1]} )); then
      echo -1
    else
      # Compare patch versions
      if (( ${v1_arr[2]} > ${v2_arr[2]} )); then
        echo 1
      elif (( ${v1_arr[2]} < ${v2_arr[2]} )); then
        echo -1
      else
        echo 0
      fi
    fi
  fi
}

result=$(compare_semver "$TARGET_VERSION" "2.34.0")

if [ "$DRYRUN" = true ]; then
  DRYRUN_OPTION="--dryrun"
else
  DRYRUN_OPTION=""
fi

if [[ $result -eq -1 ]]; then
  aws s3 cp --recursive "s3://$ARTIFACT_STORE_BUCKET" "$ARTIFACT_STORE_BUCKET/ref://" --exclude "ref:/*"  $DRYRUN_OPTION
else
  aws s3 cp --recursive "s3://$ARTIFACT_STORE_BUCKET/ref://" "s3://$ARTIFACT_STORE_BUCKET" --include "*"  $DRYRUN_OPTION
fi
```

### Example Usage
1. Create a bash script with the above content and save it as `artifact-store-compatibility.sh`
2. Log in to the AWS account in a terminal session
3. Execute the script with the appropriate arguments as described above
4. Verify the dryrun output and then rerun with the `dryrun` argument set to `false` to execute the copy operation

#### Example: When upgrading from 2.32.x to 2.34.0
```bash
bash artifact-store-workaround.sh my-bucket-for-artifact-store 2.34.0 true|false
```

#### Example: When downgrading from 2.34.x to 2.32.0
```bash
bash artifact-store-workaround.sh my-bucket-for-artifact-store 2.32.0 true|false
```