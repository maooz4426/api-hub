import { createFactory } from "hono/factory";
import { zValidator } from "../validator";
import { MusicGetRecentTrackContext } from "../endpoints/music/Music.context";
import {
	musicGetRecentTrackQueryParams,
	musicGetRecentTrackResponse,
} from "../endpoints/music/Music.zod";
import { transformLastfmTrack } from "../../externals/lastfm";
import { fetchRecentTrack } from "../../externals/lastfm";

const factory = createFactory();

export const musicGetRecentTrackHandlers = factory.createHandlers(
	zValidator("query", musicGetRecentTrackQueryParams),
	zValidator("response", musicGetRecentTrackResponse),
	async (c: MusicGetRecentTrackContext) => {
		const { userID } = c.req.valid("query");
		const lastfmData = await fetchRecentTrack(userID, c.env.API_KEY);
		const transformed = transformLastfmTrack(lastfmData);
		const validated = musicGetRecentTrackResponse.parse(transformed);
		return c.json(validated, 200);
	},
);
