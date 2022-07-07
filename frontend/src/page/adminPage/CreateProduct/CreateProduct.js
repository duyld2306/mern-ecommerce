import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { GlobalState } from "../../../components/GlobalState";
import Loading from "../../../components/Loading";
import classNames from "classnames/bind";
import styles from "./CreateProduct.module.scss";

const cx = classNames.bind(styles);

const initialState = {
  product_id: "",
  title: "",
  price: 0,
  description:
    "How to and tutorial videos of cool CSS effect, Web Design ideas,JavaScript libraries, Node.",
  content:
    "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
  category: "",
  _id: "",
};

function CreateProduct() {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesApi.categories;
  const [isAdmin] = state.userApi.isAdmin;
  const [token] = state.token;
  const [products] = state.productsApi.products;
  const [callback, setCallback] = state.productsApi.callback;
  const [product, setProduct] = useState(initialState);
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [onEdit, setOnEdit] = useState(false);

  const navigate = useNavigate();
  const param = useParams();

  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      products.forEach((product) => {
        if (product._id === param.id) {
          setProduct(product);
          setImages(product.images);
        }
      });
    } else {
      setOnEdit(false);
      setProduct(initialState);
      setImages(false);
    }
  }, [param.id, products]);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) {
        return alert("You're not an admin");
      }
      const file = e.target.files[0];

      if (!file) {
        return alert("File not exist.");
      }

      if (file.size > 1024 * 1024) {
        // 1mb
        return alert("Size too large!");
      }

      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        // 1mb
        return alert("File format is incorrect.");
      }

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setLoading(false);
      setImages(res.data);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleDestroy = async () => {
    try {
      if (!isAdmin) {
        return alert("You're not an admin");
      }
      setLoading(true);
      await axios.post(
        "/api/destroy",
        { public_id: images.public_id },
        { headers: { Authorization: token } }
      );
      setLoading(false);
      setImages(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) {
        return alert("You're not an admin");
      }

      if (!images) {
        return alert("No Image Upload");
      }

      if (onEdit) {
        await axios.put(
          `/api/product/${product._id}`,
          { ...product, images },
          { headers: { Authorization: token } }
        );
      } else {
        await axios.post(
          "/api/product",
          { ...product, images },
          { headers: { Authorization: token } }
        );
      }
      setCallback(!callback);
      navigate("/");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const styleUpload = {
    display: images ? "block" : "none",
  };

  return (
    <div className={cx("create_product")}>
      <div className={cx("upload")}>
        <input
          name="file"
          type="file"
          className={cx("file_up")}
          onChange={handleUpload}
        />
        {loading ? (
          <div className={cx("file_img")}>
            <Loading />
          </div>
        ) : (
          <div className={cx("file_img")} style={styleUpload}>
            <img src={images ? images.url : ""} alt="" />
            <span onClick={handleDestroy}>X</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className={cx("row")}>
          <label htmlFor="product_id">Product ID</label>
          <input
            type="text"
            name="product_id"
            id="product_id"
            required
            value={product.product_id}
            onChange={handleChangeInput}
            disabled={onEdit}
          />
        </div>

        <div className={cx("row")}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={product.title}
            onChange={handleChangeInput}
          />
        </div>

        <div className={cx("row")}>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            required
            value={product.price}
            onChange={handleChangeInput}
          />
        </div>

        <div className={cx("row")}>
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            required
            value={product.description}
            rows="5"
            onChange={handleChangeInput}
          />
        </div>

        <div className={cx("row")}>
          <label htmlFor="content">Content</label>
          <textarea
            type="text"
            name="content"
            id="content"
            required
            value={product.content}
            rows="7"
            onChange={handleChangeInput}
          />
        </div>

        <div className={cx("row")}>
          <label htmlFor="categories">Categories: </label>
          <select
            name="category"
            value={product.category}
            onChange={handleChangeInput}
          >
            <option value="">Please select a category</option>
            {categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">{onEdit ? "Update" : "Create"}</button>
      </form>
    </div>
  );
}

export default CreateProduct;
