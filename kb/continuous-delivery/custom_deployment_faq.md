---
title: Custom Deployment FAQs
description: Frequently asked questions about Harness Continuous Delivery & GitOps, specifically for the Custom Deployment swimlane.
---

#### How can we access helm repo name from the helm connector?

We do not have a direct variable exposed for reading the repo name from the connector. The connector variable is only available in custom deployment template. For normal usage we can make an api call to get the connector details and get the repo name from the "helmRepoUrl" attribute.


#### Can we disable the Fetch Instances in custom deployment stage ?

No, Fetch instances manifest check the deployed resources exist to be used at surface up on dashboard.
Disabling such is not an available option.


#### What does expression infra.variables.projectID mean?

There are no variables inside an infrastructure definition. But, When you are using a custom deployment template in your infrastructure you can use variables inside that.


#### How to do a Flank Deployment in Harness?

You can use deployment templates for this use case. You can find more information on this [here](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial/).


#### Does Harness provide Salesforce Deployment Template ?

Yes, Salesforce deployment template will help users deploy salesforce application and is available for users
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial/#salesforce-deployment-template-support)


#### How does Harness support Google Cloud Run Deployment Templates ?

Google Cloud Run Deployment Templates help in deployment template will help users deploy Google Cloud Run-based services
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial/#google-cloud-run-deployment-template)


#### Does Harness provide template library for Elastic Beanstalk services ?

Yes ,Elastic Beanstalk Deployment template is used for deployment template will help users deploy Elastic Beanstalk services.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial/#elastic-beanstalk---sample)


#### What is the Command Step?

The Command Step allows you to run commands on target hosts in SSH and WinRM deployments, as well as within deployment templates. You can use it for various tasks like:

Running scripts on all target hosts.
Downloading the deployment artifact.
Copying the artifact or configuration files.


#### How to loop the Command Step on all target hosts?

Use the "repeat" looping strategy with the expression stage.output.hosts after the Fetch Instances step for deployment templates.
This ensures the commands run on each host retrieved via the Fetch Instances step.

