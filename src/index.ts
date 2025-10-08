import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";
import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { musicGetRecentTrackHandlers } from "./handlers/musicGetRecentTrack";

const app = new Hono();

app.get();
