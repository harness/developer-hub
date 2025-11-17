---
title: PagerDuty - Setting up for New Users
---



### Administration to Setup User in the Pager Duty Queues

BlackMountain IT team will set up new hiring PagerDuty user account. 
 
Technical Support Team (currently everyone in Support team has manager level privilege) needs to enroll new hire’s account into Technical Support Team. 
 
The target on-call schedule enrolls after 6 weeks after the new hires starting date.
[https://armory.pagerduty.com/teams/PSUCQEP/users](https://armory.pagerduty.com/teams/PSUCQEP/users)
 

### Link your Account with ServiceNow

As a part of the process, once your account is created, it will need to be linked in ServiceNow.  The following are 
steps that need to be completed
* Each user needs to be mapped using their PagerDuty ID.  In each ```User``` object in Service Now, there is a ```PagerDuty ID```* To set this up, log in to **ServiceNow** as an **Admin*** Search for the **Users** sectionSearch for the Support Engineer and click on their Name.  Add the ```PagerDuty ID```
* The PagerDuty ID needs to match with the User’s ID in PagerDuty.  Once the User’s PagerDuty Account is created, the User’s ID (```P------```) needs to be added* Log in to PagerDuty* Find the User; an easy way to do this is to go to **People** → **Users** → and Search for the user* Click on the User, and then you’ll find their PagerDuty ID in the URL as per the screenshot below


* Add the ```PagerDuty ID``` in ServiceNow* Click **Update**, and the information will be now added, and the account will be linked.

### Set up PagerDuty Profile in PagerDuty portal (through OKTA)


#### Profile settings

In the PagerDuty Website, Click on your portrait in the upper right hand side → Click on My Profile. 
* Make sure you fill up all related information (on-call phone number, Email, etc)
* Go to your Contact Information Tab and ensure that the Mobile App Notifications are enabled (test as well)* Go to Notification Rules, make sure the high-urgency notification rule contains all trigger method (Phone call, push notify on phone, etc)
### Setting Up Slack
Please make sure that you have set up notifications to your preference for any alerts surrounding the user group ***@support-team-p0alerts***.  The general expectation is that when a message comes in to this group, it will be for a P0 case, and that the team should be all hands on that case as a high priority once the alert comes in, during regular Support work hours.
If that requires special exceptions on alerts for that group, please make the appropriate changes (such as notifying via sound to get your attention)

### If you are using an Android device:

To prevent any accidents where a P-0 may come in, but you are not alerted, please ensure you have gone through your PagerDuty Settings in the application and adjusted your
* System Notification Settings* High Urgency Notification Settings* High Urgency Override System Volume * High Urgency Override Do Not Disturb settings
 
**Note:** If you are an Android user, there is a large possibility that you cannot override your system volume on newer Android OS versions.  If you are in this camp, you may need to set up a macro in an application like Tasker.
 
For Tasker, an example of the logic to set up would be to increase the volume to MAX if an incoming call comes in from your PagerDuty contacts.  This way, when a call comes in via PagerDuty to alert you, it will notify you.  PagerDuty allows for the creation of a contact card in your Android which has all the possible incoming numbers from their service, and then a macro rule that you would set would be to basically maximize your volume if a call comes in from one of the numbers in the contact card
 
 
 
 
 
 
 
 

### If you are using an IOS device:

* You need to go to Settings → Notifications → PageDuty→ turn on Allow Notifications* In PagerDuty settings, you need to turn on `Push Notifications` and install the PagerDuty Contact Card. 

* Please note, for iOS users, installing the contact card allows you to enable an override for Do Not Disturb. and will ensure silencing unknown numbers doesn't affect calls from PagerDuty.

* Make tests through PagerDuty portal, and check if you can receive phone calls, notifications properly on your phone.

