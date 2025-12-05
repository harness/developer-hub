## Manual Upgrades for Versions Older Than 2.2.5
*If you have a version older than 2.2 go into IDP and remove all HSF workflows from IDP. You will need to do this because of IDP 2.0 changes we will need to reregister new workflows.*

### To Update:

1. Go into the `Solutions Factory` project → Pipelines and run `Mirror Harness Official Solutions Factory` 
2. Go into `Solutions Factory` project → IaCM Workspaces → `Pilot Light` 
    - Go into Configuration → Change the OpenTofu version to at least 1.10.0 → Save Changes (because we restructured how things are deployed and need the ability to 
    - Go into Connectors and Variables 
        - Remove `delegate_selectors` as it is no longer used
        - Change the `provider_version` to match the version of OpenTofu that you set above  
3. Run `Manage Pilot Light`
4. Run `Manage Pilot Light` again because the above run introduces a new step in the post configuration that is needed for the upgrade
5. Go into IaCM Workspaces → `Harness Solutions Factory`
    - Go into Configurations and add tags `source:hsf_system` and `type:solutions-factory`
    - Update the OpenTofu version to the same version that you set above
    - Modify Default Pipelines for all four pipelines to be `Deploy Solutions Factory` → Save Changes
    - Go into Connectors and Variables 
        - Remove `delegate_selectors` , `project_id` , and `organization_id` and `organizations` these are no longer needed and should not be modified.
        - Change the `provider_version` to match the version of OpenTofu that was set 
        - Verify these variables exist, if not add:
        
        | Variable Key | Value |
        | --- | --- |
        | hsf_pipeline_connector_ref | org.hsf_dockerhub_connector |
        | hsf_script_mgr_image | harnesssolutionfactory/harness-python-api-sdk:latest |
        | hsf_idp_resource_mgr_image | harnesssolutionfactory/harness-idp-resource-manager:latest |
        | hsf_iacm_manager_plugin | harnesssolutionfactory/harness-manage-iacm-workspace:latest |
        | enable_hsf_mini_factory | false |
        1. Save Changes
6. Run `Deploy Solutions Factory` 
7. If you’re doing an upgrade from pre 2.2 run `Bulk Workspace IDP Registration`  
8. Run `Register Official IDP Templates` to get all the new templates from `harness-template-library`
9. The upgrade is now complete!