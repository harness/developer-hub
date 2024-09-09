/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import {
  PageMetadata,
  useCurrentSidebarCategory,
} from "@docusaurus/theme-common";
import useBaseUrl from "@docusaurus/useBaseUrl";
import DocCardList from "@theme/DocCardList";
import DocPaginator from "@theme/DocPaginator";
import DocVersionBanner from "@theme/DocVersionBanner";
import DocVersionBadge from "@theme/DocVersionBadge";
import DocBreadcrumbs from "@theme/DocBreadcrumbs";
import Heading from "@theme/Heading";
import type { Props } from "@theme/DocCategoryGeneratedIndexPage";

import styles from "./styles.module.css";

// const myMap = new Map();
// myMap.set(
//   "/docs/category/browser-testing/",
//   "https://docusaurus.io/docs/api/plugin-methods/lifecycle-apis#postBuild"
// );

const myMap = new Map([
  [
    "/docs/category/browser-testing/",
    "https://docusaurus.io/docs/api/plugin-methods/lifecycle-apis#postBuild",
  ],
  [
    "/docs/category/get-started-with-code",
    "https://docusaurus.io/docs/markdown-features/react",
  ],
]);

import { useLocation } from "@docusaurus/router";
import Head from "@docusaurus/Head";
function DocCategoryGeneratedIndexPageMetadata({
  categoryGeneratedIndex,
}: Props): JSX.Element {
  const location = useLocation();
  console.log(location.pathname);
  console.log(myMap.get(location.pathname));

  return (
    <>
      <Head>
        {myMap.get(location.pathname) ? (
          <link rel="canonical" href={`${myMap.get(location.pathname)}`}></link>
        ) : null}
      </Head>
      <PageMetadata
        title={categoryGeneratedIndex.title}
        description={categoryGeneratedIndex.description}
        keywords={categoryGeneratedIndex.keywords}
        // TODO `require` this?
        image={useBaseUrl(categoryGeneratedIndex.image)}
      />
    </>
  );
}

function DocCategoryGeneratedIndexPageContent({
  categoryGeneratedIndex,
}: Props): JSX.Element {
  const category = useCurrentSidebarCategory();
  return (
    <div className={styles.generatedIndexPage}>
      <DocVersionBanner />
      <DocBreadcrumbs />
      <DocVersionBadge />
      <header>
        <Heading as="h1" className={styles.title}>
          {categoryGeneratedIndex.title}
        </Heading>
        {categoryGeneratedIndex.description && (
          <p>{categoryGeneratedIndex.description}</p>
        )}
      </header>
      <article className="margin-top--lg">
        <DocCardList items={category.items} className={styles.list} />
      </article>
      <footer className="margin-top--lg">
        <DocPaginator
          previous={categoryGeneratedIndex.navigation.previous}
          next={categoryGeneratedIndex.navigation.next}
        />
      </footer>
    </div>
  );
}

export default function DocCategoryGeneratedIndexPage(
  props: Props
): JSX.Element {
  return (
    <>
      <DocCategoryGeneratedIndexPageMetadata {...props} />
      <DocCategoryGeneratedIndexPageContent {...props} />
    </>
  );
}
