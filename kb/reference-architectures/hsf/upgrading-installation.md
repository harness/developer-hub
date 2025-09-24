---
title: Upgrading your Installation
description: As new enhancements are released by the Harness team, your installation will require updates to receive the new capabilities and templates.  Additionally, there are some post-deployment tuning steps that will need to be done to adjust your implementation to suit your needs.
---
As new enhancements are released by the Harness team, your installation will require updates to receive the new capabilities and templates.  Additionally, there are some post-deployment tuning steps that will need to be done to adjust your implementation to suit your needs.

## Upgrade your version of Harness Solutions Factory

1. Navigate to the `Solutions Factory` project within the `Harness Platform Management` organization of your Harness account
2. Run the pipeline `Mirror Harness Official solutions Factory Repos`

    _**Note**: This pipeline will replicate the current released versions and changes from the Harness ISE team into your local repositories stored within your organization `Harness Platform Management`_
3. Run the pipeline `Manage Pilot Light` to implement the first phase of the update. This will update the core resources used by HSF
4. Run the pipeline `Deploy Solutions Factory` to finish the upgrade of the Solutions Factory engines.
5. Run the pipeline `Register IDP Templates` to synchronize the Harness Template Library workflows into your IDP installation
