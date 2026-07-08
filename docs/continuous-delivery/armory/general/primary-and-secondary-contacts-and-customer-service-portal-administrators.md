---
title: Primary and Secondary Contacts and Customer Service Portal Administrators
---


Primary and Secondary Contacts are the users that are listed within a [customer account](https://armory.service-now.com/customer_account_list.do?sysparm_userpref_module=25f7d04cc322310015519f2974d3ae43&sysparm_view=case&sysparm_query=customer%3Dtrue%5EEQ&sysparm_clear_stack=true) (ServiceNow Admin access required).  These are the contacts outlined by the company as their main administrators, and points of contact for Armory.  We will use these contacts for any communications such as for NPS surveys and any other issues that we must contact them about (e.g. security items/alerts)
Customer accounts can have more than 2 administrators as long a user is a part of the ```[Armory - Customer Administration](https://armory.service-now.com/sys_user_group.do?sys_id=f552d87edb86281079f53ec8f4961979&sysparm_record_target=sys_user_group&sysparm_record_row=4&sysparm_record_rows=24&sysparm_record_list=ORDERBYname) ```group.  
### What are Customer Service Portal Administrators?
Administrators will manage the user accounts and will be the point of user security/contact for an account.  The idea is that the Administrators will be responsible for maintaining the health of their users on their account.  We are providing this self management so that companies can add and remove access for their users as necessary, so that we don't have to be administrative bottlenecks.  This also keeps the security and access update responsibilities with our accounts instead of making it an Armory responsibility.  
### What are the Administrators Additional Abilities?
On the surface, they have the ability to add user accounts, and also to disable/re-enable accounts.  However, because users are able to request changes for their environments to Managed/Armory Cloud, and ask for additional information about their accounts, there is a potential for malicious attack via user access.  Administrators can therefore, also audit their user lists as well. 
Administrators can also assign additional administrators to the account.
### What will our responsibilities be?
Largely, we will be administering the Administrators.  This will lessen the burden for CS in General.
### Why have we moved from Self Registration to Self Service?
From a security standpoint, for SOC compliance, the general burden of auditing whether a particular user is supposed to have a level of access, or still have access is now up to the client.  It's no longer going to be necessary for Armory to send them an audit notice to check the people that they have assigned to have access.   For example, if customers could self register, we would normally provide the company a list of users, and ask them to check it, once every year or so, depending on the cadence. 
Now, with the way the access has been set, it is within the customer's power to remove access for an employee who has left their organization.  This fits better with their own security needs
#### What security issues does this help prevent? 
For managed services especially, people who have access to the ticketing system have access to request a change in their environment.  If the access was left open for anyone in the company to get access, this can potentially mean a bad actor could gain access and request a detrimental change to their environment (Speaking as a worst case scenario)
Similarly, we could end up providing information as support, to unauthorized personnel.  (Speaking as a worst case scenario again)
Keep in mind that if the customer has a massive list of changes, that we can still assist with creating those accounts.  We would just require a list including first and last names and email addresses.  
## Adding/Editing Primary & Secondary Administrators 

If a primary and secondary contact needed to be added to a customer account, they will need to be added via the customer account.  **Any changes should be recorded in Slack or a Ticket.  If a customer wants to edit the administrators, please confirm if the people being removed should still be administrators or not.** If they need to be removed, follow the instructions further below
* Log in to the Service Now portal, and proceed to the Service Management Administration console* Search for ```Accounts``` in the left navigation menu* Under ```Customer Service```, there is a section called ```Accounts```* Find the Customer's Account by name.  Click on it* There are two fields.  The ```Primary Contact``` and the ```Secondary Contact```.  For either one, click on the Magnifying Glass* Click on the name of the user that will be the contact.  * Click on the ```Update``` Button* A message will appear on the screen confirming the update is processed and that the roles were added to the user's account.* Advise the user and have them test and see if they have access to **Manage Accounts** from the main portal page.  You can also use the "Impersonate User" function to test, if you have Service Now Administrative Priviledges
## Adding Additional Administrators
If a primary and secondary contact are already added to a customer account, and they wish to have more administrators, then we will need to add them manually to the Group.  **Any changes should be recorded in a ticket or in Slack for the purpose of documentation**
* Log in to the Service Now portal, and proceed to the Service Management Administration console* Search for **Groups** in the left navigation menu* Under **User Administration**, there is a section called **Groups*** Find the ```Armory - Customer Administration``` Group.  Click on it* Go to the **Group Members** Tab* Click **Edit**.  Find the user and add them to the **Group Members List** (Right pointing arrow). Click on **Save*** Click on the **Update** Button
## Removing Administrators
Removing a Primary and Secondary contact will not remove their administrative access.  Disabling their login will stop their access.  If a customer needs to change their contacts, **please also confirm if they wish for those contacts to remain administrators or not**.  **This interaction should be recorded in a ticket for documentation purposes**
* Log in to the Service Now portal, and proceed to the Service Management Administration console* Search for **Groups** in the left navigation menu* Under **User Administration**, there is a section called **Groups*** Find the ```Armory - Customer Administration``` Group.  Click on it* Go to the **Group Members** Tab* Click **Edit**.  Find the user and remove them to the **Group Members List** (Left pointing arrow). Click on **Save*** Click on the **Update** Button
 


