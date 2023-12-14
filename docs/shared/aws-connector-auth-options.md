The **Use IRSA** option allows the Harness Kubernetes delegate in AWS EKS to use a specific IAM role when making authenticated requests to resources. By default, the Harness Kubernetes delegate uses a ClusterRoleBinding to the **default** service account. Instead, with this option, you can use AWS [IAM roles for service accounts (IRSA)](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html) to associate a specific IAM role with the service account used by the Harness Kubernetes delegate.

1. Verify your firewall policy and make sure to whitelist all AWS endpoints for the services you're using. For more details, go to [view AWS service endpoints](https://docs.aws.amazon.com/general/latest/gr/rande.html#view-service-endpoints).
2. Modify your delegate YAML, as described below.

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

3. In Harness, download the Harness Kubernetes delegate YAML file. For instructions, go to [Install a Kubernetes delegate](https://developer.harness.io/tutorials/platform/install-delegate/).
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

    2. Add `serviceAccountName` to the Deployment spec. For example:

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

      :::info
      For legacy delegate, add `serviceAccountName` to the Statefulset spec.
      :::

6. Save the delegate YAML file.
7. If you haven't already installed the delegate, [Install the Kubernetes delegate](https://developer.harness.io/tutorials/platform/install-delegate/) in your EKS cluster and register the delegate with Harness. When you install the delegate in the cluster, the SA you added is used, and the environment variables `AWS_ROLE_ARN` and `AWS_WEB_IDENTITY_TOKEN_FILE` are added automatically by EKS.

</details>

:::tip

To create an AWS Connector with a delegate using IAM Roles for Service Accounts (IRSA) on the EKS cluster with OIDC Provider, select **Use IRSA** in **Credentials**.

:::