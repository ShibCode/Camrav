import { useState } from "react";

import Product from "../../models/Product";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

import { CART_ACTIONS } from "../../context/Cart";

import { useCartDispatch } from "../../context/Cart";

const productpage = ({ fetchedProduct }) => {
  const [product, setProduct] = useState(JSON.parse(fetchedProduct));

  const [selectedSize, setSelectedSize] = useState(
    Object.keys(product.sizes)[0]
  );
  const [quantity, setQuantity] = useState(1);

  const dispatch = useCartDispatch();

  function addToCart() {
    const cart = {
      _id: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      selectedSize: selectedSize,
      quantity: quantity,
      availableQty: product.sizes[selectedSize].availableQty,
    };

    dispatch({
      type: CART_ACTIONS.ADD_TO_CART,
      payload: {
        newProduct: cart,
      },
    });
  }

  return (
    <section className="text-gray-600 body-font overflow-hidden flex justify-between">
      <div className="container px-5 py-24 mx-auto">
        <div className="max-w-3xl w-full flex flex-col items-center lg:flex-row lg:justify-between mx-auto">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full max-w-sm object-cover object-center rounded"
            src={product.image}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {product.brand}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font mb-1 font-semibold leading-9">
              {product.name}
            </h1>

            <p className="leading-relaxed">{product.desc}</p>
            <div className="flex flex-col mt-6 gap-4 pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex items-center">
                <span className="mr-3">Size</span>
                <div className="flex gap-2">
                  {Object.keys(product.sizes).map((size) => {
                    return product.sizes[size].availableQty > 0 ? (
                      <div
                        key={size}
                        className={`border border-[#dadada] w-12 h-8 grid place-items-center cursor-pointer ${
                          selectedSize === size
                            ? "border-indigo-500"
                            : "hover:border-indigo-300"
                        }`}
                        onClick={() => {
                          setSelectedSize(size);
                          setQuantity(1);
                        }}
                      >
                        {size}
                      </div>
                    ) : (
                      ""
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Quantity</span>
                <div className="flex items-center gap-2">
                  <button
                    className={`border border-[#dadada] w-8 h-8 grid place-items-center cursor-pointer hover:bg-gray-200 transition-all duration-75 ${
                      quantity === 1
                        ? "bg-gray-300 hover:bg-gray-300 border-0 cursor-auto"
                        : ""
                    }`}
                    onClick={() => {
                      setQuantity((prev) => prev - 1);
                    }}
                    disabled={quantity === 1 ? true : false}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <span className="text-xl font-semibold translate-y-[-2px] w-6 grid place-items-center">
                    {quantity}
                  </span>
                  <button
                    className={`border border-[#dadada] w-8 h-8 grid place-items-center cursor-pointer hover:bg-gray-200 transition-all duration-75 ${
                      quantity === product.sizes[selectedSize].availableQty
                        ? "bg-gray-300 hover:bg-gray-300 border-0 cursor-auto"
                        : ""
                    }`}
                    onClick={() => {
                      setQuantity((prev) => prev + 1);
                    }}
                    disabled={
                      quantity === product.sizes[selectedSize].availableQty
                        ? true
                        : false
                    }
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                Rs {product.price}
              </span>
              <button
                className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                onClick={addToCart}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default productpage;

export async function getServerSideProps(context) {
  const productId = context.query.productId;

  const res = await Product.findOne({ _id: productId });
  const fetchedProduct = JSON.stringify(res);

  return {
    props: { fetchedProduct },
  };
}
