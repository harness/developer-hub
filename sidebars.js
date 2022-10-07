// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */

const sidebars = {
  docs: [
  // Getting Started
    {
      type: 'category',
      link: {
        type: 'generated-index',
      },
      collapsed: true,
      items: [
        {
          type: 'doc',
          id: 'intro',
          label: 'Introduction',
        },
        {
          type: 'doc',
          id: 'continuous-delivery/kubernetes-cd-first-tutorial',
          label: 'Kubernetes Deployment Tutorial',
        },
      ],
    },

  // Build Code
  {
    type: 'category',
    label: 'Build Code',
    link: {
      type: 'generated-index',
    },
    collapsed: true,
    items: [
      {
        type: 'doc',
        id: 'continuous-integration/ci-node-docker-quickstart',
        label: 'Automatically Build a NodeJS and Docker App',
      },
    ],
  },

  // Deploy Services
  {
    type: 'category',
    label: 'Deploy Services',
    link: {
      type: 'generated-index',
    },
    collapsed: true,
    items: [
      {
        type: 'doc',
        id: 'continuous-delivery/kubernetes-cd-first-tutorial',
        label: 'Kuberenetes CD Tutorial',
      },   
      {
        type: 'doc',
        id: 'continuous-delivery/first-gitops-example',
        label: 'First GitOps Deployment',
      }, 
      {
        type: 'doc',
        id: 'continuous-delivery/helm-cd-first-tutorial',
        label: 'First Helm Deployment',
      }, 
    ],
  },

  // Manage Feature Flags
  {
    type: 'category',
    label: 'Manage Feature Flags',
    link: {
      type: 'generated-index',
    },
    collapsed: true,
    items: [
      {
        type: 'doc',
        id: 'feature-flags/typescript-react-first-feature-flag',
        label: 'TypeScript and React Feature Flags Tutorial',
      },
    ],
  },

  // Optimize Cloud Costs
  {
    type: 'category',
    label: 'Optimize Cloud Costs',
    link: {
      type: 'generated-index',
    },
    collapsed: true,
    items: [
      {
        type: 'doc',
        id: 'cloud-cost-management/ccm-first-kubernetes-tutorial',
        label: 'Optimize Kubernetes Costs Starter',
      },
    ],
  },

  // Manage SLOs
  {
    type: 'category',
    label: 'Manage SLOs',
    link: {
      type: 'generated-index',
    },
    collapsed: true,
    items: [
      {
        type: 'doc',
        id: 'service-reliability-management/intro-to-srm',
        label: 'Introduction to SLO Management with Prometheus',
      },
    ],
  },
  
  // Orchestrate Security Tests
  {
    type: 'category',
    label: 'Orchestrate Security Tests',
    link: {
      type: 'generated-index',
    },
    collapsed: true,
    items: [
      {
        type: 'doc',
        id: 'security-testing-orchestration/nodejs-firstscan',
        label: 'NodeJS Scan Tutorial',
      },
    ],
  },

  // Run Chaos Experiments
  {
    type: 'category',
    label: 'Run Chaos Experiments',
    link: {
      type: 'generated-index',
    },
    collapsed: true,
    items: [
      {
        type: 'doc',
        id: 'chaos-engineering/first-chaos-engineering',
        label: 'First Chaos Experiment',
      },
    ],
  },

   // Platform
   {
    type: 'category',
    label: 'Platform',
    link: {
      type: 'generated-index',
    },
    collapsed: true,
    items: [
      {
        type: 'doc',
        id: 'common-platform/kubernetes-delegate-install-standalone',
        label: 'Install Harness Kubernetes Delegate',
      },
    ],
  },


    //Additional Items Can Go Below

  ],
};

module.exports = sidebars;