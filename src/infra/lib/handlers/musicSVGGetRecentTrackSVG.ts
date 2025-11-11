import { createFactory } from "hono/factory";
import { zValidator } from "../validator";
import { MusicSVGGetRecentTrackSVGContext } from "../endpoints/music/Music.context";
import { musicSVGGetRecentTrackSVGQueryParams } from "../endpoints/music/Music.zod";
import { generateSVG, GenerateSVGInput } from "../../../usecase/generate_svg";

const factory = createFactory();

export const musicSVGGetRecentTrackSVGHandlers = factory.createHandlers(
	zValidator("query", musicSVGGetRecentTrackSVGQueryParams),
	async (c: MusicSVGGetRecentTrackSVGContext) => {
		const { userID } = c.req.valid("query");
		const input: GenerateSVGInput = {
			userID: userID,
			apiKey: c.env.API_KEY,
		};
		const svg = await generateSVG(input);
    c.header("Content-Type","image/svg+xml");
 c.header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0, s-maxage=0, proxy-revalidate");
c.header("Pragma", "no-cache");
c.header("Expires", "Thu, 01 Jan 1970 00:00:00 GMT");
c.header("Surrogate-Control", "no-store");
		// クエリパラメータでプレビューモード切替
		if (c.req.query("preview") === "true") {
			return c.html(`
      <!DOCTYPE html>
      <html>
        <body style="display:flex;justify-content:center;align-items:center;height:100vh;margin:0;background:#f5f5f5">
          ${svg}
        </body>
      </html>
    `);
		}

		return c.body(svg, 200);
	},
);
