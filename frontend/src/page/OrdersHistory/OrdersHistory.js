import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GlobalState } from "../../components/GlobalState";
import classNames from "classnames/bind";
import styles from "./OrdersHistory.module.scss";

const cx = classNames.bind(styles);

function OrdersHistory() {
  const state = useContext(GlobalState);
  const [history, setHistory] = state.userApi.history;
  const [isAdmin] = state.userApi.isAdmin;
  const [token] = state.token;

  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        if (isAdmin) {
          //admin được xem toàn bộ các đơn hàng
          const res = await axios.get("/api/payment", {
            headers: { Authorization: token },
          });
          setHistory(res.data);
        } else {
          //user thường chỉ được xem đơn hàng của mình
          const res = await axios.get("/user/history", {
            headers: { Authorization: token },
          });
          setHistory(res.data);
        }
      };
      getHistory();
    }
  }, [token, isAdmin, setHistory]);

  return (
    <div className={cx("history-page")}>
      <h2>History</h2>
      {!isAdmin && <h4>You have {history.length} ordered</h4>}

      <table>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Date of Purchased</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => (
            <tr key={item._id}>
              <td>{item.paymentID}</td>
              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
              <td>
                <Link to={`/history/${item._id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersHistory;
