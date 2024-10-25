---
title: Obscuring Last Names in Public Articles and Cases - Internal Users
---


To help with providing privacy options for Armory Employees, Support has added an option to obscure last names and how they are displayed.  This is to give options to employees so that their full names are not available publicly to be scraped from the site, in public articles.
This is a global change that will affect cases and articles all at once.  It cannot be changed just for KB articles and not for cases and vice versa.  
#### What was done
A new field on the ```sys_user``` table was created to show a ```Hide Full Name``` checkbox.   Once implemented, code will be implemented to change the displayed name so that only the final initial will be shown.  
For example, ```Jane Smith``` will be changed to ```Jane S.```


Once this checkbox is checked, the below code will run to calculate the value of the user's display name
```
if(current.u_hide_full_name == true) {
	var ephemeral = current.last_name.toString();
	current.first_name + ' ' + ephemeral[0] + ".";
}
```
This will concatenate the user's first name and last name and hide the last name anywhere the user is mentioned. This includes but is not limited to
* Table Queries on a sys_user reference field* Knowledge Article Authors* Case Assigned Users

By default, the ```Hide Full Name``` checkbox is unchecked. All internal users are free to check this for themselves if they wish to hide their full names in the ServiceNow platform.

