---
title: Add Cost Estimation of the Infrastructure Pipeline
description: Learn how to get cost estimation for Infrastructure changes
sidebar_position: 50
---

Harness IaCM supports getting cost estimation as part of Infrastructure flow. This will help users to know if their cloud spend is going to increase as part of updating or provisioning resources. Please note that the data shown is just an estimation of the cost change, and the actual cost might be different depending on the agreement with the cloud provider. 

To use this feature, go to the "Configuration" tab of the Workspace and toggle "Enable Cost Estimation"

     ![Resources](./static/cost1.png)

Once enabled, the cost estimation will be shown in the following places in the pipeline (as long as there is a 'terraform plan' used):

1. Approval Step - users can see cost estimation, in addition to the resource changes
    ![Resources](./static/cost2.png)
2. "Cost Change Estimation" Tab - for complete audit, Harness keeps the cost estimation in the pipeline execution
    ![Resources](./static/cost3.png)

To use cost estimation, Harness utilize [infracost](https://www.infracost.io/). Users who have a license to Infracost Cloud can use the API key by setting the following Environment variable in the Workspace: INFRACOST_API_KEY = <API Key Value>
