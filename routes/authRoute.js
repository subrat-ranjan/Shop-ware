import express from "express";
import { forgotPasswordController, getAllOrdersController, getOrdersController, loginController, orderStatusController, registerController, testController, updateProfileController } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router()

//routing

//registr || method - post 
router.post("/register", registerController)


//LOGIN|| POST METHOD
router.post("/login", loginController)


//Forgot password
router.post('/forgot-password', forgotPasswordController)

//test
router.get("/test", requireSignIn, isAdmin, testController)

// protected  user route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})

// protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
})

//update profile
router.put("/profile", requireSignIn, updateProfileController)

//order 
router.get("/orders", requireSignIn, getOrdersController)

//get all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController)

//order update statuss
router.put("/order-status/:orderId", requireSignIn, isAdmin, orderStatusController)

export default router;
