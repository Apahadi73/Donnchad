import ExpressApplication from "../Container/ExpressApplication.js";

export default function (container) {
  // creates and return a new express application object
  container.service("App", () =>
    new ExpressApplication(container).createExpressApp()
  );
}
