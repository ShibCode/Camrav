import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faClose, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

import { CART_ACTIONS, useCart } from "../context/Cart";

const CartMenu = ({ cartOpen, setCartOpen }) => {
  const { cart, dispatch, subtotal } = useCart();

  function add1ToCart(productId, selectedSize) {
    dispatch({
      type: CART_ACTIONS.ADD_1,
      payload: { productId, selectedSize },
    });
  }

  function remove1FromCart(productId, selectedSize) {
    dispatch({
      type: CART_ACTIONS.REMOVE_1,
      payload: { productId, selectedSize },
    });
  }

  function clearCart() {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
    setCartOpen(false);
  }

  return (
    <div
      className={`w-1/3 min-w-[350px] max-w-[400px] h-full fixed bg-blue-100 right-0 top-0 z-10 flex flex-col p-5 transition-transform ${
        cartOpen ? "" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-xl  font-semibold">Cart Info</h1>

        <FontAwesomeIcon
          icon={faClose}
          className="text-2xl cursor-pointer"
          onClick={() => setCartOpen(false)}
        />
      </div>

      <div className="py-6 flex flex-col gap-4">
        {cart &&
          cart.map((product) => {
            return (
              <div key={product._id} className="flex items-center gap-2">
                <img src={product.image} alt="product image" className="w-12" />

                <div className="flex flex-col gap-0.5">
                  <p className="text-sm leading-3 text-gray-900">
                    {`${
                      product.name.length > 40
                        ? product.name.substring(0, 50).trim() + "...."
                        : product.name
                    } (Size: ${product.selectedSize})`}
                  </p>
                  <p className="text-sm text-gray-600">Rs {product.price}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="border border-[#dadada] w-7 h-7 grid place-items-center cursor-pointer hover:bg-gray-200 transition-all duration-7"
                    onClick={() => {
                      remove1FromCart(product._id, product.selectedSize);
                    }}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <span className="text-sm w-4 grid place-items-center font-semibold">
                    {product.quantity}
                  </span>
                  <button
                    className={`${
                      product.quantity === product.availableQty
                        ? "bg-gray-300 hover:bg-gray-300 border-0 cursor-auto"
                        : ""
                    } border border-[#dadada] w-7 h-7 grid place-items-center cursor-pointer hover:bg-gray-200 transition-all duration-7`}
                    onClick={() => {
                      add1ToCart(product._id, product.selectedSize);
                    }}
                    disabled={product.quantity === product.availableQty}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              </div>
            );
          })}
      </div>

      <div className="text-gray-900 text-md font-semibold">
        Rs {subtotal.toLocaleString()}
      </div>

      <div className="flex gap-2 my-6">
        <Link
          href="/checkout"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-100"
          onClick={() => setCartOpen(false)}
        >
          Checkout
        </Link>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-100"
          onClick={clearCart}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default CartMenu;
