---
title: Add WinRM keys
description: Learn how to add and use WinRM secrets.
sidebar_position: 4
---

Use these steps to add a WinRM credential key that can be referenced in Harness entities.

You can add WinRM credentials when creating connectors and other account or project resources. Or, you can select **Secrets** under **Account/Organization/Project Setup** and create a WinRM credential secret.

Configure the **WinRM Credential** settings as follows:

1. Enter a **Name** for the WinRM credential and select **Continue**.
2. Under **Select an Auth Scheme**, select one of the following:

   * **[NLTM](https://learn.microsoft.com/en-us/windows-server/security/kerberos/ntlm-overview)**
  
     Enter the following authentication details:  
     1. **Domain**: Enter the Active Directory domain name with which the user account in the credential is registered.
     2. **Username**: Enter the user name for this connection. The user must belong to the same Active Directory domain as the Windows instances that this connection uses. These are the same user account credentials you would use when logging in to the VM through an application such as Microsoft Remote Desktop.
     3. **Password**: Create or select an existing [encrypted file secret](./3-add-file-secrets.md) that contains the relevant WinRM key file.
     4. **Use SSL**: (Recommended) Select to enable an HTTPS connection instead of an HTTP connection. 
     5. **Skip Cert Check**: Select to skip the certificate check. When connected over HTTPS, the client doesn't validate the server certificate. 
     6. **WinRM Port**: Leave the default port or enter a new port if needed.

        :::info

        The default port for SSL is **5986**. If you haven't selected the **Use SSL** option, the default port is **5985**. Harness switches ports depending on whether or not SSL is enabled.

        :::
   * **[Kerberos](https://learn.microsoft.com/en-us/windows-server/security/kerberos/kerberos-authentication-overview?source=recommendations)** (recommended)
     
     
     :::info
     You must add the Kerberos startup script to the Harness Delegate YAML for the connection to succeed.

     <details>
     <summary>Add the Kerberos startup script to the delegate YAML</summary>

     1. Open `delegate.yaml` in a text editor.
     2. Locate the environment variable `INIT_SCRIPT` in the `Deployment` object.
        ```
        - name: INIT_SCRIPT  
        value: ""  
        ```
     3. Replace `value: ""` with the following script:
    
        :::info
    
        Make sure to use the actual Kerberos domain values, host IP, and password in the following script.
    
        :::
  
        ```
        - name: INIT_SCRIPT
          value: |-
           # Set up kerberos
           microdnf update
           microdnf install vim
           microdnf install yum
           microdnf install -y yum-utils
           yes | yum install krb5-workstation krb5-libs
           truncate -s 0 /etc/krb5.conf
           cat <<EOT >> /etc/krb5.conf
           [logging]
               default = FILE:/var/log/krb5libs.log
               kdc = FILE:/var/log/krb5kdc.log
               admin_server = FILE:/var/log/kadmind.log
           [libdefaults]
               default_realm = KERBEROS.DOMAIN
               dns_lookup_realm = true
               ticket_lifetime = 24h
               renew_lifetime = 7d
               forwardable = true
               rdns = false
           [realms]
             KERBEROS.DOMAIN = {
               kdc = "SERVER_NAME.KERBEROS.DOMAIN"
               admin_server = "SERVER_NAME.KERBEROS.DOMAIN"
               default_domain = "KERBEROS.DOMAIN"
               master_kdc = "SERVER_NAME.KERBEROS.DOMAIN"
             }
           [domain_realm]
             .KERBEROS.DOMAIN = KERBEROS.DOMAIN
           EOT
           echo 'host_ip host_name SERVER_NAME.KERBEROS.DOMAIN' >> /etc/hosts
           echo 'password' | kinit USERNAME@KERBEROS.DOMAIN
           klist
        ```
     
     
     </details>

     :::
     
     Enter the following authentication details:  
     1. **Principal**: Enter the account name associated with the Kerberos account. 
     2. **Realm**: Enter a realm. A realm is a logical network served by a single Kerberos database and a set of Key Distribution Centers (KDCs).
     3. **Use SSL**: (Recommended) Select to enable an HTTPS connection instead of an HTTP connection. 
     4. **Skip Cert Check**: Select to skip certificate check. When connected over an HTTPS connection, the client doesn't validate the server certificate. 
     5. **WinRM Port**: Leave the default port or enter a new port if needed.
  
        :::info

        The default port for SSL is **5986**. If you haven't selected the **Use SSL** option, the default port is **5985**. Harness switches ports depending on whether or not SSL is enabled.

        :::
     6. **TGT Generation**: Select one of the following options:
        * **Key Tab File**: Generates a new TGT from KDC every time you authenticate with the service.
        * **Password**: Use Harness [encrypted text secrets](./2-add-use-text-secrets.md) to save the password and refer to it using this option.

3. Select **Save and Continue**.
4. Enter the **Host Name** of the remote server you want to connect to. For example, if the server is an AWS EC2 instance, the host name might be similar to `ec2-54-175-135-106.compute-1.amazonaws.com`.
5. Select **Test Connection**.

   If a message appears stating that no Harness Delegate could reach the host, or that a credential is invalid, verify that your settings are correct, and your Harness Delegate is able to connect to the server.
6. After the test succeeds, select **Finish** to save the WinRM credential.
