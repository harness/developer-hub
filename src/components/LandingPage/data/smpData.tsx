import React from "react";
import { CardItem, docType } from "../TutorialCard";
import { MODULES } from "../../../constants";

export const SMPList: CardItem[] = [
  {
    title: "Configure an external cloud-based Mongo database",
    module: MODULES.smp,
    icon: "img/logo.svg",
    description: (
      <>Learn how to use an external cloud-based MongoDB with Self-Managed Enterprise Edition installations.</>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "10 min",
    link: "/tutorials/self-managed-enterprise-edition/use-an-external-mongodb-database",
  },
  {
    title: "Configure a self-managed TimescaleDB",
    module: MODULES.smp,
    icon: "img/logo.svg",
    description: (
      <>Learn how to use an external self-managed PostgreSQL database with Self-Managed Enterprise Edition installations.</>
    ),
      newDoc: true,
    type: [docType.Documentation],
    time: "10 min",
    link: "/tutorials/self-managed-enterprise-edition/use-an-external-sm-timescaledb",
  },
  {
    title: "Configure an external self-managed MongoDB",
    module: MODULES.smp,
    icon: "img/logo.svg",
    description: (
      <>Learn how to use an external self-managed MongoDB with Self-Managed Enterprise Edition installations.</>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "10 min",
    link: "/tutorials/self-managed-enterprise-edition/use-an-external-self-managed-mongodb",
   },
   {
    title: "Configure an external self-managed Redis database",
    module: MODULES.smp,
    icon: "img/logo.svg",
    description: (
      <>Learn how to use an external self-managed Redis database with Self-Managed Enterprise Edition installations.</>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "15 min",
    link: "/tutorials/self-managed-enterprise-edition/use-an-external-redis-database",
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
