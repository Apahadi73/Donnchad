import Container from "./Container.js";
import AppProvider from "./providers/AppProvider.js";
import DatabaseProvider from "./providers/DatabaseProvider.js";
import EventProvider from "./providers/EventProvider.js";
import MessageProvider from "./providers/MessageProvider.js";
import UserProvider from "./providers/UserProvider.js";

export default function () {
	let container = new Container();
	DatabaseProvider(container);
	AppProvider(container);
	UserProvider(container);
	EventProvider(container);
	MessageProvider(container);
	return container;
}
