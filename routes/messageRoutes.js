import express from "express";
import { allMessages, sendMessage } from "../Controllers/messageControllers.js";
import auth from "../Middleware/auth.js";

const router = express.Router();

router.route("/:chatId").get(auth, allMessages);
router.route("/").post(auth, sendMessage);

export default router;
