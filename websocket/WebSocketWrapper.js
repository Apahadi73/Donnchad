import { WebSocketServer } from "ws";
import queryString from "query-string";
import chalk from "chalk";

// sockets
let sockets = [];

/*
Just inside that function, we create our websocket server using the Websocket.
Server constructor from the ws package that we installed above. 
To that constructor, we pass the noServer option as true to say "do not set up an HTTP server alongside this websocket server." 
The advantage to doing this is that we can share a single HTTP server (i.e., our Express server) across multiple websocket connections.
We also pass a path option to specify the path on our HTTP server where our websocket server will be accessible
 */
export default async (expressServer) => {
	const websocketServer = new WebSocketServer({
		noServer: true,
		path: "/websockets",
	});

	expressServer.on("upgrade", (request, socket, head) => {
		websocketServer.handleUpgrade(request, socket, head, (websocket) => {
			websocketServer.emit("connection", websocket, request);
		});
	});

	/*
  To clarify, the difference between the websocketConnection and 
  the connectionRequest is that the former represents the open, long-running network connection between the browser and the server, 
  while the connectionRequest represents the original request to open that connection.
  */
	websocketServer.on(
		"connection",
		function connection(websocketConnection, connectionRequest) {
			const [_path, params] = connectionRequest?.url?.split("?");
			const connectionParams = queryString.parse(params);

			console.log(
				chalk.cyan.bold(
					"---------------------------------Web Socket Connection established------------------------------"
				)
			);

			const { eid } = connectionParams;

			websocketConnection.on("message", async (message) => {
				const parsedMessage = JSON.parse(message);
				console.log(parsedMessage);
				// const newMessage = await addMessageToEventService(
				// 	parsedMessage
				// );
				// if (newMessage) {
				// 	console.log(newMessage);
				// 	websocketConnection.send(JSON.stringify(newMessage));
				// }
				websocketConnection.send(JSON.stringify(parsedMessage));
			});
		}
	);

	return websocketServer;
};
