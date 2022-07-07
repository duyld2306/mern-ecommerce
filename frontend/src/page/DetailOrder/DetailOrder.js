import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../components/GlobalState";
import classNames from "classnames/bind";
import styles from "./DetailOrder.module.scss";

const cx = classNames.bind(styles);

function OrderDetails() {
  const state = useContext(GlobalState);
  const [history] = state.userApi.history;
  const [orderDetail, setOrderDetail] = useState();

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      const item = history.find((item) => item._id === params.id);
      setOrderDetail(item);
    }
  }, [params.id, history]);

  return (
    <div className={cx("history-page")}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Postal Code</th>
            <th>Country Code</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{orderDetail?.address.recipient_name}</td>
            <td>
              {orderDetail?.address.line1 + " - " + orderDetail?.address.city}
            </td>
            <td>{orderDetail?.address.postal_code}</td>
            <td>{orderDetail?.address.country_code}</td>
          </tr>
        </tbody>
      </table>

      <table style={{ margin: "30px 0px" }}>
        <thead>
          <tr>
            <th></th>
            <th>Products</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orderDetail?.cart.map((item) => (
            <tr key={item._id}>
              <td>
                <img src={item.images.url} alt="" />
              </td>
              <td>{item.title}</td>
              <td>{item.quantity}</td>
              <td>$ {item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderDetails;
