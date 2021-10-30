import express from "express";
import path from "path";
import dotenv from "dotenv";
import morgan from "morgan";
import { errorHandler } from "../middlewares/errorMiddleware.js";

class ExpressApplication {
	constructor(container) {
		// creates a server application
		this.app = express();

		this.container = container;
	}

	// creates and returns a new express application
	createExpressApp() {
		// injects environment variables into our application
		dotenv.config();

		this.app.set("views", "views");
		this.app.set("view engine", "ejs");

		// json body parser middleware
		this.app.use(express.json());

		this.app.use(express.static("public"));
		// this.app.use(express.static("public_dummy"));

		// we use morgan to log all the incoming request
		this.app.use(morgan("dev"));

		// all routes
		this.app.use("/api/users", this.container.UserRoute);
		this.app.use("/api/events", this.container.EventRoute);

		// this.app.get("/", async (req, res) => {
		// 	const _dirname = process.cwd();
		// 	// res.status(200).send("Welcome to the Yapey.");
		// 	res.sendFile(path.join(_dirname + "/public_dummy/index.html"));
		// });

		this.app.get("/api/users/forgot-password/:token", async (req, res) => {
			res.render("forgot_password");
		});

		// middlewares
		this.app.use(errorHandler);

		return this.app;
	}
}

export default ExpressApplication;
