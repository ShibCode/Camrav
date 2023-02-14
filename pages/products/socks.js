import Filters from "../../components/filters";
import Products from "../../components/Products";

const socks = () => {
  return (
    <div className="flex">
      <Filters />
      <Products category="Socks" />
    </div>
  );
};

export default socks;
