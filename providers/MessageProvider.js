import MessageRepo from "../database/MessageRepo";
import ChatRoute from "../routes/chatRoutes";

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
