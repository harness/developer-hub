---
title: Upgrade Legacy Delegate to Delegate
description: Upgrade legacy delegate
sidebar_position: 9
---

:::warning Delegate-Legacy End of Support (EOS) notice

This is an End of Support (EOS) notice for the Delegate-Legacy image type. This image type reached End of Support (EOS) as of **January 31, 2024**.

End of Support means the following:

- Harness Support will no longer accept support requests for the Delegate-Legacy image type in both Harness FirstGen and Harness NextGen (including Harness Self-Managed Enterprise Edition (SMP)).
- Security fixes will still be addressed.
- Product defects will not be addressed.

:::

**Follow the below steps to upgrade Delegate-Legacy to Delegate image**

1. Download new yaml from Harness by keeping the same name as the previous delegate.
2. Check if the existing delegate has any tags/selector, if yes then add them in DELEGATE_TAGS.
3. Compare the permissions given to the legacy delegate in their yaml and give the same permissions to new delegates.
4. Check if custom image is used, if yes then build a new image with immutable delegate as base image and override the account setting to point to that image.
5. Ensure that auto upgrade is enabled for Kubernetes delegates.
6. The delegate yaml ships with default HPA of min and max replicas to be 1, adjust the desired number of replicas in HPA.
7. Deploy the new yaml and see new replicas coming under the same delegate.
8. Scale down the old stateful set and verify that everything is correct.
9. Contact [Harness Support](mailto:support@harness.io) if you need any assistance with upgrading of Delegate-Legacy.
