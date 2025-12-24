import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
const sidebars: SidebarsConfig = {
  releaseNotes: [
    // Release Notes Parent
        {
      type: 'category',
      label: 'Release Notes',
      link: {
        type: 'doc',
        id: 'index',
      },
      collapsed: true,
      items: [
    "platform",
    "delegate",
    "harness-solutions-factory",
    "self-managed-enterprise-edition",      
    {
          type: "html",
          value: "AI for DevOps & Automation",
          className: "horizontal-bar",
    },  
    "continuous-delivery",
    "continuous-integration",
    "internal-developer-portal",
    "infrastructure-as-code-management",
    "database-devops",
    "artifact-registry",
    {
          type: "html",
          value: "AI for Testing & Resilience",
          className: "horizontal-bar",
    },  
    "feature-management-experimentation",
    "feature-flags",
    "chaos-engineering",
    "ai-test-automation",
     {
          type: "html",
          value: "AI for Security & Compliance",
          className: "horizontal-bar",
    }, 
    "security-testing-orchestration",
    "software-supply-chain-assurance",
     {
          type: "html",
          value: "AI for Cost & Optimization",
          className: "horizontal-bar",
    }, 
    "cloud-cost-management",
    "software-engineering-insights"
  ],
  },
  ],
};

export default sidebars;
