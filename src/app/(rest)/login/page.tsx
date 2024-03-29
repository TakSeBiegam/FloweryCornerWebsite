"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LoginForm = (object: { username: string; password: string }) => {
  const [tempPassword, setTempPassword] = useState("");
  const [tempUsername, setTempUsername] = useState("");
  const { push } = useRouter();
  const handleUsernameChange = (e: any) => {
    setTempUsername(e.target.value);
  };
  const handlePasswordChange = (e: any) => {
    setTempPassword(e.target.value);
  };
  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Kwiecisty Zakątek
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={tempUsername}
                  onChange={handleUsernameChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={tempPassword}
                  placeholder="••••••••"
                  onChange={handlePasswordChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="text-gray-500 dark:text-gray-300">
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-amber-500"
                onClick={(e) => {
                  e.preventDefault();
                  if (
                    tempUsername === object.username &&
                    tempPassword === object.password
                  ) {
                    if (typeof window !== "undefined") {
                      localStorage.setItem(
                        "Authorization",
                        JSON.stringify({ logged: true })
                      );
                      push("/admin");
                    }
                  } else {
                    setTempPassword("");
                    setTempUsername("");
                  }
                }}
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Do not have an account yet?
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function Login() {
  const { push } = useRouter();
  useEffect(() => {
    const authorizationObjectString = localStorage.getItem("Authorization");
    console.log("any");
    if (authorizationObjectString) {
      console.log("b");
      const authorizationObject = JSON.parse(authorizationObjectString);
      if (authorizationObject.logged) {
        console.log("a");
        push("/admin");
      }
    }
  }, []);
  const [username, setUsername] = useState("admin@uwb.edu.pl");
  const [password, setPassword] = useState("admin1");
  return (
    <div className="">
      <LoginForm {...{ username, password }} />
    </div>
  );
}
