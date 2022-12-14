---
title: Share Your Cost Perspective Report
description: You can specify a report sharing schedule to receive your consolidated Perspectives weekly cost report.
# sidebar_position: 2
helpdocs_topic_id: nlxsj1coe5
helpdocs_category_id: b9vb8vq908
helpdocs_is_private: false
helpdocs_is_published: true
---

You can share the cost report of your Perspective with your stakeholders. Create a daily, weekly, monthly, or custom (using CRON expression) report sharing schedule. The report is sent as per the set frequency.


## Create a Report Sharing Schedule

You can create a schedule for sharing the cost report of your Perspective. Perform the following steps to create a schedule:

1. In **Perspective** **Builder**, click **Add a report sharing schedule**.
2. In **Name of the Report**, enter a name for your Perspective report.
3. In **Enter Recipients**, enter an email ID of the recipient.You can add up to 50 email IDs for sharing the report schedule. Email IDs are separated by a comma.
4. In **Repeat frequency in UTC**, select the **frequency** for sharing the report. All the schedules are executed in Universal Time Coordinated (UTC).
	1. **Daily**: Select the time from the drop-down list.In minutes, you can select zero or thirty minutes only.
	2. **Weekly**: Select the day and time from the drop-down list.
	3. **Monthly**: Select date and time from the drop-down list.
	4. **Custom CRON Expression**: Enter Cron expression to create a schedule. For a Cron expression calculator and examples, see  [Cron Expression Generator & Explainer](https://www.freeformatter.com/cron-expression-generator-quartz.html).
5. Click **Save**.
   
     ![](./static/share-report-in-cost-perspectives-29.png)

The report schedule is displayed in the Perspective.

   ![](./static/share-report-in-cost-perspectives-30.png)

You can also edit or delete the report sharing schedule.

## Edit a Report Sharing Schedule

To edit your report sharing schedule, perform the following steps:

1. Click **Edit**.
   
     ![](./static/share-report-in-cost-perspectives-31.png)
2. The **Report Sharing Schedule** settings appear. Follow the steps in [Create a Report Sharing Schedule](/docs/first-gen/cloud-cost-management/ccm-perspectives/share-report-in-cost-perspectives.md) to edit the details of the schedule.

## Delete a Report Sharing Schedule

Once a schedule is deleted, it cannot be restored. To delete your report sharing schedule, perform the following steps:

1. Click **Delete**.
   
     ![](./static/share-report-in-cost-perspectives-32.png)
2. Click **Confirm Delete**.

The schedule no longer appears in the Perspective Builder.

