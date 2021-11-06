import { Server } from "socket.io";
import formatMessage from "./utils/messages.js";
import {
	userJoin,
	getCurrentUser,
	userLeave,
	getRoomUsers,
} from "./utils/users.js";

export default async (server, messageRepo) => {
	const io = new Server(server, {
		cors: { origin: "*", methods: ["GET", "POST"] },
	});

	const botName = "Event Bot";
	//Run when client connects
	io.on("connection", (socket) => {
		console.log("hello-world");
		socket.on("joinRoom", ({ username, room }) => {
			const user = userJoin(socket.id, username, room);
			socket.join(user.room);

			// Welcome current user
			socket.emit(
				"message",
				formatMessage(botName, "Welcome to Chatcord")
			);

			// Broadcasts when user connects
			socket.broadcast
				.to(user.room)
				.emit(
					"message",
					formatMessage(
						botName,
						`${user.username} has joined the chat`
					)
				);

			// Send user and room info
			io.to(user.room).emit("roomUsers", {
				room: user.room,
				users: getRoomUsers(user.room),
			});
		});

		//Listen for chatMessage
		socket.on("chatMessage", (msg) => {
			const user = getCurrentUser(socket.id);
			io.to(user.room).emit("message", formatMessage(user.username, msg));
		});

		// Runs when client disconnects
		socket.on("disconnect", () => {
			const user = userLeave(socket.id);
			if (user) {
				io.to(user.room).emit(
					"message",
					formatMessage(botName, `${user.username} has left the chat`)
				);

				io.to(user.room).emit("roomUsers", {
					room: user.room,
					users: getRoomUsers(user.room),
				});
			}
		});
	});

	return io;
};
