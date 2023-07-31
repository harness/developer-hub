import React from "react";
import { CardItem, docType } from "../TutorialCard";
import { MODULES } from "../../../constants";

export const SMPList: CardItem[] = [
  {
    title: "Configure a self-managed Mongo database",
    module: MODULES.smp,
    icon: "img/logo.svg",
    description: (
      <>Learn how to use an external MongoDB server with Self-Managed Enterprise Edition installations.</>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "10 min",
    link: "/tutorials/self-managed-enterprise-edition/use-an-external-mongodb-database",
  },
  {
    title: "Configure a self-managed PostgreSQL database",
    module: MODULES.smp,
    icon: "img/logo.svg",
    description: (
      <>Learn how to use an external PostgreSQL database with Self-Managed Enterprise Edition installations.</>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "15 min",
    link: "/tutorials/self-managed-enterprise-edition/use-an-external-postgres-database",
  },
];
