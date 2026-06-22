import React, { useState, useMemo, useCallback } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from './styles.module.scss';

type Tier = 'enterprise' | 'essentials';

interface MetricDef {
  name: string;
  rate: number | null;
  unit: string;
  definition: string;
  rateLabel?: string;
}

interface ModuleDef {
  id: string;
  name: string;
  category: string;
  enterprise: MetricDef[];
  essentials: MetricDef[];
  questions?: string[];
  tip?: string;
}

const MODULES: ModuleDef[] = [
  {
    id: 'cd',
    name: 'Continuous Delivery',
    category: 'DevOps',
    questions: [
      'How many distinct apps, microservices, or components do you deploy?',
      'How often do you deploy (daily, weekly)? How many environments does each service hit (dev/staging/prod)?',
    ],
    tip: 'Rule of thumb: 3 developers = 1 service if you cannot determine a direct number.',
    enterprise: [
      { name: 'Service', rate: 180, unit: 'service / month', definition: 'A deployable software unit (microservice, app, or component) managed and tracked in CD pipelines.' },
      { name: 'Custom Stage Executions', rate: 1, unit: 'execution', definition: 'Each execution of a custom stage in a pipeline (approval, manual intervention, or custom script).' },
    ],
    essentials: [
      { name: 'Deployment Event', rate: 1, unit: 'deployment', definition: 'Each time a service is deployed or updated across any environment.' },
      { name: 'Custom Stage Executions', rate: 1, unit: 'execution', definition: 'Each execution of a custom stage in a pipeline (approval, manual intervention, or custom script).' },
    ],
  },
  {
    id: 'ci',
    name: 'Continuous Integration',
    category: 'DevOps',
    questions: [
      'How many code repositories exist across all your version control systems (GitHub, GitLab, Bitbucket)?',
      'What percentage of those repositories actively run CI builds today? Any monorepos?',
    ],
    tip: 'Formula: Total Repos x CI coverage % = Repos Built per month.',
    enterprise: [
      { name: 'Repository', rate: 60, unit: 'repo', definition: 'Unique repositories that run CI builds, measured by peak daily active repos in the month.' },
      { name: 'Hosted Build Minute', rate: 0.05, unit: 'minute', definition: 'Execution time on Harness-managed build infrastructure (cloud-hosted runners).' },
    ],
    essentials: [
      { name: 'Repos Built', rate: 60, unit: 'repo', definition: 'Unique repositories that run CI builds, measured by peak daily active repos in the month.' },
      { name: 'Hosted Build Minute', rate: 0.05, unit: 'minute', definition: 'Execution time on Harness-managed build infrastructure (cloud-hosted runners).' },
    ],
  },
  {
    id: 'code',
    name: 'Code Repository',
    category: 'DevOps',
    questions: [
      'How much total storage do your Git repositories and LFS objects use today?',
      'Are you storing large binaries or build artifacts in Git repos?',
    ],
    tip: 'Check your Git hosting provider storage dashboard for current usage. First 250 GB is included.',
    enterprise: [
      { name: 'Code Repository Storage', rate: 2, unit: 'GB / month', rateLabel: '250 GB included, 2 / GB / month', definition: 'Total data stored in Git repositories and large file storage beyond the 250 GB included allowance.' },
    ],
    essentials: [
      { name: 'Code Repository Storage', rate: 2, unit: 'GB / month', rateLabel: '250 GB included, 2 / GB / month', definition: 'Total data stored in Git repositories and large file storage beyond the 250 GB included allowance.' },
    ],
  },
  {
    id: 'iacm',
    name: 'Infrastructure as Code Management',
    category: 'DevOps',
    questions: [
      'How many engineers (platform, DevOps, SRE) actively write or review Terraform/IaC code?',
      'How many times per month do you run terraform apply across all workspaces and environments?',
    ],
    tip: '(Number of workspaces) x (avg applies per workspace per month) gives a quick execution estimate.',
    enterprise: [
      { name: 'Workspace', rate: 20, unit: 'workspace / month', definition: 'An independent infrastructure unit such as a Terraform state file or workspace.' },
      { name: 'Active Host', rate: 8, unit: 'host / month', definition: 'Active infrastructure host (VM, node, or instance) managed by the platform.' },
    ],
    essentials: [
      { name: 'Workspace', rate: 20, unit: 'workspace / month', definition: 'An independent infrastructure unit (e.g., Terraform state file or workspace).' },
      { name: 'Active Host', rate: 8, unit: 'host / month', definition: 'Active infrastructure host (VM, node, or instance) managed by the platform.' },
    ],
  },
  {
    id: 'dbdevops',
    name: 'Database DevOps',
    category: 'DevOps',
    questions: [
      'How many database schemas or instances do you deploy changes to across all environments?',
      'How are schema migrations handled today (Flyway, Liquibase, manual scripts)? How often do they change?',
    ],
    tip: 'Count dev + staging + prod instances separately; each counts toward the metric.',
    enterprise: [
      { name: 'DB Instance', rate: 30, unit: 'instance / month', definition: 'A deployed database schema instance across all environments (dev, staging, prod each count separately).' },
    ],
    essentials: [
      { name: 'DB Instance', rate: 30, unit: 'instance / month', definition: 'A deployed database schema instance across all environments (dev, staging, prod each count separately).' },
    ],
  },
  {
    id: 'ar',
    name: 'Artifact Registry',
    category: 'DevOps',
    questions: [
      'How many developers publish artifacts (container images, packages, binaries) as part of CI/CD?',
      'What registries are you using today (Docker Hub, JFrog, Nexus, ECR)?',
    ],
    tip: 'Check your current registry storage dashboard for total GB used across all repositories.',
    enterprise: [
      { name: 'Artifact Storage', rate: 2, unit: 'GB / month', definition: 'Storage used for artifacts such as Docker images, binaries, Helm charts, and packages.' },
    ],
    essentials: [
      { name: 'AR Storage', rate: 2, unit: 'GB / month', definition: 'Storage used for artifacts such as Docker images, binaries, Helm charts, and packages.' },
    ],
  },
  {
    id: 'idp',
    name: 'Internal Developer Portal',
    category: 'DevOps',
    questions: [
      'How many developers would use a self-service catalog to discover services or scaffold new projects?',
      'Do you have a portal today (e.g., Backstage)? What is the adoption rate?',
    ],
    tip: 'Typically scoped to full engineering org headcount for maximum value.',
    enterprise: [
      { name: 'IDP User', rate: 40, unit: 'user / month', definition: 'Developers actively accessing the internal developer portal (service catalog, scaffolding, docs).' },
    ],
    essentials: [
      { name: 'IDP User', rate: 40, unit: 'user / month', definition: 'Developers actively accessing the internal developer portal (service catalog, scaffolding, docs).' },
    ],
  },
  {
    id: 'ff',
    name: 'Feature Management & Experimentation',
    category: 'DevOps',
    questions: [
      'How many engineers will create and manage feature flags? Do you control end-user rollouts?',
      'How many monthly active users would be targeted, and how many A/B experiments run concurrently?',
    ],
    tip: 'If replacing LaunchDarkly or Split, export their current seat count and MAU report for a baseline.',
    enterprise: [
      { name: 'Flag Request', rate: 1, unit: '1K requests', definition: 'SDK calls to fetch or sync feature flag evaluations. Measured in thousands of requests.' },
      { name: 'Event', rate: 1, unit: '4K events', definition: 'User or system interaction events tracked for experimentation analytics. Measured per 4,000 events.' },
    ],
    essentials: [
      { name: 'Flag Request', rate: 1, unit: '1K requests', definition: 'SDK calls to fetch or sync feature flag evaluations. Measured in thousands of requests.' },
      { name: 'Event', rate: 1, unit: '4K events', definition: 'User or system interaction events tracked for experimentation analytics. Measured per 4,000 events.' },
    ],
  },
  {
    id: 'resilience',
    name: 'Resilience Testing',
    category: 'Testing',
    questions: [
      'How many SRE or reliability engineers own resilience testing today?',
      'How many services or microservices do you want to run chaos, load, or DR experiments against?',
    ],
    tip: 'Pull your service list from PagerDuty, ServiceNow, or your service catalog for a fast count.',
    enterprise: [
      { name: 'Chaos Engineering - Services', rate: 120, unit: 'service / month', definition: 'Services under active chaos engineering testing (fault injection, failure simulation).' },
      { name: 'Load Testing - Services', rate: 240, unit: 'service / month', definition: 'Services under active load and performance testing.' },
      { name: 'Disaster Recovery - Services', rate: 360, unit: 'service / month', definition: 'Services covered by disaster recovery failover testing and validation.' },
    ],
    essentials: [
      { name: 'Chaos Engineering - Services', rate: 120, unit: 'service / month', definition: 'Services under active chaos engineering testing (fault injection, failure simulation).' },
      { name: 'Load Testing - Services', rate: 240, unit: 'service / month', definition: 'Services under active load and performance testing.' },
      { name: 'Disaster Recovery - Services', rate: 360, unit: 'service / month', definition: 'Services covered by disaster recovery failover testing and validation.' },
    ],
  },
  {
    id: 'aita',
    name: 'AI Test Automation',
    category: 'Testing',
    questions: [
      'How many automated tests do you run per month across all environments?',
      'How many test suites run on each CI pipeline execution?',
    ],
    tip: 'Check your CI pipeline logs for total test executions in the last 30 days.',
    enterprise: [
      { name: 'Test Execution', rate: 0.25, unit: 'execution', definition: 'Each run of an automated test across environments or configurations.' },
    ],
    essentials: [
      { name: 'AI Test Execution', rate: 0.25, unit: 'execution', definition: 'Each run of an automated test across environments or configurations.' },
    ],
  },
  {
    id: 'aisre',
    name: 'AI SRE',
    category: 'Testing',
    questions: [
      'How many SRE and DevOps engineers would use AI-assisted diagnostics and remediation?',
      'How many on-call engineers respond to incidents monthly?',
    ],
    tip: 'Count your on-call rotation size plus platform engineers who handle incident triage.',
    enterprise: [
      { name: 'AI SRE User', rate: 50, unit: 'user / month', definition: 'Users leveraging AI-driven site reliability engineering capabilities (diagnostics, remediation).' },
    ],
    essentials: [
      { name: 'AI SRE User', rate: 50, unit: 'user / month', definition: 'Users leveraging AI-driven site reliability engineering capabilities (diagnostics, remediation).' },
    ],
  },
  {
    id: 'acm',
    name: 'AI Coding',
    category: 'DevOps',
    questions: [
      'How many developers use AI-powered code suggestions or generation features?',
      'What is the expected volume of AI coding interactions per month?',
    ],
    tip: 'Estimate based on active developers using AI code completion tools.',
    enterprise: [
      { name: 'AI Coding Token', rate: 5, unit: '1M tokens', definition: 'Tokens consumed for AI-powered coding features (code suggestions, generation). Measured per million tokens.' },
    ],
    essentials: [
      { name: 'AI Coding Token', rate: 5, unit: '1M tokens', definition: 'Tokens consumed for AI-powered coding features (code suggestions, generation). Measured per million tokens.' },
    ],
  },
  {
    id: 'sto',
    name: 'Security Testing Orchestration',
    category: 'Security',
    questions: [
      'How many CI/CD pipelines or apps are you scanning with SAST, DAST, SCA, or secrets tools today?',
      'How many security scan steps run per pipeline execution?',
    ],
    tip: 'Count active pipelines with any security scan step. Each pipeline run with a scan = 1 STO scan.',
    enterprise: [
      { name: 'STO Scan', rate: 1, unit: 'scan', definition: 'Each execution of a security test (SAST, DAST, container scan, etc.) orchestrated through a pipeline.' },
    ],
    essentials: [
      { name: 'STO Scan', rate: 1, unit: 'scan', definition: 'Each execution of a security test (SAST, DAST, container scan, etc.) orchestrated through a pipeline.' },
    ],
  },
  {
    id: 'scs',
    name: 'Supply Chain Security',
    category: 'Security',
    questions: [
      'How many developers publish artifacts that need SBOM generation or SLSA attestation?',
      'How many distinct container images or packages do you build and release per month?',
    ],
    tip: 'Check image push counts in ECR, GCR, or Docker Hub (last 30 days) for a quick baseline.',
    enterprise: [
      { name: 'SCS Scan', rate: 1, unit: 'scan', definition: 'End-to-end artifact or pipeline security validation including SBOM generation and SLSA attestation.' },
    ],
    essentials: [
      { name: 'SCS Scan', rate: 1, unit: 'scan', definition: 'End-to-end artifact or pipeline security validation including SBOM generation and SLSA attestation.' },
    ],
  },
  {
    id: 'sast',
    name: 'Static Application Security Testing',
    category: 'Security',
    questions: [
      'How many developers write code across the apps you want to scan?',
      'How many repos would you onboard to automated SAST or container scanning?',
    ],
    tip: 'Filter out archived repos with no commits in 6+ months to avoid inflating scope.',
    enterprise: [
      { name: 'SAST Scan', rate: 2, unit: 'scan', definition: 'Static code analysis execution that scans source code for security vulnerabilities.' },
    ],
    essentials: [
      { name: 'SAST Scan', rate: 2, unit: 'scan', definition: 'Static code analysis execution that scans source code for security vulnerabilities.' },
    ],
  },
  {
    id: 'sca',
    name: 'Software Composition Analysis',
    category: 'Security',
    questions: [
      'How many applications or repos use open-source dependencies?',
      'How often do you scan dependencies (per commit, daily, weekly)?',
    ],
    tip: 'Multiply active repos by scan frequency to estimate monthly scans.',
    enterprise: [
      { name: 'SCA Scan', rate: 1, unit: 'scan', definition: 'Scan of open-source dependencies for known vulnerabilities, license risks, and outdated packages.' },
    ],
    essentials: [
      { name: 'SCA Scan', rate: 1, unit: 'scan', definition: 'Scan of open-source dependencies for known vulnerabilities, license risks, and outdated packages.' },
    ],
  },
  {
    id: 'apisec',
    name: 'API Security Testing',
    category: 'Security',
    questions: [
      'How many unique API endpoints do you expose (internal + external)?',
      'How often do you run security scans against your APIs?',
    ],
    tip: 'Count endpoints from your OpenAPI/Swagger specs or API gateway configuration.',
    enterprise: [
      { name: 'API Endpoint', rate: 1.75, unit: 'endpoint', definition: 'Unique API endpoints tested for security vulnerabilities such as injection, auth bypass, and misconfigurations.' },
    ],
    essentials: [
      { name: 'API Endpoint', rate: 1.75, unit: 'endpoint', definition: 'Unique API endpoints tested for security vulnerabilities such as injection, auth bypass, and misconfigurations.' },
    ],
  },
  {
    id: 'apidisc',
    name: 'API Discovery',
    category: 'Security',
    questions: [
      'How many microservices or applications expose APIs that may not be fully documented?',
      'Do you have shadow or undocumented APIs you need to catalog?',
    ],
    tip: 'Count ingress endpoints in Kubernetes or domains in your API gateway for a quick tally.',
    enterprise: [
      { name: 'API Endpoint', rate: 7, unit: 'endpoint', definition: 'Unique API endpoints identified and cataloged through automated discovery.' },
    ],
    essentials: [
      { name: 'API Endpoint', rate: 7, unit: 'endpoint', definition: 'Unique API endpoints identified and cataloged through automated discovery.' },
    ],
  },
  {
    id: 'waap',
    name: 'API / Web / Bot Protection',
    category: 'Security',
    questions: [
      'How many external-facing web apps or APIs does your organization expose to the internet?',
      'What is your approximate monthly API call volume across protected endpoints?',
    ],
    tip: 'Count ingress endpoints in Kubernetes or domains in Route53/Cloudflare for a quick tally.',
    enterprise: [
      { name: 'Protection API Call', rate: 75, unit: 'million calls', definition: 'API requests processed and protected by API protection rules.' },
      { name: 'WAP API Call', rate: 75, unit: 'million calls', definition: 'API requests processed and protected by Web Application Protection (WAF, rate limiting).' },
      { name: 'BAP API Call', rate: 75, unit: 'million calls', definition: 'API requests processed and protected by Bot Application Protection (bot detection, mitigation).' },
    ],
    essentials: [
      { name: 'Protection API Call', rate: 75, unit: 'million calls', definition: 'API requests processed and protected by API protection rules.' },
      { name: 'WAP API Call', rate: 75, unit: 'million calls', definition: 'API requests processed and protected by Web Application Protection (WAF, rate limiting).' },
      { name: 'BAP API Call', rate: 75, unit: 'million calls', definition: 'API requests processed and protected by Bot Application Protection (bot detection, mitigation).' },
    ],
  },
  {
    id: 'ccm',
    name: 'Cloud Cost Management',
    category: 'FinOps',
    questions: [
      'What is your total monthly cloud spend across AWS, Azure, and/or GCP?',
      'Are you focused on visibility, commitment management (RI/SP), AutoStopping, or all three?',
    ],
    tip: 'AWS Cost Explorer or Azure Cost Management gives a 3-month average spend instantly.',
    enterprise: [
      { name: 'Cloud Cost Insights', rate: 1, unit: 'total cloud spend', rateLabel: '1 HSU / $100 yearly cloud spend', definition: 'Total tracked cloud spend under cost management. 1 HSU per $100 of annual cloud spend.' },
      { name: 'Commitment Orchestrator', rate: 1, unit: 'EC2 spend', rateLabel: '1 HSU / $80 yearly EC2 spend', definition: 'EC2 spend actively managed through commitment orchestration (RI/Savings Plans). 1 HSU per $80 of managed annual spend.' },
      { name: 'AutoStopping', rate: 1, unit: 'non-prod spend', rateLabel: '1 HSU / $67 yearly non-prod spend', definition: 'Non-production cloud spend managed through automatic idle-resource stopping. 1 HSU per $67 of managed annual spend.' },
      { name: 'Cluster Orchestrator', rate: 1, unit: 'EKS spend', rateLabel: '1 HSU / $50 yearly EKS spend', definition: 'EKS spend related to managed Kubernetes clusters. 1 HSU per $50 of managed annual spend.' },
    ],
    essentials: [
      { name: 'Cloud Cost Insights', rate: 1, unit: 'total cloud spend', rateLabel: '1 HSU / $100 yearly cloud spend', definition: 'Total tracked cloud spend under cost management. 1 HSU per $100 of annual cloud spend.' },
      { name: 'Commitment Orchestrator', rate: 1, unit: 'EC2 spend', rateLabel: '1 HSU / $80 yearly EC2 spend', definition: 'EC2 spend actively managed through commitment orchestration (RI/Savings Plans). 1 HSU per $80 of managed annual spend.' },
      { name: 'AutoStopping', rate: 1, unit: 'non-prod spend', rateLabel: '1 HSU / $67 yearly non-prod spend', definition: 'Non-production cloud spend managed through automatic idle-resource stopping. 1 HSU per $67 of managed annual spend.' },
      { name: 'Cluster Orchestrator', rate: 1, unit: 'EKS spend', rateLabel: '1 HSU / $50 yearly EKS spend', definition: 'EKS spend related to managed Kubernetes clusters. 1 HSU per $50 of managed annual spend.' },
    ],
  },
  {
    id: 'sei',
    name: 'Software Engineering Insights',
    category: 'DevOps',
    questions: [
      'How many engineers would you want DORA metrics and productivity insights for?',
      'What data sources are you connecting (Jira, GitHub, PagerDuty)?',
    ],
    tip: 'Typically scoped to full engineering org headcount for maximum value.',
    enterprise: [
      { name: 'Named SEI User', rate: 40, unit: 'user / month', definition: 'Named users whose engineering metrics (DORA, velocity, productivity) are tracked.' },
    ],
    essentials: [
      { name: 'Named SEI User', rate: 40, unit: 'user / month', definition: 'Named users whose engineering metrics (DORA, velocity, productivity) are tracked.' },
    ],
  },
  {
    id: 'governance',
    name: 'Governance & Access',
    category: 'Platform',
    questions: [
      'How many custom roles, dashboards, and organizations do you need beyond the included allowances?',
      'How many OPA policy evaluations do you expect per month?',
    ],
    tip: 'Enterprise tier includes unlimited governance features. Essentials has free allowances with HSU costs beyond them.',
    enterprise: [
      { name: 'Policy Evaluation', rate: null, unit: '', rateLabel: 'Unlimited', definition: 'Evaluates policies to allow or deny platform actions.' },
      { name: 'Custom Roles', rate: null, unit: '', rateLabel: 'Unlimited', definition: 'User-defined roles to manage access and permissions.' },
      { name: 'Custom Dashboards', rate: null, unit: '', rateLabel: 'Unlimited', definition: 'Custom dashboards for visualizing platform data.' },
      { name: 'Organizations', rate: null, unit: '', rateLabel: 'Unlimited', definition: 'Logical grouping of projects and resources.' },
    ],
    essentials: [
      { name: 'OPA Policy Evaluation', rate: 0.1, unit: 'evaluation', rateLabel: '100 free/month; 0.1 HSU / eval', definition: 'Evaluates policies to allow or deny platform actions. First 100 evaluations free per month, then 0.1 HSU per evaluation.' },
      { name: 'Custom Role', rate: 100, unit: 'role / month', rateLabel: '5 included; 100 HSUs / role / month', definition: 'User-defined roles to manage access and permissions. First 5 roles included free.' },
      { name: 'Custom Dashboard', rate: 20, unit: 'dashboard / month', rateLabel: '10 included; 20 HSUs / dashboard / month', definition: 'Custom dashboards for visualizing platform data. Out of box included by default, first 10 custom dashboards included free.' },
      { name: 'Organizations', rate: 100, unit: 'org / month', rateLabel: '1 included; 100 HSUs / org / month', definition: 'Logical grouping of projects and resources. First organization included free.' },
    ],
  },
];

interface PlatformFeature {
  module: string;
  items: { name: string; enterprise: string; essentials: string }[];
}

const PLATFORM_FEATURES: PlatformFeature[] = [
  {
    module: 'Data Retention',
    items: [
      { name: 'Pipeline Execution History Logs', enterprise: '6 months free; 25,000 HSUs/year after', essentials: '6 months' },
      { name: 'Audit Trails History', enterprise: '2 years free; then additional cost', essentials: '6 months' },
      { name: 'Dashboard Data', enterprise: '2 years free; then additional cost', essentials: '6 months' },
    ],
  },
  {
    module: 'Identity & Access Management',
    items: [
      { name: 'Enterprise-grade IAM', enterprise: 'Yes', essentials: 'Yes' },
      { name: 'Multi IdP', enterprise: 'Yes', essentials: 'Yes' },
      { name: 'Just in Time Provisioning', enterprise: 'Yes', essentials: 'Yes' },
    ],
  },
  {
    module: 'Compliance',
    items: [
      { name: 'Compliance', enterprise: 'Yes', essentials: 'Yes' },
    ],
  },
  {
    module: 'Reliability',
    items: [
      { name: 'SLA', enterprise: '99.9%', essentials: '99.5%' },
      { name: 'DR', enterprise: 'RTO: 1 hr / RPO: 2 hrs', essentials: 'RTO: 2 hrs / RPO: 6 hrs' },
    ],
  },
  {
    module: 'Environment',
    items: [
      { name: 'Sandbox Account', enterprise: 'Yes', essentials: 'No' },
    ],
  },
  {
    module: 'Support',
    items: [
      { name: 'Standard Support', enterprise: 'Included', essentials: 'Included' },
      { name: 'Enterprise 24x7 Support', enterprise: '20% additional fee', essentials: '20% additional fee' },
      { name: 'Professional Services (TAM+)', enterprise: '15% additional fee', essentials: '—' },
    ],
  },
  {
    module: 'Platform (Deployment)',
    items: [
      { name: 'Self-Managed Platform', enterprise: 'Same as SaaS', essentials: '—' },
      { name: 'Dedicated SaaS (Single Tenant)', enterprise: '25K / tenant / month', essentials: '—' },
    ],
  },
];

const CATEGORIES = ['All', 'DevOps', 'Testing', 'Security', 'FinOps', 'Platform'];

interface MetricInputState {
  [key: string]: number;
}

function HsuCalculatorInner() {
  const [isOpen, setIsOpen] = useState(false);
  const [tier, setTier] = useState<Tier>('enterprise');
  const [activeCategory, setActiveCategory] = useState('All');
  const [inputs, setInputs] = useState<MetricInputState>({});

  const filteredModules = useMemo(() => {
    if (activeCategory === 'All') return MODULES;
    return MODULES.filter((m) => m.category === activeCategory);
  }, [activeCategory]);

  const totalHsus = useMemo(() => {
    let total = 0;
    MODULES.forEach((mod) => {
      const metrics = mod[tier];
      metrics.forEach((metric) => {
        if (metric.rate === null) return;
        const key = `${mod.id}-${tier}-${metric.name}`;
        const qty = inputs[key] || 0;
        total += qty * metric.rate;
      });
    });
    return total;
  }, [inputs, tier]);

  const handleInput = useCallback((key: string, value: string) => {
    const num = parseFloat(value);
    setInputs((prev) => ({
      ...prev,
      [key]: isNaN(num) ? 0 : num,
    }));
  }, []);

  const handleTierSwitch = useCallback((newTier: Tier) => {
    if (newTier !== tier) {
      setTier(newTier);
      setInputs({});
    }
  }, [tier]);

  const handleReset = useCallback(() => {
    setInputs({});
  }, []);

  return (
    <div className={styles.calculator}>
      <button
        className={`${styles.toggleBtn} ${isOpen ? styles.toggleBtnOpen : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className={styles.toggleIcon}>{isOpen ? '▾' : '▸'}</span>
        <span>HSU consumption by module</span>
      </button>

      {isOpen && (
        <div className={styles.calcBody}>
          <div className={styles.tierToggle}>
            <button
              className={`${styles.tierBtn} ${tier === 'enterprise' ? styles.tierBtnActive : ''}`}
              onClick={() => handleTierSwitch('enterprise')}
            >
              Enterprise
            </button>
            <button
              className={`${styles.tierBtn} ${tier === 'essentials' ? styles.tierBtnActive : ''}`}
              onClick={() => handleTierSwitch('essentials')}
            >
              Essentials
            </button>
          </div>

          <p className={styles.calcDescription}>
            Enter your expected usage to estimate monthly HSU consumption. Rates shown are for the <strong>{tier === 'enterprise' ? 'Enterprise' : 'Essentials'}</strong> tier.
            {tier === 'essentials' && <> Essentials includes max 250 users and 1,000 free HSUs/month.</>}
          </p>

          <div className={styles.filterBar}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterBtnActive : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className={styles.summaryBar}>
            <div className={styles.summaryTotal}>
              <span className={styles.summaryLabel}>Estimated Monthly HSUs</span>
              <span className={styles.summaryValue}>
                {totalHsus.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </span>
            </div>
            <button className={styles.resetBtn} onClick={handleReset}>
              Reset
            </button>
          </div>

          <div className={styles.scrollableContent}>
            <div className={styles.moduleGrid}>
              {filteredModules.map((mod) => {
                const metrics = mod[tier];
                return (
                  <div key={mod.id} className={styles.moduleCard}>
                    <div className={styles.moduleHeader}>
                      <span className={`${styles.categoryBadge} ${styles[`cat${mod.category}`]}`}>
                        {mod.category}
                      </span>
                      <h4 className={styles.moduleName}>{mod.name}</h4>
                    </div>
                    <div className={styles.metricsTable}>
                      <div className={styles.metricsHeader}>
                        <span>Metric</span>
                        <span>How to calculate</span>
                        <span>HSU Rate</span>
                        <span>Quantity</span>
                        <span>HSUs</span>
                      </div>
                      {metrics.map((metric) => {
                        const key = `${mod.id}-${tier}-${metric.name}`;
                        const qty = inputs[key] || 0;
                        const hsus = metric.rate !== null ? qty * metric.rate : null;
                        const isCalculable = metric.rate !== null;
                        return (
                          <div key={key} className={styles.metricRow}>
                            <span className={styles.metricName}>{metric.name}</span>
                            <span className={styles.metricDef}>{metric.definition}</span>
                            <span className={styles.metricRate}>
                              {metric.rateLabel || (metric.rate !== null ? `${metric.rate} / ${metric.unit}` : '—')}
                            </span>
                            {isCalculable ? (
                              <input
                                type="number"
                                min="0"
                                className={styles.metricInput}
                                value={inputs[key] || ''}
                                placeholder="0"
                                onChange={(e) => handleInput(key, e.target.value)}
                              />
                            ) : (
                              <span className={styles.metricIncluded}>Included</span>
                            )}
                            <span className={styles.metricHsus}>
                              {hsus !== null && hsus > 0 ? hsus.toLocaleString(undefined, { maximumFractionDigits: 2 }) : '—'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <div className={styles.cardFooter}>
                      {mod.tip && (
                        <div className={styles.discoveryTip}>
                          <strong>Tip:</strong> {mod.tip}
                        </div>
                      )}
                      {mod.questions && (
                        <details className={styles.discoverySection}>
                          <summary className={styles.discoverySummary}>How to estimate</summary>
                          <ul className={styles.discoveryQuestions}>
                            {mod.questions.map((q, i) => (
                              <li key={i}>{q}</li>
                            ))}
                          </ul>
                        </details>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {(activeCategory === 'All' || activeCategory === 'Platform') && (
              <div className={styles.platformSection}>
                <h4 className={styles.platformTitle}>Platform features (included)</h4>
                <div className={styles.platformTable}>
                  <div className={styles.platformHeader}>
                    <span>Module</span>
                    <span>Feature</span>
                    <span>{tier === 'enterprise' ? 'Enterprise' : 'Essentials'}</span>
                  </div>
                  {PLATFORM_FEATURES.map((group) =>
                    group.items.map((item, idx) => (
                      <div key={`${group.module}-${item.name}`} className={styles.platformRow}>
                        <span className={styles.platformModule}>{idx === 0 ? group.module : ''}</span>
                        <span className={styles.platformFeature}>{item.name}</span>
                        <span className={styles.platformValue}>{tier === 'enterprise' ? item.enterprise : item.essentials}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function HsuCalculator() {
  return (
    <BrowserOnly fallback={<div>Loading calculator...</div>}>
      {() => <HsuCalculatorInner />}
    </BrowserOnly>
  );
}
