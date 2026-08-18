import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A GitHub repository is not reviewed in place. Harness creates a linked repository that mirrors it, and the review runs against that. The link is maintained by a Harness connector, so the connector you choose determines what you have to supply per repository.

### Use a standard GitHub connector

AI Code Review uses standard Harness GitHub connectors, with any authentication type the connector supports, including personal access token and OAuth. There is no separate GitHub App to install, and both GitHub Cloud and GitHub Enterprise Server are supported. Most teams already have a connector that works.

### Choose your connector scope

| Connector scope | What you supply per repository | When to use |
| --- | --- | --- |
| Account-level | The full provider path in `owner/repo` form | One connector covering many repositories across an organization |
| Repository-level | Nothing. Leave the repository identifier empty | A connector already scoped to a single repository |

:::warning Account-level connectors need the owner

With an account-level connector, a bare repository name is the common failure. Harness attempts to recover the owner from the repository path, and when it cannot, onboarding fails with an error naming both the identifier and the path. The resulting link would point at an ownerless URL that GitHub returns as not found.

Always supply `owner/repo`.

:::

<Tabs>
<TabItem value="ui" label="Harness UI" default>

1. In Harness, navigate to the space that will own the reviews. This can be an account, an organization, or a project.
2. Select **AI Code Review**, then select **Add repositories**.
3. Select **GitHub** as the source.
4. Select the connector that can reach your GitHub organization. Go to [GitHub integration](/docs/ai-code-review/platforms/github/github-integration) to review connector requirements.
5. For each repository, enter the provider path in `owner/repo` form if you selected an account-level connector. Leave it empty for a repository-level connector.
6. Click **Onboard**.

Harness links each repository and imports it. A newly linked repository is not ready immediately: Harness waits for the import to finish before registering the trigger, because the webhook registration is rejected while the repository is still importing. Large repositories take longer.

:::tip Watch for per-repository errors

Onboarding reports a result per repository. The overall request can succeed while an individual repository fails, so read the per-repository results rather than the overall status.

:::

</TabItem>
<TabItem value="api" label="API">

Call the onboard endpoint with `type` set to `github`. The `space_path` query parameter is the space that will own the reviews.

```bash
curl -X POST "$HARNESS_BASE_URL/aicr/v1/onboard?space_path=myaccount/myorg/myproject" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $HARNESS_API_KEY" \
  -d '{
    "type": "github",
    "connector_ref": "account.my_github_connector",
    "repositories": [
      {
        "repo_path": "myaccount/myorg/myproject/payments-api",
        "repo_identifier": "acme/payments-api"
      }
    ]
  }'
```

| Field | Required | Notes |
| --- | --- | --- |
| `type` | Yes | `github` |
| `connector_ref` | Yes for GitHub | The connector used to create and keep the linked repositories in sync |
| `repositories[].repo_path` | Yes | Must be prefixed with `space_path` followed by `/` |
| `repositories[].repo_identifier` | Conditional | The provider path in `owner/repo` form. Required for account-level connectors, must be empty for repository-level connectors |

The response returns one result per repository, each reporting whether the linked repository, trigger, and setting exist now. A repository that failed carries an `error` string while the request itself still returns `200`.

To check whether repositories are already onboarded:

```bash
curl -X POST "$HARNESS_BASE_URL/aicr/v1/onboard/status?space_path=myaccount/myorg/myproject" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $HARNESS_API_KEY" \
  -d '{"repositories": ["myaccount/myorg/myproject/payments-api"]}'
```

Go to [API reference](/docs/ai-code-review/resources/api-reference) to review every endpoint.

</TabItem>
</Tabs>

### Change the connector later

Re-running onboarding with a different `connector_ref` updates both the linked repository and the trigger, so the connector can be changed without removing and re-adding the repository. Supplying no repository identifier on a re-run leaves the stored provider path unchanged rather than clearing it.
