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
        tag: [{ value: "Integrations" }, {value: "Q1"}],
        link: "https://developer.harness.io/docs/database-devops/use-database-devops/set-up-connectors/#prerequisites-for-snowflake"
      },
      {
        title: "IAM Auth for GCP & Liquibase",
        description:
          "support using DBDevOps to connect with IAM Auth for GCP and Liquibase.",
        tag: [{ value: "Integrations" }, {value: "Q1"}]
      },
      {
        title: "Kerberos Auth",
        description:
          "support using DBDevOps to connect with Kerberos Auth for Oracle and MSSQL.",
        tag: [{ value: "Integrations" }, {value: "Q1"}],
        link: "https://developer.harness.io/docs/database-devops/features/kerberos-authentication/"
      },
      {
        title: "Author DB Change",
        description:
          "Author database change via natural language queries, powered by Harness AI.",
        tag: [{ value: "Core Features" }, {value: "Q4"}],
        link:"https://developer.harness.io/docs/database-devops/use-database-devops/configure-llm-for-database-devops"
      },  
      {
        title: "Native Flyway Support",
        description:
          "Add native support for using Flyway instead of Liquibase",
        tag: [{ value: "Integrations" }, {value: "Q4"}],
        link:"https://developer.harness.io/docs/database-devops/use-database-devops/get-started/onboarding-guide/"
      },
      {
        title: "AlloyDB Support",
        description:
          "Add Google AlloyDB as a supported database",
        tag: [{ value: "Integrations" }, {value: "Q4"}],
        link: "https://developer.harness.io/docs/database-devops/use-database-devops/set-up-connectors#setting-up-alloydb"
      },
      {
        title: "MongoDB Native Executor",
        description:
          "Allow directly running mongo.sh scripts from within a changeset",
        tag: [{ value: "Integrations" }, {value: "Q4"}],
        link: "https://developer.harness.io/docs/database-devops/concepts/database-devops/concepts/mongodb-command/#what-is-native-execution-for-mongodb"
      }
    ],
  },
  "Now": {
    description: "Currently under active development, ~ current quarter",
    feature: [       
      {
        title: "Support Percona",
        description:
          "Allow using Database DevOps with the percona online schema change plugin for mysql",
        tag: [{ value: "Integrations" }],
      },   
      {
        title: "Onboarding Wizard",
        description:
          "guided setup experience for new users",
        tag: [{ value: "Core Features" }],
      },    
      {
        title: "DynamoDB support",
        description:
          "support applying database changes to DynamoDB",
        tag: [{ value: "Integrations" }],
      },
      {
        title: "ECS Runner Support",
        description:
          "support using DB DevOps with an ECS runner instead of requiring a Kubernetes delegate.",
        tag: [{ value: "Integrations" }],
      },
      {
        title: "AI Author DB Change - v2",
        description:
          "simplify setup of AI Authorings ability to open a PR for the generated change.",
        tag: [{ value: "Core Features" }],
      },
      {
        title: "Support for DB2",
        description: 
          "Add DB2 as a supported database.",
        tag: [{ value: "Integrations" }],
      },
    ],
  },
  "Next": {
    description: "What we'll build next, next ~2 quarters",
    feature: [
      {
        title: "BigQuery Support",
        description:
          "Add Google BigQuery as a supported database",
        tag: [{ value: "Core Features" }],
      },
      {
        title: "Teradata Support",
        description:
          "Add Teradata as a supported database",
        tag: [{ value: "Core Features" }],
      },
      {
        title: "Impact Analysis",
        description: 
          "Automatically analyze changes against db metadata before applying to surface possible unintended consequences.",
        tag: [{ value: "Core Features" }],
      },
      {
        title: "BigTable Support",
        description:
          "Add Google BigTable as a supported database",
        tag: [{ value: "Integrations" }],
      },
      {
        title: "Oracle Native Executor",
        description: 
          "Allow directly running oracle SQL Scripts using Oracle's sqlplus command line utility, instead of Oracle's JDBC driver, which does not support certain proprietary Oracle features natively.",
        tag: [{ value: "Integrations"}],
      },
      {
        title: "MSSQL Native Executor",
        description: 
          "Allow directly running SQL Scripts using Microsoft's sqlcmd command line utility, instead of MSSQL's JDBC driver, which does not support certain proprietary MSSQL features natively.",
        tag: [{ value: "Integrations"}],
      },
      {
        title: "Governance for MongoDB",
        description: 
          "Ability to write rego policies when deploying to MongoDB",
        tag: [{ value: "Governance" }],
      },
      {
        title: "Relationship Diagram",
        description:
          "visualize the state of database tables within a db instance",
        tag: [{ value: "Core Features" }],
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
        tag: [{ value: "Integrations" }],
      },
      {
        title: "Support for AWS Redshift",
        description: 
          "Add support for the AWS Redshift database as a supported database type.",
        tag: [{ value: "Integrations" }],
      },
      {
        title: "Support for Couchbase",
        description: 
          "Add support for the Couchbase database as a supported database type.",
        tag: [{ value: "Integrations" }],
      },
      {
        title: "Support for Teradata",
        description: 
          "Add support for the Teradata database as a supported database type.",
        tag: [{ value: "Integrations" }],
      },
      {
        title: "Support for YugabyteDB",
        description: 
          "Add support for the YugabyteDB database as a supported database type.",
        tag: [{ value: "Integrations" }],
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
