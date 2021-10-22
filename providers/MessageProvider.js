import MessageRepo from "../database/MessageRepo.js";
import ChatRoute from "../routes/chatRoutes.js";

export default function (container) {
	container.service(
		"MessageRepo",
		(container) => new MessageRepo(container.Database)
	);
	container.service(
		"MessageRoute",
		(container) => new ChatRoute(container.MessageRepo)
	);
}
