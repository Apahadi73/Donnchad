import dotenv from "dotenv";
import http from "http";
import nodeCron from "node-cron";
import AppManager from "./Container/AppManager.js";
import chalk from "chalk";
import WebSocketWrapper from "./websocket/WebSocketWrapper.js";

dotenv.config();

let appManager = AppManager();

let app = appManager.App;

const server = http.Server(app);

// sets port and listener
const PORT = process.env.PORT || 5001;

// only listen if not in test environment
server.listen(PORT, async () => {
	console.log(
		chalk.blue.bold(
			`------------------------Server is listening on port: ${process.env.PORT}!--------------------`
		)
	);

	if (process.env.NODE_ENV !== "test") {
		await appManager.Migrate;
		await appManager.Seed;
	}
});

// wraps our server application
WebSocketWrapper(server, appManager.MessageRepo);

export default app;
