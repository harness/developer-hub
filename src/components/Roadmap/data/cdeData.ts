import { Horizon } from "./roadmapData";

/** Copy this for a new item
{
  tag: [{ value: "" }],
  title: "",
  description: "",
},
 */

/*
Tags
Customization 
IDE
Scalability
Usability
*/



export const CdeData: Horizon = {
  /**
   * NOW
   */

  Now: {
    description: "Q1 2025, Feb 2025 - Apr 2025",
    feature: [
      {
        tag: [
          { value: "Usability" }, { value: "Core Feature" }
        ],
        title: "Self Hosted CDE Infrastructure (GCP)",
        description:
          "Enable users to self-host Harness Cloud Development Environments (CDE) in their private infrastructure (currently supporting GCP), while the CDE control plane remains hosted in the Harness Cloud for centralized management. ",
      },
      {
        tag: [
            { value: "Usability" }, { value: "Core Feature" }
          ],
        title: "GitHub Enterprise On-prem Support",
        description:
          "Allow users to integrate their GitHub Enterprise on-prem instances with Harness Gitspaces, enabling seamless access to their self-hosted repositories while ensuring full control over source code security without relying on GitHub Cloud.",
      },
      {
        tag: [
            { value: "Usability" }, { value: "Core Feature" }
          ],
        title: "Bitbucket Server On-prem Support",
        description:
          "Allow users to integrate Bitbucket Server on-prem instances with Harness Gitspaces, enabling seamless access to their self-hosted repositories while ensuring full control over source code security without relying on Bitbucket Cloud.",
      },
      {
        tag: [
            { value: "Usability" }, { value: "Core Feature" }
          ],
        title: "RBAC and Admin Functionality",
        description:
          "Introduce RBAC and Admin functionality to ensure centralized control in Harness cloud development environments.  ",
      },
      {
        tag: [
            { value: "Usability" }, { value: "Core Feature" }
          ],
        title:
          "CDE Templates",
        description:
          "Add support for CDE Templates i.e. predefined configurations that enable users to setup standardized development environments. ",
      },
    ],
  },
  /**
   *
   * NEXT
   *
   */

  Next: {
    description: "Q2 2025, May 2025 - July 2025",
    feature: [
      {
        tag: [
            { value: "Core Feature" }
          ],
        title: "Support Additional Clouds for Self Hosted CDE Infrastructure",
        description:
          "Expand supported cloud providers (AWS) for users to self-host cloud development environments (CDE) in their private infrastructure.",
      },
      {
        tag: [{ value: "Usability" }, { value: "Devcontainer" }],
        title: "Local Devcontainers",
        description:
          "Allow users to spin up containerized development environments on their local machines.",
      },
      {
        tag: [{ value: "Usability" }],
        title: "Policies & Governance Features",
        description:
          "Enable users to block Devcontainer images and(or) features based on security policies. ",
      },
      {
        tag: [
            { value: "Usability" }, { value: "Core Feature" }
          ],
        title:
          "Gitspace Rebuilds",
        description:
          "Allow users to rebuild their development container for an active Gitspace after applying configuration changes, ensuring the environment is updated with the latest settings and dependencies without requiring a fresh setup.",
      },
    ],
  },

  /**
   *
   * LATER
   *
   */

  Later: {
    description: "Q3 2025+, Aug 2025 & beyond",
    feature: [
        {
            tag: [{ value: "Core Feature" }],
            title: "Self Managed Solution",
            description:
              "Introduce Self-Managed Hosting model for Harness Gitspaces, allowing users to self-host and self-manage their Harness cloud development infrastructure while ensuring security, compliance, and flexibility.",
          },
          {
            tag: [{ value: "Core Feature" }],
            title: "Pre-builds in Gitspaces",
            description:
              "Add support for pre-initialized development environments to reduce setup time for users.",
          },
          {
            tag: [{ value: "Integration" }],
            title: "Integration with Harness IDP",
            description:
              "Enable users to seamlessly create, manage, and configure their Gitspaces directly from Harness IDP, streamlining the development workflow within a unified platform.",
          },
          {
            tag: [{ value: "Usability" }],
            title: "Shared Gitspaces",
            description:
              "Introduce shared development environments, allowing users to collaborate in real-time on Gitspaces, ensuring seamless teamwork, consistency, and shared access to resources.",
          },
    ],
  },

  /**
   *
   * RELEASED
   *
   */
  Released: {
    description: "What has been released recently",
    feature: [
      {
        tag: [{ value: "IDE" }],
        title: "JetBrains Gateway Plugin",
        description:
          "Introducing the Harness Gitspaces JetBrains Gateway Plugin—enabling seamless remote development by connecting and managing Gitspaces within JetBrains IDEs.",
      },
      {
        tag: [{ value: "IDE" }],
        title: "JetBrains IDEs",
        description:
          "Enable users to leverage remote development in PyCharm, GoLand, PhpStorm, Rider, RubyMine, WebStorm, and CLion—empowering developers across multiple tech stacks.",
      },
      {
        tag: [{ value: "IDE" }],
        title: "IntelliJ IDEA Support",
        description:
          "Add support for remote development in IntelliJ IDEA.",
      },
      {
        tag: [
            { value: "Usability" },
            { value: "Devcontainer" }
        ],
        title: "Devcontainer Features",
        description:
          "Add support for Devcontainer Features, enabling users to easily add and automate the installation of additional tools, runtimes, and libraries in their Gitspace.",
      },{
        tag: [
            { value: "Customization" },
            { value: "Devcontainer" }
        ],
        title: "Expanded Devcontainer Property Support",
        description:
          "Introduced support for various new Devcontainer properties such as 'mounts', 'privileged', 'overrideFeatureInstallationOrder' providing users with greater flexibility in configuring their development environment.",
      },
      {
        tag: [
            { value: "Usability" },
            { value: "Core Feature" }
        ],
        title: "Private Docker Images",
        description:
          "Add support to pull private Docker images from Docker Registry, JFrog Artifactory and Amazon ECR, enabling greater flexibility and customization options for users.",
      },
      {
        tag: [
            { value: "Usability" },
            { value: "Core Feature" }
        ],
        title: "Secure Connect Integration",
        description:
          "Introduce Secure Connect Integration to allow users to connect Harness with their on-premises, privately-hosted assets such as Docker Registries and Artifact Repositories.",
      },
      {
        tag: [
            { value: "Customization" },
            { value: "Devcontainer" }
        ],
        title: "User Configuration Support",
        description:
          "Enable users with “containerUser” and “remoteUser” settings in 'devcontainer', allowing precise control over container operations..",
      },
      {
        tag: [
            { value: "Customization" },
            { value: "Devcontainer" }
        ],
        title: "runArgs Configuration Support ",
        description:
          "Add support for the 'runArgs' property in 'devcontainer'.",
      },
      {
        tag: [
            { value: "Customization" },
            { value: "Devcontainer" }
        ],
        title: "Pre-installed Extensions",
        description:
          "Enable users to configure Gitspaces to automatically install extensions during setup using the “extensions” property in 'devcontainer'.",
      },
      {
        tag: [{ value: "Usability" }, { value: "Core Feature" }],
        title: "Auto-Stopping",
        description:
          "Add support to automatically stop inactive Gitspaces after 60 minutes of inactivity to conserve cloud resources and reduce costs.",
      },
        {
            tag: [
                { value: "Customization" },
                { value: "Devcontainer" }
            ],
        title: "Port Forwarding",
        description: "Enable users to access services running inside Gitspaces as if they were running locally using Port Forwarding.",
      },
      {
        tag: [
            { value: "Customization" },
            { value: "Devcontainer" }
        ],
    title: "Environment Variables Configuration",
    description: "Allow users to define and manage environment variables within containers for better application management and customization.",
  },
      {
        tag: [{ value: "Automation" } ],
        title: "Auto-Repair for Gitspaces",
        description:
          "Set up automated background jobs to repair Gitspaces in the error state, reducing manual intervention..",
      },
      {
        tag: [
            { value: "Customization" }
        ],
        title: "Tracking Gitspace Changes",
        description:
          "Enable users to track and monitor any changes in their Gitspaces directly from the Harness UI.",
      },
    ],
  },
};
