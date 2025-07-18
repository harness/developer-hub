---
title: Use a GitHub App to push commits
description: Use a GitHub App to push commits and interact with the GitHub API in your CI pipelines.
sidebar_position: 80
---

> **Note**: Looking for a cleaner solution that works in Harness Cloud?  
> See [Using GitHub App Tokens Securely in Harness CI Pipelines](/docs/continuous-integration/secure-ci/github-app-token-in-harness).

Harness CI's [codebase configuration](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase) uses a code repo connector to clone your code, push status updates to PRs, and create and use repo webhooks. If your code is stored in GitHub repos, you can [use a GitHub App in a Harness GitHub connector](https://developer.harness.io/docs/platform/connectors/code-repositories/git-hub-app-support) for authentication.

However, if you need your CI pipeline to commit and push changes to your repo, the code repo connector doesn't support pushing to the cloned repo.

If you need a CI pipeline to push changes to a repo, use the instructions in this article to configure a **Custom Secrets Manager** setup to generate a dynamic personal access token from the same GitHub App used by your code repo connector. Then, you can run your commit and push commands in a [Run step](https://developer.harness.io/docs/continuous-integration/use-ci/run-step-settings) using the generated credentials.

## Create a secrets manager template

First, [create a secrets manager template](https://developer.harness.io/docs/platform/templates/create-a-secret-manager-template) at the account level.

1. Go to your Harness **Account Settings** and select **Templates** under **Account Resources**.
2. Select **New Template**, and then select **Secrets Manager**.

   <DocImage path={require('../static/github-app-pat-dispenser-1.png')} width="60%" height="60%" title="Click to view full size image" />

3. For **Name**, enter `GitHub App PAT Dispenser` or another recognizable name.
4. For **Version Label**, enter `1`.
5. Select **Start**.
6. Switch to the YAML editor using the toggle at the top of the template page.
7. Edit the YAML and append the following to the existing YAML:

```yaml
  spec:
    shell: Bash
    delegateSelectors: []
    source:
      type: Inline
      spec:
        script: |-
          set -o pipefail

          app_id=<+secretManager.environmentVariables.app_id>
          pem="
          <+secretManager.environmentVariables.github_app_private_key>
          "

          now=$(date +%s)
          iat=$((${now} - 60)) # Issues 60 seconds in the past
          exp=$((${now} + 600)) # Expires 10 minutes in the future

          b64enc() { openssl base64 | tr -d '=' | tr '/+' '_-' | tr -d '\n'; }

          header_json='{
              "typ":"JWT",
              "alg":"RS256"
          }'
          # Header encode
          header=$( echo -n "${header_json}" | b64enc )

          payload_json='{
              "iat":'"${iat}"',
              "exp":'"${exp}"',
              "iss":'"${app_id}"'
          }'
          # Payload encode
          payload=$( echo -n "${payload_json}" | b64enc )

          # Signature
          header_payload="${header}"."${payload}"
          signature=$(
              openssl dgst -sha256 -sign <(echo -n "${pem}") \
              <(echo -n "${header_payload}") | b64enc
          )

          # Create JWT
          JWT="${header_payload}"."${signature}"


          export PAT=$(curl --request POST \
          --url "https://api.github.com/app/installations/<+secretManager.environmentVariables.installation_id>/access_tokens" \
          --header "Accept: application/vnd.github+json" \
          --header "Authorization: Bearer $JWT" \
          --header "X-GitHub-Api-Version: 2022-11-28"|grep token|cut -d'"' -f4)

          # Export PAT as secret
          secret="$PAT"
    environmentVariables:
      - name: installation_id
        type: String
        value: <+input>
      - name: app_id
        type: String
        value: <+input>
      - name: github_app_private_key
        type: String
        value: <+input>
    outputVariables: []
    outputAlias:
      key: PAT
      scope: Pipeline
    onDelegate: true
```

:::info Use jq to extract PAT

On line 57, the script uses `grep token|cut -d'"' -f4` to extract the PAT from the payload returned by GitHub. This is because JQ is not included with the default Harness delegate image.

If you installed jq on your delegate, replace the grep command with `jq '.token'`.

:::

## Add a custom secrets manager connector

Next, use the template to [add a custom secret manager connector](https://developer.harness.io/docs/platform/secrets/secrets-management/custom-secret-manager#step-2-add-a-custom-secret-manager).

You can create this at the account level to give the access granted by this GitHub App to all projects in your Harness account, or you can create it at the org or project level to restrict the connector's access to a specific org/projects.

1. Go to your Harness **Account Settings** and select **Connectors** under **Account Resources**.
2. Select **New Connector**, and then select **Custom Secrets Manager** under **Secrets Managers**.

   <DocImage path={require('../static/github-app-pat-dispenser-2.png')} width="60%" height="60%" title="Click to view full size image"  />

3. For **Name**, enter `GitHub App Pat Dispenser` or a similar recognizable name, and then select **Continue**.
4. For **Shell Script**, select **Select Template**, select your custom secrets manager template that you created previously, and then select **Use template**.
5. For each **Input Variable**, select the function icon and change the input type to **Fixed Value**. Then, enter the appropriate value:

   * `installation_id` - GitHub App installation ID
   * `app_id` - GitHub App ID
   * `github_app_private_key` - An expressions referencing a [Harness file secret](https://developer.harness.io/docs/platform/secrets/add-file-secrets) containing the GitHub App's private key.

   <DocImage path={require('../static/github-app-pat-dispenser-3.png')} width="100%" height="100%" title="Click to view full size image"  />

6. Select **Continue**, modify the delegate configuration if desired, and then select **Save and Continue**. If the connection test succeed, select **Finish**.

Here's a YAML example for the custom secrets manager connector:

```yaml
connector:
  name: GitHub App PAT Dispenser
  identifier: GitHub_App_PAT_Dispenser
  description: ""
  accountIdentifier: 1234
  type: CustomSecretManager
  spec:
    onDelegate: true
    template:
      templateRef: account.GitHub_App_PAT_Dispenser
      versionLabel: "1"
      templateInputs:
        environmentVariables:
          - name: installation_id
            value: "12341234"
            type: String
            useAsDefault: true
          - name: app_id
            value: "12345"
            type: String
            useAsDefault: true
          - name: github_app_private_key
            value: <+secrets.getValue("account.github-app-connector-private-key")>
            type: String
            useAsDefault: true
    timeout: 20
    default: false
```

## Create a secret with the custom secrets manager

Now, you can [create a text secret](https://developer.harness.io/docs/platform/secrets/add-use-text-secrets) to use in your CI pipeline that generates a dynamic token you can use to perform Git operations or interact with the GitHub API using the GitHub App to authenticate.

1. Go to **Account Settings** and select **Secrets** under **Account Resources**.
2. Select **New Secret**, and then select **Text**.
3. For **Secrets Manager**, select your GitHub App custom secrets manager connector.
4. For **Secret Name**, enter `dynamic-pat` or another recognizable name, and then select **Save**.

   <DocImage path={require('../static/github-app-pat-dispenser-4.png')} width="60%" height="60%" title="Click to view full size image"  />

## Use the dynamic token in a pipeline for Git authentication

Finally, you can use `dynamic-pat` secret to authenticate Git commands or GitHub API calls in a [Run step](https://developer.harness.io/docs/continuous-integration/use-ci/run-step-settings). Use an expression to reference the secret, such as `<+secrets.getValue("dynamic-pat")>`

For example, this script sets up the pipelines [default codebase](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase) with authentication using the dynamic token:

```sh
git config --global --add safe.directory /harness
git config --global user.email "your-email@your-domain.com"
git config --global user.name "Your Name"
origin_url=$(git remote get-url origin)
auth_url=$(echo "$origin_url" | sed 's/github.com/git:<+secrets.getValue("dynamic-pat")>@github.com/')
git remote set-url origin "$auth_url"
```

With this authentication in place, you can use the same Run step or sequential Run steps to run commands that commit and push changes to your repo.
