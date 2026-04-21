---
title: AI Assistant
description: This topic describes AI assistant in Commitment Orchestrator.
# sidebar_position: 2
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: false
helpdocs_is_published: true
---

# Commitment Orchestrator AI Assistant

Harness Cloud Cost Management (CCM) includes an AI-powered assistant for Commitment Orchestrator that helps you analyze your AWS commitment landscape, understand utilization patterns, and identify optimization opportunities. The AI assistant provides intelligent insights into your Reserved Instances (RIs) and Savings Plans to maximize cost savings.

## Overview

The Commitment Orchestrator AI Assistant uses natural language processing to help you:

- **Analyze your AWS EC2 commitment landscape** – Get a comprehensive overview of your active commitments, utilization performance, and potential savings
- **Identify coverage gaps** – Discover which instance types or families have the highest and lowest commitment coverage
- **Understand utilization metrics** – Get AI-powered explanations of your commitment utilization percentages
- **Optimize spending** – Receive actionable insights on how to improve your commitment strategy

## Prerequisites

Before using the AI Assistant:

1. **EULA Acceptance** – You must accept the Harness AI End User License Agreement to enable AI features
2. **Commitment Orchestrator Setup** – Your AWS accounts must be connected and Commitment Orchestrator must be enabled for at least one service (EC2 or RDS)
3. **Active Commitments** – You need existing Reserved Instances or Savings Plans for the AI to analyze

## Accessing the AI Assistant

### Method 1: Quick Prompts Bar

When viewing the Commitment Orchestrator details page for a service (EC2 or RDS), you'll see a prompt bar at the top of the page with quick-access options:

1. **Ask AI about Commitments** – Opens the AI chat drawer for free-form questions
2. **Analyze my AWS commitments** – Instantly triggers a comprehensive EC2 commitment landscape analysis
3. **Instance types with most/least coverage** – Shows detailed coverage analysis by instance family

### Method 2: Floating AI Button

Click the **Ask AI** (located in the bottom-right corner of the Commitment Orchestrator pages) to open the AI chat drawer at any time.

### Method 3: Utilization Gauge Insights

On the Commitment Utilization section, hover over any utilization percentage to reveal an **Explain** option. Click it to get an AI-powered explanation of that specific utilization metric:

- **Overall Utilization** – Explains your total commitment utilization across all commitment types
- **Savings Plans Utilization** – Provides insights specific to your Savings Plans performance
- **Reserved Instances Utilization** – Analyzes your Reserved Instances utilization

## AI Capabilities

### 1. EC2 Commitment Landscape Analysis

**Prompt:** "Analyze my AWS EC2 commitment landscape"

The AI provides a comprehensive analysis including:

#### Total Active Commitments
- Combined yearly value of all your commitments
- Breakdown between Reserved Instances and Savings Plans
- Percentage allocation of each commitment type

#### Utilization Performance (Last 30 Days)
- Overall utilization percentage
- Month-over-month trend (increase/decrease)
- Breakdown by commitment type (Savings Plans vs Reserved Instances)

#### Impact Analysis
- **Current Savings** – Actual savings achieved in the last 30 days
- **Potential Additional Savings** – Annualized savings opportunity if optimization recommendations are implemented
- **Estimated Savings Rate (ESR)** – Your current savings rate as a percentage

### 2. Coverage Analysis by Instance Family

**Prompt:** "Can you give me details of the instance types/families having the most and least coverage?"

The AI returns two detailed tables:

#### Instance Families with Highest Coverage
Shows the top 3 instance families with the best commitment coverage:
- **Family** – Instance family name (e.g., t3.medium, m5.large)
- **Coverage** – Percentage of usage covered by commitments
- **Monthly Usage** – Total monthly spend for this family
- **Status** – Coverage status indicator

#### Instance Families with Lowest Coverage
Shows the bottom 3 instance families with the least coverage:
- **Family** – Instance family name
- **Coverage** – Percentage of usage covered by commitments
- **Monthly Usage** – Total monthly spend for this family
- **Waste** – On-demand costs that could be covered by commitments (e.g., "$5,000/month in On-Demand costs")

> **Note:** The analysis can also be grouped by **Region** instead of instance family, depending on your data configuration.

### 3. Utilization Explanations

**Prompts:**
- "Could you explain my overall commitment utilisation of X%?"
- "Could you explain my Savings Plan commitment utilisation of X%?"
- "Could you explain my Reserved Instances commitment utilisation of X%?"

The AI provides contextual explanations of your utilization metrics, including:
- What the percentage means for your cost optimization
- Factors that may be affecting utilization
- Recommendations for improvement if utilization is low

## Using the AI Chat Interface

### Welcome Screen

When you first open the AI drawer, you'll see:

1. **Introduction text:** "I'll help you analyze your commitment utilization and provide recommendations to optimize your cloud spend"
2. **Prompt:** "What would you like to know about your commitments? (select 1)"
3. **Suggested queries** – Pre-built prompts you can click to get started:
   - "Analyze my AWS EC2 commitment landscape"
   - "Can you give me details of the instance types/families having the most and least coverage?"

### Conversation Flow

1. **Select a suggestion** or type your own question
2. **View the response** – The AI displays formatted tables and insights directly in the chat
3. **Ask follow-up questions** – Continue the conversation to drill deeper into specific areas
4. **Close the drawer** – Click outside the drawer or use the close button when finished

### Response Formats

The AI assistant presents information in easy-to-read formats:

- **Summary cards** – Key metrics with values and trends
- **Data tables** – Sortable tables for coverage and utilization data
- **Bullet points** – Impact analysis and recommendations
- **Trend indicators** – Visual arrows showing month-over-month changes (↑ increase, ↓ decrease)

## Data Sources

The AI assistant analyzes data from:

- **AWS Cost and Usage Reports (CUR)** – For commitment costs and coverage data
- **Commitment Orchestrator APIs** – For utilization metrics and savings calculations
- **Historical data** – Last 30 days of commitment performance

## Best Practices

1. **Start with the landscape analysis** – Get a complete picture before diving into specifics
2. **Review low-coverage families** – Focus optimization efforts on instance families with high on-demand waste
3. **Monitor utilization trends** – Use the month-over-month comparisons to track improvement
4. **Act on potential savings** – The "Potential Additional Savings" metric shows your optimization opportunity
5. **Check regularly** – Commitment landscapes change as your infrastructure evolves

## Limitations

- **AWS EC2 only** – The detailed landscape analysis is currently optimized for EC2 commitments
- **RDS support** – RDS commitment analysis has limited AI features (no Savings Plans breakdown)
- **Historical scope** – Analysis is based on the last 30 days of data
- **Real-time data** – There may be a slight delay in data freshness (typically up to 24 hours)

## Troubleshooting

### AI Assistant Not Appearing

- Verify you have accepted the Harness AI EULA
- Ensure Commitment Orchestrator is enabled for your account
- Check that you have the required permissions to access Commitment Orchestrator

### No Data in Analysis

- Confirm you have active Reserved Instances or Savings Plans
- Verify your AWS accounts are properly connected
- Check that cost data is being ingested (may take 24-48 hours for new accounts)

### Utilization "Explain" Not Showing

- The Explain option only appears when utilization is greater than 0%
- It is not available for the "By Harness" managed utilization view

## Related Features

- **Commitment Orchestrator Overview** – View all your commitment metrics and savings
- **Compute Coverage** – Detailed coverage analysis by cost or hours
- **Savings Breakdown** – Understand where your savings are coming from
- **Inventory** – Browse your active Reserved Instances and Savings Plans
- **Actions** – Review pending and executed optimization actions

## Permissions

Using the AI Assistant requires:

- Access to Commitment Orchestrator
- View permissions for commitment data
- EULA acceptance for Harness AI features

Contact your Harness administrator if you cannot access the AI features.
