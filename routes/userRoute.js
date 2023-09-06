import express from "express";
import { loginUser,registerUser,currentUser } from "../controllers/users.js";

const router = express.Router();

router.post('/register',registerUser);
router.post('/login', loginUser);
router.get('/current', currentUser);

export default router;