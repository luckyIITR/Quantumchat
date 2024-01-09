import asyncHandler from "express-async-handler";
import Message from "../Models/messageModel.js";
import User from "../Models/User.js";
import Chat from "../Models/chatModel.js";

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
  req.user = await User.findById(req.user.id).select("-password");
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
  req.user = await User.findById(req.user.id).select("-password");
  const { content, chatId } = req.body;
  // console.log(req.body);

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  async function createAndPopulateMessage(req, content, chatId) {
    try {
      const newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
      };
  
      const message = new Message(newMessage); // Create a new Message instance
      await message.save(); // Save the message to the database
  
      const populatedMessage = await message.populate("sender", "name picture").exec(); // Populate the sender
  
      console.log(populatedMessage); // Output the populated message

  // try {
  //   // var message = Message(newMessage);
  //   var p = 5;
  //   // message = await message.populate("sender", "name pic").execPopulate();
  //   // message = await message.populate("chat").execPopulate();
  //   // message = await User.populate(message, {
  //   //   path: "chat.users",
  //   //   select: "name pic email",
  //   // });

  //   // await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

  //   res.json(message);
  // } catch (error) {
  //   res.status(400);
  //   throw new Error(error.message);
  // }
  res.status(200).json({});
});

export { allMessages, sendMessage };
