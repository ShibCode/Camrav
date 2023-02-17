import { useState, useEffect } from "react";

import { useRouter } from "next/router";
import Link from "next/link";

import postRequest from "../../../utils/postRequest";

const index = () => {
  const [orders, setOrders] = useState([]);

  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("camrav-token"))
      postRequest("/api/get_user_orders", {
        token: localStorage.getItem("camrav-token"),
      }).then((response) => {
        if (response.error) {
          router.push("/signin");
        }

        setOrders(response.orders);
      });
    else router.push("/signup");
  }, []);

  return (
    <div className="w-full flex flex-col items-center py-6 gap-4">
      <h1 className="text-2xl font-semibold">Your Orders</h1>

      <div className="w-full max-w-2xl px-8">
        {orders.map((order, index) => {
          console.log(order);
          return (
            <div
              className={`flex justify-between items-center w-full mx-auto px-8 py-4 ${
                index % 2 ? "bg-white" : "bg-gray-300"
              }`}
            >
              <div className="text-md">
                <div>
                  <span className="font-semibold">Order ID: </span>{" "}
                  <span className="color-gray-600">{order._id}</span>
                </div>
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
              <Link
                href={`/account/orders/${order._id}`}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-100"
              >
                View Details
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default index;
