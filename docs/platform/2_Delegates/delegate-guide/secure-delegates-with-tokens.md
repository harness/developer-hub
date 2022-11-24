---
title: Secure delegates with tokens
description: Secure Delegate to Harness communication by replacing the default Delegate token with new tokens.
# sidebar_position: 2
helpdocs_topic_id: omydtsrycn
helpdocs_category_id: m9iau0y3hv
helpdocs_is_private: false
helpdocs_is_published: true
---

Delegate tokens are used by Harness to encrypt communication between Harness Delegates and the Harness Manager. By default, when a new Harness account is created, all Harness Delegates in that account include the same token.

You can further secure Delegate to Harness communication by replacing the default Delegate token with new tokens. You can add and revoke Delegate tokens per your governance policies and replace revoked tokens with custom tokens when needed.

In this topic:

* [Before You Begin](https://ngdocs.harness.io/article/omydtsrycn-secure-delegates-with-tokens#before_you_begin)
* [Step 1: Generate a New Token](https://ngdocs.harness.io/article/omydtsrycn-secure-delegates-with-tokens#step_1_generate_a_new_token)
	+ [Generate a Token when Creating a Delegate](https://ngdocs.harness.io/article/omydtsrycn-secure-delegates-with-tokens#generate_a_token_when_creating_a_delegate)
	+ [Generate a Token without Creating a Delegate](https://ngdocs.harness.io/article/omydtsrycn-secure-delegates-with-tokens#generate_a_token_without_creating_a_delegate_2)
* [Option: Update and Restart Existing Delegate](https://ngdocs.harness.io/article/omydtsrycn-secure-delegates-with-tokens#option_update_and_restart_existing_delegate)
	+ [Kubernetes Delegate](https://ngdocs.harness.io/article/omydtsrycn-secure-delegates-with-tokens#kubernetes_delegate)
	+ [Docker Delegate](https://ngdocs.harness.io/article/omydtsrycn-secure-delegates-with-tokens#docker_delegate)
* [Option: Revoke Tokens](https://ngdocs.harness.io/article/omydtsrycn-secure-delegates-with-tokens#option_revoke_tokens)

### Step 1: Generate a new token

You can generate a new token when you create a Delegate or as a separate process.

#### Generate a token when creating a delegate

When you create a new Delegate, you can generate a new token.

In **Delegate Setup**, in **Delegate Tokens**, click **Add**, and then name and apply the new token:

![](https://files.helpdocs.io/i5nl071jo5/articles/omydtsrycn/1647384869537/clean-shot-2022-03-15-at-15-54-03.png)The new token is created and its value is copied to your system clipboard. The new token also appears in the list using the name you gave it.

Save the new token value. You cannot retrieve the token value after this.

Now you can update the Delegate(s) with the new token.

In **Delegate Tokens**, select the new token.

#### Generate a token without creating a delegate

In Harness, click **Project Setup > Delegates** in a Project or **Account Settings > Account Resources > Delegates** for the entire account.

Click **Tokens**. Here you can see, create, and revoke all Delegate tokens.

Click **New Token**.

Here's an Account Settings example:

![](https://files.helpdocs.io/i5nl071jo5/articles/omydtsrycn/1647384471625/clean-shot-2022-03-15-at-15-46-52.png)Enter a name for the new token, and then click **Apply**.

You can copy the token and save it somewhere safe, if needed.

![](https://files.helpdocs.io/i5nl071jo5/articles/omydtsrycn/1647384579220/clean-shot-2022-03-15-at-15-49-24.png)The new token is created and its value is copied to your system clipboard. The new token also appears in the list using the name you gave it.

Save the new token value. You cannot retrieve the token value after this.

When you install a new Delegate, you can select the token to use:

![](https://files.helpdocs.io/i5nl071jo5/articles/omydtsrycn/1647384785437/clean-shot-2022-03-15-at-15-50-53.png)### Option: Update and restart existing delegate

You can update an existing Delegate with a new token value and then restart the Delegate.

#### Kubernetes delegate

The Delegate is set up using the **harness-delegate.yaml** you downloaded originally.

Edit the **harness-delegate.yaml** you downloaded originally with the new token and then run `kubectl apply -f harness-delegate.yaml` to restart the Delegate pods.

Paste the token in the Delegate `ACCOUNT_SECRET` setting in the `StatefulSet` spec:


```
...  
---  
  
apiVersion: apps/v1  
kind: StatefulSet  
...  
        env:  
...  
        - name: ACCOUNT_SECRET  
          value: [enter new token here]  
...
```
Run `kubectl apply -f harness-delegate.yaml`

The Delegate pods get restarted automatically. The pods will restart and take the updated settings.

#### Docker delegate

You will destroy and recreate the container using the **docker-compose.yml** you downloaded originally.

Paste the token in the Delegate settings:


```
version: "3.7"  
services:  
  harness-ng-delegate:  
    restart: unless-stopped  
    deploy:  
      resources:  
        limits:  
          cpus: "0.5"  
          memory: 2048M  
    image: harness/delegate:latest  
    environment:  
      - ACCOUNT_ID=12345678910  
      - ACCOUNT_SECRET=[enter new token here]  
      - MANAGER_HOST_AND_PORT=https://app.harness.io  
      - WATCHER_STORAGE_URL=https://app.harness.io/public/pro  
...
```
Create a new container: `docker-compose -f docker-compose.yaml up -d`.

You can verify that the environment variable has the new token using `docker exec [container ID] env`.

### Option: Revoke tokens

On the **Tokens** page, click **Revoke** to revoke any token.

![](https://files.helpdocs.io/i5nl071jo5/articles/omydtsrycn/1647385557250/clean-shot-2022-03-15-at-16-05-24.png)Click **Revoke**. The token is revoked. The Harness Manager will not accept connections from any Delegates using this revoked token.

