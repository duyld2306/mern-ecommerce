const categoryRouter = require("express").Router();
const categoryController = require("../controllers/category.controller");
const auth = require("../middleware/auth.middleware");
const authAdmin = require("../middleware/authAdmin.middleware");

categoryRouter.get("/", categoryController.getCategories);

categoryRouter.post("/", auth, authAdmin, categoryController.createCategory);

categoryRouter.delete(
  "/:id",
  auth,
  authAdmin,
  categoryController.deleteCategory
);

categoryRouter.put("/:id", auth, authAdmin, categoryController.updateCategory);

module.exports = categoryRouter;
