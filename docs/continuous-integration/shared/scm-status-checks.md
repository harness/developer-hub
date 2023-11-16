You must configure branch protections and checks, such as PR checks, in your source control provider.

If your pipelines use [webhook triggers](/docs/platform/triggers/triggering-pipelines), you can get [Harness build statuses in your PRs](/docs/continuous-integration/use-ci/viewing-builds#source-code-repository-links).

You can use **Run** steps to query your SCM provider's API to [include custom SCM status checks in a CI pipeline](/docs/continuous-integration/use-ci/optimize-and-more/custom_github_status_check).

You can also use the Harness CI Jira plugin to [update deployments and builds in Jira when your Harness pipelines run](/docs/continuous-integration/use-ci/use-drone-plugins/ci-jira-int-plugin).