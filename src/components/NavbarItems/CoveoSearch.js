/* eslint-disable no-undef */
import React, { useEffect, useRef } from "react";
import Head from "@docusaurus/Head";
import "./CoveoSearch.scss";

const CoveoSearch = () => {
  const searchBoxEl = useRef(null);
  const searchResultsEl = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      // document.addEventListener("DOMContentLoaded", () => {
      (async () => {
        /*
        const resToken = await fetch(
          "/api/gettoken-docs/" // https://next.harness.io/api/gettoken-docs/
        );
        const dataToken = await resToken.json();
        */
        const orgId = "harnessproductionp9tivsqy"; // production // dataToken?.orgId;
        // const orgId = "harnessnonproduction1lrjymmsx"; // staging
        const apiToken = "xx2eef595e-79f4-43e6-ab05-be1e1786d775"; // production // dataToken?.apiKey;
        // const apiToken = "xx4a2f7d68-2128-4979-9d9d-aa804a3200b1"; // staging

        let searchboxRoot = searchBoxEl.current; // document.getElementById("instant-search");
        let searchRoot = document.createElement("div");
        searchRoot.setAttribute("class", "coveo-search-results");
        const elemSearchResultConainer = searchResultsEl.current;

        if (elemSearchResultConainer) {
          elemSearchResultConainer.appendChild(searchRoot);
        }

        searchboxRoot.innerHTML = `
            <div class='CoveoSearchbox' data-enable-omnibox='true' data-placeholder='Search...' data-trigger-query-on-clear='true' data-query-suggest-character-threshold='1'>
                <div class="CoveoAnalytics" data-search-hub="WebsiteSearch"></div>
            </div>
        `;
        searchRoot.innerHTML = `
            <div id="coveo-search" class="CoveoSearchInterface" data-enable-history="false">
                <div class="CoveoPromotedResultsBadge" data-caption-for-recommended="Recommended" data-caption-for-featured="Recommended" data-color-for-featured-results="unset" data-color-for-recommended-results="unset"></div>
                <div class="CoveoFolding"></div>
                <div class="CoveoAnalytics" data-search-hub="WebsiteSearch"></div>
                <div class="coveo-main-section">
                    <div class="coveo-facet-column">
                        <div class="CoveoDynamicFacet" data-title="Source" data-field="@commonsource" data-tab="All" data-enable-facet-search="false" data-number-of-values="10" data-custom-sort="Harness Hub"></div>
                        <div class="CoveoDynamicFacet" data-title="Category" data-field="@categoryname" data-tab="All" data-enable-facet-search="false" data-number-of-values="15"></div>
                        <div class="CoveoDynamicFacet" data-title="Module" data-field="@commonmodule" data-tab="All" data-enable-facet-search="false" data-number-of-values="10"></div>
                    </div>
                    <div class="coveo-results-column">
                    <div class="CoveoShareQuery"></div>
                    <div class="CoveoPreferencesPanel">
                        <div class="CoveoResultsPreferences"></div>
                        <div class="CoveoResultsFiltersPreferences"></div>
                    </div>
                    <div class="CoveoTriggers"></div>
                    <div class="CoveoBreadcrumb"></div>
                    <div class="CoveoDidYouMean"></div>
                    <div class="coveo-results-header">
                        <div class="coveo-summary-section">
                        <span class="CoveoQuerySummary"><div class="coveo-show-if-no-results"></div></span>
                        <span class="CoveoQueryDuration"></span>
                        </div>
                        <div class="coveo-result-layout-section">
                        <span class="CoveoResultLayout"></span>
                        </div>
                        <div class="coveo-sort-section">
                        <span class="CoveoSort" data-sort-criteria="relevancy" data-caption="Relevance"></span>
                        <span class="CoveoSort" data-sort-criteria="date descending,date ascending" data-caption="Date"></span>
                        </div>
                    </div>
                    <div class="CoveoHiddenQuery"></div>
                    <div class="CoveoErrorReport" data-pop-up="false"></div>
                    <div class="CoveoResultList" data-layout="list" data-wait-animation="fade" data-auto-select-fields-to-include="true">
                    </div>
                    <div class="CoveoPager"></div>
                    <div class="CoveoLogo"></div>
                    <div class="CoveoResultsPerPage"></div>
                    </div>
                </div>
            </div>`;
        let coveoRoot = document.getElementById("coveo-search");
        Coveo.SearchEndpoint.configureCloudV2Endpoint(orgId, apiToken);
        Coveo.$$(coveoRoot).on("doneBuildingQuery", function (e, args) {
          let q = args.queryBuilder.expression.build();
          if (q) {
            searchRoot.style.display = "block";
            if (elmContent) {
              elmContent.style.display = "none";
            }
          } else {
            searchRoot.style.display = "none";
            if (elmContent) {
              elmContent.style.display = "block";
            }
          }
        });
        Coveo.$$(coveoRoot).on("afterInitialization", function (e, args) {
          Coveo.state(coveoRoot, "f:@commonsource", ["Developer Hub"]);
          document
            .querySelector(".CoveoSearchbox .magic-box-input input")
            .focus();
        });
        Coveo.init(coveoRoot, {
          externalComponents: [searchboxRoot],
        });
      })();
    }, 900);
    // }, false);
  }, []);
  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://static.cloud.coveo.com/searchui/v2.10094/css/CoveoFullSearch.min.css"
        />
        <script
          className="coveo-script"
          src="https://static.cloud.coveo.com/searchui/v2.10094/js/CoveoJsSearch.min.js"
        ></script>
        <script src="https://cdn.jsdelivr.net/gh/wei-harness/cdn/js/coveo_template.js"></script>
      </Head>
      <div id="searchBoxCoveo" ref={searchBoxEl}></div>
      <div id="searchResultsCoveo" ref={searchResultsEl}></div>
    </div>
  );
};

export default CoveoSearch;
