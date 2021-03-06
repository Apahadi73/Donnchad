// custom error handler
const errorHandler = (err, req, res, next) => {
  // console.log("error reached");
  // console.log(err);
  // handles the response's status code
  const statusCode = err.statusCode ? err.statusCode : 500;
  res.status(statusCode);
  // sends back error message and if in dev mode, sends back the error stack
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "Dev" ? null : err.stack,
  });
};

export { errorHandler };
