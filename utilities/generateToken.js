import jwt from "jsonwebtoken";

// generate authorization token
// takes email as its payload
// Token expiration time: 1 day
const generateToken = (uid, email) => {
  console.log(uid);
  return jwt.sign({ uid, email }, process.env.JWT_SECRET, {
    expiresIn: "60d",
  });
};

export default generateToken;
