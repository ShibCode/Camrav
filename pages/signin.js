import { useState, useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import postRequest from "../utils/postRequest";

import { Toaster, toast } from "react-hot-toast";

import { useLoggedIn } from "../context/LoggedIn";

const signin = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const { setKey } = useLoggedIn();

  useEffect(() => {
    if (localStorage.getItem("camrav-token")) router.push("/");
  }, []);

  function handleInputs(e) {
    const { name, value } = e.target;
    return setForm((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    toast.promise(
      signIn(),
      {
        loading: "Processing data...",
        success: (msg) => msg,
        error: (err) => err,
      },
      {
        success: {
          style: {
            duration: 1000,
            background: "green",
            color: "white",
          },
        },
        error: {
          style: {
            duration: 1000,
            background: "red",
            color: "white",
          },
        },
      }
    );

    setForm({ email: "", password: "" });
  }

  async function signIn() {
    const res = await postRequest("/api/signin", form);

    if (res.token) {
      localStorage.setItem("camrav-token", res.token);

      setTimeout(() => {
        router.push("/");
        setKey(Math.random());
      }, 1000);

      return Promise.resolve("Successfully Signed In");
    }

    return Promise.reject(res.error);
  }

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                  value={form.email}
                  onChange={handleInputs}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleInputs}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  href="/signup"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Don't have an account?
                </Link>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default signin;
