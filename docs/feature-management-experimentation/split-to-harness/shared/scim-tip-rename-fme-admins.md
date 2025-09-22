:::tip[You can optionally rename the `_fme_admins` group in {props.app}]
In {props.app}, after the first provisioning sync to Harness, you should confirm:
* The `_fme_admins` group now appears on the Harness side as SCIM-managed.
* The first provisioning sync has established the immutable **Group ID** of `_fme_admins` on the Harness side.

After confirming the above, you may optionally rename this group's **Display name** in {props.app} if you wish.
:::