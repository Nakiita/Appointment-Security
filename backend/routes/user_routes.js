// import
const router = require("express").Router();
const user_controller = require("../controllers/user_controller");
const { authGuard } = require("../middleware/authGuard");
const logApiRequests = require("../middleware/loggerMiddleware");


router.use(logApiRequests);

// create user api
router.post("/register", user_controller.createUser);

router.post("/login", user_controller.loginUser);

router.post("/forgot/password", user_controller.forgotPassword);

router.post("/password/reset/:token", user_controller.resetPassword);

router.get("/getUsers", user_controller.getUsers);

router.get("/getUser/:id", user_controller.getSingleUser);

router.delete("/deleteUser/:id", user_controller.deleteUser);

router.get("/getPagination", user_controller.getPagination);

router.put("/update_user/:id", user_controller.updateUser);

router.post('/logout', user_controller.logout);

router.get('/check-session', user_controller.checkSession);

router.post('/verify-otp', user_controller.verifyOTP);

router.post('/send-otp',  user_controller.sendOTP); 

module.exports = router;
