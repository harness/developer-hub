import React from "react";
import Tooltip from "rc-tooltip";
export const SignInButton: React.FC = (): JSX.Element => {
  return (
    <Tooltip placement="top" overlay="Sign into the Harness Platform">
      <a href="https://app.harness.io/auth/#/signin/?utm_source=website&utm_medium=harness-developer-hub&utm_campaign=plt-plg&utm_content=sign-in">
        <button className="button button--nav">Sign in</button>
      </a>
    </Tooltip>
  );
};
export const SignUpButton: React.FC = (): JSX.Element => {
  return (
    <Tooltip placement="top" overlay="Sign up for the Harness Platform">
      <a href="https://app.harness.io/auth/#/signup/&?utm_source=website&utm_medium=harness-developer-hub&utm_campaign=plt-plg&utm_content=get-started">
        <button className="button button--cta">Sign up</button>
      </a>
    </Tooltip>
  );
};
