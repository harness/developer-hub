Whereas chaos experiments are initiated and controlled through the experiment service account, **target accounts** are the accounts you'll subject to chaos experiments, so you can intentionally disrupt and manipulate their services.

In this section, you create an IAM role and set up an OIDC provider in each target account.

### Step 1: Create an IAM role and policy in each AWS target account

This step lets you grant permissions for Harness CE to inject chaos targeting various AWS services in the target account.

Create an IAM role and policy in each target account to provide the required permissions to access the desired resources in that account. You have the flexibility to define the level of permissions you wish to assign to Harness CE. For instructions, go to [Create an IAM role and policy](https://docs.aws.amazon.com/transfer/latest/userguide/requirements-roles.html) in the AWS documentation.

### Step 2: Set up the OIDC provider in all target accounts

Follow this procedure for each one of your target accounts.

To add the OIDC provider to each target account:

1. Determine your OIDC URL.

    1. Open the AWS Management Console and navigate to the Amazon EKS service.
    1. Select the EKS cluster that corresponds to the OIDC provider.
    1. Select the **Configuration** tab.
    1. Under the **OpenID Connect (OIDC)** section, locate the **Issuer URL**.

      An example Issuer URL looks like this:

      ```
      https://oidc.eks.us-east-2.amazonaws.com/id/FOSBW293U0Q92423BR43290RU
      ```
1. Navigate to the target account.
1. In the IAM dashboard, select **Identity Providers**, and then select **Add Provider**.
1. In the **Add an Identity provider** screen, for **Provider type**, select **OpenID Connect**.
1. Provide these required details of the OIDC provider:

    * **Provider URL:** Use the URL you retrieved in Step 1.
    * **Audience:** Specify `sts.amazonaws.com`.

1. Select **Add provider**.
1. Repeat these steps for each target account.

## Establish trust between the AWS source account and target accounts 

The AWS source account enables Harness CE to access resources across multiple target accounts.

### Step 1: Configure trust relationship in target accounts

Configure the trust relationship for each IAM role you created in a target account to allow the AWS source account's OIDC provider to assume that role.

**In each target account:** Edit the trust relationship for the IAM role you [created on the target account](#step-1-create-an-iam-role-and-policy-in-each-aws-target-account) as shown in the example below.

  You can find the JSON for the trust relationship in **AWS IAM > *ROLE_NAME* > Trust relationship** tab.

  In this example `2222222222` is the target account ID, and `1111111111` is the experiment service account ID:

  ```
  {
      "Version": "2012-10-17",
      "Statement": [
          {
              "Effect": "Allow",
              "Principal": {
                  "Federated": "arn:aws:iam::2222222222:oidc-provider/oidc.eks.us-east-2.amazonaws.com/id/AAAAA11111111C9909AEC6992AEFNWQO0"
              },
              "Action": "sts:AssumeRoleWithWebIdentity"
          }
      ]
  }
  ```

### Step 2: Enable the experiment service account to switch between target accounts

This procedure enables the experiment service account (`litmus-admin`) to seamlessly switch between target accounts when running experiments. To do this, you must annotate the experiment service account with the corresponding chaos role in each target account.

For example, if the target account has a role named `chaos-role`, you must annotate the litmus-admin service account with the unique ARN of that role. This enables seamless switching between target accounts for running experiments.

**To annotate the experiment service account with the role ARN:**

1. Run the following command:

  `kubectl annotate serviceaccount -n <chaos-namespace> <experiment-service-account-name> eks.amazonaws.com/role-arn=<role-arn>`

    Where:

    * `<chaos-namespace>` is the namespace where the chaos infrastructure is installed (usually `HCE`).
    * `<experiment-service-account-name>` is the name of your experiment service account (usually `litmus-admin`).
    * `<role-arn>` is the ARN of the role in the target account.

1. Repeat the above step for the chaos role in each target account.

## Enable AWS access using secrets from experiment definitions

When you create a new AWS chaos experiment, you can choose to enable or disable AWS access. You can select or deselect the button depending on your use of the secret references.

![Chaos experiment definition YAML](../../static/use-secret.png)
