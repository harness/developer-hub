---
title: Save and Restore Cache from GCS
description: Caching enables you to share data across stages. It also speed up builds by reusing the expensive fetch operation from previous jobs.
tags: 
   - helpDocs
sidebar_position: 10
helpdocs_topic_id: v0agy0hlyj
helpdocs_category_id: 01tyeraya4
helpdocs_is_private: false
helpdocs_is_published: true
---

Caching has two primary benefits:

* It can make your jobs run faster by reusing the expensive fetch operation data from previous jobs.
* It enables you to share data across Stages.

In a Harness CI Pipeline, you can save the cache to Google Cloud Storage (GCS) bucket in one stage using the Save Cache to GCS step and then restore it in the same or another stage using Restore Cache from GCS step. 

The topic explains how to configure the Save Cache to GCS and Restore Cache from GCS steps in CIE using a two-Stage Pipeline.

You cannot share access credentials or other [Text Secrets](https://ngdocs.harness.io/article/osfw70e59c-add-use-text-secrets) across Stages.

### Before You Begin

* [CI Pipeline Quickstart](../../ci-quickstarts/ci-pipeline-quickstart.md)
* [CI Stage Settings](../../ci-technical-reference/ci-stage-settings.md)
* [Set Up Build Infrastructure](https://docs.harness.io/category/set-up-build-infrastructure)
* [Learn Harness' Key Concepts](../../../getting-started/learn-harness-key-concepts.md)

### Limitations

* You cannot share access credentials or other [Text Secrets](https://docs.harness.io/article/osfw70e59c-add-use-text-secrets) across Stages.
* Use a dedicated bucket for your Harness cache operations. Do not save files to the bucket manually. The Retrieve Cache operation will fail if the bucket includes any files that do not have a Harness cache key.

### Review: YAML Example

If you want to configure your Pipeline in YAML, in **Pipeline Studio,** click **YAML**. 

The following YAML file defines a Pipeline with two Stages: Save Cache and Restore Cache. Copy the following YAML, paste it in the Harness YAML editor, and modify its attributes based on your Pipeline requirements.


```
pipeline:  
    identifier: GCS_Save_and_Restore_Cache  
    name: GCS Save and Restore Cache  
    stages:  
        - stage:  
              identifier: GCS_Save_Cache  
              name: GCS Save Cache  
              type: CI  
              variables:  
                  - name: GCP_Access_Key  
                    type: String  
                    value: <+input>  
                  - name: GCP_Secret_Key  
                    type: Secret  
                    value: <+input>  
              spec:  
                  sharedPaths:  
                      - /.config  
                      - /.gsutil  
                  execution:  
                      steps:  
                          - step:  
                                identifier: createBucket  
                                name: create bucket  
                                type: Run  
                                spec:  
                                    connectorRef: <+input>  
                                    image: google/cloud-sdk:alpine  
                                    command: |+  
                                        echo $GCP_SECRET_KEY > secret.json  
                                        cat secret.json  
                                        gcloud auth -q activate-service-account --key-file=secret.json  
                                        gsutil rm -r gs://harness-gcs-cache-tar || true  
  
                                        gsutil mb -p ci-play gs://harness-gcs-cache-tar  
  
                                    privileged: false  
                          - step:  
                                identifier: saveCacheTar  
                                name: Save Cache  
                                type: SaveCacheGCS  
                                spec:  
                                    connectorRef: <+input>  
                                    bucket: harness-gcs-cache-tar  
                                    key: cache-tar  
                                    sourcePaths:  
                                        - <+input>  
                                    archiveFormat: Tar  
                  infrastructure:  
                      type: KubernetesDirect  
                      spec:  
                          connectorRef: <+input>  
                          namespace: default  
                  cloneCodebase: true  
        - stage:  
              identifier: gcs_restore_cache  
              name: GCS Restore Cache  
              type: CI  
              variables:  
                  - name: GCP_Access_Key  
                    type: String  
                    value: <+input>  
                  - name: GCP_Secret_Key  
                    type: Secret  
                    value: <+input>  
              spec:  
                  sharedPaths:  
                      - /.config  
                      - /.gsutil  
                  execution:  
                      steps:  
                          - step:  
                                identifier: restoreCacheTar  
                                name: Restore Cache  
                                type: RestoreCacheGCS  
                                spec:  
                                    connectorRef: <+input>  
                                    bucket: harness-gcs-cache-tar  
                                    key: cache-tar  
                                    archiveFormat: Tar  
                                    failIfKeyNotFound: true  
                  infrastructure:  
                      useFromStage: gcs_save_cache  
                  cloneCodebase: false  
 
```
### Step 1: Open the Build Stage

In your Harness Pipeline, open the Stage where you want to save the cache.

### Step 2: Define the Build Farm Infrastructure

In the Infrastructure tab, define the build farm for the codebase.

The following step uses a Kubernetes cluster build farm.

See [Define Kubernetes Cluster Build Infrastructure](../set-up-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure.md).

### Step 3: Save Cache to GCS

In the Execution tab, click **Add Step** and then select **Save Cache to GCS**. Here you configure the GCS bucket, keys, and source paths to enable Harness to save the cache to GCS.

For step settings, see [Save Cache to GCS Step Settings](../../ci-technical-reference/save-cache-to-gcs-step-settings.md).

![](./static/save-cache-in-gcs-00.png)

### Step 4: Restore Cache from GCS Stage

In your Pipeline, click **Add Stage** where you want to restore the saved cache from GCS. 

In the Execution tab, click **Add Step** and then select **Restore Cache from GCS**. Here you configure the GCS bucket keys on which you have your saved cache.

For step settings, see [Restore Cache Step Settings](../../ci-technical-reference/restore-cache-from-s-3-step-settings.md).

![](./static/save-cache-in-gcs-523.png)

When you are done, click **Apply Changes**.

### Step 5: Run Pipeline

Click **Save** to save the changes, then click **Run Pipeline**. 

### Step 6: View the Results

You can see the logs for the Pipeline as it runs.

#### Save Cache Stage Output

In the Save Cache stage, you can see the logs for **Save Cache to GCS** step in the Pipeline as it runs.

![](./static/save-cache-in-gcs-524.png)
```
level=info name=drone-cache ts=2021-11-11T09:06:48.834761074Z caller=rebuilder.go:93 component=plugin component=rebuilder msg="cache built" took=253.210746ms
```
#### Restore Cache Stage Output

In the Restore Cache stage, you can see the logs for **Restore Cache from GCS** step in the Pipeline as it runs.

![](./static/save-cache-in-gcs-525.png)

```
level=info name=drone-cache ts=2021-11-11T09:07:00.803158076Z caller=restorer.go:94 component=plugin component=restorer msg="cache restored" took=239.769663ms
```

### See Also

* [Save and Restore Cache from S3](saving-cache.md)

