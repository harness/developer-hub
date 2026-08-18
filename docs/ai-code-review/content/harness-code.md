import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

AI Code Review on Harness Code is gated by an account feature flag. Confirm it is enabled for your account before you start, then opt in per repository using the steps below.

A Harness Code repository already lives in Harness, so there is nothing to link and no connector to configure. Onboarding registers the pull request trigger and turns reviews on for the repository.

Because the repository is already active, onboarding does not wait for an import. Turning on a Harness Code repository is faster than linking a GitHub one, and the wait step you see documented for GitHub does not apply.

<Tabs>
<TabItem value="ui" label="Harness UI" default>

1. In Harness, navigate to the space that will own the reviews. This can be an account, an organization, or a project.
2. Select **AI Code Review**, then select **Add repositories**.
3. Select **Harness Code** as the source.
4. Select the repositories to enable.
5. Click **Onboard**.

Harness registers a pull request trigger for each repository and enables AI review on it. Go to [Harness Code Repository](/docs/ai-code-review/platforms/harness-code-repository) to review what changes on the pull request page.

</TabItem>
<TabItem value="api" label="API">

Call the onboard endpoint with `type` set to `harness_code`. No connector and no provider identifier are needed.

```bash
curl -X POST "$HARNESS_BASE_URL/aicr/v1/onboard?space_path=myaccount/myorg/myproject" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $HARNESS_API_KEY" \
  -d '{
    "type": "harness_code",
    "repositories": [
      { "repo_path": "myaccount/myorg/myproject/payments-api" },
      { "repo_path": "myaccount/myorg/myproject/billing-service" }
    ]
  }'
```

| Field | Required | Notes |
| --- | --- | --- |
| `type` | Yes | `harness_code` |
| `repositories[].repo_path` | Yes | Must be prefixed with `space_path` followed by `/` |
| `connector_ref` | No | Not used for Harness Code |
| `repositories[].repo_identifier` | No | Not used for Harness Code |

The response returns one result per repository. To check whether repositories are already onboarded:

```bash
curl -X POST "$HARNESS_BASE_URL/aicr/v1/onboard/status?space_path=myaccount/myorg/myproject" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $HARNESS_API_KEY" \
  -d '{"repositories": ["myaccount/myorg/myproject/payments-api"]}'
```

Go to [API reference](/docs/ai-code-review/resources/api-reference) to review every endpoint.

</TabItem>
</Tabs>

### Onboard a whole organization at once

The space path decides the blast radius. Onboarding at an organization path creates the review pipeline in every project under that organization, and onboarding at an account path covers every project in the account.

Onboarding many repositories at once is supported, but start with one repository and one set of criteria. Criteria defined at a space apply to every repository beneath it, so a noisy criterion introduced at organization level lands on every pull request in the organization at once.
