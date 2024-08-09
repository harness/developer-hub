import React from "react";

const DocVideo = ({
  src = "",
  width = "100%",
  height = 600,
  title = "Video Player",
}) => {
  let videoSrc = src;
  //www.youtube.com/watch?v=apSyBZCz5QA
  //youtu.be/apSyBZCz5QA
  //youtube.com/embed/apSyBZCz5QAc
  //youtube-nocookie.com/embed/apSyBZCz5QAc
  const isYoutubeVideo = src.includes("youtube");
  const isYoutubeShortenedURL = src.includes("youtu.be");
  const isWistiaVideo = /https?:\/\/(.+)?(wistia\.com|wi\.st)\/.*/.test(src);
  const isLoomVideo = /https?:\/\/(.+)?(loom\.com)\/.*/.test(src);
  if (isYoutubeShortenedURL) {
    //Strip out WWW incase WWW duplicate by user
    videoSrc = (src || "").replace("www.", "");
    //Strip out NOCOOKIE incasse NOCOOKIE duplicate by user 
    videoSrc = (videoSrc || "").replace("-nocookie.", "");
    //Final URL
    videoSrc = (videoSrc || "").replace("youtu.be", "www.youtube-nocookie.com/embed");
    return (
      <iframe
        width={width}
        height={height}
        src={videoSrc}
        title={title}
        frameBorder="0"
        name="youtube_embed"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        data-ot-ignore
      ></iframe>
    );
  } else if (isYoutubeVideo) {
    //Strip out WWW incase WWW duplicate by user
    videoSrc = (src || "").replace("www.", "");
    //Strip out NOCOOKIE incasse NOCOOKIE duplicate by user 
    videoSrc = (videoSrc || "").replace("-nocookie.", "");
    //Switch to Embed
    videoSrc = (videoSrc || "").replace("/watch?v=", "/embed/");
    //Final URL
    videoSrc = (videoSrc || "").replace("youtube", "www.youtube-nocookie");
    return (
      <iframe
        data-ot-ignore
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
        data-ot-ignore
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
        data-ot-ignore
        src={`${videoSrc}?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true&dnt=1"`}
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
      data-ot-ignore
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
