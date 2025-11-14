import React from 'react';
import Admonition from '@theme/Admonition';
import './university-admonition.css';

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function UniversityAdmonition({ title, children }: Props) {
  return (
    <Admonition
      type="info"
      className="university-admonition"
      icon={
        <img
          src="/img/university-icon.svg"
          alt=""
          className="university-admonition__logo"
          aria-hidden="true"
        />
      }
      title={title}
    >
      {children}
    </Admonition>
  );
}