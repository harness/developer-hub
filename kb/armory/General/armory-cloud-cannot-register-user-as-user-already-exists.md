---
title: Armory Cloud - Cannot Register User as User Already Exists (status code 409)
---

## Issue
**Early Access****As part of participating in an early access program, you will receive information from Armory that is not yet publicly available and is subject to your NDA or confidentiality obligations with Armory.**
Administrators attempting to register new users in their Armory Cloud instance may find that they receive an error when attempting to add them through the console.  The message advises: ```Request failed with status code 409: The user already exists: Error ID: [uuid of instance]```
Customers cannot find the user in their user list, and if the user in question attempts to log in, they are able to, but do not see anything, or have a blank login.  Even after resetting passwords, they still see the same results.
 


## Cause
The main cause is because a user has been associated with an incorrect account.  This will mainly happen as a result of a user attempting to register an account and signed up in the [Armory Cloud signup page](https://console.cloud.armory.io/signup), and did not provide the exact spelling of the Company as registered with Armory. 
For example, the company could be registered as ```ACME``` with Armory, but the person entered ```ACME Inc``` instead
As a result, the user is registered with Armory, and cannot be re-invited, and if attempting to sign in, they will not see any data because the company does not exist within Armory records
 


