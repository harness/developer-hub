import React from 'react';

const clientSideSDKs = [
  {
    name: 'Android',
    img: '/provider-logos/android-logo.svg',
    link: '/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/android-sdk',
  },
  {
    name: 'Angular Utilities',
    img: '/provider-logos/angular-logo.svg',
    link: '/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/angular-utilities',
  },
  {
    name: 'Browser',
    img: '/provider-logos/browser-logo.svg',
    link: '/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/browser-sdk',
  },
  {
    name: 'Flutter Plugin',
    img: '/provider-logos/flutter-logo.svg',
    link: '/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/flutter-plugin',
  },
  {
    name: 'iOS',
    img: '/provider-logos/ios-logo.svg',
    link: '/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/ios-sdk',
  },
  {
    name: 'JavaScript',
    img: '/provider-logos/js-logo.svg',
    link: '/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/javascript-sdk',
  },
  {
    name: 'React',
    img: '/provider-logos/react-native-logo.svg',
    link: '/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/react-sdk',
  },
  {
    name: 'React Native',
    img: '/provider-logos/react-native-logo.svg',
    link: '/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/react-native-sdk',
  },
  {
    name: 'Redux',
    img: '/provider-logos/redux-logo.svg',
    link: '/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/redux-sdk',
  },
];

const clientSideSuites = [
  {
    name: 'Android Suite',
    img: '/provider-logos/android-logo.svg',
    link: '/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-suites/android-suite',
  },
  {
    name: 'Browser Suite',
    img: '/provider-logos/browser-logo.svg',
    link: '/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-suites/browser-suite',
  },
  {
    name: 'iOS Suite',
    img: '/provider-logos/ios-logo.svg',
    link: '/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-suites/ios-suite',
  },
];

const clientSideAgents = [
  {
    name: 'Android Agents',
    img: '/provider-logos/android-logo.svg',
    link: '/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-agents/android-rum-agent',
  },
  {
    name: 'Browser Agents',
    img: '/provider-logos/browser-logo.svg',
    link: '/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-agents/browser-rum-agent',
  },
  {
    name: 'iOS Agents',
    img: '/provider-logos/ios-logo.svg',
    link: '/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-agents/ios-rum-agent',
  },
];

const serverSideSDKs = [
  {
    name: 'Elixir Thin Client SDK',
    img: '/provider-logos/elixir-logo.png',
    link: '/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/elixir-thin-client-sdk',
  },
  {
    name: 'Go SDK',
    img: '/provider-logos/go-logo.svg',
    link: '/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/go-sdk',
  },
  {
    name: 'Java SDK',
    img: '/provider-logos/java-logo.png',
    link: '/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/java-sdk',
  },
  {
    name: '.NET SDK',
    img: '/provider-logos/dotnet-logo.svg',
    link: '/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/net-sdk',
  },
  {
    name: 'NodeJS SDK',
    img: '/provider-logos/nodejs-logo.png',
    link: '/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/nodejs-sdk',
  },
  {
    name: 'PHP SDK',
    img: '/provider-logos/php-logo.svg',
    link: '/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/php-sdk',
  },
  {
    name: 'PHP Thin Client SDK',
    img: '/provider-logos/php-logo.svg',
    link: '/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/php-thin-client-sdk',
  },
  {
    name: 'Python SDK',
    img: '/provider-logos/python-logo.svg',
    link: '/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/python-sdk',
  },
  {
    name: 'Ruby SDK',
    img: '/provider-logos/ruby-logo.svg',
    link: '/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/ruby-sdk',
  },
];

const optionalInfra = [
  {
    name: 'Split Daemon (splitd)',
    img: '/provider-logos/split-logo.png',
    link: '/docs/feature-management-experimentation/sdks-and-infrastructure/optional-infra/split-daemon-splitd',
  },
  {
    name: 'Split Evaluator',
    img: '/provider-logos/split-logo.png',
    link: '/docs/feature-management-experimentation/sdks-and-infrastructure/optional-infra/split-evaluator',
  },
  {
    name: 'Split Proxy',
    img: '/provider-logos/split-logo.png',
    link: '/docs/feature-management-experimentation/sdks-and-infrastructure/optional-infra/split-proxy',
  },
  {
    name: 'Split Synchronizer',
    img: '/provider-logos/split-logo.png',
    link: '/docs/feature-management-experimentation/sdks-and-infrastructure/optional-infra/split-synchronizer',
  },
  {
    name: 'Split JavaScript Synchronizer Tools',
    img: '/provider-logos/java-logo.png',
    link: '/docs/feature-management-experimentation/sdks-and-infrastructure/optional-infra/split-javascript-synchronizer-tools',
  },
];

// Helper to chunk items into rows of 4
function chunkArray(array, size) {
  return array.reduce((acc, _, i) =>
    (i % size ? acc : [...acc, array.slice(i, i + size)]), []);
}

// Component to render each section with heading and cards
function Section({ title, items }) {
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

export default function SDKGrid() {
  return (
    <div className="container padding--md">
      <Section title="Client-side SDKs" items={clientSideSDKs} />
      <Section title="Client-side SDK Suites" items={clientSideSuites} />
      <Section title="Client-side RUM Agents" items={clientSideAgents} />
      <Section title="Server-side SDKs" items={serverSideSDKs} />
      <Section title="Optional Infrastructure" items={optionalInfra} />
    </div>
  );
}
