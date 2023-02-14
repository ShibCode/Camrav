import { useState } from "react";

import Filters from "../../components/filters";
import Products from "../../components/Products";

import Product from "../../models/Product";

const tshirts = ({ products_tshirts }) => {
  const [products, setProducts] = useState(JSON.parse(products_tshirts));

  return (
    <div className="flex">
      <Filters />
      <Products category="T-Shirts" products={products} />
    </div>
  );
};

export default tshirts;

export async function getServerSideProps() {
  const res = await Product.find({ category: "T-Shirts" });

  const products_tshirts = JSON.stringify(res);

  return {
    props: { products_tshirts },
  };
}
