import { Horizon } from "./roadmapData";

export const codeData: Horizon = {
  
  Now: {
    description: "Q2 2024, Apr-Jun 2024",
    feature: [
      {
        tag: [{ value: "Integrations" }],
        title: "Security Testing Orchestration (STO)",
        description: "Automatically remediate vulnerabilities in code repositories.",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Internal Developer Portal (IDP)",
        description: "Increase developer productivity and decrease toil with a self-service developer portal",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Continuous Delivery",
        description: "Store all configuration manifests and deployment metadata in cosolidated DevOps Platform",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Comment Code Suggestions",
        description: "Suggest and accept code changes directly within comments in pull requests.",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Labels",
        description: "Apply labels to categorize repositories and pull requests.",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Repository Summary Data",
        description: "Quickly view the number of commits, pull requests, and tags for a repository",
      },
      {
        tag: [{ value: "Governance" }],
        title: "View-Only Permission",
        description: "Additional permission to allow users to view repositories but not add comments or other content",
      },
      {
        tag: [{ value: "Governance" }],
        title: "Open Policy Agent (OPA) Integration",
        description: "Store and enforce policies for repositories, commits, and pull requests.",
      },
      {
        tag: [{ value: "Platform" }],
        title: "Self-Managed Enterprise (SMP) Support",
        description: "Host Harness DevOps platform on your own infrastructure including Harness Code",
      },
      {
        tag: [{ value: "Platform" }],
        title: "Data Residency",
        description: "Support for Harness Code hosted in EU Data Center",
      },
      {
        tag: [{ value: "Search" }],
        title: "Regular Expression Search",
        description: "Extend keyword search to find regex patterns in code repositories.",
      },
      {
        tag: [{ value: "Search" }],
        title: "Account and Organization Search",
        description: "Extend keyword search to find code across all repositories in a Project, Org, or Account",
      },
      {
        tag: [{ value: "Migrations" }],
        title: "Import all Repository Data",
        description: "Import pull requests, comments, labels and other metadta from SCM providers",
      },
      {
        tag: [{ value: "AIDA" }],
        title: "Automated Code Suggestions",
        description: "",
      },
      {
        tag: [{ value: "AIDA" }],
        title: "Root cause (RCA) Summary in Checks",
        description: "Summarize status check logs directly in pull requests",
      },
    ],
  },
  Next: {
    description: "Q3 2024, Jul-Sep 2024",
    feature: [
      {
        tag: [{ value: "Developer Experience" }],
        title: "Issue Tracking",
        description: "Plan and track all developer related work across your projects in Harness Code",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Commit Graph",
        description: "Visualize git commit graph within code repository",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Pipeline view",
        description: "Visualize all CI pipline runs for a reposiory, branch or pull request",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Chat Integration",
        description: "Integrate Slack and MS Teams with Pull Request workflow",
      },
    ],
  },
  Later: {
    description: "Q4 2024+, Sep 2024 & beyond",
    feature: [
      {
        tag: [{ value: "Developer Experience" }],
        title: "Archive Repo",
        description: "Mark a repo as archive to disable all future development",
      },
    ],
  },
  Released: {
    description: "What has been released",
    feature: [
      {
        tag: [{ value: "Integrations" }],
        title: "GitOps",
        description: "Integrate GitOps services and PR pipelines to use Code Repository as the source for kubernetes manifest and configuration files.",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Multiline Comments",
        description: "Comment on a section of code changes in a pull request.",
      },
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
        tag: [{ value: "Integrations" }],
        title: "Terraform Provider",
        description: "Utilize Terrafrom to create, update, or delete repositories, web hooks, branch rules.",
      },
      {
        tag: [{ value: "Governance" }],
        title: "Audit Trail",
        description: "Code Repository events added to Harness Platform consolidated Audit Trails.",
      },
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
