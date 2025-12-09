import { Router } from "express";
import {getAllUsers , getUserById , createUserController, loginUser, updateUserController, deleteUserById} from "../controller/users.controller.js"
import { checkAdmin, verifyToken } from "../middlewares/authJWT.js";
// import { authHeaders, soloAdmin } from "../middlewares/auth.js";
// import { basicAuth, checkAdmin } from "../middlewares/authBasic.js";
const router = Router()

router.get('/',verifyToken,checkAdmin, getAllUsers); // verifyToken,checkAdmin
router.get('/:id',getUserById);

// router.post('/',authHeaders,soloAdmin ,createUserController);
router.post('/' ,createUserController);
router.post('/login',loginUser)

router.put('/:id', updateUserController);
router.delete('/:id',deleteUserById);


export default router