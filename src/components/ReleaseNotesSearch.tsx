import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import styles from './ReleaseNotesSearch.module.css';

interface SearchResult {
  id: string;
  title: string;
  preview: string;
}

export default function ReleaseNotesSearch(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    // Search through all headings (H2, H3, H4) and their content
    const searchLower = searchTerm.toLowerCase();
    const foundResults: SearchResult[] = [];

    // Find all headings in the article
    const allHeadings = document.querySelectorAll('article h2, article h3, article h4');
    
    allHeadings.forEach((heading) => {
      const headingText = heading.textContent || '';
      const headingId = heading.id;
      
      // Skip if heading has no ID
      if (!headingId) return;
      
      const currentLevel = parseInt(heading.tagName.substring(1)); // Get 2 from H2, 3 from H3, etc.
      
      // Get content directly under this heading (not including subheadings)
      let directContent = '';
      let nextElement = heading.nextElementSibling;
      
      while (nextElement) {
        // Stop if we hit any heading
        if (nextElement.tagName.match(/^H[1-6]$/)) {
          break;
        }
        directContent += nextElement.textContent + ' ';
        nextElement = nextElement.nextElementSibling;
      }

      // Only include this heading if the search term appears in:
      // 1. The heading text itself, OR
      // 2. The direct content under this heading (not subheadings)
      const headingMatches = headingText.toLowerCase().includes(searchLower);
      const contentMatches = directContent.toLowerCase().includes(searchLower);
      
      if (headingMatches || contentMatches) {
        // Find the matching text for preview
        let preview = '';
        
        if (headingMatches) {
          // If heading matches, show the heading as preview
          preview = headingText;
        } else if (contentMatches) {
          // If content matches, show snippet of matching content
          const matchIndex = directContent.toLowerCase().indexOf(searchLower);
          const start = Math.max(0, matchIndex - 50);
          const end = Math.min(directContent.length, matchIndex + 100);
          preview = '...' + directContent.substring(start, end).trim() + '...';
        }

        // Get the parent H2 title for context (if this is H3 or H4)
        let contextTitle = headingText;
        if (currentLevel > 2) {
          // Find the parent H2
          let parentH2 = heading.previousElementSibling;
          while (parentH2) {
            if (parentH2.tagName === 'H2') {
              contextTitle = `${parentH2.textContent} → ${headingText}`;
              break;
            }
            parentH2 = parentH2.previousElementSibling;
          }
        }

        foundResults.push({
          id: headingId,
          title: contextTitle,
          preview: preview
        });
      }
    });

    setResults(foundResults);
    setIsSearching(false);
  }, [searchTerm]);

  const handleClear = () => {
    setSearchTerm('');
    setResults([]);
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBox}>
        <svg 
          className={styles.searchIcon}
          width="20" 
          height="20" 
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search releases on this page..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search release notes"
        />
        {searchTerm && (
          <button
            className={styles.clearButton}
            onClick={handleClear}
            aria-label="Clear search"
            type="button"
          >
            ✕
          </button>
        )}
      </div>

      {searchTerm && (
        <div className={styles.resultsContainer}>
          {isSearching ? (
            <div className={styles.searching}>Searching...</div>
          ) : results.length > 0 ? (
            <>
              <div className={styles.resultsHeader}>
                Found {results.length} {results.length === 1 ? 'release' : 'releases'}
              </div>
              <div className={styles.resultsList}>
                {results.map((result) => (
                  <Link
                    key={result.id}
                    to={`#${result.id}`}
                    className={styles.resultItem}
                    onClick={() => {
                      // Smooth scroll to the element
                      const element = document.getElementById(result.id);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                  >
                    <div className={styles.resultTitle}>{result.title}</div>
                    <div className={styles.resultPreview}>{result.preview}</div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className={styles.noResults}>
              No releases found for "{searchTerm}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
