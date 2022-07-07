import { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { GlobalState } from "../GlobalState/GlobalState";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

function Header() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userApi.isLogged;
  const [isAdmin] = state.userApi.isAdmin;
  const [userName] = state.userApi.userName;
  const [cart] = state.userApi.cart;

  const logoutUser = async () => {
    await axios.post("/user/logout");
    localStorage.removeItem("firstLogin");
    window.location.href = "/";
  };

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to="/create_product">Create Product</Link>
        </li>
        <li>
          <Link to="/category">Categories</Link>
        </li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to="/history">History</Link>
        </li>
        <li>
          <Link to="/" onClick={logoutUser}>
            Logout
          </Link>
        </li>
      </>
    );
  };

  return (
    <header>
      <div className={cx("menu")}>
        <FontAwesomeIcon icon={faBars} />
      </div>

      <div className={cx("logo")}>
        <h1>
          <Link to="/">{isAdmin ? "Admin" : "DL Shop"}</Link>
        </h1>
      </div>

      <ul>
        {isLogged && (
          <li>
            <h2>Hi, {userName}</h2>
          </li>
        )}
        <li>
          <Link to="/">{isAdmin ? "Products" : "Shop"}</Link>
        </li>
        {isAdmin && adminRouter()}
        {isLogged ? (
          loggedRouter()
        ) : (
          <li>
            <Link to="/login">Login ✥ Register</Link>
          </li>
        )}
        <li className={cx("menu")}>
          <FontAwesomeIcon icon={faXmark} />
        </li>
      </ul>
      {!isAdmin && (
        <div className={cx("cart")}>
          <span>{cart.length}</span>
          <Link to="/cart">
            <FontAwesomeIcon icon={faCartShopping} />
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
