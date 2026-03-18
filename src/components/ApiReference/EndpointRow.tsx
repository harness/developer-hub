import React, { useState, useMemo, useEffect, useRef } from 'react';
import type { EndpointEntry, OpenApiSpec } from './types';
import { endpointId, endpointSlug, responseHasJsonBody, getSampleResponseForStatus } from './utils';
import ApiSpecContent from './ApiSpecContent';
import TryItPanel from './TryItPanel';
import styles from './styles.module.css';

interface EndpointRowProps {
  entry: EndpointEntry;
  spec: OpenApiSpec;
  specBaseUrl: string;
  pathPrefix?: string;
}

/** Status codes that have a response body (for pills and sample). */
function getResponseCodesWithBody(
  spec: OpenApiSpec,
  operation: { responses?: Record<string, { $ref?: string; content?: Record<string, unknown> }> } | undefined
): string[] {
  if (!spec || !operation?.responses) return [];
  return Object.entries(operation.responses)
    .filter(([, res]) => responseHasJsonBody(spec, res as { $ref?: string; content?: Record<string, unknown> }))
    .map(([code]) => code);
}

function EndpointRowInner({ entry, spec, specBaseUrl, pathPrefix = '' }: EndpointRowProps): React.ReactElement {
  const operation = (entry as EndpointEntry).operation ?? (entry as EndpointEntry).pathItem?.[(entry as EndpointEntry).method];

  const responseCodes = useMemo(
    () => getResponseCodesWithBody(spec, operation),
    [spec, operation?.responses]
  );

  const defaultSelectedCode = useMemo(() => {
    const success = responseCodes.find((code) => {
      const n = parseInt(code, 10);
      return n >= 200 && n < 300;
    });
    return success ?? responseCodes[0] ?? null;
  }, [responseCodes]);

  const [selectedResponseCode, setSelectedResponseCode] = useState<string | null>(defaultSelectedCode);
  const sampleCacheRef = useRef<Record<string, string>>({});

  useEffect(() => {
    setSelectedResponseCode(defaultSelectedCode);
  }, [defaultSelectedCode]);

  const getSampleForCode = (code: string): string => {
    if (sampleCacheRef.current[code] !== undefined) return sampleCacheRef.current[code];
    const res = operation?.responses?.[code];
    const sample = res
      ? getSampleResponseForStatus(spec, res as { $ref?: string; content?: Record<string, unknown> })
      : '';
    sampleCacheRef.current[code] = sample;
    return sample;
  };

  const selectedSample = useMemo(
    () => (selectedResponseCode ? getSampleForCode(selectedResponseCode) : ''),
    [selectedResponseCode, spec, operation?.responses]
  );

  const responseCodesWithBody = useMemo(
    () =>
      responseCodes.map((code) => ({
        code,
        sample: code === selectedResponseCode ? selectedSample : sampleCacheRef.current[code] ?? '',
      })),
    [responseCodes, selectedResponseCode, selectedSample]
  );

  return (
    <div
      key={endpointId(entry)}
      data-endpoint-slug={endpointSlug(entry)}
      className={styles.endpointRow}
    >
      <div
        className={styles.sectionAnchor}
        data-section-id={endpointSlug(entry)}
        aria-hidden="true"
      />
      <div className={styles.endpointRowGrid}>
        <div className={styles.endpointRowBodyAbove}>
          <ApiSpecContent
            endpoint={entry}
            baseUrl={specBaseUrl}
            pathPrefix={pathPrefix}
            spec={spec}
            selectedResponseCode={selectedResponseCode}
            part="above"
          />
        </div>
        <div className={styles.endpointRowBodyResponses}>
          <ApiSpecContent
            endpoint={entry}
            baseUrl={specBaseUrl}
            pathPrefix={pathPrefix}
            spec={spec}
            selectedResponseCode={selectedResponseCode}
            part="responses"
          />
        </div>
        <div className={styles.endpointRowTryItAbove}>
          <TryItPanel
            endpoint={entry}
            spec={spec}
            specBaseUrl={specBaseUrl}
            pathPrefix={pathPrefix}
            selectedResponseCode={selectedResponseCode}
            onSelectResponseCode={setSelectedResponseCode}
            responseCodesWithBody={responseCodesWithBody}
            part="above"
          />
        </div>
        <div className={styles.endpointRowTryItResponse}>
          <TryItPanel
            endpoint={entry}
            spec={spec}
            specBaseUrl={specBaseUrl}
            pathPrefix={pathPrefix}
            selectedResponseCode={selectedResponseCode}
            onSelectResponseCode={setSelectedResponseCode}
            responseCodesWithBody={responseCodesWithBody}
            part="response"
          />
        </div>
      </div>
    </div>
  );
}

const EndpointRow = React.memo(EndpointRowInner);
export default EndpointRow;
