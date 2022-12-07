---
title: Add SMTP Collaboration Provider
description: Add an SMTP server to Harness, to collaborate and share deployment info with users and groups via email.
# sidebar_position: 2
helpdocs_topic_id: 8nkhcbjnh7
helpdocs_category_id: ll7h8ktlwe
helpdocs_is_private: false
helpdocs_is_published: true
---

Add your SMTP server as a Harness Collaboration Provider, to use email for deployment notifications, approvals, and tracking. In this topic:

* [Before You Begin](#before_you_begin)
* [Limitations](#limitations)
* [Step 1: Add Collaboration Provider](#add_provider)
* [Step 2: Type](#type)
* [Step 3: Display Name](#display_name)
* [Step 4: Host](#host)
* [Step 5: Port](#port)
* [Step 6: SSL](#ssl)
* [Step 7: Start TLS](#start_tls)
* [Step 8: From Address](#from_address)
* [Step 9: Username](#username)
* [Step 10: Password](#password)
* [Step 11: Usage Scope](#usage_scope)
* [Step 12: Test and Save](#test_save)
* [Next Steps](#next_steps)


### Before You Begin

* [Add Collaboration Providers](/article/cv98scx8pj-collaboration-providers)


### Limitations

Configuring your SMTP server is required only if you are using [Harness On-Prem](/article/gng086569h-harness-on-premise-versions), or if you wish to use your own SMTP server instead of the Harness SaaS default SMTP option.


### Step 1: Add Collaboration Provider

Start adding a Collaboration Provider to Harness as follows:

1. Click **Setup**.
2. Click **Connectors**.
3. Click **Collaboration Providers**.
4. Click **Add Collaboration Provider**. This opens the default Collaboration Provider settings, which you will configure in the following steps.


### Step 2: Type

In **Type** select **SMTP**. The SMTP settings appear.

![](https://files.helpdocs.io/kw8ldg1itf/articles/8nkhcbjnh7/1587764186163/image.png)
### Step 3: Display Name

In **Display Name**, enter a unique name for this Collaboration Provider.


### Step 4: Host

In **Host**, enter the SMTP server's URL.


### Step 5: Port

Enter the port number on which the SMTP server is listening (typically, `25`).


### Step 6: SSL

Select this option for secure connections (SSL/TLS).


### Step 7: Start TLS

Select this option to enable SMTP over TLS, or when the connection is upgraded to SSL/TLS using `STARTTLS`.


### Step 8: From Address

Enter the email address from which Harness will send emails.


### Step 9: Username

Enter the username for the email account.


### Step 10: Password

In **Select Encrypted Password**, select or create a new [Harness Encrypted Text secret](/article/ygyvp998mu-use-encrypted-text-secrets) for the email account password.


### Step 11: Usage Scope

Usage scope is inherited from the secret you entered in **Select Encrypted Password.**


### Step 12: Test and Save

1. Click **Test** to check your configuration.
2. When the test is successful, click **Submit** to save your SMTP Collaboration Provider.


### Next Steps

* For details about Harness email notifications, see [User Notifications and Alert Settings](/article/kf828e347t-notification-groups).

