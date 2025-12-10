import React, { useEffect, useState } from "react";
import SignInGoogle from "./SignInGoogle";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const Login = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, mirror: false });
  }, []);
  const [load, setLoad] = useState(false);
  const { login, loading } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    setLoad(true);
    login(data.email, data.password)
      .then(() => {
        setLoad(false);
        toast.success("Login Successful..");
        reset();
      })
      .catch((err) => {
        console.log(err);
        setLoad(false);
        toast.error("Login Failed. Please try again.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      {/* Container */}
      <div
        className="w-full max-w-md bg-gray-900 bg-opacity-70 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 shadow-xl"
        data-aos="zoom-in">
        {/* Title */}
        <h2
          className="text-3xl font-bold text-white text-center mb-6"
          data-aos="fade-down">
          Welcome Back
        </h2>

        <p
          className="text-gray-300 text-center mb-8"
          data-aos="fade-up"
          data-aos-delay="150">
          Login to continue your journey
        </p>

        {/* Google Button */}
        <div
          className="mt-5"
          data-aos="flip-left"
          data-aos-delay="300">
          <SignInGoogle />
        </div>

        {/* Divider */}
        <div
          className="flex items-center my-6"
          data-aos="fade-right">
          <div className="flex-grow h-px bg-gray-700"></div>
          <span className="text-gray-400 text-sm px-3">OR</span>
          <div className="flex-grow h-px bg-gray-700"></div>
        </div>

        {/* Email Login Inputs */}
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="space-y-4"
          data-aos="fade-up">
          {/* email */}
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Email Address"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 outline-none focus:border-blue-500 transition"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is required.</p>
          )}
          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: true,
              minLength: 6,
            })}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 outline-none focus:border-blue-500 transition"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is required.</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              Password must be at least 6 characters.
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white font-semibold shadow-lg">
            {load ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Signup Link */}
        <p
          className="text-center text-gray-400 mt-6"
          data-aos="fade-up"
          data-aos-delay="200">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
