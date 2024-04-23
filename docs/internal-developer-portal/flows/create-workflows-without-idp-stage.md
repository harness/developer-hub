---
title: Create Workflows without using the Harness Pipelines
description: Create an IDP workflow purely using Backstage Scaffolder actions and without using Harness pipelines
sidebar_position: 90
sidebar_label: Create Workflows without Harness Pipelines
---

<DocsTag  backgroundColor= "#cbe2f9" text="Tutorial"  textColor="#0b5cad"  />

## Goal

This tutorial will help you create an IDP Self Service Workflow which automates GitHub Repo Onboarding for users. This is also an example to demonstrate that you can build IDP Flows by using Backstage Scaffolder actions and without using Harness pipelines. This however, is not our recommended approach as we recommend using a Harness pipeline to leverage features like Access Control and Governence.

## Pre-requisite

### Add Connector

1. Go to **Admin -> Git Integrations**.
2. Add a **New Git Integration** with type as **GitHub**.
3. Now Select the GitHub **Connector** and **Save Changes**, [follow the steps to add a new connector](https://developer.harness.io/docs/internal-developer-portal/get-started/setup-git-integration#connector-setup) 

:::info

Make sure the Connector URL used here is pointed towards the org where you want to create the new repo and the token used have write permission for the repo also **Enable the API** while creating connector.

:::

## Create Template

**If you want to use our sample workflow you can skip this step and go to "Register Template in IDP" step***

The template is defined in a YAML file named `template.yaml`. The [syntax](https://developer.harness.io/docs/internal-developer-portal/flows/service-onboarding-pipelines#how-to-write-idp-templates) of the template definition is owned by [backstage.io](https://backstage.io/docs/features/software-templates/writing-templates) while the workflow runs on a Harness pipeline of your choice.


```YAML
apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
# some metadata about the template itself
metadata:
  name: Template Quickstart
  title: Demo Template Quickstart
  description: scaffolder v1beta3 template demo
spec:
  owner: service.owner
  type: service
  # these are the steps which are rendered in the frontend with the form input
  parameters:
    - title: Fill in some steps
      required:
        - name
        - repoUrl
      properties:
        name:
          title: Name
          type: string
          description: Unique name of the component
        repoUrl:
          title: Repository Location
          type: string

  # here's the steps that are executed in series in the scaffolder backend
  steps:
    - id: fetch-base
      name: Fetch Base
      action: fetch:template
      input:
        url: ./template
        values:
          name: ${{ parameters.name }}
          owner: ${{ parameters.owner }}

    - id: publish
      name: Publish
      action: publish:github
      input:
        allowedHosts: ['github.com']
        description: This is ${{ parameters.name }}
        repoUrl: ${{ parameters.repoUrl }}

  # some outputs which are saved along with the job for use in the frontend
  output:
    links:
      - title: Repository
        url: ${{ steps['publish'].output.remoteUrl }}
      - title: Open in catalog
        icon: catalog
        entityRef: ${{ steps['register'].output.entityRef }}
```

In the above template we have used the [GitHub based Custom Actions](https://www.npmjs.com/package/@backstage/plugin-scaffolder-backend-module-github), `fetch:template` and `publish:github`. 

1. Copy the above template file in your git provider, and save it as `template.yaml`. 

## Register Template in IDP

2. In the left navigation, select **Create**, and then select **Register Software Component**.

![](static/create-page-sidebar.png)
![](static/create-page.png)

3. Enter the URL to your new `template.yaml`. You can as well try to register this [already available template](https://github.com/harness-community/idp-samples/blob/main/template-quickstart.yaml). 

![](static/url-on-register-page.png)

4. Select **Import**.

![](static/finished-state.png)

5. Now click on the template name

![](static/template-name.png)

## Use Workflows to Create a Repo

6. Once you're on the entity page for template, **Launch the Template**.

![](static/Launch-template.png)

7. Now fill the fields as:
    - Name: Add a name for your component.
    - Repository Location: The repo location should be of the format `github.com?repo=NEW_REPO_NAME&owner=ORG_NAME`, where NEW_REPO_NAME, is the name of the repository you want to create and ORG_NAME is the name (`backstage` here ) that appears just `github.com` in the URL, `https://github.com/backstage`  

![](static/fill-template.png)

8. Now Trigger the flow, it will fetch the docs and add it to the newly created repo. 

![](static/run-flows.png)

## Delete the Template

If you want to unregister or delete the template follow the steps mentioned [here](https://developer.harness.io/docs/internal-developer-portal/flows/service-onboarding-pipelines#deleteunregister-template). 

## Further Reading

Self Service Onboarding in IDP is powered by scaffolder templates and Harness Pipeline([IDP Stage](https://developer.harness.io/docs/internal-developer-portal/flows/idp-stage)) . Follow the tutorials to learn more about it. 

1. [Create a service onboarding pipeline (using IDP Stage)](https://developer.harness.io/docs/internal-developer-portal/flows/create-a-new-service-using-idp-stage)

2. [Getting started with service onboarding pipeline (using Custom Stage)](https://developer.harness.io/docs/internal-developer-portal/flows/create-a-service)

3. [Use Harness IDP for self serviced Harness CI/CD onboarding](https://developer.harness.io/docs/internal-developer-portal/flows/self-service-onboarding-pipeline-tutorial)
