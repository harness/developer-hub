---
title: How to Set up Least Privilege Access with Fiat
---

## Introduction
Customers may find that they wish to set up FIAT with least privileges in order to limit access.

To start, it is important to note that in FIAT, if customers do not define any rules for the service, and the FIAT service is nevertheless enabled, access defaults full permissions for all users.  Therefore, in order to secure using FIAT, at least one definition needs to be provided so that security is defined and applied.

Another concept to understand is that security within FIAT lies within two Spinnaker micro services.
* Definitions within FIAT control the general outline of access to the Spinnaker console.  The access granted is provided on the ***application level only*** and cannot be created granularly on the pipeline level, or on a larger scale on the project level* Definitions for access within CloudDriver determine whether a particular user is able to access cloud resources; whether to read what is in the cloud resources or to execute and make changes to the resources
With those concepts in mind, we can talk about the steps to creating tighter access in FIAT

## Prerequisites
[Authentication should also be already set up and established](https://spinnaker.io/setup/security/authentication/).  
Authentication is used to confirm the role/group a particular user and will be used to provide a set of access rights via FIAT Authorization.  Establish which accounts will be ```Administration Accounts``` that have full access rights and the name of their role/group must be done before proceeding.
[Authorization (FIAT)](https://docs.armory.io/docs/overview/fiat-permissions-overview/) should already be established and enabled before hand.  This should be tested and the pod should be running.

## Instructions
FIAT's configuration should be done in two phases, with the first phase establishing that Administrators have the correct access rights, and a second phase to provide least privilege access for the rest of the team.
The following is some background to the situation/scenario 
An external service (e.g. OKTA) is being used for the authentication
* The OKTA service has multiple groups defined within it and users are members of these groups named ```spinadmin```, ```superadmin```, ```prod```, ```dev```, ```devb``` ```qa```, ```orange``` and ```banana```* Not all groups will require the same permissions
* The example also will have some considerations for possible future Dinghy setup and security* Kustomize is being used in the example to allow for brevity in the file changes* The environment resides within AWS
### Phase 1: Creating Access for Administrators
The below yaml code is an example of the changes that would be implemented in the FIAT section of the Operator SpinnakerService yaml.  In this example, a separate Kustomize file with these settings would be patched
The following are some notes about the configuration:```groupMembership.service``` is ```EXTERNAL``` because OKTA is in place```admin``` roles are being provided to the two admin groups, ```spinadmin``` and ```superadmin``` because a set of users should have admin/highest/unlimited privileges or the environment risks becoming locked out.  Permissions need to be defined, or all users will have complete access as Spinnaker's default state is to allow full access unless some access is defined within FIAT
```
apiVersion: spinnaker.io/v1alpha2
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    config:
      features:
        fiat: true
      security:
        authz:
          enabled: true
          groupMembership:
            service: EXTERNAL
    profiles:
      fiat:
        admin:
          roles:
            - spinadmin
            - superadmin​
```
It is also important to define the CloudDriver access permissions.  The permissions on the CloudDriver level/account level for each cloud service/account determines whether a user will have permissions to use CloudDriver to access resources.The example in the yaml below provides ```spinadmin```, ```superadmin```, ```prod``` and ```dev``` group members the ability to view resources within AWS.  For example, to be able to find a Target Group so that it can be used later, or discover an AMI based on its tag.However, only ```spinadmin```, ```superadmin```, and ```prod``` accounts are able to create or change resources in the cloud.  Members of the ```dev``` group will not have permissions.  Of particular note is that if this section is left blank, then any group members will be able to deploy into the AWS account.  The absence of any definition of access will mean that access will default to being available for all users.  This can be extremely important for users who are intending to bypass using the Spinnaker Console, and instead wish to use Dinghy.
```
apiVersion: spinnaker.io/v1alpha2
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    config:
      providers:
        aws:
          enabled: true
          primaryAccount: armory-example
          accounts:
          - name: armory-example
            requiredGroupMembership: []
            providerVersion: V1
            permissions:
              READ:
              - spinadmin
              - superadmin
              - prod
              - dev
              WRITE:
              - spinadmin
              - superadmin
              - prod
            accountID: '11111111111111111'
            regions:
            - name: us-east-1
            - name: eu-west-1
            assumeRole: role/ArmoryExample-role
```
* Compile and apply the changes into the environment using ```kubectl```Test and confirm the access restrictions. Check user or service account permissions for all of Spinnaker. This should return a JSON listing what roles the user/service account is in, what Spinnaker applications the user/service account has access to, what clouddriver accounts the user/service account has access to, and what build services the user/service account has access to.In the example below, ```http://spin-fiat:7003``` is the local service endpoint for FIAT, and may need to be modified for your environment.Please also replace ```$user-or-service-account​``` with the name of the user or service account
```
> export FIAT=http://spin-fiat:7003
> curl -s $FIAT/authorize/$user-or-service-account​
```

### Phase 2: Provide additional permissions to other groups
After administrative access has been provided to the administration groups, it is now time to add additional permissions for the rest of the teams. The below yaml code is an example of the changes that would be implemented in the FIAT section of the Operator SpinnakerService yaml.  In this example, a separate Kustomize file with these settings would be patched
The following are some notes about the configuration:```fiat.restrictApplicationCreation``` is set to ```true``` in order to limit the creation of additional applications.  If users end up creating applications that do not fall under the naming conventions (e.g., in the case below, not starting with ```banana``` or ```orange```, the end user may end up creating an application that they cannot access.  Instead, application creation becomes managed by the administrators, and they will need to toggle this setting whenever an adjustment must be made```auth.permissions.source.application.front50.enabled``` is set to ```false``` in order to turn off the ability for applications to be created within Front50, from the UI.  Without setting this parameter, [permissions set within the UI](https://docs.armory.io/docs/overview/fiat-permissions-overview/#applications) will be aggregated with the permissions defined below.  This can make it harder to determine the effective permissions for a user.```Full Permissions``` are provided to the ```Admin groups``` in order to guarantee that someone can administer all applications.  This is set here to ensure that superusers can still have access in the case access is lost```Each prefix definition``` determines what applications the groups defined will have access to.  The sections below defining ```CREATE```, ```READ```, ```WRITE``` and ```EXECUTE``` determine the amount of access a group has.  Wildcards can be used so that applications with certain naming conventions will be allowed for particular groups.
```
apiVersion: spinnaker.io/v1alpha2
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    profiles:
      fiat:
        fiat.restrictApplicationCreation: true
        auth.permissions.provider.application: aggregate
        auth.permissions.source.application.front50.enabled: false
        auth.permissions.source.application.prefix:
          enabled: true
          prefixes:
            - prefix: "*"
              permissions:
                CREATE:
                  - "spinadmin"
                  - "superadmin"
                READ:
                  - "spinadmin"
                  - "superadmin"
                  - "prod"                
                WRITE:
                  - "spinadmin"
                  - "superadmin"
                  - "prod" 
                EXECUTE:
                  - "spinadmin"
                  - "superadmin"
                  - "prod" 
            - prefix: "orange*"
              permissions:
                CREATE:
                  - "orange"
                  - "dev"
                  - "qa"
                  - "prod" 
                READ:
                  - "orange"
                  - "dev"
                  - "qa"
                  - "prod" 
                WRITE:
                  - "orange"
                  - "dev"
                  - "qa"
                  - "prod" 
                EXECUTE:
                  - "orange"
                  - "dev"
                  - "qa"
                  - "prod" 
            - prefix: "banana*"
              permissions:
                READ:
                  - "banana"
                  - "dev"
                  - "qa"
                  - "prod" 
                  - "devb"
                WRITE:
                  - "banana"
                  - "prod" 
                  - "devb"
                EXECUTE:
                  - "banana"
                  - "prod" 
                  - "devb"
```
Please note that if you wish to declare certain groups to have Administration access to override the ```restrictApplicationCreation``` property at all times, this can be accomplished by formatting the restriction like so:
```
apiVersion: spinnaker.io/v1alpha2
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    profiles:
      fiat:
        fiat:
          restrictApplicationCreation: true
          admin:
            roles:
              - "spinadmin"
        auth.permissions.provider.application: aggregate
        auth.permissions.source.application.front50.enabled: false
        auth.permissions.source.application.prefix:
          enabled: true
          prefixes:
            - prefix: "*"
              permissions:
                CREATE:
                  - "spinadmin"
                  - "superadmin"
                READ:
                  - "spinadmin"
                  - "superadmin"
                  - "prod"                
                WRITE:
                  - "spinadmin"
                  - "superadmin"
                  - "prod" 
                EXECUTE:
                  - "spinadmin"
                  - "superadmin"
                  - "prod" 
            - prefix: "orange*"
              permissions:
                CREATE:
                  - "orange"
                  - "dev"
                  - "qa"
                  - "prod" 
                READ:
                  - "orange"
                  - "dev"
                  - "qa"
                  - "prod" 
                WRITE:
                  - "orange"
                  - "dev"
                  - "qa"
                  - "prod" 
                EXECUTE:
                  - "orange"
                  - "dev"
                  - "qa"
                  - "prod" 
            - prefix: "banana*"
              permissions:
                READ:
                  - "banana"
                  - "dev"
                  - "qa"
                  - "prod" 
                  - "devb"
                WRITE:
                  - "banana"
                  - "prod" 
                  - "devb"
                EXECUTE:
                  - "banana"
                  - "prod" 
                  - "devb"
```
* Compile and apply the changes into the environment using ```kubectl```Test and confirm the access restrictions. 
```
> export FIAT=http://spin-fiat:7003
> curl -s $FIAT/authorize/$user-or-service-account​
```

