const productRouter = require("express").Router();
const productController = require("../controllers/product.controller");
const auth = require("../middleware/auth.middleware");
const authAdmin = require("../middleware/authAdmin.middleware");

productRouter.get("/", productController.getProducts);
productRouter.post("/", auth, authAdmin, productController.createProduct);
productRouter.delete("/:id", auth, authAdmin, productController.deleteProduct);
productRouter.put("/:id", auth, authAdmin, productController.updateProduct);

module.exports = productRouter;
