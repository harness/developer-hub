---
title: ServiceNow - Allowing Customers to See Tickets Across Organization Divisions
---


Customers (e.g. Apple) may want their team to be able to see all tickets that are opened across the entire Apple Organization when they are logged in and looking at their (ServiceNow) Company's tickets. 
In Apple's case, they have quite a few divisions:
Apple - ACSApple - CloudTechApple - JMETIn this example, user Ravi who is a part of CloudTech needs to be able to see all tickets across Apple.  Likewise, all users in JMET will be able to see all tickets across all Apple divisions when using the user view to manage their organization's tickets in ServiceNow
Austin created a business rule that allows this to happen.  To set this for an organization, they need will need
* Multiple Accounts Created ([https://support.armory.io/support?id=kb_article_view&sysparm_article=KB0010283](https://support.armory.io/support?id=kb_article_view&sysparm_article=KB0010283)) (In this example, Apple - ACS, Apple - CloudTech, Apple - JMET were all created)* A Master Organization Account needs to be created, but ***it should not*** have the ```Customer checkbox``` checked ([https://support.armory.io/support?id=kb_article_view&sysparm_article=KB0010283](https://support.armory.io/support?id=kb_article_view&sysparm_article=KB0010283)) (In this example, Apple was created)
Once this is done, perform the following for each account
* Log in to the ServiceNow Backend* Find the ```Account``` for each division (e.g. Apple - ACS)* In the ```Parent``` field, add the Master Organization account (e.g. Apple)* Save and Update* Do the same for each other Division (e.g. Apple - CloudTech, Apple - JMET)


