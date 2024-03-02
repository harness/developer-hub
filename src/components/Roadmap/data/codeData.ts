import { Horizon } from "./roadmapData";

export const codeData: Horizon = {
  
  Now: {
    description: "Q1 2024, Feb-Apr 2024",
    feature: [
      {
        tag: [{ value: "Integrations" }],
        title: "GitOps",
        description: "Integrate GitOps services and PR pipelines to use Code Repository as the source for kubernetes manifest and configuration files.",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Terraform Provider",
        description: "Utilize Terrafrom to create, update, or delete repositories, web hooks, branch rules.",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Software Engineering Insights (SEI)",
        description: "Include data and insights from Code Repository in SDLC analysis.",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "API Compatibility Proxy",
        description: "Utilize 3rd party GitLab connectors when native connectors are absent.",
      },
      {
        tag: [{ value: "Security" }],
        title: "Repository Soft Delete",
        description: "Prevent data loss from accidental deletion of code repositories.",
      },
      {
        tag: [{ value: "Search" }],
        title: "Regular Expression Search",
        description: "Extend keyword search to find regex patterns in code repositories.",
      },
    ],
  },
  Next: {
    description: "Q2 2024, May-Jul 2024",
    feature: [
      {
        tag: [{ value: "Security" }],
        title: "Secret Detection",
        description: "Find secrets, passwords, and confidential data before it is committed the repository.",
      },
      {
        tag: [{ value: "Security" }],
        title: "Vulnerability Detection",
        description: "Find common vulnerabilites in code before it is committed to the repository.",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Multiline Comments",
        description: "Comment on a section of code changes in a pull request.",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Code Suggestions",
        description: "Suggest and accept code changes directly within comments in pull requests.",
      },
    ],
  },
  Later: {
    description: "Q3 2024+, Aug 2024 & beyond",
    feature: [
      {
        tag: [{ value: "Integrations" }],
        title: "Security Testing Orchestration (STO)",
        description: "Automatically remediate vulnerabilities in code repositories.",
      },
      {
        tag: [{ value: "Security" }],
        title: "Audit Trail",
        description: "Code Repository events added to Harness Platform consolidated Audit Trails.",
      },
    ],
  },
  Released: {
    description: "What has been released",
    feature: [
      {
        tag: [{ value: "AI" }],
        title: "Semantic Search",
        description: "Search your entire codebase using natural language queries using semantics rather than specific keywords.",
      },
      {
        tag: [{ value: "AI" }],
        title: "Pull Request Summaries",
        description: "Use Harness AIDA to automatically summarize the code changes in a pull request.",
      },
      {
        tag: [{ value: "Security  " }],
        title: "Branch Protection",
        description: "Establish criteria for approving and merging PRs, define who can create and delete branches, and more.",
      },
      {
        tag: [{ value: "Security" }],
        title: "Code Owners",
        description: "Assign code ownership to users within your Harness account.",
      },
      {
        tag: [{ value: "Search" }],
        title: "Keyword Search",
        description: "Quickly find code in repositories based on keywords and directory paths.",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Git Experience for CI/CD",
        description: "Store all metadata and configuration for CI and CD within Harness Code Repository.",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Notifications",
        description: "Get email notifications for PRs and repositories you're affiliated with.",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Performance Improvements for large PRs",
        description: "Work on PRs of any size without losing performance",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "PR Templates",
        description: "Pull request templates encourage contributors to provide required and optional information in pull request descriptions.",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Status Checks",
        description: "Report the pipeline run status and other execution details on the PR.",
      },
    ],
  },
};