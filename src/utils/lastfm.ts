/**
 * Last.fm API response transformation utilities
 */

export interface LastfmImage {
	size: string;
	"#text": string;
}

export interface LastfmArtist {
	mbid: string;
	"#text": string;
}

export interface LastfmAlbum {
	mbid: string;
	"#text": string;
}

export interface LastfmTrack {
	mbid: string;
	name: string;
	artist: LastfmArtist;
	album: LastfmAlbum;
	image: LastfmImage[];
	url: string;
	"@attr"?: {
		nowplaying: string;
	};
	date?: {
		uts: string;
		"#text": string;
	};
}

export interface LastfmRecentTracksResponse {
	recenttracks: {
		track: LastfmTrack[];
		"@attr": {
			user: string;
			totalPages: string;
			page: string;
			perPage: string;
			total: string;
		};
	};
}

/**
 * Transforms Last.fm API response to the OpenAPI schema format
 * @param lastfmResponse Raw response from Last.fm API
 * @returns Transformed track data matching the RecentTrack schema
 */
export function transformLastfmTrack(lastfmResponse: LastfmRecentTracksResponse) {
	const track = lastfmResponse.recenttracks.track[0];

	if (!track) {
		throw new Error("No track data found in Last.fm response");
	}

	return {
		mbid: track.mbid,
		name: track.name,
		artist: {
			mbid: track.artist.mbid,
			text: track.artist["#text"],
		},
		image: {
			smallImage: track.image.find((img) => img.size === "small")?.[
				"#text"
			] || "",
			mediumImage: track.image.find((img) => img.size === "medium")?.[
				"#text"
			] || "",
			largeImage: track.image.find((img) => img.size === "large")?.[
				"#text"
			] || "",
			extraLarge: track.image.find((img) => img.size === "extralarge")?.[
				"#text"
			] || "",
		},
		album: {
			mbid: track.album.mbid,
			text: track.album["#text"],
		},
	};
}
