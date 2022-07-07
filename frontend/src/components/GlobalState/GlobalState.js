import axios from "axios";
import { createContext, useEffect, useState } from "react";
import ProductsApi from "../../api/ProductsApi";
import UserApi from "../../api/UserApi";
import CategoriesApi from "../../api/CategoriesApi";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const refreshToken = async () => {
        const res = await axios.get("/user/refresh_token");
        setToken(res.data.newAccessToken);

        setTimeout(() => {
          refreshToken();
        }, 14 * 60 * 1000);
      };
      refreshToken();
    }
  }, []);

  const state = {
    token: [token, setToken],
    userApi: UserApi(token),
    productsApi: ProductsApi(),
    categoriesApi: CategoriesApi(),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};