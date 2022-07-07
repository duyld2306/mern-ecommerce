import classNames from "classnames/bind";
import styles from "./ProductItem.module.scss";
import Button from "../../components/Button";

const cx = classNames.bind(styles);

function ProductItem({ product, isAdmin, deleteProduct, handleCheck }) {
  return (
    <div className={cx("product_card")}>
      {isAdmin && (
        <input
          type="checkbox"
          checked={product.checked}
          onChange={() => handleCheck(product._id)}
        />
      )}
      <img src={product.images.url} alt="" />

      <div className={cx("product_box")}>
        <h2 title={product.title}>{product.title}</h2>
        <span>${product.price}</span>
        <p>{product.description}</p>
      </div>
      <Button product={product} deleteProduct={deleteProduct}/>
    </div>
  );
}

export default ProductItem;
