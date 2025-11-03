import { FaultCategory } from "./types";

const normaliseForURL = (string: string): string => {
  return string.toLowerCase().replace(/ /g, "-");
};

const normaliseForImagePath = (string: string): string => {
  return string.toLowerCase().replace(/ /g, "_");
};

const getCategoryDetails = (category: string): Record<string, string> => {
  const path = "/img/chaos";
  const details = {
    icon: "",
    link: "",
  };
  const setDetails = (category: FaultCategory) => {
    details.icon = `${path}/${category}.svg`;
    details.link = `/docs/chaos-engineering/faults/chaos-faults/${category}/`;
  };
  switch (category) {
    case FaultCategory.AWS:
      setDetails(FaultCategory.AWS);
      break;
    case FaultCategory.Azure:
      setDetails(FaultCategory.Azure);
      break;
    case FaultCategory.Boutique:
      setDetails(FaultCategory.Boutique);
      break;
    case FaultCategory.GCP:
      setDetails(FaultCategory.GCP);
      break;
    case FaultCategory.KubeResilience:
      setDetails(FaultCategory.KubeResilience);
      break;
    case FaultCategory.Kubernetes:
      setDetails(FaultCategory.Kubernetes);
      break;
    case FaultCategory.Linux:
      setDetails(FaultCategory.Linux);
      break;
    case FaultCategory.VMware:
      setDetails(FaultCategory.VMware);
      break;
    case FaultCategory.Load:
      setDetails(FaultCategory.Load);
      break;
    case FaultCategory.SecurityChaos:
      setDetails(FaultCategory.SecurityChaos);
      break;
    case FaultCategory.CloudFoundry:
      setDetails(FaultCategory.CloudFoundry);
      break;
    case FaultCategory.Windows:
      setDetails(FaultCategory.Windows);
      break;
    case FaultCategory.SSH:
      setDetails(FaultCategory.SSH);
      break;
    case FaultCategory.BYOC:
      details.icon = `${path}/${FaultCategory.BYOC}.svg`;
      details.link = `/docs/chaos-engineering/faults/custom-faults/byoc/`;
      break;
    case "aws-probes":
      details.icon = `${path}/aws.svg`;
      details.link = `/docs/chaos-engineering/guides/probes/probe-templates/aws`;
      break;
    case "gcp-probes":
      details.icon = `${path}/gcp.svg`;
      details.link = `/docs/chaos-engineering/guides/probes/probe-templates/gcp`;
      break;
    case "kubernetes-probes":
      details.icon = `${path}/kubernetes.svg`;
      details.link = `/docs/chaos-engineering/guides/probes/probe-templates/kubernetes`;
      break;
    default:
      details.icon = `${path}/default.svg`;
      details.link = `#`;
  }
  return details;
};

const getFaultDetails = (
  category: string,
  faultName: string,
  subCategory?: string
): Record<string, string> => {
  const path = "/img/chaos";
  const details = {
    icon: "",
    link: "",
    anchorLink: "",
  };
  
  // Handle probe templates - link to individual template pages
  if (faultName && (
    faultName.includes("Status Check") || 
    faultName.includes("Restart Check") ||
    faultName.includes("Replica Count") ||
    faultName.includes("Resource Utilisation") ||
    faultName.includes("Startup Time") ||
    faultName.includes("Warnings Check") ||
    faultName.includes("AZ Check") ||
    faultName.includes("Rule Check")
  )) {
    details.icon = `${path}/${category}.svg`;
    // Generate full path based on category
    let categoryPath = "";
    if (category === "aws") categoryPath = "aws";
    else if (category === "gcp") categoryPath = "gcp";
    else if (category === "kubernetes") categoryPath = "kubernetes";
    details.link = `/docs/chaos-engineering/guides/probes/probe-templates/${categoryPath}/${normaliseForURL(faultName)}/`;
    details.anchorLink = `${normaliseForURL(faultName)}`;
    return details;
  }
  
  const setDetails = (category: FaultCategory) => {
    details.icon = subCategory
      ? `${path}/${category}/${subCategory}/${normaliseForImagePath(
          faultName
        )}.svg`
      : `${path}/${category}/${normaliseForImagePath(faultName)}.svg`;
    details.link = subCategory
      ? `${subCategory}/${normaliseForURL(faultName)}/`
      : `${normaliseForURL(faultName)}/`;
    details.anchorLink = `${normaliseForURL(faultName)}`;
  };
  switch (category) {
    case FaultCategory.AWS:
      setDetails(FaultCategory.AWS);
      break;
    case FaultCategory.Azure:
      setDetails(FaultCategory.Azure);
      break;
    case FaultCategory.Boutique:
      setDetails(FaultCategory.Boutique);
      break;
    case FaultCategory.GCP:
      setDetails(FaultCategory.GCP);
      break;
    case FaultCategory.KubeResilience:
      setDetails(FaultCategory.KubeResilience);
      break;
    case FaultCategory.Kubernetes:
      setDetails(FaultCategory.Kubernetes);
      break;
    case FaultCategory.Linux:
      setDetails(FaultCategory.Linux);
      break;
    case FaultCategory.VMware:
      setDetails(FaultCategory.VMware);
      break;
    case FaultCategory.Load:
      setDetails(FaultCategory.Load);
      break;
    case FaultCategory.SecurityChaos:
      setDetails(FaultCategory.SecurityChaos);
      break;
    case FaultCategory.CloudFoundry:
      setDetails(FaultCategory.CloudFoundry);
      break;
    case FaultCategory.Windows:
      setDetails(FaultCategory.Windows);
      break;
    case FaultCategory.SSH:
      setDetails(FaultCategory.SSH);
      break;
    case FaultCategory.BYOC:
      setDetails(FaultCategory.BYOC);
      break;
    default:
      details.icon = `${path}/default.svg`;
      details.link = `#`;
      details.anchorLink = "#";
  }
  return details;
};

export { getCategoryDetails, getFaultDetails };
