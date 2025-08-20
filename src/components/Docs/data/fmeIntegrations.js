import React from 'react';

// Helper to chunk an array into rows
function chunkArray(array, size) {
  if (!Array.isArray(array) || array.length === 0) return [];
  return array.reduce((acc, _, i) =>
    i % size ? acc : [...acc, array.slice(i, i + size)], []
  );
}

export const supportedModules = [
  { name: "Harness IDP", img: "/img/icon_idp.svg", link: "/docs/internal-developer-portal/plugins/available-plugins/harness-native-plugins/harness-fme" },
];

export const supportedWorkflows = [
  { name: "AppDynamics", img: "/provider-logos/fme-integrations/appdynamics-logo.png", link: "/docs/feature-management-experimentation/integrations/appdynamics" },
  { name: "Azure DevOps", img: "/provider-logos/fme-integrations/azure-devops-logo.png", link: "/docs/feature-management-experimentation/integrations/azure-devops" },
  { name: "Datadog", img: "/provider-logos/fme-integrations/datadog-logo.png", link: "/docs/feature-management-experimentation/integrations/datadog" },
  { name: "Jira Cloud", img: "/provider-logos/fme-integrations/jira-logo.png", link: "/docs/feature-management-experimentation/integrations/jira-cloud" },
  { name: "New Relic", img: "/provider-logos/fme-integrations/newrelic-logo.png", link: "/docs/feature-management-experimentation/integrations/new-relic" },
  { name: "Rollbar", img: "/provider-logos/fme-integrations/rollbar-logo.png", link: "/docs/feature-management-experimentation/integrations/rollbar" },
  { name: "ServiceNow", img: "/provider-logos/fme-integrations/servicenow-logo.png", link: "/docs/feature-management-experimentation/integrations/servicenow" },
  { name: "Slack", img: "/provider-logos/fme-integrations/slack-logo.png", link: "/docs/feature-management-experimentation/integrations/slack" },
  { name: "Sumo Logic", img: "/provider-logos/fme-integrations/sumologic-logo.png", link: "/docs/feature-management-experimentation/integrations/sumologic" },
  { name: "Visual Studio Code", img: "/provider-logos/fme-integrations/vscode-logo.png", link: "/docs/feature-management-experimentation/integrations/visual-studio-code-extension" },
  { name: "Webhook (Audit Logs)", img: "/provider-logos/split-logo.png", link: "/docs/feature-management-experimentation/api/webhook/audit-logs" },
];

export const supportedDatasources = [
  { name: "Amazon S3", img: "/provider-logos/fme-integrations/amazon-s3-logo.png", link: "/docs/feature-management-experimentation/integrations/amazon-s3" },
  { name: "Amplitude", img: "/provider-logos/fme-integrations/amplitude-logo.svg", link: "/docs/feature-management-experimentation/integrations/amplitude" },
  { name: "Cloudflare Workers", img: "/provider-logos/fme-integrations/cloudflare-worker-logo.png", link: "/docs/feature-management-experimentation/integrations/cloudflare-workers" },
  { name: "Google Analytics", img: "/provider-logos/fme-integrations/google-analytics-logo.png", link: "/docs/feature-management-experimentation/integrations/google-analytics" },
  { name: "Google Tag Manager", img: "/provider-logos/fme-integrations/google-tag-manager-logo.png", link: "/docs/feature-management-experimentation/integrations/google-tag-manager" },
  { name: "mParticle", img: "/provider-logos/fme-integrations/mparticle-logo.png", link: "/docs/feature-management-experimentation/integrations/mparticle" },
  { name: "Segment", img: "/provider-logos/fme-integrations/segment-logo.png", link: "/docs/feature-management-experimentation/integrations/segment" },
  { name: "Sentry", img: "/provider-logos/fme-integrations/sentry-logo.png", link: "/docs/feature-management-experimentation/integrations/sentry" },
  { name: "Webhook (Impressions)", img: "/provider-logos/split-logo.png", link: "/docs/feature-management-experimentation/api/webhook/impressions" },
];

export const supportedAdminchanges = [
  { name: "Webhook (Admin Audit Logs)", img: "/provider-logos/split-logo.png", link: "/docs/feature-management-experimentation/api/webhook/admin-audit-logs" },
];

export const supportedCommunity = [
  { name: "Bugsnag", img: "/provider-logos/fme-integrations/bugsnag-logo.png", link: "/docs/feature-management-experimentation/integrations/appdynamics" },
  { name: "Dynatrace", img: "/provider-logos/fme-integrations/dynatrace-logo.png", link: "/docs/feature-management-experimentation/integrations/azure-devops" },
  { name: "FullStory", img: "/provider-logos/fme-integrations/fullstory-logo.png", link: "/docs/feature-management-experimentation/integrations/fullstory" },
  { name: "Grafana", img: "/provider-logos/fme-integrations/grafana-logo.png", link: "/docs/feature-management-experimentation/integrations/grafana" },
  { name: "Heap", img: "/provider-logos/fme-integrations/heap-logo.png", link: "/docs/feature-management-experimentation/integrations/heap" },
  { name: "Jenkins", img: "/provider-logos/fme-integrations/jenkins-logo.png", link: "/docs/feature-management-experimentation/integrations/jenkins" },
  { name: "Mixpanel", img: "/provider-logos/fme-integrations/mixpanel-logo.png", link: "/docs/feature-management-experimentation/integrations/mixpanel" },
  { name: "PagerDuty", img: "/provider-logos/fme-integrations/pagerduty-logo.png", link: "/docs/feature-management-experimentation/integrations/pagerduty" },
  { name: "Quantum Metric", img: "/provider-logos/fme-integrations/quantummetric-logo.png", link: "/docs/feature-management-experimentation/integrations/quantummetric" },
  { name: "SessionCam", img: "/provider-logos/fme-integrations/sessioncam-logo.png", link: "/docs/feature-management-experimentation/integrations/sessioncam" },
  { name: "Terraform Provider", img: "/provider-logos/fme-integrations/terraform-logo.png", link: "/docs/feature-management-experimentation/integrations/terraform" },
];

export const Section = ({ title, items, perRow = 6, rowSpacing = '32px', description }) => {
  const rows = chunkArray(items, perRow);

  return (
    <section style={{ marginBottom: '64px' /* extra space after section */ }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{title}</h2>
      {description && <p style={{ marginBottom: '16px' }}>{description}</p>}

      {rows.map((row, rowIdx) => (
        <div key={rowIdx} style={{ display: 'flex', gap: '1rem', marginBottom: rowSpacing }}>
          {row.map(({ name, img, link }) => (
            <a
              key={name}
              href={link}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                textDecoration: 'none',
                color: 'inherit',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '1rem',
                width: '140px',
                boxSizing: 'border-box',
              }}
            >
              <img src={img} alt={name} style={{ width: '80px', height: '60px', objectFit: 'contain', marginBottom: '8px' }} />
              <span style={{ textAlign: 'center', lineHeight: '1.2' }}>{name}</span>
            </a>
          ))}
        </div>
      ))}
    </section>
  );
};
