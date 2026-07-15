---
title: Harness Query Language (HQL) Reference
sidebar_label: HQL Reference
description: Complete reference for Harness Query Language (HQL), a domain-specific language for querying events, entities, metrics, and views across the Harness Data Platform.
sidebar_position: 2
---

HQL is a domain-specific query language for querying heterogeneous data sources in the Harness Data Platform. It provides a unified interface for querying events, entities, metrics, and views across multiple database backends (StarRocks, AlloyDB, BigQuery, PostgreSQL, MySQL) with pipe-based operations and automatic SQL generation.

---

## Data sources

HQL supports four types of data sources. Type identifiers can be unquoted for simple names or quoted for names with special characters (like colons).

| Source Type | Description | Examples |
|---|---|---|
| `event` | Time-series and log data | Spans, logs, cost events, clickstream |
| `entity` | Business objects and transactional data | Pipeline executions, artifacts, API entities |
| `metric` | Aggregated and analytical data | Aggregated cost metrics, performance metrics |
| `view` | Virtual tables that expand to CTEs at query time | Custom views like `successful_pipelines` |

```sql
-- Unquoted identifier
find event span

-- Quoted identifier with special characters
find event "ccm:unified_table"

-- Entity type
find entity "pipeline:pipeline_execution"

-- Metric type
find metric "ccm:cost_metrics"
```

### Table aliases

Assign aliases to data sources for use in joins and field references.

```sql
find entity "pipeline:pipeline_execution" p
| filter p.status = "FAILED"

find event "ccm:unified_table" t
| select { t.region, sum(t.cost) as total }
| group_by t.region
```

---

## Operations

Operations are chained using the pipe (`|`) operator. Each operation transforms the result of the previous one.

### Filter

Filters rows based on conditions. Supports equality, comparison, pattern matching, membership, string containment, and null checks.

```sql
-- Basic equality
find event "ccm:unified_table"
| filter region = "us-east-1"

-- Date range
find entity "pipeline:pipeline_execution"
| filter start_time >= ago(30d)

-- OR conditions
find event span
| filter span_kind = "internal" or span_kind = "server"

-- IN operator
find entity artifact
| filter tag in ["v1.0", "v1.1", "v2.0"]

-- NULL checks
find entity api
| filter description is not null

-- String contains
find event logs
| filter message contains "error"

-- Comparison with AND
find event "ccm:unified_table"
| filter cost > 100 and region = "us-west-1"
```

| Operator | Description |
|---|---|
| `=`, `!=` | Equality / Inequality |
| `>`, `>=`, `<`, `<=` | Comparison |
| `=~` | Pattern matching (regex) |
| `in`, `!in` | Membership |
| `contains`, `!contains` | String containment |
| `is null`, `is not null` | Null checks |
| `is empty`, `is not empty` | Empty checks |
| `and`, `or` | Logical operators (`and` has higher precedence) |

### Select

Selects specific fields or expressions. Use `->` for nested field access.

```sql
find entity "pipeline:pipeline_execution"
| select { pipeline_id, status, start_time }

-- With expressions and aliases
find event "ccm:unified_table"
| select {
    region,
    sum(cost) as total_cost,
    count() as record_count
  }

-- Nested field access
find entity event e
| select { e.tags->env, e.user->profile->name }
```

### Group by

Groups rows by specified expressions. All non-aggregated fields in `select` must be included in `group_by`.

```sql
find event "ccm:unified_table"
| select { region, cloudProvider, sum(cost) as total_cost }
| group_by region, cloudProvider
```

### Aggregate

Performs second-order aggregations (aggregations on already aggregated data).

```sql
find entity "pipeline:pipeline_execution"
| select { status, count() as count }
| group_by status
| aggregate { sum(count) as total }
```

### Order by, limit, offset, distinct

```sql
find entity "pipeline:pipeline_execution"
| filter start_time >= ago(7d)
| select { pipeline_id, status, start_time }
| order_by start_time desc
| limit 100
| offset 20

-- Distinct values
find event span
| select distinct { service_name }
| order_by service_name asc
```

---

## Functions

### Aggregation functions

| Function | Description |
|---|---|
| `count()` | Count of rows |
| `count(expr)` | Count of non-null values |
| `sum(expr)` | Sum of values |
| `avg(expr)` | Average of values |
| `min(expr)` | Minimum value |
| `max(expr)` | Maximum value |
| `approx_count_distinct(expr)` | Approximate distinct count |

### String functions

| Function | Description |
|---|---|
| `lower(str)` | Convert to lowercase |
| `upper(str)` | Convert to uppercase |
| `trim(str)` | Remove leading/trailing whitespace |
| `concat(a, b, ...)` | Concatenate strings |
| `substr(str, start, len)` | Substring extraction |
| `length(str)` | String length |
| `replace(str, from, to)` | Replace occurrences |

### Math functions

| Function | Description |
|---|---|
| `abs(n)` | Absolute value |
| `round(n, d)` | Round to `d` decimal places |
| `floor(n)` | Round down |
| `ceil(n)` | Round up |
| `mod(n, m)` | Modulo |
| `sqrt(n)` | Square root |
| `pow(n, e)` | Raise to power |

### Time functions

| Function | Description |
|---|---|
| `now()` | Current timestamp |
| `ago(duration)` | Timestamp relative to now (e.g., `ago(30d)`, `ago(1h)`) |
| `date_trunc(unit, ts)` | Truncate timestamp to unit (`'day'`, `'hour'`, `'week'`, `'month'`) |
| `date_diff(unit, a, b)` | Difference between two timestamps |
| `to_timestamp(expr)` | Cast to timestamp |
| `extract(field from ts)` | Extract field from timestamp (year, month, day, etc.) |

```sql
find event "ccm:unified_table"
| filter startTime >= ago(30d)
| select {
    date_trunc('day', startTime) as day,
    sum(cost) as daily_cost
  }
| group_by date_trunc('day', startTime)
```

### Conditional expressions (CASE WHEN)

```sql
find entity "pipeline:pipeline_execution"
| select {
    pipeline_id,
    case
      when status = "SUCCESS" then "passed"
      when status = "FAILED"  then "failed"
      else "other"
    end as result
  }

-- Inline conditional aggregation
find entity "pipeline:pipeline_execution"
| filter start_time >= ago(30d)
| select {
    pipeline_id,
    count() as total,
    sum(case when is_successful = true then 1 else 0 end) as successes,
    case
      when count() > 0
        then (sum(case when is_successful = true then 1 else 0 end) * 100.0 / count())
      else 0
    end as success_rate
  }
| group_by pipeline_id
```

### Cast and interval expressions

```sql
-- Cast
find event "ccm:unified_table"
| select { cast(cost as double) as cost_float }

-- Interval arithmetic
find entity "pipeline:pipeline_execution"
| filter start_time >= now() - interval '7' day
```

---

## Common table expressions (CTEs)

CTEs let you define named subqueries that can be referenced in the main query. They are useful for breaking down complex queries, reusing subqueries, and improving readability. CTEs cannot be nested (no CTEs inside CTE definitions).

```sql
with high_duration_spans as (
  find event span
  | filter duration > 1000
),
error_logs as (
  find event log l
  | filter l.level = "ERROR"
)
find high_duration_spans
| select { id, duration }
```

```sql
-- CTE with full operations
with recent_failures as (
  find entity "pipeline:pipeline_execution"
  | filter is_failed = true
  | filter start_time >= ago(7d)
  | select { pipeline_id, error_message }
  | order_by start_time desc
  | limit 100
)
find recent_failures
| select { pipeline_id, count() as failure_count }
| group_by pipeline_id
```

---

## Joins

HQL supports joining CTEs or direct data sources with `inner` (default), `left`, `right`, and `full` join types.

```sql
with recent_pipelines as (
  find entity "pipeline:pipeline_execution"
  | filter start_time >= ago(30d)
)
find entity artifact a
| left join recent_pipelines rp on a.pipeline_id = rp.pipeline_id
| select { a.id, rp.status }

-- Multiple join conditions
find entity "pipeline:pipeline_execution" p
| join entity artifact a on p.artifact_id = a.id and p.account_id = a.account_id
| select { p.pipeline_id, a.tag }

-- Complex join with multiple CTEs
with pipeline_exec as (
  find entity "pipeline:pipeline_execution" pes
  | filter pes.is_deleted = false
  | filter pes.start_time >= ago(30d)
),
artifact_scans as (
  find entity "sto:scan" s
  | filter s.status = "ACTIVE"
)
find pipeline_exec
| join artifact_scans on pipeline_exec.pipeline_id = artifact_scans.pipeline_id
| select {
    pipeline_exec.pipeline_id,
    pipeline_exec.status,
    artifact_scans.scan_id,
    artifact_scans.scan_type
  }
| order_by pipeline_exec.start_time desc
```

---

## Examples

### Cost analysis by region

```sql
find event "ccm:unified_table"
| filter startTime >= ago(30d)
| select {
    region,
    cloudProvider,
    sum(awsBlendedCost) as total_cost,
    count() as record_count
  }
| group_by region, cloudProvider
| order_by total_cost desc
| limit 20
```

### Pipeline execution statistics

```sql
find entity "pipeline:pipeline_execution"
| filter start_time >= ago(30d)
| select {
    date_trunc('day', start_time) as day,
    status,
    count() as execution_count,
    count(case when is_successful = true then 1 end) as successful_count
  }
| group_by date_trunc('day', start_time), status
| order_by day desc, execution_count desc
```

### Top API endpoints by latency

```sql
find event span
| filter span_kind = "server"
| filter startTime >= ago(24h)
| select {
    name as endpoint,
    avg(duration) as avg_latency_ms,
    max(duration) as max_latency_ms,
    count() as request_count
  }
| group_by name
| order_by avg_latency_ms desc
| limit 20
```

### Conditional aggregation (success rate)

```sql
find entity "pipeline:pipeline_execution"
| filter start_time >= ago(30d)
| select {
    pipeline_id,
    count() as total,
    case
      when count() > 0
        then (sum(is_successful) * 100.0 / count())
      else 0
    end as success_rate
  }
| group_by pipeline_id
| order_by success_rate asc
```

### Nested field access

```sql
find entity event e
| select {
    e.tags->env,
    e.metadata->labels->app,
    e.user->profile->name
  }
| filter e.metadata->tags->env = "production"
| limit 100
```

### Time-series analysis

```sql
find event "ccm:unified_table"
| filter startTime >= ago(90d)
| select {
    date_trunc('week', startTime) as week,
    cloudProvider,
    sum(awsBlendedCost) as weekly_cost,
    avg(awsBlendedCost) as avg_daily_cost
  }
| group_by date_trunc('week', startTime), cloudProvider
| order_by week desc, weekly_cost desc
```

### Error rate with CTEs

```sql
with error_events as (
  find event logs
  | filter level = "ERROR"
  | filter timestamp >= ago(24h)
),
all_events as (
  find event logs
  | filter timestamp >= ago(24h)
)
find error_events
| select {
    date_trunc('hour', timestamp) as hour,
    count() as error_count
  }
| group_by date_trunc('hour', timestamp)
| order_by hour desc
```

---

## Best practices

### 1. Use aliases for clarity

```sql
-- Good: aliased source makes join references unambiguous
find entity "pipeline:pipeline_execution" p
| join entity artifact a on p.artifact_id = a.id
| select { p.pipeline_id, a.tag, p.status }
```

### 2. Filter early

Apply filters as early as possible to reduce data processing.

```sql
-- More efficient — filter before aggregation
find event "ccm:unified_table"
| filter startTime >= ago(30d)
| select { region, sum(cost) }
| group_by region

-- Less efficient — filter after aggregation
find event "ccm:unified_table"
| select { region, sum(cost) }
| group_by region
| filter sum(cost) > 1000
```

### 3. Use CTEs for complex queries

```sql
with recent_failures as (
  find entity "pipeline:pipeline_execution"
  | filter is_failed = true
  | filter start_time >= ago(7d)
),
failure_summary as (
  find recent_failures
  | select { pipeline_id, count() as count }
  | group_by pipeline_id
)
find failure_summary
| order_by count desc
| limit 10
```

### 4. Group by all non-aggregated fields

All fields in `select` that are not wrapped in an aggregation function must appear in `group_by`.

```sql
-- Correct
find event "ccm:unified_table"
| select { region, cloudProvider, sum(cost) as total }
| group_by region, cloudProvider

-- Incorrect — cloudProvider missing from group_by
find event "ccm:unified_table"
| select { region, cloudProvider, sum(cost) as total }
| group_by region
```

### 5. Quote type identifiers with special characters

```sql
-- Unquoted (simple names only)
find event span

-- Quoted (required when name contains colons or spaces)
find entity "ccm:unified_table"
find entity "pipeline:pipeline_execution"
```

### 6. Always limit result sets

Use `limit` for queries that might return large result sets to avoid performance issues.

```sql
find entity "pipeline:pipeline_execution"
| filter start_time >= ago(7d)
| order_by start_time desc
| limit 500
```

---

## Reference

### Operation precedence

Operations are applied in the order they appear in the query.

| Order | Operation |
|---|---|
| 1 | `find` (data source) |
| 2 | `filter` |
| 3 | `select` |
| 4 | `group_by` |
| 5 | `aggregate` |
| 6 | `order_by` |
| 7 | `limit` / `offset` |

### Expression precedence

| Priority | Operator |
|---|---|
| 1 (highest) | Parentheses `()` |
| 2 | Multiplicative `*` `/` `%` |
| 3 | Additive `+` `-` |
| 4 | Comparison `=` `!=` `>` `>=` `<` `<=` |
| 5 | Logical `AND` |
| 6 (lowest) | Logical `OR` |

### Data type mapping

| HQL Type | PostgreSQL | StarRocks |
|---|---|---|
| `string` | `VARCHAR` / `TEXT` | `VARCHAR` |
| `int` | `INTEGER` | `INT` |
| `long` | `BIGINT` | `BIGINT` |
| `double` | `DOUBLE PRECISION` | `DOUBLE` |
| `bool` | `BOOLEAN` | `BOOLEAN` |
| `timestamp` | `TIMESTAMP` | `DATETIME` |

### Reserved keywords

The following keywords are reserved but can be used as field names in qualified references (e.g., `alias.select`).

`find`, `filter`, `select`, `group_by`, `aggregate`, `order_by`, `limit`, `offset`, `distinct`, `join`, `left`, `right`, `inner`, `full`, `on`, `with`, `as`, `and`, `or`, `not`, `in`, `is`, `null`, `true`, `false`, `case`, `when`, `then`, `else`, `end`, `cast`, `asc`, `desc`, `contains`, `by`

:::info SQL Dialect Translation
HQL queries are automatically translated to the appropriate SQL dialect based on the data source: **StarRocks** (MySQL-compatible), **AlloyDB** (PostgreSQL-compatible), **PostgreSQL**, **BigQuery**, and **MySQL**. The query engine selects the correct dialect automatically.
:::