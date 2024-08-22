import React from "react";
import { FeatureCardItem } from "@site/src/components/ChaosEngineering/FeatureCard";
// import { features as ImageRegistryFeatures } from "./imgregistry/features";
// import { features as GameDayFeatures } from "./gameday/features";
// import { features as ResilienceProbesFeatures } from "./resilience-probes/features";
import { features as ChaosGuardFeatures } from "./chaosguard/features";
// import { features as ServiceDiscoveryFeatures } from "./service-discovery/features";
import { features as ApplicationMapFeatures } from "./app-map/features";
// import { features as DashboardFeatures } from "./dashboard/features";
// import { features as InfrastructureFeatures } from "./infrastructure/features";
// import { features as ExperimentFeatures } from "./experiment/features";
// import { features as ChaosHubFeatures } from "./chaoshub/features";

export const categories: FeatureCardItem[] = [

  {
    title: "ChaosGuard",
    description: <>ChaosGuard </>,
    faults: ChaosGuardFeatures.length,
    category: "chaosguard",
  },
  {
    title: "Application Map",
    description: <>Application Map</>,
    faults: ApplicationMapFeatures.length,
    category: "app-map",
  },
];
