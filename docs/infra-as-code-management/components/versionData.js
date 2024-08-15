// versions.js
import React, { useEffect, useState } from 'react';
import HarnessApiData from '../../../src/components/HarnessApiData/index';

// Define the accountIdentifier and token variables
const accountIdentifier = 'l7HREAyVTnyfUsfUtPZUow';
const token = 'pat.l7HREAyVTnyfUsfUtPZUow.6643481aa563dd1210288381.fdCC2C9M6ECix6YpWPYM';

export const LatestTerraformVersion = () => {
  const [version, setVersion] = useState('');

  useEffect(() => {
    const fetchVersion = async () => {
      const terraformVersionData = (
        <HarnessApiData
          query="https://app.harness.io/gateway/iacm/api/provisioners/supported/terraform"
          accountIdentifier={accountIdentifier}
          token={token}
          fallback="Failed to fetch Terraform version."
          listPosition={-1}
        />
      );
      setVersion(terraformVersionData);
    };

    fetchVersion();
  }, []);

  return version;
};

export const LatestOpenTofuVersion = () => {
  const [version, setVersion] = useState('');

  useEffect(() => {
    const fetchVersion = async () => {
      const opentofuVersionData = (
        <HarnessApiData
          query="https://app.harness.io/gateway/iacm/api/provisioners/supported/opentofu"
          accountIdentifier={accountIdentifier}
          token={token}
          fallback="Failed to fetch OpenTofu version."
          listPosition={-1}
        />
      );
      setVersion(opentofuVersionData);
    };

    fetchVersion();
  }, []);
    return version;
};
