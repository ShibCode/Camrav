import Filters from "../../components/filters";
import Products from "../../components/Products";

const sneakers = () => {
  return (
    <div className="flex">
      <Filters />
      <Products category="Sneakers" />
    </div>
  );
};

export default sneakers;
