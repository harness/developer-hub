import React, { useState, useMemo, useEffect } from "react";
import Layout from "@theme/Layout";
import { useHistory, useLocation } from "@docusaurus/router";
import FeedbackWidget from "@site/src/components/FeedbackWidget";
import glossaryData from "@site/src/data/glossary.json";
import "@site/src/css/glossary.css";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const MODULE_LABELS: Record<string, string> = {
  platform: "Platform",
  cd: "CD",
  ci: "CI",
  sto: "STO",
  cacm: "CACM",
  rt: "Resilience Testing",
  fme: "FME",
  iacm: "IaCM",
  sei: "SEI",
  idp: "IDP",
  ar: "Artifact Registry",
  code: "Code Repository",
  dbdevops: "Database DevOps",
  aisre: "AI SRE",
  scs: "Supply Chain Security",
};

const disambiguationEntries = glossaryData.entries.filter(
  (e) => e.module === "disambiguation"
);
const glossaryEntries = glossaryData.entries.filter(
  (e) => e.module !== "disambiguation"
);

export default function GlossaryPage() {
  const location = useLocation();
  const history = useHistory();

  const queryParams = new URLSearchParams(location.search);
  const initialModule = queryParams.get("product") || "All";
  const hashLetter = location.hash?.replace("#", "").toUpperCase();
  const initialLetter =
    hashLetter && letters.includes(hashLetter) ? hashLetter : "All";

  const [activeLetter, setActiveLetter] = useState(initialLetter);
  const [activeModule, setActiveModule] = useState(initialModule);
  const [searchQuery, setSearchQuery] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);

  const modules = Array.from(
    new Set(glossaryEntries.map((e) => e.module).filter(Boolean))
  ).sort((a, b) => (MODULE_LABELS[a] || a).localeCompare(MODULE_LABELS[b] || b));

  /** URL helper */
  const updateURL = (module: string, hash: string = "") => {
    const params = new URLSearchParams(window.location.search);
    module === "All"
      ? params.delete("product")
      : params.set("product", module);

    history.replace({
      pathname: window.location.pathname,
      search: params.toString(),
      hash,
    });
  };

  /** Handlers */
  const handleModuleChange = (m: string) => {
    setActiveModule(m);
    setActiveLetter("All");
    updateURL(m, "");
  };

  const handleLetterChange = (l: string) => {
    setActiveLetter(l);
    const hash = l === "All" ? "" : `#${l}`;
    updateURL(activeModule, hash);
  };

  /** Group entries */
  const groupedEntries = useMemo(() => {
    const group: Record<string, typeof glossaryEntries> = {};
    const query = searchQuery.toLowerCase().trim();

    glossaryEntries.forEach((entry) => {
      if (activeModule !== "All" && entry.module !== activeModule) return;
      if (query && !entry.term.toLowerCase().includes(query) && !entry.definition.toLowerCase().includes(query)) return;

      if (!group[entry.letter]) group[entry.letter] = [];
      group[entry.letter].push(entry);
    });

    return group;
  }, [activeModule, searchQuery]);

  const availableLetters = useMemo(() => {
    return new Set(Object.keys(groupedEntries));
  }, [groupedEntries]);

  /** Scroll + Back to Top */
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace("#", ""));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }

    const onScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.hash]);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  /** Render helpers */
  const renderModulePills = (entryModule: string) =>
    (entryModule || "")
      .split(",")
      .map((m) => m.trim())
      .filter((m) => m !== "disambiguation")
      .map((m) => (
        <span
          key={m}
          style={{
            display: "inline-block",
            padding: "4px 8px",
            borderRadius: 0,
            backgroundColor: "#0078d4",
            color: "#fff",
            marginRight: 6,
            marginBottom: 4,
          }}
        >
          {MODULE_LABELS[m] || m.toUpperCase()}
        </span>
      ));

  const renderRelatedTerms = (
    related: typeof glossaryData.entries[0]["related"]
  ) =>
    related?.map((r, i) => (
      <span key={r.slug}>
        <a
          href={`#${r.slug}`}
          style={{ color: "#0078d4", cursor: "pointer" }}
          onClick={(e) => {
            e.preventDefault();

            const el = document.getElementById(r.slug);
            if (el) el.scrollIntoView({ behavior: "smooth" });

            const params = new URLSearchParams(window.location.search);
            activeModule !== "All"
              ? params.set("product", activeModule)
              : params.delete("product");

            history.replace({
              pathname: window.location.pathname,
              search: params.toString(),
              hash: `#${r.slug}`,
            });

            const targetLetter = r.term[0].toUpperCase();
            if (letters.includes(targetLetter)) {
              setActiveLetter(targetLetter);
            }
          }}
        >
          {r.term}
        </a>
        {i < related.length - 1 ? ", " : ""}
      </span>
    ));

  return (
    <Layout
      title="Glossary"
      description="Browse glossary definitions for platform-wide terms."
    >
      <main className="container margin-vert--lg">
        <div className="container">
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h1>Glossary</h1>
            <p>
              Explore definitions for terminology used throughout the Harness
              platform. Filter by product area or browse alphabetically to learn
              about concepts, features, and capabilities across Harness modules.
            </p>

            {/* Search */}
            <div style={{ marginBottom: 16 }}>
              <input
                type="text"
                placeholder="Search terms or definitions..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setActiveLetter("All");
                }}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  fontSize: "0.95em",
                  border: "1.5px solid var(--ifm-color-emphasis-300, #dee2e6)",
                  borderRadius: 6,
                  outline: "none",
                  background: "var(--ifm-background-color, #fff)",
                  color: "var(--ifm-color-content, #333)",
                }}
              />
            </div>

            {/* Module filters */}
            <div style={{ marginBottom: 16, display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
              <strong style={{ marginRight: 4 }}>Module: </strong>
              {["All", ...modules].map((m) => (
                <button
                  key={m}
                  onClick={() => handleModuleChange(m)}
                  style={{
                    padding: "4px 10px",
                    background: activeModule === m ? "#0078d4" : "#eee",
                    color: activeModule === m ? "#fff" : "#000",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                    fontSize: "0.85em",
                    fontWeight: activeModule === m ? 600 : 400,
                  }}
                >
                  {m === "All" ? "All" : MODULE_LABELS[m] || m.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Letter filters */}
            <div style={{ marginBottom: 24 }}>
              {["All", ...letters].map((l) => {
                const isAll = l === "All";
                const hasEntries = isAll || availableLetters.has(l);
                return (
                  <button
                    key={l}
                    onClick={() => handleLetterChange(l)}
                    style={{
                      margin: 2,
                      padding: "4px 8px",
                      background: activeLetter === l ? "#0078d4" : "#eee",
                      color: activeLetter === l ? "#fff" : "#000",
                      border: "none",
                      borderRadius: 4,
                      cursor: hasEntries ? "pointer" : "not-allowed",
                      opacity: hasEntries ? 1 : 0.4,
                    }}
                    disabled={!hasEntries}
                  >
                    {l}
                  </button>
                );
              })}
            </div>

            {/* Commonly confused terms — collapsible */}
            {disambiguationEntries.length > 0 && (
              <details
                style={{
                  marginBottom: 24,
                  border: "1px solid var(--ifm-color-emphasis-200, #e9ecef)",
                  borderRadius: 6,
                  overflow: "hidden",
                }}
              >
                <summary
                  style={{
                    padding: "10px 16px",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: "0.9em",
                    background: "var(--ifm-color-emphasis-100, #f8f9fa)",
                    userSelect: "none",
                  }}
                >
                  Commonly confused terms ({disambiguationEntries.length})
                </summary>
                <div style={{ padding: "12px 16px" }}>
                  {disambiguationEntries.map((entry) => (
                    <div
                      key={entry.id}
                      id={entry.slug}
                      style={{
                        marginBottom: 10,
                        paddingBottom: 10,
                        borderBottom: "1px solid var(--ifm-color-emphasis-100, #f1f3f5)",
                      }}
                    >
                      <strong style={{ fontSize: "0.9em" }}>
                        {entry.term}
                      </strong>
                      <p
                        style={{
                          margin: "4px 0 0",
                          fontSize: "0.85em",
                          lineHeight: 1.5,
                          color: "var(--ifm-color-content-secondary)",
                        }}
                      >
                        {entry.definition}
                      </p>
                    </div>
                  ))}
                </div>
              </details>
            )}

            {/* Active module indicator */}
            {activeModule !== "All" && (
              <p style={{ fontSize: "0.85em", marginBottom: 16, opacity: 0.7 }}>
                Showing terms for <strong>{MODULE_LABELS[activeModule] || activeModule.toUpperCase()}</strong>{" "}
                ({Object.values(groupedEntries).flat().length} terms)
              </p>
            )}

            {/* Sections */}
            {(activeLetter === "All" ? letters : [activeLetter]).map(
              (letter) => {
                const entries = groupedEntries[letter] || [];
                if (!entries.length) return null;

                return (
                  <div key={letter} style={{ marginBottom: 32 }}>
                    <h2 id={letter}>{letter}</h2>

                    {entries.map((entry) => (
                      <div
                        key={entry.id}
                        id={entry.slug}
                        style={{ marginBottom: 24 }}
                      >
                        <h3
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            window.location.hash = entry.slug;
                            document
                              .getElementById(entry.slug)
                              ?.scrollIntoView({ behavior: "smooth" });
                          }}
                        >
                          {entry.term}
                        </h3>

                        <p>{entry.definition}</p>

                        <p style={{ fontSize: "0.85em", opacity: 0.9 }}>
                          {renderModulePills(entry.module)}
                        </p>

                        {entry.related?.length > 0 && (
                          <p style={{ fontSize: "0.85em", opacity: 0.7 }}>
                            <span style={{ fontStyle: "italic" }}>
                              Related terms:{" "}
                            </span>
                            {renderRelatedTerms(entry.related)}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                );
              }
            )}

            {/* Feedback widget */}
              <FeedbackWidget source="docs" />

            {/* Back to top */}
            {showBackToTop && (
              <button
                onClick={scrollToTop}
                style={{
                  position: "fixed",
                  bottom: 40,
                  right: 40,
                  padding: "8px 12px",
                  background: "#0078d4",
                  color: "#fff",
                  border: "none",
                  borderRadius: 4,
                  cursor: "pointer",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  zIndex: 1000,
                }}
              >
                ↑ Back to Top
              </button>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
}
