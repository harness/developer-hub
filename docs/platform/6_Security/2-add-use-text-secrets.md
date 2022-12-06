---
title: Add and Reference Text Secrets
description: This topic shows how to create a text secret and reference it in Harness Application entities.
# sidebar_position: 2
helpdocs_topic_id: osfw70e59c
helpdocs_category_id: 48wnu4u0tj
helpdocs_is_private: false
helpdocs_is_published: true
---

You can add a text secret to the Secret Manager and use them in your resources like Pipelines and Connectors.

This topic describes how to add a text secret in Harness.

### Step 1: Add Text Secret

This topic assumes you have a Harness Project set up. If not, see [Create Organizations and Projects](../1_Organizations-and-Projects/2-create-an-organization.md).

Secrets can be added inline while setting up a Connector or other setting, and they can also be set up in the Account/Organization/Project resources.

These steps are for setting up a secret in the Account/Organization/Project resources. To do this, go to Project setup, Organization, or Account Resources.

Click **Secrets**.

Click **Secret** and select **Text.**

![](./static/add-use-text-secrets-45.png)
The **Add new Encrypted Text** settings appear.

![](./static/add-use-text-secrets-46.png)
Select the **Secret Manager** you will use to encrypt this secret.

In **Secret Name**, enter a name for the encrypted text. This is the name you will use to reference the text elsewhere in your resources.

#### Option: Inline Secret Value

In **Inline Secret** **Value**, enter a value for the encrypted text.

#### Option: Reference Secret

You can create a Harness secret that refers to an existing secret by selecting **Reference** **Secret** and using that secret's name.

You can reference existing secrets in the following types of Secret Managers:

* Azure Key Vault
* Hashicorp Vault

Enter **Description** for your secret.

Enter **Tags** for your secret.

Click **Save.**

### Step 2: Use the Encrypted Text in Connectors

All of the passwords and keys used in Harness Connectors are stored as Encrypted Text secrets in Harness.

You can either create the Encrypted Text secret first and then select it in the Connector or you can create/select it from the Connector by clicking **Create or Select a Secret**:

![](./static/add-use-text-secrets-47.png)![]
(./static/add-use-text-secrets-48.png)
You can also edit it in the Connector.

![](./static/add-use-text-secrets-49.png)
### Step 3: Reference the Encrypted Text by Identifier

For an Encrypted Text secret that's been scoped to a Project, you reference the secret in using the secret identifier in the expression: `<+secrets.getValue("your_secret_Id")>`.

![](./static/add-use-text-secrets-50.png)
Always reference a secret in an expression using its identifier. Names will not work.For example, if you have a text secret with the identifier `doc-secret`, you can reference it in a Shell Script step like this:


```
echo "text secret is: " <+secrets.getValue("doc-secret")>
```
You can reference a secret at the Org scope using an expression with `org`:


```
<+secrets.getValue("org.your-secret-Id")>​
```
You can reference a secret at the Account scope using an expression with `account`:


```
<+secrets.getValue("account.your-secret-Id")>​​
```
Avoid using `$` in your secret value. If your secret value includes `$`, you must use single quotes when you use the expression in a script.  
For example, if your secret in the Project scope has a value `'my$secret'`, and identifier `doc-secret`, to echo, use single quotes:  
`echo '<+secrets.getValue("doc-secret")>'`

### Review: Invalid Characters in Secret Names

The following characters aren't allowed in the names of secrets:


```
 ~ ! @ # $ % ^ & * ' " ? / < > , ;
```

### Review: Secrets in Outputs

When a secret is displayed in an output, Harness substitutes the secret value with asterisks so that the secret value is masked. Harness replaces each character in the name with an asterisk (\*).

For example, here the secret values referenced in a Shell Script step are replaced with `*****`:

![](./static/add-use-text-secrets-51.png)
If you accidentally use a very common value in your secret, like whitespace, the `*` substitution might appear in multiple places in the output.

If you see an output like this, review your secret and fix the error.

### Review: Secret Scope

When creating secrets, it's important to understand their scope in your Harness account.

A user can only create a secret according to the scope set by its Harness User permissions.

For example, when you create a new project or a new organization, a Harness Secret Manager is automatically scoped to that level.

### Review: Line breaks and Shell-Interpreted Characters

A text secret can be referenced in a script and written to a file as well. For example, here is a secret decoded from [base64](https://linux.die.net/man/1/base64) and written to a file:

`echo <+secrets.getValue("my_secret")> | base64 -d > /path/to/file.txt`

If you have line breaks in your secret value, you can encode the value, add it to a secret, and then decode it when you use it in a Harness step.

The previous example uses base64, but you can also write a secret to a file without it:

`echo '<+secrets.getValue("long_secret")>' > /tmp/secretvalue.txt`

If you do not use base64 and the secret value contains any character that are interpreted by the shell, it might cause issues.

In this case, you can use a special-purpose code block:


```
cat >/harness/secret_exporter/values.txt << 'EOF'  
MySecret:<+secrets.getValue("test")>  
EOF
```
### Sanitization

Sanitization only looks for an exact match of what is stored. So, if you stored a base64 encoded value then only the base64 encoded value is sanitized.

For example, let say I have this multiline secret:


```
line 1  
line 2  
line 3
```
When it is base64 encoded, it results in `bGluZSAxCmxpbmUgMgpsaW5lIDM=`.

We can add this to a Harness secret named **linebreaks** and then decode the secret like this:


```
echo <+secrets.getValue("linebreaks")> | base64 -d
```
The result loses any secret sanitization.

![](./static/add-use-text-secrets-52.png)
### Nested expressions uing string concatenation

You can use the + operator or concat method inside the secret reference. For example, each of these expressions use one method and another Harness variable expression:

* `<+secrets.getValue("test_secret_" + <+pipeline.variables.envVar>)>`
* `<+secrets.getValue("test_secret_".concat(<+pipeline.variables.envVar>))>`

