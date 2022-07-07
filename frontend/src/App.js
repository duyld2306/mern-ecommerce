import { useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import { Products } from "./page/Products";
import { Login } from "./page/Auth";
import { Register } from "./page/Auth";
import Cart from "./page/Cart";
import OrdersHistory from "./page/OrdersHistory";
import DetailOrder from "./page/DetailOrder";
import Categories from "./page/adminPage/Categories";
import CreateProduct from "./page/adminPage/CreateProduct";
import NotFound from "./page/NotFound";
import DetailProduct from "./page/DetailProduct";
import { GlobalState } from "./components/GlobalState";

function App() {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userApi.isAdmin;
  const [isLogged] = state.userApi.isLogged;

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" exact element={<Products />} />
          <Route path="/detail/:id" exact element={<DetailProduct />} />
          <Route
            path="/login"
            exact
            element={isLogged ? <NotFound /> : <Login />}
          />
          <Route
            path="/register"
            exact
            element={isLogged ? <NotFound /> : <Register />}
          />
          <Route
            path="/category"
            exact
            element={isAdmin ? <Categories /> : <NotFound />}
          />
          <Route
            path="/create_product"
            exact
            element={isAdmin ? <CreateProduct /> : <NotFound />}
          />
          <Route
            path="/edit_product/:id"
            exact
            element={isAdmin ? <CreateProduct /> : <NotFound />}
          />
          <Route
            path="/history"
            exact
            element={isLogged ? <OrdersHistory /> : <NotFound />}
          />
          <Route
            path="/history/:id"
            exact
            element={isLogged ? <DetailOrder /> : <NotFound />}
          />
          <Route path="/cart" exact element={<Cart />} />
          <Route path="*" exact element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
