import React from "react";
import AnnouncementBar from "@theme-original/AnnouncementBar";
import { useHistory } from "react-router-dom";
import { useThemeConfig } from "@docusaurus/theme-common";

export default function AnnouncementBarWrapper(props) {
  const {
    location: { pathname },
  } = useHistory();
  const {
    // announcementBar,
    announcementBarByPath: { pathRegExp = [".*"] } = {},
  } = useThemeConfig();
  if (!Array.isArray(pathRegExp)) {
    console.error("pathRegExp in ThemeConfig should be an array!");
    return null;
  }
  const regExpPath = new RegExp(pathRegExp.join("|"));
  const showAnnouncementBar = regExpPath.test(pathname);

  return showAnnouncementBar ? <AnnouncementBar {...props} /> : null;
}
