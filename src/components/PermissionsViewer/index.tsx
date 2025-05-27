import React, { useState, useEffect } from 'react';
import stylesModule from './styles.module.css';

// Use the imported styles directly

export interface Permission {
  resource: string;
  role: string;
  resourceGroup: string;
  description?: string;
  rbacLevel?: 'global' | 'granular' | 'both';
}

export interface PermissionsViewerProps {
  initialFeatureName?: string;
  initialRbacLevel?: string;
  initialPermissionType?: string;
  predefinedPermissions?: Permission[];
}

/**
 * A component that displays the exact permissions needed for a specific feature.
 * Allows users to input feature name, RBAC level, and permission type.
 * Generates role bindings and tutorial instructions based on inputs.
 */
export function PermissionsViewer({ 
  initialFeatureName = '', 
  initialRbacLevel = 'global', 
  initialPermissionType = 'view',
  predefinedPermissions = []
}: PermissionsViewerProps): JSX.Element {
  const [featureName, setFeatureName] = useState(initialFeatureName);
  const [rbacLevel, setRbacLevel] = useState(initialRbacLevel);
  const [permissionType, setPermissionType] = useState(initialPermissionType);
  const [permissions, setPermissions] = useState<Permission[]>(predefinedPermissions);
  const [showResults, setShowResults] = useState(false);
  
  // Feature options for dropdown
  const featureOptions = [
    { value: 'anomalies', label: 'Anomalies' },
    { value: 'currency-preferences', label: 'Currency Preferences' },
    { value: 'governance-alerts', label: 'Cloud Asset Governance Alerts' },
    { value: 'cost-categories', label: 'Cost Categories' },
    { value: 'commitments', label: 'Commitments' },
    { value: 'perspectives', label: 'Perspectives' },
    { value: 'governance-rules', label: 'Cloud Asset Governance Rules' },
    { value: 'autostopping-rules', label: 'AutoStopping Rules' },
    { value: 'budgets', label: 'Budgets' },
    { value: 'recommendations', label: 'Recommendations' },
    { value: 'overview', label: 'Overview' },
    { value: 'cluster-orchestrator', label: 'Cluster Orchestrator' },
    { value: 'governance-rule-sets', label: 'Cloud Asset Governance Rule Sets' },
    { value: 'governance-overview', label: 'Cloud Asset Governance Overview' },
    { value: 'load-balancer', label: 'Load Balancer' },
    { value: 'governance-enforcements', label: 'Cloud Asset Governance Enforcements' }
  ];
  
  // Get permissions based on feature, permission type, and RBAC level
  const getPermissions = (feature: string, permType: string, rbacLvl: string): Permission[] => {
    // Default permissions for each feature
    const defaultPermissions: Record<string, Record<string, Record<string, Permission[]>>> = {
      // ----------done------------
      anomalies: {
        view: {
          global: [
            { resource: 'Anomalies', role: 'Folders: View, Perspectives: View, Anomalies: View', resourceGroup: 'Anomalies: View', rbacLevel: 'global', description: 'View anomalies' }
          ],
          granular: [
            { resource: 'Anomalies', role: 'Folders: View, Perspectives: View', resourceGroup: 'Folders: Specified', rbacLevel: 'granular', description: 'View anomalies for specific resources' }
          ]
        },
        manage: {
          global: [
            { resource: 'Anomalies', role: 'Anomalies: Manage, Folders: View, Perspectives: View', resourceGroup: 'Anomalies: View', rbacLevel: 'global', description: 'Manage anomaly detection settings' }
          ],
          granular: [
            { resource: 'Anomalies', role: 'Anomalies: Manage, Folders: View, Perspectives: View', resourceGroup: 'Folders: Specified', rbacLevel: 'granular', description: 'Manage anomaly detection settings for specific resources' }
          ]
        }
      },
      'currency-preferences': {
        view: {
          global: [
            { resource: 'Currency Preference', role: 'Currency Preference: View', resourceGroup: 'View the set currency preferences', rbacLevel: 'global', description: 'View currency preferences' }
          ],
          granular: [
            { resource: 'Currency Preference', role: 'Currency Preference: View', resourceGroup: 'View the set currency preferences for specific resources', rbacLevel: 'granular', description: 'View currency preferences for specific resources' }
          ]
        },
        edit: {
          global: [
            { resource: 'Currency Preference', role: 'Currency Preference: View', resourceGroup: 'View the set currency preferences', rbacLevel: 'global', description: 'View currency preferences' },
            { resource: 'Currency Preference', role: 'Currency Preference: Edit', resourceGroup: 'Edit the currency preferences', rbacLevel: 'global', description: 'Edit currency preferences' }
          ],
          granular: [
            { resource: 'Currency Preference', role: 'Currency Preference: View', resourceGroup: 'View the set currency preferences for specific resources', rbacLevel: 'granular', description: 'View currency preferences for specific resources' },
            { resource: 'Currency Preference', role: 'Currency Preference: Edit', resourceGroup: 'Edit the currency preferences for specific resources', rbacLevel: 'granular', description: 'Edit currency preferences for specific resources' }
          ]
        }
      },
      // ----------done-----------
      commitments: {
        view: {
          global: [
            { resource: 'Commitments', role: 'Commitments: View', resourceGroup: 'User needs to have Resource Groups selected as "All Account Level Resources"', rbacLevel: 'global', description: 'View commitments' }
          ],
          // no granular permissions in commitments 
          granular: [
            { resource: 'Commitments', role: 'NA', resourceGroup: 'NA', rbacLevel: 'granular', description: 'Not applicable for granular access' }
          ]
        },
        edit: {
          global: [
            { resource: 'Commitments', role: 'Commitments: Edit', resourceGroup: 'User needs to have Resource Groups selected as "All Account Level Resources"', rbacLevel: 'global', description: 'Edit commitments' }
          ],
          granular: [
            { resource: 'Commitments', role: 'NA', resourceGroup: 'NA', rbacLevel: 'granular', description: 'Not applicable for granular access' }
          ]
        }
      },
      'governance-rules': {
        view: {
          global: [
            { resource: 'Cloud Asset Governance Rules', role: 'Cloud Asset Governance Rules: View', resourceGroup: 'Cloud Asset Governance Rules: All', rbacLevel: 'global', description: 'View cloud asset governance rules' }
          ],
          granular: [
            { resource: 'Cloud Asset Governance Rules', role: 'Cloud Asset Governance Rules: View', resourceGroup: 'Cloud Asset Governance Rules: Specified', rbacLevel: 'granular', description: 'View cloud asset governance rules for specific resources' }
          ]
        },
        edit: {
          global: [
            { resource: 'Cloud Asset Governance Rules', role: 'Cloud Asset Governance Rules: Create/Edit', resourceGroup: 'Cloud Asset Governance Rules: All', rbacLevel: 'global', description: 'Create and edit cloud asset governance rules' },
            { resource: 'Cloud Asset Governance Rules', role: 'Cloud Asset Governance Rules: View, Cloud Asset Governance Rules: Create/Edit', resourceGroup: 'Cloud Asset Governance Rules: All', rbacLevel: 'global', description: 'View, create and edit cloud asset governance rules' },
            { resource: 'Cloud Asset Governance Rules', role: 'Cloud Asset Governance Rules: View, Cloud Asset Governance Rules: Create/Edit, Cloud Asset Governance Rules: Execute', resourceGroup: 'Cloud Asset Governance Rules: All', rbacLevel: 'global', description: 'View, create, edit and execute cloud asset governance rules' }

          ],
          granular: [
            { resource: 'Cloud Asset Governance Rules', role: 'Cloud Asset Governance Rules: View', resourceGroup: 'Cloud Asset Governance Rules: Specified', rbacLevel: 'granular', description: 'View cloud asset governance rules for specific resources' }
          ]
        },
        delete: {
          global: [
            { resource: 'Cloud Asset Governance Rules', role: 'Cloud Asset Governance Rules: View', resourceGroup: 'Cloud Asset Governance Rules: All', rbacLevel: 'global', description: 'View cloud asset governance rules' }
          ],
          granular: [
            { resource: 'Cloud Asset Governance Rules', role: 'Cloud Asset Governance Rules: View', resourceGroup: 'Cloud Asset Governance Rules: Specified', rbacLevel: 'granular', description: 'View cloud asset governance rules for specific resources' }
          ]
        },
        execute: {
          global: [
            { resource: 'Cloud Asset Governance Rules', role: 'Cloud Asset Governance Rules: View, Cloud Asset Governance Rules: Execute', resourceGroup: 'Cloud Asset Governance Rules: All', rbacLevel: 'global', description: 'View and execute cloud asset governance rules' },
          ],
          granular: [
            { resource: 'Cloud Asset Governance Rules', role: 'Cloud Asset Governance Rules: View', resourceGroup: 'View the cloud asset governance rules for specific resources', rbacLevel: 'granular', description: 'View cloud asset governance rules for specific resources' },
          ]
        }
      },
      recommendations: {
        view: {
          global: [
            { resource: 'Recommendations', role: 'Recommendations: View', resourceGroup: 'View recommendations', rbacLevel: 'global', description: 'View recommendations' }
          ],
          granular: [
            { resource: 'Recommendations', role: 'Recommendations: View', resourceGroup: 'View recommendations for specific resources', rbacLevel: 'granular', description: 'View recommendations for specific resources' }
          ]
        },
        manage: {
          global: [
            { resource: 'Recommendations', role: 'Recommendations: View', resourceGroup: 'View recommendations', rbacLevel: 'global', description: 'View recommendations' },
            { resource: 'Recommendations', role: 'Recommendations: Manage', resourceGroup: 'Manage and configure recommendations', rbacLevel: 'global', description: 'Manage and configure recommendations' }
          ],
          granular: [
            { resource: 'Recommendations', role: 'Recommendations: View', resourceGroup: 'View recommendations for specific resources', rbacLevel: 'granular', description: 'View recommendations for specific resources' },
            { resource: 'Recommendations', role: 'Recommendations: Manage', resourceGroup: 'Manage and configure recommendations for specific resources', rbacLevel: 'granular', description: 'Manage and configure recommendations for specific resources' }
          ]
        }
      },
      overview: {
        view: {
          global: [
            { resource: 'Overview', role: 'Overview', resourceGroup: 'View the Overview page', rbacLevel: 'global', description: 'View the Overview page' }
          ],
          granular: [
            { resource: 'Overview', role: 'Overview', resourceGroup: 'View the Overview page for specific resources', rbacLevel: 'granular', description: 'View the Overview page for specific resources' }
          ]
        }
      },
      'cluster-orchestrator': {
        view: {
          global: [
            { resource: 'Cluster Orchestrator', role: 'Cluster Orchestrator: View', resourceGroup: 'View cluster orchestrator settings', rbacLevel: 'global', description: 'View cluster orchestrator settings' }
          ],
          granular: [
            { resource: 'Cluster Orchestrator', role: 'Cluster Orchestrator: View', resourceGroup: 'View cluster orchestrator settings for specific resources', rbacLevel: 'granular', description: 'View cluster orchestrator settings for specific resources' }
          ]
        },
        edit: {
          global: [
            { resource: 'Cluster Orchestrator', role: 'Cluster Orchestrator: View', resourceGroup: 'View cluster orchestrator settings', rbacLevel: 'global', description: 'View cluster orchestrator settings' },
            { resource: 'Cluster Orchestrator', role: 'Cluster Orchestrator: Edit', resourceGroup: 'Configure cluster orchestrator settings', rbacLevel: 'global', description: 'Configure cluster orchestrator settings' }
          ],
          granular: [
            { resource: 'Cluster Orchestrator', role: 'Cluster Orchestrator: View', resourceGroup: 'View cluster orchestrator settings for specific resources', rbacLevel: 'granular', description: 'View cluster orchestrator settings for specific resources' },
            { resource: 'Cluster Orchestrator', role: 'Cluster Orchestrator: Edit', resourceGroup: 'Configure cluster orchestrator settings for specific resources', rbacLevel: 'granular', description: 'Configure cluster orchestrator settings for specific resources' }
          ]
        }
      },
      'governance-overview': {
        view: {
          global: [
            { resource: 'Cloud Asset Governance Overview', role: 'Cloud Asset Governance Overview: View', resourceGroup: 'View the cloud asset governance overview', rbacLevel: 'global', description: 'View the cloud asset governance overview' }
          ],
          granular: [
            { resource: 'Cloud Asset Governance Overview', role: 'Cloud Asset Governance Overview: View', resourceGroup: 'View the cloud asset governance overview for specific resources', rbacLevel: 'granular', description: 'View the cloud asset governance overview for specific resources' }
          ]
        }
      },
      // Default permissions for other features
      'governance-alerts': {
        view: {
          global: [
            { resource: 'Cloud Asset Governance Alerts', role: 'Cloud Asset Governance Alerts: View', resourceGroup: 'View the cloud asset governance alerts', rbacLevel: 'global', description: 'View cloud asset governance alerts' }
          ],
          granular: [
            { resource: 'Cloud Asset Governance Alerts', role: 'Cloud Asset Governance Alerts: View', resourceGroup: 'View the cloud asset governance alerts for specific resources', rbacLevel: 'granular', description: 'View cloud asset governance alerts for specific resources' }
          ]
        },
        edit: {
          global: [
            { resource: 'Cloud Asset Governance Alerts', role: 'Cloud Asset Governance Alerts: View', resourceGroup: 'View the cloud asset governance alerts', rbacLevel: 'global', description: 'View cloud asset governance alerts' },
            { resource: 'Cloud Asset Governance Alerts', role: 'Cloud Asset Governance Alerts: Edit', resourceGroup: 'Create/edit cloud asset governance alerts', rbacLevel: 'global', description: 'Create and edit cloud asset governance alerts' }
          ],
          granular: [
            { resource: 'Cloud Asset Governance Alerts', role: 'Cloud Asset Governance Alerts: View', resourceGroup: 'View the cloud asset governance alerts for specific resources', rbacLevel: 'granular', description: 'View cloud asset governance alerts for specific resources' },
            { resource: 'Cloud Asset Governance Alerts', role: 'Cloud Asset Governance Alerts: Edit', resourceGroup: 'Create/edit cloud asset governance alerts for specific resources', rbacLevel: 'granular', description: 'Create and edit cloud asset governance alerts for specific resources' }
          ]
        },
        delete: {
          global: [
            { resource: 'Cloud Asset Governance Alerts', role: 'Cloud Asset Governance Alerts: View', resourceGroup: 'View the cloud asset governance alerts', rbacLevel: 'global', description: 'View cloud asset governance alerts' },
            { resource: 'Cloud Asset Governance Alerts', role: 'Cloud Asset Governance Alerts: Delete', resourceGroup: 'Delete cloud asset governance alerts', rbacLevel: 'global', description: 'Delete cloud asset governance alerts' }
          ],
          granular: [
            { resource: 'Cloud Asset Governance Alerts', role: 'Cloud Asset Governance Alerts: View', resourceGroup: 'View the cloud asset governance alerts for specific resources', rbacLevel: 'granular', description: 'View cloud asset governance alerts for specific resources' },
            { resource: 'Cloud Asset Governance Alerts', role: 'Cloud Asset Governance Alerts: Delete', resourceGroup: 'Delete cloud asset governance alerts for specific resources', rbacLevel: 'granular', description: 'Delete cloud asset governance alerts for specific resources' }
          ]
        }
      },
      'cost-categories': {
        view: {
          global: [
            { resource: 'Cost Categories', role: 'Cost Categories: View', resourceGroup: 'User needs to have Resource Groups selected as "All Account Level Resources"', rbacLevel: 'global', description: 'View all cost categories' }
          ],
          granular: [
            { resource: 'Cost Categories', role: 'NA', resourceGroup: 'NA', rbacLevel: 'granular', description: 'Granular RBAC for cost categories is not supported' }
          ]
        },
        edit: {
          global: [
            { resource: 'Cost Categories', role: 'Cost Categories: View, Cost Categories: Create/Edit', resourceGroup: 'User needs to have Resource Groups selected as "All Account Level Resources"', rbacLevel: 'global', description: 'View, Create and Edit cost categories' },
          ],
          granular: [
            { resource: 'Cost Categories', role: 'NA', resourceGroup: 'NA', rbacLevel: 'granular', description: 'Granular RBAC for cost categories is not supported'},
          ]
        },
        delete: {
          global: [
            { resource: 'Cost Categories', role: 'Cost Categories: View, Cost Categories: Create/Edit, Cost Categories: Delete', resourceGroup: 'View all the cost categories', rbacLevel: 'global', description: 'View and Delete cost categories' },
          ],
          granular: [
            { resource: 'Cost Categories', role: 'NA', resourceGroup: 'NA', rbacLevel: 'granular', description: 'Granular RBAC for cost categories is not supported' },
          ]
        }
      },
      // ----done----
      perspectives: {
        view: {
          global: [
            { resource: 'Perspectives', role: 'Folders: View, Perspectives: View', resourceGroup: 'Folders: All', rbacLevel: 'global', description: 'View all perspectives' }
          ],
          granular: [
            { resource: 'Perspectives', role: 'Folders: View, Perspectives: View', resourceGroup: 'Folders: Specified', rbacLevel: 'granular', description: 'View perspectives on specified folders' }
          ]
        },
        edit: {
          global: [
            { resource: 'Perspectives', role: 'Folders: View, Perspectives: View, Perspectives: Create/Edit,  Folders: Create/Edit', resourceGroup: 'Folders: All', rbacLevel: 'global', description: 'View, Create and Edit all perspectives in all folders' }
          ],
          granular: [
            { resource: 'Perspectives', role: 'Folders: View, Perspectives: View, Perspectives: Create/Edit,  Folders: Create/Edit', resourceGroup: 'Folders: Specified', rbacLevel: 'granular', description: 'View, Create and Edit perspectives on specified folders' }
          ]
        },
        delete: {
          global: [
            { resource: 'Perspectives', role: 'Folders: View, Perspectives: View, Perspectives: Delete,  Folders: Delete', resourceGroup: 'Folders: All', rbacLevel: 'global', description: 'Delete all perspectives in all folders' }
          ],
          granular: [
            { resource: 'Perspectives', role: 'Folders: View, Perspectives: View, Perspectives: Delete,  Folders: Delete', resourceGroup: 'Folders: Specified', rbacLevel: 'granular', description: 'Delete perspectives on specified folders' }
          ]
        }
      },
// ------------done
      'autostopping-rules': {
        view: {
          global: [
            { resource: 'AutoStopping Rules', role: 'AutoStopping Rules: View, Connector: View', resourceGroup: 'Connectors: All', rbacLevel: 'global', description: 'View all AutoStopping rules' }
          ],
          granular: [
            { resource: 'AutoStopping Rules', role: 'AutoStopping Rules: View, Connectors: View ', resourceGroup: 'Connectors: Specified OR Connectors: By Type - Cloud Costs', rbacLevel: 'granular', description: 'View AutoStopping rules on specified connectors' }
          ]
        },
        edit: {
          global: [
            { resource: 'AutoStopping Rules', role: 'AutoStopping Rules: View, AutoStopping Rules: Create/Edit, Connectors: View', resourceGroup: 'Connectors: All', rbacLevel: 'global', description: 'View and edit all AutoStopping rules' },
          ],
          granular: [
            { resource: 'AutoStopping Rules', role: 'AutoStopping Rules: View, AutoStopping Rules: Create/Edit, Connectors: View', resourceGroup: 'Connectors: Specified OR Connectors: By Type - Cloud Costs', rbacLevel: 'granular', description: 'View and edit AutoStopping rules on specified connectors. Please note, you CANNOT create new connectors with this permission, and only use existing connectors.' },
          ]
        },
        delete: {
          global: [
            { resource: 'AutoStopping Rules', role: 'AutoStopping Rules: View, AutoStopping Rules: Delete, Connectors: View', resourceGroup: 'Connectors: All', rbacLevel: 'global', description: 'View and delete all AutoStopping rules' }
          ],
          granular: [
            { resource: 'AutoStopping Rules', role: 'AutoStopping Rules: View, AutoStopping Rules: Delete, Connectors: View', resourceGroup: 'Connectors: Specified OR Connectors: By Type - Cloud Costs', rbacLevel: 'granular', description: 'View and delete AutoStopping rules on specified connectors. Please note, you CANNOT create new connectors with this permission, and only use existing connectors.' }          ]
        }
      },
      // ----done 
      budgets: {
        view: {
          global: [
            { resource: 'Budgets', role: 'Budgets: View', resourceGroup: 'View the budgets page', rbacLevel: 'global', description: 'View all budgets' }
          ],
          granular: [
            { resource: 'Budgets', role: 'Budgets: View', resourceGroup: 'View specific budgets', rbacLevel: 'granular', description: 'View specific budgets' }
          ]
        },
        edit: {
          global: [
            { resource: 'Budgets', role: 'Budgets: View', resourceGroup: 'View the budgets page', rbacLevel: 'global', description: 'View all budgets' },
            { resource: 'Budgets', role: 'Budgets: Edit', resourceGroup: 'Create a perspective budget and edit existing', rbacLevel: 'global', description: 'Create and edit budgets' }
          ],
          granular: [
            { resource: 'Budgets', role: 'Budgets: View', resourceGroup: 'View specific budgets', rbacLevel: 'granular', description: 'View specific budgets' },
            { resource: 'Budgets', role: 'Budgets: Edit', resourceGroup: 'Create a perspective budget and edit specific existing budgets', rbacLevel: 'granular', description: 'Create and edit specific budgets' }
          ]
        },
        delete: {
          global: [
            { resource: 'Budgets', role: 'Budgets: View', resourceGroup: 'View the budgets page', rbacLevel: 'global', description: 'View all budgets' },
            { resource: 'Budgets', role: 'Budgets: Delete', resourceGroup: 'Delete a budget', rbacLevel: 'global', description: 'Delete budgets' }
          ],
          granular: [
            { resource: 'Budgets', role: 'Budgets: View', resourceGroup: 'View specific budgets', rbacLevel: 'granular', description: 'View specific budgets' },
            { resource: 'Budgets', role: 'Budgets: Delete', resourceGroup: 'Delete specific budgets', rbacLevel: 'granular', description: 'Delete specific budgets' }
          ]
        }
      },
      'governance-rule-sets': {
        view: {
          global: [
            { resource: 'Cloud Asset Governance Rule Sets', role: 'Cloud Asset Governance Rule Sets: View', resourceGroup: 'View the cloud asset governance rule sets', rbacLevel: 'global', description: 'View cloud asset governance rule sets' }
          ],
          granular: [
            { resource: 'Cloud Asset Governance Rule Sets', role: 'Cloud Asset Governance Rule Sets: View', resourceGroup: 'View specific cloud asset governance rule sets', rbacLevel: 'granular', description: 'View specific cloud asset governance rule sets' }
          ]
        },
        edit: {
          global: [
            { resource: 'Cloud Asset Governance Rule Sets', role: 'Cloud Asset Governance Rule Sets: View', resourceGroup: 'View the cloud asset governance rule sets', rbacLevel: 'global', description: 'View cloud asset governance rule sets' },
            { resource: 'Cloud Asset Governance Rule Sets', role: 'Cloud Asset Governance Rule Sets: Edit', resourceGroup: 'Create/edit cloud asset governance rule sets', rbacLevel: 'global', description: 'Create and edit cloud asset governance rule sets' }
          ],
          granular: [
            { resource: 'Cloud Asset Governance Rule Sets', role: 'Cloud Asset Governance Rule Sets: View', resourceGroup: 'View specific cloud asset governance rule sets', rbacLevel: 'granular', description: 'View specific cloud asset governance rule sets' },
            { resource: 'Cloud Asset Governance Rule Sets', role: 'Cloud Asset Governance Rule Sets: Edit', resourceGroup: 'Create/edit specific cloud asset governance rule sets', rbacLevel: 'granular', description: 'Create and edit specific cloud asset governance rule sets' }
          ]
        },
        delete: {
          global: [
            { resource: 'Cloud Asset Governance Rule Sets', role: 'Cloud Asset Governance Rule Sets: View', resourceGroup: 'View the cloud asset governance rule sets', rbacLevel: 'global', description: 'View cloud asset governance rule sets' },
            { resource: 'Cloud Asset Governance Rule Sets', role: 'Cloud Asset Governance Rule Sets: Delete', resourceGroup: 'Delete cloud asset governance rule sets', rbacLevel: 'global', description: 'Delete cloud asset governance rule sets' }
          ],
          granular: [
            { resource: 'Cloud Asset Governance Rule Sets', role: 'Cloud Asset Governance Rule Sets: View', resourceGroup: 'View specific cloud asset governance rule sets', rbacLevel: 'granular', description: 'View specific cloud asset governance rule sets' },
            { resource: 'Cloud Asset Governance Rule Sets', role: 'Cloud Asset Governance Rule Sets: Delete', resourceGroup: 'Delete specific cloud asset governance rule sets', rbacLevel: 'granular', description: 'Delete specific cloud asset governance rule sets' }
          ]
        }
      },
      'load-balancer': {
        view: {
          global: [
            { resource: 'Load Balancer', role: 'Load Balancer: View, Connector: View, AutoStopping Rules: View', resourceGroup: 'Connector: All', rbacLevel: 'global', description: 'View all load balancers' }
          ],
          granular: [
            { resource: 'Load Balancer', role: 'Load Balancer: View, Connector: View, AutoStopping Rules: View', resourceGroup: 'Connectors: Specified OR Connectors: By Type - Cloud Costs', rbacLevel: 'granular', description: 'View specific load balancers on specified connectors' }
          ]
        },
        edit: {
          global: [
            { resource: 'Load Balancer', role: 'Load Balancer: View, Load Balancer: Create/Edit, Connector: View, AutoStopping Rules: View', resourceGroup: 'Connector: All', rbacLevel: 'global', description: 'View, create and edit all load balancers' },
          ],
          granular: [
            { resource: 'Load Balancer', role: 'Load Balancer: View, Load Balancer: Create/Edit, Connector: View, AutoStopping Rules: View', resourceGroup: 'Connectors: Specified OR Connectors: By Type - Cloud Costs', rbacLevel: 'granular', description: 'View, create and edit specific load balancers on specified connectors' }
          ]
        },
        delete: {
          global: [
            { resource: 'Load Balancer', role: 'Load Balancer: View, Load Balancer: Delete, Connector: View, AutoStopping Rules: View', resourceGroup: 'View all the load balancers', rbacLevel: 'global', description: 'View all load balancers' },          ],
          granular: [
            { resource: 'Load Balancer', role: 'Load Balancer: View, Load Balancer: Delete, Connector: View, AutoStopping Rules: View', resourceGroup: 'Connectors: Specified OR Connectors: By Type - Cloud Costs', rbacLevel: 'granular', description: 'View, delete specific load balancers on specified connectors' },
          ]
        }
      },

      // ------done
      'governance-enforcements': {
        view: {
          global: [
            { resource: 'Cloud Asset Governance Enforcements', role: 'Cloud Asset Governance Enforcements: View', resourceGroup: 'View the cloud asset governance enforcements', rbacLevel: 'global', description: 'View cloud asset governance enforcements' }
          ],
          granular: [
            { resource: 'Cloud Asset Governance Enforcements', role: 'Cloud Asset Governance Enforcements: View', resourceGroup: 'View specific cloud asset governance enforcements', rbacLevel: 'granular', description: 'View specific cloud asset governance enforcements' }
          ]
        },
        edit: {
          global: [
            { resource: 'Cloud Asset Governance Enforcements', role: 'Cloud Asset Governance Enforcements: View', resourceGroup: 'View the cloud asset governance enforcements', rbacLevel: 'global', description: 'View cloud asset governance enforcements' },
            { resource: 'Cloud Asset Governance Enforcements', role: 'Cloud Asset Governance Enforcements: Edit', resourceGroup: 'Create/edit cloud asset governance enforcements', rbacLevel: 'global', description: 'Create and edit cloud asset governance enforcements' }
          ],
          granular: [
            { resource: 'Cloud Asset Governance Enforcements', role: 'Cloud Asset Governance Enforcements: View', resourceGroup: 'View specific cloud asset governance enforcements', rbacLevel: 'granular', description: 'View specific cloud asset governance enforcements' },
            { resource: 'Cloud Asset Governance Enforcements', role: 'Cloud Asset Governance Enforcements: Edit', resourceGroup: 'Create/edit specific cloud asset governance enforcements', rbacLevel: 'granular', description: 'Create and edit specific cloud asset governance enforcements' }
          ]
        },
        delete: {
          global: [
            { resource: 'Cloud Asset Governance Enforcements', role: 'Cloud Asset Governance Enforcements: View', resourceGroup: 'View the cloud asset governance enforcements', rbacLevel: 'global', description: 'View cloud asset governance enforcements' },
            { resource: 'Cloud Asset Governance Enforcements', role: 'Cloud Asset Governance Enforcements: Delete', resourceGroup: 'Delete cloud asset governance enforcements', rbacLevel: 'global', description: 'Delete cloud asset governance enforcements' }
          ],
          granular: [
            { resource: 'Cloud Asset Governance Enforcements', role: 'Cloud Asset Governance Enforcements: View', resourceGroup: 'View specific cloud asset governance enforcements', rbacLevel: 'granular', description: 'View specific cloud asset governance enforcements' },
            { resource: 'Cloud Asset Governance Enforcements', role: 'Cloud Asset Governance Enforcements: Delete', resourceGroup: 'Delete specific cloud asset governance enforcements', rbacLevel: 'granular', description: 'Delete specific cloud asset governance enforcements' }
          ]
        }
      }
    };

    // Return permissions for the specified feature, permission type, and RBAC level
    if (defaultPermissions[feature] && 
        defaultPermissions[feature][permType] && 
        defaultPermissions[feature][permType][rbacLvl]) {
      return defaultPermissions[feature][permType][rbacLvl];
    }
    
    return [];
  };

  // Update permissions when inputs change
  useEffect(() => {
    if (featureName) {
      setPermissions(getPermissions(featureName, permissionType, rbacLevel));
    }
  }, [featureName, permissionType, rbacLevel]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  // Helper function to check if a permission type is available for a feature
  const isPermissionTypeAvailable = (feature: string, permType: string): boolean => {
    const availablePermissions: Record<string, string[]> = {
      anomalies: ['view', 'manage'],
      'currency-preferences': ['view', 'edit'],
      commitments: ['view', 'edit'],
      'governance-rules': ['view', 'edit', 'delete', 'execute'],
      recommendations: ['view', 'manage'],
      overview: ['view'],
      'cluster-orchestrator': ['view', 'edit'],
      'governance-overview': ['view'],
      // Default permissions for other features
      'governance-alerts': ['view', 'edit', 'delete'],
      'cost-categories': ['view', 'edit', 'delete'],
      perspectives: ['view', 'edit', 'delete'],
      'autostopping-rules': ['view', 'edit', 'delete'],
      budgets: ['view', 'edit', 'delete'],
      'governance-rule-sets': ['view', 'edit', 'delete'],
      'load-balancer': ['view', 'edit', 'delete'],
      'governance-enforcements': ['view', 'edit', 'delete']
    };

    return availablePermissions[feature]?.includes(permType) || false;
  };

  return (
    <div className={stylesModule.permissionsContainer}>
      <div className={stylesModule.header}>
        <h3>CCM Permissions Finder</h3>
      </div>
      
      <div className={stylesModule.permissionsForm}>
        <form onSubmit={handleSubmit}>
          <div className={stylesModule.formGroup}>
            <label htmlFor="feature-name">Feature:</label>
            <select 
              id="feature-name" 
              value={featureName} 
              onChange={(e) => {
                setFeatureName(e.target.value);
                // Reset permission type if not available for the selected feature
                if (e.target.value && !isPermissionTypeAvailable(e.target.value, permissionType)) {
                  setPermissionType('view'); // Default to view
                }
                setShowResults(false);
              }}
              required
            >
              <option value="">Select a feature</option>
              {featureOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          
          <div className={stylesModule.formGroup}>
            <label htmlFor="rbac-level">RBAC Level:</label>
            <select 
              id="rbac-level" 
              value={rbacLevel} 
              onChange={(e) => {
                setRbacLevel(e.target.value);
                setShowResults(false);
              }}
              required
            >
              <option value="global">All Resources (Global)</option>
              <option value="granular">Specific Resources (Granular)</option>
            </select>
          </div>
          
          <div className={stylesModule.formGroup}>
            <label htmlFor="permission-type">Permission Type:</label>
            <select 
              id="permission-type" 
              value={permissionType} 
              onChange={(e) => {
                setPermissionType(e.target.value);
                setShowResults(false);
              }}
              required
            >
              {/* Always show View option */}
              <option value="view">View</option>
              
              {/* Show Manage option for specific features */}
              {(featureName === 'anomalies' || featureName === 'recommendations') && 
                <option value="manage">Manage</option>}
              
              {/* Show Edit option for specific features */}
              {isPermissionTypeAvailable(featureName, 'edit') && 
                <option value="edit">Edit/Create</option>}
              
              {/* Show Delete option for specific features */}
              {isPermissionTypeAvailable(featureName, 'delete') && 
                <option value="delete">Delete</option>}
              
              {/* Show Execute option only for governance-rules */}
              {featureName === 'governance-rules' && 
                <option value="execute">Execute</option>}
            </select>
          </div>
          
          <button type="submit" className={stylesModule.submitButton}>Find Permissions</button>
        </form>
      </div>
      
      {showResults && (
        <div className={stylesModule.resultsContainer}>
          <div className={stylesModule.permissionsTableContainer}>
            <h4>Required Permissions</h4>
            {permissions.length > 0 ? (
              <div>
                <p id="permission-description" className={stylesModule.permissionDescription}></p>
                <div className={stylesModule.permissionDescriptionHelp}>Hover over a permission to see more details</div>
                <table>
                  <thead>
                    <tr>
                      <th>Resource</th>
                      <th>Roles</th>
                      <th>Resource Group</th>
                    </tr>
                  </thead>
                  <tbody>
                    {permissions.map((permission, index) => (
                      <tr key={index} title={permission.description}>
                        <td>{permission.resource}</td>
                        <td>{permission.role}</td>
                        <td>{permission.resourceGroup}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No specific permissions found for this combination. Please select different options or contact support.</p>
            )}
          </div>
          
          <div className={stylesModule.tutorialContainer}>
            <h4>How to Set Up Roles</h4>
            <p>Follow these steps to set up the appropriate roles for {featureOptions.find(f => f.value === featureName)?.label || 'your feature'}:</p>
            
            <ol className={stylesModule.tutorialSteps}>
              <li>Navigate to <strong>Account Settings &gt; Access Control &gt; Roles</strong></li>
              <li>Click <strong>+ New Role</strong> to create a custom role</li>
              <li>Name your role appropriately (e.g., "{featureName.charAt(0).toUpperCase() + featureName.slice(1)} {permissionType.charAt(0).toUpperCase() + permissionType.slice(1)}")</li>
              <li>Under <strong>Cloud Cost Management</strong>, select the permissions shown in the table above</li>
              <li>Click <strong>Save</strong> to create the role</li>
              <li>Go to <strong>Account Settings &gt; Access Control &gt; Users</strong></li>
              <li>Select the user you want to assign this role to</li>
              <li>Click <strong>Add Role</strong> and select your newly created role</li>
            </ol>
            
            <h4>How to Set Up Resource Groups</h4>
            <p>For granular access control, you can set up resource groups:</p>
            
            <ol className={stylesModule.tutorialSteps}>
              <li>Navigate to <strong>Account Settings &gt; Access Control &gt; Resource Groups</strong></li>
              <li>Click <strong>+ New Resource Group</strong></li>
              <li>Name your resource group (e.g., "{featureName.charAt(0).toUpperCase() + featureName.slice(1)} Resources")</li>
              <li>Select the resources you want to include in this group</li>
              <li>Under <strong>Filters</strong>, define criteria to include specific resources</li>
              <li>Click <strong>Save</strong> to create the resource group</li>
              <li>Go to <strong>Account Settings &gt; Access Control &gt; User Groups</strong></li>
              <li>Create or select a user group and assign both the role and resource group</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}

export function PermissionsBehaviorChecker() {
  const [featureName, setFeatureName] = useState('');
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedResourceGroup, setSelectedResourceGroup] = useState<string>('');
  const [showResults, setShowResults] = useState(false);
  const [behavior, setBehavior] = useState('');
  const [availableRoles, setAvailableRoles] = useState<{value: string, label: string}[]>([]);
  const [availableResourceGroups, setAvailableResourceGroups] = useState<{value: string, label: string}[]>([]);
  
  // Use the same permission mappings as the main component
  const getCompletePermissionMappings = () => {
    // This function replicates the getPermissions function's permission mappings
    const defaultPermissions: Record<string, Record<string, Record<string, Permission[]>>> = {
      anomalies: {
        view: {
          global: [
            { resource: 'Anomalies', role: 'Folders: View, Perspectives: View, Anomalies: View', resourceGroup: 'Anomalies: View', rbacLevel: 'global', description: 'View anomalies' }
          ],
          granular: [
            { resource: 'Anomalies', role: 'Folders: View, Perspectives: View', resourceGroup: 'Folders: Specified', rbacLevel: 'granular', description: 'View anomalies for specific resources' }
          ]
        },
        manage: {
          global: [
            { resource: 'Anomalies', role: 'Anomalies: Manage, Folders: View, Perspectives: View', resourceGroup: 'Anomalies: View', rbacLevel: 'global', description: 'Manage anomaly detection settings' }
          ],
          granular: [
            { resource: 'Anomalies', role: 'Anomalies: Manage, Folders: View, Perspectives: View', resourceGroup: 'Folders: Specified', rbacLevel: 'granular', description: 'Manage anomaly detection settings for specific resources' }
          ]
        }
      },
      'currency-preferences': {
        view: {
          global: [
            { resource: 'Currency Preference', role: 'Currency Preference: View', resourceGroup: 'View the set currency preferences', rbacLevel: 'global', description: 'View currency preferences' }
          ],
          granular: [
            { resource: 'Currency Preference', role: 'Currency Preference: View', resourceGroup: 'View the set currency preferences for specific resources', rbacLevel: 'granular', description: 'View currency preferences for specific resources' }
          ]
        },
        edit: {
          global: [
            { resource: 'Currency Preference', role: 'Currency Preference: View', resourceGroup: 'View the set currency preferences', rbacLevel: 'global', description: 'View currency preferences' },
            { resource: 'Currency Preference', role: 'Currency Preference: Edit', resourceGroup: 'Edit the currency preferences', rbacLevel: 'global', description: 'Edit currency preferences' }
          ],
          granular: [
            { resource: 'Currency Preference', role: 'Currency Preference: View', resourceGroup: 'View the set currency preferences for specific resources', rbacLevel: 'granular', description: 'View currency preferences for specific resources' },
            { resource: 'Currency Preference', role: 'Currency Preference: Edit', resourceGroup: 'Edit the currency preferences for specific resources', rbacLevel: 'granular', description: 'Edit currency preferences for specific resources' }
          ]
        }
      },
      commitments: {
        view: {
          global: [
            { resource: 'Commitments', role: 'Commitments: View', resourceGroup: 'User needs to have Resource Groups selected as "All Account Level Resources"', rbacLevel: 'global', description: 'View commitments' }
          ],
          granular: [
            { resource: 'Commitments', role: 'NA', resourceGroup: 'NA', rbacLevel: 'granular', description: 'Not applicable for granular access' }
          ]
        },
        edit: {
          global: [
            { resource: 'Commitments', role: 'Commitments: Edit', resourceGroup: 'User needs to have Resource Groups selected as "All Account Level Resources"', rbacLevel: 'global', description: 'Edit commitments' }
          ],
          granular: [
            { resource: 'Commitments', role: 'NA', resourceGroup: 'NA', rbacLevel: 'granular', description: 'Not applicable for granular access' }
          ]
        }
      },
      'governance-rules': {
        view: {
          global: [
            { resource: 'Cloud Asset Governance Rules', role: 'Cloud Asset Governance Rules: View', resourceGroup: 'Cloud Asset Governance Rules: All', rbacLevel: 'global', description: 'View cloud asset governance rules' }
          ],
          granular: [
            { resource: 'Cloud Asset Governance Rules', role: 'Cloud Asset Governance Rules: View', resourceGroup: 'Cloud Asset Governance Rules: Specified', rbacLevel: 'granular', description: 'View cloud asset governance rules for specific resources' }
          ]
        },
        edit: {
          global: [
            { resource: 'Cloud Asset Governance Rules', role: 'Cloud Asset Governance Rules: View, Cloud Asset Governance Rules: Create/Edit, Cloud Asset Governance Rules: Execute', resourceGroup: 'Cloud Asset Governance Rules: All', rbacLevel: 'global', description: 'View, Create and edit cloud asset governance rules. Please note, for executing a rule, user must have Role: "Connector" and Resource Group: "Connector" in order to see the Target Accounts/Subscriptions/Projects. Else the user will not be able to execute the rule. ' }
          ],
          granular: [
            { resource: 'Cloud Asset Governance Rules', role: 'Cloud Asset Governance Rules: View, Cloud Asset Governance Rules: Create/Edit, Cloud Asset Governance Rules: Execute', resourceGroup: 'Cloud Asset Governance Rules: Specified', rbacLevel: 'granular', description: 'View, Create and edit cloud asset governance rules for specific resources. Please note, for executing a rule, user must have Role: "Connector" and Resource Group: "Connector" in order to see the Target Accounts/Subscriptions/Projects. Else the user will not be able to execute the rule.' }
          ]
        },
        delete: {
          global: [
            { resource: 'Cloud Asset Governance Rules', role: 'Cloud Asset Governance Rules: View', resourceGroup: 'Cloud Asset Governance Rules: All', rbacLevel: 'global', description: 'View cloud asset governance rules' }
          ],
          granular: [
            { resource: 'Cloud Asset Governance Rules', role: 'Cloud Asset Governance Rules: View', resourceGroup: 'Cloud Asset Governance Rules: Specified', rbacLevel: 'granular', description: 'View cloud asset governance rules for specific resources' }
          ]
        },
        execute: {
          global: [
            { resource: 'Cloud Asset Governance Rules', role: 'Cloud Asset Governance Rules: View, Cloud Asset Governance Rules: Execute', resourceGroup: 'Cloud Asset Governance Rules: All', rbacLevel: 'global', description: 'View and execute cloud asset governance rules' },
          ],
          granular: [
            { resource: 'Cloud Asset Governance Rules', role: 'Cloud Asset Governance Rules: View', resourceGroup: 'View the cloud asset governance rules for specific resources', rbacLevel: 'granular', description: 'View cloud asset governance rules for specific resources' },
          ]
        }
      },
      recommendations: {
        view: {
          global: [
            { resource: 'Recommendations', role: 'Recommendations: View', resourceGroup: 'View recommendations', rbacLevel: 'global', description: 'View recommendations' }
          ],
          granular: [
            { resource: 'Recommendations', role: 'Recommendations: View', resourceGroup: 'View recommendations for specific resources', rbacLevel: 'granular', description: 'View recommendations for specific resources' }
          ]
        },
        manage: {
          global: [
            { resource: 'Recommendations', role: 'Recommendations: View', resourceGroup: 'View recommendations', rbacLevel: 'global', description: 'View recommendations' },
            { resource: 'Recommendations', role: 'Recommendations: Manage', resourceGroup: 'Manage and configure recommendations', rbacLevel: 'global', description: 'Manage and configure recommendations' }
          ],
          granular: [
            { resource: 'Recommendations', role: 'Recommendations: View', resourceGroup: 'View recommendations for specific resources', rbacLevel: 'granular', description: 'View recommendations for specific resources' },
            { resource: 'Recommendations', role: 'Recommendations: Manage', resourceGroup: 'Manage and configure recommendations for specific resources', rbacLevel: 'granular', description: 'Manage and configure recommendations for specific resources' }
          ]
        }
      },
      overview: {
        view: {
          global: [
            { resource: 'Overview', role: 'Overview', resourceGroup: 'View the Overview page', rbacLevel: 'global', description: 'View the Overview page' }
          ],
          granular: [
            { resource: 'Overview', role: 'Overview', resourceGroup: 'View the Overview page for specific resources', rbacLevel: 'granular', description: 'View the Overview page for specific resources' }
          ]
        }
      },
      'cluster-orchestrator': {
        view: {
          global: [
            { resource: 'Cluster Orchestrator', role: 'Cluster Orchestrator: View', resourceGroup: 'User needs to have Resource Groups selected as "All Account Level Resources"', rbacLevel: 'global', description: 'View cluster orchestrator with details of clusters.' }
          ],
          granular: [
            { resource: 'Cluster Orchestrator', role: 'NA', resourceGroup: 'NA', rbacLevel: 'granular', description: 'Granular RBAC for Cluster Orchestrator is not available yet' }
          ]
        },
        edit: {
          global: [
            { resource: 'Cluster Orchestrator', role: 'Cluster Orchestrator: View, Cluster Orchestrator: Create/Edit', resourceGroup: 'User needs to have Resource Groups selected as "All Account Level Resources"', rbacLevel: 'global', description: 'View, Enable Cluster Orchestrator and Edit Cluster Orchestrator settings' }
          ],
          granular: [
            { resource: 'Cluster Orchestrator', role: 'NA', resourceGroup: 'NA', rbacLevel: 'granular', description: 'Granular RBAC for Cluster Orchestrator is not available yet' },
          ]
        }
      },
      'governance-overview': {
        view: {
          global: [
            { resource: 'Cloud Asset Governance Overview', role: 'Cloud Asset Governance Overview: View', resourceGroup: 'View the cloud asset governance overview', rbacLevel: 'global', description: 'View the cloud asset governance overview' }
          ],
          granular: [
            { resource: 'Cloud Asset Governance Overview', role: 'NA', resourceGroup: 'NA', rbacLevel: 'granular', description: 'Granular RBAC for Cloud Asset Governance Overview is not available yet' }
          ]
        }
      },
      'governance-alerts': {
        view: {
          global: [
            { resource: 'Cloud Asset Governance Alerts', role: 'Cloud Asset Governance Alerts: View', resourceGroup: 'View the cloud asset governance alerts', rbacLevel: 'global', description: 'View cloud asset governance alerts' }
          ],
          granular: [
            { resource: 'Cloud Asset Governance Alerts', role: 'Cloud Asset Governance Alerts: View', resourceGroup: 'View the cloud asset governance alerts for specific resources', rbacLevel: 'granular', description: 'View cloud asset governance alerts for specific resources' }
          ]
        },
        edit: {
          global: [
            { resource: 'Cloud Asset Governance Alerts', role: 'Cloud Asset Governance Alerts: View', resourceGroup: 'View the cloud asset governance alerts', rbacLevel: 'global', description: 'View cloud asset governance alerts' },
            { resource: 'Cloud Asset Governance Alerts', role: 'Cloud Asset Governance Alerts: Edit', resourceGroup: 'Create/edit cloud asset governance alerts', rbacLevel: 'global', description: 'Create and edit cloud asset governance alerts' }
          ],
          granular: [
            { resource: 'Cloud Asset Governance Alerts', role: 'Cloud Asset Governance Alerts: View', resourceGroup: 'View the cloud asset governance alerts for specific resources', rbacLevel: 'granular', description: 'View cloud asset governance alerts for specific resources' },
            { resource: 'Cloud Asset Governance Alerts', role: 'Cloud Asset Governance Alerts: Edit', resourceGroup: 'Create/edit cloud asset governance alerts for specific resources', rbacLevel: 'granular', description: 'Create and edit cloud asset governance alerts for specific resources' }
          ]
        },
        delete: {
          global: [
            { resource: 'Cloud Asset Governance Alerts', role: 'Cloud Asset Governance Alerts: View', resourceGroup: 'View the cloud asset governance alerts', rbacLevel: 'global', description: 'View cloud asset governance alerts' },
            { resource: 'Cloud Asset Governance Alerts', role: 'Cloud Asset Governance Alerts: Delete', resourceGroup: 'Delete cloud asset governance alerts', rbacLevel: 'global', description: 'Delete cloud asset governance alerts' }
          ],
          granular: [
            { resource: 'Cloud Asset Governance Alerts', role: 'Cloud Asset Governance Alerts: View', resourceGroup: 'View the cloud asset governance alerts for specific resources', rbacLevel: 'granular', description: 'View cloud asset governance alerts for specific resources' },
            { resource: 'Cloud Asset Governance Alerts', role: 'Cloud Asset Governance Alerts: Delete', resourceGroup: 'Delete cloud asset governance alerts for specific resources', rbacLevel: 'granular', description: 'Delete cloud asset governance alerts for specific resources' }
          ]
        }
      },
      'cost-categories': {
        view: {
          global: [
            { resource: 'Cost Categories', role: 'Cost Categories: View', resourceGroup: 'User needs to have Resource Groups selected as "All Account Level Resources"', rbacLevel: 'global', description: 'View all cost categories' }
          ],
          granular: [
            { resource: 'Cost Categories', role: 'NA', resourceGroup: 'NA', rbacLevel: 'granular', description: 'Granular RBAC for cost categories is not supported' }
          ]
        },
        edit: {
          global: [
            { resource: 'Cost Categories', role: 'Cost Categories: View, Cost Categories: Create/Edit', resourceGroup: 'User needs to have Resource Groups selected as "All Account Level Resources"', rbacLevel: 'global', description: 'View, Create and Edit cost categories' },
          ],
          granular: [
            { resource: 'Cost Categories', role: 'NA', resourceGroup: 'NA', rbacLevel: 'granular', description: 'Granular RBAC for cost categories is not supported'},
          ]
        },
        delete: {
          global: [
            { resource: 'Cost Categories', role: 'Cost Categories: View, Cost Categories: Create/Edit, Cost Categories: Delete', resourceGroup: 'View all the cost categories', rbacLevel: 'global', description: 'View and Delete cost categories' },
          ],
          granular: [
            { resource: 'Cost Categories', role: 'NA', resourceGroup: 'NA', rbacLevel: 'granular', description: 'Granular RBAC for cost categories is not supported' },
          ]
        }
      },
      perspectives: {
        view: {
          global: [
            { resource: 'Perspectives', role: 'Folders: View, Perspectives: View', resourceGroup: 'Folders: All', rbacLevel: 'global', description: 'View all perspectives' }
          ],
          granular: [
            { resource: 'Perspectives', role: 'Folders: View, Perspectives: View', resourceGroup: 'Folders: Specified', rbacLevel: 'granular', description: 'View perspectives on specified folders' }
          ]
        },
        edit: {
          global: [
            { resource: 'Perspectives', role: 'Folders: View, Perspectives: View, Perspectives: Create/Edit,  Folders: Create/Edit', resourceGroup: 'Folders: All', rbacLevel: 'global', description: 'View, Create and Edit all perspectives in all folders' }
          ],
          granular: [
            { resource: 'Perspectives', role: 'Folders: View, Perspectives: View, Perspectives: Create/Edit,  Folders: Create/Edit', resourceGroup: 'Folders: Specified', rbacLevel: 'granular', description: 'View, Create and Edit perspectives on specified folders' }
          ]
        },
        delete: {
          global: [
            { resource: 'Perspectives', role: 'Folders: View, Perspectives: View, Perspectives: Delete,  Folders: Delete', resourceGroup: 'Folders: All', rbacLevel: 'global', description: 'Delete all perspectives in all folders' }
          ],
          granular: [
            { resource: 'Perspectives', role: 'Folders: View, Perspectives: View, Perspectives: Delete,  Folders: Delete', resourceGroup: 'Folders: Specified', rbacLevel: 'granular', description: 'Delete perspectives on specified folders' }
          ]
        }
      },
      'autostopping-rules': {
        view: {
          global: [
            { resource: 'AutoStopping Rules', role: 'AutoStopping Rules: View, Connector: View', resourceGroup: 'Connectors: All', rbacLevel: 'global', description: 'View all AutoStopping rules' }
          ],
          granular: [
            { resource: 'AutoStopping Rules', role: 'AutoStopping Rules: View, Connectors: View ', resourceGroup: 'Connectors: Specified OR Connectors: By Type - Cloud Costs', rbacLevel: 'granular', description: 'View AutoStopping rules on specified connectors' }
          ]
        },
        edit: {
          global: [
            { resource: 'AutoStopping Rules', role: 'AutoStopping Rules: View, AutoStopping Rules: Create/Edit, Connectors: View', resourceGroup: 'Connectors: All', rbacLevel: 'global', description: 'View and edit all AutoStopping rules' },
          ],
          granular: [
            { resource: 'AutoStopping Rules', role: 'AutoStopping Rules: View, AutoStopping Rules: Create/Edit, Connectors: View', resourceGroup: 'Connectors: Specified OR Connectors: By Type - Cloud Costs', rbacLevel: 'granular', description: 'View and edit AutoStopping rules on specified connectors. Please note, you CANNOT create new connectors with this permission, and only use existing connectors.' },
          ]
        },
        delete: {
          global: [
            { resource: 'AutoStopping Rules', role: 'AutoStopping Rules: View, AutoStopping Rules: Delete, Connectors: View', resourceGroup: 'Connectors: All', rbacLevel: 'global', description: 'View and delete all AutoStopping rules' }
          ],
          granular: [
            { resource: 'AutoStopping Rules', role: 'AutoStopping Rules: View, AutoStopping Rules: Delete, Connectors: View', resourceGroup: 'Connectors: Specified OR Connectors: By Type - Cloud Costs', rbacLevel: 'granular', description: 'View and delete AutoStopping rules on specified connectors. Please note, you CANNOT create new connectors with this permission, and only use existing connectors.' }
          ]
        }
      },
      budgets: {
        view: {
          global: [
            { resource: 'Budgets', role: 'Budgets: View', resourceGroup: 'Folders: All', rbacLevel: 'global', description: 'View all budgets' },          ],
          granular: [
            { resource: 'Budgets', role: 'Budgets: View', resourceGroup: 'Folders: Specified', rbacLevel: 'granular', description: 'View budgets on specified folders' }
          ]
        },
        edit: {
          global: [
            { resource: 'Budgets', role: 'Budgets: View, Budgets: Create/Edit', resourceGroup: 'Folders: All', rbacLevel: 'global', description: 'View, Create and edit all budgets' },
          ],
          granular: [
            { resource: 'Budgets', role: 'Budgets: View, Budgets: Create/Edit', resourceGroup: 'Folders: Specified', rbacLevel: 'granular', description: 'View, Create and edit budgets on specified folders' }
          ]
        },
        delete: {
          global: [
            { resource: 'Budgets', role: 'Budgets: View, Budgets: Delete', resourceGroup: 'Folders: All', rbacLevel: 'global', description: 'View and delete all budgets' }
          ],
          granular: [
            { resource: 'Budgets', role: 'Budgets: View, Budgets: Delete', resourceGroup: 'Folders: Specified', rbacLevel: 'granular', description: 'View and delete budgets on specified folders' }
          ]
        }
      },
      'governance-rule-sets': {
        view: {
          global: [
            { resource: 'Cloud Asset Governance Rule Sets', role: 'Cloud Asset Governance Rule Sets: View', resourceGroup: 'View the cloud asset governance rule sets', rbacLevel: 'global', description: 'View cloud asset governance rule sets' }
          ],
          granular: [
            { resource: 'Cloud Asset Governance Rule Sets', role: 'Cloud Asset Governance Rule Sets: View', resourceGroup: 'View specific cloud asset governance rule sets', rbacLevel: 'granular', description: 'View specific cloud asset governance rule sets' }
          ]
        },
        edit: {
          global: [
            { resource: 'Cloud Asset Governance Rule Sets', role: 'Cloud Asset Governance Rule Sets: View', resourceGroup: 'View the cloud asset governance rule sets', rbacLevel: 'global', description: 'View cloud asset governance rule sets' },
            { resource: 'Cloud Asset Governance Rule Sets', role: 'Cloud Asset Governance Rule Sets: Edit', resourceGroup: 'Create/edit cloud asset governance rule sets', rbacLevel: 'global', description: 'Create and edit cloud asset governance rule sets' }
          ],
          granular: [
            { resource: 'Cloud Asset Governance Rule Sets', role: 'Cloud Asset Governance Rule Sets: View', resourceGroup: 'View specific cloud asset governance rule sets', rbacLevel: 'granular', description: 'View specific cloud asset governance rule sets' },
            { resource: 'Cloud Asset Governance Rule Sets', role: 'Cloud Asset Governance Rule Sets: Edit', resourceGroup: 'Create/edit specific cloud asset governance rule sets', rbacLevel: 'granular', description: 'Create and edit specific cloud asset governance rule sets' }
          ]
        },
        delete: {
          global: [
            { resource: 'Cloud Asset Governance Rule Sets', role: 'Cloud Asset Governance Rule Sets: View', resourceGroup: 'View the cloud asset governance rule sets', rbacLevel: 'global', description: 'View cloud asset governance rule sets' },
            { resource: 'Cloud Asset Governance Rule Sets', role: 'Cloud Asset Governance Rule Sets: Delete', resourceGroup: 'Delete cloud asset governance rule sets', rbacLevel: 'global', description: 'Delete cloud asset governance rule sets' }
          ],
          granular: [
            { resource: 'Cloud Asset Governance Rule Sets', role: 'Cloud Asset Governance Rule Sets: View', resourceGroup: 'View specific cloud asset governance rule sets', rbacLevel: 'granular', description: 'View specific cloud asset governance rule sets' },
            { resource: 'Cloud Asset Governance Rule Sets', role: 'Cloud Asset Governance Rule Sets: Delete', resourceGroup: 'Delete specific cloud asset governance rule sets', rbacLevel: 'granular', description: 'Delete specific cloud asset governance rule sets' }
          ]
        }
      },
      'load-balancer': {
        view: {
          global: [
            { resource: 'Load Balancer', role: 'Load Balancer: View, Connector: View, AutoStopping Rules: View', resourceGroup: 'Connector: All', rbacLevel: 'global', description: 'View all load balancers' }
          ],
          granular: [
            { resource: 'Load Balancer', role: 'Load Balancer: View, Connector: View, AutoStopping Rules: View', resourceGroup: 'Connectors: Specified OR Connectors: By Type - Cloud Costs', rbacLevel: 'granular', description: 'View specific load balancers on specified connectors' }
          ]
        },
        edit: {
          global: [
            { resource: 'Load Balancer', role: 'Load Balancer: View, Load Balancer: Create/Edit, Connector: View, AutoStopping Rules: View', resourceGroup: 'Connector: All', rbacLevel: 'global', description: 'View, create and edit all load balancers' },
          ],
          granular: [
            { resource: 'Load Balancer', role: 'Load Balancer: View, Load Balancer: Create/Edit, Connector: View, AutoStopping Rules: View', resourceGroup: 'Connectors: Specified OR Connectors: By Type - Cloud Costs', rbacLevel: 'granular', description: 'View, create and edit specific load balancers on specified connectors' }
          ]
        },
        delete: {
          global: [
            { resource: 'Load Balancer', role: 'Load Balancer: View, Load Balancer: Delete, Connector: View, AutoStopping Rules: View', resourceGroup: 'View all the load balancers', rbacLevel: 'global', description: 'View all load balancers' },
          ],
          granular: [
            { resource: 'Load Balancer', role: 'Load Balancer: View, Load Balancer: Delete, Connector: View, AutoStopping Rules: View', resourceGroup: 'Connectors: Specified OR Connectors: By Type - Cloud Costs', rbacLevel: 'granular', description: 'View, delete specific load balancers on specified connectors' },
          ]
        }
      },
      'governance-enforcements': {
        view: {
          global: [
            { resource: 'Cloud Asset Governance Enforcements', role: 'Cloud Asset Governance Enforcements: View', resourceGroup: 'View the cloud asset governance enforcements', rbacLevel: 'global', description: 'View cloud asset governance enforcements' }
          ],
          granular: [
            { resource: 'Cloud Asset Governance Enforcements', role: 'Cloud Asset Governance Enforcements: View', resourceGroup: 'View specific cloud asset governance enforcements', rbacLevel: 'granular', description: 'View specific cloud asset governance enforcements' }
          ]
        },
        edit: {
          global: [
            { resource: 'Cloud Asset Governance Enforcements', role: 'Cloud Asset Governance Enforcements: View', resourceGroup: 'View the cloud asset governance enforcements', rbacLevel: 'global', description: 'View cloud asset governance enforcements' },
            { resource: 'Cloud Asset Governance Enforcements', role: 'Cloud Asset Governance Enforcements: Edit', resourceGroup: 'Create/edit cloud asset governance enforcements', rbacLevel: 'global', description: 'Create and edit cloud asset governance enforcements' }
          ],
          granular: [
            { resource: 'Cloud Asset Governance Enforcements', role: 'Cloud Asset Governance Enforcements: View', resourceGroup: 'View specific cloud asset governance enforcements', rbacLevel: 'granular', description: 'View specific cloud asset governance enforcements' },
            { resource: 'Cloud Asset Governance Enforcements', role: 'Cloud Asset Governance Enforcements: Edit', resourceGroup: 'Create/edit specific cloud asset governance enforcements', rbacLevel: 'granular', description: 'Create and edit specific cloud asset governance enforcements' }
          ]
        },
        delete: {
          global: [
            { resource: 'Cloud Asset Governance Enforcements', role: 'Cloud Asset Governance Enforcements: View', resourceGroup: 'View the cloud asset governance enforcements', rbacLevel: 'global', description: 'View cloud asset governance enforcements' },
            { resource: 'Cloud Asset Governance Enforcements', role: 'Cloud Asset Governance Enforcements: Delete', resourceGroup: 'Delete cloud asset governance enforcements', rbacLevel: 'global', description: 'Delete cloud asset governance enforcements' }
          ],
          granular: [
            { resource: 'Cloud Asset Governance Enforcements', role: 'Cloud Asset Governance Enforcements: View', resourceGroup: 'View specific cloud asset governance enforcements', rbacLevel: 'granular', description: 'View specific cloud asset governance enforcements' },
            { resource: 'Cloud Asset Governance Enforcements', role: 'Cloud Asset Governance Enforcements: Delete', resourceGroup: 'Delete specific cloud asset governance enforcements', rbacLevel: 'granular', description: 'Delete specific cloud asset governance enforcements' }
          ]
        }
      }
    };
    
    return defaultPermissions;
  };
  
  // Use the complete permission mappings
  const permissionMappings = getCompletePermissionMappings();

  const featureOptions = [
    { value: 'anomalies', label: 'Anomalies' },
    { value: 'currency-preferences', label: 'Currency Preferences' },
    { value: 'commitments', label: 'Commitments' },
    { value: 'governance-rules', label: 'Cloud Asset Governance Rules' },
    { value: 'recommendations', label: 'Recommendations' },
    { value: 'overview', label: 'Overview' },
    { value: 'cluster-orchestrator', label: 'Cluster Orchestrator' },
    { value: 'governance-overview', label: 'Cloud Asset Governance Features' },
    { value: 'cost-categories', label: 'Cost Categories' },
    { value: 'governance-alerts', label: 'Governance Alerts' },
    { value: 'autostopping-rules', label: 'AutoStopping Rules' },
    { value: 'budgets', label: 'Budgets' },
    { value: 'load-balancer', label: 'Load Balancer' },
    { value: 'governance-enforcements', label: 'Governance Enforcements' },
    { value: 'governance-rule-sets', label: 'Cloud Asset Governance Rule Sets' },
    { value: 'perspectives', label: 'Perspectives' },
  ];

  // This will be populated dynamically based on the selected feature
  useEffect(() => {
    if (featureName) {
      // Extract all unique roles from the permissions data for the selected feature
      const allRoles = new Set<string>();
      
      // Get all permission entries for the selected feature
      const featurePermissions = permissionMappings[featureName];
      if (featurePermissions) {
        // Loop through all permission types (view, edit, etc.)
        Object.keys(featurePermissions).forEach(permType => {
          // Loop through all RBAC levels (global, granular)
          Object.keys(featurePermissions[permType]).forEach(rbacLevel => {
            // Loop through all permissions
            featurePermissions[permType][rbacLevel].forEach(permission => {
              // Split the role string by commas and add each role to the set
              if (permission.role !== 'NA') {
                permission.role.split(', ').forEach(role => {
                  allRoles.add(role.trim());
                });
              }
            });
          });
        });
      }
      
      // Convert the roles set to an array of options
      const roleOptions = Array.from(allRoles).map(role => ({
        value: role,
        label: role
      }));
      
      // Create feature-specific resource group options
      const featureLabel = featureOptions.find(f => f.value === featureName)?.label || 'Feature';
      const resourceGroupOptions = [
        { value: `${featureLabel}: All`, label: `${featureLabel}: All` },
        { value: `${featureLabel}: Specified`, label: `${featureLabel}: Specified` }
      ];
      
      setAvailableRoles(roleOptions);
      setAvailableResourceGroups(resourceGroupOptions);
      setSelectedRoles([]);
      setSelectedResourceGroup('');
    } else {
      setAvailableRoles([]);
      setAvailableResourceGroups([]);
      setSelectedRoles([]);
      setSelectedResourceGroup('');
    }
  }, [featureName]);

  // Resource group options are now dynamically generated based on the selected feature

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Determine behavior based on inputs
    let result = '';
    
    if (!featureName) {
      result = 'Please select a feature.';
    } else if (selectedRoles.length === 0) {
      result = 'Please select at least one role.';
    } else if (!selectedResourceGroup) {
      result = 'Please select a resource group.';
    } else {
      // Check if the feature exists in the permission mappings
      const featurePermissions = permissionMappings[featureName];
      if (!featurePermissions) {
        result = 'Feature not found in permissions mapping.';
      } else {
        // Find all matching permissions based on selected roles and resource groups
        const matchingPermissions: Permission[] = [];
        
        // Loop through all permission types (view, edit, etc.)
        Object.keys(featurePermissions).forEach(permType => {
          // Map selected resource group to RBAC level
          let selectedRbacLevel = '';
          if (selectedResourceGroup.includes(': All')) selectedRbacLevel = 'global';
          if (selectedResourceGroup.includes(': Specified')) selectedRbacLevel = 'granular';
          
          // Use the selected RBAC level
          if (selectedRbacLevel && featurePermissions[permType][selectedRbacLevel]) {
            // Loop through all permissions for this RBAC level
            featurePermissions[permType][selectedRbacLevel].forEach(permission => {
                // Skip NA roles
                if (permission.role === 'NA') return;
                
                // Get all roles in this permission
                const permissionRoles = permission.role.split(', ').map(r => r.trim());
                
                // Check for exact role match (all selected roles must be in permission AND all permission roles must be in selected)
                const hasAllSelectedRoles = selectedRoles.every(selectedRole => 
                  permissionRoles.some(permRole => permRole === selectedRole)
                );
                
                const hasAllPermissionRoles = permissionRoles.every(permRole => 
                  selectedRoles.some(selectedRole => selectedRole === permRole)
                );
                
                // Only match if there's an exact match in both directions
                if (hasAllSelectedRoles && hasAllPermissionRoles) {
                  matchingPermissions.push(permission);
                }
              });
          }
        });
        
        if (matchingPermissions.length === 0) {
          result = `No permissions found that match all selected roles and resource groups for the "${featureOptions.find(f => f.value === featureName)?.label}" feature.`;
        } else {
          // Return the permissions and their descriptions
          result = matchingPermissions.map(permission => {
            return `<strong>Expected Behavior:</strong> ${permission.description}<br/><strong>Required Role:</strong> ${permission.role}<br/><strong>Resource Group:</strong> ${permission.resourceGroup}<br/><strong>RBAC Level:</strong> ${permission.rbacLevel === 'global' ? 'Global (All Resources)' : 'Granular (Specified Resources)'}`;
          }).join('<br/><br/>');
        }
      }
    }
    
    setBehavior(result);
    setShowResults(true);
  };

  return (
    <div className={stylesModule.permissionsContainer}>
      <div className={stylesModule.header}>
        <h3>CCM Permissions Behavior Checker</h3>
        <p>Enter a feature, role, and resource group to see the expected behavior.</p>
      </div>
      
      <form className={stylesModule.permissionsForm} onSubmit={handleSubmit}>
        <div className={stylesModule.formGroup}>
          <label htmlFor="feature">Feature:</label>
          <select 
            id="feature" 
            value={featureName} 
            onChange={(e) => setFeatureName(e.target.value)}
            required
          >
            <option value="">Select a feature</option>
            {featureOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className={stylesModule.formGroup}>
          <label htmlFor="roles">Roles:</label>
          {availableRoles.length > 0 ? (
            <div className={stylesModule.multiSelectContainer}>
              {availableRoles.map((option) => (
                <div key={option.value} className={stylesModule.checkboxItem}>
                  <input
                    type="checkbox"
                    id={`role-${option.value}`}
                    value={option.value}
                    checked={selectedRoles.includes(option.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRoles([...selectedRoles, option.value]);
                      } else {
                        setSelectedRoles(selectedRoles.filter(role => role !== option.value));
                      }
                    }}
                  />
                  <label htmlFor={`role-${option.value}`} title={option.label}>{option.label}</label>
                </div>
              ))}
            </div>
          ) : (
            <p className={stylesModule.helperText}>Select a feature to see available roles</p>
          )}
        </div>
        
        <div className={stylesModule.formGroup}>
          <label htmlFor="resourceGroups">Resource Group:</label>
          {availableResourceGroups.length > 0 ? (
            <div className={stylesModule.radioContainer}>
              {availableResourceGroups.map((option) => (
                <div key={option.value} className={stylesModule.radioItem}>
                  <input
                    type="radio"
                    id={`resource-group-${option.value}`}
                    name="resourceGroup"
                    value={option.value}
                    checked={selectedResourceGroup === option.value}
                    onChange={(e) => {
                      setSelectedResourceGroup(e.target.value);
                    }}
                  />
                  <label htmlFor={`resource-group-${option.value}`} title={option.label}>{option.label}</label>
                </div>
              ))}
            </div>
          ) : (
            <p className={stylesModule.helperText}>Select a feature to see available resource groups</p>
          )}
        </div>
        
        <button type="submit" className={stylesModule.submitButton}>Check Behavior</button>
      </form>
      
      {showResults && (
        <div className={stylesModule.resultsContainer}>
          <h4>Results</h4>
          <div 
            className={stylesModule.behaviorResult}
            dangerouslySetInnerHTML={{ __html: behavior }}
          />
        </div>
      )}
    </div>
  );
}

export default function CCMPermissionsTools() {
  // We'll use CSS classes from the imported styles module
  const [activeTab, setActiveTab] = useState('viewer');
  
  return (
    <div className={stylesModule.container}>
      <div className={stylesModule.tabsContainer}>
        <button 
          className={`${stylesModule.tabButton} ${activeTab === 'viewer' ? stylesModule.activeTab : ''}`}
          onClick={() => setActiveTab('viewer')}
          aria-label="Switch to Permissions Viewer tab"
        >
          Permissions Viewer
        </button>
        <button 
          className={`${stylesModule.tabButton} ${activeTab === 'behavior' ? stylesModule.activeTab : ''}`}
          onClick={() => setActiveTab('behavior')}
          aria-label="Switch to Behavior Checker tab"
        >
          Behavior Checker
        </button>
      </div>
      
      <div className={stylesModule.tabContent}>
        {activeTab === 'viewer' ? (
          <PermissionsViewer />
        ) : (
          <PermissionsBehaviorChecker />
        )}
      </div>
    </div>
  );
}
