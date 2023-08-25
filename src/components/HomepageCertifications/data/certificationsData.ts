

import { MODULES } from "../../../constants";
import  { CardItem } from "../../Certifications/CertCard";
// Define the certs section cards here
export const certifications: CardItem[] = [
    {
      title: "Continuous Delivery & GitOps Certifications",
      module: MODULES.cd,
      description:
        "Continuous Delivery & GitOps focuses on delivery and deployment of application and infrastructure changes in a safe and sustainable way.",
      link: "/certifications/continuous-delivery",
      numberOfCerts: 3,
    },
    {
      title: "Continuous Integrations Certifications",
      module: MODULES.ci,
      description:
        "Continuous Integration focuses on building and testing your code. Your Continuous Integration pipeline should provides a bird's-eye view and analyze the root causes of issues.",
      link: "/certifications/continuous-integration",
      numberOfCerts: 2,
    },
  ];