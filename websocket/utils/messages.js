import moment from "moment";

function formatMessage(username, text) {
	return {
		username,
		text,
		time: moment().format("h:mm a"),
	};
}

export default formatMessage;
