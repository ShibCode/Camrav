import { useState } from "react";

import { useCart, CART_ACTIONS } from "../context/Cart";

import { useRouter } from "next/router";

import postRequest from "../utils/postRequest";

import { toast, Toaster } from "react-hot-toast";

const checkout = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    phone: "",
  });

  const { cart, dispatch, subtotal } = useCart();

  const router = useRouter();

  function handleInputs(e, input) {
    setForm((prev) => {
      return { ...prev, [input]: e.target.value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // toast.promise(
    //   placeOrder(),
    //   {
    //     loading: "Processing data...",
    //     success: (msg) => msg,
    //     error: (err) => err,
    //   },
    //   {
    //     success: {
    //       style: {
    //         duration: 1000,
    //         background: "green",
    //         color: "white",
    //       },
    //     },
    //     error: {
    //       style: {
    //         duration: 1000,
    //         background: "red",
    //         color: "white",
    //       },
    //     },
    //   }
    // );

    placeOrder();
  }

  async function placeOrder() {
    if (!localStorage.getItem("camrav-token")) {
      router.push("/signup");
      return;
    }

    const response = await postRequest("/api/place_order", {
      token: localStorage.getItem("camrav-token"),
      checkoutDetails: { ...form },
      cart,
      subtotal,
    });

    if (response.authorize === false) {
      localStorage.removeItem("camrav-token");
      dispatch({ type: CART_ACTIONS.CLEAR_CART });

      // Promise.reject(response.error);
    }
    // else if (response.outOfStock) Promise.reject(response.error);
    else {
      // Promise.resolve(response.message);
      router.push(`/orders/${response.orderId}`);
      dispatch({ type: CART_ACTIONS.CLEAR_CART });
    }
  }

  return (
    <>
      {cart ? (
        <div className="flex flex-col items-center py-8 gap-10">
          <h1 className="text-2xl font-semibold">Checkout</h1>

          <div className="flex flex-col lg:flex-row lg:justify-between max-w-2xl w-full lg:max-w-6xl px-6 gap-16">
            <div className="flex-1 flex flex-col gap-4">
              <h1 className="text-xl font-semibold">Details</h1>

              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={form.firstName}
                    onChange={(e) => handleInputs(e, "firstName")}
                    className="w-1/2 border-2 border-[#dadada] rounded-md py-2 pl-3"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={form.lastName}
                    onChange={(e) => handleInputs(e, "lastName")}
                    className="w-1/2 border-2 border-[#dadada] rounded-md py-2 pl-3"
                    required
                  />
                </div>

                <textarea
                  name="address"
                  value={form.address}
                  onChange={(e) => handleInputs(e, "address")}
                  className="border-2 border-[#dadada] rounded-md py-2 pl-3"
                  placeholder="Address"
                  required
                ></textarea>

                <div className="flex gap-2">
                  <input
                    type="city"
                    placeholder="City"
                    value={form.email}
                    onChange={(e) => handleInputs(e, "city")}
                    className="w-1/2 border-2 border-[#dadada] rounded-md py-2 pl-3"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={(e) => handleInputs(e, "phone")}
                    className="w-1/2 border-2 border-[#dadada] rounded-md py-2 pl-3"
                    required
                  />
                </div>

                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-100 self-end">
                  Save and Continue
                </button>
              </form>
            </div>

            <div className="max-w-xs">
              <h1 className="text-xl font-semibold">Cart Info</h1>

              <div className="font-semibold mt-6 mb-3 flex flex-col gap-1">
                <div>
                  Cart Total:{" "}
                  <span className="text-gray-600 font-normal">
                    Rs {subtotal.toLocaleString()}
                  </span>
                </div>
                <div>
                  Shipping Charges:{" "}
                  <span className="text-gray-600 font-normal">Rs 399</span>
                </div>
                <div>
                  Subtotal:{" "}
                  <span className="text-gray-600 font-normal">
                    Rs {(subtotal + 399).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {cart &&
                  cart.map((item) => {
                    return (
                      <div className="flex items-start gap-2" key={item._id}>
                        <img
                          src={item.image}
                          alt="product image"
                          className="w-12 my-3"
                        />

                        <div className="flex flex-col gap-1 leading-5">
                          <h1 className="font-semibold">{item.name}</h1>

                          <div className="flex flex-col">
                            <span className="leading-5 text-gray-600">
                              Category: {item.category}
                            </span>
                            <span className="leading-5 text-gray-600">
                              Brand: {item.brand}
                            </span>
                            <span className="leading-5 text-gray-600">
                              Size: {item.selectedSize}
                            </span>
                            <span className="leading-5 text-gray-600">
                              Qty: {item.quantity}
                            </span>
                            <span className="leading-5 text-gray-600">
                              Total: Rs{" "}
                              {(item.quantity * item.price).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default checkout;
