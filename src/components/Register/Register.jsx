// import { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loading from "../Loading/Loading";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function Register() {
  const navigate = useNavigate();
  const { setToken } = useContext(UserContext)
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // const handleRegister = async (
  //   values,
  //   { setSubmitting, setErrors, resetForm }
  // ) => {
  //   try {
  //     const res = await axios.post(
  //       "https://ecommerce.routemisr.com/api/v1/auth/signup",
  //       values
  //     );
  //     resetForm();
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //     if (error) {
  //       setErrors({general: "Registration failed"});
  //     }
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  async function handleRegister(values, { resetForm }) {
    try {
      setIsLoading(true);
      setErrorMsg("");
      setSuccessMsg("");

      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );

      console.log(data);

      if (data.message === "success") {
        console.log(data.message);
        setSuccessMsg("Registration Successful");
        toast.success("Account created successfully!");
        setToken(data.token)
        navigate("/");
        resetForm();
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Must be atleast 3 characters"),
    email: Yup.string()
      .required("Email address is required")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Must be atleast 6 characters")
      .max(20, "Must not exceed 20 characters"),
    rePassword: Yup.string()
      .required("Confirm your password")
      .oneOf([Yup.ref("password")], "Passwords must match"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian number"),
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <>
      <h2 className="pt-32 text-center text-4xl">Registration Form</h2>

      <form className="pt-10 max-w-md mx-auto" onSubmit={formik.handleSubmit}>
        {errorMsg && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
            role="alert"
          >
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div
            className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50"
            role="alert"
          >
            {successMsg}
          </div>
        )}

        {isLoading && (
          <div
            className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50"
            role="alert"
          >
            Submitting...
          </div>
        )}

        <div className="relative z-0 w-full mb-5 group">
          <input
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="name"
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>

          {formik.touched.name && (
            <div
              className="mt-1 mb-1 text-sm text-red-800 rounded-lg"
              role="alert"
            >
              <span className="font-medium">{formik.errors.name}</span>
            </div>
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>

          {formik.touched.email && (
            <div
              className="mt-1 mb-1 text-sm text-red-800 rounded-lg"
              role="alert"
            >
              <span className="font-medium">{formik.errors.email}</span>
            </div>
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          {formik.touched.password && (
            <div
              className="mt-1 mb-1 text-sm text-red-800 rounded-lg"
              role="alert"
            >
              <span className="font-medium">{formik.errors.password}</span>
            </div>
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            name="rePassword"
            id="rePassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="rePassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm Password
          </label>
          {formik.touched.rePassword && (
            <div
              className="mt-1 mb-1 text-sm text-red-800 rounded-lg"
              role="alert"
            >
              <span className="font-medium">{formik.errors.rePassword}</span>
            </div>
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="phone"
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone
          </label>
          {formik.touched.phone && (
            <div
              className="mt-1 mb-1 text-sm text-red-800 rounded-lg"
              role="alert"
            >
              <span className="font-medium">{formik.errors.phone}</span>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting || !formik.dirty || !formik.isValid}
          className={`${
            formik.isSubmitting || !formik.isValid
              ? "opacity-50 cursor-not-allowed"
              : ""
          } text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center `}
        >
          {formik.isSubmitting ? <Loading /> : "Create an account"}
        </button>
      </form>
    </>
  );
}
