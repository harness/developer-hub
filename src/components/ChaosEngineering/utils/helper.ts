import { FaultCategory } from "./types";

const normaliseForURL = (string: string): string => {
	return string.toLowerCase().replace(/ /g, "-");
};

const normaliseForImagePath = (string: string): string => {
	return string.toLowerCase().replace(/ /g, "_");
};

const getCategoryDetails = (category: string): Record<string, string> => {
	const path = "/img/chaos/faults/category_icons";
	const details = {
		icon: "",
		link: "",
	};
	const setDetails = (category: FaultCategory) => {
		details.icon = `${path}/${category}.svg`;
		details.link = `${category}`;
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
		default:
			details.icon = `${path}/default.svg`;
			details.link = `#`;
	}
	return details;
};

const getFaultDetails = (
	category: string,
	faultName: string
): Record<string, string> => {
	const path = "/img/chaos/faults";
	const details = {
		icon: "",
		link: "",
	};
	const setDetails = (category: FaultCategory) => {
		details.icon = `${path}/${category}/${normaliseForImagePath(
			faultName
		)}.svg`;
		details.link = `${normaliseForURL(faultName)}`;
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
		default:
			details.icon = `${path}/default.svg`;
			details.link = `#`;
	}
	return details;
};

export { getCategoryDetails, getFaultDetails };
