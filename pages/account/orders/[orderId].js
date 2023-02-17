import { useState, useEffect } from "react";

import { useRouter } from "next/router";

import postRequest from "../../../utils/postRequest";

const order = () => {
  const [order, setOrder] = useState(null);

  const router = useRouter();
  const { orderId } = router.query;

  useEffect(() => {
    if (orderId)
      postRequest("/api/authorize", {
        token: localStorage.getItem("camrav-token"),
      })
        .then(({ authorized }) => {
          if (authorized)
            return postRequest("/api/get_order", { orderId: orderId });

          localStorage.removeItem("camrav-token");
          router.push("/");
        })
        .then((res) => {
          if (res.order) {
            setOrder(res.order);
            return;
          }

          router.push("/");
        });
  }, [orderId]);

  if (order === null) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex flex-col items-center py-8 gap-8">
      <h1 className="text-2xl font-semibold">Order ID - {order._id}</h1>

      <div className="flex flex-col lg:flex-row lg:justify-between max-w-2xl w-full lg:max-w-6xl px-6 gap-16">
        <div className="flex flex-col gap-12">
          <div className="text-md flex flex-col gap-2">
            <h1 className="text-xl font-semibold">Order Details</h1>
            <div>
              <span className="font-semibold">Order Status: </span>{" "}
              <span className="color-gray-600">{order.status}</span>
            </div>
            <div>
              <span className="font-semibold">Ordered at: </span>{" "}
              <span className="color-gray-600">{order.createdAt}</span>
            </div>
            <div>
              <span className="font-semibold">Status Last Updated: </span>{" "}
              <span className="color-gray-600">{order.updated_at}</span>
            </div>
          </div>

          <div className="text-md flex flex-col gap-2">
            <h1 className="text-xl font-semibold">Order Details</h1>
            <div>
              <span className="font-semibold">First Name: </span>{" "}
              <span className="color-gray-600">
                {order.checkoutDetails.firstName}
              </span>
            </div>
            <div>
              <span className="font-semibold">Last Name: </span>{" "}
              <span className="color-gray-600">
                {order.checkoutDetails.lastName}
              </span>
            </div>
            <div>
              <span className="font-semibold">Address: </span>{" "}
              <span className="color-gray-600">
                {order.checkoutDetails.address}
              </span>
            </div>
            <div>
              <span className="font-semibold">City: </span>{" "}
              <span className="color-gray-600">
                {order.checkoutDetails.city}
              </span>
            </div>
            <div>
              <span className="font-semibold">Phone: </span>{" "}
              <span className="color-gray-600">
                {order.checkoutDetails.phone}
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-xs">
          <h1 className="text-xl font-semibold">Cart Info</h1>

          <div className="font-semibold mt-6 mb-3 flex flex-col gap-1">
            <div>
              Cart Total:{" "}
              <span className="text-gray-600 font-normal">
                Rs {(order.orderDetails.subtotal - 399).toLocaleString()}
              </span>
            </div>
            <div>
              Shipping Charges:{" "}
              <span className="text-gray-600 font-normal">Rs 399</span>
            </div>
            <div>
              Subtotal:{" "}
              <span className="text-gray-600 font-normal">
                Rs {order.orderDetails.subtotal.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {order.orderDetails.cart.map((item) => {
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
  );
};

export default order;
