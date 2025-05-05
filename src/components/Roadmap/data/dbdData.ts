import { Horizon } from "./roadmapData";
export const dbdData: Horizon = {
  "Recently Delivered": {
    description: "What has been released in the last ~2 Quarters",
    feature: [
      {
        title: "Spanner for Google SQL",
        description: "Added support for the Google SQL version of the Gogle spanned database as a supported database type.",
        tag: [{ value: "Database Support" }, {value: "Q1"}],
        link:"https://developer.harness.io/docs/database-devops/use-database-devops/set-up-connectors/#setting-up-google-spanner"
      },
      {
        tag: [{ value: "Visibility" }, {value: "Q1"}],
        title: "DB in Execution List",
        description:
          "Visibility into shcema name and db instance in the pipeline execution list. Must enable the feature flag: CDS_EXECUTION_LIST_CARD_VIEW",
      },
      {
        tag: [{ value: "Changelog" }, {value: "Q1"}],
        title: "Custom Script Source",
        description: "It is now possible to read a changelog via a custom script in addition to from git or artifactory.",
      },
      {
        tag: [{ value: "Changelog" }, {value: "Q1"}],
        title: "Support Property Overrides",
        link:"https://developer.harness.io/docs/database-devops/concepts-and-features/subs-properties-in-changelogs",
        description:
          "ability to define changelog property overrides on database instances, and reference them within your changelog",
      },
      {
        tag: [{ value: "Governance" }, {value: "Q4"}],
        title: "RBAC Support",
        description:
          "Ability to cointrol ability to edit db schema definition via RBAC roles.",
      },
      {
        tag: [{ value: "Visibility" }, { value: "Q4" }],
        title: "Dashboards Support",
        description:
          "Enable Reporting on DB DevOps using Harness Dashboards.",
      },
      {
        tag: [{ value: "Orchestration" }],
        title: "Rollback to Start of Deployment",
        description:
          "Provide easy ability for pipeline to rollback applied changes from the same pipeline",
        link: "https://developer.harness.io/docs/database-devops/use-database-devops/rollback-for-database-schemas#rolling-back-to-a-previous-database-state"
      }
    ],
  },
  "Now": {
    description: "Currently under active development, next ~1 quarter",
    feature: [
      {
        title: "Log Size phase 1",
        description:
          "Add compression to preview step logs to increase maximum supported SQL size beyond 64kb by approximately 5x.",
        tag: [{ value: "Orchestration" }],
      },
      {
        title: "Connector Secrets",
        description:
          "Add option to pass secrets to build pods without going through a Kubernetes secret object",
        tag: [{ value: "Governance" }],
      },
      {
        title: "Finish Governance",
        description:
          "Various enhancement on our policy enforcement to support known customer-specific policies",
        tag: [{ value: "Governance" }],
      },
      {
        title: "Change Audits",
        description:
          "Visibility into database changes and the history of applying them across numerous Database DevOps screens",
        tag: [{ value: "Visibility" }],
      }
    ],
  },
  "Next": {
    description: "Next planned work items, ~6 months out",
    feature: [
      {
        title: "Audit logs streaming on Sumo Logic",
        description:
          "Configure Sumo Logic as a streaming destination in Harness to send audit log data to your Sumo Logic hostel collectors.",
        tag: [{ value: "Audit Trail" }],
      },
      {
        title: "Audit events for expired API token",
        description:
          "Dedicated event for expiry of API tokens allowing for easy debugging.",
        tag: [{ value: "Audit Trail" }],
      },
      {
        title: "Granular RBAC Permissions for User Groups",
        description:
          "Granular permissions for User Groups to provide users more control while creating different roles.",
        tag: [{ value: "Access Control" }],
      },
      {
        title: "Impersonate a user",
        description:
          "Ability to impersonate a user allowing an impersonator to perform actions on the user behalf. This helps admins ensure that all users have desired access to resources.",
        tag: [{ value: "Access Control" }],
      },
      {
        title: "Granular RBAC Permissions for Dashboards",
        description:
          "Granular permissions for Dashboards to provide users more control while creating different roles.",
        tag: [{ value: "Access Control" }, { value: "Dashboards" }],
      },
      {
        title: "Auto save Dashboard",
        description:
          "Auto save progress made on dashboards.",
        tag: [{ value: "Dashboards" }],
      },
      {
        title: "Copy tiles from a dashboard",
        description:
          "Copy tile from one dashboard and use it in another dashboard.",
        tag: [{ value: "Dashboards" }],
      },
      {
        title: "Access control for Dashboard: Schedule Delivery",
        description:
          "Copy tile from one dashboard and use it in another dashboard.",
        tag: [{ value: "Dashboards" }, { value: "Access Control" }],
      },
      {
        title: "Auto upgrade Harness Docker Delegate",
        description:
          "",
        tag: [{ value: "Delegate" }],
      },
      {
        title: "High availability support for Harness Docker Delegate",
        description:
          "",
        tag: [{ value: "Delegate" }],
      },
      {
        title: "Send notifications through Delegate",
        description:
          "Receive central or pipeline notifications exclusively through Delegates or a designated delegate.",
        tag: [{ value: "Delegate" }],
      },
      {
        title: "Policy as Code for Variables",
        description:
          "Support for Variables as an entity to store and enforce policies for variables and processes across the Harness platform.",
        tag: [{ value: "Policy" }],
      },
      {
        title: "Customized notification body text",
        description:
          "Create and manage customized notification body text",
        tag: [{ value: "Notify" }],
      },
      {
        title: "Send high frequency notifications",
        description:
          "",
        tag: [{ value: "Notify" }],
      },
      {
        title: "List UI Improvements",
        description:
          "Revamping and optimizing the list view feature in our application's user interface across all modules",
        tag: [{ value: "UI" }],
      },
      {
        tag: [{value: "Pipeline"}],
        title: "Pipeline Data Retention",
        description:
          "Extended Data Retention, Data Archiving, and Compliance capabilities",
      },
      {
        tag: [{ value: "Pipeline" }, { value: "Template" }],
        title: "Template Library",
        description: "Open Source repository for Pipeline Templates",
      },
      {
        tag: [{value: "Pipeline"}],
        title: "Flexible Templates that Support User-Injected Steps",
        description: "Users can pull a template into their pipeline and inject a step into it.",
      },
      {
        tag: [{value: "Pipeline"}],
        title: "Bulk Reconciliation when a User Update a Template ",
        description: "When a user updates a template, they can now bulk update each pipeline referring to the template.",
      },
      {
        tag: [{ value: "Pipeline" }],
        title: "Priority Queue for Pipeline Execution",
        description: "",
      },
      {
        tag: [],
        title: "Console log line limit",
        description: "Ability to increase the console log line limits",
      },
      {
        tag: [{ value: "SMP" }],
        title: "Supported modules",
        description:
          "Supply Chain Security - Beta, Infrastructure as Code Mgmt - Beta",
      },
      {
        tag: [],
        title: "Auto Discovery of Entities in Git",
        description: "When an entity is created in Git it is created in Harness as well.",
      },
    ],
  },
  "Future": {
    description: "typically > 6 months out",
    feature: [
      {
        title: "Export audit trail as CSV",
        description:
          "Export audit trail as a CSV directly from Harness UI.",
        tag: [{ value: "Audit Trail" }],
      },
      {
        tag: [{ value: "Policy" }],
        title: "Policy to govern projects",
        description:
          "Support to allow policy to govern projects",
      },
      {
        tag: [{ value: "SMP" }],
        title: "Supported modules",
        description:
          "Internal Developer Portal",
      },
      {
        title: "Custom Login Message for SMP",
        description:
          "Add a custom message on the login screen in SMP. Typically used for Legal disclaimers.",
        tag: [{ value: "SMP" }],
      },
      {
        title: "Move Project between Organizations",
        description:
          "Move a project from one org to another to support scenarios like ownership change.",
        tag: [],
      },
      {
        title: "Increased in Data Retention period",
        description:
          "Support for increased data retention for Audit logs & Pipeline logs.",
        tag: [],
      },
      {
        tag: [{ value: "Pipeline" }, { value: "Insights" }],
        title: "Pipeline Analytics",
        description: "",
      },
      {
        tag: [{ value: "Pipeline" }],
        title: "DAG Support For Pipeline",
        description:
          "Enable complex flows such as parallel execution, stage grouping, etc.",
      },   
    ],
  }, 
};
