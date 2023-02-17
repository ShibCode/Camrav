import { useState } from "react";

import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faShoppingCart,
  faCaretDown,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { useLoggedIn } from "../context/LoggedIn";

import AccountDropDown from "../components/AccountDropDown";
import CartMenu from "../components/CartMenu";

const Header = () => {
  const [cartOpen, setCartOpen] = useState(false);

  const { loggedIn } = useLoggedIn();

  return (
    <>
      <header className="text-gray-600 body-font relative flex-column lg:flex-row bg-blue-100">
        <div className="container mx-auto flex flex-wrap lg:pb-5 p-5 flex-row items-center justify-between gap-4">
          <Link
            href="/"
            className="flex title-font font-medium items-center text-gray-900 lg:mb-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">Camrav</span>
          </Link>

          <div className="flex gap-4 items-center">
            {loggedIn === true && (
              <div className="relative">
                <FontAwesomeIcon
                  icon={faUser}
                  className="account-icon text-xl cursor-pointer"
                />
                <AccountDropDown />
              </div>
            )}
            {loggedIn === false && (
              <div className="flex gap-3">
                <Link
                  href="/signin"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Sign Up
                </Link>
              </div>
            )}

            <FontAwesomeIcon
              icon={faShoppingCart}
              className="text-2xl cursor-pointer"
              onClick={() => setCartOpen(true)}
            />
          </div>

          <CartMenu cartOpen={cartOpen} setCartOpen={setCartOpen} />
        </div>

        <div className="mx-auto p-5 pt-0 lg:p-0 w-full container lg:w-96 xl:w-[36rem] lg:absolute lg:top-1/2 lg:left-1/2 lg:translate-x-[-50%] lg:translate-y-[-50%]">
          <div className="input-group relative flex items-stretch w-full gap-2">
            <input
              type="search"
              className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon2"
            />
            <button
              className="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out items-center"
              type="button"
              id="button-addon2"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="search"
                className="w-4"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </header>
      <div className="w-full flex justify-between gap-0 px-5 sm:justify-center sm:gap-12 font-semibold bg-blue-50">
        <Link href="/" className="hover:text-gray-900 py-2">
          Home
        </Link>
        <div className="product-link hover:text-gray-900 relative py-2 cursor-pointer">
          Products <FontAwesomeIcon icon={faCaretDown} />
          <div className="z-50 product-dropdown absolute right-1/2 translate-x-1/2 flex-col items-center text-[#808080] py-2 px-12 bg-white top-10">
            <Link
              href="/products/tshirts"
              className="py-2 hover:text-black transition-colors"
            >
              T-Shirts
            </Link>
            <Link
              href="/products/hoodies"
              className="py-2 hover:text-black transition-colors"
            >
              Hoodies
            </Link>
            <Link
              href="/products/socks"
              className="py-2 hover:text-black transition-colors"
            >
              Socks
            </Link>
            <Link
              href="/products/caps"
              className="py-2 hover:text-black transition-colors"
            >
              Caps
            </Link>
            <Link
              href="/products/sneakers"
              className="py-2 hover:text-black transition-colors"
            >
              Sneakers
            </Link>
          </div>
        </div>
        <Link href="/about" className="hover:text-gray-900 py-2">
          About
        </Link>
        <Link href="/contact" className="hover:text-gray-900 py-2">
          Contact
        </Link>
      </div>
    </>
  );
};

export default Header;
