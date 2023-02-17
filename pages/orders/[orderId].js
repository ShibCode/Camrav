import { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import postRequest from "../../utils/postRequest";

const order = () => {
  const [orderExists, setOrderExists] = useState(false);

  const router = useRouter();

  const { orderId } = router.query;
  useEffect(() => {
    if (orderId)
      postRequest("/api/authorize", {
        token: localStorage.getItem("camrav-token"),
      })
        .then(({ authorized }) => {
          if (authorized)
            return postRequest("/api/check_order", { orderId: orderId });

          localStorage.removeItem("camrav-token");
          router.push("/");
        })
        .then((res) => {
          if (res.message) {
            setOrderExists(true);
          } else {
            router.push("/");
          }
        });
  }, [orderId]);

  return (
    orderExists && (
      <div>
        <h1>Your order has been placed</h1>

        <div>
          <FontAwesomeIcon icon={faCheck} />
          <h1>Thank you for your purchase!</h1>
          <p>Your order ID is {orderId}</p>
        </div>

        <Link href={`/account/orders/${orderId}`}>View Details</Link>
      </div>
    )
  );
};

export default order;
