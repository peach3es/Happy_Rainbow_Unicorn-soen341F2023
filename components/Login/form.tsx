"use client";

import React from "react"; // Import useState hook
import { Image, Input, Button, Link } from "@nextui-org/react";
import "styles/form.css";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { getUser, getUsers } from "@/backend/database/controller";

function LogInForm() {
  const images = [
    "/pictures/login/pic1.jpg",
    "/pictures/login/pic2.jpg",
    "/pictures/login/pic3.jpg",
    "/pictures/login/pic4.jpg",
  ];
  const randomImage = images[Math.floor(Math.random() * images.length)];
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="flex flex-row gap-5 my-5 justify-center place-items-center w-full">
      <div
        className="login-container w-1/2 justify-center place-items-center flex bg-slate-300 h-full ml-5 rounded-xl flex-col relative"
        style={{
          backgroundImage: "url(/pictures/login/pic5.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "50% 55%",
        }}
      >
        <form
          className="bg-[#eeeeee] flex flex-col justify-center rounded-xl w-1/2 absolute z-10"
          id="Login"
        >
          <div className="mt-5 text-4xl bold-2xl bg-[#eeeeee] rounded-xl p-5 cursor-default text-center font-PPGoshaReg">
            Welcome Back!
          </div>
          <div className="flex flex-col gap-3 p-5 justify-center">
            <Input
              isRequired
              type="email"
              label="Email:"
              placeholder="Email"
              classNames={{ input: "border-none focus:ring-0" }}
              className="max-w-2xl"
            />
            <Input
              isRequired
              label="Password:"
              placeholder="Enter your password"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              classNames={{
                input: "border-none focus:ring-0 hide-browser-eye-icon",
              }}
              type={isVisible ? "text" : "password"}
            />
            <p className="text-center text-small">
              Don&apos;t have an account?{" "}
              <Link
                size="sm"
                href="/signup"
                className="text-pastelblue font-semibold"
              >
                Signup
              </Link>
            </p>
            <div className="flex gap-2 justify-end">
              <Button fullWidth color="secondary">
                Log In
              </Button>
            </div>
          </div>
        </form>
      </div>
      <div className="w-1/2 mr-5">
        <Image
          src={randomImage}
          alt="5ftapart"
          width="100%"
          height="50%"
          sizes="100vw"
          style={{
            objectFit: "cover",
            height: "90vh",
          }}
        />
      </div>
    </div>
  );
}

export default LogInForm;
