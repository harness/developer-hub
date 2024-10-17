description: KB - Restrict a set of user to create/run particular set of pipelines
title: Allowing Certain Users to Save and Run Specific Pipelines in Harness: A Guide to OPA Policies
---

In today's fast-paced development environment, managing user permissions effectively is crucial for maintaining security and operational integrity. In Harness, you can enforce restrictions on who can create or run pipelines using policies based on Open Policy Agent (OPA). This article will guide you through setting up a policy to restrict users to only creating or executing pipelines that start with "infra-."

### Step 1: Create a User Group

The first step is to create a user group for the individuals you wish to restrict. This group, which we will call infra_users, will include all users who should have limited access to pipelines. By grouping users, you can easily manage permissions and enforce policies without needing to adjust settings for each user individually.

Navigate to the User Management section in Harness.

Create a new group and name it infra_users.

Add the desired users to this group.

### Step 2: Implement an OPA Policy

Next, you'll need to write an OPA policy that ensures only users in the infra_users group can save or run pipelines that begin with "infra-". The policy will include conditions to check the user's group membership and the pipeline name format.

Policy for Saving Pipelines

Here's the OPA policy for restricting save actions:

```package pipeline

# Allow saving pipelines only if the name starts with "infra"
allow {
    input.metadata.action == "onsave"                # Check if the action is 'onsave'
    user_in_group                                     # Ensure the user is in the specified group
    startswith(input.pipeline.name, "infra")         # Check if the pipeline name starts with "infra"
}

# Deny all other save actions
deny[msg] {
    input.metadata.action == "onsave"                # Check if the action is 'onsave'
    not allow                                          # If the conditions for allow are not met
    msg := sprintf("User '%s' is not allowed to save a pipeline named '%s'.", [input.metadata.user.name, input.pipeline.name])
}

# Check if the user is part of the infra_users group
user_in_group {
    group := input.metadata.userGroups[_]            # Get user group information
    group.identifier == "infra_users"                 # Match the identifier
    group.users[_] == input.metadata.principalIdentifier  # Check if the user is in the group
}
```

Policy for Running Pipelines

Similarly, you can implement the following policy to restrict run actions:

```package pipeline

# Allow execution of pipelines only if the name starts with "infra"
allow {
    input.metadata.action == "onrun"                # Check if the action is 'onrun'
    user_in_group                                    # Ensure the user is in the specified group
    startswith(input.pipeline.name, "infra")        # Check if the pipeline name starts with "infra"
}

# Deny all other execution attempts
deny[msg] {
    input.metadata.action == "onrun"                 # Check if the action is 'onrun'
    not allow                                         # If the conditions for allow are not met
    msg := sprintf("User '%s' is not allowed to execute the pipeline named '%s'.", [input.metadata.user.name, input.pipeline.name])
}

# Check if the user is part of the infra_users group
user_in_group {
    group := input.metadata.userGroups[_]            # Get user group information
    group.identifier == "infra_users"                 # Match the identifier
    group.users[_] == input.metadata.principalIdentifier  # Check if the user is in the group
}
```
### Step 3: Deploy the Policy

Once your policy is defined, you'll need to deploy it in the Harness platform. Follow these steps:

Access the Governance section in the Harness platform.

Select Policy as Code to create a new policy.

Paste the OPA policies you have written for saving and running pipelines and Save it.

Go to policy sets in the same section, and create a new policy set, add these two policies there, and save the policy set.

Enable the policy set.


### Conclusion

By implementing these OPA policies, you can effectively restrict users in the infra_users group to only creating and running pipelines that start with "infra-". This setup not only enhances security but also streamlines governance across your development processes.

For further information on Harness policies and OPA implementation, refer to the Harness OPA Policies [Documentation](https://developer.harness.io/docs/platform/governance/policy-as-code/harness-governance-overview/). By leveraging the power of policies as code, you can maintain a secure and compliant development environment tailored to your organizational needs.
