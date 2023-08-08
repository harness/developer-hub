---
title: Manage Feature Flags
description: Learn how to manage Feature Flags for Self-Managed Enterprise Edition Helm installations.
# sidebar_position: 10
---

This topic describes how to manage Feature Flags for Harness Self-Managed Enterprise Edition. You update Feature Flags using the `override.yaml` file for your base installation.

## View installed Feature Flags

Your base installation includes default Feature Flag settings.

To view installed Feature Flags, do the following:

1. Open your global `override-prod.yaml` file in a text editor.

   :::info note
   This file is typically located in the following default path.

   ```
   /path/to/helm-charts/src/override-prod.yaml
   ```
   :::



2. Go to `platform`.

   Feature Flags included with the base installation are listed in this section.

## Add Feature Flags to your installation

To add Feature Flags, do the following:

1. Open your global `override-prod.yaml` file in a text editor.

   :::info note
   This file is typically located in the following default path.

   ```
   /path/to/helm-charts/src/override-prod.yaml
   ```
   :::

2. Go to the `platform` section for the `harness-manager` component.

   ```yaml
      harness-manager:
       external_graphql_rate_limit: "500"
       autoscaling:
         enabled: true
         minReplicas: 2
       # -- These flags are used by the helper function to create the FEATURES config value based off the global.<feature>.enabled boolean
       # -- Feature Flags
      featureFlags:
         # -- Base flags for all modules(enabled by Default)
         Base: "LDAP_SSO_PROVIDER,ASYNC_ARTIFACT_COLLECTION,JIRA_INTEGRATION,AUDIT_TRAIL_UI,GDS_TIME_SERIES_SAVE_PER_MINUTE,STACKDRIVER_SERVICEGUARD,BATCH_SECRET_DECRYPTION,TIME_SERIES_SERVICEGUARD_V2,TIME_SERIES_WORKFLOW_V2,CUSTOM_DASHBOARD,GRAPHQL,CV_FEEDBACKS,LOGS_V2_247,UPGRADE_JRE,LOG_STREAMING_INTEGRATION,NG_HARNESS_APPROVAL,GIT_SYNC_NG,NG_SHOW_DELEGATE,NG_CG_TASK_ASSIGNMENT_ISOLATION,CI_OVERVIEW_PAGE,AZURE_CLOUD_PROVIDER_VALIDATION_ON_DELEGATE,TERRAFORM_AWS_CP_AUTHENTICATION,NG_TEMPLATES,NEW_DEPLOYMENT_FREEZE,HELM_CHART_AS_ARTIFACT,RESOLVE_DEPLOYMENT_TAGS_BEFORE_EXECUTION,WEBHOOK_TRIGGER_AUTHORIZATION,GITHUB_WEBHOOK_AUTHENTICATION,CUSTOM_MANIFEST,GIT_ACCOUNT_SUPPORT,AZURE_WEBAPP,LDAP_GROUP_SYNC_JOB_ITERATOR,POLLING_INTERVAL_CONFIGURABLE,APPLICATION_DROPDOWN_MULTISELECT,USER_GROUP_AS_EXPRESSION,RESOURCE_CONSTRAINT_SCOPE_PIPELINE_ENABLED,NG_TEMPLATE_GITX,ELK_HEALTH_SOURCE,NG_ENABLE_LDAP_CHECK,CVNG_METRIC_THRESHOLD,SRM_HOST_SAMPLING_ENABLE,SRM_ENABLE_HEALTHSOURCE_CLOUDWATCH_METRICS,NG_SETTINGS"
         # -- NG Specific Feature Flags(activated when global.ng is enabled)
         NG: "ENABLE_DEFAULT_NG_EXPERIENCE_FOR_ONPREM,NEXT_GEN_ENABLED,NEW_LEFT_NAVBAR_SETTINGS,SPG_SIDENAV_COLLAPSE"
         # -- CD Feature Flags (activated when global.cd is enabled)
         CD: ""
         # -- CI Feature Flags (activated when global.ci is enabled)
         CI: "CING_ENABLED,CI_INDIRECT_LOG_UPLOAD"
         # -- STO Feature Flags (activated when global.sto is enabled)
         STO: "SECURITY,SECURITY_STAGE,STO_CI_PIPELINE_SECURITY,STO_API_V2"
         # -- SRM Flags (activated when global.srm is enabled)
         SRM: "CVNG_ENABLED"
         # -- Custom Dashboard Flags (activated when global.dashboards is enabled)
         CDB: "NG_DASHBOARDS"
         # -- FF Feature Flags (activated when global.ff is enabled)
         FF: "CFNG_ENABLED"
         # -- CCM Feature Flags (activated when global.ccm is enabled)
         CCM: "CENG_ENABLED,CCM_MICRO_FRONTEND,NODE_RECOMMENDATION_AGGREGATE"
         # -- GitOps Feature Flags (activated when global.gitops is enabled)
         GitOps: "GITOPS_ONPREM_ENABLED,CUSTOM_ARTIFACT_NG,SERVICE_DASHBOARD_V2,OPTIMIZED_GIT_FETCH_FILES,MULTI_SERVICE_INFRA,ENV_GROUP,NG_SVC_ENV_REDESIGN"
         # -- OPA (activated when global.opa is enabled)
         OPA: ""
         # -- CHAOS Feature Flags (activated when global.chaos is enabled)
         CHAOS: "CHAOS_ENABLED"
         # -- CET Feature Flags (activated when global.cet is enabled)
         CET: "CET_ENABLED,SRM_CODE_ERROR_NOTIFICATIONS,SRM_ET_RESOLVED_EVENTS,SRM_ET_CRITICAL_EVENTS"
         # -- Disables OLD_GIT_SYNC if .global.ngGitSync is enabled
         OLDGITSYNC : "USE_OLD_GIT_SYNC"
         # -- AutoAccept Feature Flags
         SAMLAutoAccept: "AUTO_ACCEPT_SAML_ACCOUNT_INVITES,PL_NO_EMAIL_FOR_SAML_ACCOUNT_INVITES"
         # -- Additional Feature Flag (placeholder to add any other featureFlags)
         ADDITIONAL: ""
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

   :::info note
   For Feature Flags that affect `ng-manager`, you must restart the component(s) after the Helm upgrade is complete and the Harness Manager has restarted and is up and running. You can restart your pods or run the following rollout restart command on the Harness Manager deployment for your installation.

   ```
   kubectl rollout restart deployment ng-manager
   ```
   :::

   :::info note
   This example is the snapshot to update the Helm chart. You can also update the `values.yaml` file for your Kubernetes delegate.
   :::
