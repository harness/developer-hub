---
title: SSH Credentials API
description: Sample GraphQL queries to create, read, update, and delete Harness secrets that manage SSH keys.
sidebar_position: 250
helpdocs_topic_id: v65okfwfl2
helpdocs_category_id: l2p3i03l4a
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic lists sample queries for CRUD operations that create, read, update, and delete [Harness secrets](../../security/secrets-management/secret-management.md) that manage SSH keys.

:::note
The `!` following the type means that this field is *required*.
:::

## Before You Begin

* [​Introduction to Harness GraphQL API](harness-api.md)
* [Harness API Explorer](harness-api-explorer.md)

## Get a Secret

This sample retrieves an existing SSH Credentials secret by its ID.


```
query{  
  secret(secretId:"iyBV3R8ZQWe48GMiaTht7A",secretType:SSH_CREDENTIAL){  
    ... on SSHCredential{  
      name  
      id  
      authenticationType{  
        ... on SSHAuthentication{  
          port  
          userName  
        }  
        ... on KerberosAuthentication{  
          principal  
          port  
          realm  
        }  
      }  
  }  
 }  
}
```
The `authenticationType` element supports credentials using both `SSHAuthentication` and `KerberosAuthentication`.

## Get a Secret by Name

This sample uses a `secretByName` query to retrieve an existing secret by its name.


```
query{  
  secretByName(name:"testing_SSH",secretType:SSH_CREDENTIAL){  
    ... on SSHCredential{  
			name  
      authenticationType{  
        ... on SSHAuthentication{  
          port  
          userName  
        }  
        ... on KerberosAuthentication{  
          principal  
          port  
          realm  
        }  
      }  
    }  
  }  
}
```
## Create an SSH Credentials Secret

This sample creates a secret. The required `CreateSecretInput` input must include a `SecretType`.


```
 mutation($secret: CreateSecretInput!){  
  createSecret(input: $secret){  
    secret{  
    ... on SSHCredential{  
      name  
      id  
      authenticationType{  
        ... on SSHAuthentication{  
          port  
          userName  
        }  
        ... on KerberosAuthentication{  
          principal  
          port  
          realm  
        }  
      }  
    }  
  }  
 }  
}
```
### Query Variables: Inline Key

 For the above query, these sample variables supply the `SecretType` and an inline SSH key.

You must provide the inline SSH key as a Base64-encoded string.
```
{  
  "secret": {  
    "secretType": "SSH_CREDENTIAL",  
    "sshCredential": {  
      "name": "ssh_credential_with_inline_key",  
      "authenticationScheme": "SSH",  
      "sshAuthentication": {  
        "port": 22,  
        "userName": "ubuntu",  
        "sshAuthenticationMethod": {  
          "sshCredentialType": "SSH_KEY",  
          "inlineSSHKey": {  
            "sshKeySecretFileId": "ePuBMQvPQ0Sl3FGYkd9NQg"  
          }  
        }  
      },  
      "usageScope": {  
        "appEnvScopes": [  
          {  
            "application": {  
              "filterType": "ALL"  
            },  
            "environment": {  
              "filterType": "PRODUCTION_ENVIRONMENTS"  
            }  
          }  
        ]  
      }  
    }  
  }  
}
```
### Query Variables: File Path

These sample variables specify the `SecretType`, and reference the SSH Key by its file path.


```
{  
  "secret": {  
    "secretType": "SSH_CREDENTIAL",  
    "sshCredential": {  
      "name": "Test",  
      "authenticationScheme": "SSH",  
      "sshAuthentication": {  
        "port": 22,  
        "userName": "ubuntu",  
        "sshAuthenticationMethod": {  
          "sshCredentialType": "SSH_KEY_FILE_PATH",  
          "sshKeyFile": {  
            "path": "ePuBMQvPQ0Sl3FGYkd9NQg"  
          }  
        }  
      },  
      "usageScope": {  
        "appEnvScopes": [  
          {  
            "application": {  
              "filterType": "ALL"  
            },  
            "environment": {  
              "filterType": "PRODUCTION_ENVIRONMENTS"  
            }  
          }  
        ]  
      }  
    }  
  }  
}
```
### Query Variables: Password

These sample variables supply an inline password for the new secret.


```
{  
  "secret": {  
    "secretType": "SSH_CREDENTIAL",  
    "sshCredential": {  
      "name": "Test",  
      "authenticationScheme": "SSH",  
      "sshAuthentication": {  
        "port": 22,  
        "userName": "ubuntu",  
        "sshAuthenticationMethod": {  
          "sshCredentialType": "PASSWORD",  
          "serverPassword": {  
            "passwordSecretId": "mq-PSjt0Sjmq43dEE5V1og"  
          }  
        }  
      },  
      "usageScope": {  
        "appEnvScopes": [  
          {  
            "application": {  
              "filterType": "ALL"  
            },  
            "environment": {  
              "filterType": "PRODUCTION_ENVIRONMENTS"  
            }  
          }  
        ]  
      }  
    }  
  }  
}
```
### Query Variables: Kerberos Keytab

These sample variables supply a Kerberos keytab for the new secret.


```
{  
  "secret": {  
    "secretType": "SSH_CREDENTIAL",  
    "sshCredential": {  
      "name": "TestSample1",  
      "authenticationScheme": "KERBEROS",  
      "kerberosAuthentication": {  
        "principal": "asdasd",  
        "realm": "asdasd",  
        "port": 22,  
        "tgtGenerationMethod": {  
          "tgtGenerationUsing": "KEY_TAB_FILE",  
          "keyTabFile": {  
            "filePath": "/asd/asdasd"  
          }  
        }  
      },  
      "usageScope": {  
        "appEnvScopes": [  
          {  
            "application": {  
              "filterType": "ALL"  
            },  
            "environment": {  
              "filterType": "PRODUCTION_ENVIRONMENTS"  
            }  
          }  
        ]  
      }  
    }  
  }  
}
```
### Query Variables: Kerberos Password

These sample variables supply a Kerberos password for the new secret.


```
{  
  "secret": {  
    "secretType": "SSH_CREDENTIAL",  
    "sshCredential": {  
      "name": "TestSample1",  
      "authenticationScheme": "KERBEROS",  
      "kerberosAuthentication": {  
        "principal": "asdasd",  
        "realm": "asdasd",  
        "port": 22,  
        "tgtGenerationMethod": {  
          "tgtGenerationUsing": "PASSWORD",  
          "kerberosPassword": {  
            "passwordSecretId": "mq-PSjt0Sjmq43dEE5V1og"  
          }  
        }  
      },  
      "usageScope": {  
        "appEnvScopes": [  
          {  
            "application": {  
              "filterType": "ALL"  
            },  
            "environment": {  
              "filterType": "PRODUCTION_ENVIRONMENTS"  
            }  
          }  
        ]  
      }  
    }  
  }  
}
```
## Update a Secret

This sample updates an existing secret. The required `UpdateSecretInput` input must supply a `secretType` and an `id`.

You can update the `name` or the `sshAuthentication/kerberosAuthentication`. To update the credentials, you must supply the complete `sshAuthentication/kerberosAuthentication` as input.
```
mutation($secret: UpdateSecretInput!){  
  updateSecret(input: $secret){  
    secret{  
    ... on SSHCredential{  
      name  
      id  
      authenticationType{  
        ... on SSHAuthentication{  
          port  
          userName  
        }  
        ... on KerberosAuthentication{  
          principal  
          port  
          realm  
        }  
      }  
    }  
  }  
 }  
}
```
### Query Variables

These sample variables supply the required `secretType` and `id`.


```
{  
  "secret": {  
    "secretId": "",  
    "secretType": "SSH_CREDENTIAL",  
    "sshCredential": {  
      "name": "Test",  
      "authenticationScheme": "SSH",  
      "sshAuthentication": {  
        "port": 22,  
        "userName": "ubuntu",  
        "sshAuthenticationMethod": {  
          "sshCredentialType": "PASSWORD",  
          "serverPassword":   {  
            "passwordSecretId": "mq-PSjt0Sjmq43dEE5V1og"  
          }  
        }  
      },  
      "usageScope": {  
        "appEnvScopes": [  
          {  
            "application": {  
              "filterType": "ALL"  
            },  
            "environment": {  
              "filterType": "PRODUCTION_ENVIRONMENTS"  
            }  
          }  
        ]  
      }  
    }  
  }  
}  

```
## Delete a Secret

This sample deletes a specified secret. The required `DeleteSecretInput` input must supply a `secretId` and a `secretType`.


```
mutation($secret: DeleteSecretInput!){  
  deleteSecret(input: $secret){  
    clientMutationId  
  }  
}
```
### Query Variables

Here are query variables for the above `deleteSecret` operation.


```
{  
  "secret": {  
    "secretId": "okvQ69PMQIqjyI3r5YB1JQ",  
    "secretType": "SSH_CREDENTIAL"  
  }  
}
```
## Related Topics

* [Harness API](harness-api.md)
* [Encrypted Text API](api-encrypted-text.md)
* [Encrypted Files API](api-encrypted-files.md)
* [WinRM Credentials API](api-win-rm-credentials.md)

