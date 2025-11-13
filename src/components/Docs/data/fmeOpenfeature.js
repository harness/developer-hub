import React from 'react';

export const openfeatureSDKs = [
  {
    name: 'Android SDK',
    img: '/provider-logos/android-logo.svg',
    link: '/docs/feature-management-experimentation/sdks-and-infrastructure/openfeature/android-sdk',
  },
  {
    name: 'iOS SDK',
    img: '/provider-logos/ios-logo.svg',
    link: '/docs/feature-management-experimentation/sdks-and-infrastructure/openfeature/ios-sdk',
  },
  {
    name: 'Web SDK',
    img: '/provider-logos/browser-logo.svg',
    link: '/docs/feature-management-experimentation/sdks-and-infrastructure/openfeature/web-sdk',
  },
  {
    name: 'Angular',
    img: '/provider-logos/angular-logo.svg',
    link: '/docs/feature-management-experimentation/sdks-and-infrastructure/openfeature/angular-sdk',
  },
  {
    name: 'React',
    img: '/provider-logos/react-native-logo.svg',
    link: '/docs/feature-management-experimentation/sdks-and-infrastructure/openfeature/react-sdk',
  },
  {
    name: 'Java SDK',
    img: '/provider-logos/java-logo.png',
    link: '/docs/feature-management-experimentation/sdks-and-infrastructure/openfeature/java-sdk',
  },
  {
    name: 'Node.js SDK',
    img: '/provider-logos/nodejs-logo.png',
    link: '/docs/feature-management-experimentation/sdks-and-infrastructure/openfeature/nodejs-sdk',
  },
  {
    name: 'Python SDK',
    img: '/provider-logos/python-logo.svg',
    link: '/docs/feature-management-experimentation/sdks-and-infrastructure/openfeature/python-sdk',
  },
  {
    name: '.NET SDK',
    img: '/provider-logos/dotnet-logo.svg',
    link: '/docs/feature-management-experimentation/sdks-and-infrastructure/openfeature/net-sdk',
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

export default function openfeatureSDKsGrid() {
  return (
    <div className="container padding--md">
      <Section title="Supported OpenFeature SDKs" items={openfeatureSDKs} />
    </div>
  );
}
