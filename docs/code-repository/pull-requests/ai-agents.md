---
title: AI Agents
sidebar_label: AI Agents
hide_title: true
sidebar_position: 120

---


## AI Agents

Harness AI PR Agents automate repetitive pull request and CI remediation workflows by analyzing code, identifying issues, and proposing improvements through pull requests.

Instead of manually reviewing code, debugging CI failures, or writing missing tests, teams can trigger AI agents directly from pipelines to perform these tasks automatically and raise changes for human review.

These agents help teams:

* Reduce time spent on repetitive code review and maintenance tasks
* Recover faster from failing builds and reduce mean time to resolution (MTTR)
* Improve test coverage and long-term code quality
* Keep developers focused on feature work instead of maintenance


These agents run as part of your pipeline workflows and interact directly with your repository:

1. **Code Review Agent** – analyzes pull requests and posts review feedback and suggestions. See [documentation](/docs/code-repository/pull-requests/review-pr.md#ai-code-review)
2. **AutoFix Agent** – generates fixes for build issues and proposes code changes via pull requests.
3. **Code Coverage Agent** – generates unit tests to improve coverage and posts a coverage report.


All agents follow the same workflow:

1. A pipeline triggers the agent.
2. The agent analyzes the repository or pull request.
3. The agent posts results and/or creates a pull request.
4. Developers review and merge the changes.

:::note
Harness agents require Harness AI to be enabled in your account settings and may take several minutes to run depending on repository size and agent task.
:::

## Code Coverage Agent

The Code Coverage Agent helps teams continuously improve test coverage by automatically generating unit tests for untested or under-tested code.

Instead of manually identifying coverage gaps and writing tests, the agent analyzes your repository, generates new tests, and raises a pull request with the improvements.

This helps teams:

* Increase coverage without slowing development velocity
* Ensure new code is backed by tests
* Maintain long-term code quality with minimal manual effort

### How it works

1. A Run step calls the Code Coverage Agent execute API.
2. The agent analyzes the repository and identifies coverage gaps.
3. The agent generates new tests and validates they pass.
4. The agent opens a pull request and posts a coverage report comment.


### Code Coverage Agent API

```bash
POST https://app.harness.io/gateway/agents/api/v1/agents/Code%20Coverage/execute
```

The API expects the following inputs:

| Input          | Type   | Description                              |
| -------------- | ------ | ---------------------------------------- |
| `llmKey`       | secret | Anthropic API key used by the agent      |
| `harnessKey`   | secret | Harness API key (PAT) |
| `gitConnector`   | connector | Connector used to access the repository |
| `repo`         | string | Repository name. Consider using `${DRONE_REPO_NAME}` as value|
| `branch`       | string | Branch to review. Consider using `<+codebase.branch>` as value  |




### Coverage Agent PR Summary Example
The following example shows a coverage report posted on a pull request:

<DocImage path={require('/docs/code-repository/pull-requests/static/ai-coverage-summary.png')} />


## AutoFix Agent

The AutoFix Agent enables **self-healing CI pipelines**.
When a pipeline fails, the agent analyzes the failure and recent code changes, generates a fix, verifies the build passes, and raises a pull request with the proposed solution.

This helps teams:

* Reduce time spent debugging CI failures
* Automatically recover from common build and test issues
* Keep pipelines green and reduce developer interruption
* Shorten feedback loops and improve developer productivity

### How it works

1. A Run step configured to execute on failure calls the AutoFix Agent.
2. The agent analyzes the pipeline execution and repository changes.
3. The agent generates and validates a fix.
4. The agent creates a pull request and posts a summary comment.


### AutoFix Agent API

Use a Run step to invoke the agent:

```bash
POST https://app.harness.io/gateway/agents/api/v1/agents/AutoFix/execute
```

The API expects the following inputs:

| Input          | Type   | Description                              |
| -------------- | ------ | ---------------------------------------- |
| `llmKey`       | secret | Anthropic API key used by the agent      |
| `harnessKey`   | secret | Harness API key (PAT) |
| `gitConnector`   | connector | Connector used to access the repository |
| `repo`         | string | Repository name. Consider using `${DRONE_REPO_NAME}` as value|
| `branch`       | string | Branch to review. Consider using `<+codebase.branch>` as value  |
| `executionId`  | string    | Pipeline execution ID used as context for identifying failures . Consider using `<+pipeline.executionId>` as value      |


### Autofix Agent PR Summary Example
The following example shows an AutoFix summary created by the agent:
<DocImage path={require('/docs/code-repository/pull-requests/static/ai-autofix.png')} />
