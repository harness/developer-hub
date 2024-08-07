import { Horizon } from "./roadmapData";

export const codeData: Horizon = {
  
  Now: {
    description: "Q3 2024, Aug-Oct 2024",
    feature: [
      {
        tag: [{ value: "Migrations" }],
        title: "Import all Repository Data",
        description: "Import pull requests, comments, labels and other metadta from SCM providers",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Fast-Forward Merges",
        description: "Fast-forward your target branch without a new merge commit.",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Labels",
        description: "Apply labels to categorize repositories and pull requests.",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Jira Support",
        description: "First-class support for Jira.",
      },
      {
        tag: [{ value: "Governance" }],
        title: "New Branch Protection Rules",
        description: "Apply new rules to protect branches inlucding: block push, block force pushes, and more.",
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
        tag: [{ value: "Search" }],
        title: "Regular Expression Search",
        description: "Extend keyword search to find regex patterns in code repositories.",
      },
      {
        tag: [{ value: "Search" }],
        title: "Recursive Code Search",
        description: "Extend keyword search to find code across all repositories in all Projects and Orgs within your Account.",
      },
    ],
  },
  Next: {
    description: "Q4 2024, Nov-Dec 2024, Jan 2025",
    feature: [
      {
        tag: [{ value: "Developer Experience" }],
        title: "Issue Tracking",
        description: "Plan and track all developer related work across your projects in Harness Code",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Projet, Org, and Account Pull Requests",
        description: "View, search and filter all pull requests in a project, org, or account.",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Pipeline view",
        description: "Visualize all CI pipline runs for a reposiory, branch or pull request",
      },
      {
        tag: [{ value: "Governance" }],
        title: "Default Repository Settings",
        description: "Centrally manage repository settings for all repositories in a project, org, or account",
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
  Later: {
    description: "Q1 2025, Jan 2025 & beyond",
    feature: [
      {
        tag: [{ value: "Developer Experience" }],
        title: "Archive Repo",
        description: "Mark a repo as archive to disable all future development",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Commit Graph",
        description: "Visualize git commit graph within code repository",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Chat Integration",
        description: "Integrate Slack and MS Teams with Pull Request workflow",
      },
    ],
  },
  Released: {
    description: "What has been released",
    feature: [
      {
        tag: [{ value: "Developer Experience" }],
        title: "Repository Summary Data",
        description: "Quickly view the number of commits, pull requests, and tags for a repository",
      },
      {
        tag: [{ value: "Platform" }],
        title: "Data Residency",
        description: "Support for Harness Code hosted in EU Data Center",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Comment Code Suggestions",
        description: "Suggest and accept code changes directly within comments in pull requests.",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Multiline Comments",
        description: "Comment on a section of code changes in a pull request.",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Internal Developer Portal (IDP)",
        description: "Increase developer productivity and decrease toil with a self-service developer portal",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Security Testing Orchestration (STO)",
        description: "Automatically remediate vulnerabilities in code repositories.",
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
        tag: [{ value: "Security" }],
        title: "Code Owners",
        description: "Assign code ownership to users within your Harness account.",
      },
      {
        tag: [{ value: "Search" }],
        title: "Keyword Search",
        description: "Quickly find code in repositories based on keywords and directory paths.",
      },
    ],
  },
};
