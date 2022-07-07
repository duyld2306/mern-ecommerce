import { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import classNames from "classnames/bind";
import { GlobalState } from "../../components/GlobalState";
import { ProductItem } from "../Products";
import styles from "./DetailProduct.module.scss";

const cx = classNames.bind(styles);

function DetailProduct() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsApi.products;
  const addCart = state.userApi.addCart;
  const [detailProduct, setDetailProduct] = useState();

  useEffect(() => {
    if (params.id) {
      const product = products.find((product) => product._id === params.id);
      setDetailProduct(product);
    }
  }, [params.id, products]);

  return (
    <>
      <div className={cx("detail")}>
        <img src={detailProduct?.images.url} alt="" />
        <div className={cx("box-detail")}>
          <div className={cx("row")}>
            <h2>{detailProduct?.title}</h2>
            <h6>#id:{detailProduct?.product_id}</h6>
          </div>
          <span>$ {detailProduct?.price}</span>
          <p>{detailProduct?.description}</p>
          <p>{detailProduct?.content}</p>
          <p>Sold: {detailProduct?.sold}</p>
          <Link
            to="/cart"
            className={cx("cart")}
            onClick={() => addCart(detailProduct)}
          >
            Buy Now
          </Link>
        </div>
      </div>

      <div>
        <h2>Related products</h2>
        <div className={cx("products")}>
          {products?.map((product) => {
            return product.category === detailProduct?.category ? (
              <ProductItem key={product._id} product={product} />
            ) : null;
          })}
        </div>
      </div>
    </>
  );
}

export default DetailProduct;
