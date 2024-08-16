/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { type ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import {
  useDocById,
  findFirstSidebarItemLink,
} from '@docusaurus/plugin-content-docs/client';
import isInternalUrl from "@docusaurus/isInternalUrl";
import { translate } from "@docusaurus/Translate";
import type { Props } from "@theme/DocCard";

import styles from "./styles.module.css";
import type {
  PropSidebarItemCategory,
  PropSidebarItemLink,
} from "@docusaurus/plugin-content-docs";

function CardContainer({
  href,
  title,
  children,
}: {
  title: string;
  href: string;
  children: ReactNode;
}): JSX.Element {
  const cardTitleClass = title
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
    .toLowerCase();

  

  return (
    <Link
      href={href}
      className={clsx("card padding--lg", styles.cardContainer, cardTitleClass)}
    >
      {children}
    </Link>
  );
}

function CardLayout({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: ReactNode;
  title: string;
  description?: string;
}): JSX.Element {
  return (
    <CardContainer href={href} title={title}>
      <h2 className={clsx("text--truncate", styles.cardTitle)} title={title}>
        {icon} {title}
      </h2>
      {description && (
        <p
          className={clsx("text--truncate", styles.cardDescription)}
          title={description}
        >
          {description}
        </p>
      )}
    </CardContainer>
  );
}

function CardCategory({
  item,
}: {
  item: PropSidebarItemCategory;
}): JSX.Element | null {
  const href = findFirstSidebarItemLink(item);

  // Unexpected: categories that don't have a link have been filtered upfront
  if (!href) {
    return null;
  }

  const customPropsDesc =
    item.description || (item.customProps && item.customProps.description);
  return (
    <CardLayout
      href={href}
      icon="" // "[folder]"
      title={item.label}
      description={translate(
        {
          message: customPropsDesc ? `${customPropsDesc}` : "{count} items",
          id: "theme.docs.DocCard.categoryDescription",
          description:
            "The default description for a category card in the generated index about how many items this category includes",
        },
        { count: item.items.length }
      )}
    />
  );
}

function CardLink({ item }: { item: PropSidebarItemLink }): JSX.Element {
  const icon = isInternalUrl(item.href) ? "" : ""; // "[file]" : "[link]";
  const doc = useDocById(item.docId ?? undefined);
  return (
    <CardLayout
      href={item.href}
      icon={icon}
      title={item.label}
      description={
        doc?.description ||
        item.description ||
        item?.customProps?.description.toString()
      }
    />
  );
}

export default function DocCard({ item }: Props): JSX.Element {
  switch (item.type) {
    case "link":
      return <CardLink item={item} />;
    case "category":
      return <CardCategory item={item} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
}
