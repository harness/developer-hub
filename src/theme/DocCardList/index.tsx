/* To overwrite <DocCard> for generated index category cards */
import React from "react";
import clsx from "clsx";
import {
  useCurrentSidebarCategory,
  filterDocCardListItems,
} from "@docusaurus/theme-common";
import DocCard from "@theme/DocCard";
import type { Props } from "@theme/DocCardList";
import styles from "./styles.module.css";

function DocCardListForCurrentSidebarCategory({ className }: Props) {
  const category = useCurrentSidebarCategory();
  return <DocCardList items={category.items} className={className} />;
}

export default function DocCardList(props: Props): JSX.Element {
  const { items, className } = props;
  if (!items) {
    return <DocCardListForCurrentSidebarCategory {...props} />;
  }
  const filteredItems = filterDocCardListItems(items);
  return (
    <section className={clsx("row", className, styles.docCardList)}>
      {filteredItems.map((item, index) => (
        <article
          key={index}
          className="col margin-bottom--lg"
          // col--6
        >
          <DocCard item={item} />
        </article>
      ))}
    </section>
  );
}
