import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, useLocation, useNavigate } from "react-router";
import SignInGoogle from "./SignInGoogle";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import UseAxiosSecure from "../../hooks/useAxiosSecure";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const axiosSecure = UseAxiosSecure();
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, mirror: false });
  }, []);
  const [load, setLoad] = useState(false);
  const { register: registerUser, userDataUpdate, user, loading } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const handleRegistration = (data) => {
    setLoad(true);
    const photo = data.photo[0];
    registerUser(data.email, data.password)
      .then((result) => {
        const formData = new FormData();
        formData.append("image", photo);

        fetch(
          `https://api.imgbb.com/1/upload?expiration=600&key=${
            import.meta.env.VITE_imgBB_apiKey
          }`,
          {
            method: "POST",
            body: formData,
          }
        )
          .then((res) => res.json())
          .then((imageData) => {
            console.log("1", imageData.data.url);
            console.log(imageData.data);
            const newData = {
              displayName: data.name,
              photoURL: imageData.data.url,
            };
            const userInfo = {
              displayName: data.name,
              email: data.email,
              photoURL: imageData.data.url,
            };
            axiosSecure.post("/users", userInfo).then((data) => {
              console.log("User saved to database");
            });
            userDataUpdate(newData)
              .then((result) => {
                console.log(result);
                toast.success("User Create Successful..!");
                navigate(from, { replace: true });
                setLoad(false);
                reset();
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => {
        toast.error(err.message);
        setLoad(false);
      });
  };

  if (user) {
    navigate(from, { replace: true });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div
        className="w-full max-w-md bg-gray-900/70 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 shadow-xl"
        data-aos="zoom-in">
        <h2
          className="text-3xl font-bold text-white text-center mb-6"
          data-aos="fade-down">
          Create an Account
        </h2>

        <p
          className="text-gray-400 text-center mb-8"
          data-aos="fade-up">
          Join us and start your journey
        </p>

        {/* Register Form */}
        <form
          onSubmit={handleSubmit(handleRegistration)}
          className="space-y-4">
          <input
            type="text"
            {...register("name", { required: true })}
            placeholder="Full Name"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 outline-none focus:border-blue-500 transition"
            data-aos="fade-right"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500">Name is required.</p>
          )}

          {/* Photo */}
          <input
            type="file"
            {...register("photo", { required: true })}
            placeholder="Profile Photo"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 outline-none focus:border-blue-500 transition"
            data-aos="fade-right"
          />
          {errors.photo?.type === "required" && (
            <p className="text-red-500">Photo is required.</p>
          )}

          {/* email */}
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Email Address"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 outline-none focus:border-blue-500 transition"
            data-aos="fade-right"
            data-aos-delay="150"
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
              pattern:
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/,
            })}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 outline-none focus:border-blue-500 transition"
            data-aos="fade-right"
            data-aos-delay="300"
          />

          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is required.</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              Password must be at least 6 characters.
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-500">
              Password must include uppercase, lowercase, number & special
              character.
            </p>
          )}

          {/* CONFIRM PASSWORD */}
          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: true,
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 outline-none focus:border-blue-500 transition"
            data-aos="fade-right"
            data-aos-delay="450"
          />

          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={load}
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            data-aos="fade-up"
            data-aos-delay="600">
            {load ? "Creating account..." : "Create Account"}
          </button>
        </form>

        {/* Divider */}
        <div
          className="flex items-center my-6"
          data-aos="fade-right">
          <div className="flex-grow h-px bg-gray-700"></div>
          <span className="text-gray-400 text-sm px-3">OR</span>
          <div className="flex-grow h-px bg-gray-700"></div>
        </div>

        {/* Google Button */}
        <div
          className="mt-5"
          data-aos="flip-left"
          data-aos-delay="300">
          <SignInGoogle />
        </div>

        {/* Already have account */}
        <p
          className="text-center text-gray-100 mt-6"
          data-aos="fade-up"
          data-aos-delay="200">
          Already have an account?{" "}
          <Link
            to="/login"
            state={{ from: location }} replace
            className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
