import { useState } from "react";

import Filters from "../../components/filters";
import Products from "../../components/Products";

import Product from "../../models/Product";

const hoodies = ({ products_hoodies }) => {
  const [products, setProducts] = useState(JSON.parse(products_hoodies));

  return (
    <div className="flex">
      <Filters />
      <Products category="Hoodies" products={products} />
    </div>
  );
};

export default hoodies;

export async function getServerSideProps() {
  const res = await Product.find({ category: "Hoodies" });

  const products_hoodies = JSON.stringify(res);

  return {
    props: { products_hoodies },
  };
}
