export default function (container) {
  container.service(
    "UserRepo",
    (container) => new UserRepo(container.Database)
  );
  //   container.service(
  //     "UserRoute",
  //     (container) => new UserRoute(container.UserRepo)
  //   );
}
