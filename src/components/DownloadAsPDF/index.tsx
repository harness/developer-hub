import React, { useEffect, useState } from 'react';

interface Html2PdfOptions {
  margin: [number, number];
  filename: string;
  image: { type: 'jpeg' | 'png' | 'webp' | 'jpg'; quality: number };
  html2canvas?: {
    scale: number;
    useCORS: boolean;
    logging: boolean;
    scrollY: number;
    windowWidth: number;
  };
  jsPDF?: {
    unit: 'in';
    format: string;
    orientation: 'portrait';
  };
  pagebreak?: {
    mode: string | string[];
    avoid: string | string[];
  };
}

const DownloadAsPdf: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);

    // 1. Create Overlay
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'white';
    overlay.style.zIndex = '99999';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.innerHTML = `<div style="font-size: 24px; font-weight: bold; margin-bottom: 20px;">Generating PDF</div><div>Please wait...</div>`;
    document.body.appendChild(overlay);

    try {
      // Recursive Harvesting ---

      // Unique ID generator
      let idCounter = 0;
      const getUniqueId = () => `pdf-dms-${idCounter++}`;

      // Assign IDs to currently visible selectors (Root level mainly)
      const allSelectors = document.querySelectorAll('.dynamic-markdown-selector');
      allSelectors.forEach((el) => {
        if (!el.getAttribute('data-pdf-id')) {
          el.setAttribute('data-pdf-id', getUniqueId());
        }
      });

      const originalHash = window.location.hash;

      /**
       * Recursively expands a selector and returns its fully flattened HTML string.
       */
      const harvestSelectorRecursively = async (selector: HTMLElement): Promise<string> => {
        const buttons = selector.querySelectorAll(':scope > .selector-panel .selector-card');
        const contentArea = selector.querySelector(':scope > .markdown-content');

        if (!buttons.length || !contentArea) return '';

        // Find currently selected button to restore later
        let originalSelectedIndex = 0;
        buttons.forEach((btn, idx) => {
          if (btn.classList.contains('selected')) originalSelectedIndex = idx;
        });

        let fullExpandedHtml = '';

        // Cycle through ALL buttons
        for (let j = 0; j < buttons.length; j++) {
          const btn = buttons[j] as HTMLButtonElement;
          const label = btn.innerText || btn.textContent || `Option ${j}`;

          // 1. Click and Wait for React render
          btn.click();
          //  timeout to ensure nested React components mount
          await new Promise((resolve) => setTimeout(resolve, 100));
          const liveNestedSelectors = contentArea.querySelectorAll('.dynamic-markdown-selector');
          liveNestedSelectors.forEach((el) => {
            if (!el.getAttribute('data-pdf-id')) {
              el.setAttribute('data-pdf-id', getUniqueId());
            }
          });

          const currentContentClone = contentArea.cloneNode(true) as HTMLElement;

          // 3. RECURSE: Process nested selectors
          if (liveNestedSelectors.length > 0) {
            for (let k = 0; k < liveNestedSelectors.length; k++) {
              const nestedEl = liveNestedSelectors[k] as HTMLElement;
              const nestedId = nestedEl.getAttribute('data-pdf-id');

              if (nestedId) {
                const flattenedNestedHtml = await harvestSelectorRecursively(nestedEl);

                const targetInClone = currentContentClone.querySelector(
                  `[data-pdf-id="${nestedId}"]`,
                );

                if (targetInClone) {
                  const replacementDiv = document.createElement('div');
                  replacementDiv.className = 'pdf-flattened-nested-wrapper';
                  replacementDiv.innerHTML = flattenedNestedHtml;
                  targetInClone.replaceWith(replacementDiv);
                }
              }
            }
          }

          const tabWrapper = document.createElement('div');
          tabWrapper.style.marginBottom = '30px';

          // Header
          const heading = document.createElement('h3');
          heading.innerText = label;
          heading.style.marginTop = '24px';
          heading.style.marginBottom = '16px';
          heading.style.borderBottom = '2px solid #eee';
          heading.style.paddingBottom = '8px';
          heading.style.backgroundColor = '#f9f9f9';
          heading.style.padding = '8px';

          tabWrapper.appendChild(heading);
          tabWrapper.innerHTML += currentContentClone.innerHTML;

          fullExpandedHtml += tabWrapper.outerHTML;
        }

        if (buttons[originalSelectedIndex]) {
          (buttons[originalSelectedIndex] as HTMLElement).click();
          await new Promise((resolve) => setTimeout(resolve, 50));
        }

        return fullExpandedHtml;
      };

      const rootSelectors: HTMLElement[] = [];
      document.querySelectorAll('.dynamic-markdown-selector').forEach((el) => {
        if (!el.parentElement?.closest('.dynamic-markdown-selector')) {
          rootSelectors.push(el as HTMLElement);
        }
      });

      const harvestedRoots = new Map<string, string>();

      for (const rootEl of rootSelectors) {
        const id = rootEl.getAttribute('data-pdf-id');
        if (id) {
          const html = await harvestSelectorRecursively(rootEl);
          harvestedRoots.set(id, html);
        }
      }

      // Restore History
      if (window.history.replaceState) {
        window.history.replaceState(null, '', window.location.pathname + originalHash);
      }

      const originalElement = document.querySelector('.theme-doc-markdown');
      if (!originalElement) throw new Error('Content root not found');

      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '0';
      container.style.width = '1000px';
      container.style.backgroundColor = '#ffffff';
      container.style.zIndex = '-1000';
      container.className = document.body.className;

      const clonedElement = originalElement.cloneNode(true) as HTMLElement;

      const classesToRemove = ['.docItemLastUpdatedUnderTitle'];
      classesToRemove.forEach((selector) => {
        clonedElement.querySelectorAll(selector).forEach((el) => el.remove());
      });

      // Replace the Root Selectors with the harvested strings
      harvestedRoots.forEach((html, id) => {
        const target = clonedElement.querySelector(`[data-pdf-id="${id}"]`);
        if (target) {
          const wrapper = document.createElement('div');
          wrapper.className = 'pdf-flattened-selector';
          wrapper.innerHTML = html;
          target.replaceWith(wrapper);
        }
      });

      const style = document.createElement('style');
      style.innerHTML = `
        pre, code, .theme-code-block, table, img, figure, .theme-admonition {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }
        h1, h2, h3, h4 {
          page-break-after: avoid !important;
          break-after: avoid !important;
        }
        .pdf-flattened-selector {
            display: block !important;
        }
      `;
      clonedElement.appendChild(style);

      // Flatten Details/Summary
      clonedElement.querySelectorAll('details').forEach((detail) => {
        detail.setAttribute('open', 'true');
        const summary = detail.querySelector('summary');
        if (summary && summary.nextElementSibling) {
          const content = summary.nextElementSibling as HTMLElement;
          content.style.display = 'block';
          content.style.height = 'auto';
          content.style.visibility = 'visible';
          content.style.opacity = '1';
        }
      });

      // Flatten Standard Tabs
      clonedElement.querySelectorAll('[role="tablist"]').forEach((tabList) => {
        const list = tabList as HTMLElement;
        const parent = list.parentElement;

        if (parent) {
          const tabItems = list.querySelectorAll('li');
          const panels = parent.querySelectorAll('[role="tabpanel"]');

          list.style.display = 'none';

          panels.forEach((panel, index) => {
            const el = panel as HTMLElement;
            el.removeAttribute('hidden');
            el.style.display = 'block';
            el.style.border = '1px dashed #eee';
            el.style.padding = '15px';
            el.style.margin = '15px 0';
            el.style.backgroundColor = '#fafafa';

            if (tabItems[index]) {
              const rawTitle = tabItems[index].textContent || `Tab ${index + 1}`;
              const titleHeader = document.createElement('h4');
              titleHeader.innerText = rawTitle;
              titleHeader.style.marginTop = '0';
              titleHeader.style.marginBottom = '10px';
              titleHeader.style.borderBottom = '1px solid #ddd';
              titleHeader.style.color = '#444';
              titleHeader.style.fontSize = '1.1em';
              el.prepend(titleHeader);
            }
          });
        }
      });

      // Fix Images & Media
      clonedElement.querySelectorAll('img').forEach((img) => {
        img.loading = 'eager';
        if (img.dataset.src) img.src = img.dataset.src;
        img.style.backgroundColor = 'white';
      });

      clonedElement.querySelectorAll('iframe, video').forEach((media) => {
        let src = (media as HTMLIFrameElement).src || (media as HTMLVideoElement).currentSrc || '';
        src = src.replace(/\s+/g, '');
        let displayUrl = src;
        const ytMatch = src.match(
          /(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/|youtube-nocookie\.com\/embed\/)([^?&]+)/,
        );
        if (ytMatch && ytMatch[1]) displayUrl = `https://www.youtube.com/watch?v=${ytMatch[1]}`;

        const link = document.createElement('div');
        link.innerHTML = `<div style="padding: 10px; border: 1px dashed #ccc; background: #f9f9f9; text-align: center; margin: 10px 0;"><a href="${displayUrl}" target="_blank">${displayUrl}</a></div>`;
        media.replaceWith(link);
      });

      container.appendChild(clonedElement);
      document.body.appendChild(container);

      // Wait for layout to settle
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const html2pdfModule = await import('html2pdf.js');
      const html2pdf = (html2pdfModule.default || html2pdfModule) as any;

      const opt: Html2PdfOptions = {
        margin: [0.5, 0.5],
        filename: `${document.title || 'document'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          scrollY: 0,
          windowWidth: 1024,
        },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        pagebreak: {
          mode: ['css', 'legacy'],
          avoid: [
            'table',
            'img',
            'h1',
            'h2',
            'h3',
            'h4',
            'span',
            'p',
            '.theme-admonition',
            'li',
            '.pdf-flattened-selector',
            '.pdf-flattened-nested-wrapper',
          ],
        },
      };

      await html2pdf().set(opt).from(clonedElement).save();

      document.body.removeChild(container);
    } catch (err) {
      console.error('PDF Generation failed:', err);
    } finally {
      document.body.removeChild(overlay);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.body.style.cursor = isLoading ? 'wait' : 'default';
    return () => {
      document.body.style.cursor = 'default';
    };
  }, [isLoading]);

  return (
    <button
      onClick={handleDownload}
      disabled={isLoading}
      style={{
        backgroundColor: 'transparent',
        padding: '8px 12px',
        cursor: 'pointer',
      }}
    >
      <span
        className="tool"
        hover-tooltip="Download this page as PDF"
        tooltip-position="top"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          cursor: 'pointer',
        }}
      >
        <>Download as PDF</>
        <i className="fa-solid fa-download"></i>
      </span>
    </button>
  );
};

export default DownloadAsPdf;
