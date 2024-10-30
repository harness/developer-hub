---
title: Permissions Inheritance Logic From Containerized Step Groups to Steps
description: Understand how steps inherit step group permissions configuration.
---

The logic that Harness has in place to handle configuration collision between the privilege levels of step groups and its steps in a containerized step group has been updated. Previously, the run step would default to specific values instead of inheriting permissions from the containerized step group.

The logic has now been updated so that the Run Step will inherit permissions from its associated Step Group.

:::note
Currently, this feature is behind the feature flag `CDS_CONTAINER_STEP_GROUP_RUN_AS_USER_AND_PRIVILEGED_FIX`. Contact [Harness Support](mailto:support@harness.io) to enable the feature. 
:::

This KB article will go into the details of every upcoming behavior change from this update and how you could fix it if it caused one of your pipelines to fail. 

The new logic follows these steps:
1. Use the Run Step configuration.
2. If there isn’t a Run Step configuration, use the Step Group configuration.

Earlier, the second step was skipped, and instead defaulted to behavior defined by the customer cluster configuration as opposed to the Step Group. 
The settings can be found in the optional configuration of the step group or step in Container Security Context as seen here: 

The relevant fields are:
* `Privileged` - Select this option to run the container with elevated privileges. Accepts boolean values. 
* `Run as Non Root` - Select this option to mandate that the step group or step cannot be run as a root. Accepts boolean values. 
* `Run as User` - Define the Id of the user here. User 0 is the root user. Accepts integers.

![](../static/RunAsRootSettings.png)

## New permission inheritance logic use cases

### Case 1: 'Run as User' with 'Run as Non Root' set to False.
This use case looks at the `Run as User` setting and assumes a False value for `Run as Non Root` at the Step Group level. User 0 is the root user. 

#### Previous behavior:

|                              | Step Group (User 0) | Step Group (User 100) | Step Group (Nothing Specified) |
|------------------------------|---------------------|-----------------------|--------------------------------|
| Run Step (Nothing Specified) | User 0              | User 0                | User 0                         |

#### New behavior:
With the new logic in place, each step uses the inherited user properly from the step group. This means that some steps that were root user previously may not now run as root if your step group has nothing specified, or if the `Run as User` field set to anything other than 0. This loss of status can break pipelines that were relying on the higher level permissions.
 
|                              | Step Group (User 0) | Step Group (User 100) | Step Group (Nothing Specified) |
|------------------------------|---------------------|-----------------------|--------------------------------|
| Run Step (Nothing Specified) | User 0              | User 100              | Default user in the image      |


### Case 2: 'Run as User' with 'Run as Non Root' set to True.

This use case looks at the `Run as User` setting and assumes a True value for `Run as Non Root` at the Step Group level. User 0 is the root user.  

#### Previous behavior:

|                              | Step Group (User 0)                                                        | Step Group (User 100)                                                      | Step Group (Nothing Specified)                                             |
|------------------------------|----------------------------------------------------------------------------|----------------------------------------------------------------------------|----------------------------------------------------------------------------|
| Run Step (Nothing Specified) | Fail (Initialize step) Error: container's runAsUser breaks non-root policy | Fail (Initialize step) Error: container's runAsUser breaks non-root policy | Fail (Initialize step) Error: container's runAsUser breaks non-root policy |

 
#### New behavior:
Previously, the Run Step would default to User 0 if the `Run as User` field was left unspecified. This would cause the step to fail in every case where `Run as Non Root` was set to True in the step group since the step would violate the step group’s non-root policy. Now, the user Id is properly inherited from the step group where the Run Step user is unspecified. This means that the pipelines will run successfully now. 
 
|                              | Step Group (User 0)                                                        | Step Group (User 100) | Step Group (Nothing Specified) |
|------------------------------|----------------------------------------------------------------------------|-----------------------|--------------------------------|
| Run Step (Nothing Specified) | Fail (Initialize step) Error: container's runAsUser breaks non-root policy | User 100              | Default user in the image      |

### Case 3: The 'Privileged; field is checked with a subset of Steps
The `Privileged` field interacts differently depending on which step is being used. For this case, we will look at the behavior changes for the following steps: 
- Git Clone step 
- Background step 
- Plugin step 
- Run step
- All 3 SCS (Supply Chain Security) steps

#### Previous Behavior:

| Level (Privileged field) | Step group (true) | Step group (false) | Step group ( ) |
|--------------------------|-------------------|--------------------|----------------|
| Step Level ()            | true              | true               | true           |

#### New Behavior:
The containers that were being run as privileged before can no longer have those permissions. This can cause pipelines to fail. Make sure that your step is privileged if your pipeline fails.

| Level (Privileged field) | Step group (true) | Step group (false) | Step group ( ) |
|--------------------------|-------------------|--------------------|----------------|
| Step Level ()            | true              | false              | false          |

### Case 4: The 'Privileged' field is checked
Apart from the steps listed in case 3, this case describes the behavior if the `Privileged` field is checked.

#### Previous Behavior:

| Level (Privileged field) | Step group (true) | Step group (false) | Step group ( ) |
|--------------------------|-------------------|--------------------|----------------|
| Step Level ()            | false             | false              | false          |

#### New Behavior:
Previously, if a step had the **Privileged** field unspecified (neither True nor False), it would default to False. Now, the field’s value is properly inherited from the step group. This means that some steps that were not supposed to have privilege before are now privileged. This may cause unexpected behavior in some containers if that status is unneeded.

| Level (Privileged field) | Step group (true) | Step group (false) | Step group ( ) |
|--------------------------|-------------------|--------------------|----------------|
| Step Level ()            | true              | false              | false          |