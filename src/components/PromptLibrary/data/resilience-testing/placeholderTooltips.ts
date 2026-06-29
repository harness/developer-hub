/**
 * Centralized tooltips for the input fields rendered in the prompt builder.
 * Ported from PriteshKiri/RT-prompt-library (Apache 2.0).
 * https://github.com/PriteshKiri/RT-prompt-library/blob/main/website/lib/data/placeholderTooltips.ts
 *
 * Keys are the *parsed* placeholder name (the text before ` - `, ` from `, or
 * `:`), so `[FAULT_TYPE - e.g. pod-delete]` and `[FAULT_TYPE from Step 1]`
 * both resolve via the `FAULT_TYPE` entry below.
 *
 * The form falls back to the placeholder's inline hint (the text after the
 * separator) when no tooltip is defined here.
 */
export const placeholderTooltips: Record<string, string> = {
  SERVICE_NAME:
    'The exact name of the service you are testing, as it appears in your Harness project (e.g. payments-api, checkout-service). Used to scope every chaos action to one workload.',
  DEPLOYMENT_NAME:
    'The Kubernetes deployment (or workload object) name that backs the service. Usually matches the service name plus a suffix like -deploy.',
  EXPERIMENT_NAME:
    'The exact name of the chaos experiment you want to run, exactly as it is stored in Harness.',
  UPSTREAM_SERVICE:
    'A service that the target service depends on (a downstream HTTP/gRPC dependency). The fault will be injected against the network egress to this dependency.',
  TOP_UPSTREAM_DEPENDENCY:
    "The most important upstream dependency identified earlier in this playbook (Step 1's network map). Pass it through here so the experiment targets the right egress path.",
  LIST_OF_SERVICES:
    'Comma-separated list of services included in the GameDay scope (e.g. payments-api, checkout-service, ledger).',

  ENVIRONMENT:
    'Which environment to act in: staging, pre-prod, prod, etc. Most flows should target staging unless you have explicit ChaosGuard rules allowing production.',
  RESTRICTED_NAMESPACES:
    'Kubernetes namespaces that chaos experiments must never touch (e.g. payments-prod, database-prod). Used to build a hard ChaosGuard denylist.',

  ENDPOINT_PATH:
    'The HTTP path the probe will hit on the service to validate health (e.g. /health, /api/v1/orders). The probe expects an HTTP 200 response.',
  HEALTH_ENDPOINT:
    'The health-check URL or path the HTTP probe should poll during the experiment. A 2xx response is required for the probe to pass.',
  ENDPOINT_OR_METRIC:
    'Either an HTTP endpoint (for an HTTP probe) or a Prometheus metric query (for a Prometheus probe) - whatever signal proves the fix works.',
  PROBE_TYPE:
    'The probe type Harness should create: HTTP for endpoint checks, Prometheus for metric checks, Kubernetes for resource-state checks, or Cmd for shell-based checks.',

  N: 'A small integer count - typically the blast radius (number of pods, replicas, or instances) to target. Start with 1 for first runs and grow only after the service recovers cleanly.',
  LATENCY_MS:
    'How much synthetic latency (in milliseconds) to inject on the network path. Begin with 100–250ms and only escalate after the service handles the lower value.',
  MAX_LATENCY_MS:
    'The maximum response-time ceiling (in milliseconds) the service is allowed to exceed under fault conditions before the experiment is considered a failure.',
  MAX_RESPONSE_MS:
    "The upper bound on the service's own response time (in milliseconds) while the fault is active. The HTTP probe will fail if responses cross this threshold.",
  DURATION_SECONDS:
    'Total duration (in seconds) the chaos fault should remain active during the experiment. 60–120s is a safe starting range.',
  THRESHOLD:
    'Numeric risk-score cutoff used to flag services for review (e.g. 70 on the chaos_risk 0–100 scale).',

  VERSION_TAG:
    'The version, build, or image tag being promoted (e.g. v1.4.2, sha-abc1234). Used in the pre-deployment summary so reviewers know exactly what they are gating.',

  DATE: 'Calendar date in YYYY-MM-DD form. Use the incident date, the GameDay date, or whichever event the prompt is anchored to.',
  DATE_TIME:
    'Date and time of the incident (ISO 8601 preferred, e.g. 2025-10-14T15:32 UTC). Include the timezone to avoid ambiguity in the post-mortem.',
  START_TIME:
    'Start of the allowed chaos window in HH:MM 24-hour format, UTC unless otherwise stated.',
  END_TIME:
    'End of the allowed chaos window in HH:MM 24-hour format, UTC unless otherwise stated.',
  DAYS:
    'Which weekdays the window applies to (e.g. Tuesday and Thursday). Comma-separated is fine.',
  TIME_WINDOW:
    'The business-hours window experiments are allowed to run in (e.g. 10:00–17:00 UTC, weekdays).',

  BRIEF_DESCRIPTION_OF_INCIDENT:
    'One or two sentences describing what went wrong in production (symptom + impact). Example: "checkout returned 503s for 12 minutes after a pod OOM-killed under traffic spike."',
  INCIDENT_SUMMARY:
    'A short paragraph summarising the production incident - what failed, for how long, and the customer-facing impact. The clearer the summary, the better the reproduction.',
  ROOT_CAUSE:
    'The diagnosed underlying cause of the incident (e.g. "memory limit too low, no graceful degradation"). Drives which fault type to use for validation.',
  BRIEF_DESCRIPTION_OF_FIX:
    'One or two sentences describing the code or config change deployed to prevent recurrence (e.g. "raised memory limit, added circuit breaker on retries").',
  FIX_SUMMARY:
    'A short summary of the fix that was shipped, including any infra/config changes. Used in the validation experiment design and the post-mortem.',
  PASS_CONDITION:
    'The measurable condition that defines a successful run (e.g. "service recovers within 90 seconds and the HTTP probe never returns 5xx").',

  FAULT_TYPE:
    'The chaos fault identifier from the ChaosHub (e.g. pod-delete, pod-network-latency, pod-cpu-hog, container-kill). Must match an available fault in your hub.',
  FAULT_NAMES:
    'Comma-separated list of fault identifiers that should be blocked (e.g. node-drain, container-kill). Use the exact hub identifiers, not display names.',
  'FILL IN':
    'Choose the specific target category you care about so the agent can scope its catalog walk (e.g. pod networking, AWS EC2, JVM memory, node pressure).',

  APPROVER_GROUP:
    'The Harness user group whose approval is required before a production experiment can execute (e.g. sre-leads, platform-oncall).',
  GAMEDAY_LEAD_USER:
    'The Harness username of the person running the GameDay. Their approval is required for each experiment execution during the session.',
  TEAM_NAMES:
    'Comma-separated names of the teams participating in the GameDay (e.g. payments, platform, observability).',

  THEME:
    'One sentence describing the GameDay\'s hypothesis (e.g. "testing payment processing resilience under infrastructure failures").',
  SCENARIO_1_NAME: "Name of the first scenario you've chosen to run during the GameDay.",
  SCENARIO_2_NAME: "Name of the second scenario you've chosen to run during the GameDay.",
  SCENARIO_3_NAME: "Name of the third scenario you've chosen to run during the GameDay.",
};
