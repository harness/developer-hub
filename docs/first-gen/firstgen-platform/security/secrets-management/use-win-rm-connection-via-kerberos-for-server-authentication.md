---
title: Create WinRM Connection Using Kerberos
description: Harness supports WinRM authentication using Kerberos, enabling you to connect to a target host via the Kerberos protocol.
# sidebar_position: 2
helpdocs_topic_id: fqrimyi94t
helpdocs_category_id: o9x167at52
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness supports WinRM authentication using Kerberos, enabling you to connect to a target host via the Kerberos protocol. For a quick Kerberos summary, see [Explain like I’m 5: Kerberos by Lynn Root](https://www.roguelynn.com/words/explain-like-im-5-kerberos/).

In this topic:

* [Before You Begin](#before_you_begin)
* [Limitations](#limitations)
* [Step 1: Add SPN to the Active Directory Server](#step_1_add_spn_to_the_active_directory_server)
* [Step 2: Access WinRM Configuration](#step_2_access_win_rm_configuration)
* [Step 3: Display Name](#step_3_display_name)
* [Step 4: Auth Scheme](#step_4_auth_scheme)
* [Step 5: Username](#step_5_username)
* [Step 6: Domain](#step_6_domain)
* [Step 7: TGT Generation](#step_7_tgt_generation)
* [Step 8: Keytab File Path](#step_8_keytab_file_path)
* [Step 9: Advanced Options](#step_9_advanced_options)
* [Step 10: Test the Connection](#step_9_test_the_connection)

### Before You Begin

* See [Harness Key Concepts](../../../starthere-firstgen/harness-key-concepts.md).
* See [Secrets Management Overview](secret-management.md).
* Make sure you can generate TGT using `kinit` command on the machine where the Delegate is running. For more information about `kinit` command, see [kinit documentation](https://web.mit.edu/kerberos/krb5-1.12/doc/user/user_commands/kinit.html).

### Limitations

There are some corner use cases which Harness does not support because of how Java and Python interact, and as a result of limitations in Windows:

* The equals character (=) is not supported in the name of a Harness Service Config Variable or Environment Service Variable Override. See [Add Service Config Variables](../../../continuous-delivery/model-cd-pipeline/setup-services/add-service-level-config-variables.md) and [Override a Service Configuration in an Environment](../../../continuous-delivery/model-cd-pipeline/environments/override-service-files-and-variables-in-environments.md).
* The underscore character (\_) is not supported in the working directory for Service Commands and their shell scripts. See [Create Default Application Directories and Variables](../../../continuous-delivery/model-cd-pipeline/applications/set-default-application-directories-as-variables.md) and [Use Script Based Services](../../../continuous-delivery/model-cd-pipeline/setup-services/use-script-based-service.md).
* Harness has the same limitations as Windows environment variables. Harness treats all Service Config Variables and Environment Service Variable Overrides as Windows environment variables.
* Non-UTF8 characters are not supported in Service Config Variables and Environment Service Variable Overrides. For example, `äöü!ÖÜÄéÊêÈèç`.
* Harness has limited support for quotes in Service Config Variables and Environment Service Variable Overrides. A simple use such as `foo'bar` will work, but a complex combination of single quotes and other characters such as backslash (\) might not work.
* Harness does support variable values ending in three or more slashes.
* Secrets cannot contain special characters without escaping. For example, if the secret contains a `$` like `ab$c` it will fail.  
Escape any special characters in your secrets: `ab\$c`.

### Step 1: Add SPN to the Active Directory Server

Make sure you add the Service Principal Name to the Active Directory as follows using the **setspn** command:


```
WSMAN/<Fully Qualified Domain Name>@<REALM>  
HTTP/<Fully Qualified Domain Name>@<REALM>  
HTTP/<Fully Qualified Domain Name>  
WSMAN/<Fully Qualified Domain Name> 
```
For more information about setting the SPN using the setspn command, see [Microsoft’s Setspn documentation](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2012-r2-and-2012/cc731241(v=ws.11)).

For example, if the fully qualified domain name is `221.213.188.35.bc.googleusercontent.com` and the Realm name is `KERBEROS.LOCAL` then add the following:


```
WSMAN/251.200.188.35.bc.googleusercontent.com@KERBEROS.LOCAL  
HTTP/251.200.188.35.bc.googleusercontent.com@KERBEROS.LOCAL    HTTP/251.200.188.35.bc.googleusercontent.com  
WSMAN/251.200.188.35.bc.googleusercontent.com
```
### Step 2: Access WinRM Configuration

In Secrets Management, under Execution Credentials, click **WinRM Connection**.

Click **Add WinRM Connection**.

The WinRM Connection Attributes dialog appears.

### Step 3: Display Name

Name to identify the connection. You will use this name to identify this connection when setting up the Connection Attributes in the environment Service Infrastructure.

### Step 4: Auth Scheme

Select **Kerberos**.

### Step 5: Username

Username is a string that names a specific entity to which a set of credentials may be assigned. Enter the account name associated with the Kerberos account, such as **johndoe**.

### Step 6: Domain

Domain is the logical network served by a single Kerberos database and a set of Key Distribution Centers (KDCs). This is where the service (that the user is trying to authenticate with) is located.

For example: **US-EAST-2.COMPUTE.INTERNAL**.

The target hosts that your WinRM connection is intending to authenticate with via Kerberos are located in a domain name with the same name you enter in **Domain**.

For example, **ip-172-31-44-168.us-east-2.compute.internal**. The domain naming convention is all uppercase letters to differentiate the domain from the internet domain, but the **Domain** field does not enforce the convention.

### Step 7: TGT Generation

You can choose this option to generate a new TGT from the KDC every time you authenticate with the service. This ensures that the TGT is always valid and not expired when you try to authenticate.

Select one of the following options:

* **Key Tab File Path (on Delegate)** - Enter the path to the KeyTab present in the Delegate for TGT generation.
* **Password** - Enter a password for TGT generation.

### Step 8: Keytab File Path

This field is displayed if you select **Key Tab File Path** for **TGT Generation**. Enter the file path to the keytab file on the server running the Harness Delegate. For example, **/home/johndoe/a.keytab**. The file is not uploaded to Harness.

To use the Kerberos WinRM connection to connect to a target host, you select it in **WinRM Connection Attributes** while specifying the target host in the Service Infrastructure/ Infrastructure Definition settings of an environment.

In this example, the target host that you want to use Kerberos authentication with is entered in Host Name(s).

Note that the domain name used to identify the hosts in the **Host Name(s)** field is likely to be the same as the domain name you entered in **Domain** when configuring the WinRM connection.

The Host Name cannot be an IP address and it should be a domain name. The connection will not succeed if it is an IP address.

### Step 9: Advanced Options

See the Advanced Options settings in [Add WinRM Connection Credentials](add-win-rm-connection-credentials.md).

### Step 10: Test the Connection

Click **Test** to ensure that the connection is successful. Once the connection is successful, click **Submit**.

