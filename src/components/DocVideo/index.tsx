import React from 'react'

const DocVideo = ({
	src = '',
	width = '100%',
	height = 630,
	title = 'Video Player'
}) => {
	let videoSrc = src
	const isYoutubeVideo = src.includes('youtube')
	if (isYoutubeVideo) {
		videoSrc = (src || '').replace('/watch?v=', '/embed/')
	}
	const isWistiaVideo = /https?:\/\/(.+)?(wistia\.com|wi\.st)\/.*/.test(src)
	if (isWistiaVideo) {
		videoSrc = (src || '').replace('/medias/', '/embed/iframe/')
	}
	return isYoutubeVideo ? (
		// <iframe
		// 	width={width}
		// 	height={height}
		// 	src={`${videoSrc}?&autoplay=1`}
		// 	title={title}
		// 	frameBorder="0"
		// 	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
		// 	allowFullScreen
		// />
		<iframe width="560" height="315" src={videoSrc} title={title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
	) : (
		<iframe
			src={`${videoSrc}?&autoplay=1`}
			allowTransparency={true}
			frameBorder="0"
			scrolling="no"
			className="wistia_embed"
			name="wistia_embed"
			allowFullScreen
			// mozAllowFullscreen
			// webkitallowfullscreen
			// oallowfullscreen
			// msallowfullscreen
			width={width}
			height={height}
			title={title}
		/>
	)
}

export default DocVideo
