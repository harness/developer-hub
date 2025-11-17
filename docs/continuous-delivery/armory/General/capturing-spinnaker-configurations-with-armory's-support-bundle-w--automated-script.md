---
title: Capturing Spinnaker configurations with Armory's Support Bundle (w/ Automated Script)
---


For a full detailed of the manual process this script is automating, [please refer to KB0010398](https://support.armory.io/support?id=kb_article_view&sysparm_article=KB0010398)
### Introduction
Troubleshooting a Spinnaker issue may require customers to manually pull the configurations from their environment. At times, the configurations may be incomplete which would require customers pull the details again, causing a delay in actual issue resolution time.
To avoid such discrepancies, ```Armory's Support Bundle``` helps in capturing accurate and relevant details from a customer's Spinnaker installation. The Armory Support Bundle is a Kubernetes tool that pulls a standardized set of configuration details from Spinnaker manifests. The debug information is then compressed in the form of zip file, which can provided to Armory's Support team over the support case.  
### What Information can the Armory Support Bundle discover?
Armory Support Bundle retrieves all pod, service, and deployment configuration associated with an Armory Spinnaker installation. This emulates what a user does when trying to describe resources with ```kubectl```. The tool will generate a ***zip*** file with all the info it gathered so they can be easily share across teams, and attach to Support tickets. This also gives customers the opportunity to manually remove any sensitive information that is not meant to be shared with Armory.
Installation
Retrieving the Armory Support Bundle is done with a script:
*  Download ```getSupportBundle.sh``` from the following link: [https://engineering.armory.io/manifests/support-bundle/0.2.0/getSupportBundle.sh](https://engineering.armory.io/manifests/support-bundle/0.2.0/getSupportBundle.sh)*  Place it in an accessible directory, and ensure you have ```execute``` access to the file.*(optional)* Run it without any options, or with ```--help``` to view its usage: ```./getSupportBundle.sh --help```* Run it with the following options: ```./getSupportBundle.sh -n  -o ```
### Retrieving the debug information 
If after a few moments the script completes successfully, the .zip bundle will be placed in the directory specified in the step above. Once this is done, you may review the contents to redact any sensitive information, and then attach it to your Armory Support case.
### Troubleshooting
In case an issue is encountered during the script execution, an error message will be displayed. 
```Error #001: Cannot create ```
* The provided directory path passed with the ```-o``` or ```--outputdir``` option cannot be created. Ensure you have sufficient read and write-permissions to the parent directory.
```Error #002: Provided directory  is not a directory!```
* The provided directory path passed with the ```-o``` or ```--outputdir``` option points to a file. Ensure you specify a directory instead.
```Error #003: Invalid option. Use "-h" or "--help" to see usage.```
* One or more options passed to the script are invalid. 
```Error #004: BOTH a namespace and output directory must be specified. Use "-h" or "--help" to see usage.```
* Either a namespace or an output directory was not specified. Both must be provided to the script.
```Error #005: Cannot copy over  to directory: !```
* You do not have write-access to provided directory. Ensure you have correct permissions, and re-run the script again.
```Error #006: Cannot fetch bundle ZIP from pod!```
* The pod ```armory-support-bundle-visualizer``` might have either been terminated, or a stale instance is still running in the current namespace. Ensure no previous deployments of this type exist, and re-run the script again.
```Error #007: Cannot fetch visualizer.yaml from !```
or
```Error #008: Cannot fetch deploy.yaml from !```
* One or both of the supporting manifests could not be fetched from Armory's website with ```curl```. Ensure the environment where the script is placed has outbound access in your firewall rules. If this is not an option for you, note that support for air-gapped customers will be added soon.
```Error #009: Cannot delete visualizer pod!```
or

```Error #010: Cannot delete support bundle pod!```

* No ```kubectl delete``` privileges available within the current cluster. If you would like to manually clean-up, remove the associated deployments when sufficient privileges are available.
```Error #011: Provided namespace  does not exist!```
* Ensure the namespace provided is valid, and confirm that is where Spinnaker is installed.
``````

