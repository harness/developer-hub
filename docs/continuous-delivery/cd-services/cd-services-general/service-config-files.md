---
title: Use Harness Config Files with your Service
description: Use Service Config Files with your Service.
sidebar_position: 120
helpdocs_is_private: false
helpdocs_is_published: true
---


You can use files added to the **Config Files** section in your Kubernetes Service in your manifests, such as in a ConfigMap. You can reference unencrypted and encrypted files, and they can be single or multiline.


### Before You Begin

* [Using Harness Config Variables in Manifests](using-harness-config-variables-in-manifests.md)
* [Define Kubernetes Manifests](define-kubernetes-manifests.md)

### Config File Capabilities

Harness supports the ability to add any file type to the service. The common ones like JSON and XML are popular in our SSH and WinRM swimlanes. 

User's can configure the config file as `plain text` file or an `encrypted text`. With a `plain text` config file, Harness will render the contents of the file and user's can leverage it in their deployment along with their service. 

With the encrypted text user's will need to base64 decode it before user's can reference it within the deployment. 

Config Files support Harness Variables:
- Pipeline variables
- Service variables
- Environment Variables
- Override Variables
- Secrets

Harness supports overriding config files at the environment level and at the service level. 

### Review: Config Files Encoding and References

Files added in the **Config Files** section are referenced using the `configFile.getAsString("fileName")` Harness expression:

* `configFile.getAsString("fileName")` - Plain text file contents.
* `configFile.getAsBase64("fileName")` - Base64-encoded file contents.

### Review: Use Base64 to Avoid New Lines

If you are going to use a Config File in a manifest or shell script, be aware that `<+configFile.getAsString()>` can cause problems by adding new lines to your manifest (unless you have formatted the file very carefully).

Instead, use `<+configFile.getAsBase64()>`. This will ensure that the contents of the file are rendered as a single line.


### Reference Config File

1. In the **values.yaml** in the Harness Service **Manifests** section, reference the Config File using `my_file:<+configFile.getAsBase64("myFile")>`.

2. In the Shell script you can pass in the script body like:

```sh
cat <+configFile.getAsBase64("myFile")>
```

### Decode the File

In a manifest (in our example, a ConfigMap), decode the base64 Config File and indent it for the YAML syntax:

```YAML
valus.yaml

my_file:`my_file:<+configFile.getAsBase64("myFile")>`
```

  ```
  data:  
    keyname: |  
  {{.Values.my_file | b64dec | indent 4}}
  ```
  
At runtime, the Config File is decoded and used as plaintext.

In a shell script step or service command it would look like:

```sh
echo <+configFile.getAsBase64("myFile")>
```



### Limitations

* You cannot use Harness variables in an encrypted text config file.
* You cannot reference other config files within a config file

