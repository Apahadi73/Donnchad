import asyncHandler from 'express-async-handler'

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser  = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    const token = "token1"
    res.json({ email, token })
})