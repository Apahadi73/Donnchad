import jwt from "jsonwebtoken";

// generate authorization token
// takes email as its payload
// Token expiration time: 1 day
const generateToken = (uid) => {
  const token = jwt.sign({ uid }, process.env.JWT_KEY, {
    expiresIn: "1d",
  });
  return token;
};

export default generateToken;
