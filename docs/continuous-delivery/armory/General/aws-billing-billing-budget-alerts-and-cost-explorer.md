---
title: AWS Billing - Billing, Budget Alerts and Cost Explorer
---


The following is quick information about work that Technical Support Engineering have done in Budgets and Cost Explorer, and how to use both to review billing in AWS

A quick aside, in order to get billing access, the admin will need to make sure that billing access is provided to the IAM Account as a policy, Console access is provided, and most importantly, as the root in the main account, a[ selection needs to be made in the account preferences to allow IAM users to have access to the billing](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/control-access-billing.html#ControllingAccessWebsite-Activate).  If your account doesn’t have this access, you will probably need to talk to @Black Mountain. Black Mountain


## How to get the monthly bill

If your account is a part of the “My Organization” for Armory, you will not be able to receive a PDF of the monthly bill/invoice for the account.  You can only receive a full bill for the entire organization (This is a feature request I have been requesting for almost a year now - Kinnon)
 

For now, you will have to manually download the “final” invoice
* Log in to the account
* Go to **Billing → Bills**
* You can select the monthly bills from the dropdown in the upper left corner. 
  (1)  Please note that you can see the current month’s bill cost, but note that it will fluctuate due to changes that can happen in the month Each service charge is laid out at  (2)
  * You can expand each section
  * Each service is broken down by a rate and how many hours/amount of rate the service was used.  For example, EC2 by number of hours, Bandwidth by GB
  * Please note that regional costs are also calculated.  e.g. Our EC2 costs for N. Virginia will be separated from Oregon
  * Also, because different months have different amount of days, your billing will reflect these subtleties since it is based on number of hours
* You can download a CSV, but I would recommend a PDF because it’s more legible.  Click on Print (3) → and select to save as a PDFBill location
  * For Tech Support Eng, Save to our DropBox Billing location:[https://www.dropbox.com/work/Armory%20Tribe%20Team%20Folder/Customer%20Success/Technical%20Support/AWS%20-%20Bill](https://www.dropbox.com/work/Armory%20Tribe%20Team%20Folder/Customer%20Success/Technical%20Support/AWS%20-%20Bill)

 


## How Budget Alerts - Monthly Estimate Cost is set up

Budget Alerts are a good way get an estimation on whether your monthly spend is going to exceed your budget line.  Please keep in mind that the report prediction requires several weeks of data before it can start providing accurate information, and also if your account is new, you are probably making lots of changes rapidly to get the account set up

There are several types of Budgets and Alerts besides for cost, including ones to look at compute usage, RI usage, and Savings Plans.  Below is the steps for a monthly Dollar Cost Estimate Budget Alert

1. If you have not created an SNS notification and topic, it is recommended that you do so first.  This will allow you to send alerts to all those who subscribe to your SNS topic, and also allow you to create a Zapier if you want to have Slack notifications
  * SNS Topic Creation: [https://docs.aws.amazon.com/sns/latest/dg/sns-getting-started.html](https://docs.aws.amazon.com/sns/latest/dg/sns-getting-started.html)
  * Addition to SNS Access Policy for the Budget Alert - Add the following so Budget Alerts can send notification to SNS
    * Go to your SNS Topic - Click Edit on the Upper Right Corner
    * Click on the Access Policy section and expand it
    * Add the following highlighted section, making changes to the arn section to match your Topic’s arn
```
...
},
{
  "Sid": "AWSBudgets-notification-1",
  "Effect": "Allow",
  "Principal": {
    "Service": "budgets.amazonaws.com"
  },
  "Action": "SNS:Publish",
  "Resource": "arn:aws:sns:RegionTopicIs:AccountTopicisIn:TopicName"
},
{
  "Sid": "__console_sub_0",
...​
```



2. Choose your integrator with Slack:
  * **Zapier** - SNS to Slack notification - [+Zapier AWS SNS to Slack Integration](https://paper.dropbox.com/doc/YuCVMrOWU9ea0Rm7HsxAP) 
  * **AWS Chatbot (Beta)** - [https://aws.amazon.com/chatbot/faqs/](https://aws.amazon.com/chatbot/faqs/)
3. Go to **Billing → Budget**Click on **Create Budget** → Select the kind of Budget you will be making.  You will have four choices:
  * Cost Budget - For Dollar Costs (the one we will select for this example)
  * Usage Budget - For monitoring usage thresholds of instances* Reservation Budget - Track the RI Utilization usage
  * Savings Plans Budget - Tracking the usage and coverage of Savings Plans
4. Click on the **Set your Budget Button** and fill the details
  * Name: e.g. Monthly Tech Support Costing Budget
  * Period: Monthly* Budget Effective Dates: Recurring Budget
  * Start Month: Current month (cannot backdate)
  * Budget Amount: Fixed (Can do Monthly budget planning, which allows you to set month by month increases to the budget)
  * Budgeted amount: Provide your budget for the account (note if you are planning on being alerted when projected cost reaches a threshold, you should factor this into your budget planning)
  * Budget Parameters - Leave default, but you will need to check Refunds and Credits 
6. Click on Configure Alerts → Fill in the Alert Information
  * Send alert based on: Select Forecasted costs (note: at least 5 weeks are required to generate an accurate Forecast)
  * Alert Threshold: Set by percentage, or fixed dollar amount* Check Mark: Notify via Amazon Simple Notification Service (SNS) topic
  * Add the ARN of the SNS topic created in Step 1


## How to use Cost Explorer

Cost explorer is a powerful tool for you to filter and look at various costs and utilization on your account, including how much of your Savings Plans are being used, or your Reserved Instances

A few items to note:
* The most recent two days in Cost Explorer are never accurate.  They will either over-report or under report.  You will need to allow for the last two days to “settle” before reading into them* Your filters may end up filtering your data, so please be careful of any that you have selected* Tagging is your friend.  If you have tagged your information sufficiently, then you will be able to sort and organize via the tagging any resources and costs to individuals

* Log in to your AWS Account* Go to Cost Explorer → Click on Launch Cost Explorer* From here you can build your various reports

### **Report to Show Cost Usage** **(Example**** is for Daily, MTD)**
****
Click on the Drop Down for the Date Range (1) and select the appropriate time
* 3M, 6M, 1Y will not include partial data from the current month, all others will* You can enable forecasting by using the + values, but they are not usually useful* I usually chose MTD (Month to Day) to start with, as you are usually trying to find your current progress* You can customize the days by clicking on the Calendars
* Select Daily from the units drop down (2)* Clear all filters (3) for now (you can customize them as necessary later)* Select Sort by Service (4).  You can chose different grouping choices depending on what you will need* You will then be able to see a breakdown on all services, per day, and their costs.  (5) Please note again, that the most recent two days will be inaccurate, and you should not count on them* Feel Free to Save this report to be used later (see upper left corner to save the report)
 


