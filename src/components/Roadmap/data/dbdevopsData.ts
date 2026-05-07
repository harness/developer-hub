import { Horizon } from "./roadmapData";
import type { ModuleTheme } from "./roadmapPalette";

export const dbdevopsModuleTheme: ModuleTheme = {
  moduleKey: "dbdevops",
  moduleTitle: "Database DevOps",
  palette: {
    light: { bg: "#F6FFF2", text: "#30841F" },
    dark: { bg: "#1E3320", text: "#8ED982" },
  },
};

export const DbdevopsData: Horizon = {
  "Recently Delivered": {
    description: "What has been released in the last ~2 Quarters",
    feature: [
      {
        title: "Snowflake Support",
        description:
          "support using DBDevOps against Snowflake.",
        tag: [{ value: "Database Support" }, {value: "Q1"}],
        link: "https://developer.harness.io/docs/database-devops/use-database-devops/set-up-connectors/#prerequisites-for-snowflake"
      },
      {
        title: "DB2 Support",
        description:
          "support using DBDevOps against DB2 (LUW, iseries, or zOS).",
        tag: [{ value: "Database Support" }, {value: "Q1"}],
        link: "https://developer.harness.io/release-notes/database-devops/#release-187x"
      },
      {
        title: "BigQuery Support",
        description:
          "support using DBDevOps against Google Bigquery.",
        tag: [{ value: "Database Support" }, {value: "Q1"}],
        link: "https://developer.harness.io/release-notes/database-devops#release-189x"
      },
      {
        title: "GCP Keyless auth for Liquibase",
        description:
          "support using DBDevOps to connect with the delegate service account for GCP and Liquibase.",
        tag: [{ value: "Authentication" }, {value: "Q1"}],
        link: "https://developer.harness.io/docs/database-devops/features/keyless-authentication"
      },
      {
        title: "GCP OIDC auth for Liquibase",
        description:
          "support using DBDevOps to connect with the OIDC for GCP and Liquibase.",
        tag: [{ value: "Authentication" }, {value: "Q1"}],
        link: "https://developer.harness.io/docs/database-devops/features/oidc-authentication"
      },
      {
        title: "Kerberos Auth",
        description:
          "support using DBDevOps to connect with Kerberos Auth for Oracle and MSSQL.",
        tag: [{ value: "Authentication" }, {value: "Q1"}],
        link: "https://developer.harness.io/docs/database-devops/features/kerberos-authentication/"
      },
      {
        title: "Support Percona Toolkit",
        description:
          "Allow using Database DevOps with the percona online schema change plugin for mysql",
        tag: [{ value: "Integrations" }, {value: "Q1"}],
        link: "https://developer.harness.io/docs/database-devops/features/using-percona-for-mysql/"
      },
      {
        title: "Execution Time Optimization Part 1",
        description:
          "Decreases how many containers the apply step runs. This is behind a feature flag currently, contact Harness for access.",
        tag: [{ value: "Core Features" }, {value: "Q1"}]
      }
    ],
  },
  "Now": {
    description: "Currently under active development, ~ current quarter",
    feature: [       
      {
        title: "Onboarding Wizard",
        description:
          "guided setup experience for new users",
        tag: [{ value: "Core Features" }],
      },    
      {
        title: "BigTable support",
        description:
          "support applying database changes to Google BigTable",
        tag: [{ value: "Database Support" }],
      },   
      {
        title: "DynamoDB support",
        description:
          "support applying database changes to Google BigTable",
        tag: [{ value: "Database Support" }],
      },  
      {
        title: "Oracle Native Executor",
        description:
          "leverage native oracle cli to deploy your changes when using liquibase.",
        tag: [{ value: "Database Support" }],
      },  
      {
        title: "MS SQL Native Executor",
        description:
          "leverage native MS SQL cli to deploy your changes when using liquibase.",
        tag: [{ value: "Database Support" }],
      },
      {
        title: "ECS Runner Support",
        description:
          "support using DB DevOps with an ECS runner instead of requiring a Kubernetes delegate.",
        tag: [{ value: "Integrations" }],
      },
      {
        title: "Impact Analysis",
        description: 
          "Automatically analyze changes against db metadata before applying to surface possible unintended consequences.",
        tag: [{ value: "Core Features" }],
      },
      {
        title: "Pin Image UI",
        description:
          "UI for managing drone image versions used by DB DevOps.",
        tag: [{ value: "Core Features" }],
      },
      {
        title: "AI Author DB Change - v2",
        description:
          "simplify setup of AI Authorings ability to open a PR for the generated change.",
        tag: [{ value: "Core Features" }],
      },
      {
        title: "Execution Time Optimization Part 2",
        description:
          "Decreases execution time for the new containers the apply step runs.",
        tag: [{ value: "Core Features" }, {value: "Q1"}]
      }
    ],
  },
  "Next": {
    description: "What we'll build next, next ~2 quarters",
    feature: [
      {
        title: "Relationship Diagram",
        description:
          "visualize the state of database tables within a db instance",
        tag: [{ value: "Core Features" }],
      },
      {
        title: "Author DB Change Files Support",
        description:
          "Allow Providing files that author db change leverages during authoring (e.g. a CSV file)",
        tag: [{ value: "Core Features" }],
      },
      {
        title: "Entra Auth for Liquibase",
        description:
          "First class for authenticating using Entra authentication when deploying using liquibase",
        tag: [{ value: "Authentication" }],
      },
      {
        title: "Neo4j Support",
        description:
          "support applying database changes to Neo4j",
        tag: [{ value: "Database Support" }],
      },
      {
        title: "Databricks Support",
        description:
          "support applying database changes to Databricks",
        tag: [{ value: "Database Support" }],
      },
      {
        title: "Yugabyte Support",
        description:
          "support applying database changes to Yugabyte",
        tag: [{ value: "Database Support" }],
      },
      {
        title: "Entra Auth for Liquibase",
        description:
          "First class for authenticating using Entra authentication when deploying using liquibase",
        tag: [{ value: "Authentication" }],
      },
      {
        title: "Governance for MongoDB",
        description: 
          "Ability to write rego policies when deploying to MongoDB",
        tag: [{ value: "Governance" }],
      },
      {
        title: "OOTB Policy Library",
        description: 
          "a Library of example policies in product",
        tag: [{ value: "Governance" }],
      },
    ]
  },
  "Future": {
    description: "typically > 6 months out",
    feature: [
      {
        title: "Support for Spanner for postgresql",
        description: 
          "Add support for the postgres version of the Google spanner database as a supported database type.",
        tag: [{ value: "Database Support" }],
      },
      {
        title: "Support for AWS Redshift",
        description: 
          "Add support for the AWS Redshift database as a supported database type.",
        tag: [{ value: "Database Support" }],
      },
      {
        title: "Support for Couchbase",
        description: 
          "Add support for the Couchbase database as a supported database type.",
        tag: [{ value: "Database Support" }],
      },
      {
        title: "Support for Teradata",
        description: 
          "Add support for the Teradata database as a supported database type.",
        tag: [{ value: "Database Support" }],
      },
      {
        title: "DB Provisioning",
        description:
          "integrate to Harness IACM to simplify DB provisioning and handling of ephemeral database environments.",
        tag: [{ value: "Core Features" }],
      },
      {
        tag: [{ value: "Core Features" }],
        title: "Changelog Generation",
        description: 
          "Automatically generate a baseline changelog from an existing database config without authoring a custom pipeline",
      },
      {
        title: "Query Console",
        tag: [{ value: "Core Features" }],
        description: 
          "Allow developers to run ad-hoc read queries against DBs, with an ability to anonymize results",
      },
      {
        title: "Drift Detection",
        description:
          "Detect and surface schema differences between a database and its expected state",
        tag: [{ value: "Core Features" }],
      },
      {
        title: "Variablized JDBC URL",
        description:
          "Allow referencing properties from a database instance inside the JDBC URL of a database connector.",
        tag: [{ value: "Orchestration" }],
      },
    ],
  }, 
};
