---
title: Create a Connector using YAML
description: To solve [problem], [general description of How-to solution]. In this topic --  Before You Begin. Visual Summary. Step 1 --  Title. Step 2 --  Title. Next Steps. Before You Begin. Your target environment must…
# sidebar_position: 2
helpdocs_topic_id: m0awmzipdp
helpdocs_category_id: o1zhrfo8n5
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness [Connectors](/category/o1zhrfo8n5-connectors) integrate Harness with your cloud platforms, codebase and artifact repos, and collaboration and monitoring tools.

You can add Connectors using the Harness GUI or via YAML using the Harness YAML Builder.

This topic shows you how to add a Connector using the YAML Builder.

In this topic:

* [Before You Begin](#before_you_begin)
* [Step 1: Create Secrets or Keys](#step_1_create_secrets_or_keys)
* [Step 2: Create the Connector](#step_2_create_the_connector)

### Before You Begin

* [Learn Harness' Key Concepts](/article/hv2758ro4e-learn-harness-key-concepts)

### Step 1: Create Secrets or Keys

Typically, Connectors use passwords or SSH keys to authenticate with platforms, tools, etc.

In Harness, you create a Harness secret for the password or SSH key, and then reference that secret's ID when you create your Connector.

You can create a secret at the Project, Org, or account level. In this example, we'll use Projects.

In **Resources** for a Project, Org, or account, click **Secrets**.

Click **Create via YAML Builder**.

Use a snippet to create the secret.

Here's an example of a Harness inline text secret in YAML:


```
secret:  
  type: SecretText  
  name: docs-dockerhub-password  
  identifier: docsdockerhubpassword  
  orgIdentifier: Doc  
  tags: {}  
  spec:  
    secretManagerIdentifier: harnessSecretManager  
    valueType: Inline
```
The `identifier` value (in this example, `docsdockerhubpassword`) is what you'll reference when you add your Connector in YAML.

For steps on other types of secrets, see [Secrets and Secret Management](/category/48wnu4u0tj-secrets-and-secret-management).

### Step 2: Create the Connector

In **Resources**, click **Connectors**.

Click **Create via YAML Builder**.

Copy and paste the snippet for the Connector you want to create.

For example, here is the snippet for a DockerHub Connector:


```
connector:  
    name: SampleDockerConnector  
    identifier: SampleDockerConnectorId  
    description: Sample Docker Connector  
    orgIdentifier: Doc  
    projectIdentifier: Example  
    type: DockerRegistry  
    spec:  
        dockerRegistryUrl: somedockerregistryurl  
        providerType: DockerHub  
        auth:  
            type: UsernamePassword  
            spec:  
                username: someuser  
                passwordRef: somepasswordref
```
Replace the values for the `name` and `identifier` keys.

Replace any URL values.

Provide values for the credentials keys.

For any password/key labels, paste the secret/key's `identifier` value.

For example, using the `identifier` from the secret created earlier (`docsdockerhubpassword`), the DockerHub Connector would now be:


```
connector:  
    name: ExampleDockerConnector  
    identifier: ExampleDockerConnectorId  
    description: Example Docker Connector  
    orgIdentifier: Doc  
    projectIdentifier: Example  
    type: DockerRegistry  
    spec:  
        dockerRegistryUrl: https://registry.hub.docker.com/v2/  
        providerType: DockerHub  
        auth:  
            type: UsernamePassword  
            spec:  
                username: john.doe@example.com  
                passwordRef: docsdockerhubpassword
```
Click **Save**. The Connector is added and can be select in Pipeline stages.

