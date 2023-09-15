import express from "express";
import { loginUser,registerUser,currentUser } from "../controllers/users.js";
import { validateToken } from "../middlewares/validateTokenHandler.js";

const router = express.Router();

router.post('/register',registerUser);
router.post('/login', loginUser);
router.get('/current', validateToken, currentUser);

export default router;