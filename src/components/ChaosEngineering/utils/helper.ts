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
    details.link = `${category}/`;
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
    default:
      details.icon = `${path}/default.svg`;
      details.link = `#`;
      details.anchorLink = "#";
  }
  return details;
};

export { getCategoryDetails, getFaultDetails };
