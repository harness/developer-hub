---
sidebar_position: 1
description: Detect and prevent secrets from being committed to your repository.
---

# Secret Scanning

In Gitness, you can [enable security features](https://docs.gitness.com/repositories/security) to protect your code and prevent secrets from being pushed to your Git repositories. This guide will show you how to prevent credentials from accidentally being committed to your repository.

## How does it work?

You can utilize Gitness's built-in [Gitleaks](https://github.com/gitleaks/gitleaks)  integration to prevent hardcoded secrets such as passwords, API keys, and tokens from being introduced into your Git repository during a push. This reduces the potential for leaking valuable IP or compromising security. By scanning every push, your secrets are never added to the repository history, thus reducing the chance of a leak and eliminating the need to rewrite Git history.

To enable secret scanning for individual repositories, simply activate it for the desired repository. Once enabled, any push event to that repository containing a commit matching a [recognized secret pattern](https://github.com/gitleaks/gitleaks/blob/master/config/gitleaks.toml) is denied.

## Prevent AWS credentials from being committed

In this section, you'll learn how to prevent AWS credentials from being committed to your repository. Follow the [quick start guide](https://docs.gitness.com/) to start using Gitness, then proceed to [create](https://docs.gitness.com/repositories/overview#create-a-repository) or [import](https://docs.gitness.com/repositories/overview#import-a-repository) a repository. Finally, refer to the [secret scanning documentation](https://docs.gitness.com/repositories/security) to enable secret scanning for your repository.

Next, [clone](https://docs.gitness.com/repositories/cloning) the repository to your local machine and open it in your favorite code editor. Then, create a new file named `aws-creds.config` with the following content:

```shell
AWS_ACCESS_KEY="AKIAIOSFODNN7EXAMPLE"
AWS_SECRET_ACCESS_KEY="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
```

:::note

These credentials, sourced from [AWS Docs](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html), are not valid.

:::

Now try to push this commit to the remote repository. You should see the following error on the git log:

```shell
remote: Push contains secret:        
remote: 
remote: aws-access-token in config:1        
remote: Secret:  AKIAIOSFODNN7EXAMPLE        
remote: Commit:  1469e0435ac535dfd552ab443248493fc4fb1192        
remote: Details: Identified a pattern that may indicate AWS credentials, risking unauthorized cloud resource access and data breaches on AWS platforms.
remote: 
remote: 1 secret found in 1ms 
```

:::note

According to the [Gitleaks AWS rules for secrets](https://github.com/gitleaks/gitleaks/blob/master/cmd/generate/config/rules/aws.go), only one of the two secrets will be identified as a secret.

:::
