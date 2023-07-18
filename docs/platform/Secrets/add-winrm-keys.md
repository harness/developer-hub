---
title: Add WinRM keys
description: This topic explains how to add and use WinRM secrets.
sidebar_position: 4
---

Use these steps to add a WinRM credential key that can be referenced in Harness entities.

You can add WinRM credentials when creating connectors and other account or project resources, or you can select **Secrets** under **Account/Organization/Project Setup** and create an **WinRM Credential** secret.

Configure the **WinRM Credential** settings as follows.

1. Enter a **Name** for the WinRM credential and select **Continue**.
2. Under **Select an Auth Scheme**, select one of the following:

   * **[NLTM](https://learn.microsoft.com/en-us/windows-server/security/kerberos/ntlm-overview)**
  
     Enter the following authentication details:  
     1. **Domain**: Enter the Active Directory domain name where the user account in the credential is registered.
     2. **Username**: Enter the username for this connection. The user must belong to the same Active Directory domain as the Windows instances that this connection uses. These are the same user account credentials you would use to log into the VM using a remote connection such as Microsoft Remote Desktop.
     3. **Password**: Create of select an an existing [Encrypted file secret](./3-add-file-secrets.md) that contains the relevant WinRM key file.
     4. **Use SSL**: (Recommended) Select to enable an HTTPS connection instead of an HTTP connection. 
     5. **Skip Cert Check**: Select to skip certificate check. When connected over an HTTPS connection, the client doesn't validate server certificate. 
     6. **WinRM Port**: Leave the default port **5986** or enter a new port if needed. 
   * **[Kerberos](https://learn.microsoft.com/en-us/windows-server/security/kerberos/kerberos-authentication-overview?source=recommendations)** (recommended)
     
     
     :::info
     You must add the Kerberos startup script to the Harness Delegate YAML for the connection to succeed.

     <details>
     <summary>Add the Kerberos startup script to the delegate YAML</summary>

     1. Open the `delegate.yaml` in a text editor.
     2. Locate the environment variable `INIT_SCRIPT` in the `Deployment` object.
        ```
        - name: INIT_SCRIPT  
        value: ""  
        ```
     3. Replace `value: ""` with the following script
     
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
            default_realm = WINRM.INTERNAL
            dns_lookup_realm = true
            ticket_lifetime = 24h
            renew_lifetime = 7d
            forwardable = true
            rdns = false
        [realms]
          WINRM.INTERNAL = {
            kdc = "DC01.WINRM.INTERNAL"
            admin_server = "DC01.WINRM.INTERNAL"
            default_domain = "WINRM.INTERNAL"
            master_kdc = "DC01.WINRM.INTERNAL"
          }
        [domain_realm]
          .winrm.internal = WINRM.INTERNAL
        EOT
        echo '3.83.239.167 ec2-3-83-239-167.compute-1.amazonaws.com EC2AMAZ-L2O9PUA.WINRM.INTERNAL' >> /etc/hosts
        echo '54.225.189.86 ec2-54-225-189-86.compute-1.amazonaws.com DC01.WINRM.INTERNAL' >> /etc/hosts
        echo 'Harness@123456' | kinit Administrator@WINRM.INTERNAL
        klist
     ```
     </details>

     :::
     
     Enter the following authentication details:  
     1. **Principal**: Enter the account name associated with the Kerberos account. 
     2. **Realm**: Enter a realm. Realm is the logical network served by a single Kerberos database and a set of Key Distribution Centers (KDCs).
     3. **Use SSL**: (Recommended) Select to enable an HTTPS connection instead of an HTTP connection. 
     4. **Skip Cert Check**: Select to skip certificate check. When connected over an HTTPS connection, the client doesn't validate server certificate. 
     5. **WinRM Port**: Leave the default port **5986** or enter a new port if needed. 
     6. **TGT Generation**: (Optional) Select one of the following options. Select none of the options to skip TGT generation.
        * **Key Tab File**: Generates a new TGT from the KDC every time you authentication with the service.
        * **Password**: Use Harness [Encrypted text secrets](./2-add-use-text-secrets.md) to save the password and refer to it using this option.

3. Select **Save and Continue**.
4. Enter a **Host Name** of the remote server you want to connect to. For example, if it is an AWS EC2 instance, it might be something like `ec2-54-175-135-106.compute-1.amazonaws.com`.
5. Select **Test Connection**.

   If the test is unsuccessful, you might see an error stating that no Harness Delegate could reach the host, or that a credential is invalid. Make sure that your settings are correct and that a Harness Delegate is able to connect to the server.

6. When the test succeeds, select **Finish** to save the WinRM credential.
