import { type MusicSVG, toSVG } from "../domain/svg";
import {
	fetchRecentTrack,
	transformLastfmTrack,
} from "../infra/externals/lastfm";

export type GenerateSVGInput = {
	userID: string;
	apiKey: string;
};

export const generateSVG = async (input: GenerateSVGInput) => {
	const fetchData = await fetchRecentTrack(input.userID, input.apiKey);

	const musicInfo = transformLastfmTrack(fetchData);

	const toSVGInfo: MusicSVG = {
		name: musicInfo.name,
		artist: musicInfo.artist.text,
		album: musicInfo.album.text,
		artworkURL: musicInfo.image.extraLarge,
		nowPlaying: musicInfo.nowplaying,
	};
	return toSVG(toSVGInfo);
};
