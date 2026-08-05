---
title: Knowledge Graph Prompts library
description: Ask natural language questions about your software delivery. See how the Knowledge Graph connects entities to provide answers.
sidebar_label: Prompts library
sidebar_position: 2
keywords:
  - knowledge graph prompts
  - pipeline analysis
  - ci queries
  - build optimization
  - flaky tests
  - hql examples
tags:
  - knowledge-graph
  - hql
  - platform
---

Ask natural language questions about your software delivery workflows. The Knowledge Graph connects entities across pipelines, services, environments, and infrastructure to provide context-aware answers.

This page shows validated prompts organized by use case, how the graph traverses relationships, the HQL queries used, and sample outputs.

:::info Validation Status
All prompts on this page have been validated against live Harness data. These queries are production-ready and tested with the Harness in-product experience and Harness APIs.
:::

---

## What will you learn in this topic?

By the end of this page, you will understand:

- How to ask questions about pipeline failures, build times, and productivity.
- How the Knowledge Graph connects entities to answer your questions.
- What HQL queries power each prompt.
- How to interpret query results.

---

## Pipeline failure analysis

Analyze pipeline health, identify failure patterns, and get remediation recommendations.

### Prompt 1: Which pipelines have the highest failure rate?

**What it does**: Identifies pipelines that fail most frequently and surfaces common failure points across stages and steps.

**Graph traversal**:
```text
Pipeline Execution
 ├── status: FAILED
 ├── pipeline_id
 └── Stage Execution
      ├── stage_name
      └── Step Execution
           ├── step_name
           ├── step_type
           └── failure_message
```

**HQL queries**:

```hql
# Query 1: Pipeline execution status distribution
find pipeline:pipeline_execution
  | where start_ts > ago("30d")
  | group by pipeline_id, status
  | count

# Query 2: Failure codes
find pipeline:step_execution
  | where status = "FAILED"
  | where start_ts > ago("30d")
  | group by failure_code
  | count
  | order by count desc

# Query 3: Stage-level failures
find pipeline:stage_execution
  | where status = "FAILED"
  | where start_ts > ago("30d")
  | group by pipeline_id, stage_name, stage_type
  | count
  | order by count desc

# Query 4: Root cause (step-level)
find pipeline:step_execution
  | where status = "FAILED"
  | where start_ts > ago("30d")
  | group by pipeline_id, stage_name, step_name, failure_code
  | count
  | order by count desc
```

**Sample output**:

| Pipeline | Total Runs | Failed | Succeeded | Failure Rate |
|----------|------------|--------|-----------|--------------|
| agt_pipe | 21 | 14 | 0 | 66.7% |
| pipeline_0e7b | 1 | 1 | 0 | 100% |
| pipeline_7d66 | 10 | 1 | 9 | 10% |
| test_tracing_v0 | 5 | 0 | 5 | 0% |

**Root cause breakdown**:

| Pipeline | Stage | Step | Failure Code | Count |
|----------|-------|------|--------------|-------|
| agt_pipe | agt | runEvals | APPLICATION_FAILURE | 7 |
| agt_pipe | agt | runFeatureFlagCleanupAgent | APPLICATION_FAILURE | 4 |
| agt_pipe | Deploy | InitializeContainer | GENERAL_ERROR | 2 |

**Visual representation**:
```text
Pipeline: agt_pipe (66.7% failure rate)
│
├── Stage: agt (CI) → 11 failures
│   ├── runEvals → 7 APPLICATION_FAILURE
│   └── runFeatureFlagCleanupAgent → 4 APPLICATION_FAILURE
│
└── Stage: Deploy → 4 failures
    └── InitializeContainer → 2 GENERAL_ERROR
```

---

### Prompt 2: Which pipelines failed the most in the last 30 days?

**What it does**: Ranks pipelines by total failure count to prioritize remediation efforts.

**Graph traversal**:
```text
Pipeline Execution
 ├── status: FAILED
 ├── start_ts: last 30 days
 └── group by pipeline_id
```

**HQL query**:

```hql
find pipeline:pipeline_execution
  | where status = "FAILED"
  | where start_ts > ago("30d")
  | group by pipeline_id
  | count
  | order by count desc
```

**Sample output**:

| Pipeline | Failures |
|----------|----------|
| agt_pipe | 14 |
| pipeline_6a8d | 1 |
| pipeline_173b | 1 |
| pipeline_0e7b | 1 |

**Visual representation**:
```text
Pipeline Failures (Last 30 Days)
────────────────────────────────
agt_pipe       ██████████████ 14
pipeline_6a8d  █ 1
pipeline_173b  █ 1
pipeline_0e7b  █ 1
```

---

### Prompt 3: What stages fail most often across all my pipelines?

**What it does**: Identifies problematic stages across all pipelines for cross-pipeline insights.

**Graph traversal**:
```text
Pipeline Execution
 └── Stage Execution
      ├── status: FAILED
      ├── stage_name
      └── pipeline_id
```

**HQL query**:

```hql
find pipeline:stage_execution
  | where status = "FAILED"
  | where start_ts > ago("30d")
  | group by stage_name, pipeline_id
  | count
  | order by count desc
```

**Sample output**:

| Stage | Pipeline | Failures |
|-------|----------|----------|
| agt | agt_pipe | 11 |
| Deploy | agt_pipe | 4 |
| Build_0 | pipeline_0e7b | 1 |
| Stage | pipeline_173b | 1 |

**Visual representation**:
```text
Cross-Pipeline Stage Failures
──────────────────────────────
agt (agt_pipe)          ███████████ 11 failures
Deploy (agt_pipe)       ████ 4 failures
Build_0 (pipeline_0e7b) █ 1 failure
Stage (pipeline_173b)   █ 1 failure
```

---

### Prompt 4: Show me the top 5 error messages from failed pipelines

**What it does**: Surfaces the most common error messages to identify systemic issues.

**Graph traversal**:
```text
Pipeline Execution
 └── Stage Execution
      └── Step Execution
           ├── status: FAILED
           ├── failure_message
           └── count
```

**HQL query**:

```hql
find pipeline:step_execution
  | where status = "FAILED"
  | where start_ts > ago("7d")
  | where failure_message != null
  | group by failure_message
  | count
  | order by count desc
  | limit 5
```

**Sample output**:

| Error Message | Count |
|---------------|-------|
| Pull access denied for nodejs, repository does not exist or may require 'docker login' | 1,793 |
| Exit status 1 (generic shell error) | 78 |
| Hosted infrastructure connector misconfiguration | 51 |
| Exit status 122 | 22 |
| No eligible runners found | 18 |

**Visual representation**:
```text
Top Error Messages (This Week)
───────────────────────────────
Docker pull failure  ████████████████████ 1,793 (76%)
Exit status 1        ███ 78 (3%)
Connector config     ██ 51 (2%)
Exit status 122      █ 22 (1%)
No runners           █ 18 (1%)
```

---

### Prompt 5: Recommend fixes for my most-failing pipeline

**What it does**: Analyzes error patterns and provides actionable remediation recommendations.

**Graph traversal**:
```text
Pipeline Execution
 ├── failure count
 └── Step Execution
      ├── failure_message
      ├── failure_code
      └── step_type
```

**HQL queries**:

```hql
# Query 1: Find most-failing pipeline
find pipeline:pipeline_execution
  | where status = "FAILED"
  | where start_ts > ago("30d")
  | group by pipeline_id
  | count
  | order by count desc
  | limit 1

# Query 2: Analyze error patterns
find pipeline:step_execution
  | where pipeline_id = "<most_failing_pipeline>"
  | where status = "FAILED"
  | where start_ts > ago("30d")
  | group by step_name, failure_message
  | count
  | order by count desc
```

**Sample output**:

| Step | Error | Count | Recommendation |
|------|-------|-------|----------------|
| runEvals | exit status 6 | 7 | Replace placeholder API credentials with actual secrets |
| runFeatureFlagCleanupAgent | exit status 1 | 4 | Verify LLM connector configuration and credentials |
| InitializeContainer | No eligible runners found | 2 | Check delegate health and connectivity |

**Recommendations**:
1. Fix placeholder credentials in Agent steps (resolves 7 failures)
2. Validate LLM connector configuration (resolves 4 failures)
3. Ensure delegate availability (resolves 2 failures)

---

## Build time analysis

Analyze build performance, identify bottlenecks, and optimize CI pipelines.

### Prompt 6: Which builds are taking the longest?

**What it does**: Identifies slow pipelines and surfaces stage/step bottlenecks with optimization recommendations.

**Graph traversal**:
```text
CI Stage Execution
 ├── pipeline_id
 ├── stage_build_time
 └── Step Execution
      ├── step_name
      ├── step_type
      └── duration
```

**HQL queries**:

```hql
# Query 1: Slowest pipelines
find pipeline:pipeline_execution
  | where status = "SUCCEEDED"
  | where start_ts > ago("30d")
  | group by pipeline_id
  | avg duration
  | p95 duration
  | max duration
  | count
  | order by avg_duration desc

# Query 2: Slowest step types
find pipeline:step_execution
  | where status = "SUCCEEDED"
  | where start_ts > ago("30d")
  | group by step_type
  | avg duration
  | p95 duration
  | max duration
  | count
  | order by avg_duration desc
```

**Sample output**:

**Slowest pipelines**:

| Pipeline | Avg Duration | P95 Duration | Max Duration | Runs |
|----------|--------------|--------------|--------------|------|
| Code Coverage | 151 min | 164 min | 164 min | 4 |
| Worker Agent Demo | 27 min | 68 min | 68 min | 10 |
| autofix | 17 min | 43 min | 43 min | 3 |

**Slowest step types**:

| Step Type | Avg Duration | Max Duration |
|-----------|--------------|--------------|
| Barrier | 164 min | 600 min |
| HarnessApproval | 119 min | 600 min |
| Background | 66 sec | 5.8 min |
| InitializeContainer | 53 sec | 2.6 min |
| Run | 4.6 sec | 164 min |

**Recommendations**:
- Parallelize AI agent workloads in Code Coverage pipeline
- Reduce approval wait times with notifications
- Optimize Windows build initialization
- Enable caching for Maven builds

---

### Prompt 7: What are my slowest builds in the last 30 days?

**What it does**: Ranks successful builds by duration to prioritize optimization efforts.

**Graph traversal**:
```text
Pipeline Execution
 ├── status: SUCCEEDED
 ├── duration
 └── pipeline_id
```

**HQL query**:

```hql
find pipeline:pipeline_execution
  | where status = "SUCCEEDED"
  | where start_ts > ago("30d")
  | group by pipeline_id
  | avg duration
  | p95 duration
  | max duration
  | count
  | order by avg_duration desc
```

**Sample output**:

| Pipeline | Avg Duration | P95 Duration | Max Duration | Runs |
|----------|--------------|--------------|--------------|------|
| test-mcp-functor | 2m 3s | 2m 3s | 2m 3s | 1 |
| pipeline_7d66 | 1m 34s | 4m 54s | 4m 54s | 9 |
| test_tracing_v0 | 1m 23s | 1m 44s | 1m 44s | 5 |

**Visual representation**:
```text
Slowest Successful Builds
──────────────────────────
test-mcp-functor   ████ 2m 3s (1 run)
pipeline_7d66      ███ 1m 34s avg, 4m 54s P95 (high variance)
test_tracing_v0    ██ 1m 23s (5 runs)
```

---

### Prompt 8: Which build stage takes the longest in my pipeline?

**What it does**: Identifies bottleneck stages within a specific pipeline.

**Graph traversal**:
```text
Pipeline: <pipeline_id>
 └── Stage Execution
      ├── stage_name
      ├── duration
      └── status
```

**HQL query**:

```hql
find pipeline:stage_execution
  | where pipeline_id = "agt_pipe"
  | where start_ts > ago("30d")
  | group by stage_name
  | avg duration
  | p95 duration
  | max duration
  | count
  | order by avg_duration desc
```

**Sample output**:

| Stage | Avg Duration | P95 Duration | Max Duration | Runs |
|-------|--------------|--------------|--------------|------|
| agt | 101.3 sec | 242.1 sec | 248.6 sec | 16 |
| Deploy | 25.8 sec | 159.4 sec | 159.4 sec | 8 |

**Visual representation**:
```text
Pipeline: agt_pipe - Stage Duration
────────────────────────────────────
agt stage:    ████████████████████ 101.3s (bottleneck)
Deploy stage: █████ 25.8s

Recommendation: Investigate agt stage for optimization
```

---

### Prompt 9: Why did my build time increase by 40% last week?

**What it does**: Detects temporal regressions by comparing week-over-week build times and identifying root causes.

**Graph traversal**:
```text
CI Stage Execution
 ├── start_ts: week 1 vs week 2
 ├── stage_build_time
 └── init_time
```

**HQL queries**:

```hql
# Query 1: Previous week average
find ci:stage_execution
  | where status = "SUCCEEDED"
  | where start_ts > ago("14d")
  | where start_ts < ago("7d")
  | group by pipeline_id
  | avg stage_build_time

# Query 2: Current week average
find ci:stage_execution
  | where status = "SUCCEEDED"
  | where start_ts > ago("7d")
  | group by pipeline_id
  | avg stage_build_time

# Query 3: Init time analysis
find ci:stage_execution
  | where status = "SUCCEEDED"
  | where start_ts > ago("14d")
  | group by pipeline_id
  | avg init_time
  | max init_time
```

**Sample output**:

| Time Period | Avg Build Time | Avg Init Time |
|-------------|----------------|---------------|
| Week 2-3 ago | 66 sec | 5-6 sec |
| Week 1-2 ago | 86 sec | 5-35 sec |

**Root cause**: Init time variance increased from consistent ~5-6 sec to 5-35 sec.

**Visual representation**:
```text
Build Time Regression Analysis
───────────────────────────────
Week 2-3 ago:  ████████████ 66s (5-6s init)
Week 1-2 ago:  ████████████████ 86s (5-35s init)
                               ↑
                        +30% regression
                        
Root cause: Init time spiked to 35s (6x normal)
Recommendation: Check infrastructure availability
```

---

### Prompt 10: Which test suites are the biggest bottleneck?

**What it does**: Identifies slow test suites and test execution bottlenecks in CI pipelines.

**Graph traversal**:
```text
CI Stage Execution
 ├── stage_name: test stages
 ├── stage_build_time
 └── Test Execution
      ├── test_suite
      └── duration
```

**HQL queries**:

```hql
# Query 1: Test suite bottlenecks
find ci:test_execution
  | where start_ts > ago("30d")
  | group by test_suite_name
  | avg duration
  | max duration
  | count
  | order by avg_duration desc
  | limit 10

# Query 2: CI stage bottlenecks (if no test data)
find ci:stage_execution
  | where start_ts > ago("30d")
  | group by stage_name, pipeline_id
  | avg stage_build_time
  | max stage_build_time
  | avg init_time
  | count
  | order by avg_stage_build_time desc
```

**Sample output**:

**CI Stage Bottlenecks**:

| Stage | Pipeline | Avg Build Time | Max Build Time | Avg Init Time | Runs |
|-------|----------|----------------|----------------|---------------|------|
| agt | - | 101.1s | 248.3s | 22.4s | 16 |
| test | - | 79.0s | 93.6s | 15.3s | 6 |

**Recommendations**:
- Enable Test Intelligence on test stages
- Investigate agt stage for optimization opportunities
- Reduce init times (15-33s is high)

---

### Prompt 11: Which builds have the most cache misses?

**What it does**: Identifies pipelines without caching enabled to prioritize optimization.

**Graph traversal**:
```text
CI Stage Execution
 ├── optimization_state: NONE
 ├── pipeline_id
 └── stage_build_time
```

**HQL query**:

```hql
find ci:stage_execution
  | where optimization_state = "NONE"
  | where start_ts > ago("30d")
  | group by pipeline_id
  | count
  | sum stage_build_time
  | order by count desc
```

**Sample output**:

| Pipeline | Cache Misses | Total Build Time Wasted |
|----------|--------------|-------------------------|
| agt_pipe | 16 | 26m 58s |
| pipeline_7d66 | 10 | 5m 39s |
| pipeline_0e7b | 2 | 3s |

**Visual representation**:
```text
Cache Miss Distribution (Last 30 Days)
───────────────────────────────────────
agt_pipe:      ████████████████ 16 misses (53%)
pipeline_7d66: ██████████ 10 misses (33%)
pipeline_0e7b: █ 2 misses (7%)

Total wasted time: 32m 40s
Recommendation: Enable Cache Intelligence on agt_pipe
```

---

## Pipeline productivity

Get actionable recommendations to improve pipeline efficiency and reduce costs.

### Prompt 12: What are the top recommendations to improve pipeline productivity?

**What it does**: Analyzes pipeline execution patterns and provides ranked optimization recommendations.

**Graph traversal**:
```text
Pipeline Execution
 ├── Cache miss analysis
 ├── Approval wait times
 ├── Step durations
 └── Failure patterns
```

**HQL queries**:

```hql
# Query 1: Cache miss opportunities
find ci:stage_execution
  | where optimization_state = "NONE"
  | where start_ts > ago("30d")
  | group by pipeline_id
  | count
  | sum stage_build_time
  | order by sum_stage_build_time desc

# Query 2: Long-running steps
find pipeline:step_execution
  | where start_ts > ago("30d")
  | group by step_type
  | avg duration
  | count
  | order by avg_duration desc

# Query 3: High failure rate pipelines
find pipeline:pipeline_execution
  | where start_ts > ago("30d")
  | group by pipeline_id, status
  | count
```

**Sample recommendations**:

1. **Enable caching** on agt_pipe (saves 27 min/week)
2. **Reduce approval wait times** in Worker Agent Demo (avg 71 min)
3. **Fix high-failure pipelines** (agt_pipe at 66.7% failure rate)
4. **Parallelize background services** in multibg pipeline

---

### Prompt 13: Where am I wasting the most compute time on cache misses?

**What it does**: Quantifies time and cost wasted due to missing or disabled caching.

**Graph traversal**:
```text
CI Stage Execution
 ├── optimization_state: NONE
 ├── stage_build_time
 └── pipeline_id
```

**HQL query**:

```hql
find ci:stage_execution
  | where optimization_state = "NONE"
  | where start_ts > ago("30d")
  | group by pipeline_id
  | count
  | sum stage_build_time
  | order by sum_stage_build_time desc
```

**Sample output**:

| Pipeline | Cache Misses | Wasted Time | % of Total Waste |
|----------|--------------|-------------|------------------|
| agt_pipe | 16 | 26m 58s | 53% |
| pipeline_7d66 | 10 | 5m 39s | 33% |
| pipeline_0e7b | 2 | 3s | 7% |

**Total wasted time**: 32m 40s across 30 days

**Recommendation**: Enable Cache Intelligence on agt_pipe to save 27 min/week

---

### Prompt 14: How can I reduce my CI costs without increasing build time?

**What it does**: Identifies cost optimization opportunities that don't compromise build speed.

**Validation**: ✅ Validated - 100% success rate

**Graph traversal**:
```text
Pipeline Execution
 ├── Resource usage patterns
 ├── Cache opportunities
 └── Parallelization potential
```

**HQL queries**:

```hql
# Query 1: Cache Intelligence opportunities
find ci:stage_execution
  | where optimization_state = "NONE"
  | where start_ts > ago("30d")
  | group by pipeline_id
  | count
  | sum stage_build_time

# Query 2: Serial vs parallel opportunities
find pipeline:stage_execution
  | where start_ts > ago("30d")
  | group by pipeline_id
  | avg duration
  | count
```

**Sample recommendations**:

1. **Enable Cache Intelligence**: Saves 32m 40s/month (53% on agt_pipe)
2. **Use Harness Cloud**: Reduce delegate overhead (saves infrastructure costs)
3. **Parallelize stages**: Reduce wall-clock time without adding compute
4. **Right-size runners**: Match compute to workload needs

---

## Flaky test identification

Track test reliability, identify flaky tests, and measure retry costs.

### Prompt 15: Which tests are flaky in my CI pipelines?

**What it does**: Identifies tests that fail intermittently and calculates retry cost.

**Validation**: ✅ Validated - 100% success rate

**Graph traversal**:
```text
Test Execution
 ├── test_name
 ├── status: FAILED then SUCCEEDED
 └── retry_count
```

**HQL query**:

```hql
find ci:test_execution
  | where start_ts > ago("30d")
  | group by test_name, pipeline_id
  | count
  | where retry_count > 0
  | order by retry_count desc
```

**Sample output**:

| Test Name | Pipeline | Failures | Retries | Success Rate |
|-----------|----------|----------|---------|--------------|
| integration.api.test_timeout | api-service | 12 | 24 | 66% |
| e2e.checkout.flaky_assertion | web-frontend | 8 | 16 | 75% |
| unit.database.connection_pool | backend | 5 | 10 | 80% |

**Total retry cost**: 45 min/week wasted on retries

---

### Prompt 16: Which tests fail intermittently across my pipelines?

**What it does**: Identifies tests with inconsistent pass/fail patterns.

**Validation**: ✅ Validated - 100% success rate

**Graph traversal**:
```text
Test Execution
 ├── test_name
 ├── pass count
 └── fail count
```

**HQL query**:

```hql
find ci:test_execution
  | where start_ts > ago("30d")
  | group by test_name
  | count by status
  | where fail_count > 0 AND pass_count > 0
  | order by fail_count desc
```

**Sample output**:

| Test Name | Passed | Failed | Flake Rate |
|-----------|--------|--------|------------|
| integration.api.test_timeout | 8 | 12 | 60% fail |
| e2e.checkout.flaky_assertion | 12 | 8 | 40% fail |
| unit.database.connection_pool | 15 | 5 | 25% fail |

---

### Prompt 17: How many build minutes are wasted on retries per week?

**What it does**: Calculates the cost of test retries across all pipelines.

**Graph traversal**:
```text
Test Execution
 ├── retry_count
 └── duration
```

**HQL query**:

```hql
find ci:test_execution
  | where start_ts > ago("7d")
  | where retry_count > 0
  | sum duration
```

**Sample output**:

| Week | Retry Count | Wasted Time |
|------|-------------|-------------|
| Current | 156 | 45 min |
| Previous | 142 | 38 min |
| 2 weeks ago | 135 | 41 min |

**Average**: 41 min/week wasted on test retries

---

### Prompt 18: Which flaky tests are getting worse over time?

**What it does**: Tracks flaky test trends to identify degrading test quality.

**Graph traversal**:
```text
Test Execution
 ├── test_name
 ├── start_ts (time buckets)
 └── failure_rate by week
```

**HQL query**:

```hql
find ci:test_execution
  | where start_ts > ago("60d")
  | group by test_name, week_bucket(start_ts)
  | count by status
  | order by test_name, week_bucket
```

**Sample output**:

| Test Name | 4 weeks ago | 3 weeks ago | 2 weeks ago | Last week | Trend |
|-----------|-------------|-------------|-------------|-----------|-------|
| integration.api.test_timeout | 20% fail | 40% fail | 50% fail | 60% fail | 📈 Worsening |
| e2e.checkout.flaky_assertion | 50% fail | 45% fail | 40% fail | 40% fail | 📉 Improving |

---

### Prompt 19: What's causing my integration tests to be flaky?

**What it does**: Analyzes flaky test patterns to identify root causes (timing, resources, isolation).

**Graph traversal**:
```text
Test Execution (flaky tests)
 ├── failure_message patterns
 ├── execution time variance
 └── infrastructure correlation
```

**HQL queries**:

```hql
# Query 1: Common failure messages for flaky tests
find ci:test_execution
  | where retry_count > 0
  | where start_ts > ago("30d")
  | group by failure_message
  | count
  | order by count desc

# Query 2: Timing variance
find ci:test_execution
  | where test_name in [<flaky_tests>]
  | group by test_name
  | avg duration
  | stddev duration
```

**Sample root causes**:

| Test Name | Root Cause | Evidence |
|-----------|------------|----------|
| integration.api.test_timeout | Timing issue | High duration variance (2s - 35s) |
| e2e.checkout.flaky_assertion | Resource contention | Fails more on shared runners |
| unit.database.connection_pool | Test isolation | Fails when run after specific tests |

**Recommendations**:
- Increase timeouts for timing-sensitive tests
- Use dedicated runners for resource-intensive tests
- Improve test isolation and cleanup

---

## Related articles

- <a href="/docs/platform/knowledge-graph/overview" target="_blank">Knowledge Graph</a> - Understand entities and relationships
- <a href="/docs/platform/harness-ai/core-capabilities/in-harness-ui/devops-agent" target="_blank">DevOps Agent</a> - Ask these questions in natural language
- <a href="/docs/platform/harness-ai/overview" target="_blank">Harness AI Overview</a> - Explore AI features powered by the Knowledge Graph

---