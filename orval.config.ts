module.exports = {
	apihub: {
		input: {
			target: "doc/tsp/tsp-output/schema/openapi.yaml",
		},
		output: {
			mode: "tags-split",
			client: "hono",
			workspace: "src/infra/lib/",
			target: "endpoints",
			schemas: "dtos",
			indexFiles: false,
			override: {
				hono: {
					handlers: "src/infra/lib/handlers",
					compositeRoute: "src/infra/lib/routes.ts",
					validatorOutputPath: "src/infra/lib/validator.ts",
				},
			},
		},
	},
};
