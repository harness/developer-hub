import { Horizon } from "./roadmapData";

export const AtaData: Horizon = {
  "Now": {
    description: "Currently under active development, ~ current quarter",
    feature: [
  {
    title: "Various UX Improvements",
    description: "Delivers multiple UI/UX refinements to improve navigation, readability, and overall user satisfaction.",
    tag: [{ value: "UX" }]
  },
  {
    "title": "AI Test Case Generation (MVP)",
    "description": "Generates complete test cases from simple prompts or user flows using AI capabilities.",
    "tag": [{ "value": "Authoring" }]
  },
  {
    "title": "Harness Platform - Tunnels / Delegate Integration",
    "description": "Connects test execution to private environments securely through Harness Tunnels and Delegates.",
    "tag": [{ "value": "Integration" }]
  },
  {
    "title": "Task Enhancements",
    "description": "Introduces support for nested, modular tasks to simplify complex test flows and adds version control to manage changes with reliability and traceability.",
    "tag": [{ "value": "Authoring" }]
  }
    ],
  },
  "Next": {
    description: "What we'll build next, next ~2 quarters",
    feature: [
 {
    "title": "Harness Platform - Audit Trails Integration",
    "description": "Integrates test activity logs into Harness audit trails for better traceability and compliance.",
    "tag": [{ "value": "Integration" }]
  },
  {
    "title": "Data Driven Testing - Reading from CSV and XLS",
    "description": "Enables dynamic test execution by ingesting test data directly from CSV and Excel files.",
    "tag": [{ "value": "Authoring" }]
  },
{
  "title": "JIRA Integration",
  "description": "Enables seamless integration with JIRA for defect tracking, including 1-click issue creation directly from failed test runs for streamlined bug reporting.",
  "tag": [{ "value": "Integration" }]
},
  {
    "title": "AI Test Case Generation",
    "description": "Automatically generates end-to-end test cases using AI from user flows or high-level descriptions.",
    "tag": [{ "value": "Authoring" }]
  }
    ]
  },
  "Future": {
    description: "typically > 6 months out",
    feature: [
  {
    "title": "Branching Support",
    "description": "Enables users to create and manage test branches for isolated development and parallel test evolution.",
    "tag": [{ "value": "Collaboration" }]
  },
  {
    "title": "Cross Browser Testing",
    "description": "Supports execution of tests across multiple browsers to ensure consistent application behavior.",
    "tag": [{ "value": "Execution" }]
  },
  {
    "title": "Headless API Testing Support",
    "description": "Enables automated, UI-independent validation of backend APIs using headless test execution.",
    "tag": [{ "value": "Execution" }]
  },
  {
    "title": "Native Mobile App Testing",
    "description": "Provides support for automated testing of native mobile applications on real or virtual devices.",
    "tag": [{ "value": "Execution" }]
  }
    ],
  },
  "Recently Delivered": {
    description: "What has been released in the last ~2 Quarters",
    feature: [
{
  title: "Harness Platform Integration",
  description: "Delivers seamless UI integration with the Harness platform, including authentication support and a unified user experience for managing and accessing test automation features.",
  tag: [{ value: "Integration" }]
 },
 {
    title: "Harness Pipeline Studio Integration",
    description: "Add test suite execution as a native step in Harness pipelines for tight feedback loops and continuous quality.",
    tag: [{ value: "Integration" }]
  },
  {
    title: "Export and Import of Tests",
    description: "Allows exporting and importing of tests across projects and accounts for better collaboration and portability.",
    tag: [{ value: "Collaboration" }]
  },
  {
    title: "Improve Usability of Authoring AI Steps (AI Command)",
    description: "Enhances the AI Command interface to make AI-generated test steps more intuitive and efficient to use.",
    tag: [{ value: "Authoring" }]
  },
  {
    title: "Enhanced Test Suite Run Scalability",
    description: "Improves infrastructure support to run large test suites efficiently across distributed systems.",
    tag: [{ value: "Execution" }]
  },
  {
    title: "Enhanced Reporting - Overview Dashboard",
    description: "Introduces a centralized dashboard for summarizing key test execution metrics and trends at a glance.",
    tag: [{ value: "Reporting" }]
  },
  {
    title: "In-line Parameterizations",
    description: "Supports direct insertion and management of parameterized data within test steps for better flexibility.",
    tag: [{ value: "Authoring" }]
  },
  {
    title: "Enhanced Tests Retry",
    description: "Adds smarter and more configurable retry mechanisms to reduce noise and improve test reliability.",
    tag: [{ value: "Execution" }
    ],
  }
    ]
  }, 
};
