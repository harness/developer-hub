import React from 'react';
import PermissionsViewer from './index';

/**
 * Example usage of the PermissionsViewer component.
 * This demonstrates how to use the component with initial values.
 */
export default function PermissionsViewerExample(): JSX.Element {
  // Example initial values
  const initialFeatureName = 'anomalies';
  const initialRbacLevel = 'global';
  const initialPermissionType = 'view';
  
  // Example predefined permissions
  const predefinedPermissions = [
    {
      resource: 'Anomalies',
      role: 'Anomalies: View',
      resourceGroup: 'View anomaly detection'
    }
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2>Permissions Viewer Example</h2>
      <p>This is an example of the PermissionsViewer component with initial values.</p>
      
      <PermissionsViewer
        initialFeatureName={initialFeatureName}
        initialRbacLevel={initialRbacLevel}
        initialPermissionType={initialPermissionType}
        predefinedPermissions={predefinedPermissions}
      />
    </div>
  );
}
