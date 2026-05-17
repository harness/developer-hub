import { Horizon } from "./roadmapData";
import { DEFAULT_MODULE_THEME } from "./roadmapPalette";

export const ataModuleTheme = { ...DEFAULT_MODULE_THEME, moduleKey: "ata", moduleTitle: "AI Test Automation" };

export const AtaData: Horizon = {
  "Now": {
    description: "Q2 2026",
    feature: [
      {
        tag: [{ value: "Integration" }],
        title: "Harness Platform - Tunnels / Delegate Integration",
        description: "Connects test execution to private environments securely through Harness Tunnels and Delegates.",
      },
      {
        tag: [{ value: "Integration" }],
        title: "Harness UI Integration",
        description: "Migrates the entire codebase to Harness UI standards for a unified, consistent experience across the platform.",
      },
      {
        tag: [{ value: "Authoring" }],
        title: "Natural Language Based Test Creation",
        description: "Ability to create end to end tests from Natural language prompts.",
      },
      {
        tag: [{ value: "Execution" }],
        title: "Playwright Executor for AIT tests",
        description: "Replaces Taiko with Playwright as the default test executor for AIT tests, providing improved performance, reliability, and broader browser support.",
      },
      {
        tag: [{ value: "Execution" }],
        title: "Playwright Execution Service",
        description: "Allows customers to bring their own Playwright scripts and execute them within the platform, enabling reuse of existing test assets.",
      },
      {
        tag: [{ value: "Execution" }],
        title: "API Testing",
        description: "Enables automated, UI-independent validation of backend APIs using headless test execution.",
      },
    ],
  },
  "Next": {
    description: "Q3 2026",
    feature: [
      {
        tag: [{ value: "Authoring" }],
        title: "AI Test Case Generation",
        description: "Automatically generates end-to-end test cases using AI from user flows or high-level descriptions.",
      },
      {
        tag: [{ value: "Authoring" }],
        title: "Data Driven Testing - Reading from CSV and XLS",
        description: "Enables dynamic test execution by ingesting test data directly from CSV and Excel files.",
      },
      {
        tag: [{ value: "Authoring" }],
        title: "Test Generation from the command line",
        description: "Build a plug-in that lets users create tests directly from their command line or IDE, bringing test authoring into the developer's existing workflow.",
      },
      {
        tag: [{ value: "Execution" }],
        title: "Native Mobile App Testing",
        description: "Provides support for automated testing of native mobile applications on real or virtual devices.",
      },
    ],
  },
  "Later": {
    description: "Q4 2026",
    feature: [
      {
        tag: [{ value: "Integration" }],
        title: "Harness Platform - Audit Trails Integration",
        description: "Integrates test activity logs into Harness audit trails for better traceability and compliance.",
      },
      {
        tag: [{ value: "Collaboration" }],
        title: "Branching Support",
        description: "Enables users to create and manage test branches for isolated development and parallel test evolution.",
      },
      {
        tag: [{ value: "Execution" }],
        title: "Cross Browser Testing",
        description: "Supports execution of tests across multiple browsers to ensure consistent application behavior.",
      },
      {
        tag: [{ value: "Execution" }],
        title: "Autonomous Testing",
        description: "Point Harness to an application and it autonomously generates, authors, executes, and reports on tests end-to-end — no human intervention required.",
      },
    ],
  },
  "Released": {
    description: "Q1 2026",
    feature: [
      {
        tag: [{ value: "Integration" }],
        title: "Harness Platform Integration",
        description: "Delivers seamless UI integration with the Harness platform, including authentication support and a unified user experience for managing and accessing test automation features.",
      },
      {
        tag: [{ value: "Integration" }],
        title: "Harness Pipeline Studio Integration",
        description: "Add test suite execution as a native step in Harness pipelines for tight feedback loops and continuous quality.",
      },
      {
        tag: [{ value: "Authoring" }],
        title: "Improve Usability of Authoring AI Steps (AI Command)",
        description: "Enhances the AI Command interface to make AI-generated test steps more intuitive and efficient to use.",
      },
      {
        tag: [{ value: "Collaboration" }],
        title: "Export and Import of Tests",
        description: "Allows exporting and importing of tests across projects and accounts for better collaboration and portability.",
      },
      {
        tag: [{ value: "Authoring" }],
        title: "In-line Parameterizations",
        description: "Supports direct insertion and management of parameterized data within test steps for better flexibility.",
      },
      {
        tag: [{ value: "Execution" }],
        title: "Enhanced Test Suite Run Scalability",
        description: "Improves infrastructure support to run large test suites efficiently across distributed systems.",
      },
      {
        tag: [{ value: "Execution" }],
        title: "Enhanced Tests Retry",
        description: "Adds smarter and more configurable retry mechanisms to reduce noise and improve test reliability.",
      },
      {
        tag: [{ value: "Reporting" }],
        title: "Enhanced Reporting - Overview Dashboard",
        description: "Introduces a centralized dashboard for summarizing key test execution metrics and trends at a glance.",
      },
    ],
  },
};
