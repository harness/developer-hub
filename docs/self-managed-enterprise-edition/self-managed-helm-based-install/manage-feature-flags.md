---
title: Manage Feature Flags for Self-Managed Enterprise Edition Helm installations
description: Learn how to manage Feature Flags for Self-Managed Enterprise Edition Helm installations. 
# sidebar_position: 10
---

This topic describes how to manage Feature Flags for Harness Self-Managed Enterprise Edition. You update Feature Flags using the override.yml file for your base installation.

## View installed Feature Flags

Your base installation includes default Feature Flag settings.

To view installed Feature Flags, do the following:

1. Open your global overrides file in a text editor.

   :::info note
   This file is typically located in the following default path.

   ```
   /path/to/helm-charts/src/override-prod.yaml
   ```

2. Go to `platform`.

   Feature Flags included with the base installation are listed in this section.

## Add Feature Flags to your installation

To add Feature Flags, do the following:

1. Open your global overrides file in a text editor.

   :::info note
   This file is typically located in the following default path.

   ```
   /path/to/helm-charts/src/override-prod.yaml
   ```

2. Go to the `platform` section for the `harness-manager` component.

   ```yaml
      # ...
   platform:
     # ...
     harness-manager:
       # ...
       featureFlags:
         ADDITIONAL: "FF1,FF2"
   ```
   
   You can add additional Feature Flags that are not included with the base configuration here.

3. Add the Feature Flag.

   For example, to add the next generation `CDS_OrgAccountLevelServiceEnvEnvGroup` flag, enter the following.

   ```yaml
     # ...
   platform:
     # ...
   harness-manager:
      external_graphql_rate_limit: "500"
      autoscaling:
         enabled: true
         minReplicas: 2
      featureFlags:
         ADDITIONAL: "CDS_OrgAccountLevelServiceEnvEnvGroup"
   ```

4. Run Helm upgrade against your current release installation, referencing your updated values.

   ```
   helm upgrade <my-release> . -n harness-ng -f ../override-prod.yaml
   ```

   For Feature Flags that affect `ng-manager`, you must restart the component(s) after the Helm upgrade is complete and the Harness Manager has restarted and is up and running. You can restart your pods or run the following rollout restart command on the Harness Manager deployment for your installation.

   ```
   kubectl rollout restart deployment ng-manager
   ```

## Remove Feature Flags from your base installation

You can remove Feature Flags included with the base configuration.

To remove Feature Flags, do the following:

1. Open your global overrides file in a text editor.

   :::info note
   This file is typically located in the following default path.

   ```
   /path/to/helm-charts/src/override-prod.yaml
   ```

2. Go to the `Base` section for the `featureFlags` component.

```yaml
affinity: {}
### These flags are used by the helper function to create the FEATURES config value based off the global.<features.enabled boolean
# -- Feature Flags
featureFlags:
   # -- Base flags for all modules
   Base:
   "LDAP_SSO_PROVIDER, ASYNC_ARTIFACT COLLECTION, JIRA INTEGRATION, AUDIT TRAIL UI, GDS_TIME SERIES SAVE PER MINUTE, STACKDRIVER SERVICEGUARD, BATCH SECRET DECRYPTION, TIME SERIES SERVICEGUARD V2, TIME SERIES WORKFLOW V2, CUSTOM DASHBOARD, GRAPHOL, CV FEEDBACKS, LOGS_V2_247,UPGRADE JRE,LOG STREAMING INTEGRATION, NG HARNESS APPROVAL,GIT SYNC NG, NG SHOW DELEGATE,NG CG TASK ASSIGMENT ISOLATION, CI OVERVIEW PAGE, AZURE CLOUD PROVIDER VALIDATION ON DELEGATE, TERRAFORM AWS AUTHENTICATION, NG TEMPLATES, NEW DEPLOYMENT FREEZE, HELM CHART AS ARTIFACT, RESOLVE DEPLOYMENT TAGS BEFORE EXECUTION, WEBHOOK TRIGGER AUTHORIZATION, GITHUB WEBHOOK AUTHENTICATION, CUSTOM MANIFEST, GIT ACCOUNT SUPPORT, AZURE WEBAPP, PRUNE KUBERNETES_RESOURCES, LDAP GROUP_SYNC_JOB_ITERATOR, POLLING INTERVAL CONFIGURABLE, APPLICATION _DROPDOWN_MULTISELECT, USER GROUP AS EXPRESSION, RESOURCE CONSTRAINT SCOPE PIPELINE ENABLED,NG TEMPLATE GTYX"
   #NG -- Specific Feature Flags
   NG: "ENABLE_DEFAULT_NG EXPERIENCE FOR ONPREM, NEXT GEN ENABLED, NEW LEFT NAVBAR SETTINGS, SPG SIDENAV COLLAPSE"
```
