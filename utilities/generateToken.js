import jwt from "jsonwebtoken";

// generate authorization token
// takes email as its payload
// Token expiration time: 6 day
const generateToken = (uid, email, expirationTime) => {
	return jwt.sign({ uid, email }, process.env.JWT_SECRET, {
		expiresIn: expirationTime ? expirationTime : "1d",
	});
};

export default generateToken;
