import { createFactory } from "hono/factory";
import { zValidator } from "../lib/api-hub.validator";
import { MusicGetRecentTrackContext } from "../lib/api-hub.context";
import {
	musicGetRecentTrackParams,
	musicGetRecentTrackResponse,
} from "../lib/api-hub.zod";
import { transformLastfmTrack, type LastfmRecentTracksResponse } from "../utils/lastfm";

const factory = createFactory();

export const musicGetRecentTrackHandlers = factory.createHandlers(
	zValidator("param", musicGetRecentTrackParams),
	zValidator("response", musicGetRecentTrackResponse),
	async (c: MusicGetRecentTrackContext) => {
		const { userID } = c.req.valid("param");
		const lastfmRes = await fetch(
			`http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${userID}&api_key=${c.env.API_KEY}&format=json&limit=1`,
		);
		const lastfmData = await lastfmRes.json() as LastfmRecentTracksResponse;
		const transformed = transformLastfmTrack(lastfmData);
		const validated = musicGetRecentTrackResponse.parse(transformed);
		return c.json(validated, 200);
	},
);
