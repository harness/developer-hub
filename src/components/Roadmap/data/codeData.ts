import { Horizon } from "./roadmapData";

export const codeData: Horizon = {
  
  Now: {
    description: "Q2 2025, May-July 2025",
    feature: [

      {
        tag: [{ value: "Code Quality" }],
        title: "Code Coverage",
        description: "Display a coverage overlay in the code view and show a PR status summary for overall and changed code coverage—helping teams track gaps, enforce thresholds, and improve test completeness..",
      },
      {
        tag: [{ value: "AI" }, { value: "Developer Experience" }],
        title: "Automated Code Review",
        description: "AI-powered code review suggestions to improve developer efficiency.",
      },
      {
        tag: [{ value: "Governance" }],
        title: "Enforce Signed-Commits",
        description: "Ensure that all repository commits are signed by a known developer.",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Compare Tags Page",
        description: "Compare two release tags to see the delta in commits, PRs, artifacts, and deployments—helping validate changes and support audit traceability.",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Support for Forked Repositories",
        description: "Harness Code Repository will support repository forking, allowing developers to create isolated copies of repositories for experimentation, collaboration, or contributing back via pull requests — without impacting the main repository."
      },
      {
        tag: [{ value: "Secure" }],
        title: "SSH Support",
        description: "Support for Git operations via SSH.",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "AutoLink References for External Issue Trackers",
        description: "Support for AutoLink references will allow Harness Code to automatically hyperlink commit messages and PR titles to external issue trackers like Jira, improving traceability across tools."
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Atlassian Jira Marketplace Application",
        description: "First-class support for Jira with Atlassian Marketplace application, allowing users to surface relevant commits and PRs in Jira issues.",
      },
      {
        tag: [{ value: "Governance" }],
        title: "Push Rules",
        description: "Introduce push protection rules to enforce compliance and security standards.",
      },
      {
        tag: [{ value: "Governance" }],
        title: "Tag Rules",
        description: "Introduce tag protection rules to enforce compliance and security standards.",
      },
 
    ],
  },
  Next: {
    description: "Q3 2025+, August-October 2025",
    feature: [

      {
        tag: [{ value: "AI" }, { value: "Developer Experience" }],
        title: "Auto-generated PR Summaries and Commit Messages",
        description: "Automatically generate pull request summaries and commit messages to help reviewers quickly understand the scope and intent of changes.",
      },
      {
        tag: [{ value: "AI" }, { value: "Code Quality" }],
        title: "AI-Generated Tests",
        description: "Generate unit tests from repository code using AI, guided by coverage results to target untested areas and help improve overall code coverage.",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Linked Repositories",
        description: "Ability to connect code repositories hosted on external SCM providers and ." //todo
      }, 
      {
        tag: [{ value: "Developer Experience" }, { value: "Reliability" }],
        title: "Merge Queue for Pull Requests",
        description: "Harness Code will support a merge queue to boost development velocity by automatically managing pull request merges into busy branches, ensuring each change is validated and preventing broken or incompatible commits from reaching the target branch."
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Code Templates",
        description: "Create templates of repositories to quickly generate a collection of repositories in a project.",
      },
    ],
  },
  Later: {
    description: "Q4 2025, November 2025 & beyond",
    feature: [

      {
        tag: [{ value: "Developer Experience" }],
        title: "Repo Insights",
        description: "Summary insights including PR and commit metrics and security scanning results.",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Pipeline View",
        description: "Visualize all CI pipeline runs for a repository, branch, or pull request.",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Issue Tracking",
        description: "Plan and track all developer-related work across your projects in Harness Code.",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "User Group Support",
        description: "Use user groups wherever users are supported: mentions, reviews, code owners, etc.",
      },
      {
        tag: [{ value: "Governance" }],
        title: "Enhance Open Policy Agent (OPA) Integration",
        description: "Introduce additional events for OPA enforcement.",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Commit Graph",
        description: "Visualize the Git commit graph within the code repository.",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Chat Integration",
        description: "Integrate Slack and MS Teams with the Pull Request workflow.",
      },
    ],
  },
  Released: {
    description: "What has been released",
    feature: [
      {
        tag: [{ value: "Developer Experience" }],
        title: "Favorite Repositories Across the Account",
        description: "Users will be able to mark repositories as favorites for quicker access and personalized navigation across the account."
      },
      {
        tag: [{ value: "Scalable" }, { value: "Developer Experience" }],
        title: "Git LFS (Large File Storage) Support",
        description: "Harness Code Repository will support Git LFS, enabling efficient versioning and storage of large binary files such as media, datasets, and compiled assets within Git."
      },
      {
        tag: [{ "value": "Secure" }],
        title: "Committer Identity Verification for Code Repositories",
        description: "Harness now supports automatic verification of commit metadata to ensure that the Git committer matches the authenticated user. This helps prevent impersonation and enforces stronger commit authenticity within managed repositories."
      },
      {
        tag: [{ "value": "Collaboration" }],
        title: "Default Reviewers for Pull Requests",
        description: "Users can now configure default reviewers for pull requests in Harness Code Repository. This ensures that designated team members are automatically added to review every PR, improving review consistency and reducing manual setup."
      },
      {
        tag: [{ "value": "Collaboration" }],
        title: "Add CODEOWNERS as Reviewers Automatically",
        description: "Harness now supports automatically adding users defined in a CODEOWNERS file as reviewers on pull requests. This ensures that the right owners are always notified to review changes to critical files and components."
      },
      {
        tag: [{ "value": "Developer Experience" }],
        title: "My PRs Page in Harness Code Repository",
        description: "A new 'My PRs' view is available to help users track pull requests they authored, reviewed, or were mentioned in. This centralized page improves visibility and makes it easier to stay on top of open contributions and pending reviews."
      },
      {
        tag: [{ value: "Platform" }],
        title: "Self-Managed Enterprise (SMP) Support",
        description: "Host Harness DevOps platform on your own infrastructure, including Harness Code.",
      },
      {
        tag: [{ value: "Migrations" }],
        title: "Migrate all Repository Data",
        description: "Migrate pull requests, comments, labels, and other metadata from SCM providers.",
      },     
    ],
  },
};
