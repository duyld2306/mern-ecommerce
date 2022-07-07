import { useEffect, useState } from "react";
import axios from "axios";
import { useDebounce } from "../hooks";

function ProductsApi() {
  const [products, setProducts] = useState([]);
  const [callback, setCallback] = useState(false);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);

  const debouncedValue = useDebounce(search.toLowerCase(), 1000);

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(
        `/api/product?limit=${
          page * 6
        }&${category}&${sort}&title[regex]=${debouncedValue}`
      );
      setProducts(res.data.products);
      setResult(res.data.result);
    };
    getProducts();
    // eslint-disable-next-line
  }, [callback, category, sort, debouncedValue, page]);

  return {
    products: [products, setProducts],
    callback: [callback, setCallback],
    category: [category, setCategory],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],
  };
}

export default ProductsApi;
