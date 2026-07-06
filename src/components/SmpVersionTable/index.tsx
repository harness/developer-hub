import React from 'react';

interface Service {
  name: string;
  version: string;
  link?: string;
  releasesLinks?: { text: string; href: string }[];
}

interface ModuleGroup {
  module: string;
  services: Service[];
}

interface Props {
  version: string;
}

export default function SmpVersionTable({ version }: Props) {
  let data: ModuleGroup[];
  try {
    data = require(`./versions/${version}.json`);
  } catch {
    return <p>Version data not found for <code>{version}</code>.</p>;
  }

  const hasReleases = data.some((group) =>
    group.services.some((s) => s.releases || s.releasesLinks)
  );

  return (
    <table>
      <thead>
        <tr>
          <th style={{ textAlign: 'center' }}>Module</th>
          <th style={{ textAlign: 'center' }}>Services</th>
          <th style={{ textAlign: 'center' }}>Version</th>
          {hasReleases && <th style={{ textAlign: 'center' }}>Releases</th>}
        </tr>
      </thead>
      <tbody>
        {data.flatMap((group) =>
          group.services.map((service, idx) => (
            <tr key={`${group.module}-${service.name}`}>
              {idx === 0 && (
                <td style={{ textAlign: 'center' }} rowSpan={group.services.length}>
                  {group.module}
                </td>
              )}
              <td style={{ textAlign: 'center' }}>{service.name}</td>
              <td style={{ textAlign: 'center' }}>
                {service.link ? (
                  <a href={service.link}>{service.version}</a>
                ) : (
                  service.version
                )}
              </td>
              {hasReleases && (
                <td style={{ textAlign: 'center' }}>
                  {service.releasesLinks
                    ? service.releasesLinks.map((rl, i) => (
                        <span key={rl.href}>
                          {i > 0 && ', '}
                          <a href={rl.href}>{rl.text}</a>
                        </span>
                      ))
                    : service.releases || '-'}
                </td>
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
