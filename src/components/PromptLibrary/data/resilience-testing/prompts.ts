/**
 * Prompts ported verbatim from PriteshKiri/RT-prompt-library (Apache 2.0).
 * https://github.com/PriteshKiri/RT-prompt-library/blob/main/website/lib/data/prompts.ts
 *
 * Add a new prompt by appending an object to this array.
 * The UI groups and filters by `category` (the display label).
 */

import type { Prompt } from '../types';

export const prompts: Prompt[] = [
  {
    id: 'coverage-map',
    category: 'Discovery',
    title: 'Resilience Coverage Map',
    scenario:
      'You are starting a new sprint or a quarterly review and you need to understand which services in your project have chaos experiments and which services have zero coverage. This is the baseline audit.',
    summary:
      'Audit every service in the project for chaos coverage and identify the gaps that need experiments next.',
    tags: ['audit', 'coverage', 'risk'],
    useCases: [
      'Find services with zero chaos coverage before a sprint or quarterly review.',
      'Rank high-risk services that need experiments based on Harness risk scores.',
    ],
    prompt: `I want a full resilience coverage audit for this project.

1. List all chaos experiments in the project and group them by the service they target.
2. For each service that has experiments, show the experiment names and the last time any of them were run.
3. Identify any services registered in the project that have no chaos experiments at all.
4. Pull the chaos_risk data and highlight the top 5 services with the highest unmitigated risk score.

Give me the output as a summary table, then a prioritized list of services that need experiments created.`,
    expectedOutput:
      'A table with columns: Service Name, Experiment Count, Last Run Date, Risk Score. Below it, a ranked list of services with no coverage or high risk and no recent runs.',
    resourceTypes: ['chaos_experiment', 'chaos_experiment_run', 'chaos_risk'],
    notes:
      'If your project has many services, the agent may need to paginate. You can scope this to a specific environment by adding "filter to the production environment only" to the prompt.',
  },
  {
    id: 'fault-catalog',
    category: 'Discovery',
    title: 'Fault Catalog Exploration',
    scenario:
      "Before designing an experiment, you want to know what faults are available for a specific target - Kubernetes pods, AWS EC2 instances, network layer, JVM processes, etc. This prevents you from designing experiments around faults that don't exist yet in your ChaosHub.",
    summary:
      'Browse the chaos faults available in your connected ChaosHubs and compare their tunables before choosing one.',
    tags: ['discovery', 'faults', 'chaoshub'],
    useCases: [
      'Discover what faults are available in your ChaosHubs across platforms and targets.',
      'Compare fault tunables side-by-side to pick the right one for your experiment.',
    ],
    prompt: `I need to understand what chaos faults are available before I design an experiment.

1. List all available chaos hubs connected to this project.
2. From the enterprise ChaosHub, show me all faults organized by category: Kubernetes, AWS, GCP, Azure, Network, JVM, and Linux.
3. For each category, tell me what the fault does and what parameters I can tune.
4. I am particularly interested in faults that target [FILL IN: pod networking / AWS EC2 / JVM memory / node pressure].

Give me enough detail to decide which fault to use in my experiment.`,
    expectedOutput:
      'A grouped list of faults by platform/category. For each fault: name, what it injects, key tunables (duration, affected targets, intensity), and any prerequisites for using it.',
    resourceTypes: ['chaos_hub', 'chaos_fault'],
    notes:
      'Replace `[FILL IN: ...]` with the specific target you care about. If you are working with a custom ChaosHub or a private fork, the agent will discover that hub too as long as it is connected to your Harness project.',
  },
  {
    id: 'resilience-risk',
    category: 'Discovery',
    title: 'Service Resilience Risk Scan',
    scenario:
      "You need to prioritize which services to test next. Rather than guessing, you want to pull Harness's risk scoring to find out which services have the highest unmitigated risk - meaning they carry known failure risks with no experiment coverage to validate how they respond.",
    summary:
      'Rank every service by unmitigated resilience risk and surface AI-generated experiment recommendations you have not acted on yet.',
    tags: ['risk', 'prioritization', 'recommendations'],
    useCases: [
      'Prioritize a backlog of new experiments based on real, data-driven risk scores.',
      'Surface pending AI recommendations for the highest-risk services in your project.',
    ],
    prompt: `Pull the resilience risk data for all services in this project.

1. List every service with a risk score, sorted from highest to lowest.
2. For each high-risk service, tell me what the contributing risk factors are - is it untested faults, no probe coverage, no recent runs, or something else?
3. Cross-reference with chaos_recommendation data - are there any AI-generated experiment recommendations for the high-risk services that we haven't acted on yet?
4. Flag any service that has been high-risk for more than 30 days with no new experiments created.

I want to use this to build a prioritized sprint backlog for the resilience testing team.`,
    expectedOutput:
      'A ranked list of services with their risk score, top risk factors, and any pending recommendations. A separate flag list of services that have been stale for 30+ days with no new resilience testing.',
    resourceTypes: ['chaos_risk', 'chaos_recommendation', 'chaos_experiment_run'],
    notes:
      'This is the right prompt to run at the start of a quarterly business review or before planning a GameDay. The recommendations data surfaces faults that Harness has identified as relevant but not yet tested against a service.',
  },
  {
    id: 'pod-failure',
    category: 'Experiment Design',
    title: 'Pod Failure Experiment Design',
    scenario:
      'You want to test how a Kubernetes-based service handles pod deletion or crash looping. This is one of the most common failure modes in production and validates whether your service recovers within an acceptable time, whether alerts fire correctly, and whether dependent services degrade gracefully.',
    summary:
      'Design and create a chaos experiment that validates how a Kubernetes service recovers when its pods are deleted.',
    tags: ['kubernetes', 'pod', 'recovery'],
    useCases: [
      'Validate that a Kubernetes service recovers within tolerance after pod deletion.',
      'Confirm probes and alerts fire correctly during a pod crash scenario.',
    ],
    prompt: `Design and create a chaos experiment to test pod failure for the [SERVICE_NAME] service in the [ENVIRONMENT] environment.

Here is what I want to validate:
- The service recovers within 60 seconds after a pod is deleted
- The HTTP endpoint at [ENDPOINT_PATH] returns 200 within 90 seconds of recovery
- No more than [N] replicas are deleted at once (blast radius limit)
- Alerts fire in our monitoring system within 30 seconds of the pod going down

Steps I want you to take:
1. Check what chaos infrastructure is available and healthy in the [ENVIRONMENT] environment
2. Look up the pod-delete fault in the enterprise ChaosHub and show me its tunables
3. Create an HTTP probe that checks [ENDPOINT_PATH] for a 200 response
4. Create a Prometheus probe that validates the alert fired
5. Create the experiment with both probes attached, targeting the [SERVICE_NAME] deployment, deleting [N] pods, with a chaos duration of 60 seconds
6. Show me the experiment configuration before saving it so I can review it`,
    expectedOutput:
      'The experiment configuration showing: target workload, fault type and tunables, attached probes with their check intervals, chaos duration, and the infrastructure it will run on. Agent will prompt for confirmation before saving.',
    resourceTypes: [
      'chaos_infrastructure',
      'chaos_fault',
      'chaos_probe',
      'chaos_experiment',
    ],
    notes:
      'Replace `[SERVICE_NAME]`, `[ENVIRONMENT]`, `[ENDPOINT_PATH]`, and `[N]` with your actual values before running this prompt. A good starting value for `[N]` is 1 for a first run. Increase it only after confirming the service recovers correctly from single-pod deletion.',
  },
  {
    id: 'network-latency',
    category: 'Experiment Design',
    title: 'Network Latency Experiment Design',
    scenario:
      'You want to test how a service behaves when its upstream dependencies become slow - not down, just slow. This is one of the most underrepresented failure modes in testing. Services that handle complete outages fine often cascade catastrophically when latency hits 500ms or 1s, because connection pools exhaust, timeouts stack, and retries amplify load.',
    summary:
      'Inject targeted network latency on egress to an upstream dependency and validate how the calling service degrades.',
    tags: ['network', 'latency', 'dependencies'],
    useCases: [
      'Test how a service degrades when upstream dependencies become slow but stay up.',
      'Validate circuit breakers, timeouts, and connection-pool behavior under jitter.',
    ],
    prompt: `Design a network latency experiment for the [SERVICE_NAME] service targeting its dependency on [UPSTREAM_SERVICE].

I want to validate:
- [SERVICE_NAME] stays functional with up to [LATENCY_MS]ms injected latency on egress to [UPSTREAM_SERVICE]
- Response times at [SERVICE_NAME]'s own endpoint stay under [MAX_RESPONSE_MS]ms under this condition
- The service does not exhaust connection pool or start throwing 5xx errors
- If latency exceeds tolerance, the service degrades gracefully (circuit breaker, fallback, or graceful error)

Steps:
1. Check the chaos_network_map to confirm the dependency between [SERVICE_NAME] and [UPSTREAM_SERVICE]
2. Look up the network-latency fault and show me the tunables (jitter, destination hosts, port filtering)
3. Create an HTTP probe monitoring [SERVICE_NAME]'s health endpoint with continuous mode
4. Create the experiment injecting [LATENCY_MS]ms latency for 120 seconds on the pods in the [SERVICE_NAME] deployment that communicate with [UPSTREAM_SERVICE]
5. Set the experiment to run in the [ENVIRONMENT] environment

Show me the configuration and confirm before creating.`,
    expectedOutput:
      'Experiment config showing: target pods, network egress filter (destination host and port), latency value and jitter, probe with continuous monitoring, and total chaos duration.',
    resourceTypes: ['chaos_network_map', 'chaos_fault', 'chaos_probe', 'chaos_experiment'],
    notes:
      "Network latency faults require the chaos infrastructure agent to have the right permissions to modify network rules on the target pod's host. Verify this in your infrastructure setup before running. Start with lower latency values (100ms) and increase progressively - do not start at 1s in a production environment.",
  },
  {
    id: 'pre-deploy-check',
    category: 'Pre-Deployment',
    title: 'Pre-Deployment Resilience Check',
    scenario:
      "Your team is 1-2 hours from pushing a significant release to production. Before promoting, you want to quickly verify that all the existing chaos experiments for the affected services still pass - confirming your recent code changes haven't introduced regressions in how the service handles failures.",
    summary:
      'Run the existing chaos experiments for a service in staging and get a go / no-go recommendation before promoting a release.',
    tags: ['release gate', 'ci/cd', 'go/no-go'],
    useCases: [
      'Confirm existing experiments still pass before promoting a release to production.',
      'Get a go / no-go recommendation backed by resilience scores from staging.',
    ],
    prompt: `We are about to deploy [SERVICE_NAME] version [VERSION_TAG] to production. Before we promote, I need a pre-deployment resilience check.

1. List all chaos experiments that target [SERVICE_NAME].
2. For each experiment, show me the last run result - did it pass or fail, what was the resilience score, and when was it last run?
3. Identify any experiments that haven't been run in the last [N] days - those are coverage gaps.
4. Run the top 3 highest-priority experiments against [SERVICE_NAME] in the staging environment right now.
5. After the runs complete, give me a go/no-go recommendation based on the results. If any experiment fails or the resilience score drops below 80, the recommendation should be no-go with a clear explanation of what failed.`,
    expectedOutput:
      'A summary table of all experiments for the service with last run status and score. A list of stale experiments. Run results for the 3 executed experiments. A clear go/no-go decision with the reasoning.',
    resourceTypes: ['chaos_experiment', 'chaos_experiment_run'],
    notes:
      "Replace `[N]` with your team's freshness threshold - 7 days is a reasonable default for weekly releases, 14 days for less frequent deploys. Only run experiments in the staging environment, not production, during a pre-deployment gate. The agent will confirm before executing runs.",
  },
  {
    id: 'validate-fix',
    category: 'Incident Response',
    title: 'Validate Fix After Production Incident',
    scenario:
      "Your team had a production incident - for example, a pod crash loop that took down the payments service for 12 minutes. You've shipped a fix (a readiness probe update, a circuit breaker configuration, a retry policy). Now you need to confirm that under the same failure condition, the service now recovers as expected.",
    summary:
      'Reproduce the failure condition from a recent production incident and verify that your shipped fix actually mitigates it.',
    tags: ['incident response', 'post-mortem', 'validation'],
    useCases: [
      'Reproduce a production incident in staging to confirm the shipped fix works.',
      'Generate a post-mortem summary backed by chaos test results.',
    ],
    prompt: `We had a production incident on [DATE] where [BRIEF_DESCRIPTION_OF_INCIDENT]. We believe the root cause was [ROOT_CAUSE]. We've shipped a fix - [BRIEF_DESCRIPTION_OF_FIX].

I need to validate this fix with a chaos experiment.

1. Check if there is an existing chaos experiment for [SERVICE_NAME] that covers [FAULT_TYPE - e.g. pod-delete / network-latency / cpu-stress].
2. If an experiment exists, show me its configuration and the results from its last run.
3. If no experiment exists, design one that reproduces the failure condition described above with an HTTP probe checking [HEALTH_ENDPOINT] and a chaos duration of [DURATION_SECONDS] seconds.
4. Run the experiment in the staging environment against the version that includes our fix.
5. Report the result - did the service recover within the expected window, did the probe pass, and what was the resilience score?

If the experiment passes, generate a summary I can include in our post-mortem document confirming the fix was validated through chaos testing.`,
    expectedOutput:
      'Experiment run result with resilience score, probe outcomes (pass/fail at each check interval), and recovery time. If the experiment passes, a one-paragraph post-mortem summary confirming the fix was validated.',
    resourceTypes: ['chaos_experiment', 'chaos_experiment_run', 'chaos_fault', 'chaos_probe'],
    notes:
      'Be specific about the fault type and health endpoint. The more precise your incident description, the more targeted the experiment will be. If you are reproducing a network issue, use the network-latency prompt in the experiment design folder as a starting point before running this workflow.',
  },
  {
    id: 'production-safeguards',
    category: 'Governance',
    title: 'Production Safeguards with ChaosGuard',
    scenario:
      'You want to allow chaos experiments to run in production, but only under strict conditions - during specific maintenance windows, against a limited number of replicas, with mandatory approvals, and never targeting databases or payment processing pods directly. This prompt sets up ChaosGuard rules that enforce these boundaries automatically.',
    summary:
      'Set up ChaosGuard conditions and rules that automatically block unsafe chaos experiments from running in production.',
    tags: ['governance', 'chaosguard', 'production'],
    useCases: [
      'Define ChaosGuard rules that block unsafe experiments in production.',
      'Flag existing experiments that would violate new safety boundaries.',
    ],
    prompt: `I need to set up ChaosGuard rules to protect our production environment from unsafe chaos experiments.

Here are the rules I want enforced:

1. Time window: experiments in production can only run between [START_TIME] and [END_TIME] on [DAYS - e.g. Tuesday and Thursday].
2. Replica limit: no experiment can target more than [N] replicas at a time in any production namespace.
3. Namespace restriction: experiments must never target pods in the [RESTRICTED_NAMESPACES - e.g. payments-prod, database-prod] namespaces.
4. Approval gate: any experiment tagged as "production" must receive an approval from the [APPROVER_GROUP] user group before execution.
5. Fault blocklist: the following faults must be blocked from running in production: [FAULT_NAMES - e.g. node-drain, container-kill with force=true].

Steps:
1. Create a ChaosGuard condition for each of the five rules above.
2. Combine them into a single ChaosGuard rule named "production-safety-gate" that blocks experiment execution if any condition is violated.
3. List the newly created conditions and rule back to me so I can verify.
4. Check all existing experiments tagged for the production environment and flag any that would be blocked by these new rules.`,
    expectedOutput:
      'A summary of the five created conditions with their configurations. The created rule combining them. A list of existing production experiments flagged for rule violations with specific reasons.',
    resourceTypes: ['chaos_guard_condition', 'chaos_guard_rule', 'chaos_experiment'],
    notes:
      'Fill in all placeholders before running. The time window condition uses UTC by default - specify your timezone explicitly if needed. The fault blocklist uses fault identifiers, not display names. Check your ChaosHub for the correct identifier before adding to the list.',
  },
];
