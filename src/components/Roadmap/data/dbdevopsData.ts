import { Horizon } from "./roadmapData";
export const DbdevopsData: Horizon = {
  "Recently Delivered": {
    description: "What has been released in the last ~2 Quarters",
    feature: [
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
          "Add native support for using Flyway instead of liquibase",
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
        title: "Log Size (Phase 2)",
        description:
          "Change how we transport preview SQL from the build pod back to harness to remove the SQL size limit",
        tag: [{ value: "Orchestration" }, {value: "Q3"}],
      },
      {
        title: "Licensing",
        description:
          "Implement a subscription UI for Harness Database DevOps",
        tag: [{ value: "Visibility" }, {value: "Q3"}],
      },
      {
        title: "Support Nesting Step Groups",
        description:
          "Allow DB DevOps steps to be used in step groups within other step groups",
        tag: [{ value: "Orchestration" }, {value: "Q3"}],
      },
      {
        title: "Variable Branch Override",
        description:
          "Allow a DB Instance to read the branch it deploys to from a pipeline variable. This is useful for deploying feature branches.",
        tag: [{ value: "Orchestration" }, {value: "Q2"}],
      },
      {
        title: "Log Size (Phase 1)",
        description:
          "Add compression to preview step logs to increase maximum supported SQL size beyond 64kb by approximately 5x.",
        tag: [{ value: "Orchestration" }, {value: "Q2"}],
      },
      {
        title: "Change Audits",
        description:
          "Visibility into database changes and the history of applying them across numerous Database DevOps screens",
        tag: [{ value: "Visibility" }, {value: "Q2"}],
        link:"https://developer.harness.io/docs/database-devops/concepts-and-features/unified-environment-overview/#viewing-changesets-in-the-harness-database-devops-ui"
      },
      {
        title: "ChangeID Output",
        description:
          "Add an output on the apply step that outputs the list of change IDs that were applied.",
        tag: [{ value: "Orchestration" }, {value: "Q2"}],
        link:"https://developer.harness.io/docs/database-devops/concepts-and-features/access-applied-changesets"
      },
      {
        title: "CockroachDB Support",
        description:
          "support using DBDevOps against CockroachDB.",
        tag: [{ value: "Integrations" }, {value: "Q2"}],
        link:"https://developer.harness.io/docs/database-devops/use-database-devops/set-up-connectors"
      }
    ],
  },
  "Now": {
    description: "Currently under active development, ~ current quarter",
    feature: [  
      {
        title: "Kerberos Auth",
        description:
          "Support Kerberos Auth for Oracle and MSSQL",
        tag: [{ value: "Integrations" }],
      },
      {
        title: "MongoDB Native Executor",
        description:
          "Allow directly running mongo .sh scripts from within a changeset",
        tag: [{ value: "Integrations" }],
      },  
      {
        title: "Support Snowflake",
        description:
          "Allow using Database DevOps against Snowflake",
        tag: [{ value: "Integrations" }],
      },     
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
        tag: [{ value: "Integrations" }],
      },    
      {
        title: "DynamoDB Support",
        description:
          "Support applying database changes to DynamoDB",
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
        title: "Relationship Diagram",
        description:
          "visualize the state of database tables within a db instance",
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
          "a Pipeline step to analyze and surface possible unintended consequences of a cahgne before deploying it.",
        tag: [{ value: "Core Features" }],
      },
      {
        title: "Variablized JDBC URL",
        description:
          "Allow referencing properties from a database instance inside the JDBC URL of a database connector.",
        tag: [{ value: "Orchestration" }],
      },
    ]
  },
  "Future": {
    description: "typically > 6 months out",
    feature: [
      {
        tag: [{ value: "Core Features" }],
        title: "Query Console",
        description:
          "Allow developers to run ad-hoc read queries against DBs, with an ability to anonymize results",
      },
      {
        title: "Support for DB2",
        description: "Add DB2 as a supported database.",
        tag: [{ value: "Integrations" }],
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
        title: "DB Provisioning",
        description:
          "integrate to Harness IACM to simplify DB provisioning and handling of ephemeral database environments.",
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
        title: "Changelog Generation",
        description: "Automatically generate a baseline changelog from an existing database config without authoring a custom pipeline",
      }
    ],
  }, 
};
