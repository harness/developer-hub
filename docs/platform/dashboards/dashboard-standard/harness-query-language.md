---
title: Harness Query Language (HQL)
description: Write queries to retrieve, filter, and summarize data from Harness dashboards using HQL, a structured query language designed for the Harness platform.
sidebar_position: 5
keywords:
  - HQL
  - query language
  - Harness Data Platform
  - events
  - entities
  - metrics
  - views
  - dashboards
tags:
  - platform
  - data
  - query
  - dashboards
---

Harness Query Language (HQL) is the query language you use to retrieve and analyze data in Harness Dashboards. It lets you pull information from different parts of the Harness platform, such as cloud cost records, pipeline executions, artifacts, and logs, and display the results in dashboard widgets.

HQL uses a readable, structured syntax that resembles SQL. You write a query that specifies what data to retrieve, how to filter it, and how to present it. Harness then translates your HQL query into optimized database queries behind the scenes, so you do not need to know which database stores the data or how to connect to it.

If you have used SQL before, HQL will feel familiar. If you have not, this guide walks you through every part of the language with examples.

## Key features

- **Single language for all data:** Query cloud cost data, pipeline executions, artifacts, logs, and more without switching tools or languages.
- **Pipe-based operations:** Build queries step by step. Each step transforms the output of the previous one, connected by the pipe (`|`) character.
- **Automatic translation:** HQL converts your queries to the correct database format automatically. You do not need to know the underlying database.
- **Built-in functions:** Use ready-made functions for counting, summing, averaging, working with dates, and manipulating text.
- **Reusable query blocks:** Break complex queries into named blocks (called CTEs) that you can reference later in the same query.

## Understand the query structure

Every HQL query follows this pattern:

```
find [source type] "[data name]" | [operation] | [operation] | ...
```

The query has three parts:

1. **`find` statement:** Tells Harness what data to retrieve.
2. **Data source:** Specifies the type and name of the data.
3. **Operations:** One or more steps that filter, reshape, or sort the results. Each operation is separated by a pipe (`|`).

Here is the simplest possible query. It retrieves all records from a cloud cost data source:

```hql
find event "ccm:unified_table"
```

Here is a more complete query that filters, groups, sorts, and limits the results:

```hql
find event "ccm:unified_table"
| filter cost > 100
| select { region, sum(cost) as total_cost }
| group_by region
| order_by total_cost desc
| limit 10
```

This query does the following:

1. Retrieves records from the `ccm:unified_table` cloud cost data source.
2. Keeps only records where the cost is greater than 100.
3. Picks the `region` field and calculates the total cost per region.
4. Groups the results by region.
5. Sorts the results so the highest cost appears first.
6. Returns only the top 10 results.

### Add comments to queries

Use `//` to add notes within a query. Comments are for humans and do not affect the query results.

```hql
find event "logs"
| filter level = "ERROR"  // Keep only error-level logs
| limit 100
```

## Data sources

HQL can query four types of data. Each type represents a different category of information stored in Harness.

| Source type | What it contains | When to use it |
|-------------|-----------------|----------------|
| `event` | Time-based records such as log entries, request traces, or cloud cost line items | Query logs, cost records, or any data that is recorded over time |
| `entity` | Business objects such as pipeline executions, artifacts, or security scans | Query specific objects managed by Harness modules |
| `metric` | Pre-calculated summary data such as aggregated costs or performance scores | Query data that has already been summarized |
| `view` | Saved query definitions that act as virtual tables | Reference a previously defined query by name |

### Write a find statement

Specify the source type followed by the data name:

```hql
find event "ccm:unified_table"
find event span
find entity "pipeline:pipeline_execution"
find entity artifact
find entity "sto:scan"
find metric "ccm:aggregated_cost"
find view "successful_pipelines"
```

When the data name contains special characters like a colon (`:`), wrap it in quotes. Simple names like `span` or `artifact` do not need quotes.

### Assign an alias to a data source

An alias is a short name you assign to a data source. Aliases are useful when your query references multiple data sources (for example, in a join), because they let you specify which source a field belongs to.

```hql
find event "ccm:unified_table" ct
| select { ct.cloudProvider, ct.cost }
```

In this example, `ct` is the alias. You use `ct.cloudProvider` and `ct.cost` to make clear that these fields come from the `ccm:unified_table` data source.

## Operations

Operations transform query results step by step. You chain them together with the pipe (`|`) character. Each operation takes the output of the previous one as its input.

Operations run in this order, regardless of how you write them:

1. `filter` (narrow down records)
2. `select` (choose which fields to return)
3. `group_by` (group records together)
4. `order_by` (sort the results)
5. `limit` / `offset` (control how many results to return)

### Filter records

Use `filter` to keep only the records that match your conditions. Records that do not match are excluded from the results.

**Syntax:** `filter condition`

**Available comparison operators:**

| Operator | Meaning | Example |
|----------|---------|---------|
| `=` | Equals | `filter status = "SUCCESS"` |
| `!=` | Does not equal | `filter status != "FAILED"` |
| `>`, `>=`, `<`, `<=` | Greater than, greater than or equal, less than, less than or equal | `filter cost > 100` |
| `=~` | Matches a regular expression pattern | `filter name =~ "prod-.*"` |
| `in` | Matches any value in a list | `filter tag in ["v1.0", "v1.1"]` |
| `!in` | Does not match any value in a list | `filter status !in ["SKIPPED", "IGNORED"]` |
| `contains` | Contains the specified text | `filter message contains "error"` |
| `!contains` | Does not contain the specified text | `filter message !contains "debug"` |
| `is null` | Field has no value | `filter end_time is null` |
| `is not null` | Field has a value | `filter start_time is not null` |
| `is empty` | Field is empty | `filter description is empty` |
| `is not empty` | Field is not empty | `filter name is not empty` |

Combine multiple conditions with `and` or `or`:

```hql
find entity "pipeline:pipeline_execution"
| filter status = "SUCCESS"
| filter is_failed = true and start_time >= ago(30d)
```

You can write multiple `filter` lines. Each one further narrows the results.

### Select fields

Use `select` to choose which fields appear in the results. You can also create calculated fields using functions.

**Syntax:** `select { field1, field2, ... }` or `select { * }` (to return all fields)

```hql
find entity "pipeline:pipeline_execution"
| select { pipeline_id, status, start_time }
```

Create calculated fields with the `as` keyword to give them a name:

```hql
find event "ccm:unified_table"
| select { cloudProvider, sum(cost) as total_cost, count() as record_count }
```

Access nested fields with the `->` operator. This is useful when data is stored in a structured format with fields inside other fields:

```hql
find event logs
| select { id, metadata->tags->env, user->profile->name }
```

### Group results

Use `group_by` to combine records that share the same value in one or more fields. Grouping is required when you use summary functions like `sum()` or `count()` in your `select`.

**Syntax:** `group_by field1, field2, ...`

```hql
find event "ccm:unified_table"
| select { region, sum(cost) as total_cost }
| group_by region
```

This query calculates the total cost for each region. Records with the same `region` value are combined into a single row.

:::info
Every field in your `select` that is not inside a summary function (like `sum`, `count`, or `avg`) must also appear in `group_by`.
:::

### Run a second round of summarization

Use `aggregate` to summarize data that has already been summarized. This is useful when you want an overall total or average after an initial grouping.

```hql
find event "api_requests"
| select { endpoint, count() as cnt }
| group_by endpoint
| aggregate { sum(cnt) as total_requests, avg(cnt) as avg_per_endpoint }
```

This query first counts requests per endpoint, then calculates the total and average across all endpoints.

### Sort results

Use `order_by` to control the order of results. Add `asc` for lowest-to-highest or `desc` for highest-to-lowest.

**Syntax:** `order_by field [asc | desc]`

```hql
find event "ccm:unified_table"
| select { region, sum(cost) as total_cost }
| group_by region
| order_by total_cost desc
```

### Limit and skip results

Use `limit` to control how many records to return. Use `offset` to skip a number of records before returning results. Together, these let you page through large result sets.

```hql
find entity "pipeline:pipeline_execution"
| filter status = "FAILED"
| order_by start_time desc
| offset 0
| limit 50
```

This query returns the first 50 failed pipeline executions, sorted by most recent.

### Remove duplicate rows

Use `distinct` to remove duplicate rows from the results.

```hql
find entity artifact
| select { registry }
| distinct
```

### Combine results from two queries

:::caution
The `union` operation is not fully available in SQL generation yet. This feature is still under development.
:::

## Expressions and functions

HQL includes built-in functions and operators for working with numbers, text, dates, and conditional logic.

### Field references

Reference a field directly by name, or use the alias prefix when working with multiple data sources:

| Format | Example | When to use |
|--------|---------|-------------|
| Field name | `cost` | Single data source queries |
| Alias.field | `ct.cost` | Queries with multiple data sources or joins |
| Nested field | `metadata->tags->env` | Data stored in a structured, nested format |
| Alias + nested | `e.metadata->labels->app` | Nested fields in multi-source queries |

### Literal values

Use these formats when writing fixed values in queries:

- **Text strings:** `"hello"` or `'hello'` (wrap in double or single quotes)
- **Numbers:** `100`, `3.14`, `-42`
- **Boolean values:** `true`, `false`

### Arithmetic operators

| Operator | Meaning |
|----------|---------|
| `+` | Add |
| `-` | Subtract |
| `*` | Multiply |
| `/` | Divide |
| `%` | Remainder (modulo) |

### Summary functions

These functions calculate a single value from a group of records. Use them inside a `select` along with `group_by`.

| Function | What it calculates | Example |
|----------|-------------------|---------|
| `count()` | Number of records | `count()` |
| `count(field)` | Number of records where the field has a value | `count(status)` |
| `sum(field)` | Total of all values | `sum(cost)` |
| `avg(field)` | Average of all values | `avg(latency)` |
| `min(field)` | Smallest value | `min(start_time)` |
| `max(field)` | Largest value | `max(duration)` |
| `distinct_count(field)` | Number of unique values | `distinct_count(user_id)` |
| `stddev(field)` | Standard deviation (measure of how spread out values are) | `stddev(response_time)` |
| `variance(field)` | Variance (another measure of value spread) | `variance(response_time)` |
| `percentile(field, n)` | Value at the nth percentile | `percentile(latency, 90)` |
| `median(field)` | Middle value (same as 50th percentile) | `median(cost)` |
| `p50(field)` | 50th percentile | `p50(latency)` |
| `p95(field)` | 95th percentile (95% of values are below this) | `p95(latency)` |
| `p99(field)` | 99th percentile (99% of values are below this) | `p99(latency)` |

### Text functions

| Function | What it does | Example |
|----------|-------------|---------|
| `concat(a, b, ...)` | Combine multiple text values into one | `concat(first_name, " ", last_name)` |
| `substring(text, start, length)` | Extract a portion of text | `substring(name, 1, 5)` |
| `lower(text)` | Convert text to lowercase | `lower(status)` |
| `upper(text)` | Convert text to uppercase | `upper(region)` |

### Math functions

| Function | What it does | Example |
|----------|-------------|---------|
| `abs(value)` | Remove the negative sign from a number | `abs(difference)` |
| `round(value, decimals)` | Round to a specific number of decimal places | `round(cost, 2)` |
| `round(value)` | Round to the nearest whole number | `round(cost)` |
| `floor(value)` | Round down to the nearest whole number | `floor(score)` |
| `ceiling(value)` | Round up to the nearest whole number | `ceiling(score)` |

### Date and time functions

#### Relative time with `ago()`

Use `ago()` to specify a point in the past relative to the current time. This is the most common way to filter by time in HQL.

| Unit | Meaning | Example |
|------|---------|---------|
| `s` | Seconds | `ago(30s)` |
| `m` | Minutes | `ago(15m)` |
| `h` | Hours | `ago(2h)` |
| `d` | Days | `ago(30d)` |
| `w` | Weeks | `ago(1w)` |
| `M` | Months | `ago(6M)` |

```hql
find entity "pipeline:pipeline_execution"
| filter start_time >= ago(30d)
```

This query retrieves pipeline executions from the last 30 days.

#### Current time with `now()`

Use `now()` to reference the current date and time.

#### Group by time periods with `date_trunc()`

Use `date_trunc()` to round timestamps down to a specific time boundary. This is useful for grouping data by hour, day, month, or other time periods.

```hql
find entity "pipeline:pipeline_execution"
| select { date_trunc('day', start_time) as day, count() as executions }
| group_by date_trunc('day', start_time)
```

Supported time boundaries: `'hour'`, `'day'`, `'month'`.

#### Add or subtract time with intervals

Use `interval` to add or subtract a fixed amount of time from a timestamp.

```hql
start_time + interval 30 days
end_time - interval 2 hours
```

Supported interval units: `second(s)`, `minute(s)`, `hour(s)`, `day(s)`, `week(s)`, `month(s)`, `year(s)`.

### Conditional logic with CASE WHEN

Use `case when` to assign different values based on conditions. This works like an if-then-else statement.

```hql
find entity "pipeline:pipeline_execution"
| select {
    pipeline_id,
    case
      when status = "SUCCESS" then "Passed"
      when status = "FAILED" then "Failed"
      else "Unknown"
    end as status_label
  }
```

This query returns `"Passed"` when the status is `"SUCCESS"`, `"Failed"` when the status is `"FAILED"`, and `"Unknown"` for everything else.

### Convert data types with CAST

Use `cast()` to convert a value from one data type to another.

**Syntax:** `cast(expression as type)`

Available types:

| HQL type | What it represents |
|----------|--------------------|
| `string` or `str` | Text |
| `int` or `integer` | Whole number |
| `long` or `bigint` | Large whole number |
| `double` or `float` | Decimal number |
| `bool` or `boolean` | True or false |
| `timestamp` or `datetime` | Date and time |

## Reusable query blocks (CTEs)

A Common Table Expression (CTE) is a named query block that you define at the top of your query and reference later. CTEs help you break a complex query into smaller, readable pieces.

**Syntax:**

```hql
with block_name as (
  find [source] [type] | [operations]
)
find block_name | [operations]
```

### Single CTE

```hql
with active_pipelines as (
  find entity "pipeline:pipeline_execution"
  | filter is_deleted = false
)
find active_pipelines
| select { pipeline_id, status }
```

This query first creates a block called `active_pipelines` that contains only non-deleted pipeline executions. The main query then selects fields from that block.

### Multiple CTEs

Separate multiple blocks with commas:

```hql
with slow_spans as (
    find event span s
    | filter s.duration > 1000
),
error_logs as (
    find event log l
    | filter l.level = "ERROR"
)
find slow_spans
| select { id, duration }
```

### Use CTEs in joins

CTEs are especially useful when joining data from different sources:

```hql
with pipeline_exec as (
  find entity "pipeline:pipeline_execution" pes
  | filter pes.is_deleted = false
),
scan_data as (
  find entity sto:scan s
  | filter s.status = "ACTIVE"
)
find pipeline_exec
| join scan_data on pipeline_exec.pipeline_id = scan_data.pipeline_id
| select { pipeline_exec.pipeline_id, scan_data.scan_id }
```

:::info
You cannot define CTEs inside other CTEs. All CTE blocks must be defined at the top level of the query.
:::

## Combine data with joins

A join combines records from two data sources based on a matching field. For example, you can join pipeline executions with artifacts to see which artifact was used in each execution.

### Join types

| Join type | What it returns |
|-----------|----------------|
| `inner join` (default) | Only records that have a match in both data sources |
| `left join` | All records from the first source, plus matching records from the second. If there is no match, the second source's fields are empty. |
| `right join` | All records from the second source, plus matching records from the first. If there is no match, the first source's fields are empty. |
| `full join` | All records from both sources. Fields are empty where there is no match. |

### Write a join

**Syntax:** `[join_type] join [source] [type] [alias] on left_field = right_field`

```hql
find entity "pipeline:pipeline_execution" p
| inner join entity artifact a on p.artifact_id = a.id
| select { p.pipeline_id, a.registry, a.tag }
```

This query retrieves pipeline executions along with the registry and tag of the associated artifact.

### Join with a CTE

```hql
with recent_pipelines as (
  find entity "pipeline:pipeline_execution"
  | filter start_time >= ago(30d)
)
find entity artifact a
| left join recent_pipelines rp on a.pipeline_id = rp.pipeline_id
| select { a.id, rp.status }
```

This query lists all artifacts and, where available, shows the status of the associated pipeline execution from the last 30 days. Artifacts without a matching pipeline execution still appear in the results.

:::caution
Relationship-based joins are not fully available. Use field-based joins as shown in the examples above.
:::

## Complete examples

### Cloud cost by region and provider

Retrieve the top 20 region and cloud provider combinations by total cost over the last 30 days:

```hql
find event "ccm:unified_table"
| filter startTime >= ago(30d)
| select { region, cloudProvider, sum(awsBlendedCost) as total_cost, count() as record_count }
| group_by region, cloudProvider
| order_by total_cost desc
| limit 20
```

### Daily pipeline execution summary

Count pipeline executions per day and status, including how many succeeded:

```hql
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

### Top endpoints by request volume

Find the 10 busiest API endpoints with their average and 95th percentile response times:

```hql
find event "api_requests"
| select { endpoint, count() as request_count, avg(latency) as avg_latency, p95(latency) as p95_latency }
| group_by endpoint
| order_by request_count desc
| limit 10
```

### Page through failed pipeline executions

Retrieve the first 50 failed pipeline executions, sorted by most recent:

```hql
find entity "pipeline:pipeline_execution"
| filter status = "FAILED"
| order_by start_time desc
| offset 0
| limit 50
```

## Best practices

- **Filter early:** Place `filter` operations before `select` and `group_by`. This reduces the amount of data processed and speeds up your query.
- **Use aliases in joins:** When your query references multiple data sources, assign an alias to each one (for example, `find event "ccm:unified_table" ct`). This makes field references clear and avoids ambiguity.
- **Break complex queries into CTEs:** If your query has many steps or joins multiple sources, define named blocks at the top. This makes the query easier to read and debug.
- **Use `ago()` for time filters:** Instead of hardcoding dates, use relative time expressions like `ago(30d)` so your query always returns recent data.
- **Match `select` and `group_by`:** Every field in your `select` that is not inside a summary function must also appear in `group_by`. If you miss one, the query returns an error.
- **Use `order_by` with calculated names:** Reference the alias you created in `select` (for example, `order_by total_cost desc` instead of `order_by sum(cost) desc`).
- **Quote names with special characters:** Data source names that contain colons or other special characters must be wrapped in quotes, such as `"ccm:unified_table"`.
- **Add `limit` to large queries:** If you do not need all results, add a `limit` to prevent the query from returning more data than necessary.

## Reference

### Operation order

Operations run in this sequence:

1. `filter`
2. `select`
3. `group_by`
4. `order_by`
5. `limit` / `offset`

### Operator precedence

When HQL evaluates expressions, it follows this priority (highest to lowest):

1. Parentheses `()`
2. Multiply `*`, Divide `/`, Remainder `%`
3. Add `+`, Subtract `-`
4. Comparisons: `=`, `!=`, `>`, `>=`, `<`, `<=`
5. `and`
6. `or`

Use parentheses to control evaluation order when combining `and` and `or`:

```hql
| filter (status = "FAILED" or status = "ERROR") and start_time >= ago(7d)
```

Without parentheses, `and` is evaluated before `or`, which can produce unexpected results.

### Reserved keywords

The following words have special meaning in HQL. You can still use them as field names if you qualify them with an alias (for example, `ct.select` instead of just `select`).

`find`, `filter`, `select`, `group_by`, `order_by`, `limit`, `offset`, `distinct`, `with`, `as`, `join`, `on`, `union`, `inner`, `left`, `right`, `full`, `and`, `or`, `in`, `contains`, `is`, `null`, `empty`, `asc`, `desc`, `case`, `when`, `then`, `else`, `end`, `cast`, `interval`, `count`, `sum`, `avg`, `min`, `max`, `distinct_count`, `stddev`, `variance`, `percentile`, `median`, `p50`, `p95`, `p99`, `concat`, `substring`, `lower`, `upper`, `abs`, `round`, `floor`, `ceiling`, `now`, `ago`, `date_trunc`.

### Data type mapping

HQL data types map to database-specific types automatically:

| HQL type | PostgreSQL equivalent | StarRocks equivalent |
|----------|----------------------|----------------------|
| `string` | VARCHAR / TEXT | VARCHAR |
| `int` | INTEGER | INT |
| `long` | BIGINT | BIGINT |
| `double` | DOUBLE PRECISION | DOUBLE |
| `bool` | BOOLEAN | BOOLEAN |
| `timestamp` | TIMESTAMP | DATETIME |

### Supported database backends

HQL generates queries for these databases: StarRocks, AlloyDB, PostgreSQL, BigQuery, and MySQL. Harness selects the correct format based on the data source connection.

### Troubleshoot common errors

| Error message | What it means | How to fix it |
|---------------|---------------|---------------|
| `No mapping found for DataKind=DATA_KIND_EVENT, dataType=my:type` | The data type is not registered in the system. | Register the data type in the `application.yaml` configuration file. |
| `Unknown field 'field_name'` | The field name does not exist in this data source. | Check the data source schema for the correct field name. |
| `GROUP BY field must be in SELECT` | A field in `group_by` is missing from the `select` list. | Add all non-aggregated `select` fields to `group_by`. |
| `JOIN operation must specify join condition` | The join is missing the `on` clause that defines how to match records. | Add `on left_field = right_field` to the join. |

:::tip Performance Boosters
- Place `filter` operations early in the query to reduce the data processed.
- Add `limit` when you do not need every record.
- Avoid `select { * }` when you only need specific fields.
- Use CTEs to avoid repeating the same sub-query.
:::