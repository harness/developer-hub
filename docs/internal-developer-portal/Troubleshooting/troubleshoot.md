---
title: Troubleshoot
sidebar_label: Troubleshoot & FAQ
description: The basic troubleshooting instructions while onboarding to IDP 
sidebar_position: 1
---

For troubleshooting guidance for the Harness Platform, delegates, connectors, secrets, or other modules go to the [Platform Knowledge Base](https://developer.harness.io/kb/platform) or [Troubleshooting Harness](https://developer.harness.io/docs/troubleshooting/troubleshooting-nextgen).

For additional support, you can [contact Harness Support](mailto:support@harness.io) or visit the [Harness Community](https://developer.harness.io/community).

## FAQ

### Register multiple software components together

We can register multiple `catalog-info.yaml` in the following ways.

1. If all your `catalog-info.yaml` are in the root of the same repo you can add the extensions in the target, as shown in the example below and it will register all the components.

```YAML
apiVersion: backstage.io/v1alpha1
kind: Location
metadata:
  name: example-all
  description: A collection of all Backstage example entities, except users, groups, and templates
spec:
  targets:
    - ./all-apis.yaml
    - ./all-components.yaml
```

2. If the `catalog -info.yaml` is scattered across repos and you want to register them together then mention the absolute path in the git provider. Please make sure the **connector** you have created has **account level permissions** and all the repos mentioned under targets are under that **same account**.

```YAML
apiVersion: backstage.io/v1alpha1
kind: Location
metadata:
  name: food-delivery
  description: A collection of all example entities, except users, groups, and templates
spec:
  targets:
    - https://github.com/account-name/location-service/blob/main/catalog-info.yaml
    - https://github.com/account-name/member-service/blob/main/catalog-info.yaml
    - https://github.com/account-name/delivery-service/blob/main/catalog-info.yaml
    - https://github.com/account-name/order-service/blob/main/catalog-info.yaml
    - https://github.com/account-name/menu-service/blob/main/catalog-info.yaml
```
#### GitHub Auto-Discovery Plugin

If you're aiming to register multiple components in the software catalog concurrently, the [GitHub auto-discovery plugin](https://developer.harness.io/docs/internal-developer-portal/plugins/available-plugins/github-catalog-discovery/) is a valuable tool. This plugin automates the discovery and registration of components, with all the idp yamls located in single repo.

#### Using the Catalog API

Another effective approach is leveraging the catalog API. By running a custom script as shown in the example below, you can automate the registration of components, providing a more programmatic method for bulk registrations.

```shell
#!/bin/bash

set -e

function usage {
    echo "usage: $0 [-a accountIdentifier] [-x xApiKey] [-u bearerAuthorization] [-l catalogLocations]"
    echo "  -a      Harness Account Identifier"
    echo "  -x      Harness X-API-KEY for the given account"
    echo "  -u      Harness Bearer Authorization from the logged in session"
    echo "  -l      Catalog locations to be registered in Harness IDP. Comma seperated list of locations"
    exit 1
}

while getopts a:x:u:l:h flag
do
    case "${flag}" in
        a) ACCOUNT_IDENTIFIER=${OPTARG};;
        x) X_API_KEY=${OPTARG};;
        u) BEARER_AUTHORIZATION=${OPTARG};;
        l) CATALOG_LOCATIONS=${OPTARG};;
        h | ?) usage
    esac
done

echo -e "\nStarting catalog location registration for given location in Harness IDP...";

CATALOG_LOCATION_REGISTER_DATA='{"type":"url","target":"CATALOG_LOCATION_TARGET"}'

for LOCATION in ${CATALOG_LOCATIONS//,/ }
do
    echo -e "\n--------"
    echo "Registering $LOCATION catalog location in Harness IDP account $ACCOUNT_IDENTIFIER"

    POST_DATA=${CATALOG_LOCATION_REGISTER_DATA/CATALOG_LOCATION_TARGET/$LOCATION}

    RESULT_HTTP_CODE=$(curl --write-out %{http_code} -s --output /dev/null -H "Content-Type: application/json" -H "Harness-Account: ${ACCOUNT_IDENTIFIER}" -H "x-api-key: ${X_API_KEY}" -H "Authorization: Bearer ${BEARER_AUTHORIZATION}" -X POST --data "${POST_DATA}" "https://idp.harness.io/${ACCOUNT_IDENTIFIER}/idp/api/catalog/locations")

    if [[ "$RESULT_HTTP_CODE" -ne 201 ]] ; then
        echo "Failed registering $LOCATION catalog location in Harness IDP account $ACCOUNT_IDENTIFIER"
    else
        echo "Successfully registerd $LOCATION catalog location in Harness IDP account $ACCOUNT_IDENTIFIER"
    fi

    echo "--------"
done

echo -e "\nCompleted catalog location registration for given location in Harness IDP...";
```

## Troubleshooting

### Failed to register Software Components

If, after registering an entity, your're unable to find the same in your catalog, check the Devtools Plugin for Unprocessed Entities. If it's under the **Pending** tab, wait a few minutes for registration to complete. If it's under the **Failed** tab. try re-registering the entity.