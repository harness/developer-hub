---
title: ServiceNow - Customer Account/Company Creation
---


To create an account, you will need to add the organization account both in ServiceNow and in Jira.  This is so that case, when created, will refer to the correct organization when synchronizing across both systems.
 
 
* Go to ServiceNow Admin Portal* Head to the Accounts page under Customer ServiceClick on the "New" button
* **Name:** Official name for the company,* **Install Type:** if they will be managed/self-installed. Most will be Self-Installed with the future transition to Managed.* **Customer:** Checked* **Premium**: If customer has Premium Enterprise support, please check (SLAs and responses)* **CDaaS:** If the customer has a CDaaS license, please check* **Account Owner:** AE who is involved (check Salesforce)* **Technical Account Manager**: TAM who is involved (check Salesforce)* **JIRA ID**: Required for the Sync (see below about filling it out)* **Saleforce ID**: Required for Sync of TAM/AE (see below about filling it out)* **Slack Customer Channel/War Room Channel**: Required to post messages in the customer War Room for new cases (see below about filling it out)* **Parent** (Optional): This is required only for those companies where they wish all users to be able to see all tickets across the company.  (e.g. Apple)
Log into Jira
* Click on the top menu, Projects → Support* In the left menu, click on Customers → Click on Add Organizations* In the Dropdown field, past the exact same name used in step 3a. This should be Case Sensitive.* Click on the Create New option underneath, and click on the Add button* Click on the Organization's name in the list. In the URL, you'll see a number after the organization portion in the path. This is the** JIRA ID*** Add the Account to BOB Issues as well* Click on the Gear icon (Next to your portrait) -> Issues -> Custom Fields* Search for ```Customer``` -> Click on ```...``` -> Select ```Context and Default Value``` -> Click ```Edit Options```* Add the new value to the list (Scroll to the bottom, fill in the field, and click on Add)
* Add this number to SNOW (see Step 3e).* Update the Customer Account record/Save itOpen the account again and add Salesforce Information (Allows for AE/TAM sync via Zapier)
* Ask a Salesforce Admin (e.g. Kinnon) to go into Salesforce and find the Customer account* Copy the SysID from Service now (Click on the ```Hamburger``` in the Upper Left corner -> Select ```Copy SysId```)* Add this value to the equivalent account in the ```ServiceNow Sys ID``` field.  Click ```Save``` in the Salesforce Account* Copy the Salesforce ID from the URL* Add this value to the account's ```Salesforce ID``` field* Update the Customer Account record/Save it
Add the Slack Channels
* Find the Customer's Slack Channel.  Each Customer must have a War Room, but they may not have a Custome Facing channel* Right click on the ```Channel``` -> Click on ```Copy``` -> Click on ```Copy Link```* Isolate the Channel ID.  For example the ```CMEHUF72A``` portion of ```https://cloud-armory.slack.com/archives/CMEHUF72A``` in the Support Channel Link* Add it to the account's ```Slack Customer WR``` or ```Slack Customer CH``` field* Update the Customer Account record/Save it

Note, it is also possible that depending on the organization, it may be necessary to set up a series of accounts that allow users to see tickets of the same organization: [https://support.armory.io/support?id=kb_article&sysparm_article=KB0010307](https://support.armory.io/support?id=kb_article&sysparm_article=KB0010307)
 

