const uploadRouter = require("express").Router();
const cloudinary = require("cloudinary");
require("dotenv").config();
const fs = require("fs"); //có sẵn trong nodejs
const auth = require("../middleware/auth.middleware");
const authAdmin = require("../middleware/authAdmin.middleware");

// we will upload image on cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Upload image only admin can use
uploadRouter.post("/upload", auth, authAdmin, (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ msg: "No files were uploaded." });
    }

    const file = req.files.file;
    if (file.size > 1024 * 1024) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: "Size too large" });
    }

    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: "File format is incorrect." });
    }

    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: "ecommerce" },
      async (err, result) => {
        if (err) {
          throw err;
        }
        removeTmp(file.tempFilePath);
        return res
          .status(200)
          .json({ public_id: result.public_id, url: result.secure_url });
      }
    );
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// Delete image only admin can use
uploadRouter.post("/destroy", auth, authAdmin, (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) {
      return res.status(400).json({ msg: "No images Selected" });
    }

    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) {
        throw err;
      }

      return res.status(200).json({ msg: "Deleted Image" });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

//sau khi upload ảnh sẽ có 1 file tmp lưu lại các ảnh, hàm dưới để loại bỏ ảnh khỏi file tmp sau mỗi lần upload
//(xóa bỏ ảnh lưu trên server vì đã lưu trên cloudinary rồi)
const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) {
      throw err;
    }
  });
};

module.exports = uploadRouter;
