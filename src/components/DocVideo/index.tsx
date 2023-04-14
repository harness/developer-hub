import React from "react";

const DocVideo = ({
  src = "",
  width = "100%",
  height = 600,
  title = "Video Player",
}) => {
  let videoSrc = src;
  const isYoutubeVideo = src.includes("youtube");
  const isWistiaVideo = /https?:\/\/(.+)?(wistia\.com|wi\.st)\/.*/.test(src);
  const isLoomVideo = /https?:\/\/(.+)?(loom\.com)\/.*/.test(src);
  if (isYoutubeVideo) {
    videoSrc = (src || "").replace("/watch?v=", "/embed/");
    return (
      // <iframe width="560" height="315" src={videoSrc} title={title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      <iframe
        width={width}
        height={height}
        src={videoSrc}
        title={title}
        frameBorder="0"
        name="youtube_embed"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    );
  } else if (isWistiaVideo) {
    videoSrc = (src || "").replace("/medias/", "/embed/iframe/");
    return (
      <iframe
        // src={`${videoSrc}?&autoplay=1`}
        src={`${videoSrc}`}
        allowTransparency={true}
        frameBorder="0"
        scrolling="no"
        className="wistia_embed"
        name="wistia_embed"
        allowFullScreen
        width={width}
        height={height}
        title={title}
      />
    );
  } else if (isLoomVideo) {
    // https://www.loom.com/share/002508e86fde4232bb8de474eb5c65c4
    // https://www.loom.com/embed/e5b8c04bca094dd8a5507925ab887002
    // ?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true
    videoSrc = (src || "").replace("/share/", "/embed/").replace(/\?.*$/, "");
    return (
      <iframe
        src={`${videoSrc}?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true`}
        allowTransparency={true}
        frameBorder="0"
        scrolling="no"
        name="loom_embed"
        allowFullScreen
        width={width}
        height={height}
        title={title}
      />
    );
  }
  return (
    <iframe
      width={width}
      height={height}
      src={videoSrc}
      title={title}
      frameBorder="0"
      scrolling="no"
      allowFullScreen
    ></iframe>
  );
};

export default DocVideo;
