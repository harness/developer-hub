import React, {useState} from "react";
import HarnessApiData from '/Users/richardblack/repos/developer-hub/src/components/HarnessApiData/index.tsx';

let terraformVersion = "";
let openTofuVersion = "";

// Component for fetching and displaying the latest Terraform version
export const LatestSupportedTerraformVersion = () => {
  const [terraformVersion, setTerraformVersion] = useState('');

  return (
    <HarnessApiData
      query="https://app.harness.io/gateway/iacm/api/provisioners/supported/terraform"
      token={true}
      fallback=""
      showLatest={true}
      parse={(data) => {
        const lastVersion = data; // Get the last item in the array
        return `(up to v${lastVersion})`; // Return the full version string
      }}
    >
      {(version) => {
        setTerraformVersion(version);
        return <>{version}</>;  // Render the full formatted version string
      }}
    </HarnessApiData>
  );
};

// Component for fetching and displaying the latest OpenTofu version
export const LatestSupportedOpenTofuVersion = () => {
  const [openTofuVersion, setOpenTofuVersion] = useState('');

  return (
    <HarnessApiData
      query="https://app.harness.io/gateway/iacm/api/provisioners/supported/opentofu"
      token={true}
      fallback=""
      showLatest={true}
      parse={(data) => {
        const lastVersion = data; // Get the last item in the array
        return `(up to v${lastVersion})`; // Return the full version string
      }}
    >
      {(version) => {
        setOpenTofuVersion(version);
        return <>{version}</>;  // Render the full formatted version string
      }}
    </HarnessApiData>
  );
};