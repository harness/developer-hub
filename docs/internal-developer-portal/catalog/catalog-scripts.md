---
title: Service Onboarding using Scripts on Catalog
description: Detailed documentation of the Service Onboarding Scripts 
sidebar_label: Service Onboarding Scripts
sidebar_position: 180
---

## Scripts to create new services, register new services 

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs queryString="GitHub">
<TabItem value="github" label="GitHub">

- The GitHub Catalog Discovery plugin registers one location per repository. This might not be a good idea when there are many (3000+ in this case) as any error in fetching one `catalog-yaml` would mark the whole location as failed and create trouble with the entity sync.

- To solve this we would recommend you to use the following scripts which would register separate locations for all the matching catalog-info.yaml files and hence would be synchronised separately.

### [Registered Locations](https://github.com/harness-community/idp-samples/blob/main/catalog-scripts/idp-catalog-wizard-github.py)

### [Registered Locations](https://github.com/harness-community/idp-samples/blob/main/catalog-scripts/idp-catalog-wizard-github-monorepo.py) - For Monorepos

- Discover `catalog-info.yaml` matching the regex filter and register under the catalog provided in `apiurl`. This would separate locations for all the matching catalog-info.yaml files and hence would be synchronised separately.

- To use the script you need to modify the following and run it
   - On [line 13](https://github.com/harness-community/idp-samples/blob/99647168c0c354ee1b19c0ef34496642c37e2fb6/catalog-scripts/idp-catalog-wizard-github.py#L13) update the `branch`.
   - For the `YAML` [template](   https://github.com/harness-community/idp-samples/blob/99647168c0c354ee1b19c0ef34496642c37e2fb6/catalog-scripts/idp-catalog-wizard-github.py#L15-L30) given in the script add the placeholders as mentioned below

   ```YAML
   apiVersion: backstage.io/v1alpha1
   kind: Component
   metadata:
   name: <Add the name of the repo you want to create>
   tags:
      - auto-generated
   annotations:
      backstage.io/source-location: url: <Repo URl eg, https://github.com/harness-community/idp-samples>
      github.com/project-slug: The value of this annotation is the so-called slug that identifies a repository on GitHub (either the public one, or a private GitHub Enterprise installation) that is related to this entity. It is on the format <organization or owner>/<repository>, and is the same as can be seen in the URL location bar of the browser when viewing that repository.
   spec:
   type: service
   lifecycle: experimental
   owner: Harness_Account_All_Users
   system: <Add the GitHub org name>
   """
   ```
   - On [line 36](https://github.com/harness-community/idp-samples/blob/99647168c0c354ee1b19c0ef34496642c37e2fb6/catalog-scripts/idp-catalog-wizard-github.py#L36) add the bearer token that has access to create repos in the org mentioned int eh YAML above. 
   - For the API call mentioned in the [line 116](https://github.com/harness-community/idp-samples/blob/99647168c0c354ee1b19c0ef34496642c37e2fb6/catalog-scripts/idp-catalog-wizard-github.py#L116-L118) add the Harness PAT and the accountID. 

### [Create Services](https://github.com/harness-community/idp-samples/blob/main/catalog-scripts/create_services.py)

- Generates a monorepo with the following file structure, assigning random english names.

```sh
repo
   - antronasal-service
      - catalog-info.yaml
   - cespititous-service
      - catalog-info.yaml
   - ....
   - geomaly-service
        - catalog-info.yaml
```

### [Delete Services](https://github.com/harness-community/idp-samples/blob/main/catalog-scripts/delete_services.py)

- Will clean up the services already created.

</TabItem>
<TabItem value="bitbucket" label="Bitbucket">

- Similar to GitHub, Bitbucket Catalog Discovery plugin registers one location per repository. This might not be a good idea when there are many (3000+ in this case) as any error in fetching one `catalog-yaml` would mark the whole location as failed and create trouble with the entity sync.

- To solve this we would recommend you to use the following scripts which would register separate locations for all the matching `catalog-info.yaml` files and hence would be synchronised separately.

### [Registered Locations](https://github.com/harness-community/idp-samples/blob/main/catalog-scripts/idp-catalog-wizard-bitbucket-monorepo.py) - For Monorepos

### [Registered Locations](https://github.com/harness-community/idp-samples/blob/main/catalog-scripts/idp-catalog-wizard-bitbucket.py)


- Discover `catalog-info.yaml` matching the regex filter and register under the catalog provided in `apiurl`. This would separate locations for all the matching catalog-info.yaml files and hence would be synchronised separately.


</TabItem>
</Tabs>