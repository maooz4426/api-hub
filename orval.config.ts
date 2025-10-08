module.exports = {
	apihub: {
		input: {
			target: "doc/tsp/tsp-output/schema/openapi.yaml",
		},
		output: {
			mode: "split",
			client: "hono",
			target: "src/infra/lib/api-hub.ts",
			override: {
				hono: {
					handlers: "src/handlers",
				},
			},
		},
	},
};
