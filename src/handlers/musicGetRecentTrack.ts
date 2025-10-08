import { createFactory } from "hono/factory";
import { zValidator } from "../infra/lib/api-hub.validator";
import { MusicGetRecentTrackContext } from "../infra/lib/api-hub.context";
import {
	musicGetRecentTrackParams,
	musicGetRecentTrackResponse,
} from "../infra/lib/api-hub.zod";
import {
	fetchRecentTrack,
	transformLastfmTrack,
} from "../infra/externals/lastfm";

const factory = createFactory();

export const musicGetRecentTrackHandlers = factory.createHandlers(
	zValidator("param", musicGetRecentTrackParams),
	zValidator("response", musicGetRecentTrackResponse),
	async (c: MusicGetRecentTrackContext) => {
		const { userID } = c.req.valid("param");
		const lastfmData = await fetchRecentTrack(userID, c.env.API_KEY);
		const transformed = transformLastfmTrack(lastfmData);
		const validated = musicGetRecentTrackResponse.parse(transformed);
		return c.json(validated, 200);
	},
);
