---
title: Enable Basic Form Authentication for Spinnaker via Halyard
---


If you want to enable Simple Auth for Spinnaker using Halyard: Create/update the ```.hal//profiles/gate-local.yml``` file, with these contents:
```
security.basicform.enabled: true
spring:
  security:
    user:
      name: 
      password: 
```

And then create/update the ```.hal//profiles/settings-local.js```, with these contents
```window.spinnakerSettings.authEnabled = true;```

Then, apply your change with ```hal deploy apply```.
To access Spinnaker, you will be prompted with a simple form to enter the username and password.

