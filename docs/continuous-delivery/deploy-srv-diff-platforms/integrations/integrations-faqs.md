---
title: Integrations FAQs
description: Frequently asked questions about Harness Continuous Delivery & GitOps, specifically for Integrations swimlanes.
sidebar_position: 100
---

This article addresses some frequently asked questions about integrations enabled by Harness.

### What is PIE_GITX_OAUTH, and how does it relate to OAuth with Git in Harness?

```PIE_GITX_OAUTH``` is a feature that enables OAuth integration with Git in Harness. When it's enabled, OAuth credentials are used for interactions with Git repositories.


### Can I switch between OAuth and connector credentials for Git operations in Harness?

Yes to same some extend, you can switch between OAuth and connector credentials. If OAuth is set and you wish to use connector credentials, you can delete the OAuth configuration, and Harness will prompt you to use the connector's credentials while performing git actions.
For more info check - [Documentation](https://developer.harness.io/docs/platform/git-experience/oauth-integration/)


### What could be the possible issue for not able create a SNOW ticket from a template ?

One can check for below possibilities : 

-  Is the Harness app installed in the servicenow instance used by this connector.
Please refer here for [Reference](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/ticketing-systems/create-service-now-tickets-in-cd-stages/#servicenow-user-roles)

- Is the permissions for the integrated user include `x_harne_harness_ap.integration_user_role`.
Please refer here for [Reference](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/ticketing-systems/create-service-now-tickets-in-cd-stages/#:~:text=Make%20sure%20you%20have%20the%20following%20roles)


### What is the feature flag for the bi-directional GitSync ?

One can enable the Feature-Flag `PIE_GIT_BI_DIRECTIONAL_SYNC` to fetch the feature.
Please read more on All Continuous Delivery FFs in this [Documentation](https://developer.harness.io/docs/continuous-delivery/cd-integrations/#active-cd-feature-flags/) 


### How many versions of Terraform does Harness support ?

Harness supports the following Terraform versions: `v1.3.5, v1.1.9, v1.0.0, v0.15.5, v0.15.0 and v0.14.0`
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/cd-integrations#terraform-version-support)


### Can we connect to a Databricks cluster ?

No, We do not have a native integration. If one is using terraform, they need to define the access block by following the [Terraform Docs](https://registry.terraform.io/providers/databricks/databricks/0.2.4/docs#authentication)
Wherever the delegate is hosted it needs network access to reach out and communicate to databricks.


### How to use the Opsgenie plugin and integration with Harness to create new alerts based on testcase health?

We do have different built-in notification mechanisms,  slack/email/ms teams/pager duty or custom, but if you want to integrate opsgenie, you have to create a shell script and make a call to opsgenie utilizing the api exposed by opsgenie to use for alert purposes.


### Is there a way to create a github repository tag in Harness ?

One can use `curl` commands to create tags via API for [Github repository tags](https://docs.github.com/en/rest/repos/tags?apiVersion=2022-11-28). 
Please read more on this in the following [Documentation](https://developer.harness.io/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-github-actions/#set-up-the-workflow)


### What does exit status 1 mean
A harness pipeline returning exit status 1 typically signifies an error during execution, such as compilation/build failures, test errors, deployment issues, or integration problems. Diagnosing specific issues requires reviewing logs and error messages.


### How can you seamlessly integrate Docker Compose for integration testing into your CI pipeline without starting from scratch?

Run services for integration in the background using a `docker-compose.yaml` file. Connect to these services via their listening ports. Alternatively, while running `docker-compose up` in CI with an existing `docker-compose.yaml` is possible, it can complicate the workflow and limit pipeline control, including the ability to execute each step, gather feedback, and implement failure strategies.


### Does Harness support the use of OpenID Connect(OIDC) for connecting to various systems such as Amazon Web Services(AWS) and Google Cloud Platform (GCP)?

Yes, we currently support OIDC integration for [Google Cloud Platform (GCP)](https://developer.harness.io/docs/platform/connectors/cloud-providers/ref-cloud-providers/gcs-connector-settings-reference/#use-openid-connect-oidc) and [Amazon Web Services (AWS)](https://developer.harness.io/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference/#credentials).

Additional support is coming soon, including facilitating authentication, short-lived token acquisition based on Harness context, and various operational tasks like deployment, builds, or secret retrieval within the respective cloud provider environments.


### Does Harness support coverage testing in Python? Additionally, can coverage testing be used alongside split testing?

Yes, Harness supports code coverage testing alongside split testing in Python.
Go to [Code coverage in Harness CI](https://developer.harness.io/docs/continuous-integration/use-ci/run-tests/code-coverage) and [Split tests (parallelism) in Harness CI](https://developer.harness.io/docs/continuous-integration/use-ci/run-tests/speed-up-ci-test-pipelines-using-parallelism) for more information.


### Does Harness support integration with JIRA to use a ticket and its status as an approval gate for pipeline deployments across multiple environments?

Yes, it is possible to use a JIRA ticket as an approval gate for all environments in a Harness pipeline. The ticket's status or an update to a specific field can be used to control whether Harness allows the deployment to proceed to the next environment.

For more details, go to [Adding Jira approval stages and steps](https://developer.harness.io/docs/platform/approvals/adding-jira-approval-stages/).

### How can one implement a workflow that requires additional approval gates based on pipeline results?

One method is to use conditional execution on an approval stage. Use a JEXL expression to check the scan results, e.g., `<+scanResults.criticals> != 0`. For high severity issues, route the approval to both the team and higher-level approvers. For low severity issues, route it to the team only. This allows for dynamic approval processes based on scan results. Please follow more on this in the documentation on [Stage and step conditional execution settings](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/executions/step-and-stage-conditional-execution-settings/)

### How does Harness integrate with Tetrate or Gloo for deployments?

Harness supports traffic shifting with any SMI compliant Service Mesh, including Tetrate (built on Istio) and Gloo. One can configure traffic routing steps in your pipelines using Harness, ensuring smooth deployment workflows.

#### Does Harness truncating logs?

Yes, Harness does truncate logs. Please read more on this in Harness [Documentation](https://developer.harness.io/docs/continuous-delivery/manage-deployments/deployment-logs-and-limitations/)

### Does Harness CD support platform connectivity for connectors such as Artifactory, Docker, AWS, etc., without using a Delegate?

No, Harness CD does not support platform connectivity for any connectors, including Artifactory, Docker, AWS, and others. Using a Delegate is mandatory to facilitate the connection between Harness and these platforms. The Delegate acts as a bridge, handling the necessary communication and ensuring secure and reliable interactions with external services.