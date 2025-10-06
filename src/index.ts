import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";
import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";

const app = new OpenAPIHono();

// app.get("/music", async (c) => {
// 	const userName = c.req.query("userName");
// 	const res = await fetch(
// 		`http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${userName}&api_key=${process.env.API_KEY}&format=json&limit=1`,
// 	);
// 	const data = await res.json();
// 	return c.json(data);
// });

const route = createRoute({
	method: "get",
	path: "/music/{userName}",
	request: {
		params: z.object({
			userName: z.string(),
		}),
	},
	responses: {
		200: {
			content: {
				"application/json": {
					schema: z.any(), // またはより詳細な型定義
				},
			},
			description: "最近聞いた曲の情報を取得",
		},
	},
});

app.openapi(route, async (c) => {
	const { userName } = c.req.valid("param");
	const res = await fetch(
		`http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${userName}&api_key=${process.env.API_KEY}&format=json&limit=1`,
	);
	const data = await res.json();
	return c.json(data, 200);
});

app.doc("/doc", {
	openapi: "3.0.0",
	info: {
		version: "1.0.0",
		title: "api-hub",
	},
});

app.get("/ui", swaggerUI({ url: "/doc" }));
export default app;
