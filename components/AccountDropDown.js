import Link from "next/link";
import { useRouter } from "next/router";

import { useLoggedIn } from "../context/LoggedIn";

const AccountDropDown = () => {
  const router = useRouter();
  const { setKey } = useLoggedIn();

  function logout() {
    localStorage.removeItem("camrav-token");
    setKey(Math.random);

    router.push("/signin");
  }

  return (
    <div className="account-menu absolute bg-white w-32 right-1/2 translate-x-1/2 translate-y-[-4px] py-3 bg-clip-content flex flex-col">
      <div
        className="p-2 text-black cursor-pointer hover:bg-gray-200 active:bg-gray-300"
        onClick={logout}
      >
        Logout
      </div>

      <Link
        href="/account/orders"
        className="p-2 text-black cursor-pointer hover:bg-gray-200 active:bg-gray-300 block"
      >
        Orders
      </Link>
    </div>
  );
};

export default AccountDropDown;
