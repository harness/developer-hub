import React from 'react';
import { useLocation } from '@docusaurus/router';

const HARNESS_SIGNIN =
  'https://app.harness.io/auth/#/signin/?utm_source=website&utm_medium=harness-developer-hub&utm_campaign=plt-plg&utm_content=sign-in';
const HARNESS_SIGNUP =
  'https://app.harness.io/auth/#/signup/&?utm_source=website&utm_medium=harness-developer-hub&utm_campaign=plt-plg&utm_content=get-started';

const UNIVERSITY_SIGNIN = 'https://university-registration.harness.io/auth/login';
const UNIVERSITY_SIGNUP =
  'https://accounts.skilljar.com/accounts/signup/?next=%2Fauth%2Fendpoint%2Flogin%2Fresult%3Fnext%3D%252F%26d%3D8vgjo83fevie&t=2pz50msy8u869&d=8vgjo83fevie';

function AuthButtons(): React.ReactElement {
  const { pathname } = useLocation();
  const isUniversity = pathname.includes('/university');

  const signInHref = isUniversity ? UNIVERSITY_SIGNIN : HARNESS_SIGNIN;
  const signUpHref = isUniversity ? UNIVERSITY_SIGNUP : HARNESS_SIGNUP;
  const signInTooltip = isUniversity
    ? 'Sign into Harness University (SkillJar)'
    : 'Sign into the Harness Platform (app.harness.io)';
  const signUpTooltip = isUniversity
    ? 'Sign up for Harness University (SkillJar)'
    : 'Sign up for the Harness Platform (app.harness.io)';

  return (
    <>
      <span
        className="tool navbar__item"
        {...{ 'hover-tooltip': signInTooltip, 'tooltip-position': 'bottom' }}
      >
        <a
          href={signInHref}
          className="button button--nav"
          title={signInTooltip}
          aria-label={signInTooltip}
        >
          Sign in
        </a>
      </span>
      <span
        className="tool navbar__item"
        {...{ 'hover-tooltip': signUpTooltip, 'tooltip-position': 'bottom' }}
      >
        <a
          href={signUpHref}
          className="button button--cta"
          title={signUpTooltip}
          aria-label={signUpTooltip}
        >
          Sign up
        </a>
      </span>
    </>
  );
}

export default AuthButtons;
