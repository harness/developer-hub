---
title: Efficiency
description: Measurement and analysis of how effectively an organization or team performs its software development processes
sidebar_label: Engineering Efficiency
sidebar_position: 15
---

### 1. What is Efficiency?

Efficiency in the context of SEI 2.0 refers to the measurement and analysis of how effectively an organization or team runs its software development processes. It focuses on key performance metrics that helps your organization or team understand and improve the speed and quality of software delivery. 

The primary metrics used to gauge efficiency are the following [DORA metrics](https://cloud.google.com/blog/products/devops-sre/announcing-the-2024-dora-report):

* **Lead Time to Change:** The time it takes for a code change to go from commit to production.

* **Deployment Frequency:** How often an organization successfully releases to production.

* **Change Failure Rate:** The percentage of changes that fail in production.

* **Mean Time to Restore (MTTR):** The time it takes to recover from a failure in production.

These metrics are used to provide insights into the software delivery performance and help in identifying areas for improvement.

### 2. How to Set Up an Efficiency Profile
Setting up an Efficiency Profile in SEI 2.0 involves the following steps to ensure that the right metrics are being tracked and analyzed:

1. Select the right profile: Choose from default profiles based on your integration setup. For example, if you have Issue Management and Source Code Management integrations configured, you can select the "Default IM, SCM Efficiency Profile."
1. Instantiate the profile: Customize the selected profile to fit your organization's specific needs. This involves defining the stages of the software development lifecycle you want to measure, such as Planning, Coding, Review, Build, and Deploy.
1. Assign the profile to an org tree: Map the instantiated profile to your organization's tree structure. This ensures that all teams within your organization adhere to the same efficiency metrics.
1. Configure team node definitions: Define the specific data scope for each team, including relevant projects, repositories, and issue types.
1. Activate insights: Once the profile is configured and mapped, activate the insights to start tracking and analyzing efficiency metrics.

### 3. How to Configure an Efficiency Profile
Configuring an Efficiency Profile involves setting up the specific parameters and conditions under which metrics are tracked.

1. Define stages: Configure the start and end events for each stage of the software development lifecycle. 
For example, the Planning stage might start when a ticket is created and end when the first code commit is made.
1. Set up integrations: Ensure that all necessary integrations (e.g., Issue Management, SCM, and CI/CD) are configured to provide the data needed for each stage.
1. Apply team-specific configurations: Allow team managers to apply specific filters and settings relevant to their team's context, such as specific branches or issue types to track.

By following these steps, organizations can effectively set up and configure Efficiency Profile to gain valuable insights into their software delivery processes and drive continuous improvement.

