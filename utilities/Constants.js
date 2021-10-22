export const Constants = {
	salt: 10,
	saltRounds: 10, // data processing time
	defaultStatus: 404,
};

export const Result = {
	SUCCESS: true,
	FAILED: false,
};

export const appDomain = {
	get url() {
		if (process.env.NODE_ENV == "production") {
			return "https://donnchad-server.herokuapp.com/";
		} else {
			return `localhost:${process.env.PORT}`;
		}
	},
};

export const tokenExpirationTime = {
	SIXTY_DAYS: "60d",
	ONE_WEEK: "7d",
	ONE_HOUR: "1h",
};
