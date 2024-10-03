/* eslint-disable no-undef */
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Head from '@docusaurus/Head';
import './CoveoSearch.scss';

const CoveoSearch = () => {
  const searchBoxEl = useRef(null);
  const searchResultsEl = useRef(null);
  const [isCoveoLoaded, setIsCoveoLoaded] = useState(false);
  const {
    location: { pathname },
  } = useHistory();

  const initializeCoveo = async () => {
    let tokenData = {};

    const getCoveoToken = async () => {
      const rootUrl = window.location.href.split('/').slice(0, 3).join('/');
      try {
        const response = await fetch(rootUrl + '/api/coveo_api');
        const data = await response.json();
        const item = {
          token: data.token,
          orgId: data.id,
          expiry: Date.now() + 12 * 60 * 60 * 1000, // 12hrs from now
        };
        localStorage.setItem('coveo_token', JSON.stringify(item));
        return item;
      } catch (error) {
        console.error('Error fetching Coveo token:', error);
      }
    };

    const loadCoveoScript = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src =
          'https://static.cloud.coveo.com/searchui/v2.10094/js/CoveoJsSearch.min.js';
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const initializeSearch = async () => {
      const storedToken = localStorage.getItem('coveo_token');
      if (storedToken) {
        const data = JSON.parse(storedToken);
        if (data.expiry <= Date.now()) {
          tokenData = await getCoveoToken();
        } else {
          tokenData = data;
        }
      } else {
        tokenData = await getCoveoToken();
      }
    
      // Check if tokenData is missing or invalid
      if (!tokenData) {
        console.error('Error initializing Coveo: Missing token or orgId');
        return;
      }
    
      // Proceed with initializing Coveo if window.Coveo is defined
      if (window.Coveo) {
        Coveo.SearchEndpoint.configureCloudV2Endpoint(
          tokenData.orgId,
          tokenData.token
        );
        let searchboxRoot = searchBoxEl.current;
        let searchRoot = document.createElement('div');
        searchRoot.setAttribute('class', 'coveo-search-results');
        searchRoot.setAttribute('style', 'display: none;');
    
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
              <div class="CoveoPromotedResultsBadge"></div>
              <div class="CoveoFolding"></div>
              <div class="CoveoAnalytics"></div>
              <div class="coveo-main-section">
                  <div class="coveo-facet-column">
                      <div class="CoveoDynamicFacet" data-title="Source" data-field="@commonsource"></div>
                      <div class="CoveoDynamicFacet" data-title="Content Type" data-field="@categoryname"></div>
                      <div class="CoveoDynamicFacet" data-title="Module" data-field="@commonmodule"></div>
                  </div>
                  <div class="coveo-results-column">
                      <div class="CoveoBreadcrumb"></div>
                      <div class="CoveoDidYouMean"></div>
                      <div class="coveo-results-header">
                          <span class="CoveoQuerySummary"></span>
                          <span class="CoveoSort" data-sort-criteria="relevancy"></span>
                          <span class="CoveoSort" data-sort-criteria="date descending,date ascending"></span>
                      </div>
                      <div class="CoveoResultList"></div>
                      <div class="CoveoPager"></div>
                      <div class="CoveoLogo"></div>
                      <div class="CoveoResultsPerPage"></div>
                  </div>
              </div>
          </div>
        `;
    
        const coveoRoot = searchRoot.querySelector('#coveo-search');
        Coveo.init(coveoRoot, {
          externalComponents: [searchboxRoot],
        });
    
        Coveo.$$(coveoRoot).on('doneBuildingQuery', function (e, args) {
          let q = args.queryBuilder.expression.build();
          if (q) {
            searchRoot.style.display = 'block';
          } else {
            searchRoot.style.display = 'none';
          }
        });
    
        Coveo.$$(coveoRoot).on('afterInitialization', function () {
          Coveo.state(coveoRoot, 'f:@commonsource', ['Developer Hub']);
        });
      } else {
        console.error('Coveo script failed to load.');
      }
    };
    await loadCoveoScript();
    await initializeSearch();
  };

  useEffect(() => {
    if (!isCoveoLoaded) {
      initializeCoveo().then(() => setIsCoveoLoaded(true));
    }
  }, [isCoveoLoaded, pathname]);

  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://static.cloud.coveo.com/searchui/v2.10094/css/CoveoFullSearch.min.css"
        />
      </Head>
      <div id="searchBoxCoveo" ref={searchBoxEl}></div>
      <div id="searchResultsCoveo" ref={searchResultsEl}></div>
    </div>
  );
};

export default CoveoSearch;