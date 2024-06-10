---
title: Harness CG Git Sync vs Harness NG Git Experience
description: This page talks about functionalities supported in CG GitSync vs NG Git Experience
---

<table width="900" cellspacing="0" cellpadding="0">
    <tr>
        <td width="300" word-wrap="break-word"><b>Functionality</b></td>
        <td width="600"><b>CG Git Sync</b></td>
        <td width="600"><b>NG Git Experience</b></td>
    </tr>
    <tr>
        <td>Entities Supported</td>
        <td>
        - Pipelines
        - Input Sets
        - Services
        - Environment 
        - Overrides 
        - Connector 
        - Secrets
        </td>
        <td>
        
        </td>
    </tr>
    <tr>
        <td>OPA_PIPELINE_GOVERNANCE</td>
        <td>Enables <a href="/docs/platform/governance/policy-as-code/harness-governance-overview">Policy as Code</a> for a Harness account.<b>This feature is GA.</b></td>
    </tr>
    <tr>
        <td>CDS_HELM_VERSION_3_8_0</td>
        <td>Sets the default version of Helm to 3.8 when using the Harness Helm delegate. This feature in in Limited GA. </td>
    </tr>
    <tr>
        <td>NG_PIPELINE_TEMPLATE</td>
        <td>Enables <a href="https://developer.harness.io/docs/platform/templates/create-pipeline-template">Harness templates.</a>. <b>This feature is Limited GA.</b> </td>
    </tr>
    <tr>
        <td>OPA_GIT_GOVERNANCE</td>
        <td>Store and fetch your <a href="/docs/platform/governance/policy-as-code/configure-gitexperience-for-opa">OPA policies in Git.</a>. <b>This feature is Limited GA.</b> </td>
    </tr>
    <tr>
        <td>NG_CUSTOM_STAGE</td>
        <td>Enables the <a href="/docs/platform/pipelines/add-a-stage/#add-a-custom-stage">Custom stage</a>
 for use in a pipeline. <b>This feature is GA.</b></td>
    </tr>
    <tr>
        <td>NG_GIT_EXPERIENCE</td>
        <td>Enables <a href="/docs/platform/git-experience/configure-git-experience-for-harness-entities">Harness Git Experience</a> for a Harness account. Users can manage their Pipeline, Templates, Input Sets, Feature Flags via Git. <b>This feature is GA.</b></td>
    </tr>

</table>