import { useFormik } from "formik";
import { useState, useContext } from "react";
import * as Yup from "yup";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../Context/UserContext";

export default function Login() {
  const { setToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email address is required")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Must be at least 6 characters")
      .max(20, "Must not exceed 20 characters"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleLogin,
    validateOnMount: true,
  });

  async function handleLogin(loginData) {
    try {
      setLoading(true);
      setErrorMsg("");

      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        loginData
      );
      if (data.message === "success") {
        setToken(data.token);
        console.log(data);
        navigate("/");
        toast.success("Successful login!  ");
      }
    } catch (error) {
      setErrorMsg("Email or password is incorrect");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h2 className="pt-32 text-center text-4xl">Log In</h2>

      <form className="pt-10 max-w-md mx-auto" onSubmit={formik.handleSubmit}>
        {errorMsg && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
            role="alert"
          >
            {errorMsg}
          </div>
        )}

        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={(e) => {
              formik.handleChange(e);
              setErrorMsg("");
            }}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email Address
          </label>
          {formik.errors.email && formik.touched.email && (
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
            onChange={(e) => {
              formik.handleChange(e);
              setErrorMsg("");
            }}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            type="password"
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          {formik.errors.password && formik.touched.password && (
            <div
              className="mt-1 mb-1 text-sm text-red-800 rounded-lg"
              role="alert"
            >
              <span className="font-medium">{formik.errors.password}</span>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || !formik.isValid}
          className={`${
            loading || !formik.isValid
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-green-800"
          } text-white bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center`}
        >
          {loading ? (
            <FaSpinner className="inline-block animate-spin" />
          ) : (
            "Login"
          )}
        </button>
        {<Link to="/Forgot" className="block mt-2 text-green-700 hover:underline">Forgot your password?</Link>}

      </form>
    </>
  );
}
