---
title: Add an AWS connector
description: Connect Harness to your AWS accounts and services.
sidebar_position: 2
helpdocs_topic_id: 98ezfwox9u
helpdocs_category_id: o1zhrfo8n5
helpdocs_is_private: false
helpdocs_is_published: true
---

Use a Harness AWS connector to integrate AWS with Harness. Use AWS with Harness to obtain artifacts, communicate with AWS services, provision infrastructure, and deploy microservices and other workloads. If you want to connect Harness to Elastic Kubernetes Service (Amazon EKS), you can use the platform-agnostic [Kubernetes Cluster connector](../..7_Connectors/../Cloud-providers/connect-to-a-cloud-provider.md) or the [EKS cloud connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference/#connect-to-eks).

This topic explains how to set up an AWS connector.

## Configure roles and policies

The necessary IAM roles and policies needed by the AWS account used in the connector depend on which AWS service you are using with Harness and which operations you want Harness to perform in AWS. For an extensive description of roles and policies, go to the [AWS Connector Settings Reference](../../../platform/7_Connectors/Cloud-providers/ref-cloud-providers/aws-connector-settings-reference.md).

AWS connectors can also inherit IAM roles from Harness delegates running in AWS. If you want your connector to inherit from a delegate, make sure the delegate has the necessary roles.

:::caution

The [DescribeRegions](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeRegions.html) action is required for all AWS connectors regardless of what AWS service you are using for your target infrastructure.

:::

If you find that the IAM role associated with your AWS connector doesn't have the policies required by the AWS service you want to access, you can modify or change the role assigned to the AWS account or the Harness delegate that your AWS connector is using. You may need to wait up to five minutes for the change to take effect.

:::tip

The AWS [IAM Policy Simulator](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_testing-policies.html) is a useful tool for evaluating policies and access.

:::

## Add an AWS connector and configure credentials

1. Open a Harness project, and select **Connectors** under **Project Setup**.
2. Select **New Connector**, and then select **AWS** under **Cloud Providers**.

   ![](../static/add-aws-connector-77.png)

3. Input a **Name** for the connector. **Description** and **Tags** are optional.
   Harness automatically creates an **Id** ([entity identifier](../../../platform/20_References/entity-identifier-reference.md)) for the connector based on the **Name**.
4. Select **Continue** to configure credentials.
5. Select one of the following three primary options:
  * **Assume IAM Role on Delegate:** The connector inherits its authentication credentials from the Harness delegate that is running in AWS. For example, you can select a Harness delegate running in Amazon Elastic Kubernetes Service (EKS).
  * **AWS Access Key:** Provide an [Access Key and Secret Access Key](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys) for the IAM role you want the connector to use.
  * **Use IRSA:** Allows the Harness Kubernetes delegate in AWS EKS to use a specific IAM role when making authenticated requests to resources. By default, the Harness Kubernetes delegate uses a ClusterRoleBinding to the **default** service account. Instead, with this option, you can use AWS [IAM roles for service accounts (IRSA)](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html) to associate a specific IAM role with the service account used by the Harness Kubernetes delegate. 

  :::info note

  Verify your firewall policy and make sure to whitelist all AWS endpoints for the services you're using. For more details, go to [view AWS service endpoints](https://docs.aws.amazon.com/general/latest/gr/rande.html#view-service-endpoints).

  :::  
  
  This option requires modifications to the delegate YAML, as described below.

<details>
<summary>Configure delegate YAML for IRSA</summary>

Setting up IRSA credentials requires a few more steps than other methods, but it is a simple process.

1. Create the IAM role with the policies you want the Delegate to use. The policies you select depend on what AWS resources you are deploying via the delegate.
2. In the cluster where the delegate will be installed, create a service account and attach the IAM role to it.
   Here is an example of how to create a new service account in the cluster where you will install the delegate and attach the IAM policy to it:

   ```
   eksctl create iamserviceaccount \
       --name=cdp-admin \
       --namespace=default \
       --cluster=test-eks \
       --attach-policy-arn=<policy-arn> \
       --approve \
       --override-existing-serviceaccounts —region=us-east-1
   ```

3. In Harness, download the Harness Kubernetes delegate YAML file. For instructions, go to [Install a Kubernetes Delegate](../../../platform/2_Delegates/install-delegates/install-a-kubernetes-delegate.md).
4. Open the delegate YAML file in text editor.
5. Add the service account with access to IAM role to the delegate YAML. There are two sections in the Delegate YAML that you must update:
   1. Update the `ClusterRoleBinding` by replacing the subject name `default` with the name of the service account with the attached IAM role, for example:

      ```
      ---
      apiVersion: rbac.authorization.k8s.io/v1beta1
      kind: ClusterRoleBinding
      metadata:
        name: harness-delegate-cluster-admin
      subjects:
        - kind: ServiceAccount
          name: default           // Change to relevant service account name, such as myserviceaccount
          namespace: harness-delegate-ng
      roleRef:
        kind: ClusterRole
        name: cluster-admin
        apiGroup: rbac.authorization.k8s.io
      ---
      ```

    1. Add `serviceAccountName` to the Deployment spec. For example:

      ```
      ...
          spec:
            serviceAccountName: myserviceaccount  // New line. Use the same service account name you used in the ClusterRole Binding.
            containers:
            - image: harness/delegate:latest
              imagePullPolicy: Always
              name: harness-delegate-instance
              ports:
               - containerPort: 8080
      ...
      ```
      :::info note
      For legacy delegate, add `serviceAccountName` to the Statefulset spec.

6. Save the delegate YAML file.
7. If you haven't already installed the delegate, [Install the Kubernetes delegate](../../../platform/2_Delegates/install-delegates/overview.md) in your EKS cluster and register the delegate with Harness. When you install the delegate in the cluster, the SA you added is used, and the environment variables `AWS_ROLE_ARN` and `AWS_WEB_IDENTITY_TOKEN_FILE` are added automatically by EKS.

</details>

6. To use cross-account ARN, select **Enable cross-account access (STS Role)**. This option is available for all authentication methods, but it may not be supported by all pipeline steps. For more information about cross-account access in AWS connectors, go to the [AWS connector settings reference](../../../platform/7_Connectors/Cloud-providers/ref-cloud-providers/aws-connector-settings-reference.md).
7. By default, Harness uses the `us-east-1` region to test the credentials for AWS connectors. If you want to use a different region or an AWS GovCloud account, select it in the **Test Region** field. For more information about AWS GovCloud support, go to the [AWS connector settings reference](../../../platform/7_Connectors/Cloud-providers/ref-cloud-providers/aws-connector-settings-reference.md).
8. Select **Continue** to proceed to **Select Connectivity Mode**.
   
:::tip

If you want to create an AWS Connector with a delegate using IAM Roles for Service Accounts (IRSA) on the EKS cluster with OIDC Provider, select **Use IRSA** in **Credentials**.

:::

## Select connectivity mode

Harness uses AWS connectors during pipeline runs to authenticate and perform operations with AWS.

1. Select how you want Harness to connect to AWS:
   * **Connect through Harness Platform:** Use a direct, secure communication between Harness and AWS.
   * **Connect through a Harness Delegate:** Harness communicates with AWS through a Harness delegate in AWS. You must choose this option if you chose **Use IRSA** or **Assume IAM Role on Delegate**.
2. If connecting through a Harness delegate, select either:
   * **Use any available Delegate**: Harness selects an available Delegate at runtime. To learn how Harness selects delegates, go to [Delegates Overview](/docs/platform/2_Delegates/delegate-concepts/delegate-overview.md).
   * **Only use Delegates with all of the following tags**: Use **Tags** to match one or more suitable delegates. To learn more about Delegate tags, go to [Select Delegates with Tags](/docs/platform/2_Delegates/manage-delegates/select-delegates-with-selectors.md).
     * Select **Install new Delegate** to add a delegate without exiting connector configuration. For guidance on installing delegates, go to [Delegate Installation Overview](/docs/platform/2_Delegates/delegate-concepts/delegate-overview.md).
3. Select **Save and Continue** to run the connection test, and then, if the test succeeds, select **Finish**. The connection test confirms that your authentication and delegate selections are valid.

<details>
<summary>AWS connector errors</summary>

If the connection test fails due to a credentials issue, use the AWS CLI or console to check the credentials. The AWS [IAM Policy Simulator](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_testing-policies.html) is useful for evaluating policies and access.

Due to the limited scope of the initial connection test, credentials can pass the connection test and then fail when you use the connector in a pipeline if the IAM role the connector is using doesn't have the roles and policies needed for the pipeline's operations. For example, if a pipeline has a Run step that references an AWS connector, the connector may need to have specific roles or policies to be able to execute the operations required by the Run step.

If you experience any errors with AWS connectors, verify that the IAM roles and policies it is using are correct. Notably, the [DescribeRegions](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeRegions.html) action is required for all AWS Cloud Providers regardless of what AWS service you are using for your target infrastructure.

For a list of roles and policies, go to the [AWS Connector Settings Reference](../../../platform/7_Connectors/Cloud-providers/ref-cloud-providers/aws-connector-settings-reference.md).

</details>

## See also

* [Harness Key Concepts](../../../../docs/getting-started/learn-harness-key-concepts.md)
* [Supported Platforms and Technologies](../../../../docs/getting-started/supported-platforms-and-technologies.md)
* [AWS connector settings reference](../../../platform/7_Connectors/Cloud-providers/ref-cloud-providers/gcs-connector-settings-reference.md)
