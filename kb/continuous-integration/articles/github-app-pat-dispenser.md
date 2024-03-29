---
title: Use a GitHub App to update code in CI
description: How to use a GitHub App in CI to push git commits and interact with the GitHub API.
sidebar_position: 80
---

The codebase configuration in CI allows you to use a source code connector configured to use a GitHub App to authenticate.  Allowing for the stage to clone the clone, push status updates to PRs, and to create webhooks on repos.  However, often users need to create commits and push updates back to the repository being cloned, and the codebase connector does not setup authentication on the cloned repository to push.

The best way to accomplish this, is with the use of a "Custom Secrets Manager" setup to generate a dynamic PAT from the same GitHub App details used by your connector.  

## Create Secret Manager Template

To start, create a "Secret Manager" Template, ideally at the account level.

<DocImage path={require('../static/github-app-pat-dispenser-1.png')} />

Switch to the yaml view, and add the following contents:

```yaml
template:
  name: GitHub App PAT Dispenser
  identifier: GitHub_App_PAT_Dispenser
  versionLabel: "1"
  type: SecretManager
  tags: {}
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

:::tip Use jq to extract PAT

Note that on line 57 the script is using `grep token|cut -d'"' -f4` to extract the PAT from the payload returned by GitHub.  That is because jq is not included in the delegate by default.  If you have jq installed on your delegate it's recommended to replace this with `jq '.token'`.

:::

## Create Custom Secret Manager Connector

Next, create a "Custom Secret Manager" connector.  This can be created at the account level to give the access granted by this GitHub App to all projects in the entire Harness account, or at the org/project level to scope the access to this app to only those orgs/projects (if you wanted to keep teams repo access separate for example).

<DocImage path={require('../static/github-app-pat-dispenser-2.png')} />

Fill in the details about your GitHub APP, including the app ID, installation ID and a secret reference to the file secret holding the private key from your app.  

Here's an example Custom Secret Manager configuration:

<DocImage path={require('../static/github-app-pat-dispenser-3.png')} />

Here's the YAML for the above example:

```yaml
connector:
  name: GitHub App PAT Dispenser
  identifier: GitHub_App_PAT_Dispenser
  description: ""
  accountIdentifier: TEyxLP87RquOEph_GrbYvQ
  type: CustomSecretManager
  spec:
    onDelegate: true
    template:
      templateRef: account.GitHub_App_PAT_Dispenser
      versionLabel: "1"
      templateInputs:
        environmentVariables:
          - name: installation_id
            value: "48957787"
            type: String
            useAsDefault: true
          - name: app_id
            value: "864226"
            type: String
            useAsDefault: true
          - name: github_app_private_key
            value: <+secrets.getValue("account.suranc-github-app-connector-private-key")>
            type: String
            useAsDefault: true
    timeout: 20
    default: false
```

## Create Secret using Custom Secret Manager

With the custom secret manager in place, the next step is to create a secret using it which you can use inside of a pipeline.  This will give you a dynamic PAT you can use to perform git pushes or API actions against GitHub, using the GitHub App to authenticate (with the scope you granted to the GitHub app installation).

Here's an example secret:
<DocImage path={require('../static/github-app-pat-dispenser-4.png')} />

## Using PAT Secret in a pipeline to authenticate git

Finally, you can use this secret in a run step in your pipeline  (such as: `<+secrets.getValue("dynamic-pat")>`) and use it to set up authentication in the cloned git repo, or use the GitHub API.

The following code will setup your cloned repository with authentication using the generated PAT:
```
git config --global --add safe.directory /harness
git config --global user.email "your-email@your-domain.com"
git config --global user.name "Your Name"
origin_url=$(git remote get-url origin)
auth_url=$(echo "$origin_url" | sed 's/github.com/git:<+secrets.getValue("dynamic-pat")>@github.com/')
git remote set-url origin "$auth_url"
```

With authentication in place, you can create commits and push them back to the cloned repository with `git push`.
