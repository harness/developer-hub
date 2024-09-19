---
title: Custom Deployment FAQs
description: Frequently asked questions about Harness Continuous Delivery & GitOps, specifically for the Custom Deployment swimlane.
sidebar_position: 100
---

This article addresses some frequently asked questions about Custom deployments in Harness.

### How can we access helm repo name from the Helm connector?

We do not have a direct variable exposed for reading the repo name from the connector. The connector variable is only available in Custom deployment template. For normal usage we can make an api call to get the connector details and get the repo name from the "helmRepoUrl" attribute.


### Can we disable the Fetch Instances in Custom deployment stage?

No, Fetch instances manifest check the deployed resources exist to be used at surface up on dashboard.
Disabling such is not an available option.


### What does expression infra.variables.projectID mean?

There are no variables inside an infrastructure definition. But, When you are using a custom deployment template in your infrastructure you can use variables inside that.


### How to do a Flank Deployment in Harness?

You can use deployment templates for this use case. You can find more information on this [here](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial/).


### Does Harness provide Salesforce Deployment Template?

Yes, Salesforce deployment template will help users deploy salesforce application and is available for users
For more details, go to [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial/#salesforce-deployment-template-support).


### How does Harness support Google Cloud Run Deployment Templates?

Google Cloud Run Deployment Templates help in deployment template will help users deploy Google Cloud Run-based services
For more details, go to [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial/#google-cloud-run-deployment-template).


### Does Harness provide template library for Elastic Beanstalk services?

Yes ,Elastic Beanstalk Deployment template is used for deployment template will help users deploy Elastic Beanstalk services.
For more details, go to [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial/#elastic-beanstalk---sample).

### Does Harness support deployment template to access variables such as a project variable?

Yes, when using a custom deployment template in the infrastructure, one can use variables inside that. Project-level variables can be fetched using the `<+project.variableName>` syntax in the deployment template.

### Can we specify a harness expression as a string in shell step?
Any expression in harness pipeline will be evaluated and hence currently it is not possible to pass the expression as part of the shell step as astring as it gets evaluated as well.

### Does Harness support to configure a repository for Python packages in Nexus Artifact Source?
Nexus Artifact Source does not support Python (PyPi) package types. It only supports deployment of Zip, Tar, or container-based packages. For Python packages, consider using a different repository type or configuring a custom artifact source.