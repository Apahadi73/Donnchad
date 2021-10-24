import Container from "./Container.js";
import DatabaseProvider from "../providers/DatabaseProvider.js";
import AppProvider from "../providers/AppProvider.js";
import UserProvider from "../providers/UserProvider.js";
import EventProvider from "../providers/EventProvider.js";
import ScrapperProvider from "../providers/ScrapperProvider.js";
import MessageProvider from "../providers/MessageProvider.js";
import RedisProvider from "../providers/RedisProvider.js";

export default function () {
	let container = new Container();
	DatabaseProvider(container);
	AppProvider(container);
	UserProvider(container);
	EventProvider(container);
	ScrapperProvider(container);
	MessageProvider(container);
	RedisProvider(container);

	return container;
}
