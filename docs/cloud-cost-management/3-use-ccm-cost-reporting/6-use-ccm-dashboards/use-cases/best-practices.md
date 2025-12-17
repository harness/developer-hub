---
title: Best Practices for Custom BI Dashboards
description: Learn how to explore available data.
# sidebar_position: 2
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from: 
    - /docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/ccm-explore
---

Custom Business Intelligence (BI) dashboards are powerful tools for visualizing and analyzing your cloud cost data. However, poorly optimized dashboards can lead to slow performance, timeout errors, and a frustrating user experience. This guide provides best practices for creating efficient, high-performing Looker dashboards that deliver insights without compromising on speed or reliability.

## Optimizing Looker Dashboard Performance

To ensure Looker dashboards perform efficiently, consider the following key factors:

### Minimize Data Volume
The amount of data displayed **directly impacts performance**. Dashboards and individual elements returning thousands of data points will **consume more memory**. 

**Always filter on the least amount of data possible:**

- **Use the smallest possible date range** for your analysis needs. This is the most effective way to improve query performance.
- Query times can be **significantly slower when data scanned runs into terabytes**, which often happens when pulling data from a large period of historical time.
- Consider using aggregated data views when analyzing long historical periods rather than detailed data.
- Apply filters early in your query process to reduce the amount of data being processed.

#### Limit Usage of Join-Heavy Fields
Certain fields introduce additional joins in queries and can significantly slow down performance. Use these fields only when absolutely pertinent to the widget:

1. **Cost Categories**
2. **Labels** (account and resource)
3. **AWS Account Name**
4. **GCP Credits**
5. **GCP project labels & ancestors**

> **Note:** This limitation applies even when these fields are only used in filters (i.e., the field is not displayed in the widget but only filtered on). Filtering on these fields still requires the joins to be executed in the underlying query.

### Keep it to 10 or less
**Limit Dashboard Elements**: While there's no strict limit, aim to keep dashboards **under 10 queries**. To maintain a smooth experience, use:
- Navigation links between dashboards
- Links to custom URLs for curated navigation
- Consolidate similar measures into single-value visualizations

    Consider utilizing tabbed dashboards (buttons until new functionality is released) to break out themes/workstreams/channels into multiple “pages” that you can switch back and forth from. e.g. General Billing, Usage, Services, Recommendations, etc. 


### Load and Refresh Considerations

- **Strategic Dashboard Settings**:
    - **Run on Load**: **Avoid using this** for dashboards that require filtering.
    - **Required Filters**: Implement these to ensure users apply necessary filters **before running dashboards**.
    - **Autorefresh**: It is recommended to **turn off autorefresh** to prevent unnecessary server load. Manual refresh when needed is more efficient.
- **Leverage Caching with Datagroups**: Synchronize all Looker content (dashboards, Looks, schedules) with your ETL process using datagroups to **prevent unnecessary queries** when data isn't fresh.

### Limit Customizations

- **Control Post-Query Processing**: Features like custom fields and table calculations **consume memory**. The more these are used, the higher the memory consumption. If you need consistent customizations across multiple Looks, please open a support ticket with Harness to make these customizations first class.
- **Manage Pivoted Dimensions**: Pivoting dimensions, especially those with high cardinality, **increases memory usage** by creating a column for each unique value. Filter at the dashboard or Look level to allow users to select specific dimension values for comparison.
- **Reduce Columns and Rows**: For optimal browser performance, aim for **50 or fewer columns**. High volumes of rows and columns can slow performance. Use dashboard or Look-level filters to reduce the number of results within an element.
- **Utilize Shared Filters**: Employ shared filters with a single query to render one query result across multiple tiles, thereby **reducing the total number of queries** executed by the dashboard.
- **AND/OR Filters**: While there's no limit to the number of filter groups, excessive groups can **affect browser performance**.

### Use Labels V2 

- **Use Labels V2 Instead of Labels**: Labels V2 provides improved performance and functionality compared to the legacy Labels feature. Always use Labels V2 for better dashboard performance and more efficient data processing.
- **Avoid Resource Tags: All Values**: This feature is deprecated and severely reduces performance. Instead, use specific Resource Tags wherever possible to optimize query performance and dashboard loading times.

### Read More

#### Google/Looker Documentation
- [Considerations when building performant Looker dashboards](https://cloud.google.com/looker/docs/best-practices/considerations-when-building-performant-looker-dashboards) - Google Cloud Documentation

#### Harness Looker Resources
- [Looker Platform Performance Recommendations](https://dashboards.harness.io/dashboards/system__activity::performance_recommendations) - Dashboard for monitoring and improving performance
- [Looker Errors and Broken Content](https://dashboards.harness.io/dashboards/system__activity::errors_and_broken_content) - Dashboard for identifying and troubleshooting issues
