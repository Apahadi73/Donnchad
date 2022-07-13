import express from "express";
import {
	createEventController,
	deleteEventController,
	getChatsController,
	getEventByIdController,
	getEventsController,
	jointEventController,
	seeEventParticipantsController,
	updateEventController,
	uploadImageController,
} from "../controllers/eventControllers.js";

class EventRoute {
	constructor(eventRepo) {
		this.eventRepo = eventRepo;
		// creates express router
		this.router = express.Router();
	}

	createEventRoutes() {
		//-----------------------------------Events related routes----------------------------------------------
		this.router
			.route("/")
			.post(async (req, res, next) =>
				createEventController(req, res, next, this.eventRepo)
			);
		this.router
			.route("/")
			.get(async (req, res, next) =>
				getEventsController(req, res, next, this.eventRepo)
			);
		this.router
			.route("/:eid")
			.get(async (req, res, next) =>
				getEventByIdController(req, res, next, this.eventRepo)
			);
		this.router
			.route("/:eid")
			.put(async (req, res, next) =>
				updateEventController(req, res, next, this.eventRepo)
			);
		this.router
			.route("/:eid")
			.delete(async (req, res, next) =>
				deleteEventController(req, res, next, this.eventRepo)
			);

		//-----------------------------------Event Chat related routes-------------------------------------------

		this.router
			.route("/:eid/join")
			.post(async (req, res, next) =>
				jointEventController(req, res, next, this.eventRepo)
			);

		this.router
			.route("/:eid/image/dummy")
			.get(async (req, res, next) => res.render("upload_image"));

		this.router
			.route("/:eid/image")
			.post(async (req, res, next) =>
				uploadImageController(
					req,
					res,
					next,
					process.cwd(),
					this.eventRepo
				)
			);
		this.router
			.route("/:eid/participants")
			.get(async (req, res, next) =>
				seeEventParticipantsController(req, res, next, this.eventRepo)
			);

		this.router.route("/:eid/chats").get(async (req, res, next) => {
			const eid = req.params.eid;
			console.log(eid);
			console.log("reached here");
			getChatsController(req, res, next, this.eventRepo);
		});
		return this.router;
	}
}

export default EventRoute;
