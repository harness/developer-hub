import { Horizon } from "./roadmapData";

export const codeData: Horizon = {
  
  Now: {
    description: "Q4 2024, Nov-Jan 2025",
    feature: [
      {
        tag: [{ value: "Developer Experience" }],
        title: "Mentions",
        description: "Mention users and groups in PR comments",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "User Group Support",
        description: "Use user groups wherever users are supported: mentions, reviews, code owners. ",
      },
      {
        tag: [{ value: "Security" }],
        title: "SSH Support",
        description: "Git operations available via SSH",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Jira Support",
        description: "First-class support for Jira available in Atlassian Marketplace",
      },
      {
        tag: [{ value: "Platform" }],
        title: "Self-Managed Enterprise (SMP) Support",
        description: "Host Harness DevOps platform on your own infrastructure including Harness Code",
      },
      {
        tag: [{ value: "Governance" }],
        title: "Open Policy Agent (OPA) Integration",
        description: "Adding additional events for OPA enforcement",
      },
      {
        tag: [{ value: "Governance" }],
        title: "Enforce Signed-Commits",
        description: "Ensure that all repository commits are signed by a known developer",
      },
      {
        tag: [{ value: "Governance" }],
        title: "Default Repository Settings",
        description: "Centrally manage repository settings for all repositories in a project, org, or account",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Projet, Org, and Account Pull Requests",
        description: "View, search and filter all pull requests in a project, org, or account.",
      },
    ],
  },
  Next: {
    description: "Q1 2025, Feb-Apr 2025",
    feature: [
      {
        tag: [{ value: "Developer Experience" }],
        title: "Archive Repo",
        description: "Mark a repo as archive to disable all future development",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Issue Tracking",
        description: "Plan and track all developer related work across your projects in Harness Code",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Pipeline view",
        description: "Visualize all CI pipline runs for a reposiory, branch or pull request",
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
    description: "Q2 2025, May 2025 & beyond",
    feature: [
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
        tag: [{ value: "Integrations" }],
        title: "Security Testing Orchestration (STO)",
        description: "Automatically remediate vulnerabilities in code repositories.",
      },
     
    ],
  },
};
