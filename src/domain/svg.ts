export type MusicSVG = {
	name: string;
	artist: string;
	album: string;
	artworkURL: string;
};

export type MusicSVGOptions = {
	showArtwork?: boolean;
	width?: number;
	height?: number;
	colors?: {
		background?: string;
		nowPlaying?: string;
		lastPlayed?: string;
	};
};

export const toSVG = (
	data: MusicSVG,
	options: MusicSVGOptions = {},
): string => {
	const {
		showArtwork = !!data.artworkURL,
		width: customWidth,
		height: customHeight,
		colors = {},
	} = options;

	// デフォルト値
	const height = customHeight || 120;
	const width = customWidth || (showArtwork ? 450 : 400);
	const padding = 15;
	const artworkSize = 100;
	const artworkX = padding;
	const artworkY = padding - 5;
	const textStartX = showArtwork ? padding + artworkSize + 15 : padding;

	const bgColor = "#1db954";

	const backgroundColor = colors.background || "#1a1a1a";

	// SVG生成
	return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  
  <rect width="${width}" height="${height}" fill="${backgroundColor}" rx="8"/>
  

  <rect x="${artworkX}" y="${artworkY}" width="${artworkSize}" height="${artworkSize}" fill="#2a2a2a" rx="6"/>
  <image 
    href="${data.artworkURL}"
    x="${artworkX}" 
    y="${artworkY}" 
    width="${artworkSize}" 
    height="${artworkSize}"
    clip-path="url(#artwork-clip)"
    preserveAspectRatio="xMidYMid slice"
  />

  
  <rect x="${textStartX}" width="${width - textStartX}" height="25" fill="${bgColor}" rx="8"/>
  <rect x="${textStartX}" y="8" width="${width - textStartX}" height="20" fill="${bgColor}"/>
  

  <text x="${textStartX + 10}" y="18" 
        font-family="Arial, sans-serif" 
        font-size="12" 
        font-weight="bold"
        fill="#ffffff">
        🎵Now Playing

  </text>
  
  <text x="${textStartX + 10}" y="50" 
        font-family="Arial, sans-serif" 
        font-size="16" 
        font-weight="bold"
        fill="#ffffff">
    ${data.name}
  </text>
  
  <text x="${textStartX + 10}" y="72" 
        font-family="Arial, sans-serif" 
        font-size="13" 
        fill="#b3b3b3">
    ${data.artist}
  </text>
  
  <text x="${textStartX + 10}" y="92" 
        font-family="Arial, sans-serif" 
        font-size="11" 
        fill="#888888">
    ${data.album}
  </text>
  
  <text x="${width - padding}" y="${height - padding}" 
        font-family="Arial, sans-serif" 
        font-size="10" 
        fill="#666666"
        text-anchor="end">
  </text>
</svg>`;
};
