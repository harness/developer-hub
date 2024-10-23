---
title: ServiceNow - Add New Version of Spinnaker
---


Adding Versions to ServiceNow and Jira need to be done anytime a new major version of Spinnaker is created.
ServiceNow Changes
Only ServiceNow Admins can perform this change
Change your Application to ```Global``` 
* Click on the Gear in the upper right* Click on the Developer Tab* Chose the Application ```Global``` from the drop down
* The first thing to do is to go to the [Dictionary Entry for the Armory Version in Service Now](https://support.armory.io/sys_dictionary.do?sysparm_referring_url=sn_customerservice_case.do%3Fsys_id%3D82bfa58edb18349079f53ec8f49619f4%4099%40sysparm_record_rows%3D4%4099%40sysparm_view%3Darmory_support%4099%40sysparm_record_target%3Dsn_customerservice_case%4099%40sysparm_record_list%3Dassigned_toISEMPTY%255EORassigned_to%253D2a48f6742f042010bd855d8b2799b6c1%255Estate%2521%253D3%255Estate%2521%253D5%255Estate%2521%253D-5%255Eassigned_to%253D2a48f6742f042010bd855d8b2799b6c1%255EORDERBYassignment_group%4099%40sysparm_record_row%3D1&sysparm_view=armory_support&sysparm_query=name%3Dtask%5Eelement%3Du_armory_version&sysparm_query_encoded=name%3Dtask%5Eelement%3Du_armory_version)* Scroll to the bottom and click on ```Choices``` tab. Note the biggest Sequence numberClick New
* Table: Task [task]* Sequence: Make it ```3```* Element: u_armory_version* Language: en* Label: 2.xx.x (e.g. 2.26.x)* Value: Same as in 4e* Click on Submit
* The new value should be in the listChange your Application to ```Customer Service```Click on the Gear in the upper right
* Click on the Developer Tab* Chose the Application ```Customer Service``` from the drop down
* Back in the [Dictionary Entry for the Armory Version in Service Now](https://support.armory.io/sys_dictionary.do?sysparm_referring_url=sn_customerservice_case.do%3Fsys_id%3D82bfa58edb18349079f53ec8f49619f4%4099%40sysparm_record_rows%3D4%4099%40sysparm_view%3Darmory_support%4099%40sysparm_record_target%3Dsn_customerservice_case%4099%40sysparm_record_list%3Dassigned_toISEMPTY%255EORassigned_to%253D2a48f6742f042010bd855d8b2799b6c1%255Estate%2521%253D3%255Estate%2521%253D5%255Estate%2521%253D-5%255Eassigned_to%253D2a48f6742f042010bd855d8b2799b6c1%255EORDERBYassignment_group%4099%40sysparm_record_row%3D1&sysparm_view=armory_support&sysparm_query=name%3Dtask%5Eelement%3Du_armory_version&sysparm_query_encoded=name%3Dtask%5Eelement%3Du_armory_version)In the Choices Tab, click on New
* Table: Case [sn_customerservice_case]* Sequence: Use the same number established in step 4b* Element: u_armory_version* Language: en* Label: Use the same number established in step 4e* Value: Use the same number established in step 4f* Click on Update
Reorganize the sequence of the values. 
* The previous versions should move down in sequence (both the value in the ```Case table``` and in the ```Tasks Table```).* Versions that are now out of should be moved into the ```1xxx``` sequence order.  Please follow the pattern (e.g. When ```2.28.x``` is added, ```2.25.x``` should move to ```1910)```

 
Jira Changes
* Go to Projects → Armory Support* Click on Project Settings (left menu)* Click on Fields (left menu) → Click on Actions → Edit Fields* Click on Custom Fields (left nav bar menu) → Find ```Armory Version``` → Click on three dots and Click on ```Contexts and Default Values```* Click on Edit Options → Add the new Value (e.g. 2.26.x) Click on Add Value* Move Value to the top

