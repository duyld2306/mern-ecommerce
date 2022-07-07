import { useContext, useState } from "react";
import axios from "axios";
import classNames from "classnames/bind";
import { GlobalState } from "../../components/GlobalState/GlobalState";
import ProductItem from "./ProductItem";
import styles from "./Products.module.scss";
import Loading from "../../components/Loading";
import Filters from "../../components/Filters";
import LoadMore from "../../components/LoadMore";

const cx = classNames.bind(styles);

function Products() {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsApi.products;
  const [isAdmin] = state.userApi.isAdmin;
  const [token] = state.token;
  const [callback, setCallback] = state.productsApi.callback;
  const [loading, setLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  const deleteProduct = async (id, public_id) => {
    try {
      setLoading(true);
      await axios.post(
        "/api/destroy",
        { public_id },
        {
          headers: { Authorization: token },
        }
      );
      await axios.delete(`/api/product/${id}`, {
        headers: { Authorization: token },
      });
      setCallback(!callback);
      setLoading(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    setProducts([...products]);
  };

  const checkAll = () => {
    products.forEach((product) => {
      product.checked = !isCheck;
    });
    setProducts([...products]);
    setIsCheck(!isCheck);
  };

  const deleteAll = () => {
    products.forEach((product) => {
      if (product.checked) deleteProduct(product._id, product.images.public_id);
    });
  };

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <>
      <Filters />
      {isAdmin && (
        <div className={cx("delete-all")}>
          <span>Select all</span>
          <input type="checkbox" checked={isCheck} onChange={checkAll} />
          <button onClick={deleteAll}>Delete ALL</button>
        </div>
      )}
      <div className={cx("products")}>
        {products.map((product) => (
          <ProductItem
            product={product}
            key={product._id}
            isAdmin={isAdmin}
            deleteProduct={deleteProduct}
            handleCheck={handleCheck}
          />
        ))}
      </div>
      {products.length === 0 ? <Loading /> : null}
      <LoadMore />
    </>
  );
}

export default Products;
