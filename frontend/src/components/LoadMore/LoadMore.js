import { useContext } from "react";
import { GlobalState } from "../../components/GlobalState";
import classNames from "classnames/bind";
import styles from "./LoadMore.module.scss";

const cx = classNames.bind(styles);

function LoadMore() {
  const state = useContext(GlobalState);
  const [page, setPage] = state.productsApi.page;
  const [result] = state.productsApi.result;

  return (
    <div className={cx("load_more")}>
      {result < (page * 6) ? (
        ""
      ) : (
        <button onClick={() => setPage(page + 1)}>Load more</button>
      )}
    </div>
  );
}

export default LoadMore;
