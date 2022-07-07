const paymentRouter = require("express").Router();
const paymentController = require("../controllers/payment.controller");
const auth = require("../middleware/auth.middleware");
const authAdmin = require("../middleware/authAdmin.middleware");

paymentRouter.get("/", auth, authAdmin, paymentController.getPayments);
paymentRouter.post("/", auth, paymentController.createPayment);

module.exports = paymentRouter;
