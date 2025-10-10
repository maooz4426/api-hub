import { Hono } from "hono";
import routes from "./infra/lib/routes";

const app = new Hono();

app.route("/", routes);

export default app;
