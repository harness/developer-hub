import React, { useState, useEffect } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import DocVideo from "@site/src/components/DocVideo";
import "./DynamicMarkdownSelector.css";

import type {TOCItem} from '@docusaurus/mdx-loader';

declare var require: {
  context(
    directory: string,
    useSubdirectories?: boolean,
    regExp?: RegExp,
    mode?: string
  ): any;
};

const mdxCtx = require.context("@site/docs", true, /\/content\/.*\.md$/);
const mdxMap: Record<string, React.ComponentType<any>> = {};
mdxCtx.keys().forEach((key: string) => {
  const normalized = "/" + key.replace("./", "");
  mdxMap[normalized] = mdxCtx(key).default;
});

export interface DynamicMarkdownSelectorProps {
  options: Record<
    string,
    {
      path: string;
      logo?: string;
      iconOnly?: boolean;
      logoSize?: number;
      logoWidth?: number;
      logoHeight?: number;
    }
  >;
  mdToc: TOCItem[];
  precedingHeadingID: string;
  nextHeadingID: string;
}

// Determine column count for visual balance
const getGridColumns = (count: number): number => {
  if (count <= 5) return count;
  if (count <= 10) return Math.ceil(count / 2);
  if (count <= 15) return Math.ceil(count / 3);
  return 5;
};

const DynamicMarkdownSelector: React.FC<DynamicMarkdownSelectorProps> = ({ options, mdToc, precedingHeadingID = '', nextHeadingID = '' }) => {

  const normalize = (str: string) => str.toLowerCase().replace(/\s+/g, "");
  const labels = Object.keys(options).sort((a, b) => a.localeCompare(b));

  const getInitialSelected = () => {
    const hash = typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";
    const match = labels.find((label) => normalize(label) === normalize(hash));
    return match || labels[0];
  };

  const [selected, setSelected] = useState(getInitialSelected());
  const [ContentComp, setContentComp] = useState<React.ComponentType<any> | null>(null);
  const [search, setSearch] = useState("");


  // Update selection if hash changes

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      const match = labels.find(
        (label) => normalize(label) === normalize(hash)
      );
      if (match) setSelected(match);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [labels]);

  // Update hash in URL when selection changes

  useEffect(() => {
    const path = options[selected]?.path;
    const entry = mdxMap[path];
    setContentComp(() =>
      entry ? entry : () => <p>Could not find content for <code>{path}</code>.</p>
    );
  }, [selected, options]);

  useEffect(() => {
    const hash = normalize(selected);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${hash}`);
    }
  }, [selected]);


  const filteredLabels = labels.filter((label) =>
    label.toLowerCase().includes(search.toLowerCase())
  );

  // Determine which labels to show and how many columns
  const showSearch = labels.length > 12;
  const displayLabels = showSearch ? filteredLabels : labels;
  const columns = getGridColumns(displayLabels.length);


  spliceMDToc( 
    mdToc,  
    precedingHeadingID, 
    nextHeadingID, 
    mdxCtx( '.' + options[selected]?.path )?.toc  //e.g. mdxCtx('./cloud-cost-management/content/get-started/aws-quickstart.md').toc
  );


  return (
    <BrowserOnly>
      {() => (
        <div className="dynamic-markdown-selector">
          <hr className="selector-divider" />
          <div className="selector-panel">
            {showSearch && (
              <input
                type="text"
                placeholder="Search formats..."
                className="format-search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            )}
            <div
              className="selector-grid"
              style={{
                gridTemplateColumns: `repeat(${columns}, minmax(140px, 1fr))`,
              }}
            >
              {displayLabels.map((label) => {
                const entry = options[label];
                return (
                  <button
                    key={label}
                    className={`selector-card${selected === label ? " selected" : ""}`}
                    onClick={() => setSelected(label)}
                    type="button"
                  >
                    {entry.logo ? (
                      <div className="selector-entry">
                        <img
                          src={`/provider-logos/${entry.logo}`}
                          alt={`${label} logo`}
                          className="selector-icon"
                          {...((entry.logoWidth || entry.logoHeight || entry.logoSize) ? {
                            style: {
                              width: entry.logoWidth ?? entry.logoSize,
                              height: entry.logoHeight ?? entry.logoSize,
                              objectFit: "contain",
                              maxWidth: "100%",
                              maxHeight: "100%",
                            }
                          } : {})}
                        />
                        {!entry.iconOnly && <span>{label}</span>}
                      </div>
                    ) : (
                      !entry.iconOnly && <span className="selector-entry no-logo">{label}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="markdown-content">
            {ContentComp && <ContentComp components={{ Tabs, TabItem, DocVideo }} />}
          </div>
          <hr className="selector-divider" />
        </div>
      )}
    </BrowserOnly>
  );
};


/**
 * Dynamically updates table of contents of the parent component (the parent md page).
 * Inserts the headings from the DynamicMarkdownSelector (DMS) content into the table of
 * contents that appears at the page top right.
 * @param mdToc              Parent component's toc (table of contents) array. We add headings to this.
 * @param precedingHeadingID Heading id that comes before the DMS component on the parent page.
 * @param nextHeadingID      Heading id that comes after the DMS component on the parent page.
 * @param dmsToc             Linked page that is selected in the DMS. We add headings from this page to mdToc.
 */
function spliceMDToc( 
  mdToc: TOCItem[],  
  precedingHeadingID: string = '', 
  nextHeadingID     : string = '', 
  dmsToc: TOCItem[]
) {

  if( !mdToc ) return;

  removePlaceholder(mdToc);

  const mdTocSpliceStart = mdToc.findIndex(e => e.id == precedingHeadingID?.replace('#', '')) + 1; // will be 0, if heading is not found

  let mdTocSpliceEnd = mdToc.findIndex(e => e.id == nextHeadingID?.replace('#', ''));
  if (mdTocSpliceEnd == -1) mdTocSpliceEnd = mdToc.length;
  

  // remove DynamicMarkdownSelector (DMS) toc content (from previous component render)
  mdToc.splice(mdTocSpliceStart, mdTocSpliceEnd - mdTocSpliceStart);


  /* console.log("DEBUG (after removing in DMS content) mdToc length", mdToc.length);
  for (let i = 0; i < mdToc.length; i++) {
    console.log("# mdToc" + i, mdToc[i].value);
  } */

  if( dmsToc ) {

    // (re-)add DMS toc content
    mdToc.splice(mdTocSpliceStart, 0, ...dmsToc);
    updateTocHTML( mdToc );
  }

  addPlaceholder(mdToc);
}


/**
 * Manually update the page's table of contents, using innerHTML.
 * -- We are doing this because we cannot nudge the parent component to refresh using normal React
 *  patterns (i.e. we can't define state variables in the md page and pass them to the child component).
 * @param mdToc The parent component's toc (table of contents) array. We copy these headings to the DOM tree.
 */
function updateTocHTML( mdToc: TOCItem[] ) { 

  if( !ExecutionEnvironment.canUseDOM ) return;
  
  let mdTocIndex = 0;


  // there is only one table of contents on the page (the one we want to update)
  const pgToc: Element = document.getElementsByClassName("table-of-contents table-of-contents__left-border").item(0);

  if( pgToc == undefined ) return;

  // clear TOC items (remove all children)
  pgToc.innerHTML = '';
  pgToc.removeAttribute('hidden');
  
  if( mdToc.length == 0 ) pgToc.setAttribute('hidden', '');  // this removes the left border (vertical line)

  while( mdTocIndex < mdToc.length ){

    // get a pointer to the toc contents
    let pgTocElement: Element = document.createElement('li');


    // update toc heading

    pgTocElement.innerHTML = 
      '<a href="#{ID}" class="table-of-contents__link toc-highlight table-of-contents__link">{VALUE}</a>';
    pgTocElement.innerHTML = 
      pgTocElement.innerHTML.replace('{ID}'   , mdToc[mdTocIndex].id   )
                            .replace('{VALUE}', mdToc[mdTocIndex].value);


    // update any children

    let L3innerHTML = '';

    ++mdTocIndex;

    while( mdTocIndex < mdToc.length && mdToc[mdTocIndex].level >= 3 ) {
      if ( mdToc[mdTocIndex].level == 3 ) {
        L3innerHTML += 
          '<li><a href="#{ID}" class="table-of-contents__link toc-highlight table-of-contents__link">{VALUE}</a></li>';
        L3innerHTML = 
          L3innerHTML.replace('{ID}'   , mdToc[mdTocIndex].id   )
                     .replace('{VALUE}', mdToc[mdTocIndex].value);
      }
      ++mdTocIndex;
    }

    if( L3innerHTML != '' ) {
      pgTocElement.innerHTML += '<ul>' + L3innerHTML + '</ul>';
    }


    pgToc.append(pgTocElement);
  }
}


/**
 * We add/remove a placeholder to handle an edge case: If there are no headings in the
 * first DMS button selected, then the toc is not created in the DOM of the parent page
 * and cannot be updated.
 * -- To prevent this from happening, we add and remove a placeholder. Then the DOM elements
 *  for the tocare created and we can update them when the selection changes.
 * @param mdToc The parent component's toc (table of contents) array.
 */

const placeholder: TOCItem = { id: 'placeholder', value: '', level: 2 };

function addPlaceholder ( mdToc: TOCItem[] )
{
  if( mdToc.length == 0 ) mdToc.push(placeholder);
}

function removePlaceholder( mdToc: TOCItem[] ) {

  const placeholderIndex:number = mdToc.findIndex(
      x => 
        x.id    == placeholder.id    && 
        x.value == placeholder.value && 
        x.level == placeholder.level
  );

  if( placeholderIndex != -1 ) mdToc.splice(placeholderIndex, 1);
}




export default DynamicMarkdownSelector;