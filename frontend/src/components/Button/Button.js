import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../GlobalState";
import classNames from "classnames/bind";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

function Button({ product, deleteProduct }) {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userApi.isAdmin;
  const addCart = state.userApi.addCart;

  return (
    <div className={cx("row_btn")}>
      {isAdmin ? (
        <>
          <Link className={cx("btn_delete")} to="#!" onClick={() => deleteProduct(product._id, product.images.public_id)}>
            Delete
          </Link>
          <Link className={cx("btn_edit")} to={`/edit_product/${product._id}`}>
            Edit
          </Link>
        </>
      ) : (
        <>
          <Link className={cx("btn_buy")} to="#!" onClick={() => addCart(product)}>
            Buy
          </Link>
          <Link className={cx("btn_view")} to={`/detail/${product._id}`}>
            View
          </Link>
        </>
      )}
    </div>
  );
}

export default Button;
