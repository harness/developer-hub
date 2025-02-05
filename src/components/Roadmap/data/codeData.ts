import { Horizon } from "./roadmapData";

export const codeData: Horizon = {
  
  Now: {
    description: "Q1 2025, Feb-Apr 2025",
    feature: [
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
        tag: [{ value: "Governance" }],
        title: "Default Branch Rules",
        description: "Centrally manage all branch rules for all repositories in a project, org, or account",
      },
      {
        tag: [{ value: "Governance" }],
        title: "Enforce Signed-Commits",
        description: "Ensure that all repository commits are signed by a known developer",
      },
      {
        tag: [{ value: "Governance" }],
        title: "Push Rules",
        description: "More push rules for branches to enforce compliance and security standards",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Project, Org, and Account Pull Requests",
        description: "View, search, and filter all pull requests in a project, org, or account",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Automatically Add Code Owners to Reviews",
        description: "Enable automatically adding Code Owners to reviews",
      },

    ],
  },
  Next: {
    description: "Q2 2025, May-Jul 2025",
    feature: [
      {
        tag: [{ value: "Developer Experience" }],
        title: "Issue Tracking",
        description: "Plan and track all developer-related work across your projects in Harness Code",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Repo Insights",
        description: "Summary insights for the repo based on downstream activity",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Cross-Project Cloning",
        description: "Enable pipelines to clone repos across various repositories in different projects",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Code Templates",
        description: "Create templates of repositories to quickly generate a collection of repositories in a project",
      },
    ],
  },
  Later: {
    description: "Q3 2025, Aug 2025 & beyond",
    feature: [
      {
        tag: [{ value: "Harness AI" }],
        title: "Automated Code Suggestions",
        description: "",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Pipeline view",
        description: "Visualize all CI pipeline runs for a repository, branch, or pull request",
      },
      {
        tag: [{ value: "Governance" }],
        title: "Open Policy Agent (OPA) Integration",
        description: "Adding additional events for OPA enforcement",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Commit Graph",
        description: "Visualize git commit-graph within code repository",
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
        title: "Archive Repo",
        description: "Mark a repo as archived to disable all future development",
      },
      {
        tag: [{ value: "Platform" }],
        title: "Self-Managed Enterprise (SMP) Support",
        description: "Host Harness DevOps platform on your own infrastructure, including Harness Code",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Mentions",
        description: "Mention users and groups in PR comments",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "User Group Support",
        description: "Use user groups wherever users are supported: mentions, reviews, code owners, etc.",
      },
      {
        tag: [{ value: "Migrations" }],
        title: "Import all Repository Data",
        description: "Import pull requests, comments, labels, and other metadata from SCM providers",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Fast-Forward Merges",
        description: "Fast-forward target branch without a new merge commit",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Labels",
        description: "Apply labels to categorize repositories and pull requests",
      },
      {
        tag: [{ value: "Governance" }],
        title: "New Branch Protection Rules",
        description: "Apply new rules to protect branches including block push, block force pushes, and more",
      },
      {
        tag: [{ value: "Governance" }],
        title: "Open Policy Agent (OPA) Integration",
        description: "Store and enforce policies for repositories, commits, and pull requests",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Security Testing Orchestration (STO)",
        description: "Automatically remediate vulnerabilities in code repositories",
      },
     
    ],
  },
};
