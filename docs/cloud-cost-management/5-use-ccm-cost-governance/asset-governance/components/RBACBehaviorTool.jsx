import React, { useState } from 'react';

function RBACBehaviorTool() {
  const [selectedRoles, setSelectedRoles] = useState({});
  const [selectedResourceGroups, setSelectedResourceGroups] = useState({});
  const [behaviorsResult, setBehaviorsResult] = useState([]);

  // Define the available roles and permissions
  const availableRoles = {
    'Cloud Asset Governance Alerts': ['View', 'Create / Edit', 'Delete'],
    'Cloud Asset Governance Rules': ['View', 'Create / Edit', 'Delete', 'Execute'],
    'Cloud Asset Governance Rule Sets': ['View', 'Create / Edit', 'Delete'],
    'Cloud Asset Governance Overview': ['View'],
    'Cloud Asset Governance Enforcements': ['View', 'Create / Edit', 'Delete']
  };

  // Define the available resource groups and options
  const availableResourceGroups = {
    'Cloud Asset Governance Alerts': ['All', 'Specified'],
    'Cloud Asset Governance Rule Sets': ['All', 'Specified'],
    'Cloud Asset Governance Rules': ['All', 'Specified'],
    'Cloud Asset Governance Overview': ['All'],
    'Cloud Asset Governance Enforcements': ['All', 'Specified']
  };

  // Define dependency mapping between permissions
  const permissionDependencies = {
    'Cloud Asset Governance Rules': {
      'Create / Edit': ['Execute'],
      'Delete': ['Execute']
    },
    'Cloud Asset Governance Rule Sets': {
      'View': ['Cloud Asset Governance Rules:View'],
      'Create / Edit': ['Cloud Asset Governance Rules:Execute'],
      'Delete': ['Cloud Asset Governance Rules:Execute']
    },
    'Cloud Asset Governance Enforcements': {
      'Create / Edit': ['Rules:Execute', 'Connector'],
      'Delete': ['Rules:Execute', 'Connector']
    }
  };

  // Define behavior mapping - base behaviors
  const baseBehaviorMapping = {
    'Cloud Asset Governance Alerts': {
      'View': {
        'All': 'Can view all governance alerts.',
        'Specified': 'No permissions are granted when Resource Group is set to Specified for alerts.'
      },
      'Create / Edit': {
        'All': 'Can copy, create and edit all governance alerts. Connector permissions are required.',
        'Specified': 'No permissions are granted when Resource Group is set to Specified for alerts.'
      },
      'Delete': {
        'All': 'Delete access on all governance alerts.',
        'Specified': 'No permissions are granted when Resource Group is set to Specified for alerts.'
      }
    },
    'Cloud Asset Governance Rules': {
      'View': {
        'All': 'Can view all governance rules.',
        'Specified': 'Can view only specified governance rules.'
      },
      'Create / Edit': {
        'All': 'Can create and edit all governance rules.',
        'Specified': 'Can only edit specified rules. Cannot create new rules.'
      },
      'Delete': {
        'All': 'Delete access on all rules.',
        'Specified': 'Can only delete specified governance rules.'
      },
      'Execute': {
        'All': 'Can execute all governance rules.',
        'Specified': 'Can execute only specified governance rules.'
      }
    },
    'Cloud Asset Governance Rule Sets': {
      'View': {
        'All': 'Can view all governance rule sets. View permission on rules is required.',
        'Specified': 'Can view only specified governance rule sets. View permission on rules is required.'
      },
      'Create / Edit': {
        'All': 'Can create and edit all governance rule sets. Execute permission on rules is required.',
        'Specified': 'Can only edit specified rule sets. Execute permission on rules is required. Cannot create new rule sets.'
      },
      'Delete': {
        'All': 'Delete access on all rule sets. Execute permission on rules is required.',
        'Specified': 'Can only delete specified governance rule sets. Execute permission on rules is required.'
      }
    },
    'Cloud Asset Governance Overview': {
      'View': {
        'All': 'Can view all governance entities except recommendations on overview page.'
      }
    },
    'Cloud Asset Governance Enforcements': {
      'View': {
        'All': 'Can view all governance enforcements.',
        'Specified': 'Can view only specified governance enforcements.'
      },
      'Create / Edit': {
        'All': 'Can create and edit all governance enforcements ONLY IF Rules:Execute and Connector permissions are given. Respective permission on Rules and Rule Sets is required to be able to create an enforcement.',
        'Specified': 'Can only edit specified governance enforcements. Rules:Execute and Connector permissions required for editing enforcements. Cannot create new enforcements.'
      },
      'Delete': {
        'All': 'Delete access on all governance enforcements. Rules:Execute and Connector permissions required.',
        'Specified': 'Can only delete specified governance enforcements. Rules:Execute and Connector permissions required.'
      }
    }
  };

  // Handle role selection
  const handleRoleChange = (category, permission, isChecked) => {
    setSelectedRoles(prev => {
      const updated = { ...prev };
      if (!updated[category]) {
        updated[category] = [];
      }
      
      if (isChecked) {
        if (!updated[category].includes(permission)) {
          updated[category].push(permission);
        }
      } else {
        updated[category] = updated[category].filter(p => p !== permission);
        if (updated[category].length === 0) {
          delete updated[category];
        }
      }
      return updated;
    });
  };

  // Handle resource group selection
  const handleResourceGroupChange = (category, option) => {
    setSelectedResourceGroups(prev => {
      const updated = { ...prev };
      updated[category] = option;
      return updated;
    });
  };

  // Check if all required dependencies are met
  const checkDependencies = (category, permission) => {
    // If no dependencies defined, return true
    if (!permissionDependencies[category] || !permissionDependencies[category][permission]) {
      return { met: true, missing: [] };
    }
    
    const requiredPermissions = permissionDependencies[category][permission];
    const missingPermissions = [];
    
    // Check each required permission
    requiredPermissions.forEach(reqPerm => {
      // Special case for Rules:Execute which can be satisfied by Execute permission on Rules
      if (reqPerm === 'Rules:Execute' && selectedRoles['Cloud Asset Governance Rules']?.includes('Execute')) {
        // Dependency is met by Execute permission on Rules
        return;
      }
      
      // Check if it's a cross-category dependency (format: Category:Permission)
      if (reqPerm.includes(':')) {
        const [depCategory, depPermission] = reqPerm.split(':');
        
        // Check if the required permission is selected in the other category
        if (!selectedRoles[depCategory] || !selectedRoles[depCategory].includes(depPermission)) {
          missingPermissions.push(reqPerm);
        }
      }
      // If it's a role permission within the same category
      else if (availableRoles[category]?.includes(reqPerm)) {
        if (!selectedRoles[category]?.includes(reqPerm)) {
          missingPermissions.push(reqPerm);
        }
      }
      // If it's not a category permission and not already handled
      else {
        // For Connector and other special permissions
        missingPermissions.push(reqPerm);
      }
    });
    
    return { 
      met: missingPermissions.length === 0,
      missing: missingPermissions
    };
  };

  // Generate behavior prediction with dependency logic
  const predictBehavior = () => {
    const results = [];
    
    // Process each selected role category
    Object.keys(selectedRoles).forEach(category => {
      const permissions = selectedRoles[category];
      const resourceGroupOption = selectedResourceGroups[category] || null;
      
      if (resourceGroupOption) {
        // Special case for Cloud Asset Governance Alerts with Specified resource group
        if (category === 'Cloud Asset Governance Alerts' && resourceGroupOption === 'Specified') {
          permissions.forEach(permission => {
            results.push({
              category,
              permission,
              resourceGroup: resourceGroupOption,
              behavior: 'No permissions are granted when Resource Group is set to Specified for alerts.'
            });
          });
        } else {
          permissions.forEach(permission => {
            if (baseBehaviorMapping[category] && 
                baseBehaviorMapping[category][permission] && 
                baseBehaviorMapping[category][permission][resourceGroupOption]) {
              
              let behavior = baseBehaviorMapping[category][permission][resourceGroupOption];
              
              // Special case for Cloud Asset Governance Alerts Create/Edit
              if (category === 'Cloud Asset Governance Alerts' && permission === 'Create / Edit') {
                behavior = 'Can copy, create and edit all governance alerts. Connector permissions are required.';
              }
              
              // Check dependencies for Cloud Asset Governance Rules
              if (category === 'Cloud Asset Governance Rules' && 
                  (permission === 'Create / Edit' || permission === 'Delete')) {
                const dependencyCheck = checkDependencies(category, permission);
                
                if (!dependencyCheck.met) {
                  if (permission === 'Create / Edit') {
                    behavior = `You need to select the Execute role on Cloud Asset Governance Rules to be able to create or edit a rule.`;
                  } else if (permission === 'Delete') {
                    behavior = `You need to select the Execute role on Cloud Asset Governance Rules to be able to delete a rule.`;
                  }
                }
              }
              
              // Check dependencies for Cloud Asset Governance Rule Sets
              if (category === 'Cloud Asset Governance Rule Sets') {
                const dependencyCheck = checkDependencies(category, permission);
                
                if (!dependencyCheck.met) {
                  if (permission === 'View') {
                    behavior = `You need to select the View role on Cloud Asset Governance Rules to be able to view rule sets.`;
                  } else if (permission === 'Create / Edit') {
                    behavior = `You need to select the Execute role on Cloud Asset Governance Rules to be able to create or edit rule sets.`;
                  } else if (permission === 'Delete') {
                    behavior = `You need to select the Execute role on Cloud Asset Governance Rules to be able to delete rule sets.`;
                  }
                }
                // Special case: Rule Sets with All and Rules with Specified
                else if (selectedResourceGroups['Cloud Asset Governance Rule Sets'] === 'All' && 
                         selectedResourceGroups['Cloud Asset Governance Rules'] === 'Specified') {
                  
                  // View permission case
                  if (permission === 'View' && selectedRoles['Cloud Asset Governance Rules']?.includes('View')) {
                    behavior = `You can view only rule sets that contain the specified rules. You will not be able to view other rule sets.`;
                  }
                  
                  // Create/Edit permission case
                  else if (permission === 'Create / Edit' && 
                           selectedRoles['Cloud Asset Governance Rules']?.includes('Execute')) {
                    behavior = `You can edit only rule sets that contain the specified rules. You will not be able to edit other rule sets. You can create new rule sets but can only include the specified rules in them.`;
                  }
                  
                  // Delete permission case
                  else if (permission === 'Delete') {
                    if (!selectedRoles['Cloud Asset Governance Rules']?.includes('Execute')) {
                      behavior = `You need Execute permission on Cloud Asset Governance Rules to be able to delete rule sets.`;
                    }
                    else if (!selectedRoles['Cloud Asset Governance Rules']?.includes('Delete')) {
                      behavior = `You need Delete permission on Cloud Asset Governance Rules to be able to delete rule sets.`;
                    }
                    else {
                      behavior = `You can only delete rule sets for which all rules have delete and execute permissions. If even one rule in a rule set is not in your specified rules list, you will not be able to delete that rule set.`;
                    }
                  }
                }
              }
              
              // Check dependencies for Cloud Asset Governance Enforcements
              if (category === 'Cloud Asset Governance Enforcements') {
                const dependencyCheck = checkDependencies(category, permission);
                
                if (!dependencyCheck.met) {
                  if (permission === 'Create / Edit') {
                    // Check which specific dependencies are missing
                    const missingDeps = dependencyCheck.missing;
                    
                    // Only Connector is missing
                    if (missingDeps.length === 1 && missingDeps.includes('Connector')) {
                      behavior = `You need Connector permission from Shared Resources to create or edit enforcements.`;
                    }
                    // Only Rules:Execute is missing
                    else if (missingDeps.length === 1 && missingDeps.includes('Rules:Execute')) {
                      behavior = `You need Execute permission on Cloud Asset Governance Rules and Rule Sets to create or edit enforcements.`;
                    }
                    // Both Rules:Execute and Connector are missing
                    else if (missingDeps.includes('Rules:Execute') && missingDeps.includes('Connector')) {
                      behavior = `You need both Execute permission on Cloud Asset Governance Rules, Rule Sets and Connector permission from Shared Resources to create or edit enforcements.`;
                    }
                    // Other dependencies missing
                    else {
                      behavior = `You need Execute permission on Rules to create or edit enforcements. View permission on either Rules or Rule Sets is needed depending on your use case.`;
                    }
                  } else if (permission === 'Delete') {
                    const missingDeps = dependencyCheck.missing;
                    
                    // Only Connector is missing
                    if (missingDeps.length === 1 && missingDeps.includes('Connector')) {
                      behavior = `You need Connector permission from Shared Resources to delete enforcements.`;
                    }
                    // Only Rules:Execute is missing
                    else if (missingDeps.length === 1 && missingDeps.includes('Rules:Execute')) {
                      behavior = `You need Execute permission on Cloud Asset Governance Rules to delete enforcements.`;
                    }
                    // Both are missing
                    else {
                      behavior = `You need both Execute permission on Cloud Asset Governance Rules and Connector permission from Shared Resources to delete enforcements.`;
                    }
                  }
                }
                
                // Special case: Enforcements with mixed resource groups
                if (permission === 'Create / Edit' && 
                    selectedResourceGroups['Cloud Asset Governance Enforcements'] === 'All' &&
                    (selectedResourceGroups['Cloud Asset Governance Rules'] === 'Specified' || 
                     selectedResourceGroups['Cloud Asset Governance Rule Sets'] === 'Specified')) {
                  behavior = `You can create enforcements but can only use the specified rules and rule sets that you have access to.`;
                }
              }
              
              results.push({
                category,
                permission,
                resourceGroup: resourceGroupOption,
                behavior: behavior
              });
            }
          });
        }
      } else {
        // If no resource group is selected, inform the user
        permissions.forEach(permission => {
          results.push({
            category,
            permission,
            resourceGroup: 'Not selected',
            behavior: 'Please select a resource group option to see behavior.'
          });
        });
      }
    });
    
    // Check for resource groups without roles
    Object.keys(selectedResourceGroups).forEach(category => {
      if (!selectedRoles[category] || selectedRoles[category].length === 0) {
        results.push({
          category,
          permission: 'None selected',
          resourceGroup: selectedResourceGroups[category],
          behavior: 'Please select at least one role permission to see behavior.'
        });
      }
    });
    
    setBehaviorsResult(results);
  };

  return (
    <div className="rbac-tool-container">
      <div className="rbac-tool-header">
        <h3>RBAC Behavior Prediction Tool</h3>
        <p>Select roles, resource groups, and additional permissions to see the expected behavior based on your selections.</p>
      </div>
      
      <div className="rbac-columns">
        {/* Roles Selection */}
        <div className="rbac-column">
          <h4>Select Roles</h4>
          <div className="rbac-section">
            {Object.keys(availableRoles).map(category => (
              <div key={category} className="rbac-category">
                <strong>{category}</strong>
                <div className="rbac-checkbox-group">
                  {availableRoles[category].map(permission => (
                    <div key={permission} className="rbac-checkbox-item">
                      <label>
                        <input 
                          type="checkbox" 
                          onChange={(e) => handleRoleChange(category, permission, e.target.checked)}
                          checked={selectedRoles[category]?.includes(permission) || false}
                        /> {permission}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Resource Groups Selection */}
        <div className="rbac-column">
          <h4>Select Resource Groups</h4>
          <div className="rbac-section">
            {Object.keys(availableResourceGroups).map(category => {
              // Check if any roles are selected for this category
              const isDisabled = !selectedRoles[category] || selectedRoles[category].length === 0;
              
              return (
                <div key={category} className={`rbac-category ${isDisabled ? 'rbac-category-disabled' : ''}`}>
                  <strong>{category}</strong>
                  {isDisabled && <span className="rbac-disabled-message">Select at least one role first</span>}
                  <div className="rbac-checkbox-group">
                    {availableResourceGroups[category].map(option => (
                      <div key={option} className="rbac-checkbox-item">
                        <label className={isDisabled ? 'rbac-label-disabled' : ''}>
                          <input 
                            type="radio" 
                            name={`resourceGroup-${category}`}
                            onChange={() => handleResourceGroupChange(category, option)}
                            checked={selectedResourceGroups[category] === option}
                            disabled={isDisabled}
                          /> {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="rbac-button-container">
        <button className="rbac-button" onClick={predictBehavior}>
          Predict Behavior
        </button>
      </div>
      
      {/* Results */}
      {behaviorsResult.length > 0 && (
        <div className="rbac-results">
          <h4>Permission Summary</h4>
          <div className="rbac-summary-container">
            {/* Define the order of categories */}
            {['Cloud Asset Governance Alerts', 'Cloud Asset Governance Rules', 'Cloud Asset Governance Rule Sets', 
              'Cloud Asset Governance Overview', 'Cloud Asset Governance Enforcements'].map((category) => {
              if (!selectedRoles[category] || !selectedResourceGroups[category]) return null;
              
              const categoryResults = behaviorsResult.filter(r => r.category === category);
              if (categoryResults.length === 0) return null;
              
              // Get positive permissions (things user can do)
              const positivePermissions = categoryResults
                .filter(r => !r.behavior.startsWith("Unable to") && !r.behavior.startsWith("You need"))
                .map(r => r.permission);
              
              // Get limitations
              const limitations = categoryResults
                .filter(r => r.behavior.startsWith("Unable to") || r.behavior.startsWith("You need"));
              
              // Only show categories with permissions or limitations
              if (positivePermissions.length === 0 && limitations.length === 0) return null;
              
              return (
                <div key={category} className="rbac-category-bullet">
                  <h5 className="rbac-category-title">
                    {category} ({selectedResourceGroups[category]})
                  </h5>
                  <ul className="rbac-permission-list">
                    {/* Show positive permissions */}
                    {positivePermissions.map((permission) => {
                      const result = categoryResults.find(r => r.permission === permission);
                      return (
                        <li key={permission} className="rbac-permission-bullet">
                          <span className="rbac-permission-name">
                            {permission === "View" ? "View" : 
                             permission === "Create / Edit" ? "Create/Edit" :
                             permission === "Delete" ? "Delete" :
                             permission === "Execute" ? "Execute" : permission}
                          </span>: {result.behavior}
                          
                          {/* Show mandatory Connector requirement for Alerts */}
                          {category === 'Cloud Asset Governance Alerts' && 
                           permission === 'Create / Edit' && (
                            <span className="rbac-requirements-bullet">
                              {' Connector permission from Shared Resources is mandatory for this operation.'}
                            </span>
                          )}
                          
                          {/* Show mandatory Connector requirement for Rules execution */}
                          {category === 'Cloud Asset Governance Rules' && 
                           permission === 'Execute' && (
                            <span className="rbac-requirements-bullet">
                              {' Connector permission from Shared Resources is mandatory for execution.'}
                            </span>
                          )}
                          
                          {/* Show View requirement for Rule Sets */}
                          {category === 'Cloud Asset Governance Rule Sets' && 
                           permission === 'View' && (
                            <span className="rbac-requirements-bullet">
                              {' View permission on Cloud Asset Governance Rules is required for viewing rule sets.'}
                            </span>
                          )}
                          
                          {/* Show Execute requirement for Rule Sets */}
                          {category === 'Cloud Asset Governance Rule Sets' && 
                           (permission === 'Create / Edit' || permission === 'Delete') && (
                            <span className="rbac-requirements-bullet">
                              {' Execute permission on Cloud Asset Governance Rules is required for this operation.'}
                            </span>
                          )}
                          
                          {/* Show mandatory Rules:Execute and Connector requirements for Enforcements */}
                          {category === 'Cloud Asset Governance Enforcements' && 
                           (permission === 'Create / Edit' || permission === 'Delete') && (
                            <span className="rbac-requirements-bullet">
                              {' Rules:Execute and Connector permissions from Shared Resources are mandatory for this operation.'}
                            </span>
                          )}
                        </li>
                      );
                    })}
                    
                    {/* Show limitations */}
                    {limitations.map((limitation, idx) => (
                      <li key={`limitation-${idx}`} className="rbac-limitation-bullet">
                        <span className="rbac-limitation-icon">⚠️</span> {limitation.behavior}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default RBACBehaviorTool;
