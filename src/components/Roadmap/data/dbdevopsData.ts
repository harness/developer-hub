import { Horizon } from "./roadmapData";
export const DbdevopsData: Horizon = {
  "Recently Delivered": {
    description: "What has been released in the last ~2 Quarters",
    feature: [
      {
        title: "Spanner for Google SQL",
        description: "Added support for the Google SQL version of the Google Spanner database as a supported database type.",
        tag: [{ value: "Integrations" }, {value: "Q1"}],
        link:"https://developer.harness.io/docs/database-devops/use-database-devops/set-up-connectors/#setting-up-google-spanner"
      },
      {
        tag: [{ value: "Visibility" }, {value: "Q1"}],
        title: "DB in Execution List",
        description:
          "Visibility into schema name and db instance in the pipeline execution list. Must enable the feature flag: CDS_EXECUTION_LIST_CARD_VIEW",
      },
      {
        tag: [{ value: "Integrations" }, {value: "Q1"}],
        title: "Custom Script Source",
        description: "It is now possible to read a changelog via a custom script in addition to from git or artifactory connectors.",
      },
      {
        tag: [{ value: "Changelog" }, {value: "Q1"}],
        title: "Support Property Overrides",
        link:"https://developer.harness.io/docs/database-devops/concepts-and-features/subs-properties-in-changelogs",
        description:
          "ability to define changelog property overrides on database instances, and reference them within your changelog.",
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
          "Provide easy ability for pipeline to rollback applied changes from the same pipeline.",
        link: "https://developer.harness.io/docs/database-devops/use-database-devops/rollback-for-database-schemas#rolling-back-to-a-previous-database-state"
      }
    ],
  },
  "Now": {
    description: "Currently under active development, ~ current quarter",
    feature: [
      {
        title: "Log Size (Phase 1)",
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
    description: "What we'll build next, next ~2 quarters",
    feature: [
      {
        title: "Variable Branch Override",
        description:
          "Allow a DB Instance to read the branch it deploys to from a pipeline variable. This is useful for deploying feature branches.",
        tag: [{ value: "Orchestration" }],
      },
      {
        title: "Log Size (Phase 2)",
        description:
          "Change how we transport preview SQL from the build pod back to harness to remove the SQL size limit",
        tag: [{ value: "Orchestration" }],
      },
      {
        title: "Licensing",
        description:
          "Implement a subscription UI for Harness Database DevOps",
        tag: [{ value: "Governance" }],
      },
      {
        title: "Kerberos Auth",
        description:
          "Support Kerberos Auth for Oracle and MSSQL",
        tag: [{ value: "Integrations" }],
      },
      {
        title: "Variablized JDBC URL",
        description:
          "Allow referencing properties from a database instance inside the JDBC URL of a database connector.",
        tag: [{ value: "Orchestration" }],
      }
    ]
  },
  "Future": {
    description: "typically > 6 months out",
    feature: [
      {
        title: "Native Flyway Support",
        description:
          "Add native support for using Flyway instead of liquibase",
        tag: [{ value: "Integrations" }],
      },
      {
        title: "Support for Snowflake",
        description: "Add support for Snowflake as a supported database type.",
        tag: [{ value: "Integrations" }],
        link:"https://developer.harness.io/docs/database-devops/use-database-devops/set-up-connectors/#setting-up-google-spanner"
      },
      {
        title: "Support for Spanner for postgresql",
        description: "Add support for the postgres version of the Google spanner database as a supported database type.",
        tag: [{ value: "Integrations" }],
      },
      {
        title: "Support for AWS Redshift",
        description: "Add support for the AWS Redshift database as a supported database type.",
        tag: [{ value: "Integrations" }],
      },
      {
        title: "Support for Google BigQuery",
        description: "Add support for the Google BigQuery database as a supported database type.",
        tag: [{ value: "Integrations" }],
      },
      {
        title: "Support for Couchbase",
        description: "Add support for the Couchbase database as a supported database type.",
        tag: [{ value: "Integrations" }],
      },
      {
        title: "Support for Teradata",
        description: "Add support for the Teradata database as a supported database type.",
        tag: [{ value: "Integrations" }],
      },
      {
        title: "Support for YugabyteDB",
        description: "Add support for the YugabyteDB database as a supported database type.",
        tag: [{ value: "Integrations" }],
      },
      {
        tag: [{ value: "Governance" }],
        title: "Governance for MongoDB",
        description:
          "Ability to write rego policies when deploying to MongoDB",
      },
      {
        tag: [{ value: "Core Features" }],
        title: "Anonymized Queries",
        description:
          "Allow developers to run ad-hoc read queries against DBs, with an ability to anonymize results",
      },
      {
        title: "DB Provisioning",
        description:
          "integrate to Harness IACM to simplify DB provisioning and handling of ephemeral database environments.",
        tag: [{ value: "Core Features" }],
      },
      {
        title: "Drift Detection",
        description:
          "Detect and surface schema differences between a database and its expected state",
        tag: [{ value: "Core Features" }],
      },
      {
        title: "Impact Analysis",
        description:
          "Automatically analyze changes against db metadata before applying to surface possible unintended consequences.",
        tag: [{ value: "Core Features" }],
      },
      {
        tag: [{ value: "Core Features" }],
        title: "Linting",
        description: "Automatically lint changelogs and sql before application",
      }
    ],
  }, 
};
