import Filters from "../../components/filters";
import Products from "../../components/Products";

const caps = () => {
  return (
    <div className="flex">
      <Filters />
      <Products category="Caps" />
    </div>
  );
};

export default caps;
