import React from 'react';

export const proxySDKs = [
  {
    name: 'Android SDK',
    img: '/provider-logos/android-logo.svg',
    link: '/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/android-sdk#integrate-with-the-harness-proxy',
  },
  {
    name: 'Browser SDK',
    img: '/provider-logos/browser-logo.svg',
    link: '/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/browser-sdk#integrate-with-the-harness-proxy',
  },
  {
    name: 'Java SDK',
    img: '/provider-logos/java-logo.png',
    link: '/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/java-sdk#integrate-with-the-harness-proxy',
  },
  {
    name: 'Node.js SDK',
    img: '/provider-logos/nodejs-logo.png',
    link: '/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/nodejs-sdk#integrate-with-the-harness-proxy',
  },
];

// Helper to chunk items into rows of 4
function chunkArray(array, size) {
  return array.reduce((acc, _, i) =>
    (i % size ? acc : [...acc, array.slice(i, i + size)]), []);
}

// Component to render SDK grid
export function Section({ title, items }) {
  const rows = chunkArray(items, 4);
  return (
    <>
      <h3>{title}</h3>
      {rows.map((row, idx) => (
        <div key={idx} className="row margin-bottom--lg">
          {row.map(({ name, img, link }) => (
            <div key={name} className="col col--3" style={{ display: 'flex' }}>
              <a className="card h-100" href={link} style={{ flexGrow: 1 }}>
                <div
                  className="card__body d-flex flex-column align-items-center justify-content-center text--center py-4"
                  style={{
                    width: '100%',
                    height: '100%',
                    minHeight: '100px',
                    boxSizing: 'border-box',
                  }}
                >
                  <img
                    src={img}
                    alt={name}
                    style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                  />
                  <h4 style={{ marginTop: '1rem', marginBottom: 0 }}>{name}</h4>
                </div>
              </a>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export default function ProxySDKsGrid() {
  return (
    <div className="container padding--md">
      <Section title="Supported FME SDKs" items={proxySDKs} />
    </div>
  );
}
