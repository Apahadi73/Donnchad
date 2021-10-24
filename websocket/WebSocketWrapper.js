import { WebSocketServer } from "ws";
import queryString from "query-string";
import chalk from "chalk";

/*
Just inside that function, we create our websocket server using the Websocket.
Server constructor from the ws package that we installed above. 
To that constructor, we pass the noServer option as true to say "do not set up an HTTP server alongside this websocket server." 
The advantage to doing this is that we can share a single HTTP server (i.e., our Express server) across multiple websocket connections.
We also pass a path option to specify the path on our HTTP server where our websocket server will be accessible
 */
export default async (expressServer, messageRepo) => {
	// sockets
	let sockets = [];
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
				chalk.magenta.bold(
					"------------------------Web Socket Connection established---------------------"
				)
			);

			const { eid } = connectionParams;
			console.log({ eid });
			sockets.push(websocketConnection);

			websocketConnection.on("message", async (message) => {
				const parsedMessage = JSON.parse(message);
				const { eid, senderid, text } = parsedMessage;
				if (eid && senderid && text) {
					const newMessage = await messageRepo.addMessage(
						eid,
						senderid,
						text
					);
					if (newMessage) {
						websocketServer.emit(
							"newMessageAdded",
							JSON.stringify(newMessage)
						);
					}
				} else {
					websocketConnection.send(
						"Sorry could not add message to the event chat."
					);
				}
			});
		}
	);
	websocketServer.on("newMessageAdded", function newMessageAdded(message) {
		console.log(message);
		for (let socketConn of sockets) {
			socketConn.send(JSON.stringify(message));
		}
	});

	return websocketServer;
};

// websocket link
// ws://localhost:5002/websockets?eid=1
// wss://donnchad-server.herokuapp.com/websockets

// payload
// {"eid":"1","senderid":"1","message":"Hello there"}
