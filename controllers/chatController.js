import expressAsyncHandler from "express-async-handler";

// @desc    create chat for the event
// @route   POST /api/chats/
// @access  Public
export const createChatController = expressAsyncHandler(async (req, res) => {
    
    const responseData = await registerUserService({
    firstname,
    lastname,
    email,
    phoneNumber,
    password,
  });

  res.status(201).json(responseData);
});
