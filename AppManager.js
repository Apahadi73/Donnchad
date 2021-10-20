export default function () {
  let container = new Container();

  require("./providers/DatabaseProvider")(container);
  require("./providers/AppProvider")(container);
  require("./providers/UserProvider")(container);
  // require("./providers/loggerProvider")(container);
  // require("./providers/todoProvider")(container);

  return container;
}
