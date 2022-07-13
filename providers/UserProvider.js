import UserRepo from "../database/UserRepo.js";
import UserRepoMock from "../__test__/__mocks__/UserRepo.mock.js";
import UserRoute from "../routes/UserRoute.js";

export default function (container) {
	container.service("UserRepo", (container) => {
		const environment = process.env.NODE_ENV;
		if (environment == "test") {
			return new UserRepoMock();
		} else {
			return new UserRepo(container.Database);
		}
	});
	container.service("UserRoute", (container) =>
		new UserRoute(
			container.UserRepo,
			container.TokenRedisRepo
		).createUserRoute()
	);
}
