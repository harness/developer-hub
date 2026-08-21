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
        title: "Oracle Native Executor",
        description:
          "leverage native oracle cli to deploy your changes when using liquibase.",
        tag: [{ value: "Database Support" }, {value: "Q3"}],
      },  
      {
        title: "MS SQL Native Executor",
        description:
          "leverage native MS SQL cli to deploy your changes when using liquibase.",
        tag: [{ value: "Database Support" }, {value: "Q3"}],
      },  
      {
        title: "Database Change Impact Analysis",
        description:
          "Automatically analyze changes against db metadata before applying to surface possible unintended consequences.",
        tag: [{ value: "Core Features" }, {value: "AI"}, {value: "Q3"}],
      },  
      {
        title: "AI Authoring Rules Support",
        description:
          "can now centrally define rules when using AI change authoring.",
        tag: [{ value: "AI" }, {value: "Q3"}],
      },
      {
        title: "Pin Image UI",
        description:
          "Allow pinning drone images through project settings instead of only via API",
        tag: [{ value: "Core Features" }, {value: "Q2"}]
      },
      {
        title: "Execution Time Optimization Part 2",
        description:
          "Optomize liquibase container execution time.",
        tag: [{ value: "Core Features" }, {value: "Q2"}]
      },
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
          "support applying database changes to Google BigTable. Currently available in Beta for everything except Author DB Change.",
        tag: [{ value: "Database Support" }],
      },
      {
        title: "ECS Runner Support",
        description:
          "support using DB DevOps with an ECS runner instead of requiring a Kubernetes delegate. Currently available within 1 AWS account in Beta.",
        tag: [{ value: "Integrations" }],
      },
      {
        title: "AI Author DB Change - v2",
        description:
          "simplify setup of AI Authorings ability to open a PR for the generated change.",
        tag: [{ value: "Core Features"},{value: "AI"}],
      },
      {
        title: "Execution Time Optimization Part 3",
        description:
          "further decrease container account and execution time of DBD steps.",
        tag: [{ value: "Core Features" }]
      },
      {
        title: "Governance for MongoDB/BigTable",
        description:
          "Allow OPA policies to analyze the yaml of a change, not just the SQL it compiles to.",
        tag: [{ value: "Core Features" }]
      },
      {
        title: "Simplify Pipeline Config",
        description:
          "Simplify configuration of several pipeline DB Change patterns.",
        tag: [{ value: "Core Features" }]
      },  
      {
        title: "Cassandra support",
        description:
          "Support using Database DevOps with Cassandra.",
        tag: [{ value: "Database Support" }],
      },
      {
        title: "Databricks support",
        description:
          "Support using Database DevOps with Databricks.",
        tag: [{ value: "Database Support" }],
      },
      {
        title: "Neo4j support",
        description:
          "Support using Database DevOps with Neo4j.",
        tag: [{ value: "Database Support" }],
      },
      {
        title: "Entra Auth support",
        description:
          "Support using Entra Authentication with Azure databases.",
        tag: [{ value: "Authentication" }],
      },
      {
        title: "Relationship Diagram",
        description:
          "Visual diagram of the tables that currently exist in the database and how they relate.",
        tag: [{ value: "Core Features" }],
      },
      {
        title: "ProxySQL Support",
        description:
          "Add support for using proxySQL to switch which database instance traffic is routed to for database blue/green deployments.",
        tag: [{ value: "Integrations" }],
      },
      {
        title: "LLM Authoring Files Support",
        description:
          "Add support for using LLM Authoring for changes that span multiple changelog files.",
        tag: [{ value: "AI" }],
      },
      {
        title: "OOTB Policy Library",
        description:
          "Out of the box example OPS policies in the product.",
        tag: [{ value: "Core Features" }],
      },
    ],
  },
  "Next": {
    description: "What we'll build next, next ~2 quarters",
    feature: [
      {
        title: "Databricks Support 2.0",
        description:
          "additional change types when using databricks",
        tag: [{ value: "Database Support" }],
      },
      {
        title: "Support: Procedures, triggers, functions",
        description:
          "Add first class change types and diff supports for several additional db object types",
        tag: [{ value: "Core Features" }],
      },
      {
        title: "Drift Detection (Liquibase)",
        description:
          "Native, fully automated, visual drift detection, when deploying using liquibase",
        tag: [{ value: "Core Features" }],
      },
      {
        title: "State-Based Migrations",
        description:
          "Ability to deploy all deltas in a db snapshot to the DB as a changetype",
        tag: [{ value: "Core Features" }],
      },
      {
        title: "DACPACs Support",
        description:
          "a first class changetype for syncing a MSSQL database to the schema state in a microsoft dacpac",
        tag: [{ value: "Database Support" }],
      },
      {
        title: "DynamoDB support",
        description:
          "support applying database changes to Amazon DynamoDB",
        tag: [{ value: "Database Support" }],
      },
    ]
  },
  "Future": {
    description: "typically > 6 months out",
    feature: [
      {
        title: "Auto-gen Rollback Scripts",
        description: 
          "Automatically generate rollback scripts at rollback time for changes that lack them.",
        tag: [{ value: "Core Features" }],
      },
      {
        title: "Rollback without Custom Pipeline",
        description: 
          "Allow automated rollback through UI without authoring a custom pipeline.",
        tag: [{ value: "Core Features" }],
      },
      {
        title: "AI Index Optomization",
        description: 
          "Automatically identify slow queries, and review indexes, and open PRs to optomize.",
        tag: [{ value: "Core Features" },{ value: "AI" }],
      },
      {
        title: "Native Local Dev",
        description: 
          "Seemlessly run DBD SaaS pipelines through a cli locally.",
        tag: [{ value: "Core Features" }],
      },
      {
        title: "Automated DB Testing",
        description: 
          "Natively support frameworks like DBFit and DBUnit.",
        tag: [{ value: "Core Features" }],
      },
      {
        title: "Refactoring Change Types",
        description: 
          "First class change types for high-level complex changes that can be done with 0 downtime",
        tag: [{ value: "Core Features" }],
      },
      {
        title: "Cross-ENV Checksum enforcement",
        description: 
          "Further enforce that changes are always consistent across environments",
        tag: [{ value: "Core Features" }],
      },
      {
        title: "Test Data Generation",
        description: 
          "generated anonymized synthetic test data for use in staging environments",
        tag: [{ value: "Core Features" }],
      },
      {
        title: "Xenv Relationship Diagram Diff",
        description: 
          "Allow an object-level diff view of what tables/objects existign in the database on the relationship diagram",
        tag: [{ value: "Core Features" }],
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
        title: "Drift Detection (Flyway)",
        description:
          "Detect and surface schema differences between a database and its expected state for flyway schema types",
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
