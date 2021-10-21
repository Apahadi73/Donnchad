import Container from "./Container.js";
import AppProvider from "./providers/AppProvider.js";
import DatabaseProvider from "./providers/DatabaseProvider.js";
import EventProvider from "./providers/EventProvider.js";
import UserProvider from "./providers/UserProvider.js";

export default function () {
  let container = new Container();
  DatabaseProvider(container);
  AppProvider(container);
  UserProvider(container);
  EventProvider(container);
  // new UserP

  // require("./providers/DatabaseProvider")(container);
  // require("./providers/AppProvider")(container);
  // require("./providers/UserProvider")(container);
  // require("./providers/loggerProvider")(container);
  // require("./providers/todoProvider")(container);

  return container;
}
