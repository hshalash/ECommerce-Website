import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

export default function VerifyCode() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    resetCode: Yup.string().required("Verification code is required"),
  });

  const initialValues = {
    resetCode: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: verifyCode,
    validationSchema,
    validateOnMount: true,
  });

  async function verifyCode(values) {
    try {
      setIsLoading(true);
      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyresetCode",
        { resetCode: values.resetCode }
      );
      toast.success("Code verified!");
      navigate("/reset");
    } catch (error) {
      console.log(error);
      setErrorMsg(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <h2 className="pt-32 text-center text-4xl">Please Enter Your Verification Code</h2>

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
            value={formik.values.resetCode}
            type="text"
            name="resetCode"
            id="resetCode"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="resetCode"
            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Verification Code
          </label>
        </div>
        <button
          type="submit"
          disabled={isLoading || !formik.isValid}
          className={`${
            isLoading || !formik.isValid
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-green-800"
          } text-white bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center`}
        >
          {isLoading ? (
            <FaSpinner className="inline-block animate-spin" />
          ) : (
            "Submit Code"
          )}
        </button>
      </form>
    </>
  );
}
