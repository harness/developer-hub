import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

// harness-platform.svg | secret-mgmt.svg
export default function LearnAboutPlatform(): JSX.Element {
  return (
    <section className={styles.learnAboutPlatform}>
      <h2>Learn about the Harness Software Delivery Platform</h2>
      <div className={styles.platform}>
        <div className={styles.subSectionName}><h3>Modules</h3></div>
          <img src="/img/harness-platform.svg" className={styles.platformIllustration} />
      </div>

      <div className={styles.subSectionName}><h3>Platform</h3></div>
      <ul className={styles.platformList}>
        <li>
          <img src="/img/user-group-mgmt.svg" />
          <h4>User &amp; Role Management</h4>
          <p>0Auth/SAML/SSO Providers, Users Groups, RBAC</p>
        </li>
        <li>
          <img src="/img/secret-mgmt.svg" />
          <h4>Secrets Managment</h4>
          <p>Secret Managers, KMS, Cloud Storage</p>
        </li>
        <li>
          <img src="/img/delegates.svg" />
          <h4>Delegates</h4>
          <p>Install, Configure, Secure, Monitor, Upgrade</p>
        </li>
        <li>
          <img src="/img/Templates.svg" />
          <h4>Templates</h4>
          <p>Pipelines, Steps, Stages,Service, Infrastructure</p>
        </li>
      </ul>
    </section>
  );
}
