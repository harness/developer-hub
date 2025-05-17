import {
  CardSections
} from "@site/src/components/TutorialCard/TutorialCard";
import { MODULES } from "@site/src/constants";

  
  /* Define the cards - start */

    // Docs
    export const docsCards: CardSections = [
      {
        name: "Get started",
        description:
          "",
        list: [
          {
            title: "What's supported",
            module: MODULES.platform,
            description:
              "Platforms and technologies supported by the on-prem Harness Self-Managed Enterprise Edition.",
            link: "/docs/self-managed-enterprise-edition/smp-supported-platforms",
          },
          {
            title: "Install using Helm",
            module: MODULES.platform,
            description:
              "Learn how to use Helm to install Harness Self-Managed Enterprise Edition.",
            link: "/docs/self-managed-enterprise-edition/install/install-using-helm",
          },
          {
            title: "Install in an air-gapped environment",
            module: MODULES.platform,
            description:
              "Learn how to use Helm to install in an air-gapped environment.",
            link: "/docs/self-managed-enterprise-edition/install/install-in-an-air-gapped-environment",
          },
        ],
      },
      {
        name: "Feature highlights",
        description:
          "",
        list: [
          {
            title: "Monitoring",
            module: MODULES.platform,
            description:
              "Learn how to monitor the infrastructure of your installation.",
            link: "/docs/category/monitoring",
          },
          {
            title: "Back up and restore",
            module: MODULES.platform,
            description:
              "Learn how to back up and restore Harness Self-Managed Enterprise Edition.",
            link: "/docs/self-managed-enterprise-edition/back-up-and-restore-helm",
          },
        ],
      },
      {
        name: "Advanced configurations",
        description:
          "",
        list: [
          {
            title: "Configure external databases",
            module: MODULES.platform,
            description:
              "Harness supports multiple databases when you deploy the on-prem Harness Self-Managed Enterprise Edition.",
            link: "/docs/self-managed-enterprise-edition/advanced-configurations/external-db/configure-external-databases/",
          },
          {
            title: "Use external secrets for license values",
            module: MODULES.platform,
            description:
              "Learn how to use Kubernetes-based external secrets for Harness license values.",
            link: "/docs/self-managed-enterprise-edition/advanced-configurations/use-external-secrets-for-license-values",
          },
          {
            title: "Increase Persistent Volume (PV) size for StatefulSets",
            module: MODULES.platform,
            description:
              "Learn how to increase the PV size for StatefulSets in your Kubernetes cluster during a Helm upgrade.",
            link: "/docs/self-managed-enterprise-edition/advanced-configurations/increase-pv-size-statefulsets",
          },
        ],
      },
    ];
    /* Define the cards - end */
