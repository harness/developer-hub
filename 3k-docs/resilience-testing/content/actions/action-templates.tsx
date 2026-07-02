import React from "react";
import { FaultCardItem } from "@site/src/components/ChaosEngineering/FaultCard";

export const actionTemplateCategories: FaultCardItem[] = [
  {
    title: "Custom Script",
    description: <>Action templates for custom script execution</>,
    faults: 2,
    faultLabel: "templates",
    category: "custom-script-actions",
    link: "/docs/resilience-testing/chaos-testing/actions/action-templates/custom-script",
  },
];
