import Filters from "../../components/filters";
import Products from "../../components/Products";

import Product from "../../models/Product";

const tshirts = ({ products_tshirts }) => {
  return (
    <div className="flex">
      <Filters />
      <Products productsString={products_tshirts} />
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
