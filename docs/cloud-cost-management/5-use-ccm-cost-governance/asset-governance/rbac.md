reate---
title: RBAC behaviour in Asset governance
sidebar_label: RBAC behaviour in Asset governance
description: This topic talks about RBAC behaviour in Asset governance.
# sidebar_position: 3
---

RBAC behaviour in Asset Governance

## Cloud Asset Governance Rules

### Role and Resource Group mappings and behaviour

| Role | Resource Group: All | Resource Group: Specified |
|------|---------------------|---------------------------|
| **View** | Can view all governance rules | Can view only specified governance rules |
| **Create/Edit** | Can create and edit all governance rules if "Execute" permission is given | Can only edit specified rules if "Execute" permission is given. Cannot create new rules. |
| **Delete** | Delete access on all rules if "Execute" permission is given. | Can only delete specified governance rules if "Execute" permission is given |
| **Execute** | Can execute all governance rules. Connector permission is required for execution | Can execute only specified governance rules. Connector permission is required for execution |

Please note, "Execute" permission is required to edit a rule and "Connector" permissions are required to run a rule. You can select and edit permissions of Connector from "Shared Resources" in Access Control: Resource Groups and Access Control: Roles.

## Cloud Asset Governance Rule Sets

### Role and Resource Group mappings and behaviour

| Role | Resource Group: All | Resource Group: Specified |
|------|---------------------|---------------------------|
| **View** | Can view all governance rule sets. Rule:View permission is required | Can view only specified governance rule sets. Rule:View permission is required |
| **Create/Edit** | Can create and edit all governance rule sets. Rules:Execute permission is required. | Can only edit specified rule sets. Rules:Execute permission is required. Cannot create new rule sets. |
| **Delete** | Delete access on all rule sets. Rules:Execute permission is required. | Can only delete specified governance rule sets. Rules:Execute permission is required. |


## Cloud Asset Governance Overview

Role: Cloud Asset Governance Overview: View
Resource Group: Cloud Asset Governance Overview: ALL

ONLY one mapping available, can view all governance entities except recommendations on overview page. 


## Cloud Asset Governance Enforcements

### Role and Resource Group mappings and behaviour

| Role | Resource Group: All | Resource Group: Specified |
|------|---------------------|---------------------------|
| **View** | Can view all governance enforcements. | Can view only specified governance enforcements. |
| **Create/Edit** | Can create, edit all governance enforcements ONLY IF Rules:Execute and Connector permissions are given. Respective permission on Rules and Rule Sets is required to be able to create an enforcement | Can only edit specified governance enforcements. Rules:Execute and Connector permissions required for editing enforcements. Cannot create new enforcements. |
| **Delete** | Delete access on all governance enforcements. Rules:Execute and Connector permissions required. | Can only delete specified governance enforcements. Rules:Execute and Connector permissions required. |


Please note, "Execute" permission is required for create/edit and delete and "Connector" permissions for the same. You can select and edit permissions of Connector from "Shared Resources" in Access Control: Resource Groups and Access Control: Roles.

## Cloud Asset Governance Alerts

### Role and Resource Group mappings and behaviour

| Role | Resource Group: All | Resource Group: Specified |
|------|---------------------|---------------------------|
| **View** | Can view all governance alerts. | No granular rbac on alerts |
| **Create/Edit** | Can copy, create and edit all governance alerts. Connector permissions required. | No granular rbac on alerts |
| **Delete** | Delete access on all governance alerts. | No granular rbac on alerts |

## RBAC Behavior Prediction Tool

import RBACBehaviorTool from './components/RBACBehaviorTool';
import './components/RBACBehaviorTool.css';

<RBACBehaviorTool />

### How to Use the RBAC Behavior Prediction Tool

1. **Select Roles**: Choose the roles and permissions you want to assign from the left column.
2. **Select Resource Groups**: Choose the resource group option (All or Specified) from the right column.
3. **Click "Predict Behavior"**: The tool will display the expected behavior based on your selections.

This tool helps you understand how different combinations of roles and resource groups affect user permissions in the Cloud Asset Governance system.