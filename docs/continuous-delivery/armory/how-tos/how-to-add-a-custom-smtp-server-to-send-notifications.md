---
title: How to Add a Custom SMTP Server to Send Notifications
---

## Introduction
The [spinnaker.io](http://spinnaker.io/) docs go over basic configuration for how to setup notifications within Spinnaker however, it does not cover the use case of using a custom SMTP server and how to configure it.

## Prerequisites
Have an existing SMTP server to use to send notifications.

## Instructions
The following provides examples about adding the modifications to the deployment manifest in Halyard and Operator1. To enable notifications, add the below snippet to your ```echo.yml``` file if you are using Halyard. In Operator, this should go in the ```profiles-patch.yml``` file under the echo section.Note that the properties section of your server configuration should match your server set up.  These can usually be found from an administrator or from the information from the public site.  Below are some examples for gmail.In addition, if the SMTP server does not have a user for authentication, **the auth option needs to be set to false  and the username/password fields should be left blank or removed**.
```
        mail:
          enabled: true
          from: # Name of the email
        spring:
          mail:
            host: # Typically this is something like smtp.gmail.com but, an IP address will also work
            username: # Enter the SMTP server's user email
            password: # Enter the SMTP server's user password
            port: 587 # Match the port depending on the protocol
            properties:
              mail:
                smtp:
                  auth: true
                  starttls:
                    enable: true
                transport:
                  protocol: smtp
                debug: true
```
2. Add the below snippet to the ```settings-local.js``` file
```
          window.spinnakerSettings.notifications = window.spinnakerSettings.notifications || {};
          window.spinnakerSettings.notifications.email = window.spinnakerSettings.notifications.email || {};
          window.spinnakerSettings.notifications.email.enabled = true;
```
