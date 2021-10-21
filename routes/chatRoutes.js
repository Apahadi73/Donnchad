class ChatRoute {
	constructor(messageRepo) {
		this.messageRepo = messageRepo;
		// creates express router
		this.router = express.Router();
	}

	createMessageRoutes() {
		this.router
			.route("/")
			.post(async (req, res, next) =>
				createChatController(req, res, next, this.messageRepo)
			);

		this.router
			.route("/:cid")
			.delete(async (req, res, next) =>
				deleteChatbyIDController(req, res, next, this.messageRepo)
			);
	}
}

export default ChatRoute;
