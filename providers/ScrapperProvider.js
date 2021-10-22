import EventScrapper from "../scripts/EventScrapper.js";

export default function (container) {
	container.service("EventScrapper", (container) =>
		new EventScrapper(container.EventRepo).fetchEvents()
	);
}
