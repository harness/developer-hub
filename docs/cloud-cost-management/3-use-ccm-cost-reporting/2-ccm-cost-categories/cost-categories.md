---
title: Cost Categories
description: CCM cost categories provide an understanding of where and how your money is being spent. Cost categories allow you to take data across multiple sources and attribute it to business contexts, such as…
# sidebar_position: 1
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from: 
  - /docs/cloud-cost-management/use-ccm-cost-reporting/ccm-cost-categories/ccm-cost-categories
  - /docs/cloud-cost-management/use-ccm-cost-reporting/ccm-cost-categories/cost-categories-usage
---

import Tabs from '@theme/Tabs';

import TabItem from '@theme/TabItem';


Cost Categories transform raw cloud spending data into meaningful business contexts by aggregating costs across multiple sources (AWS, GCP, Kubernetes clusters, etc.) and organizing them into customizable business dimensions such as departments, teams, projects, or environments.

With Cost Categories, you can:

- **Map cloud costs to business units** - Create categories like "Teams" or "Departments" to track spending across organizational structures
- **Drill down into detailed cost analysis** - Examine specific cost buckets (e.g., the "Operations" team within a "Teams" category) to identify spending patterns
- **Apply consistent cost attribution** - Use the same business contexts across different cloud providers and resource types
- **Filter and group in CCM Perspectives** - Leverage your categories in reports and dashboards for comprehensive cost analysis


**The logic behind cost categories is simple: Create [Rules that bring in cost data](#what-are-rules) -> Rules combine to form [Cost Bucket](#define-your-cost-buckets) -> Cost Buckets combine to form Cost Category**

**For example:** Imagine your company has multiple departments. You want better visibility into marketing spend across various campaigns and cloud platforms. Currently, marketing costs are scattered across parts of AWS resources (for digital marketing), GCP resources (for YouTube marketing), and some kubernetes Clusters (for social media marketing tools):

* **Create a Cost Category** called "Marketing"
* **Add Cost Buckets** to this category:
  * "Digital Marketing" - with rules for AWS resources 
  * "YouTube Marketing" - with rules for GCP resources
  * "Social Media Marketing" - with rules for Kubernetes clusters 
* **Result:** A comprehensive view of all Marketing costs across multiple cloud platforms

<DocImage path={require('./static/what-is.png')} width="100%" height="100%" title="Click to view full size image" />

<div style={{backgroundColor: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '24px'}}>

### <span style={{color: '#334155'}}>What is the difference between Cost Categories and Perspectives?</span>

<p style={{fontSize: '16px', lineHeight: '1.6'}}>
  <span style={{backgroundColor: '#e0f2fe', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold'}}>Cost Categories</span> label and organize your cloud spend into custom buckets, while <span style={{backgroundColor: '#dcfce7', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold'}}>Perspectives</span> let you view and analyze that categorized data using Cost Categories as filters or group-by dimensions.
</p>

<div style={{overflowX: 'auto'}}>
  <table style={{width: '100%', borderCollapse: 'separate', borderSpacing: '0', marginTop: '16px'}}>
    <thead>
      <tr style={{backgroundColor: '#f1f5f9'}}>
        <th style={{padding: '12px 16px', textAlign: 'left', fontWeight: '600', borderBottom: '2px solid #cbd5e1'}}>Aspect</th>
        <th style={{padding: '12px 16px', textAlign: 'left', fontWeight: '600', borderBottom: '2px solid #0ea5e9', color: '#0284c7'}}>Cost Categories</th>
        <th style={{padding: '12px 16px', textAlign: 'left', fontWeight: '600', borderBottom: '2px solid #10b981', color: '#059669'}}>Perspectives</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style={{padding: '12px 16px', borderBottom: '1px solid #e2e8f0', fontWeight: '600'}}>What it is</td>
        <td style={{padding: '12px 16px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f0f9ff'}}>A <strong>classification system</strong> that assigns costs into custom buckets based on rules you define.</td>
        <td style={{padding: '12px 16px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f0fdf4'}}>A <strong>saved view</strong> of cost data with predefined filters, groupings, and time ranges.</td>
      </tr>
      <tr>
        <td style={{padding: '12px 16px', borderBottom: '1px solid #e2e8f0', fontWeight: '600'}}>Purpose</td>
        <td style={{padding: '12px 16px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f0f9ff'}}>To <strong>label and organize</strong> costs into meaningful business groupings (e.g., Environment, Department, Project).</td>
        <td style={{padding: '12px 16px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f0fdf4'}}>To <strong>analyze and visualize</strong> costs through a consistent lens, making it easy to track trends or budgets over time.</td>
      </tr>
      <tr>
        <td style={{padding: '12px 16px', borderBottom: '1px solid #e2e8f0', fontWeight: '600'}}>Scope</td>
        <td style={{padding: '12px 16px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f0f9ff'}}>Changes how cost line items are categorized across all reporting and dashboards.</td>
        <td style={{padding: '12px 16px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f0fdf4'}}>Controls <strong>how</strong> the categorized cost data is displayed and compared in reports.</td>
      </tr>
    </tbody>
  </table>
</div>

<div style={{marginTop: '24px', backgroundColor: '#f1f5f9', padding: '16px', borderRadius: '6px', borderLeft: '4px solid #64748b'}}>
  <h3 style={{margin: '0 0 12px 0', color: '#334155'}}>How They Work Together</h3>
  <ul style={{marginBottom: '0', paddingLeft: '20px'}}>
    <li><strong>Cost Categories</strong> define the labels for your costs.</li>
    <li><strong>Perspectives</strong> decide how to look at those costs.</li>
  </ul>
  <p style={{marginTop: '12px', marginBottom: '0'}}><strong>You can:</strong></p>
  <ul style={{marginBottom: '0', paddingLeft: '20px'}}>
    <li>Use a Cost Category as a filter in a Perspective → see only costs for a specific category value.</li>
    <li>Use it as a group-by dimension → break down total cost into category buckets.</li>
  </ul>
</div>

</div>

<details>
<summary>Example: Using Cost Categories with Perspectives</summary>
<div style={{backgroundColor: '#f0f7ff', padding: '20px', borderRadius: '8px', border: '1px solid #cce3ff', marginBottom: '24px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'}}>  

Let's say your organization runs workloads in <span style={{backgroundColor: '#e6f2ff', padding: '2px 5px', borderRadius: '3px'}}>multiple AWS accounts</span>. Some accounts are for Production, some for Development, and others for Staging. 

<div style={{backgroundColor: '#ffe6e6', padding: '10px', borderRadius: '5px', marginBottom: '15px', borderLeft: '3px solid #ff8080'}}>
<span style={{fontWeight: 'bold'}}>Without Cost Categories:</span> Creating a Perspective to analyze costs by environment requires creating perspectives with multiple rules and any new account or tag variation means updating the Perspective again.
</div>

<div style={{backgroundColor: '#e6ffe6', padding: '10px', borderRadius: '5px', marginBottom: '15px', borderLeft: '3px solid #80c080'}}>
<span style={{fontWeight: 'bold'}}>With Cost Categories:</span> You can define an Environment cost category that standardizes this classification by using three cost buckets (Production, Development, and Staging).
</div>

<table style={{width: '100%', borderCollapse: 'separate', borderSpacing: '0', marginBottom: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
  <thead>
    <tr style={{backgroundColor: '#f0f7ff'}}>
      <th style={{padding: '12px', borderBottom: '2px solid #cce3ff', textAlign: 'left'}}>Rule</th>
      <th style={{padding: '12px', borderBottom: '2px solid #cce3ff', textAlign: 'left'}}>Cost Bucket</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style={{padding: '10px', borderBottom: '1px solid #e6e6e6'}}><span style={{fontWeight: 'bold'}}>Operand:</span> AWS, <span style={{fontWeight: 'bold'}}>Operator:</span> Account, <span style={{fontWeight: 'bold'}}>Value:</span> &#123;all the accounts related to production&#125;</td>
      <td style={{padding: '10px', borderBottom: '1px solid #e6e6e6', backgroundColor: '#f9f9f9'}}><span style={{color: '#0066cc', fontWeight: 'bold'}}>Production</span></td>
    </tr>
    <tr>
      <td style={{padding: '10px', borderBottom: '1px solid #e6e6e6'}}><span style={{fontWeight: 'bold'}}>Operand:</span> AWS, <span style={{fontWeight: 'bold'}}>Operator:</span> Usage Type, <span style={{fontWeight: 'bold'}}>Value:</span> &#123;all the usage types related to development&#125; <span style={{backgroundColor: '#fff2cc', padding: '1px 5px', borderRadius: '3px'}}>OR</span> <span style={{fontWeight: 'bold'}}>Operand:</span> AWS, <span style={{fontWeight: 'bold'}}>Operator:</span> Service, <span style={{fontWeight: 'bold'}}>Value:</span> &#123;all the services related to development&#125;</td>
      <td style={{padding: '10px', borderBottom: '1px solid #e6e6e6', backgroundColor: '#f9f9f9'}}><span style={{color: '#0066cc', fontWeight: 'bold'}}>Development</span></td>
    </tr>
    <tr>
      <td style={{padding: '10px', borderBottom: '1px solid #e6e6e6'}}><span style={{fontWeight: 'bold'}}>Operand:</span> AWS, <span style={{fontWeight: 'bold'}}>Operator:</span> Service, <span style={{fontWeight: 'bold'}}>Value:</span> &#123;all the services related to staging&#125;</td>
      <td style={{padding: '10px', borderBottom: '1px solid #e6e6e6', backgroundColor: '#f9f9f9'}}><span style={{color: '#0066cc', fontWeight: 'bold'}}>Staging</span></td>
    </tr>
  </tbody>
</table>
<DocImage path={require('./static/example.png')} width="100%" height="100%" title="Click to view full size image" />



<div style={{backgroundColor: '#f0f7ff', padding: '12px', borderRadius: '5px', borderLeft: '3px solid #0066cc'}}>
Once this Cost Category is in place, you can use it in Perspectives to:
<ul style={{marginTop: '8px', marginBottom: '8px'}}>
  <li><span style={{backgroundColor: '#cce3ff', padding: '2px 6px', borderRadius: '3px', fontWeight: 'bold'}}>Filter:</span> Filter by any cost bucket.</li>
  <li><span style={{backgroundColor: '#cce3ff', padding: '2px 6px', borderRadius: '3px', fontWeight: 'bold'}}>Group By:</span> Break down total spend by your cost buckets.</li>
</ul>
</div>

<DocImage path={require('./static/example-static.png')} width="100%" height="100%" title="Click to view full size image" />

</div>
</details>

### Before You Begin

To create and manage Cost Categories in Harness CCM, you need:

**Active CCM Connectors**: You must have at least one active cloud connector set up for the cloud providers you want to categorize costs for: Set Up [CCM Connectors](/docs/cloud-cost-management/get-started#aws).

**Required Permissions**: Your Harness user account must belong to a user group with the following role permissions:

- **Cloud Cost Management: Cost Categories: Create/Edit**
- **Cloud Cost Management: Cost Categories: View**

For more details on CCM permissions, see [CCM Roles and Permissions](/docs/cloud-cost-management/access-control/ccm-roles-and-permissions).

------
## Creating Cost Categories

<Tabs>
<TabItem value="Step-by-Step" label="Step-by-Step">
- In your Harness application, go to Cloud Cost Management > Cost Categories > New Cost Category.

<Tabs>
<TabItem value="Define Cost Bucket(s)" label="Define Cost Bucket(s)">

### Define your Cost Bucket(s)

<DocImage path={require('./static/step-one.png')} width="100%" height="100%" title="Click to view full size image" />

A cost category is composed of one or more buckets. Each bucket contains filters that collect data from specific sources.
   - Enter a descriptive name for the cost bucket (e.g., "Marketing Department")
   - Each bucket collects costs from data sources that belong to that department
   - **Define Rules:** Add multiple conditions to a rule using the **AND** operator (Use to filter data sources that include both criteria)/ **OR** operator (Use to filter data sources that include one of the criteria)

#### What are Rules?

<div style={{marginBottom: '10px'}}>Rules help you define which cloud resources to include in your Cost Bucket using a simple "Operand-Operator-Value" structure.</div>

<div className="rule-components-container" style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
  <div className="rule-component" style={{flex: '1', padding: '15px', margin: '0 10px', border: '1px solid #eee', borderRadius: '5px'}}>
    <div style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', textAlign: 'center'}}>Operand</div>
    <div style={{fontSize: '13px', backgroundColor: '#f8f8f8', padding: '6px', borderRadius: '4px', marginBottom: '8px', fontStyle: 'italic'}}>The data category or attribute you want to filter on</div>
    <div>Select from:</div>
    <ul style={{paddingLeft: '20px'}}>
      <li>Common</li>
      <li>Cost Categories</li>
      <li>Cluster</li>
      <li>AWS</li>
      <li>GCP</li>
      <li>Azure</li>
      <li>External Data</li>
    </ul>
  </div>
  
  <div className="rule-component" style={{flex: '1', padding: '15px', margin: '0 10px', border: '1px solid #eee', borderRadius: '5px'}}>
    <div style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', textAlign: 'center'}}>Operator</div>
    <div style={{fontSize: '13px', backgroundColor: '#f8f8f8', padding: '6px', borderRadius: '4px', marginBottom: '8px', fontStyle: 'italic'}}>The comparison method that defines how to match values</div>
    <div>Choose from:</div>

    * **IN**: Include only resources that exactly match the specified value
    * **NOT IN**: Include all resources except those that match the specified value
    * **NULL**: Include only resources where this field has no value (excludes resources with this field)
    * **NOT NULL**: Include only resources where this field has a value
    * **LIKE**: Include resources where the field partially matches a pattern (uses regular expressions)
      - For exact pattern matching, use `^pattern$` syntax
    
  </div>
  
  <div className="rule-component" style={{flex: '1', padding: '15px', margin: '0 10px', border: '1px solid #eee', borderRadius: '5px'}}>
    <div style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', textAlign: 'center'}}>Values</div>
    <div style={{fontSize: '13px', backgroundColor: '#f8f8f8', padding: '6px', borderRadius: '4px', marginBottom: '8px', fontStyle: 'italic'}}>The specific data points to include or exclude in your perspective</div>
    <div>Select the specific data points to apply the rule to.</div>
    <div style={{marginTop: '10px'}}>These will vary based on your selected Operand and Operator.</div>
  </div>
</div>

After configuring all your cost buckets, click on "Continue"

:::info
**Important Limitations When Using Cost Categories:**

- If a cost category has a shared bucket, you cannot nest it inside another cost category
- A cost category cannot reference itself in its own rules
- You cannot create loops between categories
   - Example: If Category A includes Category B, then Category B cannot include Category A
- You can nest categories up to 5 levels deep

:::

</TabItem>

<TabItem value="Attribute Shared Costs" label="Attribute Shared Costs">

### [Optional] Attribute Shared Costs 

<DocImage path={require('./static/step-two.png')} width="100%" height="100%" title="Click to view full size image" />

**Shared buckets** allow you to distribute common costs across multiple cost buckets in a category. For example, database maintenance costs that benefit multiple departments can be shared among them using a shared bucket.  

1. **Name your shared bucket** (e.g., "Database Costs", "IT Infrastructure")

2. **Define filtering rules** for the shared bucket (similar to regular cost buckets)

3. **Select a sharing strategy:**

   | Strategy | Description | Example |
   |----------|-------------|--------|
   | **Equal Split** | Divides costs equally among all buckets | USD100 shared across 4 buckets = USD25 each |
   | **Proportional Split** | Allocates based on each bucket's existing costs | If Bucket A has 70% of direct costs and Bucket B has 30%:<br/><ul><li>For USD100 shared cost</li><li> Bucket A receives USD70 </li><li>Bucket B receives USD30</li></ul> |
   | **Fixed Percentage** | Distributes according to manually defined percentages | Manually assign 60% to Bucket A, 25% to Bucket B, 15% to Bucket C |

4. Click on "Continue".
</TabItem>

<TabItem value="Manage Unallocated Costs" label="Manage Unallocated Costs">

<DocImage path={require('./static/step-three.png')} width="100%" height="100%" title="Click to view full size image" />

### Manage Unallocated Costs

When you use Cost Categories in a Perspective (as a filter or Group By dimension), some costs may not match any of your defined cost buckets. These are called **Unallocated Costs**.

In Manage Unallocated Costs, you can choose to show or ignore unallocated costs, and choose a name for how those costs are displayed.

- Show Unallocated Values as (enter a name)
- Ignore Unallocated Values
- Share Default Costs among Cost Buckets (Coming Soon)

</TabItem>
</Tabs>
</TabItem>

<TabItem value="Interactive Guide" label="Interactive Guide">
    <DocVideo src="https://app.tango.us/app/embed/89164540-a07f-4900-bca7-b303fbb37154?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" style="min-height:720px" title="Perspective Overview in Harness CCM" />
</TabItem> 

</Tabs>
 -------

## Overview Page

<DocImage path={require('./static/output-overview.gif')} width="100%" height="100%" title="Click to view full size image" />

The Cost Categories overview page provides a centralized view of all your defined categories. From this dashboard, you can:

* **View category details** - Click any category to examine its cost buckets, rules, and configurations
* **Manage categories** - Edit existing categories, clone them to create similar ones, or delete categories you no longer need
* **Copy cost buckets** - Transfer bucket definitions between categories to maintain consistency across your cost organization structure:
    - Expand the source cost category
    - Select **Manage Cost Buckets**
    - Select buckets to copy
    - Click **Copy** and choose target categories
    - Verify with **View Details**
  
  **Note:** If a destination category already has a bucket with the same name, rename it first to avoid conflicts.


-------


## Use Cost Categories

Cost Categories can be used across multiple Harness CCM features. The table below shows how each feature supports different Cost Category capabilities:

| Feature | Perspectives | Dashboards | Recommendations |
|---------|-------------|------------|----------------|
| **Usage Methods** | • Rules for filtering<br/>• Group By dimension<br/>• Filter panel selection | • Dimension for analysis<br/>• Filter for data selection | • Filter for recommendations |
| **Shared Cost Buckets** | ✅ **Supported**<br/>Costs allocated per sharing strategy | ❌ **Not Supported** | ❌ **Not Supported** |
| **Nested Categories** | ✅ **Supported** | ✅ **Supported** | ✅ **Supported** |
| **Cluster Data** | ✅ **Supported**<br/>Can create categories with cluster rules | ✅ **Supported** | ✅ **Supported** |
| **If Changes in Cost Category** | Updates apply to historical data | Monthly tracking of changes | Updates apply to future recommendations |

> **Note:** When using Cost Categories across multiple features, be aware of the different support levels and behaviors to ensure consistent analysis.

### In Perspectives

<Tabs>
<TabItem value="GroupBy" label="GroupBy">

When you group by a cost category:

* Each cost bucket appears as a separate line item
* Costs are distributed to their respective buckets based on the rules defined in the cost category
* Shared costs are allocated proportionally to each cost bucket according to your sharing strategy
* Resources that don't match any bucket rules appear under "Unattributed"

##### Cross-Category Interactions

When using one cost category in a rule and grouping by another cost category:

* Only costs that match your rule's cost category will be included
* These costs are then grouped according to the buckets in your group-by cost category
* Resources that match your rule but don't belong to any bucket in your group-by category appear under "No [Category Name]"
* Shared costs from both categories are allocated according to their respective sharing strategies

> **Important:** When using multiple cost categories with overlapping resources, be careful with shared buckets. If both categories have shared buckets with overlapping rules, costs might be counted differently than expected.

</TabItem>
<TabItem value="Filter" label="Filter">

#### Filter
You can use Group By and filters together. For example, your filter could select **Manufacturing** from the Department Cost Category, and then you can select **GCP: SKUs** in **Group By**.

When including multiple cost categories in your filter, it is important to check for any shared cost buckets between them. If you have shared cost buckets with overlapping rules in both cost categories, the cost of these buckets is counted twice, resulting in duplication of costs. Therefore, it is recommended not to have multiple cost category filter in a Perspective. However, if you must add a multiple cost category filter, avoid overlapping shared cost buckets between cost categories to prevent any potential errors.

</TabItem>
<TabItem value="Perspective rule" label="Perspective rule">

When creating a Perspective, you can define a rule using cost categories. The benefit of using a cost category as a rule in a Perspective is that the cost category definition is separated from all the Perspectives that use it.

If you modify the definition of a cost category, any Perspective that uses the cost category automatically displays the changes.

For example, if a new product is added to the Manufacturing department, you can simply update the Manufacturing bucket in the Departments Cost Category, and that change is automatically reflected in all the Perspectives that use that Cost Category.

If cost categories with overlapping cost buckets are used in your Perspective rule, the total cost of the cost buckets in both categories is counted only once. However, the cost of the shared buckets between the two categories is duplicated because of overlapping rules. Therefore, it is recommended to avoid using multiple cost categories with overlapping shared cost buckets in your perspective rule to prevent any potential errors.

When you add a cost category to your Perspective rule:

* The Perspective will only show costs that match the selected cost buckets within that category
* Shared cost buckets associated with the selected cost buckets will be included and allocated according to your sharing strategy
* Costs outside your selected buckets will not appear unless you include "Unattributed" in your selection

</TabItem>
</Tabs>

------

### In Dashboards

You can visualize cost categories in your custom dashboard. **Cost Categories** is available in the **Unified** explore on the **Dashboards** page. 

* **Update Delay:** Changes to cost categories may take **up to 24 hours** to appear in dashboard data.

* **Historical Data Behavior:** Cost category changes apply to data from the **current month forward** via CUR and Billing Exports. Historical data remains unchanged.

* **Deletion Behavior:** When you delete a cost category, it remains visible in dashboards **until the end of the current month**. Example: If deleted on January 24th, it will still appear until January 31st.

* **Shared Buckets:** **Important:** Shared cost buckets are **not included** when using cost categories in dashboards.


<DocImage path={require('./static/cc-example.png')} width="100%" height="100%" title="Click to view full size image" />

:::info
In AWS, you cannot use cost categories as a dimension in custom dashboards if you have selected any of the following fields in the explore:

- Resource ID 
- Line Item Type 
- Market Type 
- Amortised Cost 
- Net Amortised Cost 

:::

------

### In Recommendations

#### Using Cost Categories with Recommendations

You can filter CCM Recommendations using Cost Categories to focus on specific business areas:

| Feature | Support Status |
|---------|---------------|
| **Regular Cost Buckets** | Fully supported |
| **Nested Cost Categories** | Fully supported |
| **Shared Cost Buckets** | Not supported |

**Note:** Since recommendations operate at the resource level, all resources included in your selected cost buckets will appear in the filtered recommendations view.

To filter recommendations using cost categories:

1. Go to **Cloud Cost Management > Recommendations**
2. Select your cost category in the **Filter** panel
3. Select the cost buckets you want to include
4. All the resources included in your selected cost buckets will appear in the filtered recommendations view.


<DocImage path={require('./static/rec-filter.png')} width="100%" height="100%" title="Click to view full size image" /
>

## Examples

<details>
<summary><b>Example 1: Department Cost Category</b></summary>

Let's say you've created a "Department" Cost Category with these buckets:

| Department Bucket | What's Included |
|------------------|------------------|
| Engineering | • All EC2 instances with tag "team=dev"<br/>• All S3 buckets with tag "team=dev" |
| Marketing | • All EC2 instances with tag "team=marketing"<br/>• All RDS instances with tag "dept=marketing" |
| Shared Services | • All network costs<br/>• All support costs |

**When used as a Perspective rule:**
- You'll see costs broken down by Engineering, Marketing, and Shared Services
- Shared costs are properly allocated based on your sharing strategy

**When used with Group By:**
- You can group by Department to see costs for each department
- You can combine with other dimensions (e.g., Group by Department → AWS Service)
</details>

<details>
<summary><b>Example 2: Multiple Cost Categories</b></summary>

Imagine you have two Cost Categories:

1. **Department Category** (Engineering, Marketing, Finance)
2. **Environment Category** (Production, Development, Testing)

When you:
- Use Department Category in your Perspective rule
- Group By Environment Category

You'll see:

| Environment | Cost | What This Shows |
|-------------|------|------------------|
| Production | $5,000 | Production costs across selected departments |
| Development | $2,000 | Development costs across selected departments |
| Testing | $1,000 | Testing costs across selected departments |
| No Environment | $500 | Costs that belong to selected departments but don't have environment tags |

> **Note:** When using multiple Cost Categories together, be careful with shared buckets. If both categories have shared buckets with overlapping rules, costs might be counted twice.
</details>

## FAQs

<details>
<summary><b>What's the difference between "No [Category Name]" and "Unattributed" costs?</b></summary>

**Unattributed Costs:**
- Appear when you're using a single cost category
- Represent costs that don't match any bucket rules within that category
- Example: If your "Department" category has buckets for Engineering, Marketing, and Finance, costs that don't match any department rules will appear as "Unattributed"
- These costs are completely outside your defined buckets

**No [Category Name] Costs:**
- Appear when you're using multiple cost categories together (one in rules, another in Group By)
- Represent costs that match your rule category but don't match any bucket in your group-by category
- Example: If you filter by "Department = Engineering" and group by "Environment", costs from Engineering that don't have an environment tag will appear as "No Environment"
- These costs are within your primary category but not classified in your secondary category
</details>

<details>
<summary><b>Can I use cost categories with multiple cloud providers?</b></summary>

Yes, cost categories work across all supported cloud providers (AWS, Azure, GCP) and Kubernetes clusters. You can create rules that span multiple providers and organize costs consistently across your entire cloud estate.
</details>

<details>
<summary><b>How do shared buckets affect my cost reporting?</b></summary>

Shared buckets distribute common costs (like infrastructure or support) across multiple cost buckets according to your chosen allocation strategy. In Perspectives, these shared costs are included when you select the associated cost buckets. However, be aware that:

- Shared buckets are not supported in Dashboards or Recommendations
- Using multiple cost categories with overlapping shared buckets can potentially count costs twice
- Shared buckets cannot be nested inside other cost categories
</details>