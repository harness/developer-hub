---
title: How to specify an application Owner with Dinghy
---

## Introduction
When defining an application spec with Dinghy - the user would like to specify the ```Owner field```, sometimes referred to as the ```e-mail field``` in the Applications view.

## Prerequisites
Fully configured and enabled Dinghy service:
[https://docs.armory.io/docs/armory-admin/dinghy-enable/](https://docs.armory.io/docs/armory-admin/dinghy-enable/)

## Instructions
The parameter to set Owner field when creating an application with Dinghy is "email". It should reside within the "spec" configuration section of the Dinghyfile:
```"spec": {```
```"email": ""```
```},```
[https://docs.armory.io/docs/spinnaker-user-guides/using-dinghy/#basic-format](https://docs.armory.io/docs/spinnaker-user-guides/using-dinghy/#basic-format)

