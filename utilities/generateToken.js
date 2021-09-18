import jwt from 'jsonwebtoken'

// generate authorization token
// takes email as its payload
// Token expiration time: 1 day
const generateToken = (uid) => {
  return jwt.sign({ uid }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  })
}

export default generateToken