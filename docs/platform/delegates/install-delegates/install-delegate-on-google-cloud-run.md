---
title: Install a delegate on Google Cloud Run
description: This topic explains how to configure Harness delegate on Google Cloud Run.
sidebar_position: 3
helpdocs_topic_id: ql86a0iqta
helpdocs_category_id: m9iau0y3hv
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness Delegates typically run on VMs, Kubernetes clusters, or ECS Fargate, but Google Cloud Run presents a lightweight, cost-efficient, and scalable alternative.

This guide provides step-by-step instructions to configure a Harness Delegate on Google Cloud Run. Harness Delegate is essential for connecting your infrastructure with the Harness platform, enabling seamless deployments. 

### Prerequisites

1. Ensure you have an active [Harness account](https://app.harness.io) with the necessary permissions. 

2. A Google Cloud service account with appropriate IAM roles:
    
    ```bash
    roles/run.admin # - Cloud Run Admin
    roles/iam.serviceAccountUser # - Service Account User
    roles/artifactregistry.reader # - For pulling images from GAR
    ```

### Harness Delegate on Google Cloud Run

To configure a delegate on Google Cloud Run:  

    1. Log in to your Harness account.  

    2. Navigate to Account Settings → Account-level Resources → Delegate.  

    3. Click **New Delegate** to access the installation steps as show below:

        ```bash
            docker run --cpus=1 --memory=2g \
            -e DELEGATE_NAME=docker-delegate-demo \
            -e NEXT_GEN="true" \
            -e DELEGATE_TYPE="DOCKER" \
            -e ACCOUNT_ID=gVcEXXXXXXXXA3JqA \
            -e DELEGATE_TOKEN=ZmY5MXXXXBlMTIwOXXXXXXXQ2Zjc1NjI4MDQ= \
            -e DELEGATE_TAGS="" \
            -e MANAGER_HOST_AND_PORT=https://app.harness.io/gratis 24.10.84107
        ```

     Save the installation details for later use.

    4. Login to your [Google Cloud Run](https://console.cloud.google.com/run), Select an existing project or create a new one as needed.
 
        - Check for Deploy container → Service as shown below:

           ![deploy-container](./static/deploy-container.gif).
        
    5. To Create Service  
             


