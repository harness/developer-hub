:::warning Delegate-Legacy End of Support (EOS) notice

This is an End of Support (EOS) notice for the Delegate-Legacy image type. This image type reached End of Support (EOS) as of **January 31, 2024**.

End of Support means the following:

- Harness Support will no longer accept support requests for the Delegate-Legacy image type in both Harness FirstGen and Harness NextGen (including Harness Self-Managed Enterprise Edition (SMP)).
- Security fixes will still be addressed.
- Product defects will not be addressed.

Follow the below steps to upgrade Delegate-Legacy to Delegate image
* Download new yaml from Harness by keeping the same name as the previous delegate
* Check if the existing delegate has any tags/selector, if yes then add them in DELEGATE_TAGS
* Compare the permissions given to the legacy delegate in their yaml and give the same permissions to new delegates
* Check if custom image is used, if yes then build a new image with immutable delegate as base image and override the account setting to point to that image
* Ensure that auto upgrade is enabled for Kubernetes delegates
* Our delegate yaml ships with default HPA of min and max replicas to be 1, adjust the desired number of replicas in HPA
* Deploy the new yaml and see new replicas coming under the same delegate
* Scale down the old stateful set and verify that everything is correct

:::
