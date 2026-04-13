import React, { useState, useMemo, useEffect } from "react";
import Layout from "@theme/Layout";
import { useHistory, useLocation } from "@docusaurus/router";
import Feedback from "@site/src/components/Feedback";
import glossaryData from "@site/src/data/glossary.json";
import "@site/src/css/glossary.css";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const MODULE_LABELS: Record<string, string> = {
  fme: "Feature Management & Experimentation",
  iacm: "Infrastructure as Code Management",
  "sei": "Software Engineering Insights",
};

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
  const [showBackToTop, setShowBackToTop] = useState(false);

  const modules = Array.from(
    new Set(glossaryData.entries.map((e) => e.module).filter(Boolean))
  );

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
    updateURL(m, location.hash);
  };

  const handleLetterChange = (l: string) => {
    setActiveLetter(l);
    const hash = l === "All" ? "" : `#${l}`;
    updateURL(activeModule, hash);
  };

  /** Group entries */
  const groupedEntries = useMemo(() => {
    const group: Record<string, typeof glossaryData.entries> = {};

    glossaryData.entries.forEach((entry) => {
      if (activeModule !== "All" && entry.module !== activeModule) return;

      if (!group[entry.letter]) group[entry.letter] = [];
      group[entry.letter].push(entry);
    });

    return group;
  }, [activeModule]);

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
          {MODULE_LABELS[m] || m}
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
              Welcome to the Harness Glossary! This page is a work in progress.
              If you have feedback or terms to define, click the Feedback button.
            </p>

            {/* Module filters */}
            <div style={{ marginBottom: 16 }}>
              <strong>Module: </strong>
              {["All", ...modules].map((m) => (
                <button
                  key={m}
                  onClick={() => handleModuleChange(m)}
                  style={{
                    marginRight: 8,
                    padding: "4px 8px",
                    background: activeModule === m ? "#0078d4" : "#eee",
                    color: activeModule === m ? "#fff" : "#000",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                >
                  {m === "All" ? "All" : MODULE_LABELS[m] || m}
                </button>
              ))}
            </div>

            {/* Letter filters */}
            <div style={{ marginBottom: 24 }}>
              {["All", ...letters].map((l) => (
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
                    cursor: groupedEntries[l]?.length
                      ? "pointer"
                      : "not-allowed",
                    opacity: groupedEntries[l]?.length ? 1 : 0.4,
                  }}
                  disabled={!groupedEntries[l]?.length}
                >
                  {l}
                </button>
              ))}
            </div>

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
              <Feedback />

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